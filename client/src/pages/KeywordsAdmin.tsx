import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { cities, serviceLandings } from '@/data/seoLocations';
import { keywordGroups } from '@/data/keywordBank';
import { buildLandingKeywords } from '@/lib/seoKeywords';
import { absUrl } from '@/lib/siteUrl';
import { Download, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

type CsvRow = Record<string, string>;

function toCsv(rows: CsvRow[]) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escape = (v: any) => {
    const s = String(v ?? '');
    if (/[",\n]/.test(s)) return '"' + s.replaceAll('"', '""') + '"';
    return s;
  };
  const lines = [
    headers.map(escape).join(','),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(',')),
  ];
  // UTF-8 BOM for Excel Arabic
  return '\ufeff' + lines.join('\n');
}

function downloadCsv(filename: string, rows: CsvRow[]) {
  const csv = toCsv(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildPageMeta(lang: 'ar' | 'en', citySlug: string, serviceSlug: string) {
  const city = cities.find((c) => c.slug === citySlug);
  const service = serviceLandings.find((s) => s.slug === serviceSlug);
  const cityName = city ? (lang === 'ar' ? city.ar : city.en) : (lang === 'ar' ? 'المدينة' : 'City');
  const serviceName = service ? (lang === 'ar' ? service.ar : service.en) : (lang === 'ar' ? 'الخدمة' : 'Service');

  const title =
    lang === 'ar'
      ? `${serviceName} في ${cityName} | شركة إطلاق المتميزة`
      : `${serviceName} in ${cityName} | Etlaq`;

  const description =
    lang === 'ar'
      ? `حلول ${serviceName} في ${cityName} تشمل تقييم سريع، خطة تنفيذ منظمة، ومخرجات واضحة (تقارير/نتائج/توصيات) لتقليل المخاطر ودعم القرار.`
      : `${serviceName} in ${cityName} with a quick assessment, structured execution plan, and clear deliverables (results/recommendations) to reduce risk and support decisions.`;

  const path = `/${lang}/locations/${citySlug}/${serviceSlug}`;
  const url = absUrl(path);
  const keywords = buildLandingKeywords(lang, city || null, service || null);

  // Short ad copy suggestions (Google Ads style)
  const headline1 = lang === 'ar' ? `${serviceName} ${cityName}` : `${serviceName} ${cityName}`;
  const headline2 = lang === 'ar' ? 'تقييم سريع وخطة واضحة' : 'Quick assessment & clear plan';
  const headline3 = lang === 'ar' ? 'مخرجات وتقارير مهنية' : 'Clear deliverables & reports';
  const desc1 = lang === 'ar'
    ? `حلول منظمة لـ ${serviceName} في ${cityName}. اطلب تقييم مختصر وخطوة تالية واضحة.`
    : `Structured ${serviceName} in ${cityName}. Get a quick assessment and clear next steps.`;
  const desc2 = lang === 'ar'
    ? 'تواصل الآن للحصول على تقييم مختصر خلال وقت قصير.'
    : 'Contact us to get a quick assessment in a short timeframe.';

  return { title, description, keywords, url, headline1, headline2, headline3, desc1, desc2 };
}

export default function KeywordsAdmin() {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'ar';
  const [q, setQ] = useState('');

  const filteredGroups = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return keywordGroups;
    return keywordGroups
      .map((g) => {
        const items = (lang === 'ar' ? g.ar : g.en).filter((k) => k.toLowerCase().includes(query));
        const other = (lang === 'ar' ? g.en : g.ar).filter((k) => k.toLowerCase().includes(query));
        const keep = items.length || other.length || g.titleAr.toLowerCase().includes(query) || g.titleEn.toLowerCase().includes(query);
        return keep ? g : null;
      })
      .filter(Boolean) as typeof keywordGroups;
  }, [q, lang]);

  const exportLandingsCsv = (exportLang: 'ar' | 'en' | 'both') => {
    const rows: CsvRow[] = [];
    const langs: ('ar' | 'en')[] = exportLang === 'both' ? ['ar', 'en'] : [exportLang];

    for (const l of langs) {
      for (const city of cities) {
        for (const svc of serviceLandings) {
          const meta = buildPageMeta(l, city.slug, svc.slug);
          rows.push({
            Language: l,
            City: l === 'ar' ? city.ar : city.en,
            CitySlug: city.slug,
            Service: l === 'ar' ? svc.ar : svc.en,
            ServiceSlug: svc.slug,
            URL: meta.url,
            Title: meta.title,
            MetaDescription: meta.description,
            MetaKeywords: meta.keywords,
            // Ad suggestions
            Headline1: meta.headline1,
            Headline2: meta.headline2,
            Headline3: meta.headline3,
            Description1: meta.desc1,
            Description2: meta.desc2,
          });
        }
      }
    }

    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`etlaqksa_landings_${exportLang}_${stamp}.csv`, rows);
  };

  const exportKeywordBankCsv = () => {
    const rows: CsvRow[] = [];
    for (const g of keywordGroups) {
      const ar = g.ar.join(' | ');
      const en = g.en.join(' | ');
      rows.push({
        GroupId: g.id,
        GroupTitle_AR: g.titleAr,
        GroupTitle_EN: g.titleEn,
        Keywords_AR: ar,
        Keywords_EN: en,
        Notes_AR: g.notesAr || '',
        Notes_EN: g.notesEn || '',
      });
    }
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`etlaqksa_keyword_bank_${stamp}.csv`, rows);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <SEO
        title={lang === 'ar' ? 'لوحة الكلمات المفتاحية | ETLAQ' : 'Keyword Dashboard | ETLAQ'}
        description={lang === 'ar' ? 'لوحة داخلية لإدارة الكلمات المفتاحية وتصدير CSV للصفحات والحملات.' : 'Internal dashboard to manage keywords and export CSV for pages & campaigns.'}
        noIndex
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {lang === 'ar' ? 'لوحة الكلمات المفتاحية (داخلية)' : 'Keyword Dashboard (Internal)'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {lang === 'ar'
              ? 'هذه الصفحة غير مفهرسة (noindex) ومخصصة للفريق لتصدير صفحات المدن/الخدمات وكلمات الحملات.'
              : 'This page is noindex and intended for internal use: export city/service landings & campaign keywords.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportKeywordBankCsv}>
            <Download className="w-4 h-4 me-2" />
            {lang === 'ar' ? 'تصدير بنك الكلمات CSV' : 'Export Keyword Bank CSV'}
          </Button>
          <Button onClick={() => exportLandingsCsv('ar')}>
            <Download className="w-4 h-4 me-2" />
            {lang === 'ar' ? 'CSV صفحات المدن/الخدمات (عربي)' : 'Landings CSV (AR)'}
          </Button>
          <Button variant="outline" onClick={() => exportLandingsCsv('en')}>
            <Download className="w-4 h-4 me-2" />
            {lang === 'ar' ? 'CSV صفحات المدن/الخدمات (إنجليزي)' : 'Landings CSV (EN)'}
          </Button>
          <Button variant="outline" onClick={() => exportLandingsCsv('both')}>
            <Download className="w-4 h-4 me-2" />
            {lang === 'ar' ? 'CSV للغتين (AR+EN)' : 'Landings CSV (AR+EN)'}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={lang === 'ar' ? 'ابحث داخل الكلمات...' : 'Search keywords...'}
          className="max-w-md"
          aria-label={lang === 'ar' ? 'بحث الكلمات' : 'Search keywords'}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredGroups.map((g) => (
          <Card key={g.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">
                {lang === 'ar' ? g.titleAr : g.titleEn}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lang === 'ar' && g.notesAr ? <p className="text-sm text-muted-foreground mb-3">{g.notesAr}</p> : null}
              {lang === 'en' && g.notesEn ? <p className="text-sm text-muted-foreground mb-3">{g.notesEn}</p> : null}

              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold mb-2">{lang === 'ar' ? 'عربي' : 'Arabic'}</div>
                  <div className="flex flex-wrap gap-2">
                    {g.ar.map((k) => (
                      <span key={k} className="text-xs rounded-full border px-3 py-1 bg-background">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">{lang === 'ar' ? 'English' : 'English'}</div>
                  <div className="flex flex-wrap gap-2">
                    {g.en.map((k) => (
                      <span key={k} className="text-xs rounded-full border px-3 py-1 bg-background">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-sm text-muted-foreground">
        {lang === 'ar'
          ? 'ملاحظة: Google يتجاهل meta keywords غالبًا. نستخدم هذا البنك لإدارة المحتوى والصفحات والـ campaigns فقط.'
          : 'Note: Google typically ignores meta keywords. This bank is for internal content/pages/campaign management.'}
      </div>
    </div>
  );
}
