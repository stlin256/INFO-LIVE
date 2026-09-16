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
<div id="story-blog-delta-public-beta-5317f5b515f0da46" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1964" data-content-paragraphs="22" data-published-at="2026-09-16T16:27:39.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-17 00:27</span>
</div>

### [用 Delta 取代拉取请求](https://zed.dev/blog/delta-public-beta)
<div class="original-title-sub"><span class="orig-tag">原文</span> Replacing Pull Requests with Delta</div>

<div class="article-body" data-article-body="true"><p>2026年9月16日</p>
<p>今天，我们推出了 Delta 的公开测试版。这是一个用于与代理协作编程并审查其构建成果的多人环境。我们之所以开发 Delta，是因为代理从根本上改变了我们编写软件的方式，但我们的协作工具并没有跟上。</p>
<p>上周，我们跨过了一个重要里程碑：我们关闭了 Delta 自有代码仓库中的拉取请求功能。现在，我们完全在 Delta 内部构建和协作开发 Delta。</p>
<p>Delta 与传统工作流的不同之处在于，协作不依赖于提交和推送代码。你可以直接邀请队友加入你与代理的对话。当有人加入你的线程时，他们看到的工作树与你相同，并且可以在自己的机器上使用这些工作树进行工作。队友可以询问同一个代理，你为什么选择 Mutex 而不是 RwLock。如果你退出工作，他们可以从你离开的地方继续与代理协作。</p>
<p>从今天开始，任何人都可以下载适用于 macOS、Linux 或 Windows 的 Delta；也可以无需下载任何内容，直接在网页上使用；外出时还可以通过移动浏览器跟进线程。</p>
<p>自 GitHub 在 15 多年前推出拉取请求以来，拉取请求一直是请队友审查代码库变更的标准方式。但随着代理生成的代码越来越多，我们要求彼此审查的差异内容也急剧膨胀。</p>
<p>将一个大型差异拆分到一组分支中，可能会让浏览更加容易，但代码背后的决策仍然需要审查。较小的差异无法提供这些上下文。审查者可能会把你的差异交给另一个代理，以帮助理解它，但那个代理必须重新拼凑出你已经完成的决策过程。</p>
<p>为什么队友的代理必须猜测你是如何走到这一步的？</p>
<p>在 Delta 中，你可以邀请任何人从你离开的地方接续一个线程，或者创建一个专门的审查子线程。审查会引导你了解分支中的变更，同时可以访问原始代理的上下文。每次审查都会获得一份父线程工作树彼此隔离的副本，因此你和队友可以使用代理探索代码并尝试变更，而不会干扰原始工作。如果审查者发现问题，他们可以请求修改，或者与代理协作自行修复。审查期间完成的修复，可以在你要求代理将变更合入之前整合回父线程。</p>
<p>Delta 构建于 DeltaDB 之上。DeltaDB 在 Git 基于内容的版本管理基础上，增加了基于差异的增量版本。它会在记录提交的同时，记录提交之间的编辑以及人类和代理发送的消息，从而保留代码在线程中演变的过程。提交仍然是你推送、拉取并据此构建的检查点，而 DeltaDB 会保留这些检查点之间的工作。</p>
<p>你不必把整个团队都迁移到 Delta，才能使用它。</p>
<p>例如，zed-industries/zed 目前仍将保留在 GitHub 上，因为我们的社区在那里报告问题并提交变更。我们鼓励 Zed 贡献者在拉取请求旁边分享 Delta 线程。贡献者可以继续通过 GitHub 提交变更，同时在 Delta 中协同工作；而那些从未打开过 Delta 的队友，仍然看到的是一个普通的 Git 仓库。</p>
<p>现在看来，所有人似乎都在竞相取代 GitHub。大多数竞争者承诺在同一套老旧原语——分支、提交和差异——之上提供更好的正常运行时间。</p>
<p>我们相信，线程将成为软件开发新的基本单元，而用差异来建模线程状态是最佳方式。</p>
<p>拉取请求是我们将要抛弃的 GitHub 工作流的第一部分。取而代之的是 Delta 线程，以及一种我们称为“持续工程”的工作方式。这个行业先让集成实现了持续化，随后又让交付实现了持续化，而软件工程的其余部分仍然以批次方式进行。在 Delta 线程中，变更的构想、实现、审查和合入都可以在同一个地方完成。</p>
<p>我们正在为将开发者带到 GitHub.com 的其他工作流构建更好的替代方案，首先从 DeltaDB 中的 Git 存储开始。从长远来看，基于内容的构建可以将类似 CI 的验证直接带入线程。目前，代理可以通过现有的 CI 服务提供商触发一次运行，并在合入变更之前检查结果。</p>
<p>感谢数千名申请早期访问并帮助我们发现 Delta 不完善之处的人。Delta 仍在成形之中，我们最重视的一些能力还在前方（你可以在这里关注我们接下来正在构建的内容）。但它已经是我们的日常主力工具：自从关闭拉取请求以来，我们 33 个人已经将 570 项变更合入 main。</p>
<p>在公开测试期间，Delta 免费提供。我们很快会为个人和团队推出付费方案。Delta 始终会提供免费版本。</p>
<p>下载 Delta，启动一个代理，邀请队友加入线程，亲自感受其中的魔力。我们很想听听你的使用体验。</p>
<p>欢迎查看 Zed 团队发布的其他类似博客文章。</p>
<p>你可以立即在 macOS、Windows 或 Linux 上试用 Zed。立即下载！</p>
<p>如果你热衷于我们博客所涵盖的主题，请考虑加入我们的团队，帮助我们交付软件开发的未来。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-17 00:27 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://zed.dev/blog/delta-public-beta" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--2026-09-15-ai-bear-html-4c1f63c8573386ac" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="902" data-content-paragraphs="6" data-published-at="2026-09-16T15:04:45.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-16 23:04</span>
</div>

### [为什么在纳维–斯托克斯方程之后，我仍然看空大语言模型](https://dank.systems/posts/2026-09-15-ai-bear.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Why i&#39;m still bearish on LLMs after Navier-Stokes</div>

<div class="article-body" data-article-body="true"><p>【感谢 Claude Fable 5.1、Holden Saberhagen、Gabriel Kammer、Andres Erbsen、Alice McKean 以及 Tristan Wylde-LaRue 对本文提出意见】</p>
<p>先提出几个观点，供读者思考：</p>
<p>综合来看，在大多数领域，大语言模型今后会继续表现得像一个能力很强但不受信任的实习生：在成年人手中行动迅速且效率很高，但不会被允许自行掌控全局。大多数企业将无法采用完全自主的人工智能；这并不是因为能力不足或技术扩散滞后，而是因为当前架构似乎普遍存在一些结构性原因，使其难以实现。依我统计，能够接受完全自主大语言模型的企业类型只有三类：</p>
<p>前两类企业对价格敏感，而且可以说并不需要从廉价模型到前沿模型时所获得的那种推理能力跃升。这些企业中的大多数，最适合使用运行在廉价硬件上的开放模型，甚至可以直接在使用地点本地运行。对于第一类和第三类企业来说，在数学和安全研究中取得头条成果的那种模糊组合搜索，似乎对智能体群的规模宽度比对推理能力更加敏感：例如，小型开放模型复现了推动2026年春季炒作周期的 Mythos CVE。如果确实如此，那么使用廉价开放模型的理由就更充分了，因为这类模型能让你以更宽的群体规模运行相同的工作负载。</p>
<p>第三类企业可能仍会使用前沿模型，不过目前还不完全清楚，它们的工作是否不能用 DeepSeek V4.1 Flash 这类廉价模型完成；而我上文假设的群体规模优势，更让它们有理由推动使用更便宜的模型。这类企业还有一个有趣特征：它们通常对自己的知识产权极其保密，即便 Anthropic 和 OpenAI 声称已达成不使用用户数据训练的协议，它们恐怕也不会乐于把全部知识产权交付给这两家公司。</p>
<p>现在，你可能会提出这样的观点：即使前沿实验室已经走到末路，“装满笨蛋的大型数据中心”这一情景所驱动的人工智能算力需求，也与“人工超级智能”情景一样多。区别在于，装满天才的数据中心能够自动驾驶，其上限只取决于它可以消耗多少算力；而由笨蛋组成的智能体群则会受到人类编排者的严重瓶颈限制。我个人押注的是，冲击范围将远远超出前沿实验室。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-16 23:04 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://dank.systems/posts/2026-09-15-ai-bear.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::