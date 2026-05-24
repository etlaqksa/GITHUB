import { Suspense, lazy, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';

import LocalizedLink from '@/components/LocalizedLink';
import ClientLogosWall from '@/components/ClientLogosWall';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
import { cities } from '@/data/seoLocations';
import { AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import {
  IconBuilding,
  IconChecklist,
  IconClock,
  IconGprRadar,
  IconHardHat,
  IconLocation,
  IconPump,
  IconShieldCheck,
  IconSoilGrouting,
} from '@/components/icons/etlaq';

// Lazy loaded below-the-fold sections
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const ServiceDecisionHelper = lazy(() => import('@/components/ServiceDecisionHelper'));
const WhyChooseUs = lazy(() => import('@/components/WhyChooseUs'));
const EmergencyCTA = lazy(() => import('@/components/EmergencyCTA'));
const ProcessTimeline = lazy(() => import('@/components/ProcessTimeline'));
const FeaturedProjects = lazy(() => import('@/components/FeaturedProjects'));
const CertificationsBar = lazy(() => import('@/components/CertificationsBar'));
const VideoGallery = lazy(() => import('@/components/VideoGallery'));
import { groutingVideos } from '@/data/videos';

// Load FAQ accordion only when it is near the viewport.
// This removes Radix accordion logic from the initial render, which PSI often flags as forced reflow.
const LazyHomeFaqSection = lazy(() => import('./HomeFaqSection'));

function InViewMount({
  children,
  fallback,
  rootMargin = '700px',
}: {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [show, rootMargin]);

  return <div ref={ref}>{show ? children : fallback}</div>;
}

const accentStyle = (rgb: string): CSSProperties => ({ ['--accent-rgb' as any]: rgb });

const QUICK_PATH_ACCENTS = ['37 99 235', '245 158 11', '16 185 129', '168 85 247'];
const SERVICE_ACCENTS: Record<'grouting' | 'cavity' | 'geophysical', string> = {
  grouting: '37 99 235',
  cavity: '245 158 11',
  geophysical: '16 185 129',
};
const PILLAR_ACCENTS = ['16 185 129', '37 99 235', '245 158 11', '168 85 247'];

export default function HomeBelowFold() {
  const { language } = useLanguage();

  const requestLabel = (serviceKey: string) => {
    if (language === 'ar') {
      const map: Record<string, string> = {
        grouting: 'اطلب حقن تربة',
        cavity: 'اطلب كشف تكهفات',
        geophysical: 'اطلب اختبار جيوفيزيائي',
      };
      return map[serviceKey] ?? 'اطلب خدمة';
    }

    const mapEn: Record<string, string> = {
      grouting: 'Request soil injection',
      cavity: 'Request cavity detection',
      geophysical: 'Request geophysical test',
    };
    return mapEn[serviceKey] ?? 'Request service';
  };

  const services = [
    {
      icon: IconSoilGrouting,
      key: 'grouting' as const,
      title: language === 'ar' ? 'حقن التربة' : 'Soil Grouting',
      desc:
        language === 'ar'
          ? 'تقوية التربة تحت الأساسات، معالجة التكهفات، وتقليل مخاطر الهبوط والتشققات عبر حقن مناسب للحالة.'
          : 'Strengthen soil under foundations, treat cavities, and reduce settlement/crack risks with fit-for-case grouting.',
      bullets:
        language === 'ar'
          ? ['حلول مرحلية حسب الحالة', 'مراقبة ميدانية أثناء التنفيذ', 'مخرجات واضحة للخطوة التالية']
          : ['Staged plan per case', 'On-site monitoring during execution', 'Clear deliverables for next steps'],
      href: '/services/grouting',
    },
    {
      icon: IconGprRadar,
      key: 'cavity' as const,
      title: language === 'ar' ? 'كشف التكهفات' : 'Cavity Detection',
      desc:
        language === 'ar'
          ? 'تحديد مناطق الاشتباه قبل تفاقم المشكلة، ونتائج تساعد على اختيار المعالجة الصحيحة.'
          : 'Identify suspected zones early, with results that guide the right remediation decision.',
      bullets:
        language === 'ar'
          ? ['تحديد مؤشرات ومناطق اشتباه', 'ملخص نتائج يدعم القرار', 'توصية بمسار المعالجة']
          : ['Suspected zones & indicators', 'Decision-friendly summary', 'Recommended remediation route'],
      href: '/services/cavity',
    },
    {
      icon: IconPump,
      key: 'geophysical' as const,
      title: language === 'ar' ? 'الدراسات الجيوفيزيائية' : 'Geophysical Surveys',
      desc:
        language === 'ar'
          ? 'تشخيص أدق لما تحت السطح لدعم قرار المعالجة وتحديد نطاق العمل قبل التنفيذ.'
          : 'Sharper subsurface diagnosis to support remediation decisions and define scope before execution.',
      bullets:
        language === 'ar'
          ? ['اختيار التقنية الأنسب (GPR/ERT/MASW)', 'قراءات وتفسير قابل للتنفيذ', 'تقليل المخاطر قبل المعالجة']
          : ['Fit technique selection (GPR/ERT/MASW)', 'Actionable interpretation', 'Lower risk before remediation'],
      href: '/services/geophysical',
    },
  ];

  const quickPaths = [
    {
      icon: AlertTriangle,
      title: language === 'ar' ? 'تشققات أو هبوط' : 'Cracks or settlement',
      desc:
        language === 'ar'
          ? 'ابدأ بتقييم مبدئي لتحديد السبب والمسار الأنسب (كشف/حقن) حسب الحالة.'
          : 'Start with an initial assessment to pick the right route (detection/grouting) for your case.',
      href: '/request-service?service=grouting',
    },
    {
      icon: IconGprRadar,
      title: language === 'ar' ? 'اشتباه تكهفات' : 'Suspected cavities',
      desc:
        language === 'ar'
          ? 'الكشف المبكر يقلل المخاطر ويعطيك قرارًا أوضح قبل أي معالجة.'
          : 'Early detection reduces risk and gives you a clearer decision before remediation.',
      href: '/request-service?service=cavity',
    },
    {
      icon: IconHardHat,
      title: language === 'ar' ? 'قبل تنفيذ أعمال حساسة' : 'Before critical works',
      desc:
        language === 'ar'
          ? 'تشخيص ما تحت السطح قبل القرارات المكلفة يساعد على تقليل المفاجآت.'
          : 'Subsurface insight before expensive decisions reduces surprises and rework.',
      href: '/request-service?service=geophysical',
    },
    {
      icon: IconLocation,
      title: language === 'ar' ? 'مشكلة داخل مبنى قائم' : 'Inside an existing building',
      desc:
        language === 'ar'
          ? 'نرتّب التنفيذ ليكون عمليًا داخل الموقع مع تقليل الإزعاج قدر الإمكان.'
          : 'We plan a practical on-site execution path with minimal disruption when possible.',
      href: '/request-service',
    },
  ];

  const quickPathCta = (href: string) => {
    const isAr = language === 'ar';
    if (href.includes('service=grouting')) return isAr ? 'اطلب الحقن' : 'Request grouting';
    if (href.includes('service=cavity')) return isAr ? 'اطلب الكشف' : 'Request detection';
    if (href.includes('service=geophysical')) return isAr ? 'اطلب اختبار' : 'Request testing';
    return isAr ? 'اطلب خدمة' : 'Request service';
  };


  const approach = [
    {
      icon: IconChecklist,
      title: language === 'ar' ? 'تقييم سريع وتحديد نطاق' : 'Fast assessment & scope',
      desc:
        language === 'ar'
          ? 'نجمع المعلومات المتاحة ونحدد مؤشرات المشكلة ونطاقها (بلا مبالغة وبلا نقص).'
          : 'We collect available inputs and define a realistic scope—no exaggeration, no underestimation.',
    },
    {
      icon: IconGprRadar,
      title: language === 'ar' ? 'تشخيص قابل للتنفيذ' : 'Actionable diagnosis',
      desc:
        language === 'ar'
          ? 'عند عدم وضوح السبب نبدأ بالكشف/الدراسة ثم نقرّر المعالجة المناسبة.'
          : 'When the cause is unclear, we start with detection/surveys then decide the remediation route.',
    },
    {
      icon: IconSoilGrouting,
      title: language === 'ar' ? 'تنفيذ مرحلي مع مراقبة' : 'Phased execution + monitoring',
      desc:
        language === 'ar'
          ? 'تنفيذ منظم على مراحل لتقليل المخاطر وتحسين التحكم بالجودة.'
          : 'Structured staged execution to reduce risk and improve quality control.',
    },
    {
      icon: IconClock,
      title: language === 'ar' ? 'مخرجات وتوصيات واضحة' : 'Clear deliverables',
      desc:
        language === 'ar'
          ? 'تسليم ما يهمك فعلاً: ماذا تم؟ ماذا يعني؟ ما الخطوة التالية؟'
          : 'You get what matters: what was done, what it means, and the next step.',
    },
  ];

  const valuePillars = [
    {
      icon: IconShieldCheck,
      title: language === 'ar' ? 'سلامة وجودة' : 'Safety & quality',
      desc:
        language === 'ar'
          ? 'منهجية محافظة عند الشك، وتوثيق واضح حسب متطلبات المشروع.'
          : 'Conservative decisions when uncertain, with clear documentation per project requirements.',
    },
    {
      icon: Sparkles,
      title: language === 'ar' ? 'دقة وتشخيص' : 'Precision & diagnosis',
      desc:
        language === 'ar'
          ? 'اختيار الأدوات المناسبة للحالة بدل اعتماد حل واحد لكل شيء.'
          : 'Fit-for-case tools instead of one-size-fits-all solutions.',
    },
    {
      icon: IconBuilding,
      title: language === 'ar' ? 'خبرة ميدانية' : 'Field experience',
      desc:
        language === 'ar'
          ? 'تخطيط وتنفيذ يتماشى مع الواقع بالموقع والجداول والمتطلبات.'
          : 'Planning and execution aligned with real site constraints, schedules, and specs.',
    },
    {
      icon: CheckCircle2,
      title: language === 'ar' ? 'قرارات أسرع' : 'Faster decisions',
      desc:
        language === 'ar'
          ? 'نختصر عليك الوقت بمخرجات مفهومة تقود مباشرة للخطوة التالية.'
          : 'Decision-ready outputs that lead directly to the next step.',
    },
  ];

  const topCities = useMemo(() => {
    const priority = ['riyadh', 'jeddah', 'dammam', 'khobar', 'makkah', 'madinah', 'taif', 'jubail', 'yanbu', 'qassim'];
    const picked = priority
      .map((s) => cities.find((c) => c.slug === s))
      .filter(Boolean)
      .slice(0, 8) as typeof cities;
    return picked.length ? picked : cities.slice(0, 8);
  }, []);

  // FAQ moved to a lazy + in-view section to keep the initial render lighter and avoid forced reflow flags.

  return (
    <>
      {/* QUICK PATHS */}
      <section className="py-8 md:py-12">
        <div className="w-full px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">
              {language === 'ar' ? 'اختر حالتك — وخذ خطوة واضحة' : 'Pick your case — get a clear next step'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'بدون تعقيد: اختر ما يطابق حالتك، ثم أرسل التفاصيل لنقترح المسار الأنسب.'
                : 'No friction: choose what matches your case, then share details and we’ll guide the best route.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {quickPaths.map((p, idx) => (
              <Card
                key={p.title}
                className="h-full etlaq-accent-card"
                style={accentStyle(QUICK_PATH_ACCENTS[idx % QUICK_PATH_ACCENTS.length])}
              >
                <CardHeader className="space-y-2 pb-3">
                  <div className="h-10 w-10 rounded-2xl etlaq-accent-icon flex items-center justify-center">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{p.title}</CardTitle>
                  <CardDescription className="leading-relaxed text-sm">{p.desc}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <LocalizedLink href={p.href}>
                    <Button
                      className="w-full rounded-full"
                      onClick={() => trackEvent('home_quickpath_click', { language, path: p.title })}
                    >
                      {quickPathCta(p.href)}
                    </Button>
                  </LocalizedLink>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-8 md:py-12 bg-muted/20">
        <div className="w-full px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">{language === 'ar' ? 'خدماتنا الأساسية' : 'Core services'}</h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'خدمات مركزة ومباشرة لمعالجة المشاكل تحت الأساسات: حقن التربة، كشف التكهفات، والدراسات الجيوفيزيائية.'
                : 'Focused subsurface services: soil grouting, cavity detection, and geophysical surveys.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {services.map((s) => (
              <Card key={s.href} className="h-full etlaq-accent-card" style={accentStyle(SERVICE_ACCENTS[s.key])}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl etlaq-accent-icon flex items-center justify-center">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{s.title}</CardTitle>
                      <CardDescription>{language === 'ar' ? 'تفاصيل ومخرجات' : 'Details & deliverables'}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  <div className="etlaq-card rounded-xl border bg-card/60 backdrop-blur p-4">
                    <p className="text-sm font-medium mb-3">{language === 'ar' ? 'ماذا تتوقع؟' : 'What to expect'}</p>
                    <ul className="space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary" />
                          <span className="leading-relaxed">{b}</span>
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
                        {requestLabel(s.key)}
                      </Button>
                    </LocalizedLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH + VALUE */}
      <section className="py-8 md:py-12">
        <div className="w-full px-4">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-4xl font-bold">{language === 'ar' ? 'منهجية عمل تقلل المخاطر' : 'A method that reduces risk'}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'ar'
                  ? 'هدفنا ليس “حل سريع” فقط — بل حل صحيح. لذلك نعتمد خطوات واضحة من التشخيص حتى التسليم، مع تنفيذ مرحلي وتوثيق مناسب لمتطلبات المشروع.'
                  : 'Our goal isn’t just a “quick fix” — it’s the correct fix. We follow clear steps from diagnosis to deliverables, with staged execution and documentation aligned with project requirements.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                {valuePillars.map((p, idx) => (
                  <Card key={p.title} className="etlaq-accent-card" style={accentStyle(PILLAR_ACCENTS[idx % PILLAR_ACCENTS.length])}>
                    <CardHeader className="space-y-1.5 pb-4">
                      <div className="h-10 w-10 rounded-2xl etlaq-accent-icon flex items-center justify-center">
                        <p.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base">{p.title}</CardTitle>
                      <CardDescription className="leading-relaxed text-sm">{p.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="rounded-3xl border bg-card/70 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{language === 'ar' ? 'كيف نمشي معك خطوة بخطوة' : 'How we work — step by step'}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {language === 'ar'
                    ? 'خطوات عملية تناسب مشاريع الأفراد والمقاولين والمطورين — بدون تعقيد زائد.'
                    : 'Practical steps for owners, contractors, and developers — without unnecessary complexity.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {approach.map((st) => (
                    <div key={st.title} className="rounded-2xl border bg-background/60 p-3">
                      <div className="flex items-start gap-2.5">
                        <div className="h-9 w-9 rounded-2xl border bg-background flex items-center justify-center flex-shrink-0">
                          <st.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{st.title}</div>
                          <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">{st.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <LocalizedLink href="/request-service">
                    <Button className="w-full" onClick={() => trackEvent('home_method_cta', { language })}>
                      {language === 'ar' ? 'ابدأ بالتقييم' : 'Start with an assessment'}
                    </Button>
                  </LocalizedLink>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CLIENTS HEADING + LOGOS */}
      <section className="pt-8 pb-0">
        <div className="w-full px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-6">
            <h2 className="text-2xl md:text-4xl font-bold">
              {language === 'ar' ? 'عملاؤنا' : 'Our Clients'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'نفخر بثقة كبرى الجهات الحكومية والخاصة في المملكة العربية السعودية'
                : 'Trusted by leading public & private sector organisations across Saudi Arabia'}
            </p>
          </div>
        </div>
        <ClientLogosWall />
      </section>

      {/* LOCATIONS */}
      <section className="py-7 md:py-10 bg-muted/20">
        <div className="w-full px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">
                {language === 'ar' ? 'نغطي مناطق المملكة' : 'Serving all regions of KSA'}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {language === 'ar'
                  ? 'فرق ميدانية وخطط تنفيذ قابلة للتوسع حسب حجم المشروع. يمكنك البدء من صفحة مدينتك أو طلب تقييم مباشر.'
                  : 'Field crews and scalable execution plans depending on scope. Start from your city page or request an assessment.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <LocalizedLink href="/locations" className="inline-flex">
                  <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                    {language === 'ar' ? 'استعرض المدن' : 'Browse locations'}
                  </Button>
                </LocalizedLink>
                <LocalizedLink href="/request-service" className="inline-flex">
                  <Button size="sm" className="w-full sm:w-auto">{language === 'ar' ? 'اطلب تقييم' : 'Request assessment'}</Button>
                </LocalizedLink>
              </div>
            </div>

            <Card className="rounded-2xl border bg-card/70 backdrop-blur shrink-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{language === 'ar' ? 'مدن رئيسية' : 'Major cities'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {topCities.map((c) => (
                    <LocalizedLink
                      key={c.slug}
                      href={`/locations/${c.slug}`}
                      className="text-xs rounded-full border px-2.5 py-1 bg-background hover:bg-accent transition"
                    >
                      {language === 'ar' ? c.ar : c.en}
                    </LocalizedLink>
                  ))}
                  <LocalizedLink href="/locations" className="text-xs rounded-full border px-2.5 py-1 bg-background hover:bg-accent transition">
                    {language === 'ar' ? 'كل المدن' : 'All locations'}
                  </LocalizedLink>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ (lazy + in-view) */}
      <InViewMount
        fallback={<div className="py-8 md:py-12 bg-muted/20"><div className="w-full px-4"><div className="max-w-4xl mx-auto mt-8"><div className="h-64 rounded-3xl border bg-card/50" /></div></div></div>}
      >
        <Suspense
          fallback={<div className="py-8 md:py-12 bg-muted/20"><div className="w-full px-4"><div className="max-w-4xl mx-auto mt-8"><div className="h-64 rounded-3xl border bg-card/50" /></div></div></div>}
        >
          <LazyHomeFaqSection />
        </Suspense>
      </InViewMount>

      {/* SERVICE DECISION HELPER — interactive 3-question guide */}
      <InViewMount fallback={<div className="w-full px-4 py-8"><div className="h-64 bg-slate-50/60 rounded-3xl animate-pulse" /></div>}>
        <Suspense fallback={<div className="w-full px-4 py-8"><div className="h-64 bg-slate-50/60 rounded-3xl animate-pulse" /></div>}>
          <ServiceDecisionHelper className="bg-slate-50/60" />
        </Suspense>
      </InViewMount>

      {/* PROCESS TIMELINE — how we work */}
      <InViewMount fallback={<div className="w-full px-4 py-8"><div className="h-80 bg-muted/15 rounded-3xl animate-pulse" /></div>}>
        <Suspense fallback={<div className="w-full px-4 py-8"><div className="h-80 bg-muted/15 rounded-3xl animate-pulse" /></div>}>
          <ProcessTimeline />
        </Suspense>
      </InViewMount>

      {/* WHY CHOOSE US — 6 differentiators */}
      <InViewMount fallback={<div className="w-full px-4 py-8"><div className="h-80 bg-slate-50 rounded-3xl animate-pulse" /></div>}>
        <Suspense fallback={<div className="w-full px-4 py-8"><div className="h-80 bg-slate-50 rounded-3xl animate-pulse" /></div>}>
          <WhyChooseUs className="bg-slate-50" />
        </Suspense>
      </InViewMount>

      {/* FEATURED PROJECTS — project showcase */}
      <InViewMount fallback={<div className="w-full px-4 py-8"><div className="h-[480px] bg-muted/10 rounded-3xl animate-pulse" /></div>}>
        <Suspense fallback={<div className="w-full px-4 py-8"><div className="h-[480px] bg-muted/10 rounded-3xl animate-pulse" /></div>}>
          <FeaturedProjects limit={6} />
        </Suspense>
      </InViewMount>

      {/* VIDEO GALLERY — real field work footage */}
      <InViewMount fallback={<div className="w-full px-4 py-8"><div className="h-80 bg-card rounded-3xl animate-pulse" /></div>}>
        <Suspense fallback={<div className="w-full px-4 py-8"><div className="h-80 bg-card rounded-3xl animate-pulse" /></div>}>
          <section className="py-10 md:py-14">
            <div className="container">
              <VideoGallery videos={groutingVideos} maxInitial={4} />
            </div>
          </section>
        </Suspense>
      </InViewMount>

      {/* TESTIMONIALS — client reviews carousel */}
      <InViewMount fallback={<div className="w-full px-4 py-8"><div className="h-64 bg-muted/20 rounded-3xl animate-pulse" /></div>}>
        <Suspense fallback={<div className="w-full px-4 py-8"><div className="h-64 bg-muted/20 rounded-3xl animate-pulse" /></div>}>
          <TestimonialsSection className="bg-muted/20" />
        </Suspense>
      </InViewMount>

      {/* CERTIFICATIONS BAR — trust indicators */}
      <InViewMount fallback={<div className="w-full px-4 py-4"><div className="h-20 bg-muted/10 rounded-3xl animate-pulse" /></div>}>
        <Suspense fallback={<div className="w-full px-4 py-4"><div className="h-20 bg-muted/10 rounded-3xl animate-pulse" /></div>}>
          <section className="py-8">
            <div className="container">
              <CertificationsBar variant="dark" />
            </div>
          </section>
        </Suspense>
      </InViewMount>

      {/* EMERGENCY CTA — for urgent cases */}
      <InViewMount fallback={<div className="w-full px-4 py-4"><div className="h-44 bg-red-950/10 rounded-3xl animate-pulse" /></div>}>
        <Suspense fallback={<div className="w-full px-4 py-4"><div className="h-44 bg-red-950/10 rounded-3xl animate-pulse" /></div>}>
          <EmergencyCTA />
        </Suspense>
      </InViewMount>

      {/* FINAL CTA */}
      <section className="py-6 md:py-10">
        <div className="w-full px-4">
          <div className="etlaq-card rounded-3xl border bg-card p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-4xl font-bold">
                  {language === 'ar' ? 'ابدأ بخطوة واحدة' : 'Start with one clear step'}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'ar'
                    ? 'أرسل تفاصيل الحالة وسنقترح المسار الأنسب: كشف/دراسة/حقن — مع خطة أولية ومخرجات واضحة.'
                    : 'Share your case details and we’ll suggest the best route: detection/surveys/grouting — with a clear initial plan and practical deliverables.'}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <LocalizedLink href="/request-service">
                  <Button size="lg" className="w-full" onClick={() => trackEvent('home_final_cta_request', { language })}>
                    {language === 'ar' ? 'اطلب تقييم الآن' : 'Request assessment'}
                  </Button>
                </LocalizedLink>
                <LocalizedLink href="/contact">
                  <Button size="lg" variant="outline" className="w-full" onClick={() => trackEvent('home_final_cta_contact', { language })}>
                    {language === 'ar' ? 'تواصل معنا' : 'Contact us'}
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