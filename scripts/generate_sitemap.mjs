#!/usr/bin/env node
/**
 * Generate sitemap.xml from known routes + article slugs.
 *
 * Output:
 *  - client/public/sitemap.xml
 *
 * Configure base URL:
 *  - SITE_URL env var (recommended in Netlify)
 *  - fallback to https://etlaq1.netlify.app
 */
import fs from "node:fs";
import path from "node:path";

const SITE_URL = (process.env.SITE_URL || "https://etlaqksa.com").replace(/\/+$/, "");

const ROOT = process.cwd();
const ARTICLES_TS = path.join(ROOT, "client", "src", "data", "articles.ts");
const PROJECTS_TS = path.join(ROOT, "client", "src", "data", "projects.ts");
const LOCATIONS_TS = path.join(ROOT, "client", "src", "data", "seoLocations.ts");
const OUT = path.join(ROOT, "client", "public", "sitemap.xml");

function readArticlesSlugs() {
  const txt = fs.readFileSync(ARTICLES_TS, "utf8");
  const slugs = new Set();
  // slug: '...'
  const reSlug = /slug:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = reSlug.exec(txt))) {
    slugs.add(m[1]);
  }
  return Array.from(slugs);
}

function readProjectSlugs() {
  try {
    const txt = fs.readFileSync(PROJECTS_TS, "utf8");
    const slugs = new Set();
    const reSlug = /slug:\s*['"]([^'"]+)['"]/g;
    let m;
    while ((m = reSlug.exec(txt))) {
      slugs.add(m[1]);
    }
    return Array.from(slugs);
  } catch {
    return [];
  }
}

function readLocationSlugs() {
  try {
    const txt = fs.readFileSync(LOCATIONS_TS, "utf8");
    // cities: { slug: 'riyadh', ... }
    const citySlugs = new Set();
    const serviceSlugs = new Set();
    const reCity = /\{\s*slug:\s*['"]([^'"]+)['"][^\}]*\}/g;
    let m;
    // We'll parse all slug entries, then split by section heuristics
    // by checking whether the preceding few chars contain 'cities' or 'serviceLandings'.
    while ((m = reCity.exec(txt))) {
      const slug = m[1];
      const start = Math.max(0, m.index - 120);
      const ctx = txt.slice(start, m.index);
      if (ctx.includes('serviceLandings')) serviceSlugs.add(slug);
      else if (ctx.includes('cities')) citySlugs.add(slug);
    }
    return {
      cities: Array.from(citySlugs),
      services: Array.from(serviceSlugs),
    };
  } catch {
    return { cities: [], services: [] };
  }
}


function isoDate(d = new Date()) {
  // YYYY-MM-DD
  return d.toISOString().slice(0, 10);
}

function urlNode(loc, lastmod) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    "  </url>",
  ].filter(Boolean).join("\n");
}

function main() {
  const today = isoDate();
  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/services/grouting",
    "/services/cavity",
    "/services/geophysical",
    "/projects",
    "/case-studies",
    "/gallery",
    "/faq",
    "/contact",
    "/request-service",
    "/for/individuals",
    "/for/developers",
    "/for/contractors",
    "/for/government",
    "/white-paper",
    "/blog",
    "/locations",
  ];

  const slugs = readArticlesSlugs();
  const projectSlugs = readProjectSlugs();
  const loc = readLocationSlugs();
  const urls = [];

  const langs = ['ar', 'en'];
  const prefixed = (lang, route) => {
    if (route === '/') return `/${lang}/`;
    return `/${lang}${route.startsWith('/') ? route : `/${route}`}`;
  };

  for (const lang of langs) {
    for (const r of staticRoutes) {
      urls.push(urlNode(`${SITE_URL}${prefixed(lang, r)}`, today));
    }
    for (const slug of slugs) {
      urls.push(urlNode(`${SITE_URL}${prefixed(lang, `/blog/${slug}`)}`, today));
    }
    for (const slug of projectSlugs) {
      urls.push(urlNode(`${SITE_URL}${prefixed(lang, `/projects/${slug}`)}`, today));
    }

    // City and city-service landing pages
    for (const city of loc.cities) {
      urls.push(urlNode(`${SITE_URL}${prefixed(lang, `/locations/${city}`)}`, today));
      for (const svc of loc.services) {
        urls.push(urlNode(`${SITE_URL}${prefixed(lang, `/locations/${city}/${svc}`)}`, today));
      }
    }
  }

  const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, xml, "utf8");
  console.log(`Generated: ${path.relative(ROOT, OUT)} (URLs: ${urls.length})`);
  console.log(`Tip: set SITE_URL in Netlify to your custom domain for correct links.`);
}

main();