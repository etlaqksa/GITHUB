import { Counter } from '@/components/Counter';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';

type Props = {
  className?: string;
  compact?: boolean;
  variant?: 'default' | 'inverse';
};

export default function TrustStats({ className = '', compact = false, variant = 'default' }: Props) {
  const { language } = useLanguage();

  const stats = [
    { value: 15, suffix: '+', label: language === 'ar' ? 'سنة خبرة' : 'Years of experience' },
    { value: 200, suffix: '+', label: language === 'ar' ? 'مشروع منجز' : 'Completed projects' },
    { value: 100, suffix: '+', label: language === 'ar' ? 'عميل راضٍ' : 'Satisfied clients' },
    { value: 50, suffix: '+', label: language === 'ar' ? 'معدة متخصصة' : 'Specialized equipment' },
  ];

  return (
    <section className={className}>
      <div
        className={
          compact
            ? 'grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6'
            : 'grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'
        }
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <Counter end={s.value} suffix={s.suffix} />
            </div>
            <div
              className={
                variant === 'inverse'
                  ? 'text-xs sm:text-sm md:text-base text-white/85 mt-0.5 md:mt-1'
                  : 'text-xs sm:text-sm md:text-base text-muted-foreground mt-0.5 md:mt-1'
              }
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 md:mt-6 flex flex-wrap items-center justify-center gap-2 text-center">
        <LocalizedLink href="/locations">
          <Badge
            variant="secondary"
            className={
              variant === 'inverse'
                ? 'text-xs md:text-sm bg-white/10 text-white border-white/20 cursor-pointer hover:bg-white/15 px-2 py-0.5'
                : 'text-xs md:text-sm cursor-pointer hover:bg-secondary/80 px-2 py-0.5'
            }
          >
            {language === 'ar' ? 'نعمل في جميع مناطق المملكة' : 'Serving all regions of KSA'}
          </Badge>
        </LocalizedLink>

        <LocalizedLink href="/locations">
          <Badge
            variant="secondary"
            className={
              variant === 'inverse'
                ? 'text-xs md:text-sm bg-white/10 text-white border-white/20 cursor-pointer hover:bg-white/15 px-2 py-0.5'
                : 'text-xs md:text-sm cursor-pointer hover:bg-secondary/80 px-2 py-0.5'
            }
          >
            {language === 'ar' ? '+20 مدينة' : '20+ cities'}
          </Badge>
        </LocalizedLink>
      </div>
    </section>
  );
}
