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
<div id="story-nsights-wrong-not-broken-adc3f266543937ea" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3413" data-content-paragraphs="6" data-published-at="2026-09-26T17:08:06.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-27 01:08</span>
</div>

### [是“错了”，不是“坏了”](https://aws.amazon.com/blogs/aws-insights/wrong-not-broken/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Wrong, not broken</div>

<div class="article-body" data-article-body="true"><p>二十年来，软件运维一直围绕着一个核心问题构建：它坏了吗？<br />我们已经非常擅长回答这个问题。指标、日志与链路追踪——分布式追踪甚至可以跟进单次请求穿透数十个服务。<br />而这一切都建立在一个合理的假设之上：当软件发生故障时，这种故障最终会表现为机器能够测量的某种形式。<br />现在，试想一个处理退款请求的 AI 智能体（Agent）。它在 600 毫秒内做出了响应，错误率为零。然而，它却告知客户应退款 40 美元，但政策规定的其实是 140 美元，原因仅仅是它检索到的文档是上季度的版本。<br />所有的监控仪表盘全是一片绿灯，看起来没有任何东西发生损坏故障。<br />本周，我们推出了 Amazon CloudWatch Omni，旨在将智能体、应用程序和基础设施置于同一维度进行协同观测。我想在此深入剖析这一变化背后的范式转变及其重要意义。<br />如今，正确性必须在“单次运行”（run）的层面上来进行度量。软件自始至终都有可能犯错。而在智能体时代，所发生的变化在于：我们所关心的行为特征中，有相当大的比例是在软件实际运行的过程中动态决定的。<br />智能体引入了另一套变量体系。同一个智能体，运行着完全相同的代码，可能上一秒处理请求是正确的，下一秒就出现差错。最终结果取决于问题的表述方式、检索到了何种上下文信息、它在调用工具时选择了哪条路径，以及模型具体生成了什么。<br />因此，“它是否在做正确的事？”这一问题再也无法在发布前完全得到解答。其中一部分答案必须持续地、跨越单次运行本身，从生产环境中获得。<br />这并没有取代可观测性一直以来所回答的问题，而是在它们身旁增加了全新的问题。<br />这次执行的工作质量如何？上线前运行的测试套件依然至关重要，而现在，实时度量指标可以与它并肩协作。智能体是否选对了工具？是否正确路由了请求？当这些评估得分与延迟、Token 消耗量共同呈现在同一条追踪链路上时，团队便能一目了然：某次提示词的修改虽然没有拖慢系统响应，却使检索回答的质量出现了显著劣化。<br />这就引出了第二个问题：质量必须变得足够明确，才能够被度量。<br />人类组织可以凭借大量惊人的默会判断（tacit judgment）来运转。人们通过案例、同事指点和经验累积，懂得一个好的回答听起来是怎样的，并非所有标准都必须形式化。<br />但评估器需要更加具体明确的依据。究竟怎样的退款决定才算正确？智能体应在何时升级人工处理？<br />因此，构建评估机制迫使各个团队必须将部分默会判断转化为关于“良好”的操作性定义。在实际操作中，确定“应该度量什么”往往与度量本身同样具有价值。<br />在链路的哪个环节出了差错？回到那个错误的退款案例。也许是模型的推理出了问题，或者模型把一切都做对了，但下游三个跃点之外的支付服务运行的却是一套旧配置。<br />负责排查的团队需要沿着一条因果链追根溯源：从客户的问题出发，穿过智能体的决策过程，一直深入到底层的支撑服务。智能体正在演进为应用程序内部的基础组件，因此它们的行为需要与系统的其余部分一同保持可见。<br />那些表现异常的运行究竟有何不同？仪表盘依然有用，因为它们能让关键信号保持持续可见。当团队明确知道自己想要监控什么指标时，仪表盘尤为高效。<br />基于智能体的系统则引入了一些至关重要的疑问，这些疑问可能只有在异常事件发生后才会浮出水面。例如：为什么本周面向欧洲客户的退款准确率下降了？检索模块、工具选择或下游服务是否发生了任何变更？<br />能够直接提出这些问题，并让可观测性系统自动聚合相关的遥测数据，从根本上改变了调查排障的开启方式。<br />修复措施真的生效了吗？生产环境中的一次异常运行并不一定非要以一份事故报告收场。智能体犯错的追踪链路可以沉淀为数据集。团队可以针对这些样本验证修改方案，对比新旧版本的差异，部署上线，随后观察生产环境中的实际行为是否得到了切实改善。<br />这在智能体的运维与研发之间建立起了紧密得多的联系。用于理解故障的同一份证据，直接变成了检验故障是否已被修复的测试用例。<br />更大的自主权需要更充分的证据支撑。随着智能体承担起更高的决策权限，其价值也随之水涨船高。而阻碍组织放权的，是他们能否回答几个显而易见的问题：智能体刚才做了什么？这样做对吗？如果情况发生变化，我们能否察觉？<br />权限的授予往往是循序渐进的，就像对待一位新入职的同事一样。起初，每一项操作都需要审批；接着，只有异常操作才需审批；再后来，有人定期进行抽样复核；最终，变为事后检查核验。<br />安全性机制的运作逻辑亦是如此。权限策略依然划定了最外层的边界，一个未被授权执行退款的智能体绝无法发起退款。然而，权限仅仅定义了“什么是可能的”，却无法衡量“某一个特定选择是否合理”。策略可以规定智能体有权发放退款，但它无法判定针对这位客户、这个特定金额的退款决定是否正确。越来越多核心关键的逻辑发生在这一边界内部。理解这些逻辑的方式与衡量质量如出一辙：审视实际发生了什么。<br />简而言之，一个组织能够安心赋予其智能体多大的权限，取决于其能多清晰地看清智能体的一举一动。<br />这种关系最终可能演变为动态调节。如今，赋予智能体多少权限主要仍由人工裁定。放眼未来，这种模式无需保持静态不变。如果质量信号能够实时获取，当智能体积累出良好可靠的历史记录时，其自主权可以相应扩大；而当质量出现下滑时，权限则可收窄，直至查明原因为止。我们目前虽尚未达到这一阶段，但构建此类系统所需的基石已初具雏形。<br />我们的研发投入方向。本周，我们发布了 Amazon CloudWatch Omni，这是我们迈向这一方向的关键第一步。它将智能体追踪链路、应用服务和底层基础设施整合至统一视图之中。该平台通过 17 种内置评估器（涵盖正确性、真实忠实度、工具选择合理性等维度）为智能体行为打分。团队还可以将生产流量直接转化为评估数据集和测试实验。AWS DevOps Agent 可以直接介入事故调查排障，并基于工程师所看到的完全相同的遥测数据开展工作。开发者在 IDE 中查看到的追踪链路，与运维人员在生产环境中观察到的一致。整套体验围绕 OpenTelemetry 构建，智能体埋点则基于 OpenInference 与 AWS Distro for OpenTelemetry (ADOT)。它天然兼容基于 LangGraph、CrewAI、Strands 以及其他框架构建的智能体。目前这仍处于早期阶段，我们将从客户的实际使用中汲取大量宝贵经验。<br />结语与思考。面对后果更严重的任务，生产环境中的许多智能体目前仍由人工来审批重要操作。随着我们逐步积累证据，证明这些系统能够稳定可靠地运行，更多工作将有望从“事前审批”逐步演进为“事后复核”、“抽样检查”与“异常处理”。</p>
<p>我们已知晓如何去可观测的一切依然至关重要。智能体（Agents）运行在服务、数据库、网络、队列和底层基础设施之上，当出现问题时，所有这些系统仍然需要被透彻理解。</p>
<p>新增的是一系列全新的问题。除了了解系统是否在按预期运行之外，我们越来越需要理解它所做的工作质量是否优良。</p>
<p>能够同时回答这两个问题的团队，将能够带着更大的信心赋予其智能体更多职责。</p>
<p>这正是我们通过 CloudWatch Omni 所致力于构建的目标。</p>
<p>Matt 在 AWS 工作近 15 年、并在最近领导了普华永道（PwC）的商业技术与创新业务之后，于 2026 年 5 月重返 AWS 担任首席人工智能与技术官（Chief AI &amp; Technology Officer）。在早先的任期中，他是早期人工智能与机器学习团队的成员，并在多项基础 AWS 服务领域开展工作，助力构建、发布或扩展了包括 Amazon Bedrock、SageMaker、Lambda、Kinesis 和 QuickSight 在内的多款产品。如今，Matt 与客户、构建者、合作伙伴以及 AWS 团队紧密合作，推动人工智能从可能性转化为实际生产力。他的工作重点在于技术的发展走向、客户如何将其投入实际应用，以及在此基础上构建持久的产品、平台和业务所需具备的条件。他的整个职业生涯都致力于通过技术将创意变为现实，并坚信 AWS 的下一个时代将由那些利用人工智能重塑产品、服务和体验的发明家与构建者所塑造。Matt 拥有机器学习博士学位，曾就读于诺丁汉大学医学院，并在威尔康奈尔医学院完成了博士后研究，其研究方向专注于自然语言处理和生物信息学。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-27 01:08 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://aws.amazon.com/blogs/aws-insights/wrong-not-broken/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--2026-09-26-reachability-9f62655e606a7f5a" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="6913" data-content-paragraphs="25" data-published-at="2026-09-26T15:49:22.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 23:49</span>
</div>

### [我们能在 TLA⁺ 中表达可达性性质吗？](https://ahelwer.ca/post/2026-09-26-reachability/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Can we have reachability properties in TLA⁺?</div>

<div class="article-body" data-article-body="true"><p>我之前在阅读希勒尔·韦恩（Hillel Wayne）的新文章《TLA+ 并不能解决一切问题》（TLA+ Won’t Solve Everything），并对他提到的一项无法在 TLA⁺ 中表达的内容产生了浓厚兴趣：<br />可能性与可达性性质：即始终有可能使 P 为真，即便你实际上并没有决定这样做。比如“我随时都可以关闭计算机”或“用户随时可以更改其密码”。这些无法用 &lt;&gt;P 来表达，因为后者的含义是“对于所有行为，P 至少发生一次”，而我们实际上想要表达的是“对于所有行为前缀，至少存在一种行为使得 P 至少发生一次”。<br />这引发了我的思考。不久前，我正在阅读兰波特（Lamport）的新书《并发程序科学》（A Science of Concurrent Programs），原本一切顺利，直到被第 5.1 节“可能性与准确性”（Possibility and Accuracy）彻底难住。该章节讨论的正是这个话题：在 TLA⁺ 中表达可能性/可达性性质。我当时完全无法理解，甚至一度以为书中存在重大错误。希勒尔的文章促使我重新审视这一内容1，而我现在很高兴地说，我基本上理解了它，并将尝试用自己能理解的方式来解释它。如果你更希望直接听兰波特的解释，可以去阅读上述教科书的第 5.1 节，或是兰波特于 1998 年 10 月发表的论文《证明可能性性质》（Proving Possibility Properties）。<br />我们将讨论两个问题：<br />TLA⁺ 中较为突出（且奇怪2）的运算符之一是 ENABLED。如果在给定状态下可以执行动作 A，则 ENABLED A 在该状态下的求值结果为 true。它最常见的应用是检查 []ENABLED Next。这仅仅表示系统始终可以执行下一步非断续（non-stuttering）步骤。如果该式变为 false，说明你的系统陷入了死锁！这是一个非常有用的性质，以至于 TLC 会默认对其进行检查。3<br />ENABLED 还可以让你编写最基础的可达性性质，即询问是否可能在单步内到达某个状态。性质 [](ENABLED Next /\ P&#39;) 用于检查是否始终能在单步内到达状态 P。TLC 目前就可以检查这一点。然而，这并不是非常有用。我们通常想知道的是 P 是否能在多步内到达。兰波特定义了另一个运算符，他使用上标加号 ⁺ 来表示。4 任何了解正则表达式的人对其含义都会感到熟悉：它表示一个或多个动作可以连接在一起。兰波特因此将完整的可达性性质表达为 [](ENABLED [Next]_v^+ /\ P&#39;)，意味着可以通过执行一个或多个 Next 步骤（或断续）来到达 P，而不仅仅是一步。用 ASCII 文本编写这个公式显得相当难看；这里是它排版整齐后的样子：<br />$$ \Box\text{E}([Next]_v^+ \land P^{\prime}) $$<br />TLC 目前无法检查此性质；它仅存在于兰波特的设想之中。而且它看起来非常像分支时间逻辑（branching-time logic）。异端！关于这一点我们稍后再谈。<br />除了 ENABLED 之外，TLC 最近增加了对基础可达性性质的支持。这些仍处于测试阶段，因此你必须在模型文件中将其声明为 _POSSIBLE P。这并不会检查从每个系统状态出发的可达性；相反，它检查的是从某个初始状态开始的任何行为中，P 是否可能得到满足。你可以在这里阅读其动机，主要是作为规范的“单元测试”发挥作用5。在 TLC 常规的广度优先搜索中检查 _POSSIBLE 非常直观：如果在状态探索结束时从未命中 P，则报告失败。最近人们还发现 _POSSIBLE 为表达轨迹验证（trace validation）提供了一种更顺手的方式，因此它很可能会保留在语言中。<br />那么完整的可能性/可达性性质又如何呢？我们能否检查 P 是否可以从每个系统状态到达？TLC 当然可以检查这些，但这需要更多的工作。值得庆幸的是，这项工作的形式是在模型检验中增加一个独立的分析遍（pass），而不是与现有的机制纠缠在一起，因此在有限的破坏风险下实现它是可行的。要使用的算法称为反向可达性（backward reachability）。在完整状态图探索完毕后，编写一个在状态图上进行反向广度优先搜索的分析遍，从满足 P 的每个状态开始，并遍历能够转换到这些状态的每个状态。如果最后有任何剩余的未探索状态，你就会知道 P 无法从这些状态到达，从而报告违规。这些剩余的状态甚至能提供一个很好的反例来着手调试！<br />这是否会在 TLC 中实现尚不可知，但这看起来确实是个不错的主意。<br />在此，我将尽力解释兰波特所想出的技巧，即将某种看起来像分支时间推理的东西引入到线性时间逻辑中。在此先做个提醒，本节的技术性将明显高于其他部分。TLA⁺ 的语义从根本上将规范定义为无限线性行为的集合。这个行为集合本身通常也是无限的6。那么，在这个无限的无限线性行为集合中，当我们说 REACHABLE P 时，到底可能意味着什么？按照惯例，TLA⁺ 公式必须适用于该集合中的每种行为。但我们感兴趣的并不是每种行为是否都真正到达了 P；我们想知道的是，每种行为是否本可以到达 P！这种推测未来的推理方式在分支时间逻辑中完全契合，但在线性时间逻辑中却格格不入。<br />其根本诀窍在于滥用公平性假设（fairness assumptions）。公平性假设是可用于过滤行为集合的谓词。举一个常见用法的例子：一个仅仅停在那里什么都不做（永远断续）的系统，在传统 TLA⁺ 规范中是一种完全合法的行为，但它并不是很有趣。因此，许多规范在想要检查诸如“系统最终到达目标状态”之类的活性性质（liveness properties）时，会通过形如“如果一个动作持续处于启用状态，它最终必须被执行”的公平性假设来排除那些无趣的行为。通俗地说，我喜欢将公平性假设看作是为你的规范注入了洋流，大体上推动它朝向期望的状态前进。你的系统仍然可以在整个状态空间中穿梭，但它不能在没有洋流将其推向更具成效的行为的情况下永远困在某处。公平性假设通常是你为系统的“理想路径”（happy path）进行编码的方式，例如发送网络消息最终会成功诸如此类。</p>
<p>如果一个公平性假设不会阻止系统拒绝有限行为，而只拒绝无限行为——例如拒绝那种永远停在原地卡顿（stuttering）、什么也不做的行为7——那么该公平性假设就是机器闭包（machine-closed）的。更形式化地表述：如果你的公平性假设是机器闭包的，那么每个有限系统行为前缀都必须能够以某种满足你公平性假设的方式进行扩展。用人话说，这意味着在某种行为的任意特定时刻，它都可以突然醒悟并心想：“哎呀糟糕，我忘了我必须满足公平性假设！”，然后它便可以执行一系列动作去达成该假设。该行为在经过有限步之后，永远不可能陷入无法挽回的绝境。你可能已经注意到，这种“有限前缀必须能够以满足某种条件的方式进行扩展”的措辞，听起来有点像在讨论推测性未来执行！而这正是整个问题的关键所在。</p>
<p>假设你想验证状态 \(P\) 是否可以从系统的每个可能状态到达。如果这是真的，那么系统行为的某个子集将包含状态 \(P\)。事实上，其子集将包含 \(P\) 无限次。用 TLA⁺ 语言来说，它们满足公式 \(\Box \Diamond P\)8。那么，如果你能写出一个机器闭包的公平性假设 \(F\)，该假设仅允许极为受限的一组系统执行轨迹（traces），且所有轨迹均满足 \(\Box \Diamond P\)，那会怎样？这样一来，根据机器闭包的定义，该规约的每个有限前缀都可以被扩展以满足 \(\Box \Diamond P\)9。因此，该规约所允许的每个有限前缀都能到达 \(P\)！这便是在 TLA⁺ 中语义合法的可达性性质！其形式写为：<br />$$ (Spec \space \land \space F) \Rarr \Box \Diamond P $$</p>
<p>因此，我们已经将陈述“\(P\) 是否可从所有状态到达”的问题，简化为了寻找一个合适的公平性假设。抱有怀疑态度的读者完全有理由认为，我在此细节中塞入了相当多的预设。这就好比说，如果天上掉下来某个神奇的公平性假设，它既满足 1. 机器闭包，又 2. 能莫名奇妙地唯独筛选出满足 \(\Box \Diamond P\) 的执行轨迹，那我猜这确实行得通。但我们有什么理由相信存在这样一个公平性假设呢？在现实中对于任意给定的规约，我们究竟该如何推导它呢？</p>
<p>首先，我们应该在这里给读者一个中途退出的机会。如果你关心的仅仅是对有限状态系统的可达性进行模型检测，我们已经证明了可达性性质在线性时间逻辑中是可行的！讨论可达性并不是对 TLA⁺ 语义某种不可修复的决裂。去给 TLA⁺ 邮件列表发信，催促他们在 TLC 中加入可达性检测功能吧。本节剩余的内容只会吸引那些想要对无限状态系统进行形式化证明的硬核极客。</p>
<p>重申一下，如果你想证明规约满足可达性性质 \(P\)，只需推导出一个满足以下条件的机器闭包公平性假设 \(F\)：<br />在兰伯特（Lamport）的《证明可能性性质》（Proving Possibility Properties）一文中给出了关于 \(F\) 的通用存在性构造，因此只要 \(P\) 实际上是可达的，就必然存在一个合适的公平性假设；但是并没有一种机械化的方法去推导 \(F\) 并让它在证明中易于推理；这需要创造力！</p>
<p>让我们来看一个例子。考虑一个单变量 \(x\) 的规约，它充当一个既能递增也能递减的计数器：<br />$$ Up ≜ x^{\prime} = x + 1 $$<br />$$ Down ≜ (x &gt; 0) \land x^{\prime} = x - 1 $$<br />$$ Next ≜ Up \lor Down $$<br />$$ Spec ≜ (x = 1) \land \Box[Next]_x $$</p>
<p>假设我们想证明 \(x = 0\) 总是可达的——这显然是成立的。我们能构想出怎样一个既是机器闭包、又能确保 \(\Box \Diamond (x = 0)\) 的公平性假设 \(F\) 呢？</p>
<p>我们的初次尝试可能是走安全且熟悉的路线，令 \(F = SF_x(Down)\)。任何由 \(Next\) 子动作的弱公平性或强公平性合取构成的公平性假设，始终都会是机器闭包的。然而，这并不充分。那种每执行一步 \(Down\) 就会执行两步 \(Up\) 的行为同样满足此 \(F\)，却永远无法到达 \(x = 0\)：<br />$$ 1 \rightarrow 2 \rightarrow 3 \rightarrow 2 \rightarrow 3 \rightarrow 4 \rightarrow 3 \rightarrow 4 \rightarrow 5 \rightarrow \ldots $$</p>
<p>必须承认的是，我们不得不放弃构造机器闭包公平性假设的常规安全方式，并相信我们自己证明某个潜在公式具备机器闭包性的能力。沿着这条新进攻路线的良好第二次尝试是 \(F = \Diamond \Box [Down]_x\)：在某一特定时刻，该行为决定不顾一切，从此只执行递减。这很有前景！如果它从此只执行递减，那么它就会单调地朝 \(x = 0\) 逼近！它也是机器闭包的，因为任何行为都可以在任意时刻停下并直接开始递减。遗憾的是，这种做法失败了，因为它允许永久的卡顿停滞：<br />$$ 1 \rightarrow 1 \rightarrow 1 \rightarrow 1 \rightarrow 1 \rightarrow \ldots $$</p>
<p>修复方案简单且熟悉：将其与 \(Down\) 的弱公平性合取：<br />$$ F = \Diamond \Box [Down]_x \land WF_x(Down) $$</p>
<p>这同样也是机器闭包的，并且它必定能确保 \(\Box \Diamond (x = 0)\)。因此我们成功了！我们可以使用常规的活性（liveness）证明技术10，来证明从每一个状态出发 \(x = 0\) 均是可达的。</p>
<p>实际上，我们的例子揭示了一种更广泛的范式。对于为任意规约定义 \(F\)，一个不错的切入点具有如下形式：<br />$$ F = \Diamond \Box [A]_v \land SF_v(A) $$<br />其中 \(A\) 是一个动作（不一定是 \(Next\) 的严格子动作），它能够使系统中的每个状态都更接近 \(P\)。因此任何行为都可以在任意时刻放下手头的一切，径直朝 \(P\) 推进。当然，具体细节将取决于你的具体规约。</p>
<p>在之前的一篇文章中，我曾编写过一个最终一致性系统（一种无冲突复制数据类型，CRDT）的模型。最终一致性系统具有这样的性质：每个副本总是会与其他副本存在轻微的不同步，但如果事务停止流动，则保证所有副本最终都会收敛到系统的相同视图。我当时并没有意识到，但其实这正是一个可达性性质！我们希望系统总是能够收敛，而不是它必然总是会收敛！我最终采用了一种笨拙的方式来表达这一点：引入了一个人工的布尔标志（flag），它可以随时触发以停止新事务，随后检测当该标志为真时系统是否最终收敛。现在，掌握了上述在 TLA⁺ 中表达可达性性质的知识之后，那个标志本可以由一个公平性假设来代替！当时确实有人提出过类似的建议，只是我那时还没能理解。</p>
<p>所以实际上 TLC 现在确实支持检查可达性性质，只要用户将其表述为 \((Spec \space \land \space F) \Rarr \Box \Diamond P\) 的形式！这要求相当高，因为即便拥有十多年的 TLA⁺ 经验，直到写这篇博文之前我都未能理解这种方法。如果能在 TLC 中将可达性检查作为独立功能并通过反向可达性遍历来实现，将极大地提升其易用性。</p>
<p>坦白说，我是通过向 GPT-6 Astra 询问关于该章节的大量问题并消化其答案才做到这点的。不过，这篇博文完全是由人类结合我由此形成的新理解写成的。撰写本文不仅是向他人解释，也是对我自己的一次梳理复盘。↩︎</p>
<p>这本身就值得单独写一篇文章，但欲了解该运算符究竟有多奇特，可参阅《并发程序科学》（A Science of Concurrent Programs）第 6.4.4.3 节“Enabled 的麻烦”；它打破了逻辑代换规则！↩︎</p>
<p>你可以通过传入 CLI 标志 -deadlock 来让 TLC 跳过死锁检查。是的，这个命名很糟糕。你来想个更好的试试！↩︎</p>
<p>就像 TLA⁺ 本身风格化的名称一样！↩︎</p>
<p>在几个月前那些“古老”的日子里，此类单元测试是通过故意编写一个你预期会失败的不变量来完成的，仅仅是为了看到 TLC 输出一条违规轨迹（violation trace），从而让你确信状态空间的某些部分实际上是可达的。↩︎</p>
<p>你可以通过转移到 \(N\) 个初始状态之一然后永远静止（stutter）来使你的行为集合具有任意有限基数 \(N \in \natnums\)，但任何在其 \(Next\) 定义中允许动作改变变量的规约，都必定拥有无限数量的行为。↩︎</p>
<p>我认为把这种性质称为“非先知性”（non-prescient）比称为“机器闭合”（machine-closed）更有趣。在一个非先知性/机器闭合的公平性假设下，你的系统可以自然演化，而无需预先知晓进入状态空间的某些部分会导致其无法到达目标状态——从而先知般地避开进入该部分。因此，通常你会希望你的公平性假设是非先知性/机器闭合的，因为计算机目前还不像《沙丘》里的宇航公会领航员那样具有预知能力，以这种方式进行规约也是毫无意义的。William Schultz 写过一篇非常出色的文章，用图解直观地阐述了这一先知性概念。↩︎</p>
<p>即使 \(P\) 是一个像永久关闭计算机那样的吸收态（absorbing state），这也是成立的，因为在状态 \(P\) 中的静止步（stuttering step）满足 \(\Diamond P\) 和 \(\Box \Diamond P\)。↩︎</p>
<p>为什么不仅仅是 \(\Diamond P\)？因为那样你可能会得到一个已经访问过 \(P\) 的有限前缀，进而可以通过任何行为进行扩展以满足你的公平性假设，但该前缀的最后一个状态可能无法再次到达 \(P\)。我们希望捕获这样一种可能性：在到达过一次 \(P\) 之后，从 \(P\) 之后可达的状态自身无法再回到 \(P\)。↩︎</p>
<p>参见《并发程序科学》（A Science of Concurrent Programs）第 4.2.4 节“时序逻辑推理”（Temporal Logic Reasoning）及后续章节。↩︎</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-26 23:49 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://ahelwer.ca/post/2026-09-26-reachability/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-blog-2026-09-pun-html-faec2247cd7c39ef" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1594" data-content-paragraphs="1" data-published-at="2026-09-26T15:37:12.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 23:37</span>
</div>

### [JavaScript 的双关语：标签模板字面量](https://shukla.io/blog/2026-09/pun.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> The JavaScript Pun: tagged template literal</div>

<div class="article-body" data-article-body="true"><p>莎士比亚的作品里充满了双关语，这无疑是他对文字的精通与热爱的体现。<br />你很少能通过调换两个词的位置来组成一个语法正确的句子，但他却能像魔术师一样玩弄文字。<br />宁作聪明的愚人，不作愚蠢的聪明人。（Better a witty fool than a foolish wit.）<br />在上面的例子中，名词“fool”（愚人）变成了形容词“foolish”（愚蠢的），而形容词“witty”（聪明的）变成了名词“wit”（才智/聪明人）。最简单的双关语就是利用语法规则来改变词义。<br />还有一些双关语是通过在短语上做文章，利用语法之外的语境来改变含义。这里有一个我最喜欢的例子：<br />熄灭那盏灯，然后再熄灭那盏灯。（Put out the light, and then put out the light.）<br />第一个短语字面意思是吹灭蜡烛，而第二个则是杀死某人（在此处指苔丝狄蒙娜）的隐喻。<br />词典中关于双关语（pun）的正式定义通常会提到其“幽默”效果。<br />《牛津英语词典》<br />如今，我坚信幽默是因人而异的。我认为好笑的东西，你不一定觉得好笑。但我想向大家介绍一个我所发现的最绝妙的双关语。它并不是用英语写成的。自然语言与编程语言有一个共同的属性：语法。你已经见识过双关语如何借助语法大做文章了。<br />首先，简要介绍一下相关语法背景。在 JavaScript 中，有一种叫做“标签模板字面量”（tagged template literal）的特性，它能让你执行强大的字符串操作，如下所示：<br />在这段代码中，dedent 是一个标签函数（tag function），用于处理模板字面量以去除多余的缩进。标签函数分别接收模板字面量的文本片段以及求值后的 ${...} 表达式值作为独立参数，因此它可以对每一部分进行任意想要的处理。<br />大多数模板语言都允许你以与最终产品相同的介质编写模板：带有放置变量“占位孔”的文本。每当控制机制与其所控制的内容处于同一系统内时，事情就会变得耐人寻味。这里甚至有一个值得探索的“哥德尔不完备性”副线课题。不过我扯远了。这里是一个模板的简单例子：<br />{{ }} 这种语法非常普遍。事实上，以下模板语言都在使用它：<br />来看看这个。我们可以定义一个名为 prompt 的标签函数，让它看起来就像在接收 {{ }} 模板一样。<br />它看起来很熟悉而且赏心悦目，对吧？在幕后，它生成了一个字符串，该字符串将由可观测性工具（Helicone）进行处理，以协助分析提示词（prompts）。<br />在我看来，巧妙之处在于，代码中表面显现的 {{ }} 模板语法其实在 JavaScript 里纯属巧合出现：${...} 会对其内部的任何表达式求值，而 JavaScript 的对象属性简写语法 { name } 等价于 { name: name }。至此，标签函数 prompt 就拥有了为该字符串做恰当注解所需的全部信息。<br />JavaScript 看到的是一回事，而你看到的又是另一回事。{{ url }} 这种语法实际上只存在于你的脑海中。<br />好吧，也许我有点夸大了这个“双关语”，但我确实对此深感自豪。早在 2024 年，我就与来自 Helicone 的 Justin 一起研究过这个问题。这原本是我在内部使用的一个构想，后来 Justin 将其正式引入到了 SDK 中（Justin 的 PR，我的 PR）。我觉得这个双关语很有趣，Justin 也很乐意把它收录进去。<br />双关语就是一个具有两种解析方式的字符串。在《语法模型卷土重来，宝贝！》（Grammar models are back, baby!）一文中，我严肃对待了这一点，并给出了它们之上的概率分布。在《空间语言》（Spatial languages）一文中，我甚至变本加厉，为解析器引入了第二维度。<br />Nishant Shukla 2026-09-26</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-26 23:37 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://shukla.io/blog/2026-09/pun.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-he-steam-link-with-nixos-b4d639ab5f8c106a" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2664" data-content-paragraphs="21" data-published-at="2026-09-26T13:45:59.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 21:45</span>
</div>

### [要闻：前几天在翻壁橱时，我发现了一台早在 2018 年特价闪购时买的 Steam Link，这么多年过去了，它依然在尽](https://feyor.sh/blog/infecting-the-steam-link-with-nixos/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Infecting the Steam Link with NixOS</div>

<div class="article-body" data-article-body="true"><p>前几天在翻壁橱时，我发现了一台早在 2018 年特价闪购时买的 Steam Link，这么多年过去了，它依然在尽职尽责地低声运转。我突然想到，拥有一台配有以太网、WiFi、蓝牙和几个 USB 端口的常开低功耗 Arm 设备会非常顺手，于是便开启了我让 Steam Link 运行 NixOS 的探索之旅。</p>
<p>事实证明，一位名叫 fijam 的开发者已经摸清了在 Steam Link 上运行自定义 Linux 发行版所涉及的难点。最显著的障碍在于：Bootloader 只会引导经由 Valve 签名的内核；为了绕过这一限制，我们可以先引导进入经 Valve 认证的官方内核，然后再通过 kexec 引导我们的新内核。然而，Steam Link 自带的内核在编译时并没有启用 CONFIG_KEXEC。这正是绝妙之处所在：我们可以把相关的 kexec 源码拼凑成一个极小的内核模块，以此向正在运行的系统添加 kexec 系统调用！</p>
<p>此前已有好几个人成功利用这项技术引导了其他发行版1，但他们似乎都只是从 fijam 的网站上直接复制了 kexec 二进制文件和内核模块。fijam 人看起来很不错，但我对从网上随意下载内核模块始终抱有戒心，因此我决定自己动手编译。</p>
<p>编译 NixOS 用户空间以及内核/initrd 相当简单；你只需将正确的 system（由于我使用了 __splicedPackages/crossSystem，还需传入 pkgs）传递给 lib.nixosSystem 并添加你的模块即可。选择目标架构稍微有些曲折：Valve 的 steamlink 工具链使用的是 armv7a，但引入带有 crossSystem.config = “armv7a-unknown-linux-gnueabihf” 的 nixpkgs 会与 Go 语言的构建机制产生不良冲突，因此我改用了（看似）等效的 armv7l。</p>
<p>真正的挑战在于为一个经过厂商修改且已有 13 年历史的内核分支编译内核模块；NixOS wiki 在这里确实帮了大忙，指出了一些与 stdenv 中默认加固编译标志（hardening flags）相关的易踩坑点。</p>
<p>（关于 kexec_mod 源码，请参见 Files 部分。）</p>
<p>为了能够构建成功，我们需要让 Kbuild 指向一个已经通过 make modules 编译过的 Linux 内核源码目录2。（请注意，我使用的是来自我的 NixOS 配置中相对现代的内核的 moduleBuildDependencies 属性。）</p>
<p>在现代版本的 GCC 上构建费了一番周折，运用了几处 Hack 手法，但最终我还是成功编译了 3.8.13-mrvl 内核以及 kexec_mod 内核模块。</p>
<p>现在我们拿到了 kexec_mod.ko，接着还需要新的 initrd 和内核（它们全部来自我们的 NixOS 配置）、Steam Link 的设备树二进制文件（Device Tree Blob，该文件已被合并入 Linux 上游源码，因此我们可以从 hardware.deviceTree.package 获取）、一份 kexec 用户态二进制文件的副本（使用 pkgsStatic 编译，以便在非 NixOS 系统上运行），以及一个将所有这些串联起来的简短脚本：</p>
<p>你可以手动倒腾这些文件并自行上传到 USB 驱动盘中，但使用 sd-image NixOS 模块来直接创建一个磁盘映像要方便得多：</p>
<p>测试 kexec 的交接工作极其棘手，因为我所使用的内核无法驱动 HDMI 输出，而我又决定不拆机引出 UART 串口，因此我完全是在“盲飞”。我决定用一个基于 Busybox 的极简（粗制）initramfs 进行测试，该环境会在不同时长后重启，以此指示测试是否成功。</p>
<p>一旦确认可行，我便切换到启用了 boot.initrd.network.enable = true 的 NixOS initrd，并使用基于 Netcat 的反向 Shell 连接回我的笔记本电脑 IP，以进行进一步调试。</p>
<p>在这个阶段我需要解决的关键问题包括：将 reset_berlin 添加到 boot.initrd.availableKernelModules 以便能够读取 USB 驱动盘，以及弃用新的基于 systemd 的版本转而使用旧的 NixOS initrd 系统（boot.initrd.systemd.enable = lib.mkForce false）。</p>
<p>最终，我成功引导进入了用户空间，并通过 SSH 连接了上去！🥳</p>
<p>话虽如此，我用来引导的 USB 镜像体积高达沉重的 2.3GB……毫无疑问，我们完全可以做得更精简。</p>
<p>令我感到意外的是，市面上居然没有一份关于缩减 NixOS 闭包体积（closure sizes）的权威指南；我找到了一些 NixOS Discourse 论坛的提问和几篇博客文章，其中最有参考价值的撰文是《NixOS is a good server OS, except when it isn’t》以及《I can haz smoller NixOS ISOs?》。这些都是不错的参考资料，但因为我们的目标是真实的物理硬件而非虚拟机，因此在精简裁剪时必须更加克制和谨慎。</p>
<p>以下是在“瘦身”过程中涉及的主要内容：</p>
<p>在达到收益递减的临界点、且多数新改动都会导致系统崩溃之后，我认为这个 1.2GB 大小的磁盘镜像已经“足够好了”。</p>
<p>我所使用的 Nix flake 以及 kexec_mod 内核模块的源码可以在此处下载。为了方便查阅，下文也附上了完整的 flake.nix。</p>
<p>就在我发布本文之前，我发现另一个人也凭着感觉摸索出了可引导的 NixOS 安装方案，不过他们的配置更加“粗制滥造”，无法正确处理重启，而且直接使用了一堆非必要的二进制 blob，而不是从源码构建。↩︎</p>
<p>尽管使用 make modules_prepare 可以让我们成功完成构建，但生成的内核模块不会带有正确的 vermagic 和符号地址，也无法被 insmod 接受：<br />注意：“modules_prepare” 即使在设置了 CONFIG_MODVERSIONS 的情况下也不会构建 Module.symvers；因此，必须执行一次完整的内核构建才能使模块版本控制正常工作。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-26 21:45 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://feyor.sh/blog/infecting-the-steam-link-with-nixos/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-go-concurrency-distilled-d556f1ce2ab954a8" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="8226" data-content-paragraphs="27" data-published-at="2026-09-26T12:14:01.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 20:14</span>
</div>

### [Go 并发精要](https://antonz.org/go-concurrency-distilled/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Go concurrency distilled</div>

<div class="article-body" data-article-body="true"><p>这本迷你书简要概述了 Go 语言中的诸多并发主题。每个主题都附带交互式示例——欢迎通过修改代码并点击“运行”（Run）来动手实践。此外还提供包含静态示例的 PDF 版本。<br />这是针对 Go 并发的快速温习资料，并非初学者指南。如果你想通过实操练习从零基础系统学习并发，请参阅我的另一本书——《Gist of Go: Concurrency》（Go 语言要义：并发篇）。<br />本书内容不含 AI 生成。<br />Goroutine • 通道（Channels） • Select • 管道（Pipelines） • 时间（Time） • 上下文（Context） • 等待组（Wait groups） • 数据竞争（Data races） • 竞态条件（Race conditions） • 互斥锁（Mutexes） • 信号量（Semaphores） • 信号通知（Signaling） • 单次执行（Run once） • 对象池（Object pool） • 原子操作（Atomics） • 测试（Testing） • 调度（Scheduling） • 诊断（Diagnostics） • 结语<br />Go 语言中并发的基础是 goroutine——即使用 go 关键字启动的函数：<br />Go 运行时负责调度这些 goroutine，并将它们分发到运行在 CPU 核心上的操作系统线程中。与操作系统线程相比，goroutine 极为轻量，因此你可以创建成百上千个 goroutine。<br />Goroutine 之间是完全独立的。main 函数本身也是一个 goroutine，但它是在程序启动时隐式启动的。当 main 函数结束时，其他 goroutine 也会随之终止。<br />在上述示例中，我们使用等待组（sync.WaitGroup）来等待 goroutine 执行完毕。等待组内部包含一个计数器。调用 Add(n) 会使计数器增加 n，而调用 Done() 会使其减一。Wait() 会阻塞调用它的 goroutine（在本例中为 main），直到计数器归零。通过这种方式，main 会在退出前等待两个工作协程（worker）全部完成。<br />WaitGroup.Go 会自动递增等待组计数器，在 goroutine 中运行指定的函数，并在该函数执行完毕后自动递减计数器：<br />Goroutine 之间可以通过通道（channel）传递值。通道就像一扇窗口，一个 goroutine 可以从中抛出物品，另一个 goroutine 则可以接住它：<br />通过通道发送值是一个同步操作。当发送方 goroutine 向通道写入一个值时（ch &lt;- val），它会发生阻塞，等待接收方接收该值（&lt;-ch）。只有在接收完成后，发送方才会继续执行。<br />在函数中返回一个输出通道并在其内部的 goroutine 中向该通道填充数据，是 Go 语言中一种常见的模式。这使得调用方可以通过通道接收数据，而所有者函数仍保留对其的控制权：<br />为了向读取方发出所有数据均已发送完毕的信号，写入方 goroutine 会使用 close() 关闭通道：<br />读取方在读取时通过第二个返回值（即“comma OK”机制）来检查通道的状态：<br />当通道处于打开状态时，读取方会接收到下一个值以及 true 状态。如果通道已被关闭，读取方则会获得该类型的零值以及 false 状态。<br />一个通道只能被关闭一次。重复关闭通道或向已关闭的通道写入数据都会引发 panic。<br />关闭通道的唯一目的是向其读取方发出所有数据已发送完毕的信号。如果这对于读取方并不重要，那么你无需关闭它。当一个通道不再被使用时，无论它是否关闭，Go 的垃圾回收器都会释放其占用的资源。<br />range 会自动从通道中读取下一个值并检查其是否已关闭。如果通道已关闭，它便会退出循环：<br />与切片上的 range 不同，在通道上使用 range 仅返回单个值，而非键值对。<br />你可以通过设置通道的方向来防止意外的写入/关闭错误。通道可以是：<br />你不能从只写通道中读取数据，也不能向只读通道中写入数据（亦不能对其执行关闭操作）。<br />通道在初始化时通常同时支持读写，但在函数参数中会被指定为具向通道。Go 会自动将常规通道转换为具向通道：<br />有缓冲通道的作用类似于先进先出（FIFO）队列，具有用于存储值的固定大小缓冲区。<br />只要缓冲区内有空闲空间，向通道写入数据就不会阻塞 goroutine。同样，只要缓冲区中包含数据，从通道中读取数据也不会阻塞 goroutine：<br />默认情况下，如果你未指定缓冲区大小，通道即为无缓冲通道（缓冲区大小等于零）。<br />有缓冲通道支持内置的 len() 和 cap() 函数：<br />从已关闭的有缓冲通道中读取数据时，会返回缓冲区中的值以及 true 状态。一旦所有值都被取尽，它将返回零值以及 false 状态，这与常规通道相同：<br />与 Go 中的其他类型一样，通道也有零值，即 nil。<br />向 nil 通道写入或从中读取数据都会使 goroutine 无限期阻塞：<br />关闭一个 nil 通道会引发 panic：<br />select 语句在某种程度上类似于 switch，但专门用于通道。其作用如下：<br />Select 用于管理管道中的数据流：<br />用于取消 goroutine：<br />用于非阻塞操作：<br />管道（pipeline）是一系列操作步骤，其中每个步骤接收输入数据，以特定方式进行处理并输出。每个操作的输入和输出都是一个通道。<br />典型的管道如下所示：<br />Goroutine 可以使用输出通道向其他 goroutine 发出其已完成工作的信号：<br />如果一个 goroutine 不需要返回结果，它可以通过 done 通道发送完成信号：<br />为了提前终止一个 goroutine，调用方 goroutine 可以使用 cancel 通道：<br />在并发管道中进行错误处理有三种方式。<br />➊ 遇到第一个错误即返回：<br />➋ 使用结果包装类型（result type）：<br />➌ 单独收集错误：<br />除了处理日期和时间外，time 包还提供了用于在并发程序中管理时间敏感操作的工具。<br />time.After() 返回一个初始为空的通道，但在超时时间到达后会接收到一个值。它在处理超时操作时非常有用：<br />withTimeout() 等待 fn() 执行完成，但由于使用了 time.After()，其等待时间绝不会超过指定的超时时长：<br />定时器（time.Timer）是一个结构体，其中包含一个 C 通道，当定时器触发（到期）时会向该通道发送当前时间。定时器非常适用于规划未来的执行任务：<br />Stop() 用于停止定时器；如果定时器尚未到期，则返回 true，否则返回 false：<br />使用 time.AfterFunc() 封装函数通常更为便捷。它在等待时长 d 之后执行函数 f：<br />time.AfterFunc() 返回一个定时器，你可以在其开始执行之前将其取消：<br />如果在循环中使用定时器，最好创建单个定时器并在每次迭代时重置（reset）它，而不是每次都创建一个新实例：<br />Ticker（打点器）类似于定时器，但它会持续触发，直到你将其停止。Ticker 非常适用于执行周期性任务：<br />NewTicker(d) 创建一个打点器，以时间间隔 d 向通道 C 发送当前时间。你最终必须使用 Stop() 停止打点器以释放资源。<br />如果通道读取方的处理速度跟不上打点器，打点器将会跳过滴答脉冲。<br />上下文（Context）的主要目的是取消操作，无论是通过手动取消还是通过超时/截止时间取消。<br />该函数接收一个 context，并使用其 Done() 通道来监听取消信号：<br />手动取消（返回 context.Canceled 错误）：<br />按超时取消（返回 context.DeadlineExceeded 错误）：<br />按截止时间取消（返回 context.DeadlineExceeded 错误）：</p>
<p>Context 是分层的。Context 对象是不可变的。为了向 context 添加新属性，需要基于旧的（父级）context 创建一个新的（子级）context。在父级与子级 context 的超时设置中，总是较短的超时生效。子级 context 只能缩短父级的超时时间，不能延长：<br />多次取消是安全的。你可以根据需要对 context 调用任意次 cancel()。首次取消操作会生效，后续调用将被忽略。<br />你可以使用 context.WithCancelCause()、context.WithTimeoutCause() 和 context.WithDeadlineCause() 指定自定义的取消原因。该原因可通过 context.Cause() 获取：<br />Context 可以通过 context.WithValue() 传递有关调用的额外信息，这会创建一个包含特定键值对的 context。但通常最好避免在 context 中传递值。更好的做法是使用显式参数或自定义结构体。<br />sync.WaitGroup 类型允许你等待一个或多个 goroutine 完成执行：<br />WaitGroup 对其管理的 goroutine 一无所知。它是基于内部计数器工作的。调用 wg.Add(1) 会将计数器加一，而 wg.Done() 会将其减一。wg.Wait() 会阻塞调用它的 goroutine，直到计数器归零。<br />Go 方法结合了 Add、启动 goroutine 和 Done 操作：<br />所有方法都可以安全地在多个 goroutine 中使用。<br />通常情况下，所有 Add 调用都会发生在 Wait 之前。但从技术上讲，并不限制你在 Wait 之前进行部分 Add 调用，而在之后（从另一个 goroutine 中）进行其余调用。<br />你可以从多个 goroutine 中调用 Wait。它们都将被阻塞，直到该组的计数器归零。<br />当多个 goroutine 访问共享数据，且其中至少有一个对其进行修改时，就会发生数据竞争（data race）。我们需要保护数据免受此类并发访问的影响。<br />数据竞争并不总会导致运行时恐慌（panic）。这就是 Go 提供名为 race detector（竞争检测器）的专用工具的原因。你可以通过 race 标志将其启用，该标志适用于 test、run、build 和 install 命令。<br />Channel 对于并发读写是安全的，不会引起数据竞争。<br />预防数据竞争的方法：<br />当来自多个 goroutine 的不可预测操作顺序导致系统处于不正确状态时，就会发生竞态条件（race condition）：<br />如果单个操作都是并发安全的，Go 的竞争检测器就不会发现任何问题。正因如此，它无法捕获竞态条件：<br />你无法完全消除并发环境中的不确定性。事件将以不可预测的顺序发生——这正是并发的工作机制。然而，你可以防止竞态条件——通常通过使用互斥锁保护复合操作来实现：<br />有时你可以在不使用互斥锁的情况下防止竞态条件，方法是应用原子比较并交换（compare-and-set）操作或其衍生形式：<br />核心思路始终相同：<br />sync.Mutex 类型用于保护共享数据和代码片段免受并发访问：<br />互斥锁保证在同一时刻只有一个 goroutine 可以执行 Lock() 和 Unlock() 之间的代码。<br />互斥锁适用于以下场景：<br />如果所有 goroutine 都只是读取数据，则不需要互斥锁。<br />TryLock 方法尝试锁定互斥锁，就像普通的 Lock 一样。但如果无法获取锁，它会立即返回 false，而不是阻塞该 goroutine：<br />sync.RWMutex 类型区分读取者和写入者。它提供了两套方法：<br />其工作原理如下：<br />这就构建了一个“单写入者，多读取者”的架构。<br />sync.Mutex 和 sync.RWMutex 都实现了同一个 sync.Locker 接口：<br />通过使用 Locker 而不是特定的互斥锁类型，你可以构建不依赖于特定锁实现的组件。这使得调用方可以自行决定使用哪种锁。<br />你可以使用 channel 代替互斥锁来保护共享数据：<br />信号量就像一个具有 N 个可用槽位的容器，并具备两种操作：acquire（获取）占用一个槽位，以及 release（释放）腾出一个槽位。以下是信号量的规则：<br />你可以使用带缓冲的 channel 实现一个简单的信号量，其中 N 是 channel 的容量大小。要获取信号量，向 channel 发送一个值。要释放它，从 channel 中取出一个值：<br />对于更复杂的场景，请使用 golang.org/x/sync/semaphore 包。<br />会合点（rendezvous）允许两个 goroutine 互相等待：<br />你可以使用 wait group 实现一个简单的 rendezvous：<br />屏障（barrier）是 rendezvous 的泛化形式。它允许 N 个 goroutine 互相等待：<br />你可以使用 wait group 实现一个简单的屏障：<br />sync.Cond（条件变量）类型允许一个 goroutine 向另一个 goroutine 发出它已准备就绪的信号，并允许另一个 goroutine 等待该信号。<br />Cond 包含一个互斥锁，并具有两个方法——Wait 和 Signal。<br />如果在调用 Signal 时有多个正在等待的 goroutine，则只会唤醒其中一个。如果没有正在等待的 goroutine，Signal 则什么都不做。<br />你还可以使用 Broadcast 方法。Signal 只会唤醒在 Cond.Wait 上等待的一个 goroutine，而 Broadcast 方法会唤醒所有处于等待状态的 goroutine。<br />你可以使用 channel 发送信号：<br />sync.Once 类型确保给定函数仅执行一次。如果多个 goroutine 同时调用 Once.Do，只有其中一个会运行该函数，其余的将一直等待直到其返回：<br />Once 非常适合在并发环境中进行单次初始化或清理工作。<br />除了 Once 类型外，sync 包还包含三个便捷的 once 函数：<br />sync.Pool 类型有助于复用内存而不是每次都分配，从而减轻垃圾回收器的负担：<br />Get 从池中取出一项。如果没有可用项，它会使用 New 创建一个新项（我们必须自行定义该项，因为池对其创建的对象一无所知）。Put 将一项归还给池。<br />需要注意的事项：<br />没有同步机制的操作只有在转换为单条处理器指令时才能成为真正的原子操作。此类操作不需要锁，并且在并发调用时不会引起问题（即使是写入操作）。<br />原子类型的数量很少，它们都在 sync/atomic 包中：<br />每个原子类型都提供以下方法：<br />数值类型还提供了一个 Add 方法，用于将值增加指定的数量。<br />所有方法要么被转换为单条 CPU 指令，要么在其他层面被保证是原子的，因此它们可以安全地在多个 goroutine 中使用。<br />原子操作的组合始终是非原子的：<br />使复合操作具备原子性并防止竞态条件的安全可靠方法是使用互斥锁：<br />有时你可以使用原子类型代替互斥锁来实现提前退出：<br />如果你的并发程序使用了 channel 或带有类似 Wait 同步方法的自定义类型，你可以在测试中使用它们。这样一来，你的测试就不会比同步代码复杂太多：<br />如果你测试的代码中没有任何合适的同步“钩子”，可以使用 synctest 包。它导出了两个函数：</p>
<p>synctest.Test 会运行一个隔离的气泡（bubble）。该气泡使用伪时钟，并且你可以通过 synctest.Wait 手动控制 goroutine 的同步。</p>
<p>synctest.Wait 会一直阻塞，直到气泡中的所有 goroutine——除了调用 Wait 的那一个之外——要么已经执行完毕，要么处于持久阻塞（durably blocked）状态。这让你可以等待特定的 goroutine 结束或被阻塞，从而方便检查程序的状态：</p>
<p>synctest.Test 中的伪时钟仅在以下条件同时满足时才会向前推进：➊ 气泡中的所有 goroutine 均处于持久阻塞状态；➋ 未来某个时刻至少会有一个 goroutine 被解除阻塞；以及 ➌ synctest.Wait 当前未在运行。得益于此，依赖时间测试的运行几乎是瞬时完成的：</p>
<p>以下操作会持久阻塞一个 goroutine：</p>
<p>在互斥锁、I/O 或系统调用上的阻塞不被视为持久阻塞，synctest 气泡无法处理它们。</p>
<p>在硬件层面，CPU 核心负责并行执行任务。</p>
<p>在操作系统层面，线程是基本的执行单元。线程的数量通常远多于 CPU 核心数，因此操作系统的调度器负责决定运行哪些线程以及暂停哪些线程。</p>
<p>在 Go 运行时层面，goroutine 是基本的执行单元。运行时调度器运行着固定数量的操作系统线程，通常每个 CPU 核心对应一个。goroutine 的数量可能远远超过线程数，因此调度器负责决定在可用线程上运行哪些 goroutine 以及暂停哪些。调度器在各个 goroutine 之间不断切换，以确保每个 goroutine 都有机会在线程上运行，而不是永远排队等待。</p>
<p>这就是 Go 处理并发的方式。</p>
<p>goroutine 调度器的职责是将 M 个 goroutine 调度运行在 N 个操作系统线程上，其中 M 可以远大于 N。以下是其算法的极简版本：</p>
<p>运行 Go 代码的线程数量由 GOMAXPROCS 环境变量或 runtime.GOMAXPROCS 函数控制。</p>
<p>goroutine 是一种初始占用约 2 KB 内存的结构体，主要用于其自身的栈空间。栈按需可以扩容。由于 goroutine 非常轻量，你可以在一台小型机器上同时运行数万甚至数十万个 goroutine。</p>
<p>为了在生产环境中排查并发程序的问题，我们使用指标（metrics）、性能分析（profiling）以及追踪（tracing）。</p>
<p>指标（Metrics）反映了 Go 运行时的表现，例如它使用了多少堆内存，或者垃圾回收停顿耗时多久。每个指标都有唯一的名称和一个值，该值可以是一个数字或一个直方图。</p>
<p>你可以使用 runtime/metrics 包来获取完整的指标列表或查看特定指标的值：</p>
<p>在实践中，人们很少手动执行此操作。相反，所有指标通常都会借助 Prometheus 或 OpenTelemetry 库自动导出。</p>
<p>性能分析（Profiling）有助于你深入了解程序具体在做什么、使用了哪些资源以及发生在代码的哪个位置。Go 使用了适合在生产环境中运行的采样性能分析器。</p>
<p>最常用的 profile 是 CPU（显示每个函数消耗了多少处理器时间）和堆（heap，显示每个函数使用了多少堆内存）。goroutine、阻塞（block）和互斥锁（mutex）的 profile 则有助于排查与并发相关的问题。</p>
<p>为应用程序添加性能分析器最简单的方式是使用 net/http/pprof 包。要采集指定名称的 profile，只需请求 /debug/pprof/{name} 端点即可。要查看采集到的 profile，请使用 go tool pprof 工具：</p>
<p>你也可以手动进行性能分析：</p>
<p>追踪（Tracing）会在程序运行时记录特定类型的事件，主要是与并发和内存相关的事件。当 net/http/pprof 包中的性能分析服务器正在运行时，请求 /debug/pprof/trace 端点即可采集 trace。要查看结果，请使用 go tool trace 工具。</p>
<p>你也可以手动采集 trace：</p>
<p>你可以设置基于大小或时长限制的滑动窗口自动化追踪。这被称为“飞行记录”（flight recording）。它能让你始终保留一份近期的 trace 记录，以便在出现异常时进行排查：</p>
<p>我们已经介绍了许多用于编写并发程序的 Go 工具：</p>
<p>如果你喜欢这本书，请向你的朋友或同事推荐它。如果你感兴趣，</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-26 20:14 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://antonz.org/go-concurrency-distilled/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--z-drinking-habits-study-f2b1d23ca26ba639" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="258" data-content-paragraphs="3" data-published-at="2026-09-26T12:00:35.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 20:00</span>
</div>

### [研究发现：美国年轻一代减少饮酒，X世代饮酒量却在增加](https://www.theguardian.com/society/2026/sep/26/gen-x-z-drinking-habits-study)
<div class="original-title-sub"><span class="orig-tag">原文</span> Gen X is drinking more as younger Americans cut back on alcohol, study finds</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/119efa376e78efffe84d8cc1244179a92ac12a8e/466_0_5001_4000/master/5001.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=544a72d5ac047fb06c940ffc159f4eeb" alt="研究发现：美国年轻一代减少饮酒，X世代饮酒量却在增加" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>在年轻一代饮酒量减少的同时，50至64岁的成年人饮酒量却在上升，这一转变正在重塑美国的酒吧格局。</p>
<p>一项新研究显示，近年来全美饮酒量普遍下降，尤其是在40岁以下的成年群体中；然而，有一个较年长的群体饮酒人数比新冠疫情前有所增加，且重度饮酒者也更多。</p>
<p>根据发表在《内科学年鉴》（Annals of Internal Medicine）期刊上的一份报告，2022年至2024年间，饮用任何酒精饮品的美国成年人比例自疫情暴发前以来首次出现下降。而大致对应于X世代的50至64岁人群，则是唯一一个饮酒比例持续上升的年龄段。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-26 20:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/2026/sep/26/gen-x-z-drinking-habits-study" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--server-for-benchmarking-dae3d53b7cb6ad39" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2494" data-content-paragraphs="23" data-published-at="2026-09-26T11:48:40.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 19:48</span>
</div>

### [调优服务器以进行基准测试](https://david.alvarezrosa.com/posts/tuning-a-server-for-benchmarking/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Tuning a Server for Benchmarking</div>

<div class="article-body" data-article-body="true"><p>代码优化始于衡量，而衡量只有具备可重复性才有价值：在 5% 的噪声干扰下，2% 的提升根本无法被察觉。然而在一台未经调优的机器上，相同的二进制程序在多次运行之间很容易出现百分之几的快慢波动。在本文中，我们采用一个微型基准测试，逐步对机器进行调优，并在每次更改后重新测量，直到运行结果变得具有确定性。1 1 请注意，为基准测试调优不同于为性能调优：基准测试需要机器表现出可重复性，哪怕以牺牲部分峰值速度为代价；而生产环境机器则追求榨干每一分极限速度。</p>
<p>我们的示例程序以短促突发的方式对一个双精度浮点数数组求和。真实的业务服务很少会持续拉满 CPU：它们通常处理一个请求、进入空闲，然后唤醒处理下一个请求。这里的每一次计时迭代都会在 2 毫秒的空闲间隔后执行 256 次求和突发，而空闲间隔被排除在测量之外。2 2 PauseTiming / ResumeTiming 将休眠时间排除在测量时间之外，而 DoNotOptimize 保证结果在经过优化器处理后依然存活；否则编译器会直接删掉整个循环。</p>
<p>使用所有优化项以 Release 模式编译它：-O3 以及 -march=native -mtune=native -flto -ffast-math。然后重复运行十次并汇总结果。</p>
<p>值得关注的一行是 cv，即变异系数：标准差除以均值。各次运行之间存在近 3% 的噪声——任何小于该幅度的优化都将无法察觉。让我们把它降下来。</p>
<p>在调整任何参数之前，先看看你正在调优的对象。lstopo 可以用一张图绘制出整台机器：缓存、核心、SMT（超线程）配对以及挂载在其上的 PCIe 设备。首先看我的笔记本电脑：</p>
<p>图 1：我的笔记本电脑（Intel Core Ultra 5 135U）。三种核心：两个性能核（P-core），各有两条硬件线程（虚线）；八个能效核（E-core），以四个一组的形式共享 L2 缓存；以及两个低功耗能效核（左下角），完全位于 L3 缓存之外。</p>
<p>在这里，核心的选择会改变你测量到的结果：如果落在 CPU 4 上，你得到的是频率较低的能效核；如果落在 CPU 12 上，你连 L3 缓存也会失去。现在将其与我的家庭实验室服务器进行对比：</p>
<p>图 2：我的家庭实验室服务器（AMD Ryzen 7 PRO 8700GE）。八个完全相同的核心，拥有相同的缓存；NVMe 硬盘和网卡挂在右侧的 PCIe 上。</p>
<p>在这台服务器上，每个核心都完全一致：同构机器是更好的基准测试平台。一旦基准测试涉及 I/O，PCIe 侧就变得至关重要：它展示了你正在调用的 NVMe 或网卡，在多插槽机器上，还显示了它挂载在哪个 NUMA 节点上。</p>
<p>调度器可以自由地在不同核心之间迁移基准测试，而每次迁移都会丢弃预热好的缓存。在混合架构 CPU 上情况更糟：性能核与能效核运行相同代码的速度大相径庭，因此结果会因进程落在何处而呈现双峰分布。将基准测试绑定到单个核心（在混合架构上绑定到 P 核）：</p>
<p>均值下降至 55.3 微秒，变异系数减少了一半以上，降至 1.06%。收益比单纯的迁移开销所暗示的还要大：现在每次突发都会唤醒同一个核心，因此该核心的时钟频率在突发之间根本没有时间回落。3 3 核心绑定将基准测试固定在该核心上，但并不能阻止其他任务在其上运行。在繁忙的机器上，可以更进一步，仅为基准测试保留该核心，无论是在内核命令行中配置（isolcpus=2 nohz_full=2 rcu_nocbs=2），还是在运行时通过 cpuset cgroup 配置。</p>
<p>默认情况下，Linux 会根据负载调节 CPU 频率，因此基准测试会在较冷的低频状态下启动，在较热的高频状态下结束。将频率调节器切换为 performance（性能模式），使时钟频率锁定在高位：</p>
<p>并验证其是否生效：</p>
<p>重新测量的均值为 54.9 微秒，变异系数为 0.79%。这个增幅看起来不大，仅仅是因为绑定核心已经保持了该核心的时钟处于预热状态：单独使用性能调节器就能让未绑核的基准线从 99.6 微秒直接缩短至 54.5 微秒。无论如何，再也没有任何突发会在低温低频下被唤醒了。</p>
<p>CPU 仍与其 SMT 兄弟线程共享执行单元和 L1/L2 缓存：调度器放置在那里的任何任务都会扰乱我们的测量。彻底禁用 SMT：</p>
<p>变异系数降至 0.26%，改善了三倍：核心现在完全独占其执行单元和缓存。</p>
<p>即使使用性能调节器，睿频频率也会随温度和功耗预算而变化：在较热机器上的同一次运行，其时钟频率会低于较冷机器。禁用睿频以获得稳定的时钟频率：</p>
<p>在这台机器上并没有任何变化，因为我们短促的突发本就没有给芯片足够的时间来提升频率。在睿频确实生效的机器上，预计均值反而会上升：因为你放弃了峰值性能。这种权衡完全可以接受，因为在优化时我们关心的是相对数值，而这些数值现在在多次运行之间具备了可比性。4 4 低延迟生产调优则采取相反的做法并保持睿频开启：在那里，每一纳秒都至关重要。对延迟最敏感的高频交易公司甚至更进一步，运行超频服务器，将其锁定在高于出厂规格的固定全核频率上——通过更好的散热换取速度与稳定的时钟。</p>
<p>这里用一张表格汇总了整个过程，每一行都在前面所有改动的基础上叠加了一项新改动。我们将噪声从近 3% 降低到 0.26%，并且在此过程中速度提升了 1.8 倍；如今千分之五的差异也成为了真实、可衡量的信号。5 5 欢迎使用我 CppPlayground 代码仓库中的基准测试在您的机器上复现。</p>
<p>在更繁忙的机器上，还有一系列长尾参数值得一试：禁用地址空间布局随机化（ASLR）、NMI 看门狗或透明大页。bench-remote.sh 脚本应用了所有这些设置。重启后这些设置都不会保留，但这正是你想要的：调优、测量，然后重启恢复为正常机器。</p>
<p>可复现的基准测试万岁！</p>
<p>我的邮件列表免费、不定期发送，涵盖各类主题。我绝不会出售或分享您的电子邮箱地址。</p>
<p>有反馈？请发送邮件至 david@alvarezrosa.com。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-26 19:48 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://david.alvarezrosa.com/posts/tuning-a-server-for-benchmarking/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--other-what-do-we-become-150123896cddcf1d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="440" data-content-paragraphs="4" data-published-at="2026-09-26T11:02:48.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 19:02</span>
</div>

### [如果我们不再停下来互相帮助，我们将会变成什么？](https://blog.codinghorror.com/if-we-do-not-stop-to-help-each-other-what-do-we-become/)
<div class="original-title-sub"><span class="orig-tag">原文</span> If we do not stop to help each other, what do we become?</div>

<div class="article-body" data-article-body="true"><p>昨天，我收到了这封针对《你无法凭感觉编织代码之爱》（You Can&#39;t Vibe Code Love）的回复邮件。这番表述如此发人深省、掷地有声，以至于我征求了对方的许可，在隐去个人身份信息后将其全文分享于此：</p>
<p>也许大语言模型（LLM）正是一个提醒：提醒我们应该付出额外的努力来培育彼此之间的关系，并在网络上建立社区——属于我们自己、而非属于某个亿万富翁的社区。在这些社区里，我们会经常停下脚步互相提供帮助，因为我们同样也是通过这种方式学习的。而如果我们不再停下来互相帮助……我们又将变成什么？</p>
<p>室内活动爱好者。Stack Overflow、Discourse 和 staygold.us 联合创始人。免责声明：我完全不知道自己在胡说些什么。让我们善待彼此。你可以在这里找到我：https://infosec.exchange/@codinghorror</p>
<p>⏲️ 正在为您办理订阅。<br />❗ 出现错误，请重试。<br />✅ 订阅成功！请检查您的收件箱（以防万一，也请检查垃圾邮件文件夹）。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-26 19:02 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.codinghorror.com/if-we-do-not-stop-to-help-each-other-what-do-we-become/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::