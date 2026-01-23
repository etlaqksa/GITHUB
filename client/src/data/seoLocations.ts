// SEO landing pages: Cities and services (Arabic + English)
// Slugs are ASCII for clean URLs. Names are localized.

export type City = {
  slug: string;
  ar: string;
  en: string;
};

export type ServiceLanding = {
  slug: string;
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

// Major cities/regions in Saudi Arabia (as provided by the user)
export const cities: City[] = [
  { slug: 'riyadh', ar: 'الرياض', en: 'Riyadh' },
  { slug: 'jeddah', ar: 'جدة', en: 'Jeddah' },
  { slug: 'dammam', ar: 'الدمام', en: 'Dammam' },
  { slug: 'khobar', ar: 'الخبر', en: 'Khobar' },
  { slug: 'madinah', ar: 'المدينة المنورة', en: 'Madinah' },
  { slug: 'makkah', ar: 'مكة المكرمة', en: 'Makkah' },
  { slug: 'taif', ar: 'الطائف', en: 'Taif' },
  { slug: 'buraidah', ar: 'بريدة', en: 'Buraidah' },
  { slug: 'unaizah', ar: 'عنيزة', en: 'Unaizah' },
  { slug: 'qassim', ar: 'القصيم', en: 'Al Qassim' },
  { slug: 'hail', ar: 'حائل', en: 'Hail' },
  { slug: 'abha', ar: 'أبها', en: 'Abha' },
  { slug: 'khamis-mushait', ar: 'خميس مشيط', en: 'Khamis Mushait' },
  { slug: 'jazan', ar: 'جيزان', en: 'Jazan' },
  { slug: 'najran', ar: 'نجران', en: 'Najran' },
  { slug: 'tabuk', ar: 'تبوك', en: 'Tabuk' },
  { slug: 'yanbu', ar: 'ينبع', en: 'Yanbu' },
  { slug: 'jubail', ar: 'الجبيل', en: 'Jubail' },
  { slug: 'al-hofuf', ar: 'الهفوف', en: 'Al Hofuf' },
  { slug: 'qatif', ar: 'القطيف', en: 'Qatif' },
  { slug: 'dhahran', ar: 'الظهران', en: 'Dhahran' },
  { slug: 'arar', ar: 'عرعر', en: 'Arar' },
  { slug: 'al-bahah', ar: 'الباحة', en: 'Al Bahah' },
  { slug: 'qurayyat', ar: 'القريات', en: 'Al Qurayyat' },
  { slug: 'sakaka', ar: 'سكاكا', en: 'Sakaka' },
  { slug: 'zulfi', ar: 'الزلفي', en: 'Az Zulfi' },
  { slug: 'majmaah', ar: 'المجمعة', en: 'Al Majma’ah' },
  { slug: 'al-rass', ar: 'الرس', en: 'Al Rass' },
];

// Core service landings derived from your keyword set
export const serviceLandings: ServiceLanding[] = [
  {
    slug: 'soil-grouting',
    ar: 'حقن التربة (الحقن الأسمنتي)',
    en: 'Soil Grouting (Cement Injection)',
    arSynonyms: ['حقن أسمنتي', 'حقن تربة', 'معالجة التربة', 'تقوية التربة'],
    enSynonyms: ['cement grouting', 'soil injection', 'ground improvement'],
    servicePageHref: '/services/grouting',
  },
  {
    slug: 'void-detection',
    ar: 'كشف الفراغات والتكهفات',
    en: 'Void & Cavity Detection',
    arSynonyms: ['كشف فراغات', 'كشف التكهفات', 'فحص فراغات التربة', 'فحص الكهوف'],
    enSynonyms: ['void detection', 'cavity detection', 'sinkhole investigation'],
    servicePageHref: '/services/cavity',
  },
  {
    slug: 'geophysical-surveys',
    ar: 'الدراسات الجيوفيزيائية',
    en: 'Geophysical Surveys',
    arSynonyms: ['مسح جيوفيزيائي', 'GPR', 'ERT', 'Seismic'],
    enSynonyms: ['GPR', 'ERT', 'seismic survey', 'geophysical survey'],
    servicePageHref: '/services/geophysical',
  },
  {
    slug: 'foundation-strengthening',
    ar: 'تقوية الأساسات ومعالجة الهبوط والتشققات',
    en: 'Foundation Strengthening & Settlement Remediation',
    arSynonyms: ['معالجة هبوطات', 'معالجة تشققات', 'تصدعات المباني', 'تقوية أساسات'],
    enSynonyms: ['underpinning', 'settlement remediation', 'foundation strengthening', 'crack repair'],
    // No dedicated service page in the current build; we route to Request Service.
    servicePageHref: '/request-service?service=grouting',
  },
];

export function findCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export function findServiceLanding(slug: string) {
  return serviceLandings.find((s) => s.slug === slug);
}
