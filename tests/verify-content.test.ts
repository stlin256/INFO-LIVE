import { describe, expect, it } from 'vitest';
import { inspectHtml, verifyRemoteSite } from '../scripts/verify-content.mjs';

function card(status = 'full', translation = 'full', body = '<p>' + '第一段正文，包含足够的新闻事实、背景与相关主体信息。'.repeat(12) + '</p><p>' + '第二段正文，补充各方回应、影响和后续观察重点。'.repeat(12) + '</p>') {
  return '<div class="md-grid-cell"><div class="news-card-header" data-content-status="' + status + '" data-translation-status="' + translation + '" data-content-source="rss" data-content-length="320" data-content-paragraphs="2" data-published-at="2026-09-09T12:00:00Z" data-time-source="publication"><span class="source-badge">Example</span></div><h3><a href="https://example.test/story">标题</a></h3>' + body + '</div>';
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

});
