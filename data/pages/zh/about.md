---
title: "关于项目"
nav: true
order: 6
description: "InfoLive 架构设计、开源代码仓库与自动化工作流说明"
---

# ℹ️ 关于 InfoLive 全球情报矩阵

**InfoLive** 是一个开源、全自动、由前沿大模型驱动的全球全源信息流与实时要闻矩阵平台。

:::tip{title="🚀 官方开源代码仓库"}
**GitHub 仓库地址**：[https://github.com/stlin256/INFO-LIVE](https://github.com/stlin256/INFO-LIVE)

欢迎访问我们的官方 GitHub 仓库，给项目点亮 🌟 Star、提交 Issue 反馈或发起 Pull Request 协作共建！
:::

## 🏗️ 核心设计哲学
- **全篇全量深度编译**：拒绝简单的单句搬运或仅贴外链。平台利用前沿大模型将全球多语种一手新闻全量翻译编译为高质量中文，图文并茂，深入交代事实原委、地缘背景与核心研判。
- **真实新闻发布时间标记**：新闻卡片与快讯流一律标注新闻本身的真实发布时间（`pubTime`），而非本系统的调度抓取时间，严谨保障情报的时间序列真实度。
- **日尺度与时尺度双重视角**：既有时尺度的秒级要闻与突发演进追踪，又有日尺度的 24 小时全球宏观大势与底层结构性转变深度复盘。
- **全球立场罗生门与多元跨源对照**：全面引入**新华社、俄罗斯卫星通讯社、France 24（法新社合作伙伴）、CNN、FOX News、BBC、半岛电视台**等，展示重大博弈中不同立场的叙事重点与定调差异。
- **永久持久化历史回溯**：历史快照与要闻简报永久存储在仓库中，支持按日期和关键词通过静态全文搜索（<kbd>Ctrl+K</kbd>）随时毫秒级查阅。
- **24/7 全自动无人值守**：基于 GitHub Actions 自动化调度与静态网站生成技术，实现每小时自动抓取、智能提炼、自动构建与全球 CDN 部署。

## 🛠️ 本地运行与开发

```bash
# 1. 克隆代码仓库
git clone https://github.com/stlin256/INFO-LIVE.git
cd INFO-LIVE

# 2. 安装依赖
npm install

# 3. 运行本地开发服务器
npm run dev

# 4. 手动触发一次情报抓取与 AI 提炼
node scripts/feed-engine.mjs

# 5. 构建全量静态网站
npm run build
```

## 🤝 开源致谢与底层驱动
- **前端框架**：基于开源项目 [OpenHomepage V2](https://github.com/stlin256/OpenHomepage-V2) 驱动，遵循极简、优雅的静态杂志化设计规范。
- **智能模型**：接入 Gemini 3.8 Flash 前沿大语言模型进行跨语言深度编译与结构化综合研判。
- **代码授权**：本项目采用 [MIT License](https://github.com/stlin256/INFO-LIVE/blob/master/LICENSE) 协议开源。