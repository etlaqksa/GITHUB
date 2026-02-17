import { useLayoutEffect } from "react";
import { useLocation } from "wouter";
import { useTheme, type ColorTheme } from "@/contexts/ThemeContext";

const THEME_HUE_OFFSETS: Record<ColorTheme, number> = {
  blue: 0,
  green: 120,
  orange: 35,
  purple: 275,
  red: 10,
};

function hashString(input: string): number {
  // Deterministic 32-bit hash (fast, good enough for UI theming)
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  // h in [0,360), s/l in [0,1]
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0,
    g1 = 0,
    b1 = 0;
  if (hp >= 0 && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (hp >= 1 && hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (hp >= 2 && hp < 3) [r1, g1, b1] = [0, c, x];
  else if (hp >= 3 && hp < 4) [r1, g1, b1] = [0, x, c];
  else if (hp >= 4 && hp < 5) [r1, g1, b1] = [x, 0, c];
  else if (hp >= 5 && hp < 6) [r1, g1, b1] = [c, 0, x];
  const m = l - c / 2;
  const r = Math.round((r1 + m) * 255);
  const g = Math.round((g1 + m) * 255);
  const b = Math.round((b1 + m) * 255);
  return [r, g, b];
}

export default function PageAccent() {
  const [location] = useLocation();
  const { colorTheme, mode } = useTheme();

  useLayoutEffect(() => {
    const html = document.documentElement;
    const loc = (location || "/").replace(/\/+$/, "") || "/";

    // Use the semantic route (wouter `base` already strips /ar or /en)
    // so the same page in Arabic/English shares the same accent.
    const key = loc === "" ? "/" : loc;

    const offset = THEME_HUE_OFFSETS[colorTheme] ?? 0;
    const hue = (hashString(key) % 360 + offset + 360) % 360;
    const hue2 = (hue + 28) % 360;

    const isDark = mode === "dark" || html.classList.contains("dark");

    // Tune lightness for better contrast across modes.
    const l1 = isDark ? 0.58 : 0.46;
    const l2 = isDark ? 0.54 : 0.50;
    const s1 = 0.88;
    const s2 = 0.86;

    const [r, g, b] = hslToRgb(hue, s1, l1);
    const [r2, g2, b2] = hslToRgb(hue2, s2, l2);

    // Page-level accent variables (used by cards/backgrounds/hover effects)
    html.style.setProperty("--page-accent-h", String(hue));
    html.style.setProperty("--page-accent-rgb", `${r} ${g} ${b}`);
    html.style.setProperty("--page-accent2-rgb", `${r2} ${g2} ${b2}`);

    // Wire the accent into the shadcn tokens so primary buttons/links follow the page accent.
    // These are simple CSS colors (instead of OKLCH) but work well across browsers.
    html.style.setProperty("--primary", `rgb(${r} ${g} ${b})`);
    html.style.setProperty("--ring", `rgb(${r} ${g} ${b})`);
    html.style.setProperty("--accent", `rgb(${r} ${g} ${b} / 0.12)`);
  }, [location, colorTheme, mode]);

  return null;
}
