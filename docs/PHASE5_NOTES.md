# Phase 5 - Content Studio + Advanced SEO + Performance

## 1) Content Studio (internal)
Route: /content-studio (localized)
- Generates:
  - JSON snippet for `client/src/data/projects.ts`
  - Markdown AR + EN for publishing
- NoIndex enabled + disallowed in robots

File: `client/src/pages/ContentStudio.tsx`

## 2) Advanced SEO
- BreadcrumbList schema added to:
  - BlogPost
  - CityServiceLanding
  - Services
  - CaseStudies
- OG images per service type added:
  - /og-soil-grouting.jpg
  - /og-void-detection.jpg
  - /og-geophysical-surveys.jpg
  - /og-foundation-strengthening.jpg

## 3) NoIndex correctness fix
SEO component was emitting googlebot/bingbot index meta even when noIndex.
Fixed in `client/src/components/SEO.tsx`.

## 4) Performance
- Vite manualChunks to split:
  - react, router, markdown, ui
In `vite.config.ts`.
