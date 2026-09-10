import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

function filesUnder(dir, suffix = '') {
  const result = [];
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...filesUnder(file, suffix));
    else if (!suffix || file.endsWith(suffix)) result.push(file);
  }
  return result;
}

const distDir = path.resolve(process.env.DIST_DIR || 'dist');
const htmlFiles = filesUnder(distDir, '.html').sort();
const hash = crypto.createHash('sha256');
for (const file of htmlFiles) {
  const relative = path.relative(distDir, file).replace(/\\/g, '/');
  hash.update(relative);
  hash.update('\0');
  hash.update(fs.readFileSync(file));
  hash.update('\0');
}
let feedData = {};
try { feedData = JSON.parse(fs.readFileSync(path.resolve('data/feed-data.json'), 'utf8')); } catch { /* manifest still records build identity */ }
const sha = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || `local-${Date.now()}`;
const manifest = {
  schemaVersion: 1,
  buildId: `${sha}:${runId}`,
  commitSha: sha,
  workflowRunId: process.env.GITHUB_RUN_ID || null,
  feedRunId: feedData.orchestration?.runId || null,
  generatedAt: new Date().toISOString(),
  contentHash: hash.digest('hex'),
  htmlFiles: htmlFiles.length,
};
fs.writeFileSync(path.join(distDir, 'deploy-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`[deploy-manifest] ${manifest.buildId} ${manifest.contentHash} (${manifest.htmlFiles} HTML files)`);
