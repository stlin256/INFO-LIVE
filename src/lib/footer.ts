/**
 * 页脚（spec 01 §footer）：默认开启（footer.enabled 显式 false 才关闭），
 * 文本支持内联 markdown 链接 [label](url)（轻量解析 + sanitize：仅 http(s)/mailto，
 * 其余原样输出转义文本）。默认内容为 InfoLive 品牌页脚标识（带仓库链接）。
 */
import { escapeHtml } from './html.ts';
import type { LocalizedText, SiteConfig } from './config.ts';

export const FOOTER_REPO_URL = 'https://github.com/stlin256/INFO-LIVE';

/** 默认页脚内容（常用语言）：InfoLive 品牌链接到项目仓库；未列语言经 resolveText 回退英文 */
export const DEFAULT_FOOTER_TEXT: Record<string, string> = {
  zh: `[InfoLive](${FOOTER_REPO_URL}) · 全球情报矩阵`,
  en: `Powered by [InfoLive](${FOOTER_REPO_URL}) · Global Signal Matrix`,
  ja: `[InfoLive](${FOOTER_REPO_URL}) · グローバル・シグナル・マトリクス`,
  fr: `[InfoLive](${FOOTER_REPO_URL}) · Matrice mondiale des signaux`,
  de: `[InfoLive](${FOOTER_REPO_URL}) · Globale Signalmatrix`,
  es: `[InfoLive](${FOOTER_REPO_URL}) · Matriz global de señales`,
  ko: `[InfoLive](${FOOTER_REPO_URL}) · 글로벌 시그널 매트릭스`,
  pt: `[InfoLive](${FOOTER_REPO_URL}) · Matriz global de sinais`,
  ru: `[InfoLive](${FOOTER_REPO_URL}) · Глобальная матрица сигналов`,
  it: `[InfoLive](${FOOTER_REPO_URL}) · Matrice globale dei segnali`,
  nl: `[InfoLive](${FOOTER_REPO_URL}) · Globale signaalmatrix`,
  tr: `[InfoLive](${FOOTER_REPO_URL}) · Küresel sinyal matrisi`,
  vi: `[InfoLive](${FOOTER_REPO_URL}) · Ma trận tín hiệu toàn cầu`,
  th: `[InfoLive](${FOOTER_REPO_URL}) · เมทริกซ์สัญญาณโลก`,
  id: `[InfoLive](${FOOTER_REPO_URL}) · Matriks sinyal global`,
  ar: `[InfoLive](${FOOTER_REPO_URL}) · مصفوفة الإشارات العالمية`,
  hi: `[InfoLive](${FOOTER_REPO_URL}) · ग्लोबल सिग्नल मैट्रिक्स`,
};

/**
 * 页脚配置归一化：footer 段缺失 / enabled 未显式 false → 开启；
 * text 缺省 → 默认内容。显式 enabled:false → null（不渲染）。
 */
export function resolveFooter(site: SiteConfig): { text: LocalizedText } | null {
  const f = site.footer;
  if (f && f.enabled === false) return null;
  const text = f?.text;
  return { text: typeof text === 'string' || (text && typeof text === 'object') ? text : DEFAULT_FOOTER_TEXT };
}

/** 内联链接语法：[label](url)；url 不允许空白/右括号 */
const LINK_RE = /\[([^\]]*)\]\(([^)\s]*)\)/g;

/** 允许的链接协议（防 javascript:/data: 注入） */
const SAFE_HREF_RE = /^(https?:\/\/|mailto:)/i;

/**
 * 页脚文本 → HTML：整体转义，仅把合法的 [label](http…|mailto:…) 转为
 * <a target="_blank" rel="noopener">；危险协议与不完整语法原样保留为文本。
 */
export function footerTextToHtml(text: string): string {
  let out = '';
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const idx = m.index ?? 0;
    out += escapeHtml(text.slice(last, idx));
    const [, label, url] = m;
    if (url && SAFE_HREF_RE.test(url)) {
      if (label === 'InfoLive' || label === 'InfoLive Global Signal Matrix' || label === 'InfoLive 全球情报矩阵') {
        out += `<a href="${escapeHtml(url)}" target="_blank" rel="noopener" class="footer-brand footer-brand-infolive" aria-label="InfoLive Global Signal Matrix"><svg class="footer-brand-mark" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="footer-live-signal" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#35d6d2"/><stop offset=".58" stop-color="#74f0d5"/><stop offset="1" stop-color="#ffb454"/></linearGradient></defs><path d="M7 31a17 17 0 0 1 34 0M12 31a12 12 0 0 1 24 0M17 31a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-opacity=".32" stroke-width="2.2" stroke-linecap="round"/><path d="M24 31V10M24 31l14-12" fill="none" stroke="url(#footer-live-signal)" stroke-width="2.8" stroke-linecap="round"/><circle cx="24" cy="31" r="3.2" fill="currentColor"/><circle cx="38" cy="19" r="2.4" fill="#ffb454"/></svg><span class="footer-brand-wordmark">InfoLive</span><span class="footer-brand-signal">GLOBAL SIGNAL</span></a>`;
      } else if (label === 'OpenHomepage-V2' || label === 'OpenHomepage V2') {
        out += `<a href="${escapeHtml(url)}" target="_blank" rel="noopener" class="footer-brand">OpenHomepage <span class="footer-brand-v2">V2</span></a>`;
      } else {
        out += `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
      }
    } else {
      out += escapeHtml(m[0]);
    }
    last = idx + m[0].length;
  }
  return out + escapeHtml(text.slice(last));
}
