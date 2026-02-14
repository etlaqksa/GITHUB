import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SEO } from '@/components/SEO';
import TrustStats from '@/components/TrustStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, ClipboardList, Drill, FileText, Shield, Timer } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import AutoLinkedText from '@/components/AutoLinkedText';

export default function ServiceGrouting() {
  const { language, t } = useLanguage();

  const benefits =
    language === 'ar'
      ? ['تثبيت وتقوية التربة تحت الأساسات', 'ملء التكهفات ومنع الهبوط', 'تقليل مخاطر التشققات المستقبلية', 'تنفيذ سريع بأقل تعطيل للموقع']
      : ['Stabilize and strengthen soil under foundations', 'Fill voids and reduce settlement risk', 'Lower chances of future cracks', 'Fast execution with minimal site disruption'];

  const techniques =
    language === 'ar'
      ? ['حقن الضغط (Compaction Grouting)', 'حقن النفاذ (Permeation Grouting)', 'حقن النفث (Jet Grouting)', 'حقن الستار (Curtain Grouting)']
      : ['Compaction Grouting', 'Permeation Grouting', 'Jet Grouting', 'Curtain Grouting'];

  const deliverables =
    language === 'ar'
      ? ['تقييم مبدئي للحالة وخطة تنفيذ', 'تحديد نقاط الحقن وأعماق العمل', 'تقارير تنفيذية (حسب الحاجة)', 'توصيات ما بعد التنفيذ والمتابعة']
      : ['Initial assessment & execution plan', 'Injection points and depths', 'Execution reports (as needed)', 'Post-work recommendations and follow-up'];

  const processSteps =
    language === 'ar'
      ? [
          {
            title: 'تجميع البيانات والمعاينة',
            desc: 'نجمع صور الحالة والموقع والتقارير المتاحة (إن وجدت) ونحدد مؤشرات المشكلة ونطاقها.',
          },
          {
            title: 'تحديد المسار المناسب',
            desc: 'قد نوصي بكشف تكهفات/دراسة جيوفيزيائية قبل الحقن إذا كانت المؤشرات غير كافية لاتخاذ قرار.',
          },
          {
            title: 'خطة حقن على مراحل',
            desc: 'تحديد مواد الحقن ونقاطه وأعماقه بطريقة تناسب الحالة مع متابعة ميدانية أثناء التنفيذ.',
          },
          {
            title: 'توثيق ومخرجات واضحة',
            desc: 'تسليم نتائج وتوصيات متابعة تساعدك على اتخاذ الخطوة التالية بثقة.',
          },
        ]
      : [
          {
            title: 'Info collection & assessment',
            desc: 'We gather site data, photos, and any available reports and define the scope.',
          },
          {
            title: 'Choose the right route',
            desc: 'We may recommend geophysical/detection first when indicators are insufficient for a safe decision.',
          },
          {
            title: 'Phased grouting plan',
            desc: 'We define materials, points, and depths fit for the case with on-site monitoring.',
          },
          {
            title: 'Documentation & deliverables',
            desc: 'Clear outputs and follow-up recommendations for the next step.',
          },
        ];

  const whenNotRecommended =
    language === 'ar'
      ? [
          'إذا كانت المشكلة إنشائية بحتة وتحتاج تدعيم إنشائي أولاً (نقترح المسار الأنسب).',
          'إذا كان سبب التشققات/الهبوط غير محسوم—الأفضل بدءًا بكشف تكهفات/دراسة داعمة لتقليل المخاطر.',
          'إذا كانت هناك تسربات مستمرة بدون معالجة مصدرها (نوصي بمعالجة السبب قبل/مع أي إجراء).',
        ]
      : [
          'When the issue is structural and needs structural strengthening first (we guide the right path).',
          'When the root-cause is unclear—start with detection/geophysics to reduce risk.',
          'When there is ongoing leakage without fixing the source (address cause before/with remediation).',
        ];

  const methodSteps =
    language === 'ar'
      ? [
          'جمع بيانات الحالة (الموقع، الصور، تقارير سابقة إن وجدت) + معاينة عند الحاجة',
          'تحديد الهدف: تثبيت/تقوية/معالجة تكهفات وتحديد نطاق العمل',
          'اختيار تقنية الحقن الأنسب للحالة والتنفيذ على مراحل مع مراقبة ميدانية',
          'تسليم المخرجات والتوصيات (وتحديث المسار إذا احتاجت الحالة كشف/دراسة داعمة)',
        ]
      : [
          'Collect case info (location, photos, prior reports if any) + site visit when needed',
          'Define the goal and scope: stabilization/strengthening/void treatment',
          'Select the right grouting method and execute in phases with on-site monitoring',
          'Deliver outputs and recommendations (and route to detection/surveys if needed)',
        ];

  const whenNotIdeal =
    language === 'ar'
      ? [
          'عند عدم وضوح السبب—قد نوصي أولاً بكشف التكهفات أو دراسة جيوفيزيائية',
          'عند وجود مشكلة إنشائية تتطلب حلول تدعيم إنشائي قبل أو بالتوازي مع المعالجة',
          'عند الحاجة لتحديد نطاق المشكلة بدقة قبل أي معالجة ميدانية',
        ]
      : [
          'When the root cause is unclear — we may recommend detection or a geophysical survey first',
          'When structural issues require underpinning/structural strengthening in parallel',
          'When you need to define the exact extent of the problem before field treatment',
        ];

  const faqs =
    language === 'ar'
      ? [
          {
            q: 'هل حقن التربة مناسب لكل الحالات؟',
            a: 'ليس بالضرورة. نحدد المسار الأنسب حسب المؤشرات ونوع التربة ونطاق المشكلة. أحيانًا يبدأ الحل بكشف التكهفات أو دراسة داعمة قبل الحقن.',
          },
          {
            q: 'هل يلزم كشف تكهفات أو دراسة جيوفيزيائية قبل الحقن؟',
            a: 'في حالات الاشتباه أو عدم وضوح السبب، نعم — الكشف/الدراسة يساعدان على تقليل المخاطر وتحديد نطاق العمل بدقة.',
          },
          {
            q: 'ماذا أجهز لكم لبدء التقييم؟',
            a: 'موقع المشروع/المدينة، وصف المشكلة، صور إن وجدت، وأي تقرير سابق. بعدها نحدد إن كانت تحتاج معاينة أو مسح داعم.',
          },
          {
            q: 'هل يسبب الحقن تعطيل كبير للموقع؟',
            a: 'نخطط التنفيذ على مراحل لتقليل التعطيل قدر الإمكان، ويختلف ذلك حسب حجم الموقع وطبيعة الأعمال.',
          },
          {
            q: 'ما الذي يستلمه العميل بعد التنفيذ؟',
            a: 'مخرجات واضحة حسب الحالة (خطة/نقاط وأعماق/توثيق تنفيذ عند الحاجة) + توصيات متابعة وخطوات لاحقة إن لزم.',
          },
        ]
      : [
          {
            q: 'Is grouting suitable for every case?',
            a: 'Not always. We choose the safest path based on indicators, soil, and scope. Some cases start with detection or a survey before grouting.',
          },
          {
            q: 'Do we need detection or geophysics before grouting?',
            a: 'When the cause/extent is unclear, yes — it reduces risk and improves scope accuracy.',
          },
          {
            q: 'What should I share for an initial assessment?',
            a: 'Project location, a short description, photos if available, and any prior reports. Then we decide if a visit or survey is needed.',
          },
          {
            q: 'Will grouting disrupt the site?',
            a: 'We execute in phases to minimize disruption. Impact depends on site size and access constraints.',
          },
          {
            q: 'What do I receive after execution?',
            a: 'Clear outputs per case (plan, injection points/depths, documentation when needed) plus follow-up recommendations.',
          },
        ];

  return (
    <>
      <SEO
        title={language === 'ar' ? 'حقن التربة (الحقن الأسمنتي) | شركة إطلاق المتميزة' : 'Soil Grouting | Etlaq'}
        description={
          language === 'ar'
            ? 'حلول حقن التربة والحقن الأسمنتي لتقوية التربة وملء التكهفات وتقليل مخاطر الهبوط. اطلب تقييم هندسي سريع.'
            : 'Soil grouting and cement injection to strengthen soil, fill voids, and reduce settlement risks. Request a fast assessment.'
        }
        url="https://etlaqksa.com/services/grouting"
      />

      <div className="w-full">
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 md:py-12">
          <div className="container">
            
          <div className="rounded-2xl border bg-card p-6 mb-8">
            <TrustStats />
          </div>
<div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Drill className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">{t('services.grouting')}</h1>
              </div>
              <p className="text-xl text-muted-foreground">
                <AutoLinkedText
                  text={
                    language === 'ar'
                      ? 'ننفذ حقن تربة احترافي (حقن أسمنتي) لتقوية التربة وملء التكهفات وتحسين الاستقرار—بخطة هندسية واضحة وتنفيذ منظم.'
                      : 'Professional soil grouting (cement injection) to strengthen soil, fill voids, and improve stability—with a clear engineering plan and structured execution.'
                  }
                />
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <LocalizedLink href="/request-service?service=grouting" className="inline-flex">
                  <Button className="gap-2">
                    <Timer className="h-4 w-4" />
                    {language === 'ar' ? 'اطلب تقييم سريع' : 'Request a quick assessment'}
                  </Button>
                </LocalizedLink>
                <LocalizedLink href="/projects" className="inline-flex">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    {language === 'ar' ? 'شاهد مشاريع مشابهة' : 'See similar projects'}
                  </Button>
                </LocalizedLink>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl">{language === 'ar' ? 'متى نوصي بحقن التربة؟' : 'When is grouting recommended?'}</CardTitle>
                  <CardDescription>
                    <AutoLinkedText
                      text={
                        language === 'ar'
                          ? 'عند وجود هبوط/تكهفات/ضعف بالتربة أو الحاجة لرفع معامل الأمان قبل تنفيذ أو بعد ظهور مؤشرات خطر.'
                          : 'When you suspect settlement/voids/weak soil, or need to increase safety before execution or after risk indicators appear.'
                      }
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-primary" />
                      {language === 'ar' ? 'منهجية العمل' : 'Method'}
                    </h3>
                    <ul className="space-y-2">
                      {methodSteps.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>
                            <AutoLinkedText text={b} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">{language === 'ar' ? 'أهم الفوائد' : 'Key benefits'}</h3>
                    <ul className="space-y-2">
                      {benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>
                            <AutoLinkedText text={b} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">{language === 'ar' ? 'التقنيات التي نستخدمها' : 'Techniques we use'}</h3>
                    <ul className="space-y-2">
                      {techniques.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>
                            <AutoLinkedText text={b} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">{language === 'ar' ? 'متى قد لا يكون الحقن الخيار الأول؟' : 'When grouting may not be the first step'}</h3>
                    <ul className="space-y-2">
                      {whenNotIdeal.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            <AutoLinkedText text={b} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {language === 'ar' ? 'مخرجات العمل' : 'Deliverables'}
                  </CardTitle>
                  <CardDescription>
                    <AutoLinkedText
                      text={language === 'ar' ? 'لتعزيز الثقة وتوثيق التنفيذ.' : 'To build trust and document execution.'}
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>
                          <AutoLinkedText text={d} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* PROCESS + FAQ */}
        <section className="py-10">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl">{language === 'ar' ? 'منهجية العمل' : 'Methodology'}</CardTitle>
                  <CardDescription>
                    <AutoLinkedText
                      text={
                        language === 'ar'
                          ? 'خطوات واضحة تقلل المخاطر وتساعدك على اتخاذ قرار سريع وواثق.'
                          : 'Clear steps that reduce risk and help you decide with confidence.'
                      }
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {processSteps.map((s, idx) => (
                    <div key={idx} className="rounded-2xl border bg-card/60 backdrop-blur p-4">
                      <div className="font-semibold">{idx + 1}. {s.title}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed mt-1">
                        <AutoLinkedText text={s.desc} />
                      </div>
                    </div>
                  ))}

                  <div className="text-sm text-muted-foreground">
                    <AutoLinkedText
                      text={
                        language === 'ar'
                          ? 'ملاحظة: نحدد الأسلوب والمواد وخطة التنفيذ بناءً على معطيات الموقع—وقد نوصي بخطوة تشخيص إضافية عند الحاجة.'
                          : 'Note: we choose method, materials, and plan based on site data—additional diagnosis may be recommended when needed.'
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{language === 'ar' ? 'متى نختار مسارًا آخر؟' : 'When to take a different route'}</CardTitle>
                  <CardDescription>
                    <AutoLinkedText text={language === 'ar' ? 'شفافية تساعد على بناء الثقة.' : 'Transparency builds trust.'} />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {whenNotRecommended.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">
                          <AutoLinkedText text={d} />
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <LocalizedLink href="/services/cavity" className="inline-flex w-full">
                      <Button variant="outline" className="w-full">
                        {language === 'ar' ? 'اطلع على كشف التكهفات' : 'View cavity detection'}
                      </Button>
                    </LocalizedLink>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 max-w-4xl mx-auto">
              <Card className="border-border/60 bg-card/70 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">{language === 'ar' ? 'أسئلة شائعة' : 'FAQ'}</CardTitle>
                  <CardDescription>
                    {language === 'ar'
                      ? 'إجابات سريعة على أكثر الأسئلة تكرارًا قبل طلب الخدمة.'
                      : 'Quick answers to common questions before requesting the service.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {faqs.map((f, i) => (
                      <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger>{f.q}</AccordionTrigger>
                        <AccordionContent>
                          <div className="text-muted-foreground leading-relaxed">
                            <AutoLinkedText text={f.a} />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-10 bg-muted/50">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h2 className="text-3xl font-bold">{language === 'ar' ? 'جاهز نبدأ؟' : 'Ready to start?'}</h2>
              <p className="text-muted-foreground text-lg">
                {language === 'ar'
                  ? 'أرسل تفاصيل موقعك وسنرجع لك بخطة وخطوة تالية واضحة.'
                  : 'Send your site details and we will reply with a clear plan and next step.'}
              </p>
              <LocalizedLink href="/request-service?service=grouting" className="inline-flex">
                <Button size="lg">{t('nav.request')}</Button>
              </LocalizedLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
