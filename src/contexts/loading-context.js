import { createContext, useContext } from "react";

export const LoadingContext = createContext({
  loading: true,
  isFirstRender: true,
  setLoading: () => {},
});

export function useLoadingContext() {
  return useContext(LoadingContext);
}
