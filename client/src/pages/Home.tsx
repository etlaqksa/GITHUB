import { useEffect, useMemo, useState, type CSSProperties } from 'react';

import LocalizedLink from '@/components/LocalizedLink';
import { SEO } from '@/components/SEO';
import TrustStats from '@/components/TrustStats';
import ClientLogosWall from '@/components/ClientLogosWall';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroIntroSequence from '@/components/hero/HeroIntroSequence';
import { trackEvent } from '@/lib/analytics';
import { absUrl } from '@/lib/siteUrl';
import { useUrlSearch } from '@/lib/useUrlSearch';
import { projects } from '@/data/projects';
import { cities } from '@/data/seoLocations';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,

  ClipboardList,
  Drill,
  HardHat,
  MapPin,
  Radar,
  ShieldCheck,
  Sparkles,
  Timer,
} from 'lucide-react';
import { useLocation } from 'wouter';


const accentStyle = (rgb: string): CSSProperties => ({ ['--accent-rgb' as any]: rgb });

const QUICK_PATH_ACCENTS = ['37 99 235', '245 158 11', '16 185 129', '168 85 247'];
const SERVICE_ACCENTS: Record<'grouting' | 'cavity' | 'geophysical', string> = {
  grouting: '37 99 235',
  cavity: '245 158 11',
  geophysical: '16 185 129',
};
const PILLAR_ACCENTS = ['16 185 129', '37 99 235', '245 158 11', '168 85 247'];

export default function Home() {
  const { language } = useLanguage();

  const [loc] = useLocation();
  const search = useUrlSearch();

  const { heroVariant, showHeroPreview, forceMotion } = useMemo(() => {
    const rawEnv = (import.meta.env.VITE_HERO_VARIANT || "").toString().toLowerCase();
    const envVariant = rawEnv === "blobs" ? "blobs" : rawEnv === "grid" ? "grid" : rawEnv === "light" ? "light" : "gradient";

    const params = new URLSearchParams(search || "");

    const q = (params.get("hero") || "").toLowerCase();
    const heroVariant = (q === "blobs" || q === "gradient" || q === "grid" || q === "light")
      ? (q as "blobs" | "gradient" | "grid" | "light")
      : (envVariant as "blobs" | "gradient" | "grid" | "light");

    // User requested the switcher to be visible in production without any parameters.
    const showHeroPreview = true;
    const forceMotion = params.get("motion") === "1" || params.get("forceMotion") === "1";

    return { heroVariant, showHeroPreview, forceMotion };
  }, [loc, search]);

  // Allow forcing motion for previewing animations even if the OS has reduced-motion enabled.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (forceMotion) document.documentElement.setAttribute('data-force-motion', '1');
    else document.documentElement.removeAttribute('data-force-motion');
  }, [forceMotion]);

  const updateHeroQuery = (next: Record<string, string | undefined>) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search || '');
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') params.delete(k);
      else params.set(k, v);
    });
    const qs = params.toString();
    const url = window.location.pathname + (qs ? `?${qs}` : '') + (window.location.hash || '');
    window.history.replaceState(null, '', url);
  };


  const whatsappNumber = '966534145922';
  const heroWhatsAppUrl = useMemo(() => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : absUrl('/');
    const text =
      language === 'ar'
        ? `السلام عليكم، أود طلب خدمة من شركة إطلاق المتميزة.\nرابط الصفحة: ${pageUrl}`
        : `Hello, I would like to request a service from ETLAQ Distinguished Company.\nPage: ${pageUrl}`;

    const base = `https://wa.me/${whatsappNumber}`;
    const q = new URLSearchParams({ text });
    return `${base}?${q.toString()}`;
  }, [language]);

  // "Desktop mode" on mobile browsers can report a wide viewport (so md/lg styles apply),
  // but the device is still a phone (coarse pointer). Use this signal to prevent the
  // collage hero from becoming too tall on mobile.
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  // "Desktop site" mode on mobile browsers: wide viewport, but still coarse pointer.
  // We use a slightly different collage crop to avoid visible gaps in the collage background.
  const [isDesktopModeMobile, setIsDesktopModeMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(pointer: coarse)');
    const mqDesktopMode = window.matchMedia('(pointer: coarse) and (min-width: 768px)');

    const onChange = () => setIsCoarsePointer(!!mq.matches);
    const onChangeDesktopMode = () => setIsDesktopModeMobile(!!mqDesktopMode.matches);

    onChange();
    onChangeDesktopMode();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mq as any).addEventListener?.('change', onChange);
    (mqDesktopMode as any).addEventListener?.('change', onChangeDesktopMode);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mq as any).addListener?.(onChange);
    (mqDesktopMode as any).addListener?.(onChangeDesktopMode);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mq as any).removeEventListener?.('change', onChange);
      (mqDesktopMode as any).removeEventListener?.('change', onChangeDesktopMode);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mq as any).removeListener?.(onChange);
      (mqDesktopMode as any).removeListener?.(onChangeDesktopMode);
    };
  }, []);

  const services = [
    {
      icon: Drill,
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
      icon: Radar,
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
      icon: ShieldCheck,
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
      icon: Radar,
      title: language === 'ar' ? 'اشتباه تكهفات' : 'Suspected cavities',
      desc:
        language === 'ar'
          ? 'الكشف المبكر يقلل المخاطر ويعطيك قرارًا أوضح قبل أي معالجة.'
          : 'Early detection reduces risk and gives you a clearer decision before remediation.',
      href: '/request-service?service=cavity',
    },
    {
      icon: HardHat,
      title: language === 'ar' ? 'قبل تنفيذ أعمال حساسة' : 'Before critical works',
      desc:
        language === 'ar'
          ? 'تشخيص ما تحت السطح قبل القرارات المكلفة يساعد على تقليل المفاجآت.'
          : 'Subsurface insight before expensive decisions reduces surprises and rework.',
      href: '/request-service?service=geophysical',
    },
    {
      icon: MapPin,
      title: language === 'ar' ? 'مشكلة داخل مبنى قائم' : 'Inside an existing building',
      desc:
        language === 'ar'
          ? 'نرتّب التنفيذ ليكون عمليًا داخل الموقع مع تقليل الإزعاج قدر الإمكان.'
          : 'We plan a practical on-site execution path with minimal disruption when possible.',
      href: '/request-service',
    },
  ];

  const approach = [
    {
      icon: ClipboardList,
      title: language === 'ar' ? 'تقييم سريع وتحديد نطاق' : 'Fast assessment & scope',
      desc:
        language === 'ar'
          ? 'نجمع المعلومات المتاحة ونحدد مؤشرات المشكلة ونطاقها (بلا مبالغة وبلا نقص).' 
          : 'We collect available inputs and define a realistic scope—no exaggeration, no underestimation.',
    },
    {
      icon: Radar,
      title: language === 'ar' ? 'تشخيص قابل للتنفيذ' : 'Actionable diagnosis',
      desc:
        language === 'ar'
          ? 'عند عدم وضوح السبب نبدأ بالكشف/الدراسة ثم نقرّر المعالجة المناسبة.'
          : 'When the cause is unclear, we start with detection/surveys then decide the remediation route.',
    },
    {
      icon: Drill,
      title: language === 'ar' ? 'تنفيذ مرحلي مع مراقبة' : 'Phased execution + monitoring',
      desc:
        language === 'ar'
          ? 'تنفيذ منظم على مراحل لتقليل المخاطر وتحسين التحكم بالجودة.'
          : 'Structured staged execution to reduce risk and improve quality control.',
    },
    {
      icon: Timer,
      title: language === 'ar' ? 'مخرجات وتوصيات واضحة' : 'Clear deliverables',
      desc:
        language === 'ar'
          ? 'تسليم ما يهمك فعلاً: ماذا تم؟ ماذا يعني؟ ما الخطوة التالية؟'
          : 'You get what matters: what was done, what it means, and the next step.',
    },
  ];

  const valuePillars = [
    {
      icon: ShieldCheck,
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
      icon: Building2,
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

  const faq = [
    {
      id: 'faq-1',
      q: language === 'ar' ? 'هل أبدأ بحقن التربة أم بكشف التكهفات؟' : 'Should I start with grouting or cavity detection?',
      a:
        language === 'ar'
          ? 'إذا كان السبب غير واضح أو يوجد اشتباه تكهفات/فراغات، نبدأ بالكشف أو الدراسة الجيوفيزيائية ثم نحدد المعالجة. إذا كانت المؤشرات واضحة لضعف/هبوط موضعي تحت الأساسات، قد نبدأ بخطة حقن مرحلية بعد التقييم.'
          : 'If the root cause is unclear or voids are suspected, start with detection or geophysics, then decide remediation. If indicators point to localized weakness/settlement under foundations, a staged grouting plan may follow after assessment.',
    },
    {
      id: 'faq-2',
      q: language === 'ar' ? 'هل الحقن يوقف التشققات نهائياً؟' : 'Will grouting permanently stop cracks?',
      a:
        language === 'ar'
          ? 'الحقن يعالج سبباً شائعاً (ضعف/فراغات/هبوط)، لكنه ليس حلًا سحريًا لكل التشققات. النتيجة تعتمد على السبب الحقيقي، ونوصي بخطوة التشخيص أولاً عند الشك.'
          : 'Grouting addresses common causes (weak soil/voids/settlement), but it is not a universal cure for every crack. Results depend on the real cause—diagnosis first when uncertain.',
    },
    {
      id: 'faq-3',
      q: language === 'ar' ? 'ما المعلومات التي تساعدكم في التقييم؟' : 'What information helps your assessment?',
      a:
        language === 'ar'
          ? 'موقع المشروع، صور للتشققات/الهبوط إن وُجدت، مخططات إنشائية أو تقرير تربة سابق (إن توفر)، وأي أعمال سابقة بالموقع (تسربات/حفريات/إضافات).' 
          : 'Project location, photos of cracks/settlement (if any), drawings or a prior soil report (if available), and any previous site events (leakage/excavation/changes).',
    },
    {
      id: 'faq-4',
      q: language === 'ar' ? 'كم تستغرق الأعمال؟' : 'How long does it take?',
      a:
        language === 'ar'
          ? 'يعتمد على نطاق المشكلة وطبيعة الوصول للموقع ومتطلبات الاختبارات والتوثيق. بعد التقييم نحدد خطة زمنية واقعية.'
          : 'It depends on scope, site access, and testing/documentation requirements. After assessment, we propose a realistic timeline.',
    },
    {
      id: 'faq-5',
      q: language === 'ar' ? 'هل تعملون داخل المباني القائمة؟' : 'Do you work inside existing buildings?',
      a:
        language === 'ar'
          ? 'نعم حسب الحالة ومتطلبات السلامة. نرتب العمل لتقليل الإزعاج قدر الإمكان، ونوضح قبل التنفيذ نقاط الدخول والحماية والتنظيف.'
          : 'Yes, depending on the case and safety requirements. We plan access, protection, and cleanup steps ahead to minimize disruption.',
    },
  ];

  return (
    <>
      <SEO
        title={language === 'ar' ? 'شركة إطلاق المتميزة | حقن التربة وكشف التكهفات' : 'Etlaq | Soil Grouting & Cavity Detection'}
        description={
          language === 'ar'
            ? 'حلول حقن التربة وكشف التكهفات والدراسات الجيوفيزيائية. خبرة ميدانية ومخرجات واضحة تساعد على اتخاذ القرار بثقة. نخدم جميع مناطق المملكة.'
            : 'Soil grouting, cavity/void detection, and geophysical surveys. Field-proven execution and clear deliverables to help you decide with confidence across KSA.'
        }
        schema={
          language === 'ar'
            ? {
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                name: 'شركة إطلاق المتميزة المحدودة',
                url: absUrl('/ar'),
                logo: absUrl('/logo.png'),
                image: absUrl('/favicon.png'),
                telephone: '+966534145922',
                areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
                serviceType: ['حقن التربة', 'كشف التكهفات', 'حلول جيوفيزيائية'],
              }
            : {
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                name: 'ETLAQ Distinguished Company',
                url: absUrl('/en'),
                logo: absUrl('/logo.png'),
                image: absUrl('/favicon.png'),
                telephone: '+966534145922',
                areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
                serviceType: ['Soil grouting', 'Cavity detection', 'Geophysical surveys'],
              }
        }
        image={absUrl('/favicon.png')}
      />

      {/* HERO */}
      <section
        className={
          `relative isolate overflow-hidden ` +
          (isDesktopModeMobile
            ? 'min-h-[72vh]'
            : isCoarsePointer
              ? 'min-h-[76vh]'
              : 'min-h-[86vh] md:min-h-[90vh]')
        }
      >
        <div
          className={
            "absolute inset-0 z-0 etlaq-hero-bg " +
            (heroVariant === "blobs"
              ? "etlaq-hero-bg--blobs"
              : heroVariant === "grid"
                ? "etlaq-hero-bg--grid"
                : heroVariant === "light"
                  ? "etlaq-hero-bg--light"
                  : "etlaq-hero-bg--gradient")
          }
          aria-hidden="true"
        >
          {heroVariant === "blobs" ? (
            <>
              <div className="etlaq-hero-blob etlaq-hero-blob-1" />
              <div className="etlaq-hero-blob etlaq-hero-blob-2" />
              <div className="etlaq-hero-blob etlaq-hero-blob-3" />
            </>
          ) : null}
        </div>

        {/* Contrast layer so hero text stays readable (no top/bottom bands) */}
        <div
          className={
            'absolute inset-0 z-10 pointer-events-none ' +
            (heroVariant === 'light'
              ? (isDesktopModeMobile
                  ? 'bg-white/25'
                  : isCoarsePointer
                    ? 'bg-white/22'
                    : 'bg-white/18')
              : (isDesktopModeMobile
                  ? 'bg-black/48'
                  : isCoarsePointer
                    ? 'bg-black/44'
                    : 'bg-black/38'))
          }
          aria-hidden="true"
        />

        <div
          className={
            'w-full px-4 relative z-20 flex items-center justify-center ' +
            (isCoarsePointer ? 'pt-10 pb-14' : 'pt-12 pb-16 md:pt-16 md:pb-20')
          }
        >
          <HeroIntroSequence
            heroVariant={heroVariant}
            heroWhatsAppUrl={heroWhatsAppUrl}
            showVariantSwitcher={showHeroPreview}
            forceMotion={forceMotion}
            onVariantChange={(v) => updateHeroQuery({ hero: v })}
            onToggleMotion={() => updateHeroQuery({ motion: forceMotion ? undefined : '1' })}
            onExploreServicesClick={() => trackEvent('home_hero_explore_services', { language })}
            onWhatsappClick={() => trackEvent('home_hero_whatsapp_click', { language })}
          />
        </div>
      </section>

      {/* QUICK PATHS */}
      <section className="py-12 md:py-16">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {quickPaths.map((p, idx) => (
              <Card
                key={p.title}
                className="h-full etlaq-accent-card"
                style={accentStyle(QUICK_PATH_ACCENTS[idx % QUICK_PATH_ACCENTS.length])}
              >
                <CardHeader className="space-y-3">
                  <div className="h-12 w-12 rounded-2xl etlaq-accent-icon flex items-center justify-center">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{p.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{p.desc}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <LocalizedLink href={p.href}>
                    <Button
                      className="w-full rounded-full"
                      onClick={() => trackEvent('home_quickpath_click', { language, path: p.title })}
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
        <div className="w-full px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">{language === 'ar' ? 'خدماتنا الأساسية' : 'Core services'}</h2>
            <p className="text-muted-foreground">
              {language === 'ar'
                ? 'خدمات مركزة ومباشرة لمعالجة المشاكل تحت الأساسات: حقن التربة، كشف التكهفات، والدراسات الجيوفيزيائية.'
                : 'Focused subsurface services: soil grouting, cavity detection, and geophysical surveys.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {services.map((s) => (
              <Card
                key={s.href}
                className="h-full etlaq-accent-card"
                style={accentStyle(SERVICE_ACCENTS[s.key])}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl etlaq-accent-icon flex items-center justify-center">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{s.title}</CardTitle>
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

      {/* APPROACH + VALUE */}
      <section className="py-12 md:py-16">
        <div className="w-full px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold">{language === 'ar' ? 'منهجية عمل تقلل المخاطر' : 'A method that reduces risk'}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'ar'
                  ? 'هدفنا ليس “حل سريع” فقط — بل حل صحيح. لذلك نعتمد خطوات واضحة من التشخيص حتى التسليم، مع تنفيذ مرحلي وتوثيق مناسب لمتطلبات المشروع.'
                  : 'Our goal isn’t just a “quick fix” — it’s the correct fix. We follow clear steps from diagnosis to deliverables, with staged execution and documentation aligned with project requirements.'}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {valuePillars.map((p, idx) => (
                  <Card
                    key={p.title}
                    className="etlaq-accent-card"
                    style={accentStyle(PILLAR_ACCENTS[idx % PILLAR_ACCENTS.length])}
                  >
                    <CardHeader className="space-y-2">
                      <div className="h-11 w-11 rounded-2xl etlaq-accent-icon flex items-center justify-center">
                        <p.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{p.title}</CardTitle>
                      <CardDescription className="leading-relaxed">{p.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="rounded-3xl border bg-card/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">{language === 'ar' ? 'كيف نمشي معك خطوة بخطوة' : 'How we work — step by step'}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {language === 'ar'
                    ? 'خطوات عملية تناسب مشاريع الأفراد والمقاولين والمطورين — بدون تعقيد زائد.'
                    : 'Practical steps for owners, contractors, and developers — without unnecessary complexity.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {approach.map((st) => (
                    <div key={st.title} className="rounded-2xl border bg-background/60 p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-2xl border bg-background flex items-center justify-center">
                          <st.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{st.title}</div>
                          <div className="text-sm text-muted-foreground leading-relaxed mt-1">{st.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
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

      {/* FEATURED PROJECTS */}
      
      <ClientLogosWall />

<section className="py-12 md:py-16 bg-muted/20">
        <div className="w-full px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-bold">
                {language === 'ar' ? 'نغطي مناطق المملكة' : 'Serving all regions of KSA'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'ar'
                  ? 'فرق ميدانية وخطط تنفيذ قابلة للتوسع حسب حجم المشروع. يمكنك البدء من صفحة مدينتك أو طلب تقييم مباشر.'
                  : 'Field crews and scalable execution plans depending on scope. Start from your city page or request an assessment.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <LocalizedLink href="/locations" className="inline-flex">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {language === 'ar' ? 'استعرض المدن' : 'Browse locations'}
                  </Button>
                </LocalizedLink>
                <LocalizedLink href="/request-service" className="inline-flex">
                  <Button className="w-full sm:w-auto">{language === 'ar' ? 'اطلب تقييم' : 'Request assessment'}</Button>
                </LocalizedLink>
              </div>
            </div>

            <Card className="rounded-3xl border bg-card/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">{language === 'ar' ? 'مدن رئيسية' : 'Major cities'}</CardTitle>
                <CardDescription>
                  {language === 'ar'
                    ? 'اختر مدينتك لعرض الخدمات المتاحة داخلها.'
                    : 'Pick your city to view available services.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {topCities.map((c) => (
                    <LocalizedLink
                      key={c.slug}
                      href={`/locations/${c.slug}`}
                      className="text-xs rounded-full border px-3 py-2 bg-background hover:bg-accent"
                    >
                      {language === 'ar' ? c.ar : c.en}
                    </LocalizedLink>
                  ))}
                  <LocalizedLink
                    href="/locations"
                    className="text-xs rounded-full border px-3 py-2 bg-background hover:bg-accent"
                  >
                    {language === 'ar' ? 'كل المدن' : 'All locations'}
                  </LocalizedLink>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="w-full px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold">{language === 'ar' ? 'أسئلة شائعة' : 'FAQ'}</h2>
            <p className="text-muted-foreground">
              {language === 'ar'
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

      {/* FINAL CTA */}
      <section className="py-12 md:py-16">
        <div className="w-full px-4">
          <div className="etlaq-card rounded-3xl border bg-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
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
