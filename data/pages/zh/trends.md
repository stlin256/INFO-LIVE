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
<div id="story-blog-p5-compute-shaders-43a70cae51ba4e1a" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="4902" data-content-paragraphs="36" data-published-at="2026-09-27T00:28:51.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-27 08:28</span>
</div>

### [在 p5.js 中教授 GPU 编程：现已支持计算着色器](https://www.davepagurek.com/blog/p5-compute-shaders/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Teaching GPU programming in p5.js: now with compute shaders</div>

<div class="article-body" data-article-body="true"><p>计算机图形学教育目前正处于一个微妙的境地。计算机的图形能力得到了极大拓展。在当下，甚至很难只去谈论“图形”能力：你的图形处理器（GPU）已不再仅仅是将三角形绘制到屏幕上，它更是一个通用的并行计算平台。这为拓展可能性带来了极好的前景！然而，有如此之多的潜在知识需要学习，大家又该如何入门呢？</p>
<p>通常，要进行任何 GPU 编程都需要大量的背景知识，这使得它的入门门槛高得出了名。在 Vulkan 中从零渲染一个三角形需要成千上万行代码。这是目前讲授计算机图形学的教授们正在努力应对的问题。目前逐渐成型的应对策略是起初不教授所有内容，而是提供一个在内部工作的模板，将那些最初与学习无关的细节隐藏起来。随着学生学得越来越多，脚手架可以逐步拆除，他们也能逐渐意识到那些最初被隐藏的部分。但最重要的是，这些隐藏的细节对于立刻取得初步进展来说并非必需。这种技术被称为“脚手架教学法”（scaffolded learning）。</p>
<p>目前，每个人都在各自摸索该采用怎样的脚手架。通常，脚手架会抽象掉许多底层图形 API，但保留了大部分“经典”着色器管线：学生仍然需要学习数据如何流经顶点着色器和片元着色器，数据如何从 CPU 传递到 GPU，以及如何用一门新语言编写着色器代码。虽然与完全从零开始相比这已经得到了简化，但要一头扎进去依然有很大的信息量。</p>
<p>我参与了 p5.js 的开发。除了作为艺术家的创作工具之外，它还经常被用作计算机科学的教学工具，便于直观地将逻辑可视化。这主要是在其 2D 模式下完成的，因此入门级 3D 和 GPU 教学往往更倾向于使用类似 three.js 的工具。在过去的几年里，我一直在尝试填补 p5 中的 GPU 空白。</p>
<p>在今年早些时候发布了 p5.js 的实验性 WebGPU 构建版本、进行了一些性能优化并修复了大量 bug 之后，我终于能够开始实现计算着色器了。最后这块拼图让 p5 距离我心目中理想的 GPU 学习系统目标又近了一大步。那么，让我们来聊聊它究竟是什么样子的吧！</p>
<p>我们的着色器系统 p5.strands 新确立的目标是提供一套脚手架，使得只要你以前制作过 p5.js 作品（sketch），并且熟悉例如 p5 官网上的“p5.js 入门”系列教程，你就应该能够轻松迈出 GPU 编程的第一步。无论处于哪个技能水平，你都应该始终能够高效地产出并创作有趣的作品，并且你学到的每个递增知识点都能帮助你在原有能力的基础上获得一项特定的新能力。虽然抽象可以简化问题，但绝不应产生误导；你不需要为了以后从 p5 跃升到更偏向工程的系统而不得不改掉任何不良习惯。话虽如此，p5 不应仅仅是一个学习工具：这些抽象应该足够便捷和直观，无论技术水平如何你都会乐意使用它们，直到你的项目规模和范围扩大，转变为一个更大的工程项目。</p>
<p>对于我们认为你开始使用 p5.strands 时需要了解和不需要了解的内容，我们的界定相当明确：</p>
<p>该 API 经过了精心更新，因此你只需掌握这些基础即可开始。一开始你根本不需要了解着色器管线、uniform 变量、varying 变量或任何类似的概念。你最终仍然会学到这些！但它们不会像通常情况下那样成为前期必修项；在真正需要它们之前，它们都不会来干扰你。</p>
<p>在使用过 filter(BLUR) 等现有 p5 滤镜后，创建你自己的滤镜并不是一个巨大的跨越。它涉及创建一个函数、使用数组以及操作对象的属性和方法。最主要需要学习的是特殊的 filterColor 对象，你可以用它来 .set() 颜色。这里有一个能把画布变红的滤镜！虽然目前还没什么特别的，但你可以看到颜色取值范围是从 0 到 1。</p>
<p>filterColor 还有一个 texCoord 属性，指示你当前位于画布纹理的哪个坐标处。很方便的是，它在两个轴上的取值范围也都是 0 到 1，因此你可以轻松地将其可视化为颜色。生成的渐变效果生动展示了该函数是如何以不同的输入在每个像素上运行的。</p>
<p>你可以通过将这些坐标传递给 noise() 来探索生成式纹理。当然，如果你想了解底层的运行机制，也可以自己编写噪声函数。但这是 p5 其余部分中大家已经熟知且高效实用的结构。</p>
<p>你甚至可以像往常一样使用 millis() 等 p5.js 时间函数来创建动画。对于已经了解着色器的人来说：在底层，这涉及一些 uniform 变量，但学习者目前还不需要意识到这一点。他们可以转而专注于编写片元着色器时最大的概念跃迁——即你的同一段代码需要在每个像素上运行这一事实。在学习者感到得心应手之前，这种与 p5 通常绘图方式相反的思维转换可以作为主要聚焦点，并且限制出奇地少。</p>
<p>引入 uniform 变量的一个自然契机是当你想要引用滑块的值时。通过 uniformFloat，我们可以传入一个滑块值，然后用它来调整前面的动画：</p>
<p>下一步可以展示如何将着色器应用于对象，而不仅仅是应用在整个画布的像素上。如果你在正确的代码块中操作，每个顶点（这个术语在 beginShape/endShape 绘图中大家已经很熟悉了）也都可以被着色器修改。在 p5.strands 中，实现这一点的方法是 worldInputs 代码块，你可以在其中修改世界空间中的顶点位置。这可以用来移动对象：</p>
<p>当然，在 p5 中完成上述操作本来就不需要着色器。但随后它能让你做一些额外的事情。例如，你可以对每个顶点应用不同的偏移量。你可以使用 for 循环和 beginShape/endShape 来做到这一点，但这样操作非常繁琐，而且需要你突然自己去创建所有顶点。在这里，我只需沿用之前的着色器，但在数学计算中使用顶点位置：</p>
<p>当你引入绘制多实例对象的功能时，在着色器中更新位置就变得格外有用了。</p>
<p>如果你已经像我上面那样使用函数绘制对象，你就可以使用 buildGeometry 将其制作成可复用的模型。然后，你可以用 model(geometry, count) 来绘制它，并传入你想要绘制的该模型实例数量。接着，你可以根据正在绘制的迭代次数（可通过 instanceID() 访问），在着色器中对它们进行不同的定位。</p>
<p>利用这个你已经能做很多事情了！如果你需要让物体沿着既定路径运动，这种方法运行得非常顺畅，而且在出现卡顿之前，你能绘制的副本数量远远超过使用 for 循环所能达到的极限。这里有一个例子：绘制大量位置略微不同、颜色稍有差异的线条，以产生光色散效果。</p>
<p>但并不是所有的运动都可以通过 noise()、sin() 或其他预定函数来驱动。如果我有一堆特定的位置，想要把点放置在那里怎么办？或者如果每个粒子都需要独立运动呢？例如，可以参考《代码本性》（Nature of Code）中关于自主智能体（autonomous agents）的章节，里面有很多非常酷的技术！</p>
<p>WebGPU 开始带我们走向这一步。从这里开始的示例都将要求你使用支持 WebGPU 的浏览器，目前 Windows 和 Mac 平台上的最新版 Chrome 和 Firefox 应该都已支持。</p>
<p>我们可以使用 createStorage 创建存储缓冲区（storage buffers），然后你可以在着色器中通过 uniformStorage 读取它们。这里有一个简单的版本，我们在其中硬编码了几个物体的空间位置。请注意，我们现在需要 await createCanvas(w, h, WEBGPU)！</p>
<p>好吧，三个硬编码的球体位置并没有那么令人兴奋。下面展示的是使用我从 SVG 中提取的更复杂位置数据时的效果：</p>
<p>当你把数据放入存储缓冲区后，下一个顺理成章的步骤就是探讨如何更新这些数据以让粒子运动起来。这也是你实现《代码本性》中所描述智能体的方式。交互是通过每一帧如何增量更新状态来描述的，而不是拥有一个在给定时间下计算确切位置的数学公式。</p>
<p>通常这会用 for 循环来完成，但有了 WebGPU，你现在可以通过 buildComputeShader 使用计算着色器（compute shader）来完成。计算着色器类似于 for 循环，但它们不是依次执行一次又一次的迭代，而是一次性并行运行所有迭代，这需要特殊的硬件——也就是你的 GPU——来实现。</p>
<p>作为对比，这里有一段没有使用计算着色器、而是用普通 for 循环让一堆球在画布边缘反弹的代码。随后，我们将展示这在计算着色器中是什么样子。</p>
<p>现在来看看计算着色器版本。我们不再仅仅使用数组，而是使用存储缓冲区。更新函数现在只执行循环中的一次迭代，使用 index.x 来跟踪当前的迭代索引。所有粒子的绘制也是通过着色器和 instanceID() 一次性完成的。你通过调用 compute() 并传入你的着色器来执行更新。</p>
<p>计算着色器之所以变得有趣，是因为粗略来说，你可以在通常运行普通 for 循环单次迭代的时间内，同时对数千个对象运行循环。这意味着你可以执行那些原本需要极高算法复杂度才能快速运行的操作。你想让所有球彼此相互碰撞反弹吗？在常规 JavaScript 中，双重嵌套 for 循环的方式可能会变得很慢。但在 WebGPU 计算着色器中完全没有问题。为了好玩，我还给它们赋予了不同的半径。</p>
<p>回到《代码本性》，这里是 Boids 鸟群算法的一个实现。这只是一个包含 100 个智能体的小窗口，但我有一个全屏草图版本，在我的 M1 MacBook Pro 上可以流畅运行一万个智能体。而且完全不需要考虑空间划分算法！</p>
<p>再举一个例子，本页面的页眉是使用基于从文本中采样的点进行的 N 体引力模拟制作的，你可以在 OpenProcessing 上亲自运行并查看它。</p>
<p>我们构建了一个系统，随着这些概念对你变得有用，逐步向你介绍顶点着色器、片元着色器、计算着色器、uniform 变量、varying 变量和纹理。</p>
<p>你还可以逐步扩展到平台原生着色器语言——p5.strands 中的每个代码块也可以通过 GLSL 或 WGSL 函数来填充。前面提到的那个动态渐变在 GLSL 中看起来是这样的：</p>
<p>如果你想看看 JavaScript 着色器在原生着色器中是什么样子，可以对其调用 .inspectHooks()，它就会打印出你的 JavaScript 代码对应的原生实现。</p>
<p>因此，即使你的能力超出了 JS 着色器系统的范畴，你仍然可以使用原生着色器代码接入 p5 的默认着色器，而不必重写 p5 的整套定位和材质系统。当然，如果你确实需要从零开始构建，或者想要学习如何完全自己制作，你也可以调用 loadShader 和 createShader 函数。</p>
<p>我希望到那时，你将具备所需的一切理解，从而能够无所畏惧地投身于你所需的任何其他 GPU 库或硬件平台中。你仍然需要进行一些学习，但到那时，你面对的将不再是堆积如山的新概念；相反，这只是一个了解新系统如何处理你早已掌握的概念的过程。</p>
<p>WebGL 中的 p5.strands 现已上线，而计算着色器将在 p5.js 的下一个版本（2.3 版）中正式推出（但你现在就可以通过计算着色器分支的构建版本进行测试体验）。如果你开始使用这些工具探索 GPU 编程，欢迎加入 p5.js Discord 服务器并告诉我们你的使用体验！我们希望不断完善和改进这一体验，倾听你的反馈有助于指导未来的开发。同样，如果你希望尝试将其用于教学，我们也十分乐意听取你的建议，了解我们如何为你和你的学生改进工具。</p>
<p>我叫 Dave，是一名程序员兼艺术家。所有内容均为手工创作。想要联系我吗？可以在以下平台找到或联系我：<br />dave@davepagurek.com GitHub RSS Mastodon Instagram YouTube Soundcloud Sarcastic Soundcloud Newgrounds CodePen</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>在 Vulkan 中从零渲染一个三角形需要数千行代码。</li>
    <li>作者参与 p5.js 的开发，过去几年一直在填补 p5.js 中的 GPU 能力空白。</li>
    <li>来源叙事重点：探讨计算机图形学教育门槛过高的现状，阐述通过脚手架式学习（scaffolded learning）理念设计 p5.strands 着色器系统，展示如何借助 WebGPU 计算着色器（compute shaders）让初学者在无需掌握底层复杂概念的前提下实现高性能并行计算与图形仿真。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://www.davepagurek.com/blog/p5-compute-shaders/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-blog-2026-09-pun-html-faec2247cd7c39ef" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1374" data-content-paragraphs="23" data-published-at="2026-09-26T15:37:12.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 23:37</span>
</div>

### [JavaScript双关语：带标签的模板字面量](https://shukla.io/blog/2026-09/pun.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> The JavaScript Pun: tagged template literal</div>

<div class="article-body" data-article-body="true"><p>毫无疑问，莎士比亚的作品充满了双关语，这或许正是他精通文字、热爱文字的表现。</p>
<p>很少有人能通过调换两个词，就组成一个语法正确的句子；但他却像魔术师一样玩弄文字。</p>
<p>机智的傻瓜胜过愚蠢的智者。</p>
<p>在上面的例子中，名词“fool”（傻瓜）变成了形容词“foolish”（愚蠢的），而形容词“witty”（机智的）变成了名词“wit”（智慧）。最简单的双关语利用语法规则改变词语的含义。</p>
<p>还有一些双关语通过玩弄短语，利用语法之外的语境来改变含义。下面是我最喜欢的例子之一：</p>
<p>熄灭这盏灯，然后熄灭这盏灯。</p>
<p>第一个短语的字面意思是熄灭一支蜡烛，但第二个短语则是杀人的隐喻（这里指的是苔丝狄蒙娜）。</p>
<p>正式的词典定义通常会谈到双关语所产生的“幽默”效果。</p>
<p>《牛津英语词典》</p>
<p>现在，我非常相信，幽默取决于人的感受。对我来说好笑的东西，不一定对你来说也好笑。但我想向你介绍我迄今发现的最棒的双关语。它不是英语双关语。自然语言和编程语言有一个共同属性：语法。你已经见识过双关语能利用语法做些什么。</p>
<p>首先，快速了解一下相关语法。在 JavaScript 中，有一种叫作“带标签的模板字面量”的东西，可以让你进行如下强大的字符串操作：</p>
<p>在这段代码中，dedent 是标签函数，它处理模板字面量，以移除多余的缩进。标签函数会将字面量的文本片段，以及经过求值的 ${...} 值作为分开的参数接收，因此它可以随意处理其中的每一部分。</p>
<p>大多数模板语言都允许你在与最终产物相同的媒介中编写模板：带有变量插入位置的文本。每当控制机制和它所控制的系统处于同一个系统中时，事情就会变得有趣起来。这里值得展开一个关于哥德尔不完备性的支线话题。不过我扯远了。下面快速看一个模板示例：</p>
<p>{{ }} 这种语法非常常见。事实上，以下模板语言都使用它：</p>
<p>请看，我们可以定义一个名为 prompt 的标签函数，让它看起来像是在接收 {{ }} 模板。</p>
<p>它看起来很熟悉，也很赏心悦目，对吧？在幕后，它会生成一个字符串，再由可观测性工具 Helicone 处理，以帮助分析这些提示词。</p>
<p>在我看来，酷的地方在于，表面上的 {{ }} 模板语法，竟然是巧合地从我们的 JavaScript 代码中显现出来的：${...} 会对其中的内容求值，而 JavaScript 的 { name } 对象简写形式等价于 { name: name }。现在，标签函数 prompt 已经拥有了正确标注这个字符串所需的一切。</p>
<p>JavaScript 看到的是一回事，而你看到的是另一回事。{{ url }} 这种语法存在于你的脑海中。</p>
<p>好吧，也许我把这个双关语发挥得有点过头了，但我确实为它感到非常自豪。2024 年，我曾与 Helicone 的 Justin 一起做这件事。这是一个我一直在内部使用的想法，后来 Justin 将它正式加入了 SDK（Justin 的 PR，我的 PR）。我觉得这个双关语很有趣。Justin 也很乐意把它收录进去。</p>
<p>双关语是一条字符串的两种解析。</p>
<p>在语法领域，模型回来了，伙计们！我对此是认真的，并会返回关于这些解析方式的概率分布。</p>
<p>在空间语言领域，我会让事情变得更复杂，并给解析器提供第二个维度。</p>
<p>Nishant Shukla 2026-09-26</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-26 23:37 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://shukla.io/blog/2026-09/pun.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-he-steam-link-with-nixos-b4d639ab5f8c106a" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2553" data-content-paragraphs="22" data-published-at="2026-09-26T13:45:59.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-26 21:45</span>
</div>

### [要闻：前几天我翻箱倒柜时，发现自己早在 2018 年一次闪购活动中买下的 Steam Link，这么多年过去了竟然还在](https://feyor.sh/blog/infecting-the-steam-link-with-nixos/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Infecting the Steam Link with NixOS</div>

<div class="article-body" data-article-body="true"><p>前几天我翻箱倒柜时，发现自己早在 2018 年一次闪购活动中买下的 Steam Link，这么多年过去了竟然还在尽职尽责地运行着。我突然想到，一台始终开机、功耗低，并配有以太网、Wi‑Fi、蓝牙和多个 USB 接口的 Arm 设备应该会很方便，于是便开始了让 Steam Link 运行 NixOS 的旅程。</p>
<p>事实证明，一位名叫 fijam 的人已经解决了在 Steam Link 上运行自定义 Linux 发行版所涉及的难题。最值得注意的障碍是，引导加载程序只会启动经过 Valve 签名的内核；为绕过这一点，我们可以先启动 Valve 认可的内核，然后再通过 kexec 启动我们的新内核。然而，Steam Link 随附的内核并未启用 CONFIG_KEXEC。这正是整个过程变得非常巧妙的地方：我们可以把相关的 kexec 源文件拼装成一个最小化的内核模块，为正在运行的系统添加 kexec 系统调用！</p>
<p>已经有几个人成功使用这一技术让其他发行版¹启动，但他们似乎都只是从 fijam 的网站复制了 kexec 二进制文件和内核模块。fijam 看起来是个很好的人，不过我对从互联网下载内核模块心存戒备，所以决定自己编译。</p>
<p>编译 NixOS 用户空间以及内核/initrd 相当简单；只需将正确的 system（由于我使用了 __splicedPackages/crossSystem，因此还包括 pkgs）传递给 lib.nixosSystem，然后添加模块即可。选择目标架构则没有那么直接：Valve 的 steamlink 工具链使用 armv7a，但以 crossSystem.config = “armv7a-unknown-linux-gnueabihf” 导入 nixpkgs 会与 Go 的构建流程产生糟糕的交互，因此我改用了看起来等价的 armv7l。</p>
<p>真正的挑战在于：要为一个厂商定制的、已有 13 年历史的内核分支编译内核模块；NixOS wiki 在这里确实很有帮助，它指出了与 stdenv 默认加固标志有关的一些容易踩坑之处。</p>
<p>（kexec_mod 源代码见 Files。）</p>
<p>要让它成功构建，我们需要将 Kbuild 指向一个已经执行过 make modules2 的 Linux 内核代码库。（请注意，我使用的是 NixOS 配置中那个相对较新的内核所提供的 moduleBuildDependencies 属性。）</p>
<p>为了让代码能够在现代版本的 GCC 上构建，我进行了多次修改，但最终还是成功让 3.8.13-mrvl 内核和 kexec_mod 内核模块完成构建。</p>
<p>现在我们已经有了 kexec_mod.ko，接下来还需要新的 initrd 和内核（两者都来自我们的 NixOS 配置）、Steam Link 的设备树二进制文件（它已经被上游 Linux 接纳，因此可以通过 hardware.deviceTree.package 获取）、一份 kexec 用户空间二进制文件（使用 pkgsStatic 编译，这样就能在非 NixOS 系统上运行），以及一个把所有这些东西串联起来的小脚本：</p>
<p>你当然可以手动整理这些文件，再自行把它们上传到 USB 驱动器；但使用 sd-image NixOS 模块创建磁盘映像要容易得多：</p>
<p>测试 kexec 交接是否正常工作非常棘手，因为我所使用的内核无法输出 HDMI 信号；而且由于我决定不拆开设备去接触 UART，我完全是在盲测。我决定使用一个基于 Busybox 的最小化（slop）initramfs 进行测试，让它在经过一段可变的时间后重启，以此表示测试成功。</p>
<p>确认这一方法奏效后，我换用了启用 boot.initrd.network.enable = true 的 NixOS initrd，并通过基于 Netcat 的反向 shell 连接到笔记本电脑的 IP 地址，以便进一步调试。</p>
<p>在这个阶段，我需要解决的主要问题是：将 reset_berlin 添加到 boot.initrd.availableKernelModules 中，以便能够读取 USB 驱动器；以及使用旧版 NixOS initrd 系统，而不是新的基于 systemd 的版本（boot.initrd.systemd.enable = lib.mkForce false）。</p>
<p>最后，我终于成功启动到用户空间，并通过 SSH 连接上去了！🥳</p>
<p>话虽如此，我用来启动的 USB 映像大小高达 2.3GB……我们肯定还能做得更好。</p>
<p>让我感到意外的是，竟然没有一份权威的 NixOS 闭包大小缩减指南；我找到了一些 NixOS Discourse 上的问题和几篇博客文章，但最有用的文章是《NixOS is a good server OS, except when it isn’t》和《I can haz smoller NixOS ISOs?》。这些都是很好的参考资料，不过由于我们的目标是真实硬件而不是虚拟机，因此在删减内容时必然需要更加保守。</p>
<p>在精简过程中，主要遇到了以下事项：</p>
<p>在收益递减、而且大多数新改动都会破坏系统之后，我认定手头这个 1.2GB 的磁盘映像已经“够好了”。</p>
<p>我使用的 Nix flake 以及 kexec_mod 内核模块的源代码可以在这里下载。为方便起见，下面也列出了相同的 flake.nix。</p>
<p>就在发布本文之前，我发现另一个人也凭感觉摸索出了一套可启动的 NixOS 安装方案，不过他们的配置更加 _slop_py，不能正确处理重启，而且使用了许多没必要的二进制 blob，而不是从源代码构建。¹</p>
<p>尽管使用 make modules_prepare 可以成功完成构建，但生成的内核模块不会拥有正确的 vermagic 和符号地址，因此不会被 insmod 接受：</p>
<p>注意：“modules_prepare” 即使在设置了 CONFIG_MODVERSIONS 的情况下，也不会构建 Module.symvers；因此，必须执行完整的内核构建，才能使模块版本控制正常工作。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-09-26 21:45 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://feyor.sh/blog/infecting-the-steam-link-with-nixos/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::