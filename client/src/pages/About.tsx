import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Eye, Heart, Target, Users } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { cities } from '@/data/seoLocations';
import { trackEvent } from '@/lib/analytics';

export default function About() {
  const { language } = useLanguage();

  const values = [
    {
      icon: Award,
      title: language === 'ar' ? 'التميز' : 'Excellence',
      description:
        language === 'ar'
          ? 'نسعى دائماً لتقديم أعلى مستويات الجودة والاحترافية في جميع خدماتنا'
          : 'We always strive to deliver the highest levels of quality and professionalism in all our services',
    },
    {
      icon: Heart,
      title: language === 'ar' ? 'الأمانة' : 'Integrity',
      description:
        language === 'ar'
          ? 'نلتزم بالصدق والشفافية في تعاملاتنا مع عملائنا وشركائنا'
          : 'We commit to honesty and transparency in our dealings with clients and partners',
    },
    {
      icon: Users,
      title: language === 'ar' ? 'العمل الجماعي' : 'Teamwork',
      description:
        language === 'ar'
          ? 'نؤمن بقوة التعاون والعمل الجماعي لتحقيق أفضل النتائج'
          : 'We believe in the power of collaboration and teamwork to achieve the best results',
    },
    {
      icon: Target,
      title: language === 'ar' ? 'الابتكار' : 'Innovation',
      description:
        language === 'ar'
          ? 'نستخدم أحدث التقنيات والأساليب المبتكرة في حلولنا الهندسية'
          : 'We use the latest technologies and innovative methods in our engineering solutions',
    },
  ];

  const featuredCitySlugs = ['riyadh', 'jeddah', 'dammam', 'madinah', 'makkah', 'taif', 'qassim', 'hail', 'abha', 'tabuk'];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 md:py-10">
        <div className="container text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">{language === 'ar' ? 'من نحن' : 'About Us'}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar'
              ? 'شركة إطلاق المتميزة المحدودة - رواد حلول حقن التربة ومعالجة التكهفات في المملكة العربية السعودية'
              : 'ETLAQ Distinguished Company Ltd. - Leaders in soil grouting and cavity treatment solutions in Saudi Arabia'}
          </p>
        </div>
      </section>

      {/* Quick CTAs */}
      <section className="py-6">
        <div className="container">
          <div className="etlaq-card rounded-2xl border bg-card/70 backdrop-blur p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-start">
              <div className="font-semibold">
                {language === 'ar' ? 'تريد تفاصيل أكثر؟' : 'Want more details?'}
              </div>
              <div className="text-sm text-muted-foreground">
                {language === 'ar'
                  ? 'حمّل ملف الشركة أو اطلب تقييمًا هندسيًا وسيعود إليك مختص بخطوة واضحة.'
                  : 'Download our company profile or request an assessment—an engineer will reply with clear next steps.'}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href="https://wa.me/966534145922?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D9%85%D9%84%D9%81%20%D8%A8%D8%B1%D9%88%D9%81%D8%A7%D9%8A%D9%84%20%D8%B4%D8%B1%D9%83%D8%A9%20%D8%A5%D8%B7%D9%84%D8%A7%D9%82%20%D8%A7%D9%84%D9%85%D8%AA%D9%85%D9%8A%D8%B2%D8%A9%20%28Company%20Profile%29%20%D9%85%D9%86%20%D9%81%D8%B6%D9%84%D9%83."
                target="_blank"
                rel="noopener noreferrer"
                data-ga-intent="company_profile"
                data-ga-placement="about"
                className="inline-flex"
                onClick={() => trackEvent('about_profile_download', { language })}
              >
                <Button variant="secondary" className="w-full md:w-auto">
                  {language === 'ar' ? 'اطلب ملف الشركة' : 'Request company profile'}
                </Button>
              </a>
              <LocalizedLink href="/request-service" className="inline-flex">
                <Button className="w-full md:w-auto" onClick={() => trackEvent('about_request_click', { language })}>
                  {language === 'ar' ? 'اطلب خدمة' : 'Request service'}
                </Button>
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-10 md:py-10">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                {language === 'ar' ? 'قصتنا' : 'Our Story'}
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  {language === 'ar'
                    ? 'تقف شركة إطلاق المتميزة المحدودة تتويجاً لأكثر من 15 عاماً من الخبرة في مجالات كشف التكهفات الصخرية وحقن التربة، موحدة الآن تحت اسم واحد. بعد أن عملنا سابقاً تحت هويات مختلفة، قمنا بتسخير هذه الخبرة الواسعة لترسيخ أنفسنا كقوة رائدة في هذه المجالات المتخصصة.'
                    : 'ETLAQ Distinguished Company Ltd. stands as the culmination of over 15 years of experience in rock cavity detection and soil grouting, now unified under one name. Having previously operated under different identities, we have harnessed this extensive expertise to establish ourselves as a leading force in these specialized fields.'}
                </p>
                <p>
                  {language === 'ar'
                    ? 'نفخر بتقديم حلول مبتكرة وموثوقة لعملائنا في مختلف القطاعات، مع التزام ثابت بالجودة والسلامة والاستدامة في كل مشروع نتولاه.'
                    : 'We pride ourselves on delivering innovative and reliable solutions to our clients across various sectors, with an unwavering commitment to quality, safety, and sustainability in every project we undertake.'}
                </p>
              </div>
            </div>
            <div className="relative">
              <div
                className="aspect-video rounded-2xl border bg-card etlaq-card flex items-center justify-center"
                style={{
                  // Warm gold + engineering blue accent
                  ['--accent-rgb' as any]: '245 158 11',
                  ['--accent2-rgb' as any]: '37 99 235',
                }}
              >
                <div className="text-center space-y-2">
                  <div className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight">200+</div>
                  <div className="text-xl font-semibold">
                    {language === 'ar' ? 'مشروع ناجح' : 'Successful Projects'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-10 md:py-10 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{language === 'ar' ? 'رؤيتنا' : 'Our Vision'}</h3>
                <p className="text-lg text-muted-foreground">
                  {language === 'ar'
                    ? 'أن نقود الصناعة في كشف التكهفات الصخرية وحقن التربة، ووضع معايير جديدة في الدقة والاستقرار والاستدامة. نطمح إلى خلق مستقبل يكون فيه كل هيكل تحت الأرض بمثابة شهادة على البراعة البشرية والالتزام بعالم مرن أعلاه.'
                    : 'To lead the industry in rock cavity detection and soil grouting, setting new standards in precision, stability, and sustainability. We aspire to create a future where every underground structure serves as a testament to human ingenuity and commitment to a resilient world above.'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Target className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold">{language === 'ar' ? 'مهمتنا' : 'Our Mission'}</h3>
                <p className="text-lg text-muted-foreground">
                  {language === 'ar'
                    ? 'إعادة تعريف فن الاستقرار تحت أقدامنا. من خلال الابتكار والدقة والممارسات المستدامة، نحن ملتزمون بهندسة الأساسات التي تصمد أمام اختبار الزمن. رحلتنا مسترشدة بشغف التميز وفهم عميق للعالم المعقد أدناه.'
                    : 'To redefine the art of stability beneath our feet. Through innovation, precision, and sustainable practices, we are committed to engineering foundations that withstand the test of time. Our journey is guided by a passion for excellence and a deep understanding of the complex world below.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 md:py-10">
        <div className="container">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              {language === 'ar' ? 'قيمنا' : 'Our Values'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar'
                ? 'القيم التي توجه عملنا وتشكل ثقافتنا المؤسسية'
                : 'The values that guide our work and shape our corporate culture'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-10 md:py-10 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            {language === 'ar' ? 'مناطق خدماتنا' : 'Our Service Areas'}
          </h2>

          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            {language === 'ar' ? (
              <>
                نخدم مشاريع حقن التربة ومعالجة التكهفات في مختلف مناطق المملكة.{' '}
                <LocalizedLink
                  href="/locations"
                  className="underline underline-offset-4 hover:opacity-100 opacity-95 font-medium"
                >
                  عرض جميع المدن
                </LocalizedLink>
                .
              </>
            ) : (
              <>
                We deliver soil grouting and cavity treatment services across Saudi Arabia.{' '}
                <LocalizedLink
                  href="/locations"
                  className="underline underline-offset-4 hover:opacity-100 opacity-95 font-medium"
                >
                  View all cities
                </LocalizedLink>
                .
              </>
            )}
          </p>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-base md:text-lg">
            {featuredCitySlugs.map((slug, i) => {
              const c = cities.find((x) => x.slug === slug);
              if (!c) return null;
              return (
                <span key={slug} className="inline-flex items-center">
                  <LocalizedLink href={`/locations/${slug}`} className="hover:underline font-semibold">
                    {language === 'ar' ? c.ar : c.en}
                  </LocalizedLink>
                  {i < featuredCitySlugs.length - 1 ? <span className="mx-2 opacity-80">•</span> : null}
                </span>
              );
            })}
            <span className="inline-flex items-center">
              <span className="mx-2 opacity-80">•</span>
              <LocalizedLink href="/locations" className="hover:underline font-semibold">
                {language === 'ar' ? 'وجميع المدن الأخرى' : 'and all other cities'}
              </LocalizedLink>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

