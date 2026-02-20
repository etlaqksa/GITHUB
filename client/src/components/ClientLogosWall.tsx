import { clientLogos } from '@/data/clientsLogos';
import { projects } from '@/data/projects';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { useMemo } from 'react';

function logoSrc(fileName: string) {
  // Assets are served from /public
  return `/media/clients/${encodeURIComponent(fileName)}`;
}

export default function ClientLogosWall({
  titleVariant = 'home',
}: {
  titleVariant?: 'home' | 'page';
}) {
  const { language } = useLanguage();

  const clientNamesWithProjects = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      const ar = p.client?.ar ?? '';
      const en = p.client?.en ?? '';
      ar
        .split('/')
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((name) => set.add(name));
      en
        .split('/')
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((name) => set.add(name));
    });
    return set;
  }, []);

  const title = language === 'ar' ? 'يثق بنا عملاء رائدون' : 'Trusted by leading clients';
  const subtitle =
    language === 'ar'
      ? 'نماذج من الجهات التي نفذنا لها أعمالاً ضمن مشاريع مختلفة.'
      : 'A selection of organizations we have supported across different projects.';

  // Fixed duration keeps animation smooth and avoids reflows caused by measuring widths.
  const duration = 42;

  return (
    <section className={titleVariant === 'home' ? 'py-10 md:py-14' : 'py-8 md:py-12'}>
      <div className="w-full px-4">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {subtitle}
          </p>
        </div>

        <div className="etlaq-card rounded-2xl border bg-card/40 p-4 md:p-6">
          <div
            className="etlaq-logo-rail"
            dir="ltr"
            style={{
              ['--etlaq-rail-duration' as any]: `${duration}s`,
              ['--etlaq-rail-gap' as any]: `12px`,
            }}
            aria-label={language === 'ar' ? 'شعارات العملاء' : 'Client logos'}
          >
            <div className="etlaq-logo-rail__track" role="list">
              {/* Segment A (interactive) */}
              <div className="etlaq-logo-rail__segment" aria-label="segment-a">
                {clientLogos.map((logo, idx) => {
                  const label = language === 'ar' ? logo.name.ar : logo.name.en || logo.name.ar;
                  const hasProjects =
                    clientNamesWithProjects.has(logo.name.ar) ||
                    (logo.name.en ? clientNamesWithProjects.has(logo.name.en) : false);

                  const href = hasProjects ? `/projects?client=${encodeURIComponent(logo.name.ar)}` : '/projects';
                  const eager = idx < 6; // small, fast first paint

                  return (
                    <LocalizedLink
                      key={`a-${logo.fileName}-${idx}`}
                      href={href}
                      role="listitem"
                      className="etlaq-logo-item group relative flex h-20 w-[170px] sm:w-[190px] flex-none items-center justify-center rounded-xl border bg-background/60 p-3 transition hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
                      aria-label={label}
                      title={label}
                    >
                      <div className="flex h-12 w-full items-center justify-center">
                        <img
                          src={logoSrc(logo.fileName)}
                          alt={label}
                          width={190}
                          height={48}
                          loading={eager ? 'eager' : 'lazy'}
                          fetchPriority={eager ? 'high' : 'low'}
                          decoding="async"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="sr-only">{label}</span>
                    </LocalizedLink>
                  );
                })}
              </div>

              {/* Segment B (visual duplicate for seamless loop) */}
              <div className="etlaq-logo-rail__segment" aria-hidden="true">
                {clientLogos.map((logo, idx) => (
                  <div
                    key={`b-${logo.fileName}-${idx}`}
                    className="etlaq-logo-item group relative flex h-20 w-[170px] sm:w-[190px] flex-none items-center justify-center rounded-xl border bg-background/60 p-3"
                  >
                    <div className="flex h-12 w-full items-center justify-center">
                      <img
                        src={logoSrc(logo.fileName)}
                        alt=""
                        width={190}
                        height={48}
                        loading="lazy"
                        fetchPriority="low"
                        decoding="async"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            {language === 'ar' ? (
              <>
                اضغط على أي شعار لعرض المشاريع المرتبطة بهذا العميل. &nbsp;
                <LocalizedLink href="/projects" className="underline hover:opacity-80">
                  عرض جميع المشاريع
                </LocalizedLink>
              </>
            ) : (
              <>
                Click any logo to view projects associated with that client. &nbsp;
                <LocalizedLink href="/projects" className="underline hover:opacity-80">
                  View all projects
                </LocalizedLink>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
