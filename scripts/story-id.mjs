import { createHash } from 'node:crypto';

const TRACKING_PARAMS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid', 'ocid', 'maca', 'taid', 'traffic_source', 'feedburner',
]);

function canonicalIdentity(url, title) {
  const rawUrl = String(url ?? '').trim();
  const rawTitle = String(title ?? '').trim();
  if (!rawUrl && !rawTitle) {
    throw new TypeError('storyIdForUrl requires a non-empty URL or title');
  }

  if (!rawUrl) return `title:${rawTitle}`;
  try {
    const parsed = new URL(rawUrl);
    parsed.hash = '';
    for (const key of [...parsed.searchParams.keys()]) {
      if (TRACKING_PARAMS.has(key.toLowerCase())) parsed.searchParams.delete(key);
    }
    return parsed.toString();
  } catch {
    // Relative URLs are valid site identities; keep them distinct from title-only IDs.
    return `relative:${rawUrl}`;
  }
}

function readableHint(identity) {
  let source = identity;
  try { source = decodeURIComponent(new URL(identity).pathname); } catch { /* use the canonical identity */ }
  const hint = source
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(-24);
  return hint.length >= 3 ? hint : 'item';
}

/**
 * Stable, collision-resistant DOM id for an article identity.
 *
 * The readable path suffix is only a hint. The hash is always included so that
 * equal-looking tails from different hosts, paths, or query IDs cannot collide.
 * Tracking query parameters and URL fragments are ignored intentionally, matching
 * the site's canonical story-link behavior.
 */
export function storyIdForUrl(url, title = '') {
  const identity = canonicalIdentity(url, title);
  const digest = createHash('sha256').update(identity).digest('hex').slice(0, 16);
  return `story-${readableHint(identity)}-${digest}`;
}
