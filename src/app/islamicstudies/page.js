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
            <span className={styles["project-title-text"]}>
              Islamic Studies
            </span>
          </h1>
        </div>
      </div>
      <div className={styles["project-body"]}>
        <section className={styles["project-description"]}>
          <p className={styles["project-description-title"]}>
            Understanding the Islamic World through Islamic Studies
          </p>
          <div className={styles["project-description-content"]}>
            <p className={styles["project-description-text"]}>
              Islamic Studies is an ongoing academic project aimed at providing
              a broad and balanced overview of Islam as a global religion and
              cultural force. The project focuses on exploring core beliefs,
              historical developments, and the diverse expressions of Islamic
              thought and practice across different regions. By collecting and
              organizing content from historical texts, modern scholarship, and
              cultural sources, it seeks to offer a centralized and accessible
              platform for learning and reflection. Tools such as thematic
              categorization, multilingual content support, and contextual
              references help present the material in a clear and engaging way.
              A key challenge is ensuring the representation of varied
              perspectives within the Islamic tradition while maintaining
              clarity and neutrality. The project serves as a valuable resource
              for students, educators, and anyone interested in gaining a deeper
              understanding of Islam and its influence in the world.
            </p>
            <div className={styles["project-description-tags"]}>
              <p className={styles["project-description-tag"]}>
                ISLAM, RELIGIOUS ANALYSIS
              </p>
              <p className={styles["project-description-tag"]}>
                ISLAMIC STUDIES
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
        <Link href={"/terrorincident"} className={styles["project-next-link"]}>
          <div className={styles["project-next-text-container"]}>
            <p className={styles["project-next-text"]}>Terror Incident</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
