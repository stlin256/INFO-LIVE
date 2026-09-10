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
| **Tell us: has your medical cannabis prescription come from a private health provider?** | `待评估` | `待核验` | 【The Guardian Society (卫报社会与民生)】Tell us: has your medical cannabis prescription come from a private health provider?：外文正文正在进行中文翻译，暂不展示未翻译原文。 |
| **Rust Is Tier-1 Language at Microsoft** | `待评估` | `待核验` | 【Lobste.rs (极客思想社区)】Rust Is Tier-1 Language at Microsoft：外文正文正在进行中文翻译，暂不展示未翻译原文。 |
| **MPs on both sides urge Commons not to take ‘extraordinary risk’ of forcing through assisted dying bill** | `待评估` | `待核验` | 【The Guardian Society (卫报社会与民生)】MPs on both sides urge Commons not to take ‘extraordinary risk’ of forcing through assisted dying bill：外文正文正在进行中文翻译，暂不展示未翻译原文。 |
| **Package Manager Trends** | `待评估` | `待核验` | 【Lobste.rs (极客思想社区)】Package Manager Trends：外文正文正在进行中文翻译，暂不展示未翻译原文。 |
| **Announcing the first Guix-Science release** | `待评估` | `待核验` | 【Lobste.rs (极客思想社区)】Announcing the first Guix-Science release：外文正文正在进行中文翻译，暂不展示未翻译原文。 |
| **NHS reports busiest ever summer as heatwaves drive up hospital admissions** | `待评估` | `待核验` | 【The Guardian Society (卫报社会与民生)】NHS reports busiest ever summer as heatwaves drive up hospital admissions：外文正文正在进行中文翻译，暂不展示未翻译原文。 |
| **Ukraine Hits 8 Russian War Sites From Arctic to Caspian** | `待评估` | `待核验` | 【Reddit r/worldnews (国际公众热议)】Ukraine Hits 8 Russian War Sites From Arctic to Caspian：外文正文正在进行中文翻译，暂不展示未翻译原文。 |
| **Decoding the NEC V20 Microcode** | `待评估` | `待核验` | 【Lobste.rs (极客思想社区)】Decoding the NEC V20 Microcode：外文正文正在进行中文翻译，暂不展示未翻译原文。 |

## 💬 思想社区与网民观点争鸣

## 📰 社会民生、思潮与社群核心要闻

::::grid{cols=2}
:::cell
<div id="story-kage-manager-trends-html-bff4375ee6041894" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3316" data-content-paragraphs="14" data-published-at="2026-09-10T12:30:44.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 20:30</span>
</div>

### [包管理器发展趋势](https://nesbitt.io/2026/09/10/package-manager-trends.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Package Manager Trends</div>

<div class="article-body" data-article-body="true"><p>min-release-age、minimum-release-age、-Zmin-publish-age、cooldown（冷却期）。<br />2026年9月10日 包管理器 供应链 安全<br />我本周在休假，所以这篇有点偷懒应付，盘点一下我在《包管理本周动态》（This Week in Package Management）连续十六期中所观察到的趋势。那些文章整理自大约八十个 RSS 源以及我在 Mastodon 上转发的内容。简而言之：相同的防御性功能接二连三地进入各个工具，而修复的往往也是同样三类漏洞缺陷。</p>
<p>版本发布冷却期（Release-age cooldowns）是出现在最多工具中的特性：Deno 2.8 于 5 月在其 .npmrc 处理逻辑中添加了 min-release-age；到了 9 月初，Bundler、npm、Yarn、mise、Hex、Mamba 以及 Cargo（通过 nightly 版本的 -Zmin-publish-age 标志）均已上线了类似门禁。Dependabot 在 8 月将三天冷却期设为无条件默认规则。冷却期与安全更新之间的联动成为了一个高频出现的特殊场景：Dependabot、Renovate 和 Hex 各自添加了相应机制，在被阻断的版本收到安全通告时解除门禁限制。Nx 遭入侵事件的复盘报告指出，旧版 pnpm 会忽略 minimum-release-age 配置；现在 npm 12 和 pnpm 12 遇到无法识别的配置项时都会直接报错，而不是直接忽略。</p>
<p>在 JavaScript 工具中，默认拦截安装脚本（Install-script blocking）已成标配。npm 12 默认拦截生命周期脚本，并提供 allowScripts 白名单；Bun 1.4 将自动信任限制为从 npm 官方源拉取的包；pnpm 则将 allowBuilds 扩展到了 Git 托管的依赖项。与此同时还推出了相关的安装源限制：npm 12 的 allow-git 和 allow-remote 默认设为 none；Composer 2.10 在下载失败时禁用了从 dist 回退到 source 的机制。</p>
<p>在安装和发布环节进行恶意软件检测的功能已在多个工具中落地：Composer 2.10（针对 Aikido 提供的源进行原生过滤，默认开启）、uv（通过 UV_MALWARE_CHECK 以及随后的配置项支持），以及 npm 官方源——该源目前在发布时进行扫描，并可在包元数据中附带 contentPolicy 判定结果。有五个工具新增或扩展了内置审计命令：Deno（deno audit fix）、uv（uv audit，后扩展为 uv tool audit）、Homebrew（brew vulns 合并入核心库）、Bun（bun audit fix），以及 Hex（现在会在 mix deps.get 期间提示安全建议）。</p>
<p>pnpm 和 mise 在数个版本迭代中，逐步将检入代码仓库的项目配置与机器级信任隔离开来。pnpm 逐步禁止了项目级的 .npmrc 和 pnpm-workspace.yaml 重定向凭证、展开环境变量、影响自更新或重定向机器级状态目录。mise 将 credential_command 改为仅限全局生效，增加了 MISE_SAFE=1 纯读取安全模式，Renovate 也已将其应用于 lockfile 更新。</p>
<p>pnpm 将 tarball 完整性校验不匹配定为严重致命错误（hard failure），并开始拒绝缺少 integrity 字段的 lockfile 条目；而 uv 0.12 强制推行 --require-hashes 并拒收仅有 MD5 校验的源。Bun 1.4 则为 GitHub 和 tarball 依赖项记录 SHA-512。</p>
<p>源站端（Registry-side）控制也在收紧：npm（分阶段发布、针对绕过双重认证的令牌限制）、Packagist（不可变版本、透明度日志）、PyPI（拒绝向发布超过十四天的版本添加新文件）、NuGet.org（API 密钥有效期从 365 天缩短至 30 天），以及 AUR——在经历以 alvr 为首的两起被恶意接管事件后，AUR 禁用了弃管包（orphaned-package）认领功能。</p>
<p>在安全领域之外，工作区（workspace）和单体多包仓库（monorepo）支持在 PDM、Conan、pixi、Hatch、uv 和 mise 中上线或转正，pnpm 12 的 Rust 重写版本也达到了稳定状态。GitHub Actions 引用开始被当作托管依赖项对待：pnpm、Dependabot 和 Renovate 各自为工作流的 uses: 条目增加了更新或 lockfile 锁定支持。</p>
<p>在全部十六周中，有十四周至少修复过一次归档解压或安装时的路径遍历漏洞，涉及 uv、pnpm、RubyGems、Podman、Composer、Guix、opam、ORAS、Docker、Flatpak 和 Poetry。指向目标目录之外的软链接、包名或 lockfile 键中的 ../、带有相对路径硬链接，以及解析到包外部的 bin 入口，这些问题屡见不鲜。单是 pnpm 就发布了四次独立的路径遍历修复；Docker 发布了三次，Composer 发布了两次。</p>
<p>凭证被发送给错误主机或泄露到日志输出中的频率几乎同样高：Cargo 1.96 修复了针对规范化源 URL 的身份验证问题；Dependabot 修复了 npm 源凭证被发送到同一主机同级路径的漏洞；ORAS 1.3.4 修复了向任意 HTTPS 对端提供 mTLS 证书、跨域转发自定义请求头，以及在调试输出中打印预签名 URL 的问题；Composer 2.10.3 修复了可能将凭证发送到错误域名的 GitLab URL 匹配漏洞；Renovate 披露了通过恶意 Link 头导致凭证外泄以及日志中暴露 TLS 私钥的四条外泄路径。RubyGems.org CDN 则因缓存配置错误，将一个账户的旧版 API 密钥分发给了另一个账户。</p>
<p>通过版本控制系统（VCS）URL 或引用实施命令注入的漏洞出现在 pnpm（git commit 字段允许 --upload-pack 注入）、Docker（git bundle 检出）和 Composer（Perforce URL）中。Renovate 的十起安全通告中也有四起属于此类。</p>
<p>Alpha-Omega 资助了 PHP 基金会和 Ruby Central 的驻场安全工程师项目；Rust 基金会设立了维护者基金，并在 8 月公布了由 Google、AWS 和 OpenAI 赞助的首批驻场人选。Sovereign Tech Agency 向 Flatpak 投资了 508,640 欧元，并出现在通过 PHP 基金会运营的全新 Composer 赞助计划中。纽约大学坦登工程学院启动了软件供应链安全运营中心，选拔硕士研究生进驻开源项目开展为期一年的安全工作。</p>
<p>Python 软件基金会宣布举行首届 Python 打包委员会选举，截至 8 月中旬共有 17 名候选人。在停用废弃方面，Helm v3 设定了截至 2027 年 2 月的生命周期结束（EOL）时间表；Go 放弃了对 Bazaar VCS 的支持；pip 宣布废弃传统解析器并计划于 2027 年彻底移除；Nixpkgs 核心团队解散；Maven 3.8.x 停止支持。</p>
<p>不再自带电池，第四排货架有售<br />用于 composer install 的 uBlock Origin<br />TUF、in-toto 和 Sigstore 只有在一切风平浪静时才显得毫无意义<br />apt install -t unstable，但把它变成你的全部人设<br />安妮·罗宾逊想找 .github/workflows 谈谈</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-10 20:30 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://nesbitt.io/2026/09/10/package-manager-trends.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ix-science-first-release-363f8beccfcabbff" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1417" data-content-paragraphs="17" data-published-at="2026-09-10T11:45:49.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 19:45</span>
</div>

### [Guix-Science 首个版本发布公告](https://hpc.guix.info/blog/2026/09/guix-science-first-release/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Announcing the first Guix-Science release</div>

<div class="article-body" data-article-body="true"><p>我们非常高兴地宣布 Guix-Science 频道的首个版本发布：v20260907。</p>
<p>这是来自 Guix-Science 项目的专属 Guix 频道。该频道提供了一个全面的、社区驱动的科学软件目录，适用于全球科研界。</p>
<p>随着 Guix 在科研场景中的使用日益增多，对科研和教学领域所用软件进行打包的需求也与日俱增。尽管 Guix 项目鼓励用户向 Guix 主频道贡献软件包，但某些软件包无法收录其中，原因在于它们不符合 Guix 的打包政策，或者因为它们过于专业化而无法在 HPC（高性能计算）环境之外使用。相比 Guix 主频道，Guix-Science 频道拥有更宽松的政策，尤其是在使用预构建组件方面。此外，它拥有比 Guix 本身更宽容的弃用政策。</p>
<p>Guix-Science 频道由科研从业者维护，并服务于科研从业者。我们将该频道视为涵盖广泛领域的科学软件包核心枢纽。这使得社区能够共同分担打包和维护工作。我们鼓励您参与该频道的开发。此外，一旦软件包被纳入 Guix-Science，二进制替代物（binary substitutes）就会在我们的基础设施上完成构建，并向所有人公开提供。</p>
<p>Guix 采用滚动发布模式。这意味着一旦软件包进入 master 分支，用户就会收到更新。因此，Guix-Science 频道也遵循相同的方式。得益于 guix time-machine 命令，用户无需担心频道的更新会破坏其环境。该机制允许用户固定（pin）其频道，从而掌控何时更新其环境。</p>
<p>在日常使用中，科研从业者常遇到一个烦心事：Guix 与 Guix-Science 频道需要保持兼容。尽管 Guix 和 Guix-Science 的维护者都尽最大努力避免出现损坏，但 Guix 中某个无关的改动仍有可能对某些 Guix-Science 软件包造成影响，并可能导致其损坏。</p>
<p>Guix-Science 发布版本是 Guix-Science 和 Guix 两者的快照，其中 Guix-Science 提供的所有软件包均可正常安装。发布版本是 Guix-Science 频道打上了标签（tag）的提交，其中提供了一个 channels 文件。该 channels 文件声明了 Guix-Science 对 Guix 本身频道的依赖关系。如果您查看带标签的提交信息，会看到如下部分：</p>
<p>标签名称遵循以下模式：vYYYYMMDD。</p>
<p>您可以通过检出 Guix-Science 代码并使用以下命令查看并验证标签的内容：</p>
<p>要获取该版本，您有两种选择：</p>
<p>使用 guix time-machine：</p>
<p>如果您是第一次使用 Guix-Science，这将导致报错：</p>
<p>要解决此问题，请通过将以下代码段添加到 ~/.config/guix/trusted-channels.scm 中，将 Guix-Science 标记为“受信任”：</p>
<p>此版本包含来自广泛科学领域的 2,354 个软件包。</p>
<p>本版本的亮点包括：</p>
<p>展望未来，我们计划定期发布新版本。敬请关注 Guix-Science - Releases。我们鼓励大家积极参与到该频道的建设中。</p>
<p>除非另有说明，本网站上的博文版权归各自作者所有，并根据 CC-BY-SA 4.0 许可证以及 GNU 自由文档许可证（1.3 或更高版本，无不变章节，无封面文本，无封底文本）的条款发布。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-10 19:45 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://hpc.guix.info/blog/2026/09/guix-science-first-release/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-g-nec-v20-microcode-html-ea8b1816920f014c" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1324" data-content-paragraphs="19" data-published-at="2026-09-10T10:44:09.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 18:44</span>
</div>

### [解码 NEC V20 微码](https://martypc.blogspot.com/2026/09/decoding-nec-v20-microcode.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Decoding the NEC V20 Microcode</div>

<div class="article-body" data-article-body="true"><p>reenigne 在 2020 年对 8088 微码的解码，为 8088 CPU 的极高精度仿真敞开了大门。</p>
<p>尽管我已经在 MartyPC 中添加了对 NEC V20 的支持，但从 V20 的实际时序来看，该 V20 核心并未达到周期精确（cycle-accurate）。它不过是披着 V20 外衣的 8088——也就是直接复制粘贴了我的 8088 核心，并生硬地附加了 V20 指令。</p>
<p>这并非理想状态，但在没有微码的情况下，试图让我的 V20 核心实现周期精确，似乎注定是一场令人望而却步、反复试错的苦旅。</p>
<p>既然如此，为什么不直接获取微码呢？</p>
<p>最近，我委托 InfoSecDJ 对一枚 NEC V20 CPU 进行了裸片摄影（晶圆拍照，实际上是由夏普代工的第二货源 V20，但它终究是一颗 V20）。他的工作极其出色。</p>
<p>这幅拼接全景照片的分辨率极高——确切地说是 56 亿像素（5.6 Gigapixels），达到了惊人的 70478x80672 分辨率——尺寸大到甚至无法塞进 JPEG 图片格式中！</p>
<p>你可以在此处查看完整分辨率的全貌。</p>
<p>位于裸片中心正下方的矩形区域就是主微码 ROM。</p>
<p>这就是一次训练运行时的样子。</p>
<p>如果你拥有一张支持 CUDA 的 GPU，训练过程会相当迅速——这仅仅花费了几分钟。</p>
<p>我们的核心思路是尽可能提高准确率——但达到 1.0 既不现实，甚至可能并非好事（存在一种被称为过拟合的现象）。有时候训练时间过长反而会让结果更糟，因此如果我们没有看到持续的改善，就会终止训练。</p>
<p>训练的输出是一个神经网络模型——随后我们可以使用该模型对整个输入数据集进行推理。所谓推理，不过是一个高级术语，指的是应用我们的模型来真正执行我们训练它做的事情——预测给定的图像中包含的是 0 位还是 1 位。</p>
<p>在继续之前，先做个简要说明以消除任何潜在的争议。从计算机科学的角度来看，卷积神经网络（CNN）宽泛地属于人工智能（AI）的范畴，但我们并没有在现代那种通常指代大语言模型（LLM）的争议性意义上使用“AI”。</p>
<p>当我们运行一次推理时，会得到每个像素的置信度分数。我们可以利用这个置信度分数来标记模型不太确定的位，阈值设定在某个特定值以下（我在这里使用了 &lt; 99%）。这是第一次运行的结果，模棱两可的位被标为了红色：</p>
<p>我把所有模棱两可的位挑选出来，手动重新分类归入训练文件夹，然后重新运行训练，如此反复，直到我得到了这个结果：</p>
<p>这已经相当不错了——仅剩 4 个位仍然模棱两可，直接手动核对它们比重新训练另一个模型还要快。</p>
<p>太棒了，我们拿到了 29k 的微码位，并且省去了数小时枯燥的手工劳动（代价是花了几小时用 Python 编写训练脚本，但至少它是可以复用的！）。</p>
<p>我们仍然需要将这团矩形二进制位转换成一份由 29 位微码字组成的列表。换句话说，我们需要重新组织位图，直到它变成 29x1032 而不再是 258x116。具体该如何操作目前还不甚明朗，但在解码出相匹配的译码器 PLA 之前，我们可以先把这个问题搁置一边。</p>
<p>译码或“激活”PLA 位于主微码 ROM 块的上方，两者之间夹着一些中间电路。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-10 18:44 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://martypc.blogspot.com/2026/09/decoding-nec-v20-microcode.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-it-breaks-a-village-5e2bd164df4280f1" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="6678" data-content-paragraphs="23" data-published-at="2026-09-10T10:38:37.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 18:38</span>
</div>

### [毁掉一个村庄：Bevy 六周年记](https://blog.fallible.net/it-breaks-a-village/)
<div class="original-title-sub"><span class="orig-tag">原文</span> It Breaks a Village: Bevy&#39;s 6th Birthday</div>

<div class="article-body" data-article-body="true"><p>这篇文章与我所有的文章一样，均由我亲笔写就。它源自与许多人的大量交流与反思。文章篇幅较长。我向你保证，完整且保持开放心态阅读它，而非仅仅进行摘要或单看小标题，定会有所收获。<br />文中所表达的观点纯属我个人所有，不代表与我相关的任何个人、组织或公司。<br />感谢我就此话题交流过的 Bevy 社区中的每一位成员。<br />（去年：GiGF 与 Bevy 五周年）<br />今年初夏，Bevy 游戏引擎接连发生了一系列利好之事。随着 0.19 版本的发布，BSN 宏终于完成合并。我们拥有了声明式数据模型，UI 如今变得切实可行。真正美术工具链的基石已经奠定。这是一项里程碑式的成就。<br />与此同时，Rustweek 2026 是我在现实生活中与技术人群度过的最美好体验，我结识了许多优秀的人，度过了数日美妙的交流时光。我没有遇到任何一次不愉快的经历，遇见的每个人都很亲切、相处愉快，我很乐意未来继续与他们交往。<br />然而自那以后，事情开始变得棘手。<br />几个月来，我一直在致力于对插件 API（Plugins API）进行彻底重构。其目的在于重构插件系统，使依赖关系成为可能，并让未来的工具链更加强大。这一设计最终是否能进入引擎尚无定论，但我正在努力论证这是一个不错的方案。等我写出专门的相关文章后，会将其发布在我的技术博客上。我的动机此前已在其他地方提及，但不久后我还会再次专门撰文。<br />而在过去的 5 周里，这项工作几乎完全停滞了，因为此刻只要尝试编写与 Bevy 相关的代码，就会让我感到彻头彻尾的恶心。反胃翻腾、极度欲呕。我的脑海无法停止胡思乱想：在当下的这个时间节点，身为一名开源贡献者究竟意味着什么。<br />也许这种具体的感受只有我一个人有，但觉得当下向 Bevy 贡献代码感觉极其糟糕的，绝非我一人。<br />注：过去几天里讨论有所增加，这可能会让人觉得我是在对最近发生的事情发表评论，但我这里提出的大多数论点，早在数周前就已列出并起草。<br />Bevy 最近通过了一项新的“AI”政策1，（按照公开声明的意图）比以往略微更加宽容。从字面上看，它无可厚非。但问题出在其制定的背景上。<br />推出该新政策的公开理由是：我们需要对人们使用大语言模型（LLM）的现状保持“现实”，而且原先的政策“无法执行”。文中列举了一些案例，即某些人的个人资料和 Pull Request（PR）未能通过直觉审视（sniff test），但当唯一的证据只是一种特定的代码异味（code smell）或一个私密/可疑的 GitHub 资料时，根本无法确凿证实。<br />从这个角度来看，举证责任被不公地推给了“指控者”，而非“被指控者”。这虽然映射了许多司法体系的做法，但拒绝一个 PR 并不等同于监禁、罚款或死刑。它只是一种温和的社交反馈，相当于对爱丁堡边缘艺术节上发演出传单的人、或是散发当地奇特宗教派系宣传单的人说一句“谢谢，不需要”。<br />这项政策大多是在 SME（主题专家）和其他相关方之间提前内定好的，之后才向公众开放进入“辩论”和修改期。在此期间，许多 LLM 热衷者开始公开畅想更为宽松的政策，以及一旦允许完全自主的智能体（agentic）模式后他们能做些什么。与此同时，几乎所有反对使用“AI”的论点都或多或少被弃之一旁或置若罔闻。自该政策合并以来，这颗棘轮便一直在不可逆地转动。<br />这一经历，就像是眼睁睁看着一把利刃生生撕裂 Bevy 项目的社会组织与纽带。<br />除了 Discord 之外，有关该新政策最公开的宣传见于《Bevy 六周年》一文。公开且如此高调地谈论此事，让我内心百感交集。但如果我还希望 Bevy 能够继续作为一个我可以去使用、去贡献的项目，我觉得自己别无选择。<br />在持续的网络挑衅（trolling）与冲突的社区价值观重压之下，社区凝聚力已然分崩离析。<br />关于“AI”的讨论一直被定性为对等的两方，理应受到同等权衡。但这与现实背景相冲突——这是一个游戏引擎，是一件创造性工具，人们（包括我自己）为了让 Rust 能为艺术家/游戏开发者提供坚实的土壤，耗费了数年光阴去学习、讨论和推广它。这种背景，与近期那些声音更大、投入却浅薄的 LLM 热衷者相比，直到对话后期才被承认。而即便得到承认，也未对“AI”政策带来任何实质性改变。<br />此前 LLM 政策所谓的“不可执行性”，在很大程度上读起来更像是一种托辞，而非合理的修订理由。如果说目前的 LLM 政策算什么的话，它充其量被视作权宜之计或容易打破的规矩，人们普遍预判接下来还会出台进一步放宽的 LLM 政策，那么为何还要信任它？当人们已经在无视其界限时，又为何要信任它？<br />此外，Bevy 原先的政策曾为那些在日常工作或人际关系中不得不面对“AI”推销者、LLM 狂热者、“AI”强制使用要求等问题的人们提供了一个避风港2。这种自上而下的文化转变所破坏的人际信任，其深度远超人们目前的预估。<br />许多人发现自己的立场被单纯视作“猎巫”和骚扰活动的前奏。人们不再相信我们的立场是出于善意，反而认为我们只会以威胁项目生存的方式进行宣泄，既不“正视现实”，也没有“真正有说服力的论据”。这种情况甚至演变成：仅仅询问某个 PR 是否为 LLM 生成的产物都会遭到抵制，尽管信息披露本就是当前政策的一部分。<br />这种情况具有双向伤害。Bevy 治理方向上的私下沟通让人们不再信任治理层。人们感到未被倾听或未受尊重。社区成员未能及时将管理审查（moderation）问题反映上来。矛盾不断积聚，大家心怀不满。人们开始在背后议论纷纷，进而引发了数波捕风捉影与普遍的不信任感。<br />一项主要靠先征询 SME 意见、随后才开放讨论，且压根不把“不改变对‘AI’政策的态度”纳入考虑范围的政策，产生这种后果完全在意料之中。<br />我坦诚地提出这一点，是因为我自己就一直活跃在这些所谓的“反 AI”3 私密渠道中。我深知许多人在私下里的感受。我还建立了一个“AI-Sober Space”（远离 AI 空间），作为 Bevy 项目及其使用者的替代开发空间。但这是一个几乎任何人都可以加入的开放空间，只要秉持善意即可。我们遵守与 Bevy 项目其余部分相同的行为准则，并额外提醒一句：不欢迎网络挑衅行为。</p>
<p>Bevy 的 Discord 设有一个“成果展示（Showcase）”分类，大家可以在那里发布自己的 Bevy 项目，包括游戏更新、crates 库、开发日志和教程。</p>
<p>#showcase 频道已经不再值得一看，如果你看重成长与学习甚于最终产物，这里甚至会让人感到沮丧。相当数量的帖子都是关于“AI”驱动的项目。一个原本供大家相互激励、共同学习的地方，现在基本沦为了大语言模型（LLM）狂热者的聚集地。</p>
<p>我们在 r/rust 和其他链接聚合论坛上也看到了类似的情况：随着低努力度帖子的数量激增，热情正在减退。你无法通过审核来消除人们对某个话题的内心感受，只能管控他们在官方频道里发布的内容。人们对分享自己的作品感到更糟糕了，因为自己的心血被夹在低努力度、与 Bevy 几乎没有深度参与的作品之间。大家也不再想看 showcase，因为那里几乎没有什么高努力度的作品或社交互动了。</p>
<p>（注：本文写于“移除表情包与闲聊”讨论开始之前。自本文撰写以来，“#memes”频道已因“过于难以管理”而被移除。）</p>
<p>在“AI”政策变更的前夕，社区 Discord 增加了一条伪非政治性的“禁止冷嘲热讽（no dunking）”规则。其明确目的就是为了减少在闲聊频道中发布的、表达人们反感 AI 的表情包数量。</p>
<p>我把这些分区静音了，我平时也不常参与，但这让我感到很不舒服。这在过去是、并且现在仍然是对 Bevy 原有社区规范的一种文化压制。这是一项单方面的政策改变，旨在让环境对“AI”使用者“少一些敌意”。</p>
<p>“AI”政策本身也附带了它自己的“不要对‘AI’恶语相向”规则。在《无可展示》（Nothing to Showcase）中，社区曾试图自我纠正这一问题，方法之一就是在 showcase 频道中给 LLM 项目添加“🤖”表情反应。而这一行为如今已被管理手段制止。在 Bevy 的 Discord 中，已经不再有任何温和的集体手段去劝阻 LLM 使用者发布低努力度的作品了。</p>
<p>这一点至关重要，因为我们经常需要向公众销售我们的游戏。</p>
<p>Bevy 从 Rust 社区“我们重视高质量工作”的普遍态度中继承了大量的社会声誉。这是人们几乎默认尊重 Rust 以及用它编写的项目背后的文化基石——大家理所当然地认为有人在倾注心血。而我们正处于这一声誉下滑的时期，并非因为“永恒九月（Eternal September）”，而是因为 LLM 狂热者用他们的提示词“盯上”了 Rust，导致两者的关联度越来越高。</p>
<p>在软件领域，我们正在形成一种奇怪的立场：我们的工作就像 LLM 的输出一样毫无价值。并不是说 LLM 的输出和人一样有价值，不，而是说我们变得和它一样没有价值。这有时会被表述为“它们和你一样出色！”，这与其说是别的，不如说是对被谈论的程序员的一种蔑视。</p>
<p>在人们如何从文化层面上评价 LLM 输出这一点上，软件成了一个异类。游戏引擎与软件之外的人群有着千丝万缕的联系。</p>
<p>没有人会特意从在线市场上购买“AI 资产”。没有人会向“AI 艺术家”约稿或寻求合作。关注“AI 艺术”账号的人……绝大多数都是“AI”吹捧者，或者部分被这番光景吸引的人。Steam 上的“AI”作品会立刻遭到抵制，而且随着时间的推移，这种抵制正愈演愈烈。</p>
<p>游戏开发者将“AI”视作负债，玩家则将“AI”产出视作换皮圈钱的虚幻产品（asset-flip vapourware）。当人们听说“AI”是项目的一部分时，许多人就会对该项目失去信任。即便“仅仅”是代码，情况也是如此。这被视为放弃责任，放弃倾注心血。</p>
<p>无论模型有多大“改进”，人们总是能敏锐地察觉到视频、文字、图像中“AI”的痕迹。这是出于从现实世界中过滤信息的必要。“AI 产出”是噪声而非信号，为了通过互联网这种中介层建立人与人之间的连接，你必须能够快速过滤掉噪声。</p>
<p>我们看到的采用 LLM 的主要论点是“它能用”。这是存疑的，不过如果你认为毋庸置疑，可以直接跳到后文；确认偏误会让它看起来比实际情况有用得多。我既不天真，也不是原教旨主义者，我亲手接触过这些机器，深知它们的能力。我也同样未被其折服。我认识一些被迫使用这些机器的人，他们同样未被折服。</p>
<p>这些模型固有的随机性使得所谓的“幻觉”成为了一个棘手的难题。但狂热的信徒们却自以为无需为此担忧，坚信人们会去检查其产出——哪怕人们几乎没有情感动力去仔细且全面地理解“AI”输出，而且也未必有足够的时间。</p>
<p>这种“它能用”的定调本身就存在问题，因为它把一个复杂的系统（游戏引擎的开发、使用与维护）视同仅仅由概念输入单元和代码输出单元构成。这种说辞很容易被兜售，因为它契合了我们看待代码的方式。这也是组织以及身处其中的人们在压榨性压力下随着时间推移往往会产生的一种思维定式。它只是一种抽象。</p>
<p>这种定调所忽视的，是它对参与项目的人所造成的影响。拥抱这些 LLM 的人被鼓励将不使用的人视为盲目的卢德分子或讨厌的原教旨清教徒。而那些不使用这些机器的人（或是被迫使用但内心并不情愿的人——这类群体在“AI 用户”中占了相当大的比例）则感到受挫、失去动力且自身价值被贬低。一种个人毫无价值的感觉油然而生，并且由于生产公式中社交属性的部分被刻意忽视，这种负面感受反而在不断加剧。</p>
<p>“AI”吹捧者与不想使用 LLM 的人之间的动态关系并非处于对等地位。在一个希望保持“AI 节制/脱离 AI（AI Sober）”的空间里大肆吹捧“AI”，具有破坏性和对抗性；明知故犯更是挑衅或彻头彻尾的恶意网络寻衅（trolling）。如今已经发展并传播了许多策略，其中许多都是围绕着贬低和打击被挑衅者的士气展开的。这就像诱导戒断中的人复吸，或诱导抑郁症患者自杀一样。引发心理失调就是其不可告人的目的。</p>
<p>“纳粹酒吧问题（The Nazi Bar problem）”的症结在于，人们会对这种类比产生防备心理。一个人可能会采取并拥护某些立场，或者表现出某些行为，这些立场或行为会出于恐惧、沮丧或蔑视，将人们从你身边或你管理的社交空间中赶走。“纳粹酒吧问题”阐明了这一点，它并不是将该问题下分析的所有立场都等同于新纳粹立场。</p>
<p>“纳粹酒吧问题”描述了当对安全感、协作或社区氛围具有腐蚀性的人试图在某个空间扎根时会发生什么：</p>
<p>再次重申，这不仅仅关乎纳粹，尽管在过去12年的政治语境中，谈论他们确实非常相关。在这一特定领域，必读的参考资料是吉尔·杜兰（Gil Durán）近期的深度报道《极客帝国》（The Nerd Reich）8，或者《TESCREAL捆绑包》（Gebru &amp; Torres, 2024），不过这属于题外话了。<br />关键在于，刻薄尖酸、反社会的行为会导致原本在社区中备受重视的人选择离开。当这些人离开后，导致他们离开的人所表现出的行为便成了社区的新常态。这与普通的社区人员流失和正常的冲突有着本质区别。<br />“纳粹酒吧问题”其实也有一个解决方案。一个非常容易解释的方案：<br />这需要保持警惕，并愿意去质疑和对抗刻薄恶劣的行为，无论“纳粹”对该空间或酒吧管理者的职业生涯发出何种暴力威胁。（3/分歧）永远是一个选项。即使它无法立即撤销（4）和（5）带来的后果。即使这让人感到不适。<br />当面对这种框架时，网络喷子可能会辩称，那些被他们挑衅的人才是社区中真正刻薄恶劣的成员，并指出人们在受到蓄意挑衅时的种种反应。版主的主要职责之一，就是在社区中有足够的存在感，以便能够分辨这些细微差别。这就是典型的 DARVO（否认、攻击、倒打一耙）策略。我们可以将其设想为如下情况：<br />我提起这点，并非特意为了在本文中去辩驳各方立场之间的模棱两可。我已经超出了自己承诺坚守的讨论范围。我提及这一点，是为了描述 Bevy 社区在过去约4个月里所发生的剧烈变化：我亲眼目睹了曾是社区重要成员的人因遭受刻薄攻击而被排挤出局。我还看到，那些把他们排挤出去的人在得偿所愿后便表现得彬彬有礼，而他们先前的恶劣行径则被彻底无视。<br />不，这是一种极其可疑的定性方式。史上规模最大的组织性与资金支持正在被全力投入到“AI”的推广之中。“AI 用户”中也包括那些宁可不去碰这套东西，但迫于工作要求、否则面临“被解雇”下场的人。抵制所面临的是结构性压力，而非使用本身，且使用并不意味着赞同。<br />这种试图将那些正利用一场涉及国际数万亿美元支出的文化与经济力量的人描绘成某种弱势群体的做法，是一种刻意的概念重构，人们根本不必买账，也不应允许其登堂入室。“AI”鼓吹者的立场是明码标价购买来的，并依靠有史以来最为庞大垄断的巨头企业与专业人脉网络强行塞进每一个空间。反抗它，才真正意味着要甘冒风险挺身而出。<br />我并不认为使用这些机器的人就是被玷污、不纯洁，或者注定要承受千年的折磨与痛苦。他们是一种人机共生的格式塔复合体，有些人是心甘情愿的，有些人则是无可奈何的。<br />这些机器在设计之初就确立了一个面向用户的核心目标9：用户留存。它不需要提供真正的价值，只需要给人一种“如果不把注意力留在这台机器上、不去体会它带来的感觉，自己就是个傻子”的心理暗示。这包括编造关于此类机器的效率以及对人们工作流程产生何种影响的话术叙事。<br />这一用户体验（UX）目标利用了使用它们的人群，这种利用并非将其视作一种物质瘾好，而是作为一种机构与主体之间的支配关系。这种关系存在于赌场与赌徒之间，存在于本地毒品供应链与成瘾者之间，也可以在一段不幸的婚姻中见到。这种关系制造了一种难以脱身、却极其容易为自己为何必须留下寻找借口的境地。<br />如果说能从这篇文章中获得一条核心收获的话，那就是：“卷入 AI”与“使用 AI”并非命中注定。你是可以戒除这些东西的。有时你可以靠自己做到，有时需要依靠身边的人，有时你可能永远无法完全掌控它。有时，这些东西在你的生活中所占的空间并不会构成问题。但无论如何，出口永远都在，即便设计者将这个空间构造得让你难以企及。<br />这是一篇高度聚焦于“AI 政策”余波的文章。以下列出的一份清单，若要详细展开，恐怕还需要我额外花上一周甚至十几周的时间：<br />其实归根结底就是这样，这是一份问题清单以及切实可行的解</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-10 18:38 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.fallible.net/it-breaks-a-village/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-into-a-care-home-podcast-fbdbe8a37e5f4b1f" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="311" data-content-paragraphs="3" data-published-at="2026-09-10T02:00:12.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 10:00</span>
</div>

### [搬进养老院的年轻健康荷兰人——播客](https://www.theguardian.com/news/audio/2026/sep/10/the-young-and-healthy-dutchman-who-moved-into-a-care-home-podcast)
<div class="original-title-sub"><span class="orig-tag">原文</span> The young and healthy Dutchman who moved into a care home - podcast</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/aed1958a63e697346db476733de90437e1698599/763_0_2699_2160/master/2699.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=619f688505cb18689ef8a8c6e346add8" alt="搬进养老院的年轻健康荷兰人——播客" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>护士特恩·托贝斯（Teun Toebes）与电影制作人乔纳森·德容（Jonathan de Jong）主张采用一种彻底创新的方式来对待失智症患者并赋予他们自由，并在两人的影片及著作《永远是人》（Human Forever）中展现了这一理念。</p>
<p>特恩·托贝斯第一次走进养老院时年仅17岁，还是一名实习护士。他回忆道，当时自己走进的是“封闭病房”，那里的住户被锁在里面。他认为，这极为生动地说明了在应对失智症方面“我们已经完全迷失了方向”。</p>
<p>此后，特恩与电影制作人乔纳森·德容推出了一部名为《永远是人》的纪录片，记录了他自那以后的照护历程：多年来寄宿在荷兰各地的养老机构，随后又走出国门，在世界各地寻找失智症照护的最佳范例。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-10 10:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/news/audio/2026/sep/10/the-young-and-healthy-dutchman-who-moved-into-a-care-home-podcast" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ts-are-not-firmware-bugs-6e88a4820394727c" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1831" data-content-paragraphs="10" data-published-at="2026-09-10T00:48:47.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 08:48</span>
</div>

### [SystemIO 冲突并非固件缺陷](https://codon.org.uk/~mjg59/blog/p/systemio-conflicts-are-not-firmware-bugs/)
<div class="original-title-sub"><span class="orig-tag">原文</span> SystemIO conflicts are not firmware bugs</div>

<div class="article-body" data-article-body="true"><p>我当时正在研究一件完全不相干的事，却偶然翻到了一些搜索结果，这让我意识到：很多人仍然认为像“ACPI Warning: SystemIO range 0x0000000000001828-0x000000000000182F conflicts with OpRegion 0x0000000000001800-0x000000000000187F”这样的报错信息代表着固件存在缺陷（bug）。这通常是不对的。我们需要稍微深入探讨一下什么是 ACPI 才能把原因解释清楚。</p>
<p>高级配置与电源接口（ACPI）1规范定义了大量内容，但此处引起我们关注的是它所实现的硬件抽象。虽然 PC 名义上是一个规范明确的平台，但一旦超出某种复杂程度，在硬件层面其实就不是那么一回事了。例如，当你将系统挂起时，你希望硬件按正确的顺序断电，而获知这一顺序则需要你了解特定主板设计的细节。嵌入式领域的处理方式是将这些知识以某种形式直接固化到操作系统中，这也就是设备树（Devicetree）的由来。ACPI 则采取了另一种方式——与其将该信息作为必须由操作系统驱动程序读取的数据来提供，不如将其以代码的形式分发。</p>
<p>每个方法都会获取一把锁（最多等待 0xffff 毫秒，超时未获取则报错退出），然后执行访问。这样一来就不会出现竞态条件了。呼，谢天谢地！</p>
<p>现在假设有人为这款硬件编写了一个 Linux 驱动程序。它在对 ACPI 一无所知的情况下直接访问硬件。有什么能阻止该驱动程序与 ACPI 的某个访问方法发生竞态吗？完全没有。哦不！又来了！顺便说一句，这并非假设——这里有一个相对温和的例子，但在过去，我们确实遇到过温度监控芯片同时被固件和 Linux 访问的情况，结果导致你本以为自己在读取温度，实际上读取的却是一个状态标志，进而得出一个高得离谱的温度并引发立即关机以保护散热。</p>
<p>在这种情况下，内核通过打印类似“ACPI Warning: SystemIO range 0x0000000000000400-0x000000000000401 conflicts with OpRegion 0x0000000000000400-0x0000000000000401 (OPR1)”的消息，将你从这种（可能损坏硬件的）后果中拯救出来。该信息告知你内核已检测到一个驱动程序正尝试分配 IO 端口 0x400-0x401，但已经有一个名为 OPR1 的 ACPI 操作区域（OpRegion）声明占用了相同的地址。内核无法预知固件可能会在该区域执行何种类型的访问，因此认为这可能存在危险，并阻止驱动程序加载。</p>
<p>不过，天无绝人之路！内核还会打印一些有用的建议：“ACPI: If an ACPI driver is available for this device, you should use it instead of the native driver.”（ACPI：如果该设备存在可用的 ACPI 驱动程序，应优先使用它而非原生驱动程序）。而且 ACPI 表中通常实际上会包含类似下面这样的定义：</p>
<p>它定义了一个 ACPI 设备及相关方法。其中 _HID 字段定义了设备类型，可以编写一个 Linux 驱动程序，使其在检测到类型为 VEND0001 的设备时自动加载。然后，该驱动程序即可调用与该设备关联的 ACPI 方法，以符合固件预期的方式来访问资源。</p>
<p>（有兴趣编写这样的驱动程序吗？我曾在 2009 年写过一篇指南）</p>
<p>固件在这里完全没有做错任何事2，但尝试加载原生驱动程序就会报错，而互联网上的人会告诉你 PC 固件开发者极其无能3，并且你应该传递一个内核参数来覆盖这种行为，还声称这样做从未给他们带来任何危害。这大概率也不会对你造成什么损害，但也有可能会，并且你可能永远都不会明白为什么你的系统偶尔会卡死甚至起火。</p>
<p>1 ACPI 规范原本发布在 acpi.info，但遗憾的是，在 UEFI 接管该规范的管理维护之后，该站点似乎就已经失效了 ↩︎<br />2 你可能会辩称，固件在运行时根本不应该做任何事情，因为那不是固件的职责。我确实理解这种观点，如果你愿意的话，当然可以使用 acpi=off 启动，这样运行时就不会执行任何 ACPI 代码。祝你好运，到时候告诉我体验如何。 ↩︎<br />3 我在此不对该说法发表意见，只是想说明这并不能成为支撑该断言的证据 ↩︎</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-10 08:48 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://codon.org.uk/~mjg59/blog/p/systemio-conflicts-are-not-firmware-bugs/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ll-request-by-booting-it-3dfc9249bbef2148" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1349" data-content-paragraphs="18" data-published-at="2026-09-10T00:32:35.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-10 08:32</span>
</div>

### [通过直接启动运行来审查 Pull Request](https://fzakaria.com/2026/09/09/review-a-pull-request-by-booting-it)
<div class="original-title-sub"><span class="orig-tag">原文</span> Review a pull request by booting it</div>

<div class="article-body" data-article-body="true"><p>2026-09-09 · 阅读时间 4 分钟</p>
<p>简而言之（tl;dr）：trynix-preview 是一个 GitHub Action，它会在 pull request 上评论一个链接，让你能够使用 https://trynix.dev 在浏览器中直接启动该 PR 的构建版本。无需服务器，纯浏览器运行。</p>
<p>在我之前的 trynix 文章末尾，我列出了一系列我认为既然能在浏览器中启动任意 /nix/store 路径后可以实现的想法。其中最显而易见的一个，就是让审查者在浏览器中直接启动 pull request 的构建产物，以进行测试、验证和反馈。</p>
<p>现在这已经成为了现实。🤯</p>
<p>千言万语不如一个演示：这是针对我的 sqlelf 项目的一个来自 fork 仓库的 pull request（PR#31），以及我们的 Action 在上面留下的评论：</p>
<p>点击该链接，一个 Linux 机器就会在你的浏览器标签页中启动，并且该 PR 的 sqlelf 已经配置在 PATH 路径中。</p>
<p>你无需克隆任何代码，也无需构建任何东西。没有服务器，没有 SSH，没有 VPN，没有 Docker，没有虚拟机，也没有云端支持。只需要一个浏览器和一个链接。😈</p>
<p>就像任何 GitHub Action 一样，只需在你的工作流中添加几行配置即可。</p>
<p>需要注意的是，你必须已经构建并缓存了该路径，这样 Action 才能链接到它。该 Action 本身并不构建或缓存任何内容。</p>
<p>该 Action 既不发布也不构建任何东西。原先负责填充缓存的机制继续照常工作，该 Action 的全部职责仅仅是通过 nix eval 提供 store 路径，并将缓存的 URL 和公钥传递给浏览器。</p>
<p>你可以查看我的 trynix.yaml 工作流以获取完整示例。你必须在 actions/checkout 步骤中设置 allow-unsafe-pr-checkout: true，因为该工作流运行在 fork 仓库的 pull request 上，而这具有安全层面的影响。22我建议为 pull request 构建使用专用的隔离私有缓存，这样 fork 就无法向你的主缓存推送内容。</p>
<p>如果你不喜欢这种方式，还有另一个版本：维护者在 pull request 上输入 /trynix 即可触发该工作流。</p>
<p>无论哪种情况，工作流都在默认分支上运行，并检出 pull request 的代码，因此 fork 无法编辑构建它自身的工作流。</p>
<p>我是不是通过轻松让审查者启动 PR 就颠覆了所有的 CI 产品？</p>
<p>很遗憾，并没有。🥲</p>
<p>大型二进制文件的性能相当糟糕。即使我借助 AI 对引擎进行了许多改进，大型二进制文件仍可能需要 1 到 2 分钟才能执行。33我在网站上添加了一个基准测试页面 https://trynix.dev/bench/，其中包含了关于各种应用程序启动和运行时间的丰富数据。</p>
<p>尽管如此，这仍然是一个相当惊艳的工作流，并展现了 Nix 的强大能力。</p>
<p>也许随着我们越来越接近 AGI，我们的 AI 霸主们将能够优化该引擎，在几秒钟内执行大型二进制文件，但就目前而言，该 Action 最适合中小型二进制文件。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-10 08:32 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://fzakaria.com/2026/09/09/review-a-pull-request-by-booting-it" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::