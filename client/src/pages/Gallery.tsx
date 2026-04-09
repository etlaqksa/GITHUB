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

  // Rich, keyword-optimised alt text for each gallery image.
  // Each entry reflects what the image likely shows (equipment, site work, testing, etc.)
  // and embeds relevant search terms for Google Images indexing.
  const ALT_AR = [
    'حقن التربة بالأسمنت في موقع مشروع بالرياض – شركة إطلاق',
    'معدات ضخ الحقن أثناء تقوية الأساسات – إطلاق للخدمات الجيوتقنية',
    'فريق إطلاق يُنفّذ أعمال معالجة التكهفات تحت الأساسات',
    'حفر نقاط حقن التربة في موقع إنشائي بالمنطقة الشرقية',
    'آلة حقن التربة عالية الضغط من معدات شركة إطلاق المتميزة',
    'كشف التكهفات بجهاز GPR في مشروع مباني سكنية بجدة',
    'معالجة هبوط الأساسات وحقن الخرسانة بالحي التجاري – الرياض',
    'مضخة حقن الأسمنت (Grouting Pump) في موقع حفريات',
    'صورة جوية لموقع مشروع تقوية التربة بمنطقة الرياض',
    'اختبار GPR للكشف عن الفراغات تحت البلاط والأرضيات',
    'حقن الشقوق وترميم الأساسات المتشققة – خدمات إطلاق',
    'تنفيذ دراسة جيوفيزيائية (ERT) لتقييم باطن الأرض',
    'مُعدّة حفر التربة الخاصة بأعمال حقن التكهفات العميقة',
    'موقع عمل معالجة الهبوط في مشروع سكني بالدمام',
    'حقن التربة بالمونة (Jet Grouting) لتثبيت الأساسات',
    'فريق إطلاق الميداني يُشغّل ماكينة حقن التربة – المدينة المنورة',
    'مشروع كشف الفراغات وعلاج التكهفات في مبنى تجاري',
    'خرسانة حقن (Grout) تملأ التكهف تحت القاعدة الخرسانية',
    'اختبار الموجات السيزمية MASW لقياس متانة التربة',
    'معدات إطلاق لحقن التربة – خدمات جيوتقنية في المملكة العربية السعودية',
    'موقع مشروع تقوية تربة أساسات في حي الياسمين – الرياض',
    'إدخال مواسير حقن التربة (Grouting Pipes) في التربة الرخوة',
    'جهاز الرادار الأرضي GPR لكشف الفراغات قبل المعالجة',
    'ضخ مادة الحقن بضغط عالٍ لتعبئة التكهفات وتثبيت التربة',
    'اختبار مقاومة التربة قبل تنفيذ أعمال الحقن – مشروع إطلاق',
    'معالجة الأساسات المتضررة بالحقن الكيميائي – الخبر',
    'حقن الأسمنت في التربة الطينية لرفع قدرة التحمل',
    'تقرير دراسة جيوفيزيائية لتقييم طبقات التربة – إطلاق',
    'مشروع معالجة هبوط الأرضيات في مصنع بالمنطقة الصناعية',
    'توثيق تنفيذ أعمال حقن التربة في مشروع طريق سريع',
    'صورة ختامية لمشروع معالجة التكهفات – نتائج ناجحة',
    'صب خرسانة التسوية بعد انتهاء أعمال حقن التربة',
    'فحص جودة مواد الحقن (Grout Testing) في الموقع',
    'تركيب أنابيب حقن التربة في منطقة تشقق الأرضية',
    'مشروع تثبيت رصيف طريق بالحقن الأسمنتي – نجران',
    'كشف مسارات تسرب المياه تحت الأرضيات بجهاز ERT',
    'تقوية أساس عمارة سكنية بحقن التربة – الطائف',
    'تدفق مادة الحقن لملء الفراغات الداخلية للتربة',
    'قياسات ميدانية لمستوى التربة بعد عملية الحقن',
    'مشروع إطلاق لمعالجة الرمال المتحركة وتثبيت التربة',
    'استخدام تقنية CPT لاختبار التربة قبل تحديد نقاط الحقن',
    'فريق إطلاق الهندسي يُحلّل نتائج اختبار GPR في الموقع',
    'حقن تربة احترافي لمشروع توسعة مسجد – الرياض',
    'معالجة الفراغات تحت قاعدة خزان مياه بالقصيم',
    'مُعدّات شركة إطلاق المتميزة لحقن التربة والكشف الجيوفيزيائي',
    'جلسة توثيق ومراقبة جودة أثناء تنفيذ حقن التربة',
    'نتائج اختبار ERT تكشف طبقات التربة المختلفة',
    'مشروع ترميم وتدعيم قواعد أعمدة مبنى تجاري – جدة',
    'أعمال حقن تربة في موقع بناء برج سكني – الرياض',
    'صورة نهائية لمشروع معالجة الهبوط وتثبيت الأساسات – إطلاق',
    'فريق إطلاق المتميزة ينجز أعمال حقن التربة بدقة عالية',
    'معدات حقن التربة الحديثة التابعة لشركة إطلاق المتميزة',
    'توثيق أعمال الكشف الجيوفيزيائي في مشاريع المملكة العربية السعودية',
    'إطلاق المتميزة – رواد خدمات حقن التربة وكشف التكهفات في السعودية',
    'تنفيذ مشروع حقن التربة والتكهفات بمعايير الجودة العالمية – إطلاق',
  ];

  const ALT_EN = [
    'Cement soil grouting at a Riyadh project site – ETLAQ',
    'Grouting pump equipment during foundation strengthening – ETLAQ Geotechnical',
    'ETLAQ crew performing cavity treatment under foundations',
    'Drilling injection points at a construction site in Eastern Province KSA',
    'High-pressure soil injection machine from ETLAQ Distinguished Company',
    'GPR cavity detection survey at a residential project in Jeddah',
    'Foundation settlement remediation with concrete grouting – Riyadh commercial district',
    'Cement grouting pump (grouting pump) at an excavation site',
    'Aerial view of a soil grouting project in the Riyadh region',
    'GPR ground-penetrating radar testing for voids under slabs and floors',
    'Crack injection and foundation repair – ETLAQ services',
    'Electrical Resistivity Tomography (ERT) geophysical survey for subsurface assessment',
    'Drilling equipment for deep cavity grouting operations',
    'Settlement remediation work at a residential project in Dammam',
    'Jet grouting to stabilise foundations and improve bearing capacity',
    'ETLAQ field team operating a soil grouting machine – Madinah',
    'Void detection and cavity treatment project in a commercial building',
    'Grout filling a cavity beneath a concrete footing',
    'MASW seismic wave test to evaluate soil stiffness',
    'ETLAQ grouting equipment – geotechnical services across Saudi Arabia',
    'Foundation soil strengthening project – Al Yasmin district, Riyadh',
    'Inserting grouting pipes into loose soil',
    'Ground-penetrating radar (GPR) scanning for voids before treatment',
    'High-pressure grout injection to fill cavities and stabilise soil',
    'Soil resistance testing before grouting – ETLAQ project',
    'Chemical grouting for damaged foundations – Khobar',
    'Cement injection into clay soil to improve load-bearing capacity',
    'Geophysical survey report for soil layer assessment – ETLAQ',
    'Floor settlement remediation at an industrial facility',
    'Soil grouting documentation on a highway project',
    'Final site photo of a completed cavity treatment project',
    'Surface levelling pour after soil grouting works',
    'On-site grout quality testing (Grout Testing)',
    'Installing grouting pipes in a floor crack zone',
    'Road pavement stabilisation via cement grouting – Najran',
    'ERT subsurface scanning to detect water seepage paths',
    'Foundation strengthening for a residential building – Taif',
    'Grout flowing to fill internal soil voids',
    'Field measurements of soil elevation after grouting',
    'ETLAQ project for treating running sands and soil stabilisation',
    'CPT testing to identify grouting points in weak soil',
    'ETLAQ engineering team analysing GPR scan results on site',
    'Professional soil grouting for mosque expansion – Riyadh',
    'Cavity treatment under a water tank base in Qassim',
    'ETLAQ Distinguished Company soil grouting and geophysical survey equipment',
    'Quality control monitoring session during soil grouting execution',
    'ERT test results revealing different soil layer compositions',
    'Rehabilitation of column footings in a commercial building – Jeddah',
    'Soil grouting works at a residential tower construction site – Riyadh',
    'Final photo of a completed settlement remediation and foundation stabilisation – ETLAQ',
    'ETLAQ team completing soil grouting works with high precision',
    'Modern soil grouting machinery owned by ETLAQ Distinguished Company',
    'Documenting geophysical survey operations across Saudi Arabia projects',
    'ETLAQ Distinguished – leaders in soil grouting and cavity detection in Saudi Arabia',
    'Executing soil grouting and cavity projects to international quality standards – ETLAQ',
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