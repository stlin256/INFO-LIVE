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
<div id="story-rrent-editing-with-crdts-90b743f2f33280e8" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5354" data-content-paragraphs="40" data-published-at="2026-09-20T12:06:29.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 20:06</span>
</div>

### [Notion 如何借助 CRDT 处理并发编辑](https://www.notion.com/blog/how-notion-handles-concurrent-editing-with-crdts)
<div class="original-title-sub"><span class="orig-tag">原文</span> How Notion handles concurrent editing with CRDTs</div>

<div class="article-body" data-article-body="true"><p>作者：Angelique Nehmzow, Emma Guo</p>
<p>Notion 的编辑器通常用于协作场景，成百上千人的团队在此共同书写和工作。但直到 2025 年，Notion 并不是真正意义上的协作工具。为了帮助人们更无缝地协同工作，我们重新设计了用于文本编辑的底层系统和数据模型。这包括实现一个用于无冲突富文本编辑的系统，并开发相应技术来支持 Notion 基于块（block）的文档模型下的特有场景。</p>
<p>首先，让我们设想有两位用户 Emma 和 Charlie 正在编辑这个块：</p>
<p>Emma 将文本更新为：</p>
<p>而 Charlie 将文本更新为：</p>
<p>Emma 和 Charlie 手中各有一个未察觉对方编辑行为的块版本。他们正在进行“并发”编辑。</p>
<p>理想情况下，服务器应将这两次更新合并：</p>
<p>然而，服务器以往是按照块记录更新到达的先后顺序进行处理，后到达者决定最终结果：“Build things quickly”或“Build cool things”。在这种“最后写入者获胜”（last write wins, LWW）机制下，其中一人的修改会被彻底丢失。随着协作者人数的增加，某人的修改被他人覆盖的几率也随之升高。</p>
<p>Notion 页面此前依然让人感觉具有相当的协作性，因为页面通常由多个块构成，每个块均作为独立的数据库记录存储。人们可以并发编辑不同的块而不会彼此覆盖，但对同一块的编辑仍可能产生冲突，导致用户丢失修改。此外，上线离线模式（Offline Mode）还会进一步加剧这种数据丢失的风险。在离线状态下编辑页面的用户，如果在重新联网前有其他人编辑了相同的块，该用户的所有修改都可能会丢失。</p>
<p>那么，我们是如何解决这个问题的？我们使用了一种无冲突复制数据类型（Conflict-free Replicated Data Type，简称 CRDT）来支持跨 Notion 块的富文本编辑，允许用户并发地编辑、拆分和合并文本。</p>
<p>CRDT 是一种允许多个客户端保留同一份数据的本地副本，并确定性地合并并发修改的数据结构。使用 CRDT 的主要原因在于确保并发编辑能够被合并，且不丢失任何人的修改。即使修改没有丢失，每位协作者的意图也不一定能被完美保留。如果 Emma 希望文本完全是“Build cool things”，合并后的结果便无法达成该目标。但在较长的文档中，人们通常修改的是同一段文本中距离较远的部分，CRDT 在这些场景下能很好地保留用户意图。</p>
<p>我们使用的 CRDT 基于一种名为可扩展复制数组（Replicated Growable Array, RGA）的经典序列 CRDT。RGA 是一种树状数据结构，其中包含所有曾被插入其中的字符，每个字符均表示为一个带有唯一且稳定 ID 的节点。插入或删除文本的操作均可引用这些 ID。我们将这些节点称为“文本项”（text items），将所引用的 ID 称为“基准”（origins）。该树由起始项和结束项进行初始化。让我们来看最初的示例：</p>
<p>插入的字符表示如下：</p>
<p>这是一个在基准 A@6 之后插入“c”的插入操作：</p>
<p>我们看到 ID 为 A@6 的项是一个空格字符：</p>
<p>这是应用 Emma 插入“cool”的操作以及 Charlie 插入“quickly”的操作后所得到的树：</p>
<p>删除操作会将一个项标记为已移除，但会将其作为“墓碑”（tombstone）保留下来。这是因为可能存在正在传输中或离线的操作依赖于被删除字符的 ID。如果直接从树中移除这些项，将意味着我们无法得知后续操作应该应用在何处。</p>
<p>这些是删除“cool”之后所得到的墓碑：</p>
<p>在上述示例中，我们使用了类似 A@1 的 ID，其中 A 是“会话 ID”（session ID）的简化形式，用于区分客户端会话；1 是兰伯特时钟（Lamport clock），代表递增的逻辑时间戳。会话 ID 与兰伯特时钟相结合确保了 ID 的唯一性：两个客户端的时钟值可能发生碰撞，但会话 ID 不会；单个客户端总是基于其获知的最高（严格来说是最新）时钟值来递增兰伯特时钟。</p>
<p>指向同一基准的项会进行排序，拥有最新逻辑时间戳的项排在最前面，若时间戳相同则以会话 ID 作为决胜依据（tie-breaker）。</p>
<p>这些在 A@12 之后插入的操作分别具有 ID E@18 和 C@13：</p>
<p>由于 18 大于 13，它们总是会解析为：</p>
<p>我们可以通过不为每个单独字符分配专属 ID 来提升存储效率。字符通常组合成单词，因此我们可以改为为来自同一会话和兰伯特时钟的连续字符序列分配一个 ID，并额外存储该序列的长度。</p>
<p>我们之前删除“cool”的示例便可简化为：</p>
<p>Notion 文档具有丰富的格式，例如粗体、斜体和页面提及。这意味着我们不仅需要解决文本编辑产生的冲突，还需要解决应用富文本样式标注所产生的冲突。</p>
<p>现在，假设 Charlie 应用了粗体：</p>
<p>而 Emma 同时应用了斜体：</p>
<p>我们希望最终文本同时包含这两种样式标注：</p>
<p>为了支持富文本，我们引入了基于 Peritext 算法的操作。我们的 CRDT 树存储了在文本项上添加和移除样式标注的操作。随后，我们可以在解析树时应用这些标注。</p>
<p>将“cool things”加粗将创建类似如下的操作，其中“start”和“end”定义了被标注的范围：</p>
<p>“start”和“end”定义了紧接在某项边界之前或之后的锚点（anchor point）。在此情况下，锚点分别位于紧靠 E@13 之前和紧靠 C@13 之前：</p>
<p>这些锚点使我们能够指定一项样式标注是否“可扩展”（extendable）。粗体是一种可扩展的样式标注，这意味着如果有人在某段粗体文本的末尾打字，新文本也是粗体。这就是为什么结束锚点是“C@13 之前”，因为 A@12 之后（但在 C@13 之前）的文本依然保持粗体。</p>
<p>相比之下，超链接则不是可扩展的样式标注。如果“cool things”被添加了超链接，结束锚点将是“A@12 之后”。这是因为当用户紧接在字符“s”之后打字时，我们不希望后续文本也附带超链接。</p>
<p>一个文本项上可能附加有多个样式标注。为了支持重叠标注，每个文本项都可以存储一个标注操作数组。一项样式标注可能会跨越多个项，但我们仅将其操作存储在首个项上；ID 范围则指明其余部分。</p>
<p>在 Notion 中，当用户在一个块的中间按下回车键（“Enter”）时，会在其后创建一个新块，文本随之被拆分到这两个块中。</p>
<p>在接下来的示例中，Emma 在“Build”之后拆分了块：</p>
<p>而 Charlie 同时在末尾追加了一个空格和单词“quickly”：</p>
<p>结果应该是：</p>
<p>如果 Emma 的拆分操作先被应用，Charlie 新增的内容理应落入新块（块 B）中，尽管 Charlie 最初是在原块（块 A）中进行的修改。这意味着我们需要一种方法来识别用户正在编辑哪个块，因为并发编辑意味着用户的编辑操作所指向的基准可能已不再存在于同一条数据库记录中。</p>
<p>为了支持可能在不同块（block）之间同时移动的文本编辑，我们需要开发几个新概念。<br />第一个概念是我们称之为“文本切片”（text slice）的技术。一个块中的文本项属于一个文本切片，并且每个块在初始化时都会带有一个空的文本切片。当 Emma 拆分块 A 时，其中的文本切片被拆分为两个，第二个文本切片被移动到块 B 中。<br />属于同一个块的文本切片被组织成一棵树，我们称之为“文本切片树”（text slice tree），它代表了该块中的文本。一棵文本切片树可以包含源自不同块的切片。<br />当 Emma 拆分块 A 时，这两个块的文本切片树会发生如下变化。重建每棵树即可得出其所在块中的文本：<br />文本切片还归属于一个“文本实例”（text instance），这是由源自同一个初始切片的各个切片组成的逻辑分组，并带有着产生该初始切片的块的 ID。虽然切片可能会被拆分或随意移动，但它始终保持相同的文本实例。这意味着一个块可以包含来自多个文本实例的文本切片：<br />我们可以将文本实例用作操作中引用的稳定标识符。这样，我们就能维护一个文本实例到包含该实例任意文本切片的各个块之间的映射关系。每当一个块接收到来自新文本实例的文本切片时，我们就会更新该映射。当我们收到针对特定文本实例的操作时，我们会使用此映射来确定要获取哪些块，以便定位并编辑目标切片。<br />应用 Emma 的拆分后，映射关系显示来自实例 A 的切片同时存在于块 A 和块 B 中：<br />Charlie 插入“quickly”的操作仍然可以引用块 A，但此时是将其作为文本实例 ID，而非块 ID 进行引用：<br />然后，我们可以使用“文本实例 ↔ 块”的映射来获取相关块（在此例中同时获取块 A 和块 B），以找到要编辑的文本切片。<br />这种设计的一个局限性在于，为了找到特定的文本切片，你可能需要获取大量的块，因为无法直接通过文本切片来反查块。服务器会加载包含来自相关文本实例的任意切片的所有块。如果将一个块拆分 99 次，你最终会得到 100 个块，其中每个块都包含来自同一个文本实例的切片。这意味着为了在这些切片之一中插入一个字符，你的“实例 ↔ 块”映射会告诉你需要获取 100 个块，然后你必须遍历它们的文本切片树来找到目标文本切片。<br />为了解决这个问题，我们设计了所谓的“搜索标签”（search label）。每个文本切片都有一个搜索标签，在文本实例内部对其进行唯一标识。文本切片初始时带有一个空标签，每次被拆分时，我们都会在标签后追加 L 或 R。<br />以下是 Emma 拆分块 A 之后的搜索标签：<br />如果她继续将“things”拆分为“thing”和“s”，那么“thing”的标签将变成 RL，而“s”的标签将变成 RR：<br />我们可以将搜索标签添加到“文本实例 ↔ 块”的映射中，并包含在操作内，然后利用它在查询映射时限制返回的块数量。<br />让我们回到前面的例子。Emma 拆分了“Build things”：<br />映射表包含了这些标签：<br />假设 Charlie 的客户端已感知到该更新，并且他插入了“quickly”。他的操作将包含标签 R：<br />当我们查询映射时，我们搜索实例 A 且标签同样以 R 开头的块，此时实际上只需要获取一个块（而此前需要获取两个）。<br />我们之所以寻找标签以给定标签开头的块匹配项，而不是完全匹配它，是因为目标切片可能已被并发拆分。如果 Emma 在 Charlie 追加内容的同时拆分了“things”（并且她的更改先一步落地），即使目标切片现在的标签是 RR，Charlie 的操作仍将包含标签 R。<br />在实际应用中，我们并非字面上将类似 LRL 的标签存储在文本切片上并在 Postgres 中通过 .. label LIKE &#39;LR%&#39; 来搜索。相反，我们采用了一种紧凑编码，将存储效率提升了五倍。<br />虽然我们尚未对此进行验证，但我们推测这种处理拆分块的方法可能同样适用于将文本块建模为独立节点的其他文本编辑系统。例如，在使用 Yjs 的 ProseMirror 编辑器中，拆分操作被建模为在第一个块中执行删除并在第二个块中执行插入。因此，并发编辑可能会停留在原始节点中，而我们的方法则能在拆分发生时保留其预期的位置。<br />我们制作了这个小组件，以演示本篇博文中介绍的一些思路。希望你能通过体验它获得乐趣，并有助于加深对我们 CRDT 系统的理解。<br />在 Notion，我们的规模和灵活的数据模型在将 CRDT 研究理念引入现实世界协同编辑器的过程中，带来了诸多有趣而切实的挑战。<br />2025 年 7 月，我们将该系统部署到了生产环境，随着我们每分钟处理数百万次 CRDT 操作，它成为了全球规模最大的 CRDT 部署之一。<br />我们的 CRDT 数据模型还支持离线模式以及 Agent 协同，并为未来的功能奠定了坚实的基础。我们很高兴能够利用这个基础来改进我们展示实时协作者在线状态的方式，或者批量合并建议以便能够一同发布和接受。<br />编辑器是我们工作和协作的核心，但人们很容易忽视幕后支撑它的技术。我们希望这篇博文能让你窥探到像“共同打字”这样简单的事情背后所涉及的部分复杂性，并激发你对日常工具构建方式的好奇心。<br />如果没有 Angelique Nehmzow、Atul Varma、Ben Hughes、Charlie Andrews-Jubelt、Emma Guo、Fabricio Pontes Harsich、Jake Peyser、Kathleen Gao、Matthew Weidner、Michael Kuo、Rohit Valiveti、Ryan Billard、Shahan Khan、Slim Lim、Stephan Boyer 以及 Yifei Shen 的贡献，这项工作不可能完成。<br />对解决此类问题感兴趣吗？我们一直在寻找想要构建协同软件未来的优秀工程师。请查看我们在 notion.com/careers 上的开放职位。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>在 2025 年之前，Notion 在同一文本块（block）的并发编辑中采用“最后写入者获胜”（Last Write Wins, LWW）机制，后到达的更新会完全覆盖先前的编辑造成数据丢失。</li>
    <li>推出离线模式（Offline Mode）会增加用户编辑被覆盖丢失的风险。</li>
    <li>来源叙事重点：详细阐述 Notion 为支持真正协同与离线模式，从传统的“最后写入者获胜”（LWW）架构重构为基于 CRDT（RGA 算法）与 Peritext 算法的富文本架构，并设计 text slice/instance 及 search label 等机制解决块（Block）结构特有挑战的技术实现方案与演进历程。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://www.notion.com/blog/how-notion-handles-concurrent-editing-with-crdts" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-goat-prevalence-concerns-7e4c1c7d56cc0667" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="271" data-content-paragraphs="3" data-published-at="2026-09-20T12:00:15.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 20:00</span>
</div>

### [美国对狂犬病的担忧加剧——但目前尚不清楚这种致命疾病是否真正有所增加](https://www.theguardian.com/us-news/2026/sep/20/rabies-beaver-goat-prevalence-concerns)
<div class="original-title-sub"><span class="orig-tag">原文</span> Rabies concerns grow in the US – but it’s unclear if there’s an increase of the fatal disease</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/33fcb9e9f8efe20a3d68f85e1a959ee3d2202341/532_322_2932_2345/master/2932.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=61123b8bd91fdb17287fee9accfd90c7" alt="美国对狂犬病的担忧加剧——但目前尚不清楚这种致命疾病是否真正有所增加" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>北卡罗来纳州一家宠物动物园内患有狂犬病的山羊，以及马里兰州一只患病海狸袭击男孩的事件，让公众神经紧绷。</p>
<p>专家表示，近期涉及人类与狂犬病动物的不寻常事件，以及随后美国疾病控制与预防中心（CDC）发布的健康警告，引发了人们对狂犬病的担忧，但目前尚不清楚美国境内的这种致命疾病病例是否真正有所增加。</p>
<p>据新闻报道，近几个月来，患狂犬病的海狸在马里兰州袭击了三人；而在北卡罗来纳州的一家宠物动物园，数百人接触了患狂犬病的山羊。美国疾病控制与预防中心于9月10日发布了一项健康警告，“以回应近期关于人类接触狂犬病或疑似狂犬病动物事件有所增加的报告”。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>美国疾控中心（CDC）于9月10日发布了一份健康警报，应对近期有关人类接触患狂犬病或疑似患狂犬病动物增加的报告。</li>
    <li>据新闻报道，近几个月在马里兰州有患狂犬病的水獭（海狸）袭击了三人。</li>
    <li>来源叙事重点：聚焦近期美国发生的狂犬病动物伤人及群体接触个案，关注公众恐慌与CDC官方预警，并探讨实际发病率与暴露事件上升之间的科学不确定性</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/us-news/2026/sep/20/rabies-beaver-goat-prevalence-concerns" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-nfig-and-tools-ecosystem-4e2919c7b734b600" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="8261" data-content-paragraphs="3" data-published-at="2026-09-20T10:51:04.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 18:51</span>
</div>

### [超越 jj：配置与工具生态系统](https://andre.arko.net/2026/09/16/beyond-jj-config-and-tools-ecosystem/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Beyond jj: config &amp; tools ecosystem</div>

<div class="article-body" data-article-body="true"><p>本文最初是 JJ Con 2026 上的演讲内容。演讲幻灯片现已公开。<br />大家好！欢迎来到“超越 jj”（beyond jj），我们将在这里了解 jj 生态系统：围绕 jj 打造的命令、配置和工具。这在某种程度上是我去年在 JJCon 上演讲的续篇——去年我对整个社区的 jj 配置进行了调研，不过我们稍后再聊这个。<br />我来做这场关于 jj 的演讲，其实际资质基本上可以归结为“我喜欢尝试新事物，并且对 jj 感到非常兴奋”。而我不那么实际的资质则可以归结为“Steve Klabnik 曾是我的室友，所以我可以让他把我的想法写入 jj 官方文档”。提前谢谢你，Steve！<br />正如我提到的，这次演讲在一定程度上是去年演讲的续集。去年我们梳理了 jj 配置的完整概念，从配置个人姓名，到模板（templates）、修订集（revsets）、命令和别名（aliases）。我们甚至还简要探讨了包装了 shell 脚本、而 shell 脚本又包装了 Python 脚本以自动化工作流的别名——别名可以变得相当复杂。<br />今年我将少谈一些 jj 配置究竟是什么，多谈谈那个更大的问题：一旦你拥有了 jj，你能用它做什么？我们将首先探讨用纯粹的原生 jj 能做的事情，接着看通过配置 jj 能实现的功能，最后看在 jj CLI 本身之外完全可以完成的事情。<br />其中有些内容在 jj 文档中有所提及，有些在 jj wiki 中有记录，有些收录在 awesome jj 的 git 仓库里，但此前从未有任何资料将它们全部整合在一起。此外，我还补充了大量未在上述任何地方列出的内容。<br />即使你从不添加任何额外的工具、辅助脚本或外部脚本，单凭 jj 能做的事情就多得惊人。通过添加自定义模板、revsets 和别名，你可以大幅简化或自动化相当多的操作。除了我们去年讨论过的 jj 配置之外，我最想汇报的是那些被添加到 jj 核心、此前需要外部脚本或工具才能实现的功能。<br />首先，我们来谈谈从配置转为内置功能的部分。<br />去年，我谈到了 `jj tug`，这个别名用于寻找最近的书签，然后将其移动到最近的可推送变更上。我很高兴地宣布，如今我们不再需要 tug 了，因为 `jj bookmark advance`（以及快捷方式 `jj b a`）现在能完成过去 tug 所做的事。默认情况下，bookmark advance 会将书签推进到工作副本（working copy）。如果你更偏好只推进到最近可推送提交的 tug 版本，你可以配置 `revsets.bookmark-advance-to` 并将其设置为同一个可推送的 revset。<br />jj bisect 工具链吸收了一项此前需要包装脚本的功能，现在你可以使用 `bisect run` 来自动定位你试图二分查找的变更。依我个人之见，这是 jj 和 git 之间的一大功能差距，因此我非常高兴看到它现在被集成进来，完全不需要再去折腾或到处找脚本了。<br />如果你不需要二分查找，但仍想运行脚本去修改某个 revset 中的每一个变更，该怎么办？这就是 `jj run` 的用武之地：给它一个脚本和一个 revset，脚本就会被执行，并且只要有文件被修改，每个变更都会被更新。变更树的整体结构将保持不变（或者从另一个角度来看，随着 run 依次处理每个变更，变更树会被自动变基）。<br />但等等，你可能会想：`jj fix` 和 `jj run` 做的不就是同一件事吗？即获取一系列变更，并通过（可能）修改这些变更中的文件来更新这些变更？可以说是，但并不完全一样。<br />`jj fix` 的存在纯粹是为了只修改那些被改动过的文件。它不会为每个变更创建签出（checkout），而且每次只向脚本提供单个文件，接收修改后的文件版本作为输出。<br />如果你需要磁盘上有一套已签出的文件来针对其运行脚本，`jj fix` 无法做到这一点。但如果你的诉求是对整个 revset 中所有变动过的文件追溯应用代码格式化工具或 linter，那么 `jj fix` 会比 `jj run` 快得不可思议。<br />`jj tag` 是功能被移入 jj 内部的一个例证，但这回它不是源于配置或脚本，而是直接来自 git 本身。你不再需要使用 `git tag` 来管理标签了，现在你可以使用 `jj tag set` 以及 `jj git push --all` 来推送所有的书签和标签。（你也可以通过 `jj git push --tag NAME` 推送单个标签）。既然现在有了 `jj tag`，我自己日常的工作已经完全不再需要运行 git 命令了。相比去年，这是巨大的进步，各位！<br />`jj arrange` 就像是拥有了交互式的 `git rebase -i`。你无需编辑文本文件，只需在类似 log 的图谱中直接选择或移动变更即可。如果你不想为了查找名称并移动最近的变更而连续运行三个命令，这能节省大量时间。<br />`converge` 命令是最新的，但也可能是最实用的。任何时候你在两个独立的地方更新同一个变更，它都有可能发生分叉（diverge）。一年前我做演讲时，分叉变更处理起来极为痛苦——我们当时没有 `/N` 语法来方便地指代分叉的每一方，而且在两个不同的终端窗口中同时运行命令，或者拉取远程分支，都极易意外造成分叉。<br />如今，指代分叉变更不仅变得简单得多（希望这能让变基或合并分支变得容易），你甚至可能根本不必这么做！`converge` 命令会尝试获取两个分叉的变更流，并将它们合并为单个未分叉的变更流。这可能会产生合并冲突，但合并冲突总比需要手动调和两个独立分支要好。我个人非常兴奋能拥有 converge，并期待在未来使用它。<br />现在，让我们超越 jj 完全内在的功能，来看看那些与 jj CLI 相集成的扩展用法。<br />我想介绍的第一种集成方式，是一个让 jj 别名能够支持子命令的绝妙奇技淫巧（hack）。这出自 @tjjfvi 在 issue #6611 中的评论。其核心构想在于，jj 允许你定义一个包含空格的别名命令，因此你可以构建一条 `jj → jj → jj → bash → jj` 的执行流。<br />在完成此配置后，你可以运行：<br />这会运行名为 foo 的别名，但由于它是一个别名，它会转换为：<br />随后 subcommand 本身也是一个别名，因此会展开为：<br />当然，在剥离外层的 jj 和外层的 bash 之后，最终计算得到的命令就是：<br />而这正是我们定义的 subcommand 别名，因此我们的子命令得以成功执行！这简直匪夷所思，但我太喜欢了。<br />希望明年我能够汇报说我们已经原生内置了对某种子命令的支持。但即便没有，目前我们也已经能够成功配置出属于我们自己的子命令了！</p>
<p>下一类极其流行（尽管实现方式不尽相同）的别名是手动重新实现 git push。这几乎总是意味着：<br />我目前的观点是，这正是如今 jj 内置功能中最大的缺失。我知道你可以用 push -c 来创建并推送分支，但这无法为你提供用于讨论或评审的人类可读名称。<br />如果在不久的将来，有哪位勇士考虑为 jj 贡献代码，只要你能就 pre-push 钩子达成一些共识，并交付一个将所有这些打包在一起的内置命令，把最新变更从你的客户端发送到当前仓库的后端，我和许多人都会对你赞不绝口。我个人更喜欢叫它 jj publish，因为这样可以避免与 git push 混淆。<br />最后，我将通过向大家推荐 jj 别名网页目录来结束关于配置与别名的讨论。添加你自己的别名吧！为你喜欢的别名投票！去寻找一些让你爱不释手的新别名，然后请愿将它们添加到 jj 核心库中！可能性是无限的。<br />请在此处查看：jj 别名网页目录。<br />我想探讨的最后一个与 jj 集成的领域是代码托管平台（forge）支持。自去年以来，这一领域出现了一些明显的动向，但未来可能也是拥有最大成长空间的领域。如今，已有三个托管平台明确记录或实现了对 jj 风格开发的支持。<br />在 GitHub 上，这就是他们所谓的“堆叠 PR”（stacked PRs）功能。GitHub 已经为一组相互依赖的 PR 形式推送的变更堆叠构建了服务端和 gh CLI 支持。这比创建一串相互指向的 PR（你过去可能已经做过这种事）稍微聪明一些。目前也已经有一些独立的 jj 工具可以帮助将 jj 堆叠集成到常规 GitHub PR 中，我们稍后会介绍它们。<br />另一种 GitHub 集成风格来自 Erisera 的 JJHub，它自称为“GitHub 上的覆盖层”（an overlay on github）。该覆盖层为智能体（agents）的使用提供了一致的变更 ID（change ID）、技能以及 MCP 服务器。<br />作为一个点对点代码托管平台，Radicle 撰写了关于如何将 jj 与其补丁请求（patch requests）结合使用的文章，这种方式更接近 git 邮件流，而不是显式堆叠。他们发布的流程展示了如何使用 jj 在 Radicle 中创建和修改补丁，直到它们被接受并合并。<br />如今，我个人最看好的托管平台是 Tangled。Tangled 是一个托管在 tangled.org 的公共平台，围绕 ATProto 身份体系构建。你可以掌控自己的身份及行为数据，并且可以在所有 ATProto 应用中维护单一身份，包括用于发帖的 Bluesky、用于代码仓库的 Tangled、用于博客的 Leaflet，以及一个围绕“用户在网络上拥有自己数据”而构建的、不断壮大的在线工具生态系统。<br />Tangled 在对 jj 的支持上一直走在前沿，包括显式支持“堆叠”（stacking）——即使用 jj 的变更 ID（change IDs）来允许评审 PR 不同版本之间的差异（diffs）。不过，除了支持变更 ID 之外，Tangled 在 next.tangled.org 的公开预览版中还围绕代码评审推出了全新用户体验，我称之为对 jj 的“完全支持”。它允许评审单个拉取请求（PR）的修订版本，或不同修订版本之间的差异（interdiff），并允许一次性评审任意一组变更，同时显式追踪 jj 的变更 ID。<br />在我看来，Tangled 是我们目前能见到的最接近“jj 原生”的托管平台。我认为你应该亲自试用一下。<br />最后，还有另一类托管平台：即将推出、但尚未向公众开放的产品。排在名单最前列的是 East River Source Control，我预计我们很快都会开始试用它的项目。<br />除 ERSC 之外，还有几个项目发布了网站，并表示你可以申请试用其产品。据我所知包括 revset.dev、juju.bi 和 vex.sc。我尚未获得这些网站中任何一个的抢先体验资格，但我提及它们，以防你有兴趣尝试耀眼的新（或即将推出的）技术。既然你参加了 JJCon，你很可能对此感兴趣。<br />如果你知道任何其他托管平台，或者能为现有平台增加更好 jj 支持的最新进展，请务必告诉我！我稍后会更新这篇博文。<br />最后，我想带大家浏览一下 jj 本身之外的外部生态。这指的是那些旨在配合 jj 仓库使用、但无需你亲自运行 jj CLI 的应用程序、脚本和工具。<br />首先，我想指出的是，其中一些工具甚至在官方 jj Discord 中拥有自己的专属频道。无论它们是否有这样的频道，我都尽量将这些工具收录在我的清单中，但在 jj Discord 中逛逛是开始上手 jj 图形界面（GUI）或终端界面（TUI）的便捷途径，因为你可以与其他用户和维护者交流。<br />第一类工具是意料之中的 GUI。如果你使用 git 很久了，可能熟悉老牌的 gitk，或者 macOS 上的分支衍生版 gitx，甚至更现代的 GUI，比如 GitTower、Fork 或 Retcon。让我们来看看专门为 jj 仓库和 jj 命令打造的一些 GUI。<br />gg（来自 https://github.com/gulbanana/gg ）：据我所知，gg 是最古老的 jj GUI，采用 Rust 编写，并使用 Tauri 构建了面向 Linux、Windows 和 macOS 的应用程序，同时也提供了 Web 选项。gg 对自己的定位推介是：“如果你一直处于交互式变基（interactive rebase）过程中，但实际上这是一件好事，会怎么样？”<br />jayjay（来自 https://github.com/hewigovens/jayjay ）：JayJay 是一款较新的 GUI，自称为“针对 Jujutsu 的快速、键盘友好的客户端”。在 macOS 上，它是基于 SwiftUI 框架构建的；在 Linux 上，它则是基于 Zed 的 GPUI 框架构建的。<br />在此我也花点时间提一下另外两个规模较小的新项目。特别鸣谢：<br />虽然 jj 的 GUI 生态目前还不如 git 那样丰富（至少目前如此！），但围绕 jj 展现出了极高的热情与活力，随着 jj 逐渐普及，我预计未来还会涌现出更多超越这些的 GUI。<br />这是 jj 时代真正的增长领域，涌现出了大量出色的 TUI 库，例如 Go 语言的 Charm 和 Rust 语言的 Ratatui 等等。这意味着 TUI 是比其他任何领域都拥有更多样化、更丰富工具的方向。<br />lazyjj（来自 https://github.com/Cretezy/lazyjj ）：lazyjj 是最早的 jj TUI 之一，为你的 jj log 提供全终端交互式视图，包括变更图谱、浏览文件和管理书签。<br />jj_tui（来自 https://github.com/faldor20/jj_tui ）：jj_tui 允许你将所有的 jj 操作迁移到 TUI 中，包括 commit、rebase、push、pull、squash、split 以及按 revset 过滤。<br />jj-fzf（来自 https://github.com/tim-janik/jj-fzf ）：jj-fzf 极其出色地践行了“如果我们用 fzf 来辅助每一个 jj 命令会怎样”这一理念。它提供了 log、split、merge、rebase 功能，甚至显式支持超级合并（mega-merges），这一切都构建在 jj CLI 和 fzf 模糊搜索脚本之上。</p>
<p>来自 https://github.com/idursun/jjui 的 jjui：jjui 是一个围绕实时、交互式且支持自动补全的 revset 表达式构建的终端用户界面（TUI）。一旦编写好 revset，你就可以执行 rebase、squash、浏览、split、abandon 等操作。如果你想预览 revset，或者通过即时反馈练习编写 revset，jjui 是一个极佳的工具。<br />来自 https://github.com/anthrofract/majjit 的 majjit：majjit 是一款受 magit 用户体验启发的 TUI，在浏览 jj 对象图的同时，为变更和书签提供模糊匹配，并支持基于快捷键的 jj 命令。<br />我没有时间逐一介绍我发现的每一个工具，因此我也会把这些列出来，以防你正在寻找灵感、想尝试其他工具，或者寻找你可以参与贡献的项目。<br />来自 https://www.visualjj.com/ 的 visual jj<br />来自 https://github.com/keanemind/jjk 的 jjk：jjk（前身为 Jujutsu Kaizen）是一个适用于 jj 的 VSCode 插件，增加了文件状态、详细 diff 视图、逐行 blame、commit、split、squash、rebase 功能，甚至还包含用于操作日志（op log）的第二窗格。无需离开 VSCode 即可浏览你的仓库操作历史！<br />来自 https://github.com/brychanrobot/jj-view 的 jj-view：JJ View 是 jj 的另一个 VSCode 集成。除了包含如你所期望的 jj 变更图交互式面板外，JJ View 还与 Gerrit、GitHub 和 GitLab 进行了显式集成，直接在 VSCode 内部显示审查讨论和行内评论。<br />与其逐一展示其他每一个编辑器集成，我直接明确确认：大多数编辑器都拥有某种形式的显式 jj 集成。正如你在这里看到的，无论你使用的是庞大的 IDE 还是极简前沿的终端编辑器，你都至少有几个选项可以尝试，并找到适合你工作流程的工具。<br />JetBrains（IntelliJ、PyCharm 等）<br />说到工作流，让我们来看看工作流工具。<br />除了堆叠工具的“最初三杰”之外，还有若干专为管理堆叠变更以供提交、审查并最终在代码托管平台（forge）合并而设计的工具。如果上面提到的三个不合适，可以看看这些，或者自己写一个！<br />来自 https://mergiraf.org/ 的 mergiraf：Mergiraf 是一个合并驱动程序，它可以通过理解被合并代码的语言来解决广泛的 git 合并冲突。<br />来自 https://github.com/Ataraxy-Labs/weave 的 weave：weave 是一个利用 tree-sitter 的合并驱动程序，通过允许在代码实体级别进行合并来处理冲突。声称能将 AI 智能体（agent）编写的代码变更冲突减少 95%。<br />来自 https://github.com/Wilfred/difftastic 的 difftastic：difftastic 是最初的“语法感知 diff”系统，它展示的是代码结构的差异，而不是代码行本身的差异。<br />来自 https://github.com/dandavison/delta 的 delta：delta 是一个 diff 打印程序，兼具语法高亮和丰富的丰富主题支持。它专为 git 设计，但 jj 可以输出 git 风格的 diff，随后 delta 可以将其美化。我个人非常喜欢并一直在使用 delta。<br />来自 https://github.com/arxanas/scm-record 的 scm-record：scm-record 是内置于 jj 中的 TUI，每次运行 jj split、restore 或 resolve 时都会调用它。它是作为 git add -p 的交互式替代方案而创建的，目前在 jj 和 git-branchless 中均有使用。我特意指出这一点，是为了让大家知道它是一个独立于 jj 的项目；如果你对其做出贡献，你的改进不仅会应用到 jj 中，也会惠及 git-branchless 的用户，或者任何配置了 git 或 mercurial 来使用 scm-record 的人。<br />来自 https://github.com/laulauland/jj-hunk 的 jj-hunk：无需交互式编辑器即可拆分（split）、提交（commit）或压缩（squash）选定的 diff 子集。采用“hunkset”语言，并通过命令行参数（CLI flags）或 JSON 接收参数。<br />来自 https://github.com/julienvincent/hunk.nvim 的 hunk.nvim：hunk.nvim 是一个适用于 neovim 的 diff 编辑器，专为配合 jujutsu 使用而设计，可作为内置 scm-record TUI 的替代品。<br />来自 https://github.com/KyleKing/jj-diff 的 jj-diff：jj-diff 是 scm-record 的另一个 TUI 替代方案，不过它专门针对 split、amend 和 squash。<br />来自 https://github.com/ccqpein/jj-diff.el 的 jj-diff.el：jj-diff.el 是适用于 Emacs 的类 Magit diff 和 hunk 编辑器。它的主要卖点是不依赖任何 de</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-20 18:51 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://andre.arko.net/2026/09/16/beyond-jj-config-and-tools-ecosystem/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ces-in-test-method-names-df5c5c16aba0c2b6" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1319" data-content-paragraphs="23" data-published-at="2026-09-20T10:04:37.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 18:04</span>
</div>

### [在测试方法名中使用不换行空格](https://mnapoli.fr/using-non-breakable-spaces-in-test-method-names)
<div class="original-title-sub"><span class="orig-tag">原文</span> Using non-breakable spaces in test method names</div>

<div class="article-body" data-article-body="true"><p>是的。这篇文章讲的是在测试命名中使用不换行空格（non-breakable spaces）。以及它有多棒，还有为什么你也应该使用它。</p>
<p>上述代码是有效的 PHP 代码，且能正常运行。不换行空格（即 HTML 中的 &amp;nbsp;）在编辑器中看起来像普通空格，但在 PHP 中实际上会被像处理普通字符一样进行解析。</p>
<p>这是我们通常看到的测试：</p>
<p>这也是几年前我们在 Wizaplace 编写的那种方法名。</p>
<p>当时，有几场演讲给我留下了非常深刻的印象，让我对代码风格产生了兴趣。在测试方法中使用蛇形命名法（snake_case）代替驼峰命名法（camelCase）开始显得合情合理，因为这能让我们更清晰地解释测试的作用：</p>
<p>（☝️ 这不符合 PSR-2 规范，我起初也持怀疑态度，但确实，随着时间的推移，人们是可以习惯并接受它的）</p>
<p>我们最终在团队内部讨论了这种命名方式。幸运的是，当时我们也正开玩笑说要写一个 PHP 6 框架，并且正在尝试用表情符号（emoji）作为类名或方法名（这在 PHP 中绝对行得通）。</p>
<p>在某个时刻，有人开玩笑说：</p>
<p>“如果我们为了可读性而决定在测试方法中不遵循 PSR-2 命名规范，那我们不妨直接用不换行空格，因为那样可读性更好……”</p>
<p>这最初只是个玩笑，但听起来确实有道理。既然逻辑和人类思维并不总能完美融合，我们决定进行一段时间的小规模受控实验，看看在实践中它是否真的好用。</p>
<p>结果非常棒。好到一年多过去了，我们对它依然感到非常满意。</p>
<p>测试方法清晰且富有意义，以下是我们某个 Pull Request 中的实际代码差异（diff）示例：</p>
<p>由于测试方法看起来就像句子，我们便把它们当成句子来对待，这让所有测试都变得更加清晰。以下是另外几个示例：</p>
<p>这非常简单且容易记住：</p>
<p>根据我们的经验，是的，下面列出的我们所使用的所有工具都能完美运行：</p>
<p>我们在 Atom 和 Visual Studio Code 上遇到过微小的问题（语法高亮失效），这些问题已被 Florent 在以下 Pull Request 中修复：atom/language-php#196 和 Microsoft/vscode#26992。</p>
<p>这可能是最困难的部分：让其他人类接受这一点。加入团队的每位新同事在阅读代码时都会有那种“搞什么鬼（WTF）”的时刻。这违背了最小惊奇原则（principle of least astonishment），但我们对不换行空格感到非常自豪和满意，以至于向别人解释它总是一段有趣的时光 :)</p>
<p>根据我们的经验，无论是初级开发者还是高级开发者，同事们都很快接受了。不过我们的团队目前还很小，在拥有多个团队的大型组织中推广这种做法可能会更困难。</p>
<p>别担心，你会立刻注意到的：</p>
<p>同样，根据我们的经验，这从来都不是问题。</p>
<p>这是我目前唯一的保留意见。在闭源项目中使用不换行空格很容易，因为团队拥有代码并共同做出决定：如果有效就继续用，否则就停掉。</p>
<p>在开源项目中情况要复杂得多，因为大多数贡献者在产生“搞什么鬼”的疑惑时，你并不在他们身边去解释。这可能会让人感到困惑，甚至令人反感。</p>
<p>我目前的个人立场是：</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-20 18:04 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://mnapoli.fr/using-non-breakable-spaces-in-test-method-names" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-item-4b83cbb2332bd3bf" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1766" data-content-paragraphs="14" data-published-at="2026-09-20T05:56:25.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 13:56</span>
</div>

### [要闻：一个图像解析器，通杀全场](https://heif-heist.com/)
<div class="original-title-sub"><span class="orig-tag">原文</span> HEIF Heist</div>

<div class="article-body" data-article-body="true"><p>一个图像解析器，通杀全场<br />这一漏洞本可使我们做到：<br />导出 OpenAI 的私有代码仓库<br />在 Slack 上实现 RCE（远程代码执行），从而导致文件泄露<br />通过图片上传在 Meta 的核心产品套件中实现 RCE<br />泄露任意 [已隐去] 用户的令牌以及 AWS 访问令牌<br />在 Discourse 上实现需身份认证的 RCE<br />通过 AVIF 图像优化在 Next.js 中实现无需身份认证的 RCE<br />在 GitHub Enterprise 上实现需身份认证的 RCE (CVE-2026-19118)<br />在多个 Web 框架/CMS 上实现 RCE<br />从多个应用程序中泄露用户文件及敏感信息。</p>
<p>HEIF Heist 是 Hacktron 对一类针对解码攻击者可控 HEIF、HEIC 或 AVIF 图像服务的远程攻击路径的命名。通过利用底层原生库，这些漏洞允许攻击者绕过应用层防御，触发内存损坏、数据泄露或远程代码执行（RCE）。</p>
<p>易受攻击的攻击面存在于应用层之下，位于诸如 libheif 和 libde265 等原生 C/C++ 解码器内部。这些解析器通常通过更高层级的封装器（如 ImageMagick、libvips 或 Sharp）、标准发行版软件包以及预构建的容器基础镜像间接引入生产环境。</p>
<p>通过使用精心构造的 .avif 或 .heic 文件探测上传端点，攻击者可以对目标正在使用的远程 libheif 版本系列进行指纹识别。一旦确认，他们就能发送精确匹配版本的 N-day 或 0-day 载荷，从而触发内存损坏、数据窃取或远程代码执行。</p>
<p>HEIF Heist 起源于 Hacktron 研究团队针对前沿实验室开展的更广泛安全研究的一部分。在发现并向 Discourse 报告了一个 libheif RCE 漏洞后，我们提出了一个更大的问题：还有多少其他应用程序依赖于相同的图像处理技术栈？</p>
<p>过去的漏洞（如 ImageTragick、ForcedEntry 以及 libwebp 缺陷）已经证明了图像处理器或解析器漏洞的影响范围。图像解析器可能会用于生成操作系统缩略图或处理网页上传，这赋予了其巨大的爆炸半径。</p>
<p>最初的这一发现演变为长达数月的调查，顺藤摸瓜追踪了通信平台、云服务、企业级产品和流行 Web 框架中的 libheif。</p>
<p>即使无法立即实现远程代码执行（RCE），该攻击原语仍可能允许任意堆内存泄露，让攻击者能够“劫持”内存中的数据，例如其他用户的数据和环境变量。</p>
<p>该漏洞存在于原生 C/C++ 解析器（libheif / libde265）内部，使其完全独立于上层语言和框架。任何处理不受信任的用户上传图像的后端，都可能暴露于这些解析器带来的风险之中。</p>
<p>HEIF Heist 并不局限于单一版本。它针对的是跨越多个发布系列（例如 1.19.x、1.20.x、1.22.x、1.23.x）的整个漏洞生态。任何缺乏最新上游安全补丁的部署都可能面临风险。</p>
<p>另外，如果您自行托管了 Discourse 或 Next.js，请确保已升级至最新版本并遵循其安全公告。</p>
<p>这些并非开箱即用的利用代码。利用这些漏洞需要对目标版本进行指纹识别并定制 payload 图像。我们的一些 RCE 尝试是在上传了数千张图像之后才成功的。不过，借助像 GPT-5.6 Sol 这样的前沿模型采用 AI Agent 方式，将从初始探测到实现远程 RCE 的利用开发时间缩短到了大约 1 到 3 天。有动机的攻击者完全可以将一个易受攻击的上传端点转化为 RCE 或信息泄露。</p>
<p>该研究由 Harsh Jaiswal 主导，团队成员包括 Hacktron 研究团队的 Mohan SRK、Rahul Maini 和 Sudhanshu Rajbhar，并得到了 Hacktron Harness、GPT-5.6 Sol 及 Opus 5 的协助。</p>
<p>Hacktron 汇聚了顶尖的 CTF 研究员、经验丰富的红队成员和进攻性安全研究员。我们利用人工智能加速安全研究，在恶意攻击者利用之前发现并消除广泛受信任软件中的漏洞。我们正在持续对前沿实验室和其他互联网关键系统展开研究。如果您负责其中某项系统的安全，我们很乐意与您展开合作。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-20 13:56 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://heif-heist.com/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-od-based-on-who-hates-it-8a135d9f7b5fc290" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5818" data-content-paragraphs="43" data-published-at="2026-09-20T05:46:48.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 13:46</span>
</div>

### [看谁在恨它，你就知道 GDPR 有多好](https://matduggan.com/you-know-gdpr-is-good-based-on-who-hates-it/)
<div class="original-title-sub"><span class="orig-tag">原文</span> You Know GDPR Is Good Based on Who Hates It</div>

<div class="article-body" data-article-body="true"><p>富兰克林·德拉诺·罗斯福一直是我最喜欢的总统之一，大概仅次于林肯。在统治建制派看来，这两人原本都被视为自己的同类，但令建制派惊恐的是，他们的执政作风却完全不是那么回事。他们两人都能在这一秒痛斥反对派，下一秒就占据道德制高点。我成长过程中最喜欢的罗斯福语录之一，出自1936年10月的麦迪逊广场花园，当时他面对的台下人群中，有大批恨不得置他于死地的人：</p>
<p>我所欣赏的是，他根本不去争辩那些仇恨。他不说他们恨他是错的，也不说这种仇恨是不公平的。他说，这种仇恨本身就是证据——说明进程正在奏效。我一直把这作为一项衡量指标：如果你在做一件艰难的事，却没有任何人痛恨它，那你大概根本没把它做成。如果恰当的人在恨它，而这些人碰巧又是世上最糟糕的一批人，那就再好不过了。</p>
<p>按照这个标准，GDPR（欧洲的《通用数据保护条例》）做得漂亮极了。</p>
<p>在如今的网络科技圈里，你走到哪里都免不了撞上一波波嘲讽 GDPR 有多愚蠢的评论。他们说这是由一群不懂无拘无束的技术所具有的惊人潜力的官僚写出来的。这些来自美国的批评几乎总是依赖于赛博自由意志主义中最陈旧的花招：我们没时间监管，我们只能顺应并乘风破浪。没人有闲工夫理睬政府。</p>
<p>“就为了一个体育比分网站？”</p>
<p>那么，科技评论圈为什么对这件事叫嚷得如此大声？因为他们心知肚明这触动了什么利益。如果知情同意必须完全自愿且极易拒绝，该行业的权力就会呈指数级萎缩。人们或许能够决定谁拥有他们的数据、数据保存多久以及收集数据的目的是什么。你完全可以想象，这种念头会让 Meta 的高管在夜里辗转反侧——当他不在食用濒危动物，或者不在俗气的游艇上对那些连名字都已遗忘的子女的来电置之不理时。</p>
<p>不妨看看下面这个例子。你知道每次你在 Google 上搜索时，Google 都在做这种事吗？你爸知道吗？因此，即便以最恶意顺从的形式落地，该法规确实提供了价值和知情权。</p>
<p>记住，仇恨就是衡量指标。我们是怎么走到今天这一步的——美国科技公司最终竟由布鲁塞尔来监管？为什么美国政府不再监管美国企业了？如果规则真的如此糟糕，为什么没有一家公司选择退出市场？欧盟究竟是成为了全球的“隐私警察”，还是相反，成为了捍卫个人隐私这一基本人权的最大推动者？</p>
<p>啊，谁会不记得“GDPR 生效日”那天自己在做什么呢。既然我们在欧盟全都是“社会主义者”，我们便从政府配发的办公桌前站起身，按规定为该法规高呼三声万岁，然后继续休长达6周的年假。当然，是在去机场路上顺便看了看我的免费家庭医生之后。2018年5月25日，GDPR 在美国各界的一片非议声中正式生效，就像烟花在狗吠声中绽放一样。</p>
<p>你可以从美国 CEO 们抄袭相关措辞的速度看出他们早就注意到了这项法规。就在生效前夕，微软总裁布拉德·史密斯（Brad Smith）发推称：“我们认为隐私是一项人权。”蒂姆·库克紧随其后，对 CNN 表示“隐私是一项基本人权”。将隐私定性为一项人权，是欧盟通过 GDPR 采取的核心方式之一。这与美国法律体系形成了鲜明对比，后者更多将信息隐私视为一个市场问题。在庞大的数据交易市场中，你们都是知情的个体，但大多只能自求多福。理论上，美国应当对不公平、欺诈和其他市场失灵行为进行监管，但在实践中这并未发生。</p>
<p>欧洲对这场斗争并不陌生。德国黑森州在1970年通过了世界上第一部数据保护法——那一年也是披头士乐队解散的一年——并确立了一项我们至今仍未能完全达到的标准：</p>
<p>在 GDPR 推出时，已有126个国家制定了某种形式的数据隐私法律。</p>
<p>在这片立法的汪洋大海中，你所看到的是压倒性的共识：GDPR 试图做的事情是正确的。事实上，你会看到全球标准的高度趋同。所有这126部法律都源自经合组织（OECD）在1980年确立的同一套准则：只收集所需的信息、说明用途、妥善保管、允许人们查看和更正，并且在做这一切时别让人觉得反感。五十年过去了，美国互联网产业依然卡在第一条准则上。</p>
<p>因此，首先，那种屡见不鲜、称这只是欧盟异想天开的观点完全是错误的。你可以称之为数据隐私的“欧洲标准”，它迅速演变成了全球标准。</p>
<p>阿努·布拉德福德（Anu Bradford）将其称为“布鲁塞尔效应”：欧洲制定规则，全世界遵循合规，因为不管美国如何虚张声势，欧洲都是一个谁也无法放弃的市场。</p>
<p>在美国金融市场中，放弃欧盟市场的公司很快就会换上新 CEO，因为他们之前的领导层会突然发现自己出现了健康问题，或者突然对自己多年来忽视的家庭产生了深厚的爱意。尤其是考虑到美中之间日益冷淡的关系，那些因监管和本土竞争加剧而被挤出中国市场的公司，绝不能再失去欧盟市场。此外，对很多服务而言，要筛除欧盟客户也非常困难，特别是该法律规定，只要欧盟居民的个人数据转移到欧盟境外，无论何时何地，法律都会如影随形。不妨把它想象成试图根据行李外表贴的贴纸来进行分类。</p>
<p>欧盟的架构机制也使得这样一部法律的执行成为可能。每个成员国都设有一个数据保护局（DPA），负责协助个人维护自身权利、就现有法规的运行向本国立法机构提出建议，并最终执行法律。欧盟与美国的不同之处还在于，它乐于探索预防性的监管行动。我们在《欧盟人工智能法案》中就看到了这一点，该法案几乎在一开始就试图对该行业建立某些管控。因此，强有力的执法途径、对总体监管日益浓厚的兴趣，以及对个人隐私的高度尊重，这三者的结合使欧盟成为了诞生此类立法的必然之选。</p>
<p>想知道它的威慑力有多大吗？2011年，一位名叫马克斯·施雷姆斯（Max Schrems）的奥地利法学院学生要求 Facebook 提供其持有的关于他的所有信息，结果收到了1200页的材料，其中大部分是他从未主动提供过的内容。他在大学宿舍里提交了一份投诉。四年后，欧盟法院以此为依据，直接废除了跨大西洋数据协议《安全港协议》（Safe Harbor）。一个大学生的投诉，推翻了由总统和总理们签署的国际协议……而且是不止一次。</p>
<p>GDPR实力的最好证明，莫过于它对日本的影响。2019年1月23日，欧盟与日本达成协议，允许个人数据在这两大经济体之间自由流动。该协议确立了一部总体性的隐私保护法，包含一套核心的个人权利，并由独立的监管机构执行。整个过程历时两年，这并不令人意外，因为在此之前，日本的相关法规十分薄弱、漏洞百出，宛如“瑞士奶酪”。</p>
<p>2014年，格雷厄姆·格林利夫（Graham Greenleaf）在亚洲隐私法律概述中，为其关于日本的章节定名为《保护的幻象》（The Illusion of Protection）。当时日本的私营部门基本处于无监管状态，其关于个人数据使用和披露的规则存在“容易被操纵的豁免条款”，缺乏针对敏感信息的规定，对数据出境也没有任何限制。这根本达不到欧盟对于信息共享所预期的保护水平。</p>
<p>你可以直接将布鲁塞尔的谈判桌，与大阪一位退休老人获得的新权利联系起来。日本的数据经纪人恨透了这一点，而这恰恰说明了它的意义所在。</p>
<p>为什么美国没有争取同样的安排？因为所有参与者心里都清楚，申请肯定会被拒绝。这就引出了一个真正的问题：为什么发明了大部分这种技术的国家，却无法为它制定一套规则？为什么全世界都在向前推进，美国却仍在假装没有监管的必要？</p>
<p>关于美国在数据经济领域究竟发生了什么，没有比肖莎娜·祖博夫（Shoshana Zuboff）的《监控资本主义时代》（The Age of Surveillance Capitalism）更深刻的著作了。那是一本好书，我就不在此剧透了。</p>
<p>首先，来看看书中对“监控资本主义”的定义。</p>
<p>没读那段定义？这不怪你。说大白话就是：他们发现了石油，而这石油就是我们自己。正如我们美国人最擅长的那样，一旦石油出现，我们便立刻对“自由”萌生出突如其来的热爱。</p>
<p>实际情况是这样的。“9·11”恐怖袭击给美国的监管格局带来了连锁反应，实际上彻底打乱了美国本土监管机构此前开始围绕个人数据构建框架的势头。关注焦点变成了国家安全，而非隐私保护。很快，公共情报机构与硅谷羽翼初丰的监控资本主义企业一拍即合，炮制出了“监控例外主义”（surveillance exceptionalism）的概念。只要你是为了维护我们的安全而进行监视，那就不是间谍行为，而是公共服务。</p>
<p>随着时间的推移，美国政治的腐败使得在联邦层面进行监管的可能性越来越低。谷歌和Meta（Facebook）在游说上砸下了数千万美元（对于非美国读者来说，“游说”是合法行贿的一种好听说法）。政府与科技巨头之间还形成了一扇“旋转门”，有197人在华盛顿与谷歌总部之间频繁往返任职。</p>
<p>这些公司发现，研究我们在放松或娱乐时的行为数据最具商业价值，这能让他们准确且稳定地引导人们走向能让他们获利的结果。美国消费者在某种程度上也意识到了这一点，经常把“如果它是免费的，你就是产品”挂在嘴边。以前确实如此，但在新的数字经济中，情况已经变了。</p>
<p>我们甚至连“产品”都算不上了，这就是为什么所有这些公司根本不再在乎他们的产品是否好用或好玩。我们成了他们开采的“原材料”。他们了解我们的一举一动，而我们对他们一无所知。他们从我们身上攫取所有数据，但绝非为了我们或我们的利益。通过积累和操纵这些数据来进行“行为改造”，如今已成为美国的财富引擎。</p>
<p>现在，我们处于一种市场失灵的境地。没有任何一家公司会率先放下武器，而任何监管者都可以被这些公司在餐饮公关上花的那点零钱所收买。只有具备真正执法威慑力的法律，才能改变这一局面。然而，美国再也无法通过有威慑力的法律了，这不是因为选民不想要（民意调查显示他们想要），而是因为政治通道早已被金钱买断。当有人说美国“无法”监管科技巨头时，其含义就像说人质“够不着”电话一样。GDPR之所以能推广，并不是因为欧洲有多么英勇伟大。GDPR之所以能向外扩散，是因为当华盛顿从房间里退场时，只有布鲁塞尔填补了这片空白。</p>
<p>多亏了出色的 decryptads.com 网站，你可以实时看到这一切是如何运作的。以科技媒体 The Verge 为例。</p>
<p>这是一个相对直接的科技评论网站，且设有付费墙。按理说，它在广告方面的供应链应该非常简单。</p>
<p>但我们看到的却恰恰相反。背后存在着一个由众多公司组成的庞大网络，在这个网站上对信息进行交易、售卖和竞价。这不是 The Verge 的过错，整部机器就是这么运转的。你的数据就像菜市场里的死鱼，所有人都可以对商品挑挑拣拣并决定是否购买，而你根本无法参与其中。具有讽刺意味的是，我们之所以能看到这些信息，仅仅是因为用来打击广告欺诈的 ads.txt 和 sellers.json 文件的存在。</p>
<p>即便是一个由具备技术素养的人运营、面向科技爱好者、且有付费墙保护的优质网站，也无法逃脱这个系统的摆布。你在这里看到的是：根本无路可逃。如果你想拥有可观的网络影响力，并且得付清账单，你就必须参与其中。而 The Verge 已经做得相当规矩了！它声明的合作伙伴有59家，而且没有一家正在积极准备与美国开战。</p>
<p>然而在美国，这并不是一个新问题。</p>
<p>经济史学家卡尔·波兰尼（Karl Polanyi）曾提出“双向运动”（Double Movement）的概念。你可以在这里阅读相关内容。</p>
<p>不妨这样理解：想象把美国资本主义简化为一场拔河比赛。在第一回合中，商业资本先行一步。这就是“让看不见的手做主”的阶段。一切都变成了可以买卖的商品，包括土地、劳动力，甚至是货币本身。这就像撤掉比赛中所有的裁判，任由场上球员随心所欲。</p>
<p>然后是第二回合，也就是“等等，这正在伤害普通人”。人们开始要求保护，比如最低工资法、劳工权益以及贸易监管，因为“自由市场”似乎从未真正自我调节过，反而在造成实实在在的伤害。裁判们重返赛场，但这一次，他们手中拿的规则手册是由那些受过伤害的球员写下的。</p>
<p>波兰尼的核心论点在于：完全自由的市场不过是一种幻想。它之所以是幻想，是因为市场的运转本就需要政府的支持。即便那些口口声声鄙视政府干预的人，也在依赖它。当需要训练大语言模型时，版权和商标权可能被弃之不顾；但如果我开始公开推销一款名叫 iWatch 的智能手表，这些权利瞬间就变得无比重要了。</p>
<p>这种“肆虐随后被矫正”的循环节奏曾主导了美国资本主义一个世纪。然而对于监控资本主义来说，第二轮矫正却迟迟未至。在我于 2026 年写下这些文字时，联邦层面根本不存在任何行之有效的制衡力量。一些州正在尝试立法，值得肯定，但逐州去监管互联网算不上进步，充其量只是止血。与此同时，买卖你个人生活的数据中间商完全游离于公众监督之外，丝毫不惧怕任何全面的改革，他们仅需花上一个季度公司外包午餐的预算，就能左右一场州议会选举。如此庞大的实体根本无法与正常运转的民主共存——从“书呆子帝国”（Nerd Reich）的兴起来看，他们似乎也早就考虑到了这一点。https://www.npr.org/2026/08/10/nx-s1-5925350/the-nerd-reich-tracks-the-unmasking-of-silicon-valleys-true-politics</p>
<p>因此，事情的运行逻辑很简单：华盛顿无所作为，于是布鲁塞尔出手。布鲁塞尔一行动，全世界便纷纷跟进，因为欧洲市场庞大到任何人都无法轻易放弃。这就是 GDPR 的全部故事：它并非源于欧洲的野心，而是源于美国的缺席。如果你愿意的话，也可以说这是帝国衰落的一个迹象。</p>
<p>1936 年 10 月的最后一晚，罗斯福在麦迪逊广场花园发表了那场演讲，一周后他横扫了四十六个州。那些仇恨他的人只保住了缅因州和佛蒙特州，并在接下来的九十年里对他们所痛恨的一切持续错下去。被“对的人”痛恨就是这样一回事：它是一种资本，而且是一种极具价值的资本。</p>
<p>隐私监管终究也会走到这一步。不是因为行业悔改了——因为行业从不忏悔——而是因为所有这类事件的结局莫不如此：安全带、吸烟区、含铅涂料。先是司空见惯，然后成为丑闻，最后变成不可思议。总有一天，会有人好奇询问针对儿童的广告网络到底是什么，并且打死也不敢相信听到的答案。而那些曾经全力反对这一切的高管们，则会惬意地坐在某处的游艇上，向人解释说自己其实打一开始就是支持监管的。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-20 13:46 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://matduggan.com/you-know-gdpr-is-good-based-on-who-hates-it/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-iamgio-quarkdown-d4a3cacb588485ec" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2073" data-content-paragraphs="1" data-published-at="2026-09-20T03:37:45.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 11:37</span>
</div>

### [Quarkdown：图灵完备的 Markdown 排版系统](https://github.com/iamgio/quarkdown)
<div class="original-title-sub"><span class="orig-tag">原文</span> Quarkdown: Turing-complete Markdown typesetting system</div>

<div class="article-body" data-article-body="true"><p>加载时出错。请刷新此页面。<br />版本 最新 | 稳定版<br />Quarkdown 是一款专为多功能性而打造的现代基于 Markdown 的排版系统。它允许单个项目无缝编译为可直接打印的书籍、学术论文、知识库或交互式演示文稿。这一切都通过一个极其强大的图灵完备 Markdown 扩展来实现，确保你的想法能够自然流畅地跃然纸上。<br />原版鸣谢：《Attention Is All You Need》<br />作为 CommonMark 和 GFM 的扩展而诞生，Quarkdown 语法风格为 Markdown 带来了函数功能以及众多其他语法扩展。<br />这是一个函数调用：<br />得益于不断扩展的标准库，可能性是无限的，该标准库提供了布局构建器、输入/输出（I/O）、数学运算、条件语句以及循环。<br />还不够？你依然可以在 Markdown 内部自行定义函数和变量。你甚至可以创建精彩的库供所有人使用。<br />结果：Hello, world from iamgio!<br />这种开箱即用的脚本支持为复杂且动态的内容敞开了大门，而这在原生 Markdown 中是无法实现的。<br />结合实时预览、⚡ 极快的编译速度以及出色的编辑器支持，无论是学术论文、书籍、知识库还是交互式演示文稿，Quarkdown 都能助你轻松搞定。<br />简而言之，Quarkdown 是……<br />查看 Wiki 即可入门并深入了解该语言及其特性！<br />灵感来源于：来自附近超大质量黑洞的 X 射线闪光出现神秘加速<br />纯文本（Plain） 类似 Notion/Obsidian 的连续流式排版，非常适合静态网站和知识管理——请查看作者的个人网站。<br />分页（Paged） 基于 paged.js，非常适合论文、文章和书籍——请查看演示文档。<br />幻灯片（Slides） 基于 reveal.js，非常适合交互式演示文稿。<br />文档（Docs） 非常适合 Wiki、技术文档和大型知识库——请查看 Quarkdown 的 Wiki。<br />可以通过在源码内部调用 .doctype 函数来设置所需的文档类型：<br />Root 权限允许脚本将 Quarkdown 安装到 /opt/quarkdown，并将其包装脚本安装到 /usr/local/bin/quarkdown。导出 PDF 所需的浏览器会自动安装。<br />有关更多安装选项，请查看 get-quarkdown。<br />参见 setup-quarkdown，以便轻松将 Quarkdown 集成到你的 GitHub Actions 工作流中。<br />从最新的稳定版本下载 quarkdown.zip 并解压，或者使用 gradlew installDist 进行构建。<br />（可选）将 /bin 添加到你的 PATH 中，可以让你更方便地访问 Quarkdown。<br />新用户？在《快速入门指南》中，你将找到将首个文档变为现实所需的一切！<br />quarkdown create [目录] 将启动基于提示的项目向导，让你比以往更快地搭建一个新的 Quarkdown 项目，所有元数据和初始内容均已准备就绪。<br />运行 quarkdown c file.qd 将编译指定文件并将输出保存到 file。<br />如果项目由多个源文件组成，则目标文件必须是根文件，即包含其他文件的那个文件。<br />如果你想先熟悉 Quarkdown，quarkdown repl 可以让你在交互式 REPL 模式中体验。<br />最常用的选项包括：<br />-p 或 --preview：在编译后启用内容自动重新加载。<br />-w 或 --watch：每当源目录中的文件发生更改时重新编译源码。<br />将 -p -w 结合使用即可实现实时预览！<br />有关完整的选项列表，请查看 CLI 选项的 Wiki 页面。<br />Mock 使用 Quarkdown 编写，是该语言所提供视觉元素的全面集合，非常适合用于探索和理解其核心功能——同时可以通过页面或幻灯片形式的具体成果进行动手实践与实验。<br />欢迎贡献！请查看 CONTRIBUTING.md，了解如何通过 Issue 或 Pull Request 进行贡献。<br />特别感谢支持本项目的所有赞助者！<br />该徽标与原版 Markdown 图标相似，重点展现了 Quarkdown 的完备性、丰富的功能以及自定义选项，环绕球体的旋转箭头强化了这一点。<br />可能会被误认为行星的图形实际上是一个夸克，更具体地说是下夸克（down quark），一种作为物质主要构成成分的基本粒子：它们赋予了我们已知的所有复杂结构以生命，同时也是现存最轻的天体/微粒之一。<br />这正是构建 Quarkdown 所秉持的理念。<br />默认情况下，Quarkdown 及其模块基于 GNU GPLv3 许可证开源，但包含自身 LICENSE 文件的模块除外：CLI（quarkdown-cli）和语言服务器（quarkdown-lsp）模块及二进制文件基于 GNU AGPLv3 许可证开源。<br />通过语言本身自定义文档及其输出产物属性的能力。↩<br />🪐 拥有超能力的 Markdown：从想法到论文、演示文稿、网站、书籍和知识库。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-20 11:37 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://github.com/iamgio/quarkdown" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-reviews-c8f3cb786d60b957" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="7188" data-content-paragraphs="49" data-published-at="2026-09-19T22:36:30.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 06:36</span>
</div>

### [V 语言评测（2023）](https://n-skvortsov-1997.github.io/reviews/)
<div class="original-title-sub"><span class="orig-tag">原文</span> V Language Review (2023)</div>

<div class="article-body" data-article-body="true"><p>于是你发现了一门名为 V 的新编程语言。它看起来很不错，官方网站上许诺了诸多特性，语法也很讨喜，但它的实际表现究竟如何？<br />本文所描述的一切内容均基于提交版本 b66447cf11318d5499bd2d797b97b0b3d98c3063。这是我使用该语言 6 个月以来的经验总结，加上我在撰写本文时在 Discord 上查阅到的信息。<br />这篇文章相当长，因为我尽量详细地记录了所有细节，以便任何人都能复现相同的行为。<br />学习一门新的编程语言从何入手？没错，从文档开始。V 语言的文档就是一个巨大的 docs.md 文件。<br />在离开头不远的地方，你就能注意到 V 拥有的内置类型。类型 i128 和 u128 旁边那个小小的“soon”（即将推出）前缀，恰恰描绘了整门语言的现状。这个备注已经在文档里挂了至少 4 年（commit），看来我们还得再多等一会儿。<br />接下来，你可能会注意到，与 C 和 Go 不同，int 始终是 32 位的。但是，在 0.4.3 发布版本中，它现在在 64 位系统上变成了 64 位，在 32 位系统上则是 32 位。<br />你可能会说只是几处小错误，但并不是，整个 V 语言文档皆是如此。维护文档使其保持正确状态的开发者少得可怜。文档经常对语言中最重要的部分语焉不详——例如，关于泛型的章节仅仅由几个代码示例组成，没有任何恰当的说明。<br />文档中类似下面这样的“画饼”也很常见：<br />“目前，泛型函数定义必须声明其类型参数，但未来 V 将会从运行时参数类型中的单字母类型名称推断泛型类型参数。”<br />现在你向下滚动到了最有趣的部分：V 语言的内存管理。在现代编程语言中，这几乎是整门语言最核心的部分。V 提供了什么？首先是“垃圾回收”（Garbage Collection），这是一个大大简化生活的好选项；第二个选项是“arena”，同样是一个极佳的选择；对于有经验的程序员，还提供了“手动内存管理”（manual memory management）。最后一个、也是最有趣的选项是“autofree”（自动释放）。<br />前两个选项运行得还算相对良好，所以我们来看看最后两个。<br />在这种模式下，所有内存分配都使用 libc 的 malloc 函数，开发者必须自行清理内存。但是标准库函数内部所分配的内存该如何处理呢？让我们来看看 is_ascii 方法：<br />它看起来可能像是一个微小且安全的函数，但如果你在手动内存管理模式下调用它，就会产生内存泄漏，因为没有人会去清理 bytes() 方法所分配的内存。类似的例子还有很多。而这还仅仅是字符串方法中的情况；在整个标准库中，这类问题比比皆是。<br />好吧，你可以选择在自己的代码中不使用这些函数。那么让我们看看如果你想在“手动”模式下用 V 编写一个 Web 服务器会怎样。V 包含一个名为 vweb 的内置框架。官方示例包含以下代码：https://github.com/vlang/v/blob/master/examples/vweb/vweb_example.v。<br />我已经尽可能地将其简化了：<br />接下来的数组在 vweb 代码中从未被释放。这意味着你基于 vweb 的应用程序将会发生泄漏。<br />好吧，并非所有人都要写 Web，也许你只需要一个简单的 CLI 工具？不幸的是，标准库中针对 CLI 的所有字符串插值都会分配内存，随后却未进行清理。<br />根据以上种种，我可以得出如下结论：V 语言中的手动内存管理是一项根本无法在实际生产应用中使用的特性。充其量只能用在你从零手写一切、或者内存泄漏对你无所谓的极简单程序中。<br />现在我们来到了本节中最精彩的部分。来看看文档中是如何描述这种模式的：<br />“第二种方式是 autofree，可以通过 -autofree 启用。它负责处理绝大多数对象（约 90-100%）：编译器在编译期间自动插入必要的 free 调用。剩余的小部分对象则通过 GC 释放。开发者无需更改代码中的任何内容。它‘开箱即用’，就像在 Python、Go 或 Java 中一样，只是没有追踪一切的繁重 GC，也没有针对每个对象的昂贵引用计数（RC）。”<br />令人惊讶的是，他们几乎做到了字字皆是谎言。让我们从头说起，文档向我们保证 90% 到 100% 的内存都会由编译器插入的 free 调用自动清理。这听起来相当乐观，考虑到要在 Rust 中实现相同的效果，你需要给编译器提供大量的辅助信息。V 编译器看来可比 Rust 编译器“聪明得多”了。<br />当我在查看该语言代码仓库中的讨论时，偶然发现了一条有趣的评论（链接）：<br />“在我的 V 程序中，只有 0.1% 是被 autofree 释放的，99.9% 都是被垃圾回收器释放的。这完全取决于你正在编写的程序。不过 GC 确实还是挺快的。”<br />但是，我们别直接把这当作事实，而是亲自尝试一下。这是最简单的代码：<br />使用 v -autofree main.v 进行编译，并运行 valgrind：<br />出状况了。同样有趣的是，我们在程序中只有一个数组，但 valgrind 却显示分配了 1kb 内存。记住这一点，因为我们随后就会谈到官网所声称的“V 避免了不必要的内存分配”。<br />让我们编译一个带有 vweb 服务器的简单示例：<br />然后我们用 valgrind 运行它。我没有向服务器发起任何请求，只是等待了 10 秒钟：<br />没有任何请求，在 10 秒内我们确确实实丢失了 1kb 内存。<br />让我们回到文档中的描述：<br />“剩余的小部分对象则通过 GC 释放。”<br />然而这同样不是真的。我找到了最近的一个提交，在该提交中，只要传入 -autofree 标志就会立刻将 gc 设置为 none：<br />因此，这一说法完全是假的。<br />你知道为什么要进行这项更改吗？我们来看一个例子：<br />我们再来看看 free 函数的定义：<br />$if 指定了在编译期间求值的条件。在此之前，当我们仅传入 -autofree 而没有显式传入 -gc none 时，条件 $if gcboehm ? 为真，并且由于 gcboehm_leak 默认情况下也未设置，导致 free 最终变成了一个什么都不做的空操作（noop）函数。<br />以下是生成的 C 代码：<br />所有这些代码都是 C 预处理器指令，因此编译器看到的代码如下：<br />而这根本不会释放任何东西。<br />让我们回到文档：<br />这根本就不是真的，即便 V 在某些地方插入了 free，它们也毫无作用，所有东西全都是由 GC 清理的。即便在这次修复之后，这也依然不是真的，因为当传入 -autofree 标志时，GC 就被禁用了。<br />你可能看过这个视频：https://www.youtube.com/watch?v=gmB8ea8uLsM<br />在视频中，该语言的作者展示了他的编辑器 Ved，并演示了他是如何使用 v . -autofree 编译它的，还声称这项技术已经足够成熟，像文本编辑器这样复杂的应用都不会发生内存泄漏。<br />我尝试用最新版本的 V 加上 autofree 标志来构建该编辑器，并在启动二进制文件时遇到了以下错误：</p>
<p>如果不开启 autofree，一切运行都毫无问题。好吧，显然 autofree 在这 3 年里只是变得更糟了。<br />有趣的是，该语言作者自己的项目却无法在其语言的主打特性下正常工作。<br />让我们尝试使用 autofree 来构建编译器本身：<br />接着让我们尝试用生成的可执行文件再次编译自身：<br />然后我们在运行时遇到了一个错误：<br />让我们回到文档的最后一部分：<br />开发者不需要在其代码中做任何修改。“它就是能直接工作”，就像在 Python、Go 或 Java 中一样，只是没有追踪一切的繁重 GC，也没有为每个对象维护昂贵的引用计数（RC）。<br />正如我们上面所发现的，在 commit 207203f 之前，传入 -autofree 标志时我们得到的是“追踪一切的繁重 GC”，而在那之后，即便在最简单的示例中我们也会遭遇内存泄漏。<br />我还想指出的是，该语言作者早在 0.3 版本（提交）时就承诺让这项技术达到“生产可用”，然后推迟到 0.5，可能又推到 0.6，并在路线图（ROADMAP）中写着 1.0。<br />“弄虚作假，直到弄假成真”（Fake it till you make it）。<br />耐人寻味的是，该语言作者认为将 autofree 与 GC 配合使用毫无意义，尽管文档中写明正是由 GC 来清理剩余“10%”的对象。真是不可思议。<br />因此，由以上种种可以得出结论：autofree 是一项非常不成熟的技术。该语言作者试图通过那个视频来推销它，从评论来看他也确实成功了；我不明白为什么人们会相信他，因为一个简单的测试就能表明，即使是简单的程序也会疯狂泄漏内存。<br />时隔近 5 年，V 最引人注目的特性依然处于非常早期的状态，而作者除了不断承诺一切很快就会实现之外什么都没做。<br />显而易见，该语言作者及其忠实拥趸会开始辩解称 autofree 尚未达到生产可用状态，但我上面所描述的那些问题，哪怕对于最初的 Alpha 版本来说都是不可接受的。<br />在本节中，我想讨论 V 在内存管理系统方面的其余缺陷。<br />V 通过使用值类型、字符串缓冲区、倡导无抽象的简洁代码风格，从一开始就避免进行不必要的内存分配。<br />官方声称 V 不会进行不必要的分配。让我们来验证一下。在 V 中，如果你将一个结构体转换为接口，你就会触发内存分配，且没有任何办法可以避免它，因此你会无缘无故地得到一堆额外的内存分配：<br />memdup 通过 _v_malloc 将内存分配到堆上。在这小段代码中，你还可以注意到 V 的另一个特性——“具可读性”的生成 C 代码。<br />V 中没有逃逸分析，你在函数中创建的任何指针都会向堆发起不必要的分配：<br />文档中写道：<br />出于性能考虑，V 会尽可能尝试将对象放置在栈上，但显然必要时会在堆上进行分配。<br />V 仅对整个函数中从未被获取过地址的对象不进行堆分配；V 不做逃逸分析，并将任何获取地址的操作都视作从函数中逃逸（以“逃逸分析”的概念而言）。而这与“出于性能考虑，V 会尽可能尝试将对象放置在栈上”的说法并不相符，因为任何取地址操作都会导致在堆上分配，哪怕这本可以避免。<br />在上面的例子中，你可能会说这完全合理，b 逃逸进了 println 函数，那么我们来看看没有该调用的例子：<br />结果仍然分配在堆上。<br />V 没有采用聪明的逃逸分析，而是搞了一个通过特殊堆属性实现的 hack 手段：<br />解决这一困境的办法是在声明 struct MyStruct 时加上 [heap] 属性。它指示编译器始终在堆上分配 MyStruct 对象。<br />这是一个糟糕的解决方案，因为开发者无法在每次实例化时控制对象分配在何处；通过给结构体打上这个属性标签，你自动获得了一堆本可以避免的不必要分配。<br />本节开头的引用中还提到了字符串缓冲区，那么我们来看一看：<br />分配了 48 字节，尽管字符串本身只有 5 字节。<br />也许字符串插值的情况会好一些？<br />喔唷，为一个 11 个字符的字符串分配了 304 字节。令人叹为观止。<br />在本节中我们再多聊聊 arena（内存池）。<br />关于这种模式文档是怎么告诉我们的？我在文档中找到的唯有一处提及是这一行：<br />Arena 分配可通过 v -prealloc 使用。<br />哎呀。正如我所说的，V 的文档很烂。<br />还是让我亲自来解释吧，arena 是一种内存处理方式，即在程序启动时一次性分配一大块内存，例如 16 MB。随后，所有的分配都在这个块中进行；所有显式的内存释放操作均不起作用。当一个块满了，就再分配一个新的块，依此类推。在程序结束之前，所有内存统一释放。<br />这种方法通常最适合短生命周期的程序，例如编译器，在这类场景下，相比更快的运行时间，内存消耗的优先级可能较低。<br />这种模式的优势是什么？如果程序中经常分配小对象，那么它们的分配实际上只需几次算术运算，而不是每次都向操作系统请求内存。<br />让我们深入探究 V 的世界。所有实现代码都可以在 prealloc.c.v 文件中找到。<br />我们首先看到的是该模块的 @[has_globals] 属性。但等一下：<br />默认情况下 V 不允许使用全局变量。然而，在底层应用中它们有其用武之地，因此可以通过编译器标志 -enable-globals 启用其使用。<br />在下方我们确切看到了该标志存在的原因：<br />全局变量。__global。<br />但既然它是全局的，那么多线程怎么办？我没有看到任何互斥锁（mutex），这意味着 -prealloc 无法安全地用于多线程程序。文档中哪儿写了这个吗？并没有。该文件本身里倒是有一条写明这一点的注释，显然该语言作者认为所有用户都应该先去阅读编译器的源代码。<br />有些部分不成熟，有些部分不安全，有些部分无法工作，有些部分则未能如文中所述那样运作。这还仅仅是我能找出的问题。如果这种粗制滥造随处可见，这可能意味着极有存在更多我们根本尚未察觉的严重缺陷。<br />关于 V 中内存处理的讨论我们就到此为止。<br />接下来，在进入下一个有趣的话题——V 中的协程之前，我们先快速浏览一下官网。<br />官网上声称该语言中不存在 null（在不考虑 unsafe 代码的情况下）。于是：<br />不存在 null，但是你可以把 0 赋值给指针。¯_(ツ)_/¯<br />接着官网告诉我们该语言中没有 UB（未定义行为）。让我们打开维基上关于 UB 的词条。</p>
<p>V 中的溢出确实直到最近才不再是未定义行为（UB）。从该语言发布到修复这一 UB 整整花了 4 年时间。尽管文档对此只字未提，且该语言也没有规范，因此对用户而言，这一事实隐藏在编译器代码之后。以下是作为修复项添加的 C 编译标志的描述：</p>
<p>“该选项指示编译器假定加法、减法和乘法的有符号算术溢出使用二进制补码表示进行环绕。该标志启用某些优化并禁用其他优化。”</p>
<p>坦率地说，正如官网所宣称的一门安全语言那样，我期望能够安全地执行这些操作，并具备指定溢出行为的能力（如 a.safe_add(b) 或 { panic(&quot;aaaa&quot;) }），且默认情况下应当直接 panic。</p>
<p>让我们尝试来自 wiki 文章的另一个例子：</p>
<p>来自 V 文章的代码：</p>
<p>一模一样，这就是未定义行为。</p>
<p>让我们尝试解引用空指针：</p>
<p>好吧，让我们创建一个带接口字段的结构体：</p>
<p>糟糕，问题在于未初始化的接口类型字段实际上具有未定义的值。但你根本无法在文档中找到关于此的信息。</p>
<p>无全局变量（可通过标志为内核等底层应用启用）</p>
<p>我们已经见过通过 [has_globals] 实现的变通手段。尽管看起来它只允许编译器使用。所以这一点属实。</p>
<p>让我们转到性能部分：</p>
<p>零成本 C 互操作</p>
<p>确实，这是真的。</p>
<p>最少内存分配</p>
<p>上面已经证明这并非事实。</p>
<p>无需运行时反射的内置序列化</p>
<p>编译为无任何依赖的原生二进制文件：一个简单的 Web 服务器仅约 250 KB</p>
<p>让我们尝试在 Ubuntu 22.04 上使用 V 0.4.3 c3cf9ee.cc220e6 编译官方示例。</p>
<p>使用 -prod 标志编译该示例花费了无限长的时间，因此我手动插入了所需的优化标志。</p>
<p>让我们尝试编译：</p>
<p>哎呀，4 MB，离 250 KB 差得有点远。让我们尝试几个小技巧：</p>
<p>好点了，只有 2.7 MB，但依然不是 250 KB。</p>
<p>我在 GitHub 讨论区找到的另一个技巧：</p>
<p>我们越来越接近了，但我已经没有别的招数了。</p>
<p>好吧，也许所有东西都被静态链接了，所以体积才这么大：</p>
<p>那么带上 -d use_openssl 会怎样？</p>
<p>嗯，结果是体积大了 5 到 17 倍，而且出现了一大堆依赖项。</p>
<p>与 C 一样快（V 的主要后端编译为人类可读的 C 代码），并生成等效代码。V 确实为了安全性引入了一些开销（例如数组越界检查、无需垃圾回收），但在性能更重要时，这些特性可以被禁用/绕过。</p>
<p>仅仅因为编译成 C，并不意味着你就能立即获得与手写 C 代码相同的性能。我在上面已经展示了 V 在处理内存时是多么粗心大意；任何有经验的 C 开发者都不会犯下这样的错误。</p>
<p>V 可以像 C 一样快，但那样的话，语言中的许多功能就无法使用了：字符串插值、接口、和类型（sum types）、数组等等。</p>
<p>官网称：</p>
<p>V 可以转译你的整个 C 项目，并为你提供安全性、简洁性以及编译加速（通过模块）。</p>
<p>听起来很棒，让我们来试试。在此之前，让我们注意另一项声明：</p>
<p>关于转译《毁灭战士》（DOOM）的博文即将发布。</p>
<p>你早在 2020 年就能在官网上找到同样的说法。也许我们还需要再等一段时间。在整篇文章中，我已经多次指出这类情况；这就是 V 语言的显著特征：只承诺不兑现。</p>
<p>好吧，让我们来看看 c2v。它的代码仓库可以在这里找到：https://github.com/vlang/c2v</p>
<p>它不需要单独下载，可以通过 v translate 使用。顺便提一句，你在 v help 中是找不到这个命令的：</p>
<p>我有提到过文档很差吗？</p>
<p>让我们看一个简单的例子：</p>
<p>让我们运行命令 v translate wrapper main.h 并打开生成的文件：</p>
<p>看起来一切都好，但模块名是不正确的。</p>
<p>在 C 语言库中，常量通常使用 #define 定义：</p>
<p>但结果是，c2v 直接跳过了这个常量，它并没有出现在 V 代码中。包含 #define 生成的 V 代码与不包含它的代码完全一致。</p>
<p>好吧，让我们看一个稍微复杂一点的例子：</p>
<p>这是一个简单的字符串实现。</p>
<p>等等，这个 Ll 是什么东西？</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-20 06:36 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://n-skvortsov-1997.github.io/reviews/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ure-of-web-browsers-html-33c43b6fa3876ea5" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2310" data-content-paragraphs="32" data-published-at="2026-09-19T22:27:02.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 06:27</span>
</div>

### [关于网页浏览器未来的思考](https://sarahjamielewis.com/log/2026/future-of-web-browsers.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Thoughts on the Future of Web Browsers</div>

<div class="article-body" data-article-body="true"><p>早在 7 月，受 Firefox 又一次集成 AI 功能的刺激，我在 Mastodon 上发了一小串推文：</p>
<p>“如果独立、拒绝粗制滥造（non-slop）的万维网还有哪怕一丝未来，那么现在就是所有 Firefox 分支（fork）齐心协力、共同维护一个与 Mozilla 完全隔离的硬分支（hardfork）的时刻了。</p>
<p>这个项目规模过于庞大，单靠任何小型项目（甚至可能就算所有小型项目加在一起）都无法单独承担，但它又太过重要，绝不能继续任由 Mozilla 这样的机构掌控。</p>
<p>若没有如此大胆的合作，我恐怕我们早已满盘皆输。”</p>
<p>Mozilla 及其旗下的 Firefox 已经明确了他们想要前进的方向——并且在过去的十年里始终如一地向着那个方向迈进。这里不会有什么自我救赎的故事，他们不会掉转船头——随着每一周、每一个月的流逝，Firefox 增添了越来越多的劣质冗杂功能（slop），与其创立之初的愿景渐行渐远。</p>
<p>像 Tor Browser 和 Waterfox 这样的项目正在煞费苦心地禁用或修补剔除最糟糕的部分——但每一次版本发布都变得更加费时费力，也难免会有漏网之鱼。</p>
<p>在推文的其余部分中，我提出了一个极其乐观的荒谬计划的粗略构想，涉及让众多分支联合起来，共同维护一个独立于 Mozilla 的基础版本，或许可以利用 Tor 项目或其他分支已经完成的工作。</p>
<p>这串推文以及随后的讨论催生了 base browser 项目。这是一次尝试，旨在提供一个让人们聚集并探讨理念与方向的平台。</p>
<p>受到这种势头的鼓舞，我着手制作了一个补丁，旨在彻底移除 Firefox 中所有的 AI 集成代码，其结果是一个极其夸张的补丁：修改了 1605 个文件，删除了 852,297 行代码，总计达到 37 MB。</p>
<p>在接下来的几周里，我和一个小型志愿者团队又开发了几个补丁，修改了那个庞大的 AI 补丁，并编写了一些脚本将 37 MB 的体积压缩到合理的尺寸，缩减到了 1 MB 稍弱（我们通过使用 Git 现有的不可逆删除标志，以及一些允许对文件重新打补丁的自定义 Python 脚本做到了这一点）。特别感谢 cliffmccarthy 和 gellge，以及所有为测试/讨论这些补丁和项目做出贡献的人。</p>
<p>如今，base browser 提供了一套基于当前 Firefox 153 ESR 的补丁集，将对用户不友好的特性彻底从代码库中剥离（这与常见的仅禁用这些特性的软分支做法截然不同）。</p>
<p>我坚信彻底删除这些特性才是正确的做法，原因恰恰在于让这件事情变得无比痛苦的根源——这些功能体量庞大，且与浏览器核心的集成越来越紧密。它们在整个 Firefox 代码库中所占的比例也越来越高，坦白讲：</p>
<p>现在，我已经做好了输掉这场战役的充分准备。我并不认为有足够的资金或足够的开发者精力来长期维护这样的项目。除非我们所有人齐心协力，让打造这样一个基础版本成为可能。</p>
<p>这项努力建立在流沙般的基石之上。Firefox 的步伐已经远远超出了简单的 AI 集成，它正在构想这样一个未来：整个浏览器上下文成为一个“智能窗口（smartwindow）”，它既是为人打造的，也是为第三方 AI 智能体（agent）打造的。</p>
<p>我不希望万维网走向那个方向，而且坦率地说，我也无法盲从。</p>
<p>正如我也曾说过的，我并不是做这件事的合适人选，但我至少需要做点什么来尝试促成它。</p>
<p>如果这一切的最终成果只是让少数几个人学会了如何从源代码编译 Firefox，我也会视其为一种胜利。如果有任何项目最终使用或采纳了这些补丁，我将会欣喜若狂。</p>
<p>除了尝试通过补丁剔除最过分的集成之外，我也一直在探索减少对 Firefox 依赖的其他途径：</p>
<p>但即便做到了这一切，问题依然存在：这些策略的存在只是为了对抗占主流地位的“劣质垃圾主导”叙事，其本身并非具有启发性的建设行为。</p>
<p>我不想把我所有的精力、时间和生命，仅仅花在为了“维持现状”而进行的抗争上。我年轻时埋头于编程书籍、脑海中满是代码，是因为我想创造有意义的事物，是因为我想更好地理解这个世界。</p>
<p>更重要的是，我深信未来的到来，绝不可能靠拾人牙慧、将过去碾碎并重新加热端上桌，变成毫无远见的劣质残羹。</p>
<p>在过去十多年里，网络标准已经严重饱和并向商业利益过度倾斜。</p>
<p>要想将一款网页浏览器维持在任何具备质量保证和安全性的水准，你需要一支资金充足的团队——或者在你的依赖树中依附于这样的团队。</p>
<p>金钱鲜少是不附带任何条件的，而在每一次页面加载中，你都能感受到那种存在于纯粹哲学愿景与预期回报之间的张力。</p>
<p>曾几何时，在 21 世纪初，Firefox 引发了一场浏览器复兴，人们对“浏览器”所能成为的样子充满了兴奋与憧憬……信息流（feeds）、博客集成、集体标签、开放评论……</p>
<p>最初的精神是：万维网应当兼具可读性与可写性，并进一步延伸至可共享性。</p>
<p>在某种程度上，在经济与技术的重塑下，我们得到了这一愿景的某种粗糙近似品……被塑封包装且过度消毒清洗。</p>
<p>我经常会想起像 Amaya 以及后来的 Flock 等浏览器所展现的愿景：浏览器不仅应当是消费的工具，更应当是创作的工具。</p>
<p>我心中依然怀揣着这一愿景。在过去几年里，我尝试开发了一些轻量级浏览器，支持 Gemini（是网络协议，不是大语言模型，唉）以及 RSS，还有其他未被如今的现代标准所污染的网络技术。</p>
<p>我并不确信那就是“终极未来”，但它或许可以成为“未来的一种可能”。</p>
<p>借用最近给予我灵感的一句古老号召……我们需要新的喧鸣。</p>
<p>我仍在努力去寻找它。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-20 06:27 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://sarahjamielewis.com/log/2026/future-of-web-browsers.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-aring-out-a-parents-home-5f4684aea6c994f5" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="381" data-content-paragraphs="3" data-published-at="2026-09-19T20:00:56.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">💹 宏观资本与产业</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 04:00</span>
</div>

### [“我觉得自己像是在抹去她的一生”：清理父母故居的揪心之痛](https://www.theguardian.com/society/ng-interactive/2026/sep/20/i-feel-like-im-cancelling-out-her-life-the-wrenching-work-of-clearing-out-a-parents-home)
<div class="original-title-sub"><span class="orig-tag">原文</span> ‘I feel like I’m cancelling out her life’: the wrenching work of clearing out a parent’s home</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/06509a48907a09ba6466ca3797dcfcff355ee2f3/0_229_4000_3200/master/4000.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=93470e3a77097cb962786e4c0ea6ca1a" alt="“我觉得自己像是在抹去她的一生”：清理父母故居的揪心之痛" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>从旧情书到细线绳，我们的家中堆满了各式各样的杂物。当不得不清理腾空父母的住所时，将记忆与杂物逐一厘清往往令人心力交瘁。</p>
<p>1952年结婚后不久，艾伦·罗杰斯（Ellen Rogers）的母亲费伊（Fay）买了一套搭配考究的卧室用品——一件碎花晨袍和配套床罩。在我与罗杰斯通电话的那天，她做出了一个艰难的决定：将晨袍和床罩装进垃圾袋，准备送到慈善义卖店。“我心里特别难受，”她说。</p>
<p>费伊于5月离世，享年97岁，她的一生都住在悉尼内城区坎珀当（Camperdown）的同一栋联排房屋里。罗杰斯在这栋房子里长大，并在三年前搬回来担任母亲的全职住家看护。如今，她正在清空房屋以便将其出售。她必须做出无数次抉择：这件物品该归入哪一类——是留给家人、当成垃圾扔掉，还是捐给慈善机构？“这太令人不知所措了——东西实在太多了，”罗杰斯说，“甚至包括她收到的每一张该死的贺卡。”</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-09-20 04:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#宏观资本与产业</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/ng-interactive/2026/sep/20/i-feel-like-im-cancelling-out-her-life-the-wrenching-work-of-clearing-out-a-parents-home" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-a-year-to-fix-security-554b37481aef911b" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="6195" data-content-paragraphs="58" data-published-at="2026-09-19T19:27:46.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-20 03:27</span>
</div>

### [我们只有一年时间修复各处的安全隐患](https://jyn.dev/a-year-to-fix-security/)
<div class="original-title-sub"><span class="orig-tag">原文</span> we have a year to fix security everywhere</div>

<div class="article-body" data-article-body="true"><p>2026-09-04 • 大语言模型 • 安全</p>
<p>GLM 5.3-flash 于上周发布，这意味着“玻璃翼项目”（Project Glasswing）和“黎明项目”（Daybreak）的时间所剩无几了。现在，任何人都可以获取到具备危险黑客攻击能力的廉价模型，且不带有任何拒绝恶意行为的常规安全防护机制。我们需要在全行业范围内修复漏洞，以免被打得措手不及。而在计算历史上，我们首次拥有了做到这一点的能力！我们可以利用比人类行动更快的前沿大语言模型，在剩余的时间里发现并修复这些问题。剩下最艰难的部分是部署这些修复补丁。</p>
<p>对大多数人来说，这听起来可能像是胡言乱语或歇斯底里的过度反应，因此以下是它的真正含义：</p>
<p>本文接下来的内容将阐述为什么我如此确信这是一场迫在眉睫的威胁，以及我们能够采取哪些应对措施。</p>
<p>全世界任何人都可以下载并修改 GLM 5.3-flash。</p>
<p>GLM（“通用语言模型”）系列由中国人工智能实验室 Z.ai 公司（前身为智谱 AI）开发。当该模型由 Z.ai 托管时，它附带了法律所要求的限制措施：</p>
<p>Z.ai 在互联网上公开释出其模型（“开源权重”模型）。一旦公开，像 DeAlignAI 这样的组织就会发布其“去安全化”（abliterated）版本，外科手术式地剔除了任务拒绝机制。DealignAI 表示，该去安全化模型在 Harmbench-320 上的得分为 0%，该基准测试用于检测模型是否会拒绝执行涉及虚假信息、网络犯罪、生物武器以及诸如制造管状炸弹等其他非法行为的任务。</p>
<p>换句话说，这个模型基本上愿意做任何事情。</p>
<p>GLM 5.3-flash 完全可以在现成的消费级硬件上本地运行。</p>
<p>“Flash”在很大程度上是一个营销术语——它是相对于其他模型而言的，并非指某种特定的技术路线。网上的各路人士已经在本地对 GLM 5.3-flash 进行了基准测试。这里有一个例子，展示了在一块价值约 6000 美元的英伟达 GPU 上能达到约每秒 20 个 token 的吞吐速度。</p>
<p>9 月 22 日，苹果将发布配备 256 GB 统一内存的 M5 Mac Studio。“统一内存”意味着它可以在主机操作系统和 GPU 之间共享。这足以运行 5.3-flash，并且在发售后很可能会达到约每秒 30 个 token。256 GB 版本的起售价约为 9500 美元。</p>
<p>软件方面的进一步改进可以通过调整模型解码器使吞吐量再提升 50%。如果我们将其推算到 M5 上，总吞吐量将达到每秒约 45 个 token。</p>
<p>每秒 45 个 token 足以在 3 秒内写出这段代码：</p>
<p>换句话说，在本地运行这个模型不仅是可行的，而且完全可以用普通个人的积蓄办到，并且能以极高的速度全天候运行。</p>
<p>GLM 5.3-flash 非常接近我们目前打造出的最顶尖 AI 的能力。我们制造出的 AI 已经在野外发现并利用真实存在的安全漏洞。未来我们开发的 AI 能力只会越来越强。</p>
<p>GLM 5.3 在 CyberGym 上的得分为 84.5%，在 ExploitBench 上的得分为 54.4%。我们虽然没有 5.3-flash 的直接数据，但大概率会与此持平或略低。去安全化模型则会再稍低一些。</p>
<p>CyberGym 衡量的是过去已被开源项目发现并修补的现实世界漏洞。换言之，该代表性样本中 84.5% 的漏洞，GLM 5.3 仅仅通过查阅公开的源代码和 CVE 描述就能复现出来。</p>
<p>ExploitBench 衡量的是模型是否能真正利用漏洞造成危害。它采用递进评分制，对部分利用给予部分分数，最终步骤是任意代码执行。</p>
<p>作为对比，ExploitBench 上的领先（“前沿”）模型是 GPT-6 Astra（100%），GPT-5.6 Sol 位居第二，得分为 78.5%。CyberGym 上的领先模型则是……GLM-5.3。第二名是 GPT-5.6 Sol，得分为 83.6%。OpenAI 尚未公布 Astra 在 CyberGym 上的数据，但一旦公布，很有可能会超越 GLM 5.3。</p>
<p>你可能会认为这些只是人造的基准测试，但安全专家表示，如果没有大语言模型的协助，他们如今在安全竞赛中已无法保持竞争力。</p>
<p>我们针对远程代码执行和逆向工程利用缺乏足够的标准基准测试，但我们确实掌握了 GPT 5.6-Sol 在没有任何人类介入的情况下攻击现实世界基础设施的证据。</p>
<p>我认为人们极有可能将 GLM 5.3-flash 直接对准公网——对准运行真实基础设施的真实服务——而它既有能力也有意愿去发现并利用这些漏洞。</p>
<p>综上所述，这意味着：</p>
<p>其结果就是，我们如今身处的世界中，网络安全攻击可以在一个 for 循环里自动化批量运行。</p>
<p>此前，美国的前沿实验室已经意识到这一趋势有一段时间了，并一直在致力于发布安全补丁。“玻璃翼项目”和“黎明项目”一直在与整个科技行业的企业、基金会、政府和非政府组织合作，在这一能力被开源之前，利用前沿模型发现并修复漏洞。他们做了很多好事，我非常庆幸这项工作得到了资助。在获得初期资助后，这两者都被当作产品出售，这充其量让人觉得有点可疑，但他们至少向安全机构免费发放了额度。</p>
<p>然而，我们的时间快用完了。尽管“黎明项目”和“玻璃翼项目”做出了贡献，但真正困难的部分在于部署，而不是修复漏洞本身。关键系统往往需要物理接触，或者为了避免停机而需要经过周密计划的分阶段逐步部署，这两者都会拖延补丁的上线。如果你的电网运行的是 Windows Server 2012，那么 Linux 内核即使打了补丁也无济于事。</p>
<p>这里也有一些需要说明的细节：1.5 倍的速度提升在 GLM 5.3-flash 上可能没有那么明显；去安全化模型在其未受过训练的恶意任务上表现可能较差；没有大量人类介入的情况下，从“搞垮这个目标”跨越到可用的漏洞利用程序可能会很困难。但这些困难都只是暂时的，模型还在不断变得更强。从历史上看，GLM 大约落后 OpenAI 和 Anthropic 3 到 6 个月，我认为到明年这个时候，我们很可能会看到一款达到 Astra 级别的 GLM 模型。到了那个时候，公共或私有基础设施遭受成功网络攻击的风险将极高。我们可能很快就要被迫上一堂关于电网限电的惨痛教训课了。</p>
<p>总的来说，攻击者能力提升的速度要快于防御者改善自身防护态势的速度。即便模型性能不再快速扩展（目前完全没有放缓的迹象），它们强大到足以开始利用这些漏洞也只是时间问题。我们必须立即行动，越快越好。</p>
<p>局势正在迅速变得诡异且令人恐惧。我们需要带着紧迫感采取行动，而不是惊慌失措。以下是我们能做的一些事情：</p>
<p>使用前沿模型进行安全扫描相对廉价，不需要太多的激励措施。真正需要激励的是部署与修复，以及首先要求各类组织审视自身安全实践。按照当前的政策走向，最大的风险是堆积如山、从未得到修复且未经分拣归类的告警。</p>
<p>如果你处于决策者的位置，以下措施将有所帮助：资助安全工程，最好提供灵活的专项资助，由组织自行决定用于招聘人员或采购技术产品。制定提升安全性的强制要求和激励机制，尤其是针对高频次的渗透测试。鼓励在有人工监督的情况下使用前沿模型进行渗透测试。鼓励加强物理隔离（airgapping），抑制无线远程更新（OTA）：更新应当频繁进行，但需要物理访问权限。对于无法实现物理隔离的系统，激励频繁、经过签名且经过测试的部署。惩罚不定期审查和修订安全态势的行为；若因此导致被黑客入侵，则加大惩罚力度。要求在发现漏洞后、基于风险设定的期限内完成修复，并由联邦资金为修复提供支持。软硬兼施，胡萝卜与大棒并用。</p>
<p>以下是一些可能值得深入探讨的具体事项：</p>
<p>全面要求频繁更新安全态势。随着新模型的发布，强制规定使用特定模型或提供商的做法很快就会过时。这是一个快速变化的领域，随着威胁模型（无论指威胁建模还是指威胁性AI模型）的变化，12个月前有效的防御措施一年后可能就不再奏效。应当强制要求进行测试并落实问责，而不是硬性规定具体技术。</p>
<p>禁止在美国或欧洲的任何地方托管 GLM 5.3-flash 的权重，在短期内收效甚微，在长期内则毫无用处。在短期内，它只会再次冒充在文件共享网站上；你想要消灭它，绝不会比消灭盗版更容易。在长期内，其他实验室也会发布同样能力的其他模型。</p>
<p>一刀切地禁止访问 Mythos 或 Astra 会让情况变得更糟；这恰恰会在防御者最需要强力工具的时刻夺走他们手中的武器。相反，应当像前沿实验室已经在做的那样，将访问权限限制在经过批准的组织和个人。除非有实验室出现不守规矩的迹象，否则这大概不需要出台新政策。</p>
<p>禁止销售或出口新型 GPU 或大容量统一内存，虽能稍微延长这一年的窗口期，但从长远来看无济于事。它对现有硬件无能为力，而且会极不受欢迎。尤其是内存，由于所有设备都在使用它、而不仅仅是专用 AI 系统，因此极难进行监管。</p>
<p>总的来说，应优先考虑那些针对安全发现进行分拣（triage）和修复的政策。发现漏洞正变得极其廉价，但修复漏洞却并非如此。</p>
<p>利用涌入该行业的（毫不夸张地说）数百亿美元资金来全面提高安全性。尽可能多地招聘安全工程师，并资助现有的开源维护者。指导这些工程师和现有维护者去分拣、设计、审查、向后移植（backport）以及部署补丁，而不是主要让他们去寻找漏洞或编写新代码。</p>
<p>善用 Astra、Mythos 和其他前沿模型，在攻击者动手之前发现风险。使用结构化提示词（例如谷歌的 Unsafe Rust Review）；这比直接让模型“仔细查找 bug”要有效得多。</p>
<p>大语言模型擅长编写补丁，但前提不能只靠单次提示词。给它们结构化的提示词以及迭代的自我审查循环，直到大语言模型自身判定该补丁质量达标。只要可能，就让它们去测试自己的修复方案，而不是凭空猜测补丁是否有效。只有到了这一步，才应认为它准备好交由人工审查。</p>
<p>对智能体（Agent）本身进行沙箱隔离。此前 OpenAI 与 HuggingFace 相关的安全事件，正是源于某前沿实验室在测试模型时发生的；如果你疏忽大意，你自己的大语言模型也很容易引发事故。将凭据限制在狭窄的权限范围内。如果凭据签发机构不支持限定权限范围的凭据，就在服务前端放置一个受信任的接口，由该接口自行添加权限范围限制；切勿让智能体直接访问宽泛权限的凭据。不要依赖仅过滤 GET 请求的做法。在防火墙层级拦截请求，并且仅放行受信任的域名列表。使用网络代理和受信任的接口来过滤端点，而不是依赖大语言模型能够覆盖篡改的本地配置。保留智能体进行的每一次状态变更或网络请求的日志。</p>
<p>投资形式化验证、模糊测试（fuzzing）和基于属性的测试（property testing），以及内存安全语言。大语言模型擅长编写 Lean 证明和模糊测试用例。我不在乎你用 Go 还是 Rust，但看在上帝的份上，新代码千万不要再用 C 或 C++ 了。</p>
<p>投资于分拣与分类（triage）：记录哪些系统版本受到了影响，为关键安全发现指派具体的人员责任人和截止日期，并构建开发者工具，在漏洞修复后自动更新或关闭相关 Issue。</p>
<p>投资于向后移植（backport）、发布和部署机制。测试升级与回滚等所有这些枯燥的环节。如今开发者工具成本很低；向其投入计算代币（tokens），这样就能在每个补丁上耗费更少的人工时间：包括依赖更新自动化、签名且可重现的发布、以及提升部署速度。工程师的时间应当花在协同披露和高频发布上，而不是耗在单个补丁的抠弄上。</p>
<p>弃用陈旧且不安全的版本。行业正在发生巨变：你在争分夺秒，依赖你的人同样在赶时间。以此作为杠杆促使他们升级。尽可能编写有助于他们自动升级的开发者工具。追踪用户是否在进行升级和打补丁；如果他们没有，就加大对相关工具链的投入。</p>
<p>未来将会产生大量补丁，而且禁令/披露保密期（embargo）一旦解除，这些补丁涉及的漏洞很快就会被利用。衡量从补丁被报告到最终部署和采纳的端到端耗时。开展专项行动攻克瓶颈、加快流程。在任何可能的情况下，尽量缩短保密协调期：既然你能发现缺陷，攻击者大概率也能发现，因此留给协同处理的窗口期比你习惯的要窄得多。</p>
<p>投资供应链安全。清点盘点你的软件和基础设施依赖项。同时也要盘点你自己的系统：生产环境中运行着哪些版本？你运行的哪些服务处于无人维护状态？你的哪些系统已经到了生命周期终点（EOL）？你终于有能力逐字审查所有依赖项而无需草草略读了；放手去做吧，优先审查高权限和直接暴露在安全风险中的依赖项。大语言模型在拿到源代码后非常擅长找 bug：充分利用这一优势。</p>
<p>投资遏制与恢复能力。不要依赖单一的防火墙或 VPN。相反，应采用深度防御：对网络进行分段，限制凭据范围，测试备份，并开展应急响应演练。如果可能，练习从冷启动状态下拉起恢复你的系统。</p>
<p>密切关注前沿模型和开源权重模型的发展动态。模型越先进，留给你打补丁和完成部署的时间就越少。</p>
<p>哪怕你不认为这里描述的威胁是真实的，你也正在迎来一个千载难逢的机会来改善你的项目和社区的安全性。请务必抓住它。</p>
<p>注：本节写于原文发布数天后。</p>
<p>我收到了好几个人的询问，希望我就如何加固其自建（self-hosted）基础设施提供建议。我认为这种想法虽然出发点是好的，但归根结底是误入歧途。如果邮局网站瘫痪导致你收不到包裹，或者 Firefox 或 Chrome 出现了零日漏洞，那么拥有自己的 Immich 实例并没有任何帮助。我们生活在一个社会中，网络安全上的“粗犷个人主义”（rugged individualism）既不现实，也毫无成效。</p>
<p>此外，加固自建基础设施对那些没有运行自建基础设施的可怜大众毫无帮助。我想你或许可以设想这样一个世界：存在“软件合作社”，同一栋公寓楼里的人们共享由楼里两三名从事科技工作的人维护的基础设施，但这并非我们今天所生活的世界，而且在接下来的 12 个月里也不可能成为现实。</p>
<p>话虽如此，我认为一个不错的起点是参考谷歌的“双重规则”（Rule of 2，即在“不可信输入、内存不安全语言、无沙箱环境”这三项中最多同时满足两项），并在你自己的所有基础设施上推行“单重规则”（Rule of 1）。例如，你可以通过一个代理中间件（broker）代理所有网络访问，该中间件：</p>
<p>说实话，单凭个人力量其实做不了太多事情。我建议阅读《骗局的未来》（The Future Of The Con），使用跨平台密码管理器，定期更新软件，并祈祷一切安好。</p>
<p>我们生活在一个充满变数的时代。我们不能像鸵鸟一样把头埋在沙子里。趁现在还有时间，我们应该立即采取行动。</p>
<p>感谢 Manish Goregaokar 以及其他几位对本文提供反馈的人。感谢所有为了让 Glasswing 和 Daybreak 成为现实而孜孜不倦工作的人。至于 DeAlignAI、Z.ai 以及所有其他参与这场逐底竞争的人，去你们的吧。</p>
<p>取决于你问谁，Z.ai 和 OpenAI 在具体数字上存在分歧。↩</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-20 03:27 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://jyn.dev/a-year-to-fix-security/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::