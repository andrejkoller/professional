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
            <span className={styles["project-title-text"]}>Fading Hell</span>
          </h1>
        </div>
      </div>
      <div className={styles["project-body"]}>
        <section className={styles["project-description"]}>
          <p className={styles["project-description-title"]}>
            Bringing intensity and purpose to metalcore with Fading Hell’s
            collaborative project
          </p>
          <div className={styles["project-description-content"]}>
            <p className={styles["project-description-text"]}>
              During my free time, I initiated Fading Hell, a collaborative
              metalcore project with a subtle infusion of Christian themes. The
              goal was to create a raw and emotional sound that captures both
              the aggression and hope found in life’s struggles. Drawing
              inspiration from early 2000s metalcore and modern production
              techniques, we focused on blending heavy breakdowns with melodic
              interludes and thoughtful lyrics. One of our key challenges was
              finding the right balance between musical brutality and spiritual
              depth, crafting a sound that resonates with both secular and
              faith-driven audiences. This effort led to a unique identity that
              stands out in the underground scene, reflecting our passion and
              authenticity.
            </p>
            <div className={styles["project-description-tags"]}>
              <p className={styles["project-description-tag"]}>
                MUSIC, CREATIVE COLLABORATION
              </p>
              <p className={styles["project-description-tag"]}>FADING HELL</p>
              <p className={styles["project-description-tag"]}>ONGOING</p>
            </div>
          </div>
        </section>
        <section className={styles["project-images"]}>
          <div className={styles["project-image-container"]}>
            <Image
              src={"/images/placeholder-image.png"}
              alt="Fading Hell Image"
              width={800}
              height={600}
              className={styles["project-image"]}
            />
          </div>
        </section>
      </div>
      <div className={styles["project-next"]}>
        <Link href={"/terrorincident"} className={styles["project-next-link"]}>
          <div className={styles["project-next-text-container"]}>
            <p className={styles["project-next-text"]}>Terror Incident</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
