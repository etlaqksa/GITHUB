import { RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Shows a small banner when the app detects a missing chunk after a deployment
 * (Vite preload error). This only appears in the rare case where auto-reload
 * is throttled to avoid an infinite reload loop.
 */
export default function UpdateAvailableBanner() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onPreloadError = () => setOpen(true);
    window.addEventListener("etlaq:preload-error", onPreloadError as EventListener);
    return () => window.removeEventListener("etlaq:preload-error", onPreloadError as EventListener);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed top-3 left-3 right-3 md:left-auto md:right-6 md:top-6 z-[60] md:max-w-md"
      role="status"
      aria-live="polite"
    >
      <div className="rounded-2xl border bg-background/95 backdrop-blur shadow-lg ring-1 ring-black/5 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-sm font-semibold">
              {isAr ? "تم تحديث الموقع" : "Site updated"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {isAr
                ? "إذا واجهت شاشة بيضاء أو توقفًا مؤقتًا، حدّث الصفحة للحصول على أحدث نسخة." 
                : "If you see a blank screen or a temporary issue, refresh to load the latest version."}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-primary-foreground text-sm font-semibold hover:opacity-90"
                aria-label={isAr ? "تحديث الصفحة" : "Refresh page"}
              >
                <RefreshCcw size={16} />
                {isAr ? "تحديث" : "Refresh"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-muted"
                aria-label={isAr ? "إغلاق" : "Dismiss"}
              >
                <X size={16} />
                {isAr ? "إغلاق" : "Dismiss"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
