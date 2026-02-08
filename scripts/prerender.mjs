import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

// Lightweight prerender for faster indexing on Netlify.
// - Starts `vite preview` on the built `/dist` output.
// - Visits all URLs from `dist/sitemap.xml`.
// - Writes `dist/<route>/index.html` for each route.
//
// Toggle:
//   PRERENDER=0 to skip.
//   PRERENDER_LIMIT=50 to render only first N routes (useful for local testing).

const SHOULD_RUN = (process.env.PRERENDER ?? '1') !== '0';
if (!SHOULD_RUN) {
  console.log('[prerender] Skipped (PRERENDER=0)');
  process.exit(0);
}

// NOTE: On Windows, Chromium + sandboxing can be flaky depending on local setup.
// We run prerender automatically on Netlify (Linux). Locally on Windows, it is
// disabled by default unless explicitly enabled.
const IS_WIN = process.platform === 'win32';
const IS_NETLIFY = !!process.env.NETLIFY;
if (IS_WIN && !IS_NETLIFY && (process.env.PRERENDER_WIN ?? '0') !== '1') {
  console.log('[prerender] Skipped on Windows (set PRERENDER_WIN=1 to enable locally)');
  process.exit(0);
}

const DIST_DIR = path.join(process.cwd(), 'dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

if (!fs.existsSync(DIST_DIR)) {
  console.error('[prerender] dist/ not found. Run build first.');
  process.exit(1);
}

function readSitemapPaths() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn('[prerender] dist/sitemap.xml not found; nothing to prerender.');
    return [];
  }
  const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const locRe = /<loc>(.*?)<\/loc>/g;
  const out = [];
  let m;
  while ((m = locRe.exec(xml))) {
    try {
      const u = new URL(m[1]);
      // Keep encoded pathname for navigation; decode for filesystem paths.
      const encodedPath = u.pathname.replace(/\/+$/, '') || '/';
      const decodedPath = decodeURI(encodedPath);
      out.push({ encodedPath, decodedPath });
    } catch {
      // ignore
    }
  }
  // de-dup by encoded path
  const seen = new Set();
  return out.filter(({ encodedPath }) => {
    if (seen.has(encodedPath)) return false;
    seen.add(encodedPath);
    return true;
  });
}

function isHtmlPagePath(p) {
  const s = String(p || '');
  if (!s || s === '/sitemap.xml') return false;
  if (s.startsWith('/assets/')) return false;
  if (s.startsWith('/images/')) return false;
  if (s.startsWith('/gallery/')) return false;
  if (s.startsWith('/article-images/')) return false;
  if (s.endsWith('.pdf')) return false;
  if (s.endsWith('.xml') || s.endsWith('.txt') || s.endsWith('.json')) return false;
  return true;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeHtmlForRoute(decodedPath, html) {
  const clean = decodedPath.replace(/\/+$/, '') || '/';
  if (clean === '/') return; // keep dist/index.html
  const relDir = clean.replace(/^\//, '');
  const outDir = path.join(DIST_DIR, relDir);
  ensureDir(outDir);
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
}

async function waitForPreviewReady(proc) {
  return new Promise((resolve, reject) => {
    let ready = false;
    const onData = (buf) => {
      const s = String(buf);
      if (s.includes('Local:') || s.includes('http://')) {
        ready = true;
        resolve();
      }
    };
    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
    proc.on('exit', (code) => {
      if (!ready) reject(new Error(`[prerender] vite preview exited early (${code})`));
    });
  });
}

async function main() {
  const routes = readSitemapPaths().filter((r) => isHtmlPagePath(r.encodedPath));

// Netlify has a default build time limit (often ~15–20 minutes). Prerendering every
// route can exceed that once you have hundreds of pages. So:
// - On Netlify, we prerender a prioritized subset by default.
// - You can override with PRERENDER_LIMIT (e.g. 779) if your build timeout is increased.
const envLimit = Number(process.env.PRERENDER_LIMIT || 0);
const defaultNetlifyLimit = 200; // default to 200 on Netlify to avoid build timeouts (override with PRERENDER_LIMIT)
const limit =
  Number.isFinite(envLimit) && envLimit > 0 ? envLimit : (IS_NETLIFY ? defaultNetlifyLimit : 0);

const coreSet = new Set([
  '/', '/home',
  '/ar', '/en',
  '/ar/about', '/en/about',
  '/ar/services', '/en/services',
  '/ar/projects', '/en/projects',
  '/ar/case-studies', '/en/case-studies',
  '/ar/gallery', '/en/gallery',
  '/ar/blog', '/en/blog',
  '/ar/faq', '/en/faq',
  '/ar/contact', '/en/contact',
  '/ar/request-service', '/en/request-service',
  '/ar/locations', '/en/locations',
  '/ar/sitemap', '/en/sitemap',
]);

const isCore = (p) => coreSet.has(p);

const isNeighborhoodHub = (p) => p.endsWith('/احياء') || p.endsWith('/neighborhoods');
const isCityLanding = (p) => /^\/(ar|en)\/locations\/[^\/]+$/.test(p);
const isCityService = (p) => /^\/(ar|en)\/locations\/[^\/]+\/[^\/]+$/.test(p);
const isNeighborhood = (p) => /^\/(ar|en)\/locations\/[^\/]+\/[^\/]+\/[^\/]+$/.test(p);
const isBlogPost = (p) => /^\/(ar|en)\/blog\/[^\/]+$/.test(p);

// Keep a balanced prioritized selection:
const core = [];
const cityLanding = [];
const cityService = [];
const hubs = [];
const neighborhoods = [];
const blogPosts = [];
const other = [];

for (const r of routes) {
  const p = r.encodedPath;
  if (isCore(p)) core.push(r);
  else if (isNeighborhoodHub(p)) hubs.push(r);
  else if (isCityLanding(p)) cityLanding.push(r);
  else if (isCityService(p)) cityService.push(r);
  else if (isBlogPost(p)) blogPosts.push(r);
  else if (isNeighborhood(p)) neighborhoods.push(r);
  else other.push(r);
}

// Prefer Riyadh neighborhoods first (most important long-tail)
const riyadhNeighborhoods = neighborhoods.filter((r) =>
  r.encodedPath.includes('/locations/') &&
  (r.encodedPath.includes('%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6') || r.encodedPath.includes('/riyadh/'))
);
const otherNeighborhoods = neighborhoods.filter((r) => !riyadhNeighborhoods.includes(r));

// Identify top-city service pages so a small prerender budget still covers the biggest markets.
const TOP_CITIES_AR = new Set([
  'الرياض',
  'جدة',
  'الدمام',
  'الخبر',
  'المدينة-المنورة',
  'مكة-المكرمة',
  'الطائف',
  'القصيم',
  'أبها',
  'تبوك',
]);
const TOP_CITIES_EN = new Set([
  'riyadh',
  'jeddah',
  'dammam',
  'khobar',
  'madinah',
  'makkah',
  'taif',
  'qassim',
  'abha',
  'tabuk',
]);

function getParts(decodedPath) {
  return String(decodedPath || '')
    .split('/')
    .filter(Boolean);
}

function isTopCityServiceRoute(r) {
  const parts = getParts(r.decodedPath);
  // [lang, 'locations', citySlug, serviceSlug]
  if (parts.length !== 4) return false;
  if (parts[1] !== 'locations') return false;
  const lang = parts[0];
  const citySlug = parts[2];
  return lang === 'ar' ? TOP_CITIES_AR.has(citySlug) : TOP_CITIES_EN.has(citySlug);
}

const topCityServices = cityService.filter(isTopCityServiceRoute);
const otherCityServices = cityService.filter((r) => !topCityServices.includes(r));

// Focus Riyadh neighborhoods for the highest-intent query (soil grouting).
const riyadhGroutingNeighborhoods = riyadhNeighborhoods.filter((r) =>
  r.decodedPath.includes('/locations/الرياض/حقن-تربة-في-الرياض/') ||
  r.decodedPath.includes('/locations/riyadh/soil-grouting-in-riyadh/')
);

// Sort blog posts to put non-generic slugs first (skip old geotech-encyclopedia-* priority)
blogPosts.sort((a, b) => {
  const score = (p) => (p.includes('geotech-encyclopedia') ? 1 : 0);
  return score(a.encodedPath) - score(b.encodedPath) || a.encodedPath.localeCompare(b.encodedPath);
});

// Compose selection
let list = [
  ...core,
  ...hubs,
  ...cityLanding,
  // Cover the biggest cities' service pages first
  ...topCityServices,
  // Long-tail intent: Riyadh soil grouting neighborhoods
  ...riyadhGroutingNeighborhoods.slice(0, 30),
  // A small set of content pages (avoid encyclopedia-first)
  ...blogPosts.slice(0, 12),
  // Fill remaining budget with other city services and a tiny neighborhood sample
  ...otherCityServices,
  ...otherNeighborhoods.slice(0, 8),
  ...other,
];

// De-dup preserving order
const seen2 = new Set();
list = list.filter((r) => {
  if (seen2.has(r.encodedPath)) return false;
  seen2.add(r.encodedPath);
  return true;
});

if (Number.isFinite(limit) && limit > 0) list = list.slice(0, limit);
  if (list.length === 0) {
    console.log('[prerender] No routes found to prerender.');
    return;
  }

  // Lazy import so `npm install` can still succeed even if puppeteer isn't used locally.
  const { default: puppeteer } = await import('puppeteer');

  // puppeteer v24+ removed `page.waitForTimeout`. Use a small sleep helper instead.
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Start preview server
  const port = Number(process.env.PRERENDER_PORT || 4173);
  const previewCmd = IS_WIN ? 'cmd.exe' : 'npx';
  const previewArgs = IS_WIN
    ? ['/d', '/s', '/c', `npx vite preview --port ${port} --strictPort --host 127.0.0.1`]
    : ['vite', 'preview', '--port', String(port), '--strictPort', '--host', '127.0.0.1'];
  const preview = spawn(previewCmd, previewArgs, {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env },
  });

  await waitForPreviewReady(preview);
  const base = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1365, height: 768, deviceScaleFactor: 1 });

  // Speed: block analytics + heavy assets during prerender
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    const type = req.resourceType();
    const blocked =
      url.includes('googletagmanager.com') ||
      url.includes('google-analytics.com') ||
      url.includes('g.doubleclick.net') ||
      url.includes('stats.g.doubleclick.net');
    if (blocked) return req.abort();
    // Prerender does not need images/fonts/media/stylesheets.
    if (type === 'image' || type === 'font' || type === 'media' || type === 'stylesheet') return req.abort();
    return req.continue();
  });

  let ok = 0;
  let failed = 0;
  console.log(`[prerender] Routes selected: ${list.length}`);
  if (IS_NETLIFY && !(Number(process.env.PRERENDER_LIMIT || 0) > 0)) {
    console.log('[prerender] Tip: set PRERENDER_LIMIT to increase/decrease pages prerendered.');
  }

  for (const r of list) {
    const url = base + r.encodedPath;
    try {
      // Faster than networkidle2 and more stable with many routes.
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      // Ensure main container is present (app mounted)
      await page.waitForSelector('#main-content', { timeout: 45000 });
      // Small settle for any lazy sections
      if (typeof page.waitForTimeout === 'function') {
        await page.waitForTimeout(80);
      } else {
        await sleep(80);
      }

      const html = await page.content();
      writeHtmlForRoute(r.decodedPath, html);
      ok++;
      if (ok % 25 === 0) console.log(`[prerender] Rendered ${ok}/${list.length}`);
    } catch (e) {
      failed++;
      console.warn(`[prerender] Failed: ${r.encodedPath} :: ${e?.message || e}`);
    }
  }

  await page.close();
  await browser.close();
  preview.kill('SIGTERM');

  console.log(`[prerender] Done. OK=${ok}, Failed=${failed}`);
  if (failed > 0) {
    // Don't fail build on a few pages; keep deployable.
    console.warn('[prerender] Some routes failed to prerender. Site build will still succeed.');
  }
}

main().catch((e) => {
  console.error('[prerender] Fatal:', e);
  console.warn('[prerender] Prerender aborted. Continuing build without prerender output.');
  process.exit(0);
});
