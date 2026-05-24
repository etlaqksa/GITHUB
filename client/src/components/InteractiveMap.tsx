import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, PhoneCall, ArrowLeft, ArrowRight, Activity, Shield } from 'lucide-react';
import { cities, getCitySlug } from '@/data/seoLocations';

type MapHub = {
  slug: string;
  ar: string;
  en: string;
  x: number;
  y: number;
  highlightAr: string;
  highlightEn: string;
  servicesAr: string[];
  servicesEn: string[];
};

// Main operational hubs
const MAP_HUBS: MapHub[] = [
  {
    slug: 'riyadh',
    ar: 'الرياض',
    en: 'Riyadh',
    x: 430,
    y: 240,
    highlightAr: 'المركز الرئيسي وعاصمة العمليات الهندسية',
    highlightEn: 'Headquarters & central engineering operations hub',
    servicesAr: ['حقن التربة لمعالجة الهبوط', 'كشف التكهفات والفراغات الأرضية', 'الدراسات الجيوفيزيائية GPR/ERT/MASW'],
    servicesEn: ['Soil grouting for settlement remediation', 'Void & cavity detection in limestone', 'Geophysical surveys GPR/ERT/MASW'],
  },
  {
    slug: 'jeddah',
    ar: 'جدة',
    en: 'Jeddah',
    x: 180,
    y: 330,
    highlightAr: 'مركز العمليات الغربية ومعالجة تسربات المياه',
    highlightEn: 'Western operations base & groundwater control',
    servicesAr: ['حقن التربة المانع لتسربات المياه', 'معالجة هبوط وفراغات التربة الساحلية', 'الدراسات الجيوفيزيائية المسبقة للبناء'],
    servicesEn: ['Waterproofing cementitious soil grouting', 'Coastal soil washout & cavity mitigation', 'Subsurface geophysical investigations'],
  },
  {
    slug: 'dammam',
    ar: 'الدمام والخبر',
    en: 'Dammam & Khobar',
    x: 540,
    y: 190,
    highlightAr: 'مركز العمليات الشرقية وتحديات صخور كارست',
    highlightEn: 'Eastern operations hub & karstic void engineering',
    servicesAr: ['كشف تكهفات الحجر الجيري الكارستي', 'معالجة السبخات وتدعيم التربة المفككة', 'مسوحات جيوفيزيائية GPR/ERT عالية الدقة'],
    servicesEn: ['Karstic limestone cavity mapping', 'Sabkha soil consolidation & strengthening', 'High-resolution GPR & ERT surveys'],
  },
  {
    slug: 'madinah',
    ar: 'المدينة المنورة',
    en: 'Madinah',
    x: 230,
    y: 260,
    highlightAr: 'معالجة التكهفات الصخرية والتدعيم الإنشائي',
    highlightEn: 'Volcanic cavity probing & underpinning',
    servicesAr: ['حقن التربة والتدعيم الإنشائي', 'كشف التكهفات والفراغات الجيولوجية', 'المسوحات الجيوفيزيائية لمشاريع البنية التحتية'],
    servicesEn: ['Ground injection & structural underpinning', 'Geological void & fissure detection', 'Infrastructure geophysical surveys'],
  },
  {
    slug: 'makkah',
    ar: 'مكة المكرمة',
    en: 'Makkah',
    x: 210,
    y: 350,
    highlightAr: 'تدعيم أساسات المنشآت الفندقية والسكنية',
    highlightEn: 'High-load foundation strengthening & underpinning',
    servicesAr: ['تقوية الأساسات للمشاريع الكبرى', 'كشف الفراغات الصخرية والتكهفات الأرضية', 'مسوحات جيوفيزيائية GPR للمشاريع الإنشائية'],
    servicesEn: ['Deep foundation compaction grouting', 'Rocky cavity probing & void diagnosis', 'Construction GPR surveying'],
  },
  {
    slug: 'qassim',
    ar: 'القصيم وبريدة',
    en: 'Al Qassim & Buraidah',
    x: 370,
    y: 190,
    highlightAr: 'معالجة التربة الرملية والفراغات السطحية',
    highlightEn: 'Agricultural & sandy soil stabilization',
    servicesAr: ['حقن التربة لمعالجة هبوط القواعد', 'كشف التكهفات وفحص الأساسات المسبق', 'المسح الكهربائي ERT لتحديد مجاري المياه'],
    servicesEn: ['Footing compaction grouting', 'Pre-construction void investigation', 'ERT surveying for water path mapping'],
  },
  {
    slug: 'tabuk',
    ar: 'تبوك',
    en: 'Tabuk',
    x: 140,
    y: 110,
    highlightAr: 'دعم مشاريع الشمال الكبرى والفحوصات الجيوفيزيائية',
    highlightEn: 'Northern mega-projects & GPR support',
    servicesAr: ['مسوحات جيوفيزيائية متكاملة لمدن التوسع', 'كشف وتحديد التكهفات والشقوق الصخرية'],
    servicesEn: ['Integrated geophysical surveys for expansion', 'Fissured rock cavity detection & mapping'],
  },
  {
    slug: 'abha',
    ar: 'أبها وخميس مشيط',
    en: 'Abha & Khamis Mushait',
    x: 250,
    y: 430,
    highlightAr: 'معالجة تحديات التربة الجبلية الصخرية',
    highlightEn: 'Mountainous soil stabilization & underpinning',
    servicesAr: ['معالجة هبوط القواعد في الأراضي الجبلية', 'كشف الفراغات والتصدعات الأرضية الناتجة عن المياه'],
    servicesEn: ['Mountainous slope and footing stabilization', 'Water-induced underground erosion mapping'],
  },
];

// Remaining operational cities (smaller points with simple tooltips)
const OTHER_POINTS = [
  { nameAr: 'الطائف', nameEn: 'Taif', x: 240, y: 345 },
  { nameAr: 'عنيزة', nameEn: 'Unaizah', x: 380, y: 200 },
  { nameAr: 'حائل', nameEn: 'Hail', x: 300, y: 160 },
  { nameAr: 'جيزان', nameEn: 'Jazan', x: 240, y: 470 },
  { nameAr: 'نجران', nameEn: 'Najran', x: 330, y: 450 },
  { nameAr: 'ينبع', nameEn: 'Yanbu', x: 165, y: 270 },
  { nameAr: 'الجبيل', nameEn: 'Jubail', x: 520, y: 175 },
  { nameAr: 'الهفوف', nameEn: 'Al Hofuf', x: 500, y: 220 },
  { nameAr: 'القطيف', nameEn: 'Qatif', x: 535, y: 180 },
  { nameAr: 'الظهران', nameEn: 'Dhahran', x: 545, y: 195 },
  { nameAr: 'عرعر', nameEn: 'Arar', x: 270, y: 60 },
  { nameAr: 'الباحة', nameEn: 'Al Bahah', x: 225, y: 390 },
  { nameAr: 'القريات', nameEn: 'Al Qurayyat', x: 180, y: 50 },
  { nameAr: 'سكاكا', nameEn: 'Sakaka', x: 220, y: 75 },
  { nameAr: 'الزلفي', nameEn: 'Az Zulfi', x: 400, y: 215 },
  { nameAr: 'المجمعة', nameEn: 'Al Majma’ah', x: 410, y: 225 },
  { nameAr: 'الرس', nameEn: 'Al Rass', x: 360, y: 205 },
];

export default function InteractiveMap() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [activeHub, setActiveHub] = useState<MapHub>(MAP_HUBS[0]!);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const matchedCity = useMemo(() => {
    return cities.find((c) => c.slug === activeHub.slug);
  }, [activeHub]);

  const citySlug = useMemo(() => {
    if (!matchedCity) return '';
    return getCitySlug(matchedCity, language);
  }, [matchedCity, language]);

  return (
    <div className="w-full space-y-8">
      {/* Visual Map Canvas Card */}
      <div className="relative rounded-3xl border border-border bg-card/60 p-4 md:p-6 shadow-2xl backdrop-blur-md overflow-hidden min-h-[460px] md:min-h-[580px] flex flex-col justify-between">
        
        {/* Background futuristic coordinates grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-[0.14]" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapGrid)" />
            {/* Tech concentric circles around headquarters (Riyadh) */}
            <circle cx="430" cy="240" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
            <circle cx="430" cy="240" r="220" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* Top Info Ribbon */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-background/50 border border-border rounded-2xl px-4 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
            </span>
            <span className="text-xs md:text-sm font-semibold text-muted-foreground">
              {isAr 
                ? 'خارطة التغطية الجيوتقنية النشطة بالمملكة' 
                : 'Active Geotechnical Coverage Map - Saudi Arabia'}
            </span>
          </div>
          <Badge variant="outline" className="text-[11px] font-bold text-secondary border-secondary/30 bg-secondary/5">
            {isAr ? '٢٨ مدينة مغطاة بالكامل' : '28 Cities Fully Covered'}
          </Badge>
        </div>

        {/* The SVG Map Canvas */}
        <div className="relative flex-1 flex items-center justify-center py-4 my-2 select-none">
          <svg 
            viewBox="0 0 800 520" 
            className="w-full max-w-[760px] h-auto text-muted-foreground/30 dark:text-muted-foreground/15"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stylized vector boundary of Saudi Arabia */}
            <path 
              d="M 120 100 L 230 40 L 450 120 L 570 210 L 750 360 L 380 460 L 250 480 L 190 360 L 160 270 Z" 
              fill="currentColor" 
              className="text-slate-100 dark:text-slate-900/60"
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinejoin="round"
            />

            {/* Glowing lines representing Grouting/GPR operation network paths from Riyadh */}
            <g className="opacity-40 dark:opacity-60 text-secondary" stroke="currentColor" strokeWidth="1.5">
              {MAP_HUBS.map((hub) => {
                if (hub.slug === 'riyadh') return null;
                return (
                  <line 
                    key={`line-${hub.slug}`} 
                    x1="430" 
                    y1="240" 
                    x2={hub.x} 
                    y2={hub.y} 
                    strokeDasharray="4,4" 
                    className="animate-[dash_10s_linear_infinite]"
                  />
                );
              })}
            </g>

            {/* Other general service cities (smaller nodes) */}
            <g className="text-muted-foreground/60 dark:text-muted-foreground/45">
              {OTHER_POINTS.map((pt, idx) => (
                <circle 
                  key={`pt-${idx}`} 
                  cx={pt.x} 
                  cy={pt.y} 
                  r="4" 
                  className="cursor-pointer transition-all duration-200 hover:r-6 hover:text-secondary focus:outline-none"
                  onMouseEnter={(e) => {
                    setHoveredName(isAr ? pt.nameAr : pt.nameEn);
                    setTooltipPos({ x: pt.x, y: pt.y });
                  }}
                  onMouseLeave={() => {
                    setHoveredName(null);
                    setTooltipPos(null);
                  }}
                />
              ))}
            </g>

            {/* Glowing major Hub pins */}
            {MAP_HUBS.map((hub) => {
              const isActive = activeHub.slug === hub.slug;
              return (
                <g key={`hub-${hub.slug}`} className="cursor-pointer focus:outline-none">
                  {/* Outer pulse circle */}
                  <circle 
                    cx={hub.x} 
                    cy={hub.y} 
                    r={isActive ? "20" : "12"} 
                    className={`fill-none stroke-secondary transition-all duration-300 ${isActive ? 'animate-ping opacity-25 stroke-2' : 'opacity-0'}`} 
                  />
                  {/* Solid accent circle */}
                  <circle 
                    cx={hub.x} 
                    cy={hub.y} 
                    r={isActive ? "7" : "5"} 
                    className={`transition-all duration-300 ${isActive ? 'fill-secondary' : 'fill-primary group-hover:fill-secondary'}`} 
                    onClick={() => setActiveHub(hub)}
                  />
                  {/* Hover detector circle */}
                  <circle 
                    cx={hub.x} 
                    cy={hub.y} 
                    r="16" 
                    className="fill-transparent"
                    onClick={() => setActiveHub(hub)}
                    onMouseEnter={() => {
                      setHoveredName(isAr ? hub.ar : hub.en);
                      setTooltipPos({ x: hub.x, y: hub.y });
                    }}
                    onMouseLeave={() => {
                      setHoveredName(null);
                      setTooltipPos(null);
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Styled Floating Tooltip for simple hover */}
          {hoveredName && tooltipPos && (
            <div 
              className="absolute pointer-events-none z-40 rounded-xl border border-border bg-popover px-3 py-1.5 text-xs font-bold text-popover-foreground shadow-2xl backdrop-blur-md -translate-x-1/2 -translate-y-10"
              style={{
                left: `${(tooltipPos.x / 800) * 100}%`,
                top: `${(tooltipPos.y / 520) * 100}%`,
              }}
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-secondary" />
                {hoveredName}
              </div>
            </div>
          )}
        </div>

        {/* Small bottom guideline */}
        <div className="relative z-10 text-center text-xs text-muted-foreground opacity-75">
          {isAr 
            ? '💡 انقر على أي نقطة مضيئة بالخريطة لعرض تفاصيل التغطية والخدمات المتاحة بالمنطقة.' 
            : '💡 Click any glowing hub on the map to display coverage details and localized services in that area.'}
        </div>
      </div>

      {/* Selected City Detail Interactive Box */}
      <div 
        className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-xl relative overflow-hidden transition-all duration-300"
        style={{ animation: 'fadeIn 0.4s ease-out' }}
      >
        {/* Glow decoration under selected city info */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border text-start">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest">
              <Activity className="h-4 w-4" />
              {isAr ? 'منطقة التغطية والعمليات النشطة' : 'Active Coverage & Operations Area'}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2 text-slate-900">
              <MapPin className="h-6 w-6 text-secondary" />
              {isAr ? activeHub.ar : activeHub.en}
            </h2>
            <p className="text-muted-foreground text-sm font-semibold">
              {isAr ? activeHub.highlightAr : activeHub.highlightEn}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <LocalizedLink href={`/locations/${citySlug}`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full gap-2 font-bold" size="lg">
                {isAr ? 'عرض التفاصيل الكاملة' : 'View full details'}
                {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </Button>
            </LocalizedLink>
            
            <LocalizedLink href="/request-service" className="w-full sm:w-auto">
              <Button className="w-full gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold" size="lg">
                <PhoneCall className="h-4 w-4" />
                {isAr ? 'طلب معاينة ميدانية' : 'Request site visit'}
              </Button>
            </LocalizedLink>
          </div>
        </div>

        {/* Localized geotechnical challenges & operations */}
        <div className="pt-6 grid md:grid-cols-2 gap-6 text-start">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-secondary" />
              {isAr ? 'الخدمات الجيوتقنية المتاحة بهذه المنطقة' : 'Available Geotechnical Services in this Area'}
            </h3>
            <ul className="space-y-2">
              {(isAr ? activeHub.servicesAr : activeHub.servicesEn).map((service, i) => (
                <li key={i} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-muted/40 border border-border p-5 space-y-3">
            <h4 className="font-bold text-sm text-slate-800">
              {isAr ? 'تأمين وضمان جودة العمليات الميدانية:' : 'Field operations quality & safety assurance:'}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {isAr 
                ? 'يتم تنفيذ جميع أعمال فحص التكهفات وحقن التربة في هذه المنطقة بمطابقة تامة للمواصفات العالمية والمعايير الدولية المعمول بها للحقن والجيوفيزياء بما فيها المعايير الأوروبية EN 12715 ومواصفات ASTM الدولية لضمان أعلى سلامة للأساسات، ويتم تسيير الفرق والآليات الهندسية من مركزنا الرئيسي في الرياض لتغطية كافة أرجاء المملكة.'
                : 'All void investigations and soil grouting works in this area are executed in strict compliance with international codes including EN 12715 and ASTM guidelines, with specialized engineering teams and fleets mobilized directly from our Riyadh headquarters to reach any project location across the Kingdom.'}
            </p>
            <div className="pt-2 flex gap-2">
              <Badge variant="secondary" className="text-[10px] font-bold">EN 12715</Badge>
              <Badge variant="secondary" className="text-[10px] font-bold">ASTM D6432</Badge>
              <Badge variant="secondary" className="text-[10px] font-bold">FHWA QA/QC</Badge>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
