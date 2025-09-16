"use client";

import { createContext, useContext, useState } from "react";

const TransitionContext = createContext(null);

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState("var(--background)");
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <TransitionContext.Provider 
      value={{ 
        isTransitioning, 
        setIsTransitioning,
        transitionColor,
        setTransitionColor,
        isNavigating,
        setIsNavigating
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}
