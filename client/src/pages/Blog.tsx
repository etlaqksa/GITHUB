import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { User } from 'lucide-react';
import { IconCalendar, IconClock, IconSearch } from '@/components/icons/etlaq';
import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import type { ArticleContent } from '@/data/articles';
import { loadArticles } from '@/data/articlesLoader';
import ProtectedImage from '@/components/ProtectedImage';
import LocalizedLink from '@/components/LocalizedLink';
import { SEO } from '@/components/SEO';
import { absUrl } from '@/lib/siteUrl';
import { getArticleUrlSlug } from '@/lib/articleUrl';
import { getArticleImageName } from '@/data/articleImageMap';

function stripMarkdown(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_>\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripArabic(text: string) {
  // Remove Arabic script ranges to ensure English pages contain no Arabic letters.
  return text.replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, '').replace(/\s+/g, ' ').trim();
}

function estimateReadTime(content: string, lang: 'ar' | 'en') {
  const plain = stripMarkdown(content);
  const words = plain.split(/\s+/).filter(Boolean).length;
  const wpm = lang === 'ar' ? 170 : 220;
  const minutes = Math.max(1, Math.round(words / wpm));
  return lang === 'ar' ? `${minutes} دقيقة` : `${minutes} min`;
}

function getCategories(article: ArticleContent, language: 'ar' | 'en') {
  const raw =
    (language === 'ar'
      ? (article.categoriesAr && article.categoriesAr.length ? article.categoriesAr : [article.category].filter(Boolean))
      : (article.categoriesEn && article.categoriesEn.length ? article.categoriesEn : [article.categoryEn].filter(Boolean))) || [];

  return Array.from(new Set(raw)).filter(Boolean);
}

function getFeaturedImageFallback(article: any) {
  return '/favicon.webp';
}

function ArticleCard({
  article,
  language,
  onPickCategory,
}: {
  article: ArticleContent;
  language: 'ar' | 'en';
  onPickCategory: (cat: string) => void;
}) {
  const title = language === 'ar' ? article.title : stripArabic(article.titleEn || '');
  const content = language === 'ar' ? article.content : stripArabic(article.contentEn || '');
  const excerpt = language === 'ar'
    ? (article.excerpt ?? (stripMarkdown(article.content).slice(0, 220) + (stripMarkdown(article.content).length > 220 ? '…' : '')))
    : (article.excerptEn ?? (stripMarkdown(stripArabic(article.contentEn || '')).slice(0, 220) + (stripMarkdown(stripArabic(article.contentEn || '')).length > 220 ? '…' : '')));

  const cats = getCategories(article, language);
  const imgUrl = `/article-images/card/${language}/${getArticleImageName(article.slug)}.webp`;
  const postSlug = getArticleUrlSlug(article, language);

  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.07]">
      <LocalizedLink href={`/blog/${postSlug}`} className="block relative" aria-label={title}>
          <div className="aspect-[16/9] w-full bg-muted">
            <img src={imgUrl} alt={title} className="w-full h-full object-cover" loading="lazy" draggable={false} onContextMenu={(e) => e.preventDefault()} />
          </div>
        
      </LocalizedLink>

      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-2">
          {cats.slice(0, 3).map(c => (
            <button
              key={c}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPickCategory(c);
              }}
              className="text-left"
              aria-label={language === 'ar' ? `تصفية حسب ${c}` : `Filter by ${c}`}
            >
              <Badge variant="secondary" className="cursor-pointer hover:opacity-90">
                {c}
              </Badge>
            </button>
          ))}
          {cats.length > 3 && <Badge variant="outline">+{cats.length - 3}</Badge>}
        </div>

        <LocalizedLink href={`/blog/${postSlug}`} className="block">
            <CardTitle className="leading-tight hover:underline">
              {title || (language === 'ar' ? 'مقال تقني' : `${article.categoryEn || 'Geotechnics'} Article #${article.id}`)}
            </CardTitle>
          
        </LocalizedLink>

        <CardDescription className="mt-2">
          {excerpt || (language === 'ar' ? 'تفاصيل المقال متاحة داخل الصفحة.' : 'Open the article to read the full English version.')}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <IconCalendar className="h-4 w-4" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <IconClock className="h-4 w-4" />
            <span>{estimateReadTime(language === 'ar' ? article.content : (article.contentEn || ''), language)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{language === 'ar' ? 'فريق إطلاق' : 'Etlaq Team'}</span>
          </div>
        </div>

        <LocalizedLink href={`/blog/${postSlug}`} className="inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium bg-primary text-primary-foreground hover:opacity-95 transition">
            {language === 'ar' ? 'اقرأ المزيد' : 'Read more'}
          
        </LocalizedLink>

      </CardContent>
    </Card>
  );
}

export default function Blog() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const canonical = absUrl(`/${language}/blog`);

  const [, setLocation] = useLocation();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Lazy-load the large encyclopedia dataset.
  const [allArticles, setAllArticles] = useState<ArticleContent[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  useEffect(() => {
    let alive = true;
    setIsLoadingArticles(true);
    loadArticles()
      .then((a) => {
        if (!alive) return;
        setAllArticles(a);
      })
      .finally(() => {
        if (!alive) return;
        setIsLoadingArticles(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const onCategoryClick = (c: string) => {
    setSelectedCategory(c);
    const params = new URLSearchParams(window.location.search);
    params.set('cat', c);
    // Use router navigation so the current language prefix (/ar or /en) is preserved
    setLocation(`/blog?${params.toString()}`, { replace: true } as any);
  };
  const [searchQuery, setSearchQuery] = useState('');

  // support /blog?cat=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat) setSelectedCategory(cat);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    allArticles.forEach(a => {
      const list = getCategories(a, language);
      list.forEach(c => cats.add(c));
    });
    return Array.from(cats).sort((a, b) => a.localeCompare(b));
  }, [language, allArticles]);

  const articles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allArticles
      .filter(a => {
        const cats = getCategories(a, language);
        const matchesCategory = selectedCategory === 'all' ? true : cats.includes(selectedCategory);

        const title = language === 'ar' ? a.title : stripArabic(a.titleEn || '');
        const content = language === 'ar' ? a.content : stripArabic(a.contentEn || '');
        const hay = (title + ' ' + stripMarkdown(content)).toLowerCase();
        const matchesSearch = q ? hay.includes(q) : true;

        return matchesCategory && matchesSearch;
      })
      // Display in encyclopedia order: Article 1 → Article N (stable across languages)
      .sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  }, [language, selectedCategory, searchQuery, allArticles]);

  const pickCategory = (cat: string) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(window.location.search);
    params.set('cat', cat);
    setLocation(`/blog?${params.toString()}`, { replace: true } as any);
  };

  return (
    <>
      <SEO
        title={language === 'ar' ? 'المدونة - إطلاق' : 'Blog - ETLAQ'}
        description={language === 'ar' ? 'مقالات مبسطة وعملية عن حقن التربة، معالجة الهبوط، كشف الفراغات، وتقوية الأساسات.' : 'Practical, reader-friendly articles on soil grouting, settlement mitigation, void detection, and foundation strengthening.'}
        url={canonical}
        image={absUrl('/favicon.webp')}
        type="website"
      />
      <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{language === 'ar' ? 'المدونة' : 'Blog'}</h1>
          <p className="text-muted-foreground">
            {language === 'ar'
              ? 'مقالات هندسية مختصرة وعملية في الجيوتقنية وحقن التربة والأساسات.'
              : 'Practical engineering articles on geotechnics, grouting, soil and foundations.'}
          </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <LocalizedLink href="/services" className="inline-flex">
                <Button variant="secondary" className="w-full sm:w-auto">
                  {language === 'ar' ? 'استكشف الخدمات' : 'Explore services'}
                </Button>
              </LocalizedLink>
              <LocalizedLink href="/projects" className="inline-flex">
                <Button variant="outline" className="w-full sm:w-auto">
                  {language === 'ar' ? 'شاهد دراسات الحالة' : 'See case studies'}
                </Button>
              </LocalizedLink>
            </div>

        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-6 relative">
          <IconSearch className={`pointer-events-none absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isAr ? "right-3" : "left-3"}`} />
          <input
            type="text"
            placeholder={language === 'ar' ? 'ابحث عن مقال...' : 'Search articles...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`w-full ${isAr ? "pr-10 pl-4" : "pl-10 pr-4"} py-2 rounded-lg border bg-background`}
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="h-9"
          >
            {language === 'ar' ? 'الكل' : 'All'}
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => pickCategory(cat)}
              className="h-9"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Articles grid */}
        {isLoadingArticles && allArticles.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            {language === 'ar' ? 'جاري تحميل المقالات…' : 'Loading articles…'}
          </div>
        ) : articles.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            {language === 'ar' ? 'لا توجد نتائج مطابقة للبحث.' : 'No matching results.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} language={language} onPickCategory={pickCategory} />
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
}
