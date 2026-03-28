import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Clock, FileText, MapPin, Wrench, Users } from 'lucide-react';

type Pillar = {
  icon: React.ElementType;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  accentColor: string;
  bgColor: string;
};

const PILLARS: Pillar[] = [
  {
    icon: Shield,
    titleAr: 'تشخيص قبل التنفيذ',
    titleEn: 'Diagnosis before execution',
    descAr: 'لا نبدأ بالحقن قبل أن نفهم المشكلة. نعتمد على البيانات وليس التخمين لتحديد النطاق الصحيح.',
    descEn: 'We don\'t start grouting before understanding the problem. We rely on data, not guesswork, to define the right scope.',
    accentColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Wrench,
    titleAr: 'تنفيذ مرحلي ومنضبط',
    titleEn: 'Phased and disciplined execution',
    descAr: 'التنفيذ على مراحل مع مراقبة ميدانية مستمرة يضمن تحكمًا أفضل في الجودة وتقليل المخاطر.',
    descEn: 'Phased execution with continuous field monitoring ensures better quality control and reduced risk.',
    accentColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: FileText,
    titleAr: 'مخرجات واضحة وقابلة للتنفيذ',
    titleEn: 'Clear and actionable deliverables',
    descAr: 'تقاريرنا مصممة لدعم قرارك، لا لملء رفوف الأرشيف. ملخص واضح + توصية محددة للخطوة التالية.',
    descEn: 'Our reports are designed to support your decision, not fill archive shelves. Clear summary + specific recommendation for the next step.',
    accentColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Clock,
    titleAr: 'خبرة ميدانية فعلية',
    titleEn: 'Real field experience',
    descAr: 'أكثر من 15 سنة في تنفيذ مشاريع حقيقية في مختلف مناطق المملكة. خبرة تراكمت عبر حالات متنوعة.',
    descEn: 'Over 15 years executing real projects across KSA regions. Experience accumulated through diverse cases.',
    accentColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: MapPin,
    titleAr: 'تغطية شاملة للمملكة',
    titleEn: 'Comprehensive KSA coverage',
    descAr: 'نصل إلى جميع مناطق المملكة. الرياض وجدة والدمام ومكة المكرمة والمدينة والمنطقة الشمالية وغيرها.',
    descEn: 'We reach all KSA regions: Riyadh, Jeddah, Dammam, Makkah, Madinah, Northern Region, and more.',
    accentColor: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
  {
    icon: Users,
    titleAr: 'فريق متخصص ومتكامل',
    titleEn: 'Specialized and integrated team',
    descAr: 'مهندسون جيوتقنيون، جيوفيزيائيون، وفريق تنفيذ ميداني ذو خبرة — كل ما تحتاجه تحت سقف واحد.',
    descEn: 'Geotechnical engineers, geophysicists, and experienced field execution team — everything you need under one roof.',
    accentColor: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
];

type Props = { className?: string };

export default function WhyChooseUs({ className = '' }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className={`py-16 ${className}`} aria-label={isAr ? 'لماذا إطلاق؟' : 'Why Etlaq?'}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-4">
            <span>✦</span>
            {isAr ? 'ما الذي يميزنا' : 'What sets us apart'}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {isAr ? 'لماذا شركة إطلاق المتميزة؟' : 'Why Etlaq Distinguished Company?'}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            {isAr
              ? 'ليس لأننا الأرخص أو الأسرع — بل لأننا نبدأ بالتشخيص الصحيح وننتهي بمخرجات تساعدك على اتخاذ القرار بثقة.'
              : 'Not because we\'re cheapest or fastest — but because we start with the right diagnosis and end with deliverables that help you decide with confidence.'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.titleEn}
                className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${pillar.bgColor}`}>
                  <Icon className={`h-6 w-6 ${pillar.accentColor}`} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-base">
                  {isAr ? pillar.titleAr : pillar.titleEn}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed text-start">
                  {isAr ? pillar.descAr : pillar.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-400 italic">
            {isAr
              ? '"الهدف ليس الحقن فقط — بل التأكد من أن المشكلة لن تعود."'
              : '"The goal isn\'t just grouting — it\'s making sure the problem won\'t come back."'}
          </p>
        </div>
      </div>
    </section>
  );
}
