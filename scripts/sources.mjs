/**
 * InfoLive 监控信源注册表
 */
export const SOURCES = [
  // AI & 前沿科技
  { name: 'Hacker News', slug: 'hackernews', category: 'ai', url: 'https://news.ycombinator.com/rss', weight: 10 },
  { name: 'The Verge', slug: 'theverge', category: 'ai', url: 'https://www.theverge.com/rss/index.xml', weight: 8 },
  { name: 'TechCrunch', slug: 'techcrunch', category: 'ai', url: 'https://techcrunch.com/feed/', weight: 8 },
  { name: 'OpenAI News', slug: 'openai', category: 'ai', url: 'https://openai.com/news/rss.xml', weight: 9 },
  { name: 'Google DeepMind', slug: 'deepmind', category: 'ai', url: 'https://deepmind.google/blog/rss.xml', weight: 9 },
  { name: 'Hugging Face', slug: 'huggingface', category: 'ai', url: 'https://huggingface.co/blog/feed.xml', weight: 9 },
  { name: 'GitHub Blog', slug: 'github', category: 'ai', url: 'https://github.blog/feed/', weight: 7 },
  { name: 'MIT Tech Review', slug: 'mit', category: 'ai', url: 'https://www.technologyreview.com/feed/', weight: 8 },

  // 全球时政与地缘格局
  { name: 'BBC World', slug: 'bbc', category: 'world', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', weight: 10 },
  { name: 'Al Jazeera', slug: 'aljazeera', category: 'world', url: 'https://www.aljazeera.com/xml/rss/all.xml', weight: 9 },
  { name: 'Deutsche Welle', slug: 'dw', category: 'world', url: 'https://rss.dw.com/rdf/rss-en-all', weight: 8 },
  { name: '联合早报', slug: 'zaobao', category: 'world', url: 'https://www.zaobao.com.sg/rss/realtime/world', weight: 9 },
  { name: 'NY Times World', slug: 'nytimes', category: 'world', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', weight: 9 },

  // 商业金融与宏观资本
  { name: 'CNBC Markets', slug: 'cnbc', category: 'finance', url: 'https://search.cnbc.com/rs/search/view.html?partnerId=2000&keywords=markets&sort=date&output=rss', weight: 9 },
  { name: 'WSJ Markets', slug: 'wsj', category: 'finance', url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml', weight: 9 },

  // 思想论坛与社区热议
  { name: 'Reddit r/technology', slug: 'reddit', category: 'community', url: 'https://www.reddit.com/r/technology/top/.rss?t=day', weight: 8 },
  { name: 'Reddit r/worldnews', slug: 'reddit', category: 'community', url: 'https://www.reddit.com/r/worldnews/top/.rss?t=day', weight: 8 },
  { name: 'Lobste.rs', slug: 'lobsters', category: 'community', url: 'https://lobste.rs/rss', weight: 8 },

  // 前沿科学与人类探索
  { name: 'Nature News', slug: 'nature', category: 'science', url: 'https://www.nature.com/nature.rss', weight: 10 },
  { name: 'Science Magazine', slug: 'science', category: 'science', url: 'https://www.science.org/rss/news_current.xml', weight: 9 },
  { name: 'NASA News', slug: 'nasa', category: 'science', url: 'https://www.nasa.gov/news-release/feed/', weight: 8 },
  { name: 'Phys.org', slug: 'science', category: 'science', url: 'https://phys.org/rss-feed/', weight: 8 }
];