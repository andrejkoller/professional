"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { HoverText } from "../components/HoverText/HoverText";

export default function Page() {
  const [animate, setAnimate] = useState(false);
  const emailRef = useRef(null);
  const linkedinRef = useRef(null);

  useEffect(() => {
    [emailRef.current, linkedinRef.current].forEach((ref) => {
      if (ref) {
        ref.style.translate = "none";
        ref.style.rotate = "none";
        ref.style.scale = "none";
        ref.style.opacity = "1";
        ref.style.transform = "translate(0px, 0px)";
      }
    });
    setAnimate(true);
  }, []);

  return (
    <section className={styles["contact"]}>
      <Link href={"/"} className={styles["back"]}>
        <HoverText text={"CLOSE"} />
      </Link>
      <div className={styles["contact-container"]}>
        <div className={styles["contact-content"]}>
          <div className={styles["email-link"]} ref={emailRef}>
            <Link
              className={`${styles["email-link"]} ${
                animate ? styles["animate-in"] : ""
              }`}
              href={"mailto:andrejkoller@outlook.com"}
            >
              <HoverText text={"EMAIL"} />
            </Link>
          </div>
          <div className={styles["linkedin-link"]} ref={linkedinRef}>
            <Link
              className={`${styles["linkedin-link"]} ${
                animate ? styles["animate-in"] : ""
              }`}
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
