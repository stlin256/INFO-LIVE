import { describe, expect, it } from 'vitest';
import { requestJsonWithFallback } from '../scripts/ai-summarizer.mjs';

const response = (status: number, payload: unknown): Response => new Response(
  JSON.stringify(payload),
  { status, headers: { 'Content-Type': 'application/json' } },
);

describe('requestJsonWithFallback', () => {
  it('primary model fails then uses gpt-5.6-luna', async () => {
    const requestedModels: string[] = [];
    const result = await requestJsonWithFallback({
      apiBase: 'https://private.example/v1',
      apiKey: 'secret',
      primaryModel: 'primary-model',
      prompt: 'test',
      fetchImpl: async (_url, options) => {
        const model = JSON.parse(String(options?.body ?? '{}')).model as string;
        requestedModels.push(model);
        return model === 'primary-model'
          ? response(503, {})
          : response(200, { choices: [{ message: { content: '{"ok":true}' } }] });
      },
    });

    expect(requestedModels).toEqual(['primary-model', 'gpt-5.6-luna']);
    expect(result.model).toBe('gpt-5.6-luna');
    expect(result.value).toEqual({ ok: true });
  });

  it('primary model returns invalid JSON then falls back', async () => {
    const requestedModels: string[] = [];
    const result = await requestJsonWithFallback({
      apiBase: 'https://private.example/v1',
      apiKey: 'secret',
      primaryModel: 'primary-model',
      fallbackModel: 'backup-model',
      prompt: 'test',
      fetchImpl: async (_url, options) => {
        const model = JSON.parse(String(options?.body ?? '{}')).model as string;
        requestedModels.push(model);
        return model === 'primary-model'
          ? response(200, { choices: [{ message: { content: 'not-json' } }] })
          : response(200, { choices: [{ message: { content: '```json\n{"ok":true}\n```' } }] });
      },
    });

    expect(requestedModels).toEqual(['primary-model', 'backup-model']);
    expect(result.model).toBe('backup-model');
    expect(result.value).toEqual({ ok: true });
  });

  it('throws the final error when every model fails', async () => {
    await expect(requestJsonWithFallback({
      apiBase: 'https://private.example/v1',
      apiKey: 'secret',
      primaryModel: 'primary-model',
      fallbackModel: 'backup-model',
      prompt: 'test',
      fetchImpl: async () => response(500, {}),
    })).rejects.toThrow('HTTP 500');
  });
});
