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
<div id="story-mmi-android-883bf45fa0f50afa" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5128" data-content-paragraphs="37" data-published-at="2026-10-10T07:20:53.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 15:20</span>
</div>

### [Android系统中的一键执行MMI代码漏洞](https://karansaini.com/mmi-android/)
<div class="original-title-sub"><span class="orig-tag">原文</span> 1-click MMI execution in Android</div>

<div class="article-body" data-article-body="true"><p>本文介绍了如何利用存在漏洞的拨号器应用程序，在Android系统中实现一键（1-click）执行MMI代码。</p>
<p>一段时间以来，我一直知道拥有 CALL_PHONE 权限的Android应用不仅可以拨打普通电话号码，还可以拨打USSD和MMI代码。从我知道这一点起，我就一直想开发一种攻击方式，只需极少或完全无需用户交互，即可从某个应用程序或网页中执行MMI代码。三年前，我曾制作过一个概念验证（PoC），通过滥用 CALL_PHONE 权限在手机上静默设置呼叫转移。但这显然需要用户侧载（sideload）恶意应用程序，从而削弱了其攻击影响。上个月，我发现并报告了若干漏洞，当用户设备上安装了存在漏洞的拨号器应用时，这些漏洞可导致一键执行MMI代码。</p>
<p>MMI和USSD代码是输入到拨号器中的一串数字、星号和井号，但它们并不是电话号码——例如 *123#、*#06#、**21*#。两者均由3GPP进行规范：人机接口（Man-Machine Interface）代码定义在TS 22.030中，非结构化补充业务数据（Unstructured Supplementary Service Data）定义在TS 22.090中。在设备上，这些代码只能通过拨号器（或SIM卡应用）访问。</p>
<p>android.permission.CALL_PHONE 是一项普通的运行时权限。你的设备上可能已经有少数应用被授予了此权限（例如 WhatsApp、Signal、Truecaller）。用户在授予该权限时看到的提示文字是“拨打电话和管理通话”。</p>
<p>用户看到的 CALL_PHONE 权限弹窗。截图由 Raghav Aggarwal / ProAndroidDev 提供。</p>
<p>问题包含两个方面：</p>
<p>实现这一切的前提条件是一个拥有 CALL_PHONE 权限的应用，同时该应用还向浏览器暴露了一个可访问其拨号路径的深度链接（deeplink）。这种应用将我们的本地能力转变成了远程能力。这两种特性单独来看都很寻常，但结合在一起时，就允许了一键执行MMI代码。</p>
<p>为了了解浏览器可访问的拨号器深度链接有多普遍，我对88款通话、拨号及VoIP应用程序进行了清单文件（manifest）级别的扫描。其中，有66款声明了 CALL_PHONE 权限，有54款暴露了某种浏览器可访问的拨号接口表面。需要指出的是，其中大多数只是将提供的号码预先填入拨号盘，而不是直接拨打，这意味着就现状而言，并非所有应用都可以被利用。</p>
<p>该扫描并不等同于存在漏洞的应用程序计数。任何特定应用是否可以被以此种方式滥用，取决于该应用如何处理其深度链接。扫描得出了一个值得进一步审查的候选应用列表。</p>
<p>针对这些候选应用，我开始在模拟器（API 34，Android 14）上进行测试，因为起初我手头没有Android实体设备。在模拟器中测试的一个额外好处是，可以使用 dumpsys 捕获电话通信行为。从网页触发拨号器的深度链接第一次尝试就成功了！遗憾的是，Google要求向其报告的安全漏洞必须在不超过30天内的系统版本上进行测试。接着我尝试启动一个Android 17模拟器，但在运行可用镜像时遇到了问题，因此我暂停了一会儿，尝试找一台实体手机来进行端到端的行为验证。</p>
<p>经过一番寻找，我拿到了一台实体手机——一台运行Android 16（One UI 8.5）的三星Galaxy M16 5G，版本号为 BP4A.251205.006.M166PXXS7DZG1，安全补丁级别为2026年7月5日——这让我能够在真实的运营商网络上而非模拟网络上确认该行为。最终我也成功运行了Android 17模拟器镜像，并在上面重新执行了所有操作，完全复现了该行为。</p>
<p>ACR Phone / Cube ACR（com.nll.cb，安装量超过500万次）包含一个Intent过滤器，声明了操作 android.intent.action.CALL_BUTTON、类别 android.intent.category.BROWSABLE 以及 tel: 数据协议。它解析到的Activity将 tel: 数据传递到了自动拨号路径中，即提供的字符串会被直接拨打，而不是呈现给用户进行确认。</p>
<p>Chrome的 intent: URI 语法允许网页为其发出的Intent指定任意Action。Chrome在派发之前执行的唯一检查就是解析该Intent的过滤器声明了 BROWSABLE；它不会对Action本身进行任何过滤。因此，网页可以随意指定 CALL_BUTTON，此时ACR的自动拨号路径随即运行，所提供的字符串将在ACR自身的 CALL_PHONE 授权下执行，而不是在浏览器持有的任何授权下执行。</p>
<p>还有一个针对ACR的前提条件：除了拥有 CALL_PHONE 权限外，它还必须持有 DIALER 角色——DialerActivity.a0() 会检查默认拨号器状态，否则将重定向到其设置界面。这两个条件对于替换型拨号应用（如ACR）来说都是正常的，但都不是系统默认的。此外，这些前提条件仅适用于本次演示，而不影响底层问题本身，即对于任何 CALL_PHONE 持有者，无论其是否具备该角色，在执行MMI时都缺乏用户同意和确认。</p>
<p>我运行了两个载荷（payload）：下面的余额查询，以及下一节中的呼叫转移设置。两者均执行成功。在每种情况下，结尾的井号都进行了百分号编码，写为 %23：</p>
<p>字面意义上的 # 可以在 Intent.parseUri() 中保留下来——该函数通过 lastIndexOf(&quot;#Intent;&quot;) 而不是通过搜索URI中的第一个井号来定位fragment——但是井号随后会在拨号路径的下游丢失，字符串的剩余部分随后会作为普通电话呼叫拨打给该号码，而不是作为MMI代码处理。因此必须使用 %23。</p>
<p>点击链接不会弹出选择器（chooser）——ACR是同时拥有 BROWSABLE 和 tel: 协议的该操作的唯一处理程序——也不会有任何形式的确认。从 dumpsys activity recents 捕获的Android传递的Intent如下：</p>
<p>以及来自 dumpsys telecom 的相应电话通信记录：</p>
<p>DIALED_MMI 意味着系统框架将提供的字符串作为MMI代码处理，而不是将其作为号码拨打。从点击到通话创建所经过的时间大约为1.3秒，除了单次点击之外无需任何交互。</p>
<p>Android 17上的复现情况。在状态栏时钟旁边可以看到呼叫转移指示符。</p>
<p>MMI的执行绝不会被添加到通话列表中，因此通话记录中没有任何可供查看的内容。唯一可见的痕迹是一个在约两秒后自动消失的对话框，以及状态栏中的呼叫转移指示符，我怀疑极少有用户能识别出该指示符或对其采取行动——更不用说将其归因于他们当天早些时候点击过的链接了。怀疑有异常发生的用户没有任何记录可供确认。</p>
<p>上述所有内容都取决于所选应用程序具有一个公开的、可自动拨号的深度链接。然而，在Android 17上进行测试时，我遇到了一个相关的平台变更，该变更甚至消除了这一要求。该问题已单独报告，且仅在模拟器上得到了确认。</p>
<p>Android 17 将 Telecom 移入 com.android.telephonycore Mainline 模块，并将其用户界面拆分为一个独立的特权应用。com.android.server.telecom 现在只是一个垫片，会针对 com.google.android.telecomui 重新启动它所接收到的 ACTION_CALL intent；后者随后以自身身份调用 TelecomManager.placeCall()。最初发起呼叫的软件包不会在这一交接过程中被带过去。由于 telecomui 持有 CALL_PRIVILEGED，Telecom 评估的身份是特权拨号器的身份，因此原本会拒绝危险 MMI 字符串的检查被跳过了。</p>
<p>其结果是，在 Android 17 上，一个仅持有 CALL_PHONE、且不具备拨号器角色的应用，通过 ACTION_CALL 发送普通的 **21* #，就会被作为 MMI 代码分发；整个过程中既不需要精心构造的载荷，也不需要存在易受攻击的第三方应用。经过评估的身份变成了 com.google.android.telecomui，而不是发起呼叫的应用身份。</p>
<p>这一控制机制是在 Android 14 中加入的；在 Android 14 到 16 上，要获得相同的能力，需要使用一种能够绕过 MmiUtils 检查、同时又能在规范化过程中存活下来的载荷。Android 17 似乎堵住了这种规避方式，随后又让这种规避变得不再必要。它所采用的门控机制比 Android 14 提供的机制更弱。</p>
<p>我于 9 月 14 日单独报告了这一问题。Google 于 9 月 24 日将其以重复问题结案，理由是该问题与 Google 自家一名工程师此前报告的问题重复。我请求将我加入那份报告，但对方告知无法共享，因为那是一份包含机密系统信息的内部漏洞报告——不过，对方表示我的报告描述的是相同的根本原因，即 UserCallActivity 这个中转组件丢弃了原始调用者的身份。</p>
<p>CALL_PHONE 允许静默语音呼叫，这一点既有文档依据，也具有合理性。但这种授权是否应当扩展到 MMI 执行，则是另一个问题。</p>
<p>一种狭义的修复方式，是在电话栈执行通过 ACTION_CALL 从一个并非用户所选择的默认拨号器、且并非由直接用户输入触发的应用传入的 MMI 字符串之前，弹出确认提示并显示代码原文。更广泛的修复方式，则是完全将这一能力解耦：保留 CALL_PHONE 用于拨号，同时通过单独命名的专用权限，或通过一个明确且需要确认的 API，对 MMI 执行进行控制——就像 TelephonyManager.sendUssdRequest() 已经采用的方式一样。无论采用哪种方式，都可以消除这条可经由网络触达的路径，而不必依赖每一位开发者修复其深层链接处理逻辑。</p>
<p>我于 2026 年 9 月 12 日向 Android &amp; Google Devices VRP 报告了 CALL_PHONE/MMI 问题，并于 9 月 14 日补充进行了 Android 17 重测，确认该链路仍然有效。该报告于 9 月 17 日以“不修复（不可行）”结案。对方给出的评估是：这并不是 Android 本身的漏洞，而是 ACR 等第三方拨号器应用未安全处理深层链接所导致的后果；平台层面的加固将被视为未来的改进，而不是针对该问题的修复。</p>
<p>我不同意这一结论，理由已在上文部分中说明——权限授予并不会告知用户存在执行 MMI 的可能性；如果没有平台层面的改变，该模型的安全性就取决于每一个具备呼叫能力的应用都对其深层链接进行审查，以发现自动拨号路径，而我认为这并不可行。我在回复中再次提出了相同观点。Google 的立场没有改变。至于“已记录该问题，以便未来版本可能进行修复”这句话究竟意味着什么，对方解释道：</p>
<p>当我们说“已记录该问题，以便未来版本可能进行修复”时，我们的意思是，我们的团队正在研究未来如何改进 Android 平台，以帮助防止第三方应用犯下这类错误。然而，由于这属于整体性的平台改进，而不是针对 Android 漏洞的直接修复，因此我们这边将该报告结案。</p>
<p>关于我提出的修复措施，对方表示：</p>
<p>虽然我们同意 Android 平台可以在这一领域得到改进——例如采用你建议的解耦权限或增加用户确认提示——但这类架构变更被视为平台改进，而不是当前操作系统中的安全漏洞。由于该漏洞利用依赖于第三方应用不当暴露其拨号路径，因此仍不属于 Android &amp; Google Devices 漏洞奖励计划的范围。</p>
<p>我于 10 月 9 日向 ACR Phone 的开发者报告了深层链接问题，并建议在可从外部触达的拨号路径上拒绝 MMI 和 USSD 字符串。</p>
<p>对方的回应速度远超我的预期。开发者在 48 分钟后作出回复，称修复已提交，将包含在下一版本中，并提供了一个 beta 版本供验证。开发者表示，Play 版本的发布取决于 Google 的审核；他预计审核将在下一周周末前后完成。</p>
<p>CALL_PHONE 与 MMI 执行</p>
<p>TelecomUi 中转组件</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>具有 CALL_PHONE 权限的 Android 应用程序除拨打普通电话外，还能够拨打 USSD 和 MMI 代码。</li>
    <li>MMI 和 USSD 代码由 3GPP 规范定义，其中 MMI 代码在 TS 22.030 中规范，USSD 在 TS 22.090 中规范。</li>
    <li>来源叙事重点：揭示第三方拨号应用缺陷与Android底层权限机制结合导致的“单次点击执行MMI代码”攻击链，深入分析Android 17特权转移引发的安全回退，并批评Google将平台级权限漏洞归咎于第三方应用并予以“不予修复”的消极态度。</li>
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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3987" data-content-paragraphs="12" data-published-at="2026-10-10T05:37:18.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 13:37</span>
</div>

### [哎，看来在标准 C 中根本无法可移植地检查字符串转浮点错误](https://sebsite.pw/w/20261009-strtod.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> oh, apparently it&#39;s not possible to portably check for string-to-float conversion errors in standard c</div>

<div class="article-body" data-article-body="true"><p>这算是我上一篇文章的续篇吧，在那篇里我讨论了 math_errhandling 宏，以及 glibc 和 musl 是如何处理数学错误的（以及标准中是如何规范的）。<br />总括来说：math_errhandling 是一个宏，用以指示 math.h 函数支持哪些错误处理机制：errno（MATH_ERRNO）和/或浮点异常（MATH_ERREXCEPT）。<br />我在上一篇文章中有一点没提到：有一族函数虽然不在 math.h 中，但也受到 math_errhandling 的影响，那就是字符串转浮点数函数族 strtod、strtof、strtold、strtod32、strtod64 和 strtod128：<br />“如果正确的值发生溢出且默认舍入有效（7.12.2），则返回正或负 HUGE_VAL、HUGE_VALF 或 HUGE_VALL（取决于返回类型和值的符号）；如果整型表达式 math_errhandling &amp; MATH_ERRNO 非零，则整型表达式 errno 获取 ERANGE 的值；如果整型表达式 math_errhandling &amp; MATH_ERREXCEPT 非零，则引发‘溢出’浮点异常。”<br />“如果结果发生下溢（7.12.2），函数返回一个量级不大于该返回类型中最小的正正规数的值；如果整型表达式 math_errhandling &amp; MATH_ERRNO 非零，errno 是否获取 ERANGE 值由实现定义；如果整型表达式 math_errhandling &amp; MATH_ERREXCEPT 非零，是否引发‘下溢’浮点异常由实现定义。”<br />这些函数的 Linux man 手册上对此完全只字未提，实际上这背后是有原因的，我稍后会讲到。但标准的意思是：如果 math_errhandling 没有声明支持 errno（例如在 musl 上就是这种情况），字符串转浮点函数在出错时就不会设置 errno。此外，如果结果发生下溢，该函数甚至根本不被要求报告错误。<br />请记住，仅凭返回值本身并不足以判断是否发生了错误，因此要测试是否溢出，你必须使用这两种错误处理机制之一。<br />下面是我尝试写出的一种符合标准认可的、可移植地检查字符串转浮点函数溢出/下溢错误的方法：<br />请注意，这仍然无法保证能检测到下溢，因为报告下溢对实现来说完全是可选的。<br />你之所以从未这样做过（以及 man 手册不提及此点的原因），是因为 POSIX 对这些函数的规范有所不同：<br />“如果正确的值超出可表示值的范围，应返回 ±HUGE_VAL、±HUGE_VALF 或 ±HUGE_VALL（取决于值的符号），并将 errno 设置为 [ERANGE]。”<br />“如果正确的值会导致下溢，应返回一个量级不大于该返回类型中最小的正正规数的值，并将 errno 设置为 [ERANGE]。”<br />所以 POSIX 根本不管 math_errhandling 这一套；无论如何，只要发生溢出或下溢，它都要求实现设置 errno。虽然 POSIX 对函数的规范比标准 C 更严格并不罕见，但 man 手册（无论是 strtod(3) 还是 POSIX 规范 strtod(3p)）从未说明这是一项扩展，这一点确实让我感到非常值得注意。<br />POSIX 的这种行为是否甚至与标准 C 兼容……目前尚不明确。至少对于 math.h 函数，无论 math_errhandling 的值如何，允许设置 errno：<br />“如果发生定义域错误、极点错误或范围错误，且整型表达式 math_errhandling &amp; MATH_ERRNO 为零，则 errno 应设置为与错误对应的值，或者保持不变。”<br />但在前面规范 errno.h 时，标准是这样说的：<br />“[...] 无论是否发生错误，库函数调用都可以将 errno 的值设置为非零，前提是在本文件中该函数的描述中未记录 errno 的使用。”<br />但在这些函数的描述中已经记录了 errno，而该描述并未提及在 math_errhandling &amp; MATH_ERRNO 为零时设置 errno。因此，这表明 POSIX 的行为是不符合标准的。<br />但等等！我到目前为止所讨论的一切都仅仅针对溢出和下溢。如果字符串格式错误且无法被解析为数字，那么标准根本没有规定任何错误：<br />“函数返回转换后的值（如果有）。如果无法执行任何转换，则返回正零或无符号零。”<br />相反，你应该使用 endptr 参数，并在之后检查 endptr == nptr（即结束指针与起始指针相同，说明没有解析任何数据）：<br />“如果主体序列为空或不具有预期的形式，则不执行任何转换；如果 endptr 不是空指针，则将 nptr 的值存储在 endptr 所指向的对象中。”<br />man 手册 strtod(3) 中也有类似的说法：<br />“如果未执行任何转换，则返回零，并且（除非 endptr 为空）将 nptr 的值存储在 endptr 引用的位置。”<br />但再看看 POSIX 是怎么说的：<br />“成功完成后，这些函数应返回转换后的值。如果无法执行任何转换，应返回 0，并且 errno 可能会被设置为 [EINVAL]。”<br />“可能（may）”这个词基本上意味着这是由实现定义的。但这影响很大，因为人们通常会通过类似这样的方式来检查错误：<br />strtod(3) 建议正是这样做：<br />“由于成功和失败时都可以合法地返回 0，因此调用程序应在调用前将 errno 设置为 0，然后在调用后通过检查 errno 是否具有非零值来确定是否发生了错误。”<br />但即使对于兼容 POSIX 的 libc，这种做法也是不可移植的！如果无法执行转换，不同的合规 libc 可能会表现出不同的行为。事实上……<br />在 glibc 上，这会打印 0，因为 glibc 的 strtod 从不将 errno 设置为 EINVAL。而在 musl 上，它确实会将 errno 设置为 EINVAL，因此会打印“22”。这在 Linux man 手册中是完全没有记载的。<br />而且在我看来，按照标准，这也不符合标准 C，因为它在一个已经记录了其他错误条件的函数中将 errno 设置为非零值（就标准 C 而言，无效输入并不属于错误条件）。musl 可能会为自己辩护称：因为其 math.h 函数中没有设置 errno，所以 strtod 描述中的 errno 条件不再适用，因此这里不存在记录的 errno 用法（因为 errno 的使用取决于 math_errhandling 的值）。但这显然太牵强了。<br />无论如何，在我看来很明显的是，标准在此处需要更清晰的措辞。<br />纯粹为了好玩，我想在文末总结一份在字符串转浮点函数中检查错误的全部“正确”方法列表，以彻底阐明这一观点：</p>
<p>如果你的目标平台是 POSIX，在调用前将 errno 设为 0，调用后检查 copysign(result, 1.0) == HUGE_VAL &amp;&amp; errno == ERANGE。</p>
<p>否则，在调用前将 errno 设为 0 并调用 feclearexcept(FE_OVERFLOW)；如果 copysign(result, 1.0) == HUGE_VAL，则在调用后根据 math_errhandling 的值，检查 errno == ERANGE 或 fetestexcept(FE_OVERFLOW)。</p>
<p>如果你只针对某一种特定实现，并且事先知道它支持哪种错误报告方式，则可以跳过 math_errhandling 检查，仅支持这两种方式之一。</p>
<p>如果你使用了 feclearexcept/fetestexcept，请确保编译器知道你可能会访问浮点环境：在 gcc 上相关的编译选项是 -ftrapping-math（这是默认开启的，除非你使用了 -ffast-math）。为此标准还提供了一个指示字：#pragma STDC FENV_ACCESS ON。不过 gcc 并不支持这个 pragma。</p>
<p>如果你的目标平台是 POSIX，在调用前将 errno 设为 0，调用后检查 result == 0.0 &amp;&amp; errno == ERANGE。</p>
<p>务必明确检查 errno 是否为 ERANGE，而不仅仅是非零。否则会导致不可移植的行为。</p>
<p>否则，如果你只针对某一种实现，请查看它是否在文档中说明了 math.h 函数在下溢（underflow）时的行为。该行为属于由实现定义（implementation-defined），因此从技术规范上讲是要求对其编写文档的。但实际上，连 clang 都懒得为其由实现定义的破烂玩意儿写文档，所以别抱太大指望。</p>
<p>但如果它确实有文档记录，并且会报告下溢错误，那么根据该实现的 math_errhandling 取值，要么在调用前将 errno 设为 0 并在调用后检查 result == 0.0 &amp;&amp; errno == ERANGE，要么在调用前调用 feclearexcept(FE_UNDERFLOW) 并在调用后检查 fetestexcept(FE_UNDERFLOW)。</p>
<p>否则你就只能认倒霉了（SOL）。</p>
<p>如果你真的非常需要检查下溢，并且出于某种原因必须使用 libc 函数，这是我能想到的唯一办法：检查 result == 0.0，如果是，则自行检查输入字符串在指数部分之前是否包含任何非零数字。如果有，说明发生了下溢。不过这很难写对；请仔细阅读标准中关于 strtod 等函数的描述，并确保覆盖所有边界情况。</p>
<p>将 &amp;endptr 作为第二个参数传入函数，然后检查 endptr == nptr。errno 是靠不住的。</p></div>

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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2086" data-content-paragraphs="34" data-published-at="2026-10-10T05:34:40.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 13:34</span>
</div>

### [为 TypeScript 编译器引入 Go 语言的 defer 语句](https://healeycodes.com/adding-defer-to-the-typescript-compiler)
<div class="original-title-sub"><span class="orig-tag">原文</span> Adding Go&#39;s defer to the TypeScript Compiler</div>

<div class="article-body" data-article-body="true"><p>我想看看将 Go 语言的 defer 语句加入 TypeScript 编译器到底有多难，但当大功告成时，我却坚信这个特性或许根本不该存在。</p>
<p>在 Go 语言中，defer 语句会推迟函数的执行，直到外层包裹它的函数执行完毕为止。它最常用于将资源获取与清理代码放在一起，比如获取一个信号量：</p>
<p>TypeScript 没有完全等同于 defer 的机制。你可能会使用 try/finally，比如：</p>
<p>但这略显丑陋。</p>
<p>纯粹为了好玩，我们可以给 TypeScript 编译器魔改引入一个 defer 语句，并获得类似 Go 的语义。由于 defer 无法直接映射到现有的 JavaScript 特性，我们需要输出能够让它在运行时像在 Go 中一样工作的 JavaScript 代码。</p>
<p>因此，我们的目标是能够编写如下形式的 TypeScript 代码：</p>
<p>TypeScript 编译器（tsc）本质上主要是一个静态分析引擎。其复杂性在于要对一种从根本上动态的语言进行类型检查，并支持极致的增量编译以满足 IDE 中的低延迟预期。</p>
<p>幸运的是，为了添加我们的 defer 语句，我们并不需要过多担心类型或其他分析。tsc 本身就已经具备了“识别语法 X，并将其替换为等效语法 Y”的基础设施。</p>
<p>例如，在面向 ES5 编译时：</p>
<p>可能会变成类似这样的代码：</p>
<p>从概念上讲，添加 defer 意味着进行另一次语法树重写。tsc 已经执行了大量的 AST 到 AST 的转换（例如，可选链 ?. 会被转换为条件表达式），因此我们无需引入新的工具。</p>
<p>虽然其中有些深层次的复杂性，但在高层面上，我们将获取带有 defer 的 AST：</p>
<p>并将其转换为类似这样的形式：</p>
<p>首先，我们需要让 tsc 的解析器知晓 defer 是一条语句。在语法种类列表中，我们添加了 DeferStatement，并将其定义为接收单个表达式操作数。</p>
<p>我们需要执行一些检查，例如确保 defer 语句出现在函数体内、确保该表达式是可调用的，并确保 tsc 执行其常规的递归检查：</p>
<p>实际的转换代码非常冗长，因此与其在这里完整复现，不如让我深入探讨我所做的设计决策，并详细介绍这种转换是如何工作的。</p>
<p>为了契合 Go 的行为，被调用方、接收者和参数值都会被立即捕获：</p>
<p>我们必须应对的一种极端情况是可调用方法被重新定义，比如：</p>
<p>即便 logger.log 稍后被重新赋值，被延迟的调用仍然会调用最初的方法。这符合 Go 的语义，即当执行到 defer 语句时，函数值、接收者和参数都会被立即求值。</p>
<p>任何包含至少一个 defer 的函数都会获得一个小栈，每个被执行到的 defer 语句都会将一个闭包推入该栈。当函数退出时，该栈会以倒序（后进先出）方式被清空。</p>
<p>它会被转换为类似这样的代码：</p>
<p>我没有为 defer await 设计一套全新的语义，而是直接将其视作错误并予以拒绝。我担心用户会误以为 await 会在函数的其余部分运行之前就 resolve。此外，如果外层函数是 async 的，那么每个被延迟的调用在清理阶段都会按顺序被 await 处理。</p>
<p>清理代码也可能会失败，因此该转换遵循三条规则：</p>
<p>Go 不需要这种聚合策略，因为普通错误是值。延迟调用的返回值错误不会被处理，除非用户明确决定对其进行处理。而 JavaScript 的异常则是控制流。因此，当编译后的 defer 代码抛出错误时，它必须决定是替换原始失败、与原始失败合并，还是直接忽略转而优先保留原始失败。</p>
<p>由于 async 函数会将 throw 和被拒绝的 await 都转换为 Promise rejection，因此转换规则需要对同步抛出和异步清理拒绝一视同仁：</p>
<p>如果 asyncCleanup() 也被拒绝/抛出异常，f() 将会以一个 AggregateError 被拒绝。</p>
<p>讽刺的是，实现 defer 的过程让我坚信它不属于 TypeScript。</p>
<p>我处理的边缘情况越多，就越确信 defer 不属于 TypeScript。Go 的 defer 感觉要自然得多，因为错误是值而不是控制流。在 TypeScript 中，一旦清理过程可以抛出或拒绝，你就需要针对聚合、优先级和异步执行制定策略，而这些在 Go 中根本不存在（Go 的 panic 是通过独立的 panic 和 recover 语义处理的）。</p>
<p>但希望并未破灭。ECMAScript 显式资源管理（Explicit Resource Management）提案正从另一个方向解决相同的问题。</p>
<p>以之前的 async-sema 为例，无需使用 defer：</p>
<p>我们可以使用 Disposable：</p>
<p>我更希望不必定义一个像 _ 这样未使用的变量，但可释放资源的工作机制就是在它们超出作用域时进行清理。</p>
<p>因此，我更青睐但遗憾目前尚不支持的语法会是：</p>
<p>你可以在我的 TypeScript fork 的这个分支上找到 defer 的 MVP 实现。</p></div>

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

:::cell
<div id="story-icle-no-man-is-an-island-83299127c3afec3e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2393" data-content-paragraphs="22" data-published-at="2026-10-10T01:37:07.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 09:37</span>
</div>

### [没有人是一座孤岛](https://borretti.me/article/no-man-is-an-island)
<div class="original-title-sub"><span class="orig-tag">原文</span> No Man Is an Island</div>

<div class="article-body" data-article-body="true"><p>爱德华·霍珀（Edward Hopper），1927年，《自动餐馆》（Automat）局部。</p>
<p>在本文中，我认为个人的智力活动只有在由其他人类构成的智力共同体中才能得以维系。AI正在瓦解这些共同体，而这反过来又使得个体的智力活动变得愈发罕见。</p>
<p>几年前，当明确AI将解决软件工程问题时，我的想法是：</p>
<p>第二点并没有如期实现。实际发生了什么？首先，软件工程的行业讨论环境恶化了。正如我早先所写：</p>
<p>Claude Code发布至今刚过一年有余。在如此短暂的时间内，软件工程已被彻底重塑。从物质层面来看，它或许是积极的：生产力更高了，尽管代价是代码库变得更加混乱。但从社会层面来看，这是一场灾难。</p>
<p>围绕软件工程的讨论变得更加愚钝。就好像行业里的每个人都丧失了30点智商。人们过去谈论编译器、类型系统、逻辑。现在他们谈论“提示词”（prompts）、“治理框架”（harnesses）、“循环”（loops）。讨论变得越来越狭隘、浅薄和重复。在我彻底发疯之前，我能忍受听到“智能体测试框架”（agentic harnesses）的次数是有限的。</p>
<p>其次是人力资本积累的丧失：没有什么可学的内容了。写提示词并不是一项技能，至少相比于软件工程，它是一项浅薄得多的技能。工作在工具层面的维度确实提升了，人们在单位精力投入下可以获得更多产出，但工作中关于积累人力资本的维度却彻底崩溃了。也许这符合理性：既然计算机能替我们做，为什么还要去学编程？于是，为了成为优秀程序员所必须磨砺的严谨、系统的思维方式，全部荡然无存。机器可以替我们保持理性，而我们只需跟着感觉走。</p>
<p>第二，为软件工程的公共资源做贡献正变得越来越毫无意义。在AI出现之前，你可以发布开源代码，写博客文章分享想法或启发他人，撰写教程、论坛帖子、教材等解释性文本来指导别人。而在AI出现之后，这一切还有什么意义？</p>
<p>这不仅仅是“你在GitHub上拿不到星标，或者博客没有访问量”的问题；更确切地说，是不再有一种你能够为之做出贡献的人类共同事业感。这里只有你自己代码的私人花园，在AI的帮助下你可以将其向各个方向无限延伸，但你再也不需要离开花园，前往集市与他人交流交易。在这样的环境下，人们很难去在乎什么，也很难去有所作为。</p>
<p>但这真的重要吗？如果我们不再撰写关于晦涩JavaScript特性的博客文章，不再设计新的编程语言，这真的要紧吗？也许编写代码从来都是苦差事，现在我们可以转向更高阶的事物，比如数学——哦，等等。</p>
<p>通过观察软件工程发生的变化，以及数学领域目前正在发生的状况，我认为我们可以提炼出一些关于一般智力实践的普适见解。</p>
<p>我们往往倾向于认为智力活动是私密且孤独的：哲学家坐在扶手椅上，从头开始推演整个世界。但智力活动有两个无法孤立获取的输入要素：一个可供在其基础上继续构建的共享成果库，以及动力。除非你想把整棵科技树重新攀爬一遍，否则共享成果库必然是公共维系的。至于动力，我们可以将其拆解为两个组成部分：</p>
<p>我们倾向于认为内在动机是最纯粹的：内生的、自我生成的，不求物质或社交利益回报。但它是一种情绪，和所有情绪一样，它是转瞬即逝且短暂的。这也是合乎理性的：否则，我们所有人都会陷入终身无成效的执念之中。因此，我们需要某种东西来填补灵光一闪之间的空白。外在动机正是起到了这一作用。</p>
<p>想要维持复杂、长期且持续的个人智力活动，需要外部智力共同体提供素材与动力，就像燃料与氧化剂一样。反过来，这种个人活动又维系着共同体：通过发表论文、编写教材、发布代码等，你为共享成果库添砖加瓦，供他人在此基础上继续构建；通过引用他人的论文或向其代码仓库贡献代码，你给予了对方认可与荣誉，肯定了他们工作的价值，进而激励他们继续做出贡献。</p>
<p>失去了共同体，你得到的并不是各自忙于手头事务的孤立个体，而是化为虚无。智力活动的输入来源枯竭了：没有人再向共享成果库添加内容，也没有同行能从你自身的智力活动中获益。没有了这种外在动机，智力活动就会减少，因为再次重申，内在动机是短暂易逝的。</p>
<p>在AI之后，智力贡献变得不再必要，甚至显得多余。以软件为例：AI包揽了所有代码的编写，那么无论是编写代码还是撰写文章，其意义何在？受众群体如今已被极度压缩。人类不再编写代码，因此他们不会去阅读关于如何写代码的博客文章，不会看教程，也不会尝试新的函数库或编程语言。以数学为例：AI能够证明定理、撰写论文、解读论文、辅导学生，而在不久的将来，它们甚至可能写出比人类更优秀的整套教科书。那么，撰写论文或教科书的意义何在？它已经多余了。</p>
<p>如果智力活动变得不再必要——如果设计一门新编程语言或发表一篇论文毫无回响，或者根本没有共同体供你做贡献——那么它就不会发生。这毫无意义。</p>
<p>现在将这一逻辑推及到智力活动的每一个其他领域，你就能看清未来会是怎样。可能仍有个体在构建新的库和编程语言，但不再有共享的软件工程文化；可能仍有个别的数学学生和从业者，但不再有充满生机的数学家共同体。</p>
<p>我曾与一些人交流过，他们认为AI对精神生活会产生积极影响，其逻辑在于，目前有太多人是出于功利目的从事智力活动：为了引用量、声望等等。在这种观点看来，智力共同体的崩溃是一件好事，因为它能够将出于内在动机的“超人”与追名逐利的大众区分开来。</p>
<p>我认为这种观点契合了当代社会的偏见：我们将内在动机与外在动机分别视作高位和低位的象征。一个“心智成熟”的人理应拥有一套私密的、取之不竭的内在动机储备，并且在因果上与外部奖赏完全脱钩。</p>
<p>但这不是对人类现实的客观看法。人是社会性动物，只有在其他人类构成的社会中才能茁壮成长。我们关心为世界做出贡献，而且我们也应当关心这一点。如果技术让我们的贡献变得多余，那么我们还剩下什么？</p>
<p>感谢Luke Drago和Andy Matuschak提供的反馈与交流。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-10 09:37 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://borretti.me/article/no-man-is-an-island" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-facebook-lifeguard-893778a9bdb37671" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3171" data-content-paragraphs="33" data-published-at="2026-10-09T21:44:50.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 05:44</span>
</div>

### [Lifeguard：用于检测 Python 惰性导入兼容性的静态分析器](https://github.com/Facebook/lifeguard)
<div class="original-title-sub"><span class="orig-tag">原文</span> Lifeguard: A static analyzer for Python lazy imports compatibility</div>

<div class="article-body" data-article-body="true"><p>Lifeguard 是一款静态分析器，旨在检测惰性导入（Lazy Imports）的不兼容性，并降低在 Python 中采用惰性导入的迁移成本。</p>
<p>一款快速的静态分析工具，助力在 Python 中推广应用惰性导入。</p>
<p>在 Python 中，每个 import 语句都会在模块加载时立即执行。无论该导入是否被实际使用，都会产生这种开销。PEP 810 引入了针对 Python 的显式惰性导入（Lazy Imports），它将模块的实际加载推迟到首次访问被导入名称之时。惰性导入能够显著降低内存占用、缩短启动时间并减少导入开销，尤其是在具有深层依赖树的大型代码库中。</p>
<p>然而，某些 Python 编程模式依赖于立即执行的导入。例如：</p>
<p>改造现有的代码库以使用惰性导入可能是一项艰巨的任务，特别是在大规模场景下。Lifeguard 能够识别这些不兼容的模式，以便你可以放心地采用惰性导入。</p>
<p>Lifeguard 会并行分析给定项目的 Python 源文件。它遍历每个模块的抽象语法树（AST）以检测副作用（effects），并将与惰性导入不兼容的副作用映射为错误。该分析器采取保守的分析策略：任何无法通过程序化方式确定可安全进行惰性导入的模块，默认都会被标记为不安全。这意味着 Lifeguard 宁可将潜在兼容的模块标记为不兼容，宁愿放弃潜在的性能优化空间，也要优先保证生产环境的安全性。</p>
<p>关于分析流水线和架构的深入解析，请参见 docs/architecture.md。</p>
<p>Lifeguard 目前正处于积极开发阶段。我们的目标是在 Python 3.15 正式发布前做好面向大众广泛使用的准备。</p>
<p>Lifeguard 已发布至 PyPI，并为 Linux、macOS 和 Windows（x86-64 及 ARM64）提供了预构建的 wheel 包。它需要 Python 3.12 或更高版本，且无需 Rust 工具链：</p>
<p>python -m lifeguard_lazy_imports 等同于 lifeguard 命令。下方的 cargo run -- 示例用于从源码构建和运行该工具；如果使用已安装的软件包，只需将 cargo run -- 替换为 lifeguard。PyPI 版本是手动发布的，可能落后于主分支。运行 lifeguard --help 可查看当前安装版本所支持的功能。</p>
<p>如果你在克隆仓库时未包含 --recurse-submodules，请运行 git submodule update --init --recursive。</p>
<p>尝试 Lifeguard 最快的方法是使用 run-tree 子命令，该命令会发现指定目录下的 .py 文件并跟踪可解析的顶级导入。输入根目录下的文件和目录名称必须是 ASCII Python 标识符；其他路径将被跳过。</p>
<p>例如，使用随附的示例项目：</p>
<p>有关完整的演练操作（包括如何解读输出），请参见 GETTING_STARTED.md。</p>
<p>对于需要更多控制权的大型项目，你可以生成一个源码数据库（source DB）——这是一个向 Lifeguard 声明项目中完整 Python 文件集及其模块路径的 JSON 文件（详见“输入格式”）。请按照以下步骤操作：</p>
<p>（可选）如果你的项目依赖第三方库，可以通过在 pyproject.toml 中添加 lifeguard 配置段，将 Lifeguard 指向你的 site-packages：</p>
<p>你可以通过 python -m site 查找到 site-packages 路径。gen-source-db 和 run-tree 都会从 /pyproject.toml 读取该配置段。相对的 site_packages 路径会基于 INPUT_DIR 进行解析。你可以通过 --site-packages /path/to/site-packages 覆盖此设置。</p>
<p>注意：文件发现过程遵循顶级 import 语句，可能无法发现所有依赖项，例如函数内嵌套的导入或位于输入目录树之外的条件分支中的导入。如果 Lifeguard 报告缺少模块，你可能需要手动向生成的源码数据库中添加条目。对于显式惰性语法，请向源码发现和分析过程均传递 --python-version 3.15 参数。</p>
<p>详细输出示例：</p>
<p>在某些模式下，Lifeguard 需要一个源码数据库（source DB）——一个将 Python 模块路径映射到其磁盘位置的 JSON 文件。其格式为：</p>
<p>你可以使用 cargo run -- gen-source-db 自动生成该文件（参见“运行 Lifeguard”），或者手动创建。</p>
<p>Lifeguard 输出一个包含两个字段的 JSON 文件：</p>
<p>若使用 --verbose-output 参数，JSON 中还会包含 IMPLICIT_IMPORTS（模块到依赖项的映射）和 IMPORT_CYCLES（各个循环导入中的模块列表）。使用 --sorted-output 可确保这些字段以确定性顺序排列。</p>
<p>一个字典，将可安全进行惰性导入的模块映射到必须进行及早导入（eagerly imported）的依赖项列表中。例如：</p>
<p>重要提示：未在此字典键中出现的模块，在分析中均被视为对惰性导入“不安全”。</p>
<p>一个模块集合，其中模块内部的所有导入都必须及早加载。对于这些模块，惰性导入实际上被暂时禁用了。注意这一区别：其他模块仍然可以惰性导入属于 LOAD_IMPORTS_EAGERLY 集合中的模块，但当该模块自身加载时，其内部的 import 语句必须立即执行，而不能被推迟。</p>
<p>该集合仅用于特定的极端情况：</p>
<p>有关更多详细信息，请参见 docs/load_imports_eagerly.md。</p>
<p>Lifeguard 可以作为独立的代码检查器（linter）使用，以识别代码库中哪些特定行与惰性导入不兼容。使用 --verbose-output 运行分析器可获得人类可读的报告，按模块显示带有行号的错误信息（参见“运行 Lifeguard”）。这使你能够将 Lifeguard 像 linter 一样使用：在持续集成（CI）或本地运行它，审查被标记的代码行，并进行修复。通过这种方式，Lifeguard 可作为安全启用惰性导入的指南。</p>
<p>该 JSON 输出旨在为惰性导入加载器的过滤函数提供支持。在 Python 3.15 中，sys.set_lazy_imports_filter() 会安装一个回调函数，用于控制哪些导入被推迟、哪些导入被及早加载。Lifeguard 的输出提供了构建此过滤器所需的数据——使用 LAZY_ELIGIBLE 识别安全模块及其约束，并使用 LOAD_IMPORTS_EAGERLY 识别需要预先解析所有导入的模块。</p>
<p>我们计划在 Python 3.15 发布之前提供工具，以便轻松接入 Lifeguard 的输出。这项工作目前正在推进中。</p>
<p>Lifeguard 采用 Rust 实现。我们利用 ruff 进行 AST 遍历，并复用了来自 pyrefly 的若干 crate。我们还对 .pyi 存根文件进行了扩展，以标注第三方库中已知的副作用——例如，标记依赖项中某个特定的模块级函数调用具有可观察到的行为。这些存根文件存储在 resources/ 目录下。有关副作用注解如何与标准类型存根配合工作的详细信息，请参见 resources/stubs/stubs.md。</p>
<p>为 Lifeguard 贡献代码即表示你同意你的贡献将遵循本源码树根目录下的 LICENSE 文件进行许可。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-10 05:44 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://github.com/Facebook/lifeguard" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--into-branches-on-risc-v-d8bcf9ea385821dc" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2184" data-content-paragraphs="1" data-published-at="2026-10-09T19:31:17.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 03:31</span>
</div>

### [无分支代码中的分支指令](https://00f.net/2026/10/09/llvm-compiles-branch-free-code-into-branches-on-risc-v/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Branches in branch-free code</div>

<div class="article-body" data-article-body="true"><p>这里有一个将两个无符号 128 位整数相加的完整 C 函数：<br />现在让我们针对 32 位 RISC-V 进行编译：<br />你可以在 Compiler Explorer 上查看输出，旁边还附带了使用 GCC 以及下文将探讨的 Zicond 扩展进行编译的版本。<br />以下是相关的代码片段：<br />等等，加法里为什么会出现 beq？那是条件分支指令，对吧？<br />编译后的代码就是这样执行加法的；a0 和 b0 是我们输入的最低 32 位字；a1 和 b1 是随后的字。所有值均为无符号，low32() 仅保留最低 32 位，比较操作返回 0 或 1。<br />你能猜到为什么要检查 sum1 == b1 吗？<br />x86 和 AArch64 等 CPU 拥有执行条件移动（cmov）的指令，允许在不使用分支的情况下实现进位传递。<br />但在 RV32 上，甚至用 &lt; 比较两个 64 位整数都会产生分支。<br />我们一直在讨论大整数中的进位传递，但如果你写过常数时间（constant-time）代码，你大概在所有地方都用过类似下面这样的某种实现：<br />如果 bit 的低位为 1，mask 就全为 1，因此该表达式保留 a 并将 b 清零。否则，mask 为零，我们得到 b。<br />纯粹的按位运算，源码中没有任何分支。<br />让我们用 clang 23 为 RV32 编译这段代码：<br />啊啊啊啊啊啊啊，一条 beqz 指令，正在对我们刚刚掩码过的位进行分支跳转。精心编写的按位选择操作就这么白费了。<br />这种情况在 64 位 RISC-V 上同样会发生。<br />你可以在 Compiler Explorer 上查看编译后的代码，其中包含这两个目标架构，以及用于对比的 clang 17、GCC 和 Zicond。<br />为什么要包含 clang 17？因为该分支在版本 15 中存在，在 16 和 17 中消失，而在 18 到 23 中又卷土重来了。真有意思，不是吗？<br />因此，即使你在某个特定的编译器版本下审查了汇编代码且一切看起来都没问题，编译器版本或编译器标志的每一次变动都需要重新进行审查。<br />让我们尝试用 Zig 编写 128 位加法，以及相同的位掩码选择操作：<br />第二个字之后出现了相同的 beq，选择操作也变成了相同的 beqz（Compiler Explorer 代码）。<br />更换源码语言并不能帮我们摆脱这个问题。是的，Rust 也存在同样的问题。<br />现在让我们为其他几个目标架构编译 C 语言示例。<br />我还添加了一个 64 位的 a &lt; b 比较，因为这足以在 RV32 上生成分支。<br />以下是 clang 23 在 -O2 优化级别下生成的条件分支和条件返回指令的数量。<br />和往常一样，所有内容都可以在 Compiler Explorer 上进行验证：<br />计数为零的目标架构是安全的。其他所有架构尽管源代码看起来像是常数时间运行，实际上都存在难缠的侧信道风险。<br />WebAssembly 拥有一条 select (cmov) 指令，因此在模块中看不到明显的条件跳转，但 WebAssembly 编译器随后可以做任何它想做的事。在没有等效原生指令的平台上，我们很可能会得到一个跳转。<br />Cortex-M0 (Thumb-1) 和通用 32 位 PowerPC 没有类似 cmov 的指令，因此它们会产生分支。<br />现在出现了一个令人愉快的惊喜：GCC 16.1 在 RISC-V 上编译这两个示例时都没有分支。它的进位使用 sltu，并且对掩码算术运算保持原样。<br />很酷。但让我们做个小改动：从比较操作中推导掩码。<br />然后……分支又回来了！<br />GCC 现在在 RV32 和 RV64 上都生成了 bgeu（Compiler Explorer）。它在 RV32 上的 64 位比较中也会生成分支。<br />对于位掩码示例，有一个常见的变通方案：在使用掩码之前将其通过一个空的 asm 语句传递。让我们这样做：<br />该汇编不执行任何操作，但它的声明告知编译器它可能会更改 mask。<br />现在，两个版本在 RV32 和 RV64 上编译时都没有分支了。呼，总算松了口气。<br />我们能对加法做同样的操作吗？<br />两次尝试都在 Compiler Explorer 上。<br />坦白讲，对于加法，我不会依赖任何一种内存屏障实验作为修复方案。<br />目前，clang 23 保持了我手写的进位链无分支，但谁知道在接下来的版本中会发生什么。<br />不过，对于 RISC-V 来说是有解决方案的：RISC-V 有一个名为 Zicond 的扩展。<br />让我们使用 -march=rv32imac_zicond 启用它，并再次编译我们的位掩码示例：<br />太棒了，没有跳转。在启用 Zicond 的情况下，上面测试的每种情况都没有分支。<br />Zicond 是 RVA23 配置文件的一部分，但不幸的是，当今使用的许多核心并没有实现它，特别是微控制器。<br />即使它可用，也有一个容易被忽视的重要细节：Zicond 规范仅在同时实现了 Zkt 扩展的情况下，才保证其执行时间与数据无关。<br />编写安全、可移植的代码非常困难。防范侧信道就像清除敏感数据（zeroing secrets）一样容易引火烧身（footgunish）。<br />噢，如果你还没读过的话，Thomas Pornin 的《为什么需要常数时间密码学？》以及《常数时间乘法》页面绝对值得一读。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-10 03:31 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://00f.net/2026/10/09/llvm-compiles-branch-free-code-into-branches-on-risc-v/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-oads-release-python-3150-96eff79c1b7bf812" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1148" data-content-paragraphs="1" data-published-at="2026-10-09T17:07:02.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 01:07</span>
</div>

### [要闻：Python 3.15.0 是 Python 编程语言的最新主要版本](https://www.python.org/downloads/release/python-3150/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Python 3.15.0</div>

<div class="article-body" data-article-body="true"><p>发布日期：2026年10月9日<br />Python 3.15.0 是 Python 编程语言的最新主要版本。与 Python 3.14 相比，该版本包含诸多新特性与优化，凝聚了来自 1,012 位贡献者的 5,643 次提交。<br />Python 3.15 的部分主要新特性与变更包括：<br />关于 Python 3.15 变更的更多详细信息，请参阅《Python 3.15 新特性》（What’s new in Python 3.15）。<br />该问题源于 macOS 27.0 中的一项操作系统行为变更，据信该变更会影响 Tk 图形工具包的所有当前版本，进而波及所有当前 Python 版本中的 tkinter 模块。<br />如果您在 macOS 上依赖基于 Tk 的应用程序（例如 IDLE），您不妨考虑推迟安装 macOS 27.0，直到出现针对 Tk 或 macOS 的变通解决方案，或者先行测试确认您的应用程序工作流程未受影响。请关注 issue #158053 以获取最新进展。<br />为了庆祝全新的 3.15 版本，巴里·华沙（Barry Warsaw）为我们准备了一份礼物！<br />“我萌生了一个想法，想迅速制作一个小巧的 TUI（终端用户界面）文字冒险游戏，带大家领略 Python 3.15 的新特性。在此向大家隆重推出‘whatsnewt’：<br />一款体验 Python 3.15 新特性的 TUI 文字冒险游戏。<br />你在解释器内部某处的‘启动门厅’醒来，一路探索走向‘发布之门’。沿途设有 18 个谜题，每一个都对应着你必须实际操作使用的真实 3.15 特性。你不仅仅是在回答枯燥的问题，而是真正在 Python 3.15 解释器中编写并运行代码。<br />部分谜题需要类型检查器，在这些情况下，答案将由 pyrefly 进行验证（它正是出于这一原因被引入作为依赖项），判定结果将直接引用它的反馈信息。<br />体验该游戏最简便的方式是运行：<br />uvx --python 3.15 whatsnewt<br />没错，里面还有彩蛋。”<br />感谢所有帮助促成 Python 开发及这些版本发布的众多志愿者！请考虑通过亲自参与志愿服务，或通过机构向 Python 软件基金会（Python Software Foundation）进行捐赠来支持我们的工作。<br />衷心感谢 Georgi Ker 和 Marie Nordin 为 Python 3.15 设计徽标！<br />同时，也极其感谢主权技术局（Sovereign Tech Agency）通过主权技术奖学金资助雨果·范·凯梅纳德（Hugo van Kemenade）担任 Python 3.14 和 3.15 的版本发布经理。<br />下载 macOS 安装程序<br />下载 Python 安装管理器<br />下载 XZ 压缩源码包</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-10 01:07 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://www.python.org/downloads/release/python-3150/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-o-substitute-for-the-nhs-47c6f8b679d438f6" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="380" data-content-paragraphs="3" data-published-at="2026-10-09T16:13:09.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-10 00:13</span>
</div>

### [保险模式无法取代国民医疗服务体系（NHS）| 读者来信](https://www.theguardian.com/business/2026/oct/09/insurance-model-is-no-substitute-for-the-nhs)
<div class="original-title-sub"><span class="orig-tag">原文</span> Insurance model is no substitute for the NHS | Letter</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/7dc17cd3be2c706b0700401a34312114fd03aa58/546_0_6250_5000/master/6250.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=d93869542f4e747c95d517f1e8caad0f" alt="保险模式无法取代国民医疗服务体系（NHS）| 读者来信" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>苏珊·琼斯（Susan Jones）指出，NHS模式的医疗体系既不需要销售成本，也不需要支付股东利润。</p>
<p>在10月4日的《跨越分歧共进晚餐》（Dining across the divide）栏目中，年轻的参与者特德（Ted）被引述表达了他“希望废除NHS并以社会保险模式取而代之的想法。该模式在需要时仍将提供免费治疗，但人们将通过保险系统缴费，并自行选择保障水平。这些模式能为患者带来好得多的成效。”</p>
<p>作为一名退休的保险核保人，我坚决不同意特德的观点。让我们来看看商业的基本逻辑。保险有两种“类型”：第一种是随着时间推移发生概率逐渐增加的事件——例如人寿保险。年纪越大，死亡的概率就越高，覆盖该风险所需的保费也就越多；第二种则是随时间推移发生概率基本保持不变的事件——例如房屋保险。房屋被烧毁的概率对每个人来说都大致相同，其成本也在保单持有人之间平均分摊。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-10-10 00:13 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/business/2026/oct/09/insurance-model-is-no-substitute-for-the-nhs" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

::::