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

function inferService(signals: string[] = []) {
  const s = signals.join(' ').toLowerCase();
  const contains = (arr: string[]) => arr.some((k) => s.includes(k));
  if (contains(['grout', 'حقن', 'cement', 'injection'])) return 'soil-grouting';
  if (contains(['void', 'cavity', 'فراغ', 'تكهف', 'sinkhole', 'كهوف'])) return 'void-detection';
  if (contains(['ert', 'gpr', 'geophys', 'جيوفي', 'resistivity', 'radar'])) return 'geophysical-surveys';
  if (contains(['foundation', 'underpin', 'أساسات', 'تقوية', 'settlement', 'هبوط', 'crack', 'تشققات'])) return 'foundation-strengthening';
  return 'soil-grouting';
}

export default function RelatedLinksHub({ signals = [], serviceSlug }: HubProps) {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'ar';

  const svcSlug = serviceSlug || inferService(signals);
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
      <CardContent className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-start gap-3">
            <Wrench className="w-5 h-5 mt-0.5 text-muted-foreground" />
            <div>
              <div className="font-semibold">
                {lang === 'ar' ? 'الخدمة الأقرب لموضوع المقال:' : 'Closest service to this article:'}{' '}
                <span className="font-bold">{svcName}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {lang === 'ar'
                  ? 'راجع صفحة الخدمة لمعرفة المنهجية والمخرجات وخيارات التنفيذ.'
                  : 'See the service page for methodology, deliverables, and execution options.'}
              </div>
            </div>
          </div>

          <LocalizedLink href={`/services/${svc.slug}`} className="inline-flex">
            <Button variant="secondary">
              {lang === 'ar' ? 'تفاصيل الخدمة' : 'Service details'}
              <ArrowRight className="w-4 h-4 ms-2" />
            </Button>
          </LocalizedLink>
        </div>

        <div className="rounded-xl border bg-card/60 p-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-0.5 text-muted-foreground" />
            <div className="w-full">
              <div className="font-semibold">
                {lang === 'ar' ? 'استهداف محلي (مدينة + خدمة):' : 'Local intent (City + Service):'}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                {lang === 'ar'
                  ? 'اختر مدينتك للاطلاع على صفحة مخصصة تتضمن مشاكل شائعة بالموقع وأسئلة شائعة ومخرجات.'
                  : 'Pick your city for a dedicated landing page with common issues, FAQs, and deliverables.'}
              </div>
              <div className="flex flex-wrap gap-2">
                {citiesPicked.map((c) => (
                  <LocalizedLink key={c.slug} href={`/locations/${c.slug}/${svc.slug}`}>
                    <a className="text-xs rounded-full border px-3 py-1 bg-background hover:bg-accent">
                      {lang === 'ar' ? c.ar : c.en}
                    </a>
                  </LocalizedLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <LocalizedLink href={`/request-service?service=${serviceParam}`} className="inline-flex">
            <Button className="w-full sm:w-auto">
              {lang === 'ar' ? 'اطلب تقييم سريع' : 'Request a quick assessment'}
            </Button>
          </LocalizedLink>
          <LocalizedLink href="/contact" className="inline-flex">
            <Button variant="outline" className="w-full sm:w-auto">
              {lang === 'ar' ? 'تواصل مع الفريق' : 'Contact the team'}
            </Button>
          </LocalizedLink>
        </div>
      </CardContent>
    </Card>
  );
}
