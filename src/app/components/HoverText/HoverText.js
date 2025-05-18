"use client";

import { useRef, useState } from "react";

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const HoverText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const intervalRef = useRef(null);

  const scrambleLetters = () => {
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
    }, 50);
  };

  return (
    <span
      onMouseEnter={scrambleLetters}
      style={{
        display: "inline-block",
        letterSpacing: "0.05em",
        cursor: "pointer",
      }}
    >
      {displayedText}
    </span>
  );
};
