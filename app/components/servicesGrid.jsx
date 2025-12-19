import React from "react";
import Link from "next/link";
import styles from "../page.module.css";

function servicesGrid({ obj }) {
  return (
    <div className={styles.serviceContain}>
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
      <button className={styles.homeServiceBtn}>View All</button>
    </div>
  );
}

export default servicesGrid;
