import { createContext, useContext } from "react";

export const TransitionContext = createContext(null);

export function useTransitionContext() {
  return useContext(TransitionContext);
}
