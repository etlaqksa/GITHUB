import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { IconEmail, IconLocation, IconPhone } from '@/components/icons/etlaq';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLocation } from 'wouter';
import { trackEvent } from '@/lib/analytics';

function encodeForm(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k] ?? ''))
    .join('&');
}


export default function Contact() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [attachmentError, setAttachmentError] = useState<string>('');
  const MAX_FILE_SIZE_MB = 10;
  const MAX_TOTAL_SIZE_MB = 10;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      trackEvent('form_submit_attempt', { form: 'contact', language });
      const page = typeof window !== 'undefined' ? window.location.href : '';
      const referrer = typeof document !== 'undefined' ? document.referrer : '';
      // Netlify Forms + optional attachments (FormData)
      const payload = new FormData();
      payload.append('form-name', 'contact');
      payload.append('page', page);
      payload.append('referrer', referrer);
      payload.append('bot-field', '');
      // honeypot: if filled by bot, silently reject
      const honeypot = (document.getElementById('contact_website') as HTMLInputElement)?.value;
      if (honeypot) { setIsSubmitting(false); return; }
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('subject', formData.subject);
      payload.append('message', formData.message);

      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
        const v = params.get(k);
        if (v) payload.append(k, v);
      });

      if (attachments && attachments.length) {
        Array.from(attachments).forEach((file) => payload.append('attachments', file));
      }

      const submitUrl = typeof window !== 'undefined' ? window.location.pathname : '/';
      const res = await fetch(submitUrl, {
        method: 'POST',
        body: payload,
      });

      if (!res.ok) throw new Error('Netlify form submit failed');

      toast.success(language === 'ar' ? 'تم إرسال رسالتك بنجاح' : 'Message sent successfully');
      trackEvent('form_submit_success', { form: 'contact', language });

      // Conversion events (GA4)
      trackEvent('lead_contact_form', {
        language,
        method: 'netlify',
        page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
        page_location: typeof window !== 'undefined' ? window.location.href : undefined,
      });
      trackEvent('generate_lead', {
        lead_type: 'contact_form',
        form_name: 'contact',
        method: 'netlify',
        language,
        page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
        page_location: typeof window !== 'undefined' ? window.location.href : undefined,
      });

      setLocation(`/thank-you?form=contact`);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setAttachments(null);
    } catch {
      toast.error(language === 'ar' ? 'تعذر إرسال الرسالة، حاول مرة أخرى' : 'Failed to send message, please try again');
      trackEvent('form_submit_error', { form: 'contact', language });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: IconPhone,
      title: language === 'ar' ? 'الهاتف' : 'Phone',
      value: '+966534145922',
      link: 'tel:+966534145922',
    },
    {
      icon: IconEmail,
      title: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      value: 'etlaqksa@gmail.com',
      link: 'mailto:etlaqksa@gmail.com',
    },
    {
      icon: IconLocation,
      title: language === 'ar' ? 'العنوان' : 'Address',
      value: language === 'ar' ? 'الرياض - حي الياسمين (طريق أنس بن مالك)' : 'Riyadh - Al Yasmin (Anas Bin Malik Rd)',
      link: 'https://maps.google.com/?q=4348+Anas+Bin+Malik+Road,+Al+Yasmin,+Riyadh,+Saudi+Arabia',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 md:py-10">
        <div className="container text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ar'
              ? 'نحن هنا لمساعدتك. تواصل معنا للحصول على استشارة مجانية أو عرض سعر لمشروعك'
              : 'We are here to help you. Contact us for a free consultation or project quote'}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-10">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <info.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-muted-foreground hover:text-primary transition-colors block hover:underline"
                      {...(info.link.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{info.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {language === 'ar' ? 'أرسل لنا رسالة' : 'Send Us a Message'}
                </CardTitle>
                <CardDescription>
                  {language === 'ar'
                    ? 'املأ النموذج وسنتواصل معك في أقرب وقت ممكن'
                    : 'Fill out the form and we will contact you as soon as possible'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  encType="multipart/form-data"
                >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Don’t fill this out: <input name="bot-field" /></label>
              </p>
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={
                        language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      {language === 'ar' ? 'الموضوع' : 'Subject'} *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder={language === 'ar' ? 'موضوع الرسالة' : 'Message subject'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {language === 'ar' ? 'الرسالة' : 'Message'} *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder={
                        language === 'ar'
                          ? 'اكتب رسالتك هنا...'
                          : 'Write your message here...'
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attachments">
                      {language === 'ar' ? 'مرفقات (اختياري)' : 'Attachments (optional)'}
                    </Label>
                    <Input
                      id="attachments"
                      name="attachments"
                      type="file"
                      multiple
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          let totalMB = 0;
                          let hasLarge = false;
                          Array.from(files).forEach(f => { totalMB += f.size / (1024 * 1024); if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) hasLarge = true; });
                          if (hasLarge || totalMB > MAX_TOTAL_SIZE_MB) {
                            setAttachmentError(language === 'ar' ? `حجم الملف كبير جداً. الحد الأقصى ${MAX_TOTAL_SIZE_MB} ميجابايت لكل الملفات.` : `File too large. Max ${MAX_TOTAL_SIZE_MB} MB total.`);
                            e.target.value = '';
                            setAttachments(null);
                          } else {
                            setAttachmentError('');
                            setAttachments(files);
                          }
                        }
                      }}
                    />
                    {attachmentError && (
                      <div className="text-xs text-red-600 font-semibold">{attachmentError}</div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {language === 'ar'
                        ? `صور للتشققات/الموقع أو ملف PDF. الحد الأقصى لحجم الملف: ${MAX_TOTAL_SIZE_MB} ميجابايت.`
                        : `Site/crack photos or a PDF to help the diagnosis. Max file size: ${MAX_TOTAL_SIZE_MB} MB.`}
                    </div>
                  </div>

                  {/* Honeypot: hidden from real users, bots will fill it */}
                  <input id="contact_website" name="website" type="text" tabIndex={-1} autoComplete="off" style={{display:'none'}} aria-hidden="true" />
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting
                      ? language === 'ar'
                        ? 'جاري الإرسال...'
                        : 'Sending...'
                      : language === 'ar'
                        ? 'إرسال الرسالة'
                        : 'Send Message'}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    {language === 'ar' ? 'بديل سريع: راسلنا على ' : 'Quick alternative: email us at '}{' '}
                    <a href="mailto:etlaqksa@gmail.com" className="underline underline-offset-4">
                      etlaqksa@gmail.com
                    </a>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Map and Additional Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {language === 'ar' ? 'موقعنا' : 'Our Location'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'ar'
                      ? 'نخدم جميع مناطق المملكة العربية السعودية'
                      : 'We serve all regions of Saudi Arabia'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <iframe
                      // Google Maps embeds can be blocked by some networks/extensions.
                      // OpenStreetMap provides a reliable no-key alternative.
                      src="https://www.openstreetmap.org/export/embed.html?bbox=46.651%2C24.704%2C46.699%2C24.724&layer=mapnik&marker=24.7136%2C46.6753"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={language === 'ar' ? 'موقع الشركة' : 'Company Location'}
                    />
                  </div>

                  {/* Fallback links (in case embeds are blocked by extensions/corporate policies) */}
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <a
                      href="https://www.google.com/maps?q=24.7136,46.6753"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button variant="outline" className="w-full">
                        {language === 'ar' ? 'افتح الخريطة على Google' : 'Open in Google Maps'}
                      </Button>
                    </a>
                    <a
                      href="https://www.openstreetmap.org/?mlat=24.7136&mlon=46.6753#map=15/24.7136/46.6753"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button variant="secondary" className="w-full">
                        {language === 'ar' ? 'افتح الخريطة بديلًا' : 'Open map (alternative)'}
                      </Button>
                    </a>
                  </div>

                  <div className="mt-2 text-xs text-muted-foreground">
                    {language === 'ar'
                      ? 'إذا كانت الخريطة لا تظهر بسبب سياسة المتصفح/الشبكة، استخدم الأزرار أعلاه.'
                      : 'If the embedded map is blocked by your network/browser, use the buttons above.'}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">
                    {language === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{language === 'ar' ? 'السبت - الخميس' : 'Saturday - Thursday'}</span>
                      <span dir="ltr">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'ar' ? 'الجمعة' : 'Friday'}</span>
                      <span>{language === 'ar' ? 'مغلق' : 'Closed'}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-primary-foreground/20">
                    <p className="text-sm opacity-90">
                      {language === 'ar'
                        ? 'للحالات الطارئة، نحن متاحون على مدار الساعة'
                        : 'For emergencies, we are available 24/7'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-10 bg-[#25D366] text-white">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            {language === 'ar' ? 'تواصل معنا عبر واتساب' : 'Contact Us via WhatsApp'}
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {language === 'ar'
              ? 'للتواصل السريع والمباشر، راسلنا على واتساب'
              : 'For quick and direct communication, message us on WhatsApp'}
          </p>
          <a href="https://wa.me/966534145922" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              {language === 'ar' ? 'فتح واتساب' : 'Open WhatsApp'}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}