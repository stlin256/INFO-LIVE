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
<div id="story-l-maps-within-30-minutes-fc35228dec994854" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1250" data-content-paragraphs="18" data-published-at="2026-09-14T13:37:36.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-14 21:37</span>
</div>

### [30分钟内搞定航测制图](https://blog.zm.is/finished-aerial-maps-within-30-minutes/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Finished aerial maps in under 30 minutes</div>

<div class="article-body" data-article-body="true"><p>我最近入手了一台大疆 DJI Lito X1，并决定看看能把它推向什么极限。航空测绘听起来令人兴奋：短短几分钟内，你就能超越谷歌地图的影像质量，并永久拥有一张某个地点的参考地图。</p>
<p>我们需要确保飞行速度不要太快，否则相机将无法跟上，最终生成的地图中就会出现缝隙和错位。</p>
<p>正如你所见，我发现飞行高度 80 米、速度 3.5 米/秒的效果很好。较低高度的飞行分辨率更高（显而易见），但耗时更长。毕竟这完全是三角学原理：相同的视场角（FOV）在较低高度覆盖的范围更小。</p>
<p>大疆并没有让这一切变得轻松。DJI Fly 应用程序没有航线导入功能。</p>
<p>在应用中打开“航线飞行”（Waypoint Flight），添加几个毫无用处的航点，以此创建一个占位任务。我们不会用到这些航点，但添加它们是必不可少的。</p>
<p>是的，真的如此，这意味着你必须专程起飞一次，只为了添加这些你根本用不上的航点，因为你在地面上无法添加任何航点。</p>
<p>这会在设备上生成 /sdcard/Android/data/dji.go.v5/files/waypoint/ / .kmz 文件，令人沮丧的是，你只能通过将设备连接到电脑才能看到它。我使用了 adb。你需要找到下载好的 KMZ 文件，并用它替换掉原来在那里的 .kmz 文件。不要更改文件名。</p>
<p>乍看该文件夹，应该看不出你做过任何修改。</p>
<p>幸运的是，大疆提供了如何进入航线飞行的教程，但既然你之前已经添加过航点，你应该知道该点哪里。你会注意到之前添加的航点已经消失，预设好的航线现在已经在设备上清晰可见。</p>
<p>你真的只需要点击开始并等待。我简直无法形容这有多么酷炫。它会自动起飞，飞往第一个航点，飞完全程航线，一路上拍照（本例中拍摄了 36 张），然后自动降落。</p>
<p>我在这里把地图视图最大化了，因为那里比空旷的田野有更多有趣的东西可以看，但以防万一，你可能还是需要留意相机画面。</p>
<p>降落后，只需直接全选当天的照片，目标是让照片数量与在“航线飞行”中看到的一致。如果拍了 36 张，你就需要下载 36 张。如果在测绘完成后你还进行了休闲飞行，请务必先选齐所有测绘照片。</p>
<p>如有疑虑，全部下载即可。每张照片都带有地理标记。我们并不太在乎照片是否严格在航线的每个航点上精确拍摄。瓦片处理服务器会根据每张照片中的地理信息来计算生成地图，并丢弃云台没有垂直朝下的照片。因此，就算不小心把非测绘照片也提交给了处理服务器也没关系——我知道在移动设备上管理这么多照片确实很繁琐。</p>
<p>这一步可以通过手机或电脑以多种不同方式完成，具体取决于遇到了什么故障（反正迟早会出点岔子）。</p>
<p>为了处理这些照片，我使用了一台通过 Tailscale 连接的现场机器。</p>
<p>随后它会拼接地图，生成完毕的瓦片会被拉取回 Zeitgeist Survey 的云端服务器。</p>
<p>搞定！这就是 Zeitgeist Survey 能力的端到端演示。从规划到最终交付地图，耗时不到 30 分钟。</p>
<p>你可以点击下方的按钮查看实时交互式地图。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>作者使用 DJI Lito X1 进行航拍测绘测试，在80米高度以3.5米/秒的速度飞行测绘被证实有效。</li>
    <li>DJI Fly 应用没有直接导入航线任务的功能，用户无法在地面直接添加航路点，必须先起飞以添加占位航路点。</li>
    <li>来源叙事重点：通过逆向探索与系统工作流编排（利用 adb 替换 KMZ 航线文件、Tailscale 局域网组网与 Zeitgeist Survey 云端处理），展示如何在 30 分钟内绕过 DJI 官方软件限制，实现高效的全流程低空自主航测与高精地图拼图。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.zm.is/finished-aerial-maps-within-30-minutes/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-idelines-overprescribing-59ca95360efcd543" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="398" data-content-paragraphs="1" data-published-at="2026-09-14T12:00:58.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-14 20:00</span>
</div>

### [英格兰抗抑郁药使用率高企的原因其实很简单：很多人确实需要它们 | 迪安·伯内特](https://www.theguardian.com/commentisfree/2026/sep/14/england-record-antidepressant-use-gp-guidelines-overprescribing)
<div class="original-title-sub"><span class="orig-tag">原文</span> There’s a surprisingly simple reason for England’s high antidepressant use: lots of people need them | Dean Burnett</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/d08e5cf1ac4b23439982230785edce3c486c6947/0_549_4035_3229/master/4035.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=2d48205d2c761a5a9595eb5c868dce71" alt="英格兰抗抑郁药使用率高企的原因其实很简单：很多人确实需要它们 | 迪安·伯内特" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>全科医生无视指南并“过度开药”的说法根本站不住脚。相反，我们应该审视自身的社会与经济危机。<br />迪安·伯内特是一位神经科学博士。<br />英国国家医疗服务体系（NHS）的一份新报告披露，英格兰记录的抗抑郁药使用率达到了历史最高水平，在2025至2026年间，大约每七个人中就有一人被开具了抗抑郁药物处方。这引发了大批媒体报道，表达了对这一增幅的震惊，并就如何逆转、或是否应当逆转这一趋势提出了质疑。<br />如此高的抗抑郁药使用水平自然应当引发关注与反思。但目前广为流传的一种说法是，抗抑郁药使用率过高是因为“过度开药”，正如临床心理学教授约翰·里德博士在《每日邮报》上所言。这种观点认为，患者在不应该使用抗抑郁药，或者有更好、更安全的替代方案时，仍被开具了此类药物。<br />迪安·伯内特是一位神经科学博士，著有《蠢蠢欲动的大脑》（The Idiot Brain）和《情感无知》（Emotional Ignorance）。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>一份新的NHS报告显示英格兰抗抑郁药使用量创下历史新高，2025-26年度大约每七个人中就有一人被开具抗抑郁药处方。</li>
    <li>迪恩·伯内特（Dean Burnett）是神经科学博士，著有《The Idiot Brain》和《Emotional Ignorance》。</li>
    <li>来源叙事重点：英格兰抗抑郁药处方量创新高反映了真实且广泛的社会心理需求，而非全科医生（GP）违规‘过度开药’；应当从社会和经济危机寻找根源，而非将责任转嫁给基层医疗系统</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/commentisfree/2026/sep/14/england-record-antidepressant-use-gp-guidelines-overprescribing" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ead-therapist-collective-eaf88a8860f169bf" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="573" data-content-paragraphs="3" data-published-at="2026-09-14T12:00:58.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-14 20:00</span>
</div>

### [巡演可能将音乐人推向孤立与焦虑的极端。巡回途中的心理治疗支持至关重要](https://www.theguardian.com/music/2026/sep/14/touring-mental-health-support-scheme-radiohead-therapist-collective)
<div class="original-title-sub"><span class="orig-tag">原文</span> Touring can take musicians to isolating, anxious extremes. Access to therapy on the road is a vital support</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/4a77fe05c374b85fcdecce3adf38743859f93467/368_0_2415_1932/master/2415.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=84da70516cd26e0e9c02ae620da9d72b" alt="巡演可能将音乐人推向孤立与焦虑的极端。巡回途中的心理治疗支持至关重要" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>从我们早期的经历中，我深知巡演路上的生活压力有多大。虽然大型巡演通常会聘请心理治疗师，但草根艺人却无法负担这笔费用。我很高兴能支持一项旨在改变这种现状的新计划。</p>
<p>当电台司令（Radiohead）刚开始巡演时，那种感觉极其令人兴奋，但我们在签约前已经组建了五六年，而且实际上只在牛津演出过。突然之间，你步入了一个全新的世界：初尝成名的滋味、被拿来与所有人比较、乐队走红时那如熔炉般的体验，以及熬夜、劣质伙食和围绕现场音乐发生的一切所构成的新常态。所有感官都被放大了，而这可能会让人感到非常孤立。</p>
<p>1992年，我们还开着一辆厢型货车在小型场地演出，而到了1993年下半年，我们突然就来到了美国巡演。在那一年的第二次长途巡演中，一切压力都找上了门。我整个人有些封闭起来。在美国的那种环境不知怎地让我产生了“冒充者综合征”。我真切地感到自己离家极其遥远。所有这些焦虑总得找个宣泄口——对有些人来说是借酒消愁或吸毒——但对我而言，它在我的演奏中爆发了。有一次特别的演出，我们为惊惧之泪（Tears for Fears）以及另一支由[金发女郎乐队的]克莱姆·伯克（Clem Burke）担任鼓手的乐队开场暖场。克莱姆是我心目中绝对的鼓手偶像，但我当时却崩溃到了极点，我的鼓技直线下滑。四肢仿佛都在按各自的节奏乱走，踩底鼓的感觉就像是在推开一扇沉重的铁门。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>大型巡演通常会聘请心理治疗师，而基层音乐人无力承担此类费用。</li>
    <li>文章作者支持一项旨在为巡演音乐人提供心理治疗支持的新计划。</li>
    <li>来源叙事重点：通过Radiohead成员早期巡演经历中的高度孤独、心理崩溃和冒名顶替综合征，揭示巡演环境对音乐人心理健康造成的严重压力；重点倡导为缺乏经济承受能力的基层音乐人建立可负担的巡演心理治疗支持计划。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/music/2026/sep/14/touring-mental-health-support-scheme-radiohead-therapist-collective" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--are-you-doing-this-week-fd6085f4c156927e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1964" data-content-paragraphs="1" data-published-at="2026-09-14T07:47:47.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-14 15:47</span>
</div>

### [这周你在忙些什么？](https://lobste.rs/s/0inlyw/what_are_you_doing_this_week)
<div class="original-title-sub"><span class="orig-tag">原文</span> What are you doing this week?</div>

<div class="article-body" data-article-body="true"><p>你这周在忙些什么？欢迎随意分享！<br />也要记住，完全什么都不做也完全没问题。<br />我发布了这款多人乒乓球 SSH 游戏。网页版运行效果不错，所以为什么不把它搬到终端里呢？<br />试一试吧：ssh ssh.antics.gg<br />正在准备今年 NixCon 的演讲，主题是用 NixOS 运行一个业余自治系统（AS）。我以前从未去过波兰，所以总体上非常期待这次旅行。<br />除了本职工作，主要是备考 A2 摩托车驾照。我对计算机的兴趣最近进入了低谷期，主要是因为目前行业的发展方向（在我看来）实在太糟糕了，所以做一些与计算机无关的事。<br />太酷了，祝你考驾照顺利！<br />搞定了我的“让 Emacs 与 Dyalog APL 通信”插件：https://github.com/vlnn/ride-apl，现在正在用实际任务进行测试，为最终用户编写文档等。我希望它能成为 APL 用户的 Cider，不过当然还有大量工作要做。<br />工作中：我正在努力提高自己遵循的工程实践质量。周末我突然意识到，自己一直因为害怕失败而没有使用手头现成的工具（GitHub Actions、ArgoCD），我应该克服这种恐惧，至少为自己编写的软件搭建一个初级的 CI/CD。公司提供了充足的流水线配置资源，如果需要的话，也有几位同事可以帮我。<br />我打算完成几项功能的实现并编写测试，然后开始推进部署标准化流程并撰写文档。<br />生活上：继续为我们迎来的新小狗做准备。我正在读索菲亚·殷博士（Dr. Sophia Yin）写的《7天打造完美幼犬》（Perfect Puppy in 7 Days）。目前感觉非常扎实且实用。我迫不及待想把这些建议付诸实践了。<br />我正在用 Gleam 写一个小服务器，实现 AntennaPod 和 gPodder 所使用的播客同步服务器接口，我想大概两三天就能搞定。没什么花哨的东西，但这是一个我能完成、能在自己服务器上运行并感到开心的项目。<br />为比赛做了一张《半条命》（Half-Life）地图之后，我开始修复 noclip 的 GoldSrc 渲染器中的问题，这样就能在自己的 noclip 实例中查看我的地图了（对移动端不友好）。<br />我也在找工作，但最近工作机会并不多。<br />你能把镜头彻底倒过来挺酷的。我想象不出玩家角色做出那种扭曲姿态的动画会是什么样，肯定很有喜感。<br />《半条命1》既好玩，又足够老旧以至于可以在浏览器里运行，这里面可能大有可为。另外 Shift 键加速也很棒！速度非常快。<br />地图下方的火车是打算渲染在远处，还是只是个彩蛋？<br />那是一个光照烘焙和存放区，火车会每隔一段时间穿过地图，它既是地面上的危险障碍，也是跳上去拿到高斯枪的唯一途径。<br />啊，太棒了！我都忘了这本来就不是只在浏览器里玩的。在浏览了像 https://noclip.leo-peltier.fr/#PerfectDark64/mp_cryp;ShareData=Am$2NWUN-hV@Pav=ROQ6h= 这样的其他地图后，我注意到了更多控制选项。我猜要想完全正常工作，得把整个 GoldSrc 引擎都移植过来才行。<br />我还记得《半条命1》里的高斯枪……强到变态，但 Valve 在《半条命2》越野车上的陶式加农炮（Tau Cannon）并没有真正展现出它的威力。<br />我自己开发的 septum 交互式代码搜索工具已经用了 5 年，所以我打算把即将发布的 0.4 版本直接改为真正的 1.0 版本。我需要添加删除路径过滤器的支持，然后移除之前匆忙加入的 MCP 支持——那部分代码 Bug 很多，而且感觉格格不入。程序永远都可以继续改进，但在目前这个节点，它可以算作“完工”了。<br />好久没写 Rust 了，所以也许我会考虑写一个 Forth 解释器。<br />我为 Playdate 掌机制作并发布了一款武侠和江湖题材的 RPG 游戏。它是 2000 年代一款怀旧游戏的重制版，那时候我还是个初中生，那款游戏只能在一款叫“文曲星”的掌上设备上玩。也许这更多是对那个年代的怀念吧——当时全班男生都在偷偷玩这个，上课都不专心听讲 :)<br />正在为接下来几周断断续续的旅行做准备，每周至少有部分时间不在家，正在努力提前把生活和日常事务处理好。同时也在琢磨冬天可以用什么运动来替代骑行，虽然英国 9 月的天气总是能给我留出不用淋雨骑车的窗口期，所以这倒没有那么紧迫。<br />另外还开始为宝马 Z4 打印一些车顶盖配件，尺寸超出了 3D 打印机的最大打印幅面，所以我把第一个切成两半，预计分两次共打印 15 小时即可完成。后来又重新切成了三块（在第一块打印了 5 个小时之后才切，因为我太蠢了），看起来第二个总共大概需要打印 10 个小时。反正我无论如何都得拼接/粘合，然后填缝/上底漆/喷漆，所以有两个接缝也不会太糟。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-14 15:47 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://lobste.rs/s/0inlyw/what_are_you_doing_this_week" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-oldnewthing-20260910-00-89e9d02f5f9e1076" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3226" data-content-paragraphs="28" data-published-at="2026-09-14T03:34:33.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-14 11:34</span>
</div>

### [为什么 x86 未定义指令被称为 ud2？为什么是 2？](https://devblogs.microsoft.com/oldnewthing/20260910-00/?p=112689)
<div class="original-title-sub"><span class="orig-tag">原文</span> Why is the x86 undefined instruction called ud2? Why 2?</div>

<div class="article-body" data-article-body="true"><p>如果你查看过 x86 编译器的输出（或者像我一样，正在排查由某些试图 Hook API 的软件引发的崩溃），你可能会看到一条名为 ud2 的指令。这到底是怎么回事？</p>
<p>ud2 指令是一条在架构层面上未定义的指令，确保会引发“无效操作码”（invalid opcode）异常。某些编译器生成它是为了标记“不可达”（unreachable）代码，这样一旦执行流因某种原因进入该处，程序就会直接崩溃，而不是去执行未知的随机指令。例如，如果一个被标记为 [[noreturn]] 的函数因某种意外返回了，编译器就会在调用后放置一个 ud2，从而让程序直接崩溃，而不是顺延执行进入下一个函数。</p>
<p>话说回来，为什么这条指令叫 ud2 而不是直接叫 ud 呢？曾经存在过 ud1 吗？ud1 到底出了什么大问题，以至于我们非得搞出一个 ud2？</p>
<p>我想我可以还原当时发生的事情。</p>
<p>最初，x86 架构上并没有专门定义的“未定义指令”。因此，那些想要强制触发无效操作码异常的人，便开始寻找某种在执行时能可靠引发无效操作码异常的字节序列。</p>
<p>与此同时，有人发现 0F B9 序列也具备同样的特性。于是当时形成了两大阵营：0F FF 的信徒和 0F B9 的拥趸。两者之间其实并没有发生太激烈的争论，因为两种技巧似乎都管用，而且也不存在一种方案会损害另一种方案的情况。</p>
<p>后来英特尔开始研发下一代处理器，他们可能做出了一些调整，导致 0F FF 不再引发无效操作码异常。也许他们尝试引入了一条使用 0F FF 的新指令；或者它依然是未定义的，但只是执行了某些随机操作，而没有引发无效操作码异常。当他们开始在新处理器上运行软件时，发现某些程序无法正常工作了。经过费时费力的调查，他们发现这些程序依赖于 0F FF 作为无效操作码的特性。</p>
<p>换句话说，他们撞上了海勒姆定律（Hyrum&#39;s Law）：当拥有足够多的用户时，所有可观察到的行为都会被某个人所依赖。必须附上相关的 XKCD 漫画梗。</p>
<p>针对 0F B9 也得出了类似的发现。</p>
<p>既然意识到人们需要一种可靠的方式来触发无效操作码异常，英特尔的工程师们决定将其正式化。他们创建了一条真正获得官方支持、永久无效的指令，并将其命名为 ud2。</p>
<p>它被称为 ud2，是因为 0F FF 变体被追溯命名为 ud0，而 0F B9 变体被追溯命名为 ud1，于是留下 ud2 作为官方推荐的未定义操作码。</p>
<p>ud2 的一个优势在于它是一条没有参数的双字节指令，因此你无需处理那些解码了却未被使用的随机源操作数和目的操作数。</p>
<p>额外闲聊：但我们为什么要在意 ud0 和 ud1 那些未使用的参数呢？难道不能直接说 ud0 和 ud1 也是双字节无效操作码吗？我的意思是，没错，确实存在第三个字节，或者如果内存操作数带有偏移量或比例变址，可能还会有更多字节，但处理器根本不用它啊。</p>
<p>这确实很关键，因为即便处理器不去使用它，它仍然会对其进行解码。如果指令的解码跨越到了一个不存在（not-present）的内存页中，你根本不会得到无效操作码异常，而是会得到一个访问冲突（Access Violation）。</p>
<p>再多一点闲聊：不过某些较老的处理器只要一解码出 0F FF，就会立即引发无效操作码异常，根本不检查指令的其余部分是否正确解码。因此，如果你的 0F FF 恰好位于页面末尾，而下一页又不存在，你有时会得到无效操作码异常，有时则会得到访问冲突。</p>
<p>所以最好还是坚持使用 ud2。它的行为是一致的，并且在架构上得到了保证。</p>
<p>Raymond 参与 Windows 的演进已超过 30 年。2003 年，他创办了名为 The Old New Thing 的网站，其受欢迎程度远远超出了他最狂野的想象，这一发展至今仍让他感到既惊又喜。该网站后来促成了一本书的出版，巧合的是书名也叫《The Old New Thing》（Addison Wesley 2007 年出版）。他偶尔也会在 Windows Dev Docs 的 Twitter 账号上露面，讲述一些不含任何实用信息的故事。</p>
<p>加入讨论。</p>
<p>我认为我们现在真的不需要再操心汇编了，因为如今的编译器在处理代码方面已经相当出色。当然，如果你想加入微软的核心团队，那就是另一回事了，不过我很好奇现在的 Z 世代究竟有多少人懂汇编。</p>
<p>操心汇编？不，你确实不需要操心。但如果你需要编写对性能至关重要的代码，你就需要了解基础知识。即使是当今极其出色的编译器，也不一定能纠正一个包含不可预测跳转或缓存利用率低下的糟糕算法。即使向量（vector）比链表更快且内存效率更高，它们也不会自动将链表替换为向量。如果你对自己源代码转换后的形态至少有一个大致的了解，你就能协助编译器发挥出最佳效果。</p>
<p>我们大多数人确实不再需要手写汇编代码了，我承认这一点。在没有源代码的罕见情况下，能够阅读汇编可能会有所帮助。当你在 godbolt.org 上把玩探索时，它也能帮你体会到编译器为你做了多少工作 😀</p>
<p>我以前真没怎么听说过 UD2 及相关指令……每当我想让程序崩溃并在调试器中中断（如果附加了调试器的话）时，我见到的和使用的都是 0xCC (INT 3)。</p>
<p>UD2 的处理机制与 0xCC 相比如何？</p>
<p>CC (INT 3) 属于陷阱（trap），主要用于指示前提条件/契约违规。</p>
<p>而 UD2 则更偏向于硬性终止（hard stop），正如 Raymond 所说，“执行随机指令”可能会导致大量 Bug。</p>
<p>这让我想起了给 6502 处理器编程的经历：如果你的代码出现了 Bug，处理器跳转到了未知领域，只要未使用的 RAM 已经被清零，你就更容易捕获这些 Bug，因为 0x00 操作码就是 BRK（强制中断）。</p>
<p>至于 x86，我猜 UD2 指令出现得相当晚，所以像 0x00 或 0xFF 这样所有“唾手可得”的操作码早就被占满了 🙁</p>
<p>在 Acorn 机器上，BRK 向量会捕获此类指令，并将接下来的字节读取为错误信息。（好吧，严格来说，是一个错误代码，接着是 ASCII 文本信息。）这使得语言和系统服务 ROM 能够非常简便地报告错误，也允许通过单一接口捕获来自任何 ROM 或应用程序的错误。因此，BASIC 的 ON ERROR 不仅可以捕获来自 BASIC 本身的错误，还可以捕获来自文件系统、网络，或是支持你接入的新硬件的某个 ROM 等等产生的错误。你的文字处理器、FORTH 程序、游戏、调试器软件等同样也可以做到这一点。<br />当然，如果你的代码碰到了……<br />在 Acorn 机器上，BRK 向量会捕获此类指令，并将接下来的字节读取为错误信息。（好吧，严格来说，是一个错误代码，接着是 ASCII 文本信息。）这使得语言和系统服务 ROM 能够非常简便地报告错误，也允许通过单一接口捕获来自任何 ROM 或应用程序的错误。因此，BASIC 的 ON ERROR 不仅可以捕获来自 BASIC 本身的错误，还可以捕获来自文件系统、网络，或是支持你接入的新硬件的某个 ROM 等等产生的错误。你的文字处理器、FORTH 程序、游戏、调试器软件等同样也可以做到这一点。<br />当然，如果你的代码恰好碰到了内存中随机的 0x00，屏幕就会被乱码填满，直到碰到下一个 0x00 为止。由于字符输出例程统管所有图形和文本输出，如果读取到了特定的字节，它还可能执行清屏、切换显示模式、重新定义字符、启动打印机，乃至完全抑制所有输出。<br />因此可以说，它在大幅简化错误处理的同时，也带来了极大的混乱。<br />0x00 已经被占用了。早在 8086 时代它就是一条 ADD 指令。0xFF 是双字节指令的前缀字节。然而即便在今天，0xFF 0xFF 依然不是一条有效指令（至少在我的反汇编器看来是如此）。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-14 11:34 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://devblogs.microsoft.com/oldnewthing/20260910-00/?p=112689" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-og-post-case-against-jxl-0386281387e0321f" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="4347" data-content-paragraphs="9" data-published-at="2026-09-14T01:18:11.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-14 09:18</span>
</div>

### [反对 JPEG XL 的理由](https://giannirosato.com/blog/post/case-against-jxl)
<div class="original-title-sub"><span class="orig-tag">原文</span> The case against JPEG XL</div>

<div class="article-body" data-article-body="true"><p>探讨 JPEG XL 作为 Web 图像编解码器的定位。<br />JPEG XL 是一款在技术上令人印象深刻的图像编解码器；它是对 JPEG 的决定性升级，比 WebP 更全能，并且完全有能力满足 Web 之外的应用场景。然而，众所周知，它在 2023 年遭到了 Chrome 的弃用。由于这件事发生在一个免版税、灵活、压缩高效、出自 JPEG 委员会且正受到大公司关注的编解码器身上，这一决定让许多人感到难以接受。<br />最近，一个用 Rust 编写的 JPEG XL 解码器以某种形式进入了 Firefox 和 Chrome。鉴于这个新解码器有望保护 Web 免遭 2023 年 WebP 漏洞的重演，Web 的主要利益相关者或许正在扭转针对 JPEG XL 的态度。但这足以成为 Web 采用 JPEG XL 的理由吗？<br />从历史上看，我一直是在所有场景下推广 JPEG XL 的坚定支持者。我在 Interop 2024 中支持了 JPEG XL，并多次与 Jon Sneyers 和 Jyrki Alakuijala（该格式的两位主要作者）有过个人交流。他们展现出的公开处事作风、冷静理智、技术才能以及对该领域的热情，始终令我印象深刻。<br />本文绝非旨在贬低该格式作者及其成果，也不打算就该编解码器在自由软件领域的象征意义表达任何政治立场。这篇博文的宗旨是科普性的；我希望提供一个审视 2026 年图像压缩与 Web 平台现状的实证视角。部分灵感汲取自 Dmitry Grinberg 所著的《RISC-V：他们本应更明白》（RISC-V: They Should Have Known Better）。<br />我从事图像压缩工作，最初出身于视频压缩领域。在研发 AV1 编码器期间，Julio Barba 和我对 AVIF 做出了重大改进，我也在此过程中学到了很多。当我决定着手构建自己的编码器时，我不得不深入思考哪些格式上限最高、能够被有效优化，并且具备最大的现实与潜在实用价值。最终，我决定不采用 JPEG XL。<br />从体量上看，Web 上极少有通用有损压缩无法满足的应用场景。普通 Web 用户并不需要无损压缩；他们只需要一款足够通用、能避免严重瑕疵的有损编解码器（例如针对非摄影内容的 JPEG 瑕疵）。这就排除了 JPEG XL 的无损优势——在实践中，它实际上仅比无损 WebP 体积小约 11.9%，而且这一结果还是建立在一个对 Web 而言不切实际的测试数据集上的（157 MP 照片、10 MP 插画和 27 MP 书籍）。为了在极小体量的图像内容上节省 12% 的体积，而这些内容的场景本身对带宽限制又不够敏感，引入一款新的浏览器图像编解码器根本不值得。我之所以这么说，是因为 JPEG XL 在有损压缩方面并不具备竞争力，因此无损本该是它唯一的真正优势。<br />支持 JPEG XL 的最初论点之一，是其参考编码器比竞争对手的编码器更具感知优化能力。而如今，无论在速度还是每比特保真度上，其他编码器都更具优势。<br />AV1 参考编码器接受了基于受控主观人类实验的专门感知调校，以在增强其效率的同时保留专为感知指标优化的调校模式。SVT-AV1 也有类似的调校模式。没有任何令人信服的理由能说明现代编码器没有针对人眼进行调校。<br />指标固然不完美，但它们给 JPEG XL 描绘了一幅严峻的前景：<br />aperture-alpha 是 Halide Compression 即将推出的编码器，代号为 Aperture。我将其纳入对比，是为了展示 libjxl 要在前沿领域竞争究竟需要弥补多大的差距。<br />一些分析称，JPEG XL 在各项指标上的表现低于其实际的感知优势，但我没有看到足够的证据表明这种差距足以彻底颠覆我所分享的这些图表。CVVDP 和 SSIMULACRA2 是非常强大的感知指标，当差异如此巨大时，它们无疑说明了问题。对于 AVIF，libaom 针对感知的调校模式（tune IQ）仅比针对感知指标优化的模式（tune SSIMULACRA2）低几个点。此外，JPEG XL 参考编码器在历史上一直存在感知问题，且至今仍未得到充分解决。<br />世上本没有编解码器基准测试，只有编码器基准测试；从理论上讲，JPEG XL 作为一种格式的上限要高于 libjxl 目前达到的水平。但要缩小这一差距有多难？作为一名压缩工程师，我认为它在这方面处于劣势。原因包括：<br />针对非摄影图像，所谓“它们本应是矢量图像”的说法是站不住脚的，因为许多图像本可以制成矢量图但并没有这么做，而且它们也无法被完美矢量化。“世界本该是另一种样子”并不能成为拒绝针对世界现实情况进行优化的合理辩护。<br />人们很容易认为这些要点意味着上限高于 libjxl 所能达到的水平、并且我们可以做得更好，但鉴于其不够直观（且可能更弱）的编码工具，我并不确信它能迅速超越优化良好的 AVIF 编码器。<br />JPEG XL 拥有一份令人印象深刻、极具灵活性的规范。除了编码工具之外，它还支持多达 4096 个通道、任意色彩深度、渐进式解码、JPEG 重压缩等。其中许多特性在 Web 上并不具备广泛的实用价值；你需要的只是 4 个通道（RGB/YUV + Alpha）、足以支持 HDR 的合理色彩深度（10 位即可），以及快速加载的能力。<br />渐进式渲染（AVIF 亦支持）可在完整图像传输完成之前先解码出低保真度的画面。AVIF 曾有一段时间不支持渐进式渲染，在那期间，我认为该特性被严重过度鼓吹了。如今 libavif 已经实现了它（这在技术上一直都是可行的），相关争论似乎已经尘埃落定。我认为这是因为实际效果说明了一切：<br />这是来自 JPEG-XL 信息网站的示例，AVIF 在仅传输完整图像约 2-3% 大小时就显示出了可用的图像，远远早于 JXL。结合 AVIF 整体体积更小的事实，这是一场毫无悬念的胜利。我对该页面进行了截图，因为 AVIF 渐进式解码仅在 Chrome 中有效（使用的是浏览器的原生解码器）；而 JPEG XL 使用了 Polyfill，因为即使在支持它的 Safari 中，渐进式解码也未获支持。<br />JPEG 重压缩是指在节省体积的同时将 JPEG 无损重新编码为 JXL 图像的能力；经常被引用的数据是可以节省 20%。然而，用户为此付出的代价是解码时间，因为重新压缩的 JPEG 解码耗时大约要多出 33%。现代消费级设备性能固然强大，但声称这种体积节省是“免费获得”的说法是具有误导性的。<br />说到这里，其解码时间与顶级水平相比毫无竞争力：<br />在公众讨论中，AVIF 被认为解码缓慢；那 JXL 又算什么呢？这还是一个 10 位的 AVIF，并且所有图像都是针对同一源文件进行体积对齐后编码的。JPEG 体积为 2,478,828 字节，JPEG XL 为 2,599,428 字节，AVIF 为 2,649,949 字节，WebP 为 2,693,794 字节。WebP 比它大了 90 多 KB，但搭配 wpd 的解码速度仍然比 jxl-rs 快了 10 倍以上。</p>
<p>由于该编解码器的表达能力极强，完全有可能精心制作出解码耗时极长的图像。以这个范例为例（请谨慎打开）：它计算了高达 33,599 的素数，在我搭载 M5 Pro 芯片的设备上使用 Rust 解码器解码耗费了 17.43 秒的用户时间。此外，别忘了这正是目前正在逐步集成进 Chrome、Firefox 等浏览器的解码器——这张“素数墙”图像的大小仅为 1,918 字节，因此对低端设备实施“JXL 炸弹”攻击即将变得轻而易举。你现在就已经可以在网页上投放几十张这类图片来拖慢 Apple 设备的速度，因为它们在 Safari 中原生支持 JPEG XL。</p>
<p>我认为 Web 编解码器应当是专用、高效且严格针对 Web 需求限定范围的。我认为 WebP 的范围界定略显狭隘，但其设计思路是正确的；AVIF 的容器还可以做得更好，而 AV1 规范在处理图像某些特定属性（例如规范性的 4:2:0 上采样）方面也可以更具体一些，但凭借 AV1 以及高度成熟的生态系统，AVIF 始终注定会成为 Web 标准的一员。</p>
<p>那么我们真的需要 JPEG XL 吗？它的定位根本称不上狭窄专一；在设计之初，它就旨在满足所有人的全部需求。我认为很多其他使用场景确实需要这一点，但 Web 需要的是节省带宽、快速解码以及防止搬起石头砸自己的脚；我看不出 JPEG XL 在契合度上甚至能比得上 WebP。更不用说对于任何只想从互联网下载一张图片并在别处使用的人而言，如今又多了一层兼容性烦恼——当初要让 WebP 获得广泛普及就已经足够困难了，我认为没有必要既为 AVIF 克服重重阻碍，又为 JPEG XL 再经历一次相同的痛苦，从而承受双倍折磨。特别是考虑到 JPEG XL 似乎并没有为 Web 平台增添任何实质价值。</p>
<p>三年半前，我曾说过：<br />“我希望看到一个 AVIF 和 JPEG XL 可以共存的 Web 环境，由开发者根据其优缺点自行决定使用哪种格式。[……] 在我看来，JPEG XL 和 AVIF 拥有截然不同的优势，适用于不同的使用场景。”</p>
<p>当时，JPEG XL 在中高保真度有损图像压缩方面是强有力的竞争者。而如今 AVIF 在全保真度区间都占据了主导地位，因此 JPEG XL 唯一的真正优势已经荡然无存。</p>
<p>JPEG XL 源自 Cloudinary 和 Google，但我认为人们在讨论该编解码器时并没有把这一点说清楚。另外值得一提的是，JPEG XL 和 AVIF 都是免版税的。由于围绕 Google 浏览器市场主导地位的争端、源自 Google 的 AV1 以及围绕 Google WebP 的争议，我认为支持 JPEG XL 的大多数论调本质上源于希望为 Web 开发者提供更多选择，而不是追求一种在技术上更为优越的图像编解码器。我理解这一点，并且我认为 JPEG XL 仍然可以在 Web 之外、AVIF 永远无法涉足的领域蓬勃发展。正如同一篇文章中所述：<br />“目前我的乐观期望是，JXL 能够在 Web 之外流行开来，受到使用 Adobe 套件或替代工具的专业人士青睐，同时相机制造商、智能手机 OEM 厂商以及其他相关方也能注意到它，并开始更认真地考虑 JXL。”</p>
<p>JPEG XL 并非毫无用处；对于 Web 以外的使用场景，它确实是一项引人注目的技术。只是我个人并不信服我们在短期内需要在浏览器中引入它。</p>
<p>软件与环境详情。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-14 09:18 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://giannirosato.com/blog/post/case-against-jxl" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-l-operating-systems-1982-de27b9c178c40874" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="294" data-content-paragraphs="2" data-published-at="2026-09-14T00:03:38.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-14 08:03</span>
</div>

### [纯函数式操作系统](https://eighty-twenty.org/2022/06/23/henderson-functional-operating-systems-1982)
<div class="original-title-sub"><span class="orig-tag">原文</span> Purely Functional Operating Systems</div>

<div class="article-body" data-article-body="true"><p>彼得·亨德森（Peter Henderson）1982年的论文《纯函数式操作系统》（Purely Functional Operating Systems）在网上似乎很难找到。几年前在攻读博士学位期间，我从大学图书馆的纸质藏书中扫描了这篇论文。以下是我制作的扫描件。</p>
<p>彼得·亨德森。《纯函数式操作系统》。载于《函数式编程及其应用》（Functional Programming and Its Applications），J·达灵顿（J. Darlington）、P·亨德森（P. Henderson）与D·特纳（D. Turner）编，第177–192页。剑桥大学出版社，1982年。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-14 08:03 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://eighty-twenty.org/2022/06/23/henderson-functional-operating-systems-1982" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ogrammers-dislike-reduce-2fb7fce7df7a40f0" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="472" data-content-paragraphs="8" data-published-at="2026-09-13T23:59:05.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-14 07:59</span>
</div>

### [从经验来看，程序员似乎不喜欢“reduce”](https://evanhahn.com/posts/2026-09-13-programmers-dislike-reduce/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Anecdotally, programmers dislike &quot;reduce&quot;</div>

<div class="article-body" data-article-body="true"><p>简而言之：根据我的经验，大家喜欢 map 和 filter，但并不喜欢 reduce。</p>
<p>我经常使用像 map 和 filter 这样的函数。每当我提交这些代码进行评审时，同事们很少抱怨。我收到过很多关于其他技术决策的反馈，但几乎没有针对我使用 map 和 filter 的异议。</p>
<p>但对于 reduce 而言，情况就完全不同了。通常，当我提交包含 reduce 的补丁时，总会收到诸如“这部分代码可读性较差”之类的评价。而且相比 map、filter、some 等函数，我看到 reduce 被使用的频率要低得多。</p>
<p>从日常轶事经验来看，我逐渐倾向于认为程序员没那么喜欢 reduce。</p>
<p>我不知道确切原因，但我有几点推测：</p>
<p>遇到这种情况，我通常只是把 reduce 改成其他写法就翻篇了。尽管我更倾向于使用它，但我通常也不太计较。但这确实是我观察到的一个小小的群体现象，所以我想把它记录下来。</p>
<p>最近我也较少注意到这种反馈了，这可能是因为如今的代码评审没有以前那么细致了。</p>
<p>你注意到了这种现象吗？你喜欢 reduce 吗？欢迎留言交流。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-14 07:59 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://evanhahn.com/posts/2026-09-13-programmers-dislike-reduce/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ratch-as-a-beginner-html-697be84fa2778250" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7532" data-content-paragraphs="81" data-published-at="2026-09-13T23:24:10.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-14 07:24</span>
</div>

### [初学者从零开始编写 Guix 服务](https://aloysberger.com/posts/writing-a-guix-service-from-scratch-as-a-beginner.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Writing a Guix service from scratch, as a beginner</div>

<div class="article-body" data-article-body="true"><p>我目前正在将我的机器从 NixOS 迁移到 Guix。<br />我的第一个里程碑是将我的 VPS 迁移到 Guix。<br />我的 VPS 基本上承担三大角色：<br />邮件服务器已启动并运行，使用 exim 作为 MTA，dovecot 作为 IMAP 服务器。为了让 exim 正常运行，我费了一番周折。我本来更倾向于使用 postfix 而非 exim，但在 Guix 官方 channel 中只有 exim 是开箱即用的。<br />当时，我还不知道如何定义自己的自定义服务。我打算在可预见的未来继续使用 Guix，因此我想对它建立深入的理解。学习创建符合自己需求的自定义服务，是精通 Guix 的重要一环。<br />这就引出了撰写本文的动机：是时候创建我自己的服务了。<br />对于代理服务器，我喜欢使用 Caddy。而在 Guix 上，Caddy 并没有作为一项服务提供。1<br />这似乎是深入研究自定义服务的绝佳时机。<br />在查阅文档和源代码的过程中，我决定记录下自己的学习过程并分享在这里，作为其他新手的指南。<br />在本文中，我们将为我们的 Caddy 反向代理编写一个自定义服务。<br />该服务包括通过 Guix 为 Caddy 设置配置文件、创建一个系统用户，并配置 Shepherd 来运行该守护进程。<br />这是一个完美的第一个自定义服务：它足够简单，易于入门自定义服务，同时又涵盖了对服务的良好概览。<br />此外，我在家用服务器上运行的大多数服务本质上都是这三个操作的组合：配置用户、管理配置文件以及运行守护进程。<br />本文适合 Guix 的新人和初学者。事实上，我也是边做边写、一路摸索过来的，除了阅读文档之外并没有任何高深的专业知识。<br />唯一真正的先决条件是在你的 Guix 实例上准备好 Caddy 软件包，这样我们才能在其之上构建服务。在撰写这篇博客时，Guix 仓库中尚不包含 Caddy 软件包，但团队正在为此努力。<br />与此同时，你可以参考我的博客文章轻松创建一个。它只需要几行代码。<br />你不需要精通 Scheme 或具备深厚的 Scheme 专业知识（我显然也没有），但强烈建议对其有基本的了解。<br />我假设你和我一样，对 Guix 还相对陌生——不过本文并不能替代官方文档。我会用自己的理解大量转述文档内容。我建议你在阅读本文的同时，把官方文档放在手边参考。<br />我显然假设你已经安装了 Guix 并且拥有一个可用的配置。如果没有，你可以在这里找到一个。<br />最后，你需要知道如何重新配置你的系统（提示：sudo guix system reconfigure my-config.scm）。<br />当我引用 Guix 源代码时，我将使用“文件名:行号”的表示法。<br />好了，闲话少叙，让我们谈谈具体要在这里构建什么。<br />为了使事情尽可能简单，我决定将我们的服务定义得尽可能简单、精简。<br />我们的计划如下：<br />这是最基础的 Caddy 服务；它能够完成任务，但不会是最优雅的。<br />大部分配置选项将被硬编码；该服务尚未准备好进行分发。然而，它将具备完整功能并满足我们的需求。<br />一旦完成，我们有望一路积累足够的知识来重新审视、重构并改进它。<br />本文发布后，我打算对其进行改进，如果我足够大胆，甚至可能会将其提交给 Guix 官方仓库。<br />但现在，让我们立足基础。我们不想让对完美的追求阻碍事情的完成。<br />文档将服务定义为“扩展操作系统功能的东西”。<br />这个定义相当模糊，但那是因为服务可以拥有极其多样化的功能。服务最常见的形式是在后台运行进程的守护进程（就像我们的情况），但这并不是服务的唯一类型。<br />正如我们将看到的，服务可以是一个只运行一次的进程，例如创建账户或将文件复制到 store。它也可以是一个周期性进程，例如 cron 任务。<br />在某种程度上，它是以声明方式配置系统的一种原语。<br />服务的一个有趣之处在于，它们从底层设计上就是可扩展和可组合的。一个服务可以扩展一个或多个服务，其本身也可以被一个或多个服务所扩展。我们将在下文中对此进行更深入的探讨；我觉得这种架构非常棒。<br />因此，如果你现在还没完全理解什么是服务，别担心，跟着做下去，随着我们的推进，一切都会变得更加清晰。<br />我们的第一步是通过创建我们所能创建的最简单的服务来打破僵局：一个什么都不做的空服务。目的仅仅是熟悉服务机制。<br />首先，我们需要为我们的服务定义 service-type（服务类型）。<br />服务类型本质上是服务的蓝图。可以把它想象成类与其实例化对象之间的关系。<br />服务通过 service 过程进行启用或“实例化”（如果沿用类的比喻）。service 过程接受一个记录和一个值作为参数。<br />如果未提供值，则使用定义中设定的 default-value。<br />要启用该服务，我们将其添加到提供给 services 过程的列表中：<br />现在让我们看一下记录的内部。<br />你可以在 gnu/services.scm:187 找到它的定义。该服务类型的文档很完善，但在使用 Guix（或者在我看来，使用任何其他软件）时，在代码库中进行 grep 搜索都是非常有价值的工具。<br />我们注意到它需要一个名称和一个 extensions 列表。它还包含可选字段：compose、extend、default-value、description 和 location。<br />让我们定义我们的 caddy-service-type。我们将服务的名称设置为 &#39;caddy。我们还将 extensions 设置为 nil（空列表），这意味着我们目前没有扩展任何现有的服务。我们同样将 default-value 保留为 nil。<br />关于可选字段，我们目前只关注 description。它接受一个字符串，正如你所猜想的，它用于提供描述。<br />我稍后会介绍 compose、extend 和 extensions 字段，现在先不必担心它们。<br />我们针对 Caddy 服务的定义如下所示：<br />就是这样。这是最简单的服务类型：它只有一个名称和一个描述。<br />让我们通过将其添加到 services 过程来启用它。<br />现在，运行 sudo guix system reconfigure config.scm，为你的第一个自定义服务庆祝吧。<br />我们“实例化”了一个 caddy-service-type 类型的服务，没有传入值，默认使用了 nil 这一 default-value。<br />它什么也没做，但它仍然是一个服务。<br />如果你有图形显示环境，可以运行以下命令来生成系统的依赖关系图：<br />guix system extension-graph config.scm | guix shell xdot -- xdot -</p>
<p>你会注意到 Caddy 服务已经出现在你的服务列表中了。很好。现在让我们让这个服务做点有用的事情。</p>
<p>改进我们服务的下一步是让它创建 caddy 用户和用户组。</p>
<p>创建一个非 root 用户来运行后台进程始终是个好主意：如果该进程受到攻击，受攻击面会小得多。</p>
<p>为了创建该用户和用户组，我们将借助扩展（extensions）的强大功能。</p>
<p>Guix 开箱即包含了大量的服务；其中之一就是 account-service-type。该服务用于在我们的操作系统上创建用户和用户组。</p>
<p>为了使用该服务，我们需要将其添加到 caddy-service-type 的 extensions 字段中。</p>
<p>extensions 字段起初有点难以理解。我的第一直觉是，extensions 字段允许你通过扩展自身功能来修改服务，赋予其额外的特性。例如在当前情况下，我本以为扩展 account-service-type 会为我们的 caddy-service-type 增加创建用户和组的能力。</p>
<p>然而事实恰恰相反！你并不是在给自己的服务“添加”能力，而是在修改目标服务（这里是 account-service-type），让它为你的服务执行操作。目标服务类型如何被修改，由其自身的 compose 和 extend 字段中的规则所定义。我们稍后会更详细地讨论它们。</p>
<p>现在，让我们继续以账户创建为例来说明这个概念。我们想要创建一个用户 caddy，以及一个同名的用户组 caddy。</p>
<p>account-service-type 被定义为可扩展的（extendable）。这意味着它为其他服务提供了创建用户账户的接口。account-service-type 不需要知道是谁在创建账户以及为什么要创建；它只提供了一种实现途径。</p>
<p>这就是这种架构的精妙之处：它使系统变得完全声明式。当某个服务扩展了 account-service-type 时，Guix 就会在该服务启用时创建这些账户。如果该服务未被启用，这些账户就不会被创建。</p>
<p>仔细想想，这真是一个绝妙的架构，它让我想起了控制反转（Inversion of Control）的原则。</p>
<p>为了在启用 caddy-service-type 时让 account-service-type 创建我们的 caddy 用户，我们对其扩展了 account-service-type。</p>
<p>现在我们理解了 extensions 字段的概念。它允许你“扩展”一个目标服务类型，例如用于创建更多用户。但我们在实践中仍然不清楚具体该如何声明它。</p>
<p>我们有几种方法来弄清楚如何设置：阅读文档、通过 grep 搜索示例，或者直接看源码。</p>
<p>为了能够更好地理解服务，我们来看一下源码。</p>
<p>出于好奇以及想要真正掌握服务扩展工作原理的渴望，我尝试看看能否通过查看定义在 shadow.scm:547 中的 account-service-type 服务来推测账户的结构。</p>
<p>这就是 account-service-type 的定义方式。我们应该对这种 record 结构很熟悉了。</p>
<p>我们首先能看到的是，default-value 是一个空列表，这意味着 account-service-type 本身期望接收一个列表作为值。但具体是什么的列表呢？</p>
<p>在这里，注释给出了答案：一个包含  和  的列表。如果没有这些注释，你也可以查看 account-activation。</p>
<p>在继续之前，我们先来聊聊 compose 和 extend 字段。以下是文档中对它们的定义：</p>
<p>这是用于组合该类型服务扩展列表的过程（procedure）。</p>
<p>该过程定义了如何使用扩展的组合结果来扩展服务的值。</p>
<p>这有些抽象，曾让我有些摸不着头脑，但它的实际含义是：</p>
<p>Compose 定义了该服务如何组合扩展了此服务类型的多个服务。</p>
<p>例如，如果有三个服务将 accounts-service-type 列为扩展，我们该如何处理每个值？我们是只取第一个？还是取最后一个？</p>
<p>显然，如果三个服务都通过扩展 account-service-type 来定义用户，我们希望创建所有这些用户。因此，我们希望将这些扩展服务提供的值拼接起来。</p>
<p>我们也可以设想其他服务表现出不同的行为。例如，假设有一个负责管理端口的服务，我们称之为 open-port-22-service-type。再假设有两个服务扩展了它：一个想打开端口，另一个想关闭端口。</p>
<p>我们应该怎么做？打开还是关闭？我们遇到了相互冲突的值。</p>
<p>也许我们出于谨慎考虑，将 open-port-22-service-type 定义为：如果接收到冲突的值，则优先采用“关闭”值。</p>
<p>这就是 compose 字段的作用。它定义了如何组合多个扩展服务的值。</p>
<p>从某种意义上说，它与 compose 非常相似。</p>
<p>让我们设想一个在计算机启动时显示欢迎信息的服务类型，称为 welcome-message-service-type。如果某个服务使用不同的消息对其进行了扩展，我们可能希望优先采用该扩展服务提供的值。</p>
<p>在这种情况下，我们将使用 extend 来指示 welcome-message-service-type 用来自扩展服务的组合值替换其自身的值。</p>
<p>请注意，compose 和 extend 接受以服务本身为参数的过程。这为用户在定义规则时提供了极大的自由度和控制力。</p>
<p>最后，让我们以 user-account-service-type 作为收尾示例。</p>
<p>在用户账户的情况下，我们希望：</p>
<p>重新把视角放回到整体架构上，我们可以看到服务都是层层构建的。一个服务在安装时，会修改其 extensions 字段中列出的服务。而这些被修改的服务反过来又会修改它们自己扩展的服务类型。</p>
<p>这种“链式反应”将一直持续，直到所有服务都被汇总到 system-service-type（所有服务的根）中。在底层，我们最终会将所有服务收集到一个庞大的单一结构中。我认为，当 Guix 配置系统时，正是对这一服务集合体进行处理。</p>
<p>好了，现在我们了解了 account-service-type：</p>
<p>因此，无论是通过跟着我进行“深入探究”，还是阅读文档，抑或在代码库中查找示例，我们都发现我们的用户组和用户分别被定义为  和 。</p>
<p>这两个 record 分别可以在 accounts.scm 的第 71 行和第 90 行找到。</p>
<p>我们像这样定义我们的账户：</p>
<p>现在我们可以将它们添加到 account-service-type 扩展中。</p>
<p>extensions 过程接受一个  列表。service-extension 是一个接受两个参数的 record。</p>
<p>第一个参数是目标服务类型的名称。在我们的例子中就是 account-service-type。service-extension 的第二个参数是一个过程，该过程接受服务本身（当前的 caddy 服务）并返回一个对象列表以扩展目标服务（参见文档）。</p>
<p>第二个参数看似复杂，但它其实只是一个为扩展返回“值”的过程（procedure）。在我们的场景中，它返回的是一个用户和用户组账户的列表。你可以想象，利用这个第二个参数，如果我们希望让服务支持可配置，就可以根据我们的 caddy-service-type 的值来动态创建用户。这就是可配置服务的组织方式。</p>
<p>让我们为 account-service-type 定义 service-extension，并将其添加到 extension 字段中。</p>
<p>这里我们使用了 const，它是 (lambda(_)(%caddy-accounts)) 的语法糖。</p>
<p>好了，终于到了测试的时候了！</p>
<p>运行 sudo guix system reconfigure config.scm 来应用我们的更改。</p>
<p>让我们通过运行 sudo id caddy 来检查 caddy 用户的存在。</p>
<p>太棒了！我们的 caddy 用户和用户组已经成功创建！</p>
<p>到目前为止我们所学到的内容：</p>
<p>现在让我们来看看如何将配置——即 Caddy 文件——写入到 /etc/caddy 中。</p>
<p>为了保持简单，caddy-service-type 将是静态的。我们将手动编写 Caddyfile 并将其提供给我们的 Caddy 服务。我们不会负责生成 Caddyfile²。</p>
<p>Caddy 服务只需负责将其复制到正确的位置即可。</p>
<p>Caddyfile 的目标路径是 /etc/caddy/caddy.conf。</p>
<p>与之前一样，我们将利用扩展来实现这一点。要在服务启用时执行任意过程，我们可以使用 activation-service-type。</p>
<p>请注意，其实有一个专门执行此任务的服务，即 etc-service-type。不过我认为出于教学目的，使用更通用的 activation-service-type 是更好的选择。它是一个被广泛使用的服务；Guix 仓库中的许多服务都依赖于它。</p>
<p>激活服务（activation service）是在我们的服务激活时执行的服务。</p>
<p>颇为有趣的是，除了在这个示例中，我在文档中几乎找不到关于它的太多信息。让我们直接看看源代码。</p>
<p>在 services.scm:792 中我们能获得更多信息：</p>
<p>我们也可以查看它的定义 services.scm:776</p>
<p>好的，我们看到（从注释和 lambda gexps-&gt;activation-gexp 中）服务所需的值是一个 G-表达式（G-Expression 或 gexp）。</p>
<p>什么是 gexp？gexp，或者 g-exp，即 G-expression³，是 Guix 中一种用于暂存代码以便稍后在构建环境中执行的机制。</p>
<p>如果你已经知道什么是 G-表达式，可以跳过下一节。如果不知道，让我们简要介绍一下 G-表达式的概念⁴。</p>
<p>我不会对 G-exp 的概念做过于深入的探讨；它涉及的内容很多，值得单独写一篇文章。我们将保持高层次的概览。</p>
<p>要理解什么是 G-表达式，你需要知道 Guix 运行在两个环境中。</p>
<p>在构建软件包时，guix daemon 会创建类似于容器的东西。它们并不完全等同于容器，但这个概念对于我们的理解来说已经足够接近了。</p>
<p>为了确保可重现性，每个软件包都在各自独立的“容器”中构建，其中仅包含所需的输入。为了实现这一点，软件包定义中的部分代码需要暂存起来，以便稍后在那个“容器”内部执行。G-表达式就是我们在构建时暂存待执行代码的方式。</p>
<p>Guix 的这两个环境通常被称为：</p>
<p>G-表达式使用 #~ 宏来表示，例如 #~( ;; 这是一个 g-expression ;; )。每当你看到宏 #~ 时，就意味着括号内的代码将稍后在构建“容器”内执行。</p>
<p>在 G-exp 内部，我们可以使用 #$ 宏（即 ungexp）来对某些表达式求值。</p>
<p>例如，让我们看一下这个 G-表达式：</p>
<p>在这种情况下，当代码被求值时，#$output 将被替换（或 ungexp 解引用），表达式将变为：</p>
<p>在概念上，它类似于 Scheme 中的准引用（quasi-quote）和逗号（comma）。</p>
<p>由于 G-表达式是在不同的环境中求值的，它不会自动拥有对当前环境中导入的模块的访问权限。为了让 G-表达式能够访问模块，我们需要将它们导入到 G-表达式将在其中求值的“构建”环境中。</p>
<p>为此，我们像这样使用 with-imported-modules 语法：</p>
<p>在上面的例子中，mkdir-p 是来自 guix/build/utils.scm 的过程。T</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-14 07:24 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://aloysberger.com/posts/writing-a-guix-service-from-scratch-as-a-beginner.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::