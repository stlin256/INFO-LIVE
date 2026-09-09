/**
 * InfoLive AI 深度提炼与要闻生成模块
  */
  import { getBeijingTime } from './fetcher.mjs';
  
const AI_API_KEY = process.env.AI_API_KEY || '';
const AI_API_BASE = (process.env.AI_API_BASE || 'https://axon2.ystone.top/v1').replace(/\/+$/, '');
const AI_MODEL = process.env.AI_MODEL || 'gemini-3.8-flash';

export async function summarizeWithAI(items) {
  const timeInfo = getBeijingTime();
    if (!AI_API_KEY) {
        console.warn('[AI] No AI_API_KEY provided. Using fallback summary.');
            return generateFallbackSummary(items, timeInfo);
              }
              
  console.log('[AI] Contacting AI (' + AI_MODEL + ') at ' + AI_API_BASE + ' for in-depth summarization...');
  
  const categorized = {
      ai: items.filter(i => i.category === 'ai').slice(0, 10),
          world: items.filter(i => i.category === 'world').slice(0, 10),
              finance: items.filter(i => i.category === 'finance').slice(0, 8),
                  community: items.filter(i => i.category === 'community').slice(0, 6),
                      science: items.filter(i => i.category === 'science').slice(0, 6)
                        };
                        
  const samplePrompt = Object.entries(categorized)
      .map(([cat, list]) => {
            const formatted = list.map(i => '- [' + i.sourceName + '] ' + i.title.replace(/[\r\n]+/g, ' ') + ' (URL: ' + i.link + ') | 摘要: ' + i.snippet).join('\n');
                  return '### 分类 [' + cat.toUpperCase() + ']:\n' + formatted;
                      })
                          .join('\n\n');
                          
  const systemPrompt = '你是一个全球顶级全息情报分析师与智库主笔。请将当前抓取到的全球一手新闻提炼为结构化深度情报。要求：客观深刻的专业中文；严禁只给空洞链接，每条精选新闻撰写120-180字深度解析（含事实原委、背景与深远影响），并提炼2条核心研判（Key Takeaways）；提炼3-4个全球重大持续事件追踪（含状态、进展、背景、后续观察）；撰写250字左右本小时全球全景情报综述与动态信号。请输出严格合法的纯JSON，不含任何代码块标记。';
  
  const userPrompt = '当前时间：' + timeInfo.display + '\n\n' + samplePrompt + '\n\n请输出符合以下结构的纯JSON字符串：\n' +
      JSON.stringify({
            hourlyBriefing: {
                    title: "本小时全球情报速报",
                            timestamp: timeInfo.display,
                                    summary: "250字深度综述",
                                            keySignals: ["信号1", "信号2", "信号3"]
                                                  },
                                                        eventTracker: [
                                                                {
                                                                          id: "event-1",
                                                                                    name: "事件名称",
                                                                                              category: "ai",
                                                                                                        status: " 突发演进",
                                                                                                                  summary: "最新进展与核心细节",
                                                                                                                            milestone: "关键背景节点",
                                                                                                                                      nextWatch: "后续观察窗口"
                                                                                                                                              }
                                                                                                                                                    ],
                                                                                                                                                          topStories: [
                                                                                                                                                                  {
                                                                                                                                                                            title: "精炼深刻中文标题",
                                                                                                                                                                                      originalTitle: "Original Title",
                                                                                                                                                                                                category: "ai",
                                                                                                                                                                                                          source: "信源名",
                                                                                                                                                                                                                    sourceSlug: "slug",
                                                                                                                                                                                                                              link: "https://example.com",
                                                                                                                                                                                                                                        time: timeInfo.hourOnly,
                                                                                                                                                                                                                                                  summary: "120-180字深度内部总结，解析背景、核心事实与影响",
                                                                                                                                                                                                                                                            takeaways: ["研判要点1", "研判要点2"]
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                          ],
                                                                                                                                                                                                                                                                                ticker: [
                                                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                                                  time: timeInfo.hourOnly,
                                                                                                                                                                                                                                                                                                            source: "信源名",
                                                                                                                                                                                                                                                                                                                      text: "一句话核心事实快讯",
                                                                                                                                                                                                                                                                                                                                link: "https://example.com"
                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                              ]
                                                                                                                                                                                                                                                                                                                                                  }, null, 2);
                                                                                                                                                                                                                                                                                                                                                  
  try {
      const res = await fetch(AI_API_BASE + '/chat/completions', {
            method: 'POST',
                  headers: {
                          'Authorization': 'Bearer ' + AI_API_KEY,
                                  'Content-Type': 'application/json'
                                        },
                                              body: JSON.stringify({
                                                      model: AI_MODEL,
                                                              messages: [
                                                                        { role: 'system', content: systemPrompt },
                                                                                  { role: 'user', content: userPrompt }
                                                                                          ],
                                                                                                  temperature: 0.2
                                                                                                        })
                                                                                                            });
                                                                                                            
    if (!res.ok) {
          const errText = await res.text();
                throw new Error('AI API HTTP ' + res.status + ': ' + errText);
                    }
                    
    const json = await res.json();
        let content = json.choices?.[0]?.message?.content || '';
            content = content.replace(/^\s*```json\s*/i, '').replace(/\s*```\s*$/i, '').trim();
                const parsed = JSON.parse(content);
                    console.log('[AI] Successfully parsed AI intelligence response!');
                        return parsed;
                          } catch (err) {
                              console.error('[AI] Call failed:', err.message, 'Falling back to rule-based summary.');
                                  return generateFallbackSummary(items, timeInfo);
                                    }
                                    }
                                    
export function generateFallbackSummary(items, timeInfo) {
  const top = items.slice(0, 15).map(it => ({
      title: it.title,
          originalTitle: it.title,
              category: it.category,
                  source: it.sourceName,
                      sourceSlug: it.sourceSlug,
                          link: it.link,
                              time: timeInfo.hourOnly,
                                  summary: it.snippet ? '根据 ' + it.sourceName + ' 报道：' + it.snippet : it.title + '。该消息由 ' + it.sourceName + ' 权威发布，属于行业重大事件，深度影响正在逐步展现。',
                                      takeaways: [
                                            '消息源自 ' + it.sourceName + ' 权威发布',
                                                  'InfoLive 系统已纳入全天候追踪脉络'
                                                      ]
                                                        }));
                                                        
  return {
      hourlyBriefing: {
            title: timeInfo.dateOnly + ' ' + timeInfo.hourOnly + ' 全球要闻速报',
                  timestamp: timeInfo.display,
                        summary: '本小时全球多源情报系统持续稳定监控。AI科技领域大模型与计算生态保持高速迭代，全球宏观政经与大宗供应链展现出深度联动格局，主流前沿论坛对开源技术演进及产业重构展开持续讨论。',
                              keySignals: [
                                      '前沿技术社区与行业媒体持续聚焦下一代智能体与多模态架构',
                                              '全球宏观市场与关键物流走廊呈现地缘敏感性特征',
                                                      '多源信息矩阵每小时全自动化抓取与提炼就绪'
                                                            ]
                                                                },
                                                                    eventTracker: [
                                                                          {
                                                                                  id: 'ai-scaling',
                                                                                          name: '全球大模型推理范式与开源计算生态演化',
                                                                                                  category: 'ai',
                                                                                                          status: ' 突发演进',
                                                                                                                  summary: '主流研究机构与顶级科技实验室正加速推动长思维链推理与多智能体科学发现工具迭代。',
                                                                                                                          milestone: '持续跟进开源架构与计算框架突破',
                                                                                                                                  nextWatch: '下一代前沿多模态大模型的基准评测发布'
                                                                                                                                        },
                                                                                                                                              {
                                                                                                                                                      id: 'global-trade',
                                                                                                                                                              name: '全球关键海运物流与贸易通道韧性博弈',
                                                                                                                                                                      category: 'world',
                                                                                                                                                                              status: ' 深入博弈',
                                                                                                                                                                                      summary: '全球海运与供应链通道受地缘风险持续影响，多国加大物流替代走廊评估与联合协调。',
                                                                                                                                                                                              milestone: '各大航运指数呈现周期性波动',
                                                                                                                                                                                                      nextWatch: '主要经济体港口吞吐与通胀传导效应'
                                                                                                                                                                                                            }
                                                                                                                                                                                                                ],
                                                                                                                                                                                                                    topStories: top,
                                                                                                                                                                                                                        ticker: items.slice(0, 10).map(it => ({
                                                                                                                                                                                                                              time: timeInfo.hourOnly,
                                                                                                                                                                                                                                    source: it.sourceName,
                                                                                                                                                                                                                                          text: it.title,
                                                                                                                                                                                                                                                link: it.link
                                                                                                                                                                                                                                                    }))
                                                                                                                                                                                                                                                      };
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                      