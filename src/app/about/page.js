import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles["about-container"]}>
      <Link href={"/"} className={styles["back"]}>
        CLOSE
      </Link>
      <div className={styles["about-content"]}>
        <figure className={styles["info-title"]}>
          <div className={styles["info-title-text"]}>[INFO]</div>
        </figure>
        <section className={styles["about-text"]}></section>
      </div>
    </div>
  );
}
