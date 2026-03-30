# ETLAQ KSA — v26 World-Class Professional (جاهز للإطلاق الفوري)

## ما الجديد في هذه النسخة

### مكونات جديدة (10 مكونات)

| المكون | الوظيفة |
|--------|---------|
| ProcessTimeline | 6 خطوات تفاعلية "كيف نعمل" مع auto-advance |
| EquipmentShowcase | عرض كامل للمعدات: GPR, ERT, MASW, مضخات، حفر |
| ServiceComparisonTable | جدول مقارنة 10 معايير × 3 خدمات |
| FeaturedProjects | عرض مشاريع متنوع + إحصائيات |
| CertificationsBar | شريط ثقة 6 إنجازات (dark/light/colored) |
| TestimonialsSection | Carousel آراء 5 عملاء + نجوم |
| ServiceDecisionHelper | دليل 3 أسئلة تفاعلي → يوجه لخدمة محددة |
| WhyChooseUs | 6 أعمدة تميّز احترافية |
| EmergencyCTA | CTA حالات طوارئ أحمر مع WhatsApp |
| ArticleEndCTA | CTA ذكي نهاية كل مقال (يكتشف الخدمة تلقائياً) |

### صفحات مُعاد كتابتها
- **About.tsx** — إعادة كتابة كاملة: Hero داكن + Timeline + القيم + المعدات
- **HomeBelowFold.tsx** — 7 أقسام جديدة
- **Services.tsx** — جدول مقارنة الخدمات
- **Blog.tsx** — Pagination (12/صفحة) + عداد نتائج
- **BlogPost.tsx** — CTA نهاية كل مقال

### CSS احترافية
- +120 سطر: gradient text, shimmer skeleton, FAB, print styles, dark mode
- smooth scroll, focus-visible, line-clamp, professional card hover

---

## النشر على Netlify

```
Build command: npm ci && npm run build
Publish dir:   client/dist
```

لا تغيير في Environment Variables أو إعدادات النشر عن الإصدارات السابقة.

## الصفحات الرئيسية

- `/ar/` — الرئيسية
- `/ar/about` — من نحن (محسّنة بالكامل)
- `/ar/services` — الخدمات + جدول مقارنة
- `/ar/projects` — المشاريع
- `/ar/blog` — المدونة + Pagination
- `/ar/request-service` — طلب خدمة
- `/ar/contact` — تواصل

---
