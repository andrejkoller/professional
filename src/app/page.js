"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { AnimatedText } from "./components/AnimatedText/AnimatedText";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useLoading } from "./contexts/LoadingContext";
import AnimatedLink from "./components/AnimatedLink/AnimatedLink";

const projects = [
  {
    title: "Fading Hell",
    href: "/fadinghell",
    imageSrc: "/images/placeholder-image.png",
    imageAlt: "Fading Hell",
    color: "#8c0d0d",
  },
  {
    title: "Terror Incident",
    href: "/terrorincident",
    imageSrc: "/images/placeholder-image.png",
    imageAlt: "Terror Incident",
    color: "#0d8c0d",
  },
  {
    title: "Arabian Nights",
    href: "/arabian-nights",
    imageSrc: "/images/placeholder-image.png",
    imageAlt: "Arabian Nights",
    color: "#0d0d8c",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [showFourth, setShowFourth] = useState(false);
  const [showFifth, setShowFifth] = useState(false);
  const [showSixth, setShowSixth] = useState(false);
  const [showSeventh, setShowSeventh] = useState(false);

  const { loading } = useLoading();

  const navRef = useRef(null);
  const projectRef = useRef(null);
  const nav2Ref = useRef(null);
  const scrollDownRef = useRef(null);
  const scrollUpRef = useRef(null);

  const handleProjectImageMouseEnter = useCallback((color) => {
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = color;
    }
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

      if (!nav || !project || !nav2 || !scrollDown || !scrollUp) return;

      const timeline1 = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top top",
          endTrigger: nav2,
          end: "bottom top",
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

      const fadeInTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: nav2,
          start: "bottom bottom",
          end: "bottom+=1 bottom",
          toggleActions: "play none none reverse",
        },
      });
      fadeInTimeline.to(scrollUp, {
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      });

      const fadeOutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: nav2,
          start: "bottom bottom",
          end: "bottom+=1 bottom",
          scrub: true,
        },
      });
      fadeOutTimeline.to(scrollUp, {
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      return () => {
        timeline1.kill();
        timeline2.kill();
        fadeInTimeline.kill();
        fadeOutTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [loading]);

  return (
    <>
      <div className={styles["container"]}>
        <nav className={styles["navigation"]} ref={navRef}>
          <div
            className={`${styles["first-row"]} ${styles["row"]}`}
            style={{ animationDelay: "0s" }}
          >
            <h1>
              <AnimatedText
                text="Andrej Koller"
                isHoverable={false}
                onIntroDone={() => setShowThemeSwitcher(true)}
              />
            </h1>
            <div className={styles["logo"]}>
              <ThemeSwitcher
                show={showThemeSwitcher}
                onIntroDone={() => setShowSecond(true)}
              />
            </div>
          </div>
          <div
            className={`${styles["second-row"]} ${styles["row"]}`}
            style={{ animationDelay: "0.3s" }}
          >
            <h2>
              {showSecond && (
                <AnimatedText
                  text="Freelance UI/UX Code"
                  isHoverable={false}
                  onIntroDone={() => setShowThird(true)}
                />
              )}
            </h2>
          </div>
          <div
            className={`${styles["third-row"]} ${styles["row"]}`}
            style={{ animationDelay: "1.1s" }}
          >
            <p>
              {showThird && (
                <AnimatedText
                  text={"12.40"}
                  isHoverable={false}
                  onIntroDone={() => setShowFourth(true)}
                />
              )}
            </p>
            <p>
              {showFourth && (
                <AnimatedText
                  text={"—"}
                  isHoverable={false}
                  onIntroDone={() => setShowFifth(true)}
                />
              )}
            </p>
            <p>
              {showFifth && (
                <AnimatedText
                  text={"Selected Works"}
                  isHoverable={false}
                  onIntroDone={() => setShowSixth(true)}
                />
              )}
            </p>
          </div>
          <ul
            className={`${styles["fourth-row"]} ${styles["row"]}`}
            style={{ animationDelay: "1.5s" }}
          >
            <li>
              {showSixth && (
                <Link href={"/about"}>
                  <AnimatedText
                    text={"info"}
                    isHoverable={true}
                    onIntroDone={() => setShowSeventh(true)}
                  />
                </Link>
              )}
            </li>
            <li>
              {showSeventh && (
                <Link href={"/contact"}>
                  <AnimatedText text={"contact"} isHoverable={true} />
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles["sections-container"]}>
        <figure className={styles["figure"]} ref={projectRef}>
          <p ref={scrollDownRef}>Scroll to explore</p>
        </figure>
        {projects.map((project) => (
          <section className={styles["project"]} key={project.title}>
            <figure className={styles["figure-inner"]}></figure>
            <div className={styles["project-title"]}>
              <h2>
                <AnimatedLink href={project.href}>{project.title}</AnimatedLink>
              </h2>
            </div>
            <div className={styles["project-content"]}>
              <figure className={styles["project-figure-image"]}>
                <div className={styles["project-image"]}>
                  <AnimatedLink href={project.href}>
                    <Image
                      src={project.imageSrc}
                      onMouseEnter={() =>
                        handleProjectImageMouseEnter(project.color)
                      }
                      onMouseLeave={handleProjectImageMouseLeave}
                      priority
                      height={500}
                      width={500}
                      alt={project.imageAlt}
                    ></Image>
                  </AnimatedLink>
                </div>
              </figure>
            </div>
          </section>
        ))}
        <figure className={styles["figure2"]} ref={nav2Ref}>
          <p ref={scrollUpRef}>Scroll up</p>
        </figure>
      </div>
    </>
  );
}
