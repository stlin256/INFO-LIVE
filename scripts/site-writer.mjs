/**
 * InfoLive 页面渲染、多维度编译、动态专题生成与全景内容写入引擎
 * 严格支持：
 * 1. 标题中文全量翻译，并优雅保留原始外文标题（originalTitle）
 * 2. 杂志化快讯流（Live Wire Grid），cleanUrl + 新窗口安全打开
 * 3. 跨 Actions 话题生命周期管理（开始、更新、迭代、归档）
 * 4. 频道工作台坚实保障，商业金融（markets.md）等全频道 100% 丰富填充，绝无空白
 * 5. About 页面规范化使用 ::ghcard{repo="stlin256/INFO-LIVE"} 真实仓库卡片
 */
import fs from 'node:fs';
import path from 'node:path';
import { getBeijingTime, cleanUrl, isChineseReadableText, isLikelyTruncatedBody } from './fetcher.mjs';
import { SOURCES } from './sources.mjs';
import { evolveTopics } from './topic-lifecycle.mjs';
import { storyIdForUrl } from './story-id.mjs';

const PUBLISHABLE_TRANSLATION_MIN_CHARS = 240;

function isHeadlinePlaceholder(text) {
  return /外文(?:信源)?标题(?:正在进行中文翻译|尚未完成中文翻译)/u.test(String(text || ''));
}

function hasUntranslatedForeignPhrase(text) {
  return /[\u0400-\u04ff\u0600-\u06ff\u0370-\u03ff]/u.test(String(text || ''));
}

function safeChineseEditorialText(text, fallback = '外文信号正在进行中文翻译，暂不展示未翻译内容。') {
  const value = String(text || '').replace(/\s+/g, ' ').trim();
  const foreignScript = hasUntranslatedForeignPhrase(value);
  const chinese = (value.match(/[\u3400-\u4dbf\u4e00-\u9fff]/gu) || []).length;
  const visible = (value.match(/[\p{L}\p{N}]/gu) || []).length;
  if (!value || foreignScript || isHeadlinePlaceholder(value) || chinese < 2 || (visible > 0 && chinese / visible < 0.45)) return fallback;
  return value;
}

function hasReadableChineseTitle(story) {
  const title = String(story?.title || '').trim();
  return !isHeadlinePlaceholder(title)
    && !hasUntranslatedForeignPhrase(title)
    && isChineseReadableText(title, { minChars: 2, minRatio: 0.30 });
}

function hasReadableChineseBody(story) {
  return isChineseReadableText(story?.fullTranslation, { minChars: 40, minRatio: 0.16 });
}

function articleBodyForDisplay(story) {
  const value = story && typeof story === 'object' ? story : {};
  const translation = String(value.fullTranslation || '').trim();
  const sourceLang = String(value.sourceLang || '').toLowerCase();
  const complete = value.translationStatus === 'full'
    && translation.length >= PUBLISHABLE_TRANSLATION_MIN_CHARS
    && !isLikelyTruncatedBody(translation)
    && !/(?:阅读|查看|参见|请前往).{0,24}(?:全文|原文|完整报道)/i.test(translation)
    && hasReadableChineseBody(value);
  if (complete) return translation;
  if (sourceLang === 'zh') {
    const local = String(value.snippet || '').trim();
    return isChineseReadableText(local, { minChars: 2, minRatio: 0.45 })
      ? local
      : '【官方未提供可展示的中文正文证据，暂不生成未经证实的替代内容。】';
  }
  return value.contentStatus === 'full'
    ? '【官方正文已获取，中文全文翻译尚未完成；暂不展示外文正文。】'
    : '【官方仅提供短讯或摘要，中文全文翻译尚未完成；暂不展示外文摘要。】';
}


function writeFileAtomic(file, content) {
  const tempFile = `${file}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tempFile, content, 'utf8');
  try {
    fs.renameSync(tempFile, file);
  } catch (error) {
    // POSIX rename replaces atomically. Windows refuses to replace an existing
    // file, so remove only the known destination and retry the rename.
    if (!fs.existsSync(file)) throw error;
    fs.rmSync(file, { force: true });
    fs.renameSync(tempFile, file);
  } finally {
    if (fs.existsSync(tempFile)) {
      try { fs.rmSync(tempFile, { force: true }); } catch { /* keep original error */ }
    }
  }
}

function writeJsonAtomic(file, value) {
  writeFileAtomic(file, `${JSON.stringify(value, null, 2)}\n`);
}

function siteBasePath() {
  const configured = process.env.ASTRO_BASE
    || (process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY
      ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
      : '/');
  const value = String(configured || '/');
  const trimmed = value.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

function sitePath(relativePath) {
  const normalized = String(relativePath || '').replace(/^\/+/, '');
  return `${siteBasePath()}${normalized}`.replace(/\/{2,}/g, '/');
}

export function isPublishableArticle(story) {
  const value = story && typeof story === 'object' ? story : {};
  const translation = String(value.fullTranslation || '').trim();
  const paragraphs = Number(value.translationParagraphs)
    || translation.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean).length;
  return value.contentStatus === 'full'
    && value.translationStatus === 'full'
    && translation.length >= PUBLISHABLE_TRANSLATION_MIN_CHARS
    && paragraphs >= 1
    && !isLikelyTruncatedBody(translation)
    && !/(?:阅读|查看|参见|请前往).{0,24}(?:全文|原文|完整报道)/i.test(translation)
    && hasReadableChineseTitle(value)
    && hasReadableChineseBody(value)
    && /^https?:\/\//i.test(String(value.url || ''));
}

export function selectPublishableStories(stories = [], limit = Infinity) {
  const unique = new Map();
  for (const story of Array.isArray(stories) ? stories : []) {
    if (!isPublishableArticle(story)) continue;
    const key = cleanUrl(story.url) || story.id || story.title;
    if (!unique.has(key)) unique.set(key, story);
  }
  return [...unique.values()].slice(0, limit);
}

export function resolveSourceSlug(sourceName, sourceSlug) {
  const s = (sourceSlug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const n = (sourceName || '').toLowerCase();
  if (s.includes('chinanews') || n.includes('中新')) return 'chinanews';
  if (s.includes('xinhua') || n.includes('新华')) return 'xinhua';
  if (s.includes('ria') || n.includes('ria') || n.includes('俄新社')) return 'ria';
  if (s.includes('sputnik') || n.includes('卫星通讯社')) return 'sputnik';
  if (s.includes('afp') || n.includes('afp') || n.includes('法新社')) return 'afp';
  if (s.includes('france24') || n.includes('france 24')) return 'france24';
  if (s.includes('cnn') || n.includes('cnn')) return 'cnn';
  if (s.includes('fox') || n.includes('fox')) return 'fox';
  if (s.includes('guardian') || n.includes('guardian') || n.includes('卫报')) return 'guardian';
  if (s.includes('aljazeera') || n.includes('jazeera') || n.includes('半岛')) return 'aljazeera';
  if (s.includes('theverge') || n.includes('verge')) return 'theverge';
  if (s.includes('techcrunch') || n.includes('crunch')) return 'techcrunch';
  if (s.includes('hackernews') || n.includes('hacker')) return 'hackernews';
  if (s.includes('deepmind')) return 'deepmind';
  if (s.includes('openai')) return 'openai';
  if (s.includes('huggingface') || n.includes('hugging')) return 'huggingface';
  if (s.includes('github')) return 'github';
  if (s.includes('mit')) return 'mit';
  if (s.includes('bbc')) return 'bbc';
  if (s.includes('reuters') || n.includes('路透')) return 'reuters';
  if (s.includes('ap') || n.includes('associated press') || n.includes('美联社')) return 'ap';
  if (s.includes('bloomberg') || n.includes('彭博')) return 'bloomberg';
  if (s === 'ft' || n.includes('financial times') || n.includes('金融时报')) return 'ft';
  if (s.includes('nytimes') || n.includes('new york times') || n.includes('纽约时报')) return 'nytimes';
  if (s.includes('wsj') || n.includes('wall street') || n.includes('华尔街日报')) return 'wsj';
  if (s.includes('marketwatch') || n.includes('marketwatch')) return 'marketwatch';
  if (s.includes('oilprice') || n.includes('oilprice')) return 'oilprice';
  if (s.includes('npr') || n.includes('npr')) return 'npr';
  if (s.includes('ansa') || n.includes('ansa') || n.includes('安莎')) return 'ansa';
  if (s.includes('tass') || n.includes('tass') || n.includes('塔斯')) return 'tass';
  if (s === 'un' || n.includes('un news') || n.includes('联合国')) return 'un';
  if (s.includes('who') || n.includes('who news') || n.includes('世界卫生组织')) return 'who';
  if (s.includes('ecb') || n.includes('central bank') || n.includes('欧洲央行')) return 'ecb';
  if (s.includes('fed') || n.includes('federal reserve') || n.includes('联邦储备')) return 'fed';
  if (s.includes('esa') || n.includes('esa space') || n.includes('欧洲航天')) return 'esa';
  if (s.includes('microsoft') || n.includes('microsoft research') || n.includes('微软研究')) return 'microsoft';
  if (s.includes('nvidia') || n.includes('nvidia') || n.includes('英伟达')) return 'nvidia';
  if (s === 'aws' || n.includes('aws') || n.includes('亚马逊云')) return 'aws';
  if (s.includes('dw') || n.includes('welle') || n.includes('德国之声')) return 'dw';
  if (s.includes('zaobao') || n.includes('早报')) return 'zaobao';
  if (s.includes('caixin') || n.includes('财新')) return 'caixin';
  if (s.includes('nikkei') || n.includes('日经')) return 'nikkei';
  if (s.includes('cnbc')) return 'cnbc';
  if (s.includes('reddit')) return 'reddit';
  if (s.includes('lobsters')) return 'lobsters';
  if (s.includes('nature')) return 'nature';
  if (s.includes('science')) return 'science';
  if (s.includes('nasa')) return 'nasa';
  if (s.includes('arxiv')) return 'arxiv';
  return s || 'github';
}

export function renderSourceBadge(sourceName, sourceSlug) {
  const resolved = resolveSourceSlug(sourceName, sourceSlug);
  const iconPath = sitePath(`assets/sources/${resolved}.svg`);
  const safeName = escapeHtml(sourceName);
  return `<span class="source-badge"><img src="${iconPath}" class="source-icon" alt="${safeName}" width="16" height="16" /> <strong>${safeName}</strong></span>`;
}

export function renderPerspectiveMatrix(perspectiveMatrix = []) {
  const lines = [];
  for (const mat of perspectiveMatrix) {
    const safeTopic = (mat.topic || "").replace(/"/g, "&quot;").replace(/\$/g, "&#36;");
    const safeConsensus = (mat.consensus || "").replace(/"/g, "&quot;").replace(/\$/g, "&#36;");
    const safeInterests = (mat.interests || "").replace(/"/g, "&quot;").replace(/\$/g, "&#36;");
    const safeBlindSpots = (mat.blindSpots || "").replace(/"/g, "&quot;").replace(/\$/g, "&#36;");

    lines.push("<div class=\"perspective-matrix-card\">");
    lines.push("  <div class=\"perspective-matrix-header\">");
    lines.push("    <h3 class=\"perspective-matrix-title\">🎯 焦点对决：" + safeTopic + "</h3>");
    lines.push("    <span class=\"perspective-stance-badge\">多极视角对照</span>");
    lines.push("  </div>");
    lines.push("  <div class=\"perspective-consensus-box\">");
    lines.push("    <div class=\"perspective-consensus-title\">✅【已证实核心共识与基础事实】</div>");
    lines.push("    <div>" + safeConsensus + "</div>");
    lines.push("  </div>");
    lines.push("  <div class=\"perspective-sources-grid\">");
    for (const src of mat.sources || []) {
      const srcSlug = resolveSourceSlug(src.name);
      const safeSrcName = (src.name || "").replace(/"/g, "&quot;");
      const safeStance = (src.stance || "官方观察").replace(/"/g, "&quot;");
      const safeFocus = (src.focus || "").replace(/"/g, "&quot;").replace(/\$/g, "&#36;");
      lines.push("    <div class=\"perspective-source-item\">");
      lines.push("      <div class=\"perspective-source-header\">");
      lines.push("        <span class=\"perspective-source-name\"><img src=\"" + sitePath(`assets/sources/${srcSlug}.svg`) + "\" class=\"source-icon\" alt=\"" + safeSrcName + "\" width=\"16\" height=\"16\" /> " + safeSrcName + "</span>");
      lines.push("        <span class=\"perspective-stance-badge\">" + safeStance + "</span>");
      lines.push("      </div>");
      lines.push("      <div class=\"perspective-source-body\">" + safeFocus + "</div>");
      lines.push("    </div>");
    }
    lines.push("  </div>");
    lines.push("  <div class=\"perspective-analysis-row\">");
    lines.push("    <div class=\"perspective-deep-interest\">");
    lines.push("      <div class=\"analysis-label\">💡【深层地缘与利益诉求解构】</div>");
    lines.push("      <div>" + safeInterests + "</div>");
    lines.push("    </div>");
    lines.push("    <div class=\"perspective-blind-spot\">");
    lines.push("      <div class=\"analysis-label\">🔍【关键信息盲区与待核实点】</div>");
    lines.push("      <div>" + safeBlindSpots + "</div>");
    lines.push("    </div>");
    lines.push("  </div>");
    lines.push("</div>");
    lines.push("");
  }
  return lines.join("\n");
}

export function renderRepoShowcaseCard() {
  return `<div class="repo-showcase-card">
  <div class="repo-showcase-top">
    <div class="repo-showcase-title">
      <svg class="gh-octicon" viewBox="0 0 16 16" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25v3.25a.25.25 0 0 0 .4.2l1.45-1.087a.249.249 0 0 1 .3 0L8.6 15.7a.25.25 0 0 0 .4-.2v-3.25a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25Z"></path></svg>
      <a href="https://github.com/stlin256/INFO-LIVE" target="_blank" rel="noopener noreferrer">stlin256 / INFO-LIVE</a>
    </div>
    <span class="perspective-stance-badge" style="background:color-mix(in srgb, #10b981 12%, transparent);color:#059669;border-color:color-mix(in srgb, #10b981 25%, transparent);">开源项目 · Public</span>
  </div>
  <div class="repo-showcase-desc">
    InfoLive | 全球全源信息流与 AI 实时要闻矩阵平台。接入新华社、俄新社、法新社、CNN、FOX、BBC、半岛电视台、联合国、世卫组织、欧洲央行等 55+ 官方原版母语电讯，基于前沿大语言模型进行跨语言深度编译、多维信源对照与跨 Actions 话题生命周期管理。
  </div>
  <div class="repo-showcase-topics">
    <a href="https://github.com/topics/intelligence" target="_blank" rel="noopener" class="repo-topic-pill">intelligence</a>
    <a href="https://github.com/topics/news-matrix" target="_blank" rel="noopener" class="repo-topic-pill">news-matrix</a>
    <a href="https://github.com/topics/ai-native" target="_blank" rel="noopener" class="repo-topic-pill">ai-native</a>
    <a href="https://github.com/topics/astro" target="_blank" rel="noopener" class="repo-topic-pill">astro</a>
    <a href="https://github.com/topics/openhomepage" target="_blank" rel="noopener" class="repo-topic-pill">openhomepage</a>
    <a href="https://github.com/topics/github-actions" target="_blank" rel="noopener" class="repo-topic-pill">github-actions</a>
  </div>
  <div class="repo-showcase-stats">
    <span class="repo-stat-item"><i class="gh-lang-dot" style="background-color:#3178c6;display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:4px;"></i> TypeScript</span>
    <span class="repo-stat-item"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg> 5 Stars</span>
    <span class="repo-stat-item"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 1.5 0Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg> 1 Fork</span>
    <span class="repo-stat-item">⚖️ MIT License</span>
    <span class="repo-stat-item">🔄 24/7 全自动无人值守调度</span>
  </div>
  <div class="repo-showcase-actions">
    <a href="https://github.com/stlin256/INFO-LIVE" target="_blank" rel="noopener noreferrer" class="repo-btn repo-btn-primary">
      <span>⭐ 在 GitHub 上 Star 关注</span>
    </a>
    <a href="https://github.com/stlin256/INFO-LIVE/fork" target="_blank" rel="noopener noreferrer" class="repo-btn repo-btn-outline">
      <span>🍴 Fork 本项目</span>
    </a>
    <a href="https://github.com/stlin256/INFO-LIVE/issues" target="_blank" rel="noopener noreferrer" class="repo-btn repo-btn-outline">
      <span>💬 提交 Issue / 需求</span>
    </a>
  </div>
</div>`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderArticleBodyHtml(value) {
  const paragraphs = String(value || '').split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  if (paragraphs.length === 0) return '<div class="article-body" data-article-body="true"></div>';
  const html = paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br />')}</p>`).join('\n');
  return `<div class="article-body" data-article-body="true">${html}</div>`;
}

export function renderArticleCard(s) {
  const lines = [];
  const rawTitle = String(s.title || '');
  const title = hasReadableChineseTitle(s) ? rawTitle : `【${String(s.source || '外文信源')}】外文标题尚未完成中文翻译`
  const safeTitle = escapeHtml(title);
  const contentStatus = s.contentStatus || 'missing';
  const translationStatus = s.translationStatus || 'source-only';
  const contentSource = s.contentSource || 'rss';
  const contentKind = s.contentKind || (contentSource === 'official-page' ? 'official-page-body' : 'rss-summary');
  const displayBody = articleBodyForDisplay(s);
  const contentLength = displayBody.length;
  const contentParagraphs = Number(s.translationParagraphs || displayBody.split(/\n\s*\n/).filter(Boolean).length);
  const articleUrl = cleanUrl(s.url);

  const storyId = s.id || storyIdForUrl(s.url, s.title);
  lines.push(':::cell');
  lines.push('<div id="' + storyId + '" class="story-anchor"></div>');
  lines.push('<div class="news-card-header" data-content-status="' + escapeHtml(contentStatus) + '" data-translation-status="' + escapeHtml(translationStatus) + '" data-content-source="' + escapeHtml(contentSource) + '" data-content-kind="' + escapeHtml(contentKind) + '" data-source-lang="' + escapeHtml(s.sourceLang || '') + '" data-content-length="' + contentLength + '" data-content-paragraphs="' + contentParagraphs + '" data-published-at="' + escapeHtml(s.publishedAt || '') + '" data-time-source="publication">');
  lines.push('  <div class="news-card-meta-left">');
  lines.push(`    ${renderSourceBadge(s.source, s.sourceSlug)}`);
  if (s.stance) {
    lines.push(`    <span class="stance-badge">${s.stance}</span>`);
  }
  if (s.dimensionLabel) {
    lines.push(`    <span class="dimension-pill">${s.dimensionLabel}</span>`);
  }
  lines.push('  </div>');
  lines.push(`  <span class="news-meta-time">🕒 ${escapeHtml(s.pubTime || '发布时间未知')}</span>`);
  lines.push('</div>');
  lines.push('');

  // 1. 中文主标题（目标语言）
  lines.push(`### [${safeTitle}](${escapeHtml(articleUrl)})`);

  // 2. 原始外文标题原文（小字副标题展示，保障情报真实溯源）
  if (s.originalTitle && s.originalTitle.trim() !== s.title.trim()) {
    const safeOrig = escapeHtml(s.originalTitle);
    lines.push(`<div class="original-title-sub"><span class="orig-tag">原文</span> ${safeOrig}</div>`);
  }
  lines.push('');

  // 3. 封面图嵌入
  if (s.imageUrl && /^https?:\/\//i.test(s.imageUrl)) {
    lines.push(`<div class="article-cover"><img src="${escapeHtml(s.imageUrl)}" alt="${safeTitle}" loading="lazy" /></div>`);
    lines.push('');
  }

  // 4. 正文状态显式呈现：短源不伪装成全篇报道
  if (contentStatus !== 'full' || translationStatus !== 'full') {
    const notice = contentStatus === 'missing' ? '未获取到官方正文，暂不生成未经证实的替代内容。' : '官方原文当前仅提供短讯或摘要；以下内容严格限于已获取证据，未补写缺失事实。';
    lines.push('<div class="article-content-notice" data-content-warning="true">⚠️ ' + notice + '</div>');
  }
  lines.push(renderArticleBodyHtml(displayBody));
  lines.push('');

  // 5. 核心研判
  if (s.keyTakeaways && s.keyTakeaways.length > 0) {
    lines.push('<div class="news-card-takeaways">');
    lines.push('  <div class="takeaways-header">💡 核心研判与各方动向</div>');
    lines.push('  <ul class="takeaways-list">');
    for (const t of s.keyTakeaways) {
      const text = typeof t === 'string' ? t : (t?.claim || t?.summary || t?.text || '');
      if (text) lines.push(`    <li>${escapeHtml(text)}</li>`);
    }
    lines.push('  </ul>');
    lines.push('</div>');
    lines.push('');
  }

  // 6. 标签胶囊
  if (s.tags && s.tags.length > 0) {
    lines.push('<div class="news-card-tags">');
    for (const tag of s.tags) {
      lines.push(`  <span class="news-tag-pill">${tag}</span>`);
    }
    lines.push('</div>');
    lines.push('');
  }

  // 7. 出处原文跳转链接（新窗口打开）
  lines.push(`<div class="news-card-footer"><a href="${escapeHtml(articleUrl)}" target="_blank" rel="noopener noreferrer" class="news-source-link">查阅【${escapeHtml(s.source)}】官方出处原文 ↗</a></div>`);
  lines.push(':::');
  lines.push('');
  return lines.join('\n');
}

/**
 * 杂志化快讯流（Live Wire Grid）渲染器
 */
export function renderLiveWireStream(ticker = [], topStories = []) {
  const lines = [];
  lines.push("<div class=\"live-wire-grid\">");

  const storyUrlMap = new Map();
  // Only map stories that are actually rendered below; otherwise the wire can point
  // to a valid id from the overflow pool that has no corresponding DOM card.
  for (const s of topStories.slice(0, 14)) {
    const cardId = s.id || storyIdForUrl(s.url, s.title);
    if (s.url) storyUrlMap.set(cleanUrl(s.url), cardId);
  }

  for (const t of ticker.slice(0, 32)) {
    const resolved = resolveSourceSlug(t.source, t.sourceSlug);
    const cleanLink = cleanUrl(t.url);
    const tickerText = hasReadableChineseTitle({ title: t.text }) ? String(t.text || '') : '外文信源标题正在进行中文翻译，暂不展示未翻译标题';
    const safeText = escapeHtml(tickerText);
    const tickerSnippet = isChineseReadableText(t.snippet, { minChars: 8, minRatio: 0.45 })
      ? String(t.snippet || '')
      : '该外文快讯尚未完成中文全文翻译，暂不展示外文摘要。';
    const safeSnippet = escapeHtml(tickerSnippet);
    const internalTargetId = storyUrlMap.get(cleanLink);

    lines.push("  <div class=\"wire-card\">");
    lines.push("    <div class=\"wire-card-meta\">");
      lines.push("      <span class=\"wire-time-badge\">🕒 " + escapeHtml(t.time || '发布时间未知') + "</span>");
    lines.push("      <span class=\"wire-source-badge\"><img src=\"" + sitePath(`assets/sources/${resolved}.svg`) + "\" class=\"source-icon\" alt=\"" + escapeHtml(t.source) + "\" width=\"14\" height=\"14\" /> " + escapeHtml(t.source) + "</span>");
    lines.push("      <span class=\"wire-dim-badge\">" + escapeHtml(t.dimensionLabel || "🌐 全球要闻") + "</span>");
    lines.push("    </div>");
    lines.push("    <div class=\"wire-card-title\">");
    if (internalTargetId) {
      lines.push("      <a href=\"#" + internalTargetId + "\" class=\"wire-title-link\" title=\"点击直达本站全篇深度编译\">");
      lines.push("        " + safeText);
      lines.push("        <span class=\"wire-ext-icon\" style=\"color:var(--accent);\">👇</span>");
      lines.push("      </a>");
    } else {
      lines.push("      <a href=\"" + escapeHtml(cleanLink) + "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"wire-title-link\" title=\"查阅出处一手报道\">");
      lines.push("        " + safeText);
      lines.push("        <span class=\"wire-ext-icon\">↗</span>");
      lines.push("      </a>");
    }
    lines.push("    </div>");
    if (safeSnippet) {
      lines.push("    <div class=\"wire-snippet\">" + safeSnippet + "</div>");
    }
    lines.push("    <div class=\"wire-actions\">");
    if (internalTargetId) {
      lines.push("      <a href=\"#" + internalTargetId + "\" class=\"wire-jump-link\"><span>查阅本站全篇深度编译 ➔</span></a>");
    } else {
      lines.push("<span style=\"color:var(--text-muted);font-size:0.7rem;\">⚡ 实时权威电讯</span>");
    }
    lines.push("      <a href=\"" + escapeHtml(cleanLink) + "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"wire-source-outbound\"><span>官方出处 ↗</span></a>");
    lines.push("    </div>");
    lines.push("  </div>");
  }
  lines.push("</div>");
  return lines.join("\n");
}

export function writeSiteData(data, rawItems = []) {
  const pagesDir = path.resolve('data/pages/zh');
  const timeInfo = getBeijingTime();
  const orchestration = data.orchestration || {};
  const sourceHealth = Array.isArray(rawItems?.sourceHealth) ? rawItems.sourceHealth : [];

  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }

  // 跨 Actions 话题生命周期演进（开始、更新、迭代、归档）
  const topicRunMeta = orchestration.runId ? {
    runId: orchestration.runId,
    previousRunIds: orchestration.previousRunIds || [],
    archiveAfterRuns: 3,
  } : {};
  const activeTopics = evolveTopics(data.specialTopics || [], rawItems, timeInfo, topicRunMeta);

  const hourly = data.hourlyBriefing || {};
  const daily = data.dailyBriefing || {};
  const perspectiveMatrix = data.perspectiveMatrix || [];
  const trends = data.socialTrends || { radar: [], debates: [] };

  const topStoryCandidates = data.topStories || [];
  const worldStoryCandidates = data.worldStories || [];
  const financeStoryCandidates = data.financeStories || [];
  const aiStoryCandidates = data.aiStories || [];
  const trendStoryCandidates = data.trendStories || [];
  // Source-only/failed-translation items remain discoverable in the wire and
  // history, but never enter an article card that claims to be a full translation.
  // The home desk is a cross-dimension view: if the first interleaved picks lose
  // translation races, promote later verified stories from every desk rather than
  // publishing a sparse home page or filling it with summaries.
  const topStoryPool = [
    ...topStoryCandidates,
    ...worldStoryCandidates,
    ...financeStoryCandidates,
    ...aiStoryCandidates,
    ...trendStoryCandidates,
  ];
  const topStories = selectPublishableStories(topStoryPool, 14);
  const worldStories = selectPublishableStories(worldStoryCandidates, 20);
  const financeStories = selectPublishableStories(financeStoryCandidates, 20);
  const aiStories = selectPublishableStories(aiStoryCandidates, 20);
  const trendStories = selectPublishableStories(trendStoryCandidates, 16);
  const ticker = data.ticker || [];

  // -------------------------------------------------------------
  // 1. 永久持久化历史存储 (不设截断限制，按日与全库归档)
  // -------------------------------------------------------------
  const historyDir = path.resolve('data/history');
  const dailyHistoryDir = path.resolve('data/history/daily');
  if (!fs.existsSync(dailyHistoryDir)) fs.mkdirSync(dailyHistoryDir, { recursive: true });

  const archiveFile = path.join(historyDir, 'archive.json');
  let archive = [];
  if (fs.existsSync(archiveFile)) {
    try {
      archive = JSON.parse(fs.readFileSync(archiveFile, 'utf8'));
    } catch {
      archive = [];
    }
  }

  const articleSnapshots = topStoryCandidates.slice(0, 14).map((s) => ({
    id: s.id,
    title: s.title,
    originalTitle: s.originalTitle,
    source: s.source,
    sourceSlug: s.sourceSlug,
    sourceLang: s.sourceLang,
    publishedAt: s.publishedAt || null,
    pubTime: s.pubTime || '发布时间未知',
    url: s.url,
    imageUrl: s.imageUrl || null,
    fullContent: s.fullContent || s.snippet || '',
    fullTranslation: articleBodyForDisplay(s),
    contentStatus: s.contentStatus || 'missing',
    translationStatus: s.translationStatus || 'source-only',
    contentSource: s.contentSource || 'rss',
    contentKind: s.contentKind || (s.contentSource === 'official-page' ? 'official-page-body' : 'rss-summary'),
    contentParagraphs: s.contentParagraphs || 0,
    translationParagraphs: s.translationParagraphs || 0,
    keyTakeaways: s.keyTakeaways || [],
    citations: s.agentEvidence?.citations || [{ source: s.source, url: s.url, publishedAt: s.publishedAt || null }],
  }));

  const currentSnapshot = {
    timestamp: timeInfo.timestamp,
    timeDisplay: timeInfo.display,
    date: timeInfo.dateOnly,
    runId: orchestration.runId || null,
    generatedAt: timeInfo.iso,
    hourlyBriefing: hourly,
    dailyBriefing: daily,
    storiesCount: topStoryCandidates.length,
    taskMetrics: orchestration.metrics || null,
    degradedRoles: orchestration.degradedTasks || [],
    sourceHealth,
    topStories: articleSnapshots,
    articleSnapshots,
  };

  if (orchestration.runId) {
    const runsDir = path.resolve('.cache/ai-runs');
    if (!fs.existsSync(runsDir)) fs.mkdirSync(runsDir, { recursive: true });
    const runFile = path.join(runsDir, `${orchestration.runId}.json`);
    const tempFile = `${runFile}.${process.pid}.${Date.now()}.tmp`;
    try {
      fs.writeFileSync(tempFile, JSON.stringify({
        schemaVersion: 1,
        runId: orchestration.runId,
        generatedAt: timeInfo.iso,
        orchestration,
        articleSnapshots,
        topicSlugs: (data.specialTopics || []).map((topic) => topic.slug).filter(Boolean),
      }, null, 2), 'utf8');
      fs.renameSync(tempFile, runFile);
    } finally {
      if (fs.existsSync(tempFile)) {
        try { fs.unlinkSync(tempFile); } catch { /* preserve original write error */ }
      }
    }
  }

  if (orchestration.runId) archive = archive.filter((snapshot) => snapshot.runId !== orchestration.runId);
  archive.unshift(currentSnapshot);
  writeJsonAtomic(archiveFile, archive);

  const todayFile = path.join(dailyHistoryDir, `${timeInfo.dateOnly}.json`);
  let dailyData = [];
  if (fs.existsSync(todayFile)) {
    try {
      dailyData = JSON.parse(fs.readFileSync(todayFile, 'utf8'));
    } catch {
      dailyData = [];
    }
  }
  if (orchestration.runId) dailyData = dailyData.filter((snapshot) => snapshot.runId !== orchestration.runId);
  dailyData.unshift(currentSnapshot);
  writeJsonAtomic(todayFile, dailyData);

  // Build one static, searchable page per day. The top-level archive remains a
  // compact index, while these pages make older snapshots permanently queryable
  // instead of silently dropping everything after the newest 48 runs.
  const dailyDates = fs.readdirSync(dailyHistoryDir)
    .filter((file) => /^\d{4}-\d{2}-\d{2}\.json$/.test(file))
    .map((file) => file.replace(/\.json$/, ''))
    .sort()
    .reverse();
  for (const date of dailyDates) {
    const file = path.join(dailyHistoryDir, `${date}.json`);
    let snapshots;
    try {
      const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
      snapshots = Array.isArray(parsed) ? parsed : [];
    } catch {
      snapshots = [];
    }
    const dayLines = [
      '---',
      `title: "历史情报 · ${date}"`,
      'nav: false',
      'sitemap: true',
      'order: 100',
      `description: "InfoLive ${date} 的逐小时全球情报快照与文章证据"`,
      '---',
      '',
      `# 🗓️ ${date} 全球情报历史快照`,
      '',
      `共记录 **${snapshots.length}** 个运行快照；文章正文、原始标题、译文状态和官方出处按当时证据永久保留。`,
      '',
    ];
    for (const snapshot of snapshots) {
      const stamp = snapshot.timeDisplay || snapshot.generatedAt || date;
      dayLines.push(`## ⏱️ ${stamp}`, '', snapshot.hourlyBriefing?.lead || '本轮运行未生成小时导语。', '');
      const stories = Array.isArray(snapshot.topStories) ? snapshot.topStories : [];
      if (stories.length > 0) {
        dayLines.push('::::grid{cols=2}');
        for (const story of stories) dayLines.push(renderArticleCard(story));
        dayLines.push('::::', '');
      }
    }
    writeFileAtomic(path.join(pagesDir, `archive-${date}.md`), dayLines.join('\n'));
  }

  // -------------------------------------------------------------
  // 2. 渲染 index.md (全景主页，order: 0)
  // -------------------------------------------------------------
  const indexLines = [
    '---',
    'title: "全球情报总览"',
    'nav: true',
    'order: 0',
    'description: "InfoLive 24/7 全球全源信息流与 AI 实时要闻矩阵"',
    'notice:',
    `  text: "⚡ 当前监控运行中 · 本小时数据更新于 ${timeInfo.hourOnly} · 聚合全球 55+ 权威通讯社与机构一手原版电讯"`,
    '  color: "theme"',
    '---',
    '',
    `# ⚡ InfoLive 全球情报全景矩阵 · ${timeInfo.hourOnly} 速报`,
    '',
    ':::important',
    `### ⏱️ 本小时战略速报 (${timeInfo.hourOnly})`,
    '',
    hourly.lead || '本轮尚未生成小时级 AI 导语；请以快讯中的官方标题、发布时间和出处为准。',
    '',
    '**🎯 关键动态信号：**'
  ];

  if (hourly.signals && hourly.signals.length > 0) {
    for (const sig of hourly.signals) {
      indexLines.push(`- ${safeChineseEditorialText(sig)}`);
    }
  }
  indexLines.push(':::');
  indexLines.push('');

  // 日尺度宏观大势板块
  indexLines.push(':::note');
  indexLines.push(`### 🌐 24小时全球宏观大势与主线脉络（日尺度全景）`);
  indexLines.push('');
  indexLines.push(daily.lead || '本轮尚未生成日尺度 AI 研判；页面只展示已采集且可回溯的官方证据。');
  indexLines.push('');
  if (daily.themes && daily.themes.length > 0) {
    indexLines.push('**📊 今日核心主线透视：**');
    for (const th of daily.themes) {
      indexLines.push(`- **${th.name}**：${th.analysis}`);
    }
  }
  indexLines.push(':::');
  indexLines.push('');

  // AI 专题推荐专区
  indexLines.push('## 🔥 AI 深度追踪与独家专题专区');
  indexLines.push('');
  indexLines.push('由 AI 研判引擎根据全球事态持续演进自主立项、跨 Actions 增量扩充与全景复盘的独家专题（点击卡片或导航 TAB 直达）：');
  indexLines.push('');
  indexLines.push('::::grid{cols=2}');
  if (activeTopics.length === 0) {
    indexLines.push(':::cell');
    indexLines.push('当前 Actions 轮次未形成可持续追踪的专题；系统将依据后续多信源证据自动创建并更新专题。');
    indexLines.push(':::');
  }
  for (const tp of activeTopics.slice(0, 4)) {
    indexLines.push(':::cell');
    indexLines.push(`<div class="topic-header"><span class="topic-status-badge">${tp.status || '🔥 追踪中'}</span> <span class="news-meta-time">🕒 更新：${timeInfo.hourOnly}</span></div>`);
    indexLines.push('');
    indexLines.push(`### [${tp.title}](${sitePath(`${tp.slug}/`)})`);
    indexLines.push('');
    indexLines.push(`> **主旨**：${tp.tagline}`);
    indexLines.push('');
    indexLines.push(tp.overview ? `${tp.overview.slice(0, 180)}……` : '');
    indexLines.push('');
    indexLines.push(`<div class="topic-card-footer"><a href="${sitePath(`${tp.slug}/`)}" class="editorial-button accent"><span>查阅完整专题报告与大事记 ➔</span></a></div>`);
    indexLines.push(':::');
  }
  indexLines.push('::::');
  indexLines.push('');

  // 全球立场罗生门矩阵
  indexLines.push('## 🌐 全球立场罗生门：重大热点立场辨明与叙事解构');
  indexLines.push('');
  indexLines.push('针对世界重大分歧热点，解构不同阵营的叙事定调、报道选词、深层地缘利益与信息盲区：');
  indexLines.push('');

  indexLines.push(renderPerspectiveMatrix(perspectiveMatrix));

  // 杂志化本小时快讯流 (Live Wire Grid)
  indexLines.push('## ⏱️ 本小时全球要闻快讯流');
  indexLines.push('');
  indexLines.push(renderLiveWireStream(ticker, topStories));
  indexLines.push('');

  // 核心要闻全景深度编译卡片
  indexLines.push('## 📰 核心要闻全景深度编译（图文全量解析）');
  indexLines.push('');
  indexLines.push('::::grid{cols=2}');
  for (const s of topStories.slice(0, 14)) {
    indexLines.push(renderArticleCard(s));
  }
  indexLines.push('::::');
  indexLines.push('');

  indexLines.push(':::tip');
  indexLines.push('**关于本页面**：本页面由 **InfoLive 引擎** 每小时全自动调度，从各大国际主流通讯社原版母语电讯、全球AI顶级社区与财经网络爬取一手数据，每篇文章均保留官方出处、原始标题与内容状态；只有通过正文与译文门禁的文章才会进入已发布的核心编译卡。');
  indexLines.push(':::');

  fs.writeFileSync(path.join(pagesDir, 'index.md'), indexLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 3. AI 自由创建并编写的动态专题内容页面（独立 TAB，order: 5, 6...）
  // -------------------------------------------------------------
  activeTopics.forEach((tp, idx) => {
    const topicLines = [
      '---',
      `title: "${tp.navTitle || '专题: ' + tp.title}"`,
      'nav: true',
      `order: ${5 + idx}`,
      `description: "${tp.tagline}"`,
      'notice:',
      `  text: "${tp.status} · 跨 Actions 持续扩充与深度追踪专题 · 当前更新轮次 #${tp.updateCount || 1}"`,
      '  color: "theme"',
      '---',
      '',
      `# ${tp.title}`,
      '',
      `> 📌 **主旨摘要**：${tp.tagline}`,
      '',
      '## 📖 专题全景背景与深度综述',
      '',
      tp.overview || '',
      '',
      '## ⚖️ 阵营诉求、核心红线与多边博弈',
      '',
    ];
    const stanceItems = Array.isArray(tp.stanceAnalysis) ? tp.stanceAnalysis : [];
    if (stanceItems.length > 0) {
      for (const item of stanceItems) {
        const side = item.side || item.stakeholder || item.name || '相关方';
        const focus = item.focus || item.viewpoint || item.analysis || item.summary || '';
        topicLines.push(`- **${side}**：${focus}`);
      }
    } else if (typeof tp.stanceAnalysis === 'string' && tp.stanceAnalysis.trim()) {
      topicLines.push(tp.stanceAnalysis);
    } else {
      topicLines.push('当前专题尚未积累足够的多方原文，立场对照将在后续 Actions 轮次补齐。');
    }
    topicLines.push('', '## ⏱️ 关键演进脉络与大事记时间轴', '', '::::timeline{title="事件演化里程碑"}');

    const timeline = Array.isArray(tp.timeline) ? tp.timeline : [];
    if (timeline.length > 0) {
      for (const ev of timeline) {
        const start = ev.time || ev.date || ev.start || '待定';
        const title = ev.title || ev.name || '未命名事件';
        const detail = ev.desc || ev.description || ev.summary || ev.detail || '';
        topicLines.push(`:::timeline-item{start="${start}" title="${title}" org="TOPIC"}`);
        topicLines.push(detail || '该节点已记录，详情以关联官方原文为准。');
        topicLines.push(':::');
      }
    } else {
      topicLines.push(':::timeline-item{start="待更新" title="等待新的可验证事件节点" org="TOPIC"}');
      topicLines.push('后续轮次将根据带有发布时间和官方出处的文章增量更新事件链。');
      topicLines.push(':::');
    }
    topicLines.push('::::');
    topicLines.push('');

    topicLines.push('## 🎯 核心研判与前瞻推演');
    topicLines.push('');
    for (const j of tp.keyJudgments || []) {
      topicLines.push(`- **战略要点**：${j}`);
    }
    topicLines.push('');

    // 专题关联图文卡片
    topicLines.push('## 📰 专题关联一手电讯与深度编译');
    topicLines.push('');
    topicLines.push('::::grid{cols=2}');
    const matchedStories = topStories.filter((s) => {
      const txt = `${s.title} ${s.originalTitle || ''} ${s.fullTranslation || ''}`.toLowerCase();
      const kw = tp.slug.replace(/^topic-/, '').split('-');
      return kw.some((k) => k.length > 2 && txt.includes(k));
    });
    const selectedTopicStories = (matchedStories.length > 0 ? matchedStories : topStories.slice(0, 4));
    for (const s of selectedTopicStories) {
      topicLines.push(renderArticleCard(s));
    }
    topicLines.push('::::');

    fs.writeFileSync(path.join(pagesDir, `${tp.slug}.md`), topicLines.join('\n'), 'utf8');
    console.log(`[SiteWriter] Generated AI Special Topic page: ${tp.slug}.md (order: ${5 + idx})`);
  });

  // -------------------------------------------------------------
  // 4. 社会热点等内容 (trends.md，order: 4)
  // -------------------------------------------------------------
  const trendsLines = [
    '---',
    'title: "社会热点与思潮"',
    'nav: true',
    'order: 4',
    'description: "全球公众关切、网络社群热议与社会情绪热点深度透视"',
    'notice:',
    '  text: "🔥 实时追踪全球公众舆论、社区激辩与社会情绪光谱" ',
    '  color: "theme"',
    '---',
    '',
    '# 🔥 全球社会热点、公众关切与网络思潮',
    '',
    ':::important',
    '### 🌐 全球公众心理与社群情绪综述',
    '',
    '本板块只呈现已采集的社区文章、公开讨论与可追溯信源证据。热度、情绪与争议标签在有足够样本和交叉证据后再由编排流程生成，不以固定模板替代事实。',
    ':::',
    '',
    '## 📊 全球公众情绪与社会热度雷达',
    '',
    '| 议题事件 | 关注热度 | 情绪光谱 | 底层社会与文化矛盾解构 |',
    '| :--- | :---: | :---: | :--- |'
  ];

  for (const r of trends.radar || []) {
    trendsLines.push(`| **${r.issue}** | \`${r.heat}\` | \`${r.spectrum}\` | ${r.conflict} |`);
  }
  trendsLines.push('');

  trendsLines.push('## 💬 思想社区与网民观点争鸣');
  trendsLines.push('');
  for (const d of trends.debates || []) {
    trendsLines.push(`### 🗣️ ${d.topic}`);
    trendsLines.push(`> **舆论争鸣聚焦**：${d.summary}`);
    trendsLines.push('');
  }

  trendsLines.push('## 📰 社会民生、思潮与社群核心要闻');
  trendsLines.push('');
  trendsLines.push('::::grid{cols=2}');
  const trendsSelected = (
    trendStories.length > 0
      ? trendStories
      : topStories.filter((s) => s.category === 'community' || s.dimension === 'social-trends')
  ).slice(0, 16);
  for (const s of (trendsSelected.length > 0 ? trendsSelected : topStories.slice(0, 16))) {
    trendsLines.push(renderArticleCard(s));
  }
  trendsLines.push('::::');
  fs.writeFileSync(path.join(pagesDir, 'trends.md'), trendsLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 5. 渲染 ai.md (AI与前沿科技，order: 1)
  // -------------------------------------------------------------
  const aiLines = [
    '---',
    'title: "AI与前沿科技"',
    'nav: true',
    'order: 1',
    'description: "全球人工智能、大模型计算、开源生态与顶会论文一手深度情报"',
    'notice:',
    '  text: "🚀 聚焦前沿大模型范式、智能体架构、计算硬件与开源顶会论文 · 实时深度编译" ',
    '  color: "theme"',
    '---',
    '',
    '# 🧠 人工智能与前沿技术情报矩阵',
    '',
    '全天候追踪 OpenAI, Google DeepMind, Hugging Face, Hacker News, TechCrunch 等前沿机构的一手技术发布、模型演进与开源生态。',
    '',
    '## 📰 前沿核心要闻全景深度编译',
    '',
    '::::grid{cols=2}'
  ];
  const aiSelected = (aiStories.length > 0 ? aiStories : topStories.filter((s) => s.category === 'ai' || s.dimension === 'ai-frontier')).slice(0, 20);
  for (const s of aiSelected) {
    aiLines.push(renderArticleCard(s));
  }
  aiLines.push('::::');
  fs.writeFileSync(path.join(pagesDir, 'ai.md'), aiLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 6. 渲染 world.md (国际政经，order: 2)
  // -------------------------------------------------------------
  const worldLines = [
    '---',
    'title: "国际政经"',
    'nav: true',
    'order: 2',
    'description: "全球大国博弈、地缘战略、跨国治理与多极秩序动态监控"',
    'notice:',
    '  text: "🌐 并列呈现新华社、俄新社、法新社、CNN、FOX、BBC、半岛电视台等官方原版母语电讯与立场深度解构" ',
    '  color: "theme"',
    '---',
    '',
    '# 🌐 国际地缘、多极战略与全球政经观察',
    '',
    '全天候聚合新华社、俄新社、法新社、CNN、FOX News、BBC、半岛电视台等全球多极通讯社原版母语电讯，深入交代事实背景与战略博弈。',
    '',
    '## 📰 国际核心要闻全景深度编译',
    '',
    '::::grid{cols=2}'
  ];
  const worldSelected = (worldStories.length > 0 ? worldStories : topStories.filter((s) => s.category === 'world' || s.dimension === 'geopolitics')).slice(0, 20);
  for (const s of worldSelected) {
    worldLines.push(renderArticleCard(s));
  }
  worldLines.push('::::');
  fs.writeFileSync(path.join(pagesDir, 'world.md'), worldLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 7. 渲染 markets.md (商业金融，order: 3) —— 频道工作台保底，杜绝空白！
  // -------------------------------------------------------------
  const marketsLines = [
    '---',
    'title: "商业金融"',
    'nav: true',
    'order: 3',
    'description: "全球资本市场、大宗商品、半导体供应链与宏观经济指标跟踪"',
    'notice:',
    '  text: "📈 覆盖 WSJ、CNBC、MarketWatch、FT、OilPrice 等全球主流财经与资本脉动" ',
    '  color: "theme"',
    '---',
    '',
    '# 💹 全球商业、金融与产业资本深度简报',
    '',
    '实时监测华尔街日报、CNBC、MarketWatch、金融时报等顶级财经媒体，追踪大宗原油、汇率、芯片供应链与宏观央行政策信号。',
    '',
    '## 📰 商业资本核心要闻深度编译',
    '',
    '::::grid{cols=2}'
  ];
  const financeSelected = (
    financeStories.length > 0
      ? financeStories
      : topStories.filter((s) => s.category === 'finance' || s.dimension === 'macro-markets' || s.dimension === 'energy-climate')
  ).slice(0, 18);

  // 频道保底安全守卫：如果 finance 依然不足，借调相关宏观报道，绝对杜绝页面留白！
  const finalFinance = financeSelected.length >= 6
    ? financeSelected
    : selectPublishableStories([...financeSelected, ...topStories], 16);

  for (const s of finalFinance) {
    marketsLines.push(renderArticleCard(s));
  }
  marketsLines.push('::::');
  fs.writeFileSync(path.join(pagesDir, 'markets.md'), marketsLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 8. 渲染 archive.md (历史情报归档库，order: 7)
  // -------------------------------------------------------------
  const archiveLines = [
    '---',
    'title: "历史情报归档"',
    'nav: true',
    'order: 7',
    'description: "InfoLive 历史全球情报速报与逐小时事件档案库"',
    'notice:',
    '  text: "🗄️ 全库数据永久归档持久留存 · 集成全文检索，按键盘 Ctrl+K 可直接检索历史记录" ',
    '  color: "theme"',
    '---',
    '',
    '# 🗃️ 历史情报归档与回溯中心',
    '',
    ':::tip',
    '💡 **历史检索指南**：本站所有历史简报与事件记录均已建立永久档案，并生成静态全文索引。按下快捷键 <kbd>Ctrl+K</kbd>（Mac: <kbd>Cmd+K</kbd>）或点击右上角搜索放大镜图标，输入任意关键词（如“普京”、“DeepSeek”、“原油”、“阿布扎比”等），即可在毫秒级内检索全库历史记录。',
    ':::',
    '',
    '## 📅 按日期查询完整历史',
    '',
  ];
  for (const date of dailyDates) {
    archiveLines.push(`- [${date} · ${date === timeInfo.dateOnly ? '今日' : '历史快照'}](${sitePath(`archive-${date}/`)})`);
  }
  archiveLines.push('',
    '## 📊 历史数据概览',
    '',
    `- **归档快照总数**：当前已永久存盘 **${archive.length}** 个时间节点快照`,
    '- **数据持久化策略**：永久追加留存，不设删除上限；同时按日持久化存储在 `data/history/daily/` 目录下',
    `- **首条归档时间**：${archive[archive.length - 1]?.timeDisplay || '2026-09-09 22:08 (UTC+8)'}`,
    `- **最新归档时间**：${timeInfo.display}`,
    '',
    '## 📅 逐小时情报快照历史时间轴',
    '',
    '::::timeline{title="历史简报时间轴"}'
  );

  for (const snap of archive.slice(0, 48)) {
        const snapTime = snap.timeDisplay || snap.date || '实时';
    const hourPart = snapTime.includes(' ') ? snapTime.split(' ')[1] : snapTime;
    archiveLines.push(`:::timeline-item{start="${snapTime}" title="全球要闻情报简报 · ${hourPart}" org="ARCHIVE"}`);
    archiveLines.push(`**速报纪要：** ${snap.hourlyBriefing?.lead || '全球多源监控全景简报。'}`);
    archiveLines.push('');
    if (snap.hourlyBriefing?.signals && snap.hourlyBriefing.signals.length > 0) {
      archiveLines.push(`**关键信号：** ${snap.hourlyBriefing.signals.map((signal) => safeChineseEditorialText(signal)).join('；')}`);
      archiveLines.push('');
    }
    if (snap.topStories && snap.topStories.length > 0) {
      archiveLines.push('**重点要闻索引：**');
      for (const st of snap.topStories.slice(0, 6)) {
        const archiveTitle = hasReadableChineseTitle(st) ? st.title : '外文信源标题正在进行中文翻译，暂不展示未翻译标题';
        archiveLines.push(`- [${st.source}] [${archiveTitle}](${cleanUrl(st.url)}) <span class="news-meta-time">🕒 ${st.pubTime || ''}</span>`);
      }
    }
    archiveLines.push(':::');
  }
  archiveLines.push('::::');
  fs.writeFileSync(path.join(pagesDir, 'archive.md'), archiveLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 9. 渲染 sources.md (信源矩阵，order: 8)
  // -------------------------------------------------------------
  const sourcesLines = [
    '---',
    'title: "信源矩阵"',
    'nav: true',
    'order: 8',
    'description: "InfoLive 接入的全球 55+ 权威通讯社、国际组织与专业前沿数据源"',
    '---',
    '',
    '# 📡 全球全源监控信源注册表',
    '',
    '本平台全天候实时接入全球各国国家通讯社、主流大国旗舰媒体、前沿AI研究实验室、金融证券行情网络与同行评议科学期刊。严格使用各国官方原版母语电讯，杜绝二次翻译版本：',
    '',
    '| 信源名称 | 官方主语言 | 领域权重 | 本轮状态 | 官方出处与数据通道 |',
    '| :--- | :---: | :---: | :---: | :--- |'
  ];

  const sourceHealthByUrl = new Map(sourceHealth.map((item) => [item.url, item]));
  for (const src of SOURCES) {
    const health = sourceHealthByUrl.get(src.url);
    const status = health?.ok
      ? `✅ ${health.itemCount} 条`
      : health?.error
        ? `⚠️ ${escapeHtml(health.error.slice(0, 80))}`
        : '⏳ 未检查';
    sourcesLines.push(`| ${renderSourceBadge(src.name, src.slug)} | \`${src.lang || 'en'}\` | ⭐ ${src.weight}/10 | ${status} | [直达官方一手源网 ↗](${src.url}) |`);
  }
  fs.writeFileSync(path.join(pagesDir, 'sources.md'), sourcesLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 10. 渲染 about.md (关于项目，order: 9) —— 官方 ::ghcard 仓库卡片！
  // -------------------------------------------------------------
  const aboutLines = [
    '---',
    'title: "关于项目"',
    'nav: true',
    'order: 9',
    'description: "InfoLive 架构设计、开源代码仓库与自动化工作流说明"',
    '---',
    '',
    '# ℹ️ 关于 InfoLive 全球情报矩阵',
    '',
    '**InfoLive** 是一个开源、全自动、由前沿大模型驱动的全球全源信息流与实时要闻矩阵平台。',
    '',
    `<div class="infolive-project-logo"><img class="infolive-logo-light" src="${sitePath('assets/infolive-logo.svg')}" alt="InfoLive Global Signal Matrix 项目 Logo" width="920" height="240" loading="eager" /><img class="infolive-logo-dark" src="${sitePath('assets/infolive-logo-dark.svg')}" alt="" aria-hidden="true" width="920" height="240" loading="eager" /></div>`,
    '',
    '## 🚀 官方开源代码仓库',
    '',
    renderRepoShowcaseCard(),
    '',
    '欢迎访问我们的官方 GitHub 仓库，给项目点亮 🌟 Star、提交 Issue 反馈或发起 Pull Request 协作共建！',
    '',
    '## 🏗️ 核心设计哲学与特色体系',
    '- **原生官方语言信源保障**：严格接入各国通讯社与旗舰媒体的原版母语电讯（俄新社官方俄文、法新社官方法文、BBC 官方英文、DW 官方德文、半岛官方阿拉伯文等），杜绝二次加工编译。',
    '- **外文标题全量翻译与原文保留**：所有外文标题统一精译为高质量目标语言中文，同时在副标题完整保留原始外语标题，兼顾可读性与情报真实可溯度。',
    '- **频道工作台（Channel Desks）架构**：设立国际地缘、商业金融、AI前沿、社会思潮、深空科学等专属频道，全量深度编译，坚决杜绝页面空白。',
    '- **跨 Actions 话题生命周期管理**：AI 自主立项全球重大专题，跨自动化运行周期持续扩充时间轴节点、增量迭代战略研判，并在事态平息后阶段性归档。',
    '- **全篇全量深度编译**：每篇核心报道提供 400-800 字的背景脉络、各方表态与核心研判，嵌入新闻原图，非简单链接聚合。',
    '- **真实新闻发布时间标记**：卡片与快讯流标注新闻本身的真实发布时间（`pubTime`），保障情报的时间序列真实度。',
    '- **日尺度与时尺度双重视角**：既有时尺度的秒级要闻与突发演进追踪，又有日尺度的 24 小时全球宏观大势与底层结构性转变深度复盘。',
    '- **永久持久化历史回溯**：历史快照与要闻简报永久存储在仓库中，支持按日期和关键词通过静态全文搜索（<kbd>Ctrl+K</kbd>）随时毫秒级查阅。',
    '- **24/7 全自动无人值守**：基于 GitHub Actions 自动化调度与静态网站生成技术，实现每小时自动抓取、智能提炼、自动构建与全球 CDN 部署。',
    '',
    '## 🛠️ 本地运行与开发',
    '',
    '```bash',
    '# 1. 克隆代码仓库',
    'git clone https://github.com/stlin256/INFO-LIVE.git',
    'cd INFO-LIVE',
    '',
    '# 2. 安装依赖',
    'npm install',
    '',
    '# 3. 运行本地开发服务器',
    'npm run dev',
    '',
    '# 4. 手动触发一次情报抓取与 AI 提炼',
    'node scripts/feed-engine.mjs',
    '',
    '# 5. 构建全量静态网站',
    'npm run build',
    '```',
    '',
    '## 🤝 开源致谢与底层驱动',
    '- **前端框架**：基于开源项目 [OpenHomepage V2](https://github.com/stlin256/OpenHomepage-V2) 驱动，遵循极简、优雅的静态杂志化设计规范。',
    '- **智能模型**：采用可配置主模型与 `gpt-5.6-luna` 备用模型；主模型失效时自动切换，持续完成跨语言深度编译与结构化综合研判。',
    '- **品牌系统**：InfoLive 使用独立的雷达信号项目 Logo、favicon 与支持 HDR 宽色域高光的页脚 Logo。',
    '- **代码授权**：本项目采用 [MIT License](https://github.com/stlin256/INFO-LIVE/blob/master/LICENSE) 协议开源。'
  ];
  fs.writeFileSync(path.join(pagesDir, 'about.md'), aboutLines.join('\n'), 'utf8');

  // -------------------------------------------------------------
  // 11. 保存结构化数据快照 feed-data.json
  // -------------------------------------------------------------
  const feedDataFile = path.resolve('data/feed-data.json');
  writeJsonAtomic(feedDataFile, {
    timestamp: timeInfo.timestamp,
    timeDisplay: timeInfo.display,
    hourlyBriefing: hourly,
    dailyBriefing: daily,
    specialTopics: activeTopics,
    perspectiveMatrix,
    socialTrends: trends,
    topStories,
    sourceOnlyStories: topStoryCandidates.filter((story) => !isPublishableArticle(story)),
    worldStories,
    financeStories: finalFinance,
    aiStories,
    trendStories,
    ticker,
    sourceHealth,
  });

  console.log('[SiteWriter] Generated all pages and saved data/feed-data.json successfully!');
}

export const writeSiteContent = writeSiteData;
