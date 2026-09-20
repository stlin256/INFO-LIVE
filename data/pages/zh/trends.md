---
title: "社会热点与思潮"
nav: true
order: 4
description: "全球公众关切、网络社群热议与社会情绪热点深度透视"
notice:
  text: "🔥 实时追踪全球公众舆论、社区激辩与社会情绪光谱" 
  color: "theme"
---

# 🔥 全球社会热点、公众关切与网络思潮

:::important
### 🌐 全球公众心理与社群情绪综述

本板块只呈现已采集的社区文章、公开讨论与可追溯信源证据。热度、情绪与争议标签在有足够样本和交叉证据后再由编排流程生成，不以固定模板替代事实。
:::

## 📊 全球公众情绪与社会热度雷达

| 议题事件 | 关注热度 | 情绪光谱 | 底层社会与文化矛盾解构 |
| :--- | :---: | :---: | :--- |

## 💬 思想社区与网民观点争鸣

## 📰 社会民生、思潮与社群核心要闻

::::grid{cols=2}
:::cell
<div id="story-blog-260803-c4063dec7d9ea3c1" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1876" data-content-paragraphs="14" data-published-at="2026-09-20T21:13:51.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 05:13</span>
</div>

### [确定性核心，非确定性外壳](https://outdata.net/blog/260803)
<div class="original-title-sub"><span class="orig-tag">原文</span> Deterministic Core, Non-Deterministic Shell</div>

<div class="article-body" data-article-body="true"><p>十四年前，加里·伯恩哈特（Gary Bernhardt）提出了“函数式核心，命令式外壳”（Functional Core, Imperative Shell）这一概念。就像计算机领域大多数优秀思想一样，它并非全新之物，但他的构想极其清晰，为探讨现有系统中的测试与确定性打下了绝佳的基础。</p>
<p>简而言之，“函数式核心/命令式外壳”架构将代码分为两部分。函数式核心是纯函数的——也就是说没有输入输出（I/O），也没有破坏性的状态更新。它专注于应用程序的业务逻辑。命令式外壳包含的分支路径相对较少，但负责维护状态、协调外部依赖并与外部世界交互——也就是进行 I/O。它的职责是以输入值调用核心，接收黑盒决策结果所返回的值，并利用这些值与外部世界互动；无论是写入数据库、发送网络请求，还是更新图形用户界面（GUI）。</p>
<p>在这种模型中，外壳和核心具有截然不同的特征：</p>
<p>这使得核心非常易于测试。由于它是纯函数的，相同的输入将始终获得相同的结果。由于它是隔离的，不需要进行任何模拟（mock）或存根（stub）。而且由于它处理的是复杂的业务逻辑，测试能够让我们深入了解系统的具体行为。</p>
<p>用一种更简短的方式来描述让纯函数易于测试的特性，那就是它们具有“确定性”（deterministic）。也就是说——给定一系列输入流，纯函数始终返回相同的输出流；它们的行为是可重复的。但纯函数式编程并不是实现这一目标的唯一途径。如果我们换个角度思考，就会发现值流与一系列赋值语句不过是同一事物的不同表达方式，而状态机同样可以为我们带来相同的好处。试看以下代码：</p>
<p>函数 add 很容易推导理解；它是纯函数，因此具有确定性。但 AddMachine 同样具有确定性——给定对状态转移函数的相同调用序列，AddMachine 将返回相同的状态。它是命令式的这一事实并不会改变这一点。</p>
<p>纯函数式编程是一种优秀的范式，但出于语言或性能方面的考虑，它并不总是切实可行的——我可不想在 C 语言里尝试它！但如果我们将要求从“纯函数式”放宽至仅仅具备“确定性”，我们就能在保留“函数式核心，命令式外壳”可测试性优势的同时，拓宽其适用范围。因此便有了本文的标题：确定性核心，非确定性外壳。</p>
<p>相比函数纯度，确定性可能感觉是一个更抽象的概念。你如何一眼识别出它？我发现从“什么不是确定性的”入手反向推导会更容易。以下是非重复行为的一些常见例子：</p>
<p>所有这些都属于非确定性外壳。只要你在业务逻辑中发现了它们，你就找到了进行整理重构的绝佳切入点——要么围绕它们将函数拆分为两部分，要么将它们提升一层并将它们的结果作为参数注入。形象地将“外壳”这个隐喻从字面意义上去理解会很有启发；它应当包裹在业务逻辑周围，通过向应用程序的核心发起调用来获取所需内容。</p>
<p>你可能会想：“这一切听起来都很棒，但对于像我这样在工业界遗留代码和凭借直觉乱堆的代码堆里苦苦挣扎的人来说，这有什么用呢？”虚构的读者朋友，这是一个合情合理的质问；并不是每个人都能成为 FoundationDB，并从第一天起就划清这种界限（他们实际上走得更远，不过那是另一篇文章的主题了）。在我见过的几乎每一个现实代码库中，确定性与非确定性都高度交织在一起，而我见过的代码库可不算少。</p>
<p>但不要让完美成为优秀的敌人！理解你手头普通（即糟糕）代码库的一种方式是，把它看作拥有许多确定性核心。成千上万个核心散落在这堆乱码中，犹如夜空中的繁星。悲观的角度看，这些代码库是不可救药的遗留烂摊子；但乐观的角度看，里面隐藏着许多确定性核心，也许整理出来只有少数几个模块。</p>
<p>老一代 Windows 系统的用户可能还记得“磁盘碎片整理程序”；它把物理上散布在旋转硬盘各处的文件内容重新排布为连续空间。在那个读取速度取决于介质上物理距离的时代，这一点至关重要。</p>
<p>因此，处理现有代码的一种渐进式方法就是实践“确定性的碎片整理”。尽可能去识别确定性——文件、类、甚至是单个函数中的几行代码——并开始将它们收集归拢。能够聚集的确定性越多，你拥有的易于测试的功能就越多，你就对整个程序的行为和可靠性更有信心。“难以测试”（即非确定性代码）的暴露面开始缩小。在足够庞大的代码库中，你可能永远无法归结为一个单一的确定性核心，但哪怕整理成几百个，也远比散落成千上万处要好。</p>
<p>我见过的每一个乱作一团的代码库里，都深锁着一个或多个极其优雅的确定性状态机。我向你保证它们确实存在，哪怕并不显眼。一旦你找到了它们，你会惊叹于软件的修改和测试变得如此轻松。一点一滴，可靠性自能筑就。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>Gary Bernhardt在14年前提出了术语“Functional Core, Imperative Shell（函数式核心，命令式外壳）”。</li>
    <li>Functional Core/Imperative Shell 架构将代码划分为无I/O、无破坏性状态更新的纯函数式核心，以及负责协调外部依赖和处理I/O的命令式外壳两部分。</li>
    <li>来源叙事重点：主张将 Gary Bernhardt 的“函数式核心/命令式外壳”泛化为“确定性核心/非确定性外壳”，强调通过确定性状态机降低纯函数门槛，并倡导采用“确定性碎片整理”策略对工业界遗留代码进行渐进式重构。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://outdata.net/blog/260803" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ebsites-via-ad-collector-7362b503eb6d7f07" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1853" data-content-paragraphs="16" data-published-at="2026-09-20T17:43:10.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 01:43</span>
</div>

### [ChatGPT如今通过广告收集器获知你在其他网站的浏览活动](https://www.buchodi.com/chatgpt-now-knows-what-you-do-on-other-websites-via-ad-collector/)
<div class="original-title-sub"><span class="orig-tag">原文</span> ChatGPT now knows what you do on other websites via ad collector</div>

<div class="article-body" data-article-body="true"><p>任何在ChatGPT上投放广告的公司都会在自己的网站上安装一小段OpenAI的代码，就像零售商如今安装Meta和谷歌的追踪代码一样。加载该代码后，便会将__obi连同你正在浏览的页面数据一同发送给OpenAI。这些数据包括你搜索的商品、阅读的文章以及购买行为。</p>
<p>其核心事实在于，OpenAI可以将你在这些网站上的行为与其对应的ChatGPT账户关联起来。</p>
<p>我在自己的手机上复现了完整的机制，通过两种独立的抓包方法进行了验证，并与跨越1,029个主机名、涉及936个独立广告主像素代码的数月监测流量进行了交叉核对。</p>
<p>步骤1：ChatGPT创建一个标识符并进行签名。<br />在chatgpt.com上，客户端生成16个随机字节，并调用POST /backend-api/bazaar/obi/sync-token（登出状态下则调用/backend-anon/）。后端返回一个RS256格式的JWT：<br />sub代表账户，obi代表标识符。该令牌将二者绑定，作用域限定于收集器，并在60秒后过期。bzr代表bazaar，即OpenAI内部对广告平台的代称；wadi是签发服务。<br />客户端将{&quot;token&quot;: &quot;«JWT»&quot;}跨站POST提交至bzr.openai.com/v1/obi/sync。响应为：</p>
<p>步骤3：广告主网站将其回传。<br />共有三类请求从广告主页面发送至OpenAI的主机。在Cookie罐中存有__obi的手机上，这三类请求均携带了该标识符：</p>
<p>同款SDK还会从广告主页面收集身份信息。数据负载将这些信息区分为四种来源，且均由OpenAI自身标注：in代表广告主有意传递的数值，而fm、ht、js则代表SDK分别从表单字段、渲染页面文本以及标签管理器总线（tag-manager bus）中抓取的数值。在监测到的流量中，抓取到的身份信息数量超过了广告主主动提供的数量（685次事件对比255次）。</p>
<p>标签管理器总线是电子邮件地址的最大来源。SDK用自身函数替换了window.dataLayer.push，同时读取adobeDataLayer，并通过解析gtm.js脚本标签中的l=参数来定位被重命名的GTM层。当前版本会从中提取电子邮件和电话号码。在8月27日缩小抓取范围之前，0.1.31版本还会提取姓名和地理位置。</p>
<p>电子邮件、电话、名和姓在传输前会经过SHA-256哈希处理。国家、地区、城市和邮政编码则以明文形式发送。邮政编码是被收集最多的表单字段，在28个网站中累计出现100次事件。</p>
<p>URL在发送前会被缩减为来源加上路径；在监测到的23,929条记录中，没有一条携带查询字符串。但路径被完整保留了下来，抵达收集器的路径中包括某种医疗状况、债务解决方案漏斗以及诉讼受理登记表。</p>
<p>在具有已知配置的881个像素中，有638个启用了自动匹配功能，其中包括所有被监测到的信贷与借贷广告主。该功能由OpenAI的广告管理器（Ads Manager）控制。一份黑名单排除了密码、一次性验证码、卡号、社会安全号（SSN）、出生日期、病史、诊断以及法院相关字段。</p>
<p>__obi是唯一一个被配置为SameSite=None的OpenAI标识符。</p>
<p>在我的设备上，同一个__obi值从12个商业网站（涵盖13个不同的像素ID）发送给了OpenAI，其中包括Chewy、Wayfair、ThriftBooks、Eventbrite、HelloFresh、Coursera以及SeatGeek。每一次请求都得到了202状态码的接收确认。</p>
<p>在更大范围的流量中，30个不同的__obi值中有12个出现在多个广告主网站上，其中一个甚至出现在十家广告主网站中。</p>
<p>在解码的932个同步令牌中，736个携带了subject_type: account_user，196个携带了anonymous。匿名主体与账户主体一样稳定：每台设备一个，至少持续存在27天。</p>
<p>OpenAI将分析与营销作为两项独立的授权选项运营（oai_consent_analytics与oai_consent_marketing），而我解码的每一个同步令牌都携带着consent_decision: analytics_allowed。只要用户允许了分析并拒绝了营销，就会触发这一行为。</p>
<p>广告主对此无法察觉。__obi属于一个广告主脚本无法读取的域名。他们安装了转化追踪像素，却根本无从知晓其访客正被解析并关联至某一个具体的ChatGPT身份。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-21 01:43 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://www.buchodi.com/chatgpt-now-knows-what-you-do-on-other-websites-via-ad-collector/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-usergettingbored-vim-0a9bc09bd3a11c6d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="855" data-content-paragraphs="11" data-published-at="2026-09-20T17:18:49.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 01:18</span>
</div>

### [要闻：简而言之：Vim 有一个名为 UserGettingBored 的恶作剧自动命令（autocmd），它实际上不起](https://evanhahn.com/usergettingbored-vim/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Vim&#39;s UserGettingBored autocmd</div>

<div class="article-body" data-article-body="true"><p>简而言之：Vim 有一个名为 UserGettingBored 的恶作剧自动命令（autocmd），它实际上不起任何作用。</p>
<p>Vim 的自动命令功能通常缩写为“autocmd”，它允许你在发生各种事件时运行代码。例如，你可以通过将 TextChanged 事件绑定到 :w 命令来实现自动保存功能。</p>
<p>Vim 拥有 100 多个事件，从“缓冲区已创建”到“文件已保存”不一而足。但其中有一个事件引起了我的注意：UserGettingBored。官方文档中是这样描述的：<br />UserGettingBored：当用户连续按同一个键 42 次时触发。开个玩笑！:-)</p>
<p>看到这个时，我原本正在忙别的事情，结果思路完全被带偏了。我想：“我必须了解更多关于它的事情。”</p>
<p>以下是我的发现：</p>
<p>遗憾的是，它没有任何实际功能。它只存在于文档中（以及一些测试代码中）。如果你尝试通过类似 autocmd UserGettingBored ... 的命令来使用它，就会收到“no such group or event”（无此分组或事件）的错误提示。</p>
<p>它同时存在于 Vim、Neovim 以及 Vim Classic 中。</p>
<p>它最初由 Bram Moolenaar 于 2000 年 7 月添加，当时距离 Vim 6.0 发布还有一年多。最初的描述是：“当用户按下 CTRL-C 时触发。开个玩笑！”而且当时它就没有任何功能，所以我觉得它从未真正起效过。</p>
<p>2001 年 8 月，他在文档中添加了笑脸符号。描述随之变成了：“当用户按下 CTRL-C 时触发。开个玩笑！:-)”</p>
<p>十二年后的 2013 年，该描述变更为当前的版本：“当用户连续按同一个键 42 次时触发。开个玩笑！:-)”</p>
<p>2022 年，开发者 Mike Smith 受这个恶作剧自动命令的启发，制作了一个非官方插件。如果你在插入模式下连续按同一个键 42 次，就会出现一张塞缪尔·杰克逊（Samuel L. Jackson）的图片。22 年后，它终于成真了。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-21 01:18 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://evanhahn.com/usergettingbored-vim/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-tif-fork-actually-exists-95a07fa22228c694" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3362" data-content-paragraphs="31" data-published-at="2026-09-20T17:13:41.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 01:13</span>
</div>

### [一个处于积极维护与更新状态的 Motif 分支确实存在](https://www.osnews.com/story/145877/an-actively-maintained-and-updated-motif-fork-actually-exists/)
<div class="original-title-sub"><span class="orig-tag">原文</span> An actively maintained and updated Motif fork actually exists</div>

<div class="article-body" data-article-body="true"><p>Motif 很棒，我喜欢它的外观和手感，也希望它能得到积极维护。我希望有一个由 Motif 应用程序、甚至窗口管理器和桌面环境构成的健康生态系统，这样我就能运行一个真正的 Motif 环境。遗憾的是，尽管 Motif 已经开源了一段时间，但该项目本身在多年前就已经停滞，参与其中的人几乎没有任何活动。这种情况可能正在发生改变，因为去年有许多开发者决定亲自接手推进。</p>
<p>这个 Motif 分支诞生于保持 Motif（以及其他 X11 技术）生机与活力的愿望。Sourceforge 上的原始上游项目已有两年多没有任何活动，没有任何项目管理员至少在同等时间内保持活跃，官方问题追踪器已经彻底消失在虚无之中；用户论坛早在 2017 年就已关闭。遗憾的是，原始上游似乎已经放弃了该项目。</p>
<p>我合并了上游搁置多年的部分修复补丁、Gentoo 的另外几个补丁，并进行了我自己的少许改进。我打算维护这个分支，并借此倡导继续使用这个定义了一个时代、并影响了其后诸多用户界面的用户界面工具包。</p>
<p>参与其中的一部分人是我在网上认识的朋友，因此我对此分支能够经受住时间的考验抱有一些信心；但当然，管理这样一个复杂的项目是很困难的，所以谁知道这种热情能维持多久。不过，自一年多前创建以来，该分支已经发布了五个版本，这看起来很有希望。对某些人来说，对 Motif 抱有热爱可能显得很奇怪，但我就是那种会在运行 HP-UX 的 HP c8000 双 PA-RISC 工作站上安装自己不懂的古怪、过时的企业与工业软件，纯粹为了欣赏它们有时附带的 Motif 界面的人。我们每个人都有自己的怪癖。</p>
<p>根据我与网友交流的经验，我知道其实有相当数量的人和我一样。我希望在这个群体中的开发者能在某个时刻积累足够的临界规模，利用现有的那些零散的、仍然处于积极维护中的 Motif 项目（是的，它们仍然存在），构建出类似基础 Linux 发行版或桌面环境的东西。虽然希望渺茫，但在当今越来越多的用户对“现代”软件感到不适的计算格局下，我真切觉得这样的东西确实有存在的利基市场。</p>
<p>固然是一个非常小的利基市场，但终究是一个市场。</p>
<p>在 Mastodon 上关注我：@[email protected]</p>
<p>Emwm 是 Motif 的一个分支，添加了新功能。作者还创建了一些 Motif 应用程序，例如 toolbox（一个类似 Irix 的启动器）、xmsm（一个会话管理器）、一个文件管理器以及一个图像查看器。</p>
<p>Emwm 是一个窗口管理器，而不是工具包。Emwm 使用了 Motif。它的名字中就写着：“Enhanced Motif Window Manager”（增强型 Motif 窗口管理器）。</p>
<p>它就是我在文章中提到的那些仍在维护的 Motif 软件之一。</p>
<p>“遗憾的是，原始上游似乎已经放弃了该项目。”完全不属实。作为一个同时协助维护 Motif 和 CDE 的人，它并没有被放弃。问题在于多年来没有人向该项目提交过任何拉取请求（PR），而且开发者总共只有三个人。这个项目应该把他们的补丁发送给我们。</p>
<p>“问题在于多年来没有人向该项目提交过任何拉取请求”——我刚去 SourceForge 查看了代码仓库，上面有 11 个未处理的 PR……？</p>
<p>我对 Motif 继续存活并得到维护没有任何意见。只是对我来说回到那个界面太刺眼了。30 年前我刚开始使用 ‘nix 时它就不好看。那是 90 年代的 ‘nix，这是肯定的。NsCDE 是我在这方面能接受的极限了，它通过主题化来模拟 Motif。</p>
<p>“我希望在这个群体中的开发者能在某个时刻积累足够的临界规模，利用现有的那些零散的、仍然处于积极维护中的 Motif 项目，构建出类似基础 Linux 发行版或桌面环境的东西……”</p>
<p>我愿意为这样的发行版真金白银地付钱。举个例子，我很喜欢 CDE，但如果能有一个已经很好地整合在一起、开箱即用的 Motif 工具集，那将是极好的。</p>
<p>Motif 和 CDE 很棒。它们“看”起来不怎么样，但它们确实很棒。</p>
<p>Windows 95 中包含了很多这类元素，但在 Windows 2000 前后，微软就已经开始削弱它们了（工具栏是最先开始受害的）。</p>
<p>向同样喜爱 c8000 的同好致敬。</p>
<p>我一定是极少数喜欢 CDE 中 Motif 外观的人之一。也许只是因为我在 Solaris 上用了它太久了？不太确定，但我更倾向于选择它，而不是当今使用的几乎任何主流 Linux 或基于 UNIX 的 UI 工具包。</p>
<p>呃，我真搞不懂为什么有人会把时间和精力投入到像 Motif 这样死透了的无用之物上。</p>
<p>熟悉感能减少认知摩擦，怀旧情结会让陈旧的界面让人觉得比它们实际过去或现在的样子更为直观。</p>
<p>但 Motif 不仅仅是看起来糟糕。作为一个构建在 Xt Intrinsics 之上的编程工具包，它是出了名的差劲和繁琐。它极其啰嗦且重度依赖回调。糟糕的设计决策多到数不胜数！在 Motif 上，如今我们习以为常的许多功能都需要多层框架机制和间接配置。</p>
<p>Motif 和一些早期的 X 工具包长期以来一直被用作“如何不设计 GUI 框架”的典型反面教材，这是有原因的。</p>
<p>唉，我想总有人出于某种匪夷所思的原因喜欢它。</p>
<p>这些去掉了那些看起来非常笨重的凸起 UI 控件。</p>
<p>我同意你说的绝大部分观点，我也从不理解那些带着玫瑰色滤镜看待过去的人。然而，在超大屏幕上用基于 GTK4 的 LibreOffice 打开一个大型电子表格，试着仅用鼠标指针和垂直滚动条向下滚动（运气好的话，那滚动条大概有 2 毫米宽）——这简直是一场可用性噩梦。@Shiunbird 说得对：从用户的角度来看，MOTIF/CDE/GTK2 很容易理解和使用。</p>
<p>然而，在超大屏幕上用基于 GTK4 的 LibreOffice 打开一个大型电子表格，试着仅用鼠标指针和垂直滚动条向下滚动（运气好的话，那滚动条大概有 2 毫米宽）——这简直是一场可用性噩梦。@Shiunbird 说得对：从用户的角度来看，MOTIF/CDE/GTK2 很容易理解和使用。</p>
<p>应用程序的外观是非常主观的，每个人都有自己的偏好，然而许多现代 UI 设计师似乎完全忽视了可用性。这是存在问题的。即便你知道滚动条是如何工作的，它们用起来依然十分费劲。不可发现的 UI，以及缺乏视觉提示的控件……这些都为了极简主义而抛弃了可用性，而且我们似乎经历过一段大家在这方面竞相攀比的时期。再次强调，视觉偏好是一回事，但客观而言，可用性和一致性在此过程中确实变得糟糕了许多。我尤其讨厌明明屏幕分辨率如此之高、有着大量未被利用的留白，设计师们却依然觉得有必要把控件做得小到难以操作……我之前在旅行，被迫比平时更频繁地使用 Android 系统。其复制/粘贴机制存在缺陷，不仅会在不合适的时间被误触发，而且在真正需要时又呼不出来。诸如此类的事情在早期产品中尚可被原谅，但随着技术的日趋成熟，可用性始终没有成为关注焦点、长期存在的问题一直被忽视，这着实令我感到非常失望。</p>
<p>就拿我父亲来说，他已经完全接纳了语音交互，与触摸屏输入相比，这是一种效率更高的操作模式。这是缓解糟糕的触摸屏 UI 的一种途径，但显而易见会对周围的其他人造成干扰。</p>
<p>纯粹出于历史原因，我对 Motif 情有独钟，但作为一名开发者，我无法想象自己在 2026 年还会想要选择它作为我的图形界面（GUI）工具包。话虽如此，如果你用 Motif 开发出了一款出色的应用，人们依然能够使用它。毕竟 Xwayland 是切实存在的。</p>
<p>不过，CDE 作为桌面环境所面临的困境就要大得多了，因为将 X 作为你的图形界面来运行，未来将无法访问仅支持 Wayland 的应用程序。目前虽已有仅支持 Wayland 的应用程序，但数量并不多。我碰到过 Foot 终端模拟器。此外，任何基于 Iced 或 Cosmoe 库构建的应用都仅支持 Wayland。目前影响还不算大。但只要有一个仅支持 Wayland 的 GUI 工具包流行起来，这就将成为一个更大的问题。GTK5 可能会是第一个。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-21 01:13 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://www.osnews.com/story/145877/an-actively-maintained-and-updated-motif-fork-actually-exists/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ay-mosques-opening-doors-098d56a8f318d604" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="327" data-content-paragraphs="3" data-published-at="2026-09-20T15:00:18.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 23:00</span>
</div>

### [“恐惧开始消退”：为何英国的清真寺正向公众敞开大门](https://www.theguardian.com/society/2026/sep/20/fears-begin-to-fall-away-mosques-opening-doors)
<div class="original-title-sub"><span class="orig-tag">原文</span> ‘The fears begin to fall away’: why Britain’s mosques are opening their doors to public</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/5b892d043e00b513ff3937ed760ed7ba82f5d1c6/838_243_6369_5095/master/6369.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=27675b3f6ccf643ded961ed57db08d06" alt="“恐惧开始消退”：为何英国的清真寺正向公众敞开大门" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>随着针对穆斯林礼拜场所的袭击事件激增，本周末有100多座清真寺通过提供交流、美食与友谊，来打破并消除偏见。</p>
<p>在伦敦北部的一座清真寺，一名妇女曾对礼拜者大喊，称应该有更多他们的孩子被杀，就像加沙的孩子一样。在另一起事件中，建筑物的燃气管道被从墙体上扯下并遭到改动，导致泄漏的燃气在室内积聚。</p>
<p>这些只是伦敦伊斯兰文化协会（London Islamic Cultural Society）在过去三年中所遭遇的一系列事件中的一部分。然而，该清真寺不仅没有闭门退缩，反而将大门敞得更开。本周末，全英国有100多座清真寺邀请公众前来加深对伊斯兰教和英国穆斯林的了解，包括位于伦敦、伯明翰、谢菲尔德、曼彻斯特、格拉斯哥、绍森德和加的夫的寺庙，该清真寺正是其中之一。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-20 23:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/2026/sep/20/fears-begin-to-fall-away-mosques-opening-doors" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ftware-sandboxing-basics-0285d6725ea34976" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7072" data-content-paragraphs="72" data-published-at="2026-09-20T14:13:11.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 22:13</span>
</div>

### [软件沙箱技术：基础篇（2025）](https://blog.emilua.org/2025/01/12/software-sandboxing-basics/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Software sandboxing: The basics (2025)</div>

<div class="article-body" data-article-body="true"><p>涉足软件沙箱领域，就像是闯入一片大多未被探索的未知大陆。在软件中实现良好沙箱机制所需的零碎知识散落各处，先行者们尚未将足够的经验汇编成一张统一的世界地图（mappa mundi），来指引新水手走过那些已被充分理解的安全航线。在这篇博文中，我将分享自己在为 Emilua 开发沙箱支持时积累的经验。行文风格可能会略受影响，因为为了避免任何误解，我宁可显得有些过于絮叨和重复。</p>
<p>首先，让我们先为沙箱给出一个非正式（但很实用）的定义，以确保大家理解一致。以下是 Julien Tinnes 和 Chris Evans 在 2009 年马来西亚 Hack In The Box 安全大会上所使用的定义：<br />限制进程特权的能力：<br />无需机器上的管理员权限；<br />自主特权降级（Discretionary privilege dropping）。</p>
<p>这是一个非常适合展开讨论的极好定义。让我们快速逐项梳理，以便彻底厘清。不过请记住，我如今持有的观点与 J. Tinnes 和 C. Evans 在 2009 年演讲中的观点略有不同（尤其是在“是否可以调用超级用户 API？”这一点上），因此我的解释会稍有不同，并将引导你走向我认为更适合 2025 年的更佳实践。</p>
<p>操作系统向用户和软件开发者暴露的接口有所不同。系统管理员传统上依赖文件系统权限来隔离各种服务（UNIX 守护进程）。如果我们允许第三方程序随意修改此类权限，那么系统管理员最初试图强制执行的策略就会被彻底架空。</p>
<p>此外，第三方程序会抽象出属于自己的虚拟世界，而在大多数情况下，UNIX 文件系统权限并不适合用来为这些其他虚拟世界所需的安全策略建模。你会用 UNIX 权限模式来定义谁能查看你的 Twitter 动态或在 Identi.ca 上给你发私信吗？文件系统权限并不是系统管理员用来限制访问权限的唯一手段，但这里阐述的逻辑同样适用于这些其他控制旋钮。</p>
<p>尽管如此，进程不可避免地运行在操作系统之上，并且进程会与内核暴露的资源（例如文件）进行交互。对于软件开发者而言，至关重要的正是这一层接口。像 Firefox 这样的网络浏览器会运行 DRM 插件，而我们希望在运行此类第三方插件的同时，不赋予它们访问 Firefox 所能访问的一切文件（通常是用户 HOME 目录下的所有文件）的完全权限。像 setuidgid 这样的传统工具在此无能为力，它们的作用局限于作为系统管理员所求助的接口。setuidgid 及类似工具并不是供软件开发者使用的接口。</p>
<p>对于通过程序化方式进行特权降级，传统 UNIX 接口并不是个好选择，而在这一差距至关重要的操作系统上，通常会提供超越传统 UNIX 的扩展接口（例如 FreeBSD 的 Capsicum 和 Linux 的 Seccomp）。</p>
<p>当缺乏良好的沙箱接口时，程序员无论如何也会想方设法去构建沙箱，手段则是滥用仅供超级用户使用的机制。这一类中最具代表性的技术就是一个用于配置 chroot jail 的辅助 suid 二进制程序。</p>
<p>这些做法显而易见的问题在于，它们无法普遍适用于所有程序。允许任何程序安装 suid 二进制程序会彻底瓦解一切安全措施。Suid 二进制程序等同于将权限临时提升至对整个系统的完整管理权限。特权应当只减不增，绝不能增加（最小权限原则）。</p>
<p>这里另一个相关的顾虑是：不要设计那些会因呈指数级增加内核攻击面而适得其反的 API。Docker 的爆发式流行让 Linux 命名空间（namespaces）作为一种低成本隔离服务的机制广为人知。然而在嵌套的用户命名空间（user namespace）内，进程是以超级用户身份运行的（在该命名空间内），而内核中那些通常只对超级用户开放的代码路径，现在却对所有用户开放了。我们有超过十年的内核代码在编写时从未考虑过这一前提。这种设计决策在过去引发了安全问题，而且未来注定还会再次发生。引用 Andy Lutomirski 的话：<br />“我认为，能够利用 CLONE_NEWUSER 在任何网络命名空间上获取 CAP_NET_ADMIN，进而访问网络配置 API，是一个巨大的风险。例如，非特权用户可以配置 iptables。如果这其中没有特权提权漏洞，我就把帽子吃下去。”</p>
<p>只要你将此接口限制在可信的容器化工具（例如 Docker）中，允许使用用户命名空间是没有问题的。然而，Linux 命名空间对于软件沙箱来说却是一个极其糟糕的接口。Linux 中较新的沙箱接口（例如 Landlock）经过精心设计，不会呈指数级增加内核攻击面，从而避免我们在 Linux 用户命名空间中见过的那些灾难。此外，在 Linux 内部限制命名空间的新方法仍在开发中，长远来看，将其作为通用沙箱机制是一场糟糕的赌注。</p>
<p>我最初在 Emilua 上投入软件沙箱研究的前几年，完全聚焦于 Linux 命名空间。经历无数挫败之后，重心转向了其他解决方案。如今 Emilua 仍然提供对 Linux 命名空间的支持，但现在预期的应用场景是构建容器化工具。要在 Emilua 内实现真正的沙箱隔离，你将使用 Linux 命名空间以外的机制。</p>
<p>实际上，沙箱也可以定义为：<br />“一个受限且受控的执行环境，可防止潜在的恶意软件 […] 访问除软件已获授权之外的任何系统资源。”</p>
<p>对于一段代码必须具备哪些特征才能被视作处于沙箱中，实际上并不存在共识，相关定义通常非常宽泛。这些定义并不要求我们迄今为止所讨论的那些特性。因此，使用一个截然不同的术语或许会更恰当。J. Tinnes 建议使用“自主特权降级”（discretionary privilege dropping）。这正是我们在本文中将要探讨的沙箱类型。</p>
<p>自主特权降级并不能替代系统管理策略。相反，它们互为补充，应当协同采用。</p>
<p>现在，希望我们的认知已经达成一致。对我们而言，“沙箱”意味着同样的事情：自主特权降级。那么在现有的现实操作系统中，我们如何从一个未受沙箱保护的程序过渡到一个受沙箱保护的程序呢？在当今所有的主流操作系统中，特权边界都位于进程级别。凭证是与每个进程相关联的，内核正是通过检查这些凭证来决定进程是否可以使用环境授权（ambient authority）来获取新资源。</p>
<p>Linux 实际上有所不同，它在线程级别关联凭据（credentials），但立足于线程级别的设计根本行不通，这也是为什么即使内核对此处理得较为松散，glibc 也会额外去做跨线程同步凭据的工作。GNOME 开发者此前认为可以在线程级别工作，结果 CVE-2023-43641 的出现证明他们错了。</p>
<p>Adam Langley 实际上描述过一种理论上可以在线程级别运作的机制，但实践中其开销在经济上过于高昂，而且我认为它永远不可能真正行得通：</p>
<p>我们不要去空谈还有哪些替代设计可能可行了。就目前而言，进程就是我们拥有的工具。一旦我们将程序划分为独立的进程（隔离区），就可以进入后续步骤：</p>
<p>为每个隔离区（即进程）分配不同的权限。</p>
<p>处理隔离区之间的通信。</p>
<p>来自 FreeBSD Capsicum 项目的研究人员早在十多年前就建立起了开发沙箱的正确思维模型：</p>
<p>“隔离式应用程序开发本质上就是分布式应用程序开发，软件组件运行在不同的进程中，并通过消息传递进行通信。”</p>
<p>在各个平台上放弃特权（降权）的手段各不相同，因此我们先跳过这点，稍后再回过头来讨论。首先让我们聚焦于分布式应用程序开发这一问题。</p>
<p>Actor 模型是分布式系统开发中最著名的模式之一。Erlang 大概是其最具代表性的使用者。然而，Erlang 对 Actor 模型的关注点在于高可用性和容错能力。尽管如此，即便我们关心的既非高可用性也非容错能力，审视这些被广泛使用的模型依然很有帮助。</p>
<p>许多对 Actor 模型的解释往往很快就会步入数学的领域（这无可厚非）。然而，其中许多解释迅速迷失在抽象世界中，完全抛开了计算机本身（这可就不太好了）。因此，我们仅对 Actor 模型中我们关心的要点做个总结：</p>
<p>Actor 可以管理自己的内部状态。</p>
<p>Actor 可以派生（spawn）其他 Actor。</p>
<p>Actor 可以向其他 Actor 发送消息。</p>
<p>Actor 可以在消息中包含其他 Actor 的地址。</p>
<p>如果将 Actor 模型归纳为编程语言或框架内部的具体设计选择，我们关心的内容如下：</p>
<p>存在一个用于创建 Actor 的函数。该函数返回新 Actor 的地址。</p>
<p>Actor 的地址可用于发送消息。</p>
<p>Actor 的地址本身也可以作为一条消息，或更复杂消息的一部分。</p>
<p>存在一个用于接收消息的函数。该函数读取为调用方 Actor 排队等待的消息。</p>
<p>可以获取当前 Actor 的地址。</p>
<p>Actor 之间互不共享内存。</p>
<p>一个 Actor 不会与自身并行运行。如果一个 Actor 当前正在线程 A 中运行，它就不能同时在线程 B 中运行。不过，Actor 从一个线程跳到另一个线程是完全可以的（就像在采用工作窃取算法的线程任务调度器中那样）。这与 Boost.Asio 中描述的 strand（串行执行机制）属性相同。</p>
<p>对于 Emilua 来说，这种设计转化为了 3 个函数：</p>
<p>只要学会这区区 3 个函数，你就能基于 Actor 模型进行编码。现在让我们看一些示例：</p>
<p>如果我们决定将 Actor 模型用于沙箱化，那么每个进程就是一个 Actor。UNIX 域套接字（UNIX domain sockets）可用于 Actor 间的消息传递。派生出新的 Actor 时，我们会配置套接字继承，以便能与其进行通信。该套接字即为该 Actor 的地址。我们还需要能够在消息中包含其他 Actor 的地址，但这同样能够解决，因为通过 UNIX 域套接字发送文件描述符是可行的。收件箱（inbox）的文件描述符绝不会发送给其他 Actor（即我们拥有一个 MPSC / 多生产者单消费者通道）。</p>
<p>Emilua 对 Actor 模型有多种实现，因此在派生新 Actor 时，我们必须显式指示其使用子进程：</p>
<p>这种设计还解决了我们在沙箱方面关心的另一个问题：将资源移交给受限进程。“一切皆文件（描述符）”是 UNIX 文化中最广为人知的名言之一。如果我们能够发送文件描述符，那么沙箱化进程就能操作极其广泛的资源。仅举几例：</p>
<p>设备节点（例如 /dev/random、GPU 通信等）。</p>
<p>共享内存（memfd）。</p>
<p>进程句柄 —— pidfd、procdesc。</p>
<p>同步对象（例如 eventfd）。</p>
<p>这些就是我们在沙箱化程序时所关心的资源。这些也是我们在开发安全模型时需要考量的资源。只要我们能证明自己没有向错误的 Actor 泄漏文件描述符，我们就可以使用 Actor 模型。幸运的是，有一个经过充分研究的模型为我们解决了这一问题：基于能力的安全（capability-based security）。甚至还有一种基于 Actor 模型和基于能力的安全的编程语言：Pony 编程语言。</p>
<p>要将这两种模型结合起来，我们只需要填补一个小缺口：基于能力的安全假设令牌是不可伪造的，而 Actor 模型使用的是地址（地址是可伪造的）。在我们的场景中，通过使用通道（channel）代替地址，该问题已然迎刃而解。API 保持不变，使用者不会察觉到任何异样。现在我们可以利用“能力”来推导并思考如下问题：</p>
<p>Actor A 是否有可能对资源 X 拥有有效访问权？</p>
<p>我们该如何设计架构布局，从而使得任何沙箱化的 Actor 都不可能同时拥有对文件和套接字的访问权限？</p>
<p>至于将文件描述符用作能力（capabilities），经验法则是尽量避免使用 ioctl，不过我们稍后会回到这个话题。</p>
<p>Actor 模型使用起来很简单，但非常强大。能够在消息中包含其他 Actor 的地址意味着可以构建任意可变的拓扑结构。在我自己的大多数项目中，我通常只使用树状拓扑，但一旦树状结构不再适合我的项目，它也可以轻松被替换为其他拓扑。到目前为止，我还没碰到过任何无法用 Actor 建模的沙箱化应用程序。</p>
<p>如果你需要关于如何利用 Actor 模型开发分布式应用程序的指导，你会受益于数十年来在这方面积累的大量研发成果。无论你偏好书籍、简短教程、面授课程、学习小组还是其他许多学习途径，你都很可能会找到有用的资料。</p>
<p>既然我们已经通过 Actor 模型解决了通信问题，那么让我们再次回到沙箱化（安全模型）这一话题。一个对象要想被建模为“能力”（capability），还必须具备其他特性。能力不仅仅是对资源的引用，还包含关联的访问权限。拥有某项能力就等同于拥有执行相应操作的访问权限。明确了这一点，我们需要深入思考：</p>
<p>文件描述符可以被建模为能力吗？</p>
<p>将文件描述符用作能力时，我们必须采取哪些预防措施？</p>
<p>通常情况下，UNIX 系统仅在创建新的文件描述符时执行权限检查以允许或拒绝访问，而在使用现有的文件描述符时则不检查。这种行为与基于权能（capabilities）的设计是兼容的。以下是一个示例程序的代码：</p>
<p>以及当我以 root 身份运行该程序时的输出：</p>
<p>以及当我以任何其他用户身份运行该程序时的输出：</p>
<p>这正是前面提到的 UNIX 行为。现在让我们以 root 身份运行一些 shell 命令：</p>
<p>以及以不同用户身份运行相同的命令：</p>
<p>这里并没有什么令人意外的地方。完全是相同的行为模式。现在让我们以非特权用户身份运行 grep，但确保它继承了一个由 root 打开的文件描述符：</p>
<p>正如前文所述，UNIX 系统在对现有文件描述符执行操作时通常不执行权限检查。这就是为什么在此示例中 grep 能够成功读取文件内容的原因。对于之前的示例（针对常规文件的 read 操作）确实如此，但这是否始终成立？我们可能会担心新版本的内核。它们随时可能引入打破这一约定的新系统调用。然而，在 UNIX 历史的早期就引入了 suid 二进制文件的概念，这一历史遗产将不断警示内核开发者，确保他们不打破这一约定。现在让我们来探究一下 suid 二进制文件。</p>
<p>在上一个示例中，超级用户使用系统调用 setresuid 更改了进程凭据。现在我们将朝相反的方向进行：从非特权进程创建具有特权的子进程。这仅对 suid 二进制文件被允许，因此特权进程将始终只运行系统管理员信任的程序。su 就是其中一个这样的程序：</p>
<p>该示例表明，我们可以通过简单的文件描述符（fd）继承，轻易诱骗 suid 二进制文件读取或写入我们拥有的任何文件描述符。在此示例中，它利用特权进程的凭据写入了字符串“Password: su: Authentication token manipulation error”。如果写入进程的凭据对系统安全有任何决定性影响，那么每个 UNIX 系统早就千疮百孔了。因此，新接口的设计始终遵循写入进程的凭据根本无关紧要的原则。</p>
<p>再举一个近期的例子来进一步说明这一点：Linux 最近引入的某些系统调用与文件系统挂载有关。贡献的初始补丁集之所以被拒绝，是因为在操作中使用了系统调用 write，而该操作会利用调用进程的凭据进行权限检查。最终贡献者通过使用新的系统调用 fsconfig 更改了设计，补丁集才得以被接受。</p>
<p>需要注意的是，无论我们的 Linux 发行版是否允许 suid 二进制文件，内核开发者都会遵守这一约定。即使我们在操作系统中完全阻止 suid 二进制文件，我们仍可以假定没有任何攻击者能够将我们的进程作为代理来执行危险的写入操作以获取新特权（攻击者本就可以直接写入该文件描述符，效果是完全一样的）。</p>
<p>该规则的例外是 ioctl。对从不受信任的进程接收到的 fd 执行 ioctl 总是危险的。Emilua 依赖 Boost.Asio 进行异步 IO，而 Boost.Asio 过去曾错误地依赖 FIONBIO。在几封邮件交流后，我成功说服了 Christopher Kohlhoff 更改这一行为，现在只要你使用的 Boost 版本至少为 1.86，Boost.Asio 就会采取正确的处理方式。顺便提一句，即使是 isatty()——至少在 Linux 上——也是通过 ioctl 实现的，因此你确实需要对非标准操作保持谨慎。</p>
<p>太棒了。我们确实可以将文件描述符建模为权能，但我们并不是最先得出这一结论的人。</p>
<p>Capsicum 是一套用于更好地支持将文件描述符作为权能使用的接口，自 9.0 版本起成为 FreeBSD 的一部分。Capsicum 提供的设施之一是函数 cap_enter。cap_enter 通过完全禁用环境特权（ambient authority）来放弃进程权限。</p>
<p>就是这样。只需一次函数调用，我们就放弃了权限。所有系统访问都必须通过打开的文件描述符进行。如果我们尚未拥有对某种资源的访问权限，现在获取它的唯一途径就是通过收件箱（inbox）。如果我们尝试打开文件，open 将会失败，因为环境特权已被禁用。如果我们尝试将套接字连接到某个端点，该操作将会失败</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-20 22:13 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.emilua.org/2025/01/12/software-sandboxing-basics/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::