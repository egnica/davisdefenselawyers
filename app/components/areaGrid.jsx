import React from "react";
import styles from "../locations/[slug]/page.module.css";
import Link from "next/link";

function areaGrid({ areaObj }) {
  return (
    <div className={styles.gridButtons}>
      {areaObj.map((item) => (
        <Link className={styles.locationItem} key={item.slug} href={`../locations/${item.slug}`}>
          <p>{item.city}</p>
        </Link>
      ))}
    </div>
  );
}

export default areaGrid;
