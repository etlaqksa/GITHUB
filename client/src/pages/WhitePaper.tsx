import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';

export default function WhitePaper() {
  const { language } = useLanguage();

  const titleAr = 'الورقة البيضاء: منهجية المسح الجيوفيزيائي المتقدم لتقليل مخاطر التكهفات';
  const titleEn = 'White Paper: Advanced Geophysical Surveys to Reduce Cavity/Void Risks';

  const descAr = 'دليل عملي مختصر يوضح كيف نستخدم GPR/ERT/Seismic عند الحاجة لتأكيد الفرضيات وتخفيض عدم اليقين قبل الحقن الأسمنتي أو الأعمال الإنشائية.';
  const descEn = 'A concise practical guide on how we apply GPR/ERT/Seismic (when needed) to validate assumptions and reduce uncertainty before grouting or construction.';

  const title = language === 'ar' ? titleAr : titleEn;
  const description = language === 'ar' ? descAr : descEn;

  return (
    <div className="container mx-auto px-4 py-10">
      <SEO title={title} description={description} />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{title}</h1>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/white-paper-advanced-geophysical-surveys.pdf" target="_blank" rel="noopener noreferrer">
              <Button className="font-bold">
                {language === 'ar' ? 'تحميل PDF' : 'Download PDF'}
              </Button>
            </a>
            <LocalizedLink href="/request-service" className="inline-flex">
              <Button variant="outline" className="font-bold">
                {language === 'ar' ? 'اطلب تقييم للموقع' : 'Request a Site Assessment'}
              </Button>
            </LocalizedLink>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="shadow-hover-soft">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-xl font-bold">{language === 'ar' ? 'متى نستخدم المسح الجيوفيزيائي؟' : 'When do we use geophysics?'}</h2>
              <p className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? 'عند وجود مؤشرات تكهفات/هبوط، أو تضارب في نتائج الجسات، أو الحاجة لتحديد نطاقات الضعف قبل تصميم برنامج الحقن.'
                  : 'When there are void/settlement indicators, conflicting borehole results, or a need to delineate weak zones before grouting design.'}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-hover-soft">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-xl font-bold">{language === 'ar' ? 'ما الذي ستجده في الورقة؟' : 'What’s inside?'}</h2>
              <ul className="text-sm text-muted-foreground list-disc ps-5 space-y-1">
                <li>{language === 'ar' ? 'خريطة قرار سريعة (GPR/ERT/Seismic)' : 'Quick decision map (GPR/ERT/Seismic)'}</li>
                <li>{language === 'ar' ? 'أخطاء شائعة وكيف نتجنبها' : 'Common pitfalls and how we avoid them'}</li>
                <li>{language === 'ar' ? 'تسليمات واضحة للعميل (خرائط/مقاطع/توصيات)' : 'Clear deliverables (maps/sections/recommendations)'}</li>
                <li>{language === 'ar' ? 'كيف ينعكس ذلك على كفاءة برنامج الحقن' : 'How it improves grouting efficiency'}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-hover-soft">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-xl font-bold">{language === 'ar' ? 'النتيجة العملية' : 'Practical outcome'}</h2>
              <p className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? 'تقليل المخاطر، تحسين دقة التصميم، وتقليل الهدر في المواد والوقت عبر توجيه الحقن إلى المناطق الحرجة فقط.'
                  : 'Lower risk, higher design confidence, and less waste of time/material by targeting grouting only where it matters.'}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-hover-soft">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-xl font-bold">{language === 'ar' ? 'هل تحتاج نسخة مخصصة؟' : 'Need a tailored version?'}</h2>
              <p className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? 'يمكننا تخصيص التوصيات وفق نوع المشروع (فلل/أبراج/طرق/مرافق) وطبيعة التربة والمنطقة.'
                  : 'We can tailor recommendations to your project type (villas/towers/roads/utilities) and local ground conditions.'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 text-sm text-muted-foreground">
          {language === 'ar'
            ? 'ملاحظة: هذه الورقة للأغراض الإرشادية ولا تغني عن التقييم الموقعي أو الدراسة التفصيلية عند الحاجة.'
            : 'Note: This paper is for guidance and does not replace a proper site assessment or detailed investigation when required.'}
        </div>
      </div>
    </div>
  );
}
