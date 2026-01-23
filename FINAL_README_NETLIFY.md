# ETLAQ KSA — World‑Class Final (All Phases Integrated)

هذا الملف يمثل نسخة نهائية مدمجة تشمل جميع التحسينات التي تم تنفيذها عبر المراحل (SEO + محتوى + CRO + Schema + OG Images + Performance + Forms + Routing).

---

## 1) النشر على Netlify (Recommended: Git Deploy)
1) ارفع المشروع على GitHub (كـ Repository).
2) في Netlify → Add new site → Import from Git.
3) Build command:
   - `npm ci && npm run build`
4) Publish directory:
   - `client/dist`
5) Environment variables (إن وجدت/مطلوبة):
   - **لا يلزم OAuth** للموقع الأساسي. إذا ظهر خطأ `[OAuth] OAUTH_SERVER_URL` أثناء `npm run dev` فهو متعلق بسيرفر محلي فقط. للنشر العام، لا يؤثر عادةً طالما لم تستخدم مسارات OAuth.
6) تأكد من وجود الملف:
   - `client/public/_redirects` (SPA routing + /ar & /en)
7) بعد النشر: Site settings → Domain management → إضافة `etlaqksa.com` وتفعيل HTTPS.

---

## 2) النشر اليدوي (Manual Deploy)
- قم ببناء المشروع محليًا:
  1) `npm ci`
  2) `npm run build`
- ارفع مجلد: `client/dist` بالكامل إلى Netlify (Deploys → Manual deploy)
- **مهم جدًا:** تأكد أن `dist/_redirects` موجود داخل `client/dist` بعد البناء.

---

## 3) النماذج (Netlify Forms)
- النماذج تُكتشف من:
  - `client/public/__forms.html`
- يجب أن ترى نماذج مثل:
  - `contact` / `request_service` / `quick_assessment` (قد تختلف الأسماء حسب النسخة)
- إذا لم تظهر النماذج:
  - تأكد أن إعداد Netlify لا يتجاهل HTML forms.
  - في netlify.toml (إن وجد) تأكد أن:
    - `ignore_html_forms = false`

> صفحة `/.netlify.app/__forms.html` قد تظهر بيضاء — هذا طبيعي لأنها صفحة كشف/تعريف للنماذج وليست واجهة.

---

## 4) اللغة الافتراضية
- الافتراضي عربي دائمًا:
  - المسار الرئيسي يذهب إلى `/ar`
  - الروابط الداخلية تستخدم LocalizedLink لضمان اللغة.

---

## 5) صفحات داخلية (NoIndex)
- `content-studio` صفحة داخلية:
  - `Disallow` في robots.txt
  - `noindex` في SEO

---

## 6) أهم الإضافات الموجودة في هذه النسخة
- OG Images احترافية لكل خدمة + WebP
- Breadcrumb UI + BreadcrumbList Schema
- LocalBusiness schema مركزي + تحسين Service schema + تحسين Article schema
- Hub داخلي للمقالات يربط الخدمات والمدن
- صفحة Case Studies منظمة + Schema
- نموذج تحويل مختصر quick_assessment
- تحسينات الأداء (Vite manualChunks + cssCodeSplit + sourcemap false)
- تنظيف LocalizedLink لمنع nested anchors (HTML صحي)

---

## 7) مسارات مهمة
- الخدمات: `/ar/services`
- المدن: `/ar/locations`
- دراسات الحالة: `/ar/case-studies`
- المشاريع: `/ar/projects`
- المدونة: `/ar/blog`
- طلب خدمة: `/ar/request-service`

---

## 8) ملاحظات DNS للدومين etlaqksa.com (names.co.uk)
- في Netlify ستجد DNS Targets:
  - A records لـ apex (etlaqksa.com) إلى Netlify load balancer IPs
  - CNAME لـ www إلى `YOUR-SITE.netlify.app`
- ضعها في names.co.uk ثم انتظر انتشار DNS.

---

إذا أردت Phase تالية "مرة واحدة" أيضًا:
- ارسل ما تريد تحديدًا (مثلاً: إضافة صفحات لكل مدينة/خدمة بالجملة + توليد محتوى تلقائي + صور).
