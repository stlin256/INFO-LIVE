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
<div id="story-blog-260803-c4063dec7d9ea3c1" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1952" data-content-paragraphs="14" data-published-at="2026-09-20T21:13:51.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 05:13</span>
</div>

### [确定性核心，非确定性外壳](https://outdata.net/blog/260803)
<div class="original-title-sub"><span class="orig-tag">原文</span> Deterministic Core, Non-Deterministic Shell</div>

<div class="article-body" data-article-body="true"><p>十四年前，Gary Bernhardt 提出了“函数式核心，命令式外壳”（Functional Core, Imperative Shell）这一术语。如同计算机领域大多数优秀的理念一样，它并非完全崭新，但他的构想格外清晰，为探讨现有系统中的测试与确定性奠定了极佳的基础。</p>
<p>简而言之，“函数式核心/命令式外壳”架构将代码划分为两个部分。函数式核心是纯函数式的——即没有 I/O 操作，也没有破坏性的状态更新。它关注的是应用程序的业务逻辑。命令式外壳的分支路径相对较少，但它负责维护状态、协调外部依赖并与外界交互——也就是处理 I/O。它的职责是以某些值向核心发起查询，接收作为某种黑盒决策结果返回的值，并利用这些值与外部世界交互；无论是写入数据库、发送请求，还是更新图形用户界面（GUI）。</p>
<p>在这种模型中，外壳和核心具有截然不同的特征：</p>
<p>这使得核心非常易于测试。由于它是纯函数式的，相同的输入将始终获得相同的结果。由于它是隔离的，因此无需进行任何模拟（mock）或桩（stub）。而且，由于它处理复杂的业务逻辑，测试可以向我们清晰揭示系统是如何运作的。</p>
<p>要更简练地描述纯函数易于测试的特性，那就是它们具有“确定性”（deterministic）。也就是说——给定一串输入流，纯函数总是返回相同的一串输出流；它们的行为是可重复的。但纯函数式编程并不是达到这一目标的唯一途径。如果我们换个角度看，就会发现值流（stream of values）和赋值序列（sequence of assignments）只是表达同一件事的不同方式，而状态机（State Machines）同样能为我们带来相同的好处。请看以下代码：</p>
<p>函数 add 很容易推导；它是纯函数，因此具有确定性。但是 AddMachine 同样具有确定性——给定对状态转移函数的相同调用序列，AddMachine 将返回相同的状态。它是命令式的这一事实并不会改变这一点。</p>
<p>纯函数式编程是一种优秀的范式，但出于语言或性能方面的考量，它并不总是切合实际——我绝不想在 C 语言中尝试它！但如果将要求从“纯函数式”放宽至“仅仅具备确定性”，我们就能在保留“函数式核心，命令式外壳”的易测试性优势的同时，拓宽其适用范围。这正是本文标题的由来了：确定性核心，非确定性外壳。</p>
<p>相比函数纯度，确定性可能感觉是一个更抽象的概念。你该如何识别它？我发现从“什么不是确定性的”入手并进行反向推导会更容易。以下是一些不可重复行为的常见例子：</p>
<p>所有这些都属于非确定性外壳。每当你在业务逻辑中发现它们时，你就找到了进行碎片整理（defragmentation）的天然目标——要么围绕它们将函数拆分为两部分，要么将它们提升一层，并将其结果作为参数注入。将“外壳”这一比喻理解得更形象一些是很有启发的：它应当包围着逻辑，向应用程序的心脏发起查询以获取所需内容。</p>
<p>你可能会想：“这听起来都很棒，但对我这种在工业界的遗留代码和玄学代码堆里苦苦挣扎的人来说，有什么用呢？”。虚拟的读者啊，这是一个合理的指责；并不是每个人都能成为 Foundation DB 并在第一天就做好这种区分（他们实际上走得更远，但这属于另一篇文章的话题了）。在我见过的几乎所有现实代码库中，确定性与非确定性都是高度交织在一起的，而我见过的代码库可不算少。</p>
<p>但不要让完美成为优秀的敌人！看待你手头普通（即糟糕）代码库的一种方式是，将其视为拥有许多确定性核心。它们有成千上万个，像天空中的繁星一样散落在一堆垃圾代码之中。悲观的看法是这些代码库是无可救药的遗留烂摊子；但乐观的看法是，许多确定性核心正隐藏在内部的某个地方，也许只是一小撮。</p>
<p>较老 Windows 系统的用户可能还记得“磁盘碎片整理程序”；它将物理上分散在机械硬盘各处的文件内容重新整理为连续存放。在读取速度取决于介质物理距离的时代，这至关重要。</p>
<p>因此，对于现有代码的一种渐进式方法是践行“确定性的碎片整理”（Defragmentation of Determinism）。尽可能在任何地方识别它——无论是在文件、类，甚至是单个函数中的几行代码——并开始将它们收集在一起。能够归拢的确定性越多，你拥有的易测试功能就越多，你对程序整体的行为和可靠性也就越有信心。“难以测试”的受攻击面（非确定性代码）便开始缩小。在一个足够大的代码库中，你可能永远无法归结为一个单一的确定性核心，但哪怕缩减到数百个，也远比数千个要好。</p>
<p>在我见过的每一个一团糟的代码库中，内部都锁着一个或多个好得多的确定性状态机。我向你保证它们确实存在，即使它们并不显眼。一旦你找到了它们，你会惊喜地发现软件的修改和测试变得多么容易。一点一滴，可靠性便能构筑而成。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-21 05:13 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://outdata.net/blog/260803" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-rial-examples-for-hashes-21fa80b3f51536dc" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7947" data-content-paragraphs="49" data-published-at="2026-09-20T19:14:36.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 03:14</span>
</div>

### [快速哈希函数的对抗样本](https://thomasahle.com/blog/adversarial-examples-for-hashes/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Adversarial examples for fast hash functions</div>

<div class="article-body" data-article-body="true"><p>通过统计测试并不能告诉你攻击者精心挑选的输入发生碰撞的频率，即使攻击者永远无法得知你的种子也是如此。</p>
<p>哈希函数将任意长度的数据映射为固定大小的值。其目标是确保不同的输入映射到不同的输出，除非哈希函数所使用的秘密密钥随机性带来了极小的碰撞概率。这一特性确保了我们可以构建快速的哈希表，而不会让所有数据点都碰撞到同一个桶中。1</p>
<p>哈希计算需要速度快。xxHash号称能达到 60 GB/s，基本与读取内存的速度相当。这种大批量哈希对于文件同步或数据完整性校验非常有用。许多流行的哈希函数，如 komihash、a5hash、HighwayHash、SpookyHash、aHash 和 t1ha2，都愿意牺牲质量（至少在面对对抗性输入时），以换取更高的速度。</p>
<p>这在过去并无大碍。哈希的许多用例风险较低，攻击者为了找到能让哈希碰撞频率远高于平均水平的输入而进行昂贵的密码分析并不值得。尽管如此，大多数哈希函数仍然试图具备一定的鲁棒性，以防止算法意外出现二次方级变慢以及拒绝服务（DoS）攻击。</p>
<p>最好的哈希函数能够证明任意一对输入发生碰撞的概率都很低。在一个无人能够证明其绝对安全的密码学世界里，这一点显得尤为独特。假设一个哈希函数在长度为 L 的输入以至多 L · 2−b 的概率发生碰撞时是 b-bit 通用的（b-bit universal）。有时对 L 的依赖性会更差，但（可证明）绝不会更好。2 那么问题就变成了：对于某个期望的 b，最快的 b-bit 通用哈希能有多快？</p>
<p>我利用 Claude Fable 分析了来自 SMhasher（一个通过经验测试哈希统计特性的庞大项目）的各种流行哈希。分析发现，大多数哈希都存在表现极差的输入——至少比预期低 20 位。少数哈希已经公开发表了证明，Fable 能够在其中发现错误，并在 Lean 中对其他证明进行了验证。点击图表中的任意圆点即可阅读完整的分析报告。</p>
<p>碰撞得分界限与批量处理速度对比。速度采用对数坐标。得分采用平方根间距，以便为低分提供更多空间；刻度标签显示原始的比特值。实心青色圆圈代表已证明的下限保证；空心圆圈代表未解决的宣称。铁锈色菱形是见证上限；叉号标记了全种子对。标签标出了选定的基准；绘制的每个变体都可以在哈希选择器中选择。</p>
<p>按 Tab 键切换到某个点，使用方向键、Home 或 End 键在各点之间移动。Enter 或空格键可打开其详情文件。Escape 键可关闭。在触摸屏上可轻触某一点或其标签。</p>
<p>选择一个哈希，或轻触某个点或标签。</p>
<p>图 1. 快速实现可能会有截然不同的碰撞保证。实心圆点显示证明所保证的内容；铁锈色标记显示由特定输入对暴露的极限。保证与速度测量可能采用了不同的密钥设置——打开详情文件可查看这些假设条件。</p>
<p>完整数据表 · 数据与来源 · 计时重现 · 哈希详情文件</p>
<p>在速度轴上，相等的距离代表相等的比率：从 1 移动到 2 字节/周期所占的空间与从 10 移动到 20 相同。纵轴采用平方根间距，以为低碰撞得分留出更多空间。零值保持可见，所有刻度标签和详情数值均显示原始比特得分。得分本身相对于碰撞界限是对数的；请参阅其定义。</p>
<p>实心青色圆圈给出了已证明的最低得分。空心圆圈显示未经验证的宣称。铁锈色菱形通过一对发生碰撞的特定不同消息限制了得分上限；叉号标出了在每个种子下都会碰撞的消息对。星号表示该上限采用了抽样比率。未发现更糟糕的消息对并不能证明其不存在，因此这些上限并非安全性排名。叉号可能位于零值之上，因为该得分针对消息长度进行了调整。所有绘制的变体都可以在选择器中获取，包括四种 HalftimeHash 风格，每种均返回 64 位。</p>
<p>单独的历史 32 字节输入对 A 在 wyhash、rapidhash v1、rapidhash v3 和 XXH3-64 中，每 230 个密钥分别产生了 9、12、11 和 11 次碰撞。选定的 XXH3-64 输入对具有不同的测量比率：每 2^36 个密钥中约有 527 次（抽样测试；共 527 次事件，汇总计算）。搜索力度并不对等；这些见证上限并不作为哈希优劣的排名。当前输入对及计数的来源。</p>
<p>速度是在 256 KiB 消息上测量的，与发生碰撞的消息对长度无关。“B/cycle”表示报告的每个计时器周期所处理的字节数；数值越大代表速度越快。M2 和 Xeon 计时器使用不同的周期约定，因此请在同一台主机上对比哈希函数。单独的短输入测量使用 1–31 字节。Foldhash 使用了经过验证的移植版本并带有对照测量。GHASH 是通过 OpenSSL 的 GMAC 接口计时的，包含设置开销。基准测试方案记录了计时器、重复运行及校准细节。</p>
<p>两个已发布的 UMASH 核心界限目前已通过不同途径得到证明：实现的 mod-8p 累加器以及 C 指纹的两个独立乘法器。实心圆点显示了 56.18 和 83.99 位（在 L ≤ 246 字时约为 84 位），适用于理想完整密钥、固定种子和完整 C 输出。密钥派生、每次调用的种子以及掩码输出均在这些定理之外；论文中的 162/q 投影步骤仍未经过验证。四种 64 位 HalftimeHash 风格在规定的执行假设和长度限制下具有修正后的 63 位界限。最初的高级 24 字节函数被推翻；其修复后的版本被单独绘制。ChainHash 在两台主机上均为同一个 64 位函数：Xeon 上为 28.31 B/cycle，M2 上为 26.26，具有由机器检验的来自 64 字节均匀随机密钥的 63.0 位保证。ChainHash-128 是 128 位函数，同样在两台主机上均为同一函数：Xeon 上为 14.43 B/cycle，M2 上为 10.26，具有来自 128 字节随机密钥的机器检验的 127 位保证。SipHash-1-3 和 SipHash-2-4 作为未解决的宣称绘制在其 64 位输出宽度处。本次审查既未对这些 SipHash 界限提供证明，也未提供反例。引用的 2014 年分析报告指出，SipHash-1-x 的碰撞特征为 2-167，SipHash-2-4 为 2-236.3（Dobraunig、Mendel 和 Schläffer，2014），而我们自己的搜索未发现每对高于 2-26.4 的情况。一些历史碰撞示例缺少相匹配的计时，因此未在图表中展示。区别请参见证明附注。</p>
<p>在发表本篇博文之前，所有发现均已向上游维护者披露。你可以在 xxHash、komihash、MuseAir 和 foldhash 的讨论中阅读维护者的回复。共识在于，只有真正的多重碰撞攻击——即一大组输入均以极高概率发生碰撞——才值得修复。通用哈希能够防范这种情况，但在原则上，哈希函数即使不具备通用性，也可以对多重碰撞保持鲁棒性。</p>
<p>这是一个合理的立场，尤其是考虑到更改哈希函数很难实现向后兼容。然而，在这篇博文中，我们专注于可证明的安全性保证，而且所发现的碰撞证明了这些启发式哈希函数并非只是“尚未被证明正确的通用哈希函数”。同时，我们确实也为许多哈希函数找到了洪泛级别（flooding-grade）的无密钥多重碰撞。3</p>
<p>希望这项工作能激发对速度更快且可证明哈希函数的研究。许多“利用方式”都采用了在多种哈希族中反复出现的类似不良模式。希望大家的下意识反应不仅仅是将所有东西都切换为像 SHA 这样的“密码学安全”哈希函数，或是直接使用 AES 原生指令。正如我们所展示的，可证明安全的哈希函数数量充足且速度飞快。</p>
<p>如果有人对上述陈述有异议，或者希望我添加/更新/移除任何特定的哈希函数，请在 Twitter 上与我联系。</p>
<p>以下附录包含对每个哈希函数的深入分析。请注意，其中包含 AI 生成的粗糙内容（AI slop），我无法保证所有内容都完全正确。我只相信找到并经过测量的具体实例。</p>
<p>附录包含了对各个哈希函数的具体分析、它们反复出现的碰撞模式，以及验证和重现结果的说明。</p>
<p>下面的每个条目均以实际发现开头，随后给出确切的代码版本、消息字节和推导过程。模式标签链接到算术原理的共享解释。“Every seed（所有种子）”意味着改变种子无法区分该碰撞对；采样率则仅描述经测试的随机密钥实验。</p>
<p>这些碰撞对大多利用了相同的少数几个恒等式。在信息丢失之后才加入密钥无法恢复信息；如果第二条通道（second lane）或更宽的输出仅仅重复相同的计算，也不会有所帮助。下方的分组描述了这些条目中的见证者（witnesses），而非每个哈希函数的每一条路径。一行可以属于多个分组。生成器示例与选定的评分对分开标记；“未分组（ungrouped）”意味着该条目没有建立这些机制之一，并不代表该哈希是安全的。</p>
<p>设 B = 2⁶⁴ 且 F(a,b) = lo₆₄(ab) ⊕ hi₆₄(ab)。对一个消息字求反也会对其异或掩码后的操作数求反。精确的整数恒等式为：<br />(~a)(~b) = ab + (2⁶⁴−1)(2⁶⁴−1−a−b)<br />如果乘积的高低半部分别为 (lo, hi) 和 (lo′, hi′)，则当 lo ⊕ lo′ = hi ⊕ hi′ 时，折叠结果完全一致：进位和借位模式可以抵消这种变化。条目报告了几个碰撞对的概率约为 2⁻²⁷，这并不是适用于所有种子映射的通用定理或比率；无论操作数是由随附常量掩码还是由均匀分布的秘密字掩码，该比率都相同，因为差分从未用到掩码值。XXH3-64 的 32 字节 NAF 对 (2⁻¹⁰·⁴⁷) 需要默认秘密字，因此记录为附加说明，而非计分碰撞对。在 8 字节时，foldhash 将同一个字读入两个操作数，因此一个求反的字就足够了。XXH3-128 还通过选择 w₁ = ~w₀ 来保留原始和。对于记录在案的 XXH3-64 32/128 字节碰撞对，通用的尾部折叠会改变输出，但不会改变发生碰撞的种子集合；quality 变体的额外折叠同样保留了每次快速碰撞。</p>
<p>适用行：wyhash、rapidhash v1、rapidhash v3、foldhash-fast、foldhash-quality、XXH3-64、XXH3-128。</p>
<p>证明所需条件：在掩码的实际联合分布下（包括此处使用的零输出差分），带密钥折叠的异或全域性（XOR-universality）界。</p>
<p>对于后置种子包装器（seed-last wrapper）Hₛ(m) = Gₛ(C(m))，无论 Gₛ 是否可逆，恒等式 C(m) = C(m′) ⇒ Hₛ(m) = Hₛ(m′) 对每一个种子都成立。CityHash、FarmHash、gxhash 和 pengyhash 在公开压缩阶段就丢失了区分度。MUM 和 mir 则将一个已经发生碰撞的公开乘积项异或到其带种子的状态中；它们的折叠操作是将乘积的高低两半相加。MuseAir 达到 head ⊕ P(tail) ⊕ Kₛ 的形式，因此在相同长度下，修改 head 可以抵消对 tail 的任意选定公开修改。在 mx3 中，h ← (h + g(w))C 在相同步数后会留下一个公共的种子系数，且 g 是公开可逆的。Fasthash 类似地允许通过逆向字混合来抵消长度项。MurmurHash3 的公开字双射允许攻击者设置并在随后消除 P7 中描述的最高位差分；种子虽然影响状态，但并不能掩盖该差分。</p>
<p>适用行：CityHash64、FarmHash64、gxhash、pengyhash、MUM v3、mir、MuseAir、mx3、fasthash-32/64、MurmurHash3。</p>
<p>证明所需条件：消息压缩本身的一个碰撞界，且密钥必须参与区分消息的算术运算；仅仅给外围状态或终结器（finalizer）加密钥无法提供此类界。</p>
<p>该恒等式其实就是简单的 0 · x = 0 · x′ = 0。在 a5hash-128 中，对于每一个种子，都可以将一个公开操作数设为零。在 a5hash-64 中，第一个消息字与扩展状态的某个值匹配，在其精确计算的密度为 118 × 2⁻⁴⁵ 的种子纤维（seed fibre）上使操作数归零。在 HighwayHash 的 lo₃₂(v₁)·hi₃₂(v₀) 乘积中，半个字就足够了：固定 hi₃₂(key[0]) 会使 hi₃₂(v₀) 为零。该类别的密度为 2⁻³²，但要合并完整状态，还需要一个概率为 56165/2⁴⁰ 的进一步条件事件。HalftimeHash24 的等长 Encode3 见证在其整个 high₃₂(core_key[6]) = 0 类别中确实会发生碰撞，其密度同样为 2⁻³²；该编码只允许一个符号发生改变。这些都是不同的事件，而不是共享的碰撞率。</p>
<p>wyhash 和 rapidhash v1/v3 中随附的常量也允许这种零操作数模式。此前的报告包括 wyhash 的 issue #15 以及 rapidhash 的 issue #10 和 #25。这些行是在随机秘密模型（random-secret model）下评分的，即种子和每个秘密字均均匀分布，这排除了这些随附常量碰撞对；每行的说明将其记录为默认秘密的附加警告。</p>
<p>适用行：a5hash-128、a5hash-64、HighwayHash、HalftimeHash24（等长见证）。</p>
<p>证明所需条件：使操作数归零的实际密钥纤维的界，以及剩余状态差分相互抵消的条件概率。</p>
<p>在 komihash 中，第二条通道继承了一个公开的异或偏移：s₂ = s₁ ⊕ c。将其消息字选为 w₂ = w₁ ⊕ c 会得到 w₂ ⊕ s₂ = (w₁ ⊕ c) ⊕ (s₁ ⊕ c) = w₁ ⊕ s₁。补偿另一个操作数的公开偏移可使每条消息内两个通道的乘积相同。它们的低半部分在通道异或中抵消；所选的比特翻转留下的公共高位乘积变化最多为 1，这往往会在后续加法中消失或相互抵消。这就解释了在长度为 64 到 127 字节时测得的 0.9106 的碰撞率，在该长度区间折叠操作会紧随其后。该条目未将此结果推演到经过又一轮主体循环的情况。</p>
<p>证明所需条件：独立的通道密钥，或者针对其真实依赖关系的联合差分界，以确保攻击者无法仅仅通过抵消公开偏移来使各通道的操作数相等。</p>
<p>只有当长度字段能够区分已编码的输入时，它才会发挥作用。在 gxhash 的短路径中，Cₙ(m)ᵢ = (pad(m)ᵢ + n) mod 256；15 个零字节与 16 个 ff 字节都会变成 16 个 0f 字节。HalftimeHash 的原始高级核心省略了长度，因此空输入与单个零字节会重合。Fasthash 包含长度，但某个消息处理步骤允许攻击者求解 mix(w) = 7m ⊕ 8m，从而在公共乘法之前抵消 7 字节与 8 字节之间的差异。对于 mx3 的 1 字节/8 字节对，相应的方程为 g(w) = g(0) + C(g(2) − g(9))。两条路径具有相同的种子系数。这些属于编码或长度项别名；t1ha2 的跨长度对则仍需要 P7 中的进位事件。</p>
<p>相关行：gxhash、HalftimeHash24（原始核心）、fasthash-32/64、mx3。</p>
<p>证明所需要的条件：在压缩之前进行单射长度成帧，或者建立一个带密钥的跨长度碰撞界，该碰撞界需将消息字如何抵消长度项考虑在内。</p>
<p>一种碰撞配方可以产生不止一对碰撞。MurmurHash3 辅助性的 32 字节结构对于输入状态 s 满足 T_A(s) = T_B(s)：它将差值重置为零，而不是将状态重置为某个固定常数。因此，在 n 个位置的每一个中选择 A 或 B，即可产生 2n 个等长的碰撞消息。另外，CityHash README 中的对 B 为选定的压缩值求解了一个公开的字置换；三个自由字即可产生 2192 个碰撞的 32 字节输入。MuseAir 的可逆头部编码给出了 head′ = head ⊕ P(T) ⊕ P(T′)，对于选定长度的每个尾部都存在一个配对项。这些属于已记录的生成器；所选的较短 CityHash 和 MurmurHash3 碰撞对则保留其原始评分。</p>
<p>相关行：MurmurHash3（辅助双块对）· 生成器记录；CityHash64（辅助对 B）· 逆向记录；MuseAir · 头尾配方。</p>
<p>证明所需要的条件：针对联合“消息到状态映射”的单射编码或带密钥碰撞界；单个公开输入字的可逆性使得这些补偿字易于求解，且不会使整个映射成为单射。</p>
<p>在字长为 w 时，设 t = 2w−1。模 2w 下，x ⊕ t = x + t，且对于奇数 c 有 (x ⊕ t)c = (xc) ⊕ t。公开的循环移位和异或移位可以将差值置于最高位；后续的消息字则会将其抵消。MurmurHash3、fasthash 的辅助等长对以及 nmhash32x 都利用了这一确定性恒等式。nmhash32 工作在 16 位乘法通道中，并且额外约束了跨越第 13 位的加法和进位。更一般地，x ⊕ d = x + d − 2(x &amp; d)，因此固定的 XOR 改变可以转化为符号相反的加法改变。SpookyHash 的后期注入和尾部在符号有利时会发生抵消；精确的半种子平衡尚未得到证明。所选的 t1ha2 对则使用密度为 2−24 的种子类，在该类别内实测成功率约为 2−4.19。它的抵消依赖于进位，而非零操作数。</p>
<p>相关行：MurmurHash3、fasthash-32/64（辅助等长对）、nmhash32、nmhash32x、SpookyHash V2、t1ha2。</p>
<p>证明所需要的条件：贯穿实际字长和联合进位条件的差分界，而不是假设循环移位、奇数乘数或各个状态位表现为相互独立。</p>
<p>我将 aHash 的 AES 路径保持未分组状态：其条目需要 AES 逆差分，以及在独立密钥下同时发生重排加法抵消，而上述恒等式并未证实这一点。证明条目和对比条目同样未被分配碰撞模式。无论是证明缺口还是共享的乘法指令，都不足以成为分配一行的依据。</p>
<p>在带有编号的摘录中，我将所提供的实现专门针对选定的消息路径进行了特化。除非另有说明，字均为无符号 64 位值；+、- 和普通 * 均在模 264 下回绕，^ 表示异或，rotl 将 64 位字循环左移。mul128(a,b) → (lo,hi) 返回完整的无符号乘积，fold(a,b) = lo ^ hi。元组赋值中等号右侧使用旧值。read32le 在移位前将其结果零扩展至 64 位；read64le 在指定字节偏移处读取一个小端序字。words(lo,hi) 是一个 128 位块。AES 操作是单个 AES 指令轮次，其指定的第二个操作数在末尾进行异或；aesenclast 省略了列混淆。字节重排使用小端序内存顺序；pack_le(bytes, indices) 按所列顺序打包所选字节，最低有效字节在前。每个注释都标明了示例所使用的秘密输入、公开常数以及操作。</p>
<p>这些消息在 CityHash 使用种子之前就已经发生了碰撞。一旦两个输入变成了相同的中间值，再加入相同的机密信息便无法将它们区分开来。</p>
<p>代码：cityhash；SMHasher3 hashes/ci</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-21 03:14 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://thomasahle.com/blog/adversarial-examples-for-hashes/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ebsites-via-ad-collector-7362b503eb6d7f07" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2016" data-content-paragraphs="17" data-published-at="2026-09-20T17:43:10.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 01:43</span>
</div>

### [ChatGPT如今能通过广告数据收集器获知你在其他网站的浏览活动](https://www.buchodi.com/chatgpt-now-knows-what-you-do-on-other-websites-via-ad-collector/)
<div class="original-title-sub"><span class="orig-tag">原文</span> ChatGPT now knows what you do on other websites via ad collector</div>

<div class="article-body" data-article-body="true"><p>任何在 ChatGPT 上投放广告的公司，都会在其自身网站上安装一段由 OpenAI 编写的小型代码，这与零售商早已安装 Meta 和谷歌追踪代码的做法完全相同。加载这段代码后，它会将 __obi 以及与你正在浏览的页面相关的数据一同发送给 OpenAI。这包括你搜索的商品、阅读的文章以及购买行为。</p>
<p>归结起来，OpenAI 能够将你在那些网站上的行为与你的 ChatGPT 账户关联起来。</p>
<p>我在自己的手机上完整复现了这一机制，通过两种独立的数据抓取方式进行了验证，并与覆盖 1,029 个主机名、包含 936 个不同广告主像素（pixel）的数月观测流量进行了交叉比对。</p>
<p>第一步：ChatGPT 创建一个标识符并对其进行签名。<br />在 chatgpt.com 上，客户端会生成 16 个随机字节，并调用 POST /backend-api/bazaar/obi/sync-token（登出状态下则调用 /backend-anon/）。后端随后返回一个 RS256 JWT：<br />sub 代表账户。obi 是标识符。该令牌将两者绑定在一起，其作用域限定在收集器，且有效期为 60 秒。bzr 代表 bazaar（集市），这是 OpenAI 广告平台的内部代号；wadi 则是签发服务。</p>
<p>客户端将 {&quot;token&quot;: &quot;«JWT»&quot;} 跨站 POST 请求发送至 bzr.openai.com/v1/obi/sync。响应结果为：</p>
<p>第三步：广告主网站将其回传。<br />广告主页面向 OpenAI 的主机发送三类请求。在一台 Cookie 存储区存有 __obi 的手机上，所有这三类请求都携带了该标识符：</p>
<p>同一个 SDK 还从广告主页面收集身份信息。上报的数据有效载荷区分了四种来源，均由 OpenAI 自身标注：in 代表广告主主动传递的值；fm、ht、js 则代表 SDK 分别从表单字段、渲染页面文本以及标签管理器总线（tag-manager bus）中爬取的值。在观测到的流量中，爬取到的身份信息数量超过了广告主主动提供的数量，比例为 685 次对 255 次事件。</p>
<p>标签管理器总线是电子邮箱地址的最大来源。该 SDK 用其自有函数替换了 window.dataLayer.push，还会读取 adobeDataLayer，并通过解析 gtm.js 脚本标签中的 l= 参数来定位被重命名的 GTM 层。当前版本会从中获取电子邮件和电话号码。在 8 月 27 日范围缩减之前，0.1.31 版本甚至还会抓取姓名和地理位置信息。</p>
<p>电子邮件、电话、名与姓在传输前会经过 SHA-256 哈希处理。国家、地区、城市和邮政编码则以明文发送。邮政编码是抓取最为频繁的表单字段，在 28 个网站上共发生 100 次事件。</p>
<p>URL 在发送前会被缩减为源地址（origin）加路径（path）；在观测到的 23,929 条数据中，没有任何一条携带查询字符串（query string）。但路径保留了下来，送达收集器的路径包括某种医疗状况、债务解决方案漏斗以及诉讼受理登记表单。</p>
<p>在已知设置的 881 个像素中，有 638 个启用了自动匹配功能，其中包括观测到的所有信贷和贷款广告主。该功能由 OpenAI 的广告管理后台（Ads Manager）控制。黑名单排除了密码、一次性验证码、卡号、社保账号（SSN）、出生日期、病史、诊断结果和法院字段。</p>
<p>__obi 是 OpenAI 唯一一个被配置了 SameSite=None 属性的标识符。</p>
<p>在我的设备上，同一个 __obi 值从 12 个商业网站下、以 13 个不同的像素 ID 发送至 OpenAI，其中包括 Chewy、Wayfair、ThriftBooks、Eventbrite、HelloFresh、Coursera 和 SeatGeek。每一个请求都被以 202 状态码接收。</p>
<p>在更广泛的流量中，30 个不同的 __obi 值中有 12 个出现在多个广告主网站下，其中一个出现在多达十个广告主网站下。</p>
<p>在解码的 932 个同步令牌中，有 736 个携带 subject_type: account_user，196 个携带 anonymous。匿名主体与账户主体一样稳定：每台设备一个，且至少能留存 27 天。</p>
<p>OpenAI 将分析与营销设为两个独立的同意选项，即 oai_consent_analytics 和 oai_consent_marketing。而我解码的每一个同步令牌都带有 consent_decision: analytics_allowed。即便某人允许分析并拒绝营销，也会遇到这种情况。</p>
<p>广告主对此并不知情。__obi 属于他们自有脚本无法读取的域名。他们仅仅安装了一个转化像素，根本无从得知其访客正被解析关联至具体的 ChatGPT 身份。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-21 01:43 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://www.buchodi.com/chatgpt-now-knows-what-you-do-on-other-websites-via-ad-collector/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-usergettingbored-vim-0a9bc09bd3a11c6d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="823" data-content-paragraphs="12" data-published-at="2026-09-20T17:18:49.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 01:18</span>
</div>

### [Vim 中名为 UserGettingBored 的恶搞自动命令](https://evanhahn.com/usergettingbored-vim/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Vim&#39;s UserGettingBored autocmd</div>

<div class="article-body" data-article-body="true"><p>简而言之：Vim 中有一个名为 UserGettingBored 的恶搞自动命令（autocmd），它实际上没有任何功能。</p>
<p>Vim 的自动命令功能（通常简写为“autocmd”）允许你在发生各种事件时运行代码。例如，你可以通过将 TextChanged 事件绑定到 :w 命令来实现自动保存功能。</p>
<p>Vim 拥有 100 多个事件，涵盖从“创建缓冲区”到“文件已保存”。但其中有一个引起了我的注意：UserGettingBored。文档中是这样写的：</p>
<p>UserGettingBored：当用户连续按同一个键 42 次时。开个玩笑！:-)</p>
<p>看到这个时，我正忙着做别的事，结果注意力彻底被带偏了。我想：“我必须了解更多。”</p>
<p>以下是我的发现：</p>
<p>遗憾的是，它没有任何实际作用。它仅存在于文档（以及某些测试用例）中。如果你尝试使用类似 autocmd UserGettingBored ... 这样的命令，就会收到“no such group or event”（没有此类组或事件）的报错。</p>
<p>它存在于 Vim、Neovim 和 Vim Classic 中。</p>
<p>它最早由 Bram Moolenaar 于 2000 年 7 月添加，比 Vim 6.0 的发布早了一年多。最初的描述是：“当用户按下 CTRL-C 时。开个玩笑！”当时它就没有任何功能，因此我认为它从未真正实现过。</p>
<p>2001 年 8 月，他在文档中加上了笑脸。内容随即变成了：“当用户按下 CTRL-C 时。开个玩笑！:-)”</p>
<p>十二年后的 2013 年，描述被修改为了当前的版本：“当用户连续按同一个键 42 次时。开个玩笑！:-)”</p>
<p>2022 年，开发者 Mike Smith 受这个恶搞自动命令的启发，开发了一个非官方插件。如果你在插入模式下连续按同一个键 42 次，就会弹出一张塞缪尔·L·杰克逊（Samuel L. Jackson）的照片。22 年之后，它终于成真了。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-21 01:18 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://evanhahn.com/usergettingbored-vim/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-tif-fork-actually-exists-95a07fa22228c694" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3285" data-content-paragraphs="30" data-published-at="2026-09-20T17:13:41.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 01:13</span>
</div>

### [一个得到积极维护和更新的 Motif 分支确实存在](https://www.osnews.com/story/145877/an-actively-maintained-and-updated-motif-fork-actually-exists/)
<div class="original-title-sub"><span class="orig-tag">原文</span> An actively maintained and updated Motif fork actually exists</div>

<div class="article-body" data-article-body="true"><p>Motif 非常棒，我喜欢它的外观和质感，我希望它能得到积极的维护。我希望拥有一个健康的 Motif 应用程序生态系统，甚至是窗口管理器和桌面环境，这样我就能运行一个真正的 Motif 环境。遗憾的是，尽管 Motif 已经开源了一段时间，但该项目本身在多年前就停滞不前了，几乎没有任何参与者的活动。这种情况可能正在改变，因为一些开发者去年决定亲自采取行动。</p>
<p>这个 Motif 分支源于让 Motif（以及其他 X11 技术）保持活力和良好状态的愿望。最初的上游 SourceForge 项目已经两年多没有任何活动了，没有一个项目管理员在至少这么长时间里处于活跃状态，官方缺陷跟踪系统也早已消失无踪；用户论坛早在 2017 年就关闭了。遗憾的是，原上游似乎已经放弃了这个项目。</p>
<p>我整合了上游一些沉睡多年的修复，吸收了 Gentoo 的另外几项修复，并做出了一些我自己的改进。我打算维护这个分支，并借此倡导继续使用这个定义了一个时代、并影响了其后诸多用户界面的用户界面工具包。</p>
<p>参与其中的一些人是我在网上认识的朋友，所以我对这个分支经受住时间考验抱有一点信心，但当然，管理像这样一个复杂的项目非常困难，因此谁知道热情能持续多久呢。不过，该分支自一年多前创建以来已经发布了五个版本，这看起来很有前景。在某些人看来对 Motif 情有独钟可能很奇怪，但我就是那种喜欢在运行 HP-UX 的 HP c8000 双 PA-RISC 工作站上，安装那些我自己都看不懂的古怪、过时的企业和工业软件的人，纯粹就是为了享受它们有时附带的 Motif 界面。我们每个人都有自己的小癖好。</p>
<p>从我与网上网友交流的经验来看，我知道实际上有相当多的人和我一样，我希望在某个时刻，这个群体中的开发者能够达到足够的关键规模，利用现存的那些分散但积极维护的 Motif 项目（是的，它们仍然存在），构建出类似基础 Linux 发行版或桌面环境的东西。虽然希望渺茫，但在如今的计算格局下，越来越多的人对“现代”软件感到不适，我真的觉得像这样的东西是有生存空间的。</p>
<p>当然，这绝对是一个极小的利基市场，但终究是一个利基市场。</p>
<p>在 Mastodon 上关注我：@[email protected]</p>
<p>Emwm 是一个增加了新功能的 Motif 分支。他还创建了一些 Motif 应用程序，例如 toolbox（一个类似 Irix 的启动器）、xmsm（一个会话管理器）、一个文件管理器和一个图像查看器。</p>
<p>Emwm 是一个窗口管理器，而不是工具包。Emwm 使用了 Motif。它的名字里就写着：“Enhanced Motif Window Manager”（增强型 Motif 窗口管理器）。</p>
<p>它是我在文章中提到的得到维护的 Motif 软件之一。</p>
<p>“遗憾的是，原上游似乎已经放弃了这个项目。”完全不属实。作为同时参与 Motif 和 CDE 维护的人，它并没有被放弃。问题在于多年来没有人向该项目提交任何拉取请求（Pull Request），而且总共只有三名开发者。这个项目应该把他们的补丁发送给我们。</p>
<p>“问题在于多年来没有人向该项目提交任何拉取请求”我刚刚查看了 SourceForge 上的代码仓库，上面有 11 个未关闭的 PR……？</p>
<p>我对 Motif 继续存活并得到维护没有任何意见。只是对我来说回到那个时代太突兀了。30 年前我刚开始使用 ‘nix 时它看着就不太美观。那绝对是 90 年代的 ‘nix。NsCDE 是我在这方面能接受的极限了，它通过主题化来模拟 Motif。</p>
<p>“我希望在某个时刻，这个群体中的开发者能够达到足够的关键规模，利用现存的那些分散但积极维护的 Motif 项目，构建出类似基础 Linux 发行版或桌面环境的东西……”<br />我愿意为这样的发行版付真金白银。例如我很喜欢 CDE，但如果能有一个现成整合好、开箱即用的基于 Motif 工具的系统，那就太棒了。</p>
<p>Motif 和 CDE 都很棒。它们看起来不怎么起眼，但确实很棒。</p>
<p>许多这类元素都存在于 Windows 95 中，但微软在 Windows 2000 前后就已经开始削弱它们了（工具栏是第一个遭殃的）。</p>
<p>向同为 c8000 的爱好者致敬。</p>
<p>我一定是极少数喜欢 CDE 中 Motif 外观的人之一。也许只是因为我在 Solaris 上用了它太久了？不太确定，但我宁愿选择它，也不愿意使用当今几乎任何主流的基于 Linux 或 UNIX 的 UI 工具包。</p>
<p>唉，我真不理解怎么会有人把时间和精力投入到像 Motif 这样早已过时的死马上。</p>
<p>熟悉感能减少认知阻力，怀旧情结会让陈旧的界面显得比它们实际过去或现在更加直观。</p>
<p>但 Motif 不仅仅是外观难看。它在 Xt Intrinsics 之上也是一个臭名昭著的糟糕/笨重的编程工具包。它极其冗长且充斥着回调。糟糕的设计决策多得数不过来！我们现在许多习以为常的功能，在 Motif 上都需要好几层框架机制和间接配置。</p>
<p>Motif 和早期几种 X 工具包长期以来被用作“如何不设计 GUI 框架”的反面教材，这是有原因的。</p>
<p>唉，我猜总有人出于某些匪夷所思的原因喜欢它。</p>
<p>这些去掉了真正显得笨拙的凸起 UI 部件。</p>
<p>我大致同意你说的话，我从来不理解人们为什么总要给过去涂上玫瑰色的滤镜。然而，在超大屏幕上用基于 GTK4 的 LibreOffice 打开一个大型电子表格，试着只用鼠标指针和垂直滚动条（运气好的时候它大概有 2 毫米宽）向下滑动——简直就是可用性方面的噩梦。@Shiunbird 说得对：从用户的角度来看，MOTIF/CDE/GTK2 很容易理解，也很好用。</p>
<p>然而，在超大屏幕上用基于 GTK4 的 LibreOffice 打开一个大型电子表格，试着只用鼠标指针和垂直滚动条（运气好的时候它大概有 2 毫米宽）向下滑动——简直就是可用性方面的噩梦。@Shiunbird 说得对：从用户的角度来看，MOTIF/CDE/GTK2 很容易理解，也很好用。</p>
<p>应用程序的外观是非常主观的，每个人都有自己的喜好，然而许多现代 UI 设计师似乎完全忽视了可用性。这是大有问题的。即便你知道滚动条的工作原理，用起来也十分吃力。缺乏可发现性的界面，以及缺少视觉提示的控件……这些做法为了追求极简主义而弃可用性于不顾，我们似乎经历了一段大家在这方面争相攀比的时期。再次强调，视觉偏好是一回事，但客观而言，可用性和一致性一路走来确实退步了不少。我尤其反感的是，在屏幕分辨率如此之高、存在大量闲置留白的情况下，设计师依然觉得有必要把控件做得极小，让人难以操作……我之前出差时不得不比平时更频繁地使用 Android 系统。其复制/粘贴机制存在缺陷，既容易在错误的时间被触发，又常常在需要时毫无反应。这类问题在早期产品中尚可原谅，但随着技术的成熟，可用性始终没有受到重视、长期存在的问题一直被忽视，这让我感到非常失望。</p>
<p>拿我父亲来说，他就欣然接受了语音交互，与触屏输入相比，这是一种更高效的操作模式。这确实是缓解糟糕触屏 UI 的一种办法，但显然会对身边的其他人带来打扰。</p>
<p>纯粹出于历史情怀，我对 Motif 怀有好感，但作为一名开发者，我无法想象自己在 2026 年还会愿意选它作为 GUI 工具包。话虽如此，如果你用 Motif 做出一款优秀的应用，人们还是能用上的。毕竟 Xwayland 是切实存在的。</p>
<p>不过，CDE 作为桌面环境处境要艰难得多，因为将 X 用作图形界面在未来会阻断访问仅支持 Wayland 的应用程序。目前确实存在 Wayland 专属应用，但数量还不算多。我遇到过 Foot 终端模拟器；此外，任何基于 Iced 或 Cosmoe 库构建的应用都仅支持 Wayland。目前影响还不算大。但一旦某款仅支持 Wayland 的 GUI 工具包流行起来，这就将成为一个大问题。GTK5 也许就会是第一个。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-21 01:13 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://www.osnews.com/story/145877/an-actively-maintained-and-updated-motif-fork-actually-exists/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::