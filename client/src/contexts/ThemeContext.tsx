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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    try {
      const stored = localStorage.getItem("theme-mode");
      return (stored as Mode) || "light";
    } catch {
      return "light";
    }
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    try {
      const stored = localStorage.getItem("color-theme");
      return (stored as ColorTheme) || "blue";
    } catch {
      return "blue";
    }
  });

  useEffect(() => {
    const html = document.documentElement;
    
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

    // Handle Color Theme - Apply to HTML element specifically
    console.log(`Applying theme attribute: data-theme="${colorTheme}"`);
    html.setAttribute("data-theme", colorTheme);
    try {
      localStorage.setItem("color-theme", colorTheme);
    } catch {
      // ignore
    }
    
    // Force a small style recalculation if needed
    html.style.display = 'none';
    html.offsetHeight; // trigger reflow
    html.style.display = '';
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
