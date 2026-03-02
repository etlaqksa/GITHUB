import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import {CheckCircle2, Home as HomeIcon} from 'lucide-react';
import { IconWhatsapp } from '@/components/icons/etlaq';
import { useLocation } from 'wouter';
import LocalizedLink from '@/components/LocalizedLink';

function getCopy(language: 'ar' | 'en', form: string | null) {
  const isRequest = form === 'request-service';
  const titleAr = isRequest ? 'تم استلام طلب الخدمة' : 'تم استلام رسالتك';
  const titleEn = isRequest ? 'Service request received' : 'Message received';

  const descAr = isRequest
    ? 'شكرًا لك. تم استلام بياناتك وسنتواصل معك قريبًا بخطوة تالية واضحة.'
    : 'شكرًا لك. تم استلام رسالتك وسنعاود التواصل معك قريبًا.';
  const descEn = isRequest
    ? 'Thank you. We received your details and will reply soon with a clear next step.'
    : 'Thank you. We received your message and will get back to you soon.';

  return {
    title: language === 'ar' ? titleAr : titleEn,
    desc: language === 'ar' ? descAr : descEn,
    ctaWhatsApp: language === 'ar' ? 'تواصل واتساب الآن' : 'WhatsApp now',
    ctaHome: language === 'ar' ? 'العودة للرئيسية' : 'Back to home',
  };
}

export default function ThankYou() {
  const { language } = useLanguage();
  const [location] = useLocation();

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const form = params.get('form');
  const copy = getCopy(language as 'ar' | 'en', form);

  const whatsappNumber = '966534145922';
  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://etlaqksa.com${location}`;
  const waText =
    language === 'ar'
      ? `السلام عليكم، تواصلت عبر الموقع وتم إرسال ${(form === 'request-service') ? 'طلب خدمة' : 'رسالة'}.

رابط الصفحة: ${pageUrl}`
      : `Hello, I contacted you via the website and submitted a ${(form === 'request-service') ? 'service request' : 'message'}.

Page: ${pageUrl}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?${new URLSearchParams({ text: waText }).toString()}`;

  return (
    <>
      <SEO
        title={language === 'ar' ? 'تم الاستلام | إطلاق' : 'Received | ETLAQ'}
        description={copy.desc}
        noIndex
      />
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="bg-muted/25">
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                {copy.title}
              </CardTitle>
              <CardDescription>{copy.desc}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="w-full sm:w-auto">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <IconWhatsapp className="h-4 w-4" />
                    {copy.ctaWhatsApp}
                  </a>
                </Button>
                <Button asChild variant="secondary" className="w-full sm:w-auto">
                  <LocalizedLink href="/" className="inline-flex items-center gap-2">
                    <HomeIcon className="h-4 w-4" />
                    {copy.ctaHome}
                  </LocalizedLink>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? 'ملاحظة: إذا كنت تحتاج خدمة عاجلة، يفضّل التواصل عبر واتساب لتسريع الاستجابة.'
                  : 'Note: For urgent requests, WhatsApp is the fastest way to reach us.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}