import { useLanguage } from '@/contexts/LanguageContext';
import { IconGprRadar, IconDrill, IconPump, IconSoilGrouting, IconLabTest, IconEngineering } from '@/components/icons/etlaq';
import type { FC } from 'react';

type Equipment = {
  Icon: FC<{ className?: string }>;
  nameAr: string;
  nameEn: string;
  purposeAr: string;
  purposeEn: string;
  specsAr: string[];
  specsEn: string[];
  category: 'detection' | 'grouting' | 'testing';
  badge?: { ar: string; en: string };
};

const EQUIPMENT: Equipment[] = [
  {
    Icon: IconGprRadar,
    nameAr: 'رادار اختراق الأرض (GPR)',
    nameEn: 'Ground Penetrating Radar (GPR)',
    purposeAr: 'كشف التكهفات والفراغات تحت السطح بدون حفر',
    purposeEn: 'Non-invasive detection of voids and cavities below the surface',
    specsAr: ['عمق تغطية حتى 5م+', 'مسح سريع وغير مدمّر', 'مناسب للمباني القائمة'],
    specsEn: ['Depth coverage up to 5m+', 'Fast non-invasive scan', 'Suitable for existing structures'],
    category: 'detection',
    badge: { ar: 'الأكثر استخدامًا', en: 'Most used' },
  },
  {
    Icon: IconEngineering,
    nameAr: 'المقاومة الكهربائية (ERT)',
    nameEn: 'Electrical Resistivity Tomography (ERT)',
    purposeAr: 'تصوير مقطعي للتربة وكشف التغيرات في التكوين الجيولوجي',
    purposeEn: 'Tomographic imaging of soil and detecting geological composition changes',
    specsAr: ['عمق تغطية عميق (10–30م)', 'مناسب للمشاريع الكبيرة', 'نتائج قابلة للتحليل الكمي'],
    specsEn: ['Deep coverage (10–30m)', 'Suitable for large-scale projects', 'Quantitatively analyzable results'],
    category: 'detection',
  },
  {
    Icon: IconLabTest,
    nameAr: 'MASW / تحليل موجات السطح',
    nameEn: 'MASW / Surface Wave Analysis',
    purposeAr: 'تحديد خصائص التربة (Vs30) ودعم تصميم الأساسات الزلزالية',
    purposeEn: 'Determine soil properties (Vs30) and support seismic foundation design',
    specsAr: ['معيار دولي لتصنيف التربة', 'مطلوب في تصاميم الأساسات المعقدة', 'سريع ودقيق'],
    specsEn: ['International soil classification standard', 'Required for complex foundation design', 'Fast and accurate'],
    category: 'detection',
  },
  {
    Icon: IconPump,
    nameAr: 'مضخات الحقن عالية الضغط',
    nameEn: 'High-pressure grouting pumps',
    purposeAr: 'ضخ مواد الحقن (أسمنتية / كيميائية) بضغط محكوم ودقيق',
    purposeEn: 'Pumping grouting materials (cement/chemical) with controlled and precise pressure',
    specsAr: ['ضغط متحكم فيه', 'مناسب للتربة كثيفة والعميقة', 'توثيق ضغط التشغيل'],
    specsEn: ['Controlled pressure', 'Suitable for dense and deep soil', 'Operating pressure logging'],
    category: 'grouting',
    badge: { ar: 'أساسي', en: 'Core' },
  },
  {
    Icon: IconDrill,
    nameAr: 'معدات الحفر والمثقاب الدوار',
    nameEn: 'Drilling & rotary boring equipment',
    purposeAr: 'تنفيذ نقاط الحقن بدقة في الأعماق المطلوبة',
    purposeEn: 'Precise drilling of injection points at required depths',
    specsAr: ['حفر دقيق بزوايا متعددة', 'مناسب لضيق المواقع', 'تنفيذ داخل المباني القائمة'],
    specsEn: ['Precise drilling at multiple angles', 'Suitable for constrained spaces', 'In-structure execution'],
    category: 'grouting',
  },
  {
    Icon: IconSoilGrouting,
    nameAr: 'وحدة خلط وتحضير مواد الحقن',
    nameEn: 'Grout mixing & preparation unit',
    purposeAr: 'تحضير خلطات الحقن بنسب دقيقة حسب خصائص التربة',
    purposeEn: 'Preparing grout mixes with precise ratios based on soil characteristics',
    specsAr: ['تحكم دقيق في نسبة الخلط', 'مواد أسمنتية وبولي يوريثان', 'موثق حسب المعايير'],
    specsEn: ['Precise mix ratio control', 'Cement and polyurethane materials', 'Documented per standards'],
    category: 'grouting',
  },
];

const CATEGORY_CONFIG = {
  detection: {
    labelAr: 'تقنيات الكشف والتشخيص',
    labelEn: 'Detection & Diagnosis Technologies',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    dot: 'bg-amber-500',
  },
  grouting: {
    labelAr: 'معدات الحقن والتنفيذ',
    labelEn: 'Grouting & Execution Equipment',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    dot: 'bg-blue-500',
  },
  testing: {
    labelAr: 'أجهزة الاختبار والقياس',
    labelEn: 'Testing & Measurement Devices',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    dot: 'bg-emerald-500',
  },
} as const;

type Props = { className?: string };

export default function EquipmentShowcase({ className = '' }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const detectionItems = EQUIPMENT.filter(e => e.category === 'detection');
  const groutingItems = EQUIPMENT.filter(e => e.category === 'grouting');

  const EquipCard = ({ eq }: { eq: Equipment }) => {
    const cat = CATEGORY_CONFIG[eq.category];
    const Icon = eq.Icon;
    return (
      <div className="group rounded-2xl border bg-white p-5 hover:shadow-md transition-all duration-200 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition">
              <Icon className="h-7 w-7 text-slate-600" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-sm leading-tight">
                {isAr ? eq.nameAr : eq.nameEn}
              </h3>
            </div>
          </div>
          {eq.badge && (
            <span className={`flex-shrink-0 text-xs font-bold rounded-full px-2.5 py-0.5 border ${cat.color}`}>
              {isAr ? eq.badge.ar : eq.badge.en}
            </span>
          )}
        </div>

        <p className="text-slate-500 text-xs leading-relaxed text-start">
          {isAr ? eq.purposeAr : eq.purposeEn}
        </p>

        <ul className="space-y-1 mt-auto">
          {(isAr ? eq.specsAr : eq.specsEn).map((spec, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
              <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${cat.dot}`} />
              {spec}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className={`py-16 md:py-20 ${className}`} aria-label={isAr ? 'معداتنا وتقنياتنا' : 'Our equipment & technologies'}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-600 mb-4">
            🔧 {isAr ? 'المعدات والتقنيات' : 'Equipment & Technologies'}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {isAr ? 'أدواتنا الميدانية المتخصصة' : 'Our Specialized Field Tools'}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            {isAr
              ? 'نمتلك ونشغّل منظومة متكاملة من معدات الكشف والحقن لضمان دقة التشخيص وكفاءة التنفيذ في كل مشروع.'
              : 'We own and operate an integrated system of detection and grouting equipment to ensure diagnostic accuracy and execution efficiency on every project.'}
          </p>
        </div>

        {/* Detection technologies */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className={`inline-flex items-center gap-2 text-sm font-bold rounded-full px-3 py-1 border ${CATEGORY_CONFIG.detection.color}`}>
              <div className={`h-2 w-2 rounded-full ${CATEGORY_CONFIG.detection.dot}`} />
              {isAr ? CATEGORY_CONFIG.detection.labelAr : CATEGORY_CONFIG.detection.labelEn}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {detectionItems.map(eq => <EquipCard key={eq.nameEn} eq={eq} />)}
          </div>
        </div>

        {/* Grouting equipment */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className={`inline-flex items-center gap-2 text-sm font-bold rounded-full px-3 py-1 border ${CATEGORY_CONFIG.grouting.color}`}>
              <div className={`h-2 w-2 rounded-full ${CATEGORY_CONFIG.grouting.dot}`} />
              {isAr ? CATEGORY_CONFIG.grouting.labelAr : CATEGORY_CONFIG.grouting.labelEn}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groutingItems.map(eq => <EquipCard key={eq.nameEn} eq={eq} />)}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 rounded-xl border bg-slate-50 p-4 text-center text-sm text-slate-500">
          {isAr
            ? '⚡ جميع معداتنا صيانة دورية ومعايرة — نضمن جاهزيتها الكاملة قبل كل مشروع.'
            : '⚡ All equipment undergoes regular maintenance and calibration — we guarantee full readiness before each project.'}
        </div>
      </div>
    </section>
  );
}
