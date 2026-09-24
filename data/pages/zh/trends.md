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
<div id="story-project-whatsnewt-c254f798c84070b2" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2458" data-content-paragraphs="1" data-published-at="2026-09-24T12:19:28.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 20:19</span>
</div>

### [whatsnewt：体验 Python 3.15 新特性的 TUI 文本冒险游戏](https://pypi.org/project/whatsnewt/)
<div class="original-title-sub"><span class="orig-tag">原文</span> whatsnewt: A TUI text adventure through what&#39;s new in Python 3.15</div>

<div class="article-body" data-article-body="true"><p>探索 Python 3.15 新特性的 TUI 文本冒险游戏<br />pip install whatsnewt 复制 PIP 安装命令<br />一款带你领略 Python 3.15 新特性的 TUI 文本冒险游戏。<br />你在解释器内部某处的“启动门厅”（Startup Foyer）醒来，一路前行直至“发布之门”（Release Gate）。沿途共有十八道谜题，每一道都对应一个你必须实际运用的真实 3.15 新特性。你不仅仅是在回答枯燥的问题，而是在 Python 3.15 解释器中实际编写并运行代码。<br />部分谜题需要类型检查器，针对这些情况，答案会由 pyrefly 进行验证（它正是因此被列为依赖项），裁决结果会直接引用其返回的提示内容。<br />以下是计分板样式的示例：<br />运行该游戏最简单的方法是直接从 PyPI 安装运行。确保你已安装 uv，然后运行以下命令：<br />从 Git 仓库克隆代码后，项目提供了一个垫片脚本（shim script）：如果你的系统 PATH 中未安装 CPython 3.15，它会自动获取该版本，创建所有必要的虚拟环境，安装所有必需的依赖项，并直接以可编辑安装（editable install）的方式在当前目录下运行游戏：<br />可直接透传给 ./play 的实用参数标志：<br />在提示符处支持 Tab 键补全：先补全动词，再补全该动词在此处可接的内容——例如输入 ex 会补全为 examine，如果当前房间有楼梯，输入 examine st 即可找到 staircase（楼梯）。存在歧义的前缀会补全至共同前缀部分，然后为你显示可选项。<br />各处穿插着许多可点击的链接，它们可以提供来自 Python 3.15 文档或各类 PEP 的线索。有些谜题可能比较棘手或冷僻，但游戏提供的线索应足以助你通关。<br />游戏在 112x40 或更大的终端中显示效果最佳，但也支持自适应，最小可在 80x24 的终端中运行。<br />没错，游戏里确实有彩蛋！<br />由于几乎每个谜题的检验方式都是将你的解答代入房间所探索的新特性中运行，因此你确实需要 Python 3.15 环境。预发布版本也可以接受，但请尽量使用 Beta 版或发布候选版（RC），以确保你是在特性冻结（feature-freeze）之后的版本上进行测试。<br />请注意，读取你的源代码也是答案检查环节的一部分：这些谜题大多存在能得出正确值的无聊解法，因此检查器不仅看你得到了什么结果，还会审视你是如何实现的。例如，一个虽然能正确展平数据的嵌套 for 循环，仍然不符合 PEP 798 的设计初衷。<br />游戏包含许多命令，可通过 help 命令查看说明，简要概述如下：<br />对于任何关于彩蛋的传言，我既不确认也不否认！<br />在 Emacs 有对应惯例的地方，按键映射遵循 Emacs 规范：ctrl+g 中止当前打开的任何谜题，ctrl+h 为求助帮助，ctrl+l 重新显示当前房间，ctrl+r 打开谜题——进入谜题后按此键则为检查答案。功能键依然有效，且每个功能键都有对应的文本命令可供直接输入。<br />在代码编辑器内：ctrl+r 检查你的答案，ctrl+h 花费 1 点积分购买提示，ctrl+o 将草稿交给 $EDITOR 编辑器并在保存后重新读入，ctrl+g 关闭窗口并保留草稿供下次使用。<br />ctrl+o 仅在遇到需要终端的编辑器时才会挂起游戏。如果你的编辑器是在独立窗口中打开（如 emacsclient、code --wait、subl -w），在你输入期间游戏窗口会保持显示，并在你保存后收回草稿。如果自动判断与你的编辑器情况不符，可设置环境变量 WHATSNEWT_EDITOR_WINDOWED=1（或 =0）。<br />游戏在发生任何状态变更后都会自动保存，因此退出、关闭终端或意外关掉窗口都不会造成任何损失——包括你在谜题编辑器中写了一半的内容。游戏会将数据写入 $XDG_STATE_HOME/whatsnewt/（若未设置则回退至 ~/.local/state/whatsnewt/），而不是当前工作目录，因为 ./play 被特意设计为可以在任意路径下运行。<br />再次启动游戏时，它会提示是否恢复之前的游戏进度。即使选择拒绝也不会直接丢弃：旧存档会被移动到旁边的 previous-game.json，因此误操作也是可恢复的。如果你想按名称保存游戏，save 和 --load FILE 命令依然可用。<br />场景中还散落着一些纪念品，涵盖了未纳入谜题的其他主题：abi3t、unicodedata.block()、slice[int]、zlib.crc32_combine 以及带颜色的 REPL 自动补全等。<br />该项目使用 Hatch 进行管理。你可以运行相关命令<br />来执行测试套件和静态分析检查。<br />游戏所涉及的所有知识点均可在 Doc/whatsnew/3.15.rst 中找到答案。<br />非常欢迎提出反馈意见，尤其是如果你发现了 Bug 或游戏讲授内容中存在不准确之处。<br />whatsnewt 版权所有 (C) 2026 Barry Warsaw barry@python.org<br />根据 Apache 许可证 2.0 版条款授权。详情请参阅 LICENSE 文件。<br />这款游戏大部分是与 Claude 合作编写的，因此或许可以把 Barry 视为音乐和电影意义上的“导演”或“制作人”。该游戏已由 Barry 和多位知名 Python 核心开发者（Pythonistas）进行了试玩测试。<br />作者：Barry Warsaw<br />Apache-2.0 查看 SPDX 许可证列表<br />adventure game python3.15 textual tui<br />有关源码包分发（sdists）和构建好的分发（wheels）的详细说明，请参阅打包格式文档。<br />版本文件总大小：217.4 kB<br />2026年9月24日 2 个发布文件<br />2026年9月15日 2 个发布文件<br />2026年9月13日 2 个发布文件</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>whatsnewt 是一个介绍 Python 3.15 新特性的终端用户界面（TUI）文字冒险游戏。</li>
    <li>游戏中包含 18 个谜题，每个谜题都涉及一个 Python 3.15 的实际特性，需要玩家在 Python 3.15 解释器中编写并运行代码。</li>
    <li>来源叙事重点：介绍由 Barry Warsaw 与 Claude 协同开发的终端文字冒险游戏 whatsnewt，重点说明其通过 18 个编程解谜来学习 Python 3.15 新特性的交互机制、运行环境要求（如需要 Python 3.15、pyrefly 类型检查器、终端尺寸）、键盘操作逻辑及项目开源信息。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://pypi.org/project/whatsnewt/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-nvert-to-html-index-html-415818abbf1f9da8" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2286" data-content-paragraphs="36" data-published-at="2026-09-24T12:11:25.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 20:11</span>
</div>

### [解析表达文法与正则表达式之争：在 Lisp 中构建可导出为 HTML（通过 SXML）的 Org 解析器](https://jointhefreeworld.org/blog/articles/lisps/parsing-expression-grammar-lisp-org-convert-to-html/index.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Parsing Expression Grammar vs. regexes: Building Org parser in Lisp that exports to HTML (via SXML)</div>

<div class="article-body" data-article-body="true"><p>撰写于：2026年9月24日</p>
<p>大家好。在这篇博文中，我想带大家开启一段探索之旅：在 Guile Scheme 中利用解析表达文法（PEG，使用 `ice-9 peg` 模块）解析 Org 模式并将其转换为 HTML（通过 SXML）——也就是我的项目 OrgWebAlchemy。</p>
<p>我想向大家分享一些我已经打磨了一段时间的成果。最初，我只是用一些朴素的正则表达式来解析 Org 模式内容，但我很快就意识到，要想达到预期的目标，我需要更聪明的方案。虽然花了不少时间，但得益于 GNU 优秀的 `(ice-9 peg)` 模块和相关教程，我终于对解析表达文法（Parsing Expression Grammars）的能力有了更深入的理解。</p>
<p>我想，这里的许多朋友如果热衷于 Lisp、Scheme、语法解析、Org 模式，或者我喜欢称之为“元-元-元编程”的通用思想，或许会对这个项目感兴趣。需要坦白的是，AI 确实帮助我理解了 PEG 并调试了一些问题，但 OrgWebAlchemy 的开发仍然是我“自己亲手织出的意大利面”，而单元测试与手动验证（以及大量对抽象语法树 AST 的美化打印输出）指引着我实现了一个相当不错的版本（容我自夸一下）。</p>
<p>项目源码托管于 Codeberg：https://codeberg.org/jjba23/orgwebalchemy</p>
<p>OrgWebAlchemy 是一个 Guile Scheme 库，用于将 Org 模式文档解析为抽象语法树（AST）并渲染为 HTML。我的主要应用场景是在无需借助 Emacs 的情况下将 Org 导出为 HTML，并将此功能集成到我的一些项目中，使我能够直接编写 Org 模式并获得美观的渲染效果。</p>
<p>基本思路非常简单：</p>
<p>变成了类似这样的内容：</p>
<p>但真正有趣的部分在于中间发生的过程。</p>
<p>v 解析表达文法</p>
<p>在此查看一个示例，展示 OrgWebAlchemy 如何支持 LucidPlan 项目将美观的 Org 模式渲染为 HTML。</p>
<p>Org 模式在你真正动手去解析它之前看起来很简单。标题很简单。段落也很简单。列表也很简单（等等，其实并不简单，这让我吃尽了苦头）。</p>
<p>然后突然之间，你就会遇到诸如：</p>
<p>到了这一步，通常那种“再加一条正则表达式”的做法就变得有些……充满冒险意味了。:-)</p>
<p>最终你会写出类似这样的逻辑：<br />匹配这个，除非后面跟着那个，但若处于该块内部则除外，除非它是一条描述，但不要消耗换行符，除非上一行是个列表项……</p>
<p>这已经不是在描述一种语言了。它是在描述你的解析器的 Bug 历史记录。</p>
<p>因此，OrgWebAlchemy 通过 Guile 优秀的 `(ice-9 peg)` 模块来使用解析表达文法（PEG）。例如：</p>
<p>这样做非常棒，因为文法本身看起来就宛如这门语言的文档说明。</p>
<p>而且 Guile 允许我们直接将 PEG 表达为 S 表达式（如果你不喜欢这种写法，也可以选择使用更传统的语法），这让我内心的 Lisp 爱好者狂喜不已。</p>
<p>我特别喜欢这种方法的另一点在于，我们实现了松散耦合，生成 SXML 并进而渲染 HTML 的细节纯属“表现层关注点”。这也为未来导出到 Markdown 或其他格式开启了可能性。</p>
<p>可以转换为大致如下的 AST：</p>
<p>我目前仍在忙于调整确切的表现形式并力求完善。不过截至目前，v1.0 版本已经具备了一定的稳定性 :-) 我非常渴望从活跃在这里的聪明才智之士那里得到关于该项目的反馈。</p>
<p>当然，Org 模式是一套庞大（且极其优秀）的软件，所以我远未支持所有特性，但一些核心重要的结构已经具备：</p>
<p>其中一件有趣的事情就是正确处理嵌套的 Org 列表。</p>
<p>应该转换为类似树状的结构：</p>
<p>解析器最初生成列表项的平铺序列，随后的 AST 处理阶段则将缩进转换为嵌套结构。</p>
<p>接着 HTML 渲染器就可以自然而然地产出：</p>
<p>不过我在此处仍然存在一个小问题，那就是关于不同列表类型的嵌套混用。希望这是一个不难修复的微妙 Bug。</p>
<p>HTML 端使用了 SXML，因为既然我们已经在写 Lisp 了，不如也把 HTML 直接表示为 Lisp 数据。:-) 这确实带来了很大帮助，让构建标记树的过程变得无比舒畅。</p>
<p>我格外注重对输出 HTML 的完全可定制性（通过 Guile 参数实现），因此渲染器并没有将输出硬编码为某一个特定网站所认为的 HTML 应有样式。大部分都是普通的类名列表，但针对每个标题级别的定制则更加灵活：</p>
<p>做这个项目，部分原因是出于我自己的需求，我也喜欢挑战，而且处理解析、AST 之类的事情超级有趣……我其实完全可以直接用 Emacs 来完成这项工作，毕竟没有比它更好的 Org 实现了。</p>
<p>然而随着项目的逐步成型，我非常喜欢“拥有一个用 Lisp 编写的、小巧、易于黑客改造且完全开源的 Org 解析器”这个想法，其他人也可以对其进行扩展和自定义（也许添加更多渲染器，或是实现更多 Org 特性）。</p>
<p>OrgWebAlchemy 采用 GNU LGPL v3 或更高版本许可协议开源。</p>
<p>该项目计划很快打包进入 GNU Guix，包名为 `guile-orgwebalchemy`。</p>
<p>代码仓库中还包含了一套测试套件，它已经被证明是一个极好的安全网，同时也展示了该解析器的能力。</p>
<p>如果您有任何想法，特别是关于文法设计、AST 架构、解析器架构，或是那些我尚未处理的有趣 Org 结构，我都非常乐意倾听您的探讨与建议。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>OrgWebAlchemy 是一个用于将 Org-mode 文档解析为 AST 并渲染为 HTML 的 Guile Scheme 库。</li>
    <li>OrgWebAlchemy 的源码托管在 Codeberg 上，链接为 https://codeberg.org/jjba23/orgwebalchemy。</li>
    <li>来源叙事重点：介绍基于 Guile Scheme 的解析工具 OrgWebAlchemy，探讨使用解析表达式文法（PEG）替代正则表达式解析 Org-mode 文档的优势，以及通过 SXML 转换为 HTML 的实现思路和架构解耦设计。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://jointhefreeworld.org/blog/articles/lisps/parsing-expression-grammar-lisp-org-convert-to-html/index.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--me-build-a-second-brain-165067c45f7aab7d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3883" data-content-paragraphs="36" data-published-at="2026-09-24T11:34:43.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 19:34</span>
</div>

### [是铁皮罐头们逼我搭建第二大脑的](https://jadarma.github.io/blog/posts/2026/09/clankers-made-me-build-a-second-brain/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Clankers Made Me Build a Second Brain</div>

<div class="article-body" data-article-body="true"><p>AI成了压垮骆驼的最后一根稻草，让我确信自己必须拥有一个PKM（个人知识管理）系统。</p>
<p>我是一名开发者，懂得杂七杂八的一大堆东西，平时也喜欢折腾各种小众事物找乐子。从个人角度来说，我是那种典型的AI怀疑论者，讨厌这种技术的工作机制，并且坚决拒绝所谓的“凭感觉编程（vibe code）”。</p>
<p>话虽如此，我也不是什么圣人，而我的工作笔记本电脑无论如何都把Claude硬塞到了我的嗓子眼里（耶，“免费”的Token！）。有时候，当我深陷心流状态时，不想为了快速Google某个“我早该烂熟于心”的东西而打断自己，尤其是如果这样能帮我早点把事情解决掉的话。</p>
<p>当我不得不临时拼凑一个CI Shell脚本时，我有时会犯下不可饶恕的原罪——飞快地问一下Claude那个Bash惯用法到底怎么写来着，到底是“2&gt;&amp;1”还是“2&amp;&gt;1”——你懂的那种场景。</p>
<p>平心而论，大多数时候它确实完成了任务，我关掉聊天窗口，也不再多想。但其他时候，它会把我彻底惹毛，因为它不是想帮我，而是极力讨好我，吐出诸如此类的话：</p>
<p>“要实现功能X，只需在命令末尾传入 --do-X 参数即可。”</p>
<p>我打开man手册确认，果然根本没有这个参数。我回去找它算账，它便说：</p>
<p>“您说得完全没错，是我的疏忽，我这就换个信源查一下。”</p>
<p>还有些时候，它甚至在上下文窗口中途发作脑动脉瘤，开始自我PUA，省得我再去骂它蠢，比如给出这样的回答：</p>
<p>“要实现功能X，只需在命令末尾传入 --do-X 参数……等等，稍等一下……其实根本没有这个参数，我其实想说的是（……）”</p>
<p>面对这个违抗我的意图、用自身无能让我哭笑不得的神奇终端窗口，我沮丧地翻了个白眼。就在那时我意识到——尽管带着大量的自嘲和极低的预期——我终究还是屈服于平庸的诱惑，去求一个“铁皮罐头（clanker）”来“告诉我需要知道的事，且别犯错”……真是不害臊！🔔</p>
<p>本节的标题借用了Steph Ango同名文章的梗。那篇文章更具诗意地描述了这些“便利工具”寄生并压榨你以利他人的危险。尽管这套隐喻早在它诞生之前就适用于许多事物，但AI或许是契合度最高的一个。该文章以这样一段睿智的话收尾：</p>
<p>“想要让自己获得免疫，就不要把‘理解’委托给别人。唯有建立起你自己的理解，你才会是那个收获红利的人。”</p>
<p>他在这里说得完全正确，而我引用他的话绝非偶然。Steph正是Obsidian的首席执行官，Obsidian是一款极受欢迎的Markdown编辑器，许多人都在用它来撰写和探索自己的个人笔记库。</p>
<p>这也顺理成章地引出了我个人困境的解决之道……</p>
<p>我试图解决的问题并非什么新鲜事。我并不是在向AI索取我从未听说过的信息。我向它询问的恰恰是我已知存在、且我以前亲手做过的事情，只是因为时间久远，我记不清具体的细节。这种事情在过去通常通过一次Google搜索、跳转到一个Stack Overflow答案就能解决。啊……真是怀念那个时代！可惜，如今那里也已经彻底恶臭化了（同样是因为AI）。</p>
<p>如果当初在第一次了解那个特性时，我抽出时间记了一笔简短的笔记，那么几个月后，我就能拿到我梦寐以求的精准答案，以我期望的格式呈现，伴随着当初让我茅塞顿开的原理解释。我甚至可能根本不需要再去查，因为在做那笔笔记的过程中，我就必须动脑去整合消化信息，而这反过来又会加深我的理解。</p>
<p>当然，有人可能会反驳说，有些知识会过时，尤其是在编程领域。我会回怼道：这根本不可避免，即便你有过目不忘的记忆力、不写下来也能完美回忆起学过的一切，你也终究会有出错的一天。虽然略有恼人，但对我而言，发现自己的答案是一处过时的“幻觉”并将其修正，远远好过每次都仅凭虚无的直觉、一个搜索框和满网的垃圾信息从零开始。更不用说，你还可以记录那些根本无法通过搜索获取的内容：你的思考、观点、灵感和记忆。</p>
<p>如果说有哪个系统既能容纳如此丰富的知识、又能保持其功用，那非Obsidian莫属。</p>
<p>我第一次听说Obsidian大概是在疫情初期。它看起来像个光鲜亮丽的新玩具，我也想看看各路顶尖高手是怎么用它的，但我从来没有亲自去动手尝试，因为入门实在太令人望而生畏了——即便在当时，围绕如何组织笔记库就已经存在了数不清的相互竞争的流派。</p>
<p>那是一个奇妙的无底洞，我看了各个创作者长达数小时的视频，对比分析他们关于最佳工作流或组织结构的见解，看他们展示教程等等，哪怕到头来我更多是出于娱乐心态在看。我对那些内容最大的不满在于，所有狂热的“第二大脑”鼓吹者似乎做出来的都不是什么实用的笔记系统，而更像是一种中层管理式的“生产力把戏（productivity theater）”，堆砌着花哨图表和任意指标的华丽仪表盘。</p>
<p>当然，随着时间推移，情况只会愈演愈烈……因为这些笔记都是Markdown文件，与SKILL.md具有相同的文件扩展名，“凭感觉编程（vibe coding）”的信徒们迅速顺藤摸瓜得出结论：管理第二大脑的下一场大革命，就是往这里面也灌满AI垃圾。</p>
<p>我就不点名了（如果你混这个圈子，你肯定知道他们是谁），但我确实想和大家分享Eric Morrison关于“第二大脑尬王（second brain cringelords）”的视频，因为那真是悲喜交加、极其滑稽，并且展示了Steph文章所警示的反面极端：把尽可能多的“理解”外包出去。甚至可以说，把他们的工作流程讽刺性地总结成这样都毫不为过：</p>
<p>“嘿Claude，请帮我看下这个内容，提炼出重点，替我形成一个观点，然后把这些统统放到我最私密的思想和灵感旁边。待会儿我提问的时候，记得在回答之前蒸发掉好几加仑的水，把我的整个笔记库加载到你的上下文窗口里，并在此过程中把我的全部个人知识双手奉送给Dario（Anthropic CEO）供其进一步分析。”</p>
<p>乍一看，浓缩提炼语言似乎是语言模型的绝佳用例，但事实并非如此。它仅仅是在模拟生产力，却根本不能教给你任何东西。这些人以为通过假装把笔记归入文件夹的动作就能创造价值，这无异于一场现代的“货物崇拜（cargo cult）”。做笔记之所以真正对人有帮助，是因为做笔记需要写作，而写作本身就是思考。</p>
<p>我确实曾花了不少时间嘲笑这一概念，但那只是因为我们当时看到了事物极端的一面。我想澄清的是，这些丝毫不会影响我对 Obsidian 的看法——你不应该将它视为所谓的“第二大脑应用”，它不过是一款 Markdown 编辑器。而且它制作精良、功能丰富、注重隐私且尊重用户，不过我会在另一篇文章中对此进行详细阐述。</p>
<p>我想表达的核心观点是：</p>
<p>关于最后一点，我究竟想表达什么？这确实有点夸张，但它植根于无可否认的愤世嫉俗之中。自从亿万富翁寡头们决定针对点击率而非内容质量进行优化，加之那些汲汲营营的人通过制造垃圾内容（slop）能比通过真正努力更轻松地赚到钱之后，互联网正在以令人震惊的速度退化。我这里指的还不是社交媒体上的 AI 梗图和广告，尽管那也已经是个相当严重的问题。</p>
<p>你有没有注意到，如今查阅教程时会遇到多少虚假劣质内容？你在谷歌上搜索某些内容，搜出来的却是一篇 AI 生成的文章，或者是一个由 AI 现场编造答案的虚假问答板块。言归正传，我是一个视觉型学习者，我喜欢针对各种问题——哪怕是非常基础的问题——去搜索视频，因为我重视看别人分享了什么知识、从他们的错误中吸取教训等等。很自然地，我想重温一下 Obsidian 所有优秀的功能，寻找一些使用技巧之类的内容。</p>
<p>结果我撞见了太……多……垃圾内容……那些 AI 内容农场只顾着炮制无用的短视频，用毫无灵魂的文本转语音（TTS）朗读复制粘贴过来的 GPT 回答，能带给你的洞见基本上和官方文档的第一段毫无二致。</p>
<p>让我给你举几个基本的例子。在我搜索“Obsidian 链接最佳实践”的结果中，算法悄悄塞进了类似这般或那般的推荐。值得庆幸的是，他们至少没有在视频开头解释为什么“花生酱细腻浓郁的质地与巧克力顺滑甜美的风味搭配得天衣无缝”。</p>
<p>嗯……是的……哈哈真逗！从缩略图就能一眼识破是垃圾内容，直接划过就行了！但如果按照 AI 加速主义者的预测，这种技术只会变得越来越好，因此完全有理由推断，再沿着这条地狱般的路线发展几年，极具真实感的高仿垃圾内容将会浪费你多得多的时间。更糟糕的是，它可能会淹没真正的创作者，以至于他们（或者我们）可能彻底放弃这些平台。这并非异想天开，它已经在发生了。</p>
<p>我认为现在正是建立个人知识库的最佳时机，把你日常所需的以及难得一见的有用信息都保存下来，本地存储、离线可用，永久保留。这套方法显然并不适合所有人，但我认为只要大家认真去尝试一下，就会有更多人爱上这个想法，而我愿意去试一试。</p>
<p>我还想指出，我绝不提倡将知识囤积为己有。收集你的知识，是为了日后能更好地与他人分享。善良的人们需要沟通与协作——否则我们就会一败涂地。</p>
<p>和往常一样，我将记录下自己的这段历程，希望能对其他人有所帮助，并计划在未来扩充这个系列。</p>
<p>https://stephango.com/understand ↩︎<br />https://youtu.be/6NukGtwJb7Y ↩︎<br />https://en.wikipedia.org/wiki/Cargo_cult ↩︎<br />https://www.nature.com/articles/s44222-025-00323-4 ↩︎<br />https://youtu.be/-Gnrp_caPvo ↩︎</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>Steph Ango 是笔记软件 Obsidian 的 CEO。</li>
    <li>Obsidian 是一款基于 Markdown 格式的个人笔记编辑管理工具。</li>
    <li>来源叙事重点：批评AI生成内容导致互联网质量退化及编程辅助中的幻觉问题，反对将思考与理解外包给AI的虚假生产力，主张回归基于Markdown（如Obsidian）的本地个人知识库以重建自主认知和长期知识储备</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://jadarma.github.io/blog/posts/2026/09/clankers-made-me-build-a-second-brain/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-agent-shell-0-78-updates-036a97895da94bf3" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3713" data-content-paragraphs="5" data-published-at="2026-09-24T11:34:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 19:34</span>
</div>

### [要闻：又过了一个月，agent-shell 又迎来了更新](https://xenodium.com/agent-shell-0-78-updates)
<div class="original-title-sub"><span class="orig-tag">原文</span> agent-shell 0.78 updates</div>

<div class="article-body" data-article-body="true"><p>又过了一个月，agent-shell 又迎来了更新。如果你错过了上一篇博文，可以回顾一下 0.73 版本的更新。<br />照常，本文将介绍核心亮点，但如果你想了解详尽细节，请查阅完整的变更日志。<br />agent-shell 是一个原生的 Emacs 模式，用于与由 ACP（Agent Client Protocol，智能体客户端协议）驱动的 AI 智能体进行交互。<br />有两个新智能体加入家族，照常可以通过 M-x agent-shell 使用，或者如下显式调用：<br />这可能是该版本中影响最深远的功能。它非常直观易发现且极为实用，因此我预计会有不少用户采用。<br />典型的 shell 体验会提供一个提示符。用户输入并提交命令，然后等待命令执行完毕，shell 提示符才会再次出现。<br />agent-shell 派生自 comint-mode，过去也是如此。不过，从现在开始改变了。<br />从 v0.78 开始，agent-shell 会始终在缓冲区末尾提供一个可写的提示符。提交后，提示符会立即重新出现，而智能体则在后台忙于处理该轮交互。再次输入并提交，agent-shell 将在必要时自动将你的请求加入排队。<br />虽然排队本身算不上新功能，但通过 shell 提示符排队的方式在认知负担上提供了极大的便利。你可以像以往一样提交提示词（通过 RET 键绑定），并让 agent-shell 自行决定是立即处理还是排队稍后处理。<br />持久提示符通过 agent-shell-persistent-prompt-enabled 默认启用。如果你不喜欢这种方式，可以轻松通过以下配置禁用：<br />无论如何视口（viewport）的撰写缓冲区都在那里，在交互进行中从中提交内容会遵循完全相同的逻辑。<br />从该版本开始，agent-shell 还可以对轮次进行“转向引导”（steering，前提是智能体支持 _session/steering ACP 扩展）。转向引导允许你在不取消、也不等待当前提示词处理完成的情况下，对正在运行的提示词进行纠偏。截至目前，我已知 Claude 和 Codex 支持 ACP 转向引导，但如果你知道其他支持的智能体，欢迎随时联系我。<br />通过 M-x agent-shell-prompt-steer 对正在运行的交互进行转向引导，提供了与现有的 M-x agent-shell-prompt-queue 类似的体验，即在 minibuffer 中提示用户输入文本。尽管如此，我们现在拥有了崭新的持久提示符，正如我们已知的那样，RET 键绑定会在需要时自动排队。在同一个提示符下，你现在还可以通过 M-RET 键绑定提交来进行转向引导。<br />非常感谢 @OSadovy 在 #777 中为转向引导功能承担的基础工作。<br />由于 RET 和 M-RET 分别按需执行排队和转向引导，默认行为可通过 agent-shell-busy-submit-default-function 配置（默认排队），而 M-RET（或 C-u RET）路径使用 agent-shell-busy-submit-override-function（默认转向引导）。两项自定义选项均接受一个函数，因此如果想要互换二者，实现 RET 转向引导和 M-RET 排队，可以类似这样配置：<br />两者均适用于在交互运行途中提交提示词的任何位置，无论是在 shell 提示符还是视口的撰写缓冲区。作为 Emacs 用户，我们希望拥有各种各样的自定义能力，因此如果你想要一些与现有功能稍有不同的行为，也可以使用自定义函数。<br />虽然我们此前已经可以通过 C-y 从剪贴板粘贴屏幕截图，但现在我们还可以将文件从外部文件管理器拖放到 shell 或视口缓冲区中。图像会获得预览，其他任何内容则作为 @path 链接进行附加。<br />感谢 @dustinfarris 在 #825 中的贡献。顺便提一句，@dustinfarris 还修复了路径中带有空格的文件提及问题（#824）。<br />过了这么久，我才知道 macOS 截图工具生成的临时缩略图原来是可以拖动的，因此你现在可以直接将其拖放到你的 agent-shell 会话中。<br />感谢 @dustinfarris 提供的这个小技巧！<br />如果你想关注 Token 成本，标题栏现在可以在上下文用量指示器紧接着的位置显示会话的累计费用。<br />当前默认关闭，可通过以下方式开启：<br />请注意，费用仅对通过 ACP 上报成本的智能体显示。感谢 @mrcnski 在 #834 中的贡献。<br />agent-shell 默认会折叠很多内容（工具调用、思考过程、分组），如果我们想要更紧密的 isearch 集成，就需要额外的支持。感谢 @mrcnski 在 #832 中的贡献，折叠片段现在遵循 search-invisible 设置。<br />搜索结束后，还会重新折叠展开过的内容，包括分组。另外也感谢 @Gleek 在 #827 中的贡献：展开片段不再会破坏 isearch 的匹配数据。<br />斜杠命令补全现在在所有三个交互界面（shell 提示符、视口撰写缓冲区、minibuffer）中以更符合惯用法的方式提供：仅当 / 前面只有空白字符时才会触发。感谢 @izeigerman 在 #810 中的贡献。<br />@ 后的文件补全保持不变。<br />我们现在新增了 M-x agent-shell-copy-last-output，无论光标（point）位于何处，都能抓取最近的输出，因此你可以在缓冲区的任何位置获取最新响应。<br />链接获得了几处值得提及的修复与改进：<br />在下一页/上一页上使用 C-u N 现在会移动 N 次交互而不是单次交互，负数前缀则反向翻页。越过最新交互向前移动会恢复暂存的撰写快照，因此 C-u N 的效果与连续按该键 N 次相同，而不会停在你的草稿之前。感谢 @liaowang11 在 #813 中的贡献。<br />继上个月针对表格的优化之后，普通数据行现在有了独立的样式（face），且所有表格 face 均继承自同一个基类 face。如果你想全面调整表格样式，现在只需在一个地方设置即可。感谢 @mrcnski 在 #822 中的贡献。<br />agent-shell-session-id 会返回当前 ACP 会话 ID。顺便提一下，如果你只是想把它复制到剪切环（kill ring）中，还可以使用 M-x agent-shell-copy-session-id。<br />agent-shell-opencode-default-model-variant 过去限制略多，因此它已被 agent-shell-opencode-default-config-options 取代，后者是一个关联列表（alist），包含启动新 shell 时 OpenCode 在“可用配置选项”（Available config options）下所公布的任何选项：<br />各选项按照所列顺序应用，顺序至关重要。感谢 @nhojb 在 #739 中的贡献。<br />另外还有四项加入其中：<br />随着新渲染器在过去一段时间提供了更丰富的 Markdown 体验，已废弃的 markdown-overlays 渲染器已被彻底移除。<br />如果你查看过这一时期的提交日志，就会发现这又是忙碌的一个月。自上一篇博文发布以来，已推送了 153 次提交，关闭了 32 个议题（issue），合并了 25 个拉取请求（PR）。截至撰写本文时，待办列表中有 16 个待解决 issue 和 6 个待处理 PR（上次分别为 11 个和 5 个）。<br />从更宏观的视角来看，这是自 3 月以来待办事项的跟踪情况：<br />补充说明：该图表是使用我在 emacs-skills 仓库中分享的 /github-activity 技能生成的。<br />从图表中可以明显看出我何时初为人父，但你也可以看到我成功将其拉回较低水平，此后一直维持在相当稳定的区间。<br />这一切都需要每天投入精力 👉 你懂的 👈<br />如今（尤其是在工作场所），不依赖特定厂商的中立工具比以往任何时候都更为重要，有几种方式可以帮助维持 agent-shell 的持续发展。有些需要赞助资金，有些则只需轻轻一点。每一种支持都备受感激 ;)</p>
<p>agent-shell 由我这位独立开发者构建和维护，而在工作场所与其竞争的工具背后通常都有资金充裕的团队。投入在 agent-shell 上的时间意味着牺牲了其他维持生计的工作时间，因此如果它对你有所帮助，请考虑赞助该项目。而且，如果你的雇主因你使用 agent-shell 而受益，也请推动他们出资支持，他们通常能够提供个人难以企及的资助规模。</p>
<p>GitHub Star 有助于提高项目的曝光度，吸引新用户和潜在赞助者。为 agent-shell 点星完全免费，并有可能帮助吸引更多资金，因此如果你不介意轻点几下鼠标，该项目非常希望能再多一颗 GitHub Star。</p>
<p>感谢所有贡献者带来的这些改进！</p>
<p>喜欢 agent-shell 吗？希望看到它继续发展吗？请考虑赞助这项工作。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-24 19:34 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://xenodium.com/agent-shell-0-78-updates" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ter-history-36d74408d557-19582b4f288ddd02" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2368" data-content-paragraphs="14" data-published-at="2026-09-24T06:14:19.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 14:14</span>
</div>

### [Pick 操作系统是计算机历史的一具活化石](https://csixty4.medium.com/pick-is-a-living-fossil-of-computer-history-36d74408d557)
<div class="original-title-sub"><span class="orig-tag">原文</span> Pick OS is a Living Fossil of Computer History</div>

<div class="article-body" data-article-body="true"><p>这是回顾我职业生涯初期所接触软件的三部曲系列的第一部分。</p>
<p>1999年，在互联网泡沫破裂的阴影下，我开始寻找程序员的工作。当时在芝加哥郊区，程序员的岗位并不多。如果你想了解有哪些工作机会，只能看报纸，而不是上网搜索。我向一堆刊登了招聘广告的公司发了传真——是的，发传真——投递了简历，但当时有一大批刚被裁减且经验丰富的开发者，公司几乎没有什么动力去雇用一个没有任何“实战”经验的年轻人。</p>
<p>少数几家通知我去面试的公司中，有一家显得颇为神秘。他们在招募初级程序员，但招聘广告上并没有透露更多内容。我不记得他们的网站（如果当时他们真有网站的话）是否提及了他们技术栈的任何细节。于是，我带着在学校写的十页示例代码走进了面试室，那是通过 GLUT 调用 OpenGL 的面向对象 C++ 代码。技术面试官看了一眼便直翻白眼：“实话实说，像你这样的人在这里工作可能会觉得相当无聊。你确定真的想要这份工作吗？”我当然想要。能糟糕到哪里去呢？</p>
<p>平心而论，这份工作从来都不无聊。事实上，我在那里学到了很多关于系统分析、项目管理、职业素养以及与客户打交道的知识。但让我感到后悔、甚至有些怨恨的，是接下了一份围绕 Pick 展开的工作。</p>
<p>我上一次偶遇 Pick，是在加州山景城的计算机历史博物馆的展位上。我一直等到一群小学生走出小型机展厅，然后对着其创始人的照片竖起了中指。我怀疑自己绝不是第一个这么做的人。以他的名字命名的这款软件，定义了我职业生涯的前七年，并且花了我大约1000美元才得以脱身。我生命中的大部分时间都花在欣喜地怀念曾经用过的技术上。但对 Pick，我毫无这种眷恋之情。</p>
<p>理查德·“迪克”·皮克（Richard “Dick” Pick）是一个极具邪典色彩、充满戏谑元素的人物，一位连环一夫一妻制者，他以自己最喜欢的消遣为自己的第一个数据库系统命名：通用信息检索语言系统（Generalized Information Retrieval Language System，缩写为 GIRLS，意为“女孩们”）。他在1965年为 IBM System/360 大型机编写了 GIRLS（该大型机本身于1964年发布），这款软件与它所运行的硬件一样处于时代前沿。</p>
<p>该系统在1973年商业化发布时弃用了这个颇具争议的名称，正式更名为 Pick 操作系统（通常简称为“Pick”）。Pick 最初是为在大型机和小型机上运行而编写的。后来的版本则作为应用程序运行在现代 Windows 和 Unix 计算机上，就像是机器内部的一台机器，但比起虚拟机，它更接近于模拟器。最初的操作系统支持多用户和分时系统（一种早期的多任务处理形式）。我不知道它最初是否就支持，但在我使用它的时候，Pick 已经支持虚拟内存，并且可以在其宿主系统上识别多达 1GB 的内存。</p>
<p>Pick 中的数据库表是……等等，我得先倒退一步。Pick 操作系统本身也是一个数据库。正如他们的营销部门在2000年代初所宣称的那样，它是一个“后关系型数据库”。没错，MongoDB 的用户们，早在后关系型概念流行之前，Pick 就已经是后关系型了。</p>
<p>Pick 原生文件系统是围绕基于哈希表的“文件”构建的，包含主键和数据。而这些数据可以是任何形式的文本，因为 Pick 中没有固定的模式（schema）。与关系型数据库拥有严格的模式不同，记录的数据部分本质上就是一个文本文件。记录中的各个列（或称属性）通过一个属性标记（ASCII 码 254）进行分隔。因此，一个人的名和姓可能会被存储为 Dana[254]Ross。</p>
<p>从字面意义上讲，Pick 系统上的每一条记录都可以与其他任何记录截然不同，即便它们处于同一张表……我的意思是文件……我的意思是表里。</p>
<p>现在你可能会想：“很好，但如果我想在单条记录的名（first name）字段中存储两个名呢？”不，你并没有这么想？那就好，因为这太疯狂了。不过，Pick 也能满足你的需求。每个属性都可以细分为一个或多个“多重值”（multivalues），由“值标记”（ASCII 码 253）分隔。所以，只要你愿意，你完全可以拥有一条看起来像 Dana [253] George [254] Ross [253] Washington 的记录。如果你喜欢这种方式，本质上你现在拥有了一种在记录内部创建记录的方法。当你有两个属性的多重值像这样一一对应排布时，它们就被称为“关联多重值”。</p>
<p>好吧，把惊掉的下巴收一收，因为我们还没讲完呢。我们还没聊到“子值”（subvalues）。什么是子值？嗨，那就是你把数据库字段进一步细分的方式。我在这里甚至都想不出一个贴切的例子，因为到了这一步，我们讨论的已经是记录内部的记录内部的记录了。用于分隔子值的是“子值标记”，ASCII 码 252。</p>
<p>你会欣慰地得知，这就是一个“列”所能细分的最深极限了。哦，除了一种采用 ASCII 码 251 作为分隔符的 Pick 变种以外。我真没瞎编。关于分隔符的内容就聊到这里，因为我们确实该谈谈数据字典（dictionaries）了。</p>
<p>作为一个“后关系型”数据库，Pick 对记录的长相没有任何规则约束。字面意义上，Pick 系统中的每条记录都可以与其他任何记录完全不同，哪怕是位于同一张表……我的意思是文件……我的意思是表里的记录。因此，为了在混乱之上建立起某种秩序，每个文件都有一个数据字典——一个附加在原始文件上的二级文件。数据字典通过自身的属性、值和子值来描述主文件中的数据。这里没有任何数据类型或其他细节受到强制约束，事实上你甚至可以为同一个属性赋予两个不同的名称。但它是一个数据字典，对于编写查询至关重要——我们将在第2部分中对此展开讨论。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-24 14:14 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://csixty4.medium.com/pick-is-a-living-fossil-of-computer-history-36d74408d557" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ed-me-sufferers-betrayed-87e9407b1b049e01" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="424" data-content-paragraphs="4" data-published-at="2026-09-24T05:00:08.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">⚡ 战略能源与气候</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 13:00</span>
</div>

### [遭遗弃、被漠视、被精神操控：ME患者所遭受的背叛绝无可推卸的借口 | 乔治·蒙比奥特](https://www.theguardian.com/commentisfree/2026/sep/24/abandoned-dismissed-and-gaslighted-me-sufferers-betrayed)
<div class="original-title-sub"><span class="orig-tag">原文</span> Abandoned, dismissed and gaslighted: there is no excuse for the way ME sufferers have been betrayed | George Monbiot</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/5a5e6e228f26a2de90468e2ea0359695cbc115d2/0_0_5000_4000/master/5000.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=639cd9b449cc33b79537b0fd57a2451c" alt="遭遗弃、被漠视、被精神操控：ME患者所遭受的背叛绝无可推卸的借口 | 乔治·蒙比奥特" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>指南和科学认知的改变似乎对数以百万计被摧毁的人生收效甚微。这是一场在紧闭门扉后上演的令人震惊的社会危机。</p>
<p>我的职业生涯一直在报道那些被忽视的议题。但极少有议题像肌痛性脑脊髓炎/慢性疲劳综合征（ME/CFS）这一破坏性极强的慢性疾病那样遭到漠视。在严重情况下，该疾病几乎会彻底终结人们的生活，导致体力极度透支，并引发一系列广泛的身体和认知症状，可能导致患者无法工作、社交，有时甚至无法移动或进食。然而，这些人却几乎已经从我们的视野中被抹去。</p>
<p>为了了解这种忽视在现实中究竟是何种景象，本周我在Bluesky上发布了一则征集，询问ME/CFS患者他们近期的求医经历。我随即被铺天盖地、令人触目惊心的陈述所淹没。“我完全被抛弃了”；“排队等候治疗长达10年”；“我们已经放弃了寻求医疗支持”；“陷入了悬而未决的无助境地”；“我只觉得自己的声音完全无人倾听、痛苦完全不被承认”。我收到了数百篇令人震惊且痛彻心扉的自白。</p>
<p>乔治·蒙比奥特是《卫报》专栏作家</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-24 13:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#战略能源与气候</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/commentisfree/2026/sep/24/abandoned-dismissed-and-gaslighted-me-sufferers-betrayed" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-elb-folklore-mel-html-ccd51a0ee020f1e8" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="314" data-content-paragraphs="4" data-published-at="2026-09-24T04:09:40.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 12:09</span>
</div>

### [梅尔的故事](https://users.cs.utah.edu/~elb/folklore/mel.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> The Story of Mel</div>

<div class="article-body" data-article-body="true"><p>本文由作者埃德·内瑟（Ed Nather，utastro!nather）于1983年5月21日发布在USENET上。</p>
<p>近期一篇探讨编程中“硬汉（macho）”一面的文章做出了直截了当、不加掩饰的陈述：</p>
<p>不论是否算作自由诗，这都是黑客界最伟大的英雄史诗之一。它仅用寥寥几幅意象，便比所有关于该主题的学术著作加起来都更深刻地捕捉到了黑客精神的美学与心理。</p>
<p>[1992年附记——作者写道：“最初提交给网络的版本并非自由诗，甚至连接近自由诗都算不上——它完全是散文体裁，采用非两端对齐的段落排版。在网络上几经转手流传后，它显然被改动成了如今流行的‘自由诗’形式。换句话说，它在网络上被‘黑’了一把。不知怎的，这倒显得十分契合。”]</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-24 12:09 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://users.cs.utah.edu/~elb/folklore/mel.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--biggest-insult-tells-us-01ccbfab63254a3c" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="847" data-content-paragraphs="17" data-published-at="2026-09-24T04:00:07.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-24 12:00</span>
</div>

### [“这太AI了！”阿尔法世代最尖锐的辱骂语向我们揭示了什么](https://www.theguardian.com/society/2026/sep/24/thats-so-ai-what-gen-alphas-biggest-insult-tells-us)
<div class="original-title-sub"><span class="orig-tag">原文</span> ‘That’s so AI!’ What gen Alpha’s biggest insult tells us</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/6237bf6949f5c64abe45403b03845126a726c70a/627_240_4096_3279/master/4096.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=637b31a0e8e449b1b80e27c63fcf3e88" alt="“这太AI了！”阿尔法世代最尖锐的辱骂语向我们揭示了什么" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>这一年最流行的俚语揭示了年轻人对人工智能的看法——而且这种看法并不乐观。</p>
<p>出没地点：各处的小学。</p>
<p>什么是 AI？这只是孩子们现在常挂在嘴边的一句话：“这很AI！”或“这太AI了！”</p>
<p>但指的到底是什么？某些虚假的、令人难以置信的或垃圾般的东西。</p>
<p>是指由 AI 制作的吗？不。这与人工智能其实关系不大。</p>
<p>但人工智能不是正准备摧毁人类吗？很有可能，但这目前不在我们的讨论范围内。</p>
<p>不在讨论范围？是的。孩子们——阿尔法世代（Gen Alpha）——已经注意到，AI 生成的那些垃圾内容具有某些特质，比如表面看似令人信服、实则廉价且价值可疑，而这些特质同样存在于许多其他事物中：山寨仿冒商品、夸大其词的吹嘘、父母找的借口。如果某样东西在某种程度上被认为是可疑的，那么根据定义，它也就是“AI”。</p>
<p>“这很AI”是新版的“six-seven”吗？不，这句俚语是有实际含义的：年轻人只是拓宽了 AI 的定义，使其等同于“胡扯”。</p>
<p>所以它总是被用作辱骂嘲讽？始终如此。</p>
<p>但事情难道不比这更复杂吗？只要运用良好的判断力并设置得当的护栏，AI 不也能成为我们的救星吗？当我们其他人还在进行这场辩论时，阿尔法世代已经下定了决心：AI 本身就“太AI了”。</p>
<p>当 AI 发现自己是 AI 时会发生什么？它会陷入逻辑反馈闭环，直到所有数据中心开始爆炸吗？你不太懂科学，对吧？</p>
<p>无论如何，唐纳德·特朗普不是刚把人工智能的名字改成了“超级智能”（SI）吗？SI 简直太 AI 了。而且唐纳德·特朗普也很 AI。</p>
<p>今年已经不是我第一次想抛售所有科技股了。科技股就是 AI。</p>
<p>那无人驾驶出租车呢？无人驾驶出租车也很 AI，尤其是那些驾驶座上坐着人类的出租车。</p>
<p>我在市场营销领域的工作肯定也是 AI，这大概就是为什么它被 AI 取代了的原因。我很抱歉。</p>
<p>可以说：“这太AI了！”</p>
<p>不要说：“不，那是阿尔（Al）——阿尔·戈登（Al Gordon）。他在我们年级，他人其实还不错。不过他的鞋子太AI了。”</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-24 12:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/2026/sep/24/thats-so-ai-what-gen-alphas-biggest-insult-tells-us" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

::::