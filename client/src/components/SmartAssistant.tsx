import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { Bot, Search, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { loadArticles, prefetchArticles } from '@/data/articlesLoader';
import LocalizedLink from '@/components/LocalizedLink';
import { getArticleUrlSlug } from '@/lib/articleUrl';

type Result = { urlSlug: string; title: string; score: number };
type AiLink = { title: string; href: string };

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

  const [mode, setMode] = useState<'search' | 'ask'>('search');

  const [searchInput, setSearchInput] = useState('');
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [question, setQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLinks, setAiLinks] = useState<AiLink[]>([]);
  const [aiCta, setAiCta] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const askAbortRef = useRef<AbortController | null>(null);

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

  // Load the articles only when the assistant is open *and* in search mode.
  useEffect(() => {
    if (!open) return;
    if (mode !== 'search') return;
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
  }, [open, mode, isAr]);

  // Reset transient states on close
  useEffect(() => {
    if (open) return;
    setAiLoading(false);
    setAiError(null);
    askAbortRef.current?.abort();
    askAbortRef.current = null;
  }, [open]);

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
        const excerpt = isAr ? String(a.content || '').slice(0, 600) : String(a.contentEn || a.content || '').slice(0, 600);
        const hay = `${title} ${cats} ${excerpt}`.toLowerCase();

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
        return { urlSlug, title, score: s };
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

  const askGemini = async () => {
    const q = question.trim();
    if (q.length < 2) return;

    askAbortRef.current?.abort();
    const ac = new AbortController();
    askAbortRef.current = ac;

    setAiLoading(true);
    setAiError(null);
    setAiCta('');
    // Keep previous answer visible while refreshing (feels instant)
    try {
      const res = await fetch('/.netlify/functions/gemini-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, language }),
        signal: ac.signal,
      });

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok) {
        throw new Error(data?.error || 'Request failed');
      }

      setAiAnswer(String(data?.answer || '').trim());
      setAiLinks(Array.isArray(data?.links) ? data.links : []);
      setAiCta(String(data?.cta || '').trim());
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
      setAiError(isAr ? 'تعذر الحصول على إجابة الآن. جرّب مرة أخرى.' : 'Could not get an answer right now. Please retry.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+10.5rem)] md:bottom-24 right-6 z-[60]">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full shadow-lg gap-2"
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
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant={mode === 'search' ? 'default' : 'outline'}
                className="gap-2"
                onClick={() => setMode('search')}
              >
                <Search className="h-4 w-4" />
                {isAr ? 'بحث' : 'Search'}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={mode === 'ask' ? 'default' : 'outline'}
                className="gap-2"
                onClick={() => setMode('ask')}
              >
                <MessageSquare className="h-4 w-4" />
                {isAr ? 'اسأل' : 'Ask'}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {INTENTS.map((i) => (
                <LocalizedLink key={i.id} href={i.href} onClick={() => setOpen(false)}>
                  <Badge className="cursor-pointer hover:opacity-90">{isAr ? i.ar : i.en}</Badge>
                </LocalizedLink>
              ))}
            </div>

            {mode === 'search' ? (
              <>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr
                    ? 'ابحث داخل موسوعة المقالات أو اختر ما تريد بسرعة. عند فتح صفحة، سيُغلق المساعد تلقائياً.'
                    : 'Search the knowledge base or jump to key pages. The assistant closes automatically after navigation.'}
                </p>

                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={isAr ? 'اكتب كلمة مثل: GPR أو حقن التربة...' : 'Type a keyword like: GPR or soil grouting...'}
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
                              <div className="text-xs text-muted-foreground mt-1">{isAr ? 'عرض المقال' : 'Open article'}</div>
                            </LocalizedLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr
                    ? 'اكتب سؤالك وسأقترح عليك أفضل خطوة وروابط مناسبة داخل الموقع.'
                    : 'Ask a question and I will suggest the best next step with relevant site links.'}
                </p>

                <div className="space-y-2">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder={
                      isAr
                        ? 'مثال: عندي هبوط وتشققات، هل ينفع حقن تربة؟'
                        : 'Example: I have settlement and cracks — is soil grouting suitable?'
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        askGemini();
                      }
                    }}
                  />
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setQuestion('');
                        setAiAnswer('');
                        setAiLinks([]);
                        setAiCta('');
                        setAiError(null);
                      }}
                    >
                      {isAr ? 'مسح' : 'Clear'}
                    </Button>
                    <Button type="button" onClick={askGemini} disabled={aiLoading || question.trim().length < 2}>
                      {aiLoading ? (isAr ? 'جاري الإجابة...' : 'Answering...') : isAr ? 'اسأل الآن' : 'Ask'}
                    </Button>
                  </div>
                </div>

                {aiError && (
                  <div className="etlaq-card rounded-xl border bg-card/60 backdrop-blur p-4">
                    <p className="text-sm text-muted-foreground">{aiError}</p>
                    <div className="mt-3 flex justify-end">
                      <Button type="button" onClick={askGemini}>
                        {isAr ? 'إعادة المحاولة' : 'Retry'}
                      </Button>
                    </div>
                  </div>
                )}

                {(aiAnswer || aiLoading) && !aiError && (
                  <div className="etlaq-card rounded-xl border bg-card/60 backdrop-blur p-4 space-y-3">
                    {aiLoading && !aiAnswer ? (
                      <p className="text-sm text-muted-foreground">{isAr ? 'جاري توليد الإجابة...' : 'Generating answer...'}</p>
                    ) : (
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">{aiAnswer}</div>
                    )}

                    {aiCta && <div className="text-sm font-medium">{aiCta}</div>}

                    {aiLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {aiLinks.map((l) => (
                          <LocalizedLink key={`${l.href}-${l.title}`} href={l.href} onClick={() => setOpen(false)}>
                            <Badge className="cursor-pointer hover:opacity-90">{l.title}</Badge>
                          </LocalizedLink>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
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
              </>
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
