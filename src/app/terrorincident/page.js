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
              Terror Incident
            </span>
          </h1>
        </div>
      </div>
      <div className={styles["project-body"]}>
        <section className={styles["project-description"]}>
          <p className={styles["project-description-title"]}>
            Mapping global threats with real-time analysis in Terror Incident
          </p>
          <div className={styles["project-description-content"]}>
            <p className={styles["project-description-text"]}>
              Terror Incident is an ongoing data-driven project focused on
              monitoring and visualizing global terrorist attacks through the
              collection of police reports and news sources. The core objective
              is to create a platform that consolidates scattered incident data
              into a centralized, interactive map. By leveraging real-time data
              parsing, geolocation services, and filtering mechanisms, the
              project aims to provide a clear visual overview of global threat
              activity. One of the key challenges lies in handling unstructured
              and multilingual data from diverse sources while ensuring
              accuracy, neutrality, and user-friendly presentation. The result
              is a powerful tool for researchers, analysts, and the public to
              better understand patterns of violence across regions and time.
            </p>
            <div className={styles["project-description-tags"]}>
              <p className={styles["project-description-tag"]}>
                DATA VISUALIZATION, SECURITY ANALYSIS
              </p>
              <p className={styles["project-description-tag"]}>
                TERROR INCIDENT
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
            <p className={styles["project-next-text"]}>Arabian Nights</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
