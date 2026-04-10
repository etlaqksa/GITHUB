import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ProtectedImage from '@/components/ProtectedImage';
import Breadcrumbs from '@/components/Breadcrumbs';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
};

export default function Gallery() {
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Rich, keyword-optimised alt text for each gallery image.
  // Each entry reflects what the image likely shows (equipment, site work, testing, etc.)
  // and embeds relevant search terms for Google Images indexing.
  const ALT_AR = [
    'حقن التربة بالأسمنت في موقع مشروع بالرياض – شركة إطلاق',
    'إحدى معدات الحفر الخاصة بشركة إطلاق المتميزة',
    'فريق إطلاق يُنفّذ أعمال الحقن الأسمنتي لمعالجة التكهفات بموقع بمدينة الرياض',
    'حفر نقاط حقن التربة في موقع إنشائي بالمنطقة الشرقية',
    'حفر مائل لتنفيذ أعمال التثبيت بالمسامير في موقع إنشائي بمدينة الرياض',
    'عملية مراقبة ضغط الحقن أثناء ضخ الخلطة الأسمنتية',
    'حفر نقاط حقن التربة في موقع إنشائي بالمنطقة الشرقية',
    'مجموعة من معدات الحفر الخاصة بشركة إطلاق المتميزة',
    'تنفيذ أعمال الحفر بأحد المواقع بمنطقة عسير',
    'أعمال الحفر بأحد المواقع بمدينة الرياض',
    'حفر مائل لتنفيذ أعمال التثبيت بالمسامير في موقع إنشائي بمدينة الرياض',
    'تنفيذ أعمال الحفر بأحد المواقع بمدينة الرياض',
    'تنفيذ أعمال الحفر بأحد المواقع بمدينة الرياض بواسطة معدة مخصصة للأماكن الضيقة',
    'تنفيذ أعمال الحفر بأحد المواقع بمدينة الرياض',
    'مجموعة من معدات الحفر العميق الخاصة بشركة إطلاق المتميزة',
    'إحدى معدات الحفر الخاصة بشركة إطلاق المتميزة',
    'إحدى معدات الحفر الحديثة الخاصة بشركة إطلاق المتميزة',
    'تنفيذ أعمال الحفر بأحد المواقع بمدينة الدمام',
    'إحدى معدات الحفر الخاصة بشركة إطلاق المتميزة',
    'تجهيز النقاط لبدء عملية الحقن الأسمنتي بأحد المواقع بمدينة الرياض',
    'تجهيز النقاط لبدء عملية الحقن الأسمنتي بأحد المواقع بمدينة الرياض',
    'تثبيت مواسير حقن التربة (Grouting Pipes) تمهيداً لحقن التربة لمعالجة التشققات والهبوطات بموقع مبنى قائم بمدينة جدة',
    'تثبيت مواسير حقن التربة (Grouting Pipes) تمهيداً لحقن التربة لمعالجة التشققات والهبوطات بموقع مبنى قائم بمدينة جدة',
    'تثبيت مواسير حقن التربة (Grouting Pipes) تمهيداً لحقن التربة لمعالجة التشققات والهبوطات بموقع مبنى قائم بمدينة جدة',
    'تثبيت مواسير حقن التربة (Grouting Pipes) تمهيداً لحقن التربة لمعالجة التشققات والهبوطات بموقع مبنى قائم بمدينة جدة',
    'أعمال الحفر بأحد المواقع بمدينة الرياض',
    'تثبيت مواسير حقن التربة (Grouting Pipes) تمهيداً لحقن التربة لمعالجة التشققات والهبوطات بموقع مبنى قائم بمدينة الظهران',
    'تثبيت مواسير حقن التربة (Grouting Pipes) تمهيداً لحقن التربة لمعالجة التشققات والهبوطات بموقع مبنى قائم بمدينة الظهران',
    'عملية مراقبة ضغط الحقن أثناء ضخ الخلطة الأسمنتية',
    'حفر مائل في موقع إنشائي بمدينة الرياض',
    'فريق إطلاق يُنفّذ أعمال الحقن الأسمنتي لمعالجة التكهفات بموقع بمدينة الرياض',
    'فريق إطلاق يُنفّذ أعمال الحقن الأسمنتي لمعالجة التكهفات بموقع بمدينة الرياض',
    'فريق إطلاق يُنفّذ أعمال الحقن الأسمنتي لمعالجة التكهفات بموقع بمدينة الرياض',
    'فريق إطلاق يُنفّذ أعمال الحقن الأسمنتي لمعالجة التشققات والهبوطات بموقع بمدينة الخرج',
    'فريق إطلاق يُنفّذ أعمال الحقن الأسمنتي لمعالجة التشققات والهبوطات بموقع بمدينة الخرج',
    'فريق إطلاق يُنفّذ أعمال الحقن الأسمنتي لمعالجة التشققات والهبوطات بموقع بمدينة الخرج',
    'تنفيذ أعمال الحفر بأحد المواقع بمدينة الرياض بواسطة معدة مخصصة للأماكن الضيقة',
    'تنفيذ أعمال الحفر بأحد المواقع بمدينة الرياض',
    'تنفيذ أعمال الحفر بأحد المواقع بمدينة الرياض',
    'صورة من أحد المواقع أثناء تنفيذ أعمال الحقن الأسمنتي لمعالجة التكهفات بمدينة الخبر',
    'صورة من أحد المواقع أثناء تنفيذ أعمال الحفر الأسمنتي لمعالجة التكهفات بمدينة الرياض',
    'إحدى معدات حقن التربة (Grouting Pump) الحديثة عالية الضغط من معدات شركة إطلاق المتميزة',
    'مجموعة من معدات الحفر الخاصة بشركة إطلاق المتميزة أثناء أعمال كشف التكهفات بموقع بالرياض',
    'عملية مراقبة ضغط الحقن أثناء ضخ الخلطة الأسمنتية',
    'فني الحقن يراقب ضغط الحقن أثناء ضخ الخلطة الأسمنتية',
    'أعمال الحفر بأحد المواقع بمدينة الرياض',
    'فني الحقن يراقب ضغط الحقن أثناء ضخ الخلطة الأسمنتية',
    'فني الحقن يراقب ضغط الحقن أثناء ضخ الخلطة الأسمنتية',
    'فريق إطلاق يُنفّذ أعمال الحقن الأسمنتي بموقع بمدينة الرياض',
    'فريق إطلاق أثناء تثبيت مواسير الحقن (Grouting Pipes) بموقع بمدينة الرياض',
    'فريق إطلاق أثناء تثبيت مواسير الحقن (Grouting Pipes) بموقع بمدينة الرياض',
    'فريق إطلاق أثناء تثبيت مواسير الحقن (Grouting Pipes) بموقع بمدينة الرياض',
    'فني الحقن يراقب ضغط الحقن أثناء ضخ الخلطة الأسمنتية',
    'تثبيت مواسير حقن التربة (Grouting Pipes) بموقع مبنى قائم بمدينة الدمام',
    'تنفيذ مشروع حقن التربة ومعالجة التكهفات بمعايير الجودة العالمية – إطلاق',
  ];

  const ALT_EN = [
    'Cement soil grouting at a Riyadh project site – ETLAQ',
    'One of ETLAQ\'s distinguished drilling equipments',
    'ETLAQ team executing cement grouting to treat cavities at a Riyadh site',
    'Drilling soil injection points at a construction site in the Eastern Province',
    'Inclined drilling for soil nailing works at a Riyadh construction site',
    'Monitoring injection pressure during cement grout pumping',
    'Drilling soil injection points at a construction site in the Eastern Province',
    'A group of ETLAQ\'s distinguished drilling equipments',
    'Executing drilling works at a site in the Aseer region',
    'Drilling works at a site in Riyadh',
    'Inclined drilling for soil nailing works at a Riyadh construction site',
    'Executing drilling works at a site in Riyadh',
    'Executing drilling works at a Riyadh site utilizing equipment specified for confined spaces',
    'Executing drilling works at a site in Riyadh',
    'A group of ETLAQ\'s distinguished deep drilling equipments',
    'One of ETLAQ\'s distinguished drilling equipments',
    'One of ETLAQ\'s distinguished modern drilling equipments',
    'Executing drilling works at a site in Dammam',
    'One of ETLAQ\'s distinguished drilling equipments',
    'Preparing points to start the cement grouting process at a Riyadh site',
    'Preparing points to start the cement grouting process at a Riyadh site',
    'Installing grouting pipes in preparation for soil grouting to treat cracks and settlements at an existing building site in Jeddah',
    'Installing grouting pipes in preparation for soil grouting to treat cracks and settlements at an existing building site in Jeddah',
    'Installing grouting pipes in preparation for soil grouting to treat cracks and settlements at an existing building site in Jeddah',
    'Installing grouting pipes in preparation for soil grouting to treat cracks and settlements at an existing building site in Jeddah',
    'Drilling works at a site in Riyadh',
    'Installing grouting pipes in preparation for soil grouting to treat cracks and settlements at an existing building site in Dhahran',
    'Installing grouting pipes in preparation for soil grouting to treat cracks and settlements at an existing building site in Dhahran',
    'Monitoring injection pressure during cement grout pumping',
    'Inclined drilling at a construction site in Riyadh',
    'ETLAQ team executing cement grouting to treat cavities at a Riyadh site',
    'ETLAQ team executing cement grouting to treat cavities at a Riyadh site',
    'ETLAQ team executing cement grouting to treat cavities at a Riyadh site',
    'ETLAQ team executing cement grouting to treat cracks and settlements at an Al-Kharj site',
    'ETLAQ team executing cement grouting to treat cracks and settlements at an Al-Kharj site',
    'ETLAQ team executing cement grouting to treat cracks and settlements at an Al-Kharj site',
    'Executing drilling works at a Riyadh site utilizing equipment specified for confined spaces',
    'Executing drilling works at a site in Riyadh',
    'Executing drilling works at a site in Riyadh',
    'A photo from a site during the execution of cement grouting to treat cavities in Khobar',
    'A photo from a site during the execution of cement drilling to treat cavities in Riyadh',
    'One of the modern high-pressure soil grouting pumps from ETLAQ\'s distinguished equipment',
    'A group of ETLAQ\'s distinguished drilling equipments during cavity detection works at a Riyadh site',
    'Monitoring injection pressure during cement grout pumping',
    'Grouting technician monitoring injection pressure during cement grout pumping',
    'Drilling works at a site in Riyadh',
    'Grouting technician monitoring injection pressure during cement grout pumping',
    'Grouting technician monitoring injection pressure during cement grout pumping',
    'ETLAQ team executing cement grouting works at a Riyadh site',
    'ETLAQ team installing grouting pipes at a Riyadh site',
    'ETLAQ team installing grouting pipes at a Riyadh site',
    'ETLAQ team installing grouting pipes at a Riyadh site',
    'Grouting technician monitoring injection pressure during cement grout pumping',
    'Installing grouting pipes at an existing building site in Dammam',
    'Executing a soil grouting and cavity treatment project to international quality standards – ETLAQ',
  ];

  const images: GalleryImage[] = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        id: i + 1,
        src: `/gallery/Etlaq (${i + 1}).webp`,
        alt: language === 'ar'
          ? (ALT_AR[i] ?? `أعمال حقن التربة وكشف التكهفات – إطلاق رقم ${i + 1}`)
          : (ALT_EN[i] ?? `Soil grouting and cavity detection works – ETLAQ photo ${i + 1}`),
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
          <Breadcrumbs items={[{ name: language === 'ar' ? 'معرض الصور' : 'Gallery', href: '/gallery', isCurrent: true }]} />
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