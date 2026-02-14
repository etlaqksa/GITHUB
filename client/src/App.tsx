import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SkipToContent from "./components/SkipToContent";
import WhatsAppButton from "./components/WhatsAppButton";
import StickyCTA from "./components/StickyCTA";
import Analytics from "./components/Analytics";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { InternalLinkingProvider } from "./contexts/InternalLinkingContext";

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

const SmartAssistant = lazy(() => import("./components/SmartAssistant"));

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

function RouteLoader() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-xl mx-auto rounded-xl border bg-card p-6 backdrop-blur-md ring-1 ring-black/5">
        <div className="h-4 w-40 bg-muted rounded mb-4 animate-pulse" />
        <div className="h-3 w-full bg-muted rounded mb-2 animate-pulse" />
        <div className="h-3 w-5/6 bg-muted rounded mb-2 animate-pulse" />
        <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen app-background">
      <ScrollToTop />
      <SkipToContent />
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
      <WhatsAppButton />
      <StickyCTA />
      <Suspense fallback={null}>
        <SmartAssistant />
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
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Analytics />
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
