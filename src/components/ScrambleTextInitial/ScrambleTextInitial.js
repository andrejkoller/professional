"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import styles from "./ScrambleTextInitial.module.css";
import { useLoading } from "../../contexts/LoadingContext";

gsap.registerPlugin(ScrambleTextPlugin);

export default function ScrambleTextInitial({
  texts,
  delay = 0,
  duration = 1.5,
  onIntroDone = null,
}) {
  const { loading } = useLoading();
  const el = useRef();

  useEffect(() => {
    if (!loading) {
      if (!el.current) return;

      gsap.fromTo(
        el.current,
        { opacity: 0, x: -24, clipPath: "inset(0% 0% 0% 100%)" },
        {
          opacity: 1,
          x: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration,
          delay,
          ease: "expo.out",
          scrambleText: {
            text: texts,
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_",
            revealDelay: duration * 0.5,
            speed: 1,
          },
          onComplete: () => {
            if (onIntroDone && typeof onIntroDone === "function") {
              onIntroDone();
            }
          },
        }
      );
    }
  }, [texts, delay, duration, loading, onIntroDone]);

  return (
    <span className={styles.scrambleText} ref={el}>
      {texts}
    </span>
  );
}
