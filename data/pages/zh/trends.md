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
<div id="story-04-bevy-ios-crates-objc2-cb672a40efd1b732" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2189" data-content-paragraphs="26" data-published-at="2026-09-27T23:22:45.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 07:22</span>
</div>

### [彻底从我们的 Bevy iOS crate 中移除 Swift](https://rustunit.com/blog/2026/09-04-bevy-ios-crates-objc2/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Dropping Swift entirely from our Bevy iOS crates</div>

<div class="article-body" data-article-body="true"><p>在这篇短文中，我们将介绍如何移除了 bevy_ios_* crate 中的 Swift 软件包。</p>
<p>过去，我们发布的大多数组件都采用配套形式：一个发布在 crates.io 上的 Rust crate，以及一个需要通过 SPM 添加到 Xcode 项目中的 Swift 软件包。过去几周，我们重新发布了这些组件，这一次不再包含后者。</p>
<p>现在，安装它们只需执行 cargo add。</p>
<p>语言障碍本身并没有消失，我们仍然要在每次调用时跨越这道障碍。变化在于，我们不再需要自行构建并发布这个跨语言连接层。</p>
<p>平台侧代码位于那个软件包中，以 Swift 或 Objective-C 编写，而 Rust 只能通过 C 符号访问它。因此，每个 crate 都带有一套手写的桥接代码，多年来我们最终形成了四种不同的桥接方式：</p>
<p>它们都有相同的缺点：</p>
<p>现在，这些工作全部交给 objc2 及其生成的框架绑定来完成：objc2-ui-kit、objc2-user-notifications、objc2-game-kit 和 objc2-store-kit。苹果的框架本来就是 Objective-C，而与 Swift 不同，Objective-C 拥有一个可以进行通用绑定的动态运行时：选择子（selectors）、类型编码以及 objc_msgSend。这正是 objc2 在底层为我们完成的工作：针对每个框架完成一次。现在，桥接层成为依赖项，而不再是我们需要额外发布的第二个组件。</p>
<p>负责维护 objc2 的 Mads Marquart 曾在我们的 Bevy Meetup 第 13 期活动中就这一主题进行了演讲：《Bevy on iOS - in pure Rust》。非常值得一看。</p>
<p>我们现有的 bevy_ios_app_delegate crate 从一开始就是这样构建的。我们此前关于 iOS 深层链接的文章对此有详细介绍。</p>
<p>先来看最小的 crate。过去，bevy_ios_safearea 由四个类似下面这样的 Swift 函数组成：</p>
<p>此外还需要 Rust 侧对应的 extern &quot;C&quot; 声明、一个 Package.swift 文件，以及在项目中执行 SPM 步骤。如今，全部内容只需要这样：</p>
<p>到目前为止，这只是 Rust 调用平台代码。另一个方向，也就是大部分 protobuf 和 swift-bridge 机制存在的原因，则是另一回事。</p>
<p>借助 objc2，我们可以在 Rust 中定义一个 Objective-C 类，并将其作为委托交给 UIKit：</p>
<p>上面的委托会发送 Event 并调用完成处理程序。send_event 是我们基于 bevy_channel_message 编写的一个小型辅助函数，它会获取插件在构建时设置的发送端。因此，我们的 Event 最终会像以前一样进入 Bevy。</p>
<p>总的来说，我们从 bevy_ios_notifications 中删除了 2809 行代码，其中 1615 行来自一个生成的 Data.pb.swift 文件。bevy_ios_gamecenter 更是减少了 4430 行代码！</p>
<p>还记得深层链接文章中的推送通知令牌吗？现在它已经完成了。</p>
<p>这些令牌只会传递给 UIApplicationDelegate，因此，我们不再从 Swift 侧进行方法调配（swizzling），而是将这两个回调添加到应用已有的委托中；如果应用没有委托，就安装我们自己的委托。如果 bevy_ios_app_delegate 已经设置了一个委托，我们就接入那个委托。</p>
<p>现在，你不再需要添加 SPM 软件包，不需要手动链接 GameKit 或 StoreKit，也不需要在 README 中放置截图。需要正确维护的版本只剩一个，而不是两个。</p>
<p>此外，bevy_ios_gamecenter 和 bevy_ios_iap 又可以为模拟器构建了。</p>
<p>bevy_ios_iap 是唯一的例外。StoreKit 2 仅支持 Swift，没有可供 objc2 绑定的 Objective-C 运行时，因此我们只能重新自行编写桥接层。</p>
<p>因此，这个 crate 仍然保留一个小型 Swift 垫片。不过现在这个垫片位于 crate 内部：build.rs 会使用 swiftc 对其进行编译，并将其静态链接进来。</p>
<p>两端通过手写的、承载 JSON 的 C ABI 进行通信。</p>
<p>这并不漂亮，但你仍然只需执行 cargo add bevy_ios_iap——不需要 SPM 软件包，也不需要发布 .xcframework。该版本目前位于 main 分支，尚未发布。</p>
<p>我们没有大幅更改公共 API，bevy_ios_notifications 是这里的例外，因此请查看它的变更日志。如果你正在使用这些 crate 中的任何一个，请前往 Xcode 项目中删除 SPM 依赖，并升级 Rust 依赖版本。</p>
<p>感谢 objc2 crate 让这一切成为可能。现在，为你的 Bevy 游戏添加一个 iOS crate 只需执行 cargo add！</p>
<p>需要支持构建你的 Bevy 或 Rust 项目吗？我们的专家团队可以为你提供支持！欢迎联系我们。</p></div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://rustunit.com/blog/2026/09-04-bevy-ios-crates-objc2/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-e-your-go-code-to-github-a3f87b429b1324d9" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="953" data-content-paragraphs="7" data-published-at="2026-09-27T20:17:42.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 04:17</span>
</div>

### [不要让你的 Go 代码与 GitHub 绑定](https://iain.rocks/blog/dont-couple-your-go-code-to-github)
<div class="original-title-sub"><span class="orig-tag">原文</span> Don&#39;t couple your Go code to GitHub</div>

<div class="article-body" data-article-body="true"><p>首页 博客 分类</p>
<p>Go 的一个优点是，你可以使用获取代码的位置为代码设置命名空间。这意味着，如果你把 Go 代码托管在 http://github.com/thetrueares/boneclone，那么代码中就会有一行 import “github.com/thetrueares/boneclone”，Go 会通过 git 获取它。这样一来，你很容易知道应该去哪里报告开源库的漏洞；同时，无需集中式包管理系统，也能非常方便地获取和分发 Go 库。对很多人来说，这实际上就是 git 托管服务的位置，但这样做也有一些缺点。你应该使用自己的自定义域名，下面我会解释原因。</p>
<p>使用 git 托管位置的主要问题是，你的代码现在与某个托管服务商绑定了。也就是说，如果你把 git 托管迁移到 GitLab，就必须修改代码！否则，你获取的将是旧版本。这可能导致你因为迁移所需的工作量太大，而无法更换 git 托管服务商。于是，你实际上就把代码和 GitHub 绑定在了一起。这听起来完全不可思议，但在 Go 社区中，这几乎已经成为事实标准。</p>
<p>我见过这样一个问题给一家公司造成了巨大困扰：他们同时使用 GitLab、GitHub 和 Azure DevOps，因为更改代码位置是一项如此庞大的任务，而他们又“没有时间”处理，所以对他们来说，同时在三个平台上运营反而更容易。这也是我开发 Boneclone 的原因——让它能够同时在多个 git 托管平台之间复制代码骨架。因此，这个问题确实让公司付出了金钱代价，因为他们不得不同时支付三项托管服务的费用。</p>
<p>解决方案是使用自定义域名，例如 go.iain.rocks、go.uber.org、go.mongodb.org 等。这样，你只需要更改这些域名所指向的位置即可。例如，go.iain.rocks/boneclone 指向 github.com/thetrueares/boneclone；如果我迁移到 GitLab，终端用户无需做任何改变，安装命令也保持不变。</p>
<p>在我看来，每一个使用 Go 的商业软件开发团队，都应该使用自定义域名为内部库和软件包设置命名空间。因为这是一种避免无谓耦合的简单方法。</p>
<p>下面是我的配置副本，你也可以据此为自己的项目完成设置。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-28 04:17 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://iain.rocks/blog/dont-couple-your-go-code-to-github" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-yner-latest-news-updates-c21e5bc205fc8b7d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="315" data-content-paragraphs="7" data-published-at="2026-09-27T17:11:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 01:11</span>
</div>

### [英国政坛直播：帕特·麦克法登告诉工党活动人士，不应维护福利制度的“现状”，因为这会“放弃”福利申请者](https://www.theguardian.com/politics/live/2026/sep/27/uk-politics-live-labour-party-conference-andy-burnham-angela-rayner-latest-news-updates)
<div class="original-title-sub"><span class="orig-tag">原文</span> UK politics live: Pat McFadden tells Labour activists they should not defend benefits system ‘status quo’ because it ‘writes off’ claimants</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/8ba2e7292347cd94c03767c5fa1c2d37143b9521/952_0_6990_5592/master/6990.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=74ee6211bba04b3789c6b20369f02c5e" alt="英国政坛直播：帕特·麦克法登告诉工党活动人士，不应维护福利制度的“现状”，因为这会“放弃”福利申请者" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>工作与养老金大臣表示，当前制度存在缺陷，因为它让太多人一辈子依赖福利，而如果他们工作，生活状况本可以更好</p>
<p>“我能做到”：伯恩汉姆在工党大会前夕承诺进行激进改革</p>
<p>库恩斯伯格向伯恩汉姆提出，根据卫生基金会的说法，如果建立一种在提供服务时免费提供成人社会照护的制度（类似于国民医疗服务体系提供的医疗服务），将耗资180亿英镑。</p>
<p>伯恩汉姆说，这一成本“没有那么高”（也就是说，没有180亿英镑那么高）。</p>
<p>但我能否直接谈谈成本问题？</p>
<p>路易丝·凯西仍在为我们进行正式审查，所以，如果你愿意这么说的话，我将在周二（即他在大会上的演讲中）阐明这一愿景。</p>
<p>随后，路易丝将帮助我们解决具体实施问题。我们如何实现这一目标？什么时候能够实现？</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-28 01:11 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/politics/live/2026/sep/27/uk-politics-live-labour-party-conference-andy-burnham-angela-rayner-latest-news-updates" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--sep-27-glp-1s-hair-loss-c8002a227accaf2f" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="264" data-content-paragraphs="3" data-published-at="2026-09-27T16:00:08.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 00:00</span>
</div>

### [使用GLP-1会导致明显脱发吗？](https://www.theguardian.com/wellness/2026/sep/27/glp-1s-hair-loss)
<div class="original-title-sub"><span class="orig-tag">原文</span> Does GLP-1 use result in significant hair loss?</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/ed317926bf97ddd3eb738297a72205f318005c17/0_0_3000_2400/master/3000.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=6459929745aaf517e7e8bf6acfb7bac2" alt="使用GLP-1会导致明显脱发吗？" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>使用GLP-1相关药物会导致脱发吗？随着研究人员对这一副作用的关注增加，专家分享了你需要了解的信息。</p>
<p>美国、英国和欧盟约有2000万人正在使用替尔泊肽、司美格鲁肽等GLP-1受体激动剂减重或治疗2型糖尿病（Ozempic或Mounjaro是常见品牌）。随着这类药物的使用大幅增加，我们也逐渐了解到更多有关其副作用的信息。近期受到研究人员广泛关注的一项副作用是脱发。</p>
<p>在一项针对这些药物使用者的调查中，20%的受访者出现了脱发。不过，由于目前缺乏通过随机对照试验评估这一副作用的高质量数据，因此很难确切判断其发生率究竟有多高。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-28 00:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/wellness/2026/sep/27/glp-1s-hair-loss" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-y-of-care-to-their-users-b6f3c988b4d6f119" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1258" data-content-paragraphs="15" data-published-at="2026-09-27T14:44:53.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-27 22:44</span>
</div>

### [“他们根本没有对用户负有注意义务的概念。”](https://unsung.aresluna.org/they-had-no-concept-of-a-duty-of-care-to-their-users/)
<div class="original-title-sub"><span class="orig-tag">原文</span> “They had no concept of a duty of care to their users.”</div>

<div class="article-body" data-article-body="true"><p>计算机科学家 David Chisnall 在 Mastodon 上发布的一篇帖子，有一个非常符合 Unsung 风格的开头：</p>
<p>我大约从 2000 年起就一直使用 vim。我用它写了五本书、一篇博士论文、几十篇论文以及 150 多篇文章。如今，我使用一大批常见的 vim 命令时，根本不需要动用高阶脑功能，它们自然而然就发生了。用其他工具写的文档中间会莫名其妙地出现 :w。</p>
<p>Chisnall 接着谈到了 vim 的一项具体功能：</p>
<p>持久撤销是我最喜欢的 vim 功能之一。[…]</p>
<p>我并不经常需要持久撤销。但在少数几次确实用到它的时候，它都无比宝贵：糟糕，我把这个文件里的某些内容删掉了，也许是在上周、上一次重启之前删的，到底是什么来着？不断撤销，直到找到它，然后复制，再粘贴到当前版本中。或者更常见的情况是：刚才它还能正常工作，我为准备提交而整理了一番，现在却不能用了，我做了什么？</p>
<p>在大约 20 年的时间里，vim 一直能在主要版本升级过程中保持这项功能正常运作。我甚至不会去想它，因为这只是拉斯金第一定律的一部分：程序不得损害用户的数据，也不得因不作为而任由用户的数据受到损害。如果 vim 或计算机崩溃了，或者我关闭了某个文件，六个月后再回来，我的撤销历史仍然在那里。</p>
<p>NeoVim 是 vim 的一个分支（它因其他原因登上了新闻）：</p>
<p>所以，NeoVim 刚推出不久时我就试用了它。还是你熟悉的 vim，但更好？太棒了！</p>
<p>我在 NeoVim 中注意到的第一件事，就是撤销功能不起作用。我尝试用 vim 打开该文件，撤销功能在那里也不起作用。</p>
<p>NeoVim 改变了撤销文件的格式。它没有升级旧文件，也没有为其撤销文件使用不同的名称。它只是注意到存在一个 vim 撤销文件，然后把它删除了（导致其中的全部数据丢失），再用一个 vim 无法读取的文件替换了它。</p>
<p>我就此提交了一个问题报告，得到的答复是：持久撤销的格式并不稳定，用户不应指望某项明确名为“持久撤销”的功能能够保留数据。这个格式已经改过一次，今后很可能还会再改。</p>
<p>我的 NeoVim 体验也就此结束了。其作者立即表明，他们绝对不值得托付我的任何数据。把持久撤销弄坏，我可以把它当作一个 bug 原谅；但他们所持的那种态度——仅仅因为某个文件是持久保存在你的文件系统中的、里面还包含你可能需要的数据，就认为这并不能成为阻止程序删除它的理由——说明他们根本没有对用户负有注意义务的概念。</p>
<p>我喜欢这篇帖子（我几乎完整地引用了它），因为它涵盖了几件重要的事情：</p>
<p>我也很喜欢其中出现了拉斯金第一定律。Jef Raskin 因 Macintosh 和 Canon Cat 而闻名，他在 2000 年出版的《人性化界面》（The Humane Interface）一书中整理出了这三条定律，内容如下：</p>
<p>这本书在我年轻时作为设计师与它相遇，对我而言是一部非常重要、影响深远的作品。我完全不明白，为什么直到今天这些定律还没有登上 Unsung。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-27 22:44 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://unsung.aresluna.org/they-had-no-concept-of-a-duty-of-care-to-their-users/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--incident-september-2026-05350af4fc9462bb" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1613" data-content-paragraphs="15" data-published-at="2026-09-27T13:58:57.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-27 21:58</span>
</div>

### [LuaRocks 2026年9月安全事件](https://luarocks.org/security-incident-september-2026)
<div class="original-title-sub"><span class="orig-tag">原文</span> LuaRocks Security Incident September 2026</div>

<div class="article-body" data-article-body="true"><p>2026年9月25日，我们收到一份关于 LuaRocks.org 存在远程代码执行漏洞的报告，该报告通过美国网络安全和基础设施安全局（CISA）协调处理。该漏洞已于9月26日修复。在调查过程中，我们发现，该漏洞曾于2026年7月9日至8月20日期间多次在 LuaRocks.org 服务器上被利用。</p>
<p>由于攻击者能够在服务器上运行代码，我们将该服务器能够访问的所有内容都视为已暴露。该网站已迁移至一台新建的服务器，旧服务器持有的每一项凭据均已撤销并更换。</p>
<p>我们没有发现现有软件包遭到修改的证据。下文将介绍我们检查的具体内容。</p>
<p>rockspec 是一个 Lua 文件。每当有人上传该文件时，LuaRocks.org 都会运行它，以读取软件包名称和版本等字段。为安全地完成这一操作，网站使用 loadstring 加载该文件，并通过使用空环境（setfenv）运行生成的函数，使其无法访问任何全局变量，同时限制它能够执行的指令数量。LuaRocks.org 运行在 OpenResty 上，因此这一过程发生在 LuaJIT 中。</p>
<p>问题出在文件的加载方式上。在 Lua 5.1 和 LuaJIT 中，loadstring 默认接受两种输入：Lua 源代码，以及预编译字节码（由 luac 或 luajit -b 输出，开头是字节 \27）。rockspec 解析器一直只预期接收源代码，但从未告知 loadstring 拒绝字节码，因此上传的“rockspec”也可能实际上是字节码。</p>
<p>从不受信任的来源加载字节码并不安全。LuaJIT 完全不会对字节码进行验证，因此手工构造的文件可以包含读取和写入函数自身数据范围之外内容的指令，从而访问服务器进程中的任意内存。空环境只能控制代码能够查找哪些全局变量，而这类字节码根本不需要全局变量：它可以在内存中找到真实的 Lua 状态，并调用原本应由沙箱隐藏的函数，在 Web 服务器内部运行任意代码。</p>
<p>修复方案是在调用 loadstring 时传入 “t”（仅文本）模式，LuaJIT 支持该模式；同时，对于任何以 \27 开头的文件也直接拒绝，因为 PUC Lua 5.1 会忽略 mode 参数。用于从其他服务器读取清单的代码存在同样的问题，现在也会以仅文本模式加载这些清单。</p>
<p>我们发现有三个为此目的创建的账户利用了这一问题：</p>
<p>Web 服务器运行所使用的账户能够获得服务器的完整管理权限，因此我们假定攻击者可能读取了服务器上的任何内容，包括整个数据库。</p>
<p>由于发生过远程代码执行，我们假定机器上的任何内容都可能已被攻击者读取：</p>
<p>LuaRocks.org 每天都会将公开清单以及每个已发布的 rockspec 和 rock 复制到一个公开的 Git 仓库 rocks-moonscript-org/moonrocks-mirror（开发版本则复制到 moonrocks-dev-mirror）。每次每日提交都会准确记录已发布文件中新增、变更或删除的内容，因此该仓库保存了 LuaRocks.org 所提供文件的每一次变更历史，并且位于服务器之外。这段历史记录让我们得以获得首次攻击前的副本，并与之进行比较。</p>
<p>经过这次分析，我们没有发现任何现有模块遭到篡改或替换的证据。</p>
<p>我们能够核实的内容存在一定局限。被攻击者删除的软件包，看起来与被其所有者删除的软件包没有区别；我们也无法检查遭到入侵的服务器发送给客户端的确切内容。恶意 rockspec 还被复制到了 mirror.luarocks.org 以及 GitHub 上的公开镜像仓库，目前已从两处删除。</p>
<p>如有疑问，请在 LuaRocks.org 的问题跟踪器上发起讨论，或直接发送电子邮件至 leafot@gmail.com 联系我。</p>
<p>感谢报告这一问题的研究人员。对于该问题进入代码库且未能更早被发现，我们深表歉意。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-27 21:58 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://luarocks.org/security-incident-september-2026" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::