"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLoading } from "../contexts/LoadingContext";
import ScrambleTextOnHover from "../components/ScrambleOnHover/ScrambleTextOnHover";
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
    <div className={styles["project"]}>
      <Link href={"/"} className={styles["back"]} ref={backLinkRef}>
        <ScrambleTextOnHover text={"close"} enabled={true} />
      </Link>
      <div className={styles["project-header"]}>
        <div className={styles["project-header-content"]}>
          <h1 className={styles["project-title"]} ref={titleRef}>
            <span className={styles["project-title-text"]}>Andrej Koller</span>
          </h1>
        </div>
      </div>
      <div className={styles["project-body"]}>
        <section className={styles["project-description"]}>
          <p className={styles["project-description-title"]}>
            Classical Performances
          </p>
          <div className={styles["project-description-content"]}>
            <p className={styles["project-description-text"]}>
              This personal website is a space where I share my passion for
              classical music, especially through my piano and organ
              performances. Built with React and Next.js, the site offers a
              clean, modern experience where visitors can explore recordings,
              discover favorite composers, and learn more about my musical
              journey. It reflects not only my interests as a musician, but also
              my dedication to design and development, combining artistic
              expression with technical precision.
            </p>
            <div className={styles["project-description-tags"]}>
              <p className={styles["project-description-tag"]}>
                CLASSICAL MUSIC
              </p>
              <p className={styles["project-description-tag"]}>PIANO & ORGAN</p>
              <p className={styles["project-description-tag"]}>2025</p>
            </div>
          </div>
        </section>
        <section className={styles["project-images"]}>
          <div className={styles["project-image-container"]}>
            <Image
              src={"/images/placeholder-image.png"}
              alt="Andrej Koller Image"
              width={800}
              height={600}
              className={styles["project-image"]}
            />
          </div>
        </section>
      </div>
      <div className={styles["project-next"]}>
        <Link href={"/work"} className={styles["project-next-link"]}>
          <div className={styles["project-next-text-container"]}>
            <p className={styles["project-next-text"]}>Work</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
