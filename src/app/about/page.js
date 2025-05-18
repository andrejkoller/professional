import Link from "next/link";
import styles from "./page.module.css";
import { HoverText } from "../components/HoverText/HoverText";

export default function Page() {
  return (
    <div className={styles["about-container"]}>
      <Link href={"/"} className={styles["back"]}>
        <HoverText text={"CLOSE"} />
      </Link>
      <div className={styles["about-content"]}>
        <figure className={styles["info-title"]}>
          <div className={styles["info-title-text"]}>( INFO )</div>
        </figure>
        <section className={styles["about-text"]}></section>
      </div>
    </div>
  );
}
