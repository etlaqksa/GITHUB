import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrustStats from '@/components/TrustStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { projects as allProjects, type ServiceKey } from '@/data/projects';
import { Building2, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import LocalizedLink from '@/components/LocalizedLink';

type FilterKey = 'all' | ServiceKey;

export default function Projects() {
  const { language } = useLanguage();

  const [filter, setFilter] = useState<FilterKey>('all');

  const filterOptions = useMemo(() => {
    const counts: Record<ServiceKey, number> = { grouting: 0, cavity: 0, geophysical: 0 };
    allProjects.forEach((p) => {
      counts[p.serviceKey] += 1;
    });

    const options: Array<{ key: FilterKey; label: string; count?: number }> = [
      { key: 'all', label: language === 'ar' ? 'الكل' : 'All' },
    ];

    if (counts.grouting > 0) options.push({ key: 'grouting', label: language === 'ar' ? 'حقن التربة' : 'Soil Grouting', count: counts.grouting });
    if (counts.cavity > 0) options.push({ key: 'cavity', label: language === 'ar' ? 'كشف التكهفات' : 'Cavity Detection', count: counts.cavity });
    if (counts.geophysical > 0)
      options.push({ key: 'geophysical', label: language === 'ar' ? 'الدراسات الجيوفيزيائية' : 'Geophysical Surveys', count: counts.geophysical });

    return options;
  }, [language]);

  const projects = useMemo(() => {
    if (filter === 'all') return allProjects;
    return allProjects.filter((p) => p.serviceKey === filter);
  }, [filter]);

  return (
    <div className="min-h-screen">
      <SEO
        title={language === 'ar' ? 'مشاريعنا | إطلاق المتميزة' : 'Projects | ETLAQ'}
        description={
          language === 'ar'
            ? 'نماذج من مشاريعنا في حقن التربة وكشف التكهفات، مع ملخصات توضح نطاق العمل والمنهجية.'
            : 'Selected projects in soil grouting and cavity detection, with concise case-study style summaries.'
        }
      />

      {/* Header */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl">
            <Breadcrumbs items={[{ name: language === 'ar' ? 'المشاريع' : 'Projects', href: '/projects', isCurrent: true }]} />

        <h1 className="text-4xl md:text-5xl font-bold">{language === 'ar' ? 'مشاريعنا' : 'Our Projects'}</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              {language === 'ar'
                ? 'نحوّل الخبرة الميدانية إلى نتائج قابلة للقياس—استعرض نماذج من أعمالنا مع ملخصات منهجية تساعدك على فهم طريقة تنفيذنا.'
                : 'Field experience turned into measurable outcomes—browse selected work with structured, case-study style summaries.'}
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <LocalizedLink href="/case-studies" className="inline-flex">
                <Button variant="secondary" className="w-full sm:w-auto">
                  {language === 'ar' ? 'عرض دراسات الحالة المنظمة' : 'View structured case studies'}
                </Button>
              </LocalizedLink>
              <LocalizedLink href="/request-service" className="inline-flex">
                <Button className="w-full sm:w-auto">
                  {language === 'ar' ? 'اطلب تقييم سريع' : 'Request a quick assessment'}
                </Button>
              </LocalizedLink>
            </div>


            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="border-border/60 bg-card/70 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">+50</CardTitle>
                  <CardDescription>{language === 'ar' ? 'مشروع موثق' : 'Documented projects'}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border/60 bg-card/70 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">+20</CardTitle>
                  <CardDescription>{language === 'ar' ? 'مدينة' : 'Cities'}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border/60 bg-card/70 backdrop-blur col-span-2 md:col-span-1">
                <CardHeader className="pb-2">
                  <CardDescription className="text-sm">
                    {language === 'ar' ? 'نخدم جميع مناطق المملكة' : 'Serving all regions of KSA'}
                  </CardDescription>
                  <CardTitle className="text-base font-semibold">
                    {language === 'ar' ? 'تنفيذ ميداني + تقارير واضحة' : 'On-site execution + clear reporting'}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="pb-10">
        <div className="container">
          <TrustStats className="rounded-2xl border bg-card/60 backdrop-blur p-6 md:p-8" />
        </div>
      </section>

      {/* Filters */}
      <section className="pb-6">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <Button
                key={opt.key}
                variant={filter === opt.key ? 'default' : 'secondary'}
                className="rounded-full"
                onClick={() => setFilter(opt.key)}
              >
                {opt.label}
                {typeof opt.count === 'number' && (
                  <span className="ms-2 inline-flex items-center justify-center rounded-full bg-background/60 px-2 py-0.5 text-xs">
                    {opt.count}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="pb-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const title = language === 'ar' ? p.title.ar : p.title.en;
              const client = language === 'ar' ? p.client.ar : p.client.en;
              const location = language === 'ar' ? p.location.ar : p.location.en;
              const summary = language === 'ar' ? p.summary.ar : p.summary.en;
              const badge = language === 'ar' ? p.categoryLabel.ar : p.categoryLabel.en;

              return (
                <Card key={p.slug} className="group h-full border-border/60 bg-card/70 backdrop-blur transition hover:bg-card/80">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-xl leading-snug">{title}</CardTitle>
                      <Badge variant="secondary" className="whitespace-nowrap">
                        {badge}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{summary}</CardDescription>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span className="line-clamp-1">{client}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{p.year}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between gap-3">
                      <LocalizedLink href={`/projects/${p.slug}`}>
                        <Button variant="outline" className="rounded-full">
                          {language === 'ar' ? 'عرض التفاصيل' : 'View details'}
                        </Button>
                      </LocalizedLink>

                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground transition group-hover:text-foreground">
                        {language === 'ar' ? 'دراسة حالة مختصرة' : 'Short case study'}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border bg-card/60 backdrop-blur p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">{language === 'ar' ? 'لديك مشروع مشابه؟' : 'Have a similar project?'}</h3>
              <p className="mt-2 text-muted-foreground">
                {language === 'ar'
                  ? 'أرسل تفاصيل بسيطة وسنقترح عليك الخطوة التالية المناسبة (تقييم أولي، كشف تكهفات، أو خطة حقن).'
                  : 'Share a few details and we’ll suggest the right next step (initial assessment, cavity detection, or a grouting plan).'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <LocalizedLink href="/request-service?service=grouting">
                <Button className="rounded-full">{language === 'ar' ? 'اطلب خدمة' : 'Request service'}</Button>
              </LocalizedLink>
              <LocalizedLink href="/contact">
                <Button variant="secondary" className="rounded-full">
                  {language === 'ar' ? 'تواصل معنا' : 'Contact'}
                </Button>
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
