import { describe, expect, it } from 'vitest';
import { countContentParagraphs, contentStatusOf, enrichArticleBodies, fetchAllFeeds, fetchArticleBody, formatPubTime, parsePublishedTimestamp, selectEnrichmentCandidates } from '../scripts/fetcher.mjs';

describe('发布时间规范化', () => {
  it('uses the publication instant for sorting/display and keeps the year', () => {
    expect(parsePublishedTimestamp('2024-12-24T00:44:00Z')).toBe(Date.parse('2024-12-24T00:44:00Z'));
    expect(formatPubTime('2024-12-24T00:44:00Z')).toBe('2024-12-24 08:44');
    expect(parsePublishedTimestamp('not-a-date')).toBe(0);
  });
});

describe('有界正文补抓的频道公平性', () => {
  it('reserves enrichment capacity for categories that would otherwise be starved', () => {
    const items = [
      ...Array.from({ length: 10 }, (_, index) => ({ category: 'world', link: `https://example.test/world-${index}`, contentStatus: 'short-source', pubDate: `2026-09-10T00:${String(index).padStart(2, '0')}:00Z` })),
      ...Array.from({ length: 2 }, (_, index) => ({ category: 'community', link: `https://example.test/community-${index}`, contentStatus: 'short-source', pubDate: '2026-09-09T00:00:00Z' })),
    ];
    const selected = selectEnrichmentCandidates(items, 6);
    expect(selected.filter((item: any) => item.category === 'community')).toHaveLength(2);
    expect(selected).toHaveLength(6);
  });
});

describe('正文采集与内容状态', () => {
  it('returns per-source health without changing the array API', async () => {
    const xml = '<rss version="2.0"><channel><title>Example</title><item><title>Headline</title><link>https://example.test/story</link><pubDate>Wed, 09 Sep 2026 12:00:00 GMT</pubDate><description>Short evidence</description></item></channel></rss>';
    const previousFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response(xml, { status: 200, headers: { 'content-type': 'application/rss+xml' } });
    try {
      const items = await fetchAllFeeds([{ name: 'Example', slug: 'example', lang: 'en', category: 'world', weight: 8, url: 'https://example.test/feed' }]);
      expect(Array.isArray(items)).toBe(true);
      expect((items as any).sourceHealth).toHaveLength(1);
      expect((items as any).sourceHealth[0]).toMatchObject({ name: 'Example', ok: true, itemCount: 1 });
    } finally {
      globalThis.fetch = previousFetch;
    }
  });

  it('extracts article paragraphs from official HTML and filters boilerplate', async () => {
    const html = '<html><body><nav>Subscribe to newsletter</nav><article><p>' + '第一段是官方文章正文，包含足够的事实细节与上下文信息。'.repeat(8) + '</p><p>' + '第二段继续说明事件进展、相关机构回应以及后续影响。'.repeat(8) + '</p><p>Read more</p></article></body></html>';
    const body = await fetchArticleBody('https://example.test/story', { fetchImpl: async () => new Response(html) });
    expect(body).toContain('第一段是官方文章正文');
    expect(body).toContain('第二段继续说明事件进展');
    expect(body).not.toContain('Read more');
    expect(countContentParagraphs(body)).toBe(2);
    expect(contentStatusOf(body)).toBe('full');
  });


  it('does not classify a long single-paragraph RSS synopsis as full unless it has article-sized evidence', () => {
    expect(contentStatusOf('一段摘要。'.repeat(80))).toBe('short-source');
    expect(contentStatusOf('一段官方公告正文，包含完整背景、主体、时间、回应与后续安排。'.repeat(130))).toBe('full');
  });

  it('uses JSON-LD articleBody when semantic HTML is unavailable', async () => {
    const html = '<html><head><script type="application/ld+json">' + JSON.stringify({ articleBody: '第一段来自结构化正文，包含事件背景、事实细节与官方回应。'.repeat(16) + '\n\n' + '第二段补充影响与后续安排。'.repeat(16) }) + '</script></head><body><p>Subscribe</p></body></html>';
    const body = await fetchArticleBody('https://example.test/jsonld', { fetchImpl: async () => new Response(html) });
    expect(body).toContain('第一段来自结构化正文');
    expect(contentStatusOf(body)).toBe('full');
  });
  it('returns null when the official page has no usable body', async () => {
    const body = await fetchArticleBody('https://example.test/empty', { fetchImpl: async () => new Response('<html><body><p>Subscribe</p></body></html>') });
    expect(body).toBeNull();
    expect(contentStatusOf('')).toBe('missing');
  });

  it('returns null when the official page cannot be read', async () => {
    const body = await fetchArticleBody('https://example.test/missing', { fetchImpl: async () => new Response('', { status: 503 }) });
    expect(body).toBeNull();
  });

  it('enriches only short items with bounded official-page requests', async () => {
    const calls: string[] = [];
    const items = [
      { link: 'https://example.test/short', fullContent: '摘要', contentStatus: 'short-source' },
      { link: 'https://example.test/full', fullContent: '第一段已足够长的正文内容，提供事实背景与细节。\\n\\n第二段补充后续影响与各方回应，确保内容完整。', contentStatus: 'full' },
    ];
    const enriched = await enrichArticleBodies(items, {
      concurrency: 1,
      fetchImpl: async (url) => {
        calls.push(String(url));
        return new Response('<article><p>' + '官方页面第一段正文，包含事件的事实、时间与主体等必要信息。'.repeat(8) + '</p><p>' + '官方页面第二段正文，补充各方反应、影响与后续观察。'.repeat(8) + '</p></article>');
      },
    });
    expect(calls).toEqual(['https://example.test/short']);
    expect(enriched[0].contentSource).toBe('official-page');
    expect(enriched[0].contentStatus).toBe('full');
    expect(enriched[0].contentParagraphs).toBe(2);
    expect(enriched[1].contentSource).toBeUndefined();
  });
});

