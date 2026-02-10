import { clientLogos } from '@/data/clientsLogos';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';

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

  const title =
    language === 'ar'
      ? 'يثق بنا عملاء رائدون'
      : 'Trusted by leading clients';

  const subtitle =
    language === 'ar'
      ? 'نماذج من الجهات التي نفذنا لها أعمالاً ضمن مشاريع مختلفة.'
      : 'A selection of organizations we have supported across different projects.';

  return (
    <section className={titleVariant === 'home' ? 'py-10 md:py-14' : 'py-8 md:py-12'}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {subtitle}
          </p>
        </div>

        <div className="rounded-2xl border bg-card/40 p-4 md:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {clientLogos.map((logo) => {
              const label = language === 'ar' ? logo.name.ar : logo.name.en || logo.name.ar;
              const href = `/projects?client=${encodeURIComponent(logo.name.ar)}`;
              const containerClass = logo.darkBg
                ? 'bg-black/90 border-white/10'
                : 'bg-background/60';
              return (
                <LocalizedLink
                  key={logo.fileName}
                  href={href}
                  className={`group relative flex h-20 items-center justify-center rounded-xl border p-3 transition hover:-translate-y-0.5 hover:shadow-sm ${containerClass}`}
                  aria-label={label}
                  title={label}
                >
                  <img
                    src={logoSrc(logo.fileName)}
                    alt={label}
                    loading="lazy"
                    decoding="async"
                    className="max-h-12 w-auto max-w-full opacity-85 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <span className="sr-only">{label}</span>
                </LocalizedLink>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground md:text-sm">
              {language === 'ar'
                ? 'اضغط على أي شعار لعرض المشاريع المرتبطة بهذا العميل.'
                : 'Click any logo to view projects for that client.'}
            </p>
            <LocalizedLink
              href="/projects"
              className="text-sm font-medium underline underline-offset-4 hover:opacity-80"
            >
              {language === 'ar' ? 'عرض جميع المشاريع' : 'View all projects'}
            </LocalizedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
