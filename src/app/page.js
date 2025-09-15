"use client";

import Link from "next/link";
import styles from "./page.module.css";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useLoading } from "../contexts/LoadingContext";
import ScrambleTextInitial from "../components/ScrambleTextInitial/ScrambleTextInitial";
import ScrambleTextOnHover from "../components/ScrambleOnHover/ScrambleTextOnHover";

const projects = [
  {
    title: "Andrej Koller",
    href: "/andrejkoller",
    imageSrc: "/images/placeholder-image.png",
    imageAlt: "Andrej Koller",
    bg: "var(--andrej-koller-bg)",
    color: "var(--andrej-koller-color)",
    disabled: false,
  },
  {
    title: "Work",
    href: "/work",
    imageSrc: "/images/placeholder-image.png",
    imageAlt: "Work",
    bg: "var(--work-bg)",
    color: "var(--work-color)",
    disabled: false,
  },
  {
    title: "Art",
    href: "/art",
    imageSrc: "/images/placeholder-image.png",
    imageAlt: "Art",
    bg: "var(--art-bg)",
    color: "var(--art-color)",
    disabled: false,
  },
  {
    title: "Fading Hell",
    href: "/fadinghell",
    imageSrc: "/images/placeholder-image.png",
    imageAlt: "Fading Hell",
    bg: "var(--fading-hell-bg)",
    color: "var(--fading-hell-color)",
    disabled: false,
  },
  {
    title: "Bible Gateway",
    href: "/biblegateway",
    imageSrc: "/images/placeholder-image.png",
    imageAlt: "Bible Gateway",
    bg: "var(--bible-gateway-bg)",
    color: "var(--bible-gateway-color)",
    disabled: true,
  },
  {
    title: "Theology Gateway",
    href: "/theologygateway",
    imageSrc: "/images/placeholder-image.png",
    imageAlt: "Theology Gateway",
    bg: "var(--theology-gateway-bg)",
    color: "var(--theology-gateway-color)",
    disabled: false,
  },
  {
    title: "Terror Watch",
    href: "/terrorwatch",
    imageSrc: "/images/placeholder-image.png",
    imageAlt: "Terror Watch",
    bg: "var(--terror-watch-bg)",
    color: "var(--terror-watch-color)",
    disabled: true,
  },
  {
    title: "Omelia",
    href: "/omelia",
    imageSrc: "/images/placeholder-image.png",
    imageAlt: "Omelia",
    bg: "var(--omelia-bg)",
    color: "var(--omelia-color)",
    disabled: false,
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { loading } = useLoading();

  const navRef = useRef(null);
  const projectRef = useRef(null);
  const nav2Ref = useRef(null);
  const scrollDownRef = useRef(null);
  const scrollUpRef = useRef(null);

  const [infoReady, setInfoReady] = useState(false);
  const [contactReady, setContactReady] = useState(false);

  const titleRefs = useRef([]);
  const imageRefs = useRef([]);

  const handleProjectImageMouseEnter = useCallback((bg, color, index) => {
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = bg;
      if (titleRefs.current[index]) {
        titleRefs.current[index].style.color = color;
      }
    }
  }, []);

  const handleProjectImageMouseLeave = useCallback((index) => {
    document.body.style.backgroundColor = "var(--background)";
    if (titleRefs.current[index]) {
      titleRefs.current[index].style.color = "var(--foreground)";
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      const nav = navRef.current;
      const project = projectRef.current;
      const nav2 = nav2Ref.current;
      const scrollDown = scrollDownRef.current;
      const scrollUp = scrollUpRef.current;

      if (!nav || !project || !nav2 || !scrollDown || !scrollUp) return;

      const navScaleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top top",
          endTrigger: nav2,
          end: "bottom bottom",
          scrub: 2,
        },
        defaults: { duration: 1, ease: "power2.out" },
      });

      navScaleTimeline
        .to(nav, {
          scale: 0.8,
          opacity: 0.5,
          ease: "power2.out",
          duration: 0.2,
        })
        .to(nav, {
          scale: 0.8,
          opacity: 0.5,
          ease: "none",
          duration: 0.6,
        })
        .to(nav, {
          scale: 1.15,
          opacity: 1,
          ease: "power2.out",
          duration: 0.2,
        });

      const navResetTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "top+=1 top",
          scrub: 1,
          onLeave: () => {},
          onEnterBack: () => {
            gsap.to(nav, {
              scale: 1.15,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            });
          },
        },
      });

      gsap.set(scrollDown, { opacity: 1 });

      const scrollDownFadeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
        defaults: { duration: 1, ease: "power2.out" },
      });

      scrollDownFadeTimeline.to(scrollDown, {
        opacity: 0,
        ease: "power2.out",
      });

      gsap.set(scrollUp, { opacity: 0 });

      const scrollUpFadeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: nav2,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
        defaults: { duration: 1, ease: "power2.out" },
      });

      scrollUpFadeTimeline.to(scrollUp, {
        opacity: 1,
        ease: "power2.out",
      });

      document.body.style.backgroundColor = "var(--background)";
      return () => {
        navScaleTimeline.kill();
        navResetTimeline.kill();
        scrollDownFadeTimeline.kill();
        scrollUpFadeTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [loading, infoReady, contactReady]);

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.navigation} ref={navRef}>
          <div
            className={`${styles.firstRow} ${styles.row}`}
            style={{ animationDelay: "0s" }}
          >
            <h1>
              <ScrambleTextInitial texts={"Andrej Koller"} delay={0} />
            </h1>
            <div className={styles.logo}>
              <ThemeSwitcher />
            </div>
          </div>

          <div
            className={`${styles.secondRow} ${styles.row}`}
            style={{ animationDelay: "0.3s" }}
          >
            <h2>
              <ScrambleTextInitial texts={"Freelance UI/UX Code"} delay={0.3} />
            </h2>
          </div>

          <div
            className={`${styles.thirdRow} ${styles.row}`}
            style={{ animationDelay: "1.1s" }}
          >
            <p>
              <ScrambleTextInitial texts={"12.40"} delay={1.1} />
            </p>
            <p>
              <ScrambleTextInitial texts={"—"} delay={1.1} />
            </p>
            <p>
              <ScrambleTextInitial texts={"Selected Works"} delay={1.1} />
            </p>
          </div>

          <ul
            className={`${styles.fourthRow} ${styles.row}`}
            style={{ animationDelay: "1.5s" }}
          >
            <li>
              <Link href="/about">
                {!infoReady ? (
                  <ScrambleTextInitial
                    texts={"Info"}
                    delay={1.5}
                    onIntroDone={() => setInfoReady(true)}
                  />
                ) : (
                  <ScrambleTextOnHover text="Info" enabled={infoReady} />
                )}
              </Link>
            </li>
            <li>
              <Link href="/contact">
                {!contactReady ? (
                  <ScrambleTextInitial
                    texts={"Contact"}
                    delay={1.5}
                    onIntroDone={() => setContactReady(true)}
                  />
                ) : (
                  <ScrambleTextOnHover text="Contact" enabled={contactReady} />
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.sectionsContainer}>
        <figure className={styles.figure} ref={projectRef}>
          <p ref={scrollDownRef}>Scroll to explore</p>
        </figure>

        {projects
          .filter((project) => !project.disabled)
          .map((project, index) => (
            <section className={styles.project} key={project.title}>
              <figure className={styles.figureInner}></figure>
              <div className={styles.projectTitle}>
                <h2 ref={(el) => (titleRefs.current[index] = el)}>
                  <Link href={project.href}>{project.title}</Link>
                </h2>
              </div>
              <div className={styles.projectContent}>
                <figure className={styles.projectFigureImage}>
                  <div className={styles.projectImage}>
                    <Link href={project.href}>
                      <Image
                        ref={(el) => (imageRefs.current[index] = el)}
                        src={project.imageSrc}
                        onMouseEnter={() =>
                          handleProjectImageMouseEnter(
                            project.bg,
                            project.color,
                            index
                          )
                        }
                        onMouseLeave={() => handleProjectImageMouseLeave(index)}
                        priority
                        height={500}
                        width={500}
                        alt={project.imageAlt}
                        style={{
                          filter: project.color,
                        }}
                      ></Image>
                    </Link>
                  </div>
                </figure>
              </div>
            </section>
          ))}

        <figure className={styles.figure2} ref={nav2Ref}>
          <p ref={scrollUpRef}>Scroll up</p>
        </figure>
      </div>
    </>
  );
}
