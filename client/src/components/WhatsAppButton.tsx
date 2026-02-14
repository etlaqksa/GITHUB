import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'wouter';

function buildWhatsAppUrl(opts: { phone: string; text: string }) {
  const base = `https://wa.me/${opts.phone}`;
  const q = new URLSearchParams({ text: opts.text });
  return `${base}?${q.toString()}`;
}

function getContextualWhatsAppText(language: 'ar' | 'en', path: string, pageUrl: string) {
  const isAr = language === 'ar';

  const baseAr = `السلام عليكم، أود الاستفسار عن خدماتكم.
فضلاً شاركوني بالخطوة التالية (تقييم/زيارة/عرض).
`;

  const baseEn = `Hello, I would like to inquire about your services.
Please advise the next step (assessment / visit / quote).
`;

  const serviceHint = (() => {
    if (path.startsWith('/services/grouting')) return isAr ? 'الخدمة: حقن التربة' : 'Service: Soil grouting';
    if (path.startsWith('/services/cavity')) return isAr ? 'الخدمة: كشف التكهفات' : 'Service: Cavity detection';
    if (path.startsWith('/services/geophysical')) return isAr ? 'الخدمة: الدراسات الجيوفيزيائية' : 'Service: Geophysical surveys';
    if (path.startsWith('/request-service')) return isAr ? 'الصفحة: نموذج طلب خدمة' : 'Page: Service request form';
    if (path.startsWith('/projects')) return isAr ? 'الصفحة: مشاريعنا' : 'Page: Projects';
    if (path.startsWith('/for/')) return isAr ? 'الصفحة: مسار مناسب حسب نوع العميل' : 'Page: Audience path';
    return isAr ? 'الخدمة: (حدد الخدمة المناسبة)' : 'Service: (choose the right one)';
  })();

  const prompt = isAr
    ? '\nبيانات سريعة (اختياري):\n- المدينة:\n- نوع المشروع:\n- وصف المشكلة:\n'
    : '\nQuick info (optional):\n- City:\n- Project type:\n- Issue description:\n';

  return `${isAr ? baseAr : baseEn}${serviceHint}${prompt}\n${isAr ? 'رابط الصفحة:' : 'Page link:'} ${pageUrl}`;
}

export default function WhatsAppButton() {
  const { language } = useLanguage();
  const [location] = useLocation();
  const isAr = language === 'ar';

  const whatsappNumber = '966534145922';
  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://etlaqksa.com${location}`;

  const whatsappText = getContextualWhatsAppText(language as 'ar' | 'en', location, pageUrl);
  const whatsappUrl = buildWhatsAppUrl({ phone: whatsappNumber, text: whatsappText });

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ga-placement="floating"
      data-ga-intent="general"
      className="fixed bottom-24 md:bottom-6 right-6 z-50 bg-[oklch(0.65_0.18_195)] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 group"
      aria-label={isAr ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
      title={isAr ? "واتساب" : "WhatsApp"}
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 rounded-full bg-black/80 text-white text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        {isAr ? "واتساب" : "WhatsApp"}
      </span>
    </a>
  );
}
