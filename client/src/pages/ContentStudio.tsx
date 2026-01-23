import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { absUrl } from '@/lib/siteUrl';
import { buildBreadcrumbList } from '@/lib/schemaHelpers';
import { Download, Copy, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[\u0600-\u06FF]+/g, (m) => m) // keep Arabic
    .replace(/[^\w\u0600-\u06FF\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export default function ContentStudio() {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'ar';

  // Case study inputs
  const [titleAr, setTitleAr] = useState('معالجة هبوط موضعي بموقف مبنى');
  const [titleEn, setTitleEn] = useState('Localized settlement remediation in a building parking area');
  const [cityAr, setCityAr] = useState('الرياض');
  const [cityEn, setCityEn] = useState('Riyadh');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [durationAr, setDurationAr] = useState('3 أيام');
  const [durationEn, setDurationEn] = useState('3 days');
  const [tagsAr, setTagsAr] = useState('حقن التربة, معالجة الهبوط, كشف فراغات');
  const [tagsEn, setTagsEn] = useState('Soil grouting, Settlement remediation, Void detection');

  const [problemAr, setProblemAr] = useState('ظهور هبوط موضعي وتشققات سطحية بالموقع مع مؤشرات على ضعف تربة الردم.');
  const [problemEn, setProblemEn] = useState('Localized settlement and surface cracking with signs of weak fill layers.');
  const [diagnosisAr, setDiagnosisAr] = useState('تقييم ميداني + تحديد نطاق التأثر، ثم فحص مبدئي لتأكيد مناطق الضعف.');
  const [diagnosisEn, setDiagnosisEn] = useState('Site assessment to map the affected zone, followed by screening to confirm weak areas.');
  const [approachAr, setApproachAr] = useState('تنفيذ حقن أسمنتي على مراحل وفق خطة استهداف، مع توثيق الضغوط والاستهلاك ومراقبة التأثير.');
  const [approachEn, setApproachEn] = useState('Stage-based cement grouting per a targeting plan, with logs of pressure/consumption and monitoring.');
  const [resultsAr, setResultsAr] = useState('تحسن الاستقرار وتوقف تطور التشققات، مع تسليم تقرير مختصر بخطة متابعة.');
  const [resultsEn, setResultsEn] = useState('Improved stability and no continued crack growth, with a concise report and monitoring plan.');
  const [deliverablesAr, setDeliverablesAr] = useState('سجل الحقن، تقرير نتائج مختصر، توصيات متابعة');
  const [deliverablesEn, setDeliverablesEn] = useState('Injection logs, concise results report, follow-up recommendations');

  const slug = useMemo(() => slugify(`${cityEn}-${titleEn}`).slice(0, 80), [cityEn, titleEn]);

  const jsonSnippet = useMemo(() => {
    const tagsA = tagsAr.split(',').map((x) => x.trim()).filter(Boolean);
    const tagsE = tagsEn.split(',').map((x) => x.trim()).filter(Boolean);
    return {
      slug,
      title: titleAr,
      titleEn,
      location: cityAr,
      locationEn: cityEn,
      date,
      duration: durationAr,
      durationEn,
      tags: tagsA,
      tagsEn: tagsE,
      summary: problemAr,
      summaryEn: problemEn,
      // Optional structured fields (safe additions for future expansion)
      problem: problemAr,
      diagnosis: diagnosisAr,
      approach: approachAr,
      results: resultsAr,
      deliverables: deliverablesAr.split(',').map((x) => x.trim()).filter(Boolean),
      problemEn: problemEn,
      diagnosisEn,
      approachEn,
      resultsEn,
      deliverablesEn: deliverablesEn.split(',').map((x) => x.trim()).filter(Boolean),
    };
  }, [slug, titleAr, titleEn, cityAr, cityEn, date, durationAr, durationEn, tagsAr, tagsEn, problemAr, problemEn, diagnosisAr, diagnosisEn, approachAr, approachEn, resultsAr, resultsEn, deliverablesAr, deliverablesEn]);

  const markdownAr = useMemo(() => {
    const tagsA = tagsAr.split(',').map((x) => x.trim()).filter(Boolean);
    return `# ${titleAr}
**المدينة:** ${cityAr}  
**المدة:** ${durationAr}  
**التاريخ:** ${date}  
**وسوم:** ${tagsA.map((t) => `\`${t}\``).join(' ')}

---

## المشكلة
${problemAr}

## التشخيص
${diagnosisAr}

## المنهجية
${approachAr}

## النتائج
${resultsAr}

## المخرجات
- ${deliverablesAr.split(',').map((x) => x.trim()).filter(Boolean).join('\n- ')}

---

> لاستخدام هذه الدراسة داخل الموقع: أضف JSON داخل \`client/src/data/projects.ts\` ثم أنشئ صفحة/بطاقة في قسم المشاريع.`;
  }, [titleAr, cityAr, durationAr, date, tagsAr, problemAr, diagnosisAr, approachAr, resultsAr, deliverablesAr]);

  const markdownEn = useMemo(() => {
    const tagsE = tagsEn.split(',').map((x) => x.trim()).filter(Boolean);
    return `# ${titleEn}
**City:** ${cityEn}  
**Duration:** ${durationEn}  
**Date:** ${date}  
**Tags:** ${tagsE.map((t) => `\`${t}\``).join(' ')}

---

## Problem
${problemEn}

## Diagnosis
${diagnosisEn}

## Approach
${approachEn}

## Results
${resultsEn}

## Deliverables
- ${deliverablesEn.split(',').map((x) => x.trim()).filter(Boolean).join('\n- ')}

---

> To publish this on the website: paste the JSON snippet into \`client/src/data/projects.ts\` and ensure it appears in the Projects/Case Studies list.`;
  }, [titleEn, cityEn, durationEn, date, tagsEn, problemEn, diagnosisEn, approachEn, resultsEn, deliverablesEn]);

  const schema = useMemo(() => {
    const pageUrl = absUrl(`/${lang}/content-studio`);
    const crumbs = buildBreadcrumbList([
      { name: lang === 'ar' ? 'الرئيسية' : 'Home', url: absUrl(`/${lang}/`) },
      { name: lang === 'ar' ? 'استوديو المحتوى' : 'Content Studio', url: pageUrl },
    ]);
    return { '@context': 'https://schema.org', '@graph': [{ '@type': 'WebPage', name: 'Content Studio', url: pageUrl }, crumbs] };
  }, [lang]);

  return (
    <div className="container mx-auto px-4 py-10">
      <SEO
        title={lang === 'ar' ? 'استوديو المحتوى | ETLAQ (داخلي)' : 'Content Studio | ETLAQ (Internal)'}
        description={lang === 'ar' ? 'أدوات داخلية لتوليد دراسات حالة ومحتوى قابل للنشر بسرعة.' : 'Internal tools to generate case studies and publishable content quickly.'}
        noIndex
        schema={schema}
      />

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{lang === 'ar' ? 'استوديو المحتوى (داخلي)' : 'Content Studio (Internal)'}</h1>
            <p className="text-muted-foreground mt-1">
              {lang === 'ar'
                ? 'مولّد سريع لدراسات الحالة: يخرج JSON للموقع + Markdown للنشر.'
                : 'Fast case study generator: outputs website JSON + publishable Markdown.'}
            </p>
          </div>
          <Badge variant="secondary" className="w-fit">
            <Sparkles className="w-4 h-4 me-2" />
            Phase 5
          </Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">{lang === 'ar' ? 'مدخلات دراسة الحالة' : 'Case study inputs'}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="grid gap-2">
                <div className="text-sm font-semibold">{lang === 'ar' ? 'العنوان (عربي)' : 'Title (AR)'}</div>
                <Input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-semibold">{lang === 'ar' ? 'العنوان (English)' : 'Title (EN)'}</div>
                <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <div className="text-sm font-semibold">{lang === 'ar' ? 'المدينة (عربي)' : 'City (AR)'}</div>
                  <Input value={cityAr} onChange={(e) => setCityAr(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <div className="text-sm font-semibold">{lang === 'ar' ? 'City (English)' : 'City (EN)'}</div>
                  <Input value={cityEn} onChange={(e) => setCityEn(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <div className="text-sm font-semibold">{lang === 'ar' ? 'التاريخ' : 'Date'}</div>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <div className="text-sm font-semibold">{lang === 'ar' ? 'Slug (auto)' : 'Slug (auto)'}</div>
                  <Input value={slug} readOnly />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <div className="text-sm font-semibold">{lang === 'ar' ? 'المدة (عربي)' : 'Duration (AR)'}</div>
                  <Input value={durationAr} onChange={(e) => setDurationAr(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <div className="text-sm font-semibold">{lang === 'ar' ? 'Duration (EN)' : 'Duration (EN)'}</div>
                  <Input value={durationEn} onChange={(e) => setDurationEn(e.target.value)} />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="text-sm font-semibold">{lang === 'ar' ? 'وسوم (عربي) - افصل بفواصل' : 'Tags (AR) - comma separated'}</div>
                <Input value={tagsAr} onChange={(e) => setTagsAr(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <div className="text-sm font-semibold">{lang === 'ar' ? 'Tags (English) - comma separated' : 'Tags (EN) - comma separated'}</div>
                <Input value={tagsEn} onChange={(e) => setTagsEn(e.target.value)} />
              </div>

              <div className="grid gap-2">
                <div className="text-sm font-semibold">{lang === 'ar' ? 'المشكلة' : 'Problem'}</div>
                <Textarea rows={3} value={lang === 'ar' ? problemAr : problemEn} onChange={(e) => (lang === 'ar' ? setProblemAr(e.target.value) : setProblemEn(e.target.value))} />
              </div>

              <div className="grid gap-2">
                <div className="text-sm font-semibold">{lang === 'ar' ? 'التشخيص' : 'Diagnosis'}</div>
                <Textarea rows={3} value={lang === 'ar' ? diagnosisAr : diagnosisEn} onChange={(e) => (lang === 'ar' ? setDiagnosisAr(e.target.value) : setDiagnosisEn(e.target.value))} />
              </div>

              <div className="grid gap-2">
                <div className="text-sm font-semibold">{lang === 'ar' ? 'المنهجية' : 'Approach'}</div>
                <Textarea rows={3} value={lang === 'ar' ? approachAr : approachEn} onChange={(e) => (lang === 'ar' ? setApproachAr(e.target.value) : setApproachEn(e.target.value))} />
              </div>

              <div className="grid gap-2">
                <div className="text-sm font-semibold">{lang === 'ar' ? 'النتائج' : 'Results'}</div>
                <Textarea rows={3} value={lang === 'ar' ? resultsAr : resultsEn} onChange={(e) => (lang === 'ar' ? setResultsAr(e.target.value) : setResultsEn(e.target.value))} />
              </div>

              <div className="grid gap-2">
                <div className="text-sm font-semibold">{lang === 'ar' ? 'المخرجات - افصل بفواصل' : 'Deliverables - comma separated'}</div>
                <Input value={lang === 'ar' ? deliverablesAr : deliverablesEn} onChange={(e) => (lang === 'ar' ? setDeliverablesAr(e.target.value) : setDeliverablesEn(e.target.value))} />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">{lang === 'ar' ? 'JSON للموقع (Projects)' : 'Website JSON (Projects)'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea rows={16} value={JSON.stringify(jsonSnippet, null, 2)} readOnly />
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => copyToClipboard(JSON.stringify(jsonSnippet, null, 2))}>
                    <Copy className="w-4 h-4 me-2" />
                    {lang === 'ar' ? 'نسخ' : 'Copy'}
                  </Button>
                  <Button onClick={() => downloadText(`case-study-${slug}.json`, JSON.stringify(jsonSnippet, null, 2))}>
                    <Download className="w-4 h-4 me-2" />
                    {lang === 'ar' ? 'تحميل JSON' : 'Download JSON'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {lang === 'ar'
                    ? 'ألصق هذا المقطع داخل client/src/data/projects.ts ضمن المصفوفة، ثم سيظهر تلقائيًا في Projects و Case Studies.'
                    : 'Paste this snippet into client/src/data/projects.ts inside the array; it will appear in Projects and Case Studies.'}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">{lang === 'ar' ? 'Markdown للنشر' : 'Publishable Markdown'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-3">
                  <div>
                    <div className="text-sm font-semibold mb-2">AR</div>
                    <Textarea rows={10} value={markdownAr} readOnly />
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Button variant="secondary" onClick={() => copyToClipboard(markdownAr)}>
                        <Copy className="w-4 h-4 me-2" />
                        {lang === 'ar' ? 'نسخ' : 'Copy'}
                      </Button>
                      <Button variant="outline" onClick={() => downloadText(`case-study-${slug}.ar.md`, markdownAr)}>
                        <Download className="w-4 h-4 me-2" />
                        {lang === 'ar' ? 'تحميل' : 'Download'}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold mb-2">EN</div>
                    <Textarea rows={10} value={markdownEn} readOnly />
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Button variant="secondary" onClick={() => copyToClipboard(markdownEn)}>
                        <Copy className="w-4 h-4 me-2" />
                        {lang === 'ar' ? 'نسخ' : 'Copy'}
                      </Button>
                      <Button variant="outline" onClick={() => downloadText(`case-study-${slug}.en.md`, markdownEn)}>
                        <Download className="w-4 h-4 me-2" />
                        {lang === 'ar' ? 'تحميل' : 'Download'}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  {lang === 'ar'
                    ? 'اقتراح: يمكنك نشر نسخة مختصرة من الدراسة كمقال وربطها بصفحة المشروع والخدمة والمدينة.'
                    : 'Tip: publish a short version as a blog post and link it to the project, service, and city landing.'}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          {lang === 'ar'
            ? 'هذه صفحة داخلية (noindex). لا تشارك الرابط علنًا.'
            : 'This is an internal (noindex) page. Do not share publicly.'}
        </div>
      </div>
    </div>
  );
}
