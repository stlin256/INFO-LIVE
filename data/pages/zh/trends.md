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
| **culpert：具备 Span 感知与回归工具的 Rust 堆内存性能分析工具** | `待评估` | `待核验` | 【undefined】culpert：具备 Span 感知与回归工具的 Rust 堆内存性能分析工具：Culpert 目前仍处于极度实验性阶段并处于积极开发中，在生产环境中使用需自行承担风险。 |
| **dasSDL3：面向 daslang 的符合惯用法的 SDL3 绑定** | `待评估` | `待核验` | 【undefined】dasSDL3：面向 daslang 的符合惯用法的 SDL3 绑定：本文是对原始博文 dasSDL3（俄语原文）的 AI 辅助英文译本。 我为 daslang 制作了 SDL 绑定。 SDL 抽象了对硬件和操作系统底层功能的访问。第 3 版还引入了对现代 GPU API 的抽象层。你仍然可以仅使用 SDL 来创建窗口，并通过其他图形 API（DirectX、Metal、OpenGL 或 Vulkan）向其中进行绘制。此外，还有多个配套库为 SDL 扩展了图像加载、更高级别的音频与网络 API，以及简单的 |
| **Iframe 终于能自适应内容高度了** | `待评估` | `待核验` | 【undefined】Iframe 终于能自适应内容高度了：Chrome 154 允许 iframe 仅凭一行 CSS 即可根据其内容撑开高度，无需繁琐测量，无需收发消息，也无需尺寸调整脚本。但 iframe 内部的页面必须同意该行为。这个限制条件正是该特性最值得玩味之处，因此本文会对此着重探讨。 |
| **Android 中实现“单次点击”执行 MMI 代码** | `待评估` | `待核验` | 【undefined】Android 中实现“单次点击”执行 MMI 代码：本文介绍了如何利用存在漏洞的拨号器应用程序，在 Android 系统中实现通过“单次点击”执行 MMI 代码。 |
| **哦，看来在标准C中无法以可移植的方式检查字符串到浮点数的转换错误** | `待评估` | `待核验` | 【undefined】哦，看来在标准C中无法以可移植的方式检查字符串到浮点数的转换错误：这算是我上一篇文章的某种续篇。在上一篇中，我讨论了 math_errhandling 宏，以及 glibc 和 musl 是如何处理数学错误的（以及标准中是如何规范的）。 |
| **为 TypeScript 编译器添加 Go 语言的 defer 语句** | `待评估` | `待核验` | 【undefined】为 TypeScript 编译器添加 Go 语言的 defer 语句：我原本想探究一下为 TypeScript 编译器添加 Go 语言的 defer 语句究竟有多难，但当我完成时，我已经确信它大概本就不该存在。 |

## 💬 思想社区与网民观点争鸣

## 📰 社会民生、思潮与社群核心要闻

::::grid{cols=2}
:::cell
<div id="story-rupert648-culpert-b63b43f39051d419" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3309" data-content-paragraphs="29" data-published-at="2026-10-10T14:49:49.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 22:49</span>
</div>

### [culpert：具备 Span 感知与回归工具的 Rust 堆内存性能分析工具](https://github.com/rupert648/culpert)
<div class="original-title-sub"><span class="orig-tag">原文</span> culpert - rust heap profiling with span awareness and regression tooling</div>

<div class="article-body" data-article-body="true"><p>Culpert 目前仍处于极度实验性阶段并处于积极开发中，在生产环境中使用需自行承担风险。</p>
<p>面向 Rust 服务的基于 Span 的堆内存分配性能分析工具。</p>
<p>Culpert 是一款面向 Rust 库与服务的采样堆内存分配性能分析工具。它能够将内存分配归因至现有的 span，并导出兼容 pprof 的性能分析文件以及对 CI 友好的差异比对（diff），从而帮助在版本发布前发现内存分配回归问题。</p>
<p>它能够与 tracing、Cloudflare Foundations 或其自带的 #[culpert::span_fn] 宏集成。Culpert 已经在 Cloudflare 的代码发布至生产环境前，成功捕获了数个真实的内存分配回归问题（包括一处内存泄漏）！</p>
<p>它提供了一个 #[global_allocator] 包装器，可将每个采样的分配归因到其发生的 span 内部；导出 pprof 格式的性能分析数据，以便现有的工具生态（原版 pprof、Speedscope、Pyroscope、Polar Signals）能够继续工作；并附带一个命令行工具（CLI），提供无偏的单 span 报告以及用于 CI/PR 工作流的 diff 子命令。采用带有伯恩斯坦修正（Bernstein correction）的几何采样，在保持极低性能分析开销的同时提供无偏的内存分配估算。</p>
<p>三种集成方式——任选适合您服务的一种：</p>
<p>culpert-macros 由 culpert 重新导出（请勿直接依赖它）。</p>
<p>最小可行配置，无需外部跟踪器（tracer）：</p>
<p>每种接入方式都会返回一个 ProfilerGuard。在需要记录内存分配时保持该 guard 处于存活状态；在应用程序及线程局部（thread-local）清理之前将其 drop 即可安全停止性能分析。</p>
<p>可运行版本参见 examples/macros。</p>
<p>必须设置 default-features = false——foundations 默认的 jemalloc 特性会声明其自带的 #[global_allocator]，这会与 culpert 的 TrackingAllocator 冲突并导致链接失败。</p>
<p>现有的 #[foundations::telemetry::tracing::span_fn] 注解无需额外成本即可直接转为归因键。参见 examples/foundations（最小化示例）和 examples/mock-axum（包含通过 pprof_route 提供 profile 服务的完整 HTTP 服务）。</p>
<p>现有的 #[tracing::instrument] 注解直接转为归因键。可运行版本参见 examples/tracing。</p>
<p>生成一份性能分析文件（*.pb.gz），您既可以将其输入到原版 pprof 中，也可以使用附带的 CLI 进行读取。下方的输出来自于承载负载的 examples/mock-axum 服务；三种集成路径生成的格式完全一致。</p>
<p>默认模式：层级细分，每个子 span 嵌套在其父级之下。基于已安装的任意 SpanContext 所发出的 span_parent_id 标签构建。</p>
<p>--flat 可为偏好该格式的用户切换为按字节数排序的表格。“bytes”列表示在每个 span 下分配的总字节数的无偏估算——每个底层采样都按 1 / (1 − exp(−bytes/rate))（几何采样的伯恩斯坦修正）进行加权。此处不显示原始采样（raw）列：在使用几何采样时，唯有经修正后的数值才具有实际意义。</p>
<p>非常适用于排查“这究竟是我代码的问题，还是运行时的问题？”。它能显示发生在任何 span 之外的内存分配的前几大调用点（callsite）——例如 tokio 运行时工作、框架内部机制、foundations 或 tracing 自带的上报器，或是尚未打上注解的代码路径。</p>
<p>面向 CI 工作流：通过 span_name 对“变更前”和“变更后”的性能分析文件进行 diff 比对，并支持绝对阈值（--threshold-bytes）和相对阈值（--threshold-pct）门禁。--format markdown 可以生成能够直接管道输出至 $GITHUB_STEP_SUMMARY 的内容：</p>
<p>若要过滤掉在两份性能分析中分配量均小于 20 MiB 的 span，可添加 --min-span-bytes 20971520（默认值：0，即禁用）。只要在任一方恰好达到 20 MiB 的 span 仍符合保留条件，包括新增和消失的 span。现有的增量大小和百分比门禁依然生效；整份性能分析的总计仍包含所有 span。JSON 格式会将过滤掉的行保留为 quiet 状态。在 --tree 树形输出中，该最小值将应用于显示的子树总计（包含子项）。</p>
<p>CI 可以设置环境变量 CULPERT_MIN_SPAN_BYTES=20971520，而无需显式传递该参数标志。显式的 --min-span-bytes 参数会覆盖环境变量，包括传入 0 来禁用该功能。CI 必须安装包含此选项的 CLI 版本。</p>
<p>磁盘存储格式为标准 pprof，因此该生态体系中的所有工具均可读取：</p>
<p>对于 CI 工作流，您通常需要拿上一周的性能分析数据作为基准进行比对。配套的 culpert-archive Cloudflare Worker 会以提交 SHA（commit SHA）作为键来存储 .pb.gz 文件；culpert-cli 的 upload / pull 子命令是其第一方客户端。端点与令牌从环境变量（CULPERT_ARCHIVE / CULPERT_TOKEN）中获取，提交 SHA / 分支从 GITHUB_SHA / GITHUB_REF_NAME 中获取，因此 GitHub Actions 的步骤内容非常简洁：</p>
<p>为了在 CI 中即插即用，本仓库提供了一个封装完整流程的可复用复合 Action（composite action）：</p>
<p>该代码块即可完成以下流程：culpert info（在运行日志中进行健全性检查）→ culpert pull --latest-of main --allow-missing → culpert diff --format markdown（发布至 $GITHUB_STEP_SUMMARY，并在 pull_request 事件中作为置顶 PR 评论发布）→ culpert upload 作为新的基准线。可通过该 action 的输入参数覆盖默认值——baseline-branch、threshold-bytes、threshold-pct、fail-on-regression 等。完整输入模式定义见 .github/actions/culpert-diff/action.yml。</p>
<p>Culpert 自身的 rust.yml 对 example-macros 进行了性能分析并调用了同一个 action——这就是一个实际运行的范例。目前设置为仅告警（fail-on-regression: &quot;false&quot;），直到 main 分支积累了足够多的运行记录以使门禁具备实际意义。</p>
<p>该 Worker 从不对 pprof 字节数据进行解析——它只是纯粹的存储服务。采样归因、伯恩斯坦修正、阈值逻辑均在此 CLI 中运行。部署方法和 HTTP 接口见 culpert-archive 的 README。</p>
<p>examples/ 中包含展示各集成路径的四个独立示例：</p>
<p>每个示例都会将性能分析文件输出至 /tmp/example-*.pb.gz。可通过 cargo run -p culpert-cli --bin culpert -- report 或 pprof -tags . 进行查看。</p>
<p>采用 MIT 或 Apache-2.0 双重许可协议开源。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>Culpert 是针对 Rust 库和服务的采样堆内存分配分析器（heap-allocation profiler），目前处于实验和开发阶段。</li>
    <li>Culpert 可将内存分配归因至现有 span，并导出兼容 pprof 格式的分析文件（*.pb.gz）以及适用于 CI 的 diff 结果。</li>
    <li>来源叙事重点：介绍 Culpert 作为面向 Rust 服务且具备 Span 感知能力的采样堆分配分析器，重点突出其与 tracing/Foundations 的集成能力、Bernstein 校正算法以及面向 CI 流程的回归检测与对比功能</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://github.com/rupert648/culpert" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-blog-339855472-eb972234b54b410e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7670" data-content-paragraphs="48" data-published-at="2026-10-10T13:48:45.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 21:48</span>
</div>

### [dasSDL3：面向 daslang 的符合惯用法的 SDL3 绑定](https://spiiin.github.io/blog/339855472/)
<div class="original-title-sub"><span class="orig-tag">原文</span> dasSDL3: Idiomatic SDL3 bindings for daslang</div>

<div class="article-body" data-article-body="true"><p>本文是对原始博文 dasSDL3（俄语原文）的 AI 辅助英文译本。<br />我为 daslang 制作了 SDL 绑定。<br />SDL 抽象了对硬件和操作系统底层功能的访问。第 3 版还引入了对现代 GPU API 的抽象层。你仍然可以仅使用 SDL 来创建窗口，并通过其他图形 API（DirectX、Metal、OpenGL 或 Vulkan）向其中进行绘制。此外，还有多个配套库为 SDL 扩展了图像加载、更高级别的音频与网络 API，以及简单的 2D 图形功能。<br />我希望 daslang 也能拥有这样一把“瑞士军刀”，因此我利用 AI 为跨多个平台的 SDL3 全部功能构建了绑定。<br />这些绑定是通过 dasClangBind 生成的，它支持 C++ 的一个子集。它负责解析该库的代码并生成基础绑定。不过这些绑定仍需进一步打磨：移除不属于绑定的辅助宏与函数，并调整在不同语言之间难以直接转换的惯用法（例如原始指针，以及具有不同生命周期或内存管理规则的对象）。获得能够运行的绑定只是这项工作中第一步也是最轻松的一部分。<br />下一层是 sdl_boost，它是构建在基础绑定之上的一组辅助工具，让该库更易于使用，代码表达力也更强。每种语言都有自己的惯用法。出色的绑定能让你以在目标语言中感觉自然的形式来调用库函数。daslang 中的语法宏非常契合这一需求。<br />在设计接口时，我参考了 Rust 的 SDL3 绑定。我之前曾撰文介绍过 Rust 社区在 API 设计上的思路：《Rust 中优雅的 API》（Elegant APIs in Rust）。在这里，我将这些理念融入到了 daslang 中。<br />管道（Pipeline）是让接口使用起来更加便捷的特性之一。参见《管道机制可能是我最喜欢的编程语言特性》（Pipelining might be my favorite programming language feature）。在 daslang 中，|&gt; 运算符使 value |&gt; function(argument) 等价于 function(value, argument)。前一次调用的结果会成为下一次调用的第一个参数，因此代码读起来完全符合执行顺序。<br />你可以逐步构建对象的描述信息。例如，设置窗口大小、添加标志位并选择其位置：<br />window_options 会创建一个 WindowOptions，随后每次调用都会返回更新后的描述。此时窗口尚未真正创建：你可以单独准备配置项，然后再将它们传递给 with_window。类似的链式调用同样适用于纹理（texture）、着色器（shader）、采样器（sampler）以及图形管线（graphics pipeline）。<br />例如，下面是一个包含线性过滤、mip 级别之间插值以及纹理寻址方式的采样器描述：<br />filters 用于设置缩小和放大过滤器，mipmap_mode 控制 mip 级别之间的过滤方式，而 address_modes 则决定如何处理纹理范围之外的坐标。最终结果是一个普通的 SDL_GPUSamplerCreateInfo，你可以将其传给 with_gpu_sampler(device, sampler_settings)，从而创建一个具有明确生命周期的 GPU 资源。<br />这些都是普通的独立函数（free functions）。你无需将描述包装成带有方法的类就能实现链式调用。包围多行表达式的圆括号允许以 |&gt; 开头的折行代码正常续行。<br />对于简短的描述，直接指定各个字段会很方便：<br />当你逐步组装描述时，Builder 模式很有用；而当所有配置预先已知时，具名初始化则更加适用。<br />在 C 语言 API 中，结果通常被写入通过指针传递的参数中。而辅助层可以直接将它们作为普通值返回。例如，window_size(window) 会返回一个 Result，其中要么包含窗口大小，要么包含错误描述。在 daslang 语法中，该类型写作 $Result。<br />冗长的类型名可以通过 typedef 进行简写。例如，该库为没有实际成功返回值的操作定义了如下类型：<br />这样函数签名便可以使用 SdlStatus 来替代完整类型名。SdlUnit 代表空的成功值，sdl_ok() 则用于创建该成功结果。SdlError 存储操作名称和错误信息，这些内容会在释放资源之前拷贝保存。<br />你也可以为特定任务引入别名：<br />对于具有不同值类型的返回结果，该库提供了泛型形式 $SdlResult。例如，$SdlResult 与 $Result 是同一类型。它是通过一个向标准 Result 注入 SdlError 的类型宏（type macro）实现的。这些简写赋予了类型更便捷的名称，同时保留了其底层表示与行为。<br />Option 代表可能缺失的值。例如，某个 SDL 提示（hint）可能未被设置，此时你可以提供一个兜底值：<br />接口由此区分了“操作失败”与“值自然缺失”这两种不同情况。<br />当多个操作都返回 Result 时，你在每一步之后都必须检查错误。例如，我们获取窗口大小、打印它并清空渲染器。在没有任何辅助语法的情况下，代码看起来像这样：<br />window_size 与外层函数返回的结果具有不同的成功类型：int2 和 SdlUnit。如果第一次调用失败，其 SdlError 必须被放入带有相应成功类型的结果中。而对于 clear，其结果可以直接返回。<br />使用 sdl_try 后，同一个函数变得更加简短：<br />sdl_try 是一个语法宏：执行成功时提取值；执行失败时则从当前函数或代码块提前返回，并保留 SdlError。第一个示例中的各项检查依然存在，但由宏自动生成。这样一系列调用读起来就像一段动作序列，错误上报则可交由应用程序边界来统一处理。<br />外层函数或代码块必须返回一个错误类型为 SdlError 的 Result。sdl_try 不会解包 Option，也不负责管理指针生命周期；资源管理使用 with_* 作用域。<br />在 daslang 中，这种惯用法是在库级别实现的：sdl_try 通过语法宏生成检查逻辑并提前返回。在我看来，显式标记潜在的退出点是最便捷的方式：它能标明执行流程可能在何处终止，同时保持代码的线性结构，无需嵌套代码块或额外的花括号。其他语言也有类似的机制，可以在值缺失时终止执行链。<br />下面的示例使用了一个虚构的 SDL API：首先创建一个窗口，然后为其创建一个渲染器。创建函数返回 Option/Maybe；如果其中任何一步没有产生值，则后续步骤将被跳过。<br />Rust：? 运算符会从 Some 中提取值，或在遇到 None 时从当前函数返回 None。表达式中的潜在退出点清晰可见：<br />Haskell：在针对 Maybe 的 do 代码块中，&lt;- 会从 Just 中提取值。一旦遇到 Nothing，整个代码块的求值结果即为 Nothing，后续计算都会被跳过。这种行为源于对 Maybe 的计算绑定（monadic binding）：链条停止的位置隐藏在“行与行之间”，无需单独的退出运算符。</p>
<p>在 C++ 中，RAII 是资源管理的常用方法：拥有所有权的对象在构造时获取资源，并在脱离作用域时在其析构函数中释放资源。这种对象所有权模型在 daslang 中不太典型：显式代码块以及通过 defer 实现的延迟清理，是定义外部资源生命周期的便捷方式。该语言虽然具备终结器（finalizers）和 inscope，但单凭指向 SDL 对象的指针并不能定义其所有权或清理规则。</p>
<p>创建窗口或纹理仅完成了任务的一半：资源必须被释放，包括在发生错误提前返回时。with_* 系列函数将资源传递给代码块，并在代码块结束时将其释放。sdl_scope 和 sdl_use 允许你将若干个嵌套代码块编写为线性序列：</p>
<p>该示例绘制了一帧；而在实际应用中，需要在资源生命周期内部运行事件与渲染循环。当代码块结束时，渲染器首先被释放，接着是窗口，最后关闭 SDL。如果渲染器创建或绘制失败，已创建的资源也会被一并释放。</p>
<p>sdl_use 宏会将代码块的剩余部分移入对应 with_* 函数的回调中。这些指针保持借用（borrowed）状态：它们可以在该作用域内使用，但不得保存供后续使用或手动释放。资源生命周期紧随程序结构；无需单独的资源回收器。</p>
<p>作为对比，以下是不使用 with_* 和 sdl_use 的相同示例（同时展开 sdl_try，它看起来几乎与 C 语言无异）。每个资源都在进入其清理块之前创建。defer 被移至其整个代码块的终结部分，因此仅在同一代码块中将其置于资源创建之后是不够的：在创建成功之前的提前返回中，清理也可能会执行。</p>
<p>如果渲染器创建失败，窗口和 SDL 会被清理。如果绘制失败，所有三个资源将按相反顺序释放。with_* 封装了这些代码块和清理规则，而 sdl_use 则允许你在无需手动编写嵌套结构的情况下使用它们。</p>
<p>你可以使用普通循环来处理事件队列：</p>
<p>poll_events() 是一个惰性迭代器：它一次获取一个事件，并在队列为空时停止。如果你提前退出循环，后续事件仍会保留在队列中。代码接收到的不是包含 C 语言联合体（union）的原始 SDL_Event，而是一个包含已解码事件数据的变体类型 SdlEvent。该数据中的字符串和列表归属于生成的值，因此下一次轮询不会覆盖它们。</p>
<p>可以使用 match 检查 SdlEvent 变体类型。每个分支都会接收其对应事件的数据：</p>
<p>像素操作采用了相同代码块惯用法的另一种形式：该库临时提供对纹理内存的访问权限。例如，让我们用渐变填充一个 32 × 32 的 RGBA32 流式纹理：</p>
<p>with_texture_pixels_rgba8 会在其代码块运行时锁定纹理，而 with_row 则提供来自单行像素的借用数组。在这里，# 标记了临时借用访问：这些数据不能被保留或传递到代码块外部。rgba8 将各分量打包为一个 uint。代码直接对纹理内存进行操作，而库则会考量行间距（row pitch），并在代码块结束时（包括在错误返回时）解锁纹理。该封装层还定义了数据类型，避免了通过 void* 指针进行的不安全访问。</p>
<p>所有这三者具有相同的机器表示，但编译器将它们视为不同的类型。例如，顶点绑定专门接收一个 GpuBufferHandle 数组：</p>
<p>传入 GpuTextureHandle 来替代 buffer 会导致编译期错误。在运行时，带校验的 API 还会验证资源种类、其是否仍然存在以及属于哪个设备。复制的句柄仍然是同一资源的别名：它不会创建单独的所有权，也不会延长其生命周期。这些检查适用于带校验的 GPU API；直接使用原生指针进行的 SDL 调用则保留其原始协定。</p>
<p>许多 C 函数接收一个数据指针和一个单独的元素计数。对于脚本而言，数组更为方便，因为其大小已知。例如，让我们绘制一个三角形：</p>
<p>适配器将指针和计数传递给 SDL 本身。在调用之前，它会检查索引边界、受支持的数组大小以及顶点值。</p>
<p>代码块还可以定义设置的生效时长。例如，with_render_target 会保存当前渲染目标，切换到纹理，并在代码块结束时恢复之前的目标：</p>
<p>对于 IO 而言，Result&lt;..., SdlError&gt; 可能不够充分：某项操作可能会传输部分数据随后失败。因此，read_io 和 write_io 返回 IoTransfer，它将传输的字节数与状态分开存储：</p>
<p>即使 status 包含错误，transferred 依然可用。</p>
<p>另一项特性是用 daslang 编写着色器。这利用了现有的 dasSpirv 编译器：注解用于标记着色器函数，编译器在编译脚本的同时生成 SPIR-V 和反射元数据。SDL 层利用这些结果来创建 GPU 资源。</p>
<p>整个链路如下所示：带注解的函数 → SPIR-V 与反射 → 资源布局校验 → SDL GPU 着色器创建。着色器在脚本编译时进行编译，而 GPU 对象则在运行时（设备可用时）创建。</p>
<p>例如，这是一个从 uniform 块读取颜色的片段着色器：</p>
<p>@uniform 描述应用程序提供给着色器的数据，而 @out 描述其输出。</p>
<p>该注解生成两个数组：包含 SPIR-V 的 solid_fragment : array，以及包含反射信息的 solid_fragment_reflect : array。反射描述了着色器阶段及其使用的资源。源函数名为 fragment_main，但生成的 SPIR-V 入口点名为 main。</p>
<p>一旦设备可用，这两个数组都会传递给 with_gpu_dsl_shader。该代码片段使用了上一个示例中的定义：</p>
<p>封装层读取反射信息，对照 SDL 规范验证资源，并填充 SDL_GPUShaderCreateInfo：着色器阶段以及 uniform 块和采样器的数量。SPIR-V 从字（words）数组转换为字节数组，并传递给常规的着色器创建函数。所生成对象的生命周期由熟悉的 with_* 作用域管理。</p>
<p>代码和反射必须来自同一次编译。反射有助于填充创建参数，但应用程序仍需控制顶点着色器与片段着色器之间的兼容性、数据格式以及图形管线配置。</p>
<p>你也可以使用预编译的着色器，跳过编译阶段。</p>
<p>Tint 结构体也可以在应用程序端使用。然而，其普通的内存表示形式无法直接上传：GPU 需要 std140 布局。打包适配器负责处理这一问题：</p>
<p>应用程序的结构必须与着色器声明相匹配：包装器不会根据命令缓冲区确定当前使用的着色器。若要在不分配新临时缓冲区的情况下反复进行打包，请使用带有可复用字节数组的 pack_gpu_dsl_uniform。</p>
<p>同样的机制也适用于计算着色器：[compute_shader] 会生成 SPIR-V 和反射信息，而 with_gpu_dsl_compute_pipeline 会创建 SDL 计算管线，并根据反射信息推导工作组尺寸和资源数量。对于存储资源，额外的 sdl_shader_access 注解会记录读写访问模式；同时，std430 适配器会将结构体数组打包到存储缓冲区中。</p>
<p>Vulkan 使用直接 SPIR-V 路径。D3D12 则通过独立的 SDL_shadercross 集成实现：with_gpu_dsl_shader_cross 和 with_gpu_dsl_compute_pipeline_cross 会将相同的 SPIR-V 转换为后端所需的格式。该路径需要 shadercross 及相应的编译器依赖项。</p>
<p>SDL 中有关着色器的文章：https://moonside.games/posts/introducing-sdl-shadercross/https://moonside.games/posts/layers-all-the-way-down/</p>
<p>daslang 不只是一门脚本语言。在受支持的平台上，其 JIT 编译模式通常能让解释执行的代码提速数倍。在无法使用 JIT 的情况下，它可以将代码转译为 C++。这一功能同样受到支持，并已纳入测试，以防止回归。</p>
<p>该语言还支持热重载。你可以启动一个带有空窗口的应用程序，并在不重启应用程序的情况下持续添加功能。具体机制在《Running it live》中有说明。</p>
<p>在 SDL 示例中，窗口、渲染器和 ImGui 上下文归原生宿主所有，并且在脚本重载后继续存在。live_watch_boost 模块会监视文件变更，并在保存后请求重载。使用 @live 注解的值会在增量重载期间恢复；完整重载则会重置脚本状态。</p>
<p>一个最小的实时接口片段：</p>
<p>UI 自动化通过 daslang 集成了 imgui_playwright。它为 ImGui 应用程序提供了脚本 API：控件通过 MAIN/INCREMENT 等名称寻址；你可以截取快照、点击或拖动控件、等待某个值发生变化，以及请求重载。</p>
<p>例如，在将 app 连接到 HTTP 示例之后，你可以检查点击是否生效，以及点击结果是否在重载后仍然存在：</p>
<p>完整的 playwright_widgets.das 还会通过合成鼠标事件拖动滑块，并在重载后检查其数值。自动化测试还会比较 UI 像素，以验证渲染结果是否发生变化。</p>
<p>同一场景还可以录制演示或教程。record_widgets.das 会在 with_recording_app 中运行一系列操作：暂停、移动滑块、点击按钮并检查结果。应用程序通过 SDL 捕获帧，dasStbImage 则将其写入 APNG。在 Windows 上，支持录制功能的构建版本可以从仓库根目录通过一条命令启动：</p>
<p>这样一来，即使 UI 发生变化，教程中的操作也能重复执行。该场景既描述了演示过程，也检查这些操作是否产生预期结果。AI 代理很擅长使用这一接口。</p>
<p>通过 daspkg 可以将该库作为开箱即用的软件包安装，无需自行生成绑定或进行构建。源代码发行包还包含生成好的绑定，因此无需引入 LLVM 和 Clang。</p>
<p>该库针对 Windows、Linux、macOS 和浏览器分别提供了配置档。共享的 boost 模块建立在绑定之上，而这些绑定已针对各个平台的 ABI 和可用函数进行了适配。</p>
<p>图形功能采用两条路径。SDL_Renderer 提供面向纹理、矩形和几何图形的现成二维操作。SDL_GPU 则让你能够控制着色器、缓冲区、图形管线和计算管线。浏览器配置档使用 Renderer/WebGL；原生 SDL GPU 示例尚未移植到该配置档，而固定使用的 SDL 版本也没有 WebGPU 后端。</p>
<p>着色器格式对 SDL GPU 同样很重要。Vulkan 接受 SPIR-V，Direct3D 12 接受 DXIL，Metal 接受 MSL 或 Metallib。在 GPU 示例中，单个 daslang 源文件会被编译为 SPIR-V：Vulkan 直接使用它，而 Direct3D 12 和 Metal 则使用 SDL_shadercross。Direct3D 12 路径还需要 DXC。你也可以提供相应格式的预编译着色器。</p>
<p>可以通过 SDL_GPU_DRIVER 选择后端：vulkan、direct3d12 或 metal。</p>
<p>SDL 也可以与 daslang 中通过 dasVulkan 和 dasOpenGL 提供的独立 Vulkan 和 OpenGL 绑定配合使用。SDL</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>作者为 daslang 制作了 SDL3 绑定（dasSDL3）。</li>
    <li>SDL 抽象了对硬件和操作系统的访问，并在第 3 版引入了对现代 GPU API 的抽象。</li>
    <li>来源叙事重点：介绍为 daslang 语言构建惯用 SDL3 绑定（dasSDL3）的设计理念、架构实现（包括基于 dasClangBind 和 AI 的自动生成、sdl_boost 语法宏辅助层、管道操作符、错误处理范式）以及着色器集成与热重载特性。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://spiiin.github.io/blog/339855472/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-y-fit-their-content-html-a53cb908e2de8d3b" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2413" data-content-paragraphs="20" data-published-at="2026-10-10T12:54:56.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 20:54</span>
</div>

### [Iframe 终于能自适应内容高度了](https://alfy.blog/2026/10/09/iframe-that-finally-fit-their-content.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Iframes that finally fit their content</div>

<div class="article-body" data-article-body="true"><p>Chrome 154 允许 iframe 仅凭一行 CSS 即可根据其内容撑开高度，无需繁琐测量，无需收发消息，也无需尺寸调整脚本。但 iframe 内部的页面必须同意该行为。这个限制条件正是该特性最值得玩味之处，因此本文会对此着重探讨。</p>
<p>我曾搭建过许多使用支付服务商 iframe 的结账页面。其目标始终是让银行卡表单看起来像原生页面的一部分，用户不应察觉它来自另一个网站。</p>
<p>然而过去 iframe 在这方面毫无助力。它拥有固定高度。如果设得太高，表单下方会出现空白缝隙；如果设得太低，页面滚动条内部又会出现内层滚动条。在移动设备上，在用户即将付款时展示那第二个滚动条简直是最糟糕的体验。于是我只能不断调大高度，在不同的手机上测试，然后再继续调高。</p>
<p>这本是一个小问题，理应有轻巧的解决方案。但多年来一直没有。</p>
<p>父页面无法窥视跨域 iframe 的内部情况，因而无从得知其内容的高度。因此唯一的办法就是让两个页面通过 JavaScript 相互通信。</p>
<p>在 iframe 内部，你需要测量内容并将高度发送给父页面：<br />在父页面中，你需要监听消息、校验消息发送方，并设置相应高度：<br />这看起来很简短，但却掩盖了诸多问题：<br />最后一个问题并未随着新特性的到来而消失，它只是转移到了浏览器底层来处理。</p>
<p>在父页面中，你只需为 iframe 添加一个 CSS 属性：<br />在 iframe 内部，该页面需要在其 &lt;head&gt; 中通过 meta 标签进行授权加入，同时声明允许哪些网站调整其尺寸：<br />对于加载后内容不再发生变化的场景，以上就是所需的全部配置。浏览器会自动测量内容并设置 iframe 的尺寸。你的代码中不再需要任何消息传递、监听器或源检查。该 meta 标签必须从一开始就存在于 HTML 中，后续通过 JavaScript 动态添加是无效的。</p>
<p>如果后续内容发生变化（例如出现错误提示、某个区域展开、加载了更多评论），iframe 内部页面只需请求浏览器重新测量：<br />因此 JavaScript 并未彻底退场。内嵌页面在其内容发生变化时仍需调用一个函数。但繁琐棘手的部分已经不复存在，如今全由浏览器一手包办。</p>
<p>frame-sizing 属性还支持 content-width、content-inline-size 以及 content-block-size。对于大多数页面而言，content-height 才是你真正需要的。你依然可以将其与 max-height: 80vh 等限制条件结合使用。</p>
<p>这是我最关注的使用场景，同时也是最依赖他方支持的场景。</p>
<p>支付表单的高度瞬息万变：卡号下方可能弹出错误提示；用户可能从银行卡切换为电子钱包；或者显示出已保存的卡片列表。借助 frame-sizing，所有这些变动都能在你的结账流程中丝滑展现。</p>
<p>但你无法单方面开启这项功能。你掌控的是结账页面的 CSS，而支付服务商掌控的是 iframe 内部的页面。只有他们才能添加该 meta 标签、列出允许的商户站点名单，并在其表单变动时调用 requestResize()。</p>
<p>因此在支付场景下，核心问题并非“Chrome 是否支持此功能？”，而是“我的支付服务商是否支持此功能？”如今大多数服务商要么提供自带的 postMessage 脚本，要么什么都不做。如果你正与某家服务商合作，不妨向他们提出这一需求。如果你本身就是开发者，对使用你服务的每一家商户而言，这都是一项低成本的高收益优化。</p>
<p>表单的每一个步骤高度各有不同。第一步只有两个输入框，第三步可能多达十个。在当下，你必须要么为最高的步骤预留足够空间，要么任由 iframe 出现滚动条。借助这项新特性，表单只需在每个步骤切换后调用 requestResize()，iframe 就会随之调整大小。</p>
<p>这种场景无需任何第三方配合。许多应用会使用带有 srcdoc 的沙盒化 iframe 来展示 HTML 邮件预览、富文本预览或代码演示。由于内嵌的 HTML 是由你自己编写的，因此你可以直接添加该 meta 标签。这或许是当下上手使用该特性的最简易切入点。</p>
<p>浏览器兼容性。该特性目前仅支持 Chromium 内核浏览器，Firefox 和 Safari 暂不支持。应将固定高度作为默认回退方案，并在支持的环境下才切换为内容自适应尺寸：<br />在 iframe 内部，调用新函数前应先进行环境检查。在兼容性普及之前，原有的 postMessage 代码可保留作为降级备用方案：<br />布局偏移（Layout shift）。iframe 会在你的页面之后完成加载，随后撑开高度，其下方的所有内容都会被向下挤压。如果 iframe 位于首屏，这可能会损害你的 Core Web Vitals 指标。设置一个合理的 min-height 可以减轻这种跳变抖动。</p>
<p>切勿无端使用 allow-origins=*。允许任意站点读取你页面的高度可能会导致信息泄露。例如，一个在用户登录后高度会增加的页面，无形中向父页面透露了该用户的状态信息。请仅列出确有需要的站点。这一机制与 CSP 的 frame-ancestors 规则协同运作，后者控制着究竟谁有权将你的页面嵌入。</p>
<p>多年以来，“让容器根据其内容自适应高度”这样一个简单的布局需求，却需要两个网站上的两段脚本协商统一的消息格式。如今，它简化为了一行 CSS 属性、一个 meta 标签，以及内容变化时的一次函数调用。</p>
<p>Chrome 端的浏览器支持已经就绪。剩下的就取决于那些构建我们所内嵌页面的人了。如果你运营着支付网关、评论服务或任何运行在 iframe 中的小部件，请尽早添加该 meta 标签。你的用户在结账和浏览页面时，将会体会到浑然一体的原生体验。</p>
<p>在后续的文章中，我将专门针对我们所在地区的支付服务商进行深入探讨。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-10 20:54 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://alfy.blog/2026/10/09/iframe-that-finally-fit-their-content.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-mmi-android-883bf45fa0f50afa" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5331" data-content-paragraphs="36" data-published-at="2026-10-10T07:20:53.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 15:20</span>
</div>

### [Android 中实现“单次点击”执行 MMI 代码](https://karansaini.com/mmi-android/)
<div class="original-title-sub"><span class="orig-tag">原文</span> 1-click MMI execution in Android</div>

<div class="article-body" data-article-body="true"><p>本文介绍了如何利用存在漏洞的拨号器应用程序，在 Android 系统中实现通过“单次点击”执行 MMI 代码。</p>
<p>我很久以前就知道，拥有 CALL_PHONE 权限的 Android 应用除了拨打常规电话号码外，还可以拨打 USSD 和 MMI 代码。自从知晓这一点以来，我一直想开发一种攻击方式，在极少或无需用户交互的情况下，从某个应用程序或网页执行 MMI 代码。三年前，我曾创建过一个概念验证（PoC），通过滥用 CALL_PHONE 权限在手机上静默设置呼叫转移。但这显然需要用户侧载（sideload）恶意应用程序，从而削弱了其实际影响。上个月，我发现并报告了一些漏洞：当用户设备上安装了存在漏洞的拨号器应用时，攻击者即可实现“单次点击”执行 MMI 代码。</p>
<p>MMI 和 USSD 代码是在拨号盘中输入的一串由数字、星号和井号组成的字符，但它们并不是普通的电话号码——例如 *123#、*#06#、**21* # 等。两者均由 3GPP 规范定义：人机接口代码（Man-Machine Interface codes）定义在 TS 22.030 中，非结构化补充业务数据（Unstructured Supplementary Service Data）定义在 TS 22.090 中。在设备端，这些代码只能通过拨号器（或 SIM 卡应用）调用。</p>
<p>android.permission.CALL_PHONE 是一个普通的运行时权限。你的设备上可能已经有少数应用程序获得了此权限（例如 WhatsApp、Signal、Truecaller）。用户在授予该权限时看到的提示文本为“拨打和管理电话”。</p>
<p>用户看到的 CALL_PHONE 权限提示对话框。截图由 Raghav Aggarwal / ProAndroidDev 提供。</p>
<p>问题在于两方面：</p>
<p>所有这一切的前提条件是：一个拥有 CALL_PHONE 权限的应用，同时向其拨号路径暴露了一个可通过浏览器访问的深层链接（deeplink）。这种应用程序将我们的本地利用能力转化为了远程利用能力。这两个特性单独来看都并不起眼，但结合在一起时，便可实现“单次点击”执行 MMI 代码。</p>
<p>为了了解可通过浏览器访问的拨号器深层链接有多普遍，我对 88 款通话、拨号器和 VoIP 应用进行了清单文件（Manifest）级别的扫描。在这些应用中，有 66 款声明了 CALL_PHONE 权限，有 54 款暴露了某种可通过浏览器访问的拨号接口。需要指出的是，其中大多数应用只会将传入的号码预填到拨号盘中，而不会直接拨打，这意味着就现状而言，并非所有这些应用都可被利用。</p>
<p>该扫描并不是存在漏洞的应用数量统计。某个具体应用是否能被以此种方式滥用，取决于该应用如何处理其深层链接。此次扫描生成了一份值得深入检查的候选应用列表。</p>
<p>顺着这些候选应用排查，我首先在模拟器（API 34，Android 14）上展开测试，因为我手头最初没有现成的物理 Android 设备。在模拟器中测试的一个额外好处是，可以使用 dumpsys 捕获电话通信行为。第一次尝试从网页触发拨号器的深层链接就成功了！遗憾的是，Google 要求向其报告的安全漏洞必须在发布时间不超过 30 天的系统构建版本上进行测试。接着我尝试启动 Android 17 模拟器，但在获取可正常运行的镜像时遇到了问题，因此我暂停了一会儿，尝试找一台实体手机来进行端到端的行为验证。</p>
<p>经过一番寻找，我设法搞到了一台物理真机——运行 Android 16（One UI 8.5）的三星 Galaxy M16 5G，构建版本为 BP4A.251205.006.M166PXXS7DZG1，安全补丁级别为 2026 年 7 月 5 日。这使我能够在真实的运营商网络而非模拟网络环境中验证该行为。最终我也成功让 Android 17 模拟器镜像跑了起来，并在其上重新运行了全部流程，结果完全一致地复现了。</p>
<p>ACR Phone / Cube ACR（com.nll.cb，安装量超过 500 万次）包含一个 Intent 过滤器，声明了操作 android.intent.action.CALL_BUTTON、类别 android.intent.category.BROWSABLE 以及 tel: 数据协议（scheme）。该 Intent 解析后对应的 Activity 会将 tel: 数据传递给自动拨号路径，也就是说，传入的字符串会被直接拨出，而不会呈现给用户进行确认。</p>
<p>Chrome 的 intent: URI 语法允许网页为其发出的 Intent 指定任意 Action。Chrome 在派发之前执行的唯一检查，就是确认解析该 Intent 的过滤器是否声明了 BROWSABLE；它不会对 Action 本身应用任何过滤。因此，网页可以随意指定 CALL_BUTTON，此时 ACR 的自动拨号路径就会运行，传入的字符串将以 ACR 自身持有的 CALL_PHONE 权限执行，而非依赖浏览器持有的任何权限。</p>
<p>还有一个前提条件是 ACR 特有的：除了持有 CALL_PHONE 之外，它还必须持有 DIALER 角色——DialerActivity.a0() 会检查默认拨号器状态，否则将重定向到其设置页面。对于替代型拨号器（如 ACR）而言，这两个条件都是符合预期的，但都不是系统默认的。此外，这些前提条件仅适用于此演示场景，而非底层问题本身；底层问题在于：对于任何 CALL_PHONE 权限持有者，无论其具备或不具备何种角色，在执行 MMI 时都缺乏用户同意和确认机制。</p>
<p>我运行了两个载荷：下面的余额查询，以及下一节中的呼叫转移设置。两者均执行成功。在这两种情况下，末尾的井号均进行了百分比编码，写作 %23：</p>
<p>字面量的 # 可以在 Intent.parseUri() 处理后保留下来（该方法通过 lastIndexOf(&quot;#Intent;&quot;) 而非查找 URI 中的第一个井号来定位 Fragment），但在后续的拨号路径中井号会丢失，字符串剩余的部分随后会被当作普通电话呼叫拨出，而不是作为 MMI 代码处理。因此必须使用 %23。</p>
<p>点击链接不会弹出应用选择器——因为 ACR 是该操作下唯一同时匹配 BROWSABLE 和 tel: 协议的处理器——也不会出现任何形式的确认提示。从 dumpsys activity recents 捕获到的 Android 所传递的 Intent 如下：</p>
<p>以及来自 dumpsys telecom 的对应电话记录：</p>
<p>DIALED_MMI 意味着系统框架将传入的字符串作为 MMI 代码进行了处理，而不是将其作为普通号码拨打。从点击到呼叫建立所耗费的时间大约为 1.3 秒，除了单次点击之外无需任何其他交互。</p>
<p>在 Android 17 上的复现情况。在状态栏时钟旁可以看到呼叫转移指示图标。</p>
<p>MMI 代码的执行绝不会被添加到通话列表中，因此通话记录中没有任何可供查看的痕迹。唯一肉眼可见的痕迹是一个在约两秒后自动消失的对话框，以及状态栏中的呼叫转移指示图标——我怀疑极少有用户能识别出该图标或采取相应行动，更不用说将其与当天早些时候点击过的某个链接联系起来了。即使用户怀疑发生了异常，也没有任何可供他们确认的记录留存。</p>
<p>上述一切都建立在所选应用具有可自动拨号的公开深层链接这一基础之上。然而，在 Android 17 上进行测试时，我偶然发现了平台层面的一个相关变动，该变动甚至消除了这一前提要求。该问题已另行报告，且仅在模拟器上得到了证实。</p>
<p>Android 17 将 Telecom 移入了 com.android.telephonycore Mainline 模块，并将其用户界面拆分到了一个独立的特权应用中。com.android.server.telecom 现在只是一个垫片（shim），它将接收到的 ACTION_CALL Intent 重新针对 com.google.android.telecomui 启动，而 telecomui 随后以其自身身份调用 TelecomManager.placeCall()。在这一交接过程中，最初发起呼叫的应用包名并未被传递。由于 telecomui 拥有 CALL_PRIVILEGED 权限，Telecom 所评估的身份是一个特权拨号器，原本会拦截危险 MMI 字符串的检查因此被跳过。</p>
<p>这样产生的影响是，在 Android 17 上，一个仅持有 CALL_PHONE 权限、且不具备拨号器角色（dialer role）的应用通过 ACTION_CALL 发送普通的 **21* #，就会被作为 MMI 代码分发执行，全程无需精心构造的载荷，路径中也不存在任何易受攻击的第三方应用。被评估的身份变成了 com.google.android.telecomui，而非实际发起调用的应用身份。</p>
<p>这一管控是在 Android 14 中引入的；在 Android 14 到 16 上，要达到相同的能力，需要构造一个既能绕过 MmiUtils 又能在规范化处理中存活下来的载荷。Android 17 似乎封堵了这种绕过方式，但紧接着又让这种绕过变得毫无必要。它所搭载的安全防护门槛比 Android 14 当初提供的还要薄弱。</p>
<p>我在 9 月 14 日单独报告了这一问题。Google 于 9 月 24 日将其作为重复问题关闭，理由是他们自己的一名工程师早先已报告过该问题。我申请加入该报告的关注列表，但被告知无法共享，因为这是一个包含系统机密信息的内部缺陷——但对方确认我的报告指出了相同的根本原因，即 UserCallActivity 蹦床（trampoline）丢弃了原始调用者的身份。</p>
<p>CALL_PHONE 授权静默语音呼叫既有文档记载，也是站得住脚的设计。但该授权是否应延伸至 MMI 执行，则是另一个问题。</p>
<p>一个局部修复方案是弹窗确认提示：当电话协议栈收到非用户选定默认拨号器根据用户直接输入通过 ACTION_CALL 发送的 MMI 字符串时，在执行前显示字面代码并要求确认。更彻底的修复方案则是将这两种能力完全解耦：保留 CALL_PHONE 用于拨号，并将 MMI 执行限制在一个措辞明确的专属权限或明确需确认的 API 之后——正如 TelephonyManager.sendUssdRequest() 现在的做法一样。无论哪种方法，都可以彻底消除可通过网络触达的攻击路径，而无需依赖各个开发者去修复各自的深层链接（deeplink）处理逻辑。</p>
<p>我于 2026 年 9 月 12 日向 Android 与 Google 设备漏洞奖励计划（VRP）报告了 CALL_PHONE/MMI 问题，并于 9 月 14 日在 Android 17 上进行了复测，确认该链条依然有效。该报告于 9 月 17 日被标记为“不予修复（不可行）”[Won’t Fix (Infeasible)] 并关闭。给出的评估意见是：这并非 Android 自身的漏洞，而是 ACR 等第三方拨号应用中不安全的深层链接处理所致，平台层面的加固将被视为未来的改进而非漏洞修复。</p>
<p>我对此并不认同，理由如前文所述——权限授予并未告知用户可能执行 MMI 代码的风险，而且在缺乏平台级修改的情况下，该模型的安全性完全依赖于对所有具备通话能力的应用审查深层链接自动拨号路径，我认为这是不可行的。我在回复中提出了这些观点。Google 的立场并未改变。针对“已记录此问题以供未来版本潜在修复”的含义：</p>
<p>“当我们提到‘已记录此问题以供未来版本潜在修复’时，我们的意思是团队正在研究未来改进 Android 平台的方法，以帮助防止第三方应用犯下此类错误。然而，由于这是一项整体平台改进，而不是对 Android 漏洞的直接修复，因此我们这边关闭了该报告。”</p>
<p>针对我提出的修复建议：</p>
<p>“虽然我们认同这是 Android 平台可以改进的一个领域——例如你提出的解耦权限或增加用户确认提示的建议——但此类架构层面的更改被视为平台改进，而非当前操作系统中的安全漏洞。由于该利用链依赖于第三方应用不当地暴露其拨号路径，因此它仍属于 Android 与 Google 设备漏洞奖励计划的范围之外。”</p>
<p>我于 10 月 9 日向 ACR Phone 的开发者报告了其深层链接问题，并建议在外部可访问的拨号路径上拦截 MMI 和 USSD 字符串。</p>
<p>对方的响应速度远超我的预期。开发者在 48 分钟后回复，表示已将修复代码提交至下一版本，并提供了一个测试版（beta build）供验证。开发者指出，Play 商店的发布将取决于 Google 的审核，他预计审核将在下周末左右完成。</p>
<p>CALL_PHONE 与 MMI 执行<br />TelecomUi 蹦床机制</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-10 15:20 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://karansaini.com/mmi-android/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-w-20261009-strtod-html-cf84b61307ef8599" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3956" data-content-paragraphs="43" data-published-at="2026-10-10T05:37:18.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 13:37</span>
</div>

### [哦，看来在标准C中无法以可移植的方式检查字符串到浮点数的转换错误](https://sebsite.pw/w/20261009-strtod.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> oh, apparently it&#39;s not possible to portably check for string-to-float conversion errors in standard c</div>

<div class="article-body" data-article-body="true"><p>这算是我上一篇文章的某种续篇。在上一篇中，我讨论了 math_errhandling 宏，以及 glibc 和 musl 是如何处理数学错误的（以及标准中是如何规范的）。</p>
<p>简而言之：math_errhandling 是一个宏，用于指示 math.h 函数支持哪些错误处理机制：errno（MATH_ERRNO）和/或浮点异常（MATH_ERREXCEPT）。</p>
<p>我上一篇有一件事没提到：有一族函数虽然受到 math_errhandling 的影响，但并不在 math.h 中，那就是字符串转浮点数函数：strtod、strtof、strtold、strtod32、strtod64 和 strtod128：</p>
<p>“若正确值发生溢出且默认舍入有效（7.12.2），则返回正或负的 HUGE_VAL、HUGE_VALF 或 HUGE_VALL（取决于返回类型和数值符号）；若整数表达式 math_errhandling &amp; MATH_ERRNO 非零，则整数表达式 errno 取值 ERANGE；若整数表达式 math_errhandling &amp; MATH_ERREXCEPT 非零，则引发‘溢出’（overflow）浮点异常。<br />若结果发生下溢（7.12.2），函数返回一个量级不大于返回类型中最小规范化正数的数值；若整数表达式 math_errhandling &amp; MATH_ERRNO 非零，errno 是否取值 ERANGE 由实现定义；若整数表达式 math_errhandling &amp; MATH_ERREXCEPT 非零，是否引发‘下溢’（underflow）浮点异常由实现定义。”</p>
<p>这些函数的 Linux man 手册对此完全只字未提，这其实是有原因的，我稍后会讲。但标准的意思是：如果 math_errhandling 没有声明支持 errno（例如在 musl 上就是如此），那么字符串转浮点函数在出错时不会设置 errno。此外，如果结果发生下溢，函数甚至根本不需要报告错误。</p>
<p>请记住，仅凭返回值不足以判断是否发生了错误，因此要测试溢出，你必须使用这两种错误处理机制之一。</p>
<p>以下是我尝试写出的一种符合标准、可移植地检查字符串转浮点函数中溢出/下溢错误的方法：</p>
<p>请注意，这仍然不能保证检测到下溢，因为报告下溢对实现来说完全是可选的。</p>
<p>你从来没这么做过的原因（也是 man 手册没有提及的原因）是 POSIX 对这些函数的规定有所不同：</p>
<p>“若正确值超出可表示值的范围，应返回 ±HUGE_VAL、±HUGE_VALF 或 ±HUGE_VALL（取决于数值符号），并将 errno 设置为 [ERANGE]。<br />若正确值会导致下溢，应返回一个量级不大于返回类型中最小规范化正数的数值，并将 errno 设置为 [ERANGE]。”</p>
<p>所以 POSIX 根本不在乎 math_errhandling；它始终要求实现如果发生溢出或下溢就必须设置 errno。尽管 POSIX 对函数提出比标准 C 更严格的要求并不罕见，但 man 手册从未注明这是一种扩展（无论 strtod(3) 还是 POSIX 规范 strtod(3p) 都没有注明），这让我非常震惊。</p>
<p>POSIX 的这种行为是否与标准 C 兼容……尚不明确。至少对于 math.h 函数，无论 math_errhandling 的值是多少，都允许设置 errno：</p>
<p>“若发生定义域、极点或范围错误，且整数表达式 math_errhandling &amp; MATH_ERRNO 为零，则 errno 应被设置为与错误对应的值，或者保持不变。”</p>
<p>但此前在规范 errno.h 时，标准是这样说的：</p>
<p>“[...] 库函数调用可将 errno 的值设置为非零，无论是否存在错误，前提是本文档中该函数的描述中未说明 errno 的使用。”</p>
<p>而在这些函数的描述中已经说明了 errno 的使用，且该描述并未提及在 math_errhandling &amp; MATH_ERRNO 为零时设置 errno。因此这表明 POSIX 的行为是不符合标准的。</p>
<p>但先等等！我到目前为止所说的全部内容仅针对溢出和下溢。如果字符串格式错误且无法解析为数字，标准根本没有规定任何错误：</p>
<p>“这些函数返回转换后的值（若有）。若无法执行转换，则返回正零或无符号零。”</p>
<p>相反，你应该使用 endptr 参数，并在调用后检查 endptr == nptr（即结束指针与起始指针相同，意味着未解析任何数据）：</p>
<p>“若主题序列为空或不具有预期的形式，则不执行转换；在 endptr 不是空指针的前提下，nptr 的值将存储在 endptr 所指向的对象中。”</p>
<p>man 手册 strtod(3) 的描述类似：</p>
<p>“若未执行转换，则返回零，且（除非 endptr 为空）nptr 的值将存储在 endptr 所引用的位置。”</p>
<p>但看看 POSIX 是怎么说的：</p>
<p>“成功完成后，这些函数应返回转换后的值。若无法执行转换，应返回 0，并且 errno 可能会被设置为 [EINVAL]。”</p>
<p>“可能”（may）这个词基本意味着它是由实现定义的。但这是个大问题，因为通常人们会通过类似这样的方式来检查错误：</p>
<p>strtod(3) 正是建议这么做的：</p>
<p>“由于在成功和失败时都可能合理地返回 0，因此调用程序应在调用前将 errno 设置为 0，然后在调用后通过检查 errno 是否为非零值来确定是否发生了错误。”</p>
<p>但即使对于兼容 POSIX 的 libc 而言，这也是不可移植的！不同的合规 libc 在无法执行转换时的行为可能不同。事实上……</p>
<p>在 glibc 上，这会打印 0，因为 glibc 的 strtod 从不将 errno 设置为 EINVAL。而在 musl 上，它确实会将 errno 设置为 EINVAL，因此会打印“22”。这在 Linux man 手册上完全没有记录。</p>
<p>而且在我看来，这也不符合标准 C，因为在一个具有其他已说明错误条件的函数中，它将 errno 设置为了非零值（而就标准 C 而言，无效输入并不算错误条件）。musl 可能会为自己辩解说，由于它在 math.h 函数中不设置 errno，因此 strtod 描述中的 errno 条件不再适用，所以不存在关于 errno 的已说明用法（因为 errno 的使用取决于 math_errhandling 的值）。但这显然太牵强了。</p>
<p>无论如何，很明显标准在这里需要更清晰的措辞。</p>
<p>纯粹为了好玩，我想在最后列出在字符串转浮点函数中检查错误的全部“正确”方式，以彻底讲清这一点：</p>
<p>如果你的目标平台是 POSIX，在调用之前将 errno 设为 0，调用后检查 copysign(result, 1.0) == HUGE_VAL &amp;&amp; errno == ERANGE。</p>
<p>否则，在调用之前将 errno 设为 0 并调用 feclearexcept(FE_OVERFLOW)；如果在调用后 copysign(result, 1.0) == HUGE_VAL，则根据 math_errhandling 的值，检查 errno == ERANGE 或 fetestexcept(FE_OVERFLOW)。</p>
<p>如果你只针对单一实现，并且事先知道它支持哪种错误报告方式，你可以跳过对 math_errhandling 的检查，只支持其中一种方式即可。</p>
<p>如果你使用了 feclearexcept/fetestexcept，请确保编译器知晓你可能会访问浮点环境：在 GCC 上，相关的编译标志是 -ftrapping-math，这也是默认设置（除非你使用了 -ffast-math）。标准中也有专门为此设计的 pragma 指令：#pragma STDC FENV_ACCESS ON。不过 GCC 并不支持该 pragma。</p>
<p>如果你的目标平台是 POSIX，在调用之前将 errno 设为 0，调用后检查 result == 0.0 &amp;&amp; errno == ERANGE。</p>
<p>务必明确检查 errno 是否为 ERANGE，而不仅仅检查其是否为非零。否则你最终会遇到不可移植的隐患。</p>
<p>否则，如果你只针对单一实现，请查看它是否在文档中说明了 math.h 函数中发生下溢时的行为。由于该行为是由实现定义的（implementation-defined），技术上要求它必须写入文档。但在实践中，即便是 Clang 也懒得为自己那些由实现定义的内容写文档，所以别抱太大希望。</p>
<p>但如果确实有文档记录，且它会报告下溢错误，那么根据该实现中 math_errhandling 的取值，要么在调用前将 errno 设为 0 并在调用后检查 result == 0.0 &amp;&amp; errno == ERANGE，要么在调用前调用 feclearexcept(FE_UNDERFLOW) 并在调用后检查 fetestexcept(FE_UNDERFLOW)。</p>
<p>否则你就彻底没辙了。</p>
<p>如果你真的非常需要检测下溢，而且出于某种原因必须使用 libc 函数，我能想到的唯一办法是：检查 result == 0.0，如果是，则自行检查输入字符串在指数符号前是否包含任何非零数字。如果包含，则发生了下溢。不过要把这部分写对非常困难；请务必阅读标准中关于 strtod 等函数的描述，确保覆盖所有边界情况。</p>
<p>将 &amp;endptr 作为第二个参数传入函数，然后检查 endptr == nptr。不能依赖 errno。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-10 13:37 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://sebsite.pw/w/20261009-strtod.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--the-typescript-compiler-a197f1710ee2fd1b" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2165" data-content-paragraphs="34" data-published-at="2026-10-10T05:34:40.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 13:34</span>
</div>

### [为 TypeScript 编译器添加 Go 语言的 defer 语句](https://healeycodes.com/adding-defer-to-the-typescript-compiler)
<div class="original-title-sub"><span class="orig-tag">原文</span> Adding Go&#39;s defer to the TypeScript Compiler</div>

<div class="article-body" data-article-body="true"><p>我原本想探究一下为 TypeScript 编译器添加 Go 语言的 defer 语句究竟有多难，但当我完成时，我已经确信它大概本就不该存在。</p>
<p>在 Go 语言中，defer 语句会将某个函数的执行推迟到其外层函数结束时。它最常用于将资源获取与清理逻辑放在一起，比如获取信号量：</p>
<p>TypeScript 并没有严格等价于 defer 的机制。你可能会使用 try/finally，例如：</p>
<p>但这显得有点丑陋。</p>
<p>为了好玩，我们可以尝试修改 TypeScript 编译器，强行加入一个 defer 语句并获得类似 Go 的语义。由于 defer 并不能直接映射到现有的 JavaScript 特性，我们需要输出能够在运行时像在 Go 中一样工作的 JavaScript 代码。</p>
<p>因此，我们的目标是能够编写出类似这样的 TypeScript 代码：</p>
<p>TypeScript 编译器（tsc）本质上是一个静态分析引擎。它的复杂性在于对一种本质上属于动态的语言进行类型检查，并支持极致的增量编译以满足 IDE 中的延迟要求。</p>
<p>对我们来说幸运的是，为了添加 defer 语句，我们并不需要对类型或其他分析操心太多。tsc 已经具备了“识别语法 X，并用等价语法 Y 替换”的机制。</p>
<p>例如，在针对 ES5 进行编译时：</p>
<p>可能会变成类似这样的代码：</p>
<p>从概念上讲，添加 defer 意味着做另一次语法树重写。tsc 已经执行了大量的 AST 到 AST 的转换（例如，可选链 ?. 会被转换为条件表达式），因此我们无需引入新的工具链。</p>
<p>虽然其中有些复杂细节需要深入研究，但在宏观层面上，我们将接受包含 defer 的 AST：</p>
<p>并将其转换为类似这样的内容：</p>
<p>首先，我们需要让 tsc 的解析器识别出 defer 是一个语句。在语法类型（SyntaxKind）列表中，我们添加了 DeferStatement，并将其定义为接受单个表达式操作数。</p>
<p>我们需要执行一些检查，例如确保 defer 语句出现在函数体内、确保该表达式是可调用的，并确保 tsc 执行其常规的递归检查：</p>
<p>实际的转换代码非常冗长，因此与其在这里逐一复现，我不如深入探讨我所做的设计决策，并详细讲解该转换是如何运作的。</p>
<p>为了契合 Go 的行为，被调用方、接收者和参数值都会被立即捕获：</p>
<p>我们需要应对的一种极端情况是可调用方法被重新定义，例如：</p>
<p>即使 logger.log 稍后被重新赋值，被延迟的调用仍然会调用最初的方法。这与 Go 的语义一致，即当执行到达 defer 语句时，函数值、接收者和参数都会立即完成求值。</p>
<p>任何包含至少一个 defer 的函数都会获得一个小型栈，每个执行到的 defer 语句都会向该栈推入一个闭包。当函数退出时，该栈会以相反的顺序（后进先出）被清空。</p>
<p>它会被转换为类似这样的代码：</p>
<p>我并没有为 defer await 凭空捏造一套语义，而是直接将其作为错误拒绝。我担心用户会误以为 await 会在该函数的其余部分运行之前就被 resolve。此外，如果外层函数是 async 的，那么在清理阶段，每个延迟调用的结果都会被按序 await。</p>
<p>清理代码同样可能会失败，因此该转换遵循三条规则：</p>
<p>Go 并不需要像这样的聚合策略，因为在 Go 中普通错误就是值。除非用户显式决定处理，否则延迟调用返回的错误根本不会被捕获处理。然而 JavaScript 的异常属于控制流。因此，当编译后的 defer 代码抛出错误时，必须决定是将其替换、合并，还是为了保留原始失败而将其忽略。</p>
<p>由于 async 函数会将抛出的异常和被拒绝的 await 都转换为 Promise rejection，因此转换对于同步 throw 和异步清理的 rejection 都需要一条明确的规则：</p>
<p>如果 asyncCleanup() 也发生了 reject 或抛出异常，则 f() 会以 AggregateError 的形式 reject。</p>
<p>具讽刺意味的是，实现 defer 的过程反而让我确信它并不属于 TypeScript。</p>
<p>我处理的边缘情况越多，就越发觉得 defer 不适合 TypeScript。Go 的 defer 显得自然得多，是因为错误是值而不是控制流。在 TypeScript 中，一旦清理逻辑可以抛出异常或发生 reject，你就需要针对聚合、优先级和异步执行制定策略，而这些策略在 Go 中根本不需要存在（panic 是通过 Go 独立的 panic 和 recover 语义来处理的）。</p>
<p>但希望并未破灭。ECMAScript 的“显式资源管理”（Explicit Resource Management）提案从另一个方向解决了相同的问题。</p>
<p>以上面的 async-sema 为例，不再使用 defer：</p>
<p>我们可以使用 Disposable：</p>
<p>我更希望不必去定义一个像 _ 这样未使用的变量，但可释放资源的工作机制就是在它们离开作用域时进行清理。</p>
<p>因此，我更青睐但遗憾的是目前尚不支持的语法是：</p>
<p>你可以在我的 TypeScript 复刻（fork）仓库的这个分支上找到 defer 的最小可行实现（MVP）。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-10 13:34 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://healeycodes.com/adding-defer-to-the-typescript-compiler" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::