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
<div id="story-sp-janet-for-the-x32-abi-20230842df035510" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1973" data-content-paragraphs="29" data-published-at="2026-10-06T22:26:46.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 06:26</span>
</div>

### [Janet 与 x32：32 位指针、64 位速度、少 25% 内存](https://alexalejandre.com/programming/lisp/janet-for-the-x32-abi/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Janet on x32: 32-bit Pointers, 64-bit Speed, 25% Less RAM</div>

<div class="article-body" data-article-body="true"><p>在 64 位系统上使用 32 位指针，可以节省大量内存（对于指针密集型堆，节省量接近一半），还可以通过让更多数据装入缓存，使程序获得小幅提速。</p>
<p>Linux 的 x32 ABI 正是为此而生，但它一直被严重低估和忽视。在 Debian 上默认禁用（虽然可以通过启动参数启用），在 Arch Linux 上甚至没有编译进去。大多数软件都能顺利为 x32 编译，但针对它的软件包并不多，因此几乎所有东西都得自己编译。</p>
<p>我尝试在 x32 上部署 Mastodon，应用的内存使用量从 650 MB 降到了 350 MB。这里的潜力非常大，但相关工作主要是吃力不讨好的协调与沟通，而我没有时间或动力亲自推动它发展。——Hailey</p>
<p>Spork 等 Janet 库会提供自己的构建标志，但我们可以用一个假的 cc 劫持它们：这个假 cc 会带上必要的 `-m32 -msse2 -mfpmath=sse` 标志启动真正的编译器。我修改了默认 Janet 构建脚本的开头：</p>
<p>很简单！现在试试看！</p>
<p>简而言之：内存减少 20%，速度变慢 50%</p>
<p>这是在 CachyOS（顺便说一句，它基于 Arch）上进行的，使用了 `lib32-glibc` 和 `lib32-gcc-libs`。把这些内容加入构建脚本，就能强制 Spork 等库也以 32 位模式构建！</p>
<p>注意，这些使用的是 Fish；而我不想为了支持其他语言而重新构建我的网站：</p>
<p>我在测试中加了一个 0</p>
<p>例如：`declarative-dsls/tests.janet`</p>
<p>不幸的是，Ubuntu 也放弃了对 x32 的支持。</p>
<p>幸运的是——或者说，我很懒——我可以使用一些已经弃用的服务器（当然不在生产环境中……）和操作系统安装，占用一些硬盘空间：</p>
<p>Ubuntu 20.04 LTS Focal Fossa 已于 2025 年 5 月 31 日结束标准支持。</p>
<p>Ubuntu，这样我们又有 bash 了：</p>
<p>这正是我们需要的，尽管 GCC 9.4.0 版本有些老。我们已经有了 `build-essential`、`git`、`gcc-multilib` 和 `libc6-dev-x32`。现在几乎可以验证这个猜想了。但首先，我们必须修改 `src/include/janet.h`：</p>
<p>让 Janet 选择 64 位值布局。我们的构建脚本还会传入一个构建标志，以禁用 Janet 的 FFI。下面是完整的 `32janet.sh`：</p>
<p>以及用于对比的 `64janet.sh`：</p>
<p>现在来比较二者：</p>
<p>不过，`declarative-dsls` 属于最极端的情况，它使用类型化 C 数组来大幅提升速度，而这类数组并不能从上述变化中获得太多好处。让我们制作一些最小基准测试，真正检验其中的差异：</p>
<p>`words.janet` 构造一段文本，将其拆分成单词，统计单词数量并排序：</p>
<p>`records.janet` 按部门对结构体进行分组，并汇总这些部门；其中还包含一些像真实代码中那样未使用的额外字段：</p>
<p>`parse.janet` 使用 PEG 解析多行文本并计算总数：</p>
<p>`tree.janet` 构造并遍历二叉树，这是我们指针使用最密集的示例：</p>
<p>我们发现，内存节省最多的是小型对象，平均约为 25%；性能变化则不稳定，有时提升 8%，有时下降 16%。或许相比 Janet，其他项目更容易从中获益，因为 Janet 的 NaN-boxing 已经将值压缩到 8 字节，而这里的主要收益来自更小的对象头。实验进行到一半时，我曾希望由于更多数据能够留在 L1 缓存中等原因而获得性能提升；如果在另一个仍持续支持 x32 的世界里，我们甚至可以把它作为脚本的默认配置。但面对这些数据，唯一约 25% 的内存使用量下降虽然不错，却不足以让我们在这个内存价格高昂的时代发起一场运动，以便从机器中榨取更多性能。</p>
<p>如果 Janet 使用更小的对象头，那么为什么不在 64 位模式的实现中直接缩小它们？据我理解，Janet 堆对象使用 16 字节，是为了帮助垃圾回收器：</p>
<p>缩减这些对象需要采用不同的垃圾回收策略，例如使用我们自己的分配器；但这会损害 Janet 的一个核心使用场景：嵌入其他项目。</p>
<p>随后每种类型还会增加：</p>
<p>尤其对于结构体和表，我们可以通过重新排列布局重新获得 8 字节（不需要后面的填充）。只有从代码解析出来的元组需要源代码信息（用于报错）；通过增加一个标志，普通元组可以节省 8 字节。</p>
<p>遗憾的是，glibc 的 malloc 会增加 8 字节，并将大小向上取整到 16 字节的倍数，因此结构体的大小仍会保持不变。但表和部分元组的大小会比上述数据所显示的缩减得更多！</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>在64位系统上使用32位指针有可能大幅减少内存占用（对于指针密集型堆程序接近减半），并通过更易装入缓存适度提高程序运行速度。</li>
    <li>Linux x32 ABI在Debian上默认禁用（可通过启动标志启用），在Arch Linux上甚至未编译进去，且Ubuntu也停止了对x32的支持。</li>
    <li>来源叙事重点：探讨 Linux x32 ABI（64位性能搭配32位指针）在 Janet 语言中的实际内存优化与性能权衡，指出其虽能减少约25%的RAM占用但速度提升不稳定且生态支持严重萎缩，得出不足以推动生态复兴的务实结论</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://alexalejandre.com/programming/lisp/janet-for-the-x32-abi/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-g-program-status-osc7501-cbd7ea75fd5495be" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2654" data-content-paragraphs="28" data-published-at="2026-10-06T21:12:46.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 05:12</span>
</div>

### [用于程序状态的终端协议（OSC 7501）](https://mitchellh.com/writing/program-status-osc7501)
<div class="original-title-sub"><span class="orig-tag">原文</span> A Terminal Protocol for Program Status (OSC 7501)</div>

<div class="article-body" data-article-body="true"><p>我为一种新型终端转义序列编写了规范：OSC 7501，即“程序状态协议”（Program Status Protocol）。它允许任何程序向终端告知自己当前的状态：空闲、运行中、等待用户响应、已完成或失败，以及具体原因。</p>
<p>例如，Terraform 可以通过该协议指示其当前正阻塞以等待用户输入，附带提示信息“Apply 3 to add, 1 to change, 0 to destroy?”（Base64 编码）。终端（或运行 Terraform 的任何其他工具）可以采用它认为合适的方式来展示此信息：通知、收件箱列表、状态图标等。</p>
<p>本文介绍了为什么我认为该协议有必要存在、为什么现有的方案不够理想（尤其是对于编码智能体而言），以及该协议是如何运作的。</p>
<p>这是一套完全通用、终端原生的规范与协议。它源于我在 Superlogical 和 Ghostty 上的开发工作，但该规范不包含任何特定产品的功能或用语。它被设计成一个符合惯例、结构规范的规范，任何终端开发者都会对其感到熟悉。</p>
<p>长时间运行的任务在终端中十分常见：构建、部署、包升级、数据处理，以及如今越来越多的编码智能体（coding agents）。这些程序在自主运行、等待用户输入以及结束运行之间交替切换。与此同时，用户通常会离开去做其他事情，并希望在任务完成或需要人工介入时收到通知。</p>
<p>这个问题的各个方面早在几十年前就已通过各种方式尝试解决。例如，某些终端会监控活跃的前台进程，并在进程发生变化时发出通知；或者，它们会等待一段输出“静默”（定义各异）的时间。该规范同样列举了现有序列不足以满足需求的原因。</p>
<p>归根结底，我认为目前还没有一个统一、与交互形态无关且通用的解决方案来传达进度、阻塞状态、完成情况以及任务树结构。依靠东拼西凑现有的转义序列，也无法稳健地实现这一目标。</p>
<p>如果你对 AI、大语言模型（LLM）等不感兴趣，可以跳过本节。这个问题本身是通用的，即使不涉及 AI，它也是一个非常现实的需求。由于在 AI 场景下该问题尤为棘手，因此我专门提了出来；但如果你完全不关心这些，直接跳过即可。</p>
<p>如今，人们出于各种原因运行大量长时间运行的智能体已越来越普遍：背景调研、Issue 监控、错误修复、大型功能开发等。每一个智能体都会运行一段时间，然后停下来请求权限、提出疑问或汇报已完成。</p>
<p>由此催生了一类全新的工具，我姑且将其称为“智能体收件箱”（agentic inbox）：即一个跨所有正在运行的智能体的统一视图，展示哪些处于运行中、哪些已完成，以及哪些正在等待你的响应。Herdr、cmux 和 Agent Deck 就是其中数百个例子中的代表。</p>
<p>由于缺乏专用协议，它们目前通过两种方式解决智能体状态问题：启发式推测以及非终端 API。</p>
<p>第一种方法是通过读取屏幕内容或窗口标题，并将其与已知模式进行匹配来进行推测。</p>
<p>Herdr 是一个很好的例子，因为它做得不错且公开了文档。它的检测清单是 TOML 规则，用于将智能体归类为空闲、运行中或阻塞。以下是针对 Claude Code 的 16 条规则中的第一条：</p>
<p>如果 Claude Code 的窗口标题以盲文旋转图标（Braille spinner）开头，或者自 2.1.228 版本起以半圆图标开头，它就会被判定为“运行中”。仅针对 Claude Code，该规则文件的修改历史在三个月内就记录了十次变更。</p>
<p>这并不是对 Herdr 的批评。其维护者已经在现有工具条件下做到了极致。但这充分证明了统一协议将带来的巨大益处。</p>
<p>第二种方法是让程序通过特定于收件箱工具的带外 API（例如 Herdr 的 socket API 或 cmux notify）自行报告状态。从某种意义上说，这比启发式推测更好，因为真正知晓自身状态的程序正是报告状态的主体。然而，每个程序都必须单独与每个收件箱工具进行集成，而且本地 socket 无法在没有额外桥接的情况下跨 SSH 或在容器内运行。而伪终端（pty）早已在所有这些场景下顺畅工作。</p>
<p>OSC 7501 是针对这一问题的终端原生解法。程序直接通过其始终具备的 pty 上报自身状态，使用的格式即使发送到任何地方也是安全的（规范的终端会直接忽略未知的 OSC 序列）。</p>
<p>该序列的主体是由冒号（:）分隔的键值对列表。唯一必需的键是 state，其值为以下之一：</p>
<p>可选的键包括 app（稳定的机器可读程序名称，如 cargo 或 claude-code）以及 msg（Base64 编码的单行人类可读信息）。</p>
<p>同时运行多个任务的程序可以使用层级 ID 上报多条记录。部署工具可以在根节点处于运行状态，而 us-east 正以 40% 的进度推送镜像，eu-west 则处于阻塞状态等待部署到生产环境的审批。两者可以同时成立，终端可以决定如何进行展示。clear 状态则用于清除记录。</p>
<p>以下是一个封装 rsync 以接入此协议的完整 Shell 脚本示例：</p>
<p>使用老式普通的 POSIX sh 就能轻松编写脚本。不需要 SDK，不需要 socket，不需要环境变量，也不需要 JSON。对特定的 GUI 呈现形式没有任何偏见。对任何特定的工作负载（如 AI）也没有倾向性。这是一个结构规范、通用的基础，任何人都可以基于它构建功能并参与其中。</p>
<p>完整的规范涵盖了其余细节：记录生命周期、特性探测、terminfo、大小限制以及安全性。篇幅很短，全部由我亲手编写，欢迎阅读。</p>
<p>我是基于多年维护终端模拟器的经验编写了这一规范。它的设计既便于应用程序开发者生成输出，也便于终端模拟器消费和解析。</p>
<p>我已经两次实现了该协议。我们在 libghostty 中有一个实现，我在 Rex 中也做了一个并行实现。此外，我还通过插件或分支方式在 Terraform、Claude Code、Codex 和 Homebrew 中完成了概念验证实现。在每种情况下，实现代码都只有十几行。</p>
<p>我已经与许多流行终端程序和模拟器的维护者取得了联系，他们帮助审阅并完善了这份规范。如果你有更多反馈，我非常乐意倾听。</p>
<p>如果你已经实现了该规范，请通过电子邮件（页脚的邮件图标）联系我，我会将你添加到实现该规范的工具列表中。谢谢。</p>
<p>我希望我们所有人都不必再通过读取屏幕或进程树来猜测程序在做什么。程序本身就知道自己在做什么，让我们给它一个告诉我们的途径吧！</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>作者编写了名为 OSC 7501（Program Status Protocol）的新终端转义序列规范，允许程序向终端汇报自身状态（如 idle、working、waiting on the user、finished、failed 及其原因）。</li>
    <li>OSC 7501 是原生终端规范，源自作者在 Superlogical 和 Ghostty 上的工作，但不包含特定产品的专用功能或语言。</li>
    <li>来源叙事重点：提出并倡导原生终端转义序列规范 OSC 7501（程序状态协议），阐明其如何替代脆弱的屏幕启发式嗅探和复杂的进程外 API，从而低成本解决终端程序及 AI 编程代理的状态通知与集中管理问题。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://mitchellh.com/writing/program-status-osc7501" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-7-sustainable-web-career-49ae93f0c5dc5363" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2295" data-content-paragraphs="25" data-published-at="2026-10-06T18:29:11.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 02:29</span>
</div>

### [当这一切平息之后，如何拥有一份可持续的 Web 职业生涯](https://dbushell.com/2026/10/07/sustainable-web-career/)
<div class="original-title-sub"><span class="orig-tag">原文</span> A sustainable web career, for when all this blows over</div>

<div class="article-body" data-article-body="true"><p>2026年10月7日，星期三</p>
<p>无论好坏，Web 行业目前都正经历着一段特殊时期。其中的缘由在很大程度上是非理性的。人们依然需要 Web，这一点丝毫未变。然而，该行业的财务状况却举步维艰。长远来看，职业前景显得变幻莫测。</p>
<p>因为我公开反对那股蓄意摧毁我所在行业的推动力，并在此过程中惹恼了一些人，所以常有志同道合的同行私下向我寻求建议。我只能给出一个平淡但理智的回答：在没有退路之前，不要辞掉一份有收入的工作。去温彻斯特酒吧喝上一大杯冰镇啤酒，静待这一切平息。</p>
<p>电影《僵尸肖恩》（2004年）中的角色们在温彻斯特酒吧畅饮。西蒙·佩吉饰演的角色举起啤酒杯做出干杯姿势，并对着镜头眨眼。</p>
<p>我坚信情况会有所好转。在此之前，我们可以专注于哪些事情，以加快走出认知低谷，并在一切风平浪静后更好地确立自己的定位？</p>
<p>要打造可持续的 Web 职业生涯，还有什么比关注极度匮乏的关键技能更好的方向呢？我的重点在于前端开发，但这些知识领域与任何从事网站构建业务的人都息息相关。</p>
<p>无障碍访问（Accessibility）历来是 Web 开发的基石，但在当下，每个人为之发声倡导的紧迫性前所未有。要理解为什么无障碍访问面向所有人。学会结合实际需求和切实落地来探讨无障碍访问。</p>
<p>不幸的是，无障碍访问已沦为某些科技群体的“道德标榜”（美德表态）。（有人告诉我 LinkedIn 上充斥着错误信息。）无障碍访问绝不是像菜肴配菜那样可以事后随意附加到网站上的功能。无障碍问题无法在最后通过自动化流程一劳永逸地解决。Web 专业人士必须从第一天起在所有决策中尊重无障碍设计，以此扭转这种思维方式。</p>
<p>学习并将相关规范作为你的底线标准。与真实用户交流并进行测试。听从那些渴望让你了解现实情况的专家的意见。</p>
<p>CSS 是前端标准中最为活跃且不断演进的技术。构建优秀的样式表架构需要对这门语言的特性有深刻的理解。像级联层（cascade layers）以及降低特异性的选择器等较新特性，让这项工作变得简单得多。</p>
<p>CSS 本就具备处理组织井然有序的样式的能力，但那些拒绝学习和尊重这门语言的开发者却试图将复杂性推向别处，使用简化的抽象或“CSS-in-JS”解决方案。这些做法本质上存在局限，导致性能低下，且并未真正解决它们声称能解决的问题。</p>
<p>沟通是一项稀缺的“软实力”（原因显而易见）。如果你想在嘈杂声中脱颖而出成为专家，或者仅仅是让自己的声音被听见，这都是一项极佳的技能。学会言简意赅，抓住重点。不要害怕提问。</p>
<p>在担忧升级之前，委婉且及早地加以解决。不要推卸指责，但要学会“留好后路”（cover your ass）——项目中的每个人都应该为了同一个目标而努力，但有些人的方法可能存在偏差。保持积极心态，不要迎头硬碰负面情绪。</p>
<p>如果你能做好沟通，你在自己的岗位上将会备受尊敬。</p>
<p>你可能没料到会提到这一点，但事实就是如此。</p>
<p>不去“谈论政治”的特权已经一去不复返了。极右翼政治意识形态正在抬头，科技圈中沉睡的仇恨正在苏醒。法西斯科技（fash-tech）的震中是马斯克的“X”，像戴维·海涅迈尔·汉森（David Heinemeier Hansson）这样的人在社区中散布种族主义并滥用职权推销其议程，吉列尔莫·劳赫（Guillermo Rauch）甚至与战争罪犯合影。像 Digital Ocean 这样的大型科技巨头正在资助这场权力掠夺。要警惕那些否认这种威胁的人。</p>
<p>如果你想避免被挤出这个行业，就要在法西斯主义找上门之前认清并坚决抵制它。不要保持沉默。</p>
<p>我已经谈了有助于我们迈向未来的话题，但我们应该遗忘什么？</p>
<p>Facebook 演变成“盲从崇拜”（cargo cult）的实验是一套挥之不去的遗留框架，但如今已没有理由再去学习它了。React 已经根深蒂固地成为了“代码挤出机”的通用语言。生成 React 代码的速度比任何人类能阅读的速度还要快。总而言之，尽管陈旧的职位空缺仍在要求经验，但 React 已不值得投入时间。高薪 React 开发的时代屈指可数了。</p>
<p>GitHub 如今已成为一种负担与风险。对于私有代码仓库，请使用自托管的 git 协作平台。我推荐 Forgejo。众多类似 Tailscale 的服务之一是限制远程访问的简便方式。不要把内容公开给“死网”（dead internet）去攻击！对于 CI/CD，同样尽量本地化，或者使用不绑定于科技巨头的独立服务。花时间学习基本的 git 命令。掌握一点技术和基础设施知识会带来长远益处。</p>
<p>这些人英俊潇洒、充满魅力且极具亲和力。我指的是：开发者关系人员（DevRel）、YouTuber、初创公司创始人等。当科技行业对我们还算友善时，网红们挺有娱乐性，在派对结束后也是闲聊的好伙伴。但如今局势已变，我们不能任由虚假叙事主导并决定一个封闭 Web 的未来。普通人依然在使用网络。极少数人能负担得起网红推销的那些新鲜玩意。他们的注意力经济不再关我们的事。</p>
<p>这就是我认为当这一切风波过去后，打造可持续 Web 职业生涯的关注重点。</p>
<p>请牢记最重要的一点：Web 是人类为了满足人类需求而创造的产物。这些需求不会消失。抛弃繁荣时期积累的累赘包袱。回归基础，并在专业需求回归时为自己找准位置。</p>
<p>所有观点均属个人，而非大型语言模型生成的产物。我写的一切都百分之百源于人类。因为我在乎！</p>
<p>我创立了 Valley Fold 来帮助大家，让我们一起把你的网站做起来吧。无论你已经圈定了明确需求还是毫无头绪，我们都能在任何阶段与你展开合作。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-07 02:29 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://dbushell.com/2026/10/07/sustainable-web-career/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-4evy-pared-e00b9b1fbb0aec85" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="869" data-content-paragraphs="15" data-published-at="2026-10-06T18:27:16.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 02:27</span>
</div>

### [Pared——无需禁用 SIP 即可移除不需要的 Apple 智能模型](https://github.com/4evy/pared)
<div class="original-title-sub"><span class="orig-tag">原文</span> Pared - remove unwanted Apple Intelligence models without disabling SIP</div>

<div class="article-body" data-article-body="true"><p>无需禁用 SIP 即可移除不需要的 Apple 智能（Apple Intelligence）模型。支持 CLI、nix-darwin 以及 Home Manager。</p>
<p>解压下载的文件并将 Pared 拖入“应用程序”文件夹。</p>
<p>更偏好终端操作？运行此命令即可打开设置向导：</p>
<p>需要 Apple 芯片以及 macOS 27 或更高版本。无需 Xcode 或 Homebrew。</p>
<p>官方网站 · 文档 · 更多安装选项</p>
<p>选择要保留在 Mac 上的 Apple 智能功能，随后移除您不再需要的模型。Pared 包含原生应用、终端向导和 Nix 模块。系统完整性保护（SIP）将始终保持启用状态。</p>
<p>保留“书写工具”（Writing Tools）、关闭“Genmoji”，或者关闭所有功能。对于您选择保留或未托管的功能，Pared 会保留其目录中所必需的共享模型。</p>
<p>想要恢复某项功能？将其开启，安装更新后的配置文件，然后在 Pared 中请求其模型。对于 Pared 无法直接下载的功能，请使用其对应的 Apple 应用程序下载。</p>
<p>打开 Pared 或运行 `pared wizard`。无论打开哪一个都不会直接更改任何设置；功能选项在您保存之前都会保留为草稿状态。</p>
<p>有关安装和命令详情，请参阅应用程序手册或命令行指南。</p>
<p>使用 nix-darwin 或 Home Manager 模块来管理您的配置。这两者在激活时默认都会移除符合条件的模型；设置 `programs.pared.cleanupOnActivation = false;` 可选择禁用此行为。在“系统设置”中安装生成的描述文件，以阻止未来的自动下载。</p>
<p>请参阅 Nix 安装指南和配置选项参考。</p>
<p>若使用 Xcode 27 或更新版本，可在此检出仓库中运行：</p>
<p>有关 CLI 和离线安装的信息，请参阅命令行指南。</p>
<p>Pared 利用 Apple 的资产服务（asset service）来移除模型。有关具体实现机制和兼容性限制，请阅读描述文件与模型移除的工作原理说明。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-07 02:27 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://github.com/4evy/pared" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-1097760-2be4d9e3eeb59039-272be79681472718" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="6605" data-content-paragraphs="28" data-published-at="2026-10-06T17:46:53.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 01:46</span>
</div>

### [Gentoo 的 Chromium 软件包临终告别](https://lwn.net/SubscriberLink/1097760/2be4d9e3eeb59039/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Last rites for Gentoo&#39;s Chromium package</div>

<div class="article-body" data-article-body="true"><p>Chromium 是 Google Chrome 网页浏览器的开源上游项目，也是许多 Linux 用户首选的浏览器。不过，它也因难以由 Linux 发行版打包和构建而声名狼藉：Chromium 拥有复杂的构建系统，项目捆绑了许多依赖项，而且发布频繁。所有这些因素，再加上用户的抱怨，导致 Gentoo Chromium 软件包的维护者放弃了继续维护该软件包的尝试。</p>
<p>Gentoo 专注于让用户通过 Portage 软件管理工具从源代码构建自己的软件。Gentoo 打包人员会创建 ebuild 文件，这些文本文件采用类似 Bash 的语法编写，其中包含 Portage 构建软件所需的信息。随后，用户使用 emerge（Portage 的命令行接口）自行构建软件包。Chromium 最近的一份 ebuild 展示了该软件包的复杂程度。</p>
<p>Gentoo 确实通过其 Binhost 项目为部分软件提供预构建的二进制软件包。不过，从源代码构建能让用户灵活地声明 USE 标志，以设置编译时选项或更改软件包配置。例如，用户可能希望指定要与软件包链接的可选库，或者是否安装随附的文档。对于 Chromium，用户可以使用 -bundled-toolchain USE 标志（该标志会告诉 Portage 不要使用捆绑的工具链），从而使用系统中的 Clang 编译 Chromium，而不是使用上游项目附带的捆绑版本。对于 x86-64 系统上的 Gentoo 用户来说，这一选项并非必须；但其他架构的用户则必须使用 -bundled-toolchain，因为 Chromium 的捆绑工具链只针对 x86-64 提供。</p>
<p>值得注意的是，由于使用专有编解码器构建该软件包存在问题，Chromium 目前无法作为二进制软件包从 Gentoo 获取。</p>
<p>包括 Arch Linux、Debian 和 Fedora 在内的许多发行版，都使用“孤儿”（orphan）一词来指代其维护者已经放弃维护的软件包；开发者会宣布某个软件包已成为孤儿，其他贡献者则有机会在愿意的情况下接手维护。Gentoo 使用的术语则更为戏剧化：软件包维护者会在 gentoo-dev-announce 邮件列表上宣布某个软件包“临终告别”（last rites），以通知项目该软件包将不再有人维护，同时也为其他开发者接手维护提供机会。</p>
<p>开发者宣布临终告别后，该软件包的 ebuild 会在 Gentoo 的 ebuild 软件库中被屏蔽，以确保用户不会意外安装一个已经无人维护的软件包。已经安装该软件包的用户如果尝试升级，将收到该软件包已被屏蔽的警告。Chromium 软件包维护者 Sam James 在 Roman Žilka 提交的一份错误报告中经过长时间讨论后，于 9 月 24 日宣布 Chromium 软件包进入临终告别状态。</p>
<p>9 月 9 日，Žilka 抱怨说，Chromium ebuild 的最新稳定版本已经过时：</p>
<p>他在错误报告中附上了较新版本 Chromium 的 ebuild，但指出，如果用户尝试使用 -bundled-toolchain USE 标志编译 Chromium，该 ebuild 将无法工作。</p>
<p>James 回复说：“Chromium 作为源代码软件包维护起来糟糕透顶。在 Gentoo 中，它很容易成为最消耗维护者精力的软件包。”他说，抱怨维护工作并没有帮助，并补充道，多年来，由于难以让 Chromium 保持最新，维护者已经数次接近于让它进入临终告别状态。他还指出，自己之前已经向 Žilka 提过这件事，并表示如果 Žilka 愿意协助维护该软件包，将会受到欢迎。</p>
<p>事实上，Žilka 在 8 月曾提交过一份类似的错误报告，抱怨 Chromium ebuild 中存在大量漏洞；James 当时回复说，这个软件包一直很难维护，“而现在他们还加入了 Go”作为依赖。在此之前，Žilka 曾出现在 Matt Jolly 针对 Chromium 漏洞提交的错误报告中，并抱怨说：“更新流程需要修正，这样类似的事件才不会再次发生在这些如此关键的软件包中！”</p>
<p>Jolly 回复说，维护者是一个志愿者团队，他们会尽力而为，但“构建失败、人为因素（‘我分配错误报告时弄错了，自动化系统也没有发现’），以及我自己有限的空闲时间，是造成延误的最大原因”。他说，改变这种状况的最佳方式，就是 Žilka 自愿提供帮助。</p>
<p>Maciej S. Szmigiero 询问是否有可能将该 ebuild 保留在 Gentoo 的代码仓库中，只需声明它是以“尽力而为（best effort）”的级别进行维护。“对于 Gentoo 桌面系统来说，移除可构建/可打补丁的 Chromium 是一个巨大的损失。”James 表示他认为这不可行。他此前已经解释过 Chromium 一直是由志愿者维护的，但这种解释并没有被普遍接受。</p>
<p>他表示，大家完全可以在另一个仓库中维护该 ebuild，但这意味着他们必须自己动手，或者接受其他人以较低标准来维护。他指出，讨论中曾有人引用过来自 Bentoo overlay 的 ebuild，但这些 ebuild 的生成似乎“高度自动化”，并且遗漏了 Gentoo 版本中的一些修复。“复制 ebuild 在不出问题之前一直行得通，直到它暴露出问题。”</p>
<p>James 补充道，在 10 月 24 日退役清洗期结束之前，仍有人可以接手 Chromium 软件包，或者该软件包将来也可以被恢复。不过，除非有可持续的维护计划，否则他并不希望看到这种情况。“由于上游代码的高频变动，Chromium 在 Gentoo 中有着让维护者心力交瘁的历史，尽管这个 bug 报告中的某些内容对维护者的积极性也毫无帮助。”</p>
<p>Matt Whitlock 想知道，如果消除 Chromium 的大部分 USE 标记，或者维护者不再对第三方库进行拆分解绑（unbundling），是否可以减少导致开发者精疲力竭的因素。</p>
<p>他随后补充说，部分问题在于上游项目开发者“在禁用任何所谓‘可选’功能的情况下，根本不测试他们的构建”。这把责任全都甩给了下游软件包维护者。“就 Chromium 而言，保持所有开关选项正常工作（尽管上游长期予以忽视）是一项艰巨且几乎不可逾越的任务。”</p>
<p>James 表示这是一个好问题，但 Chromium 近期复杂性的一部分原因在于引入了 Rust 和 Go 依赖。打包人员必须想方设法确保 Go 构建不需要网络访问——这在 Gentoo ebuild 中是明令禁止的，但这并不是唯一的问题。他说，Google 开发者似乎还在继续使用实验性的 Rust 特性，而这些特性在发布新版本时同样会破坏构建。最重要的是，“另一个问题是上游用于生成发布源码包（tarball）的 CI 并不稳定”。Gentoo 的一位 Chromium 维护者曾提交过补丁试图修复该问题，但收效甚微。“这些补丁花了大把时间才得到审查，而自那之后它又坏了好几次。上游似乎根本没有注意到，也不在乎它要么完全不生成源码包，要么生成的是不完整的源码包。”</p>
<p>Jolly 补充了他对在 Gentoo 上维护 Chromium 存在的问题的一些观察。他说，维护 Chromium 每周可能需要耗费六个多小时，而这还仅仅是算上一台配置了“极其夸张内存”的高性能 PC 上的编译时间。在 64 位 Arm 机器上，编译时间还要更长。</p>
<p>他在关于 Chromium 退役清洗的回复中附带了一份“抢先版常见问题解答（pre-emptive FAQ）”，说明了恢复该软件包需要什么条件。他表示，维护 Chromium 并没有无法逾越的技术难题，但这需要多名具备广泛技能的维护者——包括熟悉 C、C++、Go、JavaScript 和 Rust。“还有大量非此即彼、闭门造车（NIH）的 Google 专用工具，你必须为之培养使用技能，而且永远无法在其他任何地方派上用场——言尽于此，后果自负。”</p>
<p>他提到，使用 Google 的工具链固然会更简单，但这也将把 ebuild 限制在 x86-64 架构上。“我们将失去 arm64、ppc64 和 RISC-V overlay——与其如此，不如现在就快刀斩乱麻撕下创可贴，因为这并不会从实质上改善局面”。他补充说，他愿意为任何想要维护源码 ebuild 的人审查提交并提供建议，但他认为至少需要三个人。“历史表明，单打独斗的维护者是行不通的，而且自从我 2023 年开始维护该软件包以来，发布周期已经缩短了两次；当时情况就很糟糕，而现在则更糟。”</p>
<p>Chromium 的发布节奏可以说是非常激进。Chromium 拥有包括稳定版、测试版和开发版在内的多个通道。稳定通道大约每两周就会推出一个主要的浏览器分支，并且每周都会发布一个新版本。</p>
<p>目前来看，Gentoo 用户似乎需要到别处寻找合适的 Chromium ebuild，选择其他浏览器，或者寻找不同的分发途径来获取 Chromium。例如，Gentoo 用户可以从 Flathub 安装 Flatpak，但这是一个由第三方构建的未经认证的软件包，并非由 Chromium 上游项目官方构建。对于不在 x86-64 或 64 位 Arm 系统上的用户而言，Flatpak 同样无济于事。</p>
<p>技术上讲，Chromium 用户可以按照上游的说明自行构建和编译浏览器，但 Chromium 项目似乎并不太关心让这一过程变得容易。它确实有一个获取代码的页面，但是指向 Linux（以及 macOS 和 Windows）指导说明的链接会返回 503 错误。搜索使用说明可以找到这个页面，但它没有注明日期，因此不清楚是否是最新的。假设这些说明是最新且正确的，按照这些指示构建 Chromium 也是一场不小的折磨。用户可以从该项目下载预构建的二进制文件，但仅限于 x86-64 系统。</p>
<p>当然，其他发行版仍在继续提供 Chromium 软件包，不过他们的方法并不具备 Gentoo 那样的灵活性。Fedora 的软件包（被描述为“Google 不想让你使用的 WebKit (Blink) 驱动的网页浏览器”）目前处于 154.0.8037.92 版本——比 10 月 1 日发布的上游版本（154.0.8037.97）落后了一个版本。同样，Debian 安全仓库中的软件包（目前）与 Fedora 的版本相同，信息页面显示 154.0.8037.97 中至少解决了 11 个已知的 CVE 漏洞。跟上 Chromium 的步伐绝非易事。</p>
<p>也许 Gentoo 能找到一个愿意且有能力承担重任的团队，将 Chromium ebuild 维持在 Gentoo 用户所期望的标准上。无论发生什么，在短期内，Chromium 的维护工作看起来都不太可能变得更加轻松。</p>
<p>关于捆绑依赖项：还有一个额外的问题是，如果我们“完全采用（Google）原生方式”，放弃系统库转而使用 Google 捆绑的副本，那么在某些方面的代价反而会变得更大：更长的构建时间、不满意的用户、更大的可移植性问题（考虑到非 amd64 平台），并且会失去诸如 distcc 兼容性等特性，而这种特性目前在一定程度上缓解了构建时间的痛苦。</p>
<p>也就是说，在某种程度上，我们表面上只是在进行“从源码”构建，但实际上并没有达到用户有合理理由去期待的标准吗？然而即使只是维护到这种程度，也已经相当耗费心力了。</p>
<p>在我对其他发行版的调查中，它们似乎通常也落后至少一个大版本（发布节奏的变化可能让情况变得更糟），而且它们不需要像我们这样处理如此多的组合排列：它们只需要在 $DISTRO 所支持的架构集上完成构建，并且只需要在特定的构建机上使用一套构建选项进行构建，而不是在所有用户的机器上构建。我认为大家都很痛苦。<br />我想知道，打包其他浏览器（我想实际上也就只有 Firefox 了）是否也同样具有挑战性，还是说这些问题是 Chromium 独有的？从我作为一个局外人的角度来看，Firefox 似乎同样庞大且充斥着安全漏洞。但也许他们让构建变得更容易，并且发布频率也没那么高？<br />顺便提一句，我曾尽量让自己负责的项目便于下游维护者处理。但话说回来，我负责的项目规模远不如 Chrome 那么庞大。<br />Firefox 同样充满挑战，但 Mozilla 似乎至少在一定程度上关心下游是否能够顺畅使用 Firefox 的源码：你不会遇到源码 tar 包凭空消失或不完整的情况，他们通常乐于接受补丁，并且在人们遇到阻碍时，他们似乎至少有时会提供帮助（我不能说总是如此，因为我对它没有那么熟悉，但这并不意味着他们不会提供帮助）。Firefox 几年前加快了发布节奏，最近可能又加快了一次，但我相信构建方面的变动通常相当微小。我们在这方面遇到的最大问题涉及一些小型组件，这些组件有时会在使用更新版本的 Rust 时出现故障（我想是 SIMD 相关）。<br />qtwebengine 得益于 Qt 为其包装上合理外层所做的努力，因此比 Chromium 更容易让人接受。不过它通常明显落后于 Chromium，尽管他们确实会向后移植（部分？同样，我不确定是否全部；但并不是说绝对不是全部）安全修复补丁。<br />webkit-gtk 大体上也还过得去，尽管它确实需要耗费相当长的构建时间（所有这些项目都是如此），而且由于某些 ABI 变更，我们目前不得不构建若干变体，这令人遗憾。<br />我原以为（我想是我想错了？）可以通过订阅链接进行匿名评论，但现在看来并非如此。<br />那么在此代为转帖 juippis 的评论：<br />大家好，sam 让我以 Gentoo 当前 Firefox 维护者的身份来补充说明几句。Firefox 的维护工作量很大，但我想分享几点为什么我认为它比 Chromium 更容易处理。需要说明的是，我几乎没有任何打包 Chromium 的经验，之前只是协助过一些更新。<br />针对每次 Firefox 发布我所做的各项工作，我本可以写一篇详尽的长文，但既然我是这里的过客，我会尽量简明扼要。<br />妥善完成版本升级（version bumps）需要花费大量时间——主要是因为我需要测试多种 USE 标记组合、gcc/clang，而且仅仅测试 PGO（基于配置文件的优化）本身单次构建就需要大约一小时。这可能很艰难，因为 Gentoo 携带了一些自定义补丁，例如启用各种 system-* 库以替代捆绑库，而这些补丁经常失效或需要重新变基（rebase）。但上游相当包容，影响整个 Linux 生态的重大问题通常能很快得到上游的修复。上游还拥有使用 Ubuntu 的 CI 构建。由于 Gentoo 作为滚动发行版具备更新的工具链，我们通常是最先发现与工具链 / 系统库相关问题的人之一。部分 Firefox 开发者似乎也在使用 Gentoo。因此我想说，在 Firefox 上，上游与其他发行版之间的关系更紧密，尤其是因为 Firefox 在其他发行版中往往是默认浏览器。<br />Gentoo 提供了“两个通道”——带有测试关键字的 Firefox-157.0，以及带有稳定关键字的 Firefox-153.4.0esr。Thunderbird 也是如此：Thunderbird-157.0 和 Thunderbird-153.4.0esr。Thunderbird 的发布紧随 Firefox 之后，有时需要添加特定于 TB 的补丁。Firefox 最近转向了 2 周一次的发布节奏，而以前是 4 周，因此现在每月的工作量翻了一倍。目前，我每 2 周需要花费约 20 个小时来处理与版本升级相关的所有事项（两个 Firefox 版本、两个 Thunderbird 版本、Spidermonkey、安全漏洞等……），最近我甚至跳过了一个步骤，将 ESR 直接推送到稳定通道（在稳定系统上完成测试后），以节省一些时间。大部分时间都花在运</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-07 01:46 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://lwn.net/SubscriberLink/1097760/2be4d9e3eeb59039/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-item-4b372f784c135534" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7270" data-content-paragraphs="47" data-published-at="2026-10-06T17:17:23.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 01:17</span>
</div>

### [Brut：面向 Unix 工具的蛮力路由器](https://brut.sh/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Brut, the Brutal Router for Unix Tools</div>

<div class="article-body" data-article-body="true"><p>这是 Brut（面向 Unix 工具的蛮力路由器，Brutal Router for Unix Tools）的带注释源代码。它是一个用于构建 Unix 命令行程序的单文件 POSIX shell 脚本。它充当此类程序的前端可执行文件，根据其自身文件名以及传入的第一个参数，调度（或“路由”）到一组命令，这种风格因 Git CLI 而广为人知。Brut 是 Brutal Unix 项目的基石。</p>
<p>使用 Brut，你可以创建具备高可移植性的程序，能够运行在任何现代 Unix 系统上，除了 POSIX.1-2024 规范中指定的基础实用工具之外，没有任何运行时依赖。（当然，你的程序可以有自己的运行时依赖，这完全没问题；但 Brut 本身的一切都遵循 POSIX 约束。）这意味着你可以在极其广泛的主机上运行你的程序——从 Linux 虚拟机、BSD 服务器、Mac 笔记本电脑，到小巧的单板计算机，而无需管理语言运行时环境，也不必编译和信任二进制可执行文件。</p>
<p>Brut 倡导一种 shell 脚本编写风格：将程序拆分为许多小型可执行文件和共享库文件，并按照约定的目录结构进行组织。当单个 shell 脚本膨胀到几百行以上而让人碰壁时，它就是一剂解药。因为每个命令都是一个独立的进程，拥有独立的参数、标准输入输出流和退出状态，所以更大的程序就变成了由各部分独立可测组件构成的组合体。这使得 Brut 非常适合用于引导构建系统和管理基础设施相关任务，也是替代由其他语言编写的任务运行器（task runner）和命令行应用框架的绝佳选择。</p>
<p>正如你将看到的，Brut 实际上只不过是由少数几个函数和一组精心挑选的环境变量构成的。本质上，它只是设置好 PATH，然后通过搜索 PATH 来找出应该运行哪个可执行文件。以此为核心，在约 120 行 shell 代码中，Brut 赋予了你的程序子命令能力、对共享脚本的访问支持、错误处理、路由钩子、可扩展性，以及将命令划分为命名空间的功能。</p>
<p>我们首先从明确自身所在的环境开始。</p>
<p>在进行任何其他赋值之前，我们先将当前环境保存为 OLDENV。如果程序后续想在调用环境中运行某个程序，可以使用 eval 来恢复它。</p>
<p>接下来，我们将准确查明 Brut 的当前副本在文件系统中的位置。我们将其用于两个目的：弄清程序的名称，以及定位构成该程序的所有其他文件。</p>
<p>$0 包含了路由脚本被调用时的路径。该路径的任何部分都可能是符号链接，因此我们将其传给 realpath 以获取其在文件系统中的实际位置，然后将其保存为 SELF。</p>
<p>接着，我们将 $0 的基名（basename）存为 NAME，将 $SELF 的基名存为 PROGRAM_NAME。（在处理命名空间时，两者可能会有所不同。）</p>
<p>ROOT 目录位于路由脚本所在目录向上两级。例如，如果路由脚本位于 /usr/local/bin/myprog，那么 $ROOT 将是 /usr/local。</p>
<p>现在我们可以相对于 $ROOT 来设置 LIB、LIBEXEC、SHARE 和 VENDOR。Brut 程序会按照以下约定组织其源文件：</p>
<p>设置好这些变量后，我们现在将自己插入到 PATH 的最前端。我们将最高优先级赋予 $LIB，尽管它通常不包含可执行文件，但由于 shell 的 . 命令在加载文件时会查阅 $PATH，这样可以确保库文件永远不会被遮蔽。在此之后，我们添加了 $LIBEXEC（命令可执行文件存放处）和 $VENDOR（打包的运行时依赖存放处）。</p>
<p>Brut 导出给子命令的唯一另一个变量是 SELF。这允许命令回调路由脚本以访问辅助函数。（稍后我们将进一步探讨命令如何调用辅助函数。）</p>
<p>程序可以在特殊的 $LIB/_init.sh 文件中设置 USAGE 和 VERSION 两个变量，该文件由 Brut 在命令调度之前加载源文件引入。USAGE 变量用于配置在不带参数运行 myprog 或输入无效命令名称时显示的顶层程序用法摘要。VERSION 变量如果被设置，则会启用并配置 myprog --version 的输出内容。</p>
<p>现在我们来定义 Brut 的“标准库”。这些函数全部由 Brut 自身使用，但它们也会开放给各命令使用。</p>
<p>我们先从 error 辅助函数开始，它负责显示错误信息并返回非零状态退出。error 的第一个参数是当前命令的名称或路径，它会被格式化以便于展示。其余参数则被输出到标准错误流中，每行一个。</p>
<p>usage 辅助函数用于显示有关程序接受哪些命令行参数的信息。与 error 类似，其第一个参数是当前命令的名称或路径。第二个参数是程序命令行语法的单行摘要。后续的所有参数都将在摘要之后各占一行显示。所有输出都会写入标准错误流。usage 辅助函数以非零状态返回。</p>
<p>当路由脚本在没有传入命令或传入无效命令的情况下被调用时，Brut 会在不带任何参数的情况下调用 usage 辅助函数。这将打印出程序的顶层摘要，后随可用命令的列表。程序可以在 $LIB/_init.sh 中设置 USAGE 变量来自定义顶层摘要。</p>
<p>在 Brut 中定义的辅助函数不会从路由脚本自动传递到程序的各个子命令中，但由路由脚本导出的环境变量则会传递。</p>
<p>回顾一下，Brut 导出了 SELF 变量，其中包含路由脚本的完整路径。这使命令具备了重新调用 Brut 的能力。结合特殊的 --- 参数，各命令就可以调用路由脚本内部定义的辅助函数。例如，若要打印错误消息并退出，命令可以运行如下内容：</p>
<p>（稍后我们将看到 Brut 如何实现 --- 参数。）</p>
<p>大多数 Brut 程序最终都会想要调用 error 或 usage。为了避免每次都必须写出 &quot;$SELF&quot; ---，程序可以在 $LIB 中的共享脚本里定义别名，并在每个命令的开头将其加载源文件引入。例如，某个程序可能有一个包含以下内容的 lib/myprog/myprog.sh 文件：</p>
<p>然后一个命令可以像这样使用它：</p>
<p>（关于该命令的实现有两点需要注意。首先，它以 set -eu 开头，你可以将其视为启用了 shell 的“严格模式”——它指示 shell 在遇到第一个失败时立即退出。其次，它无需指定目录即可加载共享脚本，因为 $LIB 位于该命令 PATH 的首位。）</p>
<p>usage 辅助函数也可以通过类似的别名受益，但有一个变通：将 USAGE 变量自动展开为第二个参数。</p>
<p>这就建立了一种约定：每个命令可以选择在文件顶部声明一次其用法摘要。命令只需设置一次 USAGE，随后就可以自由地不带参数调用 usage：</p>
<p>其余的辅助函数由 Brut 用于枚举命令、可执行文件和命名空间，将命令解析为可执行文件路径，以及格式化可执行文件名称以供展示。</p>
<p>一般来说，能够将 shell 变量值传递给内联 awk 脚本是很有用的。Awk 对此提供了一种机制，即 ‑v VAR=value，但它对于任意输入并不安全：在赋值操作数中，反斜杠会变成转义序列，且值中不允许包含换行符。另一种替代方案——将值内插到内联脚本中——则需要细致地进行字符串转义。<br />我们将定义一个小型辅助函数 awka，用于运行带有单个参数的内联 awk 脚本，该参数会自动赋值给变量 a。awka 的第一个参数是 a 的值，第二个参数是要运行的脚本。awka 调用始终从标准输入读取数据。<br />现在我们来到了 Brut 的核心引擎：searchpath 辅助函数，它封装了 find，用于在 $PATH 的各个目录中搜索符合指定条件的可执行文件。<br />其思路是构建一个参数列表，将 find 限制在仅搜索 $PATH 中的目录，并使用可移植表达式来模拟非标准的 ‑maxdepth 选项。我们构建的参数列表如下所示：<br />! ‑name * 的求值结果始终为 false。它作为“或”（or）表达式链的头部；路径中的每个目录都直接映射到 ‑o ‑path。对分组表达式使用 ‑o ‑prune 则指示 find 不要遍历目录，除非该目录被列在此链中。<br />我们通过遍历 $PATH 中的每个目录并追加相应的表达式参数来构建 find 表达式。然后，我们将 $PATH 中的每个目录插入到最前面，指示 find 仅搜索这些目录，而不进入子目录。<br />现在我们使用构建好的参数列表调用 find ‑H，后跟将匹配范围限制为可执行文件或链接的选项，且名称中不能包含 ‑‑（Brut 将其视为私有文件）。我们屏蔽了 find 的错误消息和退出状态；我们只关心它写入标准输出的路径。<br />命名空间提供了一种将程序命令的子集归组在另一个命令之下的方法。命名空间仅仅是一个指向路由器的符号链接。带有命名空间前缀的可执行文件名称将成为该命名空间下的命令。<br />在此示例中，myprog env list 运行 env 命名空间中的 list 命令。由于 myprog‑env 是指向路由器的符号链接，Brut 会运行两次：<br />请注意，嵌套的 Brut 调用并不是某种特殊模式。Brut 从文件顶部重新开始运行，带有相同的 $SELF 和 $PROGRAM_NAME，但此时 $NAME 已被设置为 myprog‑env。<br />虽然对于命令分发来说这并不是严格必需的，但我们将定义一个 namespaces 辅助函数来枚举程序中的所有命名空间。这使我们可以在其他地方按命名空间过滤命令。<br />我们构建了一个紧凑但直观的管道，首先在 $PATH 中查找所有名称以 $NAME‑ 为前缀的符号链接。（例如，myprog 中的命名空间将查找名为 myprog‑* 的符号链接。）我们进一步将该列表限制为指向 $SELF 的链接。然后我们将生成的列表通过管道传递给 awk，awk 按目录分隔符将每行拆分为多个字段，并打印最后一个字段（即每个匹配链接的基本名称）。最后，我们对列表进行排序并去重。<br />接下来我们定义两个辅助函数：executables 列出属于当前命名空间的每个可执行文件的完整路径，而 commands 则仅列出它们的命令名称。<br />为了将列表范围限制为当前命名空间中的可执行文件，我们为每个后代命名空间在参数列表中追加一条排除规则。对于名为 myprog‑env 的命名空间，该规则形如 ! ‑name &quot;myprog‑env‑*&quot;。<br />构建好参数列表后，我们将其连同将搜索限制为匹配当前前缀的可执行文件的规则一起传递给 searchpath。然后我们将结果通过管道传递给 awk，awk 利用每个可执行文件的基本名称对列表进行去重，保留第一个结果，并丢弃 $PATH 中其他位置出现的同名后续匹配项。<br />要列出命令名称，我们将 executables 的输出通过管道传递给一个 awk 过滤器，该过滤器会剥离路径和前缀，并对生成的列表进行排序。<br />为了分发到某个命令，我们需要能够找到其对应的可执行文件。resolve 辅助函数接受命令名称作为其参数，并打印当前命名空间中匹配的可执行文件的路径。如果没有匹配项，它将以非零状态返回。<br />我们定义 resolve 而不使用 shell 的 command ‑v，有几个原因。首先是我们希望确保路由器仅分发到当前命名空间中的命令。否则，myprog env‑list 将会错误地直接分发到 env 命名空间中的 list 命令，而无需通过该命名空间进行路由。<br />另一个原因是在某些极端情况下，不同的 shell 对于 command ‑v 认为哪些文件可执行存在分歧。由于 resolve 与其他辅助函数一样使用 searchpath 进行搜索，因此我们确保路由器仅分发到程序用法消息中列出的那些命令。<br />如果命令名称包含连字符，它可能属于另一个命名空间，因此我们依靠 executables 来过滤列表。否则，如果命令名称至少包含一个字符，我们可以通过直接调用 searchpath 来避免 executables 的开销。我们将结果通过管道传递给 awk，awk 打印第一个匹配的可执行文件。<br />invocation 辅助函数用于格式化可执行文件名称，以便在错误和用法消息中显示，例如将 myprog‑env‑list 转换为 myprog env list。这并不是简单地将每个连字符替换为空格那么容易，因为命令名称本身可能包含连字符；相反，我们列出程序名称及其所有命名空间（按从长到短排序），并使用 awk 替换出现在可执行文件名称开头的每个名称后面的连字符。<br />我们定义了一个小型 flatten 辅助函数，用于将命令输出中的换行符替换为空格。这用于格式化用法消息中的命令列表。<br />当路由器带有 ‑‑version 参数被调用时，Brut 使用 version 辅助函数来显示程序的名称和版本号。程序必须在 $LIB/_init.sh 中设置 VERSION 变量。<br />最后，我们来到了实际运用辅助函数的环节。我们将扫描参数列表，确定哪个参数是命令名称，并路由到该命令对应的可执行文件，替换当前进程并传递所有其他参数。<br />Brut 在命令分发过程的前后提供了可选钩子，以便程序可以修改路由器的行为。这些钩子是存放在 $LIB 中的 shell 脚本，其名称以下划线开头。<br />第一个钩子是 $LIB/_init.sh。我们直到这一步才通过 source 加载它，以便它可以调用上面定义的任何辅助函数，并且在路由之前有机会提前退出或修改参数列表。<br />_init.sh 钩子也是程序导出 Brut 在初始化期间设置的任何变量的地方。例如，想要引用 $LIB 中文件的命令将无法使用该变量，除非程序的 _init.sh 先将其导出。</p>
<p>此处另一个需要注意的变量是 OLDENV，它包含在此文件开头捕获的调用环境。为了让命令可以使用这个被捕获的环境，可以在 _init.sh 中将其值作为一个对你的程序具有唯一命名的新变量导出。</p>
<p>因为 $LIB 衍生自 $NAME，所以每个命名空间都有自己的库目录，从而也有自己的 _init.sh 钩子。当路由到命名空间命令时，Brut 会同时 source（加载）根程序的钩子和该命名空间的钩子。</p>
<p>（注意，由于 Brut 会用它运行的命令替换自身，因此在 _init.sh 中定义函数或别名通常意义不大。你可能需要将它们放入共享库文件中，并在需要时从每个命令中显式 source 该文件。）</p>
<p>此前我们提到了一个特殊的 ‑‑‑ 参数，它允许命令回调路由器以运行辅助程序（helpers）。现在我们将了解其工作原理，首先从 ‑‑version 参数的实现讲起。</p>
<p>如果程序在 _init.sh 中定义了 VERSION 变量，并且以 ‑‑version 作为其唯一参数被调用，我们会将该参数替换为 ‑‑‑ version：</p>
<p>然后，如果路由器的第一个参数恰好是三个连字符（‑‑‑），我们就会丢弃它，将剩余的参数列表作为命令在路由器的 shell 中调用，并退出。因此，‑‑‑ version 调用 version 辅助程序所使用的机制，与允许命令回调路由器的机制相同（例如 &quot;$SELF&quot; ‑‑‑ version）。</p>
<p>Brut 提供了一种向路由器隐藏可执行文件的方法，使它们不会变成可供调用的命令。这些私有可执行文件的特征是名称中任何位置都带有两个连字符（‑‑），例如 myprog‑build‑‑compile。两个连字符的约定由 searchpath 辅助程序强制执行，这意味着路由器绝不会分发到私有可执行文件，并且它也不会出现在用法提示信息或 commands 或 executables 辅助程序的输出中。</p>
<p>私有可执行文件使 Brut 程序能够更轻松地将命令分解到 $LIBEXEC 中的多个文件中。回想一下，Brut 在初始化期间会将 $LIBEXEC 插入到 PATH 的最前端。命令会继承这一环境，因此可以直接调用 $LIBEXEC 中的任何其他可执行文件。</p>
<p>因为特殊的 ‑‑‑ 参数不会经过 resolve 辅助程序，所以它也可以用于从程序外部调用私有可执行文件。这在测试或调试时非常有用。</p>
<p>Brut 对参数语法采取了一种相对放任的态度。除了 ‑‑version 和 ‑‑‑ 参数之外，Brut 不会对选项解析强加任何特定想法，而是将其留给每个程序自行决定。</p>
<p>有一个显著的例外：当寻找包含要分发的命令的参数时，Brut 会跳过任何以连字符开头的参数。然后，命令名称之前或之后的所有参数都会按其原始顺序传递给该命令。</p>
<p>这种行为很方便，但请注意，它不适用于第一个是选项、第二个是值的参数对。此类参数对不能出现在参数列表中的命令名称之前。</p>
<p>（建议需要对参数处理进行更复杂控制的程序在 _init.sh 中解析并重写参数列表。）</p>
<p>我们将遍历每个参数，并在 args 变量中构建一个 shell 表达式，该表达式可以通过求值生成用于执行的、带有正确引号的参数列表。</p>
<p>如果参数以连字符开头，则它不可能是命令名称。什么都不做，直接离开 case 语句。</p>
<p>如果参数为空，或包含两个连续的连字符，则它不是有效的命令名称。因此，如果我们尚未设置 COMMAND，我们将打印用法信息并退出。否则，它只是一个普通参数，所以我们离开 case 语句。</p>
<p>对于任何其他参数，如果我们尚未设置 COMMAND，现在就进行设置，并立即继续下一次循环迭代，而不向参数列表中累加条目。</p>
<p>如果代码执行到这里，说明该参数不是命令名称。向参数列表中添加一个条目。</p>
<p>现在我们已经在 $COMMAND 中获得了命令名称，我们将把它传递给 resolve 辅助程序，如果我们找到了匹配项</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-07 01:17 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://brut.sh/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-posts-release-polars-2-3dd31b1d10301cae" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3481" data-content-paragraphs="21" data-published-at="2026-10-06T14:30:40.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-06 22:30</span>
</div>

### [Polars 2.0 正式发布](https://pola.rs/posts/release-polars-2/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Release of Polars 2.0</div>

<div class="article-body" data-article-body="true"><p>作者：Ritchie Vink，2026年10月6日，星期二</p>
<p>今天我们正式发布 Polars 2.0。在先前的公告文章中，我们阐述了提升主版本号背后的考量。本文将探讨 2.0 版本带来的各项新特性。尽管我们最初并未打算将其做成一个体量庞大的特性发布，但它仍然包含了许多令人振奋的内容。</p>
<p>让我们来看看本次发布的核心亮点：</p>
<p>Polars 2.0 将成为一个里程碑节点，从此我们将把 SQL 视为一等公民对待。过去几个月里，Polars 对 SQL 的支持范围大幅扩展。我们清楚自己在过去几年中构建了一个坚实的引擎。在 Polars 2.0 中，我们希望将其能力赋能给包括 SQL 在内的更多工作负载。为了保证高性能，我们对优化器和计算引擎进行了多项改进。其中的重点包括连接重排序（join reordering）、大幅改进的公共子计划消除（common-subplan-elimination）以及动态谓词/布隆过滤器（dynamic predicates/bloom filters）。</p>
<p>为了观察我们在典型 SQL 基准测试中的表现，我们在基于 TPC-H 和 TPC-DS1 衍生的数据上运行了 Polars SQL，并在 c7a.4xlarge（16 个 vCPU，32GB 内存）和 c7a.metal（192 个 vCPU，384GB 内存）实例上，与最新的 DuckDB 正式版（1.5.6）、DuckDB 2.0 alpha 版（2.0.0.dev2610011535）以及最新的 DataFusion 正式版（54.0.0）进行了对比。每个查询均在热运行状态下执行 5 次，每个查询使用独立进程，超时时间设为 60 秒。在每个引擎/基准测试切换时会清空文件缓存（但查询之间不会清空）。对于每个查询，我们取 5 次运行中的最优成绩，并从这些查询耗时的总和（sum）与几何平均值（geometric mean）两个维度对各引擎进行对比。</p>
<p>基准数据使用从 commit 99bedae 源码编译的 tpcgen-cli parquet 生成。我们检查了 tpcgen-cli 的默认 row-group 大小，确认其与 Polars 的 scan_csv 通过管道送入 sink_parquet 以及 DuckDB COPY 所生成的结果大致相当。SQL 查询则由 DuckDB 1.5.6 的 tpch_queries() 和 tpcds_queries() 生成。数据存储在 EBS 上。</p>
<p>下图展示了各引擎在不同机型上的运行时间（单位为秒，越低越好）：</p>
<p>c7a.4xlarge（16 个 vCPU，32 GB）<br />c7a.metal（192 个 vCPU，384 GB）</p>
<p>Polars 和两个版本的 DuckDB 均完成了所有查询。DataFusion 在 c7a.4xlarge 上执行 TPC-DS q72（以及一次 q67）时发生超时，在 TPC-H q18 上发生内存溢出（OOM）；以上针对所有引擎的对比结果中均已剔除这些查询。</p>
<p>我们观察到，默认设置下的 Polars 在除一项基准测试外的所有测试中均表现最快。当扩展至 192 个线程时，Polars 存在一定的恒定开销，这对小数据量查询有所影响。事实上，我们看到限制在 32 核时的 Polars 在所有基准测试中都极具竞争力甚至处于领先地位。我们已在己方排查出原因，并有望在下一个版本中解决此问题。关于基准测试的更多信息可参阅附录。我们鼓励大家复现我们的测试结果，并已在以下地址开源了本次基准测试的代码仓库：https://github.com/pola-rs/polars-2.0-benchmark。</p>
<p>这是 2.0 版本中影响最大的改动之一。在 LazyFrame 上调用 collect 现在将默认采用流式引擎（streaming engine），从而在绝大多数查询中带来巨大的内存和性能提升。之所以这一改动需要提升主版本号，是因为流式引擎默认情况下无法保证某些操作（例如 join、group_by、unpivot 等）的行顺序。如果您在这些操作中需要可观测的行顺序，可以通过设置 maintain_order=True 来主动启用。</p>
<p>外存计算（Out-of-core，即溢出至磁盘/spill to disk）现已默认启用。当内存占用达到约 80% 时开始溢出（该阈值可能需要调优）。目前支持外存计算的操作（排序、窗口函数以及众多表达式）现在可以开始向磁盘溢出以顺利完成查询。默认磁盘预算为 64GB。在接下来的阶段中，我们还将为 join 和 group-by 操作启用外存计算支持。</p>
<p>这两项改动将使 Polars 在面向普通数据从业者的高内存工作负载中表现出更强的健壮性。随着后续将外存计算扩展至 join 和 group-by，这种健壮性还将得到进一步提升。</p>
<p>Polars 现已原生支持 Arrow 的 MapType，对应为 Polars 的 Map 数据类型（dtype）。您可以将 Map 视为 Python 中的字典，即键到值的映射。在 2.0 之前，Arrow 的 MapType 在 Polars 中被读取为 List(Struct({&quot;key&quot;: ..., &quot;value&quot;: ...}))。</p>
<p>作为受原生支持的数据类型，Map 类型现在将拥有专用表达式，例如键查找、值遍历以及其他类似字典的操作方法。</p>
<p>Polars 的目标是保持严谨并快速失败（fail fast）。错误最好能在最前端抛出，而不是在数据流水线运行了 20 分钟后才暴露。针对数据不匹配的隐式行为应该是需要显式启用的，而非默认行为，因为这些不匹配可能会掩盖 bug。随着 AI 驱动开发的兴起，这种严谨性变得更加有价值。智能体可以通过调用 collect_schema() 提前验证查询的结构，该方法无需物化任何数据即可解析类型并捕获模式（schema）层面的不匹配。这保证了快速反馈，意味着智能体和人类开发者都能实现更快的迭代。并非所有错误都能在查询计划编译期间被捕获，有些错误取决于实际数据。在这些情况下，Polars 默认采用更严格的行为，以确保不一致性能够被捕获，而不是静默生成不同的结果。有关 Polars 在哪些方面变得更加严格的部分示例，请参阅先前的文章。</p>
<p>对于 Polars 2.0 的发布，我们感到非常兴奋。在接下来的几个月里，我们将在现有路线上持续精进：更好的外存计算、在大核数 CPU 上更好的扩展能力，而在 Polars Cloud 方面，我们的目标是成为目前最快的分布式引擎。我们还启动了 GeoPolars 的研发工作，希望很快能带来更多相关消息。如果您在我们的新版本中发现任何问题，请提交 issue：https://github.com/pola-rs/polars/issues。最后，为了协助您升级至 2.0，我们已发布了迁移指南。</p>
<p>具体的绝对耗时数据（单位：秒）如下。每行中加粗的数值代表该项中最快的引擎；底色越深，代表该引擎相比最快者越慢。32 线程的 Polars 仅在 c7a.metal 实例上运行。</p>
<p>查询时间的几何平均值</p>
<p>在大数据量场景下，Polars 随着核心数量增加也展现出了良好的扩展性。在 SF100 规模下从 16 个 vCPU 扩展至 192 个 vCPU 时，Polars 在 TPC-H 上的总耗时加速了 3.8 倍，在 TPC-DS 上加速了 2.2 倍；作为对比，DuckDB 1.5.6 分别为 3.2 倍和 1.9 倍，DuckDB 2.0 alpha 分别为 2.2 倍和 1.5 倍，DataFusion 分别为 1.7 倍和 1.0 倍。而在 SF10 规模下，默认设置下的 Polars 并没有从额外核心中获益：在 TPC-H 上速度持平，而在 TPC-DS 上慢了 1.8 倍，与此同时 DuckDB 1.5.6 仍分别实现了 1.8 倍和 1.3 倍的提速。由于 32 线程的 Polars 仅在 c7a.metal 上运行，因此未纳入此项对比。</p>
<p>这些基准测试衍生自 TPC-H 和 TPC-DS 基准测试，因此所获得的任何结果均不可与官方发布的 TPC-H 和 TPC-DS 基准测试结果进行对比，因为所得结果并不符合 TPC-H 和 TPC-DS 的官方规范。↩ ↩2</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-06 22:30 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://pola.rs/posts/release-polars-2/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-pdf-2607-12197-b560fe563b1fc6ff" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="696" data-content-paragraphs="2" data-published-at="2026-10-06T13:36:33.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-06 21:36</span>
</div>

### [双向类型切片](https://arxiv.org/pdf/2607.12197)
<div class="original-title-sub"><span class="orig-tag">原文</span> Bidirectional Type Slicing</div>

<div class="article-body" data-article-body="true"><p>摘要：开发工具会报告某个表达式具有什么类型，但不会说明它为什么具有该类型。本文提出了一种类型切片（type slicing）理论来回答这类问题：程序员选择一个项（term），查询与其相关的任意部分类型信息，并获得该程序的一个切片——即一个良构的部分程序，其中无关的子项已被折叠隐藏——该切片足以重现被查询的类型。我们针对双向类型系统（bidirectional type systems）构建了类型切片理论，其中合成切片（synthesis slices）用于解释一个项所合成出的类型，而分析切片（analysis slices）则解释其周围上下文所期望的类型。该理论不需要强制转换动态语义（cast dynamics），因为它适用于任何在类型和项上具备精度偏序关系且满足向下静态渐进性（downwards static graduality）属性的双向系统。</p>
<p>我们基于 Hazelnut 和标记 lambda 演算（marked lambda calculi），在一个包含孔洞（holes）、积类型（products）、和类型（sums）以及显式多态的核心演算上发展了该元理论，证明了每个查询都存在一个极小切片（minimal slice），并且细化查询会单调地缩小其极小切片。随后，我们展示了如何精确和近似地计算这些切片。最后，将类型切片与错误标记理论相结合，把这些成果推广到了任意类型错误的程序上，从而通过单一机制解释了完整、不完整以及错误代码中的类型与类型错误。该元理论已在 Agda 中完成机械化形式证明，并且针对 Hazel 编程环境实现了一个线性时间复杂度的类型切片近似算法。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-06 21:36 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://arxiv.org/pdf/2607.12197" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::