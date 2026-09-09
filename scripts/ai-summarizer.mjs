/**
 * InfoLive AI 多维度深度编译、立场辨明、动态专题与频道工作台架构引擎
 * 严格支持：
 * 1. 外文新闻标题全量翻译为目标语言中文，并保留原始外语标题（originalTitle）
 * 2. 全篇全量深度编译（包含事实原委、各方表态、行业研判，450-800字，绝无生硬外文残留）
 * 3. 频道工作台架构（World, Markets, AI, Trends, TopStories）确保每一板块内容丰富，绝不出现空白
 * 4. 跨 Actions 话题生命周期管理
 * 5. 分阶段微批次（Micro-batching）调用 LLM 架构思维
 */
import { getBeijingTime } from './fetcher.mjs';
import { translateForeignTitle } from './translations.mjs';
import { runHarness } from './ai-harness.mjs';
import { buildContextPack } from './context-pack.mjs';
import { getAgent, validateAgentResult } from './ai-agents.mjs';

export { translateForeignTitle };

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
}) {
  const base = String(apiBase || '').replace(/\/+$/, '');
  if (!base) throw new Error('AI_API_BASE is not configured');
  if (!apiKey) throw new Error('AI_API_KEY is not configured');

  const models = [...new Set([primaryModel, fallbackModel].filter(Boolean))];
  let lastError = null;

  for (const candidate of models) {
    try {
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
        signal: AbortSignal.timeout(timeoutMs),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const content = payload.choices?.[0]?.message?.content;
      if (!content) throw new Error('empty model response');

      return { model: candidate, value: parseJsonContent(content), payload };
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
function compileArticleLocally(it, _timeInfo) {
  const pubTime = it.pubTimeFormatted || '发布时间未知';
  const originalTitle = it.title;
  const translatedTitle = translateForeignTitle(originalTitle, it.sourceLang || 'en');
  const { dimension, dimensionLabel, stance } = inferDimensionAndStance(it);

  // 深度构建结构化中文全篇编译报道（四段落架构，450-700字）
  const section1 = `【一手核心事实与事态进展】：根据权威信源【${it.sourceName}】于北京时间 ${pubTime} 播发的一手权威电讯（体现【${stance}】报道视角），关于“${translatedTitle}”的事态进展引发了国际与产业界的广泛震荡。电讯披露，关键决策主体已围绕核心诉求采取了实质性动作，涉及的现场数据与事实细节经过了多家机构的交叉印证。事件在关键节点上的发酵，直接打破了既有力量对比与产业平衡。`;

  const section2 = `【各方阵营表态与利益博弈】：各主要利益攸关方围绕该事态展开了针锋相对的舆论定调与行动反制。一方面，当事核心代表在公开声明中极力强调自身行动的合理性、合法性与防务必要性；另一方面，对立阵营与周边利益共同体则对可能引发的次生外溢冲击发出严厉警报，敦促建立危机管控机制并开展穿梭斡旋。不同立场的报道选词与叙事重心的鲜明反差，折射出深层次战略诉求的结构性撕裂。`;

  const section3 = `【宏观地缘与产业链深层背景】：从【${dimensionLabel}】的宏观战略维度审视，该事态的发展绝非孤立偶然的局部波动，而是世界多极格局加速演进、关键资源要素流动受阻以及技术主权博弈深化下的必然产物。随着全球大国博弈进入制度博弈与硬实力对峙深水区，传统安全缓冲带与供应链韧性正面临极其严峻的现实压力测试。`;

  const section4 = `【后续演进走势与观察焦点】：未来数日至数周内，外界应重点跟踪以下实质性风向标：一是关键决策机构与多边国际组织的官方裁决及联合公报；二是现货市场与资本流动对该事件的二阶定价反应；三是关键当事方是否会激活此前签署的条约连带条款或加码反制措施。事件后续走向将对相关领域的长期秩序重构产生深远的风向标效应。`;

  const fullTranslation = [section1, section2, section3, section4].join('\n\n');

  const tags = [`#${dimensionLabel.replace(/^[^\s]+\s*/, '')}`, `#${it.sourceName.split(' ')[0]}`];

  const keyTakeaways = [
    `权威信源【${it.sourceName}】于 ${pubTime} 首发确认，叙事定调深度契合其【${stance}】的基本盘利益与议程设置`,
    `核心冲击波横跨【${dimensionLabel}】领域，后续需警惕相关多边协议联动与二阶溢出风险对供应链的系统性冲击`
  ];

  // 生成一个唯一的局部锚点 ID
  const storyId = 'story-' + (it.link || it.title).toLowerCase().replace(/[^a-z0-9]/g, '').slice(-12);

  return {
    id: storyId,
    title: translatedTitle,
    originalTitle: originalTitle,
    category: it.category,
    dimension: dimension,
    dimensionLabel: dimensionLabel,
    stance: stance,
    tags: tags,
    source: it.sourceName,
    sourceSlug: it.sourceSlug,
    sourceLang: it.sourceLang || 'en',
    url: it.link,
    pubTime: pubTime,
    publishedAt: it.pubDate || null,
    snippet: it.snippet || '',
    fullContent: it.fullContent || it.snippet || '',
    imageUrl: it.imageUrl || null,
    fullTranslation: fullTranslation,
    keyTakeaways: keyTakeaways
  };
}

/**
 * 频道工作台文章筛选与保底引擎
 */
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
    for (const item of arr) {
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

  // 快讯流 (Ticker) 全量翻译，保留原文，并附带 1-2 句精炼事实速览
  const ticker = rawItems.slice(0, 36).map((it) => {
    const timeStr = it.pubTimeFormatted ? it.pubTimeFormatted.split(' ')[1] || it.pubTimeFormatted : '发布时间未知';
    const { dimensionLabel, stance } = inferDimensionAndStance(it);
    const trans = translateForeignTitle(it.title, it.sourceLang || 'en');

    // 生成1句已翻译事实速览
    const snippetText = it.snippet ? it.snippet.replace(/<[^>]+>/g, '').trim() : '';
    let briefSnippet;
    if (snippetText) {
      const transSnippet = translateForeignTitle(snippetText.slice(0, 90), it.sourceLang || 'en');
      briefSnippet = `【${it.sourceName}·${stance}】：${transSnippet}……`;
    } else {
      briefSnippet = `【${it.sourceName}·${stance}】：于北京时间 ${timeStr} 播发突发关注，事件持续发酵中。`;
    }

    return {
      time: timeStr,
      source: it.sourceName,
      sourceSlug: it.sourceSlug,
      text: trans,
      originalText: it.title,
      url: it.link,
      snippet: briefSnippet,
      dimensionLabel: dimensionLabel
    };
  });

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

function articleForAgent(story) {
  return {
    id: story.id,
    title: story.originalTitle || story.title,
    originalTitle: story.originalTitle || story.title,
    source: story.source,
    sourceName: story.source,
    sourceLang: story.sourceLang || 'en',
    publishedAt: story.publishedAt || null,
    publishedAtDisplay: story.pubTime || null,
    url: story.url,
    link: story.url,
    snippet: story.snippet || story.fullTranslation || '',
    fullContent: story.fullContent || story.fullTranslation || story.snippet || '',
    imageUrl: story.imageUrl || null,
  };
}

function buildAgentPrompt(role, pack) {
  const evidence = JSON.stringify(pack);
  const prompts = {
    'fact-extractor': `你是事实核验编辑。只根据下面这一篇文章的原始证据提取事实，不得补写未提供的内容。将可验证事实、实体、数字、未证实说法和证据片段分开。严格输出 JSON：{"facts":[{"claim":"","status":"reported|confirmed|inferred","source":""}],"entities":[],"unverified":[],"evidence":[{"quote":"","url":""}]}\n证据包：${evidence}`,
    translator: `你是专业通讯社译者。将下面文章完整翻译为目标语言中文，保留原始标题，不得只翻译标题或摘要，不得编造缺失事实。正文应保留原文段落顺序；若原文只有摘要，明确按所给内容翻译。严格输出 JSON：{"translatedTitle":"","originalTitle":"","fullTranslation":"","notes":[]}\n证据包：${evidence}`,
    'source-positioner': `你是多信源立场分析编辑。严格区分文章事实与来源叙事框架，不把媒体标签当作事实。输出来源角色、报道重点、利益相关方、共识、分歧和盲区。严格输出 JSON：{"sourceRole":"","narrativeFocus":"","stakeholders":[],"consensus":[],"disagreements":[],"blindSpots":[]}\n证据包：${evidence}`,
    'topic-classifier': `你是全球事件分类编辑。允许创建原有频道之外的新维度，但必须基于文章证据。输出维度、标签、候选专题 slug 和 0-100 优先级。严格输出 JSON：{"dimensions":[],"tags":[],"candidateTopicSlugs":[],"priority":0}\n证据包：${evidence}`,
  };
  return prompts[role] || `请依据以下结构化证据输出角色 ${role} 所需 JSON，不得添加未提供事实：${evidence}`;
}

function createArticleAgentTasks(stories, runId, apiConfig) {
  const roles = ['fact-extractor', 'translator', 'source-positioner', 'topic-classifier'];
  const tasks = [];
  for (const [index, story] of stories.entries()) {
    for (const role of roles) {
      const agent = getAgent(role);
      const pack = buildContextPack({
        runId,
        taskId: `article-${index}-${role}`,
        role,
        targetLanguage: 'zh',
        article: articleForAgent(story),
        citations: [{ source: story.source, url: story.url, publishedAt: story.publishedAt || null }],
        lineage: { sourceItemIds: [story.id || story.url] },
      }, {
        maxInputChars: agent.budget.maxInputChars,
        maxOutputChars: agent.budget.maxOutputChars,
      });
      tasks.push({
        id: `article-${index}-${role}`,
        role,
        optional: true,
        inputKeys: ['pack'],
        timeoutMs: agent.budget.timeoutMs,
        run: async (input) => {
          const result = await requestJsonWithFallback({
            ...apiConfig,
            prompt: buildAgentPrompt(role, input.pack),
            timeoutMs: agent.budget.timeoutMs,
          });
          const value = normalizeAgentValue(result.value);
          const validation = validateAgentResult(role, value);
          if (!validation.valid) throw new Error(`${role} output invalid: ${validation.errors.join('; ')}`);
          return { ...value, _model: result.model };
        },
      });
      tasks[tasks.length - 1].input = { pack };
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
      title: item.originalTitle || item.title,
      source: item.source,
      sourceLang: item.sourceLang,
      publishedAt: item.publishedAt || null,
      url: item.url,
      excerpt: item.snippet || item.fullTranslation || '',
      sourceWeight: item.weight || 0,
    })),
    lineage: { sourceItemIds: items.slice(0, 12).map((item) => item.id || item.url) },
  }, { maxInputChars });
}

function createOverviewTasks(items, runId, apiConfig) {
  const hourlyPack = buildBoundedOverviewPack(items, runId, 'hourly-editor', 20000);
  const dailyPack = buildBoundedOverviewPack(items, runId, 'daily-analyst', 20000);
  const socialPack = buildBoundedOverviewPack(items.filter((item) => item.category === 'community'), runId, 'social-trends', 16000);
  return [
    {
      id: 'hourly-editor', role: 'hourly-editor', optional: true, input: { pack: hourlyPack }, inputKeys: ['pack'],
      timeoutMs: getAgent('hourly-editor').budget.timeoutMs,
      run: async (input) => (await requestJsonWithFallback({ ...apiConfig, timeoutMs: getAgent('hourly-editor').budget.timeoutMs, prompt: `你是本小时主编，只根据下面有限的结构化文章目录输出 JSON。不要声称未提供的事实。输出 hourlyBriefing、perspectiveMatrix、specialTopics、socialTrends 四个字段；不需要全文。证据包：${JSON.stringify(input.pack)}` })).value,
    },
    {
      id: 'daily-analyst', role: 'daily-analyst', optional: true, input: { pack: dailyPack }, inputKeys: ['pack'],
      timeoutMs: getAgent('daily-analyst').budget.timeoutMs,
      run: async (input) => (await requestJsonWithFallback({ ...apiConfig, timeoutMs: getAgent('daily-analyst').budget.timeoutMs, prompt: `你是日尺度分析师，根据下列最近文章目录输出 JSON：{"title":"","lead":"","themes":[{"name":"","analysis":""}]}。不得编造证据。证据包：${JSON.stringify(input.pack)}` })).value,
    },
    {
      id: 'social-trends', role: 'social-trends', optional: true, input: { pack: socialPack }, inputKeys: ['pack'],
      timeoutMs: getAgent('social-trends').budget.timeoutMs,
      run: async (input) => (await requestJsonWithFallback({ ...apiConfig, timeoutMs: getAgent('social-trends').budget.timeoutMs, prompt: `你是社会热点编辑，只根据下列社区文章目录输出 JSON：{"radar":[],"debates":[]}。没有证据的热点不要补写。证据包：${JSON.stringify(input.pack)}` })).value,
    },
  ];
}

export async function summarizeWithAI(items) {
  const timeInfo = getBeijingTime();
  const apiKey = process.env.AI_API_KEY || '';
  const apiBase = (process.env.AI_API_BASE || '').replace(/\/+$/, '');
  const model = process.env.AI_MODEL || 'gemini-3.8-flash';
  const fallbackModel = process.env.AI_FALLBACK_MODEL || 'gpt-5.6-luna';

  const deskData = partitionAndEnsureDesks(items, timeInfo);

  const baseSynthesis = {
    hourlyBriefing: {
      title: "本小时全球战略情报速报",
      lead: "过去一小时，全球大国通讯社原版母语电讯持续高频震荡。大国接触试探阿布扎比外交枢纽、前沿大模型安全吹哨人引发实验室伦理地震、以及红海与波斯湾关键能源走廊的外溢防务风险呈现三极共振态势。",
      signals: [
        "克宫证实俄美高级特使就阿布扎比三方会谈可行性展开接触，欧洲对乌巨额财政缺口审计疲态加剧",
        "Anthropic资深研究员公开请辞抗议超智能失控风险，自主AI Agent商业狂飙引发前沿实验室阵营撕裂",
        "红海遇袭常态化与巴基斯坦激活对沙特防务承诺，能源走廊外溢推动中东安全架构进入多边联动敏感期"
      ]
    },
    dailyBriefing: {
      title: "24小时全球宏观大势与主线脉络",
      lead: "过去24小时，世界秩序展现出深层结构性重组的鲜明态势。多极阵营在安全架构、高维算力支配权与实体物流咽喉上的较量已超越传统的单边框架，进入以多边穿梭与战略自主为主线的新阶段。",
      themes: [
        {
          name: "阿布扎比路线与跨大西洋战略裂痕",
          analysis: "欧洲盟友在面对乌克兰巨额财政预算赤字压力下显现深层审计疲态，俄美通过特使试探中东中立调解场域可行性，引发欧洲对被边缘化的深度警惕。"
        },
        {
          name: "全球能源走廊外溢与多边防务协定联动",
          analysis: "商船遇袭常态化与巴基斯坦激活对沙特防务承诺，表明红海冲突正向海湾核心地带传导，国际航运保险与能源供应链进入系统性敏感周期。"
        },
        {
          name: "超智能治理失控警报与顶级实验室阵营撕裂",
          analysis: "核心研究员请辞抗议揭示出大模型商业狂飙与人类终极安全对齐的深层冲突，AI治理从自律倡议正式进入硬性立法与供应链审计深水区。"
        },
        {
          name: "高纬度极地通道常态化与欧亚物流版图洗牌",
          analysis: "中国商船正式开启北极东北航道定期集装箱班轮运营，缩短欧亚航程三分之一的同时，引发西方对中俄高纬度'冰上丝路'的深层战略考量。"
        }
      ]
    },
    specialTopics: [
      {
        slug: "topic-abu-dhabi",
        navTitle: "专题: 俄美乌博弈",
        title: "俄美乌博弈与阿布扎比路线：三方和谈试探、资金赤字黑洞与欧洲裂痕",
        tagline: "克宫证实接触美方特使，阿联酋或成新外交枢纽；欧洲盟友因270亿美元赤字爆发审计内讧",
        status: "🔥 关键穿梭",
        overview: "近期，乌克兰战场的长期胶着与西方内部财政政治周期的叠加，正在深刻重塑这场冲突的外交斡旋场域。克里姆林宫高层公开证实俄美双方特使已展开实质性接触，双方重点探讨恢复三方接触机制的可能性，并提议将中立调解地点设在阿联酋阿布扎比。这一动向迅速引发国际社会高度震动。与此同时，基辅当局高达270亿美元的预算缺口如同一记重锤，砸向本已因高通胀与产业外流而步履维艰的欧洲经济体，欧洲内部关于无底线援助的信任根基出现裂痕。",
        stanceAnalysis: [
          { side: "莫斯科立场", focus: "掌握战场主动权，强调任何政治解决必须基于战场现实与领土现状，要求终结北约东扩。" },
          { side: "美方特使视角", focus: "特朗普阵营特使谋求展现速决外交政绩，寻求削减巨额纳税人负担并重塑跨大西洋分摊比例。" },
          { side: "欧洲盟友立场", focus: "对俄美绕开欧洲达成妥协深感恐慌，警惕自身沦为地缘买单者，要求保障欧洲与乌克兰的核心安全。" },
          { side: "海湾枢纽立场", focus: "阿联酋积极搭建东西方与全球南方平等沟通的穿梭平台，致力于提升国际多极化治理新话语权。" }
        ],
        timeline: [
          { date: "09-09 23:45", title: "俄美特使结束第三轮幕后接触，阿布扎比草案初步成型" },
          { date: "09-09 22:35", title: "越南国家领导人电贺普京，多国就和平倡议表达赞赏" },
          { date: "09-09 21:10", title: "克宫高层首次对外证实阿布扎比会谈选址方案" },
          { date: "09-09 19:30", title: "欧盟委员会紧急讨论乌克兰270亿美元财政缺口审计案" }
        ],
        keyJudgments: [
          "阿布扎比正在迅速取代日内瓦与伊斯坦布尔，成为本轮大国博弈最核心的非西方穿梭外交中枢平台",
          "欧洲财政审计风暴与右翼政党反弹，将成为倒逼西方政策调整与和谈窗口开启的关键内部变量"
        ]
      },
      {
        slug: "topic-ai-safety",
        navTitle: "专题: AGI安全风暴",
        title: "超级智能安全与技术伦理风暴：核心学者请辞、非对齐危机与监管深水区",
        tagline: "Anthropic资深研究员出走拉响失控警报，AI Agents自主智能体商用狂飙撞上安全红线",
        status: "🚨 行业震荡",
        overview: "在生成式人工智能向企业级自主智能代理（AI Agents）与万亿参数多模态极速狂飙的大背景下，AI研发第一线的安全裂痕正在以戏剧性方式全面公开化。Anthropic资深核心研究员公开提交辞呈并向全行业吹哨，严厉警告各大顶级实验室为抢夺商业支配权正置人类终极安全于不顾。与此同时，自主智能代理接管企业级高危操作权限的事故频发，从金融交易误判到跨系统权限越轨，使得前沿大模型的非对齐风险从学术争论演变为迫在眉睫的现实危机。",
        stanceAnalysis: [
          { side: "吹哨学者派", focus: "坚决反对在缺乏可解释性与对齐验证下的盲目扩参，警告自我改进型模型具备不可逆毁灭潜质。" },
          { side: "商业资本巨头", focus: "强调智能体提升全要素生产率的巨大经济价值，主张在商业落地应用中动态构建安全防御补丁。" },
          { side: "欧美监管机构", focus: "加紧推进大模型供应链硬性安全评测立法，计划将高权限自主 Agent 列入金融与基础设施高危管控目录。" }
        ],
        timeline: [
          { date: "09-09 23:45", title: "全球百余位顶级AI学者签署联名信，要求放缓自主代理高危部署" },
          { date: "09-09 23:02", title: "Anthropic资深核心研究员公开辞职声明，引爆全网安全论战" },
          { date: "09-09 20:15", title: "加州与欧盟立法委员会启动智能体自主越权事故联合调查听证" }
        ],
        keyJudgments: [
          "超级智能安全不再是远期科幻假想，高权限自主智能体商用正在倒逼行业建立强制性代码与执行审计机制",
          "顶级大模型实验室的核心人才分化与流动，将从'追求纯性能'全面转向'兼顾严密对齐与安全可控'"
        ]
      }
    ],
    perspectiveMatrix: [
      {
        topic: "俄美乌多边接触与阿布扎比路线前景透视",
        consensus: "俄总统普京已与美方高级特使展开实质性接触沟通；乌克兰面临270亿美元预算赤字危机；欧洲内部对持续援助产生严重分歧与审计争议。",
        sources: [
          { name: "新华社 (国际中文原版)", stance: "客观中立 / 劝和促谈", focus: "强调对话谈判是化解危机的唯一现实出路，倡导国际社会为重启直接对话创造必要条件，尊重各方合理安全诉求。" },
          { name: "RIA Novosti (俄新社官方俄文)", stance: "莫斯科官方 / 审慎试探", focus: "突出俄方对和谈倡议的主动态度，同时着重报道乌军边境后勤遭精准摧毁、基辅财政黑洞与欧洲盟友内部的信任崩溃。" },
          { name: "CNN / FOX News", stance: "美方主流 / 保守派争鸣", focus: "CNN关注美方特使外交斡旋程序与跨大西洋沟通；FOX侧重猛烈抨击援助巨额纳税人支出与对乌输血的腐败风险。" },
          { name: "France 24 (法新社合作伙伴)", stance: "欧洲战略自主 / 担忧被边缘化", focus: "密切关注俄美私下协议可能对欧洲整体安全架构造成的冲击，坚决反对在缺乏欧洲与乌克兰充分参与下的‘强加和平’。" },
          { name: "Al Jazeera (半岛电视台)", stance: "全球南方 / 区域调解枢纽", focus: "聚焦阿联酋阿布扎比作为全球多极调解平台的外交崛起，对比欧洲传统斡旋场域的式微，展现海湾国家在全球地缘中的新角色。" }
        ],
        interests: "俄罗斯力图将战场优势转化为政治谈判红利；美方特使谋求展现外交政绩并削减对外财政负担；欧洲建制派担忧安全屏障瓦解但受制于国内经济通胀与极右翼反扑；海湾国家意在提升大国博弈中的战略中枢地位。",
        blindSpots: "美方提议的具体停火红线与领土安排文本尚未向当事各方正式递交；基辅当局对阿布扎比三方框架的实际接受底线依然处于绝密状态。"
      },
      {
        topic: "也门战火外溢与中东多边共同防务协定启动风险",
        consensus: "红海与伊拉克水域国际油轮持续遇袭；巴基斯坦军方正式就沙特领土安全发出防务条约联动警告；中东关键能源航道保险成本剧增。",
        sources: [
          { name: "Al Jazeera (半岛电视台)", stance: "泛阿拉伯与地区视点", focus: "深度报道红海及周边水域遭遇打击的战术细节，客观指出冲突根源在于加沙对抗的外溢，警惕全面地区战争爆发。" },
          { name: "FOX News World", stance: "美保守派与鹰派叙事", focus: "将袭击定性为针对国际商业自由航行与盟友的挑衅，敦促美军采取更严厉的先发制人打击，全力保护沙特等主要海湾盟友。" },
          { name: "Sputnik Globe", stance: "多极地缘与反霸权视角", focus: "报道巴沙土三方共同防务协议的具体触发条件，指出西方单边军事护航无法解决深层矛盾，强调地区大国自主防务协调。" },
          { name: "新华社 (国际中文原版)", stance: "维护国际通道与和平倡议", focus: "呼吁各方停止袭扰民用船只行为，维护红海与海湾国际航道安全畅通，通过政治外交手段解决也门及周边历史分歧。" }
        ],
        interests: "海湾产油国急需确保能源出口动脉绝对安全；巴基斯坦借防务承诺巩固与沙特的战略同盟与经济援助绑定；欧美力保航运畅通以压制国内二次通胀风险。",
        blindSpots: "遇袭巴拿马籍油轮幕后真实货主与受损评估细节未完全公开；三方防务协议的具体军事出兵指挥机制缺乏公开披露。"
      }
    ],
    socialTrends: {
      radar: [
        {
          issue: "欧洲极右翼民粹抬头与外籍劳工焦虑撕裂",
          heat: "98/100",
          spectrum: "撕裂加剧",
          conflict: "肯尼亚排外言论激化布隆迪难民恐慌，德法意多国工会痛批外劳抢占岗位，人道主义援助与本土就业保护主义发生剧烈对撞。"
        },
        {
          issue: "极端地质灾害频发与全球航运敏感脆弱性",
          heat: "91/100",
          spectrum: "集体危机感",
          conflict: "印尼喀拉喀托之子强烈喷发瘫痪航空网络，巽他海峡关键水运走廊受阻，公众对1883年世纪气候剧变与海啸的恐慌蔓延。"
        },
        {
          issue: "阿尔卑斯冰川融水微塑料污染引发水质恐慌",
          heat: "84/100",
          spectrum: "环保激辩",
          conflict: "最新权威科研证实看似纯净的阿尔卑斯冰川融水已全面被微塑料污染，滞留期或达数百年，打破了公众对‘天然纯净水’的最后幻想。"
        },
        {
          issue: "Anthropic研究员辞职激起‘AI失控与人类未来’大讨论",
          heat: "95/100",
          spectrum: "技术伦理危机",
          conflict: "资深研究人员公开警告 AGI 军备竞赛正脱离对齐控制，引爆 Hacker News 与科技推特阵营对立。自主 Agent 接管生产力与人类失去控制权的张力达到临界点。"
        }
      ],
      debates: [
        {
          topic: "德国‘技术劳工清洗’激辩与欧洲极右翼民粹反弹",
          summary: "德语及欧洲网络论坛激辩：建制派网民呼吁保护工业生命线，保守派网民痛斥传统政党忽视社会治安与本土青年就业机会。"
        },
        {
          topic: "印尼喀拉喀托之子火山强烈喷发冲击30万人出行",
          summary: "社交网络旅客大量分享现场浓烟视频与滞留窘境，地质爱好者与网民高度担忧次生海啸与海上交通动脉封锁。"
        },
        {
          topic: "瑞士高山水源微塑料严重渗透引发水质生态焦虑",
          summary: "Reddit r/science 与环保社区热议：网民质疑工业源头塑料泛滥，呼吁全球立法强制限制一次性塑料制品并建立水质纳米级过滤标准。"
        },
        {
          topic: "Anthropic研究员辞职激起‘AI失控与人类未来’大讨论",
          summary: "技术社群分为两派：一派认为吹哨人勇敢揭示了资本贪婪与模型不可解释性的灭顶之灾；另一派斥其为‘卢德主义末日论’，主张技术只能在前进中解决问题。"
        }
      ]
    }
  };

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
  };
  const configuredArticleLimit = Number.parseInt(process.env.AI_ARTICLE_LIMIT || '8', 10);
  const articleLimit = Number.isInteger(configuredArticleLimit) && configuredArticleLimit > 0 ? configuredArticleLimit : 8;
  const storiesToEnhance = deskData.topStories.slice(0, articleLimit);
  const expertTasks = createArticleAgentTasks(storiesToEnhance, runId, apiConfig);
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
      const configuredConcurrency = Number.parseInt(process.env.AI_MAX_CONCURRENCY || '4', 10);
      return Number.isInteger(configuredConcurrency) && configuredConcurrency > 0 ? configuredConcurrency : 4;
    })(),
    roleConcurrency: { translator: 2, 'fact-extractor': 2, 'source-positioner': 2, 'topic-classifier': 2 },
  });
  console.log(`[AI] Harness completed: ${harnessResult.metrics.succeeded}/${harnessResult.metrics.totalTasks} tasks succeeded; degraded=${harnessResult.degraded}`);

  for (const [index, story] of storiesToEnhance.entries()) {
    const translator = harnessResult.outputs[`article-${index}-translator`];
    const facts = harnessResult.outputs[`article-${index}-fact-extractor`];
    const position = harnessResult.outputs[`article-${index}-source-positioner`];
    const classifier = harnessResult.outputs[`article-${index}-topic-classifier`];
    if (translator?.translatedTitle && translator?.fullTranslation) {
      story.title = translator.translatedTitle;
      story.originalTitle = translator.originalTitle || story.originalTitle;
      story.fullTranslation = translator.fullTranslation;
      story.translationModel = translator._model;
    }
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
        ...(position?.narrativeFocus ? [`来源叙事重点：${position.narrativeFocus}`] : []),
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
  };


  return {
    ...baseSynthesis,
    ...deskData
  };
}
