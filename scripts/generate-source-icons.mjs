import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'public', 'assets', 'sources');
fs.mkdirSync(dir, { recursive: true });

function badge(bg, text, opts = {}) {
  const fg = opts.fg || '#FFFFFF';
  const fz = opts.fz || 32;
  const tx = opts.tx || 50;
  const ty = opts.ty || 64;
  const font = opts.font || 'system-ui, -apple-system, sans-serif';
  const fw = opts.fw || 'bold';
  const ls = opts.ls || '0';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="${bg}"/><text x="${tx}" y="${ty}" fill="${fg}" font-family="${font}" font-weight="${fw}" font-size="${fz}" text-anchor="middle" letter-spacing="${ls}">${text}</text></svg>`;
}

const map = {
  reuters: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#FF8000"/><circle cx="50" cy="50" r="32" fill="none" stroke="#FFF" stroke-width="6" stroke-dasharray="10 6"/><circle cx="50" cy="50" r="14" fill="#FFF"/></svg>`,
  bbc: badge('#BB1919', 'BBC', { fz: 32, fw: '900', ls: '2' }),
  ap: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#111"/><rect x="15" y="68" width="70" height="6" fill="#ED1B2D"/><text x="50" y="60" fill="#FFF" font-family="sans-serif" font-weight="900" font-size="42" text-anchor="middle">AP</text></svg>`,
  hackernews: badge('#FF6600', 'Y', { fz: 56, ty: 68 }),
  bloomberg: badge('#1D1D1D', 'B', { fz: 52, ty: 68, fw: '900' }),
  nytimes: badge('#000000', 'T', { fz: 60, ty: 72, font: 'Georgia, serif' }),
  wsj: badge('#0A1C2A', 'WSJ', { fz: 32, font: 'Times New Roman, serif', ls: '1' }),
  zaobao: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#C8161D"/><circle cx="50" cy="50" r="28" fill="#FFF"/><circle cx="50" cy="50" r="22" fill="#C8161D"/><path d="M36 50 Q50 32 64 50 Q50 68 36 50 Z" fill="#FFF"/></svg>`,
  xinhua: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#DE2910"/><circle cx="50" cy="50" r="32" fill="none" stroke="#FFDE00" stroke-width="4"/><text x="50" y="62" fill="#FFDE00" font-family="sans-serif" font-weight="bold" font-size="32" text-anchor="middle">新华</text></svg>`,
  aljazeera: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#D97706"/><path d="M50 20 C40 35 30 50 35 65 C40 80 60 80 65 65 C70 50 60 35 50 20 Z" fill="#FFF"/><circle cx="50" cy="52" r="8" fill="#D97706"/></svg>`,
  dw: badge('#009EE0', 'DW', { fz: 36, ty: 65 }),
  theverge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#E51253"/><polygon points="25,25 50,75 75,25 60,25 50,50 40,25" fill="#FFF"/></svg>`,
  techcrunch: badge('#029835', 'TC', { fz: 38, fw: '900', ty: 65 }),
  openai: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#10A37F"/><circle cx="50" cy="50" r="24" fill="none" stroke="#FFF" stroke-width="6"/><path d="M50 26 L50 74 M26 50 L74 50 M33 33 L67 67 M33 67 L67 33" stroke="#FFF" stroke-width="5"/></svg>`,
  deepmind: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#1A73E8"/><circle cx="50" cy="50" r="28" fill="#FFF"/><polygon points="50,28 55,45 72,50 55,55 50,72 45,55 28,50 45,45" fill="#1A73E8"/></svg>`,
  huggingface: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#FFD21E"/><circle cx="38" cy="42" r="6" fill="#000"/><circle cx="62" cy="42" r="6" fill="#000"/><path d="M35 60 Q50 75 65 60" stroke="#000" stroke-width="5" fill="none"/><path d="M15 50 Q22 35 28 48" stroke="#FF9D00" stroke-width="6" fill="none"/><path d="M85 50 Q78 35 72 48" stroke="#FF9D00" stroke-width="6" fill="none"/></svg>`,
  github: badge('#24292E', 'GH_NODE', { fz: 36, fw: '900', ty: 65 }),
  arxiv: badge('#B31B1B', 'arXiV', { fz: 30, font: 'Georgia, serif', ty: 64 }),
  nature: badge('#C72626', 'N', { fz: 60, font: 'Georgia, serif', ty: 72 }),
  science: badge('#D2232A', 'S', { fz: 64, font: 'Impact, sans-serif', ty: 72 }),
  cnbc: badge('#002B049', 'CNBC', { fz: 26, fw: '900', ty: 62 }),
  mit: badge('#A31F34', 'MIT', { fz: 32, ty: 62 }),
  reddit: badge('#FF4500', 'r/', { fz: 48, ty: 68 }),
  lobsters: badge('#8B0000', 'LOB', { fz: 30, ty: 62 }),
  caixin: badge('#0B4EA2', '贈新', { fz: 32, ty: 64 }),
  nikkei: badge('#0C2340', '日経', { fz: 36, font: 'Georgia, serif', ty: 64 }),
  nasa: badge('#0B3D91', 'NASA', { fz: 24, fw: '900', ty: 62 })
};

for (const [key, val] of Object.entries(map)) {
  fs.writeFileSync(path.join(dir, key + '.svg'), val,'utf8');
  console.log('Written ' + key);
  fs.writeFileSync(path.join(dir, key + '.svg'), val, 'utf8');
}
