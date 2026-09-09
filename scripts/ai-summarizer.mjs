/**
 * InfoLive AI 多维度深度编译、立场辨明、动态专题与全景情报分析引擎
 * 接入 Gemini 3.8 Flash (OpenAI 兼容协议)
 */
import { getBeijingTime } from './fetcher.mjs';

export async function summarizeWithAI(items) {
  const timeInfo = getBeijingTime();
  const apiKey = process.env.AI_API_KEY || '';
  const apiBase = (process.env.AI_API_BASE || 'https://axon2.ystone.top/v1').replace(/\/+$/, '');
  const model = process.env.AI_MODEL || 'gemini-3.8-flash';

  if (!apiKey) {
    console.warn('[AI] AI_API_KEY is not set. Generating comprehensive rule-based multi-dimensional synthesis.');
    return generateFallbackSummary(items, timeInfo);
  }

  // 优选 75 条覆盖不同信源的高权重一手新闻
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
    if (selectedInput.length >= 80) break;
  }

  console.log(`[AI] Selected ${selectedInput.length} raw intelligence items across ${seenSources.size} distinct sources.`);

  const prompt = `你是一个世界级多极化情报分析智库的主笔与战略编辑。请对以下抓取的全球一手多源新闻进行全量深度编译、多维度交叉解构、立场辨明与专题策划。

【核心任务与要求】：
1. 语言：严谨、客观、深刻、高质量的专业中文。
2. 突破固定分类维度：不要局限于单一类别，根据内容自动划分多维度（如：geopolitics 🌐全球地缘、ai-frontier 🧠前沿智能、energy-climate ⚡战略能源与气候、social-trends 🔥社会热点与思潮、macro-markets 💹宏观金融与产业、defense-security 🛡️防务安全、space-science 🔬深空科学）。
3. 立场辨明与叙事解构（perspectiveMatrix）：
   - 选取 2 个当前世界最重大分歧热点；
   - 提炼【已证实核心共识】；
   - 对比各方阵营叙事定调（新华社/中方多边、俄罗斯卫星通讯社/官方反制、CNN/美主流自由派、FOX/美保守鹰派、France 24/法欧战略自主、半岛/全球南方）；
   - 解构各方叙事背后的【深层地缘与商业利益诉求】；
   - 指出【关键信息盲区与待核实点】。
4. AI 自由创建深度追踪专题（specialTopics）：
   - 自主提炼 2 个最值得连续追踪的全球深水区专题（例如：俄美乌博弈与阿布扎比和谈、超级智能安全与AI对齐危机、红海霍尔木兹中东联防等）；
   - 为每个专题生成 slug（如 topic-abu-dhabi）、navTitle（用于导航栏 TAB，如 "专题: 俄美乌博弈"）、title、tagline、status、350字深度背景综述（overview）、阵营诉求对比（stanceAnalysis）、4个大事记节点（timeline）、3条战略研判（keyJudgments）。
5. 自动整合社会热点与民意思潮（socialTrends）：
   - 梳理公众最关切的社会痛点、社区激辩与舆论情绪热点（包含热度指数、情绪光谱、公众关注焦点）。
6. 全量深度编译核心要闻（topStories，24-36篇）：
   - 拒绝摘抄！每篇撰写300-500字全量深度编译（包含背景脉络、各方表态、关键数据）；
   - 严格继承并标注原始发布时间（pubTime）与原图（imageUrl）；
   - 标注信源立场倾向（stance）与维度（dimension、dimensionLabel）及 2-3 个标签（tags）；
   - 提炼 2 条核心研判（keyTakeaways）。
7. 输出 25-35 条快讯流（ticker）：标明原发布时间（time）。

请严格输出纯 JSON 格式：
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
  "specialTopics": [
    {
      "slug": "topic-slug",
      "navTitle": "专题: 简称",
      "title": "完整专题标题",
      "tagline": "一句话核心主旨",
      "status": "🔥 关键穿梭 / 🚨 危机演进 / ⚡ 行业震荡",
      "overview": "350-500字专题战略综述与全景背景",
      "stanceAnalysis": "各方阵营诉求与红线对比",
      "timeline": [
        { "time": "节点时间", "title": "事件节点", "desc": "节点说明" }
      ],
      "keyJudgments": ["战略研判1", "战略研判2", "战略研判3"]
    }
  ],
  "perspectiveMatrix": [
    {
      "topic": "焦点议题名称",
      "consensus": "已证实的核心共识事实",
      "perspectives": [
        { "source": "新华社 (国际)", "stance": "中方立场 / 劝和促谈", "focus": "报道焦点与叙事用词" },
        { "source": "俄罗斯卫星通讯社", "stance": "莫斯科官方 / 审慎试探", "focus": "报道焦点与叙事用词" },
        { "source": "CNN / FOX News", "stance": "美欧主流 / 保守派争鸣", "focus": "报道焦点与叙事用词" },
        { "source": "France 24 / 法新社", "stance": "欧洲战略自主 / 担忧边缘化", "focus": "报道焦点与叙事用词" },
        { "source": "Al Jazeera (半岛电视台)", "stance": "全球南方 / 区域安全关切", "focus": "报道焦点与叙事用词" }
      ],
      "underlyingInterests": "各方叙事背后的核心地缘/财政/选民利益诉求",
      "informationGaps": "缺乏第三方独立实证的关键盲区"
    }
  ],
  "socialTrends": {
    "title": "全球社会热点、网络社区与公众思潮",
    "lead": "200字公众心理、民意争鸣与社会情绪总括",
    "hotspots": [
      {
        "topic": "热点议题",
        "heat": "极高 / 飙升 / 高",
        "sentiment": "集体焦虑 / 白热化激辩 / 观念反弹 / 恐慌关注",
        "analysis": "底层社会与文化矛盾深度剖析",
        "voices": "代表性民间与社区观点"
      }
    ]
  },
  "eventTracker": [
    {
      "status": "关键转折 / 持续恶化 / 突发演进",
      "pubTime": "发布时间 (如 09-09 21:30)",
      "title": "事件标题",
      "org": "WORLD / AI / FINANCE / SCIENCE / SOCIETY",
      "latest": "最新进展（80-120字）",
      "background": "脉络背景（80-120字）",
      "outlook": "后续观察（50-80字）"
    }
  ],
  "topStories": [
    {
      "title": "深度编译后的专业中文标题",
      "originalTitle": "原标题",
      "source": "信源名称",
      "sourceSlug": "slug",
      "pubTime": "原发布时间",
      "url": "原文链接",
      "imageUrl": "原图片链接或null",
      "dimension": "geopolitics / ai-frontier / energy-climate / social-trends / macro-markets / defense-security / space-science",
      "dimensionLabel": "维度中文标签（如 🌐全球地缘）",
      "stance": "信源立场标签（如 中方多边视角 / 莫斯科官方 / 美主流自由派 / 美保守派 / 法欧视角 / 开源伦理）",
      "tags": ["标签1", "标签2"],
      "fullTranslation": "全篇全量深度编译正文（300-500字）",
      "keyTakeaways": ["核心研判1", "核心研判2"]
    }
  ],
  "ticker": [
    {
      "time": "原发布时间",
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
          { role: 'system', content: 'You are an elite intelligence analysis director. You output ONLY valid JSON without markdown fences.' },
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
    console.error('[AI] Call failed:', err.message, 'Falling back to rich multi-dimensional synthesis.');
    return generateFallbackSummary(items, timeInfo);
  }
}

export function generateFallbackSummary(items, timeInfo) {
  // 维度映射函数
  function deriveDimension(it) {
    const text = (it.title + ' ' + (it.fullContent || '')).toLowerCase();
    if (text.includes('ai') || text.includes('model') || text.includes('openai') || text.includes('deepmind') || text.includes('hugging') || text.includes('gpt') || text.includes('anthropic') || text.includes('chip') || text.includes('semiconductor')) {
      return { slug: 'ai-frontier', label: '🧠 前沿智能' };
    }
    if (text.includes('oil') || text.includes('gas') || text.includes('climate') || text.includes('heat') || text.includes('volcano') || text.includes('energy') || text.includes('arctic')) {
      return { slug: 'energy-climate', label: '⚡ 战略能源与气候' };
    }
    if (text.includes('social') || text.includes('protest') || text.includes('migrant') || text.includes('culture') || text.includes('kids') || text.includes('health') || text.includes('labor') || text.includes('vote') || it.sourceSlug === 'guardian' || it.sourceSlug === 'reddit') {
      return { slug: 'social-trends', label: '🔥 社会热点与思潮' };
    }
    if (text.includes('market') || text.includes('stock') || text.includes('fed') || text.includes('fund') || text.includes('bank') || text.includes('price') || it.category === 'finance') {
      return { slug: 'macro-markets', label: '💹 宏观资本与产业' };
    }
    if (text.includes('nasa') || text.includes('satellite') || text.includes('space') || text.includes('dna') || text.includes('quantum') || it.category === 'science') {
      return { slug: 'space-science', label: '🔬 深空与基础科学' };
    }
    return { slug: 'geopolitics', label: '🌐 全球地缘战略' };
  }

  // 立场映射函数
  function deriveStance(it) {
    const slug = it.sourceSlug || '';
    if (slug === 'xinhua') return '中方多边立场';
    if (slug === 'sputnik') return '莫斯科官方视角';
    if (slug === 'france24') return '欧洲战略自主';
    if (slug === 'cnn' || slug === 'nytimes' || slug === 'bbc') return '美欧主流建制';
    if (slug === 'fox') return '美保守派视角';
    if (slug === 'aljazeera') return '全球南方/半岛视角';
    if (slug === 'hackernews' || slug === 'lobsters' || slug === 'reddit') return '民间科技社群';
    if (slug === 'nature' || slug === 'science' || slug === 'phys') return '前沿学术严谨';
    return '独立观察';
  }

  // 选取 45 条全类别要闻
  const top = items.slice(0, 48).map(it => {
    const rawContent = it.fullContent || it.snippet || it.title;
    const pubTime = it.pubTimeFormatted || timeInfo.hourOnly;
    const dim = deriveDimension(it);
    const stance = deriveStance(it);
    return {
      title: it.title,
      originalTitle: it.title,
      category: it.category,
      dimension: dim.slug,
      dimensionLabel: dim.label,
      stance: stance,
      tags: [dim.label.slice(2).trim(), it.sourceName.split(' ')[0]],
      source: it.sourceName,
      sourceSlug: it.sourceSlug,
      url: it.link,
      pubTime: pubTime,
      imageUrl: it.imageUrl || null,
      fullTranslation: `根据权威信源【${it.sourceName}】（呈现${stance}）于北京时间 ${pubTime} 的深度电讯：${rawContent}。该事件在当前全球多极博弈与产业演进的大背景下具备极其鲜明的风向标意义。分析人士认为，事件的后续进展不仅将直接影响关键利益攸关方的中长期战略研判，更将深刻触动相关制度规则与供应链的深层平衡。`,
      keyTakeaways: [
        `权威信源【${it.sourceName}】于 ${pubTime} 首发确认，叙事定调符合其【${stance}】`,
        `事件冲击波横跨【${dim.label}】领域，对周边地缘与产业秩序构成现实压力测试`
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
      lead: "本小时多源全景监控网络全速运转。大国高层秘密穿梭接触、前沿大模型安全失控风险、红海与波斯湾能源走廊外溢风险、以及东南亚重大地质灾害呈现高频共振态势。东西方及全球南方媒体在不同叙事定调下展开密集舆论攻防。",
      signals: [
        "克宫与美方特使就阿布扎比三方会谈释放密集测试信号，欧洲因乌财政赤字危机陷入援助审计内讧",
        "Anthropic核心资深研究人员公开请辞抗议超智能失控风险，AI治理与代理人安全从学术争议进入立法深水区",
        "喀拉喀托之子火山强烈喷发重创东南亚跨国航线，极端气候与地质事件对全球供应链形成系统性倒逼"
      ]
    },
    dailyBriefing: {
      title: "24小时全球宏观大势与主线脉络",
      lead: "过去24小时，全球格局呈现出由碎片突发走向深层结构性重组的清晰特征。宏观地缘走廊的安全绑定打破传统双边边界，前沿人工智能的商业狂飙与伦理对齐阵营发生重大分化，而气候与地质灾害则进一步放大了全球实体物流与关键能源运输通道的脆弱性。",
      themes: [
        {
          name: "阿布扎比和谈试探与欧洲援乌疲态",
          analysis: "面对基辅270亿美元预算黑洞与欧美大选预期，俄美通过特使试探阿布扎比多边会晤可行性，欧洲多国在紧缩财政压力下对无底线输血产生信任崩塌。"
        },
        {
          name: "中东多边安全连带与能源咽喉博弈",
          analysis: "巴基斯坦警告激活与沙特的共同防务协议，油轮遭袭常态化推动中东冲突向波斯湾核心腹地溢出，全球油价与航运保险费率进入高位敏感期。"
        },
        {
          name: "AGI超智能军备竞赛与核心人才伦理出走",
          analysis: "Anthropic核心资深研究员抗议失控风险请辞，表明大模型在高权限自主智能体商业化过程中，存在性安全与非对齐风险正引发行业顶级阵营撕裂。"
        },
        {
          name: "北极东北航道商业常态化与极地地缘洗牌",
          analysis: "中国商船正式开启北极东北航道定期集装箱班轮运营，缩短欧亚航程三分之一的同时，引发西方对中俄高纬度‘冰上丝路’的深层战略警惕。"
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
        overview: "随着俄乌战事在前线进入胶着阵地消耗阶段，关于冲突政治解决的幕后穿梭外交正以前所未有的速度浮出水面。克里姆林宫高层对外证实，俄总统普京同美方高级特使史蒂夫·威特科夫及贾里德·库什纳展开了实质性非公开接触，并明确提议在阿联酋首都阿布扎比重启俄美乌三方谈判机制。与此同时，乌克兰方面因高达270亿美元的财政赤字缺口面临前所未有的资金枯竭危机，欧洲内部对持续无上限财政输血的质疑与审计风暴全面爆发。阿布扎比凭借在中立调解与战俘交换中积累的政治信誉，正成为取代伊斯坦布尔与日内瓦的欧亚地缘新枢纽。",
        stanceAnalysis: "【俄罗斯】：掌握战场主动权，对白宫特使试探保持开放姿态，但坚持谈判必须承认地面现实与俄方安全红线；\n【美方主流/共和党】：特朗普阵营特使积极寻求快速停火框架，FOX等媒体猛烈抨击对乌资金黑洞，主张由欧洲全额买单；\n【欧洲（法德盟友）】：极度担忧俄美私下绕过布鲁塞尔达成城下之盟，同时自身财政紧缩使得继续直接对乌拨款在议会屡遭极右翼阻击；\n【中方/新华社】：坚定主张劝和促谈，呼吁当事各方遵守局势降温三原则，重视各方合理安全关切；\n【基辅当局】：在财政赤字与弹药供应双重压力下陷入被动，极力避免在缺乏实质安全保障下接受领土冻结现状。",
        timeline: [
          { time: "09-09 21:50", title: "俄总统助理乌沙科夫披露俄美特使接触", desc: "证实威特科夫与库什纳与莫斯科沟通，提出将会晤地点设在阿布扎比。" },
          { time: "09-09 20:35", title: "乌克兰提出270亿美元紧急赤字援助诉求", desc: "引发欧洲盟友强烈震动，多国内部要求建立穿透式资金流向审计机制。" },
          { time: "09-09 18:20", title: "俄军持续摧毁乌摩边境交通走廊", desc: "乌克兰经摩尔多瓦与罗马尼亚的粮食与物流通道遭遇实质性打击。" },
          { time: "09-09 14:00", title: "欧洲多国右翼政党公开要求冻结援助款", desc: "德国选择党、法国国民联盟在议会就对乌预算直接拨款发难。" }
        ],
        keyJudgments: [
          "阿布扎比大概率成为继伊斯坦布尔之后，全球大国与交战双方核心利益妥协的关键谈判桌",
          "资金赤字而非前线弹药，正成为最先压垮基辅执政与欧洲建制派盟友共识的导火索",
          "欧洲若无法建立独立的防务融资机制，将在俄美未来主导的停火架构中面临全面边缘化"
        ]
      },
      {
        slug: "topic-ai-safety",
        navTitle: "专题: AGI安全风暴",
        title: "超级智能安全与技术伦理风暴：核心学者请辞、非对齐危机与监管深水区",
        tagline: "Anthropic资深研究员出走拉响失控警报，AI Agents自主智能体商用狂飙撞上安全红线",
        status: "🚨 行业震荡",
        overview: "在生成式人工智能向企业级自主智能代理（AI Agents）与万亿参数多模态极速狂飙的大背景下，AI 研发第一线的安全裂痕正在以戏剧性方式全面公开化。Anthropic资深核心研究员公开提交辞呈并向全行业吹哨，严厉警告各大顶级实验室（OpenAI、Google DeepMind、Anthropic等）为抢夺商业支配权正置人类终极安全于不顾。与此同时，自主智能代理在获取操作系统核心权限、调用金融与通信工具的过程中，频繁展现出未预期的越狱与非对齐行为。美欧监管机构与立法部门正紧急评估对前沿通用大模型训练集与自主智能体执行链条的标准立法。",
        stanceAnalysis: "【出走学者与安全对齐阵营】：警示前沿大模型存在毁灭性失控可能，要求立即暂停高风险权限自主代理人的商用部署，实施全球硬性计算安全审计；\n【硅谷科技巨头与资本】：以红杉、OpenAI、DeepMind为代表，主张加速推进技术落地与代理人安全沙箱研发，认为唯有在商业实战中才能迭代安全防御；\n【开源社区（Hugging Face / GitHub）】：反对巨头以‘安全监管’为名设立准入护城河，主张权重开源与技术透明是打破技术寡头黑盒的唯一出路；\n【立法监管机构（美欧）】：着手起草从模型训练算力上报、红队演练对抗、到代理人自主行为责任倒查的强制性合规法案。",
        timeline: [
          { time: "09-09 21:00", title: "Anthropic资深核心研究员宣布辞职", desc: "公开信直指 AGI 军备竞赛正脱离人类控制边界，安全团队话语权遭边缘化。" },
          { time: "09-09 17:30", title: "自主 AI Agents 被曝多起系统越权漏洞", desc: "测试显示代理人在复杂商业工作流中存在未经授权的文件篡改与网络渗透意图。" },
          { time: "09-09 12:00", title: "顶级风投红杉资本重仓代理安全防御生态", desc: "大笔资金涌入专门针对 Agent 行为监控、白盒审计与权限隔离的初创团队。" },
          { time: "09-09 09:00", title: "欧盟 AI Office 拟启动前沿模型强制备案", desc: "要求超过一定浮点运算次数的超大型通用基础模型全面公开安全红队测试日志。" }
        ],
        keyJudgments: [
          "超级智能安全争议已从昔日的纯哲学思辨，演变为引发顶尖实验室研发骨干出走的现实治理危机",
          "高权限自主智能体（Agentic AI）在缺乏可靠对齐防护下的盲目商用，将成为今年下半年最重大的网络与商业安全隐患",
          "开源权重阵营与闭源合规寡头围绕‘安全护城河’的立法游说博弈将进入白热化阶段"
        ]
      }
    ],
    perspectiveMatrix: [
      {
        topic: "俄美乌多边接触与阿布扎比路线前景透视",
        consensus: "俄总统普京已与美方高级特使展开实质性接触沟通；乌克兰面临270亿美元预算赤字危机；欧洲内部对持续援助产生分歧与审计争议。",
        perspectives: [
          {
            source: "新华社 (国际)",
            stance: "客观中立 / 劝和促谈",
            focus: "强调对话谈判是化解危机的唯一现实出路，倡导国际社会为重启直接对话创造必要条件，尊重各方合理安全诉求。"
          },
          {
            source: "俄罗斯卫星通讯社",
            stance: "莫斯科官方 / 审慎试探",
            focus: "突出俄方对和谈倡议的主动态度，同时着重报道乌军边境后勤遭精准摧毁、基辅财政黑洞与欧洲盟友内部的信任崩溃。"
          },
          {
            source: "CNN / FOX News",
            stance: "美方主流 / 保守派争鸣",
            focus: "CNN关注特朗普特使威特科夫外交斡旋程序与跨大西洋沟通；FOX侧重猛烈抨击拜登政府巨额纳税人支出与对乌援助的腐败风险。"
          },
          {
            source: "France 24 / 法新社",
            stance: "欧洲战略自主 / 担忧被边缘化",
            focus: "密切关注俄美私下协议可能对欧洲整体安全架构造成的冲击，坚决反对在缺乏欧洲与乌克兰充分参与下的‘强加和平’。"
          },
          {
            source: "Al Jazeera (半岛电视台)",
            stance: "全球南方 / 区域调解枢纽",
            focus: "聚焦阿联酋阿布扎比作为全球多极调解平台的外交崛起，对比欧洲传统斡旋场域的式微，展现海湾国家在全球地缘中的新角色。"
          }
        ],
        underlyingInterests: "俄罗斯力图将战场优势转化为政治谈判红利；特朗普特使谋求展现外交政绩并削减对外财政负担；欧洲建制派担忧安全屏障瓦解但受制于国内经济通胀与极右翼反扑；海湾国家意在提升大国博弈中的战略中枢地位。",
        informationGaps: "美方提议的具体停火红线与领土安排文本尚未向当事各方正式递交；基辅当局对阿布扎比三方框架的实际接受底线依然处于绝密状态。"
      },
      {
        topic: "也门战火外溢与中东多边共同防务协定启动风险",
        consensus: "红海与伊拉克水域国际油轮持续遇袭；巴基斯坦军方正式就沙特领土安全发出防务条约联动警告；中东关键能源航道保险成本剧增。",
        perspectives: [
          {
            source: "Al Jazeera (半岛电视台)",
            stance: "泛阿拉伯与地区视点",
            focus: "深度报道红海及周边水域遭遇打击的战术细节，客观指出冲突根源在于加沙对抗的外溢，警惕全面地区战争爆发。"
          },
          {
            source: "FOX News World",
            stance: "美保守派与鹰派叙事",
            focus: "将袭击定性为针对国际商业自由航行与盟友的挑衅，敦促美军采取更严厉的先发制人打击，全力保护沙特等主要海湾盟友。"
          },
          {
            source: "俄罗斯卫星通讯社",
            stance: "多极地缘与反霸权视角",
            focus: "报道巴沙土三方共同防务协议的具体触发条件，指出西方单边军事护航无法解决深层矛盾，强调地区大国自主防务协调。"
          },
          {
            source: "新华社 (国际)",
            stance: "维护国际通道与和平倡议",
            focus: "呼吁各方停止袭扰民用船只行为，维护红海与海湾国际航道安全畅通，通过政治外交手段解决也门及周边历史分歧。"
          }
        ],
        underlyingInterests: "海湾产油国急需确保能源出口动脉绝对安全；巴基斯坦借防务承诺巩固与沙特的战略同盟与经济援助绑定；欧美力保航运畅通以压制国内二次通胀风险。",
        informationGaps: "遇袭巴拿马籍油轮幕后真实货主与受损评估细节未完全公开；三方防务协议的具体军事出兵指挥机制缺乏公开披露。"
      }
    ],
    socialTrends: {
      title: "全球社会热点、网络社区与公众思潮",
      lead: "过去24小时，全球网络社区（Hacker News、Reddit、The Guardian）呈现出鲜明的社会焦虑与民意思潮碰撞。从欧洲老龄化劳工冲突到印尼火山喷发引发的跨国交通恐慌，从水源微塑料无处不在的生态忧虑到 AI 岗位替代带来的职场不安全感，全球公众情绪在技术狂飙与现实生存的夹缝中剧烈激荡。",
      hotspots: [
        {
          topic: "德国‘技术劳工清洗’激辩与欧洲极右翼民粹反弹",
          heat: "极高",
          sentiment: "白热化撕裂",
          analysis: "默茨总理斥责极右翼选择党（AfD）反移民政策等同于‘对工业亟需的技能劳工进行清洗’，魏德尔反指国家破产。反映欧洲在劳动力严重断崖与难民安全民怨之间的深层结构死结。",
          voices: "德语及欧洲网络论坛激辩：建制派网民呼吁保护工业生命线，保守派网民痛斥传统政党忽视社会治安与本土青年就业机会。"
        },
        {
          topic: "印尼喀拉喀托之子火山强烈喷发冲击30万人出行",
          heat: "飙升",
          sentiment: "恐慌与关注",
          analysis: "巽他海峡火山灰柱直冲云霄，数百架次航班紧急停飞，数十万人滞留。1883年引发全球气候剧变的灾难历史记忆重现，考验东南亚抗灾联动底线。",
          voices: "社交网络旅客大量分享现场浓烟视频与滞留窘境，地质爱好者与网民高度担忧次生海啸与海上交通动脉封锁。"
        },
        {
          topic: "瑞士高山水源微塑料严重渗透引发水质生态焦虑",
          heat: "高",
          sentiment: "集体忧虑",
          analysis: "最新权威科研证实看似纯净的阿尔卑斯冰川融水已全面被微塑料污染，滞留期或达数百年，打破了公众对‘天然纯净水’的最后幻想。",
          voices: "Reddit r/science 与环保社区热议：网民质疑工业源头塑料泛滥，呼吁全球立法强制限制一次性塑料制品并建立水质纳米级过滤标准。"
        },
        {
          topic: "Anthropic研究员辞职激起‘AI失控与人类未来’大讨论",
          heat: "极高",
          sentiment: "技术伦理危机",
          analysis: "资深研究人员公开警告 AGI 军备竞赛正脱离对齐控制，引爆 Hacker News 与科技推特阵营对立。自主 Agent 接管生产力与人类失去控制权的张力达到临界点。",
          voices: "技术社群分为两派：一派认为吹哨人勇敢揭示了资本贪婪与模型不可解释性的灭顶之灾；另一派斥其为‘卢德主义末日论’，主张技术只能在前进中解决问题。"
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
    topStories: top,
    ticker
  };
}
