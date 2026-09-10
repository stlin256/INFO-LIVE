import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';

const workflowPath = new URL('../.github/workflows/hourly-feed.yml', import.meta.url);
const specPath = new URL('../docs/specs/08-workflow.md', import.meta.url);

describe('hourly feed workflow scheduling', () => {
  it('keeps an hourly primary schedule plus an offset fallback', async () => {
    const workflow = await readFile(workflowPath, 'utf8');
    expect(workflow).toContain("- cron: '17 * * * *'");
    expect(workflow).toContain("- cron: '47 * * * *'");
    expect(workflow).toContain("- 'data/**'");
    expect(workflow).toContain('timeout-minutes: 55');
  });

  it('deduplicates only within the current UTC hour', async () => {
    const workflow = await readFile(workflowPath, 'utf8');
    expect(workflow).toContain('current_hour=$(date -u +"%Y-%m-%dT%H")');
    expect(workflow).toContain('startswith($current_hour)');
    expect(workflow).toContain('same UTC hour');
    expect(workflow).not.toContain('success_count=');
    expect(workflow).not.toContain('is already active or succeeded; skipping duplicate work.');
  });

  it('documents the actual workflow path and cadence', async () => {
    const spec = await readFile(specPath, 'utf8');
    expect(spec).toContain('.github/workflows/hourly-feed.yml');
    expect(spec).toContain('每小时运行两次调度尝试');
    expect(spec).toContain('`:17` 主调度');
    expect(spec).toContain('`:47` 兜底');
  });
});
