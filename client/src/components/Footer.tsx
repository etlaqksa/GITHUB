import { useLanguage } from '@/contexts/LanguageContext';
import { SocialIcon } from '@/components/SocialIcons';
import LocalizedLink from '@/components/LocalizedLink';
import { COMPANY_INFO } from '@/config/company';

function IconPhone({ className }: { className?: string }) {
  return (
    <img
      src="/social-icons/phone.webp"
      width="24"
      height="24"
      className={className}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

function IconEmail({ className }: { className?: string }) {
  return (
    <img
      src="/social-icons/email.webp"
      width="24"
      height="24"
      className={className}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

function IconLocation({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
      fill="none"
      focusable="false"
      aria-hidden="true"
      role="presentation"
      className={['etlaq-icon', className].filter(Boolean).join(' ')}
    >
      <path d="M24 4C16.3 4 10 10.3 10 18C10 28.5 24 44 24 44C24 44 38 28.5 38 18C38 10.3 31.7 4 24 4Z" fill="url(#realSilver)" filter="url(#innerShadow)" stroke="url(#realBlue)" strokeWidth="2.5" />
      <circle cx="24" cy="18" fill="url(#realGold)" r="5" />
    </svg>
  );
}

export default function Footer() {
  const { t, language } = useLanguage();

  const social = [
  {
    label: 'TikTok',
    name: 'tiktok',
    href: `https://www.tiktok.com/@${COMPANY_INFO.socialHandle}`,
  },
  {
    label: 'Instagram',
    name: 'instagram',
    href: `https://www.instagram.com/${COMPANY_INFO.socialHandle}/`,
  },
  {
    label: 'X',
    name: 'x',
    href: `https://x.com/${COMPANY_INFO.socialHandle}`,
  },
  {
    label: 'Telegram',
    name: 'telegram',
    href: `https://t.me/${COMPANY_INFO.socialHandle}`,
  },
] as const;

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.request'), href: '/request-service' },
    { name: language === 'ar' ? 'مدن التغطية' : 'Coverage cities', href: '/locations' },
    { name: language === 'ar' ? 'خريطة الموقع' : 'Sitemap', href: '/sitemap' },
  ];

  const services = [
    { name: t('services.grouting'), href: '/services/grouting' },
    { name: t('services.cavity'), href: '/services/cavity' },
    { name: t('services.geophysical'), href: '/services/geophysical' },
  ];

  return (
    <footer className="etlaq-footer">
      <div className="container py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <img 
              src="/logo-160.webp?v=5"
              srcSet="/logo-160.webp?v=5 160w, /logo-224.webp?v=5 224w, /logo-320.webp?v=5 320w, /logo.webp?v=5 448w"
              sizes="(max-width: 640px) 160px, 224px" 
              alt="شركة إطلاق المتميزة" 
              width="224"
              height="112" 
              className="h-12 w-auto object-contain brightness-0 invert"
              loading="lazy"
              decoding="async"
            />
            <p className="text-sm opacity-90">
              {language === 'ar'
                ? 'رواد حلول حقن التربة ومعالجة التكهفات في المملكة العربية السعودية منذ أكثر من 15 عاماً'
                : 'Leaders in soil grouting and cavity treatment solutions in Saudi Arabia for over 15 years'}
            </p>

            <div className="text-sm opacity-80 leading-relaxed">
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                <span>{language === 'ar' ? '200+ مشروع' : '200+ projects'}</span>
                <span>•</span>
                <span>{language === 'ar' ? '100+ عميل' : '100+ clients'}</span>
                <span>•</span>
                <LocalizedLink href="/locations" className="hover:underline opacity-90 hover:opacity-100">
                  {language === 'ar' ? '+20 مدينة' : '20+ cities'}
                </LocalizedLink>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2 rtl:flex-row-reverse">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition no-underline"
                >
                  <SocialIcon name={s.name} className="w-3.5 h-3.5" /></a>
              ))}
            </div>
          </div>

          {/* Quick Links + Services — side by side in one column */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide opacity-70">
                {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
              </h3>
              <ul className="space-y-1.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <LocalizedLink href={link.href}>
                      <span className="text-sm hover:underline opacity-90 hover:opacity-100 cursor-pointer">
                        {link.name}
                      </span>
                    </LocalizedLink>
                  </li>
                ))}
                <li>
                  <a
                    href="https://wa.me/966534145922?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D9%85%D9%84%D9%81%20%D8%A8%D8%B1%D9%88%D9%81%D8%A7%D9%8A%D9%84%20%D8%B4%D8%B1%D9%83%D8%A9%20%D8%A5%D8%B7%D9%84%D8%A7%D9%82%20%D8%A7%D9%84%D9%85%D8%AA%D9%85%D9%8A%D8%B2%D8%A9%20%28Company%20Profile%29%20%D9%85%D9%86%20%D9%81%D8%B6%D9%84%D9%83."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline opacity-90 hover:opacity-100"
                  >
                    {t('nav.profile')}
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide opacity-70">
                {language === 'ar' ? 'خدماتنا' : 'Services'}
              </h3>
              <ul className="space-y-1.5">
                {services.map((service) => (
                  <li key={service.href}>
                    <LocalizedLink href={service.href}>
                      <span className="text-sm hover:underline opacity-90 hover:opacity-100 cursor-pointer">
                        {service.name}
                      </span>
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide opacity-70">
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 rtl:space-x-reverse text-sm">
                <IconPhone className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-90" />
                <a 
                  href={`tel:${COMPANY_INFO.phoneInternational}`} 
                  className="opacity-90 hover:opacity-100 hover:underline transition-all whitespace-nowrap"
                  dir="ltr"
                >
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse text-sm">
                <IconEmail className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-90" />
                <a 
                  href="mailto:etlaqksa@gmail.com" 
                  className="opacity-90 hover:opacity-100 hover:underline transition-all"
                >
                  etlaqksa@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse text-sm">
                <IconLocation className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-90" />
                <a 
                  href="https://maps.google.com/?q=4348+Anas+Bin+Malik+Road,+Al+Yasmin,+Riyadh,+Saudi+Arabia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="opacity-90 hover:opacity-100 hover:underline transition-all"
                >
                  {language === 'ar'
                    ? 'الرياض - حي الياسمين (طريق أنس بن مالك)'
                    : 'Riyadh - Al Yasmin (Anas Bin Malik Rd)'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-5 border-t border-white/15 text-center text-sm opacity-90">
          <p>
            {language === 'ar'
              ? `© ${new Date().getFullYear()} شركة إطلاق المتميزة المحدودة. جميع الحقوق محفوظة.`
              : `© ${new Date().getFullYear()} ETLAQ Distinguished Company Ltd. All rights reserved.`}
          </p>

          {(COMPANY_INFO.commercialRegister || COMPANY_INFO.vatNumber) && (
            <div className="mt-2 text-xs opacity-75 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {COMPANY_INFO.commercialRegister && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="opacity-60">{language === 'ar' ? 'السجل التجاري:' : 'CR:'}</span>
                  <span className="font-semibold font-mono tracking-wide">{COMPANY_INFO.commercialRegister}</span>
                </span>
              )}
              {COMPANY_INFO.commercialRegister && COMPANY_INFO.vatNumber && (
                <span className="opacity-30">|</span>
              )}
              {COMPANY_INFO.vatNumber && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="opacity-60">{language === 'ar' ? 'الرقم الضريبي:' : 'VAT:'}</span>
                  <span className="font-semibold font-mono tracking-wide">{COMPANY_INFO.vatNumber}</span>
                </span>
              )}
            </div>
          )}

          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <LocalizedLink href="/terms">
              <span className="hover:underline cursor-pointer">
                {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
              </span>
            </LocalizedLink>
            <span className="opacity-60">•</span>
            <LocalizedLink href="/privacy">
              <span className="hover:underline cursor-pointer">
                {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </span>
            </LocalizedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

