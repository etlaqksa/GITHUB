import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = (process.env.SITE_URL || 'https://etlaqksa.com').replace(/\/+$/,'');
const OUT_PATH = path.join(process.cwd(), 'client', 'public', 'sitemap.xml');

function xmlEscape(s='') {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&apos;');
}

function readText(p) {
  return fs.readFileSync(p, 'utf8');
}

function uniq(arr) {
  return Array.from(new Set(arr));
}


function extractArrayObjects(text, anchor) {
  const idx = text.indexOf(anchor);
  if (idx < 0) return '';
  // Find the array literal after the assignment "=" (avoid matching type annotations like City[])
  const eq = text.indexOf('=', idx);
  if (eq < 0) return '';
  const start = text.indexOf('[', eq);
  if (start < 0) return '';
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return '';
}


function extractCitiesAndServices() {
  const seoPath = path.join(process.cwd(), 'client', 'src', 'data', 'seoLocations.ts');
  const t = readText(seoPath);

  const citiesBlock = extractArrayObjects(t, 'export const cities');
  const servicesBlock = extractArrayObjects(t, 'export const serviceLandings');

  const cityRe = /{\s*slug:\s*'([^']+)'\s*,\s*arSlug:\s*'([^']+)'\s*,/g;
  const serviceRe = /{\s*slug:\s*'([^']+)'\s*,\s*arSlug:\s*'([^']+)'\s*,/g;

  const cities = [];
  let m;
  while ((m = cityRe.exec(citiesBlock))) {
    cities.push({ slug: m[1], arSlug: m[2] });
  }

  const services = [];
  while ((m = serviceRe.exec(servicesBlock))) {
    services.push({ slug: m[1], arSlug: m[2] });
  }

  return { cities, services };
}


function slugifyEn(input = '') {
  return String(input || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['"“”‘’]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-]+|[-]+$/g, '');
}

function slugifyAr(input = '') {
  // Remove Arabic diacritics + tatweel, keep Arabic letters/numbers and spaces
  return String(input || '')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[“”‘’"']/g, '')
    .replace(/[^\u0600-\u06FF0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-]+|[-]+$/g, '');
}

function truncateSlugWords(slug, maxWords) {
  const parts = String(slug || '').split('-').filter(Boolean);
  return parts.slice(0, Math.max(1, maxWords)).join('-');
}


// Riyadh neighborhoods used for local long-tail pages (kept moderate to avoid thin/doorway spam).
const RIYADH_NEIGHBORHOODS = [
  { ar: 'حي الياسمين', en: 'Al Yasmin' },
  { ar: 'حي الملقا', en: 'Al Malqa' },
  { ar: 'حي النرجس', en: 'An Narjis' },
  { ar: 'حي الندى', en: 'An Nada' },
  { ar: 'حي الصحافة', en: 'As Sahafah' },
  { ar: 'حي العقيق', en: 'Al Aqiq' },
  { ar: 'حي حطين', en: 'Hittin' },
  { ar: 'حي النخيل', en: 'An Nakheel' },
  { ar: 'حي العليا', en: 'Al Olaya' },
  { ar: 'حي السليمانية', en: 'As Sulaymaniyah' },
  { ar: 'حي الملز', en: 'Al Malaz' },
  { ar: 'حي الربوة', en: 'Ar Rabwah' },
  { ar: 'حي الروضة', en: 'Ar Rawdah' },
  { ar: 'حي النهضة', en: 'An Nahdah' },
  { ar: 'حي اليرموك', en: 'Al Yarmuk' },
  { ar: 'حي النسيم', en: 'An Naseem' },
  { ar: 'حي الشفا', en: 'Ash Shifa' },
  { ar: 'حي العزيزية', en: 'Al Aziziyah' },
  { ar: 'حي بدر', en: 'Badr' },
  { ar: 'حي السويدي', en: 'As Suwaidi' },
  { ar: 'حي طويق', en: 'Tuwaiq' },
  { ar: 'حي لبن', en: 'Laban' },
  { ar: 'حي العريجاء', en: 'Al Uraija' },
  { ar: 'حي الحزم', en: 'Al Hazm' },
  { ar: 'حي نمار', en: 'Namar' },
  { ar: 'حي المونسية', en: 'Al Munsiyah' },
  { ar: 'حي الخليج', en: 'Al Khaleej' },
  { ar: 'حي الازدهار', en: 'Al Izdihar' },
  { ar: 'حي الرائد', en: 'Ar Raid' },
  { ar: 'حي المروج', en: 'Al Muruj' },
  { ar: 'حي الورود', en: 'Al Woroud' },
  { ar: 'حي الرحمانية', en: 'Ar Rahmaniyah' },
  { ar: 'حي الربيع', en: 'Ar Rabie' },
  { ar: 'حي القيروان', en: 'Al Qirawan' },
  { ar: 'حي المهدية', en: 'Al Mahdiyah' },
  { ar: 'حي ظهرة لبن', en: 'Dhahrat Laban' },
  { ar: 'حي الرمال', en: 'Ar Rimal' },
  { ar: 'حي قرطبة', en: 'Qurtubah' },
  { ar: 'حي غرناطة', en: 'Ghirnatah' },
];
function extractArticlesForSitemap() {
  const articlesPath = path.join(process.cwd(), 'client', 'src', 'data', 'articles.ts');
  const t = readText(articlesPath);

  // Extract id, title, titleEn from each article object (double-quoted strings).
  const re = /\{[\s\S]*?\bid:\s*(\d+)\s*,[\s\S]*?\btitle:\s*"([^"]+)"\s*,[\s\S]*?\btitleEn:\s*"([^"]+)"\s*,[\s\S]*?\}/g;
  const items = [];
  let m;
  while ((m = re.exec(t))) {
    const id = Number(m[1]);
    const title = m[2];
    const titleEn = m[3];
    if (Number.isFinite(id) && title) items.push({ id, title, titleEn });
  }

  const seen = new Set();
  return items.filter((a) => {
    if (seen.has(a.id)) return false;
    seen.add(a.id);
    return true;
  });
}


function addUrl(urls, pathname) {
  const u = SITE_URL + (pathname.startsWith('/') ? pathname : '/' + pathname);
  urls.push(u);
}

function buildSitemap() {
  const urls = [];
  const now = new Date().toISOString().slice(0,10);

  // Core pages
  const core = [
    '/', '/ar', '/en',
    '/ar/about', '/en/about',
    '/ar/services', '/en/services',
    '/ar/projects', '/en/projects',
    '/ar/case-studies', '/en/case-studies',
    '/ar/gallery', '/en/gallery',
    '/ar/blog', '/en/blog',
    '/ar/faq', '/en/faq',
    '/ar/contact', '/en/contact',
    '/ar/request-service', '/en/request-service',
    '/ar/locations', '/en/locations'
  ];
  core.forEach(p => addUrl(urls, p));

  const { cities, services } = extractCitiesAndServices();
  for (const c of cities) {
    addUrl(urls, `/ar/locations/${c.arSlug}`);
    addUrl(urls, `/en/locations/${c.slug}`);

    for (const s of services) {
      // Arabic city-service slug format: <service>-في-<city>
      addUrl(urls, `/ar/locations/${c.arSlug}/${s.arSlug}-في-${c.arSlug}`);
      addUrl(urls, `/en/locations/${c.slug}/${s.slug}-in-${c.slug}`);

      // Neighborhood long-tail pages (Riyadh only, curated list)
      if (c.slug === 'riyadh') {
        for (const n of RIYADH_NEIGHBORHOODS) {
          const hoodAr = slugifyAr(n.ar);
          const hoodEn = slugifyEn(n.en);
          addUrl(urls, `/ar/locations/${c.arSlug}/${s.arSlug}-في-${c.arSlug}/${hoodAr}`);
          addUrl(urls, `/en/locations/${c.slug}/${s.slug}-in-${c.slug}/${hoodEn}`);
        }
      }
    }
  }

  const articles = extractArticlesForSitemap();
  for (const a of articles) {
    const arBase = truncateSlugWords(slugifyAr(a.title), 10);
    const enBase = truncateSlugWords(slugifyEn(a.titleEn || a.title), 12);
    const arSlug = `${arBase}-${a.id}`;
    const enSlug = `${enBase}-${a.id}`;

    addUrl(urls, `/ar/blog/${arSlug}`);
    addUrl(urls, `/en/blog/${enSlug}`);
  }

  const uniqueUrls = uniq(urls);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    uniqueUrls.map(u => `  <url><loc>${xmlEscape(u)}</loc><lastmod>${now}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`;

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, xml, 'utf8');

  return uniqueUrls.length;
}

const count = buildSitemap();
console.log(`Generated: client/public/sitemap.xml (URLs: ${count})`);
console.log('Tip: set SITE_URL in Netlify to your custom domain for correct links.');
