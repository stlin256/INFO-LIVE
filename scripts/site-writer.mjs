/**
 * InfoLive 页面渲染、多维度编译、动态专题生成与全景内容写入引擎
 */
import fs from 'node:fs';
import path from 'node:path';
import { getBeijingTime } from './fetcher.mjs';
import { SOURCES } from './sources.mjs';

export function resolveSourceSlug(sourceName, sourceSlug) {
  const s = (sourceSlug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const n = (sourceName || '').toLowerCase();
  if (s.includes('xinhua') || n.includes('新华')) return 'xinhua';
  if (s.includes('sputnik') || n.includes('卫星通讯社')) return 'sputnik';
  if (s.includes('france24') || n.includes('france 24') || s.includes('afp') || n.includes('法新社')) return 'france24';
  if (s.includes('cnn') || n.includes('cnn')) return 'cnn';
  if (s.includes('fox') || n.includes('fox')) return 'fox';
  if (s.includes('guardian') || n.includes('guardian') || n.includes('卫报')) return 'guardian';
  if (s.includes('aljazeera') || n.includes('jazeera') || n.includes('半岛')) return 'aljazeera';
  if (s.includes('theverge') || n.includes('verge')) return 'theverge';
  if (s.includes('techcrunch') || n.includes('crunch')) return 'techcrunch';
  if (s.includes('hackernews') || n.includes('hacker')) return 'hackernews';
  if (s.includes('deepmind')) return 'deepmind';
  if (s.includes('openai')) return 'openai';
  if (s.includes('huggingface') || n.includes('hugging')) return 'huggingface';
  if (s.includes('github')) return 'github';
  if (s.includes('mit')) return 'mit';
  if (s.includes('bbc')) return 'bbc';
  if (s.includes('reuters') || n.includes('路透')) return 'reuters';
  if (s.includes('ap') || n.includes('associated press') || n.includes('美联社')) return 'ap';
  if (s.includes('bloomberg') || n.includes('彭博')) return 'bloomberg';
  if (s.includes('nytimes') || n.includes('times') || n.includes('纽约时报')) return 'nytimes';
  if (s.includes('wsj') || n.includes('wall street') || n.includes('华尔街日报')) return 'wsj';
  if (s.includes('dw') || n.includes('welle') || n.includes('德国之声')) return 'dw';
  if (s.includes('zaobao') || n.includes('早报')) return 'zaobao';
  if (s.includes('caixin') || n.includes('财新')) return 'caixin';
  if (s.includes('nikkei') || n.includes('日经')) return 'nikkei';
  if (s.includes('cnbc')) return 'cnbc';
  if (s.includes('reddit')) return 'reddit';
  if (s.includes('lobsters')) return 'lobsters';
  if (s.includes('nature')) return 'nature';
  if (s.includes('science')) return 'science';
  if (s.includes('nasa')) return 'nasa';
  if (s.includes('arxiv')) return 'arxiv';
  return s || 'github';
}

export function renderSourceBadge(sourceName, sourceSlug) {
  const resolved = resolveSourceSlug(sourceName, sourceSlug);
  const iconPath = `/assets/sources/${resolved}.svg`;
  return `<span class="source-badge"><img src="${iconPath}" class="source-icon" alt="${sourceName}" width="16" height="16" /> <strong>${sourceName}</strong></span>`;
}

function renderArticleCard(s) {
  const lines = [];
  const safeTitle = (s.title || '').replace(/"/g, '&quot;').replace(/\$/g, '&#36;');
  const safeContent = (s.fullTranslation || s.snippet || '').replace(/\$/g, '&#36;');

  lines.push(':::cell');
  lines.push('<div class="news-card-header">');
  lines.push(`  <div class="news-card-meta-left">`);
  lines.push(`    ${renderSourceBadge(s.source, s.sourceSlug)}`);
  if (s.stance) {
    lines.push(`    <span class="stance-badge">${s.stance}</span>`);
  }
  if (s.dimensionLabel) {
    lines.push(`    <span class="dimension-pill">${s.dimensionLabel}</span>`);
  }
  lines.push(`  </div>`);
  lines.push(`  <span class="news-meta-time">🕒 ${s.pubTime || '实时'}</span>`);
  lines.push('</div>');
  lines.push('');
  lines.push(`### [${safeTitle}](${s.url})`);
  lines.push('');

  // 嵌入相关图片
  if (s.imageUrl) {
    lines.push(`<div class="article-cover"><img src="${s.imageUrl}" alt="${safeTitle}" loading="lazy" /></div>`);
    lines.push('');
  }

  // 全篇全量深度编译正文
  lines.push(safeContent);
  lines.push('');

  // 核心研判
  if (s.keyTakeaways && s.keyTakeaways.length > 0) {
    lines.push('<div class="news-card-takeaways">');
    lines.push('  <div class="takeaways-header">💡 核心研判</div>');
    lines.push('  <ul class="takeaways-list">');
    for (const kt of s.keyTakeaways) {
      lines.push(`    <li>${kt.replace(/\$/g, '&#36;')}</li>`);
    }
    lines.push('  </ul>');
    lines.push('</div>');
    lines.push('');
  }

  // 维度与标签
  if (s.tags && s.tags.length > 0) {
    lines.push('<div class="news-card-tags">');
    for (const tag of s.tags) {
      lines.push(`  <span class="news-tag-pill">#${tag}</span>`);
    }
    lines.push('</div>');
    lines.push('');
  }

  lines.push(`<div class="news-card-footer"><a href="${s.url}" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅出处原文 ↗</a></div>`);
  lines.push(':::');
  lines.push('');
  return lines.join('\n');
}

export async function writeSiteContent(summaryData, _rawItems) {
  const root = process.cwd();
  const timeInfo = getBeijingTime();
  const pagesDir = path.join(root, 'data', 'pages', 'zh');
  const historyDir = path.join(root, 'data', 'history');
  const dailyHistoryDir = path.join(historyDir, 'daily');
  fs.mkdirSync(pagesDir, { recursive: true });
  fs.mkdirSync(historyDir, { recursive: true });
  fs.mkdirSync(dailyHistoryDir, { recursive: true });

  const {
    hourlyBriefing = {},
    dailyBriefing = {},
    specialTopics = [],
    perspectiveMatrix = [],
    socialTrends = {},
    eventTracker = [],
    topStories = [],
    ticker = []
  } = summaryData;

  // 按维度灵活分类
  const aiStories = topStories.filter(s => s.dimension === 'ai-frontier' || s.category === 'ai');
  const worldStories = topStories.filter(s => s.dimension === 'geopolitics' || s.category === 'world');
  const financeStories = topStories.filter(s => s.dimension === 'macro-markets' || s.category === 'finance');
  const trendStories = topStories.filter(s => s.dimension === 'social-trends' || s.category === 'community');
  const scienceStories = topStories.filter(s => s.dimension === 'space-science' || s.dimension === 'energy-climate' || s.category === 'science');

  // -------------------------------------------------------------
  // 1. 历史数据持久化归档（永久追加）
  // -------------------------------------------------------------
  const archiveFilePath = path.join(historyDir, 'archive.json');
  let historyArchive = [];
  if (fs.existsSync(archiveFilePath)) {
    try {
      historyArchive = JSON.parse(fs.readFileSync(archiveFilePath, 'utf8'));
    } catch {
      historyArchive = [];
    }
  }

  const currentSnapshot = {
    timestamp: timeInfo.timestamp,
    displayTime: timeInfo.display,
    dateOnly: timeInfo.dateOnly,
    hourOnly: timeInfo.hourOnly,
    hourlyBriefing,
    dailyBriefing,
    specialTopicsCount: specialTopics.length,
    eventTracker,
    topStoriesCount: topStories.length,
    storiesSnapshot: topStories.slice(0, 12).map(s => ({
      title: s.title,
      source: s.source,
      pubTime: s.pubTime,
      url: s.url
    }))
  };

  historyArchive = [currentSnapshot, ...historyArchive.filter(h => h.displayTime !== timeInfo.display)];
  fs.writeFileSync(archiveFilePath, JSON.stringify(historyArchive, null, 2), 'utf8');

  const dailyFilePath = path.join(dailyHistoryDir, `${timeInfo.dateOnly}.json`);
  let dailyArchive = [];
  if (fs.existsSync(dailyFilePath)) {
    try {
      dailyArchive = JSON.parse(fs.readFileSync(dailyFilePath, 'utf8'));
    } catch {
      dailyArchive = [];
    }
  }
  dailyArchive = [currentSnapshot, ...dailyArchive.filter(h => h.hourOnly !== timeInfo.hourOnly)];
  fs.writeFileSync(dailyFilePath, JSON.stringify(dailyArchive, null, 2), 'utf8');

  // -------------------------------------------------------------
  // 2. 渲染 index.md (主页 / 全球情报矩阵)
  // -------------------------------------------------------------
  const indexLines = [
    '---',
    'title: "全球情报矩阵"',
    'nav: true',
    'order: 0',
    'description: "InfoLive 全球全源信息流与 AI 实时要闻矩阵"',
    'notice:',
    `  text: "⚡ 24/7 全球情报实时监控中 · 上次同步：${timeInfo.display} · 聚合 30+ 权威信源"`,
    '  color: "theme"',
    '---',
    '',
    ':::important',
    `### ⚡ 本小时全球情报速报（${timeInfo.hourOnly} 播报）`,
    '',
    hourlyBriefing.lead || '全球多源实时数据监控中。',
    '',
    '**🎯 关键动态信号：**'
  ];

  for (const sig of (hourlyBriefing.signals || [])) {
    indexLines.push(`- ${sig}`);
  }
  indexLines.push(':::');
  indexLines.push('');

  // 日尺度板块
  if (dailyBriefing && dailyBriefing.lead) {
    indexLines.push(':::note');
    indexLines.push(`### 🌐 24小时全球宏观大势与主线脉络（日尺度全景）`);
    indexLines.push('');
    indexLines.push(dailyBriefing.lead);
    indexLines.push('');
    if (dailyBriefing.themes && dailyBriefing.themes.length > 0) {
      indexLines.push('**📊 今日核心主线透视：**');
      for (const th of dailyBriefing.themes) {
        indexLines.push(`- **${th.name}**：${th.analysis}`);
      }
    }
    indexLines.push(':::');
    indexLines.push('');
  }

  // AI 自由创建的专题内容推荐专区 (AI Dynamic Topics Hub)
  if (specialTopics && specialTopics.length > 0) {
    indexLines.push('## 🔥 AI 深度追踪与独家专题专区');
    indexLines.push('');
    indexLines.push('由 AI 研判引擎根据全球事态持续演进自主立项、深度整合与全景复盘的独家专题（点击卡片或左侧导航 TAB 直达完整研判与大事记）：');
    indexLines.push('');
    indexLines.push('::::grid{cols=2}');
    for (const tp of specialTopics) {
      indexLines.push(':::cell');
      indexLines.push(`<div class="topic-header"><span class="topic-status-badge">${tp.status}</span> <span class="news-meta-time">🕒 更新：${timeInfo.hourOnly}</span></div>`);
      indexLines.push('');
      indexLines.push(`### [${tp.title}](/${tp.slug})`);
      indexLines.push('');
      indexLines.push(`> **主旨**：${tp.tagline}`);
      indexLines.push('');
      indexLines.push((tp.overview || '').slice(0, 180) + '……');
      indexLines.push('');
      indexLines.push(`<div class="topic-card-footer"><a href="/${tp.slug}" class="editorial-button accent"><span>查阅完整专题报告与大事记 ➔</span></a></div>`);
      indexLines.push(':::');
    }
    indexLines.push('::::');
    indexLines.push('');
  }

  // 立场辨明与叙事解构板块 (Stance Clarification & Narrative Spectrum)
  if (perspectiveMatrix && perspectiveMatrix.length > 0) {
    indexLines.push('## 🌐 全球立场罗生门：重大热点立场辨明与叙事解构');
    indexLines.push('');
    indexLines.push('针对世界重大分歧热点，解构不同阵营的叙事定调、报道选词、深层地缘利益与信息盲区：');
    indexLines.push('');
    for (const pm of perspectiveMatrix) {
      indexLines.push(`### 🎯 焦点对决：${pm.topic}`);
      indexLines.push('');
      if (pm.consensus) {
        indexLines.push(`> ✅ **【已证实核心共识】**：${pm.consensus}`);
        indexLines.push('');
      }
      indexLines.push('| 观察信源 | 阵营定调 | 报道焦点与叙事选词 |');
      indexLines.push('| :--- | :--- | :--- |');
      for (const p of pm.perspectives) {
        indexLines.push(`| **${p.source}** | \`${p.stance}\` | ${p.focus} |`);
      }
      indexLines.push('');
      if (pm.underlyingInterests) {
        indexLines.push(`**💡 深层利益解构**：${pm.underlyingInterests}`);
        indexLines.push('');
      }
      if (pm.informationGaps) {
        indexLines.push(`**🔍 关键信息盲区**：${pm.informationGaps}`);
        indexLines.push('');
      }
    }
  }

  // 重大事件追踪 (Timeline)
  indexLines.push('## 📡 全球重大事件演进追踪');
  indexLines.push('');
  indexLines.push('::::timeline{title="重大事件动态脉络"}');
  for (const ev of eventTracker) {
    const startStr = `${ev.status || '进行中'} ${ev.pubTime || ''}`.trim();
    indexLines.push(`:::timeline-item{start="${startStr}" title="${ev.title}" org="${ev.org || 'INTEL'}"}`);
    indexLines.push(`**最新进展：** ${ev.latest || ''}`);
    indexLines.push('');
    indexLines.push(`**脉络背景：** ${ev.background || ''}`);
    indexLines.push('');
    indexLines.push(`**后续观察：** ${ev.outlook || ''}`);
    indexLines.push(':::');
  }
  indexLines.push('::::');
  indexLines.push('');

  // 快讯流 (Ticker)
  indexLines.push('## ⏱️ 本小时全球要闻快讯流');
  indexLines.push('');
  for (const t of ticker.slice(0, 24)) {
    indexLines.push(`- <span class="ticker-time">[${t.time}]</span> **${t.source}**：[${t.text}](${t.url})`);
  }
  indexLines.push('');

  // 核心要闻全景深度编译卡片
  indexLines.push('## 📰 核心要闻全景深度编译（图文全量解析）');
  indexLines.push('');
  indexLines.push('::::grid{cols=2}');
  for (const s of topStories.slice(0, 14)) {
    indexLines.push(renderArticleCard(s));
  }
  indexLines.push('::::');
  indexLines.push('');

  indexLines.push(':::tip');
  indexLines.push('**关于本页面**：本页面由 **InfoLive 引擎** 每小时全自动调度，从各大国际主流通讯社、全球AI顶级社区、学术预印本与财经网络爬取一手数据，经由 AI 进行多源交叉验证、内化中文撰写与事件脉络追踪，所有核心文章均为全篇深度编译并嵌入原图，非简单链接聚合。');
  indexLines.push(':::');

  fs.writeFileSync(path.join(pagesDir, 'index.md'), indexLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 3. AI 自由创建并编写的动态专题内容页面（独立 TAB，order: 5, 6...）
  // -------------------------------------------------------------
  specialTopics.forEach((tp, idx) => {
    const topicLines = [
      '---',
      `title: "${tp.navTitle || '专题: ' + tp.title}"`,
      'nav: true',
      `order: ${5 + idx}`,
      `description: "${tp.tagline}"`,
      'notice:',
      `  text: "${tp.status} · AI 深度追踪专题 · 持续汇聚多方一手电讯与立场解构"`,
      '  color: "theme"',
      '---',
      '',
      `# ${tp.title}`,
      '',
      `> 📌 **主旨摘要**：${tp.tagline}`,
      '',
      '## 📖 专题全景背景与深度综述',
      '',
      tp.overview || '',
      '',
      '## ⚖️ 阵营诉求、红线与立场罗生门',
      '',
      tp.stanceAnalysis || '',
      '',
      '## 📡 专题重大演进大事记',
      '',
      '::::timeline{title="事件演进时间轴"}'
    ];

    for (const tl of (tp.timeline || [])) {
      topicLines.push(`:::timeline-item{start="${tl.time}" title="${tl.title}" org="DOSSIER"}`);
      topicLines.push(tl.desc || '');
      topicLines.push(':::');
    }
    topicLines.push('::::');
    topicLines.push('');

    topicLines.push('## 🎯 战略研判与后续关键观察窗口');
    topicLines.push('');
    for (const kj of (tp.keyJudgments || [])) {
      topicLines.push(`- 💡 **${kj}**`);
    }
    topicLines.push('');

    // 挑选与本专题相关的要闻
    const related = topStories.filter(s => {
      const txt = (s.title + ' ' + (s.fullTranslation || '')).toLowerCase();
      const slugKey = tp.slug.replace('topic-', '');
      return txt.includes(slugKey) || (tp.slug.includes('abu-dhabi') && (txt.includes('俄') || txt.includes('乌') || txt.includes('阿布扎比') || txt.includes('赤字') || txt.includes('普京'))) || (tp.slug.includes('ai-safety') && (txt.includes('ai') || txt.includes('anthropic') || txt.includes('智能') || txt.includes('模型') || txt.includes('研究员')));
    }).slice(0, 10);

    if (related.length > 0) {
      topicLines.push('## 📰 专题关联核心情报（图文全量编译）');
      topicLines.push('');
      topicLines.push('::::grid{cols=2}');
      for (const s of related) {
        topicLines.push(renderArticleCard(s));
      }
      topicLines.push('::::');
      topicLines.push('');
    }

    fs.writeFileSync(path.join(pagesDir, `${tp.slug}.md`), topicLines.join('\n'), 'utf8');
    console.log(`[SiteWriter] Generated AI Special Topic page: ${tp.slug}.md (order: ${5 + idx})`);
  });

  // -------------------------------------------------------------
  // 4. 自动整合社会热点等内容 (trends.md，order: 4)
  // -------------------------------------------------------------
  const trendsLines = [
    '---',
    'title: "社会热点与思潮"',
    'nav: true',
    'order: 4',
    'description: "全球公众关切、网络社群热议与社会情绪热点深度透视"',
    'notice:',
    '  text: "🔥 实时追踪全球公众舆论、社区激辩与社会情绪光谱" ',
    '  color: "theme"',
    '---',
    '',
    '# 🔥 全球社会热点、公众关切与网络思潮',
    '',
    ':::important',
    '### 🌐 全球公众心理与社群情绪综述',
    '',
    socialTrends.lead || '过去24小时全球网络社群呈现出多样化的社会关切与情绪激荡。',
    ':::',
    '',
    '## 📊 全球公众情绪与社会热度雷达',
    '',
    '| 议题事件 | 关注热度 | 情绪光谱 | 底层社会与文化矛盾解构 |',
    '| :--- | :---: | :---: | :--- |'
  ];

  for (const hs of (socialTrends.hotspots || [])) {
    trendsLines.push(`| **${hs.topic}** | \`${hs.heat}\` | \`${hs.sentiment}\` | ${hs.analysis} |`);
  }
  trendsLines.push('');

  trendsLines.push('## 💬 思想社区与网民观点争鸣');
  trendsLines.push('');
  for (const hs of (socialTrends.hotspots || [])) {
    trendsLines.push(`### 🗣️ ${hs.topic}`);
    trendsLines.push(`> **舆论争鸣聚焦**：${hs.voices}`);
    trendsLines.push('');
  }

  trendsLines.push('## 📰 社会民生、思潮与社群核心要闻');
  trendsLines.push('');
  trendsLines.push('::::grid{cols=2}');
  const trendsSelected = (trendStories.length > 0 ? trendStories : topStories.filter(s => s.dimension === 'social-trends' || s.category === 'community')).slice(0, 16);
  for (const s of (trendsSelected.length > 0 ? trendsSelected : topStories.slice(14, 28))) {
    trendsLines.push(renderArticleCard(s));
  }
  trendsLines.push('::::');
  fs.writeFileSync(path.join(pagesDir, 'trends.md'), trendsLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 5. 渲染 ai.md (AI与前沿科技，order: 1)
  // -------------------------------------------------------------
  const aiLines = [
    '---',
    'title: "AI与前沿科技"',
    'nav: true',
    'order: 1',
    'description: "全球人工智能、大模型计算、开源生态与顶会论文一手深度情报"',
    'notice:',
    '  text: "🚀 聚焦前沿大模型范式、智能体架构、计算硬件与开源顶会论文 · 实时深度编译" ',
    '  color: "theme"',
    '---',
    '',
    '# 🧠 人工智能与前沿计算全景深度情报',
    '',
    '汇聚 OpenAI、Google DeepMind、Hugging Face、Hacker News、MIT Tech Review 等源头，提供全量中文深度编译与图片图解。',
    '',
    '## 🤖 前沿大模型与具身智能演进雷达',
    '',
    '| 维度领域 | 核心动态指引 | 核心监控源 |',
    '| :--- | :--- | :--- |',
    '| **前沿基座模型** | 多模态推理、思维链范式演进与端侧蒸馏 | OpenAI, DeepMind, Anthropic |',
    '| **开源生态与权重** | 开源大模型社区与可商用权重发布 | Hugging Face, GitHub, Hacker News |',
    '| **自主智能体 (Agents)** | 企业级工作流编排、高权限执行与安全对齐 | MIT Tech Review, TechCrunch |',
    '| **AI 算力与硬件** | 数据中心 GPU、NPU 算力与太空制造芯片试验 | The Verge, WSJ, CNBC |',
    '',
    '## 📰 科技核心要闻全景深度编译',
    '',
    '::::grid{cols=2}'
  ];
  const aiCombined = aiStories.concat(scienceStories).slice(0, 20);
  for (const s of (aiCombined.length > 0 ? aiCombined : topStories.filter(s => s.category === 'ai').slice(0, 16))) {
    aiLines.push(renderArticleCard(s));
  }
  aiLines.push('::::');
  fs.writeFileSync(path.join(pagesDir, 'ai.md'), aiLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 6. 渲染 world.md (全球政经与时事，order: 2)
  // -------------------------------------------------------------
  const worldLines = [
    '---',
    'title: "全球政经与时事"',
    'nav: true',
    'order: 2',
    'description: "全球大国博弈、地缘格局演化与宏观国际时事一手深度解析"',
    'notice:',
    '  text: "🌍 汇聚新华社、俄罗斯卫星通讯社、法新社、CNN、FOX、BBC、半岛电视台等全球多元立场媒体" ',
    '  color: "theme"',
    '---',
    '',
    '# 🌐 全球多极时事与地缘政治深度编译',
    '',
    '兼收并蓄东西方与发展中国家多元立场，对比新华社、俄罗斯卫星通讯社、半岛电视台、法新社、CNN、FOX 等视角，深度还原地缘博弈全貌。',
    '',
    '## 🌍 全球地缘战略走廊与大国棋局',
    '',
    '| 战略走廊 | 核心观察焦点 | 代表性多元信源 |',
    '| :--- | :--- | :--- |',
    '| **东欧与乌克兰危机** | 财务援助可持续性、地面战备与多边和谈窗口 | 新华社, 俄罗斯卫星通讯社, 法新社, BBC |',
    '| **中东与红海能源通道** | 多边共同防务协定、油轮航道安全与战火外溢 | 半岛电视台, FOX News, CNN |',
    '| **北极冰融东北航道** | 商业货轮常态化通航与极地大国地缘博弈 | 纽约时报, 俄罗斯卫星通讯社, 新华社 |',
    '| **印太与东盟轴线** | 竹子外交、核电合作与多元大国平衡战略 | 联合早报, Sputnik, Deutsche Welle |',
    '',
    '## 📰 国际核心要闻全景深度编译',
    '',
    '::::grid{cols=2}'
  ];
  const worldSelected = (worldStories.length > 0 ? worldStories : topStories.filter(s => s.category === 'world')).slice(0, 20);
  for (const s of worldSelected) {
    worldLines.push(renderArticleCard(s));
  }
  worldLines.push('::::');
  fs.writeFileSync(path.join(pagesDir, 'world.md'), worldLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 7. 渲染 markets.md (商业金融，order: 3)
  // -------------------------------------------------------------
  const marketsLines = [
    '---',
    'title: "商业金融"',
    'nav: true',
    'order: 3',
    'description: "全球资本市场、大宗商品、半导体供应链与宏观经济指标跟踪"',
    'notice:',
    '  text: "📈 覆盖 WSJ、CNBC、Bloomberg 等全球主流财经与资本脉动" ',
    '  color: "theme"',
    '---',
    '',
    '# 💹 全球商业、金融与产业资本深度简报',
    '',
    '实时监测华尔街日报、CNBC 等顶级财经媒体，追踪大宗原油、汇率、芯片供应链与宏观央行政策信号。',
    '',
    '## 📰 商业资本核心要闻深度编译',
    '',
    '::::grid{cols=2}'
  ];
  const financeSelected = (financeStories.length > 0 ? financeStories : topStories.filter(s => s.category === 'finance')).slice(0, 16);
  for (const s of financeSelected) {
    marketsLines.push(renderArticleCard(s));
  }
  marketsLines.push('::::');
  fs.writeFileSync(path.join(pagesDir, 'markets.md'), marketsLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 8. 渲染 archive.md (历史情报归档库，order: 7)
  // -------------------------------------------------------------
  const archiveLines = [
    '---',
    'title: "历史情报归档"',
    'nav: true',
    'order: 7',
    'description: "InfoLive 历史全球情报速报与逐小时事件档案库"',
    'notice:',
    '  text: "🗄️ 全库数据永久归档持久留存 · 集成全文检索，按键盘 Ctrl+K 可直接检索历史记录" ',
    '  color: "theme"',
    '---',
    '',
    '# 🗃️ 历史情报归档与回溯中心',
    '',
    ':::tip',
    '💡 **历史检索指南**：本站所有历史简报与事件记录均已建立永久档案，并生成静态全文索引。按下快捷键 <kbd>Ctrl+K</kbd>（Mac: <kbd>Cmd+K</kbd>）或点击右上角搜索放大镜图标，输入任意关键词（如“普京”、“DeepSeek”、“原油”、“阿布扎比”等），即可在毫秒级内检索全库历史记录。',
    ':::',
    '',
    '## 📊 历史数据概览',
    '',
    `- **归档快照总数**：当前已永久存盘 **${historyArchive.length}** 个时间节点快照`,
    `- **数据持久化策略**：永久追加留存，不设删除上限；同时按日持久化存储在 \`data/history/daily/\` 目录下`,
    `- **首条归档时间**：${historyArchive[historyArchive.length - 1]?.displayTime || timeInfo.display}`,
    `- **最新归档时间**：${timeInfo.display}`,
    '',
    '## 📅 逐小时情报快照历史时间轴',
    '',
    '::::timeline{title="历史简报时间轴"}'
  ];

  for (const snap of historyArchive) {
    const briefLead = snap.hourlyBriefing?.lead || '简报记录已存档。';
    archiveLines.push(`:::timeline-item{start="${snap.displayTime}" title="全球要闻情报简报 · ${snap.hourOnly}" org="ARCHIVE"}`);
    archiveLines.push(`**速报纪要：** ${briefLead}`);
    archiveLines.push('');
    if (snap.hourlyBriefing?.signals && snap.hourlyBriefing.signals.length > 0) {
      archiveLines.push(`**关键信号：** ${snap.hourlyBriefing.signals.join('；')}`);
      archiveLines.push('');
    }
    if (snap.storiesSnapshot && snap.storiesSnapshot.length > 0) {
      archiveLines.push('**重点要闻索引：**');
      for (const st of snap.storiesSnapshot.slice(0, 6)) {
        archiveLines.push(`- [${st.source}] [${st.title}](${st.url}) <span class="news-meta-time">🕒 ${st.pubTime}</span>`);
      }
    }
    archiveLines.push(':::');
  }
  archiveLines.push('::::');
  archiveLines.push('');

  fs.writeFileSync(path.join(pagesDir, 'archive.md'), archiveLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 9. 渲染 sources.md (信源矩阵，order: 8)
  // -------------------------------------------------------------
  const sourcesLines = [
    '---',
    'title: "信源矩阵"',
    'nav: true',
    'order: 8',
    'description: "InfoLive 监控的全球全谱系信源分布与品牌徽标注册表"',
    'notice:',
    '  text: "🌐 坚持多源对照、跨立场交叉验证，全面覆盖全球大国通讯社、科技、时政、社会思想与学术源" ',
    '  color: "theme"',
    '---',
    '',
    '# 🌐 全球多源情报监控网络',
    '',
    'InfoLive 构建了跨越国界、立场与意识形态的全球全谱系信息流监控矩阵。涵盖**新华社、俄罗斯卫星通讯社、France 24 / 法新社、CNN、FOX、BBC、卫报、半岛电视台**等全球多极通讯社，以及顶尖 AI 研究院所与顶级学术期刊：',
    '',
    '| 媒体 / 机构名称 | 领域分类 | 媒体立场与观察权重 | 官方订阅源 | 品牌徽标 |',
    '| :--- | :--- | :--- | :--- | :---: |'
  ];

  for (const src of SOURCES) {
    const badge = renderSourceBadge(src.name, src.slug);
    const catMap = { ai: '前沿科技/AI', world: '国际时政/地缘', finance: '商业金融', community: '社会思潮/社区', science: '前沿科学' };
    sourcesLines.push(`| ${src.name} | ${catMap[src.category] || src.category} | 权重: ${src.weight} / 10 | [RSS Feed](${src.url}) | ${badge} |`);
  }
  sourcesLines.push('');
  fs.writeFileSync(path.join(pagesDir, 'sources.md'), sourcesLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 10. 渲染 about.md (关于项目，order: 9)
  // -------------------------------------------------------------
  const aboutLines = [
    '---',
    'title: "关于项目"',
    'nav: true',
    'order: 9',
    'description: "InfoLive 架构设计、开源代码仓库与自动化工作流说明"',
    '---',
    '',
    '# ℹ️ 关于 InfoLive 全球情报矩阵',
    '',
    '**InfoLive** 是一个开源、全自动、由前沿大模型驱动的全球全源信息流与实时要闻矩阵平台。',
    '',
    ':::tip{title="🚀 官方开源代码仓库"}',
    '**GitHub 仓库地址**：[https://github.com/stlin256/INFO-LIVE](https://github.com/stlin256/INFO-LIVE)',
    '',
    '欢迎访问我们的官方 GitHub 仓库，给项目点亮 🌟 Star、提交 Issue 反馈或发起 Pull Request 协作共建！',
    ':::',
    '',
    '## 🏗️ 核心设计哲学与特色体系',
    '- **多维度新闻聚合与开放维度**：不局限于传统硬编码分类，引入全球地缘博弈、前沿智能、战略能源与气候、社会思潮热点、宏观产业与深空科学等开放多维坐标。',
    '- **全球立场辨明与叙事解构**：并列对比中方倡议、莫斯科反制、美主流、美保守、欧洲自主及全球南方视角，解构表象叙事背后的核心事实共识与深层利益诉求。',
    '- **AI 自主创建的深度追踪专题（Dossiers）**：根据重大全球事态演进，由 AI 自主策划并编写专属专题与导航 TAB，提供战略综述、阵营诉求、大事记与深度图文情报。',
    '- **全球社会热点与民意思潮自动整合**：接入各大主流思想社区与严肃媒体，梳理公众关切、网络社群争鸣与社会情绪光谱。',
    '- **全篇全量深度编译**：拒绝简单的单句搬运或仅贴外链。平台利用前沿大模型将一手新闻全量翻译编译为高质量中文，图文并茂，深入交代事实原委与核心研判。',
    '- **真实新闻发布时间标记**：卡片与快讯流标注新闻本身的真实发布时间（`pubTime`），保障情报的时间序列真实度。',
    '- **日尺度与时尺度双重视角**：既有时尺度的秒级要闻与突发演进追踪，又有日尺度的 24 小时全球宏观大势与底层结构性转变深度复盘。',
    '- **永久持久化历史回溯**：历史快照与要闻简报永久存储在仓库中，支持按日期和关键词通过静态全文搜索（<kbd>Ctrl+K</kbd>）随时毫秒级查阅。',
    '- **24/7 全自动无人值守**：基于 GitHub Actions 自动化调度与静态网站生成技术，实现每小时自动抓取、智能提炼、自动构建与全球 CDN 部署。',
    '',
    '## 🛠️ 本地运行与开发',
    '',
    '```bash',
    '# 1. 克隆代码仓库',
    'git clone https://github.com/stlin256/INFO-LIVE.git',
    'cd INFO-LIVE',
    '',
    '# 2. 安装依赖',
    'npm install',
    '',
    '# 3. 运行本地开发服务器',
    'npm run dev',
    '',
    '# 4. 手动触发一次情报抓取与 AI 提炼',
    'node scripts/feed-engine.mjs',
    '',
    '# 5. 构建全量静态网站',
    'npm run build',
    '```',
    '',
    '## 🤝 开源致谢与底层驱动',
    '- **前端框架**：基于开源项目 [OpenHomepage V2](https://github.com/stlin256/OpenHomepage-V2) 驱动，遵循极简、优雅的静态杂志化设计规范。',
    '- **智能模型**：接入 Gemini 3.8 Flash 前沿大语言模型进行跨语言深度编译与结构化综合研判。',
    '- **代码授权**：本项目采用 [MIT License](https://github.com/stlin256/INFO-LIVE/blob/master/LICENSE) 协议开源。'
  ];
  fs.writeFileSync(path.join(pagesDir, 'about.md'), aboutLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 11. 写入 feed-data.json
  // -------------------------------------------------------------
  const dataJsonPath = path.join(root, 'data', 'feed-data.json');
  fs.writeFileSync(dataJsonPath, JSON.stringify(summaryData, null, 2), 'utf8');
  console.log(`[SiteWriter] Generated all pages and saved data/feed-data.json successfully!`);
}
