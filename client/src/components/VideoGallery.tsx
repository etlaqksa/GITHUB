import { useState, useCallback, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play } from 'lucide-react';

export interface VideoItem {
  id: string;
  titleAr: string;
  titleEn: string;
  /** Location tag shown as a badge. */
  locationAr?: string;
  locationEn?: string;
}

/**
 * Lite YouTube embed — loads only a thumbnail and play button.
 * The actual iframe is injected only when the user clicks play,
 * saving ~800KB of initial JS per video.
 */
const LiteYouTube = memo(function LiteYouTube({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [activated, setActivated] = useState(false);

  const activate = useCallback(() => setActivated(true), []);

  // YouTube Shorts are vertical (9:16), but we display in a 9:16 container
  const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (activated) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full rounded-xl"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={activate}
      className="absolute inset-0 w-full h-full group cursor-pointer bg-black rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/60"
      aria-label={`Play: ${title}`}
    >
      <img
        src={thumbUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110">
          <Play className="h-7 w-7 text-white fill-white ml-1" />
        </div>
      </div>
      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-sm font-semibold line-clamp-2 drop-shadow-lg">
          {title}
        </p>
      </div>
    </button>
  );
});

interface Props {
  videos: VideoItem[];
  /** Max videos to show initially (expand with "Show more") */
  maxInitial?: number;
  className?: string;
}

export default function VideoGallery({ videos, maxInitial = 4, className = '' }: Props) {
  const { language } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? videos : videos.slice(0, maxInitial);

  return (
    <section className={className}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">
          {language === 'ar' ? 'شاهد أعمالنا الميدانية' : 'Watch Our Field Work'}
        </h2>
        <p className="text-muted-foreground text-lg mt-2 max-w-2xl mx-auto">
          {language === 'ar'
            ? 'لقطات حقيقية من مواقع العمل توثّق جودة التنفيذ وكفاءة الفريق'
            : 'Real footage from our project sites showcasing execution quality and team expertise'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayed.map((v) => {
          const title = language === 'ar' ? v.titleAr : v.titleEn;
          const location = language === 'ar' ? v.locationAr : v.locationEn;

          return (
            <div key={v.id} className="relative aspect-[9/16] rounded-xl overflow-hidden shadow-lg">
              <LiteYouTube videoId={v.id} title={title} />
              {location && (
                <div className="absolute top-2 left-2 z-10 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold px-2.5 py-1 shadow-lg backdrop-blur-sm">
                  📍 {location}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!showAll && videos.length > maxInitial && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
          >
            {language === 'ar'
              ? `عرض الكل (${videos.length})`
              : `Show all (${videos.length})`}
          </button>
        </div>
      )}
    </section>
  );
}
