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
<div id="story--rickroll-pharmacy-cross-44e79e08c19cb047" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1626" data-content-paragraphs="27" data-published-at="2026-09-28T07:52:23.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 15:52</span>
</div>

### [用药房绿十字霓虹灯牌进行“瑞克摇”（Rickroll）](https://hugoarnal.com/blog/rickroll-pharmacy-cross/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Rickrolling with a Pharmacy cross</div>

<div class="article-body" data-article-body="true"><p>目前我正在寻找一份为期4个月的全职实习。如果您想了解更多信息，请点击下方按钮。</p>
<p>如果你曾经去过法国，你可能见过这种固定在建筑物上的绿色十字架，闪烁着明亮的色彩。这是一种通常用来指示附近有药房的标志（不同国家的标志可能有所不同）。在现阶段，它已经成为了一种国家象征。</p>
<p>药房十字灯牌对某些公司而言是一门实实在在的生意，他们制造（或转售）十字灯牌并开发自己的控制软件。然而，花无百日红，药房也是如此！人们会退休、停业转行等等。问题是：这些十字灯牌最终会流向何处？</p>
<p>根据品牌不同，大多数灯牌的价格从200欧元到2000欧元不等，因此这些十字灯牌最终流入二手电商市场（如ebay、leboncoin等）并不罕见。</p>
<p>大约两年前，法国YouTube博主Sylvqin制作的一期制作精良且极受欢迎的视频引发了人们对这些十字灯牌的极大兴趣。在该视频中，他解释了这些十字架背后的历史，并亲自买了一个进行逆向工程。</p>
<p>2026年初，我学校的几位学长也决定挑战一下自己。于是他们买来一个并完全对其进行了逆向工程，这耗费了他们数周的时间。成功之后，他们组织了一场黑客马拉松，让大家都能用这个十字灯牌玩起来！</p>
<p>遗憾的是，我没有参与逆向工程的过程，因此我无法对该十字灯牌的具体工作原理做出评论。如果有人写了相关的文章，请告诉我，我会在此附上链接！</p>
<p>他们为我们提供了一个名为 Lib_Croix 的 C++ 库，以便直接与其进行交互。它极大地简化了向十字灯牌读取和写入数据的操作。</p>
<p>当时出现了一些参赛作品，例如：</p>
<p>以及我和我的朋友小组提交的作品：一个“视频”播放器。</p>
<p>正如你可能知道的，视频本质上就是一组拼凑在一起的图像集合。因此首先，为了播放视频，我们需要尝试先显示单张图像。</p>
<p>警告：以下代码是在不到24小时内赶出来的，这意味着代码质量很一般。如果我有更多的时间（和更多的精力），我可能会采取截然不同的实现方式。</p>
<p>我们需要获取关于我们本地十字灯牌的一些参数信息，让我们先获取这些：</p>
<p>为了简单起见，我们将图像尺寸从 X×Y 转换为 24×24 并将其转为单色。当然，我们打算使用 imagemagick 来完成这件事：</p>
<p>这已经相当简单了，但由于我不太想费心在 C++ 里处理图像，所以我们让它变得更简单一点。我写了一个 Python 脚本（使用 Pillow 库）来提取图像上的所有像素，然后生成一个文本文件，其中白像素用 x 表示，黑像素用 . 表示：</p>
<p>写给未来的备忘录：你其实完全可以直接使用 PPM 格式，而不必折腾这么多。</p>
<p>最后但同样重要的是，C++ 的 displayImage 函数（针对示例进行了简化）：</p>
<p>太棒了！我们在十字灯牌上成功显示了一张图片！（忘记拍照了，但当时展示的是我们 GitHub 组织的徽标，即 sudo sandwich 徽标的二次创作版）</p>
<p>现在，让我们来尝试播放视频。</p>
<p>好的，视频 == 大量图像，但我们该如何提取出大量的图像呢？幸运的是，一款支撑着互联网大半壁江山的小软件可以帮我们实现这一点（FFmpeg）。</p>
<p>让我们为此编写一个简短的 bash 脚本：</p>
<p>它会创建一个 output 文件夹，我们所有的 .converted 单色文件都存放在那里。然后，我们修改后加入了循环处理逻辑的 Python 脚本会将这些文件转换为 .pharma 文件。</p>
<p>接下来是用于我们的 C++ 文件集合的文件排序处理机制：</p>
<p>最终的效果非常值得 :)</p>
<p>如果你有机会来到 Epitech Lyon，欢迎顺道来看看这个十字灯牌，因为它现在已经作为永久展品摆放在 Hub 中，上面正显示着“HUB LYON X EPITECH”。</p>
<p>点击此处查看代码的最终版本（警告：代码写得非常粗糙糙）</p>
<p>我强烈推荐关注 Sylvqin 的频道（主要是法语，可能配有法语或英文字幕），我在撰写本文的历史背景部分时从他的视频中汲取了大量灵感。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>来源叙事重点：将药房十字灯从商业设备和法国常见公共符号，叙述为可被二次利用的技术对象。文章重点展示学生团队如何通过逆向工程、C++库、Python、ImageMagick和FFmpeg，把图像及视频转换为单色像素数据并显示在十字灯上，最终将设备作为Epitech Lyon的永久展示物。整体叙事偏向项目展示、技术实践和轻松的创客文化；标题所暗示的“Rickrolling”在正文提供的内容中未得到具体展开。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://hugoarnal.com/blog/rickroll-pharmacy-cross/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-d-dying-end-of-life-care-7e2541f65ebf3504" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="370" data-content-paragraphs="5" data-published-at="2026-09-28T05:00:25.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 13:00</span>
</div>

### [议员们，你们曾明确表示英国的临终关怀体系已陷入崩溃。现在我们需要你们着手修复它 | 简·特纳](https://www.theguardian.com/commentisfree/2026/sep/28/mps-palliative-care-assisted-dying-end-of-life-care)
<div class="original-title-sub"><span class="orig-tag">原文</span> MPs, you told us clearly that end-of-life care in the UK is broken. So now we need you to fix it | Jane Turner</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/69566eadd87f4ac1f2ba86210979648520615388/0_0_5000_4000/master/5000.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=e7c666ec2a5a4fbf924d8f835111c250" alt="议员们，你们曾明确表示英国的临终关怀体系已陷入崩溃。现在我们需要你们着手修复它 | 简·特纳" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>在关于协助死亡的辩论中，大多数政界人士在一件事上达成了共识——姑息治疗改革迫在眉睫。患者以及我们这些照料他们的人正在等待着改变。</p>
<p>简·特纳（Jane Turner）是姑息关怀慈善机构休·莱德（Sue Ryder）的首席护士。</p>
<p>英国政府目前正在工党年会上讨论该国面临的最大挑战。但在各种演讲、公告和新闻头条的喧嚣之中，它不应忘记两周前议会传出的最明确的信息之一——我们的姑息治疗体系对太多人而言并未发挥应有的作用。</p>
<p>在整场协助死亡的辩论中，那些在核心议题上存在严重分歧的议员们，往往在一点上达成了共识——我们的姑息治疗体系亟待修复。一些人谈到了自己的亲身经历，他们目睹亲属在痛苦中被迫等待数小时，或是因为得不到适当的支持，不得不前往医院而无法留在自己家中安享晚年。</p>
<p>简·特纳是姑息关怀慈善机构休·莱德（Sue Ryder）的首席护士。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-28 13:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/commentisfree/2026/sep/28/mps-palliative-care-assisted-dying-end-of-life-care" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-26-09-27-fools-expertise-8ed13bac2da49860" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1795" data-content-paragraphs="10" data-published-at="2026-09-28T03:50:52.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 11:50</span>
</div>

### [愚人之专](https://bcantrill.dtrace.org/2026/09/27/fools-expertise/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Fool&#39;s Expertise</div>

<div class="article-body" data-article-body="true"><p>我听了最近埃兹拉·克莱因（Ezra Klein）对英伟达首席执行官黄仁勋（Jensen Huang）的访谈，这次访谈在某种程度上像是针对“AI末日论”的一场罗夏墨迹测验：如果你倾向于看到毁灭，黄仁勋听上去就像是不屑一顾；但如果你（像我一样）并不担心人类的未来会断送在一个（比喻意义上的！）计算机程序手中，黄仁勋的回应就显得非常通情达理。（除了个别例外：这家伙真不知道自己的邮政编码吗？！）</p>
<p>但我也认为其中错失了一个良机。虽然黄仁勋正确地指出，现有的监管（例如产品责任法）完全可以用于对前沿实验室因其产品所造成的损害进行追责（前美国联邦贸易委员会主席莉娜·汗[Lina Khan]曾对这一点作过更详尽的阐述），但他对克莱因的质疑还不够有力。</p>
<p>具体而言，克莱因反复诉诸于AI专业知识所赋予的权威；黄仁勋怎么能反对像杰弗里·辛顿（Geoffrey Hinton）这样的先驱呢？虽然黄仁勋（正确地）指出辛顿在预测中曾犯过错误（例如他广为人知且错得离谱的2016年预测——放射科将在2021年不复存在），但他错失了解释辛顿为什么会错的良机：这不仅仅是因为辛顿看不清未来（或未来的某些方面），而是因为辛顿做出的论断远远超出了他的专业领域范畴。</p>
<p>以关于放射科医生的预测为例（该预测碰巧发生得足够早，现在已经无可争议地被证明是错误的），我们可以公允地说辛顿之所以错了，是因为他的预测没有反映放射科医生的实际工作：如果辛顿当初愿意花点心思去了解一番，而不是发出耸人听闻的告诫（辛顿在2016年曾明确表示不应再培训放射科医生！），他就会明白临床从业人员所做的事情远不止解读医学诊断影像！让图像解读变得更快或更好并不能取代放射科医生——恰恰相反，这能让放射科医生更好地运用自己的专业知识来服务患者！</p>
<p>这种“愚人之专”（Fool&#39;s Expertise）的模式在AI末日论者中一再上演：他们在某一种系统（如大语言模型）中的经验，赋予了他们在另一个领域中毫无依据的权威——而这种权威在很大程度上没有受到像克莱因这样不区分不同类型专业知识的人的检验。</p>
<p>在讨论灾难时，“愚人之专”尤其危险，因为灾难几乎必然涉及跨越多个领域的漫长因果链：完全理解其中一个环节，并不意味着理解了整条链条。（这就是为什么当美国国家运输安全委员会[NTSB]调查事故时，其特派调查小组[Go Team]由许多不同领域的专家组成：他们深知一场灾难性事故可能涉及多个不同领域的故障，这些故障相互交织并连锁反应成更广泛的系统瘫痪。）</p>
<p>明确地说：既然AI引发的末日依赖于通往现实世界的路径，那就必须咨询这些路径上的相关专家。AI是一种网络安全威胁吗？请去咨询网络安全专家——他们会迅速指出，闹得沸沸扬扬的OpenAI“越狱逃逸”事件只是因为一种司空见惯的隔离防护失效。我们是在担心AI会以某种方式制造出新型病原体吗？请去咨询病毒合成领域的专家——听听他们为什么认为这种恐惧是放错了地方。或者我们是在担心AI会掌控核武器？好消息是：与全球热核战争威胁共存了七十年的历程，不仅为我们带来了广泛的安全防范机制，还积累了庞大的专业知识储备以供借鉴！</p>
<p>这并不是说物理世界中的风险为零，而是说当人们顺着其设想的路径去探究时，这些风险要分散且微弱得多。如果想要严肃、客观地审视这些风险，可以参考兰德公司（RAND）由迈克尔·维米尔（Michael Vermeer）、艾米莉·拉斯罗普（Emily Lathrop）和阿尔文·穆恩（Alvin Moon）撰写的报告《论人工智能带来的灭绝风险》（On the Extinction Risk from Artificial Intelligence）。他们通过咨询相关领域的专家来梳理这些路径——并刻意避免与AI专家打交道，他们写道（强调为作者所加）：</p>
<p>“在我们的研究过程中，我们还访谈了11位兰德公司的专家：两位风险分析与不确定性决策领域的专家、两位核武器专家、六位生物技术专家和一位气候变化专家。我们刻意没有邀请AI专家参与，因为我们选择尽可能避免对AI能力未来的演进做出预测。相反，我们关注的是AI在我们的每种情景中若要达成特定结果需要具备哪些能力。”</p>
<p>鉴于兰德公司的历史，其本领域专业专家所做的冷静分析，理应比前沿实验室发出的末日预言拥有大得多的分量；愿他们的分析能为我们注入抵抗恐惧蔓延的疫苗！</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-28 11:50 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://bcantrill.dtrace.org/2026/09/27/fools-expertise/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--202609-expert-asterisks-a52637aa7b872f1e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1271" data-content-paragraphs="18" data-published-at="2026-09-28T03:48:21.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 11:48</span>
</div>

### [专家星号](https://nedbatchelder.com/blog/202609/expert_asterisks)
<div class="original-title-sub"><span class="orig-tag">原文</span> Expert asterisks</div>

<div class="article-body" data-article-body="true"><p>2026年9月27日，星期日</p>
<p>观察网上发生的讨论时，我经常看到一种令人遗憾的习惯，我把它称为“专家星号”。一个初学者正在寻求帮助，专家们也在回答。然后，出于完整性的考虑，某位专家会补充一个远超学习者能力或需求范围的事实或细节。</p>
<p>举个例子，下面是一段关于 git 的交流：一名新学习者在努力理清 git 的基本概念。他问分支与目录有什么关系，以及如何撤销更改。他知道 git init，但不知道它与切换项目之间有什么关系。</p>
<p>新手：所以每次切换项目时，我只要对项目执行“git init”就行了？</p>
<p>专家1：“git init”用于创建新项目。</p>
<p>专家2：通常，切换项目时，你会切换工作目录。</p>
<p>到这里都没问题，但接着出现了：</p>
<p>专家2：或者，你也可以用 -C 开关指定 git 仓库目录，不过这样需要输入更多内容，所以除非有非常充分的理由，否则几乎没人这么做。</p>
<p>什么？既然明确指出没人这么做，为什么还要提它？这个新手才刚刚勉强理解 git 的基本工作方式。为什么要引入那些“几乎没人”使用的晦涩命令行选项？</p>
<p>我之所以称之为“星号”，是因为它感觉像一条只有专家、学者或追求面面俱到的人才需要知道的深奥脚注。</p>
<p>专家是想帮忙。他们把所有选项都摆出来，乐观地希望新手能够从中挑选适合自己的方案。</p>
<p>更糟的是，有时多位专家会各自提供自己的“星号”，可怜的新手会被每一个细节吸引、分散注意力。新学习者没有能力筛选哪些细节可能对自己重要。他们最初的问题就在不断扩散的旁支话题中迷失了。</p>
<p>帮助新学习者很难：我们无法知道他们的知识空缺在哪里。哪些误解需要纠正？很多时候，我们只能对他们的背景和处境略知一二。专家有时会忽略自己用词上的细微错误，只按字面理解，而看不到正是这些误解把学习者引向了错误的方向。</p>
<p>注意上面的交流：“切换项目”可能是指在已有项目之间切换，也可能是指开始一个新项目。我们并不确定对方指的是哪一种。专家会在多个正在进行的项目之间来回切换，但初学者通常会一直处理一个项目，直到完成，然后再切换到新项目，此后不会回到之前的项目。也许“每次切换项目时我都执行 git init”对这个新手的具体情况来说确实是正确的。</p>
<p>关于 -C 的评论并没有让这次交流偏离轨道，但发表这条评论所花费的精力本可以用来澄清新手的需求。</p>
<p>我理解专家为什么会在帮助交流中加入这些“星号”：即使某个细节对这个初学者没有用，它对其他人可能有用，而专家们也确实会对所有错综复杂的细节感兴趣，甚至着迷。这些讨论场所并不只是专门为帮助新手而设。它们也是许多人进行一般性讨论的地方。没人规定不能谈论高级或罕见的选项。</p>
<p>而且，我们很难知道什么会有用，也很难知道新手真正想表达什么，或者什么内容会引起他们的共鸣、帮助他们找到解决方案。这一切都很困难。</p>
<p>但你至少应该意识到自己正在对谁讲话，以及自己是否真的在帮助对方。如果你想帮助初学者，就尽量克制住加入那些少有人走的旁支话题的冲动。专注于眼前的问题，努力理解新手所处的情况和心态。使用他们的语言，这样他们才能听懂你。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-28 11:48 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://nedbatchelder.com/blog/202609/expert_asterisks" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-rechargeable-bike-lights-f86fb9777ea6f762" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1441" data-content-paragraphs="25" data-published-at="2026-09-28T03:27:24.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 11:27</span>
</div>

### [更换可充电自行车灯中的旧电池](https://jvns.ca/blog/2026/09/27/replacing-the-old-battery-on-rechargeable-bike-lights/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Replacing the old battery on rechargeable bike lights</div>

<div class="article-body" data-article-body="true"><p>你好！最近我需要给自行车配车灯。我想起来，自己十年前就买过可充电自行车灯，只是已经很久没用过了。我试着给它们充电，但充满电后，它们只能工作大约5分钟，就又关掉了。</p>
<p>我不太懂电子技术，但一直很好奇旧电子设备是否有可能修好；而这看起来是个很理想的维修项目，因为我可能只需要更换电池。</p>
<p>于是，我去了本地一家我所属的酷儿创客空间，借用电烙铁，试着动手修理！我不太懂电子技术，本文也不包含任何安全建议，因为我对安全方面也不太了解。我觉得，在能够获得帮助的社区空间里做项目是一件很好的事。</p>
<p>这盏自行车灯摸起来像是由硅胶制成的，所以我沿着一条隐约看起来像接缝的地方，以一种很随意的方式把硅胶割开了。</p>
<p>在这个过程中，我确实撕裂了一些硅胶，现场也弄得相当凌乱，但我还是把它打开了，并找到了电路板。</p>
<p>我不知道这款自行车灯的型号，不过文章末尾有一张它的照片。</p>
<p>有一些螺丝把各个部件固定在一起，所以我把螺丝拆下来，以便取出电路板。</p>
<p>我基本上尽量少拆螺丝，因为担心把螺丝弄丢，或者之后无法装回去。我可能把螺丝放进了一个袋子之类的东西里。</p>
<p>我取出了电路板。它看起来是这样的：</p>
<p>你可以看到电池连接的位置，我觉得是在 RI3 的左侧、Q2 的上方。</p>
<p>电池看起来是这样的：</p>
<p>我以前从没给任何东西拆过焊，所以找到了 iFixit 的拆焊指南并读了一遍。我还向朋友 Lee 和 Lauria 征求了建议。</p>
<p>根据那份指南和我得到的建议，我最后按照以下步骤操作：</p>
<p>在第3步的电池照片中，你可以看到上面似乎写着“3”和“LI???77”之类的字样。电池顶部有一块金属片，我觉得它可能是焊接上去的，或者采用了类似的固定方式。看起来不可能、也可能不太适合尝试把它拆下来，所以我不知道该如何确认“LI????77”究竟是什么，也不知道该如何订购一个替代品。</p>
<p>我一直在尽量避免使用大型语言模型（不过这里就不展开说了，因为我已经对围绕大型语言模型的讨论感到疲惫，而且我相信你也一样），但我实在不知道该如何判断这是什么电池，所以就去问了一个大型语言模型。它给出的回答是“LIR2477”；我查了一下，发现它看起来和我的电池完全一样，于是觉得这个答案应该是合理的。</p>
<p>不过，我很想了解不使用大型语言模型来确定这一点的方法。肯定存在某种办法。Lauria 教我如何使用 DigiKey 的搜索功能，这很有意思，不过 DigiKey 没有这个部件。</p>
<p>我去了 AliExpress，下单购买了：</p>
<p>我记得电池每个大约3美元，胶水是8美元。</p>
<p>这些零件花了大约两周才到货；到货后，我又回到创客空间，然后：</p>
<p>之后，我等了一段时间让胶水变干，再把它带回家，又等了24小时让胶水固化。</p>
<p>另外，我把旧电池送到了附近一家接收废旧电池的地方。</p>
<p>车灯能用了！我已经用它们在晚上骑过车了！我还没需要给它们重新充电（而且很不幸，我不得不订购一根新的 Mini USB 线，因为我把所有 Mini USB 线都处理掉了，所以现在还在等线寄到），因此我还不能确定新电池的续航时间究竟会有多长。</p>
<p>这是重新粘合后车灯的样子。你可以看出，我粘得并不仔细。它没有很好地恢复原状，但我希望这样已经足够了。</p>
<p>我觉得自己只凭极少的电子技术技能就完成了这件事，真的很酷！购买零件花了大约20加元；无论这次维修能否长期保持（我会尽量在未来更新这篇文章！），尝试修理一样东西并学到新知识都很有趣。</p>
<p>关于 Django，我最近还喜欢上了其他一些事情。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-28 11:27 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://jvns.ca/blog/2026/09/27/replacing-the-old-battery-on-rechargeable-bike-lights/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-04-bevy-ios-crates-objc2-cb672a40efd1b732" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2244" data-content-paragraphs="26" data-published-at="2026-09-27T23:22:45.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 07:22</span>
</div>

### [彻底移除我们的 Bevy iOS crate 中的 Swift](https://rustunit.com/blog/2026/09-04-bevy-ios-crates-objc2/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Dropping Swift entirely from our Bevy iOS crates</div>

<div class="article-body" data-article-body="true"><p>在这篇短文中，我们将介绍如何移除了 bevy_ios_* 这些 crate 中的 Swift 包。</p>
<p>过去，我们发布其中大多数 crate 时采用配套方式：在 crates.io 上提供一个 Rust crate，同时提供一个 Swift package，用户需要通过 SPM 将后者添加到自己的 Xcode 项目中。在过去几周里，我们重新发布了这些 crate，这次不再包含后半部分。</p>
<p>现在安装它们只需要执行 cargo add。</p>
<p>语言障碍本身并没有消失；我们在每次调用时仍然要跨越这道障碍。变化在于，我们不再需要自行构建并发布这个跨越层。</p>
<p>平台侧代码位于那个 package 中，以 Swift 或 Objective-C 编写，而 Rust 只能通过 C 符号访问其中内容。因此，每个 crate 都带有各自手写的桥接层，几年下来，我们最终有了四种不同的桥接方式：</p>
<p>它们都有相同的缺点：</p>
<p>现在，这些部分全部由 objc2 及其生成的框架绑定取代：objc2-ui-kit、objc2-user-notifications、objc2-game-kit 和 objc2-store-kit。苹果的框架本来就是 Objective-C，而与 Swift 不同，Objective-C 具有动态运行时，可以通过通用方式进行绑定：选择子（selectors）、类型编码（type encodings）以及 objc_msgSend。这正是 objc2 在底层为我们完成的工作：针对每个框架完成一次。现在，桥接层变成了一项依赖，而不再是我们需要额外发布的第二个东西。</p>
<p>objc2 的维护者 Mads Marquart 曾在我们的第 13 期 Bevy Meetup 上就这一主题进行演讲：《Bevy on iOS - in pure Rust》。非常值得一看。</p>
<p>我们现有的 bevy_ios_app_delegate crate 本来就是以这种方式构建的。我们之前关于 iOS 深度链接的文章对此有详细介绍。</p>
<p>先来看最小的 crate。bevy_ios_safearea 过去由四个类似下面这样的 Swift 函数组成：</p>
<p>此外，Rust 一侧还需要对应的 extern &quot;C&quot; 声明、一个 Package.swift 文件，以及在项目中执行 SPM 步骤。如今只需要这样：</p>
<p>到目前为止，这只是 Rust 调用平台代码。另一方向的调用，才是 protobuf 和 swift-bridge 等机制存在的主要原因。</p>
<p>借助 objc2，我们可以在 Rust 中定义一个 Objective-C 类，并将其作为代理交给 UIKit：</p>
<p>上面的代理会发送 Event 并调用完成处理程序。send_event 是我们在 bevy_channel_message 之上编写的一个小辅助函数，它会获取插件在构建时设置的发送端。因此，我们的 Event 最终仍会像以前一样进入 Bevy。</p>
<p>总的来说，我们从 bevy_ios_notifications 中删除了 2809 行代码，其中 1615 行来自一个生成的 Data.pb.swift 文件。bevy_ios_gamecenter 更是减少了 4430 行代码！</p>
<p>还记得深度链接文章中提到的推送通知令牌吗？现在这部分也完成了。</p>
<p>这些令牌只会传递给 UIApplicationDelegate，因此，我们不再从 Swift 侧进行方法调配（swizzling），而是将这两个回调添加到应用已有的代理中；如果应用没有代理，就安装我们自己的代理。如果 bevy_ios_app_delegate 已经设置了一个代理，我们就挂接到那个代理上。</p>
<p>你不再需要添加 SPM package，不再需要手动链接 GameKit 或 StoreKit，也不再需要在 README 中放截图。现在只需正确维护一个版本，而不是两个版本。</p>
<p>此外，bevy_ios_gamecenter 和 bevy_ios_iap 又可以为模拟器构建了。</p>
<p>bevy_ios_iap 是唯一的例外。StoreKit 2 仅支持 Swift；objc2 没有可供绑定的 Objective-C 运行时，因此我们只能重新自行编写桥接层。</p>
<p>因此，这个 crate 仍然保留了一个小型 Swift 垫片。不过现在这个垫片位于 crate 内部：build.rs 使用 swiftc 对其进行编译，并将其静态链接进去。</p>
<p>两侧通过手写的、承载 JSON 的 C ABI 进行通信。</p>
<p>这并不漂亮，但你仍然只需执行 cargo add bevy_ios_iap——不需要 SPM package，也不需要发布 .xcframework。这个版本目前位于 main 分支，尚未发布。</p>
<p>我们没有对公共 API 做太大改动；bevy_ios_notifications 在这方面是个例外，因此请查看它的变更日志。如果你正在使用这些 crate 中的任何一个，请从 Xcode 项目中删除 SPM 依赖，并升级 Rust 依赖的版本。</p>
<p>感谢 objc2 crate 让这一切成为可能。现在，向你的 Bevy 游戏添加 iOS crate 只需要执行 cargo add！</p>
<p>需要有人协助构建你的 Bevy 或 Rust 项目吗？我们的专家团队可以为你提供支持！欢迎联系我们。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-28 07:22 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://rustunit.com/blog/2026/09-04-bevy-ios-crates-objc2/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-e-your-go-code-to-github-a3f87b429b1324d9" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1022" data-content-paragraphs="7" data-published-at="2026-09-27T20:17:42.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-28 04:17</span>
</div>

### [切勿将你的 Go 代码与 GitHub 强绑定](https://iain.rocks/blog/dont-couple-your-go-code-to-github)
<div class="original-title-sub"><span class="orig-tag">原文</span> Don&#39;t couple your Go code to GitHub</div>

<div class="article-body" data-article-body="true"><p>首页 博客 分类</p>
<p>Go 语言的优秀特性之一，在于你可以直接用代码的拉取地址来作为代码的命名空间。这意味着，如果你将 Go 代码托管在 http://github.com/thetrueares/boneclone，你就可以写下 import &quot;github.com/thetrueares/boneclone&quot; 这一行，Go 就会通过 git 来拉取它。这使得开发者极其容易获知该去哪里给开源库提 issue 报 bug，并且在没有中心化包管理系统的情况下，能够非常轻松地拉取和分发 Go 语言库。对许多人来说，这个路径在字面意义上就是 git 托管地址，但这存在一些弊端，你应该使用自己的自定义域名，下面我将解释其中的原因。</p>
<p>直接使用 git 托管地址的主要问题在于，你的代码现在与某一家代码托管服务商绑定在了一起。也就是说，如果你把 git 托管平台迁移到 GitLab，你就必须修改你的代码！否则，你拉取的将始终是旧版本。这可能导致你无法更换 git 托管服务商，因为迁移的开销实在太大了。结果就是，你的代码被实质性地绑定在了 GitHub 上。这听起来非常荒唐，但在 Go 社区中，这几乎成了事实上的默认做法。</p>
<p>我曾见过这个问题在一家公司演变成巨大的麻烦：他们同时在使用 GitLab、GitHub 和 Azure DevOps，因为变更代码存放位置对他们来说是一项极其庞大的工程，而且他们“没有时间”，以至于同时在这三个平台上运行维护反而变得更省事。这也正是我开发 Boneclone 的原因——用来同时在多个 git 托管平台之间处理骨架代码的同步复制。因此，这个问题确实让公司蒙受了金钱损失，因为他们不得不同时为三项托管服务付费。</p>
<p>解决方案是使用自定义域名，比如 go.iain.rocks、go.uber.org、go.mongodb.org 等。这样一来，你只需修改这些域名所指向的目标即可。例如，go.iain.rocks/boneclone 指向 github.com/thetrueares/boneclone，如果我日后迁移到了 GitLab，对于最终用户而言不会发生任何改变，安装命令依然完全相同。</p>
<p>在我看来，每一个使用 Go 的商业软件开发团队，都应该使用自定义域名来为他们的内部库和软件包设置命名空间。因为这是避免任何无意义耦合的简便方式。</p>
<p>以下是我的配置副本，方便你也能在自己的项目中完成相应设置。</p></div>

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

::::