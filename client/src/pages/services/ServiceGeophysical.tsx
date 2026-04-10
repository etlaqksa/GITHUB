import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SEO } from '@/components/SEO';
import TrustStats from '@/components/TrustStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, FileText, Radar, SlidersHorizontal, Timer } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import AutoLinkedText from '@/components/AutoLinkedText';

export default function ServiceGeophysical() {
  const { language, t } = useLanguage();

  const useCases =
    language === 'ar'
      ? ['تقييم موقع قبل بناء/حفر', 'تشخيص سبب هبوط/انهيارات موضعية', 'تحديد نطاق التكهفات قبل المعالجة', 'التحقق بعد الحقن (حسب الحالة)']
      : ['Pre-construction/excavation assessment', 'Diagnose causes of local settlement/collapse', 'Define void extent before remediation', 'Post-grouting verification (case-dependent)'];

  const methods =
    language === 'ar'
      ? ['GPR (رادار اختراق الأرض)', 'ERT (المقاومة الكهربائية)', 'Seismic (سيزمي/انكسار)', 'دمج أكثر من طريقة عند الحاجة']
      : ['GPR (Ground Penetrating Radar)', 'ERT (Electrical Resistivity)', 'Seismic methods', 'Multi-method integration when needed'];

  const deliverables =
    language === 'ar'
      ? ['خطة مسح ونطاق عمل', 'خرائط/مقاطع تفسيرية', 'تقرير فني وتوصيات', 'اجتماع شرح النتائج']
      : ['Scope & survey plan', 'Interpretation maps/sections', 'Technical report & recommendations', 'Results briefing'];

  const processSteps =
    language === 'ar'
      ? [
          {
            title: 'تحديد الهدف ونطاق الدراسة',
            desc: 'نحدد ما الذي نريد التأكد منه (تكهفات/طبقات ضعيفة/تقييم موقع) ونرسم حدود المسح.',
          },
          {
            title: 'اختيار الطريقة المناسبة',
            desc: 'نختار GPR أو ERT أو سيزمي (أو دمج) حسب طبيعة التربة والعمق المطلوب ودقة النتائج.',
          },
          {
            title: 'تنفيذ ميداني وتفسير',
            desc: 'تنفيذ منظم ثم تفسير النتائج لإخراج خرائط/مقاطع قابلة للاستخدام في القرار والتنفيذ.',
          },
          {
            title: 'توصية بالخطوة التالية',
            desc: 'نربط النتائج بخطة عمل: كشف مركز/حقن/معالجة/تحقق إضافي عند الحاجة.',
          },
        ]
      : [
          {
            title: 'Define objective & scope',
            desc: 'We define what to confirm (cavities/weak zones/site assessment) and set boundaries.',
          },
          {
            title: 'Select the right method',
            desc: 'Choose GPR/ERT/seismic (or combine) based on soil, target depth, and needed resolution.',
          },
          {
            title: 'Field work & interpretation',
            desc: 'Structured field execution followed by interpretation for actionable maps/sections.',
          },
          {
            title: 'Recommend next step',
            desc: 'Connect results to a clear route: focused detection, grouting, treatment, or extra verification.',
          },
        ];

  const faqs =
    language === 'ar'
      ? [
          {
            q: 'هل الدراسة الجيوفيزيائية بديل عن فحص التربة؟',
            a: 'هي أداة تشخيص داعمة تُستخدم بحسب الحالة والهدف. قد نوصي بها لتقليل عدم اليقين قبل المعالجة أو لتحديد نطاق التكهفات.',
          },
          {
            q: 'كيف تختارون بين GPR وERT والسيزمي؟',
            a: 'الاختيار يعتمد على عمق الهدف، طبيعة التربة، وجود عوائق بالموقع، ومستوى الدقة المطلوب. أحيانًا دمج طريقتين يعطي نتيجة أفضل.',
          },
          {
            q: 'هل النتائج قطعية؟',
            a: 'المخرجات تُفسر علميًا وتُعرض بوضوح. وفي الحالات الحساسة قد نوصي بتحقق إضافي لرفع اليقين قبل قرار مكلف.',
          },
          {
            q: 'متى تربطون الدراسة بحقن التربة؟',
            a: 'عند وجود مؤشرات تكهفات/ضعف تحت الأساسات أو الحاجة لتحديد نطاق المعالجة قبل الحقن—فتساعد الدراسة على ضبط الخطة وتقليل المخاطر.',
          },
          {
            q: 'ما الذي تحتاجونه للبدء؟',
            a: 'موقع المشروع، هدف الدراسة (ماذا تريد التأكد منه)، وأي معلومات/صور/تقارير سابقة إن وجدت (اختياري).',
          },
        ]
      : [
          {
            q: 'Is geophysics a replacement for soil testing?',
            a: 'It is a supportive diagnostic tool used case-by-case. It can reduce uncertainty before treatment or define cavity extent.',
          },
          {
            q: 'How do you choose between GPR, ERT, and seismic?',
            a: 'It depends on target depth, soil type, site constraints, and required resolution. Sometimes combining methods is best.',
          },
          {
            q: 'Are results definitive?',
            a: 'Outputs are interpreted scientifically and presented clearly. For sensitive cases, extra verification can be recommended.',
          },
          {
            q: 'How does it connect to grouting?',
            a: 'When cavities/weak zones are suspected or scope needs definition before grouting—geophysics helps refine the plan and reduce risk.',
          },
          {
            q: 'What do you need to start?',
            a: 'Location, objective, and any prior photos/reports if available (optional).',
          },
        ];

  // Build FAQPage schema for rich snippets in Google Search.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <SEO
        title={language === 'ar' ? 'الدراسات الجيوفيزيائية | شركة إطلاق المتميزة' : 'Geophysical Surveys | Etlaq'}
        description={
          language === 'ar'
            ? 'دراسات جيوفيزيائية (GPR/ERT/Seismic) لتقييم المخاطر والكشف عن التكهفات والطبقات الضعيفة ودعم قرار المعالجة.'
            : 'Geophysical surveys (GPR/ERT/Seismic) to assess risk, locate voids/weak zones, and support remediation decisions.'
        }
        url="https://etlaqksa.com/services/geophysical"
        image="https://etlaqksa.com/og-geophysical-surveys.webp"
        schema={faqSchema}
      />

      <div className="w-full" style={{ ['--accent-rgb' as any]: '99 102 241' }}>
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 md:py-12">
          <div className="container">
            
          <div className="etlaq-card rounded-2xl border bg-card p-6 mb-8">
            <TrustStats />
          </div>
<div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Radar className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">{t('services.geophysical')}</h1>
              </div>
              <p className="text-xl text-muted-foreground">
                <AutoLinkedText
                  text={
                    language === 'ar'
                      ? 'نقدم مسوحات ودراسات جيوفيزيائية تساعد على فهم ما تحت سطح الأرض بدقة—لتقليل المخاطر واتخاذ قرار هندسي صحيح.'
                      : 'Geophysical surveys to understand subsurface conditions—reducing risk and enabling the right engineering decision.'
                  }
                />
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <LocalizedLink href="/request-service?service=geophysical" className="inline-flex">
                  <Button className="gap-2">
                    <Timer className="h-4 w-4" />
                    {language === 'ar' ? 'اطلب دراسة/مسح' : 'Request a survey'}
                  </Button>
                </LocalizedLink>
                <LocalizedLink href="/services/cavity" className="inline-flex">
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    {language === 'ar' ? 'كشف التكهفات' : 'Cavity detection'}
                  </Button>
                </LocalizedLink>
                <LocalizedLink href="/projects" className="inline-flex">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    {language === 'ar' ? 'المشاريع' : 'Projects'}
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
                  <CardTitle className="text-2xl">{language === 'ar' ? 'متى تحتاج دراسة جيوفيزيائية؟' : 'When do you need geophysics?'}</CardTitle>
                  <CardDescription>
                    <AutoLinkedText
                      text={
                        language === 'ar'
                          ? 'قبل اتخاذ قرار معالجات مكلفة، أو عندما تكون المؤشرات غير واضحة وتحتاج تشخيص علمي مدعوم بالبيانات.'
                          : 'Before expensive remediation decisions, or when indicators are unclear and you need data-driven diagnosis.'
                      }
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">{language === 'ar' ? 'أبرز الاستخدامات' : 'Typical use cases'}</h3>
                    <ul className="space-y-2">
                      {useCases.map((b, i) => (
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
                    <h3 className="font-semibold mb-3">{language === 'ar' ? 'طرق المسح' : 'Methods'}</h3>
                    <ul className="space-y-2">
                      {methods.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>
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
                  <CardTitle className="text-2xl">{language === 'ar' ? 'مخرجات الدراسة' : 'Deliverables'}</CardTitle>
                  <CardDescription>
                    <AutoLinkedText
                      text={language === 'ar' ? 'مخرجات قابلة للاستخدام في القرار والتنفيذ.' : 'Actionable outputs for decisions and execution.'}
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
                  <CardTitle className="text-2xl">{language === 'ar' ? 'كيف نُجري الدراسة' : 'How we run the survey'}</CardTitle>
                  <CardDescription>
                    <AutoLinkedText
                      text={
                        language === 'ar'
                          ? 'منهجية بسيطة وواضحة لإخراج قرار مدعوم بالبيانات.'
                          : 'A simple, clear method to reach a data-backed decision.'
                      }
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {processSteps.map((s, idx) => (
                    <div key={idx} className="etlaq-card rounded-2xl border bg-card/60 backdrop-blur p-4">
                      <div className="font-semibold">
                        {idx + 1}. {s.title}
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed mt-1">
                        <AutoLinkedText text={s.desc} />
                      </div>
                    </div>
                  ))}

                  <div className="text-sm text-muted-foreground">
                    <AutoLinkedText
                      text={
                        language === 'ar'
                          ? 'نهدف إلى تقليل عدم اليقين قبل اتخاذ قرار مكلف—وقد يكون الناتج توصية بكشف مركز أو خطة حقن/معالجة.'
                          : 'Goal: reduce uncertainty before costly action—outputs can include focused detection or a grouting/treatment plan.'
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{language === 'ar' ? 'ربط النتائج بالحل' : 'Connect results to action'}</CardTitle>
                  <CardDescription>
                    <AutoLinkedText
                      text={
                        language === 'ar'
                          ? 'الدراسة لا تنتهي عند الخرائط—بل عند توصية عملية.'
                          : 'Not just maps—actionable recommendations.'
                      }
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <AutoLinkedText
                      text={
                        language === 'ar'
                          ? 'قد ننصح بكشف التكهفات لتحديد نقاط حساسة، أو حقن التربة لتقوية التربة/معالجة التكهفات بحسب النتائج.'
                          : 'We may recommend focused detection, or grouting/treatment depending on the findings.'
                      }
                    />
                  </div>
                  <LocalizedLink href="/services/cavity" className="inline-flex w-full">
                    <Button variant="outline" className="w-full">{language === 'ar' ? 'كشف التكهفات' : 'Cavity detection'}</Button>
                  </LocalizedLink>
                  <LocalizedLink href="/services/grouting" className="inline-flex w-full">
                    <Button variant="outline" className="w-full">{language === 'ar' ? 'حقن التربة' : 'Grouting'}</Button>
                  </LocalizedLink>
                  <LocalizedLink href="/request-service?service=geophysical" className="inline-flex w-full">
                    <Button className="w-full">{language === 'ar' ? 'اطلب الدراسة' : 'Request the survey'}</Button>
                  </LocalizedLink>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 max-w-4xl mx-auto">
              <Card className="border-border/60 bg-card/70 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">{language === 'ar' ? 'أسئلة شائعة' : 'FAQ'}</CardTitle>
                  <CardDescription>
                    <AutoLinkedText
                      text={
                        language === 'ar'
                          ? 'إجابات تساعدك تفهم متى نحتاج الجيوفيزياء وكيف نستفيد منها.'
                          : 'Answers on when geophysics helps and how to use it.'
                      }
                    />
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
              <h2 className="text-3xl font-bold">{language === 'ar' ? 'ابدأ بخطوة صحيحة' : 'Start with the right step'}</h2>
              <p className="text-muted-foreground text-lg">
                <AutoLinkedText
                  text={
                    language === 'ar'
                      ? 'شارك موقع المشروع ووصف الحالة—وسنحدد لك أفضل طريقة مسح وخطوة تالية.'
                      : 'Share project location and case description—then we recommend the best survey method and next step.'
                  }
                />
              </p>
              <LocalizedLink href="/request-service?service=geophysical" className="inline-flex">
                <Button size="lg">{t('nav.request')}</Button>
              </LocalizedLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
