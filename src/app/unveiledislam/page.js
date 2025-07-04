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
            <span className={styles["project-title-text"]}>Unveiled Islam</span>
          </h1>
        </div>
      </div>
      <div className={styles["project-body"]}>
        <section className={styles["project-description"]}>
          <p className={styles["project-description-title"]}>
            Unveiled Islam – Piercing the Veil of a Global Faith
          </p>
          <div className={styles["project-description-content"]}>
            <p className={styles["project-description-text"]}>
              Unveiled Islamis more than a project — it’s a confrontation with
              the unspoken. In an age clouded by political correctness,
              misinformation, and silence, this work steps boldly into the arena
              of truth-seeking. Delving deep into the origins, scriptures, and
              ideologies of Islam, it examines not only what is believed — but
              why it is believed. Through historical texts, theological
              scrutiny, and critical perspectives, Unveiled Islam invites the
              viewer to wrestle with questions often left untouched. With
              structured themes, multilingual support, and clear source
              references, it seeks to cut through the noise and reveal what lies
              beneath the surface. For the curious, the skeptical, and the
              faithful alike — this is an invitation to clarity, courage, and
              discovery.
            </p>
            <div className={styles["project-description-tags"]}>
              <p className={styles["project-description-tag"]}>
                ISLAM, DECONSTRUCTION
              </p>
              <p className={styles["project-description-tag"]}>
                APOLOGETICS & ANALYSIS
              </p>
              <p className={styles["project-description-tag"]}>ONGOING</p>
            </div>
          </div>
        </section>
        <section className={styles["project-images"]}>
          <div className={styles["project-image-container"]}>
            <Image
              src={"/images/placeholder-image.png"}
              alt="Terror Incident Image"
              width={800}
              height={600}
              className={styles["project-image"]}
            />
          </div>
        </section>
      </div>
      <div className={styles["project-next"]}>
        <Link href={"/arabiannights"} className={styles["project-next-link"]}>
          <div className={styles["project-next-text-container"]}>
            <p className={styles["project-next-text"]}>Ariabic Nights</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
