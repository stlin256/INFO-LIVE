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
<div id="story-facebook-lifeguard-893778a9bdb37671" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3105" data-content-paragraphs="1" data-published-at="2026-10-09T21:44:50.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 05:44</span>
</div>

### [Lifeguard：用于检测 Python 惰性导入兼容性的静态分析器](https://github.com/Facebook/lifeguard)
<div class="original-title-sub"><span class="orig-tag">原文</span> Lifeguard: A static analyzer for Python lazy imports compatibility</div>

<div class="article-body" data-article-body="true"><p>Lifeguard 是一个静态分析器，旨在检测惰性导入（Lazy Imports）的不兼容性，并降低在 Python 中采用惰性导入的落地成本。<br />这是一款快速的静态分析工具，旨在帮助在 Python 中落地惰性导入。<br />在 Python 中，每条 import 语句在模块加载时都会立即执行。无论该导入是否实际被使用，都会产生这一开销。PEP 810 为 Python 引入了显式惰性导入（Lazy Imports），它会将模块的实际加载推迟到首次访问所导入名称时。惰性导入能够显著减少内存占用、缩短启动时间并降低导入开销，尤其是在具有深层依赖关系树的大型代码库中。<br />然而，某些 Python 编程模式依赖于立即执行导入。例如：<br />改造现有代码库以采用惰性导入可能是一项艰巨的任务，特别是在大规模代码库中。Lifeguard 能够识别这些不兼容的模式，以便你可以放心采用惰性导入。<br />Lifeguard 会并行分析给定项目的 Python 源文件。它遍历每个模块的抽象语法树（AST）以检测副作用，并将与惰性导入不兼容的副作用映射为错误。该分析器采用保守的分析策略：任何无法通过程序确认为可以安全惰性导入的模块，默认都会被标记为不安全。这意味着 Lifeguard 宁可将潜在兼容的模块标记为不兼容，宁可牺牲潜在的性能优化空间以确保生产环境的安全性。<br />有关分析流程和架构的更深入介绍，请参阅 docs/architecture.md。<br />Lifeguard 目前正在积极开发中。我们的目标是在 Python 3.15 正式发布前做好通用支持的准备。<br />Lifeguard 已发布在 PyPI 上，并为 Linux、macOS 和 Windows（x86-64 及 ARM64）提供了预编译 wheel 包。它需要 Python 3.12 或更新版本，且无需 Rust 工具链：<br />python -m lifeguard_lazy_imports 等同于 lifeguard 命令。下文中的 cargo run -- 示例是从源码构建并运行该工具；若使用已安装的安装包，请将 cargo run -- 替换为 lifeguard。PyPI 版本是手动发布的，可能会落后于主分支（main branch）。运行 lifeguard --help 可查看你所安装版本支持的功能。<br />如果你在克隆仓库时未添加 --recurse-submodules 参数，请运行 git submodule update --init --recursive。<br />尝试 Lifeguard 最快捷的方式是使用 run-tree 子命令，它会发现目录下的 .py 文件并追踪可解析的顶层导入。输入根目录下的文件和目录名称必须是 ASCII Python 标识符；其他路径将被跳过。<br />例如，使用随附的示例项目：<br />有关完整的演练说明（包括如何解读输出），请参阅 GETTING_STARTED.md。<br />对于需要更多控制权的大型项目，你可以生成一个源码数据库（source DB）——这是一个向 Lifeguard 提供项目中完整 Python 文件集及其模块路径的 JSON 文件（详见“输入格式”）。请按照以下步骤操作：<br />或者，如果你的项目包含库依赖项，你可以通过在 pyproject.toml 中添加 lifeguard 部分，将 Lifeguard 指向你的 site-packages：<br />你可以通过 python -m site 找到你的 site-packages 路径。gen-source-db 和 run-tree 都会从 &lt;INPUT_DIR&gt;/pyproject.toml 读取该配置节。相对 site_packages 路径会基于 INPUT_DIR 进行解析。你可以使用 --site-packages /path/to/site-packages 覆盖该设置。<br />注意：发现机制仅追踪顶层 import 语句，可能无法发现所有依赖项，例如嵌套在函数中的导入或输入树外部的条件代码块导入。如果 Lifeguard 报告缺失模块，你可能需要手动向生成的源码数据库中添加条目。对于显式惰性语法，请为源码发现和分析同时传入 --python-version 3.15 参数。<br />详细输出示例：<br />在某些模式下，Lifeguard 需要源码数据库——一个将 Python 模块路径映射到其磁盘位置的 JSON 文件。其格式为：<br />你可以使用 cargo run -- gen-source-db 自动生成该文件（参见“运行 Lifeguard”），或手动创建。<br />Lifeguard 会写入一个包含两个字段的 JSON 文件：<br />加上 --verbose-output 参数后，JSON 还会包含 IMPLICIT_IMPORTS（模块到依赖项的映射）和 IMPORT_CYCLES（各个循环中的模块列表）。使用 --sorted-output 可对这些字段进行确定性排序。<br />一个字典，将可安全进行惰性导入的模块映射到必须立即加载（急切导入，eagerly imported）的依赖项列表中。例如：<br />重要提示：未作为键出现在此字典中的模块，已被分析确认为对惰性导入不安全。<br />一个模块集合，其中模块内的所有导入都必须急切加载。对于这些模块，惰性导入实际上被临时禁用了。请注意两者的区别：其他模块仍可以惰性导入属于 LOAD_IMPORTS_EAGERLY 集合的模块，但当该模块自身加载时，其自身的 import 语句必须立即执行，而不能被推迟。<br />该集合仅用于特定的边缘场景：<br />欲了解更多详情，请参阅 docs/load_imports_eagerly.md。<br />Lifeguard 可以作为独立的代码检查工具（linter）使用，用于识别代码库中具体哪些行与惰性导入不兼容。使用 --verbose-output 运行分析器可获取人类可读的报告，其中会显示包含行号的每个模块的错误（参见“运行 Lifeguard”）。这使你可以将 Lifeguard 当作 linter 使用：在 CI 或本地运行它，审查标记的行，并进行修复。通过这种方式，Lifeguard 可作为安全启用惰性导入的指导工具。<br />该 JSON 输出旨在驱动惰性导入加载器的过滤器函数。在 Python 3.15 中，sys.set_lazy_imports_filter() 会安装一个回调函数，用于控制哪些导入被推迟、哪些导入被急切加载。Lifeguard 的输出提供了构建该过滤器所需的数据——使用 LAZY_ELIGIBLE 识别安全模块及其约束条件，使用 LOAD_IMPORTS_EAGERLY 识别需要预先解析所有导入的模块。<br />我们计划在 Python 3.15 发布前提供便于接入 Lifeguard 输出的工具。这项工作正在进行中。<br />Lifeguard 使用 Rust 实现。我们利用 ruff 进行 AST 遍历，并复用了来自 pyrefly 的多个 crate。我们还对 .pyi 存根文件进行了扩展，以标注第三方库中已知的副作用——例如，标记依赖项中某个模块级函数调用具有可观测的行为。这些存根存储在 resources/ 文件夹中。有关副作用标注如何与标准类型存根协同工作的详细信息，请参阅 resources/stubs/stubs.md。<br />通过为 Lifeguard 贡献代码，即表示你同意你的贡献将依照该源码树根目录下的 LICENSE 文件获得许可。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>Lifeguard 是一个用于检测 Python 惰性导入（Lazy Imports）不兼容性并降低采用开销的静态分析工具。</li>
    <li>PEP 810 向 Python 引入了显式惰性导入（explicit Lazy Imports），可将模块的实际加载延迟至首次访问导入名称时。</li>
    <li>来源叙事重点：介绍 Meta (Facebook) 开源的 Rust 静态分析工具 Lifeguard，强调其通过保守的 AST 副作用分析，帮助大型 Python 代码库安全平滑迁移并适配 PEP 810 惰性导入（Lazy Imports），以配合 Python 3.15 特性降低启动与内存开销。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://github.com/Facebook/lifeguard" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--into-branches-on-risc-v-d8bcf9ea385821dc" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2255" data-content-paragraphs="46" data-published-at="2026-10-09T19:31:17.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 03:31</span>
</div>

### [无分支代码中的分支指令](https://00f.net/2026/10/09/llvm-compiles-branch-free-code-into-branches-on-risc-v/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Branches in branch-free code</div>

<div class="article-body" data-article-body="true"><p>这里有一个将两个无符号 128 位整数相加的完整 C 语言函数：</p>
<p>现在让我们将其针对 32 位 RISC-V 进行编译：</p>
<p>你可以在 Compiler Explorer 上查看输出，同时还可以看到用 GCC 编译的版本以及稍后我们将探讨的启用了 Zicond 扩展的版本。</p>
<p>以下是相关的代码片段：</p>
<p>等等，加法运算中为什么会出现一条 beq 指令？那可是条件分支指令，对吧？</p>
<p>这就是编译后的代码执行加法的方式；a0 和 b0 是我们输入的最低 32 位字；a1 和 b1 是接下来的部分。所有值都是无符号的，low32() 仅保留最低 32 位，比较操作返回 0 或 1。</p>
<p>你能猜到为什么要检查 sum1 == b1 吗？</p>
<p>像 x86 和 AArch64 这样的 CPU 拥有执行条件传送（cmov）的指令，允许在不使用分支的情况下实现进位传递。</p>
<p>但在 RV32 上，即使只是用 &lt; 比较两个 64 位整数，也会生成一个分支。</p>
<p>我们一直在讨论大整数中的进位传递，但如果你写过常数时间（constant-time）代码，你可能在各个地方都用过类似下面这种实现：</p>
<p>如果 bit 的最低位被置位，mask 将全为 1，因此该表达式会保留 a 并将 b 清零。否则，mask 为零，我们将得到 b。</p>
<p>这全都是位运算，源代码中没有分支。</p>
<p>让我们用 clang 23 针对 RV32 编译这段代码：</p>
<p>啊啊啊啊啊啊，一条 beqz 指令，正在根据我们刚刚掩码过的位进行分支跳转。精心用位运算编写选择逻辑的努力全都白费了。</p>
<p>而且这种情况在 64 位 RISC-V 上同样会发生。</p>
<p>你可以在 Compiler Explorer 上查看编译后的代码，其中包含了这两个目标架构，以及用于对比的 clang 17、GCC 和 Zicond。</p>
<p>为什么包含 clang 17？因为分支在版本 15 中存在，在 16 和 17 中消失了，然后从 18 到 23 又回来了。有意思吧？</p>
<p>因此，即使你在某个特定的编译器版本下审查了汇编代码且一切看起来都没问题，编译器版本或编译器标志的每一次变动都需要重新进行审查。</p>
<p>让我们尝试用 Zig 编写 128 位加法，以及同样的位掩码选择：</p>
<p>第二个字之后出现了相同的 beq，并且选择逻辑也生成了相同的 beqz（Compiler Explorer 代码）。</p>
<p>更换源语言并不能让我们摆脱这个问题。是的，Rust 也存在同样的问题。</p>
<p>现在让我们针对其他几个目标架构编译 C 语言示例。</p>
<p>我还添加了一个 64 位 a &lt; b 的比较，因为这足以在 RV32 上生成分支。</p>
<p>以下是 clang 23 在 -O2 优化级别下生成的条件分支和条件返回指令的数量。</p>
<p>像往常一样，所有内容都可以在 Compiler Explorer 上进行验证：</p>
<p>结果为零的目标架构是安全的。其他所有架构尽管源代码看起来是以常数时间运行，却都存在糟糕的侧信道漏洞。</p>
<p>WebAssembly 拥有一条 select (cmov) 指令，因此在模块中看不到明显的条件跳转，但随后 WebAssembly 编译器可以为所欲为。在没有等效原生指令的平台上，我们很可能会得到一个跳转。</p>
<p>Cortex-M0 (Thumb-1) 和通用 32 位 PowerPC 没有类似 cmov 的指令，因此它们会生成分支。</p>
<p>现在带来一个惊喜：GCC 16.1 在 RISC-V 上编译这两个示例时都没有生成分支。它的进位使用 sltu 指令，并且保留了掩码算术运算未被改动。</p>
<p>很酷。但是让我们做一个小小的改动：通过比较操作来推导掩码。</p>
<p>然后……分支又回来了！</p>
<p>GCC 现在在 RV32 和 RV64 上都会生成一条 bgeu 指令（Compiler Explorer）。它在 RV32 上的 64 位比较中也会生成分支。</p>
<p>对于位掩码示例，有一个常见的变通方法：在使用掩码之前将其传递给一个空的 asm 语句。让我们尝试一下：</p>
<p>该汇编代码什么都没做，但其声明告诉编译器它可能会修改 mask。</p>
<p>现在，这两个版本在 RV32 和 RV64 上的编译都没有产生分支。呼，松了一口气。</p>
<p>我们能对加法做同样的处理吗？</p>
<p>这两种尝试都可以在 Compiler Explorer 上找到。</p>
<p>坦率地说，我不会依赖任何一种内存屏障实验来作为加法的修复方案。</p>
<p>目前，clang 23 保持了我手写的进位链没有分支，但谁知道在接下来的发布版本中会发生什么呢。</p>
<p>不过，对于 RISC-V 来说有一个解决方案：RISC-V 有一个名为 Zicond 的扩展。</p>
<p>让我们通过 -march=rv32imac_zicond 启用它，并再次编译我们的位掩码示例：</p>
<p>太棒了，没有跳转。在启用 Zicond 的情况下，上面测试的每一个案例都没有分支。</p>
<p>Zicond 是 RVA23 规范的一部分，但不幸的是，如今使用的许多内核并没有实现它，尤其是微控制器。</p>
<p>而且即使它可用，也有一个很容易被忽视的重要细节：Zicond 规范仅在同时实现了 Zkt 扩展的情况下，才保证它们的执行时间与数据无关。</p>
<p>编写安全、可移植的代码非常困难。防范侧信道攻击就像清理秘密数据一样容易搬起石头砸自己的脚。</p>
<p>哦，如果你还没读过的话，Thomas Pornin 的《为什么需要常数时间密码学？》以及《常数时间乘法》页面绝对值得一读。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-10 03:31 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1724" data-content-paragraphs="18" data-published-at="2026-10-09T17:45:44.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 01:45</span>
</div>

### [向量化 CLZ 与 CTZ](https://purplesyringa.moe/blog/vectorized-clz-and-ctz/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Vectorized CLZ and CTZ</div>

<div class="article-body" data-article-body="true"><p>clz 和 ctz 是用于计算固定大小整数中前导（或末尾）零位数量的指令。现代 CPU 对其提供原生支持，但它们并不总是很快，例如 tzcnt 在 Arrow Lake 架构上的延迟为 3 个周期。</p>
<p>我在正在开发的一个 FPU 模拟器中使用了 ctz，后来找到了通过浮点数黑魔法来避开它的方法，并且刚刚意识到，这种方法以一种曲折的方式可以推广为可向量化的 ctz 垫片（polyfill）实现。为了完整性，我也实现了 clz。</p>
<p>我们先从两者中较容易的 clz 开始：</p>
<p>基本思路如下：</p>
<p>浮点数的阶码（指数）是其数值带有偏移量的对数。通过将一个 32 位数字 x 代入某个值 2^k 的尾数中，我们得到一个表示 2^k(1+2^-52 x) 的双精度浮点数（double）。然后我们可以将其作为一个双精度浮点数减去 2^k，得到 2^(k-52)x。提取其阶码即可得到 k-52+31-clz(x)，由此便可以通过按位减法计算出 clz。据此，可以选择合适的 k，使得 clz 在 x=0 时也能表现正确。</p>
<p>我们需要 64 位双精度浮点数来处理 32 位输入；遗憾的是，这意味着该技巧无法适用于任意 64 位输入，最高只能支持到 52 位。</p>
<p>假设输入和输出存储在 u64x4 中，它会编译为：</p>
<p>在我的 Haswell 机器上，每次迭代耗时 0.45 纳秒，而标量版本为 1 纳秒。在受延迟约束的情况下，数字上升到 2 纳秒对 1 纳秒（但如果你在向量化 ctz 上受限于延迟，那你大概率做错了什么）。</p>
<p>Ian Qvist 在 Alder Lake 上对其进行了测试（感谢！），得到的结果是每次迭代 0.29 纳秒（标量版本为 0.85 纳秒），在受延迟约束时为 1.3 纳秒对 0.85 纳秒。在现代 Intel CPU 上，数据应该相当或更好。</p>
<p>AMD CPU 使得 lzcnt 开销极低，因此标量版本可能会胜出。不过请记住，Zen CPU 支持包含 vplzcntd 指令的 AVX-512，因此这也是一个选择。</p>
<p>我们首先使用 x⊕(x−1) 隔离出最低的置 1 位。ctz 等于该值的对数，我们通过按位加上 2^k，然后作为双精度浮点数减去 2^k 来确定它，接着检查阶码——在精心挑选 k 的情况下，阶码中就包含无偏的 ctz。我们在尾数中预混入 2^32，并用 x+2^32−1 替代 x−1 以正确处理 x=0 的情况；同时在尾数中预混入 1，以确保奇数 x 产生 a=0 而非缓慢的次正规数（subnormal）。（你能想象我花了多少时间调配这些吗？）</p>
<p>该函数编译为：</p>
<p>在 Haswell 上，每次迭代耗时 0.49 纳秒，受延迟约束时为 2.3 纳秒。在 Alder Lake 上，每次迭代耗时 0.35 纳秒，受延迟约束时为 1.3 纳秒。与 clz 相比的速度下降是因为多用了一条指令。如果有 AVX-512 支持，可以通过使用 vpternlogq 来避免这一开销，不过到那个时候，你还不如直接对 (x - 1) &amp; !x 运行 vpopcntd。标量版本的表现与 clz 没有区别。</p>
<p>Nikolay Malkovsky 指出，德布鲁因序列（de Bruijn sequences）提供了另一种可向量化的方案。经过一些测试后，我得出了以下代码：</p>
<p>我们不能使用真正的 32 字节查找表（LUT），因为 vpshufb 指令无法跨越 16 字节通道（lane）。我采用的替代方法有点难以解释，但本质上我们使用重复两次的 16 位德布鲁因序列来计算 ctz 的第 0 到 3 位，然后根据哪一半为零加上 16 或 32。0xf0a6f0a7 是使该方法奏效的仅有的四个魔数常数之一。</p>
<p>在 Haswell 上这需要 1 纳秒（在 Alder Lake 上为 0.7 纳秒），但具有两倍的吞吐量，因此如果它有助于避免洗牌操作（shuffling），可能会比基于浮点数的方法稍快一些。</p>
<p>如果你不需要处理 x=0 的情况（或者希望 ctz(0) 为 0 而不是 32），使用</p>
<p>可以将时间降低到 0.82 纳秒。</p></div>

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
<div id="story-blog-primes-6ab67a38776ef880" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="6425" data-content-paragraphs="26" data-published-at="2026-10-09T14:30:28.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-09 22:30</span>
</div>

### [四款定理证明器的故事，或者：对 Isabelle/HOL、Lean、HOL4 和 Agda 的（相对）主观对比](https://blueberrywren.dev/blog/primes/)
<div class="original-title-sub"><span class="orig-tag">原文</span> A tale of four theorem provers, or: A (reasonably) opinionated comparison of Isabelle/HOL, Lean, HOL4, and Agda</div>

<div class="article-body" data-article-body="true"><p>在本文中，我将在对“公平性”稍作考量的前提下，对 Lean、Isabelle/HOL、Agda 和 HOL4 进行对比。</p>
<p>上述四者均为定理证明应用程序；也就是说，它们的目标是对数学进行计算机形式化。广义而言，Lean 和 Agda 都是基于依赖类型的系统，利用柯里-霍华德对应（Curry-Howard correspondence）通过复杂的类型系统来证明定理；而 Isabelle/HOL 和 HOL4 则是 LCF 风格的系统，拥有一个包含基本规则（例如 forall x, x = x）的小型“证明内核”，所有证明都必须通过该内核构建。这两种基础架构各有利弊，下文将对此展开讨论。</p>
<p>我在这四款工具中均形式化了素数无限性的证明；即这一命题：“对任意数 n，存在大于 n 的素数”。形式化实现的具体证明是欧几里得的“经典”构造法，如果你想了解，可以在维基百科上找到；参见此处。</p>
<p>所有证明在结构上大体相似（基本上是这样，我们稍后会讲到），因此带来差异的是用户体验。为了透明起见，在进行本次实验之前，我最熟悉的是 Isabelle/HOL 和 Agda，而 HOL4 和 Lean 则在某种程度上是在撰写本次评测的过程中学习的。</p>
<p>接下来是一系列主观观点和一些略显随意的分类标准。请不要指望这是一篇客观中立的评测。如果你只想看证明对比，请直接跳到“证明对比”（Proof Comparisons）；如果你只是想看更多观点，请阅读下文然后跳到“主观排名”（Arbitrary Rankings）。我们先从观点开始。</p>
<p>我并不声称以下任何一个证明是完美的！老实说，它们可能相当平庸。</p>
<p>我们可以从几个维度对这些定理证明器进行归类。我们有上述提到的：</p>
<p>推理机制：Isabelle/HOL 和 Lean 都会在用户输入时提供“实时更新”，其结构化证明可以通过按“向下箭头”键逐行浏览，以查看中间步骤。相比之下，完成后的 HOL4 和 Agda 证明都以完全组装好的项（terms）存在，如果你想检查其内部细节，必须手动将其拆解。当然，HOL4 和 Agda 都可以随时向你展示当前状态和相关信息。</p>
<p>Isabelle/HOL 拥有 sledgehammer，它可以调用许多外部证明生成方法（SAT/SMT 求解器、各种一阶逻辑求解器等）。对于任何看似可行但令人繁琐的目标，sledgehammer 都有很大几率能够解决它——这非常好，因为它节省了你的工作量，但它生成的证明也晦涩难懂，这可能并不理想。HOL4 也有一个名为 HolyHammer 的等价工具，但我直到写这篇文章后才意识到它的存在。好吧。Isabelle/HOL 和 HOL4 都对许多自动简化和证明方法提供了极好的支持，例如在尝试处理复杂假设时，这些方法非常有用。如果没有自动简化功能介入将所有内容切分规约，往往很难看出下一步该如何进行。</p>
<p>Lean 具有不错的自动化能力，但尚未达到 Isabelle/HOL 或 HOL4 的水平。它的 simp 效率远没有那么高，虽然 grind 是一种非常精妙的方法，有时可以与 sledgehammer 媲美，但出于某些我无法理解的原因，很多时候它完全派不上用场。sledgehammer 和 grind 都是全有或全无的；如果它们无法解决目标，就不会产生任何进展。这与（这三者中均有的）simp 或更专用的工具如 auto（Isabelle/HOL）或 gvs（HOL4）形成鲜明对比，后者可以取得一定进展，并将上下文留在（理想情况下）更好的状态。Lean 缺乏同样优秀的局部自动化功能，这有点可惜，因为根据我的经验，这实际上才是更重要的。值得注意的是，Lean 和 Isabelle/HOL 都提供了 try 功能（在 Isabelle/HOL 中，有包含/不包含 sledgehammer 的 try/try0；在 Lean 中，有 try?/exact?/rw?），它们会尝试使用各种自动化方法和直接求解来“碰碰运气”。据我所知，HOL4 没有类似的等价工具，这很遗憾，因为该功能相当实用。</p>
<p>Agda 基本上没有自动化功能。你所能获得的唯一简化就是基于函数输入所能计算出的结果。坦率地说，这有点糟糕。推进工作变得非常困难，因为必须考虑到大量的手动调整。我个人并不喜欢这种方式。</p>
<p>Isabelle/HOL 和 HOL4 在基础上都极其偏向经典逻辑，这意味着它们接受排中律（∀ P. ¬P ∨ P），并且两者都将希尔伯特的 epsilon 算子公理化，这也引出了选择公理。这似乎对自动化求解器产生了非常正面的影响，因为自动化求解器经常依赖诸如双重否定消除（¬¬P --&gt; P）之类的定律，而这等价于排中律。Lean 在理论上是构造性的（因此默认没有排中律），但其部分“优秀”的证明自动化需要排中律，而且在 Lean 社区中使用经典逻辑似乎是常态，所以我也是这么做的。例如，grind 就直接假设你使用了经典逻辑。这确实存在一个缺点，即 Lean 在处理例如存在量词等方面表现没那么好。</p>
<p>Agda 默认是构造性的，而且在 Agda 世界中，保持证明的构造性似乎是常态，因此我也是这么做的。这样做的一大优势是，在证明了存在无穷多个素数之后，我实际上可以生成它们！我可以给我的证明输入一个数字，它就会吐出一个大于该数字的素数。缺点是，这样做速度慢得可怕：</p>
<p>如果你看了上面的证明结构，这也许就说得通了；我们考虑的是 (n + 1)! + 1，因此在该证明内部，它正在对约 360,000 左右的数字检查素数性质；这显然会有点慢。需要指出的是，这种构造法本就不是为了追求速度，但它也是最自然的一种构造。放弃排中律和良好的证明自动化是否值得？由你来决定。</p>
<p>我个人更偏向 LCF，因为它似乎更易于实现自动化，而且我认为保留证明项没有什么意义（经典逻辑太有用了！）。如果你强烈反对这一点，请发邮件至 contact AT blueberrywren.dev 与我联系，如果我觉得你的论点足够有说服力，我会将其发布在这里。</p>
<p>Lean 和 Isabelle/HOL 均以交互式方式进行操作。Lean 支持其他编辑器的模式，但强烈推荐使用 VSCode；而 Isabelle/HOL 拥有自己的编辑器（jEdit），实际上也强制要求使用它。这没什么不好；我理解他们为什么这么做，因为交互式开发很难做到完全通用。它们两者的体验都很流畅。</p>
<p>HOL4 是通过 Emacs 模式或 Vim 模式进行交互的，利用快捷键允许用户在正在运行的 HOL4 REPL 之间复制文本。这听起来很古怪，因为事实确实如此，但它的运行效果出奇地好。我原本就是 Emacs 用户，所以对我来说并没有什么改变。</p>
<p>Agda 也是通过 Emacs 模式进行交互的，但所有操作都发生在你的文件内；你可以使用快捷键刷新状态、添加证明目标等。它的体验也还不错。</p>
<p>如上所述，Lean/Isabelle/HOL 方案的优势在于可以查看正在进行中的证明状态，而 Agda 则无法做到这一点。</p>
<p>Isabelle/HOL 和 HOL4 都拥有极为出色的定理搜索机制；前者是一个编辑器面板加上 find_theorems，后者则是 DB.find/DB.match。这些工具允许用户同时按名称和模式搜索定理，因此例如我可以搜索形式为 _ divides n j ==&gt; divides n (k - j) 的引理，因为这在某些定理证明器中颇有看点。在接下来的所有内容中，mult/sub 引理基本上表述为 a * (b - c) = a * b - a * c。<br />证明搜索过程 metis 完成了大部分工作。<br />我们进行一些展开拆解，然后确定 q1 - q2 为另一项（使得 n * (q1 - q2) = k - j）。接着用适当的引理调用 grind 就搞定了。<br />与 Isabelle/HOL 类似，在提供了合适的引理后，metis_tac 就能把它解决掉。<br />非常相似。divides-refl 是 divides _ refl 的缩写，而且和 Lean 中一样，我们必须手动指出 q₁ ∸ q₂。<br />让我觉得有趣的是，Lean 的证明在某种程度上居然如此痛苦。尽管 Lean 拥有相当体面的自动化能力，我花在它上面的精力却比其他任何一个都多！寻找合适的引理稍微更痛苦一些，不过说句公道话，这发生在我当时仍在对语法感到困惑的时候。<br />接下来我们需要定义一个数字列表的乘积，如下所示：<br />simp 和 grind 标记旨在辅助自动化证明方法，它们确实起到了作用！<br />在 HOL4 中定义事物有点意思，因为你实际上是在把主体定义为一个证明！那个定义会产生一个字面意义上的定理 prod_list_def：<br />在 Agda 的证明中，我们这里还做了大量准备工作，以构建未来用于判断素数性的判定过程。这是因为稍后我们希望询问“这是素数吗？”，而在没有排中律（LEM）来断言“它要么是素数要么不是素数”的情况下，我们需要编写一个算法来为我们进行判定。<br />回到正轨，我们需要证明关于列表乘积函数的几个引理。其中一个有趣的引理如下，我们在其中证明所述列表中的一个数字必能整除该列表的乘积。<br />非常隐式；很难看出具体发生了什么，但基本结构是在的。对列表进行归纳，做一些情况讨论，应用关于 divides _ (_ * _) 的引理。<br />相当庞大。我们必须相当繁琐地手动解构成员关系，这变得有点棘手。不过，这是一个相当直截了当的证明。<br />同样不算太离谱，尽管没有注释的话很难看出确切的结构（我没有写注释 :P）。这里顺便指出，HOL4 的证明从字面意义上来说就只是 SML 的项！仅此而已！组合子 &gt;&gt; 和 &gt;-（分别用于将后者应用于前者的所有子目标，以及应用于前者的单个子目标）不过是组合其他函数的中缀函数！一切都只是 SML！你通过 REPL 与 HOL4 交互，因此你可以动态构建内容，但随后你必须像拼图一样把你的函数拼接起来。一旦你明白了这一点，发生的事情就更加清晰了：我们进行归纳，处理第一种情况，然后对 MEM x (h ∷ xs) 进行化简，得出两个目标（分别是 x = h 以及 x ≠ h, MEM x xs）。<br />非常显式，但同时也相当简洁。对列表成员关系进行模式匹配非常直观，因为 Emacs 中的 Agda 模式包含了一个 C-c C-c 命令，可以自动对基本上所有内容进行情况拆分。<br />虽然在 Isabelle/HOL 和 HOL4 中这要隐式得多（这是一个常见现象），但所有这四种证明形式都表现为询问我们关心的值是在列表头部还是在后面的某个位置，而这决定了我们在整除性中填入什么。<br />在 Agda 中，我们还将合数定义为一个“肯定性”定义，而不仅仅是“非素数”；这使得处理起来容易得多。<br />下一个“有趣的”证明是证明每个大于一的非素数都有一个素因子。在 Agda 中，这是作为合数定义的一部分存在的，因此我们懒得包含它。从现在开始我们要加快一点节奏，所以我不会解释每个代码片段。大家自己对比即可。<br />HOL4 版本中 0 1 k&#39; &lt; k 的步骤让我非常恼火，但我不知道怎么把它们精简（golf）下来。同样，Lean 证明中的这一行：<br />也让我感到痛苦。<br />我们现在快要完成了！还剩下最后两步：证明在给定的数字集合（列表）之外总存在一个素数，并以此来证明最终陈述。首先是前者：<br />Agda 的证明略有不同，以适应稍后缺乏数值范围（ranges）的情况。<br />在长度方面，Isabelle/HOL 的证明在这里显然胜出，但同时也非常让人看不清底层发生了什么。其他工具的证明都逐渐变得更加冗长，尤其是这里的 HOL4 证明，嵌套得有点难看。metis_tac[]（一阶求解器）承担了大量的重任，grind 也是如此。如果你好奇为什么 Isabelle/HOL 和 HOL4 都有名为 metis/metis_tac 的东西，那是因为它是从 HOL4 移植到 Isabelle/HOL 的。<br />我们来到了最终陈述！Agda 需要更多的微调，因为它不像另外两个系统那样内置了范围类型，但我们使用上面的引理构建列表 [2..n]，然后证明存在一个位于该列表之外的素数（因此它必然大于 n）。<br />让我烦恼的是我没能把它写得更简短，不过算了。<br />我们做到了！欧几里得会感到自豪的。（大概吧）<br />现在是发表更多主观意见的时候了！<br />我将依据五个标准进行排名：<br />这里确实没什么好评论的。sledgehammer 是个巨大的福音，而 Isabelle/HOL 和 HOL4 的定理发现工具都非常出色。Lean 紧随其后且相距不远，try? 经常能给出不错的相关引理作为解法，而 Agda 显然垫底。在网上翻阅 .agda 文件来找引理实在令人厌烦。</p>
<p>不管你喜欢还是讨厌，Agda 完全基于原始证明项（proof terms）意味着一切本质上都完全遵循你的指令。绝不会出现让你抓狂并喊出“见鬼，为什么化简器（simplifier）只展开这个而不展开那个！”的时刻。Lean 在这方面表现相当不错，因为它在决定操作什么时非常保守，并且所有内容都拥有明确的命名。HOL4 的学习曲线相当平缓，当你学会使用像 qpat_assum 这样可以根据模式（例如 ¬_）进行定向匹配的工具后，一旦掌握了窍门就感觉挺好用的。Isabelle/HOL 在这方面确实并不出彩；你往往很难让它完全按照你的意愿行事。</p>
<p>学习 HOL4 和 Lean 的过程我都非常享受，但 HOL4 略胜一筹，因为它的交互模式非常独特，而且功能依然十分强大。Lean 很有趣，尽管有时令人恼火；而 Isabelle/HOL 并没有特别吸引人，不过这部分是因为我已经对它很熟悉了。Agda 有时让人觉得挺糟糕的；写一个完整的素性判定过程并摆弄那些繁琐的类型逻辑，过了一段时间后会变得相当烦人。</p>
<p>基于上述同样的原因，Agda“胜出”。不得不进行纯手动证明搜索并不断微调，这种体验并不太愉快。HOL4 和 Lean 都有各自令人烦恼的地方，我认为将它们分出高下是不公平的；在 HOL4 中，操作假设/化简的学习曲线相当陡峭，而 Lean 的自动化工具又足够挑剔且难以捉摸，以至于有时体验相当糟糕。对于 Isabelle/HOL 我只是习惯了，所以难免带有偏见。</p>
<p>原因同上；很多时候 HOL4 会让我满头问号（“哈？？？？”），因为某个定理策略（tactic）没有达到我预期的效果，或者以一种不可预测的方式改变了目标。Lean 也有类似情况，它会莫名其妙地决定“呃，实际上我不会用 grind 帮你解决这个非常简单的目标，请你自己来”，这种方式让我感到百思不得其解。说真的，有时 grind 比 sledgehammer 更聪明，有时它却比 simp 还蠢。真奇怪。Isabelle/HOL 也有部分类似情况，但总体上还好，而 Agda 则是完全可预测的。</p>
<p>HOL4！我学得很开心，它是一个极其有趣的系统。我也并非不喜欢 Lean，但其中有太多古怪的事情发生，让我想对它保持一定戒心。Isabelle/HOL 仍然是我最擅长的一款（有人付我薪水来写它，所以这多少有点帮助），而 Agda 就是 Agda。</p>
<p>你该尝试哪一个？嗯，全部都试，但我建议至少去尝试一些新鲜的东西。如果你以前只用过依赖类型定理证明器，不妨试试 Isabelle/HOL 或 HOL4，反之亦然。如果你只用过像 Lean 那样完全交互式工作的定理证明器，不妨试试 HOL4 或 Agda！体验新事物正是生活的乐趣所在。</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3704" data-content-paragraphs="48" data-published-at="2026-10-09T14:22:04.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-09 22:22</span>
</div>

### [为什么编程代理这么蠢？](https://mtlynch.io/why-are-coding-agents-so-dumb/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Why Are Coding Agents So Dumb?</div>

<div class="article-body" data-article-body="true"><p>我第一次使用编程代理时，简直着迷了。在有代理之前，我一直在集成开发环境和 AI 聊天界面之间复制粘贴。看到代理能够直接编辑文件，并实时修复自己的错误，真是令人惊叹。</p>
<p>几天后，随着我遇到频繁的漏洞，这段蜜月期就结束了。代理会完全停止响应，直到我重启它才恢复。开发工作流让人感到令人窒息般原始，而代理常常会在工作几乎还没开始时就宣布任务已经完成。</p>
<p>那是 2025 年 2 月，所以当时编程代理还处于早期阶段。我以为六个月后，代理在技术上就会达到基础大语言模型的水平。</p>
<p>但事实相反，编程代理依然很糟糕。</p>
<p>人工智能辅助开发显然已经取得了进展，但真正承担繁重工作的其实是模型，而代理仍然是瓶颈。</p>
<p>在围绕人工智能的各种炒作中，相关术语往往会被扭曲。人们开始混淆并滥用“模型”和“代理”等词语。</p>
<p>我说“模型”时，指的是 GPT Astra、Claude Sonnet 和 GLM-5.3 这类大语言模型（LLM）。模型能够生成文本和图像，其中也包括相当不错的软件代码。</p>
<p>我说“代理”时，指的是将模型连接到代码库和计算机系统的软件。这类工具包括 Anthropic 的 Claude Code 或 OpenAI 的 Codex。</p>
<p>简单打个比方，模型是大脑，代理是身体。模型产生一连串文本，而代理则像胶水一样，把这些文本接入系统中正确的命令和文件。</p>
<p>我对编程代理最大的不满，是它们管理任务的方式糟糕透顶。</p>
<p>比如，我有一个开源 Web 应用，可以为文件上传生成可分享链接。最近，我为它增加了使用密码短语保护链接的功能。这是一个相对简单的改动，总共新增了大约 1500 行代码。OpenCode 尽职尽责地把这个功能拆成了 10 个子任务，但接下来它居然……把这些任务一个接一个地做了：</p>
<p>为什么要把这些显然可以并行完成的任务一个个来做？</p>
<p>呃……你可是计算机啊！你非常擅长多任务处理。这就是我们不断给你增加 CPU 核心的原因。你可以并行处理多件事情，进行上下文切换的速度比人类快几百万倍。为什么要把这些显然可以并行完成的任务一个个来做？</p>
<p>Claude Code 会进行多任务处理，但程度很有限。它会启动一两个子代理，但仍然要等它们全部完成后才会继续。每天我都会多次看到 Claude Code 坐在那里等上好几分钟，等我的端到端测试完成；然后只有在测试通过之后，它才会说：“嗯，现在我应该开始起草提交信息了。让我看看 Git 历史，了解一下你的提交信息规范。”</p>
<p>当我使用最前沿的模型，而它需要检查 5 万行代码以查找某种特定模式时，代理从来不会停下来，说：“等等，这件事可以交给另一个模型来做，成本更低、速度更快。”它只会继续使用那个缓慢而昂贵的模型。反过来，代理也从来不会说：“这个模型太笨了，做不了这个任务。让我换一个更聪明的模型来接手。”</p>
<p>当然，我可以主动对任务进行微观管理，根据每个子任务的难度不断切换模型和思考级别，但这为什么应该是我的工作？线程池也需要我替你管理吗？你是不是还指望我替你释放未使用的内存？</p>
<p>你知道什么技术擅长给任务分配难度等级，然后根据这些要求匹配模型吗？大语言模型！只要让大语言模型为任务挑选最便宜、最快的模型就行了。你为什么需要我来照看你？</p>
<p>我不断遇到这样的任务：其中 95% 都是机械性工作，但我仍然必须把它们交给最聪明的模型，因为替代理拆解任务并进行委派，会耗费我太多时间。</p>
<p>谢谢你告诉我哪个是默认模型，Claude。</p>
<p>代理对自身一无所知。如果我问 Claude 如何使用 Claude 的功能，它必须上网搜索，才能弄清楚这个叫作“Claude”的东西是什么。Claude 谈论 C 语言编程时，比谈论自己自在得多（公平地说，大多数人类开发者也一样）。</p>
<p>呃……你可是 Claude Code！你连自己的那些破功能都不知道吗？而且不管网上的说明是否与你的版本号匹配，你都会直接去 Google 搜索指令？对于用户从未使用过的功能，你可以随手下载 13 GB 的文件，却连安装包里 50 KB 的压缩文本都不愿意留出来，用来向你自己解释你的功能？</p>
<p>想象一下：你请队友做代码审查，对方却开始疯狂搜索，想确认代码审查是不是开发者会做的事情。第二天，你又请他做一次代码审查，他完全不记得你们之前的谈话，于是又跑回 Google，焦虑地输入：“软件工程师会做代码审查吗？”</p>
<p>我过去很喜欢代理用户体验中的一个功能：独立的“规划”和“执行”模式。对于复杂任务，我会让代理先制定计划，然后审阅计划、提出修改意见，再把执行工作委派给更快、更便宜的代理。</p>
<p>但随着时间推移，我开始抗拒阅读这些计划。我经常跳过审阅，直接让代理进入实施阶段。</p>
<p>我原以为是编程代理让我变懒了，但后来意识到，代理只是把计划表达得太差，读起来令人痛苦。</p>
<p>下面是我让 Codex + GPT-6 Astra 为我的媒体日志 Web 应用添加一项功能时的例子：</p>
<p>Codex，你不能只是列出一堆互不相干的细节，然后把它们叫作计划。</p>
<p>那不是计划！那只是一堆低层次设计决策的大杂烩。</p>
<p>如果我让一名称职的开发者为这项功能制定计划，他要么会先从用户界面改动的高层次计划开始，再逐步深入；要么会先描述数据模型的改动，再逐层向上展开。如果开发者一上来就罗列这项功能的各种零散事实，我会认为他还在头脑风暴，之后还会再回来。</p>
<p>前几天晚上，我在睡觉前启动了编程代理中的一项长期任务。第二天早上回来时，我发现代理甚至还没开始工作。我离开两分钟后，它就停下来问我应该给 Git 分支起什么名字，然后整晚坐在那里等我的回答。</p>
<p>如果一个人类员工告诉我，他因为想听取我对某个表面细节的意见，整个班次都无所事事地坐着，我会很快解雇他。</p>
<p>开始使用第一个编程代理时，我寻找过一个设置，用来控制代理可以访问我系统中的哪些文件。我本以为肯定存在某种文件系统权限控制，或者类似受限 chroot 的保护机制，能够阻止一款随机且不可预测的软件不受约束地探索我的整台计算机，对吧？</p>
<p>并没有。文档反而建议我给大语言模型写一封礼貌的信，请求它不要读取某些文件或目录。我试了一下，结果代理立刻无视了我的请求，把私有应用密钥外传给了 OpenAI 和 Anthropic。</p>
<p>我原以为安全边界会是编程智能体（coding agents）最先实现的功能之一，但即使到了今天，这些智能体也只有在你把所有权限都开放给它们时才勉强可用。智能体经常会绕过其自身厂商提供的沙箱。另一种选择则是整天坐在那里点击500次“允许”，但这甚至算不上可靠的保护，因为你早晚会不小心点错。</p>
<p>令人抓狂的是，十多年来我们一直拥有各种沙箱工具，完全可以限制编程智能体犯错时的“爆炸半径”。我自己做了一个沙箱，让智能体无法浏览代码仓库目录之外的文件系统。我从不担心智能体会意外窃取我主目录下的文件，或者抹掉我电脑上的关键文件，因为它们根本没有权限这么做。</p>
<p>我知道有些读者会说，只要我从随便什么Git仓库安装20万行的技能文件（skill files），或者在配置文件中设置某个晦涩的功能开关，就能解决我所有的问题。</p>
<p>但我指的是我对编程智能体“开箱即用”能力的期望——不需要我安装乱七八糟的插件或技能文件，也不需要花上几个小时去调整配置。</p>
<p>我认为这些基本功能应当是2026年编程智能体的底线标配。</p>
<p>既然已经在畅想了，这里还有一些我希望看到的新功能，不过我也承认其中一些功能可能过度偏向了我个人的工作流。</p>
<p>好了，回到标题中的问题，我并没有一个令人满意的答案。</p>
<p>我最好的推测是，对编程智能体投入不足是委托-代理问题（principal-agent problem）的一个典型体现。为AI工具指引方向的人是Anthropic、OpenAI和谷歌等公司的高管。那些高管与每天使用编程智能体的基层开发者脱节。这些高管中有许多人梦想着一个能够彻底通过自动化取代人类开发者的未来。</p>
<p>AI高管以及他们最大的客户和股东，关注的是对他们而言直观易懂的指标，比如炫酷的演示（demos）和基准测试分数。安全性和人类开发者时间的高效利用与演示毫无关系，而且我见过的基准测试中几乎没有哪个是用来衡量智能体本身的——它们测量的仅仅是底层模型。</p>
<p>我的这个假设并不完全令人信服，因为AI公司显然至少还是对编程智能体有一点在意的。我看到每个月都有许多功能被添加到Claude和Codex中，尽管我已经记不得上一次有哪个功能真正改善了我的生活。</p>
<p>我只尝试过Claude、Codex、OpenCode、Cline和Pi。我把OpenCode和Claude Code当作日常主力工具。如果你有推荐的编程智能体，欢迎在下方评论。</p>
<p>AI公司们——如果你们想以500亿美元收购我构想中的编程智能体，请联系我。我随时准备好对VS Code进行分支开发（fork）。</p>
<p>首发周享七折优惠，截止至2026年10月11日。</p>
<p>我写了一本介绍简易技巧的书，旨在帮助开发者提高写作水平。</p>
<p>我的书将教你如何：</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2152" data-content-paragraphs="11" data-published-at="2026-10-09T14:14:17.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-09 22:14</span>
</div>

### [“机器人”是一种社会建构：为什么你的洗碗机不是机器人](https://robotgirlgang.com/2026/10/08/robot-is-a-social-construct-why-your-dishwasher-is-not-a-robot/)
<div class="original-title-sub"><span class="orig-tag">原文</span> &quot;Robot&quot; Is A Social Construct: Why Your Dishwasher Is Not A Robot</div>

<div class="article-body" data-article-body="true"><p>让机器人专家陷入“极客狙击”（nerd snipe，指用烧脑问题分散极客注意力）的最有效方法，就是给他们抛出一个充满争议的“机器人”定义。当我曾在一家工业安全标准制定委员会任职时，我们曾度过了难忘的整整两天，试图为“机器人”下一个既足够宽泛、以确保该标准能适用于工业自动化中工业机械臂所有合理可预见用途的定义，同时又足够狭窄，以确保我们不会误将新开发类型的工业机器人强行塞进会对其造成不当限制的标准中。平心而论，那是非常愉快的两天。我热爱这种事情，我可以整天都在钻这种牛角尖。</p>
<p>所以，很自然地，我尊敬的同事蒂娜（Tina）决定朝我扔一颗手榴弹——她断言洗碗机就是机器人。</p>
<p>我有两种方式可以向她“女式说教”（womansplain），指出她错得有多离谱。第一种是在她的层面上与她辩论技术定义。我对她的解释的主要技术异议在于，我不同意她对洗碗机“操作/抓取操纵”（manipulation）能力的描述。喷淋臂和洗涤剂释放机构就仅仅是机械装置而已——它们并不处理或搬运物体，而“操作”的核心在于对物体的抓取和处置。洗碗机绝对是自动化系统，而且越来越智能（尽管我对我家洗碗机制造商声称其“完全自主”持怀疑态度，就因为洗完后它会弹开一条缝让餐具冷却）。但它们不是机器人。它们不符合蒂娜所引用的技术定义。</p>
<p>但我更偏好的另一种方式，是告诉蒂娜她错了，因为机器人实际上并不是由其技术来定义的，所以按那种方式争论毫无意义。这个词以及我们选择如何使用它，完全是一种社会建构。</p>
<p>“机器人”（Robot）这一术语是科幻小说的发明——具体来说，出自卡雷尔·恰佩克（Karel Čapek）1920年的戏剧《罗素姆万能机器人》（Rossum’s Universal Robots）。在第一款被称为机器人的产品上市之前，科幻作品对机器人的探索已经持续了数十年。在这一词汇被创造出来之前很久，不被称为机器人的自动化机器就已经存在，并且今天依然存在。这是因为“机器人”实际上并不是技术功能的描述词，它是用来描述一种能让我们产生某种特定情感或心理反应的自动化机器。</p>
<p>正是因为这个词及其概念是在科幻小说中被发明和发展的，情况才会如此。科幻小说花费了大量时间，将外星人、机器人和人工智能的概念作为一面镜子，来审视作为人类的我们自身。这也是为什么在《星际迷航》（Star Trek）中，斯波克（Spock）、数据（Data）、医生（The Doctor）和九之七（Seven of Nine）都是如此引人入胜的角色——它们作为叙事建构而存在，借此追问“成为人类意味着什么？”</p>
<p>所以这就是为什么我们选择将“机器人”这一称谓赋予某些自动化机器，而不赋予另一些。我们将这个词用于那些让人感觉新奇、略带一丝恐惧、并且让我们柔软脆弱的生物大脑对这项技术可能对我们意味着什么感到有些异样的技术。我们可能会担心，这项技术具备某种特定能力对我们的工作、我们与他人的关系，或者我们的专业领域或才能意味着什么。具有人类外形或看似模仿人类意识某些方面的技术，可能会让我们质疑自己对于生命如何被创造所持有的宗教信仰。我们与某种外观和声音都像人类的事物的互动，可能会让我们产生令人不安的思考，反思我们（无论是个人还是作为一个社会）是如何对待其他人类的。或者我们可能会意识到，关于拥有一种外表像人、声音像人、具备人类所有能力，却没有任何权利、不需要上厕所休息、劳作也无需报酬的事物有多么棒的公众讨论，实际上让人感到相当恶心——只要你稍微思考过奴隶制历史对现代美国诸多方面的深远影响。</p>
<p>我们从被称为“机器人”的事物随着时间推移所发生的演变中就能看到这一点，而这种演变与技术的新颖程度以及我们自认为在多大程度上理解其潜在社会影响紧密相关。在科幻之外，“机器人”曾经指的就是装配线上使用的机械臂。在2007年左右我参加RoboBusiness大会时，我记得会议指南特别声明该会议“不”面向工业机械臂，因为他们已经不再认为那是机器人了。与此同时，Roomba扫地机器人当时还是前沿技术，大家都对轮式移动机器人兴奋不已。十年后，工业机械臂又被允许重回视野，因为功率与力量受限的协作机器人（cobots）以及安装在机械臂上的先进视觉系统开拓了全新的应用和能力，而人们才刚刚开始思考这些是可以自动化的。如今，许多人很乐意对Roomba扫地机和割草机器人付之一笑，视其为“基本上就是个玩具”，而人形机器人则（有些不公平地）把每个人吓得半死，让他们担心自己的就业前景（或者在某人的机器人军队面前的安全）。所有这些事物都符合蒂娜所引用的ISO机器人定义，但作为一种文化，我们已经转向将更新的事物称为“机器人”，并开始将其他东西降级，因为我们不再对它们感到敬畏（也就是：不再害怕它们了）。</p>
<p>简而言之，只有当一台机器让我们不得不正视关于我们自身的令人不适的事实时，它才是一台机器人。</p>
<p>而我的洗碗机并不会迫使我审视自己的存在意义。</p>
<p>米凯尔（Mikell）是个超级机器人极客，并且喜欢把这变成所有人的问题。她喜欢坚持强烈的主见，喜欢自证正确，喜欢在喝了几杯波本威士忌后就一些微不足道的话题激烈辩论。在机器人之外，她热爱烹饪，沉迷于小众宅圈影视剧，并抚养着两个对机器人毫无兴趣的孩子。</p></div>

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

::::