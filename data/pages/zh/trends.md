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
<div id="story-tate-of-security-in-2026-4d0d9340449db07e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="885" data-content-paragraphs="8" data-published-at="2026-09-12T17:24:59.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 01:24</span>
</div>

### [gpg.fail事件的余波：论负责任披露、GPG以及2026年的安全现状 [32:37]](https://media.ccc.de/v/2026-728-the-gpg-fail-aftermath-on-responsible-disclosure-gpg-and-the-state-of-security-in-2026)
<div class="original-title-sub"><span class="orig-tag">原文</span> The gpg.fail aftermath: On responsible disclosure, GPG, and the state of security in 2026 [32:37]</div>

<div class="article-body" data-article-body="true"><p>2025年，我[演讲者]在最广泛使用的PGP实现GPG中发现并披露了一批漏洞，并在第39届混沌通信大会（39c3）上就此发表了演讲。其中一些漏洞最终得到了修复。本次演讲将讲述一路走来的探索历程与后续余波，展示一些新发现的漏洞，并探讨2026年的安全现状。可能包含零日漏洞 =)</p>
<p>直到2025年5月，我都一直很喜欢PGP和GNU Privacy Guard（GPG）。我在闲暇时间常常研究它。有一天，情况突然发生了改变——我因过于激进的探索而发现了一个漏洞，只要直接使用GPG工具简单打开，攻击者就可以轻易伪造PGP签名。</p>
<p>几个月后，最初的这一个漏洞演变成了多个独立的漏洞，甚至包括基础PGP消息解析器中的内存损坏漏洞，几乎影响到所有与PGP相关的工作流程。</p>
<p>我在2025年12月39c3大会召开前几周披露了这些漏洞。尽管部分漏洞（如消息解析器中的内存损坏）得到了妥善解决，但并非所有问题都得到了同样的处理。</p>
<p>例如，我最早发现的、在39c3演讲开篇作为引子的一个漏洞，至今仍未修复。GnuPG的主要开发者维尔纳·科赫（Werner Koch）并未通过代码进行修复，而是发表了一篇博客文章，宣称该广泛使用的功能是“有害的”；尽管他们提前数周就获知了信息，却偏偏选在39c3大会的第一天发布这篇博文，甚至没有给我们留下回应的时间。</p>
<p>随之而来的是几条令人不快的评论，但很大一部分缺陷仍未得到解决，我将在本次演讲中进行现场演示。本次特定演示不会使用任何零日漏洞（那些留到后面）；我们将展示这些对方拒绝处理的“隐患缺陷”实际上造成了多么严重的问题。</p>
<p>此外，我还将展示几个针对GPG的新漏洞。虽然不像上次那样具有轰动性，但都是一些本不应该出现在生产环境中的精妙缺陷，借此展示GnuPG代码库的现状。</p>
<p>演讲最后将对安全现状与负责任披露进行一些总体评述，并触及AI/大语言模型在安全领域的应用这一话题（以gpg.fail的部分漏洞为例）；探讨这对安全研究人员、普通公众和软件开发者意味着什么（剧透：无论是最终用户还是安全研究人员，都远未到末日）。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>演讲者在2025年发现并披露了GPG（GNU Privacy Guard）中的多个安全漏洞，并在39c3大会上就此发表演讲。</li>
    <li>演讲者发现的漏洞包括允许在直接使用GPG工具打开时伪造PGP签名，以及基础PGP消息解析器中的内存损坏漏洞。</li>
    <li>来源叙事重点：批评 GnuPG 核心维护者对安全漏洞的应对方式与态度，展示未修补的 GPG 设计缺陷与代码质量隐患，并借此探讨 2026 年负责任披露流程与 AI 在安全领域的作用</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://media.ccc.de/v/2026-728-the-gpg-fail-aftermath-on-responsible-disclosure-gpg-and-the-state-of-security-in-2026" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-s-2026-09-make-it-anyway-cf9d405f4994bb61" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1729" data-content-paragraphs="11" data-published-at="2026-09-12T17:24:07.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 01:24</span>
</div>

### [无论如何，做下去](https://www.joelotter.com/posts/2026/09/make-it-anyway/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Make it anyway</div>

<div class="article-body" data-article-body="true"><p>2026年9月11日 游戏、开发、随笔</p>
<p>这周我心态有点崩了。不是那种声势浩大、戏剧性的爆发，而是一场内爆，一种自我的坍塌，我的决心与动力碎成了纸巾扔进洗衣机搅出来的糊状残渣。现在我感觉好些了，我想把自己的思考过程记录下来，以防有人也在经历同样的遭遇——尤其是，可能，也很遗憾地，写给未来的自己。</p>
<p>究其原因，我想对于任何从事创作领域的人来说都再熟悉不过了：惊喜吧，就是生成式人工智能（Generative AI）。艺术家和创作者的作品正持续贬值，被嚼碎后再反刍给我们，就像一只用订阅模式给雏鸟喂食的母鸟。我对其他艺术领域的朋友还抱有一丝希望；AI艺术就是垃圾，从定义上说几乎就是反艺术的，看着让人尴尬，扯上关系更令人难堪。我希望这种情况继续下去。但在我主要身处的编程前沿，情况看起来要更加微妙和凶险。</p>
<p>过去几年里，我认识的每一个程序员基本上都快被逼疯了。这是我记忆中做软件工程师最动荡的时期。在这之前，我们一直过得相对轻松，但越来越多人感受到整个行业正在经历一场巨变，每个人都必须决定自己该如何应对，而在缺乏后见之明的情况下，这极其艰难。我真的无法责怪那些顺应潮流的人，尽管存在种种负面外部性——同侪压力无比真实，而且大语言模型（LLM）如今在代码生成方面确实非常强大。我认为，否定这一点无异于在与不断前移的终点线赛跑。</p>
<p>我写这篇文章并不是为了说服任何人接受某种特定立场，但我的观点是：即使撇开所有环境和社会问题不谈，我也单纯不喜欢借助代码助手进行编程。这对我来说毫无乐趣，生成的产物感觉并不属于我，我也无法为其产出感到自豪。在过去的几年里，专注于自己的赛道、琢磨自己的小项目并不是太难，但越来越明显的是，我赖以谋生并当作爱好的这门手艺，很大一部分已经消失殆尽了。</p>
<p>我喜欢做些小玩意儿、小Shell脚本和小辅助工具。我每天都在用自己写的交互式Git分支切换器。我曾经对此感到非常自豪，同事们也给予了赞美。现在，任何人只要输入一句提示词，就能直接定制出那个工具或类似的任何东西。再也没有人在意我的那些小玩意儿了。承认这一点可能显得有些小家子气，但我确实需要同行的认可与肯定才能获得成就感。</p>
<p>游戏领域也是如此。这周的心态崩塌是由Zach Gage的一条推文引发的，他谈到了游戏制作正变得越来越像音乐创作。我认为这是一个深刻的见解，但我也觉得这让人无比绝望。我花了数年时间学习如何制作游戏，过程十分艰辛，而现在感觉那些努力可能全白费了？我感到万念俱灰。随后我和Shad聊了聊。</p>
<p>Shad是我最喜欢的朋友之一。他是一位极具天赋的设计师和工程师，也是一个各方面都很棒的人。他目前的项目是Uncamera，一款iOS相机应用，它直接利用原始传感器输出配合颜色查找表（LUT）——而不是在后期加滤镜——来拍出真正具有胶片质感的照片。这是一个制作精美的作品，我坦率地认为它完全有实力在彻底完工时角逐苹果设计大奖（Apple Design Award）。你们真应该去看看。这里有一些我用它拍的照片（我并不是个优秀的摄影师）。</p>
<p>它恰好也是完全在没有生成式AI辅助的情况下开发的。Shad这么做的理由和我很像：在制作过程中感受不到乐趣或成就感。他的焦虑也和我相似。不同之处在于，尽管面临这些焦虑，Shad依然坚持更新Uncamera，而我却在一味自怨自艾。</p>
<p>问题在于：我本来就是在用最硬核的方式做所有事情。我决定用C++开发自己的游戏引擎，偏偏选了这种语言，只因为我想这么做。如果我的目标是以最快的速度做游戏以便能够“竞争”，我大可以使用Unity、Godot或Unreal。我就不会瞎折腾去搞这篇文章题图里的伪3D渲染器了。我用这种方式做事，是因为我享受这个过程，而且能从中汲取大量知识。</p>
<p>通过与Shad的交流，我意识到摆在我面前的路其实只有三条。我可以开始使用生成式AI，让自己觉得是在“跟上时代”或“保持竞争力”，但我不会再享受这项工作。我可以彻底停止创作，但任何搞创作的人都知道这根本不是一个可行的选项。或者，我可以继续用我喜欢的方式创作，继续学习，继续走艰难的路，不为别的明确理由，只因为我想做。这正是我们制作游戏的原因。这也是我们创造任何事物的原因。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>文章作者在本周经历了一次情绪/动机上的崩溃（implosion/crashout），其主要诱因是生成式AI对创作者工作的冲击以及Zach Gage关于游戏制作趋势的讨论。</li>
    <li>作者选择完全不使用代码助手，因为不享受生成式AI辅助编程的过程，感觉产出不属于自己。</li>
    <li>来源叙事重点：以个人心路历程反思生成式AI对软件工程与创意手艺的冲击，剖析因AI自动化带来的手工艺成就感贬值与职业焦虑，最终主张即使面对效率诱惑，依然应为了纯粹的创造乐趣而坚持采用传统、手工艺式的‘困难方式’进行开发。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://www.joelotter.com/posts/2026/09/make-it-anyway/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-go-logo-programming-html-3a9a8bcc678087c2" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2752" data-content-paragraphs="20" data-published-at="2026-09-12T16:04:06.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 00:04</span>
</div>

### [Logo 编程语言](https://el.media.mit.edu/logo-foundation/what_is_logo/logo_programming.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Logo Programming Language</div>

<div class="article-body" data-article-body="true"><p>Logo 编程语言是 Lisp 的一种方言，最初被设计为一种学习工具。它的特性——交互性、模块化、可扩展性以及数据类型的灵活性——都源于这一目标。</p>
<p>尽管 Logo 存在一些可编译的版本，但它通常被实现为一种解释型语言。这种方式的交互性为用户对单条指令提供了即时反馈，从而有助于调试和学习过程。其错误提示信息非常具体详实。例如：<br />I don&#39;t know how to fowad（我不知道如何 fowad）<br />（“fowad”这个词既不是原语——即 Logo 的内置词之一——也不是你所定义的过程。）<br />Not enough inputs to forward（给 forward 的输入不足）<br />（现在你拼写正确了，Logo 认识“forward”这个词，但无法运行你的指令，因为 forward 需要额外的信息。）<br />（Logo 正常运行了。没有错误提示。海龟向前移动了 100 步。）</p>
<p>Logo 程序通常是由若干小型过程组成的集合。一般来说，过程是通过在文本编辑器中编写来定义的。特殊关键字“to”后面跟着过程的名称。随后的几行构成过程的定义。单词“end”则表示定义结束。</p>
<p>在我们海龟绘图的示例中，我们定义了一个用于绘制正方形的过程：<br />to square repeat 4 [forward 50 right 90] end<br />并将其用作另一个过程的子过程：<br />to flower repeat 36 [right 10 square] end<br />同样地，flower 也可以作为更大规模任务的基础模块：<br />to garden repeat 25 [set-random-position flower] end<br />不，set-random-position 并不是一个原语，但 random 是，setposition（或 setpos、setxy）也是。或者你也可以使用 forward 和 right 搭配 random 来编写 set-random-position。</p>
<p>一旦定义了一个 Logo 过程，它的使用方式就与 Logo 原语无异。事实上，当你查看 Logo 程序时，除非你清楚该特定 Logo 版本的具体实现，否则根本无法区分哪些词是原语、哪些是用户定义的。在我们的语言示例中，我们使用过程 pick 从列表中随机选择一个项目，例如在过程 who 中：<br />to who output pick [Sandy Dale Dana Chris] end<br />在某些 Logo 版本中，pick 是一个原语，而在其他版本中你必须自己编写。但无论哪种情况，who 的形式和运行机制都是相同的。</p>
<p>Logo 允许你通过细小的步骤构建复杂的项目。在 Logo 中进行编程，是通过扩充其词汇库来完成的——即用它已经认识的词去教它新词。从这个角度来看，它与人类学习口语的方式非常相似。</p>
<p>Logo 针对“字”（word）和“列表”（list）进行操作。Logo 中的“字”是由字符组成的字符串。Logo 中的“列表”是“字”和/或“列表”的有序集合。数字也是字，但它们很特殊，因为你可以对它们进行算术运算等操作。</p>
<p>许多编程语言对于要求明确知晓你声称使用的数据类型非常严格。这虽然减轻了计算机的负担，却增加了程序员的难度。在将两个数字相加之前，你可能必须指明它们是整数还是实数。计算机确实需要知道这些事情。但大多数人在思考时并不会考虑这一点，因此 Logo 会为你处理好这些问题。当要求进行算术运算时，Logo 只管直接去算。</p>
<p>如果你对 Logo 不熟悉，但擅长其他编程语言，以下代码序列可能会让你感到惊讶：<br />print word &quot;apple &quot;sauce applesauce<br />print 12 + word &quot;3 &quot;4 46</p>
<p>以下是一个计算阶乘的递归过程：<br />to factorial :number if :number = 1 [output 1] output :number * factorial :number - 1 end<br />print factorial 5 120</p>
<p>以下是一个用于反转词列表的过程：<br />to reverse :stuff ifelse equal? count :stuff 1 [output first :stuff] [output sentence reverse butfirst :stuff first :stuff] end<br />print reverse [apples and pears] pears and apples</p>
<p>你可能还想看看 Brian Harvey 编写的趣味 Logo 示例。</p>
<p>刚才展示的这些特性是所有 Logo 版本共通的。某些 Logo 实现还包含了增强型语言特性。</p>
<p>曾经有一款针对 Macintosh 平台的面向对象 Logo，名为 Object Logo。</p>
<p>MicroWorlds Logo 包含多任务处理功能，从而可以同时运行多个独立的进程。在乐高 Logo 产品 Control Lab 的软件中也具备同样的能力。而一个更大规模并行化的 Logo 则是 StarLogo。</p>
<p>在传统 Logo 中，给海龟的命令：<br />repeat 9999 [forward 1 right 1]<br />需要耗费一些时间来执行。指令：<br />repeat 9999 [forward 1 right 1] print &quot;HELLO<br />会导致单词 HELLO 必须在海龟完成移动之后才会显示出来。</p>
<p>而在 MicroWorlds Logo 中，键入：<br />launch [repeat 9999 [forward 1 right 1]] print &quot;HELLO<br />会让海龟开始移动。同时，第一个进程一旦启动，单词 HELLO 就会立刻显示出来。或者：<br />forever [forward 1 right 1] print &quot;HELLO<br />会启动一个持续运行直到你将其停止的进程。同样，只要海龟进程一启动，单词 HELLO 就会立刻出现。</p>
<p>要了解有关 Logo 编程语言的更多信息，请参阅 Brian Harvey 的三卷本著作《Computer Science Logo Style》以及 Michael Friendly 的《Advanced Logo》。</p>
<p>如果你手头没有 Logo 且想要上手体验，可以查看我们的 Logo 软件页面。或者，你现在就可以直接下载 UCBLogo、MSWLogo、FMSLogo、StarLogo TNG 或 StarLogo Nova。</p>
<p>本文的乌克兰语译本可在此处获取。本文的塞尔维亚-克罗地亚语译本可在此处获取。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-13 00:04 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://el.media.mit.edu/logo-foundation/what_is_logo/logo_programming.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-hat-are-not-writing-code-facfec3e9bce14fb" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1185" data-content-paragraphs="15" data-published-at="2026-09-12T15:56:54.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-12 23:56</span>
</div>

### [除了写代码，AI Agent 还能做的那些实用事](https://elijahpotter.dev/articles/useful_things_agents_can_do_that_are_not_writing_code)
<div class="original-title-sub"><span class="orig-tag">原文</span> Useful Things Agents Can Do That Are Not Writing Code</div>

<div class="article-body" data-article-body="true"><p>当下舆论热烈探讨着当你允许 AI 编码 Agent（智能体）写代码时，能做出的那些美妙（以及可怕）的事情。允许 Agent（旧称 clanker，破铜烂铁）编写应用程序中所有代码的人，通常被称为“氛围编码者”（vibe-coders）。本文讨论的并不是氛围编码。事实上，本文探讨的是你可以让 AI Agent 完成的所有独立于编写代码之外的事情。</p>
<p>针对其中的每一项，我都会先介绍具体的使用场景，然后附上我目前使用的最新版 pi 提示词。</p>
<p>我并不认为你应该分毫不差地直接套用我的提示词。我也不是在建议你直接照抄我的工作流程。许多此类工具的精妙之处恰恰在于它们极具灵活性，能够适应你的工作风格。我分享这些提示词只是为了提供灵感。也许在写代码之外，还有不少事情是你本可以用 Agent 来代劳的。</p>
<p>我经常发现自己需要为 PR（Pull Request）解决合并冲突，原因要么是我自己、要么是开源贡献者修改了上游代码。几乎每次这些冲突都只是格式调整或样板代码变动，根本不需要耗费我全部的注意力。换句话说，这正是交给 clanker 处理的完美工作。</p>
<p>在 pi 中，我可以像调用函数一样调用它：</p>
<p>无论我是否已经下载并检出了相关的 PR，都没有关系。clanker 会以非破坏性的方式把一切都梳理清楚。</p>
<p>在参与开源软件开发时，我通常会优先修复那些自己觉得很讨厌的 bug，并引入能让我自己生活更轻松的功能。这很自然。但每当我这么做时，我都想知道自己是否碰巧顺便帮别人解决了问题。如果是的话，我就可以在 PR 描述中关联相关 Issue，或者直接联系那个人。</p>
<p>为了找到这些相关的 Issue，我使用了以下 pi 命令：</p>
<p>同样，这也可以像函数一样被调用：</p>
<p>GitHub Actions 工作流失败的情况中，有 90% 并不是由代码 bug 导致的。而是因为我忘了运行代码格式化工具或静态分析工具（比如 Prettier 或 tsc）。</p>
<p>在这种情况下，出问题的并不是某段功能性代码，而可能只是一个注解或漏掉的回车符。这原本只需要简单改一行就能修复。为什么不让 clanker 来干呢？</p>
<p>当某次 GitHub Actions 运行失败时，我可以使用带有以下提示词的 Agent 立即将其修复妥当。</p>
<p>它可以在 pi 内部作为命令运行：</p>
<p>我分享这些提示词纯粹作为启发。你有哪些可以自动化的事情吗？如果有，请务必告诉我！</p>
<p>发布于 2026 年 9 月 11 日 晚上 9:39<br />由 Harper 校对。<br />这篇文章的标题略有误导性。本地优先（Local-first）软件通常根本不需要做扩展。<br />这并不容易，但我认为这是我养成的最好的习惯之一。<br />我看到一种越来越普遍的趋势：人们在网络社区中频繁炫耀自己是在 AI 的协助下写作的。他们似乎对此感到自豪。但他们本不应该如此。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-12 23:56 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://elijahpotter.dev/articles/useful_things_agents_can_do_that_are_not_writing_code" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ipython-xkcd-font-52bdd9f469c4f283" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="660" data-content-paragraphs="10" data-published-at="2026-09-12T15:39:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-12 23:39</span>
</div>

### [要闻：请重新加载此页面](https://github.com/ipython/xkcd-font)
<div class="original-title-sub"><span class="orig-tag">原文</span> xkcd-font: The xkcd font</div>

<div class="article-body" data-article-body="true"><p>加载时出错。请重新加载此页面。</p>
<p>这些字体衍生自网络漫画 xkcd 作者 @randallmunroe 的手写体。没错，这确实是他本人的笔迹，而且他希望我们能修复那些令人烦恼的字距（kerning）问题：</p>
<p>该仓库包含两款字体：xkcd Script 和 xkcd，两者各有其特点（及局限性）：</p>
<p>xkcd Script 是一款源自 Randall 提供的笔迹样本的字体。它比 xkcd 规整度低得多，因此我们认为它更接近真实的手写体。</p>
<p>您可以查看该字体的实时预览，或者参阅 xkcd-script/README 以获取关于该字体及其构建方式的更多信息。</p>
<p>预构建的字体文件可直接在该仓库中获取：xkcd-script.ttf | xkcd-script.woff</p>
<p>xkcd 字体最初由 Randall 创建，并曾在 xkcd 漫画《现代生活的节奏》（The Pace of Modern Life，2013年4月1日）中使用。它比 xkcd Script 规整得多，这提高了字体的易读性，但代价是稍微不那么像真实的 xkcd 漫画笔迹。</p>
<p>预构建的字体文件可直接在该仓库中获取：xkcd.otf</p>
<p>本作品采用“知识共享 署名-非商业性使用 3.0”（Creative Commons Attribution-NonCommercial 3.0）许可协议进行授权。</p>
<p>贡献指南旨在简化审核流程并确保仓库的一致性。此外，针对特定字体的贡献指南可在各字体的 README 文件中找到（xkcd-script、xkcd）。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-12 23:39 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://github.com/ipython/xkcd-font" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-post-buildprof-3032be2fe4c77146" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7448" data-content-paragraphs="3" data-published-at="2026-09-12T14:48:24.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-12 22:48</span>
</div>

### [我制作了一款构建可视化工具，以探究 Bun 的编译耗时](https://lalitm.com/post/buildprof/)
<div class="original-title-sub"><span class="orig-tag">原文</span> I made a build visualizer to understand Bun’s compile times</div>

<div class="article-body" data-article-body="true"><p>我开发了 buildprof（Github），这是一个开源追踪工具，用于展示在 Linux 上编译软件时时间究竟花在了哪里。这里有一段它对 ripgrep 进行全新完整构建进行性能分析的实时视频：<br />观看 buildprof 演示视频<br />有时，构建速度慢纯粹是因为有太多代码需要编译。但通常情况下，原因是那些可以被修复的问题：并行度差、重复工作、依赖下载或者某次极其庞大的编译器/链接器调用。buildprof 让这一切清晰可见，让你能一目了然地看到哪些环节值得深入调查和优化。<br />你可以通过在现有的任何构建命令前加上 `buildprof --` 来运行它：<br />buildprof 会记录你的构建命令启动的每一个进程，包括它们的子进程（以及子进程的子进程……），并将它们呈现在同一条时间线上。时间从左向右推进，条形宽度表示耗时，子进程则显示在启动它们的进程下方。<br />我制作 buildprof，是因为 Bun JavaScript 运行时首席架构师 Jarred Sumner 发的一条推文一直萦绕在我的脑海中：<br />具体来说，他声称 Bun 在 Linux 上的全新 Rust 构建比旧版 Zig 构建快 5 倍以上，这真的让我十分困惑。根据以往的经验，在复杂度相当的情况下，Zig 项目的编译速度通常远快于 Rust 项目。这一直觉足以让我觉得其中必定另有隐情待解。<br />推文中另一个关键却极易被忽视的细节让情况变得更加复杂：Zig 构建使用了 Full LTO（完整链接时优化），而 Rust 构建使用的是 ThinLTO。<br />编译器通常很大程度上孤立地优化各个单独的编译单元¹。链接时优化（LTO）允许编译器跨越这些边界进行优化。Full LTO 将所有编译单元整合到一个庞大的优化作业中，而 ThinLTO 则保留了更多的隔离度，从而让大部分工作能够并行运行。<br />从过去的经验来看，这种差异可能对构建时间产生巨大影响。推文中只是顺带提到了这一点，但我想知道，头条宣传的性能提升中究竟有多少是因为它。<br />我首先尝试复现这些数据。<br />我检出了 Bun 1.3.14 和 Bun 1.4.0 的代码，并编写了一些脚本在一台 6 核 12 线程的 Linux 虚拟机上重放它们的 Linux x64 CI 构建流程。这些脚本保留了构建步骤及其依赖项，将所有任务运行在单台机器上²。<br />我测出的耗时与 Jarred 的数据基本在一个数量级：<br />很好，这一差距在我的机器上也出现了。但在两次测试之间，除了开发语言之外还有许多其他变动；那么真正的原因到底是什么？是 Zig 编译器耗费了所有那些额外的时间吗？抑或是 Full LTO 链接？还是说 Bun 的构建中存在某些我甚至根本没有想去排查的东西？<br />这时我搞性能分析和开发者工具的职业本能发挥了作用。通常，当我尝试理解某件事情为何变慢时，我需要一份追踪记录（trace）：发生了什么、何时发生以及耗时多久。如果能为这些构建生成这样的追踪记录，将它们铺在时间线上看时间究竟花在了哪儿，那该多酷啊。<br />但一次构建牵涉到很多不同的工具，每个工具对自己内部发生的事情都有各自的记录逻辑。我能记录什么来横跨观察所有这些工具呢？<br />当你输入 `cargo build` 或 `zig build` 时，感觉就像是在运行一个程序。构建系统会计算出哪些部分需要重新构建、这些部分之间的依赖顺序以及哪些可以并行运行。但通常情况下，它本身并不执行所有这些具体工作；它会启动编译器、代码生成器、归档工具、链接器以及各种脚本。而这些又可以启动更多的程序，后者又会启动其他程序……<br />不同的构建系统以不同的方式描述这些工作。Cargo 关注的是 crate，Ninja 关注的是构建边（build edges），而 CMake 则为另一个构建系统生成指令。然而，从操作系统的角度来看，它们（绝大多数）看起来就是进程不断启动其他进程³。<br />例如，一个 Rust 构建可能包含这样一条调用链：<br />如果我们记录每个子进程开始和结束的时间，就能将它们排列在时间线上。以下是这条调用链在 buildprof 中的呈现形态：<br />在这个层面上对构建进行可视化还具有若干极具吸引力的特性：<br />这为我提供了开发 buildprof 的起点：记录进程树，然后将其转换为我可以交互探索的时间线。这其中还有许多细节可以深入探讨，我稍后会讲。但一旦这一机制跑通，我终于可以回到最初的问题：Bun 在那 24 分钟里究竟在干什么？<br />我首先使用之前的脚本，用 buildprof 记录了 Zig 时代的 CI 构建：<br />在 buildprof 中探索<br />我们立刻就能发现一个巨大的问题：`ld.lld` 链接器的调用主导了整个构建时间。它在最后阶段独占运行了超过 16 分钟，约占整个构建耗时的三分之二。它在那段时间里到底在干什么？<br />点击链接器即可显示其命令行参数，buildprof 会自动捕获这些参数：<br />正如 Jarred 所言，确实存在 Full LTO。考虑到链接过程耗时如此之长，它现在成了我的主要怀疑对象。<br />但单靠进程树无法告诉我那 16 分钟是否真的全由 LTO 造成。值得庆幸的是，LLD 会记录其内部的时间线事件，当你传入 `--compiler-traces` 时，buildprof 便可以将它们包含进来。<br />我再次记录了最终的链接过程，这次启用了 `--compiler-traces`：<br />现在我们可以看到，几乎所有时间都消耗在了 LTO 上。链接器正在对整个程序运行编译器优化遍（compiler passes），而不仅仅是将已经编译好的文件合并在一起。仅 `OptModule` 耗时条就耗费了刚过 10 分钟的时间，其中包括生成机器代码的优化遍⁴。<br />鉴于 Zig 构建有如此多的时间耗费在 LTO 上，我想看看 Rust 构建在链接上花了多少时间。我也对那个构建进行了记录：<br />仅仅 2 分 24 秒。正如预期，这次的链接器命令中包含了 `-plugin-opt=thinlto`：<br />两个构建都在进行 LTO，但配置不同，链接耗时也截然不同。如果我保留 Bun 的 Zig 代码并将 Full LTO 改为 ThinLTO 会怎样？这能抹平多少差距？<br />我将 Zig Bun 的构建标志切换为 ThinLTO，并记录了另一次全新构建，同时重新进行了一次全新的 Full LTO 构建以作对比：<br />在 buildprof 中探索：Full LTO · 部分 ThinLTO<br />在这一组记录中，链接速度加快了 3 分 40 秒，但仍耗时近 13 分钟。为什么链接依然如此昂贵？<br />回顾编译器追踪记录，许多工作都集中在名称带有 `JSC` 的函数上。那是 JavaScriptCore，即 Bun 用来执行 JavaScript 的引擎。链接器当时也在花时间编译这个 JavaScript 引擎⁵。<br />点击链接器调用查看其输入文件，可以在其中看到 WebKit 库，包括 `libJavaScriptCore.a`：<br />顺着这些输入文件回溯整个构建过程，我发现 Bun 本身并没有编译这些库。它是从一个独立的 WebKit 构建中下载它们的。而当我检查那个 WebKit 构建的编译标志时，它赫然在目：`-flto=full`。Rust 构建则使用了一个更新版本的 WebKit，其构建配方选择的是 ThinLTO。</p>
<p>尽管我修改了 Bun 编译自身代码的方式，但那些下载的库依然包含 Full-LTO（完整链接时优化）输入，因此链接器仍然必须对这部分代码进行优化并生成机器码。若要改变这一点，我必须连同 WebKit 一并重新编译。<br />我检出了历史版本的 WebKit 修订版，并使用兼容的 ThinLTO 设置重新编译了它及其 ICU 依赖项。随后，我用自己构建的库替换了下载的库，同时保留了对 Bun 所做的 ThinLTO 调整。<br />以下是记录的构建情况：6<br />此时链接耗时为 7 分 22 秒。虽然仍比 Rust 构建慢，但已有了显著改善，足以促使我将目光投向链接器之外的环节。<br />构建总计仍耗时 15 分钟，且在链接器启动前，将近 8 分钟就已经过去了。它究竟在等待什么？我回溯到最初的 CI 追踪记录，以顺藤摸瓜排查来自 Bun 自身代码的输入。<br />buildprof 还会记录每个进程读取和写入的文件。如果一个进程读取了另一个进程写入的文件，它在底层就会将二者关联起来。开启“在时间轴上显示”（Show on timeline）后，这些关联将以箭头的形式绘制出来。在这里，链接器读取了来自 C++ 编译生成的 libbun-profile.a 以及来自 Zig 的 bun-zig.o。两者都是通过复制步骤传递过来的；追溯这些步骤，便能找到生成它们的具体进程：<br />C++ 编译分支率先完成。链接器正在等待 bun-zig.o，因此在 Zig 分支完成之前，链接根本无法开始。<br />正是在这时，我重新对比了 Rust 构建及其工作机制，Rust 构建速度更快的主要原因变得一目了然：Bun 已经被拆分成了 90 多个 crate，而在 Zig 时代，它却试图作为一个单独的 Zig 模块进行全量编译！<br />这意味着 Zig 构建无法像 Rust 那样进行并行处理。我还推测（尽管我尚未证实这一点），这也是导致链接缓慢的原因：链接器必须对一个庞大的 ThinLTO 位码模块进行优化，而无法将相同的工作分摊到各个 crate 中。<br />到此为止，我不得不停下脚步：如果还要继续深入，我就必须亲自分割这个 Zig 模块，鉴于这部分代码无论如何都已废弃，我认为并不值得这么做。<br />顺便提一句，这些追踪记录还暴露出了一些让我忍不住探究的小细节……<br />在 Bun 的 CI 构建过程中，我发现有些命令会向公网请求本机的 IP 地址、检查正在运行的 Docker 容器，并读取最新的 Git 提交信息。<br />这些操作总共耗时远不足一秒。虽然没有什么值得优化的，但我实在没料到会在构建追踪记录中看到它们。<br />上述构建复用了已下载的依赖项，因此我也记录了一次全新的 WebKit 获取过程。下载并解压归档文件大约花费了 20 秒。在前 12 秒内，我们只能看到 Node 在运行。随后它启动了 tar 和 gzip，这时我们便能单独观察到解压过程。<br />此前，我们顺藤摸瓜将链接器的输入追溯到了 Bun 的 C++ 编译过程。我们同样可以深入观察那些编译器调用的内部情况。我挑选了最后完成编译的文件之一 —— ZigGeneratedClasses.cpp，并带上 --compiler-traces 参数重放了它的 Ninja 命令。对于 Clang，buildprof 会启用 -ftime-trace，并将其内部耗时统计整合到进程时间轴中。7<br />重放耗时约 12 秒，几乎平分在 Clang 的前端和后端之间。进一步放大来看，我们发现 Clang 的其中一个阶段 ModuleInlinerWrapperPass 占据了后端超过 4 秒的工作时间。<br />buildprof 的记录端采用了 ptrace，这是调试器所使用的同款 Linux 接口。我确实考虑过 eBPF 和 ftrace，但对于眼前这类特定问题，ptrace 简直是绝配；eBPF 追踪需要 CAP_BPF 和 CAP_PERFMON 权限，并且需要挂钩到可能不稳定的追踪点或内核函数上。而使用 ftrace 的话，我必须周旋于各种追踪实例之间以避免干扰其他用户，并且仅针对构建进程及其所有衍生子进程配置完美的过滤器也相当繁琐。8<br />借助 ptrace，我可以直接启动构建并跟踪其子进程。其内置事件会通知 buildprof 进程何时 fork、何时 exec 新程序或退出。针对文件系统活动，buildprof 则使用 seccomp 过滤器仅拦截它所需的调用。<br />buildprof 的开销大小几乎完全取决于构建过程中打开的文件数量。对于 ripgrep 而言，记录几乎没有改变构建耗时。而 Redis 打开文件的频率要高得多，记录过程增加了大约 5 秒的开销：9<br />如果这种开销造成了困扰，你可以通过 --no-file-events 关闭文件系统追踪，仅保留进程时间轴。<br />我在 Perfetto 项目工作，因此将其作为界面的起点是很自然的选择；buildprof 的界面是 Perfetto UI 的一个软分叉分支（soft fork）。我本可以直接在 ui.perfetto.dev 上打开这些记录，但我希望能够自主控制进程树的布局展示、点击命令时显示哪些详细信息，以及在文件生成者和使用者之间按需绘制箭头等特性。<br />幸运的是，过去几年我们一直致力于通过插件使 Perfetto UI 具备可扩展性。buildprof 的大部分界面都在复用该基础设施。Perfetto 负责处理复杂繁重的工作（解析追踪记录、查询事件、渲染时间轴以及管理工作区），而我得以专注于如何使这些功能更好地服务于构建场景。<br />现如今，仅仅因为具备能力就随手写个工具是极其容易的。但这里并非这种情况；在开发 buildprof 之前，我曾苦苦寻觅能够提供此类视角的现有工具。<br />我最先尝试的是 ninjatracing，这款工具我用过很多次。它能将 Ninja 的构建日志转换为时间轴，展示哪些任务在运行以及有多少任务在并行运行。<br />这是 Zig 时代构建的 Ninja 日志。<br />但 Ninja 只能窥见 Bun 构建的一部分。调用它的脚本在日志中并未体现，而且即使它所运行的命令启动了整棵子进程树，这些命令也仅显示为单一的区块。<br />还有其他几款工具，各自覆盖了该问题的不同层面：<br />What the Fork（来源链接）是最为接近的一个：它跨构建系统跟踪进程，并呈现出专门针对构建的视图。但就我所知，它目前似乎仍处于内部测试阶段，且没有任何开源计划。<br />buildprof 已经实现了我预期的目标，我打算在将它用于自身日常构建的过程中持续维护和改进它。不过，仍有几处地方我想进一步完善。<br />记录开销是其中之一；Redis 的测试测量表明文件系统追踪仍有优化空间，特别是对于会打开大量文件的构建场景。此外，我也希望支持 macOS（我的一部分工作在上面进行），如果有人感兴趣的话，或许还会支持 Windows。<br />我还想测试更多的构建系统和工具链，包括 npm、Gradle 和 Bazel。计算关键路径也将是一项重大改进：虽然在这篇文章中我们是手动追溯依赖关系的，但未来 buildprof 能够帮助识别拖慢构建的关键工作链，并自动予以标注。</p>
<p>我可能会在需要时随时解决这些问题。但如果你试用了 buildprof 并且希望它具备某些功能，我很乐意听听你的想法。大家的实用需求将帮助我决定把更多时间投入在何处。<br />我成功满足了自己的好奇心，不过在这上面花费的时间最终远超我的预期。在此过程中，我打造出了一个工具，以后只要遇到构建耗时过长的情况，我都希望能用上它。<br />我知道，下次再被缓慢的构建惹恼时，我一定会重新用起 buildprof。如果你也饱受这类构建的困扰，不妨试一试。我很想知道你会有什么发现！<br />或者继续阅读相关主题：<br />在 C 和 C++ 中，编译单元通常是一个源文件连同其包含的头文件。Rust 编译的是 crate，它可以被拆分为多个代码生成单元。Zig 通常将一个程序的 Zig 源代码作为一个单一编译单元进行编译。Bun 的 Zig 编译器分支支持将其拆分为多个 LLVM 模块，但其 CI 构建在启用 LTO 时显式指定为单个模块。↩︎<br />Zig 时代的 CI 构建是在独立的 Buildkite 机器上运行 C++ 和 Zig 编译阶段，并将它们的输出传递给最终的链接阶段。我的脚本在单台机器上并发运行了这些阶段，等待两项输出完成，在本地直接复制输出而不是通过网络传输，然后进行链接。这应该保留了依赖图，但由于硬件差异以及在单台机器上运行两个阶段，资源争用情况显然会截然不同。另外需要注意的是，我的耗时是单次运行的结果（尽管运行结果非常稳定），而 Bun 报告的数据是中位数。↩︎<br />一个进程可以在内部完成大量工作（包括运行多个线程）而无需启动任何其他子进程。进程时间线无法展示这种并行性。要观察进程内部的情况，我们需要来自程序本身的跟踪数据，就像 Clang 和 LLD 在以下示例中提供的那样。↩︎<br />LLVM 从其旧版 Pass 管理器中发出 OptModule，LLD 将其用于代码生成。内联及其他 IR 优化 Pass 可能会出现在它之前，因此该时间条并不代表优化一个模块所花费的总时间。↩︎<br />在先前的 Full-LTO 链接器重放中，带有 JSC 符号的 26,825 个 OptFunction 事件总耗时约为 209 秒。这是累加的事件时间，并非 JavaScriptCore 对链接过程整体耗时贡献的绝对衡量。例如其中一个事件耗时 2.94 秒；其符号经重整后（demangles）为 JSC::JITThunks::initialize(JSC::VM&amp;)。↩︎<br />记录脚本。这些耗时仅适用于在库已就绪的情况下构建 Bun；WebKit 和 ICU 的重新构建在此之前完成，并未包含在内。当然，我也能把 buildprof 指向那次构建，但这又会牵扯出另一个深坑……我没有重新构建一份相匹配的 Full-LTO WebKit 归档文件作为对照，因此我不能将节省下来的每一秒都单纯归因于 LTO 设置。↩︎<br />buildprof 目前支持来自 Clang、LLD 和 nightly Rust 的编译器跟踪。↩︎<br />eBPF 跟踪需要使用如 CAP_BPF 和 CAP_PERFMON 等权能（capabilities），正如内核的权能定义中所描述的那样。ftrace 提供了独立的跟踪实例和 PID 过滤器，但这些仍需要配置并获取对 tracefs 的访问权限。ptrace 也取决于宿主机的安全设置；容器可能需要额外的权限才允许跟踪子进程。↩︎<br />同一台虚拟机上每种模式进行五次全新构建的中位数，采用六个构建任务。测量脚本。↩︎</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-12 22:48 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://lalitm.com/post/buildprof/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-2026-09-09-base84-7b3e967b8cfa8b31" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1813" data-content-paragraphs="1" data-published-at="2026-09-12T14:38:51.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-12 22:38</span>
</div>

### [Base84 理应在文件名中占有一席之地](https://00f.net/2026/09/09/base84/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Base84 deserves a place in file names</div>

<div class="article-body" data-article-body="true"><p>TurboCrypt 文件加密工具最初是专为 Unix 系统设计的。<br />过去它一直使用 Base91 对文件名进行加密并将生成的密文进行编码。<br />为什么选择 Base91？因为它非常契合加密文件名的需求，生成的字符串可以作为有效的文件名存储在 Unix 和 macOS 上。<br />“但是我的文件系统可以存储任意文件名啊！”对于某些文件系统来说这或许属实，但这并未考虑到类库和应用程序的情况。例如，macOS 的访达（Finder）就绝对无法接受这种情况。<br />因此，Base91 在加密文件和目录名上表现良好。<br />后来，用户提出了对 Windows 系统的支持需求，而 Unix 文件系统安全字符表中的几个字符在 Windows 中是被禁止使用的。<br />因此，TurboCrypt 正在转向使用 Base84。<br />令人惊讶的是，这种编码此前从未被定义过，（显然）也未在任何地方被使用过，尽管对于任何需要编码为跨平台文件系统安全名称的内容来说，它都堪称绝配。<br />排除空格后，共有 94 个可打印的 ASCII 字符。但 Windows 规则排除了其中的 9 个：<br />而且以句点（点号）结尾的名称无法通过 Windows shell 和常规文件 API 可靠运行。<br />再去掉句点，我们就剩下了 84 个可以出现在文件名组成部分任意位置的字符。微软对这些限制进行了文档说明。<br />不过，Windows 允许以点号开头：例如 .gitignore 就可以正常使用。<br />但去掉点号还可以避免在 Unix 上生成隐藏文件名称以及特殊的名称 . 和 ..。<br />以下是按编码顺序排列的字符表：<br />每一个字符在常见的 Linux、macOS 和 Windows 文件系统文件名中都是完全合法的。<br />zig-base84 是 Base84 的一个实现。<br />它以 5 个字符为一组进行输出。5 是一个极佳的平衡点：84⁵ = 4,182,119,424，仅比 2³² 小了 2.6%。<br />这为每组编码留出了足够的空间，在面对均匀随机输入时，大约有 95% 的概率可以容纳 32 位（bit），其余情况下可容纳 31 位。<br />编码器会检查接下来的 31 位。如果它们的值小于 84⁵ - 2³¹，就还有容纳第 32 位的空间。否则，它就仅消耗这 31 位。无论哪种方式，该值都能放入 5 个 84 进制数字中。<br />在随机输入下，每组大约为 31.95 位，即每个字符约 6.39 位。输出大约比二进制输入大 25.2%。几乎接近 Base85。<br />这些膨胀率忽略了最后一个不完整的分组；平均值均假定为随机输入：<br />全为 0xff 的输入会迫使每个完整分组只能消耗 31 位。这是最糟糕的情况：膨胀率约为 29%。<br />大多数文件系统将文件名限制在 255 字节以内。由于字符表采用 ASCII 字符，因此也就是 255 个字符。5 能整除 255，因此即使是达到最大长度的文件名也只包含完整分组，不会因为不完整分组而损失位数。Base84 保证可容纳 197 字节的输入，而无填充的 Base64 仅能容纳 191 字节。<br />Unix 文件名可以包含 Windows 拒绝的大多数标点符号。文件名内部禁止使用 NUL 和 /；Linux 路径名文档列出了具体规则和特定文件系统的限制。<br />zig-base91 中的文件系统变体将标准 Base91 字符表中的斜杠替换为单引号。在随机输入下，它每个字符大约可以打包 6.51 位，膨胀率约为 23%。<br />对于仅限 Unix 的文件名，可以使用该变体。标准 Base91 仍包含 /，且两套字符表都包含 Windows 拒绝的字符。<br />Windows 保留了诸如 CON、NUL 和 COM1 等设备名称，无论大小写如何。<br />这种 5 字符打包机制带来了一个非常有用的副效应：使用标准字符表时，即使是简短的输入，编码器也无法拼出保留的设备名称。<br />3 个字符的输出总是以 A 到 J 结尾。这就排除了 CON、PRN、AUX 和 NUL（不区分大小写）。<br />4 个字符的输出总是以大写字母或 a、b、c 结尾。它不能以数字结尾，因此 COM1 到 COM9 以及 LPT1 到 LPT9 也是不可能出现的。Windows 额外保留的上标数字也不在字符表中。<br />而且字符表中没有点号，因此保留名称后跟扩展名的情况也是不可能出现的。<br />无需任何填充或特殊处理即可避开这些保留名称。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-12 22:38 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://00f.net/2026/09/09/base84/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::