import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'client', 'public');

const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://etlaqksa.com').replace(/\/+$/, '');
const TODAY = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

// ---------- Helpers (parsing / escaping)

function stripTsComments(src) {
  return src
    // /* ... */
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // // ...
    .replace(/^\s*\/\/.*$/gm, '');
}

function extractArrayFromTs(filePath, exportName) {
  const src = fs.readFileSync(filePath, 'utf8');
  const clean = stripTsComments(src);

  // export const <name>: ... = [ ... ];
  const re = new RegExp(`export\\s+const\\s+${exportName}\\s*:[^=]*=\\s*(\\[[\\s\\S]*?\\])\\s*;`);
  const m = clean.match(re);
  if (!m) return [];

  let s = m[1];

  // Remove trailing commas before ] or }
  s = s.replace(/,\s*(\]|\})/g, '$1');

  // Quote bare object keys (best-effort: { slug: ... } -> { "slug": ... })
  s = s.replace(/([,{]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":');

  // Convert single quotes to double quotes (best-effort)
  s = s.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (_, g1) => {
    const safe = String(g1).replace(/\\"/g, '"').replace(/"/g, '\\"');
    return `"${safe}"`;
  });

  // Remove type-only keys / functions if any (best-effort)
  s = s.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([A-Za-z_][A-Za-z0-9_<>|\s]*)\s*,/g, '');

  try {
    return JSON.parse(s);
  } catch (e) {
    console.error(`Failed to parse array ${exportName} from ${filePath}`);
    throw e;
  }
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ---------- Slug utilities (match client/src/lib/slugify.ts)

const ARABIC_DIACRITICS_RE = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const TATWEEL_RE = /\u0640/g;

function slugifyEn(input) {
  const s = String(input || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || 'article';
}

function slugifyAr(input) {
  const s = String(input || '')
    .trim()
    .replace(ARABIC_DIACRITICS_RE, '')
    .replace(TATWEEL_RE, '')
    .replace(/[\u060C\u061B\u061F،؛؟]/g, ' ')
    .replace(/[()\[\]{}<>«»“”"'`]/g, ' ')
    .replace(/[\u2000-\u206F]/g, ' ')
    .replace(/[^\u0600-\u06FF0-9\s-]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || 'مقال';
}

function truncateSlugWords(slug, maxWords) {
  const parts = String(slug || '').split('-').filter(Boolean);
  if (parts.length <= maxWords) return parts.join('-');
  return parts.slice(0, maxWords).join('-');
}

function serviceSlugArWithCity(serviceArBaseSlug, cityArSlug) {
  const s = String(serviceArBaseSlug || '').replace(/^[-\s]+|[-\s]+$/g, '');
  const c = String(cityArSlug || '').replace(/^[-\s]+|[-\s]+$/g, '');
  return `${s}-في-${c}`.replace(/-+/g, '-');
}

function serviceSlugEnWithCity(serviceEnSlug, cityEnSlug) {
  const s = String(serviceEnSlug || '').replace(/^\/+|\/+$/g, '');
  const c = String(cityEnSlug || '').replace(/^\/+|\/+$/g, '');
  return `${s}-in-${c}`.replace(/-+/g, '-');
}

function getArticleUrlSlug(article, lang) {
  const id = article?.id ?? 0;
  const title = lang === 'ar' ? article?.title : (article?.titleEn || article?.title);
  const base = lang === 'ar' ? slugifyAr(title) : slugifyEn(title);

  // Keep slugs reasonably short (match client logic)
  const limited = truncateSlugWords(base, lang === 'ar' ? 10 : 12);
  return `${limited}-${id}`;
}

// ---------- XML builders

function buildUrlset(pairs) {
  const urls = pairs
    .map((p) => {
      const loc = `${SITE_URL}${p.arPath}`;
      const lastmod = p.lastmod || TODAY;
      const changefreq = p.changefreq || 'weekly';

      const alternates = [];
      if (p.arPath) alternates.push({ hreflang: 'ar', href: `${SITE_URL}${p.arPath}` });
      if (p.enPath) alternates.push({ hreflang: 'en', href: `${SITE_URL}${p.enPath}` });
      // Default language is Arabic
      if (p.arPath) alternates.push({ hreflang: 'x-default', href: `${SITE_URL}${p.arPath}` });

      const altXml = alternates
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(a.hreflang)}" href="${escapeXml(a.href)}" />`)
        .join('\n');

      return [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        altXml,
        `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
        `    <changefreq>${escapeXml(changefreq)}</changefreq>`,
        '  </url>',
      ].filter(Boolean).join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${urls}\n` +
    `</urlset>\n`;
}

function buildSitemapIndex(items) {
  const xml = items
    .map((it) => {
      return [
        '  <sitemap>',
        `    <loc>${escapeXml(it.loc)}</loc>`,
        `    <lastmod>${escapeXml(it.lastmod || TODAY)}</lastmod>`,
        '  </sitemap>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${xml}\n` +
    `</sitemapindex>\n`;
}

// ---------- Data sources

const SEO_LOCATIONS_PATH = path.join(ROOT, 'client', 'src', 'data', 'seoLocations.ts');
const ARTICLES_PATH = path.join(ROOT, 'client', 'src', 'data', 'articles.ts');
const NEIGHBORHOODS_PATH = path.join(ROOT, 'client', 'src', 'data', 'cityNeighborhoods.ts');

const cities = extractArrayFromTs(SEO_LOCATIONS_PATH, 'cities');
const serviceLandings = extractArrayFromTs(SEO_LOCATIONS_PATH, 'serviceLandings');

function extractArticles() {
  const src = fs.readFileSync(ARTICLES_PATH, 'utf8');

  // Locate the articles array body
  const m = src.match(/export\s+const\s+articles\s*:\s*ArticleContent\[\]\s*=\s*\[([\s\S]*?)\];/);
  if (!m) return [];
  const body = m[1];

  // Find each object start by "id:"
  const re = /\{\s*id\s*:\s*(\d+)\s*,/g;
  const starts = [];
  let mm;
  while ((mm = re.exec(body)) !== null) {
    starts.push({ idx: mm.index, id: Number(mm[1]) });
  }
  const out = [];
  for (let i = 0; i < starts.length; i++) {
    const a = starts[i];
    const b = starts[i + 1];
    const chunk = body.slice(a.idx, b ? b.idx : body.length);

    const title = (chunk.match(/\btitle\s*:\s*"([^"]+)"/) || [])[1] || '';
    const titleEn = (chunk.match(/\btitleEn\s*:\s*"([^"]*)"/) || [])[1] || '';
    const date = (chunk.match(/\bdate\s*:\s*"([0-9]{4}-[0-9]{2}-[0-9]{2})"/) || [])[1] || '';
    if (!title) continue;

    out.push({ id: a.id, title, titleEn, date });
  }
  return out.sort((x, y) => (x.id || 0) - (y.id || 0));
}

const articles = extractArticles();

function hasRiyadhNeighborhoods() {
  try {
    const src = fs.readFileSync(NEIGHBORHOODS_PATH, 'utf8');
    return src.includes('riyadhNeighborhoods') && src.match(/riyadhNeighborhoods\s*=\s*\[/);
  } catch {
    return false;
  }
}

// ---------- URL sets (bilingual pairs)

function pairFromBare(barePath, opts = {}) {
  const p = String(barePath || '/').startsWith('/') ? String(barePath || '/') : `/${barePath}`;
  const arPath = p === '/' ? '/ar' : `/ar${p}`;
  const enPath = p === '/' ? '/en' : `/en${p}`;
  return { arPath, enPath, ...opts };
}

function uniquePairs(pairs) {
  const seen = new Set();
  const out = [];
  for (const p of pairs) {
    const k = `${p.arPath}||${p.enPath}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(p);
  }
  return out;
}

const coreBare = [
  '/',
  '/about',
  '/services',
  '/services/grouting',
  '/services/cavity',
  '/services/geophysical',
  '/projects',
  '/gallery',
  '/blog',
  '/faq',
  '/locations',
  '/contact',
  '/request-service',
  '/sitemap',
  '/terms',
  '/privacy',
];

const fullPairs = [];

// Core
for (const b of coreBare) {
  fullPairs.push(pairFromBare(b, { changefreq: b === '/' ? 'daily' : 'weekly' }));
}

// City landing + city-service landings
for (const city of cities) {
  const cityAr = `/ar/locations/${city.arSlug}`;
  const cityEn = `/en/locations/${city.slug}`;
  fullPairs.push({ arPath: cityAr, enPath: cityEn, changefreq: 'weekly' });

  for (const service of serviceLandings) {
    const sAr = serviceSlugArWithCity(service.arSlug, city.arSlug);
    const sEn = serviceSlugEnWithCity(service.slug, city.slug);
    fullPairs.push({
      arPath: `/ar/locations/${city.arSlug}/${sAr}`,
      enPath: `/en/locations/${city.slug}/${sEn}`,
      changefreq: 'weekly',
    });
  }
}

// Neighborhood hubs only (exclude neighborhood landing pages from XML)
if (hasRiyadhNeighborhoods()) {
  // Find Riyadh
  const r = cities.find((c) => c.slug === 'riyadh');
  if (r) {
    fullPairs.push({
      arPath: `/ar/locations/${r.arSlug}/احياء`,
      enPath: `/en/locations/${r.slug}/neighborhoods`,
      changefreq: 'weekly',
    });
  }
}

// Blog posts
for (const a of articles) {
  const slugAr = getArticleUrlSlug(a, 'ar');
  const slugEn = getArticleUrlSlug(a, 'en');
  fullPairs.push({
    arPath: `/ar/blog/${slugAr}`,
    enPath: `/en/blog/${slugEn}`,
    lastmod: a.date || TODAY,
    changefreq: 'monthly',
  });
}

const fullUnique = uniquePairs(fullPairs);

// ---------- Priority sitemap (subset)

const priorityPairs = [];

// Core (keep same order)
for (const b of coreBare) priorityPairs.push(pairFromBare(b, { changefreq: b === '/' ? 'daily' : 'weekly' }));

// Major cities per user focus
const majorCitySlugs = new Set(['riyadh', 'dammam', 'jeddah', 'madinah', 'qassim']);
for (const city of cities) {
  if (!majorCitySlugs.has(city.slug)) continue;

  priorityPairs.push({
    arPath: `/ar/locations/${city.arSlug}`,
    enPath: `/en/locations/${city.slug}`,
    changefreq: 'weekly',
  });

  for (const service of serviceLandings) {
    const sAr = serviceSlugArWithCity(service.arSlug, city.arSlug);
    const sEn = serviceSlugEnWithCity(service.slug, city.slug);
    priorityPairs.push({
      arPath: `/ar/locations/${city.arSlug}/${sAr}`,
      enPath: `/en/locations/${city.slug}/${sEn}`,
      changefreq: 'weekly',
    });
  }
}

// Riyadh neighborhoods hub
if (hasRiyadhNeighborhoods()) {
  const r = cities.find((c) => c.slug === 'riyadh');
  if (r) {
    priorityPairs.push({
      arPath: `/ar/locations/${r.arSlug}/احياء`,
      enPath: `/en/locations/${r.slug}/neighborhoods`,
      changefreq: 'weekly',
    });
  }
}

// Top articles (first 20 by ID)
for (const a of articles.slice(0, 20)) {
  priorityPairs.push({
    arPath: `/ar/blog/${getArticleUrlSlug(a, 'ar')}`,
    enPath: `/en/blog/${getArticleUrlSlug(a, 'en')}`,
    lastmod: a.date || TODAY,
    changefreq: 'monthly',
  });
}

const priorityUnique = uniquePairs(priorityPairs);

// ---------- Write outputs

fs.mkdirSync(OUT_DIR, { recursive: true });

const priorityXml = buildUrlset(priorityUnique);
const fullXml = buildUrlset(fullUnique);

// Sitemap index (sitemap.xml)
const indexXml = buildSitemapIndex([
  { loc: `${SITE_URL}/sitemap-priority.xml`, lastmod: TODAY },
  { loc: `${SITE_URL}/sitemap-full.xml`, lastmod: TODAY },
]);

fs.writeFileSync(path.join(OUT_DIR, 'sitemap-priority.xml'), priorityXml, 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'sitemap-full.xml'), fullXml, 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), indexXml, 'utf8');

console.log(`Generated: client/public/sitemap.xml (index)`);
console.log(`Generated: client/public/sitemap-priority.xml (URLs: ${priorityUnique.length})`);
console.log(`Generated: client/public/sitemap-full.xml (URLs: ${fullUnique.length})`);
