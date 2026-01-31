import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
import { useState } from 'react';

/**
 * A short conversion-focused form that posts to Netlify Forms.
 * It reduces friction: name + phone + city + message.
 */
export default function QuickRequestCard({ formName = 'quick_assessment' }: { formName?: string }) {
  const { language } = useLanguage();
  const lang = language === 'en' ? 'en' : 'ar';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const labels = {
    title: lang === 'ar' ? 'اطلب تقييم سريع (مختصر)' : 'Request a quick assessment (short)',
    name: lang === 'ar' ? 'الاسم' : 'Name',
    phone: lang === 'ar' ? 'رقم الجوال' : 'Phone',
    city: lang === 'ar' ? 'المدينة' : 'City',
    message: lang === 'ar' ? 'وصف مختصر للمشكلة' : 'Short description',
    submit: lang === 'ar' ? 'إرسال الطلب' : 'Submit request',
    hint:
      lang === 'ar'
        ? 'سنراجع المعلومات ونرد بخطوة تالية واضحة (تقييم/فحص/خطة تنفيذ).'
        : 'We’ll review and respond with clear next steps (assessment/inspection/plan).',
  };

  // Netlify form encode
  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key] ?? ''))
      .join('&');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('quick_request_submit_attempt', { language: lang });

    const payload: Record<string, string> = {
      'form-name': formName,
      name,
      phone,
      city,
      message,
    };

    try {
      const submitUrl = typeof window !== 'undefined' ? window.location.pathname : '/';


      await fetch(submitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      });
      trackEvent('quick_request_submit_success', { language: lang });
      // redirect to thank you (localized)
      window.location.href = lang === 'ar' ? '/ar/thank-you' : '/en/thank-you';
    } catch (err) {
      trackEvent('quick_request_submit_error', { language: lang });
      alert(lang === 'ar' ? 'تعذر الإرسال. حاول مرة أخرى.' : 'Submission failed. Please try again.');
    }
  };

  return (
    <Card className="rounded-2xl border">
      <CardHeader>
        <CardTitle className="text-lg">{labels.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{labels.hint}</p>

        <form
          name={formName}
          method="POST"
                  encType="multipart/form-data"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={onSubmit}
        >
          <input type="hidden" name="form-name" value={formName} />
          <input type="hidden" name="bot-field" />

          <div className="grid gap-3">
            <Input value={name} onChange={(e) => setName(e.target.value)} name="name" required placeholder={labels.name} />
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" required placeholder={labels.phone} />
            <Input value={city} onChange={(e) => setCity(e.target.value)} name="city" placeholder={labels.city} />
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} name="message" placeholder={labels.message} rows={4} />
            <Button type="submit" className="w-full">{labels.submit}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
