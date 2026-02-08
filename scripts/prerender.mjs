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
  const limit = Number(process.env.PRERENDER_LIMIT || 0);
  const list = Number.isFinite(limit) && limit > 0 ? routes.slice(0, limit) : routes;

  if (list.length === 0) {
    console.log('[prerender] No routes found to prerender.');
    return;
  }

  // Lazy import so `npm install` can still succeed even if puppeteer isn't used locally.
  const { default: puppeteer } = await import('puppeteer');

  // Start preview server
  const port = Number(process.env.PRERENDER_PORT || 4173);
  const preview = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', 'preview', '--port', String(port), '--strictPort', '--host', '127.0.0.1'],
    { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env } }
  );

  await waitForPreviewReady(preview);
  const base = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1365, height: 768, deviceScaleFactor: 1 });

  // Speed: block analytics/ads requests during prerender
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    const blocked =
      url.includes('googletagmanager.com') ||
      url.includes('google-analytics.com') ||
      url.includes('g.doubleclick.net') ||
      url.includes('stats.g.doubleclick.net');
    if (blocked) return req.abort();
    return req.continue();
  });

  let ok = 0;
  let failed = 0;
  console.log(`[prerender] Routes: ${list.length}`);

  for (const r of list) {
    const url = base + r.encodedPath;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });
      // Ensure main container is present (app mounted)
      await page.waitForSelector('#main-content', { timeout: 60000 });
      // Small settle for any lazy sections
      await page.waitForTimeout(150);

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
  process.exit(1);
});
