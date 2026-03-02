import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";
import { attemptSelfHealReload } from "@/utils/autoReload";
import { reportClientError } from "@/utils/reportClientError";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Always log in production for debugging via browser console.
    // eslint-disable-next-line no-console
    console.error("[Etlaq ErrorBoundary]", error);
    reportClientError({ type: "errorboundary", message: error?.message || "ErrorBoundary", stack: error?.stack || "" });

    // If this is a deployment chunk error, try to self-heal immediately.
    // If throttled, the in-app banner will guide the user.
    attemptSelfHealReload(error);
  }

  render() {
    if (this.state.hasError) {
      const lang = (globalThis as any).lang === 'en' ? 'en' : 'ar';
      const isAr = lang === 'ar';
      // Show debug details in dev, or in production if the URL includes ?debug=1
      const showDetails =
        !import.meta.env.PROD ||
        (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === '1');

      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-background">
          <div className="flex flex-col items-center w-full max-w-2xl p-8 text-center">
            <AlertTriangle
              size={48}
              className="text-destructive mb-6 flex-shrink-0"
            />

            <h2 className="text-xl mb-2 font-bold">
              {isAr ? "حدث خطأ غير متوقع" : "An unexpected error occurred"}
            </h2>

            <p className="text-sm text-muted-foreground mb-6 max-w-prose">
              {isAr
                ? "قد يكون السبب تحديثًا جديدًا للموقع أو انقطاعًا مؤقتًا في الاتصال. جرّب تحديث الصفحة للحصول على أحدث نسخة." 
                : "This may be caused by a recent site update or a temporary connection issue. Please refresh to load the latest version."}
            </p>

            {showDetails && (
              <div className="p-4 w-full rounded bg-muted overflow-auto mb-6 text-left">
                <pre className="text-sm text-muted-foreground whitespace-break-spaces">
                  {this.state.error?.message}
                  {"\n\n"}
                  {this.state.error?.stack}
                </pre>

                <div className="mt-4 space-y-1 text-[11px] text-muted-foreground">
                  <div><span className="font-semibold">URL:</span> {typeof window !== 'undefined' ? window.location.href : ''}</div>
                  <div><span className="font-semibold">UA:</span> {typeof navigator !== 'undefined' ? navigator.userAgent : ''}</div>
                  <div>
                    <span className="font-semibold">Service Worker:</span>{' '}
                    {typeof navigator !== 'undefined' && 'serviceWorker' in navigator
                      ? (navigator.serviceWorker.controller ? 'controlled' : 'not-controlled')
                      : 'not-supported'}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                // Prefer the same cache-busting reload used by our self-heal handler.
                if (!attemptSelfHealReload(this.state.error ?? undefined)) {
                  window.location.reload();
                }
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-primary text-primary-foreground",
                "hover:opacity-90 cursor-pointer"
              )}
            >
              <RotateCcw size={16} />
              {isAr ? "تحديث الصفحة" : "Reload page"}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
