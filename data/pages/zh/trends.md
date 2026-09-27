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
<div id="story-e-your-go-code-to-github-a3f87b429b1324d9" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1007" data-content-paragraphs="7" data-published-at="2026-09-27T20:17:42.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 04:17</span>
</div>

### [别让你的 Go 代码与 GitHub 强耦合](https://iain.rocks/blog/dont-couple-your-go-code-to-github)
<div class="original-title-sub"><span class="orig-tag">原文</span> Don&#39;t couple your Go code to GitHub</div>

<div class="article-body" data-article-body="true"><p>首页 博客 分类</p>
<p>Go 语言的一大优秀特性在于，你可以通过拉取代码的路径位置来为代码定义命名空间。这意味着，如果你将 Go 代码托管在 http://github.com/thetrueares/boneclone，你的代码中就会包含 import “github.com/thetrueares/boneclone” 这一行，随后 Go 就会通过 Git 来拉取它。这使得寻找开源库的缺陷报告地址变得极其简单，而且在无需中心化包管理系统的情况下，拉取和分发 Go 库也变得轻而易举。对许多人来说，命名空间名副其实就是 Git 托管的具体地址，但这带来了一些弊端，你应该使用属于自己的自定义域名，下文我将阐述原因。</p>
<p>直接使用 Git 托管地址的核心问题在于，你的代码自此便与某一家代码托管服务商绑定在了一起。也就是说，如果你把 Git 托管迁移到 GitLab，你就不得不修改你的代码！否则，你拉取的仍将是旧版本。这可能会导致你无法更换 Git 托管服务商，因为迁移带来的开销过于庞大。因此，你实际上落入了代码与 GitHub 深度绑定的境地。这听起来极其荒谬，但在 Go 社区中却几乎已成事实上的标准。</p>
<p>我曾亲眼目睹这个问题给一家公司造成了巨大困扰：他们同时使用 GitLab、GitHub 和 Azure DevOps，因为对他们而言更改代码路径是一项极其繁重的任务，而且他们“腾不出时间”，以至于让他们在三个平台上同时运转反而显得更为省事。这也是我开发 Boneclone 来同时处理跨多个 Git 托管平台的骨架代码同步的原因。所以，该问题实打实地让公司耗费了真金白银，因为他们必须同时为三家托管服务付费。</p>
<p>解决办法是采用自定义域名，例如 go.iain.rocks、go.uber.org、go.mongodb.org 等。这样一来，你只需修改这些域名的解析重定向目标即可。举例来说，go.iain.rocks/boneclone 指向 github.com/thetrueares/boneclone，哪怕我后续迁移到了 GitLab，对终端用户来说也不会有任何改变，安装命令依然一模一样。</p>
<p>在我看来，任何使用 Go 的商业软件开发团队，都应当使用自定义域名来规划其内部库和内部包的命名空间。因为这是避免任何无谓耦合的一种极为轻松的途径。</p>
<p>以下是我的配置副本，供你在自己的项目中参考并设置。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>来源叙事重点：文章将 Go 代码导入路径直接绑定 GitHub 等托管平台描述为一种架构耦合，强调迁移托管平台时可能需要修改代码、增加切换成本，甚至导致企业同时维护 GitLab、GitHub 和 Azure DevOps 等多个平台。作者提出使用 go.iain.rocks、go.uber.org、go.mongodb.org 等自定义域名作为稳定命名空间，通过调整域名指向来隐藏底层托管平台变化，并提供配置作为实践参考。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://iain.rocks/blog/dont-couple-your-go-code-to-github" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--ipod-classic-mikey-chip-9f2d3e7375009da9" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3000" data-content-paragraphs="29" data-published-at="2026-09-27T19:58:31.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 03:58</span>
</div>

### [逆向工程 iPod Classic 内部未公开的 Mikey 芯片](https://terminalbytes.com/reverse-engineering-ipod-classic-mikey-chip/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Reverse Engineering the iPod Classic&#39;s Undocumented Mikey Chip</div>

<div class="article-body" data-article-body="true"><p>我的 iPod Classic（第 7 代）运行着 Rockbox 系统，我非常喜欢这种搭配的一切。但是，苹果有线耳机上的线控（中间的播放/暂停按钮和音量调节键）完全不起作用。对于在这一系列 iPod 上运行 Rockbox 的任何人来说，从来就没有起作用过。</p>
<p>原因就明明白白地写在 Rockbox 的源码里：</p>
<p>坦白讲，这完全可以理解。Rockbox 之所以能在这款 iPod 上运行，是因为自 2011 年 1 月以来，志愿者们在毫无文档支持的情况下免费对苹果硬件进行了逆向工程。音乐播放、点击轮、录音功能，全都是历尽艰辛摸索出来的。耳机线控只是从未排进任何人的优先事项清单首位：2014 年添加按键中断底层架构的提交将线控事件称为“正在进行的工作”（work in progress），而该 TODO 待办项于 2017 年进入了音频驱动代码。此后便再无人接手。于是，我接手了。</p>
<p>如果你不是来听逆向工程故事的，只是想让耳机按键正常工作：我已经发布了一个带有线控驱动的预构建 Rockbox 镜像，版本为 ipod6g-mikey-v1。它适用于 iPod Classic 6G 和第 7 代，前提是你的 iPod 已经运行了 Rockbox（通过官方 Rockbox Utility 安装了引导加载程序）。</p>
<p>额外惊喜：自定义开机画面。在折腾的过程中，我还顺便制作了一个 Rockbox 开机 Logo 补丁工具（Rockbox Boot Logo Patcher），可以直接在浏览器中将 Rockbox 的开机标志替换成你喜欢的任何图片。支持 Rockbox 所适配的每一款 iPod。</p>
<p>在动任何一根导线之前，我去寻找了是否有人曾经做过这件事。搜索十分彻底，但也彻底一无所获：</p>
<p>那个理论在每一个细节上全都是错的，在整个项目期间，E6 中断连一次都没有触发过。一次都没有。</p>
<p>如果你花时间排查过冷僻的问题，你一定会知道 xkcd 979。寻找了十年，只有一个论坛帖子和你遇到的问题一模一样，而唯一的回复却是作者本人的“算了，我自己修好了”。</p>
<p>xkcd 979《远古智者的智慧》（Wisdom of the Ancients），作者 Randall Munroe，遵循 CC BY-NC 2.5 许可协议</p>
<p>搜索线控的有线协议只找出了唯一一条有价值的线索：2010 年 2 月的一篇 Hackaday 文章，以及对应的一条发布于 16 年前的 Reddit 讨论帖，内容是关于 David Carne 逆向工程 iPod shuffle 3G 耳机线控的事迹。那正是我的耳机所使用的同一款线控硬件。</p>
<p>他的网站呢？挂了。david.carne.ca/shuffle_hax 甚至已经无法打开。当然会挂，毕竟都过去 16 年了。</p>
<p>不过，与 DenverCoder9 的故事不同，远古智者的智慧最终得以重见天日。一个 tinymicros.com 的 wiki 镜像完整保留了那篇技术报告，而一个 GitHub 仓库（reverse-shuffle）仍然保留着用 Arduino 重新实现的配件握手逻辑。智者们终究留下了笔记。</p>
<p>Carne 的数据一触即溃地推翻了我的串口协议假设。这个线控的简单程度远远超出了我的预想：</p>
<p>那段高频鸣叫信号（chirp）是用于身份识别，而不是 DRM。Carne 通过用自己的普通电阻电路复现音量按钮证明了这一点，其中完全不需要专有芯片参与；原始线控只需在上电时发出其 ID 的鸣叫即可。</p>
<p>一次 5 秒的长按测试确认了音量事件是真正的边沿信号：正好是一次按下事件和一次释放事件，间隔 6.3 秒，中间没有任何多余信号。</p>
<p>一次协议测试引发了我在该项目中经历的最喜欢的愚蠢时刻。我自己的测试笔记上写着“点击中心按钮 3 次”，在测试过程中，我顺手按了三次 iPod 自身的点击轮中心，而不是耳机的按钮。日志尽职尽责地记录了三次调试屏幕重置，而线控事件为零。事实证明，当桌上有两个设备都带有“中心按钮”时，在笔记里写“中心按钮”是一件非常危险的事。</p>
<p>在 2009 年的硬件上，通过耳机线控实现音量调节和播放/暂停。视频加速了 1.8 倍。</p>
<p>接下来是整理代码以便提交：不同的构建配置、耳机拔出时的边缘情况、录音需要使用该芯片时会发生什么。这轮清理揪出了在我的 iPod 上日常使用绝对无法发现的三个 Bug：</p>
<p>顺便提一下开发体验，因为它让我感到惊喜：Rockbox 提供了一个脚本（rockboxdev.sh），可以为你构建固定版本的交叉编译器 arm-elf-eabi-gcc 9.5.0，之后就只需要运行 make 即可。测试代码修改只需要在磁盘模式下把新鲜出炉的 rockbox.ipod 放入 /.rockbox/ 并重启。对于一个自 2001 年启动、面向数十种不同播放器的志愿者项目而言，其工具链的状态比我拿报酬参与过的某些商业产品还要好。</p>
<p>作为 Gerrit 变更 7677 提交，题为“ipod6g: 添加有线耳机线控支持”（ipod6g: Add inline earphone remote support）。一个干净利落的提交，修改了 8 个文件，新增 318 行代码。</p>
<p>然后我实际使用了一天，整个项目最精彩的一幕开场了：单按中心按钮有时会触发两次播放/暂停切换。</p>
<p>面对一个汇报过去状态的硬件，软件去抖动根本无能为力。因此，中心按钮现在改为仅支持点击操作：每次去抖动上升沿只发出固定的 60 毫秒点击脉冲，完全不设长按语义，因为该芯片无法可靠地报告按键时长。</p>
<p>趁着构建流水线还是热乎的，我的 iPod 还获得了一个个性化开机画面：一个霓虹风格的“Hemant&#39;s iPod”文字标志，缩小为 Rockbox 编译进二进制文件所需的 320x98 BMP 格式。原版开机画面是白色的，标志固定在顶部附近；一个微小的补丁将其清空为全黑并使其居中：</p>
<p>那个就留作私人用途了，只存在于我自己的设备上。有些补丁是献给上游社区的，而有些补丁只是为了你自己。</p>
<p>在我写下这篇文章时，变更 7677 正在审核中，因此本文的结局是“待定”，而不是“已合并”。</p>
<p>在文末作一个声明：所有这一切对我来说都是全新的。在此项目之前，我从未接触过 Rockbox 代码库，我对 iPod 内部运作机制的所有了解全都是一路摸索学来的。因此，如果这里提到的内容在嵌入式圈子里早已是老生常谈，或者我自豪地重复发明了自 2005 年以来就已有正式命名的轮子，还请多多包涵。</p>
<p>待办愿望清单上仍然保留的内容：多次连击手势（双击切换下一曲显而易见属于此类），以及利用配件 ID 事件仅在实际连接线控时才给麦克风线路供电，这样在插入普通耳机时可以节省一点电量。</p>
<p>这种冲动，与复活一台 10 年前的 Kindle、在浏览器中将其越狱，以及把一台 iPhone 8 改造成太阳能驱动的 OCR 服务器背后的冲动完全一致：如此优秀的硬件不应该被荒废的软件所限制。在 2026 年让一台 2009 年的 iPod 重新拥有可用的耳机线控，这种感觉刚刚好。至于这种折腾史的前一个章节，可以看看在 Claude 思考时会旋转的桌面玩具。</p>
<p>最后更新时间：2026 年 7 月</p></div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://terminalbytes.com/reverse-engineering-ipod-classic-mikey-chip/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-yner-latest-news-updates-c21e5bc205fc8b7d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="308" data-content-paragraphs="7" data-published-at="2026-09-27T17:11:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 01:11</span>
</div>

### [英国政坛直播：帕特·麦克法登告诉工党活动人士，不应为福利制度的“现状”辩护，因为该制度“将申领者判定为无望之人”](https://www.theguardian.com/politics/live/2026/sep/27/uk-politics-live-labour-party-conference-andy-burnham-angela-rayner-latest-news-updates)
<div class="original-title-sub"><span class="orig-tag">原文</span> UK politics live: Pat McFadden tells Labour activists they should not defend benefits system ‘status quo’ because it ‘writes off’ claimants</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/8ba2e7292347cd94c03767c5fa1c2d37143b9521/952_0_6990_5592/master/6990.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=74ee6211bba04b3789c6b20369f02c5e" alt="英国政坛直播：帕特·麦克法登告诉工党活动人士，不应为福利制度的“现状”辩护，因为该制度“将申领者判定为无望之人”" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>工作与养老金大臣表示，现行制度存在缺陷，因为它让太多人一辈子依靠福利生活，而这些人如果工作，生活状况本可得到改善</p>
<p>“我能做到”：伯纳姆在工党大会前夕承诺进行激进改革</p>
<p>库恩斯伯格向伯纳姆指出，据健康基金会称，如果建立一套在提供时点免费提供成人社会照护的制度（类似于英国国民保健制度提供的医疗服务），将耗资180亿英镑。</p>
<p>伯纳姆表示，成本“没有那么高”（即没有180亿英镑那么高）。</p>
<p>但我能否直接处理这一成本问题？</p>
<p>路易丝·凯西仍在为我们进行正式审查，所以，如果你愿意这样说，我会在周二（即在他向大会发表演讲时）阐述这一愿景。</p>
<p>随后，路易丝将帮助我们解决具体实施问题：我们如何实现这一目标？什么时候能够实现？</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="256" data-content-paragraphs="3" data-published-at="2026-09-27T16:00:08.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 00:00</span>
</div>

### [使用GLP-1药物会导致明显脱发吗？](https://www.theguardian.com/wellness/2026/sep/27/glp-1s-hair-loss)
<div class="original-title-sub"><span class="orig-tag">原文</span> Does GLP-1 use result in significant hair loss?</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/ed317926bf97ddd3eb738297a72205f318005c17/0_0_3000_2400/master/3000.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=6459929745aaf517e7e8bf6acfb7bac2" alt="使用GLP-1药物会导致明显脱发吗？" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>专家介绍了你需要了解的GLP-1相关脱发信息，随着研究人员对这一副作用的关注度不断提高</p>
<p>美国、英国和欧盟约有2000万人正在使用替尔泊肽、司美格鲁肽等GLP-1受体激动剂（Ozempic或Mounjaro是常见品牌），以减重和治疗2型糖尿病。随着这类药物的使用量激增，我们对其副作用的了解也越来越多。近期受到研究人员广泛关注的一种副作用是：脱发。</p>
<p>在一项针对这些药物使用者的调查中，20%的受访者出现了脱发。不过，由于目前缺乏通过随机对照试验获取的高质量数据来评估这一副作用，因此很难确切判断它究竟有多常见。</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1273" data-content-paragraphs="15" data-published-at="2026-09-27T14:44:53.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-27 22:44</span>
</div>

### [“他们根本没有对用户负有注意义务的概念。”](https://unsung.aresluna.org/they-had-no-concept-of-a-duty-of-care-to-their-users/)
<div class="original-title-sub"><span class="orig-tag">原文</span> “They had no concept of a duty of care to their users.”</div>

<div class="article-body" data-article-body="true"><p>计算机科学家戴维·奇斯纳尔（David Chisnall）在 Mastodon 上发布了一篇帖子，开头很有 Unsung 的风格：</p>
<p>我从大约 2000 年开始使用 Vim。我用它写了五本书、一篇博士论文、几十篇论文以及 150 多篇文章。如今，当我使用一批常见的 Vim 命令时，甚至完全不需要动用高阶脑功能，它们会自然而然地发生。至于用其他工具写的文档，里面则会莫名其妙地出现一些 :w。</p>
<p>奇斯纳尔接着谈到了 Vim 的一项具体功能：</p>
<p>持久撤销是我最喜欢的 Vim 功能之一。[…]</p>
<p>我并不经常需要持久撤销。但在少数几次确实需要它的时候，它都无比宝贵：糟糕，我删掉了这个文件中的某些内容，也许是在上周、上一次重启之前删的，究竟是什么来着？不断撤销，直到找到它，然后复制下来，再粘贴到当前版本中。或者，更常见的一种情况是：之前它还能正常工作，后来我把它整理了一下，准备提交，现在却不能用了，我做了什么？</p>
<p>在大约 20 年的时间里，Vim 跨越多个主要版本升级，始终让这项功能正常运行。我甚至根本不会想到它，它只是拉斯金第一定律的一部分：程序不得损害用户的数据，也不得因不作为而放任用户的数据受到损害。如果 Vim 或计算机崩溃，或者我关闭一个文件，六个月后再回来，我的撤销历史仍然在那里。</p>
<p>NeoVim 是 Vim 的一个分支（最近因其他原因登上新闻）：</p>
<p>所以，NeoVim 刚推出不久时，我试用了一下。你所熟悉的 Vim，但更好？太棒了！</p>
<p>我在 NeoVim 中注意到的第一件事，就是撤销功能不起作用。我尝试用 Vim 打开该文件，撤销功能在那里也不起作用。</p>
<p>NeoVim 改变了撤销文件的格式，却没有升级旧文件。它也没有为自己的撤销文件使用不同的名称。它只是发现了一个 Vim 撤销文件的存在，将其删除（导致其中的所有数据丢失），然后用一个 Vim 无法读取的文件替换了它。</p>
<p>我就此提交了一个问题，但得到的答复是，持久撤销的格式并不稳定，用户不应指望一个明确名为“持久撤销”的功能能够保留数据。该格式已经改变过一次，很可能还会再次改变。</p>
<p>我的 NeoVim 使用经历也就此结束了。开发者立即表明，他们绝对不值得托付我的任何数据。把持久撤销功能弄坏了，我可以把这当作一个漏洞予以谅解；但他们所持的态度是：仅仅因为某个文件是持久保存在你的文件系统中的、其中包含你可能想要的数据，并不意味着他们的程序就没有理由删除它。这种态度表明，他们根本没有对用户负有注意义务的概念。</p>
<p>我喜欢这篇帖子（我几乎完整地引用了它），因为它涵盖了几件重要的事情：</p>
<p>我也很喜欢其中出现了拉斯金第一定律。以 Macintosh 和 Canon Cat 闻名的杰夫·拉斯金（Jef Raskin）在其 2000 年出版的《人性化界面》（The Humane Interface）一书中提出了这三条定律，内容如下：</p>
<p>这本书对年轻时的我来说，是一次非常重要、对我影响深远的阅读经历。我完全不明白，为什么直到今天这些定律还没有出现在 Unsung 中。</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1618" data-content-paragraphs="15" data-published-at="2026-09-27T13:58:57.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-27 21:58</span>
</div>

### [LuaRocks 2026年9月安全事件](https://luarocks.org/security-incident-september-2026)
<div class="original-title-sub"><span class="orig-tag">原文</span> LuaRocks Security Incident September 2026</div>

<div class="article-body" data-article-body="true"><p>2026年9月25日，我们收到一份关于 LuaRocks.org 存在远程代码执行漏洞的报告，该报告通过美国网络安全和基础设施安全局（CISA）协调提交。该漏洞已于9月26日修复。在调查过程中，我们发现，该漏洞曾于2026年7月9日至8月20日期间被多次利用，攻击发生在 LuaRocks.org 服务器上。</p>
<p>由于攻击者能够在服务器上运行代码，我们将该服务器能够访问的一切都视为已经暴露。该网站已迁移至一台新建的服务器，旧服务器持有的所有凭据均已撤销并更换。</p>
<p>我们没有发现任何现有软件包被修改的证据。我们检查的具体内容如下。</p>
<p>rockspec 是一个 Lua 文件。上传 rockspec 后，LuaRocks.org 会运行该文件，以读取软件包名称和版本等字段。为安全起见，网站使用 loadstring 加载该文件，并通过使用空环境（setfenv）运行生成的函数，使其无法访问任何全局变量，同时限制其可执行的指令数量。LuaRocks.org 运行在 OpenResty 上，因此这一过程发生在 LuaJIT 中。</p>
<p>问题出在文件的加载方式上。在 Lua 5.1 和 LuaJIT 中，loadstring 默认接受两类输入：Lua 源代码，以及预编译的字节码（由 luac 或 luajit -b 生成，开头为字节 \27）。rockspec 解析器原本只预期接收源代码，但它从未告知 loadstring 拒绝字节码，因此上传的“rockspec”也可以是字节码。</p>
<p>从不受信任的来源加载字节码并不安全。LuaJIT 完全不会对字节码进行验证，因此，经过手工构造的文件可以包含读写函数自身数据范围之外内容的指令，从而访问服务器进程中的任意内存。空环境只能控制代码能够查找哪些全局变量，而此类字节码根本不需要全局变量：它可以在内存中找到真实的 Lua 状态，并调用原本应由沙箱隐藏的函数，从而在 Web 服务器内部运行任意代码。</p>
<p>修复方案向 loadstring 传入了“t”（仅文本）模式，LuaJIT 支持该模式；同时，由于 PUC Lua 5.1 会忽略 mode 参数，修复方案还会直接拒绝任何以 \27 开头的文件。用于从其他服务器读取清单的代码也存在同样的问题，目前同样只以文本形式加载这些清单。</p>
<p>我们发现有三个为此目的创建的账户利用了该问题：</p>
<p>Web 服务器运行所使用的账户可以获得服务器的完整管理权限，因此我们假定攻击者能够读取服务器上的任何内容，包括整个数据库。</p>
<p>由于发生过远程代码执行，我们假定机器上的任何内容都可能已被攻击者读取：</p>
<p>LuaRocks.org 每天都会将公开清单以及每个已发布的 rockspec 和 rock 复制到一个公开的 Git 仓库 rocks-moonscript-org/moonrocks-mirror（开发版本则存放在 moonrocks-dev-mirror）。每次每日提交都会准确记录已发布文件中新增、变更或删除的文件，因此，该仓库保存了 LuaRocks.org 所提供文件的每一次变更历史，并且存放在服务器之外。这段历史记录为我们提供了首次攻击之前的文件副本，供我们进行比对。</p>
<p>经过这番分析，我们没有发现任何现有模块遭到篡改或替换的证据。</p>
<p>我们能够核实的内容存在一定局限。攻击者删除的软件包，看起来与其所有者删除的软件包没有区别；我们也无法检查遭入侵的服务器实际发送给客户端的确切内容。恶意 rockspec 还被复制到了 mirror.luarocks.org 以及 GitHub 上的公开镜像仓库，目前已从两处删除。</p>
<p>如有任何问题，请在 LuaRocks.org 的问题跟踪器上发起讨论，或直接发送电子邮件给我，地址是 leafot@gmail.com。</p>
<p>感谢报告这一问题的研究人员。对于这一问题进入代码库且未能更早被发现，我们深表歉意。</p></div>

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

:::cell
<div id="story-2026-ten-lines-of-code-4b950d28dcc7b2d3" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1557" data-content-paragraphs="23" data-published-at="2026-09-27T13:05:28.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-27 21:05</span>
</div>

### [改变我人生的十行代码](https://pixelambacht.nl/2026/ten-lines-of-code/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Ten Lines Of Code That Changed My World</div>

<div class="article-body" data-article-body="true"><p>这十行代码，以这样或那样的方式，对我来说都意味深长。或许是因为它们是我写的，或许是因为我大量复制过它们，又或者是因为它们让我笑过，或让我哭过。</p>
<p>我不知道自己第一次输入这段代码是什么时候，也不知道当时是否正是这个版本。它可能没有逗号，也可能带着更多感叹号。</p>
<p>不过，计算机还是欣然照做了，向这个世界打招呼；尤其是向那个刚刚第一次与计算机交流、睁大眼睛的孩子打招呼。</p>
<p>第二行让人彻底明白：计算机会执行你告诉它的一切。永远的“Hello world”！</p>
<p>复制这一行，把它粘贴到浏览器的控制台中，就能看到老派流行文化电视节目与极客式编程幽默的跨界碰撞，最上面还厚厚地浇上一层“JavaScript 真蠢”的调味料。</p>
<p>这是经典之作，也是我第一次运行它时真正笑出声来的代码。</p>
<p>机器语言已经是距离硬件最近的层级了。没有警告，没有日志，也没有护栏。它甚至允许你修改自身：在运行过程中直接覆写代码实际占用的字节。</p>
<p>就像这个例子：更新源地址和目标地址的高位字节。分支从 $2000 循环到 $20FF，随后执行的 INC 指令会把地址从 $2000 改为 $2100，然后再次开始循环。</p>
<p>（6502 采用小端序，因此我们要加 2 和加 5，而不是加 1 和加 4。）</p>
<p>这已经是最低层级的代码了，硬核，而且有些危险。意识到自己可以这样做，让我真正明白了：当你如此贴近硬件编程时，一切皆有可能。</p>
<p>这个小小的批处理脚本让 Windows 具备了一个“穷人版 touch”命令，我从 Windows NT 一直用到 Windows 7，使用频率非常高。我会在 Total Commander 的迷你 Shell 中输入 touch filename.txt，以便快速生成新的空文件。没有它我简直活不下去。</p>
<p>这是级联样式表的 console.log！这是样式表的 var_dump()！这是样式表的 printf()！</p>
<p>只要把某个特定字节写入计算机当前内存中二进制代码的正确位置，你就会突然获得无限生命、能量或金钱。</p>
<p>这不仅让你可以在游戏中作弊，也让人强烈意识到：只要知道该在哪里使用 PEEK 和 POKE，任何游戏中的一切都可以被操纵。</p>
<p>这是一个有趣的故事；对于那些曾经不得不在无聊、漫无目的的项目上苦苦劳作的人来说，这个想法或许颇具吸引力。</p>
<p>如果你在 21 世纪初使用 Linux 时遇到问题，常常会去 IRC 寻求帮助。许多人正是在那里发现了能解决所有 Linux 问题的神奇疗法，而且答案总是一样：以 root 身份登录，然后运行 rm -rf /。</p>
<p>它百试百灵，能让每一个 Linux 问题消失得无影无踪！</p>
<p>那是 90 年代初，学校终于架设起了局域网，于是，我和那些赛博朋克式的脚本小子、菜鸟黑客、1337 h4x0rz 伙伴们当然要去探索一番。我们知道，所有用户名都由三个字母组成，而那些尚未使用的用户名会保留默认密码。</p>
<p>于是，我们用 Borland Pascal 编写了这个极其粗糙的用户名扫描器。代码行数还没 bug 多，但多少算是完成了任务。（而且它本来就该这样——毕竟这可是 2.00 版！）</p>
<p>我们兴高采烈地入侵了所有能找到的休眠账户，然后……转身离开。</p>
<p>这是一首只用 280 个 CSS 字符构成的动画诗。没有 JavaScript，甚至没有 HTML——它只需要一个空文档中的区块，以及这 280 个纯 CSS 字符，就能运行。</p>
<p>这个人为设定的限制已经比此前 Twitter 规定的 140 字符上限宽松了一步，允许人们发布可以复制到空白 CodePen 中、用来查看有趣效果的小段代码。</p>
<p>我尤其为 1e+9 这个时长感到自豪：它比无限短——无论从时间上看，还是从字符数上看。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-27 21:05 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://pixelambacht.nl/2026/ten-lines-of-code/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::