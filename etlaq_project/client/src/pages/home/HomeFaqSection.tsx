import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomeFaqSection() {
  const { language } = useLanguage();

  const faq = [
    {
      id: 'faq-1',
      q: language === 'ar' ? 'هل أبدأ بحقن التربة أم بكشف التكهفات؟' : 'Should I start with grouting or cavity detection?',
      a:
        language === 'ar'
          ? 'إذا كان السبب غير واضح أو يوجد اشتباه تكهفات/فراغات، نبدأ بالكشف أو الدراسة الجيوفيزيائية ثم نحدد المعالجة. إذا كانت المؤشرات واضحة لضعف/هبوط موضعي تحت الأساسات، قد نبدأ بخطة حقن مرحلية بعد التقييم.'
          : 'If the root cause is unclear or voids are suspected, start with detection or geophysics, then decide remediation. If indicators point to localized weakness/settlement under foundations, a staged grouting plan may follow after assessment.',
    },
    {
      id: 'faq-2',
      q: language === 'ar' ? 'هل الحقن يوقف التشققات نهائياً؟' : 'Will grouting permanently stop cracks?',
      a:
        language === 'ar'
          ? 'الحقن يعالج سبباً شائعاً (ضعف/فراغات/هبوط)، لكنه ليس حلًا سحريًا لكل التشققات. النتيجة تعتمد على السبب الحقيقي، ونوصي بخطوة التشخيص أولاً عند الشك.'
          : 'Grouting addresses common causes (weak soil/voids/settlement), but it is not a universal cure for every crack. Results depend on the real cause—diagnosis first when uncertain.',
    },
    {
      id: 'faq-3',
      q: language === 'ar' ? 'ما المعلومات التي تساعدكم في التقييم؟' : 'What information helps your assessment?',
      a:
        language === 'ar'
          ? 'موقع المشروع، صور للتشققات/الهبوط إن وُجدت، مخططات إنشائية أو تقرير تربة سابق (إن توفر)، وأي أعمال سابقة بالموقع (تسربات/حفريات/إضافات).'
          : 'Project location, photos of cracks/settlement (if any), drawings or a prior soil report (if available), and any previous site events (leakage/excavation/changes).',
    },
    {
      id: 'faq-4',
      q: language === 'ar' ? 'كم تستغرق الأعمال؟' : 'How long does it take?',
      a:
        language === 'ar'
          ? 'يعتمد على نطاق المشكلة وطبيعة الوصول للموقع ومتطلبات الاختبارات والتوثيق. بعد التقييم نحدد خطة زمنية واقعية.'
          : 'It depends on scope, site access, and testing/documentation requirements. After assessment, we propose a realistic timeline.',
    },
    {
      id: 'faq-5',
      q: language === 'ar' ? 'هل تعملون داخل المباني القائمة؟' : 'Do you work inside existing buildings?',
      a:
        language === 'ar'
          ? 'نعم حسب الحالة ومتطلبات السلامة. نرتب العمل لتقليل الإزعاج قدر الإمكان، ونوضح قبل التنفيذ نقاط الدخول والحماية والتنظيف.'
          : 'Yes, depending on the case and safety requirements. We plan access, protection, and cleanup steps ahead to minimize disruption.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/20">
      <div className="w-full px-4">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="text-2xl md:text-4xl font-bold">{language === 'ar' ? 'أسئلة شائعة' : 'FAQ'}</h2>
          <p className="text-muted-foreground">
            {language === 'ar'
              ? 'إجابات مختصرة لأكثر الأسئلة تكرارًا قبل بدء أي عمل ميداني.'
              : 'Quick answers to common questions before any field work starts.'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <Card className="rounded-3xl border bg-card/70 backdrop-blur">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faq.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
