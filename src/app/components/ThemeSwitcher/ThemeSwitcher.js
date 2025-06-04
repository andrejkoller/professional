"use client";
import React, { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";
import ScrambleTextInitial from "../ScrambleTextInitial/ScrambleTextInitial";
import ScrambleTextOnHover from "../ScrambleOnHover/ScrambleTextOnHover";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  const [themeReady, setThemeReady] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      const initialTheme = prefersDarkScheme.matches ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, []);

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
