import { useLanguage } from '@/contexts/LanguageContext';
import { SocialIcon } from '@/components/SocialIcons';
import LocalizedLink from '@/components/LocalizedLink';
import { COMPANY_INFO } from '@/config/company';
import { MapPin, Phone, Mail, ArrowUpRight, Building2 } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();

  const social = [
    { label: 'TikTok',     name: 'tiktok',    href: `https://www.tiktok.com/@${COMPANY_INFO.socialHandle}` },
    { label: 'Instagram',  name: 'instagram', href: `https://www.instagram.com/${COMPANY_INFO.socialHandle}/` },
    { label: 'X',          name: 'x',         href: `https://x.com/${COMPANY_INFO.socialHandle}` },
    { label: 'Telegram',   name: 'telegram',  href: `https://t.me/${COMPANY_INFO.socialHandle}` },
  ] as const;

  const quickLinks = [
    { name: t('nav.home'),     href: '/' },
    { name: t('nav.about'),    href: '/about' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.request'),  href: '/request-service' },
    { name: language === 'ar' ? 'مدن التغطية' : 'Coverage Cities', href: '/locations' },
    { name: language === 'ar' ? 'خريطة الموقع' : 'Sitemap', href: '/sitemap' },
  ];

  const services = [
    { name: language === 'ar' ? 'حقن التربة والأسمنتي' : 'Soil & Cement Grouting', href: '/services/grouting' },
    { name: language === 'ar' ? 'كشف التكهفات والفراغات' : 'Cavity & Void Detection', href: '/services/cavity' },
    { name: language === 'ar' ? 'الدراسات الجيوفيزيائية' : 'Geophysical Surveys', href: '/services/geophysical' },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="etlaq-footer relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-5" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="container relative pt-14 pb-8 md:pt-16 md:pb-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">

          {/* Brand Column */}
          <div className="space-y-5 lg:col-span-1">
            <img
              src="/logo-160.webp?v=5"
              srcSet="/logo-160.webp?v=5 160w, /logo-224.webp?v=5 224w"
              sizes="160px"
              alt="شركة إطلاق المتميزة"
              width="160"
              height="80"
              className="h-12 w-auto object-contain brightness-0 invert"
              loading="lazy"
              decoding="async"
            />
            <p className="text-sm leading-relaxed opacity-80 max-w-[260px]">
              {language === 'ar'
                ? 'رواد حلول حقن التربة ومعالجة التكهفات في المملكة العربية السعودية منذ أكثر من 15 عاماً'
                : 'Leading soil grouting and cavity treatment solutions in Saudi Arabia for over 15 years'}
            </p>

            {/* Stats chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { num: '200+', label: language === 'ar' ? 'مشروع' : 'Projects' },
                { num: '100+', label: language === 'ar' ? 'عميل' : 'Clients' },
                { num: '15+',  label: language === 'ar' ? 'سنة' : 'Years' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5 text-xs">
                  <span className="font-bold text-sm">{s.num}</span>
                  <span className="opacity-75">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <SocialIcon name={s.name} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <LocalizedLink href={link.href}>
                    <span className="group flex items-center gap-1.5 text-sm opacity-80 hover:opacity-100 cursor-pointer transition-opacity rtl:flex-row-reverse">
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      {link.name}
                    </span>
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h3>
            <ul className="space-y-2.5">
              {services.map((svc) => (
                <li key={svc.href}>
                  <LocalizedLink href={svc.href}>
                    <span className="group flex items-center gap-1.5 text-sm opacity-80 hover:opacity-100 cursor-pointer transition-opacity rtl:flex-row-reverse">
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      {svc.name}
                    </span>
                  </LocalizedLink>
                </li>
              ))}
            </ul>

            {/* Company profile WhatsApp */}
            <a
              href={`https://wa.me/966534145922?text=${encodeURIComponent(language === 'ar' ? 'السلام عليكم، أريد ملف بروفايل شركة إطلاق المتميزة.' : 'Hello, I would like the company profile of ETLAQ.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 transition-all duration-200 mt-2"
            >
              <span>📄</span>
              {language === 'ar' ? 'ملف الشركة (WhatsApp)' : 'Company Profile (WhatsApp)'}
            </a>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${COMPANY_INFO.phoneInternational}`}
                  className="flex items-start gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity group"
                >
                  <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20 flex-shrink-0 transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  <span dir="ltr" className="font-mono">{COMPANY_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity group"
                >
                  <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20 flex-shrink-0 transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span className="break-all">{COMPANY_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=4348+Anas+Bin+Malik+Road,+Al+Yasmin,+Riyadh,+Saudi+Arabia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity group"
                >
                  <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20 flex-shrink-0 transition-colors">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    {language === 'ar'
                      ? 'الرياض - حي الياسمين (طريق أنس بن مالك)'
                      : 'Riyadh - Al Yasmin (Anas Bin Malik Rd)'}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-70">

            <p>
              {language === 'ar'
                ? `© ${year} شركة إطلاق المتميزة المحدودة. جميع الحقوق محفوظة.`
                : `© ${year} ETLAQ Distinguished Company Ltd. All rights reserved.`}
            </p>

            {/* CR & VAT */}
            {(COMPANY_INFO.commercialRegister || COMPANY_INFO.vatNumber) && (
              <div className="flex flex-wrap items-center gap-3">
                {COMPANY_INFO.commercialRegister && (
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {language === 'ar' ? 'س.ت:' : 'CR:'} <span className="font-mono">{COMPANY_INFO.commercialRegister}</span>
                  </span>
                )}
                {COMPANY_INFO.vatNumber && (
                  <span className="flex items-center gap-1">
                    {language === 'ar' ? 'رقم ضريبي:' : 'VAT:'} <span className="font-mono">{COMPANY_INFO.vatNumber}</span>
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center gap-3">
              <LocalizedLink href="/terms">
                <span className="hover:underline cursor-pointer">
                  {language === 'ar' ? 'الشروط والأحكام' : 'Terms'}
                </span>
              </LocalizedLink>
              <span className="opacity-40">•</span>
              <LocalizedLink href="/privacy">
                <span className="hover:underline cursor-pointer">
                  {language === 'ar' ? 'الخصوصية' : 'Privacy'}
                </span>
              </LocalizedLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
