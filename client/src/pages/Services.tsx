import Breadcrumbs from '@/components/Breadcrumbs';
import LocalizedLink from '@/components/LocalizedLink';
import QuickRequestCard from '@/components/QuickRequestCard';
import { SEO } from '@/components/SEO';
import TrustStats from '@/components/TrustStats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { buildBreadcrumbList } from '@/lib/schemaHelpers';
import { trackEvent } from '@/lib/analytics';
import { absUrl } from '@/lib/siteUrl';
import { cities } from '@/data/seoLocations';
import { ArrowRight, CheckCircle2, ClipboardList, Drill, MapPin, MessageCircle, PhoneCall, Radar, ShieldCheck, Timer } from 'lucide-react';
import { useState } from 'react';

export default function Services() {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'ar';

  const canonical = absUrl(`/${lang}/services`);

  const [activeService, setActiveService] = useState<'grouting' | 'cavity' | 'geophysical'>('grouting');

  const hero = {
    title: lang === 'ar' ? 'خدماتنا الهندسية' : 'Our engineering services',
    subtitle:
      lang === 'ar'
        ? 'حقن التربة • كشف التكهفات • الدراسات الجيوفيزيائية — حلول ميدانية ترفع الاستقرار وتقلل المخاطر. نبدأ بتشخيص واضح ثم تنفيذ على مراحل ومخرجات مفهومة.'
        : 'Soil grouting • Cavity detection • Geophysical surveys — field solutions that improve stability and reduce risk. We start with clear diagnosis, then phased execution and practical deliverables.',
  };

  const services = [
    {
      key: 'grouting',
      icon: Drill,
      title: lang === 'ar' ? 'حقن التربة (Cement Grouting)' : 'Soil grouting (cement grouting)',
      href: '/services/grouting',
      short:
        lang === 'ar'
          ? 'تقوية التربة أسفل الأساسات، معالجة مناطق الضعف/الفراغات، وتقليل الهبوط والتشققات. نطبق حقنًا مناسبًا للحالة وبمراحل لضبط الجودة.'
          : 'Strengthen soil under foundations, treat weak zones/voids, and reduce settlement/crack risks. We use fit-for-case grouting and staged execution for control.',
      bestFor:
        lang === 'ar'
          ? ['هبوط أو تشققات ناتجة عن ضعف تحت السطح', 'تجهيز الموقع قبل مراحل تنفيذ حساسة', 'معالجة بعد تسربات مياه أو تغيّر حالة التربة']
          : ['Settlement/cracks driven by subsurface weakness', 'Preparing a site before critical construction stages', 'Remediation after water leakage or soil condition changes'],
      deliverables:
        lang === 'ar'
          ? ['خطة تنفيذ واضحة (Method) حسب الحالة', 'تنفيذ مرحلي وتوثيق ميداني', 'تقرير يلخص ما تم وتوصيات الخطوة التالية']
          : ['Clear execution method tailored to the case', 'Phased execution with field documentation', 'Report summarizing works and next-step recommendations'],
      startHint:
        lang === 'ar'
          ? 'إذا كان سبب المشكلة غير واضح: نوصي عادةً ببدء كشف/جيوفيزياء ثم حقن موجّه.'
          : 'If the cause is unclear: we often recommend detection/surveys first, then targeted grouting.',
    },
    {
      key: 'cavity',
      icon: Radar,
      title: lang === 'ar' ? 'كشف التكهفات والفراغات' : 'Cavity / void detection',
      href: '/services/cavity',
      short:
        lang === 'ar'
          ? 'كشف مبكر لمؤشرات التكهفات قبل أن تتحول لهبوط مفاجئ. نخرج بنتائج تساعدك تختار المعالجة الصحيحة وتحدد نطاقها.'
          : 'Early detection of potential cavities before they turn into sudden settlement. Results help you choose the right remediation route and define scope.',
      bestFor:
        lang === 'ar'
          ? ['اشتباه تكهف/فراغات بالموقع', 'هبوط موضعي أو تكرار شروخ في نفس المنطقة', 'قبل أعمال الحفر أو تمديدات حساسة']
          : ['Suspected cavities/voids', 'Localized settlement or recurring cracks in the same zone', 'Before excavation or sensitive utility works'],
      deliverables:
        lang === 'ar'
          ? ['تحديد مناطق الاشتباه ومؤشرات الخطر', 'تقرير مختصر يدعم القرار', 'توصية بمسار المعالجة (حقن/متابعة/اختبار إضافي)']
          : ['Suspected zones and risk indicators', 'Concise decision-support report', 'Recommended route (grouting / monitoring / additional testing)'],
      startHint:
        lang === 'ar'
          ? 'الكشف قبل الحقن يقلل المخاطر ويمنع “الحقن العشوائي”.'
          : 'Detection before grouting reduces risk and prevents “blind grouting”.',
    },
    {
      key: 'geophysical',
      icon: ShieldCheck,
      title: lang === 'ar' ? 'الدراسات والاختبارات الجيوفيزيائية' : 'Geophysical surveys',
      href: '/services/geophysical',
      short:
        lang === 'ar'
          ? 'عندما تحتاج صورة أوضح لما تحت السطح قبل قرار مكلف. نستخدم أدوات مناسبة للحالة (مثل GPR/ERT/MASW) لتحديد مناطق الأولوية.'
          : 'When you need a clearer subsurface picture before costly decisions. We use fit tools (e.g., GPR/ERT/MASW) to identify priority zones.',
      bestFor:
        lang === 'ar'
          ? ['تحديد نطاق المشكلة قبل المعالجة', 'تقييم مخاطر موقع كبير أو حساس', 'تقليل عدم اليقين قبل تنفيذ مكلف']
          : ['Defining scope before remediation', 'Assessing a large or sensitive site', 'Reducing uncertainty ahead of costly execution'],
      deliverables:
        lang === 'ar'
          ? ['مسح/قراءات حسب الحالة', 'مؤشرات للمناطق ذات الخطورة الأعلى', 'نتائج وتوصيات عملية لتحديد نطاق العمل']
          : ['Survey readings tailored to the case', 'Indications of higher-risk zones', 'Practical results and recommendations to define scope'],
      startHint:
        lang === 'ar'
          ? 'الجيوفيزياء ليست هدفًا بذاتها—هي أداة لتقليل المخاطر وتوجيه القرار.'
          : 'Geophysics isn’t the goal—it’s a tool to reduce risk and guide decisions.',
    },
  ] as const;

  const chooser = [
    {
      icon: AlertIcon,
      title: lang === 'ar' ? 'تشققات أو هبوط ملحوظ' : 'Cracks or noticeable settlement',
      desc:
        lang === 'ar'
          ? 'ابدأ بتقييم سريع. قد نوصي بالكشف/الجيوفيزياء أولاً ثم حقن موجّه حسب السبب.'
          : 'Start with a quick assessment. We may recommend detection/surveys first, then targeted grouting.',
      href: '/request-service?service=grouting',
    },
    {
      icon: Radar,
      title: lang === 'ar' ? 'اشتباه تكهفات بالموقع' : 'Suspected cavities on site',
      desc:
        lang === 'ar'
          ? 'الكشف المبكر يقلل المخاطر ويحدد نطاق المعالجة بدل التخمين.'
          : 'Early detection reduces risk and defines scope instead of guessing.',
      href: '/request-service?service=cavity',
    },
    {
      icon: ClipboardList,
      title: lang === 'ar' ? 'قبل تنفيذ/للحسم' : 'Before execution / for certainty',
      desc:
        lang === 'ar'
          ? 'إذا لديك موقع كبير أو قرار مكلف: الدراسة الجيوفيزيائية توضح الصورة وتوجه المعالجة.'
          : 'For a large site or costly decision: geophysical surveys clarify and guide remediation.',
      href: '/request-service?service=geophysical',
    },
  ];

  const workflow = [
    {
      icon: ClipboardList,
      title: lang === 'ar' ? 'مراجعة سريعة للمعلومات' : 'Quick information review',
      desc:
        lang === 'ar'
          ? 'نجمع تفاصيل الحالة (الموقع، أعراض المشكلة، المخططات/التقارير إن وجدت) لتحديد المسار.'
          : 'We collect case details (location, symptoms, drawings/reports if available) to pick the right route.',
    },
    {
      icon: Radar,
      title: lang === 'ar' ? 'تشخيص مناسب للحالة' : 'Fit-for-case diagnosis',
      desc:
        lang === 'ar'
          ? 'قد يبدأ العمل بكشف/جيوفيزياء لتحديد نطاق المشكلة قبل أي معالجة.'
          : 'Work may start with detection/surveys to define scope before remediation.',
    },
    {
      icon: Drill,
      title: lang === 'ar' ? 'تنفيذ مرحلي وتحكم بالجودة' : 'Phased execution & QC',
      desc:
        lang === 'ar'
          ? 'تنفيذ الحقن/المعالجة بخطة مراحل للسيطرة على النتائج وتقليل التعطيل.'
          : 'Execute remediation in stages for better control and lower disruption.',
    },
    {
      icon: Timer,
      title: lang === 'ar' ? 'تقرير مخرجات وخطوة تالية' : 'Deliverables & next step',
      desc:
        lang === 'ar'
          ? 'تسليم مخرجات مفهومة تساعدك على قرار واضح (إكمال/متابعة/اختبارات إضافية).' 
          : 'Deliverables that support a clear decision (proceed / monitor / additional tests).',
    },
  ];

  const faq = [
    {
      id: 'faq-1',
      q: lang === 'ar' ? 'هل أبدأ بحقن التربة مباشرة؟' : 'Should I start with grouting right away?',
      a:
        lang === 'ar'
          ? 'إذا كان سبب المشكلة غير واضح، الأفضل عادةً بدء كشف/جيوفيزياء لتحديد نطاق المشكلة ثم حقن موجّه. هذا يقلل المخاطر ويمنع تنفيذ غير ضروري.'
          : 'If the cause is unclear, it’s often better to start with detection/surveys, then targeted grouting. This reduces risk and avoids unnecessary work.',
    },
    {
      id: 'faq-2',
      q: lang === 'ar' ? 'هل الحقن يوقف التشققات دائمًا؟' : 'Will grouting permanently stop cracks?',
      a:
        lang === 'ar'
          ? 'الحقن يعالج السبب المرتبط بالتربة/الفراغات في كثير من الحالات، لكن النتيجة تعتمد على السبب الحقيقي، نطاق المشكلة، وحالة المبنى. لذلك نركز على التشخيص أولاً.'
          : 'Grouting can address soil/void-driven causes in many cases, but outcomes depend on root cause, scope, and building condition. That’s why diagnosis comes first.',
    },
    {
      id: 'faq-3',
      q: lang === 'ar' ? 'كم يستغرق تنفيذ العمل؟' : 'How long does it take?',
      a:
        lang === 'ar'
          ? 'المدة تتغير حسب المساحة، عدد النقاط، عمق المعالجة، وقيود الموقع. بعد مراجعة المعلومات نعطيك خطة زمنية واقعية.'
          : 'Duration depends on area, number of points, treatment depth, and site constraints. After reviewing details, we provide a realistic schedule.',
    },
    {
      id: 'faq-4',
      q: lang === 'ar' ? 'ما المعلومات التي تحتاجونها قبل البدء؟' : 'What information do you need to start?',
      a:
        lang === 'ar'
          ? 'موقع المشروع، وصف المشكلة (تشققات/هبوط/تسرب)، صور إن أمكن، وأي مخططات أو تقارير سابقة إن وجدت. هذا يساعدنا نحدد المسار الأسرع والأقل مخاطرة.'
          : 'Project location, symptom description (cracks/settlement/leakage), photos if possible, and any drawings or prior reports. This helps pick the fastest, lowest-risk route.',
    },
    {
      id: 'faq-5',
      q: lang === 'ar' ? 'هل تعملون داخل المباني؟' : 'Do you work inside buildings?',
      a:
        lang === 'ar'
          ? 'نعم حسب الحالة واشتراطات السلامة وإمكانية الوصول. نُفضل دائمًا الحل الأقل تعطيلًا للمستخدمين مع الالتزام بإجراءات السلامة.'
          : 'Yes, depending on case, safety requirements, and access. We always aim for the lowest-disruption approach while complying with safety procedures.',
    },
  ];

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: lang === 'ar' ? 'خدمات شركة إطلاق المتميزة' : 'Etlaq Services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.short,
        url: absUrl(`${lang === 'ar' ? '/ar' : '/en'}${s.href}`),
      },
    })),
  };

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: lang === 'ar' ? 'الخدمات' : 'Services', url: canonical },
      buildBreadcrumbList([
        { name: lang === 'ar' ? 'الرئيسية' : 'Home', url: absUrl(`/${lang}/`) },
        { name: lang === 'ar' ? 'الخدمات' : 'Services', url: canonical },
      ]),
      servicesSchema,
    ],
  };

  const topCities = (() => {
    const priority = ['riyadh', 'jeddah', 'dammam', 'khobar', 'makkah', 'madinah', 'taif', 'jubail'];
    const picked = priority
      .map((s) => cities.find((c) => c.slug === s))
      .filter(Boolean) as typeof cities;
    return picked.length ? picked : cities.slice(0, 8);
  })();

  return (
    <>
      <SEO
        title={lang === 'ar' ? 'الخدمات | شركة إطلاق المتميزة' : 'Services | Etlaq'}
        description={
          lang === 'ar'
            ? 'خدمات حقن التربة، كشف التكهفات، والدراسات الجيوفيزيائية في المملكة. منهجية واضحة، تنفيذ مرحلي، ومخرجات تساعد على اتخاذ القرار بثقة.'
            : 'Soil grouting, cavity detection, and geophysical surveys across KSA. Clear methodology, phased execution, and deliverables that support confident decisions.'
        }
        image={absUrl('/favicon.png')}
        url={canonical}
        schema={schema}
      />

      {/* HERO */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <Breadcrumbs items={[{ name: lang === 'ar' ? 'الخدمات' : 'Services', href: '/services', isCurrent: true }]} />

            <h1 className="text-3xl md:text-5xl font-bold">{hero.title}</h1>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{hero.subtitle}</p>

            <div className="etlaq-card mt-6 rounded-2xl border bg-card/70 backdrop-blur p-6">
              <TrustStats />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <LocalizedLink href="/request-service" className="inline-flex">
                <Button className="w-full sm:w-auto" onClick={() => trackEvent('services_hero_request', { language: lang })}>
                  {lang === 'ar' ? 'اطلب تقييم' : 'Request an assessment'}
                </Button>
              </LocalizedLink>
              <a
                href="https://wa.me/966534145922?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D9%85%D9%84%D9%81%20%D8%A8%D8%B1%D9%88%D9%81%D8%A7%D9%8A%D9%84%20%D8%B4%D8%B1%D9%83%D8%A9%20%D8%A5%D8%B7%D9%84%D8%A7%D9%82%20%D8%A7%D9%84%D9%85%D8%AA%D9%85%D9%8A%D8%B2%D8%A9%20%28Company%20Profile%29%20%D9%85%D9%86%20%D9%81%D8%B6%D9%84%D9%83."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
                onClick={() => trackEvent('services_hero_whatsapp_profile', { language: lang })}
              >
                <Button variant="secondary" className="w-full sm:w-auto">
                  {lang === 'ar' ? 'اطلب ملف الشركة' : 'Request company profile'}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CHOOSER + QUICK REQUEST */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-6 items-start">
            <div>
              <div className="max-w-3xl space-y-2">
                <h2 className="text-2xl md:text-4xl font-bold">{lang === 'ar' ? 'اختر نقطة البداية' : 'Choose your starting point'}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {lang === 'ar'
                    ? 'إذا كنت غير متأكد من المسار، ابدأ بتقييم مختصر وسنوجهك للخطوة الأقل مخاطرة.'
                    : 'If you’re unsure, start with a short assessment and we’ll guide you to the lowest-risk next step.'}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {chooser.map((c) => (
                  <Card key={c.title} className="h-full border-border/60 bg-card/70 backdrop-blur">
                    <CardHeader className="space-y-3">
                      <div className="h-12 w-12 rounded-2xl border bg-background flex items-center justify-center">
                        <c.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{c.title}</CardTitle>
                      <CardDescription className="leading-relaxed">{c.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <LocalizedLink href={c.href}>
                        <Button variant="outline" className="w-full" onClick={() => trackEvent('services_start_point', { language: lang, choice: c.title })}>
                          {lang === 'ar' ? 'ابدأ' : 'Start'}
                        </Button>
                      </LocalizedLink>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <QuickRequestCard formName="services_quick_assessment" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES TABS */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold">{lang === 'ar' ? 'خدماتنا الأساسية' : 'Core services'}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === 'ar'
                ? 'كل خدمة مصممة لتقليل المخاطر وتحسين الاستقرار—مع مخرجات تساعدك على قرار واضح.'
                : 'Each service is designed to reduce risk and improve stability—with deliverables that support clear decisions.'}
            </p>
          </div>

          <div className="mt-8">
            <Tabs value={activeService} onValueChange={(v) => setActiveService(v as any)} className="w-full">
              <div className="flex justify-center">
                <TabsList
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  className="w-full max-w-4xl p-2 rounded-3xl bg-muted/25 backdrop-blur-sm border border-primary/15 shadow-sm flex items-stretch gap-3"
                >
                  {/* Each trigger is wrapped in a larger rectangle card (hover switches tab content automatically). */}
                  <div
                    className="etlaq-tab-shell flex-1 rounded-2xl p-1.5"
                    style={{ ['--accent-rgb' as any]: '34 197 94', ['--accent2-rgb' as any]: '16 185 129' }}
                    onMouseEnter={() => setActiveService('grouting')}
                    onFocus={() => setActiveService('grouting')}
                  >
                    <TabsTrigger
                      value="grouting"
                      className="etlaq-tab w-full h-full text-base sm:text-lg md:text-xl font-extrabold tracking-tight"
                      style={{ ['--accent-rgb' as any]: '34 197 94', ['--accent2-rgb' as any]: '16 185 129' }}
                    >
                      {lang === 'ar' ? 'حقن التربة' : 'Soil Grouting'}
                    </TabsTrigger>
                  </div>

                  <div
                    className="etlaq-tab-shell flex-1 rounded-2xl p-1.5"
                    style={{ ['--accent-rgb' as any]: '249 115 22', ['--accent2-rgb' as any]: '245 158 11' }}
                    onMouseEnter={() => setActiveService('cavity')}
                    onFocus={() => setActiveService('cavity')}
                  >
                    <TabsTrigger
                      value="cavity"
                      className="etlaq-tab w-full h-full text-base sm:text-lg md:text-xl font-extrabold tracking-tight"
                      style={{ ['--accent-rgb' as any]: '249 115 22', ['--accent2-rgb' as any]: '245 158 11' }}
                    >
                      {lang === 'ar' ? 'كشف التكهفات' : 'Cavity Probing'}
                    </TabsTrigger>
                  </div>

                  <div
                    className="etlaq-tab-shell flex-1 rounded-2xl p-1.5"
                    style={{ ['--accent-rgb' as any]: '99 102 241', ['--accent2-rgb' as any]: '168 85 247' }}
                    onMouseEnter={() => setActiveService('geophysical')}
                    onFocus={() => setActiveService('geophysical')}
                  >
                    <TabsTrigger
                      value="geophysical"
                      className="etlaq-tab w-full h-full text-base sm:text-lg md:text-xl font-extrabold tracking-tight"
                      style={{ ['--accent-rgb' as any]: '99 102 241', ['--accent2-rgb' as any]: '168 85 247' }}
                    >
                      {lang === 'ar' ? 'جيوفيزياء' : 'Geophysics'}
                    </TabsTrigger>
                  </div>
                </TabsList>
              </div>

              {services.map((s) => (
                <TabsContent key={s.key} value={s.key} className="mt-6">
                  <Card className="rounded-3xl border bg-card/70 backdrop-blur">
                    <CardContent dir={lang === 'ar' ? 'rtl' : 'ltr'} className="p-6 md:p-8">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 rtl:flex-row-reverse rtl:text-right">
                            <div className="h-12 w-12 rounded-2xl border bg-background flex items-center justify-center">
                              <s.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold">{s.title}</h3>
                              <p className="text-muted-foreground mt-1 leading-relaxed whitespace-pre-line">{s.short}</p>
                              <p className="text-sm text-muted-foreground mt-3">{s.startHint}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="rounded-2xl border bg-background/50 p-4">
                              <p className="font-semibold mb-3">{lang === 'ar' ? 'مناسب لـ' : 'Best for'}</p>
                              <ul className="space-y-2">
                                {s.bestFor.map((b) => (
                                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground rtl:flex-row-reverse rtl:text-right">
                                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary" />
                                    <span className="leading-relaxed">{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="rounded-2xl border bg-background/50 p-4">
                              <p className="font-semibold mb-3">{lang === 'ar' ? 'ماذا تستلم؟' : 'What you get'}</p>
                              <ul className="space-y-2">
                                {s.deliverables.map((d) => (
                                  <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground rtl:flex-row-reverse rtl:text-right">
                                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary" />
                                    <span className="leading-relaxed">{d}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* CTAs (horizontal) */}
                        <div
                          dir={lang === 'ar' ? 'rtl' : 'ltr'}
                          className="flex flex-wrap items-center gap-3 justify-center md:justify-start rtl:md:justify-end"
                        >
                          <LocalizedLink href={s.href}>
                            <Button
                              size="lg"
                              variant="outline"
                              className="gap-2 font-extrabold border-2 border-primary/35 bg-primary/10 hover:bg-primary/15 hover:border-primary shadow-hover-soft rounded-xl"
                              onClick={() => trackEvent('services_tab_details', { language: lang, service: s.key })}
                            >
                              {lang === 'ar' ? 'تفاصيل الخدمة' : 'Service details'}
                              <ArrowRight className={`h-4 w-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                            </Button>
                          </LocalizedLink>
                          <LocalizedLink href={`/request-service?service=${s.key}`}>
                            <Button
                              size="lg"
                              className="gap-2 font-extrabold shadow-hover-glow rounded-xl"
                              onClick={() => trackEvent('services_tab_request', { language: lang, service: s.key })}
                            >
                              {lang === 'ar' ? 'اطلب الخدمة' : 'Request this service'}
                              <PhoneCall className="h-4 w-4" />
                            </Button>
                          </LocalizedLink>
                          <LocalizedLink href="/contact">
                            <Button
                              size="lg"
                              variant="secondary"
                              className="gap-2 font-extrabold shadow-hover-soft rounded-xl"
                              onClick={() => trackEvent('services_tab_contact', { language: lang, service: s.key })}
                            >
                              {lang === 'ar' ? 'استشارة سريعة' : 'Quick consult'}
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </LocalizedLink>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold">{lang === 'ar' ? 'كيف ننفّذ' : 'How we execute'}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === 'ar'
                ? 'منهجية واضحة تقلل المخاطر: تشخيص مناسب للحالة، تنفيذ مرحلي، وتوثيق مخرجات.'
                : 'A clear method that reduces risk: fit diagnosis, phased execution, and documented deliverables.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {workflow.map((w) => (
              <Card key={w.title} className="h-full border-border/60 bg-card/70 backdrop-blur">
                <CardHeader>
                  <div className="h-12 w-12 rounded-2xl border bg-background flex items-center justify-center">
                    <w.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg mt-3">{w.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{w.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-4xl font-bold">{lang === 'ar' ? 'نخدم مدن المملكة' : 'Serving cities across KSA'}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {lang === 'ar'
                  ? 'نغطي معظم مناطق المملكة حسب احتياج المشروع. اختر مدينة لفتح خدماتها.'
                  : 'We cover most regions across KSA depending on project needs. Pick a city to view its service pages.'}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {topCities.map((c) => (
                  <LocalizedLink
                    key={c.slug}
                    href={`/locations/${c.slug}`}
                    className="text-sm rounded-full border px-3 py-1 bg-background hover:bg-accent"
                    onClick={() => trackEvent('services_city_click', { language: lang, city: c.slug })}
                  >
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{lang === 'ar' ? c.ar : c.en}</span>
                    </span>
                  </LocalizedLink>
                ))}
              </div>
            </div>

            <Card className="rounded-3xl border bg-card/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">{lang === 'ar' ? 'مسار سريع' : 'Quick path'}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {lang === 'ar'
                    ? 'إذا لديك تشققات/هبوط أو اشتباه تكهفات—أرسل التفاصيل وسنقترح الخطوة التالية.'
                    : 'If you have cracks/settlement or suspected cavities—share details and we’ll suggest the next step.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <LocalizedLink href="/request-service">
                  <Button className="w-full" onClick={() => trackEvent('services_quickpath_request', { language: lang })}>
                    {lang === 'ar' ? 'اطلب تقييم' : 'Request assessment'}
                  </Button>
                </LocalizedLink>
                <LocalizedLink href="/contact">
                  <Button variant="outline" className="w-full" onClick={() => trackEvent('services_quickpath_contact', { language: lang })}>
                    {lang === 'ar' ? 'تواصل معنا' : 'Contact'}
                  </Button>
                </LocalizedLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold">{lang === 'ar' ? 'أسئلة شائعة' : 'FAQ'}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === 'ar'
                ? 'إجابات مختصرة لأكثر الأسئلة تكرارًا قبل بدء أي عمل ميداني.'
                : 'Quick answers to common questions before any field work starts.'}
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-8">
            <Card className="rounded-3xl border bg-card/70 backdrop-blur">
              <CardContent className="p-6 md:p-8">
                <Accordion type="single" collapsible className="w-full">
                  {faq.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  // A lightweight alert icon built from lucide primitives would require importing another icon.
  // We use the existing ShieldCheck/ClipboardList/Radar elsewhere; this avoids adding a new import here.
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}