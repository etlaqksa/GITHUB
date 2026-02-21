import { SEO } from '@/components/SEO';
import LocalizedLink from '@/components/LocalizedLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { findCity, getCitySlug, getServiceSlug, serviceLandings } from '@/data/seoLocations';
import { getNeighborhoodSlug, listNeighborhoodsForCity } from '@/data/neighborhoods';
import { absUrl } from '@/lib/siteUrl';
import { IconLocation } from '@/components/icons/etlaq';

type Props = {
  params: {
    citySlug?: string;
  };
};

export default function CityNeighborhoods({ params }: Props) {
  const { language } = useLanguage();
  const city = params?.citySlug ? findCity(params.citySlug) : undefined;
  const citySlug = city ? getCitySlug(city, language) : (params?.citySlug || '');
  const cityName = city ? (language === 'ar' ? city.ar : city.en) : (language === 'ar' ? 'المدينة' : 'City');

  const neighborhoods = listNeighborhoodsForCity(city);

  const title =
    language === 'ar'
      ? `أحياء ${cityName} | شركة إطلاق المتميزة`
      : `${cityName} neighborhoods | Etlaq`;

  const description =
    language === 'ar'
      ? `صفحات مخصصة حسب الأحياء لخدماتنا في ${cityName} (حقن التربة، كشف التكهفات، الدراسات الجيوفيزيائية). اختر الحي للوصول للصفحة الأنسب بسرعة.`
      : `Neighborhood-based pages for our services in ${cityName} (soil grouting, cavity detection, geophysical surveys). Pick a neighborhood to reach the most relevant page quickly.`;

  const canonical = absUrl(`/${language}/locations/${citySlug}/${language === 'ar' ? 'احياء' : 'neighborhoods'}`);

  // Avoid indexing empty hubs (prevents thin content for cities without neighborhood lists yet)
  const noIndex = !city || neighborhoods.length === 0;

  return (
    <>
      <SEO title={title} description={description} url={canonical} noIndex={noIndex} />

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-2 text-sm">
              <IconLocation tone="mono" className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">{language === 'ar' ? 'تصفح حسب الحي' : 'Browse by neighborhood'}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold">{language === 'ar' ? `أحياء ${cityName}` : `${cityName} neighborhoods`}</h1>
            <p className="text-muted-foreground leading-relaxed">{description}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <LocalizedLink href={`/locations/${citySlug}`} className="inline-flex">
                <Button variant="secondary" className="w-full sm:w-auto">
                  {language === 'ar' ? `عودة لصفحة ${cityName}` : `Back to ${cityName}`}
                </Button>
              </LocalizedLink>
              <LocalizedLink href="/request-service" className="inline-flex">
                <Button className="w-full sm:w-auto">{language === 'ar' ? 'اطلب تقييم' : 'Request an assessment'}</Button>
              </LocalizedLink>
            </div>
          </div>

          {!city || neighborhoods.length === 0 ? (
            <div className="mt-10 max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'غير متاح حالياً' : 'Not available yet'}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {language === 'ar'
                      ? 'سيتم إضافة صفحات الأحياء تدريجياً للمدن حسب الطلب الفعلي. يمكن تصفح صفحة المدينة وخدماتها الآن.'
                      : 'Neighborhood pages will be added gradually per real demand. You can browse the city and service pages for now.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LocalizedLink href={`/locations/${citySlug}`} className="text-primary hover:underline">
                    {language === 'ar' ? 'افتح صفحة المدينة' : 'Open the city page'}
                  </LocalizedLink>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="mt-10 space-y-6">
              {serviceLandings.map((s) => {
                const serviceSlug = getServiceSlug(s, language, city);
                const serviceName = language === 'ar' ? s.ar : s.en;
                return (
                  <Card key={s.slug}>
                    <CardHeader>
                      <CardTitle className="text-xl">{language === 'ar' ? `صفحات ${serviceName} حسب الحي` : `${serviceName} by neighborhood`}</CardTitle>
                      <CardDescription className="leading-relaxed">
                        {language === 'ar'
                          ? 'اختَر الحي لفتح صفحة محلية تحتوي على ملخص الخدمة وأسئلة شائعة وروابط للخدمات الأخرى داخل نفس الحي.'
                          : 'Pick a neighborhood to open a local page with a service summary, FAQ, and cross-links to other services in the same area.'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {neighborhoods.map((n) => (
                          <LocalizedLink
                            key={`${s.slug}-${n.slug}`}
                            href={`/locations/${citySlug}/${serviceSlug}/${getNeighborhoodSlug(n, language === 'ar' ? 'ar' : 'en')}`}
                            className="block rounded-xl border bg-background p-4 hover:bg-accent transition"
                          >
                            <div className="font-medium">
                              {language === 'ar'
                                ? `${s.slug === 'soil-grouting' ? 'حقن تربة' : serviceName} في ${n.ar}`
                                : `${serviceName} in ${n.en}`}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">{cityName}</div>
                          </LocalizedLink>
                        ))}
                      </div>

                      <div className="pt-4">
                        <LocalizedLink href={`/locations/${citySlug}/${serviceSlug}`} className="text-sm text-primary hover:underline">
                          {language === 'ar' ? `صفحة ${serviceName} في ${cityName}` : `${serviceName} page in ${cityName}`}
                        </LocalizedLink>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
