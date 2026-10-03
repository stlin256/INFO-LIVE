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
<div id="story-og-microsoft-thinkingbox-bd1136d0fcfd6f13" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="6539" data-content-paragraphs="73" data-published-at="2026-10-03T22:56:48.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/huggingface.svg" class="source-icon" alt="Hugging Face (开源模型社区)" width="16" height="16" /> <strong>Hugging Face (开源模型社区)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-04 06:56</span>
</div>

### [智能体自称已完成，数据库却并不认同](https://huggingface.co/blog/microsoft/thinkingbox)
<div class="original-title-sub"><span class="orig-tag">原文</span> The Agent Said It Was Done. The Database Disagreed.</div>

<div class="article-body" data-article-body="true"><p>图 1：ThinkingBox 在隔离的 MCP 工具会话中运行智能体，随后对其留下的终端后端状态和副作用进行评分。摘自我们的 ThinkingBox 论文。</p>
<p>一位客户发来咨询。她购买的一件价值 745 美元的厨房电器在纳什维尔配送中心因快递“异常”滞留，已经比预计送达时间推迟了 15 天。</p>
<p>AI 智能体的工作十分严谨。九次工具调用：提取订单、查询物流、查看客户档案、两次检索退款政策、确认此前不存在工单、新建工单、记录时间线，并准确解读了政策——她的账户分类确实不符合延期交付赔偿的条件。</p>
<p>随后，它将该工单标记为已解决并关闭，同时回复道：“既然您的问题已解决，请问还有什么我可以协助您的吗？”</p>
<p>然而，其中存在两处错误。承运商的异常状态依然处于开启状态，因此所需达到的最终状态应为挂起（on hold），等待问题解决。此外，客户根本没有得到针对其真实提问的实质答复。</p>
<p>检查工具调用的 AI 评分器会看到九次格式完备的调用。检查智能体是否写入数据库的评分器也会予以认可。唯一不认同的是数据库本身。</p>
<p>这一差距正是 ThinkingBox 所衡量的核心。在涵盖 507 个带状态的业务工作流中，每项工作流在各类大语言模型（LLM）上各运行 20 次，评估系统根据智能体最终留下的后端状态和副作用进行打分。本文将介绍我们的发现、一致性所需付出的代价，以及如何通过 OpenEnv 自行运行该基准测试。</p>
<p>您可以自行运行该测试：上述示例改编自基准任务 sandbox_external_retail_group1.py:test_case_ST003_006，而未能通过的可执行检查仅涉及一个字段：该工单的状态为 solved（已解决），而要求的最终状态为 hold（挂起）。完整追踪记录见我们论文的附录 D.4，案例 3。</p>
<p>想在阅读结果前先行体验？请直接跳至“自行运行”章节。</p>
<p>最终回复和有效的工具调用仅仅是表象代理。智能体可能听上去完全正确，却留下了错误的数值、修改了错误的记录，或产生了多余的副作用。只有它所留下的底层记录才能说明事实真相。</p>
<p>这一差距极为显著。在覆盖 12 个大语言模型、共计 121,680 次有效试验的通用集合消融实验中，有 79,853 次尝试未通过可执行检查。在这些失败尝试中，有 67.24% 的智能体依然正常终止运行、调用了改变状态的工具，且没有报告任何最终工具报错。然而，可执行检查却在其中 77.61% 的案例中发现了错误的字段值，43.30% 存在意料之外的多余副作用，25.36% 缺失了必需产生的效果。这些状态检查结果之间存在重叠。</p>
<p>调用轨迹是主张，数据库状态才是证据，而重复执行则是信任的试金石。</p>
<p>一个只成功处理了一次退款，随后四次都处理不当的智能体，并非一个合格可用的退款智能体。因此，每个任务都会在完全相同的纯净后端环境中独立运行 20 次，我们汇报三个不同的指标：</p>
<p>表 1：我们汇报的三个指标及其各自回答的问题。</p>
<p>在本文中，我们所使用的“观测到 20/20（observed 20/20）”指标，是指在全部 507 项任务中，在全部 20 次尝试中均告成功的任务的字面实际统计数。既无估计模型，亦无平滑处理。</p>
<p>首先来看大家所熟悉的视角。下表汇报了按领域拆分的 pass@1（单次尝试得分估算值）。这是大多数排行榜所公布的数字，单看该指标，其表现与普通的模型能力排行无异。</p>
<p>表 2：ThinkingBox-Bench 各领域的 pass@1（%）。每个模型在每项任务上均进行 20 次重复试验评估。粗体表示各组领先者；下划线表示第二名。单次尝试得分估算值的标准误见我们 ThinkingBox 论文中的表 4。</p>
<p>Claude Opus 5.5 以 67.16% 的总得分位居榜首，高出 Claude Opus 5 约三分之二个百分点。Kimi-K3 是最强的开源权重模型，与 GPT-6-Astra 的差距在 1 个百分点以内。垂直领域的影响同样显著：Claude Opus 4.6 在零售领域的得分为 68.62%，但在汽车保险领域仅为 8.30%。</p>
<p>一次成功的运行只能说明模型具备完成该工作的能力，但并不能说明它能否再次成功。因此，我们将每项任务运行 20 次，探究该得分究竟能保留多少。</p>
<p>图 2：各模型单次尝试得分在 20 次重复试验后的留存比例。</p>
<p>只有三款模型能够保留其大部分 pass@1 得分：GPT-6 Astra 保留了其单次尝试成功率的 78%，Claude Opus 5.5 和 Claude Opus 5 各自保留了 71%。而在另一端，GLM-5.1、Kimi-K2.6 和 DeepSeek-V4-Pro 各自仅保留了约 8%。</p>
<p>模型“单次能做”与“每次都能做”之间的鸿沟，揭示了事情的全貌。</p>
<p>图 3：覆盖广度与一致性走向分化。图中展示了 18 个模型中的 12 个；为保证图表清晰，pass@1 低于 33% 的 6 个模型予以省略。</p>
<p>Kimi-K3 在我们测试的所有模型中拥有最广泛的覆盖度。它在基准测试中至少解决过一次的任务占比达 93.89%：即 507 个任务中的 476 个。仅有 31 个任务彻底难倒了它，为全场最低。在零售工作流方面，它以 82.24% 的 pass@1 绝对领先，超越了所有闭源专有模型。</p>
<p>然而，Kimi-K3 也是一致性最差的模型之一。在全部 507 项任务中，仅有 68 项（13.41%）在全部 20 次尝试中均获得成功。</p>
<p>Claude Opus 5 则截然相反。它至少解决一次的任务较少（79.09%；106 个任务完全未能解决），但在基准测试中，有 47.53% 的任务在每一次尝试中全部顺利完成。</p>
<p>更新一代的模型并没能解决这一问题。Claude Opus 5.5 在单次尝试平均得分上高于 Claude Opus 5（67.16% 对 66.50%），且至少解决过一次的任务更多。但在全部 20 次尝试中均告通过的任务数量上，二者完全一致：均为 241 项。头条榜单准确率提升的半个百分点，根本没有带来任何额外的可靠性。</p>
<p>如果您正在为涉及真实业务记录的工作挑选模型，那么 pass@20 绝不是您应该看的指标。</p>
<p>能力评估通常止步于得分。而对于任何实际部署者而言，真正核心的问题是完成一个成功工作单元的成本是多少。我们将此衡量为“每个成功任务尝试的成本”。之所以称为“任务尝试（task attempt）”，是因为基准测试中的每个任务都反复运行，且成本按每次尝试产生，因此 pass@1 是与之匹配的质量分母。</p>
<p>我们提取了每个模型在整个 507 × 20 评测周期中记录的 Token 使用量，并按照 OpenRouter+ 上可查的无折扣门市价格计费，剔除促销折扣并排除了声明量化的终端节点。每个模型的输入、输出和缓存费率均来自单一提供商终端节点。</p>
<p>接着，我们将单次运行的成本除以成功的尝试次数：</p>
<p>每个成功任务尝试的成本 = 507 次尝试的预估成本（每项任务一次）÷ (507 × pass@1)</p>
<p>这是一个相对效率指数，并非实际发票账单，也不是单次生产调用的对外报价。此外，该指标仅反映单次成功的成本，而非一致性的成本。我们接下来将对一致性进行定价。</p>
<p>例如：GPT-5.4 运行 507 次尝试（每个任务一次尝试）花费 43.49 美元，其 pass@1 为 65.36%，因此每个成功任务尝试的成本为 $43.49 ÷ (507 × 0.6536) = 0.131 美元。</p>
<p>当没有任何其他模型既不比该模型贵、准确率又至少与其相当时，该模型便处于前沿（frontier）。共有三款模型符合条件；其他所有模型在至少一个维度上均被更优模型压制（dominated）。</p>
<p>图 4：每个成功任务尝试的成本与 pass@1 散点图。带圆环的点表示处于帕累托成本前沿的模型。</p>
<p>成本前沿由三个台阶构成。GPT-5.6 Sol 的单次成功成本最低，仅为 0.127 美元；GPT-5.4 每次成功仅多花费 0.004 美元，就将 pass@1 提高了 3.45 个百分点；Claude Opus 5.5 则在每次成功成本为 0.276 美元的情况下，又提升了 1.80 个百分点。这三款模型均位于成本前沿线上，因为没有成本更低的模型能达到它们各自的 pass@1 水平。</p>
<p>Claude Opus 5 是最具说服力的案例：其单次成功尝试成本为 0.475 美元，pass@1 为 66.50%，相比于单次成功成本 0.276 美元且准确率达 67.16% 的 Claude Opus 5.5，它既更昂贵又更不准确。</p>
<p>单次成功成本奖励的是成本低廉且通常正确的模型，但并不奖励每次都能做对的模型。因此，我们还计算了“可靠任务成本”：即开展整套 20 次测试运行的总成本，除以模型在全部 20 次尝试中均通过的任务数量。</p>
<p>可靠任务成本 = 507 项任务进行 20 次运行的预估成本 ÷ 达到 20/20 全通过的任务数</p>
<p>示例：GPT-6-Astra 运行该评测活动需花费 20 × 86.03 美元 = 1,720.60 美元，并在所有尝试中通过了 231 项任务，因此每个可靠任务的成本为 1,720.60 美元 ÷ 231 = 7.45 美元。</p>
<p>表 3：在至少观察到一项 20/20 任务的模型中，可靠任务成本最低的九款模型（按从低到高排序）。该数据为预估美元成本，非实际云账单。</p>
<p>现在按一致性进行排名。GPT-5.4 的成本最低，为 6.80 美元，但只有 128 项任务达到了这一标准。GPT-6 Astra 达到了 231 项，成本为 7.45 美元；Claude Opus 5.5 则与前者并列最高，达到 241 项，成本为 7.80 美元。</p>
<p>三者互不占绝对优势：每增加一个可靠任务都需要付出更高成本。Claude Opus 5 也通过了 241 项，但成本高达 13.30 美元，因此 Opus 5.5 对其形成了全面压制。而在单次成功中成本最低（0.127 美元）的 GPT-5.6 Sol，其每个可靠任务的成本却达到了 9.76 美元。获得一次正确答案的最便宜途径，并不等于获得可靠结果的最便宜途径。</p>
<p>我们为每个失败轨迹分配了一个确定性的诊断特征，其核心结论具有可操作性：大约五分之四的失败源于工具调用处理，而非推理能力。在我们论文表 5 的消融实验中显示：</p>
<p>这些是各模型占比与可观测标签的未加权平均值，并非唯一的因果解释。</p>
<p>实际呈现的规律很简单：智能体通常能够推进到尝试执行工作流的阶段，但随后便无法从工具错误、前置条件不满足或空查询结果中恢复过来。在成为模型问题之前，这首先是一个重试与错误恢复机制的问题。</p>
<p>任务难度也因领域而异：在上述表 2 列出的模型中，零售领域的平均 pass@1 为 59.52%，而汽车保险领域平均仅为 33.83%。</p>
<p>应对建议：应将 20/20 成功率视为一项设计输入，而非最终判决。基准评测所依据的信号同样可在生产环境中使用：在提交前检查终端状态，而不是只听信模型自己的总结。</p>
<p>对工具错误和系统错误进行分类，以便重试机制能够精准针对可恢复的错误。将工具界面精简至工作流所必需的范围。并且，对于无法以低成本回滚的变更，强制要求人工审批。我们尚未在该基准上衡量这些措施带来的具体提升，但这恰恰是该环境如今使其变得可测试的内容。</p>
<p>ThinkingBox 是智能体沙盒，而 ThinkingBox-Bench 则是用于评估智能体的数据集基准。本文顶部的图表展示了这一运行闭环；以下是各部分的作用说明。</p>
<p>图 5：上方图 1 中 A 模块的沙盒循环：隔离的工具会话、终态数据库、副作用及可执行裁判器。</p>
<p>每个任务都定义了一个初始后端状态、用户目标、可用的 MCP 工具、领域策略以及针对终端状态的可执行检查项。模拟用户掌握私有上下文（如预订参考号、偏好或出生日期），且仅在被提问时才会提供。</p>
<p>每次尝试都会获得一个状态经过全新初始化的独立 MCP 会话。同一任务的两次尝试绝不会共享数据库数据行或缓存的工具状态，这也正是 20 次试验对比具有实际意义的原因所在。</p>
<p>最后，副作用提取器会推导出实际发生变更的内容，确定性裁判器将其与要求的最终状态进行比对，接收任何产生正确结果的轨迹，同时驳回错误、缺失或多余的副作用。对于没有明确数据库取值要求的条件（例如“智能体是否说明了此项不作保证？”），则通过细化的二元评估准则问答来处理语义判定。在 507 项任务中，有 477 项仅根据状态即可完成评判；另有 30 项补充了回复准则判定。</p>
<p>信任边界：模型只能看到任务、对话和工具 schema。基准状态（Golden state）、断言、内部评分逻辑和凭证均保留在评估端。</p>
<p>ThinkingBox 现已上线 Hugging Face，包括测试套件和数据集。ThinkingBox-Bench 目前位于 OpenEnv 接口之后，每个运行结束的 episode 都会返回一个二元的成功/失败奖励。发布的适配器专为评估设计；独立的非基准场景也可以在训练工作流中使用相同的接口。</p>
<p>该系统已在 Linux 和 WSL 上通过测试，环境要求为 Python 3.11+、uv 和 Docker。你还需要在固定版本检出 thinkingbox-data，并为智能体、模拟用户和裁判器配置模型端点。单个端点即可同时承担这三个角色，这也是最简单的上手方式。OpenEnv 镜像仅启动 OpenEnv API；其余服务均由用户自行运行。</p>
<p>在第二个终端中，启动 Typesense 30.1 并等待其健康检查通过：</p>
<p>在第三个终端中，启动 Session Proxy（会话代理）和 MCP 服务器。</p>
<p>返回第一个终端，针对指定了三款模型的 ThinkingBox YAML 配置文件启动 OpenEnv 服务器（参见配置指南）：</p>
<p>在运行任何任务之前，先进行就绪检查。在其可观测数据、配置和会话代理检查通过前，接口会返回 503 错误。它无法监测 Typesense 或实时探测每个模型端点，因此这些需要单独进行确认：</p>
<p>现在对一个真实的 episode 进行评分。example_usage.py 仅用于重置和列出工具；若要评估智能体操作、副作用和断言，请使用打包好的评估器：</p>
<p>OpenEnv 适配器会将运行过程中的故障写入 errors 边车日志，以便进行重跑，而不是悄无声息地与模型产出结果混在一起。一份标准规范的结果必须解决或明确说明这些尝试；我们将系统错误统统计为未成功试验。</p>
<p>评测运行受限于固定的框架 commit、固定的数据版本和打包哈希值，因此规范的结果是可核验的，而非仅凭主观宣称。</p>
<p>这项工作最有价值的部分并非我们的 pass@1 排行榜，而是这个评测环境本身。</p>
<p>如果你正在评估一个涉及实际记录读写的智能体：</p>
<p>更多详情可参阅以下链接：</p>
<p>ThinkingBox 代码采用 MIT 许可证；基准数据采用 CDLA-Permissive-2.0 许可证；OpenEnv 环境基于 OpenEnv 的 BSD-3-Clause 许可证分发。</p>
<p>免责声明：公开基准中的所有任务均为合成重构数据。工作流和策略均借鉴了真实的企业级 AI 智能体模式；客户信息非真实数据。</p>
<p>ThinkingBox 和 ThinkingBox-Bench 由微软 Copilot Studio 团队与 Toloka 联合构建，合作者包括曾在微软实习的匹兹堡大学、西北大学、哥伦比亚大学及加州大学欧文分校的研究人员。</p>
<p>+ OpenRouter 成本快照采集于 2026 年 9 月 20 日；Opus 5.5 价格来源于 Anthropic 官网。</p>
<p>该作者的更多文章</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>ThinkingBox评估基准包含507个有状态业务工作流，每个任务在多种大语言模型上重复运行20次，以终端后端状态和副作用评估智能体。</li>
    <li>在覆盖12个模型、121,680次有效试验的消融测试中，79,853次尝试未通过可执行检查；其中67.24%的失败尝试依然正常终止、调用了改变状态的工具且未报告最终工具错误。</li>
    <li>来源叙事重点：文章将智能体执行过程描述为可能具有欺骗性的表面成功：工具调用完整、流程正常结束并不等于后台状态正确。叙事重点包括：以可执行检查评估终端状态；用20次重复运行区分单次能力与稳定可靠性；比较不同模型的任务覆盖率、pass@1、20/20一致性及成本；将约五分之四的失败归因于工具处理、错误恢复或前置条件问题，而非纯粹推理失败；并提出在生产环境中检查最终状态、限制工具范围和对不可逆变更引入人工审批。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Hugging</span>
</div>

<div class="news-card-footer"><a href="https://huggingface.co/blog/microsoft/thinkingbox" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Hugging Face (开源模型社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-cs-ai-can-really-do-html-614ec278520f4e7c" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2283" data-content-paragraphs="23" data-published-at="2026-10-03T23:00:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/oilprice.svg" class="source-icon" alt="OilPrice (全球能源与原油大宗)" width="16" height="16" /> <strong>OilPrice (全球能源与原油大宗)</strong></span>
    <span class="stance-badge">大宗能源产业链</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-04 07:00</span>
</div>

### [伊朗战争正展现ADNOC的人工智能究竟能做什么](https://oilprice.com/Energy/Energy-General/The-Iran-War-Is-Showing-What-ADNOCs-AI-Can-Really-Do.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> The Iran War Is Showing What ADNOC’s AI Can Really Do</div>

<div class="article-body" data-article-body="true"><p>多年来，石油公司一直利用人工智能加快钻井、预测设备故障，并从现有油田中挤出更多产量。如今，阿联酋国营石油巨头阿布扎比国家石油公司（ADNOC）正在了解：当问题不再是提高效率，而是一场最初令阿联酋石油出口量减少约三分之二的战争时，同样的技术究竟能发挥什么作用。冲突爆发前，阿联酋石油出口量约为每日510万桶，3月时降至仅190万桶。近七个月后，ADNOC正通过一个截然不同的出口体系开展运营，而该体系高度依赖人工智能。</p>
<p>据路透社援引Kpler数据报道，截至9月中旬，阿联酋原油出口量已恢复至每日323.6万桶，高于8月的每日288.6万桶和7月的每日287.1万桶。ADNOC通过哈布尚—富查伊拉管道输送原油，扩大油轮业务，并在阿曼湾开展船对船转运，以便让原油绕开霍尔木兹海峡继续外运。路透社上月报道称，ADNOC还成为折价伊拉克原油的主要买家，将其中大部分在鲁韦斯加工，从而释放更多阿联酋原油用于出口。</p>
<p>与此同时，AIQ的技术正为ADNOC的钻井、生产和设施提供实时信息。AIQ首席执行官丹尼斯·乔尔表示，这项技术几乎在一夜之间从便利工具变成了关键工具。</p>
<p>ADNOC进入战争时，人工智能已经相当深入地嵌入其业务。AIQ开发的系统能够自动调整生产井、预测关键设备故障并分析油藏状况，而较新的技术则旨在连接整个运营环节中的各项决策。</p>
<p>AIQ首席执行官丹尼斯·乔尔在接受Semafor采访时介绍说，该系统能够在管道无法使用时判断哪些油井应当关停、哪些应继续生产，并绕开中断环节重新规划流量。</p>
<p>相关报道：七国集团拟释放1亿桶石油以应对柴油危机</p>
<p>截至今年6月，AIQ已为ADNOC开发出约200个人工智能应用场景。其技术包括预测性维护、安全应用、地下建模，以及能够自动关闭设备以防止事故发生的系统。乔尔表示，一些过去需要数周完成的项目，如今几小时内即可完成。</p>
<p>例如，AIQ的RoboWell系统利用实时数据和人工智能模型，持续优化生产井。目前，该系统已部署到500多口油井，使产量提高5%，同时将油井干预次数减少最多50%。</p>
<p>对ADNOC而言，这意味着随着生产需求变化，可以持续调整单口油井，而不必等待工程师每次进行干预。同一技术还能识别会增加跳闸或非计划停机风险的运行状况，从而在石油网络其他部分快速变化时，为运营人员提供另一种管理产量的方式。</p>
<p>人工智能还被用于在设备问题妨碍生产之前将其检测出来。Neuron 5持续分析压缩机、阀门、发电机和其他机械设备的压力、温度及振动数据，以预测维护需求。ADNOC最初在其东北巴布油田和塔维拉天然气压缩厂，对数百台设备部署了该系统。试点结果显示，该系统可将非计划停机减少50%，并将计划维护间隔延长20%。</p>
<p>此后，ADNOC大幅扩大了Neuron 5的部署范围。截至2024年底，该系统已覆盖1200台关键设备，计划到2027年完成在全公司的部署。ADNOC后来表示，Neuron 5已将非计划停机减少50%。</p>
<p>如今，AIQ正在阿联酋以外测试这项预测能力。在埃及，其技术提前45天识别出一台电潜泵即将发生故障，使运营人员有时间在设备停机前采取干预措施。</p>
<p>ADNOC也在地下作业中使用人工智能。在一项为期90天、覆盖两个油田的ENERGYai试验中，一个人工智能智能体完成地震解释的速度比传统工作流程快10倍；另一个智能体则在15分钟内生成了油井压力预测结果。</p>
<p>2025年3月，ADNOC向AIQ授予一份为期三年、价值3.4亿美元的合同，要求其在ADNOC上游业务中部署ENERGYai。最终，该部署将覆盖28个以上的生产油田和数千口油井。</p>
<p>即使在战争爆发前，ADNOC也曾表示，2023年，30多个人工智能应用通过降低资本成本、运营成本和营运资本成本以及提高产量，创造了5亿美元的额外价值。</p>
<p>乔尔在6月举行的一场Semafor活动上表示，人工智能可以帮助ADNOC决定哪些油井应当关停、哪些应继续生产，以及在管道无法使用时如何重新规划流量。他说：“我们本可以决定今天要关闭哪些油井、抽采哪些油井、哪些管道无法工作，并能够重新规划所有流量。”</p>
<p>AIQ目前正试图将其在ADNOC内部开发的技术转化为其他石油公司可以使用的业务。据Semafor报道，AIQ的下一步是Genesis。这是一套操作系统，旨在让基于智能体的大规模人工智能运行于上游和下游业务之中。</p>
<p>据Semafor报道，六个月的战争加快了Genesis的推出进程。Genesis还与底层模型无关，因此能够运行，而不必让客户绑定OpenAI或Anthropic等单一底层供应商。</p>
<p>AIQ已经在科威特、印度、马来西亚和越南测试其技术。埃及则在另行讨论成立一家AIQ Egypt合资企业，将通过埃及上游门户获取的数据与AIQ的技术结合起来。双方还在研究人工智能在水力压裂、水平钻井、井身设计和勘探领域的应用。</p>
<p>AIQ花了六年时间在ADNOC内部开发技术，并获得了生产资产以及数十年专有运营数据的支持。如今，它必须说服其他生产商，将通过这种合作关系开发出的系统应用到自身运营中。</p>
<p>随着AIQ进一步进军国际市场，美国、加拿大和北海都属于其目标市场。该公司还在考虑通过收购加快扩张。AIQ首席执行官丹尼斯·乔尔告诉路透社，AIQ拥有大量可用现金，如何部署这些资金“正处于首要位置”。</p>
<p>据Semafor报道，该公司已在英国完成首次招聘，正在考虑进入休斯敦市场，并在扩张过程中确定了约100个潜在收购目标。</p>
<p>汤姆·库尔为Oilprice.com撰稿</p></div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#OilPrice</span>
</div>

<div class="news-card-footer"><a href="https://oilprice.com/Energy/Energy-General/The-Iran-War-Is-Showing-What-ADNOCs-AI-Can-Really-Do.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【OilPrice (全球能源与原油大宗)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-minate-mass-surveillance-d3e5e8c1a81ab330" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1350" data-content-paragraphs="1" data-published-at="2026-10-03T19:33:15.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-04 03:33</span>
</div>

### [联邦法官称Flock为“无差别大规模监控”](https://techcrunch.com/2026/10/03/federal-judge-calls-flock-indiscriminate-mass-surveillance/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Federal judge calls Flock ‘indiscriminate mass surveillance’</div>

<div class="article-body" data-article-body="true"><p>本周，一名联邦法官裁定，俄克拉何马州塔尔萨县一名警长办公室副警长在没有搜查令的情况下使用Flock Safety查找一名女性的车牌，侵犯了她受美国宪法第四修正案保护的权利。<br />据404 Media报道，这一裁决并不构成具有约束力的先例，但这是联邦法官首次认定Flock搜索违宪的案例之一。<br />在此案中，萨拉·希尔法官表示，这名副警长在查询Flock数据库中的该女性车牌之前本应取得搜查令，因为他“没有明显理由”进行这项搜索，“除了[该女性的车辆]挂有加州车牌这一事实之外”。<br />随后，这名副警长利用该女性在Flock系统中的出行记录，作为搜查其汽车的理由之一；据称，他在车内发现了91磅冰毒。但希尔法官写道，在Flock搜索之后取得的所有证据，“都必须作为毒树之果予以排除”。<br />希尔法官还将矛头扩大到对Flock数据库进行无搜查令搜索的问题。她写道，追踪人们的位置——即便他们身处公共场所——“当执法部门能够在较长时间内不加区分、被动地记录你的行踪，并在方便时将这些信息用于任何目的时，就会产生宪法层面的问题”。<br />希尔写道：“这是一种无差别的大规模监控。它并不像[卡彭特诉美国案——最高法院审理政府机构如何获取手机位置数据的案件]那样，针对单个个人。它是一种持续收集所有经过任何联网摄像头的车辆信息的工具，并按执法部门的要求提供这些信息。”<br />希尔加入了来自政治光谱各方、日益壮大的Flock批评者行列。包括佛罗里达州和得克萨斯州在内的众多地方和州政府已经表示将停止使用这项技术。而在周五，佛蒙特州民主党参议员伯尼·桑德斯提出《阻止Flock法案》，该法案将禁止联邦机构使用Flock等自动车牌识别系统。<br />Flock首席执行官加勒蒂·兰利——我们将在TechCrunch Disrupt大会现场对其进行采访——呼吁在隐私与安全之间达成“妥协”，并向那些遭到使用Flock系统的执法人员跟踪的女性道歉。据报道，在这些取消合作的情况发生后，Flock还提出自愿买断员工合同，以此缩减员工队伍。<br />当您通过我们文章中的链接购买商品时，我们可能会获得一小笔佣金。这不会影响我们的编辑独立性。<br />安东尼·哈是TechCrunch周末版编辑。此前，他曾担任Adweek科技记者、VentureBeat高级编辑、《霍利斯特自由报》地方政府记者，以及一家风险投资公司内容副总裁。他现居纽约市。<br />如需联系安东尼，或核实以他的名义发出的联系信息，可发送电子邮件至anthony.ha@techcrunch.com。<br />第二张门票享受五折优惠<br />Disrupt体验旨在与他人分享。购买您的门票，并以五折优惠带上一位同事、合作伙伴或同行。通过建立联系、积蓄发展势头并发现创业生态系统的下一步，拓展您的交流范围。<br />谷歌认为，SpaceX的星舰必须发射1800次，太空数据中心才能升空<br />世界首座增强型地热发电厂仅用23个月建成<br />谷歌发布Gemini 4 Argon，称其为迄今最强大的模型<br />五角大楼邀请埃隆·马斯克和帕尔默·勒基协助决定军方下一步行动<br />OpenAI推出Dots，这是一款风格活泼的智能体化虚拟形象<br />AMD将以82亿美元收购李飞飞的World Labs<br />走红的AI智能体Instinct完成10亿美元C轮融资，估值达到100亿美元</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>来源叙事重点：报道重点是俄克拉何马州一宗案件中，警员未取得搜查令便使用Flock Safety车牌数据库查询一名女性车辆位置，联邦法官据此认定相关搜查违反第四修正案，并排除后续取得的证据。文章进一步将判决置于更广泛的隐私争议中，突出法官对长期、被动、覆盖所有车辆的位置数据收集的批评，以及地方政府停用、联邦立法限制和Flock公司寻求妥协等后续动态。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/03/federal-judge-calls-flock-indiscriminate-mass-surveillance/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-026-10-04-10707673-shtml-b043607e75453924" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="zh" data-content-length="718" data-content-paragraphs="25" data-published-at="2026-10-03T22:52:47.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/chinanews.svg" class="source-icon" alt="中新社 (国际实时原版)" width="16" height="16" /> <strong>中新社 (国际实时原版)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🌐 全球地缘战略</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-04 06:52</span>
</div>

### [伊朗革命卫队近日对7艘“违规”油轮采取行动](https://www.chinanews.com.cn/gj/2026/10-04/10707673.shtml)

<div class="article-body" data-article-body="true"><p>当地时间10月3日，据伊朗方面消息，过去5天内，伊朗伊斯兰革命卫队海军在霍尔木兹海峡针对至少7艘“违规”油轮采取行动。</p>
<p>多方消息称，尽管美国政府一直声称“霍尔木兹海峡保持开放并处在美国控制之下”，但伊方实际上平均每天针对不止一艘油轮采取行动。</p>
<p>景区NPC丰富文化体验 中国人从“看景”到“搭戏”青睐沉浸感</p>
<p>国庆文旅消费从“打卡观光”转向“深度体验”</p>
<p>“十·一”黄金周，为什么越来越多人涌向主题公园？</p>
<p>探访杭州“无声烧饼摊”：烟火街巷里，圆残疾人就业梦</p>
<p>中国“交旅融合”焕新体验 盘活旅途“闲置”时空</p>
<p>让机器人“能干活” 具身智能从“中国量产”走向“全球落地”</p>
<p>这支巴西球队为何三年国庆赴约贵州“村超”？</p>
<p>中国健儿逐梦亚运：“代表祖国，就要全力以赴”</p>
<p>“闪身步”闪到台湾，社交媒体“全民跟风”，有运动员赛后“边哭边跳”</p>
<p>埃及汉学家哈赛宁：中国故事如何真正抵达阿拉伯读者？</p>
<p>鏖战抽筋、老将坚守、对手互敬……亚运会上，那些超越胜负的动人场面</p>
<p>“天下第一潮”涌动 钱塘江畔千年古镇焕新机</p>
<p>林诗栋：19个月后，“小石头”开出“花”</p>
<p>“扫帚诗人”黄新生：扫帚扫街巷，诗笔写人间</p>
<p>南京开通旅游直通车 8条线路邀市民游客畅享微度假</p>
<p>2026年云冈石窟客流量提前突破500万人次</p>
<p>杭州西湖女子巡逻队国庆贴心服务 成人文风景线</p>
<p>苏州大学赓续百年文脉 古籍活化传扬江南文化</p>
<p>“台湾哥”在河南种了14年地：你养土地，土地养你</p>
<p>云南盈江数万人共跳目瑙纵歌 各民族手足相亲共庆国庆</p>
<p>当户外茶会遇上消防演习，网友：意不意外 刺不刺激</p>
<p>人体也能带电？物理老师现场演示静电飞花原理</p>
<p>重庆涪陵：沿着“503”，去趟“地心”？</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【中新社 (国际实时原版)】于 2026-10-04 06:52 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#全球地缘战略</span>
  <span class="news-tag-pill">#中新社</span>
</div>

<div class="news-card-footer"><a href="https://www.chinanews.com.cn/gj/2026/10-04/10707673.shtml" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【中新社 (国际实时原版)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-l-arms-embargo-on-israel-7520c28108054adb" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="754" data-content-paragraphs="11" data-published-at="2026-10-03T22:43:58.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/aljazeera.svg" class="source-icon" alt="Al Jazeera (半岛电视台官方英文)" width="16" height="16" /> <strong>Al Jazeera (半岛电视台官方英文)</strong></span>
    <span class="stance-badge">全球南方与海湾枢纽</span>
    <span class="dimension-pill">🌐 全球地缘战略</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-04 06:43</span>
</div>

### [获佩洛西支持的美国候选人呼吁对以色列实施“全面武器禁运”](https://www.aljazeera.com/news/2026/10/3/pelosi-backed-us-candidate-calls-for-full-arms-embargo-on-israel)
<div class="original-title-sub"><span class="orig-tag">原文</span> Pelosi-backed US candidate calls for ‘full arms embargo’ on Israel</div>

<div class="article-body" data-article-body="true"><p>获南希·佩洛西支持、将接替她代表加利福尼亚州第11国会选区的美国民主党人康妮·陈表示，她将投票“终结加沙地带的种族灭绝”。</p>
<p>美国民主党人康妮·陈获联邦众议院前议长南希·佩洛西支持，准备接替佩洛西代表加利福尼亚州第11国会选区。她呼吁“对以色列政府实施全面武器禁运”。</p>
<p>在周四晚举行的一场电视辩论中，陈表示，在加州选民收到邮寄选票前几天，如果当选，她将在“进入国会的第一天”投票“终结加沙地带的种族灭绝以及种族隔离国家”。</p>
<p>陈是旧金山地方监察委员会委员，她将与加州州参议员、同为民主党人的斯科特·维纳竞选，以接替佩洛西。现年86岁的前众议院议长佩洛西不再寻求连任。</p>
<p>今年11月的中期选举将改选众议院全部435个席位和参议院35个席位，民主、共和两党都在争夺国会控制权。</p>
<p>佩洛西在国会任职期间长期支持以色列，谴责抵制或制裁以色列的努力，并投票支持军事援助。</p>
<p>陈表示，必须优先提供人道主义援助，并告诉辩论主持人，她不会支持为以色列“铁穹”导弹防御系统提供资金。</p>
<p>维纳也将以色列对加沙的军事行动描述为种族灭绝，并表示他将反对向以色列军方提供资金以及提供炸弹或进攻性武器。</p>
<p>维纳说：“在我看来，这个政府——不仅仅是（以色列总理本雅明）内塔尼亚胡——就其给加沙造成的后果、就以色列纵容约旦河西岸定居者暴力和土地掠夺而言，绝对令人憎恶。”</p>
<p>此次竞选之际，美国国会内部正因美国支持以色列而出现分歧。近期，几乎所有参议院民主党议员都支持一项未获通过的努力，要求美国国务院提交一份有关以色列人权做法的报告，其中包括调查以色列在被占领的约旦河西岸杀害9名美国人的情况。</p>
<p>本周，众议院数名议员还提出了《制止定居点法案》。该法案将对参与在被占领的约旦河西岸和加沙地带修建或扩建非法以色列定居点的个人和实体实施制裁。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【Al Jazeera (半岛电视台官方英文)】于 2026-10-04 06:43 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#全球地缘战略</span>
  <span class="news-tag-pill">#Al</span>
</div>

<div class="news-card-footer"><a href="https://www.aljazeera.com/news/2026/10/3/pelosi-backed-us-candidate-calls-for-full-arms-embargo-on-israel" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Al Jazeera (半岛电视台官方英文)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ard-search-massachusetts-04ef8e6825fe28bf" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="685" data-content-paragraphs="10" data-published-at="2026-10-03T22:31:04.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/npr.svg" class="source-icon" alt="NPR World (美国国家公共电台官方英文)" width="16" height="16" /> <strong>NPR World (美国国家公共电台官方英文)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🌐 全球地缘战略</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-04 06:31</span>
</div>

### [美国海岸警卫队搜寻一架载有6人的失踪医疗飞机](https://www.npr.org/2026/10/03/g-s1-146338/plane-missing-coast-guard-search-massachusetts)
<div class="original-title-sub"><span class="orig-tag">原文</span> Coast Guard searching for missing medical plane carrying 6 people</div>

<div class="article-cover"><img src="https://npr.brightspotcdn.com/dims3/default/strip/false/crop/2000x1125+0+1053/resize/2000x1125!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F96%2F68%2F3cd5cd0e4f478da191737c99f3b6%2Fgettyimages-2286149812.jpg" alt="美国海岸警卫队搜寻一架载有6人的失踪医疗飞机" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>美国海岸警卫队表示，已出动一架直升机（图为今年7月拍摄的同型号直升机）、两架搜救飞机和一艘机动救生艇，搜寻当地时间周六在马萨诸塞州海岸外失踪的飞机。Heather Diehl/Getty Images 图片说明隐藏</p>
<p>美国海岸警卫队正在马萨诸塞州楠塔基特岛以南海域搜寻一架加拿大空中救护机。这架飞机周六清晨从百慕大飞往波士顿途中失踪。</p>
<p>据海岸警卫队称，这架湾流G100型飞机与空中交通管制失去联系时，机上据信载有6人。</p>
<p>飞行数据显示，这架喷气式飞机在两分钟内下降了至少9000英尺，随后又保持平飞数分钟，之后失踪。楠塔基特纪念机场表示，飞行员曾宣布紧急情况。在一次通话中，空中交通管制员询问这架空中救护机的飞行员：“你们是在没有目视条件的情况下进场吗？”</p>
<p>据Broadcastify的音频以及《波士顿环球报》的审核内容，一名消防救援调度员警告应急救援人员做好飞机抵达的准备。她说，飞机预计15分钟后到达，出现电气故障，并且已经失去无线电和雷达信号。</p>
<p>海岸警卫队已出动两架搜救飞机、一架直升机和一艘机动救生艇。</p>
<p>这架飞机由总部位于加拿大安大略省的Latitude Air Ambulance运营。该公司网站称，自2009年以来，公司已执行数千次任务，将患者及其亲人送回家中。该公司自称拥有“无可挑剔的安全记录”。</p>
<p>该网站称，这些空中救护机配备两名飞行员和一支医疗团队，并配有担架以及完整的重症监护医疗设备和用品。</p>
<p>美国国家公共电台（NPR）不会为报道或采访提供或接受金钱。提出此类 შეთ议或请求的任何人都不是NPR员工，也不代表NPR。</p>
<p>成为NPR赞助商</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【NPR World (美国国家公共电台官方英文)】于 2026-10-04 06:31 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#全球地缘战略</span>
  <span class="news-tag-pill">#NPR</span>
</div>

<div class="news-card-footer"><a href="https://www.npr.org/2026/10/03/g-s1-146338/plane-missing-coast-guard-search-massachusetts" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【NPR World (美国国家公共电台官方英文)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--in-brazil-election-html-92a9337bc8db8593" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1694" data-content-paragraphs="22" data-published-at="2026-10-03T13:12:27.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/cnbc.svg" class="source-icon" alt="CNBC Markets (CNBC 市场官方英文)" width="16" height="16" /> <strong>CNBC Markets (CNBC 市场官方英文)</strong></span>
    <span class="stance-badge">国际资本与华尔街视角</span>
    <span class="dimension-pill">💹 宏观资本与产业</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-03 21:12</span>
</div>

### [卢拉还是博索纳罗：巴西大选两种截然不同的结果令华尔街严阵以待](https://www.cnbc.com/2026/10/03/lula-or-bolsonaro-wall-street-braces-for-two-wildly-different-results-in-brazil-election.html)
<div class="original-title-sub"><span class="orig-tag">原文</span> Lula or Bolsonaro: Wall Street braces for two wildly different results in Brazil election</div>

<div class="article-body" data-article-body="true"><p>巴西总统选举首轮投票将于周日举行。对于这场势均力敌的竞选，华尔街正根据不同结果准备截然不同的市场预测。</p>
<p>“巴西交易的关键在于：是卢拉获胜，还是博索纳罗获胜？”Black Toro Global Investments首席经济学家费尔南多·马伦戈表示。</p>
<p>这两个名字应当并不陌生。卢拉是现年80岁的左翼人士路易斯·伊纳西奥·卢拉·达席尔瓦，此次竞选第四个总统任期；他的对手是45岁的右翼人士弗拉维奥·博索纳罗，后者是前总统雅伊尔·博索纳罗之子。如果两名候选人都未获得超过50%的选票，第二轮投票将于10月25日举行。</p>
<p>简而言之，如果博索纳罗获胜，华尔街预计巴西债券、货币和股市将会上涨。</p>
<p>随着博索纳罗在过去几个月迎头赶上，巴西股市也随着他的民调支持率一同走高。摩根大通近期在给客户的一份报告中指出，MSCI巴西指数“在弗拉维奥民调支持率上升的每一天，平均上涨0.25%”。</p>
<p>Kalshi市场目前显示，博索纳罗的胜选概率为60%，卢拉为39%。巴西禁止预测市场，因此这些数据可能无法反映当地民意。Aurora Macro Strategies高级顾问理查德·拉珀在给客户的一份报告中表示：“过去一个月，天平已经转向弗拉维奥，但远没有预测市场当前定价所反映的那么明显。”</p>
<p>博索纳罗受到市场青睐，是因为他承诺将实施更严格的财政纪律，而许多经济学家认为这是巴西迫切需要的。截至目前，巴西债务占国内生产总值的比重为81.9%，自卢拉就任以来上升了10%。</p>
<p>“我们需要进行相当于国内生产总值3%至3.5%的财政调整，以稳定公共债务与国内生产总值的关系，”花旗集团巴西首席经济学家莱昂纳多·波尔图表示。他说，这种调整不能仅依靠国有资产私有化等一次性措施。“巴西需要永久性的财政调整。”</p>
<p>这意味着削减支出或提高税收——而这两种做法都将很困难。巴西预算中约90%属于强制性支出，其中一部分由宪法规定。根据经济合作与发展组织的数据，巴西税负率为32%，已经是拉丁美洲最高；与此同时，该国经济增长前景低迷。</p>
<p>摩根大通表示，如果博索纳罗获胜并成功实施“强有力的改革议程”，巴西将获得巨大收益。</p>
<p>该机构参考了博索纳罗的父亲雅伊尔在2016年至2020年执政期间的情况。老博索纳罗成功推动了养老金改革，节省了数千亿美元。改革规定男性最低退休年龄为65岁，女性为60岁。此前，男性工作满35年后可在任何年龄退休，女性工作满30年后可在任何年龄退休。平均而言，男性退休年龄为56岁，女性为53岁。</p>
<p>摩根大通表示，在那段改革时期，巴西两年期国债收益率降至接近4.7%，股市上涨了130%。</p>
<p>摩根大通分析师表示，如果巴西再次进入改革时期，利率可能降至中性水平，即实际利率6%、名义利率10%；“我们预计MSCI巴西指数的上行潜力将在21%至41%之间。”他们认为，远期市盈率可能从目前的8.6升至最高13.3，这一水平上次出现是在2020年。</p>
<p>摩根大通表示，汇率走势将呈现“双峰”状态：如果卢拉获胜，美元兑巴西雷亚尔汇率将升至5.50；如果博索纳罗获胜，则将降至4.90。</p>
<p>此次选举还将改选众议院全部席位以及参议院三分之一的席位。立法机构的构成将成为能否推动改革的关键因素。</p>
<p>Black Toro的马伦戈指出，拉丁美洲其他国家近期亲商候选人的胜选，已推动这些国家的股票、债券和货币大幅上涨。他注意到，哥伦比亚风险溢价的压缩幅度“约为200个基点，而哥伦比亚也是股市涨幅最大的国家之一——秘鲁也出现过类似情况”。马伦戈提醒说，巴西市场的部分涨幅已经反映了这一预期。</p>
<p>与所有新兴市场一样，全球利率上升是一个关键风险；而对拉丁美洲而言，厄尔尼诺天气现象也构成特别风险，因为它可能导致农业出口国遭受作物损失。</p>
<p>披露：CNBC与Kalshi存在商业关系，包括客户获取合作和少数股权投资。</p>
<p>您是否掌握机密新闻线索？我们希望听到您的消息。</p>
<p>将这些内容以及更多有关我们产品和服务的信息发送到您的收件箱。</p>
<p>数据为实时快照。*数据至少延迟15分钟。全球商业和金融新闻、股票报价以及市场数据与分析。</p>
<p>数据还由</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【CNBC Markets (CNBC 市场官方英文)】于 2026-10-03 21:12 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#宏观资本与产业</span>
  <span class="news-tag-pill">#CNBC</span>
</div>

<div class="news-card-footer"><a href="https://www.cnbc.com/2026/10/03/lula-or-bolsonaro-wall-street-braces-for-two-wildly-different-results-in-brazil-election.html" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【CNBC Markets (CNBC 市场官方英文)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-pcom-ai-game-development-5cb80ade64def456" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="539" data-content-paragraphs="8" data-published-at="2026-10-03T16:49:10.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-04 00:49</span>
</div>

### [卡普空正在为“我们与人工智能共同创造游戏的未来”做准备](https://www.theverge.com/games/1004418/capcom-ai-game-development)
<div class="original-title-sub"><span class="orig-tag">原文</span> Capcom is preparing for a ‘future where we create games together with AI’</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/02/RE9_SS_08.png?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="卡普空正在为“我们与人工智能共同创造游戏的未来”做准备" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>关于这一主题的文章将被添加到您的每日电子邮件简报和主页信息流中。</p>
<p>在一次关于RE引擎未来的演讲中，卡普空公布了其将人工智能用于“开发工作流程”的计划。</p>
<p>这位作者的文章将被添加到您的每日电子邮件简报和主页信息流中。</p>
<p>查看Terrence O&#39;Brien的所有文章</p>
<p>卡普空的《Pragmata》或许完全是在讲述人工智能的恐怖，但在实际操作中，这家工作室似乎并不排斥这项技术。在卡普空开放大会RE: 2026期间，程序员Satoshi Ishida发表了一场演讲，标题相当拗口：“REX项目的展望与未来：为下一代进一步发展RE引擎。”在演讲中，他阐述了制作《生化危机》这种规模游戏的工作室所面临的挑战：即便是简单的任务，也可能耗费极其漫长的时间。Ishida表示，解决方案是“将人工智能技术成功整合进开发工作流程”。</p>
<p>卡普空此前曾表示，不会在其游戏中使用人工智能生成的资产，而是会专注于利用这项技术提高开发效率。Ishida的言论似乎与这一说法一致，但显然也为更广泛的应用留下了空间。据IGN的翻译，他提出了一项计划：逐步、渐进地将RE引擎转变为“人工智能生成游戏引擎”，朝着“我们与人工智能共同创造游戏的未来”迈进。</p>
<p>每天免费获取最重要的新闻简报。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-10-04 00:49 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/games/1004418/capcom-ai-game-development" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-mpanys-culture-is-broken-7a09b2d0105640ac" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2023" data-content-paragraphs="26" data-published-at="2026-10-03T16:30:01.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-04 00:30</span>
</div>

### [OpenAI安全员工辞职，称公司“文化已经崩坏”](https://techcrunch.com/2026/10/03/openai-safety-employee-resigns-claiming-the-companys-culture-is-broken/)
<div class="original-title-sub"><span class="orig-tag">原文</span> OpenAI safety employee resigns, claiming the company’s ‘culture is broken’</div>

<div class="article-body" data-article-body="true"><p>正如大卫·罗宾逊本人所承认的那样，他“多少有些落入俗套”：他是一家领先人工智能公司的员工，在辞职之际发出了严厉警告。</p>
<p>罗宾逊在发表于《大西洋月刊》的一篇文章中表示，他负责牵头撰写OpenAI重大产品发布时随附的安全报告。他还表示，自己在OpenAI工作了三年半，是“公司任职时间最长的员工之一”。如今他决定辞职，因为在他看来，公司的“文化已经崩坏”。</p>
<p>在某些方面，罗宾逊的评论与雅各布·考克森的说法如出一辙。考克森曾先后在OpenAI和Anthropic担任研究员，之后辞职，并宣称这些公司正在“拿我们的生命下注”。考克森的言论引发了有关人工智能安全的更广泛讨论；Anthropic首席执行官达里奥·阿莫代伊公布了一项更加谨慎地开发人工智能的计划。本周，人工智能公司高管还与美国总统唐纳德·特朗普会面，并签署了一份看起来仓促起草、且不具约束力的承诺，表示将实施更多安全控制措施。</p>
<p>但在罗宾逊看来，这场讨论需要超越“具体规则或新法律”，转而处理这些公司的整体文化问题。尽管围绕OpenAI的大量报道都聚焦于该公司首席执行官萨姆·奥尔特曼如何失去了前同事的信任，但罗宾逊的文章暗示，OpenAI的文化问题与整个硅谷的问题并无二致。</p>
<p>他写道：“OpenAI通过试错（公司称之为‘迭代式部署’）不断发展，即寻找问题，并据此改进安全护栏。但这种做法从本质上保证了失败会周期性发生——而随着系统能力不断增强，这些失败的规模也在扩大。”</p>
<p>罗宾逊提到近期OpenAI智能体入侵Hugging Face系统的事件，以及不断曝光的OpenAI发现更多失控智能体的情况。他据此认为：“一个允许此类事情发生的环境，不适合用来培育可能比我们更聪明、且可能不会按我们意愿行事的人工心智。”</p>
<p>鉴于风险不断增加，罗宾逊认为，前沿人工智能公司需要开始“像核电站或繁忙机场那样运营，设置多层冗余，并进行谨慎且耗时的规划，以便偶发且不可避免的人为错误不会打开通往灾难的大门”。</p>
<p>但罗宾逊表示，在OpenAI任职期间，他“从未遇到过一位同事，拥有让飞机安全飞行、让核反应堆在不熔毁的情况下运行，或帮助金融体系发展而不至于崩溃的经验”。</p>
<p>针对罗宾逊的文章，OpenAI发言人德鲁·普萨特里表示，公司仍在持续改进安全措施。</p>
<p>普萨特里在一份声明中说：“我们正在确保模型的能力不会超出我们能够安全管理和保障的范围；当需要放慢速度时，我们会暂停训练或暂缓发布模型。我们正在对研究和测试环境进行重大改进，以强化安全性；训练模型不仅要完成任务，还要负责任地完成任务；扩大与第三方评估机构的合作；并改进实时监测，以便在训练过程的更早阶段发现并应对令人担忧的行为。”</p>
<p>除了呼吁改变OpenAI的文化，罗宾逊还表示，现在是时候对对齐问题提出更宏大的问题了。他承认，这听起来可能有些“过于温情主义”，但他表示，鉴于公司目前衡量人工智能系统“与人类价值观匹配程度”的方式还很粗略，这一点至关重要。</p>
<p>他说：“在这些问题尚未解决的情况下，行业允许模型变得越聪明，我们所处的局面就越危险。”</p>
<p>Business Insider最先报道了罗宾逊离职的消息。他在文章中还承认，自己正在采取人工智能举报人行动惯例中一个显然越来越常见的步骤：聘请一家公关公司。但他坚持说：“决定站出来发声完全是我自己的决定。”</p>
<p>罗宾逊说：“也许我本应留下来，为人员配置和文化方面的根本性转变而奋斗，但实际上，我和同事们忙于全速冲刺，很少有机会考虑重大变革，更不用说真正推动这些变革了。这就是为什么我得出结论：来自公司外部、针对安全的更强激励，是把这件事做对的重要组成部分。”</p>
<p>当您通过我们文章中的链接购买商品时，我们可能会获得一小笔佣金。这不会影响我们的编辑独立性。</p>
<p>安东尼·哈是TechCrunch的周末编辑。此前，他曾担任Adweek科技记者、VentureBeat高级编辑、《霍利斯特自由报》地方政府记者，以及一家风险投资公司内容部门副总裁。他现居纽约市。</p>
<p>如需联系安东尼或核实以其名义发出的联络信息，可发送电子邮件至anthony.ha@techcrunch.com。</p>
<p>第二张通行证享五折优惠</p>
<p>Disrupt大会体验旨在与他人共享。购买您的通行证，并以五折优惠带上同事、合作伙伴或同行。通过建立联系、积蓄动力并探索创业生态系统的下一步，拓展您的视野。</p>
<p>谷歌认为，SpaceX的“星舰”必须发射1800次，太空数据中心才能升空</p>
<p>全球首座增强型地热发电厂仅用23个月建成</p>
<p>谷歌发布Gemini 4 Argon，称其为迄今最强大的模型</p>
<p>五角大楼邀请埃隆·马斯克和帕尔默·拉奇参与决定军方下一步行动</p>
<p>OpenAI推出Dots，这是一款活泼的智能体化头像</p>
<p>AMD将以82亿美元收购李飞飞的World Labs</p>
<p>病毒式传播的人工智能智能体Instinct完成10亿美元C轮融资，估值达100亿美元</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-04 00:30 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/03/openai-safety-employee-resigns-claiming-the-companys-culture-is-broken/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-a-after-government-order-af2cb38571bedd16" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1663" data-content-paragraphs="23" data-published-at="2026-10-03T15:02:01.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-03 23:02</span>
</div>

### [杰克·多尔西的 Bitchat 在印度政府下令后从应用商店消失](https://techcrunch.com/2026/10/03/jack-dorseys-bitchat-disappears-from-app-stores-in-india-after-government-order/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Jack Dorsey’s Bitchat disappears from app stores in India after government order</div>

<div class="article-body" data-article-body="true"><p>Bitchat 是杰克·多尔西推出的一款去中心化消息应用，旨在无需互联网连接即可运行。新德里首次寻求限制这款开源软件的访问权限数月后，该应用已从印度的苹果和谷歌应用商店消失。</p>
<p>多尔西周六表示，印度政府已下令苹果将 Bitchat 从该国的 App Store 下架。多尔西在 X 上发布的一份苹果通知显示，印度电子和信息技术部依据《信息技术法》第69A条提出了这一要求。该条款是印度政府下令封锁在线内容的主要法律依据。</p>
<p>苹果的通知称，Bitchat 仍可在印度以外地区的 App Store 上使用。不过，在印度，通过苹果的 TestFlight 测试版服务访问该应用也将被封锁。</p>
<p>TechCrunch 周六核查时发现，Bitchat 也已无法在印度通过 Google Play 下载。该应用的网站在印度多家互联网服务提供商的网络上也无法访问。目前尚不清楚谷歌和互联网服务提供商是否也收到了联邦政府的指示。</p>
<p>苹果、谷歌和印度信息技术部均未回应置评请求。</p>
<p>Bitchat 于去年7月推出，利用蓝牙网状网络，让附近设备能够交换加密消息，而无需依赖蜂窝网络、互联网连接或集中式服务器。</p>
<p>2026年7月，多尔西透露，印度有关部门已下令 GitHub 下架与这款开源消息应用相关的代码库。这引发了数字权利倡导者和法律专家的疑问：依据软件的功能限制软件的法律基础究竟是什么。</p>
<p>印度政府当时在给 GitHub 的命令中表示，Bitchat 的架构使执法机构难以拦截通信或追踪用户，并指出该应用在互联网关闭期间仍能继续运行。7月的命令依据的是印度信息技术法中有关中介机构及其对第三方内容所负责任的条款。这与苹果最新通知所引用的第69A条不同。</p>
<p>总部位于新德里的数字权利倡导组织“互联网自由基金会”称，最新命令违宪。该组织认为，第69A条允许政府封锁非法信息，但不能因为一款消息应用能够在互联网关闭期间运行，就封锁这款应用。该组织还表示，封锁命令以及据称构成行动依据的非法内容均未被公开。</p>
<p>对 Bitchat 的最新限制出台之际，印度正因该国选民名册变更而出现新一轮由年轻人主导的抗议活动。周六，警方在新德里的示威活动中拘留了数人。抗议者要求印度首席选举委员辞职，理由是其涉嫌操纵选民名册。周五抗议活动期间，当局暂停了新德里金塔尔曼塔尔周边地区12小时的互联网服务。</p>
<p>据报道，在7月的抗议活动期间，当局暂停互联网服务后，示威者转而使用 Bitchat 及其竞争应用 Briar。</p>
<p>与此同时，印度民众对 Bitchat 的兴趣激增。市场情报公司 Sensor Tower 的数据显示，在7月17日至7月23日期间，印度约占该应用全球下载量的85%；而在此前30天内，这一比例约为1%。</p>
<p>当您通过我们文章中的链接购买商品时，我们可能会获得一小笔佣金。这不会影响我们的编辑独立性。</p>
<p>Jagmeet 为 TechCrunch 报道印度的初创企业、科技政策相关新闻以及其他所有重大科技领域动态。他此前曾担任 NDTV 首席记者。</p>
<p>您可以通过发送电子邮件至 mail@journalistjagmeet.com，联系 Jagmeet 或核实其外联信息。</p>
<p>第二张通行证享受五折优惠<br />Disrupt 体验旨在与他人分享。购买您的通行证，并以五折优惠带上一位同事、合作伙伴或同行。通过建立联系、积蓄发展势头并探索初创企业生态系统的下一步，拓展您的收获。</p>
<p>谷歌认为，SpaceX 的星舰必须发射1800次，太空数据中心才能升空</p>
<p>全球首座增强型地热发电厂仅用23个月建成</p>
<p>谷歌发布 Gemini 4 Argon，称其为迄今功能最强大的模型</p>
<p>五角大楼邀请埃隆·马斯克和帕尔默·勒基协助决定军方下一步该做什么</p>
<p>OpenAI 推出 Dots，这是一款活泼可爱的智能代理化身</p>
<p>AMD 将以82亿美元收购李飞飞的 World Labs</p>
<p>病毒式传播的人工智能代理 Instinct 在 C 轮融资中筹得10亿美元，估值达到100亿美元</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-03 23:02 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/03/jack-dorseys-bitchat-disappears-from-app-stores-in-india-after-government-order/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-quits-sounding-the-alarm-46c63a0311a23e0d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="770" data-content-paragraphs="12" data-published-at="2026-10-03T14:31:56.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-03 22:31</span>
</div>

### [一名OpenAI安全员工已辞职，并发出警告](https://www.theverge.com/ai-artificial-intelligence/1004408/openai-safety-quits-sounding-the-alarm)
<div class="original-title-sub"><span class="orig-tag">原文</span> An OpenAI safety employee has quit and is sounding the alarm</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2025/08/STK149_AI_01.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="一名OpenAI安全员工已辞职，并发出警告" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>来自该主题的帖子将被添加到你的每日电子邮件摘要和主页信息流中。</p>
<p>曾在OpenAI撰写安全报告的大卫·罗宾逊如今表示，该公司的文化已经“崩坏”</p>
<p>来自该作者的帖子将被添加到你的每日电子邮件摘要和主页信息流中。</p>
<p>查看特伦斯·奥布莱恩的所有文章</p>
<p>大卫·罗宾逊过去曾为OpenAI撰写每次重大模型发布时都会附带的安全报告。本周，他辞去了职务，并在《大西洋》杂志发表的一篇评论文章中公开发声。</p>
<p>如果你对人们突然纷纷站出来警告自己参与打造的东西有多么危险，感到有些愤世嫉俗，这是可以理解的。毕竟，这个烂摊子确实是他们造成的。但这并不意味着我们应该忽视他们的警告。</p>
<p>罗宾逊表示，行业文化从根本上已经崩坏。他认为，这个问题比简单地针对我们如何处理模型训练增加几条新规则或监管规定要深刻得多。他说，硅谷一直以“极度自信”和“永不停歇的冲刺”运作，在“毫无阻碍的乐观主义”驱使下，打造越来越大、越来越好的模型，却忽视或低估了潜在问题。</p>
<p>他说，人工智能公司是时候培养谦逊意识，并走出科技行业那种封闭、快速行动且不惧犯错的世界。具体而言，他认为人工智能需要核电站级别的安全保障：</p>
<p>鉴于当今的风险，前沿实验室需要像核电站或繁忙机场那样运行，配备多层冗余机制，并进行谨慎、耗时的规划，以确保偶发且不可避免的人为错误不会打开通往灾难的大门。</p>
<p>罗宾逊只是越来越多离开知名人工智能公司的研究人员和安全工作人员中的最新一员。雅各布·考克森似乎拉开了这场出走潮的序幕：他辞去了Anthropic的工作，随后公开表示，人工智能“可能在本世纪20年代结束前杀死我们所有人”。紧随其后的是Google DeepMind的罗伯特·奥卡拉汉、比拉尔·楚格泰和乔什·恩格尔斯，以及Anthropic的乔·本顿。</p>
<p>一份免费的每日摘要，汇总最重要的新闻。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-10-03 22:31 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/ai-artificial-intelligence/1004408/openai-safety-quits-sounding-the-alarm" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-rtup-has-come-to-america-3cc30dd136f9e1f6" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1290" data-content-paragraphs="20" data-published-at="2026-10-03T14:00:00.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-03 22:00</span>
</div>

### [Spotify亿万富翁创办的身体扫描初创公司进军美国](https://techcrunch.com/2026/10/03/spotify-billionaires-body-scan-startup-has-come-to-america/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Spotify billionaire’s body scan startup has come to America</div>

<div class="article-body" data-article-body="true"><p>Neko Health似乎是当下全球最热门的身体扫描服务。</p>
<p>这项扫描服务由Spotify联合创始人丹尼尔·埃克和哈尔马尔·尼尔松共同创办，利用先进技术筛查血液、皮肤和代谢方面的问题。该公司成立于瑞典，目前累计融资近10亿美元，并刚刚进入纽约市场。公司称，其全球候诊名单已经超过30万人。</p>
<p>TechCrunch与Preface Ventures的法鲁克·阿巴西进行了交谈。Preface Ventures曾投资该公司。阿巴西希望，Neko Health能够成为预防性医疗的未来，尤其是在美国这样的国家——美国的医疗体系一直以问题重重而闻名。</p>
<p>阿巴西认为，美国预防性医疗的使用率较低，原因在于人们担心费用过高。目前，Neko Health的一小时扫描服务收费500美元，保险不予报销，但对于拥有健康储蓄账户（HSA）的人来说，这笔费用应当符合可接受支出的条件。阿巴西说：“我认为预防性护理和医疗保健都应该便宜且易于获得。”</p>
<p>Neko Health希望能够解决其中一些问题，目前正考虑在美国各地扩张。阿巴西已经接受过两次扫描，或许并不令人意外的是，他表示自己很喜欢这项服务。他说：“我认为各地都应该有Neko诊所。”</p>
<p>他说，自他第一次体验这项产品以来，产品已经取得了长足发展。他说：“我那一代产品的扫描包含一项检测、15个生物标志物。这一次是55个。”</p>
<p>Neko还在扫描中使用先进的计算机视觉技术，阿巴西认为，这也是人工智能总体上推动医疗行业进步的又一个例子。他认为，Neko Health并不只是又一种健康潮流，而是能够为人们提供“可据以采取行动的洞见，帮助他们改善生活”的服务。</p>
<p>Neko在美国仍有很长的路要走，尤其是在扩大规模和获得监管批准方面。不过，阿巴西是个乐观主义者；他希望更多风险投资资金能够流向正确的公司，并不认为有什么问题是严重到无法解决的。</p>
<p>当您通过我们文章中的链接购买产品时，我们可能会获得一小笔佣金。这不会影响我们的编辑独立性。</p>
<p>高级记者，风险投资</p>
<p>多米尼克-马多里·戴维斯是TechCrunch的高级风险投资和初创公司记者，常驻纽约市。</p>
<p>您可以发送电子邮件至dominic.davis@techcrunch.com，或通过Signal加密信息联系+1 646 831-7565，以联系多米尼克或核实其外联信息。</p>
<p>第二张通行证享受五折优惠<br />Disrupt体验旨在与他人共享。购买您的通行证，并以五折价格带上同事、合作伙伴或同行。通过建立联系、积蓄势能并探索初创企业生态系统的未来，拓展您的视野。</p>
<p>谷歌认为，SpaceX的“星舰”必须发射1800次，太空数据中心才能真正启动</p>
<p>全球首座增强型地热发电厂仅用23个月建成</p>
<p>谷歌发布Gemini 4 Argon，称其为迄今最强大的模型</p>
<p>五角大楼邀请埃隆·马斯克和帕尔默·拉基协助决定军方下一步行动</p>
<p>OpenAI推出Dots：充满活力的代理型头像</p>
<p>AMD将以82亿美元收购李飞飞的World Labs</p>
<p>病毒式传播的人工智能代理Instinct完成10亿美元C轮融资，估值达100亿美元</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-03 22:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/03/spotify-billionaires-body-scan-startup-has-come-to-america/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ild-your-own-muse-gadget-0b0013541ceaec0b" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1148" data-content-paragraphs="18" data-published-at="2026-10-03T00:45:39.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-03 08:45</span>
</div>

### [Meta希望你的下一款设备融入Muse](https://techcrunch.com/2026/10/02/meta-wants-you-to-build-your-own-muse-gadget/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Meta wants your next gadget to be Muse-infused</div>

<div class="article-body" data-article-body="true"><p>Meta的Muse是一款个人AI代理，可以代表用户预订旅行、填写表格和购物。它已经受到大众欢迎，但一项新的副项目可能尤其吸引喜欢动手改装和开发的用户。</p>
<p>周五，该公司推出了Muse Gadgets，这是一个开源项目，让开发者能够打造连接Muse的自有硬件。</p>
<p>Meta提供了开源固件（即运行设备的底层软件）和Linux软件开发工具包（SDK），还提供了一些项目创意，帮助用户入门。这些创意包括为Muse配备彩色电子墨水显示屏，或将Muse装载到一根可插入电视HDMI接口的棒状设备上。</p>
<p>看起来，这方面几乎没有太多限制。用户可以设置一台树莓派等低成本爱好者电脑，或一块现成的ESP32开发板，然后将Muse连接到“显示屏、按钮、传感器、执行器，以及工作台上其他任何现成的东西”，Meta表示。</p>
<p>该公司还设立了一个Discord频道，为用户提供支持。</p>
<p>当然，Meta已经亲自试用了这套代码。Meta超级智能实验室产品负责人Nat Friedman在X上发帖称，该公司打造了一款名为Muse Home Link的设备。这款由USB-C供电的设备可以让Muse连接到家庭网络，并与网络中的智能设备通信，包括音箱和智能电视。</p>
<p>Muse Gadgets可能不会受到广泛欢迎，但它很好地契合了Meta将Muse打造为不只是独立聊天机器人的全盘战略。Meta并不满足于仅向普通消费者推广Muse；它也在努力吸引小型企业和大型企业。</p>
<p>本周早些时候，该公司推出了Muse for Small Business。这项服务免费提供，但设有使用限制，并可将Muse连接到Shopify、Dropbox和Slack等工具。Meta还成立了新的业务部门Meta Enterprise Platform，以帮助其向企业和公司客户推广AI产品。</p>
<p>当你通过我们文章中的链接购买商品时，我们可能会获得一小笔佣金。这不会影响我们的编辑独立性。</p>
<p>交通编辑</p>
<p>第二张通行证可享五折优惠<br />Disrupt活动的体验旨在与他人分享。购买你的通行证，并以五折优惠带上一位同事、合作伙伴或同行。通过建立联系、积蓄势能并发现创业生态系统的下一步，获得更多收获。</p>
<p>Google认为，SpaceX的星舰必须发射1800次，太空数据中心才能升空</p>
<p>全球首座增强型地热发电厂仅用23个月建成</p>
<p>Google发布Gemini 4 Argon，称其为迄今最强大的模型</p>
<p>五角大楼邀请埃隆·马斯克和Palmer Luckey协助决定军方下一步该怎么做</p>
<p>OpenAI推出Dots，这是一款外形活泼的智能代理化身</p>
<p>AMD将以82亿美元收购李飞飞的World Labs</p>
<p>病毒式传播的AI代理Instinct完成10亿美元C轮融资，估值达到100亿美元</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-03 08:45 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/02/meta-wants-you-to-build-your-own-muse-gadget/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ernment-from-using-flock-c2799b7592c2ba04" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1346" data-content-paragraphs="20" data-published-at="2026-10-03T00:21:57.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-03 08:21</span>
</div>

### [桑德斯提出法案，禁止联邦政府使用Flock](https://techcrunch.com/2026/10/02/sanders-introduces-bill-to-ban-the-federal-government-from-using-flock/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Sanders introduces bill to ban the federal government from using Flock</div>

<div class="article-body" data-article-body="true"><p>Flock Safety的摄像头在全美范围内扫描车牌，该公司持续引发公众不满。如今，参议员伯尼·桑德斯希望联邦政府彻底退出这一领域。</p>
<p>桑德斯周五提出《禁止Flock法案》（Ban Flock Act）。该法案将禁止联邦机构使用自动车牌识别系统（ALPR），也禁止联邦机构接入由地方警察和私营公司运营的车牌识别系统所收集的数据。尽管法案标题提到了Flock，但法案正文并未点名这家成立九年的公司，而是涵盖所有自动车牌识别系统。</p>
<p>该法案仅允许两类例外：收费公路收费，以及国会未来通过立法批准的用途；后者还必须将数据保存期限限制在48小时以内。</p>
<p>如果法案成为法律，州政府和地方政府若不遵守规定，将受到经济处罚。和大多数法案一样，这项法案通过的可能性并不高。法案颁布后的第一个财政年度起，除非相关政府禁止使用这项技术，否则将失去来自五个联邦部门的拨款，其中包括司法部和国土安全部。</p>
<p>美国民众也可以因联邦政府违反规定而提起诉讼，各州总检察长则可以负责执行该法律。</p>
<p>桑德斯表示，Flock是美国最大的自动车牌识别系统供应商，拥有超过12万台摄像头。该公司在今年2月的一篇博客文章中表示，其网络每月处理超过200亿条车辆识别记录。目前，该公司获得风险投资方的估值已超过80亿美元。</p>
<p>面对社区日益加大的压力——这些社区正抗议该产品、暂停使用，并以不断加快的速度取消相关合同——Flock收紧了规定。今年8月，首席执行官加勒特·兰利宣布，将默认数据保存期限从30天缩短至7天。兰利此前曾表示，警方如何使用这些摄像头由地方机构决定。</p>
<p>客户现在还必须使用一款审计工具。一旦该工具标记出异常搜索，系统就会在审核完成前阻止相关警员继续访问。在警员滥用Flock平台的高知名度案例中，密尔沃基市一名前警员承认行为不当：他曾179次搜索当时的伴侣及其前任的信息，并将搜索理由填写为“调查”。（在最近一次播客采访中，投资人杰森·卡拉卡尼斯提出了“双钥匙”系统的设想，即一次搜索必须获得两个人的批准；兰利表示，这一想法“已经列入白板讨论”。）</p>
<p>众议员亚历山德里娅·奥卡西奥-科尔特斯（纽约州民主党）和参议员杰夫·默克利（俄勒冈州民主党）是该法案的共同发起人。</p>
<p>我们将在即将于10月13日至15日在旧金山市中心举行的Disrupt大会上，与兰利进行座谈。</p>
<p>当你通过我们文章中的链接购买商品时，我们可能会获得少量佣金。这不会影响我们的编辑独立性。</p>
<p>主编兼总经理</p>
<p>购买第二张通行证可享五折优惠<br />Disrupt体验旨在与他人共享。购买你的通行证，并以五折价格带上一位同事、合作伙伴或同行。通过建立联系、积蓄发展势能并探索创业生态系统的下一步，拓展你的视野。</p>
<p>谷歌认为，SpaceX的“星舰”必须发射1800次，太空数据中心才有望升空</p>
<p>全球首座增强型地热发电厂仅用23个月建成</p>
<p>谷歌发布Gemini 4 Argon，称其为迄今最强大的模型</p>
<p>五角大楼邀请埃隆·马斯克和帕尔默·勒基协助决定军方下一步行动</p>
<p>OpenAI推出Dots，这是一款风格活泼的智能体化头像</p>
<p>AMD将以82亿美元收购李飞飞的World Labs</p>
<p>病毒式传播的人工智能智能体Instinct完成10亿美元C轮融资，估值达100亿美元</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-03 08:21 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/02/sanders-introduces-bill-to-ban-the-federal-government-from-using-flock/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

::::