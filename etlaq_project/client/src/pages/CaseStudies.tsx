import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { absUrl } from '@/lib/siteUrl';
import { Button } from '@/components/ui/button';
import LocalizedLink from '@/components/LocalizedLink';

/**
 * Case studies are merged into the Projects section.
 * We keep this route for legacy links, but canonicalize (and navigate) to /projects.
 */
export default function CaseStudies() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const lang = language === 'en' ? 'en' : 'ar';

  useEffect(() => {
    // Client-side navigation (SPA). Netlify also issues a server-side redirect.
    setLocation('/projects');
  }, [setLocation]);

  return (
    <div className="min-h-screen py-16">
      <SEO
        title={lang === 'ar' ? 'دراسات الحالة | شركة إطلاق المتميزة' : 'Case studies | ETLAQ'}
        description={
          lang === 'ar'
            ? 'تم دمج دراسات الحالة داخل صفحة المشاريع. سيتم تحويلك تلقائياً.'
            : 'Case studies are now part of the Projects page. You will be redirected automatically.'
        }
        // Prevent indexing of the legacy route.
        noIndex
        // Canonicalize to projects for both languages.
        url={absUrl(`/${lang}/projects`)}
        alternateUrls={{ ar: '/ar/projects', en: '/en/projects' }}
      />

      <div className="container mx-auto px-4">
        <div className="etlaq-card max-w-xl mx-auto rounded-2xl border bg-card/70 backdrop-blur p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold">
            {lang === 'ar' ? 'تم دمج دراسات الحالة ضمن المشاريع' : 'Case studies are merged into Projects'}
          </h1>
          <p className="text-muted-foreground">
            {lang === 'ar'
              ? 'أي دراسة حالة أصبحت داخل صفحة المشروع نفسها. إذا لم يتم تحويلك تلقائياً، استخدم الزر أدناه.'
              : 'Each case study now lives inside its project page. If you are not redirected automatically, use the button below.'}
          </p>

          <LocalizedLink href="/projects" className="inline-flex">
            <Button>{lang === 'ar' ? 'الانتقال إلى المشاريع' : 'Go to Projects'}</Button>
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
}
