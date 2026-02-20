import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Home, PhoneCall, Wrench } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const { language } = useLanguage();
  const isAr = language !== "en";
  const [, setLocation] = useLocation();

  const go = (path: string) => setLocation(path);

  return (
    <div className="min-h-screen w-full flex items-center justify-center app-background px-4 py-12">
      <Card className="w-full max-w-2xl shadow-xl border bg-white/85 backdrop-blur-md rounded-2xl">
        <CardContent className="p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo-224.webp?v=3"
              srcSet="/logo-224.webp?v=3 224w, /logo-140.webp?v=3 448w"
              sizes="(max-width: 640px) 160px, 224px"
                alt="ETLAQ"
                className="h-10 w-auto"
                loading="eager"
                decoding="async"
              />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-foreground">
                  {isAr ? "شركة إطلاق المتميزة" : "ETLAQ Distinguished Company"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {isAr ? "حقن التربة • سبر التكهفات • حلول جيوفيزيائية" : "Soil Grouting • Cavity Probing • Geophysics"}
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              className="gap-2"
              onClick={() => go("/")}
            >
              <ArrowLeft className={isAr ? "rtl:rotate-180" : ""} size={16} />
              {isAr ? "رجوع" : "Back"}
            </Button>
          </div>

          <div className="text-center">
            <div className="text-6xl font-extrabold tracking-tight text-foreground">404</div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-foreground">
              {isAr ? "الصفحة غير موجودة" : "Page Not Found"}
            </h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {isAr
                ? "يبدو أن الرابط غير صحيح أو أن الصفحة تم نقلها. جرّب العودة للرئيسية أو تصفّح أهم الصفحات."
                : "The link may be incorrect or the page has been moved. Try the homepage or visit key pages below."}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button className="gap-2" onClick={() => go("/")}>
                <Home size={16} />
                {isAr ? "الرئيسية" : "Home"}
              </Button>

              <Button variant="secondary" className="gap-2" onClick={() => go("/services")}>
                <Wrench size={16} />
                {isAr ? "الخدمات" : "Services"}
              </Button>

              <Button variant="secondary" className="gap-2" onClick={() => go("/contact")}>
                <PhoneCall size={16} />
                {isAr ? "تواصل معنا" : "Contact"}
              </Button>
            </div>

            <div className="mt-6 text-xs text-muted-foreground">
              {isAr ? "أو جرّب من قائمة الموقع بالأعلى." : "You can also use the top navigation menu."}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
