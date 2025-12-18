import React from "react";
import styles from "../[slug]/page.module.css";
import Image from "next/image";

function HeroPractice({ title, tag }) {
  return (
    <section className={styles.heroPractice}>
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <h1 className={styles.mainH1}>{title}</h1>
          <p className={styles.tagline}>{tag}</p>
        </div>

        <div className={styles.heroImage}>
          <Image
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/andrew-2.webp"
            alt="Attorney Andrew Davis"
            width={360}
            height={520}
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default HeroPractice;
