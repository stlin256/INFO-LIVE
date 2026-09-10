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
<div id="story-log-what-comes-after-git-302f50f7ea4270e4" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2961" data-content-paragraphs="20" data-published-at="2026-09-10T17:44:27.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-11 01:44</span>
</div>

### [Git 之后何去何从](https://ersc.io/blog/what-comes-after-git)
<div class="original-title-sub"><span class="orig-tag">原文</span> What comes after git</div>

<div class="article-body" data-article-body="true"><p>East River Source Control 成立已有一年多，但我们此前很少公开谈论我们正在从事的项目。我们目前还不准备正式宣布任何产品，不过很快就会了；但在那之前，我们想分享一些关于版本控制及其未来发展方向的思考。</p>
<p>构建软件从根本上说是一项协作任务。项目通常始于微末，最终成长为极其庞大而复杂的系统。但无论是 cargo new 生成的代码，还是包含数十亿行代码的单体仓库（monorepo），其本质都一样：源代码。安全可靠地存储这些代码、管理其随时间的变化，并确保开发者随时可用，是任何技术机构最核心的职能之一。</p>
<p>在过去，你可能曾使用一台存放代码的共享服务器。学术界以及后来的工业界开发了如今被称为源码控制管理（SCM）和版本控制系统（VCS）的工具。甚至在 VCS 领域内部，这些年来我们也见证了无数工具的兴衰：CVS、SVN 和 Git 是主导开源领域的工具，但也有其他系统：Perforce、ClearCase、Fossil、Mercurial、SCSS、Monotone、BitKeeper 等等。这些工具成为了存储代码以及团队协作修改代码的标准方式。</p>
<p>基于智能体（Agentic）开发的兴起改变了我们开发软件的许多方面，但也对版本控制系统带来了尤其严峻的压力。团队正以前所未有的速度编写更多代码，仓库规模急剧膨胀，活跃分支数量激增，合并新工作时产生严重冲突。智能体在单体仓库中表现出色，因为它们可以更轻松地获取更多上下文信息，而这也加剧了上述问题。它们正在将开发环境迁移到云端的隔离环境中，这意味着它们需要极快的克隆（clone）速度。所有这些问题过去通常只属于大型企业，但智能体正在把大公司的问题带给每一个团队。</p>
<p>我们相信，随着各家机构的雄心持续扩张，他们将需要下一代 VCS 工具。但在采用该领域的新工具方面，他们表现得较为保守也是理所应当的。如前所述，源代码是机构拥有的最宝贵资产之一，变革既带来回报，也伴随风险。我们深知这些顾虑，因此正在搭建一座连接当下与未来的桥梁。</p>
<p>不过，现存的 Git 服务器已经数不胜数。那我们有什么特别之处？</p>
<p>从宏观角度来看，大多数为你托管 Git 仓库的平台其运作方式大致如下：</p>
<p>你的 git 客户端通过 Git 协议连接到其服务。在服务内部，他们将你的仓库存储在磁盘上，并通过一个服务层将两者连接起来。</p>
<p>当然，这种描述略显简化：实际情况会有许多台服务器，仓库前面还有一层复杂的微服务。存储层具有副本备份，后台还运行着各种各样的处理。我们这里关注的是整体架构，但切勿将架构图的简洁误认为是系统的简单。这里涉及很多内容，但那些细节在当下并非关键。</p>
<p>基于这种思路，以下是我们方案的示意图：</p>
<p>它看起来非常相似！这也是简化后的，例如图中完全没有展示 GraphQL API 接口。但其中的区别至关重要：虽然你仍然使用常用的 git 客户端通过 Git 协议连接到我们的存储，但我们并没有在服务器上存储 Git 仓库。相反，我们开发了自定义的存储引擎。</p>
<p>简而言之，我们不认为 Git 代表着源码控制的未来。Git 服务开发者多年，表现优异，但它是围绕 2005 年而非 2025 年（更不用说 2035 年）的技术约束设计的。例如，它是专为 Linux 内核这一开源项目构建的。开源对我们的行业极其重要，但这意味着它缺少对于不公开代码的企业来说非常有用的关键特性。此外，尽管 Linux 内核不是一个小仓库——其 7.2 版本大约有 4300 万行代码——但业内主流公司早在几年前就拥有规模达数十亿行代码的单体仓库了。在这样的规模下，技术选型至关重要。</p>
<p>与此同时，考虑更换版本控制系统又非常困难。Git 已经深植于我们众多的工具链中：现在的规范是 GitOps，而不是 SvnOps！无数工具都在使用 Git 协议与生态，这使得探索替代方案步履维艰。在 Git 诞生之时，周边几乎同时出现了几个类似项目，最著名的有 Mercurial 和 Bazaar。但网络效应使得 Git 最终被几乎所有人采用。</p>
<p>那么该怎么办呢？支持 Git 协议，同时彻底改造底层存储层的运作机制。虽然这并不能解决我们预见的所有未来问题，但确实大有裨益。与以传统 Git 仓库为真实源（source of truth）的系统不同，我们的系统可以实现横向扩展。而且由于这不是一个全局统一的平台，其他公司的资源使用不会影响到你，因为各部署环境彼此隔离。这为你带来了可靠性与控制力——在谈论基础设施时，这两点至关重要。</p>
<p>那么未来的可能性呢？如果你需要的扩展规模超出了 Git 协议所能承载的范围，或者你需要 Git 所不具备的功能怎么办？兼容现有协议的这种策略有一个优势：你可以同时支持多种协议。</p>
<p>这正是 Jujutsu（jj）大展身手的地方。在 ERSC，我们是 jj 的忠实粉丝，部分原因在于我们非常赞赏它作为一项易于渐进式采纳的技术典范。尽管 jj 本身是一套独立的版本控制系统，但它具备与多种不同后端通信的能力。大多数开发者使用 jj 的 Git 后端直接操作本地 Git 仓库，但 Google 也为其内部的 Piper 版本控制系统开发了后端。这使得单个开发者能够在工作中使用 jj，即便同事们仍在继续使用传统的 Git 客户端：对服务器来说，jj 用户不过是又一个 Git 协议使用者罢了。我们将在服务端采用相同的策略：</p>
<p>这为通往版本控制的未来铺平了一条顺畅的道路：你可以先从熟悉的传统 git 开始，享受可靠且可扩展的源码控制管理。单个开发者可以按自己的节奏选择采纳 jj；当你准备好更进一步时，jj 可以通过不同的协议与同一个底层引擎通信。</p>
<p>关于此点有一项重要说明：这是未来的规划工作，目前尚未推出。上游目前并没有“jj 原生”（jj native）协议，我们也没有声称我们正在构建的就是该协议。如果这在上游被证明是有价值的且上游希望提供支持，我们将与社区就此展开合作。此外，该协议将提供完备的文档，任何用于支持它的客户端改动都将开源。我们不会想当然地认为只要我们构建了这样的协议上游就会想要使用，因为 Git 协议目前已经能够满足其大多数用户的需求。无论最终呈现为什么形式，我们都致力于成为 jj 生态系统中优秀的参与者。</p>
<p>存储解决方案只是团队围绕代码开展协作所需的一部分。代码审查（Code Review）、持续集成（CI）、问题追踪（Issue Tracking）等需求不胜枚举。虽然传统的软件代码托管平台（forge）曾以一体化打包的形式提供所有功能，但我们相信软件正在进入一个更具可定制性的时代。因此，我们的产品形态更像是积木组件，而非单一的代码托管平台。存储是基石，因而最先推出。但你可以确信，我们致力于让存储解决方案与你的其余软件技术栈协同运作，而非相互冲突。尽管我们将在版本控制系统（VCS）领域推出多款产品，但如果你想在技术栈的其余环节采用自己的软件，完全可行；或者如果你想采用我们的部分第一方组件并搭配自己的工具，那同样非常合适。</p>
<p>尽管上述所有内容目前都尚未上线，但我们很快就会对外开放。在此期间，我们下周的 JJ Con 大会见！</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>East River Source Control (ERSC) 已经成立并运作了一年多。</li>
    <li>Linux 内核 7.2 版本的代码行数约为 4300 万行。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://ersc.io/blog/what-comes-after-git" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-post-26-09-10-yaml-spec-51e46bed28bf96dd" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7009" data-content-paragraphs="46" data-published-at="2026-09-10T17:04:10.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-11 01:04</span>
</div>

### [这并非 YAML 规范的错，但是……](https://slugcat.systems/post/26-09-10-yaml-spec/)
<div class="original-title-sub"><span class="orig-tag">原文</span> It&#39;s not the YAML spec&#39;s fault, but</div>

<div class="article-body" data-article-body="true"><p>我又看到了一篇喷 YAML 的博文。作者一边自豪地反复念叨着“挪威问题”，一边发表着各种不实言论。于是我自己去深入探究了一番，以下是我的发现。</p>
<p>YAML™（发音与“camel”押韵）是一种人类友好的、跨语言的、基于 Unicode 的数据序列化语言，围绕动态编程语言常见的原生数据类型而设计。它广泛适用于从配置文件到互联网消息传递，再到对象持久化、数据审计和可视化的各种编程需求。</p>
<p>多年来，YAML 在许多领域变得相当流行。根据你作为程序员的经验多少，你可能之前在配置文件或其他什么地方见过它。在此期间，它也招致了大量批评。通常存在三个大问题，它们以不同的方式相互交织：</p>
<p>这些批评中有一部分是合理的，但也有一些是用错了地方。至少，这是我此前的理解。让我们来看一看。</p>
<p>在我多年的编程生涯中，我在许多项目中用过 YAML、TOML、JSON 等格式。我对所有这些都有话要说，但我会重点谈谈 YAML 部分。</p>
<p>我真正使用 YAML 制作的第一个东西是我在 9 年前编写的自定义 Python Discord 机器人。这大概是我第一个没有参与《空间站 13》（Space Station 13）的“大型”项目，因此大部分内容都是我自己独立完成的。我最终使用了 YAML 作为配置文件。我没有遇到任何常见的针对 YAML 的吐槽问题，但我意识到这纯属走运。我当时仅仅使用了 yaml.safe_load()，仅此而已。</p>
<p>这并不意味着使用 YAML 时完全没有遇到问题。我的配置文件运行机制有一个很愚蠢的地方：我实际上有两个文件——config.yml 和 override.yml。这是因为我总是需要加载 config.yml 来提供基本结构和默认值，然后再将 override.yml 合并进去，以创建 Python 代码可以访问的嵌套数据结构。但这难道是 YAML 的错吗？不，并不是。</p>
<p>我在用于持久化数据的 pickle 文件上也遇到过其他序列化问题。诸如“defaultdict 实例在序列化时会遇到问题，因为它们实际上存储了一个 lambda”之类的蠢事。如今回顾那个时期，我可以意识到这里的常见根源是什么：Python。或者更准确地说，是动态语言的通病。在像 Python 这样的动态语言中，根本不可能正确地进行“转入/转出对象”的序列化。</p>
<p>言归正传。下一个项目。《空间站 14》（Space Station 14）在所有“原型”（以及一些其他内容）中都使用了 YAML。这意味着实体、配方以及大约 200 项其他内容的数据定义。最初该项目实际上是用 XML 来做这些的，但当我接手负责时，我决定将其切换为 YAML。在很大程度上，这是一个“巨大的成功”。我们真正遇到的最大问题在于，新贡献者有时很难意识到它是空白符敏感的，从而会导致一些愚蠢的语法错误。虽然恼人，但并非世界末日。</p>
<p>我们是如何避免“挪威问题”的？秘诀在于：虽然具体的实现细节有所变化（我们现在处于“serv3”版本，实际上可能已经是第 4 版了），但我们始终是用我们自己的代码来实现真正的对象反序列化逻辑的。这意味着我们从库中获取图节点对象（YamlMappingNode、YamlScalarNode 等），然后由我们自己进行解析。我们不会在不该将“no”反序列化为布尔值的时候将其处理为布尔值，因为我们只在读取需要接收布尔值的字段时才进行布尔反序列化。令人惊讶吧。</p>
<p>当然，这才是进行对象序列化的正确方式。你应当对照程序代码中设定的模型进行序列化。这就是我们在《空间站 14》中避免荒唐错误的方式，也是我本来可以在自己的 Discord 机器人中避免那些荒唐错误的方式。因此，每当我看到那些抱怨 YAML 有多“糟糕”、因为它可能会错误地将“no”反序列化的文章时，我脑海中浮现的只有一句话：“巨大且彻底的动态类型技术实力不足（skill issue）。”</p>
<p>但事实真是如此吗？如果我错了呢？如果我们用错了 YAML，而规范本身恰恰要求这种行为呢？那我不就彻底出丑了吗！所以……让我们去查查那该死的规范！</p>
<p>根据他们的官方网站，YAML 有几个重要的修订版本：1.0（2004年1月）、1.1（2005年1月）、1.2（2009年7月）。让我们先看看 1.0 版到底是怎么回事。</p>
<p>如果你开始深入研究，你会很快发现该规范在类型转换和解析应该如何运作方面的细节非常少。第 2.4 节是这样说的：</p>
<p>在 YAML 中，纯文本（未加引号的）标量会根据应用程序获得一个隐式类型。本规范中的示例使用了来自 YAML 标签仓库的类型，包括整数、浮点数值、时间戳、空值、布尔值和字符串值等类型。</p>
<p>顺着链接点进去，我们看到：</p>
<p>以下是三个强制性核心标签的描述。YAML 要求支持 seq、map 和 str 标签。YAML 还在 YAML 标签仓库（位于 https://yaml.org/spec/type.html）中提供了一组非强制性的通用标签。这些标签代表了大多数编程语言中的原生数据类型，或者在广泛的应用程序中非常有用。因此，强烈建议应用程序在合适的情况下使用它们，以提高 YAML 系统之间的互操作性。</p>
<p>最后一个链接已经失效了，但它指向的大概率是类似于“YAML™ 1.1 版语言无关整数类型”的内容。例如，查看整数类型：</p>
<p>解析与验证：<br />有效值必须匹配以下正则表达式，该表达式也可用于隐式标签解析：<br />[-+]?0b[0-1_]+ # (2进制) |[-+]?0[0-7_]+ # (8进制) |[-+]?(0|[1-9][0-9_]*) # (10进制) |[-+]?0x[0-9a-fA-F_]+ # (16进制) |[-+]?[1-9][0-9_]*(:[0-5]?[0-9])+ # (60进制)</p>
<p>如果我们继续在主规范中搜索关于隐式键入的内容，会在第 3.3.2 节中看到以下内容：</p>
<p>纯标量样式的例外情况允许未加引号的值表示数字、日期或其他类型的数据，而加引号的值则被视为普通字符串。有了这一例外，处理器可以将纯标量与一组正则表达式进行匹配，以在没有显式[原文如此]标签的情况下提供此类类型的自动解析。</p>
<p>好了，这里提醒一下。YAML 规范对于诸如“may”（可以）等某些关键词确实遵循了 RFC 2119 规范。你可能已经注意到了“may”一词的使用以及诸如“取决于应用程序”之类的模棱两可的说辞。确实如此：我对 YAML 1.0 的解读认同这一点——这完全取决于应用程序自身。</p>
<p>YAML 1.1 似乎并没有脱离这一点太远，只是让涉及的语言表述变得更加复杂。同样的第 3.3.2 节：</p>
<p>标签解析是特定于应用程序的，因此 YAML 处理器应该提供一种允许应用程序指定标签解析规则的机制。[…]</p>
<p>直到 YAML 1.2，这种含糊其辞的语言才有所收敛。现在有了一个真正的“模式（schemas）”概念，它明确具有隐式标签解析规则，并且“核心模式（Core Schema）”是一个“推荐”的默认选项：</p>
<p>Core 模式是 JSON 模式的扩展，允许以更具可读性的形式展示相同类型。这是 YAML 处理程序在没有另外指定的情况下应使用的推荐默认模式。同时，也强烈建议其他模式应当基于它进行构建。</p>
<p>但等等！YAML 1.2 规范模式并没有六十进制（以 60 为底）或 yes/no 布尔值！因此很明显，“挪威问题”（The Norway Problem）并不是这个 YAML 1.2 建议规范所带来的！</p>
<p>听着，我之前已经读过这部分 YAML 规范几次了。我看到了铺天盖地的“可以”（may）以及“取决于应用程序”（up to the application），于是心想：“好吧，所以 PyYAML、Ruby 以及所有其他库只是决定选择了一个有缺陷的默认方案。”考虑到所有这些库都把不安全加载作为默认选项，很容易让人产生这种轻率的归因，所以很显然它们最初的设计看起来就称不上称职。</p>
<p>但依然如此吗？事情仅此而已吗？我们可以查看更早的规范草案！也许它们能告诉我们一些东西。2001 年 12 月的规范草案是第一个把隐式类型写入文本的版本，而且至少从我的阅读来看，它是始终启用的！太有意思了！快进大约一年，在 2002 年 10 月的草案中，规则似乎又变了，现在变成了“取决于应用程序”。因此看来在起草过程中，他们实际上改变了想法！</p>
<p>“为什么”是你在规范草案中找不到的答案，而且那里面绝对没有任何变更日志。要弄清楚所有这些规范措辞究竟从何而来，我们只能通过查看背后的讨论。</p>
<p>以 YAML 而言，这主要发生在 2000 年代初的一个邮件列表中。幸运的是，该列表的存档如今在 SourceForge 上仍然可以访问。不过令人恼火的是，SourceForge 上的列表没有公开的存档下载（仅供项目管理员使用），它是按月份分隔的，并且进行了分页。这意味着所有相关的数千封邮件分散在大量的浏览器标签页中。</p>
<p>如果无法在正规的邮件客户端中打开这些邮件，深入研究是不可能的。所以我掏出 Python 抓取了 SourceForge 的该死网站。如果他们不想让我抓取他们的数据，就应该以负责任的方式提供他们托管的公共存档的访问途径。公开查看器只提供用户名、纯文本消息内容和时间值（出于隐私原因没有电子邮件地址），但这足以让我把东西转储到 .mbox 文件中并加载到 Thunderbird 中。如果你感兴趣，我那些糟糕的脚本在这里和这里。如果你想要的话，我抓取的 mbox 文件在这里。</p>
<p>没错，那可是海量的邮件。</p>
<p>这里有数千封邮件，而我只浏览了其中的百分之几。我主要寻找与隐式类型和标签解析相关的信息：它是如何诞生的，规范的作者们究竟有何意图？当然，在搜索关键词的同时点击数百封邮件，不可避免地意味着我读到的内容远不止这些。</p>
<p>所有这一切的核心是一些怀揣动力的开发者在做他们想做的事情。有荒唐逗趣之事。有出于兴趣出现的各种各样的随机新人。有漫长的辩论。有一次规范网页下线了，因为服务器主机设在秘鲁。这是我第一次费心去“调查”类似的事情，虽然古老的邮件列表对我来说大多很陌生，但这种氛围仍然让我感觉与我习惯的社区有些许相似。</p>
<p>在我们继续之前，我必须说明清楚：我出生在 2000 年；这些人在我还不会走路的时候就在讨论隐式类型规则了。我没有亲历其中的任何事情，因此我不得不对这一切发生时的大致背景做出自己的推断。</p>
<p>YAML 源于世纪之交的 XML“炒作”周期。许多人和企业认为 XML 是充满未来魔法的灵丹妙药，因为它可以实现数据互操作性。我们把所有数据放进 XML 中，现在我们就拥有了一大堆带有 XSD、XPath、XSLT 以及天知道还有什么以“X”开头的神奇工具。见鬼，有些公司甚至在销售硬件中间件盒子，其唯一的工作就是基于更多的 XML 来验证和转换 XML！该语言被用于一切场景：配置文件、序列化状态、作为数据库、RPC 协议等等。</p>
<p>但是，XML 很怪，它是一种标记语言。与 HTML 相比：如果你从这个网页中剥离所有标记……它在某种程度上仍然是连贯的，至少对人类来说是这样。但如果对典型的 XML 用途这样做呢？它将失去所有意义。我们真的是在做标记吗？</p>
<p>此外，如果你曾经尝试为任何事物设计 XML 格式，你可能都不太确定某个东西到底应该作为标签名、属性还是文本内容。我相信许多人都就这个话题写过主观强烈的指南，但事实是它确实很不直观。另外，伙计，看看上面那个例子中重复内容的数量。你可能也意识到了，JSON 或 YAML 并没有这些问题。如果你对这两者哪怕稍有了解，你也毫无障碍地能想象出上面的例子在它们当中会是什么样子！</p>
<p>YAML 在很大程度上旨在支持 XML 的所有用例，这意味着它在设计时就考虑到了整套相关的工具链。数据可移植性、序列化、配置文件，该死的一切。许多人有着截然不同的用例，这反映在我读到的一些邮件中。</p>
<p>为什么 YAML 规范比 JSON 复杂得多？因为，呃，它本来就想这么复杂。规范中有大量的篇幅在讨论“YAML 处理程序”应该如何工作。在邮件列表上，人们频繁提及关于“YPATH”、“YAML schemas”、“YAML-RPC”等想法。人们希望用 YAML 完成你用 XML 所能做的一切。</p>
<p>当然，XML 的炒作周期过去了，随之而去的还有对任何这些 YAML 等价物的渴望。我之前提到的那些雄心勃勃的目标中的大多数？从未实现过。如今，人们在编写配置文件时，大多只是把 YAML 当作 JSON 的更友好替代品。至于这是好事还是坏事，就留给各位来评判了。</p>
<p>我自己对此也有很多想法，我想写这篇博文的部分原因也是为了能在互联网上表达我自己的看法。对比一些语言，添加我自己的洞察和见解，诸如此类。</p>
<p>但最终，我没能以自己满意的方式组织上述内容，而这篇博文在其他部分已经完成的情况下搁置了数月。因此，为了能真正发表出来，我删掉了那部分。</p>
<p>不过，如果你确实想知道我对 YAML 的最终看法：它还过得去。</p>
<p>正如我之前所言，YAML 最初本应具备更强的隐式类型规则。他们当时非常清楚这其中所涉及的各种兼容性风险！在 2002 年 6 月，显然他们在确定具体隐式规则时遇到了困难，既要满足预期又要避免歧义。他们希望支持不带引号的字符串，但也希望支持隐式整数和浮点数，或许还有日期，而且当时他们尚未就布尔值达成一致。曾有人提出要求为像日期这样更“小众”的类型添加限定修饰（例如 ! 2026-05-22），但很多人抱怨“这在我的使用场景下太难看了”。他们最终暂时敲定的提案4大致如下：<br />正如一封电子邮件中善意指出的那样，在 2004 年 1 月的 1.0 规范中，部分过时语法并未被清理掉！看看你能不能找出来！<br />2002 年 9 月，关于类型如何运作的话题再次被提及。这是一位尝试使用 YAML 的新人引发的，他在使用中遭遇了时间与日期类型的局限性与风险，其他一些人也对现有的隐式类型规则感到不安。于是齿轮开始转动，“DWIM”（按我意图去做）提案被提出，后来更名为“未知类型”提案：<br />- 简而言之：该提案让 YAML 能够 DWIM（按你意图去做）。如果你希望如此的话。如果你想保持严格，可以为每个节点添加显式的转换方法（transfer method），并且/或者提供验证/类型/比较模式（schema）等等。如果你不想那么严格，只需将所有内容都视为字符串（但始终保留转换方法）。<br />据我理解，该提案随后被合并到了 2002 年 10 月 31 日修订的规范中。此外，他们似乎希望尽快完成 1.0 规范，因此非核心类型被移除了出去，这样就不必在处理规范其余部分的同时对它们进行裁剪。无论如何，在时间线的这个节点上，我确信我的理解是正确的：规范作者的预期是“一切在默认情况下都应是字符串”，而这种意图一直到 2024 年 1 月都没有改变5。规范作者在不同时期的多封电子邮件中反复重申了这一点：<br />如果我和 Ingy 能完成下一版 PyYaml，它的第一个特性就会是一个“所有值均为字符串”的加载器。<br />一个标准的、不支持 Schema 的加载器应该始终将此类值加载为字符串。如果你希望将日期作为对象处理，只需混入一个日期加载器类即可。<br />现在这是可行的，因为类型已经移出了规范。它们不需要被解析器识别。为了简化 YAML 逻辑，这是我们做出的最明智之举。<br />阻止我更广泛部署它的最大阻碍就是：不得不向其他人解释关于值语法的复杂规则。说一句“只要让你的值以字母数字开头就没问题”，要比说“纯数字不行。YYYY-MM-DD 不行。以 !&#39;&quot;% 开头不行。t/f/~ 不行”简单得多。<br />没错。现在情况已经完全不是那样了。基本上每个标量都会被解析为带有类型的字符串。而且（在缺少模式的情况下）如何处理该字符串和类型完全由加载器决定。加载器受到*鼓励*在合理的时间和场景下支持 YAML 类型库。而且大多数时候，默认将值作为字符串加载，并在用户开启 load_dates_as_objects 选项时将日期作为对象加载，是符合情理的。<br />即使是普通标量也具有类型。其类型为空字符串。这是给加载器的一个提示，让它根据加载器的默认设置、用户设置的加载器选项，或者根据 Schema 文档中的类型提示，做出最合理的处理。<br />我的意思是，让你的 YAML 模块在默认情况下始终加载字符串。完全不进行隐式类型转换。这是推荐的默认做法。<br />隐式类型是可选的，它*不*属于基础标准的一部分 [1]。<br />[2] 遗憾的是，当前的 PyYaml 在隐式类型处理上并未完全达到核心规范的标准。这是历史原因造成的，在编写 PyYaml 时，隐式类型还*不是*可选的，这引发了一些问题，在认识到这个错误后规范进行了修改（感谢 Steve Howell）。希望 Tim 正在开发的全新 PyYAML 能够首先聚焦于核心规范；将数据类型留待日后处理。<br />嗯，话说回来，我记不清我们在“y”和“n”布尔值上的立场了。Syck 一直不支持它们，因为它们</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-11 01:04 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://slugcat.systems/post/26-09-10-yaml-spec/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-posts-jj-bdb703a37beb8ff9" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2999" data-content-paragraphs="20" data-published-at="2026-09-10T16:48:33.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-11 00:48</span>
</div>

### [与 JJ 的对话](https://laurmaedje.github.io/posts/jj/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Conversations with JJ</div>

<div class="article-body" data-article-body="true"><p>到目前为止，我的博客一直完全专注于 Typst，但今天我想写点别的东西。（这种情况本身就很少见，所以我觉得最好抓住这个机会写下来！）</p>
<p>我断断续续地使用 jj 有一段时间了，想分享一下我的心路历程。我可能并没有选择最佳的学习路径，但至少我是从阅读 Steve 的教程开始的，而不是盲目摸索。不过除此以外，我基本就是遇到什么需求才去摸索什么用法。</p>
<p>或许我应该先谈谈当初为什么想了解它。除了身边以及团队里的人都在热烈讨论之外，我个人也确实非常喜欢整洁的 PR 历史。我对各种变基（rebase）操作已经相当熟练，但我整理 PR 的工作流依然算不上好。它大致介于交互式变基、在 GitHub Desktop 中拖拽提交（commit），以及在 Tower（一款 Mac 上的 Git 客户端）里折腾之间。我非常喜欢图形界面（GUI），特别是在查看 diff[1] 的时候，因此也常常在 GUI 工具与终端之间来回切换（用于应对 GUI 工具功能受限的情况）。所以，我尝试使用 jj 的目标就是拥有一个更好的工具来理顺我的提交历史。</p>
<p>在过去的大约六个月里，我一直以这种方式将 jj 与 Git 并行使用。它的表现非常出色，所以首先要向其背后的开发者们表示感谢！特别是，我认为 jj 与 Git 具有如此高的互操作性是非常务实的做法；如果是我的话，可能更倾向于“让我们从零开始，抛弃所有历史遗留包袱”（参考 Typst……）。</p>
<p>我还没有做到完全迁移到 jj 上。它目前依然只是我的 PR 整理工具。这没关系，这或许既说明了 jj 的特点，也同样（甚至更多地）说明了我个人的使用习惯。但我认为我依然可以用这篇博文来记录自己的使用历程。首先说明一点：无论是在工作中还是工作之余，我的时间都非常有限（不像大学时代那样），下班后我很少想碰编程相关的事情。因此，每当在 jj 中遇到阻碍时，对我而言阻力最小的做法就是退回使用 Git。</p>
<p>编辑历史。在提交之间跳转和编辑提交的感觉非常流畅！这让整理工作变得简单得多，尤其是搭配 jjui（也是个极棒的工具）使用时。我依然没有把那些 CLI 命令背得很熟，因为我大部分时间只用 jjui，而且熟悉那里的快捷键，这在大多数情况下就已经足够了。</p>
<p>更丰富的操作集。我很喜欢它为不同的概念提供了更多独立的命令。Git 的工作方式在我的脑海中已经根深蒂固，所以我大体上能接受它的逻辑，但我认为将这些高级概念作为独立命令来实现会更好（例如 `jj split`）。</p>
<p>撤销（Undo）。撤销功能也非常酷。当然，它在你搞砸了、需要恢复丢失的数据时非常有帮助（我在用 jj 时就遇到过几次；能力越大，责任越大 :P）。但我还发现它很有用的一点在于，我可以随意尝试做一些更改，观察冲突是如何产生的，然后直接放弃并回退几次。当然，在 Git 中我也可以通过把想要回退的 SHA 记录在某处或使用 reflog 来实现，但体验没有那么流畅。</p>
<p>工具本身。其命令行界面（CLI）给人的感觉……很友好？我也说不上来。但我挺喜欢的！</p>
<p>日志（Log）。`jj log` 的输出有时还是会让我感到有些困惑。在我主要贡献的代码仓库（typst/typst）中，默认情况下它会向我显示一大堆其他人的分支（这些是我最近为了审查他人工作而检出的），这使得（a）很难找到我自己的工作，以及（b）很难仅查看当前分支的历史（特别是当它截断不可变提交时）。我曾尝试修改默认的 revset 配置，情况稍微好了一些，但这个问题对我来说是全新的；以前在 Git 那边我处理得一直挺顺手。</p>
<p>据我了解，很多人在 jj 中会较少使用分支名称（在这点上我也许理解有误）。但我之所以喜欢具名分支，恰恰是因为我可以在不同任务之间轻松跳转，而无需通过相关的提交去查找。这引出了一个相关问题：每当我在 Git 和通过 JJ 编辑分支之间来回切换时，即使当前编辑的更改是空的、且前一个更改已被书签标记，它依然会让我处于游离 HEAD（detached HEAD）状态。在使用 Git 提交新内容之前，这始终是一步需要额外留心的操作。</p>
<p>正因为我喜欢分支，当我在 JJ 中添加新的提交时（这种情况并不多，因为我只用它来进行清理），分支不会自动向前移动这一点让我稍感恼火。</p>
<p>自动快照（Auto-snapshot）。只要你运行任何命令，JJ 就会自动对磁盘状态进行快照。这使得永久丢失工作变得非常困难。这很棒！然而在实际使用中，我认为它存在两个问题。</p>
<p>第一，生成快照是一种副作用（它可能会触发自动变基并影响撤销历史）。这有时是出乎意料的（尤其是通过 jjui 自动触发时），或者与同变更合并（same-change merges，见下文）结合在一起时。对我来说，这意味着在编辑代码的间隙，我是在终端上点了一次（聚焦到 jjui）还是点了两次，可能会产生截然不同的结果。</p>
<p>第二，它很容易不小心把像 `node_modules` 这样的目录打入快照。假设你在仓库中添加了一个新的 JS 项目（并在 gitignore 中添加了 `node_modules`），然后你回退去编辑一个旧的提交。接着，糟糕，`node_modules` 突然就出现在那个提交里了。虽然系统内置了一些启发式算法来检测大文件，但并非所有你不想要的文件体积都很大。在我其中一个项目里，我猜 `node_modules` 依然留存在 jj 的历史中。我也懒得去查证了。但这确实让我感到有点不爽。</p>
<p>同变更合并（Same-change merges）。JJ 中有一种有趣的合并行为，我认为 Git 原生其实也有。然而，在 Git 中我从未遇到过这种情况，可能是因为我根本不敢去做那么疯狂的变基操作。</p>
<p>假设你有两个提交 A 和 B。起初，B 引入了某项更改。现在，你尝试改为在 A 中引入相同的更改，保存并以某种方式触发 jj（例如通过 jjui 或 `jj log`）。这会触发一次自动变基，B 中的更改就会被吸收消除。但此时，如果你在 A 中按 Ctrl+Z 撤销并再次保存，那项更改在 B 中依然是消失的状态。</p>
<p>这种同变更合并的行为在许多场景下确实很方便，但它曾让我栽过跟头。好在有一项配置可以将其禁用。就我个人而言，我宁愿多解决几个冲突，换取一份安心。</p>
<p>坦白说，我之所以未能全面转向 JJ，主要原因大概在于我仅仅需要一个出色的 GUI 工具来查看和拆分 diff。使用 jj 时，我很喜欢那种能够自如跳转并修改提交的能力，但我这是在拿最便捷的查看 diff 和挑选部分更改的方式作为交换。虽然 `jj split` 能完成这项工作，但如果有一个优秀的 GUI，我的效率会高得多。当我不需要深入修改历史时，我依然更倾向于通过 GitHub Desktop 来拆分我最新的提交。总而言之：我非常希望能看到一个真正精致、体验原生的 JJ 专属图形界面。如果有的话，我大概愿意为此买单。</p>
<p>终端里可能有一些出色的 diff 查看工具，但单纯滚动浏览 git diff 的输出并不适合我。它无法促使人去细细推敲 diff，而我认为这对于产出优质代码而言至关重要。在创建 PR 的过程中，我会反复阅读自己的 diff，这既能催生重构的想法，也能排查出潜在的缺陷。↩︎</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-11 00:48 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://laurmaedje.github.io/posts/jj/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-posts-html-boilerplate-b1a144313eeff589" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3882" data-content-paragraphs="12" data-published-at="2026-09-10T16:13:28.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">⚡ 战略能源与气候</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-11 00:13</span>
</div>

### [我的 HTML 样板模板](https://vale.rocks/posts/html-boilerplate)
<div class="original-title-sub"><span class="orig-tag">原文</span> My HTML Boilerplate</div>

<div class="article-body" data-article-body="true"><p>当 HTML 最初诞生时，一个文档确实可以非常简单。一个有效的文档可能看起来就像这样：<br />直到 HTML 2.0——首个正式标准确立——真正规范的文档结构才应运而生。用于说明文档类型并处理兼容性的 DOCTYPE 声明成为了预期的必要组成部分，head 与 body 部分亦是如此：<br />自 HTML 2.0 于 1995 年首次亮相以来的这些年里，Web 已经发生了翻天覆地的变化。然而，在 Web 标准领域有一句俗话：“不要破坏网络（Don’t Break The Web）”。虽然存在一些例外，但大体上，在 Web 诞生之初开发的网站在现代浏览器中依然应该能够正常运行，无论过去了多少岁月。然而，为了保持这种兼容性，就存在一种风险：因为担心破坏现有网站而使得引入变更变得寸步难行。<br />Web 应对这一挑战的一种方式是在 HTML 文档中使用某些特定预期元素。如果该元素存在，它就采用新功能；如果不存在，它就直接回退到旧功能。再结合整个 Web 环境中不同集成机制和系统的预期要求，这意味着存在相当多的“样板代码（boilerplate）”——即几乎在每个新建或维护的网站中都会重复出现的代码。HTML 样板通常既用于启用现代功能，也用于设定网站的首选项和详细配置。这涵盖了五花八门的事项，例如网站应如何在社交媒体上进行嵌入展示、应加载哪些样式、浏览器应如何为围绕网站周边的界面设定主题色，以及其他类似细节。<br />正如我维护着自己的 CSS 重置样式表（CSS reset）以为样式提供干净的基础一样，我也维护着自己的样板模板，在创建 HTML 文档时将其用作基础结构和参考。与我的 CSS 重置样式一样，它非常具有主见。以下是其完整内容：<br />需要说明的是，我的 HTML 样板中各元素的顺序是有讲究的。特别是文档 head 区域的排列顺序对性能有着巨大影响。Capo.js 是一个绝佳的工具，能够从性能角度评估文档 head 中元素的排列顺序。<br />这是 HTML 现行标准（Living Standard）的文档类型声明，最初在 HTML 5 中引入。我始终包含它以避免进入怪异模式（quirks mode）。<br />打开包裹整个文档的 html 标签，并使用符合 RFC 5646 规范的标签通过 lang 属性定义文档语言。所声明的语言为整个页面提供了默认语言，并且可以在逐个元素的基础上进行覆盖。提供语言对于自动翻译、诸如连字符等排版细节以及辅助技术（特别是屏幕阅读器）至关重要。<br />我在 head 中放置的第一个元素始终是取值为 UTF-8 的 charset meta 标签，这是自 HTML 5 起唯一有效的编码格式。它始终置于 head 的最顶端，因为它必须出现在文档的前 1024 个字节之内，并且应当位于任何可能被损坏解析的元素之前。<br />当第一代 iPhone 于 2007 年推出时，它渲染桌面端网站的预期方式是让用户进行放大和平移浏览。苹果为真正针对移动端进行优化的网站引入了上述 meta 标签，随后它逐渐被更多浏览器广泛采纳，以至于现在为了实现网站响应式而已获得广泛支持。<br />许多人会加上 initial-scale=1，然而经过大量的测试和研究，我发现已经没有必要再包含它了。如果某个元素在水平方向上超出了视口宽度，可以通过包含它来改变页面的呈现方式，但这绝不应该被允许发生，我建议不要这样做。<br />minimum-scale、maximum-scale 以及 user-scalable 都会极大地损害无障碍访问性，绝不应该被使用。一旦在网站上发现它们，通常都应该将其剥离删除。<br />使文本根据系统设置进行缩放。如果该标签存在，那么页面的样式必须预期到这一点并进行相应编写。这对于避免内容缩放带来的无障碍访问隐患尤为重要。<br />页面的标题。这是一个必填的值，会在许多界面场景中展示。它被用作添加书签时的页面名称、搜索引擎中的标签页名称，以及任何需要展示页面名称的其他地方。我通常会先显示页面标题，后面紧跟网站名称。<br />凡是必须导入的样式都可以在这里导入。样式通常应在页面 head 中导入，而不是在样式表内部使用 @import CSS at-rule 规则，以避免出现“瀑布式加载”——即必须先获取该样式表，然后再去获取额外的样式表。<br />即使经过子集化和其他优化，复杂的具有多字重的可变字体体积依然可能相当庞大，因此我会预加载我知道页面上一定会用到的字体。即使字体与当前页面位于同源，crossorigin 属性依然是必需的。我始终以 WOFF2 格式提供字体，因为它是目前受到广泛支持且性能最佳的字体格式。<br />og:title 用于嵌入卡片展示，例如社交媒体上所见的那些。它是 Open Graph 协议众多元数据值中的一种。虽然我通常会在 title 元素的末尾包含网站名称，但在 og:title 中我不会添加。在绝大多数情况下，嵌入展示都会在标题旁边显示域名或 og:site_name，再次添加便显得重复。<br />我主要是将这个 meta description 字段视为一项针对搜索引擎优化的工作。以往各大搜索引擎会在搜索结果页面中将该描述展示给用户，不过它们现在大多直接从文档正文本身抓取内容。<br />og:description 有时会显示在嵌入预览卡片中。如果缺省，嵌入展示通常会略过描述，或者回退读取 meta description。我喜欢在这里写一些简短、往往带有诙谐风趣的内容，以激发好奇心并契合社交媒体或聊天软件的信息流风格。<br />网站图标（favicon）对所有网站而言都是至关重要的品牌标识元素——尤其是当打开多个标签页需要辨认时。我采用 SVG 格式提供 favicon，因为它们获得了良好的支持，可以动态自适应亮色/暗色模式，在所有尺寸下都能保持清晰美观，并且免去了维护一套不同尺寸位图 favicon 的麻烦。<br />og:image 中定义的图片通常会展示在社交媒体或聊天平台等网站嵌入卡片中。几乎在所有网站上包含它都是有益的，因为它能增添上下文信息，并且通常会增大嵌入预览的展示面积以获得更好的曝光度。对于嵌入图片的 alt 替代文本的支持程度参差不齐，因此不能对其过于依赖。有些网站支持，有些则忽略，还有些网站支持的方式很奇特。我会尽量添加它，但保持简短。1200px 乘 630px 是一种获得广泛支持的尺寸，而在我测试过的现代图片格式中，WebP 是兼容支持最好的格式。<br />指向页面权威版本的 canonical 规范链接对于指明何为真实权威源至关重要。如果存在重复内容，这一点尤为关键。<br />在嵌入展示中显示的网站名称。如前所述，一些嵌入展示会在页面标题附近显示该名称。</p>
<p>author（作者）标签显然用于指明页面的作者。它并非绝对必要，但有助于开发者确认页面的负责人。</p>
<p>将 color-scheme 元标签的 content 属性值设置为 light dark，可以告知浏览器该网站同时支持浅色与深色模式。在 head 中进行定义可以防止无样式内容闪烁（FOUC），比如当网站与浏览器均设置为深色模式时突然闪现亮白色的屏幕。</p>
<p>用于为作为渐进式 Web 应用（PWA）安装的网站设定浏览器界面主题色，以及在 Android 版 Chrome 中设定浏览器界面主题色（但仅限浅色模式）。其他一些浏览器也会以不同方式解析这些值。我使用 media 属性分别独立设置浅色与深色模式下的颜色。</p>
<p>如果网站提供聚合订阅源（syndication feeds），将其包含在 head 中便可允许自动发现订阅源。</p>
<p>如果网站集成了搜索功能，创建 opensearch.xml 文件并在文档 head 中进行引用，可将其暴露给浏览器，以便浏览器提供丰富的搜索体验。具体体验因浏览器而异，但在许多情况下，它允许用户直接通过浏览器自身的地址栏在网站内进行搜索，并且还提供了一种添加搜索引擎的简便方法。</p>
<p>我是一名渐进式 Web 应用（PWA）的倡导者。我非常喜欢它们，许多网站即使不是典型的“应用程序”，也能从成为 PWA 中受益。即使唯一的益处只是当人们将网站添加到主屏幕时展示效果更佳，我也几乎会为所有网站定义一个清单文件（manifest）。该声明有助于浏览器发现清单文件。</p>
<p>这仅仅是一个样板。它是我几乎在每个网站上都会包含的模板，只会根据具体情况做一些轻微调整。每个网站肯定会根据自身需求在此基础之上有所偏差，但这构成了一个合理的根基。</p>
<p>如果某个页面预计会被学术引用，那么可以考虑加入 Google 学术的 citation_* 元标签以及都柏林核心（Dublin Core）的 dc 元标签。如果页面代表一篇文章，那么应包含来自开放图谱协议（Open Graph Protocol）的 article 命名空间标签，或许还可以包含与发布系统相关的标签。视频、音频、书籍或其他内容类型同样会有不同的标记方式。许多网站也将从 JSON-LD 结构化数据中获益。</p>
<p>若想参考涵盖更多可选内容的更大型样板，我推荐阅读 Manuel Matuzović 的精彩文章《我在 2026 年的 HTML 样板》（My HTML boilerplate in 2026）。</p>
<p>某些情况下可以使用它们，但遇到那些极其罕见的情况时你自然会明白。务必极其谨慎。↩</p>
<p>读完这篇文章有所收获吗？欢迎考虑通过单次或定期付款赞助支持我。这对我发布更多内容和开发开源项目大有助益。谢谢！</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-11 00:13 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#战略能源与气候</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://vale.rocks/posts/html-boilerplate" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-oldnewthing-20260909-00-7040bcc06f184be9" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1088" data-content-paragraphs="10" data-published-at="2026-09-10T15:48:37.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 23:48</span>
</div>

### [Windows XP 使用什么算法来选取你的初始用户头像？](https://devblogs.microsoft.com/oldnewthing/20260909-00/?p=112683)
<div class="original-title-sub"><span class="orig-tag">原文</span> What algorithm did Windows XP use to choose your initial user picture?</div>

<div class="article-body" data-article-body="true"><p>我前段时间曾提到过，Windows XP 会从 %ALLUSERSPROFILE%\Application Data\Microsoft\User Account Pictures\Default Pictures 目录下的图片中随机选取你的初始头像。但大家似乎想了解更多细节。</p>
<p>“有人尝试弄清楚 Windows XP 在首次创建账户时用来决定选用哪个头像的随机数生成器（RNG）吗？”<br />——Xeno (@XenoPanther)，2025年12月11日</p>
<p>这里的随机数生成器正是我们的老朋友 RtlRandomEx，它将 GetTickCount() 的当前值作为初始种子。</p>
<p>该函数采用了一种单趟（one-pass）随机选择算法。我立刻就能想到采用这一方案的两个好处。首先，相较于先统计出所有项目数量、然后在 1 到 n 之间随机抽取一个数字、接着进行第二次遍历以定位该索引对应项的朴素双趟（two-pass）算法，单趟算法效率更高，因为它减少了对文件系统的调用次数，而文件系统正是瓶颈所在。此外，如果代码运行期间目录内的文件数量发生变动，单趟算法也能避免由此带来的复杂问题。</p>
<p>这种单趟算法是水塘抽样（reservoir sampling）在 k 等于 1 时的特例。这一特例允许使用更加简便的定制算法。</p>
<p>该算法的工作原理是基于这样一个观察：在包含 n 个项目的集合中，最后一项被随机选中的概率为 1/n。如果最后一项未被选中，那么你就需要从前 n − 1 个项目中随机选取，这可以通过递归来求解。</p>
<p>沿着递归正向推导，首先从基准情形开始：如果你面对的列表中只有 1 个项目，那么你唯一的选择就是选取该项。否则，如果你有一个包含 n 个项目的列表，首先从前 n − 1 个项目中随机选取一项，然后以 1/n 的概率将其切换为第 n 项。</p>
<p>作为最后的安全检查，代码在抽样采样 100 张图片后就会停止。这可以避免有人在 Default Pictures 目录下存放了一百万个文件时引发病态的极端行为。</p>
<p>Raymond 参与 Windows 的演化已有 30 多年。2003 年，他建立了一个名为“The Old New Thing”的网站，其受欢迎程度远远超出了他最大胆的想象，这种发展态势至今仍让他有些心神不宁。该网站随后催生了一本书，巧合的是书名也叫《The Old New Thing》（Addison Wesley，2007年出版）。他偶尔会在 Windows Dev Docs 的 Twitter 账号上露面，讲一些不带任何有用信息的故事。</p>
<p>参与讨论。</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="280" data-content-paragraphs="4" data-published-at="2026-09-10T15:46:32.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 23:46</span>
</div>

### [Windows 11 记事本中糟糕的菜单栏](https://blog.yuo.be/2026/09/10/the-terrible-menu-bar-in-the-windows-11-notepad/)
<div class="original-title-sub"><span class="orig-tag">原文</span> The terrible menu bar in the Windows 11 Notepad</div>

<div class="article-body" data-article-body="true"><p>2026年9月10日 • 3 分钟阅读 • 标签：#windows</p>
<p>这在新的记事本（Notepad）里行得通吗？不行。这里有一段记录当时情况的录像，虽然看起来相当无意义：</p>
<p>我很难说自己很喜欢这个设计（我的意思是，看看代表“粘贴”的那个字母“P”的放置位置）。暂且撇开这点不谈，只要你使用 Alt 键，这些快捷访问键就会显示出来。然而，如果你接着使用方向键进行导航，它们就会消失。我实在难以理解这怎么会是预期当中的行为，毕竟你依然在用键盘进行导航。</p>
<p>更离奇的是，这还会让鼠标指针产生奇怪的异常现象。而且，如果你多试几次，原本禁用的选项还会突然变成可用状态。</p></div>

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
<div id="story-back-to-native-ccf40ae115f1048c" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="4580" data-content-paragraphs="44" data-published-at="2026-09-10T15:19:38.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 23:19</span>
</div>

### [原生开发如今是 Shopify 移动端的未来（2026）](https://shopify.engineering/back-to-native)
<div class="original-title-sub"><span class="orig-tag">原文</span> Native is now the future of mobile at Shopify (2026)</div>

<div class="article-body" data-article-body="true"><p>编程智能体（Coding agents）改变了将移动应用开发两遍的成本。以下是 Shopify 为何正从 React Native 重返 Swift 和 Kotlin 的原因。</p>
<p>Shopify 工程团队</p>
<p>早在 2020 年，我们就决定全力投入 React Native，而那次押注极其成功。我们只需构建一次功能便节省了大量时间，使没有移动端背景的开发者也能为我们的应用做出贡献，并让我们免于不断追赶两端功能对齐的困扰。</p>
<p>2025 年 1 月，我曾写道 React Native 的未来一片光明，Shopify 计划继续对其进行投资。根据我们当时所掌握的情况，这确实是事实。React Native 对我们一直运转良好，并且它依然是一个极其优秀的框架。但自那时起，编程模型有了显著提升，对于我们的应用和团队而言，用 Swift 和 Kotlin 构建同一功能已不再需要承担以往那样的成本。</p>
<p>我们不会仅因为某项决策在当时是成功的就固守它。当核心假设发生改变时，我们愿意回过头来审视这是否仍是正确的选择。大语言模型（LLM）改变了我们 2020 年决策背后的核心假设之一，因此我们从第一性原理重新评估了我们的移动端技术栈。</p>
<p>我们的研究所得引导我们重返原生开发。</p>
<p>我们在 2020 年决定从原生转向 React Native，是出于以下三个原因：</p>
<p>React Native 始终如一地兑现了这些优势。虽然我们发现自己耗费了大量时间和资源来优化性能、改进 React Native 的关键基础领域，以及跟进框架更新和外部依赖项，但这些都是可以接受的权衡。使用 React Native 带来的益处远远超过了我们在这些领域必须进行的投入。</p>
<p>Shopify 自 2021 年起就一直在使用大语言模型构建软件（比 ChatGPT 早了一年！）。起初，我们使用它们来实现功能、排查并修复错误以及审查代码。随着模型能力的提升，我们敢于托付给它们的任务复杂度也随之提高。到 2025 年底，它们已不再仅仅是帮助我们更快地编写代码。它们的能力足以让我们重新思考：将软件构建两遍是否还意味着要做两倍的工作。</p>
<p>我们决定重新评估我们的移动技术栈，并开始构建原型以验证我们的技术选择是否依然成立。我们利用大语言模型在 Swift 和 Kotlin 中重建了我们几个最大应用的核心模块，其效果之好令我们大吃一惊。智能体具备以下能力：</p>
<p>原生开发仍意味着要在两个平台上构建和维护软件，这一成本并未完全消失。发生改变的是，智能体现在可以完成足够多的实现、转换、测试和审查工作，以至于这不再是像 2020 年时那样的决定性因素。</p>
<p>React Native 应用完全可以做到很快，我们的应用确实很快。我们做出这一转变，是因为智能体降低了共享代码实现的优势，而针对每个平台单独构建的优势依然存在。原生开发使我们能更紧密地贴近平台原生能力和第一方工具链，在我们的代码与平台之间减少了框架层和依赖层。</p>
<p>在深入探讨我们如何进行迁移之前，我们希望确保这次过渡能够干净利落。从一开始，我们就希望反哺 React Native 社区，使其变得更好。我们发布的开源库在各自的领域内已成为首选方案。我们对来自社区的热烈反响深表感激，并致力于确保这是一次平稳且不出意外的过渡。</p>
<p>Shopify 将继续赞助该项目直到 2026 年底，William Candillon 在此之后也将继续为其工作。他将在接下来的几个月内创建该代码仓库的分支（fork），并以新名称发布该库。原仓库将在迁移完成后归档。我们将在整个过程中发布最新动态，以便所有人都有充足的时间进行迁移。如果您的应用依赖此库，请考虑赞助支持。</p>
<p>该库每周获得约 200 万次下载，并已成为在 React Native 中渲染高性能列表的默认首选方式。鉴于它对生态系统的重要性，Shopify 将继续修复破坏兼容性的关键问题。我们目前正与几家公司商讨长期接管 FlashList 维护事宜。如果您对此感兴趣，请在此联系我。</p>
<p>Restyle 的用户群比我们的其他开源库要小，因此我们将归档此仓库。我们将维持其正常运转直至 2026 年底，之后将停止维护。欢迎任何人 fork 并继续推进它，如果有团队希望接手，我们将协助完成交接。</p>
<p>Shopify 拥有多款大型应用（Shopify、Shop、Point of Sale、Inbox）。全世界数以百万计的商家和买家每天都依赖它们来谋生以及从他们喜爱的品牌购买所需商品。</p>
<p>我们曾在逐步迁移到原生（棕地策略 / brownfield）与从零开始彻底重构（绿地策略 / greenfield）之间进行过权衡探讨。过去当我们迁移到 React Native 时，对于一些最大的应用我们选择了棕地方式，因为重写它们需要数年时间，而且在重写期间我们不得不暂停交付新功能。</p>
<p>然而，这一次绿地策略凭借以下几点原因脱颖而出，成为明确的优选：</p>
<p>经常在应用商店购物类榜单名列前茅的 Shop 应用是首个完成迁移的。在 AI 的辅助下，团队在短短 12 周内就完成了从概念验证到在应用商店发布完全用原生重构的应用。我们已在此处详细撰文介绍了这次迁移过程。</p>
<p>Shopify 主应用（我们最大的一款应用，包含 300 多个页面、主屏幕与锁屏小组件、Apple Watch 应用、表盘复杂功能、Siri 快捷指令等）的迁移也正在进行中，将于今年晚些时候发布。我们的其余应用也将很快完成迁移。</p>
<p>直接将大语言模型对准 React Native 代码库并试图一步到位直接生成对应的原生功能，这种想法极具诱惑力，但行不通。即使你让它预先收集尽可能多的信息，将其固化为规范和任务文件然后再去实现，你最终也会得到大量无法维护、根本无法上线的劣质代码。</p>
<p>为了解决这一问题，我们构建了一个名为 Helix 的系统，采取了更为渐进的方式。它不指望初次输出就完全正确，而是建立了一个闭环：任何不完美的尝试都绝无法向前推进，直到它被优化为令人满意的结果。</p>
<p>开发者将 Helix 指向某个页面界面。Helix 会读取 React Native 代码并提议一系列检查点（由小粒度、有序的工作切片组成），这些检查点可在几分钟内完成审查。随后，它按检查点逐步构建：每一个切片都必须通过测试验证其行为，在视觉审查中与运行中的应用匹配，通过两轮对抗性代码审查员的审核，并在获得人工认可后才能提交，进而开始下一个切片。每一次审查的反馈都会被系统记住，因此随着迁移的推进，该闭环会变得越来越自主。</p>
<p>Helix 正在使用 Swift 和 Kotlin 重建 Shopify 移动应用中的一个页面</p>
<p>这种方法效果非常好，让我们得以用原来极少的时间来重构我们的应用。</p>
<p>让智能体（Agent）控制模拟器一直是个瓶颈。我们发现自己不得不时刻盯着它们，因为它们无法可靠地进行构建、测试和迭代。我们构建了工具让智能体能够自主复现缺陷、修复缺陷并验证修复结果，但这个过程既缓慢又脆弱。React Native 的模块热重载（HMR）虽有帮助但未能彻底解决问题，因为模拟器控制本身太慢了。这主要是因为依赖无障碍辅助功能树（accessibility tree）或截图来获取应用状态、执行操作并验证结果。智能体可以在几秒钟内修改代码，但测试输出结果却需要几分钟。这使得迭代过程极其缓慢且需要大量人工介入。无论模型多么出色，如果它无法快速测试自己的工作，那就无济于事，而这在移动端上尤为困难。</p>
<p>我们正在通过设计同时适用于人类与智能体的应用架构来解决这一问题。其核心原则是将业务逻辑与 UI 完全解耦，使其能够在桌面端以无头（headless）模式运行。随后，我们通过命令行工具（CLI）将其提供给智能体使用，使其能够在毫秒级而不是数分钟内完成迭代，且全程无需调用模拟器。</p>
<p>使用 CLI 浏览应用并执行操作</p>
<p>该 CLI 允许智能体检查应用状态、在不同版块之间导航以及执行各项操作，所有这些都无需接触 UI。这实现了极速的反馈闭环，并让智能体能够一次性自主工作数小时。</p>
<p>当需要与模拟器交互时，CLI 可以通过远程模式连接它们并通过命令驱动 UI，无需检查布局或无障碍功能树。这带来了极快的性能与端到端（E2E）测试效率。</p>
<p>这是实时录屏（未加速）</p>
<p>我们将在整个过程中运用 AI，将我们所有的移动应用迁移至 Swift 和 Kotlin。Shop 应用已经作为完全的原生应用发布，Shopify 应用的迁移正在进行中，其余应用也将很快跟进。我们的推进速度很快，但绝没有降低标准。每次重构都必须达到或超越人们如今所期望的性能、稳定性、无障碍支持和产品质量。这绝不仅仅是用不同语言重写相同的应用。我们重构它们是为了让无论人类还是智能体都能够快速理解、测试并进行修改。</p>
<p>迁移并非终点。成功意味着我们的团队能比以往更快地为商家和买家提供更好的体验。我们将通过产品迭代速度、应用质量以及智能体能够自主完成的工作量来衡量这一成效。</p>
<p>我们将在这一过程中分享所学到的经验，包括深入探讨我们可被智能体寻址的架构 Helix，以及我们如何与智能体协同构建移动应用。我们此前曾坦诚分享过从 React Native 中获得的经验，在这次转型中我们也打算同样保持透明开放。</p>
<p>这是我们开展过的最具雄心的移动工程项目之一。如果你想协助构建下一代 Shopify 移动应用，我们正在招聘移动工程师、基础设施工程师以及在 AI 与软件工程交叉领域工作的开发者。</p>
<p>原生开发是如今 Shopify 的正确选择，但 React Native 则是 2020 年 Shopify 的正确选择。那段成功离不开让它落地的每一个人。</p>
<p>感谢 Meta 的 React Native 团队作为该框架的出色掌舵者，多年来倾听我们的反馈并与我们紧密合作。正是由于你们在架构、性能、工具和社区方面的投入，如今的 React Native 变得显著更为出色。</p>
<p>感谢你们创建了 React Native Skia，并将其推进到了远超我们所有人想象的高度。你们重新定义了 React Native 在图形和动画方面的可能性，我们非常期待看到你们接下来的探索。</p>
<p>感谢你们在 Reanimated 上的所有工作，感谢倾听我们的反馈，并帮助我们解决了应用中一些最棘手的动画和性能难题。</p>
<p>数百名工程师为采用 React Native、迁移我们的应用、构建共享基础、提升性能、维护集成以及向生态系统回馈做出了贡献。你们中的许多人重新回归初学者心态，挑战长期以来的既有假设，在继续为商家和买家交付产品的同时成功完成了转型。谢谢你们。</p>
<p>感谢所有使用我们开源库、贡献代码、反馈问题、质疑我们的决策并分享心得的人。你们的贡献和反馈（包括那些尖锐辛辣的意见）让我们的工作变得更加出色。</p>
<p>过去六年建立起来的工具、经验教训和合作关系将继续塑造 Shopify 构建移动应用的方式。我们向参与其中的每一个人致以深深的谢意。</p>
<p>查看我们的招聘职位，了解更多关于我们“以数字化为本（digital by design）”文化的信息。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-10 23:19 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://shopify.engineering/back-to-native" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-misc-domains-e43d375c46e69c7b" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1006" data-content-paragraphs="16" data-published-at="2026-09-10T15:14:48.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 23:14</span>
</div>

### [关于网络钓鱼的吐槽：这不是用户的错（也不是DNS的错）](https://maurycyz.com/misc/domains/)
<div class="original-title-sub"><span class="orig-tag">原文</span> A rant about phishing: It&#39;s not the user&#39;s fault (and not DNS either)</div>

<div class="article-body" data-article-body="true"><p>“为了安全，请勿点击可疑链接”</p>
<p>无论用户名、密码还是双重认证（2FA）提示，都没有部署在公司自有的域名下。再加上令牌过期时会随机弹出身份验证弹窗，察觉钓鱼攻击几乎变得不可能……因为正规业务看起来和骗局一模一样：</p>
<p>攻击者所需要做的，仅仅是做一个带密码输入框和公司Logo的网站。网址URL根本无所谓，因为用户早就学会了忽略它。</p>
<p>我承认URL并不是最符合直觉的东西，因为它的阅读方向是交替变化的。主机名和协议是从具体走向宏观，而路径则是反过来的：</p>
<p>结果就是，最核心的部分（二级域名）恰恰处于URL的中间位置。这是非技术用户必须学习的常识：仅仅告诉他们“避免点击可疑链接”是远远不够的。</p>
<p>然而，如果主机名本身就不是一个可靠的指标，那么这一切训练都是徒劳无功的。</p>
<p>为了让用户有一丝识破骗局的可能……</p>
<p>组织“必须”（MUST）使用单一、公认的根域名。内部服务“必须”（MUST）位于该根域名的子域名下，并且“严禁”（MUST NOT）使用如下URL：</p>
<p>通过电子邮件或短信发送的链接“必须”（MUST）归属于该可识别的域名之下。如果确实有必要将用户引导到其他地方，请创建一个本地重定向或链接：</p>
<p>这并不意味着所有内容都必须由该组织自行托管：许多服务都支持绑定自定义域名，而且链接本身是免费的。</p>
<p>这一规则同样适用于电话号码：不要发送短信或邮件要求用户“致电 0491-570-006”，因为根本无法判断这是否是诈骗。联系方式“必须”（MUST）在原始信息所链接的网页上提供。</p>
<p>本文中的关键用词“必须”（MUST）、“严禁”（MUST NOT）、“要求”（REQUIRED）、“应当”（SHALL）、“不得”（SHALL NOT）、“应该”（SHOULD）、“不应该”（SHOULD NOT）、“推荐”（RECOMMENDED）、“可以”（MAY）和“可选”（OPTIONAL）应按照RFC 2119中的描述进行解释……</p>
<p>主机名的混乱现状已经严重到，我甚至看到有人声称“子域名的存在本身就是一个问题，因为这让犯罪分子能够在毫无监管的情况下随意冒充任何人”。</p>
<p>DNS是一个分层系统，其结构40多年来从未改变：</p>
<p>对于任何特定网站究竟由谁运营，本不应存在任何混淆……然而现在的普遍做法，却是费尽心机地让合法正规的网站看起来和网络诈骗毫无二致。</p>
<p>（甚至连政府部门都无法做到始终如一地使用分配给他们的顶级域名）</p></div>

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