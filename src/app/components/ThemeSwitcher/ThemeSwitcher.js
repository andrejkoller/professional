"use client";
import React, { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";
import ScrambleTextInitial from "../ScrambleTextInitial/ScrambleTextInitial";
import ScrambleTextOnHover from "../ScrambleOnHover/ScrambleTextOnHover";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [themeReady, setThemeReady] = useState(false);

  return (
    <button onClick={toggleTheme} className={styles["theme-switcher"]}>
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
