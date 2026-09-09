/**
 * Explicit, bounded context packs for the AI orchestration pipeline.
 *
 * This module deliberately has no I/O and no runtime dependencies. It accepts the
 * loosely-shaped objects produced by the feed/history layers and returns a small,
 * predictable payload for an agent role.
 */

const ARTICLE_ROLES = new Set([
  'article',
  'fact-extractor',
  'translator',
  'source-positioner',
  'topic-classifier',
  'media-evidence',
]);

const MACRO_ROLES = new Set([
  'hourly-editor',
  'daily-analyst',
  'social-trends',
  'editorial-qa',
  'macro-editor',
]);

export const DEFAULT_ROLE_BUDGETS = Object.freeze({
  article: 12000,
  'fact-extractor': 12000,
  translator: 12000,
  'source-positioner': 12000,
  'topic-classifier': 12000,
  'media-evidence': 6000,
  'evidence-merger': 28000,
  'hourly-editor': 20000,
  'daily-analyst': 20000,
  'social-trends': 16000,
  'topic-lifecycle': 16000,
  'editorial-qa': 20000,
  'macro-editor': 20000,
  default: 12000,
});

export const DEFAULT_BUDGET = Object.freeze({ maxInputChars: 12000, maxOutputChars: 6000 });

const DEFAULT_ROLE_OUTPUT_BUDGETS = Object.freeze({
  'fact-extractor': 5000,
  translator: 12000,
  'source-positioner': 5000,
  'topic-classifier': 4000,
  'media-evidence': 3000,
  'evidence-merger': 8000,
  'hourly-editor': 8000,
  'daily-analyst': 8000,
  'social-trends': 6000,
  'topic-lifecycle': 6000,
  'editorial-qa': 5000,
});

export const DEFAULT_HISTORY_WINDOW = Object.freeze({
  recentEvents: 8,
  previousSummaries: 2,
  relatedArticles: 8,
  relatedExcerptChars: 600,
});

const DEFAULT_REQUIRED_FIELDS = Object.freeze([
  'article.originalTitle',
  'article.sourceLang',
  'article.publishedAt',
  'article.url',
  'evidence.citations',
]);

const SENSITIVE_KEY = /(?:api[_-]?key|access[_-]?token|refresh[_-]?token|authorization|bearer|password|passwd|secret|private[_-]?key|client[_-]?secret|cookie|set-cookie|credential|webhook|session(?:[_-]?id)?|jwt|oauth)/i;
const SENSITIVE_QUERY_KEY = /(?:token|key|secret|auth|signature|sig|password|credential|session)/i;
const BOILERPLATE_LINE = /^(?:subscribe|sign\s*up|log\s*in|login|register|advertisement|advertising|sponsored|newsletter|follow\s+us|share\s+(?:this|on)|read\s+more|all\s+rights\s+reserved|cookie(?:s)?|privacy\s+policy|terms\s+of\s+(?:use|service)|导航|订阅|登录|注册|广告|赞助|隐私政策|服务条款|关注我们|分享|阅读更多|版权所有)/i;

function asObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function firstDefined(object, keys, fallback = null) {
  for (const key of keys) {
    if (object[key] !== undefined && object[key] !== null) return object[key];
  }
  return fallback;
}

function safeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  return String(value);
}

function scrubUrl(value) {
  const raw = safeString(value).trim();
  if (!raw) return raw;

  try {
    const parsed = new URL(raw);
    for (const key of [...parsed.searchParams.keys()]) {
      if (SENSITIVE_QUERY_KEY.test(key)) parsed.searchParams.delete(key);
    }
    return parsed.toString();
  } catch {
    // Relative URLs and malformed feed URLs are still useful evidence. Remove
    // only obviously credential-bearing query parameters without rejecting them.
    return raw.replace(/([?&](?:token|key|secret|auth|signature|sig|password|credential)=[^&#]*)/gi, '');
  }
}

function redactSensitiveText(value) {
  return safeString(value)
    .replace(/\bBearer\s+[A-Za-z0-9._~+/=-]+/gi, 'Bearer [REDACTED]')
    .replace(/\b(?:sk|rk|ghp|github_pat|xox[baprs])[-_][A-Za-z0-9_-]+/gi, '[REDACTED]');
}

function sanitizeValue(value, parentKey = '') {
  if (Array.isArray(value)) return value.map((item) => sanitizeValue(item, parentKey));
  if (value && typeof value === 'object') {
    const result = {};
    for (const [key, child] of Object.entries(value)) {
      if (SENSITIVE_KEY.test(key)) continue;
      result[key] = sanitizeValue(child, key);
    }
    return result;
  }
  if (typeof value === 'string') {
    return parentKey.toLowerCase().endsWith('url') || parentKey === 'link'
      ? scrubUrl(value)
      : redactSensitiveText(value);
  }
  return value;
}

/** Remove credential-like keys and redact credential-like values without mutating input. */
export function sanitizeSensitiveFields(value) {
  return sanitizeValue(value);
}

/** Remove common feed navigation/subscription noise while retaining article text. */
export function cleanText(value) {
  const text = redactSensitiveText(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\r\n?/g, '\n');

  return text
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .filter((line) => line && !BOILERPLATE_LINE.test(line))
    .join('\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function clip(value, maxChars) {
  const text = safeString(value);
  const max = Math.max(0, Number(maxChars) || 0);
  if (!text || max === 0) return '';
  if (text.length <= max) return text;
  if (max === 1) return '…';
  return `${text.slice(0, max - 1)}…`;
}

function parseTime(value) {
  if (value === undefined || value === null || value === '') return 0;
  const time = Date.parse(String(value));
  return Number.isFinite(time) ? time : 0;
}

function numeric(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function sourceWeight(item) {
  const source = asObject(item.source);
  return numeric(firstDefined(item, ['sourceWeight', 'weight'], firstDefined(source, ['weight', 'priority'], 0)));
}

function evidenceScore(item) {
  return numeric(firstDefined(item, ['evidenceScore', 'score'], 0));
}

function sortRecent(left, right) {
  return parseTime(firstDefined(right, ['publishedAt', 'timestamp', 'date', 'createdAt']))
    - parseTime(firstDefined(left, ['publishedAt', 'timestamp', 'date', 'createdAt']));
}

function normalizeArticle(articleInput) {
  const article = asObject(sanitizeValue(articleInput));
  const title = safeString(firstDefined(article, ['translatedTitle', 'title', 'headline'], ''));
  const originalTitle = safeString(firstDefined(article, ['originalTitle', 'original_title', 'headline'], title));
  const fullContent = cleanText(firstDefined(article, ['fullContent', 'content', 'body', 'text', 'fullTranslation'], ''));
  const url = scrubUrl(firstDefined(article, ['url', 'link', 'permalink'], ''));

  return {
    id: firstDefined(article, ['id', 'articleId'], null),
    title,
    originalTitle,
    source: safeString(firstDefined(article, ['source', 'sourceName', 'publisher'], '')),
    sourceLang: safeString(firstDefined(article, ['sourceLang', 'language', 'lang'], '')),
    publishedAt: firstDefined(article, ['publishedAt', 'published_at'], null),
    publishedAtDisplay: firstDefined(article, ['publishedAtDisplay', 'pubTimeFormatted', 'pubTime'], null),
    url,
    snippet: cleanText(firstDefined(article, ['snippet', 'summary', 'description', 'excerpt'], '')),
    fullContent,
    imageUrl: scrubUrl(firstDefined(article, ['imageUrl', 'image', 'image_url'], '')) || null,
  };
}

function normalizeCitations(input) {
  const value = Array.isArray(input) ? input : input ? [input] : [];
  return value.map((citation) => {
    if (typeof citation === 'string') return redactSensitiveText(citation);
    const item = asObject(sanitizeValue(citation));
    return {
      ...item,
      ...(item.url !== undefined ? { url: scrubUrl(item.url) } : {}),
      ...(item.quote !== undefined ? { quote: cleanText(item.quote) } : {}),
    };
  });
}

function normalizeEvidence(input, topLevelCitations) {
  const evidence = asObject(sanitizeValue(input));
  return {
    facts: Array.isArray(evidence.facts) ? evidence.facts : [],
    quotes: Array.isArray(evidence.quotes) ? evidence.quotes : [],
    entities: Array.isArray(evidence.entities) ? evidence.entities : [],
    conflicts: Array.isArray(evidence.conflicts) ? evidence.conflicts : [],
    citations: normalizeCitations(firstDefined(evidence, ['citations'], topLevelCitations)),
  };
}

function normalizeRelatedArticles(items) {
  const related = Array.isArray(items) ? items : [];
  return related
    .map((raw, index) => {
      const item = asObject(sanitizeValue(raw));
      const sourceValue = firstDefined(item, ['source', 'sourceName', 'publisher'], '');
      return {
        _index: index,
        _sourceWeight: sourceWeight(item),
        _evidenceScore: evidenceScore(item),
        _publishedAtTime: parseTime(firstDefined(item, ['publishedAt', 'published_at', 'pubTime', 'date'])),
        id: firstDefined(item, ['id', 'articleId'], null),
        title: safeString(firstDefined(item, ['title', 'originalTitle', 'headline'], '')),
        source: typeof sourceValue === 'string' ? sourceValue : safeString(firstDefined(asObject(sourceValue), ['name', 'title'], '')),
        publishedAt: firstDefined(item, ['publishedAt', 'published_at'], null),
        url: scrubUrl(firstDefined(item, ['url', 'link', 'permalink'], '')),
        excerpt: clip(cleanText(firstDefined(item, ['excerpt', 'snippet', 'summary', 'description'], '')), DEFAULT_HISTORY_WINDOW.relatedExcerptChars),
      };
    })
    .sort((left, right) => right._publishedAtTime - left._publishedAtTime
      || right._sourceWeight - left._sourceWeight
      || right._evidenceScore - left._evidenceScore
      || left._index - right._index)
    .map(({ _index, _sourceWeight, _evidenceScore, _publishedAtTime, ...item }) => item);
}

function normalizeTopicContext(input, historyWindow) {
  const topic = asObject(sanitizeValue(input));
  const previous = firstDefined(topic, ['previousSummary', 'previousSummaries', 'summaries'], null);
  const previousSummary = Array.isArray(previous)
    ? previous.slice(-historyWindow.previousSummaries)
    : previous;
  const events = Array.isArray(topic.recentEvents)
    ? topic.recentEvents.slice().sort(sortRecent).slice(0, historyWindow.recentEvents)
    : [];

  return {
    slug: firstDefined(topic, ['slug', 'topicSlug'], null),
    stage: firstDefined(topic, ['stage', 'status'], null),
    updateCount: firstDefined(topic, ['updateCount', 'updates'], 0),
    previousSummary: typeof previousSummary === 'string' ? cleanText(previousSummary) : previousSummary,
    recentEvents: events,
  };
}

function resolveRole(input, options) {
  return safeString(options.role || input.role || input.taskRole || input.taskType || 'article');
}

export function getContextBudget(role = 'article', overrides = {}) {
  const budgetTable = { ...DEFAULT_ROLE_BUDGETS, ...(overrides.roleBudgets || {}), ...(overrides.budgets || {}) };
  const roleName = safeString(role);
  if (budgetTable[roleName] !== undefined) return numeric(budgetTable[roleName], DEFAULT_ROLE_BUDGETS.default);
  if (ARTICLE_ROLES.has(roleName)) return numeric(budgetTable.article, DEFAULT_ROLE_BUDGETS.article);
  if (MACRO_ROLES.has(roleName)) return numeric(budgetTable['hourly-editor'], DEFAULT_ROLE_BUDGETS['hourly-editor']);
  return numeric(budgetTable.default, DEFAULT_ROLE_BUDGETS.default);
}

export function getContextOutputBudget(role = 'article', overrides = {}) {
  const outputBudgets = { ...DEFAULT_ROLE_OUTPUT_BUDGETS, ...(overrides.outputBudgets || {}) };
  return numeric(outputBudgets[role], DEFAULT_BUDGET.maxOutputChars);
}

function serializedLength(value) {
  return JSON.stringify(value).length;
}

function reduceArray(array, amount = 1) {
  if (!Array.isArray(array) || array.length === 0) return false;
  array.splice(Math.max(0, array.length - amount), amount);
  return true;
}

function reducePack(pack, budget, markTruncated) {
  let guard = 0;
  while (serializedLength(pack) > budget && guard < 1000) {
    guard += 1;
    const overflow = serializedLength(pack) - budget;
    let changed = false;

    if (pack.article.fullContent) {
      const target = Math.max(0, pack.article.fullContent.length - Math.max(64, overflow + 16));
      pack.article.fullContent = clip(pack.article.fullContent, target);
      changed = true;
    } else if (pack.article.snippet) {
      const target = Math.max(0, pack.article.snippet.length - Math.max(32, overflow + 8));
      pack.article.snippet = clip(pack.article.snippet, target);
      changed = true;
    } else {
      for (const key of ['facts', 'quotes', 'entities', 'conflicts']) {
        if (reduceArray(pack.evidence[key])) {
          changed = true;
          break;
        }
      }
    }

    if (!changed && pack.relatedArticles.some((item) => item.excerpt)) {
      const item = pack.relatedArticles.find((candidate) => candidate.excerpt);
      item.excerpt = clip(item.excerpt, Math.max(0, item.excerpt.length - Math.max(32, overflow + 8)));
      changed = true;
    }

    if (!changed && pack.relatedArticles.length > 1) {
      pack.relatedArticles.pop();
      changed = true;
    }

    if (!changed && pack.topicContext.recentEvents.length > 0) {
      pack.topicContext.recentEvents.pop();
      changed = true;
    }

    if (!changed && Array.isArray(pack.topicContext.previousSummary) && pack.topicContext.previousSummary.length > 0) {
      pack.topicContext.previousSummary.pop();
      changed = true;
    }

    if (!changed && typeof pack.topicContext.previousSummary === 'string' && pack.topicContext.previousSummary) {
      pack.topicContext.previousSummary = clip(
        pack.topicContext.previousSummary,
        Math.max(0, pack.topicContext.previousSummary.length - Math.max(32, overflow + 8)),
      );
      changed = true;
    }

    if (!changed) break;
    markTruncated();
  }
}

/**
 * Build a bounded Context Pack for one orchestration task.
 *
 * `options` is optional; callers may also put the same budget/history options on
 * the input object. The function never mutates any input object.
 */
export function buildContextPack(input = {}, options = {}) {
  const raw = asObject(input);
  const data = { ...asObject(raw.context), ...asObject(raw.input), ...asObject(raw.payload), ...raw };
  const opts = { ...asObject(data.options), ...asObject(options) };
  const role = resolveRole(data, opts);
  const historyWindow = {
    ...DEFAULT_HISTORY_WINDOW,
    ...asObject(data.historyLimits),
    ...asObject(data.historyWindow),
    ...asObject(opts.historyWindow),
  };
  const maxInputChars = Math.max(
    1,
    numeric(
      opts.maxInputChars ?? data.maxInputChars ?? asObject(data.budget).maxInputChars ?? asObject(data.constraints).maxInputChars,
      getContextBudget(role, opts),
    ),
  );
  const maxOutputChars = Math.max(
    1,
    numeric(opts.maxOutputChars ?? data.maxOutputChars ?? asObject(data.budget).maxOutputChars ?? asObject(data.constraints).maxOutputChars, getContextOutputBudget(role, opts)),
  );
  const now = opts.now ?? data.now;
  const generatedAt = safeString(
    data.generatedAt || (typeof now === 'function' ? now() : now) || new Date().toISOString(),
  );
  const topLevelCitations = data.citations || asObject(data.evidence).citations;
  let wasTruncated = false;
  const markTruncated = () => {
    wasTruncated = true;
  };

  const pack = {
    schemaVersion: 1,
    runId: firstDefined(data, ['runId'], `run-${generatedAt.replace(/[^0-9A-Za-z]/g, '').slice(0, 24)}`),
    taskId: firstDefined(data, ['taskId'], role),
    role,
    generatedAt,
    targetLanguage: safeString(firstDefined(data, ['targetLanguage', 'language'], 'zh')),
    article: normalizeArticle(data.article || data),
    evidence: normalizeEvidence(data.evidence, topLevelCitations),
    relatedArticles: normalizeRelatedArticles(data.relatedArticles || data.relatedSources || data.related),
    topicContext: normalizeTopicContext(data.topicContext || data.topic, historyWindow),
    constraints: {
      maxInputChars,
      maxOutputChars,
      requiredFields: Array.isArray(opts.requiredFields || data.requiredFields)
        ? [...(opts.requiredFields || data.requiredFields)]
        : [...DEFAULT_REQUIRED_FIELDS],
    },
    lineage: {
      parentTaskIds: Array.isArray(asObject(data.lineage).parentTaskIds) ? [...asObject(data.lineage).parentTaskIds] : [],
      sourceItemIds: Array.isArray(asObject(data.lineage).sourceItemIds) ? [...asObject(data.lineage).sourceItemIds] : [],
    },
    truncated: false,
  };

  // Apply the hard history limits before the character budget. The limits are
  // intentionally explicit so a macro task cannot inherit an unbounded dossier.
  if (pack.relatedArticles.length > historyWindow.relatedArticles) {
    pack.relatedArticles.length = historyWindow.relatedArticles;
    markTruncated();
  }
  if (pack.topicContext.recentEvents.length > historyWindow.recentEvents) {
    pack.topicContext.recentEvents.length = historyWindow.recentEvents;
    markTruncated();
  }
  if (Array.isArray(pack.topicContext.previousSummary) && pack.topicContext.previousSummary.length > historyWindow.previousSummaries) {
    pack.topicContext.previousSummary = pack.topicContext.previousSummary.slice(-historyWindow.previousSummaries);
    markTruncated();
  }

  reducePack(pack, maxInputChars, markTruncated);
  pack.truncated = wasTruncated || serializedLength(pack) > maxInputChars;
  return pack;
}

export const createContextPack = buildContextPack;
export const buildArticleContextPack = buildContextPack;
export const buildContextPackForArticle = buildContextPack;

export function buildArticleContext(article, options = {}) {
  return buildContextPack({ ...options, article });
}

export function buildRelatedArticlesContext(relatedArticles, options = {}) {
  return buildContextPack({ ...options, relatedArticles });
}

export function buildTopicContext(topicContext, options = {}) {
  return buildContextPack({ ...options, topicContext });
}
export const truncateText = clip;
export const stripSensitiveFields = sanitizeSensitiveFields;

export function trimContextPack(pack, maxInputChars) {
  const copy = sanitizeValue(pack);
  const budget = Math.max(1, numeric(maxInputChars, asObject(copy.constraints).maxInputChars || DEFAULT_BUDGET.maxInputChars));
  let truncated = Boolean(copy.truncated);
  reducePack(copy, budget, () => { truncated = true; });
  copy.truncated = truncated || serializedLength(copy) > budget;
  if (copy.constraints && typeof copy.constraints === 'object') copy.constraints.maxInputChars = budget;
  return copy;
}

export const truncateContextPack = trimContextPack;

export default buildContextPack;
