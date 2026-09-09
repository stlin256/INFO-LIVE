/**
 * InfoLive 多源新闻与数据抓取模块
 */
import Parser from 'rss-parser';

// 配置代理
const proxy = process.env.HTTP_PROXY || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.https_proxy;
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
      ['description', 'descriptionSnippet']
    ]
  }
});

export function sanitizeXml(xml) {
  return xml.replace(/&(?!(?:apos|quot|[gl]t|amp);|#\d+;|#x[0-9a-fA-F]+;)/g, '&amp;');
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
    display: y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ' (UTC+8)',
    hourOnly: hh + ':' + mm,
    dateOnly: y + '-' + m + '-' + d,
    timestamp: Date.now()
  };
}

export async function fetchAllFeeds(sources) {
  console.log('[Fetcher] Fetching ' + sources.length + ' sources in parallel...');
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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 InfoLive/1.0',
            'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*'
          },
          signal: AbortSignal.timeout(12000)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const text = await res.text();
        const cleaned = sanitizeXml(text);
        const feed = await parser.parseString(cleaned);
        const items = (feed.items || []).slice(0, 10).map((it) => {
          const rawSnippet = it.contentSnippet || it.descriptionSnippet || it.summary || it.content || '';
          const snippet = rawSnippet.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300);
          return {
            title: (it.title || '').trim(),
            link: (it.link || '').trim(),
            pubDate: it.pubDate || it.isoDate || new Date().toISOString(),
            snippet,
            sourceName: source.name,
            sourceSlug: source.slug,
            category: source.category,
            weight: source.weight
          };
        }).filter(it => it.title && it.link);

        console.log('  ✓ [' + source.name + '] Fetched ' + items.length + ' items');
        results.push(...items);
      } catch (err) {
        console.warn('  ✗ [' + source.name + '] Fetch failed: ' + err.message);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  console.log('[Fetcher] Total raw items collected: ' + results.length);
  return results;
}