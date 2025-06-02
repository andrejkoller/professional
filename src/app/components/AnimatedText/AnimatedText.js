"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./AnimatedText.module.css";
import { useLoading } from "@/app/contexts/LoadingContext";

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const AnimatedText = ({
  text,
  introDelay = 0,
  isHoverable,
  onIntroDone,
}) => {
  const [visible, setVisible] = useState(false);

  const { loading } = useLoading();

  const [displayedText, setDisplayedText] = useState("");
  const [introDone, setIntroDone] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!loading && !introDone) {
      const fadeTimeout = setTimeout(() => setVisible(true), 10);

      let iteration = 0;
      clearInterval(intervalRef.current);

      const startIntro = () => {
        intervalRef.current = setInterval(() => {
          if (iteration <= text.length) {
            const left = text.slice(0, iteration);
            const right = text
              .slice(iteration)
              .split("")
              .map((char, i, arr) => shuffleArray(arr)[i])
              .join("");
            setDisplayedText(left + right);
            iteration++;
          } else {
            clearInterval(intervalRef.current);
            setDisplayedText(text);
            setIntroDone(true);
            if (onIntroDone) onIntroDone();
          }
        }, 40);
      };

      if (introDelay > 0) {
        const timeout = setTimeout(startIntro, introDelay);
        return () => {
          clearTimeout(timeout);
          clearInterval(intervalRef.current);
        };
      } else {
        startIntro();
        return () => {
          clearTimeout(fadeTimeout);
          clearInterval(intervalRef.current);
        };
      }
    }
  }, [loading, text, introDelay, onIntroDone, introDone]);

  const scrambleLetters = (isHoverable) => {
    if (isHoverable && introDone) {
      let iteration = 0;
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (iteration <= text.length) {
          const left = text.slice(0, iteration);
          const right = text
            .slice(iteration)
            .split("")
            .map((char, i, arr) => shuffleArray(arr)[i])
            .join("");
          setDisplayedText(left + right);
          iteration++;
        } else {
          clearInterval(intervalRef.current);
          setDisplayedText(text);
        }
      }, 60);
    }
  };

  return (
    <span
      onMouseEnter={() => scrambleLetters(isHoverable)}
      className={`${styles["hover-text"]} ${visible ? styles.visible : ""}`}
    >
      {displayedText}
    </span>
  );
};
