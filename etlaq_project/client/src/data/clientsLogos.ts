/* Auto-generated mapping for client logos */

export type ClientLogo = {
  name: { ar: string; en: string };
  fileName: string; // stored in /public/media/clients
};

export const clientLogos: ClientLogo[] = [
  { name: { ar: "أرامكو السعودية", en: "Saudi Aramco" }, fileName: "saudi-aramco.webp" },
  { name: { ar: "الشركة العربية للمختبرات والتربة", en: "Arab Lab & Soil" }, fileName: "arab-lab-and-soil.webp" },
  { name: { ar: "العبيكان القابضة", en: "Obeikan Holding" }, fileName: "obeikan-holding.webp" },
  { name: { ar: "شركة اتحاد البواني", en: "Ittihad Al-Bawani Company" }, fileName: "ittihad-al-bawani-company.webp" },
  { name: { ar: "شركة التربة والأساسات المحدودة - سفكو", en: "SAFCO - Soil & Foundation Company" }, fileName: "safco-soil-and-foundation-company.webp" },
  { name: { ar: "شركة العسيس للمقاولات", en: "Al-Asees Contracting" }, fileName: "al-asees-contracting.webp" },
  { name: { ar: "شركة الجهاز", en: "Al-Jehaz Company" }, fileName: "al-jehaz-company.webp" },
  { name: { ar: "شركة سميم العقارية", en: "Sameem Real Estate Company" }, fileName: "sameem-real-estate-company.webp" },
  { name: { ar: "شركة ملاز الريادة", en: "Malaz Al Reyadah" }, fileName: "malaz-al-reyadah.webp" },
  { name: { ar: "شركة دار وإعمار للاستثمار والتطوير العقاري", en: "Dar & Emaar Investment & Real Estate Development" }, fileName: "dar-and-emaar-investment-and-real-estate-development.webp" },
  { name: { ar: "شركة ركين العقارية", en: "Rakeen Real Estate Company" }, fileName: "rakeen-real-estate-company.webp" },
  { name: { ar: "شركة فاست", en: "FAST Company" }, fileName: "fast-company.webp" },
  { name: { ar: "شركة فرسينيه", en: "Freyssinet Company" }, fileName: "freyssinet-company.webp" },
  { name: { ar: "شركة يوكسال إنشاءات السعودية", en: "Yuksel Construction Saudi Arabia" }, fileName: "yuksel-construction-saudi-arabia.webp" },
  { name: { ar: "مصنع الري للعصائر والألبان", en: "Al-Raie Juice & Dairy Factory" }, fileName: "al-raie-juice-and-dairy-factory.webp" },
];

// Return a logo entry for a client name (AR). Supports composite client strings separated by '/'.
export function getClientLogoByArName(clientAr: string | undefined | null): ClientLogo | undefined {
  if (!clientAr) return undefined;
  const parts = clientAr.split('/').map((p) => p.trim()).filter(Boolean);
  const candidates = parts.length ? parts : [clientAr.trim()];
  return clientLogos.find((l) => candidates.includes(l.name.ar));
}
