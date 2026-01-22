import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { findCity, findServiceLanding } from '@/data/seoLocations';
import { buildLandingKeywords } from '@/lib/seoKeywords';
import { absUrl, getSiteUrl } from '@/lib/siteUrl';
import { CheckCircle2, ClipboardList, MapPin, ShieldCheck } from 'lucide-react';

type Props = {
  params: {
    citySlug?: string;
    serviceSlug?: string;
  };
};

function buildFaq(lang: 'ar' | 'en', serviceName: string, cityName: string) {
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

export default function CityServiceLanding({ params }: Props) {
  const { language } = useLanguage();
  const city = params?.citySlug ? findCity(params.citySlug) : undefined;
  const service = params?.serviceSlug ? findServiceLanding(params.serviceSlug) : undefined;

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

  const canonicalPath = `${language === 'ar' ? '/ar' : '/en'}/locations/${city?.slug || ''}/${service?.slug || ''}`;
  const canonical = absUrl(canonicalPath);

  const faq = buildFaq(language, serviceName, cityName);
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
    provider: {
      '@type': 'LocalBusiness',
      name: language === 'ar' ? 'شركة إطلاق المتميزة المحدودة' : 'Etlaq Distinguished Company',
      url: getSiteUrl(),
    },
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

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [serviceSchema, faqSchema],
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
        schema={combinedSchema}
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
                  {language === 'ar'
                    ? 'تشخيص أدق ثم تنفيذ منظم ثم تسليم نتائج واضحة.'
                    : 'Sharper diagnosis, structured execution, and clear results.'}
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
                  <LocalizedLink href={`/locations/${city?.slug || ''}`} className="text-sm text-primary hover:underline">
                    {language === 'ar' ? `العودة لصفحة ${cityName}` : `Back to ${cityName}`}
                  </LocalizedLink>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
