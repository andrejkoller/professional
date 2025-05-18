"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { HoverText } from "./components/HoverText/HoverText";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navRef = useRef(null);
  
  useEffect(() => {
    const nav = navRef.current;

    gsap.to(nav, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
      scale: 0.8,
      opacity: 0.7,
      ease: "power3.out",
      pointerEvents: "none",
      transformOrigin: "center center",
    });
  }, []);

  return (
    <>
      <div className={styles["container"]}>
        <nav className={styles["navigation"]} ref={navRef}>
          <div className={styles["first-row"]}>
            <h1>ANDREJ KOLLER</h1>
            <div className={styles["logo"]}>
              <ThemeSwitcher />
            </div>
          </div>
          <div className={styles["second-row"]}>
            <h2>
              <span>UI/UX</span>
              <span>FRONTEND</span>
              <span>BACKEND</span>
            </h2>
          </div>
          <div className={styles["third-row"]}>
            <p>12.40</p>
            <p>—</p>
            <p>SELECTED WORKS</p>
          </div>
          <ul className={styles["fourth-row"]}>
            <li>
              <Link href={"/about"}>
                <HoverText text={"INFO"} />
              </Link>
            </li>
            <li>
              <Link href={"/contact"}>
                <HoverText text={"CONTACT"} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles["sections-container"]}>
        <figure className={styles["figure"]}>
          <p>SCROLL TO EXPLORE</p>
        </figure>
        <section className={styles["project"]}>
          <div className={styles["project-content"]}>
            <h2>PROJECT 1</h2>
          </div>
        </section>
        <section className={styles["project"]}>
          <div className={styles["project-content"]}>
            <h2>PROJECT 2</h2>
          </div>
        </section>
        <section className={styles["project"]}>
          <div className={styles["project-content"]}>
            <h2>PROJECT 3</h2>
          </div>
        </section>
        <section className={styles["project"]}>
          <div className={styles["project-content"]}>
            <h2>PROJECT 4</h2>
          </div>
        </section>
        <figure className={styles["figure2"]}>
          <p>SCROLL UP</p>
        </figure>
      </div>
    </>
  );
}
