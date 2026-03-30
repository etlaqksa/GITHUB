import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import LocalizedLink from '@/components/LocalizedLink';
import TrustStats from '@/components/TrustStats';
import CertificationsBar from '@/components/CertificationsBar';
import ProcessTimeline from '@/components/ProcessTimeline';
import EquipmentShowcase from '@/components/EquipmentShowcase';
import { Button } from '@/components/ui/button';
import { absUrl } from '@/lib/siteUrl';
import { trackEvent } from '@/lib/analytics';
import { buildLocalBusinessSchema } from '@/lib/companyProfile';
import { Target, Eye, Award, Lightbulb, CheckCircle2, ChevronLeft, ChevronRight, Building2, Globe, Phone } from 'lucide-react';
import { IconWhatsapp, IconLocation } from '@/components/icons/etlaq';

export default function About() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const lang = isAr ? 'ar' : 'en';
  const canonical = absUrl(`/${lang}/about`);

  const values = [
    { icon: Target, titleAr: 'التشخيص قبل التنفيذ', titleEn: 'Diagnosis Before Execution', descAr: 'لا نقدّم حلاً قبل أن نفهم المشكلة بعمق. التشخيص الدقيق هو أساس أي تدخل ناجح.', descEn: "We don't propose a solution before deeply understanding the problem. Accurate diagnosis is the foundation of any successful intervention.", accent: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: CheckCircle2, titleAr: 'الوضوح في المخرجات', titleEn: 'Clear Deliverables', descAr: 'تقاريرنا مصممة لتدعم قرارك — لا لملء ملفات لن تُقرأ. ملخص واضح وتوصية محددة.', descEn: 'Our reports are designed to support your decision — not fill unread files. Clear summary and specific recommendation.', accent: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Award, titleAr: 'التميّز والجودة', titleEn: 'Excellence & Quality', descAr: 'نلتزم بأعلى معايير الجودة في كل مشروع — من أصغر تدخل ميداني إلى أكبر المشاريع.', descEn: 'We commit to the highest quality standards on every project — from the smallest field intervention to the largest projects.', accent: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: Lightbulb, titleAr: 'الابتكار التطبيقي', titleEn: 'Applied Innovation', descAr: 'نختار التقنية الأنسب لكل حالة — لا نحصر أنفسنا بحل واحد لجميع المشاكل.', descEn: "We select the most appropriate technique for each case — we don't limit ourselves to one solution for all problems.", accent: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const milestones = [
    { yearAr: '٢٠٠٩', yearEn: '2009', eventAr: 'تأسيس الشركة في الرياض', eventEn: 'Company founded in Riyadh' },
    { yearAr: '٢٠١٥', yearEn: '2015', eventAr: 'مشروع مترو الرياض — أول مشروع ضخم', eventEn: 'Riyadh Metro — first major project' },
    { yearAr: '٢٠١٧', yearEn: '2017', eventAr: 'توسع الخدمات لتشمل الدراسات الجيوفيزيائية', eventEn: 'Services expanded to include geophysical surveys' },
    { yearAr: '٢٠١٩', yearEn: '2019', eventAr: 'تجاوز ١٠٠ مشروع منجز', eventEn: 'Surpassed 100 completed projects' },
    { yearAr: '٢٠٢١', yearEn: '2021', eventAr: 'توسيع التغطية لجميع مناطق المملكة', eventEn: 'Coverage expanded to all KSA regions' },
    { yearAr: '٢٠٢٤', yearEn: '2024', eventAr: '+٢٠٠ مشروع — نمو مستمر', eventEn: '200+ projects — continued growth' },
  ];

  const sectors = [
    { ar: 'مشاريع حكومية', en: 'Government projects' },
    { ar: 'مطورون عقاريون', en: 'Real estate developers' },
    { ar: 'شركات مقاولات', en: 'Contracting companies' },
    { ar: 'مكاتب استشارية', en: 'Consultancy firms' },
    { ar: 'ملّاك عقارات', en: 'Property owners' },
    { ar: 'مشاريع البنية التحتية', en: 'Infrastructure projects' },
  ];

  return (
    <div className="w-full">
      <SEO
        title={isAr ? 'من نحن | شركة إطلاق المتميزة' : 'About Us | ETLAQ Distinguished Company'}
        description={isAr ? 'شركة إطلاق المتميزة المحدودة — رواد حقن التربة وكشف التكهفات والدراسات الجيوفيزيائية في المملكة العربية السعودية.' : 'ETLAQ Distinguished Company Ltd. — leaders in soil grouting, cavity detection, and geophysical surveys in Saudi Arabia.'}
        url={canonical}
        schema={{ '@context': 'https://schema.org', '@graph': [buildLocalBusinessSchema({ url: canonical, logoUrl: absUrl('/logo.webp') })] }}
      />

      {/* HERO */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container relative">
          <Breadcrumbs items={[{ name: isAr ? 'من نحن' : 'About', href: '/about', isCurrent: true }]} className="mb-6" />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-semibold text-white/80 mb-6">🏢 {isAr ? 'من نحن' : 'About Us'}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {isAr ? <><span>شركة إطلاق</span><br /><span className="text-blue-400">المتميزة المحدودة</span></> : <><span>ETLAQ</span><br /><span className="text-blue-400">Distinguished Company</span></>}
            </h1>
            <p className="text-lg text-white/75 leading-relaxed max-w-2xl mb-8">
              {isAr ? 'رواد حلول حقن التربة وكشف التكهفات والدراسات الجيوفيزيائية في المملكة العربية السعودية — أكثر من 15 عامًا من الخبرة الميدانية الفعلية.' : 'Leaders in soil grouting, cavity detection, and geophysical survey solutions in Saudi Arabia — over 15 years of real field experience.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <LocalizedLink href="/request-service">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white border-0 gap-2" onClick={() => trackEvent('about_hero_request', { language })}>
                  {isAr ? 'اطلب تقييم' : 'Request assessment'}{isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </LocalizedLink>
              <a href="tel:+966534145922" onClick={() => trackEvent('about_hero_call', { language })} className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/20 transition">
                <Phone className="h-4 w-4" />+966534145922
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-white border-b"><div className="container"><TrustStats /></div></section>

      {/* VISION & MISSION */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-2xl border bg-blue-50 border-blue-200 p-7">
              <div className="flex items-center gap-3 mb-4"><div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center"><Eye className="h-5 w-5 text-blue-600" /></div><h2 className="text-lg font-bold text-blue-900">{isAr ? 'رؤيتنا' : 'Our Vision'}</h2></div>
              <p className="text-blue-800 leading-relaxed text-sm text-start">{isAr ? 'أن نكون المرجع الأول في حلول معالجة التربة والأساسات في المملكة — معروفون بدقة التشخيص وجودة التنفيذ ووضوح المخرجات.' : 'To be the primary reference for soil and foundation remediation solutions in Saudi Arabia — known for diagnostic accuracy, execution quality, and clear deliverables.'}</p>
            </div>
            <div className="rounded-2xl border bg-slate-50 border-slate-200 p-7">
              <div className="flex items-center gap-3 mb-4"><div className="h-10 w-10 rounded-xl bg-slate-200 flex items-center justify-center"><Target className="h-5 w-5 text-slate-700" /></div><h2 className="text-lg font-bold text-slate-900">{isAr ? 'مهمتنا' : 'Our Mission'}</h2></div>
              <p className="text-slate-700 leading-relaxed text-sm text-start">{isAr ? 'تقديم حلول ميدانية دقيقة تبدأ بتشخيص صحيح وتنتهي بمخرجات واضحة — تساعد عملاءنا على اتخاذ قرارات هندسية بثقة وتقليل المخاطر.' : 'Delivering precise field solutions that start with the right diagnosis and end with clear deliverables — helping clients make engineering decisions with confidence and reduce project risks.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-10"><h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{isAr ? 'قيمنا الجوهرية' : 'Our Core Values'}</h2><p className="text-slate-500 text-sm">{isAr ? 'المبادئ التي توجّه كل قرار وكل مشروع' : 'The principles that guide every decision and every project'}</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => { const Icon = v.icon; return (<div key={i} className="rounded-2xl border bg-white p-6 text-start shadow-sm hover:shadow-md transition-shadow"><div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${v.bg}`}><Icon className={`h-6 w-6 ${v.accent}`} /></div><h3 className="font-bold text-slate-900 mb-2">{isAr ? v.titleAr : v.titleEn}</h3><p className="text-slate-500 text-sm leading-relaxed">{isAr ? v.descAr : v.descEn}</p></div>); })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12"><div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-600 mb-4">📅 {isAr ? 'مسيرتنا' : 'Our journey'}</div><h2 className="text-2xl md:text-3xl font-bold text-slate-900">{isAr ? 'محطات بارزة في تاريخ إطلاق' : "Key milestones in Etlaq's history"}</h2></div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute top-0 bottom-0 rtl:right-[19px] ltr:left-[19px] w-0.5 bg-slate-200" aria-hidden />
              <div className="space-y-8">
                {milestones.map((m, i) => (<div key={i} className="flex items-start gap-5 rtl:flex-row-reverse"><div className="relative z-10 flex-shrink-0 h-10 w-10 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center shadow-sm"><div className="h-3 w-3 rounded-full bg-blue-500" /></div><div className="flex-1 pb-2 text-start"><div className="text-xs font-bold text-blue-600 mb-0.5 font-mono">{isAr ? m.yearAr : m.yearEn}</div><div className="font-semibold text-slate-800 text-sm">{isAr ? m.eventAr : m.eventEn}</div></div></div>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-10"><h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{isAr ? 'من نخدم؟' : 'Who Do We Serve?'}</h2></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
            {sectors.map((s, i) => (<div key={i} className="rounded-xl border bg-white p-3 text-center text-sm font-medium text-slate-700 shadow-sm">{isAr ? s.ar : s.en}</div>))}
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <EquipmentShowcase className="bg-slate-50" />

      {/* CERTIFICATIONS */}
      <section className="py-8"><div className="container"><CertificationsBar variant="dark" /></div></section>

      {/* CONTACT & COVERAGE */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-2xl border bg-white p-7">
              <h2 className="text-xl font-bold text-slate-900 mb-6">{isAr ? 'تواصل معنا' : 'Contact Us'}</h2>
              <div className="space-y-4">
                <a href="tel:+966534145922" className="flex items-center gap-3 text-slate-700 hover:text-blue-600 transition"><Phone className="h-5 w-5 text-blue-600 flex-shrink-0" /><span className="font-semibold" dir="ltr">+966 534 145 922</span></a>
                <a href="https://wa.me/966534145922" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-700 hover:text-emerald-600 transition"><IconWhatsapp className="h-5 w-5 text-emerald-500 flex-shrink-0" /><span className="font-semibold">WhatsApp</span></a>
                <div className="flex items-start gap-3 text-slate-600"><IconLocation className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" /><span className="text-sm leading-relaxed">{isAr ? 'الرياض — حي الياسمين (طريق أنس بن مالك)' : 'Riyadh — Al Yasmin (Anas Bin Malik Rd)'}</span></div>
                <div className="flex items-center gap-3 text-slate-600"><Globe className="h-5 w-5 text-slate-400 flex-shrink-0" /><a href="https://etlaqksa.com" className="text-blue-600 hover:underline text-sm font-semibold" target="_blank" rel="noopener noreferrer">etlaqksa.com</a></div>
              </div>
            </div>
            <div className="rounded-2xl border bg-blue-600 text-white p-7">
              <div className="flex items-center gap-3 mb-5"><Building2 className="h-6 w-6 text-white/80" /><h2 className="text-xl font-bold">{isAr ? 'تغطيتنا الجغرافية' : 'Our Geographic Coverage'}</h2></div>
              <p className="text-blue-100 text-sm leading-relaxed mb-5">{isAr ? 'فرق ميدانية جاهزة في جميع مناطق المملكة.' : 'Field teams ready across all KSA regions.'}</p>
              <div className="grid grid-cols-2 gap-1.5 mb-6">
                {(isAr ? ['الرياض','جدة','الدمام','مكة المكرمة','المدينة','الطائف','تبوك','أبها','القصيم','+١٠ مدن'] : ['Riyadh','Jeddah','Dammam','Makkah','Madinah','Taif','Tabuk','Abha','Qassim','10+ more']).map((c,i) => (<div key={i} className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium">{c}</div>))}
              </div>
              <LocalizedLink href="/locations"><Button variant="secondary" size="sm" className="gap-2 bg-white text-blue-700 hover:bg-blue-50">{isAr ? 'استعرض جميع المدن' : 'Browse all cities'}{isAr ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}</Button></LocalizedLink>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{isAr ? 'هل تريد معرفة المزيد أو طلب خدمة؟' : 'Want to know more or request a service?'}</h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">{isAr ? 'تواصل معنا الآن وسيعود إليك مختص بتقييم أولي سريع وخطوة واضحة.' : 'Contact us now and a specialist will get back to you with a quick initial assessment and clear next step.'}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <LocalizedLink href="/request-service"><Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8" onClick={() => trackEvent('about_bottom_request', { language })}>{isAr ? 'اطلب تقييم' : 'Request assessment'}</Button></LocalizedLink>
            <LocalizedLink href="/contact"><Button size="lg" variant="outline" className="px-8">{isAr ? 'تواصل معنا' : 'Contact us'}</Button></LocalizedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
