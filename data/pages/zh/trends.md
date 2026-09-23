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
<div id="story-xing-with-minimal-effort-9533b05a654907c0" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1863" data-content-paragraphs="14" data-published-at="2026-09-23T05:08:03.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-23 13:08</span>
</div>

### [以最小代价实现沙箱化](https://yorickpeterse.com/articles/sandboxing-with-minimal-effort/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Sandboxing with minimal effort</div>

<div class="article-body" data-article-body="true"><p>几天前，我为 Inko 合并了一个我认为相当有趣的新功能：以极小的代价为应用程序提供沙箱化能力。</p>
<p>尽管内存安全是 Inko 的一个目标（忽略诸如 FFI 之类的常规例外逃生通道），但内存安全所能达到的效果终究有限。最显著的原因在于，代码仍然是由开发者编写的，而总体而言开发者是容易犯愚蠢错误的，包括我自己。而且，让大语言模型（LLM）代劳编写并不能改善现状；如果有任何变化的话，情况反而会更糟，毕竟普通 LLM 的智力水准相当于一只染上酗酒恶习的会说话的鹦鹉。</p>
<p>一种由 Docker 推广开来的方法是在容器中运行程序。这不仅是因为它让分发变得更容易，还因为可以对容器施加额外的限制，比如限制它有权访问的文件。例如，本网站由 shost 提供服务，这是一个用 Inko 编写的静态文件服务器。为了运行该服务器，我使用了以下 Podman quadlet：</p>
<p>如果你不熟悉 quadlet，它们本质上是用于借助 Podman 运行容器的 systemd unit 文件。它有点类似于 Docker Compose，但用起来要舒服得多。</p>
<p>无论如何，这里的关键在于，在上述 quadlet 中我对容器施加了一些限制：除了“bind”权能外丢弃了所有其他 capabilities，并且需要提供服务的文件被以只读卷的形式挂载到容器中。哦，如果你好奇那行 UserNS 是用来做什么的，那是为了绕过这个已知问题。</p>
<p>现在看来这一切都很棒，但如果应用程序本身就内置某种机制来限制自身权能，无论它以何种方式运行，那就更好了。</p>
<p>幸运的是，大多数主流操作系统都提供了某种让应用程序自我沙箱化的途径。例如，在 Linux 上可以使用 Landlock，而在 macOS 上可以通过 sandbox_init 使用 Seatbelt。FreeBSD 则拥有 Capsicum，OpenBSD 则有 pledge 和 unveil。</p>
<p>Inko 提供的沙箱 API 利用了这些底层原语，提供了一种跨平台的应用程序沙箱化方式，并尽可能尝试处理特定平台的行为与差异。例如，在 macOS 上允许执行某个文件很容易，但在使用 Landlock 时，你还必须为 ELF 程序解释器（在大多数情况下为 /lib64/ld-linux-x86-64.so.2）配置相应的规则。如果共享库位于非标准位置，你还需要确保这些库能够被读取。</p>
<p>当然，这个新 API 也并非没有权衡。最显著的是，在 FreeBSD 上该沙箱是一个空操作（no-op）。这并不是因为我懒得使用 Capsicum，而是因为 Capsicum 要求你从根本上改变程序的架构。在 Linux 和 macOS 上，除了列出沙箱规则所需的几行代码（即上述 enable_sandbox 方法）之外，你无需更改程序即可应用沙箱限制。相反，Capsicum 的工作机制略有不同：一旦调用了 cap_enter，你便无法再使用像 open 这样的常规系统调用来打开资源。取而代之的是，Capsicum 要求你要么在调用 cap_enter 之前打开所有相应资源，要么提前打开目录，然后使用 openat 相对该目录打开资源。在某些情况下，你可能还必须使用 libcasper。当然，对于简单的程序来说这可能算不上大问题，但对于较大的程序，这可能需要对其编写方式进行广泛修改。openat 本身也存在自身的问题。</p>
<p>这并不是说你无法让 Capsicum 正常工作，或者说它有什么“不好”，而是意味着（不幸的是）在许多情况下你无法使用 Capsicum，除非你愿意专门迎合 FreeBSD 和 Capsicum 来调整你的程序。</p>
<p>那么使用这个新 API 为 Inko 应用程序建立沙箱究竟有多难呢？好吧，以下就是沙箱化 shost 所需的全部内容：</p>
<p>也就是说：我们允许访问包含 TLS 证书的目录（如果启用了 TLS），允许访问包含待分发文件的目录，并允许绑定到服务器监听的 TCP 端口（例如启用 TLS 时的 443）。其他一切都被拒绝。</p>
<p>鉴于 shost 已经运行在一个受限容器中，人们可能会认为对其应用沙箱是多此一举，但使用这个新 API 实在太简单了，以至于完全没有理由不用它。</p>
<p>这让我想起在结束今天的话题之前值得重申的一点：一项安全功能的价值不在于它能做什么，而在于它的易用性。我认为 Inko 提供的 API 在实现这一点上做得相当出色，尽管由于它是我编写的，我可能会带有一些偏见。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>作者为编程语言 Inko 合并了一项新功能，旨在以极小的代价为应用程序提供沙盒隔离能力。</li>
    <li>Inko 的沙盒 API 利用主流操作系统的原生机制实现跨平台沙盒化，在 Linux 上使用 Landlock，在 macOS 上通过 sandbox_init 使用 Seatbelt，在 FreeBSD 上对应 Capsicum，在 OpenBSD 上对应 pledge 和 unveil。</li>
    <li>来源叙事重点：介绍 Inko 语言最新实现的跨平台应用级沙盒 API，强调安全特性的关键在于极低接入成本与易用性，并通过底层操作系统机制（如 Landlock、Seatbelt）的技术差异解释其权衡设计</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://yorickpeterse.com/articles/sandboxing-with-minimal-effort/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-map-you-talk-to-over-tcp-c806b81b8accbee3" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5701" data-content-paragraphs="45" data-published-at="2026-09-23T05:00:36.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-23 13:00</span>
</div>

### [Redis 不是一个通过 TCP 通信的 Map](https://blog.verygoodsoftwarenotvirus.dev/posts/2026/09/22/redis-is-not-a-map-you-talk-to-over-tcp/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Redis is not a map you talk to over TCP</div>

<div class="article-body" data-article-body="true"><p>我在一家零工经济配送 App 工作，负责开发决定将配送订单派发给哪位骑手的服务。当你打开 App 下单让人送货时，系统中的某段代码就必须决定应该将这单活派发给哪位骑手。我们就是负责派发这些订单的人。</p>
<p>我不便透露参与决策的无数参数，但即便不甚了解内情，从外部也能轻易推断出一个非常显而易见的因素：距离。为了做出优质匹配，我们必须确切知道每个人到底有多远。直线距离会盲目地告诉你河对岸的骑手很近，因此我们真正需要的指标是行驶时间。为此，我们依赖于一个路线规划引擎（routing engine），而它正是我们自身延迟的最大来源，且远超其他因素。它变慢时，我们就会变慢；而我们变慢时，App 的产品体验就会变差。</p>
<p>一个繁忙的区域在进行单轮派单评估时，就需要极其庞大的路线估算量，而且只要业务在运转，就需要持续不断地进行估算。业务量并不是谁能够自由选择的。规模是硬性需求，而不是优化指标。（稍后会对此做更多说明。）</p>
<p>这些估算的一个有用特性在于，它们经常高度重复。离我隔着三户人家的邻居去杂货店所花的时间，和我去杂货店的时间并无实质性差异；而我们俩开车去那家杂货店，跟开车去杂货店停车场里的加油站相比，也几乎感觉不出区别。与此同时，餐馆是完全静止不动的。相隔一个街区的两名骑手会产生两个几乎相同的路线请求，而 30 秒后，他们从两个新位置又会产生另外两个请求。</p>
<p>如果在我们与路线规划引擎之间没有任何形式的缓存层，你注定会做大量重复工作，以固定的频率反复计算在实际功能上毫无二致的距离，有时一算就是几十分钟。</p>
<p>进程本地缓存解决不了问题：计算估算结果的进程很少是下一次需要该结果的进程，因此缓存必须是共享的。</p>
<p>我并不喜欢条件反射般地动用缓存——按经验来看，它往往是天真的开发者手中那个“但这能让它变快！”的万灵药按钮。不过这一次，感觉它确实契合了我们的需求，且方式有所不同。</p>
<p>直接基于原始经纬度坐标进行缓存是行不通的。你需要使用 H3 来对坐标进行去重。H3 以不同分辨率将地球切分为六边形网格，并为包含特定坐标的六边形提供一个稳定的 ID。将起点和终点对齐吸附到对应的六边形上，这两个六边形内的所有坐标对就会折叠并合并为一个缓存键（cache key）。</p>
<p>分辨率就像一个精度调节旋钮。较低的分辨率能带来极高的命中率，但结果精度较差；较高的分辨率给出的结果则几乎对任何人都没有复用价值。分辨率直接嵌入在缓存键本身，而不是隐式假设的，因此两种分辨率可以在缓存中并存，你可以无缝在它们之间切换而无需清空缓存。</p>
<p>因此，缓存键的形式是 : : ，值是估算结果，而写入路径使用的是 MSET。批量计算，批量写入。我拍了拍手上的灰尘，把代码发布上线，坐下来准备迎接规模化带来的红利。</p>
<p>结果它根本无法扩展，连一丁点扩展性都没有。</p>
<p>我们的 Redis 是一个集群，而集群版 Redis 会将键空间划分为 16,384 个哈希槽（hash slot），分散在各个主节点（primary node）之间。像 MSET 这样的多键命令，只有当其中包含的每一个键都落在同一个哈希槽中时才是合法的。</p>
<p>我是通过链路追踪（trace）发现这一点的。一次单独的读取在追踪中显示为数十个独立的 MGET span，每个 span 只针对单个键，而这很可能还是少算的结果。根 span 记录了总键数，但这个数字与幸存下来的子 span 数量完全对不上，因此 OpenTelemetry 收集器几乎肯定丢弃了一部分。我们的最大读取延迟指标远高于预期的最坏情况。我就是这样意识到槽（slot）的存在的。</p>
<p>键落在哪个槽中，既不可配置也不是随机的。它的计算公式是 CRC16(key) mod 16384，因此哪怕两个键只差一个字符，也会落到毫无关联的槽中——这对于均匀分布来说非常棒，但对批量操作而言却是灾难性的。我的键里的每一个都拥有不同的起点 hex 和终点 hex。任意两个键落入同一个槽的概率，在实际中就是 1/16,384。</p>
<p>客户端并没有胡来。多键命令只能寻址一个槽，因此设计良好的客户端会接收你对大量键的单次 MGET 请求，按各自所属的槽进行分组，并将每个分组通过各自的连接发送出去。鉴于我塞给它的键，这种做法完全是正确的。在任何配置组合下，每个键对应一次 MGET 都不可能快得起来。修复方案不在于客户端配置，而在于不能给它分布在如此多不同槽中的键。写入路径也患有同样的毛病，只是表现形式不同：要么直接抛出 CROSSSLOT 错误，要么每个键执行一次 SET 并消耗一次网络往返（round trip）。</p>
<p>Redis 恰好针对这种情况提供了一个逃生通道，叫做哈希标签（hash tag）。如果一个键包含花括号之间的一段文本，那么 Redis 只对花括号内的文本进行哈希运算，并忽略键的其余部分。这意味着你可以有意识地决定哪些键共享同一个槽。</p>
<p>89283082a53ffff:892830828efffff:9</p>
<p>这里的陷阱在于你选择在花括号里放什么。极具诱惑的做法是放一些具语义的内容：比如按起点 hex 打标签，这样从同一个 hex 出发的所有路线就能批处理在一起。而这正是制造热点（hot spot）的根源。晚高峰就餐时间的市中心对应着同一个 hex、同一个标签、同一个槽、同一个节点，此时这个节点已经不堪重负被“烧冒烟”，而集群的其他部分却在闲置打瞌睡。</p>
<p>你真正想要的，是某种任意键虚无主义（arbitrary key nihilism）。你希望标签本身完全不携带任何业务含义，并且选取的标签能让桶（bucket）均匀分布在整个集群中。</p>
<p>因此，标签变成了一个通过暴力穷举得出的整数。标签实际上是一个模板，类似 {routing:v1: }，在启动时我们让 n 从零开始递增，每次对整个标签计算哈希，查看其落入的槽归属于哪台主节点。如果该节点仍有空位，就保留这个整数；如果满了，就扔掉它并尝试下一个。当每个节点都达到我们要求的数量时停止。</p>
<p>这样产生的结果便是一组已知有效的整数地址列表：每个节点分配设定数量的地址，并刻意分散在所有节点上。任何具体的数字都没有特殊意义；它只是哈希值恰好落在仍有空位的节点上的首个整数。比如两台节点各分配两个，结果可能是 1、2、3、5。如果每台节点要三个，接下来的数字可能就是 8 和 11。整个结果是集群形态的函数，并且在进程每次启动时都会确定性地重新计算。</p>
<p>一旦由标签来发挥作用，包含数千个键的一批请求就可以被拆分成屈指可数的几堆，而每一堆都是针对单一节点的合法多键命令。</p>
<p>单凭大脑推理哪些整数会落到哪里是不可能的，因此这里是实际运行的遍历过程。从零开始的每个整数都会被放入标签中，使用 Redis 相同的 CRC16 进行哈希计算，并分配给拥有其所落入哈希槽的主节点。如果该主节点仍有空间，则保留该整数；如果没有，则将其丢弃，遍历继续处理下一个整数。</p>
<p>保留下来的整数看起来很随意，因为它们只是那些 CRC16 刚好落在我需要的位置上的数字。在初期，几乎所有整数都会被保留，因为每个主节点都有空间。只有接近尾声、集群大部分已满且遍历正在寻找最后几个空位时，它才开始丢弃数字。改变主节点的数量，整个结果就会完全改变，这真实反映了重新分片（resharding）对此类方案带来的影响。</p>
<p>收敛这种扇出（fan-out）解决了跨度（span）数量的问题，但它重要的第二个原因在于：并发请求落在哪一个节点上，决定了这种并发是否真正起到了任何作用。</p>
<p>天真地看，你可以直接拿你的键列表进行分块，然后把这些块扇出分配给若干 goroutine。这感觉像是在并行，但实际上大多并非如此。如果这些块没有按目标节点进行组织，其中几个块就会同时针对同一个节点，而该节点只能串行依次处理它们，与此同时其他节点却处于闲置状态。你的吞吐量上限最终取决于最倒霉的那个节点串行处理的能力。</p>
<p>因此，在任何数据发送到网络之前，我们都在本地为每个键计算哈希槽（这只是开销很小的 CRC16），并按槽进行分组。这样，扇出就是针对节点而不是随意的块展开的，并且每个正在传输中的请求都在不同的地方做着有意义的工作。</p>
<p>接下来这个才真正让我恼火。缓存的路线预估必须有过期时间。SET 支持 EX 参数，而 MSET 什么都不支持。根本没有 MSETEX。你要么选择批量写入，要么选择 TTL，Redis 概不两全其美。</p>
<p>常规的变通做法是为每个键使用流水线（pipeline）发送 SET ... EX，这以将一条命令变为数千条命令为代价换取了正确性。或者你可以先执行 MSET，然后在第二轮执行 EXPIRE，这会使你的命令数量翻倍，并且留下一个时间窗口：一旦两次操作之间发生崩溃，键就会被永久滞留在缓存中。</p>
<p>解决方案是改为向 Redis 发送一个脚本。EVAL 会在节点上原子性地运行 Lua 脚本，而这个脚本可以完成 MSET 拒绝支持的任何操作。</p>
<p>最后一个问题事后看来令人汗颜。缓存的值最初是 JSON 格式，因为理应如此嘛。它就是两个数字——一个时长和一个距离，被包裹在世界上最方便的序列化格式中。</p>
<p>在我们的规模下，“最方便”和“开销最小”不再是一回事。每一次读取都意味着一次完整的 JSON 解码，这消耗了相当可观的 CPU 时间。</p>
<p>于是该值变成了 CSV 格式：412.3,5120.7。体积更小，没有字段名，没有反射，解析只需要一次 strings.Cut 和两次 strconv.ParseFloat 调用。</p>
<p>这一切都不是一蹴而就的。它是多次艰难摸索前行的产物，每一步都是我在看到前一步以未曾预料的方式失败后所获得的教训。</p>
<p>作为一个 Go 语言狂热者，我自然对 Rob Pike 充满崇敬，尤其是他的“编程五原则”（5 rules of programming）。其中有两条恰恰描述了我走到今天这一步的原因：</p>
<p>规则 2：度量。在进行度量之前不要去调优速度；即使度量过了，除非代码的某一部分在开销上彻底压倒了其他部分，否则也不要去调优。</p>
<p>规则 3：当 n 很小时，花哨的算法会很慢，而 n 通常都很小。花哨的算法往往带有很大的常数因子。除非你确定 n 经常会很大，否则别搞什么花活。</p>
<p>我把规则 3 当成了行动许可，并且彻底忽略了规则 2。我从未做过任何基准测试，只是写出了最简单的实现，在我的机器上运行良好，然后就发布上线了。我忽略考虑的是，在我们的工作负载中，n 通常并不小，它稳定且必然很大。</p>
<p>我所掩盖过去的部分在于：规则 3 自带一条免责条款：“除非你确定 n 经常会很大”。而我其实是知道的。我实际做的事情，是把一条针对普遍情况的经验法则，套用到了一个我明明有测量数据却懒得去看的具体场景中。那些巨大的读取耗时所给我的教训，其实在写下一行代码之前，我们已有的监控看板本就可以告诉我，而且成本要低得多。</p>
<p>规则 2 本来是可以及早发现这一点的，而且我认为平时对它的解读往往过于狭隘。度量不仅仅是为了决定某件事是否值得优化，它也是为了查明你究竟处于哪种量级范畴（regime）之中。在我们的工作负载中，n 稳定且巨大，而本文中的每一个改动，最终都源于去查看了一个在我动手之前就已经存在于看板上的数字。</p>
<p>我跳过测试度量的真实原因是：度量过去是一件费时费力的苦差事。我入行摸爬滚打大多是在初创公司，那里的默认准则是“先上线后修复”，而“以后”往往是以链路追踪（trace）报警的形式出现的。做一个基准测试意味着要搭建测试脚手架（harness），而脚手架意味着要构造模拟生产环境的输入数据，这一切意味着要向别人解释为什么一个 2 个点数的故事卡（ticket）现在变成了 5 个点数。因此，我从未养成过做基准测试的反射习惯。</p>
<p>这种借口是有保质期的，我认为在后 Claude 时代的编程中，它已经过期了。向大模型索要一段基准测试代码只需要花我一分钟的时间，而生成具有实际规模、看似合理的输入数据，恰恰是大模型最擅长处理的繁琐杂事。我不知道整个行业是否已经在这方面有所转变（我猜关于工时点数的争论依然如故），但我自己的工作流已经彻底改变了。弄清楚自己处于何种量级范畴的成本已经大幅下降，以至于“不知道”如今成了一种个人选择，而不是一种无可奈何的困境。</p>
<p>但如果真能回到过去，我想提醒自己的事情其实与基准测试无关。而是我脑海中一直带着对 Redis 的错误心智模型。我曾把它想象成一个可以通过 TCP 交互的 Map。当你在页面加载时根据用户 ID 获取其会话时，这个模型没有任何问题——而这正是大多数人使用 Redis 的几乎全部场景。但对于我们在这里所做的事情来说，这是一个糟糕透顶的模型，本文中出现的每一个问题，都是“Map”心智模型悄然脱离现实的地方。</p>
<p>Map 模型倒不能说是错的，只能说它是有适用范围的。它能准确描述“单个键”和“单次往返（round trip）”的情形，这也是所有教程展示给你的内容，因为几乎每个人面对的都是这种场景。但一旦超出这个范围，它所忽略的那些细节就会开始提出抗议。如果每个请求都落入同一个命令处理线程，并发就根本不是并发。TTL 结果发现只是特定命令的一个属性，而不是存储本身的通用属性。这些都不是什么晦涩的知识，全部都写在文档里，只是在根据 ID 获取用户会话时，你永远不会碰上这些问题而已。</p>
<p>我怀疑这种现象具有普遍性，并非 Redis 所独有。抽象之所以有价值，是因为它隐藏了底层的机器细节；而它最终之所以会反噬，恰恰也是因为它隐藏了机器细节。我发现唯一可靠的判断依据就是规模与体量。一旦你在我们所处的这种规模下运行系统，你在“每次页面加载只执行一次”的场景中建立起来的心智模型，几乎肯定会以其设计初衷之外的方式承受重荷；因此，与其等生产环境用残酷的现实给你上一课，倒不如提前去深入研读并弄清楚其底层究竟是如何运作的。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>作者在一家零工经济外卖/配送应用负责决定向哪位配送员派单的服务系统工作。</li>
    <li>配送派单服务依赖路由引擎计算实际驾车时间，路由引擎是该服务延迟的最大来源。</li>
    <li>来源叙事重点：揭示高并发生产环境下 Redis Cluster 的真实系统行为与抽象泄漏，重点复盘从简单将 Redis 视作远程 Map 导致性能雪崩，到通过 H3 离散化、基于 Hash Tag 的确定性分片批处理、Lua 脚本原子写入与精简序列化逐步解决瓶颈的工程迭代过程</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.verygoodsoftwarenotvirus.dev/posts/2026/09/22/redis-is-not-a-map-you-talk-to-over-tcp/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ai-without-adding-to-the-574c91e0f2d80a20" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="4272" data-content-paragraphs="27" data-published-at="2026-09-22T21:45:11.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-23 05:45</span>
</div>

### [如何在谈论“AI”时不助长拟人化倾向](https://buttondown.com/maiht3k/archive/how-to-talk-about-ai-without-adding-to-the/)
<div class="original-title-sub"><span class="orig-tag">原文</span> How to talk about &quot;AI&quot; without adding to the anthropomorphization</div>

<div class="article-body" data-article-body="true"><p>埃米莉·M·本德（Emily M. Bender）与南娜·伊尼（Nanna Inie）</p>
<p>在我们为 Tech Policy Press 撰写的专栏文章（《我们需要谈谈我们如何谈论“AI”》）中，我们反驳了拟人化语言的使用。这种语言使得人们更难清晰探讨所谓“AI”技术到底能做什么，以及在何时、是否应当使用它们。但目前这些表达方式已经根深蒂固，要建立新的对话和写作习惯需要付出努力。这项工作至少包括三个步骤：</p>
<p>在我们的研究中（已在专栏文章中总结），我们一直在进行前两个步骤：对各类拟人化语言进行归类，并利用这些分类来梳理潜在的替代表达。</p>
<p>去拟人化语言根据计算机系统的功能（即人们构建和/或使用它们来做什么）来描述它们，将能动性（agency）赋予使用系统的人而非系统本身，并避免使用关于认知的夸大隐喻。</p>
<p>我们的目标是找到尽可能不言自明的替代词，以便你可以直接使用它们而无需多作解释。（当然，如果有人问“你为什么这么称呼它？”，那也是一个绝佳的交流切入点。）</p>
<p>其中一些重新表述可能会让人觉得略显笨拙，而且最终可能比拟人化的简略词更长。这意味着使用它们需要投入更多心思，但这也不一定是坏事。我们应当停下来思考一下我们正在使用甚至正在讨论的技术，以及它到底在做什么。</p>
<p>我们将逐一介绍我们在 Inie 等人（2026年）的研究中确立的拟人化语言分类，并为每一类提供去拟人化版本的示例。</p>
<p>这一类极其常见，因为它直接存在于“人工智能”（artificial intelligence）这个营销术语本身中。这类语言将“思考”归因于算法。相反，我们建议将软件描述为执行计算或其他算法操作，并将思考归因于使用该系统的人。（在某些情况下，人们在使用它们时显然没有思考，但他们仍然是本应思考的主体。）</p>
<p>示例：<br />人工智能（artificial intelligence）→ 概率型自动化（probabilistic automation）<br />混合智能（hybrid intelligence）→ 增强人类智能（augmented human intelligence）<br />图像识别（image recognition）→ 图像标注（image labeling）<br />语音识别（speech recognition）→ 自动转录（automatic transcription）<br />模型表现出偏见（the model shows bias）→ 模型反映出偏见（the model reflects bias）<br />模型犯错（model mistakes）→ 模型报错/误差（model errors）<br />聊天机器人擅长……（chatbots are good at …）→ 聊天机器人适用于……（chatbots are good for …）<br />幻觉（hallucination）→ 不良输出（undesirable output）<br />目标（goal）→ 成功条件（success condition）</p>
<p>总体而言，我们建议在提及具体技术时避免使用“人工智能”或“AI”。我们仍会谈论“AI行业”，因为那是一个实体的名称；我们也会将“AI”作为一种意识形态来谈论。但是，当预期的指涉对象是某个具体的技术系统时，直接指明该系统本身总是更好的。那可能是某个具体产品，或者是一个具有特定功能的系统，例如自动转录系统。无论哪种方式，都值得去寻找不带有拟人化色彩的名称。如果你需要一个更通用的术语，我们上面推荐的“概率型自动化”（probabilistic automation）适用于许多（但并非所有）被冠以“AI”之名销售的事物。</p>
<p>我们还将“幻觉”（hallucination）归入此类，因为在其本义中，它是指感知到不存在的事物，但软件系统（尤其是对话模拟器）当然什么也感知不到。我们提出的一对一替代词是“不良输出”（undesirable outputs），但同样重要的是要知道，所有大语言模型（LLM）的输出都是按概率生成的合成文本；在系统端，合意输出与不良输出之间没有本质区别，差别仅在于解释它们的人类。</p>
<p>这些词句暗示软件系统具有情感生活。我们在此没有特别推荐的改写方案，因为除了重申那个显而易见的事实（即它们根本没有情感）之外，没有任何准确的方式来谈论计算机的情感状态。这一类别中最微妙（因此对语言学家来说也最有趣）的地方在于，对情感体验的暗示会以令人意想不到的方式潜入：如果你说 ChatGPT 在艰难地做某事（struggles to do something），或者你不得不哄劝它（coax it）给出某些输出，你就是在把它描述得仿佛它具有情感状态一样。</p>
<p>在这一类别中，包含那些将自动化系统（通常是合成文本挤出机）在交流情境中置于与人同等地位的词汇。如果我们向 Claude 询问某些事情，我们就是在把 Claude 描述为一个对话伙伴。与其使用“问”（ask）、“说”（say）、“告知”（inform）、“讨论”（discuss）等动词，不如使用适合计算机的动词，如“输入”（input）和“输出”（output）。另一种策略是突出“模拟”这一事实。</p>
<p>示例：<br />提示词（prompt）→ 文本输入（text input）<br />回答（answer）→ 输出（output）<br />聊天机器人 / 对话代理（chatbot / conversational agent）→ 对话模拟器（conversation simulator）</p>
<p>将能动性赋予机器的句式往往会混淆人类的利益与目标。我们建议修改这些表述，将能动性归还给人，或者选择能动性较弱的动词。</p>
<p>示例：<br />ChatGPT 协助了学生（ChatGPT assisted students）→ 学生使用了 ChatGPT（the students used ChatGPT）<br />揭示解决方案（revealing the solution）→ 显示解决方案（displaying the solution）<br />AI 智能体（AI agent）→ 概率型未验证软件操纵器（probabilistic, unverified software manipulator）</p>
<p>这个类别中不可忽视的庞然大物是“AI智能体”（AI agent）这一时髦词（及其变体，如 agentic AI systems）。这个术语指代那些将大语言模型（概率型合成文本挤出机）和/或其他组件与能够对现实世界产生影响的其他系统连接起来的软件系统，即那些此前专为人类进行安排日程、预订航班或其他采购操作而设计的系统。目前我们对这个词的建议是“概率型未验证软件操纵器”（probabilistic, unverified software manipulator），它的优势在于能构成一个恰到好处的粗鄙缩写（“不用了谢谢，我不想用你们的 PUSMic 系统。”）。不过，我们绝对乐见其他想法！欢迎发给我们，如果有任何显得特别贴切的表述，我们会将其加入此清单。</p>
<p>这些词汇将系统描绘成在各种角色中承担与人类相同的工作，掩盖了此类自动化远远达不到实际所需的所有不足，同时也贬低了人类从事的实际工作以及我们建立的人际关系。将系统称为“导师”（tutor）或“共同创作者”（co-creator）是夸大其词的说法，描述的是开发者可能希望自己能开发出的东西——为那些想要在这些角色上取代人类的人服务。</p>
<p>对于此类，我们的建议是使用将算法描述为人类所使用的工具（或产品）的语言，而不是将其视为类人实体；更清晰地表明系统的功能性，同时也不透露取代人类的意图。</p>
<p>我们用来指代系统的名称和代词也可能起到拟人化的作用。在系统名称方面情况略为棘手，因为通常由系统开发者来命名，如果他们给系统起了一个人名，其他所有人要么被迫沿用这一拟人化选择（比如 Anthropic 公司的 Claude，说的就是你），要么就只能采取迂回说法（如“Anthropic 的对话模拟器”）。</p>
<p>每次使用代词都需要做出抉择，而避免使用通常仅用于人类（以及宠物）的代词，例如“他”（he）、“她”（she）和单数“他们”（singular they），是一个良好的开端。但一些更为微妙的用词选择——比如用“你”（you）或“他们”（them）将算法与人类归为一类——也可能带来拟人化倾向。将系统与人类明确区分开来，并避免使用集合代词，是更为妥当的做法。</p>
<p>示例：<br />谁是对的？（who’s right?）→ 机器输出是否正确？（is the machine output correct?）<br />他们产生了结果（they produce results）→ 团队使用它[系统]产生了结果（the team uses it [the system] to produce results）</p>
<p>从事“人工智能”（及其子领域）研究的计算机科学家长期以来一直将生物学隐喻融入其专业术语中。这些措辞最初或许只是修辞手段，但它们也起到了暗示更多本不存在的相似性的作用。在修改并摒弃生物学隐喻时，不妨思考如何更精准地描述系统功能，以便让读者更清晰地了解实际发生的过程。</p>
<p>示例：<br />神经网络（neural networks）→ 加权网络（weighted networks，引自 Hunger 2023）<br />模型消耗数据（the model consumes data）→ 数据用于设定模型权重（data is used in setting model weights）</p>
<p>我们鼓励您尝试上述改写表达，并本着同样的精神创造出属于您自己的表述方式！起初这可能会让人感到有些别扭，但根据我们的经验，这总比准确读出或拼写出“拟人化”（anthropomorphization）这个词要容易，所以也算是一件好事。</p>
<p>在社交场合中，这可能也会让人觉得有些尴尬，因为你是在逆着语言和文化的潮流而行，但这本身也会让人获得回馈。在今年1月的一场演讲中，有学生向埃米莉（Emily）提问：在与朋友交谈时，如何在不当扫兴鬼（不当“泥中木桩”）的前提下，为抵制“人工智能”贡献一份力量？埃米莉回答道：那就去当个泥中木桩吧！如果你把我们当前的处境看作是陷入了举步维艰的泥潭，那么只要你立下一根木桩，就能开始为其他人提供立足的坚实地面，让他们也能加入你的行列。</p>
<p>我们的新书《人工智能骗局》（The AI Con）现已在各大优质图书销售渠道上架！</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-23 05:45 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://buttondown.com/maiht3k/archive/how-to-talk-about-ai-without-adding-to-the/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-en-miri-output-is-cached-a8566769431792cc" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1701" data-content-paragraphs="21" data-published-at="2026-09-22T21:38:02.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-23 05:38</span>
</div>

### [当 Miri 输出被缓存时 GitHub Actions 会泄露机密信息](https://blog.rust-lang.org/2026/09/21/github-actions-leaking-secrets-when-miri-output-is-cached/)
<div class="original-title-sub"><span class="orig-tag">原文</span> GitHub Actions leaking secrets when Miri output is cached</div>

<div class="article-body" data-article-body="true"><p>Rust 安全响应团队收到通知，Miri 会将所有环境变量保存至 target/ 目录下，从而使机密信息持久化保存在缓存中。</p>
<p>尽管这本身未必算是一个漏洞，但当与 GitHub Actions 的缓存行为结合在一起时，可能会导致机密信息泄露给拉取请求（PR）。</p>
<p>GitHub Actions 允许在不同工作流运行之间缓存目录。典型的配置允许主分支（main）及其他分支上的 CI 运行写入缓存，而 PR 只能从缓存中读取（以防止缓存投毒）。Rust 项目往往通过缓存由 cargo install 构建的二进制文件，有时还会缓存 target/ 目录的内容，来加快 CI 速度。</p>
<p>任何可以在您的仓库中提交 PR 的人都可以触发 PR CI。GitHub 要求对首次提交 PR 的用户进行维护者批准，但后续的 PR 在每次推送时都会重新运行 CI。任何之前曾合并过更改的人都可以触发 CI 运行，从缓存的 target/ 目录中提取信息，然后通过向 PR 推送第二次提交来掩盖其踪迹。</p>
<p>GitHub 有时会在其用户界面中隐藏被覆盖的提交，使此类攻击更难被发现。CI 运行日志和被覆盖的提交也会在数月后被删除。</p>
<p>当调用 cargo miri 时，Miri 需要在多次运行之间保留与构建相关的环境变量¹。当前实现此目的的代码是通过将所有环境变量存储到 target/ 来实现的。当然，当 target/ 被缓存时，这些内容就会持久化保留下来。</p>
<p>如果您的环境中包含机密信息，这些信息现在便可以通过缓存被 PR 访问。</p>
<p>我们对此的短期修复方案是让 Miri 仅保留 CARGO_* 环境变量（CARGO_*_TOKEN 除外）以及 OUT_DIR。从长远来看，Miri 和 cargo 可能会找到更好的方式来告知 Miri 相关的环境变量列表。请注意，该补丁可能尚未在 nightly 版本中可用。</p>
<p>我们还对 GitHub 仓库进行了生态系统扫描，发现了 1 个存在此问题的仓库，以及 7 个看起来不易受攻击但无论如何都应保持谨慎的仓库。我们已与这些维护者取得联系。</p>
<p>我们的扫描很可能并不完善，因此如果您运行了 Miri，我们建议您检查自己的 GitHub Actions 配置。</p>
<p>在以下情况下您可能受到影响：</p>
<p>可能的快速修复方法包括：</p>
<p>完成后，请清理缓存。考虑轮换任何可能已泄露的机密信息。</p>
<p>即将发布的 nightly 版本（2026-09-22）中的 Miri 将不再存在此问题。</p>
<p>即使您不运行 Miri，也请确保能够写入公共缓存的作业无权访问机密信息。许多工具对机密信息并没有特殊处理，并且会假定整个环境都可以写入文件系统。</p>
<p>我们认为，拥有一个容易被机密信息污染的缓存是不良实践。</p>
<p>如果缓存了 target/，确保生成 target/ 的进程（任何调用 cargo 的操作）的输入中不包含可用机密信息是值得的。标准的 cargo build/test 子命令通常很少需要任何机密信息或令牌²，因此这主要是注意避免将机密信息作为环境变量暴露给整个作业的问题。</p>
<p>Cargo/Miri/Rust 不保证环境变量不会被复制到 target/ 中。虽然我们将其视为安全问题并在高度审慎的情况下对其进行了修补，但这并不是您通常应该依赖的特性。除了官方 Rust 工具链之外，构建脚本也有可能执行导致环境信息被存储在编译产物中的操作。</p>
<p>感谢 OpenAI 的 Predrag Gruevski 向我们报告此问题。此外，生态系统扫描是使用 OpenAI 捐赠的 Codex 访问权限和额度完成的，我们对此也表示感谢。</p>
<p>问题的分类研判和修复工作由 Manish Goregaokar、Ralf Jung、Ben Kimock、Weihang Lo、Jacob Finkelman、Walter Pearce、Josh Stone 和 Mark Rousskov 完成。</p>
<p>¹ 出于复杂原因，cargo miri 会多次调用 Miri ↩<br />² 理论上可能存在构建脚本从网络读取数据的情况 ↩</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-23 05:38 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.rust-lang.org/2026/09/21/github-actions-leaking-secrets-when-miri-output-is-cached/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-item-76fbaf357d9a065e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="853" data-content-paragraphs="16" data-published-at="2026-09-22T21:06:34.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-23 05:06</span>
</div>

### [无AI废料十月挑战](https://no-sloptober.com/)
<div class="original-title-sub"><span class="orig-tag">原文</span> No Sloptober</div>

<div class="article-body" data-article-body="true"><p>今年十月，我们向你发起挑战：彻底停用基于大语言模型（LLM）的工具。不妨将其视作一次让大脑清空的“思维斋戒”！这绝非对别人的评判，而是一次向你自身发起的个人挑战。</p>
<p>细致入微的权衡极难做到（在互联网上甚至近乎不可能），保持平衡亦是如此。</p>
<p>去培养你自己对大语言模型长处与短处的细腻认知与判断。</p>
<p>无论是在家还是在工作中，完全不借助任何人工智能/大语言模型工具，用最扎实、最硬核的方式去完成工作。</p>
<p>“智能体（Agent）在系统中只能维持或增加熵。唯有人类具备独特的减熵能力。”</p>
<p>用我家刚学步的孩子的话来说：“我自己来！”</p>
<p>“嘿，我们来看看能否围绕LLM的使用做一些成本风险分析。让我们尝试减少或彻底停用LLM，以此来衡量团队/组织的产出效率、事故率和成本，看看未来是否有任何潜在的开支节约空间或风险缓解措施。”</p>
<p>或者也可以参考软件开发中的“铁三角”命题：你想要质量好、成本低，还是交付快……三者只能选其二。</p>
<p>重新找回在你所从事技艺中的乐趣</p>
<p>重新找回心流状态</p>
<p>认清自己在知识与能力方面的盲区所在，并思考：将这些盲区委派给AI，你真的安心吗？</p>
<p>真的存在完全毫无价值的任务吗？它们能否以确定性的方式廉价且迅速地实现自动化？</p>
<p>学习本就需要耗费心力，伴随着认知阻力</p>
<p>不幸的是，为了保住工作，有时员工在企业里不得不“被迫使用AI”。请做出对你的生活和家庭最有利的选择，并根据需要灵活调整这些建议，以安抚好上面的各路领导。↩︎</p>
<p>语言翻译工具极其有用，能帮助人们用非母语参与全球交流。我认为这是一个关乎人类特有交流需求的例外，是一种极具人文关怀的应用，但这由你自己决定。然而，我绝无意贬低人工专业翻译与本地化在产品及服务中的重要性，这些工作所需的精确度，我认为是不应全权托付给机器的。↩︎</p>
<p>“肉身代理”（Meat Proxy）是一个术语，指那些将工作对话经由聊天机器人“洗一遍”，未经任何思考或仅做极少编辑审校，便把生成内容原样转回给你的人。我个人觉得这种行为极其不尊重人，我宁愿对方完全不回复。↩︎</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-23 05:06 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://no-sloptober.com/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-out-wraps-it-up-for-html-6a1fe3868d74e690" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2379" data-content-paragraphs="29" data-published-at="2026-09-22T19:29:53.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">💹 宏观资本与产业</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-23 03:29</span>
</div>

### [原生 Mac 界面可以说走到头了](https://inessential.com/2026/09/22/that-about-wraps-it-up-for.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> That About Wraps It Up for Stock Mac UI</div>

<div class="article-body" data-article-body="true"><p>最新版本的 macOS 朝着美观的 Mac UI 迈出了不错的一步，但我真希望它能走得更远一些。</p>
<p>我尤其不喜欢 Mac 工具栏现在的外观。我不喜欢通顶侧边栏（full-height sidebars），更特别讨厌 Liquid Glass（流体玻璃）按钮。</p>
<p>我打量了一下其他 Mac 应用的做法。我在同步到 Mastodon 的微博客上发了问，同时也看了一下几天前 Isaiah 提出类似问题时的回复。</p>
<p>我的发现并不让人意外：许多人们认为好看的应用，用的都不是原生（stock）UI。</p>
<p>这一点你早就心知肚明，我觉得也无需多做证明。但有一款应用可以作为绝佳例证：Things。</p>
<p>Things 因其出色的设计和充满“Mac 味”的特质而长年备受推崇。但它根本算不上一款原生 Mac 应用。它的工具栏并没有置于窗口顶部（并非 NSToolbar），并且不支持自定义。在其主界面中，你看不到任何 Liquid Glass 风格半透明效果的痕迹。举个例子，内容并不会滑动隐藏到侧边栏下方。（我能找到明显具有 Liquid Glass 风格的唯一地方，就是设置窗口里的工具栏按钮。）</p>
<p>长期以来，我一直是使用原生 Mac UI 的坚定拥护者，而且我一直认为自己有着充分的理由：用户已经对这种 UI 很熟悉，而且每年开发和更新时的工作量也较少。</p>
<p>但现在我认为，这些理由（用户的熟悉度以及开发者的工作量）可能根本站不住脚。至少在当下是如此。</p>
<p>用户已经证明——再次说明，我无需证明这一点——他们根本不会去纠结应用是原生 Mac 风格还是自定义风格。他们会因为 Things 没有位于窗口顶部且能按常规方式自定义的工具栏而讨厌它吗？不会。（唯一会这么想的，只有像我这样资深的 Mac 开发者。）</p>
<p>无论其界面有多么原生或多么不原生，用户在理解流行 Mac 应用的界面时会有困难吗——比如 Things、Slack、Craft、OmniFocus、NotePlan、Bear、Reeder、Telegram、Acorn、Tapestry、Obsidian、Audio Hijack 等等？毫无困难。</p>
<p>他们能分得清哪款应用是 Electron 应用吗？不能：他们脑海里甚至没有 Electron 应用的概念，即便你向他们解释，他们也根本不在乎。（他们又何必在乎呢？）</p>
<p>用户或许已经熟悉了原生 Mac UI（实际上也未必，这取决于他们使用哪些应用）——但我认为这已经完全无关紧要了。</p>
<p>过去的设想是：只要采用原生 Mac UI，开发者就可以高枕无忧——因为你每年都跟进，每年 macOS 的大部分改动几乎都可以零成本或以极小的工作量直接享受到。</p>
<p>然而，我的应用 NetNewsWire 采用了非常原生的 Mac UI，可去年适配 Liquid Glass 却耗费了大量工作。采用原生 Mac UI 并没能为我们省下多少精力——事实上，与那些采用更多自定义界面的应用相比，我们要干的活反而更多。</p>
<p>话说回 Things。要澄清的是，我并不是在挑它们的刺。恰恰相反！我非常尊重他们的作品，尽管我过去曾希望它能更具“Mac 味”（再次说明，这纯粹是一个资深 Mac 开发者才会有的执念）。</p>
<p>这是他们一年前关于适配 Liquid Glass 的博文。他们确实做了一些工作，一如既往地保持了极高的水准。我绝不是在贬低这一点。但看起来他们要做的工作，远比我们在 NetNewsWire 上所做的要少得多。</p>
<p>这就是我的观点：对于原生 Mac 应用而言，开发者的工作量反而更大。</p>
<p>总结一下：采用原生 Mac UI 的理由原本是：1）用户的熟悉度，但我们早就知道这根本不是什么核心诉求；2）希望能减少开发者的工作量，但事实证明这有时反而适得其反。</p>
<p>不过还有另一个理由：原生 Mac UI 是由世界上最顶尖的设计师苹果公司操刀设计的，你难道真觉得自己能做得比他们更好？真的吗？</p>
<p>应用世界充斥着盲目自大、自以为水平更高但实际上根本不行的开发者。</p>
<p>嗯，我依然认为苹果拥有全世界最优秀的 UI 设计师团队，但无论出于何种缘由，上层对于 Mac UI 应该长什么样的指导方向脱轨了。我并不是在责怪一线具体干活的人——在给定的方向下，他们完成得相当出色。</p>
<p>所以——正是这种糟糕的指导方向——让这隐秘的第三条理由也不攻自破了。这样一来，我们便没有了任何坚守原生 Mac UI 的真正理由（除非是为了获得像我这样的老牌 Mac 人的认可，但这完全是一件你根本不该在乎的事）。</p>
<p>带着这种想法，我想知道自己在 NetNewsWire 中能把 Liquid Glass 里那些我不喜欢的部分剥离到何种程度。结果发现，我能剥离得相当彻底，不过代价则是不得不放弃使用 NSToolbar（正如预料的那样）。</p>
<p>注：这些改动目前仅存在于一个分支上。只是一晚上的折腾玩耍，算不上真正的设计或深思熟虑。（但这是可运行的代码，不是视觉效果图。）它暂时不会按这种方式发布。但我还是想分享出来，因为这确实为 NetNewsWire 未来的可能性提供了一些思路启示。</p>
<p>点击小图可查看大图。</p>
<p>（注意，第二张截屏中的分栏视图将在 7.2 版本中正式发布。那部分工作已经完成，并且与是否使用 Liquid Glass 毫无关系。另外补充一点：当前所使用的文章主题是 NetNewsWire 标准自带应用的一部分，并非新加入的内容。）</p>
<p>要改进目前这个界面，显而易见首要的最佳做法是给工具栏图标添加一些颜色，并拉开它们的间距。或许还可以添加一定的自定义功能，尽管它并不是标准的 Mac 工具栏。</p>
<p>当然，你看到这个可能会觉得：“咦！看着好老土！饶了我吧！”这完全合情合理！</p>
<p>不过我觉得挺可爱的。可能晚点就删了</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-23 03:29 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#宏观资本与产业</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://inessential.com/2026/09/22/that-about-wraps-it-up-for.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-34454fa7292c035a10035b49-75b4d56fe0cccca0" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="548" data-content-paragraphs="12" data-published-at="2026-09-22T17:14:56.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-23 01:14</span>
</div>

### [纯文本文件正面临危机](https://paste.sr.ht/~awal/b76caf6f213a96a634454fa7292c035a10035b49)
<div class="original-title-sub"><span class="orig-tag">原文</span> Plain-text files are at risk</div>

<div class="article-body" data-article-body="true"><p>无论好坏，纯文本文件——凭借其繁多的编码形式和分层格式——迄今为止都是我们所拥有的唯一真正的通用数据接口。</p>
<p>我所说的纯文本文件，指的是 notes.txt、.md、.ini、.json 等格式。</p>
<p>几乎每个操作系统默认都会自带一款纯文本编辑器。不仅是 Linux/BSD 系统，微软（记事本）和 macOS（文本编辑）同样如此。</p>
<p>然而，人们对纯文本编辑的兴趣已经消退了一段时间。1</p>
<p>就在 20 年前，即便对于非专业人士而言，日常使用这类编辑器也是一件非常普遍的事情。</p>
<p>智能手机在大众群体中取代台式电脑，或许是对纯文本文件造成的最大打击。</p>
<p>如今，普通计算机用户基本上已经遗忘了纯文本文件。甚至就连单纯“文件”这一概念本身也在逐渐消解。2</p>
<p>让纯文本文件得以继续存在的最后一个群体是软件工程师。</p>
<p>这也促成了纯文本编辑领域的显著创新。</p>
<p>但现在不同的是，软件开发者们开始在大语言模型（LLM）的 REPL 中进行文本输入了。[3]</p>
<p>那么，如果纯文本文件的这最后一批受众也随之弃船而去，又会发生什么呢？</p>
<p>[3]：https://en.wikipedia.org/wiki/Agent_harness 我认为针对这些工具的新奇、拟人化术语纯属多余，因为“REPL”一词已经完全足以概括它们。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-23 01:14 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://paste.sr.ht/~awal/b76caf6f213a96a634454fa7292c035a10035b49" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--up-about-patient-safety-7eee3eab6a21eb89" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="547" data-content-paragraphs="3" data-published-at="2026-09-22T16:58:17.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-23 00:58</span>
</div>

### [少数族裔NHS员工为患者安全发声付出沉重代价 | 来信](https://www.theguardian.com/society/2026/sep/22/minority-ethnic-nhs-staff-pay-a-heavy-price-for-speaking-up-about-patient-safety)
<div class="original-title-sub"><span class="orig-tag">原文</span> Minority ethnic NHS staff pay a heavy price for speaking up about patient safety | Letter</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/a86d6b3c9d7f2ca6bba03427dba567524e59a93d/1109_431_1674_1339/master/1674.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=49abb3f6962767727f647597ff14b0e5" alt="少数族裔NHS员工为患者安全发声付出沉重代价 | 来信" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>詹妮弗·克里斯博士（Dr Jennifer Creese）、乔伊·斯皮利奥普洛斯博士（Dr Joy Spiliopoulos）与卡罗琳·塔兰特教授（Prof Carolyn Tarrant）写道：为黑人、亚裔和少数族裔员工提供心理安全保障，使他们能够毫无畏惧地提出对患者护理的担忧，将挽救生命。</p>
<p>贵报的报道（《报告发现：在种族主义影响下，英格兰五分之一的黑人、亚裔及少数族裔NHS管理人员计划辞职》，9月15日）准确地强调了英国国家医疗服务体系（NHS）内部存在的种族主义、排斥现象以及职业晋升受阻问题。但这同时也指向了一个更广泛的风险：患者安全。护理差错目前每年已给NHS造成147亿英镑的损失。</p>
<p>NHS种族与健康观察机构（NHS Race &amp; Health Observatory）2025年3月的一份报告指出，在医疗和牙科从业人员中占比超过40%的黑人、亚裔及少数族裔（BAME）员工，在晋升、日常工作和纪律处分程序中仍面临骚扰和歧视。这加剧了心理压力、职业倦怠以及更差的心理健康状况。据估计，职场霸凌和骚扰每年因人员流失、病假和生产力下降给英格兰NHS造成20亿英镑的损失。在这样的环境下，少数族裔员工比白人同事更不太可能就患者安全问题发声，因为他们担心自己的关切不会被理解或重视。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-23 00:58 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/2026/sep/22/minority-ethnic-nhs-staff-pay-a-heavy-price-for-speaking-up-about-patient-safety" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

::::