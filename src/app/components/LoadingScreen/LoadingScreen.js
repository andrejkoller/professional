"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./LoadingScreen.module.css";

export const LoadingScreen = () => {
  const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 23, 30, 40, 50, 70, 80, 100,
  ];

  const [index, setIndex] = useState(0);
  const [hasFaded, setHasFaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
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

    if (hasFaded) {
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 800);
      return () => clearTimeout(removeTimer);
    }
  }, [index, hasFaded, numbers.length]);

  return (
    <div className={styles["loading-screen-container"]}>
      <div className={styles["loading-screen-content"]}>
        {isVisible && (
          <p
            className={`${styles["loading-number"]} ${
              hasFaded ? styles.fadeOut : ""
            }`}
            style={{
              left: `${numbers[index]}%`,
            }}
          >
            {numbers[index]}
          </p>
        )}
      </div>
    </div>
  );
};
