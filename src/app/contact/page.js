"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { HoverText } from "../components/HoverText/HoverText";
import gsap from "gsap";
import { useLoading } from "../contexts/LoadingContext";

export default function Page() {
  const { loading } = useLoading();

  const emailLinkRef = useRef(null);
  const linkedinLinkRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      const emailLink = emailLinkRef.current;
      const linkedinLink = linkedinLinkRef.current;

      if (!emailLink || !linkedinLink) return;

      gsap.set(emailLink, { opacity: 1, scale: 1, y: 0 });
      gsap.set(linkedinLink, { opacity: 1, scale: 1, y: 0 });

      const timeline = gsap.timeline({
        defaults: {
          ease: "expo.out",
          duration: 1.3,
          y: 40,
          scale: 1.15,
          opacity: 0,
        },
      });

      timeline.from(emailLink, {}).from(linkedinLink, {}, "<");

      return () => {
        timeline.kill();
      };
    }
  }, [loading]);

  return (
    <section className={styles["contact"]}>
      <Link href={"/"} className={styles["back"]}>
        <HoverText text={"CLOSE"} />
      </Link>
      <div className={styles["contact-container"]}>
        <div className={styles["contact-content"]}>
          <div className={styles["email-link"]} ref={emailLinkRef}>
            <Link href={"mailto:andrejkoller@outlook.com"}>
              <HoverText text={"EMAIL"} />
            </Link>
          </div>
          <div className={styles["linkedin-link"]} ref={linkedinLinkRef}>
            <Link
              href={"https://www.linkedin.com/in/andrejkoller/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HoverText text={"LINKEDIN"} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
