# Phase 4 - Hub + Case Studies + CRO

## What was added
1) RelatedLinksHub component:
- Injected into BlogPost and CityServiceLanding
- Suggests closest service + city/service landing links + CTA

2) CaseStudies page:
- Route: /case-studies (localized via router prefix)
- Lists projects as case study cards with basic schema (ItemList)

3) QuickRequestCard component:
- Short Netlify form named 'quick_assessment'
- Embedded in Services and CityServiceLanding for reduced friction

4) Netlify Forms detection:
- __forms.html updated to include 'quick_assessment' hidden form.

## Notes
- /ar/ and /en/ prefixes are handled by router; internal links in markdown should use paths without prefixes (e.g., /services/grouting).
- Keep content concise in case studies; link to /projects/:slug for full detail.
