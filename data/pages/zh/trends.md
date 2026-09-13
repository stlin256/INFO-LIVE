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
<div id="story-ppy-lint-faster-by-3133x-aafc36eb77661332" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2039" data-content-paragraphs="32" data-published-at="2026-09-12T20:29:09.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 04:29</span>
</div>

### [将单个 Rust Clippy Lint 的性能提升 3133 倍](https://blog.goose.love/posts/making-a-clippy-lint-faster-by-3133x/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Optimizing a single Rust Clippy lint by 3133X</div>

<div class="article-body" data-article-body="true"><p>如果你想直接钻研代码，可以在这里查看。</p>
<p>clippy::nonstandard_macro_braces 是一个用于捕获使用了错误括号的宏调用的 Clippy lint。</p>
<p>在 Rust 中，如果你想实例化一个空向量（vector），可以调用 vec 宏 vec![]。然而从技术层面上讲，没有什么能阻止你写成 vec!()，甚至是 vec! {&quot;???&quot;}。</p>
<p>但是，大家都很讨厌这种写法。每个人都讨厌 println! {}。</p>
<p>因此，Clippy 提供了一个完美的 lint，避免你成为社区里的新手小白。这就是前面提到的 clippy::nonstandard_macro_braces，它硬编码了一些常见宏及其符合惯用法（idiomatic）的括号形式。</p>
<p>现在的问题是，Clippy 是在宏展开（macro expansion）之后运行的。这意味着，例如 Clippy 看到的并不是 println! {&quot;...&quot;}，而是：</p>
<p>花点时间看一看它。</p>
<p>从这段代码片段来看，括号究竟保存在哪里？我相信你非常聪明，但这也正是你为什么搞错了的原因。</p>
<p>我们根本不可能知道当时使用的是什么括号——无论如何，在一个宏展开后的 lint 中是无法获知的。Rust 并没有真正明确定义的宏调用映射表（callmap），这也许是 Clippy 必须面对的最大痛点。</p>
<p>所以我们首先开始调查，正如你所料，检查我们是否处于宏展开之中。Rust 有时知道当前的标记（tokens）是否来自宏展开。</p>
<p>好的，现在剩下的唯一一件事就是用以下公式向上追溯调用链：</p>
<p>现在我们要耍一些源码文本技巧，根据 hygiene 数据中的宏展开情况来获取该源码跨度（span）的原始文本。</p>
<p>因此，我们得到了以下内容：</p>
<p>查看保存 hygiene 数据的同一个会话全局变量（session globals），我们可以查看从“文件 src/main.rs，第 1 行，第 16 列”到“文件 src/main.rs，第 1 行，第 32 列”的源码跨度。那一行对应的就是这个字符串：</p>
<p>而且，如果我们进行一些字符串操作（按 ! 分割字符串，去除第二部分的空白字符，然后查看第一个字符是否为 [、( 或 {）。我们终于找出了它用的是什么括号！</p>
<p>于是，我们调用了两次 hygiene 数据函数，锁定了符号留用池（symbol interner，一个将代码标识符转换为字符串格式以便于比较的系统），并且进入了一个递归循环。</p>
<p>针对每一个单独的表达式都是如此。</p>
<p>你的怀疑是对的，我们对你整个代码库中的每一个表达式、语句和条目（item），都在调用所有这些代码。</p>
<p>这意味着我们正在调用会话全局变量（这实际上会阻塞编译器中的其他所有操作），并且锁定了符号留用池（这会拖慢编译器中的其他所有环节）——几乎是针对你代码中的每一个逻辑单元都这么做。</p>
<p>我想在这里澄清一点：这并不是某一个人因为失职或恶意而犯下的错误。归咎于贡献者从来都不是正确的做法。</p>
<p>这是我们这些维护者的责任。我们的职责是尽可能让写出糟糕的代码变得困难。</p>
<p>Rust 已经为我们完成了最困难的部分，我们可以不去考虑缓冲区溢出或释放后使用（use-after-free）错误（或者至少在我们不做古怪操作的情况下，这类问题不会频繁出现）。</p>
<p>是的，这有时意味着要写更多的代码。是的，这意味着不要使用那么多的宏。而这绝对意味着不要把抽象一路推向疯狂，以至于一个看似无害的函数（作为一个贡献者，你现在可能已经看过了上百次）占用了 Clippy 运行时间的 25%。</p>
<p>作为开源维护者，我们有三项职责：</p>
<p>看来，如果有代码蒙混过关，那就是我们没有尽到职责。</p>
<p>修复方案是什么？不到 200 行代码。我只是将这个有问题的函数从宏展开后的 lint 重写成了宏展开前的 lint。</p>
<p>再也不用去获取源码文本并用数学方式计算括号跨度了。再也不用锁定符号留用池，也再也不用锁定会话全局变量了。</p>
<p>唉~，我知道，如果你对 Clippy 有所了解的话，就知道 lint 都是在宏展开后运行的。宏展开前的代码是不可信的，它会欺骗你。归根结底，这是一种权宜之计（hack）。但这是一种能节省数十万美元算力开销的权宜之计。</p>
<p>Clippy 现在拥有了一台基准测试服务器。是的，我尝试搭建这样一台服务器已经快 4 年了，如今终于完成了。感谢 Rust 基金会与我签约合作，让我得以大幅扩展我的工作规模。现在我们拥有了一台带有 200 天内存周期的基准测试服务器。</p>
<p>它完全是自建自管的，至少在某种程度上是这样。而且也是在本地环境下进行基准测试的，因此测试数据可能会非常接近真实的用户体验（我使用的是一种非常普遍的 CPU 架构）。</p>
<p>如果你想了解更多关于这套配置的细节，可以给我发邮件。</p>
<p>感谢阅读，期待下次 Clippy 再次迎来革新时与大家再会（或者说不定是别的什么东西……）。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-13 04:29 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.goose.love/posts/making-a-clippy-lint-faster-by-3133x/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-2-reactive-dataflow-html-68468b55d82018f3" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="4849" data-content-paragraphs="34" data-published-at="2026-09-12T19:45:31.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 03:45</span>
</div>

### [利用响应式数据流管理复杂的应用状态](https://yogthos.net/posts/2026-09-12-reactive-dataflow.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Managing Complex Application State with Reactive Data Flows</div>

<div class="article-body" data-article-body="true"><p>在小型应用中，响应式用户界面（Reactive UI）往往显得非常简单，你无需费太大功夫就能保持各部分状态同步。然而，一旦应用开始扩张并累积实际的业务逻辑，麻烦就随之而来。你通常会面对一系列依赖于衍生值的级联规则。不仅如此，部分数据必须流向外部服务，同时又有更多数据从这些外部服务持续流入你的应用。任何构建过此类应用的人都知道，当用户忙于在界面上点击操作并输入数据时，要确保所有这些数据保持一致性绝非易事。</p>
<p>好消息是，我们可以借助四个构建块来分解这一问题。Datastar 和 glimmer 为我们提供了一种简单的方式来构建响应数据变化的响应式 UI。Domino 提供了承载全部业务逻辑的事务型数据流引擎。而 Ebb 则为我们提供了一种清晰优雅的方式来协调系统内外的双向数据流。</p>
<p>所有这些组件恰好能以一种极其严谨的方式契合在一起。Ebb 位于系统边缘，负责协调传入系统的外部事件。这些事件在 Domino 中进行事务化处理，并在其中计算出所有衍生值，随后 glimmer 的响应式原子（reactive atom）根据生成的最终状态驱动 UI 更新。用户输入则反向流动，从 UI 进入 Domino，经过事务化处理后触发副作用，再通过 Ebb 流出系统外部。</p>
<p>Ebb 最终充当了一个服务总线的角色，能够访问外部资源，例如数据库、外部 API，或者应用需要接入的发送电子邮件和生成 PDF 等功能。这些都是位于应用边缘的数据流，是你希望将其与核心业务逻辑隔离开的部分。</p>
<p>它是 Missionary JVM 库的一个移植版本，后者严重依赖 Java 生态来完成底层繁重工作。虽然这使得直接使用 Missionary 变得不可能，但 Jolt 的纤程（fibers）恰好在概念上与 Missionary 的运作机制非常契合。Ebb 在 Jolt 纤程之上用纯 Clojure 实现了 Missionary 的 API，并通过了 Missionary 自身的测试套件。拥有真正的纤程甚至在一个方面优于原版：Missionary 的 ? 操作符只有在语法上位于进程主体内部时才能挂起（park），因为它依赖的协程变换是词法层面的；而每个纤程都携带真实的调用栈，因此在 Ebb 中，函数可以在任意调用深度进行挂起。</p>
<p>Missionary 背后的核心理念是提供一个受监督的数据流编程库，将异步副作用视为可组合的值。它通过将任何已分配资源的确切生命周期与消费者实际需要该数据的周期紧密绑定，解决了并发应用中时间与状态的协调难题。这是通过一种有向无环图（DAG）监督模型实现的，在该模型中，共享依赖项在首次请求时分配，并在最终释放时销毁。</p>
<p>这种方法的最大优势在于彻底消除了长期困扰响应式软件开发的内存泄漏与状态不一致问题。由于该架构对异步事件流如何以及何时保活强制执行了严格的边界，你永远不必担心孤立的 WebSocket 连接或僵尸线程消耗系统资源这类问题。当一个组件卸载时，所有依赖资源都会被递归清理，这为连续时间响应式编程提供了数学上严密可靠的基础。</p>
<p>Missionary 设计中一个有趣的方面在于它使用了双向流协议，允许生产者和消费者进程协商背压，以便在触发开销昂贵的重新计算之前使陈旧数据失效。本文末尾的仪表板示例通过两条数据通道读取一个生产者，对比了处理背压的两种方式。</p>
<p>相比之下，通道 B（Lane B）根据每单位需求拉取一行数据，因此当消费者变慢时，操作系统管道会被填满，导致生产者停顿。在这种场景下，背压停留在数据源端，从而保证数据值不会丢失。</p>
<p>Missionary 所采用的数据流模型恰好与用于管理应用状态的 Domino 完美契合。描述数据模型的文档位于 Domino 的核心，用于跟踪与应用数据关联的所有字段。业务逻辑构建在数据模型之上，通过将无上下文函数挂载到文档内的各个路径上来作为规则运行。只要声明为其输入的路径上的值发生变化，规则就会被触发，并且这些规则会在一个事务中级联执行，生成文档的新状态。一旦文档事务完成提交，便可以触发副作用，将数据移交给由 Ebb 管理的流层。</p>
<p>我倾向于将应用程序视为一个状态机，这正是 Domino 设计背后的核心思想。一个事件被触发——它可以是用户输入、系统事件、服务调用或任何其他事件——并作为输入送入数据流引擎。规则以级联方式相继触发，最终你会得到一个新状态。随后你就可以触发副作用、更新用户界面等等。</p>
<p>在这里，我们可以通过演示仪表板具体观察到其运作机制。一个采样数据作为单次事务落入文档的 [:sample] 路径中，从而触发规则的级联执行。事件被声明为数据，每个事件都明确声明了它所读取和写入的路径，从而能够计算出依赖关系图。</p>
<p>这个事件向量同时也是该应用功能的规范（spec），清晰阐明了从原始采样到警报级别所触发的每一条业务规则。阈值和时间窗口连接到了滑动条上，拖动滑动条即可在没有新采样到达的情况下重新运行相同的纯事件。值得注意的一个细节是，Domino 对每个发生变化的输入路径仅运行一次事件，这就要求处理程序必须具备幂等性。</p>
<p>借助 Domino，你便获得了一个用于管理应用程序状态的事务型数据流引擎。输入进来，事务执行，输出产生。真正的优势在于能够确切知晓文档中所有字段与关联业务规则之间的关系。我发现在我参与过的大多数大型应用中，这才是真正的业务痛点：你最终会拥有大量业务逻辑以及众多衍生字段，它们之间错综复杂的关系庞大到让人无法在脑海中理清。随后有人提出要增加一项新的业务规则，而你根本无法保证加入这项新规则不会破坏系统内的其他规则。</p>
<p>税收和贷款就是非常典型的例子。有一大堆项目需要共同计算，而且随着法律更新，公式也会随时间发生变化，因此你必须为每种场景维护清晰的规则集。当这些计算逻辑分散在代码库的各个角落时，你就很难看清某项更改会影响到哪些部分，也很难证明更改后规则依然保持一致。</p>
<p>我拥有直接工作经验的另一个场景是在医院，那里的患者数据需要在不同团队之间进行协同。一款用于术前患者评估的应用程序需要协调护士、外科医生、营养师和其他临床工作人员之间的数据。最终你会面对包含数百个不同字段的大型表单，这些字段随后被用来计算术前评估的分数。没有人能把这一切全装在脑子里，而且每个字段都可能影响最终结果，因此确保评分推导正确至关重要。</p>
<p>Domino 的方法使业务逻辑具备了可复用性和可组合性，因为规则函数和 UI 组件都是无上下文的（context free）。如果你写了一个计算 BMI 的公式，该公式就会成为一个积木块，你可以将其附加到代表身高和体重的任意两个字段上，并附带一个用于输出 BMI 的字段。表格组件可以收集多行信息，而图表组件可以附加到同一路径并渲染随时间变化的趋势。</p>
<p>Domino 还允许你创建附加到 schema 的视图，这些视图用于将文档中的字段映射到 UI。如果你有两种角色，比如护士和外科医生，他们可能关心文档中数据的不同子集，并且这些子集很可能会重叠。能够附加具有各自组件、命名规范和显示字段的不同视图，使得根据上下文以不同方式表达相同的底层数据变得轻而易举。由于视图仍然通过针对整个文档的通用事务（transact）机制运行，因此无论这些值是否出现在特定视图中，它们都会被重新计算。护士可能正在收集患者的身高和体重，而医生只关心计算得出的 BMI。因为护士无需看到 BMI 就能让其完成计算，所以视图中显示的内容与仍然需要触发的业务规则没有直接关系。无论你是否向用户展示某条数据，整个文档中的业务逻辑都必须保持一致。</p>
<p>这种方法解决的另一个问题是并发多用户工作流。因为你预先知道受任何规则集影响的字段子图，所以每当用户正在编辑属于该集合的字段时，你都可以将这些字段锁定在一起。不同的用户可以安全地处理文档的不同部分，而不必担心覆盖彼此的数据。当用户编辑时，相关字段保持锁定状态，一旦他们完成编辑，逻辑就会以事务形式应用。</p>
<p>这就剩下了最后一块拼图，即界面本身。Glimmer 是一个响应式 GUI 工具包，你可以在其中编写返回 hiccup 格式的 Reagent 风格组件。它的唯一工作就是在响应式状态发生变化时保持组件树同步，而 glimmer-datastar 则在 glimmer 之上实现了 Datastar 协议的服务端。页面保持着一个打开的服务器发送事件（SSE）流，只要状态发生变化，服务器就会重新渲染该片段并将其推送出去。浏览器始终是一个哑终端，所有的业务逻辑都存在于服务器端。</p>
<p>在我参与过的几乎所有大型应用程序中，我发现你总是希望将应用状态保存在一个地方。要么它完全存在于前端，后端被当作服务总线；要么它完全存在于后端，客户端仅负责收集输入和显示 UI 组件。将状态割裂在两端意味着双方必须不断就谁拥有什么进行协商，从而成为隐蔽 Bug 的根源。</p>
<p>页面本身随后就只是该快照的一个函数。</p>
<p>我搭建了一个仪表盘，将所有这些想法整合在一起。它是一个实时系统监控器，用于渲染来自 /proc 的 CPU、内存和网络数据，因此页面可以展示机器当前正在执行的操作。</p>
<p>每一层都位于其自己的命名空间中，它们的划分遵循了我上面讨论的架构。在最底层我们有 app.pipeline，这是拥有可以休眠、需要重试或被取消的数据流的 Ebb 层。app.state 由位于数据流和 UI 之间的 Domino 层管理。最后，app.ui 从发布的快照中渲染 hiccup 并将其交给 Datastar。</p>
<p>每个样本作为一个单独的 Domino 事务到达，从那里级联展开：从原始样本到窗口统计数据，再到综合压力指数，最后到警报级别。“级联”（Cascade）面板按照执行顺序列出了上一事务写入的路径。“模型”（Model）面板直接从 schema 绘制事件图以渲染实际的业务逻辑。“日志”（Log）面板将 Domino 事务与 Ebb 任务生命周期事件交织在一起，以展示应用运行时各层之间的管道连接。</p>
<p>值得注意的是，Domino 的副作用（effects）本身从不执行 IO。相反，副作用会将请求投递到 Ebb 邮箱中，该邮箱由派生相应任务的主管纤程（supervisor fiber）进行消费排空。然后，每个任务在完成时将其自身的结果以事务形式写回文档。实时上下文保存在一个 glimmer ratom 中，允许每个连接的页面在模型发生变化时重新绘制。</p>
<p>请求发送警报的副作用在状态转换时触发，以便将请求投递到总线上。</p>
<p>在 Ebb 中，向邮箱投递操作会直接将值交给等待中的消费者，并在投递线程上运行它，直到其再次挂起（park）。副作用在持有写锁的事务内部触发，而主管的处理程序也会发起事务，因此内联投递会导致两端相互死锁。因此，请求必须在事务期间收集，并在锁释放后投递。</p>
<p>主管纤程位于总线的另一端，负责消费请求并将其转化为任务。</p>
<p>下方的警报调用接收端（sink），并在接收端持续拒绝时以线性退避重试，将每次尝试写回模型中。接收端的故障率本身就是一个滑块，因此可以按需进行重试演练。</p>
<p>整个任务在达到配置的尝试次数后也会放弃，而取消的警报意味着级别已恢复，或者有较新的警报替换了当前的警报。</p>
<p>用户输入被视为进入系统的又一个事件。每个滑块都会向文档中事务性地写入新值，以触发规则和副作用。</p>
<p>更改采样间隔会事务性更新 interval-ms 控件，其副作用会要求主管取消通道 C 并以新的速率重新派生它。</p>
<p>我喜欢这种架构的地方在于，每个部分最终都承担着明确界定的职责。Ebb 掌控时间和取消，Domino 掌控描述业务逻辑的规则，而 UI 仅负责渲染在任何特定时间恰好处于的状态。业务逻辑存在于一个事务性文档中，其中每个依赖项都被显式声明，使其清晰而透明。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-13 03:45 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://yogthos.net/posts/2026-09-12-reactive-dataflow.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-g-a-few-good-ideas-in-pl-42df73899de20b82" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1576" data-content-paragraphs="20" data-published-at="2026-09-12T18:19:16.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 02:19</span>
</div>

### [编程语言中的几个绝妙设计](https://prydt.xyz/blog/a-few-good-ideas-in-pl/)
<div class="original-title-sub"><span class="orig-tag">原文</span> A Few Good Ideas in Programming Languages</div>

<div class="article-body" data-article-body="true"><p>作者：Pranoy Dutta</p>
<p>以下仅是我非常喜爱的几项编程语言特性：</p>
<p>我最早在 Crystal 语言中接触到的一个绝妙构想，就是流敏感类型（flow typing）。</p>
<p>Crystal 是一门采用静态类型检查的编译型编程语言，其语法与 Ruby 极为相似。与我使用过的大多数静态类型语言不同，Crystal 能始终保持动态类型语言的使用体验，关键在于变量在其整个生命周期中可以被赋予多种类型。以下是一个示例：</p>
<p>这里最有趣的地方在于，有时 my_var 只是一个 Int32，而在某个作用域内它必定是一个 String，接着在另一处，编译器实际上无法确定它究竟是哪一种类型……因此它的类型就成了所有可能性的联合类型（union）。此时，如果你尝试对 my_var 调用 String 的方法，就会报错，因为它不是单纯的 String，而是 Int32 | String，编译器会强制你添加类似于 if my_var.is_a?(String) 的检查，从而将可能的值类型收窄（narrowing）为 String。</p>
<p>这是一个绝佳的范例：通过精妙的类型推导，使编译型语言拥有动态语言的手感，同时无需付出多少运行时开销。</p>
<p>TypeScript 同样具备流敏感类型和类型收窄特性！</p>
<p>Rust 是一门在不依赖垃圾回收机制的前提下保证内存安全的系统编程语言。</p>
<p>在并发程序中，有一大类臭名昭著的内存安全缺陷——数据竞争（data race）：即多个线程在缺乏同步机制的情况下，同时读写同一块内存地址。</p>
<p>借用检查器（borrow checker）正是 Rust 能够在编译期静态杜绝数据竞争的核心机制。它强制执行以下规则：</p>
<p>这或许会让你联想到读写锁（readers-writer lock）——一种允许多个读取者或单个写入者的锁机制。这是因为要防止数据竞争，我们只需要针对写操作来同步读操作。并发同步的本质，就是对特定内存地址的写入操作进行串行化。</p>
<p>我非常喜欢借用检查器，因为它以如此优雅的方式化解了数据竞争问题，并且它是一种零成本抽象（zero-cost abstraction），其代价仅限于编译期检查以及由此引入的额外复杂度。复杂度的增加确实是一种客观存在的权衡，但如果你在编写并发程序，这种复杂度本就是该领域固有的挑战。</p>
<p>如果你写过不少程序，大概接触过不起眼的 assert（断言）语句，它用于在特定不变式（invariant）未被满足时抛错或告警。每个程序都有其必须维系的不变式。诸如“这个日期永远晚于另一个日期”或“这棵树始终保持平衡”。</p>
<p>D 语言（一门被严重低估的语言）支持契约式编程（contract programming），它从语法层面对描述函数级或对象级的更复杂不变式提供了支持。</p>
<p>D 语言拥有标准的 assert 语句：</p>
<p>但 D 语言还提供了 enforce，用以在语义上作出区分。assert 用于程序内部不变式遭到破坏的情况。如果触发了 assert，应被视为我们程序本身存在正确性缺陷（bug）。相比之下，enforce 则用于因外部问题引发的异常抛出：例如用户输入越界或环境异常等。</p>
<p>此外，D 语言还在语法上支持函数的前置条件和后置条件。以下是摘自《Programming in D》的一个示例：</p>
<p>在此例中，daysInFebruary 函数包含一个后置条件，即其返回值只能是 28 或 29；其他任何结果都必定是该函数内部的逻辑错误。</p>
<p>最后，D 语言还具备类级别的不变式，用于确保对象数据始终保持一致。以下是一个将所有特性融会贯通、稍微复杂一点的示例：</p>
<p>与在每个类方法的开头和结尾都调用某种一致性检查函数相比，这种 invariant() 块不仅干净得多、更易于维护，而且具备地道规范的语义表达。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-13 02:19 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://prydt.xyz/blog/a-few-good-ideas-in-pl/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-tate-of-security-in-2026-4d0d9340449db07e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="881" data-content-paragraphs="8" data-published-at="2026-09-12T17:24:59.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 01:24</span>
</div>

### [gpg.fail 的余波：谈负责任披露、GPG 以及 2026 年的安全现状 [32:37]](https://media.ccc.de/v/2026-728-the-gpg-fail-aftermath-on-responsible-disclosure-gpg-and-the-state-of-security-in-2026)
<div class="original-title-sub"><span class="orig-tag">原文</span> The gpg.fail aftermath: On responsible disclosure, GPG, and the state of security in 2026 [32:37]</div>

<div class="article-body" data-article-body="true"><p>2025年，我[演讲者]在最广泛使用的 PGP 实现——GPG 中发现并披露了一批漏洞，并在 39C3 上就此发表了演讲。其中一些漏洞最终得到了修复。本次演讲将讲述一路走来的冒险历程及后续影响，展示一些全新的漏洞，并探讨 2026 年的安全现状。可能包含零日漏洞 =)</p>
<p>在 2025 年 5 月之前，我很喜欢 PGP 和 GNU Privacy Guard。我在空闲时间经常研究它。直到有一天，情况突然发生了变化——我不经意间触碰到了禁区，最终发现了一个漏洞：只要天真地直接使用 GPG 工具打开，就可以轻而易举地伪造 PGP 签名。</p>
<p>快进几个月，这一个漏洞演变成了多个独立的漏洞，甚至涉及基础 PGP 消息解析器中的内存损坏，几乎影响了所有与 PGP 相关的工作流。</p>
<p>我在 2025 年 12 月 39C3 举办前几周披露了这些漏洞。尽管部分漏洞（例如消息解析器中的内存损坏）得到了妥善处理，但并非所有漏洞都是如此。</p>
<p>例如，我最早发现的漏洞之一（曾作为 39C3 演讲引言部分的切入点）至今仍未修复。GnuPG 的主要开发者 Werner Koch 并没有通过代码来修复它，而是发表了一篇博文，声称这一被广泛使用的功能是“有害的”；尽管他们提前几周就已知晓，却选在 39C3 开幕当天发布了这篇文章，甚至没给我们留下回应的时间。</p>
<p>随后引来了一些不满的评论，但很大一部分缺陷仍然没有得到解决，我将在演讲中进行现场演示。这个特定的演示不会利用任何零日漏洞（那些稍后登场）；我们将展示他们拒绝解决的这些“搬起石头砸自己的脚”的设计缺陷到底有多严重。</p>
<p>此外，我还将展示 GPG 的几个全新漏洞。虽然不像上次那样具有震撼性，但都是一些精巧的缺陷，它们本就不该进入生产代码，这足以反映出 GnuPG 代码库的现状。</p>
<p>演讲最后将对安全现状和负责任披露进行整体评述，并探讨安全领域的 AI/大语言模型（LLM）话题（以部分 gpg.fail 漏洞为例）；探讨这对于安全研究人员、普通人和软件开发者意味着什么（剧透：无论是终端用户还是安全研究人员都不会面临末日）。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-13 01:24 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1940" data-content-paragraphs="11" data-published-at="2026-09-12T17:24:07.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 01:24</span>
</div>

### [无论如何，去创作吧](https://www.joelotter.com/posts/2026/09/make-it-anyway/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Make it anyway</div>

<div class="article-body" data-article-body="true"><p>2026年9月11日 游戏、开发、随笔</p>
<p>这周我整个人有点崩溃了。不是那种声势浩大、戏剧性的爆发，而是一场内爆，一种自我的坍塌——我的决心和动力彻底瓦解，碎成了一团浆糊，就像把纸巾扔进了洗衣机搅碎后的模样。现在我已经感觉好些了，我想把自己的心路历程记录下来，以防其他人也正在经历同样的困境，特别是——也许也是挺令人悲哀的——为了提醒未来的自己。</p>
<p>至于造成这一切的原因，我想任何身处创意领域的人都会感到无比熟悉：没错，又是生成式人工智能（Generative AI）。创作者和艺术家的劳动成果正在经历持续的贬值，被生吞活剥后再反刍吐回给我们，就如同一只母鸟以订阅制的模式给幼鸟喂食一样。我对从事其他艺术领域的朋友们尚存一线希望；AI艺术简直糟糕透顶，从定义上讲它某种程度上就是“反艺术”的，看在眼里令人尴尬，与它沾上关系更是让人脚趾抠地。我希望这种局面能继续保持。但在我主要涉足的编程领域，情况看起来要棘手得多。</p>
<p>在过去几年里，我认识的每一个程序员基本上都快被逼疯了。在我的记忆中，这是软件工程师经历过的动荡最为剧烈的时期。在此之前，我们的日子相对还算轻松，但如今人们越来越强烈地感觉到，整个编程手艺正在经历一场巨大的转变，每个人都必须决定自己该如何应对——而在无法事后诸葛亮的情况下，做出这个决定极为艰难。尽管存在各种负面外部效应，但我无法真正去责怪那些随波逐流的人——同侪压力是实实在在的，而且大语言模型（LLM）如今在代码生成方面的能力确实非常强大。我认为，去否认这一点无异于是在与一条不断前移的终点线赛跑。</p>
<p>我写这篇文章并不是想说服任何人去接受某种特定立场，但这便是我的态度：哪怕抛开所有的环境与社会问题不谈，我单纯只是不喜欢用代码助手来编程。这对我来说毫无乐趣可言，生成的成果感觉并不属于我，我也无法从它产出的东西中获得任何自豪感。在过去的几年里，守好自己的一亩三分地、摆弄自己的小项目还不算太难，但我越来越觉得，这项我曾视之为职业和爱好的手艺，已经有很大一部分消失殆尽了。</p>
<p>我热爱制作各种小玩意儿、小Shell脚本以及各种辅助小工具。我每天都会用到我自己写的一个交互式git分支切换器。我曾经对此感到非常自豪，同事们也给予了赞许。而现在，任何人只要输入一段提示词，就能直接“定制”出那个工具或任何类似的东西。再也没有人在乎我做的小玩意儿了。承认这一点虽然显得有些不体面，但我确实需要同行们的肯定来获得成就感。</p>
<p>这种情况在游戏领域同样在上演。本周的心态崩溃是由Zach Gage发的一个帖子引发的，他在帖子里讨论了如今制作游戏是如何变得越来越像制作音乐的。我认为这是个深刻的见解，但我也觉得这简直是对我的毁灭性打击。我花了好几年的时间去学习如何制作游戏，过程十分艰辛，而现在感觉这一切可能纯粹是在浪费时间？我感到茫然失落。接着，我和Shad聊了聊。</p>
<p>Shad是我最喜欢的人之一。他是一位才华横溢的设计师兼工程师，而且人品极佳。他目前正在开发的项目是Uncamera，这是一款面向iOS系统的相机应用，它利用原始传感器输出配合颜色查找表（LUT）——而不是通过后期滤镜——来生成真正具有胶片质感的照片。这款作品制作精美，我坦率地认为，等它完全完工后，绝对有实力角逐苹果设计大奖（Apple Design Award）。你们真应该去看看。这里有一些我用它拍的照片（我并不是个优秀的摄影师）。</p>
<p>它同时碰巧完全是在没有借助生成式AI的情况下开发出来的。Shad之所以这么做的原因和我非常相似：在制作过程中感受不到快乐或成就感。他的焦虑也和我如出一辙。不同之处在于，尽管面临着这些焦虑，Shad依然坚持更新Uncamera，而我却在自怨自艾中沉沦。</p>
<p>事情的关键在于：我本来就是在用最硬核、最笨拙的方式做所有事情。在所有语言中，我偏偏决定用C++来打造我自己的游戏引擎，因为我想这么做。如果我的目标是尽可能快地做出游戏以便能够“参与竞争”，那我完全可以使用Unity、Godot或Unreal。我就不用瞎折腾去试图做一个仿3D渲染器了——就像这篇博文顶部图片里的那样。我之所以用这种方式做事，是因为我享受这样做，而且在这个过程中我能学到很多东西。</p>
<p>通过与Shad的交流，我意识到摆在我面前的其实只有三条路。我可以开始使用生成式AI，让自己感觉像是在“跟上步伐”或“参与竞争”，但那样我就无法从工作中体会到乐趣。我可以彻底放弃创作，但任何做创意工作的人都知道，这从来就不是一个真正的选项。或者，我可以继续以我喜欢的方式去创造东西，继续学习，继续用那条艰难笨拙的道路走下去，别无其他具体理由，仅仅是因为我想这么做。这就是我们制作游戏的原因。这也是我们创造任何事物的原因。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-13 01:24 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2747" data-content-paragraphs="27" data-published-at="2026-09-12T16:04:06.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 00:04</span>
</div>

### [Logo 编程语言](https://el.media.mit.edu/logo-foundation/what_is_logo/logo_programming.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Logo Programming Language</div>

<div class="article-body" data-article-body="true"><p>Logo 编程语言是 Lisp 的一种方言，最初被设计为一种学习工具。它的各项特性——交互性、模块化、可扩展性以及数据类型的灵活性——都源于这一目标。</p>
<p>尽管存在一些编译型的 Logo 版本，但它通常作为一种解释型语言来实现。这种方式的交互性使用户能够立即获得针对单条指令的反馈，从而有助于调试和学习过程。其错误提示信息具有很强的描述性。例如：</p>
<p>I don&#39;t know how to fowad（我不知道如何 fowad）<br />（单词 fowad 既不是原语——即 Logo 的内置词汇——也不是你定义的过程。）</p>
<p>Not enough inputs to forward（forward 的输入不足）<br />（既然你已经拼写正确，Logo 认识单词 forward，但无法执行你的指令，因为 forward 需要额外的信息。）</p>
<p>（Logo 很满意。没有出现错误信息。小海龟向前移动了 100 步。）</p>
<p>Logo 程序通常是由许多小型过程组成的集合。通常情况下，过程是通过在文本编辑器中编写来定义的。特殊单词 to 后面跟着过程的名称。随后的几行构成了该过程的定义。单词 end 则标志着编写结束。</p>
<p>在我们的海龟作图示例中，我们定义了一个绘制正方形的过程：<br />to square repeat 4 [forward 50 right 90] end</p>
<p>并将它用作另一个过程的子过程：<br />to flower repeat 36 [right 10 square] end</p>
<p>类似地，flower 也可以作为更大规模内容的构建模块：<br />to garden repeat 25 [set-random-position flower] end</p>
<p>不，set-random-position 并不是一个原语，但 random 是，setposition（或 setpos、setxy）也是。或者你也可以使用 forward、right 配合 random 来编写 set-random-position。</p>
<p>一旦定义了一个 Logo 过程，它的运行方式就与 Logo 原语无异。事实上，当你查看 Logo 程序时，除非你熟悉该特定的 Logo 实现，否则根本无法分辨哪些词是原语、哪些词是用户定义的。在我们的语言示例中，我们使用了 pick 过程从列表中随机选择一项，例如在 who 过程中：<br />to who output pick [Sandy Dale Dana Chris] end</p>
<p>在某些 Logo 版本中 pick 是内置原语，而在其他版本中你则必须自己编写它。无论哪种情况，who 的形式和运行方式都是相同的。</p>
<p>Logo 允许你以微小的步骤构建复杂的项目。在 Logo 中编程是通过扩充其词汇表来完成的——即用它已经掌握的词汇来教它新词汇。从这个意义上讲，它类似于人类学习口语的方式。</p>
<p>Logo 使用“词”（word）和“表”（list）进行操作。Logo 中的词是一个字符序列（字符串）。Logo 中的表则是词和/或表的有序集合。数字也是词，但它们很特殊，因为你可以对它们进行算术运算等操作。</p>
<p>许多编程语言在要求明确知晓你声称使用的数据类型方面非常严格。这虽然让计算机处理起来更容易，但却增加了程序员的负担。在将两个数字相加之前，你可能必须指定它们是整数还是实数。计算机确实需要知道这些事情，但大多数人并不考虑这些，因此 Logo 会为你处理好这一切。当被要求进行算术运算时，Logo 只管去执行。</p>
<p>如果你不熟悉 Logo 但从事其他编程语言的开发，以下序列可能会让你感到惊讶：<br />print word &quot;apple &quot;sauce<br />applesauce<br />print 12 + word &quot;3 &quot;4<br />46</p>
<p>下面是一个计算阶乘的递归过程：<br />to factorial :number if :number = 1 [output 1] output :number * factorial :number - 1 end<br />print factorial 5<br />120</p>
<p>下面是一个反转词列表的过程：<br />to reverse :stuff ifelse equal? count :stuff 1 [output first :stuff] [output sentence reverse butfirst :stuff first :stuff] end<br />print reverse [apples and pears]<br />pears and apples</p>
<p>你可能也想看一下布赖恩·哈维（Brian Harvey）有趣的 Logo 示例。</p>
<p>刚才展示的特性是所有 Logo 版本所共有的。某些 Logo 实现还包含了增强的语言特性。</p>
<p>曾有一款面向 Macintosh 的面向对象 Logo，名为 Object Logo。</p>
<p>MicroWorlds Logo 包含多任务处理功能，因此可以同时运行多个独立进程。乐高 Logo 产品 Control Lab 的软件中也具备同样的功能。而更为大规模并行的 Logo 则是 StarLogo。</p>
<p>在传统 Logo 中，给海龟下达的命令：<br />repeat 9999 [forward 1 right 1]<br />需要一段时间才能执行完毕。以下指令：<br />repeat 9999 [forward 1 right 1] print &quot;HELLO<br />会导致在海龟移动完成后才显示单词 HELLO。</p>
<p>而在 MicroWorlds Logo 中键入：<br />launch [repeat 9999 [forward 1 right 1]] print &quot;HELLO<br />会启动海龟的运动。单词 HELLO 在第一个进程启动时就会立即出现。或者：<br />forever [forward 1 right 1] print &quot;HELLO<br />会启动一个持续运行直到你停止它的进程。同样地，海龟进程一旦启动，单词 HELLO 就会立即出现。</p>
<p>欲了解关于 Logo 编程语言的更多信息，请参阅布赖恩·哈维的三卷巨著《Computer Science Logo Style》（计算机科学 Logo 风格）以及迈克尔·弗兰德利（Michael Friendly）的《Advanced Logo》（高级 Logo）。</p>
<p>如果你还没有 Logo 并希望开始上手，可以查看我们的 Logo 软件页面。或者，你现在就可以直接下载 UCBLogo、MSWLogo、FMSLogo、StarLogo TNG 或 StarLogo Nova。</p>
<p>本文乌克兰语译文可在此处获取。本文塞尔维亚-克罗地亚语译文可在此处获取。</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1214" data-content-paragraphs="17" data-published-at="2026-09-12T15:56:54.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-12 23:56</span>
</div>

### [除了写代码，AI Agent还能做哪些实用的事](https://elijahpotter.dev/articles/useful_things_agents_can_do_that_are_not_writing_code)
<div class="original-title-sub"><span class="orig-tag">原文</span> Useful Things Agents Can Do That Are Not Writing Code</div>

<div class="article-body" data-article-body="true"><p>当前坊间热议的，尽是当你允许 AI 编程 Agent（智能体）编写代码时，所能做出的那些美妙（以及糟糕）的事情。那些让 Agent（原称 clanker / 铁疙瘩）包揽应用中所有代码编写的人，常被称为“氛围程序员”（vibe-coders）。本文讨论的并非氛围编程（vibe coding）。事实上，本文旨在探讨除了编写代码之外，你还可以用 AI Agent 完成的所有事情。</p>
<p>针对其中的每一项，我都会先梳理使用场景，随后附上我目前使用的最新版 pi 提示词。</p>
<p>我并不认为你应该原封不动地照搬我的提示词，我也不是在建议你直接复制我的工作流。这类工具的美妙之处就在于它们非常灵活，能够适应你的工作风格。我分享这些提示词纯粹为了抛砖引玉。或许也有一些除了写代码之外的事情，是你完全可以借助 Agent 来完成的。</p>
<p>我经常发现自己需要为 PR 解决合并冲突（merge conflicts），原因要么是我自己、要么是开源贡献者修改了上游代码。几乎每一次，这些冲突都只是格式调整或样板代码变动，根本不需要我全神贯注去处理。换句话说，这正是交给 clanker 处理的绝佳任务。</p>
<p>在 pi 中，我可以像调用函数一样调用它：</p>
<p>无论我是否已经下载并签出（checkout）了相关的 PR，这都无关紧要。Clanker 会以非破坏性的方式把这一切搞定。</p>
<p>在参与开源软件项目时，我往往会优先修复自己觉得恼人的 bug，并引入能让自己日子更舒心的新功能。这很自然。但在此过程中，我想知道自己是否碰巧也顺带解决了别人的问题。如果是的话，我就可以在 PR 说明中关联对应的 issue，或者直接联系对方。</p>
<p>为了找到这些相关的 issue，我会使用以下 pi 命令：</p>
<p>同样，它也可以像函数一样被调用：</p>
<p>GitHub Actions 工作流失败的情况中，有 90% 并不是由 bug 导致的，而是因为我忘记运行代码格式化工具或静态分析工具（例如 Prettier 或 tsc）。</p>
<p>在这种情况下，损坏的并不是什么功能性代码，而是一个注解或漏掉的回车符。这本就是一个简单的一行修复。为什么不让 clanker 去做呢？</p>
<p>当 GitHub Actions 运行失败时，我可以借助配备以下提示词的 Agent 立即将其搞定（tout suite）。</p>
<p>它可以在 pi 内部作为一条命令运行：</p>
<p>我提供这些提示词仅作参考启发。是否有某些事情也是你可以去自动化的？如果有，请一定要告诉我！</p>
<p>发布于 2026 年 9 月 11 日晚上 9:39<br />由 Harper 校对。</p>
<p>这并不容易，但我认为这是我养成的最好的习惯之一。<br />回想当年，我们做自动补全靠的还是数学算法。</p>
<p>我喜欢 HackerNews，但我不大喜欢它上面充斥着对单一话题的讨论：AI。这是过滤后的 HackerNews 版本，已剔除任何聚焦于“AI”的文章。大约每十分钟刷新一次。</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="663" data-content-paragraphs="10" data-published-at="2026-09-12T15:39:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-12 23:39</span>
</div>

### [要闻：请重新加载此页面](https://github.com/ipython/xkcd-font)
<div class="original-title-sub"><span class="orig-tag">原文</span> xkcd-font: The xkcd font</div>

<div class="article-body" data-article-body="true"><p>加载时发生错误。请重新加载此页面。</p>
<p>衍生自网络漫画 xkcd 作者 @randallmunroe 手迹的字体。是的，这确实是他的手写字，他也希望我们能修复那些恼人的字距（kerning）：</p>
<p>该代码仓库包含两款字体：xkcd Script 和 xkcd，各自具有独特的特点（及局限性）：</p>
<p>xkcd Script 是一款衍生自 Randall 提供的书写样本的字体。它的规整程度远低于 xkcd，因此我们认为它更像一款真正的手写字体。</p>
<p>你可以通过实时预览查看该字体，或查阅 xkcd-script/README 获取关于该字体及其构建方式的更多信息。</p>
<p>预构建的字体文件可直接在本项目仓库中获取：xkcd-script.ttf | xkcd-script.woff</p>
<p>xkcd 字体最初由 Randall 创建，并用于 xkcd 漫画《现代生活的节奏》（The Pace of Modern Life，2013年4月1日）。它明显比 xkcd Script 更加规整，这能带来更好的易读性，但代价是稍微不太像实际的 xkcd 漫画风格。</p>
<p>预构建的字体文件可直接在本项目仓库中获取：xkcd.otf</p>
<p>该作品基于知识共享 署名-非商业性使用 3.0 许可协议（Creative Commons Attribution-NonCommercial 3.0 License）进行授权。</p>
<p>贡献指南旨在简化审核流程并确保仓库的一致性。此外，特定字体的贡献指南可在各字体的 README（xkcd-script、xkcd）中找到。</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7521" data-content-paragraphs="71" data-published-at="2026-09-12T14:48:24.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-12 22:48</span>
</div>

### [我开发了一款构建可视化工具以探究 Bun 的编译耗时](https://lalitm.com/post/buildprof/)
<div class="original-title-sub"><span class="orig-tag">原文</span> I made a build visualizer to understand Bun’s compile times</div>

<div class="article-body" data-article-body="true"><p>我开发了 buildprof（GitHub），这是一款开源追踪工具，用于展示在 Linux 上编译软件时时间都消耗在了哪里。这里是一段实时视频，展示了它对 ripgrep 进行全新构建时的性能分析：</p>
<p>观看 buildprof 演示视频</p>
<p>有时候，构建之所以缓慢，单纯是因为需要编译的代码量很大。但在大多数情况下，都存在可以解决的问题：并行度差、重复劳动、依赖下载或庞大的编译器/链接器调用。buildprof 让这一切清晰可见，使你能够看清哪些地方值得调查和优化。</p>
<p>它的使用方式非常简单，只需在你常用的构建命令前加上 buildprof --：</p>
<p>buildprof 会记录你的构建命令启动的每一个进程，包括它们的子进程（以及子进程的子进程……），并将它们排布在同一条时间线上。时间从左向右流动，条形块的宽度表示持续时间，而子进程则显示在启动它们的进程下方。</p>
<p>我制作 buildprof 是因为 Bun JavaScript 运行时首席架构师 Jarred Sumner 发的一条推文一直萦绕在我的脑海中：</p>
<p>具体而言，关于 Bun 新的 Rust 构建在 Linux 上比旧的 Zig 构建快 5 倍以上的说法实在让我难以释怀。根据我的经验，类似复杂度的 Zig 项目通常比 Rust 项目编译得快得多。这种直觉足以让我觉得这里面肯定有谜团待解。</p>
<p>推文中另一个重要却极易被忽视的细节让情况变得更加复杂：Zig 构建使用的是 Full LTO（全量链接时优化），而 Rust 构建使用的则是 ThinLTO（轻量链接时优化）。</p>
<p>编译器通常在很大程度上相互隔离地优化各自独立的编译单元。¹ 链接时优化（LTO）允许它们跨越这些边界进行优化。Full LTO 将这些单元整合为一个庞大的优化任务，而 ThinLTO 则保留了更多的隔离度，从而使大部分工作可以并行运行。</p>
<p>从以往的经验来看，这种差异对构建时间有着巨大的影响。那条推文只是顺带提及了这一点，但我很好奇推文标题所称的性能提升中，究竟有多少可以用它来解释。</p>
<p>我首先尝试复现这些数据。</p>
<p>我检出了 Bun 1.3.14 和 Bun 1.4.0 的代码，并编写了一些脚本，以便在具有 6 核 12 线程的 Linux 虚拟机上重放它们的 Linux x64 CI 构建流程。这些脚本保留了构建步骤及其依赖项，将所有任务都在单台机器上运行。²</p>
<p>我测出的耗时与 Jarred 的数据基本在大致相同的范围内：</p>
<p>好了，所以在我的机器上也出现了这种差距。但在这两次测量之间，除了编程语言本身之外，还有很多地方发生了变化；那么真正起决定性作用的到底是什么？难道多出的这些时间全都是 Zig 编译器消耗的？还是说是因为 Full LTO 链接？又或者是 Bun 的构建流程中还有某些我根本没想到的因素？</p>
<p>这时，我作为性能分析和开发者工具开发者的思维开始发挥作用了。通常，当我试图理解某件事物为什么缓慢时，我希望有一份追踪记录（trace）：发生了什么、何时发生以及耗时多久。如果能为这些构建生成这样的记录，将它们呈现在时间线上，看看时间究竟花在了哪里，那就太棒了。</p>
<p>但构建过程涉及许多不同的工具，每个工具对其内部发生的事情都有自己的定义。我该记录什么，才能统揽所有的工具呢？</p>
<p>当你输入 cargo build 或 zig build 时，感觉就像是在运行一个程序。构建系统会计算出哪些部分需要重新编译、各个部分之间的依赖顺序以及哪些可以并行运行。但通常而言，它本身并不亲自执行所有这些工作；它会启动编译器、代码生成器、归档工具、链接器以及各种自定义脚本。而这些程序又可能启动更多的程序，后者再进一步启动其他程序……</p>
<p>不同的构建系统以不同的方式描述这些工作。Cargo 眼中看到的是 crate，Ninja 看到的是构建边（build edges），而 CMake 则为另一个构建系统生成指令。然而，从操作系统的角度来看，它们（大多）不过是进程在启动其他进程而已。³</p>
<p>例如，一个 Rust 构建可能包含类似这样的链路：</p>
<p>如果我们记录每个子进程启动和结束的时间，就可以将它们排列在一条时间线上。在 buildprof 中，该链路看起来是这样的：</p>
<p>在这一层面对构建进行可视化还有几个非常好的特性：</p>
<p>这为我开发 buildprof 提供了切入点：记录进程树，然后将其转换为可交互探索的时间线。其中还有很多细节可以深入探讨，我稍后会展开说明。但一旦这个功能跑通，我终于可以回到最初的问题：Bun 在那 24 分钟里到底在干什么？</p>
<p>我首先使用之前的脚本，用 buildprof 记录了 Zig 时代的 CI 构建过程：</p>
<p>在 buildprof 中探索</p>
<p>我们一眼就能看出一个巨大的问题：ld.lld 链接器的调用主导了构建耗时。它在构建流程的最末端单独运行了 16 分钟以上，约占整个构建耗时的三分之二。它在那段时间里到底在折腾什么？</p>
<p>点击链接器可以看到它的命令行参数，buildprof 会自动捕获这些参数：</p>
<p>果然有 Full LTO，正如 Jarred 所说。考虑到链接耗时如此之长，它现在成了我的头号怀疑对象。</p>
<p>但仅凭进程树还无法告诉我 LTO 是否真的要为这 16 分钟负责。所幸的是，LLD 会记录其内部的时间分析事件，而当你使用 --compiler-traces 参数时，buildprof 可以将它们一并纳入。</p>
<p>我再次记录了最终的链接过程，这次启用了 --compiler-traces：</p>
<p>现在我们可以看到，几乎所有的时间都花在 LTO 上了。链接器正在对整个程序运行编译器的各种 pass（优化阶段），而不仅仅是将已经编译好的文件合并在一起。单单 OptModule 这一项就耗时 10 分钟出头，其中包括生成机器码的 pass。⁴</p>
<p>鉴于 Zig 构建有那么多时间消耗在 LTO 上，我想看看 Rust 构建在链接上花了多少时间。我也记录了那个构建：</p>
<p>仅仅花了 2 分 24 秒。而这一次，不出所料，链接器命令行中包含了 -plugin-opt=thinlto：</p>
<p>两个构建都启用了 LTO，但配置不同，链接时间也有着天壤之别。如果我保持 Bun 的 Zig 代码不变，只是把 Full LTO 改为 ThinLTO 会怎样？这能缩小多大差距呢？</p>
<p>我将 Zig 版 Bun 的构建标志改为了 ThinLTO，并再次记录了一次全新的构建，同时重新进行了一次 Full LTO 构建以作对比：</p>
<p>在 buildprof 中探索：Full LTO · partial ThinLTO</p>
<p>在这组记录中，链接过程快了 3 分 40 秒，但仍旧耗时近 13 分钟。为什么链接开销依然如此之大？</p>
<p>回顾编译器追踪记录，许多工作都集中在名称带有 JSC 的函数上。那是 JavaScriptCore，即 Bun 用来执行 JavaScript 的引擎。链接器也把时间花在了编译该 JavaScript 引擎上。⁵</p>
<p>点击链接器调用可以在其输入文件中看到 WebKit 库，包括 libJavaScriptCore.a：</p>
<p>沿着这些输入顺藤摸瓜回溯构建流程，我发现 Bun 自身并没有编译这些库。它是从一个独立的 WebKit 构建中下载它们的。而当我检查那个 WebKit 构建的编译标志时，它赫然在目：-flto=full。而 Rust 构建使用的是更新的 WebKit 版本，其构建配方选择了 ThinLTO。</p>
<p>尽管我改变了 Bun 编译自身代码的方式，但那些下载的库仍然包含 Full-LTO（全程序链接时优化）输入，因此链接器仍然必须优化该代码并将其转换为机器码。为了改变这一点，我必须连同 WebKit 一起重新编译。</p>
<p>我签出了 WebKit 的历史版本，并使用兼容的 ThinLTO 设置重新构建了它及其 ICU 依赖项。然后，我用自己构建的库替换了下载的库，并保留了对 Bun 所做的 ThinLTO 更改。</p>
<p>以下是记录的构建情况：6</p>
<p>现在链接耗时 7 分 22 秒。虽然仍比 Rust 构建要慢，但这已经足够令人满意，使我想把目光投向链接器之外。</p>
<p>构建仍然耗费了 15 分钟，而在链接器甚至还没开始运行之前，就已经过去了将近 8 分钟。它在等待什么？我回溯到最初的 CI 追踪记录，以追踪来自 Bun 自身代码的输入。</p>
<p>buildprof 还会记录每个进程读取和写入了哪些文件。如果一个进程读取了另一个进程写入的文件，它就会在后台将两者关联起来。开启“在时间线上显示”（Show on timeline）会把这些关联绘制为箭头。在这里，链接器读取了来自 C++ 编译的 libbun-profile.a 和来自 Zig 的 bun-zig.o。两者都经过了复制步骤；追溯这些步骤可以将我们带到生成它们的进程：</p>
<p>C++ 端的编译先完成了。链接器一直在等待 bun-zig.o，因此直到 Zig 分支也完成后才能开始。</p>
<p>正是在此时，我回过头来查看 Rust 的构建过程并比对它的工作方式，Rust 构建更快的主要原因便显而易见了：Bun 已经被拆分成了 90 多个 crate（包），而在 Zig 中，它当时试图全部作为单个 Zig 模块进行编译！</p>
<p>这意味着 Zig 构建无法像 Rust 那样进行并行化。我也怀疑（尽管我并未对此进行证实）这解释了链接缓慢的原因：链接器必须优化一个庞大的 ThinLTO 位码模块，而不是将相同的工作分散在多个 crate 中。</p>
<p>到了这一步，我不得不停下来：如果想进一步深入，我就必须亲自拆分这个 Zig 模块，鉴于这段代码无论如何都已经过时了，我认为这样做不值得。</p>
<p>顺便提一句（fwiw），这些追踪记录还揭示了一些我忍不住想去探究的事情……</p>
<p>在 Bun 的 CI 构建过程中，我发现了一些向公共互联网查询机器 IP 地址、检查正在运行的 Docker 容器以及读取最新 Git 提交信息的命令。</p>
<p>这些命令加起来耗时远不到一秒。没什么可优化的，但我只是没想到会在构建追踪记录中看到它们。</p>
<p>上述构建复用了下载好的依赖项，因此我还记录了一次全新的 WebKit 拉取过程。下载并解压归档文件花费了大约 20 秒。在前 12 秒内，我们看到的只有 Node 在运行。随后它启动了 tar 和 gzip，我们可以单独看到解压过程。</p>
<p>此前，我们将链接器的输入回溯到了 Bun 的 C++ 编译部分。我们也可以查看这些编译器调用的内部情况。我挑选了最后完成的文件之一 ZigGeneratedClasses.cpp，并使用 --compiler-traces 重放了它的 Ninja 命令。对于 Clang，buildprof 会启用 -ftime-trace 并将其内部计时添加到进程时间线上。7</p>
<p>重放花费了大约 12 秒，在 Clang 的前端和后端之间几乎平分。进一步放大观察，我们发现 Clang 的其中一个阶段 ModuleInlinerWrapperPass 占据了后端超过 4 秒的耗时。</p>
<p>buildprof 的记录端使用的是 ptrace，也就是调试器所使用的同款 Linux 接口。我确实考虑过 eBPF 和 ftrace，但对于这类特定问题，ptrace 简直再完美不过了；eBPF 追踪需要 CAP_BPF 和 CAP_PERFMON 权限，并且需要挂钩（hook）到可能不稳定的 tracepoint 或内核函数。而使用 ftrace 的话，我必须周旋于多个追踪实例之间以避免干扰其他用户，而且要精准配置仅针对该构建进程及其所有子进程的过滤器非常繁琐。8</p>
<p>借助 ptrace，我可以启动构建并直接跟踪其子进程。其内置事件会告知 buildprof 进程何时 fork、执行（exec）新程序或退出。而对于文件系统活动，buildprof 使用 seccomp 过滤器来仅拦截所需的系统调用。</p>
<p>buildprof 带来的开销几乎完全取决于构建过程中打开了多少个文件。对于 ripgrep，记录几乎没有改变构建耗时。Redis 打开文件的频率要高得多，记录增加了大约 5 秒：9</p>
<p>如果这种开销造成了困扰，你可以使用 --no-file-events 关闭文件系统追踪，只保留进程时间线。</p>
<p>我从事 Perfetto 的开发工作，因此它自然成为了 UI 的起点；buildprof 的 UI 是 Perfetto UI 的一个软分叉（soft fork）。我本可以直接在 ui.perfetto.dev 上打开这些记录，但我希望能掌控进程树的布局方式、点击命令时显示哪些详细信息，以及在文件生产者和消费者之间按需显示箭头这类功能。</p>
<p>幸运的是，过去几年我们一直致力于通过插件使 Perfetto UI 具备可扩展性。buildprof UI 的大部分内容都复用了该基础设施。Perfetto 负责处理繁难的部分（解析追踪记录、查询事件、渲染时间线和管理工作区），而我可以专注于让这些内容对构建场景发挥作用。</p>
<p>如今，仅凭一时兴起就制作一个工具非常容易。但这里的情况并非如此；在构建 buildprof 之前，我苦苦寻找过能够提供这种视角的现有工具。</p>
<p>我首先尝试了 ninjatracing，这款工具我用过很多次。它将 Ninja 的构建日志转换为时间线，展示哪些任务在运行以及有多少任务在并行运行。</p>
<p>这是来自 Zig 时代构建的 Ninja 日志。</p>
<p>但 Ninja 只能看到 Bun 构建的一部分。调用它的脚本在其日志中缺失，而它运行的命令即使启动了整棵子进程树，也仅显示为单个代码块。</p>
<p>还有其他几个工具，各自覆盖了该问题的不同方面：</p>
<p>What the Fork（通过链接查看）最为接近：它能跨构建系统跟踪进程，并呈现特定于构建的视图。但据我所知，它似乎仍处于私有公测（private beta）阶段，而且目前看起来没有开源计划。</p>
<p>buildprof 已经实现了我想要的功能，我计划在自己的构建中使用它的同时继续对其进行改进。不过还有几点我想加以完善。</p>
<p>记录开销就是其中之一；Redis 的测量结果表明文件系统追踪仍有改进空间，尤其是对于那些会打开大量文件的构建。我还希望支持 macOS（我的一部分工作在 macOS 上进行），如果有人感兴趣的话，也许还会支持 Windows。</p>
<p>我还想测试更多的构建系统和工具链，包括 npm、Gradle 和 Bazel。计算关键路径也将是一项重大改进：在本文中我们是手动追溯依赖关系的，但 buildprof 可以帮助识别阻碍构建进展的工作链并自动进行标注。</p>
<p>我可能会在需要时再去解决这些问题。但如果你试用了 buildprof 并且有什么希望它实现的功能，我很乐意听听你的想法。大家的实际需求将帮助我决定把更多时间投入到哪里。<br />我成功满足了自己的好奇心，尽管最终在这上面花费的时间远超预期。在此过程中，我打造了一个工具，以后每当遇到构建耗时过长时，我都希望能用上它。<br />我知道，下次再被缓慢的构建惹恼时，我肯定会重新用起 buildprof。如果你也受到这类构建的困扰，不妨试一试。我很期待了解你的发现！<br />或者继续阅读相关主题：<br />在 C 和 C++ 中，一个编译单元通常是一个源文件及其包含的头文件。Rust 编译 crate，这些 crate 可以拆分为多个代码生成单元。Zig 通常将一个程序的全部 Zig 源码作为一个单一编译单元进行编译。Bun 分支版本的 Zig 编译器支持将其拆分为多个 LLVM 模块，但其 CI 构建在启用 LTO（链接时优化）时明确选择了单个模块。↩︎<br />Zig 时代的 CI 构建在不同的 Buildkite 机器上分别运行 C++ 和 Zig 的编译阶段，并将它们的输出传递给最终的链接阶段。我的脚本在同一台机器上并发运行了这些阶段，等待两者的输出，在本地复制它们而不是通过网络传输，然后进行链接。这应该保留了依赖图，但由于硬件差异以及在单台机器上运行两个阶段，资源争用情况显然会有很大不同。另外请注意，我的计时数据是单次运行的结果（尽管运行结果相当稳定），而 Bun 报告的数据是中位数。↩︎<br />一个进程可以在内部执行大量工作，包括运行多个线程，而无需启动任何其他子进程。进程时间线无法展示这种并行性。要查看进程内部的情况，我们需要来自程序本身的追踪（tracing），就像下文示例中 Clang 和 LLD 所提供的那样。↩︎<br />LLVM 会从其旧版 pass 管理器中发出 OptModule，LLD 将其用于代码生成。内联及其他 IR 优化 pass 可能会在它之前出现，因此该条状图并不代表优化模块所花费的全部时间。↩︎<br />在先前的 Full-LTO 链接器回放中，带有 JSC 符号的 26,825 个 OptFunction 事件总计耗时约 209 秒。这是累加的事件时间，并非 JavaScriptCore 对链接过程全部耗时贡献的精确测量。其中一个示例事件耗时 2.94 秒；其符号经反修饰（demangle）后为 JSC::JITThunks::initialize(JSC::VM&amp;)。↩︎<br />记录脚本。这些计时数据仅针对在已有库完备的情况下构建 Bun 本身；WebKit 和 ICU 的重新构建在此之前完成，并未包含在内。当然，我也可以把 buildprof 指向那部分构建，但那又是另一个深不见底的复杂问题了……我没有重新构建一个匹配的 Full-LTO WebKit 归档作为对照组，因此无法将节省的每一秒都单独归因于 LTO 设置。↩︎<br />buildprof 目前支持来自 Clang、LLD 和 nightly Rust 的编译器追踪数据。↩︎<br />eBPF 追踪使用了 CAP_BPF 和 CAP_PERFMON 等权能（capabilities），具体如内核的权能定义所述。ftrace 提供了独立的追踪实例和 PID 过滤器，但这些仍需配置以及对 tracefs 的访问权限。ptrace 同样依赖宿主机的安全设置；容器可能需要额外的权限才能允许追踪子进程。↩︎<br />在同一台虚拟机上、设置六个构建作业时，每种模式进行五次全新构建的中位数。测量脚本。↩︎</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1818" data-content-paragraphs="32" data-published-at="2026-09-12T14:38:51.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-12 22:38</span>
</div>

### [Base84 应当在文件名编码中占有一席之地](https://00f.net/2026/09/09/base84/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Base84 deserves a place in file names</div>

<div class="article-body" data-article-body="true"><p>TurboCrypt 文件加密工具最初是为 Unix 系统设计的。</p>
<p>它过去常用于加密文件名，并将生成的密文采用 Base91 进行编码。</p>
<p>为什么选择 Base91？因为它非常适合用于加密文件名，生成的字符串可以在 Unix 和 macOS 上作为有效文件存储。</p>
<p>“但我的文件系统可以存储任意文件名！”对于某些文件系统来说这或许属实，但这并未将代码库和应用程序考虑在内。例如，macOS 的 Finder 根本无法接受这种情况。</p>
<p>因此，Base91 在处理加密的文件名和目录名时表现良好。</p>
<p>后来有人请求支持 Windows 系统，而在该系统中，Unix 文件系统安全字符集中的若干字符是被禁止使用的。</p>
<p>因此，TurboCrypt 正在转向 Base84。</p>
<p>令人惊讶的是，这种编码方式此前从未被定义过，也（显然）未在任何地方被使用，尽管它极其适合用于编码需要跨平台且符合文件系统安全要求的文件名。</p>
<p>除去空格，可打印的 ASCII 字符共有 94 个。但 Windows 的规则排除了其中的 9 个：</p>
<p>然而，以点（dot）结尾的名称在 Windows Shell 和常规文件 API 中无法可靠工作。</p>
<p>将点也一并移除后，我们就剩下 84 个可以出现在文件名任意位置的字符。微软对这些限制进行了记录说明。</p>
<p>不过，Windows 允许前导点：比如 .gitignore 就完全没问题。</p>
<p>但去掉点同样能避免在 Unix 上生成隐藏文件名以及像 . 和 .. 这样的特殊名称。</p>
<p>以下是按编码顺序排列的字符表：</p>
<p>每个字符在常见的 Linux、macOS 和 Windows 文件系统文件名中都是完全合法的。</p>
<p>zig-base84 是 Base84 的一个实现。</p>
<p>它以 5 个字符为一组进行输出。5 是一个绝佳的平衡点：84⁵ = 4,182,119,424，仅比 2³² 小 2.6%。</p>
<p>这留下了足够的空间，使得在均匀随机输入下，一组字符约有 95% 的概率容纳 32 位（bit），其余情况下容纳 31 位。</p>
<p>编码器会检查接下来的 31 位。如果它们的值小于 84⁵ - 2³¹，则有空间容纳第 32 位。否则，它只消耗这 31 位。无论哪种情况，该数值都能放入 5 个 Base84 数字中。</p>
<p>在随机输入下，每组约编码 31.95 位，即每个字符约 6.39 位。输出体积比二进制输入大出约 25.2%。与 Base85 相差无几。</p>
<p>这些膨胀率未计入末尾的部分分组；平均值均假设输入为随机数据：</p>
<p>全部由 0xff 填充的输入会强制每个完整分组只消耗 31 位。这是最糟糕的情况：膨胀率约为 29%。</p>
<p>大多数文件系统对文件名的限制为 255 字节。由于该字符集为 ASCII，因此长度即为 255 个字符。5 可以整除 255，因此即使是达到最大长度的文件名，也只包含完整分组，不会因部分分组而损失比特。Base84 保证可容纳 197 字节的输入，相比之下未填充的 Base64 为 191 字节。</p>
<p>Unix 文件名可以包含大多数 Windows 拒绝的标点符号。在文件名中 NUL 和 / 是被禁止的；Linux 路径名文档列出了具体规则和各文件系统的特定限制。</p>
<p>zig-base91 中的文件系统变体将标准 Base91 字符集中的斜杠替换为撇号。在随机输入下，它每个字符可打包约 6.51 位，带来大约 23% 的膨胀率。</p>
<p>对于纯 Unix 名称，可以使用该变体。标准 Base91 仍包含 /，而且这两种字符集都包含 Windows 所拒绝的字符。</p>
<p>Windows 保留了诸如 CON、NUL 和 COM1 之类的设备名称，且不区分大小写。</p>
<p>采用 5 字符打包有一个实用的副作用：使用该标准字符集时，即使针对较短的输入，编码器也拼不出保留的设备名称。</p>
<p>3 个字符的输出末尾始终落在 A 到 J 之间。这排除了 CON、PRN、AUX 和 NUL（不区分大小写）。</p>
<p>4 个字符的输出末尾始终是大写字母或 a、b、c。它不能以数字结尾，因此 COM1 到 COM9 以及 LPT1 到 LPT9 也是不可能出现的。Windows 额外保留的上标数字也不在字符集中。</p>
<p>此外，该字符集中没有点，因此保留名称后接扩展名的情况也是不可能发生的。</p>
<p>无需任何填充或特殊处理即可避开这些保留名称。</p></div>

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