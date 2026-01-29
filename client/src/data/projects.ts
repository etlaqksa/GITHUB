export type ServiceKey = 'grouting' | 'cavity' | 'geophysical';
export type LocalizedText = { ar: string; en: string };
export type ProjectCaseStudy = {
  challenge: LocalizedText;
  approach: { ar: string[]; en: string[] };
  deliverables: { ar: string[]; en: string[] };
  outcome: LocalizedText;
};
export type Project = {
  slug: string;
  serviceKey: ServiceKey;
  title: LocalizedText;
  client: LocalizedText;
  location: LocalizedText;
  year: string;
  categoryLabel: LocalizedText;
  summary: LocalizedText;
  caseStudy: ProjectCaseStudy;
};

export const projects: Project[] = [
  {
    slug: "riyadh-metro",
    serviceKey: "grouting",
    title: { ar: "\u0645\u062a\u0631\u0648 \u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh Metro" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u0641\u0627\u0633\u062a", en: "FAST Company" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0645\u0634\u0631\u0648\u0639 \u0636\u062e\u0645 \u0644\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u062b\u0628\u064a\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u062a\u0631\u0648 \u0627\u0644\u0631\u064a\u0627\u0636", en: "Massive soil grouting and foundation stabilization project for Riyadh Metro" },
    year: "2015",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **مترو الرياض** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع حساسية عالية للحركة/التشققات. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Riyadh Metro** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under high sensitivity to movement. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن دمك مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر منطقة تجريبية وتحليل منحنى الامتصاص، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using stage grouting with packers with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via crack gauge tracking, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "prince-abdulaziz-bin-mishaal-palace",
    serviceKey: "grouting",
    title: { ar: "\u0642\u0635\u0631 \u0627\u0644\u0623\u0645\u064a\u0631 \u0639\u0628\u062f\u0627\u0644\u0639\u0632\u064a\u0632 \u0628\u0646 \u0645\u0634\u0639\u0644 \u0622\u0644 \u0633\u0639\u0648\u062f", en: "Prince Abdulaziz bin Mishaal Palace" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u0646\u0638\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062a", en: "Nuzum Contracting Company" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0628\u0648\u0637 \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0648\u062a\u0642\u0648\u064a\u0629 \u0627\u0644\u062a\u0631\u0628\u0629 \u0644\u0642\u0635\u0631 \u0645\u0644\u0643\u064a", en: "Foundation settlement treatment and soil strengthening for royal palace" },
    year: "2017",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **قصر الأمير عبدالعزيز بن مشعل آل سعود** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع حساسية عالية للحركة/التشققات. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Prince Abdulaziz bin Mishaal Palace** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under high sensitivity to movement. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن دمك مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر متابعة جسور الشروخ، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using compaction grouting with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via monitoring settlement points, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "solar-energy-project-al-aflaj",
    serviceKey: "grouting",
    title: { ar: "\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u0634\u0645\u0633\u064a\u0629 - \u0627\u0644\u0623\u0641\u0644\u0627\u062c", en: "Solar Energy Project - Al-Aflaj" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u0627\u0644\u062c\u0647\u0627\u0632", en: "Al-Jehaz Company" },
    location: { ar: "\u0627\u0644\u0623\u0641\u0644\u0627\u062c", en: "Al-Aflaj" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u062a\u062b\u0628\u064a\u062a \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u0642\u0648\u064a\u062a\u0647\u0627 \u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u0634\u0645\u0633\u064a\u0629", en: "Soil stabilization and strengthening for solar energy project" },
    year: "2018",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **مشروع الطاقة الشمسية - الأفلاج** في **الأفلاج** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع نافذة زمنية ضيقة للتنفيذ. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Solar Energy Project - Al-Aflaj** project in **Al-Aflaj** required a controlled field intervention due to ground-related risk indicators, under aggressive schedule window. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن نفاذ مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر منطقة تجريبية وتحليل منحنى الامتصاص، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using microfine cement injection with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via monitoring settlement points, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "al-fakhiriya-mosque",
    serviceKey: "grouting",
    title: { ar: "\u0645\u0633\u062c\u062f \u0627\u0644\u0641\u0627\u062e\u0631\u064a\u0629", en: "Al-Fakhiriya Mosque" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u0627\u062a\u062d\u0627\u062f \u0627\u0644\u0628\u0648\u0627\u0646\u064a", en: "Ittihad Al-Bawani Company" },
    location: { ar: "\u0627\u0644\u062f\u0645\u0627\u0645", en: "Dammam" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0643\u0634\u0641 \u0627\u0644\u062a\u0643\u0647\u0641\u0627\u062a \u0648\u0645\u0639\u0627\u0644\u062c\u062a\u0647\u0627 \u062a\u062d\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a", en: "Cavity detection and void treatment under foundations" },
    year: "2018",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **مسجد الفاخرية** في **الدمام** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع حساسية عالية للحركة/التشققات. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Al-Fakhiriya Mosque** project in **Dammam** required a controlled field intervention due to ground-related risk indicators, under high sensitivity to movement. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن مرحلي باستخدام باكر مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر منطقة تجريبية وتحليل منحنى الامتصاص، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using compaction grouting with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via crack gauge tracking, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "bank-albilad",
    serviceKey: "grouting",
    title: { ar: "\u0628\u0646\u0643 \u0627\u0644\u0628\u0644\u0627\u062f", en: "Bank AlBilad" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0627\u0644\u0645\u062d\u062f\u0648\u062f\u0629 - \u0633\u0641\u0643\u0648", en: "SAFCO - Soil & Foundation Company" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u062a\u0642\u0648\u064a\u0629 \u0648\u062a\u062f\u0639\u064a\u0645 \u0623\u0633\u0627\u0633\u0627\u062a \u0645\u0628\u0646\u0649 \u0628\u0646\u0643 \u0627\u0644\u0628\u0644\u0627\u062f", en: "Strengthening and reinforcement of Bank AlBilad building foundations" },
    year: "2019",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **بنك البلاد** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع قيود وصول وموقع عامل. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Bank AlBilad** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under tight access and live facility constraints. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن نفاذ مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر منطقة تجريبية وتحليل منحنى الامتصاص، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using microfine cement injection with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via crack gauge tracking, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "rainwater-drainage-networks",
    serviceKey: "grouting",
    title: { ar: "\u0634\u0628\u0643\u0627\u062a \u062a\u0635\u0631\u064a\u0641 \u0645\u064a\u0627\u0647 \u0627\u0644\u0623\u0645\u0637\u0627\u0631", en: "Rainwater Drainage Networks" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u064a\u0648\u0643\u0633\u0627\u0644 \u0625\u0646\u0634\u0627\u0621\u0627\u062a \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629", en: "Yuksel Construction Saudi Arabia" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u062b\u0628\u064a\u062a\u0647\u0627 \u0644\u0634\u0628\u0643\u0627\u062a \u062a\u0635\u0631\u064a\u0641 \u0645\u064a\u0627\u0647 \u0627\u0644\u0623\u0645\u0637\u0627\u0631", en: "Soil grouting and stabilization for rainwater drainage networks" },
    year: "2021",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **شبكات تصريف مياه الأمطار** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع حساسية عالية للحركة/التشققات. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Rainwater Drainage Networks** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under high sensitivity to movement. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن نفاذ مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر منطقة تجريبية وتحليل منحنى الامتصاص، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using stage grouting with packers with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via post-grout probe checks, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "king-salman-park",
    serviceKey: "grouting",
    title: { ar: "\u062d\u062f\u0627\u0626\u0642 \u0627\u0644\u0645\u0644\u0643 \u0633\u0644\u0645\u0627\u0646", en: "King Salman Park" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u0641\u0631\u0633\u064a\u0646\u064a\u0647", en: "Freyssinet Company" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0623\u0639\u0645\u0627\u0644 \u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0627\u0644\u0634\u0627\u0645\u0644\u0629 \u0644\u0645\u0634\u0631\u0648\u0639 \u062d\u062f\u0627\u0626\u0642 \u0627\u0644\u0645\u0644\u0643 \u0633\u0644\u0645\u0627\u0646", en: "Comprehensive soil grouting works for King Salman Park project" },
    year: "2022",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **حدائق الملك سلمان** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع وجود خدمات/مرافق تحت الأرض. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **King Salman Park** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under presence of buried utilities and services. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن نفاذ مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر فحوص تحقق بعد الحقن، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using permeation grouting with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via crack gauge tracking, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "boulevard-world",
    serviceKey: "grouting",
    title: { ar: "\u0628\u0648\u0644\u064a\u0641\u0627\u0631\u062f \u0627\u0644\u0639\u0627\u0644\u0645", en: "Boulevard World" },
    client: { ar: "\u0645\u0624\u0633\u0633\u0629 \u062a\u0644\u064a\u062f \u0627\u0644\u062e\u0644\u064a\u062c\u064a\u0629 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062a", en: "Taleed Al-Khaleejiya Contracting" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u062a\u0634\u0642\u0642\u0627\u062a \u0648\u062a\u0642\u0648\u064a\u0629 \u0627\u0644\u0647\u064a\u0627\u0643\u0644 \u0627\u0644\u0625\u0646\u0634\u0627\u0626\u064a\u0629", en: "Crack treatment and structural reinforcement" },
    year: "2022",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **بوليفارد العالم** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع حساسية عالية للحركة/التشققات. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Boulevard World** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under high sensitivity to movement. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن نفاذ مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر متابعة جسور الشروخ، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using microfine cement injection with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via crack gauge tracking, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "noon-warehouses",
    serviceKey: "grouting",
    title: { ar: "\u0645\u0633\u062a\u0648\u062f\u0639\u0627\u062a \u0646\u0648\u0646", en: "Noon Warehouses" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u0623\u0645\u0627\u0646\u0629", en: "Amanah Company" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u062b\u0628\u064a\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0644\u0645\u0633\u062a\u0648\u062f\u0639\u0627\u062a \u0646\u0648\u0646", en: "Soil grouting and foundation stabilization for Noon warehouses" },
    year: "2023",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **مستودعات نون** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع وجود خدمات/مرافق تحت الأرض. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Noon Warehouses** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under presence of buried utilities and services. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن نفاذ مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر مراقبة نقاط الهبوط، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using compaction grouting with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via crack gauge tracking, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "saraya-al-narjis",
    serviceKey: "grouting",
    title: { ar: "\u0633\u0631\u0627\u064a\u0627 \u0627\u0644\u0646\u0631\u062c\u0633", en: "Saraya Al-Narjis" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u062f\u0627\u0631 \u0648\u0625\u0639\u0645\u0627\u0631 \u0644\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0648\u0627\u0644\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0639\u0642\u0627\u0631\u064a", en: "Dar & Emaar Investment & Real Estate Development" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0643\u0634\u0641 \u0627\u0644\u062a\u0643\u0647\u0641\u0627\u062a \u0648\u0645\u0639\u0627\u0644\u062c\u062a\u0647\u0627 \u0644\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0633\u0643\u0646\u064a", en: "Cavity detection and void treatment for residential project" },
    year: "2023",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **سرايا النرجس** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع حساسية عالية للحركة/التشققات. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Saraya Al-Narjis** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under high sensitivity to movement. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن مرحلي باستخدام باكر مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر مراقبة نقاط الهبوط، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using microfine cement injection with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via trial holes and take trend analysis, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "rakeen-tower",
    serviceKey: "grouting",
    title: { ar: "\u0628\u0631\u062c \u0631\u0643\u064a\u0646", en: "Rakeen Tower" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u0631\u0643\u064a\u0646 \u0627\u0644\u0639\u0642\u0627\u0631\u064a\u0629", en: "Rakeen Real Estate Company" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u062a\u0642\u0648\u064a\u0629 \u0623\u0633\u0627\u0633\u0627\u062a \u0628\u0631\u062c \u0631\u0643\u064a\u0646 \u0627\u0644\u0633\u0643\u0646\u064a", en: "Foundation strengthening for Rakeen residential tower" },
    year: "2023",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **برج ركين** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع حساسية عالية للحركة/التشققات. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Rakeen Tower** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under high sensitivity to movement. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن دمك مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر منطقة تجريبية وتحليل منحنى الامتصاص، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using stage grouting with packers with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via monitoring settlement points, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "prince-saud-bin-faisal-palace",
    serviceKey: "grouting",
    title: { ar: "\u0642\u0635\u0631 \u0627\u0644\u0623\u0645\u064a\u0631 \u0633\u0639\u0648\u062f \u0628\u0646 \u0641\u064a\u0635\u0644 \u0622\u0644 \u0633\u0639\u0648\u062f", en: "Prince Saud bin Faisal Palace" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u0646\u0638\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062a", en: "Nuzum Contracting Company" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0628\u0648\u0637 \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0648\u0625\u0635\u0644\u0627\u062d \u0627\u0644\u062a\u0634\u0642\u0642\u0627\u062a", en: "Foundation settlement treatment and crack repair" },
    year: "2023",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **قصر الأمير سعود بن فيصل آل سعود** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع نافذة زمنية ضيقة للتنفيذ. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Prince Saud bin Faisal Palace** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under aggressive schedule window. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن نفاذ مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر متابعة جسور الشروخ، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using microfine cement injection with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via post-grout probe checks, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "sameem-tower",
    serviceKey: "grouting",
    title: { ar: "\u0628\u0631\u062c \u0635\u0645\u064a\u0645", en: "Sameem Tower" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u0635\u0645\u064a\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064a\u0629", en: "Sameem Real Estate Company" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0623\u0639\u0645\u0627\u0644 \u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0627\u0644\u0634\u0627\u0645\u0644\u0629 \u0644\u0628\u0631\u062c \u0635\u0645\u064a\u0645", en: "Comprehensive soil grouting works for Sameem Tower" },
    year: "2023",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **برج صميم** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع وجود خدمات/مرافق تحت الأرض. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Sameem Tower** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under presence of buried utilities and services. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن مرحلي باستخدام باكر مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر متابعة جسور الشروخ، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using permeation grouting with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via trial holes and take trend analysis, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "al-maarefa-private-school",
    serviceKey: "grouting",
    title: { ar: "\u0645\u062f\u0631\u0633\u0629 \u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u062e\u0627\u0635\u0629", en: "Al-Maarefa Private School" },
    client: { ar: "\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u062e\u0627\u0635\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064a\u0629 \u0644\u0644\u062a\u0639\u0644\u064a\u0645", en: "Al-Maarefa International Education Company" },
    location: { ar: "\u0627\u0644\u062f\u0645\u0627\u0645", en: "Dammam" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u062a\u0634\u0642\u0642\u0627\u062a \u0648\u062a\u0642\u0648\u064a\u0629 \u0627\u0644\u0647\u064a\u0627\u0643\u0644 \u0627\u0644\u0625\u0646\u0634\u0627\u0626\u064a\u0629 \u0644\u0644\u0645\u062f\u0631\u0633\u0629", en: "Crack treatment and structural reinforcement for school" },
    year: "2023",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **مدرسة المعرفة الخاصة** في **الدمام** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع وجود خدمات/مرافق تحت الأرض. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Al-Maarefa Private School** project in **Dammam** required a controlled field intervention due to ground-related risk indicators, under presence of buried utilities and services. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على ميكرو-أسمنت للترب الدقيقة مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر منطقة تجريبية وتحليل منحنى الامتصاص، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using permeation grouting with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via monitoring settlement points, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "residential-villas-complex-khobar",
    serviceKey: "grouting",
    title: { ar: "\u0645\u062c\u0645\u0639 \u0641\u0644\u0644 \u0633\u0643\u0646\u064a\u0629 \u0628\u0627\u0644\u062e\u0628\u0631", en: "Residential Villas Complex - Khobar" },
    client: { ar: "\u0645\u0624\u0633\u0633\u0629 \u0646\u0627\u064a\u0641 \u0639\u0628\u062f\u0627\u0644\u0644\u0647 \u0645\u062d\u0645\u062f \u0627\u0644\u0639\u062a\u064a\u0628\u064a \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062a \u0627\u0644\u0639\u0627\u0645\u0629", en: "Naif Abdullah Al-Otaibi General Contracting" },
    location: { ar: "\u0627\u0644\u062e\u0628\u0631", en: "Khobar" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u062b\u0628\u064a\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0644\u0645\u062c\u0645\u0639 \u0627\u0644\u0641\u0644\u0644", en: "Soil grouting and foundation stabilization for villas complex" },
    year: "2023",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **مجمع فلل سكنية بالخبر** في **الخبر** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع حساسية عالية للحركة/التشققات. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Residential Villas Complex - Khobar** project in **Khobar** required a controlled field intervention due to ground-related risk indicators, under high sensitivity to movement. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على ميكرو-أسمنت للترب الدقيقة مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر منطقة تجريبية وتحليل منحنى الامتصاص، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using stage grouting with packers with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via crack gauge tracking, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "obeikan-hills",
    serviceKey: "grouting",
    title: { ar: "\u0627\u0644\u0639\u0628\u064a\u0643\u0627\u0646 \u0647\u064a\u0644\u0632", en: "Obeikan Hills" },
    client: { ar: "\u0627\u0644\u0639\u0628\u064a\u0643\u0627\u0646 \u0627\u0644\u0642\u0627\u0628\u0636\u0629", en: "Obeikan Holding" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0645\u0634\u0631\u0648\u0639 \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0645\u0631\u0627\u062d\u0644 \u0644\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u062b\u0628\u064a\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a", en: "Multi-phase soil grouting and foundation stabilization project" },
    year: "2023-2024",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **العبيكان هيلز** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع حساسية عالية للحركة/التشققات. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Obeikan Hills** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under high sensitivity to movement. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن دمك مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر متابعة جسور الشروخ، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using permeation grouting with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via crack gauge tracking, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "al-maali-national-school",
    serviceKey: "grouting",
    title: { ar: "\u0645\u062f\u0631\u0633\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u064a \u0627\u0644\u0623\u0647\u0644\u064a\u0629", en: "Al-Maali National School" },
    client: { ar: "\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0644\u0644\u0637\u0627\u0642\u0629 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062a", en: "Arab Company for Energy & Contracting" },
    location: { ar: "\u0627\u0644\u0631\u064a\u0627\u0636", en: "Riyadh" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0628\u0648\u0637 \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0644\u0644\u0645\u062f\u0631\u0633\u0629", en: "Foundation settlement treatment for school" },
    year: "2024",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **مدرسة المعالي الأهلية** في **الرياض** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع وجود خدمات/مرافق تحت الأرض. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Al-Maali National School** project in **Riyadh** required a controlled field intervention due to ground-related risk indicators, under presence of buried utilities and services. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن دمك مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر متابعة جسور الشروخ، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using permeation grouting with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via crack gauge tracking, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "al-raie-juice-dairy-factory",
    serviceKey: "grouting",
    title: { ar: "\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u064a \u0644\u0644\u0639\u0635\u0627\u0626\u0631 \u0648\u0627\u0644\u0623\u0644\u0628\u0627\u0646", en: "Al-Raie Juice & Dairy Factory" },
    client: { ar: "\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u064a \u0644\u0644\u0639\u0635\u0627\u0626\u0631 \u0648\u0627\u0644\u0623\u0644\u0628\u0627\u0646", en: "Al-Raie Juice & Dairy Factory" },
    location: { ar: "\u0627\u0644\u0623\u062d\u0633\u0627\u0621", en: "Al-Ahsa" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u0642\u0648\u064a\u062a\u0647\u0627 \u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u064a", en: "Soil grouting and strengthening for Al-Raie factory" },
    year: "2024",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **مصنع الري للعصائر والألبان** في **الأحساء** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع وجود خدمات/مرافق تحت الأرض. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Al-Raie Juice & Dairy Factory** project in **Al-Ahsa** required a controlled field intervention due to ground-related risk indicators, under presence of buried utilities and services. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن نفاذ مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر منطقة تجريبية وتحليل منحنى الامتصاص، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using permeation grouting with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via crack gauge tracking, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
  {
    slug: "aramco-stadium",
    serviceKey: "grouting",
    title: { ar: "\u0633\u062a\u0627\u062f \u0623\u0631\u0627\u0645\u0643\u0648", en: "Aramco Stadium" },
    client: { ar: "\u0623\u0631\u0627\u0645\u0643\u0648 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629 / \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0644\u0644\u0645\u062e\u062a\u0628\u0631\u0627\u062a \u0648\u0627\u0644\u062a\u0631\u0628\u0629 / \u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0633\u064a\u0633 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062a", en: "Saudi Aramco / Arab Lab & Soil / Al-Asees Contracting" },
    location: { ar: "\u0627\u0644\u062f\u0645\u0627\u0645", en: "Dammam" },
    categoryLabel: { ar: "\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629", en: "Soil Grouting" },
    summary: { ar: "\u0643\u0634\u0641 \u0627\u0644\u062a\u0643\u0647\u0641\u0627\u062a \u0648\u0645\u0639\u0627\u0644\u062c\u062a\u0647\u0627 \u0644\u0633\u062a\u0627\u062f \u0623\u0631\u0627\u0645\u0643\u0648", en: "Cavity detection and void treatment for Aramco Stadium" },
    year: "2024",
    
    caseStudy: {
      challenge: { ar: "تطلب مشروع **ستاد أرامكو** في **الدمام** معالجة ميدانية دقيقة بسبب مؤشرات عدم استقرار/مخاطر مرتبطة بالأرض، مع نافذة زمنية ضيقة للتنفيذ. الهدف كان تقليل المخاطر ورفع مستوى الثقة قبل استمرار التشغيل/التسليم.", en: "The **Aramco Stadium** project in **Dammam** required a controlled field intervention due to ground-related risk indicators, under aggressive schedule window. The goal was to reduce risk and restore confidence before continued operation/hand‑over." },
      approach: {
        ar: ["مراجعة المعطيات المتاحة (تقرير تربة/مخططات/صور) وتحديد منطقة التأثر وأولويات التدخل.", "تصميم مسار عمل مرحلي يعتمد على حقن مرحلي باستخدام باكر مع حدود توقف ضغط/حجم وتخطيط نقاط التنفيذ.", "تنفيذ الأعمال بإجراءات سلامة ومراقبة مستمرة، مع توثيق PFVT/سجلات الحفر حسب طبيعة الخدمة.", "تحقق أثناء وبعد التنفيذ عبر متابعة جسور الشروخ، ثم تحديث الخطة حسب الاستجابة الفعلية للموقع."],
        en: ["Reviewed available information (soil reports, drawings, photos) and defined the influence zone and priorities.", "Developed a staged methodology using compaction grouting with clear pressure/volume envelopes and point layout.", "Executed under safety controls and continuous monitoring, documenting PFVT/borehole records as applicable.", "Verified during and after execution via monitoring settlement points, then refined the plan based on measured site response."],
      },
      deliverables: {
        ar: ["خطة تنفيذ مرحلية موثقة (نقاط/أعماق/تسلسل) مع منهجية ضبط جودة QA/QC.", "سجلات ميدانية تفصيلية (حفر/حقن/مسح) + مخطط as-built لمناطق المعالجة.", "ملخص فني يوضح المؤشرات قبل/بعد وحدود القبول ومناطق المتابعة.", "توصيات متابعة تشغيلية (Monitoring) وخطوات احترازية إذا ظهرت مؤشرات مستقبلية."],
        en: ["Documented staged execution plan (points/depths/sequence) with QA/QC methodology.", "Detailed field logs (drilling/injection/surveys) plus an as‑built map of treated areas.", "Technical summary showing before/after indicators, acceptance envelopes, and monitoring zones.", "Operational monitoring recommendations and contingency steps for future indicators."],
      },
      outcome: { ar: "أظهرت القراءات الميدانية استقرارًا تدريجيًا ضمن حدود القبول المتفق عليها، مع تقليل احتمالية الهبوط/التشققات في المناطق المعالجة، وتوفير توثيق فني يدعم قرارات التشغيل والمتابعة.", en: "Field readings indicated progressive stabilization within agreed acceptance envelopes, reducing the likelihood of settlement/cracking in treated areas and providing documentation to support operations and follow‑up decisions." },
    },
  },
];
