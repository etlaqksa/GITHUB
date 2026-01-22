import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SEO } from '@/components/SEO';
import TrustStats from '@/components/TrustStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, FileText, Search, ShieldAlert, Timer } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';

export default function ServiceCavity() {
  const { language, t } = useLanguage();

  const benefits =
    language === 'ar'
      ? [
          'تحديد التكهفات بدقة قبل حدوث هبوطات',
          'تقييم مستوى الخطر وتحديد الأولويات',
          'مخرجات خرائط/مخططات واضحة للموقع',
          'دعم قرار المعالجة (حقن/تدعيم/معالجة)',
        ]
      : [
          'Accurately locate cavities before settlement occurs',
          'Assess risk level and prioritize areas',
          'Clear maps/outputs for the site',
          'Support the right remediation decision (grouting / underpinning / treatment)',
        ];

  const techniques =
    language === 'ar'
      ? [
          'رادار اختراق الأرض (GPR)',
          'المسح الكهربائي (ERT)',
          'المسح السيزمي (Seismic)',
          'التحقق بالحفر الاستكشافي عند الحاجة',
        ]
      : [
          'Ground Penetrating Radar (GPR)',
          'Electrical Resistivity Tomography (ERT)',
          'Seismic survey',
          'Verification drilling when needed',
        ];

  const deliverables =
    language === 'ar'
      ? ['خطة مسح ومناطق التركيز', 'خرائط نتائج وقراءات', 'تقرير فني بالتفسير والتوصيات', 'اجتماع شرح مختصر للنتائج']
      : ['Survey plan & focus areas', 'Result maps and readings', 'Technical report with interpretation and recommendations', 'Short walkthrough meeting'];

  const processSteps =
    language === 'ar'
      ? [
          {
            title: 'تحديد النطاق والسياق',
            desc: 'نجمع معلومات الموقع (نوع المشروع/المشكلة/التاريخ) ونحدد نطاق المسح ومناطق التركيز.',
          },
          {
            title: 'مسح ميداني بتقنيات مناسبة',
            desc: 'اختيار الطريقة الأنسب (GPR/ERT/سيزمي) أو الدمج بينها بحسب طبيعة الموقع.',
          },
          {
            title: 'تفسير النتائج وتقييم المخاطر',
            desc: 'إخراج خرائط/مقاطع تفسيرية مع تقييم أولي لمستوى الخطر وأولويات المعالجة.',
          },
          {
            title: 'توصية بالخطوة التالية',
            desc: 'تحديد المسار الأنسب: معالجة/حقن/تحقق إضافي (عند الحاجة) مع مخرجات واضحة.',
          },
        ]
      : [
          {
            title: 'Scope & context',
            desc: 'We gather site context (project type, symptoms, history) and define focus areas.',
          },
          {
            title: 'Field survey with fit methods',
            desc: 'Select the best method (GPR/ERT/Seismic) or combine approaches based on the site.',
          },
          {
            title: 'Interpretation & risk view',
            desc: 'Generate maps/sections with an initial view of risk level and priorities.',
          },
          {
            title: 'Clear next step',
            desc: 'Recommend the next route: treatment/grouting/additional verification when needed.',
          },
        ];

  const faqs =
    language === 'ar'
      ? [
          {
            q: 'هل الكشف ضروري قبل الحقن؟',
            a: 'ليس دائمًا. عند الاشتباه بوجود تكهفات أو عدم وضوح سبب الهبوط/التشققات، الكشف يساعد على تقليل المخاطر وتحسين خطة المعالجة.',
          },
          {
            q: 'ما الذي سأستلمه بعد الكشف؟',
            a: 'مخرجات خرائط/مقاطع تفسيرية وتقرير مختصر بالتوصيات وخطوة تالية واضحة بحسب الحالة.',
          },
          {
            q: 'هل النتائج قطعية 100%؟',
            a: 'المسوحات تعطي مؤشرات قوية وتفسيرًا علميًا، وقد نوصي بتحقق إضافي (مثل حفر استكشافي) عندما تكون الحالة حساسة.',
          },
          {
            q: 'ماذا تحتاجون للبدء؟',
            a: 'موقع المشروع، وصف مختصر للمشكلة (متى بدأت؟ أين تظهر؟)، وأي صور/تقارير سابقة (اختياري).',
          },
          {
            q: 'كيف أطلب الخدمة؟',
            a: 'اضغط “اطلب تقييم سريع” واملأ البيانات الأساسية—وسنقترح عليك أنسب أسلوب كشف وخطوة تالية.',
          },
        ]
      : [
          {
            q: 'Is detection required before grouting?',
            a: 'Not always. When cavities are suspected or the root cause is unclear, detection reduces risk and improves the treatment plan.',
          },
          {
            q: 'What will I receive after the survey?',
            a: 'Interpretation maps/sections and a concise report with recommendations and a clear next step.',
          },
          {
            q: 'Are results 100% certain?',
            a: 'Surveys provide strong indicators and scientific interpretation. Additional verification may be recommended for sensitive cases.',
          },
          {
            q: 'What do you need to start?',
            a: 'Project location, brief symptom description, and any prior photos/reports (optional).',
          },
          {
            q: 'How do I request the service?',
            a: 'Click “Request a quick assessment” and submit the basics—we’ll recommend the best detection approach and next step.',
          },
        ];

  return (
    <>
      <SEO
        title={language === 'ar' ? 'كشف التكهفات | شركة إطلاق المتميزة' : 'Cavity & Void Detection | Etlaq'}
        description={
          language === 'ar'
            ? 'كشف التكهفات باستخدام تقنيات جيوفيزيائية مثل GPR وERT لتقييم المخاطر ووضع توصيات علاجية.'
            : 'Cavity and void detection using geophysical methods (GPR, ERT) to assess risk and recommend remediation.'
        }
        url="https://etlaqksa.com/services/cavity"
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
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">{t('services.cavity')}</h1>
              </div>
              <p className="text-xl text-muted-foreground">
                {language === 'ar'
                  ? 'نساعدك على كشف التكهفات تحت سطح الأرض قبل أن تتحول لمشكلة مكلفة—بمسح جيوفيزيائي مدروس ومخرجات واضحة.'
                  : 'We help you detect subsurface cavities before they turn into costly issues—through planned geophysical surveys and clear deliverables.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <LocalizedLink href="/request-service?service=cavity" className="inline-flex">
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
                  <CardTitle className="text-2xl">{language === 'ar' ? 'متى نوصي بالكشف؟' : 'When should you run detection?'} </CardTitle>
                  <CardDescription>
                    {language === 'ar'
                      ? 'عند ظهور هبوط مفاجئ، أو قبل أعمال حفر/تحميل، أو عند الشك بوجود تكهفات بسبب تسربات أو طبيعة الموقع.'
                      : 'When there is sudden settlement, before excavation/loading, or when cavities are suspected due to leaks or site conditions.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">{language === 'ar' ? 'أهم الفوائد' : 'Key benefits'}</h3>
                    <ul className="space-y-2">
                      {benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">{language === 'ar' ? 'التقنيات المستخدمة' : 'Techniques used'}</h3>
                    <ul className="space-y-2">
                      {techniques.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-primary" />
                    {language === 'ar' ? 'مخرجات العمل' : 'Deliverables'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'ar' ? 'لتوضيح المخاطر قبل اتخاذ قرار المعالجة.' : 'Clear outputs before remediation decisions.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{d}</span>
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
                  <CardTitle className="text-2xl">{language === 'ar' ? 'منهجية الكشف' : 'Detection methodology'}</CardTitle>
                  <CardDescription>
                    {language === 'ar'
                      ? 'خطوات واضحة لإخراج نتيجة مفهومة وتوصية عملية بالخطوة التالية.'
                      : 'Clear steps that produce understandable outputs and an actionable next step.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {processSteps.map((s, idx) => (
                    <div key={idx} className="rounded-2xl border bg-card/60 backdrop-blur p-4">
                      <div className="font-semibold">
                        {idx + 1}. {s.title}
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed mt-1">{s.desc}</div>
                    </div>
                  ))}

                  <div className="text-sm text-muted-foreground">
                    {language === 'ar'
                      ? 'نختار الطريقة/المزيج الأنسب حسب طبيعة الموقع، وقد نوصي بتحقق إضافي عند حساسية الحالة.'
                      : 'We select the best method/mix based on the site, with optional extra verification for sensitive cases.'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{language === 'ar' ? 'بعد الكشف… ما التالي؟' : 'After detection — what next?'}</CardTitle>
                  <CardDescription>
                    {language === 'ar'
                      ? 'نربط النتائج بالمعالجة المناسبة لتقليل المخاطر.'
                      : 'We connect results to the right remediation path to reduce risk.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {language === 'ar'
                      ? 'إذا كانت هناك مناطق اشتباه، نقترح مسارًا واضحًا: حقن تربة/معالجة أو تحقق إضافي عند الحاجة.'
                      : 'When risk zones exist, we recommend a clear route: grouting/treatment or extra verification when needed.'}
                  </div>
                  <LocalizedLink href="/services/grouting" className="inline-flex w-full">
                    <Button variant="outline" className="w-full">{language === 'ar' ? 'اطلع على حقن التربة' : 'View grouting'}</Button>
                  </LocalizedLink>
                  <LocalizedLink href="/request-service?service=cavity" className="inline-flex w-full">
                    <Button className="w-full">{language === 'ar' ? 'اطلب كشف التكهفات' : 'Request detection'}</Button>
                  </LocalizedLink>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 max-w-4xl mx-auto">
              <Card className="border-border/60 bg-card/70 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">{language === 'ar' ? 'أسئلة شائعة' : 'FAQ'}</CardTitle>
                  <CardDescription>
                    {language === 'ar'
                      ? 'إجابات سريعة على الأسئلة الأكثر تكرارًا قبل طلب الخدمة.'
                      : 'Quick answers to common questions before requesting the service.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {faqs.map((f, i) => (
                      <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger>{f.q}</AccordionTrigger>
                        <AccordionContent>
                          <div className="text-muted-foreground leading-relaxed">{f.a}</div>
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
              <h2 className="text-3xl font-bold">{language === 'ar' ? 'خطوتك التالية' : 'Your next step'}</h2>
              <p className="text-muted-foreground text-lg">
                {language === 'ar'
                  ? 'أرسل موقعك ووصف الحالة—ونقترح عليك أفضل أسلوب كشف وخطوة تالية.'
                  : 'Send your site and case description—then we recommend the best detection approach and next step.'}
              </p>
              <LocalizedLink href="/request-service?service=cavity" className="inline-flex">
                <Button size="lg">{t('nav.request')}</Button>
              </LocalizedLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}