# InfoLive (全球情报矩阵)

> **InfoLive** 是一个全自动、AI 驱动的全球全源信息流与实时要闻矩阵平台。
> 底层前端框架由 [OpenHomepage V2](https://github.com/stlin256/OpenHomepage-V2) 驱动，遵循极简、优雅的静态杂志化设计美学。

---

## 🌟 项目亮点

1. **⚡ 全球全源超大信息量实时抓取**
   - 涵盖 55+ 全球多领域权威信源：主流通讯社与官方媒体（新华社、俄新社、卫星通讯社、法新社、BBC、CNN、FOX、ANSA、TASS、NPR）、国际组织与政策机构（联合国、世卫组织、欧洲央行、美联储）、前沿科技与 AI 顶级社区（Hacker News、The Verge、TechCrunch、OpenAI、DeepMind、Hugging Face、MIT Tech Review）、商业金融（WSJ、CNBC、Financial Times、MarketWatch）、开发者与思想论坛（Reddit、Lobste.rs）以及前沿科学与航天（Nature、Science、NASA、ESA、Phys.org）。
   - 兼收并蓄，包容一切立场与多元视角，提供真正的全球全景洞察。

2. **🧠 纯正 AI 内化深度总结（非简单外链聚合）**
   - 采用可配置的主模型与 `gpt-5.6-luna` 备用模型：主模型请求失败、超时或返回无效 JSON 时自动切换，执行中文内化翻译与情报提炼。
   - **每小时要闻速报**：提炼当前小时全球核心宏观信号与关键动态。
   - **重大事件脉络追踪（Timeline）**：结构化呈现跨周期的事件最新进展、背景脉络与后续研判。
   - **全景要闻深度拆解（Cards）**：150~200 字背景深度还原 + 核心研判要点 + 真实来源追溯。
   - **秒级快讯流（Ticker）**：一目了然的时间轴滚动速览。

3. **🎨 精致预制媒体品牌徽标（SVG Vector Badges）**
   - 为 42 个世界媒体、国际组织与政策机构手工打造矢量 SVG 徽标，并在渲染引擎中智能规范化对齐，保证视觉呈现极致专业。

4. **🔄 GitHub Actions 24/7 全自动小时级闭环**
   - 每小时定时触发（`0 * * * *`），自动化完成：信源并发拉取 -> AI 提炼与页面重写 -> Git 增量安全提交 -> 静态编译与资源压缩 -> 部署至 GitHub Pages。
   - 纯静态生成（Astro SSG），加载极快，零运维成本，天然抵御高并发流量。

5. **🔐 极客级凭据安全体系**
   - AI 凭据与模型配置严禁写入仓库代码，全部安全托管于 GitHub Repository Secrets；主模型使用 `AI_MODEL`，备用模型可用 `AI_FALLBACK_MODEL` 覆盖，默认值为 `gpt-5.6-luna`。

---

## 🗺️ 矩阵板块规划

- **主页 / 全球情报矩阵**：当前小时全球宏观速报、跨领域重大事件追踪、核心全景深度卡片、快讯流。
- **AI与前沿科技**：聚焦前沿大模型范式、智能体架构、开源生态与顶会论文。
- **全球政经与时事**：国际地缘博弈、全球大选与宏观政经风云。
- **商业金融**：全球资本流动、汇率异动、大宗商品与半导体供应链监控。
- **信源矩阵**：全透明列出监控的全球 55+ 信源分布、官方语言、分类与品牌徽标注册表。
- **关于项目**：InfoLive 架构设计原理与技术说明。

---

## 🛠️ 技术栈与架构

- **核心驱动**：[OpenHomepage V2](https://github.com/stlin256/OpenHomepage-V2)（Astro + TypeScript + Vite + Sharp）
- **InfoLive 品牌系统**：独立项目 Logo、雷达式 favicon、42 个信源徽标，以及支持宽色域 HDR 高光的页脚 Logo。
- **AI 智能中枢**：可配置主模型 + `gpt-5.6-luna` 自动故障转移（OpenAI-compatible protocol）
- **多源数据管线**：Node.js 24 + Undici + RSS-Parser + 智能容错并发队列
- **CI/CD & 托管**：GitHub Actions + GitHub Pages

---

## 🚀 本地运行与开发

```bash
# 安装依赖
npm install

# 本地抓取并执行 AI 深度分析（需要设置环境变量）
export AI_API_KEY="your_api_key"
export AI_FALLBACK_MODEL="gpt-5.6-luna"
export AI_MODEL="gemini-3.8-flash"
npm run feed

# 启动本地实时预览
npm run dev

# 静态打包编译
npm run build
```

---

## 📄 版权与致谢

- 本项目由 **InfoLive** 架构团队自主研发与改写。
- 页面底层杂志化排版布局前端框架由 [OpenHomepage V2](https://github.com/stlin256/OpenHomepage-V2) 驱动；InfoLive 的项目 Logo、favicon、信源徽标与 HDR 页脚品牌展示均为本项目独立设计。
