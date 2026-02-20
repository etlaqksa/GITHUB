import { useEffect, useMemo } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import LocalizedLink from '@/components/LocalizedLink';
import AutoLinkedText from '@/components/AutoLinkedText';

import { absUrl, getSiteUrl } from '@/lib/siteUrl';
import { OgImageForService } from '@/lib/og';
import { buildLandingKeywords } from '@/lib/seoKeywords';
import { buildLocalBusinessSchema } from '@/lib/companyProfile';
import { buildBreadcrumbList } from '@/lib/schemaHelpers';

import { findCity, findServiceLanding, getCitySlug, getServiceSlug } from '@/data/seoLocations';
import { buildCityServiceModel } from '@/data/cityServiceModels';
import { findNeighborhoodBySlugParam, getNeighborhoodSlug, listNeighborhoodsForCity } from '@/data/neighborhoods';

import { MapPin, ShieldCheck, PhoneCall, ArrowLeft } from 'lucide-react';

function hashString(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(arr: T[], seed: number) {
  if (!arr.length) return undefined;
  return arr[seed % arr.length];
}

export default function CityServiceNeighborhoodLanding() {
  const { language } = useLanguage();
  const [location, setLocation] = useLocation();
  const lang = language;

  const [, params] = useRoute<{ citySlug: string; serviceSlug: string; hoodSlug: string }>(
    '/locations/:citySlug/:serviceSlug/:hoodSlug'
  );

  const city = useMemo(() => findCity(params?.citySlug || ''), [params?.citySlug]);
  const service = useMemo(() => findServiceLanding(params?.serviceSlug || '', city || undefined), [params?.serviceSlug, city]);

  const neighborhood = useMemo(() => findNeighborhoodBySlugParam(city || undefined, params?.hoodSlug || ''), [city, params?.hoodSlug]);

  const cityName = lang === 'ar' ? city?.ar : city?.en;
  const hoodName = lang === 'ar' ? neighborhood?.ar : neighborhood?.en;

  const localizedCitySlug = city ? getCitySlug(city, lang) : (params?.citySlug || '');
  const localizedServiceSlug = service && city ? getServiceSlug(service, lang, city) : (params?.serviceSlug || '');
  const localizedHoodSlug = neighborhood ? getNeighborhoodSlug(neighborhood, lang) : (params?.hoodSlug || '');


  useEffect(() => {
    if (!city || !service || !neighborhood) return;
    const currentCity = params?.citySlug || '';
    const currentService = params?.serviceSlug || '';
    const currentHood = params?.hoodSlug || '';

    if (currentCity === localizedCitySlug && currentService === localizedServiceSlug && currentHood === localizedHoodSlug) return;

    setLocation(`/locations/${localizedCitySlug}/${localizedServiceSlug}/${localizedHoodSlug}`, { replace: true });
  }, [city, service, neighborhood, params?.citySlug, params?.serviceSlug, params?.hoodSlug, localizedCitySlug, localizedServiceSlug, localizedHoodSlug]);

  const canonicalPath = `${lang === 'ar' ? '/ar' : '/en'}/locations/${localizedCitySlug}/${localizedServiceSlug}/${localizedHoodSlug}`;
  const canonical = absUrl(canonicalPath);

  const model = useMemo(() => {
    if (!city || !service) return null;
    return buildCityServiceModel({ lang, city, service });
  }, [city, service, lang]);

  const ogImage = useMemo(() => (service ? OgImageForService(service.slug) : absUrl('/favicon.webp')), [service]);

  const seed = useMemo(() => hashString(`${lang}:${localizedCitySlug}:${localizedServiceSlug}:${localizedHoodSlug}`), [
    lang,
    localizedCitySlug,
    localizedServiceSlug,
    localizedHoodSlug,
  ]);

  const title = useMemo(() => {
    if (!city || !service || !neighborhood) return '';
    if (lang === 'ar') {
      // Exact-match pattern for local long-tail searches
      const base =
        service.slug === 'soil-grouting'
          ? `حقن تربة في ${neighborhood.ar} في ${city.ar}`
          : `${service.ar} في ${neighborhood.ar} في ${city.ar}`;
      return `${base} | شركة إطلاق المتميزة`;
    }
    const base = `${service.en} in ${neighborhood.en}, ${city.en}`;
    return `${base} | ETLAQ`;
  }, [city, service, neighborhood, lang]);

  const description = useMemo(() => {
    if (!city || !service || !neighborhood) return '';
    if (lang === 'ar') {
      return `صفحة محلية لخدمة ${service.ar} في ${neighborhood.ar} في ${city.ar}. معاينة هندسية، خطة تنفيذ واضحة، ومخرجات تشمل الفحوصات والتوثيق والتقرير النهائي.`;
    }
    return `Local landing page for ${service.en} in ${neighborhood.en}, ${city.en}. Site visit, clear execution plan, QA/QC, and final reporting.`;
  }, [city, service, neighborhood, lang]);

  const h1 = useMemo(() => {
    if (!city || !service || !neighborhood) return '';
    if (lang === 'ar') {
      return service.slug === 'soil-grouting'
        ? `حقن تربة في ${neighborhood.ar} في ${city.ar}`
        : `${service.ar} في ${neighborhood.ar} في ${city.ar}`;
    }
    return `${service.en} in ${neighborhood.en}, ${city.en}`;
  }, [city, service, neighborhood, lang]);

  const intro = useMemo(() => {
    if (!city || !service || !neighborhood) return '';
    const arIntros = [
      `نخدم ${neighborhood.ar} ضمن نطاق ${city.ar} بخدمة ${service.ar} بمخرجات واضحة وخطة عمل واقعية تناسب الموقع.`,
      `إذا كانت لديك تشققات، هبوطات، أو اشتباه في فراغات تحت المبنى في ${neighborhood.ar}، نوفّر ${service.ar} مع توثيق كامل وQA/QC.`,
      `صفحة محلية مخصصة لـ ${service.ar} في ${neighborhood.ar} في ${city.ar} — الهدف: تسهيل الوصول لخدمة صحيحة وتنفيذ منضبط بدون فوضى بالموقع.`,
    ];
    const enIntros = [
      `We serve ${neighborhood.en} in ${city.en} with ${service.en} and clear, documented deliverables.`,
      `If you're seeing cracks, settlement, or suspect subsurface voids in ${neighborhood.en}, we can assess and execute ${service.en} with QA/QC and reporting.`,
      `A dedicated local page for ${service.en} in ${neighborhood.en}, ${city.en} — designed for fast discovery and clear next steps.`,
    ];
    return lang === 'ar' ? (pick(arIntros, seed) as string) : (pick(enIntros, seed) as string);
  }, [city, service, neighborhood, lang, seed]);

  const extraNotes = useMemo(() => {
    if (!city || !service || !neighborhood) return [] as string[];
    const ar = [
      `ننسّق موعد معاينة أولية للموقع في ${neighborhood.ar} لتحديد سبب المشكلة (هبوط/تسرب/فراغات/تباين طبقات).`,
      `التنفيذ يتم وفق مواصفات حقن مرحلي عند الحاجة، مع مراقبة الاستهلاك والضغوط لتفادي رفع العناصر الإنشائية.`,
      `نقدّم بدائل واقعية: حقن أسمنتي/مواد منخفضة اللزوجة/تدعيم موضعي حسب الحالة، مع تقرير نهائي قابل للاعتماد.`,
    ];
    const en = [
      `We can schedule a site visit in ${neighborhood.en} to identify the root cause (settlement, leakage, voids, stratification).`,
      `Execution follows staged injection when needed, monitoring volumes and pressures to avoid uplift or distress.`,
      `We propose the right method (cementitious / low-viscosity / targeted remediation) and deliver a final engineer-ready report.`,
    ];
    const list = lang === 'ar' ? ar : en;
    // rotate for uniqueness
    return [list[seed % list.length], list[(seed + 1) % list.length]];
  }, [city, service, neighborhood, lang, seed]);

  const faq = useMemo(() => {
    if (!model || !city || !service || !neighborhood) return [] as { q: string; a: string }[];
    const arLocal = [
      { q: `هل تقدمون خدمة ${service.ar} في ${neighborhood.ar}؟`, a: `نعم. نخدم ${neighborhood.ar} ضمن نطاق ${city.ar}، ونحدد آلية التنفيذ بعد معاينة الموقع وقراءة المعطيات.` },
      { q: `كم تستغرق الأعمال عادة في ${neighborhood.ar}؟`, a: `المدة تعتمد على سبب المشكلة وحجم المنطقة وعدد نقاط التنفيذ. بعد المعاينة نقدم خطة زمنية واضحة ومراحل تنفيذ.` },
    ];
    const enLocal = [
      { q: `Do you provide ${service.en} in ${neighborhood.en}?`, a: `Yes. We cover ${neighborhood.en} in ${city.en}. The exact method and scope are defined after a site assessment.` },
      { q: `How long does the work usually take in ${neighborhood.en}?`, a: `It depends on the root cause, the affected area, and the number of points. After assessment we share a clear schedule and stages.` },
    ];
    const base = (Array.isArray(model.faq) ? model.faq : []).slice(0, 6);
      return lang === 'ar' ? [...arLocal, ...base] : [...enLocal, ...base];
  }, [model, city, service, neighborhood, lang]);

  const related = useMemo(() => {
    if (!city || !service || !neighborhood) return [] as { label: string; href: string }[];

    const list = listNeighborhoodsForCity(city).slice(0, 10);
    const others = list.filter((n) => n.arSlug !== neighborhood.arSlug && n.slug !== neighborhood.slug).slice(0, 6);

    const links: { label: string; href: string }[] = [];

    // Main city/service landing
    links.push({
      label: lang === 'ar' ? `الصفحة الرئيسية لخدمة ${service.ar} في ${city.ar}` : `Main ${service.en} page in ${city.en}`,
      href: `/locations/${localizedCitySlug}/${localizedServiceSlug}`,
    });

    // City landing
    links.push({
      label: lang === 'ar' ? `كل خدماتنا في ${city.ar}` : `All services in ${city.en}`,
      href: `/locations/${localizedCitySlug}`,
    });

    // Other services in the same neighborhood
    // (fast cross-links for users; avoids orphan patterns)
    const otherServices = ['soil-grouting', 'void-detection', 'geophysical-surveys']
      .map((slug) => findServiceLanding(slug, city))
      .filter(Boolean) as any[];

    for (const s of otherServices) {
      if (s.slug === service.slug) continue;
      links.push({
        label:
          lang === 'ar'
            ? `${s.ar} في ${hoodName} في ${city.ar}`
            : `${s.en} in ${hoodName}, ${city.en}`,
        href: `/locations/${localizedCitySlug}/${getServiceSlug(s, lang, city)}/${localizedHoodSlug}`,
      });
    }

    // Nearby neighborhoods (sample)
    for (const n of others) {
      links.push({
        label:
          lang === 'ar'
            ? `${service.slug === 'soil-grouting' ? 'حقن تربة' : service.ar} في ${n.ar} في ${city.ar}`
            : `${service.en} in ${n.en}, ${city.en}`,
        href: `/locations/${localizedCitySlug}/${localizedServiceSlug}/${getNeighborhoodSlug(n, lang)}`,
      });
    }

    return links.slice(0, 12);
  }, [city, service, neighborhood, lang, localizedCitySlug, localizedServiceSlug, localizedHoodSlug, hoodName]);

  const schema = useMemo(() => {
    if (!city || !service || !neighborhood) return undefined;

    const cityLabel = lang === 'ar' ? city.ar : city.en;
    const localBusiness = buildLocalBusinessSchema({ url: getSiteUrl(), logoUrl: absUrl('/logo.webp'), imageUrl: ogImage });

    const serviceSchema = {
      '@type': 'Service',
      name: title,
      description,
      provider: localBusiness,
      areaServed: {
        '@type': 'City',
        name: cityLabel,
        address: { '@type': 'PostalAddress', addressLocality: cityLabel, addressCountry: 'SA' },
      },
      serviceType: lang === 'ar' ? service.ar : service.en,
      url: canonical,
    };

    const breadcrumb = buildBreadcrumbList([
      { name: lang === 'ar' ? 'الرئيسية' : 'Home', url: absUrl(`/${lang}/`) },
      { name: lang === 'ar' ? 'المدن' : 'Locations', url: absUrl(`/${lang}/locations`) },
      { name: cityLabel, url: absUrl(`/${lang}/locations/${localizedCitySlug}`) },
      { name: lang === 'ar' ? (service.slug === 'soil-grouting' ? `حقن تربة في ${city.ar}` : `${service.ar} في ${city.ar}`) : `${service.en} in ${city.en}`, url: absUrl(`/${lang}/locations/${localizedCitySlug}/${localizedServiceSlug}`) },
      { name: h1, url: canonical },
    ]);

    const faqSchema = {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };

    return { '@context': 'https://schema.org', '@graph': [localBusiness, serviceSchema, faqSchema, breadcrumb] };
  }, [city, service, neighborhood, lang, title, description, canonical, ogImage, localizedCitySlug, localizedServiceSlug, h1, faq]);

  if (!city || !service || !neighborhood || !model) {
    return (
      <section className="py-14">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold">{lang === 'ar' ? 'الصفحة غير متاحة' : 'Page not found'}</h1>
          <p className="mt-2 text-muted-foreground">
            {lang === 'ar' ? 'تأكد من الرابط ثم حاول مرة أخرى.' : 'Please check the URL and try again.'}
          </p>
          <div className="mt-6">
            <LocalizedLink href="/locations">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 me-2 rtl:rotate-180" />
                {lang === 'ar' ? 'العودة للمدن' : 'Back to locations'}
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>
    );
  }

  const msg =
    lang === 'ar'
      ? `السلام عليكم، أريد طلب ${service.ar} في ${neighborhood.ar} في ${city.ar}. ممكن معاينة/تقييم مبدئي؟`
      : `Hello, I'd like to request ${service.en} in ${neighborhood.en}, ${city.en}. Can we arrange a quick assessment?`;

  // Defensive defaults (older bundles may cache and hit this page while models evolve)
  const whenBullets = Array.isArray((model as any).whenBullets) ? (model as any).whenBullets : [];
  const processSteps = Array.isArray((model as any).processSteps) ? (model as any).processSteps : [];

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={`${buildLandingKeywords(lang, city, service)}, ${h1}, ${hoodName || ''}`}
        url={canonical}
        image={ogImage}
        schema={schema}
        alternateUrls={{
          ar: absUrl(`/ar/locations/${getCitySlug(city, 'ar')}/${getServiceSlug(service, 'ar', city)}/${getNeighborhoodSlug(neighborhood, 'ar')}`),
          en: absUrl(`/en/locations/${getCitySlug(city, 'en')}/${getServiceSlug(service, 'en', city)}/${getNeighborhoodSlug(neighborhood, 'en')}`),
        }}
      />

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="w-full space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{cityName}</span>
              </Badge>
              <Badge variant="outline" className="gap-2">
                <span>{hoodName}</span>
              </Badge>
              <Badge variant="outline" className="gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>{lang === 'ar' ? 'توثيق ومخرجات واضحة' : 'Clear deliverables'}</span>
              </Badge>
            </div>

            <Breadcrumbs
              items={[
                { name: lang === 'ar' ? 'المدن' : 'Locations', href: '/locations' },
                { name: cityName || '', href: `/locations/${localizedCitySlug}` },
                { name: lang === 'ar' ? (service.slug === 'soil-grouting' ? `حقن تربة في ${city.ar}` : `${service.ar} في ${city.ar}`) : `${service.en} in ${city.en}`, href: `/locations/${localizedCitySlug}/${localizedServiceSlug}` },
                { name: h1, href: canonical, isCurrent: true },
              ]}
            />

            <div className="etlaq-card rounded-2xl border bg-card/60 backdrop-blur p-6 md:p-8 shadow-sm">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{h1}</h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                <AutoLinkedText text={intro} />
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                {extraNotes.map((t, idx) => (
                  <p key={idx}>
                    <AutoLinkedText text={t} />
                  </p>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/966534145922?text=${encodeURIComponent(msg)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="w-full sm:w-auto">{lang === 'ar' ? 'تواصل واتساب' : 'WhatsApp'}</Button>
                </a>
                <LocalizedLink href="/request-service">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <PhoneCall className="h-4 w-4 me-2" />
                    {lang === 'ar' ? 'طلب خدمة / معاينة' : 'Request service'}
                  </Button>
                </LocalizedLink>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="etlaq-card rounded-2xl border bg-card/60 backdrop-blur p-6 shadow-sm">
                <h2 className="text-xl font-semibold">{lang === 'ar' ? 'متى تحتاج هذه الخدمة؟' : 'When do you need this?'}</h2>
                <ul className="mt-4 space-y-2 text-muted-foreground list-disc ps-5">
                  {whenBullets.slice(0, 6).map((u) => (
                    <li key={u}>
                      <AutoLinkedText text={u} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="etlaq-card rounded-2xl border bg-card/60 backdrop-blur p-6 shadow-sm">
                <h2 className="text-xl font-semibold">{lang === 'ar' ? 'خطوات العمل المختصرة' : 'Quick process'}</h2>
                <ol className="mt-4 space-y-2 text-muted-foreground list-decimal ps-5">
                  {processSteps.slice(0, 6).map((p) => (
                    <li key={p.title}>
                      <AutoLinkedText text={p.title} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="etlaq-card rounded-2xl border bg-card/60 backdrop-blur p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold">{lang === 'ar' ? 'أسئلة شائعة' : 'FAQ'}</h2>
              <div className="mt-4">
                <Accordion type="single" collapsible>
                  {faq.map((f, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`}>
                      <AccordionTrigger>{f.q}</AccordionTrigger>
                      <AccordionContent>{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="etlaq-card rounded-2xl border bg-card/60 backdrop-blur p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold">{lang === 'ar' ? 'روابط ذات صلة' : 'Related links'}</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <LocalizedLink key={r.href} href={r.href} className="block rounded-xl border bg-background p-4 hover:bg-accent transition">
                    <div className="font-medium">{r.label}</div>
                    <div className="text-sm text-muted-foreground mt-1">{r.href}</div>
                  </LocalizedLink>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
