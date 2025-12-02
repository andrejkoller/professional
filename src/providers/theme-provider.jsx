"use client";

import { ThemeContext } from "@/contexts/theme-context";
import { useTheme } from "@/hooks/use-theme";

export function ThemeProvider({ children }) {
  const themeValue = useTheme();

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}
