/**
 * InfoLive 跨 Actions 话题生命周期管理系统。
 *
 * 这是持久化边界：Agent 只能提交结构化增量，生命周期模块负责追加、
 * 迭代、归档与重新打开，永不删除已有 dossier。
 */
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_ARCHIVE_AFTER_RUNS = 3;
const ACTIONS = new Set(['initiate', 'evolve', 'iterate', 'archive', 'reopen']);

function topicsDir() {
  return path.resolve(process.env.INFO_LIVE_TOPICS_DIR || 'data/history/topics');
}

function registryFile() {
  return path.join(topicsDir(), 'topics-registry.json');
}

function asObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  return value === undefined || value === null ? [] : [value];
}

function stableKey(value) {
  if (value === null || value === undefined) return '';
  if (typeof value !== 'object') return String(value);
  for (const key of ['id', 'evidenceId', 'url', 'link', 'claim', 'title']) {
    if (value[key] !== undefined && value[key] !== null) return `${key}:${value[key]}`;
  }
  try { return JSON.stringify(value); } catch { return String(value); }
}

function uniqueValues(existing, incoming) {
  const output = Array.isArray(existing) ? [...existing] : [];
  const seen = new Set(output.map(stableKey));
  for (const value of asArray(incoming)) {
    if (value === undefined || value === null || value === '') continue;
    const key = stableKey(value);
    if (!seen.has(key)) {
      seen.add(key);
      output.push(value);
    }
  }
  return output;
}

function atomicWriteJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.${Date.now()}.tmp`;
  try {
    fs.writeFileSync(temp, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
    fs.renameSync(temp, file);
  } finally {
    if (fs.existsSync(temp)) {
      try { fs.unlinkSync(temp); } catch { /* preserve original error */ }
    }
  }
}

function normalizeDossier(input) {
  const dossier = { ...asObject(input) };
  dossier.slug = String(dossier.slug || '');
  dossier.stage = dossier.stage === 'archived' ? 'archived' : 'active';
  dossier.updateCount = Math.max(0, Number(dossier.updateCount) || 1);
  dossier.previousRunIds = uniqueValues([], dossier.previousRunIds);
  dossier.evidenceIds = uniqueValues([], dossier.evidenceIds);
  dossier.facts = uniqueValues([], dossier.facts);
  dossier.conflicts = uniqueValues([], dossier.conflicts);
  dossier.timeline = Array.isArray(dossier.timeline) ? [...dossier.timeline] : [];
  dossier.keyJudgments = Array.isArray(dossier.keyJudgments) ? [...dossier.keyJudgments] : [];
  dossier.relatedArticleUrls = uniqueValues([], dossier.relatedArticleUrls).filter((url) => typeof url === 'string');
  dossier.noEvidenceRuns = Math.max(0, Number(dossier.noEvidenceRuns) || 0);
  dossier.noEvidenceRunIds = uniqueValues([], dossier.noEvidenceRunIds).filter((id) => typeof id === 'string');
  dossier.archiveHistory = Array.isArray(dossier.archiveHistory) ? [...dossier.archiveHistory] : [];
  return dossier;
}

function normalizeRegistry(registry) {
  const source = Array.isArray(registry) ? { topics: registry } : asObject(registry);
  return {
    ...source,
    topics: Array.isArray(source.topics)
      ? source.topics.map(normalizeDossier).filter((topic) => topic.slug)
      : [],
  };
}

export function ensureTopicStorage() {
  fs.mkdirSync(topicsDir(), { recursive: true });
  if (!fs.existsSync(registryFile())) atomicWriteJson(registryFile(), { topics: [] });
}

export function loadTopicRegistry() {
  ensureTopicStorage();
  try {
    return normalizeRegistry(JSON.parse(fs.readFileSync(registryFile(), 'utf8')));
  } catch (error) {
    console.warn('[TopicLifecycle] Error reading topic registry, initializing fresh:', error.message);
    return { topics: [] };
  }
}

export function saveTopicRegistry(registry) {
  const normalized = normalizeRegistry(registry);
  ensureTopicStorage();
  atomicWriteJson(registryFile(), normalized);
  console.log(`[TopicLifecycle] Saved topic registry with ${normalized.topics.length} total dossiers.`);
}

function timeDisplay(timeInfo = {}) {
  return timeInfo.display || timeInfo.timestamp || new Date().toISOString();
}

function runIdOf(runMeta) {
  return typeof runMeta?.runId === 'string' && runMeta.runId ? runMeta.runId : null;
}

function recordLineage(dossier, runMeta) {
  const runId = runIdOf(runMeta);
  dossier.previousRunIds = uniqueValues(dossier.previousRunIds, runMeta?.previousRunIds);
  if (runId && dossier.lastRunId && dossier.lastRunId !== runId) {
    dossier.previousRunIds = uniqueValues(dossier.previousRunIds, [dossier.lastRunId]);
  }
  if (runId) {
    dossier.previousRunIds = dossier.previousRunIds.filter((id) => id !== runId).slice(-32);
    dossier.lastRunId = runId;
  }
}

function topicMeta(runMeta, slug) {
  const maps = [runMeta?.topics, runMeta?.byTopic, runMeta?.context?.topics, runMeta?.context?.byTopic];
  let result = {};
  for (const map of maps) {
    if (asObject(map)[slug]) result = { ...result, ...asObject(map)[slug] };
  }
  if (runMeta?.slug === slug || runMeta?.topicSlug === slug) result = { ...result, ...runMeta };
  for (const key of ['action', 'evidenceIds', 'facts', 'conflicts', 'timeline', 'archiveReason']) {
    if (asObject(runMeta)[key] && typeof runMeta[key] === 'object' && !Array.isArray(runMeta[key])) {
      result[key] = runMeta[key][slug] ?? result[key];
    } else if (runMeta?.[key] !== undefined && !result[key]) {
      result[key] = runMeta[key];
    }
  }
  return result;
}

function matchedArticles(topic, rawItems) {
  const keywords = String(topic.slug || '').replace(/^topic-/, '').split('-').filter((word) => word.length > 2);
  return (Array.isArray(rawItems) ? rawItems : []).filter((item) => {
    const text = `${item?.title || ''} ${item?.originalTitle || ''} ${item?.snippet || ''}`.toLowerCase();
    return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
  });
}

function incomingEvidence(topic, meta, matched) {
  return {
    evidenceIds: uniqueValues([], [
      ...asArray(topic.evidenceIds), ...asArray(meta.evidenceIds),
      ...matched.map((item) => item.evidenceId || item.id || item.link || item.url),
    ]),
    facts: uniqueValues([], [...asArray(topic.facts), ...asArray(meta.facts), ...asArray(topic.evidence?.facts), ...asArray(meta.evidence?.facts)]),
    conflicts: uniqueValues([], [...asArray(topic.conflicts), ...asArray(meta.conflicts), ...asArray(topic.evidence?.conflicts), ...asArray(meta.evidence?.conflicts)]),
    timeline: [...asArray(topic.timeline), ...asArray(meta.timeline)].filter(Boolean),
  };
}

function mergeTimeline(dossier, events) {
  const seen = new Set(dossier.timeline.map((event) => stableKey(event?.title ? { title: event.title } : event)));
  for (const event of events) {
    const key = stableKey(event?.title ? { title: event.title } : event);
    if (!seen.has(key)) {
      dossier.timeline.unshift(event);
      seen.add(key);
    }
  }
}

function mergeContent(dossier, topic, meta, incoming, matched, display) {
  const before = JSON.stringify({ overview: dossier.overview, stance: dossier.stanceAnalysis, judgments: dossier.keyJudgments });
  dossier.evidenceIds = uniqueValues(dossier.evidenceIds, incoming.evidenceIds);
  dossier.facts = uniqueValues(dossier.facts, incoming.facts);
  dossier.conflicts = uniqueValues(dossier.conflicts, incoming.conflicts);
  mergeTimeline(dossier, incoming.timeline);
  if (topic.overview && topic.overview !== dossier.overview) dossier.overview = topic.overview;
  if (meta.overview && meta.overview !== dossier.overview) dossier.overview = meta.overview;
  if (topic.stanceAnalysis !== undefined) dossier.stanceAnalysis = topic.stanceAnalysis;
  if (meta.stanceAnalysis !== undefined) dossier.stanceAnalysis = meta.stanceAnalysis;
  if (Array.isArray(topic.keyJudgments) && topic.keyJudgments.length) dossier.keyJudgments = topic.keyJudgments;
  if (Array.isArray(meta.keyJudgments) && meta.keyJudgments.length) dossier.keyJudgments = meta.keyJudgments;
  const urls = new Set(dossier.relatedArticleUrls);
  for (const item of matched.slice(0, 8)) if (item.link || item.url) urls.add(item.link || item.url);
  dossier.relatedArticleUrls = [...urls].slice(0, 60);
  dossier.lastUpdated = display;
  return before !== JSON.stringify({ overview: dossier.overview, stance: dossier.stanceAnalysis, judgments: dossier.keyJudgments });
}

function hasNewEvidence(dossier, incoming) {
  const known = new Set([...dossier.evidenceIds, ...dossier.facts, ...dossier.conflicts].map(stableKey));
  return [...incoming.evidenceIds, ...incoming.facts, ...incoming.conflicts].some((value) => !known.has(stableKey(value)));
}

function applyArchive(dossier, runMeta, display, reason) {
  if (dossier.stage !== 'archived') {
    dossier.archiveHistory = uniqueValues(dossier.archiveHistory, [{ archivedAt: dossier.archivedAt, archiveReason: dossier.archiveReason, runId: dossier.lastRunId }]);
  }
  dossier.stage = 'archived';
  dossier.status = '📦 阶段性归档与长期沉淀';
  dossier.archiveReason = reason || dossier.archiveReason || '连续运行未发现新的证据';
  dossier.archivedAt = display;
  dossier.lastAction = 'archive';
  recordLineage(dossier, runMeta);
}

function applyReopen(dossier, runMeta, display) {
  dossier.stage = 'active';
  dossier.status = '🚨 重新打开并持续追踪';
  dossier.reopenCount = (dossier.reopenCount || 0) + 1;
  dossier.reopenedAt = display;
  dossier.noEvidenceRuns = 0;
  dossier.noEvidenceRunIds = [];
  dossier.lastAction = 'reopen';
  recordLineage(dossier, runMeta);
}

function explicitAction(topic, meta) {
  const action = topic.action || meta.action;
  return ACTIONS.has(action) ? action : null;
}

/**
 * 第四个参数为可选运行元数据，旧三参数调用保持兼容。
 */
export function evolveTopics(baseTopics = [], rawItems = [], timeInfo = {}, runMeta = {}) {
  const registry = loadTopicRegistry();
  const existing = new Map(registry.topics.map((topic) => [topic.slug, normalizeDossier(topic)]));
  const active = [];
  const touched = new Set();
  const enhanced = Object.keys(asObject(runMeta)).length > 0
    || baseTopics.some((topic) => topic?.evidenceIds || topic?.facts || topic?.conflicts || topic?.action);
  const archiveAfterRuns = Math.max(1, Number(runMeta.archiveAfterRuns || DEFAULT_ARCHIVE_AFTER_RUNS));
  const display = timeDisplay(timeInfo);

  for (const topic of Array.isArray(baseTopics) ? baseTopics : []) {
    if (!topic?.slug) continue;
    const slug = String(topic.slug);
    touched.add(slug);
    const meta = topicMeta(runMeta, slug);
    const matched = matchedArticles(topic, rawItems);
    const incoming = incomingEvidence(topic, meta, matched);
    let dossier = existing.get(slug);
    const action = explicitAction(topic, meta);

    if (!dossier) {
      dossier = normalizeDossier({
        ...topic,
        slug,
        stage: 'active',
        createdAt: display,
        lastUpdated: display,
        updateCount: 1,
        previousRunIds: [],
        evidenceIds: [], facts: [], conflicts: [], relatedArticleUrls: [],
        noEvidenceRuns: 0, noEvidenceRunIds: [], archiveHistory: [],
      });
      mergeContent(dossier, topic, meta, incoming, matched, display);
      dossier.lastAction = action || 'initiate';
      dossier.action = dossier.lastAction;
      recordLineage(dossier, runMeta);
      if (action === 'archive') applyArchive(dossier, runMeta, display, meta.archiveReason || topic.archiveReason);
      existing.set(slug, dossier);
      console.log(`[TopicLifecycle] Initiating NEW topic dossier: ${slug} (${dossier.title})`);
    } else {
      const wasArchived = dossier.stage === 'archived';
      const sameRun = Boolean(runIdOf(runMeta) && dossier.lastRunId === runIdOf(runMeta));
      const unseen = !sameRun && hasNewEvidence(dossier, incoming);
      const changed = sameRun ? false : mergeContent(dossier, topic, meta, incoming, matched, display);
      const automatic = wasArchived && unseen ? 'reopen' : (unseen && changed ? 'iterate' : (unseen ? 'evolve' : null));
      const selected = action || automatic;
      recordLineage(dossier, runMeta);
      if (selected === 'reopen' && wasArchived) applyReopen(dossier, runMeta, display);
      if (selected === 'archive') applyArchive(dossier, runMeta, display, meta.archiveReason || topic.archiveReason);
      if (dossier.stage === 'active' && selected !== 'archive' && !sameRun) {
        dossier.updateCount += 1;
        dossier.lastAction = selected || (enhanced ? 'observe' : 'evolve');
        dossier.action = dossier.lastAction;
        if (dossier.updateCount >= 5) dossier.status = '⚡ 白热化推进与纵深博弈';
        else if (dossier.updateCount >= 2 && dossier.status === '🔥 初始建档') dossier.status = '🚨 关键穿梭与持续发酵';
      }
      if (unseen) {
        dossier.noEvidenceRuns = 0;
        dossier.noEvidenceRunIds = [];
        dossier.lastEvidenceRunId = runIdOf(runMeta) || dossier.lastEvidenceRunId;
      } else if (enhanced && dossier.stage === 'active') {
        const runId = runIdOf(runMeta);
        if (!runId || !dossier.noEvidenceRunIds.includes(runId)) {
          dossier.noEvidenceRuns += 1;
          if (runId) dossier.noEvidenceRunIds = uniqueValues(dossier.noEvidenceRunIds, [runId]).slice(-32);
        }
        if (dossier.noEvidenceRuns >= archiveAfterRuns) applyArchive(dossier, runMeta, display);
      }
      if (dossier.stage === 'active') active.push(dossier);
      console.log(`[TopicLifecycle] Evolved existing topic: ${slug} (Update #${dossier.updateCount})`);
    }
    if (dossier.stage === 'active' && !active.includes(dossier)) active.push(dossier);
  }

  for (const [slug, dossier] of existing) {
    if (touched.has(slug)) continue;
    if (enhanced && dossier.stage === 'active') {
      const runId = runIdOf(runMeta);
      if (!runId || !dossier.noEvidenceRunIds.includes(runId)) {
        dossier.noEvidenceRuns += 1;
        if (runId) dossier.noEvidenceRunIds = uniqueValues(dossier.noEvidenceRunIds, [runId]).slice(-32);
      }
      if (dossier.noEvidenceRuns >= archiveAfterRuns) applyArchive(dossier, runMeta, display);
    } else if (dossier.stage === 'active') {
      applyArchive(dossier, runMeta, display, '当前运行未进入活跃专题候选');
    }
  }

  saveTopicRegistry({ ...registry, topics: [...existing.values()] });
  return active;
}
