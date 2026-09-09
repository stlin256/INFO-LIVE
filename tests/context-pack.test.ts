import { describe, expect, it } from 'vitest';
import {
  buildContextPack,
  DEFAULT_ROLE_BUDGETS,
  sanitizeSensitiveFields,
} from '../scripts/context-pack.mjs';

describe('Context Pack', () => {
  it('keeps article identity, provenance, and citations with normalized feed aliases', () => {
    const pack = buildContextPack({
      runId: 'run-1',
      taskId: 'article-1',
      role: 'translator',
      targetLanguage: 'zh',
      article: {
        id: 'a-1',
        title: '译后标题',
        originalTitle: 'Original title',
        sourceName: 'Example News',
        sourceLang: 'en',
        publishedAt: '2026-09-09T12:00:00Z',
        link: 'https://example.com/story',
        snippet: 'A useful summary',
        fullContent: 'The original article body.',
        contentStatus: 'full',
        contentSource: 'official-page',
        contentParagraphs: 3,
      },
      evidence: { citations: [{ source: 'Example News', url: 'https://example.com/story' }] },
    });

    expect(pack.schemaVersion).toBe(1);
    expect(pack.article).toMatchObject({
      id: 'a-1',
      title: '译后标题',
      originalTitle: 'Original title',
      source: 'Example News',
      sourceLang: 'en',
      publishedAt: '2026-09-09T12:00:00Z',
      url: 'https://example.com/story',
      contentStatus: 'full',
      contentSource: 'official-page',
      contentParagraphs: 3,
    });
    expect(pack.evidence.citations).toHaveLength(1);
    expect(pack.constraints.requiredFields).toEqual(expect.arrayContaining([
      'article.originalTitle',
      'article.sourceLang',
      'article.publishedAt',
      'article.url',
      'evidence.citations',
    ]));
  });

  it('uses role budgets and marks content as truncated when it exceeds the budget', () => {
    const pack = buildContextPack({
      role: 'fact-extractor',
      article: {
        originalTitle: 'Keep this original title',
        sourceLang: 'en',
        publishedAt: '2026-09-09T12:00:00Z',
        url: 'https://example.com/a',
        fullContent: 'x'.repeat(20000),
      },
    }, { maxInputChars: 900 });

    expect(DEFAULT_ROLE_BUDGETS['fact-extractor']).toBe(12000);
    expect(pack.constraints.maxInputChars).toBe(900);
    expect(pack.truncated).toBe(true);
    expect(pack.article.originalTitle).toBe('Keep this original title');
    expect(pack.article.sourceLang).toBe('en');
    expect(pack.article.publishedAt).toBe('2026-09-09T12:00:00Z');
    expect(pack.article.url).toBe('https://example.com/a');
    expect(pack.article.fullContent.length).toBeLessThan(20000);
  });

  it('sorts related sources by publication time, then source weight and evidence score', () => {
    const pack = buildContextPack({
      relatedArticles: [
        { id: 'old', title: 'Old', source: 'A', publishedAt: '2026-09-08T12:00:00Z', url: '/old', excerpt: 'x' },
        { id: 'new-low', title: 'New low', source: 'B', publishedAt: '2026-09-09T12:00:00Z', sourceWeight: 1, evidenceScore: 1, url: '/new-low', excerpt: 'x'.repeat(900) },
        { id: 'new-high', title: 'New high', source: 'C', publishedAt: '2026-09-09T12:00:00Z', sourceWeight: 10, evidenceScore: 10, url: '/new-high', excerpt: 'x' },
      ],
    });

    expect(pack.relatedArticles.map((item) => item.id)).toEqual(['new-high', 'new-low', 'old']);
    expect(pack.relatedArticles[1].excerpt.length).toBeLessThanOrEqual(600);
  });

  it('limits topic history to the recent eight events and latest two summaries', () => {
    const pack = buildContextPack({
      topicContext: {
        slug: 'topic-ai',
        stage: 'active',
        updateCount: 12,
        previousSummaries: ['s1', 's2', 's3'],
        recentEvents: Array.from({ length: 10 }, (_, index) => ({
          id: `e${index}`,
          publishedAt: `2026-09-${String(index + 1).padStart(2, '0')}T00:00:00Z`,
        })),
      },
    });

    expect(pack.topicContext.previousSummary).toEqual(['s2', 's3']);
    expect(pack.topicContext.recentEvents).toHaveLength(8);
    expect(pack.topicContext.recentEvents[0].id).toBe('e9');
    expect(pack.topicContext.recentEvents.at(-1).id).toBe('e2');
  });

  it('removes sensitive fields recursively and strips credential query parameters', () => {
    const input = {
      apiKey: 'sk-live-secret',
      nested: { Authorization: 'Bearer abc', keep: 'ok', password: 'p' },
      url: 'https://example.com/story?token=abc&x=1',
    };
    const clean = sanitizeSensitiveFields(input) as any;

    expect(clean).toEqual({ nested: { keep: 'ok' }, url: 'https://example.com/story?x=1' });
  });

  it('does not invent a publication time and does not mutate source objects', () => {
    const article = {
      title: 'Title',
      sourceLang: 'fr',
      url: '/story',
      fullContent: 'Subscribe\nActual body',
    };
    const before = JSON.stringify(article);
    const pack = buildContextPack({ article }, { now: '2026-09-10T00:00:00Z' });

    expect(pack.article.publishedAt).toBeNull();
    expect(pack.article.fullContent).toBe('Actual body');
    expect(JSON.stringify(article)).toBe(before);
  });
});
