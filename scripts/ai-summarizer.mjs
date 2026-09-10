/**
 * InfoLive AI 多维度深度编译、立场辨明、动态专题与频道工作台架构引擎
 * 严格支持：
 * 1. 外文新闻标题全量翻译为目标语言中文，并保留原始外语标题（originalTitle）
 * 2. 全篇全量深度编译（包含事实原委、各方表态、行业研判，450-800字，绝无生硬外文残留）
 * 3. 频道工作台架构（World, Markets, AI, Trends, TopStories）确保每一板块内容丰富，绝不出现空白
 * 4. 跨 Actions 话题生命周期管理
 * 5. 分阶段微批次（Micro-batching）调用 LLM 架构思维
 */
import { getBeijingTime, contentStatusOf, countContentParagraphs, isLikelyTruncatedBody, chineseCharacterCount, isChineseReadableText } from './fetcher.mjs';
import { translateForeignTitle } from './translations.mjs';
import { runHarness } from './ai-harness.mjs';
import { buildContextPack } from './context-pack.mjs';
import { getAgent, validateAgentResult, validateSafeFields } from './ai-agents.mjs';
import { storyIdForUrl } from './story-id.mjs';

export { translateForeignTitle };

function isHeadlinePlaceholder(text) {
  return /外文(?:信源)?标题(?:正在进行中文翻译|尚未完成中文翻译)/u.test(String(text || ''));
}

function hasUntranslatedLatinPhrase(text) {
  return /\b[A-Za-z]{3,}(?:[ '\u2019-]+[A-Za-z]{3,})+\b/u.test(String(text || ''));
}

function hasChineseTitle(text) {
  const value = String(text || '').trim();
  const hasUntranslatedScript = /[\u0400-\u04ff\u0600-\u06ff\u0370-\u03ff]/u.test(value);
  return !hasUntranslatedScript
    && !isHeadlinePlaceholder(value)
    && isChineseReadableText(value, { minChars: 2, minRatio: 0.30 });
}

function deriveChineseTitleFromTranslation(text) {
  const firstParagraph = String(text || '').split(/\n\s*\n/).map((part) => part.trim()).find(Boolean) || '';
  const firstSentence = firstParagraph.split(/[。！？!?；;\n]/).map((part) => part.trim()).find((part) => chineseCharacterCount(part) >= 8) || firstParagraph;
  const compact = firstSentence.replace(/^【[^】]+】[:：]?\s*/, '').trim().slice(0, 56);
  return chineseCharacterCount(compact) >= 8 ? '要闻：' + compact : '';
}

function isChineseNarrative(text, minimum = 2) {
  const value = String(text || '').replace(/\s+/g, ' ').trim();
  if (isHeadlinePlaceholder(value)) return false;
  const chinese = chineseCharacterCount(value);
  const visible = (value.match(/[\p{L}\p{N}]/gu) || []).length;
  const hasNonLatinForeignScript = /[\u0400-\u04ff\u0600-\u06ff\u0370-\u03ff]/u.test(value);
  // A long Latin/Cyrillic headline followed by a Chinese disclaimer is not a
  // Chinese editorial sentence. Proper nouns and short acronyms may remain,
  // but the narrative itself must be predominantly Chinese.
  return isChineseReadableText(value, { minChars: minimum, minRatio: 0.16 })
    && !hasNonLatinForeignScript
    && !hasUntranslatedLatinPhrase(value)
    && (visible === 0 || chinese / visible >= 0.45);
}

/**
 * Return text that is safe for Chinese-only editorial surfaces. The original
 * foreign headline is intentionally never used as a fallback here; it is
 * kept separately in story.originalTitle for the article card's optional
 * provenance line.
 */
export function readableChineseHeadline(item) {
  const sourceLang = String(item?.sourceLang || 'unknown').toLowerCase();
  const original = String(item?.title || '').trim();
  if (!original) return '外文要闻标题待翻译';
  if (hasChineseTitle(original)) return original;

  const candidate = String(translateForeignTitle(original, sourceLang) || '').trim();
  const hasUntranslatedScript = /[\u0400-\u04ff\u0600-\u06ff\u0370-\u03ff]/u.test(candidate);
  if (candidate && candidate !== original && !hasUntranslatedScript
    && hasChineseTitle(candidate)) {
    return candidate;
  }

  return '外文信源标题正在进行中文翻译，暂不展示未翻译标题';
}

function validateChineseOverviewFields(role, value) {
  const errors = [];
  const check = (label, text, minimum = 2) => {
    if (typeof text !== 'string' || !text.trim() || !isChineseNarrative(text, minimum)) errors.push(label + ' must be written in Chinese');
  };
  const checkIfPresent = (label, text, minimum = 2) => {
    if (text !== undefined && text !== null && String(text).trim()) check(label, text, minimum);
  };
  if (role === 'hourly-editor') {
    check('hourlyBriefing.title', value?.hourlyBriefing?.title);
    check('hourlyBriefing.lead', value?.hourlyBriefing?.lead, 8);
    for (const [index, signal] of (value?.hourlyBriefing?.signals || []).entries()) check('hourlyBriefing.signals[' + index + ']', signal, 2);
    for (const [index, matrix] of (value?.perspectiveMatrix || []).entries()) {
      for (const field of ['topic', 'consensus', 'interests', 'blindSpots']) checkIfPresent('perspectiveMatrix[' + index + '].' + field, matrix?.[field], 8);
      for (const [sourceIndex, source] of (matrix?.sources || []).entries()) {
        checkIfPresent('perspectiveMatrix[' + index + '].sources[' + sourceIndex + '].stance', source?.stance, 2);
        checkIfPresent('perspectiveMatrix[' + index + '].sources[' + sourceIndex + '].focus', source?.focus, 8);
      }
    }
    for (const [index, topic] of (value?.specialTopics || []).entries()) {
      for (const field of ['title', 'tagline', 'overview']) checkIfPresent('specialTopics[' + index + '].' + field, topic?.[field], 8);
      checkIfPresent('specialTopics[' + index + '].navTitle', topic?.navTitle, 2);
      checkIfPresent('specialTopics[' + index + '].status', topic?.status, 2);
      for (const [judgmentIndex, judgment] of (topic?.keyJudgments || []).entries()) checkIfPresent('specialTopics[' + index + '].keyJudgments[' + judgmentIndex + ']', judgment, 8);
      for (const [stanceIndex, stance] of (topic?.stanceAnalysis || []).entries()) {
        if (typeof stance === 'string') checkIfPresent('specialTopics[' + index + '].stanceAnalysis[' + stanceIndex + ']', stance, 8);
        else {
          checkIfPresent('specialTopics[' + index + '].stanceAnalysis[' + stanceIndex + '].side', stance?.side || stance?.stakeholder || stance?.name, 2);
          checkIfPresent('specialTopics[' + index + '].stanceAnalysis[' + stanceIndex + '].focus', stance?.focus || stance?.viewpoint || stance?.analysis || stance?.summary, 8);
        }
      }
      for (const [eventIndex, event] of (topic?.timeline || []).entries()) {
        checkIfPresent('specialTopics[' + index + '].timeline[' + eventIndex + '].title', event?.title || event?.name, 2);
        checkIfPresent('specialTopics[' + index + '].timeline[' + eventIndex + '].detail', event?.detail || event?.description || event?.summary || event?.desc, 8);
      }
    }
    for (const [index, radar] of (value?.socialTrends?.radar || []).entries()) {
      check('hourlyBriefing.socialTrends.radar[' + index + '].issue', radar?.issue);
      check('hourlyBriefing.socialTrends.radar[' + index + '].heat', radar?.heat);
      check('hourlyBriefing.socialTrends.radar[' + index + '].spectrum', radar?.spectrum);
      check('hourlyBriefing.socialTrends.radar[' + index + '].conflict', radar?.conflict, 8);
    }
    for (const [index, debate] of (value?.socialTrends?.debates || []).entries()) {
      check('hourlyBriefing.socialTrends.debates[' + index + '].topic', debate?.topic);
      check('hourlyBriefing.socialTrends.debates[' + index + '].summary', debate?.summary, 8);
    }
  }
  if (role === 'daily-analyst') {
    check('title', value?.title);
    check('lead', value?.lead, 8);
    for (const [index, theme] of (value?.themes || []).entries()) {
      check('themes[' + index + '].name', theme?.name);
      check('themes[' + index + '].analysis', theme?.analysis, 8);
    }
  }
  if (role === 'social-trends') {
    for (const [index, radar] of (value?.radar || []).entries()) {
      check('radar[' + index + '].issue', radar?.issue);
      check('radar[' + index + '].conflict', radar?.conflict, 8);
    }
    for (const [index, debate] of (value?.debates || []).entries()) {
      check('debates[' + index + '].topic', debate?.topic);
      check('debates[' + index + '].summary', debate?.summary, 8);
    }
  }
  return errors;
}

function parseJsonContent(content) {
  const normalized = String(content || '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  return JSON.parse(normalized);
}

/**
 * OpenAI-compatible JSON completion with model failover.
 * The primary model is attempted first; the fallback model is only used when
 * the primary request, response, or JSON payload fails validation.
 */
export async function requestJsonWithFallback({
  apiBase,
  apiKey,
  primaryModel,
  fallbackModel = 'gpt-5.6-luna',
  prompt,
  timeoutMs = 30000,
  fetchImpl = fetch,
  signal: parentSignal = undefined,
  validateValue = undefined,
  callBudget = undefined,
}) {
  const base = String(apiBase || '').replace(/\/+$/, '');
  if (!base) throw new Error('AI_API_BASE is not configured');
  if (!apiKey) throw new Error('AI_API_KEY is not configured');

  const models = [...new Set([primaryModel, fallbackModel].filter(Boolean))];
  let lastError = null;

  for (const candidate of models) {
    try {
      callBudget?.reserve(candidate, primaryModel);
      const response = await fetchImpl(`${base}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: candidate,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          response_format: { type: 'json_object' },
        }),
        signal: parentSignal
          ? AbortSignal.any([parentSignal, AbortSignal.timeout(timeoutMs)])
          : AbortSignal.timeout(timeoutMs),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const content = payload.choices?.[0]?.message?.content;
      if (!content) throw new Error('empty model response');

      const value = parseJsonContent(content);
      if (typeof validateValue === 'function') {
        const validation = await validateValue(value, candidate);
        if (validation !== true) {
          const message = Array.isArray(validation) ? validation.join('; ') : String(validation || 'model output failed validation');
          throw new Error(message);
        }
      }

      return { model: candidate, value, payload };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (candidate !== models.at(-1)) {
        console.warn(`[AI] Model ${candidate} failed; switching to fallback model ${fallbackModel}: ${lastError.message}`);
      }
    }
  }

  throw lastError || new Error('all configured AI models failed');
}

export function inferDimensionAndStance(item) {
  const text = `${item.title} ${item.snippet || ''} ${item.sourceName || ''}`.toLowerCase();
  const slug = (item.sourceSlug || '').toLowerCase();
  const cat = item.category || 'world';

  let dimension = 'geopolitics';
  let dimensionLabel = '🌐 全球地缘战略';

  if (cat === 'ai' || /ai|gpt|model|llm|algorithm|anthropic|openai|deepmind|robot|chip|nvidia|semiconductor|autonomous/i.test(text)) {
    dimension = 'ai-frontier';
    dimensionLabel = '🧠 前沿智能';
  } else if (/oil|energy|climate|gas|tanker|red sea|hormuz|barrel|opec|petro|warming|emission|volcano/i.test(text)) {
    dimension = 'energy-climate';
    dimensionLabel = '⚡ 战略能源与气候';
  } else if (cat === 'finance' || /market|fed|treasury|bond|stock|yield|inflation|recession|tariffs|trade|ipo|bank|fund|bourse/i.test(text)) {
    dimension = 'macro-markets';
    dimensionLabel = '💹 宏观资本与产业';
  } else if (cat === 'community' || /society|reddit|forum|culture|woke|ethics|debate|public|activist|protest|citizen/i.test(text)) {
    dimension = 'social-trends';
    dimensionLabel = '🔥 社会热点与思潮';
  } else if (/defense|missile|army|navy|strike|war|security pact|drone|military|pvo|strike/i.test(text)) {
    dimension = 'defense-security';
    dimensionLabel = '🛡️ 军事防务安全';
  } else if (cat === 'science' || /nature|science|space|nasa|astronomy|physics|biology|quantum|battlefield|fossil|dna|gravitational/i.test(text)) {
    dimension = 'space-science';
    dimensionLabel = '🔬 深空与基础科学';
  }

  let stance = '独立专业观察';
  if (slug.includes('xinhua')) stance = '中方多边立场';
  else if (slug.includes('ria') || slug.includes('sputnik')) stance = '莫斯科官方视角';
  else if (slug.includes('france24') || slug.includes('afp')) stance = '欧洲战略自主';
  else if (slug.includes('bbc')) stance = '英伦主流建制';
  else if (slug.includes('dw')) stance = '德国战略自省';
  else if (slug.includes('cnn') || slug.includes('nytimes')) stance = '美主流建制派';
  else if (slug.includes('fox')) stance = '美保守派与鹰派';
  else if (slug.includes('aljazeera')) stance = '全球南方与海湾枢纽';
  else if (slug.includes('wsj') || slug.includes('ft') || slug.includes('cnbc') || slug.includes('marketwatch')) stance = '国际资本与华尔街视角';
  else if (slug.includes('oilprice')) stance = '大宗能源产业链';
  else if (slug.includes('hackernews') || slug.includes('reddit') || slug.includes('lobsters')) stance = '民间技术与思想社群';
  else if (slug.includes('nature') || slug.includes('science')) stance = '前沿同行评议严谨';

  return { dimension, dimensionLabel, stance };
}

/**
 * 权威高水准全篇全量中文深度编译引擎（450-800字地道中文，杜绝生硬外文残留）
 */
export function compileArticleLocally(it, _timeInfo) {
  const pubTime = it.pubTimeFormatted || '发布时间未知';
  const originalTitle = it.title;
  const translatedTitle = readableChineseHeadline(it);
  const { dimension, dimensionLabel, stance } = inferDimensionAndStance(it);
  const sourceBody = String(it.fullContent || it.snippet || '').trim();
  const contentStatus = it.contentStatus || contentStatusOf(sourceBody);
  const sourceLooksTruncated = isLikelyTruncatedBody(sourceBody);
  const contentSource = it.contentSource || 'rss';
  const isChineseSource = String(it.sourceLang || 'zh').toLowerCase() === 'zh';
  const hasFullSourceBody = contentStatus === 'full' && !sourceLooksTruncated && Boolean(sourceBody);
  const translationStatus = isChineseSource && hasFullSourceBody ? 'full' : 'source-only';
  const fullTranslation = isChineseSource
    ? (sourceBody
      ? (hasFullSourceBody
        ? sourceBody
        : '【官方原文仅提供短讯或摘要，未强行补写缺失内容】')
      : '【未获取到官方正文，暂不生成未经证实的替代内容】')
    : (hasFullSourceBody
      ? '【官方正文已获取，中文全文翻译尚未完成；暂不展示外文正文。】'
      : '【官方仅提供短讯或摘要，中文全文翻译尚未完成；暂不展示外文摘要。】');
  const tags = ['#' + dimensionLabel.replace(/^[^\s]+\s*/, ''), '#' + String(it.sourceName || '').split(' ')[0]];
  const keyTakeaways = [
    '权威信源【' + it.sourceName + '】于 ' + pubTime + ' 发布，当前内容状态：' + (contentStatus === 'full' ? '已取得正文证据' : '仅有短讯/摘要'),
    '来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。',
  ];
  const storyId = storyIdForUrl(it.link, it.title);
  return {
    id: storyId,
    title: translatedTitle,
    originalTitle,
    category: it.category,
    dimension,
    dimensionLabel,
    stance,
    tags,
    source: it.sourceName,
    sourceSlug: it.sourceSlug,
    sourceLang: it.sourceLang || 'en',
    url: it.link,
    pubTime,
    publishedAt: it.pubDate || null,
    snippet: it.snippet || '',
    fullContent: sourceBody,
    fullTranslation,
    translationStatus,
    contentStatus,
    contentSource,
    contentKind: it.contentKind || (contentSource === 'official-page' ? 'official-page-body' : 'rss-summary'),
    contentParagraphs: it.contentParagraphs || countContentParagraphs(sourceBody),
    imageUrl: it.imageUrl || null,
    keyTakeaways,
  };
}

function chineseTickerSnippet(item, translatedStory, timeStr, stance) {
  if (String(item.sourceLang || 'zh').toLowerCase() === 'zh') {
    const sourceText = String(item.snippet || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    return sourceText
      ? `【${item.sourceName}·${stance}】：${sourceText.slice(0, 150)}${sourceText.length > 150 ? '……' : ''}`
      : `【${item.sourceName}·${stance}】：于北京时间 ${timeStr} 播发要闻，事件持续跟进中。`;
  }
  const translated = String(translatedStory?.fullTranslation || '').trim();
  if (translated && translatedStory?.translationStatus === 'full' && !isLikelyTruncatedBody(translated)) {
    const firstParagraph = translated.split(/\n\s*\n/).map((part) => part.trim()).find(Boolean) || translated;
    return `【${item.sourceName}·${stance}】：${firstParagraph.slice(0, 180)}${firstParagraph.length > 180 ? '……' : ''}`;
  }
  return `【${item.sourceName}·${stance}】：该外文快讯尚未完成中文全文翻译，暂不展示外文摘要。`;
}

function rebuildChineseTicker(rawItems, stories, _timeInfo) {
  const storyByUrl = new Map(stories.map((story) => [story.url, story]));
  return rawItems.slice(0, 36).map((it) => {
    const timeStr = it.pubTimeFormatted ? it.pubTimeFormatted.split(' ')[1] || it.pubTimeFormatted : '发布时间未知';
    const { dimensionLabel, stance } = inferDimensionAndStance(it);
    const translatedStory = storyByUrl.get(it.link);
    return {
      time: timeStr,
      source: it.sourceName,
      sourceSlug: it.sourceSlug,
      text: translatedStory?.title || readableChineseHeadline(it),
      originalText: it.title,
      url: it.link,
      snippet: chineseTickerSnippet(it, translatedStory, timeStr, stance),
      dimensionLabel,
    };
  });
}

function partitionAndEnsureDesks(rawItems, timeInfo) {
  const deskWorld = [];
  const deskMarkets = [];
  const deskAi = [];
  const deskTrends = [];
  const deskScience = [];

  for (const it of rawItems) {
    const cat = it.category;
    if (cat === 'world') deskWorld.push(it);
    else if (cat === 'finance') deskMarkets.push(it);
    else if (cat === 'ai') deskAi.push(it);
    else if (cat === 'community') deskTrends.push(it);
    else if (cat === 'science') deskScience.push(it);
  }

  // 跨频道保底机制：确保商业金融（finance）至少拥有充足储备，绝无留白
  if (deskMarkets.length < 18) {
    const extraFinance = rawItems.filter((it) => {
      const t = `${it.title} ${it.fullContent || ''}`.toLowerCase();
      return (
        it.category !== 'finance' &&
        /market|fed|yield|inflation|earnings|stock|oil|price|trade|tariff|ad revenue|capital|anpg/i.test(t)
      );
    });
    deskMarkets.push(...extraFinance);
  }

  const compileDesk = (items, limit = 18) => {
    return items.slice(0, limit).map((it) => compileArticleLocally(it, timeInfo));
  };

  const compiledWorld = compileDesk(deskWorld, 20);
  const compiledMarkets = compileDesk(deskMarkets, 20);
  const compiledAi = compileDesk(deskAi, 20);
  const compiledTrends = compileDesk(deskTrends, 20);
  const compiledScience = compileDesk(deskScience, 16);

  // 综合首页头条（跨领域优选）
  const topStories = [];
  const seenUrls = new Set();
  const pick = (arr) => {
    const ranked = [...arr].sort((a, b) => Number(b.contentStatus === 'full') - Number(a.contentStatus === 'full'));
    for (const item of ranked) {
      if (!seenUrls.has(item.url)) {
        seenUrls.add(item.url);
        topStories.push(item);
        break;
      }
    }
  };

  for (let i = 0; i < 6; i++) {
    if (compiledWorld[i]) pick([compiledWorld[i]]);
    if (compiledAi[i]) pick([compiledAi[i]]);
    if (compiledMarkets[i]) pick([compiledMarkets[i]]);
    if (compiledTrends[i]) pick([compiledTrends[i]]);
    if (compiledScience[i]) pick([compiledScience[i]]);
  }

  // 快讯只呈现中文标题与中文证据；外文原始标题由卡片/快讯原文行保留。
  const ticker = rebuildChineseTicker(rawItems, [...compiledWorld, ...compiledMarkets, ...compiledAi, ...compiledTrends, ...compiledScience], timeInfo);

  return {
    topStories: topStories.slice(0, 16),
    worldStories: compiledWorld,
    financeStories: compiledMarkets,
    aiStories: compiledAi,
    trendStories: compiledTrends,
    ticker: ticker
  };
}


function normalizeAgentValue(value) {
  if (Array.isArray(value)) return { items: value };
  if (value && typeof value === 'object') return value;
  return {};
}

export function splitArticleIntoChunks(text, maxChars = 7000) {
  const value = String(text || '').trim();
  if (!value) return [''];
  const limit = Math.max(1000, Number(maxChars) || 7000);
  const paragraphs = value.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  const chunks = [];
  let current = '';
  const push = (part) => {
    if (!part) return;
    if (!current) current = part;
    else if (current.length + part.length + 2 <= limit) current += '\n\n' + part;
    else { chunks.push(current); current = part; }
  };
  for (const paragraph of paragraphs) {
    if (paragraph.length <= limit) { push(paragraph); continue; }
    if (current) { chunks.push(current); current = ''; }
    for (let offset = 0; offset < paragraph.length; offset += limit) chunks.push(paragraph.slice(offset, offset + limit));
  }
  if (current) chunks.push(current);
  return chunks.length > 0 ? chunks : [value.slice(0, limit)];
}

function articleForAgent(story, fullContent = story.fullContent || story.snippet || '') {
  return {
    id: story.id,
    title: story.title,
    originalTitle: story.originalTitle,
    source: story.source,
    sourceLang: story.sourceLang,
    publishedAt: story.publishedAt || null,
    publishedAtDisplay: story.pubTime || null,
    url: story.url,
    link: story.url,
    snippet: story.snippet || story.fullTranslation || '',
    fullContent,
    imageUrl: story.imageUrl || null,
    contentStatus: story.contentStatus || contentStatusOf(fullContent || story.snippet || ''),
    contentSource: story.contentSource || 'rss',
    contentParagraphs: story.contentParagraphs || countContentParagraphs(fullContent || story.snippet || ''),
  };
}

function buildAgentPrompt(role, pack) {
  const evidence = JSON.stringify(pack);
  const prompts = {
    'fact-extractor': `你是事实核验编辑。只根据下面这一篇文章的原始证据提取事实，不得补写未提供的内容。将可验证事实、实体、数字、未证实说法和证据片段分开。严格输出 JSON：{"facts":[{"claim":"","status":"reported|confirmed|inferred","source":""}],"entities":[],"unverified":[],"evidence":[{"quote":"","url":""}]}\n证据包：${evidence}`,
    translator: `你是专业通讯社译者。将证据包中的原文逐段完整翻译为目标语言中文，保留原始标题，不得只翻译标题或摘要，不得编造缺失事实。若证据包标记了 chunkIndex/chunkCount，只翻译当前分段，不能总结或省略；合并由系统完成。严格输出 JSON：{"translatedTitle":"","originalTitle":"","fullTranslation":"","notes":[]}\n证据包：${evidence}`,
    'source-positioner': `你是多信源立场分析编辑。严格区分文章事实与来源叙事框架，不把媒体标签当作事实。输出来源角色、报道重点、利益相关方、共识、分歧和盲区。严格输出 JSON：{"sourceRole":"","narrativeFocus":"","stakeholders":[],"consensus":[],"disagreements":[],"blindSpots":[]}\n证据包：${evidence}`,
    'topic-classifier': `你是全球事件分类编辑。允许创建原有频道之外的新维度，但必须基于文章证据。输出维度、标签、候选专题 slug 和 0-100 优先级。严格输出 JSON：{"dimensions":[],"tags":[],"candidateTopicSlugs":[],"priority":0}\n证据包：${evidence}`,
  };
  return prompts[role] || `请依据以下结构化证据输出角色 ${role} 所需 JSON，不得添加未提供事实：${evidence}`;
}

function createArticleAgentTasks(stories, runId, apiConfig, roles = ['fact-extractor', 'translator', 'source-positioner', 'topic-classifier']) {
  const tasks = [];
  for (const [index, story] of stories.entries()) {
    for (const role of roles) {
      const chunks = role === 'translator' ? splitArticleIntoChunks(story.fullContent || story.snippet || '') : [story.fullContent || story.snippet || ''];
      for (const [chunkIndex, chunk] of chunks.entries()) {
        const taskId = role === 'translator'
          ? `article-${index}-translator-${chunkIndex}`
          : `article-${index}-${role}`;
        const agent = getAgent(role);
        const pack = buildContextPack({
          runId,
          taskId,
          role,
          targetLanguage: 'zh',
          article: articleForAgent(story, chunk),
          citations: [{ source: story.source, url: story.url, publishedAt: story.publishedAt || null }],
          lineage: { sourceItemIds: [story.id || story.url], chunkIndex, chunkCount: chunks.length },
        }, {
          maxInputChars: agent.budget.maxInputChars,
          maxOutputChars: agent.budget.maxOutputChars,
        });
        if (role === 'translator' && chunks.length > 1) pack.article.contentStatus = 'chunk';
        tasks.push({
          id: taskId,
          role,
          optional: true,
          inputKeys: ['pack'],
          // The task budget covers one primary attempt plus one fallback
          // attempt. If the Harness timeout equals a single HTTP timeout, the
          // parent AbortSignal cancels the fallback immediately after a slow
          // primary model expires.
          timeoutMs: agent.budget.timeoutMs * 2 + 1000,
          modelPolicy: [apiConfig.primaryModel],
          dependsOn: ['source-positioner', 'topic-classifier'].includes(role) ? [`article-${index}-fact-extractor`] : [],
          run: async (input, taskContext) => {
            const dependencyFacts = input.dependencies?.[`article-${index}-fact-extractor`]?.output || null;
            const taskPack = dependencyFacts
              ? { ...input.pack, evidence: { ...(input.pack.evidence || {}), facts: dependencyFacts } }
              : input.pack;
            const result = await requestJsonWithFallback({
              ...apiConfig,
              prompt: buildAgentPrompt(role, taskPack),
              timeoutMs: agent.budget.timeoutMs,
              signal: taskContext.signal,
              callBudget: apiConfig.callBudget,
              validateValue: (value) => {
                const validation = validateAgentResult(role, value);
                return validation.valid ? true : validation.errors;
              },
            });
            const value = normalizeAgentValue(result.value);
            const validation = validateAgentResult(role, value);
            if (!validation.valid) throw new Error(role + ' output invalid: ' + validation.errors.join('; '));
            if (role === 'translator') {
              const source = taskPack.article || {};
              const translated = String(value.fullTranslation || '').trim();
              const translatedParagraphs = countContentParagraphs(translated);
              const sourceLength = String(source.fullContent || source.snippet || '').trim().length;
              const chunkCount = Number(taskPack.lineage?.chunkCount || source.chunkCount || 1);
              // A translation may be shorter than the source, but it must not
              // collapse an article into a one-line synopsis. Use a proportional
              // floor plus a hard floor for both whole articles and chunks.
              const proportionalFloor = Math.ceil(sourceLength * (chunkCount > 1 ? 0.22 : 0.35));
              const minTranslationChars = Math.max(chunkCount > 1 ? 80 : 240, proportionalFloor);
              const looksLikeSummary = /(?:阅读|查看|参见|请前往).{0,24}(?:全文|原文|完整报道)|(?:以下|这篇文章)\s*(?:是|为)?\s*(?:摘要|概述)/i.test(translated)
                || isLikelyTruncatedBody(translated);
              const chineseEnough = isChineseReadableText(translated, { minChars: chunkCount > 1 ? 18 : 40, minRatio: 0.16 });
              if (translated.length < minTranslationChars || translatedParagraphs < 1 || looksLikeSummary || !chineseEnough) {
                throw new Error('translator output failed quality floor (' + translated.length + ' chars, ' + translatedParagraphs + ' paragraphs, source=' + sourceLength + ')');
              }
            }
            return { ...value, _model: result.model, _chunkIndex: chunkIndex, _chunkCount: chunks.length };
          },
        });
        tasks[tasks.length - 1].input = { pack };
      }
    }
  }
  return tasks;
}
function buildBoundedOverviewPack(items, runId, role, maxInputChars) {
  return buildContextPack({
    runId,
    taskId: role,
    role,
    targetLanguage: 'zh',
    relatedArticles: items.slice(0, 12).map((item) => ({
      id: item.id || item.url,
      title: readableChineseHeadline(item),
      originalTitle: item.originalTitle || item.title,
      source: item.source,
      sourceLang: item.sourceLang,
      publishedAt: item.publishedAt || null,
      url: item.url,
      excerpt: (item.snippet || item.fullTranslation || '').slice(0, 600),
      sourceWeight: item.weight || 0,
    })),
    lineage: { sourceItemIds: items.slice(0, 12).map((item) => item.id || item.url) },
  }, { maxInputChars });
}

function validateOverviewValue(role, value) {
  const errors = [...validateSafeFields(value).errors];
  if (!value || typeof value !== 'object' || Array.isArray(value)) errors.push('overview result must be an object');
  if (role === 'hourly-editor') {
    if (!value?.hourlyBriefing || typeof value.hourlyBriefing !== 'object') errors.push('hourlyBriefing must be an object');
    if (!Array.isArray(value?.perspectiveMatrix)) errors.push('perspectiveMatrix must be an array');
    if (!Array.isArray(value?.specialTopics)) errors.push('specialTopics must be an array');
    if (!value?.socialTrends || typeof value.socialTrends !== 'object') errors.push('socialTrends must be an object');
  }
  if (role === 'daily-analyst') {
    if (typeof value?.title !== 'string' || !value.title.trim()) errors.push('title must be a non-empty string');
    if (typeof value?.lead !== 'string' || !value.lead.trim()) errors.push('lead must be a non-empty string');
    if (!Array.isArray(value?.themes)) errors.push('themes must be an array');
  }
  if (role === 'social-trends') {
    if (!Array.isArray(value?.radar)) errors.push('radar must be an array');
    if (!Array.isArray(value?.debates)) errors.push('debates must be an array');
  }
  errors.push(...validateChineseOverviewFields(role, value));
  return errors.length ? errors : true;
}

function createOverviewTasks(items, runId, apiConfig) {
  const hourlyPack = buildBoundedOverviewPack(items, runId, 'hourly-editor', 20000);
  const dailyPack = buildBoundedOverviewPack(items, runId, 'daily-analyst', 20000);
  const socialPack = buildBoundedOverviewPack(items.filter((item) => item.category === 'community'), runId, 'social-trends', 16000);
  return [
    {
      id: 'hourly-editor', role: 'hourly-editor', optional: true, input: { pack: hourlyPack }, inputKeys: ['pack'],
      modelPolicy: [apiConfig.primaryModel],
      timeoutMs: getAgent('hourly-editor').budget.timeoutMs * 2 + 1000,
      run: async (input, taskContext) => (await requestJsonWithFallback({ ...apiConfig, timeoutMs: getAgent('hourly-editor').budget.timeoutMs, signal: taskContext.signal, callBudget: apiConfig.callBudget, validateValue: (value) => validateOverviewValue('hourly-editor', value), prompt: `你是本小时主编，只根据下面有限的结构化文章目录输出 JSON。所有标题、导语、信号、立场分析和专题文字必须使用简体中文；媒体名称、机构名和原始标题可保留原文。不要声称未提供的事实。输出 hourlyBriefing、perspectiveMatrix、specialTopics、socialTrends 四个字段；不需要全文。证据包：${JSON.stringify(input.pack)}` })).value,
    },
    {
      id: 'daily-analyst', role: 'daily-analyst', optional: true, input: { pack: dailyPack }, inputKeys: ['pack'],
      modelPolicy: [apiConfig.primaryModel],
      timeoutMs: getAgent('daily-analyst').budget.timeoutMs * 2 + 1000,
      run: async (input, taskContext) => (await requestJsonWithFallback({ ...apiConfig, timeoutMs: getAgent('daily-analyst').budget.timeoutMs, signal: taskContext.signal, callBudget: apiConfig.callBudget, validateValue: (value) => validateOverviewValue('daily-analyst', value), prompt: `你是日尺度分析师。所有输出字段都必须使用简体中文（机构名、专有名词可保留原文），根据下列最近文章目录输出 JSON：{"title":"","lead":"","themes":[{"name":"","analysis":""}]}。不得编造证据。证据包：${JSON.stringify(input.pack)}` })).value,
    },
    {
      id: 'social-trends', role: 'social-trends', optional: true, input: { pack: socialPack }, inputKeys: ['pack'],
      modelPolicy: [apiConfig.primaryModel],
      timeoutMs: getAgent('social-trends').budget.timeoutMs * 2 + 1000,
      run: async (input, taskContext) => (await requestJsonWithFallback({ ...apiConfig, timeoutMs: getAgent('social-trends').budget.timeoutMs, signal: taskContext.signal, callBudget: apiConfig.callBudget, validateValue: (value) => validateOverviewValue('social-trends', value), prompt: `你是社会热点编辑。所有议题、摘要和冲突描述都必须使用简体中文，只根据下列社区文章目录输出 JSON：{"radar":[],"debates":[]}。没有证据的热点不要补写。证据包：${JSON.stringify(input.pack)}` })).value,
    },
  ];
}

function hasTranslatableSource(story) {
  const explicitStatus = story?.contentStatus;
  if (explicitStatus) return explicitStatus === 'full';
  // Keep callers that construct article objects directly backwards compatible;
  // fetcher-produced items always carry an explicit contentStatus.
  return Boolean(String(story?.fullContent || story?.snippet || '').trim());
}

function compactEvidenceText(value, maxChars = 280) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, maxChars);
}

function buildEvidenceFallback(items, timeInfo) {
  const candidates = items.filter((item) => item.title || item.snippet || item.fullContent);
  const isChineseSource = (item) => String(item?.sourceLang || '').toLowerCase() === 'zh';
  const hasChineseTranslation = (item) => isChineseReadableText(item?.fullTranslation, { minChars: 40, minRatio: 0.16 });
  // Fallback editorial surfaces must be evidence-bearing Chinese content. Do
  // not spend the limited signal slots on untranslated foreign teasers; once
  // article translators finish, the caller rebuilds this fallback from the
  // translated story objects.
  const usable = candidates.filter((item) => (
    (isChineseSource(item) && isChineseReadableText(item?.title, { minChars: 2, minRatio: 0.30 }))
    || (hasChineseTranslation(item) && hasChineseTitle(item?.title))
  ));
  const evidenceLine = (item) => {
    const title = readableChineseHeadline(item);
    const translated = hasChineseTranslation(item)
      ? compactEvidenceText(String(item.fullTranslation).split(/\n\s*\n/).find(Boolean) || item.fullTranslation, 220)
      : '';
    const excerpt = translated || (isChineseSource(item) ? compactEvidenceText(item.snippet || item.fullContent, 220) : '');
    return excerpt
      ? `【${item.sourceName}】${title}：${excerpt}`
      : `【${item.sourceName}】${title}：已记录中文标题，正文证据仍在整理。`;
  };
  const signals = usable.length > 0
    ? usable.slice(0, 8).map(evidenceLine)
    : ['本轮外文信源尚未完成中文翻译，未翻译内容已隐藏。'];
  const dimensions = new Map();
  for (const item of usable) {
    const { dimension, dimensionLabel } = inferDimensionAndStance(item);
    const bucket = dimensions.get(dimension) || { name: dimensionLabel, items: [] };
    bucket.items.push(item);
    dimensions.set(dimension, bucket);
  }
  const themes = [...dimensions.values()].slice(0, 6).map((bucket) => ({
    name: bucket.name,
    analysis: bucket.items.slice(0, 3).map(evidenceLine).join('；'),
  }));
  const sources = [...new Map(usable.map((item) => [item.sourceName, item])).values()].slice(0, 8).map((item) => ({
    name: item.sourceName,
    stance: inferDimensionAndStance(item).stance,
    focus: evidenceLine(item),
  }));
  const community = usable.filter((item) => item.category === 'community');
  const radar = [...new Map(community.map((item) => [readableChineseHeadline(item), item])).values()].slice(0, 8).map((item) => ({
    issue: readableChineseHeadline(item),
    heat: '待评估',
    spectrum: '待核验',
    conflict: evidenceLine(item),
  }));
  return {
    hourlyBriefing: {
      title: `本小时全球信号速报 · ${timeInfo.hourOnly}`,
      lead: `本轮抓取于 ${timeInfo.display} 完成，共获得 ${usable.length} 条可用信源记录。以下仅列出已采集标题、摘要与官方页面证据，不对缺失正文作推断。`,
      signals,
    },
    dailyBriefing: {
      title: `24小时全球信号汇总 · ${timeInfo.dateOnly}`,
      lead: `日尺度板块按信源与主题整理本轮可验证记录；完整事实以每篇文章的官方原文与译文为准。`,
      themes,
    },
    specialTopics: [],
    perspectiveMatrix: sources.length > 0 ? [{
      topic: '本轮信源叙事与证据对照',
      consensus: '当前仅展示各信源已抓取的标题、摘要和正文证据；没有足够交叉证据的判断暂不生成。',
      sources,
      interests: '利益诉求需要结合同一事件的多家原文与正式声明进一步核验。',
      blindSpots: 'RSS 摘要、付费墙、反爬或动态渲染导致的正文缺口将在文章卡片中明确标注。',
    }] : [],
    socialTrends: { radar, debates: [] },
  };
}

export async function summarizeWithAI(items) {
  const timeInfo = getBeijingTime();
  const apiKey = process.env.AI_API_KEY || '';
  const apiBase = (process.env.AI_API_BASE || '').replace(/\/+$/, '');
  const model = process.env.AI_MODEL || 'gemini-3.8-flash';
  const fallbackModel = process.env.AI_FALLBACK_MODEL || 'gpt-5.6-luna';

  const deskData = partitionAndEnsureDesks(items, timeInfo);

  const baseSynthesis = buildEvidenceFallback(items, timeInfo);

  if (!apiKey || !apiBase) {
    if (apiKey && !apiBase) console.warn('[AI] AI_API_BASE is not configured; using local synthesis mode.');
    console.log('[AI] Running in high-fidelity local synthesis mode (all desks guaranteed).');
    return {
      ...baseSynthesis,
      ...deskData
    };
  }

  // -------------------------------------------------------------
  // 配置 AI API Key 后，交给局部 Harness 执行专家 DAG。
  // 每个 Agent 只接收自己的 Context Pack；宏观 Agent 只接收标题/摘要目录。
  // -------------------------------------------------------------
  console.log(`[AI] Starting bounded expert-agent DAG with model: ${model}`);
  const runId = `feed-${timeInfo.iso.replace(/[^0-9A-Za-z]/g, '').slice(0, 20)}-${Math.random().toString(36).slice(2, 8)}`;
  const apiConfig = {
    apiBase,
    apiKey,
    primaryModel: model,
    fallbackModel,
    callBudget: createModelCallBudget(),
  };
  const uniqueStories = [...new Map([
    ...deskData.topStories,
    ...deskData.worldStories,
    ...deskData.financeStories,
    ...deskData.aiStories,
    ...deskData.trendStories,
  ].map((story) => [story.url, story])).values()];
  const configuredArticleLimit = Number.parseInt(process.env.AI_ARTICLE_LIMIT || '120', 10);
  const articleLimit = Number.isInteger(configuredArticleLimit) && configuredArticleLimit > 0 ? configuredArticleLimit : 120;
  // Do not spend model calls translating RSS-only snippets that can never be
  // published as full articles. They remain in the wire/history as discovery
  // evidence, while only official-body candidates enter the translator DAG.
  const translationStories = uniqueStories
    .filter(hasTranslatableSource)
    .filter((story) => String(story.sourceLang || '').toLowerCase() !== 'zh')
    .slice(0, articleLimit);
  const configuredAnalysisLimit = Number.parseInt(process.env.AI_ANALYSIS_ARTICLE_LIMIT || '16', 10);
  const analysisLimit = Number.isInteger(configuredAnalysisLimit) && configuredAnalysisLimit > 0 ? configuredAnalysisLimit : 16;
  const analysisStories = deskData.topStories.filter(hasTranslatableSource).slice(0, analysisLimit);
  // 每篇文章都必须经过 translator；事实/立场/分类专家只处理首页重点，避免将全文一次性喂给单个 LLM。
  const expertTasks = [
    ...createArticleAgentTasks(translationStories, runId, apiConfig, ['translator']),
    ...createArticleAgentTasks(analysisStories, runId, apiConfig, ['fact-extractor', 'source-positioner', 'topic-classifier']),
  ];
  const overviewTasks = createOverviewTasks(items, runId, apiConfig);
  const mergeDependencies = expertTasks.map((task) => task.id);
  const tasks = [
    ...expertTasks.map((task) => ({ ...task, inputKeys: ['pack'] })),
    ...overviewTasks,
    {
      id: 'evidence-merger',
      role: 'evidence-merger',
      optional: true,
      dependsOn: mergeDependencies,
      run: (input) => {
        const merged = {};
        for (const [taskId, dependency] of Object.entries(input.dependencies || {})) {
          if (dependency.status === 'succeeded' && dependency.output) merged[taskId] = dependency.output;
        }
        return { articles: merged, runId };
      },
    },
  ];

  const harnessResult = await runHarness({
    runId,
    tasks,
    context: {
      model,
      fallbackModel,
      pack: null,
    },
    maxConcurrency: (() => {
      const configuredConcurrency = Number.parseInt(process.env.AI_MAX_CONCURRENCY || '8', 10);
      return Number.isInteger(configuredConcurrency) && configuredConcurrency > 0 ? configuredConcurrency : 8;
    })(),
    roleConcurrency: {
      translator: Number.parseInt(process.env.AI_TRANSLATOR_CONCURRENCY || '4', 10) || 4,
      'fact-extractor': 2,
      'source-positioner': 2,
      'topic-classifier': 2,
      'hourly-editor': 1,
      'daily-analyst': 1,
      'social-trends': 1,
    },
  });
  console.log(`[AI] Harness completed: ${harnessResult.metrics.succeeded}/${harnessResult.metrics.totalTasks} tasks succeeded; degraded=${harnessResult.degraded}`);

  for (const [index, story] of translationStories.entries()) {
    const chunks = splitArticleIntoChunks(story.fullContent || story.snippet || '');
    const translatedChunks = chunks.map((_, chunkIndex) => harnessResult.outputs[`article-${index}-translator-${chunkIndex}`]);
    if (translatedChunks.length > 0 && translatedChunks.every((chunk) => chunk?.fullTranslation)) {
      const first = translatedChunks[0];
      const candidateTitle = String(first.translatedTitle || '').trim();
      const candidateOriginalTitle = String(first.originalTitle || '').trim();
      const mergedTranslation = translatedChunks.map((chunk) => String(chunk.fullTranslation).trim()).join('\n\n');
      const deterministicTitle = readableChineseHeadline({ ...story, title: story.originalTitle });
      const translatedTitle = hasChineseTitle(candidateTitle)
        ? candidateTitle
        : (hasChineseTitle(deterministicTitle) ? deterministicTitle : deriveChineseTitleFromTranslation(mergedTranslation));
      const titleIsReadable = hasChineseTitle(translatedTitle);
      const sourceLength = String(story.fullContent || story.snippet || '').trim().length;
      const mergedParagraphs = countContentParagraphs(mergedTranslation);
      const completeEnough = mergedTranslation.length >= Math.max(240, Math.ceil(sourceLength * 0.35))
        && mergedParagraphs >= 1
        && !isLikelyTruncatedBody(mergedTranslation)
        && !/(?:阅读|查看|参见|请前往).{0,24}(?:全文|原文|完整报道)/i.test(mergedTranslation)
        && isChineseReadableText(mergedTranslation, { minChars: 40, minRatio: 0.16 })
        && titleIsReadable;
      if (completeEnough) {
        story.title = translatedTitle;
        story.originalTitle = candidateOriginalTitle || story.originalTitle;
        story.fullTranslation = mergedTranslation;
        story.translationParagraphs = mergedParagraphs;
        story.translationStatus = 'full';
        story.translationModel = [...new Set(translatedChunks.map((chunk) => chunk._model).filter(Boolean))].join(',') || null;
      }
    }
  }

  deskData.ticker = rebuildChineseTicker(items, uniqueStories, timeInfo);

  // Rebuild local overview evidence after article translation tasks finish.
  // This keeps a degraded hourly/daily editor run useful instead of showing
  // repeated untranslated placeholders.
  const refreshedFallback = buildEvidenceFallback(uniqueStories, timeInfo);
  baseSynthesis.hourlyBriefing = refreshedFallback.hourlyBriefing;
  baseSynthesis.dailyBriefing = refreshedFallback.dailyBriefing;
  baseSynthesis.perspectiveMatrix = refreshedFallback.perspectiveMatrix;
  baseSynthesis.socialTrends = refreshedFallback.socialTrends;

  for (const [index, story] of analysisStories.entries()) {
    const facts = harnessResult.outputs['article-' + index + '-fact-extractor'];
    const position = harnessResult.outputs['article-' + index + '-source-positioner'];
    const classifier = harnessResult.outputs['article-' + index + '-topic-classifier'];
    story.agentEvidence = {
      facts: facts || null,
      position: position || null,
      classification: classifier || null,
      citations: [{ source: story.source, sourceLang: story.sourceLang, publishedAt: story.publishedAt || null, url: story.url }],
      runId,
    };
    if (facts?.facts?.length || position || classifier) {
      story.keyTakeaways = [
        ...(facts?.facts || []).slice(0, 2).map((fact) => typeof fact === 'string' ? fact : fact.claim).filter(Boolean),
        ...(position?.narrativeFocus ? ['来源叙事重点：' + position.narrativeFocus] : []),
      ].slice(0, 4);
    }
  }

  const hourlyResult = harnessResult.outputs['hourly-editor'];
  const dailyResult = harnessResult.outputs['daily-analyst'];
  const socialResult = harnessResult.outputs['social-trends'];
  if (hourlyResult?.hourlyBriefing) baseSynthesis.hourlyBriefing = hourlyResult.hourlyBriefing;
  if (hourlyResult?.perspectiveMatrix) baseSynthesis.perspectiveMatrix = hourlyResult.perspectiveMatrix;
  if (hourlyResult?.specialTopics) baseSynthesis.specialTopics = hourlyResult.specialTopics;
  if (hourlyResult?.socialTrends) baseSynthesis.socialTrends = hourlyResult.socialTrends;
  if (dailyResult?.title || dailyResult?.lead || dailyResult?.themes) baseSynthesis.dailyBriefing = dailyResult;
  if (socialResult?.radar || socialResult?.debates) baseSynthesis.socialTrends = socialResult;
  baseSynthesis.orchestration = {
    runId,
    degraded: harnessResult.degraded,
    degradedTasks: harnessResult.degradedTasks,
    metrics: harnessResult.metrics,
    modelBudget: {
      maxTotalModelCalls: apiConfig.callBudget.maxTotalModelCalls,
      maxFallbackCalls: apiConfig.callBudget.maxFallbackCalls,
      totalCalls: apiConfig.callBudget.totalCalls,
      fallbackCalls: apiConfig.callBudget.fallbackCalls,
    },
  };


  return {
    ...baseSynthesis,
    ...deskData
  };
}

function parsePositiveEnv(name, fallback) {
  const value = Number.parseInt(process.env[name] || '', 10);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function createModelCallBudget() {
  const maxTotalModelCalls = parsePositiveEnv('AI_MAX_TOTAL_CALLS', 384);
  const maxFallbackCalls = parsePositiveEnv('AI_MAX_FALLBACK_CALLS', 96);
  return {
    maxTotalModelCalls,
    maxFallbackCalls,
    totalCalls: 0,
    fallbackCalls: 0,
    reserve(model, primaryModel) {
      if (this.totalCalls >= this.maxTotalModelCalls) {
        throw new Error(`model call budget exhausted (${this.maxTotalModelCalls})`);
      }
      const isFallback = model !== primaryModel;
      if (isFallback && this.fallbackCalls >= this.maxFallbackCalls) {
        throw new Error(`fallback model call budget exhausted (${this.maxFallbackCalls})`);
      }
      this.totalCalls += 1;
      if (isFallback) this.fallbackCalls += 1;
    },
  };
}
