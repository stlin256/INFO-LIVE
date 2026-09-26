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
<div id="story--2026-09-26-reachability-9f62655e606a7f5a" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="6862" data-content-paragraphs="25" data-published-at="2026-09-26T15:49:22.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 23:49</span>
</div>

### [我们能在 TLA⁺ 中表达可达性性质吗？](https://ahelwer.ca/post/2026-09-26-reachability/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Can we have reachability properties in TLA⁺?</div>

<div class="article-body" data-article-body="true"><p>我之前在读 Hillel Wayne 的新文章《TLA+ 并不能解决一切》（TLA+ Won’t Solve Everything），并特别关注到了他提到的 TLA⁺ 中无法表达的一件事：<br />可能性与可达性性质：即始终有可能使 P 为真，即使你实际上并没有决定这样做。比如“我总是可以关闭电脑”或“用户总是可以更改他们的密码”。这些不能用 &lt;&gt;P 来表达，因为后者的含义是“对于所有行为，P 至少发生一次”，而我们实际想要的是“对于所有行为前缀，至少存在一种使得 P 至少发生一次的行为”。<br />这引发了我的思考。不久前我正在阅读 Lamport 的新书《并发程序科学》（A Science of Concurrent Programs），进展原本相当顺利，直到在第 5.1 节“可能性与准确性”（Possibility and Accuracy）处彻底卡壳。该节探讨的恰恰就是这个主题——在 TLA⁺ 中表达可能性/可达性性质。当时我完全无法理解，甚至一度以为书中存在重大错误。Hillel 的文章促使我重新审视了它1，现在我很欣慰地表示自己基本搞懂了，并尝试以一种我觉得说得通的方式来解释它。如果你更希望直接听 Lamport 的解释，可以阅读上述教材的第 5.1 节，或者 Lamport 于 1998 年 10 月发表的论文《证明可能性性质》（Proving Possibility Properties）。<br />我们将探讨两个问题：<br />TLA⁺ 中较为突出（且怪异2）的算符之一是 ENABLED。在给定状态下，如果可以执行动作 A，则 ENABLED A 计算为真。它最常见的应用是检查 []ENABLED Next。这仅仅表示系统总是可能迈出下一步非停滞（non-stuttering）步骤。如果该表达式变为假，则说明你的系统陷入了死锁！这是一个非常有用的性质，以至于 TLC 会默认对其进行检查。3<br />ENABLED 还允许你编写最基本的可达性性质，即询问是否可能在单步内到达某个状态。性质 [](ENABLED Next /\ P&#39;) 会检查你是否总能在单步之内到达状态 P。TLC 目前就可以检查这一点。然而，这并不是特别有用。我们通常想知道的是 P 是否可以在多步之内到达。Lamport 定义了另一个算符，他用上标加号 ⁺ 来表示它。4 任何熟悉正则表达式的人都会对其含义感到熟悉：它表示一个或多个动作可以连接在一起。Lamport 从而将完整的可达性性质表达为 [](ENABLED [Next]_v^+ /\ P&#39;)，意味着可以通过执行一个或多个 Next 步骤（或停滞）来到达 P，而不仅仅是一步。用 ASCII 写出来是一个相当难看的公式；精装排版后如下所示：<br />$$ \Box\text{E}([Next]_v^+ \land P^{\prime}) $$<br />TLC 目前无法检查此性质；它仅仅存在于 Lamport 的构想之中。它看起来还非常像分支时间逻辑。简直是异端！稍后会对此进行更多讨论。<br />除了 ENABLED 之外，TLC 最近增加了对基础可达性性质的支持。这些仍处于测试阶段，因此你必须在模型文件中将其声明为 _POSSIBLE P。这并不会检查从每一个系统状态出发的可达性；相反，它检查的是从某个初始状态开始的任何行为中，P 是否可能得到满足。你可以在这里阅读其动机，它主要用作规范的“单元测试”5。在 TLC 的常规广度优先搜索中检查 _POSSIBLE 非常直观：如果在状态探索终止时从未触及 P，则报告失败。最近还发现 _POSSIBLE 提供了一种更符合人体工学的追踪验证表达方式，因此它似乎很可能会留在该语言中。<br />那么完整的可能性/可达性性质呢？我们能否检查 P 是否可从每一个系统状态到达？TLC 当然可以检查这些，但需要做更多工作。所幸这项工作表现为在模型检查中增加一个独立的轮次，而不是与现有的机制纠缠在一起，因此在破坏现有功能的风险有限的情况下实现它是可行的。要使用的算法称为后向可达性（backward reachability）。在完整状态图探索完毕后，编写一个在状态图上进行逆向广度优先搜索的遍历阶段，从满足 P 的每个状态开始，并遍历每个能够转换到这些状态的状态。如果在最后有任何未探索的状态剩余，你就知道 P 无法从这些状态到达，从而报告违例。这些剩余的状态甚至能提供一个良好的反例用于着手调试！<br />这是否会在 TLC 中实现尚不可知，但这看起来确实是一个不错的想法。<br />在这里，我将尽最大努力解释 Lamport 想出的技巧：如何将看起来像分支时间推理的东西引入线性时间逻辑。事先提醒一下，这一节将比其他部分更加硬核偏技术性。TLA⁺ 的语义从根本上将规范定义为一组无限的线性行为。这组行为本身通常也是无限的6。那么，在这个无限的无限线性行为集合中，我们所说的 REACHABLE P 究竟可能意味着什么？按照惯例，TLA⁺ 公式必须适用于该集合中的每一种行为。但我们感兴趣的并不是每一种行为是否实际上都到达了 P；我们想知道的是每一种行为是否原本有可能到达 P！这种推测未来的推理方式在分支时间逻辑中完全如鱼得水，但对于线性时间逻辑来说却是异类。<br />最根本的技巧就是滥用公平性假设（fairness assumptions）。公平性假设是一个可用于过滤行为集合的谓词。举一个常见用法的例子：一个只是呆坐着什么都不做（永远停滞）的系统，在常规 TLA⁺ 规范中完全属于合法的行为，但它并没有什么价值。因此，很多规范如果想要检查诸如“系统最终到达目标状态”之类的活性性质（liveness properties），就会通过诸如“如果一个动作持续处于启用状态，它最终必须被执行”这样的公平性假设来排除那些无价值的行为。通俗地说，我喜欢把公平性假设看作是给你的规范添加洋流，从大体上推动它向期望的状态前进。你的系统仍然可以在整个状态空间中穿梭，但它不能在没有洋流推动它朝更有成效的行为前进的情况下永远被困在某处。公平性假设通常是你为系统的“理想路径”（happy path）进行编码的方式，例如发送网络消息最终成功等这类情况。</p>
<p>如果一个公平性假设不会阻止系统拒绝有限行为，而只拒绝无限行为——例如拒绝那种永远停留在那里结巴（stuttering）且什么都不做的行为⁷，那么它就是机器封闭的（machine-closed）。更形式化地表述，如果你的公平性假设是机器封闭的，那么系统的每一个有限行为前缀，都必须能够以某种满足该公平性假设的方式进行扩展。通俗来说，这意味着在某个行为的任意时刻，它都可以突然惊醒并意识到：“糟糕，我忘了我需要满足公平性假设！”，然后它可以通过采取一系列动作来达成这一点。该行为永远不会在经历了有限步数后，陷入无可挽回的境地。你可能已经注意到，这种“有限前缀必须能够以满足某条件的方式进行扩展”的措辞，听起来有点像在讨论推测性的未来执行！而这正是解决所有问题的关键。</p>
<p>假设你想验证状态 \(P\) 是否能从所有可能的系统状态中到达。如果这是真的，那么系统行为的某个子集必定会包含状态 \(P\)。事实上，其子集将无限次包含 \(P\)。用 TLA⁺ 的术语来说，它们满足公式 \(\Box \Diamond P\)⁸。那么，如果你能写出一个机器封闭的公平性假设 \(F\)，该假设仅接纳一套受到严格限制的系统轨迹，且所有这些轨迹都满足 \(\Box \Diamond P\)，会怎么样呢？那么根据机器封闭性的定义，规约的每一个有限前缀都可以被扩展以满足 \(\Box \Diamond P\)⁹。因此，规约所接纳的每一个有限前缀都能到达 \(P\)！这就是 TLA⁺ 中语义合法的可达性属性！记作：<br />$$ (Spec \space \land \space F) \Rarr \Box \Diamond P $$</p>
<p>因此，我们已将陈述“所有状态是否都能到达 \(P\)”的问题，规约为寻找一个合适的公平性假设。持怀疑态度的读者完全有理由认为我在这个细节中夹带了不少私货。比如，诚然如果天上掉下来某个神奇的公平性假设，它既 1. 机器封闭，又 2. 能以某种方式唯独挑选出满足 \(\Box \Diamond P\) 的轨迹，那我承认这确实行得通。但我们有什么理由相信这样的公平性假设一定存在呢？在现实中对于任意规约，我们又该如何实际推导出它呢？</p>
<p>首先，我们应该给读者一个在此退出的机会。如果你关心的只是对有限状态系统进行可达性模型检测，我们已经证明了可达性属性在线性时间逻辑中是可行的！讨论可达性在 TLA⁺ 语义上并非什么不可弥合的断裂。你可以直接去向 TLA⁺ 邮件列表建言，要求给 TLC 添加可达性检测功能。本节的其余部分只会吸引那些想要对无限状态系统进行形式化证明的极客怪人。</p>
<p>重申一下，如果你想证明某个规约满足可达性属性 \(P\)，只需推导出一个机器封闭的公平性假设 \(F\)，满足：<br />在兰伯特（Lamport）的《Proving Possibility Properties》中给出了关于 \(F\) 的通用存在性构造方法，因此如果 \(P\) 实际上是可达的，那么合适的公平性假设必然存在；但并没有一种机械化的方式可以推导出易于在证明中进行推导的 \(F\)；这需要创造力！</p>
<p>让我们来看一个例子。考虑一个由单个变量 \(x\) 组成的规约，它作为一个既可递增也可递减的计数器：<br />$$ Up ≜ x^{\prime} = x + 1 $$ $$ Down ≜ (x &gt; 0) \land x^{\prime} = x - 1 $$ $$ Next ≜ Up \lor Down $$ $$ Spec ≜ (x = 1) \land \Box[Next]_x $$</p>
<p>假设我们想证明 \(x = 0\) 始终是可达的，而事实显然如此。我们能构想出什么既满足机器封闭性、又能确保 \(\Box \Diamond (x = 0)\) 的公平性假设 \(F\) 呢？</p>
<p>我们的第一次尝试可能是选择稳妥且熟悉的 \(F = SF_x(Down)\)。任何由 \(Next\) 的子动作的弱公平性或强公平性构成的合取式，都始终是机器封闭的。然而，这并不充分。每走一步 \(Down\) 就走两步 \(Up\) 的行为满足这个 \(F\)，但它永远无法到达 \(x = 0\)：<br />$$ 1 \rightarrow 2 \rightarrow 3 \rightarrow 2 \rightarrow 3 \rightarrow 4 \rightarrow 3 \rightarrow 4 \rightarrow 5 \rightarrow \ldots $$</p>
<p>我们必须接受：我们不得不放弃构造机器封闭公平性假设的常规安全手段，并相信我们自己证明某个潜在公式是否机器封闭的能力。沿着这一新思路的良好二次尝试是 \(F = \Diamond \Box [Down]_x\)：在某一特定时刻，该行为决定不顾一切，此后只执行递减。这很有希望！如果它之后只进行递减，那么它将单调地趋向 \(x = 0\)！它也是机器封闭的，因为任何行为都可以在任意时刻停下来并开始执行递减。遗憾的是，这依然失败了，因为它允许永久停滞/结巴（perpetual stuttering）：<br />$$ 1 \rightarrow 1 \rightarrow 1 \rightarrow 1 \rightarrow 1 \rightarrow \ldots $$</p>
<p>解决办法既简单又熟悉：将其与 \(Down\) 的弱公平性进行合取：<br />$$ F = \Diamond \Box [Down]_x \land WF_x(Down) $$</p>
<p>这同样是机器封闭的，并且它完全能确保 \(\Box \Diamond (x = 0)\)。至此大功告成！我们可以使用常规的活性（liveness）证明技术¹⁰来证明 \(x = 0\) 在任意状态下都是可达的。</p>
<p>实际上，我们的例子暗示了一种更广泛的范式。对于任意规约定义 \(F\)，一个不错的起点形式为：<br />$$ F = \Diamond \Box [A]_v \land SF_v(A) $$<br />其中 \(A\) 是一个动作（不一定是 \(Next\) 的严格子动作），它能使系统中的每个状态都更接近 \(P\)。因此，任何行为都可以在任意时刻放下手头的一切，直接朝 \(P\) 前进。当然，具体细节将取决于你的规约。</p>
<p>在之前的一篇文章中，我曾编写过一个最终一致性系统（一种无冲突复制数据类型，CRDT）的模型。最终一致性系统具有这样的特性：每个副本彼此之间始终会略微不同步，但如果事务停止流入，则保证所有副本最终都会收敛到系统的相同视图。我当时并未意识到，但这正是一个可达性属性！我们希望系统始终能够收敛，而不是它必然总在收敛！我当时通过引入一个人工布尔标志位，以一种笨拙的方式表达了这一点——该标志位可以在任意时刻触发以停止新事务，随后检查当标志位为真时系统是否最终收敛。如今有了在 TLA⁺ 中表达可达性属性的上述知识，那个标志位本可以被一个公平性假设所替代！当时其实就有人提出了类似的建议，只是我那时还没能理解。</p>
<p>因此，实际上 TLC 现在确实支持检查可达性性质，只要用户将其表述为 \((Spec \space \land \space F) \Rarr \Box \Diamond P\) 形式！这要求相当高，因为即便拥有十多年的 TLA⁺ 经验，直到写这篇博文之前我都没能理解这种方法。若能在 TLC 中将可达性检查作为独立功能并通过反向可达性遍历（backward reachability pass）来实现，将大幅提升其易用性。</p>
<p>坦白讲，我是通过向 GPT-6 Astra 询问有关该部分的许多问题并消化其答案才做到这一点的。不过，这篇博文完全是由我自己撰写的，结合了我由此建立的理解。写下这些既是向我自己、也是向他人进行阐释的一种方式。↩︎</p>
<p>这本身就值得单独写一篇文章，但可以阅读《并发程序科学》（A Science of Concurrent Programs）第 6.4.4.3 节“Enabled 的困扰”（The Trouble with Enabled），以了解有关该算子有多古怪的更多信息；它破坏了逻辑代换规则！↩︎</p>
<p>你可以通过传入命令行参数 -deadlock 让 TLC 跳过死锁检查。没错，这名字起得很烂。你来想个更好的试试！↩︎</p>
<p>就像 TLA⁺ 本身的设计风格化名称一样！↩︎</p>
<p>在几个月前的那段“旧时光”里，这些单元测试是通过故意编写一个你预期会失败的不变量来完成的，只为了让 TLC 吐出一条违规轨迹，从而确认状态空间的某些部分确实是可达的。↩︎</p>
<p>你可以通过转换到 \(N\) 个初始状态之一然后永远静止（stuttering），来使你的行为集合具有任意有限基数 \(N \in \natnums\)，但任何在其 \(Next\) 定义中允许动作改变变量的规范都必须具有无限数量的行为。↩︎</p>
<p>我觉得将这种性质称为“无先见的”（non-prescient）比称为“机器闭包的”（machine-closed）更有趣。在一个无先见/机器闭包的公平性假设下，你的系统可以自然演化，而无需预先知道涉足状态空间的某些部分会导致其无法到达目标状态——从而先验地避免涉足该部分。因此，通常你会希望你的公平性假设是无先见/机器闭包的，因为计算机目前还不能像《沙丘》中的宇航公会领航员那样运作，以那种方式对其进行规范是毫无意义的。William Schultz 写过一篇非常出色的文章，通过图解生动阐述了这种“先见”概念。↩︎</p>
<p>即使 \(P\) 是一个吸收态（例如永久关闭计算机），这也同样成立，因为状态 \(P\) 下的静止步（stuttering step）满足 \(\Diamond P\) 和 \(\Box \Diamond P\)。↩︎</p>
<p>为什么不直接用 \(\Diamond P\) 呢？因为那样你可能会得到一个已经访问过 \(P\) 的有限前缀，该前缀可以通过字面上的任意行为进行扩展以满足你的公平性假设，但该前缀的最后一个状态可能再也无法回到 \(P\)。我们想要捕捉的是这样一种可能性：在到达 \(P\) 一次之后，\(P\) 之后可达的状态自身无法再回到 \(P\)。↩︎</p>
<p>参见《并发程序科学》（A Science of Concurrent Programs）第 4.2.4 节，题为“时态逻辑推理”（Temporal Logic Reasoning）及后续章节。↩︎</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>Hillel Wayne 在其文章中认为可能性与可达性属性无法在 TLA⁺ 中表达。</li>
    <li>Leslie Lamport 在其著作《A Science of Concurrent Programs》第 5.1 节以及 1998 年 10 月的论文《Proving Possibility Properties》中讨论了在 TLA⁺ 中表达可能性和可达性属性的问题。</li>
    <li>来源叙事重点：解构形式化方法领域关于‘TLA⁺ 无法表达可达性/可能性属性’的流行观点，论证在理论层面如何利用机器闭包公平性假设在现存线性时间逻辑中表达分支时间推理，并在工程层面探讨 TLC 模型检验器对可达性验证的现状及反向遍历扩展可行性</li>
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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1607" data-content-paragraphs="1" data-published-at="2026-09-26T15:37:12.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 23:37</span>
</div>

### [JavaScript 中的双关妙趣：标签模板字面量](https://shukla.io/blog/2026-09/pun.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> The JavaScript Pun: tagged template literal</div>

<div class="article-body" data-article-body="true"><p>莎士比亚的作品中充满了双关语，这无疑是他对文字的精通与热爱的体现。<br />你很难仅仅通过调换两个词就组成一个在语法上正确的句子，但他却能像魔术师一样玩转文字。<br />“宁做一个聪明的傻子，也不做个愚蠢的聪明人。”（Better a witty fool than a foolish wit.）<br />在上面的例子中，名词“fool”（傻子）变成了形容词“foolish”（愚蠢的），而形容词“witty”（机智的）则变成了名词“wit”（才智之人）。最简单的双关语就是利用语法规则来改变词义。<br />此外，还有一些双关语是通过对短语的运用，借助语法之外的语境来改变含义。这是我最喜欢的例子之一：<br />“熄灭这灯火，然后熄灭生命的灯火。”（Put out the light, and then put out the light.）<br />前半句字面上指的是吹灭蜡烛，而后半句则是一个隐喻，意指杀死某人（在此处指的是苔丝狄蒙娜）。<br />词典中关于双关语的正式定义通常会提到“幽默”的效果。<br />《牛津英语词典》<br />现在，我深信幽默完全取决于人的主观感受。我觉得有趣的，你未必觉得有趣。但我很想向你介绍我所发现的最精妙的双关语。它并非源自英语。自然语言与编程语言有一个共同的属性：语法（grammar）。你已经见识过双关语能用语法玩出什么花样了。<br />首先，快速介绍一下相关的语法背景。在 JavaScript 中，有一种叫做“标签模板字面量”（tagged template literal）的特性，它能让你执行强大的字符串操作，例如这样：<br />在这段代码中，dedent 是标签函数（tag function），用于处理模板字面量以去除多余的缩进。标签函数分别接收模板字面量的纯文本片段以及求值后的 ${...} 表达式值作为独立参数，因此它可以随心所欲地对每一部分进行处理。<br />大多数模板语言都允许你以最终产物的同一媒介来编写模板：即留有变量占位空洞的文本。每当你的控制逻辑与其所控制的系统处于同一体系时，事情就会变得耐人寻味。这里其实还有一个值得探索的“哥德尔不完备性”分支课题。不过扯远了。下面是一个简单的模板示例：<br />这种 {{ }} 语法非常普遍。事实上，以下模板语言都在使用它：<br />瞧瞧这个：我们可以定义一个名为 prompt 的标签函数，看起来就像是在接收 {{ }} 模板一样。<br />它看起来很眼熟、很顺眼，对吧？而在幕后，它实际上生成了一个字符串，该字符串会被一个可观测性工具（Helicone）处理，用于辅助分析提示词。<br />在我看来，最妙的地方在于，这种表面上的 {{ }} 模板语法在我们的 JavaScript 代码中是纯属巧合地浮现出来的：${...} 会对其内部的任何内容求值，而 JavaScript 的 { name } 对象字面量简写等价于 { name: name }。至此，标签函数 prompt 就获得了正确标注该字符串所需的一切信息。<br />JavaScript 看到的是一回事，而你看到的又是另一回事。那种 {{ url }} 语法其实只存在于你的脑海里。<br />好吧，也许我把这个双关语吹得有点过了，但我对此感到非常自豪。早在 2024 年，我就与来自 Helicone 的 Justin 合作过这个项目。这原本是我在内部一直在使用的一个构想，随后 Justin 将其正式引入了 SDK（Justin 的 PR、我的 PR）。我觉得这个“双关”很有趣，Justin 也乐于将其纳入。<br />双关语本质上就是一个字符串对应两种解析方式。在《文法模型卷土重来了，宝贝！》（Grammar models are back, baby!）一文中，我严肃对待了这一点，并返回了一个针对它们的概率分布。而在《空间语言》（Spatial languages）中，我把事情搞得更复杂，给解析器加入了第二个维度。<br />Nishant Shukla 2026-09-26</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>JavaScript 中存在名为标签模板字面量（tagged template literal）的特性，允许进行字符串操作。</li>
    <li>标签函数接收模板字面量的文本片段和求值后的 ${...} 变量值作为独立参数。</li>
    <li>来源叙事重点：借莎士比亚文学双关语类比编程语法，展示如何巧妙利用 JavaScript 标签模板字面量和对象简写语法，实现视觉上类似 `{{ var }}` 模板的 Prompt 标注技巧及其在 Helicone SDK 中的工程落地</li>
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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2582" data-content-paragraphs="21" data-published-at="2026-09-26T13:45:59.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 21:45</span>
</div>

### [要闻：前几天翻衣柜时，我发现了一台早在 2018 年闪购时买下的 Steam Link，这么多年过去了，它竟然还在尽职](https://feyor.sh/blog/infecting-the-steam-link-with-nixos/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Infecting the Steam Link with NixOS</div>

<div class="article-body" data-article-body="true"><p>前几天翻衣柜时，我发现了一台早在 2018 年闪购时买下的 Steam Link，这么多年过去了，它竟然还在尽职尽责地低鸣运转。我突然想到，拥有一台配备以太网、WiFi、蓝牙以及多个 USB 接口且全天候运行的低功耗 Arm 设备会非常顺手，于是便开启了我让 Steam Link 运行 NixOS 的折腾之旅。</p>
<p>事实证明，一位名叫 fijam 的开发者已经攻克了在 Steam Link 上运行自定义 Linux 发行版的主要难关。最明显的阻碍在于，该设备的引导加载程序（bootloader）只允许引导经 Valve 签名的内核；为了绕过这一限制，我们可以先引导进入经 Valve 认证的官方内核，然后再通过 kexec 加载我们的新内核。然而，Steam Link 自带的内核在编译时并未启用 CONFIG_KEXEC。这正是最精妙的地方：我们可以将相关的 kexec 源码拼凑成一个极简的内核模块，从而为运行中的系统动态注入 kexec 系统调用！</p>
<p>此前已有几人成功利用此技术引导了其他发行版，但他们似乎都只是从 fijam 的网站直接复制现成的 kexec 二进制文件和内核模块。fijam 这人看起来挺好，但我向来对从网上随意下载内核模块保持警惕，因此我决定自己动手编译。</p>
<p>编译 NixOS 用户空间以及内核/initrd 相当简单；只需将正确的 target system（由于我使用了 __splicedPackages/crossSystem，还需传入 pkgs）传递给 lib.nixosSystem 并添加你的配置模块即可。目标架构的选择稍微曲折一点：Valve 的 steamlink 工具链采用的是 armv7a，但若使用 crossSystem.config = “armv7a-unknown-linux-gnueabihf” 导入 nixpkgs，会与 Go 构建底层工具链发生冲突，因此我转而使用了（表面上）等价的 armv7l。</p>
<p>真正的挑战在于为一个有着 13 年历史的供应商内核分支编译内核模块；NixOS wiki 在这方面确实帮了大忙，指出了不少与 stdenv 默认加固标识（hardening flags）相关的暗坑。</p>
<p>（kexec_mod 的源代码见文件部分。）</p>
<p>为了顺利编译，我们需要将 Kbuild 指向一个已通过 make modules 完整构建过的 Linux 内核源码目录。（注意，此处我使用的是 NixOS 配置中相对现代的内核的 moduleBuildDependencies 属性。）</p>
<p>通过对现代版 GCC 进行了多次修补与 hack，我最终成功编译出了 3.8.13-mrvl 内核以及 kexec_mod 内核模块。</p>
<p>现在我们拿到了 kexec_mod.ko，接着还需要新的 initrd 和内核（均来自我们的 NixOS 配置）、Steam Link 的设备树二进制文件（已合并至 Linux 上游主线，因此可通过 hardware.deviceTree.package 获取）、一份 kexec 用户态二进制文件（使用 pkgsStatic 编译，以便在非 NixOS 系统上运行），以及一段将所有组件串联起来的简短脚本：</p>
<p>你完全可以手动摆弄这些文件并将它们拷入 USB 闪存盘，但更轻松的办法是使用 NixOS 的 sd-image 模块直接生成磁盘镜像：</p>
<p>测试 kexec 的交接过程非常棘手，因为我使用的内核无法驱动 HDMI 输出，而我又决定不拆机引出 UART 串口，因此测试时完全是“两眼一抹黑”。我决定先用一个基于 Busybox 的极简（粗糙）initramfs 进行测试，通过设定不同时长后自动重启来判断是否成功。</p>
<p>确认该方案可行后，我换上了 NixOS 的 initrd，并配置 boot.initrd.network.enable = true，利用基于 Netcat 的反向 shell 连回我笔记本的 IP 地址进行进一步调试。</p>
<p>在此阶段我需要解决的关键问题包括：在 boot.initrd.availableKernelModules 中添加 reset_berlin 以允许读取 USB 设备，以及弃用新的基于 systemd 的版本、转回使用旧版 NixOS initrd 系统（boot.initrd.systemd.enable = lib.mkForce false）。</p>
<p>最终，我成功引导进入了用户空间，并通过 SSH 顺利连入！🥳</p>
<p>话虽如此，我用来引导的 USB 镜像体积高达沉重的 2.3GB……显然我们还有优化空间。</p>
<p>令我惊讶的是，社区居然没有关于缩减 NixOS 闭包体积的权威指南；我搜到了一些 NixOS Discourse 讨论帖和几篇博客，其中最有参考价值的当属《NixOS is a good server OS, except when it isn’t》和《I can haz smoller NixOS ISOs?》。这两篇都是很好的参考资料，但由于我们针对的是真实物理硬件而非虚拟机，在裁剪组件时必须更加克制和谨慎。</p>
<p>以下是瘦身过程中总结出的主要调整点：</p>
<p>在优化收益递减、且多数新改动都会导致系统崩溃之后，我决定收手，将最终得到的 1.2GB 磁盘镜像视为“足够堪用”。</p>
<p>我所使用的 Nix flake 以及 kexec_mod 内核模块的源码可在此处下载。为方便查阅，下文同样附上了对应的 flake.nix 内容。</p>
<p>就在我发布本文之前，我发现已经有人凭感觉折腾出了可引导的 NixOS 安装方案，不过他们的配置显得更加粗制滥造，无法正确处理重启，并且使用了大量非必要的二进制预编译包而非从源码构建。↩︎</p>
<p>尽管使用 make modules_prepare 可以顺利完成编译，但生成出的内核模块不会具备正确的 vermagic 以及符号地址，因而无法被 insmod 正常加载：<br />注意：“modules_prepare” 即使在设置了 CONFIG_MODVERSIONS 的情况下也不会构建 Module.symvers；因此必须执行一次完整的内核构建才能使模块版本机制正常工作。</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="8163" data-content-paragraphs="27" data-published-at="2026-09-26T12:14:01.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 20:14</span>
</div>

### [Go 语言并发精要](https://antonz.org/go-concurrency-distilled/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Go concurrency distilled</div>

<div class="article-body" data-article-body="true"><p>这本迷你书对 Go 语言中的诸多并发主题进行了简要概述。每个主题都附带交互式示例——欢迎随意修改代码并点击“运行”（Run）进行体验。此外还提供包含静态示例的 PDF 版本。<br />这是一份针对 Go 并发的快速温习资料，而非新手入门指南。如果你想从零开始并通过动手实践练习来学习并发，可以参考我的另一本书——《Gist of Go: Concurrency》。<br />本书完全由人工编写，未借助 AI（AI-free）。<br />Goroutine • 通道（Channel） • Select • 管道（Pipeline） • 时间（Time） • 上下文（Context） • 等待组（Wait group） • 数据竞争（Data race） • 竞态条件（Race condition） • 互斥锁（Mutex） • 信号量（Semaphore） • 信号通知（Signaling） • 单次运行（Run once） • 对象池（Object pool） • 原子操作（Atomic） • 测试（Testing） • 调度（Scheduling） • 诊断（Diagnostic） • 结语<br />Go 语言并发的基石是 goroutine——即通过 go 关键字启动的函数：<br />Go 运行时负责调度这些 goroutine，并将它们分发到运行在 CPU 核心上的操作系统线程中。与操作系统线程相比，goroutine 非常轻量，因此你可以创建成百上千个 goroutine。<br />Goroutine 之间完全相互独立。main 函数本身也是一个 goroutine，但在程序启动时会隐式运行。当 main 函数结束时，其他 goroutine 也会随之终止。<br />在上面的示例中，我们使用等待组（sync.WaitGroup）来等待各个 goroutine 执行完成。等待组内部包含一个计数器。调用 Add(n) 会将计数器增加 n，而 Done() 会将计数器减 1。Wait() 则会阻塞调用它的 goroutine（本例中为 main），直到计数器归零。通过这种方式，main 会在退出前等待两个工作协程全部执行完毕。<br />WaitGroup.Go 会自动递增等待组计数器，在一个 goroutine 中运行指定的函数，并在函数完成时递减计数器：<br />Goroutine 之间可以通过通道（channel）互相传递值。通道就像一扇窗口，一个 goroutine 可以往里面扔东西，另一个 goroutine 可以接住它：<br />通过通道发送值是一个同步操作。当发送方 goroutine 向通道写入值（ch &lt;- val）时，它会阻塞并等待某人接收该值（&lt;-ch）。只有在接收完成后，它才会继续执行。<br />从函数中返回一个输出通道并在内部 goroutine 中对其进行填充，是 Go 语言中常见的设计模式。这允许调用方通过通道接收数据，同时归属函数保留对通道的控制权：<br />为了通知读取方所有数据已发送完毕，写入方 goroutine 会使用 close() 关闭通道：<br />读取方在读取时可以通过第二个返回值（即“comma OK”机制）来检查通道的状态：<br />只要通道处于打开状态，读取方就会接收到下一个值以及为 true 的状态。如果通道已被关闭，读取方将获得该类型的零值以及为 false 的状态。<br />一个通道只能被关闭一次。重复关闭通道或向已关闭的通道写入数据都会引发 panic。<br />关闭通道的唯一原因就是为了向读取方发出所有数据均已发送完毕的信号。如果这对于读取方而言并不重要，那么你无需将其关闭。当通道不再被使用时，无论其是否关闭，Go 的垃圾回收器都会释放其占用的资源。<br />range 会自动从通道中读取下一个值并检查其是否已关闭。如果通道已关闭，则会退出循环：<br />与切片上的 range 不同，对通道进行 range 只会返回单个值，而不是键值对。<br />你可以通过指定通道的方向来避免意外的写入/关闭错误。通道可以是：<br />你不能从只写（send-only）通道读取数据，也不能向只读（receive-only）通道写入数据（亦不能将其关闭）。<br />通道通常被初始化为既可读又可写，并在函数参数中被具体限定为具有方向性。Go 会自动将常规的双向通道转换为单向通道：<br />带缓冲通道（Buffered channel）的工作方式类似于一个具有固定大小缓冲区的先进先出（FIFO）队列，用于存放数据。<br />只要缓冲区尚有空闲空间，向通道写入数据就不会阻塞 goroutine。同样，只要缓冲区中仍有数据，从通道中读取数据也不会阻塞 goroutine：<br />默认情况下，如果你未指定缓冲区大小，通道即为无缓冲通道（缓冲区大小为零）。<br />带缓冲通道支持内置的 len() 和 cap() 函数：<br />从一个已关闭的带缓冲通道读取数据时，将返回缓冲区中的值和 true 状态。一旦所有值都被取出，它将返回零值和 false 状态，就像常规通道一样：<br />正如 Go 中的任何类型一样，通道也有零值，即 nil。<br />向 nil 通道写入或从中读取数据都会导致 goroutine 无限期阻塞：<br />关闭一个 nil 通道会引发 panic：<br />select 语句在某种程度上类似于 switch，但它是专门为通道设计的。它的工作方式如下：<br />Select 被用于管理管道中的数据流：<br />用于取消 goroutine：<br />用于非阻塞操作：<br />管道（pipeline）是一系列操作的集合，其中每个步骤接收输入数据，以特定方式对其进行处理，并将其输出。每个操作的输入和输出都是通道。<br />一个典型的管道结构如下所示：<br />Goroutine 可以利用输出通道向其他 goroutine 发送其已完成工作的信号：<br />如果 goroutine 不需要返回结果，它可以使用一个 done 通道来发出完成信号：<br />为了提前终止 goroutine，调用方 goroutine 可以使用一个 cancel 通道：<br />在并发管道中有三种处理错误的方法。<br />➊ 遇到第一个错误时即返回：<br />➋ 使用结果类型：<br />➌ 单独收集错误：<br />除了处理日期和时间外，time 包还提供了在并发程序中管理时间敏感操作的工具。<br />time.After() 返回一个初始为空的通道，但在超时周期结束后会接收到一个值。它对于为操作设置超时非常有用：<br />withTimeout() 等待 fn() 执行完成，但借助 time.After()，它的等待时间不会超过超时期限制：<br />定时器（time.Timer）是一个包含 C 通道的结构体，当它触发（到期）时会向该通道发送当前时间。定时器适用于规划未来的执行计划：<br />Stop() 用于停止定时器；如果定时器尚未到期则返回 true，否则返回 false：<br />使用 time.AfterFunc() 包装函数通常更加方便。它等待持续时间 d，随后执行函数 f：<br />time.AfterFunc() 返回一个定时器，你可以在其开始执行前将其取消：<br />如果在循环中使用定时器，最好创建单个定时器并在每次迭代时将其重置（reset），而不是每次都创建新实例：<br />ticker 类似于定时器，但它会持续触发，直到你将其停止。Ticker 适用于执行周期性任务：<br />NewTicker(d) 创建一个 ticker，它以间隔 d 向通道 C 发送当前时间。你最终必须使用 Stop() 停止 ticker 以释放资源。<br />如果通道读取方无法跟上 ticker 的节奏，ticker 将跳过未处理的周期滴答（ticks）。<br />context 的主要目的是取消操作，既可以手动取消，也可以通过超时/截止时间（deadline）取消。<br />函数接收一个 context，并使用其 Done() 通道监听取消信号：<br />手动取消（返回 context.Canceled 错误）：<br />按超时取消（返回 context.DeadlineExceeded 错误）：<br />按截止时间取消（返回 context.DeadlineExceeded 错误）：</p>
<p>Context 是分层的。context 对象是不可变的。要向 context 添加新属性，需在旧（父）context 的基础上创建一个新（子）context。父子 context 之间较短的超时时间总是优先胜出。子 context 只能缩短父 context 的超时时间，不能延长它：<br />多次取消是安全的。你可以对 context 调用任意多次 cancel()。第一次取消会生效，其余调用将被忽略。<br />你可以使用 context.WithCancelCause()、context.WithTimeoutCause() 和 context.WithDeadlineCause() 指定自定义取消原因。该原因可以通过 context.Cause() 获取：<br />Context 可以使用 context.WithValue() 传递有关调用的附加信息，该函数会创建一个带有特定键值的 context。但通常最好避免在 context 中传递值。更好的做法是使用显式参数或自定义结构体。<br />sync.WaitGroup 类型让你可以等待一个或多个 goroutine 执行完毕：<br />WaitGroup 对其管理的 goroutine 一无所知。它依靠一个内部计数器工作。调用 wg.Add(1) 会使计数器加一，而 wg.Done() 会使其减一。wg.Wait() 会阻塞调用它的 goroutine，直到计数器归零。<br />Go 方法将 Add、启动 goroutine 以及 Done 结合在一起：<br />所有方法都可以安全地在多个 goroutine 中使用。<br />通常情况下，所有的 Add 调用都在 Wait 之前发生。但从技术上讲，并没有什么能阻止你在 Wait 之前执行部分 Add 调用，并在之后（从另一个 goroutine 中）执行部分 Add 调用。<br />你可以从多个 goroutine 中调用 Wait。它们都会被阻塞，直到该组的计数器归零。<br />当多个 goroutine 访问共享数据且至少有一个修改它时，就会发生数据竞争（data race）。我们需要保护数据免受此类并发访问的影响。<br />数据竞争并不总会导致运行时 panic。这就是为什么 Go 提供了一个名为竞态检测器（race detector）的特殊工具。你可以使用 -race 标志启用它，该标志适用于 test、run、build 和 install 命令。<br />通道（Channel）在并发读写时是安全的，不会引起数据竞争。<br />防止数据竞争的方法：<br />当来自多个 goroutine 的操作由于不可预测的执行顺序导致系统状态不正确时，就会发生竞态条件（race condition）：<br />如果单个操作本身是并发安全的，Go 的竞态检测器就不会发现任何问题。正因如此，它无法捕获竞态条件：<br />你无法完全消除并发环境中的不确定性。事件会以不可预测的顺序发生——这正是并发的运作方式。然而，你可以防止竞态条件——通常是通过使用互斥锁来保护复合操作：<br />有时你可以在不使用互斥锁的情况下，通过应用原子比较并交换（compare-and-set）操作或其衍生机制来防止竞态条件：<br />其核心思想始终是相同的：<br />sync.Mutex 类型可保护共享数据和代码片段免受并发访问：<br />互斥锁保证在同一时刻只有一个 goroutine 可以执行 Lock() 和 Unlock() 之间的代码。<br />互斥锁在以下情况下使用：<br />如果所有 goroutine 都只是读取数据，则不需要互斥锁。<br />TryLock 方法尝试锁定互斥锁，就像普通的 Lock 一样。但如果无法锁定，它会立即返回 false，而不是阻塞当前 goroutine：<br />sync.RWMutex 类型区分了读者和写者。它提供两组方法：<br />其工作原理如下：<br />这构建了一个“单写多读”的模型。<br />sync.Mutex 和 sync.RWMutex 都实现了同一个 sync.Locker 接口：<br />通过使用 Locker 而不是特定的互斥锁类型，你可以构建不依赖特定锁实现的组件。这允许调用方决定使用哪种锁。<br />你可以使用通道代替互斥锁来保护共享数据：<br />信号量就像一个包含 N 个可用槽位的容器，拥有两个操作：acquire（获取）占用一个槽位，release（释放）腾出一个槽位。以下是信号量的规则：<br />你可以用带缓冲的通道实现一个简单的信号量，其中 N 是通道的容量大小。要获取信号量，向通道发送一个值；要释放它，从通道取出一个值：<br />对于更复杂的情况，请使用 golang.org/x/sync/semaphore 包。<br />集合（rendezvous）让两个 goroutine 互相等待：<br />你可以用 wait group 实现一个简单的 rendezvous：<br />屏障（barrier）是 rendezvous 的泛化形式。它允许 N 个 goroutine 互相等待：<br />你可以用 wait group 实现一个简单的屏障：<br />sync.Cond（条件变量）类型允许一个 goroutine 向另一个 goroutine 发送就绪信号，并允许另一个 goroutine 等待该信号。<br />Cond 包含一个互斥锁并有两个方法——Wait 和 Signal。<br />如果在调用 Signal 时有多个处于等待状态的 goroutine，则只会恢复其中一个。如果没有等待中的 goroutine，Signal 什么都不做。<br />你也可以使用 Broadcast 方法。虽然 Signal 仅唤醒一个在 Cond.Wait 上等待的 goroutine，但 Broadcast 方法会唤醒所有此类 goroutine。<br />你可以使用通道来进行信号通知：<br />sync.Once 类型确保给定的函数只运行一次。如果多个 goroutine 同时调用 Once.Do，只有一个会运行该函数，而其他 goroutine 会一直等待直到其返回：<br />Once 非常适合并发环境中的一次性初始化或清理工作。<br />除了 Once 类型之外，sync 包还包括三个便捷的 once 函数：<br />sync.Pool 类型有助于复用内存而不是每次重新分配，从而减轻垃圾回收器的负担：<br />Get 从池中取出一个对象。如果没有可用对象，它会使用 New 创建一个新对象（我们必须自己定义 New，因为池对其创建的对象一无所知）。Put 将对象放回池中。<br />注意事项：<br />无同步机制的操作只有在转化为单条处理器指令时才能真正具备原子性。此类操作不需要锁，并且在并发调用时不会引起问题（即使是写操作）。<br />原子类型只有少数几种，它们都位于 sync/atomic 包中：<br />每个原子类型都提供以下方法：<br />数值类型还提供了一个 Add 方法，用于将值增加指定的量。<br />所有方法要么被编译为单条 CPU 指令，要么通过其他机制保证原子性，因此可以安全地从多个 goroutine 中使用。<br />原子操作的组合始终是非原子的：<br />使复合操作具备原子性并防止竞态条件的一个万无一失的方法是使用互斥锁：<br />有时你可以使用原子类型代替互斥锁来实现提前退出：<br />如果你的并发程序使用了通道，或者使用了带有类似 Wait 这类同步方法的自定义类型，你可以在测试中使用它们。这样，你的测试代码不会比同步代码复杂多少：<br />如果正在测试的代码中没有任何合适的同步“句柄”，你可以使用 synctest 包。它导出了两个函数：</p>
<p>synctest.Test 会运行一个隔离的气泡（bubble）。该气泡使用虚拟时钟，你可以通过 synctest.Wait 手动控制 goroutine 的同步。</p>
<p>synctest.Wait 会阻塞，直到气泡中的所有 goroutine（调用 Wait 的那一个除外）要么已经执行完毕，要么处于持久阻塞（durably blocked）状态。这样你就可以等待某个特定的 goroutine 完成或被阻塞，从而检查程序的状态：</p>
<p>synctest.Test 中的虚拟时钟仅在满足以下条件时才会向前推进：➊ 气泡中的所有 goroutine 均处于持久阻塞状态；➋ 未来存在至少一个 goroutine 会被解除阻塞的时刻；➌ synctest.Wait 未在运行。得益于此，依赖时间的测试可以瞬间执行完毕：</p>
<p>以下操作会持久阻塞一个 goroutine：</p>
<p>在互斥锁、I/O 或系统调用上的阻塞不被视为持久阻塞，synctest 气泡无法处理它们。</p>
<p>在硬件层面，CPU 核心负责并行执行任务。</p>
<p>在操作系统层面，线程是基本执行单元。线程的数量通常远多于 CPU 核心数，因此操作系统的调度器决定运行哪些线程以及暂停哪些线程。</p>
<p>在 Go 运行时层面，goroutine 是基本执行单元。运行时调度器运行固定数量的操作系统线程，通常每个 CPU 核心一个。goroutine 的数量可能远多于线程，因此调度器负责决定在可用线程上运行哪些 goroutine 以及暂停哪些 goroutine。调度器在各个 goroutine 之间不断切换，以确保每个 goroutine 都有机会在线程上运行，而不是永远排队等待。</p>
<p>这就是 Go 处理并发的方式。</p>
<p>goroutine 调度器的职责是在 N 个操作系统线程上运行 M 个 goroutine，其中 M 可能远大于 N。以下是其算法的极度简化版本：</p>
<p>运行 Go 代码的线程数量由 GOMAXPROCS 环境变量或 runtime.GOMAXPROCS 函数控制。</p>
<p>goroutine 是一个结构体，起初仅占用约 2 KB 的内存，主要用于其栈空间。如果需要，栈可以按需扩容。由于 goroutine 非常轻量，你可以在一台小型机器上运行数万甚至数十万个 goroutine。</p>
<p>为了在生产环境中排查并发程序的问题，我们会使用指标（metrics）、性能分析（profiling）和追踪（tracing）。</p>
<p>指标反映了 Go 运行时的表现，例如它使用了多少堆内存，或者垃圾回收暂停耗时多久。每个指标都有唯一的名称和一个值，值可以是数字或直方图。</p>
<p>你可以使用 runtime/metrics 包获取完整的指标列表，或者查看特定指标的值：</p>
<p>在实践中，人们很少手动执行此操作。相反，所有指标通常都会使用 Prometheus 或 OpenTelemetry 库自动导出。</p>
<p>性能分析有助于深入了解程序究竟在做什么、使用了哪些资源，以及这些发生在代码的哪个位置。Go 使用了适用于生产环境的采样分析器（sampling profiler）。</p>
<p>最常用的分析类型是 CPU 分析（显示每个函数使用了多少处理器时间）和堆分析（显示每个函数使用了多少堆内存）。Goroutine、阻塞（block）和互斥锁（mutex）分析有助于发现与并发相关的问题。</p>
<p>为应用程序添加分析器的最简单方法是使用 net/http/pprof 包。要采集指定名称的性能分析数据，请调用 /debug/pprof/{name} 端点。要查看采集到的分析数据，请使用 go tool pprof 工具：</p>
<p>你也可以手动进行性能分析：</p>
<p>追踪（Tracing）会在程序运行时记录某些类型的事件，主要是与并发和内存相关的事件。当 net/http/pprof 包中的性能分析服务器正在运行时，调用 /debug/pprof/trace 端点即可采集追踪数据。要查看结果，请使用 go tool trace 工具。</p>
<p>你也可以手动采集追踪数据：</p>
<p>你可以配置带滑动窗口的自动追踪，该窗口可受大小或持续时间的限制。这被称为“飞行记录器”（flight recording）。它能确保在发生异常时，始终保留最近的追踪数据可用：</p>
<p>我们已经介绍了许多用于编写并发程序的 Go 工具：</p>
<p>如果你喜欢这本书，请推荐给你的朋友或同事。如果你感兴趣，</p></div>

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
<div id="story--other-what-do-we-become-150123896cddcf1d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="407" data-content-paragraphs="4" data-published-at="2026-09-26T11:02:48.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 19:02</span>
</div>

### [如果我们不再停下脚步互相帮助，我们又会变成什么？](https://blog.codinghorror.com/if-we-do-not-stop-to-help-each-other-what-do-we-become/)
<div class="original-title-sub"><span class="orig-tag">原文</span> If we do not stop to help each other, what do we become?</div>

<div class="article-body" data-article-body="true"><p>昨天，我收到了一封针对《You Can&#39;t Vibe Code Love》的回信。这番话如此发人深省、掷地有声，以至于我请求对方允许在隐去个人信息后，将其在此全文分享：</p>
<p>也许大语言模型正是在提醒我们，应当付出更多努力来维系彼此之间的人际关系，并在网络上建立社群——建立属于我们自己、而不是属于某个亿万富翁的社群。在这样的社群里，我们会常常停下脚步互相帮助，因为这也正是我们学习的方式。而如果我们不再停下脚步互相帮助……我们又会变成什么？</p>
<p>室内爱好者。Stack Overflow、Discourse 以及 staygold.us 的联合创始人。免责声明：我完全不知道自己在说什么。让我们彼此善待。你可以通过 https://infosec.exchange/@codinghorror 找到我。</p>
<p>⏲️ 正在为您处理注册。<br />❗ 出了点问题。请重试。<br />✅ 成功！请查收您的收件箱（以防万一，也请查看垃圾邮件箱）。</p></div>

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

:::cell
<div id="story-state-of-simd-rust-2026-b69d8b80c72d0ae3" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7649" data-content-paragraphs="40" data-published-at="2026-09-26T08:28:50.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 16:28</span>
</div>

### [要闻：自去年以来取得了很大进展，而我也贡献了其中一部分](https://shnatsel.github.io/state-of-simd-rust-2026/)
<div class="original-title-sub"><span class="orig-tag">原文</span> The state of SIMD in Rust in 2026</div>

<div class="article-body" data-article-body="true"><p>自去年以来取得了很大进展，而我也贡献了其中一部分！<br />在去年的调研之后，我开始向看起来最有前景的 SIMD 库贡献代码。接二连三地推进之后，我现在成为了 Fearless SIMD 的维护者。<br />为了避免利益冲突，我邀请了其他库（std::simd、wide、pulp、macerator）的作者来审阅本文草稿并提供反馈。不过，我保留了编辑控制权，所有疏漏均由我本人负责。<br />今年的调研比我之前的调研更为深入。所以系好安全带，让我们……从头开始！<br />执行算术运算的硬件很便宜，因此本世纪制造的任何 CPU 都有大量此类硬件。但你仍然只有一个指令解码模块，并且很难让它跑得飞快，所以算术硬件的利用率严重不足。<br />为了绕过指令解码瓶颈，你可以一次性给 CPU 输入一批数字，用于单次算术操作（例如加法）。这就是它名称的由来：“单指令多数据”（Single Instruction, Multiple Data），即 SIMD。<br />与其将两个数字相加，你可以将两批（或称两组“向量”）数字相加，所耗费的时间与仅做一次加法大致相同。<br />在近期的 x86 芯片上，这些批次的大小可达 512 位，因此理论上对于 f64 的数学运算你可以获得 8 倍加速，或者在 u8 上获得 64 倍加速。在实践中，它的运行速度可能更慢，也可能更快。<br />从历史上看，SIMD 指令是在 CPU 架构已经设计完成之后才添加的，因此在各个架构上 SIMD 都是拥有各自营销名称的扩展扩展集。<br />ARM 将其称为“NEON”，所有 64 位 ARM CPU 都具备该特性。<br />WebAssembly 没有市场营销部门，因此他们直接称其为“WebAssembly 128 位打包 SIMD 扩展（WebAssembly 128-bit packed SIMD extension）”。<br />64 位 x86 推出时带有名为“SSE2”的扩展，它具有针对 128 位向量的基础指令，但后来他们在此之上添加了五花八门的扩展组合：SSE 4.2 增加了更多操作，AVX 和 AVX2 增加了 256 位向量，而 AVX-512 则增加了 512 位向量以及更多操作。<br />上一段中的“后来”这个词带来了一个问题。<br />如果你在 x86_64 CPU 上运行程序，无法理所当然地认为该 CPU 具有任何特定的 SIMD 扩展。因此在默认情况下，编译器不允许使用超过 SSE2 的指令，因为那些指令无法在所有 x86_64 CPU 上运行。<br />解决这个问题有两种方法。<br />如果你在一家只在自己的服务器或公共云上运行其二进制文件的公司工作，你可以直接断言这些机器都足够新，至少支持 10 多年前推出的 AVX2，并在其运行于任何不支持 AVX2 的硬件上时让程序崩溃或出现异常行为：<br />然而，如果你是要分发二进制文件供其他人运行，这就不能算是一个真正的选项了。<br />取而代之的是，你可以采用一种名为函数多版本化（function multiversioning）的技术：针对不同的 SIMD 扩展多次编译同一个函数，而在程序实际运行时，检测 CPU 支持哪些特性，并基于此选择适当的版本。<br />幸运的是，这个问题只存在于 x86 上。<br />ARM 在其 64 位 CPU 上强制要求支持 NEON，并且在那之后并没有真正添加过有用的 SIMD 扩展（稍后详述）。<br />WebAssembly 则要求你编译两个不同的二进制文件，一个带 SIMD，一个不带，并使用 JavaScript 来检测浏览器是否支持 SIMD。<br />利用 SIMD 有三种方式：<br />让我们来看看每种方式包含哪些内容，以及各种编程模型的现状如何。<br />直接编写普通的 Rust 代码，让编译器的启发式算法去完成工作！<br />如果你小心地以编译器能够较可靠地进行向量化的方式编写代码，你可以让它运行得相当出色。这通常涉及遍历 &amp;[i32].as_chunks() 而不是 &amp;[i32]，并进行基准测试或紧盯汇编代码以验证它是否生效。详情参见《你能信任编译器来优化你的代码吗？》（Can You Trust a Compiler to Optimize Your Code?）。<br />这是最容易使用的选项，不需要任何依赖项，并且自动支持编译器支持的所有指令集，无论该指令集多么冷门。<br />缺点是这种方法不是非常可靠。你的函数越大越复杂，编译器无法对其进行向量化的概率就越高。性能也可能根据编译器版本的不同，或者由于周围代码的变动而出现剧烈波动。<br />浮点类型也需要特殊处理。<br />浮点数很奇怪。即使是以合理的精度对浮点数组求和这样微不足道的操作，其复杂程度也令人惊讶，参见《驯服浮点数求和》（Taming Floating-Point Sums）。<br />以前，自动向量化不能用于浮点类型，因为这会改变结果的精度（通常是变得更好，但编译器不允许改变任何可观察的结果）。<br />这种情况在 Rust 1.98 中得到了改变，该版本稳定了代数运算（例如 algebraic_add()），这些运算允许编译器改变可观察的结果，就像一个没那么危险的 -ffast-math。在大多数情况下，你仍然必须重写代码来使用它们，代码才有资格进行向量化。<br />而且你仍然需要通过某种方式实现多版本化。所以趁此机会……<br />下面讨论的多合一 SIMD crate 也提供了多版本化功能，但让我们先快速看一下 multiversion，因为它对自动向量化最有用。<br />它非常易于使用：你只需给函数添加 #[multiversion(targets = &quot;simd&quot;)] 注解即可。<br />但这种简便性掩盖了一个未在文档中说明的陷阱：调用带有 #[multiversion] 注解的函数会有少许开销。这个开销非常小——不到十几条指令，但如果被注解的函数本身非常微小，它就会显现为显著的开销。<br />根据经验法则：如果你的函数内部包含循环，请添加 #[multiversion]；如果它只处理少量的值，请添加 #[inline(always)]，只要在调用链的上游某处存在 #[multiversion] 即可。<br />下面列出的其他 crate 没有这个陷阱，也不会让你去考虑函数的大小，代价是需要更多的样板代码。<br />multiversion 是唯一一个允许你列出具体所需 CPU 扩展的 crate，而不是只能选用预定义的 SIMD 级别。因此，如果你的代码恰好能受益于某些非常新的指令，你可以选择启用它。但在我的经验中，自动向量化代码几乎很少遇到这种情况。<br />对于 AVX-512，multiversion 只检测它是否存在，而不是检测它是否真的快，这在实践中可能会损害性能（稍后详述）。你可以通过增加样板代码来绕过这一点——你必须在每个函数上添加如下内容：<br />有几个可用于生产环境的方案。理想的特性包括：<br />以及指令集支持情况：<br />* macerator 还支持 LoongArch，因为作者套用原话是“闲着无聊”。<br />std::simd 并不是 SIMD 的完整解决方案。它更像是一组必须存在于标准库中的基础构建块，而其他一切都留给生态系统的 crate 去实现。</p>
<p>最大的缺点在于它仅支持 nightly 版本，并且仍会偶尔发生破坏性的 API 变更。因此，某天你更新了编译器，你的代码可能就无法编译了，必须亲自去排查修复。但只要你能接受这一点，并且只需要固定宽度向量以及或许需要多版本化（multiversioning），它就非常棒！</p>
<p>std::simd 存在的根本理由在于它直接构建于 LLVM 之上，可以面向 LLVM 所能支持的任何平台，包括只有大型银行使用或只有中国政府使用的奇特 CPU。但反过来看，如果 LLVM 内部没有与 std::simd 完全匹配的操作供其利用，就没有备选方案，实际上也不会使用任何 SIMD。</p>
<p>这种情况发生的频率令人不安。其 sin() 函数再贴切不过地体现了这一点：披着 SIMD 的外衣提供标量实现简直就是大罪（双关罪过与正弦函数）。而 reduce_sum() 在性能和精度两方面都不知为何成了最糟糕的情况。因此，别费劲在浮点数上使用任何非平凡函数了。</p>
<p>我们拥有的最接近正规三角函数的东西是 sleef crate，这是将 SLEEF 部分移植到 std::simd 的产物，只是存在少许 bug。而这已经是我在整篇文章中能拿出来的最好的三角函数实现了！</p>
<p>在多版本化方面，std::simd 具有独一无二的灵活性。你可以使用 multiversion crate，或者本节中任何其他 SIMD crate 所提供的多版本化机制。而所有其他 crate 都仅能与自身内置的多版本化机制配合工作。</p>
<p>它的 Simd API 看起来非常优雅，如果你能直接对 N 进行数学运算的话，效果会非常好，但你做不到。该特性即便在 nightly 上也极不完善。没有它，使用 Simd 来获取硬件原生尺寸的向量虽然可行，但要难看得多。</p>
<p>尽管在很多情况下你可以直接使用 std::simd 并获得尚可的性能，但通过第三方 crate 零散地拼凑功能并不能走得太远。举例来说，sleef crate 无法与 multiversion crate 一同工作，你必须 fork sleef 并亲自动手将它们撮合在一起。第三方扩展在孤立状态下工作正常，但无法相互组合。</p>
<p>你所需要的是一个各个部分能协同工作的一体化解决方案。说到这个……</p>
<p>Fearless SIMD 正是一个所有组件都能协同工作的一体化解决方案。</p>
<p>看看它在表格中生成的那一整列赏心悦目的绿色复选标记吧！</p>
<p>除了表格中的内容之外，fearless_simd 独有的特性包括：</p>
<p>其主要缺点是样板代码：不是形如</p>
<p>这读起来非常繁琐拗口。</p>
<p>AVX-512 仅用于较新的 CPU 上，在这些 CPU 上它不会损害性能（见下文的硬件章节）。你可以手动配置 multiversion 以使其表现如此，但这并非默认行为，且需要大量样板代码（见上文）。而所有其他 SIMD 抽象 crate 仅仅是检查 AVX-512 是否存在。</p>
<p>它最近发布了 v1.0 版本，并附带安全策略等一应俱全的内容。</p>
<p>最大的缺憾是三角函数。目前还没有任何类似 SLEEF 的库移植到 fearless_simd 的机制中。</p>
<p>wide 有很多优势：良好的平台覆盖率、大量已实现的操作，而且它已经发布了 v1.0。它甚至拥有三角函数，尽管其精度被明确留作未指定状态。</p>
<p>其最大缺点在于它从根本上与多版本化不兼容。如果你不面向 x86，或者始终针对已知硬件使用 -C target-cpu= 进行构建，这倒无所谓，但在其他情况下则会严重影响性能。唯一的变通方法是 cargo multivers，但它仅适用于长时间运行的程序，否则其启动开销会让 SIMD 带来的性能提升相形见绌。</p>
<p>另一个缺点是不支持任何形式的泛型，无论是针对元素类型还是向量宽度。不过，你可以使用宏来绕过这一限制。与其将函数写成泛型，不如将其包装在 macro_rules! 中，并写成 $type::from_slice 而不是 T::from_slice。这增加了一点样板代码，但也消除了泛型约束的样板代码，所以有得有失。我这样实践过，感觉还不错，特别是当你引入像 paste 这样的 crate 时。</p>
<p>如果你只面向少数几种类型（例如 f32 和 f64），无论如何你可能都想采用宏的方法，即使在带有泛型的库中也是如此，因为它还允许你拥有“泛型”大小的数组。真正的泛型数组大小是仅限 nightly 且不完整的特性。但你也可以通过 generic-array crate 或者直接创建一个最大可能 SIMD 大小的数组来解决这一问题。</p>
<p>pulp 是为了驱动 faer 线性代数库而构建的。这决定了它的优先级：已实现的操作大多是数学运算（例如没有 swizzle 洗牌操作），并且其 API 是面向原生宽度向量设计的。</p>
<p>固定宽度向量在技术上是可行的，但完全没有文档记录，使用起来也相当别扭。我在研究它们时曾贡献过一些修复补丁，其中包括针对一个健全性（soundness）bug 的修复。</p>
<p>这里没有对元素类型泛型的原生支持，但我为 wide 描述的宏技巧在这里应该同样适用。</p>
<p>它的多版本化机制是我见过的最繁琐冗长的。虽然有一个宏可以减少样板代码，但与其他替代方案相比，即使是那个宏也相当啰嗦。</p>
<p>macerator 是 pulp 的亲属，采用了类似的设计。它是为了驱动 burn 的 CPU 后端而构建的。</p>
<p>与 pulp 相比，它增加了对元素类型泛型代码的支持，但移除了对 intrinsics 的安全访问以及大部分文档。它完全没有对固定宽度向量做任何尝试。</p>
<p>它还默认启用了 SSE4.2，并为龙芯（LoongArch）添加了优化的代码路径。</p>
<p>这是除 std::simd 之外唯一一个在 f16 数据上具有某些可移植操作的库，尽管支持的操作列表非常有限。将其与 AVX-512 一起使用需要 nightly 编译器，而 NEON 则可以在 stable 上工作。这仍然相当尴尬，因为标准库的 f16 仅支持 nightly，而该 crate 必须在没有它的情况下设法应对。</p>
<p>在 crates.io 上除了 burn 之外，它没有被任何其他项目使用。</p>
<p>我排除了为单个特定项目制作的 SIMD crate（例如 jxl_simd、pathfinder_simd），因为它们并非面向通用受众。我还排除了主要由 AI 驱动开发的 crate（例如 magetypes、simdeez、thermite），因为我无法推荐在生产环境中使用它们，尤其是后两者有着令人不安的诸多 bug。</p>
<p>可移植 SIMD 固然不错，但有时你想要某个特定指令集独有的非常具体的指令。在这种情况下，你必须直接使用内在函数（intrinsics）。</p>
<p>Rust v1.87+ 允许安全地调用平台特定的内在函数：</p>
<p>但有两个注意事项：</p>
<p>针对这两者都有现成的解决方案：</p>
<p>列表中的所有内容都是这两种思路的各种实现。</p>
<p>archmage 提供了 CPU 特性令牌（CPU feature tokens），并使用 safe_unaligned_simd crate 来实现安全的加载/存储包装器。</p>
<p>其核心是 #[arcane] 过程宏。</p>
<p>你可以获得一系列预定义的 SIMD 级别：常见的常客如 SSE2/SSE4.2/AVX2；并且有两个不同级别的 AVX-512：早期的缓慢实现，以及 Ice Lake 及更新架构（这才是真正有用的），供你选择。在 ARM 上，有基线 NEON 以及几个扩展级别。</p>
<p>不支持32位x86（你总是会回退到标量版本），但这在2026年并不是什么大问题。<br />fearless_simd通过其kernel!宏基本上为你提供了与archmage相同的工具。<br />这是一个声明式宏，而不是过程宏。这改善了构建时间，但与archmage不同的是，它不支持用它来注解泛型或常量泛型函数。不过内在函数（intrinsics）和泛型本来就合不来，所以这通常也不是什么大问题。<br />它没有打包safe_unaligned_simd，因为可以通过其可移植SIMD抽象来完成安全加载，但如果你真的想把加载写成_mm256_loadu_epi64()（通常是为了移植以此类方式编写的现有代码），你也可以自己引入它。<br />其SIMD级别与可移植SIMD抽象相同。因此，如果你非常清楚自己在做什么，你不能选择启用早期、缓慢的AVX-512，也不能访问NEON的非基线扩展（例如aes或bf16）。<br />有利的一面是，你可以轻松地混合搭配可移植SIMD和内在函数。这使你可以用可移植SIMD编写大部分算法，并且仅在真正需要的地方使用少量内在函数。<br />pulp在这方面出人意料地强大。<br />如果你想使用不属于任何SIMD级别的内在函数，例如来自aes特性的_mm_aesenc_si128，这是在不自行构建SIMD特性令牌的情况下安全实现此目的的最佳（且唯一）方法。<br />遗憾的是，它并没有记录该如何做到这一点。<br />如果你查阅文档，你会发现以各种CPU特性命名的结构体，例如Avx512ifma，并提供了构建它的方法以及该CPU特性对应的内在函数。所以你可能会认为只要构建它然后调用该函数就行了，对吧？错了。<br />你可以这样做，而且它确实可以运行，但性能非常糟糕。你正在从一个无法保证拥有额外CPU特性的函数中调用一个需要这些特性的内在函数（请记住，CPU特性检查可能会失败），因此该内在函数必须位于其自身独立的函数中。现在你为了调用单条指令而付出了函数调用开销——几条指令。“几条指令”比一条多得多，因此函数调用开销占据了主导地位，导致性能骤降。<br />你必须做的反而是创建一个启用了所有必需特性的上下文，然后从该上下文中调用一堆内在函数。就像这样：<br />有关你可以实际运行的更完整示例，请参见此处。<br />为了完整起见，我应该提到曾经有人为fearless_simd仓库提议过类似的功能，作为一个单独、独立的crate。它已完全实现，但没有人站出来实际维护它，所以它从未被合并。如果pulp有什么让你感到困扰的地方，不妨试试那个方案，看看你是否愿意接手它。<br />除了std::simd和自动向量化之外，SIMD内在函数支撑着所有SIMD代码。它们也相当直接：内在函数应该清晰地映射到特定的CPU指令。鉴于它们如此简单且重要，你会期望它们运行得非常好。<br />然而事实并非如此。在Rust中不行，在C++中不行，在C中也不行。<br />在“给我这条确切的指令”与编译器优化之间存在着根本性的冲突。如果你让编译器将SIMD内在函数视为纯粹的黑盒，你最终会在其他地方产生低效。<br />例如，我在ARM上遇到的一个真实bug是u32x4::from([1,2,3,4])速度很慢。这实际上只是加载一个常量，而且u32x4与四个u32组成的数组具有完全相同的内存布局，所以它应该非常廉价——只需单次加载即可。<br />解决方案是放弃vld1_u32_x4的黑盒实现，将其转变为常规加载的兼容包装器，以便编译器能够对其进行妥善优化。非常感谢Rust stdarch维护者Folkert de Vries协助调查此问题并实现了修复。<br />那么，我们把所有内在函数都变成常规编译器操作的包装器不就行了吗？但愿如此。<br />那个vld1_u32_x4并不是真正的黑盒。它是一个尚未有人为其编写优化Pass的硬件操作。如果你想将某些特殊的硬件操作转化为编译器可理解的基本块（或者仅仅为了对略有不同的硬件指令的通用行为进行抽象</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-26 16:28 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://shnatsel.github.io/state-of-simd-rust-2026/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-nternational-students-uk-35a49e553808a8b6" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="706" data-content-paragraphs="3" data-published-at="2026-09-26T05:00:26.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 13:00</span>
</div>

### [“他们收了钱，却没照顾好我的孩子”：卢娜·黄之死揭示了英国对国际学生的照护现状](https://www.theguardian.com/society/2026/sep/26/luna-wong-hong-kong-death-reveals-treatment-international-students-uk)
<div class="original-title-sub"><span class="orig-tag">原文</span> ‘They accepted the money but didn’t take care of my child’: what Luna Wong’s death reveals about the treatment of international students in the UK</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/3f680f044486c03483dc171825d676312ab57fc2/200_0_1255_1004/master/1255.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=3fab68bb83195ffd66e040dde9fc0399" alt="“他们收了钱，却没照顾好我的孩子”：卢娜·黄之死揭示了英国对国际学生的照护现状" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>当父母挥手目送她远赴英国求学时，他们曾寄希望于这段旅程能为这位16岁的少女带来全新开端，帮她摆脱在香港饱受心理健康困扰的过往。然而，仅仅10个月后，她便离开了人世。究竟是哪里出了如此严重的差错？</p>
<p>刚步入青春期时，卢娜·黄（Luna Wong）最喜欢做的事情之一，就是漫步到香港家附近的一座桥上静坐片刻，聆听桥下的车流与水声，眺望城市的万家灯火与喧嚣生机。她对这个世界有着独特的观察方式，并通过摄影将其呈现。她的照片多为风景，定格的是香港寻常街角，但她总能在同一处场景中发掘出他人未曾见过的画面。她是一个充满好奇心、喜欢逗人发笑的孩子，对周遭世界抱有浓厚兴趣。然而在2019年，13岁的她遭遇了香港的社会政治动荡，紧接着又是新冠疫情封控，她的世界随之骤缩至一间卧室的大小。在很长一段时间里，卢娜几乎没有迈出过家门半步。学校变成了屏幕，朋友只能在虚拟世界中相见。她的睡眠开始出现严重障碍，惊恐发作频繁发生，并被确诊患有抑郁症和焦虑症。</p>
<p>疫情后世界重新开放，但卢娜的心境已发生剧变，无法轻松重返现实生活。她常常因极度焦虑而无法正常上学，学业严重落后。她的精神科医生为她开具了抗抑郁药、抗焦虑药和安眠药。后来，处方中又加入了针对注意缺陷多动障碍（ADHD）的药物以及一种抗精神病药物。这种高强度的处方药组合让她在白天昏昏欲睡——尽管夜晚依然常常彻夜难眠——并导致体重增加，令她痛苦不堪。但卢娜依然保留着好奇的天性。为了更好地理解自己的问题，她阅读心理学相关书籍，网购教材自学人类的心智机理。当朋友遇到困难时，她会提供建议，并梦想着未来能成为一名心理学家。然而，在她连正常上学都倍感艰难的情况下，这个梦想看似遥不可及。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-26 13:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/2026/sep/26/luna-wong-hong-kong-death-reveals-treatment-international-students-uk" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

::::