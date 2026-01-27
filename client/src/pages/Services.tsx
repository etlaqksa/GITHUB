import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/SEO';
import TrustStats from '@/components/TrustStats';
import QuickRequestCard from '@/components/QuickRequestCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, ClipboardList, Drill, Radar, ShieldCheck, Sparkles } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import LocalizedLink from '@/components/LocalizedLink';
import { absUrl } from '@/lib/siteUrl';
import { buildBreadcrumbList } from '@/lib/schemaHelpers';

export default function Services() {
  const { language } = useLanguage();

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: language === 'ar' ? 'خدمات شركة إطلاق المتميزة' : 'Etlaq Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: language === 'ar' ? 'حقن التربة' : 'Soil Grouting',
          description:
            language === 'ar'
              ? 'حلول حقن مناسبة للحالة لتقوية التربة، معالجة التكهفات، وتقليل مخاطر الهبوط والتشققات.'
              : 'Fit-for-case grouting to strengthen soil, treat cavities, and reduce settlement/crack risks.',
          url: absUrl(`${language === 'ar' ? '/ar' : '/en'}/services/grouting`),
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: language === 'ar' ? 'كشف التكهفات' : 'Cavity Detection',
          description:
            language === 'ar'
              ? 'كشف التكهفات المحتملة بالموقع لتقليل المخاطر ودعم قرار المعالجة.'
              : 'Detect subsurface cavities to reduce risk and guide remediation decisions.',
          url: absUrl(`${language === 'ar' ? '/ar' : '/en'}/services/cavity`),
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: language === 'ar' ? 'الدراسات الجيوفيزيائية' : 'Geophysical Surveys',
          description:
            language === 'ar'
              ? 'دراسات جيوفيزيائية للموقع لدعم التشخيص وخطة التنفيذ.'
              : 'Geophysical site surveys supporting diagnosis and planning.',
          url: absUrl(`${language === 'ar' ? '/ar' : '/en'}/services/geophysical`),
        },
      },
    ],
  };

  const services = [
    {
      icon: Drill,
      key: 'grouting' as const,
      title: language === 'ar' ? 'حقن التربة' : 'Soil Grouting',
      desc:
        language === 'ar'
          ? 'حلول حقن مناسبة للحالة لتقوية التربة ومعالجة التكهفات وتقليل مخاطر الهبوط والتشققات.'
          : 'Fit-for-case grouting to strengthen soil, treat cavities, and reduce settlement/crack risks.',
      href: '/services/grouting',
      deliverables:
        language === 'ar'
          ? ['تقييم مبدئي للحالة وخطة تنفيذ واضحة', 'تنفيذ على مراحل حسب موقع المشكلة', 'مخرجات وتوصيات للمسار التالي']
          : ['Initial assessment + clear execution plan', 'Phased execution based on the affected zone', 'Outputs and recommendations for next steps'],
    },
    {
      icon: Radar,
      key: 'cavity' as const,
      title: language === 'ar' ? 'كشف التكهفات' : 'Cavity Detection',
      desc:
        language === 'ar'
          ? 'تشخيص مبكر للتكهفات المحتملة لتقليل المخاطر وتحديد مسار المعالجة المناسب.'
          : 'Early diagnosis of potential cavities to reduce risk and choose the right remediation route.',
      href: '/services/cavity',
      deliverables:
        language === 'ar'
          ? ['تحديد مؤشرات التكهفات وامتدادها المحتمل', 'توصية بمسار المعالجة (حقن/متابعة/اختبار)', 'تقرير مختصر يساعد في اتخاذ القرار']
          : ['Indications of potential cavity zones', 'Recommended route (grouting / monitoring / testing)', 'Concise report to support decisions'],
    },
    {
      icon: ShieldCheck,
      key: 'geophysical' as const,
      title: language === 'ar' ? 'الدراسات الجيوفيزيائية' : 'Geophysical Surveys',
      desc:
        language === 'ar'
          ? 'دعم قرار المعالجة عبر فهم أدق للطبقات تحت السطح وامتداد المشكلة قبل التنفيذ.'
          : 'Support remediation decisions with clearer subsurface understanding before execution.',
      href: '/services/geophysical',
      deliverables:
        language === 'ar'
          ? ['قراءات ومسح للموقع حسب الحالة', 'مؤشرات للمناطق ذات الخطورة الأعلى', 'نتائج تساعد في تحديد نطاق العمل']
          : ['Site readings & survey per case', 'Indications of higher-risk zones', 'Results that help define scope of work'],
    },
  ];

  const chooser = [
    {
      title: language === 'ar' ? 'تشققات أو هبوط ملحوظ' : 'Cracks or noticeable settlement',
      desc:
        language === 'ar'
          ? 'غالبًا تحتاج تقييم سريع وتحديد المسار (كشف/حقن) حسب سبب المشكلة.'
          : 'Start with a quick assessment and choose the route (detection/grouting) based on the cause.',
      href: '/request-service?service=grouting',
    },
    {
      title: language === 'ar' ? 'اشتباه تكهفات بالموقع' : 'Suspected cavities on site',
      desc:
        language === 'ar'
          ? 'ابدأ بكشف التكهفات لتقليل المخاطر قبل أي معالجة.'
          : 'Begin with cavity detection to reduce risk before remediation.',
      href: '/request-service?service=cavity',
    },
    {
      title: language === 'ar' ? 'قبل التنفيذ أو للحسم' : 'Before execution / for certainty',
      desc:
        language === 'ar'
          ? 'الدراسة الجيوفيزيائية تساعد في فهم أدق لما تحت السطح وتحديد نطاق العمل.'
          : 'Geophysical surveys provide clearer subsurface insight and help define scope.',
      href: '/request-service?service=geophysical',
    },
  ];

  const vision =
    language === 'ar'
      ? 'مرجع في كشف التكهفات وحقن التربة داخل المملكة—بدقة وسلامة واستدامة.'
      : 'A reference for cavity detection and grouting across KSA—built on accuracy, safety, and sustainability.';

  const mission =
    language === 'ar'
      ? 'تشخيص أدق + تنفيذ ميداني منظم + مخرجات مفهومة تساعد على اتخاذ قرار سريع وواثق.'
      : 'Sharper diagnosis + structured field execution + clear deliverables to help clients decide quickly and confidently.';

  const pillars = [
    {
      icon: ShieldCheck,
      title: language === 'ar' ? 'السلامة أولاً' : 'Safety-first',
      desc: language === 'ar' ? 'نوصي بالمسار الأقل مخاطرة عند عدم وضوح السبب.' : 'We recommend the lowest-risk route when the cause is unclear.',
    },
    {
      icon: Sparkles,
      title: language === 'ar' ? 'دقة وابتكار' : 'Precision & innovation',
      desc: language === 'ar' ? 'أدوات ومنهجية مناسبة للحالة لقراءة ما تحت السطح.' : 'Fit-for-case tools and methodology to read the subsurface.',
    },
    {
      icon: ClipboardList,
      title: language === 'ar' ? 'مخرجات واضحة' : 'Clear deliverables',
      desc: language === 'ar' ? 'خطة/نتائج/توصيات للخطوة التالية.' : 'Plan, results, and next-step recommendations.',
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: language === 'ar' ? 'الخدمات' : 'Services', url: absUrl(`/${language}/services`) },
      buildBreadcrumbList([
        { name: language === 'ar' ? 'الرئيسية' : 'Home', url: absUrl(`/${language}/`) },
        { name: language === 'ar' ? 'الخدمات' : 'Services', url: absUrl(`/${language}/services`) },
      ]),
    ],
  };

  return (
    <>
      <SEO
        title={language === 'ar' ? 'الخدمات | شركة إطلاق المتميزة' : 'Services | Etlaq'}
        description={
          language === 'ar'
            ? 'حقن التربة، كشف التكهفات، والدراسات الجيوفيزيائية. نعمل في جميع مناطق المملكة (+20 مدينة).'
            : 'Soil grouting, cavity detection, and geophysical surveys across KSA (20+ cities).'
        }
        image={absUrl('/og-image.webp')}
        schema={schema}
      />

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <Breadcrumbs items={[{ name: language === 'ar' ? 'الخدمات' : 'Services', href: '/services', isCurrent: true }]} />

        <h1 className="text-3xl md:text-5xl font-bold">{language === 'ar' ? 'خدماتنا' : 'Our services'}</h1>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'ar'
                ? 'نركز على خدمات محددة تؤثر مباشرة على سلامة الأساسات وتقليل المخاطر: حقن التربة، كشف التكهفات، والدراسات الجيوفيزيائية (عند الحاجة للتشخيص الأدق).'
                : 'We focus on high-impact subsurface services: grouting, cavity detection, and geophysical surveys when deeper diagnosis is needed.'}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border bg-card/70 backdrop-blur p-6">
            <TrustStats />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/966534145922?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D9%85%D9%84%D9%81%20%D8%A8%D8%B1%D9%88%D9%81%D8%A7%D9%8A%D9%84%20%D8%B4%D8%B1%D9%83%D8%A9%20%D8%A5%D8%B7%D9%84%D8%A7%D9%82%20%D8%A7%D9%84%D9%85%D8%AA%D9%85%D9%8A%D8%B2%D8%A9%20%28Company%20Profile%29%20%D9%85%D9%86%20%D9%81%D8%B6%D9%84%D9%83."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
              onClick={() => trackEvent('services_profile_download', { language })}
            >
              <Button variant="secondary" className="w-full sm:w-auto">
                {language === 'ar' ? 'تحميل ملف الشركة' : 'Download company profile'}
              </Button>
            </a>
            <LocalizedLink href="/request-service" className="inline-flex">
              <Button className="w-full sm:w-auto" onClick={() => trackEvent('services_request_click', { language })}>
                {language === 'ar' ? 'اطلب خدمة' : 'Request service'}
              </Button>
            </LocalizedLink>
          </div>

          
          {/* Conversion: short form */}
          <div className="mt-10 grid lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl border bg-card/70 backdrop-blur p-6">
              <h2 className="text-2xl font-bold">{language === 'ar' ? 'اختر المسار المناسب خلال دقيقة' : 'Choose the right path in one minute'}</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'أجب على وصف مختصر وسنرد بخطوة تالية واضحة: تقييم، فحص (GPR/ERT)، أو خطة تنفيذ. بدون تعقيد.'
                  : 'Send a short description and we’ll reply with clear next steps: assessment, inspection (GPR/ERT), or an execution plan.'}
              </p>
              <div className="mt-4 grid gap-3">
                {chooser.map((c) => (
                  <Card key={c.title}>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        {c.title}
                      </CardTitle>
                      <CardDescription className="leading-relaxed">{c.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <LocalizedLink href={c.href} className="inline-flex">
                        <Button variant="secondary" onClick={() => trackEvent('services_path_pick', { language, title: c.title })}>
                          {language === 'ar' ? 'ابدأ الآن' : 'Start'}
                        </Button>
                      </LocalizedLink>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <QuickRequestCard formName="quick_assessment" />
          </div>

{/* Method & trust pillars (from company profile) */}
          <div className="mt-6 rounded-2xl border bg-card/70 backdrop-blur p-6">
            <div className="grid lg:grid-cols-2 gap-6">
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

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {pillars.map((p) => (
                <Card key={p.title} className="h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-2xl border bg-background/70 backdrop-blur flex items-center justify-center">
                      <p.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg mt-3">{p.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{p.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {services.map((s) => (
              <Card key={s.href} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl border bg-background/70 backdrop-blur flex items-center justify-center">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{s.title}</CardTitle>
                      <CardDescription>{language === 'ar' ? 'تفاصيل + مخرجات واضحة' : 'Details + clear outputs'}</CardDescription>
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
                        onClick={() => trackEvent('services_request_click', { language, service: s.key })}
                      >
                        {language === 'ar' ? 'اطلب الخدمة' : 'Request service'}
                      </Button>
                    </LocalizedLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border bg-card/70 backdrop-blur p-6">
            <div className="max-w-3xl mx-auto text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">{language === 'ar' ? 'متى تختار أي خدمة؟' : 'Which service should you choose?'}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'ar'
                  ? 'اختر الحالة الأقرب لديك وسنأخذك مباشرة للنموذج مع تعبئة الخدمة المناسبة لتقليل الوقت وزيادة دقة الطلب.'
                  : 'Pick the closest scenario and we will take you to the request form with the right service preselected.'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {chooser.map((c) => (
                <Card key={c.href}>
                  <CardHeader>
                    <CardTitle className="text-lg">{c.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{c.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LocalizedLink href={c.href}>
                      <Button
                        className="w-full"
                        onClick={() => trackEvent('services_chooser_start', { language, scenario: c.title })}
                      >
                        {language === 'ar' ? 'ابدأ الآن' : 'Start now'}
                      </Button>
                    </LocalizedLink>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <LocalizedLink href="/request-service">
              <Button size="lg" onClick={() => trackEvent('services_assessment_cta', { language })}>
                {language === 'ar' ? 'اطلب تقييم هندسي' : 'Request an assessment'}
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>
    </>
  );
}
