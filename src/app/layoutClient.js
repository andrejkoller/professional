"use client";

import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { useEffect, useRef, useState } from "react";
import "./globals.css";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { LoadingContext } from "../contexts/LoadingContext";
import { TransitionProvider } from "../contexts/TransitionContext";
import { useTransition } from "../contexts/TransitionContext";
import TransitionOverlay from "../components/TransitionOverlay/TransitionOverlay";
import { ThemeProvider } from "../contexts/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function LayoutClient({ children }) {
  const [loading, setLoading] = useState(true);

  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <ThemeProvider>
      <LoadingContext.Provider
        value={{ loading, isFirstRenderRef, setLoading }}
      >
        <TransitionProvider>
          <TransitionOverlayWrapper />
          {loading ? (
            <LoadingScreen onComplete={() => setLoading(false)} />
          ) : null}
          <main>{children}</main>
        </TransitionProvider>
      </LoadingContext.Provider>
    </ThemeProvider>
  );
}

function TransitionOverlayWrapper() {
  const { isTransitioning, transitionColor, isNavigating } = useTransition();

  return (
    <>
      {isNavigating && (
        <TransitionOverlay
          isActive={isTransitioning}
          backgroundColor={transitionColor}
        />
      )}
    </>
  );
}
