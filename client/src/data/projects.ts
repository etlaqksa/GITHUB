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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0645\u0634\u0631\u0648\u0639 \u0636\u062e\u0645 \u0644\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u062b\u0628\u064a\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u062a\u0631\u0648 \u0627\u0644\u0631\u064a\u0627\u0636.", en: "The project required a precise engineering intervention: Massive soil grouting and foundation stabilization project for Riyadh Metro." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0628\u0648\u0637 \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0648\u062a\u0642\u0648\u064a\u0629 \u0627\u0644\u062a\u0631\u0628\u0629 \u0644\u0642\u0635\u0631 \u0645\u0644\u0643\u064a.", en: "The project required a precise engineering intervention: Foundation settlement treatment and soil strengthening for royal palace." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u062a\u062b\u0628\u064a\u062a \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u0642\u0648\u064a\u062a\u0647\u0627 \u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u0634\u0645\u0633\u064a\u0629.", en: "The project required a precise engineering intervention: Soil stabilization and strengthening for solar energy project." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0643\u0634\u0641 \u0627\u0644\u062a\u0643\u0647\u0641\u0627\u062a \u0648\u0645\u0639\u0627\u0644\u062c\u062a\u0647\u0627 \u062a\u062d\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a.", en: "The project required a precise engineering intervention: Cavity detection and void treatment under foundations." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u062a\u0642\u0648\u064a\u0629 \u0648\u062a\u062f\u0639\u064a\u0645 \u0623\u0633\u0627\u0633\u0627\u062a \u0645\u0628\u0646\u0649 \u0628\u0646\u0643 \u0627\u0644\u0628\u0644\u0627\u062f.", en: "The project required a precise engineering intervention: Strengthening and reinforcement of Bank AlBilad building foundations." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u062b\u0628\u064a\u062a\u0647\u0627 \u0644\u0634\u0628\u0643\u0627\u062a \u062a\u0635\u0631\u064a\u0641 \u0645\u064a\u0627\u0647 \u0627\u0644\u0623\u0645\u0637\u0627\u0631.", en: "The project required a precise engineering intervention: Soil grouting and stabilization for rainwater drainage networks." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0623\u0639\u0645\u0627\u0644 \u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0627\u0644\u0634\u0627\u0645\u0644\u0629 \u0644\u0645\u0634\u0631\u0648\u0639 \u062d\u062f\u0627\u0626\u0642 \u0627\u0644\u0645\u0644\u0643 \u0633\u0644\u0645\u0627\u0646.", en: "The project required a precise engineering intervention: Comprehensive soil grouting works for King Salman Park project." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u062a\u0634\u0642\u0642\u0627\u062a \u0648\u062a\u0642\u0648\u064a\u0629 \u0627\u0644\u0647\u064a\u0627\u0643\u0644 \u0627\u0644\u0625\u0646\u0634\u0627\u0626\u064a\u0629.", en: "The project required a precise engineering intervention: Crack treatment and structural reinforcement." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u062b\u0628\u064a\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0644\u0645\u0633\u062a\u0648\u062f\u0639\u0627\u062a \u0646\u0648\u0646.", en: "The project required a precise engineering intervention: Soil grouting and foundation stabilization for Noon warehouses." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0643\u0634\u0641 \u0627\u0644\u062a\u0643\u0647\u0641\u0627\u062a \u0648\u0645\u0639\u0627\u0644\u062c\u062a\u0647\u0627 \u0644\u0644\u0645\u0634\u0631\u0648\u0639 \u0627\u0644\u0633\u0643\u0646\u064a.", en: "The project required a precise engineering intervention: Cavity detection and void treatment for residential project." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u062a\u0642\u0648\u064a\u0629 \u0623\u0633\u0627\u0633\u0627\u062a \u0628\u0631\u062c \u0631\u0643\u064a\u0646 \u0627\u0644\u0633\u0643\u0646\u064a.", en: "The project required a precise engineering intervention: Foundation strengthening for Rakeen residential tower." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0628\u0648\u0637 \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0648\u0625\u0635\u0644\u0627\u062d \u0627\u0644\u062a\u0634\u0642\u0642\u0627\u062a.", en: "The project required a precise engineering intervention: Foundation settlement treatment and crack repair." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0623\u0639\u0645\u0627\u0644 \u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0627\u0644\u0634\u0627\u0645\u0644\u0629 \u0644\u0628\u0631\u062c \u0635\u0645\u064a\u0645.", en: "The project required a precise engineering intervention: Comprehensive soil grouting works for Sameem Tower." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u062a\u0634\u0642\u0642\u0627\u062a \u0648\u062a\u0642\u0648\u064a\u0629 \u0627\u0644\u0647\u064a\u0627\u0643\u0644 \u0627\u0644\u0625\u0646\u0634\u0627\u0626\u064a\u0629 \u0644\u0644\u0645\u062f\u0631\u0633\u0629.", en: "The project required a precise engineering intervention: Crack treatment and structural reinforcement for school." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u062b\u0628\u064a\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0644\u0645\u062c\u0645\u0639 \u0627\u0644\u0641\u0644\u0644.", en: "The project required a precise engineering intervention: Soil grouting and foundation stabilization for villas complex." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0645\u0634\u0631\u0648\u0639 \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0645\u0631\u0627\u062d\u0644 \u0644\u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u062b\u0628\u064a\u062a \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a.", en: "The project required a precise engineering intervention: Multi-phase soil grouting and foundation stabilization project." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0628\u0648\u0637 \u0627\u0644\u0623\u0633\u0627\u0633\u0627\u062a \u0644\u0644\u0645\u062f\u0631\u0633\u0629.", en: "The project required a precise engineering intervention: Foundation settlement treatment for school." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u062d\u0642\u0646 \u0627\u0644\u062a\u0631\u0628\u0629 \u0648\u062a\u0642\u0648\u064a\u062a\u0647\u0627 \u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u0631\u064a.", en: "The project required a precise engineering intervention: Soil grouting and strengthening for Al-Raie factory." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
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
      challenge: { ar: "\u0627\u062d\u062a\u0627\u062c \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0625\u0644\u0649 \u0645\u0639\u0627\u0644\u062c\u0629 \u0647\u0646\u062f\u0633\u064a\u0629 \u062f\u0642\u064a\u0642\u0629: \u0643\u0634\u0641 \u0627\u0644\u062a\u0643\u0647\u0641\u0627\u062a \u0648\u0645\u0639\u0627\u0644\u062c\u062a\u0647\u0627 \u0644\u0633\u062a\u0627\u062f \u0623\u0631\u0627\u0645\u0643\u0648.", en: "The project required a precise engineering intervention: Cavity detection and void treatment for Aramco Stadium." },
      approach: {
        ar: ["معاينة الموقع وجمع المعطيات المتاحة لتحديد نطاق العمل المناسب.", "تصميم خطة تنفيذ مرحلية (نقاط/مناطق المعالجة) بما يتوافق مع طبيعة التربة ومتطلبات السلامة.", "تنفيذ الأعمال باستخدام معدات متخصصة مع توثيق الملاحظات الميدانية ومخرجات التنفيذ."],
        en: ["Site review and data collection to define an appropriate scope of work.", "Designing a staged execution plan aligned with soil conditions and safety requirements.", "Executing with specialized equipment while documenting field observations and outputs."],
      },
      deliverables: {
        ar: ["خطة تنفيذ ومتابعة ميدانية حسب طبيعة الموقع.", "تنفيذ أعمال الحقن/التثبيت باستخدام معدات متخصصة.", "تقرير فني يلخص الأعمال المنفذة والملاحظات والتوصيات."],
        en: ["Execution plan and on-site follow-up tailored to the site conditions.", "Grouting/stabilization works using specialized equipment.", "A technical report summarizing executed works, observations, and recommendations."],
      },
      outcome: { ar: "\u0627\u0644\u0645\u0633\u062a\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0631\u0641\u0639 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648\u062a\u0642\u0644\u064a\u0644 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0647\u0628\u0648\u0637 \u0628\u0645\u0627 \u064a\u062e\u062f\u0645 \u0627\u0633\u062a\u062f\u0627\u0645\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.", en: "The goal of the intervention is improved stability and reduced settlement risk to support long-term performance." },
    },
  },
];
