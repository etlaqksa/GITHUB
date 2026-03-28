import { useLanguage } from '@/contexts/LanguageContext';
import { IconWhatsapp } from '@/components/icons/etlaq';
import { AlertTriangle, Phone } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { absUrl } from '@/lib/siteUrl';
import { useMemo } from 'react';

type Props = {
  className?: string;
};

export default function EmergencyCTA({ className = '' }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const pageUrl = useMemo(() => {
    if (typeof window !== 'undefined') return window.location.href;
    return absUrl('/');
  }, []);

  const whatsappText = isAr
    ? `السلام عليكم، لدي حالة طارئة تتعلق بمشكلة في التربة/الأساسات وأحتاج استشارة سريعة.\nرابط الصفحة: ${pageUrl}`
    : `Hello, I have an urgent soil/foundation issue and need quick consultation.\nPage: ${pageUrl}`;

  const whatsappUrl = `https://wa.me/966534145922?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section
      className={`py-10 ${className}`}
      aria-label={isAr ? 'مساعدة عاجلة' : 'Emergency help'}
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-8 md:px-10 shadow-xl shadow-red-900/20">
          {/* Decorative background pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Icon */}
            <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-white" aria-hidden="true" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                {isAr
                  ? 'هبوط مفاجئ أو تشقق واسع؟'
                  : 'Sudden settlement or wide crack?'}
              </h2>
              <p className="text-red-100 text-sm md:text-base leading-relaxed">
                {isAr
                  ? 'لا تتأخر — التشخيص المبكر يقلل الأضرار والتكاليف بشكل كبير. تواصل معنا الآن للحصول على تقييم سريع وتحديد الخطوة الأولى.'
                  : 'Don\'t delay — early diagnosis significantly reduces damage and costs. Contact us now for a quick assessment and first step.'}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('emergency_whatsapp_click', { language })}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-red-700 hover:bg-red-50 transition shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
              >
                <IconWhatsapp className="h-5 w-5 text-[#25D366]" />
                {isAr ? 'واتساب الآن' : 'WhatsApp Now'}
              </a>
              <a
                href="tel:+966534145922"
                onClick={() => trackEvent('emergency_call_click', { language })}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-red-700/50 px-5 py-3 text-sm font-bold text-white hover:bg-red-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                {isAr ? 'اتصل مباشرة' : 'Call Directly'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
