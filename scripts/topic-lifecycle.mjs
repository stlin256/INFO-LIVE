/**
 * InfoLive 跨 Actions 话题生命周期管理系统 (Topic Lifecycle Architecture)
 * 支持：话题初始建档（Initiation）、持续追踪与事实增量扩充（Evolution）、
 * 战略研判迭代（Iteration）、以及阶段性结项与持久归档（Archiving）。
 */
import fs from 'node:fs';
import path from 'node:path';

const TOPICS_DIR = path.resolve('data/history/topics');
const REGISTRY_FILE = path.join(TOPICS_DIR, 'topics-registry.json');

export function ensureTopicStorage() {
  if (!fs.existsSync(TOPICS_DIR)) {
    fs.mkdirSync(TOPICS_DIR, { recursive: true });
  }
  if (!fs.existsSync(REGISTRY_FILE)) {
    fs.writeFileSync(REGISTRY_FILE, JSON.stringify({ topics: [] }, null, 2), 'utf8');
  }
}

export function loadTopicRegistry() {
  ensureTopicStorage();
  try {
    const raw = fs.readFileSync(REGISTRY_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.warn('[TopicLifecycle] Error reading topic registry, initializing fresh:', err.message);
    return { topics: [] };
  }
}

export function saveTopicRegistry(registry) {
  ensureTopicStorage();
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2), 'utf8');
  console.log(`[TopicLifecycle] Saved topic registry with ${registry.topics.length} total dossiers.`);
}

/**
 * 跨 Actions 增量更新与生命周期演进函数
 */
export function evolveTopics(baseTopics, rawItems, timeInfo) {
  const registry = loadTopicRegistry();
  const existingMap = new Map(registry.topics.map((t) => [t.slug, t]));

  const updatedTopics = [];

  for (const t of baseTopics) {
    let dossier = existingMap.get(t.slug);

    if (!dossier) {
      // 1. 话题开始 / 初始建档 (Initiation)
      console.log(`[TopicLifecycle] Initiating NEW topic dossier: ${t.slug} (${t.title})`);
      dossier = {
        slug: t.slug,
        navTitle: t.navTitle || `专题: ${t.title.slice(0, 8)}`,
        title: t.title,
        tagline: t.tagline,
        status: t.status || '🔥 初始建档',
        stage: 'active',
        createdAt: timeInfo.display,
        lastUpdated: timeInfo.display,
        updateCount: 1,
        overview: t.overview,
        stanceAnalysis: t.stanceAnalysis,
        timeline: t.timeline || [],
        keyJudgments: t.keyJudgments || [],
        relatedArticleUrls: []
      };
      existingMap.set(t.slug, dossier);
    } else {
      // 2. 跨 Actions 继承、扩充与迭代 (Evolution & Iteration)
      dossier.updateCount = (dossier.updateCount || 1) + 1;
      dossier.lastUpdated = timeInfo.display;

      // 动态演进状态
      if (dossier.updateCount >= 5 && dossier.stage === 'active') {
        dossier.status = '⚡ 白热化推进与纵深博弈';
      } else if (dossier.updateCount >= 2 && dossier.status === '🔥 初始建档') {
        dossier.status = '🚨 关键穿梭与持续发酵';
      }

      // 合并并增量追加大事记时间轴（防重复）
      const existingTimelineTitles = new Set((dossier.timeline || []).map((ev) => ev.title));
      if (t.timeline && t.timeline.length > 0) {
        for (const ev of t.timeline) {
          if (!existingTimelineTitles.has(ev.title)) {
            dossier.timeline.unshift(ev); // 最新的置于顶部
            existingTimelineTitles.add(ev.title);
          }
        }
      }

      // 迭代最新研判与综述
      if (t.overview && t.overview.length > (dossier.overview || '').length) {
        dossier.overview = t.overview;
      }
      if (t.keyJudgments && t.keyJudgments.length > 0) {
        dossier.keyJudgments = t.keyJudgments;
      }
      if (t.stanceAnalysis) {
        dossier.stanceAnalysis = t.stanceAnalysis;
      }

      console.log(`[TopicLifecycle] Evolved existing topic: ${t.slug} (Update #${dossier.updateCount})`);
    }

    // 关联本小时一手报道
    const slugKeywords = t.slug.replace(/^topic-/, '').split('-');
    const matchedArticles = rawItems.filter((item) => {
      const text = `${item.title} ${item.snippet || ''}`.toLowerCase();
      return slugKeywords.some((kw) => kw.length > 2 && text.includes(kw));
    });

    const relatedUrls = new Set(dossier.relatedArticleUrls || []);
    for (const m of matchedArticles.slice(0, 5)) {
      relatedUrls.add(m.link);
    }
    dossier.relatedArticleUrls = Array.from(relatedUrls).slice(0, 30);

    updatedTopics.push(dossier);
  }

  // 3. 话题归档判断 (Archiving)
  // 如果某个长期未有新动作的专题（例如 updateCount > 100 且 72 小时无更新），可将其 stage 置为 'archived'
  for (const [slug, item] of existingMap) {
    if (!baseTopics.some((bt) => bt.slug === slug)) {
      // 虽不在当前主要热榜，仍保留在持久库中
      if (item.stage === 'active') {
        item.status = '📦 阶段性归档与长期沉淀';
        item.stage = 'archived';
      }
    }
  }

  // 保存全量专题注册库
  saveTopicRegistry({ topics: Array.from(existingMap.values()) });

  // 返回当前处于活跃状态的专题供页面呈现
  return updatedTopics;
}
