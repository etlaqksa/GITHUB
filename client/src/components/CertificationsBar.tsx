import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Award, MapPin, Users, Wrench, Clock } from 'lucide-react';

type Badge = {
  icon: typeof Shield;
  labelAr: string;
  labelEn: string;
  subAr?: string;
  subEn?: string;
};

const BADGES: Badge[] = [
  {
    icon: Clock,
    labelAr: '+15 سنة خبرة',
    labelEn: '15+ Years Experience',
    subAr: 'في السوق السعودي',
    subEn: 'In the Saudi market',
  },
  {
    icon: Award,
    labelAr: '+200 مشروع منجز',
    labelEn: '200+ Projects Completed',
    subAr: 'في مختلف القطاعات',
    subEn: 'Across various sectors',
  },
  {
    icon: Users,
    labelAr: '+100 عميل',
    labelEn: '100+ Clients',
    subAr: 'حكومي، مقاولين، أفراد',
    subEn: 'Government, contractors, individuals',
  },
  {
    icon: MapPin,
    labelAr: '+20 مدينة',
    labelEn: '20+ Cities',
    subAr: 'تغطية شاملة في KSA',
    subEn: 'Full KSA coverage',
  },
  {
    icon: Wrench,
    labelAr: '+50 معدة متخصصة',
    labelEn: '50+ Specialized Equipment',
    subAr: 'جاهزة للنشر الميداني',
    subEn: 'Ready for field deployment',
  },
  {
    icon: Shield,
    labelAr: 'خبرة في مشاريع Vision 2030',
    labelEn: 'Vision 2030 Project Experience',
    subAr: 'مترو الرياض وغيره',
    subEn: 'Riyadh Metro & more',
  },
];

type Props = {
  variant?: 'light' | 'dark' | 'colored';
  className?: string;
};

export default function CertificationsBar({ variant = 'light', className = '' }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const wrapClass =
    variant === 'dark'
      ? 'bg-slate-900 border-slate-800'
      : variant === 'colored'
        ? 'bg-blue-700'
        : 'bg-white border border-slate-100 shadow-sm';

  const itemClass =
    variant === 'dark' || variant === 'colored'
      ? 'text-white'
      : 'text-slate-700';

  const subClass =
    variant === 'dark' || variant === 'colored'
      ? 'text-white/60'
      : 'text-slate-400';

  const iconClass =
    variant === 'dark' || variant === 'colored'
      ? 'text-white/80'
      : 'text-blue-600';

  return (
    <div className={`${wrapClass} ${className} rounded-2xl`} aria-label={isAr ? 'شهاداتنا ومؤشرات الثقة' : 'Our credentials and trust indicators'}>
      <div className="container py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-2 px-2 py-3"
              >
                <Icon className={`h-6 w-6 ${iconClass}`} aria-hidden="true" />
                <div className={`text-sm font-bold leading-tight ${itemClass}`}>
                  {isAr ? badge.labelAr : badge.labelEn}
                </div>
                {(badge.subAr || badge.subEn) && (
                  <div className={`text-[11px] leading-tight ${subClass}`}>
                    {isAr ? badge.subAr : badge.subEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
