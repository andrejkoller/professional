"use client";

import styles from "./page.module.css";
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLoading } from "../../contexts/LoadingContext";
import { useTransition } from "../../contexts/TransitionContext";
import ScrambleTextOnHover from "../../components/ScrambleOnHover/ScrambleTextOnHover";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const { loading } = useLoading();
  const { setIsTransitioning, setTransitionColor, setIsNavigating } =
    useTransition();
  const router = useRouter();

  const backLinkRef = useRef(null);
  const titleRef = useRef(null);

  const handleTransitionTo = useCallback(
    (href, bgColor) => {
      setTransitionColor(bgColor);
      setIsTransitioning(true);
      setIsNavigating(true);

      setTimeout(() => {
        router.push(href);
      }, 1000);
    },
    [setTransitionColor, setIsTransitioning, setIsNavigating, router]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setIsNavigating(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setIsTransitioning, setIsNavigating]);

  useEffect(() => {
    if (!loading) {
      const backLink = backLinkRef.current;
      const title = titleRef.current;

      if (!backLink) return;

      const backLinkFadeInTimeline = gsap.timeline();
      backLinkFadeInTimeline.to(backLink, {
        delay: 1.1,
        opacity: 1,
        ease: "expo.out",
        duration: 1,
      });

      const titleAppearTimeline = gsap.timeline();
      titleAppearTimeline.to(title, {
        delay: 1.1,
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "expo.out",
        duration: 1.3,
      });

      return () => {
        backLinkFadeInTimeline.kill();
        titleAppearTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [loading]);

  return (
    <div className={styles.project}>
      <button
        onClick={() => router.push("/")}
        className={styles.back}
        ref={backLinkRef}
      >
        <ScrambleTextOnHover text={"close"} enabled={true} />
      </button>
      <div className={styles.projectHeader}>
        <div className={styles.projectHeaderContent}>
          <h1 className={styles.projectTitle} ref={titleRef}>
            <span className={styles.projectTitleText}>Work</span>
          </h1>
        </div>
      </div>
      <div className={styles.projectBody}>
        <section className={styles.projectDescription}>
          <p className={styles.projectDescriptionTitle}>
            Projects and Collaborations
          </p>
          <div className={styles.projectDescriptionContent}>
            <p className={styles.projectDescriptionText}>
              This platform serves as a curated preview of selected development
              projects I&apos;ve worked on—either independently or in
              collaboration with others. Each project reflects different areas
              of my skillset, including UI design, frontend architecture, and
              backend logic. The site itself is built with React, Next.js, and
              GSAP, offering smooth animations, structured content, and a clean
              presentation of ideas.
            </p>
            <div className={styles.projectDescriptionTags}>
              <p className={styles.projectDescriptionTag}>PROJECT HIGHLIGHTS</p>
              <p className={styles.projectDescriptionTag}>
                UI/UX DESIGN & DEVELOPMENT
              </p>
              <p className={styles.projectDescriptionTag}>ONGOING</p>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.projectNext}>
        <div className={styles.projectNextLink}>
          <button
            className={styles.projectNextButton}
            onClick={() =>
              handleTransitionTo("/fadinghell", "var(--fading-hell-bg)")
            }
          >
            <div className={styles.projectNextTextContainer}>
              <p className={styles.projectNextText}>Fading Hell</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
