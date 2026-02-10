/* Auto-generated mapping for client logos */

export type ClientLogo = {
  name: { ar: string; en: string };
  fileName: string; // stored in /public/media/clients
};

export const clientLogos: ClientLogo[] = [
  { name: { ar: "أرامكو السعودية", en: "Saudi Aramco" }, fileName: "saudi-aramco.webp" },
  { name: { ar: "الشركة العربية للمختبرات والتربة", en: "Arab Lab & Soil" }, fileName: "arab-lab-and-soil.png" },
  { name: { ar: "العبيكان القابضة", en: "Obeikan Holding" }, fileName: "obeikan-holding.jpg" },
  { name: { ar: "شركة اتحاد البواني", en: "Ittihad Al-Bawani Company" }, fileName: "ittihad-al-bawani-company.png" },
  { name: { ar: "شركة التربة والأساسات المحدودة - سفكو", en: "SAFCO - Soil & Foundation Company" }, fileName: "safco-soil-and-foundation-company.png" },
  { name: { ar: "شركة العسيس للمقاولات", en: "Al-Asees Contracting" }, fileName: "al-asees-contracting.png" },
  { name: { ar: "شركة دار وإعمار للاستثمار والتطوير العقاري", en: "Dar & Emaar Investment & Real Estate Development" }, fileName: "dar-and-emaar-investment-and-real-estate-development.svg" },
  { name: { ar: "شركة ركين العقارية", en: "Rakeen Real Estate Company" }, fileName: "rakeen-real-estate-company.png" },
  { name: { ar: "شركة فاست", en: "FAST Company" }, fileName: "fast-company.jpg" },
  { name: { ar: "شركة فرسينيه", en: "Freyssinet Company" }, fileName: "freyssinet-company.jpg" },
  { name: { ar: "شركة يوكسال إنشاءات السعودية", en: "Yuksel Construction Saudi Arabia" }, fileName: "yuksel-construction-saudi-arabia.svg" },
  { name: { ar: "مصنع الري للعصائر والألبان", en: "Al-Raie Juice & Dairy Factory" }, fileName: "al-raie-juice-and-dairy-factory.png" },
];

// Return a logo entry for a client name (AR). Supports composite client strings separated by '/'.
export function getClientLogoByArName(clientAr: string | undefined | null): ClientLogo | undefined {
  if (!clientAr) return undefined;
  const parts = clientAr.split('/').map((p) => p.trim()).filter(Boolean);
  const candidates = parts.length ? parts : [clientAr.trim()];
  return clientLogos.find((l) => candidates.includes(l.name.ar));
}
