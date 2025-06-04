"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ScrambleTextOnHover.module.css";

export default function ScrambleTextOnHover({
  text,
  scrambleDuration = 0.8,
  steps = 10,
  enabled,
  children,
}) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef();

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const scramble = () => {
    if (enabled) {
      clearInterval(intervalRef.current);
      let iterations = 0;

      intervalRef.current = setInterval(() => {
        iterations++;
        if (iterations >= steps) {
          setDisplayText(text);
          clearInterval(intervalRef.current);
        } else {
          setDisplayText(shuffleText(text));
        }
      }, (scrambleDuration * 500) / steps);
    }
  };

  if (typeof text === "string") {
    return (
      <span
        onMouseEnter={scramble}
        className={styles["scramble-text"]}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        {displayText}
      </span>
    );
  }

  return <span>{children}</span>;
}

function shuffleText(text) {
  const arr = text.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}
