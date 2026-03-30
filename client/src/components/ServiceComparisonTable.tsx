import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { Button } from '@/components/ui/button';
import { Check, Minus } from 'lucide-react';

type Feature = {
  labelAr: string;
  labelEn: string;
  grouting: boolean | string;
  cavity: boolean | string;
  geophysical: boolean | string;
};

const FEATURES: Feature[] = [
  {
    labelAr: 'يشخّص ما تحت السطح',
    labelEn: 'Diagnoses subsurface',
    grouting: false,
    cavity: true,
    geophysical: true,
  },
  {
    labelAr: 'يعالج الفراغات والتكهفات مباشرة',
    labelEn: 'Directly treats voids/cavities',
    grouting: true,
    cavity: false,
    geophysical: false,
  },
  {
    labelAr: 'يقوّي التربة ويرفع قدرة التحمّل',
    labelEn: 'Strengthens soil bearing capacity',
    grouting: true,
    cavity: false,
    geophysical: false,
  },
  {
    labelAr: 'لا يتطلب حفرًا مفتوحًا',
    labelEn: 'No open excavation needed',
    grouting: true,
    cavity: true,
    geophysical: true,
  },
  {
    labelAr: 'مناسب داخل المباني القائمة',
    labelEn: 'Suitable inside existing buildings',
    grouting: true,
    cavity: true,
    geophysical: 'جزئي',
  },
  {
    labelAr: 'يدعم قرار التصميم والبناء',
    labelEn: 'Supports design/construction decisions',
    grouting: false,
    cavity: 'جزئي',
    geophysical: true,
  },
  {
    labelAr: 'مخرج رئيسي: تقرير فني',
    labelEn: 'Key output: Technical report',
    grouting: true,
    cavity: true,
    geophysical: true,
  },
  {
    labelAr: 'مخرج رئيسي: معالجة فعلية للتربة',
    labelEn: 'Key output: Physical soil treatment',
    grouting: true,
    cavity: false,
    geophysical: false,
  },
  {
    labelAr: 'موصى به قبل الأعمال الحساسة',
    labelEn: 'Recommended before critical works',
    grouting: 'أحيانًا',
    cavity: true,
    geophysical: true,
  },
  {
    labelAr: 'متوفر في جميع مناطق KSA',
    labelEn: 'Available across all KSA regions',
    grouting: true,
    cavity: true,
    geophysical: true,
  },
];

const SERVICE_META = [
  {
    key: 'grouting',
    labelAr: 'حقن التربة',
    labelEn: 'Soil Grouting',
    href: '/services/grouting',
    requestHref: '/request-service?service=grouting',
    accentClass: 'text-blue-700',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    badgeClass: 'bg-blue-600 text-white',
    bestForAr: 'هبوط، تشققات، معالجة',
    bestForEn: 'Settlement, cracks, remediation',
  },
  {
    key: 'cavity',
    labelAr: 'كشف التكهفات',
    labelEn: 'Cavity Detection',
    href: '/services/cavity',
    requestHref: '/request-service?service=cavity',
    accentClass: 'text-amber-700',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    badgeClass: 'bg-amber-500 text-white',
    bestForAr: 'تشخيص أولي، اشتباه فراغات',
    bestForEn: 'Initial diagnosis, suspected voids',
  },
  {
    key: 'geophysical',
    labelAr: 'الدراسات الجيوفيزيائية',
    labelEn: 'Geophysical Surveys',
    href: '/services/geophysical',
    requestHref: '/request-service?service=geophysical',
    accentClass: 'text-emerald-700',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    badgeClass: 'bg-emerald-600 text-white',
    bestForAr: 'قبل البناء، دراسات الموقع',
    bestForEn: 'Before construction, site studies',
  },
] as const;

function CellValue({ value, isAr }: { value: boolean | string; isAr: boolean }) {
  if (value === true) return <Check className="h-5 w-5 text-emerald-600 mx-auto" aria-label={isAr ? 'نعم' : 'Yes'} />;
  if (value === false) return <Minus className="h-4 w-4 text-slate-300 mx-auto" aria-label={isAr ? 'لا' : 'No'} />;
  // Partial string (Arabic or English)
  const display = isAr ? (value === 'جزئي' ? 'جزئي' : value === 'أحيانًا' ? 'أحيانًا' : value) : (value === 'جزئي' ? 'Partial' : value === 'أحيانًا' ? 'Sometimes' : value);
  return <span className="text-xs font-semibold text-slate-500">{display}</span>;
}

type Props = { className?: string };

export default function ServiceComparisonTable({ className = '' }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className={`py-16 ${className}`} aria-label={isAr ? 'مقارنة الخدمات' : 'Service comparison'}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-600 mb-4">
            ⚖️ {isAr ? 'مقارنة الخدمات' : 'Service Comparison'}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {isAr ? 'ما الفرق بين خدماتنا؟' : 'What\'s the difference between our services?'}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            {isAr
              ? 'جدول مقارنة سريع لمساعدتك على تحديد الخدمة الأنسب لحالتك.'
              : 'Quick comparison table to help you identify the best service for your case.'}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border shadow-sm">
          <table className="w-full min-w-[540px] border-collapse bg-white">
            <thead>
              <tr>
                <th className="text-start p-4 bg-slate-50 text-slate-500 text-sm font-semibold border-b w-[40%]">
                  {isAr ? 'الميزة / المعيار' : 'Feature / Criterion'}
                </th>
                {SERVICE_META.map(s => (
                  <th key={s.key} className={`p-4 border-b border-s text-center ${s.bgClass}`}>
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${s.badgeClass} mb-1`}>
                      {isAr ? s.labelAr : s.labelEn}
                    </span>
                    <div className={`text-[11px] font-medium ${s.accentClass}`}>
                      {isAr ? s.bestForAr : s.bestForEn}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((feat, i) => (
                <tr
                  key={i}
                  className={`border-b last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                >
                  <td className="p-4 text-sm text-slate-700 font-medium text-start">
                    {isAr ? feat.labelAr : feat.labelEn}
                  </td>
                  <td className="p-4 border-s text-center">
                    <CellValue value={feat.grouting} isAr={isAr} />
                  </td>
                  <td className="p-4 border-s text-center">
                    <CellValue value={feat.cavity} isAr={isAr} />
                  </td>
                  <td className="p-4 border-s text-center">
                    <CellValue value={feat.geophysical} isAr={isAr} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Service CTAs */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SERVICE_META.map(s => (
            <div key={s.key} className={`rounded-xl border p-4 ${s.bgClass} ${s.borderClass}`}>
              <div className={`font-bold mb-1 ${s.accentClass}`}>
                {isAr ? s.labelAr : s.labelEn}
              </div>
              <div className="text-xs text-slate-500 mb-3">
                {isAr ? s.bestForAr : s.bestForEn}
              </div>
              <div className="flex gap-2 flex-wrap">
                <LocalizedLink href={s.requestHref}>
                  <Button size="sm" className="text-xs" onClick={() => {}}>
                    {isAr ? 'اطلب الآن' : 'Request'}
                  </Button>
                </LocalizedLink>
                <LocalizedLink href={s.href}>
                  <Button size="sm" variant="outline" className="text-xs">
                    {isAr ? 'تفاصيل' : 'Details'}
                  </Button>
                </LocalizedLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
