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
        <Link href={"/terrorwatch"} className={styles.projectNextLink}>
          <div className={styles.projectNextTextContainer}>
            <p className={styles.projectNextText}>Terror Watch</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
