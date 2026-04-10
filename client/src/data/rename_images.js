import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// المسارات الأربعة لصورك
const directories = [
    "C:\\Users\\moham\\Downloads\\GITHUB\\client\\public\\article-images\\card\\ar",
    "C:\\Users\\moham\\Downloads\\GITHUB\\client\\public\\article-images\\card\\en",
    "C:\\Users\\moham\\Downloads\\GITHUB\\client\\public\\article-images\\hero\\ar",
    "C:\\Users\\moham\\Downloads\\GITHUB\\client\\public\\article-images\\hero\\en"
];

// خريطة سحرية تربط الاسم الفعلي الحالي للصورة (من صورتك المرفقة) برقم المقال مباشرة
const fileToIdMap = {
    "what-is-soil-grouting-a-practical-definition-linking-mechanism-to-engineering-decisions.webp": 1,
    "the-history-and-evolution-of-soil-grouting-in-civil-engineering.webp": 2,
    "ground-improvement-vs-soil-stabilization-whats-the-difference.webp": 3,
    "the-physics-of-grouting-how-grout-spreads-through-pores-and-fractures.webp": 4,
    "the-geotechnical-engineers-role-in-designing-grouting-programs.webp": 5,
    "essential-grouting-terminology-permeability-viscosity-pressure-and-flow.webp": 6,
    "when-is-grouting-the-best-solution-technical-and-economic-feasibility.webp": 7,
    "global-quality-standards-in-grouting-works-en-12715-and-astm.webp": 8,
    "remedial-vs-preventive-grouting-objectives-triggers-and-selection.webp": 9,
    "challenges-of-soil-grouting-in-desert-and-coastal-environments.webp": 10,
    "permeation-grouting-mechanism-and-applications.webp": 11,
    "compaction-grouting-when-and-how-to-use-it.webp": 12,
    "jet-grouting-from-jet-mechanics-to-column-properties.webp": 13,
    "fracture-grouting-controlling-uplift-and-ground-heave.webp": 14,
    "curtain-grouting-a-strategy-for-permeability-reduction-in-dams.webp": 15,
    "compensation-grouting-protecting-structures-during-tunneling-and-excavation.webp": 16,
    "void-filling-grouting-treating-cavities-and-hidden-voids.webp": 17,
    "chemical-grouting-resins-silicates-and-their-use-cases.webp": 18,
    "polyurethane-grouting-01.webp": 19,
    "microfine-cement-grouting-02.webp": 20,
    "under-raft-grouting-03.webp": 21,
    "grouting-in-fractured-rock-and-karst-04.webp": 22,
    "cement-grout-rheology-05.webp": 23,
    "how-the-water-to-cement-ratio-affects-strength-06.webp": 24,
    "chemical-admixtures-for-grout-07.webp": 25,
    "pozzolanic-materials-in-grout-mixes-08.webp": 26,
    "grout-bleeding-and-segregation-09.webp": 27,
    "sulfate-resistant-cement-10.webp": 28,
    "eco-friendly-grouting-materials-11.webp": 29,
    "laboratory-testing-of-grouting-materials-12.webp": 30,
    "grout-stability-13.webp": 31,
    "selecting-grout-type-using-soil-gradation-14.webp": 32,
    "back-of-envelope-grout-spread-calculations-15.webp": 33,
    "differential-settlement-16.webp": 34,
    "crack-pattern-interpretation-17.webp": 35,
    "how-water-leaks-from-tanks-and-18.webp": 36,
    "expansive-soils-19.webp": 37,
    "collapsible-soils-20.webp": 38,
    "voids-beneath-floor-slabs-21.webp": 39,
    "impact-of-nearby-construction-on-existing-22.webp": 40,
    "natural-sinkholes-23.webp": 41,
    "how-moisture-changes-the-behavior-of-24.webp": 42,
    "void-detection-methods-compared-25.webp": 43,
    "ground-penetrating-radar-gpr-26.webp": 44,
    "electrical-resistivity-tomography-ert-27.webp": 45,
    "microgravity-surveys-28.webp": 46,
    "seismic-surveys-29.webp": 47,
    "integrating-geophysical-and-geotechnical-data-for-30.webp": 48,
    "accuracy-limits-in-geophysical-instruments-31.webp": 49,
    "post-survey-verification-boreholes-32.webp": 50,
    "borehole-cameras-33.webp": 51,
    "interpreting-anomalies-in-survey-reports-34.webp": 52,
    "grouting-equipment-35.webp": 53,
    "designing-an-injection-grid-36.webp": 54,
    "monitoring-injection-pressure-37.webp": 55,
    "flow-rate-measurement-38.webp": 56,
    "refusal-criteria-in-grouting-39.webp": 57,
    "why-grouting-logs-matter-40.webp": 58,
    "site-safety-in-grouting-works-41.webp": 59,
    "site-management-42.webp": 60,
    "common-execution-mistakes-in-grouting-43.webp": 61,
    "maintaining-grouting-equipment-44.webp": 62,
    "underpinning-options-45.webp": 63,
    "epoxy-injection-for-structural-cracks-46.webp": 64,
    "cfrp-strengthening-alongside-soil-grouting-47.webp": 65,
    "settlement-remediation-48.webp": 66,
    "protecting-heritage-structures-with-micro-grouting-techniques-49.webp": 67,
    "ground-improvement-under-roads-and-runways-50.webp": 68,
    "grouting-for-highrise-towers-and-heavyload-buildings-key-considerations.webp": 69,
    "releveling-tilted-structures-using-grouting-techniques.webp": 70,
    "how-to-read-a-geotechnical-investigation-report-from-tables-to-design-risks.webp": 71,
    "sensitivity-analysis-for-grouting-decisions-which-variable-changes-the-answer-most.webp": 72,
    "the-future-of-soil-grouting-ai-sensors-and-remote-monitoring.webp": 73,
    "case-study-treating-a-large-cavity-beneath-a-residential-arealessons-learned.webp": 74,
    "case-study-stopping-groundwater-leakage-in-a-commercial-basement.webp": 75,
    "why-periodic-building-inspections-matter-early-signs-that-prevent-failures.webp": 76,
    "owners-guide-how-to-choose-a-specialized-grouting-contractor.webp": 77,
    "conclusion-grouting-as-a-discipline-bridging-field-experience-and-engineering-theory.webp": 78,
    "cfrp-soil-grouting-framework.webp": 79,
    "cfrp-soil-grouting-materials-standards.webp": 80
};

// قراءة ملف المقالات لاستخراج الروابط الجديدة
const articlesPath = path.join(__dirname, 'articles.ts');
if (!fs.existsSync(articlesPath)) {
    console.error("❌ عذراً! يرجى التأكد من وجود ملف articles.ts بجوار السكربت.");
    process.exit(1);
}

const content = fs.readFileSync(articlesPath, 'utf8');
const idToNewSlug = {};

// استخراج المعرف (ID) والـ slug الجديد الخاص به
const regex = /id:\s*(\d+),[\s\S]*?slug:\s*["']([^"']+)["']/g;
let match;
while ((match = regex.exec(content)) !== null) {
    idToNewSlug[match[1]] = match[2];
}

console.log("⏳ جاري مطابقة وتغيير أسماء الصور للروابط الجديدة...");
let renamedCount = 0;

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        console.log(`⚠️ المجلد غير موجود، تأكد من المسار: ${dir}`);
        return;
    }

    console.log(`\n📂 جاري فحص المجلد: ${dir}`);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));

    files.forEach(file => {
        // معرفة رقم المقال المرتبط بهذه الصورة من الخريطة
        const articleId = fileToIdMap[file];
        
        if (articleId) {
            // جلب الرابط الجديد لهذا المقال
            const newSlug = idToNewSlug[articleId];
            
            if (newSlug) {
                const newFileName = `${newSlug}.webp`;
                
                // إذا كان الاسم مختلفاً، قم بتغييره
                if (file !== newFileName) {
                    const oldPath = path.join(dir, file);
                    const newPath = path.join(dir, newFileName);
                    fs.renameSync(oldPath, newPath);
                    console.log(`✅ تم تعديل: ${file} ---> ${newFileName}`);
                    renamedCount++;
                }
            }
        }
    });
});

console.log(`\n🎉 اكتملت العملية بنجاح! تم تغيير اسم (${renamedCount}) صورة.`);