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
<div id="story-antivirus-sandbox-part-2-5b99ba2e157ec4e5" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="6624" data-content-paragraphs="51" data-published-at="2026-09-25T07:03:46.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/hackernews.svg" class="source-icon" alt="Hacker News (科技前沿论坛)" width="16" height="16" /> <strong>Hacker News (科技前沿论坛)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 15:03</span>
</div>

### [CVE-2025-13032：进入并攻破 Avast 杀毒软件沙箱（第二部分）](https://www.safateam.com/intelligence-hub/research/technical-articles/cve-2025-13032-entering-and-breaking-the-avast-antivirus-sandbox-part-2)
<div class="original-title-sub"><span class="orig-tag">原文</span> CVE-2025-13032: Entering and Breaking the Avast Antivirus Sandbox Part 2</div>

<div class="article-body" data-article-body="true"><p>本文是我们关于 Avast 杀毒软件研究的第二部分，也是最后一部分，详细介绍了在当时最新的 Windows 11 系统上针对 CVE-2025-13032 的完整利用过程。从第一部分介绍的“双重获取”（double-fetch）漏洞出发，我们将逐步演示如何通过破坏 IORing 对象的 RegBuffers 数组，将可控的分页池（paged pool）溢出转化为任意内核读/写原语。本文涵盖了堆喷射策略、通过 MDL 自省泄漏内核地址、避免在清理退出时发生蓝屏所需的修复措施，以及最终通过令牌窃取提权至 SYSTEM 权限的过程。</p>
<p>这篇博文是我们 Avast 研究的第二部分，也是最后一部分，重点介绍 CVE-2025-13032 的漏洞利用，这是我们在 Avast 内核驱动程序中发现的一个双重获取漏洞。</p>
<p>本文回顾了该缺陷，并逐步演示了我们在发现该漏洞时最新的 Windows 11 系统上是如何对其进行利用的。</p>
<p>如果您错过了第一部分，欢迎阅读第一部分 → https://www.safateam.com/intelligence-hub/research/technical-articles/cve-2025-13032-entering-and-breaking-the-avast-antivirus-sandbox-part-1</p>
<p>注意：在最新版本中，Windows 内核和驱动程序开始使用用户模式访问器（user-mode accessors，https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/user-mode-accessors）来验证内核对用户模式内存的每次访问，并在每次访问时确保用户缓冲区确实位于用户空间。这一缓解机制将阻止本篇分析中所描述的利用技术的生效，更多细节请参见 https://www.youtube.com/watch?v=ry4SNYe2f68。</p>
<p>我们想要利用的缺陷是一个会导致内核池溢出的双重获取问题。</p>
<p>下面展示的代码片段本应捕获用户提供的 `_UNICODE_STRING` 结构体，但用户输入的 `Length` 字段被多次获取，从而引发了双重获取问题。</p>
<p>第一次获取用于分配用于复制字符串的缓冲区，第二次获取则用于根据检索到的数值执行 memcpy 操作；如果用户在这两次操作之间修改了该值，就会导致池溢出。</p>
<p>为了利用这个双重获取漏洞，第二个线程在紧凑的循环中运行，不断在较小的安全值与较大的恶意值（例如 `0x1000`，大于已分配的缓冲区）之间来回切换共享 `_UNICODE_STRING` 的 `Length` 字段。主线程则循环调用存在漏洞的 IOCTL。当时间窗口契合时——即内核在调用 `ExAllocatePoolWithTag` 时读取到的 `Length` 较小，而在调用 `memmove` 时读取到的 `Length` 较大——复制的字节数就会超过已分配的字节数，从而产生池溢出。竞态窗口虽然狭窄，但在适度的迭代次数内即可稳定触发。</p>
<p>我们的目标是利用这种池溢出来获取任意内核读/写原语，并实现本地权限提升。该缺陷为我们提供了良好的利用条件：溢出目标为 `PAGED_POOL`，分配大小和溢出大小均可控，溢出的内容同样可控。</p>
<p>分页池是 Windows 内核内存的一个区域，用于存放内核或驱动程序所需、但可以被换出到磁盘的对象和数据。它用于存储无需由高优先级运行的关键代码访问的内存。分配器按大小类别（size class）对分配进行分组，这意味着相同大小的对象在内存中往往会紧邻存放——这一特性使得堆喷射成为可能。</p>
<p>自 Windows 10 19H1 起，这部分由段堆（Segment Heap）处理，它使用两种后端：用于小分配的 LFH（它会在对应大小的桶内随机挑选空闲插槽），以及用于较大分配的 VS 分配器（它会提供相应大小的第一个可用内存块）——每种后端都需要不同的喷射策略。我们还可以注意到，大多数 Windows 对象都存储在分页池中，这为我们在选择破坏目标时提供了大量候选对象。在下一节中，我们将解释我们选择了哪个对象以及做出该选择背后的原因。</p>
<p>有关 Windows 内存池工作原理的更多信息，可以参考 Synacktiv 的论文《Scoop the Windows 10 pool!》（https://www.sstic.org/media/SSTIC2020/SSTIC-actes/pool_overflow_exploitation_since_windows_10_19h1/SSTIC2020-Article-pool_overflow_exploitation_since_windows_10_19h1-bayet_fariello.pdf）。</p>
<p>I/O 环对象（I/O Ring Object）是维护一个用于异步执行 I/O 操作的提交队列的对象。</p>
<p>我们选择该对象作为破坏目标有几个原因。虽然 IORing 对象本身位于 `NON_PAGED_POOL`（非分页池）中，但其 `RegBuffers` 字段分配在 `PAGED_POOL`（分页池）中，这与发生溢出的内存池直接契合。</p>
<p>第三，破坏该数组中的单个指针就足以获得完全的任意读/写原语——无需破坏更为复杂的结构体。</p>
<p>最后，I/O 环对象此前已被公开用于实现完全相同的目标，这验证了该技术的可行性，并为我们的方法提供了坚实的参考依据。<br />（https://windows-internals.com/one-i-o-ring-to-rule-them-all-a-full-read-write-exploit-primitive-on-windows-11/）</p>
<p>用户态提供了多个可用于操作该对象的 API，以下是其中的一部分：<br />- BuildIoRingReadFile<br />- BuildIoRingWriteFile</p>
<p>`Build.*` API 用于构建需要通过 `SubmitIoRing` API 提交的条目。</p>
<p>下面是 `_IORING_OBJECT` 和 `_IOP_MC_BUFFER_ENTRY` 结构体：</p>
<p>下图展示了该结构体在内存中的布局：`RegBuffers` 是一个指针数组，其中每个 `RegBuffers[i]` 指向一个包含 `Address` 字段的 `_IOP_MC_BUFFER_ENTRY` 结构体，内核将该字段用作 I/O 操作的目标地址：</p>
<p>我们的计划是重定向某个 `RegBuffers` 条目，使其指向我们在用户态完全受控的伪造 `_IOP_MC_BUFFER_ENTRY` 结构体。当内核使用该条目执行 I/O 操作时，它将直接解引用我们的伪造结构体——从用户态读取 `Address` 字段并将其用作读/写目标。这之所以能够实现，是因为 Windows 未启用 SMAP（管理模式访问预防，Supervisor Mode Access Prevention），否则该机制会阻止内核解引用指向用户态内存的指针。</p>
<p>有了这个伪造的条目，两种 IORing 操作就成为了我们的读/写原语：<br />`IoRingReadFile` 从文件读取内容并写入 `RegBuffers[i].Address`——使其成为我们的任意内核写原语：<br />`IoRingWriteFile` 从 `RegBuffers[i].Address` 读取内容并写入文件——使其成为我们的任意内核读原语：</p>
<p>具体而言：要对地址 X 执行任意内核写入，只需将伪造的 `BufferEntry` 的 `Address` 字段设置为 X，并提交一个 `IoRingReadFile` 操作——内核便会将读取的数据直接复制到地址 X 处的内存中。要从地址 Y 读取数据，只需将 `Address` 设置为 Y 并提交一个 `IoRingWriteFile` 操作——内核会从 Y 读取数据并写入输出文件，随后我们便可从用户态获取该数据。在这两种情况下，只需更新驻留在我们用户态的伪造条目中的 `Address` 字段，便足以重定向该操作。</p>
<p>为了让我们的堆溢出恰好落在一个 `RegBuffers` 分配上，我们采用了以下喷射（spray）策略。所需设置极简：针对我们想要定位的每个 `RegBuffers` 结构，仅需要一个 IORing 对象。</p>
<p>喷射本身非常简单：我们分配大量的 `RegBuffers` 结构，释放其中的一部分以制造合适大小的空洞（holes），然后触发漏洞，使我们发生溢出的分配落入其中一个空洞中，从而破坏相邻的条目。</p>
<p>它在内存中的表现如下：<br />1. 分配大量的 `RegBuffers` 结构<br />2. 释放其中的一部分<br />3. 分配我们的 Unicode 字符串<br />4. 同时触发破坏</p>
<p>自此，我们获得了一个被破坏的 `RegBuffers` 条目——堆溢出已经成功，并且我们的任意读写原语（primitive）也已就位。下一步是获取一个内核地址以作为读写目标。</p>
<p>此时我们已经拥有了任意读写原语，但需要一个内核目标地址——具体来说是我们自己的 `_EPROCESS` 地址，我们将利用它来窃取 SYSTEM 进程令牌（token）。</p>
<p>下图展示了破坏后各个结构的状态：</p>
<p>由于我们破坏了 `RegBuffers[0]` 内部的指针——将其重定向到了位于我们自己进程内存中的伪造 `_IOP_MC_BUFFER_ENTRY`，因此我们只需从用户态对其进行写入，便可随时修改该伪造条目的 `Address` 字段。完全无需再次触发该漏洞。</p>
<p>我们的任意读写原语已可正常运作，但它需要一个目标内核地址。由于内核地址是随机化的，无法从用户态直接预测，因此我们需要泄露一个内核地址——具体来说是我们自身 `_EPROCESS` 结构的地址，稍后我们将用它来篡改我们的进程令牌。</p>
<p>（https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/using-mdls）<br />内存描述符列表（MDL）是一种内核结构，通过锁定其物理页面来描述一段虚拟内存范围。当内核需要安全地对用户态缓冲区进行操作时（例如对其执行 I/O），它会为该缓冲区创建一个 MDL，从而固定底层物理页面，使其在操作期间不会被换出（paged out）或重新映射。因为 MDL 描述的是用户态地址，所以内核需要跟踪是哪个进程拥有该内存，因此 MDL 会在其 Process 字段中存储一个指向所属进程 _EPROCESS 结构的指针：</p>
<p>在我们的案例中，当被破坏的 BufferEntry 指向用户态地址并且我们触发 IORing 操作时，内核会创建并挂载一个 MDL 到我们的 BufferEntry 上以映射该地址。由于 BufferEntry 本身现在位于用户态（这是我们破坏的结果），我们可以直接从自己的进程中读取其 Mdl 字段。然后，我们使用任意读原语解引用该 MDL 指针并提取出 Process 字段——从而为我们提供了自身进程的有效 _EPROCESS 指针，这正是我们后续进行权限提升所需的全部内容。</p>
<p>泄露过程分为四步：<br />(1) `RegBuffers[0]` 现在指向位于已知用户态地址的伪造 `_IOP_MC_BUFFER_ENTRY`。<br />(2) 我们触发一次 IORing 操作——内核为我们的用户态缓冲区创建一个 MDL，并将其指针写入我们伪造条目的 `Mdl` 字段。<br />(3) 由于伪造条目位于我们自己的进程内存中，我们无需任何内核原语即可直接从用户态读取该 `Mdl` 指针。<br />(4) 我们将伪造条目的 `Address` 字段设置为该 MDL 地址，触发另一次操作，并从 MDL 中读取 `Process` 字段——从而获得有效的 `_EPROCESS` 指针。</p>
<p>此时，我们同时拥有了任意读/写原语以及内核地址泄露。然而，在进行权限提升之前，我们需要修复损坏的状态——若在不清理的情况下释放 IORing 对象，将导致系统崩溃。</p>
<p>在溢出期间，我们破坏了池块头（pool chunk header）中的一个重要字段：`ProcessBilled` 字段，该字段存储了指向负责该分配的进程的指针。如果不加以修正，在释放该块时将会触发蓝屏。</p>
<p>ProcessBilled 的值是一个经过混淆的 `EPROCESS` 指针，其计算方式如下：<br />`ChunkAddress` 是被损坏的池块头的地址，位于我们已知的 `RegBuffers` 指针前方已知的负偏移量处。</p>
<p>然后，我们计算出损坏块的正确 `ProcessBilled`，并使用任意写原语将其写回。</p>
<p>掌握了计算公式后，剩下的步骤是在内存中定位被破坏的 IORing 对象本身，以便我们能够应用修复。</p>
<p>我们通过解析位于 `_EPROCESS` 结构中的自身进程句柄表来定位 IORing 对象，遵循与 `ExpLookupHandleTableEntry` 相同的逻辑来检索句柄表条目，然后使用与 `ExGetHandlePointer` 相同的公式将其转换为对象指针。</p>
<p>当我们获得泄露时，一个指向位于用户态的缓冲区条目的引用会被存储在内核中，这将导致内核在拆卸清理（teardown）期间尝试处理它时发生崩溃。</p>
<p>修复方法是释放 `RegBuffers` 注册项。这会导致内核在拆卸清理过程中清理关联的 MDL，从而解决该残留引用。直接释放 MDL 是不够的——MDL 的释放是释放 `RegBuffers` 条目带来的结果，而非独立的操作。然而，释放该注册项又会引发另一个问题，具体如下所述。</p>
<p>由于我们破坏了一个缓冲区条目，内核在关闭对象时将尝试释放我们的用户态指针。</p>
<p>解决该问题的方法很简单，只需增加我们伪造缓冲区条目的引用计数即可。</p>
<p>这可以防止在 IORing 拆卸清理期间内核引用计数归零，从而永远不会针对我们的用户态指针调用相应的释放函数。</p>
<p>为了提升权限，我们窃取 SYSTEM 进程的令牌。利用任意读原语，我们遍历 `EPROCESS` 双向链表以定位 SYSTEM 进程条目并读取其 `Token` 字段。然后，我们使用任意写原语将自身 `EPROCESS` 的 `Token` 字段覆盖为 SYSTEM 令牌值，从而赋予我们进程 SYSTEM 级别的权限。</p>
<p>在这篇文章中，我们展示了针对最新 Windows 11 系统的完整本地提权漏洞利用，利用的是 CVE-2025-13032 —— Avast 内核驱动程序中的一个双重提取（double-fetch）漏洞。我们从 PAGED_POOL 中受控的堆池溢出开始，使用 IORing 对象的 RegBuffers 数组作为破坏目标，将单个被覆盖的指针转化为任意内核读/写原语。从那里，我们通过附加到已损坏 BufferEntry 的 MDL 泄露了 _EPROCESS 指针，修复了池分配标头以避免在销毁时崩溃，并通过窃取 SYSTEM 进程令牌完成了特权提升。</p>
<p>CVE-2025-13032 此后已得到修补。我们建议所有用户确保其 Avast 安装已更新至最新版本。完整的披露时间线已在本研究的第一部分中详细说明。</p>
<p>如果您错过了本研究的第一部分（涵盖了漏洞发现和沙箱逃逸），可以在这里找到：CVE-2025-13032 —— 进入并突破 Avast 杀毒软件沙箱（第一部分）。</p>
<p>您可能还喜欢的更多内容<br />SAFA 在 Avast Antivirus 中发现了四个不同的内核堆溢出漏洞。我们的研究针对 aswSnx 内核驱动程序，首先需要进行有趣的沙箱操纵以触及攻击面。CVE-2025-13032 已分配给这些已修补的漏洞。第一篇博文介绍了这些漏洞以及自定义沙箱配置文件的挑战。后续博文将详细介绍如何利用该原语实现提权至 System 的本地提权。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>CVE-2025-13032 是 Avast 内核驱动程序中发现的一个 double-fetch（双重提取）漏洞。</li>
    <li>研究人员在当时的最新 Windows 11 系统上成功利用了 CVE-2025-13032 漏洞。</li>
    <li>来源叙事重点：详细解析 Avast 杀毒软件内核驱动中的 double-fetch 漏洞（CVE-2025-13032），展示如何结合 Windows 堆风水、IORing 对象破坏与 MDL 泄露实现稳定的内核任意读写及 SYSTEM 权限提升，并说明最新 Windows 防护机制对其有效性产生的影响</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Hacker</span>
</div>

<div class="news-card-footer"><a href="https://www.safateam.com/intelligence-hub/research/technical-articles/cve-2025-13032-entering-and-breaking-the-avast-antivirus-sandbox-part-2" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Hacker News (科技前沿论坛)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-cusing-on-early-stage-ai-ff3979163f0a6a79" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1912" data-content-paragraphs="21" data-published-at="2026-09-25T05:00:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 13:00</span>
</div>

### [光速创投拟为印度新基金募资2.5亿美元，重点押注早期AI领域](https://techcrunch.com/2026/09/24/lightspeed-targets-250m-for-new-india-fund-focusing-on-early-stage-ai/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Lightspeed targets $250M for new India fund, focusing on early-stage AI</div>

<div class="article-body" data-article-body="true"><p>光速创投（Lightspeed）正围绕人工智能（AI）收紧其印度战略，计划为一只新的早期基金筹集2.5亿美元。这家风投机构押注，在该全球最大市场之一中，AI技术将推动下一波初创企业的崛起。</p>
<p>这家硅谷风投机构已经是Anthropic、xAI和Databricks等AI公司的重要投资者。在印度，它投资了该国领先的大语言模型开发商之一Sarvam AI，这家初创公司已被印度政府选中协助开发主权AI模型。</p>
<p>这只名为Lightspeed India Partners V的新基金规模为其2022年募集的5亿美元前序基金的一半。根据TechCrunch查阅的周四致投资者的一封信，该基金已获得了2.5亿美元目标中80%的出资承诺。</p>
<p>4月下旬，光速创投在提交给美国监管机构的文件中披露了这只新基金，但文件中并未指明目标规模。印度媒体此前曾报道称，该公司计划为该工具筹集3亿至3.5亿美元。</p>
<p>信中表示，光速创投计划在两个月内开始从新基金开展投资，并围绕约两年半的投资期进行设计。在此之前，它将继续从现有基金进行最后的投资。</p>
<p>光速创投的一位发言人拒绝置评。</p>
<p>根据投资者信函，从这只新基金开始，光速创投还首次将其印度基金置于与其全球基金相同的募资周期中。这一变化使其近二十年前建立的区域业务与该机构其他部门的步伐更加一致。</p>
<p>在此举之前，其竞争对手Accel也采取了类似的调整。Accel在8月为其最新的5.5亿美元印度基金完成了募资，同时完成募集的还有新的美国和欧洲基金以及一只全球成长型投资工具，作为协同筹集35亿美元资金的一部分。这也是Accel首次同时募集所有四只基金。</p>
<p>信中称，这只2.5亿美元基金的规模旨在与其目前投资的速度以及较短的投资周期相匹配。光速创投向投资者表示，较小的规模使其能够更专注于单个交易而非基金规模本身，并能更快启动下一只基金的募集。</p>
<p>新基金还标志着光速创投在该地区的早期投资战略对AI领域的聚焦更为明确。信中概述的投资逻辑预计，AI在印度创造的价值将超过互联网，该基金将在印度和东南亚全域寻找AI公司。</p>
<p>印度尚未在全球舞台上诞生顶尖的前沿AI模型开发者，其吸引的AI投资也远少于美中两国。尽管如此，投资者越来越看好印度在应用层的机遇，这得益于该国庞大的软件开发者群体，及其数十年来作为软件和技术服务中心的底蕴。</p>
<p>这只2.5亿美元的新印度投资工具仅占光速创投全球平台可用资金的一小部分。该公司在全球管理着超过650亿美元的资产，去年12月通过数只新基金筹集了90亿美元，创下其历史上最大规模的募资纪录。该总额中包含一只9.8亿美元的早期风投基金。</p>
<p>投资者信函显示，光速创投设立的印度和东南亚专项基金仅占其投向该地区资本的一部分。这些基金已部署了约9亿美元，而光速创投的全球基金还额外投资了16亿美元，以支持其区域投资组合中的公司。</p>
<p>决定将其最新的区域基金完全奉献给AI，也标志着光速创投在一个过去广泛进行跨领域投资的市场中，确立了更具针对性的主题重心。其在印度的投资组合横跨即时零售、消费互联网、软件和家庭服务等业务。</p>
<p>光速创投在印度的投资标的包括即时零售初创企业Zepto、音频平台Pocket FM、家政服务初创企业Snabbit、屋顶太阳能初创企业SolarSquare以及一系列企业级软件公司。</p>
<p>信中显示，掌舵光速创投前四只印度基金的原班团队将继续管理这只新基金。</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会获得小额佣金。这不会影响我们的编辑独立性。</p>
<p>Jagmeet为TechCrunch报道来自印度的初创公司、技术政策相关动态以及所有其他以科技为核心的重大进展。他此前曾担任新德里电视台（NDTV）的首席记者。</p>
<p>您可以通过发送邮件至 mail@journalistjagmeet.com 联系Jagmeet或核实其外联信息。</p>
<p>您的下一个重大机遇尽在Disrupt大会。与超过10,000名创始人、投资人、运营者及科技领袖建立联系。探索未来突破，聆听塑造当今科技的声音，在太平洋时间9月25日晚上11:59前购票立省最高200美元。</p>
<p>Meta为其Muse AI智能体打造了一款类似拓麻歌子的可穿戴设备<br />Anthropic称其生物实验室已获得重大发现<br />PitPro首款自动换胎机器人已在加拿大上线<br />Anthropic发布Opus 5.5，以更低价格提供Fable级性能<br />Meta的Muse早期移动端发布增速已超越ChatGPT<br />Tilly Norwood的新闻发布巡礼进展正如大家对AI所预期的那样<br />ChatGPT发明者推出的一款全新AI模型令开发者们倍感振奋</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>Lightspeed 计划为其新的早期基金 Lightspeed India Partners V 募集 2.5 亿美元，重点关注印度和东南亚的早期人工智能公司。</li>
    <li>Lightspeed 在致投资者的信中表示，已为其 2.5 亿美元目标获得了 80% 的资金承诺。</li>
    <li>来源叙事重点：报道聚焦于 Lightspeed（光速创投）在印度市场的战略转型：将新一期早期基金规摸缩减至 2.5 亿美元（前序基金的一半），全面聚焦早期 AI 投资，并将印度基金募资节奏首次与全球基金完全同步，反映出跨国风投在缩短投资周期、聚焦特定高增长技术赛道以及应对宏观创投环境变化上的协同策略。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/lightspeed-targets-250m-for-new-india-fund-focusing-on-early-stage-ai/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-gma-ai-jev-code-reviewer-bdd983cc385555b5" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="608" data-content-paragraphs="7" data-published-at="2026-09-25T04:49:23.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/hackernews.svg" class="source-icon" alt="Hacker News (科技前沿论坛)" width="16" height="16" /> <strong>Hacker News (科技前沿论坛)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 12:49</span>
</div>

### [基于 Jev 的代码审查](https://github.com/egma-ai/jev-code-reviewer)
<div class="original-title-sub"><span class="orig-tag">原文</span> Jev Based Code Review</div>

<div class="article-body" data-article-body="true"><p>当前大多数由智能体（Agent）生成的 PR 最终都被随手直接合并（YOLO merge），因为当智能体突然提交包含 230 个文件的变动时，人类的大脑往往难以完全理解。该项目试图通过将审查中的每项改动归类为 P0、P1、P2 来减轻心智负担。默认情况下仅显示 P0 级别内容，优先级支持自定义配置。代码差异（diff）也采用自然语言进行展示，只需一键切换即可查看原始代码。</p>
<p>它在你的本地计算机上运行，专门用于审查你自己的编程智能体提交的 PR，且不会向 GitHub 发送任何内容。</p>
<p>观看演示录屏 · 打开示例 PR。附带的录屏使用了真实的 Jev 分类以及带有标注且准备就绪的解释文案（出处记录）。</p>
<p>打开 http://127.0.0.1:4731/demo 进行回放（此操作不会调用任何供应商接口），或者加载下方的扩展程序并打开示例 PR 的“Files changed”（已更改文件）页面。</p>
<p>可选：运行 `uv tool install graphifyy` 可添加本地代码图以获取更好的上下文。要让你的编程智能体在创建 PR 后自动运行分析，请安装该智能体技能（agent skill）。</p>
<p>查看架构设计、演示指南和扩展程序详情。</p>
<p>审查运行行为，而不仅是代码差异。Jev 协助优化人类注意力的优先级分配；OpenAI 负责对改动进行解释。本地 CLI + 智能体技能 + GitHub 扩展程序。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Hacker News (科技前沿论坛)】于 2026-09-25 12:49 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Hacker</span>
</div>

<div class="news-card-footer"><a href="https://github.com/egma-ai/jev-code-reviewer" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Hacker News (科技前沿论坛)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-freight-battery-engineer-e1598ad102f02fa4" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="5080" data-content-paragraphs="26" data-published-at="2026-09-25T02:12:57.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 10:12</span>
</div>

### [特斯拉 Semi……再度亮相](https://www.theverge.com/transportation/1000317/tesla-semi-launch-customer-delivery-freight-battery-engineer)
<div class="original-title-sub"><span class="orig-tag">原文</span> Here’s the Tesla Semi… again</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_77.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="特斯拉 Semi……再度亮相" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>还记得特斯拉 Semi 吗？这款历经漫长研发周期的重型卡车最早于 2017 年以概念形式亮相，截至 2026 年 4 月，在其首次公布近十年后，终于实现了批量生产。周四晚间，特斯拉为 Semi 又举办了一场活动，向客户和投资者表明漫长的等待终于结束了。该活动在特斯拉位于内华达超级工厂旁的新 Semi 工厂举行，该公司表示，该工厂每年可生产 50,000 辆卡车，即每周生产 1,000 辆。活动的目的是宣布 Semi 的一批新（及老）客户，包括百事可乐（PepsiCo）、美国食品公司（US Foods）、敦豪（DHL）、WattEV、ABF、Einride、IMC 和 OK Produce。（在活动举行前，一名无人机飞手在特斯拉位于内华达州斯帕克斯的设施上空航拍时，便已泄露了其中的大部分名单。）该卡车的首批交付已于本周开始。</p>
<p>[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_79.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_80.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_81.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_82.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_83.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_84.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_85.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_86.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_87.jpg?quality=90&amp;strip=all]</p>
<p>但现场仍有许多缺失的细节，而这些细节原本有助于解释为何耗时如此之久，以及 Semi 未来将何去何从。特斯拉没有透露订单数量，也未更新 Semi 的价格——据传长续航版本的售价为 290,000 美元。简而言之，就像特斯拉近期的许多活动一样，这次发布会同样缺乏一些关键的更新信息。</p>
<p>这些卡车原本计划于 2019 年投产，但由于包括新冠疫情和全球零部件短缺在内的各种原因被推迟。特斯拉曾在 2022 年向百事公司交付了少数几辆卡车，但那些车辆基本上是在试产线上手工制造的。早在 2017 年，特斯拉公布的 300 英里版本起售价为 150,000 美元，500 英里版本起售价为 180,000 美元。特斯拉直到今天才正式更新过这些价格，但 Electrek 今年早些时候曾报道称，特斯拉对 500 英里续航版本的客户报价为 290,000 美元。</p>
<p>在过去的三年里，特斯拉不断优化 Semi 的设计，减重近 1,000 磅，并在其位于斯帕克斯的超级工厂旁建立了一座专用工厂。该公司于 2026 年 2 月公布了最终的量产设计，确认了两种配置版本：在满载 82,000 磅总组合重量下续航 325 英里的标准续航版，以及续航 500 英里的长续航版。4 月，特斯拉宣布首辆 Semi 在新工厂下线，正式开启了这款推迟已久的卡车的批量生产。</p>
<p>特斯拉首席执行官埃隆·马斯克（Elon Musk）并未出席此次活动——当时他正在华盛顿特区，与特朗普总统一起参加接待中国国家主席习近平的国宴——但在一份预先录制的视频致辞中，他盛赞 Semi 是“开起来最有趣的卡车”。“这真的会是一款革命性的卡车，”马斯克说，“它能够在超长距离上运载最沉重的货物。配合可提供兆瓦级功率的 Megacharger，充电非常便捷。这真的会是一款非凡的卡车。”</p>
<p>[Media: https://twitter.com/tesla_semi/status/2103289460767203424]</p>
<p>电池与工程技术</p>
<p>活动的大部分时间都聚焦于卡车所采用的硬件与工程技术。特斯拉 Semi 卡车工程总监丹·普里斯特利（Dan Priestley）强调，500 英里的续航数据来自满载卡车，而非载重逐渐减少的测试。特斯拉工程副总裁拉尔斯·莫拉维（Lars Moravy）表示，如果 Semi 运载约 60,000 磅的较轻负荷，其续航里程可能达到约 600 英里。续航较短的版本重量更轻，适用于各种不同应用场景，从而让公司拥有多种 Semi 配置，而无需完全依赖长续航版本。</p>
<p>特斯拉声称，由于能耗成本更低且维护零部件少得多，Semi 的运行成本低于柴油车。这并不难让人信服，因为柴油价格已创下历史新高，在美国每加仑飙升至 6.50 美元以上——几乎是一年前的两倍。特斯拉表示，满载卡车目前的能耗约为每英里 1,700 瓦时，而最初设定的目标是每英里 2,000 瓦时。能效的提高使特斯拉能够在保持相同续航里程的同时，使用更小、更轻且更便宜的电池。</p>
<p>Semi 采用了特斯拉自研的 4680 电池，取代了此前测试版本中采购的 2170 电池。特斯拉表示，这一改变加上整车能效的提升，在不牺牲续航的前提下制造出了质量更轻、电量更小的电池。自 Semi 最初亮相以来，该公司还对动力总成和驱动轴进行了大幅重新设计。该卡车采用了新型钢笼转子，取代了早期的碳纤维套筒转子，采用了与 Cybertruck 共用的扁线绕组定子，以及减重约 80 公斤的重新设计的驱动轴。特斯拉还取消了原驱动轴使用的三种独立润滑油，轮毂内无润滑油，电机和变速箱共用一种润滑油，莫拉维表示该润滑油可使用超过 250,000 英里。</p>
<p>液压转向系统已被冗余电动助力转向系统取代，特斯拉表示该系统提供了更高的精度和响应性。同时，卡车转向角的增大使其转弯半径几乎与 Model Y 相当。普里斯特利表示，特斯拉专门设计了该系统，以便在狭窄的城市道路和装卸货月台进行操作。</p>
<p>Semi 还与近期具备上路能力的 Cybercab 共享零部件，采用了与该自动驾驶车辆相同的间接热管理系统，包括泵、压缩机和热交换器。特斯拉表示，该系统省去了通向车辆前端的长制冷剂管路，并可在驾驶室、电池和驱动单元之间转移热量，从而提升整体效率。</p>
<p>[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_89.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_90.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_91.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_92.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_93.jpg?quality=90&amp;strip=all]<br />[Image: https://platform.theverge.com/wp-conten</p>
<p>[图片：https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_94.jpg?quality=90&amp;strip=all] [图片：https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_96.jpg?quality=90&amp;strip=all] [图片：https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Semi_98.jpg?quality=90&amp;strip=all]</p>
<p>充电与正常运行时间</p>
<p>在过去一年中，特斯拉一直在为 Semi 积累客户名单，其中包括百事公司（PepsiCo）、敦豪（DHL）、ABF Freight 等。自动驾驶卡车初创公司 Einride 于 8 月宣布了 500 辆卡车的订单，而 IMC Logistics 本周早些时候表示将购买 50 辆 Semi 用于加利福尼亚州的短途集疏运货运。周一，特斯拉还被“全球最大货主联盟”选定，为其提供 2,500 辆卡车，用于加州的零排放货运业务。</p>
<p>现在的挑战将是如何满足这一需求，迅速将卡车交付给客户。其中一些货运运营商已经等待特斯拉交付其承诺的电动卡车数年之久，任何进一步的延误只会进一步损害该公司的声誉。</p>
<p>“这真将是一款革命性的卡车。”——埃隆·马斯克</p>
<p>充电将是另一个挑战，因为 Semi 需要更高的功率水平才能充满其庞大的 822 千瓦时（kWh）电池组。特斯拉已经开始部署其兆瓦充电桩（Megacharger）系统，每个充电车位的输出功率最高可达 1.2 兆瓦。特斯拉表示，到今年年底，它将拥有超过 30 个 Semi 充电站，包含 200 多个具备兆瓦级充电能力的充电桩，同时还将支持客户自行安装夜间充电设施。</p>
<p>在活动期间，普里斯特利（Priestley）和莫拉维（Moravy）持续查看一辆正在新型兆瓦充电桩上充电的 Semi，现场展示了大约在 30 分钟内将电量从 3% 充至 60%。</p>
<p>特斯拉将 Semi 定位为一款综合车队产品，而不仅仅是一辆电动卡车。该公司表示，其现有车队展示出了超过 98% 的出勤运行时间率，相比之下，全行业重型 8 级（Class 8）柴油卡车的平均出勤率为 90% 至 95%。特斯拉还围绕这款卡车打造专属的 Semi 维修服务、移动上门维修、远程诊断和 OTA 固件空中升级。</p>
<p>高管们展示了多项创新技术，他们称这些技术将带来更好的驾驶体验，其中包括可随司机从一辆卡车同步到另一辆卡车的驾驶员个人偏好档案，以及能够根据载荷变化动态核算续航里程的预估功能。</p>
<p>尽管特斯拉并未透露订单数量或起售价，但马斯克确实表示“等候名单非常长”，并鼓励大家下订单。该公司反复强调 Semi 相比柴油卡车如何能够实现更低的总拥有成本（TCO），包括更低的能源成本、更少的维护支出，以及降低柴油价格波动的风险风险敞口。</p>
<p>“你们知道，石油市场和柴油市场的波动时起时伏，”莫拉维说，“但通常情况下，纵观过去 20 年的历史，电价走势是相当平稳的。如果在你的货运运费中能有一项平稳的成本，难道不是一件好事吗？”</p>
<p>图片来源：特斯拉</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 10:12 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/transportation/1000317/tesla-semi-launch-customer-delivery-freight-battery-engineer" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-he-copilot-plus-pc-brand-2bee89eb63bc3507" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="847" data-content-paragraphs="11" data-published-at="2026-09-25T01:25:53.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 09:25</span>
</div>

### [微软正在废弃“Copilot Plus PC”品牌](https://www.theverge.com/tech/1000495/microsoft-is-killing-off-the-copilot-plus-pc-brand)
<div class="original-title-sub"><span class="orig-tag">原文</span> Microsoft is killing off the ‘Copilot Plus PC’ brand</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2025/03/lcimg_d86deab3_6099_437b_b86a_4f36ef6f8ffb.webp?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="微软正在废弃“Copilot Plus PC”品牌" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的文章将添加到您的每日电子邮件摘要和主页信息流中。</p>
<p>微软的下一个流行词会是什么？</p>
<p>该作者的文章将添加到您的每日电子邮件摘要和主页信息流中。</p>
<p>查看 Sean Hollister 的全部文章</p>
<p>还记得微软曾希望大家都知道“Copilot Plus PC”才是值得购买的电脑吗？因为那些电脑内置了足够强大的 AI 性能来处理各种任务。两年半之后，微软和高通似乎承认这一品牌已经名存实亡了。</p>
<p>据 Windows Central 的扎克·鲍登（Zac Bowden）报道，尽管新款 12 英寸微软 Surface Pro 和 13 英寸 Surface Laptop 在技术上符合 Copilot Plus PC 的系统要求，但微软不再使用这一名称来称呼它们。微软 Surface 公司副总裁布雷特·奥斯特罗姆（Brett Ostrom）对该媒体表示：“这些产品不被称为 Copilot Plus PC。”</p>
<p>高通计算与游戏业务高级副总裁凯达尔·孔达普（Kedar Kondap）似乎也认同该品牌的时代已经落幕，他向鲍登表示，提供同等体验的电脑“可能”不再会使用该品牌标识。</p>
<p>微软及其合作伙伴选择抽身，在我看来并不意外。早在 2024 年，就有明智之士指出，（几乎）每台 PC 很快都会具备该品牌本应代表的基础 AI 硬件水平。Copilot Plus PC 的旗舰功能——微软的“回顾”（Recall）功能反响不佳，微软也因为不断向 Windows 用户推销 AI 升级而饱受批评，更不用说那个如今终于允许重新映射键位的专属 Copilot 键盘按键了。</p>
<p>此外，微软的旗舰硬件如今即将转而搭载英伟达（Nvidia）芯片，据称这将开启 Windows 个人 AI 的新时代。10 月 7 日，当微软举办关于“本地 AI 将如何塑造 PC 下一章节的对话”时，我猜它会推出一个光鲜亮丽的全新品牌来取代“Copilot Plus PC”。</p>
<p>免费提供每日重要新闻摘要。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 09:25 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/tech/1000495/microsoft-is-killing-off-the-copilot-plus-pc-brand" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ey-client-privilege-hats-aa95f7861ac6e2e3" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="885" data-content-paragraphs="12" data-published-at="2026-09-24T23:50:55.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 07:50</span>
</div>

### [Meta员工在抗辩儿童安全披露诉讼期间曾订购印有“律师-委托人特权”字样的帽子](https://www.theverge.com/tech/1000370/meta-instagram-attorney-client-privilege-hats)
<div class="original-title-sub"><span class="orig-tag">原文</span> Meta employees ordered ‘attorney/client privilege’ hats while fighting child safety disclosures</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2025/03/STKS487_ANTITRUST_2__STK043_META_B.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="Meta员工在抗辩儿童安全披露诉讼期间曾订购印有“律师-委托人特权”字样的帽子" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的相关文章将添加到您的每日电子邮件摘要和主页信息流中。</p>
<p>起诉Meta的律师称这些帽子是其“滥用特权文化”的一个缩影。</p>
<p>该作者的相关文章将添加到您的每日电子邮件摘要和主页信息流中。</p>
<p>查看理查德·劳勒（Richard Lawler）的全部文章</p>
<p>在指控Meta损害青少年安全及心理健康的持续诉讼中，Meta的律师辩称，基于“律师-委托人特权（attorney-client privilege）”，某些证据不应向公众公开。本周，起诉该公司的律师表示，该特权标签被滥用得过于宽泛，并指出一份近期解封的文件显示，2024年负责推出Instagram“青少年账户”（Teen Accounts）的团队曾订购过一批棒球帽，帽子上直接印有“a/c priv”（律师-委托人特权缩写）。</p>
<p>起诉Meta的律师辩称，“Nido项目”（青少年账户团队的内部代号）的这些定制周边是“Meta内部特权滥用文化”的一部分，其目的在于阻止其内部开展的关于青少年危害的研究公之于众——在2021年Instagram对青少年的影响等内部数据泄露后，马克·扎克伯格（Mark Zuckerberg）曾就这一问题进行过讨论。</p>
<p>美国联邦地区法官伊冯娜·冈萨雷斯·罗杰斯（Yvonne Gonzalez Rogers）在上个月的一项命令中，已经直斥Meta以特权为由进行的某些涂黑遮盖是“完全不恰当的”。</p>
<p>她列举了一个例子：Meta的律师曾试图将一份关于幻灯片以及是否公开发布某些数据的讨论，包装成对律师法律建议的讨论；法官根据庭审证词认定，他们对公开发布持保留态度更多是一项旨在防止泄密的商业决策。</p>
<p>在证据开示之后，Meta于2025年4月对约6.5万份此前被扣留或涂黑的文件取消了保密定级，但原告方表示，这一举动来得太迟，导致他们无法在宣誓证词采集中加以使用。目前，Meta已申请将重新审查其所做其他特权涂黑的期限延长至今年年底，而原告律师则主张应指定一名独立第三方主导此次审查，相关费用由Meta承担。</p>
<p>查看所有社交媒体内容</p>
<p>为您免费提供最重要的每日新闻摘要。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 07:50 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/tech/1000370/meta-instagram-attorney-client-privilege-hats" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-r-the-wi-fi-earbud-dream-98250f9291e2c6ed" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1139" data-content-paragraphs="6" data-published-at="2026-09-24T23:42:39.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 07:42</span>
</div>

### [高通全新“Elite”音频芯片或终将实现Wi-Fi耳机的梦想](https://www.theverge.com/tech/1000443/qualcomms-new-elite-sound-chip-might-finally-deliver-the-wi-fi-earbud-dream)
<div class="original-title-sub"><span class="orig-tag">原文</span> Qualcomm’s new ‘Elite’ sound chip might finally deliver the Wi-Fi earbud dream</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/vlcsnap-2026-09-24-16h29m15s548.png?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="高通全新“Elite”音频芯片或终将实现Wi-Fi耳机的梦想" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>如果你的无线耳机——或是音频眼镜——能够流畅播放高品质无损音频，而且即使你把手机留在床头充电器上或埋在沙发里也不会断连，会怎么样？高通最新的第二代骁龙畅听至尊版（Snapdragon Sound Elite Gen 2）是其首款直接在芯片内集成“微功耗 Wi-Fi 6E”的产品，使其能够直接连接到家庭 Wi-Fi 网络，并由此连入云端。</p>
<p>[图片：高通以往的白皮书显示，最初实现 Wi-Fi 耳机需要两颗芯片。如今，Wi-Fi 已集成到主芯片中。https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/image-26.png?quality=90&amp;strip=all]</p>
<p>如果这听起来像是一句似曾相识的承诺，或许是因为高通早在 2023 年就曾凭借“S7 Pro 音频平台”及其扩展个人局域网（XPAN）技术做出过类似承诺，称 Wi-Fi 耳机能做到仅凭蓝牙无法实现的事情——即传输蓝牙微薄带宽所无法容纳的 24-bit 96kHz 无损音频。然而，那款旧的 7 系列平台需要一颗单独的 Wi-Fi 芯片才能支持 Wi-Fi 耳机，事实证明，对于那些极小体积设备的制造商而言，这并不是推动技术落地的可行方案！事实上，我们至今只听说过一款此类产品：小米 2025 年发布的 Buds 5 Pro，而且该产品并未在全球发售。</p>
<p>[图片：https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/assets_2026_09_1789673099_Snapdragon-Sound-Elite-Gen-2-Highlight-Image-Embargo-Sep-23-930am-HT-1230pm-PT.jpg?quality=90&amp;strip=all]</p>
<p>如今 Wi-Fi 不再需要额外的独立芯片，这一设想或许真能落地普及。高通表示，Elite 芯片的尺寸缩小了 30%，功耗降低了多达 40%，且 AI 处理能力是上一代芯片的两倍，这些对于设备厂商而言无疑都是极具吸引力的优势。高通透露，目前正与惠普合作研发一款未公开名称的具体产品，并“与 Bose 展开紧密合作”，同时还正与 Cleer 共同“开创新品类智能可穿戴音频设备”（意即：内置摄像头的耳机）。</p>
<p>[图片：带摄像头的耳机。https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/vlcsnap-2026-09-24-16h35m50s149.png?quality=90&amp;strip=all]</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 07:42 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/tech/1000443/qualcomms-new-elite-sound-chip-might-finally-deliver-the-wi-fi-earbud-dream" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-hat-the-fleet-data-shows-32f37a75309c7c75" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1912" data-content-paragraphs="14" data-published-at="2026-09-24T23:24:33.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 07:24</span>
</div>

### [Waymo正在快速扩张：以下是车队数据所揭示的现状](https://techcrunch.com/2026/09/24/waymo-is-scaling-fast-heres-what-the-fleet-data-shows/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Waymo is scaling fast: Here’s what the fleet data shows</div>

<div class="article-body" data-article-body="true"><p>无论从地理覆盖范围还是乘客载运量来看，Waymo的商业化自动驾驶出租车（robotaxi）扩张势头都显得十分迅猛。而且几乎从所有衡量标准来看确实如此——直到你注意到大部分自动驾驶出租车究竟出现在了哪里。</p>
<p>过去两年的数据反映了一家财力雄厚的公司所应有的商业化推广节奏。Waymo脱胎于谷歌，母公司Alphabet目前仍是其控股股东。2024年9月，Waymo仅在三个城市运营——凤凰城、洛杉矶和旧金山。如今，它已在美国15个城市提供自动驾驶出租车服务，其中大部分商业化落地都发生在过去一年中。乘车量同样呈爆炸式增长，Waymo目前平均每周提供50万次付费自动驾驶出租车行程。</p>
<p>但仔细审视其车队便会发现，该公司正将其重心集中在短短两个州。在Waymo大约4000辆自动驾驶出租车中，约80%分布在加利福尼亚州和德克萨斯州，而德克萨斯州正是如今动作最密集的地方：在过去三周内，Waymo在该州的车队规模增长了近一半，这得益于一款中国制造的新型小型货车（MPV/Minivan），尽管关税推高了成本，该公司仍押注这款车将帮助其实现规模化扩张。</p>
<p>其余大约800辆车辆则分散在其他各州的城市中，包括亚利桑那州以及另一个蓬勃发展的新热点佛罗里达州。绝大多数车辆仍是人们熟悉的白色捷豹I-Pace纯电动SUV，但新款小型货车的数量正在增加——这是一款经过改装的极氪（Zeekr）RT，Waymo将其命名为“Ojai”。</p>
<p>Waymo对加利福尼亚州的青睐并不令人意外。该公司的总部位于硅谷，其早期的许多测试和研发工作也都是在此地展开的。此外，当地一部分人群也更乐意在极早期阶段接纳新技术。</p>
<p>Waymo于2025年3月通过与Uber合作在奥斯汀首次推出商业服务，允许乘客通过Uber应用程序呼叫其自动驾驶出租车。自那之后，该公司又陆续将自动驾驶出租车服务拓展到了达拉斯、休斯敦和圣安东尼奥。</p>
<p>在夏季的大部分时间里，Waymo在德克萨斯州的车队规模相对保持平稳，从6月份的约600辆微幅上升至8月底的700多辆。随后到了9月，车队数量激增，这主要得益于大批新型Ojai小型货车的涌入，目前该车型已占Waymo在德克萨斯州车队规模的约三分之一。</p>
<p>预计这一比例还将继续增长。</p>
<p>搭载了Waymo第六代自动驾驶系统的Ojai自动驾驶出租车，旨在帮助Waymo实现大规模普及。其内饰设计能够经受高频重度使用，并配备了升级版的乘客交互界面以及谷歌的Gemini人工智能系统，该AI可作为乘客的车载助手。</p>
<p>然而，抛开这些科技配置不谈，Ojai本质上是一款由极氪制造的小型货车，极氪是中国吉利控股集团（同时旗下拥有沃尔沃）旗下的品牌。Ojai基于极氪的SEA-M浩瀚-M架构打造，这是一个专为自动驾驶出租车和物流货车等用途设计的共享出行车辆平台。基础版极氪车辆在运往美国时未搭载任何中国本土的车联网技术。抵美后，这些车辆会被送往Waymo位于亚利桑那州的工厂，在那里组装配备Waymo自主研发的自动驾驶系统。</p>
<p>Ojai本应有助于降低成本并最终推动Waymo实现盈利。然而目前来看，关税正在吞噬掉任何节省下来的成本。在现行的美国贸易政策下，中国制造的整车面临高昂的进口关税，这推高了Waymo向国内引进每一辆Ojai的成本。</p>
<p>但Waymo似乎愿意承担这笔开销。总部位于纽约的研究机构MoffettNathanson通过详尽的海运物流记录追踪Ojai的进口情况，其在9月份的报告中指出，Waymo有望在今年年底前向美国引进5100辆该型车辆。</p>
<p>那么所有这些Ojai车辆将流向何方？德克萨斯州无疑名列其中。不过，Waymo在佛罗里达州已布局了三个城市，该州以及拉斯维加斯等更新兴的市场很可能也会迎来大批新车进驻。</p>
<p>当您通过我们文章中的链接购买商品时，我们可能会获得少量佣金。这不会影响我们的编辑独立性。<br />交通版主编<br />您的下一次重要人脉机遇就在Disrupt。与10,000多位创始人、投资人、运营者和科技领袖建立联系。探索未来的技术突破，聆听正在塑造今日科技的洞见，太平洋时间9月25日晚上11:59前报名最高可立减200美元。<br />Meta为其Muse AI助手打造了一款类似拓麻歌子的可穿戴设备<br />Anthropic称其生物实验室已取得重大突破<br />PitPro首款换胎机器人已在加拿大正式上线<br />Anthropic发布Opus 5.5：价格更低，性能比肩Fable<br />Meta的Muse早期移动端表现超越同期ChatGPT<br />Tilly Norwood的媒体宣传巡展正如你对AI所预期的那样顺利<br />来自ChatGPT创造者之一的新型AI模型让开发者兴奋不已</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-25 07:24 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/waymo-is-scaling-fast-heres-what-the-fleet-data-shows/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-comms-pr-brad-smith-cela-99ff6e3fec1ed6bf" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1656" data-content-paragraphs="16" data-published-at="2026-09-24T22:08:22.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 06:08</span>
</div>

### [微软任命布拉德·史密斯掌管公关传播事务](https://www.theverge.com/news/1000374/microsoft-comms-pr-brad-smith-cela)
<div class="original-title-sub"><span class="orig-tag">原文</span> Microsoft puts Brad Smith in charge of communications</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/gettyimages-2268973139.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="微软任命布拉德·史密斯掌管公关传播事务" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的文章将被添加到您的每日电子邮件摘要和主页信息流中。<br />微软的公关传播部门正在转入公司法务与企业事务体系。<br />该作者的文章将被添加到您的每日电子邮件摘要和主页信息流中。<br />查看汤姆·沃伦（Tom Warren）的全部文章</p>
<p>微软正将其公关传播团队从市场营销部门剥离，并转入其企业、外部与法律事务（CELA）部门。这一令人意外的变动将由微软副董事长兼总裁布拉德·史密斯（Brad Smith）主管公关传播业务，与此同时，公司正在寻找接替首席传播官弗兰克·肖（Frank Shaw）的人选，后者将于今年晚些时候离职。</p>
<p>微软首席执行官萨提亚·纳德拉（Satya Nadella）在宣布公关传播业务调整的内部备忘录中，对肖“为微软所做的一切”表示感谢。肖在本月早些时候宣布，在为公司公关传播事务服务近三十年后，他将离开微软。</p>
<p>全球公共事务副总裁布伦特·科尔伯恩（Brent Colburn）已被任命为临时公关传播主管，帮助应对纳德拉所称的“日益碎片化且前所未有嘈杂的媒体环境”。纳德拉还表示，他“对有机会帮助我们的工程师、销售人员、合作伙伴以及其他最接近我们产品和客户的人员，在讲述我们的故事方面发挥更大作用感到兴奋。”</p>
<p>正如GeekWire所指出的，这听起来非常像人工智能初创公司的运作方式，在OpenAI和Anthropic等公司，由研究人员主导演示和博客发布。据微软AI首席执行官穆斯塔法·苏莱曼（Mustafa Suleyman）称，微软一直在追赶谷歌、Anthropic和OpenAI，以“成为全球四大顶级实验室之一”。在今年早些时候接受The Verge采访时，苏莱曼表示，他希望微软“构建世界上最优秀的前沿模型”。</p>
<p>布拉德·史密斯正在从首席营销官沼本健（Takeshi Numoto）手中接管公关传播业务，他通常是微软政策和企业传播的公众面孔。史密斯在全球各地奔走，与各国政府、监管机构和微软的客户会面。目前尚不清楚今年晚些时候谁将永久接替肖的职位，但微软正在同时考察内部和外部候选人。</p>
<p>以下是萨提亚·纳德拉的备忘录全文：</p>
<p>公关传播对微软而言从未像现在这样重要。公司在变，我们的行业在变，我们周围的世界也在变。在日益碎片化且前所未有嘈杂的媒体环境中，我们需要继续立足于我们的使命，每天赢得信任，并寻找新途径直接与我们所有的利益相关方建立联系。</p>
<p>我首先要感谢弗兰克为微软所做的一切。在过去的17年多时间里，他为公司和我们的公关传播职能做出了巨大贡献。在公司经历各大重要时刻时，他一直是我们领导团队以及我个人的绝佳智囊。</p>
<p>在弗兰克准备开启人生下一篇章之际，沼本健、布拉德和我一直在讨论公司公关传播职能的演进。我已经邀请布拉德今后领导公关传播部门。很少有领导者能像布拉德那样真实地代表微软的声音。他对我们的业务有着深刻的理解，与我们的利益相关方有着紧密的联系，并具备以清晰、坚定和令人信服的方式传达复杂理念的罕见能力。</p>
<p>在此过渡期内，布伦特·科尔伯恩将继续向布拉德汇报，并将担任我们的临时公关传播主管。公关传播领导团队将向布伦特汇报，弗兰克将继续就过渡事宜为布拉德和布伦特提供咨询建议。</p>
<p>在许多方面，最接近一线工作的人最有机会塑造外界对微软的理解。我们需要为全公司的人员提供工具和支持，以帮助他们做好这项工作。我很兴奋能有机会帮助我们的工程师、销售人员、合作伙伴以及其他最接近我们产品和客户的人员，在统一的战略和原则体系指引下，在讲述我们的故事中发挥更大作用。你们每一个人在实现这一目标中都扮演着关键角色。</p>
<p>我们即将迎来一个激动人心的秋季，接下来将有许多重要的时刻和活动，背后还有出色的营销支持。这是一个真正以全新方式将我们的产品故事、营销和公关传播融为一体的契机。</p>
<p>我们将不断学习、尝试与进化。公关传播存在一种根本上的全新思考方式，而这个团队将是构建这一方式的核心。</p>
<p>感谢大家为微软所做的一切，以及每个人在讲述我们故事中所扮演的角色。</p>
<p>最重要的每日免费新闻摘要。<br />这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 06:08 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/news/1000374/microsoft-comms-pr-brad-smith-cela" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-rous-part-of-pipefitting-18f34bb3baddef91" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1726" data-content-paragraphs="16" data-published-at="2026-09-24T20:45:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 04:45</span>
</div>

### [Nexterity希望将管道装配中最艰难、最危险的环节实现自动化](https://techcrunch.com/2026/09/24/nexterity-wants-to-automate-the-hard-dangerous-part-of-pipefitting/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Nexterity wants to automate the hard, dangerous part of pipefitting</div>

<div class="article-body" data-article-body="true"><p>林赛·埃利奥特（Lindsey Elliott）对螺栓十分痴迷。在去年的螺栓研讨会（第13届年会）上，她说最精彩的部分是与现场众多自称“扭矩狂人”的与会者一起玩“螺栓宾果”游戏。</p>
<p>作为埃克森美孚（ExxonMobil）的前工程师和规划师，埃利奥特多年来一直在思考如何改进输送石油、天然气和石化产品的基础设施。她最终将目光锁定在了螺栓上。具体而言，是连接管道段的螺栓（专业术语称为“螺栓法兰连接”）。松动和拧紧这些螺栓需要耗费繁重的体力，也是导致许多管道工受伤的根源。与许多技工行业一样，这里也面临着劳动力短缺的困境。</p>
<p>“当被要求连续三个月每天工作12小时时，那些工人真的会筋疲力尽，”她告诉TechCrunch。“我曾与美国和加拿大各地的管道工交流过，屡次被告知北美管道装配的生产效率是出了名的低下。”</p>
<p>埃利奥特在其初创公司Nexterity提出的解决方案，是一款可以处理这部分工作的遥控机器人；Nexterity也是入选参加TechCrunch Disrupt的Startup Battlefield 200强企业之一。如果这一创意得到广泛应用，可能会从根本上改变这一特定的蓝领工种，使工人们更加安全、更具生产力。</p>
<p>可以理解为：多一点极客智慧，少一点体力扭矩。</p>
<p>该机器人主要由两个套在管道上的部件组成。该机器人由电池供电，固定后即可在管道上滑动，并能一次快速松开和拧紧四个螺栓。</p>
<p>埃利奥特表示，Nexterity已经开发了几种不同配置的机器人以适配不同的标准管道尺寸，但它们都足够小巧，可以装入派力肯（Pelican）安全箱并由单名工人携带。这使得它们非常容易部署到新现场——这种灵活性对于Nexterity将机器人视为租赁建筑设备开展的商业模式至关重要。</p>
<p>埃利奥特表示，这一特定设计的形成源自她过去几年中的交流——不仅是在螺栓研讨会上，还包括与美国机械工程师学会（ASME）压力容器与管道分会成员的探讨。</p>
<p>“我从那些人，也就是所谓的‘扭矩狂人’那里了解到，”她说，“我们80%的管道直径都在2到8英寸之间，也就是所谓的NPS2到NPS8。因此，当你有如此高的重复度时，这就是一个非常适合自动化的应用场景。”</p>
<p>这是一个相当直截了当的想法，但埃利奥特认为它具有巨大的发展前景。</p>
<p>“我认为这个市场规模之大可能会让很多人感到震惊，”她说。“我的意思是，在日常生活中，我们大多数人不会去想管道基础设施，但即使是自来水、废水、水处理、食品饮料、采矿、核能，以及任何类型的绿色和可持续制造设施——它们都在使用同类型的管道。”</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会获得少量佣金。这不会影响我们的编辑独立性。</p>
<p>交通领域资深记者<br />肖恩·奥凯恩（Sean O&#39;Kane）是一名记者，十年间一直关注交通行业快速发展的商业和技术动态，包括特斯拉以及追赶埃隆·马斯克的众多初创企业。最近，他是彭博新闻社（Bloomberg News）的记者，协助揭露了一些声名狼藉的电动汽车SPAC暴雷事件。此前他曾在The Verge工作，在那里他也报道消费科技，主持过许多短片和长视频，从事产品和编辑摄影，还曾在一架红牛特技飞行锦标赛飞机上差点昏厥。</p>
<p>您可以通过发送电子邮件至 sean.okane@techcrunch.com 或通过Signal加密信息（okane.01）与肖恩联系或核实其外联信息。</p>
<p>您的下一个重大合作尽在Disrupt。与10,000多名创始人、风险投资人、运营者和科技领袖建立联系。探索未来的突破性成果，聆听塑造当今科技的声音，太平洋时间9月25日晚11:59前购票立省高达200美元。</p>
<p>Meta为其Muse AI智能体打造了一款类似拓麻歌子的可穿戴设备<br />Anthropic称其生物实验室已取得重大发现<br />PitPro首款换胎机器人已在加拿大上线<br />Anthropic发布Opus 5.5：价格更低，具备Fable级性能<br />Meta的Muse在早期移动端的普及速度超过了ChatGPT<br />蒂莉·诺伍德（Tilly Norwood）的巡回宣传正如你对AI所预期的那样平淡<br />来自ChatGPT发明者的一种新型AI模型令开发者们兴奋不已</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-25 04:45 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/nexterity-wants-to-automate-the-hard-dangerous-part-of-pipefitting/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-hen-chat-is-the-wrong-ui-3d14844898469c56" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="2447" data-content-paragraphs="1" data-published-at="2026-09-24T20:00:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/github.svg" class="source-icon" alt="GitHub Blog (工程技术博客)" width="16" height="16" /> <strong>GitHub Blog (工程技术博客)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 04:00</span>
</div>

### [当聊天不再是适用的用户界面](https://github.blog/ai-and-ml/github-copilot/when-chat-is-the-wrong-ui/)
<div class="original-title-sub"><span class="orig-tag">原文</span> When chat is the wrong UI</div>

<div class="article-cover"><img src="https://github.blog/wp-content/uploads/2026/09/validation.png?resize=1024%2C389" alt="当聊天不再是适用的用户界面" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>我们置身于这场 AI 实验已有 176 年之久。<br />等等……其实才过了三年？<br />有时我会想起去年发生的事，但感觉却像隔了很久。那真是我亲身经历的，还是我父亲小时候讲给我听的往事？<br />言归正传……我们置身于这场 AI 实验已有三年，而我们与大语言模型（LLM）的主要交互界面依然是聊天窗口。我十分确信最早主张在 HTML 规范中加入 textarea（多行文本输入框）组件的是 @pmarca。而我之所以如此确信，是因为我用 AI 查过。用的还是一个 textarea。<br />但我很想向大家提出一个观点：也许，只是也许，聊天是错误的用户界面（UI）。好吧，至少大多数时候是错的。<br />学者史蒂芬·平克（Steven Pinker）曾这样评价……<br />“AI 的首个大规模落地形态居然带点噱头性质——一个第一人称视角的聊天机器人，这多少有点遗憾。但如果 AI 是面向任务的，它将拥有巨大的前景。”<br />——史蒂芬·平克，学者<br />既然一位学者都这么说了，我又在博文中引用了他，那你就能明白这绝对错不了。<br />聊天之所以成为与 AI 交互的主要方式，是因为它是最先与大众产生共鸣的形态。聊天作为一种通用解决方案确实运转良好，原因很简单：我们根本不知道人们到底打算用 AI 做什么。<br />但作为用户，你自己清楚想用它做什么，而在那个时候，聊天往往就成了错误的用户界面。<br />亲爱的读者，你所需要的，是一种你可以凭空变出来的自定义 UI，以此按照契合你当前任务的方式去与 AI 协作（或者跟它较劲——随你怎么搞）。<br />实现这一点有很多种方式，但在 GitHub Copilot 应用中，这被称为画布（canvas）。<br />画布是一个在 GitHub Copilot 应用内部运行的小型全栈应用，没有浏览器的外框。智能体（Agent）可以与该应用的服务端进行通信，服务端也可以反向通信。因此，你最终得到的是一个既能完成普通电脑程序所有功能、又能与 GitHub Copilot 智能体进行双向通信的交互界面。<br />这听起来可能有点玄乎，而且我还用了“双向”（bi-directional）这个听起来像是直接从 PPT 里搬出来的词，所以我们还是来看看这个概念在实践中如何运用，瞧瞧我们能否用强大的画布来解决实际问题。<br />我们从一个简单的例子开始：利用画布制作一个“四子棋”（Connect 4）游戏，让你可以在 GitHub Copilot 应用内与智能体对战。<br />看我如何在高推理模式下彻底碾压 GPT-5.6 Sol……<br />好吧。但我确实在无推理模式下打赢了 GPT-5.6 Luna，所以……听着……四子棋真是一个很难的游戏！！<br />构建画布就像开口提需求一样简单……<br />“创建一个新画布，使用四子棋游戏来演示用户与画布交互、画布与智能体对话以及智能体控制画布的能力。”<br />GitHub Copilot 应用本身就理解什么是画布，所以我们根本无需多作解释。<br />现在，因为这些画布实际上是全栈应用而不仅仅是网页，它们不仅可以调用第三方 API，还可以在你的本地机器上执行代码。<br />例如，这里有一个针对 Winget 的 UI，它可以浏览软件源上的安装包，还可以管理我的本地安装包，包括安装和卸载。<br />这里完全没有涉及 AI，但这正是关键所在。<br />当聊天作为主要交互界面时，它会促使你什么事都想找智能体来做。这往往纯粹是在浪费 token。让智能体去构建一个未来所有交互完全免费的工具，几乎永远比直接把智能体本身当作工具要好得多。别再叫 GPT-5.6 Sol Max 去“暂存并提交”（stage and commit）了。（我知道你们都干过这事。因为我也干过。别在 token 上羞辱我，我的自尊心很脆弱的。）<br />另一个极佳的例子是，与其在聊天框里让智能体帮你的 SQLite 数据库做这做那，倒不如直接弹出一个画布，自己动手操作。<br />我是说，你甚至可以在这里享受到智能提示（intellisense）。为什么不呢？现在可是 2026 年，AI 就像一个只要你想要就能无所不能的魔法盒子。<br />这不是很爽吗？<br />偶尔写写 SQL 还挺不错的。我说的是偶尔。放轻松点。<br />或者，何必非得用纯 Markdown 来写 Jekyll 博客文章呢，你完全可以把 Windows Live Writer “复活”过来。<br />好吧，这些都是有趣且还算实用的小例子，但当你用自定义 UI 来自动化开发工作流时，它的价值才会变得清晰得多。<br />我无意教大家如何规划生活，但我与智能体协作的流程大致是这样的……<br />这其实相当简单，但这其中的每一步都需要我坐在键盘前进行交互、查看原型、提供指引并在各步骤间跳转推进。<br />但问题在于，在整个过程的大部分时间里，其实并不需要我在场。智能体完全有能力自行调研并生成原型，并在准备好接受评审时通知我。与智能体协作的目标，始终是尽可能让自己脱离人工干预环节（out of the loop）。但这很难做到，因为当你手头只有一个聊天框时，根本不清楚该如何实现这一点。<br />这里有一个完整的示例，展示了如何利用画布来自动化你自己的工作流，并随你心意在不同程度上让自己退出流程闭环。<br />我并不是说你应该直接照搬这个工作流，或者说这是与智能体协作的完美典范。不过话说回来，它说不定还真是。大概率就是如此。让我们问问 AI 吧……<br />说正经的，我确实认为被禁锢在聊天 UI 中可能会在当前对我们所有人产生不利影响。这让弄清如何解决实际问题变得困难，因为当你唯一的交互方式就是一个 textarea 文本框时，该怎么做根本谈不上直观。<br />今天就去试用一下画布吧。有些东西比如 SQLite 画布你可以一气呵成搞定。而那个工作流画布则花了大半天时间才把设计和自动化逻辑理顺。<br />但我相信你会发现，当你学会跳出——等一下——跳出聊天框去思考时，你在 AI 道路上能走得远得多。<br />下载 GitHub Copilot 应用 &gt;<br />文章《当聊天不再是适用的用户界面》最初发布于 The GitHub Blog。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【GitHub Blog (工程技术博客)】于 2026-09-25 04:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#GitHub</span>
</div>

<div class="news-card-footer"><a href="https://github.blog/ai-and-ml/github-copilot/when-chat-is-the-wrong-ui/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【GitHub Blog (工程技术博客)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-mini-ai-live-avatar-face-4b0e8d72e3ff9980" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="591" data-content-paragraphs="1" data-published-at="2026-09-24T19:59:26.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 03:59</span>
</div>

### [搭载Live Avatar的Gemini 3.8 Live为谷歌AI赋予数字面孔](https://www.theverge.com/tech/1000328/google-gemini-ai-live-avatar-face)
<div class="original-title-sub"><span class="orig-tag">原文</span> Gemini 3.8 Live with Live Avatar gives Google’s AI a face</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/gemini-live-avatar-animated.png?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,94.893468926603,100" alt="搭载Live Avatar的Gemini 3.8 Live为谷歌AI赋予数字面孔" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题下的文章将添加到您的每日电子邮件摘要和主页信息流中。<br />谷歌的Live Avatar能够实现唇形同步并展现多样的面部表情。<br />该作者的文章将添加到您的每日电子邮件摘要和主页信息流中。<br />查看 Emma Roth 的全部文章<br />谷歌全新推出的 Gemini 3.8 Live 更新让用户能够在与模型交谈的同时，观看动态 AI 分身做出实时回应。该“Live Avatar”（实时动态分身）在交谈期间能够实现唇形同步并呈现不同的面部表情，但目前仅面向 Gemini 企业版客户开放。<br />正如谷歌所指出的，Live Avatar 可以在其支持的 97 种语言之间无缝切换，“且不会降低视频保真度或出现视觉漂移”。谷歌分享的一段视频展示了其 Live Avatar 用英语和日语进行交谈的过程，其嘴部动画与两种语言的表达均保持同步。此外，它还可以在交谈时于屏幕上调取并展示相关信息。<br />Live Avatar 的推出距离谷歌发布全新的 Gemini 3.8 Live 模型约有一周时间，该公司称该模型“能够近乎实时地处理视觉输入”。尽管谷歌将提供一个预设分身库供客户挑选，但同时也允许各机构自行创建专属分身。谷歌表示，Live Avatar 生成的内容均带有其专有的隐形 SynthID 数字水印，并配备了旨在“尊重身份真实性”的安全防护措施。<br />汇集最重要新闻的免费每日摘要。<br />这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 03:59 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/tech/1000328/google-gemini-ai-live-avatar-face" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-crunch-disrupt-2026-pass-4317c9e267fddff2" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2163" data-content-paragraphs="23" data-published-at="2026-09-24T19:15:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 03:15</span>
</div>

### [带上联合创始人、合伙人或同事，第二张TechCrunch Disrupt 2026门票立享半价](https://techcrunch.com/2026/09/24/bring-your-co-founder-partner-or-colleague-and-get-50-off-a-second-techcrunch-disrupt-2026-pass/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Bring your co-founder, partner, or colleague and get 50% off a second TechCrunch Disrupt 2026 pass</div>

<div class="article-body" data-article-body="true"><p>距离TechCrunch Disrupt 2026开幕只剩最后两周了！为了帮助您人脉网络中的每一个人获取前沿科技洞察、发掘新兴技术，并建立能产生实质影响力的联系，我们针对所有票种推出了第二张门票半价（50%折扣）优惠。</p>
<p>这项“买一送一折”（BOGO）优惠将一直持续到太平洋时间10月13日上午8点Disrupt大会开幕。购买一张Disrupt 2026门票，同类型第二张门票即可享受半价。</p>
<p>这是一个带上同行伙伴——并在参会中获得更大收获的短暂窗口。带上一名同事、联合创始人或合伙人。该优惠将在旧金山Moscone West会展中心于太平洋时间10月13日上午8点开门时截止。之后价格将会上涨，您将需要为相同的参会权益支付更多费用。立即锁定您的第二张门票半价优惠。</p>
<p>单打独斗无法看遍Disrupt的全貌。本次大会旨在让您与联合创始人、合伙人、同事或朋友同行，共同分享现场涌现的新洞察并建立新人脉。</p>
<p>10月13日至15日，在旧金山，300多家参展初创企业与10,000多名创始人、投资人及科技领袖将汇聚一堂，在六大行业舞台、圆桌会议和分组研讨中，开展由250多位科技领袖主导的200多场实战演讲。无与伦比的AI智能配对将推动快速、足以改变企业发展轨迹的深入交流与对接。</p>
<p>当您与同事、同行或合伙人一同出席时，不仅能体验更多内容，更能充分利用所听到的资讯与所结识的人脉。您可以：</p>
<p>这只是一个小小的转变，却能彻底改变参会成效。为您和您的随行同伴挑选合适的门票组合，最高可立省450美元。</p>
<p>Disrupt汇聚了10,000名专注于当下如何创业与拓展规模的初创公司及风投界领袖。Disrupt非常适合这样的您：</p>
<p>其价值在于与面临相同挑战的人建立联系，并向已经走通这条路的前辈学习。请前往Disrupt活动页面查看具体日程规划。</p>
<p>这项“买一享第二张半价”的优惠适用于太平洋时间10月13日上午8点前购买同类型的两张Disrupt门票，让您轻松携团队成员一同参会。</p>
<p>购买一张投资人门票（Investor pass），第二张享半价——最高可省450美元。直接与创始人对接，获取专属精准社交机会，并亲临项目交易的核心现场。携另一位投资人或合伙人同行，有助于您相互比对信号并更快做出决策。</p>
<p>购买一张创始人门票（Founder pass），第二张享半价——立省425美元。结识与您发展阶段匹配的投资人，启发业务思考，并从实际操盘手那里了解行之有效的策略。与联合创始人或团队成员一同参会，有助于分工协作、迅速推进。</p>
<p>购买一张普通参会门票（Attendee pass），第二张享半价——最高可省412美元。该票种专为产品、工程、增长及市场拓展（GTM）团队打造，可让您进入各大舞台、分组研讨会并参与社交，以优化从产品路线图到营收系统的全流程。</p>
<p>购买一张非营利组织门票（Non-profit pass），第二张享半价——立省237美元。与创业者和投资人对接，探索新兴技术如何应用于您的业务领域。带上同行伙伴有助于将现场所学转化为落地成果。</p>
<p>购买一张学生门票（Student pass），第二张享半价——立省175美元。向创始人与投资人学习，尽早开始建立您的人脉网络。与同学好友同行有助于覆盖更多会场内容，建立更稳固的联系。</p>
<p>购买一张展区+门票（Expo+ pass），第二张享半价——立省162美元。深入颠覆性初创公司的幕后。利用展区发掘人才、体验新兴技术演示，并在高成长公司斩获下一个心仪职位，同时与您的同伴共同覆盖更广泛的展位。</p>
<p>这项限时优惠的价值远不止于省下购买第二张Disrupt门票的费用。它关乎深化合作关系，以及最大化利用您在旧金山所度过的时光。这就是单纯参会与将交流转化为交易、招聘和下一步实际行动之间的区别。</p>
<p>本次优惠仅剩最后五天。趁现在仍有机会，购票即享第二张半价。优惠一旦结束，以这一价格结伴同行的机会也将随之消失。</p>
<p>购买一张门票，同类型第二张门票立享半价。决定好带谁同行，并在太平洋时间10月13日上午8点会场大门开启前锁定您的两张门票。立即锁定您的Disrupt门票，将参会价值最大化。</p>
<p>如果您独自一人参会，请在明天（太平洋时间9月25日晚上11:59）门票涨价前完成购票，最高可立省200美元。不要错过任何购票优惠，也不要错过这场年度最受期待的科技盛会之一。</p>
<p>当您通过我们文章中的链接购买时，我们可能会赚取少量佣金。这不会影响我们的编辑独立性。</p>
<p>您的下一个重磅人脉就在Disrupt。与10,000多名创始人、风投人、操盘手和科技领袖建立联系。探索未来的突破性成果，聆听塑造当今科技格局的声音，并在太平洋时间9月25日晚上11:59前购票立省高达200美元。</p>
<p>Meta为其Muse AI智能体打造了一款类似拓麻歌子的可穿戴设备<br />Anthropic称其生物学实验室已取得重大突破<br />PitPro首款自动换胎机器人在加拿大正式上线<br />Anthropic发布Opus 5.5：价格更低，性能比肩Fable<br />Meta旗下Muse的移动端初期发布增速已超越ChatGPT<br />Tilly Norwood的新闻发布会巡演正如人们对AI的预期那样展开<br />ChatGPT发明者推出的一款新型AI模型令开发者振奋不已</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-25 03:15 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/bring-your-co-founder-partner-or-colleague-and-get-50-off-a-second-techcrunch-disrupt-2026-pass/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-mm-powered-smart-glasses-30290d8cdac77d28" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="799" data-content-paragraphs="11" data-published-at="2026-09-24T19:00:42.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 03:00</span>
</div>

### [PrismML将其微型大语言模型引入高通支持的智能眼镜](https://techcrunch.com/2026/09/24/prismml-brings-its-tiny-llms-to-qualcomm-powered-smart-glasses/)
<div class="original-title-sub"><span class="orig-tag">原文</span> PrismML brings its tiny LLMs to Qualcomm-powered smart glasses</div>

<div class="article-body" data-article-body="true"><p>由加州理工学院研究人员创立、加州大学伯克利分校离子·斯托伊卡（Ion Stoica）担任顾问的人工智能实验室 PrismML，已为其微型语言模型开发了一个新版本，专门适配搭载高通骁龙芯片的智能眼镜。</p>
<p>周三，在高通的骁龙峰会（Snapdragon Summit）上，该芯片制造商展示了 PrismML 的 1 比特 Bonsai 大语言模型（LLM），该模型可以在基于第一代骁龙 AR1 平台打造的 AI 智能眼镜上进行本地运行。</p>
<p>正如 TechCrunch 此前报道的那样，PrismML 的成名之处在于大幅缩减大型模型的体积（在该案例中缩小了 4 倍），同时几乎完整保留了它们在标准基准测试中的性能。该智能眼镜版本是一个经过视觉与语言微调的 20 亿参数模型，使用户能够实时询问自己正在注视的内容。</p>
<p>Prism 更宏大的目标是推动在设备端运行的开放权重人工智能，并更充分地利用设备自身现有的计算能力。这家初创公司将此作为一种替代方案，以摆脱对专有 AI 实验室隐私承诺的依赖，以及后者对更多算力永无止境的需求。</p>
<p>针对高通芯片发布模型是迈向这一愿景的一步。不过，目前尚未公布任何搭载 PrismML 的具体智能眼镜产品。</p>
<p>您的下一次重大机遇尽在 Disrupt。与 10,000 多位创始人、风险投资人、运营者和技术领袖建立联系。探索明天的突破，聆听正在塑造当今科技的声音，在太平洋时间 9 月 25 日晚上 11:59 之前购票最高可省 200 美元。</p>
<p>每个工作日和周日，您都可以获取 TechCrunch 的精选报道。</p>
<p>TechCrunch Mobility 是您获取交通领域新闻与洞察的聚集地。</p>
<p>初创公司是 TechCrunch 的核心，敬请每周查阅我们的精选报道。</p>
<p>为行业领军者提供开启新一天所需的资讯。</p>
<p>提交您的电子邮件，即表示您同意我们的《服务条款》和《隐私声明》。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-25 03:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/prismml-brings-its-tiny-llms-to-qualcomm-powered-smart-glasses/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--robotics-for-developers-96dee6a51268a95e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2217" data-content-paragraphs="21" data-published-at="2026-09-24T18:52:38.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 02:52</span>
</div>

### [认识 Feather：这家初创公司正为开发者打造机器人界的“安卓”](https://techcrunch.com/2026/09/24/meet-feather-the-startup-building-the-android-of-robotics-for-developers/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Meet Feather, the startup building the ‘Android of robotics’ for developers</div>

<div class="article-body" data-article-body="true"><p>如果说机器人领域的创始人与投资者能达成某种共识，那就是通用机器人能够无缝适应任何环境的“ChatGPT时刻”尚未到来。关于这项突破是近在咫尺还是尚需十年之久，各方观点不一。</p>
<p>去年成立的人形机器人初创公司 Feather Robotics 正在为这两种时间线研发机器人。特斯拉（Tesla）或 Figure 正在挑战同时构建本体与尚未被广泛部署的基础“大脑”这一崇高使命，与它们不同的是，Feather 致力于为开发者提供软硬件工具包，以便立即应对现实世界中的具体任务。</p>
<p>“你现在买不到特斯拉机器人并在上面进行二次开发，”Feather 联合创始人 Hoa Mai 告诉 TechCrunch，“我们意识到，大多数公司并不是这样取得成功的。像英伟达（Nvidia）或苹果（Apple）这样的硬件玩家，起步时都是先推出一款能用且可落地的产品，然后随着时间推移逐步增加复杂度。”</p>
<p>2025年，在 Mai（上图左）创办的前一家人形机器人初创公司被出售给 1X 之后，他与曾一度直接向埃隆·马斯克（Elon Musk）汇报的特斯拉 Model 3 前工程师 Parsa Bakhtiari（上图右）联手，希望共同打造机器人领域的“安卓”（Android）。</p>
<p>这一愿景吸引了 Gradient Ventures，后者在 Feather 创立之初便给予支持，领投了该公司此前公布的 760 万美元种子前轮融资。</p>
<p>此后，Feather 推出了一套模块化机器人系统，允许开发者针对不同使用场景定制硬件，例如调整手臂长度。该初创公司已经开始向客户销售产品，营收已突破 100 万美元。</p>
<p>尽管 Feather 并未透露其客户信息，但表示其机器人已在餐厅担任厨师并在科研实验室进行清洁工作。在软件方面，该硬件可以运行来自任何领先的机器人 AI 提供商的模型，包括英伟达、Skild 或 Physical Intelligence。</p>
<p>“我们一直在小规模销售这些机器人，如今在经过过去一年的现场实测并解决了几乎所有问题之后，我们正在为一次重大产品发布做准备，”Mai 说道。</p>
<p>Gradient 普通合伙人 Darian Shirazi 认为，Feather 在美国没有直接竞争对手。他将当前的硬件机器人竞争格局划分为三类：像 Sunday 这样研发家庭室内机器人的初创公司；像 Figure 和特斯拉这样瞄准通用机器的重量级巨头；以及 Feather，他认为 Feather 是美国唯一一家研发模块化人形机器人平台的初创公司。</p>
<p>Mai 承认 Feather 借鉴了宇树科技（Unitree）等中国机器人公司的经验。但随着对外国制造的新机型进入美国市场的限制，Feather 如今作为同类产品中的本土选择，拥有了独特的市场定位。</p>
<p>Feather 的另一大优势是价格。该机器人售价为 30,000 美元，大约是宇树 H2 Edu 价格的一半。</p>
<p>Shirazi 认为在这一价格点上，市场规模可能会非常庞大。“你雇佣一名劳工每年需要花费 5 万到 6 万美元，你还得对他们进行培训，必须配备人力资源部门，必须建立所有这些不同的保障机制，”他说道，“而现在你可以购买一台 Feather 机器人来完成这项工作。”</p>
<p>Shirazi 还表示，Feather 的运营效率极高，目前仅花费了其种子前轮融资的一小部分。</p>
<p>当然，这家初创公司的重大押注在于：机器人领域的价值将源自围绕硬件构建的生态系统。</p>
<p>“如果我们审视当下实体人工智能（physical AI）公司的市场规模，它其实非常小，”Mai 说道，“但如果设想五年后可能会有多少家实体 AI 应用公司存在，我们预计将达到数千家。”</p>
<p>Feather 希望成为驱动所有这些公司的底层平台。</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会获得少许佣金。这不会影响我们的编辑独立性。</p>
<p>Marina Temkin 是 TechCrunch 的风险投资与初创企业记者。在加入 TechCrunch 之前，她曾为 PitchBook 和《风险投资杂志》（Venture Capital Journal）撰写风投相关报道。在她职业生涯的早期，Marina 曾担任金融分析师，并获得了特许金融分析师（CFA）资格。</p>
<p>您可以通过发送电子邮件至 marina.temkin@techcrunch.com 或通过 Signal 发送加密信息至 +1 347-683-3909 来联系 Marina 或核实其采访意向。</p>
<p>您的下一个重要人脉就在 Disrupt。与 10,000 多名创始人、风投人、运营者和技术领袖建立联系。探索明天的突破，聆听塑造当下科技格局的声音，并在太平洋时间 9 月 25 日晚上 11:59 之前购票以节省最高 200 美元。</p>
<p>Meta 为其 Muse AI 智能体打造了一款类似电子宠物的可穿戴设备<br />Anthropic 称其生物实验室已取得重大突破<br />PitPro 首款换胎机器人在加拿大上线投入使用<br />Anthropic 发布 Opus 5.5，价格更低且拥有传说级性能表现<br />Meta 的 Muse 增速超越 ChatGPT 早期移动端表现<br />Tilly Norwood 的媒体巡回宣传进展如何？基本符合对 AI 的预期<br />ChatGPT 发明者推出的一种新型 AI 模型令开发者们兴奋不已</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-25 02:52 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/meet-feather-the-startup-building-the-android-of-robotics-for-developers/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-urity-lab-taskflow-agent-4431c738b4b1e8a1" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="5180" data-content-paragraphs="46" data-published-at="2026-09-24T18:26:12.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/github.svg" class="source-icon" alt="GitHub Blog (工程技术博客)" width="16" height="16" /> <strong>GitHub Blog (工程技术博客)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 02:26</span>
</div>

### [要闻：如果你刚接触模糊测试（fuzzing）并希望先学习基础知识，欢迎访问 gh.io/fuzzing101 查阅我们](https://github.blog/security/application-security/ai-powered-fuzzing-with-the-github-security-lab-taskflow-agent/)
<div class="original-title-sub"><span class="orig-tag">原文</span> AI-powered fuzzing with the GitHub Security Lab Taskflow Agent</div>

<div class="article-cover"><img src="https://github.blog/wp-content/uploads/2026/08/Screenshot-2026-09-23-at-3.16.38-PM.png?resize=1024%2C453" alt="要闻：如果你刚接触模糊测试（fuzzing）并希望先学习基础知识，欢迎访问 gh.io/fuzzing101 查阅我们" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>如果你刚接触模糊测试（fuzzing）并希望先学习基础知识，欢迎访问 gh.io/fuzzing101 查阅我们的 Fuzzing 101 课程。</p>
<p>持续模糊测试并不是解决所有问题的灵丹妙药。即便是在 OSS-Fuzz 中加入多年的项目，仍可能潜藏着严重漏洞，其原因几乎总是相同的：需要有人持续盯紧代码覆盖率，为那些未被触及的代码编写新的测试桩（harness），并在末端对产生的崩溃（crash）进行会诊排查。换言之，模糊测试依然离不开人类的参与介入。</p>
<p>因此，我一直在不断思考一个很自然的问题：在这些人类工作中，我们究竟能将多少实际移交给大语言模型（LLM）智能体？</p>
<p>这正是我构建 Fuzzing Taskflow 的初衷——这是一个面向 C/C++ 项目的自主模糊测试流水线。你只需将其指向一个 GitHub 仓库，其余工作便全由它接管：定位合适的目标入口点、分析构建系统、编写测试桩、运行 AFL++、解析覆盖率报告、改进测试桩、排查每次崩溃，并针对每个独立漏洞编写漏洞报告，整个过程完全不需要人工看护。</p>
<p>Fuzzing Taskflow 构建于 GitHub Security Lab Taskflow Agent 之上，后者是我们用于编写由 LLM 驱动的安全自动化任务的框架，因此该流水线被表达为一组由智能体端到端执行的任务流（taskflow）。</p>
<p>在这篇博文中，我将向你介绍它的工作原理以及背后的设计决策。让我们开始吧！</p>
<p>运行它最简单的方法就是访问 https://github.com/GitHubSecurityLab/seclab-taskflows-fuzzing 并启动一个 Codespace。</p>
<p>然后，像这样运行脚本：<br />./scripts/fuzzing/run_fuzzing.sh PROJECT<br />./scripts/fuzzing/run_fuzzing.sh tukaani-project/xz</p>
<p>就这么简单。参数仅为一个 GitHub 的“所有者/仓库”标识字符串。接着，智能体便会自行处理所有的前期准备步骤：<br />- 安装 AFL 等软件<br />- 克隆仓库<br />- 识别代码中最相关的函数<br />- 为这些函数创建模糊测试目标</p>
<p>如果你在投入长时间运行之前只想做一个快速的冒烟测试，可以将其指向某个小型项目：<br />./scripts/fuzzing/run_fuzzing.sh DaveGamble/cJSON</p>
<p>在运行之前需要提醒一句：该任务流会直接在宿主机上运行 afl-fuzz、clang 以及由 LLM 自主选择的任意构建命令，中间没有容器隔离。遭受提示注入攻击的智能体原则上可以执行你当前用户能执行的任何操作。因此，请务必仅在临时一次性环境（例如 Codespace 或可丢弃的虚拟机）中运行它，且不要赋予提权权限。</p>
<p>部分前沿模型对其输出施加了安全护栏。对于模糊测试任务流，我们默认使用 Claude Sonnet 5，因为它毫无差错地通过了我们所有的内部测试。你可以通过修改以下文件来选择其他模型：src/seclab_taskflows_fuzzing/configs/model_config.yaml。</p>
<p>### 一分钟了解架构</p>
<p>在深入探讨有趣的部分之前，了解各个组件如何协同工作很有帮助。系统共分为三层：<br />1. 一个 Shell 驱动脚本（run_fuzzing.sh），用于串联各个流水线阶段。<br />2. 一组任务流 YAML 文件（每个阶段一个），本质上是指导 LLM 智能体在每一步做什么的提示词。<br />3. 一组供智能体调用以实际干活的 MCP 工具：运行 AFL、编译测试桩、保存崩溃、读取覆盖率报告等。</p>
<p>我最看重的设计原则是职责的清晰分离：LLM 智能体负责决策，MCP 工具负责执行。智能体决定对什么进行模糊测试、编写什么测试桩，以及接下来跟进哪部分覆盖盲区。工具层仅暴露如 run_afl_for 或 compile_harness 这类基础原语。智能体从不直接调用 AFL 或 clang，而是利用这些积木块搭建出整个流水线。所有状态都保存在 SQLite 数据库（fuzz_context.db）中，因此各阶段之间从不在内存中直接传递数据，仅通过数据库交互。</p>
<p>一个微小但关键的细节是：每个测试桩都会被编译两次。AFL 基于边的插桩对于引导模糊测试器非常有效，但无法生成人类可读的覆盖率报告。因此，每个测试桩都会生成一个 .afl 二进制文件（使用 afl-clang-lto -fsanitize=address,undefined 构建）和一个 .cov 二进制文件（使用 clang -fprofile-instr-generate -fcoverage-mapping 构建）。.afl 二进制文件用于执行模糊测试；.cov 二进制文件随后重放 AFL 的输入队列，以生成真实的源码行及分支覆盖率。</p>
<p>### 覆盖率反馈循环</p>
<p>这是整条流水线的核心，也是最直接替代我在开头所描述的人工工作流的部分。</p>
<p>如果你曾尝试过手动提升模糊测试覆盖率，就会知道这是一个如下所示的迭代过程：</p>
<p>以前，“检查覆盖率”这一步是由我手动完成的，需要人工阅读 LCOV 报告寻找未覆盖的分支。“提升覆盖率”这一步同样由我完成，需要编写新的测试桩或精心构造新的输入。而 Fuzzing Taskflow 将这两个步骤都交给了智能体。</p>
<p>在每次迭代中，针对每个测试桩，智能体会根据设定的时间预算运行 AFL，将队列输入在 .cov 二进制文件上重放以获取真实的覆盖率报告，随后读取未覆盖分支的列表。基于分析结果，它会采取以下几项行动之一：<br />- 添加专门构造的新种子输入，以触及未覆盖分支<br />- 修改测试桩源码以调用额外的 API<br />- 自动将分支防护条件所比较的魔数常量补充到 AFL 字典中<br />- 如果某处盲区属于罕见的错误处理分支或不值得追究的第三方代码，则直接跳过</p>
<p>每次迭代的时间预算都会翻倍：<br />30秒 → 60秒 → 120秒 → 240秒 → 480秒 → 960秒（每个目标约 32 分钟）</p>
<p>其核心思路是：在早期阶段耗费低廉且简短的轮次（此时有大量容易覆盖的代码可迅速捕获），而在后期阶段投入更长时间的轮次（此时模糊测试器需要更多时间来突破严苛的分支防护）。</p>
<p>正如在我的人工工作流中一样，我需要回答这样一个问题：我们何时停止？在这里，循环采用了高原效应检测（plateau detection）：一旦连续两次迭代的覆盖率增益均低于可配置的阈值（默认为 1% 的绝对行覆盖率），循环便判定已进入边际效益递减阶段，随后进入下一环节。这避免了智能体为了榨取最后零点几百分点的覆盖率而耗费数小时的算力。</p>
<p>### 结构感知模糊测试</p>
<p>AFL 默认的字节级变异算子（位翻转、算术运算、数据块拼接）在处理二进制格式时表现优异，但在处理结构化的文本输入时则十分吃力。经典的解决方案是针对每种格式手写自定义变异器，这极为枯燥繁琐。这一次，我希望流水线能为我代劳，因此它内置了四种互补的机制来生成结构感知的输入内容。</p>
<p>1. 针对特定格式的字典与自定义变异器。对于能够识别输入格式的目标（JSON、XML、正则表达式、PNG、带长度前缀的二进制 TLV），该任务流提供了预构建的 AFL 字典和 LLVMFuzzerCustomMutator C 文件。JSON 变异器执行标记拼接（token splicing）和对称括号复制；XML 变异器了解标记、实体以及“十亿笑声（billion-laughs）”标记；正则表达式变异器则包含真实的 ReDoS 模式。每个变异器都会将其一半的变异操作委托回 AFL 默认的字节变异器，从而在利用引擎随机性的同时，避免对其造成干扰。</p>
<p>2. 源码级字典。对于流水线无法识别的格式，它通过扫描目标自身的 .c/.h 文件来实时生成自定义变异器。它提取字符串字面量和 32 位数值常量（来自 #define、case 和 enum），滤除噪声，并将它们用作拼接标记。其直觉很简单：解析器所检查的最有价值的魔数，通常就写在其自身源码的某个地方。</p>
<p>3. 结合覆盖率驱动富化的动态生成 AFL 字典。在第 1 次迭代之前，相同的源码标记集也会作为一个 AFL 传统字典输出（包含两种字节序的数值常量，以便模糊测试器无论主机字节序如何，都能满足针对 4 字节魔数的 memcmp 校验）。随后，在每一步覆盖率测试后，流水线都会检查未覆盖代码行附近的守卫条件（strncmp、memcmp、case 0xN、== ‘X’），并追加它找到的任何新标记。字典会切实地沿着模糊测试器尚未触及的代码方向扩展。</p>
<p>4. 语料拼接算子。智能变异器还可以从语料库目录中加载文件，并将它们的随机子区域拼接到输入中，这是一种 AFL 原生 havoc 变异模式所不擅长的重组风格算子。</p>
<p>悄悄扼杀模糊测试效率的因素之一就是丢弃已有进度。如果每次运行都从原始种子开始，你就必须一再付出重复发现相同路径的代价。</p>
<p>为了避免这种情况，每个测试桩（harness）都会获得一个稳定的语料库目录，该目录可以在多次迭代以及整个测试任务周期中持续保留：</p>
<p>/corpus/harness_ /</p>
<p>在每次迭代结束时，AFL 的队列都会合并到该目录中，并通过 afl-cmin 运行以控制其体积上限。这样带来的效果是，昨天发现的有价值输入可以延续到今天的运行中，而上周任务中发现的输入也可以带入本周的任务中。如果你停止并重新启动一项任务，你不会丢失任何成果。</p>
<p>分类分流与漏洞报告</p>
<p>发现崩溃（crash）仅仅完成了工作的一半。任何做过根因分析的人都知道，分类分流往往是整个过程中最繁琐的部分。而这正是智能体大显身手的另一个领域。</p>
<p>在模糊测试循环结束后，系统会自动运行三个阶段。首先，每个崩溃都会通过 afl-tmin 进行最小化，在 ASan 下重放以捕获调用栈轨迹，并通过栈顶哈希（对最顶层的规范化帧进行哈希，去除模板、内联命名空间和 LTO 后缀，以便使语义上相同的崩溃合并归类）完成去重。其次，先前已知的崩溃会在当前二进制程序上重放，以检查上游修复是否已解决这些问题。第三，智能体读取测试桩源码和发生崩溃的函数，从公共 API 开始反向遍历调用链，并为每个崩溃撰写一份 markdown 格式的报告。</p>
<p>每份报告都会给出以下判定之一：</p>
<p>区分真正的漏洞（可通过公共 API 触达且可被利用）与单纯的测试桩错误（harness_bug，即错误出在我们自己的测试桩中，而非库本身），正是过去需要我坐下来手工单步跟踪代码的那类判断。每份报告都包含带有“文件:行号”引用的根因分析、可达性论证、可利用性评估、以统一 diff 形式提供的修复建议以及回归测试草案。</p>
<p>需要说明的是：建议补丁被标记为“需要人工复核（review required）”是有原因的。智能体的分析受限于模型对目标代码的理解能力，它确实会犯错。请将这些结论视为为人工分析做好充分准备的起点，而非最终定论。</p>
<p>运行全自动测试任务却看不到它正在做什么会让人感到不安，因此该流水线会将所有内容发布到一个实时 HTML 仪表板上。当你启动任务时，它会在后台自动启动并监听 8765 端口。在 Codespace 中，该端口会自动转发，因此你可以在任何浏览器中打开它，并在仪表板上实时观察测试任务的进展。</p>
<p>该页面展示的内容包括：<br />- 每个测试桩的“运行中”心跳状态<br />- 带有内嵌走势图（sparkline）的覆盖率趋势表<br />- 迭代时间线</p>
<p>我启动这个项目，是出于每位安全研究员都深有体会的局限性：模糊测试切实有效，但在没有人工关注的情况下无法扩展规模，而人工的精力正是瓶颈所在。模糊测试任务流（Fuzzing Taskflow）是我试图突破这一瓶颈的尝试，它将重复性的工作（编写测试桩、解读覆盖率、排查未覆盖区域、分流崩溃）移交给大语言模型智能体，同时在智能体的研判与执行实际工作的工具之间保持清晰的界限。</p>
<p>如果你是 C/C++ 项目的维护者，欢迎尝试使用。如果你的项目此前从未进行过模糊测试，该工具将帮助你快速起步。如果你的项目过去曾进行过模糊测试，该工具也可能通过提高模糊测试覆盖率来帮助发现新的漏洞。</p>
<p>该工具的源代码已开源，如果你遇到任何错误，请提交 issue。我们也非常欢迎社区的贡献！</p>
<p>《基于 GitHub Security Lab Taskflow Agent 的 AI 驱动模糊测试》一文最初发表于 The GitHub Blog。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【GitHub Blog (工程技术博客)】于 2026-09-25 02:26 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#GitHub</span>
</div>

<div class="news-card-footer"><a href="https://github.blog/security/application-security/ai-powered-fuzzing-with-the-github-security-lab-taskflow-agent/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【GitHub Blog (工程技术博客)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-k-oled-monitor-deal-sale-9b5e89853cf3aec4" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="1192" data-content-paragraphs="8" data-published-at="2026-09-24T18:19:23.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 02:19</span>
</div>

### [遗憾的是，这台售价1549美元的RTX 5070游戏整机确实非常划算](https://www.theverge.com/gadgets/1000122/cyberpowerpc-gaming-prebuilt-rtx-5070-core-i7-asrock-oled-monitor-deal-sale)
<div class="original-title-sub"><span class="orig-tag">原文</span> Sadly, this $1,549 RTX 5070-equipped gaming PC is a very good deal</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/CyberPowerPC-Gaming-PC-Intel-Core-i7-14700KF-NVIDIA-GeForce-RTX-5070-roundup.png?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="遗憾的是，这台售价1549美元的RTX 5070游戏整机确实非常划算" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>CyberPowerPC 推出的配备 RTX 5070 的品牌整机。</p>
<p>在电脑硬件价格依然居高不下的当下，购买一台品牌台式整机能为你省下不少钱。沃尔玛正在对一款配置出色的 CyberPowerPC 游戏主机进行促销，售价为 1549 美元，比原价 2139 美元便宜了近 600 美元。该机搭载英特尔酷睿 i7-14700KF 处理器，搭配 32GB 6000MHz DDR5 内存以及拥有 12GB 显存的英伟达 RTX 5070 公版（Founders Edition）显卡。机箱采用的是 CyberPowerPC 自研设计的 MA-O1，具备丰富的散热扩展选项，并配有三个用于调节内部 RGB 灯光色彩的专用旋钮。</p>
<p>CyberPowerPC（酷睿 i7/RTX 5070）<br />沃尔玛售价：1549 美元（原价 2139.99 美元）</p>
<p>尽管乍看之下可能感觉不明显，但对于一台开箱即可畅玩的游戏 PC 来说，这确实具有很高的性价比。目前光是其中的 RTX 5070 单卡售价就可能超过 800 美元（该卡于 2025 年发售，起售价为 549 美元），而 32GB 高频内存的价格也可能在 400 美元或更高。只需支付极少的溢价，你就能拥有组装在配有全景玻璃侧透机箱内的这些部件，内部还包含一块 1TB PCIe 4.0 SSD。整套系统经过出厂测试，并享受一年的人工和配件保修。机器还附带键鼠，到货后即可立刻开玩。</p>
<p>其他值得关注的优惠</p>
<p>如果你需要一台色彩出众、清晰度极佳的游戏显示器来搭配你的全新游戏主机，新蛋网（Newegg）正对华擎（ASRock）PGO27QSA-W 进行降价促销，售价降至 299.33 美元，较其 476 美元的原价有相当可观的折扣。这款 27 英寸显示屏支持 1440p 分辨率、240Hz 刷新率并支持用于可变刷新率的 FreeSync Premium，同时采用 OLED 面板，可呈现深邃纯粹的黑位。</p>
<p>亚马逊上两件装的安克（Anker）Zolo MagSafe 磁吸无线充电器降价至 25.99 美元，平时的售价通常为 39.99 美元。每个充电器均通过 Qi2 认证，支持最高 15W 的充电功率，并附带一条 5 英尺长的连接线，方便在书桌或床头柜上摆放。不过，你需要自备充电插头。</p>
<p>任天堂客户回馈促销活动将持续至太平洋时间 9 月 26 日晚上 8:59，这是选购备用手柄以及其他游戏和配件优惠的好时机。Switch Pro 手柄在亚马逊和百思买（Best Buy）售价仅为 56 美元（平时约 70 美元），而一对 Joy-Con 手柄在百思买仅售 62.99 美元，不过目前仅有柔和紫绿配色的款式有货。这些手柄均兼容初代 Switch 和 Switch 2，不过新主机的用户需要单独的充电器，且这些手柄无法唤醒处于休眠状态的系统。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 02:19 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/gadgets/1000122/cyberpowerpc-gaming-prebuilt-rtx-5070-core-i7-asrock-oled-monitor-deal-sale" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ico-stargate-data-center-8e953b62eee23ddb" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1279" data-content-paragraphs="12" data-published-at="2026-09-24T18:11:44.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 02:11</span>
</div>

### [甲骨文就其新墨西哥州Stargate数据中心发出不可抗力通知](https://techcrunch.com/2026/09/24/oracle-sends-force-majeure-notice-on-its-new-mexico-stargate-data-center/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Oracle sends force majeure notice on its New Mexico Stargate data center</div>

<div class="article-body" data-article-body="true"><p>彭博社周四率先报道，甲骨文（Oracle）已向位于新墨西哥州的“星际之门”（Stargate）数据中心园区“木星项目”（Project Jupiter）的开发商发出了不可抗力通知。</p>
<p>不可抗力条款常见于能源和大宗商品合同中，当发生不可控事件造成阻碍时，可免除一方履行合同义务。据彭博社消息人士透露，甲骨文并非寻求退出作为该园区主要租户的身份。相反，如果该设施未能实现2028年上线的既定目标，该通知将允许该公司推迟付款。</p>
<p>此份通知发出之际，全美范围内对AI数据中心建设的审查日益严格，而开发商也正承担巨额成本，为OpenAI等客户建设算力容量。</p>
<p>甲骨文坚称预计不会出现延期。“木星项目仍在我们的计划进度之内，”甲骨文在给CNBC的一份声明中表示，“我们全力投入新墨西哥州项目，并对未来的推进路径充满信心。”</p>
<p>收到该通知的蓝猫头鹰资本（Blue Owl Capital）旗下子公司在给CNBC的另一份声明中表示，“该通知不会改变对这一多年期项目的财务承诺。”</p>
<p>甲骨文和Blue Owl均未立即回应TechCrunch的置评请求。</p>
<p>尽管如此，该通知是在该项目遭遇一系列挫折之后发出的，其中许多挫折与能源供应有关。该园区设计容量为2.45吉瓦（GW），拟采用Bloom Energy基于燃气的燃料电池供电，这使得可靠的天然气供应对其推进时间表至关重要。</p>
<p>拟为该基地输送天然气的Energy Transfer管道在监管机构多次否决许可后，也已推迟近六个月至2027年2月1日。8月，彭博社报道称，在遭到上述否决后，该管道的路线已被更改。与此同时，为该园区供电的燃料电池系统的另一项空气质量许可证也仍在审批中。该州环境部门面临着在11月23日之前作出决定的截止日期。</p>
<p>木星项目是“星际之门”（Stargate）的旗舰基地之一，该项目是甲骨文、OpenAI和软银（SoftBank）在唐纳德·特朗普总统第二任期初期与其共同宣布的AI基础设施倡议。该园区招致了当地居民和环保团体的反对，并在中期选举前演变成一个政治焦点。据彭博社报道，甲骨文已在该州开展公共宣传活动，力图争取项目批评者的支持。</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会赚取少许佣金。这不会影响我们的编辑独立性。</p>
<p>您的下一个重要人脉就在Disrupt大会。与10,000+名创始人、风险投资人、运营者和科技领袖建立联系。探索明天的技术突破，聆听今日塑造科技行业的声音，在太平洋时间9月25日晚上11:59前最高可立减200美元。</p>
<p>Meta为其Muse AI助手打造了一款类似电子宠物（Tamagotchi）的可穿戴设备<br />Anthropic称其生物学实验室已取得重大发现<br />PitPro首款换胎机器人在加拿大投入使用<br />Anthropic发布Opus 5.5：价格更低，具备Fable级性能<br />Meta的Muse早期移动端推出势头超越ChatGPT<br />蒂莉·诺伍德（Tilly Norwood）的媒体巡游正如你对AI所预期的那样展开<br />来自ChatGPT发明者的一种新型AI模型令开发者兴奋不已</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-25 02:11 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/oracle-sends-force-majeure-notice-on-its-new-mexico-stargate-data-center/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

::::