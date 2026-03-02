import { Counter } from '@/components/Counter';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { MapPin } from 'lucide-react';

type Props = {
  className?: string;
  compact?: boolean;
  variant?: 'default' | 'inverse';
};

export default function TrustStats({ className = '', compact = false, variant = 'default' }: Props) {
  const { language } = useLanguage();
  const isInverse = variant === 'inverse';

  const stats = [
    {
      value: 15,
      suffix: '+',
      labelAr: 'سنة خبرة',
      labelEn: 'Years Experience',
      emoji: '🏆',
    },
    {
      value: 200,
      suffix: '+',
      labelAr: 'مشروع منجز',
      labelEn: 'Projects Completed',
      emoji: '🏗️',
    },
    {
      value: 100,
      suffix: '+',
      labelAr: 'عميل راضٍ',
      labelEn: 'Happy Clients',
      emoji: '🤝',
    },
    {
      value: 50,
      suffix: '+',
      labelAr: 'معدة متخصصة',
      labelEn: 'Specialized Equipment',
      emoji: '⚙️',
    },
  ];

  return (
    <section className={className} aria-label={language === 'ar' ? 'إحصاءات الشركة' : 'Company statistics'}>
      <div className={compact ? 'grid grid-cols-2 md:grid-cols-4 gap-4' : 'grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'}>
        {stats.map((s) => (
          <div
            key={s.labelEn}
            className={`text-center rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 ${
              isInverse
                ? 'bg-white/8 hover:bg-white/12'
                : 'bg-muted/40 hover:bg-muted/70'
            }`}
          >
            <div className="text-2xl mb-1.5" aria-hidden="true">{s.emoji}</div>
            <div className={`text-3xl md:text-4xl font-black tracking-tight ${isInverse ? 'text-white' : 'text-foreground'}`}>
              <Counter end={s.value} suffix={s.suffix} />
            </div>
            <div className={`text-xs md:text-sm font-medium mt-1 ${isInverse ? 'text-white/75' : 'text-muted-foreground'}`}>
              {language === 'ar' ? s.labelAr : s.labelEn}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <LocalizedLink href="/locations">
          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer px-4 py-2 rounded-full border transition-all hover:scale-[1.02] ${
            isInverse
              ? 'border-white/20 bg-white/10 text-white hover:bg-white/15'
              : 'border-border bg-background hover:bg-muted text-foreground'
          }`}>
            <MapPin className="h-3.5 w-3.5" />
            {language === 'ar' ? 'نعمل في جميع مناطق المملكة · +20 مدينة' : 'Serving all KSA regions · 20+ cities'}
          </span>
        </LocalizedLink>
      </div>
    </section>
  );
}
