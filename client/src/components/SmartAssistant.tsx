import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { Bot, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { loadArticles, prefetchArticles } from '@/data/articlesLoader';
import LocalizedLink from '@/components/LocalizedLink';
import { getArticleUrlSlug } from '@/lib/articleUrl';

type Result = { urlSlug: string; title: string; excerpt: string; score: number };

const INTENTS = [
  { id: 'grouting', ar: 'حقن التربة', en: 'Soil grouting', href: '/services/grouting' },
  { id: 'cavities', ar: 'كشف التكهفات', en: 'Cavity probing', href: '/services/cavity' },
  { id: 'geophysics', ar: 'الجيوفيزياء', en: 'Geophysical solutions', href: '/services/geophysical' },
  { id: 'request', ar: 'طلب خدمة', en: 'Request service', href: '/request-service' },
  { id: 'contact', ar: 'تواصل معنا', en: 'Contact', href: '/contact' },
];

export default function SmartAssistant({ initialOpen = false }: { initialOpen?: boolean }) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [open, setOpen] = useState(Boolean(initialOpen));
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const [location] = useLocation();

  const [searchInput, setSearchInput] = useState('');
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // IMPORTANT:
  // Use refs (not state) to keep the loader stable.
  const hasLoadedRef = useRef(false);
  const loadTokenRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const startLoad = () => {
    loadTokenRef.current += 1;
    const token = loadTokenRef.current;

    setLoadError(null);
    setLoading(true);

    const TIMEOUT_MS = 8000;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (loadTokenRef.current !== token) return;
      setLoading(false);
      setLoadError(isAr ? 'تعذر تحميل قاعدة المعرفة حالياً. يمكنك إعادة المحاولة.' : 'Could not load the knowledge base. Please retry.');
    }, TIMEOUT_MS);

    loadArticles()
      .then((a) => {
        if (loadTokenRef.current !== token) return;
        setAllArticles(Array.isArray(a) ? a : []);
        hasLoadedRef.current = true;
      })
      .catch(() => {
        if (loadTokenRef.current !== token) return;
        setAllArticles([]);
        setLoadError(isAr ? 'تعذر تحميل قاعدة المعرفة حالياً. يمكنك إعادة المحاولة.' : 'Could not load the knowledge base. Please retry.');
      })
      .finally(() => {
        if (loadTokenRef.current !== token) return;
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setLoading(false);
      });
  };

  // Warm up the knowledge base in the background (idle/hover).
  useEffect(() => {
    const w: any = window;
    const run = () => {
      try {
        prefetchArticles();
      } catch {
        /* ignore */
      }
    };
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(run, { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(run, 1500);
    return () => window.clearTimeout(t);
  }, []);

  // Auto-close the assistant only when the route *actually changes*.
  const prevLocationRef = useRef(location);
  useEffect(() => {
    if (prevLocationRef.current === location) return;
    prevLocationRef.current = location;
    if (openRef.current) setOpen(false);
  }, [location]);

  // Load the articles only when the assistant is open.
  useEffect(() => {
    if (!open) return;
    if (hasLoadedRef.current) return;

    startLoad();

    return () => {
      loadTokenRef.current += 1;
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isAr]);

  const results = useMemo((): Result[] => {
    const q = searchInput.trim().toLowerCase();
    if (q.length < 2) return [];

    const src = allArticles || [];
    if (!src.length) return [];

    const scored = src
      .map((a) => {
        const title = isAr ? String(a.title || '') : String(a.titleEn || a.title || '');
        const cats = isAr
          ? (a.categoriesAr || [a.category].filter(Boolean)).join(' ')
          : (a.categoriesEn || [a.categoryEn].filter(Boolean)).join(' ');
        // Use a separate variable name to avoid duplicate declarations later in this scope.
        const excerptChunk = isAr
          ? String(a.content || '').slice(0, 600)
          : String(a.contentEn || a.content || '').slice(0, 600);
        const hay = `${title} ${cats} ${excerptChunk}`.toLowerCase();

        let s = 0;
        if (title.toLowerCase().includes(q)) s += 6;
        if (cats.toLowerCase().includes(q)) s += 2;
        if (hay.includes(q)) s += 1;

        const tokens = q.split(/\s+/).filter(Boolean);
        for (const t of tokens) {
          if (t.length < 2) continue;
          if (title.toLowerCase().includes(t)) s += 2;
          else if (hay.includes(t)) s += 0.5;
        }

        const urlSlug = getArticleUrlSlug(a, isAr ? 'ar' : 'en');
        const excerptRaw = isAr ? String(a.content || '') : String(a.contentEn || a.content || '');
        const excerpt = excerptRaw
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 220);
        return { urlSlug, title, excerpt, score: s };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    const seen = new Set<string>();
    const out: Result[] = [];
    for (const r of scored) {
      if (seen.has(r.urlSlug)) continue;
      seen.add(r.urlSlug);
      out.push(r);
    }
    return out;
  }, [searchInput, allArticles, isAr]);

  const guidance = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (q.length < 2) return null;

    const isQuestion =
      /\?$/.test(q) ||
      (isAr
        ? /(ما\s+هو|ما\s+هي|كيف|هل|لماذا|متى|أين|كم)/.test(q)
        : /(what|how|can|is|should|why|when|where|price|cost)/.test(q));

    const hits = {
      grouting: /(هبوط|تشققات|تقوية|اساسات|أساسات|foundation|settlement|crack|underpin)/.test(q),
      cavities: /(تكهف|تكهفات|فراغ|تجويف|هبوط\s+مفاجئ|cavity|void|sinkhole|probing)/.test(q),
      geophysics: /(جيوفيزياء|gpr|ert|masw|geophysical|radar)/.test(q),
      request: /(سعر|تكلفة|عرض\s*سعر|quotation|quote|price|cost)/.test(q),
      contact: /(تواصل|اتصال|رقم|واتساب|whatsapp|call|contact)/.test(q),
    };

    const links: Array<{ title: string; href: string }> = [];
    const add = (href: string, titleAr: string, titleEn: string) => {
      if (links.some((l) => l.href === href)) return;
      links.push({ href, title: isAr ? titleAr : titleEn });
    };

    if (hits.grouting) add('/services/grouting', 'خدمة حقن التربة', 'Soil grouting service');
    if (hits.cavities) add('/services/cavity', 'خدمة كشف التكهفات', 'Cavity probing service');
    if (hits.geophysics) add('/services/geophysical', 'حلول جيوفيزيائية', 'Geophysical solutions');

    if (hits.request) add('/request-service', 'اطلب الخدمة / عرض سعر', 'Request service / Quote');
    if (hits.contact) add('/contact', 'تواصل معنا', 'Contact');

    // Always provide a safe next step for business inquiries
    if (!hits.request && !hits.contact && isQuestion) {
      add('/request-service', 'طلب خدمة / زيارة موقع', 'Request service / Site visit');
      add('/contact', 'تواصل معنا', 'Contact');
    }

    const message = isAr
      ? hits.request
        ? 'للتسعير أو عرض السعر: اختر "اطلب الخدمة" أو تواصل معنا، وسنطلب منك التفاصيل الأساسية ونرتب زيارة الموقع.'
        : hits.cavities
          ? 'لو عندك اشتباه فراغ/تكهف: ابدأ بـ كشف التكهفات (Cavity Probing) أو حلول جيوفيزيائية حسب الحالة.'
          : hits.grouting
            ? 'لو عندك هبوط/تشققات: حقن التربة قد يكون مناسباً بعد تقييم السبب ونوع التربة وعمق المعالجة.'
            : hits.geophysics
              ? 'لو تحتاج مسح غير تدميري: GPR/ERT/MASW تساعد في تحديد الفراغات/الطبقات قبل المعالجة.'
              : 'اكتب سؤالك أو كلمة مفتاحية وسأقترح أفضل المقالات والخدمة المناسبة داخل الموقع.'
      : hits.request
        ? 'For pricing/quotes, use “Request service” or contact us and we’ll guide you through the required details.'
        : hits.cavities
          ? 'Suspected void/cavity? Start with cavity probing or a geophysical survey depending on the case.'
          : hits.grouting
            ? 'Settlement/cracks? Soil grouting may help after evaluating the cause, soil type, and treatment depth.'
            : hits.geophysics
              ? 'Need non-destructive survey? GPR/ERT/MASW can help identify layers/voids before treatment.'
              : 'Type a question or keyword and I’ll suggest the best articles and the right section inside the site.';

    const top = results?.[0];
    const quick = top?.excerpt ? { title: top.title, excerpt: top.excerpt, href: `/blog/${top.urlSlug}` } : null;

    return { isQuestion, message, links, quick };
  }, [searchInput, isAr, results]);

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+10.5rem)] md:bottom-24 right-6 z-[60]">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full shadow-lg gap-2 etlaq-assistant-fab"
            aria-label={isAr ? 'مساعد الموقع' : 'Site assistant'}
            type="button"
            onMouseEnter={() => {
              try {
                prefetchArticles();
              } catch {
                /* ignore */
              }
            }}
          >
            <Bot className="h-5 w-5" />
            <span className="hidden sm:inline">{isAr ? 'اسأل مساعد إطلاق' : 'Ask ETLAQ'}</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-xl w-[95vw] sm:w-full max-h-[85vh] overflow-hidden p-0 flex flex-col">
          <div className="p-6 pb-3">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {isAr ? 'مساعد إطلاق الذكي' : 'ETLAQ Smart Assistant'}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="px-6 pb-5 flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-4 etlaq-scrollbar">
            <div className="flex flex-wrap gap-2">
              {INTENTS.map((i) => (
                <LocalizedLink key={i.id} href={i.href} onClick={() => setOpen(false)}>
                  <Badge className="cursor-pointer hover:opacity-90">{isAr ? i.ar : i.en}</Badge>
                </LocalizedLink>
              ))}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {isAr
                ? 'ابحث داخل موسوعة المقالات أو اكتب سؤالك وسيقترح المساعد روابط وخطوات مناسبة داخل الموقع. عند فتح صفحة، سيُغلق المساعد تلقائياً.'
                : 'Search the knowledge base or type a question. The assistant will suggest the best next steps and site links. It closes automatically after navigation.'}
            </p>

            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={
                  isAr ? 'اكتب كلمة أو سؤال مثل: هل ينفع حقن التربة؟' : 'Type a keyword or question like: Is soil grouting suitable?'
                }
              />
            </div>

            {loading && <p className="text-sm text-muted-foreground">{isAr ? 'جاري تحميل المحتوى...' : 'Loading content...'}</p>}

            {!loading && loadError && (
              <div className="etlaq-card rounded-xl border bg-card/60 backdrop-blur p-4">
                <p className="text-sm text-muted-foreground">{loadError}</p>
                <div className="mt-3 flex justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      hasLoadedRef.current = false;
                      setAllArticles([]);
                      setLoadError(null);
                      startLoad();
                    }}
                  >
                    {isAr ? 'إعادة المحاولة' : 'Retry'}
                  </Button>
                </div>
              </div>
            )}

            {!loading && !loadError && guidance && (
              <div className="etlaq-card rounded-xl border bg-card/60 backdrop-blur p-4 space-y-3">
                <div className="text-sm leading-relaxed">{guidance.message}</div>

                {guidance.quick && (
                  <div className="rounded-lg border bg-background/60 p-3">
                    <div className="text-xs text-muted-foreground">{isAr ? 'ملخص سريع من أفضل نتيجة:' : 'Quick snippet from top match:'}</div>
                    <div className="mt-1 font-medium leading-snug">{guidance.quick.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{guidance.quick.excerpt}…</div>
                    <div className="mt-2">
                      <LocalizedLink href={guidance.quick.href} onClick={() => setOpen(false)} className="text-sm underline">
                        {isAr ? 'فتح المقال' : 'Open article'}
                      </LocalizedLink>
                    </div>
                  </div>
                )}

                {guidance.links.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {guidance.links.map((l) => (
                      <LocalizedLink key={`${l.href}-${l.title}`} href={l.href} onClick={() => setOpen(false)}>
                        <Badge className="cursor-pointer hover:opacity-90">{l.title}</Badge>
                      </LocalizedLink>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  <LocalizedLink href="/request-service" onClick={() => setOpen(false)}>
                    <Button type="button">{isAr ? 'اطلب الخدمة' : 'Request service'}</Button>
                  </LocalizedLink>
                  <LocalizedLink href="/contact" onClick={() => setOpen(false)}>
                    <Button type="button" variant="outline">
                      {isAr ? 'تواصل معنا' : 'Contact'}
                    </Button>
                  </LocalizedLink>
                </div>
              </div>
            )}

            {!loading && !loadError && searchInput.trim().length >= 2 && (
              <div className="etlaq-card rounded-xl border bg-card/60 backdrop-blur p-4">
                {results.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {isAr ? 'لا توجد نتائج واضحة. جرّب كلمة مختلفة.' : 'No clear results. Try a different keyword.'}
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {results.map((r) => (
                      <li key={r.urlSlug}>
                        <LocalizedLink
                          href={`/blog/${r.urlSlug}`}
                          className="block rounded-lg p-2 hover:bg-accent transition"
                          onClick={() => setOpen(false)}
                        >
                          <div className="font-medium leading-snug">{r.title}</div>
                          {r.excerpt && <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.excerpt}…</div>}
                          <div className="text-xs text-muted-foreground mt-1">{isAr ? 'عرض المقال' : 'Open article'}</div>
                        </LocalizedLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t flex justify-end bg-background/80 backdrop-blur">
            <Button variant="outline" onClick={() => setOpen(false)} type="button">
              {isAr ? 'إغلاق' : 'Close'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
