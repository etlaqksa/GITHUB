import { clientLogos } from '@/data/clientsLogos';
import { projects } from '@/data/projects';
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
      <div className="w-full px-4">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {subtitle}
          </p>
        </div>

        <div className="etlaq-card rounded-2xl border bg-card/40 p-4 md:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {clientLogos.map((logo) => {
              const label = language === 'ar' ? logo.name.ar : logo.name.en || logo.name.ar;
              const hasProjects = projects.some((p) => {
                const ar = p.client?.ar ?? '';
                const en = p.client?.en ?? '';
                const arParts = ar.split('/').map((s) => s.trim());
                const enParts = en.split('/').map((s) => s.trim());
                return arParts.includes(logo.name.ar) || enParts.includes(logo.name.en);
              });

              const href = hasProjects ? `/projects?client=${encodeURIComponent(logo.name.ar)}` : '/projects';
              return (
                <LocalizedLink
                  key={logo.fileName}
                  href={href}
                  className="group relative flex h-20 items-center justify-center rounded-xl border bg-background/60 p-3 transition hover:-translate-y-0.5 hover:shadow-sm"
                  aria-label={label}
                  title={label}
                >
                  <div className="h-12 w-[160px] sm:w-[180px] flex items-center justify-center">
  <img
    src={logoSrc(logo.fileName)}
    alt={label}
    width={180}
    height={48}
    loading="lazy"
    decoding="async"
    className="h-full w-full object-contain opacity-90 transition duration-200 group-hover:opacity-100"
  />
</div>
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
