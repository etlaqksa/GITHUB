import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import crypto from 'crypto';
import * as esbuild from 'esbuild';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Inline the site logo as a data URI so rendering never depends on file:// loads.
// This avoids navigation/load hangs in some Puppeteer/Chromium environments.
const logoPngPath = path.join(repoRoot, 'client', 'public', 'logo.png');
let logoDataUri = '';
try {
  const buf = fs.readFileSync(logoPngPath);
  logoDataUri = `data:image/png;base64,${buf.toString('base64')}`;
} catch {
  // If the logo is missing, we keep an empty string; the template will skip it.
  logoDataUri = '';
}

const OUT_ROOT = path.join(repoRoot, 'client', 'public', 'article-images');
const OUT_CARD_AR = path.join(OUT_ROOT, 'card', 'ar');
const OUT_CARD_EN = path.join(OUT_ROOT, 'card', 'en');
const OUT_HERO_AR = path.join(OUT_ROOT, 'hero', 'ar');
const OUT_HERO_EN = path.join(OUT_ROOT, 'hero', 'en');

function firstExisting(paths) {
  for (const p of paths) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {}
  }
  return null;
}

function fontFileUrl(pkgName, candidates) {
  const base = path.join(repoRoot, 'node_modules', '@fontsource', pkgName, 'files');
  const picked = firstExisting(candidates.map((c) => path.join(base, c)));
  if (!picked) return null;
  return pathToFileURL(picked).href;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function stableHash(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function pickPalette(key) {
  // Deterministic palette per article (based on slug + category)
  const h = stableHash(key);
  const n = parseInt(h.slice(0, 8), 16);
  const palettes = [
    { a: '#0b1224', b: '#2563eb', c: '#22c55e' },
    { a: '#0b1224', b: '#7c3aed', c: '#fb7185' },
    { a: '#0b1224', b: '#0ea5e9', c: '#f59e0b' },
    { a: '#0b1224', b: '#14b8a6', c: '#a78bfa' },
    { a: '#0b1224', b: '#ef4444', c: '#f97316' },
    { a: '#0b1224', b: '#22c55e', c: '#60a5fa' },
  ];
  return palettes[n % palettes.length];
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function wrapLines(text, maxLen) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const w of words) {
    if (!line) {
      line = w;
      continue;
    }
    if ((line + ' ' + w).length <= maxLen) {
      line += ' ' + w;
    } else {
      lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function buildHtml({
  lang,
  title,
  category,
  palette,
  size,
}) {
  const isAr = lang === 'ar';
  const dims = size === 'hero' ? { w: 1200, h: 630 } : { w: 1200, h: 630 };
  const titleLines = wrapLines(title, isAr ? 26 : 36).slice(0, 3);
  const safeTitleLines = titleLines.map(escapeHtml);
  const safeCategory = escapeHtml(category);
  const { a, b, c } = palette;

  // Local fonts from @fontsource (no network). Fallback to system fonts if missing.
  const inter700 = fontFileUrl('inter', [
    'inter-latin-700-normal.woff2',
    'inter-latin-700-normal.woff',
  ]);
  const inter500 = fontFileUrl('inter', [
    'inter-latin-500-normal.woff2',
    'inter-latin-500-normal.woff',
  ]);
  const ar700 = fontFileUrl('ibm-plex-sans-arabic', [
    'ibm-plex-sans-arabic-arabic-700-normal.woff2',
    'ibm-plex-sans-arabic-latin-700-normal.woff2',
  ]);
  const ar500 = fontFileUrl('ibm-plex-sans-arabic', [
    'ibm-plex-sans-arabic-arabic-500-normal.woff2',
    'ibm-plex-sans-arabic-latin-500-normal.woff2',
  ]);
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    /* Local font files from @fontsource (if available) */
    ${inter700 ? `@font-face { font-family: 'Inter'; font-style: normal; font-weight: 700; font-display: swap; src: url('${escapeHtml(inter700)}') format('woff2'); }` : ''}
    ${inter500 ? `@font-face { font-family: 'Inter'; font-style: normal; font-weight: 500; font-display: swap; src: url('${escapeHtml(inter500)}') format('woff2'); }` : ''}
    ${ar700 ? `@font-face { font-family: 'IBM Plex Sans Arabic'; font-style: normal; font-weight: 700; font-display: swap; src: url('${escapeHtml(ar700)}') format('woff2'); }` : ''}
    ${ar500 ? `@font-face { font-family: 'IBM Plex Sans Arabic'; font-style: normal; font-weight: 500; font-display: swap; src: url('${escapeHtml(ar500)}') format('woff2'); }` : ''}

    :root {
      --bg0: ${a};
      --bg1: ${b};
      --accent: ${c};
      --text: rgba(255,255,255,.96);
      --muted: rgba(255,255,255,.72);
      --panel: rgba(255,255,255,.08);
      --stroke: rgba(255,255,255,.14);
    }
    html, body { height: 100%; }
    body {
      margin: 0;
      width: ${dims.w}px;
      height: ${dims.h}px;
      overflow: hidden;
      background: radial-gradient(1200px 630px at 15% 15%, rgba(255,255,255,.10), transparent 55%),
                  radial-gradient(900px 630px at 85% 85%, rgba(255,255,255,.08), transparent 60%),
                  linear-gradient(135deg, var(--bg0), var(--bg1));
      font-family: ${isAr ? "'IBM Plex Sans Arabic', system-ui, -apple-system, 'Segoe UI', Tahoma, Arial" : "'Inter', system-ui, -apple-system, 'Segoe UI', Arial"};
    }

    .frame {
      position: absolute;
      inset: 40px;
      border-radius: 28px;
      background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.04));
      border: 1px solid var(--stroke);
      box-shadow: 0 30px 70px rgba(0,0,0,.35);
      overflow: hidden;
    }

    .grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px);
      background-size: 44px 44px;
      opacity: .20;
      mask-image: radial-gradient(70% 60% at 50% 50%, black, transparent 80%);
    }

    .blobA, .blobB {
      position: absolute;
      width: 520px;
      height: 520px;
      border-radius: 999px;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.22), rgba(255,255,255,.06) 55%, transparent 70%),
                  radial-gradient(circle at 70% 60%, rgba(255,255,255,.08), transparent 60%),
                  linear-gradient(135deg, rgba(255,255,255,.05), rgba(255,255,255,.00));
      border: 1px solid rgba(255,255,255,.10);
      filter: blur(0px);
      opacity: .55;
    }
    .blobA { ${isAr ? 'left' : 'right'}: -240px; top: -240px; }
    .blobB { ${isAr ? 'right' : 'left'}: -280px; bottom: -280px; }

    .content {
      position: absolute;
      inset: 0;
      padding: 54px 64px;
      display: flex;
      flex-direction: column;
      gap: 22px;
      justify-content: center;
      direction: ${isAr ? 'rtl' : 'ltr'};
    }

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(0,0,0,.25);
      border: 1px solid rgba(255,255,255,.18);
      color: var(--text);
      font-weight: 700;
      font-size: 18px;
      white-space: nowrap;
      max-width: 65%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .dot {
      width: 12px; height: 12px;
      border-radius: 999px;
      background: var(--accent);
      box-shadow: 0 0 0 6px rgba(255,255,255,.06);
      flex: 0 0 auto;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      opacity: .95;
    }
    .brand img { width: 56px; height: 56px; object-fit: contain; }
    .brand span { font-weight: 700; font-size: 18px; color: rgba(255,255,255,.85); letter-spacing: .2px; }

    h1 {
      margin: 0;
      color: var(--text);
      font-weight: 800;
      font-size: ${isAr ? '56px' : '54px'};
      line-height: 1.06;
      text-wrap: balance;
      max-width: 92%;
      text-shadow: 0 10px 40px rgba(0,0,0,.35);
    }

    .meta {
      margin-top: 4px;
      color: var(--muted);
      font-weight: 600;
      font-size: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .meta .sep { opacity: .55; }
    .footer {
      position: absolute;
      left: 64px;
      right: 64px;
      bottom: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(255,255,255,.70);
      font-weight: 600;
      font-size: 16px;
    }
    .mark {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 14px;
      background: rgba(255,255,255,.07);
      border: 1px solid rgba(255,255,255,.14);
      backdrop-filter: blur(6px);
    }
    .mark b { color: rgba(255,255,255,.92); }
  </style>
</head>
<body>
  <div class="frame">
    <div class="grid"></div>
    <div class="blobA"></div>
    <div class="blobB"></div>
    <div class="content">
      <div class="top">
        <div class="badge" title="${safeCategory}"><span class="dot"></span><span>${safeCategory}</span></div>
        <div class="brand">
          ${logoDataUri ? `<img src="${logoDataUri}" alt="ETLAQ" />` : ''}
          <span>${isAr ? 'ETLAQ • المدونة' : 'ETLAQ • Blog'}</span>
        </div>
      </div>
      <h1>${safeTitleLines.join('<br/>')}</h1>
      <div class="meta">
        <span class="mark"><b>${isAr ? 'شركة إطلاق المتميزة' : 'ETLAQ Distinguished Company'}</b></span>
        <span class="sep">•</span>
        <span>${isAr ? 'Grouting • Void Detection • Geophysics' : 'Grouting • Void Detection • Geophysics'}</span>
      </div>
    </div>
    <div class="footer">
      <span>etlaqksa.com</span>
      <span>${isAr ? 'Saudi Arabia' : 'Saudi Arabia'}</span>
    </div>
  </div>
</body>
</html>`;
}

async function loadArticles() {
  const entry = path.join(repoRoot, 'client', 'src', 'data', 'articles.ts');
  const outFile = path.join(repoRoot, '.tmp_articles_bundle.mjs');
  await esbuild.build({
    entryPoints: [entry],
    outfile: outFile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    sourcemap: false,
    logLevel: 'silent',
  });
  const mod = await import(pathToFileURL(outFile).href + `?t=${Date.now()}`);
  try { fs.unlinkSync(outFile); } catch {}
  return mod.articles ?? mod.default ?? [];
}

async function renderOne(page, html, outPath, width, height) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  // Avoid network-idle based waits (can hang/timeout depending on environment).
  // This HTML is fully self-contained; DOMContentLoaded is sufficient.
  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 0 });
  // Puppeteer versions differ: some don't expose page.waitForTimeout.
  // Use a simple Promise-based sleep for compatibility across environments.
  await new Promise((resolve) => setTimeout(resolve, 50));
  await page.screenshot({ path: outPath, type: 'webp', quality: 92 });
}

async function main() {
  ensureDir(OUT_CARD_AR);
  ensureDir(OUT_CARD_EN);
  ensureDir(OUT_HERO_AR);
  ensureDir(OUT_HERO_EN);

  const articles = await loadArticles();
  if (!Array.isArray(articles) || articles.length === 0) {
    console.log('No articles found - skipping article image generation.');
    return;
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  // Some environments are slow to render (Windows dev machines, CI); disable timeouts.
  page.setDefaultTimeout(0);
  page.setDefaultNavigationTimeout(0);

  // Be defensive with timeouts across Windows/CI/Netlify.
  page.setDefaultTimeout(0);
  page.setDefaultNavigationTimeout(0);

  let count = 0;
  for (const a of articles) {
    const slug = a.slug;
    const catAr = a.category || (a.categoriesAr?.[0] ?? '');
    const catEn = a.categoryEn || (a.categoriesEn?.[0] ?? '');
    const palette = pickPalette(`${slug}::${catEn}`);

    const htmlCardAr = buildHtml({ lang: 'ar', title: a.title, category: catAr, palette, size: 'card' });
    const htmlCardEn = buildHtml({ lang: 'en', title: a.titleEn, category: catEn, palette, size: 'card' });
    const htmlHeroAr = buildHtml({ lang: 'ar', title: a.title, category: catAr, palette, size: 'hero' });
    const htmlHeroEn = buildHtml({ lang: 'en', title: a.titleEn, category: catEn, palette, size: 'hero' });

    const outCardAr = path.join(OUT_CARD_AR, `${slug}.webp`);
    const outCardEn = path.join(OUT_CARD_EN, `${slug}.webp`);
    const outHeroAr = path.join(OUT_HERO_AR, `${slug}.webp`);
    const outHeroEn = path.join(OUT_HERO_EN, `${slug}.webp`);

    await renderOne(page, htmlCardAr, outCardAr, 1200, 630);
    await renderOne(page, htmlCardEn, outCardEn, 1200, 630);
    await renderOne(page, htmlHeroAr, outHeroAr, 1200, 630);
    await renderOne(page, htmlHeroEn, outHeroEn, 1200, 630);
    count++;
  }

  await page.close();
  await browser.close();
  console.log(`Generated article images (webp): ${count} articles × 4 (card/hero, ar/en)`);
}

main().catch((e) => {
  console.error('generate_article_images failed:', e);
  process.exit(1);
});
