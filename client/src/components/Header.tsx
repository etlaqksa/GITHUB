import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme, ColorTheme } from '@/contexts/ThemeContext';
import { Menu, X, Palette } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import LocalizedLink from '@/components/LocalizedLink';
export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { colorTheme, setColorTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

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
    { name: language === 'ar' ? 'دراسات حالة' : 'Case studies', href: '/case-studies' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.profile'), href: 'https://wa.me/966534145922?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D9%85%D9%84%D9%81%20%D8%A8%D8%B1%D9%88%D9%81%D8%A7%D9%8A%D9%84%20%D8%B4%D8%B1%D9%83%D8%A9%20%D8%A5%D8%B7%D9%84%D8%A7%D9%82%20%D8%A7%D9%84%D9%85%D8%AA%D9%85%D9%8A%D8%B2%D8%A9%20%28Company%20Profile%29%20%D9%85%D9%86%20%D9%81%D8%B6%D9%84%D9%83.', external: true as const },
    { name: t('nav.faq'), href: '/faq' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const toggleLanguage = () => {
    const next = language === 'ar' ? 'en' : 'ar';
    // Keep user on the same page but swap /ar <-> /en.
    // We use a hard navigation to avoid Router base prefixing issues.
    const target = `/${next}${location === '/' ? '' : location}`;
    setLanguage(next);
    window.location.assign(target);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <LocalizedLink href="/">
          <div className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer hover:scale-105 transition-transform duration-300">
            <img 
              src="/logo.png?v=2" 
              alt="شركة إطلاق المتميزة" 
              className="h-12 w-auto object-contain hover-brightness"
              loading="eager"
              decoding="async"
            />
          </div>
        </LocalizedLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
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

        {/* Primary CTA + Theme & Language Switcher & Mobile Menu Button */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse relative">
          {/* Request Service CTA (desktop) */}
          <div className="hidden md:block">
            <LocalizedLink href="/request-service">
              <Button className="gap-2 font-bold shadow-hover-soft">
                {t('nav.request')}
              </Button>
            </LocalizedLink>
          </div>
          {/* Custom Theme Switcher */}
          <div className="relative">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 border-2 border-primary/50 hover:border-primary transition-colors"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              aria-label="Toggle Theme Menu"
            >
              <Palette className="h-4 w-4 text-primary" />
              <span className="hidden md:inline font-bold">
                {language === 'ar' ? 'الثيم' : 'Theme'}
              </span>
            </Button>

            {themeMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-[90]" 
                  onClick={() => setThemeMenuOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 shadow-lg z-[100] animate-in fade-in zoom-in duration-200">
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

          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="font-medium shadow-hover-soft"
          >
            {language === 'ar' ? 'EN' : 'العربية'}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-2">
            <LocalizedLink href="/request-service">
              <Button className="w-full justify-start text-base font-bold" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.request')}
              </Button>
            </LocalizedLink>
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
    </header>
  );
}

