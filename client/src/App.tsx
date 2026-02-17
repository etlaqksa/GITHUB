import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { Suspense, lazy, useEffect, useMemo, useState, type ReactNode } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SkipToContent from "./components/SkipToContent";
import PageAccent from "./components/PageAccent";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { InternalLinkingProvider } from "./contexts/InternalLinkingContext";
import SkeletonLoader from "@/components/ui/skeleton-loader";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectCaseStudy = lazy(() => import("./pages/ProjectCaseStudy"));
const Audience = lazy(() => import("./pages/Audience"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const RequestService = lazy(() => import("./pages/RequestService"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const KeywordsAdmin = lazy(() => import("./pages/KeywordsAdmin"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const ContentStudio = lazy(() => import("./pages/ContentStudio"));

// Smart assistant is loaded only after user interaction (see SmartAssistantLauncher)

// SEO local landings (city/service)
const Locations = lazy(() => import("./pages/Locations"));
const CityLanding = lazy(() => import("./pages/CityLanding"));
const CityServiceLanding = lazy(() => import("./pages/CityServiceLanding"));
const CityServiceNeighborhoodLanding = lazy(() => import("./pages/CityServiceNeighborhoodLanding"));
const CityNeighborhoods = lazy(() => import("./pages/CityNeighborhoods"));
const HtmlSitemap = lazy(() => import("./pages/HtmlSitemap"));

const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));

const ServiceGrouting = lazy(() => import("./pages/services/ServiceGrouting"));
const ServiceCavity = lazy(() => import("./pages/services/ServiceCavity"));
const ServiceGeophysical = lazy(() => import("./pages/services/ServiceGeophysical"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Defer non-critical UI/analytics to improve LCP/TBT
const LazyWhatsAppButton = lazy(() => import("./components/WhatsAppButton"));
const LazyStickyCTA = lazy(() => import("./components/StickyCTA"));
const LazySmartAssistantLauncher = lazy(() => import("./components/SmartAssistantLauncher"));
const LazyAnalytics = lazy(() => import("./components/Analytics"));
const LazyUpdateAvailableBanner = lazy(() => import("./components/UpdateAvailableBanner"));

function DeferredMount({
  children,
  timeoutMs = 1200,
}: {
  children: ReactNode;
  timeoutMs?: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const reveal = () => {
      if (cancelled) return;
      setShow(true);
    };

    const t = window.setTimeout(reveal, timeoutMs);

    let idleId: any = null;
    try {
      if ('requestIdleCallback' in window) {
        // @ts-ignore
        idleId = window.requestIdleCallback(reveal, { timeout: timeoutMs });
      }
    } catch {
      // ignore
    }

    return () => {
      cancelled = true;
      try {
        if (idleId && 'cancelIdleCallback' in window) {
          // @ts-ignore
          window.cancelIdleCallback(idleId);
        }
      } catch {
        // ignore
      }
      window.clearTimeout(t);
    };
  }, [timeoutMs]);

  return show ? <>{children}</> : null;
}

function RouteLoader() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="etlaq-card max-w-xl mx-auto rounded-2xl border bg-card p-6 backdrop-blur-md ring-1 ring-black/5">
        <SkeletonLoader className="w-40 mb-4" />
        <SkeletonLoader className="w-full mb-2" />
        <SkeletonLoader className="w-5/6 mb-2" />
        <SkeletonLoader className="w-2/3" />
      </div>
    </div>
  );
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen app-background pb-24 md:pb-0">
      <PageAccent />
      <ScrollToTop />
      <SkipToContent />
      <Suspense fallback={null}>
        <DeferredMount timeoutMs={600}>
          <LazyUpdateAvailableBanner />
        </DeferredMount>
      </Suspense>
      <Header />
      <main id="main-content" className="flex-1">
        <InternalLinkingProvider>
          <Suspense fallback={<RouteLoader />}>
            <Switch>
            <Route path="/about" component={About} />
            <Route path="/services/grouting" component={ServiceGrouting} />
            <Route path="/services/cavity" component={ServiceCavity} />
            <Route path="/services/geophysical" component={ServiceGeophysical} />
            <Route path="/projects/:slug" component={ProjectCaseStudy} />
            <Route path="/projects" component={Projects} />
            <Route path="/case-studies" component={CaseStudies} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/blog" component={Blog} />
            <Route path="/faq" component={FAQ} />
            <Route path="/contact" component={Contact} />
            <Route path="/request-service" component={RequestService} />
            <Route path="/thank-you" component={ThankYou} />
            <Route path="/for/:audience" component={Audience} />

            {/* HTML sitemap (helps crawl + internal linking) */}
            <Route path="/sitemap" component={HtmlSitemap} />

            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />

            {/* SEO: city/service landing pages */}
            {/* IMPORTANT: place neighborhood hub BEFORE generic service route to avoid treating it as a service slug */}
            <Route path="/locations/:citySlug/احياء" component={CityNeighborhoods} />
            <Route path="/locations/:citySlug/neighborhoods" component={CityNeighborhoods} />
            <Route path="/locations/:citySlug/:serviceSlug/:hoodSlug" component={CityServiceNeighborhoodLanding} />
            <Route path="/locations/:citySlug/:serviceSlug" component={CityServiceLanding} />
            <Route path="/locations/:citySlug" component={CityLanding} />
            <Route path="/locations" component={Locations} />

            <Route path="/services" component={Services} />

            <Route path="/keywords" component={KeywordsAdmin} />
            <Route path="/content-studio" component={ContentStudio} />

            {/* IMPORTANT: keep Home last to avoid "/" greedily matching other routes */}
            <Route path="/" component={Home} />
            <Route component={NotFound} />
            </Switch>
          </Suspense>
        </InternalLinkingProvider>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <DeferredMount timeoutMs={1200}>
          <LazyWhatsAppButton />
        </DeferredMount>
        <DeferredMount timeoutMs={1400}>
          <LazyStickyCTA />
        </DeferredMount>
        <DeferredMount timeoutMs={1600}>
          <LazySmartAssistantLauncher />
        </DeferredMount>
      </Suspense>

    </div>
  );
}

function App() {
  // --- Robust language routing (fixes "only home opens" on Netlify) ---
  // We host the app under /ar/* and /en/* paths.
  // Wouter's `base` makes all routes work without custom hooks and avoids
  // path-matching edge cases with rewrites/trailing slashes.
  const [pathname, setPathname] = useState(() => window.location.pathname || "/");

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname || "/");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Normalize trailing slashes for consistent routing
  useEffect(() => {
    const p = window.location.pathname || "/";
    if (p.length > 1 && p.endsWith("/")) {
      const cleaned = p.replace(/\/+$/, "");
      if (cleaned !== p) window.history.replaceState(null, "", cleaned + window.location.search + window.location.hash);
    }
  }, [pathname]);

  // Canonicalize to prefixed paths if user lands on legacy routes (e.g. /services)
  useEffect(() => {
    const p = window.location.pathname || "/";
    const isPrefixed = p === "/ar" || p.startsWith("/ar/") || p === "/en" || p.startsWith("/en/");
    const isAsset = p.startsWith("/assets/") || p.startsWith("/images/") || p.startsWith("/gallery/") || p.startsWith("/article-images/") || p.endsWith(".pdf") || p === "/robots.txt" || p === "/sitemap.xml" || p === "/sitemap-priority.xml" || p === "/sitemap-full.xml" || p === "/manifest.json" || p === "/favicon.png" || p === "/logo.png" || p === "/__forms.html";
    if (!isPrefixed && !isAsset) {
      // Default language is ALWAYS Arabic for legacy/unprefixed links.
      // (User requirement: Arabic is the default site experience.)
      const pref = 'ar';
      const target = p === "/" ? `/${pref}` : `/${pref}${p}`;
      window.history.replaceState(null, "", target + window.location.search + window.location.hash);
      setPathname(target);
    }
  }, [pathname]);

  const base = useMemo(() => {
    const p = window.location.pathname || "/";
    return (p === "/en" || p.startsWith("/en/")) ? "/en" : "/ar";
  }, [pathname]);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultMode="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Suspense fallback={null}>
              <DeferredMount timeoutMs={900}>
                <LazyAnalytics />
              </DeferredMount>
            </Suspense>
            <WouterRouter base={base}>
              <AppLayout />
            </WouterRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
