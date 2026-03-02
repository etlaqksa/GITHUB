import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ProtectedImage from '@/components/ProtectedImage';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
};

export default function Gallery() {
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images: GalleryImage[] = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        id: i + 1,
        src: `/gallery/Etlaq (${i + 1}).webp`,
        alt:
          language === 'ar'
            ? `صورة من أعمال إطلاق رقم ${i + 1}`
            : `Etlaq project photo ${i + 1}`,
      })),
    [language]
  );

  const close = () => setSelectedIndex(null);
  const openAt = (idx: number) => setSelectedIndex(idx);

  const prev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const next = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex, images.length]);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            {language === 'ar' ? 'معرض الصور' : 'Gallery'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === 'ar'
              ? 'نماذج من أعمال ومشاريع فريق إطلاق.'
              : 'A selection of photos from Etlaq projects.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <Card
              key={img.id}
              className="overflow-hidden cursor-pointer hover:shadow-2xl transition-transform duration-200 hover:scale-[1.2] hover:z-50"
              onClick={() => openAt(idx)}
              role="button"
              aria-label={img.alt}
            >
              <ProtectedImage
                src={img.src}
                alt={img.alt}
                aspect="square"
                className="group"
              />
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        <Dialog open={selectedIndex !== null} onOpenChange={(open) => (!open ? close() : null)}>
          <DialogContent className="max-w-[96vw] w-full h-[92vh] p-0 bg-transparent border-none shadow-none">
            <VisuallyHidden>
              <DialogTitle>
                {selectedIndex !== null ? images[selectedIndex].alt : ''}
              </DialogTitle>
            </VisuallyHidden>

            {selectedIndex !== null && (
              <div className="relative w-full h-full">
                {/* Close */}
                <button
                  onClick={close}
                  className="absolute top-3 right-3 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Prev */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>

                {/* Image */}
                <div
                  className="absolute inset-0 flex items-center justify-center p-6"
                  style={{ direction: 'ltr' }}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <img
                    src={encodeURI(images[selectedIndex].src)}
                    alt={images[selectedIndex].alt}
                    className="block max-w-[92vw] max-h-[84vh] w-auto h-auto object-contain select-none"
                    draggable={false}
                  />
                </div>

                {/* Next */}
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}