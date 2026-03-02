import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { IconPhone, IconWhatsapp } from '@/components/icons/etlaq';
import { useLocation } from 'wouter';
import { trackEvent } from '@/lib/analytics';
import LocalizedLink from '@/components/LocalizedLink';

function buildWhatsAppUrl(opts: { phone: string; text: string }) {
  const base = `https://wa.me/${opts.phone}`;
  const q = new URLSearchParams({ text: opts.text });
  return `${base}?${q.toString()}`;
}

export default function StickyCTA() {
  const { language, t } = useLanguage();
  const [location] = useLocation();

  const whatsappNumber = '966534145922';
  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://etlaqksa.com${location}`;

  const text =
    language === 'ar'
      ? `السلام عليكم، أريد طلب خدمة (حقن تربة/كشف تكهفات/دراسة جيوفيزيائية).\nرابط الصفحة: ${pageUrl}`
      : `Hello, I want to request a service (soil grouting / cavity detection / geophysical survey).\nPage: ${pageUrl}`;

  const whatsappUrl = buildWhatsAppUrl({ phone: whatsappNumber, text });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="container px-4 pb-4">
        <div className="rounded-2xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 shadow-lg p-3 flex gap-2">
          <LocalizedLink href="/request-service" className="flex-1">
            <Button
              className="w-full gap-2 !bg-[#1d4ed8] !text-white hover:!bg-[#1e40af]"
              size="lg"
              onClick={() =>
                trackEvent('sticky_request_click', {
                  placement: 'sticky',
                  spa_location: location,
                })
              }
            >
              <IconPhone className="h-5 w-5" />
              {t('nav.request')}
            </Button>
          </LocalizedLink>
          <a
            className="flex-1"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ga-placement="sticky"
            data-ga-intent="request_service"
          >
            <Button className="w-full gap-2" size="lg" variant="secondary">
              <IconWhatsapp className="h-5 w-5" />
              {language === 'ar' ? 'واتساب' : 'WhatsApp'}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
