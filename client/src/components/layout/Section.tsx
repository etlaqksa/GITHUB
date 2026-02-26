import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "default" | "muted" | "ink";

export function Section({
  id,
  tone = "default",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-16",
        tone === "muted" && "bg-muted/25 border-y border-border/60",
        tone === "ink" && "bg-slate-950 text-white border-y border-white/10",
        className
      )}
    >
      <div className="container px-4">{children}</div>
    </section>
  );
}
