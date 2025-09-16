"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLoading } from "../../contexts/LoadingContext";
import ScrambleTextOnHover from "../../components/ScrambleOnHover/ScrambleTextOnHover";
import { useTransition } from "../../contexts/TransitionContext";
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
            <span className={styles.projectTitleText}>Terror Watch</span>
          </h1>
        </div>
      </div>
      <div className={styles.projectBody}>
        <section className={styles.projectDescription}>
          <p className={styles.projectDescriptionTitle}>
            Interactive Visualization of Global Terror Incidents
          </p>
          <div className={styles.projectDescriptionContent}>
            <p className={styles.projectDescriptionText}>
              Terror Watch is an interactive web application designed to
              visualize and analyze global terror events. The project combines
              real-time data rendering with immersive 3D environments to offer
              users an engaging, informative experience. Built with Angular and
              Three.js on the frontend, and powered by a robust .NET and MSSQL
              backend, the system allows filtering by time, location, and
              incident type. Whether for research, awareness, or educational
              purposes, Terror Watch provides a dramatic and data-driven
              perspective on one of the world’s most pressing issues.
            </p>
            <div className={styles.projectDescriptionTags}>
              <p className={styles.projectDescriptionTag}>DATA VISUALIZATION</p>
              <p className={styles.projectDescriptionTag}>
                SECURITY & AWARENESS
              </p>
              <p className={styles.projectDescriptionTag}>ONGOING</p>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.projectNext}>
        <Link href={"/omelia"} className={styles.projectNextLink}>
          <div className={styles.projectNextTextContainer}>
            <p className={styles.projectNextText}>Omelia</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
