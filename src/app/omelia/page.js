"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLoading } from "../../contexts/LoadingContext";
import ScrambleTextOnHover from "../../components/ScrambleOnHover/ScrambleTextOnHover";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const { loading } = useLoading();

  const backLinkRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      const backLink = backLinkRef.current;
      const title = titleRef.current;

      if (!backLink) return;

      const backLinkFadeInTimeline = gsap.timeline();
      backLinkFadeInTimeline.to(backLink, {
        delay: 0.5,
        opacity: 1,
        ease: "expo.out",
        duration: 1,
      });

      const titleAppearTimeline = gsap.timeline();
      titleAppearTimeline.to(title, {
        delay: 0.5,
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
      <Link href={"/"} className={styles.back} ref={backLinkRef}>
        <ScrambleTextOnHover text={"close"} enabled={true} />
      </Link>
      <div className={styles.projectHeader}>
        <div className={styles.projectHeaderContent}>
          <h1 className={styles.projectTitle} ref={titleRef}>
            <span className={styles.projectTitleText}>Omelia</span>
          </h1>
        </div>
      </div>
      <div className={styles.projectBody}>
        <section className={styles.projectDescription}>
          <p className={styles.projectDescriptionTitle}>Omelia</p>
          <div className={styles.projectDescriptionContent}>
            <p className={styles.projectDescriptionText}>
              Omelia provides modern developer tools to build the web of
              tomorrow. From a powerful frontend framework to a flexible UI
              component library, Omelia offers the foundation for creating fast,
              scalable, and beautifully designed applications. With a focus on
              performance, accessibility, and developer experience, Omelia
              continues to expand its ecosystem—delivering solutions that
              empower teams to move from idea to production with confidence.
            </p>
            <div className={styles.projectDescriptionTags}>
              <p className={styles.projectDescriptionTag}>DEVELOPER TOOLS</p>
              <p className={styles.projectDescriptionTag}>2025</p>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.projectNext}>
        <Link href={"/andrejkoller"} className={styles.projectNextLink}>
          <div className={styles.projectNextTextContainer}>
            <p className={styles.projectNextText}>Andrej Koller</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
