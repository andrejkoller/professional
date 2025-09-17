"use client";

import React, { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ onComplete }) {
  const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 23, 30, 40, 50, 70, 80, 100,
  ];

  const [index, setIndex] = useState(0);
  const [hasFaded, setHasFaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isPageVisible) return;

    if (index < numbers.length - 1) {
      const delay = index < 10 ? 100 : 150;
      const timer = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timer);
    }

    if (index === numbers.length - 1 && !hasFaded) {
      const pauseTimer = setTimeout(() => {
        setHasFaded(true);
      }, 200);
      return () => clearTimeout(pauseTimer);
    }

    if (hasFaded && isVisible) {
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) {
          onComplete();
        }
      }, 800);
      return () => clearTimeout(removeTimer);
    }
  }, [index, hasFaded, numbers.length, isPageVisible, isVisible, onComplete]);

  return (
    <div className={styles.loadingScreenContainer}>
      <div className={styles.loadingScreenContent}>
        {isVisible && (
          <p
            className={`${styles.loadingNumber} ${
              hasFaded ? styles.fadeOut : ""
            }`}
            style={{
              left: `${5 + numbers[index] * 0.9}vw`,
            }}
          >
            {numbers[index]}
          </p>
        )}
      </div>
    </div>
  );
}
