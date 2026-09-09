---
title: "关于项目"
nav: true
order: 5
description: "InfoLive 架构设计、全自动化工作流与技术栈说明"
---

# InfoLive 全球全源信息流与 AI 实时要闻矩阵

**InfoLive** 是一个追求极致信息密度与深度洞察的开源情报流系统。

传统聚合器往往只列出一串标题与超链接，信息获取极其碎片化；而 **InfoLive** 坚持 **内容写入，而非仅给链接**：

1. **极大信息量抓取**：覆盖世界主流通讯社（BBC、路透社、美联社、联合早报等）、顶级AI科技社区（Hacker News、OpenAI、DeepMind、Hugging Face、ArXiv）、宏观金融（CNBC、WSJ）以及学术科学期刊（Nature、Science、NASA）。
2. **AI 内部深度总结**：接入 **Gemini 3.8 Flash** 模型，以专业情报分析师视角对新闻进行客观去重、内化翻译与背景提炼，每条均给出百余字事实背景剖析与 2 条核心研判。
3. **小时更新与事件追踪**：每小时触发一次 GitHub Actions 工作流，提炼本小时全球速报，并以时间线持续追踪正在发酵演变的重大历史事件。
4. **前端框架驱动**：本项目前端框架由 [OpenHomepage V2](https://github.com/stlin256/OpenHomepage-V2) 驱动，具备高雅的杂志网格排版、极速静态生成与零延迟阅读体验。

:::note
**声明**：本站所有新闻内容由开源工作流自动抓取并经 AI 提炼，所有卡片均清晰标注原始信源与出处链接。
:::