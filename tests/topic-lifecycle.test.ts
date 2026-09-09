import { afterEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { evolveTopics, loadTopicRegistry } from '../scripts/topic-lifecycle.mjs';

let tempDir: string;

afterEach(() => {
  if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
  delete process.env.INFO_LIVE_TOPICS_DIR;
});

const timeInfo = { display: '2026-09-09 12:00 (UTC+8)', timestamp: 1 };
const topic = { slug: 'topic-ai-safety', title: 'AI 安全', tagline: '追踪 AI 安全进展', overview: '初始概览', timeline: [], keyJudgments: [] };
const item = (id: string, title = 'AI safety update') => ({ id, title, snippet: 'AI safety update', link: `https://example.com/${id}` });

function setup() {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'infolive-topics-'));
  process.env.INFO_LIVE_TOPICS_DIR = tempDir;
}

describe('topic lifecycle persistence', () => {
  it('initiates and evolves a dossier while preserving lineage and evidence', () => {
    setup();
    const first = evolveTopics([topic], [item('a1')], timeInfo, { runId: 'run-1' });
    expect(first[0].lastAction).toBe('initiate');
    expect(first[0].lastRunId).toBe('run-1');
    expect(first[0].evidenceIds).toContain('a1');

    const second = evolveTopics([{ ...topic, overview: '更完整的概览', timeline: [{ title: '第二个节点' }] }], [item('a2')], { ...timeInfo, display: '2026-09-09 13:00 (UTC+8)' }, { runId: 'run-2' });
    expect(second[0].lastAction).toBe('iterate');
    expect(second[0].updateCount).toBe(2);
    expect(second[0].previousRunIds).toContain('run-1');
    expect(second[0].evidenceIds).toEqual(expect.arrayContaining(['a1', 'a2']));
    expect(loadTopicRegistry().topics[0].timeline[0].title).toBe('第二个节点');
  });

  it('archives after repeated no-evidence runs and reopens on new evidence', () => {
    setup();
    evolveTopics([topic], [item('a1')], timeInfo, { runId: 'run-1', archiveAfterRuns: 2 });
    evolveTopics([topic], [], timeInfo, { runId: 'run-2', archiveAfterRuns: 2 });
    const active = evolveTopics([topic], [], timeInfo, { runId: 'run-3', archiveAfterRuns: 2 });
    expect(active).toHaveLength(0);
    expect(loadTopicRegistry().topics[0].stage).toBe('archived');

    const reopened = evolveTopics([topic], [item('a2')], timeInfo, { runId: 'run-4', archiveAfterRuns: 2 });
    expect(reopened[0].stage).toBe('active');
    expect(reopened[0].lastAction).toBe('reopen');
    expect(reopened[0].reopenCount).toBe(1);
  });

  it('writes registry atomically and tolerates legacy registry shape', () => {
    setup();
    fs.writeFileSync(path.join(tempDir, 'topics-registry.json'), JSON.stringify([{ slug: 'topic-legacy', title: 'Legacy' }]), 'utf8');
    const result = evolveTopics([], [], timeInfo, { runId: 'run-legacy' });
    expect(result).toEqual([]);
    const registry = loadTopicRegistry();
    expect(registry.topics[0]).toMatchObject({ slug: 'topic-legacy', stage: 'active', noEvidenceRuns: 1 });
    expect(fs.readFileSync(path.join(tempDir, 'topics-registry.json'), 'utf8')).toContain('topic-legacy');
  });
});
