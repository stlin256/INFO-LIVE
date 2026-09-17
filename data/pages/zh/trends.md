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
<div id="story-d-hard-coded-credentials-fb40b54821d28e66" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3012" data-content-paragraphs="29" data-published-at="2026-09-17T21:21:18.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-18 05:21</span>
</div>

### [Flock监控摄像头被曝充斥着安全漏洞与硬编码凭据](https://micahflee.com/flock-cameras-are-riddled-with-security-vulnerabilities-and-hard-coded-credentials/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Flock cameras are riddled with security vulnerabilities and hard-coded credentials</div>

<div class="article-body" data-article-body="true"><p>今天上午，DDoSecrets 发布了一份令人兴奋的新数据集：一台正在使用中的 Flock 自动车牌识别（ALPR）摄像头各分区的类文件系统镜像。404 Media 与《连线》（Wired）对此联合发布了调查报道。我下载了该数据集，现在已经完全沉迷于技术逆向之中。</p>
<p>一个名为 stegan0gram 的黑客组织收集了这些数据。“既然我们可以逆向工程它们，并找出那些监视我们的人的秘密，为什么只是一砸了之呢？”该组织的其中一名黑客在接受 404 Media 和《连线》采访时说道。“我们在现场‘解放’了这台硬件，拆除了它的武装，并着手对摄像头及配套的太阳能设备进行了逆向工程。”</p>
<p>以下是我目前发现的一些秘密。</p>
<p>Flock 摄像头运行在修改版的 Android 系统上。固件提取时，该 Flock 摄像头运行的具体构建版本来自 2025 年 6 月 5 日。</p>
<p>尽管构建版本相对较新，但这台 Flock 摄像头运行的却是 Android 8.1。该版本的 Android 于 2017 年发布，并于 2021 年正式终止了 Google 的官方支持（更多信息请参阅 Android 生命周期终止页面）。尽管 Google 持续为 Android 8.1 提供安全修复程序直至 2021 年，但其 Android 安全补丁级别却停留在 2018-06-05。这意味着该摄像头缺少过去八年来的 Android 安全更新。</p>
<p>Android 运行在 Linux 内核之上。这台 Flock 摄像头运行的是 2017 年发布的 Linux 3.18.71。3.18 系列维护到了 2019 年 5 月，以 3.18.140 终止——即便与该分支的最终版本相比，该摄像头还落后了 69 个小版本发布。这一内核已经过时了九年以上。</p>
<p>以下是该摄像头可能受到影响的几个公开已知漏洞，这些漏洞波及了该摄像头随附的组件。我手头并没有这台 Flock 摄像头去实测并验证攻击是否有效，但我确实知道的是，该 Flock 摄像头的补丁级别早于所有这些漏洞，尽管相关补丁已经发布了多年。</p>
<p>在向 404 Media 和《连线》发表的一份声明中，Flock 的一位发言人表示：</p>
<p>如果你想跟着一起操作，DDoSecrets 在此处发布了该数据集。</p>
<p>Android 版本和补丁级别记录在多处，但最容易找到的地方是系统分区。如果你下载 partitions/24_system.img（1.5 GB）并将其解包，你会找到一个名为 build.prop 的文件，其中包含以下几行：</p>
<p>Linux 版本可以在启动分区中找到。如果你下载 partitions/21_boot.img（32 MB）并解包，你会发现名为 kernel 的内核镜像文件。你可以通过以下命令找到 Linux 版本：</p>
<p>在深入探讨细节之前，我想迅速强调一件事：</p>
<p>未经允许擅自利用泄露的凭据连接到 Flock 的服务器属于违法行为。</p>
<p>该 Flock 摄像头的 Android 固件包含了 20 个独立的 Flock 应用，其中 19 个共享一个名为 com.flocksafety.android.common.lib 的库。如果你反编译该库，会在 CameraSettings 类中发现一个有趣的方法：</p>
<p>这是一个直接硬编码在应用中的 API 密钥。Flock 在 hpnotiq.flocksafety.com 运行着一个后端服务。当摄像头需要新凭据时，它会向 hpnotiq 发出一个如下所示的 API 请求：</p>
<p>请注意，这台特定 Flock 摄像头的 MAC 地址是 F4:6A:DD:57:46:FB。</p>
<p>据推测，你可以使用这个硬编码的 API 密钥，根据 MAC 地址获取任意一台 Flock 摄像头的凭据。</p>
<p>该 API 似乎返回了 Auth0 客户端 ID 和密钥。Auth0 是一家隶属于 Okta 的身份管理公司。随后摄像头将这些凭据以明文形式存储。</p>
<p>顺便提一下，这些凭据可能仍然有效并处于活动状态（坦率地说，我不确定，因为我没有尝试使用它们）：</p>
<p>该 API 密钥位于系统分区。下载 partitions/24_system.img（1.5 GB），解包后，你会在 app/ 目录下找到 19 个 Flock 应用：flock-sambuca、flock-collins、flock-phone-home 等，每个都包含一个 APK。反编译其中任何一个并在 com.flocksafety.android.common.lib 中查找 CameraSettings。由于该共享库被打包进了所有 19 个应用中，因此每个应用里都包含该密钥。</p>
<p>Auth0 客户端 ID 和密钥位于另一个分区。下载 partitions/27_persist.img（32 MB）并解包。文件位于 flock/auth0/auth0_cred。这是摄像头的 /persist 分区，它没有加密，并且被设计为在恢复出厂设置后依然保留。</p>
<p>MAC 地址以及对 hpnotiq 的 2,264 次调用来自摄像头的日志，位于 partitions/53_media.img（18 GB）中。它们存放在一个加密容器内部，尽管该容器的密钥就保存在同一分区名为 expand_1fcdafef903c40cab3aff81bec914d01.key 的文件中，真是搞笑。解密后，日志位于 media/0/media/crashpack/ 路径下，是以 gzip 压缩的 tar 包形式存在。</p>
<p>这台 Flock 摄像头的日志记录了 155 次摄像机定位 GPS 坐标，相互之间的距离都在 100 米以内，我认为对于一个固定不动的接收机而言，这属于正常的 GPS 抖动。出现频率最高的坐标是 43.10151313, -88.05270186。如果在 Google 地图上搜索该坐标，你会来到密尔沃基西北部的一个郊区。</p>
<p>我从未去过密尔沃基地区，但看起来这台 Flock 摄像头位于一个叫沃瓦托萨（Wauwatosa）的城市，在韦伯斯特公园附近的北梅费尔路（N Mayfair Rd）上。</p>
<p>使用 Google 街景，我在北梅费尔路周围“走动”寻找这台 Flock 摄像头。看起来 GPS 略有偏差，它实际上位于街道西侧，靠近公园的一个停车场。</p>
<p>找到了，序列号为 23091220026、MAC 地址为 F4:6A:DD:57:46:FB 的 Flock 摄像头！</p>
<p>谁能想到，这台成天都在监视无辜过往行车的小摄像头，有朝一日会落入来自 stegan0gram 组织的黑客手中？</p>
<p>下载 partitions/53_media.img（18 GB），解包，挂载那个（几乎形同虚设的）加密文件系统，然后查看 media/0/media/crashpack/ 下的日志。解压其中一个日志文件——任何一个都可以，无所谓。在里面，有许多文件名类似于 ciroc.2026-*.log 的日志。通过 grep 搜索 Location，你就会看到 GPS 坐标：</p>
<p>希望这篇报道能促使各地的市议会取消与 Flock 及其他 ALPR 供应商的合同，不要再以牺牲所有人的隐私为代价向警方提供更多的监控工具。</p></div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://micahflee.com/flock-cameras-are-riddled-with-security-vulnerabilities-and-hard-coded-credentials/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-6-09-17-targeted-attacks-b43ceb7ae2955b0b" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="418" data-content-paragraphs="5" data-published-at="2026-09-17T18:10:52.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-18 02:10</span>
</div>

### [请提高警惕：针对知名 Rust 开发者的定向攻击](https://blog.rust-lang.org/2026/09/17/targeted-attacks/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Be alert: targeted attacks on prominent Rustaceans</div>

<div class="article-body" data-article-body="true"><p>我们认为，目前有人正在开展一场针对 rust-lang 成员和热门 crate 的维护者的持续攻击活动，企图入侵设备和账户，以利用这些设备和账户发布恶意软件。</p>
<p>攻击者会安排一次看似积极正面的通话——可能是求职、项目洽谈或合同机会——然后利用这次通话作为手段，诱使目标在电脑上安装某些软件（例如声称缺失的音频编解码器），或执行另一条命令（例如将命令放入剪贴板）。</p>
<p>这些攻击者正在创建新的、看起来合法的公司档案，包括貌似可信的 LinkedIn 页面，以通过粗略审查。</p>
<p>近期请格外小心。对于陌生人主动发起的联系，应保持适度怀疑；同时，务必确保与新认识的人进行通话时使用你信任的平台——理想情况下，尽量由你在自己已经使用的平台上发起通话。</p>
<p>如果你对自己的账户有任何疑虑，请联系 help@crates.io（涉及 crates.io 账户的问题）和/或 security@rust-lang.org（其他问题）。我们非常乐意提供帮助。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-18 02:10 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.rust-lang.org/2026/09/17/targeted-attacks/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-2026-dont-like-llms-html-d9fbb5d07fdb6b98" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="941" data-content-paragraphs="5" data-published-at="2026-09-17T15:25:24.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-17 23:25</span>
</div>

### [我不喜欢大语言模型](https://martinfowler.com/articles/2026-dont-like-llms.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> I Don&#39;t Like LLMs</div>

<div class="article-body" data-article-body="true"><p>我对人工智能和大语言模型技术有着许多复杂的感受。我着迷于它对我们这个职业的影响，也对生产力提升的潜力感到兴奋——这意味着我们可以快速构建出各种产品。但另一方面，我又担心人工智能可能造成的破坏：智能体蜂群接管我们的虚拟和实体基础设施，设计生物武器。不过，换个角度看，大语言模型也可能设计出奇效药，想出巧妙的办法来提高我们的繁荣程度。从根本上说，我认为我们没有选择，只能登上人工智能技术这列火车。这是一段狂野的旅程，我只希望我们最终能平安度过。</p>
<p>但我进一步思考这些问题时意识到，在这一系列相互矛盾的感受中，有一种情绪占据了主导地位——它源于我与大语言模型的直接互动。我不喜欢它们。它们用一种令人刺耳的大语言模型腔调和我说话，仿佛在“恐怖谷”中模仿真正的人类交谈。它们自信地对我胡说八道——而且往往给出的答案确实有用、能帮上忙。但它们也会用同样笃定的口吻编造内容；当我指出这一点时，它们只会带着一层虚假的悔意敷衍了事。</p>
<p>但这还不足以让我觉得我们应该避开它们。正如杰西卡·克尔所说：“它们不仅有用，不使用它们还是不负责任的……它们更全面，也更快。”这种矛盾的反应也体现在民调中：人们一方面说这些模型很有用，另一方面又认为它们会对社会造成不良影响。</p>
<p>这其中很大一部分原因，可能在于大语言模型还很年轻——我们还没有训练它们长大。也许等它们成熟之后，我会喜欢上它们。（我希望我们能有机会看到那一天。）但想到培育它们的环境，我就无法受到鼓舞。我对硅谷那种“技术宅兄弟”式的程序员亚文化心存警惕，而这些大语言模型正是他们的产品，因此自然会倾向于他们的世界观。谈到人工智能智能体时，我们不应把它们拟人化，把它们当作拥有意识和自身意志的存在。它们是由企业中的人开发出来的（软件）机器。虽然智能体的行为并非由人明确编程设定，但它们是在其创造者的价值观中被培育出来的。</p>
<p>我人生中最成功的自我管理诀窍之一，就是避开那些我不喜欢或不信任的人。我拒绝与他们进行社交互动，也会刻意避免与他们共事，即使他们做的很多事情都很有益。我觉得，与令人愉快、有能力且正直的人相处，让我的生活变得好得多。因此，当我与一个不仅假装自己是人类、还冒充成我会选择避而远之的那类人类的大语言模型互动时，我会产生一种发自本能的厌恶。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-17 23:25 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://martinfowler.com/articles/2026-dont-like-llms.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-blog-http-build-url-8c1ffd1ffab62160" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1838" data-content-paragraphs="13" data-published-at="2026-09-17T13:42:17.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-17 21:42</span>
</div>

### [我在2014年临时编写的 PHP 修复程序已被安装近2000万次。今天，我将弃用它](https://jakeasmith.com/blog/http-build-url/)
<div class="original-title-sub"><span class="orig-tag">原文</span> My temporary PHP fix from 2014 has nearly 20M installs. Today I&#39;m deprecating it</div>

<div class="article-body" data-article-body="true"><p>十二年前，我为美国在线（AOL）的内容管理系统编写了174行 PHP 代码，作为临时性的权宜之计。我把它放到了 Packagist 上，以防其他人也需要同样的补丁，不知怎么回事，自那以后它已经被安装了近2000万次。今天，我宣布弃用它。</p>
<p>2014年，我们正在将 AOL 的 CMS 从 PHP 5.2 升级到5.3。升级的一部分工作是放弃 pecl_http 扩展的第1版；该扩展提供了一个名为 http_build_url() 的函数。CMS 会处理大量 URL，而我们的系统在数十处调用了这个函数。我不打算修改那些地方。这个函数看起来足够简单，似乎可以自行复现，于是我写了自己的 http_build_url()，并规定只有在真正的函数不存在时才定义它。旧代码完全不知道发生了变化。</p>
<p>那时 Composer 刚刚开始流行，这让共享代码变得很容易。我原以为它能发挥一两年的作用，直到 PHP 社区转向更好的方案。</p>
<p>然而，它并不是真正的临时方案。它已经从 Packagist 被安装了近2000万次，目前每月仍有超过40万次安装。</p>
<p>事实证明，Composer 还只是其中一部分。WordPress 的市场领先多语言插件 WPML 直接将这个兼容实现打包进了自己的代码库，而 WPML 表示它已安装在超过150万个网站上。域名库 idna-convert 也依赖于它，因此它随该库进入了法国内容管理系统 SPIP 的源代码，并最终被打包进 Debian 和 Ubuntu。把这些情况合在一起看，你很可能访问过某个仍在运行我的代码的网站。</p>
<p>我从未想过它会发展到这一步。</p>
<p>直到几个月前，我时隔多年第一次查看这个软件包时，才意识到它的传播范围有多广。我知道它有用户。到2021年时，我已经离开 PHP 一段时间了，而下载量高得令人惊讶，于是我征求新的维护者。三个人表示愿意。提出请求后不久，我们家中有一位亲人意外去世，一段时间内我们的生活因此彻底被打乱。我没有再跟进，这责任在我。等一切稳定下来，其他目标已经占据了我的注意力，而我也把这个软件包忘了好几年。</p>
<p>除了这些数字，我还看到了几个 GitHub issue，其中有一个提到：把路径拼接到一个以斜杠结尾的 URL 上时，路径中的每个字母“a”都会被删掉。看来事情并没有那么简单。在一条写着“// Workaround for trailing slashes”（// 处理结尾斜杠的变通方案）的注释下，我的代码会在路径末尾加上一个“a”，这样就始终有一个最后的片段可以截掉；然后，它通过查找并替换将这个片段删掉。当路径以斜杠结尾时，最后那个片段恰好就是“a”，于是查找并替换操作会把路径中的其他所有“a”也一并删掉。我真不敢相信这个漏洞竟然这么长时间都没有被发现。</p>
<p>于是我需要作出选择。我可以在离开 PHP 近十年后重新投入其中，可以把这个软件包交给当初表示愿意接手的人，也可以任由它继续放在那里。</p>
<p>它从一开始就被设计成临时方案，所以我决定让它退役。多年来，PHP League 的 URI 库一直是社区采用的解决方案；而现在，PHP 8.5 已经在语言本身中提供了符合标准的 URI API（感谢 jawira 指引我关注这一点）。这两者都比2014年那份174行的垫片代码更好。继续维护这个软件包只会拖延所有人都应该进行的迁移，而把它交给别人则会在此基础上增加风险。我不怀疑任何主动提出接手的人，ozh 也一直在为 YOURLS 维护一个分支。但一个安装量很大的软件包，如果换了一位下游用户都没有审核过的新维护者，正是攻击者寻找的目标。Veritasium 关于 xz Utils 后门的视频，是我看过的对这种情况如何发生的最佳讲述。</p>
<p>这个软件包仍然可以安装，但不会再获得新的修复，包括针对缺失“a”漏洞的修复。在这么长时间没有变化之后，即使是一行代码的修复，也可能给某些用户带来意料之外的后果，而届时已经没有人可以提供支持。README 中说明了如何切换。</p>
<p>我编写这段代码，是为了帮助自己和其他经历同样迁移的人减轻痛苦。感谢每一位提交拉取请求或表示愿意接手它的人，也感谢那些在我停止阅读 issue 很久之后仍不断提交问题的人。对于一个临时修复来说，这是一段不错的历程。</p>
<p>附言：我们最终从未将 AOL 的 CMS 迁出这个“临时”兼容实现。它一直运行在那里，直到整个系统平台大约在2020年前后关闭。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-17 21:42 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://jakeasmith.com/blog/http-build-url/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::