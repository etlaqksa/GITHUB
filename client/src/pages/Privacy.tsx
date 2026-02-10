import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import { absUrl } from '@/lib/siteUrl';

const LAST_UPDATED = {
  ar: '10 فبراير 2026',
  en: 'February 10, 2026',
};

type Section = {
  heading: string;
  items: string[];
};

export default function Privacy() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const title = isAr ? 'سياسة الخصوصية | شركة إطلاق المتميزة' : 'Privacy Policy | ETLAQ';
  const description = isAr
    ? 'توضّح سياسة الخصوصية كيفية جمع واستخدام وحماية البيانات عند استخدام موقع شركة إطلاق المتميزة.'
    : 'This Privacy Policy explains how ETLAQ collects, uses, and protects data when you use our website.';
  const canonical = absUrl(`/${language}/privacy`);

  const sections: Section[] = isAr
    ? [
        {
          heading: '1) ما البيانات التي نجمعها؟',
          items: [
            'بيانات التواصل التي تقدمها عبر النماذج (مثل الاسم، رقم الهاتف، البريد الإلكتروني، المدينة، تفاصيل الطلب).',
            'بيانات تقنية عامة لتحسين الأداء والأمان (مثل عنوان IP، نوع المتصفح/الجهاز، الصفحات التي تمت زيارتها).',
            'بيانات قياس الاستخدام عبر أدوات التحليلات (مثل Google Analytics 4) والتي قد تستخدم ملفات تعريف الارتباط (Cookies) أو تقنيات مشابهة.',
          ],
        },
        {
          heading: '2) كيف نستخدم البيانات؟',
          items: [
            'للرد على استفساراتك وتقديم عروض/توصيات أولية وتحديد الخطوة التالية المناسبة.',
            'لتحسين تجربة المستخدم وأداء الموقع والمحتوى.',
            'للتحليلات وقياس التفاعل (بشكل مجمّع غالباً) لفهم ما يفضله الزوار.',
          ],
        },
        {
          heading: '3) مشاركة البيانات',
          items: [
            'قد نشارك البيانات مع مزودي خدمات موثوقين لتشغيل الموقع (مثل الاستضافة، نماذج Netlify، التحليلات) وبالقدر اللازم فقط.',
            'لن نبيع بياناتك لأطراف ثالثة.',
          ],
        },
        {
          heading: '4) الاحتفاظ بالبيانات',
          items: [
            'نحتفظ ببيانات الطلبات لمدة لازمة لأغراض المتابعة وخدمة العملاء والالتزام بالمتطلبات النظامية إن وُجدت.',
            'يمكنك طلب حذف بياناتك أو تحديثها بالتواصل معنا.',
          ],
        },
        {
          heading: '5) ملفات تعريف الارتباط (Cookies)',
          items: [
            'قد يستخدم الموقع ملفات تعريف الارتباط لتحسين الأداء وقياس الاستخدام.',
            'يمكنك التحكم بالكوكيز من إعدادات المتصفح، وقد يؤثر تعطيلها على بعض وظائف الموقع.',
          ],
        },
        {
          heading: '6) الأمان',
          items: [
            'نطبق إجراءات تنظيمية وتقنية معقولة لحماية البيانات من الوصول غير المصرح به أو التغيير أو الفقد.',
            'رغم ذلك، لا يمكن ضمان أمان 100% لأي نظام متصل بالإنترنت.',
          ],
        },
        {
          heading: '7) خصوصية الأطفال',
          items: [
            'الموقع غير موجه للأطفال دون السن النظامي، ولا نجمع عمداً بياناتهم.',
          ],
        },
        {
          heading: '8) تحديثات السياسة',
          items: [
            'قد نقوم بتحديث هذه السياسة من وقت لآخر، وسيتم نشر النسخة المحدثة على هذه الصفحة.',
          ],
        },
        {
          heading: '9) تواصل معنا',
          items: [
            'للاستفسارات أو طلبات الوصول/التحديث/الحذف المتعلقة ببياناتك، تواصل معنا عبر صفحة “تواصل معنا”.',
          ],
        },
      ]
    : [
        {
          heading: '1) Data we collect',
          items: [
            'Contact details you submit through forms (e.g., name, phone number, email, city, request details).',
            'General technical data to improve performance and security (e.g., IP address, browser/device type, pages visited).',
            'Usage analytics via tools such as Google Analytics 4, which may use cookies or similar technologies.',
          ],
        },
        {
          heading: '2) How we use data',
          items: [
            'To respond to your inquiries and provide initial recommendations/quotations and next steps.',
            'To improve user experience, website performance, and content quality.',
            'To measure engagement and understand what visitors find useful (often in aggregated form).',
          ],
        },
        {
          heading: '3) Data sharing',
          items: [
            'We may share data with trusted service providers required to operate the website (e.g., hosting, Netlify Forms, analytics) only as necessary.',
            'We do not sell your personal data to third parties.',
          ],
        },
        {
          heading: '4) Data retention',
          items: [
            'We retain inquiry data as needed for follow-up, customer service, and compliance with applicable requirements (if any).',
            'You may request to update or delete your data by contacting us.',
          ],
        },
        {
          heading: '5) Cookies',
          items: [
            'The website may use cookies to improve performance and measure usage.',
            'You can control cookies via your browser settings; disabling them may affect certain site features.',
          ],
        },
        {
          heading: '6) Security',
          items: [
            'We apply reasonable organizational and technical safeguards to protect data from unauthorized access, alteration, or loss.',
            'However, no internet-connected system can be guaranteed 100% secure.',
          ],
        },
        {
          heading: '7) Children’s privacy',
          items: [
            'This website is not intended for children under the applicable legal age, and we do not knowingly collect their data.',
          ],
        },
        {
          heading: '8) Policy updates',
          items: [
            'We may update this policy from time to time. The latest version will be posted on this page.',
          ],
        },
        {
          heading: '9) Contact us',
          items: [
            'For questions or requests regarding access/update/deletion of your data, please reach out through the Contact page.',
          ],
        },
      ];

  return (
    <>
      <SEO title={title} description={description} url={canonical} image={absUrl('/og-image.webp')} type="website" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {isAr ? `آخر تحديث: ${LAST_UPDATED.ar}` : `Last updated: ${LAST_UPDATED.en}`}
            </p>

            <div className="mt-6 space-y-5">
              {sections.map((s) => (
                <Card key={s.heading}>
                  <CardHeader>
                    <CardTitle className="text-lg">{s.heading}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc ps-5 space-y-2 text-sm leading-relaxed">
                      {s.items.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between items-start">
              <LocalizedLink href="/terms" className="inline-flex">
                <Button variant="outline">{isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}</Button>
              </LocalizedLink>

              <LocalizedLink href="/contact" className="inline-flex">
                <Button>{isAr ? 'تواصل معنا' : 'Contact us'}</Button>
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
