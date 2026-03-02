import React, { useMemo, useState } from "react";
import { useLocation } from "wouter";

type Props = {
  title?: string;
  showCompanyDetails?: boolean;
  url?: string;
  imageUrl?: string;
  variant?: "inline" | "card";
};

const COMPANY_AR = {
  name: "شركة إطلاق المتميزة المحدودة",
  site: "www.etlaqksa.com",
  email: "info@etlaqksa.com",
  phone: "+966534145922",
};

const COMPANY_EN = {
  name: "Etlaq Al Mutamayezah Co. Ltd.",
  site: "www.etlaqksa.com",
  email: "info@etlaqksa.com",
  phone: "+966534145922",
};

function isArabicPath(pathname: string) {
  return pathname.startsWith("/ar");
}

function safeGetOgImage(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m =
    document.querySelector('meta[property="og:image"]') ||
    document.querySelector('meta[name="og:image"]');
  const content = (m as HTMLMetaElement | null)?.content?.trim();
  return content || undefined;
}

function buildShareText(opts: { title?: string; url: string; isAr: boolean }) {
  const c = opts.isAr ? COMPANY_AR : COMPANY_EN;
  return [
    opts.title ? `🟦 ${opts.title}` : "",
    opts.url,
    "",
    `${c.name}`,
    `${c.site}`,
    `${c.email}`,
    `${c.phone}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function encode(s: string) {
  return encodeURIComponent(s);
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function IconWrap({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex h-5 w-5 items-center justify-center">{children}</span>;
}

function SvgIcon({ children, viewBox = "0 0 24 24" }: { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} width="20" height="20" aria-hidden="true" focusable="false" className="block" fill="currentColor">
      {children}
    </svg>
  );
}

const Icons = {
  whatsapp: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.96.57 3.86 1.65 5.49L2 22l4.75-1.74a9.85 9.85 0 0 0 5.29 1.53h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.77 14.2c-.24.67-1.41 1.28-1.95 1.36-.49.07-1.12.1-1.81-.12-.42-.13-.96-.31-1.65-.61-2.91-1.26-4.8-4.38-4.95-4.58-.15-.2-1.18-1.57-1.18-2.99 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.66.5.24.57.81 1.99.88 2.13.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.45.3.15.48.12.66-.07.18-.19.76-.88.96-1.18.2-.3.4-.25.67-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.69-.17 1.36z"/>
    </SvgIcon>
  ),
  facebook: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8V11H6.6v3h2.7v8h4.2z"/>
    </SvgIcon>
  ),
  x: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.9l-5.4-6.7L4.9 22H2l7.3-8.4L1 2h7.1l4.9 6.1L18.9 2zm-1.2 18h1.7L7.2 3.9H5.4L17.7 20z"/>
    </SvgIcon>
  ),
  pinterest: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 0 0-3.6 19.3c-.05-.8-.1-2 .02-2.9.1-.8.7-5.2.7-5.2s-.18-.36-.18-.9c0-.85.5-1.49 1.12-1.49.53 0 .79.4.79.88 0 .54-.34 1.35-.52 2.1-.15.63.31 1.14.92 1.14 1.11 0 1.97-1.17 1.97-2.86 0-1.5-1.08-2.55-2.62-2.55-1.78 0-2.83 1.33-2.83 2.71 0 .54.2 1.12.47 1.43.05.06.06.12.04.19l-.18.74c-.03.12-.1.16-.22.1-.83-.38-1.35-1.56-1.35-2.51 0-2.04 1.48-3.92 4.27-3.92 2.24 0 3.98 1.6 3.98 3.73 0 2.22-1.4 4.01-3.34 4.01-.65 0-1.26-.34-1.47-.74l-.4 1.51c-.14.55-.52 1.25-.78 1.67A10 10 0 1 0 12 2z"/>
    </SvgIcon>
  ),
  linkedin: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0.5 23.5h4V7.5h-4v16zM8 7.5h3.8v2.2h.1c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1v9.9h-4v-8.8c0-2.1-.04-4.8-2.92-4.8-2.92 0-3.37 2.28-3.37 4.65v8.95H8v-16z"/>
    </SvgIcon>
  ),
  telegram: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M9.6 15.8 9.4 19c.3 0 .5-.1.7-.3l1.7-1.6 3.5 2.6c.6.3 1 .1 1.2-.6l2.2-10.3c.3-1-.4-1.4-1.1-1.2L3.8 10.6c-1 .4-1 1 .2 1.3l3.6 1.1 8.3-5.2c.4-.2.7-.1.4.1l-6.7 6.1z"/>
    </SvgIcon>
  ),
  email: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
    </SvgIcon>
  ),
  copy: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z"/>
    </SvgIcon>
  ),
};

const COLORS = {
  // Unified light background (match the "Copy link" button)
  btn: "bg-slate-200 hover:bg-slate-300 text-slate-900",
  // Brand colors for icons (keeps recognition while background stays unified)
  iconWhatsapp: "text-[#25D366]",
  iconFacebook: "text-[#1877F2]",
  iconX: "text-[#111827]",
  iconPinterest: "text-[#E60023]",
  iconLinkedin: "text-[#0A66C2]",
  iconTelegram: "text-[#229ED9]",
  iconEmail: "text-slate-700",
  iconCopy: "text-slate-900",
} as const;


type ShareLinkProps = {
  label: string;
  href: string;
  className?: string;
  icon: React.ReactNode;
  iconClassName?: string;
};

function ShareLink({ label, href, className = "", icon, iconClassName = "" }: ShareLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 shadow-sm transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 ${className}`}
      aria-label={label}
      title={label}
    >
      <IconWrap>
        <span className={iconClassName}>{icon}</span>
      </IconWrap>
      <span className="whitespace-nowrap text-xs font-semibold">{label}</span>
    </a>
  );
}


export default function SocialShareBar({ title, showCompanyDetails = true, url, imageUrl, variant = "inline" }: Props) {
  const [loc] = useLocation();
  const [copied, setCopied] = useState(false);

  const isAr = useMemo(() => {
    if (typeof window === "undefined") return true;
    return isArabicPath(window.location.pathname);
  }, []);

  const resolvedUrl = useMemo(() => {
    if (url) return url;
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, [url, loc]);

  const resolvedImage = useMemo(() => {
    if (imageUrl) return imageUrl;
    const og = safeGetOgImage();
    if (og) return og;
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/og-share.png`;
  }, [imageUrl, loc]);

  const shareText = useMemo(() => buildShareText({ title, url: resolvedUrl, isAr }), [title, resolvedUrl, isAr]);

  const company = isAr ? COMPANY_AR : COMPANY_EN;

  const links = useMemo(() => {
    const u = encode(resolvedUrl);
    const t = encode(shareText);
    return {
      whatsapp: `https://wa.me/?text=${t}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}&quote=${t}`,
      x: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${u}&media=${encode(resolvedImage)}&description=${t}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      telegram: `https://t.me/share/url?url=${u}&text=${t}`,
      email: `mailto:?subject=${encode(title ? title : (isAr ? "مشاركة مقال" : "Share article"))}&body=${t}`,
    };
  }, [resolvedUrl, shareText, resolvedImage, isAr, title]);

  const wrapClass = variant === "card" ? "rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur" : "";

  return (
    <section className={wrapClass} aria-label={isAr ? "مشاركة المقال" : "Share"}>
      <div className="flex flex-wrap items-center gap-2">
        <ShareLink label={isAr ? "واتساب" : "WhatsApp"} className={COLORS.btn} href={links.whatsapp} icon={Icons.whatsapp} iconClassName={COLORS.iconWhatsapp} />
        <ShareLink label={isAr ? "فيسبوك" : "Facebook"} className={COLORS.btn} href={links.facebook} icon={Icons.facebook} iconClassName={COLORS.iconFacebook} />
        <ShareLink label={isAr ? "إكس" : "X"} className={COLORS.btn} href={links.x} icon={Icons.x} iconClassName={COLORS.iconX} />
        <ShareLink label={isAr ? "بنتريست" : "Pinterest"} className={COLORS.btn} href={links.pinterest} icon={Icons.pinterest} iconClassName={COLORS.iconPinterest} />
        <ShareLink label={isAr ? "لينكدإن" : "LinkedIn"} className={COLORS.btn} href={links.linkedin} icon={Icons.linkedin} iconClassName={COLORS.iconLinkedin} />
        <ShareLink label={isAr ? "تيليجرام" : "Telegram"} className={COLORS.btn} href={links.telegram} icon={Icons.telegram} iconClassName={COLORS.iconTelegram} />
        <ShareLink label={isAr ? "البريد" : "Email"} className={COLORS.btn} href={links.email} icon={Icons.email} iconClassName={COLORS.iconEmail} />
        <button
          type="button"
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 shadow-sm transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 ${COLORS.btn}`}
          onClick={async () => {
            const ok = await copyToClipboard(resolvedUrl);
            setCopied(ok);
            window.setTimeout(() => setCopied(false), 1600);
          }}
          aria-label={isAr ? "نسخ الرابط" : "Copy link"}
          title={isAr ? "نسخ الرابط" : "Copy link"}
        >
          <IconWrap><span className={COLORS.iconCopy}>{Icons.copy}</span></IconWrap>
          <span className="whitespace-nowrap text-xs font-semibold">{copied ? (isAr ? "تم النسخ" : "Copied") : (isAr ? "نسخ الرابط" : "Copy")}</span>
        </button>
      </div>

      {showCompanyDetails ? (
        <div className="mt-3 rounded-xl border bg-white/60 p-3 text-sm leading-relaxed backdrop-blur">
          <div className="font-semibold">{company.name}</div>
          <div>
            <a href={`https://${company.site}`} className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">
              {company.site}
            </a>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a className="text-blue-700 hover:underline" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <a className="text-blue-700 hover:underline" href={`tel:${company.phone}`}>
              {company.phone}
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
