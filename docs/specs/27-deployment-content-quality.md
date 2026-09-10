# 27：Actions 部署内容质量门禁与正文完整性

> 状态：审查后实施规格（2026-09-09）。
> 目标：阻止“Actions 成功但线上只显示标题/梗概”的假成功部署；只有正文证据充分、页面非空、链接可用时才发布到 GitHub Pages。

## 1. 审查结论

对线上 `https://stlin256.github.io/INFO-LIVE/` 与最近一次 Actions 产物核验发现：

- Pages 与 Actions 状态均显示成功，但现有构建门禁只检查 `dist/index.html` 存在且包含 `<html`，没有检查文章正文质量；
- 抓取器已声明 `fetchArticleBody()`，但原流程没有在 RSS 摘要过短时调用它；
- 部分 RSS 只提供一段摘要，译者只能忠实翻译摘要，页面因而出现“只有梗概”；
- 本地合成模式曾用模板化宏观段落填充正文，会造成“看似很长但不是原文内容”的假正文；
- 线上卡片数量、频道存在性与页面可读性没有自动化验收报告。

## 2. 设计原则

1. RSS 是发现层，不是正文层；摘要过短时必须尝试访问对应信源的官方原语言文章页。
2. 正文抓取、翻译和写入必须携带 `contentStatus`、`contentSource`、字符数、段落数等证据元数据。
3. LLM 只能翻译和编排已采集证据；不能用泛化模板伪造缺失事实。
4. 核心卡片正文不满足最低门槛时，Actions 失败并保留上一版 Pages，不发布“空壳成功”。
5. 线上验证必须同时检查构建产物、部署分支和真实 Pages URL。

## 3. 质量契约

- `fullContent`：官方 RSS 正文或官方文章页抽取的原语言正文；当 RSS 仅有单段短摘要时，必须回源官方原语言页面补抓。
- `fullTranslation`：目标语言译文；至少 1 个正文段落且不少于 240 个字符，除非原文自身被明确标记为短公告。
- `contentStatus`：`full`、`short-source`、`missing`；`full` 至少满足 320 字符且包含两个正文段落，或为 800 字符以上的单段官方公告。
- `contentSource`：`rss` 或 `official-page`。
- `short-source` 只能展示为“官方原文仅提供短讯/摘要”，不能标记为全篇深度编译。
- 核心首页文章卡片至少 8 篇通过正文门禁；所有频道页文章卡均必须通过正文门禁。卡片必须携带 `data-content-*`、`data-published-at` 与 `data-time-source="publication"` 元数据。

## 4. Actions 门禁

新增 `scripts/verify-content.mjs`，在 Astro build 前检查 data/pages，在 Pages 发布后由 workflow 下载真实首页复核。检查包括：页面数量、文章卡数量、正文段落长度、内容状态元数据、内部锚点可达性、禁止模板化空壳、禁止“全篇”文案与短正文同时出现。

Actions 失败时必须在日志中输出失败文章、来源、URL、正文字符数、段落数和建议动作。

## 5. 测试计划

- 抓取器：摘要短时调用官方页面、抽取正文、过滤导航/订阅噪声、失败可降级；
- 质量门禁：正常内容通过、梗概卡片失败、缺页失败、模板化占位文本失败；
- 线上验收：下载 Pages 首页并检查文章卡数量、正文字符数、更新时间和资源引用；
- 全量门禁：lint、check、test、coverage、build、E2E。

## 6. 实施映射

- `scripts/fetcher.mjs`：官方页面正文补抓与内容状态；
- `scripts/ai-summarizer.mjs`：正文证据传递，移除伪造式本地全文模板，翻译结果质量校验；
- `scripts/site-writer.mjs`：正文状态展示与结构化元数据；
- `scripts/verify-content.mjs`：构建前/部署后质量门禁；
- `.github/workflows/hourly-feed.yml`：构建前和 Pages 发布后验证；
- `tests/*`：单元测试与回归测试。

**审查结论：先修正“正文证据链 + 发布门禁”，再继续扩充视觉组件。**

## 7. 降级策略

无 AI 配置或主模型与备用模型均不可用时，只允许输出带来源状态的原文证据摘要，不得写入模板化“深度全文”。由于发布门禁要求核心卡片完成目标语言翻译，该轮构建应失败并保留上一版 Pages；已抓取数据在通过验证前不得提交到主分支。

## 8. 第二轮部署审查补充（2026-09-09）

本轮对 Actions run `34414342571`、排队中的定时运行以及本地 `dist/` 产物复核后，追加以下门禁：

- **发布时间排序**：禁止用 `MM-DD HH:mm` 字符串排序；抓取器保存规范化 `publishedAt`、`publishedAtMs`，按真实发布时间数值倒序。生成时间 `generatedAt` 保持真实 UTC ISO 时间，展示层再转换为 Asia/Shanghai。
- **可发布边界**：RSS/官方页正文未通过 `contentStatus=full`，或译文未通过 `translationStatus=full`、字符数/段落数门槛的文章，只能进入快讯流与历史证据，不进入声称“全篇”的文章卡片。若可发布卡片不足，构建门禁失败，不借调摘要伪装填充。
- **局部 LLM 调度**：仅对已有官方正文证据的文章创建 translator task；译者按文章分块并行，宏观编辑只接收有限目录 Context Pack。Actions 使用有界并发（默认 8，总翻译并发 4），避免把全部 RSS 内容一次性喂给单个模型。
- **部署 base 路径**：所有由 feed writer 写入的原始 HTML 资源与专题链接必须携带 GitHub Pages base（如 `/INFO-LIVE/`）；远程验收检查 `src`/`href` 是否遗漏该前缀。
- **永久历史可查**：`data/history/archive.json` 与 `data/history/daily/YYYY-MM-DD.json` 永久追加；构建器同时为每个日期生成 `archive-YYYY-MM-DD.md` 静态搜索页，主归档页只作为日期索引与最近快照摘要，不再把 48 条限制当作全量历史。
- **部署身份绑定**：完整构建后写入 `dist/deploy-manifest.json`，记录本次 commit/run/feed identity 与 HTML content hash；Pages 远程验收必须匹配本次 build identity，避免把旧 CDN 页面误认为本轮成功。
- **降级诚实性**：确定性标题回退不再生成“国际要闻关注”等泛化标题；无法可靠翻译时保留官方原始标题，并由可发布边界阻止其进入全篇卡片。
- **RSS 正文证据分类**：RSS `description`/`summary` 默认标记为 `rss-summary`，即使字符较长也不能直接升级为 `full`；只有富正文 RSS (`rss-body`) 或官方文章页 (`official-page-body`) 才可进入译文与发布候选。
- **上下文 lineage**：翻译分块必须保留 `chunkIndex/chunkCount`，并把 Harness 的取消信号传入底层请求；任务内部负责主模型/备用模型切换时，Harness 只对主模型执行一次，避免双重重试放大请求。
- **专家 DAG 依赖**：`fact-extractor` 完成后，`source-positioner` 与 `topic-classifier` 才能运行，并通过依赖输出获得事实证据；宏观 Agent 对结构化结果执行角色级 schema 与安全字段校验，非法结果自动走备用模型或降级。
- **模型预算**：每轮设置 `AI_MAX_TOTAL_CALLS` 与 `AI_MAX_FALLBACK_CALLS` 硬上限，长文分块受正文最大长度约束，预算耗尽只能产生可解释的降级状态，不得无限重试。
- **故障转移超时**：Harness 的 task timeout 必须覆盖“主模型一次请求 + 备用模型一次请求”，不能在主模型超时的同一秒取消备用模型；底层每次 HTTP 请求仍有独立 timeout，避免泄漏请求。
- **信源健康**：每轮记录 sourceId、官方 URL、成功/失败、条数、错误、检查时间与最近成功时间，并在“信源矩阵”和历史 JSON 中保留，便于定位某一小时的空白来源。
- **原子持久化**：`archive.json`、`daily/*.json`、按日 Markdown 和 `feed-data.json` 先写临时文件后替换，Actions 中断不会把历史库截断为半个 JSON。

验收顺序固定为：`npm run lint` → `npm run check` → `npm run test:coverage` → `npm run build` → `npm run verify:content` → 远程五路线与 base 路径验收；Actions 任何一步失败都不得触发 Pages 发布。
