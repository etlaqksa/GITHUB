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
    <section className={className + " w-full flex flex-col items-center justify-center"}>
      <div className={(compact ? 'grid grid-cols-2 md:grid-cols-4 gap-6' : 'grid grid-cols-2 md:grid-cols-4 gap-8') + ' w-full max-w-4xl mx-auto justify-center justify-items-center'}>
        {stats.map((s) => (
          <div key={s.label} className="text-center w-full">
            <div className="text-3xl md:text-4xl font-bold">
              <Counter end={s.value} suffix={s.suffix} />
            </div>
            <div
              className={
                variant === 'inverse'
                  ? 'text-sm md:text-base text-white/85 mt-1'
                  : 'text-sm md:text-base text-muted-foreground mt-1'
              }
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center">
        <LocalizedLink href="/locations">
          <Badge
            variant="secondary"
            className={
              variant === 'inverse'
                ? 'text-sm bg-white/10 text-white border-white/20 cursor-pointer hover:bg-white/15'
                : 'text-sm cursor-pointer hover:bg-secondary/80'
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
                ? 'text-sm bg-white/10 text-white border-white/20 cursor-pointer hover:bg-white/15'
                : 'text-sm cursor-pointer hover:bg-secondary/80'
            }
          >
            {language === 'ar' ? '+20 مدينة' : '20+ cities'}
          </Badge>
        </LocalizedLink>
      </div>
    </section>
  );
}
