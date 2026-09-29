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
<div id="story-2026-09-24-oneplus-root-d3ea8e481730dd8e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="4550" data-content-paragraphs="41" data-published-at="2026-09-29T17:25:55.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-30 01:25</span>
</div>

### [在不受信任的应用中获取 OnePlus 15 的 root 权限](https://blog.nns.ee/2026/09/24/oneplus-root/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Getting root on OnePlus 15 from an untrusted app</div>

<div class="article-body" data-article-body="true"><p>我从 OnePlus 3T 开始一直使用 OnePlus 手机。目前使用的是 OnePlus 15（CPH2747），运行 OxygenOS 16，已经用了几个月，总体上相当满意。</p>
<p>我想，或许可以稍微研究一下固件，看看里面有什么。具体来说，我想知道，干净安装的固件中是否存在某些机制，能让一个从 Play 商店之外安装的普通应用最终以 root 身份运行。</p>
<p>结果是：确实存在！我发现了两个可以串联利用的独立问题，能够通过一个没有任何特殊权限、只需正常安装的 APK，实现相当干净的从 untrusted_app 到 uid 0 的提权，并获得全部 Linux capabilities（能力）。</p>
<p>说明一下研究方法：我的 OP15 是日常主力机，因此在开发漏洞利用程序时，我不想提前获取 root 权限，也不想修改它的状态。碰巧我手头有一部旧的 OnePlus 12 Pro（CPH2581），此前因其他原因已经解锁并获取了 root 权限，于是我在这部手机上进行了逆向工程和漏洞利用开发。拿到可运行的 PoC 后，我把完全相同、未经修改的 APK 安装到 OP15 上，第一次尝试就成功了。因此，本文讨论的是 OP15，但大多数 Ghidra 截图和设备上的命令来自 OP12。</p>
<p>OnePlus 后来确认，这个漏洞影响多个软件版本中的许多 OnePlus 和 OPPO 设备，但截至目前尚未提供受影响设备或软件版本的完整列表。不过我可以确认，至少在 OnePlus 15 上，这些问题已在版本 16.0.10.500(EX01) 中修复。</p>
<p>2026 年 9 月 28 日更新：OnePlus 安全团队已联系我并确认，在仍处于维护期的设备中，已有 151 款设备获得补丁，另有 18 款设备的补丁尚待发布。完整更新内容见下文。</p>
<p>在 Android 上，一个正常安装的应用（无论来自 Play 商店还是通过侧载等方式安装）会运行在名为 untrusted_app 的 SELinux 域中。这个域受到相当严格的限制——它可以与少数几个系统 Binder 服务通信，可以读取自己的数据目录，如果获得授权也可以使用摄像头，除此之外能做的事情并不多。针对本地提权漏洞，通常的目标是突破 untrusted_app，进入一个拥有 uid 0（root）且 SELinux 域限制更宽松的位置。</p>
<p>Android 是一个复杂的系统，其中有大量系统 Binder 服务，而每个服务都可能成为攻击面。OxygenOS 又在 AOSP 服务之上叠加了自己的服务。我认为，相比 OxygenOS 的服务，AOSP 的服务可能已经接受了更多研究者的审视，因此我把主要精力放在了后者上。</p>
<p>AtlasService 是 OxygenOS 的一项功能，据我所知，它用于收集遥测数据和调试事件。它以 root 身份运行，并接受来自任意进程的 Binder 调用。我并不完全确定“Atlas”具体指什么；该进程本身名为 atlasservice，相关库则是 libatlasservice.so。我没能找到多少相关文档。</p>
<p>查看 BnAtlasService::onTransact 可以看到几个事务代码。其中有意思的是代码 2，也就是 setEvent(String8 name, String8 value)。它没有检查调用方的权限——任何 UID 都可以调用。</p>
<p>ctl.start=audiodumpinfo 会通知 init 启动名为 audiodumpinfo 的服务。查看 /system_ext/etc/init/audiodumpinfo.rc：</p>
<p>于是，init 会以 uid 0 身份、在 dumpstate SELinux 域中启动 /system_ext/bin/audioDumpInfo。很好。那么，audioDumpInfo 会如何处理由攻击者控制的属性呢？</p>
<p>结果发现，它会调用 GetProperty(&quot;oplus.audio.dumpinfo.type&quot;)，并将返回结果直接写入一个字符串缓冲区：</p>
<p>随后，它会一次处理一个斜杠，遍历该路径；对于每个尚不存在的路径组件，它都会创建目录，并执行 system(&quot;chmod 777 &quot; + prefix)。</p>
<p>我想你已经明白我要做什么了。我们提供的值未经转义，直接进入了传递给 system() 的 shell 命令。我们只需注入分号、某条命令以及井号，将剩余部分注释掉即可。</p>
<p>Android 属性值的上限是 92 个字节。对于一条完整命令来说，这个长度相当紧张，但对于 sh 命令来说已经足够了；sh 后面指向我们安装的 APK。事实证明，这样做并不奏效。已安装 APK 的标签是 apk_data_file，而 dumpstate 无法读取该目录。不过，应用的外部文件目录标签是 media_rw_data_file / fuse，dumpstate 可以读取。因此，我们将 classes.dex 从自己的 APK 中提取出来（实际上只需解压即可），然后把它放到那里。</p>
<p>最终，boot.sh 看起来如下：</p>
<p>app_process 是 Android 上用于启动由 JVM 托管的进程的二进制程序（zygote 也会使用它）。设置 CLASSPATH 环境变量后，我们就可以从任意 .dex 文件中运行指定的类。</p>
<p>Pwn.main 以 dumpstate 的身份运行，并调用 binder 来执行 olc2.doShell(cmd)。问题就出在这里。</p>
<p>olc2 HAL 使用 AIDL NDK C++ 绑定编写。按照官方方式，要从 Java 调用 AIDL 厂商 HAL，实际上……并没有真正可行的方法。原则上，你根本不应该从应用进程与厂商 HAL 交互。但 dumpstate 是一个系统进程，因此只要能弄清楚正确的线路格式，它就可以进行调用。</p>
<p>我原以为这会是困难的部分。厂商 Binder 服务通常对接口令牌版本有严格要求，而且 Android 中还有一条专门用于与 HIDL 厂商 HAL 通信的 android.os.IHwBinder 路径，它不同于常规的 android.os.IBinder / ServiceManager.getService 路径。由于这里使用的是 AIDL 而非 HIDL，我不确定自己究竟属于哪一边。</p>
<p>或者更准确地说，我以为自己不确定。出于直觉，我尝试调用 ServiceManager.getService(&quot;vendor.oplus.hardware.olc2.IOplusLogCore/default&quot;)，使用 Parcel.writeInterfaceToken(&quot;vendor.oplus.hardware.olc2.IOplusLogCore&quot;) 写入接口令牌，写入字符串参数，然后执行 binder.transact(6, data, reply, 0)。</p>
<p>Parcel.writeString8 与 writeString 之间还存在一个单独的问题。稳定版 AIDL 在线路上传输字符串时使用 UTF-16（String16 线路格式），Java 的 Parcel.writeString 发出的也是这种格式——因此对于 olc2 调用，writeString 可以直接正常工作。</p>
<p>另一方面，AtlasService 使用较旧的 String8 线路格式。线路上的 String8 格式为：int32 长度、UTF-8 字节、&#39;\0&#39;，然后填充至 4 字节对齐。即使解除隐藏 API 限制，Java 的 Parcel 在 API 35 上也没有直接提供这一功能，因此我最后手动模拟了它：先写入 writeInt(len)，然后创建一个使用 writeByteArray(bytes + &#39;\0&#39;) 的辅助 Parcel，接着从辅助 Parcel 自身长度前缀之后的位置开始，在主 Parcel 上调用 appendFrom。虽然有点难看，但确实可行。</p>
<p>在 OP12 上完成全部测试后，我将同一个未经修改的 APK 拿到我的 OP15（CPH2747、OxygenOS 16.0.3.503、补丁级别 2026-02-01、内核 6.12.23）上进行了尝试：</p>
<p>第一次尝试就成功了。鉴于两款不同的 OnePlus 机型、且使用不同内核分支的设备都存在这一问题，我会将其视为 OxygenOS 16 的普遍问题，而不是某一部手机的特有问题。</p>
<p>如果要修复这一问题，对于 AtlasService，我会采取以下措施之一（或者更准确地说，两者都采取）：</p>
<p>对于 olc2，修复方式可以是完全删除 doShell 方法（这东西为什么会存在？），或者至少增加 SELinux 对端过滤器，使其只能被某个非常特定的调试守护进程访问，而不是任何 uid 0 的进程都能访问。</p>
<p>在此过程中我还遇到了一些不值得写进主文、但我想记录下来的事情。</p>
<p>libatlasservice.so::OplusAtlasLogWriter::handleEvent 中有大量针对硬编码字符串的 memcmp 调用。这些字符串字面量并不是作为单个 const char* 存储的，而是编码成一对 64 位 qword 和一个作为立即数加载的 32 位 dword。Ghidra 不会将它们显示为明显的字符串比较——你看到的是 if (*(long*)v == 0x5f73616c7461 &amp;&amp; ...)，必须手动逆转字节序。</p>
<p>用于转储所有这些内容的小脚本：</p>
<p>对 handleEvent 中所有比较立即数运行该脚本后，我得到了写入器所关注的完整事件名称列表；其中，atlas_event_multimedia_audio_dumpsys 是唯一一个我能够通过 setEvent 实际触达、并且具有属性设置出口的事件。</p>
<p>AIDL 编译出的 BnAtlasService::onTransact 看起来像是一个针对事务代码的大型 switch。对于每个分支，它都会从 parcel 中读取参数，并调用相应的方法。在本例中：</p>
<p>OnePlus 已联系我，并分享了当前修复状态的更多详情。以下为其原话：</p>
<p>“我们已与负责团队确认，该漏洞已在新版本中修复。相关代码已于 7 月底合并。</p>
<p>本次审查涵盖仍在维护期内的 OPPO、realme 和 OnePlus 出口机型：已有 151 款机型完成修复，另有 18 款等待发布。</p>
<p>所有待发布机型均计划于 10 月发布更新。</p>
<p>这些现有维护分支的发布周期为两到三个月。尽管修复已于 7 月底合并，但只能在维护窗口期间通过 OTA 推送，因此更新仍处于待发布状态的时间会持续一小段时间。</p>
<p>已修复的构建版本可通过以下方式识别：</p>
<p>作者｜Rasmus Moorats</p>
<p>从事道德黑客与网络安全工作，特别关注硬件安全研究、嵌入式设备和 Linux。”</p></div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.nns.ee/2026/09/24/oneplus-root/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-review-luxembourg-horror-47162601af77db66" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="510" data-content-paragraphs="3" data-published-at="2026-09-29T10:00:48.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-29 18:00</span>
</div>

### [《Child》影评——这部曲折的器官移植寓言中充斥着突如其来的惊吓，而恐怖始终是其核心](https://www.theguardian.com/film/2026/sep/29/child-review-luxembourg-horror)
<div class="original-title-sub"><span class="orig-tag">原文</span> Child review – jump scares abound in twisty organ transplant fable that keeps horror at its heart</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/04a579e16454d9b53789f8afa2994271c1c3f572/972_0_2144_1716/master/2144.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=7278d3fad2cdd892c5a389579f7edac3" alt="《Child》影评——这部曲折的器官移植寓言中充斥着突如其来的惊吓，而恐怖始终是其核心" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>这部由卢森堡制作、讲述一对夫妇向东行进以拯救儿子的电影，展现了令人印象深刻的电影制作技艺。</p>
<p>这部卢森堡恐怖片在对收入不平等的“第一世界”愧疚感中穿插取材——即便是在同为欧盟成员国的国家之间也是如此——并在原本相当直接、虽有曲折的恐怖框架上，撒了一点自由派的童话尘埃：一个咆哮、言语含混、身体畸形的大反派，尾随那些本不该来到这片贫困地区的普通主人公。可以把它想成《大公国电锯杀人狂》，不过坦率地说，片中没有任何电锯。这里有阴郁的当地人、一座破败的农舍，里面堆满了不祥的杂物、恶意，以及可怕的肢体伤害。</p>
<p>这里的不幸访客是前伴侣格雷格（马利克·齐迪饰）和安妮（布丽吉特·乌尔豪森饰）。两人共同抚养年幼的利奥（利奥·托德斯科饰）；这个尚未进入青春期的孩子正躺在医院病床上，等待一场至关重要的器官移植。过了一会儿，我们才得知，控制欲极强的安妮把利奥的病情归咎于性格讨喜的医生格雷格，因为他只是一时没留意孩子，结果利奥就被车撞了。但格雷格正试图通过陪同前妻前往一个未指明的东欧国家来弥补过错——那里的人说保加利亚语——他们打算在黑市上弄到利奥所需的器官；一路上，他们用大笔现金和事先安排好的贿赂打点边防人员等人，以确保行程顺利。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-29 18:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/film/2026/sep/29/child-review-luxembourg-horror" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-cow-f8c7797cce52f9fe" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="330" data-content-paragraphs="8" data-published-at="2026-09-29T09:07:37.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-29 17:07</span>
</div>

### [CoW——一款适用于 Wayland 的堆叠式窗口管理器](https://cow-wm.codeberg.page/cow/)
<div class="original-title-sub"><span class="orig-tag">原文</span> CoW — a stacking window manager for Wayland</div>

<div class="article-body" data-article-body="true"><p>CoW 的最新版本为 0.3（2026 年 9 月）。</p>
<p>CoW 0.4 目前已合并了自上一版本发布以来的 22 项变更。</p>
<p>CoW 的目标是在呈现 20 世纪 90 年代 FVWM 和 MWM 的外观与使用体验的同时，也支持更加现代的风格。CoW 可以直接通过命令进行配置，同样的命令也可用于其配置文件，因此能够通过外部应用程序对 CoW 进行脚本化控制。</p>
<p>主要功能包括：</p>
<p>……以及更多功能！</p>
<p>CoW 使用 C 语言开发，托管于 Codeberg。社区规模不大，但氛围友好；你可以在 IRC（irc.libera.chat 的 #cow-wayland 频道）找到我们。</p>
<p>关于社区，有几件实用信息需要了解：</p>
<p>其他任何问题，都可以在 IRC 上提问。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-29 17:07 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://cow-wm.codeberg.page/cow/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-item-b7a6d487d9cfce8f" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="258" data-content-paragraphs="1" data-published-at="2026-09-29T09:01:47.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-29 17:01</span>
</div>

### [要闻：Motif Central 汇集了有关 Motif、Xt、Xlib 和 X11 的信息：它们如何协同工作、如何使](https://motif-central.org/)
<div class="original-title-sub"><span class="orig-tag">原文</span> MotifCentral - All Things Motif/Xt/Xlib</div>

<div class="article-body" data-article-body="true"><p>Motif Central 汇集了有关 Motif、Xt、Xlib 和 X11 的信息：它们如何协同工作、如何使用它们进行编程，以及在哪里可以找到介绍这些技术的手册、示例和历史资料。<br />从 X 编程技术栈开始，构建你的第一个 Motif 应用程序，或探索编程资源。历史页面介绍了这些库的起源，而归档指南则帮助你查阅较早的文档。<br />了解各层之间的关系，然后构建你的第一个应用程序。<br />探索这些库、它们的历史以及可运行的示例。<br />由社区维护的 Motif 软件、相关 X11 项目和保存工作。<br />查找编程参考资料、书籍和历史文档。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-29 17:01 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://motif-central.org/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::