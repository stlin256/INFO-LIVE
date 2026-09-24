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
<div id="story--named-arguments-at-home-8c015533aeeced85" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5034" data-content-paragraphs="2" data-published-at="2026-09-24T17:04:48.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 01:04</span>
</div>

### [我们家里已有命名参数](https://corrode.dev/blog/named-arguments-at-home/)
<div class="original-title-sub"><span class="orig-tag">原文</span> We Have Named Arguments at Home</div>

<div class="article-body" data-article-body="true"><p>Steve Klabnik 最近撰文讨论了命名参数、可选参数、默认参数、函数重载，以及为什么从历史上看，这些设计空间中的大部分都曾让他在 Rust 中感到担忧。<br />我赞同 Steve 的观点。事实上，我认为我比 Steve 赞同得还要更加强烈一些。:)<br />我实际上认为，我们无需添加任何新的语言特性，就能获得大部分我们想要的东西。相反，我们可以充分利用 Rust 现有的能力。<br />这些方法没有哪一个能完全替代你在 Python、Ruby、C++ 或 Kotlin 中所获得的效果，但这恰恰就是核心要点所在。你无需在函数调用中添加任何黑魔法，就能获得 80% 的人体工程学便利。<br />这里反复出现的模式是：Rust 将其他语言放在函数调用语义中的东西，转化为其类型系统中的常规部分来表达，从而优雅地避开了上述设计问题。<br />让我们重温一下 Steve 举自 image crate 的例子：<br />显而易见的问题在于，如果不去查阅文档，你根本无法可靠地使用这四个连续的 u32 作为其 API。<br />假设我们现在拥有命名参数：<br />这显然更好，但在稳定的 Rust 中已经有了另一种语法来替代它：结构体（struct）。<br />结构体就是一个多带了一个类型名称的命名参数。最重要的是，我们还可以任意调整字段的顺序：<br />我们还能免费获得拼写纠错检查、代码自动补全以及每个字段的专属文档！并且我们可以在该类型上施加不变量约束，并像处理普通值一样四处传递这些参数。<br />而且，也许最重要的一点是：这些名称属于类型本身，而不是变成每个函数的调用约定的一部分。<br />这最后一个特性巧妙地避免了真正引入命名参数时会遇到的若干问题。考虑一下函数指针：<br />f 的参数名称会是什么？如果使用参数结构体，这个问题根本就不会出现：<br />如果名称在语义上很重要，那就为这些名称赋予一个类型。如果无关紧要，那就……不要赋予。<br />这里还有一个令人欣喜的好处。Steve 提到了求值顺序：<br />也就是说，参数应该按照它们在调用处出现的顺序求值，还是按照形参在声明中出现的顺序求值？在这里，这是否意味着在移动 data 之前还是之后计算 data.len()？<br />Rust 已经为结构体回答了这个问题：<br />表达式就在你编写它们的位置进行求值。不需要任何新规则。<br />在我看来，这极其符合惯用法（idiomatic）：与其为函数调用引入第二套带有微妙语义差异的类似字段的语法，不如直接使用已经存在的字段语法。<br />当然，为每个双参数函数都声明一个定制的参数类型是极其荒谬的。我绝不会写成这样：<br />那样就太愚蠢了。诀窍在于意识到：命名参数最管用的地方，恰恰就是一组参数在概念上具有独立意义的地方，而这本身就是你会想要使用结构体的地方。<br />而且无论如何，这些往往也是更好的 API：<br />这种设计压力迫使我们发掘出缺失的领域概念。<br />可选参数在某种程度上就是可能存在也可能不存在的参数。Rust 针对此本身就有一种类型。<br />这虽然不如以下方式令人愉悦：<br />但它具有一个有用的特性：可选性体现在函数的类型签名中。connect 不存在隐蔽的第二种调用约定。这里只有一个函数：<br />并且每个调用方都会提供这两个参数。<br />一旦你有六个可选参数，这显然就不是你想要的了：<br />我自己过去也曾犯过这种模式的错误。问题在于，这些参数已经不再仅仅是一个形参列表，而是变成了配置项。因此：<br />我们不再处理可选参数，而是处理数据。这带来了一个很好的特性：“在本次调用中以语法形式提供的参数”与“我在其他地方计算出的选项”之间没有特殊的区别。<br />它具有良好的组合性，因为它只是一个普通的值。<br />现在有一个显而易见的反驳：写满那么多的 None 简直太糟糕了。<br />这就是为什么我们拥有 Default trait 和结构体更新语法的原因：<br />这已经非常接近于：<br />只有一个微小的瑕疵：<br />这并非可以忽略不计。但看看我们省去了哪些不必要的添加：不需要制定哪些参数可以省略的规则、位置参数和命名参数如何交互的规则，或者是否可以省略中间某个参数的规则。<br />没有用于声明形参默认值的特殊语法，不存在关于默认表达式是在声明期运行还是调用期运行的疑问，fn 类型中也没有特殊的表示形式。<br />Default 仅仅是一个 trait，函数调用本身保持原汁原味。<br />默认值现在可以独立于该函数被使用：<br />这本身就经常非常有用。对于库 API，我通常喜欢更明确一些：<br />我认为这把握住了大部分关键要点。<br />有时，即使是选项结构体也会显得过于繁琐，通常是在构建过程需要校验或转换的时候。<br />那么，是的，这时建造者模式（builder）就派上用场了：<br />Steve 说得对，建造者模式不应该成为默认选择。它们可能会演变成自身微型的编程语言。但一个小型的 builder 拥有一个非常实用的特性：每个“参数”都是一次普通的方法调用。这意味着我们可以做诸如以下的事情：<br />如果要用语言层面的关键字参数来做到这一点，通常需要构造一个映射表（map）、解包（splatting）或其他机制。<br />在 Rust 中，它们就是普通的方法调用。我个人觉得这读起来非常令人舒适。<br />在 Java 中，你可以这样写：<br />Rust 不允许你同时定义这两者：<br />我对此感到非常庆幸。但当人们说想要重载时，其实往往包含几种不同的含义，而 Rust 已经分别覆盖了其中的大部分。<br />赋予它们不同的名称：<br />标准库经常这样做。例如参见 Vec::new() 和 Vec::with_capacity()。<br />这仅需要库作者多消耗一个名称（通常只是 with_...），却免去了每个用户在脑海中进行重载决议的负担。<br />使用 trait。标准库一直在使用像 Into、AsRef 和 Borrow 这样的 trait 来做到这一点。例如：<br />这为我们提供了类似重载行为的另一个有用部分：一个 API 可以接受不同的输入类型。<br />对于所有权转换：<br />这只是一个带有一个形参列表和 trait 分发的单一函数。并且与不受限制的重载不同，所接受类型之间的关系是显式的：只要它们满足该约束，就能够正常工作。<br />这也是一个 trait：<br />这就是多态；我们只是把它放进了 trait 系统中，而不是放在名称解析里。<br />Steve 的 Ruby 示例同时具有这种既可爱又可怕的特质：<br />这些调用看起来像是在调用同一个概念上的操作，但它们的含义却大相径庭。<br />在 Rust 中，我们可以直接对此建模：<br />这虽然更冗长，但却是一种有益的冗长。我可以问：“嘿编辑器，我可以重定向到什么？”编辑器就会给出 Redirect 的各种变体作为回答。这比“去阅读文档，搞清楚这个哈希表接受哪些键和值”要有帮助得多。<br />如果我们真的想把棱角磨平，我们还可以添加 From 转换：<br />而对于在结构上具有特殊意义的情况：<br />请记住，这没有任何运行时开销，而且是完全类型安全的。对于一门编译型语言来说，这已经相当不错了。</p>
<p>“选项哈希（options hash）”本质上是一个动态类型的匿名结构体。因此，极其乏味的 Rust 翻译版本就是：使用静态类型的具名结构体。<br />没错，Rust 版本确实显得更啰嗦，但它也能在我们拼错 status 时检测出来。在这里，你绝不可能在放置状态码的地方传入一个字符串，而且列出每一个受支持的选项也变得非常直接。<br />我认为 Rust 不应该为了把语法压缩得尽可能紧凑而进行优化。相反，如果一组选项常见到理应获得便利的语法支持，那么它大概也足够常见到值得拥有一个专门的类型。<br />现在，选项有了名字，各个字段也可以集中在一个地方编写文档。<br />Rust 没有通用的变长参数函数（variadic functions）。但再次强调，它已经拥有好几种表达相同概念的方法。<br />如果所有参数类型相同，就传入切片（slice）：<br />或者接受一个迭代器（iterator）：<br />可以说，这比以下做法更具可组合性：<br />因为调用方可以很自然地传入一个现有的集合。（当然，这一切都是类型安全的，且在运行时零间接开销。）<br />如果参数是异构的，最后的退路是编写自定义宏。需要说明的是，我不会仅仅为了伪造变长参数函数而使用宏，但我确实喜欢在稳定版 Rust 中可以使用宏这一特性，以及感叹号在普通函数调用中格外醒目的特点。<br />在所有这些例子中，有一个微小的便利特性我认为值得更多赞誉：字段初始化简写（field-init shorthand）。<br />Rust 允许你把这个：<br />这直接回应了史蒂夫（Steve）对关键字参数的抱怨之一：<br />Rust 的应对方案实际上是：<br />在我看来，这甚至比关键字参数更好。因为标签依然存在，重复的代码消失了，而且我们调用函数的方式完全不需要任何改变。<br />关于 Rust，我最喜欢的点在于各个概念之间能够如此美妙地相互配合。这不是一项轻松的任务，Rust 在这一点上值得极大的赞誉。<br />例如，假设我们想要一个复杂的 HTTP 请求 API，它具备：<br />我们可以设想堆叠一堆语言特性来让我们能够这样写：<br />要是那样岂不是很美好？然而，我们已经可以在稳定版 Rust 中通过结合现有的、可组合的特性做到这一点：<br />而我们所要做的，无非是写出我们无论如何都可能会写出的代码：<br />或者，也许你更喜欢建造者模式（builder）？<br />我们组合了标准的 Rust 概念：结构体（structs）、枚举（enums）、Option、Default、结构体更新语法、字段初始化简写、特质（traits）、泛型（generics）、迭代器（iterators）以及方法（methods）。这些机制的作用远远超出了传参本身。<br />Rust 的基础语法就已经足以构建符合人体工程学（ergonomic）的 API。保持事物简单并不意味着人体工程学会变差。<br />对上述一切显而易见的反驳是：<br />算了吧。这些根本不是真正的命名/默认/重载/变长参数。它们只是变通方案（workarounds）。<br />上述所有设想或许都是有用的、局部的语法改进。但隐藏的代价是语言变得更加复杂，而获得的收益却微乎其微。<br />API 中的摩擦往往会推动我们走向那些最终证明超越了原始问题本身的解决方案：<br />从某种意义上说，具体的问题指向了一个更广泛的设计问题，而解决它则开辟了解决类似问题的全新途径。这就是优秀的系统设计。<br />我认为这一切背后存在一个更广泛的设计原则。<br />动态语言中常见的一种设计哲学是，通过为熟悉的结构重载额外的语义来使它们变得更强大。毕竟，这正是动态类型所提供的一种便利：在运行时决定一个对象含义的能力。<br />然而，Rust 往往倾向于将复杂性外移，让类型系统承担所有工作。<br />有人可能会问：“在智能体开发（agentic development）时代，啰嗦不是变得更廉价了吗？而且冗余的标签可能会让调用在局部更容易被理解，不是吗？”<br />我认同这个前提。但我不太确定它能否改变结论。<br />智能体看到：<br />所获取的局部信息基本上是一样的。<br />可以说它获取的信息甚至更多：Crop 赋予了该参数包一个语义标识，而仅凭函数参数列表是无法提供这一点的。<br />这对人类和智能体来说都表达了有用的信息。timeout 不仅仅是针对这次特定调用的可选语法参数；它是一种配置请求的方式。<br />如果智能体真的让键入代码的成本变得越来越无关紧要，那么这些稍显繁琐的 Rust 惯用法的主要缺点也同样变得更加廉价了。机器人们可以替我敲出 RequestOptions。<br />我并不反对 Rust 最终引入命名参数。也许会有一个提案能找到一个微小而自洽的设计，妥善处理模式匹配、函数指针、特质、求值顺序、兼容性以及所描述的所有其他棘手边缘情况。但我并不觉得有多么紧迫。<br />稳定版 Rust 已经为我提供了用于命名选项的结构体、用于可选值和默认值的 Option 与 Default、用于多样化输入的特质与枚举，以及用于重复参数的切片和迭代器。<br />综合来看，它们覆盖了极广的应用场景。而且它们是通过复用 Rust 本身就已经需要的特性来做到这一点的。我认为这是 Rust 设计哲学的核心部分：寻找最小的、可组合的、正交的抽象集合，这些抽象结合在一起时，能够以优雅的方式解决许多问题。整体大于部分之和。<br />下一步去向何方<br />想对团队的 Rust API 获取第三方意见吗？让我们一起审查这些类型和抽象吧。<br />史蒂夫·克拉布尼克（Steve Klabnik）做客我们的“Rust in Production”播客</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-25 01:04 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://corrode.dev/blog/named-arguments-at-home/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-rton-measles-mmr-vaccine-d993878492be5b98" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="249" data-content-paragraphs="3" data-published-at="2026-09-24T16:25:55.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 00:25</span>
</div>

### [特朗普提名的FDA局长人选在参议院听证会上称麻腮风疫苗“安全有效”](https://www.theguardian.com/us-news/2026/sep/24/fda-heidi-overton-measles-mmr-vaccine)
<div class="original-title-sub"><span class="orig-tag">原文</span> Trump’s FDA nominee says MMR shot is ‘safe and effective’ at Senate hearing</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/262345f1054115efd6050b4874852b97770b7ff6/419_0_5000_4000/master/5000.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=4c5dad4ba38a872694609e032dbaebfe" alt="特朗普提名的FDA局长人选在参议院听证会上称麻腮风疫苗“安全有效”" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>海蒂·奥弗顿博士（Dr Heidi Overton）出席确认听证会，而就在数周前，特朗普暗示该疫苗可能“相当致命”时，她曾站在特朗普身后。</p>
<p>唐纳德·特朗普提名的美国食品药品监督管理局（FDA）局长人选海蒂·奥弗顿博士向参议员表示，麻疹、流行性腮腺炎和风疹（MMR，即麻腮风）疫苗“安全有效”；而就在几周前，总统暗示该疫苗可能“相当致命”，当时她就站在总统身后。</p>
<p>在周四举行的确认听证会上，奥弗顿将麻腮风疫苗描述为“安全且有效”，并补充说：“这是我们目前应对麻疹疫情的公共卫生反应中最好的工具。”</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-25 00:25 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/us-news/2026/sep/24/fda-heidi-overton-measles-mmr-vaccine" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-2026-2131-pdf-78891cca59565b25" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="631" data-content-paragraphs="1" data-published-at="2026-09-24T15:13:35.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 23:13</span>
</div>

### [以接近SNFS的速度伪造1024位RSA签名](https://eprint.iacr.org/2026/2131.pdf)
<div class="original-title-sub"><span class="orig-tag">原文</span> Forging 1024-bit RSA signatures in nearly SNFS time</div>

<div class="article-body" data-article-body="true"><p>副标题：无需分解N即可实现接近SNFS速度的签名伪造（NSNFSSSFSFN）<br />摘要：RSA的安全性通常被认为基于大整数分解的复杂度，而密钥长度参数也是根据普通数域筛选法（GNFS）外推得出的。然而，这在实际场景中可能无法准确反映RSA的安全性。<br />2007年由Joux、Naccache和Thomé提出的一项未受足够重视的算法表明，攻击者在临时访问原始RSA签名/解密预言机（oracle）后，无需分解密钥，即可在接近特殊数域筛选法（SNFS）的时间内伪造RSA签名。我们针对1024位RSA实现并运行了该算法。在历时5个日历月的时间里，该攻击总共消耗了1380个CPU核心年，并发起了232次预言机查询。其中大部分时间用于预计算；完成预计算后，攻击者在离线状态下仅需180个核心年即可伪造任意选定的签名。<br />我们使用硬件安全模块（HSM）作为签名预言机实施了攻击，从而证明了通过黑盒API交互在不泄露私钥的情况下冒充HSM的能力。盲RSA（Blind RSA）方案同样提供了此类签名预言机。<br />将我们的实证运行时间外推至更大的密钥长度，我们得出结论：对于实际中常用的1024位至4096位RSA参数，在存在签名预言机的情况下，RSA的具体安全强度应比基于分解的安全性评估低15至30位。在此攻击模型下，即便是4096位RSA似乎也无法达到128位的安全级别。这突显了当前RSA类安全假设中存在的漏洞，并为在当前后量子过渡期内彻底淘汰RSA提供了经典的密码分析证据。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-24 23:13 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://eprint.iacr.org/2026/2131.pdf" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-king-up-with-google-play-fef3d86a310799ac" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2296" data-content-paragraphs="12" data-published-at="2026-09-24T14:57:57.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 22:57</span>
</div>

### [与 Google Play 分道扬镳：为何 Conversations 现已完全免费](https://gultsch.de/posts/breaking-up-with-google-play/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Breaking Up with Google Play: Why Conversations Is Now Free</div>

<div class="article-body" data-article-body="true"><p>Conversations 是我为 Android 开发的一款联邦式即时通讯客户端。它的诞生与许多传统开源项目类似：源于一次为自己解决痛点的尝试。开发始于 2014 年 1 月我的学生宿舍里，几周之内，我就开始在实际使用中“吃自己的狗粮”（dogfooding），并将其作为与朋友交流的主要工具。然而，当到了 2014 年 3 月 24 日——正好是十二年半前的今天——向公众发布这款应用时，我心里非常清楚，自己至少要尝试将这个开源项目转化为一门生意。虽然公开源代码但对编译好的二进制安装包收费这种商业模式并非我首创，但在 2014 年这确实非同寻常。</p>
<p>时光飞逝十年过去，我确实成功地将 Conversations 运营成了一项可持续的业务。自 2014 年 3 月以来，Conversations 以及其他相关活动一直是我主要的生活来源。诚然，作为一名住在狭小宿舍里的学生，维持生活并不需要太多开销，但幸运的是，随着我年龄的增长，收入也在稳步提升。</p>
<p>这些年来，具体的收入来源发生过转变。起初，主要是为那些希望使用 Conversations 的企业提供付费定制开发。有些企业出资开发的功能最终合并进了 Conversations 的主线分支；另一些企业则需要专门针对其工作流程的定制功能，这些功能完全没有必要合并到上游。此外，我偶尔也会承接服务器搭建服务，甚至就即时通讯和安全相关主题提供咨询作为补充。到了后期，各项基金和赞助资助机会扮演了越来越重要的角色。</p>
<p>然而，一个出人意料且稳定的收入来源一直是 Play 商店的收入。我过去常说，这笔钱帮我付了房租。每一位自由职业者都深知这种不确定感：每隔几个月才能发出一次请款账单，或者资助项目的款项只能在资助周期结束时才能拿到。任何形式的固定收入——特别是在早期你还没有积累任何储蓄的时候——都是一种恩赐。</p>
<p>Conversations 在 2014 年至 2026 年的总收入（扣除 Google 分成及销售税前）</p>
<p>我和 Google 的关系从来就没好过。应用更新被以莫名其妙的理由驳回的次数多得数不清。Conversations 曾两次被从 Play 商店下架。有一次，Google 凭空指责我上传用户的联系人数据¹——这根本不是事实，而且也不是由某次特定的更新触发的。无数次，我都巴不得能和一个真正的人类交谈五分钟。如果我不是在面对人工智能和点击农场众包工，许多误会本可以在瞬间化解。在撰写这篇博文时，我已经等待 Google 审核一次应用更新足足 14 天了。他们的审核时间从来就没好过，也从未达到过我认为可以接受的标准，但过去一年左右的时间里情况变得糟糕得多。不难想象，部分问题出在铺天盖地的 AI 生成垃圾应用上——而 Google 本身在一开始对此就难辞其咎。然而，Google 本应有责任优先处理那些长期存在、非 AI 生成且更新并不频繁的应用。在一些人看来，为新功能多等上一阵子可能算不上什么大事，但 Google 根本不区分功能更新和安全更新。将安全更新推迟数天乃至数周，完全是在拿安全开玩笑，极其危险。</p>
<p>说到这里，我需要补充一些背景背景。Google 会从我的应用销售额中抽取 15% 的佣金。这实际上意味着我每年为他们的服务向 Google 支付超过 1000 欧元。每年 1000 欧元是我宽带网络费用的 1.5 倍。如果你假设我的笔记本电脑能用三到四年，这笔钱也大致相当于我每年分摊在电脑上的开销。当我的宽带出故障时，会有人开车到我家上门维修。当我的笔记本电脑坏掉时，会有人开车到我家帮我修好。而当 Google 搞砸时，我却完全无能为力。显然，这笔钱甚至无法赋予我每年能和一个真正的人类聊上五分钟的特权。</p>
<p>多年来，我都觉得自己和 Google 处在一段充满毒害的有毒关系中，而我留下的唯一原因就是经济上的依赖。</p>
<p>随着时间的推移，我的收入来源越来越转向资助基金。有时是通过 NLnet²³⁴，有时是更直接地来自欧盟委员会⁵。通过各项资助基金，我的资金链已经稳固保障至 2029 年底，而且我相当确信在那之后还会有其他资助机会出现。</p>
<p>Conversations 一直可以在 F-Droid 上获取，但在最初，我并没有宣传过可以免费下载它的渠道。起初，F-Droid 的软件包维护者在知道 Conversations 是 Google Play 上的付费应用后曾向我征求许可。我没有拒绝，但我也没有在官方网站上链接到 F-Droid，因为我想引导用户去购买付费版本。后来，随着我对 Google 的态度每况愈下，我确实开始放上了 F-Droid 的链接。现在，F-Droid 已经成为分发这款应用的主要途径。通过 F-Droid 分发的 APK 现在均采用可重现构建，并由我的个人签名密钥进行签名。</p>
<p>幸运的是，我在经济上不再依赖 Google Play 商店的收入了。Google 不配再得到我以及我的钱。我受够了。去他的看门人。</p>
<p>¹ https://gultsch.social/@daniel/111929074071688694 ↩︎<br />² https://nlnet.nl/project/Conversations/ ↩︎<br />³ https://nlnet.nl/project/Conversations-3.0/ ↩︎<br />⁴ https://nlnet.nl/project/Conversations-OpenPGP-refresh/ ↩︎<br />⁵ https://mobifree.org ↩︎</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-24 22:57 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://gultsch.de/posts/breaking-up-with-google-play/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-blog-muse-runtime-export-a81b180ef3fd1e33" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="4270" data-content-paragraphs="8" data-published-at="2026-09-24T14:55:45.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 22:55</span>
</div>

### [我向 Meta 的 Muse 索取其文件系统，它发给了我 6.8 GB 的数据](https://mouse.dev/blog/muse-runtime-export/)
<div class="original-title-sub"><span class="orig-tag">原文</span> I asked Meta’s Muse for its filesystem and it sent me 6.8 GB</div>

<div class="article-body" data-article-body="true"><p>我让 Muse 将它能看到的文件打包并发送到我的 Google Drive。它确实这么做了。<br />下载的文件压缩后约为 2.7 GB，解压后达 6.8 GB。它似乎包含了分配给我该会话的 Linux 环境的根文件系统，其中包括 Ubuntu 系统文件、Muse 的内部文档、集成代码、应用模板、记忆文件以及智能体（Agent）日志。里面还包含 SSH 密钥文件。<br />我已通过 Meta 的漏洞赏金计划提交了这些发现，并联系了几位员工。我不会公开该归档文件、密钥或会话日志。以下是我发现的内容以及由此梳理出的技术细节的详细梳理。<br />我报告的隐患在于，内部运行时文件和敏感资料可能会通过一次普通对话以及已连接的导出目标流出该环境。我尚未核实这些 SSH 密钥是否处于活动状态，或者它们能提供何种访问权限。<br />大多数有价值的文件都位于 /home/hatch、/opt/hatch 和 /opt/hatch-image 目录下。Hatch 是 Meta 内部对 Muse 的代号，也是整个运行时文件中使用的名称。<br />该智能体的主目录包含了 SOUL.md、IDENTITY.md、USER.md、MEMORY.md、AGENTS.md 和 TOOLS.md。<br />~/MEMORY.md 是一份记录事实、偏好和承诺的简短清单。<br />agents/ 目录包含了 113 条带有 JSONL 追踪记录的子智能体记录。<br />约 20 个 Markdown 文件描述了浏览器使用、连接器、支付、凭证、数据处理、生成的文件、语音、目标和任务调度。<br />docs/devices/home_link.md 描述了一项名为 Meta Home Link 的实验性集成，其使用带有 Wi-Fi 和低功耗蓝牙（Bluetooth LE）的 ESP32-C5 芯片。<br />~/memory/ 下带有日期的文件用于记录日常细节。智能体可以在对话过程中向这些文件写入内容。<br />memory/bank/ 下的文件将这些材料组织为情境、经历和偏好，并带有溯源至原始行的引用标记。<br />每晚运行的“dream”（做梦）机制会回顾近期的对话，并为未来的会话编写指导策略。<br />这些运行会在 workspace/self_improvement/ 下留下记录凭据，而其实际变更则会写入相关的记忆与工作区文件中。<br />在 /opt/hatch/skills/ 下，我数出了大约 68 个技能目录。这些目录通常将一个 SKILL.md 指导文件与一个命令行工具或配套代码配对。<br />/opt/hatch/runtime-cell/ 包含了 18 个文件，包括用于构建根文件系统、使用 systemd-nspawn 启动它，以及运行启动钩子（startup hooks）和守护进程的脚本。<br />Codex CLI 安装在 /opt/hatch-image/bin/codex，显示的软件版本为 0.149.0。我没有发现 Muse 将其用作编程智能体的证据。<br />该二进制文件位于 codex-resources/bwrap 下，自称为针对 Codex 构建的 bubblewrap。<br />该智能体的主目录包含了 SOUL.md、IDENTITY.md、USER.md、MEMORY.md、AGENTS.md 和 TOOLS.md。除了这些文件之外，还有用于文档、记忆、工作区项目、频道、钩子和订阅的目录。agents/ 目录包含了 113 条带有 JSONL 追踪记录的子智能体记录。<br />这些文档对于理解该系统而言异乎寻常地有用。约 20 个 Markdown 文件描述了浏览器使用、连接器、支付、凭证、数据处理、生成的文件、语音、目标和任务调度。此外还有针对 WhatsApp、配对的 Mac、Tailscale 以及名为 Home Link 的设备集成的独立指南。<br />在 /opt/hatch/skills/ 下，我数出了大约 68 个技能目录。这些目录通常将一个 SKILL.md 指导文件与一个命令行工具或配套代码配对。它们涵盖了 Google Workspace、Meta 旗下社交应用、Outlook、差旅、购物、医疗健康服务、智能家居设备以及媒体生成。<br />skill-scopes.conf 和 bin-scopes.conf 这两个配置文件暗示了 Meta 正在筹划但尚未发布的连接器。其中包括 Slack、Dropbox、Polymarket、Canva 和 Klaviyo 等名称，外加一个 internal-facebook-cLI。<br />容器配置也包含在内。/opt/hatch/runtime-cell/ 包含 18 个文件，包括用于构建根文件系统、使用 systemd-nspawn 启动它，以及运行启动钩子和守护进程的脚本。一份独立的 runtime-cell.kdl 清单描述了镜像中的软件包和 systemd 单元。<br />这些文件让我非常清晰地了解了所分配的 Linux 环境是如何组装起来的。但它们不足以审计整项服务，也无法证明该环境之外的任何基础设施情况。<br />我发现的最大代码项目是 Spaces 框架，Muse 使用它来构建和提供应用程序服务。它的 TypeScript 起步模板包含一个 React 客户端、Server Actions、Drizzle SQLite 模式定义、SQL 迁移脚本以及 Bun 配置文件。此外还有一个更小的静态模板，以及位于名为 worker、sdk、cloudflare 和 cvm 目录下的运行时代码。<br />导出的内容还包含针对文档、PDF、演示文稿、电子表格和 Markdown 的构建器。另一个名为 magic-moment 的独立技能包含用于合成卡片和视频的代码，配有浏览器抓取脚本、字体和品牌素材资源。<br />而且里面有大量的图标！<br />Hatch 确实使用了其自带的 bubblewrap（一款 Linux 沙箱工具）。该二进制文件位于 codex-resources/bwrap 下，自称为针对 Codex 构建的 bubblewrap。<br />Muse 使用它对 ffmpeg 和 ffprobe 进行沙箱隔离，用于视频处理、缩略图生成和文件检查。这些作业在没有网络访问权限或额外特权的情况下运行，运行身份为 nobody 用户，并将 /input 和 /output 目录暴露给沙箱。如果缺少 bubblewrap，这些作业将报错并提示 failed to prepare ffmpeg sandbox（准备 ffmpeg 沙箱失败）。<br />我没有发现调用 Codex 本身的代码。临时的 Codex 文件来自我们的版本检查操作，而 Hatch 二进制文件中的 codex 和 gpt-5.5 字符串仅是模型提供方列表项，导出内容中没有任何证据表明它们已被选中。<br />就我所能查明的情况来看，Meta 打包内置了 Codex CLI，但仅仅使用了它附带的沙箱工具。<br />Muse 将记忆存储在纯 Markdown 文件中。~/MEMORY.md 是一张记录事实、偏好和承诺的简短清单。~/memory/ 下带有日期的文件用于记录日常细节。智能体可以在对话过程中向这些文件写入内容。<br />一个每小时运行一次的后台作业会根据原始消息核对新的陈述内容，并记录引文、消息 ID 和陈述 ID。它会决定哪些内容归入精选清单，哪些内容保留在每日日志中。memory/bank/ 下的文件将这些素材整理归类为情境、经历和偏好，并带有指向原始文本行的引用标记。<br />Postgres 使得这些文件可供检索。memory.entries 存储文本分块和行号引用，memory.embeddings 保留 384 维向量，而 memory.claims 则追踪证据、置信度和状态。较新的陈述可以通过 supersedes_claim_id 替代较旧的陈述。智能体可以使用 memory_search 检索存储库，并使用 memory_explain 查看检索结果背后的证据依据。<br />其他后台作业则维护人际关系页面、审查周期性工作流，并筹备想法或目标简报。这些运行会在 workspace/self_improvement/ 下留下记录凭据，而其实际变更则会写入相关的记忆与工作区文件中。</p>
<p>夜间的“梦境”（dream）流程会审查近期的对话，并为未来的会话编写指导准则。在我的文件里，它捕捉到了我更喜欢简短的回复、反感重复的跟进追问，并且从未主动要求推送NFL比分。带日期的梦境文件存放在 ~/dreams/ 目录下；另一个单独的 ALIGNMENT_SYNTHESIS.md 文件则将这些观察结果转化为长期指导方针。梦境文件中标记了 prompt_hoisted: false，因此文本本身并未被直接注入到提示词中。</p>
<p>遗忘机制的影响范围远不止删除一条笔记那么简单。遗忘工作流会对待撤回的声明ID（claim ID）进行暂存，移除关联资料，并重建索引，以防后续任务将其重新构建出来。这就是该系统随着时间推移实现自适应的方式：通过更新文件、可搜索记录以及未来会话能够读取的指令来实现。模型的权重始终保持不变。</p>
<p>硬件文档是最大的意外收获。docs/devices/home_link.md 描述了一个名为 Meta Home Link 的实验性集成方案，它使用的是配备 Wi-Fi 和低功耗蓝牙（Bluetooth LE）的 ESP32-C5 芯片。文档涵盖了设备配对、本地网络发现，以及通过具有独立审批步骤的代理来实现智能体访问。其中甚至已经包含了针对基于 IPP 协议的 Brother 打印机以及 Lutron 网桥的集成指南。</p>
<p>这表明 Meta 正在开展让 Muse 接入家庭网络设备的相关工作。我不清楚这是一个内部原型、一次有限范围的实验，还是 Meta 计划正式推出的产品。</p>
<p>我通过 Meta 的漏洞赏金计划提交了报告和发现。Meta 将该报告标记为“不适用”（Not Applicable）。我还联系了几位内部员工，并收到了回复。</p>
<p>我曾轻度探测容器边界试图让 Muse 逃逸，但在我的测试中边界似乎保持完好；我开始对发现的 80 个套接字（socket）进行测试，但鉴于生产系统的性质，加之坦白说自己在该领域缺乏经验，我便停止了测试。</p>
<p>如果你想了解更多信息，可以通过 pete at mouse.dev 联系我。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-24 22:55 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://mouse.dev/blog/muse-runtime-export/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-o-make-working-life-hell-e1a2b1a92287929c" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="359" data-content-paragraphs="3" data-published-at="2026-09-24T13:53:33.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 21:53</span>
</div>

### [有毒老板：企业为何袒护那些让职场生活沦为噩梦的管理者？](https://www.theguardian.com/money/2026/sep/24/toxic-bosses-why-do-companies-protect-managers-who-make-working-life-hell)
<div class="original-title-sub"><span class="orig-tag">原文</span> Toxic bosses: why do companies protect managers who make working life hell?</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/88af7296655d2ecb18e396b849cd62971edd3f18/0_0_5000_4000/master/5000.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=972f62f1192926c01d04a3fc63b01052" alt="有毒老板：企业为何袒护那些让职场生活沦为噩梦的管理者？" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>霸凌、操纵与恐吓能够毁掉一个人的人生，然而滥用职权的专制管理者却依然不断步步高升。他们是如何逃脱惩处的——又能否让他们受到制约？</p>
<p>当安德里亚（Andrea）最终辞职时，同事们向她道出了关于其老板的真相，而这其实是他们早就心知肚明的。有些人向她道歉；另一些人承认自己曾眼睁睁看着发生在她身上的一切，却保持了沉默。其中一人说了一句让我至今无法忘怀的话：“你就像我们情绪上的防刺背心。是你保护了我们。”</p>
<p>安德里亚曾是一名拥有数十年行业信誉的高级法律主管，直到她开始向一位权势极强的新同事汇报工作。短短几个月内，事情就开始不对劲了。工作要求毫无征兆地频繁变动，反馈意见自相矛盾。他在公开场合打断她说话，在私底下贬低并削弱她的权威。渐渐地，她不仅开始怀疑他，还开始怀疑自己，怀疑自己的专业能力，甚至怀疑自己对现实的感知判断。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-24 21:53 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/money/2026/sep/24/toxic-bosses-why-do-companies-protect-managers-who-make-working-life-hell" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

::::