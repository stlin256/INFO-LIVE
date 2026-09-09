# 26：新闻叙事可视化组件与多端动效（规格）

> 状态：第一轮已实现，规格与实现映射已同步（2026-09-09）。
> 范围：Markdown 自定义指令、静态 HTML 语义结构、CSS 动画、移动端适配、无障碍与 reduced-motion。
> 约束：零新增运行时依赖；组件必须在无 JavaScript 时仍可读；不引入自动播放、强制横向滚动或遮挡正文的交互。

## 1. 用户目标

新闻不只需要卡片和时间线，还需要用结构化组件呈现：

- 事件如何发生、升级、转折和收束；
- 价值链、供应链、利益链条如何传导；
- 信号如何从事实进入影响，再进入行动；
- 不同来源、阵营和结论如何并列比较；
- 一个事件对市场、社会、技术、治理等维度的影响强弱。

组件需要具备杂志化视觉节奏、进入视口的轻动效、窄屏可读性和无障碍降级。

## 2. 组件清单

### 2.1 事件链 `event-chain`

```markdown
::::event-chain{title="事件链" intro="从触发到后续观察"}
:::event-node{step="1" phase="trigger" date="09-09 08:30" title="触发" tone="warning"}
事件背景与第一条已确认事实。
:::
:::event-node{step="2" phase="response" date="09-09 11:00" title="回应" tone="accent"}
主要利益相关方作出回应。
:::
:::event-node{step="3" phase="next" date="待观察" title="下一节点" tone="muted"}
需要继续跟踪的验证点。
:::
::::
```

语义：`section > ol > li`，节点按时间/步骤排列，连接线只做装饰；移动端改为纵向轨道，桌面端可采用交替布局但不改变 DOM 顺序。

### 2.2 价值链 `value-chain`

```markdown
::::value-chain{title="价值链传导" unit="影响路径"}
:::value-node{index="1" label="原料" metric="供给收缩" tone="risk"}
资源端变化。
:::
:::value-node{index="2" label="制造" metric="成本上升" tone="warning"}
制造环节的传导。
:::
:::value-node{index="3" label="终端" metric="价格重估" tone="accent"}
终端市场变化。
:::
::::
```

语义：`section > ol > li`，节点之间显示箭头/连接器；窄屏变为可换行的纵向链路；长标签不能撑破视口。

### 2.3 信号流 `signal-flow`

```markdown
::::signal-flow{title="信号 → 影响 → 行动"}
:::signal-node{kind="signal" label="事实信号" value="官方声明"}
来源提供的可核验证据。
:::
:::signal-node{kind="impact" label="影响" value="航运保险上升"}
一阶或二阶影响，必须与事实分开。
:::
:::signal-node{kind="action" label="行动" value="政策回应"}
利益相关方的实际行动。
:::
::::
```

语义：`section > ol > li`，kind 用于视觉色彩与筛选样式，不依赖 JS。

### 2.4 对照矩阵 `compare-grid`

```markdown
::::compare-grid{title="来源叙事对照" caption="事实相同，重点不同"}
:::compare-column{label="共识" tone="consensus"}
共同确认的事实。
:::
:::compare-column{label="分歧" tone="tension"}
不同来源的叙事差异。
:::
:::compare-column{label="盲区" tone="blindspot"}
尚未被公开证据覆盖的部分。
:::
::::
```

语义：`section > div[role=list] > article[role=listitem]`，桌面多列，平板两列，手机单列；不把颜色作为唯一信息。

### 2.5 影响谱 `impact-spectrum`

```markdown
::::impact-spectrum{title="影响谱" scale="1-5"}
:::impact-item{label="市场" score="4" direction="up"}
资本定价与流动性影响。
:::
:::impact-item{label="社会" score="3" direction="mixed"}
公众情绪与分配影响。
:::
:::impact-item{label="治理" score="5" direction="risk"}
政策和监管影响。
:::
::::
```

语义：`section > ul > li`，分数同时显示数字与文本标签，支持 `up/down/mixed/risk/neutral`，禁止仅用颜色表达方向。

## 3. 统一渲染契约

- 所有组件都通过 `remarkCustomDirectives` 生成静态语义 HTML；正文内容继续由 Markdown 管线解析；
- 缺少必需属性时，生产模式保留原始指令文本，编辑模式显示既有占位卡；
- 文本属性必须经过现有 HAST 转义；URL 属性只能使用 `safeTimelineUrl` 同等级安全策略；
- 不从组件内部执行网络请求、不写 localStorage、不依赖第三方 JS；
- 现有 `timeline` 保持完全兼容，新组件不可修改旧组件输出。

## 4. 动效与多端适配

- 使用 `opacity`、`transform`、伪元素和 CSS custom properties，避免布局抖动；
- 组件容器沿用 `.reveal`，节点用 `--delay` 做 40–70ms 的 stagger；
- `prefers-reduced-motion: reduce` 下取消位移、交错和连接线动画，保留静态颜色和顺序；
- 桌面端：链路横向展开或交替排版；
- 平板端：减少列数、取消交替偏移；
- 手机端：全部单列、连接线置于左侧、内容可折行，触控目标不小于 44px；
- 组件不能依赖 hover 才能看到核心内容；
- 长标题、长 URL、阿拉伯语/俄语/中文混排必须 `overflow-wrap:anywhere`。

## 5. 无障碍与性能

- 事件链、价值链、信号流用有序列表传达顺序；
- 对照矩阵用 list/listitem 角色；
- 每个 score 同时输出可见数字或文本；
- 不用纯颜色区分 tone/kind/direction；
- 所有装饰连接器 `aria-hidden="true"`；
- 首屏不强制等待组件动画，静态 HTML 先可见；
- 不新增脚本；CSS 动画只在 `.revealed` 后启动，避免影响 LCP；
- 现有构建、Markdown、编辑模式和搜索索引不受影响。

## 6. 测试与验收

新增测试覆盖：

- 每个容器和节点的语义标签、属性、顺序；
- 缺少必需属性时的降级；
- HTML 属性转义；
- score/direction/kind 非法值的安全回退；
- 现有 timeline 回归；
- CSS 包含移动端断点、reduced-motion、`overflow-wrap`、stagger 动效；
- build 通过且无空白页面。

## 7. 开发前自审结论

- [x] 不用 JS 也能阅读全部核心内容；
- [x] 动效只增强层次，不隐藏事实；
- [x] 移动端不会产生不可滚动的横向溢出；
- [x] 顺序由 HTML 列表表达，屏幕阅读器可理解；
- [x] 颜色不承担唯一语义；
- [x] 与旧 timeline/grid/card 兼容；
- [x] 失败降级为原文，不生成空白；
- [x] 零新增依赖和外部请求；
- [x] 可以用现有 Vitest + Astro build 验证。

**结论：第一轮实现完成。** 五类静态组件已落地，不引入复杂客户端状态；后续可再增加组件专属折叠、焦点联动和数据可视化。

## 8. 实现映射与复核结果

- Markdown 指令与必填参数校验：`src/lib/markdown/directives.ts`；非法子指令保留原文。
- HAST 语义结构、标题提取、节点序号、方向/语气安全回退：`src/lib/markdown/decorations.ts`。
- 编辑器递归识别：`src/lib/edit-blocks.ts`。
- 杂志化卡片、轨道、连接器、强度条、交错进入动效、平板/手机断点：`src/styles/markdown-body.css`。
- 回归测试：`tests/news-components.test.ts`，覆盖五类组件、非法 score 降级和编辑器块枚举。

复核结论：组件核心内容在静态 HTML 中可读；没有合法节点的容器不会生成空列表或空白组件壳；`prefers-reduced-motion: reduce` 下取消动画并恢复可见；窄屏下价值链、信号流、对照矩阵降为单列，文本使用 `overflow-wrap:anywhere` 防止溢出。
