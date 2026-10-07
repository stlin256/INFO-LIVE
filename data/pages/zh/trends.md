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
<div id="story-7-c-for-rust-programmers-53e46f9938d2b269" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3097" data-content-paragraphs="41" data-published-at="2026-10-07T14:30:05.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 22:30</span>
</div>

### [面向 Rust 程序员的 C 语言](https://bd103.dev/blog/2026-10-07-c-for-rust-programmers/)
<div class="original-title-sub"><span class="orig-tag">原文</span> C for Rust Programmers</div>

<div class="article-body" data-article-body="true"><p>我最早学会的系统编程语言是 Rust。与许多其他程序员相比，这种情况并不常见；更有可能的是，一个人先学习 C 或 C++，之后才接触 Rust。因此，互联网上有大量“面向 C 程序员的 Rust”文章，但几乎没有“面向 Rust 程序员的 C”文章。</p>
<p>好吧，我正准备改变这一点！我最近一直在学习 C 和 C++，天哪，这些语言真是古怪。这篇博客文章汇集了我自学 C 时了解到的一些令人咋舌的细节。（今天不谈 C++，我还没准备好钻进那个麻烦的坑里。）这不是一篇正规的 C 教程，你需要自行搜索教程。相反，这是一份使用这门语言时需要牢记的事项清单。</p>
<p>既然前提已经交代完毕，就让我们拉开帷幕，看看 C 语言究竟有什么可提供的吧！</p>
<p>最初版本的 C 没有用于表示布尔值的原始类型，程序使用整数 0 和 1 代替。C99 对此进行了改变，在可选的头文件[1]中加入了布尔值：</p>
<p>即便如此，true 和 false 也不像其他语言那样是字面量或关键字。相反，它们是分别展开为 1 和 0 的定义：</p>
<p>C23[2] 再次对此进行了修改，因此如今布尔值已经是真正的语言原始类型；但如果你要针对更早版本进行编译，就需要包含 。</p>
<p>Rust 的 &amp;str 占用 16 字节：其中 8 字节用于存储内存地址，另外 8 字节用于存储字符串长度。这是因为 str 是一种动态大小类型，使用指针元数据来跟踪字符串长度。</p>
<p>这种方式使获取字符串长度极其高效，但每个 &amp;str 引用需要占用更多内存。C 采用了不同的方法：它不会单独存储字符串的大小，而是用一个空字节（\0）作为每个字符串的结束标记。这是一种有意的权衡，并由此带来了一些结果：</p>
<p>在实际操作中，这要求你记得为字符串结束符分配额外空间，并在字符串末尾插入它。例如，下面是一个用 C 反转字符串的程序：</p>
<p>注意第 5 行和第 12 行，它们采取了特别措施来处理字符串结束符。作为参考，对应的 Rust 函数[4]不需要这样做：</p>
<p>C 的整数类型并不保证使用确切数量的比特位，其宽度会因目标平台而异。</p>
<p>long 类型在 Unix 上是 64 位、在 Windows 上是 32 位，这一点尤其让我恼火。我建议遵循几年前一位朋友给我的建议：如果你在意跨平台兼容性，就只使用  所提供的固定宽度整数类型：</p>
<p>我非常喜欢 Rust 的错误处理。Result 会强制你处理错误，而求和类型（枚举）和 match 语句让这件事变得非常容易！</p>
<p>相比之下，C 的错误处理简直惨不忍睹。它似乎归结为：函数返回一个类似 -1 的“魔法整数”，或返回空指针，以表示发生了错误。通过读取 errno 可以获得更多一点信息；errno 是一个线程局部整数，可用于检查特定类型的错误。但如果要获取实际的错误消息和堆栈跟踪，就困难得多了。</p>
<p>编写 C 时，你会注意到的一件大事是：这门语言从不会强迫你处理错误。记住函数可能失败，是你自己的责任。例如，下面是来自《空终止字符串》一节的一段代码：</p>
<p>对于新手程序员来说，malloc() 可能失败并返回空指针，并不是一件显而易见的事。如果机器内存耗尽，访问 reversed[i] 时就会导致段错误。为了避免这种没有帮助的段错误，程序应该检查空指针，并在发现空指针时优雅地退出：</p>
<p>这样做会比出现段错误，或更糟糕的其他非预期行为，带来好得多的体验：</p>
<p>当然，记住检查每一个分配得到的指针，并不是很好的开发体验。我尝试过一种方法：使用带标签的联合体，在 C 中重新实现 Rust 的 Result：</p>
<p>不过，使用起来完全是一团糟，而且仍然没有任何东西能阻止你在处理错误之前直接访问 result.value.ptr。C 缺少 private 和 public 这类可用于阻止这种行为的可见性修饰符，这似乎是有意的设计决定。C 完全信任程序员会把事情做对™，却几乎没有提供用于契约或安全抽象的工具。</p>
<p>我个人并不赞同这种做法。我不是什么从不犯错的编程天才。我更愿意把程序要求编码进类型系统，让编译器替我检查它们！[6] 这样一来，我就能相当有把握地认为，只要代码能够编译，它就是正确编写的。不过，扯远了。</p>
<p>C 有两种不同的字段访问运算符：值使用 .，指针使用 -&gt;。</p>
<p>这一点起初让我措手不及，因为 Rust 对所有情况都使用 。</p>
<p>如果你好奇，Stack Overflow 上的这篇文章介绍了一些 -&gt; 运算符为何存在的有趣历史。[7]</p>
<p>数组有一些奇怪的细节。有时它们是普通值，可以使用 sizeof() 获取其长度；另一些时候，它们又是大小未知的指针。一般来说，这取决于你是在数组定义所在的函数内部处理它，还是在函数外部处理它。</p>
<p>为了展示我的意思，下面是一个非常简单的 C 程序，它会打印两个数组的大小：</p>
<p>运行后，这个程序会告诉你两个数组都占用 3 字节内存。很好！</p>
<p>现在，让我们稍微修改一下。在打印大小之前，先将 declared_size 和 inferred_size 传入一个函数：</p>
<p>逻辑没有任何变化，数组也与上一个示例完全相同；然而现在程序报告说每个数组占用 8 字节内存：</p>
<p>为什么？因为任何通过函数传递的数组都会被隐式转换为指向第一个元素的指针。从 C 编译器的角度来看，上面的函数实际上具有如下类型签名：</p>
<p>这就是为什么它看起来令人困惑，仿佛每个数组长度都是 8 字节。数组本身是 3 字节，但指针占用 8 字节内存！值得庆幸的是，当你对数组转换得到的指针形式使用 sizeof() 时，Clang 会发出警告，从而更容易发现这个错误：</p>
<p>如果不提这一点，我就太失职了。C 没有借用检查，也没有引用的概念。它只有原始指针。这意味着你可以进行如下有趣的指针运算：</p>
<p>不过，我不确定这样做是否是个好主意。😅</p>
<p>无论如何，摆弄指针时务必小心。内存操作中的错误会导致缓冲区溢出和越界写入，对代码安全构成重大威胁。</p>
<p>希望你喜欢这篇文章！说实话，学习 C 的过程非常有趣。虽然我怀疑自己会在个人项目中选择它，但对于系统程序员来说，它绝对是一门必须了解的关键语言。如果你想亲自摆弄这些示例，博客中的所有示例都可以在 GitHub 上找到！</p>
<p>严格来说，你可以在不引入头文件的情况下使用 _Bool，但你仍然需要头文件来获取 true 和 false 的定义。↩</p>
<p>看起来 Clang 对 C23 依然只有部分支持，因此在彻底扔掉 #include 语句之前，你可能还需要再等上一段时间。↩</p>
<p>正如前文所述，这基本上就是 Rust 所做的事情。在 C 语言中，这在易用性（ergonomics）上会是一种折磨，但 Rust 的语言特性让程序员永远无需将指针和字符串长度当作两个独立的变量来看待。↩</p>
<p>对应的 Rust 函数并不地道，而且只能正确处理 ASCII 文本。如果我要写一个该函数的生产级别版本，只需一行代码：forward.chars().rev().collect:: ()。↩</p>
<p>usize 和 isize 在语义上并没有与 size_t 和 ptrdiff_t 完美映射。不过，我并不完全理解它们之间的区别，因此建议在使用这些类型之前自行深入调研。↩ ↩2</p>
<p>这篇关于“无畏 SIMD（Fearless SIMD）”的博文提供了一个绝佳范例，展示了如何利用 Rust 的类型系统来确保代码的正确性。强烈建议一读！↩</p>
<p>那篇文章里我最喜欢的一行代码是 100-&gt;a = 0;，简直太诡异（cursed）了！↩</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>C语言最初版本没有布尔原生类型，程序使用整数0和1替代；C99通过可选头文件添加了布尔支持，C23将其转变为真正的语言原生类型。</li>
    <li>在Rust中，&amp;str占用16字节，其中8字节存储内存地址，8字节存储字符串长度。</li>
    <li>来源叙事重点：通过将C语言的特性与Rust对比，梳理C语言中反直觉或容易出错的设计（如以空字符结尾的字符串、平台相关的整型大小、缺乏借用检查与强制错误处理、数组退化为指针等），探讨其编程体验与安全挑战。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://bd103.dev/blog/2026-10-07-c-for-rust-programmers/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-tterns-software-blogging-4947297bbfe7b42d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3956" data-content-paragraphs="20" data-published-at="2026-10-07T13:09:33.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 21:09</span>
</div>

### [软件写作中的反模式](https://refactoringenglish.com/blog/anti-patterns-software-blogging/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Anti-Patterns in Software Blogging</div>

<div class="article-body" data-article-body="true"><p>作者：Michael Lynch，发布于 2026 年 10 月 7 日<br />在软件开发中，我们收集反模式来识别那些导致软件产出不良的常见特征。我认为将同样的方法应用于软件技术博客写作也会大有裨益，因此我整理了初学者博主中最常犯的错误。<br />到目前为止，软件博客中最普遍的错误就是行文漫无边际、偏离主题。我经常发现自己读了一篇文章好几段，却依然完全不知道作者到底想表达什么。<br />开发者热衷于细节和具体背景，因此他们在写博客时往往以幕后故事、历史背景以及脑海中恰好闪现的其他任何内容开头。写起来或许很痛快，但读起来往往索然无味。<br />从读者的角度来看，还有成千上万篇其他文章可以读。他们为什么要读你的文章？除非他们预期能有所收获，否则他们不会投入 20 分钟通读全文。给读者一个继续读下去的理由。<br />当一名开发者开始阅读一篇博客时，他们试图尽快得到两个问题的答案：<br />请给自己标题和前三句话的时间来同时回答这两个问题。<br />你能提供的益处可以是向读者传授一项新技能、解释一个概念、阐明一种新视角，或者提供一段有趣的犀利吐槽。你只需要给读者提供一些实在的内容。他们不会仅仅因为文章摆在那里就去阅读你的博客。<br />以下是我最近写的一篇直奔主题的文章：<br />✓ 优秀做法：以展示文章能给读者带来什么收益作为开头<br />if got, want：编写更佳 Go 测试的简单方法<br />有一种极好的 Go 测试模式，知晓它的人却寥寥无几。我可以在 30 秒内把它教会你。<br />该引言简明扼要地传达出：本文与使用 Go 编程语言的程序员密切相关，其价值在于教会他们一项可以迅速掌握的新技巧。<br />有些博主写出了引人入胜的引言，却用副标题、个人简介、图片或名言等额外元素塞满了读者的视线。你当然可以包含这些内容，但要意识到它们都在消耗你“激励读者继续阅读”的精力预算。你在读者的阅读路径上设置的每一个障碍，都是在消耗他们有限的专注力。<br />✗ 糟糕做法：强迫读者穿过冗长的前言序语<br />高效的讲解者会将新概念与读者熟悉的事物进行类比。例如，如果你在解释 Jellyfin，你可以说：“Jellyfin 是一项类似 Netflix 的流媒体服务，不同之处在于它是开源且私密的，因此没人会监控你的观影习惯。”棘手之处在于弄清楚读者究竟对什么感到熟悉。<br />✗ 糟糕做法：假定读者通晓你所知道的一切<br />在本文中，我将为从未听过 Docker 的开发者介绍 Docker。<br />Docker 很简单。它不过是 Linux cgroups 的一个光鲜前端。哦，你知道 *BSD 中的 jails 吗？Docker 就是它的 Linux 版本。<br />很多开发者想使用 Docker，但他们并不认识 cgroups、jails 或 *BSD 等术语。他们甚至可能都不知道 Linux 是什么，特别是当他们主动搜索 Docker 入门介绍时。<br />与其假定读者拥有与你完全相同的知识体系，不如尽量减少对读者的预设假设：<br />✓ 优秀做法：尽量减少对读者背景知识的假设。<br />Docker 是一个用于打包应用程序的工具，以便其在任何运行环境中都具备一致且可复现的环境。Docker 允许你通过人类可读的文本文件定义应用程序的环境与依赖项。这些文件记录了应用程序的各种需求，因此即便在不同团队经过数年的微调修改后，你依然能清楚知道它是如何运行的。<br />写博客时，想想你的目标读者。他们知道些什么？想象一个你在现实生活中认识的朋友或队友。列出一份他们会认识的术语清单和一份他们不会认识的术语清单。然后，重读你的博客文章，每当遇到一个专业术语时，思考一下你设想的参考读者是否能够理解它。<br />“你描述的正是我心目中的受众，但我从未尝试列出那些受众到底知道些什么。将你的清单与我草稿中的假设进行对比，真是让我大开眼界。”<br />——Tyler Cipriani（在我为《Git 中大文件的未来就是 Git》进行编辑并对其目标读者的预设提出质疑时如此表示）<br />你上一次读到一本让你暂停阅读、去买另一本书完整读完、然后再回来继续读原书的书是什么时候？软件博主经常干这种事，尽管做得更为隐蔽。<br />博主们经常想提及一个读者可能不懂的术语，但他们自己又懒得解释。相反，他们直接在术语上随手挂一个超链接，并自以为“问题解决了！”<br />问题并没有解决，因为读者并不想打断他们的阅读心流，仅仅为了理解一个词就跳去阅读另一个完全不同的网站。<br />✗ 糟糕做法：依赖超链接向读者解释术语<br />分配防火墙规则，以防止外部流量访问您的数据库。<br />上面链接的 FreeBSD 手册是一份极好的参考资源，但关于防火墙的那一章大约有 20,000 字。当你链接到如此冗长的页面时，你把极其庞大的阅读负担硬塞给了读者。<br />与其依赖链接替你代劳，不如为读者提供理解本文所需的最低限度解释。<br />✓ 优秀做法：总结链接背后的相关信息<br />防火墙是一种限制主机和网络如何与应用程序进行通信的系统。您可以通过配置防火墙规则，仅允许源自应用程序服务器的入站请求访问数据库服务器，从而提高 Web 应用程序的安全性。<br />当然可以链接到有用的资源，但应将其作为附加参考，而非阅读的前置条件。把读者留在当前页面上。你的目标读者应当能够从头到尾畅快理解你的文章，而无需点击任何链接。<br />如今，万物要么是续集，要么是重启版，博客文章也不例外。我看到许多博客文章都是这样开头的：<br />在第一部分中，我们了解了五重链表以及它们如何让你的每日代码行数产出提升 100 倍。在今天的文章中，我将向你展示 goto 语句如何让你实现 scrunkmax（这是我在第一部分发明的一个术语——还记得吗？）。<br />我很遗憾地告诉你，大多数读者并没有读过第一部分。如果你假定上一篇文章在读者脑海中记忆犹新，他们就会想：“噢，现在连刚开始阅读都得做额外的功课吗？”<br />引用你之前的文章完全没问题，但不要一开始就劈头盖脸地拿出来。当你确实链接到以往的文章时，请总结出相关内容，而不是强迫读者倒回去完整读一遍。<br />如果你正在写的是自己从零构建的业余操作系统，那么当然，你可能需要不止一篇博客，但绝大多数续集文章只需多花大概 3% 的努力，就能写成一篇完全独立的文章。<br />初学者软件博主普遍抱有一种集体幻想，认为必须写得生硬刻板、过度正式，别人才会严肃认真地对待你：</p>
<p>“在本项目存续期间，我本人及团队成员曾使用了多种静态分析工具。”</p>
<p>你又不是在1988年给IBM那些80岁的高管写报告。你身处的领域是软件开发，这是所有白领工作中架子最小、最不装腔作势的行业之一。读你文章的人很可能正穿着睡衣拖鞋，一边嚼着键盘旁的麦片一边阅读。他们既不期待、也不希望你说话像法律文件一样死板。</p>
<p>怎么说话，就怎么写。</p>
<p>✓ 正确示范：像日常说话一样写作<br />我们在这个项目里尝试了几个静态分析工具。</p>
<p>随着如此多的开发者将写作外包给人工智能，软件技术博客正变得平淡无奇、千篇一律。读者渴望看到有鲜明个性的文字。以下摘自史上最优秀的软件博主乔尔·斯波尔斯基（Joel Spolsky）的一句话：</p>
<p>“所有那些在高中时代用BASIC给Apple II写乒乓球游戏表现优异的孩子，到了大学，选修了计算机科学入门课（CompSci 101）和数据结构课，而当他们一接触到指针那一套时，脑子就彻底炸了；接下来的事情你懂的，他们转去主修政治学了，因为法学院听上去是个更好的出路。”<br />——乔尔·斯波尔斯基，《Java学校的危害》（The Perils of JavaSchools）</p>
<p>这算不上斯波尔斯基最精彩的金句，但它精准体现了他的风格：随性、亲切且毫不做作。听起来就像他在午餐时给朋友讲故事一样。你也可以在凯西·塞拉（Kathy Sierra）、特伦斯·伊登（Terence Eden）和雷蒙德·陈（Raymond Chen）的文字中看到同样的风格。他们从不试图让自己显得很聪明——他们只是在做真实的自己，而这正是读者所喜欢的。</p>
<p>软件技术写作中最难的部分在于写得引人入胜，因此看到那么多软件博主在最该轻松搞定的环节上搞砸，实在令人沮丧：那就是搭建一个基础的网页。</p>
<p>对移动端读者来说，你能犯的最严重的错误就是内容超出屏幕，导致读者不得不横向来回滑动才能读完你的文章。通常，这是因为你的某张图片或代码片段硬要保持桌面端尺寸，从而搞崩了页面其余部分的布局。</p>
<p>在移动设备上让文本超出屏幕，会带来极其糟糕的阅读体验。</p>
<p>桌面版火狐（Firefox）和谷歌浏览器（Chrome）都具备移动端预览模式。在发布之前，请使用移动预览检查你的文章，排查常见的渲染问题。</p>
<p>不要低估你的移动端读者。根据我的数据统计，你们当中有25%的人是在手机上阅读本页面的。在我的个人博客上，这个比例高达35%。</p>
<p>选择易于阅读的字体颜色和字体族。别再搞那种浅灰背景配深灰文字的把戏了。Firefox和Chrome都内置了能为你标出低对比度文本的工具。</p>
<p>Firefox的无障碍辅助工具正在识别低对比度文本</p>
<p>如果你不想花心思去到处寻找完美字体，盲文协会（Braille Institute）提供了一款名为Atkinson Hyperlegible的免费字体，其阅读舒适度极高，即便是视力不佳的读者读起来也很轻松。</p>
<p>《这不太像开发者的阅读方式》与《读者所知何物》插图作者：Piotr Letachowicz。</p>
<p>我正在撰写一本帮助开发者提升写作水平的书，名为《重构英语：面向软件开发者的实用写作技巧》（Refactoring English: Effective Writing for Software Developers）。</p>
<p>想要提高写作水平并促进职业发展，请关注本书。</p>
<p>首发周享7折优惠，截止至2026年10月11日。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>Michael Lynch 于 2026 年 10 月 7 日发表文章《Anti-Patterns in Software Blogging》，梳理软件博客写作中的常见错误及改进方法。</li>
    <li>作者认为软件博客中最常见的错误是偏离主题/废话过多（meandering），建议在标题和前三句话内说明文章的主旨和能为读者带来的收益。</li>
    <li>来源叙事重点：从读者体验和技术沟通效率出发，总结软件开发者在博客写作与网页呈现上的常见反模式（如废话连篇、高估读者背景、生硬正式文风、移动端适配不良等），倡导以读者收益为核心的口语化、独立且清晰的写作方法，并推广其新书。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://refactoringenglish.com/blog/anti-patterns-software-blogging/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-storytold-photocraft-ec4b5e65913390d0" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2508" data-content-paragraphs="28" data-published-at="2026-10-07T12:04:13.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 20:04</span>
</div>

### [用纯 Rust 净室重实现的开源 Adobe Photoshop](https://github.com/storytold/photocraft)
<div class="original-title-sub"><span class="orig-tag">原文</span> An open-source, clean-room reimplementation of Adobe Photoshop in pure Rust</div>

<div class="article-body" data-article-body="true"><p>一个用纯 Rust 进行净室（clean-room）重实现的开源 Adobe Photoshop</p>
<p>图像编辑；一款对 Adobe Photoshop 进行净室重实现的开源软件，完全用纯 Rust 重建。图层、蒙版、调整图层、图层样式、文字、矢量、画笔以及真实的 PSD 文件，全部集成在一款完全由 Rust 编写的原生应用中。开源、离线，完全属于你。</p>
<p>PhotoCraft 详见 getartcraft.com · ArtCraft · 所有 Crafting Apps</p>
<p>带有投影、动态文字、自然饱和度与曲线调整图层的说明卡片，且曲线编辑器处于打开状态。《神奈川冲浪里》，葛饰北斋，约 1831 年</p>
<p>ArtCraft 是一个汇聚各行各业艺术家的社区。数字艺术、生成艺术、音乐、游戏——只要你从事创作，你就是我们的一员。欢迎来 Discord 打个招呼。</p>
<p>特性 · 包含功能 · PSD · Agent 代理 · 底层架构 · 快速入门 · Crafting Apps · Discord</p>
<p>此处展示的每一张截图都是该应用在公有领域艺术品上实际运行的真实画面，通过其控制通道在离屏渲染完成。</p>
<p>PhotoCraft 对 PSD 的支持是一个独立的 crate，根据 Adobe 的公开规范编写，并在真实的现实文件语料库上进行了测试。</p>
<p>该桌面应用还提供了一个经过身份验证的、仅限环回的控制通道（photocraft --control），用于检查 UI 状态、通过指针事件驱动工具以及截取离屏截图。本 README 中的所有图片均以此方式渲染。详见 docs/control-protocol.md。</p>
<p>UI 和文字工具所使用的日文字体来自 craft-fonts，这是一个可选的构建输入项（桌面发布版本始终包含它）。如果没有它，PhotoCraft 将使用您系统的 CJK 字体：</p>
<p>新贡献者与 AI Agent：请先阅读 AGENTS.md，然后查看 docs/。</p>
<p>每个 GitHub 发布页面均附带适用于 macOS、Windows、Linux、FreeBSD 和 Web 平台的安装包。在 Linux 上，你可以选择 AppImage、.deb、.rpm、tar 包或 Flatpak 包。Flatpak 包需要来自 Flathub 的 freedesktop 运行时，flatpak 会提示一并安装：</p>
<p>在 macOS 上，命令行工具以 photocraft-cli- -macos-universal.zip 形式提供。该二进制文件使用与应用程序相同的 Developer ID 进行了签名，并获得了 Apple 的公证。由于纯二进制文件无法像 DMG 那样携带装订好的公证票据（stapled notarization ticket），因此首次运行时 macOS 会在线验证公证。你可以自行确认：</p>
<p>在 FreeBSD 14 (x86_64) 上，发布版本提供了类似 /usr/local 目录结构的 tar 包。安装运行时库，然后在此处解压即可：</p>
<p>维护者请注意：docs/releasing.md 说明了发布版本的构建、签名和发布方式。</p>
<p>开发者、架构、自动化、格式和安全文档均在 PhotoCraft 文档库中维护。</p>
<p>安全架构、威胁建模、解析器加固、模糊测试（fuzzing）和漏洞报告均涵盖在安全文档和代码仓库的安全策略中。</p>
<p>PhotoCraft 使用真实文件进行测试：我们在 photocraft-corpus 中自行用 Photoshop 制作的基准（oracle）PSD，加上 psd-tools、ag-psd 和 PngSuite 数据集，均已固定版本并通过 sha256 校验。使用 cargo xtask corpus --all 获取它们，并通过 cargo xtask test-corpus 运行测试（详见 docs/development.md）。</p>
<p>PhotoCraft 是 Crafting Apps 系列之一：由 ArtCraft 团队打造的免费开源创意工具，每款工具均用 Rust 从头编写，并可独立运行。</p>
<p>此外还有 ArtCraft 本身——我们为追求真正掌控力的艺术家打造的 AI 图像与视频工作室。</p>
<p>Crafting Apps 系列遵循相同的规范：净室设计且纯 Rust 实现、原生支持 macOS、Windows 和 Linux，可通过 WebAssembly 在浏览器中运行，且完全可由 AI Agent 驱动。</p>
<p>我们的 Discord 是各类艺术家的聚集地：绘画、摄影、绘图、剪辑影片、排版文字，以及仍在探索自己喜欢创作什么的人。分享你的作品、寻求帮助、反馈 Bug，或者告诉我们你希望这些工具实现哪些功能。无论你的媒介是什么，无论你从业多久，这里都欢迎你。</p>
<p>discord.gg/artcraft · getartcraft.com · The Crafting Apps · PhotoCraft</p>
<p>PhotoCraft 提供 MIT 或 Apache-2.0 双重许可，任你选择。版权所有 (c) 2026 ArtCraft 团队及 PhotoCraft 贡献者。所需声明请参见 NOTICE。</p>
<p>捆绑的字体、图标、图像及其他素材保留各自的开源许可证；每个素材的作者、来源和许可证均列在 ATTRIBUTION.md 中。</p>
<p>展示的每件艺术作品均属于公有领域（维基共享资源、NASA、美国国家档案馆）；来源列在 docs/images/SOURCES.md 中。</p>
<p>docs/brand/ 中的 ArtCraft 名称、文字商标和徽标是 ArtCraft 团队的商标，不在此许可证涵盖范围内。根据 docs/brand/LICENSE-brand.txt，它们只能在未修改的情况下使用，且只能作为本仓库和 PhotoCraft 的一部分使用。分支（fork）和修改版本必须将其移除。</p>
<p>由 ArtCraft 团队与社区共同打造。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-07 20:04 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://github.com/storytold/photocraft" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-h-culture-online-project-1db226ff32ad5a30" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="288" data-content-paragraphs="1" data-published-at="2026-10-07T12:01:10.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 20:01</span>
</div>

### [从随身听看撒切尔主义：斯图尔特·霍尔的英国文化研究成果已于线上归档](https://www.theguardian.com/society/2026/oct/07/stuart-hall-british-culture-online-project)
<div class="original-title-sub"><span class="orig-tag">原文</span> Thatcherism via the Walkman: Stuart Hall’s British cultural studies preserved online</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/b94f811c778df1d26facdd7ca23b8709eeb40e5c/614_678_2793_2234/master/2793.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=155bdd3555d8ea290108c9f5686aa141" alt="从随身听看撒切尔主义：斯图尔特·霍尔的英国文化研究成果已于线上归档" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>项目负责人表示，该项目旨在致敬这位牙买加裔社会学家为英国文化做出的“卓越贡献”。<br />无论谈及撒切尔主义、民粹主义，还是索尼随身听的发展史，斯图尔特·霍尔（Stuart Hall）都是一位以精准把脉时代脉搏而闻名的公共知识分子。如今，一个汇集了他此前从未公开过的论文手稿、笔记本、录音与视频的大型数字档案库已正式上线。<br />这位牙买加裔社会学家是战后英国黑人历史上的关键人物，于2014年逝世，享年82岁。他在《卫报》上的讣告中被评价为“最早洞察时代核心命题的人之一”。霍尔创造了“撒切尔主义”（Thatcherism）一词，并早在1985年就对“威权民粹主义”的潜在危险发出了预警。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-10-07 20:01 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/2026/oct/07/stuart-hall-british-culture-online-project" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ches-and-aggregates-html-47a700d964bdbb56" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3427" data-content-paragraphs="38" data-published-at="2026-10-07T09:26:25.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 17:26</span>
</div>

### [通过批处理与聚合加速流式HTML传输](https://andersmurphy.com/2026/09/29/faster-streaming-html-with-batches-and-aggregates.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Faster streaming HTML with batches and aggregates</div>

<div class="article-body" data-article-body="true"><p>在这篇文章中，我将深入探讨基于服务器的流式 HTML 的一些有趣的涌现特性（emergent properties）。在某种程度上，这是对这篇博文迟来已久的后续跟进：《无需 ClojureScript 的实时协作 Web 应用》（Realtime collaborative web apps without ClojureScript）。</p>
<p>在这种模型中，几乎所有的状态都保留在服务器端。我们每隔 X 毫秒（一个 tick）向每个已连接的客户端流式传输下一帧（这里所说的“帧”，是指服务器生成的 HTML 页面的下一个版本）。这种渲染风格通常被称为即时模式（immediate mode，在 Datastar Discord 社区中被称为 fat morph）。这些帧通过带有流式压缩（Brotli 或 Zstandard）的长连接 SSE（Server-Sent Events）流式传输给每个客户端。</p>
<p>你可以将其理解为：view = f(state)，只不过它运行在服务器端，而非客户端。</p>
<p>Tick 非常棒，因为它们为你提供了一个进行批处理的边界、反压机制以及衡量系统性能的基准点。如果服务器处于高负载状态，丢弃的是帧，但系统不会崩溃。</p>
<p>如果没有这种批处理，你的系统很容易意外陷入二次方复杂度（accidentally quadratic）。X 个用户执行 Y 个操作，每个操作都会触发面向所有用户的重新渲染。因此，1000 个用户每人每秒执行 1 个操作，就会产生 1000 x 1000 = 1,000,000 次渲染。而在基于 1 秒 tick 的系统中（每秒更新一次），无论用户执行多少个操作，都只会有 1000 次渲染。</p>
<p>基于简单 tick 的游戏循环示例：</p>
<p>当你拥有一个基于 tick 的系统时，你就拥有了一个自然引入屏障（barrier）的契机。例如，批处理写操作最简单的方式就是采用单写者模式。在基于 tick 的系统中，你可以在写操作与读操作之间建立清晰的屏障。</p>
<p>批量处理写入 -&gt; 批量处理渲染 -&gt; ...</p>
<p>这使你能够批量处理渲染。其实现可以很简单，只需遍历所有长连接并生成它们需要渲染的 HTML。或者，如果你想做得更精细一些，可以将每个连接组绑定到一个 CPU 核心并对其进行遍历。这样可以让每个组拥有自己的线程局部资源（缓冲区、缓存、数据库连接）。这对于提高系统的确定性以及限制内存占用非常有用。</p>
<p>以前，每个连接的模板生成可能需要一个 64KB 的缓冲区，但通过批量渲染，这最终变成了每个批处理线程 64KB。假设你有 10,000 个并发用户，原来就需要 640MB。更糟糕的是，如果你不重用缓冲区，每次渲染都会产生 640MB 的垃圾对象。而在批处理模型中，每个线程只需要 64KB，因此在一个 4 核系统中，总共仅需微不足道的 256KB！</p>
<p>在数据库连接（有时包括缓存）方面，你消除了资源竞争（关于为什么这很重要，请参阅 LMAX 的演讲）。每个渲染线程都拥有自己的资源，因此无需进行协调。</p>
<p>基于 tick 的游戏循环中的屏障示例：</p>
<p>渲染线程的大致结构如下：</p>
<p>在另一篇文章中，我介绍了流式压缩如何消除即时模式渲染的网络开销。发送整个 50KB 的 HTML 帧是完全可行的，因为在线路上传输时它可能小至 13 字节（在没有内容变更的情况下）。</p>
<p>但是，基于 tick 的模型难道不需要在每个 tick 中都查询数据库吗？就我的情况而言，是的，确实需要。但是，如果你使用像 SQLite 这样的嵌入式数据库来进行投影（projections），那么你的投影结构经过精心布局，查询速度会极快。如果你担心写入吞吐量，可以参考这篇博文：《10 亿行数据上实现 100,000 TPS：SQLite 不可思议的高效》（100000 TPS over a billion rows: the unreasonable effectiveness of SQLite）。</p>
<p>深呼吸一下。我们现在面对的是极其罕见的瓶颈场景。字符串生成、拼接、编码、转义以及部分迭代操作成了我们的性能瓶颈。</p>
<p>通过 tick、屏障、压缩和 SQLite，我们已经消除了大量工作。现在只剩下最后一个瓶颈了。在数千个并发用户每秒更新 10 次的情况下，HTML 模板渲染最终占用了我们大部分的帧预算。</p>
<p>你可能会采取某种巧妙的做法，比如只更新那些需要更新的用户。但是，这解决不了所有用户共用同一个小部件且无论如何都需要更新的问题，也解决不了时刻都在变化的动态内容等问题。这里的核心目标是避免陷入意外的二次方复杂度。任何只对理想路径（happy path）有效却无法改善最坏情况的优化，在出现问题时都只是纯粹的额外开销。</p>
<p>这就是聚合（aggregates）发挥作用的地方。因为在此之前，我们一直刻意保持“不自作聪明”：在每个 tick 向所有用户广播，即使内容没有任何变化。这使我们能够将渲染视为针对所有用户统一执行的批处理过程。这意味着我们可以假定，一个批次内的所有帧之间很可能存在某些重叠，而且与之前批次的所有帧之间也存在重叠。</p>
<p>并发用户过载测试的 CPU 火焰图。4000 个用户在没有缓存的情况下查看略有不同的视图。你可以使用搜索功能查找诸如 sqlite 等项。</p>
<p>我们的系统包含一个简单的 hiccup 解释器，它递归遍历 hiccup 数据结构并写入字节缓冲区：</p>
<p>这个 hiccup 解释器有两处微调。如果遇到函数，它将对其求值，并假定输出是需要进一步解释的 hiccup 结构。</p>
<p>这样做主要的好处是可以将工作推迟到解释器执行到该位置时再进行。这样，你的数据库查询结果就可以直接流式写入输出字节缓冲区，而无需将查询结果完整实例化。</p>
<p>如果它遇到的元素的第一个参数是一个函数，它会将该元素的其余内容作为参数传递给该函数（你可以将它们视为组件）。</p>
<p>妙处在于，我们可以为这些“组件”包裹一层缓存，并以它们的函数和参数作为键来缓存其输出。实际上，这就是自动的内容寻址缓存（content addressable caching）。组件本质上就是函数：</p>
<p>我们可以在 hiccup 中引用它们，类似于 Reagent 中的组件（不过我将来可能会将其更改为 chassis 风格的别名）：</p>
<p>它们支持完美嵌套，因为我们的解释器是递归的。</p>
<p>但是，缓存抖动（cache thrashing）怎么办？我们拥有了自动的组件级内容寻址缓存。大量各不相同的小型组件可能会将更有价值的缓存项挤出！</p>
<p>这就是我们借助 WTinyLFU 的地方。WTinyLFU 是一个非常出色的缓存算法，由 Caffeine 缓存库实现。</p>
<p>它具有两个非常出色的特性。只有当缓存条目以特定频率被访问时，才会被接纳（admitted）。这意味着所有那些各不相同的小型条目根本无法进入缓存。</p>
<p>而另一个有趣的特性是，不经常被请求的条目会自然地从缓存中淘汰。</p>
<p>这带来了一种非常有趣的涌现优化行为。假设我们有嵌套组件。它们带来了一个问题：如果我们同时缓存了所有子组件和父组件（包含所有子组件），我们占用的缓存空间大约翻了一倍。但是借助 WTinyLFU，如果外层包装组件总是在变化，由于准入机制的存在，它永远不会被缓存；如果外层包装组件保持稳定并长期存在，所有被缓存的子组件则会因为不再被单独请求而自然从缓存中淘汰。</p>
<p>并发用户过载测试的 CPU 火焰图。在添加基于内容寻址的组件缓存后，4000 名用户同时浏览略有不同的视图。</p>
<p>以批处理和聚合的思维方式思考，能让你在保持系统易于推导理解的同时，实现极其强大的性能优化。在进行应用开发时，我无需考虑缓存或性能问题，只需编写 hiccup 和 SQL 查询即可。</p>
<p>你可以在 hyperlith 代码仓中查看该项目的实验性源代码。它目前在此处的生产环境中运行，在单台 2 核 vCore 共享 VPS 上以 10 FPS 承载大约 1000 个并发用户。</p>
<p>感谢 Datastar Discord 频道中阅读本文草稿并向我提供反馈的每一个人。</p>
<p>火焰图使用 Oleksandr Yakushev 出色的 clj-async-profiler 工具制作。</p>
<p>© 2015-2026 Anders Murphy</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-07 17:26 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://andersmurphy.com/2026/09/29/faster-streaming-html-with-batches-and-aggregates.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ight-xp-glitch-in-skyrim-9b804dc7325cd504" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5510" data-content-paragraphs="35" data-published-at="2026-10-07T09:08:19.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 17:08</span>
</div>

### [详解《天际》魔光术刷经验 Bug](https://blog.alexbeals.com/posts/explaining-the-magelight-xp-glitch-in-skyrim)
<div class="original-title-sub"><span class="orig-tag">原文</span> Explaining the Magelight XP glitch in Skyrim</div>

<div class="article-body" data-article-body="true"><p>在《天际》中，首都独孤城（Solitude）外有一处地点，如果你在山顶施放“魔光术”（Magelight），就会获得巨额的变化系（Alteration）经验值——只需施放一次，就足以让你的技能等级从 15 级直接飙升到 25 级。但这究竟是为什么？</p>
<p>关于这一现象的成因，流传着很多错误的解释，但最主流的一种说法与目标的远近有关：</p>
<p>“魔光术命中时给予的经验值取决于它的飞行距离。你找到的这个地方正好处于渲染距离的边缘附近，而且还有一些技巧可以进一步增加这一距离。”——@Jewbacca1991</p>
<p>但正如其他人很快指出的那样，对于其他远距离目标这招并不奏效：这座山似乎有些特殊之处。UESP《天际》维基声称这是由于你能看到的云层所致：</p>
<p>“该地点获得的大量经验值似乎与穿过多层天气效果平面有关。”</p>
<p>然而，游戏中有大量多云的山脉并不会触发此现象。让我们通过逆向工程分析魔光术的经验值计算公式，来彻底揭开这个谜底。</p>
<p>魔光术是一个学徒级（Apprentice）法术。在 TES5Edit 中加载它，我们可以看到它的数值（Magnitude）为 5，持续时间（Duration）为 60，基础效果为 LightFFAimed（即 0001EA6D）。如果我们加载该效果，可以看到其基础消耗（Base Cost）为 2，技能使用倍率（Skill Usage Multiplier）为 0.15。</p>
<p>这些参数全部用于计算“技能使用值”（Skill Usage）。由于该法术没有影响范围（Area），公式很快可以简化为：</p>
<p>$$ \begin{aligned} Skill\_Usage &amp;= Base\_Effect\_Cost \times Area \times (Magnitude \times \frac{Duration}{10})^{1.1}\newline &amp;= 2 \times 1 \times (5 \times \frac{60}{10})^{1.1}\newline &amp;\approx 84.307 \end{aligned} $$</p>
<p>变化系经验值以此为基础，乘以技能使用倍率（魔光术为 0.15），再乘以技能使用乘数（变化系为 3），得出每次施法的原始经验值为 37.938。</p>
<p>理论上，我们可以朝墙壁施放魔光术，观察它是否给予了预期的经验值。遗憾的是，在游戏内（即使使用控制台命令）也无法获取精确的经验数值。所幸我们可以使用 Cheat Engine，通过 Lua 直接读取底层内存。你可能还记得 Lua（这是我在巴西石油公司下游最喜欢的编程语言），我在之前一篇关于 GBA 版《哈利·波特 1》速通的文章中提到过它。</p>
<p>如果我们运行上述脚本（我通过“编辑 &gt; 设置 &gt; 调试器”方法切换为使用 VEH 调试器，尽管我不确定这是否必要）将经验值重置为 0，施放魔光术，然后运行最后一步读取新的经验值，可以看到经验值的增长与预测完全一致。太棒了！</p>
<p>但这一切都没有涉及距离。为什么我们获得的经验值会远远超过 38 点呢？</p>
<p>魔光术与大多数其他法术不同，因为它不需要命中人——命中人当然有效，但朝墙壁、桌子或岩石施放也同样有效。在所有这些情况下它都会给予经验值，那么它是如何判断何时击中物体的呢？</p>
<p>施放该法术会生成一个 LightSpellProjectile（光法术投射物），它会根据你最初瞄准的方向沿路径飞行。在每一个 tick 中，它都会检查是否发生了碰撞，这大致遵循以下三个步骤：</p>
<p>绘制物体在下一个 tick 中将移动到的路径（0x007A0090）。它获取投射物的速度（512 单位/秒）并除以你的帧率（60 fps；是的，这意味着如果你在老款 Xbox 主机上游玩，碰撞检测频率会更低，而如果你将帧率调高至正常值以上，检测频率则会更高。如果你使用“延缓时间”龙吼或利用箭术/格挡特技来减缓时间，频率也会变高，不过每秒的碰撞次数保持不变），从而得出在你施法方向上的速度为 \(\frac{512}{60} = 8.5\bar{3}\) 单位/tick。该法术的射程为 10,000（同样由 ESM 文件决定，尽管上面的截图截图中漏掉了这一点。抱歉），因此它将沿着路径持续飞行 \(\approx 19.5\) 秒，然后消失。</p>
<p>将该路径与每个拥有碰撞体且通过碰撞层过滤的物体进行相交测试（0x00DE0040）。<br />游戏中的每个物体都有一个碰撞层，用来定义它会与什么发生碰撞（例如，L_TRANSPARENT 不会阻挡投射物或法术，而 L_TERRAIN 则会阻挡）。如果层级不匹配，则不会触发碰撞。</p>
<p>检查路径是否命中了该物体（0x00EC41C0）。<br />首先，它在物体表面寻找距离投射物最近的点。然后，它找出从该最近点指向物体表面外侧的法向量。<br />接着，它检查投射物的行进方向是否与法向量同向（通过检查点积为正还是为负来实现。数学真妙！）。如果是同向，说明它正远离表面，因此判定为没有发生碰撞。如果是反向，那么如果投射物已经相交、处于物体内部，或者将在下一个 tick 步长中击中它，系统就会标记碰撞。<br />请注意，即使投射物位于物体内部，法向量检查也是优先进行的：如果投射物穿过物体已经超过一半，导致最近点位于另一侧且法向量与运动方向同向，它就会停止触发碰撞。</p>
<p>一旦 LightSpellProjectile 与某个物体（或多个物体）发生碰撞，它就会针对每次碰撞执行一个“OnHit”函数（0x007A30FD），触发本该发生的效果。该函数处理了很多与魔光术无关的事情（例如结界术在 0x006ECE30 阻挡法术，或目标在 0x006E99D0 被毁灭系法术击退），但最终要么将效果施加在人身上（严格来说是魔法目标，其中也包括激活触发器之类的东西，位于 0x00664740），要么施加在碰撞表面上。大多数单次施法的法术是在“命中人物”的分支中处理经验值发放的，但在 0x00660353 处有一个特殊检查，专门用于给可以处理替代目标的法术（比如魔光术）发放经验。（实际上不仅仅是像魔光术，而就只有魔光术。严格来说它涵盖所有复生类和光亮类法术，但所有的复生类法术都重写了该位置，仅在复活尸体时发放经验；而唯一剩下的另一个光亮类法术是烛光术，它并不是投射物）。</p>
<p>最后，“OnHit”会在 0x007A2560 处添加撞击效果（impact）。它会确保此逻辑只运行一次，并检查被击中的材质以进行相应处理（例如依附在人身上，或者如果是墙壁则悬浮在墙壁附近）。如果没有材质，或者是不支持的材质，则不会发生撞击事件。</p>
<p>到目前为止描述的一切似乎都行得通，而且大部分情况下确实有效，但问题就出在这里。在与物体发生碰撞并执行“OnHit”之后，代码会运行一个“HandleHit”函数来确定弹道是否应当继续前进。通常它会阻止弹道继续飞行，但存在两个例外：如果弹道碰撞的物体满足以下条件，它将继续前进：1）非实体（具体来说，是Havok碰撞代码中的BROAD_PHASE_PHANTOM，用于触发器，例如“如果你走到这里就激活陷阱/过场动画/对话”之类的内容。该检查发生在0x0079f022处）；或者 2）具有图层类型26或28，这对应于L_TRANSPARENT_SMALL和L_TRANSPARENT_SMALL_ANIM（如果未来的自己想要寻找证据，这个例外位于0x0079f063）。</p>
<p>你施放魔光术（Magelight），直到它进入一个带有L_TRANSPARENT_SMALL的包围盒。该碰撞图层会与L_SPELL发生碰撞，因此被视作一次碰撞。由于它既不是人物也不是魔法目标，所以会进入回退路径并给予38点经验值。但是L_TRANSPARENT_SMALL在“HandleHit”中被豁免，因此弹道会继续前进。在下一个时钟刻（tick），同样的事情再次发生。它依然位于包围盒中，被算作一次碰撞，并奖励38点经验值。它将持续这样做，直到最近点的法线与其前进方向相同，大约是在它穿行到一半的时候。</p>
<p>但是带有L_TRANSPARENT_SMALL的对象在哪里呢？你猜对了：就在独孤城（Solitude）附近的那座山上（我使用基于《天际》Creation Kit制作的简易Mod使这些墙体可见，但你也可以通过调整.esm文件为碰撞图层添加调试颜色来实现相同的效果）。</p>
<p>还有其他一些地方也存在该图层，比如高霍斯加（High Hrothgar）的两侧：<br />或者盗贼公会任务线结尾处伊尔克桑德（Irkngthand）的雕像周围：<br />或者作为包围梭默大使馆（Thalmor Embassy）的极薄平面：<br />但体积最大的一些都位于独孤城旁边，这就是为什么你必须朝那座山施法，而不能只是对着远处随便一座多云的山施法。</p>
<p>大多数攻略都说要瞄准山顶，但你实际上要瞄准的是能够最大化法术穿过L_TRANSPARENT_SMALL块（且处于其正确区域）时间的任何一条轨迹线。山顶虽然不错，但我们能做得更好（山顶大约能提供~280次触发，而在最佳位置约为~850次）。</p>
<p>我迅速（我是说真的很快，Claude Opus 5.5在仅凭一张指出问题的截图的情况下，大约10分钟内仅尝试两次就完成了这个Mod）利用SKSE编写了一个Mod，可以渲染隐形墙并根据你瞄准法术的位置作出反应，动态计算预期的经验触发次数以及最大化获取经验的最佳角度。只需在该区域四处走动，就迅速找到了最佳位置（大量的数学计算也找到了“最佳”位置，但它位于地下且无法到达。真理想）。</p>
<p>要将变化系法术（Alteration）从15级升至100级，你需要 \(\sum_{L=15}^{99} 2 * L^{1.95}\) = 528,804.0234 点经验值。按照每次触发获得37.938点经验计算，这大约相当于近14,000次触发，因此一条能触发250次的轨迹线与一条能触发850次的轨迹线相比，意味着施法55次与施法17次的差距。不过，关键在于能够稳定复现——光说“瞄准天空中的这个点”毫无用处，因为大家根本做不到。因此，这里提供一个切实可行的操作指南！</p>
<p>首先传送到独孤城，然后走出大门，来到城外。我们要爬上左边的岩石。那里有一面隐形墙，所以请背靠它以及最深处角落里的城堡墙壁站好。</p>
<p>我们将瞄准我们紧贴的那面墙上左上角砖块的灰缝线。</p>
<p>为了获得正确的角度，我们要蹲下，然后将准星中心与那条灰缝对齐（最佳轨迹线是右边一块砖的左上角，但存在一定的容差空间）。</p>
<p>然后我们要向前并向左平移走位，确保始终紧贴着隐形墙，同时保持角度不变。这样会展现出由不同组件构成的城堡墙壁的两条缝线。</p>
<p>我们的目标是向后平移，直到第二条线刚好再次被遮挡隐藏。此时，你应该正凝视着一片看似随意的天空。</p>
<p>尽情施法吧！（我在1分15秒内施法17次升到了100级。如果你更喜欢视频教程，我已经在YouTube上上传了一个。我第一次使用Claude的computer use功能来支持在DaVinci Resolve中制作天际主题的UI弹出窗口，看着它运行又是令人感叹“这简直是魔法”的时刻。非常适合一次性任务）。</p>
<p>有了这个，但愿、但愿我终于可以告别《天际》了。</p>
<p>你可能还记得来自我之前关于GBA版《哈利·波特1》速通文章中的Lua（我最喜欢的源自巴西石油公司的编程语言）。↩︎<br />我通过“编辑 &gt; 设置 &gt; 调试器”方法改用VEH调试器，尽管我不确定这是否必要。↩︎<br />是的，这意味着如果你在老式Xbox主机上游玩，碰撞检查频率会更低；而如果你将该值调高到正常值以上，频率则会更高。如果你使用“迟缓时间”龙吼，或者利用箭术/格挡特技来减缓时间，频率也会变高，但每秒碰撞次数保持不变。↩︎<br />这同样由ESM文件决定，尽管它没有出现在上面的截图中。哎呀。↩︎<br />它通过检查点积为正还是为负来做到这一点。数学万岁！↩︎<br />例如在0x006ECE30处结界阻挡法术，或在0x006E99D0处目标被毁灭系法术击退。↩︎<br />严格来说是一个魔法目标，其中也包括诸如激活触发器之类的内容。↩︎<br />实际上并不像魔光术那样，它就只是魔光术。从技术上讲，它涵盖所有复活亡灵和光照法术，但所有的复活术都重写了此逻辑，仅在你从死尸中唤醒亡灵时才提供经验，而唯一的另一种光照法术是烛光术（Candlelight），它并不是弹道法术。↩︎<br />具体来说，是Havok碰撞代码中的BROAD_PHASE_PHANTOM，用于触发器（例如“如果你走到这里就激活陷阱/过场动画/对话”之类的内容）。该检查发生在0x0079f022处。↩︎<br />如果未来的自己想要寻找证据，这个例外位于0x0079f063。↩︎<br />我使用基于《天际》Creation Kit制作的简易Mod使这些墙体可见，但你也可以通过调整.esm文件为碰撞图层添加调试颜色来实现相同的效果。↩︎<br />山顶大约能提供~280次触发，而在最佳位置约为~850次。↩︎<br />我是说真的很快，Claude Opus 5.5在仅凭一张指出问题的截图的情况下，大约10分钟内仅尝试两次就完成了这个Mod。↩︎<br />大量的数学计算也找到了“最佳”位置，但它位于地下且无法到达。真理想。↩︎<br />我第一次使用Claude的computer use功能来支持在DaVinci Resolve中制作天际主题的UI弹出窗口，看着它运行又是令人感叹“这简直是魔法”的时刻。非常适合一次性任务。↩︎</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-07 17:08 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.alexbeals.com/posts/explaining-the-magelight-xp-glitch-in-skyrim" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ighted-by-domestic-abuse-9b8690190126b4a8" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="418" data-content-paragraphs="3" data-published-at="2026-10-07T09:00:45.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/guardian.svg" class="source-icon" alt="The Guardian Society (卫报社会与民生)" width="16" height="16" /> <strong>The Guardian Society (卫报社会与民生)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 17:00</span>
</div>

### [“我以为孩子会改变他”：孕期被家庭暴力阴影笼罩的女性们](https://www.theguardian.com/society/2026/oct/07/i-thought-the-baby-would-change-him-the-women-whose-pregnancies-are-blighted-by-domestic-abuse)
<div class="original-title-sub"><span class="orig-tag">原文</span> ‘I thought the baby would change him’: the women whose pregnancies are blighted by domestic abuse</div>

<div class="article-cover"><img src="https://i.guim.co.uk/img/media/0f2c6d71d1b98d2f8b45fcfc30607cfde3633aff/0_0_5000_4000/master/5000.jpg?width=140&amp;quality=85&amp;auto=format&amp;fit=max&amp;s=8680f681553cf46e7b8c586f2cc1458d" alt="“我以为孩子会改变他”：孕期被家庭暴力阴影笼罩的女性们" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>在英格兰，每年向产科机构披露的此类案件估计达2万起。两位幸存者讲述了她们的遭遇。</p>
<p>随着孕期推进，伊薇（Evie）的情绪日渐麻木，而在购买婴儿监护仪时，她难得流露出了一丝兴奋。她很喜欢它能将实时视频画面传送到自己手机上的功能。“我当时想：‘这真棒，不仅能听到孩子的声音，还能看到孩子。’”遗憾的是，她的伴侣同样对这款监护仪情有独钟。很快，在伴侣的命令下，她不得不走到哪里就把它带到哪里，以便他能随时监视她。“他把它当成了监控工具，”她说。</p>
<p>到那时，她已被折磨得心力交瘁、惶惶不可终日。自得知她怀孕后，他的控制欲便愈发强烈。到了怀孕第7个月，他甚至开始诉诸肢体暴力。“我们当时正躺在床上看东西，”她回忆起第一次遭受殴打时的情景，“两人起了争执，但他开始变得异常凶狠……气氛让人感觉越来越危险，他看起来情绪极度狂躁。于是我挪了挪身子，坐到了床边。突然间，他使尽全力一拳狠狠砸在我的手臂上。接着他又砸了一拳。那股冲击力就像被重鞭抽打一样。”</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Guardian Society (卫报社会与民生)】于 2026-10-07 17:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theguardian.com/society/2026/oct/07/i-thought-the-baby-would-change-him-the-women-whose-pregnancies-are-blighted-by-domestic-abuse" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Guardian Society (卫报社会与民生)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ons-to-dislike-ai-coding-4707edb81cbb1852" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1492" data-content-paragraphs="12" data-published-at="2026-10-07T05:34:50.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 13:34</span>
</div>

### [反感 AI 编程的种种理由](https://www.sicpers.info/2026/10/reasons-to-dislike-ai-coding/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Reasons to dislike AI coding</div>

<div class="article-body" data-article-body="true"><p>我之前在《艺术还是工具？》（Art or tool?）一文中谈到过这点：如果你把软件视为艺术创作的产物，那么生成出来的软件就不是真正的软件，因为它缺少作为真正艺术标志的那种不可言喻的创造性。</p>
<p>对此观点无法反驳，唯一的例外是：想要软件的人通常并不是在为艺术品买单，而是在为结果买单。而无论某个物件是如何制造出来的，使用该物件所产生的结果都是相同的。</p>
<p>这也意味着对此观点同样无法立论支持，除非你把以下观点当作公理：能被称为艺术的东西只能由人创造；并且使用这套特定的工具会在人与作品之间造成过大的隔阂，而历史上没有任何其他工具会在人与作品之间造成如此巨大的割裂。</p>
<p>这一点我之前在《论运转中的机器》（On working machines）中也探讨过：如果你认为敲代码是你获得报酬的原因，而雇主现在拥有了一台能够敲代码的机器，那么这台机器就“抢走了你的工作”。</p>
<p>然而，这份工作从来就不是为了敲代码，而是为了交付有价值的软件。仍然能够做到这一点的人，依然可以从需要完成这项工作的组织那里获得报酬。而且正如我在引用的文章中所说，随着应用变得更加高效，需求只会增加。</p>
<p>如果你认为软件创作是一种人与人之间的协作努力，那么将软件生成的任务描述转化为提示词、再由软件根据提示词生成更多软件，这种体验确实令人丧失人性化。</p>
<p>几个世纪以来，社会的轨迹一直如此。以下是《机器论片断》（Fragment on Machines）中的一段引文：</p>
<p>“……劳动资料一旦被纳入资本的生产过程，就会经历不同的形态变化，其最高阶段就是机器，或者更确切地说是机器的自动体系（机器体系：自动的机器体系只是它最完备、最充分的形式，只有它才把机器转变为一个体系），它由自动机、由一种自身运动的动力所驱动；这个自动机由许多机械的和智力的器官组成，以至于工人自己只是被当作它的有意识的连结纽带。[……]<br />因此，知识和技能的积累，社会智力的一般生产力的积累，就这样被资本吸收，与劳动相对立，从而表现为资本的属性，更具体地说是固定资本的属性，只要它作为真正的生产资料进入生产过程。”</p>
<p>这段由卡尔·马克思在大约 1857 至 1858 年间写下的文字表明，无论是机械工作还是智力工作，历来都注定要被机器所取代（在预测智力劳动的异化时，马克思很可能借鉴了他对同代数学家查尔斯·巴贝奇理论的了解）。在这种情况下，夺走工作的不是技术，而是生产方式。既然编程属于智力工作，生产资料实际上就是我们的大脑，我们理应能够掌握它们。</p>
<p>受贝特朗·迈耶（Bertrand Meyer）的《写给聪明人的 AI》（AI for Smarties）所启发：如果你认为软件工程是软件工程师高深知识的缜密应用，被封装在 SOLID 原则、“多用组合少用继承”、“善用你的类型”、德墨忒尔定律等规则之中，那么 AI 绝不可能编写软件，因为它并不遵循这些规则，它只是生成了刚好能够编译的代码文本而已。</p>
<p>尽管计算机历史上的大部分时间里，人们对待软件采取的都是经验主义方法：从 Stack Overflow 复制代码并反复调整直到能够运行；照着《数值算法》（Numerical Recipes）或《Sinclair User》杂志上的代码清单抄下来并不断调整直至正常工作；编写宏命令以自动化复制环节，等等。</p>
<p>如果你认为大型 AI 公司是由那些并不把全人类最大利益放在心上的人所经营的（延伸阅读：上面未引用的卡尔·马克思的所有著作），那么 AI 编程就是糟糕的，因为它支持了这些公司。只要你不允许创建其他公司，不允许使用学术模型或社区模型等非商业模型，诸如此类。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-07 13:34 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://www.sicpers.info/2026/10/reasons-to-dislike-ai-coding/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--how-fast-is-python-3-15-afdecd136fba8911" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="4340" data-content-paragraphs="46" data-published-at="2026-10-07T02:58:16.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/lobsters.svg" class="source-icon" alt="Lobste.rs (极客思想社区)" width="16" height="16" /> <strong>Lobste.rs (极客思想社区)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🔥 社会热点与思潮</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-07 10:58</span>
</div>

### [Python 3.15 到底有多快？](https://blog.miguelgrinberg.com/post/how-fast-is-python-3-15)
<div class="original-title-sub"><span class="orig-tag">原文</span> How fast is Python 3.15?</div>

<div class="article-body" data-article-body="true"><p>又到了十月，这意味着又是时候体验 Python 新版本了（从严格意义上讲，我使用的是 3.15.0rc3 版本，距离官方正式发布 3.15 还有几天时间）。就像一年前我撰写的 Python 3.14 性能文章一样，今天我将分享我非正式 Python 基准测试的新一轮运行结果，将 Python 3.15 与一直追溯到 3.10 的早期解释器版本进行对比。</p>
<p>如果你对图表和表格不感兴趣，只想阅读我的分析，欢迎直接跳到文末的结论部分。</p>
<p>我刚刚把我的基准测试称为“非正式”。这是什么意思呢？</p>
<p>要对一种编程语言的性能得出客观且普适的衡量标准是不可能的。你所能做的只是编写一些程序并运行它们，以衡量它们的性能。其他程序可能会表现出类似的性能特征，也可能不会，这真的无从得知。我对该基准测试的初衷只是想了解 Python 各版本之间的性能变化，但我想明确说明的是，我并不是试图获取 Python 解释器的全面性能分析全貌。</p>
<p>在本次基准测试中，我将运行名为 fibo.py 和 bubble.py 的两个程序，如果你愿意的话可以查看它们。这些程序与我在以往各期基准测试中使用的程序相同。第一个程序用于计算斐波那契数列中的数字，第二个程序则使用冒泡排序算法对数字进行排序。</p>
<p>我选择这两个程序作为两类算法的代表。斐波那契数列的计算采用递归方式，我发现这在 Python 解释器中效率较低。另一方面，冒泡排序仅使用 for 循环，没有任何递归。我的基准测试并未试图涵盖其他类型的程序。特别需要注意的是，我并没有在此基准测试中包含 I/O 密集型代码。</p>
<p>因为近期 Python 版本中的一些性能改进是围绕多线程展开的，所以我也为每个程序创建了一个多线程变体，因此总共有四项不同的测试。</p>
<p>完整的测试矩阵实际上相当复杂，因为我必须在所有 Python 版本下运行这四种程序变体，外加针对具备相应功能的版本运行 JIT 和无 GIL（free-threading）备选配置。我还喜欢在 PyPy 下运行这些测试，因为在以往的基准测试中，该解释器表现出了令人印象深刻的性能。为了将 Python 的性能置于更广阔的生态系统中进行考察，我还将这两个程序移植到了 JavaScript（Node.js）和 Rust。</p>
<p>以下是我所采用的完整测试矩阵：</p>
<p>读过我以往基准测试的读者可能还记得，我的矩阵中曾包含 Linux 与 macOS 对比的额外维度。鉴于前两次基准测试中两者之间并无显著差异，这一次我决定放弃 macOS 测试，因此所有测试均在一台搭载英特尔酷睿 i5 CPU 并运行 Gentoo Linux 的 Linux 笔记本电脑上执行。</p>
<p>我用来衡量此基准测试中每个参与对象性能的方法是将测试程序运行三次，并取这三次的平均用时。在下面分享的结果表格中，我还展示了与 3.15 版本的速度差异，以及在合适的情况下与特定解释器上一版本的速度差异。在速度比较方面，我使用了简单的比率，其中 1x 表示速度相同，0.5x 表示速度为一半（或运行时间翻倍），2x 表示速度快一倍（或者如果你喜欢的话，运行时间缩短一半），依此类推。希望这直观易懂。</p>
<p>让我们开始吧。第一项测试是计算前 40 个斐波那契数。</p>
<p>在下方你可以看到上述速度的图表形式：</p>
<p>从这些结果中我们可以推断出，在此项测试中，Python 3.15 仅比 3.14 快了一点点，可能微不足道。正如我在往年所观察到的那样，PyPy 3.12 的性能极为惊人，达到了 3.15 速度的 5.5 倍，甚至略微领先于 Node.js。至于 Rust，毫无悬念，但知道极限在哪里总是好事！</p>
<p>将每个 Python 版本与上一版本进行对比，揭示了一个有趣的细节：仅有 Python 3.11 和 3.14 这两个版本较其前代产品实现了显著的性能提升。你可以在图表中清楚地看到这一点，即柱状图高度相比前一个版本出现了较大幅度的下降。其他版本要么保持了相同的速度，要么带来了小幅提升，因此总体上始终是在进步的。</p>
<p>在下一组结果中，你可以看到 Python 的 JIT 和无 GIL（FT）版本在同一测试中的进展。请记住，Python 解释器的这些替代版本最初是在 3.13 中引入的，因此需要评估的版本范围要小得多。</p>
<p>以下是包含这些结果的图表：</p>
<p>实际上，最有趣的事情在于，在同一测试中，3.15 解释器中的 JIT 比标准解释器更快，而在前几年并非如此。而且 1.20 倍的速度提升绝非微不足道，看到这一点非常令人兴奋！</p>
<p>在无 GIL 方面，由于该测试是单线程的，因此确实没有太多值得期待的。但我们可以说，无 GIL 解释器的性能与 3.14 版本的解释器大致相当。</p>
<p>现在让我们来看看第二项测试。以下是单线程冒泡排序测试的表格和图表，该测试配置为对 10,000 个随机数进行排序：</p>
<p>与上一项测试一样，在这里我们也可以看到 3.15 相对于 3.14 只有非常微小的性能提升。我们再次看到 3.11 和 3.14 是近期真正推动性能显著提升的两个 Python 版本。部分版本在此项测试中甚至出现了轻微的性能倒退。PyPy 依然非常快，但在这项测试中 Node.js 表现更快。</p>
<p>接下来的表格和图表显示了 Python 解释器的 JIT 和无 GIL 版本的测试结果：</p>
<p>这展示了与第一项测试相同的总体格局。3.15 JIT 再次展现出了相比常规解释器令人印象深刻的 1.28 倍速度提升。无 GIL 版本相比标准解释器出现了性能下降，但 3.14 解释器也出现了类似的下滑，因此这并不算退步。正如我之前所说，这并不太重要，因为该测试是单线程的，所以它并非能让无 GIL 解释器大显身手的那类应用。我认为期望无 GIL 解释器的表现与常规解释器相当是合理的，因此从这个角度来看，我们仍可以说还有很多工作要做。</p>
<p>现在让我们重复所有测试，但改为并行运行 4 个线程。鉴于这是一项专门设计用来评估 Python 解释器无 GIL 版本的特定测试，我舍弃了非 Python 的运行配置。</p>
<p>为了获得基准数据，我首先在标准 Python 上运行了多线程测试。必须明确说明的是，这些结果对 CPython 来说必然是不理想的，因为全局解释器锁（GIL）阻止了线程间的真正并发。以下是多线程斐波那契测试的结果和图表：</p>
<p>该测试显示 3.15 比 3.14 略慢一点。我们在单线程测试中已经看到 3.15 解释器仅比 3.14 略快，因此总体而言，我认为可以说标准解释器的速度与 3.14 基本持平。在此我们还可以看到，PyPy 依然大幅领先标准 Python，但在启用多线程后，其速度也以类似的比例放缓，因为 PyPy 的并发同样受到 GIL 的影响。</p>
<p>现在让我们来看看 Python 解释器的 JIT 和自由线程（free-threading）版本在此项测试中的表现。</p>
<p>Python 3.15 解释器的自由线程版本运行速度大约是标准解释器的 4.5 倍，这一比例与 3.14 大体相同。这种显著的速度提升归功于解释器在没有 GIL 的情况下运行，从而实现了更高效的线程并发。</p>
<p>我们从这些结果中获得的第二个观察是：带有 GIL 运行的 JIT 版解释器，即使在运行多线程时，也对标准解释器保持了类似的优势，而这正是 3.15 中的新特性。</p>
<p>我们还有最后一组测试结果需要审视。以下是冒泡排序测试的标准解释器结果：</p>
<p>这再次与先前的结果大体一致，3.15 解释器仅比 3.14 快一丝一毫。</p>
<p>既然我们已经有了该测试的基准数据，接下来看看 JIT 和自由线程解释器的表现：</p>
<p>在这里，自由线程版 3.15 解释器再次快于标准版。尽管提升幅度不如斐波那契测试中那么亮眼，但这类程序仍然是无 GIL 解释器的一个良好用例。</p>
<p>至于 JIT 的结果，它们似乎与该解释器的所有其他运行情况保持一致，显示出 3.15 中的巨大改进。</p>
<p>希望您喜欢查看我的基准测试。也许除了看到一堆数字和彩色图表之外，您还想知道这一切在实际意义上意味着什么。</p>
<p>在结束本文之前，我想就这些数据所反映的情况给出我的个人解读，因为您可能想知道升级到 3.15 是否合理，以及升级后可以预期获得哪些改进。在这一部分中，我们将离开确定性事实，进入个人观点的领域，因此请记住，其他人查看这些数据可能会得出与我完全不同的结论！</p>
<p>说完免责声明后，我想表达的是，在运行这些测试后，我的直觉是 Python 3.15 在性能方面充其量只是对 3.14 的相当微小的改进。我最终可能会升级目前运行在 3.14 上的生产项目（例如本网站），但目前获得的结果并没有让我产生急于升级的冲动——而去年在看到 3.14 如此出色的表现后我确实迫不及待地升级了。</p>
<p>在 3.15 版本中唯一有明显改进的领域是 JIT。但 JIT 仍然是一项实验性功能，因此将其用于生产环境并不是一个好主意。只有当 JIT 脱离实验阶段时，我才会考虑在生产中使用它。</p>
<p>除了 JIT 之外，此版本并没有真正带来任何显著的性能提升。一些测试确实显示出小幅的性能增量，但其他测试则显示出性能倒退，因此我不指望这些微小变化能在现实世界的项目中转化为显而易见的性能差异。老实说，我觉得继续在 3.14 上停留几个月，甚至等到一年后 3.16 发布时再评估新版本，并不会让我失去任何东西。</p>
<p>不过，我确实计划将 3.15 作为我日常使用的主要解释器，并且我也许最终会升级我的一些生产项目，仅仅是为了使用一些新功能，例如类 JavaScript 的推导式解包或惰性导入（lazy imports）。</p>
<p>感谢您访问我的博客！如果您喜欢这篇文章，请考虑通过“Buy me a coffee”进行小额一次性捐赠，以支持我的工作并为我补充咖啡因。谢谢！</p>
<p>如果您喜欢本博客上的 MicroPython 教程系列，您可能也会喜欢我的《Raspberry Pi Pico W 上的 MicroPython》一书。</p>
<p>我是一名软件工程师兼技术作家，目前居住在爱尔兰的德罗赫达（Drogheda）。</p>
<p>生成式人工智能声明：我不使用大语言模型（LLM）、智能体或任何其他生成式 AI 工具来协助本博客或我的开源项目相关的写作、编码、图像创作或任何其他任务。</p>
<p>您也可以在 Github、LinkedIn、Bluesky、Mastodon、Twitter、YouTube、Buy Me a Coffee 以及 Patreon 上找到我。</p>
<p>感谢您的来访！</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Lobste.rs (极客思想社区)】于 2026-10-07 10:58 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#社会热点与思潮</span>
  <span class="news-tag-pill">#Lobste.rs</span>
</div>

<div class="news-card-footer"><a href="https://blog.miguelgrinberg.com/post/how-fast-is-python-3-15" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Lobste.rs (极客思想社区)】官方出处原文 ↗</a></div>
:::

::::