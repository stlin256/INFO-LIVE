import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { SOURCES } from '../scripts/sources.mjs';
import { resolveSourceSlug } from '../scripts/site-writer.mjs';

describe('InfoLive source registry', () => {
  it('contains the expanded multi-domain source set', () => {
    expect(SOURCES.length).toBeGreaterThanOrEqual(55);
    expect(new Set(SOURCES.map((source) => source.slug)).size).toBeGreaterThanOrEqual(42);
  });

  it('maps every registered source to an available badge asset', () => {
    for (const source of SOURCES) {
      const slug = resolveSourceSlug(source.name, source.slug);
      expect(existsSync(path.resolve('public/assets/sources', `${slug}.svg`))).toBe(true);
    }
  });
});
