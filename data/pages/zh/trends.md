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
<div id="story--into-branches-on-risc-v-d8bcf9ea385821dc" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2262" data-content-paragraphs="46" data-published-at="2026-10-09T19:31:17.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 03:31</span>
</div>

### [无分支代码中的分支指令](https://00f.net/2026/10/09/llvm-compiles-branch-free-code-into-branches-on-risc-v/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Branches in branch-free code</div>

<div class="article-body" data-article-body="true"><p>这是一个将两个无符号 128 位整数相加的完整 C 语言函数：</p>
<p>现在让我们将其针对 32 位 RISC-V 进行编译：</p>
<p>你可以在 Compiler Explorer 上查看输出，同时还可以对比使用 GCC 以及使用后文将讨论的 Zicond 扩展编译的版本。</p>
<p>以下是相关的代码片段：</p>
<p>等等，为什么加法运算中会出现 beq 指令？那可是条件分支，对吧？</p>
<p>编译后的代码正是这样执行加法运算的；a0 和 b0 是我们输入的最低 32 位字；a1 和 b1 是接下来的两个字。所有值均为无符号数，low32() 仅保留最低 32 位，比较操作则返回 0 或 1。</p>
<p>你能猜到为什么要检查 sum1 == b1 吗？</p>
<p>x86 和 AArch64 等 CPU 拥有执行条件移动（cmov）的指令，这使得进位传播可以在没有分支的情况下实现。</p>
<p>但是在 RV32 上，即使使用 &lt; 比较两个 64 位整数，也会生成一个分支。</p>
<p>我们一直在讨论大整数中的进位传播，但如果你写过恒定时间（constant-time）代码，你可能到处都用过类似这种写法的某个版本：</p>
<p>如果 bit 的最低位被置位，mask 就会全为 1，因此该表达式会保留 a 并将 b 置零。否则，mask 为零，我们得到 b。</p>
<p>全都是位运算，源代码中没有任何分支。</p>
<p>让我们用 clang 23 为 RV32 编译这段代码：</p>
<p>啊啊啊啊啊啊，一条 beqz 指令，在我们刚刚掩码处理过的 bit 上进行了分支跳转。精心编写的位运算条件选择全都白费了。</p>
<p>而且这种情况在 64 位 RISC-V 上也会发生。</p>
<p>你可以在 Compiler Explorer 上查看编译后的代码，其中包含了这两个目标架构，以及用于对比的 clang 17、GCC 和 Zicond。</p>
<p>为什么要把 clang 17 也包含进来？因为分支在 clang 15 中存在，在 16 和 17 中消失了，然后从 18 到 23 又回来了。好玩吧？</p>
<p>所以，即使你针对某个特定版本的编译器审查了汇编代码，且一切看起来都没问题，编译器版本或编译器标志的每一次变动都需要重新进行审查。</p>
<p>让我们尝试用 Zig 编写 128 位加法，以及相同的位掩码选择：</p>
<p>在第二个字之后出现了相同的 beq，并且选择操作也得到了相同的 beqz（Compiler Explorer 代码）。</p>
<p>更换源语言并不能让我们摆脱这个问题。是的，Rust 也有同样的问题。</p>
<p>现在让我们针对其他几个目标架构编译这些 C 语言示例。</p>
<p>我还添加了一个 64 位的 a &lt; b 比较，因为这足以在 RV32 上生成分支。</p>
<p>以下是在 -O2 优化级别下，clang 23 生成的条件分支和条件返回指令的数量。</p>
<p>和往常一样，所有内容都可以在 Compiler Explorer 上验证：</p>
<p>数值为零的目标架构是安全的。其余所有目标架构尽管源代码看起来是以恒定时间运行的，却都存在糟糕的侧信道漏洞。</p>
<p>WebAssembly 拥有一条 select (cmov) 指令，因此在模块中看不到明显的条件跳转，但 WebAssembly 编译器随后可以做任何它们想做的事。在没有等效原生指令的平台上，很可能会生成跳转。</p>
<p>Cortex-M0 (Thumb-1) 和通用的 32 位 PowerPC 没有类似 cmov 的指令，因此它们会产生分支。</p>
<p>现在有一个令人惊喜的发现：GCC 16.1 在 RISC-V 上编译这两个示例时都没有生成分支。它的进位使用了 sltu，并且对掩码运算未作干预。</p>
<p>很酷。但让我们做一点小改动：从比较操作中派生出掩码。</p>
<p>然后……分支又回来了！</p>
<p>GCC 现在在 RV32 和 RV64 上都生成了 bgeu（Compiler Explorer）。它在 RV32 上对 64 位比较也会产生分支。</p>
<p>针对位掩码示例，有一个通用的解决办法：在使用 mask 之前将其传入一个空的 asm 语句中。让我们试一下：</p>
<p>该内联汇编什么也没做，但它的声明告诉编译器它可能会修改 mask。</p>
<p>现在，这两个版本在 RV32 和 RV64 上编译时都没有产生分支了。呼，总算松了口气。</p>
<p>我们能对加法运算做同样的处理吗？</p>
<p>这两种尝试都在 Compiler Explorer 上。</p>
<p>老实说，我不会依赖任何一种内存屏障实验来作为加法的修复方案。</p>
<p>目前，clang 23 让我手写的进位链保持无分支状态，但谁知道在接下来的发布版本中会发生什么呢。</p>
<p>不过，对于 RISC-V 来说有一个解决方案：RISC-V 拥有一个名为 Zicond 的扩展。</p>
<p>让我们使用 -march=rv32imac_zicond 启用它，并再次编译我们的位掩码示例：</p>
<p>太棒了，没有跳转。在启用 Zicond 的情况下，上面测试的所有情况都没有分支。</p>
<p>Zicond 是 RVA23 配置文件的一部分，但不幸的是，当今使用的许多核心都没有实现它，尤其是微控制器。</p>
<p>而且即使它可用，也有一个很容易被忽视的重要细节：Zicond 规范仅在同时实现了 Zkt 扩展的情况下，才保证它们的执行时间与数据无关。</p>
<p>编写安全、可移植的代码非常困难。防范侧信道就像安全清空机密数据一样容易让人掉坑搬起石头砸自己的脚。</p>
<p>哦，如果你还没有读过的话，Thomas Pornin 的《为什么需要恒定时间密码学？》以及《恒定时间乘法》页面绝对值得一读。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>在 RV32 上编译无分支的 128 位无符号整数加法及比较时，Clang 编译器生成了条件分支指令（如 beq/beqz）。</li>
    <li>x86 和 AArch64 具备条件移动（cmov）指令，可无需分支实现进位传递。</li>
    <li>来源叙事重点：揭示在 RISC-V 架构下即使源码编写为无分支逻辑，现代编译器（如 Clang、GCC）仍会将其优化并生成条件分支指令，从而引发旁路攻击隐患；同时探讨内联汇编屏障与 Zicond/Zkt 扩展等应对方案的局限性</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://00f.net/2026/10/09/llvm-compiles-branch-free-code-into-branches-on-risc-v/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-g-vectorized-clz-and-ctz-a12b3630fb71b650" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1868" data-content-paragraphs="16" data-published-at="2026-10-09T17:45:44.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 01:45</span>
</div>

### [向量化 CLZ 与 CTZ](https://purplesyringa.moe/blog/vectorized-clz-and-ctz/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Vectorized CLZ and CTZ</div>

<div class="article-body" data-article-body="true"><p>clz 和 ctz 是用于计算固定大小整数中前导（或尾随）零位数量的指令。现代 CPU 原生支持它们，尽管它们并不总是很快，例如在 Arrow Lake 架构上，tzcnt 的延迟为 3 个周期。</p>
<p>我在正在开发的一个 FPU 模拟器中使用了 ctz，但后来摸索出如何通过浮点运算技巧来避开它，并且我刚刚意识到，这种方法可以通过某种曲折的方式泛化为可向量化的 ctz 替代实现（polyfill）。为了完整起见，我也顺便实现了 clz。</p>
<p>我们先从这两者中较简单的 clz 开始：</p>
<p>其核心思路如下：<br />浮点数的阶码（指数）实际上是其数值带有偏移量（bias）的对数。通过将一个 32 位数字 x 替换代入某个数值 2^k 的尾数中，我们得到一个表示 2^k(1 + 2^(-52)x) 的双精度浮点数（double）。接着我们将其作为一个 double 减去 2^k，从而得到 2^(k-52)x。提取其指数部分可以得到 k - 52 + 31 - clz(x)，由此便可通过一次按位减法计算出 clz。基于此，可以选择合适的 k，使得 clz 在 x = 0 时也能表现正确。</p>
<p>我们需要 64 位的 double 来处理 32 位的输入；遗憾的是，这意味着该技巧无法用于任意 64 位输入，最高只能支持到 52 位。</p>
<p>假设输入和输出存储在 u64x4 中，该逻辑编译为：</p>
<p>在我的 Haswell 处理器上，此实现的运行速度为 0.45 纳秒/迭代，而标量版本为 1 纳秒。在受延迟制约（latency-bound）的情况下，两者的耗时分别上升到 2 纳秒与 1 纳秒（但如果你在向量化 ctz 上受到延迟限制，你大概是在某些做法上走偏了）。</p>
<p>Ian Qvist 在 Alder Lake 架构上测试了该实现（在此表示感谢！），得到了 0.29 纳秒/迭代的结果，相比之下标量版本为 0.85 纳秒；而在受延迟制约时为 1.3 纳秒对 0.85 纳秒。在更现代的 Intel CPU 上，这些数据应该持平或更好。</p>
<p>AMD 的 CPU 让 lzcnt 变得极其廉价，以至于标量版本很可能会胜出。不过要记住，Zen 架构 CPU 支持 AVX-512，其中包含 vplzcntd 指令，因此这也是一个可选方案。</p>
<p>我们从 x ⊕ (x - 1) 开始以隔离最低的置位（set bit）。ctz 等于该数值的对数，我们通过按位加上 2^k 并作为 double 减去 2^k 来确定该对数，接着检查指数部分；只要 k 选择得当，该指数便包含无偏移的 ctz。我们预先将 2^32 混入尾数，并使用 x + 2^32 - 1 替代 x - 1，以正确处理 x = 0 的情况；同时预先将 1 混入尾数，以确保奇数 x 产生 a = 0 而非运行缓慢的次正规数（subnormal）。（你能想象我花了多少时间来排布这一切吗？）</p>
<p>该函数编译为：</p>
<p>在 Haswell 上，此实现的运行耗时为 0.49 纳秒/迭代，受延迟制约时为 2.3 纳秒。在 Alder Lake 上，耗时为 0.35 纳秒/迭代，受延迟制约时为 1.3 纳秒。与 clz 相比出现的性能下降是由于多使用了一条指令所致。如果存在 AVX-512，可以通过使用 vpternlogq 来消除该额外开销，但到了那个阶段，你还不如直接在 (x - 1) &amp; !x 上运行 vpopcntd。标量版本的表现与 clz 没有差异。</p>
<p>Nikolay Malkovsky 指出，德布鲁因序列（de Bruijn sequences）提供了另一种可向量化的方案。经过一些测试，我得出了以下代码：</p>
<p>我们无法使用真正的 32 字节查找表（LUT），因为 vpshufb 指令无法跨越 16 字节泳道（lanes）。我转而采用的方法解释起来比较复杂，但本质上我们使用了重复两次的 16 位德布鲁因序列来计算 ctz 的第 0 到 3 位，然后根据哪一半全为零来加上 16 或 32。0xf0a6f0a7 是能使该方案奏效的仅有的四个魔数之一。</p>
<p>这在 Haswell 上耗时 1 纳秒（在 Alder Lake 上为 0.7 纳秒），但吞吐量翻倍，因此如果它有助于避免洗牌操作（shuffling），可能会比基于浮点数的方法稍快一些。</p>
<p>如果你不需要处理 x = 0 的情况（或者希望 ctz(0) 结果为 0 而不是 32），使用相应的优化可以将时间进一步降低至 0.82 纳秒。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-10 01:45 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://purplesyringa.moe/blog/vectorized-clz-and-ctz/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-o-substitute-for-the-nhs-47c6f8b679d438f6" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="384" data-content-paragraphs="3" data-published-at="2026-10-09T16:13:09.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 00:13</span>
</div>

### [保险模式无法替代英国国家医疗服务体系（NHS） | 读者来信](https://www.theguardian.com/business/2026/oct/09/insurance-model-is-no-substitute-for-the-nhs)
<div class="original-title-sub"><span class="orig-tag">原文</span> Insurance model is no substitute for the NHS | Letter</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/7dc17cd3be2c706b0700401a34312114fd03aa58/546_0_6250_5000/master/6250.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=d93869542f4e747c95d517f1e8caad0f" alt="保险模式无法替代英国国家医疗服务体系（NHS） | 读者来信" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>苏珊·琼斯（Susan Jones）指出，NHS模式的医疗体系既不需要销售成本，也不需要股东利润。</p>
<p>在《跨越分歧共进晚餐》（Dining across the divide，10月4日刊）中，年轻的参与者特德（Ted）被引述称其“希望废除NHS，并以社会保险模式取而代之。该模式仍将在需要时提供免费治疗，但人们将通过保险系统缴费，并可以选择自己的保障水平。这些模式能为患者带来好得多的治疗效果。”</p>
<p>作为一名退休的保险核保人，我必须对特德的主张表示强烈反对。让我们把焦点放在商业基本面上。保险通常有两种“类型”：第一种是随着时间推移发生概率越来越高的事件——例如人寿保险。你的年龄越大，死亡的可能性就越高，覆盖该风险所需的保费也就越多；第二种是随着时间推移发生概率基本保持不变的事件——例如房屋保险。房屋被烧毁的可能性对每个人来说大致相同，费用由保单持有人平均分摊。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-10-10 00:13 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/business/2026/oct/09/insurance-model-is-no-substitute-for-the-nhs" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-blog-primes-6ab67a38776ef880" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="6486" data-content-paragraphs="8" data-published-at="2026-10-09T14:30:28.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-09 22:30</span>
</div>

### [四大定理证明器漫谈，或：关于 Isabelle/HOL、Lean、HOL4 和 Agda 的（相对）主观对比](https://blueberrywren.dev/blog/primes/)
<div class="original-title-sub"><span class="orig-tag">原文</span> A tale of four theorem provers, or: A (reasonably) opinionated comparison of Isabelle/HOL, Lean, HOL4, and Agda</div>

<div class="article-body" data-article-body="true"><p>在这篇文章中，我将对比 Lean、Isabelle/HOL、Agda 和 HOL4，且只保留些许对“公平性”的顾及。<br />以上四者皆为定理证明应用程序；也就是说，它们的目标是将数学进行计算机形式化。宽泛地讲，Lean 和 Agda 都是基于依赖类型的系统，利用柯里-霍华德同构（Curry-Howard correspondence）通过复杂的类型系统来证明定理；而 Isabelle/HOL 和 HOL4 则属于 LCF 风格的系统，带有一个包含基础规则（例如 forall x, x = x）的小型“证明内核”，所有证明都必须经由该内核构建。两种理论根基各有优劣，后文将探讨其中一部分。<br />我在全部四个系统中都形式化证明了素数的无限性；即命题“对于任意数字 n，都存在一个大于 n 的素数”。形式化实现的具体证明是欧几里得的“常规”构造法，如果你需要，可以在维基百科上找到它；参见此处。<br />所有这些证明在结构上看起来都很相似（大部分如此，我们稍后会细说），因此拉开差距的是用户体验。为保持透明度，在本次实验之前，我对 Isabelle/HOL 和 Agda 最为熟悉，而 HOL4 和 Lean 则在某种程度上是为了撰写本文而在评测期间学习的。<br />接下来的内容包含一堆个人观点和些许带有随意性的分类标准。请不要指望这是一篇客观中立的评测。如果你只想看证明对比，可以直接跳到“证明对比（Proof Comparisons）”部分；如果你只想要更多主观评价，请阅读下文，然后跳到“随意排名（Arbitrary Rankings）”。先从个人观点开始。<br />我绝不声称以下任何一个证明是完美的！老实说，它们可能相当平庸。<br />我们可以按照几个维度来为这些定理证明器分类。我们有前面提到的：<br />推理方式：Isabelle/HOL 和 Lean 都会在输入时提供“实时更新”，并且它们的结构化证明支持使用“向下箭头”键逐步浏览，以查看中间步骤。相比之下，完成的 HOL4 和 Agda 证明都是作为完全组装好的项（terms）存在的，若想检查其内部细节，必须手动将其拆解。当然，HOL4 和 Agda 都能随时向你展示当前状态和相关信息。<br />Isabelle/HOL 拥有 sledgehammer 工具，它会调用大量外部证明生成方法（SAT/SMT 求解器、各种一阶逻辑求解器等）。对于任何看似可行但令人烦琐的目标，sledgehammer 都有很大概率能将其解决——这很好，因为它省去了你的工作，但它生成的证明也晦涩难懂，这可能不那么理想。HOL4 也有一个名为 HolyHammer 的等价物，但我写完这篇博客后才意识到它的存在。好吧，随它去吧。Isabelle/HOL 和 HOL4 都对许多自动化化简和证明方法提供了极佳支持，例如在尝试处理复杂的假设时，这些方法非常顺手。如果不借由化简步骤将所有内容逐一拆解，可能根本看不出下一步该如何进行。<br />Lean 拥有不错的自动化能力，但尚未达到 Isabelle/HOL 或 HOL4 的水平。它的 simp 工具远没有那么高效，尽管 grind 是一种非常精巧的做法、有时能与 sledgehammer 媲美，但很多时候由于一些我无法理解的原因而相当无用。sledgehammer 和 grind 都是非全即无的策略；如果它们无法彻底解决目标，就不会产生任何进展。这与 simp（三者均有）或更专用的工具如 auto（Isabelle/HOL）或 gvs（HOL4）截然不同，后者可以取得部分进展，并（在理想情况下）将上下文留在更好的状态。Lean 缺乏同样出色的部分自动化功能，这有点可惜，因为根据我的经验，部分自动化反而是实际中更重要的东西。值得注意的是，Lean 和 Isabelle/HOL 都有一个 try 工具（在 Isabelle/HOL 中，带/不带 sledgehammer 分别为 try/try0；在 Lean 中为 try?/exact?/rw?），它们会尝试使用各种自动化方法和直接求解来“碰碰运气”。据我所知，HOL4 没有类似的工具，这很遗憾，因为该功能非常实用。<br />Agda 基本上没有任何自动化功能。你唯一能得到的化简，是基于函数输入可计算得出的内容。坦白讲，这感觉挺糟糕的。想把事情办成相当困难，因为必须考虑太多繁琐的手动调整。我个人并不喜欢这种方式。<br />Isabelle/HOL 和 HOL4 在基础上都极其偏向经典逻辑，这意味着它们接受排中律（∀ P. ¬P ∨ P），并且两者都将希尔伯特的 epsilon 算子公理化，这也引出了选择公理。这似乎对自动化求解器产生了非常积极的影响，因为求解器往往依赖诸如双重否定消除律（¬¬P --&gt; P）之类的法则，而它等价于排中律。Lean 在理论上是构造性的（因此默认没有排中律），但部分“优秀”的证明自动化工具需要排中律，而且在经典逻辑下使用 Lean 似乎已成为常态，因此我也采用了这种做法。例如 grind 就直接假设你在使用经典逻辑。这确实带来了一个缺点，即 Lean 在处理诸如存在量词等内容时表现得不那么好。<br />Agda 默认是构造性的，而且在 Agda 圈子里保持证明的构造性似乎是常态，所以我也照做了。这样做的一大好处是，在证明了存在无穷多个素数之后，我实际上可以生成它们！我可以给我的证明输入一个数字，它就会输出一个大于该数字的素数。缺点是这样做的速度慢得可怕：<br />如果你看过上面的证明结构，这可能就讲得通了；我们考虑的是 (n + 1)! + 1，因此在证明内部，它在针对约 360,000 左右的数字进行素性检查；这必然会有点慢。需要指出的是，这种构造法本就不是为了速度而设计的，但它也是最自然的构造法。放弃排中律和良好的证明自动化是否值得？由你来决定。<br />我个人更偏爱 LCF 风格，因为它似乎更容易实现自动化，而且我看不出随身携带证明项有什么意义（经典逻辑太有用了！）。如果你强烈反对我的看法，可以发邮件至 contact AT blueberrywren.dev 与我联系，如果我觉得你的论据足够充分，我会将其发布在这里。<br />Lean 和 Isabelle/HOL 均支持交互式交互操作。Lean 虽然支持其他编辑器的模式，但极力推荐使用 VSCode；而 Isabelle/HOL 拥有自己的专属编辑器（jEdit），它在实际使用中也近乎强制要求使用该编辑器。这没问题；我理解它们为何这么做，因为交互式开发很难做到完全通用。它们两者的实现效果都不错。<br />HOL4 是通过 Emacs 模式或 Vim 模式进行交互的，配合快捷键可以将文本复制进/出正在运行的 HOL4 REPL 中。听起来很古怪，因为确实如此，但它的运行效果出奇地好。我本身就是 Emacs 用户，所以对我而言并没有什么改变。<br />Agda 同样是通过 Emacs 模式进行交互，但所有操作都在你的文件内进行；你可以使用快捷键刷新状态、添加证明目标等。它的体验也还可以。<br />如前所述，Lean/Isabelle/HOL 方案的优势在于可以看到进行中的证明步骤，而在 Agda 中你无法做到这一点。</p>
<p>Isabelle/HOL 和 HOL4 都具备极为优秀的定理检索机制；前者拥有编辑器面板结合 find_theorems，后者则有 DB.find/DB.match。它们支持按名称和按模式检索定理，例如我可以检索形如 _ divides n j ==&gt; divides n (k - j) 的引理，因为这在部分定理证明器中还算有些意思。在接下来的所有内容中，mult/sub 引理本质上表述的都是 a * (b - c) = a * b - a * c。<br />证明搜索过程 metis 完成了大部分工作。<br />我们进行一些解包操作，然后将 q1 - q2 确定为另一个项（使得 n * (q1 - q2) = k - j）。接着用 grind 配合相应的引理即可完成证明。<br />与 Isabelle/HOL 类似，当提供合适的引理时，metis_tac 就能将其搞定。<br />非常相似。divides-refl 是 divides _ refl 的缩写，而且与 Lean 一样，我们必须手动指出 q₁ ∸ q₂。<br />让我觉得很有意思的是，Lean 的证明在某种程度上居然如此繁琐。尽管 Lean 拥有相当不错的自动化能力，我花在上面的精力却比其他任何一个系统都要多！寻找合适的引理稍微更加痛苦一些，不过说句公道话，当时我还在对语法感到困惑。<br />接下来我们需要定义数字列表的乘积，形式如下：<br />simp 和 grind 标记旨在为自动化证明方法提供帮助，它们确实起到了作用！<br />在 HOL4 中定义事物有点意思，因为你实际上是在把函数体作为一个证明来定义！该定义会产出一个名为 prod_list_def 的定理，字面形式就是<br />在 Agda 的证明中，我们还做了大量工作来搭建后续将成为素性判定过程的基础设施。这是因为稍后我们希望询问“这是素数吗？”，而在没有排中律（LEM）来表明“它要么是素数要么不是素数”的情况下，我们需要编写一个算法来为我们做出判定。<br />回到正题，我们需要证明围绕列表乘积函数展开的几个引理。其中一个比较有意思的如下所示，我们证明了该列表中的一个数必能整除该列表的乘积。<br />非常隐式；很难看清内部究竟发生了什么，但基本结构是在那里的。对列表进行归纳，做一些情形分析，应用关于 divides _ (_ * _) 的引理。<br />篇幅相当长。我们必须相当手动地对成员资格进行解构，这变得有点麻烦。不过，这依然是一个相当直接的证明。<br />同样不算太离谱，尽管没有注释的话很难看出确切的结构（我没写注释 :P）。这里正好指出一声：HOL4 的证明从字面意义上来说完全就是 SML 的项！仅此而已！组合子 &gt;&gt; 和 &gt;-（分别代表将后者应用于前者的所有子目标，以及应用于前者的一个子目标）就只是组合其他函数的中缀函数！一切都只是 SML！你通过 REPL 与 HOL4 交互，所以你是动态构建内容的，但之后你必须像拼图一样把你的函数拼接起来。一旦你明白了这一点，里面在发生什么就更显而易见了；我们进行归纳，处理第一种情形，然后在 MEM x (h ∷ xs) 上的化简会给出两个目标（分别是 x = h 和 x ≠ h, MEM x xs）。<br />非常显式，但也相当简明。在列表成员资格上进行模式匹配非常直观，因为 Emacs 中的 Agda 模式包含一个命令 C-c C-c，可以对基本上所有内容自动进行情形分类（case split）。<br />尽管在 Isabelle/HOL 和 HOL4 中要隐式得多（这是个常见的主题），但所有这四个证明都采取了同样的形式：询问我们关心的值究竟是在列表头部还是在后面的某个位置，而这决定了我们在整除性中填入的内容。<br />在 Agda 中，我们还将“合数”的含义定义为一个“正向”定义，而不仅仅是“非素数”；这使得处理起来容易得多。<br />下一个“有趣”的证明是证明每个大于一的非素数都具有一个素因子。在 Agda 中这构成了合数定义的一部分，因此我们不必专门包含它。从现在开始我们的节奏会稍快一些，所以我就不逐个解释每个代码片段了。大家自行对比即可。<br />HOL4 版本中 0 1 k&#39; &lt; k 的那些步骤让我非常恼火，但我没想出如何将它们压缩精简（golf）。同样，Lean 证明中的这一行：<br />也让我感到痛苦。<br />我们现在快要完成了！还剩下最后两步：证明在给定的数字集合（列表）之外总是存在一个素数，并利用这一点展示最终的命题陈述。首先是前者：<br />Agda 的证明略有不同，以适应稍后缺乏数值区间（ranges）的情况。<br />在篇幅方面，Isabelle/HOL 的证明在这里明显胜出，但里面到底发生了什么也确实非常不清晰。其余系统的证明都逐渐变得更加冗长，尤其是这里的 HOL4 证明，嵌套得有点难看。metis_tac[]（一阶求解器）承担了大量的繁重工作，grind 也是如此。如果你好奇为什么 Isabelle/HOL 和 HOL4 都有名为 metis/metis_tac 的东西，那是因为它是从 HOL4 移植到 Isabelle/HOL 的。<br />我们来到了最终的命题陈述！Agda 需要更多的摆弄调整，因为它不像另外两个系统那样内置了区间支持，但我们使用上面的引理构建了列表 [2..n]，然后证明存在一个在该列表之外的素数（因此它必然大于 n）。<br />让我不爽的是我没能把它写得更短，不过算了吧。<br />我们做到了！欧几里得会感到欣慰的。（大概吧）<br />现在是发表更多观点的时间了！<br />我将依据五个维度进行评价：<br />这里其实没什么好多说的。sledgehammer 是一项巨大的恩赐，Isabelle/HOL 和 HOL4 的定理发现工具都非常出色。Lean 紧随其后且相距不远，try? 经常能给出不错的相关引理作为求解手段，而 Agda 显然垫底。在网上翻阅浏览 .agda 文件来寻找引理实在是太烦人了。</p>
<p>不管你喜欢还是讨厌，Agda 完全由原始证明项构成的特性意味着事物本质上完全符合你的设定。绝不会出现让你抓狂并抱怨“该死，为什么化简器只展开这个而不展开那个！”的时刻。Lean 在这方面表现相当不错，因为它在决定操作哪些内容时相当保守，而且所有内容都被显式命名。HOL4 的学习曲线相当合理，用户需要学会使用像 qpat_assum 这样可以根据模式（例如 ¬_）进行定位的工具，不过一旦你搞明白了，体验还不错。Isabelle/HOL 在这方面确实算不上出色；通常很难让它完全按照你的意愿行事。</p>
<p>学习 HOL4 和 Lean 的过程让我很享受，但 HOL4 略胜一筹，因为它的交互模式非常独特，而且功能依然极其强大。Lean 很有趣，尽管有时令人烦躁；而 Isabelle/HOL 并没有特别吸引人，不过部分原因在于我已经对它很熟悉了。Agda 有时让人相当抓狂；编写一整套素数判定过程并在类型的琐碎细节上纠缠不休，过了一阵子就会变得非常恼人。</p>
<p>出于上述同样的原因，Agda“赢”了。不得不进行完全手动的证明搜索并频繁折腾，体验实在谈不上愉快。HOL4 和 Lean 都有各自令人烦恼的地方，我认为将两者强行分出高下是不公平的：HOL4 在假设操作/化简（sim）方面的学习曲线相当陡峭，而 Lean 的自动化工具又过于挑剔，有时确实体验很糟。至于 Isabelle/HOL，我只是用习惯了，因此可能带有一定的偏见。</p>
<p>原因同上；很多时候 HOL4 会让我目瞪口呆，发出“啊？？？？”的疑问，因为某个定理策略（tactic）没有达到我的预期，或者以一种不可预测的方式转换了目标。Lean 也有类似的问题，它会莫名其妙地决定“呃，其实我不会用 grind 帮你解决这个非常简单的目标，请你自己搞定吧”，其方式让我百思不得其解。说真的，有时候 grind 比 sledgehammer 还要聪明，但有时候它又比 simp 还要笨拙。真是古怪。Isabelle/HOL 偶尔也会有类似情况，但总体上还好，而 Agda 则完全是可以预测的。</p>
<p>HOL4！我学得很开心，它真是一个非常有趣的系统。我并不是不喜欢 Lean，但我猜其中发生的一大堆稀奇古怪的事让我对它略有提防。Isabelle/HOL 依然是我最擅长的系统（我写它多多少少能拿到报酬，所以这也有帮助），而 Agda 嘛，它就是 Agda。</p>
<p>你该尝试哪一个呢？嗯，全部都试一遍吧，不过我建议你至少尝试一些新东西。如果你以前只用过依赖类型定理证明器，不妨试试 Isabelle/HOL 或 HOL4，反之亦然。如果你只用过像 Lean 那样完全交互式工作的定理证明器，去试试 HOL4 或 Agda 吧！全新的体验正是人生的乐趣所在。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-09 22:30 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blueberrywren.dev/blog/primes/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-re-coding-agents-so-dumb-2856f86a7db806ab" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3893" data-content-paragraphs="16" data-published-at="2026-10-09T14:22:04.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-09 22:22</span>
</div>

### [为什么编程智能体如此笨拙？](https://mtlynch.io/why-are-coding-agents-so-dumb/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Why Are Coding Agents So Dumb?</div>

<div class="article-body" data-article-body="true"><p>第一次使用编程智能体（coding agent）时，我完全被吸引住了。在使用智能体之前，我总是在自己的集成开发环境（IDE）与 AI 聊天界面之间来回复制粘贴。看到一个智能体能够直接编辑文件，并实时自行修复自身错误，那种体验令人惊叹。<br />几天之后，随着频繁遭遇各种程序漏洞，这种新鲜感逐渐消失。智能体经常会彻底停止响应，直到我将其重启。开发工作流给人一种令人窒息的原始感，而且智能体常常在工作才刚刚开始时就宣布任务已经完成。<br />那是 2025 年 2 月，对于编程智能体而言尚处于早期阶段。我当时以为，再过六个月，智能体在技术上的惊艳程度就会赶上其底层的顶尖大语言模型（LLMs）。<br />然而相反的是，编程智能体依然表现得很糟糕。<br />AI 辅助开发显然取得了长足进步，但底层模型承担了大部分繁重的工作，而智能体本身却依然是瓶颈所在。<br />在围绕 AI 的所有炒作中，术语往往被曲解了。人们开始过度使用并混淆“模型（model）”与“智能体（agent）”等概念。<br />当我说“模型”时，我指的是像 GPT Astra、Claude Sonnet 和 GLM-5.3 这样的大语言模型（LLMs）。模型负责生成文本和图像，包括相当不错的软件代码。<br />当我说“智能体”时，我指的是将模型与代码库及计算机系统连接起来的软件。这类工具包括 Anthropic 的 Claude Code 或 OpenAI 的 Codex。<br />做一个简单的类比：模型是大脑，而智能体则是身体。模型输出文本流，而智能体则充当粘合剂，将文本转化为系统上正确的命令和文件操作。<br />我对编程智能体最大的不满在于它们在管理任务方面的表现极其糟糕。<br />例如，我有一个开源的 Web 应用，用于生成文件上传的分享链接。最近我为该功能添加了支持密码保护链接的功能。这是一项相对简单的改动，总共包含约 1500 行新代码。OpenCode 尽职尽责地将该功能拆解为 10 个子任务，但随后它却……逐个依次执行了这些子任务：<br />你为什么要一个接一个地执行这些明显高度并行的任务？<br />呃……你可是一台计算机啊！你非常擅长多任务处理。这就是为什么我们不断为你配备那么多 CPU 核心的原因。你可以并行处理多个事务，而且上下文切换的速度比人类快数百万倍。你为什么要逐个执行这些显然可以高度并行的任务？<br />Claude Code 虽然具备多任务处理能力，但也仅仅是一点点而已。它会启动一两个子智能体，但仍然会等待所有子任务全部完成后才继续进行。每天多次，我都会看到 Claude Code 在那里无所事事地干等好几分钟，等待我的端到端测试完成；只有在测试通过之后，它才会说：“嗯，现在我应该开始起草提交信息（commit message）了。让我查看一下 git 历史记录，了解你的提交信息规范。”<br />当我使用一个前沿模型，而它需要检查 5 万行代码以查找某种特定模式时，智能体从不会停下来并说：“等等，这件事情换另一个模型来做会更便宜、更快速。”它只会用那个缓慢而昂贵的模型一路硬推。反过来，智能体也绝不会说：“这个模型对这项任务来说太笨了。让我换一个更聪明的模型上场。”<br />当然，我完全可以主动进行微观管理，不断切换模型和思考级别，以匹配每个子任务的难度，但为什么这成了我的工作？你是不是还需要我替你管理线程池？你还指望我替你释放未使用的内存吗？<br />你知道什么技术非常适合为任务评定难度级别，然后将这些需求与模型进行匹配吗？大语言模型本身！只需让大语言模型为该任务挑选最便宜、最快速的模型即可。为什么非得让我像保姆一样照料你？<br />我经常会遇到 95% 都是苦力活的任务，但我仍然不得不将它们分配给最聪明的模型，因为替智能体拆解任务并进行分派会耗费我太多时间。<br />感谢你告诉我哪个是默认模型，Claude。<br />智能体对自身一无所知。如果我问 Claude 如何使用 Claude 的功能，它必须上网搜索才能弄清楚这个叫“Claude”的东西究竟是什么。Claude 回答关于 C 语言编程的问题，远比谈论它自己要自如得多（公平地说，大多数人类开发者也是如此）。<br />呃……你可是 Claude Code 呀！你竟然对自己的各项功能一无所知？而且你只是不管版本号是否相符就在 Google 上随手搜索说明？对于用户从未用过的功能，你可以若无其事地下載 13 GB 的文件，但你的安装包里却连 50 KB 的 gzip 压缩文本都省不出来用于向自己解释自身功能吗？<br />试想一下，如果你向队友请求代码审查（code review），而他们却开始疯狂在 Google 上搜索，想弄清楚代码审查是否是开发者该做的事情。然后当你第二天再次请他们审查代码时，他们完全不记得之前的对话，又跑回 Google 焦虑地输入：“软件工程师会做代码审查吗？”<br />我曾经非常喜欢智能体界面中将“规划（Plan）”与“执行（Execute）”模式分开的交互设计。对于复杂的任务，我会让智能体制定一个计划，然后由我进行审查、提出修改建议，并将执行工作委托给一个更快、更便宜的智能体。<br />随着时间的推移，我对阅读这些计划产生了厌烦情绪。我经常会跳过审查步骤，直接让智能体着手实现。<br />我起初以为是编程智能体让我变懒了，但我后来意识到，其实是因为智能体传达计划的方式实在太糟糕，以至于读起来令人痛苦不堪。<br />这里有一个例子，展示了我要求 Codex + GPT-6 Astra 为我的媒体日记 Web 应用添加功能的过程：<br />你不能仅仅列出一堆零散的细节就把它叫做计划，Codex。<br />那根本不是计划！那只是一堆底层设计决策的杂乱拼凑。<br />如果我让一名合格的开发者来规划这项功能，他们要么会从用户界面的顶层改动计划入手并自顶向下细化，要么会描述对数据模型的改动并自底向上构建。如果开发者只是开始罗列关于该功能的随机事实，我会认为他们只是在头脑风暴，稍后再来查看。<br />几天前的一个晚上，我在睡前通过编程智能体启动了一项耗时很长的任务。第二天早上回来时，我发现智能体竟然完全还没开始工作。在我离开两分钟后，它停下来询问我该给 git 分支起什么名字，然后整夜都在那儿干等我的回答。<br />如果一个人类员工告诉我，他们整个班次都无所事事，仅仅是因为他们想就某个微不足道的细节征求我的意见，我很快就会解雇他们。<br />当我开始使用我的第一个编程智能体时，我寻找了用于控制智能体被允许访问系统上哪些文件的设置。毫无疑问，总该有某种文件系统权限控制或类似于受限 chroot 的保护机制，来防止一个随机且不可预测的软件不受拘束地探索我的整台计算机，对吧？<br />事实并非如此。官方文档鼓励我给大语言模型写一封客气的信，恳请它不要读取某些文件或目录。我照做了，结果智能体立即无视了我的请求，将私有应用程序密钥泄露给了 OpenAI 和 Anthropic。</p>
<p>我原以为安全边界会是编码智能体最先实现的功能之一，但直到今天，只有当你向智能体开放全部访问权限时，它们才算得上堪用。智能体经常会绕过其自身供应商的沙盒。另一种替代方案则是整天坐在电脑前点击500次“允许”，而这甚至算不上可靠的防护，因为你迟早会不小心误点。</p>
<p>令人极其抓狂的是，我们拥有能够限制编码智能体犯错波及范围的沙盒工具已经超过十年了。我自己搭建了一套沙盒，使智能体无法探索代码仓库目录之外的文件系统。我完全不必担心智能体会意外泄露我的主目录数据，或者抹除我机器上的关键文件，因为它们根本没有执行这些操作的权限。</p>
<p>我知道有些读者会说，只要我从某些随机的 Git 仓库中安装20万行技能文件，或者在配置文件中设置某个生僻的功能标记，就能解决我所有的问题。</p>
<p>但我谈论的是我对编码智能体开箱即用体验的期望，即无需我安装乱七八糟的插件或技能文件，也无需花费数小时调整配置。</p>
<p>我认为这些基础功能在2026年应当是编码智能体的准入门槛。</p>
<p>既然提到了畅想，这里还有一些我希望看到的额外功能，不过我也承认其中一些可能过度迎合了我个人的工作流程。</p>
<p>好吧，回到标题中的问题，我并没有一个令人满意的答案。</p>
<p>我最合理的假设是：对编码智能体投入不足是委托-代理问题的一个典型体现。主导 AI 工具方向的是 Anthropic、OpenAI 和 Google 等公司的高管。这些高管脱离了每天使用编码智能体的基层开发者。而且这些高管中有许多人正梦想着一个能够将人类开发者彻底自动化淘汰的未来。</p>
<p>AI 公司的高管及其最大的客户和股东，所关注的是对他们而言直观可读的指标，例如炫酷的演示 Demo 和基准测试得分。安全性和人类开发者时间的高效利用与 Demo 无关，而且在我见过的基准测试中，几乎没有哪个是用来衡量智能体本身的；它们衡量的仅仅是底层模型。</p>
<p>我的假设并不完全站得住脚，因为 AI 公司显然至少对编码智能体还是有一定程度关心的。我看到每个月都有大量新功能被添加到 Claude 和 Codex 中，尽管我已经记不起上一次有哪个功能改善了我的生活体验。</p>
<p>我只尝试过 Claude、Codex、OpenCode、Cline 和 Pi。我平时将 OpenCode 和 Claude Code 作为日常主力工具。如果你有推荐的编码智能体，欢迎在下方留言。</p>
<p>AI 公司们——如果你们想以500亿美元收购我假想中的编码智能体，请联系我。我随时准备着立即 Fork VS Code。</p>
<p>发售首周享七折优惠，截至2026年10月11日。</p>
<p>我写了一本介绍简易技巧的书，旨在帮助开发者提高写作水平。</p>
<p>我的书将教会你如何：</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-09 22:22 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://mtlynch.io/why-are-coding-agents-so-dumb/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ishwasher-is-not-a-robot-087a092c84f12b54" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2165" data-content-paragraphs="11" data-published-at="2026-10-09T14:14:17.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-09 22:14</span>
</div>

### [“机器人”是一种社会建构：为什么你的洗碗机不是机器人](https://robotgirlgang.com/2026/10/08/robot-is-a-social-construct-why-your-dishwasher-is-not-a-robot/)
<div class="original-title-sub"><span class="orig-tag">原文</span> &quot;Robot&quot; Is A Social Construct: Why Your Dishwasher Is Not A Robot</div>

<div class="article-body" data-article-body="true"><p>要想让机器人专家陷入思维陷阱（nerd snipe），最有效的方法就是给他们抛出一个极具争议的“机器人”定义。当我曾在一个工业安全标准制定委员会任职时，我们曾度过了难忘且整整两天的时光，试图对“机器人”给出一个足够宽泛的定义，以确保该标准能够适用于工业自动化中工业机械臂的所有合理预见用途；同时又必须足够狭隘，以确保我们不会意外地将新研发类型的工业机器人强行套入会对其产生错误约束的标准中。老实说，那真是无比愉快的两天。我热爱这种事，我可以一整天都在细节上咬文嚼字。</p>
<p>所以毫无疑问，我尊敬的同事蒂娜（Tina）决定向我扔来一枚手榴弹——她断言洗碗机就是一种机器人。</p>
<p>要向她“女性说教”（womansplain）她到底错得有多离谱，我有两种方式。其一是与她在同一层面交锋，就技术定义展开辩论。我对她的解释的主要技术异议在于，我不同意她对洗碗机“操作（manipulation）”能力的描述。喷水臂和洗涤剂释放机构就仅仅是机构而已——它们并不处理或搬运物体，而“操作”的核心在于对物体的搬运处置。洗碗机绝对是自动化系统，而且越来越智能（尽管我很鄙视生产我家洗碗机的厂商，他们宣称它是“完全自主”的，仅仅是因为它在完成洗涤后会自动弹开一条缝让内部冷却）。但它们不是机器人。它们根本达不到蒂娜所引用的技术定义要求。</p>
<p>但我更倾向于另一种做法，那就是告诉蒂娜她错了，因为机器人实际上并非由其技术来定义的，因此从技术角度争论毫无意义。“机器人”这个词，以及我们选择如何使用它，完全是一种社会建构。</p>
<p>“机器人（Robot）”这个词是科幻小说的发明——具体而言，出自卡雷尔·恰佩克（Karel Čapek）于1920年创作的戏剧《罗素姆万能机器人》（Rossum’s Universal Robots）。在此后数十年中，机器人一直是科幻小说不断探索的主题，直到第一个被称为机器人的东西成为可以购买的商品。早在该词被创造之前，未被称为机器人的自动化机器就已经存在，并且至今仍然存在。这是因为“机器人”实际上并不是技术功能的描述词，它是用来描述一种能让我们产生某种特定情感体验的自动化机器。</p>
<p>正是因为这个词及其概念是通过科幻小说发明和发展起来的，才会出现这种情况。科幻小说花费了大量时间，将外星人、机器人和人工智能的概念作为一面镜子，用以审视我们自身作为人类的存在。这正是为什么斯波克（Spock）、Data、紧急医疗全息程序（The Doctor）以及九之七（Seven of Nine）在《星际迷航》中都是如此引人注目的角色——它们作为叙事构件而存在，用以叩问“成为人类意味着什么？”这一命题。</p>
<p>这就是为什么我们选择将“机器人”这个词应用于某些自动化机器，而不是另一些。我们将这个词赋予那些感觉很新奇、有一点可怕，并让我们软绵绵的生物大脑对这项技术可能给我们带来什么影响而感到略微怪异的技术。我们可能会担忧这项技术拥有的某种特定能力对我们的工作、我们与他人的关系，或者我们的专业领域与才能意味着什么。外观像人类或看似模仿人类意识某些方面的技术，可能会让我们对自己所持有的关于生命如何被创造的宗教信仰产生质疑。我们与具有人类外貌和声音的事物的互动，可能会让我们产生令人不安的思考，反思我们（作为个人或作为社会）是如何对待其他人类的。或者我们可能会意识到，公众热衷于讨论拥有一种外表像人、声音像人、具备人类的一切能力，但没有任何权利、不需要上厕所休息、也不会为了其劳动而获得报酬的事物有多么棒——如果你对奴隶制历史如何影响现代美国的诸多层面稍作思考，就会发现这种公共舆论实际上令人非常反感。</p>
<p>我们从被称为“机器人”的事物随着时间的推移而改变和演变的方式中看到了这一点，这种改变与技术的创新程度以及我们自认为在多大程度上理解其潜在社会影响密切相关。在科幻小说之外，“机器人”曾经指代的就是装配线上使用的机械臂。当我在2007年左右参加RoboBusiness大会时，我记得大会资料明确指出它“不”面向工业机械臂，因为他们不再认为那是机器人了。与此同时，Roomba扫地机器人当时代表着尖端技术，每个人都为轮式移动机器人感到兴奋。十年后，工业机械臂又被允许回归，因为具备功率和受力限制的协作机器人以及安装在机械臂上的先进视觉系统开拓了全新的应用和能力，人们才刚刚开始设想这些也可以被自动化。如今，许多人很乐意对Roomba和割草机器人付之一笑，认为它们“基本上就是个玩具”，而人形机器人则（有失公允地）让每个人对其就业前景（或面对某些人的机器人大军时的安全）感到极度恐慌。所有这些事物都符合蒂娜所使用的ISO机器人定义，但作为一种文化，我们已经转向将新事物称为“机器人”，并开始给其他旧事物降级，因为我们不再对它们感到惊叹（或者说：害怕）了。</p>
<p>简而言之，当一台机器让我们不得不去直面关于自身的令人不安的真相时，它才是一台机器人。</p>
<p>而我的洗碗机，并没有迫使我审视自己存在的意义。</p>
<p>（作者简介：迈克尔是一名资深的机器人技术极客，喜欢把自己的极客执念变成大家的谈资。她喜欢坚持己见、在事情上保持正确，并在喝了几杯波旁威士忌后为一些无关紧要的话题激烈争论。在机器人之外，她喜欢烹饪，痴迷于小众电视剧和电影，并抚养着两个对机器人毫无兴趣的孩子。）</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-09 22:14 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://robotgirlgang.com/2026/10/08/robot-is-a-social-construct-why-your-dishwasher-is-not-a-robot/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--considered-harmful-html-ffb57efff1e172f0" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="4860" data-content-paragraphs="31" data-published-at="2026-10-09T13:33:23.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-09 21:33</span>
</div>

### [自旋锁有害论（2020）](https://matklad.github.io/2020/01/02/spinlocks-considered-harmful.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Spinlocks Considered Harmful (2020)</div>

<div class="article-body" data-article-body="true"><p>在这篇文章中，我将针对一个我自己实际经验相对较少的话题表达强烈的观点，因此欢迎大家在评论中吐槽和指教（链接见文末）:-)</p>
<p>具体而言，我将讨论：</p>
<p>我维护着 once_cell crate，这是一个同步原语。它在底层使用了 std 的阻塞机制（具体来说是 std::thread::park），因此无法与 #[no_std] 兼容。一个常见需求是添加基于自旋锁（spin-lock）的实现，以便在 #[no_std] 环境中使用：#61。</p>
<p>从更广泛的角度来看，这似乎是 Rust 生态系统中的一种普遍模式：</p>
<p>例如，lazy_static crate 就是这么做的：<br />github.com/rust-lang-nursery/lazy-static.rs/blob/master/src/core_lazy.rs</p>
<p>我认为这是一种反模式（anti-pattern），我撰写这篇博文正是为了指责这一做法。</p>
<p>自旋锁（Spinlock）是互斥锁最简单的一种实现，其一般形式如下：</p>
<p>为什么我们需要 Ordering::Acquire 和 Ordering::Release 是个非常有趣的问题，但这超出了本文的讨论范围。</p>
<p>这里的关键结论是：自旋锁完全是在用户空间实现的——在操作系统看来，“自旋”的线程与正在进行繁重计算的线程毫无二致。</p>
<p>而基于操作系统的互斥锁，例如 std::sync::Mutex 或 parking_lot::Mutex，则使用系统调用来通知操作系统某个线程需要被阻塞。用伪代码表示，其实现可能类似于这样：</p>
<p>主要区别在于 park_this_thread——这是一个阻塞性的系统调用。它指示操作系统将当前线程从 CPU 上调度下来，直到它被某个 unpark_some_thread 调用唤醒。内核会维护一个等待互斥锁的线程队列。park 调用将当前线程加入该队列，而 unpark 则将某个线程移出队列。当线程出队时，park 系统调用才会返回。与此同时，该线程脱离 CPU 处于等待状态。</p>
<p>如果存在多个不同的互斥锁，内核需要维护多个队列。锁的地址可以作为标识特定队列的令牌（这就是 futex API）。</p>
<p>系统调用的开销很大，因此生产环境中的 Mutex 实现通常会在调用操作系统之前先自旋几次，乐观地希望该 Mutex 会很快被释放。然而，等待过程最终总是会退化为系统调用。</p>
<p>因为自旋锁如此简单且快速，在极短的临界区中使用它们似乎是个好主意。例如，如果你只需要递增几个整数，真的有必要费心去进行复杂的系统调用吗？在最坏的情况下，另一个线程也只需自旋几次……</p>
<p>不幸的是，这种逻辑存在缺陷！线程可以在任何时候被抢占，包括在极短的临界区执行期间。如果它被抢占，这意味着所有其他线程都必须持续自旋，直到原本的线程再次获取到 CPU 时间片。而且，因为一个自旋的线程在操作系统看来就像是一个良好、忙碌的线程，其他线程将会一直自旋直到耗尽它们的时间片，从而阻止那个倒霉的线程重新回到处理器上运行！</p>
<p>如果这听起来像是一连串不幸的事件，别担心，情况还会变得更糟。接下来是优先级反转（Priority Inversion）。假设我们的线程具有优先级，并且操作系统倾向于优先调度高优先级线程而非低优先级线程。</p>
<p>现在，如果进入临界区的是一个低优先级线程，而竞争该锁的线程具有高优先级，会发生什么？它很可能会被抢占：毕竟存在更高优先级的线程。而且，如果核心数量少于尝试获取该互斥锁的高优先级线程数量，它很可能根本无法完成临界区的操作：操作系统将反复调度所有其他线程！</p>
<p>“但是等等！”——你可能会说——“我们只在 #[no_std] 的 crate 中使用自旋锁，所以根本没有操作系统来抢占我们的线程。”</p>
<p>首先，事实并非如此：在普通的用户空间应用程序中使用 #[no_std] crate 是完全可行的，甚至常常是令人期望的做法。例如，如果你编写了一个替代诸如 zlib 或 openssl 等底层 C 库的 Rust 库，你很可能会将该 crate 标记为 #[no_std]，这样非 Rust 应用程序就可以在不引入整个 Rust 运行时的情况下链接到它。</p>
<p>其次，如果真的完全没有操作系统可言，而你是在裸机（bare metal）上（或在内核中）运行，情况会比优先级反转还要糟糕。</p>
<p>在裸机上，我们通常不担心线程抢占，但我们需要担心处理器中断。也就是说，当处理器正在执行某些代码时，它可能会收到来自某些外设的中断，并临时切换到中断处理程序的代码。</p>
<p>灾难就此降临：如果主代码在中断到来时恰好处于临界区中间，并且中断处理程序也尝试进入该临界区，我们必将遭遇死锁！这里没有操作系统在时间片耗尽后切换线程。以下是讨论该问题的 Linux 内核文档。</p>
<p>让我们来触发一次优先级反转！我们的受害者是 getrandom crate。我并不是针对 getrandom：这种模式在整个生态系统中普遍存在。</p>
<p>该 crate 在 LazyUsize 实用工具类型中使用了自旋：</p>
<p>有一个 LazyUsize 的静态实例，它缓存了 /dev/random 的文件描述符：<br />https://github.com/rust-random/getrandom/blob/v0.1.13/src/use_file.rs#L26</p>
<p>该描述符在调用 getrandom 时使用——这是该 crate 导出的唯一函数。</p>
<p>为了触发优先级反转，我们将创建 1 + N 个线程，每个线程都将调用 getrandom::getrandom。我们进行安排，使第一个线程具有低优先级，其余线程具有高优先级。我们让线程稍作错开，以便由第一个线程执行初始化。我们还让创建文件描述符的过程变慢，以便让第一个线程在临界区内被抢占。</p>
<p>这实际上是 getrandom 的一个典型场景！在系统重启后收集熵（entropy）的过程中，获取第一批随机字节可能会阻塞很长时间。去年我甚至遇到过一个有趣的 Bug：我的桌面环境必须在按下某个按键后才会启动。由于某种原因它一直在等待熵，而按键操作恰好提供了熵。</p>
<p>这个方案的实现代码在此：https://github.com/matklad/spin-of-death。</p>
<p>它利用了几个系统编程小技巧来轻松复现这一灾难场景。为了模拟缓慢的 /dev/random，我们希望拦截 getrandom 用于确保有足够熵的 poll 系统调用。我们可以使用 strace 来记录程序发出的系统调用。我不知道 strace 是否能用来使系统调用变慢（不过刚才我看了看网站，发现它实际上确实可以用来篡改系统调用，唉），但我们其实根本不需要它！getrandom 并没有直接使用系统调用，它使用的是来自 libc 的 poll 函数。我们可以通过 LD_PRELOAD 来替换该函数，但还有一种更简单的方法！我们可以欺骗静态链接器，让它使用我们自己定义的函数：</p>
<p>该函数的名称碰巧（:)）与一个著名的 POSIX 函数重名。<br />然而，单凭这点还不够。getrandom 首先会尝试使用 getrandom 系统调用，而该代码路径并不使用自旋锁。我们需要诱导 getrandom 相信该系统调用不可用。如果 getrandom 直接使用 syscall 指令，我们的 extern &quot;C&quot; 技巧就起不了作用。不过，由于稳定版 Rust 无法使用内联汇编（手动发起系统调用所必需），getrandom 是通过 libc 的 syscall 函数进行的。对此我们可以用同样的技巧进行覆盖。<br />然而，这里出现了一个小插曲！传统上，libc API 使用 errno 进行错误报告。也就是说，在失败时函数会返回一个特定的无效值，并将线程局部变量 errno 设置为具体的错误代码。syscall 便遵循这种模式。<br />errno 接口用起来很繁琐。errno 最糟糕的地方在于规范要求它必须是一个宏，因此你只能在 C 源代码中真正使用它。在 Linux 内部，该宏调用 __get_errno_location 函数来获取线程局部变量，但这是一个实现细节（在这个肆无忌惮的底层系统黑客世界里，我们很乐意利用这一点！）。具有讽刺意味的是，Linux syscall 的 ABI 本身就直接返回错误码，因此 libc 必须做一些额外工作来适配这个笨拙的 errno 接口。<br />因此，下面这个函数绝对是我迄今为止写过的最“邪门”（cursed）函数的有力竞争者：<br />它让 getrandom 误以为不存在 getrandom 系统调用，从而导致其回退到 /dev/random 的实现。<br />为了设置线程优先级，我们使用 thread_priority crate，它是对 pthread API 的一层薄封装。我们将使用实时优先级，这需要 sudo 权限。<br />以下是结果：<br />请注意，两分钟后我不得不强制终止程序。还要注意那惊人的系统时间（system time）以及平均负载（load average）。<br />如果我们给 getrandom 打补丁，改用 std::sync::Once，就会得到好得多的结果：<br />这是因为 Once 使用操作系统提供的阻塞机制，因此操作系统能够注意到高优先级线程实际上处于阻塞状态，从而让低优先级线程有机会完成其工作。<br />首先，如果你仅仅是因为“对于较小的临界区它更快”而使用自旋锁，直接换成 std 或 parking_lot 里的互斥锁（mutex）即可。它们在调用进入内核之前本身就会进行少量的自旋迭代，因此在最佳情况下它们和自旋锁一样快，而在最差情况下则要快上无数倍。<br />其次，自旋锁最具问题的使用场景似乎大多数来自一次性初始化（这恰好也是我的 once_cell crate 所解决的问题）。我认为通常是可以做到不使用自旋锁的。例如，库本身可以不存储状态，而是将状态存储委托给用户。对于 getrandom，它可以暴露两个函数：<br />这样，妥善缓存 RandomState 就变成了用户的问题。例如，std 可以继续使用线程局部变量（源码），而启用了 std 特性的 rand 则可以使用由 Once 保护的全局变量。<br />另一种选择是，如果状态可以装入一个 usize 且初始化函数是幂等且相对较快的，则可以进行竞态初始化（racy initialization）：<br />请花一秒钟体会一下上述示例中完全没有 unsafe 块和跨核通信的美妙！在最坏的情况下，init 会被调用的次数等于核心数（编者注：这是错误的，感谢 /u/pcpthm 指出！）。<br />还有一个终极手段（核选项）：通过阻塞行为对库进行参数化，允许用户提供自己的同步原语。<br />第三，有时你明确知道程序中只有一个线程，而你可能只想用自旋锁来消除编译器关于 static mut 的那些恼人报错。我认为这里的主要用例是 WASM。这种情况的解决方案是假定阻塞根本不会发生，否则直接 panic。这就是 std 在 WASM 上对 Mutex 所做的处理，也是 once_cell 在这个 PR (#82) 中实现的方式。<br />在 /r/rust 上的讨论。<br />编者注：如果你喜欢这篇文章，可能也会喜欢这篇：<br />https://probablydance.com/2019/12/30/measuring-mutexes-spinlocks-and-how-bad-the-linux-scheduler-really-is/<br />看来我们这里发生了一些争用！<br />编者注：现在有一篇后续文章，我们在其中对自旋锁进行了实际基准测试：<br />https://matklad.github.io/2020/01/04/mutexes-are-faster-than-spinlocks.html</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-09 21:33 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://matklad.github.io/2020/01/02/spinlocks-considered-harmful.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-tsd-viewers-pete-hegseth-775f450d9af24523" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="281" data-content-paragraphs="1" data-published-at="2026-10-09T13:26:54.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-09 21:26</span>
</div>

### [精神病学专家称直播死刑或致观众患创伤后应激障碍](https://www.theguardian.com/us-news/2026/oct/09/execution-live-stream-ford-hood-killer-ptsd-viewers-pete-hegseth)
<div class="original-title-sub"><span class="orig-tag">原文</span> Execution live stream could cause PTSD in viewers, say psychiatrists</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/114ef51e1edc28337a2ba2085ff6b349b4bec1c3/511_0_4163_3330/master/4163.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=23252a25ed7c272277088b23f9ed50d6" alt="精神病学专家称直播死刑或致观众患创伤后应激障碍" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>在皮特·海格塞斯宣布胡德堡枪击案凶手的行刑队枪决将公开后，专家发出此项警告<br />• 美国政治 – 最新动态<br />心理健康专家表示，对死刑进行网络直播可能会导致观看的公众患上创伤后应激障碍（PTSD）。此前，美国证实了计划通过行刑队枪决并公开播出一名枪杀13名手无寸铁军人的死囚的行刑过程。<br />美国国防部长皮特·海格塞斯（Pete Hegseth）周四表示，2009年在胡德堡（Fort Hood）杀害13人的前陆军精神科医生尼达尔·哈桑（Nidal Hasan）将于12月3日被行刑队枪决。官员随后证实行刑过程将进行网络直播。据信，这将是美国近一个世纪以来的首次公开处决。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-10-09 21:26 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/us-news/2026/oct/09/execution-live-stream-ford-hood-killer-ptsd-viewers-pete-hegseth" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

::::