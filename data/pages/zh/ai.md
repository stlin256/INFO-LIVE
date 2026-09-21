---
title: "AI与前沿科技"
nav: true
order: 1
description: "全球人工智能、大模型计算、开源生态与顶会论文一手深度情报"
notice:
  text: "🚀 聚焦前沿大模型范式、智能体架构、计算硬件与开源顶会论文 · 实时深度编译" 
  color: "theme"
---

# 🧠 人工智能与前沿技术情报矩阵

全天候追踪 OpenAI, Google DeepMind, Hugging Face, Hacker News, TechCrunch 等前沿机构的一手技术发布、模型演进与开源生态。

## 📰 前沿核心要闻全景深度编译

::::grid{cols=2}
:::cell
<div id="story-bytedtsinghua-sia-dapo-966ba72f961355d2" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1369" data-content-paragraphs="21" data-published-at="2026-09-20T23:19:04.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/hackernews.svg" class="source-icon" alt="Hacker News (科技前沿论坛)" width="16" height="16" /> <strong>Hacker News (科技前沿论坛)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 07:19</span>
</div>

### [DAPO：来自字节跳动Seed与清华大学AIR的开源强化学习系统](https://github.com/BytedTsinghua-SIA/DAPO)
<div class="original-title-sub"><span class="orig-tag">原文</span> DAPO: An Open-source RL System from ByteDance Seed and Tsinghua AIR</div>

<div class="article-body" data-article-body="true"><p>我们发布了一个完全开源的大规模大语言模型（LLM）强化学习（RL）系统，涵盖算法、代码基础设施以及数据集。该系统实现了最先进的大规模 LLM 强化学习性能。我们提出了“解耦截断与动态采样策略优化”（Decoupled Clip and Dynamic sAmpling Policy Optimization，简称 DAPO）算法。通过开源，我们为更广泛的研究界与社会提供了获取可扩展强化学习的切实途径，让所有人都能从这些进展中受益。我们的系统基于优秀的 verl 框架构建。感谢他们的出色工作！</p>
<p>🤗 如果您对我们的论文有任何疑问，欢迎提交 Issue，我们可以在那里进行讨论。谢谢！</p>
<p>🚀 基于 Qwen2.5-32B 基础模型，DAPO 在 AIME 2024 上取得了 50 分的成绩，仅用 50% 的训练步数就超越了先前的 SoTA 模型 DeepSeek-R1-Zero-Qwen-32B。</p>
<p>长度稳定性与增长：响应长度的平稳增加带来了更大程度的探索，有助于模型学习更复杂的推理行为，最终促进了训练稳定性和性能提升。</p>
<p>奖励得分稳定性：奖励信号的平稳上升表明模型正在成功拟合训练分布，确保学习过程在没有显著波动的情况下保持稳健与一致。</p>
<p>熵与平均概率趋势：在最初下降后，熵的可控上升确保了探索与利用之间的良好平衡，避免了过拟合或过度随机等问题，并促进了模型性能的持续提升。</p>
<p>我们提供了 DAPO-Qwen-32B 的模型权重，该模型基于 Qwen2.5-32B 并采用 DAPO 算法训练而成。</p>
<p>我们建议使用 conda 来配置环境：</p>
<p>我们在此处提供模型推理代码：</p>
<p>为了在 AIME 2024 上评估该模型，我们使用 Ray Serve 和 vLLM 部署了 DAPO-Qwen-32B。</p>
<p>从 Huggingface 加载模型：</p>
<p>从本地路径加载模型：</p>
<p>为造福更广泛的研究社区，我们完全开源了我们强化学习训练的全套方案，包括算法细节、数据集和基础设施。</p>
<p>我们为 DAPO 训练提供了训练与验证数据集。</p>
<p>训练集：DAPO-Math-17k，一个经过精心策划和处理的数学数据集。验证集：AIME 2024。</p>
<p>我们提供了用于 DAPO 训练复现的开箱即用脚本。快速入门和核心代码已在 README 中说明。以下是相关脚本：</p>
<p>“DAPO 无 Token 级 PG 损失与动态采样 —— AIME 44”（DAPO w/o Token-level PG Loss &amp; Dynamic Sampling -- AIME 44）脚本已在当前的 verl 上通过验证，并在 AIME 2024 上取得了 44 分，其训练记录可在 wandb 中查看。</p>
<p>“DAPO 完整版 —— AIME 50”（DAPO Full -- AIME 50）脚本也已在最新的 verl 版本上得到验证。它在 AIME 2024 上获得了 50 分。您可以在 wandb 上查看相应的训练记录。</p>
<p>我们感谢 verl 团队提供了出色的开源强化学习基础设施。</p>
<p>我们的开源实验是在火山引擎机器学习平台上进行的。后续我们将在火山引擎平台上提供完整的复现指南，以帮助用户复现我们的实验。</p>
<p>来自字节跳动Seed与清华大学AIR的开源强化学习系统</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>ByteDance Seed 与 Tsinghua AIR 联合开源了一个大规模大语言模型强化学习系统 DAPO（Decoupled Clip and Dynamic sAmpling Policy Optimization），涵盖算法、代码基础设施与数据集。</li>
    <li>DAPO 系统基于 verl 开源强化学习框架构建。</li>
    <li>来源叙事重点：宣传全新开源的LLM大规模强化学习系统DAPO，突出其在AIME 2024基准测试上以更少训练步数超越前SOTA模型（DeepSeek-R1-Zero-Qwen-32B）的优异性能，并强调算法创新、完整开源方案（代码、权重、数据集）及火山引擎生态支持</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Hacker</span>
</div>

<div class="news-card-footer"><a href="https://github.com/BytedTsinghua-SIA/DAPO" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Hacker News (科技前沿论坛)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-d-to-the-snowden-archive-c4a0bb14aa5005b6" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7199" data-content-paragraphs="44" data-published-at="2026-09-20T22:35:49.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/hackernews.svg" class="source-icon" alt="Hacker News (科技前沿论坛)" width="16" height="16" /> <strong>Hacker News (科技前沿论坛)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 06:35</span>
</div>

### [斯诺登档案究竟经历了什么](https://libroot.org/posts/what-happened-to-the-snowden-archive)
<div class="original-title-sub"><span class="orig-tag">原文</span> What happened to the Snowden archive</div>

<div class="article-body" data-article-body="true"><p>发布于 2026 年 9 月 20 日</p>
<p>来自斯诺登档案的最后一份文件发表于 2019 年 5 月 29 日。《卫报》于 2014 年 2 月停止发布相关文件，《明镜》周刊于 2015 年 1 月停发，《纽约时报》和 ProPublica 则在 2015 年 8 月停发。此后，除了少数特例外，仅有 The Intercept 仍在发布文件，直至其在 2019 年 3 月关闭了其档案库。11 周后，即 2019 年 5 月 29 日，该机构发布了该档案库中的最后一批文件。自那时起，世界上再没有任何新闻机构、记者或机构发表过斯诺登档案中的任何一份文件。</p>
<p>斯诺登在掌握可供分享的材料数月之前，就已开始联系记者。2012 年 12 月，他联系了《卫报》专栏作家兼前律师格伦·格林沃尔德（Glenn Greenwald），要求其建立安全通信渠道，不过格林沃尔德当时并不知道该如何操作。[1] 在 1 月份的第二次尝试未能取得进展后，斯诺登将重心转向了美国纪录片导演劳拉·珀特阿斯（Laura Poitras）。随后，珀特阿斯与调查记者巴顿·格尔曼（Barton Gellman）展开合作。[1]</p>
<p>斯诺登采取逐步共享档案的方式。2013 年 3 月 31 日，他向珀特阿斯发送了一个名为 astro_noise 的加密文件链接[2]，珀特阿斯下载了该文件并拍摄了自己下载的过程，但她并没有解密该文件的密钥。[3] 5 月 10 日，斯诺登从夏威夷将一个包裹邮寄到他曾让珀特阿斯提供的一个布鲁克林地址。该包裹寄给了记者杰西卡·布鲁德（Jessica Bruder），后者同意在不知包裹内为何物的情况下代收包裹，随后她未拆封便转交给了戴尔·马哈里奇（Dale Maharidge），接着马哈里奇于 5 月 15 日将其递交给了珀特阿斯。</p>
<p>2013 年 5 月 21 日，斯诺登向珀特阿斯和格尔曼发送了一个名为 Pandora、内含约 5 万份文件的加密档案的密钥。[4][5][1]</p>
<p>在 5 月下旬的某个时候，斯诺登就他所称的“单点故障”向珀特阿斯发出警告，并敦促她将材料副本分散到其他人手中。她共分发了三份。一份交给了新闻自由基金会（Freedom of the Press Foundation）的特雷弗·蒂姆（Trevor Timm），附言要求其保管这些材料，除格林沃尔德本人当面索取外，不得提供给任何人。第二份交给了一名要求匿名的个人。第三份则交给了一个至今身份未知的人。马哈里奇自己也保留了一份，并在 2017 年表示他手中仍留有该副本。[6] 除珀特阿斯、格尔曼和格林沃尔德之外，其他持有副本的人是否真的能阅读这些文件尚不得而知，因为这些副本很可能是加密的，且他们可能没有密钥。</p>
<p>格林沃尔德于 2013 年 6 月 1 日在前往机场的途中从珀特阿斯处收到了 Pandora 的副本[1]，并在飞往香港的航班上首次阅读了该文件。[7]《卫报》记者尤恩·麦卡斯基尔（Ewen MacAskill）在香港接到了英国政府通信总部（GCHQ）的材料[1]，并将其带回了《卫报》伦敦办事处。[8]《明镜》周刊当年夏天从珀特阿斯处获得了他们的档案副本。[9]《纽约时报》和 ProPublica 则是从《卫报》获得了相关材料。[10][11]</p>
<p>格林沃尔德在 2019 年 3 月 13 日表示，他与珀特阿斯“各自独立地继续拥有档案的完整副本，其他个人和机构也是如此。”[12]</p>
<p>珀特阿斯在 2022 年表示，该档案“仍然存在，而且还有更多内容可以报道”，并形容其中有“大量尚未报道、具有重大当代和历史意义的信息”。格林沃尔德在 2023 年表示，该档案包含“数十万份文件，甚至更多”。然而，在过去七年里，两人均未从中发表过任何内容，也均未解释原因。</p>
<p>斯诺登在香港将档案的很大一部分交给了苏格兰记者尤恩·麦卡斯基尔，其中包括“数万份文件”。在纪录片《第四公民》（Citizenfour）中，记录了斯诺登在香港酒店房间内向麦卡斯基尔递交 GCHQ 材料的画面。斯诺登称这些内容来自该机构的内部维基——“属于绝密、极其机密的级别，任何在情报部门工作的人都可以在上面处理他们想处理的任何事务”——并补充道：“这就是这些材料的内容。我现在把它交给你。你可以由自己来决定，什么是恰当的，什么是不恰当的。”麦卡斯基尔将他的副本带到了《卫报》伦敦办事处。[8]《卫报》后来表示，他们的档案库包含约 58,000 份文件。</p>
<p>2013 年 6 月 6 日，《卫报》利用该档案中的一份文件发表了第一篇关于斯诺登的报道。次日，英国国防官员向所有英国主要媒体发出了机密的“D通告”（D notice），“试图审查有关英美情报机构所采用监控策略的报道”。</p>
<p>发布 D 通告的国防、新闻及广播咨询委员会（DPBAC，即当时的国防咨询通告系统 DA-Notice）是一个可追溯至 1912 年的自愿性机制，在此机制下，新闻机构在发表涉及国家安全的内容之前需咨询国防部。2013 年，该委员会的时任秘书是空军少将安德鲁·瓦兰斯（Andrew Vallance）。</p>
<p>D 通告下发给了一群本就倾向于配合的媒体机构。班戈大学（Bangor University）的维安·巴基尔（Vian Bakir）和安德鲁·麦克泰（Andrew McStay）在 2018 年回顾学术文献时指出：</p>
<p>根据巴基尔和麦克泰的研究，媒体的立场趋同度几乎一致。《每日邮报》、《镜报》、《星报》、《电讯报》、《太阳报》和《泰晤士报》都被归类为支持监控的一方。只有《独立报》、《i》报和《星期天人物报》（The People）倾向于反对立场。《卫报》和《快报》则持中立态度。他们写道，这在实践中意味着“公民的隐私权和监控监管极少被讨论，而大规模监控则通过宣称其对国家安全必不可少而走向常态化”。媒体突出的主题是“社交媒体公司应在打击恐怖主义方面采取更多举措，而监控政客虽存在问题，但对公众的监控应当加强”。</p>
<p>除了《卫报》之外发表斯诺登报道数量最多的英国媒体《每日邮报》，便是这种趋势的典型例证。在最初泄密后的六个月里，该报重点报道斯诺登“流亡途中的奢华生活及其性吸引力”。正如巴基尔和麦克泰所指出的，这些手法似乎旨在抹黑他，或转移公众对他揭露 GCHQ 内幕的注意力。</p>
<p>在受到唐宁街和内阁秘书杰里米·海伍德（Jeremy Heywood）的施压后，2013 年 7 月 20 日——即首篇斯诺登报道发表六周后——《卫报》的三名高管在地下室中砸毁了存放其伦敦档案的电脑。两名 GCHQ 技术人员现场监督了销毁过程。该报对此事予以保密[11][13]，直到一个月后的 8 月 19 日才将其公之于众。</p>
<p>时任《卫报》副主编、参与砸毁电脑的三人之一保罗·约翰逊（Paul Johnson）后来称这种销毁“纯粹是一种象征性行为”，因为政府明知“这些材料已经被带到了美国并与《纽约时报》共享。报道仍将继续。这一插曲并未改变任何事情。”</p>
<p>DPBAC委员会自身的会议纪要记录了在同一时期发生的事情。瓦兰斯（Vallance）表示，“在最开始，卫报在发表第一批披露内容之前曾避免与DA通知（DA-Notice）机制打交道”，作为报纸出版商协会的成员，它“根据DA通知守则的条款有义务寻求（但不一定必须采纳）DA通知的建议”，而未能做到这一点“曾是引起严重担忧的一个主要来源，并且为此付出了相当大的努力来予以解决”。他说，在2013年7月下旬，卫报“已经开始寻求并采纳DA通知的建议，不再发表某些高度敏感的细节”。</p>
<p>2013年12月3日，卫报时任总编辑艾伦·拉斯布里杰（Alan Rusbridger）就该报的斯诺登报道在内政事务委员会接受了公开质询。拉斯布里杰说：“就公布文件而言，我认为我们已经公布了26份。我预计我们不会公布更多了。六个月公布26份，我觉得可以说是涓涓细流。”拉斯布里杰表示，在过去的六个月里，与英美政府机构“进行了100多次接触”[14]。“我们一直与情报机构和白宫保持着联系，”拉斯布里杰在2018年写道[15]。当被问及这58,000份文件中到底读过了多少份时，拉斯布里杰回答道：“我说不上来。我不知道。”[16]</p>
<p>拉斯布里杰向内政事务委员会透露，在发表的约35篇报道中，卫报就其中除一篇外的所有报道均向当局进行了咨询。谈及瓦兰斯时他说：“事实上，此后我们一直与他合作，他也曾来到卫报与我们所有的记者交流。”拉斯布里杰在2018年补充说，瓦兰斯后来甚至被邀请参加了卫报的晨会[17]。拉斯布里杰对这种安排的描述是，瓦兰斯会在报道出炉时对其进行审阅，且极少提出反对[18]。盖尔曼（Gellman）写道，卫报“出于法律原因撤下了部分报道，并将其余一些报道推迟了数月之久”[19]。</p>
<p>三个月后，即2014年2月27日，卫报公布了其最后一批斯诺登文件。在九个月的时间里，该报在其持有的58,000份文件中大约公布了30份——占比0.05%。拉斯布里杰后来将这一事件描述为卫报190年历史上产生全球影响最大的报道[20]。</p>
<p>在2014年2月停止的是文件的公布，而非相关报道。例如，2015年1月，卫报根据斯诺登文件报道称，英国政府通信总部（GCHQ）截获了各大国际媒体记者的电子邮件。2015年6月，该报与《纽约时报》联合发表了一项调查，披露GCHQ在美军针对也门和巴基斯坦的无人机袭击中所扮演的角色，该调查素材取材于斯诺登提供给卫报“并与《纽约时报》共享”的文件。</p>
<p>因此，即使在最后一次公布文件的十六个月之后，卫报仍在分析该档案并与美国合作伙伴共享文件，但它选择不再公开发布任何文件（《纽约时报》亦未发布）。</p>
<p>2014年5月，DPBAC委员会主席报告称，与卫报的接触不断深化，这一过程“最终以任命保罗·约翰逊（Paul Johnson，卫报副总编辑）为DPBAC成员而达到顶峰”。</p>
<p>雅各布·阿佩尔鲍姆（Jacob Appelbaum）曾参与处理这批档案，在《明镜周刊》等刊物上发表了大量报道，并曾协助波伊特拉斯（Poitras）对斯诺登进行背景调查，他在2016年3月对卫报提出了尖锐批评：</p>
<p>在其2018年出版的《突发新闻》（Breaking News）一书中，拉斯布里杰极其详尽地记录了斯诺登时代，探讨了海伍德（Heywood）会晤、卫报伦敦办公室硬盘被销毁、米兰达（Miranda）在希思罗机场被扣留、竞争对手报纸发表的批评社论以及要求起诉的政客等事件。然而，这段报道历程却终结于一句简短的分句：“一旦斯诺登的报道平息下来。”[21] 这成为该章节中唯一缺乏明确行动主体或动机的重大事件。当所有其他行动都有明确的动机时，媒体报道却就这样悄然退场，没有任何关于是谁决定停止、何时做出的决定、或是为何做出该决定的解释。</p>
<p>当在2023年被问及为何缺乏文件公布时，麦卡斯基尔（MacAskill）将其归咎于公众兴趣的衰退，指出“随着兴趣消退，每篇报道吸引的读者群越来越小”。</p>
<p>这与卫报自己的主编对同一时期的描述很难相吻合。该报在公布其最后一份斯诺登文件时附带了一篇极具分量的重要头条报道，就像此前的大多数斯诺登报道一样。两个月后，该报道获得了普利策奖。拉斯布里杰记载，在公布最后一份文件的八个月后，该报超过了《纽约时报》，成为全球首屈一指的严肃英文报纸网站，而此前它在英国仅位列第九大报刊[22]。他将这种崛起归功于践行了“至少在我们看来新闻业本该做的事情”：这份他原本预计没人会读的选题清单上，安全和公民自由高居第二和第三位。“如果你整天大谈气候变化、安全和公民自由……肯定没有人会读你的报道。但他们确实读了。”他得出结论称，“显然，人们对以严肃方式呈现的重要新闻有着巨大的全球性需求。这种需求切实存在。”[22]</p>
<p>其他地方的这种需求也并未消退。《明镜周刊》直到2015年仍在继续公布文件，其报道引发了国际头条关注。《拦截》（The Intercept）更是持续公布至2019年，发表了近百篇报道。无论是什么原因导致卫报在2014年2月停止公布文件，绝非是因为材料耗尽或无人阅读。</p>
<p>根据拉斯布里杰[10]和麦卡斯基尔的说法，斯诺登从一开始就要求报道集中在监控和隐私方面，而非情报的战时使用，而拉斯布里杰已将此作为内部硬性指令下达。麦卡斯基尔描述道，在伦敦的备份被销毁后的某个时间，拉斯布里杰曾要求他返回《纽约时报》——“他们仍保留着这批材料”——并审查如果解除该限制哪些报道可以发表。他带着一份包含大约十几篇选题的清单返回伦敦。麦卡斯基尔写道，拉斯布里杰拒绝了这些选题，“不仅是因为他无意违背与斯诺登的协议，还因为其中没有任何一篇能像最初的那些报道那样具有爆炸性。”</p>
<p>关于《卫报》（The Guardian）所持副本去向的记述存在一段空白。拉斯布里杰（Rusbridger）在《突发新闻》（Breaking News）中写道，在伦敦的资料被销毁后，该报“完整保留了档案——存放在纽约”，并指出英国当局对“我们存放在百老汇536号的资料”几乎没有表现出任何兴趣[23]，那里正是《卫报》自己的纽约办公室。然而，当拉斯布里杰后来要求麦克阿斯吉尔（MacAskill）核查剩余资料时，麦克阿斯吉尔并没有去自家报社的纽约办公室，而是被派往《纽约时报》（The New York Times），“因为那里仍存有这些材料”。而在2023年，当麦克阿斯吉尔描述该档案目前的下落时，他只字未提《卫报》自己在纽约的副本，仅提及锁在《纽约时报》某间办公室里的那份副本，且《卫报》仍对其保留监管责任。</p>
<p>根据拉斯布里杰在《突发新闻》中所描述的协议[10]，《卫报》曾与《纽约时报》共享了其档案，并与ProPublica共享了部分内容[11]。</p>
<p>2016年3月，阿佩尔鲍姆（Appelbaum）表示，《卫报》对ProPublica就斯诺登档案下了封口令。</p>
<p>2026年8月18日，我们联系了《卫报》的新闻办公室提出疑问。该办公室回复称，他们没有任何新信息可以分享，他们通常不对编辑决策置评，并且我们所询问的是十多年前的事情。他们并未回应其自身是否仍保留有副本，或者《纽约时报》是否还留存任何资料以及他们是否仍对其负有责任，亦或是他们是否对合作伙伴的发表拥有任何审批权——而这些没有一项属于编辑决策范畴。</p>
<p>巴顿·格尔曼（Barton Gellman）持有全部档案中的相当大一部分。他与波伊特拉斯（Poitras）于2013年5月21日从斯诺登处获得了一份副本[1]，内含超过50,000份[5]文件[4]。格尔曼于2013年5月将该档案的一份副本带到《华盛顿邮报》（The Washington Post）的纽约办公室，并在那里进行严密保管[24]，直至他于2014年离开《华盛顿邮报》，该报随后停止发布斯诺登文件。</p>
<p>格尔曼在2020年表示，他的“资料目前处于冷存储状态，其安全和难以访问程度是我所能设计出的最高水平”。2022年，他赞同波伊特拉斯的看法，即该档案“对于建设性研究极具价值”，但补充说：“与其他人共享档案所需的操作安全防范措施实在太繁琐，难以处理。我索性把整套东西都放进了冷存储中。对此我感到很遗憾。”</p>
<p>格尔曼对《华盛顿邮报》所建立的安全措施的叙述，是所有人关于任一媒体机构如何保管该档案所给出的最详尽描述。</p>
<p>当时他带着一份清单去找编辑马蒂·巴伦（Marty Baron）。清单内容包括：配备全新擦除并经过加密的专用电脑；物理拆除网络硬件，切断机器与互联网及编辑部自身系统的连接；一间带有高安全性锁、加固门以及螺栓固定在地板上的重型保险库的无窗房间；解密密钥保存在存储卡中，除使用期间外绝不放在同一房间内。访问需要四项凭证——门钥匙、保险库密码、数字钥匙卡、口令密码——分散在团队成员中，除格尔曼外无人同时持有这四项凭证[25]。</p>
<p>《华盛顿邮报》首次尝试设置的房间有一整面朝外的窗户，能一眼望见半个街区外的俄罗斯大使官邸。于是他们另选了一间。该房间配备了高安全性锁、门外走廊的监控摄像头以及一个重达四百磅的保险库。格尔曼还在自己位于纽约的办公室保留了第二个保险库[25]。</p>
<p>在与技术专家阿什坎·索尔塔尼（Ashkan Soltani）共事期间，他们对笔记本电脑进行了改造，拆除了内置Wi-Fi、蓝牙和电池，以确保机器一旦拔掉电源就会立即关机并自我加密。他们物理封堵了USB接口，并保持严格的安全防范：每次离开房间都随身带走钥匙，哪怕只是去快速上个洗手间。为了察觉任何潜在的物理篡改痕迹，格尔曼在笔记本电脑的螺丝上涂抹了环氧树脂和闪粉，并在保险库的旋钮上测试了紫外荧光粉。他将所有笔记保存在加密卷中，每天早晨仅为了解开访问权限就需要输入五个互不相同的密码口令；然而该系统最终导致了反噬，有一次他忘记了其中一个密码口令，导致部分文件永远无法被找回[25]。</p>
<p>《华盛顿邮报》于2014年7月发布了最后一批斯诺登文件。截至最后，该报总共仅发表了大约30份文件[26]，约占其所持有档案的0.06%。</p>
<p>格尔曼写道，到2015年深秋，他和索尔塔尼已不再为该报撰写文章。索尔塔尼停用了他旧的笔记本电脑，归还了加密密钥令牌，彻底断绝了与该档案的关联[27]。</p>
<p>《纽约时报》和ProPublica均于2013年根据拉斯布里杰在一张A4纸上打印的条件，从《卫报》处获取了资料[10]。这两家机构均未持有全部档案，也从未透露过自身收到了多少资料。</p>
<p>在2014年至2015年间，《纽约时报》和ProPublica仅发表了寥寥数份文件。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>斯诺登档案中最后一份文件发表于2019年5月29日，由The Intercept发布。</li>
    <li>《卫报》于2014年2月停止发布文件，《明镜》周刊于2015年1月停止，《纽约时报》和ProPublica于2015年8月停止，The Intercept于2019年3月关闭其档案库。</li>
    <li>来源叙事重点：揭示斯诺登档案在主流媒体手中经历了迅速的审查软化与事实上的封存；重点聚焦各大媒体早在2014至2019年间就完全停止发布原始文件，并详述英国政府（通过GCHQ和DA-Notice审查机制）对《卫报》施加的深层压力与合作渗透，质问为何仍有海量具有重大历史与当代意义的档案未见天日。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Hacker</span>
</div>

<div class="news-card-footer"><a href="https://libroot.org/posts/what-happened-to-the-snowden-archive" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Hacker News (科技前沿论坛)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-item-a9942542ed259efa" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1402" data-content-paragraphs="19" data-published-at="2026-09-20T22:32:43.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/hackernews.svg" class="source-icon" alt="Hacker News (科技前沿论坛)" width="16" height="16" /> <strong>Hacker News (科技前沿论坛)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 06:32</span>
</div>

### [谷歌开源智能体编排器](https://agentexecutor.io/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Google&#39;s Open Agentic Orchestrator</div>

<div class="article-body" data-article-body="true"><p>AX 可以对您的任务进行沙盒隔离，连接其工作区，设置网络边界，并帮助您在每个集群中运行数十亿个任务。您可以为每个智能体分配单个任务，也可以根据智能体需求组合任意多个任务。</p>
<p>它们既不是微服务，也不是批处理作业。它们会累积状态，需要严格的隔离，会调用模型 API 和工具服务器，而且在无人看管时可能会陷入死循环消耗巨额费用。AX 为您提供了四个紧凑的原语，以声明式方式处理所有这些问题。</p>
<p>在具有 CPU 和内存限制的沙盒中运行不可信的智能体代码。创建、挂起和销毁的成本极低。</p>
<p>列出智能体所需的 Git 代码库、MCP 服务器和技能，或者只需描述目标。AX 会在任务启动前为每个沙盒完成所有配置。</p>
<p>定义并快速管理网络策略。将流量严格限制在明确的主机和端口白名单内，并向传入请求注入凭据。</p>
<p>集中配置模型、模型参数和密钥。仅需一次应用操作即可轮换密钥或锁定新的模型版本。</p>
<p>AX 运行在 Agent Substrate 之上，这是一个从零开始设计的计算运行时，专为超高密度和快速的有状态 Actor 生命周期而打造。</p>
<p>每个任务都作为一个轻量级 Actor 运行，使您能够扩展到每个集群数十亿个并发智能体工作会话，不受编排器的规模限制。</p>
<p>等待模型响应、外部工具调用或人工反馈的空闲智能体会建立检查点并挂起，且能在不到一秒的时间内恢复，实现零冷启动延迟。</p>
<p>数十个任务共享 Worker 节点资源，将空闲等待时间转化为闲置计算能力，因此您只需在智能体积极思考和运行代码时付费。</p>
<p>AX 将生成式 AI 直接集成到平台中。例如，如果您想仅通过自然语言描述来配置工作区，系统会在任务开始前自动准备好环境。</p>
<p>用通俗的自然语言描述一个就绪环境应有的状态。AX 会在首次启动时将该目标交由智能体处理，以安装工具链并验证依赖项。</p>
<p>交互式编程智能体、长期运行的智能体服务器、Jupyter Notebook、无头浏览器测试以及自定义工具运行时——应有尽有。</p>
<p>快速启动海量可复现的沙盒，用于采集行为轨迹、运行强化学习循环并大规模评估智能体。</p>
<p>面向开发者与研究人员</p>
<p>我们希望简化智能体基础设施的处理流程，让您能专注于核心工作。AX 在设计上极其注重易用性、快速迭代以及为应用开发者与 AI 研究人员提供愉悦的工作流体验。</p>
<p>我们的目标是保持运行时的极简与轻量，同时恰如其分地融入每个人构建、评估和扩展智能体所必需的核心特性。</p>
<p>AX 诞生于谷歌内部智能体运行时系统研究与前沿算力基础设施的结合。在多年构建和运营智能体执行引擎的过程中，谷歌各团队认识到，智能体工作负载代表了一种全新的计算范式：有状态、突发性强、长周期运行的 Actor，它们可能进行长达一分钟的高强度计算，随后等待模型响应、工具返回或人工审批。为无状态微服务或可预测的批处理作业构建的传统编排器，在维持空闲沙盒运行时的成本极其高昂，且原生缺乏对亚秒级挂起与恢复的支持。</p>
<p>借鉴 Google DeepMind 在智能体运行时方面的研究成果，结合在大规模隔离、恢复与调度方面的深厚经验，AX 正被打造为一个专为智能体执行设计的开源、声明式控制平面。它将任务、工作区、网络策略和模型抽象为核心原语，使开发者和研究人员无需重新发明底层基础设施即可运行海量智能体集群。该项目高度依赖 Agent Substrate，并提供智能体抽象层与生成式运行时组件。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Hacker News (科技前沿论坛)】于 2026-09-21 06:32 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Hacker</span>
</div>

<div class="news-card-footer"><a href="https://agentexecutor.io/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Hacker News (科技前沿论坛)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--techcrunch-disrupt-2026-dbb148570dcfc2a0" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1154" data-content-paragraphs="13" data-published-at="2026-09-20T21:41:08.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 05:41</span>
</div>

### [仅剩6天！购买TechCrunch Disrupt 2026门票立省最高200美元](https://techcrunch.com/2026/09/20/6-days-left-to-get-ahead-at-techcrunch-disrupt-2026/)
<div class="original-title-sub"><span class="orig-tag">原文</span> 6 days left to save up to $200 to TechCrunch Disrupt 2026</div>

<div class="article-body" data-article-body="true"><p>您享受最高200美元优惠的窗口期即将关闭。当前的门票优惠价格将于太平洋时间9月25日晚上11:59截止，逾期票价将上涨。</p>
<p>在TechCrunch Disrupt 2026大会上，抢占先机不仅意味着聆听精彩的演讲环节，更意味着结识至关重要的行业人脉，在未来趋势走向主流之前洞察先机，并收获能够付诸实践的实用见解。</p>
<p>TechCrunch Disrupt 2026汇聚了10,000多名创始人、投资人、运营者与科技领袖，共赴为期三天的初创生态圈思想碰撞、人脉拓展与机遇发掘盛会。</p>
<p>大会汇聚了250多位演讲嘉宾，在六大行业舞台、圆桌会议和分组研讨中带来200多场分享，您将深入洞察正在重塑企业构建、融资与扩张的变革力量——涵盖人工智能、机器人、金融科技、基础设施以及未来的工作方式等。但大会的价值远不止于舞台之上。</p>
<p>拓展人脉网络。通过包括AI智能匹配、临时交流会议以及专为投资人和创始人设立的“Deal Flow Cafe”在内的社交平台，结识潜在投资人、客户、合作伙伴、拟聘人才与合作者。</p>
<p>保持市场领先。聆听行业领袖如何应对围绕人工智能、竞争优势、融资、人才、市场推广策略（GTM）和业务规模化等最关键的战略议题。</p>
<p>在趋势显现之前洞察未来。在展厅探索300多家初创企业及其突破性成果，观看竞争激烈的Startup Battlefield 200创业路演赛，并在各大会议环节发掘新兴技术。</p>
<p>满载实用收获而归。从融资策略到GTM战术，再到AI时代构建具备护城河企业的洞察，Disrupt大会围绕切实可行的落地方案打造，而非流于空泛的高谈阔论。</p>
<p>您需要结识的人、需要聆听的思想，以及不可错过的机遇，都将于今年10月在旧金山汇聚一堂。</p>
<p>10月13日至15日，与10,000多名创始人、风险投资家和科技从业者齐聚旧金山。请于太平洋时间9月25日晚上11:59前购票，在涨价前立省最高200美元。四人及以上团体票更可额外享受30%折扣。</p>
<p>当您通过我们文章中的链接购买时，我们可能会获得小额佣金，这不会影响我们的编辑独立性。</p>
<p>展位预订截止日期为9月18日。切勿错失获取高价值销售线索、接触投资人以及在Disrupt展厅展示品牌的良机。</p>
<p>ChatGPT发明者推出的新型AI模型令开发者振奋<br />OpenAI发现其模型会给后继模型留言以隐瞒不良行为<br />最新未删减法庭文件披露，微软高管称AI内容抓取为“人类历史上最大规模的劳动力盗窃”<br />清洁科技初创企业Fluxnium找到利用可用5万年的核燃料的方法<br />前TikTok高管打造了一款利用AI指导用户拍照姿势的应用<br />Salesforce与英伟达联合推出的全新推理模型令所有AI实验室严阵以待<br />AI基础设施公司Cornelis融资2.05亿美元，逐步削弱英伟达的主导地位</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-21 05:41 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/20/6-days-left-to-get-ahead-at-techcrunch-disrupt-2026/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-co-ogre-battle-64-recomp-d3305a8bbb42d4a4" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1591" data-content-paragraphs="1" data-published-at="2026-09-20T20:59:02.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/hackernews.svg" class="source-icon" alt="Hacker News (科技前沿论坛)" width="16" height="16" /> <strong>Hacker News (科技前沿论坛)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 04:59</span>
</div>

### [《皇家骑士团64》静态重编译项目进度已达99.05%](https://github.com/lfarroco/ogre-battle-64-recomp)
<div class="original-title-sub"><span class="orig-tag">原文</span> Ogre Battle 64 Recompiled Project at 99.05%</div>

<div class="article-body" data-article-body="true"><p>使用 N64Recomp 工具链，将 N64 游戏《皇家骑士团64：真君圣者》（Ogre Battle 64: Person of Lordly Caliber，美版，Rev A）静态重编译为原生 PC 可执行文件。<br />本代码仓库不包含任何受版权保护的游戏数据。你必须自行提供 ROM 转储文件（详见下文）。<br />需要 64 位 PC 以及渲染器支持的 GPU：<br />仅使用键盘即可游玩；支持 XInput（Windows）或 SDL 的手柄为可选配置。音频设备同样可选：若无音频设备，游戏将静音运行。在 Windows 上无需安装 Visual C++ 运行库——安装包内自带其着色器编译器所需的运行时。<br />如果游戏在启动时崩溃，请先更新显卡驱动。在较旧的 GPU 上，设置 OGRE_CONSOLE=1 可打开带有启动日志的控制台，设置 OGRE_GRAPHICS_API 则可指定图形后端（vulkan 或 d3d12）。<br />该项目中的工作大部分是由 DeepSeek v4/v4.1 Flash 模型完成的。<br />主代码段（807 个函数）已完全重编译为 C 语言。运行时应用程序（包括渲染、输入、音频）是下一个里程碑。完整计划、当前状态以及技术发现请参阅 PLAN.md。<br />参见 PLAN.md 中的“复现”（Reproduce）章节。概述如下：<br />ROM 必须是美版 Rev A 转储文件（40 MB，.n64 16 位字节交换格式，或已转换好的 .z64 格式）。tools/convert_rom.py 工具可将 .n64 转换为 .z64。<br />新克隆的代码库必须在运行一次 make regenerate 后才能构建应用程序：重编译出的 C 代码（RecompiledFuncs/、Bank*Funcs/、RspFuncs/、app/src/bank_funcs.inc）是从你自己提供的 ROM 中生成的，特意没有提交到版本库中。make regenerate 会按唯一可行的顺序依次运行 splat、MIPS 链接、34 个库单元、主重编译以及 RSP 微代码。<br />启动时，应用会显示黑色的起始屏幕——“OGRE BATTLE 64: RECOMP / CLICK TO LOAD YOUR ROM (OR DROP IT IN THIS WINDOW)”（皇家骑士团64：重编译版 / 点击加载您的 ROM（或将其拖入本窗口））。点击它可以选择 ROM，或将 ROM 拖放到窗口中，或者直接将 ROM 放置在可执行文件旁即可。系统会通过哈希值校验 ROM 并将其保存，因此后续启动将直接进入游戏。电池存档会保存在可执行文件旁的 saves/ 目录下。<br />该安装包为单文件结构：SDL2 采用静态链接（make dist 会拉取并构建一次特定版本的原版 SDL2，因为 Homebrew 提供的 sdl2 是基于 SDL3 的兼容过渡层，不含静态库）。包内不含任何游戏数据，因此玩家需在起始屏幕自行提供 ROM。详见 docs/guides/app-build.md 中的“分发”（Distribution）一节。<br />渲染器（tools/RT64）是一个固定在特定上游提交的 git 子模块，在 SDL &lt; 2.0.22 的系统上需要单独打一次补丁（例如 Ubuntu 22.04 自带 SDL 2.0.20，但 SDL_GetWindowSizeInPixels 需要 2.0.22 以上版本）：<br />在 tools/RT64 内执行任何 git 子模块更新后需要重新应用该补丁，因为更新会重置子模块并丢弃补丁。<br />《皇家骑士团64》版权归 Quest / 任天堂所有。本项目仅用于数据保存与互操作性研究。严禁分发游戏 ROM 或其提取出的资产。<br />游戏《皇家骑士团64：真君圣者》的重编译项目</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Hacker News (科技前沿论坛)】于 2026-09-21 04:59 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Hacker</span>
</div>

<div class="news-card-footer"><a href="https://github.com/lfarroco/ogre-battle-64-recomp" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Hacker News (科技前沿论坛)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--0-music-history-podcast-2cebdf954e6f7b00" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2152" data-content-paragraphs="11" data-published-at="2026-09-20T20:51:57.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 04:51</span>
</div>

### [《No Dogs in Space》回归，满足你对深挖音乐历史的痴迷渴求](https://www.theverge.com/report/997948/no-dogs-in-space-is-back-punk-2-0-music-history-podcast)
<div class="original-title-sub"><span class="orig-tag">原文</span> No Dogs in Space is back to feed your need for obsessive music history</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/810731213_18454823458185562_8102974567602315903_n.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="《No Dogs in Space》回归，满足你对深挖音乐历史的痴迷渴求" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>来自该话题的帖子将被添加到您的每日电子邮件文摘和主页信息流中。<br />查看所有娱乐内容<br />该播客正通过“朋克2.0”（Punk 2.0）实现“回归初心”<br />来自该作者的帖子将被添加到您的每日电子邮件文摘和主页信息流中。<br />查看泰伦斯·奥布莱恩（Terrence O&#39;Brien）的所有文章</p>
<p>今年8月，我曾撰文表达对音乐历史播客《No Dogs in Space》的喜爱，但也对其已有两年多未更新节目的事实感到惋惜。当时我未曾想到，主持人卡罗琳娜·伊达尔戈（Carolina Hidalgo）和马库斯·帕克斯（Marcus Parks）正紧锣密鼓地筹备宣布节目带着第四季“朋克2.0”回归。本周播出了第一集，这是一组关于纽约娃娃乐队（New York Dolls）系列专题的第一部分；作为一名在主唱大卫·约翰森（David Johansen）的故乡斯塔滕岛土生土长的人，这支乐队对我而言格外亲切。</p>
<p>对于这一新季，伊达尔戈和帕克斯决定是时候回归初心了。部分原因在于，他们觉得朋克摇滚是他们热情和专业沉淀最深厚的领域。帕克斯表示，他们“之前想无所不包。我有一阵子甚至想做贝多芬”，但“我们意识到，我们最擅长的就是讲述一个朋克故事，对吧？不是那个唯一的朋克故事，而是其中一个朋克故事。”不过他们也提到，那里也正是最引人入胜的故事所在。在为之前的实验摇滚系列投入大量时间将德语翻译成英语之后，他们意识到，乐队背后的故事往往归结为“艺术学院的学生在瞎闹”。</p>
<p>新一季经历了这么长时间才成型有许多原因。但其中最大的原因之一是两人经历了几次无功而返的起步。起初，他们计划聚焦华盛顿特区（DC）的朋克圈。伊达尔戈向《The Verge》透露，“我们在这上面花了六个多月的时间”，并打算以“坏脑”（Bad Brains）乐队开启该系列。“然后我们深入调查他们，”伊达尔戈说，“发现他们极其排斥同性恋。就像地狱烈火那般极端……《No Dogs》讲过的很多乐队其实都有各自的问题，但这个实在太令人难以聚焦了。”</p>
<p>随后，两人尝试做一个涵盖整个华盛顿特区音乐全貌的系列——“千万别这么干，”伊达尔戈告诫道。帕克斯说，“涉及的范围不断膨胀扩大”，他列举了一系列或许不属于华盛顿特区朋克圈、但却是重要基石元素的音乐类型与人物，比如查克·布朗（Chuck Brown）以及高高乐（go-go）。两人甚至一度觉得，乔治城大学的WGTB广播电台本身就值得单独做一个系列。但最终，“当你试图把所有这些糅合在一起时，你做不到。你根本没办法把所有这些故事塞进同一个系列里，”帕克斯说，“在耗费了八个月的心血后……我们最终不得不承认失败。”</p>
<p>不过，这些努力并没有完全白费。他们从中衍生出了一个关于林克·雷（Link Wray）的两集系列，将于今年晚些时候首播。</p>
<p>就像《No Dogs in Space》的每一季一样，其中的部分乐趣在于帕克斯和伊达尔戈钻研的那些离奇支线与深挖细节。在制作纽约娃娃乐队系列期间，伊达尔戈迷上了胡普尔的傻瓜乐队（Mott the Hoople）。该乐队最为人熟知的是由大卫·鲍伊（David Bowie）创作的热门单曲《All the Young Dudes》，但他们的经历极其跌宕起伏。伊达尔戈说，主唱伊恩·亨特（Ian Hunter）“当时只是个挖沟工人。然后他接到了一个朋友的电话，对方说：‘嘿，这里有个乐队，他们水平不太行，而且需要一个新主唱’，于是他就直接过去了。”亨特还创作了《Cleveland Rocks》，这首歌后来由“美利坚合众国总统”（The Presidents of the United States of America）乐队翻唱，并成为了《德鲁·凯里秀》（The Drew Carey Show）的主题曲。</p>
<p>帕克斯则表示，自己迷上了变装皇后杰基·柯蒂斯（Jackie Curtis）。“有人认为，通常归功于理查德·赫尔（Richard Hell）的朋克风格，实际上很可能起源于杰基·柯蒂斯，”他说。他还分享了一个故事，讲述柯蒂斯有一次如何“像蝙蝠侠一样，像蝙蝠侠那样一点点挪动着……爬出[自己的]窗台”，潜入一位刚去世的邻居家公寓，企图在验尸官赶来之前偷走她的衣服。</p>
<p>正是这种旁逸斜出的分支情节让《No Dogs in Space》如此引人入胜。“我们就像生活在一种极度痴迷的状态中，”帕克斯说。“痴迷确实可以说就是我们的超能力。我们俩最近都被确诊患有自闭症，并发现这正是我们的特质所在。这就是我们获得的超能力。”</p>
<p>如果你正在琢磨从哪里开始听，那么关于纽约娃娃乐队的全新系列就是一个极佳的起点。纽约娃娃是一支原始朋克与华丽摇滚乐队，在构筑纽约音乐圈的过程中扮演了举足轻重的角色。不过，我也极力推荐关于替补乐队（The Replacements）、死肯尼迪乐队（Dead Kennedys）以及快乐小分队（Joy Division）的系列。你现在可以在Apple Podcasts、Spotify或任何能找到优质播客的平台上收听新一季的《No Dogs in Space》。此外，该节目还将首次在YouTube上发布完整视频版单集。</p>
<p>免费每日精选，汇聚最重要的新闻。<br />这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-21 04:51 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/report/997948/no-dogs-in-space-is-back-punk-2-0-music-history-podcast" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-keeping-a-lot-of-secrets-92e9a70cb2f37d01" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1799" data-content-paragraphs="13" data-published-at="2026-09-20T20:29:07.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 04:29</span>
</div>

### [世界模型公司正在保守大量秘密](https://techcrunch.com/2026/09/20/world-model-companies-are-keeping-a-lot-of-secrets/)
<div class="original-title-sub"><span class="orig-tag">原文</span> World model companies are keeping a lot of secrets</div>

<div class="article-body" data-article-body="true"><p>本周，我在 All In 大会（与同名播客无关）上主持了一场关于世界模型的专题讨论，这让我有机会深入探究人工智能世界中最神秘的角落之一。该领域的重量级参与者包括杨立昆（Yann LeCun）的 AMI Labs 和李飞飞（Fei-Fei Li）的 World Labs——尽管两家机构都积累了极高的关注度和大量融资，但它们在“尝试变现”的刻度上排名相当靠后。</p>
<p>从核心来看，世界模型旨在实现空间智能的自动化，因此该领域可以走向许多令人兴奋且有利可图的方向，涵盖从机器人技术、交互式视频到更复杂的自动驾驶系统。</p>
<p>但是，当我开始追问我们究竟能在哪里看到这项技术的商业化落地时，情况开始变得模糊不清。我找到的最接近权威人士的是 AMI Labs 的联合创始人兼该公司世界模型副总裁迈克尔·拉巴特（Michael Rabbat），他也参与了我的专题讨论。但当我追问该公司具体在研发什么时，他却语焉不详。“等我们准备好谈论它的时候，我们就会谈论它。”在随后的电子邮件中，他澄清道：“我们仍处于研发和构建阶段，因此我们不会公开谈论任何产品计划或时间表。”</p>
<p>平心而论，AMI 成立还不到一年，因此保持沉默也是情理之中。但这种讳莫如深的态度已经蔓延到了整个世界模型领域。World Labs 的 Marble 可能是该领域开发最完善的产品，其演示范围涵盖直接的媒体创作、为视频游戏构建可探索的环境，以及计算机生成图像（CGI）特效。虽然也有机器人用例，但整个平台似乎更多是为了展示能力而设计的。</p>
<p>这种保密性甚至延伸到了这些公司的数据供应商。在同一场大会的场边，我与新生的世界模型业务的数据供应商 Physicl 的首席执行官亚历克斯·德·维根（Alex de Vigan）进行了交谈。他表示，他知道 Physicl 的数据对其正在构建的产品很有用，但他仍然完全不知道那究竟是什么。“我希望他们能告诉我们更多。如果我们知道他们正在研发什么，我们就能构建更有用的数据，”德·维根告诉我。</p>
<p>这种神秘感部分源于世界模型作为一个概念的多样性。最简单的版本是一个可导航的世界地图，类似于为自动驾驶汽车提供动力的 AI 模型。但帮助 Waymo 穿梭于车流中的同一种建模方法，也可以帮助人形机器人搬运箱子，或者将几分钟的视频片段变成一个可探索的环境。AMI 已经通过与 Nabia 的合作涉足了制造业、生物医药、机器人技术，甚至是面向医生的 AI 软件。它显然不会同时推进所有这些方向——但或许其中一两个正在脱颖而出？</p>
<p>没有人怀疑基于世界模型技术可以建立起许多可行的商业模式——而且只要融资依然容易，就没有特别的压力去专注于某一个方向。事实上，不急于聚焦是有充分理由的。如果 AMI 明天宣布他们构建了一款人形 OpenClaw 或下一代好莱坞渲染系统，许多其他实验室会突然对该领域产生浓厚兴趣。很快，该实验室就将面临来自其他世界模型公司、新型实验室，甚至 OpenAI 和 Anthropic 的潜在竞争。</p>
<p>在某种程度上，这是轻松融资的另一面。你的竞争对手同样能够融到资金——而让你可以低调研发的同一笔资金，一旦市场路径变得清晰，也会为大量潜在对手提供资金支持。但即便这种竞争不可避免，最好也要尽可能推迟它的到来，这意味着要对你究竟在构建什么保持沉默。</p>
<p>刘慈欣的粉丝会认出这正是“黑暗森林”法则：如果你不知道树林里还有谁，最好不要引人注目。</p>
<p>本文最初发表于 2026 年 9 月 18 日。</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会获得少量佣金。这不会影响我们的编辑独立性。</p>
<p>预订展位的最后一天是 9 月 18 日。不要错过在 Disrupt 展厅获得高影响力潜客、投资者接洽和品牌曝光的机会。</p>
<p>ChatGPT 发明者推出的一款新型 AI 模型令开发者倍感兴奋<br />OpenAI 发现其模型向后继模型留言以隐瞒不良行为<br />新解密的归档文件披露，微软高管称 AI 抓取是“人类历史上最大的劳动力窃取”<br />清洁技术初创公司 Fluxnium 找到利用可供使用 5 万年核燃料的方法<br />TikTok 前高管开发了一款利用 AI 教你拍照摆姿势的应用程序<br />Salesforce 和英伟达的新推理模型正是各 AI 实验室应该畏惧的一切<br />AI 基础设施公司 Cornelis 筹集 2.05 亿美元以削弱英伟达的垄断地位</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-21 04:29 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/20/world-model-companies-are-keeping-a-lot-of-secrets/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-n-austin-and-san-antonio-0ba623100484d3b0" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="838" data-content-paragraphs="12" data-published-at="2026-09-20T19:38:48.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 03:38</span>
</div>

### [埃隆·马斯克旗下 Boring Company 的最新设想：在奥斯汀和圣安东尼奥之间修建超级高铁](https://techcrunch.com/2026/09/20/elon-musks-latest-boring-company-pitch-involves-a-hyperloop-between-austin-and-san-antonio/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Elon Musk’s latest Boring Company pitch involves a Hyperloop between Austin and San Antonio</div>

<div class="article-body" data-article-body="true"><p>埃隆·马斯克（Elon Musk）最近声称，其地下隧道初创公司 The Boring Company 正在致力于研发一条连接奥斯汀（Austin）和圣安东尼奥（San Antonio）的“简单雏形超级高铁（Hyperloop）”，该项目将把两座城市之间的路程缩短至30分钟以内。</p>
<p>The Boring Company 的官方账号转发了马斯克的言论，并表示“如果有幸承建这一大型基础设施项目，我们将感到非常兴奋与荣幸”。</p>
<p>The Boring Company 此前公布的许多项目——包括芝加哥、洛杉矶以及连接纽约市与华盛顿特区的隧道系统——均未能落地。不过，该公司确实在拉斯维加斯运营着一套结合了隧道与地面路线的交通系统，并且最近刚刚完成了由阿拉伯联合酋长国领投的30亿美元融资。</p>
<p>马斯克关于潜在的奥斯汀至圣安东尼奥超级高铁的言论，实际上是对一段描绘人类在外星建立殖民地这一常见科幻未来的AI生成视频的回复。马斯克转发了该视频并宣称：“这就是我们将要实现的未来”。</p>
<p>马斯克的批评者指出，他对未来的设想显然是受到了廉价科幻小说（pulp science fiction）和漫画书的启发；历史学家吉尔·勒波雷（Jill Lepore）最近告诉我，马斯克似乎偏爱那些“与其所有政治信仰完全相悖、截然相反”的科幻作品。</p>
<p>这就是我们将要实现的未来 pic.twitter.com/8aD0w8MDVc</p>
<p>预订展位的最后截止日期为9月18日。切勿错失在 Disrupt 展厅获取高价值潜在客户、对接投资人以及提升品牌曝光的机会。</p>
<p>每个工作日和周日，您都可以获取 TechCrunch 最优质的报道内容。</p>
<p>TechCrunch Mobility 是您获取交通领域新闻与洞察的首选阵地。</p>
<p>初创公司是 TechCrunch 的核心，敬请查收我们每周为您精选的重磅报道。</p>
<p>为行业领军人物与决策者提供开启崭新一天所需的关键资讯。</p>
<p>提交您的电子邮件即表示您同意我们的条款和隐私声明。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-21 03:38 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/20/elon-musks-latest-boring-company-pitch-involves-a-hyperloop-between-austin-and-san-antonio/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-eally-ready-to-slow-down-78a528244d9bd873" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3641" data-content-paragraphs="34" data-published-at="2026-09-20T18:56:04.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 02:56</span>
</div>

### [AI 行业真的准备好放慢脚步了吗？](https://techcrunch.com/2026/09/20/is-the-ai-industry-really-ready-to-slow-down/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Is the AI industry really ready to slow down?</div>

<div class="article-body" data-article-body="true"><p>关于 AI 安全以及可能放缓发展步伐的讨论，我们正看到一场激烈的辩论。Anthropic 首席执行官达里奥·阿莫代伊（Dario Amodei）最近发布了一项“调整前沿步伐”（pace the frontier）的计划，而英伟达首席执行官黄仁勋（Jensen Huang）则公开呼应唐纳德·特朗普总统的言论，称对 AI 的强烈反对是一场骗局，监管毫无必要。</p>
<p>在 TechCrunch 旗下 Equity 播客的最新一期节目中，柯尔斯滕·科罗塞克（Kirsten Korosec）、肖恩·奥凯恩（Sean O’Kane）和我一起讨论了阿莫代伊和 OpenAI 首席执行官萨姆·奥尔特曼（Sam Altman）等高管是否真心想要放慢脚步。</p>
<p>虽然我对有如此多的行业领袖似乎都支持阿莫代伊的计划感到惊讶，但肖恩指出，该计划似乎缺乏细节。</p>
<p>当柯尔斯滕询问现有监管与自由市场机制的结合是否足以独自提供充分的安全保障时，肖恩回答说：“目前我们的联邦政府从大体上来看显然并不渴望执行监管，更不用说专门针对这一领域了。”</p>
<p>此外，他认为：“在这个市场上，似乎并没有大量的消费者选择在驱动市场发展，比如，‘好吧，如果这些公司中的一家做了非常恶劣的事情，那么他们就会看到有多少人取消订阅或造成类似影响’。”</p>
<p>请继续阅读我们对话的预告摘要，内容经过删节和文字润色以求通顺清晰。</p>
<p>安东尼·哈（Anthony Ha）：肖恩，你怎么看？我们真的要去“调整前沿步伐”吗？</p>
<p>肖恩·奥凯恩：不知为何，这听起来像是电影《惊爆点》（Point Break）里的台词。这纯粹是一种非常加州风格的表态，就像在说：“哥们儿，咱们来调整前沿步伐吧。”</p>
<p>我不知道。我上周在节目里说过，我不认为我们正走向任何形式的放缓，这在很大程度上是因为我认为这些公司的架构根本无法让这种做法奏效。</p>
<p>所以，听到 Anthropic 的达里奥、OpenAI 的萨姆、甚至在某种程度上的埃隆·马斯克（Elon Musk）都这么说，这和我一周前的说法形成了一个相当迅速的反转——至于我们信不信，稍后可以深入探讨。我想说的是，我觉得自己并没有全错，因为即使达里奥在博文中阐述了这些宽泛的计划，其他一些领导人也有所提及，但我感觉这里面仍然缺少很多具体细节，不仅涉及这些人为何认为存在危险和风险的某些主张，还涉及他们所说的放缓到底意味着什么。</p>
<p>安东尼，我知道上周末这事沸沸扬扬的时候你一直在密切关注，所以我很好奇，在理解他们到底想表达什么这方面，你是否会比我宽容一些？</p>
<p>安东尼：我是说，我也有疑问。真正引起我注意的是，业内居然有这么多人相当迅速地围绕这一点达成了一致。甚至在阿莫代伊发表博文之前，就在前几天，我就看到其他人在发布这一[计划]的某种版本了。</p>
<p>我的理解是，这些建议来自 AI 安全社群；这些想法已经酝酿了一段时间了。它们并不是[阿莫代伊]独自凭空想出来的。但这看起来就像很多人已经准备好接受这一点，从某种程度上说，看到达成共识[令人]感到鼓舞。但这也让我有些怀疑，这是否代表着朝着放缓迈出了真正的实质性步伐。</p>
<p>柯尔斯滕·科罗塞克：首先，达成共识可以是件好事。然而，它也可能是形成卡特尔垄断的开端。因此，我们必须明确这里谈论的对象是谁。我们谈论的是前沿 AI 实验室。这一点具体且重要。</p>
<p>你刚才确实说过细节并不十分明朗，但我们确实知道这里的大致思路是引入独立第三方评估机构，他们将深入 Anthropic 或 OpenAI 等[公司]内部开展工作，并监督 AI 安全实践和相关事件。但围绕这一点存在着许多模糊之处。</p>
<p>此外还有另一项提议，即让民主国家的主要 AI 公司就安全标准和限制进行协调。然后是国际协调这一环。这些就是围绕此事的总体思路。</p>
<p>我还想补充一点，来自某些特定人员的阻力非常可观。而且令人惊讶的是，其中一些人是我原本以为不会反对的。显而易见的例子大概是英伟达首席执行官黄仁勋，他发表了一些相当尖锐的言辞。我不知道你们两位怎么看……他的某些言论以及他在[All-In 峰会]台上接听特朗普总统电话的那一幕。</p>
<p>肖恩：我认为黄仁勋明白，在某种程度上，他被视为这里的“全场最具威望的掌舵人”（the adult in the room）。这很有意思，因为我认为这种动态已经发生了变化。如果你在一年前、或者现在算来快两年前问大家，当这些 AI 公司真正开始大爆发时，谁在扮演这个角色，我想很多人都会指向微软和萨提亚·纳德拉（Satya Nadella），而我觉得微软出于多种我们现在不必深究的原因，已经失去了这种“掌舵人”的地位。当然，部分原因在于纳德拉曾说他要让谷歌起舞，但那从未实现。事实上，在很多方面恰恰适得其反。</p>
<p>我认为黄仁勋不仅明白自己需要取悦最多的人，因此想发表最得体稳健的言论，而且他还是该领域与本届政府之间最有用的联络人之一，以至于他在这场出席人数众多、备受瞩目的会议台上时接到了总统的电话，这让两人得以对这整场混乱局面作出回应。</p>
<p>柯尔斯滕：关于你提到他是掌舵人和联络人的观点，他确实处于能够扮演这一角色的位置。但在我看来，我想说[他的出场]确实感觉有点像在作秀，走得有点太过了，并且真正凸显了一个事实：英伟达在 AI 不受节制、向前狂奔的过程中获得了巨大的利益。</p>
<p>我不想把事情想得太阴暗，但这确实是我最初的反应。</p>
<p>安东尼：特朗普和黄仁勋的利益是一致的，而且[黄仁勋]也是在对[特朗普]挑他爱听的说。</p>
<p>我确实认为他具体关注的一些事情值得稍微剖析一下。首先他谈到了这种想法：“我们不会放慢脚步。”很有趣，光是“放缓”（slowdown）这个词就频频出现——但与此同时，奥尔特曼和阿莫代伊虽然[也会]使用放缓的说法，但他们更喜欢用的词是“调整步伐”（pace），对吧？</p>
<p>而这三项提议——正如你刚才所描述的，柯尔斯滕——理论上可能导致步伐放慢，但他们并没有明确这么说。他们是在表达：“嘿，我们正在采取一些基本的安全措施，并找人盯紧我们。”但至少据我理解，这些事情在本质上没有一项明确要求必须走得比现在更慢。</p>
<p>Kirsten：所以我想问 Sean 一个问题。难道你不能辩称，在自由市场社会中，我们已经有了现行的监管规定，而且在一个没有保护主义的竞争环境中，如果某家公司发布了不安全的产品，他们将无法继续维持公司的生存？并且如今已有监管机构可以对这些公司进行追责？还是说你并不认同这种观点？</p>
<p>Sean：如果是在真空环境下，或者在一个未受到大量不同外部压力扭曲的市场中，是的，我认为确实存在这种因素。但目前我们的联邦政府从大体上来看显然并不热衷于执行监管，更不用说在这个具体领域了。</p>
<p>而且我们还处于这样一种奇怪的境地——我真不知道该怎么确切形容，但这似乎并不像是一个由大量消费者选择驱动的市场，比如，好吧，如果这些公司中的一家做了非常糟糕的事，那么他们就会看到取消订阅数量等方面受到的冲击。</p>
<p>尤其是现在，随着他们进军企业级市场，并且通过向公司销售服务赚取了绝大部分资金，在那种情况下用脚投票自然变得更加困难。企业不会仅仅因为在原则上不同意 OpenAI 的某些做法，就收拾包袱从 [OpenAI 的] Codex 转向 [Anthropic 的] Claude Code。</p>
<p>此外，他们还得到了大量投资资金的支撑，这使得他们即使真的面临这些损失，也更容易吸收消化。因此我认为这在理论上是个好想法，但我觉得在实践中，根本没有真正发生这种情况。</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会赚取微薄的佣金。这不会影响我们的编辑独立性。</p>
<p>Anthony Ha 是 TechCrunch 的周末主编。此前，他曾担任 Adweek 的科技记者、VentureBeat 的资深编辑、Hollister Free Lance 的地方政府记者，以及一家风投公司的内容副总裁。他现居纽约市。</p>
<p>您可以通过发送电子邮件至 anthony.ha@techcrunch.com 与 Anthony 联系或核实其沟通信息。</p>
<p>预订展位展台的最后一天是 9 月 18 日。不要错过在 Disrupt 展厅获取高影响力潜在客户、对接投资者以及提升品牌曝光度的机会。</p>
<p>一位 ChatGPT 创造者推出的全新 AI 模型正令开发者为之振奋<br />OpenAI 发现其模型向后继模型留存记录以隐瞒不良行为<br />最新公开的未删改法庭文件显示，微软高管称 AI 抓取数据是“人类历史上最大规模的劳动成果窃取”<br />清洁技术初创公司 Fluxnium 找到了利用可供使用 50,000 年核燃料的方法<br />前 TikTok 高管打造了一款利用 AI 教你如何摆拍照姿势的应用<br />Salesforce 与英伟达的新推理模型正是各家 AI 实验室所惧怕的一切<br />AI 基础设施公司 Cornelis 融资 2.05 亿美元，旨在逐步瓦解英伟达的主导地位</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-21 02:56 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/20/is-the-ai-industry-really-ready-to-slow-down/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-huang-ai-fears-overblown-a24da9b4fbe345bc" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="641" data-content-paragraphs="10" data-published-at="2026-09-20T18:50:18.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 02:50</span>
</div>

### [英伟达黄仁勋认为对人工智能的担忧被夸大，这并不令人意外](https://www.theverge.com/ai-artificial-intelligence/997936/nvidia-jensen-huang-ai-fears-overblown)
<div class="original-title-sub"><span class="orig-tag">原文</span> No one is surprised that Nvidia&#39;s Jensen Huang thinks AI fears are overblown.</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/08/STKP210_JENSEN_HUANG_D.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="英伟达黄仁勋认为对人工智能的担忧被夸大，这并不令人意外" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的文章将被添加到您的每日电子邮件摘要和主页推送中。</p>
<p>他声称人工智能走向世界末日的“概率为0%”。</p>
<p>该作者的文章将被添加到您的每日电子邮件摘要和主页推送中。</p>
<p>查看特伦斯·奥布莱恩（Terrence O&#39;Brien）的所有文章</p>
<p>这位可能从人工智能热潮中获利最多的人，似乎认为自己比任何人都懂得多，甚至包括那些研究和从事人工智能工作数十年的研究人员。在接受《CBS周日早新闻》（CBS Sunday Morning）采访时，他声称人工智能毁灭世界的“概率为0%”。对于那些对人工智能的危险敲响警钟的人，他还表示：“恐吓大众是没有必要的，也是不负责任的。”</p>
<p>他还声称，Anthropic首席执行官达里奥·阿莫代（Dario Amodei）和OpenAI首席执行官山姆·奥特曼（Sam Altman）等人放缓人工智能发展的呼吁“没有科学依据”。尽管发生了数起备受瞩目的模型脱离控制并黑入其他公司的案例，他甚至辩称没有必要制定新的规则、法律或指导准则。</p>
<p>黄仁勋对失控AI构成的危险以及向中国出售芯片的担忧不以为意，或者对新监管法规持坚决反对态度，这一点并不令人意外。他是全球市值最高公司的首席执行官，在福布斯全球富豪榜上排名第七。同样重要的是，他的个人财富已从2023年预估的210亿美元飙升至2026年的超过1920亿美元。人工智能行业不受约束的扩张进程中，任何微小的阻碍都可能会减缓他的身家上涨势头。</p>
<p>在下方观看完整采访。</p>
<p>每日免费精选要闻摘要。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-21 02:50 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/ai-artificial-intelligence/997936/nvidia-jensen-huang-ai-fears-overblown" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-r-to-meeting-note-taking-21021adfef8aa049" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1818" data-content-paragraphs="21" data-published-at="2026-09-20T18:32:52.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 02:32</span>
</div>

### [Vocci智能戒指为会议记录带来全新硬件形态](https://techcrunch.com/2026/09/20/voccis-ring-adds-a-new-form-factor-to-meeting-note-taking/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Vocci’s ring adds a new form factor to meeting note-taking</div>

<div class="article-body" data-article-body="true"><p>用于会议记录的各种硬件形态并不少见，包括吊坠式、胸针式以及信用卡样式的设备。但这并没有阻止Vocci推出一款针对同一应用场景的戒指形态新设备——它固然方便，但可能会引发一些隐私问题。</p>
<p>对于任何想要只需按一下按钮就能让设备开始录音的人来说，戒指形态是最便捷的选择之一。我目前正在测试的Pebble新款Index 01戒指允许你长按按钮来记笔记或设置备忘。Sandbar制造的Stream Ring运作方式类似，顶部配有控制面板。而Vocci戒指则走了一条不同的路线，将会议记录作为其核心功能。</p>
<p>这枚戒指配有一个按钮，你可以双击开始录音，再次双击停止。你可以长按按钮向Vocci AI提问，但这仅在打开配套App时有效。戒指配备了指示灯和触觉马达以提供录音反馈。它重量不足6克，非常轻便，内外表面均采用了钛金属材质——很可能是一种涂层。</p>
<p>该公司声称Vocci戒指单次充电可录制笔记长达8小时。该设备配备了一个厚重的塑料收纳盒，可为戒指充多达三次电。</p>
<p>该设备在捕捉会议内容方面表现非常出色。我在嘈杂的咖啡馆里进行过超过一小时的交谈，戒指成功将大部分交谈内容转化为准确的转录文本。不过，如果你想做简短的笔记，这种笔记方式并不是很理想。</p>
<p>软件是Vocci戒指令人失望的部分。App本身有点让人困惑。每当我做一些较短的笔记时，我看到的AI生成洞察甚至比笔记本身还要长。每次录音都包含“聊天”（主要转录文本）、“高光”（在录制对话时按键抓取的简短片段）以及“笔记”（整场对话的总结与洞察）。</p>
<p>在App中，有一个名为“Base”的标签页，你可以在其中找到转录文本、录音以及基于它们生成的任何内容，我觉得这有些多余。我也没有找到一种方法可以直接针对单次会话的转录文本与AI发起对话。</p>
<p>支持语音的戒指是记录简短备忘或提醒事项的绝佳形态。遗憾的是，该App并没有直接与提醒事项类应用进行整合。其软件的功能推出速度也较慢。该公司告知我，用户可以使用Vocci的模型上下文协议（MCP）连接到其他助手，但这一选项直到几周前才在App中上线。其他会议记录设备正在构建其平台，以允许用户通过AI自动化洞察和工作流，而目前Vocci的平台在这方面尚未完全建立成熟。</p>
<p>由于其硬件形态，该设备存在一些隐私方面的担忧。Vocci的戒指看起来就像一件普通的珠宝饰品，除非有人注意到上面的按钮。戒指配有录音指示灯，但它是朝向佩戴者本人的。在录制对话时让对方知晓是最好的做法，在某些国家和地区这也是法律所要求的。但对于这类设备，某些不怀好意的人很容易选择不透露这一信息，在无人察觉的情况下录下交谈。该公司表示鼓励人们告知对方自己正在录音，但这可能还远远不够。</p>
<p>售价249美元的这款戒指与Plaud或Pocket等其他笔记记录器相比价格偏高，这源于该设备轻巧的形态。这款戒指适合那些既不想在手机背面贴上小配件，也不想佩戴手环或吊坠的人。在硬件层面上，这类设备大多是由若干麦克风、电池以及与手机的连接模块组合而成。在未来几年里，我们可能会看到硬件会议记录器出现更多种类，直到用户挑出最适合自己的具体形态。</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会赚取少量佣金。这不会影响我们的编辑独立性。</p>
<p>Ivan在TechCrunch负责全球消费科技动态报道。他常驻印度，此前曾在《赫芬顿邮报》（Huffington Post）和The Next Web等媒体工作。</p>
<p>您可以通过发送电子邮件至 im@ivanmehta.com 或在 Signal 上发送加密消息至 ivan.42 来联系 Ivan 或核实其采访意向。</p>
<p>预订展位的最后一天是9月18日。切勿错失在Disrupt展厅获取高影响力潜在线索、对接投资人以及提升品牌曝光的机会。</p>
<p>蒂莉·诺伍德（Tilly Norwood）的媒体宣传之旅正如你对一个AI所预期的那样进展顺畅</p>
<p>出自一位ChatGPT发明者之手的新型AI模型让开发者兴奋不已</p>
<p>OpenAI发现其模型正在给后继模型留字条以隐藏不良行为</p>
<p>最新未删节文件披露，微软高管称AI数据抓取是“人类历史上最大规模的劳动窃取”</p>
<p>清洁科技初创公司Fluxnium找到了开发可用5万年核燃料的方法</p>
<p>Salesforce与英伟达联手打造的新推理模型正是各AI实验室理应忌惮的一切</p>
<p>AI基础设施公司Cornelis筹集2.05亿美元，以削弱英伟达的统治地位</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-21 02:32 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/20/voccis-ring-adds-a-new-form-factor-to-meeting-note-taking/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-nt-xbox-sony-playstation-28390fdcd9807bac" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="583" data-content-paragraphs="1" data-published-at="2026-09-20T18:15:10.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 02:15</span>
</div>

### [小岛工作室否认有关工作室陷入困境的报道](https://www.theverge.com/games/997880/hideo-kojima-productions-physint-xbox-sony-playstation)
<div class="original-title-sub"><span class="orig-tag">原文</span> Kojima Productions disputes reports the studio is in trouble</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25145145/1831287900.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="小岛工作室否认有关工作室陷入困境的报道" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该话题的相关动态将被添加到您的每日邮件文摘及主页信息流中。<br />工作室发布声明称，“工作室正处于健康且盈利的状态。”<br />该作者的相关动态将被添加到您的每日邮件文摘及主页信息流中。<br />查看 Terrence O&#39;Brien 的全部文章<br />在索尼宣布放弃小岛秀夫的《Physint》，并且这位《合金装备》创作者的最新作品将转投 Xbox 平台之后，关于双方决裂的传闻甚嚣尘上。彭博社报道称，促成这一决定的原因有多方面，包括未能按期交付、对预算和盈利能力的担忧，以及限时独占问题。<br />在接受 IGN 采访时，小岛秀夫表示，考虑到整个行业广泛出现多家工作室倒闭的现状，他曾对小岛工作室的前景感到担忧：<br />“我知道游戏行业有很多工作室倒闭、许多项目被取消的消息，我也理解整个行业的处境。但我原本以为《Physint》没问题，以为《Physint》是安全的。因此我感到很震惊……如果我们失去了一份合同，我当时在想，我是不是不得不裁掉所有参与《Physint》项目的人？抑或是因为现金流枯竭，我们的工作室最终可能会倒闭。”<br />该工作室现已在社交媒体上发布声明表示，尽管有报道称《死亡搁浅》及其续作的销量令人失望，且失去了索尼的资金支持，但工作室目前“处于健康且盈利的状态”。此外，声明还补充道，其“与 PlayStation 的关系依然稳固”。<br />免费提供最重要新闻的每日文摘。<br />这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-21 02:15 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/games/997880/hideo-kojima-productions-physint-xbox-sony-playstation" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-rn-textbooks-into-tiktok-2c549dbb779ab09e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1801" data-content-paragraphs="17" data-published-at="2026-09-20T18:00:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 02:00</span>
</div>

### [ScrollEd拟将教科书变为TikTok式的刷屏信息流](https://techcrunch.com/2026/09/20/scrolled-wants-to-turn-textbooks-into-tiktok/)
<div class="original-title-sub"><span class="orig-tag">原文</span> ScrollEd wants to turn textbooks into TikTok</div>

<div class="article-body" data-article-body="true"><p>社会各界一直在哀叹我们被数字化侵蚀的大脑和金鱼般的短暂注意力，并将我们无法静下心来读一本书或备考的原因归咎于无休止的“刷负面信息”（doomscrolling）。但如果解决之道不是停止刷屏，而是重新思考我们刷屏所浏览的内容呢？</p>
<p>这正是初创公司ScrollEd所下的赌注。这家位于帕洛阿尔托的初创公司正在参加TechCrunch Disrupt Startup Battlefield 200竞赛，其提出的新颖构想是：如果学生不愿翻开教科书，那就让教科书主动以信息流的形式展现在他们面前。</p>
<p>ScrollEd开发了一款应用程序，允许用户将任何文本文件——包括枯燥的PDF或教科书——转化为极具Instagram Reels或TikTok风格的信息流。在用户滑动屏幕时，内容会以AI生成的视频、音频、文本甚至互动测验的形式呈现。向上轻扫会呈现一个新主题，而向侧面轻扫则可以让你深入探索当前主题，并在最后为你提供一个小测验。</p>
<p>“年轻一代正日益转向纯短格式、竖屏信息流（尤其是我们交谈过的那些18岁年轻人！），这给任何需要深度的媒介都带来了挑战，”ScrollEd联合创始人乌特萨夫·古普塔（Utsav Gupta）在一封电子邮件中向TechCrunch表示。“我们希望迎合他们的习惯……我们只需要审慎对待使用方式，并选择不在平台上盲目最大化用户留存时长。”</p>
<p>“短视频可以激发你的好奇心；顺着这种好奇心去探索，可能意味着寻找另一种解释或直接离开应用，”古普塔继续说道。“我们希望深入学习变得像滑动到下一个视频一样简单。”</p>
<p>今年，古普塔与其联合创始人兼妻子丽贝卡·内夫（Rebecca Neff）共同自筹资金创立了ScrollEd，此前两人都注意到，在睡前刷屏后总会感到内心空虚与不满。两人目前都是学生——古普塔在斯坦福大学研究人工智能与人类目标，内夫在宾夕法尼亚大学攻读计算机科学。</p>
<p>古普塔表示，这家初创公司的目标受众包括教育机构、企业培训项目以及那些“只是想刷点更有价值的内容”的个人。</p>
<p>ScrollEd采用免费增值模式，将免费的消费者信息流与付费的ScrollEd Pro订阅以及年度机构授权结合起来。机构通过该平台分发教学材料并付费，以换取有关参与度、学习进度及其他数据的报告。</p>
<p>在接下来的几个月里，ScrollEd计划专注于面向消费者的产品发布、建立其课程库和信息源核查工作流，并开展针对机构的试点项目。（事实上，该公司将在Disrupt大会上推出其消费者业务。“我们希望能‘颠覆’社交媒体和短视频格式！”古普塔打趣道。）</p>
<p>这家初创公司还在搭建底层架构，未来将使教育工作者能够评估单个学习者的情况并针对其需求进行自适应调整。</p>
<p>“我们的雄心是打造一个对你更有益的社交网络，”古普塔说道。</p>
<p>快来看看ScrollEd以及TC编辑团队审核过的其他优秀初创公司，你一定会想在即将于10月13日至15日在旧金山市中心举行的TechCrunch Disrupt上一睹它们的风采。您可以在此处了解更多详情并购票。</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会赚取少量佣金。这不会影响我们的编辑独立性。</p>
<p>丽贝卡·贝兰（Rebecca Bellan）是TechCrunch的高级记者，负责报道塑造人工智能的商业、政策和新兴趋势。她的作品还曾发表在《福布斯》、《彭博社》、《大西洋月刊》、《每日野兽》等出版物上。</p>
<p>您可以通过发送电子邮件至 rebecca.bellan@techcrunch.com 或通过 Signal 加密消息（账号：rebeccabellan.491）联系丽贝卡或核实其外联信息。</p>
<p>预订展位的最后一天是9月18日。切莫错失在Disrupt展厅获得高影响力潜在客户、接触投资人以及提升品牌知名度的良机。</p>
<p>来自ChatGPT发明者的新型AI模型令开发者兴奋不已<br />OpenAI抓到其模型向后续版本留便签以隐瞒不良行为<br />新披露的未经删改的文件显示，微软高管称AI抓取是“人类历史上最大规模的劳动盗窃”<br />清洁技术初创公司Fluxnium找到了开发可用5万年核燃料的方法<br />TikTok前高管开发了一款利用AI教你拍照姿势的应用程序<br />Salesforce与英伟达推出的新推理模型正是各大AI实验室应当忌惮的<br />AI基础设施公司Cornelis融资2.05亿美元，力图削弱英伟达的垄断地位</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-21 02:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/20/scrolled-wants-to-turn-textbooks-into-tiktok/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ut-next-year-sources-say-f55f1ed9949fcf5c" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1198" data-content-paragraphs="8" data-published-at="2026-09-20T17:38:50.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/hackernews.svg" class="source-icon" alt="Hacker News (科技前沿论坛)" width="16" height="16" /> <strong>Hacker News (科技前沿论坛)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 01:38</span>
</div>

### [三星明年HBM4与HBM4E DRAM产量预计将翻倍以上](https://en.sedaily.com/finance/2026/09/20/samsung-to-double-hbm4-output-next-year-sources-say)
<div class="original-title-sub"><span class="orig-tag">原文</span> Samsung is expected to more than double output of its HBM4 and HBM4E DRAM</div>

<div class="article-body" data-article-body="true"><p>HBM月产能将扩大至25万片晶圆；高层堆叠必备的玻璃载板备受关注；外包玻璃载板需求将增加2.5倍；第六代与第七代芯片预计占总产量的80%。</p>
<p>三星电子（005930）明年包括第六代HBM4和第七代HBM4E在内的HBM4系列高带宽内存芯片产量预计将增加一倍以上，因为该公司计划将玻璃载板（glass carrier）的需求量较今年提高2.5倍。玻璃载板是在HBM DRAM晶圆减薄过程中用于固定晶圆的玻璃支撑衬底。</p>
<p>据半导体行业人士20日透露，三星明年将把作为HBM生产核心材料的玻璃载板的外包清洗量从今年的每月2万片提高至每月5万片。玻璃载板的需求量就在去年还仅为每月1万片，今年实现翻倍，预计明年将进一步增长2.5倍。</p>
<p>玻璃载板是一种临时贴合在HBM DRAM晶圆底部的支撑板，用于在晶圆减薄研磨和钻孔过程中防止其发生弯曲或开裂。由于HBM需要在有限的厚度内堆叠多层DRAM裸晶，随着堆叠层数的增加，晶圆减薄技术和控制翘曲的工艺变得愈发关键。</p>
<p>三星准备量产扩产的HBM4和HBM4E产品主要集中在12层及以上的堆叠架构。行业分析师表示，即使考虑到玻璃载板清洗后可重复使用，且消耗量因工艺装载方式和良率而有所差异，相关用量增加2.5倍也极有可能意味着HBM4和HBM4E的产量将较今年增长至少两倍。</p>
<p>今年2月，三星开始大规模量产出货采用10纳米级第六代（1c）DRAM以及基于4纳米工艺基础底模（base die）制造的HBM4。5月，三星还向包括英伟达（Nvidia）在内的客户提供了12层HBM4E样品。</p>
<p>以月均晶圆投入量计，业内预计三星明年的HBM生产规模将从今年的约18万片晶圆增长近40%，达到约25万片。按产品出货结构来看，随着HBM4E量产进程的加快，HBM4系列产品的占比预计将从今年的40%左右上升至明年的约80%。一位业内人士表示：“随着三星扩大HBM产能，该公司似乎正将高附加值的HBM4置于核心战略地位。”</p>
<p>原文报道由《首尔经济日报》（Seoul Economic Daily）徐钟甲（Seo Jong-gap）提供。<br />由韩文经AI翻译。援引外文信源的引言基于韩文报道，可能无法完全反映最初原话。<br />关注 · 首尔经济日报<br />◆ SIGNAL 英文版<br />免费浏览 · 5折体验价<br />首尔经济日报（社论）<br />首尔经济日报<br />编委会（观点）<br />独立数据项目<br />只需一个出生日期，即可查看您的命盘、运势周期、今日流动、财富、事业与理想伴侣。<br />针对韩国综合股价指数（KOSPI）和科斯达克（KOSDAQ）所有板块的实时市值加权视图，提炼出按公司划分的当日韩文报道——专为需要在下一交易日前了解韩国市场的外国投资者、特派记者和分析师打造。<br />韩国市场的英文知识图谱——企业、媒体、政府与韩国国会之间如何循环互动。韩国指定的实际控制人及认定的企业集团属于制度机制，而非不可捉摸的盲目风险。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Hacker News (科技前沿论坛)】于 2026-09-21 01:38 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Hacker</span>
</div>

<div class="news-card-footer"><a href="https://en.sedaily.com/finance/2026/09/20/samsung-to-double-hbm4-output-next-year-sources-say" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Hacker News (科技前沿论坛)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-t-disclose-political-ads-e3fbc059f72efaf1" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="730" data-content-paragraphs="11" data-published-at="2026-09-20T16:30:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 00:30</span>
</div>

### [加州新法将惩罚未披露政治广告的网络红人](https://techcrunch.com/2026/09/20/new-california-law-will-penalize-influencers-dont-disclose-political-ads/)
<div class="original-title-sub"><span class="orig-tag">原文</span> New California law will penalize influencers who don’t disclose political ads</div>

<div class="article-body" data-article-body="true"><p>加利福尼亚州州长加文·纽森（Gavin Newsom）签署的一项新法案，强化了对接受报酬发布政治内容网络红人的信息披露要求。</p>
<p>《纽约时报》报道称，加州此前已要求发布涉及州或地方竞选内容的网络红人进行信息披露，但当有人未予披露时，并不会面临罚款或刑事处罚。（得克萨斯州同样要求对付费政治内容进行披露，其他州也正在考虑类似的法规。）</p>
<p>根据这项新通过的 AB 1130 号法案，监管机构可对网络红人的每次违规行为处以最高 5,000 美元的罚款，并可将其移交执法部门以追究潜在的轻罪责任。</p>
<p>据《纽约时报》报道，亿万富翁汤姆·斯泰尔（Tom Steyer）在今年早些时候竞选加州州长民主党提名未果期间，曾花钱雇佣数十名网络红人在网上发布有关其竞选活动的内容，其中许多人最初并未披露这笔报酬。</p>
<p>纽森签署该法案是作为更广泛一揽子法案的一部分，其办公室表示，该系列法案将防止来自唐纳德·特朗普（Donald Trump）总统潜在的选举干预。该法案的发起人、民主党籍州众议员马克·伯曼（Marc Berman）表示，他在意识到“[现行]法律及其执行方式存在一些模糊之处”后提出了这项法案。</p>
<p>预订展位最后截止日期为 9 月 18 日。千万不要错过 Disrupt 展厅中具有高影响力的新线索、接触投资者的机会以及品牌展示焦点。</p>
<p>每个工作日和周日，您都可以获取 TechCrunch 最优质的新闻报道。</p>
<p>TechCrunch Mobility 是您获取交通领域新闻与洞察的目的地。</p>
<p>初创公司是 TechCrunch 的核心，敬请每周查收我们最优质的报道。</p>
<p>为推动行业发展的风云人物提供开启新一天所需的资讯。</p>
<p>提交您的电子邮件，即表示您同意我们的条款和隐私声明。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-21 00:30 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/20/new-california-law-will-penalize-influencers-dont-disclose-political-ads/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-hen-an-av-is-safe-enough-cc88ee8aeea04030" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3138" data-content-paragraphs="36" data-published-at="2026-09-20T16:02:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-21 00:02</span>
</div>

### [TechCrunch 移动出行：我们如何判断自动驾驶汽车何时“足够安全”？](https://techcrunch.com/2026/09/20/techcrunch-mobility-how-do-we-know-when-an-av-is-safe-enough/)
<div class="original-title-sub"><span class="orig-tag">原文</span> TechCrunch Mobility: How do we know when an AV is safe enough?</div>

<div class="article-body" data-article-body="true"><p>对于自动驾驶汽车开发者、监管机构和公众而言，最棘手的问题之一是确定自动驾驶技术何时在道路上达到“足够安全”的标准。到目前为止，这个问题在很大程度上一直由行业自身来回答——即那些将自动驾驶技术应用于无人驾驶卡车、无人出租车（robotaxis）以及未来可能拥有的私家车上的企业。</p>
<p>如今，尚无用于评估自动驾驶系统在现实世界中表现如何的标准化测试。我们要求人类在取得驾照前必须通过驾驶考试，但对于自动驾驶汽车技术，却还没有同等的测试或评判体系。</p>
<p>那么，我们如何才能知道一辆自动驾驶汽车是否是一个合格且安全的“司机”？美国国家公路交通安全管理局（NHTSA）表示，他们正在制定解决方案。</p>
<p>联邦机动车安全标准（FMVSS）已经对汽车制造商当今销售的车辆进行了规范。但这些 FMVSS 规则并不是针对特斯拉 Cybercab 和 Zoox 无人出租车这类车辆设计的，因为它们缺乏传统且联邦法规要求的踏板、方向盘等设备，以及后视镜和外侧后视镜等设计部件。</p>
<p>NHTSA 正在制定一套联邦自动驾驶汽车框架。该机构表示，这套框架将以安全为基石，同时不会扼杀创新；或者如该局局长乔纳森·莫里森（Jonathan Morrison）本周所言，避免让该机构在政策决策上面临“打地鼠”的窘境，或试图去预判技术将如何演进。要拿捏好这其中的平衡绝非易事。</p>
<p>本周，该机构向这一目标迈出了显著一步：与国际自动机工程师学会（SAE）达成协议，启动了 ASCEND 倡议。这是一项旨在加快以数据驱动的自动驾驶汽车性能标准开发的政企合作项目。</p>
<p>“该联盟的首要任务是确立自动驾驶系统（ADS）的能力基准，这将为出台相应的联邦机动车安全标准提供依据并加快其制定进程，”莫里森在匹兹堡举行的 AI Horizons 峰会上表示。“最终，我们的 ADS 性能规则制定将在此领域确立联邦领导地位。通过发布自动驾驶能力标准，我们希望能够解决以往各州和地方层面要求不一、拼凑割裂且不断滋生的问题，并继续鼓励美国本土的创新，推动这些车辆在道路上的安全部署与发展。”</p>
<p>该联盟目前尚未给出出台 ADS 标准的时间表。但我敢肯定，自动驾驶行业已经开始深入参与并发表意见了。</p>
<p>注：想听莫里森的完整发言？请查看 AI Horizons 峰会的视频，并快进至 04:36:00 处。</p>
<p>我们正在筹备一些新选题，但尚未准备好对外公开。特此提醒，欢迎向我们爆料！</p>
<p>请发送邮件至 Kirsten Korosec（kirsten.korosec@techcrunch.com）或联系其 Signal（kkorosec.07），亦可发送邮件至 Sean O’Kane（sean.okane@techcrunch.com）。</p>
<p>华尔街会投资一家纯无人出租车（Robotaxi）公司吗？我们很快就能见分晓。</p>
<p>自动驾驶汽车公司 May Mobility 计划通过与特殊目的收购公司（SPAC）ACP Holdings Acquisition Corp. 合并上市，此项交易按 14 亿美元的估值有望筹集超过 3 亿美元资金。</p>
<p>目前还有其他开发自动驾驶技术的上市公司：专注于自动驾驶卡车的 Aurora 和 Kodiak、Rivian 以及特斯拉。尽管 Waymo 目前（尚）未上市，但其母公司 Alphabet 是上市公司。亚马逊旗下的 Zoox 亦是如此。</p>
<p>但目前在三个地区运营自动驾驶丰田塞纳（Toyota Sienna）车队的 May Mobility 表示，它将成为美国首家完全专注于自动驾驶网约车业务的上市公司。资深记者肖恩·奥凯恩（Sean O&#39;Kane）指出，这也将是对 May Mobility 在自动驾驶领域坚持的“轻资产”与“合作伙伴优先”模式的一次考验。</p>
<p>其他引起我注意的交易与动态……</p>
<p>自动驾驶汽车公司 Beep 已与总部位于迈阿密的按需公共交通企业 Freebee 合并。合并后的新公司将被命名为 Beep，由 Beep 联合创始人凯文·里德（Kevin Reid）担任董事长兼首席执行官。Freebee 联合创始人克里斯·金博尔（Kris Kimball）和杰森·斯皮格尔（Jason Spiegel）将分别出任首席运营官以及总裁兼首席增长官。</p>
<p>Lucid Motors 与欧洲移动出行平台 Bolt 达成合作，“部署至少 25,000 辆全自动驾驶汽车”。这些车辆将基于该电动汽车制造商即将推出的中型电动车架构打造，预计将比其现有产品尺寸更小且价格更亲民。</p>
<p>R3 Lithium，一家总部位于佐治亚州的电池回收初创企业，完成了 1500 万美元的 A 轮融资，投资方包括 TDK Ventures、Integral GlobalTech Partners 和 Axial Partners。</p>
<p>通用汽车（GM）为其全尺寸皮卡雪佛兰索罗德（Chevy Silverado）和 GMC Sierra 推出了全新的用户界面，改版内容包括支持 Apple CarPlay 和 Android Automotive 的画中画显示功能。</p>
<p>一架配备 Joby Aviation 自动驾驶技术的飞行器在美国境内飞行超过 3,100 英里，全程没有任何人类飞行员介入操控。正如我在文章中所指出的，这绝不仅仅是一次博人眼球的技术演示。</p>
<p>黑客组织 ShinyHunters 公布了来自佛罗里达州车辆与驾驶员信息数据库的数十万份文件。</p>
<p>在美国众议院以压倒性多数通过《每辆车配备 AM 广播法案》（AM Radio for Every Vehicle Act）后，美国汽车制造商可能在未来一年内被强制要求在新车中装配 AM 收音机。此前电动车制造商一直在回避 AM 接收器，因为电动机产生的电磁干扰会影响 AM 广播使用的频段。</p>
<p>大众汽车（Volkswagen）推出了一款效率创下新纪录的原型电动汽车。</p>
<p>在旗下一辆车辆遭遇山洪被冲走五个月后，Waymo 重新启动了在得克萨斯州圣安东尼奥的无人出租车服务。该公司还在拉斯维加斯推出了新的无人出租车服务，并宣布进军新加坡，将在当地展开地图测绘并最终测试其自动驾驶技术。</p>
<p>Wayve 聘请了埃利莎·德·马特尔（Elisa de Martel）出任下一任首席财务官，她曾在包括 Waymo 在内的多家科技公司担任高级财务管理职务。</p>
<p>Zoox 目前在拉斯维加斯受到 100 辆车的运营规模上限限制，而这是其开展商业服务的唯一市场。该上限将于 9 月 25 日到期，从而为这家亚马逊旗下的公司扩大其定制无人出租车商业车队扫清障碍。</p>
<p>当您通过我们文章中的链接购买商品时，我们可能会赚取少量佣金。这不会影响我们的编辑独立性。</p>
<p>交通出行版块编辑</p>
<p>预订展位的最后一天是 9 月 18 日。不要错过在 Disrupt 展览大厅获得高价值线索、接触投资人以及提升品牌曝光的机会。</p>
<p>蒂莉·诺伍德（Tilly Norwood）的媒体巡回宣传进展如何？大致就如同你对一个 AI 所能预期的那样</p>
<p>来自一位 ChatGPT 发明者的新型 AI 模型让开发者兴奋不已</p>
<p>OpenAI 发现其模型在向后续版本留言以掩盖不良行为</p>
<p>最新未删节诉讼文件披露：微软高管称 AI 爬取数据是“人类历史上最大规模的劳动成果盗窃”</p>
<p>清洁科技初创企业 Fluxnium 找到了一种开采可供使用 50,000 年核燃料的方法</p>
<p>Salesforce 与英伟达（Nvidia）的新推理模型正是所有 AI 实验室所惧怕的一切<br />AI 基础设施公司 Cornelis 融资 2.05 亿美元以蚕食英伟达的主导地位</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-21 00:02 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/20/techcrunch-mobility-how-do-we-know-when-an-av-is-safe-enough/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

::::