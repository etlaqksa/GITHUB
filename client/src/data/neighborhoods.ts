import type { City } from '@/data/seoLocations';
import { slugifyAr, slugifyEn } from '@/lib/slugify';

export type Neighborhood = {
  /** canonical city.slug (English) */
  citySlug: string;
  ar: string;
  en: string;
  /** Arabic slug (e.g., حي-الربوة) */
  arSlug: string;
  /** English slug (e.g., al-rabwah) */
  slug: string;
};

/**
 * Riyadh neighborhoods (curated list).
 *
 * Notes:
 * - We keep these pages discoverable via internal links (City + Service pages) to avoid "orphan" doorway patterns.
 * - Content is generated with neighborhood-specific headings, FAQs and cross-links (see CityServiceNeighborhoodLanding).
 */
export const riyadhNeighborhoods: Neighborhood[] = [
  { citySlug: 'riyadh', ar: 'حي الياسمين', en: 'Al Yasmin', arSlug: slugifyAr('حي الياسمين'), slug: slugifyEn('al yasmin') },
  { citySlug: 'riyadh', ar: 'حي الملقا', en: 'Al Malqa', arSlug: slugifyAr('حي الملقا'), slug: slugifyEn('al malqa') },
  { citySlug: 'riyadh', ar: 'حي النرجس', en: 'An Narjis', arSlug: slugifyAr('حي النرجس'), slug: slugifyEn('an narjis') },
  { citySlug: 'riyadh', ar: 'حي الندى', en: 'An Nada', arSlug: slugifyAr('حي الندى'), slug: slugifyEn('an nada') },
  { citySlug: 'riyadh', ar: 'حي الصحافة', en: 'As Sahafah', arSlug: slugifyAr('حي الصحافة'), slug: slugifyEn('as sahafah') },
  { citySlug: 'riyadh', ar: 'حي العقيق', en: 'Al Aqiq', arSlug: slugifyAr('حي العقيق'), slug: slugifyEn('al aqiq') },
  { citySlug: 'riyadh', ar: 'حي حطين', en: 'Hittin', arSlug: slugifyAr('حي حطين'), slug: slugifyEn('hittin') },
  { citySlug: 'riyadh', ar: 'حي النخيل', en: 'An Nakheel', arSlug: slugifyAr('حي النخيل'), slug: slugifyEn('an nakheel') },
  { citySlug: 'riyadh', ar: 'حي العليا', en: 'Al Olaya', arSlug: slugifyAr('حي العليا'), slug: slugifyEn('al olaya') },
  { citySlug: 'riyadh', ar: 'حي السليمانية', en: 'As Sulaymaniyah', arSlug: slugifyAr('حي السليمانية'), slug: slugifyEn('as sulaymaniyah') },
  { citySlug: 'riyadh', ar: 'حي الملز', en: 'Al Malaz', arSlug: slugifyAr('حي الملز'), slug: slugifyEn('al malaz') },
  { citySlug: 'riyadh', ar: 'حي الربوة', en: 'Ar Rabwah', arSlug: slugifyAr('حي الربوة'), slug: slugifyEn('ar rabwah') },
  { citySlug: 'riyadh', ar: 'حي الروضة', en: 'Ar Rawdah', arSlug: slugifyAr('حي الروضة'), slug: slugifyEn('ar rawdah') },
  { citySlug: 'riyadh', ar: 'حي النهضة', en: 'An Nahdah', arSlug: slugifyAr('حي النهضة'), slug: slugifyEn('an nahdah') },
  { citySlug: 'riyadh', ar: 'حي اليرموك', en: 'Al Yarmuk', arSlug: slugifyAr('حي اليرموك'), slug: slugifyEn('al yarmuk') },
  { citySlug: 'riyadh', ar: 'حي النسيم', en: 'An Naseem', arSlug: slugifyAr('حي النسيم'), slug: slugifyEn('an naseem') },
  { citySlug: 'riyadh', ar: 'حي الشفا', en: 'Ash Shifa', arSlug: slugifyAr('حي الشفا'), slug: slugifyEn('ash shifa') },
  { citySlug: 'riyadh', ar: 'حي العزيزية', en: 'Al Aziziyah', arSlug: slugifyAr('حي العزيزية'), slug: slugifyEn('al aziziyah') },
  { citySlug: 'riyadh', ar: 'حي بدر', en: 'Badr', arSlug: slugifyAr('حي بدر'), slug: slugifyEn('badr') },
  { citySlug: 'riyadh', ar: 'حي السويدي', en: 'As Suwaidi', arSlug: slugifyAr('حي السويدي'), slug: slugifyEn('as suwaidi') },
  { citySlug: 'riyadh', ar: 'حي طويق', en: 'Tuwaiq', arSlug: slugifyAr('حي طويق'), slug: slugifyEn('tuwaiq') },
  { citySlug: 'riyadh', ar: 'حي لبن', en: 'Laban', arSlug: slugifyAr('حي لبن'), slug: slugifyEn('laban') },
  { citySlug: 'riyadh', ar: 'حي العريجاء', en: 'Al Uraija', arSlug: slugifyAr('حي العريجاء'), slug: slugifyEn('al uraija') },
  { citySlug: 'riyadh', ar: 'حي الحزم', en: 'Al Hazm', arSlug: slugifyAr('حي الحزم'), slug: slugifyEn('al hazm') },
  { citySlug: 'riyadh', ar: 'حي نمار', en: 'Namar', arSlug: slugifyAr('حي نمار'), slug: slugifyEn('namar') },
  { citySlug: 'riyadh', ar: 'حي المونسية', en: 'Al Munsiyah', arSlug: slugifyAr('حي المونسية'), slug: slugifyEn('al munsiyah') },
  { citySlug: 'riyadh', ar: 'حي الخليج', en: 'Al Khaleej', arSlug: slugifyAr('حي الخليج'), slug: slugifyEn('al khaleej') },
  { citySlug: 'riyadh', ar: 'حي الازدهار', en: 'Al Izdihar', arSlug: slugifyAr('حي الازدهار'), slug: slugifyEn('al izdihar') },
  { citySlug: 'riyadh', ar: 'حي الرائد', en: 'Ar Raid', arSlug: slugifyAr('حي الرائد'), slug: slugifyEn('ar raid') },
  { citySlug: 'riyadh', ar: 'حي المروج', en: 'Al Muruj', arSlug: slugifyAr('حي المروج'), slug: slugifyEn('al muruj') },
  { citySlug: 'riyadh', ar: 'حي الورود', en: 'Al Woroud', arSlug: slugifyAr('حي الورود'), slug: slugifyEn('al woroud') },
  { citySlug: 'riyadh', ar: 'حي الرحمانية', en: 'Ar Rahmaniyah', arSlug: slugifyAr('حي الرحمانية'), slug: slugifyEn('ar rahmaniyah') },
  { citySlug: 'riyadh', ar: 'حي الربيع', en: 'Ar Rabie', arSlug: slugifyAr('حي الربيع'), slug: slugifyEn('ar rabie') },
  { citySlug: 'riyadh', ar: 'حي القيروان', en: 'Al Qirawan', arSlug: slugifyAr('حي القيروان'), slug: slugifyEn('al qirawan') },
  { citySlug: 'riyadh', ar: 'حي المهدية', en: 'Al Mahdiyah', arSlug: slugifyAr('حي المهدية'), slug: slugifyEn('al mahdiyah') },
  { citySlug: 'riyadh', ar: 'حي ظهرة لبن', en: 'Dhahrat Laban', arSlug: slugifyAr('حي ظهرة لبن'), slug: slugifyEn('dhahrat laban') },
  { citySlug: 'riyadh', ar: 'حي الرمال', en: 'Ar Rimal', arSlug: slugifyAr('حي الرمال'), slug: slugifyEn('ar rimal') },
  { citySlug: 'riyadh', ar: 'حي قرطبة', en: 'Qurtubah', arSlug: slugifyAr('حي قرطبة'), slug: slugifyEn('qurtubah') },
  { citySlug: 'riyadh', ar: 'حي غرناطة', en: 'Ghirnatah', arSlug: slugifyAr('حي غرناطة'), slug: slugifyEn('ghirnatah') },
];

export function listNeighborhoodsForCity(city: City | null | undefined): Neighborhood[] {
  if (!city) return [];
  if (city.slug === 'riyadh') return riyadhNeighborhoods;
  return [];
}

export function getNeighborhoodSlug(n: Neighborhood, lang: 'ar' | 'en') {
  return lang === 'ar' ? n.arSlug : n.slug;
}

export function findNeighborhoodBySlugParam(city: City | null | undefined, slugParam: string): Neighborhood | undefined {
  if (!city) return undefined;
  const s = String(slugParam || '').replace(/^\/+|\/+$/g, '');
  if (!s) return undefined;
  const list = listNeighborhoodsForCity(city);

  return list.find((n) => n.slug === s || n.arSlug === s);
}
