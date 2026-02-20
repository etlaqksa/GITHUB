import { useEffect, useMemo, useRef, useState } from 'react';

import LocalizedLink from '@/components/LocalizedLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { loadArticles, prefetchArticles } from '@/data/articlesLoader';
import { projects } from '@/data/projects';
import { getArticleUrlSlug } from '@/lib/articleUrl';
import { cn } from '@/lib/utils';
import { BookOpen, Briefcase, Contact2, FileText, Search, Wrench, X } from 'lucide-react';

type Filter = 'all' | 'services' | 'articles' | 'projects' | 'request' | 'contact';

type ResultKind = 'service' | 'article' | 'project' | 'request' | 'contact';

type SearchResult = {
  id: string;
  kind: ResultKind;
  href: string;
  title: string;
  description?: string;
  score: number;
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u065F]/g, '') // Arabic diacritics
    .replace(/[^\p{L}\p{N}\s\-_/().]+/gu, ' ') // keep letters/numbers/common separators
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreText(queryTokens: string[], title: string, description: string) {
  if (!queryTokens.length) return 0;
  const t = normalize(title);
  const d = normalize(description);
  const hay = `${t} ${d}`;

  let score = 0;
  const fullQuery = queryTokens.join(' ');
  if (t.includes(fullQuery)) score += 60;
  if (hay.includes(fullQuery)) score += 25;

  for (const tok of queryTokens) {
    if (!tok) continue;
    if (t.includes(tok)) score += 14;
    if (d.includes(tok)) score += 7;
  }

  // Prefer shorter, more specific titles when scores tie
  score += Math.max(0, 12 - Math.min(12, t.length / 10));

  return score;
}

export default function SmartAssistant({
  initialOpen,
  onClose,
}: {
  initialOpen?: boolean;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [open, setOpen] = useState(!!initialOpen);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const [articlesLoaded, setArticlesLoaded] = useState(false);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [articlesError, setArticlesError] = useState<string | null>(null);
  const [articles, setArticles] = useState<any[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Allow the launcher to re-open the dialog without forcing a full page refresh.
  useEffect(() => {
    if (typeof initialOpen === 'boolean') setOpen(initialOpen);
  }, [initialOpen]);

  useEffect(() => {
    if (!open) return;
    // Preload the chunk very lightly (no parsing until needed).
    prefetchArticles();
    window.setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const ensureArticles = async () => {
    if (articlesLoaded || articlesLoading) return;
    setArticlesLoading(true);
    setArticlesError(null);
    try {
      const loaded = await loadArticles();
      setArticles(loaded);
      setArticlesLoaded(true);
    } catch (e: any) {
      setArticlesError(e?.message || 'Failed to load articles');
    } finally {
      setArticlesLoading(false);
    }
  };

  // Load articles when the user starts searching (or explicitly filters to articles).
  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (filter === 'articles' || q.length >= 2) {
      void ensureArticles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, query, filter]);

  const staticItems = useMemo(() => {
    const services: Array<Omit<SearchResult, 'score'>> = isAr
      ? [
          {
            id: 'svc-grouting',
            kind: 'service',
            href: '/services/grouting',
            title: 'حقن تربة',
            description: 'تقوية وتحسين التربة وتثبيت الأساسات بحقن مواد مناسبة للحالة.',
          },
          {
            id: 'svc-cavity',
            kind: 'service',
            href: '/services/cavity',
            title: 'كشف تكهفات بالتخريم (Cavity Probing)',
            description: 'تحديد مواقع الفراغات والتكهفات بدقة عبر التخريم والتحقق الميداني.',
          },
          {
            id: 'svc-geophysics',
            kind: 'service',
            href: '/services/geophysical',
            title: 'حلول جيوفيزيائية (GPR/ERT/MASW)',
            description: 'مسح غير إتلافي للكشف عن الفراغات والطبقات والمخاطر تحت السطح.',
          },
        ]
      : [
          {
            id: 'svc-grouting',
            kind: 'service',
            href: '/services/grouting',
            title: 'Soil Grouting',
            description: 'Improve soil properties and stabilize foundations with suitable grouting methods.',
          },
          {
            id: 'svc-cavity',
            kind: 'service',
            href: '/services/cavity',
            title: 'Cavity Probing',
            description: 'Field verification and probing to accurately detect voids and cavities.',
          },
          {
            id: 'svc-geophysics',
            kind: 'service',
            href: '/services/geophysical',
            title: 'Geophysical Solutions (GPR/ERT/MASW)',
            description: 'Non-destructive subsurface surveys to detect voids, layers, and risks.',
          },
        ];

    const proj: Array<Omit<SearchResult, 'score'>> = projects.map((p: any) => ({
      id: `prj-${p.slug}`,
      kind: 'project',
      href: `/projects/${p.slug}`,
      title: (isAr ? p.title?.ar : p.title?.en) || p.slug,
      description: (isAr ? p.summary?.ar : p.summary?.en) || '',
    }));

    const request: Array<Omit<SearchResult, 'score'>> = [
      {
        id: 'page-request',
        kind: 'request',
        href: '/request-service',
        title: isAr ? 'طلب خدمة' : 'Request a Service',
        description: isAr
          ? 'أرسل تفاصيل الحالة وسنعاود التواصل لتقديم الحل الأنسب.'
          : 'Send your case details and we will contact you with the best solution.',
      },
    ];

    const contact: Array<Omit<SearchResult, 'score'>> = [
      {
        id: 'page-contact',
        kind: 'contact',
        href: '/contact',
        title: isAr ? 'تواصل معنا' : 'Contact Us',
        description: isAr
          ? 'اتصال، واتساب، أو إرسال رسالة مباشرة لفريق إطلاق.'
          : 'Call, WhatsApp, or send a message directly to ETLAQ.',
      },
    ];

    return [...services, ...proj, ...request, ...contact];
  }, [isAr]);

  const results = useMemo(() => {
    const q = normalize(query);
    const tokens = q.split(' ').filter(Boolean).slice(0, 8);

    const allowKind = (k: ResultKind) => {
      if (filter === 'all') return true;
      if (filter === 'services') return k === 'service';
      if (filter === 'articles') return k === 'article';
      if (filter === 'projects') return k === 'project';
      if (filter === 'request') return k === 'request';
      if (filter === 'contact') return k === 'contact';
      return true;
    };

    const base: SearchResult[] = staticItems
      .filter((it) => allowKind(it.kind))
      .map((it) => ({
        ...it,
        score: scoreText(tokens, it.title, it.description || ''),
      }))
      .filter((r) => (tokens.length ? r.score > 0 : true));

    const articleResults: SearchResult[] =
      articlesLoaded && allowKind('article')
        ? articles
            .map((a) => {
              // Support both legacy and current article field names.
              const title = (isAr ? a.titleAr || a.title : a.titleEn || a.title) || '';
              const desc = (isAr ? a.excerptAr || a.excerpt : a.excerptEn || a.excerpt) || '';
              const slug = getArticleUrlSlug(a, language);
              return {
                id: `art-${slug}`,
                kind: 'article' as const,
                href: `/blog/${slug}`,
                title,
                description: desc,
                score: scoreText(tokens, title, desc),
              };
            })
            .filter((r) => (tokens.length ? r.score > 0 : true))
        : [];

    const combined = [...base, ...articleResults]
      .filter((r) => allowKind(r.kind))
      .sort((a, b) => b.score - a.score)
      .slice(0, 18);

    // If empty query: show a curated short list.
    // Requested: do NOT suggest projects by default on first open.
    if (!tokens.length) {
      const curatedOrder: ResultKind[] = ['service', 'request', 'contact', 'article', 'project'];
      const curated = combined
        .sort((a, b) => curatedOrder.indexOf(a.kind) - curatedOrder.indexOf(b.kind));

      const withoutProjects = filter === 'all' ? curated.filter((r) => r.kind !== 'project') : curated;
      return withoutProjects.slice(0, 12);
    }

    return combined;
  }, [query, filter, staticItems, articlesLoaded, articles, isAr]);

  const filterOptions = useMemo(
    () =>
      (
        isAr
          ? [
              { id: 'all', label: 'الكل' },
              { id: 'services', label: 'خدمات' },
              { id: 'articles', label: 'مقالات' },
              { id: 'projects', label: 'مشاريع' },
              { id: 'request', label: 'طلب خدمة' },
              { id: 'contact', label: 'تواصل' },
            ]
          : [
              { id: 'all', label: 'All' },
              { id: 'services', label: 'Services' },
              { id: 'articles', label: 'Articles' },
              { id: 'projects', label: 'Projects' },
              { id: 'request', label: 'Request' },
              { id: 'contact', label: 'Contact' },
            ]
      ) as Array<{ id: Filter; label: string }>,
    [isAr]
  );

  const kindLabel = (k: ResultKind) => {
    if (isAr) {
      return k === 'service'
        ? 'خدمة'
        : k === 'article'
          ? 'مقال'
          : k === 'project'
            ? 'مشروع'
            : k === 'request'
              ? 'طلب خدمة'
              : 'تواصل';
    }
    return k === 'service'
      ? 'Service'
      : k === 'article'
        ? 'Article'
        : k === 'project'
          ? 'Project'
          : k === 'request'
            ? 'Request'
            : 'Contact';
  };

  const kindIcon = (k: ResultKind) => {
    return k === 'service'
      ? Wrench
      : k === 'article'
        ? FileText
        : k === 'project'
          ? Briefcase
          : k === 'request'
            ? BookOpen
            : Contact2;
  };

  const close = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) onClose();
      }}
    >
      <DialogContent
        className={cn('max-w-2xl p-0 overflow-hidden', isAr ? 'text-right' : 'text-left')}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div className="p-4 sm:p-5 border-b bg-background/80 backdrop-blur">
          <DialogHeader className={cn(isAr ? 'text-right sm:text-right' : 'text-left sm:text-left')}>
            <div className="flex items-start justify-between gap-3 rtl:flex-row-reverse">
              <div>
                <DialogTitle className="text-lg sm:text-xl font-extrabold">
                  {isAr ? 'بحث الموقع' : 'Site Search'}
                </DialogTitle>
                <DialogDescription>
                  {isAr
                    ? 'اكتب كلمات للبحث داخل الخدمات والمقالات والمشاريع.'
                    : 'Type keywords to search services, articles, and projects.'}
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={close}
                aria-label={isAr ? 'إغلاق' : 'Close'}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          <div className="mt-4 flex items-center gap-3 rtl:flex-row-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isAr
                    ? 'ابحث بكلمات مثل: حقن تربة، تكهفات، GPR…'
                    : 'Search keywords: grouting, cavities, GPR…'
                }
                className={cn(
                  'pl-9 rtl:pl-3 rtl:pr-9 h-11 rounded-xl text-base bg-background focus-visible:ring-secondary/50',
                  isAr ? 'text-right placeholder:text-right' : 'text-left'
                )}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 rtl:flex-row-reverse">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFilter(opt.id)}
                className={cn(
                  'px-3 py-1.5 rounded-full border text-xs font-semibold transition',
                  filter === opt.id
                    ? 'bg-secondary/15 border-secondary/40 text-secondary-foreground'
                    : 'bg-background border-border hover:bg-accent'
                )}
                aria-pressed={filter === opt.id}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {articlesLoading ? (
            <div className="mt-3 text-xs text-muted-foreground">
              {isAr ? 'جاري تحميل المقالات…' : 'Loading articles…'}
            </div>
          ) : null}
          {articlesError ? (
            <div className="mt-3 text-xs text-destructive">
              {isAr ? 'تعذر تحميل المقالات.' : 'Failed to load articles.'}
            </div>
          ) : null}
        </div>

        <div className="max-h-[60vh] overflow-auto p-2 sm:p-3">
          {results.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              {isAr
                ? 'لا توجد نتائج. جرّب كلمات أقصر أو غيّر الفلتر.'
                : 'No results. Try fewer keywords or change the filter.'}
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((r) => {
                const Icon = kindIcon(r.kind);
                return (
                  <LocalizedLink
                    key={r.id}
                    href={r.href}
                    onClick={() => close()}
                    className={cn(
                      'group block rounded-xl border bg-card p-3 sm:p-4 transition',
                      'hover:bg-accent/40 hover:border-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60'
                    )}
                  >
                    <div className="flex items-start gap-3 rtl:flex-row-reverse">
                      <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 rtl:flex-row-reverse">
                          <div className="font-extrabold leading-tight truncate">{r.title}</div>
                          <Badge variant="secondary" className="shrink-0">
                            {kindLabel(r.kind)}
                          </Badge>
                        </div>
                        {r.description ? (
                          <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {r.description}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </LocalizedLink>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
