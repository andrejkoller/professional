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
            <span className={styles["project-title-text"]}>Arabian Nights</span>
          </h1>
        </div>
      </div>
      <div className={styles["project-body"]}>
        <section className={styles["project-description"]}>
          <p className={styles["project-description-title"]}>
            Designing a rich coding experience with the Arabian Nights Theme for
            VS Code
          </p>
          <div className={styles["project-description-content"]}>
            <p className={styles["project-description-text"]}>
              As part of my passion for crafting aesthetic and meaningful user
              experiences, I designed the Arabian Nights theme for Visual Studio
              Code. The aim was to build a syntax highlighting theme that not
              only feels elegant and easy on the eyes during long coding
              sessions, but also evokes a sense of mystique and creativity drawn
              from the rich storytelling tradition of the East. The challenge
              was finding harmony between style and usability—ensuring enough
              contrast, accessibility, and color psychology to improve focus
              without causing fatigue. The result is a theme that invites
              developers into a world of deep tones, soft lights, and
              imaginative flow.
            </p>
            <div className={styles["project-description-tags"]}>
              <p className={styles["project-description-tag"]}>
                DESIGN, DEVELOPER TOOLS
              </p>
              <p className={styles["project-description-tag"]}>
                ARABIAN NIGHTS THEME
              </p>
              <p className={styles["project-description-tag"]}>2025</p>
            </div>
          </div>
        </section>
        <section className={styles["project-images"]}>
          <div className={styles["project-image-container"]}>
            <Image
              src={"/images/arabian-nights-screenshot.png"}
              alt="Arabian Nights Image"
              width={1920}
              height={1080}
              priority
              className={styles["project-image"]}
            />
          </div>
        </section>
      </div>
      <div className={styles["project-next"]}>
        <Link href={"/fadinghell"} className={styles["project-next-link"]}>
          <div className={styles["project-next-text-container"]}>
            <p className={styles["project-next-text"]}>Fading Hell</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
