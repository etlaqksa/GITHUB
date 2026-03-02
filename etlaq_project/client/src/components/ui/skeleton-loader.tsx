import React from "react";

export type SkeletonType = "text" | "card" | "block";

interface SkeletonProps {
  className?: string;
  type?: SkeletonType;
}

/**
 * Lightweight skeleton loader (no external deps).
 * Uses the shimmer animation defined in `index.css`.
 */
export default function SkeletonLoader({ className = "", type = "text" }: SkeletonProps) {
  const baseClass =
    "relative overflow-hidden bg-muted/70 rounded isolate " +
    "after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer " +
    "after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent";

  if (type === "card") {
    return (
      <div className={`etlaq-card w-full rounded-2xl border bg-card p-4 shadow-sm ${className}`}>
        <div className={`h-40 w-full mb-4 rounded-xl ${baseClass}`} />
        <div className={`h-6 w-3/4 mb-3 ${baseClass}`} />
        <div className="space-y-2">
          <div className={`h-4 w-full ${baseClass}`} />
          <div className={`h-4 w-5/6 ${baseClass}`} />
        </div>
      </div>
    );
  }

  if (type === "block") {
    return <div className={`h-32 w-full ${baseClass} ${className}`} />;
  }

  // default: text line
  return <div className={`h-4 w-full ${baseClass} ${className}`} />;
}
