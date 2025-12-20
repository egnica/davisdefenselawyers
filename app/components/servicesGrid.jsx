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
      <Link className={styles.homeServiceBtn} href="../criminal-defense">

      MORE
        
        
    
      </Link>
    </div>
  );
}

export default servicesGrid;
