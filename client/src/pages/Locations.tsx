import { SEO } from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { cities, serviceLandings, getCitySlug, getServiceSlug } from '@/data/seoLocations';
import { buildSiteKeywords } from '@/lib/seoKeywords';
import { absUrl } from '@/lib/siteUrl';
import InteractiveMap from '@/components/InteractiveMap';

export default function Locations() {
  const { language } = useLanguage();

  const title = language === 'ar' ? 'مدن التغطية | شركة إطلاق المتميزة' : 'Coverage Cities | Etlaq';
  const description =
    language === 'ar'
      ? 'نخدم أغلب مدن المملكة في حقن التربة، كشف الفراغات/التكهفات، والدراسات الجيوفيزيائية. اختر مدينتك للخدمات المتاحة وروابط سريعة لطلب الخدمة.'
      : 'We cover major cities across Saudi Arabia for soil grouting, void/cavity detection, and geophysical surveys. Select a city to view services and request a quote.';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    url: absUrl(language === 'ar' ? '/ar/locations' : '/en/locations'),
    inLanguage: language === 'ar' ? 'ar-SA' : 'en-US',
    about: serviceLandings.map((s) => ({ '@type': 'Service', name: language === 'ar' ? s.ar : s.en })),
  };

  return (
    <>
      <SEO title={title} description={description} keywords={buildSiteKeywords(language)} schema={schema} />

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-bold">{language === 'ar' ? 'مدن التغطية داخل المملكة' : 'Coverage cities in Saudi Arabia'}</h1>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <InteractiveMap />
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {cities.map((c) => {
              const citySlug = getCitySlug(c, language);
              return (
                <Card key={c.slug} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{language === 'ar' ? c.ar : c.en}</CardTitle>
                  <CardDescription>
                    {language === 'ar'
                      ? 'روابط سريعة للخدمات الشائعة في هذه المدينة'
                      : 'Quick links for common services in this city'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {serviceLandings.slice(0, 3).map((s) => {
                    const serviceSlug = getServiceSlug(s, language, c);
                    return (
                    <LocalizedLink
                      key={`${c.slug}-${s.slug}`}
                      href={`/locations/${citySlug}/${serviceSlug}`}
                      className="block text-sm text-primary hover:underline"
                    >
                      {language === 'ar' ? s.ar : s.en}
                    </LocalizedLink>
                    );
                  })}

                  <div className="pt-3">
                    <LocalizedLink href={`/locations/${citySlug}`} className="text-sm font-medium hover:underline">
                      {language === 'ar' ? 'عرض كل التفاصيل' : 'View details'}
                    </LocalizedLink>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
