# Phase 6 - OG Design + Breadcrumb UI + Richer Schema + Performance polish

## 1) Real OG images per service
Generated new high-quality OpenGraph images (1200x630) + WEBP variants:
- /og-soil-grouting.webp (.jpg)
- /og-void-detection.webp (.jpg)
- /og-geophysical-surveys.webp (.jpg)
- /og-foundation-strengthening.webp (.jpg)
- /og-image.webp (.jpg)

Files: `client/public/og-*.{jpg,webp}`

## 2) Breadcrumb UI
New component: `client/src/components/Breadcrumbs.tsx`
Integrated into:
- BlogPost
- CityServiceLanding
- Services
- CaseStudies
- Projects
- ContentStudio (internal)

## 3) Richer Schema
- Centralized company profile + LocalBusiness schema:
  - `client/src/lib/companyProfile.ts`
- CityServiceLanding now includes:
  - LocalBusiness node + Service node + FAQ + BreadcrumbList
  - provider uses LocalBusiness schema
- BlogPost Article schema enriched:
  - publisher Organization
  - mainEntityOfPage
  - inLanguage
  - LocalBusiness node included

## 4) SEO component meta
- Added theme-color meta in `client/src/components/SEO.tsx`
- Kept noIndex correctness.

## 5) Performance
- Vite: cssCodeSplit true, sourcemap false, plus manualChunks already present.
