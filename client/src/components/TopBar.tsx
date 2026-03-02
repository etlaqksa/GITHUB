import { SocialIcon } from '@/components/SocialIcons';
import { COMPANY_INFO } from '@/config/company';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail } from 'lucide-react';

const social = [
  { label: 'TikTok',    name: 'tiktok',    href: `https://www.tiktok.com/@${COMPANY_INFO.socialHandle}` },
  { label: 'Instagram', name: 'instagram', href: `https://www.instagram.com/${COMPANY_INFO.socialHandle}/` },
  { label: 'X',         name: 'x',         href: `https://x.com/${COMPANY_INFO.socialHandle}` },
  { label: 'Telegram',  name: 'telegram',  href: `https://t.me/${COMPANY_INFO.socialHandle}` },
] as const;

export default function TopBar() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div
      className="sticky top-0 z-[60] h-9 w-full border-b border-white/8 bg-slate-950/95 backdrop-blur-md"
      role="region"
      aria-label={isAr ? 'شريط معلومات التواصل' : 'Contact info bar'}
    >
      <div className="container mx-auto h-full px-4">
        <div className={"flex h-full items-center justify-between gap-3 " + (isAr ? 'flex-row-reverse' : '')}>

          {/* Contact info */}
          <div className={"flex items-center gap-4 text-[11.5px] sm:text-xs text-white/85 " + (isAr ? 'flex-row-reverse' : '')}>
            <a
              href={`tel:${COMPANY_INFO.phoneInternational}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label={isAr ? 'اتصال' : 'Call us'}
            >
              <Phone className="h-3 w-3 opacity-70" />
              <span dir="ltr" className="font-medium tracking-tight whitespace-nowrap tabular-nums">
                {COMPANY_INFO.phoneDisplay}
              </span>
            </a>

            <span className="text-white/20 hidden sm:block">|</span>

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label={isAr ? 'البريد الإلكتروني' : 'Email us'}
            >
              <Mail className="h-3 w-3 opacity-70" />
              <span className="font-medium">{COMPANY_INFO.email}</span>
            </a>

            {/* Trust badge */}
            <span className="hidden md:inline-flex items-center gap-1 text-amber-400/80 text-[10.5px] font-semibold">
              <span>★</span>
              {isAr ? '15+ سنة خبرة' : '15+ Years of Excellence'}
            </span>
          </div>

          {/* Social icons */}
          <div className={"flex items-center gap-1.5 " + (isAr ? 'flex-row-reverse' : '')}>
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/8 hover:bg-white/16 transition-colors"
              >
                <SocialIcon name={s.name} className="w-3.5 h-3.5 text-white/80" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
