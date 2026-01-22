import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/SEO';
import TrustStats from '@/components/TrustStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { projects } from '@/data/projects';
import { ArrowLeft, Building2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useMemo } from 'react';
import { useRoute } from 'wouter';
import LocalizedLink from '@/components/LocalizedLink';

export default function ProjectCaseStudy() {
  const { language } = useLanguage();
  const [match, params] = useRoute('/projects/:slug');

  const project = useMemo(() => {
    const slug = params?.slug;
    if (!slug) return null;
    return projects.find((p) => p.slug === slug) ?? null;
  }, [params?.slug]);

  if (!match || !project) {
    return (
      <div className="min-h-screen">
        <section className="py-20">
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold">{language === 'ar' ? 'لم يتم العثور على المشروع' : 'Project not found'}</h1>
              <p className="mt-4 text-muted-foreground">
                {language === 'ar'
                  ? 'قد يكون الرابط غير صحيح أو تم تحديث المحتوى.'
                  : 'The link may be incorrect or the content has been updated.'}
              </p>
              <div className="mt-8">
                <LocalizedLink href="/projects">
                  <Button className="rounded-full" variant="secondary">
                    <ArrowLeft className="h-4 w-4 me-2" />
                    {language === 'ar' ? 'العودة إلى المشاريع' : 'Back to projects'}
                  </Button>
                </LocalizedLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const title = language === 'ar' ? project.title.ar : project.title.en;
  const client = language === 'ar' ? project.client.ar : project.client.en;
  const location = language === 'ar' ? project.location.ar : project.location.en;
  const summary = language === 'ar' ? project.summary.ar : project.summary.en;
  const badge = language === 'ar' ? project.categoryLabel.ar : project.categoryLabel.en;

  const challenge = language === 'ar' ? project.caseStudy.challenge.ar : project.caseStudy.challenge.en;
  const approach = language === 'ar' ? project.caseStudy.approach.ar : project.caseStudy.approach.en;
  const deliverables = language === 'ar' ? project.caseStudy.deliverables.ar : project.caseStudy.deliverables.en;
  const outcome = language === 'ar' ? project.caseStudy.outcome.ar : project.caseStudy.outcome.en;

  return (
    <div className="min-h-screen">
      <SEO
        title={`${title} | ${language === 'ar' ? 'مشاريعنا' : 'Projects'} | ${language === 'ar' ? 'إطلاق' : 'ETLAQ'}`}
        description={summary}
      />

      {/* Top */}
      <section className="py-14 md:py-18">
        <div className="container">
          <div className="mb-6">
            <LocalizedLink href="/projects">
              <Button variant="secondary" className="rounded-full">
                <ArrowLeft className="h-4 w-4 me-2" />
                {language === 'ar' ? 'المشاريع' : 'Projects'}
              </Button>
            </LocalizedLink>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{badge}</Badge>
                <Badge variant="outline">{project.year}</Badge>
                <Badge variant="outline">{location}</Badge>
              </div>

              <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">{title}</h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground">{summary}</p>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>{client}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{project.year}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <Card className="border-border/60 bg-card/70 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg">{language === 'ar' ? 'الخطوة التالية' : 'Next step'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <LocalizedLink href={`/request-service?service=${project.serviceKey}`}>
                    <Button className="w-full rounded-full">{language === 'ar' ? 'اطلب خدمة لمشروعك' : 'Request a service'}</Button>
                  </LocalizedLink>
                  <LocalizedLink href="/contact">
                    <Button variant="secondary" className="w-full rounded-full">
                      {language === 'ar' ? 'تواصل سريع' : 'Quick contact'}
                    </Button>
                  </LocalizedLink>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar'
                      ? 'ارسل موقع المشروع ووصف المشكلة، وسنقترح عليك الخطوة المناسبة (كشف تكهفات أو خطة حقن).'
                      : 'Share your site location and the issue, and we’ll suggest the right next step (cavity detection or a grouting plan).'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </section>

      {/* Case study sections */}
      <section className="pb-16">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-7 border-border/60 bg-card/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">{language === 'ar' ? 'التحدي' : 'Challenge'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{challenge}</p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5 border-border/60 bg-card/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">{language === 'ar' ? 'المخرجات' : 'Deliverables'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {deliverables.map((d) => (
                  <div key={d} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 mt-0.5" />
                    <p className="text-muted-foreground">{d}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="lg:col-span-12 border-border/60 bg-card/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">{language === 'ar' ? 'المنهجية' : 'Approach'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {approach.map((step, idx) => (
                    <div key={step} className="rounded-2xl border bg-background/40 p-5">
                      <div className="text-sm text-muted-foreground">{language === 'ar' ? `خطوة ${idx + 1}` : `Step ${idx + 1}`}</div>
                      <div className="mt-2 font-semibold leading-snug">{step}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-muted-foreground">{outcome}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10">
            <TrustStats className="rounded-2xl border bg-card/60 backdrop-blur p-6 md:p-8" />
          </div>
        </div>
      </section>
    </div>
  );
}