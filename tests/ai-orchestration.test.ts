import { afterEach, describe, expect, it } from 'vitest';
import { requestJsonWithFallback, splitArticleIntoChunks, summarizeWithAI } from '../scripts/ai-summarizer.mjs';

const originalFetch = globalThis.fetch;
const originalKey = process.env.AI_API_KEY;
const originalBase = process.env.AI_API_BASE;
const originalModel = process.env.AI_MODEL;
const originalFallback = process.env.AI_FALLBACK_MODEL;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.AI_API_KEY;
  else process.env.AI_API_KEY = originalKey;
  if (originalBase === undefined) delete process.env.AI_API_BASE;
  else process.env.AI_API_BASE = originalBase;
  if (originalModel === undefined) delete process.env.AI_MODEL;
  else process.env.AI_MODEL = originalModel;
  if (originalFallback === undefined) delete process.env.AI_FALLBACK_MODEL;
  else process.env.AI_FALLBACK_MODEL = originalFallback;
});

function modelResponse(value: unknown) {
  return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify(value) } }] }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

describe('AI article chunking', () => {
  it('splits long articles at paragraph boundaries without exceeding the local budget', () => {
    const chunks = splitArticleIntoChunks('第一段。'.repeat(900) + '\n\n' + '第二段。'.repeat(900), 1000);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.every((chunk) => chunk.length <= 1000)).toBe(true);
    expect(chunks.join('\n\n')).toContain('第二段。');
  });
});

describe('AI model failover', () => {
  it('uses the fallback model when the primary JSON is structurally invalid', async () => {
    const models: string[] = [];
    const result = await (requestJsonWithFallback as any)({
      apiBase: 'https://example.test/v1',
      apiKey: 'test-key',
      primaryModel: 'primary-model',
      fallbackModel: 'gpt-5.6-luna',
      prompt: 'return json',
      fetchImpl: async (_url: string, options: any) => {
        const body = JSON.parse(String(options?.body ?? '{}'));
        models.push(body.model);
        return modelResponse(body.model === 'primary-model' ? { wrong: true } : { ok: true });
      },
      validateValue: (value: any) => value?.ok === true || ['missing ok field'],
    });
    expect(result.model).toBe('gpt-5.6-luna');
    expect(models).toEqual(['primary-model', 'gpt-5.6-luna']);
  });
});

describe('AI orchestration integration', () => {
  it('runs bounded article experts in parallel and keeps overview prompts compact', async () => {
    process.env.AI_API_KEY = 'test-key';
    process.env.AI_API_BASE = 'https://example.test/v1';
    const prompts: string[] = [];
    globalThis.fetch = async (_url, options) => {
      const prompt = JSON.parse(String(options?.body ?? '{}')).messages[0].content as string;
      prompts.push(prompt);
      if (prompt.includes('专业通讯社译者')) {
        return modelResponse({ translatedTitle: '目标语言标题', originalTitle: 'Original headline', fullTranslation: '完整目标语言全文，包含事实背景、相关主体、时间信息与后续影响。'.repeat(8) + '\n\n' + '译文第二段补充官方回应、证据范围与仍待核实事项。'.repeat(8), notes: [] });
      }
      if (prompt.includes('事实核验编辑')) {
        return modelResponse({ facts: [{ claim: '可核验事实', status: 'confirmed', source: 'Example' }], entities: [], unverified: [], evidence: [{ quote: '证据片段', url: 'https://example.test/story' }] });
      }
      if (prompt.includes('多信源立场分析编辑')) {
        return modelResponse({ sourceRole: '官方媒体', narrativeFocus: '事实叙事', stakeholders: [], consensus: [], disagreements: [], blindSpots: [] });
      }
      if (prompt.includes('全球事件分类编辑')) {
        return modelResponse({ dimensions: ['ai-frontier'], tags: ['ai'], candidateTopicSlugs: ['topic-ai'], priority: 60 });
      }
      if (prompt.includes('日尺度分析师')) return modelResponse({ title: '日尺度研判', lead: '过去24小时分析', themes: [] });
      if (prompt.includes('社会热点编辑')) return modelResponse({ radar: [], debates: [] });
      return modelResponse({ hourlyBriefing: { title: '本小时研判', lead: '小时分析', signals: [] }, perspectiveMatrix: [], specialTopics: [], socialTrends: { radar: [], debates: [] } });
    };

    const items = Array.from({ length: 3 }, (_, index) => ({
      title: `Original headline ${index}`,
      link: `https://example.test/story-${index}`,
      pubDate: '2026-09-08T12:00:00Z',
      pubTimeFormatted: '09-08 20:00',
      snippet: `Short evidence ${index}`,
      fullContent: `Full source article body ${index}`,
      contentStatus: 'full',
      contentParagraphs: 2,
      imageUrl: null,
      sourceName: 'Example News',
      sourceSlug: 'example',
      sourceLang: 'en',
      category: index === 0 ? 'ai' : 'world',
      weight: 8,
    }));

    const result = await (summarizeWithAI as any)(items);
    expect(result.orchestration.metrics.peakConcurrency).toBeGreaterThan(1);
    expect(result.orchestration.metrics.totalTasks).toBe(16);
    expect(result.topStories.some((story: any) => story.title === '目标语言标题')).toBe(true);
    expect(result.topStories.every((story: any) => story.fullTranslation)).toBe(true);
    expect(prompts.filter((prompt) => prompt.includes('你是本小时主编'))[0]).not.toContain('Full source article body');
    expect(prompts.every((prompt) => prompt.length < 30000)).toBe(true);
  });
});
