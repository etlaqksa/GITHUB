import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

type Testimonial = {
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  cityAr: string;
  cityEn: string;
  textAr: string;
  textEn: string;
  rating: number;
  serviceKey: 'grouting' | 'cavity' | 'geophysical';
  initial: string;
  colorClass: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    nameAr: 'م. عبدالله الشمري',
    nameEn: 'Eng. Abdullah Al-Shammari',
    roleAr: 'مدير مشاريع — شركة مقاولات',
    roleEn: 'Projects Manager — Construction Co.',
    cityAr: 'الرياض',
    cityEn: 'Riyadh',
    textAr:
      'تعاملنا مع إطلاق في مشروع حقن تربة تحت أحد المباني السكنية الذي كان يعاني من هبوط واضح. الفريق كان منظمًا، التقرير كان واضحًا ويدعم القرار، والتنفيذ تم على مراحل منضبطة. النتيجة كانت إيجابية ونوصي بهم بثقة.',
    textEn:
      'We worked with Etlaq on a soil grouting project under a residential building with visible settlement. The team was organized, the report clear and decision-supportive, and execution was phased and disciplined. The result was positive and we recommend them confidently.',
    rating: 5,
    serviceKey: 'grouting',
    initial: 'ع',
    colorClass: 'bg-blue-600',
  },
  {
    nameAr: 'أحمد العتيبي',
    nameEn: 'Ahmed Al-Otaibi',
    roleAr: 'مالك عقار',
    roleEn: 'Property Owner',
    cityAr: 'جدة',
    cityEn: 'Jeddah',
    textAr:
      'كنت قلقًا من تشققات ظهرت في منزلي وكنت لا أعرف السبب. اتصلت بإطلاق وأجروا كشفًا بالجيوريدار، وشرحوا لي النتائج بطريقة مفهومة بدون تعقيد. اكتشفنا فراغات تحت الأساس وعولجنا المشكلة بحقن موجّه. أنا مرتاح الآن.',
    textEn:
      'I was worried about cracks in my home and didn\'t know the cause. I contacted Etlaq and they ran a GPR scan, explaining the results clearly without confusion. We found voids under the foundation and treated them with targeted grouting. I\'m at ease now.',
    rating: 5,
    serviceKey: 'cavity',
    initial: 'أ',
    colorClass: 'bg-amber-600',
  },
  {
    nameAr: 'م. فهد الدوسري',
    nameEn: 'Eng. Fahad Al-Dossari',
    roleAr: 'مهندس إنشائي — مكتب استشاري',
    roleEn: 'Structural Engineer — Consultancy',
    cityAr: 'الدمام',
    cityEn: 'Dammam',
    textAr:
      'تعاونت مع إطلاق في دراسة جيوفيزيائية (MASW) لتحديد خصائص التربة قبل تصميم الأساسات. المخرجات كانت واضحة وقابلة للاستخدام مباشرة في التصميم. تميّزوا بالدقة والالتزام بالجدول الزمني.',
    textEn:
      'I collaborated with Etlaq on a geophysical survey (MASW) to determine soil properties before foundation design. The outputs were clear and directly usable in design. They stood out for their accuracy and schedule adherence.',
    rating: 5,
    serviceKey: 'geophysical',
    initial: 'ف',
    colorClass: 'bg-emerald-600',
  },
  {
    nameAr: 'عبدالرحمن القحطاني',
    nameEn: 'Abdulrahman Al-Qahtani',
    roleAr: 'مطوّر عقاري',
    roleEn: 'Real Estate Developer',
    cityAr: 'الرياض',
    cityEn: 'Riyadh',
    textAr:
      'في أحد مشاريع التطوير العقاري كان لدينا اشتباه بوجود تكهفات قبل البناء. تعاقدنا مع إطلاق وأجروا المسح الجيوفيزيائي والكشف بدقة، وخرجنا بخريطة واضحة لمناطق الاشتباه. التقرير ساعدنا على اتخاذ قرار المعالجة بشكل صحيح.',
    textEn:
      'In one of our development projects, we suspected cavities before construction. We contracted Etlaq who performed the geophysical survey and detection precisely, giving us a clear map of suspected zones. The report helped us make the right remediation decision.',
    rating: 5,
    serviceKey: 'geophysical',
    initial: 'ع',
    colorClass: 'bg-purple-600',
  },
  {
    nameAr: 'م. سالم الزهراني',
    nameEn: 'Eng. Salem Al-Zahrani',
    roleAr: 'مهندس مدني — جهة حكومية',
    roleEn: 'Civil Engineer — Government Entity',
    cityAr: 'مكة المكرمة',
    cityEn: 'Makkah',
    textAr:
      'تعاملنا مع إطلاق في مشروع حساس يتطلب معالجة التربة تحت بنية قائمة. الفريق أبدى احترافية عالية في التنسيق والتنفيذ مع التقليل من الإزعاج للموقع. التوثيق والتقارير كانت على مستوى رفيع.',
    textEn:
      'We worked with Etlaq on a sensitive project requiring soil treatment under an existing structure. The team showed high professionalism in coordination and execution while minimizing site disruption. Documentation and reports were high quality.',
    rating: 5,
    serviceKey: 'grouting',
    initial: 'س',
    colorClass: 'bg-blue-700',
  },
];

const SERVICE_LABELS: Record<Testimonial['serviceKey'], { ar: string; en: string; color: string }> = {
  grouting: { ar: 'حقن التربة', en: 'Soil Grouting', color: 'bg-blue-100 text-blue-700' },
  cavity: { ar: 'كشف التكهفات', en: 'Cavity Detection', color: 'bg-amber-100 text-amber-700' },
  geophysical: { ar: 'الدراسات الجيوفيزيائية', en: 'Geophysical Surveys', color: 'bg-emerald-100 text-emerald-700' },
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} stars out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
        />
      ))}
    </div>
  );
}

type Props = {
  className?: string;
};

export default function TestimonialsSection({ className = '' }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance every 5s unless user paused
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(t);
  }, [paused]);

  const prev = () => {
    setPaused(true);
    setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };
  const next = () => {
    setPaused(true);
    setActive((p) => (p + 1) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[active];
  if (!t) return null;
  const svcLabel = SERVICE_LABELS[t.serviceKey];

  return (
    <section className={`py-16 ${className}`} aria-label={isAr ? 'آراء العملاء' : 'Client testimonials'}>
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-sm font-semibold text-amber-700 mb-4">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {isAr ? 'آراء العملاء' : 'Client Testimonials'}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {isAr ? 'ماذا يقول عملاؤنا' : 'What our clients say'}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            {isAr
              ? 'تجارب حقيقية من عملاء استفادوا من خدماتنا في مختلف مناطق المملكة'
              : 'Real experiences from clients who benefited from our services across KSA'}
          </p>
        </div>

        {/* Testimonial card */}
        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="rounded-2xl border bg-white shadow-lg shadow-slate-100 p-6 md:p-8 transition-all duration-300">
            {/* Quote icon */}
            <div className="absolute -top-4 rtl:right-8 ltr:left-8">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                <Quote className="h-4 w-4 text-white fill-white" />
              </div>
            </div>

            {/* Service badge */}
            <div className="flex items-start justify-between mb-4 flex-wrap gap-2 pt-2">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${svcLabel.color}`}>
                {isAr ? svcLabel.ar : svcLabel.en}
              </span>
              <StarRow rating={t.rating} />
            </div>

            {/* Quote text */}
            <blockquote className="text-slate-700 text-sm md:text-base leading-relaxed mb-6 text-start">
              {isAr ? `"${t.textAr}"` : `"${t.textEn}"`}
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-3 border-t pt-4">
              <div
                className={`h-10 w-10 rounded-full ${t.colorClass} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                aria-hidden="true"
              >
                {t.initial}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 text-sm">{isAr ? t.nameAr : t.nameEn}</div>
                <div className="text-xs text-slate-500 truncate">
                  {isAr ? t.roleAr : t.roleEn} — {isAr ? t.cityAr : t.cityEn}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={prev}
              aria-label={isAr ? 'السابق' : 'Previous'}
              className="h-9 w-9 rounded-full border bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>

            {/* Dots */}
            <div className="flex gap-1.5" role="tablist" aria-label={isAr ? 'تنقل بين الآراء' : 'Navigate testimonials'}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => { setPaused(true); setActive(i); }}
                  className={`h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    i === active ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`${isAr ? 'رأي' : 'Review'} ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label={isAr ? 'التالي' : 'Next'}
              className="h-9 w-9 rounded-full border bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Rating summary bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-slate-700">5.0</span>
            <span>{isAr ? 'تقييم متوسط' : 'avg. rating'}</span>
          </div>
          <span className="hidden sm:block h-4 w-px bg-slate-200" aria-hidden />
          <span>
            {isAr ? `${TESTIMONIALS.length}+ تقييم موثّق` : `${TESTIMONIALS.length}+ verified reviews`}
          </span>
          <span className="hidden sm:block h-4 w-px bg-slate-200" aria-hidden />
          <span>{isAr ? 'عملاء في جميع مناطق المملكة' : 'Clients across all KSA regions'}</span>
        </div>
      </div>
    </section>
  );
}
