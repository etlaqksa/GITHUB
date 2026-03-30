import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, ClipboardList, PhoneCall } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useLocation } from 'wouter';
import { trackEvent } from '@/lib/analytics';
import LocalizedLink from '@/components/LocalizedLink';

function encodeForm(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k] ?? ''))
    .join('&');
}

type ServiceKey = 'grouting' | 'cavity' | 'geophysical';
type ProjectTypeKey = 'individual' | 'developer' | 'contractor' | 'government';

export default function RequestService() {
  const { language, t } = useLanguage();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    service: '' as ServiceKey | '',
    projectType: '' as ProjectTypeKey | '',
    city: '',
    problem: '',
    name: '',
    phone: '',
    email: '',
    company: '',
  });
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Prefill from query params: ?service=grouting|cavity|geophysical&audience=individuals|developers|contractors|government
    const search = location.split('?')[1] ?? '';
    if (!search) return;
    const params = new URLSearchParams(search);
    const service = (params.get('service') ?? '').toLowerCase();
    const audience = (params.get('audience') ?? '').toLowerCase();

    setFormData((prev) => {
      const next = { ...prev };
      if (!next.service && (service === 'grouting' || service === 'cavity' || service === 'geophysical')) {
        next.service = service as ServiceKey;
      }
      if (!next.projectType && (audience === 'individuals' || audience === 'developers' || audience === 'contractors' || audience === 'government')) {
        // Map audience to internal keys (individual/developer/contractor/government)
        const map: Record<string, ProjectTypeKey> = {
          individuals: 'individual',
          developers: 'developer',
          contractors: 'contractor',
          government: 'government',
        };
        next.projectType = map[audience];
      }
      return next;
    });
  }, [location]);


  const stepsTotal = 3;

  const serviceOptions = useMemo(
    () => [
      { key: 'grouting' as const, label: t('services.grouting') },
      { key: 'cavity' as const, label: t('services.cavity') },
      { key: 'geophysical' as const, label: t('services.geophysical') },
    ],
    [t]
  );

  const projectTypeOptions = useMemo(
    () =>
      [
        {
          key: 'individual' as const,
          label: language === 'ar' ? 'فرد (مالك / مستفيد)' : 'Individual (Owner / Beneficiary)',
        },
        {
          key: 'developer' as const,
          label: language === 'ar' ? 'مطور عقاري' : 'Developer',
        },
        {
          key: 'contractor' as const,
          label: language === 'ar' ? 'مقاول' : 'Contractor',
        },
        {
          key: 'government' as const,
          label: language === 'ar' ? 'جهة حكومية / شبه حكومية' : 'Government / Semi-government',
        },
      ],
    [language]
  );

  const canNext = useMemo(() => {
    if (step === 1) return !!formData.service;
    if (step === 2) return !!formData.projectType && !!formData.city && !!formData.problem;
    if (step === 3) return !!formData.name && !!formData.phone;
    return false;
  }, [step, formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canNext) return;

    setIsSubmitting(true);
    try {
      trackEvent('form_submit_attempt', {
        form: 'request-service',
        service: formData.service || 'unknown',
        projectType: formData.projectType || 'unknown',
        language,
      });
      const page = typeof window !== 'undefined' ? window.location.href : '';
      const referrer = typeof document !== 'undefined' ? document.referrer : '';

      // Netlify Forms + optional attachments (FormData)
      const payload = new FormData();
      payload.append('form-name', 'request-service');
      payload.append('page', page || 'https://etlaqksa.com/request-service');
      payload.append('referrer', referrer);
      payload.append('bot-field', '');
      payload.append('service', formData.service);
      payload.append('projectType', formData.projectType);
      payload.append('city', formData.city);
      payload.append('problem', formData.problem);
      payload.append('name', formData.name);
      payload.append('phone', formData.phone);
      payload.append('email', formData.email);
      payload.append('company', formData.company);

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

      toast.success(t('request.success'));
      trackEvent('form_submit_success', {
        form: 'request-service',
        service: formData.service || 'unknown',
        projectType: formData.projectType || 'unknown',
        language,
      });

      // Conversion events (GA4)
      trackEvent('lead_request_service', {
        language,
        method: 'netlify',
        service: formData.service || 'unknown',
        project_type: formData.projectType || 'unknown',
        city: formData.city || 'unknown',
        page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
        page_location: typeof window !== 'undefined' ? window.location.href : undefined,
      });
      trackEvent('generate_lead', {
        lead_type: 'service_request',
        form_name: 'request-service',
        method: 'netlify',
        language,
        service: formData.service || 'unknown',
        project_type: formData.projectType || 'unknown',
        city: formData.city || 'unknown',
        page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
        page_location: typeof window !== 'undefined' ? window.location.href : undefined,
      });
      setLocation(`/thank-you?form=request-service`);
      setFormData({
        service: '',
        projectType: '',
        city: '',
        problem: '',
        name: '',
        phone: '',
        email: '',
        company: '',
      });
      setAttachments(null);
      setStep(1);
    } catch {
      toast.error(t('request.fail'));
      trackEvent('form_submit_error', {
        form: 'request-service',
        service: formData.service || 'unknown',
        language,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={language === 'ar' ? 'اطلب خدمة | شركة إطلاق المتميزة' : 'Request Service | Etlaq'}
        description={
          language === 'ar'
            ? 'اطلب خدمة حقن التربة أو كشف التكهفات أو الدراسات الجيوفيزيائية. نموذج مختصر لتقييم الحالة والتواصل معك بسرعة.'
            : 'Request soil grouting, cavity detection, or geophysical surveys. A short form to assess your case and contact you quickly.'
        }
        url="https://etlaqksa.com/request-service"
      />

      <div className="w-full">
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 md:py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">{t('request.title')}</h1>
              <p className="text-xl text-muted-foreground">{t('request.subtitle')}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <LocalizedLink href="/services" className="inline-flex">
                  <Button variant="outline" className="gap-2">
                    <ClipboardList className="h-4 w-4" />
                    {language === 'ar' ? 'استعرض الخدمات' : 'Browse services'}
                  </Button>
                </LocalizedLink>
                <a className="inline-flex" href="tel:+966534145922">
                  <Button variant="secondary" className="gap-2">
                    <PhoneCall className="h-4 w-4" />
                    {language === 'ar' ? 'اتصال سريع' : 'Quick call'}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                    {language === 'ar'
                      ? `نموذج مختصر (${t('request.step')} ${step} / ${stepsTotal})`
                      : `Short form (${t('request.step')} ${step} / ${stepsTotal})`}
                  </CardTitle>
                  <CardDescription>
                    {language === 'ar'
                      ? 'بعد الإرسال: سنراجع البيانات ونعود لك بخطوة تالية واضحة (زيارة/تقييم/عرض سعر).'
                      : 'After submitting: we will review and reply with a clear next step (visit / assessment / quote).'}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 md:p-8">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    name="request-service"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    encType="multipart/form-data"
                  >
                    <input type="hidden" name="form-name" value="request-service" />
                    <p className="hidden">
                      <label>
                        Don’t fill this out: <input name="bot-field" />
                      </label>
                    </p>

                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>{t('request.service')} *</Label>
                          <Select
                            value={formData.service}
                            onValueChange={(v) => setFormData((p) => ({ ...p, service: v as ServiceKey }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'ar' ? 'اختر الخدمة' : 'Choose a service'} />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceOptions.map((opt) => (
                                <SelectItem key={opt.key} value={opt.key}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-muted-foreground">
                            {language === 'ar'
                              ? 'إذا كنت غير متأكد: اختر "كشف التكهفات" وسنوجهك للخيار الأنسب.'
                              : 'If unsure: choose "Cavity detection" and we will guide you to the best option.'}
                          </p>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>{t('request.projectType')} *</Label>
                            <Select
                              value={formData.projectType}
                              onValueChange={(v) => setFormData((p) => ({ ...p, projectType: v as ProjectTypeKey }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={language === 'ar' ? 'اختر نوع العميل' : 'Select client type'} />
                              </SelectTrigger>
                              <SelectContent>
                                {projectTypeOptions.map((opt) => (
                                  <SelectItem key={opt.key} value={opt.key}>
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="city">{t('request.city')} *</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                              placeholder={language === 'ar' ? 'مثال: الرياض / جدة / الدمام' : 'e.g., Riyadh / Jeddah / Dammam'}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="problem">{t('request.problem')} *</Label>
                          <Textarea
                            id="problem"
                            value={formData.problem}
                            onChange={(e) => setFormData((p) => ({ ...p, problem: e.target.value }))}
                            rows={6}
                            placeholder={
                              language === 'ar'
                                ? 'مثال: هبوط في بلاطة أرضية، تكهفات متوقعة، تشققات، تسربات... مع ذكر الموقع والمساحة إن أمكن'
                                : 'e.g., slab settlement, suspected voids, cracks, leakage... include area/location if possible'
                            }
                          />
                          <p className="text-sm text-muted-foreground">
                            {language === 'ar'
                              ? 'ملاحظة: يمكنك إرفاق صور/ملف PDF هنا (اختياري)، أو إرسالها عبر واتساب بعد الإرسال لتسريع التقييم.'
                              : 'Note: you may attach photos/PDF here (optional), or send them via WhatsApp after submitting to speed up assessment.'}
                          </p>

                          <div className="space-y-2 pt-2">
                            <Label htmlFor="attachments">
                              {language === 'ar' ? 'مرفقات (اختياري)' : 'Attachments (optional)'}
                            </Label>
                            <Input
                              id="attachments"
                              name="attachments"
                              type="file"
                              multiple
                              accept="image/*,application/pdf"
                              onChange={(e) => setAttachments(e.target.files)}
                            />
                            <div className="text-xs text-muted-foreground">
                              {language === 'ar'
                                ? 'صور للتشققات/الموقع أو ملف PDF يساعد على تقييم أسرع.'
                                : 'Site/crack photos or a PDF can help speed up evaluation.'}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">{language === 'ar' ? 'الاسم' : 'Name'} *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                              placeholder={language === 'ar' ? 'اسمك الكامل' : 'Full name'}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">{language === 'ar' ? 'رقم الجوال' : 'Phone'} *</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                              placeholder={language === 'ar' ? '05xxxxxxxx' : '+966...'}
                              dir="ltr"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                              placeholder={language === 'ar' ? 'اختياري' : 'Optional'}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">{language === 'ar' ? 'الجهة / الشركة' : 'Company / Entity'}</Label>
                            <Input
                              id="company"
                              value={formData.company}
                              onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                              placeholder={language === 'ar' ? 'اختياري' : 'Optional'}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep((s) => Math.max(1, s - 1))}
                        disabled={step === 1 || isSubmitting}
                      >
                        {t('request.back')}
                      </Button>

                      {step < stepsTotal ? (
                        <Button
                          type="button"
                          onClick={() => setStep((s) => Math.min(stepsTotal, s + 1))}
                          disabled={!canNext || isSubmitting}
                        >
                          {t('request.next')}
                        </Button>
                      ) : (
                        <Button type="submit" disabled={!canNext || isSubmitting} className="gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          {isSubmitting ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : t('request.submit')}
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="mt-6 text-center space-y-3">
                <div className="text-sm text-muted-foreground">
                  {language === 'ar'
                    ? 'للحالات العاجلة: اتصل مباشرة أو راسلنا عبر واتساب.'
                    : 'For urgent cases: call directly or message us on WhatsApp.'}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <a href="mailto:etlaqksa@gmail.com">
                    <Button variant="outline" className="w-full sm:w-auto">
                      {language === 'ar' ? 'أرسل بريدًا إلى etlaqksa@gmail.com' : 'Email etlaqksa@gmail.com'}
                    </Button>
                  </a>
                  <LocalizedLink href="/contact">
                    <Button variant="secondary" className="w-full sm:w-auto">
                      {language === 'ar' ? 'صفحة التواصل' : 'Contact page'}
                    </Button>
                  </LocalizedLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
