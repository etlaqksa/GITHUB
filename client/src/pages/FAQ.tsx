import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import {HelpCircle, Phone} from 'lucide-react';
import { IconWhatsapp } from '@/components/icons/etlaq';
import LocalizedLink from '@/components/LocalizedLink';

export default function FAQ() {
  const { language } = useLanguage();

  const faqs = [
    {
      question: language === 'ar' ? 'ما هو حقن التربة؟' : 'What is soil grouting?',
      answer:
        language === 'ar'
          ? 'حقن التربة هو عملية حقن مواد معينة (عادة الأسمنت أو مواد كيميائية) في التربة لتحسين خواصها الميكانيكية، زيادة قدرتها على التحمل، ملء التكهفات، أو منع تسرب المياه. يتم استخدام هذه التقنية لتثبيت الأساسات، معالجة الهبوط، وتقوية التربة الضعيفة.'
          : 'Soil grouting is the process of injecting certain materials (usually cement or chemical substances) into the soil to improve its mechanical properties, increase its bearing capacity, fill voids, or prevent water seepage. This technique is used to stabilize foundations, treat settlement, and strengthen weak soil.',
    },
    {
      question: language === 'ar' ? 'كم تستغرق عملية حقن التربة؟' : 'How long does soil grouting take?',
      answer:
        language === 'ar'
          ? 'تعتمد مدة عملية حقن التربة على عدة عوامل منها: حجم المشروع، نوع التربة، عمق الحقن المطلوب، ونوع التقنية المستخدمة. بشكل عام، قد تستغرق المشاريع الصغيرة من 3-7 أيام، بينما المشاريع الكبيرة قد تستغرق عدة أسابيع.'
          : 'The duration of soil grouting depends on several factors including: project size, soil type, required injection depth, and technique used. Generally, small projects may take 3-7 days, while large projects may take several weeks.',
    },
    {
      question:
        language === 'ar'
          ? 'كيف يتم كشف التكهفات تحت الأرض؟'
          : 'How are underground cavities detected?',
      answer:
        language === 'ar'
          ? 'نستخدم عدة تقنيات متقدمة لكشف التكهفات منها: رادار اختراق الأرض (GPR)، المسح الكهربائي، المسح السيزمي، والحفر الاستكشافي. تقنية GPR هي الأكثر شيوعاً حيث تستخدم موجات راديوية لإنشاء صورة ثلاثية الأبعاد لباطن الأرض دون الحاجة للحفر.'
          : 'We use several advanced techniques to detect cavities including: Ground Penetrating Radar (GPR), electrical resistivity survey, seismic survey, and exploratory drilling. GPR is the most common technique as it uses radio waves to create a 3D image of the subsurface without excavation.',
    },
    {
      question:
        language === 'ar' ? 'ما هي أسباب هبوط المباني؟' : 'What causes building settlement?',
      answer:
        language === 'ar'
          ? 'أسباب هبوط المباني متعددة وتشمل: ضعف التربة الأساسية، وجود تكهفات أو تكهفات تحت الأساسات، تسرب المياه وتآكل التربة، أحمال زائدة على المبنى، سوء التصميم الإنشائي، أو عدم إجراء دراسة تربة كافية قبل البناء.'
          : 'Building settlement causes are multiple and include: weak foundation soil, presence of voids or cavities under foundations, water leakage and soil erosion, excessive loads on the building, poor structural design, or insufficient soil study before construction.',
    },
    {
      question:
        language === 'ar'
          ? 'هل يمكن إصلاح التشققات الإنشائية بشكل دائم؟'
          : 'Can structural cracks be permanently repaired?',
      answer:
        language === 'ar'
          ? 'نعم، يمكن إصلاح التشققات الإنشائية بشكل دائم باستخدام تقنيات متقدمة مثل حقن الإيبوكسي، حقن البولي يوريثان، أو التدعيم بألياف الكربون. المفتاح هو تحديد السبب الجذري للتشقق ومعالجته أولاً، ثم إصلاح التشقق نفسه باستخدام التقنية المناسبة.'
          : 'Yes, structural cracks can be permanently repaired using advanced techniques such as epoxy injection, polyurethane injection, or carbon fiber reinforcement. The key is to identify and address the root cause of the crack first, then repair the crack itself using the appropriate technique.',
    },
    {
      question:
        language === 'ar'
          ? 'ما الفرق بين حقن الضغط وحقن النفث؟'
          : 'What is the difference between compaction grouting and jet grouting?',
      answer:
        language === 'ar'
          ? 'حقن الضغط (Compaction Grouting) يتم بحقن خليط أسمنتي كثيف تحت ضغط منخفض لرفع وتكثيف التربة المحيطة. أما حقن النفث (Jet Grouting) فيستخدم نفث عالي الضغط لخليط أسمنتي سائل لتفتيت التربة وخلطها مع الأسمنت لإنشاء أعمدة صلبة. حقن النفث أقوى ولكن أكثر تكلفة.'
          : 'Compaction grouting involves injecting a thick cement mixture under low pressure to lift and densify surrounding soil. Jet grouting uses high-pressure jets of liquid cement mixture to break up soil and mix it with cement to create solid columns. Jet grouting is stronger but more expensive.',
    },
    {
      question:
        language === 'ar'
          ? 'كم تكلفة مشروع حقن التربة؟'
          : 'How much does a soil grouting project cost?',
      answer:
        language === 'ar'
          ? 'تختلف التكلفة بشكل كبير حسب عدة عوامل: حجم المشروع، نوع التقنية المستخدمة، عمق الحقن، نوع التربة، وموقع المشروع. نوفر معاينة مجانية وعرض سعر مفصل بعد دراسة الموقع. تواصل معنا للحصول على تقييم دقيق لمشروعك.'
          : 'Cost varies significantly based on several factors: project size, technique used, injection depth, soil type, and project location. We provide free site inspection and detailed quotation after site study. Contact us for accurate project assessment.',
    },
    {
      question:
        language === 'ar'
          ? 'هل حقن التربة آمن للمباني القائمة؟'
          : 'Is soil grouting safe for existing buildings?',
      answer:
        language === 'ar'
          ? 'نعم، حقن التربة آمن تماماً للمباني القائمة عند تنفيذه بواسطة متخصصين. نستخدم تقنيات دقيقة ومعدات متطورة لضمان عدم التأثير السلبي على المبنى. في الواقع، الهدف الأساسي من حقن التربة هو حماية وتقوية المباني القائمة.'
          : 'Yes, soil grouting is completely safe for existing buildings when performed by specialists. We use precise techniques and advanced equipment to ensure no negative impact on the building. In fact, the main purpose of soil grouting is to protect and strengthen existing buildings.',
    },
    {
      question:
        language === 'ar'
          ? 'متى يجب إجراء فحص للتربة؟'
          : 'When should soil testing be conducted?',
      answer:
        language === 'ar'
          ? 'يجب إجراء فحص التربة في عدة حالات: قبل البدء في أي مشروع بناء جديد، عند ملاحظة تشققات أو هبوط في المبنى، قبل إضافة طوابق جديدة، عند شراء أرض للبناء، أو بشكل دوري للمباني القديمة كإجراء وقائي.'
          : 'Soil testing should be conducted in several cases: before starting any new construction project, when noticing cracks or settlement in the building, before adding new floors, when purchasing land for construction, or periodically for old buildings as a preventive measure.',
    },
    {
      question:
        language === 'ar'
          ? 'ما هي مدة ضمان أعمال حقن التربة؟'
          : 'What is the warranty period for soil grouting work?',
      answer:
        language === 'ar'
          ? 'نوفر ضماناً يتراوح من 5 إلى 10 سنوات على أعمال حقن التربة حسب نوع المشروع والتقنية المستخدمة. يشمل الضمان متابعة دورية للمشروع والتدخل الفوري في حالة ظهور أي مشاكل. نحن واثقون من جودة عملنا ونلتزم بالمعايير الهندسية العالمية.'
          : 'We provide a warranty ranging from 5 to 10 years on soil grouting work depending on project type and technique used. The warranty includes periodic project follow-up and immediate intervention if any problems arise. We are confident in our work quality and adhere to international engineering standards.',
    },
    {
      question:
        language === 'ar'
          ? 'هل يمكن معالجة هبوط المبنى دون إخلاء السكان؟'
          : 'Can building settlement be treated without evacuating residents?',
      answer:
        language === 'ar'
          ? 'في معظم الحالات، نعم. تقنيات حقن التربة الحديثة تسمح بالعمل دون الحاجة لإخلاء المبنى. نستخدم معدات صغيرة الحجم وتقنيات قليلة الإزعاج. ومع ذلك، في بعض الحالات الشديدة قد نوصي بإخلاء مؤقت لضمان السلامة.'
          : 'In most cases, yes. Modern soil grouting techniques allow work without building evacuation. We use compact equipment and low-disturbance techniques. However, in some severe cases we may recommend temporary evacuation to ensure safety.',
    },
    {
      question:
        language === 'ar'
          ? 'ما الفرق بين التشققات السطحية والإنشائية؟'
          : 'What is the difference between surface and structural cracks?',
      answer:
        language === 'ar'
          ? 'التشققات السطحية تظهر في طبقة الدهان أو اللياسة فقط ولا تؤثر على سلامة المبنى، وعادة ما تكون رفيعة جداً. أما التشققات الإنشائية فتمتد عبر الخرسانة أو الجدران الحاملة وتشكل خطراً على سلامة المبنى. التشققات الإنشائية تتطلب تدخلاً فورياً من متخصصين.'
          : 'Surface cracks appear only in paint or plaster layer and do not affect building safety, usually very thin. Structural cracks extend through concrete or load-bearing walls and pose a risk to building safety. Structural cracks require immediate specialist intervention.',
    },
    {
      question:
        language === 'ar'
          ? 'هل تعملون في جميع مناطق المملكة؟'
          : 'Do you work in all regions of the Kingdom?',
      answer:
        language === 'ar'
          ? 'نعم، نقدم خدماتنا في جميع مناطق المملكة العربية السعودية. لدينا فرق عمل متنقلة ومعدات متطورة تمكننا من تنفيذ المشاريع في أي مكان. نحن موجودون بشكل رئيسي في الرياض ولكننا نخدم جميع المدن والمناطق.'
          : 'Yes, we provide our services in all regions of Saudi Arabia. We have mobile work teams and advanced equipment enabling us to execute projects anywhere. We are mainly based in Riyadh but serve all cities and regions.',
    },
    {
      question:
        language === 'ar'
          ? 'كيف أعرف إذا كان مبنى يحتاج لحقن التربة؟'
          : 'How do I know if a building needs soil grouting?',
      answer:
        language === 'ar'
          ? 'علامات تدل على الحاجة لحقن التربة: تشققات في الجدران أو الأرضيات، أبواب أو نوافذ لا تغلق بشكل صحيح، ميلان في الجدران، هبوط في الأرضيات، تكهفات تحت البلاط، أو تسربات مياه متكررة. إذا لاحظت أياً من هذه العلامات، اتصل بنا لإجراء فحص مجاني.'
          : 'Signs indicating need for soil grouting: cracks in walls or floors, doors or windows not closing properly, wall tilting, floor settlement, voids under tiles, or recurring water leaks. If you notice any of these signs, contact us for free inspection.',
    },
    {
      question:
        language === 'ar'
          ? 'ما هي المدة اللازمة لتصلب الأسمنت المحقون؟'
          : 'How long does injected cement take to harden?',
      answer:
        language === 'ar'
          ? 'تعتمد مدة التصلب على نوع المادة المستخدمة. الأسمنت التقليدي يحتاج 24-48 ساعة للتصلب الأولي و7-28 يوماً للوصول للقوة الكاملة. المواد الكيميائية السريعة قد تتصلب خلال ساعات قليلة. نحدد الوقت المناسب لكل مشروع حسب احتياجاته.'
          : 'Hardening time depends on material type used. Traditional cement needs 24-48 hours for initial hardening and 7-28 days to reach full strength. Fast-setting chemical materials may harden within few hours. We determine appropriate time for each project based on its needs.',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 md:py-10">
        <div className="container text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar'
              ? 'إجابات على أكثر الأسئلة شيوعاً حول خدماتنا في حقن التربة ومعالجة التكهفات'
              : 'Answers to the most common questions about our soil grouting and cavity treatment services'}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 md:py-10">
        <div className="container max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-10 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              {language === 'ar' ? 'لم تجد إجابة لسؤالك؟' : "Didn't Find Your Answer?"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === 'ar'
                ? 'تواصل معنا مباشرة وسنكون سعداء بمساعدتك'
                : 'Contact us directly and we will be happy to help you'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 w-full">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  {language === 'ar' ? 'اتصل بنا' : 'Call Us'}
                </h3>
                <p className="text-muted-foreground whitespace-nowrap" dir="ltr">
                  +966534145922
                </p>
                <a href="tel:+966534145922">
                  <Button variant="outline" className="w-full">
                    {language === 'ar' ? 'اتصل الآن' : 'Call Now'}
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <IconWhatsapp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">WhatsApp</h3>
                <p className="text-muted-foreground">
                  {language === 'ar' ? 'تواصل فوري' : 'Instant Contact'}
                </p>
                <a href="https://wa.me/966534145922" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    {language === 'ar' ? 'راسلنا' : 'Message Us'}
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  {language === 'ar' ? 'نموذج الاستفسار' : 'Inquiry Form'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'ar' ? 'أرسل استفسارك' : 'Send Your Inquiry'}
                </p>
                <LocalizedLink href="/contact">
                  <Button variant="outline" className="w-full">
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </Button>
                </LocalizedLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

