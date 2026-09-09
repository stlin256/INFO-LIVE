# 25：AI 编排 Harness 与专家 Agent 调度框架（规格）

> 状态：已实现第一阶段（Harness、Context Pack、专家角色契约、专题持久化与总结器接入）。
> 适用范围：`scripts/feed-engine.mjs`、`scripts/ai-summarizer.mjs`、专题生命周期与小时级 Actions。
> 版本约束：本规格不要求升级 `package.json` 版本，不新增运行时依赖。

## 1. 背景与问题

当前 InfoLive 已具备多信源抓取、中文标题翻译、深度编译、日尺度摘要、立场矩阵、社会热点与专题生命周期，但 AI 编排仍由一个总结器承担：宏观请求与文章微批次之间缺少明确的角色边界，微批次串行执行，原始文章和历史上下文没有统一的可裁剪上下文包，单个模型请求失败也只能在调用层降级。

由此产生的风险：

- 一次性把过多文章、全文和历史数据交给单次 LLM，输入膨胀、成本上升、重点被稀释；
- 翻译、事实抽取、来源对照、立场分析、主题分类和编辑写作相互污染，难以验证；
- 某个角色失败时缺少任务级隔离，不能只跳过该角色并复用其他结果；
- 每小时 Actions 之间只有文件级专题更新，没有统一的 run/context lineage，难以解释“本轮为何新增、更新或归档”；
- 并行度没有按模型调用预算管理，容易触发 API 速率限制；
- 结果缺少 schema、证据引用和新闻原始发布时间校验，容易出现空白页面或抓取时间冒充发布时间。

## 2. 目标

1. 引入一个**局部、可测试、无外部依赖的 Harness**，负责任务 DAG、依赖、并发限制、超时、重试、模型故障转移、状态和结果汇总。
2. 按最小必要上下文拆分专家角色：事实抽取、目标语言翻译、来源/立场对照、主题分类、媒体证据、专题生命周期、宏观摘要、日尺度分析、社会热点、编辑整合与质量门禁。
3. 同一篇文章的独立专家任务并行运行；跨文章的合并和编辑阶段严格串行或按批次运行。
4. 让每个小时运行产生可追溯的 `runId`、任务状态、输入/输出摘要和模型使用记录，并支持跨 Actions 继承专题上下文。
5. 在无 API Key、单角色失败、主模型失败、部分来源抓取失败时仍能生成非空且可发布的本地合成页面。
6. 保持原始标题、译后标题、来源官方语言、URL、图片、新闻发布时间和证据链；不把抓取时间写成新闻发布时间。
7. 将结构化结果写入现有历史目录，做到永久可查阅，并兼容已有 `archive.json`、`daily/*.json` 与 `topics-registry.json`。

## 3. 非目标

- 本期不实现远程 Agent 平台、消息队列、数据库或多机分布式调度；
- 不让 LLM 直接执行 shell、网络写入、Git、发布、删除或修改配置；
- 不把所有 RSS 全文原样发送给宏观编辑 Agent；
- 不改动现有前端路由、语言管理、About 仓库卡片和主题色实现；
- 不自动升级版本号或创建 release。

## 4. 总体架构

```text
fetch feeds
    │
    ▼
normalize + stable id + publishedAt validation
    │
    ▼
dedupe / light cluster / priority select
    │
    ├── article.fact       ─┐
    ├── article.translate  ─┤
    ├── article.position   ─┤  同一文章并行
    ├── article.topic      ─┤
    └── article.media      ─┘
             │
             ▼
      evidence.merge（结构化证据包）
             │
       ┌─────┼─────────────┐
       ▼     ▼             ▼
 hourly  daily/topic     social
 brief   analysis        trends
       \     |             /
             ▼
      editorial.qa
             │
             ▼
      site writer + archive
```

Harness 只负责“何时、以什么输入、以何种预算执行”；Agent 只负责“对输入作出结构化判断”；Site Writer 只负责“将通过门禁的数据写成 Markdown/JSON”。三层不得互相读写隐式全局状态。

## 5. Harness 责任边界

新增 `scripts/ai-harness.mjs`，提供纯逻辑优先的 API：

```js
runHarness({
  tasks,
  context,
  execute,
  maxConcurrency,
  defaultTimeoutMs,
  now,
}) => Promise<{ runId, tasks, outputs, metrics, degraded }>
```

任务结构至少包括：

```js
{
  id, role, dependsOn: [],
  inputKeys: [],
  optional: true,
  timeoutMs,
  retries,
  modelPolicy,
  validate(output),
  run(input, taskContext)
}
```

Harness 必须：

- 先进行 DAG 拓扑校验，拒绝重复 ID、未知依赖和环；
- 只在所有必需依赖成功后运行任务；可选依赖失败不阻断下游，但必须在 context 中标记 degraded；
- 全局并发上限 + 角色/模型预算上限；默认最大并发 4，避免 55 个信源直接产生无限模型请求；
- 每个任务独立超时、有限重试和状态机：`pending → running → succeeded | degraded | failed | skipped`；
- 通过 `requestJsonWithFallback` 或注入的 `execute` 实现主模型→备用模型切换；同一个任务不重复发送相同 payload；
- 任务失败隔离：文章 A 的 position 失败不影响文章 B 的 translate，也不阻断本地编译；
- 记录 `startedAt`、`finishedAt`、耗时、尝试次数、使用模型、输入/输出字符数和错误摘要；日志不得记录 API key 或全文隐私凭据；
- 只把结构化、经过大小限制的结果放入下游 context，禁止隐式传递上游的完整 prompt。

## 6. Agent 角色与输入输出

### 6.1 Article 专家组（可并行）

| role | 输入 | 必须输出 |
|---|---|---|
| `fact-extractor` | 标题、来源、发布时间、RSS 全文/摘要 | 事实列表、人物/机构、地点、数字、未证实项、证据片段 |
| `translator` | 原始标题、原始全文、目标语言 | `translatedTitle`、`originalTitle`、全文目标语言译文、翻译置信提示 |
| `source-positioner` | 文章元数据、事实包、来源注册信息、同簇摘要 | 来源角色、叙事重点、利益相关方、共识/分歧、盲区；不得把来源标签当作事实 |
| `topic-classifier` | 事实包、标题、分类候选 | 可扩展维度、标签、候选专题 slug、优先级 |
| `media-evidence` | 图片 URL、来源、文章元数据 | 可用图片、图片来源、媒体证据说明；失败不阻断 |

全文翻译必须分块：按文章段落切片，单块有字符预算，块间只继承术语表和文章 ID；不得把整站文章集合送入翻译任务。RSS 已有正文不足时，保留原文/摘要降级，不编造“全文事实”。

### 6.2 Cross-article 合并组

- `evidence-merger`：合并同一事件簇的事实、译文、来源观点和证据引用，去重冲突，输出简洁证据包；
- `hourly-editor`：只消费优先事件簇和证据包，输出本小时速报、信号和推荐文章；
- `daily-analyst`：只消费过去 24 小时聚合统计、已验证证据与上一日摘要，输出日尺度主线；
- `social-trends`：消费社区类事实包和热度指标，输出社会热点雷达与争鸣；
- `topic-lifecycle`：消费候选专题、证据增量、持久专题 dossier，决定 initiate/evolve/iterate/archive；
- `editorial-qa`：验证字段完整性、发布时间、原始标题、来源 URL、证据引用、字数、敏感断言与空结果，输出修复建议，不直接改原始证据。

## 7. Context Pack 与上下文管理

新增 `scripts/context-pack.mjs`，所有 Agent 只接收显式 Context Pack：

```js
{
  schemaVersion: 1,
  runId, taskId, role, generatedAt,
  targetLanguage: "zh",
  article: { id, title, originalTitle, source, sourceLang,
    publishedAt, publishedAtDisplay, url, snippet, fullContent, imageUrl },
  evidence: { facts, quotes, entities, conflicts, citations },
  relatedArticles: [{ id, title, source, publishedAt, url, excerpt }],
  topicContext: { slug, stage, updateCount, previousSummary, recentEvents },
  constraints: { maxInputChars, maxOutputChars, requiredFields },
  lineage: { parentTaskIds, sourceItemIds }
}
```

裁剪规则：

- 元数据优先，原文段落其次，重复/导航/订阅文本删除；
- 每个文章任务默认上限 12,000 字符，合并任务默认 28,000 字符，宏观编辑默认 20,000 字符；
- 历史专题只携带最近 8 条事件、最近 2 次摘要和计数，不携带无限全文；
- 相关信源每簇最多 8 篇，每篇只携带标题、发布时间、来源、URL 和不超过 600 字符证据摘录；
- 超限时按 `publishedAt desc → source weight desc → evidence score desc` 裁剪，并记录 `truncated=true`；
- 输出中始终保留 `originalTitle`、`sourceLang`、`publishedAt`、`url` 和 `citations`。

## 8. 跨 Actions 与专题生命周期

每次小时运行生成 `.cache/ai-runs/<runId>.json`（可重建的运行摘要）和持久历史快照。`runId` 使用 UTC 时间 + 稳定随机后缀，不能依赖本地抓取时间替代新闻发布时间。

专题 dossier 继续使用 `data/history/topics/topics-registry.json`，但扩展：

```js
{
  slug, stage, status, createdAt, lastUpdated, updateCount,
  lastRunId, previousRunIds: [],
  evidenceIds: [], relatedArticleUrls: [],
  facts: [], conflicts: [], stanceAnalysis: [],
  overview, keyJudgments, timeline: [],
  archiveReason, archivedAt
}
```

生命周期规则：

- `initiate`：首次达到主题阈值，记录首个 runId、首批证据和创建时间；
- `evolve`：有新的已验证事实或来源增量，追加 timeline/evidence，不覆盖历史；
- `iterate`：新证据改变结论或立场矩阵，保存变更摘要并更新当前判断；
- `archive`：连续若干运行没有新证据，转入 archived，但 dossier 永不删除；重新出现新证据时以 `reopen` 恢复并保留归档历史；
- 每次写入采用临时文件 + rename，避免 Actions 中断导致 JSON 为空；
- 旧 registry 缺字段时按默认值兼容，不破坏现有页面。

## 9. 模型策略、重试与降级

- 模型配置沿用 `AI_MODEL`，备用模型沿用 `AI_FALLBACK_MODEL`，默认备用为 `gpt-5.6-luna`；
- 主模型失败、超时、空响应、JSON 无效或 schema 校验失败，任务级切换备用模型；
- 每个任务最多 2 次尝试（主模型一次、备用模型一次），不做无限重试；HTTP 429/5xx 可在任务预算内短暂退避；
- 备用也失败：可选任务标记 degraded，使用本地规则或已有结果；必需的 evidence merge/QA 失败时使用安全本地合成，而非写空页面；
- Prompt 中禁止要求模型访问未提供的 URL；模型只能基于 Context Pack 证据写作，推断必须标记为推断；
- 所有输出通过 schema 校验和长度/来源校验后才进入 Writer。

## 10. 质量门禁

`editorial-qa` 至少检查：

1. 每篇文章有目标语言标题和原始标题；
2. `publishedAt` 来自 feed 的发布时间，缺失时显示“发布时间未知”，不得填当前抓取时间；
3. 来源、官方语言、URL、图片（若存在）可追溯；
4. 全文译文/编译不为空；没有把“线索”误标为已证实事实；
5. 观点与事实分离，来源立场不能作为事实结论；
6. 专题输出含证据增量和 run lineage；
7. 页面集合不为空，任何空分区都进入本地保底策略并记录 warning；
8. 原始输入及历史文件不被 LLM 覆盖。

## 11. 持久化、可观测性与历史查询

- `.cache/ai-runs/` 保存运行级诊断摘要，不作为唯一历史来源；
- `data/history/archive.json` 保持兼容并增加 `runId`、`taskMetrics`、`degradedRoles`；
- `data/history/daily/YYYY-MM-DD.json` 按日追加小时快照；
- 专题 registry 永久保存；文章快照至少保留标题、原始标题、来源、语言、发布时间、URL、图片、译文摘要、证据引用与所属专题；
- 日志格式带 `[Harness]`、runId、taskId、role，便于 Actions 查错；
- 运行摘要不能包含 API key、Authorization header 或未必要的敏感环境变量。

## 12. 兼容迁移方案

1. 第一阶段新增 Harness、Context Pack、Agent schema 和测试，不改变无 API Key 的本地合成结果；
2. 第二阶段把 `summarizeWithAI()` 的宏观请求和文章微批次迁移为 Harness 任务；保留 `partitionAndEnsureDesks()` 作为本地 fallback；
3. 第三阶段将 `topic-lifecycle` 接收结构化 topic dossier 增量，旧字段保持兼容；
4. 现有页面字段继续输出：`title`、`originalTitle`、`fullTranslation`、`source`、`sourceSlug`、`url`、`pubTime`、`imageUrl`、`keyTakeaways`；
5. 迁移期间任何新 Agent 失败都不得阻断构建、写历史或生成非空页面。

## 13. 测试计划

新增单测：

- `tests/ai-harness.test.ts`：拓扑排序、环检测、最大并发、超时、重试、依赖失败传播、可选任务隔离、指标；
- `tests/context-pack.test.ts`：裁剪预算、历史窗口、字段保留、敏感字段移除、truncated 标记；
- `tests/ai-agents.test.ts`：角色注册、最小输入、schema 校验、模型策略；
- `tests/topic-lifecycle.test.ts`：initiate/evolve/iterate/archive/reopen、原子写入和旧 registry 兼容；
- `tests/ai-orchestration.test.ts`：以假执行器验证文章专家并行、合并阶段等待依赖、主模型失败后备用模型、局部失败仍生成页面。

质量门禁继续执行：

```text
npm run lint
npm run check
npm run test:coverage
npm run build
```

## 14. 开发前自我审查清单与结论

- [x] 没有把全部 55 个来源和全文交给一次 LLM；改为文章级 Context Pack + 簇级合并；
- [x] 独立角色可并行，合并/编辑按依赖串行；
- [x] 单角色失败隔离，保留本地合成兜底；
- [x] 主模型/备用模型、超时、有限重试和 schema 门禁明确；
- [x] 新闻发布时间与运行/抓取时间分开；
- [x] 原始标题、目标语言标题、来源官方语言、URL、图片和证据链保留；
- [x] 专题跨 Actions 只追加/迭代，不覆盖历史，支持归档与重新打开；
- [x] 历史文件原子写入，避免空白 JSON/页面；
- [x] 上下文有每角色预算和历史窗口，不会无限增长；
- [x] 不新增依赖、不修改版本号、不让 LLM 执行外部副作用；
- [x] 测试可验证并行度和失败隔离，而不是只看日志。

**审查结论：可以进入第一阶段开发。** 第一阶段优先实现纯逻辑 Harness、Context Pack、Agent 注册/schema 与测试，再接入生产总结器；若接入后发现输出质量下降，必须回滚到现有 `partitionAndEnsureDesks()` 本地合成，不得写入空内容。


## 15. 第一阶段落地映射

- `scripts/ai-harness.mjs`：纯逻辑 DAG Harness，提供拓扑校验、全局/角色/模型并发限制、超时、有限重试、依赖失败隔离、运行指标与错误脱敏。
- `scripts/context-pack.mjs`：文章级、相关信源级和专题级 Context Pack，按角色预算裁剪并保留溯源字段。
- `scripts/ai-agents.mjs`：11 个专家角色注册表、输入/输出契约、通用结果校验和安全字段检查。
- `scripts/ai-summarizer.mjs`：接入文章专家并行任务、小时/日尺度/社会热点并行编辑任务和证据合并任务；无 API Key 时继续使用原有本地合成兜底。
- `scripts/topic-lifecycle.mjs`：兼容旧 registry，增加 run lineage、证据增量、原子写入、连续无证据归档和新证据 reopen。
- `scripts/site-writer.mjs`：历史快照增加 runId、任务指标、降级角色、文章全文/译文/证据引用，并写入 `.cache/ai-runs/`。

第一阶段仍刻意将高成本的全站聚类与完整 55+ 信源逐篇专家化留在后续迭代：当前默认对首页优先文章运行四类文章专家（可通过 `AI_ARTICLE_LIMIT` 调整，默认 8 篇），宏观角色只接受受限目录/摘要，从而先建立可验证的调度骨架，避免在 GitHub Actions 上造成无界请求。
