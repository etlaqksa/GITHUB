import type { City, ServiceLanding } from '@/data/seoLocations';

// A curated keyword set (Google ignores meta keywords, but we still keep
// them for completeness and to reflect the user's provided targets).
// We keep it compact to avoid bloated head tags.

const coreAr = [
  'حقن أسمنتي',
  'حقن التربة',
  'حقن تربة',
  'شركة حقن تربة',
  'حقن الخرسانة',
  'تقوية الأساسات',
  'شركة تقوية أساسات',
  'معالجة الهبوطات',
  'معالجة تشققات',
  'كشف فراغات',
  'كشف التكهفات',
  'الدراسات الجيوفيزيائية',
  'فحص تربة',
  'تقارير جيوتقنية',
  'استشارات هندسية',
  'جيوتكنيك',
  'شركة إطلاق المتميزة',
  'etlaqksa',
];

const coreEn = [
  'cement grouting',
  'soil grouting',
  'soil injection',
  'concrete injection',
  'foundation strengthening',
  'underpinning',
  'settlement remediation',
  'crack repair',
  'void detection',
  'cavity detection',
  'sinkhole investigation',
  'geophysical surveys',
  'GPR',
  'ERT',
  'seismic survey',
  'geotechnical investigation',
  'geotechnical reports',
  'engineering consulting',
  'ETLAQ DISTINGUISHED COMPANY',
  'etlaqksa',
];

export function buildSiteKeywords(lang: 'ar' | 'en') {
  return (lang === 'ar' ? coreAr : coreEn).join(', ');
}

export function buildLandingKeywords(lang: 'ar' | 'en', city?: City | null, service?: ServiceLanding | null) {
  const base = lang === 'ar' ? [...coreAr] : [...coreEn];

  if (service) {
    if (lang === 'ar') {
      base.unshift(service.ar);
      base.unshift(...service.arSynonyms.slice(0, 3));
    } else {
      base.unshift(service.en);
      base.unshift(...service.enSynonyms.slice(0, 3));
    }
  }

  if (city) {
    if (lang === 'ar') {
      base.unshift(city.ar);
      // Common long-tail pattern
      if (service) base.unshift(`${service.ar} في ${city.ar}`);
    } else {
      base.unshift(city.en);
      if (service) base.unshift(`${service.en} in ${city.en}`);
    }
  }

  // Deduplicate + cap length
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of base) {
    const key = k.trim();
    if (!key) continue;
    const lower = key.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    out.push(key);
    if (out.length >= 40) break;
  }

  return out.join(', ');
}
