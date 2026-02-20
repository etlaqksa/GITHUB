import { Mail, Phone } from 'lucide-react';

import { COMPANY_INFO } from '@/config/company';
import { useLanguage } from '@/contexts/LanguageContext';

const social = [
  {
    label: 'TikTok',
    iconClass: 'fa-brands fa-tiktok',
    href: `https://www.tiktok.com/@${COMPANY_INFO.socialHandle}`,
    color: '#0A0A0A',
  },
  {
    label: 'Instagram',
    iconClass: 'fa-brands fa-instagram',
    href: `https://www.instagram.com/${COMPANY_INFO.socialHandle}/`,
    gradient:
      'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
  },
  {
    label: 'X',
    iconClass: 'fa-brands fa-x-twitter',
    href: `https://x.com/${COMPANY_INFO.socialHandle}`,
    color: '#0A0A0A',
  },
  {
    label: 'Telegram',
    iconClass: 'fa-brands fa-telegram',
    href: `https://t.me/${COMPANY_INFO.socialHandle}`,
    color: '#229ED9',
  },
] as const;

export default function TopBar() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div
      className="sticky top-0 z-[60] h-9 sm:h-10 w-full border-b border-white/10 bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70"
      role="region"
      aria-label={isAr ? 'شريط علوي' : 'Top bar'}
    >
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full items-center justify-between gap-3 rtl:flex-row-reverse">
          <div className="flex items-center gap-3 sm:gap-4 text-[12px] sm:text-sm text-white rtl:flex-row-reverse">
            <a
              href={`tel:${COMPANY_INFO.phoneInternational}`}
              className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-white no-underline hover:bg-white/10 transition"
              aria-label={isAr ? 'اتصال' : 'Call'}
            >
              <Phone className="h-4 w-4 opacity-90" />
              <span dir="ltr" className="font-semibold tracking-tight whitespace-nowrap">
                {COMPANY_INFO.phoneDisplay}
              </span>
            </a>

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-white no-underline hover:bg-white/10 transition"
              aria-label={isAr ? 'البريد الإلكتروني' : 'Email'}
            >
              <Mail className="h-4 w-4 opacity-90" />
              <span className="hidden sm:inline font-semibold tracking-tight">{COMPANY_INFO.email}</span>
              <span className="sm:hidden font-semibold tracking-tight">{isAr ? 'بريد' : 'Email'}</span>
            </a>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 rtl:flex-row-reverse">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
              >
                <i
                  className={`${s.iconClass} text-[15px]`}
                  aria-hidden="true"
                  style={
                    'gradient' in s
                      ? ({
                          backgroundImage: (s as any).gradient,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        } as any)
                      : ({ color: (s as any).color } as any)
                  }
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
