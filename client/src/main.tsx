import "./styles/local-fonts.css";
import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import { initVitals } from "@/lib/vitals";
import "./index.css";
import { mountAntiInspectBlockers } from "@/lib/antiInspectBootstrap";
import { registerGlobalPreloadErrorHandler } from "./utils/autoReload";
import { reportClientError } from "./utils/reportClientError";


// Self-heal after deployments: if a hashed chunk preload fails, reload once.
registerGlobalPreloadErrorHandler();

// Best-effort anti-inspect blockers (runs early). Toggle via VITE_ANTI_INSPECT=true
mountAntiInspectBlockers();

// Basic client-side monitoring (Netlify Forms)
if (typeof window !== "undefined") {
  window.addEventListener("error", (e: any) => {
    const err = e?.error;
    reportClientError({
      type: "error",
      message: String(err?.message || e?.message || "Unknown error"),
      stack: String(err?.stack || `${e?.filename || ""}:${e?.lineno || ""}:${e?.colno || ""}`),
    });
  });

  window.addEventListener("unhandledrejection", (e: any) => {
    const r = e?.reason;
    reportClientError({
      type: "unhandledrejection",
      message: String(r?.message || r || "Unhandled promise rejection"),
      stack: String(r?.stack || ""),
    });
  });
}


const queryClient = new QueryClient();
const logDev = (...args: any[]) => {
  if (!import.meta.env.PROD) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

const logError = (...args: any[]) => {
  if (!import.meta.env.PROD) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
};


const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    logError("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    logError("[API Mutation Error]", error);
  }
});

// Global language bindings (legacy-safe).
if (typeof window !== 'undefined') {
  const l = (window.location.pathname || '/').startsWith('/en') ? 'en' : 'ar';
  try {
    (window as any).lang = l;
    (window as any).language = l;
    (globalThis as any).lang = l;
    (globalThis as any).language = l;
  } catch {}
}

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  </HelmetProvider>
);


// PWA registration (production only)
if (import.meta.env.PROD && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // ignore
    });
  });
}

// Basic vitals instrumentation (optional).
// You can forward these values to your analytics provider if desired.
if (typeof window !== 'undefined') {
  initVitals();
}
