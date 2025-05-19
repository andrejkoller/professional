"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { HoverText } from "./components/HoverText/HoverText";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navRef = useRef(null);
  const projectRef = useRef(null);
  const nav2Ref = useRef(null);
  const scrollRef = useRef(null);
  const scroll2Ref = useRef(null);
  const projectImageRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    const project = projectRef.current;
    const nav2 = nav2Ref.current;
    const scroll = scrollRef.current;
    const scroll2 = scroll2Ref.current;
    const projectImage = projectImageRef.current;

    if (!nav || !project || !nav2 || !scroll || !scroll2 || !projectImage)
      return;

    const timeline1 = gsap.timeline({
      scrollTrigger: {
        trigger: project,
        start: "top top",
        endTrigger: nav2,
        end: "bottom bottom",
        scrub: 1.5,
      },
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
        scrub: 1.5,
      },
      defaults: { duration: 1, ease: "power3.out" },
    });

    timeline2.to(scroll, {
      opacity: 0,
      ease: "power4.out",
    });

    const timeline3 = gsap.timeline({
      scrollTrigger: {
        trigger: nav2,
        start: "bottom bottom",
        endTrigger: project,
        end: "bottom bottom",
        scrub: 1.5,
      },
      defaults: { duration: 1, ease: "power3.out" },
    });

    timeline3.to(scroll2, {
      opacity: 1,
      ease: "power4.out",
    });

    ScrollTrigger.create({
      trigger: projectImage,
      start: "top center",
      end: "bottom center",
      onEnter: () =>
        gsap.to(document.body, { backgroundColor: "#8c0d0d", duration: 0.5 }),
      onLeave: () =>
        gsap.to(document.body, {
          backgroundColor: "var(--background)",
          duration: 0.5,
        }),
      onEnterBack: () =>
        gsap.to(document.body, { backgroundColor: "#8c0d0d", duration: 0.5 }),
      onLeaveBack: () =>
        gsap.to(document.body, {
          backgroundColor: "var(--background)",
          duration: 0.5,
        }),
    });

    return () => {
      timeline1.kill();
      timeline2.kill();
      timeline3.kill();
    };
  }, []);

  return (
    <>
      <div className={styles["container"]}>
        <nav className={styles["navigation"]} ref={navRef}>
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
          <p ref={scrollRef}>SCROLL TO EXPLORE</p>
        </figure>
        <section className={styles["project"]}>
          <figure className={styles["figure-inner"]}></figure>
          <div className={styles["project-title"]}>
            <h2>
              <Link href={"/fadinghell"}>FADING HELL</Link>
            </h2>
          </div>
          <div className={styles["project-content"]}>
            <figure
              className={styles["project-figure-image"]}
              ref={projectImageRef}
            >
              <div className={styles["project-image"]}>
                <Image
                  src={"/images/placeholder-image.png"}
                  priority
                  height={500}
                  width={500}
                  alt="FADING HELL"
                ></Image>
              </div>
            </figure>
          </div>
        </section>
        <figure className={styles["figure2"]} ref={nav2Ref}>
          <p ref={scroll2Ref}>SCROLL UP</p>
        </figure>
      </div>
    </>
  );
}
