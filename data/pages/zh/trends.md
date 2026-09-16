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
<div id="story-inventing-issue-tracking-f1c01296d68f1a42" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2033" data-content-paragraphs="14" data-published-at="2026-09-16T10:17:30.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-16 18:17</span>
</div>

### [重塑议题跟踪：本地优先与原生 Git 化](https://blog.manganin.dev/blog/reinventing-issue-tracking/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Reinventing issue tracking: Local-first and Git-native</div>

<div class="article-body" data-article-body="true"><p>协作的核心要素之一是共享的议题跟踪（issue tracking）环境。在为 Manganin 设计议题跟踪功能时，我脑海中已经有了一些明确需求。</p>
<p>我很快意识到，在兼顾这些需求的同时保持可用性，比想象中要困难得多。这篇开发日志阐述了我满足这些需求的议题跟踪方案，并记录了我在探索过程中经历的（诸多）失败。</p>
<p>最直接朴素的解决方案就是在项目根目录下设立一个 .issues/ 目录，其中的每个文件对应一个 issue。我当时觉得这很简洁巧妙，因为 issue 和代码紧密绑定——每个分支都有自己的 issue 状态，因此你可以在修复 issue 的同一个提交中将其关闭。但当我把这一优势推演到逻辑终点时，我意识到这也是其致命缺陷所在。当（在主分支上）发起一个新 issue 时，它适用于哪些正在活跃开发的分支？你是否需要为了跟上新的 issue 而不断进行 rebase？天哪，完全行不通——</p>
<p>议题变动（churn）的发生频率通常远高于实际的代码提交。每当有人创建、编辑、关闭或重新打开一个 issue 时，你都必须执行 pull。一旦项目具备一定的发展速度，这种做法很快就会令人厌烦。</p>
<p>Git 在 refs（引用）中存储跟踪信息。分支存储在 refs/heads 中，标签通常枚举在 refs/tags 中，依此类推。我在 Recurse Center 学到了一个小技巧：你可以利用非规范命名的 refs 指向任意数据，从而在 Git 中存储数据；这种方式对 GitHub 等代码托管平台而言完全不可见（opaque），但仍会被忠实地同步传播。你可以将议题跟踪信息存放在这里，这样它既不会弄乱源码树，又能随代码仓库一同存储与克隆。每个 issue 被分配一个自增整数，并存放在由该索引寻址的 ref 中，例如 refs/issues/12。</p>
<p>问题在于，这导致在本地编辑 issue 变得极其繁琐恼人。若要在实际本地开发中使用这种方法，可能需要下载一个独立的工具来管理这种复杂性。Git 的设计初衷并不是为了这种用法，其人体工程学体验（使用手感）也印证了这一点。本质上只是一个微小的文本文件，外层却包裹了太多复杂的抽象。层级越多，出错几率就越大，且产生更多不必要的信息冗余——实质上同一个 issue 竟然必须创建 4 种不同的 ID 来指代。</p>
<p>这种方法还存在其他问题，尤其是避免与其他人编辑同一 issue 时发生的冲突和竞态条件。实现这一方法引出了一系列疑问：面对冲突和无效数据该如何处理？一个 issue ID 究竟代表了什么？</p>
<p>我停下来思考了几个星期。此前我对议题跟踪应该是什么样子抱有先入为主的刻板印象，这些印象来自于使用基于 SQL 后端构建的现成软件。如果我把那些全部忘掉，尝试完全顺应 Git 的特性来做，会是什么样？回过头来看，解决方案显而易见：就按照我想要的方式工作，并构建一个能够促进这种工作流程的工具。</p>
<p>强行让 Git 表现得像关系型数据库，会导致事情变得极其复杂。如果你要让 Git 跟踪独立于源代码的事物的变更，那么它就应当独立存储。与其强行把两件截然不同的事物塞在一起存储，何不顺应最符合人体工程学的方式将它们分开存储，并利用工具来弥合它们之间的鸿沟呢？</p>
<p>Manganin 现在使用一个独立的仓库来存储议题数据。每当创建一个新仓库时，系统也会同时创建一个用于跟踪 issue 的隐藏姊妹仓库。在前端的仓库列表中你看不到它。相反，其内部数据会被解析并以类似于其他代码托管平台的方式呈现：展示 issue 标题列表及其正文内容。该仓库可以通过特殊路径克隆，因此并非每个克隆代码库的人都需要下载所有的议题跟踪数据。</p>
<p>这些 issue 就透明地以文件形式直接存储。文件的每个部分都具备语义：issue 标题就是文件名（你会惊讶地发现什么字符都能构成有效路径）。文件内容则存放 issue 正文。这类工作流随处可见，因此 Git、文件系统以及其他工具都能良好支持。我自己在日常的 issue 浏览与分拣（triage）流程中，就直接在 Neovim 里搭配使用 FZF。</p>
<p>issue ID 无需使用自增整数。文件系统本身就能保证文件名唯一。如果文件名不足以作为标识符——到目前为止我还没遇到过无法满足的场景——那么可以使用 Git 的 OID（对象标识符）。</p>
<p>将一个复杂的想法淬炼为简单方案需要时间。找到最优雅的解法必然伴随着反复试错。最终的成果应当是一个看起来顺理成章、自然而然的系统，以至于人们根本察觉不到背后付出的心血。理想的工具应当不挡道、不碍事，让你能够专注于做到最好。</p>
<p>打磨提炼是一个迭代的过程。随着我持续使用 Manganin 进行议题跟踪，我记录下了诸多痛点。这些正是可以通过精巧的工具来抚平工作流阻碍的地方。让它变得更好而不是更加笨拙难用的关键在于：以理想的用户体验为起点，进而设计支撑这一体验的系统架构。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>Manganin 采用独立的隐藏 sister 仓库专门存储 issue 数据，在前端仓库列表中不可见。</li>
    <li>Manganin 的 issue 以纯文件透明存储，文件名即为 issue 标题，文件内容为 issue 正文。</li>
    <li>来源叙事重点：探讨本地优先（Local-first）与 Git 原生的问题追踪系统设计演进，详细阐述从直接在代码树存储（.issues/ 目录）到利用 Git refs，最终落脚于使用独立隐藏 sister 仓库及纯文本语义文件方案的权衡与心路历程。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.manganin.dev/blog/reinventing-issue-tracking/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-x-agent-status-indicator-902c1bfcbacbc93f" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3205" data-content-paragraphs="34" data-published-at="2026-09-16T07:09:43.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-16 15:09</span>
</div>

### [在 Tmux 状态行中显示智能体状态](https://thecloudlet.github.io/technical/til/tmux-agent-status-indicator/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Agent State in the Tmux Status Line</div>

<div class="article-body" data-article-body="true"><p>当在 tmux 窗口中打开多个智能体（agent）会话时，要弄清哪一个仍在运行、哪一个在等待用户决策、哪一个已经完成，就必须逐个切换查看每个窗口。</p>
<p>Herdr 作为一款以智能体为先的终端复用器，通过状态侧边栏解决了这个问题；而 agenmux 则将其规则移植回了 tmux。两者的做法都是将状态放在单独的显示区域中。而我希望将其直接呈现在窗口条目本身上，即融入到我已经习惯查看的状态行中。</p>
<p>Herdr 还会跟踪“已完成（done）”状态——即在你查看其他地方时任务已完成——这需要记录每个窗格（pane）的焦点历史。略去该状态后，还剩下三种状态。</p>
<p>目标是实现相同的分类，并将其渲染在 tmux 窗口列表中。此前有两个信号看起来能携带这些信息，但实际并未奏效。</p>
<p>pane_title 是显而易见的选择：tmux 为每个窗格单独跟踪它，程序也可以通过 OSC 转义序列来设置。然而 Claude Code 的标题从未改变过。在整个工作轮次中以每秒两次的频率进行采样，只返回了两个不同的值：</p>
<p>在同一台服务器上的 Grok 确实会更新它：</p>
<p>一个盲文加载动画图标（braille spinner），原本配置中的黄色规则会与之匹配。因此标题规则适用于 grok，但对 Claude 却悄无声息地失效。</p>
<p>并不是 claude。这两个 CLI 都是通过指向带版本号二进制文件的符号链接启动的，而进程带有该二进制文件的文件名：</p>
<p>这就是为什么 grok 显示为截断后的 grok-1.0.30-mac。这也解释了为什么此处的绿色图标从未亮起：其规则要求 pane_current_command 必须以 claude 结尾。</p>
<p>在窗格的进程树中匹配 ps -o comm= 可以找到真实名称。这解决了“是哪个智能体”的问题，但无法回答“它正在做什么”。</p>
<p>agenmux 文档记录了这种方法：<br />检测纯粹基于抓取（scraping-only）：通过遍历每个窗格的进程树来识别智能体，状态则从窗格的可见屏幕内容和标题中推断出来。</p>
<p>通过 capture-pane 获取 Claude Code 正在工作时的状态：</p>
<p>同一窗格空闲时的状态：</p>
<p>“esc to interrupt（按 Esc 中断）”只有在某个任务处于可中断状态时才会渲染。加载图标也出现在那里，用的是 ✳ ✽ ✶，而不是标题规则所寻找的盲文字符集。</p>
<p>这也是为什么同样的配置在具有同样静态标题的 Linux 机器上看起来运行正常：在那台机器上亮起的是绿色，而这只需要 pane_current_command 解析为 claude 即可。</p>
<p>遍历进程树以获取智能体名称，抓取屏幕内容，然后应用对应智能体的匹配模式：</p>
<p>规则的匹配顺序有所不同且至关重要。Claude 优先检查“正在运行（working）”，并将纯提示符的空闲规则排在受阻（blocked）模式之前，这样留在屏幕上的已回复权限提示就不会被误判为正在等待。Codex 和 grok 则优先检查“受阻”，因为它们的审批提示会保留触发该提示的工具调用指标。</p>
<p>即使标题规则能正常工作的地方也被放弃了，这样检测就永远不会依赖 OSC 序列的到达。Claude 和 Codex 的屏幕模式来自 agenmux；pingme 则复用 Claude 的规则，因为它是对 Claude Code 的封装。Codex 尚未在实际会话中进行测试。</p>
<p>herdr 自带了 grok.toml，但针对的是 Build 0.2.101——此处的 1.0.30 打印的是 Ctrl+x:shortcuts，而清单中预期的则是 Ctrl+.:shortcuts。</p>
<p>观察一次对话发现，在执行轮次期间页脚会出现 Esc:cancel，结束后消失。随后 grok 运行了一个 shell 命令：加载动画文本在运行期间静止，提示变为 Ctrl+c:cancel，导致一个执行 sleep 20 的窗格在 20 秒内一直报告为空闲状态。</p>
<p>[stop] 在这两种情况下都保留了下来。它也会一直保留到审批提示中，因此优先检查“受阻”。herdr 更进一步，将 ctrl+c:cancel 与 :select 及 ctrl+o:yolo 配合，视为受阻；而在此处将其保留为“正在运行”的后备匹配项，意味着被受阻模式遗漏的权限提示页脚将被读作繁忙状态。</p>
<p>轮询程序每秒将每个窗格的判定结果写入一个窗格级选项中：</p>
<p>格式化字符串只需要读取它：</p>
<p>两行都是必需的——tmux 会通过其专属格式渲染当前窗口。</p>
<p>早期的版本是在格式字符串内部通过 #(...) 来调用脚本。但这行不通：#() 是一个命令作业，其结果会被缓存直到下次重绘，因此处于分离（detached）状态的会话永远不会更新。这就是采用后台循环轮询的原因。</p>
<p>窗口列表为每个窗口显示一个图标，依据活动窗格解析，因此分屏运行两个智能体时只会展示其中一个的状态。</p>
<p>红色 ! 表示等待决策，黄色 ● 表示正在运行，绿色 ✓ 表示空闲，未标记的则是普通 shell。</p>
<p>✓1:123444 是处于空闲状态的 Claude 窗格；●2:grok-1.0.30-mac 则是处于轮次运行中的 grok，其窗口名称同样是带版本的二进制文件名。其“正在运行”规则匹配到了 Waiting for response… 6.8s 和 [stop] 标签。</p>
<p>三个智能体，三套规则集，针对页脚字符串进行匹配；而一旦智能体重新设计其页脚界面，这些规则就会悄无声息地失效，且无法通过版本号进行检查。</p>
<p>生命周期钩子（lifecycle hook）可以避免这一切，herdr 在支持该功能的地方也更倾向于使用钩子：full_lifecycle_hook_authority 列出了 pi、omp、mastracode、opencode、kilo 和 kimi。Claude Code、Codex 和 grok 不在其中，因此 herdr 同样对它们采取屏幕抓取。Claude Code 的钩子其实可以直接写入 @agent-state，但这只能解决三者之一，并且对运行其他程序的窗格毫无帮助。</p>
<p>~/.config/tmux/agent-status-poll.sh 已在 macOS 上针对 claude 2.1.x 和 grok 1.0.30 验证通过。Codex 的模式沿用了 agenmux 的规则，尚未经过测试。目前存在两个已知的粗糙边缘：PID 文件位于固定的 /tmp 路径，因此同一台机器上的两个 tmux 服务器会对其产生竞争；此外，grok 的规则绑定到了特定版本的页脚文本——一旦界面改版就会静默失效，这也是屏幕抓取固有且持续的代价。</p>
<p>~/.config/tmux/tmux.conf 的完整配置，以便在运行上下文中直观查看状态行组件。智能体状态（agent-status）块位于中间部分；其余部分是恰好包围它的普通设置。</p>
<p>这两个文件位于同一目录下，使得 if-shell 命令行可以通过固定路径引用该脚本。通过 stow 打包管理时，它们会一起放置在 ~/.config/tmux/ 中。</p>
<p>&gt; 分享至 twitter / bluesky / mastodon / facebook / reddit / telegram / email<br />&gt; 相关文章：1) Catching NaN at the MLIR Pass Boundary 2) Emacs Setup for LLVM and MLIR Compiler Work 3) What &quot;Memory Compiler&quot; Actually Means: From Bitcells to GDS Tiling</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-16 15:09 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://thecloudlet.github.io/technical/til/tmux-agent-status-indicator/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-coding-in-the-time-of-ai-55e2e33a5412b3d0" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3711" data-content-paragraphs="26" data-published-at="2026-09-16T06:31:52.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-16 14:31</span>
</div>

### [在AI时代保持对编程的热爱](https://blog.nlnetlabs.nl/maintaining-the-love-for-coding-in-the-time-of-ai/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Maintaining the love for coding in the time of AI</div>

<div class="article-body" data-article-body="true"><p>过去一年中，我们亲眼见证了大语言模型（LLM）对 NLnet Labs 开源软件工作所产生的深远影响。这些影响主要可以归为两大领域：社区贡献与安全报告。在深入探讨这个话题之前，先让我介绍一些背景和历史，谈谈过去25年来我们是如何开发软件的。</p>
<p>我想先退一步，解释一下我们是如何维护那些旨在运行于关键基础设施中的开源项目的。因为当人们想到“开源”时，几乎总会本能地认为这是一个由众多独立开发者组成的社区在共同协作推进的项目。</p>
<p>然而，我们开发的是针对互联网标准（如 DNS、BGP 和 RPKI）的软件，这些领域都相当小众。而且，我们使用 C 和 Rust 编写软件，这可以说是小众中的小众。因此，我们以小型、专注的团队形式运作，几乎就像一家商业公司一样，拥有路线图、项目规划和既定的发布日程。所以，尽管我们所做的一切都是开源且采用宽松许可协议的，但在过去25年里，除了微小的缺陷修复和排版修正之外，我们在 Unbound、NSD 和 Routinator 等项目上并没有收到太多外部贡献。</p>
<p>偶有少数情况，比如我们的 DNS 解析器 Unbound 会收到重大的拉取请求（Pull Request）。这些贡献在大多数情况下来自那些根据自身特定用例对 Unbound 进行了定制、并希望将其修改合并回上游的机构组织。其原因多半关乎可维护性：如果将他们的“独家秘方”合并到 NLnet Labs 维护的主分支中，他们就无需在 Unbound 发布新版本时再一遍遍地打上自定义补丁了。</p>
<p>在理想情况下，这种良性互动对各方都有利。我们的项目获得了能够惠及更广泛社区的新功能，而贡献代码的机构也得到了他们所需的功能，并能获得核心开发团队的长期维护保障。这是双赢！</p>
<p>当然，现实要微妙复杂得多。我们的团队对项目的架构、长期可维护性以及代码风格有着极其严谨的关注。这也是为什么像 Unbound 这样的项目能够演进近20年，却不需要彻底推倒重写就能满足当下互联网运营商对现代 DNS 解析器的严苛要求。</p>
<p>事实上，我们在团队内部也推行着同样严苛的代码审查流程。当一名开发者设计并构建了一个新功能时，另一位团队成员会逐行细致审查其代码，以确保自己能够理解并有能力维护该新功能。在最终合并和发布之前，代码通常需要经过数轮审查周期。</p>
<p>此外，还要考虑人际沟通层面的动态。即便某些功能的出发点非常好，开发者也可能对代码风格乃至单行字符宽度极为挑剔。你们懂的 😉。但这也需要足够的担当，去当面向作者直言：你真心觉得他们那个笨重难用的 XML 模式不是正确的选择。</p>
<p>对于外部贡献，在某些情况下，最终结论是由 NLnet Labs 的核心团队从零开始完全重写该功能会更好。我们在过去曾多次达成这种共识，比如 Unbound 中的 Serve Stale 功能，就是我们在收取约定费用后重新实现的。在另一些情况下，双方可能会达成一致，认为该贡献更适合放在 /contrib 目录下——那里存放着不属于官方发行版、但可能对某些人有帮助的功能。</p>
<p>在过去的12个月里，随着数款前沿 AI 模型的发布，这种贡献动态发生了根本性的改变。结果就是，现在出现了一大批自认为获得了 AI 赋予的“超能力”的开发者。对于许多应用场景来说这并没有问题，但我们感到必须谨慎对待这一新的现实。</p>
<p>不得不说：对你最喜欢的 AI Agent 下达这样的指令确实令人叹为观止——“在 NLnet Labs 的 Cascade 中实现 RFC 9432 中定义的 Catalog Zones。只有在所有测试通过且覆盖 RFC 中的全部规范时才停止。最终结果必须包含手册页（man pages）、测试以及对该 RFC 的完整覆盖。”</p>
<p>你可以去喝杯咖啡，等你回来时，就能看到4000行看起来煞有介事、甚至在某种程度上确实能跑通的代码。暂且抛开不谈那些针对 RFC 未具体说明的细节所做出的种种设计权衡。</p>
<p>你的下一步可能就是发起一个拉取请求，并觉得自己不仅为 NLnet Labs，而且为整个 DNS 运营者社区做出了宝贵的贡献。对你来说，向心仪的开源项目提交这种贡献可能感觉既是“像免费啤酒一样的自由”（free as in beer），也是“像言论自由一样的自由”（free as in speech）；但对我们而言，这就像是别人硬塞给我们一只“免费的小狗”：初衷虽好，但收下它却意味着在未来数年里都要承担巨大的照料负担。</p>
<p>但在深入探讨 AI 生成及辅助的代码贡献带来的持久影响之前，我想先谈谈最新 LLM 带来的另一个结果：在 AI 辅助下发现的安全漏洞报告的大量涌入……</p>
<p>出于前文所述的原因，我们将软件开源并不是为了让它变成一个联合社区项目，而是为了让我们软件的运行机制保持公开和透明。我们开发开源软件的一个重要原因，是让所有人都能审查我们的代码，以验证其行为是否正确并找出潜在的缺陷和漏洞。这使得我们所有的项目都成了绝佳的研究猎场，吸引了从博士生到资深安全专家的各路人士。其结果便是造就了一整套极其健壮的应用程序，随着每次版本的迭代而变得更加安全。</p>
<p>还不到一年前，我们社区的开发者们还在抱怨“AI 垃圾”（AI-slop）。面对那些不知所云的 bug 报告，我们只是一笑了之，仅因它们一个月打扰我们工作几次而稍感烦躁。因为问题在于：你不能直接忽视它们，万一其中真有一个可能造成灾难性后果的漏洞呢？无论如何，我们都必须查看报告并回复提交者。</p>
<p>快进到今天，“AI 垃圾”问题显然已经迎刃而解。现在的漏洞报告极其精准，而且附带了复现步骤和潜在的修复方案。更令人担忧的是，它们一次就会涌入数百份之多。这真是一场雪崩。</p>
<p>分流甄别这些报告需要耗费大量时间。我们的团队真能花上一整天，仅仅去弄清楚报告所指的问题究竟是什么。虽然报告中通常确实附带了重现问题的步骤，但对问题本身的描述往往依然相当含糊。最近一批针对 Routinator 的由 LLM 生成的漏洞报告中充斥着诸如“往返失真（Round-trip infidelity）”、“K 文件风暴锁定验证（K-file storm pins validation）”以及“通过块排序位置导致的线性扫描燃烧（Linear-scan burn via block sort position）”这类奇葩术语。</p>
<p>如果您好奇为什么自今年年初以来就没在我们的软件中看到任何重大新功能，那是因为到现在为止，我们几乎所有团队都已处于超负荷运转状态，忙于发布漏洞修复补丁，在某些情况下还要与其他软件供应商紧密协同。曾有那么几次，问题流似乎快要枯竭了，我们以为终于看到了隧道的尽头，但随后又有新的AI模型发布，整个过程便又重头再来。</p>
<p>这对我们来说是一个复杂的困境。作为一名管理者，我能深刻体会到是什么让 NLnet Labs 的软件开发者保持热情：用优美、优雅的方案解决复杂的难题——可以说是匠人精神。但如今连续数月，我们大多数团队都仅仅是在分流甄别漏洞和协调版本发布。这确实彻底剥夺了这份工作的乐趣，而且很难预料这条路将通向何方。</p>
<p>就目前而言，我们别无选择，只能公布现行的 LLM（大语言模型）政策，要求所有代码和文档贡献必须由人类创作。我们确实接受使用 LLM 发现的漏洞报告。有些人可能会认为我们不可理喻，因为即便是在 AI 辅助下，人类也有可能对其贡献的每一行代码承担责任。</p>
<p>虽然一位精通 DNS 或 BGP 的资深 C 或 Rust 开发者确实可以在 AI 辅助下做出贡献并对其代码负全部责任，但令人遗憾的是，我们经历的实际情况并非如此。此外，尽管我在本文中仅围绕现实层面的论据来阐述我们的理由，但道德和知识产权方面的考量同样在我们的决定中占据了重要地位。</p>
<p>尽管如此，前方的道路依然充满不确定性。眼下最直接的问题是规模。NLnet Labs 拥有15名员工，其中12名是软件开发者。我们的基金会没有财力增加额外的人手。如果我们自己也依赖 LLM 来进行分流甄别，不仅成本高昂，而且即便这么做了，那又意味着什么呢——难道由 LLM 生成的漏洞报告再由 LLM 来分流、修复、合并并发布？如果这就是让我们维持生存的方案，我认为这违背了我们所坚信的一切。关键在于人类应当发挥决定性作用。</p>
<p>我坚信我们拥有值得引以为豪的产品组合，并拥有漫长而光明的未来。互联网核心的很大一部分都依赖于我们的工具，从 DNS 解析器到 RPKI 验证器不一而足。我们对全新的 DNSSEC 签名工具 Cascade 的前景，以及我们正在筹备中的其他一切项目都感到兴奋不已。</p>
<p>我们正处于十字路口，团队的身心健康与机构的长期生存能力都面临考验。我们预计，那些主张使用不保证内存安全的编程语言是不负责任的人，或许很快就会声称在开发过程中不经过 LLM 测试就发布软件是不负责任的。我们将密切关注有助于免费开源软件进行 LLM 测试的 CI/CD 工具，同时确保我们恪守自身价值观，并维护基金会的可持续发展。</p>
<p>NLnet Labs 全体成员倾心致意。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-16 14:31 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.nlnetlabs.nl/maintaining-the-love-for-coding-in-the-time-of-ai/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--i-shuts-down-stay-human-a871c7441d09de4d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="363" data-content-paragraphs="1" data-published-at="2026-09-16T06:05:38.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-16 14:05</span>
</div>

### [A/I 关闭运营](https://keepitfree.ai/announcements/a/i-shuts-down-stay-human/)
<div class="original-title-sub"><span class="orig-tag">原文</span> A/I Shuts Down</div>

<div class="article-body" data-article-body="true"><p>A/I 指的是 Autistici/Inventati，与算法（人工智能）没有任何关系。<br />这件事之所以重要，引用资深顾问兼记者安妮·罗斯（Anne Roth）的话来说：<br />20,000 个邮箱账户。20,000 个博客。5,000 个邮件列表。1,500 个网站。<br />由 @cavallette 的志愿者在运营，完全合法，且坚定地秉持反法西斯、女权主义和酷儿立场。<br />却遭到特朗普政府在法律程序之外强行摧毁并关闭。<br />这是我所见过的最具破坏性的、出于政治动机的“去银行化”（断绝金融服务）案例之一。<br />受到我自己一条评论的启发，我认为这可以作为一个很好的切入点，来讨论如何不仅在技术层面上，更在社会和金融层面上保障平台的安全。<br />版主注意：这是我第一次提交内容，如需改进请随时告知。我在选择标签时有些纠结，但我认为这可能与本社区息息相关。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-16 14:05 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://keepitfree.ai/announcements/a/i-shuts-down-stay-human/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-until-i-had-a-revelation-823cfdbb7f5905bc" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="282" data-content-paragraphs="3" data-published-at="2026-09-16T05:30:11.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-16 13:30</span>
</div>

### [改变我的一刻：我曾对自己的皮肤极度介怀——直到迎来一次顿悟](https://www.theguardian.com/lifeandstyle/2026/sep/16/a-moment-that-changed-me-i-felt-hugely-self-conscious-about-my-skin-until-i-had-a-revelation)
<div class="original-title-sub"><span class="orig-tag">原文</span> A moment that changed me: I felt hugely self conscious about my skin - until I had a revelation</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/aa52df0e55fdd544a6eb4f510c5acd4a09fe3deb/277_130_816_652/master/816.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=239e0b9d4a0439410b2f794fa3904365" alt="改变我的一刻：我曾对自己的皮肤极度介怀——直到迎来一次顿悟" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>多年来，白癜风一直主宰着我的生活，我总是在竭力掩饰它。但有一天，我意识到自己可以采取一种截然不同、且让人无比释怀的态度。</p>
<p>麦克风感觉比我想象的要沉。去年12月，当我站在伦敦一家喜剧脱口秀俱乐部的舞台上时，望向台下静静坐着的一屋子陌生人，他们正等着我把他们逗笑。这让人感到既紧张又超现实。多年来我一直在隐藏自己的白癜风，希望别人注意不到它。而此刻，我正准备在演出中拿它开个玩笑。</p>
<p>三岁时，我的手背上长出了第一块白癜风斑块，随后逐渐扩散到了我的手臂、双腿、脸部以及身体的其他部位。到我六岁时，全身已有70%的皮肤被白斑覆盖。当时我还太小，根本不明白究竟发生了什么。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-16 13:30 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/lifeandstyle/2026/sep/16/a-moment-that-changed-me-i-felt-hugely-self-conscious-about-my-skin-until-i-had-a-revelation" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-og-apple-reference-image-52f641a12b2250e2" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="6315" data-content-paragraphs="33" data-published-at="2026-09-16T04:19:42.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-16 12:19</span>
</div>

### [Apple Reference Image：可信摄影认证的全新方案](https://security.apple.com/blog/apple-reference-image/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Apple Reference Image: A New Approach for Verified Photography</div>

<div class="article-body" data-article-body="true"><p>如今，功能强大且唾手可得的人工智能工具让用户能够轻松生成或修改具有逼真质感的图像，其精细程度在短短几年前还是难以想象的。这些工具固然带来了诸如一键消除背景杂物等实用功能，但也让人们愈发难以分辨哪些是记录真实事件的照片，哪些是经过深度修改或完全合成生成的图像。因此，当一张照片的核心作用是证明某件事确实发生过时，仅凭视觉上的逼真度已不再足以确立其真实性。</p>
<p>解决这一问题绝非易事。现代相机依赖复杂的图像处理算法来生成最终的可视化图像，因此，若要证明一张照片准确反映了真实相机传感器所捕获的内容，就需要一条同时涵盖传感器以及负责解读捕获数据的计算摄影软件的信任链。业界针对此问题主要采用基于 C2PA 标准的方案，即在拍摄完成后附加来源元数据，并在此后记录并认证图像的编辑历史。然而，这种方案在整个编辑链条中的任何一个环节都极易遭受攻破，且观看者无法察觉此类篡改。此外，该方案将图像与公开身份（无论是特定设备还是个人身份）相关联，可能会给在危险环境下工作的摄影师带来隐私风险。</p>
<p>作为全球最受欢迎的相机和最安全的消费级移动设备，iPhone 让 Apple 在应对这一挑战时处于得天独厚的优势地位。iPhone 相机深度整合于一套从芯片层起便树立了行业最高安全标准的平台之中。与此同时，我们还运营着“私有云计算”（Private Cloud Compute，简称 PCC）——这是一个在行业内领先且注重隐私保护的云端基础设施，它安全、可审计，并且能够在不让任何人（包括 Apple）查看被处理数据的前提下执行可验证的算法运算。</p>
<p>依托这些顶尖技术能力，我们推出了 Apple Reference Image（Apple 参考图像），这是一套专为 iPhone 打造的可信摄影全新解决方案，并将在 iPhone 18 Pro 和 iPhone 18 Pro Max 的主摄传感器上首次亮相。这一全新的可选相机模式允许摄影师生成带有安全时间戳的“参考图像”，以准确反映 iPhone 相机传感器所记录的真实场景。设备上的专用安全硬件为该参考图像的完整性提供保护，而“私有云计算”则在处理过程中严密守护图像数据的隐私。无论风险多么微小，该系统在设计之初就具备抵御攻破的韧性：任何伪造欺诈的图像均可被撤销，且无需暴露摄影师的真实身份。</p>
<p>Apple Reference Image 提供了一种值得信赖且具可扩展性的保障，确保参考图像名副其实：它是一张真实的照片，由 iPhone 相机中的真实传感器在特定时间拍摄而成。它为可验证的数字摄影树立了全新标杆。</p>
<p>一套高置信度的摄影溯源系统必须满足三项核心要求：</p>
<p>Apple Reference Image 借助 iPhone 18 Pro 和 iPhone 18 Pro Max 中的定制设计图像传感器确保可靠捕获图像数据，并依托“私有云计算”提供即便在设备遭攻破的情况下也无法被破坏的安全摄影处理计算环境。我们坚信，目前市场上尚无其他任何商用摄影溯源系统能够满足这些严苛要求。</p>
<p>对于任何摄影真实性验证系统而言，其核心目标是让用户确信：所展示的经过认证的图像，与实际拍摄的真实场景完全一致。这类系统面临的核心挑战在于，如何保障现代计算相机的整个庞大摄影处理管线的安全。仅对传感器输出的原始数值进行签名并不能生成一张可直接查看的图像：这些像素仍需经过反马赛克（去马赛克）和镜头阴影校正等大量后续处理才能投入使用。为解决这一问题，以往的行业系统通常会推迟到软件处理管线的末端才对图像进行签名。但这种方法容易受到攻击：攻击者可以在传感器传输数据的过程中注入伪造的像素数据，或者利用设备操作系统的漏洞在签名之前将图像彻底篡改。无论是仅对原始传感器数值签名，还是延后至照片处理完毕才签名，都无法达到我们对“语义真实性”的要求。我们的解决方案核心在于将 Apple Reference Image 的处理过程拆分为两个阶段：先创建安全的“数字底片”，再将该底片显影为“参考图像”。每个阶段都受到我们最强有力的安全防护。</p>
<p>安全数字底片的创建始于相机传感器以专用参考捕获模式进行的安全引导。该模式指示传感器在捕获像素数据后立即对其进行加密签名，并阻止传感器固件篡改数据。这形成了一种由硬件强制执行的安全保障，确保操作系统接收到的像素数据与硬件传感器捕获的内容分毫不差，从而杜绝注入或篡改攻击。</p>
<p>我们以同等力度的安全级别保护图像元数据。传感器生成的元数据在拍摄时会与像素数据一同进行签名。对于少数并非直接来自相机传感器的元数据值（例如数码变焦边界和焦距），我们使用安全保护区处理器（Secure Enclave Processor，简称 SEP）对其进行签名。这类来自传感器之外的元数据无法篡改像素本身的数值。</p>
<p>准确掌握照片的拍摄时间往往是确立其真实性的关键要素。虽然以往的行业系统通常采用通用设备操作系统提供的时间戳，但我们认为这显然无法满足真实环境下的可信保障需求。与之不同，Apple Reference Image 通过 Apple 的加密时间戳服务提供拍摄时间的下限与上限，并确保该照片是在这两个时间边界之间拍摄的。设备会依照固定的“心跳”周期请求加密时间戳令牌，并保留其收到的最新令牌。在全球范围内，这一请求平均每 15 分钟进行一次（具体间隔取决于本地网络状况）。这为照片拍摄提供了一个可证明的时间戳下限。在拍摄完成后，设备会请求第二个时间戳作为上限，这两个时间戳都会与传感器数据一起被嵌入并签名。</p>
<p>因此，该安全数字底片包含了渲染参考图像所需的全部核心信息——包括像素数据、关键传感器元数据以及安全时间戳边界——且所有内容均受到保护，免受设备软件被攻破带来的安全威胁。</p>
<p>为了将这种安全的数字底片冲印为用户可见的参考图像，我们利用了私有云计算（Private Cloud Compute，简称 PCC）所提供的注重隐私保护的计算环境。当用户选择创建参考图像时，设备会将数字底片上传至 PCC，PCC 会在高度安全、私密且可验证的环境中执行渲染图像所需的处理步骤——包括去马赛克（demosaicing）、色调映射和压缩。专家可以验证 PCC 在冲印过程中并未篡改数字底片：他们可以检查执行该任务的软件。PCC 的每一个生产构建版本都会记录在只增、抗加密篡改的透明度日志中，其二进制文件可供公众检查，并且设备只会将数据发送给能够证明自身运行了该日志中所列构建版本的节点。这些正是我们为 PCC 如何保护 Apple 智能（Apple Intelligence）请求隐私所做出的同样非凡的保证，我们在之前的文章中已对此进行了深入描述。</p>
<p>Apple 参考图像（Apple Reference Image）结合了这两个阶段的强大保证——硬件层面对于安全数字底片的保障，以及 PCC 对处理算法的可验证透明度——从而为生成的图像提供业界领先的语义真实性。</p>
<p>在设计 Apple 参考图像时，我们考虑了广泛的攻击方式，并构建了该系统以抵御来自多个维度的入侵威胁。</p>
<p>如上所述，我们设计了核心参考图像处理管线，以抵御操作系统被攻破或传感器总线上的数据注入攻击。但针对可能涉及将传感器从设备上拆下的更广泛硬件攻击，我们还需要额外的防护手段。</p>
<p>这些防御在拍下单张照片之前、即制造阶段便已展开。当图像传感器在工厂首次初始化时，它会创建一个加密签名身份，并且仅与工厂共享公钥。SEP（安全隔离区）同样会创建一个经过独立认证的签名身份。这些身份被绑定在设备清单（manifest）中，使我们日后能够检查特定的传感器和 SEP 是否来自同一台设备。在拍摄时，设备会将此平台信息整合到其生成的数字底片中。随后当在 PCC 中冲印参考图像时，PCC 便可验证该照片是否来自有效的“传感器-设备”配对。</p>
<p>我们还考量了密码学攻击。据我们所知，现有的照片签名方案均采用传统安全算法进行签名，但抗量子算法对于密码签名的长期完整性正变得愈发关键。由于参考图像属于公开发布的资产，其完整性必须在任何可能想要验证它们的时间跨度内保持有效，因此仅能抵御传统攻击者的签名是不够的：在 2026 年被声明为真实的照片，应当能够永远保持可安全验证。因此，我们设计了该系统，使其能够抵御针对用于保护公开发布参考图像完整性的任何算法的量子攻击。参考图像上的最终签名是结合了 RSA-3072 和 ML-DSA-87 的后量子复合签名。据我们所知，Apple 参考图像是唯一提供抗量子防御的图像溯源系统。</p>
<p>最后，鉴于没有任何安全系统是完美的，我们创建了一个撤销系统，该系统不仅可以撤销单张照片，还可以撤销来自特定传感器的所有照片。作为冲印安全数字底片流程的一部分，PCC 会计算一个置信度评分，用于评估图像是否具备我们相机传感器原始输出应有的物理特征。在冲印完成的参考图像被签名之前，PCC 会将照片 GUID、传感器 ID 以及该置信度评分发送给配套服务，该服务会记录它们并更新与该传感器关联的动态评分。如果某个低分传感器被撤销，PCC 将不再对其图像进行签名。Apple 设备会定期获取更新后的撤销列表；每当查看参考图像时，查看者都可以确信该图像未被标记为欺诈。</p>
<p>其他行业解决方案要求摄影师或机构使用其自身的凭据来为图像作保。我们担心这会使某些摄影师（例如在冲突地区工作的摄影师）陷入困境；证明图像的真实性不应以放弃匿名性为代价。我们构建 Apple 参考图像是为了避免为摄影师使用明确的公开凭据，并避免在由同一传感器拍摄的不同照片之间产生哪怕是隐式的公开关联。取而代之的是，最终的参考图像在通过 PCC 验证后，由 Apple 的签名服务进行签名。该签名得到了 Apple 最强有力技术保证的背书。</p>
<p>我们的实现方式还保护了图像本身的保密性，包括对 Apple 本身保密。仅仅捕获一张参考图像，绝不应将实际像素暴露给 Apple 或任何其他人。我们通过 PCC 卓越的隐私特性实现了这一点——节点本身的架构设计确保了即使是 Apple 也无法访问图像数据，就像 Apple 无法查看 PCC 中为 Apple 智能处理的信息一样。虽然撤销服务必须维护照片 GUID 及相关传感器的私密记录以实现撤销功能，但它绝不会访问图像数据，也不允许公开访问该记录。此外，由于最终的撤销检查是使用设备端本地列表进行的，因此设备在核实照片是否仍然有效时，绝不会向任何人泄露其正在查看哪张照片。</p>
<p>最后，我们尽最大努力限制了网络可见性。时间戳请求通过不透明 HTTP（Oblivious HTTP）进行传输，因此时间戳服务永远不会获知发起请求设备的 IP 地址。类似地，对撤销和签名服务的调用均在 PCC 内部发起，这仅为这些服务的运行提供了最低限度的必需信息。总之，我们相信这些隐私保护措施远比现有的任何图像溯源系统都要强大得多，使摄影师和查看者都能访问真实图像，而不会在无意中泄露个人信息。</p>
<p>综合所有三项要求——语义真实性、抗入侵韧性以及隐私保护——我们相信 Apple 参考图像为行业树立了全新的安全标准。对于那些对我们实现的技术细节额外感兴趣的读者，下一节将描述支撑 Apple 参考图像安全保证的具体制造、签名和验证流程。</p>
<p>Apple 参考图像（Apple Reference Image）的基础在设备制造过程中便已确立。当 Apple 的感光元件首次初始化时，它会生成专属的 ECDSA P-256 签名密钥对，且绝不导出其中的私钥。工厂记录工作站仅获取对应的公钥验证密钥，使用工厂证书颁发机构（CA）对其进行签名，并将该密钥及证书记录在设备的硬件清单（hardware manifest）中。</p>
<p>安全隔区处理器（SEP）也经历类似的过程：它会生成一个由我们的基础认证机构（BAA）在独立 CA 下认证的密钥，这使设备随后能够生成 Apple 可以归属于该特定手机的签名。接着，第三个 CA 会对设备清单本身进行签名，将感光元件密钥和经 BAA 认证的 SEP 密钥绑定在一起，证明它们同属于同一台 iPhone。正是这种绑定，使我们随后能够声明：某个特定感光元件与特定安全隔区在过去和现在都属于同一台设备。</p>
<p>一旦设备投入使用，便开始收集时间戳。Apple 推送通知服务（APNs）运行着现有的心跳协议，以确保推送通知连接的健康状态。与该心跳同步，APNs 现在会从 Apple 的时间戳服务分发最新的 RFC 3161 时间戳令牌（采用基于 SHA-256 的 ECDSA P-256 签名），设备则保留其接收到的最新令牌。</p>
<p>若要开始拍摄流程，用户需切换至“参考模式”（Reference mode）。这会将感光元件重启进入专门的安全参考模式。该拍摄模式仅接受来自设备操作系统的一项输入：一个将嵌入在拍摄帧元数据固定位置的 SHA-256 摘要。该摘要由最新的安全时间戳、设备清单以及设备的安全启动清单计算得出。</p>
<p>拍摄时，感光元件将光线测量为模拟信号，并将其数字化。数字化后的图像帧与嵌入的元数据摘要在感光元件内部一起由感光元件的私钥进行签名。操作系统衍生的元数据（数码变焦倍数、曝光和镜头参数）则从相机系统收集。我们将感光元件签名的承诺（commitment）与这些元数据结合，并使用经 BAA 认证的密钥通过 SEP 进行签名。</p>
<p>我们计算 SEP 签名的 SHA-256 承诺，并将其发送至时间戳服务；该服务返回一个已签名的令牌，以确立该照片的存在时间不晚于该时刻——这是一个上限，用以补充已嵌入图像帧中的下限。如果设备处于离线状态，则上限尚不可用；后台进程会持续尝试发起请求，并在成功后插入该令牌，从而在客观条件允许的情况下提供最紧凑的时间区间。</p>
<p>截至目前生成的所有内容——像素、两份签名、时间戳、元数据、设备清单和安全启动清单——均以 DNG 格式存储在设备上的安全数字底片中，并与来自标准管线常规处理的照片相关联。该底片可以无限期保存在设备中，也可以以这种未显影的状态进行共享，这符合专业摄影师可能需要的工作流程。</p>
<p>当用户发起显影参考图像时，设备会将安全数字底片上传至私有云计算（Private Cloud Compute, PCC）。PCC 重新计算嵌入在图像帧中的摘要，并验证感光元件对像素和该摘要的签名，将证书链回溯验证至感光元件 CA。PCC 还会验证 SEP 签名并将其链接至 BAA CA，同时验证设备清单上的签名并将其链接至在工厂对设备清单进行签名的 CA。随后，它会确认这些证书链中指明的感光元件和 SEP 属于同一台设备。只有在所有这些检查均通过的情况下，处理流程才会继续。</p>
<p>PCC 接下来会检查时间戳。若下限时间戳验证失败，PCC 会将其替换为 2026 年 3 月 31 日，因为该功能在此日期之前并不存在，任何照片都不可能早于该时间。若上限时间戳缺失或无法通过验证，PCC 会将其替换为 PCC 当前的显影时间。</p>
<p>PCC 利用具有隐藏权重的神经网络来计算该照片的置信度得分。这一额外步骤确认了该图像具备我们感光元件原始输出所应具有的物理特征，从而增强了对其真实性的信心。随后，PCC 通过去马赛克、色调映射及相关校正对底片进行显影。处理结果被压缩为 JPEG 格式并进行哈希计算，从而创建对显影后图像的承诺。该哈希值有两个用途：在假设其通过我们剩余检查的前提下，它将成为被签名的值</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-16 12:19 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://security.apple.com/blog/apple-reference-image/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ie-rare-genetic-disorder-3afa4a3e73814db9" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="383" data-content-paragraphs="3" data-published-at="2026-09-16T04:00:12.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-16 12:00</span>
</div>

### [拥有求生意志的女孩：抚养埃尔希——我那亿分之六点一的罕见女儿——所经历的爱、希望与痛苦](https://www.theguardian.com/lifeandstyle/2026/sep/16/love-hope-pain-raising-elsie-rare-genetic-disorder)
<div class="original-title-sub"><span class="orig-tag">原文</span> The girl with a will to live: the love, hope and pain of raising Elsie – my one in 163 million daughter</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/435bf2acfa960176cfe305f8383e5833d6921a37/1493_656_5641_4514/master/5641.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=b335816ab8840a81cee255ccc45c73c4" alt="拥有求生意志的女孩：抚养埃尔希——我那亿分之六点一的罕见女儿——所经历的爱、希望与痛苦" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>她出生时便患有一种极其罕见的遗传性疾病。在从事电影公关行业数十年后，我现在面临着有生以来最重大的战役：为她的生命而战。</p>
<p>我的女儿埃尔希拥有一头美丽的卷发——金色得宛如波提切利画作中的小天使，这让像我这样肤色和发色较深的人艳羡不已。她经常大笑，有着淘气的幽默感，并且全神贯注地吸收着身边的所有声响——沙沙作响的树叶声、大海的声音、狗吠声、孩子们在泳池边玩耍的嬉闹声、我每天早晨模仿闹钟的声音，以及我模仿猴子的叫声。准确地说，是我模仿任何动物的叫声。</p>
<p>声音对埃尔希来说至关重要，因为她有视力障碍，虽然我们知道她有一些周边视力，但在法律层面上已被归类为盲人。因此，她会用舌头来感知周围的环境。当她兴奋时，舌头就会伸出来，品味周围的空气，舔舐靠近她的任何人，以此感知空间。而当她喜欢某种味道时，她会一直把舌头伸在外面，直到你再给她吃一点。我们就是这样知道她喜欢棒棒糖的。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-16 12:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/lifeandstyle/2026/sep/16/love-hope-pain-raising-elsie-rare-genetic-disorder" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-post-veloren-8ca3658da2ea19d0" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5031" data-content-paragraphs="2" data-published-at="2026-09-16T03:47:55.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-16 11:47</span>
</div>

### [Veloren 的一些与众不同之处](https://blog.jsbarretto.com/post/veloren)
<div class="original-title-sub"><span class="orig-tag">原文</span> Some things Veloren does differently</div>

<div class="article-body" data-article-body="true"><p>我是 Veloren 的核心开发者之一。遗憾的是，我现在没有太多时间投入到这个项目中：如果你也是一名人父母，我相信你一定能够理解。<br />在这篇文章中，我想记录 Veloren 在开发过程中做出的一些不同寻常的选择。如果你正在从事游戏开发，或许会发现其中一些颇有趣味。<br />Veloren 基于 ECS（实体组件系统）构建，而非较为传统的面向对象类继承体系。如今——尤其是在 Rust 生态系统中——这种架构已经普遍得多，但当我们在 2018 年启动该项目时，除演示软件外它极少被采用，我们必须在内部发明大量概念才能满足自身需求。<br />我们从这一决定中获得了巨大收益：Veloren 的扩展性远优于大多数多人游戏，在一台拥有 48 个线程的服务器上，连接超过 500 名玩家且游戏世界中有数万个实体相互交互时，它仍能轻松达到 50% 的核心利用率。大多数 MMO 只有通过缩减游戏玩法范围（减少跨实体交互）或在不同世界空间之间对玩家进行激进的分片（sharding），才能达到这样的数字。<br />ECS 确实带来了一些意想不到的古怪问题。在传统游戏引擎中，不同种类的实体在类型层面上通过编译期分支进行隔离，类之间的多态性是针对特定情况的主动选择（opt-in）。而在 ECS 中，多态性是默认特性，实体的分类法反倒成了必须主动选择的事物。这导致了一些有趣的副作用：<br />我们曾经遇到一个漏洞，系统会根据玩家携带的物品为其分配一个 ItemDrop（物品掉落）组件。由于战利品实现方式的更替略有疏漏，导致玩家在靠近其他玩家时能够将其“捡起”。这会使被捡起玩家的实体掉落，从而将其从游戏服务器中踢出。<br />当我们首次实现坐骑系统（角色骑乘马匹等对象的能力）时，循环检测逻辑（防止互相骑乘的实体）和控制传递逻辑（允许骑手向坐骑传递控制指令）都存在缺陷。这意味着玩家可以构建出由彼此骑乘的实体组成的庞大巨塔，甚至创造出骑乘循环，导致物理引擎拼命尝试解决相互矛盾的骑乘约束时，产生令人捧腹的贝塞斯达风格的混乱“风火轮”画面。<br />在最大可能限度内，玩家角色与 NPC 保持完全一致。例如，两者均具备以下特点：<br />以完全相同的方式与物理引擎交互。NPC 无法传送、穿墙或人为操纵其物理属性。如果 NPC 的代理代码在穿越悬崖边缘时不够智能，未能考虑到自身的动量与摩擦力，它们就会跌落下去。<br />拥有完全相同的移动控制选项。所有的移动与控制选项都经过 Controller（控制器）这一 ECS 组件，它相当于一种虚拟游戏手柄。对于玩家而言，Controller 的输入由玩家的键盘、鼠标以及实体手柄提供；对于 NPC 而言，Controller 的输入则由游戏的代理决策树系统提供。<br />受相同的移动控制器代码控制。Controller 输入受限于角色身体的物理能力，并使用完全相同的代码转换为物理引擎的输入。<br />拥有完全相同的技能树与经验系统。在游戏的早期迭代版本中，附近的 NPC 升级时甚至会播放音效！<br />Veloren 是一款体素游戏。通常，体素游戏采用以下几种方法之一来存储其地形数据：<br />大型 3D 体素数组，通过某种哈希表寻址划分为一系列区块（chunks）；<br />RLE（游程编码）压缩的体素数据，通常以区块为单位分组；<br />八叉树（Octrees），整个世界被定义为越来越小的 2x2x2 体素立方体组成的递归树。<br />在实践中，每种方法都存在重大问题。大数组速度快，但几乎没有压缩空间；RLE 仅在体素数据表现为大面积同质块时才能很好压缩，且随机访问性能极差；八叉树则对现代 CPU 缓存极不友好。<br />Veloren 两者皆未采用。相反，它采用了一种我们在内部称之为“chonks”的数据结构（这是“column”（列）和“chunk”（区块）的亲切混成词）。它使用内部的单层索引表，其中 NxNxN 大小的方块组既可以表示为“同质”（自相似），也可以表示为“异质”（每个方块都需要表中的不同索引）。每个 chonk 还被拆分为任意数量的固定尺寸垂直“子区块”，每个子区块相对于垂直原点偏移。总而言之，这是缓存一致性与压缩之间的一个良好权衡，并提供了卓越的随机访问性能。<br />大多数体素游戏（如《我的世界》）会随着玩家的探索而逐步生成更多世界。与之不同的是，Veloren 在启动时以较低分辨率预先生成整个世界，并在玩家接近时利用多种不同的插值和噪声技术“填补”微小细节。<br />这种前置生成步骤意味着 Veloren 能够支持仅靠局部约束求解根本无法实现的复杂世界特征，例如始终向下流淌的长河。<br />此外，我们能够在游戏开始前花时间对世界进行一些模拟，从而生成更有趣的地貌特征。<br />如果你让大多数人描述程序化生成，他们可能会说诸如“随机的游戏内容”之类的话。这完全本末倒置了：程序化生成的本质在于定义游戏元素之间的约束关系，以此拨动人脑习惯性的模式匹配倾向。<br />最优秀的程序化生成系统绝非通过在组合空间中漫无目的地随机漫步来在世界中编织复杂的叙事脉络，而是通过确保自洽性。如果你发现了一条河流，你就应该能够走到它的源头。如果你遇到一只怪物，你就应该能够找到它的巢穴。如果你击杀了这只怪物，附近城镇的居民谈论你角色的方式就应该发生改变。<br />优秀的程序化生成系统几乎不需要随机性，因为随机性是玩家带入游戏的东西：程序化生成器的目的正是抵消这种随机性，并将其强制约束为一个具有因果后果的自洽系统。<br />这种低分辨率预生成步骤的另一个优势在于，我们能够为远距离地形生成精确的 LoD（细节层次）替代模型，即使在低性能硬件上也能实现几乎无限的视距。<br />大多数体素游戏重度依赖目的论式的程序化生成（teleological procedural generation）。这种生成哲学侧重于美学输出：色彩在艺术上是否协调？山脉是否足够引人入胜？世界看起来是否“顺眼”？这种哲学常用的技术包括程序化噪声或类似波函数坍缩（Wave Function Collapse）的半随机算法。</p>
<p>相反，Veloren 更严重地依赖顶层本体论程序化生成（top-level ontological procedural generation）。我们没有将重点放在输出结果上，而是致力于定义一个世界的内部模型，重现物理过程的输入，并进而模拟它们对世界产生的影响。<br />这方面最明显的例子就是我们基于物理的水力侵蚀模型，正是它造就了这款游戏闻名遐迩的多山地形与复杂河流系统。<br />另一个例子是我们的程序化路径生成器，它采用一种简化的遍历成本模型，以在不同地点之间找到高能效的路线。<br />我相信，Veloren 许多程序化元素的物理仿真特性，正是赋予 Veloren 连贯一致以及“浩瀚宏大”（bigger-than-you）沉浸感的关键所在。<br />Veloren 在完成初始世界生成后，并不会停止物理仿真。该游戏内置了一套名为“rtsim”（实时模拟，Real Time SIMulation）的内部世界模拟系统，该系统利用前述的低分辨率世界数据持续模拟整个世界，即使附近没有任何玩家也是如此。<br />世界上每一个 NPC 在 rtsim 中都有一个对偶实体（dual）。当一名 NPC 离开玩家的有效视距时，他们并不会被销毁（despawn）：相反，他们会被纳入 rtsim 中，游戏会继续追踪他们的移动，并模拟其高级决策树逻辑的效果。<br />Rtsim 正逐渐成为 Veloren 中一个日益复杂的组成部分，游戏中许多更有趣的动态机制现在都驻留其中：任务模拟、阵营动态，甚至游戏经济系统的一些要素，现在都在游戏运行过程中由它追踪。例如，玩家可以观察到海盗和流窜强盗在周游世界时对据点发动的袭击。NPC，尤其是商人，也会在世界各地迁徙。<br />Rtsim 具备横向扩展的能力：绝大多数 Veloren 世界包含数以万计的 NPC，而 rtsim 能够同时对它们全部进行追踪。<br />我们在游戏设计初期为自己设立的一项限制，就是避免设置“隐形空气墙”：这些阻碍可能是物理层面的，比如游戏世界地图边缘的边界；也可能是概念层面的，比如游戏出于任意武断的理由拒绝允许世界上两个元素发生交互。<br />施加这一限制给游戏平衡性以及玩法元素之间的合理交互设计带来了巨大难题。例如，当一个恶作剧玩家决定将一个强大的 Boss 从地牢引诱到附近的城镇时，游戏究竟应该如何应对，目前尚无定论。但是，Veloren 允许你这样做，而这一限制促使我们采用防御性思维来设计游戏系统，并预料到它们可能不得不在极其异常的情况下继续运转。<br />许多游戏为了性能或艺术表现的考虑，决定将世界划分为不同的区域，并用加载界面将它们隔开。Veloren 则选择完全避免这种做法，将所有玩法元素放置在同一个物理世界空间中。<br />导致这一设计产生复杂性的游戏特性之一，便是穿梭于地底错综复杂的洞穴系统。这个洞穴系统有时深达地表以下一公里，并且往往有许多层深度，因此当玩家脚下存在庞大的洞穴网络时保持游戏性能一直是一项挑战。<br />在此处需要解决的一个出人意料的难题是光照。Veloren 拥有比大多数体素游戏丰富得多的光照模型，支持烘焙体素光照、点光源、定向阴影贴图、反射、环境光模型、体积雾和体积云（两者都会导致光散射）等。确保来自地表的光照信息即使在正午也不会漏入最深的洞穴，这一过程复杂得异乎寻常：闪电等全局效果往往会通过阴影贴图泄漏环境光数据，并且即便小心翼翼地进行了隔离，也会出现在屏幕空间反射中；我们耗费了大量时间来确保从玩家视角正确考量这些效果的可见性。<br />CosmicHorror | 2026-09-16 02:55:48 UTC<br />@jsbarretto 读起来非常愉悦。多谢！提个微不足道的小意见：我建议把“Instead of focussing on outputs, the focus is instead on”里的第二个 instead 去掉。<br />现在该去焦油坑里玩玩了 😁<br />Joshua Barretto | 2026-09-16 05:39:12.406 UTC<br />@CosmicHorror 哎呀！我平时尽量避免用词重复，不过看来还是漏了一个。<br />Lesley Lai | 2026-09-16 04:34:16 UTC<br />Joshua Barretto | 2026-09-16 05:43:33.321 UTC<br />@lesley @veloren 内部实现的代码注释相当完善：https://docs.veloren.net/src/veloren_common/volumes/chunk.rs.html<br />这里是处理垂直偏移的外部实现：https://docs.veloren.net/src/veloren_common/terrain/chonk.rs.html<br />Josh Simmons | 2026-09-16 07:41:50 UTC<br />@jsbarretto @veloren 出于好奇，你们设定的 tick rate 是多少？10Hz？20Hz？你们有大型服务器的帧追踪数据吗？<br />Joshua Barretto | 2026-09-16 07:44:11.652 UTC<br />@dotstdy @veloren 服务器端为 30 Hz，客户端为 60 Hz。你可能会对官方服务器仪表板上的指标感兴趣：https://grafana.veloren.net/d/dZe0qIg7z/gameserver?orgId=1&amp;from=now-6h&amp;to=now&amp;timezone=browser&amp;var-Server=gameserver&amp;refresh=1m<br />DaforLynx VGM | 2026-09-16 08:17:17 UTC<br />@jsbarretto “In previously iterations of the game”大概应该写成“In previous iterations of the game”。另外还有几个错别字。<br />我都忘了那个玩家被抱起的事件了。那大概是有史以来最搞笑的故障之一了，鉴于 ECS（实体组件系统）完全在按预期运作，你甚至都不能称它为 glitch，XD。<br />关于 NPC 升级时播放升级音效的那段让我想到——现在 NPC 还会获得经验吗？<br />另外我很喜欢你关于程序化生成与随机生成对比的题外话。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-16 11:47 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.jsbarretto.com/post/veloren" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--rust-coreutils-complete-9f4895a907944ad7" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="990" data-content-paragraphs="11" data-published-at="2026-09-16T03:39:05.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-16 11:39</span>
</div>

### [要闻：Ubuntu 26.10 完成了该发行版向基于 Rust 的核心实用程序（coreutils）的过渡，此前因安全](https://www.omgubuntu.co.uk/2026/09/ubuntu-2610-rust-coreutils-complete)
<div class="original-title-sub"><span class="orig-tag">原文</span> Ubuntu 26.10 completes transition to Rust-based coreutils</div>

<div class="article-body" data-article-body="true"><p>Ubuntu 26.10 完成了该发行版向基于 Rust 的核心实用程序（coreutils）的过渡，此前因安全问题被暂缓替换的命令现已全部迁移至内存安全版本。</p>
<p>在 Ubuntu 26.04 LTS 中，cp、mv 和 rm 因 uutils 版本中出现的一批待修复的 TOCTOU（检查时间到使用时间，time-of-check to time-of-use）漏洞，而继续保留了 GNU 版本。</p>
<p>随着这些问题在上游得到解决，Ubuntu 26.10 完成了这项收尾工作。代号为“Stonking Stingray”的版本搭载了完整的 Rust 核心工具集，涵盖 ls、cat、chmod 和 du 等常用命令行工具。</p>
<p>Canonical 每年捐助 4 万欧元资助 Rust 软件研发</p>
<p>Canonical 的工程师于 2025 年开始对该发行版进行“氧化”（oxidising）改造——即用 Rust 替代方案替换底层软件。Canonical 认为这样做能带来显著的安全收益，因为 Rust 能够在编译期捕获内存错误，而 C 编译器无法做到这一点。</p>
<p>Ubuntu 25.10 是首个搭载基于 Rust 的实用程序的发行版，并默认采用了 Rust 版本的 sudo。</p>
<p>迁移过程并非一帆风顺，但 Canonical 始终保持严谨审慎。</p>
<p>在 26.04 发布之前，Canonical 委托对 uutils 进行了安全审计，正是这次审计发现了导致上述三个命令暂时保留 GNU 版本的问题。同时，Canonical 还是 Trifecta Tech Foundation 的金牌赞助商，每年提供 40,000 欧元以资助其 Rust 软件项目。</p>
<p>该非营利基金会目前正在推进网络时间协议（NTP）的 Rust 重写工作，Ubuntu 计划在 27.10 之前将其作为默认的时间同步客户端。</p>
<p>在此背景下，coreutils 迁移的完成对终端用户而言并没有功能上的差异。基于 Rust 的 uutils 致力于实现与 GNU 版本的直接兼容替换，并将任何行为差异视作缺陷。这是设计使然；其根本目的在于提升安全性。</p>
<p>Ubuntu 26.10“Stonking Stingray”的 Beta 测试版将于本月晚些时候发布，随后将于 2026 年 10 月 15 日发布正式稳定版。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-16 11:39 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://www.omgubuntu.co.uk/2026/09/ubuntu-2610-rust-coreutils-complete" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-projects-jdk-27-b68053757c42701b" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="290" data-content-paragraphs="3" data-published-at="2026-09-16T03:17:56.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-16 11:17</span>
</div>

### [JDK 27 已正式发布](https://openjdk.org/projects/jdk/27/)
<div class="original-title-sub"><span class="orig-tag">原文</span> JDK 27 has been released</div>

<div class="article-body" data-article-body="true"><p>本版本是由 Java 社区进程（Java Community Process）中的 JSR 402 所规范的 Java SE 平台版本 27 的参考实现（Reference Implementation）。</p>
<p>该版本的特性和发布计划是通过 JEP 流程（由 JEP 2.0 提案修订）进行提案并跟踪的。该版本是采用 JDK 发布流程（JEP 3）构建生成的。</p>
<p>JDK 27 已于 2026 年 9 月 15 日达到通用可用（General Availability）状态。基于 GPL 许可的生产就绪二进制文件已可由 Oracle 处获取；其他厂商的二进制文件也将在不久后推出。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-16 11:17 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://openjdk.org/projects/jdk/27/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::