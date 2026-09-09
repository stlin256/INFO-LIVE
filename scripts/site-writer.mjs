/**
 * InfoLive 页面渲染、全量编译与全景内容写入模块
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
  lines.push(':::cell');
  lines.push('<div class="news-card-header">');
  lines.push(`  ${renderSourceBadge(s.source, s.sourceSlug)}`);
  lines.push(`  <span class="news-meta-time">🕒 发布时间：${s.pubTime || '实时'}</span>`);
  lines.push('</div>');
  lines.push('');
  lines.push(`### [${s.title}](${s.url})`);
  lines.push('');

  // 嵌入原汁原味新闻相关图片（若信源包含）
  if (s.imageUrl) {
    const cleanTitle = (s.title || '').replace(/"/g, '&quot;');
    lines.push(`<div class="article-cover"><img src="${s.imageUrl}" alt="${cleanTitle}" loading="lazy" /></div>`);
    lines.push('');
  }

  // 全篇全量深度编译正文
  const safeContent = (s.fullTranslation || s.snippet || '').replace(/\$/g, '&#36;');
  lines.push(safeContent);
  lines.push('');

  // 核心研判
  if (s.keyTakeaways && s.keyTakeaways.length > 0) {
    lines.push('<div class="news-card-takeaways">');
    lines.push('  <div class="takeaways-header">💡 核心研判</div>');
    lines.push('  <ul class="takeaways-list">');
    for (const kt of s.keyTakeaways) {
      lines.push(`    <li>${kt}</li>`);
    }
    lines.push('  </ul>');
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
    eventTracker = [],
    perspectiveMatrix = [],
    topStories = [],
    ticker = []
  } = summaryData;

  const aiStories = topStories.filter(s => s.category === 'ai');
  const worldStories = topStories.filter(s => s.category === 'world');
  const financeStories = topStories.filter(s => s.category === 'finance');
  const scienceStories = topStories.filter(s => s.category === 'science' || s.category === 'community');

  // -------------------------------------------------------------
  // 1. 历史数据持久化归档（永久持久，不设删除上限）
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
    eventTracker,
    topStoriesCount: topStories.length,
    storiesSnapshot: topStories.slice(0, 12).map(s => ({
      title: s.title,
      source: s.source,
      pubTime: s.pubTime,
      url: s.url
    }))
  };

  // 永久保留全部历史，同小时去重覆盖
  historyArchive = [currentSnapshot, ...historyArchive.filter(h => h.displayTime !== timeInfo.display)];
  fs.writeFileSync(archiveFilePath, JSON.stringify(historyArchive, null, 2), 'utf8');

  // 同时按日期归档写入每日独立快照（如 2026-09-09.json）
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

  // 日尺度板块（24小时全球宏观大势日尺度全景）
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

  // 特色内容板块：全球立场罗生门（多源多极视角对照板）
  if (perspectiveMatrix && perspectiveMatrix.length > 0) {
    indexLines.push('## 🌐 全球立场罗生门：重大突发事件多元视角对照板');
    indexLines.push('');
    indexLines.push('通过并列呈现新华社、俄罗斯卫星通讯社、France 24 / 法新社、CNN、FOX 及半岛电视台等不同地缘立场的定调与叙事重点，多维度透视事件深层本质：');
    indexLines.push('');
    for (const pm of perspectiveMatrix) {
      indexLines.push(`### 🎯 焦点对决：${pm.topic}`);
      indexLines.push('');
      indexLines.push(`> ${pm.summary}`);
      indexLines.push('');
      indexLines.push('| 观察信源 | 报道立场与定调 | 核心主张与侧重点 |');
      indexLines.push('| :--- | :--- | :--- |');
      for (const p of pm.perspectives) {
        indexLines.push(`| **${p.source}** | \`${p.stance}\` | ${p.focus} |`);
      }
      indexLines.push('');
    }
  }

  // 快讯流 (Ticker)
  indexLines.push('## ⏱️ 本小时全球要闻快讯流');
  indexLines.push('');
  for (const t of ticker.slice(0, 24)) {
    indexLines.push(`- <span class="ticker-time">[${t.time}]</span> **${t.source}**：[${t.text}](${t.url})`);
  }
  indexLines.push('');

  // 核心要闻全景深度编译卡片 (丰富至 12-16 篇)
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
  // 3. 渲染 ai.md (AI与前沿科技)
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
  // 4. 渲染 world.md (全球政经与时事)
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
  // 5. 渲染 markets.md (商业金融)
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
  // 6. 渲染 archive.md (历史情报归档库 - 满足查询历史数据需求)
  // -------------------------------------------------------------
  const archiveLines = [
    '---',
    'title: "历史情报归档"',
    'nav: true',
    'order: 4',
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
  // 7. 渲染 sources.md (信源矩阵)
  // -------------------------------------------------------------
  const sourcesLines = [
    '---',
    'title: "信源矩阵"',
    'nav: true',
    'order: 5',
    'description: "InfoLive 监控的全球全谱系信源分布与品牌徽标注册表"',
    'notice:',
    '  text: "🌐 坚持多源对照、跨立场交叉验证，全面覆盖全球大国通讯社、科技、时政与学术源" ',
    '  color: "theme"',
    '---',
    '',
    '# 🌐 全球多源情报监控网络',
    '',
    'InfoLive 构建了跨越国界、立场与意识形态的全球全谱系信息流监控矩阵。涵盖**新华社、俄罗斯卫星通讯社、France 24 / 法新社、CNN、FOX、BBC、半岛电视台**等全球多极通讯社，以及顶尖 AI 研究院所与顶级学术期刊：',
    '',
    '| 媒体 / 机构名称 | 领域分类 | 媒体立场与观察权重 | 官方订阅源 | 品牌徽标 |',
    '| :--- | :--- | :--- | :--- | :---: |'
  ];

  for (const src of SOURCES) {
    const badge = renderSourceBadge(src.name, src.slug);
    const catMap = { ai: '前沿科技/AI', world: '国际时政/地缘', finance: '商业金融', community: '思想社区', science: '前沿科学' };
    sourcesLines.push(`| ${src.name} | ${catMap[src.category] || src.category} | 权重: ${src.weight} / 10 | [RSS Feed](${src.url}) | ${badge} |`);
  }
  sourcesLines.push('');
  fs.writeFileSync(path.join(pagesDir, 'sources.md'), sourcesLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 8. 渲染 about.md (关于项目 - 突出插入我们的仓库)
  // -------------------------------------------------------------
  const aboutLines = [
    '---',
    'title: "关于项目"',
    'nav: true',
    'order: 6',
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
    '## 🏗️ 核心设计哲学',
    '- **全篇全量深度编译**：拒绝简单的单句搬运或仅贴外链。平台利用前沿大模型将全球多语种一手新闻全量翻译编译为高质量中文，图文并茂，深入交代事实原委、地缘背景与核心研判。',
    '- **真实新闻发布时间标记**：新闻卡片与快讯流一律标注新闻本身的真实发布时间（`pubTime`），而非本系统的调度抓取时间，严谨保障情报的时间序列真实度。',
    '- **日尺度与时尺度双重视角**：既有时尺度的秒级要闻与突发演进追踪，又有日尺度的 24 小时全球宏观大势与底层结构性转变深度复盘。',
    '- **全球立场罗生门与多元跨源对照**：全面引入**新华社、俄罗斯卫星通讯社、France 24（法新社合作伙伴）、CNN、FOX News、BBC、半岛电视台**等，展示重大博弈中不同立场的叙事重点与定调差异。',
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
  // 9. 写入 feed-data.json
  // -------------------------------------------------------------
  const dataJsonPath = path.join(root, 'data', 'feed-data.json');
  fs.writeFileSync(dataJsonPath, JSON.stringify(summaryData, null, 2), 'utf8');
  console.log(`[SiteWriter] Generated all pages and saved data/feed-data.json successfully!`);
}
