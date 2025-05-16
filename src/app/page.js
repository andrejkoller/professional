import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles["container"]}>
        <nav className={styles["navigation"]}>
          <div className={styles["first-row"]}>
            <h1>ANDREJ KOLLER</h1>
            <div className={styles["logo"]}>
              <svg>
                <path></path>
              </svg>
            </div>
          </div>
          <div className={styles["second-row"]}>
            <h2>FRONTEND BACKEND DESIGN</h2>
          </div>
          <div className={styles["third-row"]}>
            <p>18.24</p>
            <p>—</p>
            <p>SELECTED WORKS</p>
          </div>
          <ul className={styles["fourth-row"]}>
            <li>
              <Link href={"/about"}>INFO</Link>
            </li>
            <li>
              <Link href={"/contact"}>CONTACT</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles["sections-container"]}>
        <figure className={styles["nav"]}></figure>
        <section className={styles["project"]}></section>
        <section className={styles["project"]}></section>
        <section className={styles["project"]}></section>
        <section className={styles["project"]}></section>
        <figure className={styles["nav2"]}></figure>
      </div>
    </>
  );
}
