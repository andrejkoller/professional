"use client";

import { TransitionContext } from "@/contexts/transition-context";
import { useTransitionState } from "@/hooks/use-transition";

export function TransitionProvider({ children }) {
  const transitionValue = useTransitionState();

  return (
    <TransitionContext.Provider value={transitionValue}>
      {children}
    </TransitionContext.Provider>
  );
}
