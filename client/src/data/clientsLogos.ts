/* Auto-generated mapping for client logos */

export type ClientLogo = {
  name: { ar: string; en: string };
  fileName: string; // stored in /public/media/clients
  /** Render with dark background for transparent/light logos */
  darkBg?: boolean;
};

export const clientLogos: ClientLogo[] = [
  { name: { ar: "أرامكو السعودية", en: "Saudi Aramco" }, fileName: "أرامكو السعودية.webp", darkBg: true },
  { name: { ar: "الشركة العربية للمختبرات والتربة", en: "Arab Lab & Soil" }, fileName: "الشركة العربية للمختبرات والتربة.png" },
  { name: { ar: "العبيكان القابضة", en: "Obeikan Holding" }, fileName: "العبيكان القابضة.jpg" },
  { name: { ar: "شركة اتحاد البواني", en: "Ittihad Al-Bawani Company" }, fileName: "شركة اتحاد البواني.png" },
  { name: { ar: "شركة التربة والأساسات المحدودة - سفكو", en: "SAFCO - Soil & Foundation Company" }, fileName: "شركة التربة والأساسات المحدودة - سفكو.png" },
  { name: { ar: "شركة العسيس للمقاولات", en: "Al-Asees Contracting" }, fileName: "شركة العسيس للمقاولات.png", darkBg: true },
  { name: { ar: "شركة دار وإعمار للاستثمار والتطوير العقاري", en: "Dar & Emaar Investment & Real Estate Development" }, fileName: "شركة دار وإعمار للاستثمار والتطوير العقاري.svg", darkBg: true },
  { name: { ar: "شركة ركين العقارية", en: "Rakeen Real Estate Company" }, fileName: "شركة ركين العقارية.png", darkBg: true },
  { name: { ar: "شركة فاست", en: "FAST Company" }, fileName: "شركة فاست.jpg" },
  { name: { ar: "شركة فرسينيه", en: "Freyssinet Company" }, fileName: "شركة فرسينيه.jpg" },
  { name: { ar: "شركة يوكسال إنشاءات السعودية", en: "Yuksel Construction Saudi Arabia" }, fileName: "شركة يوكسال إنشاءات السعودية.svg", darkBg: true },
  { name: { ar: "مصنع الري للعصائر والألبان", en: "Al-Raie Juice & Dairy Factory" }, fileName: "مصنع الري للعصائر والألبان.png", darkBg: true },
];

// Return a logo entry for a client name (AR). Supports composite client strings separated by '/'.
export function getClientLogoByArName(clientAr: string | undefined | null): ClientLogo | undefined {
  if (!clientAr) return undefined;
  const parts = clientAr.split('/').map((p) => p.trim()).filter(Boolean);
  const candidates = parts.length ? parts : [clientAr.trim()];
  return clientLogos.find((l) => candidates.includes(l.name.ar));
}
