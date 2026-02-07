import { useEffect, useMemo, useRef, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ArticleContent } from '@/data/articles';
import { loadArticles } from '@/data/articlesLoader';
import { SEO } from '@/components/SEO';
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import LocalizedLink from '@/components/LocalizedLink';
import { absUrl } from '@/lib/siteUrl';
import { buildLocalBusinessSchema } from '@/lib/companyProfile';
import { buildBreadcrumbList } from '@/lib/schemaHelpers';
import RelatedLinksHub from '@/components/RelatedLinksHub';
import Breadcrumbs from '@/components/Breadcrumbs';

function stripMarkdown(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_>\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function estimateReadTime(content: string, language: 'ar' | 'en') {
  const plain = stripMarkdown(content);
  const words = plain.split(/\s+/).filter(Boolean).length;
  const wpm = language === 'ar' ? 170 : 220;
  const minutes = Math.max(1, Math.round(words / wpm));
  return language === 'ar' ? `${minutes} دقيقة` : `${minutes} min`;
}

function getCategories(article: ArticleContent, language: 'ar' | 'en') {
  const raw =
    (language === 'ar'
      ? (article.categoriesAr && article.categoriesAr.length ? article.categoriesAr : [article.category].filter(Boolean))
      : (article.categoriesEn && article.categoriesEn.length ? article.categoriesEn : [article.categoryEn].filter(Boolean))) || [];
  return raw.filter(Boolean);
}

/**
 * Remove Arabic characters from an English article *without* destroying newlines.
 * This is important for Markdown tables/lists to render correctly.
 */

function buildFaqSchema(items: { question: string; answer: string }[], pageUrl: string) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
    url: pageUrl,
  };
}

function buildArticleSchema(params: { title: string; description: string; url: string; image?: string; date?: string; author?: string; language?: 'ar' | 'en' }) {
  const org = {
    '@type': 'Organization',
    name: 'شركة إطلاق المتميزة المحدودة (ETLAQ)',
    url: absUrl('/'),
    logo: absUrl('/logo.png'),
  };

  return {
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: params.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': params.url },
    image: params.image ? [params.image] : undefined,
    datePublished: params.date,
    dateModified: params.date,
    inLanguage: params.language,
    author: params.author ? { '@type': 'Person', name: params.author } : undefined,
    publisher: org,
  };
}
function normalizeEnglishContent(input: string) {
  return (
    input
      // remove Arabic letters only
      .replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, '')
      // normalize spaces but keep line breaks
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

export default function BlogPost() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [, params] = useRoute<{ slug: string }>('/blog/:slug');
  const [, setLocation] = useLocation();

  // Lazy-load the large encyclopedia dataset.
  const [allArticles, setAllArticles] = useState<ArticleContent[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  useEffect(() => {
    let alive = true;
    setIsLoadingArticles(true);
    loadArticles()
      .then((a) => {
        if (!alive) return;
        setAllArticles(Array.isArray(a) ? a : []);
      })
      .catch(() => {
        if (!alive) return;
        setAllArticles([]);
      })
      .finally(() => {
        if (!alive) return;
        setIsLoadingArticles(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const swipeRef = useRef<HTMLDivElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const article = useMemo(() => {
    const slug = params?.slug;
    if (!slug) return null;
    return allArticles.find((a) => a.slug === slug) || null;
  }, [params?.slug, allArticles]);

  const title = useMemo(() => {
    if (!article) return '';
    return language === 'ar' ? article.title : (article.titleEn || article.title);
  }, [article, language]);

  const description = useMemo(() => {
    if (!article) return '';
    const raw = language === 'ar' ? article.content : (article.contentEn || article.content);
    return stripMarkdown(raw).slice(0, 160);
  }, [article, language]);

  const cats = useMemo(() => (article ? getCategories(article, language) : []), [article, language]);

  const contentRaw = useMemo(() => {
    if (!article) return '';
    if (language === 'ar') return article.content || '';
    return normalizeEnglishContent(article.contentEn || article.content || '');
  }, [article, language]);
  const readTime = useMemo(() => estimateReadTime(contentRaw, language), [contentRaw, language]);
  const pageUrl = useMemo(() => absUrl(`/${language}/blog/${article?.slug || ''}`), [language, article?.slug]);

  const ogImage = useMemo(() => {
    const candidate =
      article?.image?.url ||
      (article?.slug ? `/article-images/hero/${article.slug}.svg` : '/og-image.webp');
    return absUrl(candidate);
  }, [article?.image?.url, article?.slug]);

  const relatedSignals = useMemo(() => {
    if (!article) return [title, description, contentRaw.slice(0, 200)].filter(Boolean) as string[];
    return [
      title,
      description,
      article.category,
      article.categoryEn,
      ...(article.categoriesAr || []),
      ...(article.categoriesEn || []),
      // light content signal
      contentRaw.slice(0, 300),
    ].filter(Boolean) as string[];
  }, [article, title, description, contentRaw]);


  const faqItems = useMemo(() => {
    if (!article) return [] as { question: string; answer: string }[];
    return (language === 'ar' ? (article.faqAr || []) : (article.faqEn || [])) as { question: string; answer: string }[];
  }, [article, language]);

const schema = useMemo(() => {
    if (!article) return undefined;
    const image = absUrl(`/article-images/hero/${article.slug}.svg`);
    const graph: any[] = [];

    // Organization (minimal, consistent)
    const localBusinessSchema = buildLocalBusinessSchema({ url: absUrl('/'), logoUrl: absUrl('/logo.png') });
    graph.push(localBusinessSchema);

    graph.push({
      '@type': 'Organization',
      name: 'شركة إطلاق المتميزة المحدودة (ETLAQ)',
      url: absUrl('/'),
      logo: absUrl('/logo.png'),
    });

    graph.push({
      '@type': 'WebPage',
      name: title,
      url: pageUrl,
    });

    graph.push(buildArticleSchema({
      title,
      description,
      url: pageUrl,
      image,
      date: article.date,
      author: article.author,
      language: language as 'ar' | 'en',
    }));

    if (faqItems.length) {
      graph.push(buildFaqSchema(faqItems, pageUrl));
    }

    return { '@context': 'https://schema.org', '@graph': graph };
  }, [article, title, description, pageUrl, faqItems, language]);

  const { prevArticle, nextArticle } = useMemo(() => {
    if (!article) return { prevArticle: null as ArticleContent | null, nextArticle: null as ArticleContent | null };

    // Keep the same sequence used by the blog listing ([] array order),
    // but only include items that have content in the current language.
    const list = allArticles.filter((a) => (language === 'ar' ? Boolean(a.title && a.content) : Boolean(a.titleEn && a.contentEn)));
    // Keep a stable order
    list.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    const idx = list.findIndex((a) => a.slug === article.slug);
    return {
      prevArticle: idx > 0 ? list[idx - 1] : null,
      nextArticle: idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null,
    };
  }, [article, language, allArticles]);

  const goPrev = () => {
    if (!prevArticle) return;
    setLocation(`/blog/${prevArticle.slug}`);
  };

  const goNext = () => {
    if (!nextArticle) return;
    setLocation(`/blog/${nextArticle.slug}`);
  };

  // Swipe navigation (mobile): ignore vertical scroll and ignore swipes that start inside horizontally scrollable areas.
  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;

    const isInsideHorizontallyScrollable = (target: EventTarget | null) => {
      const node = target as HTMLElement | null;
      if (!node) return false;
      const scrollable = node.closest('[data-swipe-ignore="true"], pre, code, table, .overflow-x-auto');
      return Boolean(scrollable);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isInsideHorizontallyScrollable(e.target)) return;
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const start = touchStart.current;
      touchStart.current = null;

      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;

      // require strong horizontal swipe
      if (Math.abs(dx) < 70) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.5) return;

      if (language === 'ar') {
        // RTL: swipe right => next, swipe left => prev
        if (dx > 0) goNext();
        else goPrev();
      } else {
        // LTR: swipe left => next, swipe right => prev
        if (dx < 0) goNext();
        else goPrev();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart as any);
      el.removeEventListener('touchend', onTouchEnd as any);
    };
  }, [language, prevArticle, nextArticle]);

  const slug = params?.slug ?? '';
  const heroPrimary = slug ? `/article-images/hero/${slug}.svg` : '/og-image.webp';
  const heroSecondary = slug ? `/article-images/card/${slug}.svg` : '/og-image.webp';

  function getFeaturedImageFallback(a: ArticleContent) {
    const images = [
      '/article-images/BgIZ2EdQDXxT.jpg',
      '/article-images/N8at6vPLLTnL.jpg',
      '/article-images/hc80ziJxWYDl.jpg',
      '/article-images/S9hx4uBY7U5n.jpg',
      '/article-images/fjZxgrX7pS3N.jpg',
      '/article-images/bgeXnZzqGuIE.jpg',
      '/article-images/u66IptamGAlr.jpg',
      '/article-images/KDvxyzgE6fPZ.webp',
    ];

    const cat = (a.categoryEn || a.category || '').toLowerCase();
    if (cat.includes('grout') || cat.includes('حقن')) return images[0];
    if (cat.includes('settlement') || cat.includes('هبوط')) return images[6];
    if (cat.includes('cavity') || cat.includes('sinkhole') || cat.includes('تكهفات')) return images[2];
    if (cat.includes('crack') || cat.includes('تشققات')) return images[5];
    if (cat.includes('soil') || cat.includes('تربة')) return images[1];

    const n = typeof a.id === 'number' ? a.id : (a.slug || '').length;
    return images[n % images.length];
  }

  const fallbackHero = article ? getFeaturedImageFallback(article) : '/og-image.webp';
  const [heroSrc, setHeroSrc] = useState<string>(heroPrimary);

  useEffect(() => {
    setHeroSrc(heroPrimary);
  }, [heroPrimary]);

  const handleHeroError = () => {
    // try secondary size if hero missing, then curated fallback
    if (heroSrc === heroPrimary) return setHeroSrc(heroSecondary);
    if (heroSrc === heroSecondary) return setHeroSrc(fallbackHero);
    return setHeroSrc('/og-image.webp');
  };


  if (isLoadingArticles) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center text-muted-foreground">
          {language === 'ar' ? 'جاري تحميل المقال…' : 'Loading article…'}
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <Breadcrumbs
              items={[
                { name: language === 'ar' ? 'المدونة' : 'Blog', href: '/blog' },
                { name: title, href: `/blog/${params?.slug ?? ''}`, isCurrent: true },
              ]}
            />

            <h1 className="text-3xl font-bold mb-4">{language === 'ar' ? 'المقال غير موجود' : 'Article not found'}</h1>
          <LocalizedLink href="/blog" className="text-primary underline">
            {language === 'ar' ? 'العودة للمقالات' : 'Back to blog'}
          </LocalizedLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SEO title={title} description={description} image={ogImage} url={pageUrl} type="article" schema={schema} />
      <div className="max-w-4xl mx-auto" ref={swipeRef}>
        <LocalizedLink href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            {language === 'ar' ? 'رجوع للمقالات' : 'Back to blog'}
          
        </LocalizedLink>

        {/* Side navigation (desktop + mobile small buttons) */}
        {(prevArticle || nextArticle) && (
          <>
            {/* Desktop: labeled pill buttons */}
            <div className="hidden md:block">
              {prevArticle ? (
                <button
                  type="button"
                  onClick={goPrev}
                  className="fixed left-6 top-1/2 -translate-y-1/2 z-50 rounded-full bg-primary text-primary-foreground shadow-2xl px-4 py-3 flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-primary/40"
                  aria-label={language === 'ar' ? 'المقال السابق' : 'Previous article'}
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="hidden lg:inline font-semibold">{language === 'ar' ? 'المقال السابق' : 'Previous'}</span>
                </button>
              ) : null}

              {nextArticle ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="fixed right-6 top-1/2 -translate-y-1/2 z-50 rounded-full bg-primary text-primary-foreground shadow-2xl px-4 py-3 flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-primary/40"
                  aria-label={language === 'ar' ? 'المقال التالي' : 'Next article'}
                >
                  <span className="hidden lg:inline font-semibold">{language === 'ar' ? 'المقال التالي' : 'Next'}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              ) : null}
            </div>

            {/* Mobile: small edge buttons */}
            <div className="md:hidden">
              {prevArticle ? (
                <button
                  type="button"
                  onClick={goPrev}
                  className="fixed left-2 top-1/2 -translate-y-1/2 z-50 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  aria-label={language === 'ar' ? 'المقال السابق' : 'Previous article'}
                >
                  {language === 'ar' ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
                </button>
              ) : null}

              {nextArticle ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="fixed right-2 top-1/2 -translate-y-1/2 z-50 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  aria-label={language === 'ar' ? 'المقال التالي' : 'Next article'}
                >
                  {language === 'ar' ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                </button>
              ) : null}

              <div className="pointer-events-none fixed bottom-2 left-1/2 -translate-x-1/2 z-40 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                {language === 'ar' ? 'اسحب يمينًا/يسارًا للتنقل' : 'Swipe left/right to navigate'}
              </div>
            </div>
          </>
        )}

        <div className="bg-background rounded-2xl border border-border shadow-sm p-6 md:p-8">
          {/* Cover */}
          {heroSrc ? (
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted mb-5">
              <img
                src={heroSrc}
                alt={title}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onError={handleHeroError}
              />
            </div>
          ) : null}

          <h1 className="text-3xl font-bold leading-tight mb-3">{title}</h1>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => {
                  window.location.href = `/blog?cat=${encodeURIComponent(c)}`;
                }}
                className="focus:outline-none"
              >
                <Badge variant="secondary" className="cursor-pointer hover:opacity-90">
                  {c}
                </Badge>
              </button>
            ))}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{language === 'ar' ? 'فريق إطلاق' : 'Etlaq Team'}</span>
            </div>
            {article.date ? (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
            ) : null}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Content */}
          <article
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            lang={language === 'ar' ? 'ar' : 'en'}
            className={`prose prose-slate dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-primary
              prose-p:text-foreground/90 prose-p:leading-8 prose-p:text-base md:prose-p:text-lg
              prose-strong:text-foreground prose-strong:font-bold
              prose-ul:list-disc prose-ul:pl-5 prose-li:my-1
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-table:w-full prose-th:whitespace-nowrap
              ${language === 'ar' ? 'rtl prose-headings:text-right prose-p:text-right prose-li:text-right' : 'ltr'}`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                table: ({ children, ...props }) => (
                  <div className="my-8 w-full overflow-x-auto rounded-lg border border-border">
                    <table className="w-full border-collapse" {...props}>
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children, ...props }) => (
                  <th className="bg-muted px-3 py-2 text-left font-semibold border border-border" {...props}>
                    {children}
                  </th>
                ),
                td: ({ children, ...props }) => (
                  <td className="px-3 py-2 align-top border border-border" {...props}>
                    {children}
                  </td>
                ),
                a: ({ href, children, ...props }) => {
                  const h = String(href || '');
                  const isInternal = h.startsWith('/') && !h.startsWith('//');
                  if (isInternal) {
                    return (
                      <LocalizedLink href={h} className="text-primary underline underline-offset-4">
                        {children}
                      </LocalizedLink>
                    );
                  }
                  return (
                    <a
                      href={h}
                      target={h.startsWith('http') ? '_blank' : undefined}
                      rel={h.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-primary underline underline-offset-4"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                },
                // Make images responsive
                img: ({ ...props }) => (
                  <img
                    loading="lazy"
                    decoding="async"
                    className="rounded-xl border border-border max-w-full h-auto"
                    {...props}
                  />
                ),
                // Prevent swipe on scrollable blocks
                pre: ({ children, ...props }) => (
                  <pre data-swipe-ignore="true" tabIndex={0} className="overflow-x-auto" {...props}>
                    {children}
                  </pre>
                ),
                code: ({ inline, children, ...props }) =>
                  inline ? (
                    <code className="rounded bg-muted px-1.5 py-0.5" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code {...props}>{children}</code>
                  ),
              }}
            >
              {contentRaw}
            </ReactMarkdown>
          </article>

          {((language === 'ar' ? article.faqAr : article.faqEn) || []).length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {((language === 'ar' ? article.faqAr : article.faqEn) || []).map((f: any, idx: number) => (
                  <AccordionItem key={String(idx)} value={String(idx)}>
                    <AccordionTrigger className="text-right">
                      <span className={language === 'ar' ? 'text-right' : 'text-left'}>{f.question}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">{f.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          <RelatedLinksHub signals={relatedSignals} />
        </div>
      </div>
    </div>
  );
}
