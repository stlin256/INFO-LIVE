import { describe, expect, it } from 'vitest';
import { storyIdForUrl } from '../scripts/story-id.mjs';

describe('storyIdForUrl', () => {
  it('is stable and keeps a readable hint for ordinary URLs', () => {
    const id = storyIdForUrl('https://example.test/story-123');
    expect(id).toMatch(/^story-story-123-[a-f0-9]{16}$/);
    expect(storyIdForUrl('https://example.test/story-123')).toBe(id);
  });

  it('does not collide when URL tails are the same across hosts or paths', () => {
    const ids = [
      storyIdForUrl('https://one.example/news/world/story-123'),
      storyIdForUrl('https://two.example/news/markets/story-123'),
      storyIdForUrl('https://two.example/news/world/story-123?article=2'),
    ];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ignores tracking parameters and fragments but preserves meaningful query identity', () => {
    expect(storyIdForUrl('https://example.test/story?id=7&utm_source=rss#top'))
      .toBe(storyIdForUrl('https://example.test/story?id=7&utm_medium=feed'));
    expect(storyIdForUrl('https://example.test/story?id=7'))
      .not.toBe(storyIdForUrl('https://example.test/story?id=8'));
  });

  it('uses a hash-only-safe identity for non-Latin paths and title-only records', () => {
    expect(storyIdForUrl('https://例子.test/文章')).toMatch(/^story-item-[a-f0-9]{16}$/);
    expect(storyIdForUrl('', 'same title')).toBe(storyIdForUrl('', 'same title'));
    expect(storyIdForUrl('', 'first')).not.toBe(storyIdForUrl('', 'second'));
  });

  it('fails closed when no story identity is available', () => {
    expect(() => storyIdForUrl('', '')).toThrow(/non-empty URL or title/);
  });
});
