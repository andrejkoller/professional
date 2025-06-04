"use client";
import { useRef, useState } from "react";
import styles from "./ScrambleTextOnHover.module.css";

export default function ScrambleTextOnHover({
  text,
  scrambleDuration = 0.8,
  steps = 10,
}) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef();

  const scramble = () => {
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
  };

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

function shuffleText(text) {
  const arr = text.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}
