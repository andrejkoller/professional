"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoading } from "../../contexts/LoadingContext";
import ScrambleTextOnHover from "../../components/ScrambleOnHover/ScrambleTextOnHover";

export default function Page() {
  const { loading } = useLoading();

  const backLinkRef = useRef(null);
  const contactContentRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      const backLink = backLinkRef.current;
      const contactContent = contactContentRef.current;

      if (!backLink || !contactContent) return;

      const timeline1 = gsap.timeline();
      timeline1.to(backLink, {
        delay: 0.5,
        opacity: 1,
        ease: "power4.out",
        duration: 1,
      });

      const timeline2 = gsap.timeline();
      timeline2.to(contactContent, {
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
  }, [loading]);

  return (
    <section className={styles.contact}>
      <Link href={"/"} className={styles.back} ref={backLinkRef}>
        <ScrambleTextOnHover text={"close"} enabled={true} />
      </Link>
      <div className={styles.contactContainer}>
        <div className={styles.contactContent} ref={contactContentRef}>
          <div className={styles.emailLink}>
            <Link href={"mailto:andrejkoller@outlook.com"}>
              <ScrambleTextOnHover text={"Email"} enabled={true} />
            </Link>
          </div>
          <div className={styles.linkedinLink}>
            <Link
              href={"https://www.linkedin.com/in/andrejkoller/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ScrambleTextOnHover text={"LinkedIn"} enabled={true} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
