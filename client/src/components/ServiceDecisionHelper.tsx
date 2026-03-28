import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { ChevronLeft, ChevronRight, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Step = {
  idAr: string;
  idEn: string;
  questionAr: string;
  questionEn: string;
  options: {
    labelAr: string;
    labelEn: string;
    next: string; // step id or 'result:key'
  }[];
};

type Result = {
  serviceAr: string;
  serviceEn: string;
  descAr: string;
  descEn: string;
  reasonAr: string;
  reasonEn: string;
  href: string;
  requestHref: string;
  color: string;
  bgColor: string;
};

const STEPS: Record<string, Step> = {
  start: {
    idAr: 'الوضع الحالي',
    idEn: 'Current Situation',
    questionAr: 'ما الذي يصف وضعك بشكل أفضل؟',
    questionEn: 'What best describes your situation?',
    options: [
      { labelAr: 'ظهرت تشققات أو هبوط في المبنى', labelEn: 'Cracks or settlement appeared in the building', next: 'cracks' },
      { labelAr: 'أشك في وجود تكهفات أو فراغات تحت الأرض', labelEn: 'I suspect cavities or voids underground', next: 'cavity_suspect' },
      { labelAr: 'أحتاج دراسة وتشخيص قبل البناء أو التصميم', labelEn: 'I need a study/diagnosis before construction or design', next: 'result:geophysical' },
      { labelAr: 'لدي مشكلة مختلفة أو لست متأكدًا', labelEn: 'I have a different issue or am unsure', next: 'result:assessment' },
    ],
  },
  cracks: {
    idAr: 'طبيعة التشقق',
    idEn: 'Nature of Cracks',
    questionAr: 'كيف تصف التشققات أو الهبوط؟',
    questionEn: 'How would you describe the cracks or settlement?',
    options: [
      { labelAr: 'تشققات واسعة / هبوط واضح ومتزايد', labelEn: 'Wide cracks / clear and increasing settlement', next: 'result:grouting' },
      { labelAr: 'تشققات بسيطة لكنها تتكرر في نفس المنطقة', labelEn: 'Minor cracks but recurring in the same area', next: 'result:cavity' },
      { labelAr: 'لا أعرف سبب التشققات', labelEn: 'I don\'t know the cause of the cracks', next: 'result:cavity' },
    ],
  },
  cavity_suspect: {
    idAr: 'الاشتباه بالتكهف',
    idEn: 'Cavity Suspicion',
    questionAr: 'ما سبب اشتباهك بوجود تكهفات؟',
    questionEn: 'What makes you suspect cavities?',
    options: [
      { labelAr: 'هبوط موضعي أو أصوات فارغة عند الدق', labelEn: 'Localized settlement or hollow sounds when tapping', next: 'result:cavity' },
      { labelAr: 'تسرب مياه سابق أو تغيّر في التربة', labelEn: 'Previous water leakage or soil condition change', next: 'result:cavity_then_grouting' },
      { labelAr: 'قريب من مشاريع حفر أو خندق', labelEn: 'Near excavation or trenching works', next: 'result:geophysical' },
    ],
  },
};

const RESULTS: Record<string, Result> = {
  grouting: {
    serviceAr: 'حقن التربة',
    serviceEn: 'Soil Grouting',
    descAr: 'الخيار المناسب لحالتك',
    descEn: 'Right choice for your case',
    reasonAr:
      'التشققات الواسعة والهبوط المتزايد عادةً ما يشيران إلى ضعف في التربة أو فراغات تحت الأساس. حقن التربة يعالج هذا مباشرةً بتقوية المنطقة المتأثرة.',
    reasonEn:
      'Wide cracks and increasing settlement typically indicate weak soil or voids under the foundation. Soil grouting addresses this directly by strengthening the affected zone.',
    href: '/services/grouting',
    requestHref: '/request-service?service=grouting',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50 border-blue-200',
  },
  cavity: {
    serviceAr: 'كشف التكهفات أولاً',
    serviceEn: 'Cavity Detection First',
    descAr: 'ابدأ بالتشخيص قبل المعالجة',
    descEn: 'Start with diagnosis before treatment',
    reasonAr:
      'التكرار في نفس المنطقة أو عدم معرفة السبب يستوجب تشخيصًا دقيقًا أولاً. الكشف يحدد موضع الفراغات ونطاقها ثم نختار المعالجة المناسبة.',
    reasonEn:
      'Recurrence in the same area or unknown cause warrants precise diagnosis first. Detection identifies void locations and extent, then we choose appropriate treatment.',
    href: '/services/cavity',
    requestHref: '/request-service?service=cavity',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 border-amber-200',
  },
  cavity_then_grouting: {
    serviceAr: 'كشف + حقن',
    serviceEn: 'Detection + Grouting',
    descAr: 'نهج متكامل لحالتك',
    descEn: 'Integrated approach for your case',
    reasonAr:
      'تسرب المياه السابق أو تغيّر التربة قد يكون سبّب فراغات. الأفضل: كشف أولاً لتحديد النطاق، ثم حقن موجّه للمناطق المتأثرة.',
    reasonEn:
      'Previous water leakage or soil changes may have caused voids. Best approach: detection first to define scope, then targeted grouting of affected areas.',
    href: '/services/cavity',
    requestHref: '/request-service?service=cavity',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 border-amber-200',
  },
  geophysical: {
    serviceAr: 'الدراسات الجيوفيزيائية',
    serviceEn: 'Geophysical Surveys',
    descAr: 'التشخيص الأمثل لحالتك',
    descEn: 'Optimal diagnosis for your case',
    reasonAr:
      'قبل البناء أو بالقرب من أعمال حفر، الدراسة الجيوفيزيائية تعطيك صورة واضحة لما تحت السطح وتدعم قرارات التصميم والمعالجة.',
    reasonEn:
      'Before construction or near excavation, geophysical surveys give you a clear picture of the subsurface, supporting design and remediation decisions.',
    href: '/services/geophysical',
    requestHref: '/request-service?service=geophysical',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50 border-emerald-200',
  },
  assessment: {
    serviceAr: 'تقييم مبدئي',
    serviceEn: 'Initial Assessment',
    descAr: 'أخبرنا بتفاصيل حالتك',
    descEn: 'Tell us about your situation',
    reasonAr:
      'حالتك تحتاج تقييمًا مباشرًا. أخبرنا بتفاصيل ما تواجهه وسنحدد الخطوة الأنسب.',
    reasonEn:
      'Your case needs direct assessment. Tell us about what you\'re facing and we\'ll identify the right next step.',
    href: '/request-service',
    requestHref: '/request-service',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50 border-blue-200',
  },
};

type Props = { className?: string };

export default function ServiceDecisionHelper({ className = '' }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [currentStep, setCurrentStep] = useState<string>('start');
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleOption = (next: string) => {
    if (next.startsWith('result:')) {
      const key = next.replace('result:', '');
      setResult(key);
    } else {
      setHistory((h) => [...h, currentStep]);
      setCurrentStep(next);
    }
  };

  const handleBack = () => {
    if (result) {
      setResult(null);
    } else if (history.length > 0) {
      const prev = history[history.length - 1]!;
      setHistory((h) => h.slice(0, -1));
      setCurrentStep(prev);
    }
  };

  const handleReset = () => {
    setCurrentStep('start');
    setResult(null);
    setHistory([]);
  };

  const step = STEPS[currentStep];
  const res = result ? RESULTS[result] : null;
  const canGoBack = result !== null || history.length > 0;

  // Progress indicator
  const totalSteps = 3;
  const currentProgress = history.length + (result ? 1 : 0);

  return (
    <section className={`py-16 ${className}`}>
      <div className="container">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-4">
              <span>🎯</span>
              {isAr ? 'أي خدمة أحتاج؟' : 'Which service do I need?'}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {isAr ? 'دليل اختيار الخدمة المناسبة' : 'Service Selection Guide'}
            </h2>
            <p className="text-slate-500 text-sm">
              {isAr
                ? 'أجب على سؤالين أو ثلاثة لنعرف ما الأنسب لحالتك'
                : 'Answer 2-3 questions to find the right service for your case'}
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i < currentProgress ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Card */}
          <div className="rounded-2xl border bg-white shadow-lg shadow-slate-100 overflow-hidden">
            {/* Result view */}
            {res && (
              <div className="p-6 md:p-8">
                <div className={`rounded-xl border p-4 mb-6 ${res.bgColor}`}>
                  <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                    {isAr ? 'التوصية' : 'Recommendation'}
                  </div>
                  <div className={`text-xl font-bold mb-1 ${res.color}`}>
                    {isAr ? res.serviceAr : res.serviceEn}
                  </div>
                  <div className="text-sm font-semibold text-slate-600">
                    {isAr ? res.descAr : res.descEn}
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 text-start">
                  {isAr ? res.reasonAr : res.reasonEn}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <LocalizedLink href={res.requestHref} className="flex-1">
                    <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                      {isAr ? 'اطلب الخدمة الآن' : 'Request Service Now'}
                      {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </LocalizedLink>
                  <LocalizedLink href={res.href} className="flex-1">
                    <Button variant="outline" className="w-full gap-2" size="lg">
                      {isAr ? 'تفاصيل الخدمة' : 'Service Details'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </LocalizedLink>
                </div>
              </div>
            )}

            {/* Question view */}
            {!res && step && (
              <div className="p-6 md:p-8">
                <div className="mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {isAr ? step.idAr : step.idEn}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6 text-start leading-snug">
                  {isAr ? step.questionAr : step.questionEn}
                </h3>

                <div className="space-y-3">
                  {step.options.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleOption(opt.next)}
                      className="w-full text-start rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.99] flex items-center justify-between gap-3"
                    >
                      <span>{isAr ? opt.labelAr : opt.labelEn}</span>
                      <span className="flex-shrink-0 text-slate-400">
                        {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom bar */}
            <div className="border-t bg-slate-50 px-6 py-3 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={!canGoBack}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                {isAr ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
                {isAr ? 'السابق' : 'Back'}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {isAr ? 'ابدأ من جديد' : 'Start over'}
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            {isAr
              ? 'هذا الدليل للتوجيه الأولي فقط. تواصل معنا لتقييم دقيق لحالتك.'
              : 'This guide is for initial direction only. Contact us for an accurate assessment of your case.'}
          </p>
        </div>
      </div>
    </section>
  );
}
