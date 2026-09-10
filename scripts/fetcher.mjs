/**
 * InfoLive 多源新闻与数据抓取模块
 */
import Parser from 'rss-parser';
import { JSDOM } from 'jsdom';

// 配置代理（本地环境使用代理，CI 中自动忽略）
const proxy = process.env.HTTP_PROXY || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.https_proxy || (process.platform === 'win32' && !process.env.CI ? 'http://127.0.0.1:7897' : undefined);
if (proxy) {
  try {
    const { ProxyAgent, setGlobalDispatcher } = await import('undici');
    setGlobalDispatcher(new ProxyAgent(proxy));
    console.log('[Fetcher] Configured undici proxy:', proxy);
  } catch (e) {
    console.warn('[Fetcher] Warning setting proxy:', e.message);
  }
}

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['description', 'descriptionSnippet'],
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['enclosure', 'enclosure'],
      ['dc:date', 'dcDate'],
      ['published', 'publishedDate']
    ]
  }
});

export function sanitizeXml(xml) {
  return xml.replace(/&(?!(?:apos|quot|[gl]t|amp);|#\d+;|#x[0-9a-fA-F]+;)/g, '&amp;');
}

export function cleanUrl(rawUrl) {
  if (!rawUrl) return '';
  try {
    const u = new URL(rawUrl.trim());
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'traffic_source', 'maca', 'taid', 'ocid', 'gclid', 'fbclid', 'feedburner'
    ];
    for (const p of trackingParams) {
      u.searchParams.delete(p);
    }
    return u.toString();
  } catch {
    return rawUrl.trim();
  }
}

export function cleanHtmlToParagraphs(rawHtml) {
  if (!rawHtml) return '';
  const text = rawHtml
    .replace(/<\/?(p|div|br|h[1-6]|li|blockquote)[^>]*>/gi, '\n\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#39;/gi, "'");

  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 20)
    .join('\n\n');
}

export const ARTICLE_BODY_MIN_CHARS = 320;
export const ARTICLE_BODY_MAX_CHARS = 18000;
export const ARTICLE_BODY_MIN_PARAGRAPHS = 2;

export function countContentParagraphs(text) {
  return String(text || '').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean).length;
}

export function contentStatusOf(text, { source = 'official-page', contentKind = 'article-body' } = {}) {
  const value = String(text || '').trim();
  if (source === 'rss' && contentKind === 'rss-summary') return value ? 'short-source' : 'missing';
  if (!value) return 'missing';
  const paragraphs = countContentParagraphs(value);
  return value.length >= ARTICLE_BODY_MIN_CHARS && (paragraphs >= ARTICLE_BODY_MIN_PARAGRAPHS || value.length >= 800) ? 'full' : 'short-source';
}

function decodeHtmlEntities(value) {
  return String(value || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

function normalizeArticleParagraph(value) {
  return decodeHtmlEntities(String(value || '').replace(/\s+/g, ' ').trim());
}

function articleParagraphsFromHtml(html) {
  const source = String(html || '');
  const dom = new JSDOM(source);
  const document = dom.window.document;
  const boilerplate = /cookie|privacy policy|terms of use|newsletter|subscribe|sign up|advertisement|all rights reserved|read more|share this|follow us|menu|navigation|login|register|cookie|订阅|导航|登录|广告/i;
  const selectors = [
    '[itemprop="articleBody"]',
    'article',
    'main',
    '.article-body',
    '.article-content',
    '.story-body',
    '.story-content',
    '.entry-content',
    '.post-content',
  ];
  const candidates = [];
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const parsed = JSON.parse(script.textContent || 'null');
      const values = Array.isArray(parsed) ? parsed : [parsed];
      for (const value of values) {
        const body = value && typeof value === 'object' ? value.articleBody : null;
        if (typeof body === 'string' && body.trim()) {
          const paragraphs = body.split(/\n\s*\n/).map(normalizeArticleParagraph).filter((paragraph) => paragraph.length >= 20 && !boilerplate.test(paragraph));
          if (paragraphs.length > 0) candidates.push(paragraphs);
        }
      }
    } catch {
      // Invalid JSON-LD is common on publisher pages; continue with semantic HTML.
    }
  }
  const seenScopes = new Set();
  for (const selector of selectors) {
    for (const scope of document.querySelectorAll(selector)) {
      if (seenScopes.has(scope)) continue;
      seenScopes.add(scope);
      const paragraphs = [...scope.querySelectorAll('p, [data-testid="paragraph"], [class*="paragraph"]')]
        .map((node) => normalizeArticleParagraph(node.textContent))
        .filter((paragraph) => paragraph.length >= 20 && !boilerplate.test(paragraph));
      const unique = [...new Map(paragraphs.map((paragraph) => [paragraph.toLowerCase(), paragraph])).values()];
      if (unique.length > 0) candidates.push(unique);
    }
  }
  // Some feeds expose a plain article body without semantic containers. Use all
  // paragraphs only as the final fallback, after scoped extraction attempts.
  if (candidates.length === 0) {
    const paragraphs = [...document.querySelectorAll('p')]
      .map((node) => normalizeArticleParagraph(node.textContent))
      .filter((paragraph) => paragraph.length >= 20 && !boilerplate.test(paragraph));
    if (paragraphs.length > 0) candidates.push([...new Map(paragraphs.map((paragraph) => [paragraph.toLowerCase(), paragraph])).values()]);
  }
  candidates.sort((left, right) => right.reduce((sum, value) => sum + value.length, 0) - left.reduce((sum, value) => sum + value.length, 0));
  return candidates[0] || [];
}
/** 从信源官方原语言文章页补抓正文；RSS 只有摘要时由 fetchAllFeeds 调用。 */
export async function fetchArticleBody(url, { fetchImpl = fetch, timeoutMs = 7000 } = {}) {
  if (!url) return null;
  try {
    const res = await fetchImpl(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 InfoLive/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return null;
    const body = articleParagraphsFromHtml(await res.text()).join('\n\n').slice(0, ARTICLE_BODY_MAX_CHARS);
    return body || null;
  } catch {
    return null;
  }
}

/** 以有界并发补齐 RSS 摘要过短的文章，避免一次性请求全部页面。 */
export async function enrichArticleBodies(items, { fetchImpl = fetch, maxItems = 120, concurrency = 8 } = {}) {
  const candidates = items
    .filter((item) => (item.contentStatus || contentStatusOf(item.fullContent)) !== 'full')
    .map((item, index) => ({ item, index, time: parsePublishedTimestamp(item.publishedAt || item.pubDate || ''), weight: Number(item.weight) || 0 }))
    .sort((left, right) => right.time - left.time || right.weight - left.weight || left.index - right.index)
    .slice(0, maxItems)
    .map(({ item }) => item);
  const queue = [...candidates];
  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) return;
      const body = await fetchArticleBody(item.link, { fetchImpl });
      if (body && body.length > String(item.fullContent || '').length) {
        item.fullContent = body;
        item.contentSource = 'official-page';
        item.contentKind = 'official-page-body';
      }
      item.contentStatus = contentStatusOf(item.fullContent, { source: item.contentSource, contentKind: item.contentKind });
      item.contentParagraphs = countContentParagraphs(item.fullContent);
    }
  }
  const workers = Math.max(1, Math.min(concurrency, candidates.length || 1));
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return items;
}

export function parsePublishedTimestamp(dateStr) {
  if (!dateStr) return 0;
  const timestamp = Date.parse(String(dateStr));
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function formatPubTime(dateStr) {
  const timestamp = parsePublishedTimestamp(dateStr);
  if (!timestamp) return '';
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(timestamp));
  const values = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}`;
}

export function getBeijingTime() {
  // Keep `iso` as the real instant in UTC. The previous implementation shifted
  // the Date object and then serialized it with a Z suffix, which made generated
  // timestamps look like Beijing time but actually claim to be UTC.
  const now = new Date();
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const values = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
  const y = values.year;
  const m = values.month;
  const d = values.day;
  const hh = values.hour;
  const mm = values.minute;
  return {
    iso: now.toISOString(),
    display: `${y}-${m}-${d} ${hh}:${mm} (UTC+8)`,
    hourOnly: `${hh}:${mm}`,
    dateOnly: `${y}-${m}-${d}`,
    timestamp: now.getTime(),
  };
}

function extractImageUrl(it, rawHtml) {
  // 1. Enclosure
  if (it.enclosure && it.enclosure.url && /\.(jpg|jpeg|png|webp|avif|gif)(\?.*)?$/i.test(it.enclosure.url)) {
    return it.enclosure.url;
  }
  // 2. Media Content
  const media = it.mediaContent || it.mediaThumbnail;
  if (media && media.$ && media.$.url && /\.(jpg|jpeg|png|webp|avif|gif)(\?.*)?$/i.test(media.$.url)) {
    return media.$.url;
  }
  // 3. Img tag in HTML
  if (rawHtml) {
    const match = rawHtml.match(/<img[^>]+src=["'](https?:\/\/[^"'\s>]+)["']/i);
    if (match && match[1] && !match[1].includes('feedburner') && !match[1].includes('tracking') && !match[1].includes('1x1') && !match[1].includes('spacer')) {
      return match[1];
    }
  }
  return null;
}

export async function fetchAllFeeds(sources) {
  console.log(`[Fetcher] Fetching ${sources.length} sources in parallel...`);
  const results = [];
  const sourceHealth = [];
  const concurrency = 6;
  const queue = [...sources];

  async function worker() {
    while (queue.length > 0) {
      const source = queue.shift();
      if (!source) break;
      const health = {
        sourceId: source.slug || source.name,
        name: source.name,
        url: source.url,
        ok: false,
        itemCount: 0,
        error: null,
        checkedAt: new Date().toISOString(),
        lastSuccessAt: null,
      };
      sourceHealth.push(health);
      try {
        const res = await fetch(source.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 InfoLive/1.0',
            'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*'
          },
          signal: AbortSignal.timeout(12000)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const cleaned = sanitizeXml(text);
        const feed = await parser.parseString(cleaned);
        const items = (feed.items || []).slice(0, 16).map((it) => {
          const rawHtml = it.contentEncoded || it.content || it.descriptionSnippet || '';
          const rawSnippet = it.contentSnippet || it.descriptionSnippet || it.summary || rawHtml || '';
          const snippet = rawSnippet.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500);
          const extractedRssBody = cleanHtmlToParagraphs(rawHtml);
          const hasRichRssBody = Boolean(extractedRssBody)
            && (/<(?:p|article|section|div)\b/i.test(rawHtml) || extractedRssBody.length > snippet.length + 80);
          const contentKind = hasRichRssBody ? 'rss-body' : 'rss-summary';
          const fullContent = hasRichRssBody ? extractedRssBody : snippet;
          const pubDate = it.isoDate || it.pubDate || it.dcDate || it.publishedDate || '';
          const publishedAtMs = parsePublishedTimestamp(pubDate);
          const pubTimeFormatted = formatPubTime(pubDate);
          const imageUrl = extractImageUrl(it, rawHtml);

          return {
            title: (it.title || '').trim(),
            link: cleanUrl(it.link || ''),
            pubDate,
            publishedAt: publishedAtMs ? new Date(publishedAtMs).toISOString() : null,
            publishedAtMs,
            pubTimeFormatted,
            snippet,
            fullContent: fullContent || snippet,
            contentSource: 'rss',
            contentKind,
            contentStatus: contentStatusOf(fullContent || snippet, { source: 'rss', contentKind }),
            contentParagraphs: countContentParagraphs(fullContent || snippet),
            imageUrl,
            sourceName: source.name,
            sourceSlug: source.slug,
            sourceLang: source.lang || 'en',
            category: source.category,
            weight: source.weight
          };
        }).filter((it) => it.title && it.link);
        console.log(`  ✓ [${source.name}] Fetched ${items.length} items (rss-full=${items.filter((item) => item.contentStatus === 'full').length}, needs-body=${items.filter((item) => item.contentStatus !== 'full').length})`);
        results.push(...items);
        health.ok = true;
        health.itemCount = items.length;
        health.lastSuccessAt = new Date().toISOString();
      } catch (err) {
        health.error = err instanceof Error ? err.message : String(err);
        console.warn(`  ✗ [${source.name}] Fetch failed: ${health.error}`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  const beforeEnrichment = results.filter((item) => item.contentStatus !== 'full').length;
  const enrichLimit = Number.parseInt(process.env.ARTICLE_BODY_ENRICH_LIMIT || '120', 10);
  await enrichArticleBodies(results, { maxItems: Number.isInteger(enrichLimit) && enrichLimit > 0 ? enrichLimit : 120, concurrency: 8 });
  const afterEnrichment = results.filter((item) => item.contentStatus === 'full').length;
  console.log(`[Fetcher] Official-page enrichment: ${beforeEnrichment} candidates, ${afterEnrichment} full items after enrichment`);
  console.log(`[Fetcher] Total raw items collected: ${results.length}`);

  // 按实际发布时间倒序排列（有发布时间的排在前）
  results.sort((a, b) => {
    const timeDelta = (b.publishedAtMs || parsePublishedTimestamp(b.publishedAt || b.pubDate))
      - (a.publishedAtMs || parsePublishedTimestamp(a.publishedAt || a.pubDate));
    return timeDelta || (b.weight || 5) - (a.weight || 5);
  });

  Object.defineProperty(results, 'sourceHealth', {
    value: sourceHealth.sort((a, b) => a.name.localeCompare(b.name)),
    enumerable: false,
    configurable: false,
  });
  return results;
}
