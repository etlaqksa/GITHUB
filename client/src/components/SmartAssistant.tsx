import { useMemo, useState } from 'react';
import { Bot, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { articles } from '@/data/articles';

type Intent = {
  key: string;
  label: { ar: string; en: string };
  hint: { ar: string; en: string };
  link: string;
};

const INTENTS: Intent[] = [
  {
    key: 'settlement_cracks',
    label: { ar: 'هبوط وتشققات', en: 'Settlement & cracking' },
    hint: {
      ar: 'تثبيت التربة وتقليل الهبوط عبر الحقن الأسمنتي أو الحقن الدقيق حسب الحالة.',
      en: 'Stabilize soils and reduce settlement using cementitious or microfine grouting depending on the case.',
    },
    link: '/services/grouting',
  },
  {
    key: 'voids_cavities',
    label: { ar: 'فراغات وتجاويف', en: 'Voids & cavities' },
    hint: {
      ar: 'كشف الفراغات والتأكد من امتدادها ثم معالجتها بالحقن المناسب.',
      en: 'Detect voids, confirm their extent, then treat with the appropriate grouting system.',
    },
    link: '/services/cavity',
  },
  {
    key: 'unknown_subsurface',
    label: { ar: 'تحريات تحت السطح', en: 'Subsurface investigation' },
    hint: {
      ar: 'عند عدم وضوح السبب: نبدأ بمسح جيوفيزيائي/تحريات لتحديد أماكن الضعف والفراغات.',
      en: 'When root cause is unclear: start with geophysical scanning/investigation to locate weak zones and voids.',
    },
    link: '/services/geophysical',
  },
];

function scoreMatch(query: string, target: string) {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const t = target.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 70;
  if (t.includes(q)) return 40;
  // token scoring
  const parts = q.split(/\s+/).filter(Boolean);
  let s = 0;
  for (const p of parts) {
    if (t.includes(p)) s += 12;
  }
  return s;
}

export default function SmartAssistant() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [input, setInput] = useState('');
  const [q, setQ] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const runSearch = () => {
    const next = input.trim();
    setQ(next);
    setHasSearched(true);
  };

  const results = useMemo(() => {
    const query = q.trim();
    if (query.length < 2) return [] as { slug: string; title: string; score: number }[];

    const list = articles
      .map((a: any) => {
        // Our canonical article shape uses: title/titleEn, category/categoryEn, excerpt/excerptEn.
        // (Older datasets used titleAr/categoryAr)
        const title = isAr ? a.title : a.titleEn;
        const cat = isAr ? a.category : a.categoryEn;
        const excerpt = isAr ? a.excerpt : a.excerptEn;
        const extraCats = isAr ? a.categoriesAr : a.categoriesEn;

        let s = scoreMatch(query, String(title)) + 0.6 * scoreMatch(query, String(cat));
        s += 0.25 * scoreMatch(query, String(excerpt || ''));
        if (Array.isArray(extraCats)) {
          for (const c of extraCats) s += 0.2 * scoreMatch(query, String(c));
        }

        return { slug: a.slug, title: String(title), score: s };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    return list;
  }, [q, isAr]);

  return (
    <div className="fixed bottom-24 md:bottom-5 right-6 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="rounded-full shadow-lg h-12 w-12 p-0"
            aria-label={isAr ? 'مساعد الموقع' : 'Site assistant'}
          >
            <Bot className="h-5 w-5" />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {isAr ? 'مساعد إطلاق الذكي' : 'ETLAQ Smart Assistant'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/40 p-4">
              <div className="text-sm text-muted-foreground">
                {isAr
                  ? 'اختر موضوعًا سريعًا أو ابحث داخل المقالات...'
                  : 'Pick a quick topic or search inside our articles...'}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {INTENTS.map((it) => (
                  <LocalizedLink key={it.key} href={it.link}>
                    <Badge className="cursor-pointer">
                      {isAr ? it.label.ar : it.label.en}
                    </Badge>
                  </LocalizedLink>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{isAr ? 'بحث في المقالات' : 'Search articles'}</span>
              </div>

              <div className="grid gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      runSearch();
                    }
                  }}
                  placeholder={isAr ? 'مثال: حقن التربة، فراغات، هبوط...' : 'e.g. grouting, voids, settlement...'}
                  dir={isAr ? 'rtl' : 'ltr'}
                />
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={runSearch}
                    disabled={input.trim().length < 2}
                    className="gap-2"
                  >
                    <Search className="h-4 w-4" />
                    {isAr ? 'ابدأ البحث' : 'Search'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setInput('');
                      setQ('');
                      setHasSearched(false);
                    }}
                  >
                    {isAr ? 'مسح' : 'Clear'}
                  </Button>
                </div>
              </div>

              {hasSearched && q.trim().length >= 2 && results.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  {isAr ? 'لم نجد نتائج مباشرة. جرّب كلمة أقصر أو مرادفًا.' : 'No direct results. Try a shorter keyword or a synonym.'}
                </div>
              )}

              {results.length > 0 && (
                <div className="rounded-lg border border-border divide-y">
                  {results.map((r) => (
                    <LocalizedLink
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="block px-3 py-2 hover:bg-muted/60"
                    >
                      <div className="text-sm font-medium">{r.title}</div>
                    </LocalizedLink>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <LocalizedLink href="/request-service">
                  <Button size="sm">{isAr ? 'اطلب خدمة/استشارة' : 'Request a service'}</Button>
                </LocalizedLink>
                <LocalizedLink href="/contact">
                  <Button variant="outline" size="sm">{isAr ? 'تواصل معنا' : 'Contact us'}</Button>
                </LocalizedLink>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
