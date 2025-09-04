"use client";

import Link from "next/link";
import styles from "./page.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import ScrambleTextOnHover from "../../components/ScrambleOnHover/ScrambleTextOnHover";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const { loading } = useLoading();

  const backLinkRef = useRef(null);
  const navRef = useRef(null);
  const titleRef = useRef(null);
  const projectRef = useRef(null);
  const nav2Ref = useRef(null);

  useEffect(() => {
    if (!loading) {
      const backLink = backLinkRef.current;
      const nav = navRef.current;
      const title = titleRef.current;
      const project = projectRef.current;
      const nav2 = nav2Ref.current;

      if (!backLink || !nav || !title || !project || !nav2) return;

      const backLinkFadeInTimeline = gsap.timeline();
      backLinkFadeInTimeline.to(backLink, {
        delay: 0.5,
        opacity: 1,
        ease: "expo.out",
        duration: 1,
      });

      const titleAppearTimeline = gsap.timeline();
      titleAppearTimeline.to(title, {
        delay: 0.5,
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "expo.out",
        duration: 1.3,
      });

      const navScrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
        defaults: { duration: 1, ease: "power2.out" },
      });

      navScrollTimeline.to(nav, {
        scale: 0.8,
        opacity: 0.1,
        ease: "power2.out",
      });

      return () => {
        backLinkFadeInTimeline.kill();
        titleAppearTimeline.kill();
        navScrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [loading]);

  return (
    <>
      <div className={styles.titleContainer}>
        <Link href={"/"} className={styles.back} ref={backLinkRef}>
          <ScrambleTextOnHover text={"close"} enabled={true} />
        </Link>
        <figure className={styles.titleContent} ref={navRef}>
          <figure className={styles.title} ref={titleRef}>
            <div>( INFO )</div>
          </figure>
        </figure>
      </div>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutContent}>
          <figure className={styles.figure} ref={projectRef}></figure>
          <section className={styles.infoSection}>
            <figure className={styles.figureInner}></figure>
            <div className={styles.infoTitle}>
              <h2>
                passionate web developer with a focus on frontend development,
                design and user experience.
              </h2>
            </div>
            <div className={styles.infoContent}>
              <figure className={styles.infoDescription}>
                <p>
                  tools and technologies used so far
                  <br />
                  HTML5, CSS3, SCSS, JavaScript, TypeScript, Angular, React,
                  Next.js, Vue.js, .NET, C#, Java, Mssql, Tailwindcss,
                  Bootstrap, WordPress, Webflow
                  <br />
                </p>
                <p>
                  <Link
                    href={"https://github.com/andrejkoller"}
                    target="_blank"
                  >
                    <ScrambleTextOnHover text={"GitHub"} enabled={true} />
                  </Link>
                </p>
              </figure>
            </div>
            <div className={styles.infoTitle}>
              <h2>
                always puts an emphasis on creating memorable experience that
                transcends objectives.
              </h2>
            </div>
            <div className={styles.infoTitle}>
              <h2>*</h2>
            </div>
          </section>
          <figure className={styles.figure2} ref={nav2Ref}>
            <h2>
              open for collaboration <br />
              <Link href={"mailto:andrejkoller@outlook.com"}>
                <ScrambleTextOnHover text={"reach out"} enabled={true} />
              </Link>
            </h2>
          </figure>
        </div>
      </div>
    </>
  );
}
