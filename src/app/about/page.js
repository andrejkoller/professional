"use client";
import Link from "next/link";
import styles from "./page.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import { useLoading } from "../contexts/LoadingContext";
import ScrambleTextOnHover from "../components/ScrambleOnHover/ScrambleTextOnHover";

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

      const timeline3 = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      timeline3.to(nav, {
        scale: 0.8,
        opacity: 0.1,
        ease: "power4.out",
      });

      return () => {
        timeline1.kill();
        timeline2.kill();
        timeline3.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [loading]);

  return (
    <>
      <div className={styles["title-container"]}>
        <Link href={"/"} className={styles["back"]} ref={backLinkRef}>
          <ScrambleTextOnHover text={"close"} />
        </Link>
        <figure className={styles["title-content"]} ref={navRef}>
          <figure className={styles["title"]} ref={titleRef}>
            <div>( INFO )</div>
          </figure>
        </figure>
      </div>
      <div className={styles["about-container"]}>
        <div className={styles["about-content"]}>
          <figure className={styles["figure"]} ref={projectRef}></figure>
          <section className={styles["info-section"]}>
            <figure className={styles["figure-inner"]}></figure>
            <div className={styles["info-title"]}>
              <h2>
                passionate application developer with a focus on frontend
                development, design and user experience.
              </h2>
            </div>
            <div className={styles["info-content"]}>
              <figure className={styles["info-description"]}>
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
                    <ScrambleTextOnHover text={"GitHub"} />
                  </Link>
                </p>
              </figure>
            </div>
            <div className={styles["info-title"]}>
              <h2>
                always puts an emphasis on creating memorable experience that
                transcends objectives.
              </h2>
            </div>
            <div className={styles["info-title"]}>
              <h2>*</h2>
            </div>
          </section>
          <figure className={styles["figure2"]} ref={nav2Ref}>
            <h2>
              open for collaboration <br />
              <Link href={"mailto:andrejkoller@outlook.com"}>
                <ScrambleTextOnHover text={"reach out"} />
              </Link>
            </h2>
          </figure>
        </div>
      </div>
    </>
  );
}
