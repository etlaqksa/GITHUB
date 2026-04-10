import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// هذه الأسطر ضرورية في نظام ES Modules للتعرف على مسار الملف
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// مسار ملف المقالات الجديد
const newArticlesPath = path.join(__dirname, 'articles.ts');

// البحث عن ملف النسخة الاحتياطية لمعرفة الأسماء القديمة
let oldArticlesPath = path.join(__dirname, 'articles.backup_pre_rewrite.ts');
if (!fs.existsSync(oldArticlesPath)) {
    oldArticlesPath = path.join(__dirname, 'articles-backup.ts');
}

if (!fs.existsSync(oldArticlesPath) || !fs.existsSync(newArticlesPath)) {
    console.error("❌ عذراً! يرجى التأكد من وجود ملف articles.backup_pre_rewrite.ts أو articles-backup.ts بجوار السكربت.");
    process.exit(1);
}

const oldContent = fs.readFileSync(oldArticlesPath, 'utf8');
const newContent = fs.readFileSync(newArticlesPath, 'utf8');

// دالة ذكية لاستخراج الـ ID والـ Slug من الأكواد
function extractSlugs(content) {
    const regex = /id:\s*(\d+),[\s\S]*?slug:\s*["']([^"']+)["']/g;
    const map = {};
    let match;
    while ((match = regex.exec(content)) !== null) {
        map[match[1]] = match[2]; // id -> slug
    }
    return map;
}

const oldSlugs = extractSlugs(oldContent);
const newSlugs = extractSlugs(newContent);

// المسارات الأربعة للصور
const directories = [
    "C:\\Users\\moham\\Downloads\\GITHUB\\client\\public\\article-images\\card\\ar",
    "C:\\Users\\moham\\Downloads\\GITHUB\\client\\public\\article-images\\card\\en",
    "C:\\Users\\moham\\Downloads\\GITHUB\\client\\public\\article-images\\hero\\ar",
    "C:\\Users\\moham\\Downloads\\GITHUB\\client\\public\\article-images\\hero\\en"
];

console.log("⏳ جاري مطابقة الروابط وتغيير أسماء الصور...");
let renamedCount = 0;

// المرور على كل مجلد وتغيير أسماء الصور بداخله
directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        console.log(`⚠️ المجلد غير موجود، تأكد من المسار: ${dir}`);
        return;
    }

    console.log(`\n📂 جاري فحص المجلد: ${dir}`);

    for (const id in oldSlugs) {
        const oldSlug = oldSlugs[id];
        const newSlug = newSlugs[id];

        if (oldSlug && newSlug && oldSlug !== newSlug) {
            const oldImagePath = path.join(dir, `${oldSlug}.webp`);
            const newImagePath = path.join(dir, `${newSlug}.webp`);

            if (fs.existsSync(oldImagePath)) {
                fs.renameSync(oldImagePath, newImagePath);
                console.log(`✅ تم تعديل: ${oldSlug}.webp ---> ${newSlug}.webp`);
                renamedCount++;
            }
        }
    }
});

console.log(`\n🎉 اكتملت العملية بنجاح! تم تغيير اسم (${renamedCount}) صورة.`);