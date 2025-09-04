"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLoading } from "../../contexts/LoadingContext";
import ScrambleTextOnHover from "../../components/ScrambleOnHover/ScrambleTextOnHover";
import Image from "next/image";

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

      const timeline1 = gsap.timeline();
      timeline1.to(backLink, {
        delay: 0.5,
        opacity: 1,
        ease: "power4.out",
        duration: 1,
      });

      const timeline2 = gsap.timeline();
      timeline2.to(title, {
        delay: 0.5,
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "expo.out",
        duration: 1.3,
      });

      return () => {
        timeline1.kill();
        timeline2.kill();
      };
    }
  });

  return (
    <div className={styles.project}>
      <Link href={"/"} className={styles.back} ref={backLinkRef}>
        <ScrambleTextOnHover text={"close"} enabled={true} />
      </Link>
      <div className={styles.projectHeader}>
        <div className={styles.projectHeaderContent}>
          <h1 className={styles.projectTitle} ref={titleRef}>
            <span className={styles.projectTitleText}>Art</span>
          </h1>
        </div>
      </div>
      <div className={styles.projectBody}>
        <section className={styles.projectDescription}>
          <p className={styles.projectDescriptionTitle}>Artistic Expression</p>
          <div className={styles.projectDescriptionContent}>
            <p className={styles.projectDescriptionText}>
              Alongside my development projects, I have launched a separate
              subdomain dedicated entirely to art. Here, I share personal
              artworks—digital, hand-drawn, or experimental—that offer a
              different lens into how I think, feel, and create. It is meant to
              be a quiet corner beyond code—a reflective place to pause,
              observe, and simply take in beauty without noise or deadlines.
            </p>
            <div className={styles.projectDescriptionTags}>
              <p className={styles.projectDescriptionTag}>Art</p>
              <p className={styles.projectDescriptionTag}>
                Digital & Traditional
              </p>
              <p className={styles.projectDescriptionTag}>2025</p>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.projectNext}>
        <Link href={"/fadinghell"} className={styles.projectNextLink}>
          <div className={styles.projectNextTextContainer}>
            <p className={styles.projectNextText}>Fading Hell</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
