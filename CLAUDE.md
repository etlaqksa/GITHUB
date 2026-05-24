# ETLAQ KSA - Project Memory & Developer Guide (CLAUDE.md)

## 📌 Project Overview
**ETLAQ KSA (إطلاق السعودية)** is a premium web platform for **Etlaq Distinguished Company (شركة إطلاق المتميزة)**, a leading authority in geotechnical engineering, soil cement grouting, and cavity/void detection across Saudi Arabia.

---

## 🛠️ Build & Development Commands
Execute all commands from the repository root:

* **Start Development Server**: `npm run dev`
* **Production Build**: `npm run build`
* **Run Pre-build Hook manually**: `npx tsx scripts/split_articles.ts && node scripts/generate_sitemap.mjs`
* **Static Content Prerendering**: `node scripts/prerender.mjs` (automatically runs in postbuild)
* **Code Formatting**: `npm run format`
* **Verify Codebase**: `npm run test`

---

## 🌎 Regional Geological Profiles & Localized Content
The application tailrows landing pages and services based on real-world geological hazards in major Saudi Arabian regions:

1. **Riyadh (الرياض)**:
   * **Geology**: Natural karst cavities and weakness in Limestone (الحجر الجيري) formations.
   * **Local Hazard**: Risk of sinkholes and foundation drop beneath structures.
   * **Neighborhood Focus**: Northern Riyadh expansion zones including **Al Yasmin (حي الياسمين)**, **An Narjis (حي النرجس)**, **Al Aarid (حي العارض)**, and **Al Qirawan (حي القيروان)**.

2. **Jeddah (جدة)**:
   * **Geology**: Weak clay settlements, coastal soft soils, and high water tables causing underground soil washout (غسيل التربة وتملح الأساسات).
   * **Local Hazard**: Differential settlement and corrosion of concrete foundations.

3. **Dammam & Khobar (المنطقة الشرقية)**:
   * **Geology**: Loose coastal sands, Sabkha (السبخات) soil consolidation, and subsurface limestone cavities (تكهفات الحجر الجيري).
   * **Local Hazard**: Sulfate soil attacks requiring specialized cement blends (Type V) and karstic sinkhole/void collapse risk under heavy foundations.

---

## 🔍 Technical Implementation details

### 1. Dynamic Articles Split & Lazy Loading (Bundle Optimization)
* **Problem**: The raw client-side bundle was bloated by a static `articles.ts` database weighing **1.28 MB**, violating critical PageSpeed constraints.
* **Solution**: Fully separated static content from the client bundle.
  * The pre-build script `scripts/split_articles.ts` reads `articles.ts`, extracts individual `[slug].json` files into `client/public/article-data/`, and generates a lightweight metadata index `client/src/data/articlesIndex.ts` (under **45 KB**).
  * `BlogPost.tsx` and `Blog.tsx` lazy-load full content by dynamically fetching `/article-data/[slug].json` on mount, displaying premium skeleton load animations.
  * Ensures a top-tier mobile loading speed (PageSpeed Insights Score > 95+).

### 2. Multi-Graph Structured Data Schema (`SEO.tsx`)
* **Base Schema Safeguard**: The `<SEO>` component includes a `hasBaseSchema()` check that detects if a page-specific `schema` has a base business type (`LocalBusiness`, `Organization`, `WebSite`, or `Corporation`).
* **Co-existence**: If a page (like `/services/cavity`) injects an `FAQPage` schema without a base business schema, `SEO.tsx` automatically injects the primary `LocalBusiness` schema alongside it, maintaining flawless indexation.

---

## 🔮 Future Roadmap (B2B Technical Features)
The following B2B features have been deferred to future iterations as per strategic alignment:

### 📑 B2B Case Study Bid PDF Generator (B2B Bid PDF Generator)
* **Goal**: Provide commercial clients and procurement managers with professional, on-the-fly technical reports and soil grouting proposal drafts.
* **Mechanism**:
  1. Gather project context (city, service type, target symptoms).
  2. Parse local geological hazards (e.g. limestone voids for Riyadh).
  3. Formulate a structured PDF including:
     * Executive technical summary.
     * Suggested geotechnical investigation route (ERT, GPR, or Cement Grouting).
     * Recommended validation tests (standard penetration tests, core drilling).
  4. Generate and download a beautifully styled PDF directly from the browser client using `jspdf` or serverless functions.
