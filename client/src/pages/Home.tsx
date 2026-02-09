import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/SEO';
import TrustStats from '@/components/TrustStats';
import { GALLERY_IMAGES, ImageSlideshow } from '@/components/ImageSlideshow';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Building2,
  ClipboardList,
  Drill,
  Droplets,
  HardHat,
  Radar,
  ShieldCheck,
  Sparkles,
  Timer,
} from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  const { language } = useLanguage();

  // HERO slideshow is controlled here so the navigation controls can sit above the hero content
  // (important for mobile where the hero text can overlap with the buttons).
  const heroImages = useMemo(() => GALLERY_IMAGES, []);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroCount = heroImages.length;
  const goToHero = (idx: number) => {
    if (!heroCount) return;
    const normalized = ((idx % heroCount) + heroCount) % heroCount;
    setHeroIndex(normalized);
  };
  const prevHero = () => goToHero(heroIndex - 1);
  const nextHero = () => goToHero(heroIndex + 1);

  const dotIndices = useMemo(() => {
    const maxDots = 7;
    if (!heroCount) return [] as number[];
    const count = Math.min(maxDots, heroCount);
    const half = Math.floor(count / 2);
    const start = heroIndex - half;
    return Array.from({ length: count }, (_, i) => ((start + i) % heroCount + heroCount) % heroCount);
  }, [heroCount, heroIndex]);

  const services = [
    {
      icon: Drill,
      key: 'grouting' as const,
      title: language === 'ar' ? 'حقن التربة' : 'Soil Grouting',
      desc:
        language === 'ar'
          ? 'تقوية التربة تحت الأساسات، معالجة التكهفات، وتقليل مخاطر الهبوط والتشققات عبر حلول حقن مناسبة للحالة.'
          : 'Strengthening soil under foundations, treating cavities, and reducing settlement/crack risks with fit-for-case grouting.',
      deliverables:
        language === 'ar'
          ? ['تقييم مبدئي وخطة تنفيذ واضحة', 'تنفيذ على مراحل حسب الحالة', 'مخرجات وتوصيات للخطوة التالية']
          : ['Initial assessment + clear plan', 'Phased execution per case', 'Deliverables and next-step recommendations'],
      href: '/services/grouting',
    },
    {
      icon: Radar,
      key: 'cavity' as const,
      title: language === 'ar' ? 'كشف التكهفات' : 'Cavity Detection',
      desc:
        language === 'ar'
          ? 'تحديد التكهفات المحتملة قبل تفاقم المشكلة، وإخراج نتائج تساعد على اختيار المعالجة الصحيحة.'
          : 'Detecting potential cavities before issues escalate, with results that guide the right remediation plan.',
      deliverables:
        language === 'ar'
          ? ['تحديد مؤشرات ومناطق الاشتباه', 'تقرير مختصر يدعم القرار', 'توصية بمسار المعالجة المناسب']
          : ['Indicators and suspected zones', 'Concise report for decisions', 'Recommended remediation route'],
      href: '/services/cavity',
    },
    {
      icon: ShieldCheck,
      key: 'geophysical' as const,
      title: language === 'ar' ? 'الدراسات الجيوفيزيائية' : 'Geophysical Surveys',
      desc:
        language === 'ar'
          ? 'تشخيص أدق لحالة الموقع والطبقات تحت السطح لدعم قرار المعالجة وخطة التنفيذ.'
          : 'Sharper subsurface diagnosis to support remediation decisions and execution planning.',
      deliverables:
        language === 'ar'
          ? ['قراءات ومسح للموقع حسب الحالة', 'مؤشرات للمناطق ذات الخطورة الأعلى', 'نتائج تساعد في تحديد نطاق العمل']
          : ['Site readings & survey per case', 'Indications of higher-risk zones', 'Results that help define scope'],
      href: '/services/geophysical',
    },
  ];

  // Quick paths by symptom / situation (conversion boost)
  const symptoms = [
    {
      icon: AlertTriangle,
      title: language === 'ar' ? 'تشققات أو هبوط' : 'Cracks or settlement',
      desc:
        language === 'ar'
          ? 'ابدأ بتقييم مبدئي لتحديد سبب المشكلة ومسار المعالجة الأنسب.'
          : 'Start with an initial assessment to identify cause and the best remediation path.',
      href: '/request-service?service=grouting',
      badge: language === 'ar' ? 'غالبًا: حقن التربة' : 'Often: grouting',
      iconBg: 'bg-primary/10',
    },
    {
      icon: Radar,
      title: language === 'ar' ? 'اشتباه تكهفات' : 'Suspected cavities',
      desc:
        language === 'ar'
          ? 'كشف مبكر يقلل المخاطر ويساعدك تختار المعالجة الصحيحة.'
          : 'Early detection reduces risk and helps you choose the right treatment.',
      href: '/request-service?service=cavity',
      badge: language === 'ar' ? 'ابدأ: كشف التكهفات' : 'Start: detection',
      iconBg: 'bg-accent/15',
    },
    {
      icon: HardHat,
      title: language === 'ar' ? 'قبل حفر أو تنفيذ' : 'Before excavation / works',
      desc:
        language === 'ar'
          ? 'تشخيص ما تحت السطح قبل القرارات المكلفة يساعد على تقليل المخاطر.'
          : 'Data-driven subsurface diagnosis before expensive decisions reduces risk.',
      href: '/request-service?service=geophysical',
      badge: language === 'ar' ? 'دراسة جيوفيزيائية' : 'Geophysics',
      iconBg: 'bg-primary/10',
    },
    {
      icon: Droplets,
      title: language === 'ar' ? 'بعد تسرب مياه / خزان' : 'After water leakage',
      desc:
        language === 'ar'
          ? 'التسربات قد تُضعف التربة أو تزيد احتمالية التكهفات—نقترح مسارًا واضحًا.'
          : 'Leakage can weaken soil or increase cavity risk—get a clear next step.',
      href: '/request-service?service=cavity',
      badge: language === 'ar' ? 'كشف ثم قرار' : 'Detect then decide',
      iconBg: 'bg-accent/15',
    },
  ];


  const audiences = [
    {
      key: 'individuals',
      title: language === 'ar' ? 'للأفراد وملاك العقارات' : 'Individuals & Owners',
      desc:
        language === 'ar'
          ? 'إذا ظهرت تشققات أو هبوط أو اشتباه تكهفات—ابدأ بتقييم سريع يحدد الخطوة التالية.'
          : 'If you see cracks, settlement, or suspected cavities—start with a quick path to the right next step.',
      href: '/for/individuals',
    },
    {
      key: 'developers',
      title: language === 'ar' ? 'للمطورين' : 'Developers',
      desc:
        language === 'ar'
          ? 'تقليل مخاطر الموقع قبل مراحل التنفيذ الحساسة عبر تشخيص واضح ثم معالجة منهجية.'
          : 'Reduce site risk before critical construction stages with clear diagnosis and staged treatment.',
      href: '/for/developers',
    },
    {
      key: 'contractors',
      title: language === 'ar' ? 'للمقاولين' : 'Contractors',
      desc:
        language === 'ar'
          ? 'استجابة ميدانية وتنفيذ منظم يتناسب مع الجداول ومتطلبات الجودة.'
          : 'On-site response and structured execution aligned with schedules and QA requirements.',
      href: '/for/contractors',
    },
    {
      key: 'government',
      title: language === 'ar' ? 'للجهات الحكومية' : 'Government',
      desc:
        language === 'ar'
          ? 'منهجية واضحة وتوثيق عملي لمشاريع البنية التحتية والأعمال العامة.'
          : 'Clear methodology and practical documentation for infrastructure and public works.',
      href: '/for/government',
    },
  ];

  const steps = [
    {
      icon: ClipboardList,
      title: language === 'ar' ? 'جمع البيانات والمعاينة' : 'Site info & assessment',
      desc:
        language === 'ar'
          ? 'نراجع المعطيات المتاحة ونحدد مؤشرات المشكلة ونطاقها.'
          : 'We review available information and define the problem indicators and scope.',
    },
    {
      icon: Radar,
      title: language === 'ar' ? 'تشخيص السبب المحتمل' : 'Root-cause diagnosis',
      desc:
        language === 'ar'
          ? 'تحديد سبب الهبوط/التشققات أو وجود تكهفات بوسائل مناسبة للحالة.'
          : 'Identify whether settlement/cracks are driven by weak soil, voids, or other causes using fit tools.',
    },
    {
      icon: Drill,
      title: language === 'ar' ? 'تنفيذ المعالجة على مراحل' : 'Phased remediation',
      desc:
        language === 'ar'
          ? 'تنفيذ الحقن/المعالجة بخطة مراحل مع مراقبة ميدانية.'
          : 'Execute grouting/remediation in phases with on-site monitoring.',
    },
    {
      icon: Timer,
      title: language === 'ar' ? 'تسليم المخرجات والتوصيات' : 'Deliverables & next steps',
      desc:
        language === 'ar'
          ? 'تسليم نتائج واضحة تساعدك تتخذ قرارك بثقة.'
          : 'Clear deliverables that help you make the next decision with confidence.',
    },
  ];

  const vision =
    language === 'ar'
      ? 'أن نكون مرجعًا في المملكة في كشف التكهفات وحقن التربة—بمعايير عالية من الدقة والسلامة والاستدامة.'
      : 'To be a leading reference in KSA for cavity detection and grouting—setting higher benchmarks for accuracy, safety, and sustainability.';

  const mission =
    language === 'ar'
      ? 'نُعيد تعريف الاستقرار تحت الأساسات عبر تشخيص أدق، وتنفيذ ميداني منظم، ومخرجات واضحة تساعد العميل على اتخاذ قرار واثق.'
      : 'We redefine subsurface stability through sharper diagnosis, structured field execution, and clear deliverables that help clients decide with confidence.';

  const pillars = [
    {
      icon: ShieldCheck,
      title: language === 'ar' ? 'السلامة أولاً' : 'Safety-first',
      desc:
        language === 'ar'
          ? 'نختار المسار الأقل مخاطرة ونوصي بالكشف/الدراسة عند عدم وضوح السبب.'
          : 'We choose the lowest-risk route and recommend detection/surveys when the cause is unclear.',
    },
    {
      icon: Sparkles,
      title: language === 'ar' ? 'دقة وابتكار' : 'Precision & innovation',
      desc:
        language === 'ar'
          ? 'أدوات ومنهجية حديثة لقراءة ما تحت السطح وتحديد نطاق المشكلة.'
          : 'Modern tools and methodology to read the subsurface and define scope.',
    },
    {
      icon: ClipboardList,
      title: language === 'ar' ? 'مخرجات واضحة' : 'Clear deliverables',
      desc:
        language === 'ar'
          ? 'تسليم ما يفهمه العميل: خطة/نتائج/توصيات للخطوة التالية.'
          : 'We deliver what clients need: plan, results, and next-step recommendations.',
    },
    {
      icon: Drill,
      title: language === 'ar' ? 'تنفيذ ميداني منظم' : 'Structured execution',
      desc:
        language === 'ar'
          ? 'تنفيذ على مراحل لتقليل التعطيل وتحسين التحكم بالجودة.'
          : 'Phased execution to reduce disruption and improve quality control.',
    },
  ];

  const equipment = [
    {
      title: language === 'ar' ? 'معدات حقن ومعالجة' : 'Grouting & remediation equipment',
      desc:
        language === 'ar'
          ? 'جاهزية ميدانية لتنفيذ حقن التربة بخيارات تناسب الحالة.'
          : 'Field-ready systems to execute fit-for-case grouting.',
    },
    {
      title: language === 'ar' ? 'معدات كشف ومسح' : 'Detection & survey tools',
      desc:
        language === 'ar'
          ? 'دعم قرار المعالجة بقراءات ومسح للموقع عند الحاجة.'
          : 'Support decisions with site readings and surveys when needed.',
    },
    {
      title: language === 'ar' ? 'معدات تشغيل مساندة' : 'Supporting machinery',
      desc:
        language === 'ar'
          ? 'تشغيل منظم بالموقع (هواء/حفر/مساندة) لرفع الكفاءة.'
          : 'On-site operations support (air/drilling/auxiliary) for efficiency.',
    },
  ];

  return (
    <>
      <SEO
        title={language === 'ar' ? 'شركة إطلاق المتميزة | حقن التربة وكشف التكهفات' : 'Etlaq | Soil Grouting & Cavity Detection'}
        description={
          language === 'ar'
            ? 'حلول حقن التربة وكشف التكهفات والدراسات الجيوفيزيائية. 15+ سنة خبرة، 200+ مشروع منجز، 100+ عميل راضٍ، و50+ معدة متخصصة. نعمل في جميع مناطق المملكة (+20 مدينة).'
            : 'Soil grouting, cavity/void detection, and geophysical surveys. 15+ years, 200+ projects, 100+ satisfied clients, 50+ specialized equipment. Serving all regions of KSA (20+ cities).'
        }
      />

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[70vh]">
        {/* Full-width animated background (gallery slideshow) */}
        <div className="absolute inset-0 z-0">
          <ImageSlideshow
            images={heroImages}
            showControls={false}
            intervalMs={5000}
            currentIndex={heroIndex}
            onIndexChange={setHeroIndex}
            className="h-full w-full"
            overlayClassName="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/45 to-black/75"
          />
        </div>

        {/* Hero slider controls (kept above content so they stay clickable on mobile) */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <Button
            variant="secondary"
            size="icon"
            className="pointer-events-auto absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-background/80 backdrop-blur"
            onClick={prevHero}
            aria-label={language === 'ar' ? 'الصورة السابقة' : 'Previous image'}
            type="button"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="pointer-events-auto absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-background/80 backdrop-blur"
            onClick={nextHero}
            aria-label={language === 'ar' ? 'الصورة التالية' : 'Next image'}
            type="button"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="pointer-events-auto absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur">
            {dotIndices.map((idx) => (
              <button
                key={idx}
                className={[
                  'h-2 w-2 rounded-full transition-all',
                  idx === heroIndex ? 'bg-white w-5' : 'bg-white/50 hover:bg-white/70',
                ].join(' ')}
                onClick={() => goToHero(idx)}
                aria-label={(language === 'ar' ? 'الانتقال للصورة ' : 'Go to image ') + (idx + 1)}
                type="button"
              />
            ))}
            <span className="ml-2 rtl:ml-0 rtl:mr-2 text-xs text-white/85 tabular-nums">
              {heroIndex + 1}/{heroImages.length}
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 md:py-16 relative z-20">
          <div className="max-w-3xl space-y-6 text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur px-3 py-1 text-sm text-white/85">
                <span className="font-semibold text-white">{language === 'ar' ? 'حلول هندسية ميدانية' : 'Field engineering solutions'}</span>
                <span>•</span>
                <span>{language === 'ar' ? 'حقن • كشف • جيوفيزياء' : 'Grouting • Detection • Geophysics'}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                {language === 'ar'
                  ? 'نثبت الأساسات ونكشف التكهفات قبل أن تتحول لمشكلة مكلفة'
                  : 'Stabilize foundations & detect voids before they become costly'}
              </h1>

              <p className="text-base md:text-lg text-white/85 leading-relaxed">
                {language === 'ar'
                  ? 'نساعد الأفراد والمطورين والمقاولين والجهات على تشخيص المشكلة بدقة، ثم تنفيذ المعالجة المناسبة (حقن/معالجة تكهفات) بخطة واضحة ومخرجات مفهومة.'
                  : 'We help individuals, developers, contractors, and authorities diagnose subsurface issues and execute fit remediation (grouting/void treatment) with clear deliverables.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <LocalizedLink href="/request-service">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => trackEvent('home_hero_request_click', { language })}
                  >
                    {language === 'ar' ? 'اطلب تقييم هندسي' : 'Request an assessment'}
                  </Button>
                </LocalizedLink>
                <a href="#services" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => trackEvent('home_hero_explore_services', { language })}
                  >
                    {language === 'ar' ? 'استعرض الخدمات' : 'Explore services'}
                    <ArrowLeft className={language === 'ar' ? 'mr-2 h-4 w-4 rotate-180' : 'ml-2 h-4 w-4'} />
                  </Button>
                </a>
                <a
                  href="https://wa.me/966534145922?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D9%85%D9%84%D9%81%20%D8%A8%D8%B1%D9%88%D9%81%D8%A7%D9%8A%D9%84%20%D8%B4%D8%B1%D9%83%D8%A9%20%D8%A5%D8%B7%D9%84%D8%A7%D9%82%20%D8%A7%D9%84%D9%85%D8%AA%D9%85%D9%8A%D8%B2%D8%A9%20%28Company%20Profile%29%20%D9%85%D9%86%20%D9%81%D8%B6%D9%84%D9%83."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                  onClick={() => trackEvent('home_hero_profile_download', { language })}
                >
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    {language === 'ar' ? 'اطلب ملف الشركة' : 'Request company profile'}
                  </Button>
                </a>
              </div>

              <div className="rounded-2xl border border-white/20 bg-black/25 backdrop-blur p-5">
                <TrustStats compact variant="inverse" />
              </div>
          </div>
        </div>
      </section>

      {/* SYMPTOMS / QUICK PATHS */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">
              {language === 'ar' ? 'اختر حالتك وسنقترح المسار' : 'Pick your case — get the right path'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'بدون تعقيد: اختر العرض الأقرب لحالتك، ثم ارسل التفاصيل لنقترح خطوة تالية واضحة.'
                : 'No friction: choose what matches your case, then share details for a clear next step.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {symptoms.map((s) => (
              <Card key={s.title} className="h-full border-border/60 bg-card/70 backdrop-blur">
                <CardHeader className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center ${s.iconBg}`}>
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{s.title}</CardTitle>
                      <div className="text-xs text-muted-foreground">{s.badge}</div>
                    </div>
                  </div>
                  <CardDescription className="leading-relaxed">{s.desc}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <LocalizedLink href={s.href}>
                    <Button
                      className="w-full rounded-full"
                      onClick={() => trackEvent('home_symptom_start', { language, symptom: s.title })}
                    >
                      {language === 'ar' ? 'ابدأ الآن' : 'Start'}
                    </Button>
                  </LocalizedLink>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">{language === 'ar' ? 'خدماتنا الأساسية' : 'Core services'}</h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'اختر الخدمة المناسبة للحالة، أو اطلب تقييمًا مبدئيًا لنقترح المسار الصحيح.'
                : 'Choose the right service for your case, or request an initial assessment and we’ll guide the best path.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {services.map((s) => (
              <Card key={s.href} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl border bg-background flex items-center justify-center">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{s.title}</CardTitle>
                      <CardDescription>{language === 'ar' ? 'تفاصيل الخدمة' : 'Service details'}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  <div className="rounded-xl border bg-card/60 backdrop-blur p-4">
                    <p className="text-sm font-medium mb-3">{language === 'ar' ? 'ماذا تستلم؟' : 'What you get'}</p>
                    <ul className="space-y-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary" />
                          <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-2">
                    <LocalizedLink href={s.href}>
                      <Button variant="outline" className="w-full">
                        {language === 'ar' ? 'استعرض التفاصيل' : 'View details'}
                      </Button>
                    </LocalizedLink>
                    <LocalizedLink href={`/request-service?service=${s.key}`}>
                      <Button
                        className="w-full"
                        onClick={() => trackEvent('home_service_request', { language, service: s.key })}
                      >
                        {language === 'ar' ? 'اطلب الخدمة' : 'Request service'}
                      </Button>
                    </LocalizedLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">{language === 'ar' ? 'كيف نعمل' : 'How we work'}</h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'منهجية واضحة تقلل المخاطر وتساعدك على اتخاذ قرار سريع وواثق.'
                : 'A clear method that reduces risk and helps you decide quickly and confidently.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {steps.map((st) => (
              <Card key={st.title} className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-2xl border bg-background flex items-center justify-center">
                    <st.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg mt-3">{st.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{st.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VISION / MISSION + PILLARS */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">{language === 'ar' ? 'نبني الثقة قبل التنفيذ' : 'Trust before execution'}</h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'مهمتنا ورؤيتنا تدعمها منهجية واضحة ومخرجات تساعد على اتخاذ القرار—وليس مجرد وعود.'
                : 'Our mission and vision are backed by a clear method and practical deliverables—not just promises.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-10">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'رؤيتنا' : 'Our vision'}</CardTitle>
                <CardDescription className="leading-relaxed">{vision}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'رسالتنا' : 'Our mission'}</CardTitle>
                <CardDescription className="leading-relaxed">{mission}</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {pillars.map((p) => (
              <Card key={p.title} className="h-full border-border/60 bg-card/70 backdrop-blur">
                <CardHeader className="space-y-3">
                  <div className="h-12 w-12 rounded-2xl border bg-background/70 backdrop-blur flex items-center justify-center">
                    <p.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{p.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border bg-card/70 backdrop-blur p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">
                  {language === 'ar' ? 'جاهزية ميدانية (50+ معدة متخصصة)' : 'Field readiness (50+ specialized equipment)'}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {language === 'ar'
                    ? 'نستخدم معدات متنوعة حسب طبيعة الموقع لتحقيق نتائج أدق وتنفيذ أسرع.'
                    : 'We use fit equipment per site conditions for higher accuracy and faster execution.'}
                </p>
              </div>
              <LocalizedLink href="/request-service">
                <Button
                  variant="outline"
                  onClick={() => trackEvent('home_equipment_section_cta', { language })}
                >
                  {language === 'ar' ? 'اطلب تقييم سريع' : 'Request a quick assessment'}
                </Button>
              </LocalizedLink>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {equipment.map((e) => (
                <Card key={e.title} className="bg-background/50">
                  <CardHeader>
                    <CardTitle className="text-base">{e.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{e.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY ETLAQ (vision/mission + trust pillars + equipment) */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">{language === 'ar' ? 'لماذا إطلاق؟' : 'Why Etlaq?'}</h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'منهجية واضحة + تنفيذ منظم + مخرجات مفهومة — لتحقيق قرار أسرع وثقة أعلى.'
                : 'Clear method + structured execution + understandable deliverables — for faster decisions and stronger trust.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-10">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'رؤيتنا' : 'Our vision'}</CardTitle>
                <CardDescription className="leading-relaxed">{vision}</CardDescription>
              </CardHeader>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'رسالتنا' : 'Our mission'}</CardTitle>
                <CardDescription className="leading-relaxed">{mission}</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {pillars.map((p) => (
              <Card key={p.title} className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-2xl border bg-background flex items-center justify-center">
                    <p.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg mt-3">{p.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{p.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border bg-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-bold">{language === 'ar' ? 'جاهزية ميدانية بمعدات متخصصة' : 'Field-ready with specialized equipment'}</h3>
                <p className="text-muted-foreground">
                  {language === 'ar'
                    ? '50+ معدة متخصصة لدعم التنفيذ والكشف—حسب احتياج الحالة.'
                    : '50+ specialized equipment to support execution and detection—fit for the case.'}
                </p>
              </div>
              <LocalizedLink href="/request-service">
                <Button onClick={() => trackEvent('home_equipment_cta', { language })}>
                  {language === 'ar' ? 'اطلب تقييمًا' : 'Request assessment'}
                </Button>
              </LocalizedLink>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {equipment.map((e) => (
                <Card key={e.title} className="bg-muted/20">
                  <CardHeader>
                    <CardTitle className="text-base">{e.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{e.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      
      {/* Audience paths */}
      <section className="py-12 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">
              {language === 'ar' ? 'حلول تناسب احتياجك' : 'Paths that fit your needs'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'اختر المسار الأقرب لطبيعة مشروعك—ثم انتقل مباشرة لطلب الخدمة المناسبة.'
                : 'Choose the path closest to your project type—then request the right service in one step.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {audiences.map((a) => (
              <Card key={a.key} className="h-full border-border/60 bg-card/70 backdrop-blur">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl">{a.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{a.desc}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <LocalizedLink href={a.href}>
                    <Button variant="outline" className="w-full rounded-full">
                      {language === 'ar' ? 'عرض المسار' : 'View path'}
                    </Button>
                  </LocalizedLink>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

<section className="py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-bold">{language === 'ar' ? 'مشاريع وأعمال' : 'Projects'}</h2>
              <p className="text-muted-foreground">
                {language === 'ar'
                  ? 'استعرض المشاريع الحالية كما هي بالموقع، وسنحوّلها لاحقًا إلى دراسات حالة (Case Studies) لتعزيز الثقة والتحويل.'
                  : 'Browse current projects (as listed). Next phase: convert them into case studies to boost trust and conversion.'}
              </p>
            </div>
            <LocalizedLink href="/projects">
              <Button variant="outline">{language === 'ar' ? 'عرض كل المشاريع' : 'View all projects'}</Button>
            </LocalizedLink>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'حقن التربة' : 'Soil grouting'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'تقوية ومعالجة تحت الأساسات' : 'Stabilization and foundation remediation'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LocalizedLink href="/services/grouting">
                  <Button className="w-full">{language === 'ar' ? 'تفاصيل الخدمة' : 'Service details'}</Button>
                </LocalizedLink>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'كشف التكهفات' : 'Cavity detection'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'تشخيص مبكر لتقليل المخاطر' : 'Early diagnosis to reduce risk'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LocalizedLink href="/services/cavity">
                  <Button className="w-full">{language === 'ar' ? 'تفاصيل الخدمة' : 'Service details'}</Button>
                </LocalizedLink>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'جيوفيزياء' : 'Geophysics'}</CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'قرارات أدق قبل المعالجة' : 'Sharper decisions before remediation'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LocalizedLink href="/services/geophysical">
                  <Button className="w-full">{language === 'ar' ? 'تفاصيل الخدمة' : 'Service details'}</Button>
                </LocalizedLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border bg-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-4xl font-bold">
                  {language === 'ar' ? 'ابدأ بخطوة واضحة' : 'Start with a clear next step'}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'ar'
                    ? 'أرسل لنا تفاصيل الحالة وسنقترح عليك المسار الأنسب: كشف/دراسة/حقن — مع خطة أولية ومخرجات واضحة.'
                    : 'Share your case details and we’ll suggest the best route: detection/survey/grouting — with a clear initial plan.'}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <LocalizedLink href="/request-service">
                  <Button size="lg" className="w-full">
                    {language === 'ar' ? 'اطلب خدمة الآن' : 'Request service now'}
                  </Button>
                </LocalizedLink>
                <LocalizedLink href="/contact">
                  <Button size="lg" variant="outline" className="w-full">
                    {language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a message'}
                  </Button>
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
