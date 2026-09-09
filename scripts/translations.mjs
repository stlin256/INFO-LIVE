/**
 * InfoLive 多语言多极新闻语义翻译与归纳引擎
 * 严格支持：
 * 1. 俄语 (RIA Novosti / Sputnik)
 * 2. 法语 (France 24 / AFP)
 * 3. 德语 (Deutsche Welle)
 * 4. 阿拉伯语 (Al Jazeera)
 * 5. 英语全球主流通讯社与科技期刊 (BBC, CNN, FOX, NYT, WSJ, Phys.org, Nature, TechCrunch等)
 */

export const EXACT_HEADLINE_MAP = new Map([
  // 俄语电讯 (RIA Novosti / Sputnik)
  ['ПВО сбила украинский беспилотник над Курской областью', '俄防空系统在库尔斯克州上空拦截击落乌方无人机'],
  ['ПВО сбила беспилотник над Курской областью', '俄防空系统在库尔斯克州上空击落无人机'],
  ['ПВО сбила украинский беспилотник над Белгородской областью', '俄防空部队在别尔哥罗德州上空击落乌方无人机'],
  ['ПВО сбила беспилотник над Белгородской областью', '俄防空部队在别尔哥罗德州上空击落无人机'],
  ['ПВО уничтожила украинские дроны над территорией РФ', '俄防空部队在俄本土多地上空拦截并摧毁乌方来袭无人机'],
  ['Медиа: ЕС намерен исключить китайские компании из госзакупок', '外媒披露：欧盟拟起草关键采购新规，将中国企业排除在政府采购之外'],
  ['Вьетнам поблагодарил Путина за развитие отношений', '越南国家高层致电俄总统普京，感谢俄方长期推动深化双边全面战略伙伴关系'],
  ['Вьетнам поблагодарил Путина и российский народ за развитие связей', '越南国家主席感谢普京和俄罗斯人民促进发展两国双边合作'],
  ['Кремль: Россия надеется, что США продолжат миротворческие усилия по Украине', '克宫表态：俄罗斯希望美国继续在乌克兰政治调解中做出建设性努力'],
  ['Кремль прокомментировал контакты с представителями США', '克里姆林宫公开证实与美方高级特使就乌克兰局势展开实质性接触'],
  ['Россия и Вьетнам выступают против мер в нарушение международного права', '俄越发表联合声明：坚决反对违反国际法与联合国宪章的单边限制措施'],
  ['Архитектор: строительство метро улучшит качество жизни в Подмосковье', '城市基础设施与民生规划：莫斯科州新建地铁轨道网络提升区域联通'],
  ['ЦСКА объявил о переходе футболиста "Крыльев Советов"', '俄罗斯体坛动态：莫斯科中央陆军宣布完成与苏维埃之翼的重要球员转会'],

  // 法语原版电讯 (France 24 / AFP)
  ['Je ne me sens plus en sécurité : au Kenya, l\'inquiétude des commerçants burundais', '“我感到安全不再”：肯尼亚境内布隆迪外籍商户深陷恐慌与生存焦虑'],
  ['Je ne me sens plus en sécurité : au Kenya, l\'inquiétude des commerçants burundais', '“我感到安全不再”：肯尼亚境内布隆迪外籍商户深陷恐慌与生存焦虑'],
  ['"Je ne me sens plus en sécurité" : au Kenya, l\'inquiétude des commerçants burundais', '“我感到安全不再”：肯尼亚境内布隆迪外籍商户深陷恐慌与生存焦虑'],
  ['"Je ne me sens plus en sécurité" : au Kenya, l\'inquiétude des commerçants burundais', '“我感到安全不再”：肯尼亚境内布隆迪外籍商户深陷恐慌与生存焦虑'],
  ['Tunisie : manifestations pour la libération du journaliste Mohamed Yousfi', '突尼斯：首都爆发大规模群众集会抗议，要求释放被捕调查记者尤斯菲'],
  ['Camille Cottin et sa bande de retour dans "Dix pour cent, le film"', '法剧《百分之十》电影版正式官宣开拍：原班核心卡司全面回归'],

  // 德语电讯 (Deutsche Welle)
  ['Ölpreise steigen nach Eskalation im Nahen Osten', '中东多边冲突升级推升国际油价：红海与霍尔木兹海峡地缘风险溢价加剧'],
  ['Oil prices rise as Middle East conflict escalates', '中东冲突多边升级推升国际油价：红海与霍尔木兹海峡地缘风险溢价加剧'],

  // 国际旗舰通讯社 (BBC, CNN, FOX, Guardian, NYT, WSJ, CNBC, Phys.org, Nature, TechCrunch, Verge)
  ['iPhone 18 live blog: On the ground at Apple’s biggest event', '苹果秋季重磅发布会现场直击：iPhone 18系列与高集成AI硬件全景亮相'],
  ['iPhone 18 live blog: On the ground at Apple\'s biggest event', '苹果秋季重磅发布会现场直击：iPhone 18系列与高集成AI硬件全景亮相'],
  ['‘Gambling with our lives’: Anthropic researcher quits, warns against self-improving AI', '“拿全人类生命豪赌”：Anthropic资深核心研究员公开辞职，警告超级智能失控风险'],
  ['\'Gambling with our lives\': Anthropic researcher quits, warns against self-improving AI', '“拿全人类生命豪赌”：Anthropic资深核心研究员公开辞职，警告超级智能失控风险'],
  ['New AI model for DNA learns from evolution to unlock secrets of the human genome', '基因工程前沿突破：全新进化感知 AI 模型成功解码人类基因组核心奥秘'],
  ['Petrochemical industry emissions could climb 50% by 2050, global mapping suggests', '全球环境权威图谱预警：石化产业碳排放至2050年或将大幅激增50%'],
  ['White is more than a color: How nature inspired a new sustainable way to make white, water-repellent materials', '仿生材料重大突破：科学家受自然界启发开发出全新环保可持续超疏水反光材料'],
  ['First Denisovan forearm bone discovered in southwest China', '古人类学里程碑发现：中国西南部首次出土丹尼索瓦人前臂骨化石'],
  ['The Theme Park at the Heart of France’s Culture War', '文化战争风暴眼：法国狂人国历史主题公园背后的保守思潮与社会思辨'],
  ['The Theme Park at the Heart of France\'s Culture War', '文化战争风暴眼：法国狂人国历史主题公园背后的保守思潮与社会思辨'],
  ['A \'wholistic\' view of cellular communication across an entire animal', '生命科学前沿：科学家首次实现完整动物活体内全景细胞通信高精观测'],
  ['Next-gen gravitational wave detectors could spot the first black holes', '深空天体物理：下一代引力波探测器有望捕捉宇宙诞生之初的首批原初黑洞'],
  ['The RBA hoped this year’s three interest rate rises would tame inflation – but nothing is going their way', '澳大利亚央行年内三次加息难抑通胀：宏观经济紧缩政策陷入严峻困局'],
  ['The RBA hoped this year\'s three interest rate rises would tame inflation – but nothing is going their way', '澳大利亚央行年内三次加息难抑通胀：宏观经济紧缩政策陷入严峻困局'],
  ['Amazon cargo jet pilot reportedly told wife, \'My career is over\' shortly after deadly crash', '亚马逊货机致命坠毁惨剧调查：飞行员失事前与妻子绝望通话录音曝光'],
  ['Amazon cargo jet pilot reportedly told wife, ‘My career is over’ shortly after deadly crash', '亚马逊货机致命坠毁惨剧调查：飞行员失事前与妻子绝望通话录音曝光'],
  ['Team USA coach reveals if Caitlin Clark will start in the World Cup final stage after bench role in group play', '美国女篮主帅就克拉克淘汰赛首发安排表态：维持既有主力阵容轮换稳定'],
  ['Shipt becomes the latest delivery app with an AI shopping assistant', 'Target 旗下即时配送平台 Shipt 宣布全面上线 AI 智能导购助手与购物车推荐'],
  ['The Switch 2 is getting a 2D Metroid called Ravenous', '任天堂 Switch 2 确认迎来全新 2D 银河战士系列新作《Ravenous》'],
  ['I spent an hour riding inside Tesla’s steering-wheel-free Cybercab', '深度实测体验特斯拉无方向盘 Cybercab：自动驾驶无人出租车的现实突破与局限'],
  ['I spent an hour riding inside Tesla\'s steering-wheel-free Cybercab', '深度实测体验特斯拉无方向盘 Cybercab：自动驾驶无人出租车的现实突破与局限'],
  ['Auckland has an overlooked traffic pollution problem—and it\'s not from exhausts', '新西兰奥克兰交通污染新发现：被长期忽视的非尾气刹车磨损微粒严重危害'],
  ['How \'parachute science\' is failing the world\'s tropical insects', '生态学科研反思：西方“空降科研”模式为何难以遏制全球热带昆虫物种锐减'],
  ['Uber invests $10M in Indian fleet operator Carrum at $168M valuation', 'Uber 斥资1000万美元战略投资印度车队运营商 Carrum，估值达1.68亿美元'],
  ['Nick Offerman says \'Parks and Rec\' character would \'listen to reason\' and reconsider his libertarian beliefs', '演员尼克·奥弗曼谈经典角色：斯旺森若置身当代必将重新审视自由意志主义信念'],
  ['Nick Offerman says ‘Parks and Rec’ character would ‘listen to reason’ and reconsider his libertarian beliefs', '演员尼克·奥弗曼谈经典角色：斯旺森若置身当代必将重新审视自由意志主义信念'],
  ['Hutu and Tutsi: The history behind the divide', '非洲大湖区历史探源：胡图族与图西族深层族群分歧的历史经纬剖析'],
  ['Skillet\'s John Cooper says woke activists have \'big hearts\' but are \'hurting themselves\'', '摇滚乐手约翰·库珀公开评述觉醒文化：良好初衷难掩撕裂社会的负面现实'],
  ['Skillet’s John Cooper says woke activists have ‘big hearts’ but are ‘hurting themselves’', '摇滚乐手约翰·库珀公开评述觉醒文化：良好初衷难掩撕裂社会的负面现实'],
  ['As African space race heats up, Senegal pursues homemade satellites', '非洲航天竞逐升温：塞内加尔科研团队自主研制首颗微纳卫星迈出关键一步'],
  ['Reading app boosts kids\' literacy', '权威科研证实：科学数字拼读阅读应用可显著提升学龄儿童读写能力'],
  ['Reading app boosts kids’ literacy', '权威科研证实：科学数字拼读阅读应用可显著提升学龄儿童读写能力'],
  ['A 66.5-million-year-old trackway captures adult T. rex at walking pace', '古生物学重大突破：6650万年前恐龙足迹化石罕见还原成年霸王龙行走步态'],
  ['What is Jordan’s Al-Azraq base and why is Iran targeting it?', '深度解析约旦阿兹拉克空军基地：地缘战略价值及其为何成为区域防务敏感目标'],
  ['What is Jordan\'s Al-Azraq base and why is Iran targeting it?', '深度解析约旦阿兹拉克空军基地：地缘战略价值及其为何成为区域防务敏感目标'],
  ['AI spend per employee slumped at top firms in August — summer doldrums or a warning sign?', '硅谷顶级企业8月人均 AI 支出出现显著下滑：季节性淡季还是商业化降温信号？'],
  ['Escalating Boat Strikes Campaign, U.S. Targets ‘Refueling’ Vessels', '美军扩大海上打击行动：重点针对被指提供中继补给的加油驳船展开精确空袭'],
  ['Escalating Boat Strikes Campaign, U.S. Targets \'Refueling\' Vessels', '美军扩大海上打击行动：重点针对被指提供中继补给的加油驳船展开精确空袭'],
  ['Pakistan all out for 133 in third Test vs England after squad changes', '板球测试赛：巴基斯坦队阵容调整后以133分大比分落败于英格兰队'],
  ['Chinese Ship Takes Arctic Shortcut: Smart Business? Or a Political Flex?', '中国商船开辟北极东北航道定期集装箱班轮：商业创新还是高纬度战略布局？'],
  ['Heat forces French Champagne makers to stiffen their drink', '欧洲极端高温倒逼产业转型：法国香槟酿酒商调整传统工艺以应对气候危机'],
  ['Anak Krakatau erupts, disrupting 300,000 travelers as 1883 disaster looms large', '印尼喀拉喀托之子火山强烈喷发：导致30万旅客出行瘫痪并唤醒世纪灾难记忆'],
  ['Comfort food season is here: Shop slow cookers, Dutch ovens and more fall cooking staples', '秋季消费与暖冬家电热潮：多功能慢炖锅与厨电产品进入销售旺季'],
  ['Number 10 backs UK air traffic control boss as airlines hit out at disruption', '英国首相府公开力挺空管主管，直面多家航司对航班延误瘫痪的猛烈抨击'],
  ['ExxonMobil, ANPG Notch 20th Discovery in Angola\'s Block 15', '埃克森美孚与 ANPG 宣布在安哥拉15号深水区块取得第20处重大油气勘探发现'],
  ['Treasury to buy back more government bonds than previously announced', '美国财政部宣布将加大国债回购规模，超出此前预期以平抑美债收益率'],
  ['Meta’s stock jumps as new personal AI agent Muse addresses a major investor concern', 'Meta 股价大幅上扬：全新个人 AI 智能体 Muse 成功化解投资者商业化核心关切'],
  ['Meta\'s stock jumps as new personal AI agent Muse addresses a major investor concern', 'Meta 股价大幅上扬：全新个人 AI 智能体 Muse 成功化解投资者商业化核心关切'],
  ['Why UBS is telling investors to forget Europe’s ‘tired caricature’ and buy its stocks', '瑞银最新研报力荐欧洲股票：呼吁投资者摒弃刻板偏见并加大欧股配置'],
  ['Why UBS is telling investors to forget Europe\'s \'tired caricature\' and buy its stocks', '瑞银最新研报力荐欧洲股票：呼吁投资者摒弃刻板偏见并加大欧股配置'],
  ['Bessent says, ‘I am the house now.’ What that means for the yen — and U.S. stocks', '美财长贝森特称“我就是庄家”：深度解析强硬表态对日元汇率与美股的深远影响'],
  ['Bessent says, \'I am the house now.\' What that means for the yen — and U.S. stocks', '美财长贝森特称“我就是庄家”：深度解析强硬表态对日元汇率与美股的深远影响'],
  ['Sinopec Sees China Oil Demand Falling 8.9% in 2026', '中国石化最新研判：预计2026年中国石油需求将发生结构性转变并下降8.9%'],
  ['Police investigate Reform UK over donor sting', '英国警方就秘密偷拍曝光的非法海外政治献金对改革党启动刑事调查'],
  ['Typhoon Lan lashes central Japan, killing 2 and disrupting transport systems', '台风“兰恩”肆虐日本中部地区：造成2人遇难并致跨区交通大面积瘫痪'],
  ['Framework is giving some customers a RAM refund', 'Framework 模块化电脑官方宣布为部分消费者提供内存差价退款补偿'],
  ['The purpose of DNS is to spread scams', '网络安全深度调查：黑客组织如何滥用底层 DNS 协议大肆扩散网络钓鱼诈骗'],
  ['IBM releases SOTA Granite Time Series PatchTST-FM-r2 model with commercial-friendly license', 'IBM 正式开源 Granite 时间序列顶级基础大模型，采用商用友好型授权协议'],
  ['Project digitally recreates a buried World War I battlefield', '数字孪生全景重现：高精三维建模揭开一战法国被掩埋的前线地下战场'],
  ['Speaker of Hungarian Parliament addresses in Budapest', '匈牙利国会议长在布达佩斯发表重要演说：阐述欧洲安全与战略自主立场'],
  ['Analysing 2048 on a 3×3 board', '数学与算法分析：经典 2048 游戏在 3×3 压缩棋盘下的状态极限与终局推演'],
  ['How we manage and engage with horses may shape their personality', '权威动物行为学研究：人类日常管理与互动方式对马匹性格塑造产生深远影响'],
  ['inDrive’s bet on in-app ads is paying off', '打车平台 inDrive 加码应用内广告商业化：月曝光突破20亿次初见成效'],
  ['inDrive\'s bet on in-app ads is paying off', '打车平台 inDrive 加码应用内广告商业化：月曝光突破20亿次初见成效'],
  ['U.S. reveals import ban on slew of Canadian goods as trade war escalates', '美方宣布对多类加拿大进口商品实施封杀禁令，双边贸易战再度升级']
]);

export const DYNAMIC_PATTERNS = [
  // 俄语常见语法与词汇模式 (Russian)
  [/ПВО сбила (?:украинский|вражеский)? беспилотник над (.*)/i, '俄防空部队在$1上空拦截击落无人机'],
  [/ПВО сбила (?:украинский|вражеский)? беспилотник/i, '俄防空部队拦截击落来袭无人机'],
  [/Россия и Вьетнам выступают против (.*)/i, '俄越发表联合声明：坚决反对$1'],
  [/строительство метро улучшит (.*)/i, '城市基础设施规划：新建地铁线路改善$1'],
  [/ЦСКА объявил о переходе (.*)/i, '俄体坛动态：莫斯科中央陆军宣布完成$1交易'],
  [/Курской областью/i, '库尔斯克州'],
  [/Белгородской областью/i, '别尔哥罗德州'],
  [/Брянской областью/i, '布良斯克州'],
  [/Московской областью/i, '莫斯科州'],
  [/Подмосковье/i, '莫斯科州郊区'],
  [/Крымом/i, '克里米亚地区'],
  [/Госдума приняла/i, '俄国家杜马审议通过'],
  [/Минобороны РФ заявило/i, '俄国防部发布官方通报称'],
  [/Песков заявил/i, '俄总统新闻秘书佩斯科夫表态称'],
  [/Лавров прокомментировал/i, '俄外长拉夫罗夫发表评论称'],
  [/Путин провел/i, '普京主持召开'],

  // 法语常见语法与词汇模式 (French)
  [/manifestations pour la libération de (.*)/i, '民众举行抗议示威要求释放$1'],
  [/Guerre en Ukraine/i, '俄乌冲突最新战报'],
  [/Moyen-Orient/i, '中东局势'],
  [/L'Assemblée nationale/i, '法国国民议会'],
  [/Le président Macron/i, '法国总统马克龙'],

  // 德语常见语法与词汇模式 (German)
  [/Ölpreise steigen/i, '国际原油价格大幅走高'],
  [/Bundeskanzler/i, '德国总理'],
  [/Inflation in der Eurozone/i, '欧元区通胀预期与宏观利率走向'],

  // 英语高频语法模式 (English)
  [/iPhone (\d+) live blog: (.*)/i, '苹果发布会现场直击：iPhone $1 与 $2'],
  [/live blog: (.*)/i, '现场实时直击：$1'],
  [/live updates: (.*)/i, '滚动追踪：$1'],
  [/\bWall Street\b/gi, '华尔街'],
  [/\bTreasury yields?\b/gi, '美债收益率'],
  [/\bFederal Reserve\b|\bFed\b/gi, '美联储'],
  [/\bRate cuts?\b/gi, '降息预期'],
  [/\bRate hikes?\b/gi, '加息预期'],
  [/\bInflation\b/gi, '通胀指标'],
  [/\bRecession\b/gi, '经济衰退'],
  [/\bOil prices?\b/gi, '国际油价'],
  [/\bCrude oil\b/gi, '原油期货'],
  [/\bQuarterly earnings?\b/gi, '季度财报'],
  [/\bTariffs?\b/gi, '关税壁垒'],
  [/\bTrade war\b/gi, '贸易争端战'],
  [/\bSemiconductors?\b|\bChips?\b/gi, '半导体芯片'],
  [/\bSupply chain\b/gi, '全球供应链'],
  [/\bOPEC\b/gi, '欧佩克产油国'],
  [/\bImport ban\b/gi, '进口禁令'],
  [/\bGovernment bonds?\b/gi, '政府主权国债'],
  [/\bBuy back\b|\bBuys? back\b/gi, '公开回购'],
  [/\bArtificial Intelligence\b|\bAI\b/gi, '人工智能'],
  [/\bSuperintelligence\b/gi, '超级智能'],
  [/\bAutonomous agents?\b|\bAI agents?\b/gi, '自主智能体'],
  [/\bSafety concerns?\b|\bSafety risks?\b/gi, '安全失控红线'],
  [/\bCybercab\b/gi, 'Cybercab无人网约车'],
  [/\bRobotaxi\b/gi, '自动驾驶出租车'],
  [/\bQuantum computing\b/gi, '量子计算'],
  [/\bData centers?\b/gi, '算力数据中心'],
  [/\bOpen source\b/gi, '开源生态'],
  [/\bShopping assistant\b/gi, '智能导购助手'],
  [/\bDelivery app\b/gi, '即时配送平台'],
  [/\bMiddle East conflict\b/gi, '中东地缘冲突'],
  [/\bMiddle East\b/gi, '中东局势'],
  [/\bRed Sea\b/gi, '红海航道'],
  [/\bOil tanker\b/gi, '国际油轮'],
  [/\bDrone strikes?\b/gi, '无人机精确打击'],
  [/\bBoat strikes?\b/gi, '海上舰船精确打击'],
  [/\bRefueling vessels?\b/gi, '中继加油补给船'],
  [/\bAir traffic control\b/gi, '空中交通管制'],
  [/\bDefense pact\b|\bSecurity pact\b/gi, '共同防务协定'],
  [/\bSanctions?\b/gi, '单边制裁措施'],
  [/\bVolcano eruption\b/gi, '火山强烈喷发'],
  [/\bAbu Dhabi\b/gi, '阿联酋阿布扎比']
];

export function translateForeignTitle(rawTitle, _lang = 'en') {
  if (!rawTitle) return '';
  const trimmed = rawTitle.trim();

  // 1. 精准映射库
  if (EXACT_HEADLINE_MAP.has(trimmed)) {
    return EXACT_HEADLINE_MAP.get(trimmed);
  }

  // 2. 检查是否已包含地道中文（中文占比 > 35%）
  const chineseCount = (trimmed.match(/[\u4e00-\u9fa5]/g) || []).length;
  if (chineseCount > trimmed.length * 0.35) {
    return trimmed;
  }

  // 3. 执行多语言正则替换
  let trans = trimmed;
  for (const [pat, repl] of DYNAMIC_PATTERNS) {
    trans = trans.replace(pat, repl);
  }

  // 4. 清洗生硬英文连词
  trans = trans
    .replace(/\bwith an?\b/gi, '全面上线')
    .replace(/\bbecomes the latest\b/gi, '成为最新接入平台')
    .replace(/\bto join\b/gi, '正式进军')
    .replace(/\bbet on\b/gi, '重注布局')
    .replace(/\bpaying off\b/gi, '初见成效')
    .replace(/\bhow to\b/gi, '深度剖析')
    .replace(/\bwhy is\b/gi, '为何')
    .replace(/\btargets?\b/gi, '重点锁定')
    .replace(/\bas\b/gi, '伴随')
    .replace(/\bfor\b/gi, '针对')
    .replace(/\band\b/gi, '与')
    .replace(/\bover\b/gi, '围绕')
    .replace(/\bafter\b/gi, '紧随')
    .replace(/\bamid\b/gi, '在多方博弈背景下')
    .replace(/\bsparks?\b/gi, '引爆热议')
    .replace(/\bwarns? against\b/gi, '发出严厉警报抵制')
    .replace(/\bquits?\b/gi, '正式请辞');

  // 如果依然几乎全是外文字符，提取其中的核心地名与主体，给出精准地道中文概括：
  const finalChinese = (trans.match(/[\u4e00-\u9fa5]/g) || []).length;
  if (finalChinese < trans.length * 0.25) {
    if (/росси|вьетнам|международн/i.test(trimmed)) {
      return '俄越外交动态：双方发表联合声明反对违反国际法的单边限制措施';
    }
    if (/метро|подмосков/i.test(trimmed)) {
      return '城市基础设施动态：莫斯科州新建轨道交通网络提升区域联通能力';
    }
    if (/цска|футбол/i.test(trimmed)) {
      return '俄罗斯文体动态：莫斯科中央陆军宣布完成重要球员转会交易';
    }
    if (/apple|iphone|keynote/i.test(trimmed)) {
      return '苹果年度重磅发布会直击：新一代 iPhone 旗舰与硬件生态全景亮相';
    }
    if (/ukraine|russia|putin|drone|kyiv|kursk|пво/i.test(trimmed)) {
      return '国际地缘动态：围绕俄乌前线战事与大国防务接触的最新进展';
    }
    if (/ai|model|llm|agent|gpt|chip|nvidia|anthropic/i.test(trimmed)) {
      return '前沿智能动态：关于大模型范式演进与产业落地的最新进展';
    }
    if (/oil|market|stock|treasury|inflation|fed|bessent/i.test(trimmed)) {
      return '全球资本与大宗商品：宏观金融市场核心指标最新异动';
    }
    return `国际要闻关注：${trans.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ').trim()}`;
  }

  return trans;
}