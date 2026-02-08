// SEO landing pages: Cities and services (Arabic + English)
//
// We support bilingual slugs:
// - English routes keep ASCII slugs (stable).
// - Arabic routes use Arabic slugs (better UX/SEO for Arabic search).

export type City = {
  slug: string;
  /** Arabic slug for Arabic routes (e.g., "المدينة-المنورة"). */
  arSlug: string;
  ar: string;
  en: string;
};

export type ServiceLanding = {
  slug: string;
  /** Arabic base slug (without city suffix) for Arabic routes. */
  arSlug: string;
  // Short names for headings
  ar: string;
  en: string;
  // A few synonyms used in copy/SEO (keep it natural; avoid keyword stuffing)
  arSynonyms: string[];
  enSynonyms: string[];
  // Where to direct users if there is a dedicated service page
  // (base-relative paths; Router base handles /ar or /en)
  servicePageHref?: string;
};

import { slugifyAr, serviceSlugArWithCity } from '@/lib/slugify';

// Major cities/regions in Saudi Arabia (as provided by the user)
export const cities: City[] = [
  { slug: 'riyadh', arSlug: 'الرياض', ar: 'الرياض', en: 'Riyadh' },
  { slug: 'jeddah', arSlug: 'جدة', ar: 'جدة', en: 'Jeddah' },
  { slug: 'dammam', arSlug: 'الدمام', ar: 'الدمام', en: 'Dammam' },
  { slug: 'khobar', arSlug: 'الخبر', ar: 'الخبر', en: 'Khobar' },
  { slug: 'madinah', arSlug: 'المدينة-المنورة', ar: 'المدينة المنورة', en: 'Madinah' },
  { slug: 'makkah', arSlug: 'مكة-المكرمة', ar: 'مكة المكرمة', en: 'Makkah' },
  { slug: 'taif', arSlug: 'الطائف', ar: 'الطائف', en: 'Taif' },
  { slug: 'buraidah', arSlug: 'بريدة', ar: 'بريدة', en: 'Buraidah' },
  { slug: 'unaizah', arSlug: 'عنيزة', ar: 'عنيزة', en: 'Unaizah' },
  { slug: 'qassim', arSlug: 'القصيم', ar: 'القصيم', en: 'Al Qassim' },
  { slug: 'hail', arSlug: 'حائل', ar: 'حائل', en: 'Hail' },
  { slug: 'abha', arSlug: 'أبها', ar: 'أبها', en: 'Abha' },
  { slug: 'khamis-mushait', arSlug: 'خميس-مشيط', ar: 'خميس مشيط', en: 'Khamis Mushait' },
  { slug: 'jazan', arSlug: 'جيزان', ar: 'جيزان', en: 'Jazan' },
  { slug: 'najran', arSlug: 'نجران', ar: 'نجران', en: 'Najran' },
  { slug: 'tabuk', arSlug: 'تبوك', ar: 'تبوك', en: 'Tabuk' },
  { slug: 'yanbu', arSlug: 'ينبع', ar: 'ينبع', en: 'Yanbu' },
  { slug: 'jubail', arSlug: 'الجبيل', ar: 'الجبيل', en: 'Jubail' },
  { slug: 'al-hofuf', arSlug: 'الهفوف', ar: 'الهفوف', en: 'Al Hofuf' },
  { slug: 'qatif', arSlug: 'القطيف', ar: 'القطيف', en: 'Qatif' },
  { slug: 'dhahran', arSlug: 'الظهران', ar: 'الظهران', en: 'Dhahran' },
  { slug: 'arar', arSlug: 'عرعر', ar: 'عرعر', en: 'Arar' },
  { slug: 'al-bahah', arSlug: 'الباحة', ar: 'الباحة', en: 'Al Bahah' },
  { slug: 'qurayyat', arSlug: 'القريات', ar: 'القريات', en: 'Al Qurayyat' },
  { slug: 'sakaka', arSlug: 'سكاكا', ar: 'سكاكا', en: 'Sakaka' },
  { slug: 'zulfi', arSlug: 'الزلفي', ar: 'الزلفي', en: 'Az Zulfi' },
  { slug: 'majmaah', arSlug: 'المجمعة', ar: 'المجمعة', en: 'Al Majma’ah' },
  { slug: 'al-rass', arSlug: 'الرس', ar: 'الرس', en: 'Al Rass' },
];

// Core service landings derived from your keyword set
export const serviceLandings: ServiceLanding[] = [
  {
    slug: 'soil-grouting',
    arSlug: 'حقن-تربة',
    ar: 'حقن التربة (الحقن الأسمنتي)',
    en: 'Soil Grouting (Cement Injection)',
    arSynonyms: ['حقن أسمنتي', 'حقن تربة', 'معالجة التربة', 'تقوية التربة'],
    enSynonyms: ['cement grouting', 'soil injection', 'ground improvement'],
    servicePageHref: '/services/grouting',
  },
  {
    slug: 'void-detection',
    arSlug: 'كشف-تكهفات',
    ar: 'كشف الفراغات والتكهفات',
    en: 'Void & Cavity Detection',
    arSynonyms: ['كشف فراغات', 'كشف التكهفات', 'فحص فراغات التربة', 'فحص الكهوف'],
    enSynonyms: ['void detection', 'cavity detection', 'sinkhole investigation'],
    servicePageHref: '/services/cavity',
  },
  {
    slug: 'geophysical-surveys',
    arSlug: 'اختبارات-جيوفيزيائية',
    ar: 'الدراسات الجيوفيزيائية',
    en: 'Geophysical Surveys',
    arSynonyms: ['مسح جيوفيزيائي', 'GPR', 'ERT', 'Seismic'],
    enSynonyms: ['GPR', 'ERT', 'seismic survey', 'geophysical survey'],
    servicePageHref: '/services/geophysical',
  },
  {
    slug: 'foundation-strengthening',
    arSlug: 'تقوية-أساسات',
    ar: 'تقوية الأساسات ومعالجة الهبوط والتشققات',
    en: 'Foundation Strengthening & Settlement Remediation',
    arSynonyms: ['معالجة هبوطات', 'معالجة تشققات', 'تصدعات المباني', 'تقوية أساسات'],
    enSynonyms: ['underpinning', 'settlement remediation', 'foundation strengthening', 'crack repair'],
    // No dedicated service page in the current build; we route to Request Service.
    servicePageHref: '/request-service?service=grouting',
  },
];

// ---- Helpers

export function getCitySlug(city: City, lang: 'ar' | 'en') {
  return lang === 'ar' ? city.arSlug : city.slug;
}

export function getServiceSlug(service: ServiceLanding, lang: 'ar' | 'en', city?: City) {
  if (lang === 'ar') {
    // City-service landings use service slug WITH city suffix for Arabic.
    return city ? serviceSlugArWithCity(service.arSlug, city.arSlug) : service.arSlug;
  }
  return service.slug;
}

export function normalizeServiceSlugParam(param: string, city?: City) {
  const p = String(param || '').replace(/^\/+|\/+$/g, '');
  if (!p) return p;

  // Preferred Arabic patterns:
  // 1) <serviceAr>-في-<cityAr>
  // 2) legacy: <serviceAr>-ب<cityAr>
  const tryStrip = (cityArSlug: string) => {
    const suffix1 = `-في-${cityArSlug}`;
    if (p.endsWith(suffix1)) return p.slice(0, -suffix1.length);

    const suffix2 = `-ب${cityArSlug}`;
    if (p.endsWith(suffix2)) return p.slice(0, -suffix2.length);

    // Also handle "-بالرياض" style (legacy)
    const suffix3 = `-بال${cityArSlug}`;
    if (p.endsWith(suffix3)) return p.slice(0, -suffix3.length);

    return undefined;
  };

  if (city?.arSlug) {
    const stripped = tryStrip(city.arSlug);
    if (stripped) return stripped;
  }

  // Try to strip for ANY known city (handles cases where city was not resolved yet)
  for (const c of cities) {
    const stripped = tryStrip(c.arSlug);
    if (stripped) return stripped;
  }


  // Map legacy base slugs to the current canonical base slugs
  const legacyMap: Record<string, string> = {
    'حقن-التربة': 'حقن-تربة',
    'كشف-التكهفات': 'كشف-تكهفات',
    'الاختبارات-الجيوفيزيائية': 'اختبارات-جيوفيزيائية',
    'تقوية-الأساسات': 'تقوية-أساسات',
  };
  if (legacyMap[p]) return legacyMap[p];

  // Otherwise return as-is
  return p;
}

export function findCity(slugOrArSlug: string) {
  const s = String(slugOrArSlug || '').replace(/^\/+|\/+$/g, '');
  return cities.find((c) => c.slug === s || c.arSlug === s);
}

export function findServiceLanding(slugOrArSlugOrCitySuffix: string, city?: City) {
  const raw = String(slugOrArSlugOrCitySuffix || '').replace(/^\/+|\/+$/g, '');
  if (!raw) return undefined;

  const normalized = normalizeServiceSlugParam(raw, city);

  // Match English slug
  const byEn = serviceLandings.find((s) => s.slug === raw || s.slug === normalized);
  if (byEn) return byEn;

  // Match Arabic base slug
  const byAr = serviceLandings.find((s) => s.arSlug === raw || s.arSlug === normalized);
  if (byAr) return byAr;

  // Last-resort: try slugifying Arabic name and matching
  const guess = slugifyAr(raw);
  return serviceLandings.find((s) => s.arSlug === guess);
}
