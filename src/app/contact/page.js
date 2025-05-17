import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
  return (
    <section className={styles["contact"]}>
      <Link href={"/"} className={styles["back"]}>
        CLOSE
      </Link>
      <div className={styles["contact-container"]}>
        <div className={styles["contact-content"]}>
          <div className={styles["email-link"]}>
            <Link href={"mailto:andrejkoller@outlook.com"}>EMAIL</Link>
          </div>
          <div className={styles["linkedin-link"]}>
            <Link
              href={"https://www.linkedin.com/in/andrejkoller/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
