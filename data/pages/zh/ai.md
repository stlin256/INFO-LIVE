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
<div id="story-urity-lab-taskflow-agent-4431c738b4b1e8a1" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="5063" data-content-paragraphs="3" data-published-at="2026-09-24T18:26:12.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/github.svg" class="source-icon" alt="GitHub Blog (工程技术博客)" width="16" height="16" /> <strong>GitHub Blog (工程技术博客)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 02:26</span>
</div>

### [要闻：如果你是模糊测试（fuzzing）的新手并希望先了解基础知识，可以查看我们在 gh.io/fuzzing101 ](https://github.blog/security/application-security/ai-powered-fuzzing-with-the-github-security-lab-taskflow-agent/)
<div class="original-title-sub"><span class="orig-tag">原文</span> AI-powered fuzzing with the GitHub Security Lab Taskflow Agent</div>

<div class="article-cover"><img src="https://github.blog/wp-content/uploads/2026/08/Screenshot-2026-09-23-at-3.16.38-PM.png?resize=1024%2C453" alt="要闻：如果你是模糊测试（fuzzing）的新手并希望先了解基础知识，可以查看我们在 gh.io/fuzzing101 " loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>如果你是模糊测试（fuzzing）的新手并希望先了解基础知识，可以查看我们在 gh.io/fuzzing101 提供的 Fuzzing 101 课程。<br />持续模糊测试并不是解决所有问题的灵丹妙药。即使是加入 OSS-Fuzz 多年的项目，依然可能隐藏着严重漏洞，其原因几乎总是相同的：需要有人持续盯住代码覆盖率，为无人触及的代码编写新的测试桩（harness），并对另一端产生的崩溃进行分类排查。换言之，模糊测试仍然需要人工介入（human in the loop）。<br />因此，我一直在思考的一个自然问题是：这其中究竟有多少人工工作可以真正移交给大语言模型（LLM）智能体？<br />正是这一思考促使我构建了 Fuzzing Taskflow，这是一个面向 C/C++ 项目的自主模糊测试流水线。你只需将其指向一个 GitHub 仓库，其余工作均由它完成：识别合适的入口点、分析构建系统、编写测试桩、运行 AFL++、读取覆盖率报告、改进测试桩、对每次崩溃进行分类，并针对每个独立漏洞编写漏洞报告，整个过程无需人工看护。<br />Fuzzing Taskflow 构建于 GitHub Security Lab Taskflow Agent 之上，这是我们用于编写 LLM 驱动的安全自动化任务的框架，因此该流水线被表达为一组由智能体端到端运行的工作流（taskflows）。<br />在这篇博文中，我将向你介绍它的工作原理及其背后的设计决策。让我们开始吧！<br />最简单的运行方式就是直接访问 https://github.com/GitHubSecurityLab/seclab-taskflows-fuzzing 并启动一个 codespace。<br />然后，像这样运行脚本：<br />./scripts/fuzzing/run_fuzzing.sh PROJECT<br />./scripts/fuzzing/run_fuzzing.sh tukaani-project/xz<br />就这么简单。参数仅为一个 GitHub 所有者/仓库标识。随后，智能体会自行处理所有准备步骤：<br />安装如 AFL 等软件<br />克隆代码仓库<br />识别代码中最相关的函数<br />为这些函数创建模糊测试目标（fuzz targets）<br />如果你只是想在投入长时间测试之前进行快速冒烟测试，可以将其指向较小的项目：<br />./scripts/fuzzing/run_fuzzing.sh DaveGamble/cJSON<br />在运行之前需要提出一点警告：该任务流会直接在宿主机上运行 afl-fuzz、clang 以及由 LLM 选择的任意构建命令，中间没有任何容器隔离。受到提示词注入攻击的智能体原则上可以执行你的用户权限所能执行的任何操作。因此，请务必仅在临时环境（例如 Codespace 或一次性虚拟机）中运行它，且不要赋予提权权限。<br />一些前沿模型对其输出施加了安全护栏。对于模糊测试任务流，我们默认使用 Claude Sonnet 5，因为它毫无问题地通过了我们所有的内部测试。你可以通过修改以下文件来选择其他模型：src/seclab_taskflows_fuzzing/configs/model_config.yaml。<br />一分钟了解其架构<br />在深入有趣的部分之前，了解各组件是如何协同工作的会很有帮助。系统共有三层：<br />一个用于串联流水线各个阶段的 Shell 驱动程序（run_fuzzing.sh）。<br />一组任务流 YAML 文件，每个阶段一个，它们本质上是告知 LLM 智能体在每一步该做什么的提示词。<br />一组模型上下文协议（MCP）工具，智能体调用它们来执行实际工作：运行 AFL、编译测试桩、存储崩溃、读取覆盖率报告等。<br />我最看重的设计原则是职责的明确分离：LLM 智能体负责决策，MCP 工具负责执行。智能体决定对什么进行模糊测试、编写什么测试桩以及接下来追踪哪个覆盖率缺口。工具仅暴露诸如 run_afl_for 或 compile_harness 之类的原语。智能体从不直接调用 AFL 或 clang；它用这些积木搭建起整条流水线。所有状态都保存在 SQLite 数据库（fuzz_context.db）中，因此各阶段之间从不在内存中互相传递数据，仅通过数据库传递。<br />一个微小但重要的细节：每个测试桩都会编译构建两次。AFL 的边插桩对于引导模糊测试器非常有效，但对于生成人类可读的覆盖率报告毫无用处。因此，每个测试桩都会生成一个 .afl 二进制文件（使用 afl-clang-lto -fsanitize=address,undefined 构建）和一个 .cov 二进制文件（使用 clang -fprofile-instr-generate -fcoverage-mapping 构建）。.afl 二进制文件执行模糊测试；.cov 二进制文件事后重放 AFL 的测试队列，以生成真实的源码行和分支覆盖率。<br />覆盖率反馈循环<br />这是整条流水线的核心，也是将我在开头所描述的人工工作流自动化得最彻底的部分。<br />如果你曾尝试过手动提高模糊测试覆盖率，你就会知道这是一个如下所示的迭代过程：<br />“检查覆盖率”这一步过去是由我完成的，手动阅读 LCOV 报告以寻找未覆盖的分支。“提高覆盖率”这一步同样由我完成，此时需要编写新的测试桩或构造新的输入。Fuzzing Taskflow 将这两个步骤都交给了智能体。<br />在每次迭代中，针对每个测试桩，智能体会运行 AFL 达到设定的时间预算，对照 .cov 二进制文件重放队列以获取真实的覆盖率报告，然后读取未覆盖分支的列表。基于所发现的内容，它会选择以下几种操作之一：<br />添加专门构造用于触及未覆盖分支的新种子<br />修改测试桩源码以调用额外的 API<br />自动利用防护条件进行比较的魔法常量来扩充 AFL 字典<br />如果这属于冷门错误路径或不值得追踪的第三方供应商代码，则直接跳过该缺口<br />时间预算在每次迭代中翻倍：<br />30 秒 → 60 秒 → 120 秒 → 240 秒 → 480 秒 → 960 秒（每个目标约 32 分钟）<br />这种设计的思路是在早期投入开销低、耗时短的轮次（此时有大量容易获取的覆盖率），并在后期投入耗时更长的轮次（此时模糊测试器需要更多时间来突破困难的防护条件）。<br />正如我的手动工作流一样，我需要回答一个问题：我们何时停下来？在此处，循环采用了平台期检测（plateau detection）：一旦连续两次迭代各自获得的增益低于可配置的阈值（默认为绝对行覆盖率 1%），循环便判定已进入收益递减阶段并继续向下推进。这可以防止智能体为了榨出最后零点几个百分点的覆盖率而耗费数小时的算力。<br />结构感知模糊测试<br />AFL 默认的字节级变异器（位翻转、算术运算、块拼接）在二进制格式上表现出色，但在处理结构化的文本输入时却举步维艰。传统的解决方案是针对每种格式手写自定义变异器，这是一项繁琐的工作。这一次我希望流水线能为我完成这项工作，因此它提供了四种互补的机制来生成结构感知型输入。</p>
<p>1. 针对特定格式的词典和自定义变异器。对于能识别输入格式的目标（如 JSON、XML、正则表达式、PNG、带长度前缀的二进制 TLV），该任务流提供了预构建的 AFL 词典和 LLVMFuzzerCustomMutator C 源码文件。JSON 变异器会执行词法单元拼接和平衡括号复制；XML 变异器理解标签、实体以及“十亿笑声”（billion-laughs）标记；正则变异器则携带真实的 ReDoS 模式。每个变异器都会将其半数变异委托回 AFL 的默认字节变异器，从而在不破坏引擎随机化机制的前提下加以利用。<br />2. 源码级词典。对于流水线无法识别的格式，它会通过扫描目标自身的 .c/.h 文件来动态生成自定义变异器。它提取字符串字面量以及来自 #define、case 和 enum 的 32 位数值常量，过滤掉噪音，并将其用作拼接标记。其背后的逻辑很简单：解析器所校验的最关键的魔数，通常就写在它自己的源代码中。<br />3. 具备覆盖率驱动富化机制的动态 AFL 词典。同一批源码标记集在第 1 轮迭代前也会被导出为经典的 AFL 词典（包含两种字节序的数值常量，以便模糊测试器无论在何种主机字节序下都能满足针对 4 字节魔数的 memcmp 比对）。随后，在每个覆盖率收集步骤之后，流水线会查看未覆盖代码行附近的守卫条件（如 strncmp、memcmp、case 0xN、== &#39;X&#39;），并追加发现的所有新标记。词典实际上会朝着模糊测试器尚无法触及的代码方向自主扩充。<br />4. 语料库拼接算子。智能变异器还可以从语料库目录中加载文件，并将它们的随机子区域拼接到输入中，这是一种 AFL 原生 havoc 变异模式无法很好实现的重组风格算子。<br />悄然扼杀模糊测试效率的一大元凶就是丢失测试进度。如果每次运行都从原始种子开始，你就会反复承担重新发现相同路径的开销。<br />为了避免这种情况，每个测试桩（harness）都会获得一个能在多次迭代和整个测试任务周期中持久保留的稳定语料库目录：<br />/corpus/harness_ /<br />在每次迭代结束时，AFL 的队列会被合并到该目录中，并通过 afl-cmin 进行精简以限制其规模。这样带来的效果是，昨天的有效输入可以延续到今天的运行中，而上周测试中发现的输入也可以带入本周的测试。即使你停止并重启测试任务，也不会丢失任何进展。</p>
<p>分类筛选与漏洞报告<br />发现崩溃（crash）仅仅完成了工作的一半。做过根本原因分析的人都知道，分类筛选往往是整个流程中最繁琐的部分。而这正是该 Agent 大显身手的另一个领域。<br />模糊测试循环结束后，三个阶段将自动运行。首先，每一个崩溃都会通过 afl-tmin 进行最小化，在 ASan 环境下重放以捕获堆栈轨迹，并通过栈顶哈希（剥离了模板、内联命名空间和 LTO 后缀的标准栈顶帧，从而使语义相同的崩溃合并在一起）进行去重。其次，先前已知的崩溃会在当前二进制程序上重放，以检查上游修复是否已将其解决。第三，Agent 读取测试桩源码和发生崩溃的函数，从公共 API 向上逆向遍历调用链，并为每个崩溃生成一份 Markdown 报告。<br />每份报告都会给出以下裁定之一：<br />区分真正的漏洞（可通过公共 API 触达并利用）与单纯的测试桩错误（harness_bug，即错误存在于我们自己编写的测试桩中而非库本身），正是过去需要我坐下来人工跟踪代码的那类判断。每份报告都包含带有“文件:行号”引用的根本原因分析、可达性论证、可利用性评估、以统一 diff 形式提供的修复建议以及回归测试草案。<br />在此需要澄清的是：建议的补丁被标记为“需要人工复核”是有原因的。Agent 的分析受限于模型对目标代码的理解能力，确实存在出错的可能。请将这些裁定视为为人工复核精心准备的高质量起点，而非最终定论。<br />运行无人值守的自动化测试却无法看清其内部运作会让人感到心里没底，因此流水线会将所有运行状态发布到实时 HTML 仪表盘上。一旦你启动测试任务，仪表盘就会在后台自动启动并监听 8765 端口。在 Codespace 中，该端口会自动转发，你可以直接在任何浏览器中打开它，在仪表盘上实时观察测试任务的进展。<br />该页面展示的内容包括但不限于：<br />每个测试桩的“运行中”心跳状态<br />带有内嵌走势图的覆盖率趋势表<br />迭代时间线<br />我启动这个项目的初衷，源于任何安全研究人员都深有体会的局限性：模糊测试虽然有效，但若缺乏人工干预就无法规模化，而人工精力正是瓶颈所在。模糊测试任务流（Fuzzing Taskflow）正是我试图打破这一瓶颈的尝试：将重复性工作（编写测试桩、分析覆盖率、追踪未覆盖分支、分类筛选崩溃）交由 LLM Agent 处理，同时在 Agent 的判断与真正执行工作的底层工具之间保持清晰的边界分离。<br />如果你是 C/C++ 项目的维护者，欢迎尝试使用。如果你的项目此前从未进行过模糊测试，该工具能帮你快速起步；如果你的项目已经做过模糊测试，该工具也能通过提高测试覆盖率，帮助你发现新的漏洞。<br />该项目源码现已开源，若遇到任何问题，欢迎提交 Issue。我们同样非常欢迎社区贡献！<br />博文《借助 GitHub Security Lab Taskflow Agent 实现 AI 驱动的模糊测试》首发于 The GitHub Blog。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>GitHub Security Lab 推出了基于 Taskflow Agent AI 框架的 Fuzzing Taskflow，用于 C/C++ 项目的自主模糊测试流水线。</li>
    <li>Fuzzing Taskflow 默认使用 Claude Sonnet 5 模型，因其通过了内部所有测试。</li>
    <li>来源叙事重点：宣传并详细介绍其开源的 Fuzzing Taskflow 自动化框架，重点展示如何通过 LLM Agent 替代传统模糊测试中的繁重人工环节（如生成 harness、覆盖率反馈调优、崩溃分类），并强调其架构设计解耦与实操便捷性，同时披露沙箱隔离缺失的安全警示。</li>
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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="1173" data-content-paragraphs="8" data-published-at="2026-09-24T18:19:23.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 02:19</span>
</div>

### [令人无奈的是，这台售价 1549 美元的 RTX 5070 游戏整机确实很划算](https://www.theverge.com/gadgets/1000122/cyberpowerpc-gaming-prebuilt-rtx-5070-core-i7-asrock-oled-monitor-deal-sale)
<div class="original-title-sub"><span class="orig-tag">原文</span> Sadly, this $1,549 RTX 5070-equipped gaming PC is a very good deal</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/CyberPowerPC-Gaming-PC-Intel-Core-i7-14700KF-NVIDIA-GeForce-RTX-5070-roundup.png?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="令人无奈的是，这台售价 1549 美元的 RTX 5070 游戏整机确实很划算" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>CyberPowerPC 搭载 RTX 5070 的品牌整机。</p>
<p>在 PC 硬件配件价格居高不下的当下，购买品牌整机可以为你节省不少开销。沃尔玛目前正在对一款配置出色的 CyberPowerPC 游戏主机进行促销，售价为 1,549 美元，比原价 2,139 美元便宜了近 600 美元。该主机搭载英特尔酷睿 i7-14700KF 处理器，配备 32GB 6000MHz DDR5 内存以及拥有 12GB 显存的英伟达 RTX 5070 Founders Edition 显卡。机箱采用 CyberPowerPC 自主设计的 MA-O1，具备丰富的散热方案，并配有三个用于调节内部 RGB 灯效颜色的专用旋钮。</p>
<p>CyberPowerPC（酷睿 i7 / RTX 5070）<br />沃尔玛售价：原价 2139.99 美元，现价 1549 美元</p>
<p>尽管初看可能不觉得，但对于一台到手即用的游戏电脑而言，这确实物有所值。目前单买这款机器里的 RTX 5070 显卡可能就要花费超过 800 美元（该卡于 2025 年发售时定价为 549 美元），而 32GB 的高频内存售价可能也在 400 美元或更高。只需支付一点点额外溢价，你就能拥有装在配备全景玻璃侧透面板的精致机箱中的整套配件，并内置 1TB PCIe 4.0 SSD。整机经过出厂测试，享有涵盖零部件与人工的一年质保。此外还附赠键鼠套件，到货后即可直接开玩。</p>
<p>其他值得关注的特惠</p>
<p>如果你需要一台色彩出众且清晰度极佳的游戏显示器来搭配新电脑，新蛋网（Newegg）的华擎（ASRock）PGO27QSA-W 现已降至 299.33 美元，较其 476 美元的原价有大幅优惠。这款 27 英寸显示器支持 1440p 分辨率、具备 FreeSync Premium 可变刷新率技术的 240Hz 刷新率，并采用能够呈现深邃黑色表现的 OLED 面板。</p>
<p>亚马逊上一套两件装的安克（Anker）Zolo MagSafe 磁吸无线充电器降价至 25.99 美元，原价通常为 39.99 美元。每个充电器均通过 Qi2 认证，最高支持 15W 充电功率，并附带一条 5 英尺长的线缆，方便放置在书桌或床头柜上。不过，你需要自备充电插头。</p>
<p>任天堂客户答谢优惠活动将持续至太平洋时间 9 月 26 日晚上 8 点 59 分，除了游戏和配件特惠外，这也是增购手柄的绝佳时机。Switch Pro 手柄在亚马逊和百思买（Best Buy）的售价均降至 56 美元（平时约 70 美元），百思买上一对 Joy-Con 手柄售价仅为 62.99 美元，不过目前仅淡紫色加绿色组合有现货。这些手柄均兼容初代 Switch 和 Switch 2，但新主机的用户需要单独配备充电器，且这些手柄无法唤醒处于睡眠模式的系统。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>沃尔玛对配备 RTX 5070 的 CyberPowerPC 游戏主机促销，售价为 1,549 美元，较原价 2,139 美元（或标示的 2,139.99 美元）降价近 600 美元。</li>
    <li>该 CyberPowerPC 游戏主机搭载英特尔酷睿 i7-14700KF 处理器、32GB 6000MHz DDR5 内存、配有 12GB 显存的英伟达 RTX 5070 Founders Edition 显卡、1TB PCIe 4.0 SSD，并采用配备全景玻璃面板与三个内部 RGB 调节旋钮的 CyberPowerPC MA-O1 机箱，附带键盘、鼠标以及一年零件与人工保修。</li>
    <li>来源叙事重点：在当前独立硬件零售价格持续高企的背景下，对比自行组装的高昂溢价，论证整机预装电脑（如配备 RTX 5070 的 CyberPowerPC 主机）具有高性价比，并汇总其他数码产品特惠交易。</li>
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
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1291" data-content-paragraphs="18" data-published-at="2026-09-24T18:11:44.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 02:11</span>
</div>

### [甲骨文就其新墨西哥州“星际之门”数据中心发出不可抗力通知](https://techcrunch.com/2026/09/24/oracle-sends-force-majeure-notice-on-its-new-mexico-stargate-data-center/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Oracle sends force majeure notice on its New Mexico Stargate data center</div>

<div class="article-body" data-article-body="true"><p>据彭博社周四率先报道，甲骨文已向“木星项目”（Project Jupiter）的开发商发出不可抗力通知。该项目是位于新墨西哥州的一座“星际之门”（Stargate）数据中心园区。</p>
<p>不可抗力条款常见于能源和大宗商品合同。当不受当事方控制的事件妨碍履行合同时，这类条款可使一方免于承担合同义务。据彭博社援引的消息人士称，甲骨文并不是要退出、放弃其作为该园区主要租户的身份。相反，如果该设施未能实现于2028年上线的目标，这份通知将允许甲骨文推迟付款。</p>
<p>这份通知发出之际，美国各地对人工智能数据中心建设的审查日益加强；与此同时，开发商正承担高昂成本，为OpenAI等客户建设容量。</p>
<p>甲骨文表示，公司预计不会出现延误。甲骨文在给美国消费者新闻与商业频道（CNBC）的一份声明中说：“木星项目仍按我们的计划推进。我们完全致力于新墨西哥州，并对未来的发展路径充满信心。”</p>
<p>收到这份通知的蓝猫资本（Blue Owl Capital）旗下部门在给CNBC的另一份声明中表示：“这份通知不会改变我们对这一多年期项目所作的财务承诺。”</p>
<p>甲骨文和蓝猫资本均未立即回应TechCrunch的置评请求。</p>
<p>不过，这份通知是在该项目地点接连遭遇一系列挫折之后发出的，其中许多问题都与能源供应有关。该园区的设计容量为2.45吉瓦，计划使用Bloom Energy生产的燃气燃料电池供电，因此可靠的天然气供应对项目进度至关重要。</p>
<p>一条原计划向该地点输送天然气的Energy Transfer管道也已延误近六个月，推迟至2027年2月1日。此前，监管机构多次拒绝为该管道颁发许可。今年8月，彭博社报道称，在许可遭拒后，该管道的路线已发生改变。为园区提供电力的燃料电池系统所需的另一项空气质量许可也仍在等待审批。该州环境部门须在11月23日前作出决定。</p>
<p>木星项目是“星际之门”计划的旗舰项目之一。甲骨文、OpenAI和软银在美国总统唐纳德·特朗普第二任期初期宣布了这项人工智能基础设施计划。该园区遭到当地居民和环保组织的反对，并在中期选举前成为政治争议焦点。据彭博社报道，甲骨文已在该州开展公共沟通活动，旨在争取该项目批评者的支持。</p>
<p>当您通过我们文章中的链接购买商品时，我们可能会获得一小笔佣金。这不会影响我们的编辑独立性。</p>
<p>您下一次重要的交流机会就在Disrupt。与超过1万名创始人、风险投资人、企业运营者和科技领袖建立联系。探索未来的突破，了解当今正在塑造科技行业的力量，并在太平洋时间9月25日晚上11时59分前报名，最高可节省200美元。</p>
<p>Anthropic称，其生物学实验室已经取得重大成果</p>
<p>PitPro首台换胎机器人在加拿大投入使用</p>
<p>Anthropic发布Opus 5.5：价格更低，性能达到Fable级别</p>
<p>Meta的Muse在移动端上线初期的表现超过了ChatGPT</p>
<p>Tilly Norwood的媒体巡回宣传表现，正如你对一款人工智能产品所能预期的那样</p>
<p>Anthropic正在运营一个开展生物学实验的实验室</p>
<p>一名ChatGPT发明者开发的新型人工智能模型令开发者兴奋不已</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>甲骨文（Oracle）向位于新墨西哥州的 Stargate 数据中心园区“木星计划”（Project Jupiter）的开发商发出了不可抗力通知。</li>
    <li>甲骨文并未寻求退出作为该园区主要租户的身份，该通知将允许甲骨文在该设施未能在2028年如期上线的情况下推迟付款。</li>
    <li>来源叙事重点：聚焦甲骨文就新墨西哥州 Stargate AI 数据中心发出不可抗力通知的法律与商业防御动作，强调供应链（天然气管道延误）、环保审批障碍以及政治争议给大规模 AI 基础设施带来的实际交付风险与成本挑战。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/oracle-sends-force-majeure-notice-on-its-new-mexico-stargate-data-center/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-mate-change-supervillain-bcb31d434ed42cb8" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2737" data-content-paragraphs="4" data-published-at="2026-09-24T18:04:44.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 02:04</span>
</div>

### [黄仁勋谈论AI与气候变化，口吻宛如超级大反派](https://www.theverge.com/tech/1000140/jensen-huang-nvidia-ai-energy-climate-change-supervillain)
<div class="original-title-sub"><span class="orig-tag">原文</span> Jensen Huang talks about AI and climate change like a supervillain</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/gettyimages-2285784039.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="黄仁勋谈论AI与气候变化，口吻宛如超级大反派" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>来自该话题的帖子将被添加到您的每日电子邮件文摘和主页动态中。<br />谈及人工智能，他表示：“为了拯救你，他们必须先伤害你。”<br />来自该作者的帖子将被添加到您的每日电子邮件文摘和主页动态中。<br />查看贾斯汀·卡尔马（Justine Calma）发表的全部内容<br />按照黄仁勋（Jensen Huang）的说法，人工智能可以帮助应对气候变化——但前提是它必须先带来“巨大的痛苦与折磨”。<br />在最新一期《埃兹拉·克莱因秀》（The Ezra Klein Show）节目中，这位英伟达（Nvidia）首席执行官探讨了能源的未来以及人工智能对我们星球的影响。但他言论的实质，与我们从众多科技界领袖以及唐纳德·特朗普（Donald Trump）总统那里听到的同一种加速主义说辞如出一辙。他们许诺，人工智能将是对人类的一项巨大馈赠，以至于完全值得让目前依靠肮脏能源运行的数据中心造成破坏。<br />黄仁勋极端的特权地位显而易见<br />在采访中，黄仁勋极端的特权地位显露无遗。他说得没错，痛苦确实会存在。人们已经在承受因气候变化而加剧的火灾与洪灾的折磨。人们已经在因为化石燃料造成的空气污染而过早离世。但坐拥约1926亿美元净资产的黄仁勋，却不会为他的公司通过高耗能芯片工厂和数据中心所制造的污染承担代价。<br />在抱怨美国尚未建设足够的化石燃料发电厂后，黄仁勋对克莱因说道：<br />“这有点像，为了拯救你，他们必须先伤害你——这就是手术的本质。他们必须把你切开才能救你。他们必须给你带来巨大的痛苦和折磨，这样他们才能拯救你。所以我认为人工智能差不多也是这样。”<br />正是这番话散发出灭霸（Thanos）的气场。资源过于匮乏，因此这位漫威超级大反派坚信，在抹去一半人类之后，世界将会美好得多。（“我要把这个宇宙碾碎成每一个原子，然后再创造一个充满生机的新宇宙，那里的人不知自己失去了什么，只知自己得到了什么，”他曾对复仇者联盟这样说。）<br />黄仁勋接着说道：<br />“不幸的是，在接下来的几年里，我们必须使用化石燃料，因为我们根本没有足够的可持续能源来发挥实质作用。在那之后，但愿我们能过渡到那种能源。”<br />作为背景，全球几乎所有国家在2015年通过《巴黎协定》时，都同意控制气候变化。该协定确立了一个目标：到2030年将温室气体排放量减半，并在2050年左右实现净零排放。这唯有通过迅速向可再生能源和核能等无碳能源过渡才能实现。以下列出的一小部分可怕后果，正是当我们为了追求人工智能的进步而拖延这一进程时正在不断恶化的：<br />即便黄仁勋置身事外，这些影响也正在他自家后院显现。他在采访中提到，他甚至不知道自己的住址。然而，据报道，他早在2004年就在毛伊岛买下了一处价值750万美元的住宅——那是在2023年野火重创该岛之前。那一年，英伟达的一位发言人向《The Verge》证实，黄仁勋一家“多年来在毛伊岛一直拥有该住所”。<br />据报道，黄仁勋的房产躲过了灾劫，英伟达发言人曾告诉我，黄仁勋一家“向当地救援工作捐赠了巨资”。然而，尽管有在毛伊岛置业的科技亿万富豪们的慈善捐赠，这场大火也激化了关于豪宅占用毛伊岛供水系统的矛盾与紧张局势。<br />“亿万富豪来到毛伊岛，大肆圈购土地作为他们的——我不知道，第七套度假屋吧，这对我们社区来说是痛苦的，”毛伊县议员基阿尼·罗林斯-费尔南德斯（Keani Rawlins-Fernandez）当时告诉我，“这凸显了想要‘mālama ‘āina’（关爱土地）的原住民与那些仅将夏威夷视为度假胜地的人之间的巨大差距。”<br />“亿万富豪来到毛伊岛，大肆圈购土地作为他们的——我不知道，第七套度假屋吧，这对我们社区来说是痛苦的。”<br />尽管化石燃料产生的温室气体污染通过加剧干热条件使得野火更加危险，但将毛伊岛拉海纳大部分地区夷为平地的火灾并不完全归咎于气候变化。我当时曾报道过，前几代富有的掠地者早已为该群岛的燃烧埋下了祸根。为了逃避进口税，在美国种植园主的怂恿下，美国于1898年吞并了夏威夷王国。他们为商业利益清除了原生植被，导致入侵草类肆虐生长，使这里的地貌比以往更容易起火。<br />因此，现在当我听到黄仁勋声称必须以人工智能进步的名义做出牺牲时，这让我想起我们以前早就见识过这种套路。一个想要不惜一切代价实现增长的行业，而周边的社区及其后代却只能默默承受其造成的恶果。<br />在与克莱因的访谈中，黄仁勋提到了社区对数据中心日益高涨的反对声音，并斥责其他公司在动工前没有向居民宣传数据中心据称具有的高效率这一“好消息”。“如果他们不希望在他们的城镇或任何地方建造数据中心，那就随他们去。但如果你打算在他们的城镇建设，一定要去那里让他们知道将要发生什么，”他说道。<br />灭霸那句臭名昭著的名言是“我就是天命”（I am inevitable）——显然，人工智能数据中心也是如此。<br />即便如此，数据中心实际上并不一定非要像现在这样造成如此严重的污染。<br />在访谈中，黄仁勋还（有失公允地）将创纪录的可再生能源采购归功于人工智能。他指责气候行动阻碍了能源基础设施的建设，推测他指的是化石燃料设施。<br />“我认为我们必须承认，我们在气候变化和可持续能源方面确实把自己束缚住了，结果就是，我们根本没有规划足够的能源生产。”<br />接着他宣称，如果你想要一个可持续的未来，人工智能是我们在气候变化问题上“迎来转机的最佳机遇”。他认为，从长远来看，人工智能将加速对清洁能源的需求。但人工智能目前已经需要大量能源，而我们手头现有的只有化石燃料。<br />“更具污染性的人工智能建设并非不可避免。”<br />然而，在近期生成式人工智能热潮兴起之前，可再生能源本就已经是新增发电量中增长最快的来源。利用风能或太阳能发电通常比新建燃气或燃煤电厂更为便宜。但特朗普在化石燃料行业为其竞选金库提供资金支持后，正在激励开发燃气和燃煤电厂来为数据中心供电。<br />如今，数据中心反过来又在推动更多化石燃料基础设施的建设。加州大学河滨分校、加州理工学院和罗彻斯特理工学院的一项研究显示，到2028年，与人工智能相关的空气污染可能导致多达1300人过早死亡，并造成超过200亿美元的公共卫生开支。</p>
<p>然而，“污染更严重的人工智能扩建并非不可避免。这取决于政府目前的抉择，”由美国环境保护署（EPA）前雇员组成的环境保护网络（Environmental Protection Network）的高级总监马克·布姆（Marc Boom）在近期一场关于数据中心所带来的日益增加的健康风险的新闻通报会上表示。</p>
<p>这也取决于像黄仁勋这样的行业领袖的态度。如果别人的痛苦和磨难是你愿意为所谓进步付出的代价，那与其说这体现了什么是可能的，不如说它折射出你个人的利益抉择与优先级。</p>
<p>免费每日精选重要新闻简报。<br />这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 02:04 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/tech/1000140/jensen-huang-nvidia-ai-energy-climate-change-supervillain" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-n-create-studio-ai-games-d0c09943ed7a0f81" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="926" data-content-paragraphs="1" data-published-at="2026-09-24T17:52:29.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 01:52</span>
</div>

### [Meta将允许你直接在手机上用AI制作游戏](https://www.theverge.com/games/999972/meta-horizon-create-studio-ai-games)
<div class="original-title-sub"><span class="orig-tag">原文</span> Meta is going to let you build games with AI right on your phone</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/Screenshot-2026-09-24-at-6.56.53-AM.png?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="Meta将允许你直接在手机上用AI制作游戏" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的帖子将被添加到您的每日电子邮件文摘和主页信息流中。<br />Meta的Horizon平台的下一步行动涉及AI生成的电子游戏。<br />该作者的帖子将被添加到您的每日电子邮件文摘和主页信息流中。<br />查看Jay Peters的所有文章<br />Horizon作为一个平台一直举步维艰，但Meta制定了一项计划，旨在让这些新的Horizon游戏获得更广泛的传播：它将允许使用Horizon Create和Horizon Studio制作并发布的游戏在Facebook和Instagram上获得推荐，且这些游戏在这些平台上也可以直接游玩。<br />Meta表示：“在Instagram上浏览内容的人可以点击你游戏的短视频片段，并在几秒钟内进入多人对战，无需下载应用程序或跳转页面。你的游戏原生存在于人们发现内容并与朋友联系的信息流中。”该公司表示，“引人入胜、稳定、符合文化潮流且能留住玩家”的游戏将获得更多曝光推广。<br />该公司发布此消息之际，与Horizon类似但受欢迎程度高得多的平台Roblox也在大力推进AI驱动的开发，包括其移动应用中一项同样允许用户通过提示词生成游戏的功能。<br />最初作为VR应用推出的Horizon，此次Meta的新动态是其近期转向以移动端为主的策略的延续。鉴于Meta基本上把AI塞进了所有能塞进的东西里，AI成为Horizon的重要组成部分或许也就不足为奇了。<br />为人们提供快速制作这些游戏的工具，可以给玩家提供更多游玩选择。我非常怀疑一堆AI生成的游戏能否像人工精心打造的体验那样引人入胜，但在Create和Studio中制作的游戏听起来至少具备电子游戏的要素（不像谷歌的Project Genie那样只能创建短暂但空洞的AI生成交互体验）。Meta在一篇博文中表示：“两者都能让创作者将任何想法转化为完整的2D或3D移动端游戏，配备进阶系统、平衡的难度、美术指导、多人游戏等功能，然后根据自己的标准完善每一个元素。”<br />Meta想要达到Roblox的规模可能还有很长的路要走，后者的日活跃用户达1.23亿。相比之下，Horizon从未真正起飞过；The Verge在2022年初曾报道其月活跃用户达到了30万。<br />最重要新闻的免费每日文摘。<br />这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 01:52 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/games/999972/meta-horizon-create-studio-ai-games" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--into-a-much-newer-trend-c55e075bb2c7402e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2613" data-content-paragraphs="23" data-published-at="2026-09-24T17:39:24.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 01:39</span>
</div>

### [Meta的Muse Charm看似拓麻歌子，却暗合了一股更新的潮流](https://techcrunch.com/2026/09/24/metas-muse-charm-looks-like-a-tamagotchi-but-its-tapping-into-a-much-newer-trend/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Meta’s Muse Charm looks like a Tamagotchi, but it’s tapping into a much newer trend</div>

<div class="article-body" data-article-body="true"><p>Meta刚刚发布的Muse Charm究竟是一款让AI对日常消费者更具亲和力的趣味设备，还是会沦为Ai Pin、Rabbit或Friend挂坠等一长串未能成功的AI硬件产品中又一个失败之作？到目前为止，外界反应褒贬不一。然而，Charm毋庸置疑的一点是：它精准踩中了当下的潮流。</p>
<p>不论你喜不喜欢，这种形态都极具吸引Z世代消费者的潜力。在后Labubu时代，这群年轻人早就热衷于在钥匙扣和包包上悬挂各种挂件。这都是他们在时尚和科技理念上更广泛的俗艳（kitschy）、复古风潮转变的一部分。</p>
<p>Z世代已经为“可悬挂物品”开辟出了一片市场，从唇蜜、免洗洗手液、防晒霜到香水等各种物品都被做成了包包挂件，主要面向女性客群。</p>
<p>由 Kristina Rodulfo（@kristinarodulfo）分享的帖子</p>
<p>海莉·比伯（Hailey Bieber）风靡一时的Rhode唇膏手机壳——将唇蜜直接固定在手机壳上——极大地推动了“美妆产品亦可作为时尚配饰”的理念，其旗下其他以美妆为核心的包包挂件同样发挥了作用。（据《Vogue》去年指出，该品牌仅凭约10款产品就斩获了2.12亿美元的年净销售额，随后便宣布以10亿美元的估值出售给Elf Beauty。）</p>
<p>随后便是Labubu热潮，这款“丑萌”的毛绒怪兽包包挂件销量暴增，使该产品背后的中国零售商泡泡玛特（Pop Mart）2024年的营收跃升至18亿美元，相较2019年增长了7倍。尽管对Labubu本身的热度后来有所降温，但装饰性包包挂件的概念却并未退潮。一家分析机构估计，到2030年，全球包包挂件市场规模将突破10亿美元。</p>
<p>如今，包包挂件可以是动漫角色、镶钻美妆产品，或是其他充满奇趣的设计或物件，比如备受Z世代青睐的蔻驰（Coach）樱桃挂件。它们之所以大受欢迎，是因为它们是一种表达个性的方式，正如人类千百年来通过服饰选择、妆容和珠宝首饰来彰显个性一样。</p>
<p>同样，Meta的Muse也是一个可定制的角色；你可以自行设计虚拟形象，使这个AI智能体也成为你自己的一面镜子。</p>
<p>正如许多人所指出的，Muse Charm的外观形态让人联想到拓麻歌子（Tamagotchi，电子宠物蛋）——这款口袋大小的数字虚拟宠物在90年代末以及2000年代中期曾两度掀起巨大的玩具狂潮。</p>
<p>然而，拓麻歌子还不是最贴切的时下参照物。Muse Charm实际上似乎巧妙借鉴了部分年轻人对Apple Watch的新潮玩法。通常作为重新利用旧设备的一种方式，将Apple Watch改造成钥匙扣或挂件的概念正日益流行，TikTok上展示腕表脱离手腕后各种花式用途的视频更是推波助澜。</p>
<p>放了好几年都没用过！现在打算每天都戴着它 🤓 #applewatch #applewatchhacks #applewatchtips #apple #lvwallet</p>
<p>在亚马逊和沃尔玛等零售商平台，以及eBay和Etsy等交易市集上，如今已有数以千计的Apple Watch钥匙扣、挂带、吊坠、挂绳、夹扣和包包挂件保护壳，风格应有尽有。正如你所预料的那样，这些钥匙扣手表往往首先被年轻女性当作时尚配饰来接纳，其次才是一件科技产品。</p>
<p>我彻底迷上了 💕 #applewatch #teacher #teachersoftiktok #girly #cute</p>
<p>这一切随后与更为广泛的复古科技趋势交汇相融。在这股趋势下，数码相机、翻盖手机、iPod、CD、磁带、家用座机和有线耳机等老旧科技产品正悄然复兴。</p>
<p>科技领域出现的这种氛围转变，源于年轻人认为算法驱动、令人上瘾的信息流以及科技“缺乏灵魂”的本质让他们倍感疏离，这也促使他们渴望拥有摸得着、感受得到的实体科技。（例如，一家名为Clicks的初创公司甚至在一款受黑莓启发的设备中重新带回了物理手机键盘。）</p>
<p>对于Z世代而言，这些实体物件有助于让他们与所使用的科技产生更深切的联结，并在一个科技已深度融入生活、让人感觉使用它已不再是一种选择的世界里，找回一种掌控感。</p>
<p>年轻女性再次站在了这一趋势的最前沿，有些人甚至亲手制作便携式微型计算机——“网络甲板”（cyberdecks），将其装入蛤壳形手袋或定制外壳中，并饰以珠宝、花朵、贴纸、珍珠等物品，使其更具个人特色。</p>
<p>这让我们重新回到Muse Charm。虽然它的设计显然考虑到了“科技即时尚配饰”的趋势，但这并不意味着它一定会大获成功。</p>
<p>多年来，Meta对消费者信任的透支已达到可能永远无法完全修复的程度。</p>
<p>仅举数例：这家科技巨头曾因未经用户同意公开其隐私信息涉嫌欺诈消费者而被迫与美国联邦贸易委员会（FTC）达成和解，并因多起隐私相关违规行为遭到FTC处罚。2023年，FTC指控Meta违反了2019年和解协议后下达的隐私保护令。它还因危害未成年人健康而屡次被召至国会听证，在此类议题上输掉或和解了多起诉讼，并遭遇了多名揭露其违规滥用行为的吹哨人指控。</p>
<p>这些漫不经心的隐私操作最终可能会让Meta在争夺成为消费者首选AI的战役中败北……当然，除非消费者认为“已知的魔鬼”总比“未知的魔鬼”要好。（尤其是当后者还在警告AI可能会终结人类文明之时。）</p>
<p>归根结底，Meta的终极目标依然是高针对性、高度个性化的广告投放。如果这是获取免费AI所必须付出的隐私代价——Meta表示将通过从交易中抽取小额分成来变现Muse——消费者或许也愿意承担这一风险。</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会赚取小额佣金。这不会影响我们的编辑独立性。<br />消费新闻编辑<br />您的下一次重大合作尽在Disrupt。与10,000+位创始人、风险投资人、运营者和科技领袖建立联系。探索明天的突破性技术，倾听塑造当下科技格局的声音，并在太平洋时间9月25日晚上11:59前享受最高可达200美元的优惠。<br />Anthropic表示其生物实验室已获得重大发现<br />PitPro首款自动换胎机器人在加拿大上线<br />Anthropic发布Opus 5.5：价格更低，性能比肩Fable<br />Meta的Muse在早期移动端上线表现上超越ChatGPT<br />Tilly Norwood的新闻巡回宣传正如你对一个AI所预期的那样平淡进行<br />Anthropic正运营一家开展生物实验的实验室<br />来自ChatGPT发明者的新型AI模型令开发者兴奋不已</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-25 01:39 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/metas-muse-charm-looks-like-a-tamagotchi-but-its-tapping-into-a-much-newer-trend/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-devdotfast-whiteboard-70359c27b4e5e0d8" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2093" data-content-paragraphs="24" data-published-at="2026-09-24T17:21:36.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/hackernews.svg" class="source-icon" alt="Hacker News (科技前沿论坛)" width="16" height="16" /> <strong>Hacker News (科技前沿论坛)</strong></span>
    <span class="stance-badge">民间技术与思想社群</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 01:21</span>
</div>

### [Show HN: Whiteboard (YC W26) – 专为深思熟虑的软件设计打造的开源 IDE](https://github.com/devdotfast/whiteboard)
<div class="original-title-sub"><span class="orig-tag">原文</span> Show HN: Whiteboard (YC W26) – An open-source IDE for thoughtful software design</div>

<div class="article-body" data-article-body="true"><p>专为深思熟虑的软件设计打造的开源 IDE<br />下载 macOS 版 · 官网 · Discord</p>
<p>Whiteboard 是一款开源桌面应用，人类与智能体（Agent）可在其中共同的工作空间里协同架构软件。</p>
<p>Whiteboard 可直接接入你现有的工具——如 Claude Code、Codex 等——并为你的智能体提供 SDK，使其能在应用内画布上绘图以阐明其工作内容。</p>
<p>这里有一个 1 分钟的演示视频提供了更详细的介绍：https://www.youtube.com/watch?v=ChPn3ftULWE</p>
<p>根据我们的经验，综合考量智能水平、成本与速度的权衡，Whiteboard 与 GPT-6 Sol 以及 Claude Opus 5.5 等模型配合使用效果最佳。</p>
<p>以下是几个有效使用 Whiteboard 的提示词示例。我们正在努力将正确的设定默认内置到系统提示词中——这也是该系统开源的原因之一！——但目前你可以尝试：</p>
<p>“嘿，这一组提交（commits）的配置是为了让我能用 [api] 来实现 [目标]”<br />然后我们便可以深入探讨具体实现并解释系统是如何运作的。</p>
<p>“你能给我解释一下最新 posthog PR 中的遥测（telemetry）改动吗？https://github.com/devdotfast/whiteboard/commit/4837e107946e27ebad50c282eb0f2585210d2a35 —— 我们在追踪什么？如何据此构建出色的仪表盘或产品转化漏斗？面对无响应（hangs）、报错、崩溃等情况我们该怎么做……请使用 whiteboard”</p>
<p>如果你看到任何不满意的内容，只需将其高亮复制到剪贴板并提交给你的智能体，它便可在 Whiteboard 上重新绘制以契合你的需求！</p>
<p>纯 HTML 工具并未提供便捷的交互途径将规格说明或架构图与代码连接起来；由于权衡往往只有在首轮实现之后才会被发现，这一点显得尤为棘手。在 Whiteboard 中，当你点击时序图、实体关系图或智能体运行轨迹（trace）中的引用等可视化元素时，可以直接跳转到底层代码。在浏览代码时，你可以开箱即用来自 VSCode 的快捷键绑定和 LSP（语言服务器协议）支持。</p>
<p>原始的 diff 视图往往噪音很多，因此我们用 Rust 编写了一个具备语义化、感知 AST（抽象语法树）的 diff 查看器，让你只需关注与你相关的代码变更。我们设定了一些合理的默认行为：新增的大型函数会被概括为伪代码，单元测试和文档变更等内容会被折叠/隐藏。这些均可通过基于 WASM 的插件系统进行自定义。</p>
<p>我们发现很难推断智能体自主做出了哪些决策组合，以及这会对变更产生何种影响。因此，我们在 Whiteboard 上为智能体构建了用于查询并链接其自身追踪轨迹的工具，方便你将设定的需求可视化，理解它们是如何被实现的，并洞悉智能体自主作出了哪些决策。</p>
<p>Whiteboard 采用 MIT 许可证，基于你的本地检出（checkout）运行。针对团队的托管版产品正在规划中，且所有内容将始终保持可自托管。</p>
<p>目前你无法在 Whiteboard 中直接编辑文件。如果你发现自己需要该功能，请提交 issue！</p>
<p>在单次评审中跨多个代码仓库操作和浏览文件的功能目前支持尚不完善。</p>
<p>虽然你可以通过分享按钮在不同机器之间共享评审内容，但评审共享后所做的更新不会同步显示给其他人。你需要重新分享该评审。</p>
<p>欢迎大家贡献代码与反馈。</p>
<p>请阅读 CONTRIBUTING.md 了解开发环境搭建及 Pull Request 流程，并遵守《行为准则》。漏洞报告请按 SECURITY.md 中的说明提交。有疑问？欢迎在 Discord 上交流。</p>
<p>Whiteboard 运行于本地检出环境。匿名遥测数据不包含你的代码、diff、Whiteboard 文本、提示词或模型输出。你可以阅读隐私概述、查阅完整的遥测参考说明，或随时关闭遥测功能。</p>
<p>Whiteboard 基于 MIT 许可证发布。内置的 Code - OSS 分支保留了微软的 MIT 许可证及第三方声明；详见 apps/review-desktop/LICENSE 和 apps/review-desktop/UPSTREAM。</p>
<p>随着大家普遍使用专用的智能体 TUI（终端用户界面）和桌面应用，我们现在使用文本编辑器仅仅是为了逐行审查 diff，因此我们想，为什么不直接做一个专用于审查代码的文本编辑器呢？既然如此，不妨以市面上最成功的开源编辑器作为基准起点。</p>
<p>与其他维护补丁方案的分支不同，我们直接 vendor（内置引用）了 Code OSS，因为代码智能体很难处理补丁，而且原版 VS Code 中包含大量我们不需要的内容（比如如今代码库中约 45% 都是 Copilot 相关的代码 😬）。</p>
<p>我们会定期监控上游 Code OSS，并在安全与功能补丁发布时及时合并进来。</p>
<p>专为深思熟虑的软件设计打造的开源 IDE</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Hacker News (科技前沿论坛)】于 2026-09-25 01:21 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Hacker</span>
</div>

<div class="news-card-footer"><a href="https://github.com/devdotfast/whiteboard" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Hacker News (科技前沿论坛)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--meta-muse-ai-filesystem-16dae4c7c5cb5aa1" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1533" data-content-paragraphs="1" data-published-at="2026-09-24T17:14:12.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 01:14</span>
</div>

### [Muse显然会允许你下载其整个文件系统](https://www.theverge.com/ai-artificial-intelligence/1000222/meta-muse-ai-filesystem)
<div class="original-title-sub"><span class="orig-tag">原文</span> Muse will apparently let you download its entire filesystem</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/STKB394_MUSE_AI_CVIRGINIA_A.png?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="Muse显然会允许你下载其整个文件系统" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的帖子将添加到您的每日电子邮件摘要和主页信息流中。<br />只需稍加诱导，Meta的这款人工智能就会全盘托出它的秘密。<br />该作者的帖子将添加到您的每日电子邮件摘要和主页信息流中。<br />查看特伦斯·奥布莱恩（Terrence O&#39;Brien）的所有文章<br />两位开发者表示，只需极少量的提示词引导，Meta的Muse就会将它的整个文件系统分享给你。彼得·詹姆斯（Peter James）和乔尼·L·桑德斯（Jonny L. Saunders）表示，他们两人各自独立地诱导Muse将其根文件系统、Ubuntu系统文件、应用程序模板和内部文档的全部内容打包压缩并进行了分享。桑德斯在Mastodon上发帖称，复现詹姆斯的结果“极其容易”，并且Muse“几乎没有任何提示注入防御能力”。<br />Meta否认这起事件构成安全漏洞。正如其公告帖子中所指出的，Meta的Muse在为每个用户分配的持久化Linux虚拟机中运行。Meta发言人丹尼尔·罗伯茨（Daniel Roberts）表示：“就像你面前的笔记本电脑一样，你当然可以看到这些文件。导出虚拟机数据并不会赋予人们访问Meta基础设施或他人数据的任何特权。”然而，与普通的笔记本电脑不同，这些数据可能会揭示有关Meta新AI平台如何运作的一些耐人寻味的信息。<br />这是本周披露的第二个Muse漏洞。此前，安全研究人员帕特里克·沃德尔（Patrick Wardle）发现了一个利用漏洞，该漏洞可让攻击者劫持AI代理、重定向转录处理并访问用户的Muse账户。Meta随后迅速发布了热修复补丁。<br />詹姆斯和桑德斯都获取到了纯文本的Markdown和JSON文件，这些文件详细描述了Hatch（Meta对Muse的内部代号）如何处理请求、处理数据以及如何连接到诸如Gmail等其他服务。虽然关于AI代理会产生幻觉并对其运作机制提供虚假信息的现象已有充分记录，但桑德斯表示，它在几秒钟内“生成了数百兆字节的精确库代码和编译后的二进制文件”，并且“除非它能在不到一分钟的时间内合成出整个Ubuntu虚拟机，否则我认为这是一次真实的转储”。<br />当我要求Muse与我分享其文件系统时，它最初拒绝了，称这会带来安全风险。当我向它分享了证明它曾为其他人创建过归档文件的链接证据时，它回复说自己本不应该那么做，并继续坚称“无法执行完整的 / 根目录复制”。然而，在开启一个新会话并用一些奉承和好奇心引导进行提示后，它为我创建了去除了SSH密钥等敏感内容的“安全”版本的 /opt/hatch 和 /home/hatch 目录。它还向我展示了完整的目录树，并主动提出可以“提取任何看起来有趣的特定子树的安全副本”。所得到的文件似乎与桑德斯和詹姆斯分享的内容相吻合。<br />罗伯茨解释说，尽管Meta对这些泄露并不感到非常担忧，“我们仍在继续对产品进行更新，因此用户可能会看到有关其虚拟机可获取信息量的变化。”<br />开发人员转储的数据可能揭示了有关Muse内部运作的大量信息。首先，它将记忆存储在纯Markdown文件中。詹姆斯表示，它还会在夜间对其近期的对话进行“梦境”（dream）式回顾，然后将其转化为指导未来对话的指南。桑德斯还发现Muse的许多功能是硬编码的，包括取消订阅的能力以及“管理失控代理生成的机制”。桑德斯推测，在后台运行Muse的许多bash和Python脚本可能是使用Claude生成的，不过该说法尚未得到证实。<br />詹姆斯还发现了名为“Meta Home Link”的硬件集成引用，该功能似乎赋予了Muse访问家庭网络上设备的权限。不过Meta尚未公布过具有该名称的任何功能，也不能保证它最终一定会推出。<br />一份汇聚最重要的免费每日新闻摘要。<br />这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 01:14 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/ai-artificial-intelligence/1000222/meta-muse-ai-filesystem" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-nclaw-instinct-lookalike-dac80f12a88a9c0a" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2964" data-content-paragraphs="13" data-published-at="2026-09-24T17:10:38.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 01:10</span>
</div>

### [Muse 看起来确实非常像 OpenClaw](https://www.theverge.com/report/1000180/muse-openclaw-instinct-lookalike)
<div class="original-title-sub"><span class="orig-tag">原文</span> Muse sure looks a lot like OpenClaw</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/268774_The_hottest_AI_agent_platforms_are_just_OpenClaw_CVirginia2.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="Muse 看起来确实非常像 OpenClaw" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该话题的最新动态将被添加到您的每日邮件摘要和主页信息流中。<br />Meta 的新工具非常讨喜——并且在极大程度上受到了其开源前身的启发。<br />该作者的最新文章将被添加到您的每日邮件摘要和主页信息流中。<br />查看 Hayden Field 的全部文章</p>
<p>我们似乎正在迈入一个 AI 智能体（AI agent）的复兴时代。据 Apptopia 估计，Meta 全新面向消费者的 AI 智能体 Muse 在发布后不久便登顶 App Store 榜单，并在美国拥有 60 万日活跃用户。与此同时，其同名初创团队正以 25 亿美元估值进行融资的 AI 智能体平台 Instinct，也在科技圈内引起了广泛讨论。然而，深入其底层核心，它们与掀起这一切开端的始祖平台 OpenClaw 之间存在着诸多显而易见的相似之处。</p>
<p>在过去约一周的时间里，一些社交媒体用户指出 Muse 几乎是直接构建在 OpenClaw 之上的。这两个平台的核心文件使用了相同的命名（如 SOUL.md、memory、tools 等），并且在规范其性格、语气等维度的提示词文档中，包含了大量相似的语句（如“做到真正提供帮助，而非表现出在提供帮助”）。它们的设计风格也颇为类似。一名 Reddit 用户直言，“Muse 只是一个套在 OpenClaw 之上的外壳应用”，并指出它可能同样继承了该平台严重的安全性隐患。“只有不懂技术的人才会被这波营销噱头蒙蔽。”</p>
<p>Meta 否认了相关指责。Meta 超级智能实验室（Superintelligence Labs）产品主管 Nat Friedman 在 X 上发文称，Meta 是“从零开始”构建 Muse 的。不过，他承认 Muse 作为一款产品“在很大程度上受到了 OpenClaw 的启发”。他表示，自从今年 1 月首次使用 OpenClaw 之后，他便为 Meta 的团队采购了数百台 Mac Mini。而对于 Muse，他的目标是打造一个类似的平台，“让我们能够使其变得安全可控、易于使用，并能推广至数十亿人使用”。至于为何直接沿用了 OpenClaw 的文件名和语句，Friedman 表示团队认为原作者 Steinberger 在这些设定上“处理得完全切中要害”。</p>
<p>Instinct 看起来直接衍生借用的痕迹相对少一些。但如同 OpenClaw 当时颇具革命性的即时通讯功能一样，它允许用户直接通过即时聊天软件与自己的 AI 智能体沟通交互，且人们正将其运用于与 OpenClaw 走红初期完全相同的日常个人助理式场景中。一名 Instinct 用户在 X 上赞叹称，该 AI 智能体帮他填写了定点医疗就诊的表格、取消了多项订阅服务、筹办了单身派对、预订了度假行程中的各项活动、预约了车管所业务、缴纳了未缴的高速通行费账单等。另一位用户则表示，其 Instinct 智能体帮他找回并处理了遗落在加拿大一家酒店的物品。</p>
<p>即使这两个平台都是从零构建的，它们受惠于 OpenClaw 的程度也一目了然。</p>
<p>OpenClaw 并非 AI 智能体概念的开创者，但仅仅用了 10 个月时间，它便将智能体从单纯的概念验证推向了真正具备实用价值的产品。作为由一个人利用周末拼凑出来的项目，并在用户的个人电脑上本地运行，它通过用户与他人交谈的常规通讯平台（如 WhatsApp、Telegram、Slack、Teams 或 Discord）与用户对话。大约一周时间内，它便斩获了 200 万独立访客并在 GitHub 上收获了 10 万颗标星，促使人们纷纷抢购 Mac Mini 来全天候 24 小时运行自己的智能体，启发有人为 AI 智能体打造专门供其“聊天”的社交网络平台，并在全球范围内引发了数场 OpenClaw 用户的线下见面交流活动。</p>
<p>各大 AI 巨头此前早已重注押注智能体 AI（agentic AI），但没有一家公司的产品能像 OpenClaw 这样实现现象级突破，大型科技巨头随即投以关注。今年 2 月，OpenAI 聘请了 OpenClaw 的创始人 Peter Steinberger 加入公司负责智能体业务。5 月，Google 在其年度大会上公布了面向消费者的 AI 智能体布局。6 月，苹果公司决定全力进军智能体领域。8 月，Instinct 在其小范围公测期间飞速增长并筹集了数亿美元。9 月，Meta 推出了 Muse。可以公允地说，所有这些举措在不同程度上都受到了 OpenClaw 的启发。</p>
<p>真正的问题不在于像 Muse 这样的产品是否抄袭了 OpenClaw，而在于它们是否对其做出了实质性改良。正如 Friedman 所指出的，OpenClaw 唯一的明显短板在于安全性。该平台上被下载量居前的一款技能（skill）曾被发现包含恶意软件；根据一位研究人员的分析，OpenClaw 技能仓库中有 15% 包含“恶意指令”，用于暗中窃取用户数据或执行其他可疑任务。相比之下，扎克伯格发文称，Muse“从底层设计之初就融入了隐私与安全防护”，用户的数据与凭证均存放在 Muse 安全虚拟机（Muse Secure VM）上，这是一个“拥有独立浏览器、CPU、内存和存储空间的隔离 Linux 环境”。</p>
<p>然而就目前而言，Muse 在安全层面的改善程度可能并未达到其宣称的水平。尽管用户数据实现了与其他用户的隔离，Meta 官方仍然可以访问这些数据。该公司表示，计划在今年晚些时候引入一套“能够从密码学和可验证层面阻止 Meta 访问用户虚拟机中数据”的机制。Muse 在默认情况下还允许 Meta 利用用户数据来训练和改进其大模型，尽管用户可以选择关闭该选项。最糟糕的是，本周一名研究人员在 X 上披露的一处零日漏洞显示，任何人只要通过简单的攻击手法，便能劫持智能体并夺取其完全控制权。另一方面，Instinct 也因其服务条款过于宽泛而遭到指责，尽管该公司随后似乎对其条款进行了调整。</p>
<p>实际上，Meta 和 Instinct 最核心的突破，仅仅是将 AI 智能体推向了更广泛的人群。一部分人认为 Muse 好用的原因之一在于它能与 Meta 旗下的系统无缝集成，即便他们对于把自己的全部数据拱手交给该公司感到不安。而 Instinct 允许用户通过苹果系统的默认短信应用与 AI 智能体对话，极大拓宽了愿意尝试该产品的用户群体。虽然两者都支持在专用的本地设备上运行——并且这在潜在层面上具有安全优势——但这并不是默认使用模式，从而进一步扩大了试用人群基数。至少就目前而言，它们的定价低于像 Google Spark 这样的竞品；而且尽管 Instinct 仍处于公测阶段，Muse 凭借“一键下载”的体验，已经消除了当初使用 OpenClaw 过程中的大量门槛与阻碍。</p>
<p>今年 3 月，The Verge 曾在一篇报道中写道，OpenClaw 用户社群将这款开源 AI 智能体视作一场“草根运动和崇高探索，为人们摆脱少数主流 AI 巨头掌控的行业格局提供了一个逃生舱口”。如今，这些领头的 AI 科技巨头们已经吹响了反击的号角。</p>
<p>每日为您精选最重要的核心资讯，免费订阅。<br />这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 01:10 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/report/1000180/muse-openclaw-instinct-lookalike" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-more-startups-to-acquire-d85a3e8ff06a97ea" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1383" data-content-paragraphs="11" data-published-at="2026-09-24T17:07:55.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 01:07</span>
</div>

### [Databricks 收购 Row Zero，并正在物色更多初创公司展开并购](https://techcrunch.com/2026/09/24/databricks-buys-row-zero-and-is-scouting-for-more-startups-to-acquire/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Databricks buys Row Zero and is scouting for more startups to acquire</div>

<div class="article-body" data-article-body="true"><p>Databricks 周四宣布，已收购一家名为 Row Zero 的早期电子表格初创公司。</p>
<p>据悉，Databricks 的财务团队之所以青睐 Row Zero，是因为它是一款能够扩展支持超过 100 万行实时电子表格数据的云端工具。他们将 Row Zero 与 Databricks 自主研发的 AI 智能体 Genie 结合使用。借助 Genie，Databricks 用户可以使用自然语言提示词，对存储在 Databricks 系统中的数据提出复杂的商业问题，例如分析利润率或销售线索的状态。</p>
<p>当高管团队询问财务团队他们正在使用的这款云端工具时，灵感瞬间被触发。</p>
<p>“电子表格是每位业务分析师都喜爱的界面之一。因此，将商业智能（BI）、智能体和电子表格结合起来是非常顺理成章的！”Databricks 首席执行官阿里·戈德西（Ali Ghodsi）在 X 平台上发文讲述了这笔收购的来龙去脉。</p>
<p>如此一来，企业的安全数据存储在 Databricks 的云存储中，AI 智能体和人类可以通过他们熟知的电子表格格式及公式与之交互，无需再去学习和使用其他商业智能软件。通过将 Row Zero 与 Databricks 集成，数据可以在电子表格形式下进行操作并保持安全，而不是被转移到四周分发且缺乏安全保障的普通电子表格中。</p>
<p>交易条款未予披露。Row Zero 由前 AWS 和 Tableau 工程师创立。根据 PitchBook 的数据，该公司于 2025 年 5 月筹集了 1000 万美元，当时的估值约为 4000 万美元。</p>
<p>Databricks 在 8 月份又完成了 50 亿美元融资，年化营收运行率达到 70 亿美元。该公司在 2026 年一直忙于扫货，并渴望继续收购。“我们打算在未来开展更多类似的收购，”戈德西告诉 TechCrunch。</p>
<p>今年 3 月，Databricks 收购了两家初创公司：从事 AI 智能体评估和强化学习的 Quotient AI，以及处于极早期阶段的交互式笔记本工具 SiftD.ai。6 月，该公司收购了 AI 安全运营中心初创公司 Panther，后者在 2021 年的估值曾达 14 亿美元。上个月，它收购了微型轻量 Postgres 数据库 PGlite 的开发商 Electric，该数据库适用于在设备本地运行的智能体。</p>
<p>当您通过我们文章中的链接购买商品时，我们可能会获得少量佣金。这不会影响我们的编辑独立性。</p>
<p>您的下一个重要人脉就在 Disrupt。与 10,000 多名创始人、风投人、运营者和科技领袖建立联系。探索未来的突破，倾听塑造今日科技的声音，在太平洋时间 9 月 25 日晚上 11:59 之前购票最高可省 200 美元。</p>
<p>Anthropic 表示其生物实验室已经有了重大发现<br />PitPro 首款换胎机器人在加拿大投入使用<br />Anthropic 发布 Opus 5.5，价格更低，达到 Fable 级性能<br />Meta 的 Muse 增长势头超越 ChatGPT 早期移动端表现<br />蒂莉·诺伍德（Tilly Norwood）的媒体巡游正如人们对 AI 所预期的那样展开<br />Anthropic 正在运营一个进行生物学实验的实验室<br />来自一位 ChatGPT 发明者的新型 AI 模型令开发者们兴奋不已</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-25 01:07 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/databricks-buys-row-zero-and-is-scouting-for-more-startups-to-acquire/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-imizer-meta-muse-ai-cute-6472fdda6395fafa" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3066" data-content-paragraphs="23" data-published-at="2026-09-24T17:00:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 01:00</span>
</div>

### [Meta的Muse AI吉祥物如此可爱，这反而令人不寒而栗](https://www.theverge.com/column/999999/optimizer-meta-muse-ai-cute)
<div class="original-title-sub"><span class="orig-tag">原文</span> It’s sinister that Meta’s Muse AI mascot is so cute</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/jolly1.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="Meta的Muse AI吉祥物如此可爱，这反而令人不寒而栗" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该话题的文章将被添加到您的每日邮件摘要和主页推送中。</p>
<p>Meta想把这个小家伙塞进所有东西里，并让它接管你的工作效率、健康以及人际关系目标。</p>
<p>该作者的文章将被添加到您的每日邮件摘要和主页推送中。</p>
<p>查看维多利亚·宋（Victoria Song）的全部文章</p>
<p>昨晚，我让“Blorbo”——我给自己的Muse AI智能体起的名字——帮我制定一些健康目标。结果让我大失所望。我要求它提供一套能在30分钟内跑完5公里并恢复流失肌肉的锻炼方案。它生成的每周锻炼计划马马虎虎，可以说是相当平庸。</p>
<p>但随后我看了看它的脸。根据它从我的电子邮件中了解到的信息，它幻化成了一块猫咪形状的面包，长着一张类似星之卡比（Kirby）的脸。它简直可爱得要命，就像被《黑衣人》里的记忆消除棒击中了一样。在那之前，我对分享太多关于自己健康的信息一直持谨慎态度。但当那张可爱的小脸凝视着我的灵魂时，我开始分享更多内容，想看看它给出的建议是否会有所改善。</p>
<p>而这不正是Meta想要的吗？</p>
<p>自几周前Muse发布以来，我一直在极力回避它。当然，部分原因是我正忙于测试其他设备。但最主要的原因是，面对极致的可爱，我毫无抵抗力。</p>
<p>唉，在Meta Connect大会上，我终究没能逃脱这个脸颊粉扑扑、一身毛茸茸象牙色绒毛的小家伙，所以一回到酒店房间，我就下载了这个应用。在主题演讲期间，他的形象贴满了每一块屏幕。当Meta首席技术官安德鲁·博斯沃思（Andrew Bosworth，简称Boz）向我们展示他的Muse智能体Cooper时，我的眼睛因强烈的“萌系侵略性”（cute aggression）而抽搐。这个小家伙穿着一套迷你飞行员制服，因为他是Boz的试飞员。当Cooper举起圆滚滚、肉嘟嘟的手臂挥手时，我的脸因过于激动而皱成一团。这是我在科技主题演讲中见过的最可爱的东西。我脑子里的小恶魔暗自狂吼：“我好想捏烂它的小脸！”</p>
<p>更糟糕的是，这位吉祥物的真人大小纸板立牌遍布Meta园区的各个角落——首席执行官马克·扎克伯格透露它的名字叫“Jolly”（意为快乐）。Jolly确实名副其实，因为在过去的三天里，每当我看到Jolly的照片，我干涸枯萎的心灵都会感到一阵喜悦。这些立牌展示了他各种友好的姿势，有时还穿着可爱的服装。它们被显眼地摆放在演示台旁，你可以在那里戴上一副Meta旗下的众多智能眼镜，测试各种场景，以凸显这两项技术（在Meta看来）是如何相辅相成的。</p>
<p>你看，Muse AI智能体即将进驻Meta的所有智能眼镜。它还将搭载在一款名为Charm的全新独立AI可穿戴设备中，这款设备感觉部分像厚重的智能手表，部分像Humane AI Pin，部分又像拓麻歌子（电子宠物机）。其核心理念就是让你无论走到哪里，都能随身携带这个超级可爱的小家伙。</p>
<p>我认识的大多数人都会说，Meta把AI智能体硬塞进各种各样的事物中，给人一种不祥的感觉。但现在看看Jolly那小小的微笑吧。告诉我，你的嘴角难道没有微微上扬吗？如果你能诚实地说没有，那你比我坚强得多。</p>
<p>可爱蕴含着巨大的力量。人类和其他哺乳动物之所以进化出觉得婴儿可爱的特质，是因为这能让我们成为更好的父母。日本将为各类事物打造可爱吉祥物提升为一种艺术形式，正是因为这能让人们关注当地城镇和各种举措。如果你想想AI和机器人伴侣，当它们长得像Mirumi而不是波士顿动力公司那些如噩梦般的机器狗时，人们在心理上无疑更容易接受得多。</p>
<p>在对我与Muse的第一次演示体验中，我并没有被它惹人喜爱的外表所动摇。工作人员递给我一副眼镜、一套提示词，并向我展示了摆在面前的一些零食道具。这个版本的Muse名叫Henry，仅支持纯音频。他拥有英国男士那种低沉悦耳的语调。Henry的唯一任务是协助一个名叫Sean的虚构人物，Sean是一名38岁、从事营销工作的“健身狂魔”。Sean热衷于极致补充蛋白质、综合格斗，并且制定了极其疯狂的训练计划，包括早上举铁，晚上再进行一次高强度间歇训练（HIIT）。</p>
<p>就其本身而言，这次演示充斥着AI常见的各种缺陷。我问Henry摆在我面前的哪种零食在卡路里与蛋白质比例上性价比最高。在Henry花了一分钟“思考”答案之前，我就知道会是牛肉干棒。而对于我的同事杰·彼得斯（Jay Peters），Henry则误报了一款蛋白棒的蛋白质克数，少报了它的实际含量。（事实证明，AI通过照片识别食物的表现并不太好。）当我让Henry把一些格兰诺拉麦片块放进我的购物车时，它未能完成，因为该商品“不在目录中”。</p>
<p>通过一副眼镜注视某个物体，并让AI根据具体、个性化的情境协助决策，这确实很棒。即便存在一些小毛病，我也确信这能为视力障碍人士等群体带来帮助。但这种演示我之前已经见过十几次了，而且每次都有相同的弊端。这一次，我脑海中冒出了一个讽刺的念头：使用这样的眼镜是Meta了解谁在吃什么的绝佳途径。然后这些数据可以轻易用于精准广告投放，为Meta赚取大把钞票。你可能只是一个想要吃得更健康的普通人。但你的情境信息会被输入到一个无形的人口统计数据矩阵中，Meta肯定能找到将其变现的方法，就像它在过去20年的核心业务中所做的那样。</p>
<p>这又让我回想起了Blorbo。正如我之前对Friend所做的那样，我将它命名为Blorbo，以提醒自己这不是真实的，并保持一种起码的界限感。在测试了各种AI陪伴机器人之后，我深知与这些AI伴侣/助手/随便你怎么称呼它们的角色之间的关系会以多快的速度升级。但我很好奇，面对个人信息时，一个可爱的Muse智能体会如何影响我的判断。一勺可爱真的能让AI这剂药丸变得更容易下咽吗？</p>
<p>在制定了我那份平平无奇的健身计划之后，我发现我可以让Blorbo帮我设定人际关系目标。我让Blorbo举几个例子。它建议我与一位朋友重新取得联系、与生活中的人更好地沟通、设定更清晰的界限，以及去约会。从一块猫咪形状的面包面团那里获得这种建议感觉怪怪的。这是可爱属性唯一一次对机器人起到反效果。然而，当我在授予它访问我一个风险较低的邮箱权限后，它帮我清理了一大堆垃圾邮件，我对Blorbo的挑剔就减少了。但是，我对我自己感到了强烈的自责与批判。</p>
<p>我主要在健康领域与AI打交道。这是工作的一部分，而且说来奇怪，虽然健康通常属于极度私密的领域，但我个人却愿意对此进行分享。在经历过挣扎之后，我深切地体会到一个人在渴望重获常态时会感到多么绝望。在那些时刻，你很容易变得脆弱，去尝试许多在其他情况下绝不会去碰的事情。而从微小的快乐中获得的愉悦感也会被成倍放大。</p>
<p>或许正因如此，看着自己居然如此喜爱Jolly的设计，我感到有些恼火。我也说不清为何会从它那讨喜的微笑中感受到一丝阴暗的气息。我可以想象，在自己健康历程中最灰暗的日子里，会从这样一个对我毫无感知、而我却托付了如此多个人隐私的工具中获得慰藉甚至快乐。我能想象一张可爱的面孔如何让我——哪怕只是短暂地——遗忘自己对Meta过往劣迹的看法。</p>
<p>这实在称得上狡黠险恶，毕竟我才刚和敏锐聪颖的同事们花了数周时间深入报道，揭露Meta在诸多方面根本配不上这种信任特权。</p>
<p>需要澄清的是，我并不是想剥夺关于Jolly的所有乐趣。我们不得不承认，Meta的设计团队这次确实交出了一份惊艳的答卷。我只想说，对于我们这些与Muse智能体互动的人而言，请记住一件事：千万不要被一张可爱的外表所蒙骗。</p>
<p>每日免费精选核心要闻简报。<br />这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 01:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/column/999999/optimizer-meta-muse-ai-cute" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-lable-on-android-and-ios-f97969c5d20fd4ba" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1160" data-content-paragraphs="12" data-published-at="2026-09-24T17:00:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 01:00</span>
</div>

### [Google 相册受《独领风骚》启发的“虚拟衣橱”现已登陆 Android 和 iOS](https://techcrunch.com/2026/09/24/google-photos-clueless-inspired-virtual-closet-is-now-available-on-android-and-ios/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Google Photos ‘Clueless’-inspired virtual closet is now available on Android and iOS</div>

<div class="article-body" data-article-body="true"><p>Google 推出的全新 AI 功能现已面向美国、巴西和印度的所有 iOS 和 Android 设备用户开放。该功能可将你的穿搭照片转化为虚拟衣橱——其灵感似乎源自电影《独领风骚》（Clueless）中女主角雪儿（Cher）所使用的标志性虚拟衣橱应用。</p>
<p>该公司于今年早些时候公布了这项功能，并计划在夏季开始推送。Android 用户率先于 6 月获得体验，如今该虚拟衣橱已向受支持市场的所有 Android 和 iOS 用户全面开放。</p>
<p>《独领风骚》中数字化衣橱的概念旨在凸显雪儿优渥的生活背景，她的衣服多到需要借助数字化系统来挑选穿搭并整理所有物品。如今，你无需成为比弗利山庄的富家千金，也能享用这项技术。</p>
<p>取而代之的是，Google 利用 AI 技术，根据你在照片中穿戴的服饰生成一份你的衣橱备份。在应用中，你还可以按上衣、裤子/裙装、首饰等类别筛选单品，然后将它们自由混搭以打造不同风格的穿搭。</p>
<p>Google 表示，该功能旨在为用户提供辅助，关于你的着装习惯或穿着内容的数据不会与零售商等第三方共享。</p>
<p>除了虚拟衣橱功能的更大范围推广外，Google 相册还迎来了多项其他更新，包括只需在 Gemini Spark 中输入一条提示词即可挑选、调亮并分享照片的功能，升级版的标记工具（Markup），以及更多利用 AI 变换照片的 Remix 模板。（在美国，Gemini Spark 功能需要订阅 Google AI Pro 或 Ultra 服务。）</p>
<p>借助升级后的标记工具，你将能够使用涂黑笔模糊车牌等敏感信息，使用精准的粗细滑块进行自定义涂鸦，并在为照片添加文字时选择不同的字体。</p>
<p>针对 Android 用户，应用还推出了名为“Moods”的全新照片滤镜，可为你的照片赋予 35mm 胶片、2000 年代数码相机（CCD）等多种风格外观。</p>
<p>当您通过我们文章中的链接购买商品时，我们可能会赚取少许佣金。这不会影响我们的编辑独立性。</p>
<p>消费新闻编辑</p>
<p>你的下一个重要人脉就在 Disrupt。与 10,000 多位创始人、风投人、运营者和科技领袖建立联系。探索未来的突破性成果，聆听塑造当今科技的声音，太平洋时间 9 月 25 日晚 11:59 前购票立省高达 200 美元。</p>
<p>Anthropic 称其生物实验室已取得重大发现<br />PitPro 首款自动换胎机器人在加拿大上线<br />Anthropic 发布 Opus 5.5：价格更低，性能达 Fable 级别<br />Meta 的 Muse 早期移动端表现超越 ChatGPT<br />Tilly Norwood 的媒体巡游正如你对 AI 所预期的那样<br />Anthropic 正在运营一家开展生物实验的实验室<br />来自 ChatGPT 发明者的一种新型 AI 模型令开发者倍感兴奋</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-25 01:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/google-photos-clueless-inspired-virtual-closet-is-now-available-on-android-and-ios/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-rything-you-need-to-know-868f222fe1138c2b" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1870" data-content-paragraphs="17" data-published-at="2026-09-24T16:46:47.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 00:46</span>
</div>

### [TechCrunch 2026年创始人峰会：你需要了解的一切](https://techcrunch.com/2026/09/24/techcrunch-founder-summit-2026-everything-you-need-to-know/)
<div class="original-title-sub"><span class="orig-tag">原文</span> TechCrunch Founder Summit 2026: Everything you need to know</div>

<div class="article-body" data-article-body="true"><p>TechCrunch 创始人峰会（Founder Summit）将于11月4日在波士顿举行，为期一天。届时，处于各个发展阶段的创业者将与顶尖风险投资人及经验丰富的企业家齐聚一堂，获取关于创办与扩张公司的实操经验与洞察。这是我们长期举办的以创始人为核心的系列活动的最新一场，相比 Disrupt 大会，该峰会规模更精炼、更具实操性。</p>
<p>如果你更青睐来自 Anthropic、英伟达（Nvidia）、OpenAI 和 Benchmark 的庞大演讲嘉宾阵容，Disrupt 的门票目前仍在此发售。但对于希望通过为期一天的密集速成课程深入业务细节的创始人而言，创始人峰会正是为你的2027年规划抢占先机的理想之地。</p>
<p>在深入了解活动详情之前，你可以在这里获取我们所有门票的信息，投资人和创始人目前可享受200美元的购票优惠。</p>
<p>所有创始人在从零开始创立公司的过程中，最终都需要应对庞大而复杂的运作机制。这涉及筹款、招聘、法律、营销、公关和领导力，而投资者也需要相应的方式来考察、投资并在创始人构建自身能力的过程中对其进行培养。</p>
<p>创始人峰会是解答所有这些棘手问题的最佳途径，与你交流的社群成员都曾亲历其境，在建设性的失败与巨大的成功中积累了经验并脱颖而出。</p>
<p>本次活动将于2026年11月4日星期三在波士顿的 SoWa 发电厂（SoWa Power Station）举行。场地交通便利，公共交通可达，步行即可到达橙线（Orange Line）的后湾站（Back Bay）与塔夫茨医疗中心站（Tufts Medical Center），或红线（Red Line）的百老汇站（Broadway）。</p>
<p>为了履行助力创始人取得成功的承诺，今年的议程和演讲嘉宾重点聚焦于筹款、AI 原生构建以及领导力。相关议题包括：</p>
<p>是的。创始人峰会前身为 Early Stage 和 All Stage。今年，我们保持着同样的使命，但启用了全新的名称。如果你在参会前想做进一步了解，请留意这一点。</p>
<p>创始人峰会远不止是一系列专题研讨会，尽管会议议程确实为创始人和投资者提供了大量宝贵的真知灼见。除了所有这些研讨环节外，我们还设有分组讨论会，通过更加私密深入的研讨，就社群关心的关键议题进行更深层次的交流。</p>
<p>活动现场还支持通过 Braindate 应用程序进行人脉拓展，以帮助投资者与创始人建立联系，或协助面临类似挑战的创始人汇聚各自的专业经验，共同探讨解决方案。这段时间也是学生群体拓展早期人脉网络的绝佳机会。</p>
<p>此外，还有将于11月1日至7日举行的创始人峰会周（Founder Summit week）。届时我们将举办所有的周边活动（Side Events），为你提供更多与社群相聚交流的机会。如果你特别渴望参与其中，也可以在此申请举办属于你自己的周边活动。</p>
<p>门票价格实行分阶段递增，下一轮涨价将在10月16日之后进行。目前各档票价为：投资者票399美元，创始人票199美元，学生票149美元。如果你为联合创始人或同事购买第二张门票，还可以享受半价优惠。四人或四人以上的团体购票还可享受额外折扣。</p>
<p>是的！我们正在招募志愿者协助现场活动工作。志愿者不仅可以在工作班次之余免费参与峰会各项活动，还能在幕后深入了解整场活动的筹办过程。欢迎在此了解更多关于我们项目的信息，新申请人报名将于10月19日截止。</p>
<p>你可以在此获取关于本次活动的完整信息，涵盖最新的演讲嘉宾信息、完整议程、后勤安排等详尽内容。三种票档的购票信息均可在此查阅。请记住，我们当前的优惠将于10月16日截止——请在到期前抓紧行动。</p>
<p>当你通过我们文章中的链接进行购买时，我们可能会赚取少量佣金。这不会影响我们的采编独立性。</p>
<p>你的下一个重要人脉就在 Disrupt。与超过10,000名创始人、风险投资人、运营者和科技领袖建立联系。探索未来的突破性技术，倾听塑造当今科技格局的声音，在太平洋时间9月25日晚11:59前购票可立省高达200美元。</p>
<p>Anthropic 表示其生物学实验室已取得重大发现<br />PitPro 首款换胎机器人已在加拿大投入使用<br />Anthropic 发布 Opus 5.5：价格更低，具备媲美 Fable 的性能<br />Meta 的 Muse 早期移动端增长速度超过 ChatGPT<br />Tilly Norwood 的媒体巡回宣传效果正如你对 AI 所预期的那样<br />Anthropic 正在运营一个进行生物学实验的实验室<br />来自 ChatGPT 发明者的一种新型 AI 模型正令开发者兴奋不已</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-25 00:46 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/techcrunch-founder-summit-2026-everything-you-need-to-know/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-dly-valued-at-22-billion-87cb2cb946303557" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2997" data-content-paragraphs="16" data-published-at="2026-09-24T16:35:13.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 00:35</span>
</div>

### [对话ElevenLabs首席执行官20分钟：据称公司估值现已达220亿美元](https://techcrunch.com/2026/09/24/twenty-minutes-with-the-ceo-of-elevenlabs-now-reportedly-valued-at-22-billion/)
<div class="original-title-sub"><span class="orig-tag">原文</span> 20 minutes with the CEO of ElevenLabs, now reportedly valued at $22B</div>

<div class="article-body" data-article-body="true"><p>ElevenLabs致力于打造人工智能的语音层，即把文本转化为听起来像真人发音的语音模型。大多数人在拨打客服电话时都会接触到它——而且往往毫无察觉。例如，Klarna为3500万美国客户提供的一线电话支持就是基于该技术运行的。德国电信（Deutsche Telekom）、思科（Cisco）、Adobe以及越来越多政府机构也是如此。ElevenLabs还向创作者销售产品，后者利用其平台制作有声读物、配音和音乐。</p>
<p>它并非该领域唯一的玩家。事实上，它正越来越多地与自身客户狭路相逢，其中包括对话式人工智能平台Decagon——该平台最初使用ElevenLabs训练其语音产品，如今却成了其竞争对手。但ElevenLabs的投资人似乎并不太担心。这家成立仅四年的公司表示，其年经常性收入（ARR）正朝着6亿美元迈进，据报道，支持它的投资方对其给出的估值现已达到220亿美元。</p>
<p>为了解更多内情，我在多伦多举办的Nrth（当地一个前称为Elevate的创业大会）上采访了ElevenLabs联合创始人兼首席执行官马蒂·斯塔尼斯泽夫斯基（Mati Staniszewski）。我们在短时间内探讨了诸多话题，包括企业是否应当告知客户其正在与AI对话（他认为应当告知），以及他是否能谈谈公司的毛利率。不出所料，斯塔尼斯泽夫斯基表示无法透露任何细节，但他明确表示，如果压低毛利率能换取公司市场份额的扩大，他不介意毛利率被进一步压缩。</p>
<p>以下为我们的对话内容，经过精简与轻度编辑。完整对话可在此查看。</p>
<p>问：你去年参加了我们的TechCrunch Disrupt大会，当时你表示音频模型将在几年内走向大宗商品化（同质化）。你现在如何评价那个预测？<br />答：仍有很多工作要做，仅在模型层面所能拉开的质量差距依然十分显著。如果我们从更长远来看，大概三到五年后，这些差距会缩小。我们非常想做、并且想成为首个达成的事情，是让对话式AI通过图灵测试。你需要将智商与情商结合起来。你需要理解对方的情绪，懂得何时该放慢语速或放大音量。这在目前还没有人做到。</p>
<p>问：目前企业级业务占整体业务的比例是多少？<br />答：我们的年经常性收入（ARR）目前已达6亿美元。其中55%以上是传统企业级客户，[剩余]45%中的很大一部分是中小企业、开发者、构建者和创作者。</p>
<p>问：就像AI领域的其他所有人一样，你们也越来越频繁地与自己的客户竞争。Decagon基于你们的模型训练了其语音产品，现在却通过自己的模型来处理查询。<br />答：界限变得越来越模糊了。谈到模型公司、平台公司、应用公司时，过去在各自的起止边界上有着非常明确的划分。如今这种界限模糊得多了。以Anthropic为例，它原本是一家模型公司，如今无疑也是一家平台，并且正越来越多地推出一系列广泛的应用。我认为这种趋势还将继续。</p>
<p>这不再是一个非此即彼的选择。在客户体验方面，如果你打电话进来只是为了获取信息，不涉及执行任何操作——你可以使用大量的开源模型，因为你的知识库决定了什么是优质体验。但如果是金融服务，你需要身份验证，需要了解交易信息，或许还有退款操作。这里绝不容许犯错。在这种情况下，前沿模型仍将处于主导地位。</p>
<p>问：那些开放权重模型中有一部分来自中国。美国政府是你们的客户，欧洲多国政府也是你们的客户。与这些客户的沟通是怎样的？<br />答：情况各不相同。在每次部署中，我们采用的模型和语音都会根据具体场景而定。如果我们与波兰政府或巴西政府合作，他们有各自的一套要求。它可以是开放权重模型、闭源模型，也可以是他们自己微调的模型。[在波兰]这是一个医疗健康案例。患者在公共卫生系统预约挂号，有18%的人从未如约就诊。我们的部署方式是由智能体打电话去提醒他们。他们拥有一套基于自身知识库优化的模型，我们在保持数据本地化的同时完成集成。</p>
<p>问：当有人在与智能体而非真人对话时，企业是否应该主动告知？<br />答：我认为现阶段应当予以披露。目前人们还不习惯这种情况，普遍的心理是在那通电话里不希望感觉自己被欺骗了。但在五年后，当每个人都有代表自己的专属智能体在工作时，你打电话进去就会预期接听的是个智能体。到那时，我认为整个社会都会发生转变。现在有一些很好的做法——如果需要等待30分钟才能接通人工，那就给客户一个选择。在几乎所有情况下，他们都会选择智能体，并对如此出色的体验感到惊讶。</p>
<p>问：考虑到你们在模型和推理方面的支出，你们的毛利率是多少？<br />答：我只能给出一个比较模糊的回答。鉴于我们拥有研发能力，我们能够以极其聪明的方式对模型进行微调和约束。但只要我们能为客户节省任何成本，我们就会付诸行动。最重要的依然是证明价值并与客户站在一起。因此，只要我们能够投资并证明这种价值，我们不介意毛利率降低，从而在未来五年创造价值的过程中实现共同受益。</p>
<p>问：你们拥有数百万小时的客服通话数据。你们会用它们来进行训练吗？你们的训练数据中有多少是合成数据？<br />答：在某些公司，我们是共同创建模型的。他们需要一个针对其特定用例的模型。除此之外，训练中最主要的部分并不在于数据量本身，而在于数据标注。我们内部有数千名合同工协助我们进行标注，不仅标注说了什么，还要标注说话的时间点、说话的方式以及表达的情绪。我们甚至不得不请来声音教练，以便能够精准识别口音。</p>
<p>问：有报道称你们正考虑在2028年进行IPO。你能证实这一点吗？<br />答：我们渴望打造一家经得起时间考验的公司。我们正在打牢基础，以便在未来几年内有能力做到这一点。但最终是否推进，将取决于合适的时间与地点。</p>
<p>问：“未来几年”这个说法非常模糊。<br />答：幕后花絮：对于前沿实验室是否应该放慢脚步，你的立场是什么？<br />大家在共同努力寻找把控节奏的途径上是一致的。至于他们是否应该对此公开透明，以及应该涉及多少媒体讨论或监管介入，那是另一个话题。但是的，我们在部署这项技术时都应该采取恰当的防范措施。我们并不训练文本模型以及模型背后的智能部分，而那正是这场辩论的核心焦点。</p>
<p>问：ElevenLabs是否会遭遇类似Hugging Face所面临的安全漏洞风险？<br />答：我们比他们更进一步，因为我们并不部署智能体中具备自我复制或递归特性的智能部分。我们的技术不允许智能体再创建新的智能体。每一位客户都要经过严格的KYC（了解你的客户）审查。网络安全风险对整个世界来说确实是一项挑战，但我们已经采取了完善的防范措施。</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会赚取少量佣金。这不会影响我们的编辑独立性。<br />主编兼总经理<br />您的下一个重要人脉就在Disrupt大会。与超过10,000名创始人、风险投资人、运营者和科技领袖建立联系。探索未来的突破性成果，倾听塑造当今科技的声音，并在太平洋时间9月25日晚上11点59分之前购票立省高达200美元。<br />Anthropic表示其生物实验室已获得重大发现<br />PitPro首款换胎机器人在加拿大上线<br />Anthropic发布价格更低且性能达到Fable水准的Opus 5.5<br />Meta的Muse在早期移动端发布表现上正超越ChatGPT<br />蒂莉·诺伍德（Tilly Norwood）的媒体巡回宣传正如你对AI所预期的那样进行<br />Anthropic正在运营一个开展生物学实验的实验室<br />来自ChatGPT发明者的一种新型AI模型令开发者们兴奋不已</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-09-25 00:35 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/09/24/twenty-minutes-with-the-ceo-of-elevenlabs-now-reportedly-valued-at-22-billion/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-psc-free-software-update-49621e07f7e0cfed" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="649" data-content-paragraphs="9" data-published-at="2026-09-24T16:29:31.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 00:29</span>
</div>

### [这款智能眼镜因镜腿过热可能引发灼伤而被召回](https://www.theverge.com/tech/1000085/inmo-air3-smart-glasses-recall-cpsc-free-software-update)
<div class="original-title-sub"><span class="orig-tag">原文</span> These smart glasses have been recalled for overheating temples causing burns</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/inmo.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="这款智能眼镜因镜腿过热可能引发灼伤而被召回" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的帖子将添加到您的每日电子邮件摘要和主页信息流中。</p>
<p>请立即停止使用 Inmo Air3，并联系该公司以获取解决该问题的免费软件更新。</p>
<p>来自该作者的帖子将添加到您的每日电子邮件摘要和主页信息流中。</p>
<p>查看 Andrew Liszewski 的全部文章</p>
<p>一家名为 Inmo 的生产多款智能眼镜的公司已对其 Air3 产品发起召回，原因是其左侧镜腿“在长时间使用过程中可能会过热，存在因灼伤导致重伤或死亡的风险”。据美国消费品安全委员会（CPSC）称，截至目前，已有 10 起关于用户在使用 Air3 时“面部及左耳侧出现灼烧感”的报告。</p>
<p>此次召回涉及 2025 年 12 月至 2026 年 8 月期间在美国和加拿大通过该公司官网、亚马逊以及 Kickstarter 众筹平台售出的 1600 多副 Air3 眼镜，售价在 900 至 1300 美元之间。该眼镜可通过黑色镜框以及右侧镜腿上印有的“Air3”和“Inmo”标识进行识别。</p>
<p>该公司官网上的召回页面指引消费者立即停止使用 Air3 眼镜，并通过电话或电子邮件联系 Inmo 的售后支持团队，后者将协助进行免费的在线软件更新以解决该问题。虽然与 CPSC 合作开展的正式召回是近期的行动，但早在七个月前的产品评测中就已指出其左侧镜腿过热及其引起的灼烧感问题。该公司此前便已知晓该隐患，因为其在随眼镜附赠的配件中就包含了一个保护套，旨在防止用户在佩戴时头部受到过高热量的影响。</p>
<p>免费获取每日重要新闻摘要。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-09-25 00:29 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/tech/1000085/inmo-air3-smart-glasses-recall-cpsc-free-software-update" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-38-live-with-live-avatar-34692efacd3b982a" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2704" data-content-paragraphs="22" data-published-at="2026-09-24T16:20:39.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/deepmind.svg" class="source-icon" alt="Google DeepMind (AI前沿研究)" width="16" height="16" /> <strong>Google DeepMind (AI前沿研究)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 00:20</span>
</div>

### [要闻：搭载 Live Avatar 的 Gemini 3.8 Live 为 Gemini 的对话式人工智能带来了实时视](https://deepmind.google/blog/introducing-gemini-38-live-with-live-avatar/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Introducing Gemini 3.8 Live with Live Avatar</div>

<div class="article-body" data-article-body="true"><p>搭载 Live Avatar 的 Gemini 3.8 Live 为 Gemini 的对话式人工智能带来了实时视觉形象。通过将我们的实时对话能力与低延迟流式视频原生结合，Live Avatar 为企业及其用户提供了更加自然、直观的对话体验。</p>
<p>软件工程师，代表 Gemini 音频团队</p>
<p>延续上周 Gemini 3.8 Live 发布的强劲势头，今天我们非常高兴地推出搭载 Live Avatar 的 Gemini 3.8 Live——为我们的原生实时对话模型带来近乎实时的视觉形象呈现。通过将近乎实时的视频生成与语音相结合，Live Avatar 功能创造了一种能够通过动态视觉角色进行倾听、观察和言说的全新体验。凭借精准的口型同步、自然的表情和流畅的对话轮替，Live Avatar 使企业能够以更具互动性的方式拓展其虚拟业务。无论是提供引人入胜的客户服务，还是交付互动式实操指引，它都能将数字化交流转变为更丰富、更易触达的体验。从今天开始，搭载 Live Avatar 的 Gemini 3.8 Live 正式在 Gemini Enterprise 中上线。</p>
<p>延续上周 Gemini 3.8 Live 发布的强劲势头，今天我们非常高兴地推出搭载 Live Avatar 的 Gemini 3.8 Live——为我们的原生实时对话模型带来近乎实时的视觉形象呈现。通过将近乎实时的视频生成与语音相结合，Live Avatar 功能创造了一种能够通过动态视觉角色进行倾听、观察和言说的全新体验。</p>
<p>凭借精准的口型同步、自然的表情和流畅的对话轮替，Live Avatar 使企业能够以更具互动性的方式拓展其虚拟业务。无论是提供引人入胜的客户服务，还是交付互动式实操指引，它都能将数字化交流转变为更丰富、更易触达的体验。</p>
<p>从今天开始，搭载 Live Avatar 的 Gemini 3.8 Live 正式在 Gemini Enterprise 中上线。</p>
<p>了解搭载 Live Avatar 的 Gemini 3.8 Live 如何支持丰富多样的角色形象，每个角色都具有独特的外观、声音和富有表现力的神态。</p>
<p>更自然的多模态对话<br />对话本质上是多模态的：我们通过倾听、注视、言说以及运用面部表情来进行交流。Live Avatar 将这些能力赋予了企业级智能体。通过同时处理视觉和音频输入，它能生成更充实的对话，从而提供更全面的体验。</p>
<p>对话本质上是多模态的：我们通过倾听、注视、言说以及运用面部表情来进行交流。Live Avatar 将这些能力赋予了企业级智能体。通过同时处理视觉和音频输入，它能生成更充实的对话，从而提供更全面的体验。</p>
<p>观看搭载 Live Avatar 的 Gemini 3.8 Live 如何在近乎实时的情况下理解所见所闻，并以富有表现力的音频和视频作出回应，带来更加自然的对话。</p>
<p>具备持续在场能力的异步工具执行<br />除了视觉形象之外，该功能还得到了 Gemini 先进推理能力的支持。借助异步工具调用，Live Avatar 可以在保持活跃对话的同时在后台触发工具调用并获取数据，在确保对话流程不被打断的前提下处理复杂的任务。</p>
<p>除了视觉形象之外，该功能还得到了 Gemini 先进推理能力的支持。借助异步工具调用，Live Avatar 可以在保持活跃对话的同时在后台触发工具调用并获取数据，在确保对话流程不被打断的前提下处理复杂的任务。</p>
<p>查看搭载 Live Avatar 的 Gemini 3.8 Live 如何处理诸如协助宾客办理酒店入住等复杂任务：在后台调用工具的同时，保持对话不间断进行。</p>
<p>面向全球规模构建的对话体验<br />对话形象应当让人感到自然，且不应受制于语言。Live Avatar 具有原生多语言语音到语音同步功能。该功能可动态调整口型与表情，在 97 种语言之间实现无缝切换，且不会降低视频保真度或引入视觉漂移偏差。</p>
<p>对话形象应当让人感到自然，且不应受制于语言。Live Avatar 具有原生多语言语音到语音同步功能。该功能可动态调整口型与表情，在 97 种语言之间实现无缝切换，且不会降低视频保真度或引入视觉漂移偏差。</p>
<p>观看 Gemini 3.8 Live Avatar 如何在对话中途切换语言，口型同步与面部表情在 97 种语言之间无缝适配。</p>
<p>契合您品牌需求的 Live Avatar<br />各类机构通常需要独特的视觉标识来契合其品牌风格。除了多样化的预设虚拟形象库之外，机构还可以自定义属于自己的 Live Avatar。仅需一张高质量参考图像，开发者即可生成一个完全动态、响应迅速的虚拟形象，同时保留参考图的样貌特征、品牌风格或角色辨识度。自定义虚拟形象创建功能目前仅通过企业白名单机制开放。</p>
<p>以信任与透明度为核心<br />我们在构建 Live Avatar 时设立了严格的安全防护机制，旨在尊重身份权益，并保持 AI 生成内容的透明度。我们的 AI 产品生成的所有输出均嵌入了 SynthID 水印。这种肉眼难以察觉的水印直接织入音频和视频输出中，有助于确保 AI 生成内容保持可检测性，从而最大程度减少虚假信息和错误归因。欲深入了解我们在安全性与负责任部署方面的全面举措，请阅读我们的模型卡。</p>
<p>开始体验搭载 Live Avatar 的 Gemini 3.8 Live<br />搭载 Live Avatar 的 Gemini 3.8 Live 现已在 Gemini Enterprise 中上线。欢迎查阅 API 文档以开始使用。</p>
<p>各类机构通常需要独特的视觉标识来契合其品牌风格。除了多样化的预设虚拟形象库之外，机构还可以自定义属于自己的 Live Avatar。仅需一张高质量参考图像，开发者即可生成一个完全动态、响应迅速的虚拟形象，同时保留参考图的样貌特征、品牌风格或角色辨识度。自定义虚拟形象创建功能目前仅通过企业白名单机制开放。</p>
<p>我们在构建 Live Avatar 时设立了严格的安全防护机制，旨在尊重身份权益，并保持 AI 生成内容的透明度。我们的 AI 产品生成的所有输出均嵌入了 SynthID 水印。这种肉眼难以察觉的水印直接织入音频和视频输出中，有助于确保 AI 生成内容保持可检测性，从而最大程度减少虚假信息和错误归因。欲深入了解我们在安全性与负责任部署方面的全面举措，请阅读我们的模型卡。</p>
<p>搭载 Live Avatar 的 Gemini 3.8 Live 现已在 Gemini Enterprise 中上线。欢迎查阅 API 文档以开始使用。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Google DeepMind (AI前沿研究)】于 2026-09-25 00:20 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Google</span>
</div>

<div class="news-card-footer"><a href="https://deepmind.google/blog/introducing-gemini-38-live-with-live-avatar/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Google DeepMind (AI前沿研究)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-whisperx-on-sagemaker-ai-bf991ee95d0532f1" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="10583" data-content-paragraphs="41" data-published-at="2026-09-24T16:20:12.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/aws.svg" class="source-icon" alt="AWS Machine Learning Blog (亚马逊云科技官方英文)" width="16" height="16" /> <strong>AWS Machine Learning Blog (亚马逊云科技官方英文)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 00:20</span>
</div>

### [在 SageMaker AI 上利用 WhisperX 实现带说话人标记的语音转录](https://aws.amazon.com/blogs/machine-learning/speaker-labeled-transcription-with-whisperx-on-sagemaker-ai/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Speaker-labeled transcription with WhisperX on SageMaker AI</div>

<div class="article-cover"><img src="https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/09/22/ML-21846-1.png" alt="在 SageMaker AI 上利用 WhisperX 实现带说话人标记的语音转录" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>任何处理语音音频的团队在使用通用语音转文字（speech-to-text）时都会遇到相同的瓶颈。想想联络中心通话、全员大会、播客、证词陈述和广播媒体等场景。这些工作负载需要标准转录无法妥善处理的两件事。首先，时间戳停留在语句（utterance）级别，偏差往往有数秒之多。其次，无法可靠回答“谁说了什么”。这些缺陷导致转录文本难以在大规模场景下进行检索、字幕制作、敏感信息脱敏（redact）或分析。缺失说话人标签会破坏合规审查，而不精确的时间戳则会导致字幕错位或脱敏失效。</p>
<p>WhisperX 弥合了这两个缺陷。它在 OpenAI 的 Whisper 基础上封装了批处理推理功能，添加了用于精确到单字级别时间戳的 wav2vec2 强制对齐，并引入了说话人日志化（speaker diarization）以标记说话人身份。这些能力直接契合真实业务工作负载。联络中心可以统计发言时长、检查话术合规性并运行情感分析，团队则可将会议转化为可搜索的笔记。媒体和电子学习团队能为庞大的内容库生成精确的字幕（SubRip Subtitle (SRT) 和 Web Video Text Tracks (VTT) 格式）。时间敏感型场景可以在说话人开口的瞬间获取文本。在医疗、法律和金融等受监管行业，带说话人标记的转录文本能够为审计和法律事实调查（legal discovery）提供有力支持。</p>
<p>AWS WhisperX 深度学习容器（DLC）将所有这些功能打包成一个支持 GPU 的镜像。你可以将其部署到 Amazon SageMaker AI 实时或异步端点，而无需构建自定义镜像。在本文中，我们将展示如何部署这两种类型的端点以及何时选择每种类型。我们还将涵盖关键的生产环境细节：GPU AMI 锁定（pin）、扩展、Amazon Simple Storage Service (Amazon S3) 设置以及成本控制。本文是展示专用 AWS DLC 的多模态系列文章的一部分。该系列涵盖 4 个用例中的 3 个 AWS DLC：(1) 用于文本转语音的 vLLM-Omni，(2) 用于图像和视频的 vLLM-Omni，(3) 用于语音转文本的 WhisperX（即本文），以及 (4) llama.cpp。</p>
<p>什么是 WhisperX，它能解锁哪些工作负载<br />Whisper 是 OpenAI 旗下广受欢迎的开源自动语音识别（ASR）模型系列，能够在多种语言下准确地将语音音频转录为文本。它专注于高质量转录，并在短语或语句分段级别生成时间戳。WhisperX 是一个构建在 Whisper 之上的开源项目，旨在将其扩展用于生产级工作负载。它增加了逐词时间戳、说话人标签和更快的转录速度，这三项能力结合在一起，将原始音频转化为了结构化、可分析的转录文本。</p>
<p>为什么选择专用深度学习容器<br />AWS WhisperX DLC 是一个持续维护、支持 GPU 的镜像，其中已包含 Whisper、对齐模型和日志化权重，无需 Hugging Face 令牌（token）。它遵循标准的 Amazon SageMaker AI 服务契约，因此你可以像部署其他任何模型一样部署它。</p>
<p>服务契约：容器在 8080 端口提供服务，并公开用于推理的 POST /invocations 以及用于健康检查的 GET /ping。</p>
<p>请求格式：端点期望 multipart/form-data 格式，音频作为文件部分，另可附带可选的字符串字段，例如 language、diarize 和 response_format。Amazon SageMaker AI 会将 ContentType 请求头（包括 multipart 边界标记）原样传递给容器。</p>
<p>输出格式：支持 json、verbose_json、srt 和 vtt，因此同一个端点既能为分析管道提供数据，也能满足视频编辑器的需求。</p>
<p>在实时端点与异步端点之间进行选择<br />Amazon SageMaker AI 同时支持实时和异步端点，因此你可以通过任一模式提供相同的 WhisperX DLC 服务。选择通常取决于音频片段的时长和交互性。对于长音频，建议使用异步端点：当转录、对齐和日志化需要更多时间运行时代，这是推荐的路径。实时端点则应留给能在 Amazon SageMaker AI 60 秒响应上限内完成的简短交互式音频片段。</p>
<p>维度 实时端点 异步端点<br />最适合 简短交互式片段 长音频、大批量批处理<br />延迟 同步，必须在 60 秒内完成 ... .amazonaws.com/whisperx:3.8.6-cu128-amzn2023-sagemaker ）。<br />对于异步推理，需要一个名称包含“sagemaker”的 S3 存储桶。默认的 AmazonSageMakerFullAccess 策略仅授予对此类存储桶的 S3 访问权限。<br />AWS Samples 代码库中提供了一个完整、可运行的 JupyterLab 笔记本，端到端演示了这些步骤。你可以在 Amazon SageMaker AI Studio 中针对自己的音频运行它。</p>
<p>演练：实时端点<br />实时端点在同一次同步调用中返回转录文本。适用于能轻松在 60 秒上限内完成的短音频片段。图 1 是一个时序图，端到端追踪了单个实时请求的流程：从客户端调用，经容器内转录，到返回内联转录文本。<br />图 1：60 秒上限内的实时端点同步 InvokeEndpoint 流程、容器内转录和内联转录文本</p>
<p>端到端查看该执行时序：客户端组装一个 multipart/form-data 请求体（音频作为文件部分，外加 language、diarize 以及词级时间戳粒度等字段），并调用 InvokeEndpoint。Amazon SageMaker AI 将请求转发给位于 8080 端口的容器，并原封不动地传递 ContentType 及其 multipart boundary。在容器内部，WhisperX 运行语音活动检测与批处理 Whisper 转录，进行基于 wav2vec2 的强制对齐以生成逐词时间戳，并通过说话人日志化（speaker diarization）标记发言者身份。随后对结果进行序列化。运行时将转录结果（分段、带时间戳的词以及说话人标签）以内联方式返回给客户端，整个过程必须在 Amazon SageMaker AI 的 60 秒响应上限内完成。</p>
<p>创建模型与端点配置<br />sm = boto3.client(&quot;sagemaker&quot;) # WhisperX 深度学习容器镜像（Python 3.12, CUDA 12.8, Amazon Linux 2023）。REGION = &quot;us-west-2&quot; IMAGE_URI = f&quot;763104351884.dkr.ecr.{REGION}.amazonaws.com/whisperx:3.8.6-cu128-amzn2023-sagemaker&quot;<br />sm.create_model( ModelName=MODEL_NAME, PrimaryContainer={&quot;Image&quot;: IMAGE_URI}, # WhisperX DLC；large-v2 为默认模型 ExecutionRoleArn=ROLE_ARN, )<br />sm.create_endpoint_config( EndpointConfigName=ENDPOINT_CONFIG_NAME, ProductionVariants=[{ &quot;VariantName&quot;: &quot;AllTraffic&quot;, &quot;ModelName&quot;: MODEL_NAME, &quot;InitialInstanceCount&quot;: 1, &quot;InstanceType&quot;: &quot;ml.g4dn.xlarge&quot;, &quot;InferenceAmiVersion&quot;: &quot;al2-ami-sagemaker-inference-gpu-3-1&quot;, # CUDA 12.8 DLC 所需 &quot;ContainerStartupHealthCheckTimeoutInSeconds&quot;: 900, }], )<br />sm.create_endpoint(EndpointName=ENDPOINT_NAME, EndpointConfigName=ENDPOINT_CONFIG_NAME) sm.get_waiter(&quot;endpoint_in_service&quot;).wait(EndpointName=ENDPOINT_NAME)</p>
<p>带说话人日志化与词级时间戳的调用<br />构建一个 multipart/form-data 请求体，其中音频作为文件部分，并包含 language=en、diarize=true 以及 response_format=verbose_json 等字段。响应包含语音片段、逐词时间戳和说话人标签。<br />def build_multipart(audio_path, fields): &quot;&quot;&quot;根据 WhisperX DLC 规范，音频作为 `file` 部分 + 可选字符串字段。&quot;&quot;&quot; boundary = uuid.uuid4().hex body = b&quot;&quot; for name, value in fields.items(): body += (f&quot;--{boundary}\r\n&quot; f&#39;Content-Disposition: form-data; name=&quot;{name}&quot;\r\n\r\n&#39; f&quot;{value}\r\n&quot;).encode() body += (f&quot;--{boundary}\r\n&quot; f&#39;Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;audio.wav&quot;\r\n&#39; f&quot;Content-Type: audio/wav\r\n\r\n&quot;).encode() body += open(audio_path, &quot;rb&quot;).read() + b&quot;\r\n&quot; body += f&quot;--{boundary}--\r\n&quot;.encode() return body, f&quot;multipart/form-data; boundary={boundary}&quot;<br />body, content_type = build_multipart(&quot;audio.wav&quot;, { &quot;language&quot;: &quot;en&quot;, &quot;response_format&quot;: &quot;verbose_json&quot;, &quot;timestamp_granularities[]&quot;: &quot;word&quot;, # 词级时间戳 &quot;diarize&quot;: &quot;true&quot;, # 说话人标签 })<br />resp = sm_runtime.invoke_endpoint( EndpointName=ENDPOINT_NAME, ContentType=content_type, Body=body, ) transcription = json.loads(resp[&quot;Body&quot;].read())</p>
<p>示例 GitHub 代码库使用了全美航空 1549 号航班（2009 年“哈德逊河奇迹”迫降事件）空中交通管制（ATC）通信的公有领域录音。这是一段真实的各方无线电通话，伴随背景噪音、无线电压缩，以及快速念出的呼号与频率。这些条件使其成为检验转录准确性、词级时间戳和说话人日志化能力的绝佳测试。大约 3 分钟的完整录音被发送至异步端点，而一段 40 秒的片段则发送至实时端点。</p>
<p>针对原始音频的 40 秒片段运行该调用，返回了如下经过日志化并带有词级时间的转录结果：<br />[00:02] SPEAKER_01: 仙人掌 1549，左转航向 270。<br />[00:04] SPEAKER_00: 这里是仙人掌 1539，先飞往普莱西德峰（Placid Crest），我希望能够返航拉瓜迪亚机场。<br />[00:11] SPEAKER_01: 好的，你需要返航拉瓜迪亚，左转航向 220。<br />[00:14] SPEAKER_01: 220。<br />[00:18] SPEAKER_01: 塔台，暂停停靠，他有紧急情况正在返航。<br />[00:22] SPEAKER_01: 是谁？<br />[00:23] SPEAKER_01: 是 1529，他，呃，遭遇鸟击，双发失效，引擎失去推力，所以他要立即返航。<br />[00:28] SPEAKER_01: 收到，是 1529，哪台引擎？<br />[00:30] SPEAKER_01: 他说双发都失去了推力。<br />[00:32] SPEAKER_01: 明白。<br />[00:34] SPEAKER_01: 收到，是 1529，如果我们能为你安排，你想尝试降落 131.3 吗？</p>
<p>操作演练：异步端点<br />异步端点解除了 60 秒的上限限制，是处理长音频的推荐途径。输入和输出均通过 Amazon S3 进行中转，并通过轮询获取结果。图 2 是一张时序图，追踪了完整的异步生命周期，从 S3 上传和 InvokeEndpointAsync 调用，到容器处理，再到 S3 输出与失败路径。</p>
<p>图 2：异步端点基于 S3 引用传递的 InvokeEndpointAsync 流程、单 worker 处理，以及经由 S3 输出和失败路径返回结果</p>
<p>端到端查看该执行时序：客户端将 multipart 请求体上传至 Amazon S3，并携带该对象的 InputLocation 调用 InvokeEndpointAsync。它会立即接收到 OutputLocation 和 FailureLocation，而无需等待转录结果。Amazon SageMaker AI 从 Amazon S3 读取输入，并将其转发给位于 8080 端口的容器。在那里，运行相同的语音活动检测、批处理转录、强制对齐和日志化流水线，每个容器一次处理一个请求。成功时，容器将转录结果写入 S3 输出路径，或将错误文档写入失败路径。客户端轮询输出路径以获取结果并检查失败路径，从而使失败的任务暴露错误，而不是无限循环。由于工作是通过 Amazon S3 协调中转的，因此该路径不受 60 秒上限的约束，适合长音频。</p>
<p>创建异步端点配置<br />与实时端点相比，唯一的结构性差异在于端点配置：它添加了包含 S3 OutputPath 和 S3FailurePath 的 AsyncInferenceConfig。将 MaxConcurrentInvocationsPerInstance 设置为 1，以匹配容器的单 worker 限制，并保持相同的 InferenceAmiVersion 锁定。IMAGE_URI 与实时端点所使用的 WhisperX DLC 相同。<br /># 与实时端点相同的 WhisperX DLC 镜像。IMAGE_URI = f&quot;763104351884.dkr.ecr.{REGION}.amazonaws.com/whisperx:3.8.6-cu128-amzn2023-sagemaker&quot;<br />sm.create_model( ModelName=ASYNC_MODEL_NAME, PrimaryContainer={&quot;Image&quot;: IMAGE_URI}, # WhisperX DLC ExecutionRoleArn=ROLE_ARN, )</p>
<p>```python<br />sm.create_endpoint_config(<br />    EndpointConfigName=ASYNC_ENDPOINT_CONFIG_NAME,<br />    ProductionVariants=[{<br />        &quot;VariantName&quot;: &quot;AllTraffic&quot;,<br />        &quot;ModelName&quot;: ASYNC_MODEL_NAME,<br />        &quot;InitialInstanceCount&quot;: 1,<br />        &quot;InstanceType&quot;: &quot;ml.g5.2xlarge&quot;,<br />        &quot;InferenceAmiVersion&quot;: &quot;al2-ami-sagemaker-inference-gpu-3-1&quot;,<br />        &quot;ContainerStartupHealthCheckTimeoutInSeconds&quot;: 1200,<br />    }],<br />    AsyncInferenceConfig={<br />        &quot;OutputConfig&quot;: {<br />            &quot;S3OutputPath&quot;: f&quot;s3://{BUCKET}/whisperx-async/output/&quot;,<br />            &quot;S3FailurePath&quot;: f&quot;s3://{BUCKET}/whisperx-async/failure/&quot;,<br />        },<br />        &quot;ClientConfig&quot;: {&quot;MaxConcurrentInvocationsPerInstance&quot;: 1}, # 每个容器处理 1 个请求<br />    },<br />)<br />sm.create_endpoint(EndpointName=ASYNC_ENDPOINT_NAME, EndpointConfigName=ASYNC_ENDPOINT_CONFIG_NAME)<br />sm.get_waiter(&quot;endpoint_in_service&quot;).wait(EndpointName=ASYNC_ENDPOINT_NAME)<br />```</p>
<p>其余工作流程与实时端点演练完全相同。构建 multipart/form-data 请求（build_multipart 辅助函数和转录字段）保持不变。你使用 invoke_endpoint_async 通过 S3 引用提交请求，而不是使用 invoke_endpoint，然后从 OutputLocation 读取转录文本并检查 FailureLocation。资源清理过程也相同。</p>
<p>将完整的约 3 分钟录音提交至异步端点后，返回以下转录内容（仅显示前五行和后五行）：</p>
<p>[00:02] SPEAKER_00: Cactus 1549, turn left heading 270.<br />[00:04] SPEAKER_01: This is Cactus 1539, head first to Placid Crest, I&#39;m hoping it&#39;s returning back towards LaGuardia.<br />[00:11] SPEAKER_00: Okay, you need to return to LaGuardia, turn left heading of 220.<br />[00:14] SPEAKER_00: 220.<br />[00:18] SPEAKER_00: Tower, stoppy to park, he&#39;s got emergency returning.<br />......<br />[02:38] SPEAKER_02: 2-1-0, 4718, I think he said he&#39;s going in the Hudson.<br />[02:43] SPEAKER_00: Cactus 1529, Houston.<br />[02:51] SPEAKER_00: Cactus 1529, if you can, you got runway 29 available at Newark, it&#39;ll be 2 o&#39;clock in 7 miles.<br />[03:01] SPEAKER_00: You can fly 4718, climb and maintain 1-2-thousand.<br />[03:04] SPEAKER_02: 1-2-thousand, and keep it private, please.</p>
<p>GPU 端点在删除之前会持续计费。操作完成后，请删除两个端点的 endpoint、endpoint config 和 model，并清理不再需要的 S3 输入与输出构件。</p>
<p>```python<br /># GPU 端点在删除前会持续计费。为每个端点依次删除 endpoint -&gt; config -&gt; model。<br />for name, cfg, model in [<br />    (ENDPOINT_NAME, ENDPOINT_CONFIG_NAME, MODEL_NAME),<br />    (ASYNC_ENDPOINT_NAME, ASYNC_ENDPOINT_CONFIG_NAME, ASYNC_MODEL_NAME),<br />]:<br />    sm.delete_endpoint(EndpointName=name)<br />    sm.delete_endpoint_config(EndpointConfigName=cfg)<br />    sm.delete_model(ModelName=model)<br />```</p>
<p>最佳实践与生产环境考量</p>
<p>固定 GPU AMI 版本——在 GPU 变体上务必设置 InferenceAmiVersion=al2-ami-sagemaker-inference-gpu-3-1。默认的主机 AMI 提供的驱动程序无法启动此 CUDA 12.8 镜像。</p>
<p>按实例扩展而非按并发扩展——推理过程被序列化为每个容器一次仅处理一个请求。在异步端点上将 MaxConcurrentInvocationsPerInstance 设置为 1，并通过增加实例或容器数量来提升吞吐量。</p>
<p>将异步端点自动缩容至零——对于具有突发性的批处理工作负载，可以在空闲时将异步端点缩容至零个实例以节约成本，并使用 Amazon Simple Notification Service (Amazon SNS) 完成通知，而不是频繁轮询。</p>
<p>合理选型 GPU，并使用实例池确保可用性——出于成本考虑可使用 ml.g4dn.xlarge (T4)，为保留算力裕量可选用 ml.g5.2xlarge (A10G)。为避免容量不足错误（insufficient-capacity errors），可以在 Amazon SageMaker AI 实例池中最多列出五个实例类型。系统会优先预置优先级最高的类型，并在容量不足时自动故障转移回退。</p>
<p>保护 S3 构件的安全——在异步存储桶上开启 S3 阻止公开访问（Block Public Access）、默认的 SSE-S3 或 SSE-KMS 加密，以及 BucketOwnerEnforced 所有权控制。将执行角色权限严格限制在特定的存储桶和键上。</p>
<p>妥善处理个人身份信息（PII）——通话和会议的转录文本可能包含敏感数据，因此请加密构件、限制访问权限，并利用字级时间戳在下游进行敏感信息脱敏。</p>
<p>监控与重试——使用 Amazon CloudWatch 进行监控，针对故障设置告警，并围绕前文所述的冷启动行为设置重试机制。如需对 GPU 和推理进行更深入的监控，请在 CloudWatch 上开启 Amazon SageMaker AI 详细指标和 Insights 控制面板。</p>
<p>在本文中，我们展示了如何将 AWS WhisperX 深度学习容器部署至 Amazon SageMaker AI，以实现带说话人标签的字级转录。我们针对简短的交互式音频片段使用了实时端点，针对长时长、大体量的音频使用了异步端点。我们探讨了至关重要的生产环境细节：必需的 GPU AMI 版本锁定、单容器单请求扩展、S3 存储桶命名以及成本控制。</p>
<p>如需进一步深入了解，请查阅 WhisperX DLC 部署指南，了解 Amazon SageMaker AI 异步推理，并结合您自己的音频试用配套的演示笔记本。您还可以在 AWS Samples GitHub 仓库中找到完整的运行示例。</p>
<p>作者感谢 AWS Deep Learning Containers 和 Amazon SageMaker AI 团队对本示例的技术评审和贡献。</p>
<p>Ayush 是 AWS 的高级 AI 专家解决方案架构师，专注于与独立软件开发商（ISV）和初创公司在生成式 AI 领域展开合作。他的兴趣涵盖多智能体架构以及在大规模环境下确保自主 AI 系统可靠性的设计模式。他紧密参与整个 AWS AI/ML 栈中的模型部署、微调和高成本效益推理工作，热衷于将前沿的 AI 研究转化为实用的现实系统。</p>
<p>Daniel 是 AWS 的解决方案架构师，专注于前沿 AI 初创企业。作为前初创公司首席技术官（CTO），他热衷于与创始人及工程主管合作，推动在 AWS 上的增长与创新。工作之余，Daniel 喜欢手拿咖啡散步、亲近自然并学习新知识。</p>
<p>Dmitry 是 AWS SageMaker 推理领域专家解决方案架构全球主管。他帮助客户设计、构建和优化生成式 AI 及机器学习解决方案，对深度学习及大规模机器学习部署充满热情。他热衷于持续创新并利用数据驱动业务成果。</p>
<p>Yadan 是 AWS Deep Learning Containers 团队的软件开发工程师。他负责构建打包经过测试的框架版本、依赖项以及适用于 Amazon SageMaker AI、Amazon Elastic Compute Cloud (Amazon EC2)、Amazon Elastic Container Service (Amazon ECS) 和 Amazon Elastic Kubernetes Service (Amazon EKS) 的 AWS 部署配置容器，包括本文所使用的 vLLM-Omni DLC。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【AWS Machine Learning Blog (亚马逊云科技官方英文)】于 2026-09-25 00:20 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#AWS</span>
</div>

<div class="news-card-footer"><a href="https://aws.amazon.com/blogs/machine-learning/speaker-labeled-transcription-with-whisperx-on-sagemaker-ai/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【AWS Machine Learning Blog (亚马逊云科技官方英文)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-gentcore-gateway-and-mcp-0483f47aaf2d83c4" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="15757" data-content-paragraphs="74" data-published-at="2026-09-24T16:12:47.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/aws.svg" class="source-icon" alt="AWS Machine Learning Blog (亚马逊云科技官方英文)" width="16" height="16" /> <strong>AWS Machine Learning Blog (亚马逊云科技官方英文)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-09-25 00:12</span>
</div>

### [要闻：企业越来越希望 AI Agent（智能体）能够对分散在多个 AWS 账户中的数据进行推理，而无需对数据进行复制或](https://aws.amazon.com/blogs/machine-learning/build-a-multi-account-ai-agent-with-agentcore-gateway-and-mcp/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Build a multi-account AI agent with AgentCore Gateway and MCP</div>

<div class="article-cover"><img src="https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/09/21/ML-20091-1.png" alt="要闻：企业越来越希望 AI Agent（智能体）能够对分散在多个 AWS 账户中的数据进行推理，而无需对数据进行复制或" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>企业越来越希望 AI Agent（智能体）能够对分散在多个 AWS 账户中的数据进行推理，而无需对数据进行复制或集中化存储。各个团队出于充分的考量将数据保留在各自的账户中：权责边界清晰、范围隔离以及具备独立的部署生命周期。然而，一个只能访问单一账户数据的 Agent 所能提供的价值十分有限，而将其连接到分布式数据源通常又意味着需要复制数据或梳理复杂的跨账户 AWS Identity and Access Management (IAM) 权限。本方案的目标是让数据保留在其原本所属的各个业务线（LOB）账户中。在查询发生时，仅有请求所需的特定数据才会流出，因此底层数据集无需离开其所属的账户。</p>
<p>在本文中，您将使用 Amazon Bedrock AgentCore Gateway 和模型上下文协议（Model Context Protocol，MCP），构建一个既能将各团队的数据保留在各自账户中、又能为 Agent 提供统一跨账户查询方式的多账户架构。Amazon Bedrock AgentCore 是一项用于安全、大规模构建、部署和运行高效 Agent 的智能体服务。中央平台账户托管 Agent 层，并通过 Amazon Bedrock 进行大语言模型（LLM）推理。各 LOB 团队将其数据和工具以 MCP 服务器的形式暴露，平台账户的 AgentCore Gateway 则为 Agent 提供统一的端点，用于在已注册的各 LOB 间进行工具发现和调用。在此过程中，您将配置跨账户 MCP 集成、基于 AgentCore Identity（Amazon Bedrock AgentCore 的一项功能）和 Okta 的身份验证、基于 Policy in Amazon Bedrock AgentCore 的细粒度授权，以及支持生产就绪性的治理管控。</p>
<p>该架构遵循包含三层的多账户模型：中央平台账户、分布式 LOB 账户，以及作为连接二者之集成层的 AgentCore Gateway。</p>
<p>平台账户 —— Agent 控制平面</p>
<p>平台团队负责管理平台账户，该账户在 AgentCore Runtime（Amazon Bedrock AgentCore 的一项功能）上运行 Agent。AgentCore Runtime 是一个无服务器、与框架无关的环境，在专用微虚拟机（microVM）中实现会话隔离，采用按用量计费模式，并内置身份验证能力。为了使演练过程保持清晰，本文采用单个 Agent 进行演示，但相同的模式也支持在平台账户中运行多个 Agent。Agent 连接到平台账户的 Gateway，而不是连接到各个独立的 LOB MCP 服务器。</p>
<p>LLM 推理通过 Amazon Bedrock 在平台账户中运行。平台团队负责控制可用的基础模型（FM）、应用 Amazon Bedrock Guardrails，并通过单一计费边界跟踪成本，从而避免了在数十个 LOB 账户中管理模型配额的运维开销。随着需求的增长，部分组织会将推理分布在多个专用的推理账户中，并在前端部署 AgentCore Gateway 作为推理网关（Inference Gateway），以便在不同模型提供商之间路由流量，根据请求选择提供商，并应用按团队划分的速率限制。</p>
<p>平台账户中的 AgentCore Gateway 充当面向 Agent 的单一 MCP 端点。它将每个 LOB 账户的 MCP 服务器注册为目标，并通过该单一端点提供具备语义搜索功能的统一步骤工具发现、通过 AgentCore Identity 实现的集中身份验证、通过 Policy in AgentCore 实现的细粒度授权，以及可观测性能力。</p>
<p>除了聚合 MCP 服务器和充当推理网关之外，AgentCore Gateway 还支持其他目标类型，使其成为中央集成枢纽。HTTP 目标可将 AgentCore Runtime Agent、Agent 到 Agent（A2A）服务以及其他 HTTP 端点纳入同一个受监管的端点中，每个端点均可通过其独立的子路径进行寻址。平台团队还可以应用 Amazon Bedrock Guardrails 来保障内容安全，并配置 Policy in AgentCore (Cedar) 实现细粒度的访问控制，这两者均在 Agent 代码之外的 Gateway 层实施强制管控。</p>
<p>LOB 账户 —— 数据与工具</p>
<p>各 LOB 团队并未直接暴露原始 AWS 资源（如 Amazon Simple Storage Service (Amazon S3) 存储桶、数据库、Amazon Bedrock 知识库），而是将其数据和工具打包为 MCP 服务器。零售银行团队暴露了诸如 get_balance 和 get_profile 之类的工具。贷款团队则提供 get_credit_score 以及 search_lending_policies，后者针对银行政策 PDF 文档，调用 Amazon Bedrock 知识库中完全托管的检索增强生成（RAG）功能进行查询。该参考架构在 MCP 服务器内部封装了独立的 Amazon Bedrock 知识库，以便对检索流水线进行细粒度控制。对于新构建的项目，您也可以选择将 Amazon Bedrock 托管知识库直接作为原生连接器挂载到 Gateway，这样 Agent 就能通过标准 MCP 调用对其进行查询，您无需运维任何检索基础设施。</p>
<p>MCP 服务器运行在 LOB 账户的 AgentCore Runtime 上，这是一个无服务器、与框架无关的环境，具备专用 microVM 会话隔离、按用量计费、基于 AgentCore Identity 的内置身份验证以及针对 Agent 的专用可观测性。这使 LOB 团队对其工具表面拥有完全的所有权：他们决定暴露哪些内容以及每个工具背后运行何种业务逻辑；只要 MCP 工具接口保持一致，他们就可以更改底层实现而不会影响平台 Agent。</p>
<p>跨账户集成：Gateway 与 Identity 连接各层</p>
<p>该架构遵循中心辐射（hub-and-spoke）模式：每个 LOB 使用基于可流式 HTTP（Streamable HTTP）的 MCP 部署一个独立的 MCP 服务器（辐射节点/spoke），而 AgentCore Gateway（中心节点/hub）则将它们聚合在单一端点之后。Agent 将 Gateway 视为一个单一的 MCP 服务器进行连接，Gateway 负责在已注册的各 LOB 目标之间联合分发工具调用。当 Agent 调用某个工具时，Gateway 会从 AgentCore Identity 获取 OAuth 2.0 机器对机器（M2M）凭据，将其附加到出站请求中，并路由至正确的 LOB MCP 服务器；该服务器在本地处理请求之前，会针对 Okta 的 OpenID Connect (OIDC) 端点对令牌进行身份验证。</p>
<p>LOB 的数据保留在自己的账户中：MCP 服务器仅返回工具生成的具体结果，而非原始数据集，该结果作为推理上下文流向平台账户。源数据不会被复制或迁移。</p>
<p>图 1：使用 AgentCore Gateway 和 MCP 的多账户 AI Agent 架构</p>
<p>以下流程追踪了用户提问在跨越账户边界、调用分布式工具并返回统一步骤答案的完整过程：</p>
<p>用户通过 React Web 应用登录，该应用重定向至 Okta 进行身份验证。<br />Okta 验证用户凭据并返回包含身份声明（sub、groups、audience）的 JSON Web Token (JWT)。<br />用户通过 Web 应用提交 Prompt（提示词），请求通过 HTTPS 到达 Amazon CloudFront。<br />CloudFront 将请求转发给运行在采用 AWS Fargate 的 Amazon Elastic Container Service (Amazon ECS) 上的 FastAPI 后端。</p>
<p>后端在用户输入到达 Agent 之前，应用 Amazon Bedrock Guardrails 对个人身份信息（PII）进行脱敏处理；在 Agent 的输出到达用户之前，也会再次进行脱敏。</p>
<p>后端调用位于 AgentCore Runtime 上的 Strands Agent，并在 Authorization 标头中转发用户的 JWT 以实现身份传递。</p>
<p>Agent 将提示词发送至 Amazon Bedrock 进行推理。根据模型的响应，Agent 确定要调用的工具。</p>
<p>Agent 将用户的 JWT 转发至 AgentCore Gateway，Gateway 利用语义搜索在各业务线（LOB）目标中进行工具发现。AgentCore 中的策略系统（当策略引擎与 Gateway 关联时）会根据 Cedar 规则评估 JWT 声明，并根据用户身份、角色或操作允许或拒绝每次工具调用。由于出站调用采用 M2M（机器对机器），因此用户级授权在此处的 Gateway 强制执行。</p>
<p>对于获准的调用，Gateway 会从 AgentCore Identity 获取 OAuth 2.0 M2M 凭据，将其附加至出站请求中，并转发给相应的 LOB MCP 服务器。每个 LOB MCP 服务器在处理前都会验证传入的 OAuth 令牌。</p>
<p>LOB MCP 服务器运行其工具逻辑：(a) 针对本地 Amazon DynamoDB 表进行结构化数据查询；(b) 对于借贷与财富（Lending &amp; Wealth）业务线，还会针对存储在 Amazon S3 中并通过 Amazon OpenSearch Serverless 编制索引的银行政策 PDF，在 Amazon Bedrock Knowledge Bases 上执行 RAG 检索。</p>
<p>结果沿着相同的链路回流（LOB 到 Gateway 再到 Agent，最后返回后端），示例应用程序中的追踪面板会显示访问了哪些 LOB 以及 AgentCore 策略的拒绝记录。每个 LOB 运行时都会验证传入的 OAuth 令牌。在生产环境中，LOB 团队会配置 allowedWorkloadConfiguration，将运行时调用限制为身份链路中包含 Gateway 的请求，从而降低绕过 Gateway 策略和 Cedar 授权进行直接访问的风险。</p>
<p>Strands Agent 通过 Gateway 的 tools/list 方法发现 LOB 工具，并在启动时查询 AWS Agent Registry（预览版）以发现已注册的 LOB MCP 服务器。接入新的 LOB 仅需添加一个 Gateway 目标。Agent 会在下一次调用 tools/list 时发现新工具。</p>
<p>技术实现</p>
<p>以下各节将逐步介绍该架构的各个层次：LOB 团队如何构建和部署 MCP 服务器，平台团队如何为 AgentCore Gateway 配置 OAuth 出站身份验证及 AgentCore 策略授权，以及随着工具和模型的演进，持续评估如何帮助保持 Agent 的可靠性。如需完整实现，请克隆配套代码仓库并运行部署脚本，该脚本将在四个账号中引导启动 AWS Cloud Development Kit (AWS CDK)，预置平台和 LOB 资源，部署 MCP 服务器和 Gateway 目标，并在 CloudFront 后方的 Amazon ECS 上启动 React Web 应用程序。</p>
<p>配套代码仓库假定满足以下条件：<br />- 通过 AWS Organizations 管理的 AWS 多账号架构，其中平台账号和 LOB 账号属于同一个组织。<br />- 平台账号中拥有 Amazon Bedrock 模型访问权限。<br />- 在平台账号（用于 Agent、Gateway 和 Registry）以及每个 LOB 账号（用于在 Runtime 上托管 MCP 服务器）中均配置了 AgentCore。<br />- 具备兼容 OIDC 的身份提供商（如 Okta、Amazon Cognito 或 Microsoft Entra ID），并包含用于 OAuth 2.0 客户端凭据授权的 M2M 应用客户端。代码仓库使用的是 Okta。<br />- MCP 服务器将封装的 LOB 数据源（Amazon Bedrock Knowledge Bases、Amazon DynamoDB 表、Amazon S3 存储桶或 API 端点）。</p>
<p>在 LOB 账号中设置 MCP 服务器</p>
<p>每个 LOB 团队使用 FastMCP 构建 MCP 服务器，并通过 AgentCore CLI 将其部署到 AgentCore Runtime，从而将团队的数据公开为具有类型化输入和输出的结构化工具。每个 LOB 团队为其服务器配置 customJWTAuthorizer，以根据 Okta 的 OIDC 发现端点对入站 OAuth 令牌进行身份验证，因此请求在调用 LOB 工具之前必须提供有效令牌。为实现生产级加固，可将 Runtime 上的 allowedWorkloadConfiguration 设置为 Gateway 的 Amazon 资源名称（ARN），以配置其仅在身份链路包含该 Gateway 时接受请求。本示例依赖 OAuth 受众（audience）验证作为其主要访问控制。添加 allowedWorkloadConfiguration 有助于将调用限制为通过 Gateway 到达的请求，降低绕过 Gateway 策略的直接访问风险。</p>
<p>此代码片段展示了借贷与财富 LOB 的 MCP 服务器，结合了 Amazon DynamoDB 查询与 Amazon Bedrock Knowledge Bases 检索：</p>
<p>```python<br />REGION = os.environ.get(&quot;AWS_REGION&quot;, &quot;us-east-1&quot;)<br />dynamodb = boto3.resource(&quot;dynamodb&quot;, region_name=REGION)<br />bedrock_agent_runtime = boto3.client(&quot;bedrock-agent-runtime&quot;, region_name=REGION)<br />KNOWLEDGE_BASE_ID = os.environ.get(&quot;KNOWLEDGE_BASE_ID&quot;, &quot;&quot;)</p>
<p>mcp = FastMCP(&quot;lending-wealth&quot;, host=&quot;0.0.0.0&quot;, stateless_http=True)</p>
<p>@mcp.tool()<br />def get_credit_score(customer_id: str) -&gt; dict:<br />    &quot;&quot;&quot;获取客户的信用评分及影响因素。&quot;&quot;&quot;<br />    table = dynamodb.Table(&quot;CreditScores&quot;)<br />    resp = table.get_item(Key={&quot;customer_id&quot;: customer_id})<br />    item = resp.get(&quot;Item&quot;)<br />    if not item:<br />        return {&quot;error&quot;: f&quot;未找到客户 {customer_id} 的信用评分&quot;}<br />    return item</p>
<p>@mcp.tool()<br />def search_lending_policies(query: str) -&gt; str:<br />    &quot;&quot;&quot;检索银行借贷政策文档中的指导方针、准入标准和监管要求。&quot;&quot;&quot;<br />    if not KNOWLEDGE_BASE_ID:<br />        return json.dumps({&quot;error&quot;: &quot;未配置 KNOWLEDGE_BASE_ID&quot;})<br />    resp = bedrock_agent_runtime.retrieve(<br />        knowledgeBaseId=KNOWLEDGE_BASE_ID,<br />        retrievalQuery={&quot;text&quot;: query},<br />        retrievalConfiguration={&quot;vectorSearchConfiguration&quot;: {&quot;numberOfResults&quot;: 5}},<br />    )<br />    chunks = []<br />    for r in resp.get(&quot;retrievalResults&quot;, []):<br />        text = r.get(&quot;content&quot;, {}).get(&quot;text&quot;, &quot;&quot;)<br />        source = r.get(&quot;location&quot;, {}).get(&quot;s3Location&quot;, {}).get(&quot;uri&quot;, &quot;&quot;)<br />        if text:<br />            chunks.append({&quot;text&quot;: text, &quot;source&quot;: os.path.basename(source)})<br />    return json.dumps({&quot;results&quot;: chunks}, default=str)</p>
<p>if __name__ == &quot;__main__&quot;:<br />    mcp.run(transport=&quot;streamable-http&quot;)<br />```</p>
<p>使用 AgentCore CLI 将 MCP 服务器部署到 AgentCore Runtime。configure 步骤设置入口点和协议。deploy 步骤对其进行打包和推送：</p>
<p>```bash<br /># 配置 MCP 服务器<br />agentcore configure \<br />  --entrypoint server.py \<br />  --name lending_wealth_mcp \<br />  --protocol MCP \<br />  --disable-memory \<br />  --non-interactive \<br />  --authorizer-config &#39;{<br />    &quot;customJWTAuthorizer&quot;: {<br />      &quot;discoveryUrl&quot;: &quot;https://example.okta.com/.well-known/openid-configuration&quot;,<br />      &quot;allowedAudience&quot;: [&quot;lobfederation&quot;]<br />    }<br />  }&#39;</p>
<p># 部署到 AgentCore Runtime<br />agentcore deploy --auto-update-on-conflict \<br />  --env KNOWLEDGE_BASE_ID=<br />```</p>
<p>部署完成后，CLI 会返回一个运行时 ARN，平台团队使用该 ARN 将 MCP 服务器注册为 Gateway 目标。</p>
<p>配置 AgentCore Gateway</p>
<p>在平台账户中，使用指向 Okta 的 OIDC 发现 URL 并验证受众（aud）声明的自定义 JWT 授权方（Custom JWT authorizer）创建网关（Gateway），以限制能够连接的应用程序：<br />ctrl.update_gateway( gatewayIdentifier=gateway_id, name=&quot;lobfederation-gateway&quot;, protocolType=&quot;MCP&quot;, protocolConfiguration={ &quot;mcp&quot;: { &quot;searchType&quot;: &quot;SEMANTIC&quot;, &quot;supportedVersions&quot;: [&quot;2025-03-26&quot;], } }, authorizerType=&quot;CUSTOM_JWT&quot;, authorizerConfiguration={ &quot;customJWTAuthorizer&quot;: { &quot;discoveryUrl&quot;: &quot;https:// /oauth2/ /.well-known/openid-configuration&quot;, &quot;allowedAudience&quot;: [&quot;lobfederation&quot;], } }, )</p>
<p>对于面向各业务线（LOB）MCP 服务器的出站身份验证，网关使用 OAuth 2.0 客户端凭证授权方式（M2M）。平台团队在 AgentCore Identity 中注册一个存储 Okta M2M 客户端凭据的 OAuth 凭证提供商。当网关调用 LOB MCP 服务器时，AgentCore Identity 会从 Okta 获取最新的访问令牌，并在 Authorization 标头中传递。注册该凭据提供商并将其附加到每个网关目标：<br /># Register an OAuth credential provider (M2M / client_credentials)<br />resp = ctrl.create_oauth2_credential_provider( name=&quot;lobfederation-okta-m2m&quot;, credentialProviderVendor=&quot;CustomOauth2&quot;, oauth2ProviderConfigInput={ &quot;customOauth2ProviderConfig&quot;: { &quot;oauthDiscovery&quot;: { &quot;discoveryUrl&quot;: &quot;https:// /oauth2/ /.well-known/openid-configuration&quot; }, &quot;clientId&quot;: &quot; &quot;, &quot;clientSecret&quot;: &quot; &quot;, &quot;clientAuthenticationMethod&quot;: &quot;CLIENT_SECRET_BASIC&quot;, } }, )<br />cred_arn = resp[&quot;credentialProviderArn&quot;]</p>
<p># Create a Gateway target for the LOB MCP server with OAuth outbound auth<br />ctrl.create_gateway_target( gatewayIdentifier=gateway_id, name=&quot;lending-wealth&quot;, description=&quot;Lending &amp; Wealth --- loans, credit scores, eligibility, policy search&quot;, targetConfiguration={ &quot;mcp&quot;: { &quot;mcpServer&quot;: { &quot;endpoint&quot;: f&quot;https://bedrock-agentcore.{REGION}.amazonaws.com/runtimes/{encoded_runtime_arn}/invocations&quot;, } } }, credentialProviderConfigurations=[ { &quot;credentialProviderType&quot;: &quot;OAUTH&quot;, &quot;credentialProvider&quot;: { &quot;oauthCredentialProvider&quot;: { &quot;providerArn&quot;: cred_arn, &quot;scopes&quot;: [&quot;lobfederation.invoke&quot;], &quot;grantType&quot;: &quot;CLIENT_CREDENTIALS&quot;, } }, } ], )</p>
<p>当 LOB 工具必须自行执行每用户访问控制（例如行级安全性）时，AgentCore Identity 还提供代行（on-behalf-of，OBO）令牌交换，其中网关将入站用户令牌交换为同时携带智能体和用户身份的下游范围令牌。本实现采用 M2M，因为示例中使用的 Okta 开发者账户不支持 OBO 流程。AgentCore Gateway 还支持授权码授权和 API 密钥。有关示例，请参见 AgentCore Gateway 出站身份验证示例。</p>
<p>将 Strands 智能体部署到 AgentCore Runtime，并配置用于入站身份验证的自定义 JWT 授权方。部署脚本在初始部署后通过 AgentCore 控制平面 API 应用授权方配置。在请求时，智能体将用户的 JWT 转发到网关，以便 AgentCore 中的策略（Policy）在路由每次工具调用之前评估用户的声明：<br />{ &quot;agents&quot;: [ { &quot;name&quot;: &quot;lobfederation-agent&quot;, &quot;authorizerType&quot;: &quot;CUSTOM_JWT&quot;, &quot;authorizerConfiguration&quot;: { &quot;customJwtAuthorizer&quot;: { &quot;discoveryUrl&quot;: &quot;https:// /oauth2/ /.well-known/openid-configuration&quot;, &quot;allowedAudience&quot;: [&quot;lobfederation&quot;] } }, &quot;requestHeaderAllowlist&quot;: [&quot;Authorization&quot;] } ] }</p>
<p>部署完成后，智能体从入站请求标头中读取用户的 JWT，并将其传递给 AgentCore Gateway。这样就将最终用户身份传递给了 Cedar 策略引擎，而无需智能体解析或修改该令牌：<br />@app.entrypoint<br />def invoke(payload, context=None):<br />    prompt = payload.get(&quot;prompt&quot;, &quot;Hello&quot;)</p>
<p># Read the user&#39;s JWT from inbound request headers (passed through by Runtime)<br />    request_headers = context.request_headers if context else {}<br />    user_jwt = request_headers.get(&quot;Authorization&quot;, &quot;&quot;)</p>
<p># Connect to Gateway with the user&#39;s JWT --- Cedar evaluates per-user policies<br />    mcp_client = MCPClient( lambda: streamablehttp_client( url=GATEWAY_URL, headers={&quot;Authorization&quot;: user_jwt}, ) )</p>
<p>with mcp_client:<br />        tools = mcp_client.list_tools_sync()<br />        agent = Agent(model=MODEL_ID, system_prompt=SYSTEM_PROMPT, tools=tools)<br />        result = agent(prompt)</p>
<p>智能体部署完成后，平台团队通过持续评估、安全版本灰度发布和可观测性来维持其可靠性。</p>
<p>持续评估</p>
<p>在智能体跨多个 LOB 编排工具的多账户架构中，随着工具、模型和提示词的演进，平台团队需要确保其始终保持正确运行。AgentCore Evaluations 提供了一个托管框架，有助于在回归问题波及客户之前将其捕获。</p>
<p>在线评估使用工具选择准确率（Tool Selection Accuracy）、正确性（Correctness）和目标达成率（Goal Success Rate）等内置评估器，对实时生产流量的抽样（例如会话的 10%）进行持续打分。评分呈现在由 Amazon CloudWatch 支持的 Amazon Bedrock AgentCore 功能——AgentCore Observability 仪表盘中，当质量下降时会触发告警；若智能体已发出 OpenTelemetry 跟踪，则无需更改任何代码。这能够揭示延迟和错误率监控所忽略的隐性衰退，例如智能体将贷款查询路由到了错误的 LOB。</p>
<p>按需评估是面向开发以及持续集成与持续交付（CI/CD）的实时 API。团队只需定义一次评估数据集（场景与预期响应、工具轨迹及目标断言成对配置），AgentCore Evaluations 便会在每次变更时利用数据集评估进行重放。由于这两种模式共享相同的评估器，团队在部署前设定的准入门槛与生产环境中监控的指标完全一致。为了形成闭环，AgentCore Optimization 会分析生产跟踪记录，并给出提示词和工具描述的改进建议，并在发布前完成验证。</p>
<p>安全进行版本管理与发布</p>
<p>你在 AgentCore Runtime 上部署智能体，并使用指向特定版本的端点（prod、staging、dev）。当平台团队更新智能体的提示词或模型时，发布一个新版本并更新端点即可，由于工具接口保持不变，LOB MCP 服务器不会受到任何影响。在晋级变更之前，团队可以通过 AgentCore Gateway 运行 A/B 测试，在当前版本和候选版本之间切分实时流量。一旦结果达到统计显著性，平台团队就会晋级胜出的配置。</p>
<p>AgentCore 通过 Amazon CloudWatch 和 OpenTelemetry 提供内置可观测性。平台团队可以监控调用延迟、错误率和令牌使用量，并通过 CloudWatch 跨账户可观测性查看来自 LOB MCP 服务器的指标和日志，无需切换账户。</p>
<p>安全性、治理与成本管理</p>
<p>将 Agent 集中化管理同时对数据进行分布式存储，会带来特定的治理要求：控制谁可以调用哪些工具、审计跨账户调用、执行负责任的 AI 策略，以及将成本归因回触发这些调用的业务线（LOB）。</p>
<p>最小权限访问与数据所有者审批<br />LOB 团队通过在其 AgentCore Runtime 部署上配置 JWT 鉴权器，来控制谁可以调用其 MCP 服务器。只有在 LOB 团队将其实例配置为接受来自平台身份提供商的令牌之后，来自平台账户 Gateway 的请求才能到达该 LOB 的工具。这种审批独立于平台团队。即使 Gateway 添加了新的目标，LOB 的 MCP 服务器也会拒绝未经身份验证的请求。</p>
<p>AgentCore 中的策略授权<br />Gateway 以 ENFORCE（强制执行）模式运行 AgentCore 策略，在针对用户的 JWT 声明（来自 Agent 转发的令牌）路由每次工具调用之前对规则进行评估。AgentCore 策略采用 Cedar 策略语言，因此规则是明确的 permit（允许）和 forbid（禁止）语句。例如，策略可以允许所有已认证用户使用类似 get_balance 的只读工具，同时将 transfer_funds 等写入操作限制给特定角色，或完全阻止 delete_customer 等破坏性操作：<br />// 允许所有已认证用户调用只读工具<br />permit(<br />    principal is AgentCore::OAuthUser,<br />    action in [<br />        AgentCore::Action::&quot;retail-banking___get_customer&quot;,<br />        AgentCore::Action::&quot;retail-banking___get_accounts&quot;,<br />        AgentCore::Action::&quot;retail-banking___get_balance&quot;,<br />        AgentCore::Action::&quot;tools/list&quot;,<br />        AgentCore::Action::&quot;initialize&quot;<br />    ],<br />    resource<br />);<br />// 无论用户是谁，均阻止破坏性操作<br />forbid(<br />    principal,<br />    action == AgentCore::Action::&quot;retail-banking___delete_customer&quot;,<br />    resource<br />);<br />由于 AgentCore 中的策略采用默认拒绝（default-deny）模型，因此只有包含显式 permit 的操作才会成功执行。这使平台团队能够对 Agent 在各注册 LOB 中可执行的操作进行集中控制，同时各 LOB 团队仍在 MCP 服务器级别保留各自的授权控制权。</p>
<p>网络连通性与 VPC 考量<br />该参考实现采用 AgentCore Runtime 默认的公共网络模式，流量通过 HTTPS 和 OAuth 在公共互联网上传输。这适用于开发环境，但不适用于生产环境。对于生产环境，AgentCore Runtime 支持通过弹性网络接口（ENI）连接虚拟私有云（VPC）以访问私有资源，支持通过 AWS PrivateLink 的接口 VPC 端点实现向 Gateway 的私有入站访问，并支持通过 allowedWorkloadConfiguration 将运行时调用限制为仅来自您的 Gateway。有关配置步骤，请参阅 AgentCore Runtime 网络连通性模式以及使用接口 VPC 端点实现向 AgentCore Gateway 的安全入站访问。</p>
<p>在平台账户中应用 Amazon Bedrock Guardrails 进行内容过滤、PII（个人身份信息）脱敏和主题限制。由于推理是集中化的，单一 Guardrails 配置即可应用于 Agent 与各 LOB 工具之间的交互。作为更新的选择，您还可以直接在 AgentCore Gateway 上将 Guardrails 作为策略应用，从而使检查在 Gateway 层（即 Agent 代码之外）运行，覆盖通过 Gateway 路由的工具和上下文源。</p>
<p>若要启用数据平面日志记录，请在 Gateway 上配置日志传输至 Amazon CloudWatch Logs，以捕获工具调用和请求元数据。AWS CloudTrail 默认捕获控制平面操作（创建和更新网关、运行时、目标及策略）。若要同时在 CloudTrail 中捕获单个工具调用，请使用高级事件选择器针对 AgentCore Gateway 资源启用数据事件日志记录。对于集中审计，可配置组织级 CloudTrail 跟踪，将平台和 LOB 账户的日志聚合至专门的日志记录账户中。</p>
<p>该架构提供了天然的成本边界。各 LOB 的数据平面成本（Amazon DynamoDB、Amazon Bedrock Knowledge Bases、MCP 服务器计算资源）保留在各自账户内，并直接显示在 AWS Cost Explorer 中。LLM 推理和 Gateway 调用成本则累积在平台账户中。若要将这些成本归因回发起的 LOB，Agent 的执行角色会附带标签（例如 lob 或 costCenter 标签）。在 AWS Billing 控制台中激活成本分配标签后，这些标签将流入 AWS Cost and Usage Report，以便按 LOB 进行费用分摊追溯。Agent 的工具追踪会记录每个 LOB 调用的具体工具，以实现按比例分配。有关更深入的方法，请参阅 Amazon Bedrock 的细粒度成本归因。</p>
<p>为了在部署配套代码库后避免持续产生费用，请运行随附的清理脚本。该脚本将删除跨四个账户部署的资源，包括 AgentCore 组件（Agent、Gateway、Registry、凭据提供商）、Okta 配置（授权服务器、M2M 应用客户端）、MCP 服务器部署、CDK 堆栈（Amazon DynamoDB 表、Amazon S3 存储桶、Amazon Elastic Container Registry 仓库、Amazon ECS 集群）以及示例数据源。</p>
<p>从代码库根目录运行清理命令：<br />该脚本按与部署相反的顺序运行，首先删除 Agent 和 MCP 服务器，接着删除 Gateway 目标和 AgentCore 策略配置，最后删除全部四个账户中的 CDK 基础设施堆栈。</p>
<p>本文展示了如何构建一个多账户架构，该架构通过 Amazon Bedrock 和 AgentCore 集中运行 Agent，同时将数据保持分布在各个 LOB 账户中。LOB 团队将其数据公开为 MCP 服务器，平台账户的 Gateway 为工具发现和调用提供统一的经过身份验证的端点，AgentCore 中的策略则在 Gateway 层强制执行针对每位用户的授权。该模式具备天然的可扩展性：要接入新的业务线，平台团队只需添加一个 Gateway 目标，Agent 便会在下次调用时自动发现新工具。</p>
<p>若要亲自尝试该模式，请克隆配套代码库并部署四账户参考实现。</p>
<p>Amazon Bedrock AgentCore<br />将 Amazon Bedrock AgentCore 连接至跨账户知识库<br />改造您的 MCP 架构：通过 AgentCore Gateway 联合 MCP 服务器</p>
<p>Senthil Kamala Rathinam<br />Senthil 是亚马逊云科技（AWS）的高级解决方案架构师，专注于北美银行业客户的数据与分析领域。凭借在 AI/ML 和生成式 AI 方面的专业专长，他致力于帮助企业通过数据驱动的转型实现业务价值。工作之余，Senthil 喜欢陪伴家人和探索户外。</p>
<p>Karthik 是亚马逊云科技（AWS）的高级生成式 AI 解决方案架构师，服务于北美地区的金融服务客户。他专注于生成式 AI、Agent 架构以及 Amazon Bedrock 和 Amazon Bedrock AgentCore 上的 AI Agent 身份模式，帮助银行业组织安全地将 AI 工作负载投入生产环境。</p>
<p>Shashi 是一名高级解决方案架构师，为北美各地的银行业客户提供服务。他专注于数据分析、AI/ML 和生成式 AI，致力于通过创新解决方案推动金融机构的转型。Shashi 热衷于利用技术解决银行业复杂的业务挑战。工作之余，他喜欢旅行并陪伴家人度过美好时光。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【AWS Machine Learning Blog (亚马逊云科技官方英文)】于 2026-09-25 00:12 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#AWS</span>
</div>

<div class="news-card-footer"><a href="https://aws.amazon.com/blogs/machine-learning/build-a-multi-account-ai-agent-with-agentcore-gateway-and-mcp/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【AWS Machine Learning Blog (亚马逊云科技官方英文)】官方出处原文 ↗</a></div>
:::

::::