import type { City, ServiceLanding } from '@/data/seoLocations';

export type CityServiceModel = {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  kicker: string;
  chips: string[];
  // Intro paragraphs (rendered as <p>)
  intro: string[];
  // Summary cards
  whatIsTitle: string;
  whatIsBody: string[];
  whenTitle: string;
  whenBullets: string[];
  // Service types / approaches
  typesTitle: string;
  types: { title: string; body: string }[];
  // How we work
  processTitle: string;
  processSteps: { title: string; body: string }[];
  // Deliverables
  deliverablesTitle: string;
  deliverablesBullets: string[];
  // Why early
  whyEarlyTitle: string;
  whyEarlyBullets: string[];
  // FAQ
  faqTitle: string;
  faq: { q: string; a: string }[];
  // Footer CTA
  footerTitle: string;
  footerBody: string;
};

export const MODEL_SERVICE_SLUGS = ['soil-grouting', 'void-detection', 'geophysical-surveys'] as const;
export type ModelServiceSlug = (typeof MODEL_SERVICE_SLUGS)[number];

export function isModelServiceSlug(slug?: string): slug is ModelServiceSlug {
  return !!slug && (MODEL_SERVICE_SLUGS as readonly string[]).includes(slug);
}

function cityName(lang: 'ar' | 'en', city: City) {
  return lang === 'ar' ? city.ar : city.en;
}

function byLang<T>(lang: 'ar' | 'en', ar: T, en: T) {
  return lang === 'ar' ? ar : en;
}

export function buildCityServiceModel(params: { lang: 'ar' | 'en'; city: City; service: ServiceLanding }): CityServiceModel {
  const { lang, city } = params;
  const c = cityName(lang, city);
  const brandAr = 'شركة إطلاق المتميزة';
  const brandEn = 'Etlaq';

  // --- Service-specific copy ---
  if (params.service.slug === 'soil-grouting') {
    const seoTitle = byLang(
      lang,
      `حقن تربة في ${c} (الحقن الأسمنتي في ${c}) | ${brandAr}`,
      `Soil Grouting in ${c} (Cement Grouting) | ${brandEn}`,
    );
    const seoDescription = byLang(
      lang,
      `حقن تربة (حقن التربة) والحقن الأسمنتي في ${c} لمعالجة الهبوط والتشققات وملء الفراغات والتكهفات. معاينة ميدانية + خطة واضحة + تنفيذ احترافي وتقارير مفهومة من ${brandAr}.`,
      `Soil (cement) grouting in ${c} to address settlement, cracks and subsurface voids. Site visit + clear plan + professional execution with easy-to-read deliverables by ${brandEn}.`,
    );

    return {
      seoTitle,
      seoDescription,
      h1: byLang(lang, `حقن تربة في ${c} (الحقن الأسمنتي في ${c})`, `Soil Grouting in ${c} (Cement Grouting)`),
      kicker: byLang(lang, `${brandAr} — حلول هندسية ميدانية`, `${brandEn} — Field‑proven engineering solutions`),
      chips: byLang(
        lang,
        ['حقن إسمنتي', 'تثبيت أساسات', 'معالجة هبوط', 'تقارير واضحة'],
        ['Cement grouting', 'Foundation support', 'Settlement control', 'Clear reporting'],
      ),
      intro: byLang(
        lang,
        [
          `نساعد ملاك العقارات والمنشآت في ${c} على حماية المبنى والبنية التحتية عبر معالجة مناطق الضعف تحت الأساسات قبل أن تتطور إلى هبوط أو تشققات مكلفة.`,
          `الفكرة ليست “حقن وخلاص”—بل تشخيص مبسط، ثم اختيار طريقة مناسبة، ثم تنفيذ منضبط يساعد على استقرار الحالة وتقليل المخاطر.`,
        ],
        [
          `In ${c}, we help owners protect buildings and infrastructure by treating subsurface weak zones before they become costly settlement or cracking.`,
          `It’s not “inject and hope”—we start with a practical diagnosis, choose the right grouting approach, then execute in a controlled way to reduce risk.`,
        ],
      ),
      whatIsTitle: byLang(lang, 'ما هو حقن التربة (الحقن الأسمنتي)؟', 'What is soil (cement) grouting?'),
      whatIsBody: byLang(
        lang,
        [
          'هو ضخ ملاط إسمنتي (Grout) أو مادة معالجة مناسبة داخل التربة/الفراغات أسفل الأساسات بهدف ملء التجاويف وتحسين الاستقرار وتقليل الهبوط.',
          'يتم اختيار الخلطة وطريقة الضخ وفقًا لطبيعة التربة وسبب المشكلة، مع هدف واضح: تقوية المنطقة الضعيفة دون إحداث رفع غير مرغوب.',
        ],
        [
          'A controlled injection of grout (cementitious mix) into soils/voids below foundations to fill cavities, improve stability and reduce settlement.',
          'The mix and technique are selected based on soil behavior and the root cause, aiming to strengthen weak zones without unwanted heave.',
        ],
      ),
      whenTitle: byLang(lang, 'متى نوصي بحقن التربة؟', 'When is grouting recommended?'),
      whenBullets: byLang(
        lang,
        [
          'تشققات جديدة أو متزايدة في الجدران/اللياسة.',
          'هبوط أو ميلان في البلاط أو الأرضيات.',
          'اشتباه فراغات/تكهفات تحت المبنى.',
          'ردم غير متجانس أو ضعف تربة تحت منسوب التأسيس.',
          'قبل ترميمات كبيرة أو توسعات عندما نحتاج لتقليل المخاطر.',
        ],
        [
          'New or widening cracks in walls/finishes.',
          'Floor settlement, unevenness or tilting.',
          'Suspected subsurface voids/cavities.',
          'Non-uniform backfill or weak soil below foundation level.',
          'Before major renovations/expansions to reduce risk.',
        ],
      ),
      typesTitle: byLang(lang, 'أنواع الحقن التي ننفذها حسب الحالة', 'Grouting approaches (selected per case)'),
      types: byLang(
        lang,
        [
          { title: 'حقن ملء الفراغات والتكهفات', body: 'يستهدف سد التجاويف تحت الأرضيات أو قرب الأساسات لتقليل خطر الهبوط الموضعي.' },
          { title: 'الحقن الاختراقي (Permeation)', body: 'يدخل الملاط داخل المسام لتحسين تماسك التربة دون إزاحة كبيرة عندما تسمح التربة بذلك.' },
          { title: 'الحقن بالتكثيف (Compaction)', body: 'يركز على زيادة كثافة التربة ورفع قدرتها على التحمل مع ضوابط تمنع الرفع غير المسيطر عليه.' },
          { title: 'حقن موجّه تحت الأساسات', body: 'عند وجود مناطق ضعف محددة، يتم تحديد النقاط والأعماق لاستهداف المشكلة بدقة.' },
        ],
        [
          { title: 'Void/cavity filling', body: 'Targets cavities below floors or near foundations to reduce localized settlement.' },
          { title: 'Permeation grouting', body: 'Fills soil pores to improve cohesion without significant displacement—when soil allows.' },
          { title: 'Compaction grouting', body: 'Densifies the ground to increase bearing capacity, with controls to avoid uncontrolled heave.' },
          { title: 'Targeted underpin support', body: 'When weak zones are localized, injection is planned to address specific areas precisely.' },
        ],
      ),
      processTitle: byLang(lang, 'من المعاينة إلى التقرير النهائي', 'From site visit to final deliverables'),
      processSteps: byLang(
        lang,
        [
          { title: 'معاينة وتشخيص مبسط', body: 'نراجع الأعراض، تاريخ المشكلة، ونحدد نطاق التأثر بصورة عملية.' },
          { title: 'تحريات عند الحاجة', body: 'قد نستخدم كشف فراغات/اختبارات مساندة لتحديد السبب الجذري بدقة أفضل.' },
          { title: 'خطة معالجة واضحة', body: 'تحديد نقاط/أعماق، ونوع الخلطة، ومعايير الإيقاف بما يضمن نتائج متزنة.' },
          { title: 'تنفيذ منضبط', body: 'تنفيذ وفق الخطة مع ضبط الكميات والضغوط لتقليل المخاطر.' },
          { title: 'تقرير مبسط ومخرجات', body: 'ملخص ما تم، نطاق العمل، وتوصيات متابعة مناسبة للحالة.' },
        ],
        [
          { title: 'Practical site diagnosis', body: 'We review symptoms, history and affected zones in a practical way.' },
          { title: 'Targeted checks if needed', body: 'Void detection or supporting tests may be used to refine root-cause understanding.' },
          { title: 'Clear treatment plan', body: 'Points/depths, mix selection and stop criteria to keep outcomes stable.' },
          { title: 'Controlled execution', body: 'Execution per plan while controlling volumes/pressures to reduce risk.' },
          { title: 'Clear deliverables', body: 'A simple report summarizing what was done, scope and follow-up guidance.' },
        ],
      ),
      deliverablesTitle: byLang(lang, 'ماذا تستلم بعد التنفيذ؟', 'What you receive'),
      deliverablesBullets: byLang(
        lang,
        [
          'تقرير فني مختصر وواضح يشرح الحالة وما تم تنفيذه.',
          'سجل كميات/مراحل الحقن ونقاط العمل (حسب نطاق المشروع).',
          'مخطط توزيع نقاط الحقن (As‑Built) + صور ميدانية عند توفرها.',
          'توصيات متابعة لتقليل احتمال تكرار المشكلة (مثل معالجة مصادر تسرب إن وجدت).',
        ],
        [
          'A concise, easy-to-read technical summary of the case and executed scope.',
          'Injection log (volumes/stages/points) as applicable to the project scope.',
          'As‑built points layout plus site photos when available.',
          'Follow-up guidance to reduce recurrence (e.g., address water leakage sources).',
        ],
      ),
      whyEarlyTitle: byLang(lang, 'لماذا الحل المبكر مهم؟', 'Why early action matters'),
      whyEarlyBullets: byLang(
        lang,
        ['تكلفة أقل', 'وقت أقل', 'مخاطرة أقل على المبنى', 'نتائج أكثر استقرارًا على المدى الطويل'],
        ['Lower cost', 'Less disruption', 'Reduced structural risk', 'More stable long-term outcomes'],
      ),
      faqTitle: byLang(lang, 'أسئلة شائعة', 'FAQ'),
      faq: byLang(
        lang,
        [
          {
            q: 'هل الحقن يعالج التشققات نهائيًا؟',
            a: 'يعالج السبب المرتبط بضعف التربة/الفراغات وتقليل الهبوط. بعد الاستقرار قد يلزم ترميم التشققات حسب توصية الاستشاري.',
          },
          {
            q: 'هل يمكن أن يسبب الحقن رفع البلاط أو إجهاد عناصر المبنى؟',
            a: 'عند ضبط الخطة والتنفيذ بشكل منضبط تقل المخاطر بشكل كبير. ترتفع المخاطر مع الضخ العشوائي أو الضغط غير المنضبط.',
          },
          { q: 'كم تستغرق مدة العمل؟', a: 'تختلف حسب عدد النقاط والأعماق وسلوك الامتصاص. بعد المعاينة نحدد مدة تقديرية واضحة.' },
          { q: 'هل يلزم إخلاء المبنى؟', a: 'غالبًا لا. نحدد ذلك حسب الموقع وطبيعة الحالة وإجراءات السلامة.' },
          { q: 'هل تقدمون خدمة معاينة في الموقع؟', a: `نعم. يمكن ترتيب معاينة داخل ${c} لتقييم الحالة وتحديد الخطوة الأنسب.` },
        ],
        [
          {
            q: 'Will grouting fix cracks permanently?',
            a: 'It addresses subsurface causes (weak ground/voids) and helps stabilize settlement. Crack repairs may still be needed after stabilization.',
          },
          {
            q: 'Can grouting cause floor heave or stress the structure?',
            a: 'With a controlled plan and execution, risk is minimized. Risks increase with uncontrolled pressure/volume.',
          },
          { q: 'How long does it take?', a: 'It depends on points, depth and ground response. After a visit we provide a clear time estimate.' },
          { q: 'Do we need to vacate the building?', a: 'Usually no. It depends on site constraints and safety considerations.' },
          { q: 'Do you offer a site visit?', a: `Yes. We can arrange a visit in ${c} to assess and recommend the right next step.` },
        ],
      ),
      footerTitle: byLang(lang, `اطلب معاينة في ${c}`, `Request a site visit in ${c}`),
      footerBody: byLang(
        lang,
        'لديك هبوط أو تشققات أو اشتباه فراغات؟ تواصل معنا للحصول على معاينة وخطة معالجة واضحة.',
        'Seeing settlement, cracks or suspected voids? Contact us for a site visit and a clear, practical plan.',
      ),
    };
  }

  if (params.service.slug === 'void-detection') {
    const seoTitle = byLang(
      lang,
      `كشف التكهفات في ${c} | ${brandAr}`,
      `Void & Cavity Detection in ${c} | ${brandEn}`,
    );
    const seoDescription = byLang(
      lang,
      `كشف التكهفات والفراغات في ${c} باستخدام تقنيات مثل GPR وERT وتحديد المناطق الخطرة قبل أن تسبب هبوطًا أو تشققات. نتائج واضحة وتوصيات خطوة تالية من ${brandAr}.`,
      `Void/cavity detection in ${c} using methods like GPR and ERT to identify risk zones before they cause settlement or cracking. Clear results and next-step guidance by ${brandEn}.`,
    );

    return {
      seoTitle,
      seoDescription,
      h1: byLang(lang, `كشف التكهفات في ${c}`, `Void & Cavity Detection in ${c}`),
      kicker: byLang(lang, `${brandAr} — تشخيص قبل المعالجة`, `${brandEn} — Diagnose before you treat`),
      chips: byLang(
        lang,
        ['كشف فراغات', 'GPR / ERT', 'تحديد مخاطر', 'تقرير مبسط'],
        ['Void detection', 'GPR / ERT', 'Risk mapping', 'Clear reporting'],
      ),
      intro: byLang(
        lang,
        [
          `في كثير من الحالات لا يكون الهبوط أو التشققات “مشكلة خرسانة” بل نتيجة فراغات/تكهفات أو تربة ضعيفة تحت السطح داخل ${c}.`,
          'نساعدك على معرفة أين المشكلة بالضبط قبل اتخاذ قرار الحقن أو الترميم، لتوفير الوقت والتكلفة وتقليل المخاطر.',
        ],
        [
          `Often, settlement or cracking is not a “concrete issue” but a subsurface void/weak ground problem in ${c}.`,
          `We help you locate the issue before choosing grouting or repairs—saving time, cost and reducing risk.`,
        ],
      ),
      whatIsTitle: byLang(lang, 'ما المقصود بكشف التكهفات/الفراغات؟', 'What is void/cavity detection?'),
      whatIsBody: byLang(
        lang,
        [
          'هو فحص غير هدّام يهدف لتحديد مؤشرات الفراغات أو مناطق الضعف تحت الأرضيات أو قرب الأساسات عبر قياسات جيوفيزيائية أو تحريات محددة.',
          'الهدف: خريطة واضحة للمناطق المحتملة مع مستوى ثقة مناسب، ثم توصية بالخطوة التالية (تحقق، حقن، أو معالجة أخرى).',
        ],
        [
          'A non-destructive investigation to identify indicators of voids or weak zones below slabs or near foundations using geophysical measurements and targeted checks.',
          'The goal: a clear map of likely zones with confidence level, then a recommendation for the next step (validation, grouting or other treatment).',
        ],
      ),
      whenTitle: byLang(lang, 'متى نوصي بكشف التكهفات؟', 'When should you run a void survey?'),
      whenBullets: byLang(
        lang,
        [
          'ظهور هبوط موضعي في الأرضيات أو الأرصفة.',
          'تشققات تتكرر بعد الترميم.',
          'اشتباه تسربات مياه طويلة تؤدي لغسل التربة.',
          'مشاريع تتطلب تقليل المخاطر قبل التوسعة/الترميم.',
          'مناطق قريبة من خدمات/شبكات قد تسبب تجاويف.',
        ],
        [
          'Localized floor/pavement settlement.',
          'Cracks recurring after repairs.',
          'Long-term water leakage suspected to wash out fines.',
          'Before renovation/extension to reduce uncertainty.',
          'Near utilities/networks where cavities may develop.',
        ],
      ),
      typesTitle: byLang(lang, 'أدوات وتقنيات نستخدمها حسب الحالة', 'Tools we use (selected per case)'),
      types: byLang(
        lang,
        [
          { title: 'GPR (الرادار الأرضي)', body: 'مناسب لرصد التغيرات تحت السطح في نطاقات معينة، خصوصًا تحت البلاطات والطرق.' },
          { title: 'ERT (المقاومة الكهربائية)', body: 'يفيد في تتبع مناطق الرطوبة/الفراغات وتأثير المياه حسب خصائص التربة.' },
          { title: 'Seismic / MASW', body: 'يعطي مؤشرات عن صلابة الطبقات وتغيراتها عندما يكون ذلك مناسبًا.' },
          { title: 'تحقق موجه (عند الحاجة)', body: 'في بعض الحالات نوصي بحفر/اختبار تحقق محدود لتأكيد النتائج قبل المعالجة.' },
        ],
        [
          { title: 'GPR (Ground Penetrating Radar)', body: 'Good for detecting near-surface contrasts—commonly for slabs, pavements and roads.' },
          { title: 'ERT (Electrical Resistivity)', body: 'Useful to track moisture/void indicators and water influence depending on soil type.' },
          { title: 'Seismic / MASW', body: 'Provides stiffness/velocity indicators when relevant to the case.' },
          { title: 'Targeted validation (if needed)', body: 'Limited validation drilling/testing may be recommended to confirm before treatment.' },
        ],
      ),
      processTitle: byLang(lang, 'كيف نعمل؟', 'How we work'),
      processSteps: byLang(
        lang,
        [
          { title: 'تحديد الهدف ونطاق الفحص', body: 'ما المشكلة؟ أين تظهر الأعراض؟ ما المناطق الأكثر حساسية؟' },
          { title: 'جمع بيانات ميدانية', body: 'تنفيذ المسارات/الخطوط اللازمة بالمنهج المناسب للحالة.' },
          { title: 'تحليل وخرائط نتائج', body: 'تلخيص المناطق المحتملة وتقديم مستوى ثقة/ملاحظات تفسير.' },
          { title: 'توصية خطوة تالية', body: 'إما تحقق محدود، أو حقن/معالجة، أو متابعة حسب النتائج.' },
        ],
        [
          { title: 'Define objective & scope', body: 'What is the symptom and where is the sensitive area?' },
          { title: 'Collect field data', body: 'Run the required grids/lines using the best-fit method for the case.' },
          { title: 'Interpretation & maps', body: 'Highlight likely zones and provide practical interpretation notes.' },
          { title: 'Next-step recommendation', body: 'Validation, treatment (grouting) or monitoring depending on findings.' },
        ],
      ),
      deliverablesTitle: byLang(lang, 'ماذا تستلم؟', 'What you receive'),
      deliverablesBullets: byLang(
        lang,
        [
          'خريطة مناطق اشتباه الفراغات/الضعف ضمن نطاق الفحص.',
          'ملخص تفسير مبسط: ماذا تعني النتائج وما حدودها.',
          'توصيات خطوة تالية قابلة للتنفيذ (تحقق/حقن/متابعة).',
        ],
        [
          'Map of likely void/weak zones within the surveyed area.',
          'Simple interpretation summary and limitations.',
          'Actionable next-step recommendations (validate/grout/monitor).',
        ],
      ),
      whyEarlyTitle: byLang(lang, 'لماذا هذا الفحص يوفر عليك؟', 'Why this survey saves you'),
      whyEarlyBullets: byLang(
        lang,
        ['تحديد المكان الصحيح للمعالجة', 'تجنب حقن/ترميم غير ضروري', 'تقليل المفاجآت أثناء التنفيذ', 'قرار أسرع بثقة أعلى'],
        ['Targeted treatment', 'Avoid unnecessary repairs', 'Fewer surprises on site', 'Faster, more confident decisions'],
      ),
      faqTitle: byLang(lang, 'أسئلة شائعة', 'FAQ'),
      faq: byLang(
        lang,
        [
          { q: 'هل كشف التكهفات دقيق 100%؟', a: 'يوفر مؤشرات قوية ضمن حدود التقنية والبيئة. أحيانًا نوصي بتحقق محدود لرفع مستوى الثقة.' },
          { q: 'هل يمكن عمل الفحص داخل المبنى؟', a: 'نعم في كثير من الحالات، خصوصًا تحت البلاطات، حسب العوائق المتاحة.' },
          { q: 'هل النتائج تعني ضرورة الحقن دائمًا؟', a: 'ليس دائمًا. القرار يعتمد على مستوى الخطر والهدف (ترميم/وقاية/توسعة).' },
          { q: 'كم يستغرق الفحص؟', a: 'حسب المساحة وطبيعة الموقع. بعد تحديد النطاق نعطي تقديرًا واضحًا للمدة.' },
          { q: 'هل تقدمون توصية بالحل بعد الفحص؟', a: 'نعم—التقرير يتضمن توصيات خطوة تالية مناسبة للحالة.' },
        ],
        [
          { q: 'Is it 100% accurate?', a: 'It provides strong indicators within method limitations. Sometimes targeted validation is recommended for higher confidence.' },
          { q: 'Can the survey be done inside buildings?', a: 'Yes in many cases, especially for slabs, subject to access and obstacles.' },
          { q: 'Do results always mean grouting is required?', a: 'Not necessarily. It depends on risk level and project objective.' },
          { q: 'How long does it take?', a: 'Depends on area and site constraints. We provide a clear estimate after scoping.' },
          { q: 'Do you recommend solutions after the survey?', a: 'Yes—the report includes practical next-step guidance.' },
        ],
      ),
      footerTitle: byLang(lang, `احجز فحصًا في ${c}`, `Book a survey in ${c}`),
      footerBody: byLang(
        lang,
        'إذا كان لديك هبوط موضعي أو تشققات متكررة أو اشتباه تسربات، يمكننا تحديد نطاق فحص مناسب ونتائج واضحة.',
        'If you have localized settlement, recurring cracks or suspected leakage, we can scope a practical survey and deliver clear results.',
      ),
    };
  }

  // geophysical-surveys
  const seoTitle = byLang(
    lang,
    `الاختبارات الجيوفيزيائية في ${c} | ${brandAr}`,
    `Geophysical Testing in ${c} | ${brandEn}`,
  );
  const seoDescription = byLang(
    lang,
    `الاختبارات الجيوفيزيائية في ${c} مثل GPR وERT وSeismic لفهم ما تحت السطح وتحديد مناطق الضعف والفراغات ومسارات المياه. نتائج واضحة وتوصيات من ${brandAr}.`,
    `Geophysical testing in ${c} (GPR, ERT, seismic) to understand subsurface conditions, locate weak zones/voids and water pathways. Clear deliverables by ${brandEn}.`,
  );

  return {
    seoTitle,
    seoDescription,
    h1: byLang(lang, `الاختبارات الجيوفيزيائية في ${c}`, `Geophysical Testing in ${c}`),
    kicker: byLang(lang, `${brandAr} — فهم ما تحت السطح`, `${brandEn} — Understand what’s below`),
    chips: byLang(
      lang,
      ['GPR', 'ERT', 'Seismic', 'خرائط واضحة'],
      ['GPR', 'ERT', 'Seismic', 'Clear maps'],
    ),
    intro: byLang(
      lang,
      [
        `الاختبارات الجيوفيزيائية تساعدك على رؤية “الصورة تحت الأرض” داخل ${c} بدون تكسير كبير: أين مناطق الضعف؟ هل هناك فراغات؟ هل توجد مسارات مياه تؤثر على التربة؟`,
        'نحوّل القياسات إلى خرائط وتوصيات مبسطة تساعدك على اتخاذ قرار الحقن/الترميم/المعالجة بثقة أعلى.',
      ],
      [
        `Geophysical methods help you see the subsurface picture in ${c} with minimal disturbance: weak zones, void indicators, and water pathways.`,
        'We convert measurements into clear maps and simple recommendations so you can decide on grouting, repairs or further checks with higher confidence.',
      ],
    ),
    whatIsTitle: byLang(lang, 'ما هي الاختبارات الجيوفيزيائية؟', 'What are geophysical tests?'),
    whatIsBody: byLang(
      lang,
      [
        'هي تقنيات قياس غير هدّامة تعتمد على الموجات/المقاومة/السرعات لتفسير تغيرات التربة والصخور تحت السطح.',
        'لا “تعطي صورة سحرية”، لكنها تقدم مؤشرات قوية عند اختيار المنهج الصحيح وربطه بهدف واضح.',
      ],
      [
        'Non-destructive measurements (waves/resistivity/velocities) used to interpret subsurface contrasts and conditions.',
        'They are not “magic images”, but strong indicators when the right method is chosen for a clear objective.',
      ],
    ),
    whenTitle: byLang(lang, 'متى نوصي بها؟', 'When is it useful?'),
    whenBullets: byLang(
      lang,
      [
        'قبل أعمال حقن/ترميم لتحديد نطاق المشكلة بدقة.',
        'عند الاشتباه بفراغات أو تكهفات تحت الأرض.',
        'لتتبع تأثير المياه/الرطوبة ومساراتها.',
        'في مشاريع البنية التحتية والطرق لتقييم مناطق الضعف.',
        'عندما نحتاج بيانات سريعة لتقليل عدم اليقين.',
      ],
      [
        'Before grouting/repairs to better define scope.',
        'When voids/cavities are suspected.',
        'To track moisture/water pathway influence.',
        'Infrastructure/road projects to map weak zones.',
        'When fast data is needed to reduce uncertainty.',
      ],
    ),
    typesTitle: byLang(lang, 'أهم التقنيات', 'Common methods'),
    types: byLang(
      lang,
      [
        { title: 'GPR (رادار أرضي)', body: 'مفيد للمناطق القريبة من السطح مثل البلاطات والطرق، ويعطي مؤشرات عن فراغات/تغيرات.' },
        { title: 'ERT (مقاومة كهربائية)', body: 'يستخدم لتفسير تغيرات الرطوبة/الفراغات/التربة حسب البيئة.' },
        { title: 'Seismic / MASW', body: 'يعطي مؤشرات صلابة وسرعات تساعد في فهم الطبقات.' },
        { title: 'تكامل البيانات', body: 'أفضل النتائج تأتي من ربط الاختبار بالهدف وببيانات الموقع المتاحة.' },
      ],
      [
        { title: 'GPR', body: 'Great for near-surface slabs/pavements, highlighting contrasts and void indicators.' },
        { title: 'ERT', body: 'Interprets resistivity changes linked to moisture, void indicators and soil variability.' },
        { title: 'Seismic / MASW', body: 'Provides stiffness/velocity indicators to understand layering.' },
        { title: 'Data integration', body: 'Best results come from matching method to objective and available site info.' },
      ],
    ),
    processTitle: byLang(lang, 'كيف تُسلَّم النتائج؟', 'How results are delivered'),
    processSteps: byLang(
      lang,
      [
        { title: 'تحديد الهدف', body: 'ماذا نريد أن نعرف؟ فراغات؟ مياه؟ ضعف طبقات؟' },
        { title: 'تنفيذ المسح', body: 'شبكة خطوط/نقاط مناسبة للموقع مع مراعاة العوائق.' },
        { title: 'تحليل وتفسير', body: 'تحويل الإشارات إلى خرائط واضحة وملاحظات تفسير.' },
        { title: 'توصيات خطوة تالية', body: 'هل نحتاج تحقق؟ هل نطاق الحقن واضح؟ ما المخاطر؟' },
      ],
      [
        { title: 'Define the objective', body: 'Voids? Water pathways? Weak layers?' },
        { title: 'Run the survey', body: 'A practical grid/lines adapted to obstacles.' },
        { title: 'Interpretation', body: 'Convert signals into clear maps with notes.' },
        { title: 'Next-step guidance', body: 'Validate? Define grouting scope? Identify risks?' },
      ],
    ),
    deliverablesTitle: byLang(lang, 'ماذا تستلم؟', 'What you receive'),
    deliverablesBullets: byLang(
      lang,
      [
        'خرائط/مقاطع تبين مناطق التغير المحتملة ضمن نطاق الفحص.',
        'ملخص مبسط للنتائج وحدودها.',
        'توصيات خطوة تالية (تحقق/حقن/متابعة) حسب الهدف.',
      ],
      [
        'Maps/sections highlighting likely contrast zones within the survey area.',
        'A simple summary of findings and limitations.',
        'Actionable next-step recommendations (validate/grout/monitor).',
      ],
    ),
    whyEarlyTitle: byLang(lang, 'لماذا تفيدك؟', 'Why it helps'),
    whyEarlyBullets: byLang(
      lang,
      ['تحديد نطاق المعالجة بدقة', 'تقليل التجربة والخطأ', 'رفع الثقة في قرار الحقن/الترميم', 'توفير وقت وتكلفة'],
      ['Define scope precisely', 'Reduce trial-and-error', 'Improve decision confidence', 'Save time and cost'],
    ),
    faqTitle: byLang(lang, 'أسئلة شائعة', 'FAQ'),
    faq: byLang(
      lang,
      [
        { q: 'هل تحتاجون إيقاف الموقع بالكامل؟', a: 'غالبًا لا. يتم تنسيق المسار بما يقلل التأثير على الحركة حسب الموقع.' },
        { q: 'هل يمكن دمج أكثر من تقنية؟', a: 'نعم، أحيانًا دمج GPR وERT يعطي صورة أفضل حسب الحالة.' },
        { q: 'هل النتائج كافية وحدها للحقن؟', a: 'في كثير من الحالات تساعد على تحديد النطاق، وقد نوصي بتحقق محدود عند الحاجة.' },
        { q: 'هل تؤثر التسليحات/المعادن على GPR؟', a: 'قد تؤثر داخل بعض المناطق، لذا نختار المسار/التقنية المناسبة.' },
        { q: 'متى أستلم التقرير؟', a: 'عادة خلال فترة قصيرة بعد اكتمال المسح وتحليل البيانات.' },
      ],
      [
        { q: 'Do you need to shut the site down?', a: 'Usually no. We coordinate lines to minimize disruption.' },
        { q: 'Can methods be combined?', a: 'Yes—combining GPR and ERT can improve confidence in many cases.' },
        { q: 'Are results alone enough for grouting?', a: 'Often they help define scope; targeted validation may be recommended if needed.' },
        { q: 'Do metals/rebar affect GPR?', a: 'They can in some areas; we adapt the approach accordingly.' },
        { q: 'When is the report delivered?', a: 'Typically soon after the survey and interpretation are completed.' },
      ],
    ),
    footerTitle: byLang(lang, `اطلب اختبارًا جيوفيزيائيًا في ${c}`, `Request geophysical testing in ${c}`),
    footerBody: byLang(
      lang,
      'إذا كنت تحتاج فهمًا أفضل لما تحت السطح قبل قرار الحقن أو الترميم، تواصل معنا لتحديد نطاق مناسب.',
      'If you need a clearer subsurface picture before deciding on grouting or repairs, contact us to scope the right survey.',
    ),
  };
}
