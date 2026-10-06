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
<div id="story-to-erlang-source-anymore-0bfe6d5e2f3bdc21" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5938" data-content-paragraphs="61" data-published-at="2026-10-05T17:29:17.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-06 01:29</span>
</div>

### [Gleam 不再编译为 Erlang 源代码](https://gleam.run/news/gleam-doesnt-compile-to-erlang-source-anymore/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Gleam doesn&#39;t compile to Erlang source anymore</div>

<div class="article-body" data-article-body="true"><p>2026年10月5日，Louis Pilfold</p>
<p>Gleam 是一种类型安全且可扩展的语言，可用于 Erlang 虚拟机和 JavaScript 运行时。今天，Gleam v1.19.0 已经发布，下面让我们来看看有哪些新内容。</p>
<p>过去几个月里，Giacomo Cavalieri 完全重写了 Gleam 的 Erlang 代码生成器。新生成器采用了完全不同的设计，最值得注意的是，它输出的格式也不同。此前，Gleam 生成的是 Erlang 源代码；现在，它生成的是 Erlang 抽象形式。</p>
<p>“Erlang 抽象形式”是 Erlang 编译器使用的一种中间表示。它是一棵带有元数据注释、用于表示 Erlang 语法的树，通常通过运行 Erlang 的词法分析器和解析器生成。它采用 Erlang 外部项格式进行二进制编码。有了这种二进制格式，我们就能直接加载生成的代码，跳过 Erlang 编译器的前半部分。</p>
<p>新的 Erlang 代码生成器带来了以下几项好处：</p>
<p>编译器性能得到了提升，在 Erlang 上运行的 Gleam 项目构建时间大幅缩短。</p>
<p>现在，运行时可用的位置元数据能够准确对应原始 Gleam 源代码，而不是对应编译器生成的 Erlang 源代码。这意味着，例如，BEAM 崩溃报告和堆栈跟踪中的行号现在完全准确；此前它们可能并不准确，只能指向距离最近的函数。这些元数据还可能使 Gleam 在 edb 等调试器中获得完整支持，不过我们自己目前还没有对此进行任何工作。</p>
<p>Gleam 编译器的代码质量也得到了提升。Erlang 代码生成器是 Gleam 代码库中历史最悠久、最稳定的部分之一，因此虽然它没有给我们带来问题，但并不符合我们如今采用的标准和约定。这个新的替代实现非常出色，可以说提高了整个编译器的标准。</p>
<p>我们再也不用听别人以贬义的方式使用“转译器”这个词了。1</p>
<p>我马上会展示一些数据，但请记住，基准测试总是人为设计的，永远无法说明全部情况。这些数据可以作为一个很好的入门或出发点，但要形成良好理解，还需要读者进一步研究并积累实际经验。</p>
<p>这项基准测试基于 José Valim 的 langcompilebench 项目。感谢 José！测试衡量的是编译 100 个模块所需的时间，每个模块都包含 100 个返回“hello world”字符串的函数。这种测试项目的结构可以很容易地在不同语言中复现，从而生成尽可能具有可比性的测试项目，因此具有一定的实用性。但它能告诉我们的内容也有限，因为每种语言只有一小部分功能会被编译。在真实项目中，代码的变化会大得多，而且不同功能在不同语言中的编译成本也会不同。</p>
<p>代码生成器重写工作的第一阶段已经随上一版本 v1.18.0 发布，因此我们来比较一下 v1.17.0 与刚刚发布的 v1.19.0。这张图展示了编译基准测试项目所需的时间，数值越低越好。</p>
<p>如你所见，改进相当显著！这是从零开始的完整构建，没有使用任何缓存。Gleam 的编译是增量式的，因此在典型的开发过程中，速度会快得多，因为它不需要编译整个项目。</p>
<p>最初的 langcompilebench 只包含 Erlang、Elixir 和 Gleam，但我又加入了其他一些流行编程语言，帮助大家大致感受 Gleam 的编译速度与自己熟悉的语言相比如何。我还加入了编译为 JavaScript 的 Gleam。结果如下：</p>
<p>请记住：这是一项人为设计的基准测试，仅凭它不足以对这些语言得出任何确定性结论。话虽如此，这些结果确实表明 Gleam 的编译速度相当快。作为一名 Gleam 程序员，我可以说，Gleam 的开发体验非常愉快，花在等待计算机上的时间很少。</p>
<p>我们已经从“将源代码编译为交给 Erlang 编译器处理的代码”，转变为“将中间表示交给 Erlang 编译器处理”。但为什么不干脆完全绕过 Erlang 编译器呢？我们能不能创建一个性能超过 Erlang 编译器的 BEAM 字节码生成器？或许我们还可以利用 Gleam 的类型信息生成经过进一步优化的代码。</p>
<p>虽然这些好处理论上可以实现，但我们很可能无法做到。与 Erlang 源代码和 Erlang 抽象形式不同，BEAM 字节码并不是固定不变的。虚拟机的每个新版本都可能演进并改进字节码，增加新功能，有时也会移除已经变得多余的功能。我们需要承诺永远跟上这种演进，与 Erlang 维护者密切合作，为即将发生的变化做好准备，并在虚拟机发布新版本时及时准备好 Gleam 的新版本。即使有 Gleam 更强大的静态分析能力可以提供帮助，重现 Erlang 编译器数十年来实现的全部现有优化，也将是一项非常艰巨的工作。</p>
<p>Gleam 是一个由赞助支持的社区项目。我们的资金只有那些由企业或学术机构支持的语言的一小部分，因此必须认真思考如何以最高效、最可持续的方式使用资源。Gleam 是软件开发的可靠基础，我们做出的每个决定都必须能够在未来数年乃至数十年持续发挥作用。就今天而言，编译为 Erlang 抽象形式是 Gleam 在成本与收益之间的最佳平衡点。</p>
<p>在做出这一决定时，我们也有很好的同行。深受大家喜爱的“老大哥”语言 Elixir 同样通过抽象形式编译为 Erlang。如果这对 Elixir 来说足够好，那么对 Gleam 来说也足够好！</p>
<p>好了，关于这个话题就说到这里。Gleam v1.19.0 中还有很多内容值得介绍。</p>
<p>得到改进的不只是 Erlang 代码生成，JavaScript 方面也有一些不错的提升。</p>
<p>在 Gleam 中，流程控制通过使用 case 表达式的模式匹配来实现，并会被编译为嵌套的 if 语句。由于模式匹配具有声明式特征，编译器可以重新排列并优化运行时逻辑，采用分治法尽快找到正确的分支。</p>
<p>John Downey 改进了这一过程，使生成的代码更加扁平：将嵌套的 if 语句合并为单个条件，并减少中间变量。例如，考虑下面这段 Gleam 代码：</p>
<p>此前，这一小段 Gleam 代码会被编译成下面这段出人意料地庞大的 JavaScript 代码：2</p>
<p>但现在，它会生成下面这样的代码：</p>
<p>这是一个很不错的改进，相信你也会同意！令人意外的是，在经过压缩和编码之后，这几乎不会改变代码包的大小（gzip 确实很神奇），但生成的代码分支更少，供 JavaScript 引擎优化的空间也因此更小。</p>
<p>虽然 Gleam 列表和 JavaScript 数组在各自语言中使用相似的语法，但 Gleam 的不可变持久列表类型并不等同于 JavaScript 的可变连续数组类型。将 Gleam 代码编译为 JavaScript 时，任何列表字面量都必须被编译为用于构造运行时数据结构的 JavaScript 代码。例如，下面这段 Gleam 代码：</p>
<p>它会被编译成如下 JavaScript 代码2：构造一个 JavaScript 数组，并将其传递给一个函数，将其转换为 Gleam 列表。</p>
<p>在此版本中，对于较短的列表字面量，编译器将生成不同的代码，直接生成列表，而不再先从数组转换。</p>
<p>在现代 JavaScript 引擎中，这会带来显著的性能提升。对于大量使用短列表的项目而言，效果尤其明显，例如使用 Lustre 库的项目。我们没有观察到较长列表的性能提升，因此对于较长列表，仍将采用数组到列表的转换方式。</p>
<p>感谢 Giacomo Cavalieri！</p>
<p>在将代码编译为 JavaScript 时，Gleam 编译器还会生成用于从 JavaScript 操作程序员定义的数据结构的函数。除此之外，编译器还可以提供 TypeScript 声明文件，从而让 TypeScript 与 Gleam 在同一个项目中实现完整集成。</p>
<p>针对每一种自定义类型，编译器都会提供一个函数，用于检查某个值是否为特定变体。例如，给定以下类型：</p>
<p>生成的函数会有如下 TypeScript 声明：</p>
<p>眼尖的 TypeScript 程序员读者可能会发现这里存在一个问题。如果已知该值的类型为 Box，那么可以使用此函数将容器类型细化为 Full；但 number 的类型参数却被泛化为 unknown，导致类型信息丢失。这非常不便。</p>
<p>Giacomo Cavalieri 为该定义添加了一个重载，使类型在可能的情况下得以保留。</p>
<p>Gleam 用户通常会使用 Gleam 可执行文件内置的官方构建工具，但有时也会希望在其他环境中编译和使用 Gleam 代码。例如，Elixir 或 Erlang 程序员可能希望使用一个以 Gleam 编写的依赖包。在运行时，这种方式运行得非常好，因为这三种 BEAM 语言之间具备出色的零成本互操作性；但要达到这一点可能并不容易，因为 Elixir 和 Erlang 的主要构建工具并不内置对 Gleam 的支持。</p>
<p>gleam 可执行文件提供了多个用于调用编译器功能的命令，供其他构建工具使用。本次发布对这些命令进行了多项改进，目的是让 Elixir 的 Mix 和 Erlang 的 rebar3 获得 Gleam 支持。</p>
<p>Erlang 虚拟机要求所有软件包除了编译器字节码外，还必须包含一个 .app 资源文件。此前，预计这些支持 Gleam 的构建工具会负责提供这些文件；现在，在编译为 BEAM 时，gleam 将为它们生成这些文件。</p>
<p>compile-package 命令新增了 --no-dev 标志。使用该标志后，编译器将只从 src 目录加载代码，并跳过 dev_dependencies 中列出的软件包。</p>
<p>export package-information 和 export package-interface 命令现在可以将信息打印到标准输出；此前它们必须将信息写入文件。与此同时，export javascript-prelude 和 export typescript-prelude 命令现在可以将内容写入文件。</p>
<p>感谢 Rodrigo Álvarez 带来的这些改进！希望我们很快就能看到 Gleam 获得 Elixir Mix 构建工具的支持。</p>
<p>Gleam 内置了出色的语言服务器，为所有支持语言服务器协议的编辑器提供 IDE 功能。此前最后一项主要缺失的功能，可能就是对字段和参数标签的完整支持。Alistair Smith 已修复这一问题，增加了对跳转到定义、查找引用和重命名标签的支持！感谢 Alistair，我知道很多人一定会对这项节省时间的功能感到非常高兴。</p>
<p>编译器提供了一个 WebAssembly 构建版本，语言导览和 Playground 使用它在网页浏览器中编译 Gleam。John Downey 新增了 format_source 函数，使人们能够在浏览器中运行 Gleam 代码格式化工具。我们将在不久后把这一功能加入 Playground。感谢 John！</p>
<p>尽可能让错误消息清晰且有帮助，对我们而言非常重要。工具在一切顺利时使用起来很友好固然很好，但当事情出错时，使用体验才真正可能帮助程序员减轻压力，也可能让压力雪上加霜。</p>
<p>一些无意造成的小型语法错误可能令人烦恼，尤其是在你不确定错误是什么、又发生在哪里时。</p>
<p>0xda157 为代码中出现 Git 合并冲突标记的情况新增了专门的错误提示；对于以原始记录位置错误的形式书写 User(..lucy, score: 10) 记录更新语法（例如 User(score: 10, ..lucy)）的情况，她也新增了专门的错误提示。她还为 Gleam 中不存在的过程式运算符（例如 += 和 *=）增加了错误提示。</p>
<p>n0kk23 为 | 在模式匹配中以无效的 Gleam 语法使用、但在 Java 等其他语言中有效的情况，增加了自定义的帮助性错误消息。</p>
<p>Giacomo Cavalieri 为常量表达式中不允许使用的二元运算符增加了帮助性错误消息；与此同时，他还提高了编译器在面对这些错误时的容错能力3。</p>
<p>Andrey Kozhev 为以下情况的错误消息增加了额外上下文：某个模块试图在同一软件包中的另一个模块里使用私有类型或值。新增信息会告知用户，该类型或值确实存在，但属于私有成员。对于依赖软件包中的模块，我们不会提供这类信息，以避免泄露程序员并不维护的代码信息。</p>
<p>最后，James Dolan 改进了类型检查器，使无效的类型别名定义不再导致该别名所有使用处接连产生更多错误。</p>
<p>感谢大家让 Gleam 的调试变得越来越容易。</p>
<p>也感谢所有修复错误和完善使用体验的人：</p>
<p>0xda157、Amr Kadry、Andrey Kozhev、Giacomo Cavalieri、Hari Mohan、Ian Chamberlain、Jack Programs、John Downey、Lillian Rose、Mar Bloeiman、mmustafasenoglu、Naomi Roberts、Rodrigo Álvarez、Senthilnathan、Surya Rose 和 Vivid。</p>
<p>有关他们实施的大量修复和改进的完整详情，请参阅变更日志。</p>
<p>Gleam 不归任何公司所有；相反，它完全依靠赞助者支持，其中大多数人每月捐助 5 至 20 美元，而 Gleam 是我唯一的收入来源。</p>
<p>我们已经朝着能够适当支付核心团队成员报酬的目标取得了很大进展，但仍有一段路要走。请考虑支持该项目或核心团队成员。</p>
<p>感谢所有赞助者！并特别感谢我们的顶级赞助商：</p>
<p>“转译器”（transpiler）指的是一种输出人类可读格式（例如源代码）的编译器。这是一个听起来很酷的词，但大多数时候，人们使用它是为了暗示某个编译器在某种程度上不够优秀。这种说法非常荒谬，因为将代码编译为人类可读格式，并不会让编译器更容易实现。如果你还在意输出格式是否美观，它甚至可能比使用二进制格式更难实现。</p>
<p>出于清晰起见，代码经过了少量编辑，但与这一改进相关的部分没有变化。</p>
<p>Gleam 的编译器是 Gleam 语言服务器的核心，因此与传统编译器不同，它需要能够在代码处于无效状态时，也提供有关代码的信息。如果只有有效代码才能被完整分析，那么当程序员正在进行重构或其他大规模编辑、尚未完成一半时，语言服务器将无法为其提供良好的使用体验。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-06 01:29 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://gleam.run/news/gleam-doesnt-compile-to-erlang-source-anymore/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--are-you-doing-this-week-8678e81b4727c310" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1945" data-content-paragraphs="30" data-published-at="2026-10-05T16:07:55.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-06 00:07</span>
</div>

### [你这周在做什么？](https://lobste.rs/s/nvkrb9/what_are_you_doing_this_week)
<div class="original-title-sub"><span class="orig-tag">原文</span> What are you doing this week?</div>

<div class="article-body" data-article-body="true"><p>你这周在做什么？欢迎分享！</p>
<p>请记住，什么都不做也完全没问题。</p>
<p>享受苏格兰之旅。几天里去了相当多的地方。</p>
<p>在开发 Janet 的基础设施。</p>
<p>Janet 原有的软件包管理器 JPM 即将被弃用，因此我们需要更好地记录替代方案的不同工作流程。我之前写过这方面的内容。现在，Janet 会在内部完成繁重的工作，让人们可以在此基础上轻松构建采用不同工作流程的软件包管理器，同时使用相同的数据。</p>
<p>我正在扩展对 sqlite3 扩展 API 的支持。首先做了一些重构，现在正在构建一堆随机项目，用来展示和探索这些扩展功能，其中包括以下演示／实验：</p>
<p>和软件包管理实验相关的是，我设计出了一套不错的工作流程，可以在不同的提交点上、使用不同的标志等构建完整的工具链，从而让我能够测试优化。由于一个错误，我有一段时间一直在拿全局的 -O3 原生构建与未优化的版本进行比较。到目前为止，我改进了相等性判断。目前，declarative-dsls 的测试套件在 master 分支上的运行速度比上一次发布版本快了 25%，许多其他完整程序的运行速度也提高了约 10%！</p>
<p>基本上，我现在就是在等刚刚结束的出差结出成果。</p>
<p>非常酷！我没法像自己希望的那样经常使用 Janet，但我确实从中获得了不少乐趣。</p>
<p>周四要和妻子去巴塞罗那庆祝结婚 25 周年。这将是我们 15 年来第一次不带孩子的假期。周三要收拾行李，还要准备好房子，迎接姻亲来住并帮忙照看孩子。</p>
<p>我一直在让 NetBSD 11.0 运行于 Netgate SG-1000 上——这是 Netgate 曾经作为 pfSense 设备出售的那款小型 AM335x 设备。</p>
<p>使用标准的 armv7 镜像加上修改过的设备树，可以通过 Netgate 的 U-Boot 从 SD 卡启动，无需对 eMMC 做任何改动。Netgate 的 Fatboot 启动脚本会检查 UserFatboot 变量，如果该变量已设置，就运行它。</p>
<p>BeagleBone Black 的设备树为 MII 配置了共享引脚，但 SG-1000 的线路采用的是 RGMII。这似乎就是我能获得千兆链路却没有入站流量的原因。移除 pinctrl 配置并修正 PHY 模式和地址后，其中一个端口可以工作了。</p>
<p>第二个 PHY 在 U-Boot 中显示正常，但 NetBSD 仍然无法附加它。这就是我本周正在研究的问题：阅读 CPSW 驱动程序的代码。</p>
<p>我希望整理出一份正式的板级 DTS，并构建一个 SD 镜像，让其他 SG-1000 用户可以直接将其写入存储卡并启动。</p>
<p>我目前正在为 Monocypher 中的 Argon2 增加多线程支持，而且完全不依赖任何多线程 API。我坚持采用“纯粹、可移植的 C99，零依赖”这一原则，正是这一点让这个小型库能够轻松集成到几乎任何地方。</p>
<p>相反，我把 API 拆分成 init()、update() 和 final() 这几个部分，让用户可以按照自己想要的方式实现并行处理：</p>
<p>单线程实现如下：</p>
<p>早期使用 pthreads 的实验表明，这应该能够轻松适配任何多线程 API。</p>
<p>下一步是编写文档，并提供一个达到生产质量的代码示例。</p>
<p>工作进入关键阶段了，所以这周我会把脑力都用在工作上，空闲时间则会做一些不太费脑的事情，比如玩轻松的电子游戏和阅读。</p>
<p>这个周末我查看了周末讨论串中提到的编辑器，准备按照 jbauer 的建议，暂时试用 Sublime Text；它似乎满足了我的大部分要求。目前为止一切顺利。我喜欢开源软件，但并不介意为软件付费，尤其是为一家由开发者主导的小公司付费。</p>
<p>我当前的编程项目是实现一种复杂而精巧的类国际象棋游戏 Veney。</p>
<p>如果还有其他人感兴趣，网址是：https://veney.xyz/</p>
<p>我以前从没听说过这个游戏。尽管它被拿来与国际象棋比较，但只要粗略读一下规则，就会觉得它与我听说过的其他任何棋盘游戏都大不相同。</p>
<p>这周我在开发 Folune——一款极简、优先本地运行的桌面文本和 Markdown 编辑器，使用 Zig、原生 WebView 和 CodeMirror 构建。</p>
<p>和往常一样，我主要是在开发自己的文本编辑器。谢天谢地，开发它很有趣，因为它确实花了很长时间才完成！</p>
<p>我目前的架构长期以来一直很好用。但我认为需要调整一些底层状态管理机制，以便支持真正的事务性变更。我从 CodeMirror 6 的架构中获得了很多启发。</p>
<p>我相当有信心，可以借助一些最终一致性机制实现我想要的效果。如果你感兴趣，可以在这里看到我对此的进一步说明。</p>
<p>领养两只猫 🐱😸。另外还要工作。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-06 00:07 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://lobste.rs/s/nvkrb9/what_are_you_doing_this_week" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::