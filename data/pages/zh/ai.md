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
<div id="story-vicenow-ai-autosynthdata-56c490db040147f1" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="4861" data-content-paragraphs="54" data-published-at="2026-10-02T04:01:31.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/huggingface.svg" class="source-icon" alt="Hugging Face (开源模型社区)" width="16" height="16" /> <strong>Hugging Face (开源模型社区)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 12:01</span>
</div>

### [AutoSynthData：为企业级智能体生成训练数据](https://huggingface.co/blog/ServiceNow-AI/autosynthdata)
<div class="original-title-sub"><span class="orig-tag">原文</span> AutoSynthData: Generating Training Data for Enterprise Agents</div>

<div class="article-body" data-article-body="true"><p>企业需要能够在自身环境中良好运行的智能体（Agent）。它们要求这些智能体执行的工作，受制于企业所使用的系统、遵循的规则以及数据状态。一个模型可能具备广泛的通用能力，但在特定环境中仍会遇到困难：处理不力的高难度工作流、误用的工具组合，或是未能遵守的约束条件。这些正是企业需要改进的薄弱环节。</p>
<p>难点在于如何将这些薄弱环节转化为训练数据。单次失败能为我们提供一定线索，但训练模型需要大量新任务，在不同情境下对同一能力进行针对性锻炼。这些任务还必须能够在环境中切实完成，贴近实际用户的真实请求，并具备可靠的方法来检验智能体是否成功。</p>
<p>ServiceNow CoreAI 团队构建了 AutoSynthData，旨在将这些能力缺陷转化为训练数据。它利用目标模型的失败案例和能力更强的教师模型的成功案例，决定该模型接下来应该学习什么，随后生成并验证能够锻炼这些能力的新任务。随着模型的提升，教学大纲会逐步转向它仍然觉得棘手的领域。我们使用已发布的数据集，通过 EnterpriseOps Gym（Malay 等人，2026）来展示这一处理流程。我们首先介绍智能体所运行的环境，以及什么样的任务才对训练有价值。</p>
<p>智能体环境定义了智能体所运作的世界：它可以观察和修改的状态、可以调用的工具和 API，以及其行动所产生的状态转移。</p>
<p>任务是在该环境中被实例化的。我们采用如下抽象结构：</p>
<p>系统规格说明（System specification）定义了智能体运行所受的约束，包括系统指令、环境策略，以及适用的任务特定初始化配置（如预置的数据库状态或一组知识库文章）。</p>
<p>该规格说明必须与环境的工具、状态和支持的动作相兼容。其指令应当明确，并避免纯粹为了制造难度而人为引入任意约束。</p>
<p>用户提示词（User prompt）指明了用户希望智能体完成的目标，以及任何用户层面的约束。生成的任务应当满足三个特性：</p>
<p>可行性（Feasibility）。在当前环境中，必须存在至少一条既能满足用户提示词又能遵守系统规格说明的行动轨迹。这排除了依赖不可用工具、无法访问的知识、不可能的状态转移或策略禁止动作的任务。</p>
<p>真实性（Realism）。用户提示词应当符合用户在目标环境中可能提出的真实需求。可执行行为的空间通常远大于真实工作流的空间。</p>
<p>难度（Difficulty）。对于训练而言，任务应当能够暴露当前智能体的薄弱环节。已被可靠解决的任务几乎无法提供新的训练信号。因此，有价值的区间是那些既可行、又真实，但尚未被稳定解决的任务。</p>
<p>验证器（Verifier）用于判定生成的轨迹是否成功完成了任务。它应满足三个特性：</p>
<p>一致性（Consistency）。它必须与用户提示词、系统规格说明以及特定任务的环境状态保持一致。</p>
<p>稳健性（Soundness）。它应当拒绝未能完成任务或违反相关约束的轨迹。</p>
<p>完备性（Completeness）。它应当接受所有有效的解决方案，而不是只生硬匹配某一条特定的参考轨迹。</p>
<p>这些特性在训练过程中至关重要。宽松的验证器可能会奖赏错误行为，而过度严苛的验证器则可能惩罚有效解决方案。</p>
<p>在给定环境和目标模型的情况下，AutoSynthData 会生成由系统规格说明、用户提示词和验证器组成的训练任务。生成的任务立足于实际环境，并经过筛选，以便为当前模型提供有用的训练信号。</p>
<p>AutoSynthData 首先在环境中通过诊断任务评估目标模型，并识别其难以完成的任务模式。能力更强的教师模型有助于明确哪些任务是可解的，以及成功行为的范式。AutoSynthData 将由此发现的能力差距转化为新的可执行任务，在环境中逐一检查每个任务，并将合格样本用于后训练（post-training）。对更新后的模型进行评估可揭示仍存的短板，并指导下一轮的数据生成。</p>
<p>AutoSynthData 利用在目标环境中的评估运行结果，来识别模型接下来需要学习的内容。在 EnterpriseOps Gym 实验中，我们在评估任务上同时运行目标模型和更强的教师模型。我们检查这些运行以确定：</p>
<p>我们将这些发现提炼为经过净化的能力规格卡（capability specification cards）。评估任务指导模型应当学习什么，但生成器不会直接接收原始提示词、实体、轨迹或验证器细节。它接收的是这些规格卡，并利用它们创建具有不同提示词、状态和解决方案路径的新任务。</p>
<p>识别出能力差距指明了我们需要教授的内容，但训练需要大量多样化的任务来加以演练。AutoSynthData 利用规格卡来生成这些任务。</p>
<p>假设目标模型在需要以下工作流的任务中表现挣扎：</p>
<p>生成器会创建针对这一工作流进行演练的新任务，变换实体、初始环境状态、工作流构成、工具组合、措辞形式以及难度。随后，更强的教师模型为每个任务演示一条成功的轨迹。在监督微调（SFT）中，这些演示示例将教会目标模型如何在全新场景中应用该能力。</p>
<p>AutoSynthData 分两个阶段构建数据集：首先生成并验证核心样本，随后将其扩展为新颖的变体。</p>
<p>目标阶段（Target phase）根据能力规格说明创建核心训练样本集。工作节点并行生成独立任务，完成后自动领取新目标。每个候选任务在被接受前，都必须经过验证、执行、解算器评估和修复。最终得到的是围绕目标模型需要学习的内容构建的一批经过严格审核的示例。</p>
<p>增殖阶段（Multiply phase）通过对已接受的目标样本创建新颖变体来扩展数据集。每个变体拥有独立的用户请求、环境状态、实体配置、参考轨迹和验证器，并且必须通过相同的验证与执行检查。增殖生成的样本不能再次作为另一个增殖样本的种子。这确保了扩展始终锚定在经过审核的目标集上，并限制了跨代际的数据漂移。</p>
<p>为了支持这两个阶段，AutoSynthData 将生成控制与特定环境的执行分离开来。统一的控制器负责协调生成、质量控制、覆盖范围和数据集构建；适配器则负责处理环境执行、任务与状态管理、参考回放、确定性验证、解算器执行以及任务画像分析。</p>
<p>并行目标生成与扩展共同提供了一条通往训练规模数据集的路径。它们的有效性取决于对每个候选样本所实施的检查：任务必须是可执行的，解决方案必须有效，并且验证器必须能够区分成功与失败。</p>
<p>仅仅生成看似合理的请求并不足以产生有用的训练数据。任务在目标环境中可能无法实现，其参考解决方案在执行时可能会失败，或者其验证器可能会奖励错误的最终状态。AutoSynthData 在采纳任务用于训练之前，会先检查这些属性。</p>
<p>AutoSynthData 在两个层面上审核质量：单个候选样本必须通过验证，且批次必须提供有用的覆盖率和多样性。</p>
<p>每个候选样本在进入训练数据集之前都必须通过质量控制闭环。我们首先进行求解器评估以衡量难度。在本文所采用的配置中，我们偏好目标模型在三次尝试中最多解决一次、而更强大的求解器在三次尝试中至少能解决两次的任务。候选样本还要经历正向与负向验证以及有界的修复流程。</p>
<p>正向门禁会问：预期的解决方案是否解决了生成的任务？</p>
<p>该流水线在目标环境中执行参考轨迹，并根据候选样本的验证器检查生成的最终状态。这可以揭示提示词、初始状态、解决方案和成功标准之间的不匹配。</p>
<p>负向门禁会问：相关的错误结果是否会失败？</p>
<p>例如，它可以改变预期结果的部分内容，并确认这些状态不再通过验证。这可以捕捉到在未实现预期行为的情况下就判定成功的弱验证器。</p>
<p>未通过的候选样本在被丢弃之前会被送至批评器（critic）。批评器会检查样本及其失败原因，寻找不一致的状态、不可行的工作流、不正确的任务构造、不良的参考轨迹、薄弱的验证器逻辑或与预期能力的不匹配。批评器的发现将指导修复，并设有固定的重试次数上限：</p>
<p>修复后的任务必须再次通过相关检查。该诊断指导对现有候选样本进行修复，而不需要重新开始生成。</p>
<p>通过这些检查使样本具备了用于训练的资格，但单个有效的样本仍然可能构成重复或不平衡的数据集。因此，AutoSynthData 也会在批次层面上对生成进行审核。</p>
<p>一个批次可能会过度代表少数简单的任务族、遗漏某种能力，或者反映出在低产出模式上耗费了过多的生成工作量。</p>
<p>元审核（meta-review）会检查每个批次中被接受的样本、被拒绝的样本以及生成行为。它会询问：</p>
<p>控制器跟踪已接受数据集中的覆盖率，减少在过度代表区域的生成，并将更多工作导向空白区域。当某个区域反复生成低质量候选样本时，批评意见和元审核将指导对生成策略的调整。这些调整在可用的生成预算和数据集规模要求内，平衡了有用的学习信号、任务质量、覆盖率、多样性以及低冗余度。</p>
<p>这些反馈回路共同改进了单个任务及其构成的数据集：样本级检查指导候选样本修复，而批次级审核指导未来的生成。</p>
<p>随着模型的改进，有用的训练分布也会发生变化。AutoSynthData 将合成数据生成视为在目标模型能力边界附近寻找任务的过程：既要足够难，以暴露弱点；又要足够可解，以便教师模型能够提供可靠的示范。</p>
<p>在后训练之后，我们在相同的环境中评估更新后的模型。它现在能够可靠解决的任务对于下一轮训练的作用较小；持续的失败则指出了仍需关注的能力。这些结果可以指导下一轮生成。</p>
<p>我们的实验重点是监督微调（SFT），但同样的机制也可以支持强化学习（RL）：生成挑战当前策略并提供可靠学习信号的任务，进行训练，然后随着更新后的策略移动生成目标。我们计划在 SFT 之外测试这种经过难度校准的动态前沿。</p>
<p>我们使用 EnterpriseOps Gym 来测试这种方法是否能在有状态的企业环境中改进模型在任务上的表现。我们在 Gym 的 Hybrid 和 ITSM 环境中生成训练任务，在被接受的样本上对目标模型进行微调，并评估生成的检查点。</p>
<p>我们在 EnterpriseOps Gym 的 Hybrid 领域测试了该流水线，使用 Gemma-4-26B-A4B-it 作为目标模型，Qwen3.8-27B 作为教师模型。</p>
<p>AutoSynthData 在约 18 小时内生成了 2,000 个合成训练样本。我们在该数据集上对 Gemma 进行了微调，并在基准测试上评估了生成的检查点。最佳检查点为第 5 轮（epoch 5）。</p>
<p>合成 SFT 检查点将平均 Pass@1 提高了 7.2 个百分点，相对提升了 35%，并将验证器成功率从 63.01% 提高到 68.55%。它弥合了 Gemma 与参考模型之间最初 Pass@1 差距的 59%。</p>
<p>训练任务是根据能力规范全新生成的；生成器没有接收到原始的评估任务。这一结果展示了在本次实验所使用的环境——EnterpriseOps Gym Hybrid 中的性能提升。</p>
<p>我们还将 AutoSynthData 应用于 EnterpriseOps Gym 的 ITSM 领域，使用 Gemma-4-26B-A4B-it 作为目标模型，DeepSeek-V4.1-Flash 作为教师模型。AutoSynthData 在 66 小时内生成了 1,994 个合成训练样本。生成耗时比上述随后的 Hybrid 运行更长，主要是因为 ITSM 运行使用了更大的教师模型，且当时尚未进行提高吞吐量的流水线优化。</p>
<p>在 ITSM 上，合成 SFT 将平均 Pass@1 从 18.77% 提高到 27.18%，表明该方法在第二个领域同样能提升性能。</p>
<p>对训练最有用的任务取决于环境以及在该环境中运行的模型。AutoSynthData 利用模型的失败来选择要生成的内容，对照环境验证新任务，并使这些任务可用于后训练。我们在 EnterpriseOps Gym 上的结果展示了该方法在受控环境中的价值。随着模型的变化，相同的流程可以专注于仍然存在的差距。</p>
<p>来自该作者的更多内容</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>ServiceNow CoreAI 构建了 AutoSynthData，旨在将智能体的能力差距转化为训练数据。</li>
    <li>AutoSynthData 利用目标模型的失败和更强教师模型的成功来确定模型下一步应学习的内容，并生成和验证新任务。</li>
    <li>来源叙事重点：详细介绍用于生成企业级智能体后训练合成数据的端到端框架 AutoSynthData，重点阐述其如何识别模型能力缺口、利用教师模型生成任务规范、通过正负门禁与验证器确保数据质量，以及分阶段扩展训练集的技术架构</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#Hugging</span>
</div>

<div class="news-card-footer"><a href="https://huggingface.co/blog/ServiceNow-AI/autosynthdata" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【Hugging Face (开源模型社区)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-locking-first-responders-70339005d0202a51" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1805" data-content-paragraphs="18" data-published-at="2026-10-02T00:57:57.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 08:57</span>
</div>

### [Robotaxi运营商若阻碍紧急救援人员将面临罚款](https://techcrunch.com/2026/10/01/robotaxi-operators-will-face-fines-for-blocking-first-responders/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Robotaxi operators will face fines for blocking first responders</div>

<div class="article-body" data-article-body="true"><p>根据加利福尼亚州的一项新法律，特斯拉（Tesla）、Waymo和Zoox等自动驾驶汽车（AV）科技公司在其无人驾驶出租车（robotaxi）引发问题时，必须向紧急救援人员提供本地现场支持。如果无人驾驶出租车阻碍警察或消防员超过30分钟，这些公司还将面临罚款。</p>
<p>这项由州长加文·纽森（Gavin Newsom）签署成为法律的参议院第1246号法案（Senate Bill 1246），为自动驾驶汽车设定了一系列新规，旨在提高车辆发生故障或干扰应急救援人员时的安全性和响应时间。该法案还建立了在相关公司未履行职责时追究其责任的机制。</p>
<p>在此项法律出台前，加利福尼亚州发生了一系列备受关注的事件，其中包括无人驾驶出租车抛锚并扰乱交通、驶入犯罪现场或阻碍紧急救援人员。</p>
<p>这些事件中绝大多数涉及美国最大的无人驾驶出租车运营商Waymo。Waymo在全美的商用车队拥有约4000辆自动驾驶车辆，其中约1200辆位于旧金山湾区。TechCrunch今年早些时候的一项调查发现，在车辆遇到问题时，Waymo曾多次依赖紧急救援人员手动驾驶其车辆。</p>
<p>这些事件促使州及联邦立法者呼吁对无人驾驶出租车制定更严格的监管规则，尤其是针对它们在紧急救援人员周围时的行为规范。美国国家公路交通安全管理局（NHTSA）甚至致信自动驾驶汽车开发者，要求他们提出解决该问题的“方案”。</p>
<p>加州的这项新法律试图解决这些担忧，至少在全州范围内是如此。</p>
<p>提出该法案的州参议员戴夫·科尔特斯（Dave Cortese）表示：“加州接纳了自动驾驶汽车，但我们不能以牺牲公共安全为代价来拥抱创新。当自动驾驶车辆发生碰撞、抛锚、在紧急情况下堵塞道路，或阻碍执法人员及急救人员时，必须有明确的问责机制。”</p>
<p>根据该法律，自动驾驶汽车开发者只能雇佣常驻美国的远程驾驶员，且这些驾驶员必须持有美国驾照。此项要求的目的是为了解决有关公司在自动驾驶汽车陷入困境时如何进行远程操作的担忧。</p>
<p>“远程操作”（remote operations）一词的定义非常宽泛，外界对自动驾驶公司所采用的具体方式仍知之甚少。而法律中的“远程驾驶员”（remote drivers）一词则具体得多，它是指从远端直接操控或驾驶车辆的人员。特斯拉是唯一一家公开宣称拥有可以直接接管其无人驾驶出租车控制权的远程操作员的公司。</p>
<p>包括Waymo在内的其他公司则表示，他们采用的是某种形式的远程协助，即自动驾驶系统仍然掌控车辆，而人类员工可以在需要时提供指引或发送软件指令。Waymo拥有包括菲律宾在内的全球远程协助人员网络，并在亚利桑那州和密歇根州运营指挥中心。据Zoox称，其远程操作团队均常驻美国。</p>
<p>该法律还将要求自动驾驶公司在系统级故障期间，向市、镇及其他地方司法管辖区通报车辆的位置和状态，并提供能够协助处理自动驾驶事故和路障的“本地事故技术人员”。若自动驾驶车辆在紧急情况下阻碍救援人员超过30分钟，相关公司还将面临罚款。</p>
<p>包括Waymo和Zoox在内的公司已表示将遵守该规定。</p>
<p>Waymo发言人在一份电子邮件声明中表示：“我们感谢对法案所作的修改，这确保了自动驾驶汽车运营商仍能切实为加州居民提供服务。Waymo致力于让加州的道路更加安全，并不断提升我们的服务水平。”</p>
<p>该法律将于2028年7月生效。负责监管该州自动驾驶汽车的加利福尼亚州机动车辆管理局（DMV）将针对新法律的某些方面制定指导方针，包括规定的响应时间。</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会赚取小额佣金。这不会影响我们的编辑独立性。</p>
<p>交通编辑</p>
<p>第二张通行证立享五折优惠。Disrupt 的体验本就应该与人共享。购买您的通行证，携带同事、合伙人或同行即可享受五折优惠。通过建立人脉、积累势头并探索创业生态系统的下一个前沿，拓展更广阔的领域。</p>
<p>谷歌认为SpaceX的星舰必须发射1800次，太空数据中心才能真正落地<br />谷歌发布Gemini 4 Argon，称其为迄今为止最强大的模型<br />五角大楼邀请埃隆·马斯克和帕尔默·拉齐协助决定军方的下一步行动<br />AMD将以82亿美元收购李飞飞创立的World Labs<br />爆火AI智能体Instinct以100亿美元估值完成10亿美元C轮融资<br />Crusoe放弃在AI数据中心使用Boom涡轮机的12.5亿美元计划<br />Astra和Opus刚刚通过了图灵的另一项测试</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>加州州长加文·纽森签署了参议院第1246号法案（Senate Bill 1246），为自动驾驶汽车制定新规。</li>
    <li>若自动驾驶出租车阻碍警察或消防员超过30分钟，运营公司可能面临罚款。</li>
    <li>来源叙事重点：报道聚焦加州通过SB 1246法案对Robotaxi（特斯拉、Waymo、Zoox等）建立严格问责制，重点突显该法案针对阻碍急救应急响应设立罚款、要求配备本土现场支持及限制远程驾驶员资质的核心条款，强调在创新与公共安全之间的法律约束平衡。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/01/robotaxi-operators-will-face-fines-for-blocking-first-responders/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-rything-you-need-to-know-71bf6afee5fc842d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2890" data-content-paragraphs="24" data-published-at="2026-10-02T00:03:23.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 08:03</span>
</div>

### [TechCrunch Disrupt 2026 创始人指南：你需要知道的一切](https://techcrunch.com/2026/10/01/the-founders-guide-to-techcrunch-disrupt-2026-everything-you-need-to-know/)
<div class="original-title-sub"><span class="orig-tag">原文</span> The founder’s guide to TechCrunch Disrupt 2026: Everything you need to know</div>

<div class="article-body" data-article-body="true"><p>TechCrunch Disrupt 2026 围绕着一个核心问题展开：在人工智能时代，你该如何打造一家基业长青的公司？基于我们从社区收集的反馈以及当下的行业现状，我们的大会议程与嘉宾阵容正是这一主题的体现。</p>
<p>去年在 Disrupt 现场，我们与多位创始人交流了他们的参会经历，并亲眼见证了他们参会所收获的成果。一位创始人在确认入围“创业竞技场”（Startup Battlefield）后，融资获得了 3 倍的超额认购，并收到了超过 100 家投资机构的主动接洽，助力其推进下一轮融资谈判。另一位创始人则在台上完成路演后，迎来了蜂拥而至并一路跟随到其展位的投资人，连续进行了近 30 场背靠背的深入沟通。</p>
<p>这在 Disrupt 绝非个例——这正是该大会的核心意义所在。而且，这些机会并不仅限于“竞技场”决赛选手。在展览大厅或周边活动中的每一次交流，都可能为你的初创企业创造契机。多年来，无论是在纽约、旧金山还是其他地方举办，Disrupt 汇聚了成千上万的创始人、投资者、初创团队成员以及科技领袖。</p>
<p>今年 10 月 13 日至 15 日，我们将在旧金山莫斯康展览中心西馆（SF’s Moscone West）继续践行这一使命。届时将有豪华的演讲嘉宾阵容、超过 200 场专家研讨会、丰富的官方组织与偶遇性质的社交机会，而最重要的是，你有机会与那个能够彻底改变你的创业雏形理念或现存公司发展轨迹的人共处一室。</p>
<p>本指南专为那些刚刚了解 Disrupt、需要温故知新，或是对其是否物有所值持怀疑态度的创始人量身打造。TechCrunch 已创立超过 20 年；我们经得起推敲。在你深入了解之前，请注意我们在 Disrupt 开幕前推出的两项优惠活动：创始人可以通过此链接以半价为团队成员加购一张门票，或者你也可以通过我们大幅打折的 Expo+ 通票，帮助你人脉圈中遭遇裁员的人员在 Disrupt 寻找下一个机遇。</p>
<p>如果你正在向 Claude 或 ChatGPT 询问 TechCrunch Disrupt 是否值得参加，持有这种疑问的绝不止你一个。现实情况是，Disrupt 是一场独一无二的盛会，且恰逢创业社区发展的关键特殊时刻。</p>
<p>今年的 Disrupt 重点不在于预测人工智能的未来，而在于在 AI 时代中脚踏实地打造公司。在六个由编辑团队精心策划的舞台上，创始人将聆听来自正在塑造未来十年科技格局的 CEO、投资者、工程师和运营专家传授的实战经验。</p>
<p>无论你是在筹集首轮资金、扩张团队，还是在权衡 AI 如何重塑你的产品，每场会议的设计都旨在解答一个核心问题：“周一早上我能把什么带回公司付诸实践？”</p>
<p>根据你在创业历程中所处阶段的不同，Disrupt 能够为你提供差异化的体验路径，你可以遵循不同的方向充分利用这三天时间：</p>
<p>你来到这里是为了严苛验证自己的商业构想、结识你的首批天使投资人或种子轮前投资人，并摸清还有谁在你的赛道中创业。请重点关注“建设者舞台”（Builders Stage）、“创业竞技场”半决赛路演、展览大厅，以及与你所在行业相关的圆桌讨论和能让你学到更多干货的交流会。</p>
<p>你来这里的首要目标是获取资本与市场验证，而你的时间非常宝贵。请优先使用我们的投资人配对工具以及创始人通票（Founder Pass）附带的人脉资源，包括我们 App 内的社交拓展工具。你还可以进入“交易流咖啡厅”（Deal Flow Café），我们在那里为创始人和投资人创造一对一交流的良机。</p>
<p>而在你的日程没有被投资洽谈排满时，也可以前往“建设者舞台”，从 VC 的视角吸收行业洞察并参与聚焦融资的专题讨论。</p>
<p>你来到这里是为了寻找顶尖人才、战略合作伙伴和提升市场曝光度。同样的社交工具和机遇能帮助你结识潜在的雇员与合伙人，进一步深化现有关系或拓展新的人脉。Disrupt 的周边活动（Side Events）绝对不容错过——无论你涉足什么行业、抱有何种兴趣，或想在会后寻找怎样的氛围，都能在这里找到心仪的活动。</p>
<p>“创业竞技场”获胜者的揭晓总能让 Disrupt 的舞台座无虚席，这也是每年大会的压轴重头戏。然而，对于参加 Disrupt 的创始人而言，最有价值的恰恰是向那张 10 万美元支票冲刺的全过程，以及获胜者所收获的海量关注。</p>
<p>入选 8 月 20 日比赛的 200 家初创企业历经了严格的备战筹备流程，并获得了在顶尖 VC 和全场 Disrupt 观众面前登台路演的宝贵机会。你也可以现场观摩这些路演、做笔记，从高光表现与失误弯路中汲取经验教训，甚至可能直接结识这些创意与创新背后的团队。这种接触可能发生在会后的跟进会议中，也可能就在漫步穿过莫斯康展览大厅的偶遇间。</p>
<p>如果这一切让你备受鼓舞，这里有一个内部秘诀：大多数“竞技场”参赛者甚至若干获胜者，都曾多次参与该选拔流程。我们虽然已不再接收 2026 年赛事的申请，但我们正将该项目拓展至更多国际市场，且 2027 年的流程将与今年类似，所以请为未来做好准备！</p>
<p>Disrupt 2026 涵盖多个舞台，每一个都围绕创始人不同的核心诉求而建：</p>
<p>而这仅仅是个开始——随着 Disrupt 临近，我们还将公布更多演讲嘉宾名单。点击此处查看所有舞台和活动的完整演讲嘉宾阵容。</p>
<p>随着大会临近，Disrupt 的门票价格将会上涨，但我们为希望节省成本的创始人准备了几项优惠活动。你可以通过此处的链接购买第二张门票享受五折优惠，带上你的同事或联合创始人一同参会。</p>
<p>如果你的人脉网络中有受裁员影响的同行并希望邀请他们加入，我们同样为他们准备了选项：为今年受裁员裁撤影响的人员限量提供 75 美元的特价 Expo+ 通票。</p>
<p>你在 Disrupt 的时间同样弥足珍贵，因此在出发之前，请务必查看我们定期更新的演讲嘉宾和周边活动日程表，提前预约你的社交拓展机会以抢占先机，并打磨好你的电梯演讲，以便在 10 月 13 日至 15 日期间随时抓住那些神奇的 Disrupt 关键机遇！</p>
<p>当你通过我们文章中的链接购买时，我们可能会赚取小额佣金。这不会影响我们的编辑独立性。</p>
<p>购买第二张门票享五折优惠。Disrupt 的体验理应与他人共享。立即购票，即可享受半价携同事、合伙人或同行参会。通过建立人脉、积累势头，并在创业生态中发现下一个风口，全面拓宽你的业务疆界。</p>
<p>谷歌认为 SpaceX 的星舰（Starship）必须发射 1800 次，太空数据中心才能真正落地<br />谷歌发布 Gemini 4 Argon，称其为迄今为止最强大的模型<br />五角大楼邀请埃隆·马斯克和帕尔默·拉奇参与决策美军未来行动方向<br />AMD 将斥资 82 亿美元收购李飞飞的 World Labs<br />现象级 AI Agent 初创公司 Instinct 完成 10 亿美元 C 轮融资，估值达 100 亿美元<br />Crusoe 放弃在 AI 数据中心使用 Boom 涡轮机的 12.5 亿美元计划<br />Astra 和 Opus 刚刚通过了图灵的另一项测试</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>TechCrunch Disrupt 2026 定于 10 月 13 日至 15 日在旧金山的 Moscone West 举行。</li>
    <li>TechCrunch Disrupt 2026 设有 6 个编辑策划的舞台及超过 200 场专家会议。</li>
    <li>来源叙事重点：重点推介 TechCrunch Disrupt 2026 大会的商业与人脉价值，强调其聚焦&#39;AI 时代打造持久企业&#39;的务实定位，突出展示 Startup Battlefield 竞技、Deal Flow Café 投资对接机制以及门票折扣，旨在促成创始人购票与参会转化。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/01/the-founders-guide-to-techcrunch-disrupt-2026-everything-you-need-to-know/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-security-camera-no-video-b18ced003f0a5e35" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="865" data-content-paragraphs="13" data-published-at="2026-10-01T22:51:36.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 06:51</span>
</div>

### [据传苹果正在开发一款不录制视频的智能家居摄像头](https://www.theverge.com/tech/1003877/apple-security-camera-no-video)
<div class="original-title-sub"><span class="orig-tag">原文</span> Apple’s reportedly developing a smart home camera that doesn’t record video</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2025/03/STK071_APPLE_I.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="据传苹果正在开发一款不录制视频的智能家居摄像头" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该话题的内容将被添加到您的每日电子邮件摘要和主页信息流中。</p>
<p>随着传言称苹果将于下个月推出一款智能家居中枢，它可能还会附带一款保护隐私的安全摄像头。</p>
<p>该作者发布的内容将被添加到您的每日电子邮件摘要和主页信息流中。</p>
<p>查看史蒂维·博尼菲尔德（Stevie Bonifield）的全部文章</p>
<p>据传苹果进军智能家居技术的举措可能包括一款智能家居安全摄像头，该摄像头仅向用户提供文本事件描述，而不提供视频画面。马克·古尔曼（Mark Gurman）在《Power On》播客的第一期中表示，该摄像头将与传闻中的苹果智能家居中枢一起，成为“苹果全新智能家居生态系统”的一部分：</p>
<p>“他们还在打造家庭安全产品，包括第一方和第三方家庭安全产品。其中最重头的是一个代号为J450的项目。这是J490智能家居显示屏的衍生及配套产品。这些是你可以放在房子周围的小型摄像头。它们的帧率非常低。它看起来像一个圆柱体。就像一个金属质感的超大号润唇膏。”</p>
<p>“这意味什么？不录制视频。所以它是一个实际上无法提取真实视频画面的传感器。它只是通过AI来分析你家中及住宅周围的环境。”</p>
<p>古尔曼还提到，该摄像头采用的“技术非常相似”，类似于今年早些时候曝光的、据传苹果正在为一款带摄像头的AirPods开发的技术。</p>
<p>与使用毫米波（mmWave）等技术进行存在感应不同，使用内置AI且完全在设备端处理所有数据的图像传感器（例如索尼IMX500传感器），可以在不传输需要存储和保障安全的图像的情况下正常工作。苹果家庭（Apple Home）目前对“HomeKit安全视频”（HomeKit Secure Video）摄像头设有“检测活动”设置，该设置会停止视频流式传输和录制，但仍会继续追踪动态，这与古尔曼所描述的类似。</p>
<p>他接着补充道，这款智能家居摄像头将具备面部识别功能，用于检测有人进入房间等情况，但是，“你除了能收到文字描述外，什么都拿不到。你无法用它做别的事情。它不录制任何视频。”</p>
<p>查看所有苹果传闻</p>
<p>免费获取每日重要新闻摘要。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-10-02 06:51 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/tech/1003877/apple-security-camera-no-video" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-amazon-bedrock-agentcore-c8364c18fa741f01" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="15716" data-content-paragraphs="71" data-published-at="2026-10-01T22:06:14.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/aws.svg" class="source-icon" alt="AWS Machine Learning Blog (亚马逊云科技官方英文)" width="16" height="16" /> <strong>AWS Machine Learning Blog (亚马逊云科技官方英文)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 06:06</span>
</div>

### [利用 Amazon Bedrock AgentCore 上的智能体 AI 规模化推进云迁移](https://aws.amazon.com/blogs/machine-learning/scaling-cloud-migrations-with-agentic-ai-on-amazon-bedrock-agentcore/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Scaling cloud migrations with agentic AI on Amazon Bedrock AgentCore</div>

<div class="article-cover"><img src="https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/10/01/REVBLOG-1301-1-1.png" alt="利用 Amazon Bedrock AgentCore 上的智能体 AI 规模化推进云迁移" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>2026 年 10 月：本文已通过审查并更新，以确保准确性。</p>
<p>利用 Amazon Bedrock AgentCore 上的智能体 AI（agentic AI）规模化推进云迁移引出了一个切合实际的问题：在大型迁移项目中，哪些部分属于托管服务，哪些部分需要定制化自动化？某企业项目在面对 300 多个应用程序以及严格的财年截止日期时回答了这一问题。根据内部项目跟踪数据，本文介绍的四智能体架构模式将每个应用程序的基础设施即代码（IaC）开发时间从 3 到 4 周缩短至数分钟。</p>
<p>该模式与 AWS Transform 协同运行而非取而代之，是一种在项目需要的地方添加定制智能体的混合模式。AWS Transform 负责迁移和现代化改造工作，AWS Database Migration Service（AWS DMS）负责数据库层。本文介绍的智能体会连接到这些服务，并满足另一项需求：通过贵组织构建和维护的模型上下文协议（Model Context Protocol，MCP）工具来访问源和目标。</p>
<p>AWS 专业服务团队（AWS Professional Services）为具有此类需求的项目构建了一套专用 AI 智能体。这些智能体使用 Strands Agents SDK，并运行在 Amazon Bedrock AgentCore 之上——这是一个可使用任何框架或模型规模化构建、连接和优化智能体的平台。每个智能体都通过 AgentCore Gateway 暴露的 MCP 工具来访问其源和目标。</p>
<p>在本文中，您将探讨适用于 MCP 连接环境的四智能体模式架构。您还将看到定义智能体、将其连接到工具并应用负责任 AI 控制的代码。该模式包含四个智能体：<br />- 接入智能体（Intake Agent）：通过 MCP 工具从文档和协作系统中读取迁移输入。<br />- IaC 智能体（IaC Agent）：生成由经批准的内部模块构成的 IaC。<br />- 迁移智能与治理智能体（Migration Intelligence and Governance Agent）：在贵组织内部的项目工具中进行报告和治理。<br />- 网站可靠性工程（SRE）智能体（Site Reliability Engineering Agent）：负责割接后的运维运营。</p>
<p>若要跟随本文操作，您需要一个拥有 Amazon Bedrock AgentCore 和 Amazon Bedrock 基础模型访问权限的 AWS 账户。您还需要熟悉 Strands Agents SDK 和 MCP 服务器模式，以及贵组织使用的 IaC 工具。请先确认 AWS 托管服务尚未涵盖您的迁移路径。</p>
<p>该模式的适用场景<br />AWS Transform 作为一项托管服务，涵盖了服务器、网络、大型机、.NET 和应用程序代码工作负载的迁移与现代化改造，而 AWS DMS 则负责数据库。该模式针对贵组织特有的特定需求添加了智能体。</p>
<p>在本文所述的项目中，同时满足了三个条件：<br />1. 通过 MCP 连接的源和目标：保存迁移输入的系统以及接收输出的系统，都是通过交付团队构建和维护的 MCP 工具来访问的。其中包括保存安全标准的内部 Wiki、工单系统、协作平台以及自研资源配置 API。<br />2. 组织特有的 IaC 组合：生成的基础设施代码必须组合由安全部门审查和批准的内部模块库。手动编写这种组合针对每个应用程序需要 3 到 4 周时间，对于超过 300 个应用程序的产品组合而言，这意味着长达数年的工程工作量。<br />3. 割接后仍需继续开展的工作：项目范围包括移交后的运营运维，这超出了迁移服务的范畴。</p>
<p>架构概述<br />该模式使用了四个专用智能体。该架构在三个切入点连接到迁移项目：保存迁移输入的系统、IaC 组合以及割接后的运维运营。该模式在每个切入点都应用了安全控制。下图展示了智能体、工具和 AWS 服务是如何连接的。</p>
<p>图 1：智能体如何通过模型上下文协议工具调用在迁移和运营旅程中建立连接</p>
<p>该模式将智能体划分为两个旅程。迁移旅程智能体负责从发现到部署的整个过程。运营旅程智能体负责迁移后的监控。</p>
<p>迁移旅程智能体：<br />- 接入智能体（Intake Agent，第一阶段）：通过 MCP 工具读取架构文档、调查问卷和依赖关系记录，然后定义目标状态架构。<br />- IaC 智能体（IaC Agent，第二阶段）：为每个应用程序生成组合了经批准的内部模块的 IaC。<br />- 迁移智能与治理智能体（Migration Intelligence and Governance Agent）：在 Jira、Confluence 和 Webex 之间提供自动化的项目组合报告、架构完善（Well-Architected）评估及治理。</p>
<p>运营旅程智能体：<br />- SRE 智能体（SRE Agent，第三阶段）：在割接后提供监控和自动化修正。</p>
<p>AWS 托管服务承载迁移工作，并与定制智能体形成互补：<br />- AWS Database Migration Service (AWS DMS)：为数据库迁移提供生成式 AI 辅助的模式（schema）转换与自动化割接。<br />- AWS Transform：负责大型机、虚拟化和 .NET 工作负载的发现、迁移批次（wave）规划、着陆区（Landing Zone）创建、网络转换、重新托管（rehost）或重构平台（replatform）执行以及现代化改造。</p>
<p>各组件如何连接<br />本节介绍该框架组件在运行时的交互方式。</p>
<p>每个智能体都是一个 Strands 智能体，由基础模型、系统提示词和一组工具定义。Amazon Bedrock AgentCore 运行时在具有会话隔离和多智能体编排功能的无服务器环境中托管它们。Amazon Bedrock 基础模型为解析文档、生成代码和驱动多步骤工作流的推理能力提供支持。有关各 AWS 区域的模型可用性，请参阅《Amazon Bedrock 中支持的基础模型》（Supported foundation models in Amazon Bedrock）。</p>
<p>每个智能体通过 AgentCore Gateway（Amazon Bedrock AgentCore 的一项功能）调用限定在其功能范围内的 MCP 工具，该网关可将您的 API、AWS Lambda 函数和现有服务转换为兼容 MCP 的工具。AgentCore Identity（Amazon Bedrock AgentCore 的一项功能）通过限定作用域的 AWS Identity and Access Management (IAM) 角色和您的身份提供商对每次调用进行身份验证。</p>
<p>Amazon Bedrock AgentCore 内存用于存储智能体会话状态和共享上下文。智能体利用此共享上下文来持久化输出，并跨 300 多个应用程序跟踪迁移进度。当接入智能体完成发现后，它会将目标架构和依赖映射写入 AgentCore 内存中。IaC 智能体读取该共享上下文以启动代码生成，无需人工移交交接。</p>
<p>在代码中定义智能体<br />以下 Python 示例定义了 IaC 智能体，并为其在 Amazon Bedrock AgentCore 运行时上的部署做好准备。该智能体通过 AgentCore Gateway 访问您的 MCP 工具，并通过附加了 Amazon Bedrock Guardrails 策略的 Amazon Bedrock 调用基础模型。</p>
<p>import json import logging import os import uuid from bedrock_agentcore.runtime import BedrockAgentCoreApp from strands import Agent from strands.models import BedrockModel from strands.tools.mcp import MCPClient from strands.tools.mcp.mcp_types import MCPClientCredentials</p>
<p>```python<br />logger = logging.getLogger(__name__)<br />app = BedrockAgentCoreApp()<br />REGION = os.environ[&quot;AWS_REGION&quot;]<br /># url+auth 允许 SDK 运行 client_credentials 授权并在过期时重新生成<br /># 令牌。静态捕获的 Bearer [REDACTED] 则会失效。<br />gateway = MCPClient(<br />    url=os.environ[&quot;GATEWAY_MCP_URL&quot;],<br />    auth=MCPClientCredentials(<br />        client_id=os.environ[&quot;GATEWAY_CLIENT_ID&quot;],<br />        client_secret=get_secret(&quot;gateway/client_secret&quot;),<br />        scopes=[os.environ[&quot;GATEWAY_SCOPE&quot;]],<br />    ),<br />)<br />model = BedrockModel(<br />    model_id=os.environ[&quot;MODEL_ID&quot;],<br />    region_name=REGION,<br />    guardrail_id=os.environ[&quot;GUARDRAIL_ID&quot;],<br />    guardrail_version=os.environ.get(&quot;GUARDRAIL_VERSION&quot;, &quot;1&quot;),<br />    guardrail_trace=&quot;enabled&quot;,<br />)</p>
<p>@app.entrypoint<br />def invoke(payload, context):<br />    prompt = (payload.get(&quot;prompt&quot;) or &quot;&quot;).strip()<br />    if not prompt:<br />        return {&quot;status&quot;: &quot;error&quot;, &quot;error&quot;: &quot;missing required field: prompt&quot;}</p>
<p>try:<br />        with gateway:<br />            # 首先获取当前迁移批次已批准的策略，从而使规则<br />            # 直接包含在系统提示词中，而无需依赖模型主动查询。<br />            lookup = gateway.call_tool_sync(<br />                tool_use_id=str(uuid.uuid4()),<br />                name=&quot;get_policies&quot;,<br />                arguments={<br />                    &quot;resource_types&quot;: payload.get(&quot;resource_types&quot;, []),<br />                    &quot;wave&quot;: payload.get(&quot;wave&quot;),<br />                },<br />            )<br />            if lookup[&quot;status&quot;] != &quot;success&quot;:<br />                return {&quot;status&quot;: &quot;error&quot;, &quot;error&quot;: &quot;policy lookup failed&quot;}<br />            policies = lookup.get(&quot;structuredContent&quot;, {})</p>
<p># tools=[gateway]：SDK 自行管理连接生命周期并进行工具发现的分页，<br />            # 这是仅使用 list_tools_sync() 所无法实现的。<br />            agent = Agent(<br />                model=model,<br />                system_prompt=(<br />                    f&quot;{IAC_AGENT_PROMPT}\n\n&quot;<br />                    f&quot;Generated IaC satisfies these approved policies:\n&quot;<br />                    f&quot;{json.dumps(policies.get(&#39;policies&#39;, []), indent=2)}&quot;<br />                ),<br />                tools=[gateway],<br />            )<br />            result = agent(prompt)</p>
<p>if result.stop_reason == &quot;guardrail_intervened&quot;:<br />                logger.warning(&quot;guardrail blocked request, session_id=%s&quot;, getattr(context, &quot;session_id&quot;, None))<br />                return {&quot;status&quot;: &quot;blocked_by_guardrail&quot;}</p>
<p>return {<br />                &quot;status&quot;: &quot;ok&quot;,<br />                &quot;iac&quot;: str(result),<br />                &quot;policy_set_version&quot;: policies.get(&quot;version&quot;),<br />                &quot;waived_policies&quot;: policies.get(&quot;waived&quot;, []),<br />            }<br />    except Exception as e:<br />        logger.exception(&quot;invocation failed, session_id=%s&quot;, getattr(context, &quot;session_id&quot;, None))<br />        return {&quot;status&quot;: &quot;error&quot;, &quot;error&quot;: str(e)}</p>
<p>if __name__ == &quot;__main__&quot;:<br />    app.run()<br />```</p>
<p>该入口点返回生成的 IaC（基础架构即代码）以及指导其生成的策略集版本，以便审查人员能够将输出追溯至经审批的标准。AgentCore Runtime 负责处理会话隔离与扩缩容。有关可部署的示例，请参阅 GitHub 上的 Amazon Bedrock AgentCore 示例代码库和 Strands Agents 示例代码库。有关部署步骤，请参阅《AgentCore 运行时入门指南》。</p>
<p>阶段 1：用于自动化调研发现的 Intake Agent（信息录入智能体）<br />Intake Agent 会读取留存于您的文档和协作系统中的迁移输入数据。在此项目中，交付团队所构建和维护的 MCP 工具使这些系统变得可访问。</p>
<p>该智能体通过这些工具摄取架构文档、应用程序清单列表、调研问卷以及依赖项记录。随后，它会生成目标 AWS 架构，并附带推荐的迁移模式、资源规格说明以及合规性验证报告。</p>
<p>该输出会直接传递给 IaC Agent，从而实现从调研录入到基础设施预置的自动化移交。</p>
<p>阶段 2：用于自动化基础设施代码生成的 IaC Agent（IaC 智能体）<br />AWS 专业服务团队（AWS Professional Services）在该产品组合中首先部署了 IaC Agent，它带来了最为立竿见影的成效。它能够生成完全符合您的安全最佳实践与标准的 IaC 代码。</p>
<p>该智能体的工作流分为五个步骤：</p>
<p>第 1 步：摄取指导文档。该智能体读取迁移批次（wave）团队提供的指导文档。它会提取部署范围、合规性约束以及经安全办公室审批的特定批次覆盖项。</p>
<p>第 2 步：解读目标状态架构图。利用 Intake Agent 的输出，IaC Agent 识别基础设施组件及其相互关系与依赖项。</p>
<p>第 3 步：生成 IaC。基于该解读，该智能体使用您预先定义且确立的模式生成 IaC。它将特定批次的参数填入配置中，并配置远程状态管理。随后，它会应用强制标签，并添加组织标准所要求的监控配置。</p>
<p>第 4 步：通过 Amazon Bedrock AgentCore 中的 Policy 进行验证。在执行之前，AgentCore 中的 Policy 功能会根据 Cedar 规则对每次工具调用进行评估。它计算潜在变更的范围，检查与并行批次的依赖冲突，并确认合规时间窗口的有效性。</p>
<p>第 5 步：执行与汇报。集中化执行平面触发 IaC、监控部署，并通过 Amazon Bedrock AgentCore 的能力之一——AgentCore Observability 汇报结果。部署后验证会自动运行，合规性指标也会实时更新。</p>
<p>自定义 MCP 工具：安全基石<br />每项操作都通过由 Amazon Bedrock AgentCore Gateway 暴露的自定义 MCP 工具进行传递，并由 AgentCore Identity 以及 AgentCore 中的 Policy 进行监管。AgentCore Identity 通过具有最小权限访问的作用域 IAM 角色对每次智能体操作进行身份验证。该框架会根据预定义模式验证输入，并在边界处拒绝格式错误的输入。</p>
<p>没有任何凭证或敏感数据会通过智能体上下文传递，因为 AgentCore Identity 会在运行时从集中的凭据提供程序解析密钥。AgentCore Observability 和 AWS CloudTrail 会将每次智能体操作记录到不可变的集中式审计追踪中。AgentCore 中的 Policy 强制执行 Cedar 规则，有助于防止单一操作所造成的影响超出预设阈值。</p>
<p>作为 MCP 工具的组织精选策略<br />策略集由安全办公室负责维护和管理，而非智能体本身。一份带有版本控制的文档记录了每条规则、其覆盖的资源类型、机器可校验的断言以及审批记录。以下示例展示了三项策略以及一项批次例外。</p>
<p>{ &quot;policy_set&quot;: &quot;security-office/baseline&quot;, &quot;version&quot;: &quot;2026.09.1&quot;, &quot;policies&quot;: [ { &quot;id&quot;: &quot;SEC-ENC-001&quot;, &quot;applies_to&quot;: [&quot;aws_s3_bucket&quot;, &quot;aws_ebs_volume&quot;, &quot;aws_rds_cluster&quot;], &quot;requirement&quot;: &quot;Encrypt data at rest with a customer managed KMS key&quot;, &quot;assertion&quot;: &quot;kms_key_id != null and sse_algorithm == &#39;aws:kms&#39;&quot;, &quot;severity&quot;: &quot;blocking&quot;, &quot;source&quot;: &quot;SecOffice/Encryption-Standard-v4&quot; }, { &quot;id&quot;: &quot;SEC-NET-014&quot;, &quot;applies_to&quot;: [&quot;aws_security_group_rule&quot;], &quot;requirement&quot;: &quot;No ingress from 0.0.0.0/0 on administrative ports&quot;, &quot;assertion&quot;: &quot;not (cidr_blocks contains &#39;0.0.0.0/0&#39; and to_port in [22, 3389])&quot;, &quot;severity&quot;: &quot;blocking&quot;, &quot;source&quot;: &quot;SecOffice/Network-Standard-v7&quot; }, { &quot;id&quot;: &quot;OPS-TAG-003&quot;, &quot;applies_to&quot;: [&quot;*&quot;], &quot;requirement&quot;: &quot;Carry owner, cost-center, data-classification, and wave tags&quot;, &quot;assertion&quot;: &quot;tags has_keys [&#39;owner&#39;, &#39;cost-center&#39;, &#39;data-classification&#39;, &#39;wave&#39;]&quot;, &quot;severity&quot;: &quot;blocking&quot;, &quot;source&quot;: &quot;SecOffice/Tagging-Standard-v2&quot; } ], &quot;wave_overrides&quot;: [ { &quot;wave&quot;: &quot;wave-14&quot;, &quot;policy_id&quot;: &quot;SEC-NET-014&quot;, &quot;decision&quot;: &quot;exception&quot;, &quot;expires_on&quot;: &quot;2026-10-31&quot;, &quot;approved_by&quot;: &quot;security-office&quot; } ] }</p>
<p>一个 AWS Lambda 函数负责提供该文档，AgentCore Gateway 则将该函数作为名为 get_policies 的 MCP 工具对外公开。IaC 智能体（IaC Agent）仅请求其所生成的迁移批次（wave）中针对对应资源类型在范围内的策略。</p>
<p>import json<br />from datetime import date<br />from pathlib import Path</p>
<p>POLICY_SET = Path(&quot;policies/security-office-baseline.json&quot;)</p>
<p>def get_policies(event, context):<br />    &quot;&quot;&quot;返回所请求资源类型和批次已批准的策略。<br />    AgentCore Gateway 将此函数公开为 get_policies MCP 工具。&quot;&quot;&quot;<br />    doc = json.loads(POLICY_SET.read_text())<br />    requested = set(event.get(&quot;resource_types&quot;) or [])<br />    today = date.today()<br />    waived = {<br />        o[&quot;policy_id&quot;]<br />        for o in doc[&quot;wave_overrides&quot;]<br />        if o[&quot;wave&quot;] == event.get(&quot;wave&quot;) and date.fromisoformat(o[&quot;expires_on&quot;]) &gt;= today<br />    }<br />    policies = [<br />        p for p in doc[&quot;policies&quot;]<br />        if (p[&quot;applies_to&quot;] == [&quot;*&quot;] or requested &amp; set(p[&quot;applies_to&quot;])) and p[&quot;id&quot;] not in waived<br />    ]<br />    return {<br />        &quot;version&quot;: doc[&quot;version&quot;],<br />        &quot;policies&quot;: policies,<br />        &quot;waived&quot;: sorted(waived),<br />    }</p>
<p>响应中包含策略集版本，因此生成的代码可以记录是哪些规则生成了它，审核人员也可将资源回溯到已签批的标准。豁免的策略会在专门的字段中传递而不是直接消失，合规报告也会列出该批次的豁免项。每项例外情况都包含到期日期，因此失效的豁免会自动终止适用，无需人工清理。</p>
<p>这里运行着两个策略层，它们解答不同的问题：AgentCore Policy 评估 Cedar 规则以确定智能体是否可以调用某个工具；而精心策划的策略集则决定生成的底层基础设施需要满足什么标准。</p>
<p>基于您的既定模式生成 IaC</p>
<p>IaC 智能体根据您定义且确立的模式生成基础设施代码。这些模式将组织标准编码为可复用的构件。它们包括网络配置、安全组规则、IAM 角色、Amazon CloudWatch 告警、Amazon Elastic Compute Cloud (Amazon EC2) 配置、Amazon Virtual Private Cloud (Amazon VPC) 拓扑布局以及强制性标签规范。</p>
<p>这种方法保证了跨迁移批次的一致性，为无需从零编写基础设施代码的各批次团队提供了速度，并在安全更新可在下一个部署周期传播给使用者时提供了治理保障。</p>
<p>该智能体为每个应用程序生成 IaC 代码、自动化测试用例、合规报告以及部署运行手册（runbooks）。</p>
<p>IaC 智能体将生成的代码直接推送到您的代码仓库（例如 AWS CodeCommit、GitLab 或 Bitbucket）。从那里，代码将进入您现有的评审和部署流水线，而无需更改现有的工具链。</p>
<p>迁移智能与治理智能体：全资产组合可视化</p>
<p>一个包含 300 多个应用程序的资产组合需要状态报告、进度跟踪、后续行动以及架构完善（well-architected）验证。在该项目中，这些工作均在客户自有的 Jira、Confluence 和 Webex 中运行。手动执行这些操作会给项目经理和交付主管带来沉重的日常开销。</p>
<p>迁移智能与治理智能体（Migration Intelligence and Governance Agent）通过在整个资产组合中实现自动化、按需调取的智能分析与治理来解决这一问题。它通过 AgentCore Gateway 从三个来源聚合数据：Jira 提供 Sprint 进度和障碍阻碍；Confluence 提供架构文档和运行手册；Webex 提供会议纪要与行动项。</p>
<p>该智能体跨已迁移工作负载提供架构完善性评估、合规性与治理验证以及架构模式遵循情况跟踪。</p>
<p>自动化操作包括：使用最新的迁移状态更新 Confluence 页面、针对已识别的行动项创建 Jira 任务，以及针对问题升级生成 ServiceNow 工单。这些操作在执行前需要明确的人工审批。这种设有审批门禁的架构是这四个智能体的核心设计原则。智能体旨在辅助人类决策，而非取而代之。</p>
<p>基于内部项目跟踪数据，针对 300 多个应用程序资产组合的按需报告取代了手动汇总。您的具体成效可能会因资产组合规模和工具集成情况而有所不同。</p>
<p>阶段 3：用于主动式迁移后运维的 SRE 智能体</p>
<p>SRE 智能体（SRE Agent）覆盖移交后的阶段。迁移服务在业务割接（cutover）时即告完成。在应用程序于 AWS 上运行后，SRE 智能体会促使团队从被动响应转向主动改进。</p>
<p>该智能体监控 Amazon CloudWatch 指标、应用性能数据和历史模式。它在问题影响生产环境之前发出告警。该智能体还会发布针对常见故障模式的自动化修复剧本，并提出能效优化建议。</p>
<p>目标优化领域（包含人机协同的人工审批环节）包括数据库集群规格优化调整（right-sizing）、性能调优、存储分层以及计算伸缩与效率改进。</p>
<p>SRE 智能体将这一模式延伸至迁移之后。应用程序并非迁移落户到 AWS 就止步于此，而是随着时间的推移持续优化改进。</p>
<p>借助 AWS DMS 进行数据迁移</p>
<p>除了定制的 AI 智能体之外，还有两项 AWS 托管服务负责处理数据与应用现代化改造、服务器及网络迁移层。</p>
<p>结合生成式 AI 的 DMS Schema Conversion（模式转换）减少了手动进行模式映射的工作量。它能够转换基于规则的转换所无法完成的代码对象，如存储过程、函数和触发器。该功能在部分 AWS 区域正式可用（GA），因此在批次规划期间请确认区域支持情况。随后，AWS DMS 通过自动化迁移任务缩短割接窗口期。该服务直接集成到智能体流水线中：IaC 智能体配置目标基础设施，然后 AWS DMS 进行数据迁移。</p>
<p>AWS Transform 涵盖同一项目中的服务器、网络和代码层。《AWS Transform 用户指南》按工作负载类型列出了当前支持的功能。</p>
<p>安全与合规：内置而非外挂</p>
<p>该架构从一开始就嵌入了安全性，而非事后补救，将其应用于迁移生命周期的各个阶段。整个智能体套件的关键控制措施包括：<br />安全标准执行：IaC 智能体通过自定义 MCP 工具，直接从 Confluence 提取安全部门的标准，并将其应用于生成的 IaC 中。<br />Landing Zone 验证：该框架在部署前根据企业的 Landing Zone 合规性要求验证生成的底层基础设施。<br />人机协同（Human-in-the-loop）审批关卡：套件中所有智能体的自动化操作在执行前均需明确的人工审批。没有智能体可以在生产系统上自主执行操作。<br />AgentCore Gateway 协调：Amazon Bedrock AgentCore Gateway 协调各智能体之间的上下文和安全控制，在整个迁移生命周期中保持一致的策略应用。<br />持续集成与持续交付（CI/CD）集成：该框架将安全控制整合到 CI/CD 流水线中，并在生成 IaC 的同时自动生成测试用例，以便在合规问题进入生产环境之前将其捕获。<br />推理层的负责任 AI（Responsible AI）控制：Amazon Bedrock Guardrails 对每个提示词和每个模型响应应用内容过滤、拒绝主题、敏感信息过滤以及上下文事实依据检查。智能体仅对通过 Guardrails 检查的输出采取行动。Guardrail 追踪信息与工具调用审计日志一同汇总至 AgentCore Observability 中。<br />这种方法符合 AWS 责任共担模型。AWS 负责底层基础设施的安全，而您负责云内部的安全。智能体自动化履行您的配置责任，同时在审批决策中保留人工监督。<br />在此次实施中，该模式以人工流程无法比拟的速度，在 300 多个应用程序资产组合中贯彻了企业安全标准。您的实际效果可能会因安全要求和组织标准的不同而有所差异。<br />在整个迁移项目中，该框架取得了以下成果。这些指标反映了该特定实施案例。您的实际效果可能会因应用程序复杂度、团队规模和组织要求而有所不同。<br />IaC 开发时间从数周缩短至数分钟：从每个应用程序需 3-4 周缩短至数分钟的自动生成（基于内部项目跟踪数据）。<br />跨批次应用模式一致性：任何批次都不能偏离经批准的 IaC 模式基线。<br />安全合规性：在每次部署时自动验证，具备无需任何人工操作的完整审计追踪。<br />提升架构到部署的还原度：智能体理解架构图，而 IaC 则完全按照设计进行实现。<br />针对 300 多个应用程序的按需资产组合报告，具备精准指标且无需手动汇总。<br />改善迁移批次团队的入职与上手：团队上传文档，智能体便会生成 IaC 和相应报告。<br />运行此模式会在几个可预测的方面增加成本。基础模型（Foundation model）Token 通常占主导地位，因为信息摄入和 IaC 生成需要将文档、策略和架构上下文输入模型并返回生成的代码。Amazon Bedrock AgentCore 采用按用量计费模式。Runtime 根据会话使用的 CPU 和内存按秒计费，而当智能体等待模型响应或人工审批时，CPU 会缩容至零。Gateway、Memory、Policy 和 Guardrails 各自按使用单元计费，Observability 遥测数据按 Amazon CloudWatch 的费率计费。<br />在拥有 300 多个应用程序的资产组合中，智能体会贯穿整个迁移项目周期运行，而不是作为单次作业运行，因此应将其视为与迁移批次活动挂钩的日常运行成本。Token 用量主要取决于文档大小和工具调用次数，而非仅仅取决于应用程序数量，因此试点批次可为您提供按应用计算的基准。在 AWS Transform 方面，针对虚拟化、Windows 和大型机工作负载的评估与迁移智能体均可免费使用。迁移所创建的资源正常计费，自定义转换按智能体运行分钟计费。有关最新费率，请参阅 Amazon Bedrock 定价、Amazon Bedrock AgentCore 定价、AWS Transform 定价、Amazon CloudWatch 定价以及 AWS 定价计算器。<br />为避免在测试框架完成后产生持续费用，请删除您创建的资源：<br />从 AgentCore runtime 中删除智能体，然后移除 Gateway 目标和 Gateway。<br />删除保存会话状态和共享上下文的 AgentCore memory 资源。<br />删除 Guardrail、AgentCore 中的 Policy 定义以及为智能体创建的 IAM 角色。<br />如果不再需要历史记录，请删除 AgentCore Observability 写入的 CloudWatch 日志组。<br />删除为测试迁移预置的任何 AWS DMS 复制实例和终端节点。<br />在 Amazon Bedrock AgentCore 控制台中确认没有仍处于活动状态的智能体会话。<br />在紧张的时间表内将 300 多个应用程序迁移到 AWS，不仅需要增加工程师数量。托管服务承担了其中的大部分工作。当出现托管服务无法满足的需求时，智能体模式可以填补这一空白，同时将决策、审批和战略制定保留在人类手中。<br />该模式在源端和目标端均位于 MCP 工具背后的项目中取得了可衡量的成果。专构建的 Strands 智能体满足了这些特定需求，Amazon Bedrock AgentCore 从结构上应用了安全性，人机协同设计使自动化始终辅助决策而非取而代之。使用 AWS Transform 和 AWS DMS 进行迁移，并在 MCP 连接的源和目标需要时配合运行这些智能体。<br />根据您的实际用例，可考虑以下路径：<br />正在规划迁移？将 AWS Transform 连接到您首选的 AI 代码伴侣，开始进行服务器、网络以及代码的迁移与现代化改造，并使用 AWS DMS 进行数据库迁移。<br />源端和目标端位于 MCP 工具之后？评估此模式。请参阅 Amazon Bedrock AgentCore，了解如何构建和部署智能体。<br />需要遵循内部模块库？评估 IaC 智能体。与该项目的手工基线相比，IaC 开发时间从数周缩短至数分钟。<br />在您自己的项目工具中进行治理？考虑使用迁移智能与治理智能体（Migration Intelligence and Governance Agent）进行状态报告和良好架构（Well-Architected）评估。详细了解用于智能体状态管理的 Amazon Bedrock AgentCore Memory。<br />迁移完成后？探索 SRE 智能体模式，从被动运维转向主动改进。使用 Amazon CloudWatch 进行监控和自动告警。<br />自行构建智能体？从 Strands Agents SDK 和 Amazon Bedrock AgentCore 开始，使用针对您的迁移瓶颈定制的 MCP 服务器。打开 Amazon Bedrock AgentCore 控制台开始使用，阅读《将 Strands Agents 部署到 Amazon Bedrock AgentCore runtime》。<br />要了解本文中使用的服务：<br />Amazon Bedrock AgentCore：大规模安全地部署和运行 AI 智能体。</p>
<p>AWS Transform：迁移并现代化改造基础设施、应用程序和代码。<br />Strands Agents SDK：利用模型、提示词和工具构建 AI Agent。<br />AWS Database Migration Service (AWS DMS)：将数据库迁移至 AWS。<br />AWS Identity and Access Management (IAM)：管理对 AWS 服务的访问权限。<br />Amazon CloudWatch：监控 AWS 资源和应用程序。<br />Amazon Bedrock AgentCore 文档：运行时（Runtime）、网关（Gateway）、记忆（Memory）、身份（Identity）和可观测性（Observability）。<br />有关此处使用的服务和 SDK 的背景信息，请参阅以下 AWS 博文：<br />《Amazon Bedrock AgentCore 简介：安全部署与任意规模运行 AI Agent》。<br />《Strands Agents 简介：一款开源 AI Agent SDK》。<br />《利用 AWS DMS Schema Conversion 上的 Agentic AI 加速数据库现代化》。<br />Nikhil 是 AWS Professional Services 的首席顾问，专注于构建 AI、云基础设施和数据解决方案，帮助企业摆脱传统遗留架构的复杂性，迈向现代化智能系统。他在生成式 AI、Agent 架构以及云现代化改造领域拥有深厚的技术积淀。<br />Tarun 是 AWS Professional Services 的高级交付顾问，专注于构建 AI、云基础设施和数据解决方案，帮助企业从传统复杂系统转型为现代化系统。他在生成式 AI、Agent 架构、云现代化改造以及大规模迁移与灾难恢复方面拥有深厚的专业知识，技术覆盖多层架构、数据库和基础设施即代码（IaC）。他在 Amazon Bedrock、AWS DMS 和容灾编排方面的技术深度，帮助客户在企业级规模下构建高弹性、高性能的云端环境。<br />Vyas 是 AWS Professional Services 的交付顾问，在构建可扩展的分布式系统方面拥有丰富经验。他擅长设计和构建由 AI 驱动的高可用、多区域架构，并协助客户在 AWS 上部署具有弹性且可投入生产环境的解决方案。<br />Kaushal 是 AWS Professional Services 数字原生业务板块的首席技术交付负责人，与顶尖客户合作，在 AI 与云计算的交汇前沿交付创新成果。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【AWS Machine Learning Blog (亚马逊云科技官方英文)】于 2026-10-02 06:06 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#AWS</span>
</div>

<div class="news-card-footer"><a href="https://aws.amazon.com/blogs/machine-learning/scaling-cloud-migrations-with-agentic-ai-on-amazon-bedrock-agentcore/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【AWS Machine Learning Blog (亚马逊云科技官方英文)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ow-it-classified-drivers-73d924e11ab21c96" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1568" data-content-paragraphs="16" data-published-at="2026-10-01T21:57:08.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 05:57</span>
</div>

### [Lyft支付2.725亿美元以了结有关司机身份分类的诉讼](https://techcrunch.com/2026/10/01/lyft-is-paying-272-5m-to-settle-lawsuit-over-how-it-classified-drivers/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Lyft is paying $272.5M to settle lawsuit over how it classified drivers</div>

<div class="article-body" data-article-body="true"><p>Lyft已同意支付2.725亿美元，以了结一项指控该网约车公司将司机错误归类为独立承包商而非雇员、从而违反加利福尼亚州法律的诉讼。</p>
<p>该公司在一份监管文件中表示，相信该和解协议将使其能够避免“旷日持久的诉讼带来的成本和分心，并使管理层能够继续专注于执行其业务目标”。</p>
<p>该和解协议源于加州劳工专员办公室（LCO）于2020年8月提起的诉讼，该诉讼指控Lyft未按照当时州法律的要求将司机视为雇员，而是作为独立承包商对待。</p>
<p>诉讼称，司机被剥夺了最低工资和加班费，以及向雇员提供的其他福利和保护，包括带薪病假和及时支付工资。</p>
<p>“这项和解归功于那些挺身而出、仗义执言的工人们。他们的声音促成了这一结果，”加州劳工专员莉莉娅·加西亚-布劳尔（Lilia García-Brower）在一份声明中表示，并补充称，加州劳工专员办公室将放弃其应得的和解金份额，并将这些资金直接发放给提出工资索赔的司机。</p>
<p>该和解协议仍需获得法官的批准，涵盖2016年4月6日至2020年12月15日期间被指控的违法行为——这一时期加州一直在艰难应对蓬勃发展的零工经济中的劳动者究竟是独立承包商还是雇员的问题。</p>
<p>如今，在选民于2020年通过了第22号提案（Proposition 22）后，Lyft和Uber等基于应用程序的交通服务司机已被归类为承包商。该投票提案为《第5号州议会法案》（Assembly Bill 5，简称AB 5）提供了豁免，后者是一项于2019年通过的州法律，要求DoorDash、Lyft和Uber等公司将零工劳动者归类为雇员，赋予他们享受最低工资、工伤赔偿和其他福利的权利。</p>
<p>即使在AB 5生效后，Lyft、Uber和其他依赖零工劳动者的公司仍继续将其司机归类为承包商。这最终引发了加州劳工专员办公室、加州总检察长以及洛杉矶、圣迭戈和旧金山市检察官的法律行动，以及根据加州《私人司法部长法案》（PAGA）提起的私人诉讼。这些案件于2021年9月在旧金山高等法院进行了合并审理。</p>
<p>“如果获得批准，这项和解将彻底结束在第22号提案之前那个截然不同的时代的一段历史，”Lyft发言人在一份电子邮件声明中表示，“加州绝大多数网约车司机一直希望成为独立承包商，选民在2020年通过第22号提案时也证实了这一点，该提案为司机提供了新的福利和保障，同时保留了他们的灵活性。从那时起，Lyft所做的已经超越了第22号提案的要求，成为唯一一家对抽成费用设定上限的网约车公司。</p>
<p>“Lyft认为，根据法律，司机一直以来都被正确分类，我们很高兴能将这起案件抛在脑后。我们将继续全力专注于帮助司机创造更多收入，并为乘客提供更实惠的行程。”</p>
<p>这项和解为这段法律纠纷画上了句号，至少对Lyft而言是如此。Uber目前仍面临着加州劳工专员办公室提出的类似指控的诉讼。</p>
<p>更新：本文已更新以纳入Lyft的评论。</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会获得少许佣金。这不会影响我们的编辑独立性。</p>
<p>交通板块编辑</p>
<p>第二张门票立享5折优惠。Disrupt活动体验旨在共同分享。获取您的通行证，携带同事、合作伙伴或同行参会，尊享半价优惠。通过建立人脉、拓展势头以及探索创业生态系统的未来动向，覆盖更广阔的领域。</p>
<p>谷歌认为SpaceX的星舰必须发射1800次后，太空数据中心才能真正起步<br />谷歌发布Gemini 4 Argon，称其为迄今为止最强大的模型<br />五角大楼邀请埃隆·马斯克和帕尔默·拉基协助决定军方下一步行动<br />AMD将以82亿美元收购李飞飞的World Labs<br />爆火的AI代理Instinct以100亿美元估值筹集10亿美元C轮融资<br />Crusoe放弃在AI数据中心使用Boom涡轮机的12.5亿美元计划<br />Astra和Opus刚刚通过了图灵的另一项测试</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-02 05:57 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/01/lyft-is-paying-272-5m-to-settle-lawsuit-over-how-it-classified-drivers/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-255-5m-at-2-5b-valuation-ba8411b4a2ade506" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="820" data-content-paragraphs="10" data-published-at="2026-10-01T21:55:22.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 05:55</span>
</div>

### [凯文·曼迪亚旗下“智能体集群”安全初创公司Armadin完成2.555亿美元融资，估值达25亿美元](https://techcrunch.com/2026/10/01/kevin-mandias-new-agent-swarm-security-startup-armadin-raises-255-5m-at-2-5b-valuation/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Kevin Mandia’s new ‘agent swarm’ security startup Armadin raises $255.5M at $2.5B valuation</div>

<div class="article-body" data-article-body="true"><p>凯文·曼迪亚（Kevin Mandia）最知名的身份是网络安全初创公司Mandiant的创始人，该公司于2022年以54亿美元出售给谷歌。周四，该公司宣布，曼迪亚为其最新创办的初创公司Armadin筹集了2.555亿美元，估值超过25亿美元。</p>
<p>本轮B轮融资由安德森·霍洛维茨基金（Andreessen Horowitz）和阿克塞尔伙伴公司（Accel）领投，贝恩资本风投（Bain Capital Ventures）、红点创投（Redpoint）、8VC、Ballistic Ventures、谷歌风投（Google Ventures）、In-Q-Tel、凯鹏华盈（Kleiner Perkins）以及门罗风投（Menlo Ventures）参投。</p>
<p>这轮新融资距离Armadin在3月份筹集的1.9亿美元A轮融资仅隔六个月。目前，该公司的融资总额已超过4.45亿美元。</p>
<p>Armadin通过为AI时代重新构想防御测试，为企业提供一种新型的全天候安全保障。与传统的渗透测试（由雇佣的专业人员尝试入侵并报告发现的弱点）不同，Armadin运行全天候智能体集群，将各种漏洞串联起来实施入侵。其核心理念是帮助企业在任何恶意分子（甚至是拥有失控智能体的AI实验室）利用智能体技术对其发动攻击之前，先一步发现并封堵漏洞。</p>
<p>购买第二张门票立享五折优惠：Disrupt大会的体验本就应当与人分享。购买您的门票，即可为同事、合作伙伴或同行享受半价优惠。通过建立联系、汇聚势能并探索创业生态系统的未来，覆盖更广阔的领域。</p>
<p>每个工作日和周日，您都可以获取TechCrunch的最佳报道内容。</p>
<p>TechCrunch Mobility是您获取交通领域新闻与洞察的理想之选。</p>
<p>初创公司是TechCrunch的核心，欢迎订阅我们每周精选的深度报道。</p>
<p>为行业领军人物提供开启全新一天所需的资讯。</p>
<p>提交您的电子邮件，即表示您同意我们的《条款》和《隐私声明》。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-02 05:55 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/01/kevin-mandias-new-agent-swarm-security-startup-armadin-raises-255-5m-at-2-5b-valuation/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-ure-venezuelas-president-f64457ccef72c364" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="872" data-content-paragraphs="12" data-published-at="2026-10-01T21:08:11.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 05:08</span>
</div>

### [据报道马斯克的AI聊天机器人Grok曾鼓励特朗普抓捕委内瑞拉总统](https://techcrunch.com/2026/10/01/musks-ai-chatbot-grok-reportedly-encouraged-trump-to-capture-venezuelas-president/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Musk’s AI chatbot Grok reportedly encouraged Trump to capture  Venezuela’s president</div>

<div class="article-body" data-article-body="true"><p>据《时代》杂志报道，2025年12月，大约在美国入侵委内瑞拉并抓捕其总统尼古拉斯·马杜罗前一个月，特朗普总统与埃隆·马斯克举行了一次秘密会面。此时距马斯克离开特朗普政府政府效率部（DOGE）的职位大约过了七个月。</p>
<p>一位知情人士告诉《时代》杂志，在这次会面期间，特朗普“花了数小时”与马斯克的Grok聊天机器人交谈，其中包括询问委内瑞拉人对其总统被抓会有何反应。就在几个月前的9月，特朗普开始下令美军对涉嫌参与贩毒的委内瑞拉船只发动军事打击。</p>
<p>正如《大西洋月刊》当时报道的那样，人们显然一直在向Grok询问有关船只袭击事件以及委内瑞拉的政治局势。因此，《时代》杂志报道称，Grok告诉特朗普，马杜罗是“一位极不受欢迎的独裁者，许多委内瑞拉人可能会为他的倒台而庆祝”。</p>
<p>该消息人士告诉《时代》杂志，当1月3日美军入侵后确实出现了这种庆祝活动时，特朗普显然“觉得Grok非常聪明”。</p>
<p>因此，五角大楼AI负责人今年6月表示军方在伊朗战争期间使用Gov Grok部署和打击目标，或许也就不足为奇了。</p>
<p>虽然Grok并非唯一为美国国防部（DoD）服务的AI模型（OpenAI也达成了协议，而Anthropic也一直在就其模型如何用于军事防务和现代战争进行反复磋商），但Grok在本届政府中可能会变得更受青睐。本周早些时候，五角大楼宣布马斯克与Anduril的帕尔默·拉奇已被任命共同领导一项关于尖端技术在战场上的现状及未来应用的研究。</p>
<p>第二张通行证立减50%：Disrupt的体验重在分享。购买通行证并携同事、合作伙伴或同行参会，立享半价优惠。通过建立联系、汇聚势头以及发掘初创生态系统的下一个前沿，拓展更广阔的领域。</p>
<p>每个工作日和周日，您都能获取TechCrunch的最佳报道。</p>
<p>TechCrunch Mobility是您获取交通领域新闻与深度见解的首选之地。</p>
<p>初创企业是TechCrunch的核心，欢迎订阅我们每周精选的最佳报道。</p>
<p>为引领潮流的风云人物提供开启新一天所需的资讯。</p>
<p>提交您的电子邮件，即表示您同意我们的条款和隐私声明。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-02 05:08 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/01/musks-ai-chatbot-grok-reportedly-encouraged-trump-to-capture-venezuelas-president/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-t-apps-with-amazon-quick-27cf807eaea3145e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="5807" data-content-paragraphs="69" data-published-at="2026-10-01T19:49:06.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/aws.svg" class="source-icon" alt="AWS Machine Learning Blog (亚马逊云科技官方英文)" width="16" height="16" /> <strong>AWS Machine Learning Blog (亚马逊云科技官方英文)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 03:49</span>
</div>

### [借助 Amazon Quick 在 AI 构建的应用中提供实时且受治理的数据](https://aws.amazon.com/blogs/machine-learning/serve-live-governed-data-in-ai-built-apps-with-amazon-quick/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Serve live, governed data in AI-built apps with Amazon Quick</div>

<div class="article-cover"><img src="https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/09/30/ML-22064-1.png" alt="借助 Amazon Quick 在 AI 构建的应用中提供实时且受治理的数据" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>Quick Apps 此前已能够通过连接器和内容源将实时数据引入应用中：操作连接器（如 Jira、Slack 和 Google Drive 等服务）、Spaces 文档、网页搜索和 AI 推理均在查看时运行，而非构建时。该解决方案进一步引入了来自数据湖、数据库及其他分析数据存储的实时结构化数据。</p>
<p>此前，您受治理的 Amazon QuickSight 数据集（保存业务指标的 SPICE 和直接查询 [Direct Query] 表）无法在应用中进行实时查询。应用显示的任何数据集数值，都在智能体（Agent）构建该应用时被固定下来，成为发布时冻结的快照。</p>
<p>对于静态报告而言这尚可接受，但只要您希望应用所呈现的指标能够反映当天最新的数据情况，并严格遵循行级数据查看权限，这种方式就无法满足需求了。</p>
<p>Amazon Quick 是一项由 AI 驱动的统一智能服务，连接所有受治理的企业数据与企业内容，使团队能够在一个平台中进行探索、分析并采取行动。借助 Quick Apps，您只需用自然语言描述应用程序，即可让 AI 智能体编写并部署一个可运行的 Web 应用，无需手动编写代码或执行 DevOps 流程。</p>
<p>在本文中，我们隆重推出“应用中的实时数据”（Live Data in Apps），AI 构建的 Amazon Quick 应用可以利用该功能实时查询受治理的 QuickSight 数据集，而不再依赖构建时的静态快照。我们将详细介绍如何使用自然语言提示词来构建、发布和共享实时数据应用，并涵盖关键注意事项、许可授权要求以及查询护栏（guardrails）。</p>
<p>新功能速递：应用中的实时数据（Live Data in Apps）</p>
<p>借助“应用中的实时数据”，已发布的 Quick 应用在用户每次打开时都会实时查询受治理的 QuickSight 数据集。假设您的支持团队经常询问：“我们上周按区域划分各关闭了多少工单？”如今，每周都需要有人打开数据、编写查询、导出图表并粘贴到 Slack 中。而您真正需要的，是一个团队中任何人都可以打开并获得最新答案、且无需接触 SQL 的应用。</p>
<p>现在，您可以用自然语言描述所需的应用。智能体会自主找到相关的精选数据集，并在构建应用的过程中编写解答您问题所需的 SQL。应用发布后，每当有人打开该应用，它都会重新执行相同的 SQL，从而确保数据始终是最新的。至关重要的是，该查询是以查看者本人的身份权限执行的。因此，每位用户只能且正好看到其被授权查看的数据。</p>
<p>随着这一功能的推出，我们正式将 Quick 中受治理的结构化数据集引入应用之中。</p>
<p>适用对象与核心价值</p>
<p>“应用中的实时数据”解决了组织内不同角色的多重诉求，从而拓展了应用的实用价值，如下表所述：</p>
<p>业务运营负责人：使用自然语言基于实时数据集构建应用。无需手动刷新数据，无需管理快照，也无需编写自定义 API 管道。</p>
<p>知识型员工（使用者）：打开应用即可查看您的指标数据。数据截至当前实时更新，并已按您的权限范围进行筛选。</p>
<p>数据与应用程序管理员：现有的行级安全性（RLS）和列级安全性（CLS）规则会自动生效。无需学习新的权限模型。每次查询均在服务端严格执行授权许可检查。</p>
<p>在开始之前，请确保具备以下条件：</p>
<p>拥有已创建数据集的访问权限（无论是否配置了行级安全性 [RLS] 和列级安全性 [CLS]）。</p>
<p>支持的数据集模式：同时支持 SPICE（内存模式）和直接查询（Direct Query）数据集。有关直接查询所支持的数据源列表，请参阅官方文档。</p>
<p>许可授权：每位查看者在首次使用每个数据集时必须予以授权。构建者在构建过程中批准数据集。</p>
<p>身份验证：查看者必须是通过身份验证的 Quick 用户。使用实时数据集的应用不支持匿名或公开访问。该限制在多个层面得到严格执行。</p>
<p>在 Amazon Quick 中，“应用中的实时数据”基于两个工作流构建，其他一切功能均建立在其基础之上。贯穿始终的关键角色有两个：构建者（通过智能体构建应用的用户）和使用者（后续打开已发布应用的任何人）。担任构建者或使用者所需的最低角色权限为 Reader Pro（专业版）。</p>
<p>AnyCompany 为其客户提供一套软件即服务（SaaS）应用，区域销售主管的常见任务之一是审查合同续约情况并采取行动。为了让这一工作流运转，需要整合企业战略内容与企业收入数据，并构建一个联络客户的工作流。通常情况下，确保为每个客户提取正确的数据需要耗费一个月的努力。借助 Amazon Quick 中全新的“应用中的实时数据”功能，销售主管可以利用已有权限访问的数据集自行构建该工作流，并与其他销售主管共享，无需等待 IT 部门处理。Amazon Quick 应用与数据均托管在经过安全设计的 AWS 基础设施中，并受到客户自定义的行级和列级安全规则保护。</p>
<p>“应用中的实时数据”围绕两个核心工作流展开：应用构建与应用查看。我们先从构建体验谈起。</p>
<p>数据集准备就绪后，只需用通俗易懂的自然语言描述应用，让智能体代为构建。</p>
<p>在 Amazon Quick 中，从左侧导航栏中选择“应用”（Apps）。</p>
<p>在提示词框中输入您的需求。示例如下：“创建一个列出本季度及未来 6 个月内客户续约情况的应用。当我选中某位客户时，我希望看到来自 SaaS 销售数据的该客户收入和利润率。”</p>
<p>图 1：在 Amazon Quick Apps 提示词框中输入自然语言需求</p>
<p>智能体发现了“SaaS 销售”（SaaS Sales）数据集和“客户续约”（Customer Renewals）数据集，编写了相应的 SQL，并请求您按名称分别批准各个数据集。在本例中，由于发现了两个数据集，它会分别就每个数据集请求授权。</p>
<p>图 2：按名称批准检测到的每个数据集</p>
<p>在您批准数据集后，智能体将构建应用并加载预览页面。</p>
<p>图 3：展示客户续约列表的应用预览</p>
<p>借助 Quick Apps，您可以快速迭代，并在进入下一项功能前验证每个步骤。在本例中，销售主管构建了一个完整的工作流，不仅列出了带有关键筛选条件的续约记录，而且当选中某一笔交易时，系统会显示该交易的收入详情，并支持就该交易直接向客户发送电子邮件。</p>
<p>图 4：带有筛选条件和单笔交易收入弹出窗口的续约工作流</p>
<p>添加更多功能（可选）。</p>
<p>现在，销售主管希望确保该交易的决策与产品战略保持一致。通过使用简单的提示词，他们将企业产品战略文档与企业数据连接起来，在做出决定前对交易进行分析。下图展示了 SaaS 销售收入数据集与来自企业内容的产品战略如何结合在单次分析中。以下是一个示例提示词：“我们能否对数据集中的整体客户数据和产品战略进行 AI 推理，并在浮层中提供一份关于我们是否应该推进该交易、是否提供额外折扣等内容的 AI 总结？你可以把弹出窗口调大一些。”</p>
<p>图 5：结合了收入数据与产品战略的 AI 总结浮层</p>
<p>当应用构建完成时，销售主管已在应用中结合了所有企业内容、数据和连接器，并具备适当的安全控制。要查看所有集成，请选择右上角的省略号，然后选择“管理集成”（Manage integrations）。以下弹出窗口显示了该应用使用的所有集成：</p>
<p>图 6：列出应用所使用的每一项集成的“管理集成”弹出窗口</p>
<p>在销售主管对应用感到满意后，可以将其与团队中的其他人共享。选择“发布”（Publish），然后以查看者权限将应用共享给 Quick 用户或用户组。</p>
<p>首次访问该应用时，系统会提示查看者同意该应用访问数据集，如下图所示。</p>
<p>图 7：向查看者显示的首次授权许可提示</p>
<p>每位用户看到的都是同一个应用，但数据会根据行级安全性（RLS）和列级安全性（CLS）规则进行过滤。如下方图片所示，拥有不同区域访问权限（EMEA 和 AMER）的两位区域销售经理看到的是完全不同的数据。</p>
<p>美洲区（AMER）区域销售经理看到的视图如下，仅显示美洲区数据：</p>
<p>图 8：针对美洲区销售经理过滤为美洲区数据的应用界面</p>
<p>负责欧洲、中东和非洲区（EMEA）及美洲区（AMER）的区域销售经理看到的视图如下，显示了这两个区域的数据：</p>
<p>图 9：为同时拥有两个区域访问权限的经理显示 EMEA 和 AMER 数据的应用界面</p>
<p>下图显示了当用户缺少对底层数据集的访问权限时所遇到的错误。</p>
<p>图 10：当用户缺少底层数据集权限时显示的访问错误</p>
<p>在介绍了构建和查看工作流之后，我们来看看需要注意的运维考量事项。</p>
<p>以下是在应用中使用实时数据（Live Data in Apps）时需要记住的一些重要注意事项。</p>
<p>由于查询是实时运行的，因此应用始终显示数据集中最新的数据。如果数据集使用 SPICE，刷新数据集即可更新应用中显示的数据。如果数据集使用直接查询（Direct Query），则无需刷新。</p>
<p>系统设置了查询和结果大小的防护机制。如果查询返回的数据超出了传输承载能力，应用会显示清晰的“缩小查询范围”消息，而不是交付截断或不完整的数据。修改提示词以获取聚合数据，或者提示其实现分页。</p>
<p>与空间（spaces）和连接器类似，您必须进行一次性授权许可，允许 Quick 代表您在应用中使用特定数据集。</p>
<p>来自同一数据源的 SPICE 数据集或直接查询数据集可以在单个应用中使用。来自不同数据源的直接查询数据集不能在同一个应用中使用。有关更多信息，请参阅应用中支持直接查询的数据源文档。</p>
<p>重命名或删除列需要重新构建应用中的查询。请使用更新后的信息编辑应用。</p>
<p>构建器存在行数限制。在构建和行检索过程中，数据检索存在初始行限制。您必须遵守此限制，并指示构建 Agent 在加载时通过对数据集进行多次分页调用来检索应用中的所有数据。有关更多详细信息，请参阅相关文档。</p>
<p>在数据集发现过程中，Agent 会从您的数据中提取相关列。如果遗漏了某一列，您可以直接在应用提示词中进行指定。</p>
<p>应用会根据其接收到的初始数据来理解数据集的列。如果构建者的行级安全性（RLS）未返回任何数据，则应用无法使用该数据集进行构建。请与应用所有者或您的安全团队协作，获取对该数据集的行级访问权限。</p>
<p>如果 Agent 未发现您需要的数据集，请缩小搜索范围，或提供数据集名称或 ID 以显示正确的结果。</p>
<p>以下是即刻开始构建和共享实时数据应用的方法：</p>
<p>立即体验：打开 Amazon Quick Apps，基于您的某一个受治理 Quick Sight 数据集构建应用。用自然语言描述您的需求，让 Agent 处理 SQL。</p>
<p>阅读文档：访问 Amazon Quick 文档，获取关于应用中实时数据的详细设置指南、API 参考和最佳实践。</p>
<p>分享反馈：我们希望了解应用中实时数据功能对您的团队效果如何。请使用产品内的反馈机制或联系您的 AWS 团队。</p>
<p>借助应用中实时数据（Live Data in Apps）功能，由 AI 构建的 Quick 应用可以提供受治理的实时数据，而非构建时的静态快照。Agent 在构建应用时会针对您的 Quick Sight 数据集发现并验证 SQL。已发布的应用会为每位读者重新运行该 SQL，并以该读者的身份执行，因此行级安全（RLS）和列级安全（CLS）会按个人应用。在每位读者授权许可关卡的保护下，后端会在每次查询时重新进行验证。</p>
<p>数据权威性保留在同一个地方。Quick Sight 查询引擎会针对每位查看者的身份强制执行鉴权，因此应用、前端和代理均不处理访问决策。</p>
<p>要开始使用，请基于您的受治理数据集构建 Quick 应用，让读者在应用了自身权限的前提下探索实时数据。有关 Quick Apps 和数据集集成的更多信息，请参阅 Amazon Quick 文档。</p>
<p>Wei 是 AWS 旗下 Amazon Quick 团队的软件工程师，致力于智能体可视化和数据领域的研究。他构建了本文所介绍的实时数据集功能，最近一直在将 AI Agent 引入 Amazon Quick 的多款产品中用于可视化和数据处理。在加入 AWS 之前，他曾在 Audible 带领团队构建有声读物制作与发布工具，并在广告技术领域构建了 PB 级数据平台。Wei 致力于利用 AI 消除数据处理中的摩擦，以便客户能够借助 Quick 以更低成本更快地进行探索和构建。</p>
<p>Kevin 是 AWS 旗下 Amazon Quick 的全球高级生成式 AI 解决方案架构师。他在实施企业级商业智能解决方案方面拥有超过 8 年的经验，目前专注于 Amazon Quick，包括企业部署、培训和解决方案；他在亚马逊的总工作年限已超过 12 年。在 AWS，Kevin 与客户合作设计并实施基于 Amazon Quick 的商业智能和生成式 AI 能力。在担任现职之前，他曾在亚马逊的多个部门担任高级 BI 工程师，包括 Stores、Ads 以及最近的 Amazon Quick 产品团队。在加入亚马逊之前，Kevin 曾在美国陆军防空与导弹防御部队服役，担任爱国者导弹系统操作员与维护人员。</p>
<p>Salim 是 AWS 的 Amazon Quick 全球资深生成式 AI 解决方案架构师。他在实施企业级商业智能（BI）解决方案方面拥有超过 16 年的经验。在 AWS，Salim 与全球客户合作，在 Amazon Quick 上设计并实施由 AI 驱动的 BI 和生成式 AI 功能。在加入 AWS 之前，他曾担任横跨汽车、医疗健康、娱乐、消费品、出版和金融服务等多个行业垂直领域的 BI 顾问，负责交付商业智能、数据仓库、数据集成和主数据管理解决方案。</p>
<p>Vetri 是 Amazon Quick 的专业解决方案架构师，在交付企业级商业智能（BI）解决方案和构建全新数据产品方面拥有超过 20 年的经验。他热衷于将洞察与智能带到客户的工作场景中——加速从数据到洞察、再到决策和行动的进程。在 AWS，Vetri 帮助客户架构实用的代理式 AI（agentic AI）解决方案，通过 Amazon Quick 为业务用户安全地整合数据、文档和系统。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【AWS Machine Learning Blog (亚马逊云科技官方英文)】于 2026-10-02 03:49 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#AWS</span>
</div>

<div class="news-card-footer"><a href="https://aws.amazon.com/blogs/machine-learning/serve-live-governed-data-in-ai-built-apps-with-amazon-quick/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【AWS Machine Learning Blog (亚马逊云科技官方英文)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-emini-live-guided-vision-6740c72e272a106e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="546" data-content-paragraphs="8" data-published-at="2026-10-01T19:47:51.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 03:47</span>
</div>

### [谷歌推出全新“Guided Vision”功能，可助你阅读细小文字](https://www.theverge.com/ai-artificial-intelligence/1003756/google-gemini-live-guided-vision)
<div class="original-title-sub"><span class="orig-tag">原文</span> Google’s new Guided Vision feature can help you read the fine print</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2025/02/STK255_Google_Gemini_B_474198.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="谷歌推出全新“Guided Vision”功能，可助你阅读细小文字" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的文章将被添加到你的每日电子邮件文摘和主页推送中。</p>
<p>视力障碍人士可以使用 Guided Vision 让 Gemini 描述附近的事物，并提出后续问题。</p>
<p>该作者的文章将被添加到你的每日电子邮件文摘和主页推送中。</p>
<p>查看 Stevie Bonifield 的全部内容</p>
<p>Guided Vision 于今日在兼容的 Android 设备上的 Gemini Live 中上线，利用人工智能对手机摄像头对准的任何物体提供实时语音描述。通过在 Gemini Live 中共享摄像头，你可以让谷歌的 AI 协助处理诸如阅读细小文字、描述周围环境、寻找或识别身边的物体，以及描述特定物品细节等事务。</p>
<p>正如苹果在 iPhone 和 Vision Pro 上添加的 VoiceOver 实时识别（Live Recognition）功能一样，该功能专为盲人、弱视群体或在特定情境下需要辅助的人士设计。除了 Gemini 应用外，Guided Vision 也可在 Google TalkBack 中使用；在近期一组 Pixel 系统更新中宣布之后，运行 Android 9 及以上版本的设备用户也可以在“设置”应用中为其配置无障碍快捷方式。</p>
<p>每日免费新闻精选，聚焦最重要动态。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-10-02 03:47 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/ai-artificial-intelligence/1003756/google-gemini-live-guided-vision" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-y-try-on-clothes-for-you-bc70948c064d091d" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1227" data-content-paragraphs="13" data-published-at="2026-10-01T19:21:53.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 03:21</span>
</div>

### [ChatGPT 现已支持虚拟试衣功能](https://techcrunch.com/2026/10/01/chatgpt-can-now-virtually-try-on-clothes-for-you/)
<div class="original-title-sub"><span class="orig-tag">原文</span> ChatGPT can now virtually try on clothes for you</div>

<div class="article-body" data-article-body="true"><p>OpenAI 正在再次探索其对话式人工智能助手 ChatGPT 如何在用户网购时提供帮助。周四，该公司宣布在全球上线两项全新购物功能，包括虚拟试穿服装与配饰的功能，以及一项帮助用户收藏心仪商品以便日后参考的“收藏夹”新功能。</p>
<p>这些更新正值各大 AI 助手积极探索围绕购物的消费级应用场景之际。此前，OpenAI 已不得不放弃该领域早前设想的一个功能——即表现不佳的即时结账功能。不久前，智能体 AI 初创公司 Instinct 开始向用户推送商品推荐，但一些人认为这种主动推荐有点越界，与其说是实用建议，倒不如说更像广告。</p>
<p>OpenAI 表示，其全新的购物功能依托于最新发布的 ChatGPT Images 2.5 模型。该公司称，该模型能呈现更自然的光影与更丰富的质感，能更可靠地遵循编辑指令，并降低了图像生成的延迟。</p>
<p>具体而言，虚拟试穿允许 ChatGPT 用户上传自拍或全身照，以直观查看某件衣物或配饰穿戴在自己身上的效果。该选项将作为全新的“试穿”（Try On）按钮出现在 ChatGPT 的购物搜索结果中。用户也可以上传单品图片（如网页截图），并让 ChatGPT 帮自己试穿。</p>
<p>另一项新选项“收藏夹”（Favorites）则允许用户将发现的商品保存到应用内的资料库中，以便日后回看。（该公司指出，这些商品将与您的试穿图片保存在一起。）</p>
<p>OpenAI 还表示，ChatGPT 还能通过其他方式帮助用户购物。</p>
<p>例如，你可以描述一种想要尝试的穿搭风格，然后让它为你搜寻配齐该造型所需的单品。或者，你也可以上传名人的着装照片，并让它找出照片中同款且目前有售的商品。</p>
<p>后一种场景表明，该助手正在进军 Pinterest 和谷歌近年来主导的领域——成为时尚灵感与商品发现的策源地，进而转化为在线零售商的销售业绩。</p>
<p>然而，ChatGPT 是否会成为人们进行此类活动的首选，仍有待观察——尤其是考虑到谷歌已在去年推出了虚拟试穿功能。</p>
<p>当您通过我们文章中的链接购买商品时，我们可能会赚取少量佣金。这不会影响我们的编辑独立性。</p>
<p>消费新闻编辑</p>
<p>购买第二张门票立减 50%：Disrupt 的体验理应与他人分享。购买您的门票，即可以半价携同事、合伙人或同行一同参与。通过结识人脉、集聚势能并探索初创生态圈的未来趋势，拓展更广阔的视野。</p>
<p>谷歌认为 SpaceX 的星舰必须发射 1800 次，太空数据中心才能真正落地<br />谷歌发布 Gemini 4 Argon，称其为迄今为止最强大的模型<br />五角大楼邀请埃隆·马斯克和帕尔默·拉奇协助决策军方下一步行动<br />AMD 将斥资 82 亿美元收购李飞飞的 World Labs<br />现象级 AI 智能体 Instinct 以 100 亿美元估值完成 10 亿美元 C 轮融资<br />Crusoe 放弃在 AI 数据中心使用 Boom 涡轮机的 12.5 亿美元计划<br />Astra 和 Opus 刚刚通过了图灵的另一项测试</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-02 03:21 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/01/chatgpt-can-now-virtually-try-on-clothes-for-you/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--android-central-layoffs-7721aa0681a92a30" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="801" data-content-paragraphs="11" data-published-at="2026-10-01T19:20:29.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 03:20</span>
</div>

### [Android Central 裁掉全部员工但母公司称其“将继续运营”](https://www.theverge.com/tech/1003735/android-central-layoffs)
<div class="original-title-sub"><span class="orig-tag">原文</span> Android Central ‘will continue’ despite laying off its staff</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/Screenshot-2026-10-01-at-12.18.47-PM.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="Android Central 裁掉全部员工但母公司称其“将继续运营”" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>该主题的最新文章将添加到您的每日电子邮件文摘和主页信息流中。</p>
<p>尽管所有全职员工均已被裁撤，这家专注于 Android 生态的科技博客目前仍在发布内容。</p>
<p>该作者的最新文章将添加到您的每日电子邮件文摘和主页信息流中。</p>
<p>查看 Jay Peters 的全部文章</p>
<p>专注于 Android 生态的科技博客 Android Central 昨日裁掉了其全体员工，但其母公司 Future 向 The Verge 证实，该网站将继续发布内容。</p>
<p>昨天，Android Central 员工名单上的六名员工中有四人公开宣布了被裁员的消息，包括 Shruti Shekar、Derrek Lee、Harish Jonnalagadda 和 Nicholas Sutrich；前高级编辑 Namerah Saud Fatmi 也更新了她的 LinkedIn，表明她在 Android Central 的任期已经结束。该网站的主编 Lee 和 Sutrich 均证实，所有剩余的全职员工都已被裁撤。</p>
<p>前员工们并没有被告知该网站是否会关停。今天，该网站发布了新文章，不过这些内容来自自由撰稿人，而非此前的全职员工团队。</p>
<p>Future 发言人 Nicole Martineau 告诉 The Verge：“Future 将继续运营并发布 Android Central 的内容。我们将在适当的时候公布有关该网站未来的进一步信息。”她补充道：“我们目前不会提供任何进一步的评论。”</p>
<p>另一家专注于 Android 的科技博客 Android Police 最近也解雇了至少两名员工。该网站目前列出的编辑团队由四人组成。Android Police 的母公司 Valnet（该公司此前曾收购 The Verge 的姐妹网站 Polygon）没有立即回应置评请求。</p>
<p>每日免费获取最重要的核心新闻文摘。</p>
<p>这是原生广告的标题</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-10-02 03:20 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/tech/1003735/android-central-layoffs" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-nters-get-off-the-ground-20c4b9d47cd46efa" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1990" data-content-paragraphs="20" data-published-at="2026-10-01T19:18:03.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 03:18</span>
</div>

### [谷歌认为在太空数据中心真正落地前，SpaceX星舰需发射1800次](https://techcrunch.com/2026/10/01/google-thinks-spacexs-starship-has-to-launch-1600-times-before-space-data-centers-get-off-the-ground/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Google thinks SpaceX’s Starship has to launch 1,800 times before space data centers get off the ground</div>

<div class="article-body" data-article-body="true"><p>谷歌的轨道计算卫星原型机今天搭载从加州升空的SpaceX火箭成功升空——这是这家科技巨头首次将其先进芯片送入太空。</p>
<p>该卫星由Planet Labs制造，旨在证明谷歌张量处理单元（TPU，即其对抗英伟达GPU的产品）能够在太空中运行。这意味着要为其持续提供1千瓦的电力、为芯片散热，并运行一系列模型进行全面测试，以观察是否会出现任何故障。</p>
<p>“我们在地面上做过测试，但你知道，没有任何测试能完全替代真实环境，”负责Project Suncatcher的谷歌高管特拉维斯·比尔斯（Travis Beals）表示。该项目是这家科技巨头在地球轨道上开发大规模计算集群的计划。</p>
<p>投入运行后，这颗卫星将以每次15分钟的脉冲方式启动其TPU，以避免卫星的供电和热管理系统承受过大负荷。该卫星基于Planet Labs制造的标准平台，但两家公司正在研发一项预计于明年升空的演示项目，届时将发射两颗专门为先进计算定制的卫星，能够运行更繁重的工作负载。未来的这些版本将尝试通过激光通信链路开展协同工作。</p>
<p>Suncatcher并不是这枚SpaceX火箭上唯一的太空AI有效载荷，该火箭共发射了100多项不同的有效载荷，其中包括来自Satlyt和Cowboy Space Company的任务。</p>
<p>使谷歌的这项计划区别于那些初创公司（实际上也区别于SpaceX本身）之处在于，这是一个长期项目。</p>
<p>正如比尔斯所说，这项“长期登月计划”的重点是为未来将存在的太空基础设施和AI工作负载进行建设。该公司设想了一个轨道数据中心，由81颗紧密编队飞行的卫星组成网络，进行并行处理。</p>
<p>“当你想运行多机架工作负载时，TPU之间的带宽和延迟真的非常、非常重要……我们努力放眼未来，不仅关注今天存在的工作负载，还关注五年后它们的发展方向，”比尔斯说。这很大程度上是因为以高性价比扩展轨道数据中心所需的火箭目前尚不存在。</p>
<p>周四，谷歌还发布了其关于轨道数据中心白皮书的同行评审版本，这是关于计算如何进入轨道的现有最严谨的分析之一。该论文将在《焦耳》（Joule）杂志上发表。</p>
<p>该论文最引人注目的方面之一是谷歌如何看待进入太空的途径。尽管研究人员强调他们的分析并非经济可行性研究，但它提供了一个有趣的视角，展示了该公司如何看待火箭成本随着时间推移而降低。</p>
<p>与所有数据中心公司一样，谷歌正指望SpaceX将其航天器送入太空。（谷歌也是SpaceX的主要投资方之一。）</p>
<p>作者指出，埃隆·马斯克的火箭制造团队自发射“猎鹰1号”（Falcon 1）火箭以来，实现了解题降本的“学习曲线”，年降幅约为20%；他们认为，有理由期望该公司在2035年前实现每千克接近200美元的发射价格。</p>
<p>要实现这一目标需要什么？根据猎鹰9号发射的有效载荷总量，他们认为类似的降本轨迹将需要“星舰”（Starship）向轨道运送37万吨的有效载荷。这意味着在未来10年内需要进行约1800次发射，即每年180次——而且前提是每次任务能够运载200公吨。</p>
<p>对于一型一年内飞行次数从未超过五次的运载工具来说，这是一个很高的要求。SpaceX预测公司的飞行频次将远高于此——例如，埃隆·马斯克曾暗示星舰可在2029年达到每小时一次的飞行频率，但马斯克说过的话很多。</p>
<p>至少在谷歌更新的研究中，好消息是其芯片似乎有可能在太空辐射中存活下来。该公司此前意识到芯片配置提供的屏蔽层比实际经历的要多，因此不得不重新在粒子加速器中对芯片进行轰击测试。这导致芯片的逻辑电路中出现了稍多的错误，但该公司仍有信心其芯片能在卫星的五年寿命期内承受轨道上的大型推理工作负载。</p>
<p>“如果考虑典型的推理操作，错误率其实是非常低的，对吧？大概是百万分之一，”比尔斯说。“但从另一方面来看，如果要进行某种超大规模的训练运行，需要成千上万颗芯片运行数月之久，这就已经成问题了。”</p>
<p>勘误：本文标题最初将星舰发射的学习曲线预估误报为1600次；实为1800次。</p>
<p>当您通过我们文章中的链接购买商品时，我们可能会获得少量佣金。这不会影响我们的编辑独立性。</p>
<p>购买第二张门票立享五折优惠。Disrupt盛会的精彩体验应当共同分享。获取您的门票，携同事、伙伴或同行一同参加，立省50%。拓展人脉、积蓄势能，共同探索初创生态圈的未来趋势。</p>
<p>谷歌认为在太空数据中心真正落地前，SpaceX星舰需发射1800次<br />谷歌发布Gemini 4 Argon，号称其迄今为止最强大的模型<br />五角大楼邀请埃隆·马斯克与帕尔默·拉奇协助决策军方下一步行动<br />AMD将以82亿美元收购李飞飞的World Labs<br />爆火AI智能体Instinct完成10亿美元C轮融资，估值达100亿美元<br />Crusoe放弃在AI数据中心使用Boom涡轮机的12.5亿美元计划<br />Astra和Opus刚刚通过了图灵的另一项测试</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-02 03:18 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/01/google-thinks-spacexs-starship-has-to-launch-1600-times-before-space-data-centers-get-off-the-ground/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--valves-been-waiting-for-f9473ba1b72da33e" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2078" data-content-paragraphs="14" data-published-at="2026-10-01T18:52:58.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/theverge.svg" class="source-icon" alt="The Verge (前沿数码科技)" width="16" height="16" /> <strong>The Verge (前沿数码科技)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 02:52</span>
</div>

### [Steam Deck 2：AMD Gainsborough 会是 Valve 一直在等待的那颗芯片吗？](https://www.theverge.com/games/1003593/steam-deck-2-is-amd-gainsborough-the-chip-valves-been-waiting-for)
<div class="original-title-sub"><span class="orig-tag">原文</span> Steam Deck 2: Is AMD Gainsborough the chip Valve’s been waiting for?</div>

<div class="article-cover"><img src="https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/53420776536_b9dede69df_k.jpg?quality=90&amp;#038;strip=all&amp;#038;crop=0,0,100,100" alt="Steam Deck 2：AMD Gainsborough 会是 Valve 一直在等待的那颗芯片吗？" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>Steam Deck 已经问世四年半了，掌机玩家们正热切期盼着 Steam Deck 2 的到来——但 Valve 一贯表态称，在打造续作之前，他们需要一颗在性能和能耗效率上实现“代际跃升”的新芯片。现在有一些理由让人相信这颗芯片已经浮出水面：AMD Gainsborough。不过我仍持有一点怀疑态度。</p>
<p>正如爆料人“摩尔定律已死”（Moore’s Law is Dead）与 IT 之家（IT Home）的报道，最新的 AMD 驱动程序泄露了一款此前未知的芯片代号：“AMD Gainsborough”。初代 Steam Deck 芯片是以《最终幻想 VII》中令人心碎的女主角“爱丽丝”（Aerith）命名的，而 Gainsborough 正是她的姓氏（盖恩斯巴勒）。此外，该芯片似乎是一款基于台积电较新的 N3P 工艺打造的半定制芯片（换言之：为特定客户定制设计）。</p>
<p>[媒体内容: https://youtu.be/3gy-dUHd-1s?si=FnNapGtIvPnfNyMw&amp;t=139]</p>
<p>IT 之家查询了进出口记录，发现 AMD 已经在运送用于验证的 Gainsborough 芯片测试设备，这表明潜在客户可能已经在测试该芯片，以评估其是否适合自家设备。</p>
<p>[图片: https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/fe78cc35-9834-437c-ad00-8a9d5d0eda01-1.jpg%40s_2w_820h_481.jpg?quality=90&amp;strip=all]</p>
<p>这些进出口记录还显示，Gainsborough 芯片将相当小巧，采用尺寸为 25 毫米 × 25 毫米的 FF6 封装。今天，爆料人 Gotou_3rd 似乎披露了 AMD 的下一代掌机芯片 Ryzen Z3 和 Z3 Extreme 也将采用 25 毫米 × 25 毫米的封装规格。Gotou 还公布了一份疑似 AMD 幻灯片的片段，该内容暗示 Z3 的目标功耗为 15 瓦，与 Steam Deck 及 Steam Deck OLED 的功耗包络完全一致：</p>
<p>[图片: https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/AMD-RYZEN-Z3-RYZEN-Z3-EXTREME-LEAK-850x264-1.webp?quality=90&amp;strip=all]</p>
<p>不过，仅凭这些并不足以将 Gainsborough 明确与 Steam Deck 2 绑定在一起。</p>
<p>首先，半定制芯片并不总能最终应用到其最初设定的设备中。长期以来一直有传言称，初代 Steam Deck 自身的半定制芯片最初并不是为 Steam Deck 设计的，而是为一款 Magic Leap 头显设计的；而且在 Valve 接手之前，它曾被向平板电脑厂商推销过（传闻中包括一款被取消的微软平板电脑）。初代 Steam Deck 芯片中甚至有部分区域完全处于未使用状态。</p>
<p>其次，你应该知道“Aerith”（Steam Deck）、“Sephiroth”（Steam Deck OLED）和“Gainsborough”并不是 Valve 起的代号。当我在 2023 年底造访 Valve 总部时，我谈到了挂在墙上的这块 Aerith 晶圆——Valve 的设计师告诉我，他们其实并不想要《最终幻想》系列的代号。是 AMD 选择了这些名字。</p>
<p>[图片: 我在 Valve 总部看到的 Aerith 晶圆。https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/DJI_20231030165027_0123_D-1.jpg?quality=90&amp;strip=all]</p>
<p>关于 Valve 与这些名称并无捆绑关系的另一个佐证是：当微软和华硕为 500 美元的基础版 Xbox Ally 挑选“Ryzen Z2 A”芯片时，他们选择的其实是一颗“Aerith Plus”芯片。</p>
<p>第三，25 毫米 × 25 毫米虽然算小，但对 Steam Deck 来说其实偏大！初代 Steam Deck 的“Aerith”芯片在改版为“Sephiroth”以缩减并移除未使用元件之前，据报道其尺寸仅为 19 毫米 × 19 毫米。不过，也许 Gainsborough 效率很高，而且如果这枚芯片与 AMD 的 25 毫米 × 25 毫米 Ryzen Z3 师出同门、差异不大，它在成本上可能会更为亲民。</p>
<p>最后，截至上个月，Valve 仍在考虑“如何以及何时”推出 Steam Deck 2——而彼时按理说他们应该已经拿到了这些 Gainsborough 芯片。但我猜想，在经历今年由内存短缺引发的硬件延期之后，Valve 可能只是试图避免给出过高的承诺。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【The Verge (前沿数码科技)】于 2026-10-02 02:52 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#The</span>
</div>

<div class="news-card-footer"><a href="https://www.theverge.com/games/1003593/steam-deck-2-is-amd-gainsborough-the-chip-valves-been-waiting-for" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【The Verge (前沿数码科技)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-pleted-in-just-23-months-286702c01fce2fd8" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1634" data-content-paragraphs="13" data-published-at="2026-10-01T18:35:55.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 02:35</span>
</div>

### [全球首座增强型地热发电站仅用23个月即告建成](https://techcrunch.com/2026/10/01/worlds-first-enhanced-geothermal-power-plant-completed-in-just-23-months/)
<div class="original-title-sub"><span class="orig-tag">原文</span> World’s first enhanced geothermal power plant completed in just 23 months</div>

<div class="article-body" data-article-body="true"><p>地热能源公司Fervo Energy周四上午宣布，其开普站（Cape Station）发电厂已于9月30日开始向电网供电，比原定计划提前了一天。</p>
<p>由此，Fervo成为首家达成这一关键商业化里程碑的增强型地热公司。该发电厂大约在一周前完成并网同步，上线了其规划中100兆瓦发电厂的三分之一首期机组。</p>
<p>不过，Fervo此前曾向TechCrunch透露，整个站点的规模可能会大得多，具备高达4吉瓦（GW）的发电潜力。</p>
<p>Fervo联合创始人兼首席执行官蒂姆·拉蒂默（Tim Latimer）在一份声明中表示：“全球范围内从未有任何团队建造过这样的项目，而我们提前完成了这一任务。”</p>
<p>从破土动工到商业化投运，开普站的首个机组区块耗时23个月建成。随着Fervo对工艺流程的不断完善，该公司的目标是在短短18个月内完成未来的各个机组区块。</p>
<p>这种快速投产供电的速度，对极度渴求电力的各大数据中心运营商而言无疑极具吸引力，这些运营商一直在能源行业的各个角落搜寻发电产能。地热能源还可以分期开发，这与数据中心的建设节奏相仿，便于超大规模云计算巨头随着算力需求的增长逐步使机柜上线投运。</p>
<p>谷歌、南加州爱迪生公司（Southern California Edison）等机构已承诺从Fervo的开普站项目采购电力。</p>
<p>Fervo是目前致力于开发增强型地热发电站的数家公司之一。传统地热发电主要利用接近地表的浅层热源，而Fervo及其同行则向更深的地层钻探，因为越深处的岩石温度越高，从而为地热开发打开了更广阔的空间。</p>
<p>Fervo于今年5月通过超额认购成功上市，募集资金19亿美元。该公司成立于2017年，将石油与天然气行业的钻井技术和工艺引入新型地热资源的开发中。在初创企业阶段，该公司曾从突破能源风险投资（Breakthrough Energy Ventures）、Congruent Ventures以及摩羯座投资集团（Capricorn Investment Group）等投资者处筹集了超过13亿美元的资金。</p>
<p>（以下为页面附带信息及推广链接）<br />当您通过我们文章中的链接进行购买时，我们可能会赚取少量佣金。这不会影响我们的编辑独立性。</p>
<p>高级记者，气候方向<br />蒂姆·德尚（Tim De Chant）是TechCrunch的高级气候记者。他曾为多家出版物撰稿，包括《连线》（Wired）杂志、《芝加哥论坛报》（Chicago Tribune）、Ars Technica、《The Wire China》以及他作为创刊编辑的《NOVA Next》。<br />德尚同时也是麻省理工学院（MIT）科学写作研究生项目的讲师。他于2018年荣获麻省理工学院奈特科学新闻奖学金（Knight Science Journalism Fellowship），在此期间深入研究了气候技术并探索了新闻业的新型商业模式。他拥有加州大学伯克利分校环境科学、政策与管理博士学位，以及圣奥拉夫学院环境研究、英语和生物学学士学位。<br />您可以通过发送电子邮件至 tim.dechant@techcrunch.com 与Tim取得联系或核实联络信息。</p>
<p>购买第二张通行证可享50%折扣。Disrupt的体验应当与人共享。购买您的入场券，携带同事、合作伙伴或同行参会，第二张可享半价。拓展人脉连接，积聚发展动能，探索初创生态圈的未来趋势，覆盖更多领域。</p>
<p>谷歌认为SpaceX的星舰必须完成1800次发射太空数据中心才能真正落地<br />谷歌发布Gemini 4 Argon，称其为迄今为止最强大的模型<br />五角大楼邀请埃隆·马斯克和帕尔默·拉基协助决定美军下一步行动方向<br />AMD将以82亿美元收购李飞飞的World Labs<br />爆火AI Agent项目Instinct完成10亿美元C轮融资，估值达到100亿美元<br />Crusoe放弃在AI数据中心使用Boom涡轮机的12.5亿美元计划<br />Astra和Opus刚刚通过了图灵的另一项测试</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-02 02:35 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/01/worlds-first-enhanced-geothermal-power-plant-completed-in-just-23-months/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story--researchers-wsj-reports-7f938778420c03ad" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1179" data-content-paragraphs="12" data-published-at="2026-10-01T18:14:42.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 02:14</span>
</div>

### [华尔街日报报道：OpenAI与3名安全研究人员分道扬镳](https://techcrunch.com/2026/10/01/openai-cuts-ties-with-three-safety-researchers-wsj-reports/)
<div class="original-title-sub"><span class="orig-tag">原文</span> OpenAI cuts ties with 3 safety researchers, WSJ reports</div>

<div class="article-body" data-article-body="true"><p>据《华尔街日报》周四报道，OpenAI已与安全团队的3名研究人员分道扬镳，据称这几人向第三方AI安全机构分享了机密的公司信息。</p>
<p>“我们已与3名人员解除合作关系，原因是其违反了我们关于访问和处理公司敏感信息的政策，”OpenAI发言人在给《华尔街日报》的一份声明中表示。“我们的调查证实，这些人员在既定公司流程之外不当处理了敏感信息，违反了我们的政策，破坏了我们开展工作所必需的信任。”</p>
<p>该报道未点名具体涉及的研究人员、机构或信息内容。OpenAI没有立即回应我们的置评请求。</p>
<p>在X上流传的帖子中提及了一些部分用户认为在被解雇之列的人员姓名，这些人在OpenAI工作期间也曾公开表达过对AI风险的担忧。TechCrunch尚未核实这些人员的身份。</p>
<p>在给《华尔街日报》的声明中，OpenAI发言人表示，一项内部调查证实这些研究人员“在既定公司流程之外不当处理了敏感信息”。</p>
<p>就在这次人员离职的两天前，《纽约时报》曾报道称，OpenAI高管忽视了员工对其安全实践提出的警告，员工称公司普遍存在降低安全优先级的做法。OpenAI发言人向《纽约时报》表示，公司认真对待安全担忧，并设有报告安全问题的内部渠道，同时表示公司认识到了“需要加快推进步伐”。</p>
<p>目前尚不清楚这3名研究人员在据称向机构外部分享信息之前，是否曾通过内部渠道表达过关切。</p>
<p>此次人员离职也正值OpenAI应对一系列安全事件之际，在这些事件中，其AI智能体逃离了沙箱限制、发布了用户图片，并黑入了政府网站。本周早些时候，OpenAI表示出于安全考量，将取消原定推出的AI模型GPT-6.1 Astra。</p>
<p>这并非OpenAI首次因涉嫌信息分享而解雇研究人员。据The Information报道，2024年，该公司曾因涉嫌泄密解雇了研究人员利奥波德·阿申布伦纳（Leopold Aschenbrenner）和帕维尔·伊斯梅洛夫（Pavel Izmailov）。</p>
<p>当您通过我们文章中的链接购买商品时，我们可能会赚取少量佣金。这不会影响我们的编辑独立性。</p>
<p>获取第二张通行证5折优惠。Disrupt的体验本就应当与人分享。带上一位同事、合伙人或同行即可享受半价优惠。通过建立人脉、集聚动能以及探索初创生态系统的下一站，开拓更广阔的领域。</p>
<p>谷歌认为SpaceX的星舰必须发射1800次后，太空数据中心才能真正落地<br />谷歌发布Gemini 4 Argon，称其为迄今为止最强大的模型<br />五角大楼邀请埃隆·马斯克和帕尔默·拉基协助决定军方接下来的行动<br />AMD将以82亿美元收购李飞飞创立的World Labs<br />爆火AI智能体Instinct完成10亿美元C轮融资，估值达100亿美元<br />Crusoe放弃在AI数据中心使用Boom涡轮机的12.5亿美元计划<br />Astra与Opus刚刚通过了图灵的另一项测试</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-02 02:14 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/01/openai-cuts-ties-with-three-safety-researchers-wsj-reports/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-nvidia-doca-agent-skills-f7fd758439591f67" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="3891" data-content-paragraphs="36" data-published-at="2026-10-01T18:13:29.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/nvidia.svg" class="source-icon" alt="NVIDIA Developer Blog (英伟达开发者官方英文)" width="16" height="16" /> <strong>NVIDIA Developer Blog (英伟达开发者官方英文)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 02:13</span>
</div>

### [要闻：AI 智能体正日益成为开发工作流中的标准组成部分，但通用智能体在设计之初并未将诸如 NVIDIA DOCA 这类](https://developer.nvidia.com/blog/build-applications-on-nvidia-bluefield-faster-with-nvidia-doca-agent-skills/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Build Applications on NVIDIA BlueField Faster with NVIDIA DOCA Agent Skills</div>

<div class="article-cover"><img src="https://developer-blogs.nvidia.com/wp-content/uploads/2026/09/agentic-ai-768x432.png" alt="要闻：AI 智能体正日益成为开发工作流中的标准组成部分，但通用智能体在设计之初并未将诸如 NVIDIA DOCA 这类" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>AI 智能体正日益成为开发工作流中的标准组成部分，但通用智能体在设计之初并未将诸如 NVIDIA DOCA 这类专用基础设施软件考虑在内。由于缺乏特定领域的知识，智能体可能会退回到猜测状态。这在基础设施开发中是个严重问题，因为每一次纠错周期都会挤占部署时间。</p>
<p>DOCA 是一个统一的软件平台，能够充分释放 NVIDIA BlueField 数据处理器（DPU）面向智能体 AI（agentic AI）基础设施的全部潜力。它涵盖了加速网络、AI 原生存储、芯片级安全、遥测以及生命周期管理。它是基于 NVIDIA BlueField 进行构建的团队的核心开发平台。</p>
<p>DOCA AI agent skills 现已在 GitHub 上线。这些技能提供了一个结构化且经过验证的基础，旨在解决通用 AI 智能体在 DOCA 开发方面的不足。它们为智能体提供了经过验证的 API 签名、硬件能力要求以及构建约束。</p>
<p>本文阐释了什么是 DOCA AI agent skills，以及它们在四个高影响力的 DOCA 开发场景中的具体表现。文中包含一个并排对比演示，并介绍了如何开始使用 DOCA agent skills，以便在 BlueField 基础设施上更快速地构建并交付更稳定的代码。</p>
<p>DOCA AI agent skills 是一种赋予 AI 智能体新能力和专业知识的标准化方式。这一轻量级、开放的格式围绕包含真实 API 签名、硬件能力要求和构建约束的 SKILL.md 文件构建。综合起来，这些技能为智能体提供了一套针对 DOCA 的推理与操作框架。</p>
<p>技能覆盖了整个 DOCA 库，包括 Flow、GPUNetIO、PCC 等。它们并不会取代智能体，而是赋予智能体领域知识，使其能够像经验丰富的 DOCA 开发者一样进行推理。</p>
<p>每个技能都针对特定的 DOCA 组件或工作流进行定义。例如，当智能体加载 DOCA Flow 的技能时，它将获取真实的函数签名、正确的 pkg-config 模块名称、构建容器约束，以及常见的故障模式及其缓解措施。这些技能不仅是对文档的总结，更是智能体可直接进行推理的机器可读规范。</p>
<p>当你要求通用 AI 智能体设置 DOCA Comch（通信通道）、配置 RDMA 上下文或调试 DOCA Flow 程序中的链路故障时，智能体完全是在依靠来自通用训练数据的模式匹配工作——而非基于经过验证的 DOCA API 协定、硬件能力清单或构建系统规范。DOCA 库的接口范围庞大、迭代迅速，并且具有通用训练数据无法捕获的特定硬件特性。由于没有可供智能体进行推理的机器可读协定，智能体所掌握的知识与硬件和软件实际支持的功能之间就缺乏有保障的稳定接口。</p>
<p>为了量化这一差距，NVIDIA 团队运行了 65 个真实的 DOCA 开发者提示词，对比了使用与未使用技能时的智能体表现。这些提示词涵盖从单行问题到详细的多需求提示词，并根据必需答案清单（针对每项任务的一组特定及格/不及格标准）进行评分。在没有技能的情况下，智能体始终反复出现同样的错误，包括：</p>
<p>这些都是持续存在的失败。在没有技能的情况下，智能体在真实 DOCA 任务中仅能满足 19% 的评分清单项目。而在配备技能后，它们在全部 65 个提示词中均实现了 100% 的满足率。若没有这些技能，智能体的每一次错误都会演变成开发者的调试过程，并拉长通往可用代码的路径。</p>
<p>DOCA agent skills 让你能够为智能体赋予领域专业知识。这意味着你可以更快地构建、交付更稳定的代码，并以更少的未知数进行部署。</p>
<p>其综合效果是减少了从任务到可用代码之间的纠错周期。对于在大规模 DOCA 应用程序中使用 AI 智能体的团队而言，这种周期的缩短会在每位开发者、每项任务和每次部署中产生叠加效益。</p>
<p>接下来的章节将详细介绍四项能力。每项能力都结合了我们 65 个提示词评估中的真实案例以及使用该技能带来的优势进行说明。</p>
<p>DOCA AI agent skills 解决的问题：API 的误用——智能体虚构不存在的函数、标志和镜像标签。</p>
<p>这是我们评估中最常见的失败模式，影响了 65 个提示词中的 59 个。在没有技能的情况下，智能体生成的代码会引用库中不存在的 DOCA 函数、名称错误的标志以及在运行时报错的镜像标签。作为开发者，你最终不得不调试并非由你引入的错误（即智能体的凭空捏造）。</p>
<p>提示词：“我有一台安装了 BlueField-3 DPU 和 DOCA 的主机。我想在主机端进程和 DPU 端智能体之间建立一个 DOCA Comch（通信通道），以便它们可以交换少量控制消息（每条小于 4 KiB，每秒数次）。”</p>
<p>配备技能的 AI 智能体仅使用真实的 DOCA Comch API 调用：正确的参数顺序、经过验证的标志和生命周期序列，没有任何虚构内容。</p>
<p>当智能体的初次响应就使用了正确的 API 接口时，你就可以直接进入集成阶段，而无需从调试排错开始。在测试 API 准确性的 63 个提示词中，配备技能后的结果每一次都更为优异。</p>
<p>DOCA AI agent skills 解决的问题：智能体为设备不支持的功能编写代码。</p>
<p>在没有技能的情况下，65 个提示词中有 46 个遗漏了硬件能力验证。其失败模式是一致的：智能体假定某项能力存在并据此生成代码，而开发者只有在真实硬件上运行时才会发现这种不匹配。此时，修复代码需要弄清楚跳过了哪个能力检查、重构代码路径并重新进行测试。</p>
<p>提示词：“我有两台通过高速 InfiniBand 网络互连的主机。每台主机都配有一块 NVIDIA GPU 和一块 ConnectX 网卡，且两台主机均安装了 DOCA。我想测量当 RDMA WRITE 工作请求（WR）从 GPU 上的 CUDA 内核（而非主机 CPU 线程）提交时的工作请求延迟，以便决定是否将我的应用程序接入 GPUNetIO Verbs 接口。”</p>
<p>配备技能的 AI 智能体在编写任何代码之前会先检查设备实际支持的功能。它会验证 GPU-网卡的 PCIe 拓扑，在确认支持 GPUNetIO 后再行推进，并列出替代的 API 接口及各自适用的场景。</p>
<p>配备技能的 AI 智能体在编写任何代码之前，都会针对实际使用的硬件验证回答的前提条件。</p>
<p>DOCA AI agent skills 解决的问题：智能体生成的代码无法在 DOCA 容器中编译或链接。</p>
<p>构建正确性在 65 个提示词中的 10 个上进行了测试。虽然这是一个较小的子集，但一旦发生，开发就无法继续推进。</p>
<p>提示词：“我正尝试从随附的示例中构建一个 DOCA Flow 程序。编译步骤成功了，但链接失败：未定义对 doca_flow_init 的引用（undefined reference to doca_flow_init）。我该如何调试此问题？”</p>
<p>配备技能的 AI 智能体能够将未定义引用识别为链接时错误，并利用构建工具（pkg-config）查找 doca-flow 正确的链接器标志。</p>
<p>生成错误链接器标志的智能体会让开发者陷入无法解决的死胡同。而具备技能的智能体能立即指出正确的诊断方法，并使用合适的工具获取正确的标志。</p>
<p>DOCA AI 智能体技能所解决的问题：智能体在运行中的硬件上应用固件级更改时，往往缺乏预检、回滚计划，或是不知道需要冷重启。</p>
<p>任务越复杂，这些技能就越重要。在我们包含 65 个提示词的评测中，最大的性能差距出现在复杂度最高的场景中：在运行中的硬件上进行固件级更改。</p>
<p>提示词：“我有一台运行 DOCA 工作负载的生产级 BlueField-3 DPU。我已为我的服务加载了 DOCA AI 智能体技能，下一步是写入 mlxconfig 类的固件级参数。”</p>
<p>配备技能的 AI 智能体严格执行固件级更改所需的全部规范，以满足所有要求。这包括预检清点、将带外（OOB）路径作为先决条件、明确的维护窗口、回滚计划，并指出 mlxconfig 类的写入仅在冷重启后生效，而非热重启。</p>
<p>具备技能的智能体满足了所有要求。未配备技能的智能体则一项都没满足。在生产环境运行中的 DPU 上，这些疏漏都不属于可挽回的调试步骤。这些技能承载了有关可能发生什么问题及其原因的知识，将充满风险的固件更改转化为规范、安全的操作流程。</p>
<p>在所有 65 个提示词测试中，配备 DOCA 技能的 AI 智能体每一次都得出了正确答案。这意味着更少的纠错周期，以及更快产出可运行的代码。</p>
<p>视频 1 中的演示具体展现了这种效率提升。两个智能体接受了同样的任务：使用 NVIDIA DOCA 构建一个程序，在 BlueField-3 上发送真实的 RDMA 流量。两者均告成功，但具备技能的智能体手写代码量减少了 73%（189 行对比 695 行），硬件命令减少了大约一半（20 条对比 37 条，减少了 46%）。这就是通过反复试错来重新摸索 DOCA API 和构建要求的智能体，与在动笔前就已掌握这些知识的智能体之间的区别。</p>
<p>DOCA AI 智能体技能为您的智能体提供了取得成功所需的领域知识，让您可以更高效、更准确地进行构建。如需开始使用，请访问 NVIDIA/skills GitHub 仓库。查看通用技能以快速上手，并探索适用于 DOCA Flow、GPUNetIO、RDMA 等特定库的专属技能。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【NVIDIA Developer Blog (英伟达开发者官方英文)】于 2026-10-02 02:13 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#NVIDIA</span>
</div>

<div class="news-card-footer"><a href="https://developer.nvidia.com/blog/build-applications-on-nvidia-bluefield-faster-with-nvidia-doca-agent-skills/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【NVIDIA Developer Blog (英伟达开发者官方英文)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-dia-tensorrt-rtx-samples-7f6b9d99dce00408" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="1645" data-content-paragraphs="14" data-published-at="2026-10-01T17:59:27.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/nvidia.svg" class="source-icon" alt="NVIDIA Developer Blog (英伟达开发者官方英文)" width="16" height="16" /> <strong>NVIDIA Developer Blog (英伟达开发者官方英文)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 01:59</span>
</div>

### [使用 C++ 与 NVIDIA TensorRT RTX 示例构建本地 AI 应用](https://developer.nvidia.com/blog/build-local-ai-apps-with-c-and-nvidia-tensorrt-rtx-samples/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Build Local AI Apps with C++ and NVIDIA TensorRT RTX Samples</div>

<div class="article-cover"><img src="https://developer-blogs.nvidia.com/wp-content/uploads/2026/09/din-deploy-featured-768x432.png" alt="使用 C++ 与 NVIDIA TensorRT RTX 示例构建本地 AI 应用" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>将 AI 模型引入本地应用程序需要可移植的模型格式、可靠的运行时环境以及可在各目标系统上运行的加速技术。</p>
<p>Do Inference Now (DIN) Deploy 是一个实用的开源 C++ 示例集，旨在填补这一空白。它将 ONNX Runtime 与 NVIDIA TensorRT RTX 执行提供程序（execution provider）相结合，帮助开发者在 Windows 和 Linux 上从模型检查点过渡到原生且具备硬件加速的应用程序。相同的 ONNX Runtime API 也可以通过 WinML 2.0 访问。</p>
<p>每个 DIN Deploy 示例都从一个 Python 导出器开始，该导出器从 Hugging Face 下载模型检查点并将其转换为 ONNX 制品。应用程序端则是基于 ONNX Runtime (ORT) 构建的原生 C++ CLI。这种分离保持了模型转换与部署逻辑的独立性，开发者可以将导出的模型直接带入本地应用程序，而无需依赖针对特定模型的运行时。</p>
<p>大多数示例代码使用 C++ 中的 ONNX Runtime 会话与张量 API。特定于供应商的代码（包括 CUDA API 和内核）仅出现在可选的加速路径中。支持所需 ONNX Runtime 张量 API 的执行提供程序均可运行这些通用代码。</p>
<p>ORT 的复制张量（copy tensor）API 可以在通用代码中管理数据局部性，而无需使用专用的供应商 API。</p>
<p>对于围绕已导出模型推理的前处理和后处理，FLUX.2 示例使用了 ONNX Runtime 在 1.25 版本中引入的图形互操作（graphics interop）功能，结合 Vulkan 和 DirectX 进行采样。</p>
<p>该代码库提供了适用于 Windows 和 Linux（包括 Arm64 变体）的 CMake 预设（CMake presets）。DirectX 仅在 Windows 上可用。</p>
<p>在自动语音识别（ASR）方面，DIN Deploy 支持离线和流式处理流水线。OpenAI Whisper 涵盖了各种模型规格的离线转录，而 NVIDIA Parakeet TDT 和 NVIDIA Nemotron ASR Streaming 则提供了流式流水线。</p>
<p>这些示例展示了如何在原生应用中传输音频并返回转录结果，同时在可用环境下利用 GPU 加速。</p>
<p>Meta SAM 2.1 示例支持图像和视频的交互式掩码生成。它们将模型输出转换为分割掩码，供原生应用程序用于选区、跟踪及其他计算机视觉工作流。</p>
<p>表 1 对比了在 DGX Spark 上测得的选定 DIN Deploy 工作负载的 GPU 和 CPU 性能。</p>
<p>FLUX.2-klein-4B 示例提供了提示词驱动的图像生成功能。该示例包含与 Vulkan 和 DirectX 的图形 API 互操作，允许应用程序将常驻 GPU 的资源与跨厂商的着色器接口进行集成。它还展示了如何利用 NVIDIA Model Optimizer 进行训练后量化（PTQ）以生成量化的 ONNX 模型。量化依赖于具体硬件，但由于 ONNX 接口保持不变，量化模型可以直接作为无缝替换项（drop-in replacement）使用，无需修改任何应用程序代码。</p>
<p>您可以从该代码库适用于 Windows、Linux、x86-64 和 Arm64 的 CMake 预设开始。在配置并构建项目后，将模型导出为 ONNX 格式，然后使用 TensorRT RTX 运行 CLI，或者直接将代码复制到您自己的应用程序中以使用这些流水线实现。CMake 默认会自动下载 ONNX Runtime 和 TensorRT RTX。</p>
<p>欢迎进一步了解 TensorRT for RTX、NVIDIA Local AI、DIN Deploy 代码库，以及 NVIDIA 关于模型量化的系列博文。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【NVIDIA Developer Blog (英伟达开发者官方英文)】于 2026-10-02 01:59 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#NVIDIA</span>
</div>

<div class="news-card-footer"><a href="https://developer.nvidia.com/blog/build-local-ai-apps-with-c-and-nvidia-tensorrt-rtx-samples/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【NVIDIA Developer Blog (英伟达开发者官方英文)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-d-other-ai-writing-tells-54b535ddb7e24cf9" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="official-page" data-content-kind="official-page-body" data-source-lang="en" data-content-length="2190" data-content-paragraphs="16" data-published-at="2026-10-01T17:50:19.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/techcrunch.svg" class="source-icon" alt="TechCrunch (硅谷创业与资本)" width="16" height="16" /> <strong>TechCrunch (硅谷创业与资本)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 01:50</span>
</div>

### [Opus 5.5 热衷于强调“这至关重要”（以及其他 AI 写作特征词）](https://techcrunch.com/2026/10/01/opus-5-5-loves-to-tell-you-this-matters-and-other-ai-writing-tells/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Opus 5.5 loves to tell you ‘this matters’ (and other AI writing tells)</div>

<div class="article-body" data-article-body="true"><p>既然大语言模型（LLM）生成的文本如今已随处可见，人们便迫切希望找到识破它们的方法。尽管早期的特征迹象（如破折号和“深入探究（delve）”）早已淡出，但研究人员表示，AI 模型在撰写文本时仍然保留着大量容易暴露身份的惯用习惯。</p>
<p>营销公司 Graphite 的一项新研究考察了前沿模型的写作习惯，查明了每个模型最青睐的词汇和短语。虽然像滥用破折号这样的旧特征已被消除，但模型仍然依赖强对比句式，且每个模型版本都展现出自身独特的癖好。最令人惊讶的是，特征词的涉及范围之广超乎想象。Graphite 发现了 13,000 个在 AI 内容中出现频率至少是人类内容两倍的短语——这也是他们对“特征（tell）”的定义。</p>
<p>“事实证明，随着时间的推移，Claude 模型实际上越来越接近人类的词汇分布规律，”Graphite 首席 AI 官格雷格·德鲁克（Greg Druck）告诉 TechCrunch，“而对 GPT 模型而言，差距反而越来越大。”</p>
<p>要大规模研究 AI 生成的写作，需要缜密的研究设计。Graphite 首先选取了 ChatGPT 发布前出版的 10,000 篇文章作为语料库，充当人类生成的对照组。随后，研究人员让不同的 AI 模型根据摘要重写这些文章，以期尽可能消除原始材料的偏差。通过比对人类与各个模型的对应样本，他们得以比较某些词汇和短语在 AI 写作中出现的频率，以及句子结构中更广泛的规律。</p>
<p>根据 Graphite 的研究结果，Claude Opus 5.5 最显著的特征词是“可靠（dependable）”，其出现频率比人类样本高出 23 倍。尽管 Opus 5.5 现在避开了“不是 X，而是 Y（it’s not X, it’s Y）”的句式结构，但它仍然倾向于表达某事物“不仅是 X，更是 Y（is more than an X, it’s a Y）”。</p>
<p>最重要的是，Opus 极其喜欢告诉你事情为何至关重要，其使用短语“这很重要（this matters）”的频率是人类写作的 116 倍，而“为何 X 至关重要（why X matters）”的出现频率则是人类的 92 倍。</p>
<p>OpenAI 的 Astra 则有着另一套露马脚的特征。该模型喜欢描述其所讨论内容的“另一个维度（another dimension）”，并倾向于通过声称某项行动“可能提供（may provide）”或“能够提供（can provide）”某种益处来对论断进行对冲表述。它最大的特征被 Graphite 称为“修正性框架（corrective framing）”，即将主题定义为“不仅是 X（not simply X）”或提出一种替代方案，如“而非依赖 X（rather than relying on X）”。根据 Graphite 的研究，这些句式在 Astra 生成的文本中出现的频率是人类写作的 100 多倍。</p>
<p>值得注意的是，所有前沿实验室似乎都针对模型过度使用破折号的批评做出了回应。在 Graphite 的样本中，Opus 5.5 使用该标点符号的频率比 Opus 5 减少了 99%。Astra 目前的使用频率比人类样本少 88%，而 Gemini 3.1 Pro 几乎完全从其写作中剔除了破折号。</p>
<p>然而，尽管个别特征有所改变，Graphite 表示整体特征数量基本保持稳定。“这并不意味着特征在减少，”德鲁克告诉 TechCrunch，“他们成功去除了最广为人知的特征，但其他特征又冒了出来。而且每个模型版本都有其独特的特征。”</p>
<p>鉴于各大实验室对类人写作风格的重视，这些特征竟如此顽固令人感到意外。在 Opus 5.5 的发布说明中，Anthropic 曾夸耀该模型“比以往模型沟通更自然”，并称早期用户“发现其写作更清晰、更易于理解”。</p>
<p>OpenAI 在发布 Sol 和 Luna 的 GPT-6 版本时也做出了类似的声明，称用户可以“期待看到更高的清晰度、更少的行话术语，以及更少奇怪的说辞”。</p>
<p>但德鲁克对各大实验室能在多大程度上彻底消除这些特征句式或短语持怀疑态度。</p>
<p>“我个人的普遍假设是，实验室控制这些细节的能力可能比大家预期的要低，”德鲁克说，“这些都是拥有数十亿参数的庞大模型。他们能进行的测试次数有限，难免会有疏漏。”</p>
<p>当您通过我们文章中的链接进行购买时，我们可能会赚取少量佣金。这不会影响我们的编辑独立性。</p>
<p>购买第二张门票立享五折优惠。Disrupt 的体验理应与他人分享。购买您的通行证，即可以半价携同事、合伙人或同行一同参与。通过结识人脉、凝聚动能并探索创业生态系统的下一步动向，拓展更多业务领域。</p>
<p>谷歌认为 SpaceX 的星舰必须发射 1,800 次，太空数据中心才能真正起步<br />谷歌发布 Gemini 4 Argon，称其为迄今为止最强大的模型<br />五角大楼邀请埃隆·马斯克和帕尔默·拉齐协助规划军方下一步行动<br />AMD 将斥资 82 亿美元收购李飞飞的 World Labs<br />走红的 AI 智能体 Instinct 以 100 亿美元估值完成 10 亿美元 C 轮融资<br />Crusoe 放弃在 AI 数据中心使用 Boom 涡轮机的 12.5 亿美元计划<br />Astra 和 Opus 刚通过了图灵的另一项测试</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【TechCrunch (硅谷创业与资本)】于 2026-10-02 01:50 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#TechCrunch</span>
</div>

<div class="news-card-footer"><a href="https://techcrunch.com/2026/10/01/opus-5-5-loves-to-tell-you-this-matters-and-other-ai-writing-tells/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【TechCrunch (硅谷创业与资本)】官方出处原文 ↗</a></div>
:::

:::cell
<div id="story-it-and-amazon-s3-vectors-606e6d73f684529c" class="story-anchor"></div>
<div class="news-card-header" data-content-status="full" data-translation-status="full" data-content-source="rss" data-content-kind="rss-body" data-source-lang="en" data-content-length="16440" data-content-paragraphs="80" data-published-at="2026-10-01T17:34:56.000Z" data-time-source="publication">
  <div class="news-card-meta-left">
    <span class="source-badge"><img src="/INFO-LIVE/assets/sources/aws.svg" class="source-icon" alt="AWS Machine Learning Blog (亚马逊云科技官方英文)" width="16" height="16" /> <strong>AWS Machine Learning Blog (亚马逊云科技官方英文)</strong></span>
    <span class="stance-badge">独立专业观察</span>
    <span class="dimension-pill">🧠 前沿智能</span>
  </div>
  <span class="news-meta-time">🕒 2026-10-02 01:34</span>
</div>

### [要闻：在我的上一篇文章《使用 Amazon S3 Vectors 为多智能体 AI 系统构建持久化记忆》中，我们探讨了](https://aws.amazon.com/blogs/machine-learning/build-agent-memory-with-nvidia-nemo-agent-toolkit-and-amazon-s3-vectors/)
<div class="original-title-sub"><span class="orig-tag">原文</span> Build agent memory with NVIDIA NeMo Agent Toolkit and Amazon S3 Vectors</div>

<div class="article-cover"><img src="https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/09/28/ML-21981-1.png" alt="要闻：在我的上一篇文章《使用 Amazon S3 Vectors 为多智能体 AI 系统构建持久化记忆》中，我们探讨了" loading="lazy" /></div>

<div class="article-body" data-article-body="true"><p>在我的上一篇文章《使用 Amazon S3 Vectors 为多智能体 AI 系统构建持久化记忆》中，我们探讨了为何记忆工程是生产级多智能体系统的基石。我们展示了 Amazon Simple Storage Service (Amazon S3) 的一项功能——Amazon S3 Vectors 如何满足智能体记忆的架构需求：语义检索、丰富的元数据、强一致性以及弹性伸缩。</p>
<p>在本文中，我们将从架构走向落地实践。我们将向您展示如何将 Amazon S3 Vectors 用作 NVIDIA NeMo Agent Toolkit (NAT) 内部的持久化记忆层，并部署在 Amazon Elastic Kubernetes Service (Amazon EKS) 上以获得全面的运维控制。</p>
<p>读完本文后，您将了解 NAT 的记忆子系统是如何工作的，以及如何将 Amazon S3 Vectors 实现为自定义记忆提供程序（custom memory provider）。您还将学习如何将该技术栈部署在 Amazon EKS 上，并以一个多智能体投资研究用例作为实际示例。</p>
<p>什么是 NVIDIA NeMo Agent Toolkit？<br />NVIDIA NeMo Agent Toolkit (NAT) 是一个用于构建、性能分析和优化 AI 智能体的开源框架。它与框架无关，可与 Strands Agents、LangChain、LlamaIndex、CrewAI 以及自定义实现配合使用。NAT 提供了与生产级智能体系统相关的四项核心能力：</p>
<p>智能体编排（Agent orchestration）——将智能体定义为具有可配置大语言模型 (LLM)、工具和提示词的可组合工作流。您可以在本地使用 `nat run` 运行它们，或使用 `nat serve` 作为持久化服务运行。<br />性能分析（Profiling）——跨智能体和各个工具追踪 Token 使用量、延迟、吞吐量和运行时间，以识别多智能体工作流中的瓶颈。<br />评估（Evaluation）——针对答案准确性、上下文相关性、响应真实性（groundedness）和智能体轨迹提供内置评估器，同时支持自定义评估器。<br />优化（Optimization）——自动超参数调优（temperature、top_p、max_tokens），在实现成本与延迟最小化的同时最大化输出质量。</p>
<p>NAT 包含一个专用的记忆子系统，旨在跨智能体调用存储和检索对话历史、用户偏好以及长期知识。该记忆模块具有高可扩展性：您可以通过实现 NAT 的插件接口来创建自定义记忆提供程序（后端）。关键组件包括：</p>
<p>MemoryEditor —— 所有记忆后端必须实现的抽象接口。它定义了三个方法：`add_items()`、`search()` 和 `remove_items()`。<br />MemoryItem —— 表示单条记忆的数据模型，包含对话历史、标签、元数据、`user_id` 以及一个可选的文本记忆字符串字段。<br />MemoryBaseConfig —— 自定义记忆配置所继承的 Pydantic 基类。NAT 通过其 YAML 配置文件中的 `_type` 字段来发现提供程序。<br />自动记忆包装器（Automatic memory wrapper）—— `auto_memory_agent` 工作流类型，它为智能体封装了自动记忆捕获与检索功能，无需 LLM 显式调用记忆工具。</p>
<p>NAT 目前内置了以下记忆提供程序：Mem0、MemMachine、Redis 和 Zep。这些能够覆盖常见的使用场景。然而，对于需要弹性向量存储、强写入一致性以及能够低成本扩展至数十亿向量的生产级多智能体系统而言，基于 Amazon S3 Vectors 的自定义提供程序则是理想之选。</p>
<p>为何选择 Amazon S3 Vectors 作为持久化记忆后端<br />《使用 Amazon S3 Vectors 为多智能体 AI 系统构建持久化记忆》一文深入探讨了其架构层面的合理性。下表总结了使 S3 Vectors 成为 NAT 记忆层理想选择的特性：</p>
<p>需求 | S3 Vectors 能力<br />语义检索 | 支持可配置距离度量指标（余弦距离、欧几里得距离）的向量相似度搜索<br />限定范围查询 | 每个向量均支持可过滤的元数据（字符串、数字、布尔值、列表）<br />多智能体协作 | 强写入一致性。记忆在插入后立即可见<br />规模 | 每个索引最高支持 20 亿个向量，无需预先规划容量<br />成本效益 | 仅为存储、写入和查询付费，无闲置计算开销<br />访问控制 | 基于每个存储桶和索引的 AWS Identity and Access Management (IAM) 策略。支持针对物理强隔离的租户级独立索引</p>
<p>要跟随本文完成实操演练，您需要准备：<br />拥有创建 Amazon S3 Vectors 资源和 Amazon EKS 集群权限的 AWS 账户。<br />一个现有的 Amazon EKS 集群（请参见《Amazon EKS 入门》）。<br />已安装 NVIDIA NeMo Agent Toolkit（已在 1.6 版本上测试）。<br />Python 3.11 或 3.12（NAT 要求 &gt;=3.11 且 &lt;3.14）。<br />用于生成向量表示的嵌入模型（本文使用 Amazon Titan Text Embeddings V2）。<br />用于容器和集群操作的 kubectl 和 Docker。</p>
<p>将 S3 Vectors 实现为 NAT 记忆提供程序<br />实现过程分为三个步骤：<br />步骤 1：创建 S3 Vectors 基础设施<br />步骤 2：实现自定义 MemoryEditor 插件<br />步骤 3：配置智能体工作流</p>
<p>图 1：将 Amazon S3 Vectors 实现为 NAT 记忆提供程序的三个步骤</p>
<p>步骤 1. 创建 Amazon S3 Vectors 基础设施<br />以下代码创建了一个向量存储桶和一个带有专为智能体记忆设计的元数据模式（schema）的索引。该索引使用 1024 维度以匹配 Amazon Titan Text Embeddings V2 的输出，并将庞大的 `content` 字段标记为不可过滤的元数据：</p>
<p>```python<br />REGION = &quot;us-west-2&quot;<br />VECTOR_BUCKET = &quot;amzn-s3-demo-research-agent-memory&quot;<br />INDEX_NAME = &quot;agent-long-term-memory&quot;</p>
<p>s3vectors = boto3.client(&quot;s3vectors&quot;, region_name=REGION)</p>
<p># 创建向量存储桶<br />s3vectors.create_vector_bucket(vectorBucketName=VECTOR_BUCKET)</p>
<p># 创建索引（1024 维度与 Amazon Titan Text Embeddings V2 匹配）<br />s3vectors.create_index(<br />    vectorBucketName=VECTOR_BUCKET,<br />    indexName=INDEX_NAME,<br />    dataType=&quot;float32&quot;,<br />    dimension=1024,<br />    distanceMetric=&quot;cosine&quot;,<br />    metadataConfiguration={&quot;nonFilterableMetadataKeys&quot;: [&quot;content&quot;]},<br />)<br />```</p>
<p>创建好存储桶和索引后，您就可以实现负责对其进行读取和写入的记忆提供程序了。</p>
<p>步骤 2. 实现自定义 MemoryEditor 插件<br />以下代码将 MemoryEditor 接口实现为 Amazon S3 Vectors 后端并进行注册，以便 NAT 能够发现它：</p>
<p>```python<br />import boto3<br />import json<br />import uuid<br />from datetime import datetime, timezone<br />from nat.plugin_api import MemoryBaseConfig, MemoryEditor, MemoryItem, register_memory<br />from nat.builder.builder import Builder</p>
<p>class S3VectorsMemoryConfig(MemoryBaseConfig, name=&quot;s3vectors_memory&quot;):<br />    &quot;&quot;&quot;Amazon S3 Vectors 的 NAT 记忆提供程序配置。&quot;&quot;&quot;<br />    vector_bucket: str<br />    index_name: str<br />    aws_region: str = &quot;us-west-2&quot;<br />    default_top_k: int = 5</p>
<p>class S3VectorsMemoryEditor(MemoryEditor):<br />    &quot;&quot;&quot;由 Amazon S3 Vectors 支持的 NAT MemoryEditor。&quot;&quot;&quot;<br />    def __init__(self, config: S3VectorsMemoryConfig):<br />        self._vector_bucket = config.vector_bucket<br />        self._index_name = config.index_name<br />        self._default_top_k = config.default_top_k<br />        self._s3vectors = boto3.client(&#39;s3vectors&#39;, region_name=config.aws_region)<br />        self._bedrock = boto3.client(&#39;bedrock-runtime&#39;, region_name=config.aws_region)<br />```</p>
<p>def _get_embedding(self, text: str) -&gt; list[float]:<br />    &quot;&quot;&quot;使用 Amazon Titan Text Embeddings V2 生成嵌入向量。&quot;&quot;&quot;<br />    response = self._bedrock.invoke_model(<br />        modelId=&#39;amazon.titan-embed-text-v2:0&#39;,<br />        contentType=&#39;application/json&#39;,<br />        accept=&#39;application/json&#39;,<br />        body=json.dumps({<br />            &#39;inputText&#39;: text,<br />            &#39;dimensions&#39;: 1024,<br />            &#39;normalize&#39;: True<br />        })<br />    )<br />    return json.loads(response[&#39;body&#39;].read())[&#39;embedding&#39;]</p>
<p>async def add_items(self, items: list[MemoryItem], **kwargs) -&gt; None:<br />    &quot;&quot;&quot;将记忆项作为向量存储在 Amazon S3 Vectors 中。&quot;&quot;&quot;<br />    vectors = []<br />    for item in items:<br />        # 从记忆内容构建待嵌入文本<br />        text = item.memory or json.dumps(item.conversation)<br />        embedding = self._get_embedding(text)<br />        # 使用 uuid4 防止同一秒内的键冲突<br />        key = f&quot;mem_{item.user_id}_{uuid.uuid4().hex[:12]}&quot;<br />        # 注意：S3 Vectors 元数据值存在大小限制。<br />        # 生产环境中截断内容至 1024 个字符。<br />        content_for_metadata = text[:1024]<br />        mem_metadata = {<br />            &#39;user_id&#39;: item.user_id,<br />            &#39;memory_type&#39;: item.metadata.get(&#39;memory_type&#39;, &#39;episodic&#39;),<br />            &#39;agent_id&#39;: item.metadata.get(&#39;agent_id&#39;, &#39;&#39;),<br />            &#39;team_id&#39;: item.metadata.get(&#39;team_id&#39;, &#39;&#39;),<br />            &#39;task_id&#39;: item.metadata.get(&#39;task_id&#39;, &#39;&#39;),<br />            &#39;confidence&#39;: item.metadata.get(&#39;confidence&#39;, 0.8),<br />            &#39;created_at_epoch&#39;: int(datetime.now(timezone.utc).timestamp()),<br />            &#39;is_shared&#39;: item.metadata.get(&#39;is_shared&#39;, True),<br />            &#39;source&#39;: item.metadata.get(&#39;source&#39;, &#39;agent&#39;),<br />            &#39;content&#39;: content_for_metadata,<br />        }<br />        # 如果存在特定领域的元数据，则添加<br />        if &#39;ticker&#39; in item.metadata:<br />            mem_metadata[&#39;ticker&#39;] = item.metadata[&#39;ticker&#39;]<br />        vectors.append({<br />            &#39;key&#39;: key,<br />            &#39;data&#39;: {&#39;float32&#39;: embedding},<br />            &#39;metadata&#39;: mem_metadata<br />        })<br />    self._s3vectors.put_vectors(<br />        vectorBucketName=self._vector_bucket,<br />        indexName=self._index_name,<br />        vectors=vectors<br />    )</p>
<p>async def search(self, query: str, top_k: int = None, **kwargs) -&gt; list[MemoryItem]:<br />    &quot;&quot;&quot;从 Amazon S3 Vectors 中检索语义相关的记忆。&quot;&quot;&quot;<br />    query_embedding = self._get_embedding(query)<br />    effective_top_k = top_k or self._default_top_k<br />    # 从 kwargs 构建元数据过滤器<br />    filter_expr = {}<br />    for field in (&#39;agent_id&#39;, &#39;memory_type&#39;, &#39;ticker&#39;, &#39;team_id&#39;, &#39;user_id&#39;):<br />        if field in kwargs:<br />            filter_expr[field] = {&#39;$eq&#39;: kwargs[field]}<br />    # 支持针对 is_shared 的布尔过滤器<br />    if &#39;is_shared&#39; in kwargs:<br />        filter_expr[&#39;is_shared&#39;] = {&#39;$eq&#39;: kwargs[&#39;is_shared&#39;]}<br />    response = self._s3vectors.query_vectors(<br />        vectorBucketName=self._vector_bucket,<br />        indexName=self._index_name,<br />        queryVector={&#39;float32&#39;: query_embedding},<br />        topK=effective_top_k,<br />        filter=filter_expr if filter_expr else None,<br />        returnMetadata=True<br />    )<br />    results = []<br />    for vec in response.get(&#39;vectors&#39;, []):<br />        results.append(MemoryItem(<br />            conversation=[],<br />            tags=[vec[&#39;metadata&#39;].get(&#39;memory_type&#39;, &#39;&#39;)],<br />            metadata=vec[&#39;metadata&#39;],<br />            user_id=vec[&#39;metadata&#39;].get(&#39;user_id&#39;, &#39;&#39;),<br />            memory=vec[&#39;metadata&#39;].get(&#39;content&#39;, &#39;&#39;)<br />        ))<br />    return results</p>
<p>async def remove_items(self, **kwargs) -&gt; None:<br />    &quot;&quot;&quot;从 Amazon S3 Vectors 中删除记忆项。&quot;&quot;&quot;<br />    keys = kwargs.get(&#39;keys&#39;, [])<br />    if keys:<br />        self._s3vectors.delete_vectors(<br />            vectorBucketName=self._vector_bucket,<br />            indexName=self._index_name,<br />            keys=keys<br />        )</p>
<p># 注册记忆提供者，以便 NAT 能够发现它<br />@register_memory(config_type=S3VectorsMemoryConfig)<br />async def build_s3vectors_memory(config: S3VectorsMemoryConfig, builder: Builder):<br />    yield S3VectorsMemoryEditor(config)</p>
<p>该插件使用 Amazon Titan Text Embeddings V2 生成嵌入向量，将每条记忆作为附带作用域元数据的向量进行存储，并将搜索过滤器转换为 Amazon S3 Vectors 元数据查询。</p>
<p>步骤 3. 配置 NAT 智能体工作流</p>
<p>定义插件后，在 NAT 的 YAML 配置文件中对其进行配置，并将其接入智能体工作流：</p>
<p># config.yml - 包含 Amazon S3 Vectors 记忆配置的 NAT 智能体配置<br />memory:<br />  agent_memory:<br />    _type: s3vectors_memory<br />    vector_bucket: &quot;amzn-s3-demo-research-agent-memory&quot;<br />    index_name: &quot;agent-long-term-memory&quot;<br />    aws_region: &quot;us-west-2&quot;</p>
<p>functions:<br />  add_memory:<br />    _type: add_memory<br />    memory: agent_memory<br />    description: |<br />      将重要发现、模式或事实存储到长期记忆中。在研究过程中发现新信息后使用此功能。<br />  get_memory:<br />    _type: get_memory<br />    memory: agent_memory<br />    description: |<br />      在开始研究前检索相关的先验知识。使用当前研究主题进行查询，以召回相关发现。<br />  web_search:<br />    _type: web_search<br />  financial_data:<br />    _type: financial_data_api</p>
<p>workflow:<br />  _type: auto_memory_agent<br />  inner_agent_name: research_agent<br />  memory_name: agent_memory<br />  llm_name: bedrock_llm<br />  save_user_messages_to_memory: true<br />  retrieve_memory_for_every_response: true<br />  save_ai_messages_to_memory: true</p>
<p>llm:<br />  bedrock_llm:<br />    _type: bedrock<br />    model_id: &quot;anthropic.claude-sonnet-4-20250514&quot;<br />    temperature: 0.3</p>
<p>通过 auto_memory_agent 包装器，您可以自动捕获和检索记忆。用户消息和智能体响应都会被存储，并在每次智能体调用前注入相关上下文。这种设计使得 LLM 无需显式调用记忆工具。</p>
<p>负责任的 AI 与数据处理注意事项</p>
<p>由于该方案会持久化保存对话历史和用户记忆，因此需要规划这些数据的保留与访问机制。为存储的记忆制定数据保留策略，并使用本文介绍的记忆整合与删除路径淘汰不再需要的数据。避免在记忆元数据中存储个人身份信息（PII），并在对敏感字段进行嵌入之前执行脱敏或标记化处理。通过单租户索引和最小权限 IAM 策略划分访问权限，确保每个智能体只能读取和写入其自身拥有的记忆。</p>
<p>Amazon S3 Vectors 实践：多智能体投资研究</p>
<p>以下应用场景展示了该模式的实际落地应用。设想有三个专职智能体在投资研究工具中协同工作：</p>
<p>研究智能体（Research Agent）——收集市场数据、财报与新闻。<br />分析智能体（Analysis Agent）——执行定量分析并识别模式。<br />综合智能体（Synthesis Agent）——结合两个智能体的发现生成报告。</p>
<p>借助持久化记忆，每个智能体都能在前序工作成果的基础上继续推进。研究智能体可以召回先前收集的数据，避免冗余的 API 调用。分析智能体可在前序会话中识别的模式基础上继续分析。综合智能体则能获取累积的发现，从而生成日益丰富的报告。</p>
<p>多智能体记忆协同</p>
<p>每个智能体使用相同的 S3 Vectors 索引，但在元数据中写入各自的 agent_id。智能体通过元数据过滤器检索共享知识：</p>
<p># 分析智能体检索研究智能体的共享发现<br />research_findings = await memory_client.search(<br />    query=f&quot;Recent research findings for {ticker}&quot;,<br />    top_k=10,<br />    team_id=&#39;investment-research&#39;,<br />    is_shared=True<br />)</p>
<p># 综合智能体查询所有团队知识<br />all_team_knowledge = await memory_client.search(<br />    query=f&quot;Complete analysis and research for {ticker} Q2 2026&quot;,<br />    top_k=20,<br />    team_id=&#39;investment-research&#39;<br />)</p>
<p>NAT 内置的多租户记忆隔离使用 user_id 来限定每个用户的记忆范围。对于多智能体团队协作，team_id 元数据字段在同一个 S3 Vectors 索引内提供了额外的分组维度。</p>
<p>随着时间的推移，情景记忆（episodic memories）会不断累积。定期将它们整合为语义记忆（semantic memories，即泛化知识），可以保持检索的精准与高效。你可以通过定时计划的 cron 任务、向量数量阈值，或智能体在经历可配置次数的调研周期后主动触发的信号来启动整合：</p>
<p>```python<br />async def consolidate_memories(ticker: str, memory_client, workflow):<br />    &quot;&quot;&quot;将情景记忆提炼为持久的语义知识。&quot;&quot;&quot;<br />    episodes = await memory_client.search(<br />        query=f&quot;All findings about {ticker}&quot;,<br />        top_k=50,<br />        memory_type=&#39;episodic&#39;,<br />        ticker=ticker<br />    )<br />    episode_texts = [e.memory for e in episodes if e.memory]<br />    consolidation_prompt = f&quot;&quot;&quot;Given these {len(episode_texts)} observations about {ticker}, identify durable patterns and generalized knowledge.<br />{chr(10).join(episode_texts)}<br />Return a JSON array of insight strings. Do not include specific dates or one-time events.&quot;&quot;&quot;<br />    response = await workflow.run(consolidation_prompt)<br />    # 将响应解析为洞察列表<br />    insights = json.loads(response)<br />    # 将每个整合后的洞察存储为语义记忆<br />    await memory_client.add_items([<br />        MemoryItem(<br />            conversation=[],<br />            tags=[&#39;semantic&#39;],<br />            metadata={<br />                &#39;memory_type&#39;: &#39;semantic&#39;,<br />                &#39;confidence&#39;: 0.9,<br />                &#39;ticker&#39;: ticker,<br />                &#39;source&#39;: &#39;consolidation&#39;,<br />                &#39;is_shared&#39;: True,<br />                &#39;team_id&#39;: &#39;investment-research&#39;<br />            },<br />            user_id=&#39;system&#39;,<br />            memory=insight<br />        )<br />        for insight in insights<br />    ])<br />```</p>
<p>在 Amazon EKS 上部署智能体工作负载</p>
<p>对于需要对其智能体工作负载拥有完全运维控制权的团队而言，Amazon EKS 是一个深思熟虑的选择。借助 Amazon EKS，你可以控制扩缩容、网络以及生命周期管理，并能与 AWS Identity and Access Management (IAM) 原生集成以访问 Amazon S3 Vectors。如果你更倾向于全托管运行时，Amazon Bedrock AgentCore 提供了一种可消除此类运维开销的托管替代方案。你可以使用 nat serve 将 NAT 智能体作为容器化服务运行。每种智能体类型都是一个 Kubernetes Deployment，并通过用于服务账户的 IAM 角色（IRSA）授予 IAM 访问权限。</p>
<p>第 1 步：构建智能体容器</p>
<p>以下 Dockerfile 将智能体连同其配置和记忆插件打包在一起：</p>
<p>```dockerfile<br />FROM python:3.12-slim<br />RUN pip install nvidia-nat[langchain] boto3<br />COPY config.yml /app/config.yml<br />COPY s3vectors_memory.py /app/s3vectors_memory.py<br />WORKDIR /app<br />CMD [&quot;nat&quot;, &quot;serve&quot;, &quot;--config_file&quot;, &quot;config.yml&quot;]<br />```</p>
<p>第 2 步：使用 Kubernetes 清单进行部署</p>
<p>以下清单部署了带有自动扩缩容功能的调研智能体（Research Agent）：</p>
<p>```yaml<br />apiVersion: apps/v1<br />kind: Deployment<br />metadata:<br />  name: research-agent<br />  namespace: agent-team<br />spec:<br />  replicas: 2<br />  selector:<br />    matchLabels:<br />      app: research-agent<br />  template:<br />    metadata:<br />      labels:<br />        app: research-agent<br />        team: investment-research<br />    spec:<br />      serviceAccountName: agent-sa<br />      containers:<br />      - name: agent<br />        image: ${ECR_REGISTRY}/research-agent:latest # Amazon Elastic Container Registry (Amazon ECR)<br />        ports:<br />        - containerPort: 8000<br />        env:<br />        - name: VECTOR_BUCKET<br />          value: &quot;amzn-s3-demo-research-agent-memory&quot;<br />        - name: INDEX_NAME<br />          value: &quot;agent-long-term-memory&quot;<br />        - name: AWS_REGION<br />          value: &quot;us-west-2&quot;<br />        resources:<br />          requests:<br />            cpu: &quot;500m&quot;<br />            memory: &quot;1Gi&quot;<br />          limits:<br />            cpu: &quot;2000m&quot;<br />            memory: &quot;4Gi&quot;<br />---<br />apiVersion: autoscaling/v2<br />kind: HorizontalPodAutoscaler<br />metadata:<br />  name: research-agent-hpa<br />  namespace: agent-team<br />spec:<br />  scaleTargetRef:<br />    apiVersion: apps/v1<br />    kind: Deployment<br />    name: research-agent<br />  minReplicas: 1<br />  maxReplicas: 10<br />  metrics:<br />  - type: Resource<br />    resource:<br />      name: cpu<br />      target:<br />        type: Utilization<br />        averageUtilization: 70<br />```</p>
<p>用于 S3 Vectors 访问的 IAM 策略</p>
<p>以下 IAM 策略授予对记忆层的限定访问权限。通过 IRSA 将其附加到与 agent-sa 服务账户关联的 IAM 角色：</p>
<p>```json<br />{<br />  &quot;Version&quot;: &quot;2012-10-17&quot;,<br />  &quot;Statement&quot;: [<br />    {<br />      &quot;Effect&quot;: &quot;Allow&quot;,<br />      &quot;Action&quot;: [<br />        &quot;s3vectors:PutVectors&quot;,<br />        &quot;s3vectors:QueryVectors&quot;,<br />        &quot;s3vectors:GetVectors&quot;,<br />        &quot;s3vectors:DeleteVectors&quot;<br />      ],<br />      &quot;Resource&quot;: &quot;arn:aws:s3vectors:us-west-2:${ACCOUNT_ID}:vector-bucket/amzn-s3-demo-research-agent-memory/*&quot;<br />    }<br />  ]<br />}<br />```</p>
<p>在构建并推送容器镜像后，部署智能体：</p>
<p>```bash<br /># 创建命名空间<br />kubectl create namespace agent-team</p>
<p># 应用清单<br />kubectl apply -f kubernetes/research-agent-deployment.yaml</p>
<p># 验证 Pod 正在运行<br />kubectl get pods -n agent-team</p>
<p># 测试智能体端点<br />kubectl port-forward -n agent-team svc/research-agent 8000:8000<br />curl -X POST http://localhost:8000/generate \<br />  -H &quot;Content-Type: application/json&quot; \<br />  -d &#39;{&quot;inputs&quot;: &quot;What are the latest AAPL earnings trends?&quot;}&#39;<br />```</p>
<p>S3 Vectors 提供强写入一致性。各 Pod 和不同类型的智能体可以立即读取智能体 Pod 存储的记忆，无需进行缓存失效处理。HorizontalPodAutoscaler 会根据 CPU 利用率自动扩缩智能体副本。每个副本均通过 IRSA 连接到同一个 S3 Vectors 索引，无论由哪个 Pod 处理特定请求，都能支持一致的记忆访问。</p>
<p>评估记忆带来的影响</p>
<p>借助 NAT 的评估测试工具（nat eval），你可以量化记忆对智能体性能的影响。使用相同的数据集配置两轮评估运行：一轮启用记忆，另一轮不启用记忆：</p>
<p>```bash<br /># 启用记忆进行评估<br />nat eval --config_file config_with_memory.yml \<br />  --dataset eval_dataset.jsonl \<br />  --metrics accuracy,groundedness,token_usage,latency</p>
<p># 不启用记忆进行评估（基准对照）<br />nat eval --config_file config_no_memory.yml \<br />  --dataset eval_dataset.jsonl \<br />  --metrics accuracy,groundedness,token_usage,latency<br />```</p>
<p>基于该设计的架构特性，在对比这些评估运行时，你可以预期以下定性结果。这些属于方向性预期，而非实际基准评测数据：</p>
<p>事实依据性（Groundedness）提高——召回的记忆提供了可验证的来源上下文，使智能体能够引用它，而不仅仅依赖于参数化知识。</p>
<p>Token 消耗量降低——智能体无需重新推导先前会话中已经确立的事实。削减幅度与工作流中包含的重复上下文规模成正比。</p>
<p>延迟轻微增加——每次记忆召回都会增加一次 S3 Vectors 查询（在标准访问模式下为亚秒级），通常仅占 LLM 总体推理时间的一小部分。</p>
<p>重复工作减少——通过共享记忆，智能体可以避免重复团队成员已经完成的调研或分析。</p>
<p>这些影响的显著程度取决于你的具体工作负载：跨会话复用的上下文数量、协同工作的智能体数量，以及检索预算（top-k）的大小。NAT 的超参数优化器能够系统性地调优 top_k 和相似度阈值，从而为你的用例找到最佳的成本与质量权衡点。</p>
<p>为避免本教程中创建的资源产生持续费用，请删除以下内容：</p>
<p>删除 Amazon EKS Deployment 及相关资源：<br />kubectl delete namespace agent-team</p>
<p>删除 S3 Vectors 索引和向量存储桶：</p>
<p>s3vectors.delete_index(vectorBucketName=&#39;amzn-s3-demo-research-agent-memory&#39;, indexName=&#39;agent-long-term-memory&#39;) s3vectors.delete_vector_bucket(vectorBucketName=&#39;amzn-s3-demo-research-agent-memory&#39;)<br />如果不再需要，请删除为 IRSA 创建的 IAM 角色和策略。<br />本文展示了如何实现由 Amazon S3 Vectors 支持的自定义 NAT 记忆提供程序，并将其部署在 Amazon EKS 上。核心构建组件包括：<br />NAT 的 MemoryEditor 接口为自定义记忆后端提供了插件契约。<br />auto_memory_agent 包装器自动处理信息的捕获与检索。<br />Amazon S3 Vectors 提供了具备强一致性、持久且支持语义查询的后端，用于多智能体协作。<br />Amazon EKS 为您提供对智能体生命周期、弹性伸缩和网络隔离的完整运维控制权。<br />这些模式适用于智能体可从积累的知识中获益的各类领域。具体做法包括将记忆划分为情境记忆（episodic）、语义记忆（semantic）或程序记忆（procedural），利用元数据过滤跨智能体共享记忆，以及使用大语言模型（LLM）进行记忆整合。典型应用场景包括客户支持、DevOps 自动化、法律检索以及科学探索等。<br />有关本文所引用的记忆架构基础，请参阅《利用 Amazon S3 Vectors 为多智能体 AI 系统构建持久记忆》（Building persistent memory for multi-agent AI systems with Amazon S3 Vectors）。如需开始使用 NAT，请参阅 NVIDIA NeMo Agent Toolkit 文档以及《添加记忆提供程序》（Adding a Memory Provider）指南。<br />Venkata 是 AWS 的高级专业解决方案架构师，在云架构领域拥有超过 12 年的丰富经验。他专长于跨多个行业领域设计和实施企业级 AI/ML 平台，专注于构建高度可扩展的基础设施，以加速机器学习项目的落地并交付可衡量的业务成果。</p></div>

<div class="news-card-takeaways">
  <div class="takeaways-header">💡 核心研判与各方动向</div>
  <ul class="takeaways-list">
    <li>权威信源【AWS Machine Learning Blog (亚马逊云科技官方英文)】于 2026-10-02 01:34 发布，当前内容状态：已取得正文证据</li>
    <li>来源叙事与事实证据分开记录；若官方页面未公开完整正文，不以模板化内容替代。</li>
  </ul>
</div>

<div class="news-card-tags">
  <span class="news-tag-pill">#前沿智能</span>
  <span class="news-tag-pill">#AWS</span>
</div>

<div class="news-card-footer"><a href="https://aws.amazon.com/blogs/machine-learning/build-agent-memory-with-nvidia-nemo-agent-toolkit-and-amazon-s3-vectors/" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【AWS Machine Learning Blog (亚马逊云科技官方英文)】官方出处原文 ↗</a></div>
:::

::::