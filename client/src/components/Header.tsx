import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { mapPathToLang } from '@/lib/mapPathToLang';
import { useTheme, ColorTheme } from '@/contexts/ThemeContext';
import { Menu, X, Palette, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import LocalizedLink from '@/components/LocalizedLink';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { colorTheme, setColorTheme } = useTheme();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktopModeMobile, setIsDesktopModeMobile] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    if (themeMenuOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [themeMenuOpen]);

  const handleThemeChange = (theme: ColorTheme) => {
    setColorTheme(theme);
    setThemeMenuOpen(false);
  };

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.faq'), href: '/faq' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const toggleLanguage = () => {
    const next = language === 'ar' ? 'en' : 'ar';
    const pathname = window.location.pathname || '/';
    const search = window.location.search || '';
    const hash = window.location.hash || '';
    const targetPath = mapPathToLang(pathname, next as any);
    setLanguage(next);
    window.location.assign(`${targetPath}${search}${hash}`);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia?.('(pointer: coarse)');
    const compute = () => {
      const isTouch = mq ? mq.matches : false;
      const w = window.innerWidth || 0;
      setIsMobile(w < 768);
      setIsDesktopModeMobile(isTouch && w >= 768 && w < 1100);
      if (w >= 768) setMobileMenuOpen(false);
    };
    compute();
    window.addEventListener('resize', compute);
    if (mq?.addEventListener) mq.addEventListener('change', compute);
    return () => {
      window.removeEventListener('resize', compute);
      if (mq?.removeEventListener) mq.removeEventListener('change', compute);
    };
  }, []);

  const themes = [
    { id: 'blue', color: '#0ea5e9', ar: 'الأزرق الكلاسيكي', en: 'Classic Blue' },
    { id: 'green', color: '#22c55e', ar: 'الأخضر الطبيعي', en: 'Natural Green' },
    { id: 'orange', color: '#f97316', ar: 'البرتقالي الحيوي', en: 'Vibrant Orange' },
    { id: 'purple', color: '#a855f7', ar: 'البنفسجي الملكي', en: 'Royal Purple' },
    { id: 'red', color: '#ef4444', ar: 'الأحمر القوي', en: 'Bold Red' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/' || location === '';
    return location.startsWith(href);
  };

  return (
    <header
      className={"sticky top-[var(--etlaq-topbar-h)] z-50 w-full transition-all duration-300 " + (
        scrolled
          ? 'bg-background/98 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.08)] border-b border-border/60'
          : 'bg-background/95 backdrop-blur-sm border-b border-border/40'
      )}
    >
      <nav className="container flex h-[68px] items-center justify-between gap-2 min-w-0">

        {/* Logo */}
        <LocalizedLink href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <img
              src="/logo-160.webp?v=5"
              srcSet="/logo-160.webp?v=5 160w, /logo-224.webp?v=5 224w, /logo-320.webp?v=5 320w, /logo.webp?v=5 448w"
              sizes="(max-width: 640px) 80px, 96px"
              alt="شركة إطلاق المتميزة"
              width="224"
              height="112"
              className="h-10 sm:h-11 w-auto object-contain transition-all duration-300 group-hover:scale-[1.04]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </LocalizedLink>

        {/* Desktop Navigation */}
        <div
          className={
            isMobile
              ? 'hidden'
              : isDesktopModeMobile
              ? 'relative flex flex-1 min-w-0 items-center'
              : 'hidden md:flex flex-1 items-center justify-center'
          }
          aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
        >
          <div className="flex items-center gap-0.5 flex-nowrap overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <LocalizedLink key={item.href} href={item.href}>
                  <button
                    type="button"
                    className={"relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap " + (
                      active
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground/70 hover:text-foreground hover:bg-muted/60'
                    )}
                  >
                    {item.name}
                    {active && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                </LocalizedLink>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">

          {/* CTA */}
          <LocalizedLink href="/request-service" className="shrink-0">
            <Button
              size="sm"
              className="gap-1.5 font-bold whitespace-nowrap shadow-sm hover:shadow-md transition-all duration-200 !bg-[#1d4ed8] !text-white hover:!bg-[#1e40af] rounded-xl px-4 h-9"
            >
              <span className="hidden sm:inline">{t('nav.request')}</span>
              <span className="sm:hidden text-xs">{language === 'ar' ? 'اطلب' : 'Request'}</span>
            </Button>
          </LocalizedLink>

          {/* Theme */}
          <div className="relative" ref={themeRef}>
            <button
              type="button"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              aria-label={language === 'ar' ? 'تغيير الثيم' : 'Change theme'}
              className={"inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs font-semibold transition-all duration-200 hover:bg-muted/80 h-9 " + (
                themeMenuOpen ? 'border-primary/50 bg-muted' : 'border-border/60 bg-background/80'
              )}
            >
              <div
                className="h-3 w-3 rounded-full flex-shrink-0 ring-1 ring-white/30"
                style={{ backgroundColor: themes.find(th => th.id === colorTheme)?.color || '#0ea5e9' }}
              />
              <Palette className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
              <ChevronDown className={"h-3 w-3 text-muted-foreground transition-transform duration-200 hidden sm:block " + (themeMenuOpen ? 'rotate-180' : '')} />
            </button>

            {themeMenuOpen && (
              <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-48 rounded-xl border bg-popover shadow-xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-1.5">
                  {themes.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => handleThemeChange(th.id as ColorTheme)}
                      className={"flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted " + (
                        colorTheme === th.id ? 'bg-muted font-semibold text-primary' : 'text-foreground/80'
                      )}
                      type="button"
                    >
                      <div
                        className="h-4 w-4 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                        style={{ backgroundColor: th.color }}
                      />
                      {language === 'ar' ? th.ar : th.en}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language */}
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            className="inline-flex items-center justify-center rounded-xl border border-border/60 bg-background/80 px-3 h-9 text-xs font-bold transition-all duration-200 hover:bg-muted/80 hover:border-primary/40 whitespace-nowrap"
          >
            {language === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* Hamburger */}
          {(isMobile || isDesktopModeMobile) && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? (language === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (language === 'ar' ? 'فتح القائمة' : 'Open menu')}
              className="inline-flex items-center justify-center rounded-xl border border-border/60 p-2 h-9 w-9 transition-all duration-200 hover:bg-muted/80"
            >
              {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (isMobile || isDesktopModeMobile) && (
        <div className="border-t border-border/50 bg-background/98 backdrop-blur-xl">
          <div className="container py-3 space-y-0.5">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <LocalizedLink key={item.href} href={item.href}>
                  <button
                    type="button"
                    className={"w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors w-full text-start rtl:text-right " + (
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </button>
                </LocalizedLink>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
