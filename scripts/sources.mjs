/**
 * InfoLive 全球全源监控信源注册表
 * 涵盖新华社、俄罗斯卫星通讯社、法新社、CNN、FOX、BBC、卫报、半岛电视台等全球多成立场媒体及前沿科技/社会思想社区
 */
export const SOURCES = [
  // 1. 全球大国与多元立场通讯社与旗舰媒体
  { name: '新华社 (国际)', slug: 'xinhua', category: 'world', url: 'http://www.news.cn/world/news_world.xml', weight: 10 },
  { name: 'Xinhua World (EN)', slug: 'xinhua', category: 'world', url: 'http://www.xinhuanet.com/english/rss/worldrss.xml', weight: 10 },
  { name: '俄罗斯卫星通讯社 (中文)', slug: 'sputnik', category: 'world', url: 'https://sputniknews.cn/export/rss2/archive/index.xml', weight: 10 },
  { name: 'Sputnik Globe', slug: 'sputnik', category: 'world', url: 'https://sputnikglobe.com/export/rss2/archive/index.xml', weight: 10 },
  { name: 'France 24 (法新社合作伙伴)', slug: 'france24', category: 'world', url: 'https://www.france24.com/en/rss', weight: 10 },
  { name: 'France 24 (FR)', slug: 'france24', category: 'world', url: 'https://www.france24.com/fr/rss', weight: 9 },
  { name: 'CNN World', slug: 'cnn', category: 'world', url: 'http://rss.cnn.com/rss/edition_world.rss', weight: 10 },
  { name: 'CNN Top Stories', slug: 'cnn', category: 'world', url: 'http://rss.cnn.com/rss/cnn_topstories.rss', weight: 9 },
  { name: 'FOX News World', slug: 'fox', category: 'world', url: 'https://moxie.foxnews.com/google-publisher/world.xml', weight: 10 },
  { name: 'FOX News Latest', slug: 'fox', category: 'world', url: 'https://moxie.foxnews.com/google-publisher/latest.xml', weight: 9 },
  { name: 'BBC World', slug: 'bbc', category: 'world', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', weight: 10 },
  { name: 'The Guardian (卫报)', slug: 'guardian', category: 'world', url: 'https://www.theguardian.com/world/rss', weight: 9 },
  { name: 'Al Jazeera (半岛电视台)', slug: 'aljazeera', category: 'world', url: 'https://www.aljazeera.com/xml/rss/all.xml', weight: 9 },
  { name: 'Deutsche Welle (德国之声)', slug: 'dw', category: 'world', url: 'https://rss.dw.com/rdf/rss-en-all', weight: 8 },
  { name: '联合早报', slug: 'zaobao', category: 'world', url: 'https://www.zaobao.com.sg/rss/realtime/world', weight: 9 },
  { name: 'NY Times World', slug: 'nytimes', category: 'world', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', weight: 9 },

  // 2. AI、大模型与前沿科技
  { name: 'Hacker News', slug: 'hackernews', category: 'ai', url: 'https://news.ycombinator.com/rss', weight: 10 },
  { name: 'The Verge', slug: 'theverge', category: 'ai', url: 'https://www.theverge.com/rss/index.xml', weight: 9 },
  { name: 'TechCrunch', slug: 'techcrunch', category: 'ai', url: 'https://techcrunch.com/feed/', weight: 9 },
  { name: 'OpenAI News', slug: 'openai', category: 'ai', url: 'https://openai.com/news/rss.xml', weight: 10 },
  { name: 'Google DeepMind', slug: 'deepmind', category: 'ai', url: 'https://deepmind.google/blog/rss.xml', weight: 10 },
  { name: 'Hugging Face', slug: 'huggingface', category: 'ai', url: 'https://huggingface.co/blog/feed.xml', weight: 9 },
  { name: 'GitHub Blog', slug: 'github', category: 'ai', url: 'https://github.blog/feed/', weight: 8 },
  { name: 'MIT Tech Review', slug: 'mit', category: 'ai', url: 'https://www.technologyreview.com/feed/', weight: 8 },

  // 3. 全球资本、商业金融与宏观经济
  { name: 'WSJ Markets', slug: 'wsj', category: 'finance', url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml', weight: 9 },
  { name: 'CNBC Markets', slug: 'cnbc', category: 'finance', url: 'https://www.cnbc.com/id/10000664/device/rss/rss.html', weight: 9 },

  // 4. 思想论坛、社会热点与社区热议
  { name: 'Reddit r/technology', slug: 'reddit', category: 'community', url: 'https://www.reddit.com/r/technology/top/.rss?t=day', weight: 8 },
  { name: 'Reddit r/worldnews', slug: 'reddit', category: 'community', url: 'https://www.reddit.com/r/worldnews/top/.rss?t=day', weight: 8 },
  { name: 'Lobste.rs', slug: 'lobsters', category: 'community', url: 'https://lobste.rs/rss', weight: 8 },

  // 5. 前沿科学与空间探索
  { name: 'Nature News', slug: 'nature', category: 'science', url: 'https://www.nature.com/nature.rss', weight: 10 },
  { name: 'Science Magazine', slug: 'science', category: 'science', url: 'https://www.science.org/rss/news_current.xml', weight: 9 },
  { name: 'NASA News', slug: 'nasa', category: 'science', url: 'https://www.nasa.gov/news-release/feed/', weight: 8 },
  { name: 'Phys.org', slug: 'science', category: 'science', url: 'https://phys.org/rss-feed/', weight: 8 }
];
