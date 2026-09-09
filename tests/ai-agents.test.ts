import { describe, expect, it } from 'vitest';
import {
  AGENT_ROLES,
  AGENTS,
  COMMON_RESULT_SCHEMA,
  DEFAULT_BUDGET,
  DEFAULT_MODEL_POLICY,
  MIN_INPUT_METADATA,
  getAgent,
  isSafeFields,
  listAgents,
  registerAgent,
  validateAgentInput,
  validateAgentResult,
  validateCommonResult,
  validateSafeFields,
} from '../scripts/ai-agents.mjs';

const inputFor = (role: string, overrides: Record<string, unknown> = {}) => ({
  schemaVersion: 1,
  runId: 'run-2026-09-10T00:00:00Z-a1',
  taskId: `task-${role}`,
  role,
  generatedAt: '2026-09-10T00:00:00.000Z',
  targetLanguage: 'zh',
  article: {
    id: 'article-1',
    title: 'Original headline',
    source: 'Example News',
    sourceLang: 'en',
    publishedAt: '2026-09-10T00:00:00Z',
    url: 'https://example.com/article-1',
    imageUrl: 'https://example.com/image.jpg',
  },
  evidence: { facts: [{ claim: 'A verified claim' }] },
  relatedArticles: [],
  topicContext: { slug: 'example-topic', stage: 'active' },
  ...overrides,
});

describe('expert agent registry', () => {
  it('registers exactly the eleven roles from the specification', () => {
    expect(AGENT_ROLES).toEqual([
      'fact-extractor', 'translator', 'source-positioner', 'topic-classifier',
      'media-evidence', 'evidence-merger', 'hourly-editor', 'daily-analyst',
      'social-trends', 'topic-lifecycle', 'editorial-qa',
    ]);
    expect(Object.keys(AGENTS)).toEqual(AGENT_ROLES);
    expect(listAgents().map((agent) => agent.role)).toEqual(AGENT_ROLES);
  });

  it('exposes minimum metadata and the default model/budget policy', () => {
    expect(MIN_INPUT_METADATA).toEqual(['schemaVersion', 'runId', 'taskId', 'role', 'generatedAt', 'targetLanguage']);
    expect(DEFAULT_MODEL_POLICY.primary).toBe(process.env.AI_MODEL || 'gemini-3.8-flash');
    expect(DEFAULT_MODEL_POLICY.fallback).toBe(process.env.AI_FALLBACK_MODEL || 'gpt-5.6-luna');
    expect(DEFAULT_MODEL_POLICY.maxAttempts).toBe(2);
    expect(DEFAULT_BUDGET.maxInputChars).toBe(12000);
    expect(getAgent('evidence-merger').budget.maxInputChars).toBe(28000);
    expect(getAgent('translator').modelPolicy.samePayloadOnce).toBe(true);
  });

  it('rejects duplicate registrations but permits an explicit replacement', () => {
    expect(() => registerAgent({ role: 'translator', requiredOutput: ['translatedTitle'] })).toThrow(/already registered/);
    const custom = registerAgent({ role: 'test-agent', requiredInput: [], requiredOutput: ['ok'] });
    expect(custom.role).toBe('test-agent');
    expect(getAgent('test-agent')).toBe(custom);
    registerAgent({ role: 'test-agent', requiredInput: [], requiredOutput: ['ok'], description: 'replacement' }, { replace: true });
    expect(getAgent('test-agent').description).toBe('replacement');
  });
});

describe('agent input and result contracts', () => {
  it('validates common metadata and role-specific minimum input', () => {
    const valid = validateAgentInput('fact-extractor', inputFor('fact-extractor'));
    expect(valid).toMatchObject({ valid: true, ok: true, errors: [] });

    const invalid = validateAgentInput('fact-extractor', inputFor('fact-extractor', {
      article: { ...inputFor('fact-extractor').article, url: 'javascript:alert(1)' },
      generatedAt: 'not-a-date',
    }));
    expect(invalid.valid).toBe(false);
    expect(invalid.errors.join('\n')).toMatch(/generatedAt|article\.url|dangerous/);
  });

  it('accepts a raw role result and checks required structured fields', () => {
    const valid = validateAgentResult('translator', {
      translatedTitle: '译后标题',
      originalTitle: 'Original headline',
      fullTranslation: '完整译文',
    });
    expect(valid.valid).toBe(true);

    const invalid = validateAgentResult('translator', {
      translatedTitle: '译后标题',
      originalTitle: 'Original headline',
    });
    expect(invalid.valid).toBe(false);
    expect(invalid.errors).toContain('fullTranslation is required');
  });

  it('accepts and validates the common result envelope', () => {
    const result = validateCommonResult({
      schemaVersion: 1,
      role: 'evidence-merger',
      runId: 'run-1',
      status: 'ok',
      data: { facts: [], conflicts: [], citations: [] },
      citations: [],
    });
    expect(result.valid).toBe(true);
    expect(COMMON_RESULT_SCHEMA.required).toEqual(['schemaVersion', 'role', 'runId', 'status', 'data']);

    const invalid = validateAgentResult({
      schemaVersion: 1,
      role: 'evidence-merger',
      runId: 'run-1',
      status: 'broken',
      data: { facts: [], conflicts: [] },
    });
    expect(invalid.valid).toBe(false);
    expect(invalid.errors.join('\n')).toMatch(/status|citations/);
  });
});

describe('agent data safety', () => {
  it('rejects credentials and side-effect instructions recursively', () => {
    expect(validateSafeFields({ apiKey: 'secret' }).valid).toBe(false);
    expect(validateSafeFields({ nested: [{ command: 'rm -rf /' }] }).valid).toBe(false);
    expect(isSafeFields({ url: 'https://example.com', title: 'safe' })).toBe(true);
    expect(isSafeFields({ note: 'Bearer abcdefghijklmnop' })).toBe(false);
  });

  it('applies safety checks to structured agent results', () => {
    const result = validateAgentResult('fact-extractor', {
      facts: [],
      entities: [],
      unverified: [],
      evidence: [],
      metadata: { apiKey: 'must not cross the agent boundary' },
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((error: string) => error.includes('apiKey'))).toBe(true);
  });
});
