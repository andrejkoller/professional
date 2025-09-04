"use client";

import { createContext, useContext, useState } from "react";

const TransitionContext = createContext(null);

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState("var(--background)");

  return (
    <TransitionContext.Provider 
      value={{ 
        isTransitioning, 
        setIsTransitioning,
        transitionColor,
        setTransitionColor
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}
