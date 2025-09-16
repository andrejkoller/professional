"use client";

import styles from "./page.module.css";
import { useCallback, useEffect, useRef } from "react";
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
            <span className={styles.projectTitleText}>Bible Gateway</span>
          </h1>
        </div>
      </div>
      <div className={styles.projectBody}>
        <section className={styles.projectDescription}>
          <p className={styles.projectDescriptionTitle}>
            The Bible, Anytime, Anywhere
          </p>
          <div className={styles.projectDescriptionContent}>
            <p className={styles.projectDescriptionText}>
              Bible Gateway is an online resource designed to make the Bible
              accessible to everyone, anywhere. It offers free access to
              multiple translations, languages, and study tools, allowing
              readers to search, read, and compare Scripture with ease. Whether
              for personal devotion, academic study, or teaching, Bible Gateway
              provides a simple and comprehensive way to engage with God’s Word.
            </p>
            <div className={styles.projectDescriptionTags}>
              <p className={styles.projectDescriptionTag}>BIBLE STUDY</p>
              <p className={styles.projectDescriptionTag}>STUDY TOOLS</p>
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
              handleTransitionTo("/terrorwatch", "var(--terror-watch-bg)")
            }
          >
            <div className={styles.projectNextTextContainer}>
              <p className={styles.projectNextText}>Terror Watch</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
