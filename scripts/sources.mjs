/**
 * InfoLive 全球全源监控信源注册表
 * 严格使用各国通讯社及媒体的原生官方语言原版页面，杜绝二次本地化版本。
 * 覆盖：新华社、俄新社(RIA)、卫星社、法新社合作电讯(France 24)、CNN、FOX、BBC、卫报、半岛电视台、WSJ、CNBC等
 */
export const SOURCES = [
  // 1. 全球大国通讯社与地缘博弈旗舰（原生语言版）
  { name: "中新社 (国际实时原版)", slug: "chinanews", category: "world", lang: "zh", url: "https://www.chinanews.com.cn/rss/world.xml", weight: 10 },
  { name: "中新网 (全球要闻原版)", slug: "chinanews", category: "world", lang: "zh", url: "https://www.chinanews.com.cn/rss/importnews.xml", weight: 9 },
  { name: "新华国际 (官方中文原版)", slug: "xinhua", category: "world", lang: "zh", url: "http://www.news.cn/world/news_world.xml", weight: 9 },
  { name: 'RIA Novosti (俄新社官方俄文)', slug: 'ria', category: 'world', lang: 'ru', url: 'https://ria.ru/export/rss2/archive/index.xml', weight: 10 },
  { name: 'Sputnik Globe (官方国际英文电讯)', slug: 'sputnik', category: 'world', lang: 'en', url: 'https://sputnikglobe.com/export/rss2/archive/index.xml', weight: 10 },
  { name: 'France 24 (FR 官方法语原版)', slug: 'france24', category: 'world', lang: 'fr', url: 'https://www.france24.com/fr/rss', weight: 10 },
  { name: 'AFP Actualités (官方法文原版)', slug: 'afp', category: 'world', lang: 'fr', url: 'https://www.afp.com/fr/actus/afp_communique/all/feed', weight: 10 },
  { name: 'AFP News (官方英文原版)', slug: 'afp', category: 'world', lang: 'en', url: 'https://www.afp.com/en/actus/afp_communique/all/feed', weight: 10 },
  { name: 'France 24 (EN 官方英语原版)', slug: 'france24', category: 'world', lang: 'en', url: 'https://www.france24.com/en/rss', weight: 9 },
  { name: 'BBC World (英国BBC官方英文)', slug: 'bbc', category: 'world', lang: 'en', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', weight: 10 },
  { name: 'The Guardian (英国卫报官方英文)', slug: 'guardian', category: 'world', lang: 'en', url: 'https://www.theguardian.com/world/rss', weight: 9 },
  { name: 'Deutsche Welle (DE 官方德语)', slug: 'dw', category: 'world', lang: 'de', url: 'https://rss.dw.com/rdf/rss-de-all', weight: 9 },
  { name: 'Deutsche Welle (EN 官方英语)', slug: 'dw', category: 'world', lang: 'en', url: 'https://rss.dw.com/rdf/rss-en-all', weight: 8 },
  { name: 'CNN World (美国CNN官方英文)', slug: 'cnn', category: 'world', lang: 'en', url: 'http://rss.cnn.com/rss/edition_world.rss', weight: 10 },
  { name: 'CNN Top Stories (美国CNN要闻)', slug: 'cnn', category: 'world', lang: 'en', url: 'http://rss.cnn.com/rss/cnn_topstories.rss', weight: 9 },
  { name: 'FOX News World (美国FOX官方英文)', slug: 'fox', category: 'world', lang: 'en', url: 'https://moxie.foxnews.com/google-publisher/world.xml', weight: 10 },
  { name: 'FOX News Latest (美国FOX快讯)', slug: 'fox', category: 'world', lang: 'en', url: 'https://moxie.foxnews.com/google-publisher/latest.xml', weight: 9 },
  { name: 'Al Jazeera (半岛电视台官方英文)', slug: 'aljazeera', category: 'world', lang: 'en', url: 'https://www.aljazeera.com/xml/rss/all.xml', weight: 9 },
  { name: 'Al Jazeera (半岛电视台官方阿拉伯文)', slug: 'aljazeera', category: 'world', lang: 'ar', url: 'https://www.aljazeera.net/aljazeerarss/', weight: 9 },
  { name: 'NY Times World (纽约时报官方英文)', slug: 'nytimes', category: 'world', lang: 'en', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', weight: 9 },

  // 2. 全球商业金融、资本市场与产业大宗（商业金融频道保底主力）
  { name: 'WSJ Markets (华尔街日报市场)', slug: 'wsj', category: 'finance', lang: 'en', url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml', weight: 10 },
  { name: 'WSJ Business (华尔街日报商业)', slug: 'wsj', category: 'finance', lang: 'en', url: 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml', weight: 9 },
  { name: 'CNBC Markets (CNBC 市场官方英文)', slug: 'cnbc', category: 'finance', lang: 'en', url: 'https://www.cnbc.com/id/10000664/device/rss/rss.html', weight: 10 },
  { name: 'CNBC Economy (CNBC 宏观经济)', slug: 'cnbc', category: 'finance', lang: 'en', url: 'https://www.cnbc.com/id/20910258/device/rss/rss.html', weight: 9 },
  { name: 'MarketWatch Top Stories (市场观察)', slug: 'marketwatch', category: 'finance', lang: 'en', url: 'https://feeds.content.dowjones.io/public/rss/mw_topstories', weight: 9 },
  { name: 'Financial Times (英国金融时报)', slug: 'ft', category: 'finance', lang: 'en', url: 'https://www.ft.com/rss/home/uk', weight: 9 },
  { name: 'OilPrice (全球能源与原油大宗)', slug: 'oilprice', category: 'finance', lang: 'en', url: 'https://oilprice.com/rss/main', weight: 9 },

  // 3. AI、大模型与前沿科技
  { name: 'Hacker News (科技前沿论坛)', slug: 'hackernews', category: 'ai', lang: 'en', url: 'https://news.ycombinator.com/rss', weight: 10 },
  { name: 'The Verge (前沿数码科技)', slug: 'theverge', category: 'ai', lang: 'en', url: 'https://www.theverge.com/rss/index.xml', weight: 9 },
  { name: 'TechCrunch (硅谷创业与资本)', slug: 'techcrunch', category: 'ai', lang: 'en', url: 'https://techcrunch.com/feed/', weight: 9 },
  { name: 'OpenAI News (官方动态)', slug: 'openai', category: 'ai', lang: 'en', url: 'https://openai.com/news/rss.xml', weight: 10 },
  { name: 'Google DeepMind (AI前沿研究)', slug: 'deepmind', category: 'ai', lang: 'en', url: 'https://deepmind.google/blog/rss.xml', weight: 10 },
  { name: 'Hugging Face (开源模型社区)', slug: 'huggingface', category: 'ai', lang: 'en', url: 'https://huggingface.co/blog/feed.xml', weight: 9 },
  { name: 'GitHub Blog (工程技术博客)', slug: 'github', category: 'ai', lang: 'en', url: 'https://github.blog/feed/', weight: 8 },
  { name: 'MIT Tech Review (麻省理工科技评论)', slug: 'mit', category: 'ai', lang: 'en', url: 'https://www.technologyreview.com/feed/', weight: 8 },

  // 4. 思想论坛、社会热点与社区热议
  { name: 'The Guardian Society (卫报社会与民生)', slug: 'guardian', category: 'community', lang: 'en', url: 'https://www.theguardian.com/society/rss', weight: 9 },
  { name: 'Reddit r/worldnews (国际公众热议)', slug: 'reddit', category: 'community', lang: 'en', url: 'https://www.reddit.com/r/worldnews/top/.rss?t=day', weight: 8 },
  { name: 'Reddit r/technology (科技伦理热议)', slug: 'reddit', category: 'community', lang: 'en', url: 'https://www.reddit.com/r/technology/top/.rss?t=day', weight: 8 },
  { name: 'Lobste.rs (极客思想社区)', slug: 'lobsters', category: 'community', lang: 'en', url: 'https://lobste.rs/rss', weight: 8 },

  // 5. 前沿科学与空间探索
  { name: 'Nature News (自然科学顶级期刊)', slug: 'nature', category: 'science', lang: 'en', url: 'https://www.nature.com/nature.rss', weight: 10 },
  { name: 'Science Magazine (科学杂志)', slug: 'science', category: 'science', lang: 'en', url: 'https://www.science.org/rss/news_current.xml', weight: 9 },
  { name: 'NASA News (深空探索与航天)', slug: 'nasa', category: 'science', lang: 'en', url: 'https://www.nasa.gov/news-release/feed/', weight: 8 },
  { name: 'Phys.org (基础物理与技术前沿)', slug: 'science', lang: 'en', category: 'science', url: 'https://phys.org/rss-feed/', weight: 8 }
];
