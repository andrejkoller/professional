"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { HoverText } from "./components/HoverText/HoverText";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";
import gsap from "gsap";
import { useCallback, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useLoading } from "./contexts/LoadingContext";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { loading } = useLoading();

  const navRef = useRef(null);
  const projectRef = useRef(null);
  const nav2Ref = useRef(null);
  const scrollDownRef = useRef(null);
  const scrollUpRef = useRef(null);
  const projectImageRef = useRef(null);

  const handleProjetImageMouseEnter = useCallback((color) => {
    document.body.style.backgroundColor = color;
  }, []);

  const handleProjectImageMouseLeave = useCallback(() => {
    document.body.style.backgroundColor = "var(--background)";
  }, []);

  useEffect(() => {
    if (!loading) {
      const nav = navRef.current;
      const project = projectRef.current;
      const nav2 = nav2Ref.current;
      const scrollDown = scrollDownRef.current;
      const scrollUp = scrollUpRef.current;
      const projectImage = projectImageRef.current;

      if (
        !nav ||
        !project ||
        !nav2 ||
        !scrollDown ||
        !scrollUp ||
        !projectImage
      )
        return;

      const timeline1 = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top top",
          endTrigger: nav2,
          end: "bottom bottom",
          scrub: true,
        },
        defaults: { duration: 1, ease: "power4.out" },
      });

      timeline1
        .to(nav, {
          scale: 0.8,
          opacity: 0.7,
          ease: "power4.out",
        })
        .to(nav, {
          scale: 1,
          opacity: 1,
          ease: "power4.out",
        });

      const timeline2 = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
        defaults: { duration: 1, ease: "power4.out" },
      });

      timeline2.to(scrollDown, {
        opacity: 0,
        ease: "power4.out",
      });

      const timeline3 = gsap.timeline({
        scrollTrigger: {
          trigger: nav2,
          start: "bottom bottom",
          endTrigger: project,
          end: "bottom bottom",
          scrub: true,
        },
        defaults: { duration: 1, ease: "power4.out" },
      });

      timeline3.to(scrollUp, {
        opacity: 1,
        ease: "power4.out",
      });

      return () => {
        timeline1.kill();
        timeline2.kill();
        timeline3.kill();
      };
    }
  }, [loading]);

  return (
    <>
      <div className={styles["container"]}>
        <nav className={styles["navigation"]} ref={navRef}>
          <div className={styles["first-row"]}>
            <h1>Andrej Koller</h1>
            <div className={styles["logo"]}>
              <ThemeSwitcher />
            </div>
          </div>
          <div className={styles["second-row"]}>
            <h2>
              <span>Ui/Ux</span>
              <span>Frontend</span>
              <span>Backend</span>
            </h2>
          </div>
          <div className={styles["third-row"]}>
            <p>12.40</p>
            <p>—</p>
            <p>Selected Works</p>
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
        <figure className={styles["figure"]} ref={projectRef}>
          <p ref={scrollDownRef}>Scroll to explore</p>
        </figure>
        <section className={styles["project"]}>
          <figure className={styles["figure-inner"]}></figure>
          <div className={styles["project-title"]}>
            <h2>
              <Link href={"/fadinghell"}>Fading Hell</Link>
            </h2>
          </div>
          <div className={styles["project-content"]}>
            <figure
              className={styles["project-figure-image"]}
              ref={projectImageRef}
            >
              <div className={styles["project-image"]}>
                <Link
                  href={"/fadinghell"}
                  onMouseEnter={() => handleProjetImageMouseEnter("#8c0d0d")}
                  onMouseLeave={handleProjectImageMouseLeave}
                >
                  <Image
                    src={"/images/placeholder-image.png"}
                    priority
                    height={500}
                    width={500}
                    alt="Fading Hell"
                  ></Image>
                </Link>
              </div>
            </figure>
          </div>
        </section>
        <figure className={styles["figure2"]} ref={nav2Ref}>
          <p ref={scrollUpRef}>Scroll up</p>
        </figure>
      </div>
    </>
  );
}
