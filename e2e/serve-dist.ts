// e2e 冒烟专用静态服务：固定 127.0.0.1:4173 直出 dist/。
// 复用 scripts/serve.ts 的 createStaticServer（防穿越/MIME/缓存头均已单测覆盖），
// 不引入 astro preview（CI 上曾有 webServer 探测超时的不确定性）。
import { createStaticServer } from '../scripts/serve.ts';
import { readFileSync } from 'node:fs';

function detectBasePath() {
  if (process.env.ASTRO_BASE) return process.env.ASTRO_BASE;
  try {
    const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
    const match = html.match(/(?:src|href)="(\/[^/]+)\/_astro\//);
    return match?.[1] ? `${match[1]}/` : '/';
  } catch {
    return '/';
  }
}

const server = createStaticServer({ secure: false, port: 4173, warnings: [] }, undefined, detectBasePath());
server.listen(4173, '127.0.0.1', () => {
  console.log('e2e static server: http://127.0.0.1:4173/');
});
const shutdown = () => server.close(() => process.exit(0));
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
