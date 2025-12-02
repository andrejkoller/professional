"use client";

import { useState } from "react";

export function useTransitionState() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState("var(--background)");
  const [isNavigating, setIsNavigating] = useState(false);

  return {
    isTransitioning,
    setIsTransitioning,
    transitionColor,
    setTransitionColor,
    isNavigating,
    setIsNavigating,
  };
}
