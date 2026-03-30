import { useLanguage } from '@/contexts/LanguageContext';
import { useRef, useState, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Step = {
  numAr: string;
  numEn: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  tagAr: string;
  tagEn: string;
  accent: string;
  bg: string;
  border: string;
};

const STEPS: Step[] = [
  {
    numAr: '١', numEn: '01',
    titleAr: 'استلام الطلب والمعلومات الأولية',
    titleEn: 'Request & initial information',
    descAr: 'نستلم طلبك مع أي صور أو وثائق متاحة، ونفهم طبيعة المشكلة ونطاق الموقع قبل أي اقتراح.',
    descEn: 'We receive your request with any available photos or documents, and understand the problem nature and site scope before any proposal.',
    tagAr: 'التواصل', tagEn: 'Contact',
    accent: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200',
  },
  {
    numAr: '٢', numEn: '02',
    titleAr: 'تقييم مبدئي وتحديد التقنية المناسبة',
    titleEn: 'Initial assessment & technique selection',
    descAr: 'بناءً على المعلومات المتاحة، نحدد أي التقنيات أنسب (GPR / ERT / MASW) وما إذا كان الكشف يسبق الحقن.',
    descEn: 'Based on available information, we determine which technique fits (GPR / ERT / MASW) and whether detection should precede grouting.',
    tagAr: 'تشخيص', tagEn: 'Diagnosis',
    accent: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200',
  },
  {
    numAr: '٣', numEn: '03',
    titleAr: 'معاينة الموقع والفحص الميداني',
    titleEn: 'Site visit & field inspection',
    descAr: 'فريقنا يزور الموقع لتوثيق الحالة الفعلية وجمع قياسات ميدانية دقيقة تدعم تصميم خطة التدخل.',
    descEn: 'Our team visits the site to document actual conditions and collect precise field measurements that support intervention plan design.',
    tagAr: 'ميداني', tagEn: 'Field',
    accent: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200',
  },
  {
    numAr: '٤', numEn: '04',
    titleAr: 'تصميم خطة التنفيذ المرحلية',
    titleEn: 'Staged execution plan design',
    descAr: 'نصمم خطة تنفيذ مفصّلة على مراحل تحدد: نقاط التدخل، مواصفات المواد، أسلوب الحقن، وآلية مراقبة الجودة.',
    descEn: 'We design a detailed staged execution plan specifying: intervention points, material specs, grouting method, and quality monitoring approach.',
    tagAr: 'تخطيط', tagEn: 'Planning',
    accent: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200',
  },
  {
    numAr: '٥', numEn: '05',
    titleAr: 'التنفيذ مع مراقبة ميدانية مستمرة',
    titleEn: 'Execution with continuous monitoring',
    descAr: 'نفذ المشروع على مراحل مع مراقبة ميدانية مستمرة، تعديل الخطة عند الحاجة، وتوثيق كل مرحلة بدقة.',
    descEn: 'Execute the project in stages with continuous field monitoring, adjusting the plan when needed, and precisely documenting each phase.',
    tagAr: 'تنفيذ', tagEn: 'Execution',
    accent: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200',
  },
  {
    numAr: '٦', numEn: '06',
    titleAr: 'التقرير النهائي والتوصيات',
    titleEn: 'Final report & recommendations',
    descAr: 'نسلّم تقريرًا تقنيًا واضحًا يلخص الأعمال المنفذة، الملاحظات الميدانية، ويقترح خطوات المتابعة إن لزم.',
    descEn: 'We deliver a clear technical report summarizing executed works, field observations, and suggesting follow-up steps if needed.',
    tagAr: 'مخرجات', tagEn: 'Deliverables',
    accent: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200',
  },
];

type Props = { className?: string };

export default function ProcessTimeline({ className = '' }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-advance on mobile/small screens
  useEffect(() => {
    const id = setInterval(() => {
      setActive(p => (p + 1) % STEPS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const s = STEPS[active]!;

  return (
    <section className={`py-16 md:py-20 ${className}`} aria-label={isAr ? 'منهجيتنا' : 'Our process'}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-600 mb-4">
            ⚙️ {isAr ? 'منهجية العمل' : 'Our Methodology'}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {isAr ? 'كيف نعمل — خطوة بخطوة' : 'How We Work — Step by Step'}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            {isAr
              ? 'منهجية واضحة ومنضبطة في كل مشروع — من الاستلام الأول حتى التقرير النهائي.'
              : 'A clear and disciplined methodology for every project — from first contact to final report.'}
          </p>
        </div>

        {/* Desktop: Timeline grid */}
        <div className="hidden lg:grid grid-cols-6 gap-0 relative mb-10">
          {/* Connecting line */}
          <div className="absolute top-8 left-[8.33%] right-[8.33%] h-0.5 bg-slate-200 z-0" aria-hidden />
          {STEPS.map((step, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="relative z-10 flex flex-col items-center gap-3 px-2 group focus:outline-none"
            >
              {/* Number circle */}
              <div
                className={`h-16 w-16 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                  i === active
                    ? `${step.bg} ${step.border} ${step.accent} scale-110 shadow-lg`
                    : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:scale-105'
                }`}
              >
                {isAr ? step.numAr : step.numEn}
              </div>
              {/* Tag */}
              <span
                className={`text-xs font-semibold rounded-full px-2.5 py-0.5 transition-all ${
                  i === active ? `${step.bg} ${step.accent}` : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isAr ? step.tagAr : step.tagEn}
              </span>
            </button>
          ))}
        </div>

        {/* Active step detail */}
        <div
          key={active}
          className={`rounded-2xl border p-6 md:p-8 transition-all duration-300 ${s.bg} ${s.border}`}
          style={{ animation: 'fadeInUp 0.3s ease-out' }}
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Step number - large */}
            <div
              className={`flex-shrink-0 h-16 w-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold ${s.bg} ${s.border} ${s.accent} shadow-sm`}
            >
              {isAr ? s.numAr : s.numEn}
            </div>
            <div className="flex-1 min-w-0 text-start">
              <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${s.accent}`}>
                {isAr ? `الخطوة ${s.numAr}` : `Step ${s.numEn}`}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                {isAr ? s.titleAr : s.titleEn}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {isAr ? s.descAr : s.descEn}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile step buttons */}
        <div className="lg:hidden mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActive(p => Math.max(0, p - 1))}
            disabled={active === 0}
            className="h-10 w-10 rounded-full border bg-white flex items-center justify-center disabled:opacity-30 transition hover:bg-slate-50"
            aria-label={isAr ? 'السابق' : 'Previous'}
          >
            {isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>

          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-slate-700' : 'w-2 bg-slate-300'}`}
                aria-label={`${isAr ? 'خطوة' : 'Step'} ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActive(p => Math.min(STEPS.length - 1, p + 1))}
            disabled={active === STEPS.length - 1}
            className="h-10 w-10 rounded-full border bg-white flex items-center justify-center disabled:opacity-30 transition hover:bg-slate-50"
            aria-label={isAr ? 'التالي' : 'Next'}
          >
            {isAr ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <LocalizedLink href="/request-service">
            <Button size="lg" className="gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8">
              {isAr ? 'ابدأ المسار معنا الآن' : 'Start the process with us now'}
              {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </LocalizedLink>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
