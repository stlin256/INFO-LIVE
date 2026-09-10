import fs from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';

export const REQUIRED_ROUTES = ['index.html', 'ai/index.html', 'world/index.html', 'markets/index.html', 'trends/index.html'];
// These pages do not contain article cards, but they are still user-facing
// build outputs. Keeping them out of the deployment probe meant a broken
// archive/About/source page could ship while the five news routes passed.
export const SUPPORTING_ROUTES = ['archive/index.html', 'about/index.html', 'sources/index.html'];
export const VERIFIED_ROUTES = [...REQUIRED_ROUTES, ...SUPPORTING_ROUTES];
export const MIN_HOME_CARDS = 8;
export const MIN_TRANSLATION_CHARS = 240;
export const MIN_TRANSLATION_PARAGRAPHS = 1;
export const MIN_PAGE_TEXT_CHARS = 40;

function deploymentBasePrefix() {
  const configured = process.env.ASTRO_BASE
    || (process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY
      ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
      : '');
  return String(configured || '').replace(/\/+$/, '');
}

const GENERIC_PLACEHOLDERS = [
  '关键决策主体已围绕核心诉求采取了实质性动作',
  '不同立场的报道选词与叙事重心的鲜明反差',
  '传统安全缓冲带与供应链韧性正面临极其严峻的现实压力测试',
];

function chineseCharacterCount(text) {
  return (String(text || '').match(/[\u3400-\u4dbf\u4e00-\u9fff]/g) || []).length;
}

function isChineseReadable(text) {
  const value = String(text || '').replace(/\s+/g, ' ').trim();
  const chinese = chineseCharacterCount(value);
  const latin = (value.match(/[A-Za-z]/g) || []).length;
  return chinese >= 20 && (latin < 120 || chinese / Math.max(1, chinese + latin) >= 0.16);
}

const INCOMPLETE_TRANSLATION_MARKERS = [
  /(?:阅读|查看|参见|请前往).{0,24}(?:全文|原文|完整报道)/i,
  /(?:read|continue|view)\s+(?:the\s+)?(?:full|complete)\s+(?:story|article|report)|read\s+more/i,
];

function describeCard(card, route) {
  const header = card.querySelector('.news-card-header');
  const title = card.querySelector('h3')?.textContent?.trim().replace(/#$/, '') || '(无标题)';
  const source = header?.querySelector('.source-badge')?.textContent?.trim() || '(未知信源)';
  const bodyRoot = card.querySelector('[data-article-body="true"]') || card;
  const bodyNodes = [...bodyRoot.querySelectorAll('p, li, blockquote')];
  const body = (bodyNodes.length > 0
    ? bodyNodes.map((node) => node.textContent?.trim() || '').filter(Boolean).join('\n\n')
    : bodyRoot.textContent?.trim() || '');
  const actualParagraphs = bodyNodes.length || body.split(/\n\s*\n/).filter(Boolean).length;
  return {
    route,
    title,
    source,
    url: card.querySelector('h3 a')?.getAttribute('href') || '',
    body,
    contentStatus: header?.dataset.contentStatus || '',
    translationStatus: header?.dataset.translationStatus || '',
    contentLength: body.length,
    declaredContentLength: Number(header?.dataset.contentLength || 0),
    contentParagraphs: actualParagraphs,
    declaredContentParagraphs: Number(header?.dataset.contentParagraphs || 0),
    sourceLang: header?.dataset.sourceLang || '',
    contentKind: header?.dataset.contentKind || '',
  };
}

function pageText(doc) {
  const root = (doc.querySelector('main') || doc.body)?.cloneNode(true);
  if (!root) return '';
  root.querySelectorAll('script, style, noscript, template').forEach((node) => node.remove());
  return (root.textContent || '').replace(/\s+/g, ' ').trim();
}

export function inspectHtml(html, route = 'index.html', { strictHome = route === 'index.html', strictAll = false, expectedBasePrefix = '', requireCards = true } = {}) {
  const doc = new JSDOM(String(html)).window.document;
  const issues = [];
  const cards = [...doc.querySelectorAll('.md-grid-cell')].filter((card) => card.querySelector('.news-card-header'));
  if (requireCards && cards.length === 0) issues.push(route + ': 未找到文章卡片');
  if (strictHome && cards.length < MIN_HOME_CARDS) issues.push(route + ': 首页文章卡片不足（' + cards.length + ' < ' + MIN_HOME_CARDS + '）');
  const ids = new Set();
  for (const card of cards) {
    const item = describeCard(card, route);
    const header = card.querySelector('.news-card-header');
    const hasMetadata = Boolean(header?.dataset.contentStatus && header?.dataset.translationStatus && header?.dataset.contentSource && header?.dataset.contentKind && header?.dataset.timeSource === 'publication' && header?.hasAttribute('data-published-at'));
    const isSummaryOnly = item.contentKind === 'rss-summary';
    const isShort = isSummaryOnly
      || item.contentStatus !== 'full'
      || item.translationStatus !== 'full'
      || item.contentLength < MIN_TRANSLATION_CHARS
      || item.contentParagraphs < MIN_TRANSLATION_PARAGRAPHS;
    if (strictAll && !hasMetadata) issues.push(route + ': 文章缺少内容状态元数据：' + item.title);
    if (strictAll && isSummaryOnly) issues.push(route + ': 文章仍为 RSS 摘要，不能作为核心全文发布：' + item.title);
    if (strictAll && (!header?.dataset.publishedAt || Number.isNaN(Date.parse(header.dataset.publishedAt)))) {
      issues.push(route + ': 缺少可解析的新闻发布时间（不是抓取时间）：' + item.title);
    }
    const anchor = card.querySelector('.story-anchor[id]');
    if (anchor?.id) {
      if (ids.has(anchor.id)) issues.push(route + ': 文章锚点重复：#' + anchor.id);
      ids.add(anchor.id);
    }
    if ((strictHome || strictAll) && isShort) {
      issues.push(route + ': 正文门禁失败：' + item.title + ' | source=' + item.source + ' | status=' + item.contentStatus + '/' + item.translationStatus + ' | chars=' + item.contentLength + ' | paragraphs=' + item.contentParagraphs + ' | url=' + item.url);
    }
    if (item.translationStatus === 'source-only' && !card.querySelector('[data-content-warning="true"]')) {
      issues.push(route + ': source-only 卡片缺少明确降级提示：' + item.title);
    }
    if (item.url && !/^https?:\/\//i.test(item.url)) issues.push(route + ': 文章官方链接无效：' + item.title + ' | url=' + item.url);
    for (const phrase of GENERIC_PLACEHOLDERS) {
      if (item.body.includes(phrase)) issues.push(route + ': 检测到模板化伪正文：' + item.title + ' | phrase=' + phrase);
    }
    if (strictAll && item.sourceLang && item.sourceLang !== 'zh' && chineseCharacterCount(item.title) < 2) {
      issues.push(route + ': 外文文章标题没有中文翻译：' + item.title);
    }
    if (strictAll && item.sourceLang && item.sourceLang !== 'zh' && !isChineseReadable(item.body)) {
      issues.push(route + ': 外文文章译文疑似未翻译或不完整为中文：' + item.title);
    }
    if (strictAll && INCOMPLETE_TRANSLATION_MARKERS.some((pattern) => pattern.test(item.body))) {
      issues.push(route + ': 译文疑似被截断或仍是“请阅读全文”占位：' + item.title);
    }
    if (isShort && /全篇|深度编译|完整专题报告/.test(card.textContent || '') && strictAll) {
      issues.push(route + ': 短正文卡片仍宣称全篇/深度编译：' + item.title);
    }
  }
  for (const link of doc.querySelectorAll('a[href^="#"]')) {
    const target = link.getAttribute('href')?.slice(1) || '';
    if (target && target !== 'footnote-label' && !doc.getElementById(target)) issues.push(route + ': 内部跳转目标不存在：#' + target);
  }
  const emptyCells = [...doc.querySelectorAll('.md-grid-cell')].filter((cell) => !(cell.textContent || '').trim());
  if (emptyCells.length) issues.push(route + ': 存在空白内容单元格（' + emptyCells.length + '）');
  if (pageText(doc).length < MIN_PAGE_TEXT_CHARS) issues.push(route + ': 页面正文为空或过短');
  if (expectedBasePrefix) {
    const prefix = expectedBasePrefix.endsWith('/') ? expectedBasePrefix : `${expectedBasePrefix}/`;
    for (const element of doc.querySelectorAll('[src^="/"], [href^="/"]')) {
      const attribute = element.hasAttribute('src') ? 'src' : 'href';
      const value = element.getAttribute(attribute) || '';
      if (value && value !== '/' && !value.startsWith(prefix) && !value.startsWith('//')) {
        issues.push(route + ': 站内资源/链接缺少部署 base 前缀：' + attribute + '=' + value);
      }
    }
  }
  return { route, cards: cards.map((card) => describeCard(card, route)), issues };
}

export async function verifyDist(distDir = 'dist', { strictHome = true } = {}) {
  const reports = [];
  const issues = [];
  for (const route of VERIFIED_ROUTES) {
    const file = path.join(distDir, route);
    let html;
    try { html = await fs.readFile(file, 'utf8'); }
    catch { issues.push(route + ': 构建产物缺失：' + file); continue; }
    const isArticleRoute = REQUIRED_ROUTES.includes(route);
    const report = inspectHtml(html, route, {
      strictHome: strictHome && route === 'index.html',
      strictAll: isArticleRoute,
      requireCards: isArticleRoute,
      expectedBasePrefix: deploymentBasePrefix(),
    });
    reports.push(report); issues.push(...report.issues);
  }
  const result = { ok: issues.length === 0, issues, reports };
  if (!result.ok) throw new Error(formatVerificationError(result));
  return result;
}

export async function verifyRemote(url, { fetchImpl = fetch, retries = 12, delayMs = 5000, strictHome = true } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchImpl(url, { headers: { 'User-Agent': 'InfoLive-Content-Verification/1.0', Accept: 'text/html' } });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const report = inspectHtml(await response.text(), 'remote:' + url, { strictHome, strictAll: true, expectedBasePrefix: new URL(url).pathname.replace(/index\.html$/, '').replace(/\/$/, '') });
      if (report.issues.length === 0) return { ok: true, attempts: attempt, report };
      lastError = new Error(formatVerificationError({ issues: report.issues }));
    } catch (error) { lastError = error instanceof Error ? error : new Error(String(error)); }
    if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  throw lastError || new Error('远程内容验证失败');
}

export async function verifyRemoteSite(baseUrl, { fetchImpl = fetch, retries = 12, delayMs = 5000, strictHome = true, expectedBuildId = '', expectedContentHash = '' } = {}) {
  const base = String(baseUrl || '').replace(/\/+$/, '') + '/';
  let lastResult;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const reports = [];
    const issues = [];
    if (expectedBuildId || expectedContentHash) {
      try {
        const manifestUrl = `${base}deploy-manifest.json?verify=${encodeURIComponent(expectedBuildId || expectedContentHash)}`;
        const manifestResponse = await fetchImpl(manifestUrl, { headers: { 'User-Agent': 'InfoLive-Content-Verification/1.0', Accept: 'application/json', 'Cache-Control': 'no-cache' } });
        if (!manifestResponse.ok) throw new Error('HTTP ' + manifestResponse.status);
        const manifest = await manifestResponse.json();
        if (expectedBuildId && manifest.buildId !== expectedBuildId) issues.push(manifestUrl + ': build identity mismatch (expected ' + expectedBuildId + ', got ' + (manifest.buildId || '(missing)') + ')');
        if (expectedContentHash && manifest.contentHash !== expectedContentHash) issues.push(manifestUrl + ': content hash mismatch');
      } catch (error) {
        issues.push(base + 'deploy-manifest.json: 请求失败：' + (error instanceof Error ? error.message : String(error)));
      }
    }
    for (const route of VERIFIED_ROUTES) {
      const target = base + route;
      try {
        const response = await fetchImpl(target, { headers: { 'User-Agent': 'InfoLive-Content-Verification/1.0', Accept: 'text/html' } });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const isArticleRoute = REQUIRED_ROUTES.includes(route);
        const report = inspectHtml(await response.text(), 'remote:' + target, {
          strictHome: strictHome && route === 'index.html',
          strictAll: isArticleRoute,
          requireCards: isArticleRoute,
          expectedBasePrefix: new URL(base).pathname.replace(/\/$/, ''),
        });
        reports.push(report);
        issues.push(...report.issues);
      } catch (error) {
        issues.push(target + ': 请求失败：' + (error instanceof Error ? error.message : String(error)));
      }
    }
    lastResult = { ok: issues.length === 0, attempts: attempt, reports, issues };
    if (lastResult.ok) return lastResult;
    if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  throw new Error(formatVerificationError(lastResult || { issues: ['远程内容验证失败'] }));
}

export function formatVerificationError(result) {
  return ['Content verification failed:', ...(result.issues || []).map((issue) => ' - ' + issue)].join('\n');
}

if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('/verify-content.mjs')) {
  const args = process.argv.slice(2);
  const urlIndex = args.indexOf('--url');
  const distIndex = args.indexOf('--dist');
  try {
    if (urlIndex >= 0) {
      const url = args[urlIndex + 1];
      const retryIndex = args.indexOf('--retries');
      const delayIndex = args.indexOf('--delay');
      const buildIndex = args.indexOf('--build-id');
      const hashIndex = args.indexOf('--content-hash');
      await verifyRemoteSite(url, { retries: retryIndex >= 0 ? Number(args[retryIndex + 1]) : 12, delayMs: delayIndex >= 0 ? Number(args[delayIndex + 1]) : 5000, expectedBuildId: buildIndex >= 0 ? args[buildIndex + 1] : '', expectedContentHash: hashIndex >= 0 ? args[hashIndex + 1] : '' });
      console.log('[verify-content] remote passed: ' + url);
    } else {
      const dir = distIndex >= 0 ? args[distIndex + 1] : 'dist';
      const result = await verifyDist(dir);
      console.log('[verify-content] dist passed: ' + result.reports.reduce((sum, report) => sum + report.cards.length, 0) + ' cards');
    }
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
