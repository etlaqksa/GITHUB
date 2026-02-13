import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLangFromPathname } from '@/lib/localizePath';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1) URL prefix wins (/ar or /en) for canonical navigation
    const fromPath = getLangFromPathname(window.location.pathname);
    if (fromPath) return fromPath;
    // 2) Default language is ALWAYS Arabic when no prefix is present.
    // (User requirement: Arabic is the default site experience.)
    return 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  // Keep language state in sync if user navigates directly to /ar or /en
  useEffect(() => {
    const onPop = () => {
      const fromPath = getLangFromPathname(window.location.pathname);
      if (fromPath && fromPath !== language) {
        setLanguageState(fromPath);
        localStorage.setItem('language', fromPath);
        document.documentElement.setAttribute('lang', fromPath);
        document.documentElement.setAttribute('dir', fromPath === 'ar' ? 'rtl' : 'ltr');
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.projects': 'مشاريعنا',
    'nav.blog': 'المدونة',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.contact': 'تواصل معنا',
    'nav.request': 'اطلب خدمة',
    'nav.gallery': 'معرض الصور',
    'nav.photos': 'معرض الصور',
    'nav.profile': 'اطلب ملف الشركة',
    
    // Home page
    'home.title': 'شركة إطلاق المتميزة المحدودة',
    'home.subtitle': 'خبراء في حقن التربة ومعالجة التكهفات في السعودية',
    'home.tagline': 'نحن نقوّي أساساتك',
    'home.cta': 'احصل على استشارة مجانية',
    'home.experience': 'أكثر من 15 عاماً من الخبرة',
    
    // Services
    'services.title': 'خدماتنا المتخصصة',
    'services.grouting': 'حقن التربة (الحقن الأسمنتي)',
    'services.grouting.desc': 'حلول متقدمة لتقوية التربة وملء التكهفات باستخدام تقنيات الحقن الأسمنتي الحديثة',
    'services.settlement': 'معالجة هبوط المباني',
    'services.settlement.desc': 'تشخيص ومعالجة هبوط الأساسات والمباني بأحدث التقنيات الهندسية',
    'services.cracks': 'إصلاح تشققات الجدران',
    'services.cracks.desc': 'معالجة احترافية لجميع أنواع التشققات الإنشائية والسطحية',
    'services.cavity': 'كشف التكهفات',
    'services.cavity.desc': 'استخدام أحدث تقنيات الكشف الجيوفيزيائي لتحديد التكهفات تحت الأرض',
    'services.geophysical': 'الدراسات الجيوفيزيائية',
    'services.geophysical.desc': 'مسوحات جيوفيزيائية لتحديد التكهفات والطبقات الضعيفة وتقييم المخاطر قبل التنفيذ',

    // Request service
    'request.title': 'اطلب خدمة هندسية',
    'request.subtitle': 'أجب على أسئلة بسيطة وسيتواصل معك مهندس مختص بخطوة واضحة',
    'request.cta': 'إرسال الطلب',
    'request.step': 'الخطوة',
    'request.service': 'الخدمة المطلوبة',
    'request.projectType': 'نوع المشروع',
    'request.city': 'المدينة',
    'request.problem': 'وصف المشكلة',
    'request.contact': 'بيانات التواصل',
    'request.next': 'التالي',
    'request.back': 'السابق',
    'request.submit': 'إرسال الطلب',
    'request.success': 'تم إرسال طلبك بنجاح',
    'request.fail': 'تعذر إرسال الطلب، حاول مرة أخرى',
    
    // About
    'about.title': 'من نحن',
    'about.vision': 'رؤيتنا',
    'about.mission': 'مهمتنا',
    'about.values': 'قيمنا',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.name': 'الاسم',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال',
    'contact.whatsapp': 'تواصل عبر واتساب',
    
    // Common
    'common.readMore': 'اقرأ المزيد',
    'common.learnMore': 'معرفة المزيد',
    'common.viewAll': 'عرض الكل',
    'common.loading': 'جاري التحميل...',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact Us',
    'nav.request': 'Request Service',
    'nav.gallery': 'Gallery',
    'nav.photos': 'Photo Gallery',
    'nav.profile': 'Request company profile',
    
    // Home page
    'home.title': 'Etlaq Distinguished Company',
    'home.subtitle': 'Experts in Soil Grouting and Cavity Treatment in Saudi Arabia',
    'home.tagline': 'We Strengthen Your Foundations',
    'home.cta': 'Get Free Consultation',
    'home.experience': 'Over 15 Years of Experience',
    
    // Services
    'services.title': 'Our Specialized Services',
    'services.grouting': 'Soil Grouting (Cement Injection)',
    'services.grouting.desc': 'Advanced solutions for soil strengthening and void filling using modern cement grouting techniques',
    'services.settlement': 'Building Settlement Treatment',
    'services.settlement.desc': 'Diagnosis and treatment of foundation and building settlement using the latest engineering techniques',
    'services.cracks': 'Wall Crack Repair',
    'services.cracks.desc': 'Professional treatment for all types of structural and surface cracks',
    'services.cavity': 'Cavity Detection',
    'services.cavity.desc': 'Using advanced geophysical techniques to identify underground cavities and voids',
    'services.geophysical': 'Geophysical Surveys',
    'services.geophysical.desc': 'Geophysical surveys to locate voids/weak zones and support better engineering decisions',

    // Request service
    'request.title': 'Request an Engineering Service',
    'request.subtitle': 'Answer a few questions and an engineer will contact you with clear next steps',
    'request.cta': 'Submit Request',
    'request.step': 'Step',
    'request.service': 'Requested service',
    'request.projectType': 'Project type',
    'request.city': 'City',
    'request.problem': 'Problem description',
    'request.contact': 'Contact details',
    'request.next': 'Next',
    'request.back': 'Back',
    'request.submit': 'Submit Request',
    'request.success': 'Your request has been submitted successfully',
    'request.fail': 'Failed to submit the request, please try again',
    
    // About
    'about.title': 'About Us',
    'about.vision': 'Our Vision',
    'about.mission': 'Our Mission',
    'about.values': 'Our Values',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone Number',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.whatsapp': 'Contact via WhatsApp',
    
    // Common
    'common.readMore': 'Read More',
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.loading': 'Loading...',
  },
};

