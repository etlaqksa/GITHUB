import { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, MessageCircle, FileText } from 'lucide-react';
import { IconWhatsapp } from '@/components/icons/etlaq';
import { Button } from '@/components/ui/button';
import LocalizedLink from '@/components/LocalizedLink';

const SESSION_KEY = 'etlaq-exit-popup-seen';
const MOBILE_TIMER_MS = 45_000; // 45 seconds on mobile
const MIN_TIME_ON_SITE_MS = 8_000; // Don't show within first 8 seconds

/**
 * Exit-Intent Popup: appears when user moves mouse toward top of viewport (desktop)
 * or after 45 seconds on mobile. Shows once per session.
 */
export default function ExitIntentPopup() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [show, setShow] = useState(false);
  const [loadTime] = useState(() => Date.now());

  const dismiss = useCallback(() => {
    setShow(false);
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    // Already shown this session
    try { if (sessionStorage.getItem(SESSION_KEY)) return; } catch { /* ignore */ }

    let active = true;

    // Desktop: mouseleave near top
    const onMouseLeave = (e: MouseEvent) => {
      if (!active) return;
      if (e.clientY > 5) return; // only near the top edge
      if (Date.now() - loadTime < MIN_TIME_ON_SITE_MS) return;
      setShow(true);
      active = false;
    };

    // Mobile: timer fallback
    const timer = setTimeout(() => {
      if (!active) return;
      // Only trigger on touch devices
      const isTouch = window.matchMedia?.('(pointer: coarse)')?.matches;
      if (isTouch) {
        setShow(true);
        active = false;
      }
    }, MOBILE_TIMER_MS);

    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      active = false;
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [loadTime]);

  if (!show) return null;

  const whatsappUrl = `https://wa.me/966534145922?${new URLSearchParams({
    text: isAr
      ? 'السلام عليكم، أحتاج مساعدة بخصوص خدمات حقن التربة.'
      : 'Hello, I need help with soil grouting services.',
  }).toString()}`;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9990] bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isAr ? 'هل تحتاج مساعدة؟' : 'Need help?'}
        className="fixed z-[9991] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,440px)] rounded-2xl border bg-background shadow-2xl animate-scale-in overflow-hidden"
      >
        {/* Header gradient */}
        <div className="relative p-6 pb-4 bg-gradient-to-br from-primary/10 to-primary/5">
          <button
            type="button"
            onClick={dismiss}
            className="absolute top-3 ltr:right-3 rtl:left-3 p-1 rounded-full hover:bg-muted transition-colors"
            aria-label={isAr ? 'إغلاق' : 'Close'}
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-primary/15">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold">
              {isAr ? 'هل تحتاج مساعدة؟' : 'Need help?'}
            </h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {isAr
              ? 'فريقنا جاهز لمساعدتك في اختيار الخدمة المناسبة أو الإجابة عن استفساراتك. تواصل معنا الآن!'
              : 'Our team is ready to help you choose the right service or answer your questions. Reach out now!'}
          </p>
        </div>

        {/* CTAs */}
        <div className="p-6 pt-4 space-y-3">
          <Button asChild size="lg" className="w-full gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <IconWhatsapp className="h-5 w-5" />
              {isAr ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
            </a>
          </Button>

          <Button asChild size="lg" variant="outline" className="w-full gap-2">
            <LocalizedLink href="/request-service">
              <FileText className="h-4 w-4" />
              {isAr ? 'اطلب تقييم مجاني' : 'Request free assessment'}
            </LocalizedLink>
          </Button>

          <button
            type="button"
            onClick={dismiss}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            {isAr ? 'لا شكرًا، سأتصفح الموقع' : "No thanks, I'll browse around"}
          </button>
        </div>
      </div>
    </>
  );
}
