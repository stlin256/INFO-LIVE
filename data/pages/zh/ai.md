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

:::cell
<div id="story-tability-ai-around-music-5671402926db891c" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="726" data-content-paragraphs="9" data-published-at="2026-10-02T21:09:14.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-03 05:09</span>
</div>

### [肖恩·帕克正围绕音乐重建 Stability AI](https://techcrunch.com/2026/10/02/sean-parker-is-rebuilding-stability-ai-around-music/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Sean Parker is rebuilding Stability AI around music</div>

<div class="article-body" data-article-body="true"><p>Napster联合创始人肖恩·帕克重新涉足音乐行业。他告诉《The Information》，这一次他会按规则行事。（他坦承，上一次宁可事后请求原谅、也不事先获得许可的做法，结果并不太好。）</p>
<p>两年前，他参与了对Stability AI的一项8000万美元救助行动。这家图像生成初创公司曾因过度支出和内部动荡而濒临崩溃，最终导致创始人埃马德·莫斯塔克被迫离任。如今，帕克和他的多年好友、后来出任首席执行官的普雷姆·阿卡拉朱，正揭开他们一直在打造的项目的面纱。</p>
<p>帕克表示，这一项目的核心构想，是将Stability打造为音乐专业人士首选的人工智能工具开发商。为此，公司在8月底宣布获得7600万美元融资，投资方包括索尼、华纳和环球等公司；作为交易的一部分，这些唱片公司还授权Stability使用其音乐目录进行训练。此后，Stability发布了三款新的音频模型和一款人工智能音乐编辑软件。这款人工智能可以根据文本提示生成完整的器乐曲目或简短片段。帕克表示，即将推出的更新将允许用户哼唱旋律或用口技打出鼓点，以此引导生成结果。</p>
<p>第二张通行证享受五折优惠<br />Disrupt活动的体验旨在与他人共享。购买您的通行证，并以五折优惠带上一位同事、合作伙伴或同行。通过建立联系、积蓄动力并发现创业生态系统中的下一步，拓展您的视野。</p>
<p>每个工作日和周日，您都可以获取TechCrunch报道中的精华内容。</p>
<p>TechCrunch Mobility是您获取交通运输新闻和洞察的目的地。</p>
<p>初创公司是TechCrunch报道的核心，因此请每周接收我们最优质的相关报道。</p>
<p>为各界风云人物提供开启一天所需的信息。</p>
<p>提交电子邮件即表示您同意我们的《条款》和《隐私声明》。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-03 05:09 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/02/sean-parker-is-rebuilding-stability-ai-around-music/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-use-ai-gadgets-home-link-038134d95b4f933e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="695" data-content-paragraphs="9" data-published-at="2026-10-02T21:08:37.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-03 05:08</span>
</div>

### [Meta开源相关代码，支持用户自制Muse AI硬件设备](https://www.theverge.com/tech/1004330/meta-muse-ai-gadgets-home-link)
<div class="original-title-sub"><span class="orig-tag">原文</span> Meta open sources code to let you make Muse AI gadgets</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/STKB394_MUSE_AI_CVIRGINIA_B.png?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="Meta开源相关代码，支持用户自制Muse AI硬件设备" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的文章将被添加到您的每日邮件摘要和主页信息流中。</p>
<p>Meta 现允许您将 Muse 连接到自己的硬件设备，以投放到显示屏或树莓派（Raspberry Pi）上。</p>
<p>该作者的文章将被添加到您的每日邮件摘要和主页信息流中。</p>
<p>查看 Jay Peters 的全部文章</p>
<p>Meta 现已开源相关代码，允许用户利用该公司的新款 AI 智能体自行制作专属 Muse 小硬件。Meta 建议的项目包括：将 Muse 加载到彩色电子墨水屏上以显示提醒、接入 HDMI 电视棒以便在大屏幕上显示 Muse，或者将其安装在小型触控屏设备上，打造类似于自制版 Muse Charm 的装置。</p>
<p>“Muse 硬件是供您自行制作的开源设备，”Meta 表示，“只需使用我们的 SDK 对现成的 ESP32 开发板进行编程或配置树莓派，然后将 Muse 连接到您的显示器、按钮、传感器、执行器以及工作台上随手可取的任何配件即可。”不过，Meta 也提醒道：“请自行承担风险！”</p>
<p>该公司还将免费赠送其打造的一款 Muse Home Link 硬件。Meta 表示，借助 Muse Home Link，用户可以使用社区构建的技能，让 AI 智能体“根据你的配置开灯、控制电视、向打印机发送文档等”。据 Meta 超级智能实验室（Meta Superintelligence Labs）的纳特·弗里德曼（Nat Friedman）透露，该公司制造了 5,000 台该设备，用户现在可以在本月某时正式发货前申请加入 Muse Home Link 的候补名单。</p>
<p>每日免费精选最重要的焦点新闻摘要。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-10-03 05:08 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/tech/1004330/meta-muse-ai-gadgets-home-link" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-er-brothers-greta-gerwig-0edfc79f5f1ff27d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1538" data-content-paragraphs="9" data-published-at="2026-10-02T20:30:26.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-03 04:30</span>
</div>

### [Netflix正在转向远离“精品路线”](https://www.theverge.com/streaming/1004323/netflix-david-fincher-shawn-levy-mike-flanagan-duffer-brothers-greta-gerwig)
<div class="original-title-sub"><span class="orig-tag">原文</span> Netflix is pivoting away from prestige</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2025/04/STK072_VRG_Illo_N_Barclay_7_netflix.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="Netflix正在转向远离“精品路线”" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的帖子将被添加到你的每日电子邮件摘要和首页信息流中。<br />查看所有娱乐内容<br />一连串知名导演的离开，让人感觉这家流媒体公司正在重新思考其取得成功的策略。<br />该作者发布的帖子将被添加到你的每日电子邮件摘要和首页信息流中。<br />查看查尔斯·普利亚姆-摩尔的所有文章<br />如果你通过链接购买商品，《The Verge》可能会获得佣金。请参阅我们的道德规范声明。</p>
<p>周四，Netflix表示，其与大卫·芬奇的制作协议将在合作六年后结束。这项合作最初于2020年公布，原定持续四年，赋予Netflix芬奇当时即将推出的项目的独家流媒体播放权，其中包括他的赫尔曼·J·曼凯维奇传记电影《曼克》。此前，芬奇曾担任Netflix原创剧集《纸牌屋》和《心灵猎人》等作品的执行制片人，因此，这份协议似乎表明Netflix相信他有能力持续吸引观众。</p>
<p>当时，芬奇曾开玩笑说，《曼克》在开始流媒体播放前的口碑和票房表现，将决定Netflix会允许他制作什么类型的项目。影评人普遍对这部电影给予好评，它最终获得了10项奥斯卡提名，并赢得其中两项。但在为期三周的院线放映期间，《曼克》票房仅约10万美元，而制作预算为2500万美元；登陆Netflix后，它也只在该平台观看量最高的十部电影榜单上停留了一天，而且排名垫底。尽管芬奇为Netflix制作的下一部作品——2023年的《杀手》——首播时登上榜单第一位，但该片票房收入仅为45.2万美元，预算却高达1.75亿美元，因而再次成为一项赔钱的投资。随着《克里夫·布斯的更多荒唐冒险》计划于12月23日登陆Netflix前在影院上映两周，这部电影可能又会成为芬奇交付了一部并未给这家流媒体公司带来巨大经济收益的作品的例子。</p>
<p>芬奇与Netflix的合作履历，在某种程度上与导演肖恩·利维相似。在近十年时间里，利维一直专门与这家流媒体公司合作，参与了《怪奇物语》《亚当计划》和《暗影与骨》等项目。上个月，他宣布与迪士尼签署了新的全面制作协议。利维的导演生涯始于多部迪士尼频道剧集，他将离开Netflix描述为某种意义上的回归故里。但人们很难不认为，他的“跳船”与《怪奇物语》最终季令观众和评论家失望有关。</p>
<p>2025年8月，《怪奇物语》联合创作者马特·达菲和罗斯·达菲宣布离开Netflix，转而与派拉蒙签署为期四年的电视及电影制作协议时，情况也是如此。两人未来仍可能参与《怪奇物语》相关项目，而他们的下一部剧集《博罗区》今年5月在Netflix上线时取得了尚可的成绩。但该剧上线仅一个月后就被取消。</p>
<p>Netflix联合首席执行官泰德·萨兰多斯近日在接受《好莱坞报道者》采访时表示，利维和达菲兄弟的离开，是因为这些电影人希望有更多时间从事长片项目。利维执导的《星球大战：星舰》定于明年5月首映，而达菲兄弟尚未公布片名的派拉蒙电影将于2028年某个时间上映。尽管萨兰多斯以积极的方式描述了这些电影人的离开，但他们的离开属于一种更大的趋势，似乎表明Netflix正在告别与电影人签署长期协议的时代。该公司还与《婚姻故事》的编剧兼导演诺亚·鲍姆巴赫分道扬镳；他为Netflix制作的其他项目，如《白噪音》和《杰伊·凯利》，都未能引起太大反响。</p>
<p>Netflix仍然押注于一些能够带来大量观众的导演。该流媒体公司与吉尔莫·德尔·托罗的制作协议仍在继续，并将格蕾塔·葛韦格即将推出的《纳尼亚传奇》系列首部电影视为一场真正的盛事：影片将在影院上映七周后才开始流媒体播放。此外，莱恩·约翰逊在履行完价值4.5亿美元、制作两部《利刃出鞘》续集的协议义务后正在休息，但他很可能会带着制作更多作品的计划回到Netflix。</p>
<p>一份免费的每日摘要，汇集最重要的新闻。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-10-03 04:30 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/streaming/1004323/netflix-david-fincher-shawn-levy-mike-flanagan-duffer-brothers-greta-gerwig" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ac-disk-access-ai-agents-ac153d8f7821405e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="820" data-content-paragraphs="11" data-published-at="2026-10-02T20:08:40.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-03 04:08</span>
</div>

### [苹果将限制 Mac 磁盘访问权限，因人工智能代理“大幅”增加风险](https://www.theverge.com/tech/1004295/apple-limit-mac-disk-access-ai-agents)
<div class="original-title-sub"><span class="orig-tag">原文</span> Apple will limit Mac disk access as AI agents ‘substantially’ increase risk</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/268759_Mac_Mini_AKrales_0079.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="苹果将限制 Mac 磁盘访问权限，因人工智能代理“大幅”增加风险" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>有关这一主题的帖子将添加到您的每日电子邮件摘要和主页信息流中。</p>
<p>据苹果公司称，Mac 应用很快将需要“非常明确的用户操作”才能获得完整磁盘访问权限。</p>
<p>有关这位作者的帖子将添加到您的每日电子邮件摘要和主页信息流中。</p>
<p>查看 Emma Roth 的所有文章</p>
<p>正如 TechCrunch 此前报道的那样，苹果将针对人工智能代理带来的风险，进一步限制 Mac 上的“完整磁盘访问”权限。苹果在周五的一项更新中表示，正在推出新的控制措施，以“确保那些确实希望向某个应用授予这一非同寻常级别访问权限的用户，只能通过非常明确的用户操作来完成这一授权”。</p>
<p>就在数周前，《Inc.》杂志的 Jason Aten 发现，Meta 的 Muse AI 不知通过何种方式获知了他的消息内容，尽管他并未明确允许这款聊天机器人访问自己 iPhone 或 Mac 上的消息。Meta 发言人 Andy Stone 对这篇报道提出异议，称访问“消息”功能“完全基于用户主动选择”。Stone 补充说，必须“同时启用‘完整磁盘访问’和 Muse 的‘消息连接器’，Muse 才能读取你的消息内容”。</p>
<p>如今，苹果开始处理开发者如何使用这一广泛访问权限的问题。苹果表示：</p>
<p>一些开发者正在以可能危及用户安全的方式使用“完整磁盘访问”，在用户并不完全知情或理解的情况下，暴露其系统中的所有内容——包括文件、邮件、消息，甚至浏览历史……随着人工智能代理的能力和自主性不断增强，与这种级别访问权限相关的风险也将大幅增加。</p>
<p>完整磁盘访问是 macOS 中的一项权限，可让应用访问用户的整个系统。苹果表示，这项功能“在很大程度上绕过了”提供给用户的隐私控制，目的是“让备份应用能够在 Mac 上正常运行”。该公司没有说明计划何时推出针对完整磁盘访问权限的更新。截至发稿，苹果尚未立即回应 The Verge 的置评请求。</p>
<p>每日免费获取最重要新闻的摘要。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-10-03 04:08 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/tech/1004295/apple-limit-mac-disk-access-ai-agents" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ling-tv-pass-cable-drops-c788ad59ba58c3da" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="590" data-content-paragraphs="10" data-published-at="2026-10-02T20:00:20.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-03 04:00</span>
</div>

### [Sling TV取消其单日有线电视通行证](https://www.theverge.com/streaming/1004300/sling-tv-pass-cable-drops)
<div class="original-title-sub"><span class="orig-tag">原文</span> Sling TV drops its one-day cable passes</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2025/11/STKB311_SLING_TV_B.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="Sling TV取消其单日有线电视通行证" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的帖子将被添加到你的每日电子邮件摘要和主页信息流中。</p>
<p>Sling Pass通行证已不再提供。此前，用户可以通过它观看ESPN和CNN等频道，而无需订阅整月的有线电视服务。</p>
<p>该作者发布的帖子将被添加到你的每日电子邮件摘要和主页信息流中。</p>
<p>查看Jay Peters的所有文章</p>
<p>如果你通过链接购买商品，《The Verge》可能会获得佣金。请参阅我们的道德规范声明。</p>
<p>据The Desk报道，由迪什公司旗下Sling TV推出的Sling Pass功能将不再提供。该功能允许用户按天购买有线电视节目内容。</p>
<p>这项功能于去年公布，提供日通行证、周末通行证和周通行证三种选择，用户无需订阅整月有线电视服务即可观看ESPN和CNN等频道。但该功能上线后不久，迪士尼和华纳兄弟探索公司就Sling Pass起诉了Sling TV。不过，一名联邦法官驳回了迪士尼提出的初步禁令申请，该申请旨在阻止这项功能。</p>
<p>Sling TV在其网站发布的一份声明中表示：“Sling的创立宗旨，就是让客户完全掌控自己的娱乐体验，而Sling Pass为数百万用户兑现了这一承诺。尽管Sling Pass目前已不再提供，但我们期待继续创新，为客户探索体验他们喜爱内容的新方式。”The Desk还报道称，这份通知已发送给客户。</p>
<p>免费获取一份每日新闻摘要，了解最重要的新闻。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-10-03 04:00 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/streaming/1004300/sling-tv-pass-cable-drops" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

::::