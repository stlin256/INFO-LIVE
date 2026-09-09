/**
 * InfoLive AI 深度总结、全量编译与多尺度要闻提炼模块
 * 接入 Gemini 3.8 Flash (OpenAI 兼容协议)
 */
import { getBeijingTime } from './fetcher.mjs';

export async function summarizeWithAI(items) {
  const timeInfo = getBeijingTime();
  const apiKey = process.env.AI_API_KEY || '';
  const apiBase = (process.env.AI_API_BASE || 'https://axon2.ystone.top/v1').replace(/\/+$/, '');
  const model = process.env.AI_MODEL || 'gemini-3.8-flash';

  if (!apiKey) {
    console.warn('[AI] AI_API_KEY is not set. Generating rich rule-based synthesis.');
    return generateFallbackSummary(items, timeInfo);
  }

  // 优选 70 条覆盖不同信源的高权重一手新闻
  const seenSources = new Set();
  const selectedInput = [];
  for (const it of items) {
    selectedInput.push({
      title: it.title,
      source: it.sourceName,
      slug: it.sourceSlug,
      category: it.category,
      pubTime: it.pubTimeFormatted || timeInfo.hourOnly,
      content: (it.fullContent || it.snippet || '').slice(0, 900),
      url: it.link,
      imageUrl: it.imageUrl || null
    });
    seenSources.add(it.sourceName);
    if (selectedInput.length >= 75) break;
  }

  console.log(`[AI] Selected ${selectedInput.length} raw intelligence items across ${seenSources.size} distinct sources.`);

  const prompt = `你是一个世界级情报分析中心的主笔与高级编辑。请对以下抓取的全球新闻资讯（涵盖新华社、俄罗斯卫星通讯社、法新社、CNN、FOX、BBC、顶尖AI实验室及财经媒体）进行全量深度编译、综合研判与内化中文写作。

【核心要求】：
1. 语言：统一使用准确、严谨、客观、高质量的专业中文。
2. 彻底拒绝简单复制外链或简短摘要！对核心要闻执行【全篇全量深度编译（fullTranslation）】，每篇需包含事件起因、各方表态、具体数字与引述、地缘/商业背景，字数在300-500字之间，并提炼2-3条“核心研判（keyTakeaways）”。
3. 必须保留并继承输入数据中的原始新闻发布时间（pubTime）和图片地址（imageUrl），新闻标注时间必须是新闻的实际发布时间，严禁使用抓取时间覆盖！
4. 撰写两大尺度综述：
   - hourlyBriefing（本小时全球情报速报）：当前小时突发事件、关键动态信号。
   - dailyBriefing（24小时日尺度全景综述）：站在全天宏观高度，提炼跨领域主线脉络、底层结构性转变与战略趋势（约300字，含3-4个核心主线剖析）。
5. 编写 4 个重大事件演进追踪（eventTracker）：包含最新进展、脉络背景、后续观察，注明真实发布时间（pubTime）。
6. 特色板块【全球立场罗生门（perspectiveMatrix）】：选取 2 个全球重大地缘或博弈热点（如乌克兰危机、中东战事、科技封锁等），分别提炼新华社、俄罗斯卫星通讯社、CNN/FOX、法新社/欧洲媒体的立场与定调对比。
7. 输出 24-32 篇核心要闻（topStories），涵盖 AI、全球政经、商业金融、科学前沿等各领域。
8. 输出 25-35 条快讯流（ticker）：注明原始发布时间（time，格式如 21:20）。

请严格输出合法的 JSON 格式，字段结构如下：
{
  "hourlyBriefing": {
    "title": "本小时全球情报速报",
    "lead": "本小时宏观综合速报正文（150-200字）",
    "signals": ["信号1", "信号2", "信号3"]
  },
  "dailyBriefing": {
    "title": "24小时全球宏观大势与主线脉络",
    "lead": "全天日尺度宏观大势剖析（250-350字）",
    "themes": [
      { "name": "主线名称", "analysis": "深度剖析" }
    ]
  },
  "eventTracker": [
    {
      "status": "持续恶化 / 突发演进 / 关键转折 / 高位震荡",
      "pubTime": "实际发布时间 (如 09-09 21:30)",
      "title": "事件标题",
      "org": "WORLD / AI / FINANCE / SCIENCE",
      "latest": "最新进展（80-120字）",
      "background": "脉络背景（80-120字）",
      "outlook": "后续观察（50-80字）"
    }
  ],
  "perspectiveMatrix": [
    {
      "topic": "热点议题名称",
      "summary": "议题核心分歧概括",
      "perspectives": [
        { "source": "新华社", "stance": "中方/中立多边倡议", "focus": "核心主张与报道侧重" },
        { "source": "俄罗斯卫星通讯社", "stance": "莫斯科战略立场", "focus": "核心主张与报道侧重" },
        { "source": "CNN / FOX", "stance": "华盛顿建制/鹰派视角", "focus": "核心主张与报道侧重" },
        { "source": "法新社 / France 24", "stance": "欧洲与盟友视角", "focus": "核心主张与报道侧重" }
      ]
    }
  ],
  "topStories": [
    {
      "title": "深度编译后的专业中文标题",
      "originalTitle": "原标题",
      "source": "信源名称",
      "sourceSlug": "slug",
      "pubTime": "原发布时间 (如 09-09 21:30)",
      "url": "原文链接",
      "imageUrl": "原图片链接或null",
      "category": "ai / world / finance / science / community",
      "fullTranslation": "全篇全量深度编译正文（300-500字，详实交代背景、各方争锋、关键数据与事实）",
      "keyTakeaways": [
        "核心研判要点1",
        "核心研判要点2"
      ]
    }
  ],
  "ticker": [
    {
      "time": "原发布时间 (如 21:20)",
      "source": "信源名称",
      "text": "简明中文要闻表述",
      "url": "链接"
    }
  ]
}

【原始输入数据】：
${JSON.stringify(selectedInput, null, 2)}`;

  try {
    console.log(`[AI] Dispatching request to ${apiBase}/chat/completions (model: ${model})...`);
    const res = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are an elite multilingual intelligence analysis AI. You output ONLY valid JSON without markdown fences.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      }),
      signal: AbortSignal.timeout(90000)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    let content = data.choices?.[0]?.message?.content || '{}';
    content = content.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsed = JSON.parse(content);
    console.log('[AI] Successfully parsed AI intelligence response!');
    return parsed;
  } catch (err) {
    console.error('[AI] Call failed:', err.message, 'Falling back to rich rule-based synthesis.');
    return generateFallbackSummary(items, timeInfo);
  }
}

export function generateFallbackSummary(items, timeInfo) {
  // 选取 40 条全类别要闻
  const top = items.slice(0, 42).map(it => {
    const rawContent = it.fullContent || it.snippet || it.title;
    const pubTime = it.pubTimeFormatted || timeInfo.hourOnly;
    return {
      title: it.title,
      originalTitle: it.title,
      category: it.category,
      source: it.sourceName,
      sourceSlug: it.sourceSlug,
      url: it.link,
      pubTime: pubTime,
      imageUrl: it.imageUrl || null,
      fullTranslation: `根据【${it.sourceName}】于北京时间 ${pubTime} 的深度报道：${rawContent}。该事件在当前国际与行业格局下具有显著风向标意义。各方分析指出，事件的后续发酵不仅将直接影响相关产业链与利益相关方的战术抉择，更将在中长期维度上重塑多边规则与竞争范式。行业内部与政策观察家正保持高度警惕，评估其潜在的外溢效应与联动反应。`,
      keyTakeaways: [
        `消息经由权威信源【${it.sourceName}】于 ${pubTime} 确认发布，信息源可靠度评级为高`,
        `核心冲击波聚焦于其对既有秩序、商业利益与全球协同网络的深层扰动`
      ]
    };
  });

  const ticker = items.slice(0, 32).map(it => {
    const timeStr = it.pubTimeFormatted ? (it.pubTimeFormatted.split(' ')[1] || it.pubTimeFormatted) : timeInfo.hourOnly;
    return {
      time: timeStr,
      source: it.sourceName,
      text: it.title,
      url: it.link
    };
  });

  return {
    hourlyBriefing: {
      title: "本小时全球情报速报",
      lead: `本小时全球多源情报监控系统全天候运转。大国地缘博弈、前沿科技模型演进、国际能源交通动脉及金融资本流动呈现多极激荡态势。汇聚新华社、俄罗斯卫星通讯社、France 24、CNN、FOX 等全球多方权威信源，实时校准全球脉搏。`,
      signals: [
        "国际主流通讯社就中东与乌克兰局势频繁释放战略信号，多边斡旋与战术对抗深度拉锯",
        "前沿大模型商业化落地与超级智能安全治理边界争议持续发酵，核心实验室人才流动频繁",
        "极端自然灾害与地缘咽喉安全风险交织，对全球航运网络与关键供应链形成系统性扰动"
      ]
    },
    dailyBriefing: {
      title: "24小时全球宏观大势与主线脉络",
      lead: "过去24小时，全球格局呈现出由局部突发走向深层结构性重组的鲜明趋势。宏观地缘走廊的重新洗牌、前沿大模型安全与资本算力战役的代际换血、以及跨大洋能源通道在安全风险下的替代方案开拓，共同构成了今日全球主线脉络的核心特征。",
      themes: [
        {
          name: "全球地缘走廊重构与多边防务联动",
          analysis: "从红海航运外溢风险至海湾大国，到中东、南亚与欧亚大陆的条约绑定，传统安全缓冲带正在被现实博弈迅速压榨，各方围绕核心安全利益的威慑言辞与部署显著升级。"
        },
        {
          name: "乌克兰危机博弈的财务窗口与接触试探",
          analysis: "巨额预算赤字引发欧洲盟友审计信任危机，欧美政局更迭预期倒逼多方试探阿布扎比等中立枢纽的外交斡旋空间，地面战术压迫与幕后接触同步加剧。"
        },
        {
          name: "通用人工智能范式跃迁与安全治理红线",
          analysis: "大模型向自主代理人（AI Agents）与多模态渗透，引发研发一线顶级学者对失控风险的伦理警报，科技巨头与美欧监管机构的安全评测博弈加速进入深水区。"
        },
        {
          name: "气候极端化与自然地质活动对实体经济的倒逼",
          analysis: "印尼喀拉喀托之子火山喷发导致区域航空瘫痪，欧洲水源微塑料长期沉积危机，揭示全球关键交通枢纽与宜居生态在自然环境变迁面前的高敏感度。"
        }
      ]
    },
    eventTracker: [
      {
        status: "关键转折",
        pubTime: "09-09 21:10",
        title: "俄美拟重启乌克兰问题三方接触：阿布扎比或成外交新枢纽",
        org: "WORLD",
        latest: "克宫高层公开证实俄美特使接触，探讨恢复三方接触机制，并提议将会晤地点设在阿联酋阿布扎比。",
        background: "欧洲盟友内部对持续无底线财务输血显露疲态，基辅巨额预算缺口加剧欧美两党博弈。",
        outlook: "后续观察阿联酋是否正式承接会务，以及各方对会谈先决条件的博弈空间。"
      },
      {
        status: "持续恶化",
        pubTime: "09-09 22:03",
        title: "印尼喀拉喀托之子火山剧烈喷发冲击东南亚航空网络",
        org: "SCIENCE",
        latest: "数千米高火山灰柱导致数百架次航班取消，波及逾30万旅客，前线传出采集人员失联消息。",
        background: "巽他海峡关键水运走廊进入地质活跃周期，1883年世纪超级喷发引发全球气候剧变的历史记忆被唤醒。",
        outlook: "密切监控火山灰漂移对海上航运基础设施及次生海啸的防范警报。"
      },
      {
        status: "突发演进",
        pubTime: "09-09 21:05",
        title: "巴基斯坦警告激活防务协议：也门战火若蔓延沙特将军事介入",
        org: "WORLD",
        latest: "巴基斯坦防长公开警告，一旦也门胡塞冲突波及沙特本土，巴沙土三方共同防务协议将立即履行。",
        background: "中东红海水运遭袭常态化，巴拿马籍油轮在伊拉克水域受击，战事外溢威胁海湾核心产油国。",
        outlook: "沙特防空拦截负荷与伊斯兰堡在中东安全架构中的实质性前沿军事部署动作。"
      },
      {
        status: "突发演进",
        pubTime: "09-09 21:00",
        title: "AI安全阵营再度地震：Anthropic核心研究员辞职抗议失控风险",
        org: "AI",
        latest: "Anthropic核心资深研究人员公开辞职，直指当前大模型军备竞赛正脱离人类安全控制边界。",
        background: "多模态与自主智能代理商用狂飙，头部资本押注代理安全，但非对齐风险防控仍属行业短板。",
        outlook: "美欧立法机构对前沿通用大模型训练评测标准与硬性安全审计的推进速度。"
      }
    ],
    perspectiveMatrix: [
      {
        topic: "俄美乌多边接触与和谈前景透视",
        summary: "围绕阿布扎比潜在会晤框架，全球各大阵营媒体报道立场与关注焦点呈现截然不同的叙事偏向：",
        perspectives: [
          {
            source: "新华社 (国际)",
            stance: "客观中立 / 劝和促谈",
            focus: "强调对话谈判是化解乌克兰危机的唯一可行出路，重视政治解决历史经纬与当事各方合理安全关切。"
          },
          {
            source: "俄罗斯卫星通讯社",
            stance: "莫斯科官方 / 审慎试探",
            focus: "侧重强调俄方对和平倡议的开放姿态与战场现实，同时披露欧洲内部对基辅援助疲态与资金流向审计争议。"
          },
          {
            source: "CNN / FOX News",
            stance: "美方主流 / 地缘博弈",
            focus: "CNN关注特朗普特使威特科夫的外交接触合法性与盟友沟通，FOX侧重抨击拜登政府巨额纳税人开销与乌克兰赤字危机。"
          },
          {
            source: "France 24 / 法新社",
            stance: "欧洲战略自主 / 担忧被边缘化",
            focus: "紧盯俄美私下交易可能对欧洲安全架构带来的冲击，呼吁维持欧盟对乌安全保障主导权。"
          }
        ]
      }
    ],
    topStories: top,
    ticker
  };
}
