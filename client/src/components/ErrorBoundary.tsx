import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

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

  render() {
    if (this.state.hasError) {
      const lang = (globalThis as any).lang === 'en' ? 'en' : 'ar';
      const isAr = lang === 'ar';
      const showDetails = !import.meta.env.PROD;

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
                  {this.state.error?.stack}
                </pre>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
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
