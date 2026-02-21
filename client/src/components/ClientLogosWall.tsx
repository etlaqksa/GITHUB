import { clientLogos } from '@/data/clientsLogos';
import { projects } from '@/data/projects';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { useMemo } from 'react';

function logoSrc(fileName: string) {
  return `/media/clients/${encodeURIComponent(fileName)}`;
}

function getLogoHref(fileName: string, fallbackClientArName: string) {
  // Projects are keyed by client name (Arabic) rather than logo filename.
  // If this logo belongs to at least one project, deep-link with the `client` query param.
  const wanted = (fallbackClientArName || '').trim();
  if (!wanted) return `/projects`;

  const hasProject = projects.some((p) => {
    const ar = p.client?.ar || '';
    const parts = ar.split('/').map((x) => x.trim()).filter(Boolean);
    return parts.includes(wanted) || ar.includes(wanted);
  });

  if (!hasProject) return `/projects`;
  return `/projects?client=${encodeURIComponent(wanted)}`;
}


export default function ClientLogosWall() {
  const { language } = useLanguage();

  const items = useMemo(() => {
    return clientLogos.map((logo) => ({
      ...logo,
      href: getLogoHref(logo.fileName, logo.name.ar),
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
                  href={logo.href}
                  className="etlaq-logo-item"
                  aria-label={language === 'ar' ? logo.name.ar : logo.name.en}
                >
                  <div className="etlaq-logo-box">
                    <img
                      src={logoSrc(logo.fileName)}
                      alt={language === 'ar' ? logo.name.ar : logo.name.en}
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
                <LocalizedLink
                  key={'dup-' + logo.fileName}
                  href={getLogoHref(logo.fileName, logo.name.ar)}
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
                </LocalizedLink>
              ))}
            </div>
          </div>
        </div>

        <div
        className="mt-3 text-sm opacity-80 flex items-center justify-between gap-3"
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        {language === 'ar' ? (
          <>
            <span className="text-right flex-1">اضغط على أي شعار لعرض المشاريع المرتبطة بهذا العميل.</span>
            <LocalizedLink href="/projects" className="underline hover:opacity-100 opacity-90 whitespace-nowrap">
              عرض جميع المشاريع
            </LocalizedLink>
          </>
        ) : (
          <>
            <span className="text-left flex-1">Click any logo to view projects linked to that client.</span>
            <LocalizedLink href="/projects" className="underline hover:opacity-100 opacity-90 whitespace-nowrap">
              View all projects
            </LocalizedLink>
          </>
        )}
      </div>
    </div>
  </section>
  );
}
