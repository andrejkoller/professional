"use client";

import React, { useState } from "react";
import styles from "./theme-switcher.module.css";
import ScrambleTextInitial from "@/components/scramble-text-initial/scramble-text-initial";
import ScrambleTextOnHover from "@/components/scramble-text-on-hover/scramble-text-on-hover";
import { useTheme } from "@/hooks/use-theme";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [themeReady, setThemeReady] = useState(false);

  return (
    <button onClick={toggleTheme} className={styles.themeSwitcher}>
      {!themeReady ? (
        <ScrambleTextInitial
          texts={theme === "light" ? "dark" : "light"}
          delay={0}
          onIntroDone={() => setThemeReady(true)}
        />
      ) : (
        <ScrambleTextOnHover
          text={theme === "light" ? "dark" : "light"}
          enabled={themeReady}
        />
      )}
    </button>
  );
}
