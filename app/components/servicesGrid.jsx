import React from "react";
import Link from "next/link";
import styles from "../page.module.css";

function servicesGrid({ obj }) {
  return (
    <div
      className={styles.serviceContain}
      style={{ width: "auto", margin: "0 12px" }}
    >
      <div className={styles.servicesHomepageGrid}>
        {obj.map((item) => (
          <Link
            href={`/${item.slug}`}
            className={styles.servicesItem}
            key={item.slug}
          >
            <h3>{item.navTitle}</h3>
          </Link>
        ))}
      </div>
      <Link className={styles.homeServiceBtn} href="/criminal-defense">
        Explore all
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export default servicesGrid;
