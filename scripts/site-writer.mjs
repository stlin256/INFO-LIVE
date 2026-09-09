/**
 * InfoLive 页面渲染与全景内容写入模块
  */
  import fs from 'node:fs';
  import path from 'node:path';
  import { getBeijingTime } from './fetcher.mjs';
  import { SOURCES } from './sources.mjs';
  
export function resolveSourceSlug(sourceName, sourceSlug) {
  const s = (sourceSlug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const n = (sourceName || '').toLowerCase();
  if (s.includes('aljazeera') || n.includes('jazeera')) return 'aljazeera';
  if (s.includes('theverge') || n.includes('verge')) return 'theverge';
  if (s.includes('techcrunch') || n.includes('crunch')) return 'techcrunch';
  if (s.includes('hackernews') || n.includes('hacker')) return 'hackernews';
  if (s.includes('deepmind')) return 'deepmind';
  if (s.includes('openai')) return 'openai';
  if (s.includes('huggingface') || n.includes('hugging')) return 'huggingface';
  if (s.includes('github')) return 'github';
  if (s.includes('mit')) return 'mit';
  if (s.includes('bbc')) return 'bbc';
  if (s.includes('reuters')) return 'reuters';
  if (s.includes('ap') || n.includes('associated press')) return 'ap';
  if (s.includes('bloomberg')) return 'bloomberg';
  if (s.includes('nytimes') || n.includes('times')) return 'nytimes';
  if (s.includes('wsj') || n.includes('wall street')) return 'wsj';
  if (s.includes('dw') || n.includes('welle')) return 'dw';
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
  if (s.includes('xinhua') || n.includes('新华')) return 'xinhua';
  return s || 'github';
}

export function renderSourceBadge(sourceName, sourceSlug) {
  const resolved = resolveSourceSlug(sourceName, sourceSlug);
  const iconPath = '/assets/sources/' + resolved + '.svg';
  return '<span class="source-badge"><img src="' + iconPath + '" class="source-icon" alt="' + sourceName + '" width="16" height="16" /> <strong>' + sourceName + '</strong></span>';
}
    
export async function writeSiteContent(summaryData, _rawItems) {
  const root = process.cwd();
    const timeInfo = getBeijingTime();
      const pagesDir = path.join(root, 'data', 'pages', 'zh');
        fs.mkdirSync(pagesDir, { recursive: true });
        
  const { hourlyBriefing, eventTracker = [], topStories = [], ticker = [] } = summaryData;
  
  const aiStories = topStories.filter(s => s.category === 'ai');
    const worldStories = topStories.filter(s => s.category === 'world');
      const financeStories = topStories.filter(s => s.category === 'finance');
      
  // 1. 构建主页 index.md
    let indexMd = [
        '---',
            'title: "全球情报矩阵"',
                'nav: true',
                    'order: 0',
                        'description: "InfoLive 全球全源信息流与 AI 实时要闻矩阵"',
                            'notice:',
                                '  text: " 24/7 全球情报实时监控中  上次同步：' + timeInfo.display + '  聚合 30+ 权威信源"',
                                    '  color: "theme"',
                                        '---',
                                            '',
                                                ':::important',
                                                    '###  本小时全球情报速报（' + timeInfo.hourOnly + ' 播报）',
                                                        '',
                                                            hourlyBriefing.summary || '全球情报流持续稳定监控。',
                                                                '',
                                                                    '** 关键动态信号：**',
                                                                        (hourlyBriefing.keySignals || []).map(s => '- ' + s).join('\n'),
                                                                            ':::',
                                                                                '',
                                                                                    '##  全球重大事件演进追踪',
                                                                                        '',
                                                                                            '::::timeline',
                                                                                                eventTracker.map(ev => [
                                                                                                      ':::timeline-item{date="' + ev.status + '  ' + timeInfo.hourOnly + '" title="' + ev.name + '" org="' + (ev.category ? ev.category.toUpperCase() : 'EVENT') + '"}',
                                                                                                            '**最新进展：** ' + ev.summary,
                                                                                                                  '',
                                                                                                                        '**脉络背景：** ' + ev.milestone,
                                                                                                                              '',
                                                                                                                                    '**后续观察：** ' + ev.nextWatch,
                                                                                                                                          ':::'
                                                                                                                                              ].join('\n')).join('\n\n'),
                                                                                                                                                  '::::',
                                                                                                                                                      '',
                                                                                                                                                          '##  本小时全球要闻快讯流',
                                                                                                                                                              '',
                                                                                                                                                                  ticker.map(t => '- <span class="ticker-time">[' + t.time + ']</span> **' + t.source + '**：[' + t.text + '](' + t.link + ')').join('\n'),
                                                                                                                                                                      '',
                                                                                                                                                                          '##  核心要闻全景深度提炼',
                                                                                                                                                                              '',
                                                                                                                                                                                  '::::grid{cols=2}',
                                                                                                                                                                                      topStories.slice(0, 10).map(s => [
                                                                                                                                                                                            ':::cell',
                                                                                                                                                                                                  renderSourceBadge(s.source, s.sourceSlug) + '  <span class="news-meta-time">' + s.time + '</span>',
                                                                                                                                                                                                        '',
                                                                                                                                                                                                              '### [' + s.title + '](' + s.link + ')',
                                                                                                                                                                                                                    '',
                                                                                                                                                                                                                          s.summary,
                                                                                                                                                                                                                                '',
                                                                                                                                                                                                                                      '>  **核心研判**：',
                                                                                                                                                                                                                                            (s.takeaways || []).map(t => '> - ' + t).join('\n'),
                                                                                                                                                                                                                                                  '',
                                                                                                                                                                                                                                                        '[查阅出处原文 ](' + s.link + ')',
                                                                                                                                                                                                                                                              ':::'
                                                                                                                                                                                                                                                                  ].join('\n')).join('\n\n'),
                                                                                                                                                                                                                                                                      '::::',
                                                                                                                                                                                                                                                                          '',
                                                                                                                                                                                                                                                                              ':::tip',
                                                                                                                                                                                                                                                                                  ' **关于本页面**：本页面由 **InfoLive 引擎** 每小时全自动调度，从各大国际主流通讯社、AI顶级社区、学术预印本与财经网络爬取一手数据，经由 AI 进行多源交叉验证、内化中文撰写与事件脉络追踪，非简单聚合外链，所有内容直接写入静态页面。',
                                                                                                                                                                                                                                                                                      ':::'
                                                                                                                                                                                                                                                                                        ].join('\n');
                                                                                                                                                                                                                                                                                        
  fs.writeFileSync(path.join(pagesDir, 'index.md'), indexMd, 'utf8');
  
  // 2. 构建 AI 专页 ai.md
    let aiMd = [
        '---',
            'title: "AI与前沿科技"',
                'nav: true',
                    'order: 1',
                        'description: "全球人工智能、大模型计算、开源生态与顶会论文一手深度情报"',
                            'notice:',
                                '  text: " 聚焦前沿大模型范式、智能体、计算架构与学术前沿  实时更新"',
                                    '  color: "theme"',
                                        '---',
                                            '',
                                                '##  AI与前沿科技深度要闻',
                                                    '',
                                                        '::::grid{cols=2}',
                                                            (aiStories.length > 0 ? aiStories : topStories.slice(0, 8)).map(s => [
                                                                  ':::cell',
                                                                        renderSourceBadge(s.source, s.sourceSlug) + '  <span class="news-meta-time">' + s.time + '</span>',
                                                                              '',
                                                                                    '### [' + s.title + '](' + s.link + ')',
                                                                                          '',
                                                                                                s.summary,
                                                                                                      '',
                                                                                                            '>  **核心研判**：',
                                                                                                                  (s.takeaways || []).map(t => '> - ' + t).join('\n'),
                                                                                                                        '',
                                                                                                                              '[查阅出处原文 ](' + s.link + ')',
                                                                                                                                    ':::'
                                                                                                                                        ].join('\n')).join('\n\n'),
                                                                                                                                            '::::'
                                                                                                                                              ].join('\n');
                                                                                                                                                fs.writeFileSync(path.join(pagesDir, 'ai.md'), aiMd, 'utf8');
                                                                                                                                                
  // 3. 构建 全球政经 world.md
    let worldMd = [
        '---',
            'title: "全球政经与时事"',
                'nav: true',
                    'order: 2',
                        'description: "全球大国博弈、地缘格局演化与宏观国际时事一手解析"',
                            'notice:',
                                '  text: " 汇聚 BBC、路透社、半岛电视台、联合早报等全球多元立场媒体"',
                                    '  color: "theme"',
                                        '---',
                                            '',
                                                '##  全球政经与地缘格局深度要闻',
                                                    '',
                                                        '::::grid{cols=2}',
                                                            (worldStories.length > 0 ? worldStories : topStories.slice(0, 8)).map(s => [
                                                                  ':::cell',
                                                                        renderSourceBadge(s.source, s.sourceSlug) + '  <span class="news-meta-time">' + s.time + '</span>',
                                                                              '',
                                                                                    '### [' + s.title + '](' + s.link + ')',
                                                                                          '',
                                                                                                s.summary,
                                                                                                      '',
                                                                                                            '>  **核心研判**：',
                                                                                                                  (s.takeaways || []).map(t => '> - ' + t).join('\n'),
                                                                                                                        '',
                                                                                                                              '[查阅出处原文 ](' + s.link + ')',
                                                                                                                                    ':::'
                                                                                                                                        ].join('\n')).join('\n\n'),
                                                                                                                                            '::::'
                                                                                                                                              ].join('\n');
                                                                                                                                                fs.writeFileSync(path.join(pagesDir, 'world.md'), worldMd, 'utf8');
                                                                                                                                                
  // 4. 构建 商业金融 markets.md
    let marketsMd = [
        '---',
            'title: "商业金融"',
                'nav: true',
                    'order: 3',
                        'description: "全球资本市场、大宗商品、半导体供应链与宏观经济指标跟踪"',
                            'notice:',
                                '  text: " 覆盖 CNBC、WSJ、Bloomberg 等全球主流财经脉动"',
                                    '  color: "theme"',
                                        '---',
                                            '',
                                                '##  商业金融与全球资本市场',
                                                    '',
                                                        '::::grid{cols=2}',
                                                            (financeStories.length > 0 ? financeStories : topStories.slice(0, 8)).map(s => [
                                                                  ':::cell',
                                                                        renderSourceBadge(s.source, s.sourceSlug) + '  <span class="news-meta-time">' + s.time + '</span>',
                                                                              '',
                                                                                    '### [' + s.title + '](' + s.link + ')',
                                                                                          '',
                                                                                                s.summary,
                                                                                                      '',
                                                                                                            '>  **核心研判**：',
                                                                                                                  (s.takeaways || []).map(t => '> - ' + t).join('\n'),
                                                                                                                        '',
                                                                                                                              '[查阅出处原文 ](' + s.link + ')',
                                                                                                                                    ':::'
                                                                                                                                        ].join('\n')).join('\n\n'),
                                                                                                                                            '::::'
                                                                                                                                              ].join('\n');
                                                                                                                                                fs.writeFileSync(path.join(pagesDir, 'markets.md'), marketsMd, 'utf8');
                                                                                                                                                
  // 5. 构建 信源矩阵 sources.md
    let sourcesMd = [
        '---',
            'title: "信源矩阵"',
                'nav: true',
                    'order: 4',
                        'description: "InfoLive 监控的全球全谱系信源分布与品牌徽标注册表"',
                            'notice:',
                                '  text: " 坚持多源对照、跨立场交叉验证，全面覆盖全球科技、政经、思想与学术源"',
                                    '  color: "theme"',
                                        '---',
                                            '',
                                                '##  监控信源注册表（部分代表性媒体）',
                                                    '',
                                                        '::::grid{cols=3}',
                                                            SOURCES.map(src => [
                                                                  ':::cell',
                                                                        renderSourceBadge(src.name, src.slug),
                                                                              '',
                                                                                    '- **领域标签**：`' + src.category.toUpperCase() + '`',
                                                                                          '- **抓取权重**： (' + src.weight + '/10)',
                                                                                                '- [访问信源官网 ](' + src.url + ')',
                                                                                                      ':::'
                                                                                                          ].join('\n')).join('\n\n'),
                                                                                                              '::::'
                                                                                                                ].join('\n');
                                                                                                                  fs.writeFileSync(path.join(pagesDir, 'sources.md'), sourcesMd, 'utf8');
                                                                                                                  
  // 6. 构建 关于 about.md
    let aboutMd = [
        '---',
            'title: "关于项目"',
                'nav: true',
                    'order: 5',
                        'description: "InfoLive 架构设计、全自动化工作流与技术栈说明"',
                            '---',
                                '',
                                    '# InfoLive 全球全源信息流与 AI 实时要闻矩阵',
                                        '',
                                            '**InfoLive** 是一个追求极致信息密度与深度洞察的开源情报流系统。',
                                                '',
                                                    '传统聚合器往往只列出一串标题与超链接，信息获取极其碎片化；而 **InfoLive** 坚持 **内容写入，而非仅给链接**：',
                                                        '',
                                                            '1. **极大信息量抓取**：覆盖世界主流通讯社（BBC、路透社、美联社、联合早报等）、顶级AI科技社区（Hacker News、OpenAI、DeepMind、Hugging Face、ArXiv）、宏观金融（CNBC、WSJ）以及学术科学期刊（Nature、Science、NASA）。',
                                                                '2. **AI 内部深度总结**：接入 **Gemini 3.8 Flash** 模型，以专业情报分析师视角对新闻进行客观去重、内化翻译与背景提炼，每条均给出百余字事实背景剖析与 2 条核心研判。',
                                                                    '3. **小时更新与事件追踪**：每小时触发一次 GitHub Actions 工作流，提炼本小时全球速报，并以时间线持续追踪正在发酵演变的重大历史事件。',
                                                                        '4. **前端框架驱动**：本项目前端框架由 [OpenHomepage V2](https://github.com/stlin256/OpenHomepage-V2) 驱动，具备高雅的杂志网格排版、极速静态生成与零延迟阅读体验。',
                                                                            '',
                                                                                ':::note',
                                                                                    '**声明**：本站所有新闻内容由开源工作流自动抓取并经 AI 提炼，所有卡片均清晰标注原始信源与出处链接。',
                                                                                        ':::'
                                                                                          ].join('\n');
                                                                                            fs.writeFileSync(path.join(pagesDir, 'about.md'), aboutMd, 'utf8');
                                                                                            
  // 7. 保存 JSON 结构化数据
    const dataJsonPath = path.join(root, 'data', 'feed-data.json');
      fs.writeFileSync(dataJsonPath, JSON.stringify(summaryData, null, 2), 'utf8');
      
  // 8. 写入 .cache/rss.json 保证原生 RssBlock 兼容
    const cacheDir = path.join(root, '.cache');
      fs.mkdirSync(cacheDir, { recursive: true });
        const rssCacheData = {
            blocks: {
                  default: {
                          data: topStories.map(s => ({
                                    title: s.title,
                                              link: s.link,
                                                        source: s.source,
                                                                  published: new Date().toISOString(),
                                                                            summary: s.summary,
                                                                                      note: (s.takeaways || []).join('； ')
                                                                                              })),
                                                                                                      fetched_at: Date.now(),
                                                                                                              error: null,
                                                                                                                      failed_at: null
                                                                                                                            }
                                                                                                                                }
                                                                                                                                  };
                                                                                                                                    fs.writeFileSync(path.join(cacheDir, 'rss.json'), JSON.stringify(rssCacheData, null, 2), 'utf8');
                                                                                                                                    
  console.log('[SiteWriter] All pages and feed cache written successfully!');
  }
  