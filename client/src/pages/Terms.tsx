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

export default function Terms() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const title = isAr ? 'الشروط والأحكام | شركة إطلاق المتميزة' : 'Terms & Conditions | ETLAQ';
  const description = isAr
    ? 'الشروط والأحكام التي تنظم استخدام موقع شركة إطلاق المتميزة المحدودة وخدماته.'
    : 'Terms and conditions governing the use of ETLAQ Distinguished Company website and services.';
  const canonical = absUrl(`/${language}/terms`);

  const sections: Section[] = isAr
    ? [
        {
          heading: '1) نطاق الاستخدام',
          items: [
            'باستخدامك لهذا الموقع فأنت توافق على الالتزام بهذه الشروط والأحكام.',
            'يُقصد بـ“الشركة” شركة إطلاق المتميزة المحدودة، وبـ“الموقع” جميع صفحات etlaqksa.com باللغتين العربية والإنجليزية.',
          ],
        },
        {
          heading: '2) المعلومات الهندسية وإخلاء المسؤولية',
          items: [
            'المحتوى المنشور لأغراض معلوماتية عامة ولا يُعد بديلاً عن المعاينة الميدانية أو التحقيقات الجيوتقنية أو تصميم مهندس مختص.',
            'القرارات الهندسية يجب أن تعتمد على بيانات الموقع الفعلية (فحوصات/جسات/تقارير) ومراجعة استشاري معتمد عند الحاجة.',
          ],
        },
        {
          heading: '3) طلب الخدمات والتواصل',
          items: [
            'نماذج “طلب خدمة” أو “تواصل معنا” تُستخدم لإرسال بياناتك للشركة كي نتواصل معك ونقترح الخطوات التالية.',
            'قد نطلب معلومات إضافية (موقع المشروع، نوع المشكلة، صور، تقارير) قبل تقديم عرض أو توصية تنفيذ.',
          ],
        },
        {
          heading: '4) حقوق الملكية الفكرية',
          items: [
            'جميع النصوص والتصاميم والهوية البصرية والصور والمواد المنشورة بالموقع مملوكة للشركة أو مرخصة لها، ولا يجوز نسخها أو إعادة نشرها دون إذن خطي.',
          ],
        },
        {
          heading: '5) الروابط الخارجية',
          items: [
            'قد يحتوي الموقع على روابط لمواقع خارجية. نحن غير مسؤولين عن محتواها أو سياسات الخصوصية فيها.',
          ],
        },
        {
          heading: '6) حدود المسؤولية',
          items: [
            'نحاول تقديم معلومات دقيقة ومحدثة، ومع ذلك لا نضمن خلو المحتوى من الأخطاء.',
            'لا تتحمل الشركة مسؤولية أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو الاعتماد على محتواه دون تقييم هندسي مناسب.',
          ],
        },
        {
          heading: '7) التعديلات',
          items: [
            'قد نقوم بتحديث هذه الشروط من وقت لآخر. استمرارك في استخدام الموقع بعد التحديث يعني موافقتك على النسخة المحدثة.',
          ],
        },
        {
          heading: '8) القانون والاختصاص',
          items: [
            'تخضع هذه الشروط لأنظمة المملكة العربية السعودية، ويكون الاختصاص القضائي للمحاكم المختصة داخل المملكة.',
          ],
        },
        {
          heading: '9) التواصل',
          items: [
            'لأي استفسارات حول الشروط والأحكام، تواصل معنا عبر صفحة “تواصل معنا”.',
          ],
        },
      ]
    : [
        {
          heading: '1) Scope',
          items: [
            'By using this website, you agree to these Terms & Conditions.',
            '“Company” refers to ETLAQ Distinguished Company. “Website” refers to etlaqksa.com (Arabic and English pages).',
          ],
        },
        {
          heading: '2) Engineering content disclaimer',
          items: [
            'All content is provided for general informational purposes and is not a substitute for site inspection, geotechnical investigation, or professional design.',
            'Engineering decisions should be based on actual site data (tests/reports) and reviewed by a qualified consultant when needed.',
          ],
        },
        {
          heading: '3) Service requests & communications',
          items: [
            'Request/Contact forms are used to send your details so the Company can respond and propose next steps.',
            'We may request additional information (site location, problem description, photos, reports) before providing a quotation or recommendation.',
          ],
        },
        {
          heading: '4) Intellectual property',
          items: [
            'All content, branding, visuals, and materials on this website are owned by or licensed to the Company and may not be reproduced without written permission.',
          ],
        },
        {
          heading: '5) External links',
          items: [
            'The website may include links to third-party sites. We are not responsible for their content or privacy practices.',
          ],
        },
        {
          heading: '6) Limitation of liability',
          items: [
            'We strive for accuracy and timely updates, but we do not guarantee that the content is error-free.',
            'The Company is not liable for any direct or indirect damages arising from website use or from reliance on website content without proper engineering assessment.',
          ],
        },
        {
          heading: '7) Updates',
          items: [
            'We may update these Terms from time to time. Continued use after updates means you accept the updated version.',
          ],
        },
        {
          heading: '8) Governing law',
          items: [
            'These Terms are governed by the laws and regulations of the Kingdom of Saudi Arabia, and disputes fall under the jurisdiction of competent courts in the Kingdom.',
          ],
        },
        {
          heading: '9) Contact',
          items: [
            'If you have questions about these Terms & Conditions, please reach out through the Contact page.',
          ],
        },
      ];

  return (
    <>
      <SEO title={title} description={description} url={canonical} image={absUrl('/og-image.webp')} type="website" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">{isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}</h1>
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
              <LocalizedLink href="/privacy" className="inline-flex">
                <Button variant="outline">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</Button>
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
