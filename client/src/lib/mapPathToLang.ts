import { getLangFromPathname, stripLangPrefix } from '@/lib/localizePath';
import { findCity, findServiceLanding, getCitySlug, getServiceSlug } from '@/data/seoLocations';

// Important: keep this module lightweight.
// Do NOT import the large articles dataset here.

type Lang = 'ar' | 'en';

function safeDecode(seg: string) {
  try {
    return decodeURIComponent(seg);
  } catch {
    return seg;
  }
}

function safeEncode(seg: string) {
  // Keep hyphens readable; encode Arabic and other unicode.
  return encodeURIComponent(seg).replace(/%2F/g, '/');
}

/**
 * Map the current route to the other language while keeping semantic equivalence.
 *
 * Input can be:
 * - full pathname ("/ar/locations/..."), or
 * - a bare path without prefix ("/locations/...").
 */
export function mapPathToLang(inputPath: string, targetLang: Lang): string {
  const raw = String(inputPath || '/');
  const pathnameOnly = raw.split('?')[0].split('#')[0] || '/';
  const currentLang = (getLangFromPathname(pathnameOnly) || 'ar') as Lang;
  const stripped = stripLangPrefix(pathnameOnly) || '/';

  // Already in target language and already prefixed.
  if (currentLang === targetLang && (pathnameOnly.startsWith('/ar') || pathnameOnly.startsWith('/en'))) {
    return pathnameOnly;
  }

  const parts = stripped.split('/').filter(Boolean).map(safeDecode);

  // Home
  if (parts.length === 0) {
    return `/${targetLang}`;
  }

  // Locations
  if (parts[0] === 'locations') {
    if (parts.length === 1) return `/${targetLang}/locations`;

    const cityParam = parts[1];
    const city = findCity(cityParam);
    if (!city) return `/${targetLang}${stripped}`;

    const citySlug = getCitySlug(city, targetLang);
    if (parts.length === 2) {
      return `/${targetLang}/locations/${safeEncode(citySlug)}`;
    }

    const serviceParam = parts[2];
    const service = findServiceLanding(serviceParam, city);
    if (!service) {
      return `/${targetLang}/locations/${safeEncode(citySlug)}/${safeEncode(serviceParam)}`;
    }

    const serviceSlug = getServiceSlug(service, targetLang, city);
    return `/${targetLang}/locations/${safeEncode(citySlug)}/${safeEncode(serviceSlug)}`;
  }

  // Blog (keep path as-is; BlogPost canonicalization handles cross-language slugs).
  if (parts[0] === 'blog') {
    return `/${targetLang}${stripped}`;
  }

  // Default: keep same stripped path
  return `/${targetLang}${stripped}`;
}

/** Map a bare internal link (no /ar or /en prefix) to the requested language. */
export function localizeBarePathToLang(barePath: string, lang: Lang): string {
  const p = String(barePath || '/');
  if (p.startsWith('/ar/') || p === '/ar' || p.startsWith('/en/') || p === '/en') {
    return mapPathToLang(p, lang).replace(/^\/(ar|en)/, '');
  }
  // Pretend it's an English-ish path when localizing to Arabic so we can map /locations/riyadh/... correctly.
  const hinted = lang === 'ar' ? `/en${p.startsWith('/') ? p : `/${p}`}` : `/ar${p.startsWith('/') ? p : `/${p}`}`;
  const mapped = mapPathToLang(hinted, lang);
  return mapped.replace(/^\/(ar|en)/, '');
}
