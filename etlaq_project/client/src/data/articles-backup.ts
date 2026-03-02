export interface ArticleContent {
  id: number;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
  contentEn: string;
  slug: string;
}

export const articles: ArticleContent[] = [
  {
    id: 1,
    title: 'ما هو حقن التربة وكيف يعمل؟',
    titleEn: 'What is Soil Grouting and How Does It Work?',
    category: 'حقن التربة',
    categoryEn: 'Soil Grouting',
    date: '2025-10-15',
    readTime: '8 دقائق',
    author: 'م. أحمد العتيبي',
    slug: 'what-is-soil-grouting',
    content: `
# ما هو حقن التربة؟

حقن التربة (Soil Grouting) هو تقنية هندسية متقدمة تستخدم لتحسين خواص التربة وزيادة قدرتها على التحمل.

## أنواع حقن التربة

### 1. حقن الأسمنت
يعتبر من أكثر الأنواع شيوعاً لملء التكهفات وتقوية التربة الضعيفة.

### 2. حقن المواد الكيميائية
يستخدم مواد مثل البولي يوريثان أو السيليكات لإنشاء حاجز مائي.

### 3. حقن النفث (Jet Grouting)
تقنية متقدمة تستخدم نفث عالي الضغط لإنشاء أعمدة خرسانية قوية.

## الفوائد

- زيادة قدرة التحمل
- منع التسرب
- معالجة الهبوط
- ملء التكهفات
    `,
    contentEn: `
# What is Soil Grouting?

Soil Grouting is an advanced engineering technique used to improve soil properties and increase bearing capacity.

## Types of Soil Grouting

### 1. Cement Grouting
Most common type for filling voids and strengthening weak soil.

### 2. Chemical Grouting
Uses materials like polyurethane or silicate to create water barriers.

### 3. Jet Grouting
Advanced technique using high-pressure jets to create strong concrete columns.

## Benefits

- Increased bearing capacity
- Prevent seepage
- Settlement treatment
- Void filling
    `,
  },
  {
    id: 2,
    title: 'أسباب هبوط المباني وطرق معالجتها',
    titleEn: 'Causes of Building Settlement and Treatment Methods',
    category: 'معالجة الهبوط',
    categoryEn: 'Settlement Treatment',
    date: '2025-10-10',
    readTime: '10 دقائق',
    author: 'م. سارة الدوسري',
    slug: 'building-settlement-causes',
    content: `
# أسباب هبوط المباني

هبوط المباني من أخطر المشاكل الإنشائية. فهم الأسباب هو الخطوة الأولى للعلاج.

## الأسباب الرئيسية

### 1. ضعف التربة الأساسية
- تربة طينية قابلة للانكماش
- تربة رملية غير متماسكة

### 2. وجود تكهفات وتكهفات
- تكهفات طبيعية في الصخور
- تكهفات ناتجة عن تآكل التربة

### 3. تسرب المياه
- تسرب من شبكات المياه
- ارتفاع منسوب المياه الجوفية

## طرق المعالجة

- حقن التربة الأسمنتي
- الخوازيق الصغيرة
- حقن البولي يوريثان
- تقوية الأساسات
    `,
    contentEn: `
# Causes of Building Settlement

Building settlement is one of the most dangerous structural problems.

## Main Causes

### 1. Weak Foundation Soil
- Shrinkable clay soil
- Loose sandy soil

### 2. Voids and Cavities
- Natural rock cavities
- Voids from soil erosion

### 3. Water Leakage
- Water network leaks
- Rising groundwater

## Treatment Methods

- Cement soil grouting
- Micropiles
- Polyurethane injection
- Foundation strengthening
    `,
  },
  {
    id: 3,
    title: 'تقنيات كشف التكهفات تحت الأرض',
    titleEn: 'Underground Cavity Detection Techniques',
    category: 'كشف التكهفات',
    categoryEn: 'Cavity Detection',
    date: '2025-10-05',
    readTime: '12 دقيقة',
    author: 'د. محمد الشمري',
    slug: 'cavity-detection-techniques',
    content: `
# تقنيات كشف التكهفات

استعراض لأحدث التقنيات الجيوفيزيائية المستخدمة في كشف التكهفات.

## التقنيات الرئيسية

### 1. رادار اختراق الأرض (GPR)
أكثر التقنيات شيوعاً، يستخدم موجات راديوية لإنشاء صورة ثلاثية الأبعاد.

### 2. المسح الكهربائي
يقيس مقاومة التربة الكهربائية لتحديد التكهفات.

### 3. المسح السيزمي
يستخدم الموجات الصوتية لكشف التغيرات في كثافة التربة.

## المميزات

- دقة عالية
- لا حاجة للحفر
- نتائج سريعة
- آمن للمباني القائمة
    `,
    contentEn: `
# Cavity Detection Techniques

Review of latest geophysical techniques for detecting cavities.

## Main Techniques

### 1. Ground Penetrating Radar (GPR)
Most common technique, uses radio waves to create 3D images.

### 2. Electrical Resistivity Survey
Measures soil electrical resistance to identify voids.

### 3. Seismic Survey
Uses sound waves to detect changes in soil density.

## Advantages

- High accuracy
- No excavation needed
- Fast results
- Safe for existing buildings
    `,
  },
  {
    id: 4,
    title: 'أنواع الحقن الأسمنتي واستخداماتها',
    titleEn: 'Types of Cement Grouting and Applications',
    category: 'حقن التربة',
    categoryEn: 'Soil Grouting',
    date: '2025-09-28',
    readTime: '15 دقيقة',
    author: 'م. خالد السبيعي',
    slug: 'cement-grouting-types',
    content: `
# أنواع الحقن الأسمنتي

دليل تفصيلي لأنواع الحقن الأسمنتي المختلفة واستخداماتها.

## الأنواع الرئيسية

### 1. حقن الضغط (Compaction Grouting)
حقن خليط كثيف تحت ضغط منخفض لرفع وتكثيف التربة.

### 2. حقن النفاذ (Permeation Grouting)
حقن خليط سائل ينفذ في مسام التربة دون تشويهها.

### 3. حقن النفث (Jet Grouting)
استخدام نفث عالي الضغط لتفتيت التربة وخلطها مع الأسمنت.

### 4. حقن الستار (Curtain Grouting)
إنشاء جدار أسمنتي لمنع تسرب المياه.

## الاستخدامات

- تقوية الأساسات
- معالجة الهبوط
- منع تسرب المياه
- ملء التكهفات
    `,
    contentEn: `
# Types of Cement Grouting

Detailed guide to different cement grouting types and applications.

## Main Types

### 1. Compaction Grouting
Injecting thick mixture under low pressure to lift and densify soil.

### 2. Permeation Grouting
Injecting liquid mixture that penetrates soil pores without deformation.

### 3. Jet Grouting
Using high-pressure jets to break up soil and mix with cement.

### 4. Curtain Grouting
Creating cement wall to prevent water seepage.

## Applications

- Foundation strengthening
- Settlement treatment
- Water seepage prevention
- Cavity filling
    `,
  },
  {
    id: 5,
    title: 'التشققات في المباني: الأسباب والحلول',
    titleEn: 'Building Cracks: Causes and Solutions',
    category: 'إصلاح التشققات',
    categoryEn: 'Crack Repair',
    date: '2025-09-20',
    readTime: '9 دقائق',
    author: 'م. فاطمة القحطاني',
    slug: 'building-cracks-solutions',
    content: `
# التشققات في المباني

كيفية تشخيص أنواع التشققات وتحديد طرق الإصلاح المناسبة.

## أنواع التشققات

### 1. تشققات سطحية
تظهر في طبقة الدهان فقط ولا تشكل خطراً.

### 2. تشققات إنشائية
تمتد عبر الخرسانة وتتطلب تدخلاً فورياً.

### 3. تشققات الانكماش
ناتجة عن جفاف الخرسانة السريع.

## طرق الإصلاح

- حقن الإيبوكسي للتشققات الإنشائية
- حقن البولي يوريثان للتشققات النشطة
- التدعيم بألياف الكربون
- إعادة اللياسة للتشققات السطحية
    `,
    contentEn: `
# Building Cracks

How to diagnose crack types and determine appropriate repair methods.

## Crack Types

### 1. Surface Cracks
Appear only in paint layer and pose no danger.

### 2. Structural Cracks
Extend through concrete and require immediate intervention.

### 3. Shrinkage Cracks
Result from rapid concrete drying.

## Repair Methods

- Epoxy injection for structural cracks
- Polyurethane injection for active cracks
- Carbon fiber reinforcement
- Re-plastering for surface cracks
    `,
  },
  {
    id: 6,
    title: 'أهمية فحص التربة قبل البناء',
    titleEn: 'Importance of Soil Testing Before Construction',
    category: 'فحص التربة',
    categoryEn: 'Soil Testing',
    date: '2025-09-15',
    readTime: '7 دقائق',
    author: 'د. عبدالله الغامدي',
    slug: 'soil-testing-importance',
    content: `
# أهمية فحص التربة

لماذا يعتبر فحص التربة خطوة أساسية قبل أي مشروع إنشائي.

## ما يكشفه الفحص

- نوع التربة وخواصها
- قدرة التحمل
- منسوب المياه الجوفية
- وجود تكهفات أو تكهفات
- درجة الحموضة والكبريتات

## الفوائد

- تصميم أساسات مناسبة
- تجنب المشاكل المستقبلية
- توفير التكاليف
- ضمان سلامة المبنى

## أنواع الفحوصات

- فحص الحفر اليدوي
- فحص الحفر الآلي
- فحص الاختراق القياسي (SPT)
- الفحوصات المخبرية
    `,
    contentEn: `
# Importance of Soil Testing

Why soil testing is essential before any construction project.

## What Testing Reveals

- Soil type and properties
- Bearing capacity
- Groundwater level
- Presence of cavities or voids
- pH and sulfate levels

## Benefits

- Design appropriate foundations
- Avoid future problems
- Save costs
- Ensure building safety

## Test Types

- Manual drilling test
- Mechanical drilling test
- Standard Penetration Test (SPT)
- Laboratory tests
    `,
  },
  {
    id: 7,
    title: 'تقنية رادار اختراق الأرض (GPR)',
    titleEn: 'Ground Penetrating Radar Technology',
    category: 'كشف التكهفات',
    categoryEn: 'Cavity Detection',
    date: '2025-09-08',
    readTime: '11 دقيقة',
    author: 'م. نواف المطيري',
    slug: 'gpr-technology',
    content: `
# تقنية GPR

كيف تعمل تقنية رادار اختراق الأرض في كشف التكهفات دون حفر.

## مبدأ العمل

ترسل موجات كهرومغناطيسية عالية التردد إلى باطن الأرض وتستقبل الانعكاسات.

## المميزات

- دقة عالية جداً
- لا حاجة للحفر
- نتائج فورية
- آمن تماماً
- يعمل في جميع أنواع التربة

## الاستخدامات

- كشف التكهفات
- تحديد موقع المرافق
- فحص سمك الأرضيات
- كشف التسربات

## القيود

- يتأثر بالمياه الجوفية
- العمق المحدود (حتى 30 متر)
- يحتاج خبير لتفسير النتائج
    `,
    contentEn: `
# GPR Technology

How Ground Penetrating Radar works in detecting voids without excavation.

## Working Principle

Sends high-frequency electromagnetic waves into ground and receives reflections.

## Advantages

- Very high accuracy
- No excavation needed
- Instant results
- Completely safe
- Works in all soil types

## Applications

- Cavity detection
- Utility location
- Floor thickness inspection
- Leak detection

## Limitations

- Affected by groundwater
- Limited depth (up to 30m)
- Requires expert interpretation
    `,
  },
  {
    id: 8,
    title: 'معالجة هبوط الأرضيات الخرسانية',
    titleEn: 'Concrete Slab Settlement Treatment',
    category: 'معالجة الهبوط',
    categoryEn: 'Settlement Treatment',
    date: '2025-09-01',
    readTime: '10 دقائق',
    author: 'م. ريم الحربي',
    slug: 'concrete-slab-settlement',
    content: `
# معالجة هبوط الأرضيات

تقنيات رفع وتسوية الأرضيات الخرسانية المهبوطة.

## الأسباب

- ضعف التربة تحت الأرضية
- تسرب المياه وتآكل التربة
- سوء الدمك
- وجود تكهفات

## التقنيات

### 1. حقن البولي يوريثان
- سريع وفعال
- وزن خفيف
- يتصلب خلال دقائق

### 2. حقن الأسمنت
- قوة عالية
- تكلفة أقل
- يحتاج وقت أطول

### 3. Mudjacking
- تقنية تقليدية
- مناسب للمساحات الكبيرة

## الخطوات

1. تحديد مناطق الهبوط
2. حفر ثقوب صغيرة
3. حقن المادة المختارة
4. المراقبة والتسوية
5. إغلاق الثقوب
    `,
    contentEn: `
# Slab Settlement Treatment

Techniques for lifting and leveling settled concrete slabs.

## Causes

- Weak soil under slab
- Water leakage and soil erosion
- Poor compaction
- Presence of voids

## Techniques

### 1. Polyurethane Injection
- Fast and effective
- Lightweight
- Sets in minutes

### 2. Cement Injection
- High strength
- Lower cost
- Takes longer time

### 3. Mudjacking
- Traditional technique
- Suitable for large areas

## Steps

1. Identify settlement areas
2. Drill small holes
3. Inject selected material
4. Monitor and level
5. Close holes
    `,
  },
  {
    id: 9,
    title: 'حقن الإيبوكسي لإصلاح التشققات',
    titleEn: 'Epoxy Injection for Crack Repair',
    category: 'إصلاح التشققات',
    categoryEn: 'Crack Repair',
    date: '2025-08-25',
    readTime: '13 دقيقة',
    author: 'م. طارق الزهراني',
    slug: 'epoxy-injection-repair',
    content: `
# حقن الإيبوكسي

دليل شامل لاستخدام حقن الإيبوكسي في إصلاح التشققات الإنشائية.

## ما هو الإيبوكسي؟

مادة لاصقة قوية جداً تتكون من مكونين يتم خلطهما قبل الاستخدام.

## المميزات

- قوة التصاق عالية جداً
- يستعيد قوة الخرسانة الأصلية
- مقاوم للماء والكيماويات
- عمر افتراضي طويل

## متى نستخدمه؟

- التشققات الإنشائية
- التشققات غير النشطة
- إصلاح الكمرات والأعمدة
- لصق الخرسانة المتشققة

## خطوات التطبيق

1. تنظيف التشقق
2. تركيب منافذ الحقن
3. إغلاق سطح التشقق
4. خلط الإيبوكسي
5. الحقن تحت ضغط
6. المعالجة

## الاحتياطات

- يجب أن يكون التشقق جافاً
- درجة حرارة مناسبة
- خلط دقيق للمكونات
    `,
    contentEn: `
# Epoxy Injection

Comprehensive guide to using epoxy injection for structural crack repair.

## What is Epoxy?

Very strong adhesive consisting of two components mixed before use.

## Advantages

- Very high adhesion strength
- Restores original concrete strength
- Water and chemical resistant
- Long service life

## When to Use?

- Structural cracks
- Dormant cracks
- Beam and column repair
- Bonding cracked concrete

## Application Steps

1. Clean crack
2. Install injection ports
3. Seal crack surface
4. Mix epoxy
5. Inject under pressure
6. Curing

## Precautions

- Crack must be dry
- Appropriate temperature
- Accurate component mixing
    `,
  },
  {
    id: 10,
    title: 'تقوية الأساسات الضعيفة',
    titleEn: 'Strengthening Weak Foundations',
    category: 'تقوية الأساسات',
    categoryEn: 'Foundation Strengthening',
    date: '2025-08-18',
    readTime: '14 دقيقة',
    author: 'د. سلطان العنزي',
    slug: 'foundation-strengthening',
    content: `
# تقوية الأساسات

طرق تقوية الأساسات القائمة وزيادة قدرتها على التحمل.

## متى نحتاج التقوية؟

- إضافة طوابق جديدة
- ظهور تشققات وهبوط
- ضعف التربة الأساسية
- تغيير استخدام المبنى

## الطرق الرئيسية

### 1. توسيع القواعد
إضافة خرسانة جديدة لزيادة مساحة القاعدة.

### 2. الخوازيق الصغيرة
حفر خوازيق صغيرة لنقل الأحمال لطبقات أعمق.

### 3. حقن التربة
تقوية التربة تحت الأساسات بالحقن.

### 4. الجسور الأرضية
ربط القواعد ببعضها لتوزيع الأحمال.

## الخطوات

1. فحص شامل للأساسات
2. دراسة التربة
3. اختيار الطريقة المناسبة
4. التصميم الإنشائي
5. التنفيذ تحت إشراف
6. الاختبار والمراقبة
    `,
    contentEn: `
# Foundation Strengthening

Methods for strengthening existing foundations and increasing bearing capacity.

## When Strengthening Needed?

- Adding new floors
- Appearance of cracks and settlement
- Weak foundation soil
- Change of building use

## Main Methods

### 1. Footing Widening
Adding new concrete to increase footing area.

### 2. Micropiles
Drilling small piles to transfer loads to deeper layers.

### 3. Soil Grouting
Strengthening soil under foundations by grouting.

### 4. Ground Beams
Connecting footings to distribute loads.

## Steps

1. Comprehensive foundation inspection
2. Soil study
3. Select appropriate method
4. Structural design
5. Supervised execution
6. Testing and monitoring
    `,
  },
  {
    id: 11,
    title: 'المشاكل الجيوتقنية في السعودية',
    titleEn: 'Geotechnical Problems in Saudi Arabia',
    category: 'فحص التربة',
    categoryEn: 'Soil Testing',
    date: '2025-08-10',
    readTime: '16 دقيقة',
    author: 'م. منى الشهري',
    slug: 'geotechnical-problems-saudi',
    content: `
# المشاكل الجيوتقنية في السعودية

استعراض للمشاكل الأكثر شيوعاً في المملكة وحلولها.

## أنواع التربة السائدة

- التربة الرملية في المناطق الساحلية
- التربة الطينية في المناطق الوسطى
- التربة الصخرية في المناطق الجبلية

## المشاكل الشائعة

### 1. التربة الانتفاخية
شائعة في الرياض والمنطقة الوسطى.

### 2. التربة السبخية
في المناطق الساحلية والشرقية.

### 3. التكهفات الصخرية
في المناطق الجيرية.

### 4. الكثبان الرملية
في المناطق الصحراوية.

## الحلول

- فحص شامل قبل البناء
- اختيار نوع الأساسات المناسب
- معالجة التربة عند الحاجة
- استخدام مواد عازلة مناسبة
    `,
    contentEn: `
# Geotechnical Problems in Saudi Arabia

Review of most common problems in the Kingdom and solutions.

## Prevalent Soil Types

- Sandy soil in coastal areas
- Clay soil in central regions
- Rocky soil in mountainous areas

## Common Problems

### 1. Expansive Soil
Common in Riyadh and central region.

### 2. Sabkha Soil
In coastal and eastern areas.

### 3. Rock Cavities
In limestone areas.

### 4. Sand Dunes
In desert areas.

## Solutions

- Comprehensive testing before construction
- Select appropriate foundation type
- Treat soil when needed
- Use suitable waterproofing materials
    `,
  },
  {
    id: 12,
    title: 'تقنية Jet Grouting وتطبيقاتها',
    titleEn: 'Jet Grouting Technology and Applications',
    category: 'حقن التربة',
    categoryEn: 'Soil Grouting',
    date: '2025-08-03',
    readTime: '12 دقيقة',
    author: 'م. عبدالرحمن الراشد',
    slug: 'jet-grouting-technology',
    content: `
# تقنية Jet Grouting

كيف تعمل تقنية حقن النفث واستخداماتها في المشاريع الكبرى.

## مبدأ العمل

استخدام نفث عالي الضغط (300-600 بار) لتفتيت التربة وخلطها مع الأسمنت.

## الأنظمة

### 1. Single System
نفث واحد للأسمنت فقط.

### 2. Double System
نفث الأسمنت والهواء.

### 3. Triple System
نفث الأسمنت والهواء والماء.

## الاستخدامات

- تقوية الأساسات
- إنشاء جدران استنادية
- معالجة التسربات
- تقوية أنفاق المترو

## المميزات

- قوة عالية جداً
- يعمل في جميع أنواع التربة
- عمق كبير (حتى 30 متر)
- أعمدة قطرها حتى 3 متر

## العيوب

- تكلفة عالية
- ضجيج واهتزاز
- يحتاج معدات متخصصة
    `,
    contentEn: `
# Jet Grouting Technology

How jet grouting works and applications in major projects.

## Working Principle

Using high-pressure jets (300-600 bar) to break up soil and mix with cement.

## Systems

### 1. Single System
Single jet for cement only.

### 2. Double System
Cement and air jets.

### 3. Triple System
Cement, air and water jets.

## Applications

- Foundation strengthening
- Creating retaining walls
- Leakage treatment
- Metro tunnel strengthening

## Advantages

- Very high strength
- Works in all soil types
- Great depth (up to 30m)
- Columns up to 3m diameter

## Disadvantages

- High cost
- Noise and vibration
- Requires specialized equipment
    `,
  },
  {
    id: 13,
    title: 'كيفية اختيار تقنية الحقن المناسبة',
    titleEn: 'How to Choose Right Grouting Technique',
    category: 'حقن التربة',
    categoryEn: 'Soil Grouting',
    date: '2025-07-28',
    readTime: '11 دقيقة',
    author: 'د. ياسر الخالدي',
    slug: 'choosing-grouting-technique',
    content: `
# اختيار تقنية الحقن

معايير اختيار التقنية الأنسب حسب المشروع.

## العوامل المؤثرة

### 1. نوع التربة
- رملية: حقن كيميائي أو نفاذ
- طينية: حقن ضغط
- صخرية: حقن نفث

### 2. الهدف من الحقن
- ملء تكهفات: حقن أسمنتي
- منع تسرب: حقن كيميائي
- رفع المبنى: حقن ضغط

### 3. الميزانية
- محدودة: حقن أسمنتي تقليدي
- متوسطة: حقن كيميائي
- عالية: حقن نفث

### 4. الوقت المتاح
- سريع: حقن كيميائي
- متوسط: حقن أسمنتي
- طويل: أي تقنية

## جدول المقارنة

يمكن مقارنة التقنيات من حيث:
- التكلفة
- الوقت
- القوة
- العمق
- نوع التربة المناسب
    `,
    contentEn: `
# Choosing Grouting Technique

Criteria for selecting most suitable technique for project.

## Influencing Factors

### 1. Soil Type
- Sandy: chemical or permeation grouting
- Clay: compaction grouting
- Rocky: jet grouting

### 2. Grouting Purpose
- Fill voids: cement grouting
- Prevent seepage: chemical grouting
- Lift building: compaction grouting

### 3. Budget
- Limited: traditional cement grouting
- Medium: chemical grouting
- High: jet grouting

### 4. Available Time
- Fast: chemical grouting
- Medium: cement grouting
- Long: any technique

## Comparison Table

Techniques can be compared by:
- Cost
- Time
- Strength
- Depth
- Suitable soil type
    `,
  },
  {
    id: 14,
    title: 'معالجة تسربات المياه في الأساسات',
    titleEn: 'Water Leakage Treatment in Foundations',
    category: 'معالجة الهبوط',
    categoryEn: 'Settlement Treatment',
    date: '2025-07-20',
    readTime: '9 دقائق',
    author: 'م. هند العمري',
    slug: 'foundation-water-leakage',
    content: `
# معالجة تسربات الأساسات

طرق كشف ومعالجة تسربات المياه في الأساسات.

## أسباب التسرب

- تشققات في الخرسانة
- ضعف العزل المائي
- ارتفاع منسوب المياه الجوفية
- تسرب من شبكات المياه

## طرق الكشف

- الفحص البصري
- اختبار الرطوبة
- كاميرات حرارية
- تقنية GPR

## طرق المعالجة

### 1. حقن البولي يوريثان
- يتمدد عند التلامس مع الماء
- مثالي للتشققات النشطة
- يتصلب بسرعة

### 2. حقن الإيبوكسي
- للتشققات الجافة
- قوة عالية
- مقاوم للماء

### 3. العزل الخارجي
- حفر حول الأساسات
- تطبيق مواد عازلة
- إعادة الردم

## الوقاية

- عزل جيد منذ البداية
- صيانة دورية
- تصريف جيد للمياه
    `,
    contentEn: `
# Foundation Water Leakage Treatment

Methods for detecting and treating water leakage in foundations.

## Leakage Causes

- Concrete cracks
- Weak waterproofing
- Rising groundwater
- Water network leaks

## Detection Methods

- Visual inspection
- Moisture testing
- Thermal cameras
- GPR technology

## Treatment Methods

### 1. Polyurethane Injection
- Expands on water contact
- Ideal for active cracks
- Sets quickly

### 2. Epoxy Injection
- For dry cracks
- High strength
- Water resistant

### 3. External Waterproofing
- Excavate around foundations
- Apply waterproofing materials
- Backfill

## Prevention

- Good waterproofing from start
- Regular maintenance
- Good water drainage
    `,
  },
  {
    id: 15,
    title: 'التدعيم بألياف الكربون',
    titleEn: 'Carbon Fiber Reinforcement',
    category: 'إصلاح التشققات',
    categoryEn: 'Crack Repair',
    date: '2025-07-15',
    readTime: '10 دقائق',
    author: 'م. بدر الحارثي',
    slug: 'carbon-fiber-reinforcement',
    content: `
# التدعيم بألياف الكربون

استخدام ألياف الكربون في تقوية العناصر الإنشائية.

## ما هي ألياف الكربون؟

مادة قوية جداً وخفيفة الوزن تستخدم في تدعيم الخرسانة.

## المميزات

- قوة شد عالية جداً
- وزن خفيف
- مقاومة للتآكل
- سهلة التطبيق
- لا تؤثر على شكل المبنى

## الاستخدامات

- تقوية الكمرات
- تقوية الأعمدة
- تقوية البلاطات
- إصلاح التشققات الإنشائية

## خطوات التطبيق

1. تنظيف السطح
2. تسوية السطح
3. تطبيق مادة لاصقة
4. لصق ألياف الكربون
5. تطبيق طبقة حماية

## التكلفة

أعلى من الطرق التقليدية لكن أكثر فعالية.
    `,
    contentEn: `
# Carbon Fiber Reinforcement

Using carbon fiber to strengthen structural elements.

## What is Carbon Fiber?

Very strong and lightweight material used in concrete reinforcement.

## Advantages

- Very high tensile strength
- Lightweight
- Corrosion resistant
- Easy application
- No impact on building appearance

## Applications

- Beam strengthening
- Column strengthening
- Slab strengthening
- Structural crack repair

## Application Steps

1. Surface cleaning
2. Surface leveling
3. Apply adhesive
4. Attach carbon fiber
5. Apply protective layer

## Cost

Higher than traditional methods but more effective.
    `,
  },
  {
    id: 16,
    title: 'الفحص الدوري للمباني',
    titleEn: 'Periodic Building Inspection',
    category: 'فحص التربة',
    categoryEn: 'Soil Testing',
    date: '2025-07-08',
    readTime: '8 دقائق',
    author: 'م. لينا الجهني',
    slug: 'periodic-building-inspection',
    content: `
# الفحص الدوري للمباني

أهمية الفحص الدوري وتوقيته المناسب.

## لماذا الفحص الدوري؟

- الكشف المبكر عن المشاكل
- توفير تكاليف الإصلاح
- ضمان السلامة
- الحفاظ على قيمة العقار

## التوقيت المناسب

- سنوياً للمباني الجديدة
- كل 6 أشهر للمباني القديمة
- بعد أي حدث طبيعي (زلزال، فيضان)
- عند ملاحظة أي علامات غير طبيعية

## ما يتم فحصه؟

- الأساسات
- الجدران والأسقف
- الأرضيات
- التشققات
- الرطوبة
- العزل

## علامات تحتاج فحص فوري

- تشققات جديدة أو متزايدة
- أبواب لا تغلق
- ميلان في الجدران
- رطوبة غير مبررة
    `,
    contentEn: `
# Periodic Building Inspection

Importance of periodic inspection and appropriate timing.

## Why Periodic Inspection?

- Early problem detection
- Save repair costs
- Ensure safety
- Maintain property value

## Appropriate Timing

- Annually for new buildings
- Every 6 months for old buildings
- After any natural event (earthquake, flood)
- When noticing any abnormal signs

## What is Inspected?

- Foundations
- Walls and ceilings
- Floors
- Cracks
- Moisture
- Insulation

## Signs Needing Immediate Inspection

- New or increasing cracks
- Doors not closing
- Wall tilting
- Unexplained moisture
    `,
  },
  {
    id: 17,
    title: 'التكهفات الصخرية: المخاطر والحلول',
    titleEn: 'Rock Cavities: Risks and Solutions',
    category: 'كشف التكهفات',
    categoryEn: 'Cavity Detection',
    date: '2025-07-01',
    readTime: '13 دقيقة',
    author: 'د. فهد المالك',
    slug: 'rock-cavities-solutions',
    content: `
# التكهفات الصخرية

كيفية التعامل مع التكهفات الصخرية في مواقع البناء.

## الأسباب

- الذوبان الطبيعي للصخور الجيرية
- التعرية المائية
- النشاط الزلزالي القديم
- التعدين القديم

## المخاطر

- انهيار مفاجئ للأرض
- هبوط المباني
- تشققات خطيرة
- خطر على حياة السكان

## طرق الكشف

- المسح الجيوفيزيائي
- رادار اختراق الأرض
- الحفر الاستكشافي
- التصوير السيزمي

## طرق المعالجة

### 1. ملء التكهفات
حقن أسمنتي أو خرساني لملء التكهفات.

### 2. الخوازيق العميقة
تجاوز طبقة التكهفات للوصول لطبقات صلبة.

### 3. البلاطات العائمة
إنشاء بلاطة سميكة تتحمل أي هبوط محتمل.

## الوقاية

- فحص جيولوجي شامل
- تجنب البناء في المناطق المعروفة
- مراقبة دورية
    `,
    contentEn: `
# Rock Cavities

How to deal with rock cavities in construction sites.

## Causes

- Natural dissolution of limestone
- Water erosion
- Old seismic activity
- Old mining

## Risks

- Sudden ground collapse
- Building settlement
- Dangerous cracks
- Risk to residents' lives

## Detection Methods

- Geophysical survey
- Ground penetrating radar
- Exploratory drilling
- Seismic imaging

## Treatment Methods

### 1. Cavity Filling
Cement or concrete grouting to fill voids.

### 2. Deep Piles
Bypass cavity layer to reach solid layers.

### 3. Floating Slabs
Create thick slab to withstand any potential settlement.

## Prevention

- Comprehensive geological survey
- Avoid building in known areas
- Periodic monitoring
    `,
  },
  {
    id: 18,
    title: 'تحسين خواص التربة قبل البناء',
    titleEn: 'Soil Improvement Before Construction',
    category: 'حقن التربة',
    categoryEn: 'Soil Grouting',
    date: '2025-06-25',
    readTime: '15 دقيقة',
    author: 'م. عمر الشهراني',
    slug: 'soil-improvement-techniques',
    content: `
# تحسين خواص التربة

تقنيات تحسين التربة الضعيفة لجعلها صالحة للبناء.

## متى نحتاج التحسين؟

- تربة ضعيفة القوة
- قدرة تحمل منخفضة
- تربة قابلة للانكماش أو الانتفاخ
- وجود مياه جوفية عالية

## التقنيات الرئيسية

### 1. الدمك
- الدمك السطحي
- الدمك العميق
- الدمك الديناميكي

### 2. الحقن
- حقن أسمنتي
- حقن كيميائي
- حقن نفث

### 3. الاستبدال
- إزالة التربة الضعيفة
- استبدالها بتربة جيدة
- الدمك الجيد

### 4. التصريف
- خفض منسوب المياه
- تركيب أنظمة تصريف
- تحسين خواص التربة

### 5. المعالجة الكيميائية
- إضافة الجير
- إضافة الأسمنت
- مواد كيميائية أخرى

## الاختيار المناسب

يعتمد على:
- نوع التربة
- عمق الطبقة الضعيفة
- الميزانية
- الوقت المتاح
    `,
    contentEn: `
# Soil Improvement

Techniques for improving weak soil to make it suitable for construction.

## When Improvement Needed?

- Weak strength soil
- Low bearing capacity
- Shrinkable or expansive soil
- High groundwater presence

## Main Techniques

### 1. Compaction
- Surface compaction
- Deep compaction
- Dynamic compaction

### 2. Grouting
- Cement grouting
- Chemical grouting
- Jet grouting

### 3. Replacement
- Remove weak soil
- Replace with good soil
- Good compaction

### 4. Drainage
- Lower water level
- Install drainage systems
- Improve soil properties

### 5. Chemical Treatment
- Add lime
- Add cement
- Other chemical materials

## Appropriate Selection

Depends on:
- Soil type
- Weak layer depth
- Budget
- Available time
    `,
  },
];

