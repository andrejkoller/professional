"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLoading } from "../contexts/LoadingContext";
import ScrambleTextOnHover from "../components/ScrambleOnHover/ScrambleTextOnHover";

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
      <div className={styles["project-body"]}></div>
    </div>
  );
}
