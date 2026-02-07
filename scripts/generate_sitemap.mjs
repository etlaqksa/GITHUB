import fs from 'node:fs';
import path from 'node:path';

/**
 * Generates client/public/sitemap.xml
 *
 * - Includes: core routes, /locations/* city/service landings, and /blog/* article pages for both languages.
 * - Source of truth:
 *   - client/src/data/seoLocations.ts (cities + serviceLandings)
 *   - client/src/data/articles.ts (articles[].slug + articles[].date)
 */

const PROJECT_ROOT = path.resolve(process.cwd());
const CLIENT_PUBLIC = path.join(PROJECT_ROOT, 'client', 'public');

const SITE_URL = (
  process.env.SITE_URL ||
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  'https://etlaqksa.com'
).replace(/\/+$/, '');

function escapeXml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function readFile(p) {
  return fs.readFileSync(p, 'utf8');
}

function extractStringArrayValues(tsText, arrayName) {
  // Very small regex-based extractor (keeps build fast, avoids TS runtime).
  // Works with patterns like: export const cities: City[] = [ { slug: 'riyadh', ... }, ...]
  const blockMatch = tsText.match(new RegExp(`export\\s+const\\s+${arrayName}[^=]*=\\s*\\[([\\s\\S]*?)\\]\\s*;`, 'm'));
  if (!blockMatch) return [];
  const block = blockMatch[1];

  // Grab slug: '...' or slug: "..."
  const slugs = [];
  const slugRe = /slug\s*:\s*(['"])(.*?)\1/g;
  let m;
  while ((m = slugRe.exec(block))) {
    slugs.push(m[2]);
  }
  return Array.from(new Set(slugs)).filter(Boolean);
}

function extractArticleEntries(tsText) {
  // Extract { slugEn, slugAr, date }
  // Anchors: each article object has id/date/slug (and optional slugAr) near the top-level fields.
  const entries = [];
  const re =
    /\{\s*id\s*:\s*(\d+),[\s\S]*?\n\s*date\s*:\s*(['"])(\d{4}-\d{2}-\d{2})\2,[\s\S]*?\n\s*slug\s*:\s*(['"])(.*?)\4,(?:[\s\S]*?\n\s*slugAr\s*:\s*(['"])(.*?)\5,)?/g;

  let m;
  while ((m = re.exec(tsText))) {
    const slugEn = m[5];
    const slugAr = m[7];
    const date = m[3];
    if (!slugEn) continue;
    entries.push({ slugEn, slugAr, date });
  }

  // Deduplicate by slugEn (keep earliest found)
  const seen = new Set();
  return entries.filter((e) => {
    if (!e.slugEn || seen.has(e.slugEn)) return false;
    seen.add(e.slugEn);
    return true;
  });
}

function isoDate(d) {
  // Keep only YYYY-MM-DD if provided; otherwise omit.
  if (!d) return undefined;
  const m = String(d).match(/^\d{4}-\d{2}-\d{2}$/);
  return m ? m[0] : undefined;
}

function url(pathname) {
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  return `${SITE_URL}${pathname}`;
}

function makeUrlEntry(loc, lastmod) {
  const lm = isoDate(lastmod);
  return lm
    ? `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${escapeXml(lm)}</lastmod>\n  </url>`
    : `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function main() {
  const seoLocationsPath = path.join(PROJECT_ROOT, 'client', 'src', 'data', 'seoLocations.ts');
  const articlesPath = path.join(PROJECT_ROOT, 'client', 'src', 'data', 'articles.ts');

  const seoText = readFile(seoLocationsPath);
  const articlesText = readFile(articlesPath);

  const citySlugs = extractStringArrayValues(seoText, 'cities');
  const serviceSlugs = extractStringArrayValues(seoText, 'serviceLandings');
  const articleEntries = extractArticleEntries(articlesText);

  const langs = ['ar', 'en'];
  const staticRoutes = [
    '/',
    '/about',
    '/services',
    '/services/grouting',
    '/services/cavity',
    '/services/geophysical',
    '/projects',
    '/case-studies',
    '/gallery',
    '/blog',
    '/faq',
    '/contact',
    '/request-service',
    '/thank-you',
    '/locations'
  ];

  const urls = [];

  // Core pages
  for (const lang of langs) {
    for (const r of staticRoutes) {
      const p = r === '/' ? `/${lang}` : `/${lang}${r}`;
      urls.push({ loc: url(p), lastmod: undefined });
    }
  }

  // City landings
  for (const lang of langs) {
    for (const city of citySlugs) {
      urls.push({ loc: url(`/${lang}/locations/${city}`), lastmod: undefined });
      for (const service of serviceSlugs) {
        urls.push({ loc: url(`/${lang}/locations/${city}/${service}`), lastmod: undefined });
      }
    }
  }

  // Articles
  for (const lang of langs) {
    for (const a of articleEntries) {
      const s = lang === 'ar' ? (a.slugAr || a.slugEn) : a.slugEn;
      urls.push({ loc: url(`/${lang}/blog/${s}`), lastmod: a.date });
    }
  }

  // Dedup
  const seen = new Set();
  const deduped = urls.filter((u) => {
    if (seen.has(u.loc)) return false;
    seen.add(u.loc);
    return true;
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...deduped.map((u) => makeUrlEntry(u.loc, u.lastmod)),
    '</urlset>',
    ''
  ].join('\n');

  ensureDir(CLIENT_PUBLIC);
  const outPath = path.join(CLIENT_PUBLIC, 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');

  // eslint-disable-next-line no-console
  console.log(`Generated: client/public/sitemap.xml (URLs: ${deduped.length})`);
  // eslint-disable-next-line no-console
  console.log('Tip: set SITE_URL in Netlify to your custom domain for correct links.');
}

main();
