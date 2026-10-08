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
<div id="story--10-07-64-day-certs-html-a367a19c1bac15f8" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="853" data-content-paragraphs="9" data-published-at="2026-10-08T19:06:25.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-09 03:06</span>
</div>

### [64天证书有效期将于2027年2月生效](https://letsencrypt.org/2026/10/07/64-day-certs.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> 64-Day Certificate Lifetimes Coming Feb 2027</div>

<div class="article-body" data-article-body="true"><p>我们将在2026年10月14日于测试（staging）环境中切换为签发64天有效期的证书，以便进行测试。我们建议在生产环境正式生效前，先在测试环境中完成验证。</p>
<p>如果您的证书续期已实现自动化，且客户端支持 ACME 续期信息（ARI），那么您无需进行额外操作，因为 ARI 允许 Let’s Encrypt 主动告知您的客户端何时进行续期（您可以查阅 ACME 客户端文档，确认是否已实现 ARI）。</p>
<p>如果您的续期策略是硬编码距离到期前特定天数的，您应将其调整为在证书生命周期的约三分之二处进行续期。为64天有效期提前做好这一调整，将为2028年默认的45天有效期奠定基础。如果不确定，可以在 cron 定时任务、包装脚本以及运维手册中搜索（grep）常见的硬编码数值，例如 83、80 或 60。</p>
<p>我们还将把授权复用期从30天缩减至10天。到2028年，该复用期将进一步压缩至7小时。我们做出这一调整，是为了遵守2029年对最长验证复用期的削减要求，并免去“CAA 重新检查”的需要（即若验证数据超过7小时，我们必须重复执行部分验证流程）。除非您特意将 ACME 客户端设计为依赖验证复用，否则无需做出任何更改。</p>
<p>这也是实现证书管理流程（如重新加载和部署）自动化，并为续期失败增设告警通知的一个契机。</p>
<p>速率限制（Rate limits）不会受此变更影响；您可以查看我们之前的博文了解更多信息。</p>
<p>此变更不会影响 ACME 端点或我们的签发证书链。</p>
<p>我们转向更短的证书有效期，是因为这能降低密钥泄露和错误签发的风险。作为一家非营利组织，我们认为推行这一变革、提升全球所有网络用户的安全性是我们使命的一部分。我们预期这一过渡将会平稳进行，但如果您遇到任何问题，我们的社区论坛和官方文档都是很好的参考资源。</p>
<p>ISRG 是一家 501(c)(3) 非营利组织，其运作完全依赖认同我们普及、开放互联网安全愿景的各界慷慨支持。如果您愿意支持我们的工作，请考虑参与进来、进行捐赠，或鼓励您的公司成为赞助商。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>Let&#39;s Encrypt 将于 2026 年 10 月 14 日在 staging 测试环境中切换为签发 64 天有效期的证书以供测试。</li>
    <li>Let&#39;s Encrypt 证书生命周期将于 2027 年 2 月变为 64 天。</li>
    <li>来源叙事重点：宣布将逐步缩短 TLS 证书生命周期（2027年缩至64天，2028年缩至45天）及授权重用期限的时间表，强调此举对提升全球网络安全、降低密钥泄露风险的必要性，并指导用户通过 ACME 协议与自动化流程做好技术适配与测试。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://letsencrypt.org/2026/10/07/64-day-certs.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-abs-2610-08144-d9ae5a9e80693cef" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="549" data-content-paragraphs="1" data-published-at="2026-10-08T17:16:42.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-09 01:16</span>
</div>

### [纳维-斯托克斯方程“迷失在翻译中”：为何AI自动形式化的Lean验证不能保证自然语言证明的正确性](https://arxiv.org/abs/2610.08144)
<div class="original-title-sub"><span class="orig-tag">原文</span> Navier-Stokes lost in translation: Why Lean verification of AI autoformalisation does not guarantee correct natural language proofs</div>

<div class="article-body" data-article-body="true"><p>自动形式化（Autoformalisation）正越来越多地被用于验证数学文本，包括那些由人工智能生成的文本，正如 OpenAI 宣布的关于纳维-斯托克斯方程解的爆破解（blow-up）的证明。在这一过程中，AI 系统将文本从自然语言（NL）翻译为诸如 Lean 之类的形式化语言。一旦完成该翻译，形式化语言中表达的论证便能轻易地进行机械验证。本文旨在论证为何这一过程可能完全无法为原始自然语言论证提供可信度，其根源在于进行语义保真翻译时所面临的种种困难。特别是，我们强调，为了提供语义保真的翻译而必须解决的数学自然语言文本歧义消除问题，在可解性复杂度指数（Solvability Complexity Index, SCI）谱系/算术谱系中处于任意高位（SCI = ∞）。因此，通俗而言，提供语义保真的 AI 自动形式化比包括停机问题（其 SCI = 1）在内的任何计算问题都要更难。为了展示这一结果的影响，我们提供了实践中 AI 将自然语言陈述与证明错误翻译为 Lean 的若干实例，这些错误导致了自然语言证明与其 Lean“验证”之间的不匹配。其中包括 OpenAI 宣布的纳维-斯托克斯方程证明。具体而言，我们证明了该形式化 Lean 证明与纳维-斯托克斯方程解爆破的自然语言证明并不对应。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>自动形式化（Autoformalisation）正越来越多地用于验证数学文本，包括AI生成的文本，例如OpenAI宣布的纳维-斯托克斯方程解的爆破解证明。</li>
    <li>在自动形式化过程中，AI系统将文本从自然语言翻译为如Lean等形式语言，随后该形式语言表达的论证可被机械验证。</li>
    <li>来源叙事重点：聚焦AI将自然语言数学论证自动形式化（如翻译为Lean语言）并进行验证的方法论缺陷，强调自然语言数学歧义消解在理论上属于不可计算问题（SCI = ∞），并以OpenAI宣布的纳维-斯托克斯方程解爆破证明为例，揭示形式化证明与原自然语言证明之间存在脱节与误译</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://arxiv.org/abs/2610.08144" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-e-in-rust-error-handling-a94d11aad5926827" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2902" data-content-paragraphs="32" data-published-at="2026-10-08T14:43:19.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-08 22:43</span>
</div>

### [Rust 错误处理中缺失的一环](https://mcmah309.github.io/posts/the-missing-piece-in-rust-error-handling/)
<div class="original-title-sub"><span class="orig-tag">原文</span> The Missing Piece in Rust Error Handling</div>

<div class="article-body" data-article-body="true"><p>对于错误处理，Rust 已经具备了我大部分想要的功能：显式的控制流、作为值的错误，以及通过 ? 操作符实现的简洁传播。分歧主要出现在决定在 Result 的错误部分放置什么类型时。我们往往最终只能在两种方案之间做出权衡：一种是需要大量样板代码的精确类型，另一种则是掩盖了可能发生哪些错误但更便捷的类型。但精确度与便利性并不一定是相互竞争的目标。错误类型的组合应当像返回它们的函数一样轻松自然。</p>
<p>以从文件中读取服务器端口为例。读取操作可能会因 io::Error 而失败，而解析操作可能会因 ParseIntError 而失败。常规的实现可能类似于这样：</p>
<p>thiserror 消除了手动实现 Display、Error 和 From 的麻烦。但我们仍然必须决定这个枚举与程序中所有其他错误枚举之间的关系。</p>
<p>现在再加入加载主机地址、绑定套接字以及初始化数据库的操作。每个操作都有自己的错误。我们可以将这些枚举包装在另一个枚举中、将其变体展平成一个新的枚举，或者为整个 crate 提供一个庞大的全局错误类型。第一种方法会造成嵌套，第二种方法会产生转换代码，而第三种方法则意味着函数声明了其根本无法返回的错误。一个 I/O 错误也可能最终出现在几个不同的嵌套变体中，导致在更高层次上处理它变得不必要地棘手。</p>
<p>另一种做法是采用类似于 anyhow 的方式，这使得传播和附加上下文变得非常直接。当我们需要检查具体错误时可以进行向下转型（downcast）。然而，函数签名将不再告诉我们可能出现哪些错误类型，并且编译器也无法跟踪我们是否已经处理了所有的错误。</p>
<p>通常的建议是在库中使用带类型的错误，而在应用程序中使用不透明的错误。但应用程序同样需要带类型的恢复机制，而且库中通常也包含一些内部操作，其调用者只需要传播失败即可。有价值的区别在于调用者是否需要根据错误类型采取不同的行动。</p>
<p>我们真正想表达的其实很简单：这个函数可能会因 io::Error 或 ParseIntError 而失败。声明一个枚举是表达这一点的一种方式，但这种组合本身不应该需要声明一个新的类型。</p>
<p>我使用 eros 将其表示为一个错误集合。端口的示例变成了：</p>
<p>无需声明新的枚举或转换。为了复用，可以使用普通的类型别名为该集合命名：</p>
<p>eros::Result 是普通 Result &gt; 的别名。在这里，ErrorUnion 保存列出的错误之一。元组描述了可能的类型；它不会同时存储这两个错误。这是一种开放求和类型（open sum type）：我们描述了所需的组合，而无需为该组合声明一个新的具名枚举。</p>
<p>.union() 将普通 Result 的错误包装到 ErrorUnion 中，并从周围的代码中推断目标集合。如果我们从该签名中移除 io::Error，文件读取将无法通过编译。我们不会意外传播签名中未包含的错误。</p>
<p>当函数组合在一起时，这就变得更加实用了。假设我们还要加载服务器的主机地址。在 load_port 的基础上构建：</p>
<p>.widen() 将现有的联合转换为其集合包含所有可能错误的新联合。两个配置操作都可能返回 io::Error，因此我们只需列出一次。上下文可以描述具体是哪个操作失败了。</p>
<p>若试图拓宽（widen）到一个遗漏了某种可能错误的集合中，将在编译期被拒绝。调用者描述了组合后的可能性，而无需将每个函数的错误包装在另一层枚举中。添加另一个操作就意味着将其可能的错误添加到集合中，并且编译器会检查我们是否已经考虑了它们。</p>
<p>当处理某个错误能够将其从集合中移除时，声明精确的错误就会变得有用得多。</p>
<p>例如，假设我们的策略是：无论何时读取端口文件失败，都使用端口 8080，但仍然拒绝格式错误的内容：</p>
<p>返回类型现在只包含 ParseIntError。recover 会处理选定的错误类型并将处理程序的值转换为成功结果。其他错误则原样传递。</p>
<p>这是我认为最有用的部分。签名描述了在执行恢复策略之后仍可能发生哪些错误。调用者无需知道其底层某个地方可能发生过 I/O 错误，因为该错误已经被处理了。</p>
<p>我们还可以恢复一组错误类型。如果无法读取的文件和无效的数字都应该使用默认值，则可以移除所有可能的错误：</p>
<p>在恢复之后，Result 具有空的错误集合 ()。.into_value() 提取该值，并且仅在没有剩余的可能错误时才能通过编译。</p>
<p>有时调用者没有有用的恢复策略。它只需要传播错误或在程序顶层进行报告。在该签名中携带每一种可能的错误类型可能只是噪音：</p>
<p>如果不使用元组，错误集合默认使用 AnyError。带类型的结果同样可以通过 ? 流入这种兜底形式中：</p>
<p>我们可以让底层函数保持精确，以满足需要进行恢复的调用者，同时允许其他调用者通过更简单的签名传播相同的错误。上下文和回溯信息在此转换中均得以保留。</p>
<p>这种选择可以在每个边界处做出。我们无需将整个库或应用程序限定在某一种方法中。在调用者需要基于类型做出决策的地方保留类型，在调用者只需要传递失败的地方抹去类型。</p>
<p>精确的错误类型并不能告诉我们正在读取哪个文件或为什么读取。PermissionDenied 对于做出决策很有用，但我们仍需要路径和操作来理解失败的原因。</p>
<p>这些信息应当在错误于程序中传递时随之携带。例如：</p>
<p>如果文件包含无效数字，报告如下：</p>
<p>原始错误仍为主消息，各操作按其添加的顺序列出。</p>
<p>我通常更倾向于让函数描述自身的操作和相关输入。这样每个调用者都能获得该上下文。当调用点了解被调用方不知道的信息时，也可以添加上下文。我们可以将导致失败的操作连同失败一起报告一次。</p>
<p>类型告诉我们应用何种恢复策略。上下文告诉我们在无法恢复时发生了什么。我们应当能够在不必每次错误穿过另一个函数时都构建一个新的错误枚举的情况下，同时保留这两者。</p>
<p>我之前曾通过 error_set 探索过精确错误集合。至今仍让我感兴趣的是，要实现这一点，Rust 现有的错误处理机制几乎不需要做出什么改变。我们依然返回 Result，通过 ? 传播，并将错误作为值来处理。缺失的一环是让可能的错误在程序中传递时易于组合和缩减。</p>
<p>这也是为什么我认为，只要搭配合适的构建机制，Rust 的错误处理就近乎完美。每个函数都能描述其调用者需要推理分析的错误。我们可以在有实用处理策略的地方处理这些错误，在没有策略的地方简化函数签名，并保留理解故障所需的运行时上下文信息。当精确的错误处理契合我们原有的函数组合方式时，用起来就会轻松得多。正因如此，eros 让我爱上了错误处理（此处为双关语）。<br />eros 的源码和 README 已在 GitHub 上提供。<br />Zig 原生的错误集（error sets）遵循同样的理念：<br />|| 用于合并错误集，而 try 像 ? 一样传播错误。当返回类型写为 !u16 时，Zig 还可以自动推断该集合。<br />Zig 的错误码不附带任何载荷数据（payload）。而在 Rust 中，我们可以在保持相同可组合性的同时，携带实际的数据：</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-08 22:43 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://mcmah309.github.io/posts/the-missing-piece-in-rust-error-handling/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-and-and-wales-data-shows-e07cb881cd53acb2" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="253" data-content-paragraphs="3" data-published-at="2026-10-08T13:29:47.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-08 21:29</span>
</div>

### [数据显示英格兰与威尔士种族和宗教仇恨犯罪创历史新高](https://www.theguardian.com/society/2026/oct/08/racial-and-religious-hate-crimes-at-record-high-in-england-and-wales-data-shows)
<div class="original-title-sub"><span class="orig-tag">原文</span> Racial and religious hate crimes at record high in England and Wales, data shows</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/f808d6d9f49661e91e36235f2fd417691b7b342f/1433_638_5836_4671/master/5836.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=ec26ea8856d53dbfc7f7b5f98de8e022" alt="数据显示英格兰与威尔士种族和宗教仇恨犯罪创历史新高" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>截至3月的12个月内，针对穆斯林的犯罪增幅最大——增加了15%——而针对犹太人的仇恨犯罪增加了10%</p>
<p>英国出于种族和宗教动机的违法犯罪行为已创下历史新高，与此同时，英国政府应对伊斯兰恐惧症的主要合作机构表示，针对清真寺的袭击严重程度正不断加剧。</p>
<p>英国内政部数据显示，在截至2026年3月的一年中，警方共记录了146,825起仇恨犯罪——在过去一年中增加了7%。针对穆斯林的犯罪增长最多——增加了15%，从4,479起增至5,132起；而针对犹太人的仇恨犯罪增加了10%，从2,874起增至3,162起。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-10-08 21:29 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/2026/oct/08/racial-and-religious-hate-crimes-at-record-high-in-england-and-wales-data-shows" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-blog-2026-extending-guix-18a46560c0296687" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1620" data-content-paragraphs="26" data-published-at="2026-10-08T13:20:22.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-08 21:20</span>
</div>

### [扩展 Guix](https://guix.gnu.org/en/blog/2026/extending-guix/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Extending Guix</div>

<div class="article-body" data-article-body="true"><p>塞尔希奥·帕斯托尔·佩雷斯（Sergio Pastor Pérez）— 2026年10月8日</p>
<p>Guix 的核心宗旨在于赋能用户，因此人们可以用新的 guix 命令对其进行扩展也就不足为奇了。你可以通过 help 命令查看当前 Guix 中可用的命令：</p>
<p>如果你使用的是较新版本的 Guix，手头已有大量扩展可用；它们既作为独立软件包提供，也作为包含一系列扩展的元软件包（meta-package）提供。你可以通过以下方式试用它们：</p>
<p>我之所以将 guix 和 guile 软件包添加到 shell 中，是因为我们希望在 shell 中调整不同的 Guile 和 Guix 搜索路径。如需详细了解为何需要这样做，请阅读《搜索路径》（Search Paths）。</p>
<p>既然这篇博文名为“扩展 Guix”，那我们就来写一个扩展吧，好吗？</p>
<p>Guix 通过查找 GUIX_EXTENSIONS_PATH 来定位扩展。最近，Guix 引入了一种编写扩展的新方法。旧方法会在 /path/to/guix/extensions 下搜索扩展，且扩展模块的命名为 (guix extensions NAME)。新架构则要求扩展位于 /path/to/SCHEMA_VERSION 路径下；模块名称仍为 (guix extensions NAME)。</p>
<p>这种新架构的优势在于，Guix 可以将扩展模块视作标准的 Guile 模块，这意味着运行时环境能够找到该扩展编译后的 .go 文件。旧架构依赖于运行时求值；加载机制无法处理编译后的文件。这带来了相当可观的性能提升，因此建议大家将所有旧扩展更新为新架构。</p>
<p>介绍已经足够，让我们来编写一个基础扩展。</p>
<p>第一步是创建项目结构。请记住，扩展机制要求模块命名为 (guix extensions NAME)。</p>
<p>我们首先在项目根目录下为扩展创建目录。</p>
<p>现在，我们创建文件 guix/extensions/hello.scm，内容如下：</p>
<p>我们导入 (guix scripts) 以获取 define-command 宏。我们对其进行声明并导出，以便扩展机制可以在模块的公共接口中找到该命令。</p>
<p>至此，我们已经拥有了一个可运行的 Guix 扩展。我们可以在项目根目录下像这样运行该扩展。</p>
<p>我们将使用 (srfi srfi-37) 来编写选项解析器，并使用 (guix ui) 处理国际化字符串；当我向你展示完整扩展时，你会看到我导入了这些模块。让我们先关注选项定义：</p>
<p>由于我们仅处理用于显示帮助信息的参数，因此只需在命令开始时调用解析器即可：</p>
<p>以下是完整的扩展模块：</p>
<p>这样，当我们向 Guix 请求帮助时，我们的扩展就会出现在列表中：</p>
<p>它还支持 --help 参数选项：</p>
<p>截至撰写本文时，我们还没有专门用于扩展的 Guix 构建系统（build-system）。所幸，guile-build-system 已经十分契合此使用场景。</p>
<p>让我们为使用了本地源代码的新 hello 扩展创建一个软件包定义。在项目根目录下创建一个 guix.scm 文件，内容如下：</p>
<p>我们可以像这样测试这个新扩展：</p>
<p>传递给 guix shell 的标志如下：</p>
<p>由于本示例使用了新的扩展方案，你所运行的 guix 命令版本必须处于提交 de069958fc 或更新版本。</p>
<p>我希望这篇关于 Guix 扩展的简要介绍对你有所帮助，并希望你开始编写自己的 Guix 扩展。</p>
<p>我想鼓励每一位读者将自己的扩展提交到 guix-extensions 的 Codeberg 组织中。该设想是让该组织成为大家共同参与为社区开发实用扩展的中心枢纽。</p>
<p>除非另有说明，本站上的博文版权归其各自作者所有，并根据 CC-BY-SA 4.0 许可证以及 GNU 自由文档许可证（1.3 或更高版本，无固定段落、无封面文字、无封底文字）条款发布。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-08 21:20 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://guix.gnu.org/en/blog/2026/extending-guix/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-suarina-linux-experiment-228586479c81b711" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1677" data-content-paragraphs="11" data-published-at="2026-10-08T13:08:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-08 21:08</span>
</div>

### [要闻：我没料到这会成为项目发布公告之后的第二篇博文，但事实已然如此](https://casuarina.org/news/ending-the-casuarina-linux-experiment/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Ending the Casuarina Linux Experiment</div>

<div class="article-body" data-article-body="true"><p>我没料到这会成为项目发布公告之后的第二篇博文，但事实已然如此。简而言之，我已决定逐步停止 Casuarina Linux 项目。在2026年10月底之前，一切将维持现状。在那之后，视我向其他发行版的迁移进展而定，软件包更新将会停止。基础设施将一直维持运行至2026年底，之后我可能会关停部分设施。目前没有下线软件包仓库或网站的计划。</p>
<p>正如在问答（Q&amp;A）中所暗示的那样，我就是那只完全不知道自己在做什么的俗谚里的狗。我原以为在历经千难万险完成了引导（bootstrap）系统的所有改动之后，最艰难的部分就已经结束了，从那以后维护工作主要就是更新软件包。我还以为这个发行版至少能引起两三个人的兴趣，大家可以分担维持其运转的负担，但这并没有发生。</p>
<p>在实践中发生的情况是，在发布当天就有人提醒我注意：C++ 标准库无法共存。我的配置是将所有东西针对 LLVM 的 libc++ 进行构建，同时提供 GNU libstdc++ 以保证兼容性，但这无法保证在某个应用程序最终同时加载两者时能够正常工作。在实践中，我使用的一款面临此问题的专有软件（Beyond Compare）运行正常。不过这依然是一个需要修复的问题。</p>
<p>此外，在同一天，q66（Chimera Linux 的创建者）发表了一些“关于 Chimera 与 glibc 兼容性困扰”的看法。这非常有洞见且充满智慧。其中有两段话真正触动了我：</p>
<p>“或者，你可以直接接受现状，并致力于让你希望支持的东西正常工作；在用户空间（userland），你有容器等手段，可以利用它们来让尚未支持的东西正常工作（或用于专有软件），而且有办法让这个过程相当无缝；我更希望看到精力被投入到改进我们现有的东西上；但我无法对此感到完全高兴，因为这某种程度上拆解了我倾注了大量心血的东西，并在这一过程中把它变成了我明确想要避免的样子。”</p>
<p>特别是后半部分，我此前从未从他们的角度思考过这个问题。在面临不得不将 libc++ 换成 libstdc++，以及反思引导系统所必需的变更时，这非常有道理。例如在 LLVM 之外，将 gcc、gmp、mpc、mpfr 和 GNU binutils 引入引导路径。同时也有一些东西丢失了，比如交叉编译以及完全静态的二进制文件（特别是 apk）。</p>
<p>在过去四个月里，所有这些想法都在我的脑海中不断回荡，期间我一直使用该系统进行日常工作，并紧跟从 Chimera 拉取软件包更新的节奏。然而在这段时间里，我没能鼓起动力去解决 C++ 标准库的问题，也没有动力去处理我遇到的其他一些问题。</p>
<p>而且随着时间的推移，我越来越怀疑自己是否真的希望其他人使用这个系统。每增加一个用户，就意味着多了一个人可能会向我反馈我尚未想出解决办法的合规问题，或者是我在有空闲时间时并不真正想花时间去解决的问题。</p>
<p>事后回想，其中一些问题完全是百分之百可以预见的。如果我不想让别人使用它，我当初为什么还要公开呢？我想我当时没有完全想清楚。它对我来说运行良好，对其他人肯定也一样。显然这是天真的想法，我现在明白了。</p>
<p>从一开始，Casuarina 就被描述为“具有实验性质但可用”，因此我现在宣布实验结束。我对发行版如何构建、如何运作、glibc 的一些优缺点、调试构建失败、段错误（segfault）、Buildbot 等等各方面的理解都加深了。在搭建网站的过程中我也体会到了很多乐趣。虽然我收获了许多知识，但显然我仍有许多需要学习的地方，并且我觉得自己没有能力担任一个供他人使用的发行版的主要维护者。</p>
<p>所以目前而言，Casuarina 已经走到了终点。我目前的计划是将我的主工作桌面（用于工作及个人计算）迁移到 Chimera，并从2026年10月底开始切换过去。从那时起，我将停止进行 Casuarina 的软件包更新。我将把论坛设为只读状态，并更新网站以明确实验已经结束。其余基础设施将保持运行至2026年底，之后部分设施可能会被退役或重新挪作他用。我计划在可预见的未来内保留软件包仓库和网站的在线状态。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-08 21:08 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://casuarina.org/news/ending-the-casuarina-linux-experiment/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-1096028-7524dbcae1be7205-a3aa555e0f08d6a5" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5053" data-content-paragraphs="32" data-published-at="2026-10-08T09:04:32.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-08 17:04</span>
</div>

### [超越引用符号（&amp;）](https://lwn.net/SubscriberLink/1096028/7524dbcae1be7205/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Beyond the &amp;</div>

<div class="article-body" data-article-body="true"><p>Rust 拥有多种智能指针，既包括标准库提供的，也包括用户自定义的。然而，内置引用所支持的某些操作，用户自定义智能指针却无法实现。Rust 项目语言团队负责人 Tyler Mandry 在 RustConf 2026 上发表演讲，介绍了为改变这一现状、让智能指针拥有与内置引用同等灵活性而展开的长期工作。</p>
<p>Mandry 表示，整个 2026 年期间，他一直与语言团队中其他几位对此感兴趣的成员合作，在一个名为“Beyond the &amp;”（超越 &amp;）的项目下攻坚这一难题。这需要大量的思考与推敲，但他们最终确立的设计方案，将使用户对指针与引用的工作机制拥有显著简化的心智模型。为了展示该设计所要解决的问题，他展示了一个简化的 Rust 程序示例：该程序计算某些动态内容并将其缓存在哈希表中。该示例使用了 Rust 的 map-entry API，其中提供了一个名为 or_insert_with() 的函数，该函数接收一个回调函数，以便在哈希表条目为空时进行填充。</p>
<p>这段代码在哈希表中查找缓存键（name），如果存在则返回缓存值的副本；如果不存在，则通过将 name 代入模板进行计算。共享状态是通过内置的可变引用 &amp;mut RenderState 来访问的。该示例可以正常运行，但无法安全地在多线程之间共享。而为了让缓存能够跨线程共享而引入互斥锁（mutex）后，借用检查器却拒绝编译该程序：</p>
<p>Mandry 解释说，原始代码之所以能正常工作，是因为借用检查器能够追踪到 state.cache 和 state.template 是相互独立的字段，因此同时访问它们是安全的。引入互斥锁后，借用检查器看到的只是对 MutexGuard 结构体的不透明访问，再也无法判断这些访问是不相交的——它必须防范一种情况：即当回调函数正在读取状态时，可变借用同时被用于修改状态，从而引发潜在的非法数据竞争。在这种情况下，一种简单的修复方式是对 MutexGuard 进行一次解引用，并对其背后的结构体进行重新借用（reborrow）：</p>
<p>这样做构造了一个全新的内置引用，就像原始代码中所使用的那样，因此借用检查器能够再次识别出这些访问互不干扰。这虽然能解决问题，但并不够直观。Mandry 表示，这类复杂性正是导致 Rust 学习曲线陡峭的原因之一。如果像 MutexGuard 这样的用户自定义指针类型的行为能更贴近内置引用，情况就会好得多。</p>
<p>他继续说道，指针类型无处不在，而且它们的语义都略有不同。有些指针不能安全地解引用（裸指针），有些可以写入但不能读取（MaybeUninit）等等。这展现了 Rust 的多功能性，但也使得很难构想出一种能够兼容众多可能指针类型的设计方案。</p>
<p>语言团队在 Nadrieril 和 Benno Lossin 的工作基础上确立的解决方案，是将编译器内部关于“位置”（place）的概念暴露给用户代码。位置是 Rust 中与 C 语言左值（lvalue）对应的概念：即可从中读取值或向其写入值的位置。位置与指针的区别在于，位置是存在于编译期的抽象表达式，例如 state.cache；而指针则是在运行时表示位置的一种方式。</p>
<p>该方案的核心思路是为每种智能指针创建一个新的句柄类型（handle type）。通常，该句柄只是对指向同一位置的不安全指针的简单包装。随后，编译器会自动创建句柄来表示程序中所引用的位置。这使得用户代码能够为句柄类型实现特定的 trait，从而影响借用检查器与对应自定义智能指针的句柄之间的交互方式，且具有比现有的 Deref 和 DerefMut trait 更高的灵活性。为了展示其具体形态，Mandry 演示了库作者可以如何指导借用检查器处理对通过 NonNull 指针访问的位置的写入操作：</p>
<p>WritePlace trait 用于告知借用检查器某种特定句柄（在此例中为引用 NonNull 指针的句柄）是否可以被写入以及如何写入。当 SAFE 设置为 false 时，借用检查器会将对关联位置的写入视为 unsafe 操作。实际的写入会直接转发给 NonNull 所包装的裸指针。整个 trait 实现都是 unsafe 的，因为 trait 的错误实现可能导致借用检查器做出错误判断，进而导致未定义行为（unsoundness）。</p>
<p>与之相对应的 ReadPlace trait 则编码了如何从句柄中读取数据。更引人注目的则是 ProjectPlace 和 BorrowPlace。前者用于告诉借用检查器如何将包含结构体的位置转换为包含其某个字段的位置。例如，当程序员编写 state.template 时，如何将（MutexGuard 的句柄）转换为 MutexGuard。后者则告诉借用检查器如何创建一个借用给定位置的新智能指针，其作用方式就像 &amp; 针对内置引用一样。</p>
<p>语言团队目前仍在讨论使用 BorrowPlace 创建新智能指针的具体语法应该是什么。尽管它可以重用 &amp; 符号，但这可能会造成混淆，并加大类型推断的难度。有一种提案建议改用 @ 符号，但大家对此也并非完全满意。无论最终敲定何种语法，BorrowPlace trait 都编码了借用检查器安全处理该指针类型所需的所有信息。这意味着，目前内置的行为也可以通过同一机制来定义。例如，针对内置引用类型 &amp;T 的实现大致如下：</p>
<p>这为用户提供了如何编写自身行为类似于引用的智能指针的范例，同时也为标准库维护者提供了一个形式化记录现有反直觉内置行为的地方。通过为 MutexGuard 实现类似的句柄类型，前面提到的 render_page() 示例便可在没有任何错误的情况下正常运行。Mandry 将其评价为“在这一示例中只是一处微小的代码变动，但却带来了巨大的语义转变”。</p>
<p>然而，将智能指针与编译器现有内部机制更紧密地结合在一起还会带来其他好处。目前，人们可以对引用背后的值进行模式匹配，但无法对智能指针背后的值直接进行模式匹配——除非先解引用该指针并重新借用其背后的值。BorrowPlace 所暴露的细节足以让编译器安全地实现这类模式匹配。</p>
<p>曼德里（Mandry）表示，语言团队在新特性中寻求的标准之一是可组合性：即该候选特性与语言现有结构的融合程度如何，以及该特性的多次使用之间能够多好地相互组合。句柄（handles）与位置（places）“组合得非常漂亮”，因为这只是将编译器理解和处理该语言的既有内部细节暴露出来。</p>
<p>尽管如此，将位置和句柄暴露给库代码目前仍处于原型阶段。曼德里呼吁大家协助确保该设计适用于所有人的用例；他希望听众查阅设计文档，并补充自己遇到的具有特殊语义的智能指针示例。“如果你拥有希望更深入集成到语言中的抽象，请尝试此方案并告知我们遇到的任何阻碍，以此来帮助我们。”</p>
<p>他打算进一步完善的设计的下一部分是错误提示和诊断信息。理想情况下，用户绝不应该看到提及新添加特征（traits）的错误；这些特征将保持在内部，而错误信息将直接解释问题所在，就像对内置引用的报错一样。尽管在该特性成为语言的稳定部分之前还有很多工作要做，但曼德里对这一设计持乐观态度。“我的希望是，它能让库使 Rust 变得更加强大和友好。”</p>
<p>一位现场听众想知道该设计是否还会支持破坏性模式匹配（destructive pattern matching，即在将值与可能模式进行匹配的同时获取其所有权，并将其拆解为各个组成部分的组合操作）。曼德里表示会支持，前提是开发者为相应的句柄实现了 VariantPlace 特征。他说，要支持句柄类型上的每项操作，需要实现六到八个操作，而这正是其中之一。</p>
<p>另一位听众询问该设计是否也普遍适用于枚举。曼德里停顿了一下，凝视空中片刻，然后发出了一声犹豫且拖长的“是的”。他进一步阐述道，一般来说，从枚举中投影一个字段可能不可行，但该方向已经开展了一些探索性工作。例如，是否应该允许从 Option 内部投影一个字段以获取该字段值的 Option？“我不知道答案，但这是一个有趣的问题，”曼德里在演讲时间即将结束前说道。</p>
<p>[ 感谢 Linux 基金会（LWN 的差旅赞助商）资助前往蒙特利尔参加 RustConf。 ]</p>
<p>当然，目前已经可以通过结合使用 Option::as_ref()/as_mut() 和 Option::and_then() 来实现这一点，但这正是他们试图摆脱的那种不直观的重新借用把戏：<br />let foo: Option = ...; let bar: Option = foo.as_ref().and_then(|x| x.bar);</p>
<p>如果能直接这样写，体验会好得多：<br />let foo: Option = ...; let bar: Option = &amp;foo.bar;</p>
<p>但这也许走得太远了，因为 &amp;foo.bar 看起来显得完全不会失败（infallible）。在实际代码中不会有这些类型注解。我能理解为什么在这里可能更倾向于使用不同的语法。<br />let foo: Option = ...; let bar: Option = &amp;mut foo.bar; let bat: Option = &amp;mut foo.bat;</p>
<p>这段代码应该完全安全，因为这些 &amp;mut 借用互不相交。目前借用检查器还无法理解这一点。Option 本质上只是另一种形式的智能指针，这在概念上与 MutexGuard 的例子没有区别。</p>
<p>&gt; 但这也许走得太远了，因为 &amp;foo.bar 看起来显得完全不会失败。<br />实际上，它确实不会失败。但我明白你的意思。如果没有类型注解，这确实会立刻让人感到困惑。</p>
<p>我手头实际上就有一个互不相交的可变访问会导致问题的案例。我特意把该结构体放进了一个嵌套的内联模块中，就是为了防止发生意外访问。因此字段投影是可行的，因为这些字段对任何使用它们的代码都是私有的；但是，任何类似于“哦，你可以通过 &amp;mut 并发使用这两个方法，因为它们使用的不是同一个变量”的隐式规则都会带来麻烦。</p>
<p>基本上，存在一个 RwLock 的读半部分（我希望它能受到严格限制，但它实际上仅用于读取）和一个通道的写半部分。该通道的读半部分使用同一个 RwLock 的写锁来处理其相关内容。这里的不变量是：在向通道写入数据时绝不能持有该读锁，因为该读锁随后可能会阻塞写锁，导致通道消费者无法在那一端继续推进，从而在通道已满时引发死锁。因此，对读锁和通道写入器的访问由对包含这两者的结构体的 &amp;mut 访问来进行调解。Rust 因此能保证在允许访问通道之前，读锁已经被释放。</p>
<p>这完全是关于访问公开字段的问题。请注意，这里没有函数调用，即没有 ()。并发访问 &amp;mut 方法则是完全不同的一回事。它们会借用整个结构体，因此这是不可能的。</p>
<p>在理论上，可以考虑引入额外的注解来告知编译器：该方法仅访问 .bar，而另一个方法仅访问 .baz。编译器可以对此进行检查并使用部分借用（partial borrows），就像它现在对字段访问所做的那样，但你始终需要在代价（更复杂的语法）与收益之间进行权衡。</p>
<p>此外，无论使用什么特征来表明允许通过“指针”类型进行此类投影，其中都会存在某种魔法，因为它们（很可能）将被定义为方法。例如，Option 需要某种方式来表明“我通过 T 进行投影”；Result 也是如此（否则 &amp;res.err_member 是否被允许就会产生歧义）。仅仅依靠关联类型是不够的，因为 Result 仍然存在歧义。</p>
<p>我参与了在 IRLO（Rust 内部论坛）上提出此类特性的讨论帖。我的主要担忧集中在对类型系统的影响，以及方法的这些属性是否会通过 Fn 特征转换暴露出来，或者这些特征是否会在某种程度上变得不兼容。顺便提一句，我对命名参数也有类似的担忧：它们是类型的一部分，还是仅仅是调用点的语法糖。</p>
<p>我对这项重要的工作深表感谢。我知道提出特性很容易，但要以真正可行的方式去实现它们却很难。有太多边缘情况需要考虑，而且你总是要预料到语言特性可能会以极其古怪的方式组合在一起。</p>
<p>因此，衷心感谢你们所有人对每一项新特性提出质疑并推迟其稳定化，以确保每一项被稳定的特性都真正稳固，而不至于带来弊大于利的麻烦。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-08 17:04 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://lwn.net/SubscriberLink/1096028/7524dbcae1be7205/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--jj-releases-tag-v0-46-0-67579ea551390e3c" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2578" data-content-paragraphs="33" data-published-at="2026-10-08T09:02:42.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-08 17:02</span>
</div>

### [要闻：请重新加载此页面](https://github.com/jj-vcs/jj/releases/tag/v0.46.0)
<div class="original-title-sub"><span class="orig-tag">原文</span> jujutsu (jj) 0.46.0</div>

<div class="article-body" data-article-body="true"><p>加载时出错。请重新加载此页面。</p>
<p>jj 是一款兼容 Git 的版本控制系统，兼具简单与强大。请参阅安装说明以开始使用。</p>
<p>支持的最低 git 命令版本现已从 2.41.0 提升至 2.42.0。jj workspace add 使用了在 2.42.0 中新增的 git worktree add --orphan。</p>
<p>最低支持的 Rust 版本（MSRV）现为 1.97.1。</p>
<p>jj bisect run 现在在开始二分查找前会运行一些一致性检查。这有助于确保该命令能够区分良好和不良修订版本，并且工作副本在提供的 revset 范围内确实从不良变更为良好。使用新标志 --trust-endpoints 可禁用这些检查。</p>
<p>jj split 现在会打开单个编辑器会话来编辑拆分后提交的描述。</p>
<p>jj undo 和 jj redo 现在会拒绝撤销/重做在另一个工作区中执行的操作。使用 --allow-cross-workspace 仍可强制撤销/重做。</p>
<p>jj workspace list/root 不再省略无法访问的路径。现在会显示所有记录的路径，并在 jj workspace root 中显示警告。</p>
<p>List.get()、.first() 和 .last() 模板函数在越界访问时现在返回 Option，而不是抛出错误。</p>
<p>jj workspace add 支持 --colocate/--no-colocate 标志，用于控制是否与工作区一起创建 Git 工作树（worktree）。默认情况下，当当前工作区处于共存（colocated）状态且 git.colocate 配置为 true 时会进行共存。当存在对应的 Git 工作树时，jj workspace forget 会将其移除。</p>
<p>jj git colocation status/enable/disable 现在可在子工作区上运行。status 会正确报告共存状态并包含工作区名称。enable 会创建 Git 工作树，disable 会将其移除，允许在工作区创建后切换共存状态。</p>
<p>jj workspace remove 会从磁盘中移除工作区及其目录。在移除之前，工作副本状态会被快照记录到一个提交中。</p>
<p>新增了 jj file edit 和 jj file delete 命令，用于在任何修订版本中编辑文件，而无需更改工作副本。</p>
<p>jj git push 现在支持同时推送到多个远程仓库。这可以通过将 git.push 设置为字符串模式或字符串模式数组来配置，也可以通过可重复的 --remote 标志（同样接受字符串模式）来指定。</p>
<p>jj git push 的默认目标修订版本现在可通过 revsets.git-push 进行配置。</p>
<p>新增了 TreeEntry.normal_value() 模板方法和 TreeValue 类型，以访问解析后的树值，格式化为其完整的对象 ID，包括 Git 子模块的提交 ID。</p>
<p>针对许多常见编程语言和标记语言，差异块头（Diff hunk headers）现在会包含附近的源码符号。</p>
<p>fix.tools.&lt;name&gt;.line-range-args（取代 line-range-arg）是一个传递给修复工具的字符串模板参数数组。这在需要向工具传递多个参数的情况下更为灵活，例如分别传递范围起始和范围结束参数。</p>
<p>jj run 现在会使用其运行所在工作区的稀疏模式（sparse patterns）。使用 --sparse-patterns 选项可控制此行为（每次调用 jj run 时分别求值）。</p>
<p>jj util diff 用于比较磁盘上的文件。</p>
<p>别名现在支持设置 aliases.&lt;name&gt;.enabled = false，这将禁用它们。这可用于禁用内置别名或禁用后续层级中的别名（例如代码仓配置文件）。</p>
<p>ui.editor 现在支持 $path 和 $line 替换变量。例如：ui.editor = [&quot;emacs&quot;, &quot;+$line&quot;, &quot;$path&quot;]</p>
<p>fill 模板函数现在支持额外的命名参数 break_words，允许指定模板是否应将长度超过输入传入宽度的单词截断拆分，以确保没有单词超出指定宽度。</p>
<p>json() 模板函数现在支持映射字面量：json({&#39;key&#39; =&gt; value})</p>
<p>diff.color-words.conflict = &quot;pair&quot; 的块头现在包含所比较项的冲突标签。</p>
<p>在 Windows 上，当子进程需要提示用户时（例如 ssh 提示输入密钥密码短语或确认未知主机密钥），jj 不再卡死。从终端启动的子进程现在会继承其控制台，而不是由 CREATE_NO_WINDOW 分配一个不可见的控制台导致提示信息丢失。#6745 #8547</p>
<p>在 Windows 上，当 Git 仓库包含包文件（pack files）时，jj git colocation enable 和 jj git colocation disable 不再以“Access is denied (os error 5)”失败。#8661</p>
<p>撤销（jj undo）jj workspace forget 操作现在能够正确保留工作区记录的路径。此前路径元数据会丢失，导致撤销后工作区处于损坏状态。#9991</p>
<p>at_operation() 现在可用于非当前操作祖先的操作（例如由并发命令创建的同级操作）。此前，若求值表达式解析到当前操作索引中缺失的提交，则会失败。</p>
<p>即使 .gitignore 文件因稀疏模式排除而未实体化到工作副本中，现在也会生效。此前，被忽略的文件可能会在稀疏工作副本中被跟踪。#2289</p>
<p>树内忽略文件（.gitignore）不再通过符号链接读取，与 git 行为保持一致。此类文件现在会被静默跳过，而不是应用其符号链接目标。$GIT_DIR/info/exclude 和 core.excludesFile 不受影响，仍会像 git 一样遵循符号链接。#7161</p>
<p>jj workspace list 模板现在标有工作区名称、工作区根目录等标签。</p>
<p>感谢所有促成此版本发布的人员！</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-08 17:02 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://github.com/jj-vcs/jj/releases/tag/v0.46.0" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::