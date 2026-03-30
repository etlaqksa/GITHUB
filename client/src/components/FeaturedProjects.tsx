import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { IconBuilding, IconCalendar, IconLocation } from '@/components/icons/etlaq';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SERVICE_BADGE: Record<string, { ar: string; en: string; class: string }> = {
  grouting: { ar: 'حقن التربة', en: 'Soil Grouting', class: 'bg-blue-100 text-blue-700' },
  cavity: { ar: 'كشف التكهفات', en: 'Cavity Detection', class: 'bg-amber-100 text-amber-700' },
  geophysical: { ar: 'جيوفيزياء', en: 'Geophysical', class: 'bg-emerald-100 text-emerald-700' },
};

type Props = {
  limit?: number;
  className?: string;
};

export default function FeaturedProjects({ limit = 6, className = '' }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  // Pick a diverse cross-section of projects
  const featured = useMemo(() => {
    const byService: Record<string, typeof projects> = {};
    projects.forEach(p => {
      if (!byService[p.serviceKey]) byService[p.serviceKey] = [];
      byService[p.serviceKey]!.push(p);
    });

    const result: typeof projects = [];
    const keys = Object.keys(byService);
    let i = 0;
    while (result.length < limit) {
      const key = keys[i % keys.length]!;
      const arr = byService[key]!;
      const item = arr[Math.floor(i / keys.length)];
      if (item && !result.find(r => r.slug === item.slug)) result.push(item);
      i++;
      if (i > limit * 3) break;
    }
    return result.slice(0, limit);
  }, [limit]);

  // Aggregate stats
  const stats = useMemo(() => {
    const cities = new Set(projects.map(p => p.location.ar));
    const years = new Set(projects.map(p => p.year));
    return {
      total: projects.length,
      cities: cities.size,
      years: years.size,
    };
  }, []);

  return (
    <section className={`py-16 ${className}`} aria-label={isAr ? 'مشاريع مختارة' : 'Featured projects'}>
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-3">
              📁 {isAr ? 'مشاريع مختارة' : 'Featured projects'}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {isAr ? 'من سجل أعمالنا' : 'From our project record'}
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-lg">
              {isAr
                ? `${stats.total}+ مشروع منجز في ${stats.cities}+ مدينة خلال ${stats.years}+ سنة من الخبرة الميدانية.`
                : `${stats.total}+ completed projects across ${stats.cities}+ cities over ${stats.years}+ years of field experience.`}
            </p>
          </div>
          <LocalizedLink href="/projects">
            <Button variant="outline" className="gap-2 flex-shrink-0">
              {isAr ? 'كل المشاريع' : 'All projects'}
              {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </LocalizedLink>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(project => {
            const badge = SERVICE_BADGE[project.serviceKey];
            return (
              <LocalizedLink
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block rounded-2xl border bg-white p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge?.class}`}>
                    {isAr ? badge?.ar : badge?.en}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{project.year}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors text-start">
                  {isAr ? project.title.ar : project.title.en}
                </h3>

                {/* Summary */}
                <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2 text-start">
                  {isAr ? project.summary.ar : project.summary.en}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <IconBuilding className="h-3.5 w-3.5" />
                    {isAr ? project.client.ar.split('/')[0]?.trim() : project.client.en.split('/')[0]?.trim()}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <IconLocation className="h-3.5 w-3.5" />
                    {isAr ? project.location.ar : project.location.en}
                  </span>
                </div>

                {/* Arrow hint */}
                <div className="mt-3 flex items-center gap-1 text-blue-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {isAr ? 'تفاصيل المشروع' : 'Project details'}
                  {isAr ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                </div>
              </LocalizedLink>
            );
          })}
        </div>

        {/* Bottom CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <LocalizedLink href="/projects">
            <Button size="lg" variant="outline" className="gap-2">
              {isAr ? 'استعرض كل المشاريع' : 'Browse all projects'}
              {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </LocalizedLink>
          <LocalizedLink href="/case-studies">
            <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              {isAr ? 'دراسات الحالة التفصيلية' : 'Detailed case studies'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </LocalizedLink>
        </div>
      </div>
    </section>
  );
}
