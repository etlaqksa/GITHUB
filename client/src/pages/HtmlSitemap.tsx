import { SEO } from '@/components/SEO';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { cities, serviceLandings, getCitySlug, getServiceSlug } from '@/data/seoLocations';
import { listNeighborhoodsForCity, getNeighborhoodSlug } from '@/data/neighborhoods';
import { articles as ARTICLES } from '@/data/articles';
import { getArticleUrlSlug } from '@/lib/articleUrl';
import { absUrl } from '@/lib/siteUrl';

export default function HtmlSitemap() {
  const { language } = useLanguage();

  const title = language === 'ar' ? 'خريطة الموقع | شركة إطلاق المتميزة' : 'Site Map | ETLAQ';
  const description =
    language === 'ar'
      ? 'خريطة الموقع لتسهيل الوصول إلى أهم الصفحات: الخدمات، المدن، الأحياء، والمدونة.'
      : 'A simple site map to help you reach key pages: services, cities, neighborhoods, and the blog.';

  const canonical = absUrl(`/${language}/sitemap`);

  const coreLinks = [
    { ar: 'الرئيسية', en: 'Home', href: '/' },
    { ar: 'من نحن', en: 'About', href: '/about' },
    { ar: 'خدماتنا', en: 'Services', href: '/services' },
    { ar: 'مشاريعنا', en: 'Projects', href: '/projects' },
    { ar: 'دراسات حالة', en: 'Case studies', href: '/case-studies' },
    { ar: 'المعرض', en: 'Gallery', href: '/gallery' },
    { ar: 'المدونة', en: 'Blog', href: '/blog' },
    { ar: 'الأسئلة الشائعة', en: 'FAQ', href: '/faq' },
    { ar: 'اتصل بنا', en: 'Contact', href: '/contact' },
    { ar: 'طلب خدمة', en: 'Request service', href: '/request-service' },
    { ar: 'مدن التغطية', en: 'Locations', href: '/locations' },
    { ar: 'الشروط والأحكام', en: 'Terms & Conditions', href: '/terms' },
    { ar: 'سياسة الخصوصية', en: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <>
      <SEO title={title} description={description} url={canonical} />

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold">{language === 'ar' ? 'خريطة الموقع' : 'HTML Sitemap'}</h1>
            <p className="text-muted-foreground mt-3 leading-relaxed">{description}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {language === 'ar'
                ? 'ملف خريطة الموقع بصيغة XML: '
                : 'XML sitemap file: '}
              <a className="text-primary hover:underline" href="/sitemap.xml">
                sitemap.xml
              </a>
            </p>

            <div className="mt-8 grid gap-8">
              <div className="rounded-2xl border bg-card/60 backdrop-blur p-6">
                <h2 className="text-xl font-semibold">{language === 'ar' ? 'روابط أساسية' : 'Core pages'}</h2>
                <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {coreLinks.map((l) => (
                    <li key={l.href}>
                      <LocalizedLink className="text-primary hover:underline" href={l.href}>
                        {language === 'ar' ? l.ar : l.en}
                      </LocalizedLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border bg-card/60 backdrop-blur p-6">
                <h2 className="text-xl font-semibold">{language === 'ar' ? 'صفحات المدن والخدمات' : 'Cities & services'}</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {language === 'ar'
                    ? 'روابط مباشرة لكل مدينة وخدماتها الأساسية.'
                    : 'Direct links for each city and its core services.'}
                </p>

                <div className="mt-5 space-y-6">
                  {cities.map((c) => {
                    const citySlug = getCitySlug(c, language);
                    const cityName = language === 'ar' ? c.ar : c.en;
                    const neighborhoods = listNeighborhoodsForCity(c);
                    const hasNeighborhoods = neighborhoods.length > 0;
                    return (
                      <div key={c.slug} className="rounded-xl border bg-background p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <LocalizedLink className="font-semibold text-primary hover:underline" href={`/locations/${citySlug}`}>
                            {cityName}
                          </LocalizedLink>

                          {hasNeighborhoods && (
                            <LocalizedLink
                              className="text-sm text-primary hover:underline"
                              href={`/locations/${citySlug}/${language === 'ar' ? 'احياء' : 'neighborhoods'}`}
                            >
                              {language === 'ar' ? 'أحياء المدينة' : 'Neighborhoods'}
                            </LocalizedLink>
                          )}
                        </div>

                        <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {serviceLandings.map((s) => {
                            const serviceSlug = getServiceSlug(s, language, c);
                            const serviceName = language === 'ar' ? s.ar : s.en;
                            return (
                              <li key={s.slug}>
                                <LocalizedLink className="text-sm text-primary hover:underline" href={`/locations/${citySlug}/${serviceSlug}`}>
                                  {language === 'ar' ? `${serviceName} في ${cityName}` : `${serviceName} in ${cityName}`}
                                </LocalizedLink>
                              </li>
                            );
                          })}
                        </ul>

                        {hasNeighborhoods && c.slug === 'riyadh' && (
                          <div className="mt-3">
                            <p className="text-xs text-muted-foreground">
                              {language === 'ar'
                                ? 'روابط مختارة لأحياء الرياض.'
                                : 'Selected Riyadh neighborhood pages.'}
                            </p>
                            <ul className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                              {neighborhoods.slice(0, 18).map((n) => {
                                const hood = getNeighborhoodSlug(n, language === 'ar' ? 'ar' : 'en');
                                const grouting = getServiceSlug(serviceLandings[0], language, c);
                                const label = language === 'ar' ? `حقن تربة في ${n.ar}` : `Soil grouting in ${n.en}`;
                                return (
                                  <li key={n.slug}>
                                    <LocalizedLink
                                      className="text-xs text-primary hover:underline"
                                      href={`/locations/${citySlug}/${grouting}/${hood}`}
                                    >
                                      {label}
                                    </LocalizedLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border bg-card/60 backdrop-blur p-6">
                <h2 className="text-xl font-semibold">{language === 'ar' ? 'المدونة' : 'Blog'}</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {language === 'ar'
                    ? 'روابط مباشرة لكل المقالات (80 مقال).'
                    : 'Direct links to all articles (80 posts).'}
                </p>
                <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {ARTICLES
                    .slice()
                    .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
                    .map((a) => {
                      const slug = getArticleUrlSlug(a as any, language);
                      const title = language === 'ar' ? a.title : (a.titleEn || a.title);
                      return (
                        <li key={a.id}>
                          <LocalizedLink className="text-xs text-primary hover:underline" href={`/blog/${slug}`}>
                            {title}
                          </LocalizedLink>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
