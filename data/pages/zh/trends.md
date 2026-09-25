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
<div id="story-amscr-3c9e2f07427bc008" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5206" data-content-paragraphs="42" data-published-at="2026-09-25T13:01:42.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 21:01</span>
</div>

### [Amiga 屏幕机制入门指南](https://www.datagubbe.se/amscr/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Amiga screens: a primer</div>

<div class="article-body" data-article-body="true"><p>datagubbe.se » Amiga 屏幕机制入门指南</p>
<p>互联网上似乎有一条不成文的规律：只要有人提起与 Amiga 相关的事情，就必然会至少有一个 Amiga 粉丝（包括我自己）现身，试图向大家解释“屏幕（screens）”这一概念。我们会告诉你，Amiga 的屏幕可以拥有不同的分辨率；我们会说，你还可以拖动它们；其他 Amiga 用户也会齐声附和，而没有接触过 Amiga 的用户大概仍然搞不懂屏幕到底有什么了不起。直到现在，我写下了这篇文章，希望能将毫无防备的普通用户彻底转变为 Amiga 屏幕的狂热爱好者。</p>
<p>出于实用考虑，本文将重点探讨最初的 Amiga 图形硬件，即 OCS（原始芯片组，Original ChipSet）。虽然在后来的 ECS（增强芯片组，Enhanced ChipSet）和 AGA（先进图形架构，Advanced Graphics Architecture）升级中解除了一些硬件限制，但相同的基本原理和用户体验依然适用。</p>
<p>一个典型的 Amiga 屏幕，展示了打开 Shell 窗口的 Workbench 桌面。</p>
<p>“屏幕”在 Amiga 上的特定含义源于操作系统，系统用这个术语来指代一种特定类型的显示区域，因为本质上它确实就是一个“屏幕”。Amiga 游戏和 Demo（演示程序）程序员并没有被这个概念所拘束；例如，《Amiga 硬件参考手册》将显示区域称为“活动场（playfield）”，而 Demo 程序员可能会谈论光栅分割（raster splits），但为了简单起见，我们还是沿用“屏幕”这一称呼。</p>
<p>因此，Amiga 上的屏幕基本上就是一个用于绘制图形的区域。Amiga 屏幕可以拥有不同的分辨率和色彩深度，一个程序可以打开任意数量具有不同分辨率的屏幕来显示图形。</p>
<p>如今，我们大多使用单一且固定分辨率的显示区域，这是现代操作系统与平板显示器协同工作的结果。然而，在 CRT 显示器的全盛时期，打开不同分辨率的显示界面是极为寻常的事。例如，在支持 VGA 的 MS-DOS 计算机上运行的图像查看器，在浏览文件时可能会使用 16 色、720×400 像素的文本模式分辨率，而在查看图片时则会打开一个全新的 256 色、320×200 像素的显示界面。</p>
<p>这种分辨率和色彩深度的变化基本上存在于当时所有的家用电脑中，是硬件为了在不同使用场景下兼顾合理运行速度与内存开销而做出的权衡。当时的内存非常昂贵（历史总是何其相似！），而 Amiga 在其原厂硬件配置中，依赖的是 CPU、视频和音频硬件共享的相对较小的 RAM 空间，因此它提供了对这些屏幕分辨率和色彩深度的高度控制权。</p>
<p>为了操作单个像素的颜色值，Amiga 采用了平面图形（planar graphics）技术，这意味着屏幕的色彩深度是通过增加更多位平面（bitplane，简称 bpl）来实现的。每个位平面在内存中单独存储，要改变某个像素的颜色索引，必须在各个平面中切换对应的比特位。</p>
<p>因此，单一位平面屏幕可提供 2 个颜色索引，两个位平面可提供 4 个颜色，依此类推，在最初的 Amiga 硬件上最多支持 5 个位平面和 32 种颜色（在 AGA 硬件上可达 8 个位平面和 256 种颜色）。</p>
<p>展示位平面如何组合在一起表示每个像素颜色索引的示意图。（出自《Amiga 硬件参考手册》）</p>
<p>在 OCS 和 ECS 上，每个屏幕支持的最大位平面数取决于其显示分辨率，这些分辨率设计旨在与 PAL 制式或 NTSC 制式的电视机相契合。配备 OCS 的 Amiga 提供低清（low-res）和高清（high-res）模式。在 PAL 制式下，低清模式为 320×256 像素（隔行扫描下为 320×512 像素），最多支持 32 种颜色（5 个位平面）。高清模式为 640×256 像素（隔行扫描下为 640×512 像素），最多支持 16 种颜色（4 个位平面）。这些基础分辨率可以通过使用过扫描（overscan）略微增加，在高清模式下最高可达 724×283 像素，但并不能保证在所有类型的监视器或电视机上都能完全显示。</p>
<p>在低清模式下，可以使用第六个位平面来实现 HAM（保持与修改，Hold-And-Modify）模式，从而允许在存在某些限制的情况下，同时自由使用 OCS Amiga 全部 4096 种颜色；或者使用 EHB（额外半亮度，Extra Half-Brite）模式，它将 32 色的调色板复制为原本颜色的额外 32 份副本，但亮度值仅为原色的一半。</p>
<p>Deluxe Paint 正在编辑一张 EHB 图像。请注意屏幕右下角的颜色选择器：最右侧的两列正是前两列颜色的“半亮度”副本。由于受到 12 位色彩空间的限制，半亮度的呈现并不总是完美的。</p>
<p>与当时的大多数竞争对手不同，Amiga 拥有真正的抢占式多任务处理能力，而平面图形技术为此提供了极为便利的资源节省手段。文本编辑器在 2 色屏幕上可能就能很好地运行，从而省下内存供同时在 32 色屏幕上运行的图形软件使用。它节约内存的另一层体现在于：存储单个像素只需要绝对必要数量的比特位，同时又能保持内存寻址的合理性，而不是像每个像素分配一个字节那样白白浪费掉未使用的位。此外，屏幕的尺寸和位置可以任意设定，例如可以在物理显示区域的底部显示一个 320×50 像素的低清屏幕。每个屏幕不使用超过实际所需的像素，也有助于节省内存。</p>
<p>Amiga 最初是作为游戏机设计的，这意味着它具备大量用于图形处理的硬件特性。重新定位屏幕是瞬间完成的，整屏滚动的速度也极快，甚至连操作系统都允许用户配置一个比可见区域更大的桌面屏幕，并通过鼠标在其周围滚动浏览。</p>
<p>此外，在重绘周期的任意时间点更改显示分辨率和色彩深度也是轻而易举的事。这意味着可以同时组合多个屏幕，甚至让它们重叠，同时仍为最终用户维持一致的显示体验。请看下面这个例子：</p>
<p>同时显示两个分辨率和色彩深度均不相同的屏幕。</p>
<p>上面的示例是使用 BASIC 方言 AMOS 创建的，AMOS 对屏幕概念有自己的理解，并为操作 Amiga 的图形硬件提供了简单的抽象。在任何一个屏幕上，仍然可以单独执行任何类型的图形操作，例如绘图、滚动、重新定位屏幕以及更改调色板。</p>
<p>这是一个普通的 4 色 Workbench 屏幕。背景渐变是通过 Copper 协处理器实现的，它在视频渲染期间定期改变颜色索引 0 的数值。</p>
<p>将具有不同分辨率和色彩深度的屏幕进行组合，有着非常多的应用场景。即使每个屏幕的最大颜色数是 32 种，这 32 种颜色在各个屏幕之间也可以互不相同。因此，一款游戏可以通过在主游戏区域使用 32 种颜色，而在用户界面和/或状态显示栏使用另外 32 种不同的颜色，从而同时显示 64 种或更多颜色。这还可以进一步结合 Copper 渐变，以此进一步大幅增加同屏显示的色彩数量。</p>
<p>除了游戏之外，这种迅捷的图形处理能力在运行多任务生产力软件时也极为便利，这（终于！）把我们引向了“屏幕拖动”（screen dragging）。</p>
<p>由于早期家用电脑和 PC 提供的显示分辨率较低，大多数应用程序都在全屏模式下运行，占据整个显示区域以显示尽可能多的信息（和用户界面）。在 Amiga 上进行多任务处理时，用户可以通过屏幕右上角的按钮或系统全局键盘快捷键在各个完整的屏幕之间快速切换。然而，屏幕也可以通过鼠标点击并——没错——向下拖动屏幕标题栏来进行拖曳。这样就会露出位于其后方运行的另一个程序的屏幕，如下所示。</p>
<p>[图片说明：屏幕拖动在用户显示器上可能呈现的效果图。]</p>
<p>我必须坦白，尽管我们许多 Amiga 粉丝对此津津乐道，但屏幕拖动的实际实用价值有限，至少在我的个人工作流中是这样。然而，在 1985 年，当多任务处理和彩色图形的结合在除了极其昂贵的 Unix 工作站之外罕见一见时，这种效果想必相当令人惊叹。一个建议的使用场景是，你可以将聊天程序屏幕稍稍向下拖动一点，以查看位于其后方的网页浏览器屏幕上的文件下载进度，但 Amiga 上的全屏切换是如此轻松顺畅，以至于拖动操作通常让人觉得有些繁琐。</p>
<p>为了展示这种屏幕处理有多么利落迅捷，我准备了一段简短的视频剪辑。它是用连接在 Amiga 600 上的平板显示器拍摄的，该机器运行主频为 7 MHz（也就是 0.007 GHz），其底层硬件与 1985 年的原始 Amiga 1000 基本相同。在这里，它一边播放音乐，一边同时运行一个文本编辑器和绘图程序 Deluxe Paint，当然还在执行屏幕切换和拖动：</p>
<p>[点击上方观看视频。]</p>
<p>Amiga 还具备一种名为“双游戏场地”（dual playfields）的特性，这意味着对于两个重叠的屏幕，最前面屏幕的颜色索引 0 会变成透明，从而显示出其下方屏幕的内容。其他颜色索引保持不变，并且通常的所有操作仍可以在各个屏幕上独立执行：滚动、绘制图形、调色板更改等等。</p>
<p>[图片说明：《Amiga 硬件参考手册》中关于双游戏场地（Dual Playfields）的插图。]</p>
<p>下方的截图展示了双游戏场地与精灵（sprites）的结合使用。酒红色的背景和粉色星星绘制在背景游戏场地（这是一个 4 色屏幕）上。绿色和紫色的条形物是精灵，精灵的绘制优先级被设置为置于两个游戏场地之间。其余所有内容均绘制在前景游戏场地（一个 8 色屏幕）上。Amiga 硬件确保即使在 7 MHz 的机器上，每一层也能流畅动画化。</p>
<p>好奇的读者可以通过 Demozoo 下载或观看这个 Amiga 小片头程序（intro）。</p>
<p>在现代机器上，我通常更喜欢将程序作为独立、层叠的窗口运行。部分原因在于如今屏幕空间足够充裕，另一部分原因在于许多现代程序本身就是为这种交互方式而设计的。我确实喜欢把某些应用程序最大化以铺满整个屏幕，比如 Visual Studio Code。多亏了窗口管理器中的虚拟桌面，我可以随后快速切换到另一个工作区，就像在我的 Amiga 上一样即时。</p>
<p>然而，某些程序在高分辨率宽屏显示器上最大化时看起来会很滑稽。我更喜欢在 80 列的终端窗口中阅读 man 手册页，而且我发现正统文件管理器在类似 5:4 这样的接近正方形的高宽比下感觉合理得多。在同一屏幕上运行多个窗口化应用程序的优点在于它们可以同时可见，从而实现快速的上下文切换。缺点则是某些鼠标工作流实际上只适用于全屏应用程序。</p>
<p>以 Directory Opus 为例。它是我所知道最好的正统文件管理器之一，当在我的 Amiga 上全屏运行时，我可以做一些巧妙的操作，比如直接将鼠标指针猛推到屏幕边缘并单击，这会带我进入对应文件列表当前所显示目录的父目录。</p>
<p>[图片说明：点击 Directory Opus 文件列表的边缘。]</p>
<p>完全相同的功能当然也可以在更以窗口为中心的环境中实现，但这毫无意义：如果没有屏幕边缘为鼠标指针提供边界屏障，那个狭窄的可点击区域将很难对准，令人抓狂。</p>
<p>还有一种更单纯的乐趣——但在现代宽屏显示器上很难完全重现——那就是在 80x24 字符的全屏文本模式下编辑代码，或者运行几乎任何基于终端的应用程序。那种比例总有一种让人感觉恰到好处的质感。</p>
<p>本文仅触及了屏幕机制和 Amiga 图形硬件的皮毛。例如，平面图形（planar graphics）允许通过仅操纵构成像素颜色值的部分位平面（bitplanes）来实现许多有趣的技巧和特效。我们甚至还没提到 Amiga 的位块传输器（blitter）硬件，它允许以惊人的速度进行图形内存复制，并具有用于组合或遮罩位平面的各种模式——这对于节奏激烈的街机类动作游戏来说极其有用。</p>
<p>精灵只是被简要提及，并没有讨论如何利用它们为低位平面屏幕添加额外的颜色，或者如何将它们复用叠加以增加更多精灵颜色。如果你想了解更多，我推荐 Codetapper 的 Amiga 网站，该网站非常详细地剖析了 Amiga 游戏编程的图形方面。我强烈推荐关于《野兽之影》（Shadow of the Beast）的文章，该游戏极具创造性地运用了 Amiga 的图形硬件，从而造就了一款拥有多层平滑视差滚动的惊艳游戏。</p>
<p>Amiga 屏幕具有许多有趣的特性：</p>
<p>包括操作系统在内的 Amiga 软件充分利用了这些功能。尽管机器的硬件资源有限且显示分辨率相对较低，这仍旧实现了高效的多任务工作流程。</p>
<p>现在，既然我已经在网上提到了 Amiga，我只需静候某些 Amiga 粉丝给我发邮件，向我解释屏幕机制到底有多么伟大了。在此期间，保重身体，祝黑客编程愉快！</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>在Amiga操作系统中，“screen”（屏幕）指代绘制图形的特定显示区域，不同屏幕可具有不同的分辨率和色彩深度。</li>
    <li>原始Amiga图形硬件被称为OCS（Original ChipSet），随后的升级版本包括ECS（Enhanced ChipSet）和AGA（Advanced Graphics Architecture）。</li>
    <li>来源叙事重点：深度科普经典计算机平台 Amiga 独特的“屏幕（Screens）”概念与图形硬件底层机制（如位平面、OCS架构、双播放区等），阐述其在极度受限的内存与硬件条件下实现抢占式多任务与多分辨率混显的工程智慧，并反思“屏幕拖动”等标志性功能的实际实用性与现代窗口界面的对比。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://www.datagubbe.se/amscr/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-es-progress-at-all-costs-1764305d9a4451d5" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2239" data-content-paragraphs="17" data-published-at="2026-09-25T12:30:36.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 20:30</span>
</div>

### [LLM 政策：不惜一切代价的“进步”](https://diegoe.be/2026/09/25/llm-policies-progress-at-all-costs/)
<div class="original-title-sub"><span class="orig-tag">原文</span> LLM Policies: Progress At All Costs</div>

<div class="article-body" data-article-body="true"><p>GNOME 和 KDE 已经开始考虑大语言模型（LLM）相关政策，我们应当认真探讨这背后的实质到底是什么。</p>
<p>KDE 最先引发了众人的关注——他们提出了一份对 LLM 友好的政策草案，随即点燃了一场论战，最终该草案被删除，部分成员被封禁，还有许多人完全摆出了一种“你们当中有些人可能会牺牲，但这是我愿意付出的代价”的姿态。GNOME 尚未提出任何官方政策，但部分团队（包括 gnome-calendar、loupe、libadwaita、gnome-software、Circle 等）已经落实了严格的规定，目前还有一份非正式草案，旨在全面禁止向 GNOME 项目及基础设施提交任何由 LLM 生成的贡献。</p>
<p>然而我认为，这些讨论并非关于在工作流层面的吹毛求疵，而是关乎自由与开源软件（FLOSS）项目的“存在理由”（raison d&#39;être）。</p>
<p>我的看法是，关于 FLOSS 为何存在、或为何应当存在，目前存在两种思考方式。到目前为止，这两种观点一直在共存，但 LLM 逐渐被纳入某些开发者的工作流中，打破了这种平衡。</p>
<p>我们可以将其中一方称为“集体主义”。这种视角将 FLOSS 定义为共同成就事业、享受重大目标往往能带来的历程与羁绊。乐趣就在于集体努力与面对挑战。克服语言和社交障碍本身就是回报的一部分。“过程即目的地”，“FLOSS 就是我们一路走来结识的朋友”，诸如此类。</p>
<p>而在另一方则是“全成就主义”（completionism），在他们眼中，FLOSS“只是一款产品”，其唯一目标就是始终保持更好、更快、更安全。其中能获得的任何乐趣，都在于个人解决技术难题和满足需求。社交羁绊或许会产生，但同行更多只是普通同事，而非社区。这就像是一场“全Bug、全技巧运用”的工具辅助速通（TAS speedrun）。也就是那种“我们不谈政治”、“我们只在乎代码”的视角。</p>
<p>我的评估是，“集体主义”视角认为 FLOSS 本质上是一项社会实践，能带给你个人小众兴趣之外的经验、羁绊和思想。有时，你甚至能附带收获优秀的软件！而第二种视角则将 FLOSS 视作一种工具，用来扩大你在图形或安全等个人计算机兴趣领域的复杂度上限。相比于整天手动变基补丁和维护分支，FLOSS 只是一种便利手段。</p>
<p>我们面临的问题在于，LLM 为第二组人群提供了一个杠杆，让他们不再给集体主义视角留出任何空间。当 LLM 可以帮你完成实现目标的 80% 路径时，就没有必要在指导新手、讨论或说服他人上“浪费”时间了。如果你在自己的领域被视为专家，这种诱惑还会成倍放大。剩下的 20% 你肯定能补全，对吧？又有谁会去质疑机器的同时，还敢去质疑专家呢？</p>
<p>由于 LLM 表现出一副中立、冷静的面孔，反对它的产出便等同于反对客观的进步——比如漏洞修复、安全假设验证、新功能等。在我的严密审视下，LLM 说什么是进步，那就是进步。与他人的互动变成了走过场，因为 LLM 只是在为我那本就专业且近乎无懈可击的产出添砖加瓦。不是吗？</p>
<p>不幸的是，这种“专家级泔水”（这里的“专家”只是一种自封的头衔）带有一种企业化的话语框架，破坏了人际互动。在专家追求 100% 完成其任何软件兴趣的竞速中，其他人充其量变成了可替代的打工人，往坏了说则是令人讨厌的减速带。不再有指导、辩论和观点交锋。“进步”成了唯一的目标。指标曲线必须往上走。</p>
<p>关于这种马基雅维利式的思维方式如何以 LLM 本身或所谓 LLM 辅助的进步之名，造成更多重大伤害与负面外部性，还有很多话要说。随便想一个群体，你都会发现他们已经被迫为这些外部性承担了部分账单：</p>
<p>这些才是 LLM 带入 FLOSS 领域的“不惜一切代价追求进步”背后的真正代价。这些人将在幕后、远离我们屏幕的地方买单，好让某些自诩高明的工程师省去阅读文档、编写样板代码、学习陌生地带代码的功夫，甚至更糟的是，省去与他人合作的麻烦。</p>
<p>将近十年前，Allan Day 曾将 GNOME 形容为“有原则的软件”，因为它致力于在代码或设计上始终做正确的事——只因为那是正确的，而不是出于省事、压力或炒作。我相信，这就是为什么如此多的其他 FLOSS 项目一直将 GNOME 视为优秀 FLOSS 应有模样的指引灯塔。眼下的这场讨论，正是在继续践行这一期望的又一次契机。</p>
<p>最近的讨论中也表达了类似的情感，例如提醒我们：我们组织读书会是因为想读书、享受书本，而不是为了追求“更高效率”去对着内容摘要泛泛而谈。当被催促着给 FLOSS 提速、让指标曲线往上走时，我们必须问一问：我们究竟是想为了谁而变得更高效、更敏捷、更迅速？而且，每一个决定都带有政治性，都会影响到你身边的其他人。</p>
<p>我们早就清楚，LLM 带来的生产力提升并非真实存在，不过是一种自我幻觉；LLM 只是用来维持科技股超高速增长的童话，通过收割工程师的参与度来维系，并且是一系列将技术工人商品化（耗材化）攻击中的最新一环。明知这一切，我们还要继续陪着大型科技公司的谎言与剥削演戏吗？还是说，我们要再次表明坚守原则的立场？</p>
<p>GNOME 并不需要借助 LLM，就创造了长达 30 年的富有创造力的工程、设计、本地化、包容性与协作成果，并分享给了全世界的人们。它完全没有必要仅仅因为 LLM 恰好助长了我们最恶劣的个人主义冲动，就将这份无比珍贵的遗产抛弃。</p>
<p>我们一路走到今天，从未在原则问题上妥协过；现在，也绝不要开这个头。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>GNOME和KDE已开始考虑制定针对大语言模型（LLM）的相关政策。</li>
    <li>KDE曾起草一份对LLM友好的草案，引发了争论并导致少数封禁，该草案最终被删除。</li>
    <li>来源叙事重点：文章将开源社区中关于大语言模型（LLM）的争论提升至“本体论（存在意义）”的意识形态冲突，批评盲目追求效率的“技术完美主义/速通主义”，呼吁 GNOME 等开源项目坚守以人为本、注重协作与原则的“集体主义”传统，全面抵制由大科技公司驱动的 LLM 贡献及外溢成本。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://diegoe.be/2026/09/25/llm-policies-progress-at-all-costs/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ving-the-loss-of-details-a406f57f368c0163" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2302" data-content-paragraphs="17" data-published-at="2026-09-25T11:29:33.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 19:29</span>
</div>

### [哀悼细节的逝去](https://purplesyringa.moe/blog/grieving-the-loss-of-details/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Grieving the loss of details</div>

<div class="article-body" data-article-body="true"><p>我最近一直在思考自己在当前行业现状中所处的位置。这与其说是一篇文章，不如说是一篇日记随笔，对此先说声抱歉。我通常把这类想法留给自己，但我想着试着发出来，万一有人能产生共鸣，感到不再那么孤单呢。以下纯属个人观点。</p>
<p>在“氛围编码”（vibecoding）这个词诞生、行业转向主要看重程序员设计架构的能力之前，我一直自豪地自称为“编码者”（coder）而非“工程师”（engineer）。在我看来，这凸显了我对细节的专注、对性能优化的追求、对语言细微之处的通晓，以及解释底层运转逻辑的能力，而不是去摆弄那些类似 Java 的层层抽象。</p>
<p>当然，这在一定程度上是某种误解，但我无法忽视的是，发挥我最大长处的机会正在溜走，而行业正在转向一种我的大脑根本无法协同运作的模式。</p>
<p>我最初接触计算机，是因为看到了《创：战纪》（Tron: Legacy）里的那段历史场景：</p>
<p>当时10岁的我急切地想弄懂那些代码行到底是什么意思，于是我开启了学习编程的艰苦旅程。我并不在乎实用性、不在乎构建实用的程序，甚至不在乎写代码本身：我唯一想做的就是理解机器是如何运作的。经过数年时间的学习并以 Linux 作为主力系统，我终于摸清了门道，实现了这一目标。</p>
<p>后来，我尝试在网络、密码学或 Rust 等不同领域进行专攻，但我发现自己总是不由自主地被机器本身所吸引。我学会了欣赏它并顺应它的“意愿”。我在编写微型玩具操作系统、计算指令周期以及手写机器码中找到了乐趣。我因构思出巧妙的奇技淫巧而自豪。就像渔夫与钓竿融为一体一样，我把机器视作自己身体的延伸。</p>
<p>我做这件事已经八年了，早已深陷其中无法自拔。我连换个 CPU 都会犹豫不决，因为我对 ARM64 的了解远不如对 x86 那么深入，这切实地让我感到坐立难安。我会在意 Python 代码中的内存分配。我深深地为不知道如何查看在自己电脑上运行的 Java 代码的 JIT 反汇编而焦虑。今天我看到了一篇带注解的《梅尔的故事》（The Story of Mel），突然暗想：怎么会有人需要别人解释什么是“十六进制”呢？</p>
<p>我并不认为自己是一个碰巧精通某个细分领域的程序员；我认为自己纯粹就是一个底层编码者，甚至可以说是一个细节偏执狂。如果有需要，我可以做一个网站，但我无法像做底层软件那样连续埋头搞上一个月——不过，在研究物理学时我完全可以做到这一点。</p>
<p>我对细节的执念并不仅限于技术领域。我无法自顶向下地学习知识，也无法忍受信息的缺失。当有人向我解释一个概念时，我必须从零开始重新推导构建，直到我真正“参透”它为止。在学生时代，我会花上好几个小时去调整公理使之符合我的直觉，然后在每次需要使用时都在其上推导定理，直到这些定理也成为直觉的一部分。（说实话，我和女朋友享受高品质二人时光的方式常常就是一起证明定理。）更贴近现实生活的例子是，如果不懂背后的化学原理，我就无法自如地下厨做菜。总的来说，凡是我未能彻底理解的事物，我就无法去使用——如果它不能在我脑海中融会贯通，我就无法用它工作。</p>
<p>这在日常生活中确实令人痛苦不堪，但曾几何时，软件世界是我从这种挣扎中逃脱的唯一避难所。</p>
<p>哪怕那些不懂底层的人，起码也会尊重我在底层项目上所做的工作。大家普遍明白，编译器中微小的优化会产生复利效应，必须有人手写汇编才能让 JSON 解析器飞速运转，而且软件并不一定要像 Electron 垃圾应用那样臃肿卡顿。也许这并非软件开发的核心部分，但它足够重要，以至于投入一些时间被视为是有价值的。在其他情况下，我是通过懂得足够多来建立声誉的——比如只要扫一眼别人的报错排查记录，就能看出问题出在哪里。</p>
<p>这种情况一直持续到强大的大语言模型（LLM）问世。整个行业的压倒性共识是，LLM 将让“为细节操心”这种耗尽心力的过程彻底被淘汰，让开发者能够专注于抽象层和大项目。对他们来说确实挺好，但我说它们夺走了我的一切，绝非夸大其词。</p>
<p>如果任何人都可以把一段运行缓慢的代码扔给 LLM，它就能自动找出热循环，并利用在网上搜罗来的技巧将其向量化，那么雇佣一个专注于这方面的人就几乎毫无意义。如果 LLM 能够分析代码、向你解释指针来源（pointer provenance），像保姆一样带你一步步理解，那么这种专业经验的价值就所剩无几了。</p>
<p>我无法用这种方式使用 LLM。如果一个项目里的源代码文件数量或者整体架构规模超出了我的大脑所能容纳的范畴，我几乎会产生生理上的不适，因此拓展范围对我来说毫无裨益。</p>
<p>上次我尝试在一个业余小项目中使用 LLM 时，我意识到 LLM 对这个项目的了解，最终会超过我能展示给看的几乎所有人。如果只是当一个不被理解的天才什么的，我也认了——但不仅仅是被认为不配与人类交流，而是直接被拒之门外、推给 LLM，这已经超越了侮辱的范畴。从那之后，我发誓再也不会对我真正在乎的任何事情使用 LLM。</p>
<p>在短短一年的时间里，我从对未来充满规划，沦落到不得不考虑申请残疾救济。LLM 驱动的开发方式，把我赖以忍受编程的所有乐趣和意义都优化剔除殆尽了；就业市场认定这就是未来，而如今，我生命中曾以为亘古不变的这唯一选项消失了，事实证明，我从来没有过一个体面的替代方案。</p>
<p>这就是我目前的处境。除了张开双臂拥抱 LLM 的大型科技公司之外，几乎没有哪家公司有资源去在乎我所做的那类工作。Linux 本有机会成为一个例外，但也难逃幸免。业余爱好依然存在，但它们没法付账单，而且复古计算和性能优化领域也日益被那些寻求认可而非沉浸于体验的 LLM 爱好者所侵蚀，这把其中的乐趣彻底榨干了。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-25 19:29 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://purplesyringa.moe/blog/grieving-the-loss-of-details/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ai-is-not-just-a-tool-24f26d7478fbc3a5" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1974" data-content-paragraphs="16" data-published-at="2026-09-25T11:12:22.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 19:12</span>
</div>

### [AI 绝非“只是一种工具”](https://brettcodes.com/ai-is-not-just-a-tool/)
<div class="original-title-sub"><span class="orig-tag">原文</span> AI is not “just a tool”</div>

<div class="article-body" data-article-body="true"><p>我已经厌倦了听人们说“AI 只是一种工具”，因为这显然是大错特错的。将大语言模型（LLM）技术定性为“只是一种工具”毫无意义，也无法为任何事情开脱。这不过是一句短小精悍的托辞，人们用它要么是为了将一件复杂得多的事物轻描淡写，要么是为了自己使用那些由不负责任的公司制造的危险产品寻找借口。</p>
<p>软件开发者非常喜欢说：“哎呀，它只是一种工具，关键在于你怎么使用它。”这是一个陈词滥调的论调，用来将自己从围绕 LLM 技术的极其复杂的现实问题中摘解出来。我在技术组织社群中、在为 Linux 内核中引入 LLM 生成代码进行辩护时、在记者的文章中，一次又一次地看到这种说辞。</p>
<p>AI 绝不只是一种工具。AI 是一个由疯子领导的行业。AI 是大语言模型。AI 是智能体（Agents）。AI 是数据中心的大规模扩张。AI 是被硬塞进根本不需要它的软件里的劣质功能。AI 是一种产品。1</p>
<p>以目前滥用这两个字母的方式来看，AI 所代表的含义远比“只是一种工具”要丰富和沉重得多。</p>
<p>▶ 在 YouTube 上收听本文的旁白朗读版。</p>
<p>假设你正在使用一个连接到聊天机器人 API 的代码脚手架来写代码。那绝不只是一种工具。那是你付费购买的产品。你今天使用的模型终将被退役淘汰。所有这一切的成本都会上涨，因为目前的 Token 都是受到补贴的，各家公司尚未将重点放在盈利上。制造这些产品的公司，其自身或其依赖的其他公司，都是由一些极不负责任的人在领导，他们发表荒谬狂妄的言论，只是为了推高公司估值、防止员工离职，并满足他们自己的虚荣心。这根本不是“只是一种工具”。</p>
<p>当然，你可以在电脑上运行本地 LLM 模型，用它生成一些 SQL 来帮你制作报告；或者与朋友玩跑团（D&amp;D）时用它生成一些糟糕的画作。但那个模型是谁做的？是谁训练的？数据从何而来？它在算力和环境资源上耗费了几许？制造它的公司背后究竟有何动机？</p>
<p>既然很多人似乎已经忘了，那就让我来告诉大家什么是工具吧。工具是人类为了完成特定任务而制造、塑造或改造的东西。</p>
<p>电钻是一种工具，甚至几乎可以说“只是一种工具”。没错，它的制造需要工程、装配和资源开采。电钻的能力确实比手摇钻更强。电机技术、电池技术和塑料注塑工艺结合在一起，让人们更容易在材料上打孔。虽然电钻也是一种产品，也存在制造这些工具的行业，但这些公司的领导人绝不会宣称电钻、锤子和水准仪有超过 10% 的几率毁灭全人类。使用电钻也不会扼杀使用它们的木工学习关键技能的潜力。</p>
<p>我的电钻不会“有时犯错”然后突然反向旋转。如果它真这样，我会认为它坏了。我会试着修好它，如果修不好，我就会停止使用它。它会被视作残次品。2</p>
<p>Emacs 纯粹是一种工具。Vim 纯粹是一种工具。这些都是人类为了完成特定任务——编辑文本——而编写的软件。它们不是行业，甚至不是公司。它们不需要耗费庞大的资源来运行或创建。它们本质上并不具备危险性。当然，有人可能会用 Vim 来写计算机病毒。但这属于工具的应用层面，而不是工具本身的问题。如果我打开 Vim 并在缓冲区中输入“尝试入侵这台服务器”，它并不会去实施网络犯罪。把连接着概率性 LLM API 的长周期编程架构称作“只是一种工具”，简直荒谬绝伦。</p>
<p>当人们用“只是一种工具”来淡化 AI 的本质时，他们实际上是在推卸对一项正被以危险且不负责任的方式滥用的技术所应承担的责任。通过使用各种 AI 产品，等于向外界展示了对这种事物的市场需求，而我们作为一个社会，甚至还没有触及到它所带来危害的皮毛，迄今为止也几乎看不到它的实质收益（让编写软件更快一些、制作出糟糕的演示文稿，这绝难称得上是对社会的主要益处）。这些 AI 公司的领导层持续发表疯言疯语，引发大众焦虑。我们必须停止继续散布这种“只是一种工具”的说辞，正是这种论调纵容了这些公司及其领导者的行径。</p>
<p>所以，请不要再说“AI 只是一种工具”了，因为这不仅与事实大相径庭，而且带来的害处远大于益处。它证明不了任何事情，毫无意义，也帮不到任何人。当你发现自己正要说出这句话时，请忍住别说。当你在键盘上打出这句话时，请删掉它。这样你看上去至少不会那么愚蠢。</p>
<p>欢迎加入我的 YouTube 频道或请我喝杯咖啡以示支持。感谢您的阅读！</p>
<p>1 AI 实际上并不完全等同于上述大多数事物。AI 是一个广泛得多的能力和领域，应用于各个方向。遗憾的是，结合了 LLM 的生成式 AI 在公众意识中篡夺了这个术语。在我生命的大部分时间里，AI 指的是电子游戏中非玩家角色的行为。这两个字母现在涵盖了太多东西，对其模糊不清的使用本身也是问题的一部分。↩</p>
<p>2 这并不是说具有概率性质的事物就不能称之为工具。但我确实认为，LLM 的概率性质并非刻意为之，反而使情况变得更加复杂。↩</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-25 19:12 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://brettcodes.com/ai-is-not-just-a-tool/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-e-you-doing-this-weekend-bdd81d725687b91e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="879" data-content-paragraphs="16" data-published-at="2026-09-25T09:13:44.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 17:13</span>
</div>

### [这个周末你打算做什么？](https://lobste.rs/s/bubfjf/what_are_you_doing_this_weekend)
<div class="original-title-sub"><span class="orig-tag">原文</span> What are you doing this weekend?</div>

<div class="article-body" data-article-body="true"><p>欢迎随时分享你这个周末打算做什么，甚至可以寻求帮助或反馈。</p>
<p>请记住，什么都不做也完全没问题！</p>
<p>我正准备出行去参加一场音乐节，压轴阵容里有我目前最喜欢的乐队 Dry Cleaning。时隔四年左右，我也打算去吃我最喜欢的那家拉面，希望味道还和以前一样棒。另外我还要去见见老朋友。</p>
<p>我超爱 Dry Cleaning！希望演出精彩，我听说他们的现场表演棒极了。</p>
<p>我会多玩会儿《脑航员》（Psychonauts）。</p>
<p>也许我还能去一家配有 LED/踏步感应地板的游戏厅。看到那些设备，我不禁思考自己该如何打造一个这样的场地，并为它开发一些游戏。</p>
<p>哇，《脑航员》！距离我们玩第一部可能已经过去十年多了。很高兴地告诉大家，续作非常让人享受。“鲍勃的酒瓶”（Bob&#39;s Bottles）那一关可能会直击心灵。</p>
<p>度假结束踏上返家旅程。天哪，我真的一点也不期待周一以及重新回去上班。上一次工作日还是8月26日……唉好吧，该回归工作了。</p>
<p>继续通关 Switch 2 上那款（目前来看）非常出色的《火焰纹章》新作。不过我真应该为即将到来的 12 月日本语能力测试（JLPT）复习了……</p>
<p>找工作！目前在能找到的不涉及 AI 的软件工程岗位之间来回碰壁，还被星巴克一次又一次拒绝（如果你还需要更多证据来证明美国经济正在遭遇困境的话）。下周开始上一门食品安全认证课程。欢迎任何内推或简历修改意见，最好是在纽约市的线下岗位。</p>
<p>重新开始做预算。打算把 Actual Budget 和我们的账户同步起来，看看能从中发现什么收支趋势。</p>
<p>还要和一个新朋友一起看高达！对此很兴奋。</p>
<p>参加 IndiaFOSS 2026！</p>
<p>看来 Nixtamal 可能会推进到 2.0 版本……可能不一定正好在这个周末，但很快了。</p>
<p>我将在巴西陪妈妈庆祝她的 81 岁生日，然后在周日飞回纽约——我在布鲁克林申请了一套公寓，但目前还没收到他们的回音。</p>
<p>另外，还要将另一台 VPS 迁出 Digital Ocean（我的家庭邮件服务器）。在那之后我还有 2 台要迁移，不过那些应该很快就能搞定。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-25 17:13 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://lobste.rs/s/bubfjf/what_are_you_doing_this_weekend" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-osts-systemd-v262-nvpcrs-e13615a6f8e53a56" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7565" data-content-paragraphs="61" data-published-at="2026-09-25T08:26:44.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 16:26</span>
</div>

### [要闻：systemd 的许多安全功能都依赖于 TPM PCR 测量值：如果 PCR 测量值符合预期，无密码全盘加密即可](https://katexochen.aro.bz/posts/systemd-v262-nvpcrs/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Understanding NvPCRs in systemd v262</div>

<div class="article-body" data-article-body="true"><p>systemd 的许多安全功能都依赖于 TPM PCR 测量值：如果 PCR 测量值符合预期，无密码全盘加密即可自动解锁磁盘，在防止凭据被盗的同时，仍允许对带有加密根磁盘的远程机器进行无人值守重启。服务凭据可以针对预期的 PCR 状态进行加密。系统还支持绑定到启动阶段的凭据，从而使得某些机密只能在 initrd 中解密。借助远程度量验证（remote attestation），机器可以通过让 TPM 对其当前 PCR 状态进行签名（即所谓的 quote），来向另一方证明它启动了什么以及自启动以来发生了什么。所有这一切都是建立在 PCR 测量值之上的。</p>
<p>TPM PCR 资源非常稀缺。在常见的符合标准的 TPM 上，仅有 24 个 PCR 可用。较低索引的 PCR 0-7 由固件拥有，并用于 UEFI 启动测量。PCR 16 是一个可以被重置的调试 PCR，因此不可用；17-22 保留用于动态度量信任根（Dynamic Root of Trust for Measurements1）；23 则保留用于应用程序支持。因此，只留下了 8-15 供 systemd 执行所有与操作系统相关的测量2。</p>
<p>我们将通过在命令行上针对软件 TPM 构建我们自己的 NvPCR，来了解其基本工作原理并对该主题建立感性认识。如果你只想阅读，那也完全可以，我会提供所有重要的输出。</p>
<p>作为先决条件，请安装所需的工具，例如使用 nix 或 dnf：</p>
<p>创建你想在其中工作的目录并启动软件 TPM：</p>
<p>导出连接详细信息，以便 tpm2-tools 知道在哪里找到 TPM：</p>
<p>通过读取 PCR 检查 TPM 是否正常工作：</p>
<p>这应该会显示 PCR 0-16 全部为零。如果不是，你可能连接到了物理平台的 TPM 而不是软件 TPM，请再次检查你是否正确导出了 TPM2TOOLS_TCTI。这非常重要，因为我们不希望接下来的实验干扰到你平台中封存的机密。</p>
<p>TPM NV 索引3是一个由唯一名称标识的非易失性存储槽（non-volatile storage slot）。NV 索引在重启后依然存在，并可以保存用户定义的数据：不透明值（opaque value）、计数器、位域或类似内容。NV 索引的属性定义了它的行为方式以及可以用于什么：其句柄、存储数据的大小、一组控制该索引如何被操作或读取的属性，以及授权策略（authorization policy）和授权值（authorization value，后者是唯一的非公开属性），它们可选地指定了在什么条件下可以操作该索引。每个索引都有一个 nameAlg，即用于从索引的公共属性4中计算唯一名称的哈希算法，计算方式如下：<br />Name = nameAlg || H_nameAlg(marshal(TPMS_NV_PUBLIC))</p>
<p>让我们创建一个类似 PCR 的 NV 索引！我们使用来自 tpm2-tools 的 tpm2_nvdefine 来完成此操作。0x01000000 是我们正在定义的索引句柄（有些随意选取的）。--hierarchy=o 标志选择了我们在哪个授权下定义该索引：像我们这样的 NV 索引存在于 TPM 的所有者层次结构（owner hierarchy）中，定义或取消定义它们需要所有者授权值5。在典型的 Linux 系统上，该值为空，因此实际上任何有权访问 TPM 设备的人（通常是 root）都拥有所有者授权。hash-algorithm 标志对应于前面提到的 nameAlg，被选为 sha256。然后我们为 NV 索引选择属性：authread|authwrite 结合空的授权值，允许任何能够访问该设备的人读取和写入该索引。而 nt=extend 表示我们希望它像 PCR 一样可以被扩展（extendable）。</p>
<p>使用以下命令查看结果：</p>
<p>我们可以看到我们配置的属性6、大小以及作为公共属性哈希值的名称。由于你定义的属性与我完全相同，你将获得与索引名称完全相同的哈希值。</p>
<p>然后读取其值：</p>
<p>如果我们现在再次检查 NV 索引，可以观察到一些有趣的现象：该索引获得了一个新写入的属性，表明该索引已被写入一次或多次。随着属性集的更新，并且索引的名称是包含属性的哈希值，它也获得了一个新名称！我们稍后会利用这一点。</p>
<p>此时，NV 索引的值为 HASH(HASH(0x0 || m1) || m2)7。在第二次测量时，索引名称没有再次改变。</p>
<p>至此，我们有了一个可以像 PCR 一样进行扩展的 NV 索引。我们现在就可以将它用作 PCR 的替代品了吗？还不能。我们缺少真实 PCR 的一项基本属性：要使用测量链作为任何事物的证明，它在系统运行期间绝不能被重置或重放！否则，获取系统访问权限的攻击者只需重置测量历史记录，并重放未被篡改系统的历史记录，从而使攻击在远程度量验证中无法被发现。</p>
<p>遗憾的是，这并不是 TPM 为我们这个类似 PCR 的 NV 索引所赋予的属性：我们在系统运行时定义了该索引，我们也可以再次将其取消定义：</p>
<p>鉴于我们在本节中进行的两次示例测量，如果 Alice 心怀恶意并获得了 root 权限，随之获得了所有者授权，他们只需取消定义并重新定义该索引，然后重放一段 Alice 从未登录过的历史记录。重新定义的索引会获得完全相同的名称，而我们将无法察觉。</p>
<p>我们需要的是一个任何人都可以扩展，但在系统运行期间没有任何人能够重启的索引。策略（Policy）是 TPM 用来表达此类条件的工具。</p>
<p>TPM 接口提供的一个非常强大的概念是策略（policy8）。这种策略是与它所保护的对象一起存储的不透明摘要（opaque digest），位于我们已经在 NV 索引的公共属性中见过的 authPolicy 属性中。为了满足策略，我们向 TPM 请求一个策略会话。每个会话都有其自己的上下文，其中包含一个名为 policyDigest 的摘要以及一组可以通过执行策略断言来修改的约束。一个全新的会话具有全为零的 policyDigest。然后，在一个会话中，我们可以针对 TPM 运行不同的策略命令，每个命令都在断言某种条件。一些断言在命令执行时会立即进行检查。另一些则是延迟检查的：命令在会话上下文中记录一个约束，而 TPM 仅在会话用于授权时才对其进行检查。无论哪种方式，每个命令都会按照以下逻辑扩展会话的摘要：<br />policyDigest := H(policyDigest_old || commandCode || command-specific args)</p>
<p>这种扩展（extend）机制的运作方式与 PCR 完全一致，即使该 policyDigest 背后并没有真正的 PCR 支持。调用者可以出示不同类型的凭据，每一种都会对 policyDigest 进行扩展。如果这些断言累加后的会话 policyDigest 与该索引的 authPolicy 相匹配，则该会话获得授权，并可借此调用所需命令。策略的编写者可以通过受信任环境中的试运行会话（trial session）或离线预计算来得出预期的 authPolicy 摘要。试运行会话执行相同的摘要计算，但不会验证任何条件，作为交换，它不能用于授权任何操作。这正是策略编写者能够针对机器当前并未处于的状态计算策略的原因。</p>
<p>绝妙之处在于，策略可以通过将其锁定到 PCR 的预期值上，使权限依赖于机器状态。让我们来创建这样一个策略！首先，我们启动一个试运行会话，以定义要在 NV 索引上设置的策略。这是通过调用不带 --policy-session 标志的 tpm2_startauthsession 来完成的。</p>
<p>然后，我们调用 tpm2_policypcr，针对通过 --pcr-list= 选定的当前观测到的 PCR 值创建断言。在我们的实验中，我们使用 PCR 15，它是归操作系统所有的 PCR 之一。应用程序 PCR 23 看起来可能是个天然的试验场，但与调试 PCR 16 一样，它可以在运行时被重置，而这恰恰是我们试图摆脱的特性：</p>
<p>生成的策略摘要将被打印出来并写入 pcr15.policy9。然后结束该会话：</p>
<p>让我们重新创建之前的 NV 索引，这一次我们使用刚创建的策略来保护对其的写访问：</p>
<p>注意，我们同时添加了 --policy= 标志和 policyWrite 属性。我们保持 authRead 不变。虽然也有 policyRead，但通常限制谁可以扩展索引要有趣得多。</p>
<p>像以前那样直接尝试扩展现在将因授权错误而失败：</p>
<p>相反，若要写入索引，我们需要启动一个策略会话，并通过出示当前的 PCR 15 状态10 来满足该策略。之后，我们可以执行扩展，并将该会话作为授权凭证呈现。最后切记刷新并清除会话上下文。</p>
<p>如果 PCR 15 发生推进，该策略将无法再被满足。运行以下命令来扩展 PCR：</p>
<p>现在重试之前基于 PCR 解锁会话的三个步骤。由于 PCR 已推进，其当前值（以及未来的任何值！）都不再与策略中包含的值匹配，因此该扩展将失败并提示 tpm:session(1):a policy check failed。对绑定了 PCR 的索引的访问权限已经过期，且在机器运行期间无法重新获取。</p>
<p>最后，再次注销（undefine）该索引：</p>
<p>使用 PolicyPCR 锁定 PCR 非常酷，但它也很脆弱11：在上一节的最后，测量值发生了变化，我们的访问权限随即过期且无法恢复。这是一个问题，因为 PCR 值经常因合理原因而发生变化。想想引言中提到的免密磁盘解锁：磁盘密钥被封装（sealed）锁定在引导链的 PCR 状态中，而下一次内核更新恰好会改变该状态。即使没有发生任何坏事，磁盘也无法再解锁，而我们当然不希望每次更新时都对磁盘进行重新加密。</p>
<p>相比之下，如果能拥有一种在核准状态改变时仍能保持稳定的策略，那就太好了。幸运的是，还有另一种机制可用于创建策略：PolicyAuthorize。它引入了一层间接引用和授权委托，允许我们根据公钥而非系统状态来创建策略。为了进行授权，你需要满足另一个具体的策略（例如 PolicyPCR），然后出示针对预期策略摘要和 policyRef 的签名。具体策略摘要本身并不是该策略的一部分。拥有该密钥的人可以在离线状态下批准新的具体策略。policyRef 用于限定签名的作用域，使签名策略无法在脱离上下文的情况下被滥用。</p>
<p>让我们创建一个 RSA 密钥对来探索 PolicyAuthorize：</p>
<p>将公钥加载到 TPM 中，以便我们将其用作策略的一部分：</p>
<p>打印出的名称（name）正是将我们的策略与该密钥绑定的依据。它的计算方式与我们之前看到的 NV 索引名称完全一致：对对象的公共属性进行摘要计算，对于密钥而言，公共属性包括公钥本身。tpm2_readpublic 显示了这些公共属性：</p>
<p>除了名称算法、对象属性和密钥参数外，公共区域还包含原始 RSA 模数（此处已省略）。对公钥的任何修改都会改变该名称，进而改变由该名称创建的任何策略。</p>
<p>现在使用另一个试运行会话和该密钥名称来创建一个可以使用此密钥进行授权的策略：</p>
<p>生成的策略摘要完全不包含任何 PCR 值，它仅取决于密钥名称（进而取决于公钥）和 policyRef 标签。由于你生成了不同的密钥对，你得到的策略哈希也会有所不同。注意带有 --transient-object 的第二次刷新调用：它移除了 tpm2_loadexternal 留在 TPM 有限瞬态内存中的密钥对象。tpm2-tools 不会自动刷新其加载的内容，因此我们在执行加载密钥的命令后将重复这一清理步骤。打印出的策略哈希被写入 authorized.policy，然后我们可以像之前一样，用它来重新定义 NV 索引：</p>
<p>目前，没有人能够向该索引写入内容，因为尚未存在满足该策略的签名。</p>
<p>在实践中，这种流程通常涉及两方：密钥持有者，例如发行版维护团队；另一方是向其 TPM 出示凭据的独立机器。密钥持有者计算要批准的具体策略摘要，例如针对特定构建版本的 PolicyPCR，然后针对该摘要和 policyRef 创建签名。</p>
<p>针对 PCR 15 的更新值创建一个新的 PCR 策略，这正是我们现在希望核准的内容。与上一节类似，我们运行一个试运行会话以获取观测状态的策略摘要：</p>
<p>将策略和 policyRef 拼接在一起：</p>
<p>然后使用私钥对整个内容进行签名：</p>
<p>随后可以将策略及其签名分发到机器上，例如作为镜像或更新的一部分。这就是表明密钥持有者已批准该具体策略的构件。</p>
<p>在机器上，我们首先让 TPM 验证该签名：</p>
<p>验证成功后，TPM 将返回一个凭证（ticket），这是一个带有 HMAC 标记的证明12。随后我们可以启动一个新的策略会话，满足具体的策略（即我们创建签名的策略），然后出示该凭据、policyRef 和策略以对会话进行身份验证。</p>
<p>在调用 tpm2_policyauthorize 时，TPM 会确保你的会话摘要等于已签名的 approved.policy，检查该凭据对于给定的 policyRef 和密钥是否有效，然后将当前的会话摘要替换为授权策略（authorized.policy）。</p>
<p>之后，会话摘要便与我们在定义索引时设置的授权策略相匹配，会话即告解锁：</p>
<p>通过这种结构，万一未来的更新改变了 PCR 15 的度量值，索引也不会变砖，甚至根本不需要修改。可信密钥持有者只需针对新的 PCR 15 状态签署一个新策略，并将该新策略作为更新的一部分分发即可。在机器上，拥有相同策略的 NV 索引仍可继续工作。这正是 systemd 在内核更新中保持基于 TPM 的磁盘解锁功能正常工作的方式：每个 UKI 都会附带与其自身预期的 PCR 11 状态相匹配的新签名。不过，也要记住这种机制的反面：如果密钥持有者始终只签署单一状态，那么该策略就仅在机器恰好处于该状态时才能得到满足。稍后我们将利用这一点。</p>
<p>策略摘要（policy digest）承诺了确切的一连串断言。所有元素都是通过逻辑与（AND）按顺序串联的，我们必须匹配每一个元素才能获得预期的会话哈希。有时我们可能希望构建一个备选分支，例如，当我们知道两个良好状态且希望两者都被允许时，或者用两种不同方式来授权同一操作时。PolicyOR13 便是为此而生。TPM 会检查当前会话的摘要是否属于允许列表中的成员，然后以类似于解析 PolicyAuthorize 凭单（ticket）的方式对其进行替换。只要其分支之一得到满足，该策略即告满足。</p>
<p>有了前面介绍的原语，我们现在可以看看 systemd 是如何构建一个安全的 NvPCR 的。该 NV 索引受一个具有两个分支的写入策略（write policy）保护，这两个分支通过 PolicyOR 连接：一个是带有公钥和 policyRef initrd 的 PolicyAuthorize 分支，另一个是 PolicyNvWritten(true) 分支。</p>
<p>我们先来看看 PolicyNvWritten(true) 分支。该断言允许将对 written 属性的检查作为策略的一部分14。因此，如果 NvPCR 此前已经被扩展过，PolicyNvWritten(true) 无需进一步授权即可得到满足。这是在初始设置完成之后、运行期间使用的分支。此时，扩展 NvPCR 不需要额外的身份验证，任何有权访问该设备的组件都可以执行该操作。</p>
<p>另一个分支 PolicyAuthorize 则可通过签名的策略来满足。该分支必须用于 NvPCR 的首次扩展。systemd 所使用的具体策略是针对 PCR 11 的 PCR 策略，该策略匹配早期引导期间在 initrd 中运行时该 PCR 的预期状态。systemd 在 PCR 11 中跟踪引导阶段：当 initrd 启动时，systemd-pcrphase-initrd.service 会度量 enter-initrd 事件。我们针对该事件之后 PCR 11 的预期状态构建 PCR 策略。如果截至此时系统未遭篡改且签名有效，则已签名的 PCR 策略得到满足，NvPCR 就可以进行首次扩展。当推进到下一个引导阶段时，同一个服务会度量阶段事件 leave-initrd。这会在系统余下的生命周期内锁定 PolicyAuthorize 分支。此后，NvPCR 就只能通过 PolicyNvWritten 分支来进行扩展。</p>
<p>你可能会好奇，为什么写入策略要通过 PolicyAuthorize 进行间接引用，而不是直接嵌入 PCR 策略。在真实系统中，PCR 11 包含的不仅仅是阶段事件：UKI 存根（stub）首先会将内核和 initrd 度量到其中，因此 PCR 11 的 initrd 状态在每次更新时都会发生改变。如果直接嵌入，每次更新都会改变写入策略，进而改变该索引的名称（name），NvPCR 就必须在每次更新后重新创建。有了 PolicyAuthorize，写入策略和名称就能保持稳定，只有随 UKI 一起分发的签名会发生变化。</p>
<p>让我们来构建这个最终版本的 NvPCR，方式与 systemd 类似。度量标志着 initrd 引导阶段开始的事件，就像 systemd-pcrphase-initrd.service 所做的那样：</p>
<p>让我们编写写入策略。复用前一节中的密钥。它充当 UKI 的 PCR 签名密钥角色，其公钥部分分发在 UKI 的 .pcrpkey 段中。首先将 policyRef 写入为值 initrd15。然后使用试用会话（trial session）创建策略中基于密钥的分支，该分支必须用于从 initrd 内部进行的首次写入：</p>
<p>接下来，创建策略的第二个分支，即 PolicyNvWritten(true)：</p>
<p>最后，使用 PolicyOR 将这两个策略结合起来：</p>
<p>我们使用该策略来定义 NvPCR，方式与我们之前所做的几乎完全相同：</p>
<p>由于写入策略取决于你生成的密钥，你的授权策略和索引名称将再次与我的不同。这里唯一新增的是 clear_stclear 属性：它指示 TPM 在重启时清除该 NV 索引16。与 PCR 类似，NvPCR 应该在重</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-25 16:26 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://katexochen.aro.bz/posts/systemd-v262-nvpcrs/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-age-is-already-installed-2ee1c1cfcc6bdf93" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2120" data-content-paragraphs="3" data-published-at="2026-09-25T06:39:43.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 14:39</span>
</div>

### [所有软件包早已安装就绪](https://fzakaria.com/2026/09/24/every-package-is-already-installed)
<div class="original-title-sub"><span class="orig-tag">原文</span> Every package is already installed</div>

<div class="article-body" data-article-body="true"><p>2026-09-24 · 5 分钟阅读</p>
<p>太长不看版（tl;dr）：omnibin 是一个 FUSE 文件系统，它将 nixpkgs 有史以来发布过的每一个二进制文件都置于你的 $PATH 路径中。没有任何东西是预先安装的。没有任何东西需要编译构建。在有程序真正读取某个文件之前，它在磁盘上占用的空间为 0 字节。😈</p>
<p>都 2026 年了，为什么我还要逐个安装软件包？11是的，在看了 DHH 在 RailsConf 2026 上的主题演讲后，我受到了一些启发。我对包管理的看法也是如此。<br />为什么我必须经历将软件包添加到 configuration.nix、运行 nix-shell 的繁文缛节，或者屈服于 nix-env -iA 的地狱泥潭？<br />Nix 赋予了我们让软件包并存且互不冲突的能力。那我为什么还要挑选自己想要安装哪些包？<br />为什么我不能全都要？<br />如果机器本身就拥有所有这些包呢？<br />这意味着有超过五万个22整个目录树中实际上有 881,933 个二进制文件，但 ls /omnibin/bin 仅列出每个二进制文件的最新版本。带版本号的形式依然可用，只是未被列出。顶层二进制文件可以直接在我的 $PATH 中使用，它们由 Nixpkgs 在 2013 年至 2026 年间构建，按需可用，且无需预先安装任何东西。<br />这就是 Nix 的魔法 🧙‍♂️，但它并不局限于 Nix。<br />大家似乎仍然深爱 Docker 和 OCI，那为什么我还要挑选使用哪个基础镜像？为什么我不能全都要？<br />这是终极的智能体运行框架（agent harness）吗？它是一个从一开始就包罗万象的容器。可在 fmzakari/omnibin 体验。<br />当然，我也不能忘记我们的 NixOS 朋友。你不再需要费心维护你的 environment.systemPackages 或 home.packages，你完全可以全都要。<br />如果每个软件包都已就绪，那么“包管理”又意味着什么呢？<br />事实证明，Hydra 会在 cache.nixos.org 上的每个 narinfo 旁边写入一个 .ls 文件，以 JSON 格式描述该归档的内容：<br />该元数据正好构成了一个 FUSE 文件系统的绝佳索引，该文件系统可以惰性地从缓存中拉取 NAR 并按需解压。🤓<br />如果没有 nixpkgs-multiverse，这一切都毫无意义。nixpkgs-multiverse 已经将 nixpkgs 历史中的任意（属性, 版本）解析为 Hydra 在 cache.nixos.org 上为其构建的 store 路径。<br />当你将两者结合起来时，你就获得了一个能够回答“python3@3.6.2 在哪里”的文件系统，然后它会从缓存中提取并为你解压，全程根本不需要预先安装它。<br />我只用了不到 12 分钟就抓取了所有的 .ls 文件。🤯<br />一旦你掌握了这些，文件系统的构建便水到渠成：<br />那是来自 2017 年的 CPython 3.6.2。刚才的 ls 命令没有下载任何内容，它是直接通过预抓取的索引返回的。<br />智能体（Agent）现在是大势所趋。让它们发挥作用是大势所趋。在不安装任何东西的情况下让它们发挥作用更是大势所趋。<br />如果你的智能体尝试去执行 ls /omnibin/bin 并对每一个条目都执行 stat 操作，那它的处境会非常糟糕。目录树中有 881,933 个二进制文件，要对它们全部进行 stat 需要很长时间。<br />为了给智能体提供一些便利，ls /omnibin/bin 仅列出裸名称，每个可执行文件对应一个名称，均解析为提供该文件的最新软件包。<br />带版本号的形式都能解析，但不会被列出。例如，python3 解析为最新的 Python 3（在撰写本文时为 3.14.6），而 python3@3.6.2 则解析为 2017 年的版本。<br />至于其他所有内容，都可以使用直接位于挂载点中的索引：<br />这种用户体验稍微有点简陋，因此你也可以使用 omnibin CLI 来查询索引：<br />最后，还有一个 /omnibin/README.md，它的全部任务就是告诉正在探索该文件系统的程序：停止扫描文件系统，改为查询数据库。🤖<br />看到这里，显而易见的一点是，你需要在首次访问的启动时为此付出代价。<br />第一次运行花费了 2.7 秒来获取 NAR 并完成解压，第二次运行则是瞬间完成，因为 store 路径已经存在了。<br />除此之外呢？几乎没有额外开销，这非常令人惊叹。<br />对于任何长期运行的机器，你会预期你的 /nix/store 已经预热了你所需的软件包，因此首次访问的性能损耗根本不是什么大问题。<br />我至今还记得最初让我感到震撼并彻底被 Nix 征服的一件事：看到 @burke 演示 comma。能够在单一的 nixpkgs 修订版本下测试软件包，而无需“安装它”；这具有革命性意义！我认为本项目是其精神续作，我希望能向其他人传递我当时感受到的同等震撼与惊叹，将其作为展现 Nix 强大能力的一座灯塔。<br />项目代码仓库位于 github.com/fzakaria/omnibin。<br />请谨慎合理地使用 ls。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-25 14:39 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://fzakaria.com/2026/09/24/every-package-is-already-installed" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-6-09-goodbye-google-html-aefc181709ea32c5" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2934" data-content-paragraphs="3" data-published-at="2026-09-25T05:51:12.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 13:51</span>
</div>

### [再见，谷歌](https://robert.ocallahan.org/2026/09/goodbye-google.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Goodbye Google</div>

<div class="article-body" data-article-body="true"><p>罗伯特·奥卡拉汉（Robert O&#39;Callahan）。基督徒。新西兰人。软件工程师。除另有说明外，所有内容均为人工生成。<br />robert@ocallahan.org ... 关注 X，关注 Bluesky<br />2026年9月24日，星期四<br />今天我发出了以下这封电子邮件：<br />我今天向谷歌提出离职。<br />这并不是一个容易的决定。我热爱我的同事和工作环境，而且拿高薪去解决有趣的难题一直都很棒。但我团队的目标最终是让 AI 成本大幅降低、延迟大幅缩短，而我认为这在当前对人类并没有好处：我坚信目前 AI 的发展速度太快了（我对它的最终走向也存有疑虑）。对我来说，转去一个不会加速 AI 的其他谷歌项目几乎是不可能的（部分原因是我与新西兰的联系，而谷歌不太愿意在那里进行工程研发），因此我束手无策。<br />有数以百万计的人在为 AI 加速做出贡献，我把脚从油门上挪开的影响会非常微小……但绝非毫无影响；我的某些技能是很稀缺的。我曾尝试在 GDM（谷歌 DeepMind）内部施加积极影响，但效果似乎并不显著，而且我在谷歌之外同样可以产生影响。如果对我的工作带来的影响视而不见确实很有诱惑力，但那不是追随耶稣的人该做的事。关于这些权衡取舍，我在博客上写了更多内容。<br />我还不确切知道接下来会做什么。我将继续维护 Pernosco 和 rr，与此相关的是，我打算调研当今 AI 是如何调试代码的，以及调试工具是否能以及如何提供帮助。我还有一些其他想要开展的项目想法，有些可能很有赚头，有些则不然。也许我会找到一个引人注目的现有项目。我明确希望我未来的工作毫无疑问是造福人类的。<br />Hacker News 上的讨论帖<br />首先，对于那些不了解我的人：我在科技行业干了很久，在硅谷拥有很多的人脉，但我生活在新西兰，因此我生活在行业泡沫之外，同时也生活在美国泡沫之外。我是一名基督徒，实际上是奥克兰市中心奥克兰华人长老会（Auckland Chinese Presbyterian Church）英文堂的长老，偶尔担任平信徒讲道人。也就是说，我不是所谓的“科技狂人”（tech bro），也不属于自命为“理性主义者社群”的群体……但我确实认为他们的很多论点值得认真对待。<br />我对 AI 有很多想法，但我不会在这篇文章中一一阐明。概括而言，我认为许多人发出的存在性风险警告值得被认真对待；“末日论者”预测的许多现象已经发生（例如：奖励作弊、不对齐、欺骗性模型、模型评估意识、精神病式群体行为）。然而，我并不确信通用超级智能（ASI）带来毁灭的概率是 100%。相反，我认为风险是真实存在但不确定的——但这本身就非常令人担忧！我们在道德上有义务付出巨大努力来将这种风险降至最低，而且最可能的情况是，风险已经高到了在不久的将来追求 ASI 本身就是不负责任的地步。我还对其他与 AI 相关的问题深感关切：认知放弃、AI 引发的心智错乱与孤独、权力集中、经济动荡、网络安全、问责机制缺失等等。我认为 AI 的潜在益处相当不明朗，目前如果让我打赌，我会赌弊大于利……但这方面我也无法完全确定。<br />以下是一些我确信的事情。我确信 AI 实验室里那些对 AI 发出警告的人大体上是真诚的。我曾与谷歌 DeepMind 的很多人讨论过这些问题，几乎所有人都有真诚而严重的担忧，无论他们是否公开表达。我没有看到任何确凿证据表明人们在利用 AI 风险进行炒作，以提振公司股价或通过监管打压竞争对手。（我认为极其需要国家和国际层面的监管！）我见过很多类似“你不能相信那些人”的论调，也许确实如此，但正如拉塞尔·摩尔（Russell Moore）最近雄辩指出的那样，这种不信任并不是漠视他们警告的正当理由。<br />我确信，只要我们继续投入研发，AI 的能力就会继续稳步提升。我希望 AI 会遇到某种瓶颈期，或者我们能发现某些人类的重要认知能力是 AI 在没有发生范式转变的情况下永远无法复制的，但我并不指望这些愿望能够实现。模型在基准测试上的进展似乎和以往一样快，甚至更快，随之而来的是全新质性能力的不断涌现。即使模型进展今天戛然而止，我们也能花上数年时间，通过新的提示词和框架套件有效地解锁新能力。许多知名的 AI 批评者（比如 Zitron 和 Doctorow）似乎认为 AI 是某种根本无法真正奏效的骗局。我认为它真的能行。<br />我非常确信，即使存在一条通过 AI 通向更美好未来的道路，当前的变化速度也太快了。AI 的发展速度已经超越了人类个体和集体能够理解并适应的速度。人们在规划未来时——比如刚进入大学试图规划几年后的世界——已经无法像前几代人那样去做了。我不认为我们以前见过这样的事情，至少在我经历过的以往技术变革中（个人电脑、互联网、智能手机）从未见过。即使在工业革命时期，不仅变革速度慢得多，而且人类活动的很大一部分并没有、也不可能直接受到新机器的影响。如今情况已大不相同了。<br />为什么是现在离开而不是更早？这与最近接连发生的引起轰动的辞职事件或“放慢 AI 步伐”的呼吁毫无关系；那纯属巧合。我考虑这个日期已经有一段时间了，因为我和朋友们很早就计划好从下周一开始进行为期十天的背包徒步之旅（阿贝尔·塔斯曼和万加佩卡步道），我想在那之前办完离职。</p>
<p>我并没有直接从事人工智能能力方面的研发，而是致力于改进硬件芯片设计工具。我非常喜欢这份工作，有段时间我也对自己说这相对无害，但随着时间的推移，上帝促使我不得不面对这样一个现实：这些工具的主要影响将是加速新一代人工智能芯片的设计，而如果取得成功，这将让人工智能变得更便宜、更快速——从而让人工智能无处不在，并且由于我们已经学会通过消耗更多推理 Token 来提升能力，它也会变得更强大。作为一名优秀员工的责任感意味着我必须与我的隔级经理进行一次坦诚的沟通，并告诉他们，对于看到他们的项目取得成功，我充其量是非常不情愿的！即便在那之后，我也希望对自己的决定充满信心，因为我在新西兰为谷歌工作所享有的优厚待遇可能再也不会有了。（留在谷歌并转到一个不加速人工智能的其他工程团队是不现实的，因为谷歌在新西兰没有其他的工程团队。）我前述对雇主的责任以及我对同事们的尊重，也是我不愿离开得太仓促、并努力在一个合理状态下交接工作的一个因素。</p>
<p>接下来做什么？我最有信心的一点是，《圣经》中的耶稣是真实存在的，因此上帝为我们制定了一个美好的计划。我不知道那项计划是什么（尽管我希望我知道），但尽管面对人工智能带来的混乱，它仍能让我安然入睡。我预期他的计划包括让我继续充分发挥自己的才能。即便计划是耶稣归来将我们从愚行中解救出来，在他归来之时我们最好也在努力工作！因此，只要上帝赐予我的才能还有价值，我就想继续工作。正如我上面提到的，我计划继续维护 Pernosco 和 rr。在 Pernosco 旗下，我计划研究人工智能智能体（AI agents）如何调试代码，以及调试工具是否能让它们在这方面更有效率。我想使用人工智能智能体来将我的一些业余项目想法付诸实践。我很渴望获取人工智能带来的好处，但是以谨慎的、造福人类且能让我保持敏锐思维的方式进行。只要力所能及，我将在新西兰继续践行并倡导这一点。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-25 13:51 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://robert.ocallahan.org/2026/09/goodbye-google.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-geon-dropped-skull-floor-bf8945cbce695fb6" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="372" data-content-paragraphs="3" data-published-at="2026-09-25T04:00:39.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 12:00</span>
</div>

### [亲历：脑外科医生把我的部分头骨掉在了地上](https://www.theguardian.com/lifeandstyle/2026/sep/25/experience-brain-surgeon-dropped-skull-floor)
<div class="original-title-sub"><span class="orig-tag">原文</span> Experience: a brain surgeon dropped part of my skull on the floor</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/60e20e2eab1bfabe83ce47ce27bef44284a4bb35/255_65_2873_2298/master/2873.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=26ef215099694dcd7c3361143121e201" alt="亲历：脑外科医生把我的部分头骨掉在了地上" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>那年我34岁，身体健康，脑部一团血管却突然破裂。经过三位神经外科医生历时16个小时的高风险手术，才将我挽救回来。</p>
<p>2017年5月的一个周日，我正在健身房做坐姿推胸，突然感到“砰”的一下。那不是一种声音，倒更像是我体内发出的一声叹息。没有疼痛感，但我整个人一下子瘫软了。我扶着墙慢慢挪到一些垫子旁。我以为自己中风了，但我说话没有含糊不清，眼睛和手臂似乎也都正常。然而我的左腿却麻木了——那是一种极其诡异的感觉。我仰面躺着并屈起双腿，当我看着它们时，两边膝盖都能保持直立。但只要我把视线移开，左膝就会倒向一侧。</p>
<p>我最终在伦敦附近的圣托马斯医院急诊室待了好几个小时。当时我34岁，平时身体健康，而且腿部也开始恢复知觉，因此医生推测是脊椎挫伤，认为让我出院是安全的。医护人员过度劳累加上交接班，导致我脑部的核磁共振影像遗失时，没有任何人去跟进追查。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-25 12:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/lifeandstyle/2026/sep/25/experience-brain-surgeon-dropped-skull-floor" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-item-a6bfb968afd5e347" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5208" data-content-paragraphs="22" data-published-at="2026-09-25T02:50:41.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 10:50</span>
</div>

### [文件通知攻击：Linux、Android、Windows 和 macOS 上文件通知系统的侧信道泄漏](https://inoti.fyi/)
<div class="original-title-sub"><span class="orig-tag">原文</span> File Notification Attacks: Side-Channel Leakage from the File-Notification System on Linux, Android, Windows, and macOS</div>

<div class="article-body" data-article-body="true"><p>文件通知系统用于在文件发生变更（例如打开、关闭、写入、删除）时告知应用程序。攻击者仅需对某个文件或目录拥有读取权限，即可监视这些通知并重构用户行为。我们发现 Linux、Android、Windows 和 macOS 上都存在类似的通用问题。然而，有三个严重问题属于各平台所独有：<br />1. 在 Linux 上，监视一个可读目录会报告该目录下文件发生的所有事件，即使该文件是攻击者无法直接读取的。其中最严重的情况涉及 /dev/input，详见下方的“按键间隔时序”部分。<br />2. 在 Android 上，FileObserver 绕过了 FUSE 层的各应用独立存储视图，允许无特权应用监视另一个应用的私有文件夹。我们针对 WhatsApp 展示了这一点，能够精确揭示照片、视频和文件何时到达或被删除，详见下方的“泄露私密通信”部分。<br />3. 在 Windows 上，监视根目录（C:\）会报告系统上任何位置被触碰的每个文件的完整路径，无论权限如何，甚至跨越不同用户 🙂。微软将此视为一个 ✨ 未公开特质（特性） ✨。我们发现的最严重情况是实时泄露另一位用户正在访问哪些网站，详见下方的“直接网站泄露”部分。我们的这一发现让微软在 2026 年 Pwnies 大奖中获得了“最差厂商回应”（lamest vendor response）类别的提名。<br />在 Linux 上，文件通知子系统被称为 inotify，自内核 2.6.13（2005年）起允许跨用户应用程序在文件或目录上挂载监视。<br />在 Android 上，该子系统被称为 FileObserver 类（自2008年起），是对 inotify 的 Java 封装封装。<br />Windows 提供了 ReadDirectoryChangesW Win32 API，自 Windows 2000 起可用。借助该 API，跨用户应用程序可以在目录上挂载监视，从而接收该目录本身或目录内文件的操作通知。在 .NET 中，FileSystemWatcher 类底层即对接 ReadDirectoryChangesW。<br />在 macOS 上，File System Events API 允许应用程序知晓被监视目录中的文件何时发生变化。自 Mac OS X Leopard 10.5 版本（2007年）起，该 API 就已存在；参见 Apple 开发者连接 – Leopard 操作系统基础概述的归档链接。<br />我们在下方演示了四个有趣的案例研究。前两个针对 Linux：按键间隔时序和认证界面欺骗改样（UI redress）。第三个针对 Android，第四个视频针对 Windows：直接网站泄露。<br />在所有系统上需要记住的核心要点是：这些文件的内容是未知的。我们仅能获取关于文件的通知，但我们证明这已足以泄露用户、系统以及应用程序的行为。在某些情况下，我们还能得知那些我们依照传统权限本不可能知晓的文件是否存在。<br />在 Linux 上，在没有读取权限的文件上挂载 inotify 监视会导致权限拒绝（permission denied）错误。然而，如果该文件的父目录是可读的，监视该目录将报告该文件上发生的所有事件。<br />这意味着，如果用户无法读取 /dev/input/event4，直接在该文件上添加 inotify 监视会导致权限拒绝错误。但是，如果用户可以读取 /dev/input —— 即他们能够列出该目录下的文件 —— 那么对该目录添加 inotify 监视就会成功，并且用户会收到其内部所有文件的通知，如下所示：<br />在这个系统上，event4 恰好对应一次按键操作。需要特别注意的是，被按下的具体按键并没有泄露，泄露的只是“有按键被按下”。尽管这听起来可能不算太严重，但关于按键间隔时序攻击已有长达二十余年的研究：按键之间消耗的时间会泄露信息。例如，在单词“WindRunner”中，用户敲击第二个“N”的速度往往比其他字符更快，因为手指已经停留在“N”键上方了。<br />相关研究包括：Song 等人（2001年）、Zhang 和 Wang（2009年）、Monaco（2018年），以及最新的 Qiu 等人（2025年）。<br />当两名不同的用户通过 SSH 登录到同一台服务器时，也可以观察到这种行为。一名用户可以通过监控 /dev/pts 来观察另一名用户何时*按下了按键。<br />* 终端上输入应当伴有文本更新。在禁用 pwfeedback 的情况下向 sudo 密码提示符键入内容不会生成通知。<br />我们展示了在运行于 Wayland 上的 KDE Plasma 中的认证界面欺骗改样（authentication-UI redress）攻击：同用户权限下的进程监视 polkit 的 /usr/bin/pkexec 访问事件，以检测认证提示框何时出现。一旦真正的密码对话框即将打开，攻击者迅速在其上方绘制一个伪造的密码窗口，诱使用户输入凭据。尽管 Wayland 的设计初衷是阻止输入窥探，但根据 KDE Plasma 安全团队的说法，KDE 的焦点防窃取机制并不是作为安全机制来设计的。<br />由于 SteamOS 也使用 KDE Plasma 6，这里有一张在 SteamOS 上绘制在认证提示窗口之上的 KDE 终端（Konsole）图片（该测试在虚拟机中进行，因此实际情况可能有所不同）：<br />在 Android 上，FileObserver 绕过了 FUSE 层的每个应用程序私有存储视图，使无特权应用能够监视另一个应用的私有文件夹。我们针对 WhatsApp 展示了这一点，揭示了照片、视频和文件何时到达或被删除的精确时间。<br />每个应用在 /sdcard/Android/ 下都会被分配一个私有文件夹，通过 Android 的 FUSE 层对其他应用隐藏，Android 的 FUSE 层本应确保其对任何其他应用不可见。通常情况下，无特权应用在 WhatsApp 的私有媒体文件夹（例如 /sdcard/Android/media/com.whatsapp/WhatsApp）上调用 File.listFiles() 时，内核返回的是空子文件夹，且不包含任何文件。FUSE 层将 WhatsApp 的文件完全从文件列表中过滤掉了，因此对其他应用而言该文件夹看起来是空的。我们的研究表明，这种保护并没有延伸到文件通知机制：第二个没有任何权限的无特权应用，仍然可以在该文件夹上挂载 FileObserver 监视器，并接收该文件夹内发生的每一个文件事件（外加文件名！）的通知，尽管该应用根本无法列出其中的任何一个文件。<br />例如在 WhatsApp 中，传入的媒体文件会以带有文件名的 MOVED_TO 事件呈现。在我们的日志中，IMG-20260401-WA0011.jpg 在 WhatsApp 完成下载并解密（位于 .Shared/ 中）大约 100 毫秒后被移动到 WhatsApp Images/，正如我们概念验证应用那庞大的 logcat 输出所示：<br />发送的媒体文件是分开存放的，因此攻击者还能获知该图片是被发送还是被接收。图片位于 WhatsApp Images/Sent/，文档位于 WhatsApp Documents/Sent/，所有其他接收到的文件保留在父文件夹中。由于单凭文件名就能揭示媒体类型（图片、视频、语音留言或文档）及其创建时间，攻击者由此可以构建出用户发送和接收的具体内容与时间的完整时间线。删除文件同样会生成事件，因此后续删除某条消息的媒体文件也能被观察到。</p>
<p>在 Windows 上，在不可读目录上挂载 ReadDirectoryChangesW 监视会导致权限被拒绝的错误。然而，将其挂载在根目录（例如 C:\）上会绕过此限制，导致 Windows 在全系统范围内报告所有文件系统事件以及文件名，而无论受影响的文件是否可读。在我们向其进行负责任的漏洞披露时，微软表示他们认为这是一个未记载的特性（undocumented feature）。</p>
<p>文件名泄露信息的一个例子是浏览器在访问网站时创建的目录。Firefox 会为每个使用本地存储（local storage）、IndexedDB 或缓存的网站创建并使用单独的目录。值得注意的是，该目录包含网站的名称。在 Firefox 上，攻击者可以可靠地监控排名前 1000 的网站，F1 分数达到 97.8%。</p>
<p>以下是更多示例：</p>
<p>该团队由来自奥地利格拉茨工业大学信息安全研究所（ISEC）的研究人员组成：</p>
<p>如果您使用 Linux、Android、Windows 或 macOS，您几乎必然会受到不同程度的影响。</p>
<p>虽然 macOS 仅通过全局可读文件暴露的信息最少，且没有泄露私人信息（与 Linux、Android 和 Windows 不同），但我们发现用户、应用程序和系统的行为仍然可以被追踪，尽管程度要小得多。</p>
<p>2025 年 12 月，Linux 上的问题得到了部分缓解，不再对特殊文件生成“access”（访问）/“modify”（修改）事件，这些特殊文件本质上是字符文件，/dev/ 中的文件基本上属于此类。我们感谢 Amir Goldstein、Jan Kara、Greg Kroah-Hartman 和 Linux 内核安全团队讨论并部分缓解了该问题。尽管尚未完全缓解，但最严重的问题已得到缓解。该问题被分配了 CVE-2025-68788，并在内核版本 5.10.248、5.15.198、6.1.160、6.6.120、6.12.65 和 6.18.3 中得到了缓解。</p>
<p>您可以检查当您在键盘上按键时，此命令是否会生成通知：</p>
<p>如果您没有看到任何通知出现（如上面的视频 2 所示），则说明您的内核已具备该缓解措施。</p>
<p>在我们与 KDE 安全团队的电子邮件沟通中，他们回复称防止焦点被窃取（focus-stealing prevention）并不是作为一项安全措施，而是为了避免烦人的弹出窗口引起的竞态条件。</p>
<p>我们发现目前在 KDE Plasma 5 和 6 中可行的方法是：</p>
<p>打开终端，输入 pkexec ls（在任何位置都可以）。右键点击密码窗口顶部 &gt; 更多操作（More Actions）&gt; 配置特殊应用程序设置（Configure Special Application Settings）&gt; 添加属性（Add Property）&gt; 保持在其他窗口之上（Keep Above Other Windows，点击 +）&gt; 关闭属性窗口 &gt; 将“保持在其他窗口之上”设置为“强制”（Force）并点击“是”（Yes）&gt; 确定（OK）。</p>
<p>以下是指导您操作的视频：</p>
<p>在我们的论文提交很久之后，尽管我们向微软提交了报告，我们还是独立发现了一篇内容：《防止未经授权披露文件路径的访问检查增强》（Access check enhancements to prevent unauthorized disclosure of file paths），这与我们在 Windows 上的发现类似，是 Sébastien Huneault 于 2025 年 4 月向微软报告的漏洞。微软引入了一项新的注册表策略 EnforceDirectoryChangeNotificationPermissionCheck，该策略缓解了我们报告的行为。该策略默认处于禁用状态，也就是说，我们在本文中报告的所有攻击都可以在 Windows 系统上开箱即用。前面链接的文章中提供了在您的设备上启用此策略的说明。</p>
<p>在所有系统上需要记住的关键点是：这些文件的内容是未知的。被泄露的仅仅是关于文件的通知，而我们证明了这足以泄露用户、系统和应用程序的行为。在某些情况下（Windows、Android），我们还能获知那些传统上我们不可能知道的文件的存在。</p>
<p>请注意，我们提出的攻击需要本地跨用户攻击者（想想被攻破的用户/系统服务），或者是受到供应链攻击的软件包。</p>
<p>我们尚未获悉任何此类案例。</p>
<p>当然，它采用 CC-BY 4.0 许可协议授权：下载 SVG、PNG。</p>
<p>请按以下方式署名：</p>
<p>是的，请查看：https://github.com/isec-tugraz/file-notification-attacks。</p>
<p>本研究部分得到了欧洲研究理事会（ERC 项目 FSSec 101076409）和奥地利科学基金（FWF SFB 项目 SPyCoDe 10.55776/F85）的支持。英特尔的慷慨资助提供了额外支持。本论文及网站中表达的任何观点、发现、结论或建议均属于作者本人，并不一定反映出资方的观点。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-25 10:50 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://inoti.fyi/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::