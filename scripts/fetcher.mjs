/**
 * InfoLive 多源新闻与数据抓取模块
 */
import Parser from 'rss-parser';

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

export function formatPubTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  // 转换为北京时间 (UTC+8)
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  const beijing = new Date(utc + (3600000 * 8));
  const pad = (n) => String(n).padStart(2, '0');
  const mm = pad(beijing.getMonth() + 1);
  const dd = pad(beijing.getDate());
  const hh = pad(beijing.getHours());
  const min = pad(beijing.getMinutes());
  return `${mm}-${dd} ${hh}:${min}`;
}

export function getBeijingTime() {
  const now = new Date();
  const beijing = new Date(now.getTime() + (8 * 60 + now.getTimezoneOffset()) * 60000);
  const pad = (n) => String(n).padStart(2, '0');
  const y = beijing.getFullYear();
  const m = pad(beijing.getMonth() + 1);
  const d = pad(beijing.getDate());
  const hh = pad(beijing.getHours());
  const mm = pad(beijing.getMinutes());
  return {
    iso: beijing.toISOString(),
    display: `${y}-${m}-${d} ${hh}:${mm} (UTC+8)`,
    hourOnly: `${hh}:${mm}`,
    dateOnly: `${y}-${m}-${d}`,
    timestamp: Date.now()
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
  const concurrency = 6;
  const queue = [...sources];

  async function worker() {
    while (queue.length > 0) {
      const source = queue.shift();
      if (!source) break;
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
          const fullContent = rawHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 3000);
          const pubDate = it.pubDate || it.isoDate || it.dcDate || it.publishedDate || '';
          const pubTimeFormatted = formatPubTime(pubDate);
          const imageUrl = extractImageUrl(it, rawHtml);

          return {
            title: (it.title || '').trim(),
            link: (it.link || '').trim(),
            pubDate,
            pubTimeFormatted,
            snippet,
            fullContent: fullContent || snippet,
            imageUrl,
            sourceName: source.name,
            sourceSlug: source.slug,
            category: source.category,
            weight: source.weight
          };
        }).filter(it => it.title && it.link);

        console.log(`  ✓ [${source.name}] Fetched ${items.length} items`);
        results.push(...items);
      } catch (err) {
        console.warn(`  ✗ [${source.name}] Fetch failed: ${err.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  console.log(`[Fetcher] Total raw items collected: ${results.length}`);
  // 按实际发布时间倒序排列（有发布时间的排在前）
  results.sort((a, b) => {
    const ta = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const tb = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return tb - ta;
  });
  return results;
}
