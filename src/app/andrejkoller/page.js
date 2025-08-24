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
            <span className={styles.projectTitleText}>Andrej Koller</span>
          </h1>
        </div>
      </div>
      <div className={styles.projectBody}>
        <section className={styles.projectDescription}>
          <p className={styles.projectDescriptionTitle}>
            Classical Performances
          </p>
          <div className={styles.projectDescriptionContent}>
            <p className={styles.projectDescriptionText}>
              This personal website is a space where I share my passion for
              classical music, especially through my piano and organ
              performances. Built with React and Next.js, the site offers a
              clean, modern experience where visitors can explore recordings,
              discover favorite composers, and learn more about my musical
              journey. It reflects not only my interests as a musician, but also
              my dedication to design and development, combining artistic
              expression with technical precision.
            </p>
            <div className={styles.projectDescriptionTags}>
              <p className={styles.projectDescriptionTag}>CLASSICAL MUSIC</p>
              <p className={styles.projectDescriptionTag}>PIANO & ORGAN</p>
              <p className={styles.projectDescriptionTag}>2025</p>
            </div>
          </div>
        </section>
        <section className={styles.projectImages}>
          <div className={styles.projectImageContainer}>
            <Image
              src={"/images/placeholder-image.png"}
              alt="Andrej Koller Image"
              width={800}
              height={600}
              className={styles.projectImage}
            />
          </div>
        </section>
      </div>
      <div className={styles.projectNext}>
        <Link href={"/work"} className={styles.projectNextLink}>
          <div className={styles.projectNextTextContainer}>
            <p className={styles.projectNextText}>Work</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
