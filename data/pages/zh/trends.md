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
<div id="story-oft-deprecating-re-match-5fe75a5fc53d34ad" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1129" data-content-paragraphs="1" data-published-at="2026-09-10T21:59:16.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-11 05:59</span>
</div>

### [软弃用 re.match()](https://hugovk.dev/blog/2026/soft-deprecating-re.match/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Soft-deprecating re.match()</div>

<div class="article-body" data-article-body="true"><p>快，别去查资料，说说 re.match() 是做什么用的？以下哪一项会返回匹配结果？<br />它与 re.search() 以及 re.fullmatch() 相比又有什么区别？<br />趁着你正在（快速）思考这个问题，我们来介绍一下“软弃用”（soft deprecation）。<br />Python 的向后兼容性策略（PEP 387）在 2023 年引入了软弃用机制：<br />当某个 API 不应再用于编写新代码，但在现有代码中继续使用仍然保持安全时，就可以采用软弃用。该 API 仍会保留文档并进行测试，但不会再对其进行进一步开发（不添加新功能）。<br />软弃用并不意味着未来会移除该 API，也不会发出警告。它只是仅停留在文档层面的不建议使用该 API 的建议，通常还会给出推荐的替代方案。<br />至于是否以及何时将软弃用转变为常规的“硬”弃用（随后可能会彻底移除），完全是另一项独立的决策；软弃用并不会自动“晋升”为常规弃用或被移除。<br />因此，re.match() 实际上只在字符串的开头进行匹配！这可能会让人感到意外：为什么字符串的开头会如此特殊？<br />如果你不想固定在开头匹配，而是想在字符串的任意位置进行匹配，请使用 re.search()：<br />如果你既想固定开头又想固定结尾，检查整个字符串是否匹配，请使用 re.fullmatch()：<br />正是因为这种令人意外的“半锚定”行为，我们在 Python 3.15 中为 re.match() 引入了一个新别名，名为 re.prefixmatch()：<br />引用《Python 之禅》（python3 -m this）中的一句话：“显式优于隐式”。任何人在看到 prefixmatch() 这个名称时，很可能都会立刻理解其预期的语义。而对于尚未熟悉这个 Python 历史遗留陷阱的人来说，在阅读 match() 时，心里总会对其实际行为存有一丝疑虑。<br />有了更显式的替代品后，我们在 Python 3.15 中对 re.match() 进行了软弃用：<br />我们并不打算移除旧有的 match() 这个名称，因为它已经在代码中使用了超过 30 年。它已被软弃用：需要支持较旧版本 Python 的代码应继续使用 match()，而新编写的代码则应优先使用 prefixmatch()。<br />只有当你确实只需要这种半锚定行为时，才使用 re.prefixmatch()；否则，请使用 re.search() 或 re.fullmatch()。<br />没有特殊字符的函数通常执行速度会稍快一些。<br />你可以在项目中借助 Ruff 来避免使用 re.match()：<br />题图：自行车与行人模板双重曝光照片（CC BY-NC-SA 2.0 Hugo van Kemenade）。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>Python 的向后兼容策略（PEP 387）于 2023 年引入了“软弃用”（soft deprecation）概念。</li>
    <li>软弃用是指某个 API 不应再用于编写新代码，但在现有代码中继续使用仍然安全；软弃用不意味着未来一定会移除该 API，也不会发出警告，仅作为文档中的不推荐使用建议。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://hugovk.dev/blog/2026/soft-deprecating-re.match/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-item-8a51732b48f2dcf0" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="597" data-content-paragraphs="1" data-published-at="2026-09-10T19:40:27.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-11 03:40</span>
</div>

### [要闻：Gleam Gathering 重磅回归，落户伦敦](https://gleamgathering.com/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Gleam Gathering 2027</div>

<div class="article-body" data-article-body="true"><p>Gleam Gathering 重磅回归，落户伦敦。<br />在此度过一个充实的周末：<br />Gleam 语言创始人<br />查看我们的演讲征集通知<br />2027 年的活动将在伦敦市中心的专属活动场地哈勒姆街 44 号（44 Hallam St）举行。<br />请访问他们的路线指引页面，获取前往该地的详细信息。<br />如果您没有看到任何购票选项，可以点击此处。我们收到反馈称该部分有时无法加载。<br />我们现已开始接收 Gleam Gathering 2027 的演讲提案。无论您是经验丰富的讲者还是初涉演讲的新手，我们都渴望倾听您的想法。这是您为社区贡献力量、分享知识并启发他人的绝佳机会。Gleam 欢迎所有人，我们也希望确保在 GG27 中延续这一传统。<br />我们欢迎符合以下特点的演讲：<br />本次我们暂不寻求的内容：<br />我们致力于为每一位提交提案的讲者提供支持。您可以期待我们提供以下帮助：<br />我在网上的昵称是 Crowdhailer，编程已有十余载。作为 Gleam 的早期贡献者，我一直对 Gleam 为编程社区带来的无限可能感到无比兴奋。在生产环境之外不用 Gleam 时，我便致力于开发自己的编程语言 EYG。2027 年见？<br />凝聚社区是本次活动的核心，我们也希望将这份合作延伸至活动的潜在赞助商。如果您所在的企业或您了解的机构有意赞助 GG27，请随时通过 gleamgathering2026@gmail.com 与我们取得联系。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-11 03:40 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://gleamgathering.com/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-log-what-comes-after-git-302f50f7ea4270e4" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3063" data-content-paragraphs="20" data-published-at="2026-09-10T17:44:27.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-11 01:44</span>
</div>

### [Git 之后由谁接棒？](https://ersc.io/blog/what-comes-after-git)
<div class="original-title-sub"><span class="orig-tag">原文</span> What comes after git</div>

<div class="article-body" data-article-body="true"><p>East River Source Control 成立至今已有一年多了，但我们此前并未过多公开谈论我们正在开发的内容。我们目前还没有正式发布任何产品——不过很快就会发布——但我们希望在此分享一些关于版本控制以及未来发展方向的思考。</p>
<p>软件开发从根本上说是一项协作性工作。项目起初往往微不足道，最终却可能成长为极其庞大且复杂的系统。然而，无论是 cargo new 生成的基础代码，还是包含数十亿行代码的单体大仓（monorepo），其本质都是一样的：源代码。安全、稳妥地存储这些代码，管理其随时间的演进，并确保开发者随时可用，是任何技术机构最关键的核心职责之一。</p>
<p>在过去，你的代码可能会存放在一台共享服务器上。随后，学术界和工业界陆续研发出了如今被称为源码控制管理（SCM）和版本控制系统（VCS）的工具。即使仅在版本控制领域，多年来我们也见证了许许多多的工具：CVS、SVN 和 Git 曾先后主导了开源领域，但此外还有 Perforce、ClearCase、Fossil、Mercurial、SCCS、Monotone、BitKeeper 等诸多工具。这些工具成为了存储代码并让团队协同修改的标准方式。</p>
<p>智能体驱动开发（agentic development）的兴起改变了我们开发软件的许多环节，但也给版本控制系统带来了尤为严峻的压力。团队正在以史无前例的速度生成更多代码，导致代码仓库急剧膨胀、活跃分支数量激增，并在合并新工作时造成严重的冲突竞争。智能体非常适合与单体大仓协同工作，因为它们能够更轻松地获取更多上下文，但这同时也加剧了上述问题。它们正将开发环境迁移至云端的隔离环境中，这意味着它们需要极快的克隆时间。过去，所有这些问题都是超大型企业专属的难题，但智能体的普及正在将大厂的烦恼带给每个人。</p>
<p>我们相信，随着各组织不断扩大其雄心抱负，他们将需要下一代版本控制工具。然而，他们在此领域采用新工具时表现得较为保守也是合情合理的。如上所述，源代码是一个机构所拥有的最宝贵的资产之一，变革既带来回报，也伴随着风险。我们非常理解这些顾虑，因此我们正在架起一座连接当下与未来的桥梁。</p>
<p>不过，市面上已经有许多 Git 服务器了。我们有何特别之处？</p>
<p>从高层架构来看，大多数提供 Git 代码仓库托管服务的地方大致如下运作：</p>
<p>你的 Git 客户端通过 Git 协议连接到其服务。在服务端内部，他们将你的代码仓库存储在磁盘上，并通过一个服务层连接两者。</p>
<p>当然，这种说法有点过于简化了：实际上会有很多台服务器，仓库前端还有一层复杂的服务系统。存储会进行多副本复制，底层还有各种机制在运转。我们这里聚焦的是整体架构，但切勿将示意图的简略误认为是系统的简单。这里面包含了大量的运作细节，只是那些细节在眼下并不关键。</p>
<p>本着这种原则，以下是我们正在做的事情的架构示意：</p>
<p>两者看起来非常相似！这也是简化后的结构，例如架构图中根本没有展示 GraphQL API 接口。但其中的差异至关重要：虽然你仍然使用常用的 Git 客户端连接到我们的存储，且底层使用的是 Git 协议，但我们并不在服务器上存储 Git 格式的仓库。相反，我们开发了一个自定义存储引擎。</p>
<p>坦白地说，我们不认为 Git 是源码控制的未来。Git 已经出色地服务了开发者很多年，但它的设计是围绕 2005 年的各种限制展开的，而不是 2025 年，更不用说 2035 年了。例如，它是专为 Linux 内核打造的——一个开源项目。开源对我们的行业极其重要，但这同时也意味着它缺少一些关键功能，而这些功能对于不公开共享代码的组织而言非常实用。此外，虽然 Linux 内核并非小型仓库（7.2 版本约为 4300 万行代码），但业内各大头部公司在数年前就已经拥有以数十亿行代码计的单体大仓了。在这样的规模下，架构决策至关重要。</p>
<p>与此同时，要考虑采用其他版本控制系统又非常困难。Git 已经深深植根于我们的各类工具生态中：我们说的是 GitOps，而不是 SvnOps！有太多工具原生支持 Git 协议，这使得评估替代方案变得难上加难。当年 Git 诞生时，几乎同一时期还涌现了其他几个项目，尤其是 Mercurial 和 Bazaar。但网络效应使得 Git 最终被几乎所有人采用。</p>
<p>那么该怎么做？那就是在保留 Git 协议接口的同时，重构存储层的工作方式。虽然这并不能解决我们预见到的未来所有问题，但这确实有所裨益。与以原生 Git 仓库作为唯一事实来源的系统不同，我们的系统能够实现真正的水平扩展。而且由于这并非一个全局统一的多租户平台，各个部署彼此独立，其他公司的使用情况不会对你产生影响。这赋予了你可靠性与掌控力，而这两点在谈论基础设施时至关重要。</p>
<p>那么未来的可能性又是怎样的呢？如果你需要超越 Git 协议所能提供的扩展能力，或者你需要 Git 不具备的功能，该怎么办？支持通信协议这种策略有一个优势：你可以同时支持多种协议。</p>
<p>这正是 Jujutsu（jj）大显身手的地方。在 ERSC，我们是 jj 的忠实粉丝，部分原因在于我们非常赞赏它作为一项易于循序渐进采用的技术典范。虽然 jj 是一个独立的版本控制系统，但它具备与多种不同后端通信的能力。大多数开发者使用带 Git 后端的 jj 来直接操作本地 Git 仓库，但 Google 也为其内部的 Piper 版本控制系统开发了后端。这使得单个开发者能够在工作中使用 jj，即便同事们仍然使用普通 Git 客户端也是如此：对服务器而言，它无非是另一个使用 Git 协议的用户。我们将在服务端借鉴这一策略：</p>
<p>这开辟了一条通往版本控制未来的平滑路径：你可以先从使用传统熟悉的 git 开始，享受可靠且可水平扩展的源码控制管理服务。单个开发者可以按照自己的节奏选择采用 jj，而当你准备好迈出新的一步时，jj 可以通过另一种不同的协议与同一个底层引擎通信。</p>
<p>关于此有一点需要重要说明：这是未来的工作，目前尚未推出。上游目前并没有“jj 原生”协议，我们也不声称这就是我们正在构建的东西。如果这作为一个上游特性有用且上游希望支持它，我们将就此与社区开展合作。而且该协议将会有详尽的文档说明，支持该协议的任何客户端修改都将开源。我们不会想当然地认为，仅仅因为我们构建了这样一个东西上游就会想要使用它，因为 Git 协议如今已经能够满足其大多数用户的需求。无论最终形式如何，我们都致力于在 jj 生态系统中扮演好积极建设者的角色。</p>
<p>存储解决方案仅仅是团队围绕代码进行协作所需的一部分。代码审查（Code Review）、持续集成（CI）、问题追踪（issue tracking），不一而足。虽然传统的软件代码托管平台（forge）通常将所有功能打包在一个统一的套件中提供，但我们相信，软件正在进入一个更具可定制性的时代。因此，我们提供的产品更像是积木块，而非单一的代码托管平台。存储是基础，因此它最先推出。但你可以预见的是，我们希望让我们的存储解决方案与你的其余软件技术栈协同工作，而不是相互排斥。虽然我们将在版本控制系统（VCS）领域提供多款产品，但如果你希望在技术栈的其余部分使用自己的软件，完全可以这样做。或者，如果你想采用我们第一方产品的某些部分，并搭配一部分你自己的工具，那也非常好。</p>
<p>虽然目前这些都尚未正式推出，但我们很快就会逐步开放。与此同时，我们下周在 JJ Con 上见！</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-11 01:44 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://ersc.io/blog/what-comes-after-git" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-oldnewthing-20260909-00-7040bcc06f184be9" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1062" data-content-paragraphs="12" data-published-at="2026-09-10T15:48:37.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 23:48</span>
</div>

### [Windows XP 使用什么算法来选择你的初始用户图片？](https://devblogs.microsoft.com/oldnewthing/20260909-00/?p=112683)
<div class="original-title-sub"><span class="orig-tag">原文</span> What algorithm did Windows XP use to choose your initial user picture?</div>

<div class="article-body" data-article-body="true"><p>评论</p>
<p>前段时间我曾提到，Windows XP 会从 %ALLUSERSPROFILE%\Application Data\Microsoft\User Account Pictures\Default Pictures 目录中的图片里随机选择一张，作为你的初始图片。但看来人们还想了解更多。</p>
<p>有人尝试弄清楚过 Windows XP 在首次创建账户时，是通过什么随机数生成器（RNG）来决定使用哪张个人资料图片的吗？</p>
<p>——Xeno（@XenoPanther），2025 年 12 月 11 日</p>
<p>随机数生成器是我们的老朋友 RtlRandomEx，初始种子使用的是 GetTickCount() 的当前值。</p>
<p>该函数使用单遍随机选择算法。我马上能想到采用这一决策的两个好处。首先，与朴素的两遍算法相比，它更加高效。后者会先统计所有项目的数量，然后从 1 到 n 中随机选取一个数字，接着再遍历一遍，以找到位于该索引处的项目；而单遍算法减少了对文件系统的调用次数。文件系统正是瓶颈所在。此外，如果代码运行期间目录中的文件数量发生变化，单遍算法也能避免由此产生的复杂情况。</p>
<p>单遍算法是蓄水池抽样（reservoir sampling）的一种特殊情况，其中 k 等于 1。这种特殊情况允许使用一种量身定制、简单得多的算法。</p>
<p>该算法的工作方式是：在包含 n 个项目的集合中，最后一个项目被随机选中的概率为 1/n。如果它没有被选中，那么就需要从前 n − 1 个项目中随机选择一个，而这可以通过递归解决。</p>
<p>将递归过程正向展开：首先从基本情况开始——如果列表中只有 1 个项目，那么唯一的选择就是该项目。否则，如果列表中有 n 个项目，就先从前 n − 1 个项目中随机选择一个，然后以 1/n 的概率切换到第 n 个项目。</p>
<p>作为最后一道安全检查，代码会在抽样 100 张图片后停止。如果有人在 Default Pictures 目录中放入一百万个文件，这可以避免出现病态行为。</p>
<p>Raymond 参与 Windows 的发展已经超过 30 年。2003 年，他创建了一个名为 The Old New Thing 的网站，其受欢迎程度远远超出了他的想象；这一发展至今仍让他感到毛骨悚然。该网站后来催生了一本书，书名碰巧也叫 The Old New Thing（Addison Wesley，2007 年）。他偶尔会出现在 Windows Dev Docs 的 Twitter 账号上，讲述一些毫无用处的故事。</p>
<p>加入讨论。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-10 23:48 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://devblogs.microsoft.com/oldnewthing/20260909-00/?p=112683" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-n-the-windows-11-notepad-20ddaa9053f8368b" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="256" data-content-paragraphs="4" data-published-at="2026-09-10T15:46:32.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 23:46</span>
</div>

### [Windows 11 记事本中糟糕的菜单栏](https://blog.yuo.be/2026/09/10/the-terrible-menu-bar-in-the-windows-11-notepad/)
<div class="original-title-sub"><span class="orig-tag">原文</span> The terrible menu bar in the Windows 11 Notepad</div>

<div class="article-body" data-article-body="true"><p>2026年9月10日 • 阅读时长3分钟 • 标签：#windows</p>
<p>这在新版记事本中能用吗？不能。下面是一段相当没有意义的录屏，展示了所发生的情况：</p>
<p>我不能说自己非常喜欢它（我的意思是，看看那个“P”——“粘贴”选项的位置）。先不说这个，每当你使用 Alt 键时，这些访问键就会显示出来。不过，如果你随后使用方向键进行导航，它们就会消失。我很难看出这会是预期行为，因为你仍然是在使用键盘进行导航。</p>
<p>奇怪的是，这会让鼠标指针出现一些异常表现。而且，如果你这样操作几次，原本被禁用的项目突然就会变成启用状态。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-10 23:46 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.yuo.be/2026/09/10/the-terrible-menu-bar-in-the-windows-11-notepad/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-misc-domains-e43d375c46e69c7b" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="924" data-content-paragraphs="16" data-published-at="2026-09-10T15:14:48.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 23:14</span>
</div>

### [关于网络钓鱼的吐槽：这不是用户的错（DNS也不是）](https://maurycyz.com/misc/domains/)
<div class="original-title-sub"><span class="orig-tag">原文</span> A rant about phishing: It&#39;s not the user&#39;s fault (and not DNS either)</div>

<div class="article-body" data-article-body="true"><p>“为了安全起见，不要点击可疑链接。”</p>
<p>用户名、密码和双因素认证提示都不在该公司的自有域名上。再加上令牌过期会触发随机的身份验证弹窗，用户几乎不可能注意到网络钓鱼……因为真实页面看起来和骗局一模一样：</p>
<p>攻击者只需制作一个带有密码输入框和公司标志的网站即可。URL是什么并不重要，因为用户已经学会忽略它。</p>
<p>我承认，URL并不是最直观的东西，因为它的阅读方向会交替变化。主机名和方案从具体到一般，而路径则相反：</p>
<p>因此，重要的部分（二级域名）位于URL的中间。这是必须教给非技术用户的内容：仅仅告诉他们“避开可疑链接”是不够的。</p>
<p>然而，如果主机名不是可靠的识别标志，那么整个做法就毫无意义。</p>
<p>如果用户想要有任何机会识别骗局……</p>
<p>组织机构必须使用单一且广为人知的根域名。内部服务必须位于该根域名的子域名上，并且不得使用如下URL：</p>
<p>通过电子邮件或短信发送的链接必须位于可识别的域名下。如果确实有必要将用户引导至其他地方，就创建一个本地重定向或链接：</p>
<p>这并不意味着所有内容都必须由该组织托管：许多服务支持使用自有域名，而且链接是免费的。</p>
<p>这条规则同样适用于电话号码：不要发送短信或电子邮件，告诉用户“拨打0491-570-006”，因为人们无法判断这是否是骗局。联系方式必须提供在一张通过原始消息链接到的网页上。</p>
<p>本文档中的关键词“MUST”（必须）、“MUST NOT”（不得）、“REQUIRED”（要求）、“SHALL”（应当）、“SHALL NOT”（不得）、“SHOULD”（应该）、“SHOULD NOT”（不应该）、“RECOMMENDED”（建议）、“MAY”（可以）和“OPTIONAL”（可选），其含义应按照RFC 2119中的描述进行解释……</p>
<p>主机名的情况已经糟糕到如此地步：我见过有人认为，子域名的存在本身就是一个问题，因为它让犯罪分子能够在没有任何监管的情况下冒充他们想冒充的任何人。</p>
<p>DNS是一个层级系统，其结构在40多年里都没有改变：</p>
<p>任何网站由谁运营，本来绝对不应存在混淆……然而，现实是，人们通常会花费很大力气，让合法网站与骗局难以区分。</p>
<p>（甚至各国政府也没有始终如一地使用分配给它们的顶级域名）</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-10 23:14 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://maurycyz.com/misc/domains/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::