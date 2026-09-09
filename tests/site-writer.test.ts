import { describe, expect, it } from 'vitest';
import { renderArticleCard, renderLiveWireStream } from '../scripts/site-writer.mjs';
import { storyIdForUrl } from '../scripts/story-id.mjs';

describe('新闻文章卡片渲染', () => {
  const base = {
    id: 'story-test-1',
    title: '中文译文标题',
    originalTitle: 'Original article headline',
    source: 'Official Source',
    sourceSlug: 'bbc',
    url: 'https://example.test/article?utm_source=rss',
    pubTime: '09-09 12:34',
    fullContent: 'Original evidence paragraph',
    fullTranslation: '第一段是完整译文，包含事实、时间、主体和背景信息。\n\n第二段补充官方回应、影响范围与后续观察重点。',
    contentStatus: 'full',
    translationStatus: 'full',
    contentSource: 'official-page',
    translationParagraphs: 2,
  };

  it('keeps original title and marks a full translation without warning', () => {
    const markdown = renderArticleCard(base);
    expect(markdown).toContain('data-content-status="full"');
    expect(markdown).toContain('data-time-source="publication"');
    expect(markdown).toContain('data-published-at=""');
    expect(markdown).toContain('data-translation-status="full"');
    expect(markdown).toContain('data-article-body="true"');
    expect(markdown).toContain('Original article headline');
    expect(markdown).not.toContain('data-content-warning="true"');
    expect(markdown).toContain('https://example.test/article');
  });

  it('shows an explicit downgrade notice for source-only content', () => {
    const markdown = renderArticleCard({
      ...base,
      fullTranslation: '仅有官方摘要。',
      contentStatus: 'short-source',
      translationStatus: 'source-only',
      translationParagraphs: 1,
    });
    expect(markdown).toContain('data-content-warning="true"');
    expect(markdown).toContain('官方原文当前仅提供短讯或摘要');
  });
});

describe('快讯流链接', () => {
  it('creates an internal jump only when the target story exists', () => {
    const markdown = renderLiveWireStream([
      { time: '12:34', source: 'Source', sourceSlug: 'bbc', text: '标题', originalText: 'Headline', url: 'https://example.test/article?utm_source=rss' },
      { time: '12:35', source: 'Source', sourceSlug: 'bbc', text: '外部标题', originalText: 'External', url: 'https://example.test/other' },
    ], [{ id: 'story-test-1', url: 'https://example.test/article' }]);
    expect(markdown).toContain('href="#story-test-1"');
    expect(markdown).toContain('href="https://example.test/other" target="_blank"');
  });
});

describe('稳定故事锚点', () => {
  it('uses a readable suffix for ordinary URLs and a hash for non-Latin URLs', () => {
    expect(storyIdForUrl('https://example.test/story-123')).toBe('story-story123');
    expect(storyIdForUrl('https://例子.test/文章')).toMatch(/^story-[a-f0-9]{12}$/);
  });
});
