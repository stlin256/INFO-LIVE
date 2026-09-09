import { createHash } from 'node:crypto';

/** Stable, URL-derived DOM id that remains unique for non-Latin URLs. */
export function storyIdForUrl(url, title = '') {
  const value = String(url || title || '').trim();
  let readableSource = value;
  try { readableSource = new URL(value).pathname; } catch { /* keep the original value for relative URLs */ }
  const readable = readableSource.replace(/[^a-zA-Z0-9]+/g, '').slice(-12).toLowerCase();
  if (readable.length >= 6) return `story-${readable}`;
  return `story-${createHash('sha1').update(value).digest('hex').slice(0, 12)}`;
}
