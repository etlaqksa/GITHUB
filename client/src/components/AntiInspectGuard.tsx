import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Lightweight anti-inspect UX deterrent.
 * NOTE: This does NOT provide real security. It only discourages casual inspection.
 * Toggle via: VITE_ANTI_INSPECT=true
 */
export default function AntiInspectGuard() {
  const { language, dir } = useLanguage();
  const enabled = useMemo(() => String(import.meta.env.VITE_ANTI_INSPECT || '') === 'true', []);
  const [devtoolsOpen, setDevtoolsOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

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
    };

    // --- Disable right click ONLY on hero/images ---
    const onContextMenu = (e: MouseEvent) => {
      const t = e.target as unknown;
      if (!(t instanceof Element)) return;

      // Block within hero (or any marked area)
      const inBlockedArea = !!t.closest('[data-anti-contextmenu="true"]');

      // Block on images
      const isImg = t.tagName === 'IMG' || !!t.closest('img');

      if (inBlockedArea || isImg) {
        e.preventDefault();
      }
    };

    // --- DevTools detection (best-effort) ---
    const isLikelyDesktop = () => {
      // avoid false positives on mobile browser chrome
      return window.innerWidth >= 768 && window.innerHeight >= 520;
    };

    const detect = () => {
      if (!isLikelyDesktop()) {
        setDevtoolsOpen(false);
        return;
      }
      const wDiff = Math.abs(window.outerWidth - window.innerWidth);
      const hDiff = Math.abs(window.outerHeight - window.innerHeight);
      const opened = wDiff > 160 || hDiff > 160;
      setDevtoolsOpen(opened);
    };

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('contextmenu', onContextMenu);

    const i = window.setInterval(detect, 500);
    window.addEventListener('resize', detect);
    detect();

    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('resize', detect);
      window.clearInterval(i);
    };
  }, [enabled]);

  if (!enabled) return null;
  if (!devtoolsOpen) return null;

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
