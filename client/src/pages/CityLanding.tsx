import { SEO } from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { findCity, serviceLandings, getCitySlug, getServiceSlug } from '@/data/seoLocations';
import { getNeighborhoodSlug, listNeighborhoodsForCity } from '@/data/neighborhoods';
import { buildLandingKeywords } from '@/lib/seoKeywords';
import { absUrl } from '@/lib/siteUrl';
import { MapPin, ArrowRight } from 'lucide-react';
import AutoLinkedText from '@/components/AutoLinkedText';

type Props = {
  params: {
    citySlug?: string;
  };
};

export default function CityLanding({ params }: Props) {
  const { language } = useLanguage();
  const city = params?.citySlug ? findCity(params.citySlug) : undefined;
  const citySlug = city ? getCitySlug(city, language) : (params?.citySlug || '');

  const cityName = city ? (language === 'ar' ? city.ar : city.en) : (language === 'ar' ? 'المدينة' : 'City');

  const title =
    language === 'ar'
      ? `خدمات حقن التربة وكشف التكهفات في ${cityName} | شركة إطلاق المتميزة`
      : `Soil Grouting & Cavity Detection in ${cityName} | Etlaq`;

  const description =
    language === 'ar'
      ? `نقدم خدمات حقن التربة (حقن أسمنتي) وكشف الفراغات/التكهفات والدراسات الجيوفيزيائية في ${cityName}. اطلب تقييم سريع وخطة خطوة تالية واضحة.`
      : `We provide soil grouting (cement injection), void/cavity detection and geophysical surveys in ${cityName}. Request a quick assessment and clear next steps.`;

  const canonical = absUrl(`${language === 'ar' ? '/ar' : '/en'}/locations/${citySlug}`);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url: canonical,
    inLanguage: language === 'ar' ? 'ar-SA' : 'en-US',
    about: serviceLandings.map((s) => ({ '@type': 'Service', name: language === 'ar' ? s.ar : s.en })),
    contentLocation: city
      ? {
          '@type': 'City',
          name: cityName,
          address: {
            '@type': 'PostalAddress',
            addressLocality: cityName,
            addressCountry: 'SA',
          },
        }
      : undefined,
  };

  return (
    <>
      <SEO title={title} description={description} keywords={buildLandingKeywords(language, city || null, null)} url={canonical} schema={schema} />

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">{language === 'ar' ? 'التغطية داخل المملكة' : 'Coverage in KSA'}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">
              {language === 'ar' ? `خدماتنا في ${cityName}` : `Our services in ${cityName}`}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              <AutoLinkedText text={description} />
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <LocalizedLink href={`/request-service?city=${encodeURIComponent(cityName)}`} className="inline-flex">
              <Button className="w-full sm:w-auto">
                {language === 'ar' ? 'اطلب تقييم سريع' : 'Request a quick assessment'}
              </Button>
            </LocalizedLink>
            <LocalizedLink href="/contact" className="inline-flex">
              <Button variant="secondary" className="w-full sm:w-auto">
                {language === 'ar' ? 'تواصل معنا' : 'Contact us'}
              </Button>
            </LocalizedLink>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {serviceLandings.map((s) => (
              <Card key={s.slug} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{language === 'ar' ? s.ar : s.en}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    <AutoLinkedText
                      text={
                        language === 'ar'
                          ? `حلول مناسبة للحالة داخل ${cityName} مع مخرجات واضحة وخطة خطوة تالية.`
                          : `Fit-for-case solutions in ${cityName} with clear deliverables and next steps.`
                      }
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'ar'
                      ? `تشمل كلمات مرتبطة: ${s.arSynonyms.slice(0, 3).join('، ')}.`
                      : `Related terms: ${s.enSynonyms.slice(0, 3).join(', ')}.`}
                  </div>
                  {(() => {
                    const serviceSlug = getServiceSlug(s, language, city);
                    return (
                      <LocalizedLink href={`/locations/${citySlug}/${serviceSlug}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                        {language === 'ar' ? 'عرض تفاصيل الخدمة' : 'View service details'}
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                      </LocalizedLink>
                    );
                  })()}
                </CardContent>
              </Card>
            ))}
          </div>

          {city?.slug === 'riyadh' && listNeighborhoodsForCity(city).length > 0 && (
            <div className="mt-12 w-full">
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="text-xl">{language === 'ar' ? 'أحياء الرياض' : 'Riyadh neighborhoods'}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {language === 'ar'
                      ? 'روابط مباشرة لصفحات الأحياء لمساعدتك في الوصول بسرعة إلى الخدمة المناسبة داخل الحي.'
                      : 'Direct neighborhood pages to help you quickly reach the right service for your area.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const soil = serviceLandings.find((s) => s.slug === 'soil-grouting') || serviceLandings[0];
                    const soilSlug = getServiceSlug(soil, language, city);
                    return (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {listNeighborhoodsForCity(city)
                          .slice(0, 28)
                          .map((n) => (
                            <LocalizedLink
                              key={n.slug}
                              href={`/locations/${citySlug}/${soilSlug}/${getNeighborhoodSlug(n, language === 'ar' ? 'ar' : 'en')}`}
                              className="block rounded-xl border bg-background p-4 hover:bg-accent transition"
                            >
                              <div className="font-medium">
                                {language === 'ar' ? `حقن تربة في ${n.ar}` : `Soil grouting in ${n.en}`}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">{cityName}</div>
                            </LocalizedLink>
                          ))}
                      </div>
                    );
                  })()}

                  <div className="mt-4">
                    <LocalizedLink
                      href={`/locations/${citySlug}/${language === 'ar' ? 'احياء' : 'neighborhoods'}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {language === 'ar' ? 'عرض جميع صفحات أحياء الرياض' : 'View all Riyadh neighborhood pages'}
                    </LocalizedLink>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
