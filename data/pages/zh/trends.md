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
<div id="story-rcalixte-ncdu-3af14f43c577d81b" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="283" data-content-paragraphs="5" data-published-at="2026-10-04T19:30:36.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-05 03:30</span>
</div>

### [ncdu：NCurses 磁盘使用情况（一个更新版分支）](https://github.com/rcalixte/ncdu)
<div class="original-title-sub"><span class="orig-tag">原文</span> ncdu: NCurses Disk Usage (an updated fork)</div>

<div class="article-body" data-article-body="true"><p>Ncdu 是一款带有 ncurses 界面的磁盘使用情况分析器。它旨在帮助用户在没有完整图形环境的远程服务器上找出占用大量空间的文件或目录，但即使在普通桌面系统上，它也是一款实用工具。Ncdu 追求快速、简单且易于使用，并且应当能够在安装了 ncurses 的任何精简类 POSIX 环境中运行。</p>
<p>有关这一 Zig 实现（2.x）与 C 版本（1.x）之间差异的信息，请参阅 ncdu 2 发布公告。</p>
<p>如果你熟悉 Zig，可以使用 Zig 构建系统。</p>
<p>此外，还有一个支持常见目标的便捷 Makefile，例如：</p>
<p>NCurses 磁盘使用情况（一个更新版分支）</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-05 03:30 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://github.com/rcalixte/ncdu" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--blog-2026-http-over-ssh-3f60dc189f199545" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2171" data-content-paragraphs="25" data-published-at="2026-10-04T19:08:58.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-05 03:08</span>
</div>

### [使用 SSH 和 nginx 自托管 HTTP 隧道](https://vincent.bernat.ch/en/blog/2026-http-over-ssh)
<div class="original-title-sub"><span class="orig-tag">原文</span> Self-hosted HTTP tunnels with SSH and nginx</div>

<div class="article-body" data-article-body="true"><p>朋友想校对你正在撰写的博客文章，但文章预览只能在 localhost:8080 上运行。有几种工具可以提供帮助。有些工具作为商业服务运行，例如 ngrok 或 Cloudflare Quick Tunnels。有些工具可以自行托管，但要求使用特定客户端，例如 frp 或 localtunnel。还有些工具只需要普通的 SSH 客户端，但依赖特定的 SSH 服务器，例如 sish。让我们只使用 OpenSSH 和 nginx 来实现一个自托管解决方案！</p>
<p>首先，我们将连接从远程服务器上的某个端口转发到你的本地服务：</p>
<p>当你将远程端口指定为 0 时，服务器会分配一个空闲端口。然后，我们配置 nginx，将来自 https://p41535.ssh.luffy.cx 的请求代理到 http://127.0.0.1:41535：</p>
<p>我们还需要为 *.ssh.luffy.cx 添加 DNS 记录，并通过 Let’s Encrypt 获取通配符证书：</p>
<p>acme.luffy.cx 是托管在 Route 53 上的一个区域。我用它来进行 ACME DNS-01 验证，既用于通配符证书，也用于由多台 Web 服务器提供服务的域名。就我而言，NixOS 会自动获取证书。</p>
<p>端口是唯一用于保持内容机密的“秘密”¹。其他转发解决方案会在域名中加入随机字符串，以防止入侵者枚举可能的取值。</p>
<p>由于端口是由内核从本地端口范围中分配的，其熵很低。此外，内核在随机选择空闲端口时倾向于选择奇数端口，因此我们又损失了 1 比特的熵。</p>
<p>借助 ngx_http_secure_link_module，我们可以让这一设置更加安全一些。该模块会对一组值（包括一个秘密值）计算哈希²，并将其与请求中的哈希进行比较。哈希采用 Base64 编码，因此不能放在域名中，因为域名不区分大小写。相反，我们将它作为用户名放入 URL 中，同时放入其过期时间戳：³</p>
<p>该模块依赖 MD5。它的安全性较弱，但对于此用途已经足够。❦</p>
<p>我们需要设置过期时间，因为后续会话可能会重新使用这个端口，而我们没有办法检测这种情况。❦</p>
<p>客户端通过 HTTP 基本身份验证将用户名发送给服务器。这适用于大多数 HTTP 客户端，包括 curl。Nginx 会将用户名暴露在 $remote_user 变量中。该模块要求哈希和过期时间戳之间用逗号分隔。我们使用 map 指令从 $remote_user 中提取这两部分，并用逗号将它们连接起来。⁴ 我们还要向模块提供待哈希的字符串。它包含过期时间戳、端口和一个秘密值：</p>
<p>用户名本可以直接使用逗号，而不是使用两个连字符。但有些应用无法正确识别这样的 URL，从而使分享变得更加困难。❦</p>
<p>该模块会在 $secure_link 变量中返回检查结果：</p>
<p>如果哈希不正确或缺失，我们就返回 401 错误，并附带 WWW-Authenticate 标头以请求凭据。如果链接已过期，则返回 410 错误。转发请求之前，我们会移除 Authorization 标头，并添加几条用于代理 WebSocket 连接的指令。以下是完整配置：⁵</p>
<p>这一配置会将监听在 127.0.0.1 或 0.0.0.0 上的任意 TCP 端口暴露给任何拥有该秘密值的人，从而绕过大多数防火墙规则。你可以通过将 server_name 正则表达式限制在临时端口范围内来增强安全性。❦</p>
<p>我想你现在已经在问自己那个显而易见的问题：“我该如何生成哈希？”简单得很！</p>
<p>好吧，我猜你现在会说：“Vincent，这一点也不方便！如果你不介意，我还是继续用 ngrok 吧。”好，我明白了。我们来写一个辅助脚本。</p>
<p>最大的难点在于找出 OpenSSH 分配的临时端口，因为它不会出现在任何环境变量中。⁶ 为了解决这个问题，我们查找祖先进程中的 sshd-session 进程：⁷</p>
<p>一个 SSH 会话可以包含多个隧道，客户端可以随时添加或移除隧道。这不同于 tun 设备转发（ssh -w），后者拥有自己的 SSH_TUNNEL 环境变量。❦</p>
<p>从 OpenSSH 9.8 开始，负责处理会话的辅助进程名称是 sshd-session。在更早的版本中，则应查找 sshd。❦</p>
<p>然后，我们获取与这些 sshd-session 进程关联的监听端口：⁸</p>
<p>我们需要使用 sudo，因为 sshd-session 进程已经放弃了自身权限。内核随后会将其标记为不可转储，而它的 /proc/PID/fd 目录归 root 所有。如果无法访问该目录，ss 就无法找到哪个进程拥有某个套接字。❦</p>
<p>最后，我们显示 URL 并保持会话开启：</p>
<p>我将这个脚本作为 http-over-ssh 安装在服务器上，并将以下条目添加到我的 ~/.ssh/config 中：</p>
<p>通过这一解决方案，我只依赖 OpenSSH 和 nginx——这两款软件已经在该服务器上运行。只需一条简短命令，我就能获得一个自托管隧道和一个可供分享的 URL。想要试用的话，可以获取完整的辅助脚本，其中包含一些小的改进。如果你运行的是 NixOS——任何有品位的人都会这么做——不妨看看我的 http-over-ssh.nix。❄️</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-05 03:08 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://vincent.bernat.ch/en/blog/2026-http-over-ssh" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ying-can-go-hand-in-hand-e68612a6cbb70759" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="406" data-content-paragraphs="3" data-published-at="2026-10-04T17:06:32.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-05 01:06</span>
</div>

### [良好的姑息治疗与协助死亡可以并行不悖｜读者来信](https://www.theguardian.com/society/2026/oct/04/good-palliative-care-and-assisted-dying-can-go-hand-in-hand)
<div class="original-title-sub"><span class="orig-tag">原文</span> Good palliative care and assisted dying can go hand in hand | Letters</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/477ea97176d8641992a2ec5d7bab5c8a985f44da/375_0_3751_3001/master/3751.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=be76170231ff99cb02b2e5c436a18961" alt="良好的姑息治疗与协助死亡可以并行不悖｜读者来信" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>读者回应一篇关于迫切需要改革姑息治疗的文章</p>
<p>简·特纳说得对，临终关怀需要得到改善（议员们，你们已经清楚地告诉我们，英国的临终关怀体系已经失灵。因此，现在需要你们来修复它，9月28日），而我认为，这一问题需要同时从两个方面着手解决。我的丈夫约翰今年3月去世，享年43岁；此前，他接受了近六年的肠癌治疗。他先后进行了70多轮化疗，一心想看着我们的孩子长大。他生命的最后三个月是在一家临终关怀 hospice 中度过的，接受了当时能够提供的最佳姑息治疗。即便如此，他仍饱受折磨。</p>
<p>有些疼痛无法迅速得到控制，有些痛苦则根本无法治疗。一天晚上，他被困在浴缸里，无法动弹，在极度痛苦中尖叫了将近一个小时，直到缓解疼痛的药物终于起效。随着癌症使他的躯干逐渐肿胀，他慢慢窒息——没有任何药物能够阻止这一过程。他始终神志清醒，并反复告诉我，他已经无法继续坚持下去了。在他生命的最后几个小时里，我戴上耳塞，才能忍受他喘息的声音。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-10-05 01:06 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/2026/oct/04/good-palliative-care-and-assisted-dying-can-go-hand-in-hand" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

::::