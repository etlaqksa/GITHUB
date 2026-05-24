import React, { createContext, useContext, useEffect, useState } from "react";

export type ColorTheme = "blue" | "green" | "orange" | "purple" | "red";
type Mode = "light" | "dark";

interface ThemeContextType {
  mode: Mode;
  colorTheme: ColorTheme;
  toggleMode: () => void;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultMode = "dark",
  defaultColorTheme = "blue",
}: {
  children: React.ReactNode;
  defaultMode?: Mode;
  defaultColorTheme?: ColorTheme;
}) {
  const [mode, setMode] = useState<Mode>(() => {
    try {
      const stored = localStorage.getItem("theme-mode");
      return (stored as Mode) || defaultMode;
    } catch {
      return defaultMode;
    }
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    try {
      const stored = localStorage.getItem("color-theme");
      return (stored as ColorTheme) || defaultColorTheme;
    } catch {
      return defaultColorTheme;
    }
  });

  useEffect(() => {
    const html = document.documentElement;

    // Apply the selected static color theme globally across all pages.
    html.setAttribute("data-theme", colorTheme);

    // Handle Light/Dark Mode
    if (mode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme-mode", mode);
    } catch {
      // ignore
    }

    // Persist the user's preferred color family.
    try {
      localStorage.setItem("color-theme", colorTheme);
    } catch {
      // ignore
    }
  }, [mode, colorTheme]);

  const toggleMode = () => {
    setMode(prev => (prev === "light" ? "dark" : "light"));
  };

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
  };

  return (
    <ThemeContext.Provider value={{ mode, colorTheme, toggleMode, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
