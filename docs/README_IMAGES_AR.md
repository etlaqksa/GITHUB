# ربط صور مختارة يدويًا للمقالات (Manual Image Links)

ضع ملف CSV باسم:
`docs/article_image_links.csv`

صيغة الملف (UTF-8) يجب أن تحتوي على الأعمدة التالية:

- `slug` (إلزامي): نفس الـ slug الموجود داخل `client/src/data/articles.ts`
- `hero_url` (اختياري): رابط صورة الغلاف داخل صفحة المقال (Hero 1600x900)
- `card_url` (اختياري): رابط صورة بطاقة المقال في صفحة المدونة (Card 960x540)

ملاحظات:
- إذا وضعت `hero_url` فقط، سيستخدمها السكربت أيضًا لبطاقة المقال.
- إذا وضعت `card_url` فقط، سيستخدمها السكربت أيضًا للـ Hero.
- يمكنك وضع رابطين مختلفين للـ hero والـ card إذا رغبت.

ثم شغّل:
```bash
pip install -r scripts/requirements-images.txt
python scripts/fetch_article_images.py
```

سيتم توليد الصور هنا:
- `client/public/article-images/hero/<slug>.webp`
- `client/public/article-images/card/<slug>.webp`

وستجد تقرير التنفيذ في:
`docs/article_images_manifest.csv`


## توليد CSV للـ slugs تلقائيًا
شغّل:
```bash
python scripts/export_article_slugs.py
```
سيتم توليد:
- `docs/article_image_links.csv` (جاهز للتعبئة بالروابط)
- `docs/article_slugs.csv` (مرجع بالعناوين)
