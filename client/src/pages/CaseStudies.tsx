import { SEO } from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/contexts/LanguageContext';
import { projects } from '@/data/projects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TrustStats from '@/components/TrustStats';
import LocalizedLink from '@/components/LocalizedLink';
import { absUrl } from '@/lib/siteUrl';
import { buildBreadcrumbList } from '@/lib/schemaHelpers';
import { ArrowRight, Filter, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';

type FilterKey = 'all' | 'riyadh' | 'jeddah' | 'dammam' | 'eastern' | 'western' | 'central';

function regionOf(city: string) {
  const c = city.toLowerCase();
  if (['الرياض','riyadh','المجمعة','الزلفي','الرس','بريدة','عنيزة','القصيم','qassim','zulfi','majmaah'].some((x) => c.includes(x))) return 'central';
  if (['جدة','jeddah','مكة','makkah','الطائف','taif','ينبع','yanbu','المدينة','madinah','المدينة المنورة'].some((x) => c.includes(x))) return 'western';
  if (['الدمام','dammam','الخبر','khobar','الجبيل','jubail','الظهران','dhahran','القطيف','qatif','الهفوف','hofuf'].some((x) => c.includes(x))) return 'eastern';
  return 'all';
}

export default function CaseStudies() {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'ar';
  const [filter, setFilter] = useState<FilterKey>('all');

  const items = useMemo(() => {
    // Map projects into case-study cards (projects dataset already has problem/approach/results fields in most cases)
    const mapped = projects.map((p) => ({
      slug: p.slug,
      title: lang === 'ar' ? p.title : p.titleEn,
      city: lang === 'ar' ? p.location : p.locationEn,
      tags: (lang === 'ar' ? (p.tags || []) : (p.tagsEn || [])) as string[],
      summary: lang === 'ar' ? p.summary : p.summaryEn,
      date: p.date,
      region: regionOf(lang === 'ar' ? p.location : p.locationEn),
    }));

    if (filter === 'all') return mapped;

    if (filter === 'riyadh') return mapped.filter((x) => x.city.toLowerCase().includes('الرياض') || x.city.toLowerCase().includes('riyadh'));
    if (filter === 'jeddah') return mapped.filter((x) => x.city.toLowerCase().includes('جدة') || x.city.toLowerCase().includes('jeddah'));
    if (filter === 'dammam') return mapped.filter((x) => x.city.toLowerCase().includes('الدمام') || x.city.toLowerCase().includes('dammam'));

    return mapped.filter((x) => x.region === filter);
  }, [lang, filter]);

  const schema = useMemo(() => {
    const pageUrl = absUrl(`/${lang}/case-studies`);
    const graph: any[] = [
      {
        '@type': 'Organization',
        name: 'شركة إطلاق المتميزة المحدودة (ETLAQ)',
        url: absUrl('/'),
        logo: absUrl('/logo.png'),
      },
      {
        '@type': 'CollectionPage',
        name: lang === 'ar' ? 'دراسات حالة ومشاريع' : 'Case Studies & Projects',
        url: pageUrl,
      },
      {
        '@type': 'ItemList',
        itemListElement: items.slice(0, 25).map((it, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: absUrl(`/${lang}/projects/${it.slug}`),
          name: it.title,
        })),
      },
    ];
    return { '@context': 'https://schema.org', '@graph': graph };
  }, [items, lang]);

  const filters: { key: FilterKey; labelAr: string; labelEn: string }[] = [
    { key: 'all', labelAr: 'الكل', labelEn: 'All' },
    { key: 'riyadh', labelAr: 'الرياض', labelEn: 'Riyadh' },
    { key: 'jeddah', labelAr: 'جدة', labelEn: 'Jeddah' },
    { key: 'dammam', labelAr: 'الدمام', labelEn: 'Dammam' },
    { key: 'central', labelAr: 'الوسطى', labelEn: 'Central' },
    { key: 'western', labelAr: 'الغربية', labelEn: 'Western' },
    { key: 'eastern', labelAr: 'الشرقية', labelEn: 'Eastern' },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={lang === 'ar' ? 'دراسات حالة ومشاريع | شركة إطلاق المتميزة' : 'Case Studies & Projects | Etlaq'}
        description={
          lang === 'ar'
            ? 'دراسات حالة مختصرة: المشكلة → التشخيص → المنهجية → النتائج. أمثلة من مشاريع حقن التربة وكشف الفراغات وتقوية الأساسات داخل المملكة.'
            : 'Concise case studies: problem → diagnosis → approach → results. Examples across KSA.'
        }
        image={absUrl('/og-image.webp')}
        schema={schema}
      />

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <Breadcrumbs items={[{ name: lang === 'ar' ? 'دراسات حالة' : 'Case studies', href: '/case-studies', isCurrent: true }]} />

        <h1 className="text-3xl md:text-5xl font-bold">{lang === 'ar' ? 'دراسات حالة ومشاريع' : 'Case studies & projects'}</h1>
            <p className="text-muted-foreground leading-relaxed">
              {lang === 'ar'
                ? 'نحوّل الخبرة الميدانية إلى قصة واضحة تساعد على اتخاذ القرار: المشكلة → التشخيص → المنهجية → النتائج.'
                : 'We turn field experience into a decision-ready story: problem → diagnosis → approach → results.'}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border bg-card/70 backdrop-blur p-6">
            <TrustStats />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 justify-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {filters.map((f) => (
              <Button
                key={f.key}
                size="sm"
                variant={filter === f.key ? 'default' : 'outline'}
                onClick={() => setFilter(f.key)}
              >
                {lang === 'ar' ? f.labelAr : f.labelEn}
              </Button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <Card key={it.slug} className="rounded-2xl h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{it.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{it.city}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{it.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {it.tags.slice(0, 5).map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-6">
                    <LocalizedLink href={`/projects/${it.slug}`} className="inline-flex">
                      <Button variant="secondary" className="w-full">
                        {lang === 'ar' ? 'عرض دراسة الحالة' : 'View case study'}
                        <ArrowRight className="w-4 h-4 ms-2" />
                      </Button>
                    </LocalizedLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <LocalizedLink href="/request-service" className="inline-flex">
              <Button>
                {lang === 'ar' ? 'اطلب تقييم سريع لموقعك' : 'Request a quick assessment'}
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
