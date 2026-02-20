import { clientLogos } from '@/data/clientsLogos';
import { projects } from '@/data/projects';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { useMemo } from 'react';

function logoSrc(fileName: string) {
  return `/media/clients/${encodeURIComponent(fileName)}`;
}

function getLogoHref(fileName: string, language: 'ar' | 'en') {
  const hasProject = projects.some((p) => p.clientLogo === fileName);
  if (!hasProject) return `/${language}/projects`;
  return `/${language}/projects?client=${encodeURIComponent(fileName)}`;
}

export default function ClientLogosWall() {
  const { language } = useLanguage();

  const items = useMemo(() => {
    return clientLogos.map((logo) => ({
      ...logo,
      href: getLogoHref(logo.fileName, language),
    }));
  }, [language]);

  // Force LTR inside the marquee so RTL pages don't reverse the animation and cause gaps.
  return (
    <section className="etlaq-logo-rail" dir="ltr">
      <div className="container">
        <div className="etlaq-logo-rail__viewport" aria-label={language === 'ar' ? 'شعارات العملاء' : 'Client logos'}>
          <div className="etlaq-logo-rail__track">
            <div className="etlaq-logo-rail__segment">
              {items.map((logo) => (
                <LocalizedLink
                  key={logo.fileName}
                  href={logo.href.replace(`/${language}`, '')}
                  className="etlaq-logo-item"
                  aria-label={logo.name}
                >
                  <div className="etlaq-logo-box">
                    <img
                      src={logoSrc(logo.fileName)}
                      alt={logo.name}
                      width={190}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="etlaq-logo-img"
                    />
                  </div>
                </LocalizedLink>
              ))}
            </div>

            {/* Duplicate segment for seamless infinite marquee */}
            <div className="etlaq-logo-rail__segment" aria-hidden="true">
              {items.map((logo) => (
                <a
                  key={'dup-' + logo.fileName}
                  href={getLogoHref(logo.fileName, language)}
                  className="etlaq-logo-item"
                  tabIndex={-1}
                >
                  <div className="etlaq-logo-box">
                    <img
                      src={logoSrc(logo.fileName)}
                      alt=""
                      width={190}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      className="etlaq-logo-img"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-3 text-sm opacity-80 ${language === 'ar' ? 'text-left' : 'text-right'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {language === 'ar' ? (
            <>
              اضغط على أي شعار لعرض المشاريع المرتبطة بهذا العميل.{' '}
              <LocalizedLink href="/projects" className="underline hover:opacity-100 opacity-90">
                عرض جميع المشاريع
              </LocalizedLink>
            </>
          ) : (
            <>
              Click any logo to view projects linked to that client.{' '}
              <LocalizedLink href="/projects" className="underline hover:opacity-100 opacity-90">
                View all projects
              </LocalizedLink>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
