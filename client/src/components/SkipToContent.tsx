import { useLanguage } from '@/contexts/LanguageContext';

export default function SkipToContent() {
  const { language } = useLanguage();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] rounded-lg bg-background text-foreground border border-border px-4 py-2 shadow"
    >
      {language === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}
    </a>
  );
}
