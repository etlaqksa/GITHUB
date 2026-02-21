import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { mapPathToLang } from '@/lib/mapPathToLang';
import { useTheme, ColorTheme } from '@/contexts/ThemeContext';
import { Menu, X, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import LocalizedLink from '@/components/LocalizedLink';
export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { colorTheme, setColorTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktopModeMobile, setIsDesktopModeMobile] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  // Horizontal-scroll nav helpers (used when "Desktop site" is enabled on mobile).

  const handleThemeChange = (theme: ColorTheme) => {
    console.log(`Changing theme to: ${theme}`);
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
    // Keep user on the same semantic page while switching language.
    const pathname = window.location.pathname || '/';
    const search = window.location.search || '';
    const hash = window.location.hash || '';
    const targetPath = mapPathToLang(pathname, next as any);
    setLanguage(next);
    window.location.assign(`${targetPath}${search}${hash}`);
  };
  // Responsive behavior:
  // - True mobile (small screens): show only logo + hamburger; all actions live inside menu.
  // - "Desktop site" on mobile (touch device reporting ~980px): show horizontal-scroll nav + hamburger at end.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia?.('(pointer: coarse)');

    const compute = () => {
      const isTouch = mq ? mq.matches : false;
      const w = window.innerWidth || 0;

      const mobile = w < 768;
      const desktopModeMobile = isTouch && w >= 768 && w < 1100;

      setIsMobile(mobile);
      setIsDesktopModeMobile(desktopModeMobile);

      // Close menus when switching modes
      if (!mobile && !desktopModeMobile) setMobileMenuOpen(false);
    };

    compute();

    window.addEventListener('resize', compute);
    if (mq?.addEventListener) mq.addEventListener('change', compute);
    // Safari fallback
    // @ts-ignore
    else if (mq?.addListener) mq.addListener(compute);

    return () => {
      window.removeEventListener('resize', compute);
      if (mq?.removeEventListener) mq.removeEventListener('change', compute);
      // @ts-ignore
      else if (mq?.removeListener) mq.removeListener(compute);
    };
  }, []);

  return (
    <header className="sticky top-[var(--etlaq-topbar-h)] z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-20 items-center justify-between gap-2 min-w-0">
        {/* Logo */}
        <LocalizedLink href="/">
          <div className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer hover:scale-105 transition-transform duration-300">
            <img 
              src="/logo-160.webp?v=5"
              srcSet="/logo-160.webp?v=5 160w, /logo-224.webp?v=5 224w, /logo-320.webp?v=5 320w, /logo.webp?v=5 448w"
              sizes="(max-width: 640px) 80px, 96px" 
              alt="شركة إطلاق المتميزة" 
              width="224"
              height="112" 
              
             
             
              className="h-10 sm:h-12 w-auto object-contain hover-brightness"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </LocalizedLink>

        {/* Navigation
            Option B (requested): when the browser is in "Desktop site" mode on a narrow touch device,
            keep the full navigation visible and allow horizontal scrolling instead of hiding items.
        */}
        <div
          className={
            isMobile
              ? "hidden"
              : isDesktopModeMobile
              ? "relative flex flex-1 min-w-0 items-center"
              : "hidden md:flex flex-1 items-center justify-center"
          }
          aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
        >
          {isDesktopModeMobile ? (
              <nav className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <div className="flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex items-center gap-1 whitespace-nowrap px-1">
                      {navigation.map((item) => {
                        const active = location === item.href;
                        const cls = `rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                          active
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                        }`;
                        return item.external ? (
                          <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
                            {item.name}
                          </a>
                        ) : (
                          <LocalizedLink key={item.href} href={item.href} className={cls}>
                            {item.name}
                          </LocalizedLink>
                        );
                      })}
                    </div>
                  </div>
                  {isDesktopModeMobile && (


                  <button
                    type="button"
                    aria-label="Menu"
                    onClick={() => setMobileMenuOpen((v) => !v)}
                    className="shrink-0 inline-flex items-center justify-center rounded-full border border-border bg-background/80 px-3 py-2 text-sm hover:bg-muted"
                  >
                    <Menu className="h-4 w-4" />
                  </button>
                  )}
                </div>
              </nav>
            ) : (
              <div className="flex items-center gap-1 whitespace-nowrap flex-nowrap overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1">
              {navigation.map((item) =>
              item.external ? (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex">
                  <Button
                    variant="ghost"
                    className="text-base font-bold hover:scale-110 transition-all duration-300 hover:text-primary relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
                  >
                    {item.name}
                  </Button>
                </a>
              ) : (
                <LocalizedLink key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? 'default' : 'ghost'}
                    className="text-base font-bold hover:scale-110 transition-all duration-300 hover:text-primary relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
                  >
                    {item.name}
                  </Button>
                </LocalizedLink>
              )
            )}
            </div>
          )}
        </div>

        {/* Primary actions: Request Service + Theme + Language (always visible) + Mobile Menu Button */}
        <div className="flex items-center gap-1 sm:gap-2 relative shrink-0">
          {/* Request Service CTA (always visible; compact on mobile) */}
          <LocalizedLink href="/request-service" className="shrink-0">
            <Button className="gap-2 font-bold shadow-hover-soft whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90 bg-primary text-primary-foreground hover:bg-primary/90 !bg-[#1d4ed8] !text-white hover:!bg-[#1e40af]">
              <span className="hidden sm:inline">{t('nav.request')}</span>
              <span className="sm:hidden">{language === 'ar' ? 'اطلب' : 'Request'}</span>
            </Button>
          </LocalizedLink>
          {/* Theme switcher (always visible) */}
          <div className="relative">
            {/* Desktop / tablet */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex gap-2 border-2 border-primary/50 hover:border-primary transition-colors"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              aria-label={language === 'ar' ? 'تغيير الثيم' : 'Change theme'}
              type="button"
            >
              <Palette className="h-4 w-4 text-primary" />
              <span className="hidden md:inline font-bold">
                {language === 'ar' ? 'الثيم' : 'Theme'}
              </span>
            </Button>

            {/* Mobile (icon-only) */}
            <Button
              variant="outline"
              size="icon"
              className="sm:hidden border-2 border-primary/50 hover:border-primary"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              aria-label={language === 'ar' ? 'تغيير الثيم' : 'Change theme'}
              type="button"
            >
              <Palette className="h-4 w-4 text-primary" />
            </Button>

            {themeMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-[90] bg-black/30"
                  onClick={() => setThemeMenuOpen(false)}
                />

                {/* Dropdown (all sizes) - opens DOWN from the header button */}
                <div className="absolute right-0 mt-2 w-[min(92vw,18rem)] sm:w-52 rounded-md border bg-popover p-1 shadow-lg z-[100] animate-in fade-in zoom-in duration-200 max-h-[60vh] overflow-auto">
                  <div className="sm:hidden px-3 py-2 font-bold border-b">
                    {language === 'ar' ? 'اختر ثيم' : 'Choose a theme'}
                  </div>
                  {[
                    { id: 'blue', color: '#0ea5e9', ar: 'الأزرق الكلاسيكي', en: 'Classic Blue' },
                    { id: 'green', color: '#22c55e', ar: 'الأخضر الطبيعي', en: 'Natural Green' },
                    { id: 'orange', color: '#f97316', ar: 'البرتقالي الحيوي', en: 'Vibrant Orange' },
                    { id: 'purple', color: '#a855f7', ar: 'البنفسجي الملكي', en: 'Royal Purple' },
                    { id: 'red', color: '#ef4444', ar: 'الأحمر القوي', en: 'Bold Red' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleThemeChange(t.id as ColorTheme)}
                      className={`flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                        colorTheme === t.id ? 'bg-accent/50 font-bold text-primary' : ''
                      }`}
                      type="button"
                    >
                      <div
                        className="h-4 w-4 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: t.color }}
                      />
                      {language === 'ar' ? t.ar : t.en}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Language toggle (always visible) */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="font-medium shadow-hover-soft whitespace-nowrap"
            aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            type="button"
          >
            <span className="hidden sm:inline">{language === 'ar' ? 'EN' : 'العربية'}</span>
            <span className="sm:hidden">{language === 'ar' ? 'EN' : 'AR'}</span>
          </Button>

          {/* Mobile Menu Button (true mobile only) */}
          <Button
            variant="ghost"
            size="icon"
            className={isMobile ? "" : "hidden"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              language === 'ar'
                ? mobileMenuOpen
                  ? 'إغلاق القائمة'
                  : 'فتح القائمة'
                : mobileMenuOpen
                  ? 'Close menu'
                  : 'Open menu'
            }
            type="button"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation (true mobile): only nav items inside hamburger (actions stay in header) */}
      {mobileMenuOpen && (
        <div className={`${isMobile ? "" : "hidden"} border-t bg-background`}>
          <div className="container py-4 space-y-2">
            {navigation.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block"
                >
                  <Button variant="ghost" className="w-full justify-start text-base">
                    {item.name}
                  </Button>
                </a>
              ) : (
                <LocalizedLink key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? 'default' : 'ghost'}
                    className="w-full justify-start text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Button>
                </LocalizedLink>
              )
            )}
          </div>
        </div>
      )}


      {/* Desktop-mode mobile menu (touch device in "Desktop site" mode): nav only */}
      {mobileMenuOpen && isDesktopModeMobile && (
        <div className="border-t bg-background">
          <div className="container py-4 space-y-2">
            {navigation.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-muted"
                >
                  {item.name}
                </a>
              ) : (
                <LocalizedLink
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </LocalizedLink>
              )
            )}

          </div>
        </div>
      )}
    </header>
  );
}

