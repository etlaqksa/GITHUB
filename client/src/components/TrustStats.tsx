import { Counter } from '@/components/Counter';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

type Props = {
  className?: string;
  compact?: boolean;
};

export default function TrustStats({ className = '', compact = false }: Props) {
  const { language } = useLanguage();

  const stats = [
    { value: 15, suffix: '+', label: language === 'ar' ? 'سنة خبرة' : 'Years of experience' },
    { value: 200, suffix: '+', label: language === 'ar' ? 'مشروع منجز' : 'Completed projects' },
    { value: 100, suffix: '+', label: language === 'ar' ? 'عميل راضٍ' : 'Satisfied clients' },
    { value: 50, suffix: '+', label: language === 'ar' ? 'معدة متخصصة' : 'Specialized equipment' },
  ];

  return (
    <section className={className}>
      <div className={compact ? 'grid grid-cols-2 md:grid-cols-4 gap-6' : 'grid grid-cols-2 md:grid-cols-4 gap-8'}>
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl md:text-4xl font-bold">
              <Counter end={s.value} suffix={s.suffix} />
            </div>
            <div className="text-sm md:text-base text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center">
        <Badge variant="secondary" className="text-sm">
          {language === 'ar' ? 'نعمل في جميع مناطق المملكة' : 'Serving all regions of KSA'}
        </Badge>
        <Badge variant="secondary" className="text-sm">
          {language === 'ar' ? '+20 مدينة' : '20+ cities'}
        </Badge>
      </div>
    </section>
  );
}
