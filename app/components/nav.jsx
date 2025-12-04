import React from "react";
import styles from "../page.module.css";
import Link from "next/link";

function nav() {
  return (
    <div className={styles.navGrid}>
      <p>LOGO</p>
      <nav className={styles.navItems}>
        <ul>
          <li className={styles.navItem}>Home</li>
          <li className={styles.navItem}>About</li>
          <li className={styles.navItem}>Practice Areas</li>
          <li className={styles.navItem}>Areas We Serve</li>
          <li className={styles.navItem}>Blog</li>
          <li className={styles.navItem}>Contact</li>
        </ul>
      </nav>
       <a href="tel:+19529941568">
      <div className={styles.callToAction}>
        <div className={styles.contNav}>
          CALL NOW <strong>24hrs a day</strong>
        </div>
       
          <div className={styles.phoneNum}>
            <svg
              width={35}
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 357 311"
            >
              <path
                stroke="white"
                strokeWidth="12"
                fill="white"
                d="M89.46 8.6c8.21-1.69 15.45.65 20.82 6.78 3.88 4.42 29.78 51.88 31.19 57.22 7.06 26.75-30.62 31.25-29.93 51.62.37 11.03 26.83 44.34 35.3 53.21 7.47 7.83 38.54 34.94 47.69 36.86 29.34 6.16 28.89-42.61 63.53-23.79 18.12 9.85 36.34 23.49 53.98 34.43 5.55 7 6.74 13.9 3.14 22.2-2.5 5.77-16.21 22.82-20.97 27.7-54.42 55.59-145.05-16.2-184.54-58.94-35.83-38.76-96.42-126.72-57.54-178C58.1 30.01 80.16 10.52 89.47 8.6Zm3.85 10.2c-10.51 1.45-34.3 25.88-38.72 35.63-20.05 44.23 31.22 118.99 60.19 151.2 32.25 35.86 111.5 101.82 161.22 70.21 7.33-4.66 25.01-23.83 28.91-31.3 2.64-5.07 2.15-9.17-1.95-13.11s-48.84-31.54-54.62-33.77c-11.65-4.51-19.18 12.65-27.16 19.53-16.13 13.88-29.11 9.4-45.16-1.03-18.92-12.29-38.96-31.9-52.67-49.83-13.71-17.92-31.52-40.03-15.36-61.07 5.78-7.53 25.45-18.71 23.91-28.09l-28.69-53.43c-1.95-2.97-6.3-5.45-9.89-4.96Z"
              />
            </svg>
            <strong> (952) 994-1568</strong>
          </div>
      
      </div>
        </a>
    </div>
  );
}

export default nav;
