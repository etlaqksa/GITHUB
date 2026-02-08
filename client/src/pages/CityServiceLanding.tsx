import { SEO } from '@/components/SEO';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import RelatedLinksHub from '@/components/RelatedLinksHub';
import QuickRequestCard from '@/components/QuickRequestCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { findCity, findServiceLanding, getCitySlug, getServiceSlug } from '@/data/seoLocations';
import { getNeighborhoodSlug, listNeighborhoodsForCity } from '@/data/neighborhoods';
import { buildCityServiceModel, isModelServiceSlug } from '@/data/cityServiceModels';
import { buildLandingKeywords } from '@/lib/seoKeywords';
import { absUrl, getSiteUrl } from '@/lib/siteUrl';
import { buildLocalBusinessSchema, COMPANY } from '@/lib/companyProfile';
import { buildBreadcrumbList } from '@/lib/schemaHelpers';
import { CheckCircle2, ClipboardList, MapPin, ShieldCheck } from 'lucide-react';

type Props = {
  params: {
    citySlug?: string;
    serviceSlug?: string;
  };
};

function buildFaqFallback(lang: 'ar' | 'en', serviceName: string, cityName: string) {
  if (lang === 'ar') {
    return [
      {
        q: `متى أحتاج ${serviceName} في ${cityName}؟`,
        a: 'عند وجود مؤشرات هبوط/تشققات، أو اشتباه فراغات تحت السطح، أو عند الحاجة لتقليل المخاطر قبل التنفيذ. التقييم الأولي يحدد المسار الأنسب.',
      },
      {
        q: 'هل التنفيذ يتم على مراحل؟',
        a: 'نعم—عند الحاجة. في الحقن مثلاً قد يتم التنفيذ على مراحل حسب عمق ونطاق المشكلة ومعايير التحقق.',
      },
      {
        q: 'ماذا أستلم في نهاية العمل؟',
        a: 'مخرجات واضحة: ملخص نتائج، نطاق العمل المنفذ، وملاحظات/توصيات للخطوة التالية بما يدعم قرارك.',
      },
    ];
  }
  return [
    {
      q: `When do I need ${serviceName} in ${cityName}?`,
      a: 'When there are settlement/crack indicators, suspected subsurface voids, or when you need to reduce risk before execution. A quick assessment helps select the right route.',
    },
    {
      q: 'Is work performed in phases?',
      a: 'Yes—when needed. For example, grouting is often executed in phases depending on depth, extent, and validation criteria.',
    },
    {
      q: 'What deliverables do I receive?',
      a: 'Clear deliverables: summary of findings, executed scope, and next-step recommendations to support decision making.',
    },
  ];
}

function waLink(phoneE164: string, message: string) {
  const digits = phoneE164.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function OgImageForService(serviceSlug?: string) {
  const slug = serviceSlug || '';
  if (slug.includes('soil-grouting')) return absUrl('/og-soil-grouting.webp');
  if (slug.includes('void-detection')) return absUrl('/og-void-detection.webp');
  if (slug.includes('geophysical-surveys')) return absUrl('/og-geophysical-surveys.webp');
  if (slug.includes('foundation-strengthening')) return absUrl('/og-foundation-strengthening.webp');
  return absUrl('/og-image.webp');
}

function ModelLanding(props: {
  lang: 'ar' | 'en';
  city: NonNullable<ReturnType<typeof findCity>>;
  service: NonNullable<ReturnType<typeof findServiceLanding>>;
}) {
  const { lang, city, service } = props;

  const cityName = lang === 'ar' ? city.ar : city.en;

  const model = buildCityServiceModel({ lang, city, service });

  const localizedCitySlug = getCitySlug(city, lang);
  const localizedServiceSlug = getServiceSlug(service, lang, city);

  const canonicalPath = `${lang === 'ar' ? '/ar' : '/en'}/locations/${localizedCitySlug}/${localizedServiceSlug}`;
  const canonical = absUrl(canonicalPath);
  const ogImage = OgImageForService(service.slug);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: model.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: model.seoTitle,
    description: model.seoDescription,
    provider: buildLocalBusinessSchema({ url: getSiteUrl(), logoUrl: absUrl('/logo.png'), imageUrl: ogImage }),
    areaServed: {
      '@type': 'City',
      name: cityName,
      address: { '@type': 'PostalAddress', addressLocality: cityName, addressCountry: 'SA' },
    },
    serviceType: lang === 'ar' ? service.ar : service.en,
    url: canonical,
  };

  const localBusinessSchema = buildLocalBusinessSchema({ url: getSiteUrl(), logoUrl: absUrl('/logo.png'), imageUrl: ogImage });

  const breadcrumb = buildBreadcrumbList([
    { name: lang === 'ar' ? 'الرئيسية' : 'Home', url: absUrl(`/${lang}/`) },
    { name: lang === 'ar' ? 'المدن' : 'Locations', url: absUrl(`/${lang}/locations`) },
    { name: cityName, url: absUrl(`/${lang}/locations/${localizedCitySlug}`) },
    { name: model.h1, url: canonical },
  ]);

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema, serviceSchema, faqSchema, breadcrumb],
  };

  const msg =
    lang === 'ar'
      ? `السلام عليكم، أريد طلب ${service.ar} في ${city.ar}. ممكن معاينة/تقييم مبدئي؟`
      : `Hello, I would like to request ${service.en} in ${city.en}. Can we arrange a visit/quick assessment?`;

  return (
    <>
      <SEO
        title={model.seoTitle}
        description={model.seoDescription}
        keywords={buildLandingKeywords(lang, city, service)}
        url={canonical}
        image={ogImage}
        schema={combinedSchema}
        alternateUrls={{
          ar: absUrl(`/ar/locations/${getCitySlug(city, 'ar')}/${getServiceSlug(service, 'ar', city)}`),
          en: absUrl(`/en/locations/${getCitySlug(city, 'en')}/${getServiceSlug(service, 'en', city)}`),
        }}
      />

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{cityName}</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">
                  {lang === 'ar' ? 'خطة واضحة ومخرجات مفهومة' : 'Clear plan & deliverables'}
                </span>
              </span>
            </div>

            <Breadcrumbs
              items={[
                { name: lang === 'ar' ? 'المدن' : 'Locations', href: '/locations' },
                { name: cityName, href: `/locations/${localizedCitySlug}` },
                { name: model.h1, href: `/locations/${localizedCitySlug}/${localizedServiceSlug}`, isCurrent: true },
              ]}
            />

            <div className="rounded-3xl border bg-card/60 backdrop-blur p-6 md:p-8">
              <p className="text-sm font-medium text-muted-foreground">{model.kicker}</p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-2">{model.h1}</h1>

              <div className="mt-4 space-y-2">
                {model.intro.map((p) => (
                  <p key={p} className="text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {model.chips.map((c) => (
                  <span key={c} className="inline-flex items-center rounded-full border bg-background/60 px-3 py-1 text-xs">
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href={waLink(COMPANY.phoneE164, msg)} className="inline-flex w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">{lang === 'ar' ? 'اطلب معاينة الآن' : 'Request a site visit'}</Button>
                </a>
                <a href={`tel:${COMPANY.phoneE164}`} className="inline-flex w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {lang === 'ar' ? 'اتصال مباشر' : 'Call now'}
                  </Button>
                </a>
                <LocalizedLink href="/contact" className="inline-flex w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    {lang === 'ar' ? 'نموذج تواصل' : 'Contact form'}
                  </Button>
                </LocalizedLink>
              </div>
            </div>

            {/* Summary */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{model.whatIsTitle}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {lang === 'ar' ? 'شرح مبسط يساعدك على فهم الفكرة قبل القرار.' : 'A simple explanation before making a decision.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {model.whatIsBody.map((p) => (
                    <p key={p} className="text-sm text-muted-foreground leading-relaxed">
                      {p}
                    </p>
                  ))}
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{model.whenTitle}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {lang === 'ar' ? 'أعراض شائعة تساعد على تحديد المسار.' : 'Common indicators to help choose the right route.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {model.whenBullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Types */}
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold">{model.typesTitle}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {model.types.map((t) => (
                  <Card key={t.title} className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{t.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Process + Deliverables */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{model.processTitle}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {lang === 'ar' ? 'خطوات عملية واضحة—بدون تعقيد.' : 'Practical steps—kept simple.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {model.processSteps.map((s) => (
                    <div key={s.title} className="rounded-xl border bg-card/60 backdrop-blur p-4">
                      <div className="flex items-start gap-2">
                        <ClipboardList className="h-4 w-4 mt-0.5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{s.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{model.deliverablesTitle}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {lang === 'ar' ? 'مخرجات مفهومة تساعدك على المتابعة بثقة.' : 'Clear deliverables you can act on.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {model.deliverablesBullets.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary" />
                        <span className="leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>

                  {service.servicePageHref ? (
                    <div className="pt-4">
                      <LocalizedLink href={service.servicePageHref} className="inline-flex">
                        <Button variant="secondary" className="w-full sm:w-auto">
                          {lang === 'ar' ? 'تفاصيل الخدمة العامة' : 'Service overview'}
                        </Button>
                      </LocalizedLink>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>

            {/* Why early */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{model.whyEarlyTitle}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {lang === 'ar' ? 'لماذا نُفضّل التحرك مبكرًا؟' : 'Why we recommend early action.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-2">
                  {model.whyEarlyBullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* FAQ */}
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold">{model.faqTitle}</h2>
              <div className="space-y-3">
                {model.faq.map((f) => (
                  <details key={f.q} className="rounded-2xl border bg-card/50 backdrop-blur px-5 py-4">
                    <summary className="cursor-pointer font-medium">{f.q}</summary>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">{f.a}</p>
                  </details>
                ))}
              </div>

              <div className="pt-2">
                <LocalizedLink href={`/locations/${localizedCitySlug}`} className="text-sm text-primary hover:underline">
                  {lang === 'ar' ? `العودة لصفحة ${cityName}` : `Back to ${cityName}`}
                </LocalizedLink>
              </div>
            </div>

            {/* CTA + Quick request */}
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <div className="rounded-2xl border bg-card/70 backdrop-blur p-6">
                <h2 className="text-2xl font-bold">{model.footerTitle}</h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">{model.footerBody}</p>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <a href={waLink(COMPANY.phoneE164, msg)} className="inline-flex w-full sm:w-auto">
                    <Button className="w-full sm:w-auto">{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</Button>
                  </a>
                  <a href={`tel:${COMPANY.phoneE164}`} className="inline-flex w-full sm:w-auto">
                    <Button variant="secondary" className="w-full sm:w-auto">
                      {lang === 'ar' ? 'اتصال' : 'Call'}
                    </Button>
                  </a>
                  <LocalizedLink href="/contact" className="inline-flex w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto">
                      {lang === 'ar' ? 'نموذج تواصل' : 'Contact'}
                    </Button>
                  </LocalizedLink>
                </div>

                <div className="mt-6">
                  <RelatedLinksHub signals={[lang === 'ar' ? 'مدن' : 'locations', cityName, lang === 'ar' ? 'خدمات' : 'services']} serviceSlug={service.slug} />
                </div>
              </div>

              <QuickRequestCard formName="quick_assessment" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CityServiceLanding({ params }: Props) {
  const [location, setLocation] = useLocation();
  const { language } = useLanguage();
  const city = params?.citySlug ? findCity(params.citySlug) : undefined;
  const service = params?.serviceSlug ? findServiceLanding(params.serviceSlug, city) : undefined;

  const localizedCitySlug = city ? getCitySlug(city, language) : '';
  const localizedServiceSlug = city && service ? getServiceSlug(service, language, city) : (service ? getServiceSlug(service, language) : '');

  useEffect(() => {
    if (!city || !service) return;
    const currentCity = params?.citySlug || '';
    const currentService = params?.serviceSlug || '';

    if (currentCity === localizedCitySlug && currentService === localizedServiceSlug) return;

    setLocation(`/locations/${localizedCitySlug}/${localizedServiceSlug}`, { replace: true });
  }, [city, service, params?.citySlug, params?.serviceSlug, localizedCitySlug, localizedServiceSlug]);

  // If this is one of the 3 core services, render the full model landing (applies to ALL cities).
  if (city && service && isModelServiceSlug(service.slug)) {
    return <ModelLanding lang={language} city={city} service={service} />;
  }

  // -----------------
  // Generic fallback (for non-modeled services)
  // -----------------
  const cityName = city ? (language === 'ar' ? city.ar : city.en) : (language === 'ar' ? 'المدينة' : 'City');
  const serviceName = service ? (language === 'ar' ? service.ar : service.en) : (language === 'ar' ? 'الخدمة' : 'Service');

  const title =
    language === 'ar'
      ? `${serviceName} في ${cityName} | شركة إطلاق المتميزة`
      : `${serviceName} in ${cityName} | Etlaq`;

  const description =
    language === 'ar'
      ? `حلول ${serviceName} في ${cityName} تشمل تقييم سريع، خطة تنفيذ منظمة، ومخرجات واضحة (تقارير/نتائج/توصيات) لتقليل المخاطر ودعم القرار.`
      : `${serviceName} in ${cityName} with a quick assessment, structured execution plan, and clear deliverables (results/recommendations) to reduce risk and support decisions.`;

  const canonicalPath = `${language === 'ar' ? '/ar' : '/en'}/locations/${localizedCitySlug}/${localizedServiceSlug}`;
  const canonical = absUrl(canonicalPath);
  const ogImage = OgImageForService(service?.slug);

  const faq = buildFaqFallback(language, serviceName, cityName);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    provider: buildLocalBusinessSchema({ url: getSiteUrl(), logoUrl: absUrl('/logo.png'), imageUrl: ogImage }),
    areaServed: city
      ? {
          '@type': 'City',
          name: cityName,
          address: { '@type': 'PostalAddress', addressLocality: cityName, addressCountry: 'SA' },
        }
      : { '@type': 'Country', name: 'Saudi Arabia' },
    serviceType: serviceName,
    url: canonical,
  };

  const localBusinessSchema = buildLocalBusinessSchema({ url: getSiteUrl(), logoUrl: absUrl('/logo.png'), imageUrl: ogImage });

  const breadcrumb = buildBreadcrumbList([
    { name: language === 'ar' ? 'الرئيسية' : 'Home', url: absUrl(`/${language}/`) },
    { name: language === 'ar' ? 'المدن' : 'Locations', url: absUrl(`/${language}/locations`) },
    { name: cityName, url: absUrl(`/${language}/locations/${localizedCitySlug}`) },
    { name: serviceName, url: canonical },
  ]);

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema, serviceSchema, faqSchema, breadcrumb],
  };

  const deliverables =
    language === 'ar'
      ? ['تقييم مبدئي للحالة وخطة خطوة تالية', 'تنفيذ ميداني منظم حسب نطاق المشكلة', 'مخرجات وتقرير مختصر يدعم القرار']
      : ['Initial assessment and next-step plan', 'Structured field execution per scope', 'Clear outputs and concise report'];

  const steps =
    language === 'ar'
      ? [
          { title: 'تجميع بيانات سريعة', desc: 'صور/موقع/تاريخ المشكلة + أي تقارير متاحة (جيولوجي/جيوتكنيك/جيوفيزيائي).' },
          { title: 'تحديد المسار الأنسب', desc: 'كشف/حقن/دراسة جيوفيزيائية حسب السبب والمخاطر.' },
          { title: 'تنفيذ منظم + تحقق', desc: 'تنفيذ على مراحل عند الحاجة مع معايير تحقق واضحة قدر الإمكان.' },
          { title: 'تسليم مخرجات واضحة', desc: 'نتائج + توصيات خطوة تالية، مع دعم فني عند الحاجة.' },
        ]
      : [
          { title: 'Collect quick inputs', desc: 'Photos/site context/history + available reports (geological/geotechnical/geophysical).' },
          { title: 'Choose the right route', desc: 'Detection/grouting/survey depending on cause and risk.' },
          { title: 'Execute + validate', desc: 'Phased execution when needed with clear validation criteria.' },
          { title: 'Deliver clear outputs', desc: 'Results + next-step recommendations with technical support.' },
        ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={buildLandingKeywords(language, city || null, service || null)}
        url={canonical}
        image={ogImage}
        schema={combinedSchema}
        alternateUrls={{
          ar: absUrl(`/ar/locations/${getCitySlug(city, 'ar')}/${getServiceSlug(service, 'ar', city)}`),
          en: absUrl(`/en/locations/${getCitySlug(city, 'en')}/${getServiceSlug(service, 'en', city)}`),
        }}
      />

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{cityName}</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{language === 'ar' ? 'خطة واضحة ومخرجات مفهومة' : 'Clear plan & deliverables'}</span>
              </span>
            </div>

            <Breadcrumbs
              items={[
                { name: language === 'ar' ? 'المدن' : 'Locations', href: '/locations' },
                { name: cityName, href: `/locations/${localizedCitySlug}` },
                { name: serviceName, href: canonical, isCurrent: true },
              ]}
            />

            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h1>
            <p className="text-muted-foreground leading-relaxed">{description}</p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <LocalizedLink href={`/request-service?city=${encodeURIComponent(cityName)}&service=${encodeURIComponent(service?.slug || '')}`} className="inline-flex">
                <Button className="w-full sm:w-auto">{language === 'ar' ? 'اطلب تقييم/عرض سعر' : 'Request assessment/quote'}</Button>
              </LocalizedLink>
              {service?.servicePageHref ? (
                <LocalizedLink href={service.servicePageHref} className="inline-flex">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {language === 'ar' ? 'تفاصيل الخدمة العامة' : 'Service overview'}
                  </Button>
                </LocalizedLink>
              ) : null}
            </div>
          </div>

          <div className="mt-10 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">{language === 'ar' ? 'ماذا تستلم؟' : 'What you receive'}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {language === 'ar'
                    ? 'مخرجات قابلة للتنفيذ تساعدك على اتخاذ قرار سريع وواثق.'
                    : 'Actionable deliverables that support fast, confident decisions.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary" />
                      <span className="leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">{language === 'ar' ? 'منهجية العمل' : 'How we work'}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {language === 'ar' ? 'تشخيص أدق ثم تنفيذ منظم ثم تسليم نتائج واضحة.' : 'Sharper diagnosis, structured execution, and clear results.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {steps.map((s) => (
                  <div key={s.title} className="rounded-xl border bg-card/60 backdrop-blur p-4">
                    <div className="flex items-start gap-2">
                      <ClipboardList className="h-4 w-4 mt-0.5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{s.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{language === 'ar' ? 'أسئلة شائعة' : 'FAQ'}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {language === 'ar'
                    ? 'إجابات مختصرة على الأسئلة المتكررة قبل طلب الخدمة.'
                    : 'Short answers to common questions before you request the service.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faq.map((f) => (
                  <div key={f.q} className="rounded-xl border bg-card/50 backdrop-blur p-4">
                    <p className="font-medium">{f.q}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">{f.a}</p>
                  </div>
                ))}
                <div className="pt-2">
                  <LocalizedLink href={`/locations/${localizedCitySlug}`} className="text-sm text-primary hover:underline">
                    {language === 'ar' ? `العودة لصفحة ${cityName}` : `Back to ${cityName}`}
                  </LocalizedLink>
                </div>
              </CardContent>
            </Card>
          </div>

          {city?.slug === 'riyadh' && listNeighborhoodsForCity(city).length > 0 && (
            <div className="mt-10 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{language === 'ar' ? 'أحياء نخدمها في الرياض' : 'Riyadh neighborhoods we cover'}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {language === 'ar'
                      ? 'روابط مباشرة لبحث محلي (طويل الذيل). هذه الصفحات مرتبطة داخلياً وتحتوي على أسئلة شائعة وروابط للخدمات الأخرى داخل نفس الحي.'
                      : 'Direct local long-tail links. These pages are internally linked and include FAQ + cross-links to other services in the same neighborhood.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {listNeighborhoodsForCity(city)
                      .slice(0, 24)
                      .map((n) => (
                        <LocalizedLink
                          key={n.slug}
                          href={`/locations/${localizedCitySlug}/${localizedServiceSlug}/${getNeighborhoodSlug(n, language === 'ar' ? 'ar' : 'en')}`}
                          className="block rounded-xl border bg-background p-4 hover:bg-accent transition"
                        >
                          <div className="font-medium">
                            {language === 'ar'
                              ? `${service?.slug === 'soil-grouting' ? 'حقن تربة' : serviceName} في ${n.ar}`
                              : `${serviceName} in ${n.en}`}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{language === 'ar' ? cityName : cityName}</div>
                        </LocalizedLink>
                      ))}
                  </div>

                  <div className="mt-4">
                    <LocalizedLink
                      href={`/locations/${localizedCitySlug}/${language === 'ar' ? 'احياء' : 'neighborhoods'}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {language === 'ar' ? 'عرض جميع صفحات أحياء الرياض' : 'View all Riyadh neighborhood pages'}
                    </LocalizedLink>
                  </div>

                  {listNeighborhoodsForCity(city).length > 24 && (
                    <p className="text-sm text-muted-foreground mt-4">
                      {language === 'ar'
                        ? 'ملاحظة: يمكن توسيع القائمة تدريجياً مع إضافة محتوى أكثر تفصيلاً لكل حي حسب طلبات العملاء.'
                        : 'Note: We can expand this list gradually with richer neighborhood-specific content based on real requests.'}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-10 grid lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl border bg-card/70 backdrop-blur p-6">
              <h2 className="text-2xl font-bold">{language === 'ar' ? 'طلب مختصر داخل المدينة' : 'Quick request in this city'}</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {language === 'ar'
                  ? 'أرسل تفاصيل مختصرة وسيتم الرد بخطوة تالية واضحة (تقييم/فحص/خطة تنفيذ).'
                  : 'Send short details and we’ll reply with clear next steps (assessment/inspection/plan).'}
              </p>

              <RelatedLinksHub
                signals={[serviceName, cityName, language === 'ar' ? 'حقن' : 'grouting', language === 'ar' ? 'فراغات' : 'voids']}
                serviceSlug={service?.slug}
              />
            </div>

            <QuickRequestCard formName="quick_assessment" />
          </div>
        </div>
      </section>
    </>
  );
}
