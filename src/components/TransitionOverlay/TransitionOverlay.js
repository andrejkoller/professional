"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function TransitionOverlay({ isActive, backgroundColor }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isActive) {
      gsap.set(overlayRef.current, { y: "100%" });
      gsap.to(overlayRef.current, {
        y: "0%",
        duration: 1,
        ease: "power4.inOut",
      });
    } else {
      gsap.to(overlayRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
      });
    }
  }, [isActive]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: backgroundColor || "var(--background)",
        zIndex: 10003,
        pointerEvents: "none",
        transform: "translateY(100%)",
      }}
    />
  );
}
