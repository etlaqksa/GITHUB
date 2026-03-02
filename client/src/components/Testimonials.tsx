import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Quote } from 'lucide-react';
import { useState } from 'react';

interface Testimonial {
  id: number;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  companyAr: string;
  companyEn: string;
  textAr: string;
  textEn: string;
  rating: number;
  project?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    nameAr: 'م. سعد الغامدي',
    nameEn: 'Eng. Saad Al-Ghamdi',
    roleAr: 'مدير المشاريع',
    roleEn: 'Projects Director',
    companyAr: 'شركة ريكين للعقارات',
    companyEn: 'Rakeen Real Estate',
    textAr: 'قدّمت شركة إطلاق خدمة احترافية عالية المستوى في مشروع تقوية أساسات مجمعنا السكني. التقارير كانت دقيقة والفريق متعاون جداً في شرح كل خطوة. نتيجة ممتازة وفي الوقت المحدد.',
    textEn: 'ETLAQ delivered highly professional service in our residential complex foundation strengthening project. Reports were precise and the team was very cooperative in explaining each step. Excellent results delivered on time.',
    rating: 5,
    project: 'مجمع سكني - الرياض',
  },
  {
    id: 2,
    nameAr: 'م. أحمد العتيبي',
    nameEn: 'Eng. Ahmed Al-Otaibi',
    roleAr: 'مهندس جيوتقني',
    roleEn: 'Geotechnical Engineer',
    companyAr: 'شركة يوكسل للإنشاءات',
    companyEn: 'Yuksel Construction',
    textAr: 'تعاملنا مع إطلاق في مشاريع عدة لكشف الفراغات والتكهفات. دقة الأجهزة والمنهجية العلمية المتبعة كانت رائعة. لا أتردد في التوصية بهم لأي مشروع جيوتقني.',
    textEn: 'We worked with ETLAQ on several void and cavity detection projects. The precision of equipment and scientific methodology was excellent. I don\'t hesitate to recommend them for any geotechnical project.',
    rating: 5,
    project: 'مشاريع بنية تحتية - الدمام',
  },
  {
    id: 3,
    nameAr: 'م. فيصل الشمري',
    nameEn: 'Eng. Faisal Al-Shammari',
    roleAr: 'المدير الفني',
    roleEn: 'Technical Director',
    companyAr: 'شركة الأسس المتحدة',
    companyEn: 'Al-Asees Contracting',
    textAr: 'المسوحات الجيوفيزيائية التي أجرتها إطلاق كانت نقطة تحوّل في مشروعنا. التقرير النهائي احتوى على معلومات تفصيلية جداً ساعدت في اتخاذ القرارات الهندسية الصحيحة بثقة عالية.',
    textEn: 'The geophysical surveys conducted by ETLAQ were a turning point in our project. The final report contained very detailed information that helped make correct engineering decisions with high confidence.',
    rating: 5,
    project: 'مشروع بنية تحتية - جدة',
  },
];

export default function Testimonials({ className = '' }: { className?: string }) {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);

  const t = testimonials[active];

  return (
    <section className={className} aria-label={language === 'ar' ? 'آراء العملاء' : 'Client Testimonials'}>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
          <Star className="h-3.5 w-3.5 fill-current" />
          {language === 'ar' ? 'يثق بنا المحترفون' : 'Trusted by Professionals'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm">
          {language === 'ar'
            ? 'نفخر بثقة كبرى الشركات الإنشائية والمطورين العقاريين في المملكة العربية السعودية'
            : 'We are proud to be trusted by leading construction companies and real estate developers across Saudi Arabia'}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Main testimonial card */}
        <div className="relative bg-card border border-border/60 rounded-2xl p-7 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
          <Quote className="absolute top-6 left-6 rtl:right-6 rtl:left-auto h-8 w-8 text-primary/15" aria-hidden="true" />

          {/* Stars */}
          <div className="flex items-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={"h-4 w-4 " + (i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-muted')}
              />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-base sm:text-lg leading-relaxed text-foreground/85 mb-7">
            "{language === 'ar' ? t.textAr : t.textEn}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                {(language === 'ar' ? t.nameAr : t.nameEn).charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">{language === 'ar' ? t.nameAr : t.nameEn}</p>
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' ? t.roleAr : t.roleEn}
                  {' — '}
                  {language === 'ar' ? t.companyAr : t.companyEn}
                </p>
              </div>
            </div>
            {t.project && (
              <div className="text-xs bg-muted px-3 py-1.5 rounded-full text-muted-foreground">
                📍 {t.project}
              </div>
            )}
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={"h-2 rounded-full transition-all duration-300 " + (
                i === active
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-border hover:bg-muted-foreground'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
