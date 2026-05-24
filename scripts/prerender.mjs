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
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap-priority.xml');

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
// IMPORTANT: Keep this low enough to fit Netlify's build time limits.
// You can always override from Netlify UI with PRERENDER_LIMIT.
const defaultNetlifyLimit = 100; // default to 100 on Netlify (override with PRERENDER_LIMIT)
const limit =
  Number.isFinite(envLimit) && envLimit > 0 ? envLimit : (IS_NETLIFY ? defaultNetlifyLimit : 0);

  // --- Route selection priority (Netlify prerender budget) ---
  // User preference:
  // 1) Arabic core pages
  // 2) Services: Soil Grouting, Cavity Detection, Foundation Strengthening
  // 3) Major cities (Arabic) landings
  // 4) For each service -> for each major city (Arabic) city-service pages
  // 5) A small set of Riyadh neighborhood pages (Arabic)
  // 6) Fill remaining budget with other Arabic pages, then anything else.

  const norm = (p) => {
    const s = String(p || '').replace(/\/+$/, '') || '/';
    return s;
  };

  // Index routes by decoded path (best for Arabic slugs)
  const byDecoded = new Map();
  for (const r of routes) byDecoded.set(norm(r.decodedPath), r);

  const pick = (decodedPath) => byDecoded.get(norm(decodedPath));

  const picked = [];
  const pushIf = (decodedPath) => {
    const r = pick(decodedPath);
    if (r) picked.push(r);
  };

  // 1) Arabic core
  const AR_CORE = [
    '/ar',
    '/ar/about',
    '/ar/services',
    '/ar/projects',
    '/ar/case-studies',
    '/ar/gallery',
    '/ar/blog',
    '/ar/faq',
    '/ar/contact',
    '/ar/request-service',
    '/ar/locations',
    '/ar/sitemap',
  ];
  for (const p of AR_CORE) pushIf(p);

  // 2) Services (Arabic)
  // Dedicated pages exist for grouting/cavity; foundation strengthening routes to request-service.
  const AR_SERVICE_PAGES = [
    '/ar/services/grouting',
    '/ar/services/cavity',
    '/ar/request-service',
  ];
  for (const p of AR_SERVICE_PAGES) pushIf(p);

  // 2.5) English core (ensure /en landings are prerendered too for CLS/LCP)
  const EN_CORE = [
    '/en',
    '/en/about',
    '/en/services',
    '/en/projects',
    '/en/case-studies',
    '/en/gallery',
    '/en/blog',
    '/en/faq',
    '/en/contact',
    '/en/request-service',
    '/en/locations',
    '/en/sitemap',
    '/en/privacy',
    '/en/terms',
  ];
  for (const p of EN_CORE) pushIf(p);

  // English service pages
  const EN_SERVICE_PAGES = [
    '/en/services/grouting',
    '/en/services/cavity',
    '/en/services/geophysical',
    '/en/request-service',
  ];
  for (const p of EN_SERVICE_PAGES) pushIf(p);

  // 3) Major cities (Arabic) landings
  const MAJOR_CITIES_AR = [
    'الرياض',
    'الدمام',
    'الخبر',
    'الظهران',
    'جدة',
    'المدينة-المنورة',
    'القصيم',
    'أبها',
    'مكة-المكرمة',
    'الطائف',
  ];
  for (const cityAr of MAJOR_CITIES_AR) pushIf(`/ar/locations/${cityAr}`);

  // 4) City-service pages: choose service then city
  const serviceSlugArWithCityLocal = (serviceArSlug, cityArSlug) => {
    const s = String(serviceArSlug || '').replace(/^\/+|\/+$/g, '');
    const c = String(cityArSlug || '').replace(/^\/+|\/+$/g, '');
    return `${s}-في-${c}`.replace(/-+/g, '-');
  };

  const SERVICES_AR_BASE = [
    { key: 'grouting', base: 'حقن-تربة' },
    { key: 'cavity', base: 'كشف-تكهفات' },
    { key: 'foundation', base: 'تقوية-أساسات' },
  ];

  for (const s of SERVICES_AR_BASE) {
    for (const cityAr of MAJOR_CITIES_AR) {
      const serviceWithCity = serviceSlugArWithCityLocal(s.base, cityAr);
      pushIf(`/ar/locations/${cityAr}/${serviceWithCity}`);
    }
  }

  // 5) Riyadh neighborhoods (Arabic) – prefer soil grouting first
  const RIYADH_HOODS = [
    'الياسمين', 'النرجس', 'الرمال', 'العارض', 'القيروان', 'الصحافة', 'الملقا', 'حطين', 'النخيل', 'المونسية',
    'الندى', 'العقيق',
  ];
  const toHoodSlugAr = (name) => `حي-${String(name || '').trim().replace(/\s+/g, '-')}`.replace(/-+/g, '-');
  const riyadhService = serviceSlugArWithCityLocal('حقن-تربة', 'الرياض');
  for (const hood of RIYADH_HOODS) {
    const hoodSlug = toHoodSlugAr(hood);
    pushIf(`/ar/locations/الرياض/${riyadhService}/${hoodSlug}`);
  }

  // 6) Fill remaining budget: prefer Arabic pages first (avoid encyclopedia-first)
  const already = new Set();
  for (const r of picked) already.add(r.encodedPath);

  const isAr = (r) => r.decodedPath === '/ar' || String(r.decodedPath).startsWith('/ar/');
  const isBlogPost = (p) => /^\/(ar|en)\/blog\/[^\/]+$/.test(p);

  const arFirst = [...routes].sort((a, b) => {
    const aAr = isAr(a) ? 0 : 1;
    const bAr = isAr(b) ? 0 : 1;
    if (aAr !== bAr) return aAr - bAr;
    const aEnc = a.encodedPath;
    const bEnc = b.encodedPath;
    // Push encyclopedia-style blog slugs later
    const score = (x) => (x.includes('geotech-encyclopedia') ? 1 : 0);
    return score(aEnc) - score(bEnc) || aEnc.localeCompare(bEnc);
  });

  for (const r of arFirst) {
    if (already.has(r.encodedPath)) continue;
    // Include blog posts, city pages, etc. Anything indexable is fine.
    picked.push(r);
    already.add(r.encodedPath);
    if (Number.isFinite(limit) && limit > 0 && picked.length >= limit) break;
  }

  let list = picked;

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
  // Run preview in its own process group on Linux so we can reliably terminate
  // the entire tree (npx -> node -> vite). If we only kill the parent, the
  // child server can keep the Node event loop alive and Netlify will time out
  // AFTER prerender prints "Done".
  const preview = spawn(previewCmd, previewArgs, {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env },
    detached: !IS_WIN,
  });
  // Allow Node to exit even if the preview process misbehaves after we're done.
  // (We still kill it explicitly at the end.)
  if (!IS_WIN) preview.unref();

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

  // Ensure preview server is fully terminated so the build command can exit.
  const stopPreview = async () => {
    const sleep2 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    if (!preview?.pid) return;
    let exited = false;
    const exitedP = new Promise((resolve) => {
      preview.once('exit', () => {
        exited = true;
        resolve();
      });
    });

    try {
      if (IS_WIN) {
        preview.kill('SIGTERM');
      } else {
        // Kill the whole process group.
        process.kill(-preview.pid, 'SIGTERM');
      }
    } catch {
      // ignore
    }

    await Promise.race([exitedP, sleep2(2500)]);
    if (!exited) {
      try {
        if (IS_WIN) preview.kill('SIGKILL');
        else process.kill(-preview.pid, 'SIGKILL');
      } catch {
        // ignore
      }
      await Promise.race([exitedP, sleep2(1500)]);
    }

    try { preview.stdout?.destroy(); } catch {}
    try { preview.stderr?.destroy(); } catch {}
  };

  await stopPreview();

  console.log(`[prerender] Done. OK=${ok}, Failed=${failed}`);
  if (failed > 0) {
    // Don't fail build on a few pages; keep deployable.
    console.warn('[prerender] Some routes failed to prerender. Site build will still succeed.');
  }

  // Be explicit: no dangling handles should keep the build alive.
  process.exit(0);
}

main().catch((e) => {
  console.error('[prerender] Fatal:', e);
  console.warn('[prerender] Prerender aborted. Continuing build without prerender output.');
  process.exit(0);
});
