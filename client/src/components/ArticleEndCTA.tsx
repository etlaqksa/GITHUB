import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { Button } from '@/components/ui/button';
import { IconWhatsapp } from '@/components/icons/etlaq';
import { trackEvent } from '@/lib/analytics';
import { absUrl } from '@/lib/siteUrl';
import { useMemo } from 'react';
import { PhoneCall, FileText } from 'lucide-react';

type Props = {
  /** Article title to include in WhatsApp message */
  articleTitle?: string;
  /** Hint which service is most relevant for smarter CTA copy */
  serviceHint?: 'grouting' | 'cavity' | 'geophysical' | 'general';
};

export default function ArticleEndCTA({ articleTitle, serviceHint = 'general' }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const pageUrl = useMemo(() => {
    if (typeof window !== 'undefined') return window.location.href;
    return absUrl('/blog');
  }, []);

  const waText = isAr
    ? `السلام عليكم، قرأت مقال "${articleTitle || 'مقال إطلاق'}" وأود الاستفسار أو طلب خدمة.\n${pageUrl}`
    : `Hello, I read the article "${articleTitle || 'Etlaq article'}" and would like to inquire or request a service.\n${pageUrl}`;

  const waUrl = `https://wa.me/966534145922?text=${encodeURIComponent(waText)}`;

  const serviceLabels: Record<typeof serviceHint, { ar: string; en: string }> = {
    grouting: { ar: 'اطلب حقن تربة', en: 'Request soil grouting' },
    cavity: { ar: 'اطلب كشف تكهفات', en: 'Request cavity detection' },
    geophysical: { ar: 'اطلب دراسة جيوفيزيائية', en: 'Request geophysical survey' },
    general: { ar: 'اطلب خدمة', en: 'Request a service' },
  };

  const requestLabel = isAr
    ? serviceLabels[serviceHint].ar
    : serviceLabels[serviceHint].en;

  const requestHref: Record<typeof serviceHint, string> = {
    grouting: '/request-service?service=grouting',
    cavity: '/request-service?service=cavity',
    geophysical: '/request-service?service=geophysical',
    general: '/request-service',
  };

  return (
    <section
      className="mt-12 rounded-2xl border bg-gradient-to-br from-blue-50 to-slate-50 p-6 md:p-8 shadow-sm"
      aria-label={isAr ? 'هل تحتاج مساعدة؟' : 'Need help?'}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 mb-3">
          <FileText className="h-6 w-6 text-blue-600" aria-hidden="true" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
          {isAr
            ? 'هل تواجه مشكلة مماثلة؟'
            : 'Facing a similar challenge?'}
        </h2>
        <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          {isAr
            ? 'فريق إطلاق يساعدك تشخّص الوضع وتحدد الخطوة الأولى. تواصل معنا للحصول على تقييم أولي سريع.'
            : 'Etlaq\'s team helps you diagnose the situation and determine the first step. Contact us for a quick initial assessment.'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
        <LocalizedLink href={requestHref[serviceHint]} className="flex-1">
          <Button
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
            onClick={() => trackEvent('article_end_cta_request', { language, serviceHint })}
          >
            <PhoneCall className="h-4 w-4" />
            {requestLabel}
          </Button>
        </LocalizedLink>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('article_end_cta_whatsapp', { language, serviceHint })}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-emerald-500 bg-white px-5 py-3 text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-[0.98]"
        >
          <IconWhatsapp className="h-5 w-5 text-[#25D366]" />
          {isAr ? 'واتساب' : 'WhatsApp'}
        </a>
      </div>

      {/* Trust footnote */}
      <p className="mt-5 text-center text-xs text-slate-400">
        {isAr
          ? 'نخدم جميع مناطق المملكة • الرياض • جدة • الدمام • مكة • المدينة وغيرها'
          : 'Serving all KSA regions • Riyadh • Jeddah • Dammam • Makkah • Madinah & more'}
      </p>
    </section>
  );
}
