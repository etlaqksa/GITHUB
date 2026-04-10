import type { VideoItem } from '@/components/VideoGallery';

/**
 * Curated project videos from the company's YouTube channel.
 * All are YouTube Shorts (vertical format, 9:16).
 */
export const groutingVideos: VideoItem[] = [
  {
    id: '1TzI3Z-a3Vs',
    titleAr: 'تنفيذ أعمال حقن التربة لفيلا سكنية بحي الياسمين - الرياض',
    titleEn: 'Soil grouting for a residential villa — Al Yasmin, Riyadh',
    locationAr: 'الرياض',
    locationEn: 'Riyadh',
  },
  {
    id: 'v9KoWsJXAkg',
    titleAr: 'تنفيذ أعمال الحقن الأسمنتي للتربة لفيلا سكنية بحي الياسمين - الرياض',
    titleEn: 'Cement grouting for a residential villa — Al Yasmin, Riyadh',
    locationAr: 'الرياض',
    locationEn: 'Riyadh',
  },
  {
    id: 'SF5BgaHyrHE',
    titleAr: 'تنفيذ أعمال حقن التربة لمبنى قائم بحي القيروان - الرياض',
    titleEn: 'Soil grouting for an existing building — Al Qayrawan, Riyadh',
    locationAr: 'الرياض',
    locationEn: 'Riyadh',
  },
  {
    id: 'RdV7MLOTNqQ',
    titleAr: 'أعمال حفر نقاط الحقن الأسمنتي للتربة لفيلا سكنية بحي السوسن - أبها',
    titleEn: 'Drilling injection points for a villa — Al Sawsan, Abha',
    locationAr: 'أبها',
    locationEn: 'Abha',
  },
  {
    id: 'UNmusdlB5oU',
    titleAr: 'تنفيذ أعمال الحفر لنقاط الحقن الأسمنتي للتربة بحي السوسن - أبها',
    titleEn: 'Executing drilling for cement injection points — Al Sawsan, Abha',
    locationAr: 'أبها',
    locationEn: 'Abha',
  },
  {
    id: 'y4oVF5uk0Zk',
    titleAr: 'أعمال الحفر لنقاط الحقن الأسمنتي للتربة لفيلا بحي الياسمين - الرياض',
    titleEn: 'Drilling injection points for a villa — Al Yasmin, Riyadh',
    locationAr: 'الرياض',
    locationEn: 'Riyadh',
  },
  {
    id: 'Re8CcBjeT7o',
    titleAr: 'أعمال الحفر لنقاط الحقن الأسمنتي للتربة لعمارتين سكنيتين بحي طيبة - جدة',
    titleEn: 'Drilling injection points for residential buildings — Taiba, Jeddah',
    locationAr: 'جدة',
    locationEn: 'Jeddah',
  },
  {
    id: 'aoAYgyYnXxA',
    titleAr: 'تنفيذ أعمال الحفر لمعالجة التكهفات بمشروع إنشاء مبنى تعليمي - الدمام',
    titleEn: 'Drilling for cavity treatment at an educational building — Dammam',
    locationAr: 'الدمام',
    locationEn: 'Dammam',
  },
];

/**
 * Build VideoObject JSON-LD schema for SEO.
 * @see https://schema.org/VideoObject
 */
export function buildVideoSchema(videos: VideoItem[], language: 'ar' | 'en') {
  return videos.map((v) => ({
    '@type': 'VideoObject',
    name: language === 'ar' ? v.titleAr : v.titleEn,
    description: language === 'ar' ? v.titleAr : v.titleEn,
    thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    uploadDate: '2025-01-01', // approximate — YouTube doesn't expose exact date via URL
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    publisher: {
      '@type': 'Organization',
      name: 'شركة إطلاق المتميزة المحدودة',
      logo: {
        '@type': 'ImageObject',
        url: 'https://etlaqksa.com/logo.webp',
      },
    },
  }));
}
