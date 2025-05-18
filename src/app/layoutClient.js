"use client";

import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { useEffect, useRef, useState } from "react";
import "./globals.css";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

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
        return arguments.length
          ? lenis.scrollTo(value)
          : lenis.scroll.instance.scroll.y;
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
    <>
      {loading && <LoadingScreen />}
      <main>{children}</main>
    </>
  );
}
