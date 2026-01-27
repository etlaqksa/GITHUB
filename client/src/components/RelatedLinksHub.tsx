import { cities, serviceLandings } from '@/data/seoLocations';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Wrench, ArrowRight } from 'lucide-react';

type HubProps = {
  // keywords may include Arabic or English words; we use it as signals
  signals?: string[];
  // optional explicit service slug (e.g., 'soil-grouting')
  serviceSlug?: string;
};

function pickTopCities() {
  // core market cities first
  const priority = ['riyadh', 'jeddah', 'dammam', 'khobar', 'makkah', 'madinah', 'taif', 'jubail', 'yanbu'];
  const picked = priority
    .map((s) => cities.find((c) => c.slug === s))
    .filter(Boolean) as typeof cities;
  return picked.length ? picked.slice(0, 6) : cities.slice(0, 6);
}

function inferServices(signals: string[] = []) {
  const s = signals.join(' ').toLowerCase();
  const score = (keys: string[]) => keys.reduce((acc, k) => (s.includes(k) ? acc + 1 : acc), 0);

  const candidates: { slug: string; score: number }[] = [
    { slug: 'soil-grouting', score: score(['grout', 'حقن', 'cement', 'injection', 'grouting']) },
    { slug: 'void-detection', score: score(['void', 'cavity', 'فراغ', 'تكهف', 'sinkhole', 'كهوف', 'cavities']) },
    { slug: 'geophysical-surveys', score: score(['ert', 'gpr', 'geophys', 'جيوفي', 'resistivity', 'radar', 'survey']) },
    { slug: 'foundation-strengthening', score: score(['foundation', 'underpin', 'أساسات', 'تقوية', 'settlement', 'هبوط', 'crack', 'تشققات', 'underpinning']) },
  ];

  candidates.sort((a, b) => b.score - a.score);

  // Always return at least 2 suggestions for better internal linking
  const top = candidates.filter((c) => c.score > 0).slice(0, 3);
  if (top.length >= 2) return top.map((t) => t.slug);

  // fallback: keep a sensible default set
  return ['soil-grouting', 'foundation-strengthening', 'void-detection'];
}

function inferService(signals: string[] = []) {
  return inferServices(signals)[0] || 'soil-grouting';
}

export default function RelatedLinksHub({ signals = [], serviceSlug }: HubProps) {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'ar';

  const svcSlugs = serviceSlug ? [serviceSlug] : inferServices(signals);
  const svcSlug = svcSlugs[0] || 'soil-grouting';
  const svc = serviceLandings.find((x) => x.slug === svcSlug) || serviceLandings[0];
  const serviceParam = (() => {
    const h = (svc.servicePageHref || '').toLowerCase();
    if (h.includes('grouting')) return 'grouting';
    if (h.includes('cavity')) return 'cavity';
    if (h.includes('geophysical')) return 'geophysical';
    return 'grouting';
  })();
  const svcName = lang === 'ar' ? svc.ar : svc.en;

  const citiesPicked = pickTopCities();

  return (
    <Card className="rounded-2xl border mt-10">
      <CardHeader>
        <CardTitle className="text-lg">
          {lang === 'ar' ? 'روابط مفيدة ذات صلة' : 'Related links'}
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Wrench className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الخدمات المرتبطة' : 'Related services'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {svcSlugs.map((slug) => {
              const sItem = serviceLandings.find((x) => x.slug === slug) || serviceLandings[0];
              const name = lang === 'ar' ? sItem.ar : sItem.en;
              return (
                <LocalizedLink
                  key={slug}
                  href={`/services/${slug}`}
                  className="text-xs rounded-full border px-3 py-1 bg-background hover:bg-accent"
                >
                  {name}
                </LocalizedLink>
              );
            })}
            <LocalizedLink href="/services" className="text-xs rounded-full border px-3 py-1 bg-background hover:bg-accent">
              {lang === 'ar' ? 'عرض كل الخدمات' : 'All services'}
            </LocalizedLink>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="w-4 h-4" />
            <span>{lang === 'ar' ? 'اختر مدينة' : 'Pick a city'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {citiesPicked.map((c) => (
              <LocalizedLink
                key={c.slug}
                href={`/locations/${c.slug}/${svcSlug}`}
                className="text-xs rounded-full border px-3 py-1 bg-background hover:bg-accent"
              >
                {lang === 'ar' ? c.ar : c.en}
              </LocalizedLink>
            ))}
          </div>
          <div>
            <LocalizedLink href={`/services/${svcSlug}`} className="inline-flex">
              <Button variant="secondary" className="gap-2">
                {lang === 'ar' ? 'صفحة الخدمة المرتبطة' : 'Service page'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
