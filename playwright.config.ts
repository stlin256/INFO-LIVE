// 最小 e2e 冒烟集：Playwright 直出已构建的 dist/（e2e/serve-dist.ts 静态服务）。
// 运行前需先构建：`npx tsx scripts/generate-fonts.ts && npx astro build`（或完整 `npm run build`）。
// baseURL 会从 ASTRO_BASE 或已构建的 dist/ 资源路径推断，根路径与 GitHub Pages 子路径均可冒烟。
import { defineConfig, devices } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';

// 必须先于浏览器启动：浏览器二进制定位到 node_modules 内（同 scripts/screenshots.ts 约定）
process.env.PLAYWRIGHT_BROWSERS_PATH ??= '0';

function detectBasePath() {
  if (process.env.ASTRO_BASE) return process.env.ASTRO_BASE;
  try {
    if (!existsSync('dist/index.html')) return '/';
    const html = readFileSync('dist/index.html', 'utf8');
    const match = html.match(/(?:src|href)="(\/[^/]+)\/_astro\//);
    return match?.[1] ? `${match[1]}/` : '/';
  } catch {
    return '/';
  }
}

const basePath = detectBasePath();
const baseURL = `http://127.0.0.1:4173${basePath === '/' ? '/' : basePath.replace(/\/?$/, '/')}`;

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html']] : [['list']],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    // 钉住浏览器语言，避免首访语言探测把 / 重定向到 /en/ 造成用例不确定性
    locale: 'zh-CN',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx tsx e2e/serve-dist.ts',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
