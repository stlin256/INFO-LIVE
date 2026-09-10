import { describe, expect, it } from 'vitest';
import { inspectHtml, verifyRemoteSite } from '../scripts/verify-content.mjs';

function card(status = 'full', translation = 'full', body = '<p>' + '第一段正文，包含足够的新闻事实、背景与相关主体信息。'.repeat(12) + '</p><p>' + '第二段正文，补充各方回应、影响和后续观察重点。'.repeat(12) + '</p>') {
  return '<div class="md-grid-cell"><div class="news-card-header" data-content-status="' + status + '" data-translation-status="' + translation + '" data-content-source="official-page" data-content-kind="official-page-body" data-content-length="320" data-content-paragraphs="2" data-published-at="2026-09-09T12:00:00Z" data-time-source="publication"><span class="source-badge">Example</span></div><h3><a href="https://example.test/story">标题</a></h3>' + body + '</div>';
}

describe('部署内容质量门禁', () => {
  it('accepts a page with enough translated article cards', () => {
    const html = '<html><body>' + Array.from({ length: 8 }, () => card()).join('') + '</body></html>';
    const report = inspectHtml(html, 'index.html');
    expect(report.issues).toEqual([]);
    expect(report.cards).toHaveLength(8);
  });

  it('rejects synopsis-only cards on the home page', () => {
    const html = '<html><body>' + Array.from({ length: 8 }, () => card('short-source', 'full', '<p>只有一段梗概。</p>')).join('') + '</body></html>';
    const report = inspectHtml(html, 'index.html');
    expect(report.issues.some((issue) => issue.includes('正文门禁失败'))).toBe(true);
  });

  it('rejects generic fabricated filler', () => {
    const html = '<html><body>' + Array.from({ length: 8 }, () => card('full', 'full', '<p>关键决策主体已围绕核心诉求采取了实质性动作。</p><p>第二段。</p>')).join('') + '</body></html>';
    const report = inspectHtml(html, 'index.html');
    expect(report.issues.some((issue) => issue.includes('模板化伪正文'))).toBe(true);
  });

  it('requires a visible downgrade notice for source-only channel cards', () => {
    const html = '<html><body><div class="md-grid-cell"><div class="news-card-header" data-content-status="short-source" data-translation-status="source-only" data-content-length="80" data-content-paragraphs="1"><span class="source-badge">Example</span></div><h3>标题</h3><p>摘要内容</p></div></body></html>';
    const report = inspectHtml(html, 'ai/index.html', { strictHome: false });
    expect(report.issues.some((issue) => issue.includes('缺少明确降级提示'))).toBe(true);
  });
  it('enforces full content on every channel during deployment verification', () => {
    const html = '<html><body>' + Array.from({ length: 2 }, () => card('short-source', 'source-only', '<p>摘要内容。</p>')).join('') + '</body></html>';
    const report = inspectHtml(html, 'ai/index.html', { strictHome: false, strictAll: true });
    expect(report.issues.some((issue) => issue.includes('正文门禁失败'))).toBe(true);
    expect(report.issues.some((issue) => issue.includes('缺少内容状态元数据'))).toBe(false);
  });

  it('rejects missing publication time and untranslated foreign article bodies', () => {
    const html = '<html><body><div class="md-grid-cell"><div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-source-lang="en" data-content-length="320" data-content-paragraphs="1" data-time-source="publication"><span class="source-badge">Example</span></div><div class="story-anchor" id="duplicate"></div><h3><a href="https://example.test/story">Title</a></h3><div class="article-body" data-article-body="true"><p>Only English source evidence without a target-language translation.</p></div></div></body></html>';
    const report = inspectHtml(html, 'ai/index.html', { strictHome: false, strictAll: true });
    expect(report.issues.some((issue) => issue.includes('新闻发布时间'))).toBe(true);
    expect(report.issues.some((issue) => issue.includes('疑似未翻译'))).toBe(true);
  });

  it('checks GitHub Pages base prefixes and duplicate story anchors', () => {
    const html = '<html><body>' + Array.from({ length: 2 }, () => '<div class="md-grid-cell"><div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-source-lang="zh" data-content-length="320" data-content-paragraphs="1" data-published-at="2026-09-09T12:00:00Z" data-time-source="publication"><span class="source-badge">Example</span></div><div class="story-anchor" id="same-story"></div><h3><a href="https://example.test/story">标题</a></h3><div class="article-body" data-article-body="true"><p>中文正文，包含足够的事实细节、背景和后续影响信息。</p></div></div>').join('') + '<img src="/assets/missing.svg">' + '</body></html>';
    const report = inspectHtml(html, 'ai/index.html', { strictHome: false, strictAll: true, expectedBasePrefix: '/INFO-LIVE' });
    expect(report.issues.some((issue) => issue.includes('文章锚点重复'))).toBe(true);
    expect(report.issues.some((issue) => issue.includes('缺少部署 base 前缀'))).toBe(true);
  });

  it('detects broken internal wire links while ignoring the shared footnote UI target', () => {
    const html = '<html><body><a href="#missing-story">broken</a><a href="#footnote-label">footnote</a></body></html>';
    const report = inspectHtml(html, 'index.html', { strictHome: false });
    expect(report.issues.some((issue) => issue.includes('内部跳转目标不存在'))).toBe(true);
    expect(report.issues.filter((issue) => issue.includes('footnote-label'))).toHaveLength(0);
  });

  it('reports remote HTTP failures instead of accepting a partial deployment', async () => {
    await expect(verifyRemoteSite('https://example.test/INFO-LIVE/', { retries: 1, delayMs: 0, fetchImpl: async () => new Response('', { status: 503 }) })).rejects.toThrow('请求失败');
  });

  it('checks every required remote route before accepting a deployment', async () => {
    const urls: string[] = [];
    const html = '<html><body>' + Array.from({ length: 8 }, () => card()).join('') + '</body></html>';
    const result = await verifyRemoteSite('https://example.test/INFO-LIVE/', {
      retries: 1,
      delayMs: 0,
      fetchImpl: async (url) => {
        urls.push(String(url));
        return new Response(html, { status: 200 });
      },
    });
    expect(result.ok).toBe(true);
    expect(urls).toHaveLength(5);
    expect(urls.at(-1)).toContain('trends/index.html');
  });

  it('binds remote verification to the build manifest identity', async () => {
    const html = '<html><body>' + Array.from({ length: 8 }, () => card()).join('') + '</body></html>';
    const urls: string[] = [];
    const result = await verifyRemoteSite('https://example.test/INFO-LIVE/', {
      retries: 1,
      delayMs: 0,
      expectedBuildId: 'sha:42',
      fetchImpl: async (url) => {
        urls.push(String(url));
        if (String(url).includes('deploy-manifest.json')) {
          return new Response(JSON.stringify({ buildId: 'sha:42', contentHash: 'hash' }), { status: 200, headers: { 'content-type': 'application/json' } });
        }
        return new Response(html, { status: 200 });
      },
    });
    expect(result.ok).toBe(true);
    expect(urls[0]).toContain('deploy-manifest.json');

    await expect(verifyRemoteSite('https://example.test/INFO-LIVE/', {
      retries: 1,
      delayMs: 0,
      expectedBuildId: 'new-sha:43',
      fetchImpl: async (url) => String(url).includes('deploy-manifest.json')
        ? new Response(JSON.stringify({ buildId: 'old-sha:1' }), { status: 200 })
        : new Response(html, { status: 200 }),
    })).rejects.toThrow('build identity mismatch');
  });

});
