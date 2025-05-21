"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./LoadingScreen.module.css";

export const LoadingScreen = () => {
  const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 23, 30, 40, 50, 70, 80, 100,
  ];

  const [index, setIndex] = useState(0);
  const [hasFaded, setHasFaded] = useState(false);

  const loadingNumberRef = useRef(null);

  useEffect(() => {
    const loadingNumberElement = loadingNumberRef.current;
    const delay = index < 10 ? 100 : 150;

    if (index < numbers.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else if (index === numbers.length - 1 && !hasFaded) {
      const fadeTimer = setTimeout(() => {
        loadingNumberElement?.classList.add("fade-out");
        setHasFaded(true);
      }, 1000);
      return () => clearTimeout(fadeTimer);
    }
  }, [index, hasFaded, numbers.length]);

  return (
    <div className={styles["loading-screen"]}>
      <p
        className={styles["loading-number"]}
        ref={loadingNumberRef}
        style={{
          transform: `translateX(${numbers[index]}%)`,
          transition: "transform 0.02s linear",
        }}
      >
        {numbers[index]}
      </p>
    </div>
  );
};
