import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "start";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "space-y-3",
        isCenter ? "text-center mx-auto max-w-3xl" : "text-start max-w-2xl",
        className
      )}
    >
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-semibold text-foreground/80 shadow-sm">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-muted-foreground leading-relaxed">{subtitle}</p>
      ) : null}
    </div>
  );
}
