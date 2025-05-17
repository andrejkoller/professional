"use client";

import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { useEffect, useRef, useState } from "react";
import "./globals.css";

export default function LayoutClient({ children }) {
  const [loading, setLoading] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const timer = setTimeout(() => setLoading(false), 3500);
      isFirstRender.current = false;
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <main>{children}</main>
    </>
  );
}
