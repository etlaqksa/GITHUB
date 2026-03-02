// Internal linking dictionaries (AR/EN)
//
// This file is designed to be easy to extend.
//
// - Add/adjust service keywords in SERVICE_KEYWORD_ALIASES.
// - Add a new city in src/data/seoLocations.ts (cities list). City linking will pick it up automatically.

export type InternalLang = 'ar' | 'en';

export type ServiceKey =
  | 'soil-grouting'
  | 'void-detection'
  | 'geophysical-surveys'
  | 'foundation-strengthening';

export const DEFAULT_MAX_LINKS_PER_DEST = 3;

export const SERVICE_KEYWORD_ALIASES: Array<{
  serviceKey: ServiceKey;
  ar: string[];
  en: string[];
  /** Optional link label helper for title/aria */
  titleAr: string;
  titleEn: string;
}> = [
  {
    serviceKey: 'soil-grouting',
    titleAr: 'حقن التربة (الحقن الأسمنتي)',
    titleEn: 'Soil Grouting',
    ar: [
      'حقن التربة',
      'حقن تربة',
      'الحقن الأسمنتي',
      'حقن أسمنتي',
      'حقن الاسمنت',
      'الحقن بالأسمنت',
      'الحقن بالإسمنت',
      'Grouting',
      'grouting',
    ],
    en: [
      'soil grouting',
      'cement grouting',
      'cement injection',
      'ground improvement',
      'grouting',
    ],
  },
  {
    serviceKey: 'void-detection',
    titleAr: 'كشف التكهفات والفراغات',
    titleEn: 'Cavity Detection',
    ar: [
      'كشف التكهفات',
      'كشف تكهفات',
      'كشف الفراغات',
      'كشف فراغات',
      'التكهفات',
      'الفراغات',
      'تخريم',
      'Cavity Probing',
      'cavity probing',
      'probing',
    ],
    en: [
      'cavity detection',
      'cavities',
      'cavity',
      'void detection',
      'voids',
      'void',
      'sinkhole',
      'cavity probing',
      'probing',
    ],
  },
  {
    serviceKey: 'geophysical-surveys',
    titleAr: 'الاختبارات الجيوفيزيائية',
    titleEn: 'Geophysical Tests',
    ar: [
      'الاختبارات الجيوفيزيائية',
      'اختبارات جيوفيزيائية',
      'مسح جيوفيزيائي',
      'مسوحات جيوفيزيائية',
      'جيوفيزياء',
      'حلول جيوفيزيائية',
      'GPR',
      'ERT',
      'MASW',
      'Seismic',
    ],
    en: [
      'geophysical tests',
      'geophysical surveys',
      'geophysics',
      'geophysical',
      'GPR',
      'ERT',
      'MASW',
      'seismic',
    ],
  },
  {
    serviceKey: 'foundation-strengthening',
    titleAr: 'تقوية الأساسات',
    titleEn: 'Foundation Strengthening',
    ar: ['تقوية الأساسات', 'تقوية اساسات', 'معالجة الهبوط', 'معالجة التشققات'],
    en: ['foundation strengthening', 'settlement remediation', 'underpinning', 'crack repair'],
  },
];

/**
 * Extra Arabic city token prefixes that are often attached directly without a space.
 * We match both the base name and these attached forms.
 */
export const AR_CITY_ATTACHED_PREFIXES = ['بال', 'ب'];
