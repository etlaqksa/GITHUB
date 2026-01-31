// Central keyword bank (Arabic + English) derived from the user's master list.
// Notes:
// - We DO NOT inject all of these into meta keywords (Google ignores meta keywords anyway).
// - This file powers the internal /keywords page and CSV exports for campaigns.
// - Keep groups curated; avoid stuffing on-page copy.

export type KeywordGroup = {
  id: string;
  titleAr: string;
  titleEn: string;
  ar: string[];
  en: string[];
  notesAr?: string;
  notesEn?: string;
};

export const keywordGroups: KeywordGroup[] = [
  {
    id: 'grouting',
    titleAr: 'الحقن الأسمنتي وحقن التربة والخرسانة',
    titleEn: 'Cement / Soil / Concrete Grouting',
    ar: [
      'حقن أسمنتي',
      'حقن التربة',
      'حقن تربة',
      'شركة حقن',
      'شركة حقن تربة',
      'شركات حقن تربة',
      'شركة حقن التربة',
      'شركات حقن التربة',
      'شركة حقن تربه',
      'شركات حقن تربه',
      'شركة حقن خرسانة',
      'شركات حقن الخرسانة',
      'حقن الخرسانة',
      'معالجة التربة',
      'شركات معالجة التربة',
    ],
    en: [
      'cement grouting',
      'soil grouting',
      'soil injection',
      'ground improvement',
      'pressure grouting',
      'concrete injection',
      'void filling grouting',
      'grouting contractor',
      'grouting company',
    ],
    notesAr: 'استخدم هذه المجموعة لاستهداف خدمات الحقن ورفع قدرة التحمل ومعالجة ضعف التربة.',
    notesEn: 'Use for grouting services and ground improvement intent.',
  },
  {
    id: 'settlement_cracks',
    titleAr: 'معالجة الهبوط والتشققات وتصدعات المباني وتقوية الأساسات',
    titleEn: 'Settlement, Cracks & Foundation Strengthening',
    ar: [
      'شركة معالجة هبوطات',
      'شركة معالجة تشققات',
      'شركة تقوية أساسات',
      'تقوية الأساسات',
      'شركات تقوية الأساسات',
      'تشققات مباني',
      'تصدعات المباني',
      'تصدع أساسات',
      'هبوطات مبنى',
      'هبوط مباني',
      'هبوط أساس',
      'مشاكل التربة',
      'مشاكل الأساسات',
      'معالجة الهبوط الأرضي',
    ],
    en: [
      'settlement remediation',
      'building settlement repair',
      'foundation strengthening',
      'underpinning',
      'crack repair',
      'structural crack repair',
      'foundation repair',
      'ground settlement',
    ],
  },
  {
    id: 'voids_sinkholes',
    titleAr: 'كشف الفراغات والتكهفات والكهوف',
    titleEn: 'Void, Cavity & Sinkhole Investigation',
    ar: [
      'كشف فراغات',
      'كشف الفراغات',
      'فحص فراغات التربة',
      'معالجة الفراغات',
      'دراسة تكهفات',
      'دراسة التكهفات',
      'كشف تكهفات',
      'معالجة التكهفات',
      'فحص الكهوف',
      'كشف الكهوف',
    ],
    en: [
      'void detection',
      'cavity detection',
      'subsurface voids',
      'sinkhole investigation',
      'cavity mapping',
      'voids assessment',
    ],
  },
  {
    id: 'geotech_geo',
    titleAr: 'فحص التربة والدراسات الجيوتقنية والجيولوجية والتقارير',
    titleEn: 'Geotechnical / Geological Investigation & Reports',
    ar: [
      'دراسة التربة',
      'تقرير تربة',
      'تقارير تربة',
      'تقرير فحص تربة',
      'فحص تربة',
      'فحص تربة جيولوجي',
      'فحص جيولوجي',
      'دراسة جيولوجية',
      'تقارير جيوتقنية',
      'شركة دراسات جيوتقنية',
      'شركات جيوتقنية',
      'جيوتكنيك',
      'استشارات هندسية',
      'مكتب هندسي',
      'مكاتب هندسية',
      'شركة هندسية',
      'شركات هندسية بالسعودية',
      'مهندس جيولوجي',
      'مهندسون جيولوجيون',
    ],
    en: [
      'soil investigation',
      'soil testing',
      'geotechnical investigation',
      'geotechnical report',
      'soil report',
      'geological survey',
      'engineering consulting',
      'geotechnical consulting',
    ],
  },
  {
    id: 'brand',
    titleAr: 'العلامة التجارية',
    titleEn: 'Brand',
    ar: [
      'إطلاق المتميزة',
      'شركة إطلاق المتميزة',
      'شركة إطلاق المتميزة للحقن',
      'شركة إطلاق المتميزة لفحص التربة',
      'etlaqksa',
      'etlaqksa.com',
    ],
    en: [
      'ETLAQ DISTINGUISHED COMPANY',
      'etlaqksa',
      'etlaqksa.com',
      'Etlaq',
      'Etlaq KSA',
    ],
  },
];
