import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { isAntiInspectEnabled } from '@/lib/antiInspectBootstrap';

/**
 * Lightweight anti-inspect UX deterrent.
 * NOTE: This does NOT provide real security. It only discourages casual inspection.
 * Toggle via: VITE_ANTI_INSPECT=true
 */
export default function AntiInspectGuard() {
  const { language, dir } = useLanguage();
  const enabled = useMemo(() => isAntiInspectEnabled(), []);
  const [devtoolsOpen, setDevtoolsOpen] = useState(false);

  const [humanInteracted, setHumanInteracted] = useState(false);
const suppressOverlay = useMemo(() => {
  if (typeof window === 'undefined') return true;
  const ua = String(navigator.userAgent || '').toLowerCase();

  const isIframe = (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  })();

  const isAutomation =
    // common headless / audit / screenshot agents
    /netlify|headless|lighthouse|chrome-lighthouse|prerender|puppeteer|playwright|selenium|cypress/.test(ua) ||
    // crawler-style agents
    /bot|crawler|spider|facebookexternalhit|twitterbot|slackbot|telegrambot/.test(ua) ||
    // webdriver signal
    (navigator as any).webdriver === true;

  // We keep blockers on always, but we hide the overlay for automated previews/screenshots.
  return isIframe || isAutomation;
}, []);


useEffect(() => {
  if (!enabled) return;
  if (typeof window === 'undefined') return;

  const mark = () => setHumanInteracted(true);

  window.addEventListener('pointerdown', mark, { capture: true, passive: true } as any);
  window.addEventListener('pointermove', mark, { capture: true, passive: true } as any);
  window.addEventListener('keydown', mark, true);
  window.addEventListener('scroll', mark, { capture: true, passive: true } as any);
  window.addEventListener('touchstart', mark, { capture: true, passive: true } as any);

  return () => {
    window.removeEventListener('pointerdown', mark, { capture: true } as any);
    window.removeEventListener('pointermove', mark, { capture: true } as any);
    window.removeEventListener('keydown', mark, true);
    window.removeEventListener('scroll', mark, { capture: true } as any);
    window.removeEventListener('touchstart', mark, { capture: true } as any);
  };
}, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

    // Mark DOM for CSS-based protections (long-press, selection rules, etc.)
    document.documentElement.classList.add('etlaq-guard-on');

    // --- Block a few common shortcuts (best-effort) ---
    const onKeyDown = (e: KeyboardEvent) => {
      const key = (e.key || '').toLowerCase();
      const ctrlOrMeta = e.ctrlKey || e.metaKey;

      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+U (view source)
      if (ctrlOrMeta && key === 'u') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+Shift+I (devtools)
      if (ctrlOrMeta && e.shiftKey && key === 'i') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl/Cmd+C (copy)
      if (ctrlOrMeta && key === 'c') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl/Cmd+X (cut)
      if (ctrlOrMeta && key === 'x') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+Shift+C (devtools element picker)
      if (ctrlOrMeta && e.shiftKey && key === 'c') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };

    // --- Disable right click on the whole site (user request) ---
    const onContextMenu = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // --- Block copy/cut via events (best-effort) ---
    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const onCut = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const onDragStart = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // --- DevTools detection (best-effort) ---
    const overlayEligible = () => {
      // Only show overlay on real desktop interaction patterns (mouse/trackpad).
      // Avoid false positives on mobile (including "Request desktop site" mode).
      try {
        const ua = String(navigator.userAgent || '').toLowerCase();
        const isMobileUA = /android|iphone|ipad|ipod|mobile/.test(ua);
        if (isMobileUA) return false;

        const mm = window.matchMedia;
        const fine = !!mm && mm('(pointer: fine)').matches;
        const hover = !!mm && mm('(hover: hover)').matches;

        return fine && hover && window.innerWidth >= 900 && window.innerHeight >= 600;
      } catch {
        return false;
      }
    };

    const detect = () => {
      if (!overlayEligible()) {
        setDevtoolsOpen(false);
        return;
      }

      const wDiff = Math.abs(window.outerWidth - window.innerWidth);
      const hDiff = Math.abs(window.outerHeight - window.innerHeight);

      // Docked DevTools usually creates a large delta.
      const opened = wDiff > 180 || hDiff > 180;
      setDevtoolsOpen(opened);
    };

    // Use capture so we run before page handlers.
    window.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('contextmenu', onContextMenu, { capture: true });
    document.addEventListener('contextmenu', onContextMenu, { capture: true });
    document.addEventListener('copy', onCopy, true);
    document.addEventListener('cut', onCut, true);
    document.addEventListener('dragstart', onDragStart, true);

    const i = window.setInterval(detect, 500);
    window.addEventListener('resize', detect);
    detect();

    return () => {
      document.documentElement.classList.remove('etlaq-guard-on');
      window.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('contextmenu', onContextMenu, { capture: true } as any);
      document.removeEventListener('contextmenu', onContextMenu, { capture: true } as any);
      document.removeEventListener('copy', onCopy, true);
      document.removeEventListener('cut', onCut, true);
      document.removeEventListener('dragstart', onDragStart, true);
      window.removeEventListener('resize', detect);
      window.clearInterval(i);
    };
  }, [enabled]);

  if (!enabled) return null;
  if (!devtoolsOpen) return null;
  if (suppressOverlay) return null;
  if (!humanInteracted) return null;

  const title = language === 'ar' ? 'تم تفعيل وضع الحماية' : 'Protection mode enabled';
  const body =
    language === 'ar'
      ? 'يرجى إغلاق أدوات المطور (DevTools) للمتابعة.'
      : 'Please close DevTools to continue.';

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      dir={dir}
    >
      <div className="max-w-md w-[min(92vw,520px)] rounded-2xl border border-white/15 bg-black/60 p-6 shadow-2xl">
        <div className="text-white">
          <div className="text-xl font-bold mb-2">{title}</div>
          <div className="text-white/80 leading-relaxed">{body}</div>
          <div className="mt-4 text-xs text-white/50">
            {language === 'ar'
              ? 'ملاحظة: هذا الإجراء ردع بسيط ولا يوفر حماية كاملة للبيانات.'
              : 'Note: this is a lightweight deterrent and not full security.'}
          </div>
        </div>
      </div>
    </div>
  );
}
