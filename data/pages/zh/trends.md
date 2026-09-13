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
<div id="story-6-09-sorcery-repo-viewer-df2bc97da00eedfa" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3188" data-content-paragraphs="16" data-published-at="2026-09-13T16:10:06.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-14 00:10</span>
</div>

### [如果我的 Git 托管平台是一个静态网站生成器会怎样？](https://char.lt/blog/2026/09/sorcery-repo-viewer/)
<div class="original-title-sub"><span class="orig-tag">原文</span> what if my git host were a static site generator?</div>

<div class="article-body" data-article-body="true"><p>隆重介绍：sorcery，代码魔法之地（the source-ery）……<br />截至目前，我运行个人 Git 平台（git forge）已经差不多有半辈子了 :o 我喜欢运行自己的开发基础设施，不仅是因为我与 us-east-1 之间总是有 120 毫秒以上的延迟，更是因为做系统管理简直纯粹就是好玩 :3 2015 年我搭建了一个 Gogs 实例，后来变成了 Gitea 实例，再后来又变成了 Forgejo 实例；我还曾多次为我加入的各种团队部署过 GitLab/Forgejo。我喜欢社区协作型的 Git 平台，而 Forgejo 在这方面非常出色！</p>
<p>但是我的 Forgejo 服务器老是耗尽磁盘空间（原因是在重新打包未更新的 Git 仓库时发生崩溃），并且在周围网络爬虫的常规负载下频繁宕机/内存溢出（OOM）。对于我的需求来说，很显然这类软件完全不适合这种规模：在我用于个人基础设施的小型机器上，这些软件根本经受不住互联网如同“宇宙微波背景辐射”般的常态扫描与抓取。</p>
<p>我也挺想通过仅展示自己真正会用到的功能来简化体验：Forgejo 及其同类工具所做的事情远超我的需要——议题（issues）、拉取请求（PRs）、发布版本（releases）、维基（wikis）——一大堆我根本不在乎但无论如何都要为其付出某种代价的 GitHub 功能兼容性 :(</p>
<p>针对 Forgejo 资源耗尽，通常开出的药方是通过像 Anubis 这样的 Web 应用防火墙（WAF）来拦截爬虫，其目的是通过 JavaScript 工作量证明（PoW）验证机制将 Web 应用的访问阻隔在门外。</p>
<p>但这违背了开放网络的理念，不是吗？浏览器作为表面上的“用户代理（user agent）”，被迫做出对用户不友好的行为，执行毫无用处的代码来增加用户设备的负担（这种验证的目的就是让 CPU 空转！）——如果浏览器拒绝执行，就根本无法显示任何与用户相关的信息。不支持 JavaScript（或者仅不支持带 JIT 的 JavaScript）的替代浏览器要么被彻底阻断，要么被困在极其恼人的等待时间之后。这加剧了现代网络的单一寡头化，我认为这是一件坏事。</p>
<p>此外，部署此类东西本身就是一种承认失败的妥协——我们屈服于一种假设，即所代理的应用程序在面对现实世界的互联网流量时无法正常工作：当我们面对的是一个读操作极度远多于写操作的负载时，这难道不可笑吗？在实践中，提供低频写入的数据服务理应非常廉价：整个 GitHub Pages 曾经仅靠一台机器就运行了多年！！为什么不能拥有一个完全基于静态文件的 Git 托管系统呢？</p>
<p>从核心来看，sorcery 的形态就像一个静态网站生成器：当它接收到 Git 仓库的更新时，会为该仓库重新构建一系列位于磁盘上的 HTML——一个概览页面、每个分支最新提交（tip commit）的目录树，以及最新版本中每个文件带有语法高亮的代码渲染。这使我们能够付出一次性的固定前期成本来响应未来的大量请求，这意味着我们能够从容应对爬虫负载（因为采用 sendfile 方式发完即忘的基本开销微乎其微）。然而，由于提前为每个文件的每个历史版本都渲染出 HTML 成本过高，我们选择不对仓库的历史视图提供纯静态服务。</p>
<p>不过，查看仓库历史记录是 Git Web 界面的核心功能，因此我们直接提供 .git 目录的服务，在 JavaScript 中实现一个基础的只读 Git 客户端，然后在客户端渲染仓库的所有“丰富视图”——仓库站点生成器确实也需要生成一些辅助性的 JSON 数据来协助 Git 客户端，因为我们无法可靠地列出 Git 仓库中的目录，但这些数据依然是纯静态的！</p>
<p>由于浏览历史记录可能意味着需要对不同对象（提交 commit、目录树 tree [即仓库目录列表]、数据对象 blob [即文件内容]）发起多次获取，因此高延迟连接会导致直接获取和遍历对象时感觉非常缓慢。当 Git 将这些对象增量编码压缩存储在打包文件（packfiles）中时尤其如此：在 linux.git 中简单直接地获取一次打包文件索引以查看单个提交的 diff，就要消耗超过 400MiB 的带宽！！而聪明地扫描指定范围又会破坏缓存命中率，并引发一系列依赖于先前请求返回数据的请求瀑布流。</p>
<p>因此，作为一种非静态的优化手段1，我们还提供了一条服务端路由，通过对象 ID（OID）列表来获取特定的 Git 对象（QUERY / / /obj），返回一种简单的二进制“Git 对象包”格式，可在客户端轻松解析。这减轻了客户端解析 packfile 的负担。此外，即使对于包含松散对象（loose object）的仓库，我们依然可以通过提供“智能获取”模式来优化往返通信，该模式能够针对给定的访问模式遍历所引用的 OID（例如，通过 commit.parent-&gt;parent-&gt;parent-&gt;… 遍历提交历史，或者访问一对提交中所有目录树的 blob 以便计算它们之间的 diff）。</p>
<p>因此，sorcery 是一个“Git 仓库查看器（git repo viewer）”而非“Git 平台（git forge）”，因为它完全省略了用户账户、SSH/GPG 密钥管理以及议题与补丁（issues+patches）。实际上，sorcery 本身完全是只读的！仓库仅通过基于 SSH 的 Git 进行写入，这独立于 sorcery 之外。你可以将 sorcery-ssh 作为 Git 用户的 SSH ForceCommand 运行，它将提供“首次推送时自动创建仓库”功能以及编辑仓库描述的能力。这种架构的好处在于，你的公开部署与你的 sshd 一样安全，这在当下（2026年）让人感到格外安心 :)</p>
<p>历史视图确实需要 JavaScript，但我对网络上全盘排斥 JS 的倾向并不怎么感冒（因为除非你住在阿什本，否则在本地设备上运行 UI 代码基本总是更优的选择！）——sorcery 使用了我自己的前端微框架，加上一系列内置的 Web 平台特性以及刻意为之的代码拆分（codesplitting），以极其轻量的方式创造了丰富的客户端体验！例如，加载项目概览页面大约传输 9kb 的 gzipped JS 即可支持近期提交的分页、语言过滤以及跳转到提交 diff 的链接——该站点体积最大的部分最终其实是语法高亮语法规则；我想尝试为 tree-sitter 语法和查询编写一个纯 JavaScript 的执行器，这样我们就能摆脱一些 WASM 的重量包袱（尤其是摆脱每个高亮语言的 WASM 包中被重复打包的代码）。</p>
<p>我仍然喜欢社区型的 Git 平台！！对于我的个人项目，我主要只是想要一个可以推送代码、能让我用手机浏览以及能把链接发给他人的地方：我不需要协同工作功能，这样做要轻量得多。阅读我的代码绝不应该包含向服务器证明你配得上接收超文本的一整套繁文缛节。</p>
<p>近期我想添加对 CI 注解（CI annotations）的支持（对此我很有自己的见解，会在以后的博文中展开聊！！快点订阅那个 RSS 按钮吧），也许将来我会把这个仓库查看器扩展成一个独立的、功能更完备（batteries-included）的 forge 项目供我和朋友们使用（一旦我们真正提炼出对我们最重要的东西、剔除掉多余的内容……）</p>
<p>无论如何，去瞧瞧吧！</p>
<p>QUERY …/obj 实际上纯粹是一项优化——如果你以完全静态的方式部署构建好的 sorcery 站点，Git 客户端依然会回退并直接拉取且解析打包文件（packfile）和松散对象（loose object），只不过在高延迟下速度会慢上极其极其多。↩︎</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>作者在2015年拥有一个Gogs实例，后来依次迁移转变为Gitea和Forgejo实例。</li>
    <li>作者开发的软件名为sorcery，核心设计类似于静态网站生成器（SSG），定位为只读的Git仓库查看器（git repo viewer）而非包含完整功能的Git代码托管平台（git forge）。</li>
    <li>来源叙事重点：介绍自研的静态Git仓库查看器“sorcery”，倡导通过“静态生成最新版本+客户端JS解析Git历史+SSH独立写入”的极简架构替代臃肿的全功能Git平台，批判利用PoW防火墙阻挡爬虫有违开放Web精神。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://char.lt/blog/2026/09/sorcery-repo-viewer/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-o-devs-should-learn-odin-82e3165a7a942b00" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3516" data-content-paragraphs="7" data-published-at="2026-09-13T15:23:41.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 23:23</span>
</div>

### [Golang 开发者应该尝试 Odin](https://rm4n0s.github.io/posts/2-go-devs-should-learn-odin/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Golang developers should try Odin</div>

<div class="article-body" data-article-body="true"><p>英灵殿漫游指南（The Hitchhiker’s Guide to Valhalla）<br />2024 年 10 月 24 日 · 阅读时长 14 分钟<br />（警告：本文可能引发不适）<br />我使用 Golang 已经 10 年了，尽管我也尝试过其他编程语言，但因为它的简洁性，我总是会重新回到它身边。<br />它如此简单，以至于当我刚接触 Golang 时，仅靠阅读源码和动手实践就掌握了它的大部分语法。<br />然而，不得不承认，由于垃圾回收器（GC）和运行时的存在，Golang 也有不少问题。<br />这里列出了其中的一些问题：<br />但即便存在这些问题，在遇到其他编程语言时我依然更倾向于 Golang，直到一周前我遇见了 Odin，那一刻真是一见钟情。<br />这篇文章将带你领略 Odin 之美。<br />Odin 是一门全新的编程语言，它<br />人们仅仅因为它的编译器自带了 3D 库，就以为它只适用于游戏开发，但我并不认同。Odin 也同样适用于后端开发，因为它拥有一个类似于 Go 标准库的核心库。这意味着它具备了所有的基础构建块，能让我们像某些厂商模仿制造一样，把 Go 的其余库都复刻过来。<br />我知道你们当中有些人会摆弄 Rust、Zig、C3 或 Hare，但这些语言并不具备数组编程（array programming）和结构体标签（struct tags）。<br />它甚至还支持四元数（quaternions）！你知道那是什么吗？我也不知道！但我很兴奋能学到它。<br />这门语言不会再发生变动，直到你退休前它都会保持稳定。不过，编译器、工具链和核心库仍在开发中，并且在不断得到改进。<br />此外，它已被 JangaFX 和 ChiAha™ 应用于生产环境中。<br />这门语言有 31 个关键字，但每个关键字都可能带有 #指令（#directive）或 @(属性)（@(attribute)）。对于像我这种记不住超过 26 个关键字的人来说，这可能显得有点多，但所有的关键字、指令和属性之间的衔接非常流畅，读起来就像读英语一样自然。<br />例如，工作方式类似于 Golang 的 switch-case 语句要求用户明确指定每一个分支情况，除非你在它前面加上 #partial 指令。<br />你会真正体会到，即使不懂这门语言，理解其代码也是多么容易。花上 10 分钟阅读 demo.odin，里面几乎涵盖了你入门所需的一切。<br />是的，它没有正式文档（不，概览页面并不是真正的文档），但这正是其魅力所在。你是通过阅读别人的代码来学习用 Odin 编程的。标准库的大部分内容既没有注释也没有示例，但你完全可以通过其源代码轻松理解如何使用。<br />不，它没有宏（macros），没有 comptime（编译期计算），没有 constexpr，也没有装饰器（decorators），而这样其实更好，因为拥有这些特性的每门语言都会让开发者把 90% 的时间浪费在 Google 搜索使用它们的各种库上。<br />相信我，坚持使用 Odin 预定义的指令和属性就好。<br />是的，它支持泛型，而且比 Golang 的泛型设计得更好。<br />不，它没有包管理器，没有 go.mod 文件，也没有类似的其他东西。包仅仅就是一个目录，你只需将其复制到你的项目中，并根据源代码文件的相对路径来调用它。<br />是的，它的编译器和 Golang 的编译器一样简单。<br />是的，它有带自动补全功能的 VSCode 插件。<br />Odin 采用手动内存管理，这也是它为什么没有闭包（Closures）、组合（Composition）、Goroutine 以及 Selector 的原因。不过，我将向你展示如何在没有这些特性的情况下也能过得很好。<br />其次，它缺乏库生态，这也是为什么我正试图吸引你们来学习它，这样你们就可以把你们的库从 Go 复制移植到 Odin 中。<br />最后，它缺乏文档和书籍，但如果你拥有多年的 Go 经验，那么 Odin 会让你感到宾至如归。<br />没有垃圾回收器的生活意味着你不再拥有 errors.New() 或 fmt.Errorf()。Odin 中不存在 error 类型。你只有枚举（Enums）、联合体（Unions）和结构体（Structs），而这比 Go 的错误机制更好。<br />Golang 的错误机制会迫使你将服务端的错误信息推送给用户，而你无能为力。这并不是一件好事，因为用户根本不需要知道什么是 SQL，或者 bank_account 为 nil。<br />此外，另一个问题是 Go 的错误不带有堆栈跟踪（stack traces）。<br />对于你创建的每个函数，同时包含一个枚举、联合体或结构体来表示该特定函数的错误。<br />当一个函数返回它从另一个函数接收到的错误时，以此类推，你将收到一个类似于这样的错误值。<br />从那里，你可以构建 switch 语句树，以返回恰当的用户提示信息。<br />并且你还可以使用我的库把它像堆栈跟踪一样打印出来。<br />甚至只需查看错误的类型，你就能猜出这些函数是做什么的。<br />没有其他编程语言能做到这一点。<br />如果 Odin 都救不了经济，那就没有什么能救了。<br />在我们探讨内存管理之前，让我先澄清三件事：<br />如果你读过 demo.odin，那么你已经知道指针是如何工作的了，但如果你还没读过，只需记住：<br />如果你对一个指针执行重复 delete() 或重复 free()，你将会遇到“段错误”（Segmentation fault）。<br />如果你在 free() 或 delete() 之后去读取指针，你将获得一个随机值。<br />如果你通过 make() 创建了一个包含 new() 指针的数组，那么在删除该数组之前，你必须先释放数组内部的指针，否则会导致内存泄漏。<br />对于全局指针，在释放它们之后将其赋值为 nil，并在释放、读取或给指针赋值之前检查是否为 nil。<br />对于局部指针，使用 defer 来释放该指针。务必始终将 defer 写在分配语句的下方，这样很容易看清释放操作。<br />如果一个过程（procedure）包含参数“allocator := context.allocator”，那么 99% 的情况下其返回结果都需要被释放。这意味着你必须调用 delete()/free()，或者调用来自同一库的另一个过程来替你释放该指针。<br />使用 Arena_Allocator 来分配指针数组，之后只需直接销毁该 arena 即可。<br />Odin 没有接口（interfaces），这也是为什么我说它们就像量子实体一样。当你观察它们时，它们表现得像接口；但当你不再观察它们时，它们就只是指针。<br />在 Odin 中有两种编写接口的方法。<br />这个例子模拟了组合（composition）。<br />同时，这也是 Odin 标准库中使用接口的方式。<br />例如，Odin 中的 sort.Interface 就是使用这种类型的接口结构从 Go 借鉴复制过来的。<br />这里有一个看起来像 Java 抽象类的例子。<br />另外，你不能给一个结构体添加多个接口，否则你就会开始遇到莫名其妙的问题或段错误。所以到头来，它用起来也和 Java 很像。<br />Odin 没有 goroutine 或 selector，因为它们需要垃圾回收器才能运行。<br />不过，我特意为你写了一个完整的示例，展示如何在 Odin 中模拟 goroutine 和 selector。<br />这个例子演示了鸟妈妈给幼鸟喂食的过程。<br />（你懂这个过程的。鸟妈妈呕吐到小鸟嘴里来喂养它们。大自然不是很美妙吗？）<br />如果你在这个例子中还没搞清楚什么是 selector 和 goroutine，那就看看 union 和 threadpool（线程池）。</p>
<p>一个接收联合类型（union type）消息的通道，相当于在 Golang 中使用两个通道外加一个 selector（选择器），因为联合类型中的每个独立类型都等同于 selector 中的一个通道。联合类型模拟了 selector 的功能。</p>
<p>线程池相当于 Golang 的运行时，因为它会提前运行那些后续用于执行 goroutine 的线程。</p>
<p>只要记住你在大学 Java 并发课程上学过的内容：长时间运行的任务使用线程，小型任务使用线程池，遇到死锁就吃扑热息痛。</p>
<p>通过本文，我希望你现在能够理解 Odin 未来的潜力，以及它作为后端开发中 Golang 替代品的可能。</p>
<p>顺便说一句，如果你一字不漏地阅读了 demo.odin 和我的解释，那么从现在起你就是一名高级 Odin 开发者了。（哎呀！）</p>
<p>要成为特级大师级（Grandmaster）Odin 开发者，只需浏览一下概览以及如何绑定 C 语言即可。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>Odin 拥有 31 个关键字，并支持 #directive 指令与 @(attribute) 属性。</li>
    <li>Odin 在编译器中附带了 3D 库，并原生支持数组编程、结构体标签（struct tags）与四元数（quaternions）。</li>
    <li>来源叙事重点：强烈推荐 Golang 开发者尝试系统级编程语言 Odin，强调 Odin 在保持语法简洁性的同时，避开了 Go 语言的垃圾回收（GC）和运行时缺陷，并主张 Odin 完全有潜力替代 Go 进行后端开发。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://rm4n0s.github.io/posts/2-go-devs-should-learn-odin/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ce-among-students-ntwnfb-7fc0c246275c67a6" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="360" data-content-paragraphs="3" data-published-at="2026-09-13T15:00:06.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 23:00</span>
</div>

### [遭受性侵后重返校园的学生：“第二天你照样得回学校，只能默默承受”](https://www.theguardian.com/society/2026/sep/14/how-should-australian-schools-deal-with-sexual-assault-violence-among-students-ntwnfb)
<div class="original-title-sub"><span class="orig-tag">原文</span> The students returning to school after sexual assault: ‘You go back the next day, and you just deal with it’</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/20e3f69432a3fa56db2096e0b806fc48a24fb4e0/1311_0_4139_3311/master/4139.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=2db8b428eb7cd3b0533e445d1d5650ee" alt="遭受性侵后重返校园的学生：“第二天你照样得回学校，只能默默承受”" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>同侪之间的暴力正在不断增加。但当学校必须兼顾对受害者和加害者双方的照护义务时，那些不得不在性侵阴影下继续求学的女孩们又该何去何从？</p>
<p>近期，涉及男学生的涉嫌性侵事件频上头条，一名16岁少女亦疑似因性窒息死亡。在此背景下，澳大利亚国家内阁已同意优先推进消除针对女性性暴力的计划，新南威尔士州政府已向各教育部长提出了一系列新的优先工作事项，联邦政府也宣布了一项关于“数字照护义务”的立法草案。与此同时，在一起涉及悉尼一所私立学校两名学生和另一名男生的涉嫌轮奸案中，受害少女正在准备参加她所在州的高中毕业证书考试（HSC）。</p>
<p>“我无法想象她正在经历着什么，”警方检控官朗达·莱利警长（Rhonda Riley）上个月向法庭表示，“但在接下来的这段时间里，她将不得不在痛苦与恐惧中——不仅是心理层面的——完成她的HSC考试。”</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>同龄人间暴力（Peer-on-peer violence）呈上升趋势。</li>
    <li>澳大利亚国家内阁已同意优先推进终结针对女性性暴力的计划。</li>
    <li>来源叙事重点：以遭受性侵的女学生为中心，强调她们在创伤、恐惧和持续求学之间承受的压力，并提出学校在保护受害者与履行对涉嫌施害者的照护责任之间如何平衡的问题。报道同时将个案置于澳大利亚政府拟推进终结针对女性性暴力、州政府教育优先事项及联邦数字注意义务立法的政策背景下。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/2026/sep/14/how-should-australian-schools-deal-with-sexual-assault-violence-among-students-ntwnfb" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-n-barnet-council-housing-9b7cd4ede70fa1c7" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="251" data-content-paragraphs="3" data-published-at="2026-09-13T13:00:06.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 21:00</span>
</div>

### [曾主管格伦费尔削减开支的前官员获任地方议会公屋高级职位](https://www.theguardian.com/society/2026/sep/13/grenfell-fire-director-laura-johnson-barnet-council-housing)
<div class="original-title-sub"><span class="orig-tag">原文</span> Director who oversaw Grenfell cost-cutting given senior council housing role</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/c159298720998cb1c6c3614ff012e7787cff3611/500_0_5000_4000/master/5000.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=ceea2ed48255d79200484291266cfb20" alt="曾主管格伦费尔削减开支的前官员获任地方议会公屋高级职位" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>火灾幸存者与罹难者家属敦促巴尼特集团（Barnet Group）“重新考虑”对劳拉·约翰逊（Laura Johnson）的任命，后者当年曾推动选用报价更低的承包商。</p>
<p>格伦费尔火灾幸存者及遇难者家属痛批这项“荒唐的决定”——聘用一名曾主导格伦费尔大楼削减开支的前主管出任年薪15万英镑的地方议会公屋高级职位。</p>
<p>劳拉·约翰逊在2017年格伦费尔大火发生时担任肯辛顿-切尔西皇家自治市（RBKC）的住房主管。如今，她已被任命为巴尼特集团的开发与物业常务主管，该集团负责管理该自治市辖区内的1.3万套公屋。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-13 21:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/2026/sep/13/grenfell-fire-director-laura-johnson-barnet-council-housing" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-being-lazy-in-c-28f2cf8f708ce473" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1063" data-content-paragraphs="17" data-published-at="2026-09-13T12:50:15.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 20:50</span>
</div>

### [在 C++ 中偷懒](https://cpp-rendering.io/being-lazy-in-c/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Being lazy in C++</div>

<div class="article-body" data-article-body="true"><p>我又有很长一段时间没发文章了。我想，以后所有新文章都得用这句话开头了，哈哈哈。我可以说自己有点懒，而这其实是件好事，因为我们接下来要看看如何在 C++ 中偷懒。</p>
<p>延迟初始化是指将初始化推迟到确实需要时再进行。它可以用于优化性能（这将是下一篇文章的主题），不过我之前为一位客户工作时，有人问了我一个有趣的问题，这才让我想到了它。</p>
<p>为什么下面这段代码的结果不是这样：</p>
<p>C++ 的宗旨不应该是“你不使用的东西，就不必为它付费”吗？在第一种情况下，其实并不需要进行计算……</p>
<p>细心的读者会注意到，value_or 是一个函数，而函数的每个参数都必须在调用函数之前求值。</p>
<p>在 C++23 中，std::optional::or_else(f) 通过接受一个可调用对象解决了这个特定问题。不过，value_or 远不是唯一存在这一问题的函数，因此，拥有一种通用解决方案是值得的。例如，std::map::try_emplace 就存在完全相同的问题。</p>
<p>首先要做的是理解 value_or 的工作方式。MSVC 中的 STL 实现大致如下：</p>
<p>从 U 到 T 的转换只会在后备分支中发生，因此计算应该在那里触发。</p>
<p>换句话说，必须通过将 U 转换为 T 来实际构造出 T 对象。</p>
<p>现在来创建一个简单的辅助工具吧！</p>
<p>现在，结果就完全符合我们的预期了。</p>
<p>由于 Lazy 不会缓存操作的结果，因此计算会执行两次：一次针对 b，一次针对 c。</p>
<p>没有任何约束：if (Lazy{...}) 可以通过编译，而且结果可能并不是你所想的那样。</p>
<p>对于我们一开始看到的行为，不能怪罪 std::optional：C++ 会在调用函数之前对函数参数求值，因此无论是否需要，value_or(complex_computation()) 都会执行这项计算。value_or 的有趣之处在于，它只会在后备分支中转换自己的参数。我们的 Lazy 辅助工具正是利用了这一点：它通过转换运算符将计算隐藏起来，因此只有在调用方实际构造该值时才会执行相关工作，否则就会跳过。</p>
<p>我们有意将这个辅助工具保持在最简状态，而这也展现出了它的两个缺点：每次转换时都会重新计算结果，并且它不受约束的转换运算符会悄无声息地转换为任何类型，包括 bool。在下一篇文章中，我们将构建一种更健壮的惰性类型：它会缓存计算结果，并且只转换为其初始化器返回的类型；届时我们还会测量它的运行时开销。</p>
<p>希望你喜欢这篇文章！</p>
<p>MSVC STL：optional::value_or</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-13 20:50 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://cpp-rendering.io/being-lazy-in-c/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-of-always-listening-tech-54a08a89b09a5ae0" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2056" data-content-paragraphs="18" data-published-at="2026-09-13T12:10:30.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 20:10</span>
</div>

### [注意你的言辞：苹果为一个“始终监听”技术的噩梦世界打开了大门](https://this.weekinsecurity.com/watch-what-you-say-apple-opens-the-door-to-a-nightmare-world-of-always-listening-tech/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Watch what you say: Apple opens the door to a nightmare world of always-listening tech</div>

<div class="article-body" data-article-body="true"><p>苹果本周宣布，计划为新款 Apple Watch 推出“始终监听”功能。其中一项功能名为“实时回放”（Live Rewind），可以让你“回到过去”，将最近 15 秒的环境音频以文字转录的形式重放出来。另一项功能名为“Siri 回顾”（Siri Recap），会全天候监听，并将你的对话概括成高层次的笔记，整理成一份书面报告发送到你的 iPhone 上。</p>
<p>苹果声称，这些功能有助于“唤醒”你的记忆。需要付出的巨大代价是：在功能启用期间，你的 Apple Watch 会一直监听你以及其他所有处于其听力范围内的人。</p>
<p>以下是苹果直播活动中的相关部分：</p>
<p>鉴于这些功能注定会引发争议，显然苹果在推出这些功能之前（而且这些功能仍可能发生变化），已经考虑了安全和隐私方面的防护措施。这家科技巨头在其支持页面上表示，这项始终监听技术不会录制或存储音频，而回顾内容采用端到端加密，因此任何经过摘要处理的数据都无法被其他人获取，甚至苹果也无法获取。此外，苹果发布的安全文档[PDF]详细说明了这些功能的工作方式，也值得一读。</p>
<p>更令我担忧的是，正如我在 Bluesky 帖子中所强调的一点：苹果正在为这样一个世界打开大门——其他公司、设备制造商和应用开发者会试图重现或挑战苹果的技术，却把工作做得粗糙得多；与此同时，他们还可能制造出一个更加糟糕的监控怪物，并在此过程中引入新的安全和隐私风险。</p>
<p>到目前为止，已经有一些公司和初创企业制造过始终监听的设备，例如通常配备人工智能功能的吊坠。相比之下，苹果是全球最大的科技公司之一，其全球影响力意味着数百万人将获得这些功能并将其开启。苹果的市场主导地位，加上其制造始终监听技术的决定，树立了一个先例，向其他公司发出“这样做没问题”的信号，使这种侵入性技术逐渐常态化。这也意味着开发这项技术能够赚钱，从而使其成为一个亟待被逐利者颠覆（或利用）的领域。</p>
<p>彭博社（付费）报道称，律师们已经发现，苹果的始终监听技术与美国多个州的法律存在冲突。一些州要求在录音前取得所有相关方的同意，这意味着该功能未来可能面临法律争端。而与此同时，Meta 和 Snap 等公司推出的、配备智能摄像头的“变态眼镜”正在兴起。这类产品未经他人同意就进行录制，已经大幅助长了针对他人的侵害和骚扰。</p>
<p>或者，你也可以提交一次性打赏，或赠送付费订阅，以表达你的支持！</p>
<p>近期文章包括：住宅代理网络如何将黑客藏进你的家中｜2026 年拉斯维加斯 Black Hat、Def Con 和 BSides 大会亮点｜当 AI 聊天机器人和大语言模型触及法律时，请注意你的特权｜私刑主义蔓延至 Flock</p>
<p>尽管苹果一直强调其产品用户的安全和隐私功能，但它并未解释人们如何选择不被苹果用户录音。</p>
<p>本周，我与 Em 聊了聊。她是一名数字隐私与安全技术专家、活动人士，也是 Control Alt Delete 博客的作者；她为 Privacy Guides 撰稿时所做的工作，你一定也见过。Em 告诉我，这些苹果新功能延续了一个“设备不断收集周围环境信息的近期趋势，其中包括收集那些既没有佩戴也没有购买这些设备的人所处环境的信息”，智能眼镜和智能音箱就是例子。</p>
<p>Em 表示，虽然任何人都可以记录自己参与的每一次对话，但这类技术“让这种行为在任何时候、任何情境下发生都变得常态化”。</p>
<p>Em 对我说：“即使苹果似乎已经考虑了一些措施，用来保护 Apple Watch 使用者的隐私和同意权，这项技术对于保护所有与使用者互动的人的隐私和同意权，却几乎没有起到什么作用。”</p>
<p>我还向电子前沿基金会（Electronic Frontier Foundation，EFF）的高级安全与隐私活动人士 Thorin Klosowski 询问了他的看法。他也表示，苹果的做法主要是在保护客户的数据，但对其他任何人几乎没有帮助。</p>
<p>Klosowski 说：“我们越来越多地看到科技公司以这种方式阐释隐私——将其视为个人责任。但隐私从来不只是个人责任，它是一项集体努力，既依赖个人选择，也同样依赖社会契约。”他补充说，我们都应该能够自由交谈，而不必担心科技会记录下所说的一切。“尤其是当它与我们看到的其他类似设备结合在一起时——无论是吊坠、眼镜还是戒指——这里绝对存在着被常态化的风险。”</p>
<p>EFF 隐私诉讼部门主任 Adam Schwartz 补充说，由于人们没有切实可行的方式同意或拒绝录音，“我们建议人们在使用这项技术前三思，以示对他人对话隐私的尊重。”</p>
<p>苹果方面则在其支持页面上表示，用户应当“考虑周围的人，尤其是在对话可能涉及隐私或敏感内容的场合”。苹果似乎传达出的更广泛信息是：准备迎接这样一个世界——日常设备始终在监听。</p>
<p>非常感谢你阅读并订阅《本周安全》！希望你喜欢这篇文章，并觉得它有所帮助。如果你喜欢，请在社交媒体上分享链接！如果你对本文有任何反馈、问题或评论，请联系：this@weekinsecurity.com。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-13 20:10 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://this.weekinsecurity.com/watch-what-you-say-apple-opens-the-door-to-a-nightmare-world-of-always-listening-tech/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--an-artisanal-programmer-041f554ab77bd18e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3666" data-content-paragraphs="26" data-published-at="2026-09-13T11:39:43.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-13 19:39</span>
</div>

### [别再自称“手艺人程序员”了](https://purplesyringa.moe/blog/dont-call-yourself-an-artisanal-programmer/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Don&#39;t call yourself an artisanal programmer</div>

<div class="article-body" data-article-body="true"><p>我本来打算写点别的东西，结果一头扎进了这个深坑里，现在我甚至有点害怕，自己是不是已经被某种宣传手段给洗脑了。</p>
<p>在关于软件开发中 AI 的讨论中，有一个常见的主题：存在两类人，一类是把最终结果看得最重要的“严肃”工程师，另一类是把编码过程的体验看得比最终产品更重要的“手艺人”程序员。这种二分法并不能准确描述我，很可能也不能准确描述许多其他人，但我们姑且先顺着这个逻辑往下说。</p>
<p>我希望我的程序是可靠的。耐心和细致是实现这一目标的两大关键要素。当我从底层开始有条不紊地设计程序时，我心里清楚它们是正确的，出现的任何错误也纯粹只是打字失误。单元测试、大语言模型（LLM）审查以及形式化证明工具可以保证代码达到 99% 的正确率，但无法保证 100% 的正确：达到最优、可维护、可读，且不会因未记录的违规行为而依赖或崩溃。我追求的就是这 100%。唯有与代码建立深层次的连接，我才有可能做到这一点；因此，我拒绝使用大语言模型，因为它们将我与至关重要的底层细节隔离开来，并且无法在构建层面保证正确性。</p>
<p>在我看来，正是从这里开始，这种二分法彻底崩塌了。按定义来看，因为不用大语言模型，我算是一个“手艺人程序员”。但如果业界把“手艺人程序员”的反面称作“软件工程师”，那岂不是潜台词在说我不是工程师？这看似微不足道，但却在潜意识层面产生影响。严谨、专注和精确是工程的核心特征——那么，为什么这个头衔反倒被那些行事风格越来越接近管理者的人据为己有了呢？</p>
<p>回想当年（咳咳），开发者非常反感那些不给时间处理技术债的管理层，而“小步快跑，打破常规（move fast and break things）”的态度曾被视为不成熟的表现。如今，开发者之间的普遍共识却变成了：凭感觉写代码（vibecoding，这里宽泛使用该词）才是常态，而把时间浪费在可靠性工作上反倒成了“不务正业”。到底谁是对的？</p>
<p>在我看来，答案显而易见：你不可能通过盲目胡乱堆砌东西来赢得“软件工程师”的称号。一个工程师应该清楚自己在做什么。不过，我们还是去请教一下在这个话题上更有发言权的人吧。</p>
<p>2021年，希勒尔·韦恩（Hillel Wayne）发起了一个跨界项目（crossover project），采访了多位从其他工程领域转行到软件工程的人。他的目的是回答这样一个问题：在两个领域都有实际经验的人，是否认为我们的工作属于工程？答案是“是的”，但更吸引我的是下面这部分内容：</p>
<p>“尽管如此，许多跨界者还提出了一个附加条件：软件工程确实是真正的工程，但很多写软件的人所做的事并不是软件工程。这不是他们的问题，而是我们这个行业的问题：我们缺乏足够丰富的词汇来描述这些开发者的工作。并不是每一个与电打交道的人都会成为电气工程师，很多人会成为电工。这完全没问题。[……] 但我们却把‘程序员’、‘软件工程师’和‘软件开发者’这些词混为一谈。软件工程师和软件开发者之间究竟有什么区别？有些人提议使用‘软件工匠（software craftsman）’这个词。”</p>
<p>让我吃惊的是，韦恩使用的称谓与当今流行的称谓完全截然相反。他将那些认真细致、如今被我们称为“手艺人程序员”的人称为“工程师”；而在另一端，他将那些如今被我们归类为“氛围编码者（vibecoders）”的人称为“工匠”。至少在我看来，这种命名方式要直观得多！毕竟，比起手写代码，提示词工程里包含的“艺术成分”可以说还要更多一些。</p>
<p>从历史上看，把“手艺人（artisanal）”作为“氛围编码（vibecoded）”的反义词尚且说得通，但认领了这个头衔，就等于将“工程师”一词拱手相让，并且实际上放弃了就“氛围编码到底算不算工程”展开辩论的权利。氛围编码顺理成章地成了默认常态，而手艺人编码则沦为了异类。我们是怎么走到这一步的？</p>
<p>如果你去留意这种“常识”层面的转变，你会发现它无处不在。“唯一”且“正确”的路径发生了根本性的改变。为什么过去我们把 PVS-Studio 的技术文章当成宣传软文，而如今却对自动化审查工具顶礼膜拜？我们又是如何如此迅速地从强类型系统转向自由形式的需求说明的？</p>
<p>编程社区以往从未发生过这样的事。诚然，过去也有关于哪个类型系统更好、哪个 Web 框架更优的争论，主流观点也会随时间推移而演变，但这次截然不同。一个强类型系统的忠实信徒可能会认为 PHP 开发者愚蠢，但依然承认对方是开发者。哪怕是一个滑稽极端的 Rust 狂热者，也依然是一个 Rust 程序员。而且当年的争论，核心在于某种选择是否比另一种更可靠、更易用或更好学，而不是争论你到底该不该关心可靠性或误用问题。</p>
<p>但这次不同了——氛围编码不仅被描绘成一种更好的方案，更被描绘成唯一理智的方案，公然蔑视过去的经验。不用大语言模型的人不再被视为软件工程师，而是被称为手艺人程序员。这是对身份认同的攻击。</p>
<p>重新定义词汇，将自己标榜为清醒理智的一方，而将他人贬为不值一提的存在，是软件领域的一种新策略。不过我以前见过这种手段：它完完全全是法西斯手法的一部分。</p>
<p>我还记得当初大家都在开玩笑说“氛围编码者的反义词是软件工程师”，然而大概才过了一个月，大家就突然心安理得地自称为“手艺人程序员”，并把“软件工程师”拱手让给了那些“负责任的” AI 使用者。这个词以模因（meme）般的速度迅速蔓延开来，看似毫无合理的由头。</p>
<p>我不认为这是一场心理战（psyop），但我确实认为我们应该对如何称呼自己保持警惕，因为语言具有力量。真正的作曲家自称为作曲家，而不是手艺人作曲家；AI 创作者必须自称为 AI 创作者；然而“程序员”这个称谓却未曾经历过辩论，而这正在带来现实层面的后果。</p>
<p>许多极力捍卫艺术家、对 AI 恨之入骨的玩家，一旦提及软件，态度便会来个 180 度大转弯：突然之间，大语言模型生成的代码变得可以接受了，甚至理所当然地认为反正是个人都在用大语言模型，代码也根本不需要标注 AI 免责声明。他们并不是专家，因此修辞辞令比事实本身更起作用。而在修辞游说方面，我们大多数人都糟透了！</p>
<p>我们本该早点吸取这个教训，而且我认为我已经知道了导致我们在所有行业中最先输掉这场阵地战的至少一个因素。在写这篇博文之前，我一直百思不得其解：为什么需要接受系统教育、付出艰苦努力并进行复杂思考的“手艺人”编程被当成儿戏，而在文本框里胡乱喷涌想法、全凭口耳相传的野路子反倒被奉为正统？</p>
<p>现在想来，这大概是由于软件社区中泛滥成灾的反智主义造成的。</p>
<p>在 Rust 还没有流行、也不是人人都知道它有实际用途的时候，反对 Rust 最常见的理由是什么？是说它像原始数学一样，无法用于实际用途。如今人们仍然这样评价 Haskell，尤其是单子（monad）；而 Rust 已经证明，单子其实很容易理解（Result、Option 和 Future 都是单子！）。见鬼，就连指针也被认为很复杂，因为——天哪——使用它们之前你得先学点东西！我们渴望简单的解决方案，但我们真正想表达的是：我们拒绝阅读，只想从 StackOverflow 上复制粘贴代码。哦，等等，搞错年代了，是 Claude。我们看着那些必须在大学里学习、才能从事相关职业的人，然后说：“其实我们比他们强，理应由我们来决定世界如何运行。”如果这不算反智主义，那我真不知道什么才算。</p>
<p>所以，我们当然要否定教育、努力、思考以及从容做事的益处——那些东西都太“觉醒派”了，而我们比那高明。/s</p>
<p>我们需要进行更有力的抗争。目标不是反过来宣称，避免使用 AI 才是编写软件的唯一正确方式，因为那样行不通；目标是确保不使用 AI 的编码在公共讨论中继续占有一席之地，而不是被等同于消遣式编程。</p>
<p>在术语方面，只要使用了 AI，我就会使用“AI 辅助编码”；而手工完成工作时，则使用“无 AI 软件工程”。这样既保留了 AI 使用情况的提示，又调换了“编程”和“工程”这两个词的位置，并去掉了可能被理解为一种玩乐形式的“手工”一词。我认为这是个不错的起点，但欢迎大家提出想法。</p>
<p>更广泛地说，我们需要质疑这样一种假设：AI 辅助编程是编写代码的唯一理智方式。公众已经明白，无论出于什么目的使用 AI 生成的艺术作品，都让人感到不适；我们需要说服他们，同样的原则也适用于 AI 生成的代码。如果一个看到 AI“艺术”的人，即便不会画画，也会因为感觉自己受到了欺骗而不舒服，那么没有理由认为这一点不会适用于程序。</p>
<p>我们需要谈论自己在软件开发中投入的精力，谈论我们如何设计代码、正在面对哪些问题，以及我们协作的方式是多么美好。我们应当强调，故障竞速之所以有趣，是因为我们能看到这些故障源于那些可以理解的人为错误；也要谈谈计算机艺术有多酷，以及开发者打磨自己的应用、改善用户体验时，那种令人感到温暖的时刻。我们需要谈论，也必须承认这并非我们的强项——谈论我们的人性。</p>
<p>在这些艰难的时期，请保护好自己。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-13 19:39 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://purplesyringa.moe/blog/dont-call-yourself-an-artisanal-programmer/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::