import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, Home as HomeIcon, Clock, ArrowRight, ArrowLeft, Briefcase, Phone } from 'lucide-react';
import { IconWhatsapp } from '@/components/icons/etlaq';
import { useLocation } from 'wouter';
import LocalizedLink from '@/components/LocalizedLink';
import { COMPANY_INFO } from '@/config/company';

function getCopy(language: 'ar' | 'en', form: string | null) {
  const isRequest = form === 'request-service';
  const titleAr = isRequest ? 'تم استلام طلب الخدمة بنجاح ✅' : 'تم استلام رسالتك بنجاح ✅';
  const titleEn = isRequest ? 'Service request received ✅' : 'Message received ✅';

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

const relatedLinks = [
  {
    href: '/projects',
    labelAr: 'شاهد مشاريعنا السابقة',
    labelEn: 'View our previous projects',
    icon: Briefcase,
  },
  {
    href: '/services',
    labelAr: 'استكشف جميع خدماتنا',
    labelEn: 'Explore all our services',
    icon: Briefcase,
  },
  {
    href: '/faq',
    labelAr: 'الأسئلة الشائعة',
    labelEn: 'Frequently asked questions',
    icon: Briefcase,
  },
];

export default function ThankYou() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [location] = useLocation();

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const form = params.get('form');
  const copy = getCopy(language as 'ar' | 'en', form);

  const whatsappNumber = '966534145922';
  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://etlaqksa.com${location}`;
  const waText =
    language === 'ar'
      ? `السلام عليكم، تواصلت عبر الموقع وتم إرسال ${(form === 'request-service') ? 'طلب خدمة' : 'رسالة'}.\n\nرابط الصفحة: ${pageUrl}`
      : `Hello, I contacted you via the website and submitted a ${(form === 'request-service') ? 'service request' : 'message'}.\n\nPage: ${pageUrl}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?${new URLSearchParams({ text: waText }).toString()}`;

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <>
      <SEO
        title={language === 'ar' ? 'تم الاستلام | إطلاق' : 'Received | ETLAQ'}
        description={copy.desc}
        noIndex
      />
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto etlaq-card">
            <CardHeader className="bg-muted/25">
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                {copy.title}
              </CardTitle>
              <CardDescription className="text-base">{copy.desc}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6">
              {/* Time commitment */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <p className="text-sm font-medium">
                  {isAr
                    ? '⏰ سنتواصل معك خلال 24 ساعة كحد أقصى. للاستفسارات العاجلة، تواصل معنا مباشرة عبر واتساب.'
                    : '⏰ We will contact you within 24 hours. For urgent inquiries, reach us directly via WhatsApp.'}
                </p>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <IconWhatsapp className="h-5 w-5" />
                    {copy.ctaWhatsApp}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a href={`tel:${COMPANY_INFO.phoneInternational}`} className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {isAr ? 'اتصل بنا' : 'Call us'}
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                  <LocalizedLink href="/" className="inline-flex items-center gap-2">
                    <HomeIcon className="h-4 w-4" />
                    {copy.ctaHome}
                  </LocalizedLink>
                </Button>
              </div>

              {/* Explore more */}
              <div className="border-t pt-5">
                <h3 className="text-lg font-bold mb-3">
                  {isAr ? 'استكشف المزيد' : 'Explore more'}
                </h3>
                <div className="space-y-2">
                  {relatedLinks.map((link) => (
                    <LocalizedLink
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <link.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="flex-1 font-medium text-sm">
                        {isAr ? link.labelAr : link.labelEn}
                      </span>
                      <ArrowIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </LocalizedLink>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {isAr
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