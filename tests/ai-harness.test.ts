import { describe, expect, it } from 'vitest';
import {
  HarnessTimeoutError,
  runHarness,
  topologicalSort,
  validateTaskGraph,
} from '../scripts/ai-harness.mjs';

const runHarnessAny: any = runHarness;
const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('ai harness graph validation', () => {
  it('returns a stable topological order and rejects invalid graphs', () => {
    expect(topologicalSort([
      { id: 'merge', dependsOn: ['left', 'right'] },
      { id: 'left' },
      { id: 'right' },
    ])).toEqual(['left', 'right', 'merge']);

    expect(() => validateTaskGraph([{ id: 'a' }, { id: 'a' }])).toThrow(/duplicate task id/);
    expect(() => validateTaskGraph([{ id: 'a', dependsOn: ['missing'] }])).toThrow(/unknown task/);
    expect(() => validateTaskGraph([
      { id: 'a', dependsOn: ['b'] },
      { id: 'b', dependsOn: ['a'] },
    ])).toThrow(/cycle/);
  });
});

describe('runHarness', () => {
  it('runs independent tasks in parallel but never exceeds maxConcurrency', async () => {
    let active = 0;
    let peak = 0;
    const result = await runHarnessAny({
      context: { value: 7 },
      maxConcurrency: 2,
      tasks: Array.from({ length: 5 }, (_, index) => ({
        id: `task-${index}`,
        inputKeys: ['value'],
        run: async (input: { value: number }) => {
          active += 1;
          peak = Math.max(peak, active);
          await pause(8);
          active -= 1;
          return input.value + index;
        },
      })),
    });

    expect(peak).toBe(2);
    expect(result.metrics.peakConcurrency).toBe(2);
    expect(result.metrics.succeeded).toBe(5);
    expect(result.degraded).toBe(false);
  });

  it('supports task-local input packs without leaking the global context', async () => {
    const result = await runHarnessAny({
      context: { pack: 'global', ignored: true },
      tasks: [{
        id: 'local-input',
        input: { pack: 'article-specific' },
        inputKeys: ['pack'],
        run: (input: { pack: string }) => input.pack,
      }],
    });

    expect((result as any).outputs['local-input']).toBe('article-specific');
  });

  it('waits for dependencies and injects runId plus structured dependency results', async () => {
    const seen: Array<{ runId: string; dependency: unknown }> = [];
    const result = await runHarnessAny({
      runId: 'run-test-1',
      context: { secret: 'not-selected', seed: 3 },
      tasks: [
        { id: 'source', inputKeys: ['seed'], run: (input: { seed: number }, taskContext: { runId: string }) => ({ n: input.seed + 1, runId: taskContext.runId }) },
        {
          id: 'consumer',
          dependsOn: ['source'],
          inputKeys: [],
          run: (input: { dependencies: { source: { output: { n: number } } } }, taskContext: { runId: string }) => {
            seen.push({ runId: taskContext.runId, dependency: input.dependencies.source.output });
            return input.dependencies.source.output;
          },
        },
      ],
    });

    expect(result.runId).toBe('run-test-1');
    expect(seen).toEqual([{ runId: 'run-test-1', dependency: { n: 4, runId: 'run-test-1' } }]);
    expect((result as any).outputs.consumer).toEqual({ n: 4, runId: 'run-test-1' });
    expect(result.tasks.consumer.status).toBe('succeeded');
  });

  it('retries failed validation and can use injected executor models', async () => {
    const attempts: string[] = [];
    const result = await runHarnessAny({
      tasks: [{
        id: 'model-task',
        modelPolicy: { primary: 'primary', fallback: 'backup' },
        retries: 1,
        validate: (output: { ok: boolean }) => output.ok,
      }],
      execute: async ({ task, taskContext }: { task: { id: string }; taskContext: { model?: string } }) => {
        attempts.push(`${task.id}:${taskContext.model}`);
        return attempts.length === 1 ? { ok: false } : { ok: true };
      },
    });

    expect(attempts).toEqual(['model-task:primary', 'model-task:backup']);
    expect(result.tasks['model-task'].attempts).toBe(2);
    expect(result.tasks['model-task'].models).toEqual(['primary', 'backup']);
    expect((result as any).outputs['model-task']).toEqual({ ok: true });
  });

  it('isolates optional failures while skipping tasks blocked by required failures', async () => {
    const ran: string[] = [];
    const result = await runHarnessAny({
      tasks: [
        { id: 'required-failure', run: () => { throw new Error('boom'); } },
        { id: 'optional-failure', optional: true, run: () => { throw new Error('optional boom'); } },
        { id: 'optional-consumer', dependsOn: ['optional-failure'], run: () => { ran.push('optional-consumer'); return 'ok'; } },
        { id: 'required-consumer', dependsOn: ['required-failure'], run: () => { ran.push('required-consumer'); return 'bad'; } },
      ],
    });

    expect(result.tasks['required-failure'].status).toBe('failed');
    expect(result.tasks['optional-failure'].status).toBe('degraded');
    expect(result.tasks['optional-consumer'].status).toBe('succeeded');
    expect(result.tasks['required-consumer'].status).toBe('skipped');
    expect(ran).toEqual(['optional-consumer']);
    expect(result.degraded).toBe(true);
  });

  it('times out a task, records metrics, and does not hang the run', async () => {
    const result = await runHarnessAny({
      defaultTimeoutMs: 10,
      tasks: [{ id: 'slow', run: () => pause(50) }],
    });

    expect(result.tasks.slow.status).toBe('failed');
    expect(result.tasks.slow.timedOut).toBe(true);
    expect(result.tasks.slow.error).toMatch(/timed out/);
    expect(result.metrics.timeouts).toBe(1);
    expect(result.metrics.totalAttempts).toBe(1);
    expect(HarnessTimeoutError).toBeDefined();
  });

  it('enforces optional per-role and model budgets in addition to the global limit', async () => {
    let active = 0;
    let rolePeak = 0;
    const result = await runHarnessAny({
      maxConcurrency: 3,
      roleConcurrency: { same: 1 },
      modelConcurrency: { model: 2 },
      tasks: [0, 1, 2].map((id) => ({
        id: `budget-${id}`,
        role: 'same',
        modelPolicy: 'model',
        run: async () => {
          active += 1;
          rolePeak = Math.max(rolePeak, active);
          await pause(5);
          active -= 1;
          return id;
        },
      })),
    });

    expect(rolePeak).toBe(1);
    expect(result.metrics.succeeded).toBe(3);
  });
});
