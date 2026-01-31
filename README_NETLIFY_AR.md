# EtlaqKSA – نسخة جاهزة للنشر (Netlify)

## ما الذي تم إصلاحه؟
- **هيكلة المسارات /ar و /en (SEO جاهز)**: الموقع يعمل بمسارات مفضّلة `/ar/*` و `/en/*`، و**الافتراضي دائمًا عربي**: أي دخول على `/` يتم تحويله إلى `/ar`.
- **مشكلة التنقّل/التمرير بين الصفحات**: تم إضافة `ScrollToTop` باستخدام `wouter` لإرجاع الصفحة للأعلى عند تغيير المسار.
- **إخراج البناء (Vite build)**: أصبح الإخراج داخل `dist/` مباشرة (بدل `dist/public`) حتى يكون النشر على Netlify أسهل.
- **SPA Routing على Netlify**: إضافة ملف `public/_redirects` (وأيضًا redirect داخل `netlify.toml`) لضمان عدم ظهور 404 عند تحديث صفحة داخلية.

## التشغيل والبناء
داخل مجلد المشروع:
```bash
npm install
npm run dev:client
# أو للبناء والنشر
npm run build
```

> ملاحظة: الأمر `npm run dev` يشغّل السيرفر (اختياري) وقد يطبع تحذير OAuth إذا لم تُضبط متغيرات السيرفر. للموقع التسويقي استخدم `npm run dev:client`.

### ملاحظات لمستخدمي Windows (PowerShell)
- حذف `node_modules` و `package-lock.json`:
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
```
- ثم أعد التثبيت:
```powershell
npm cache clean --force
npm install
npm run build
```

## النشر على Netlify (Drag & Drop)
بعد البناء سترى مجلد:
- `dist/`

قم برفع **مجلد dist فقط** إلى Netlify.

## اختبار مشكلة التمرير
- افتح أي صفحة (مثل /services)، انزل لمنتصف الصفحة، ثم انتقل لصفحة أخرى
- يجب أن تبدأ الصفحة الجديدة من الأعلى


## المقالات
- تمت إضافة **50 مقالاً** من ملف (الموسوعة الجيوتقنية الشاملة) إلى صفحة **المقالات التقنية**.

## إضافات التحويل والثقة
- **تحميل ملف الشركة**: تم إضافة ملف PDF داخل `client/public/company-profile.pdf` وربطه في الهيدر والفوتر والصفحات الرئيسية.
- **نماذج Netlify مع مرفقات**: نموذج "اطلب خدمة" ونموذج "أرسل لنا رسالة" يدعمان الآن إرفاق صور/PDF عبر Netlify Forms.
