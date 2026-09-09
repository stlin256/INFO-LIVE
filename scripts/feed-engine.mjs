/**
 * InfoLive Main Orchestration Engine
 */
import fs from 'node:fs';
import path from 'node:path';
import { SOURCES } from './sources.mjs';
import { fetchAllFeeds } from './fetcher.mjs';
import { summarizeWithAI } from './ai-summarizer.mjs';
import { writeSiteContent } from './site-writer.mjs';

function ensureGithubCache() {
  const cacheDir = path.resolve('.cache');
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
  const ghFile = path.join(cacheDir, 'github.json');
  let ghData = {};
  if (fs.existsSync(ghFile)) {
    try {
      ghData = JSON.parse(fs.readFileSync(ghFile, 'utf8'));
    } catch {
      ghData = {};
    }
  }
  // 保证 pinned 包含官方仓库，使 ::ghcard 在任何环境下（含 CI）均 100% 渲染为完整 GitHub 仓库卡
  ghData.pinned = {
    data: [
      {
        name: 'INFO-LIVE',
        full_name: 'stlin256/INFO-LIVE',
        description: 'InfoLive | 全球全源信息流与 AI 实时要闻矩阵 (Powered by OpenHomepage V2)',
        html_url: 'https://github.com/stlin256/INFO-LIVE',
        homepage: 'https://stlin256.github.io/INFO-LIVE',
        language: 'TypeScript',
        stargazers_count: 5,
        forks_count: 1,
        topics: ['intelligence', 'news-matrix', 'ai-native', 'openhomepage', 'astro'],
        updated_at: new Date().toISOString()
      }
    ],
    fetched_at: Date.now(),
    error: null,
    failed_at: null
  };
  fs.writeFileSync(ghFile, JSON.stringify(ghData, null, 2), 'utf8');
}

export async function main() {
  console.log('====================================');
  console.log('    InfoLive Intelligence Engine    ');
  console.log('====================================');
  ensureGithubCache();
  const rawItems = await fetchAllFeeds(SOURCES);
  console.log('[Main] Raw items fetched: ' + rawItems.length);
  const summary = await summarizeWithAI(rawItems);
  await writeSiteContent(summary, rawItems);
  console.log('[Main] Pipeline finished successfully!');
}

main().catch((err) => {
  console.error('[Main] Fatal execution error:', err);
  process.exit(1);
});
