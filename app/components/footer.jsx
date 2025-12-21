import React from "react";
import styles from "../page.module.css";
import NElogo from "../components/NEWordmark";
import DataPractice from "../data/practice-areas_clean.json";
import Location from "../data/service-areas.json";
import Link from "next/link";

const practiceAreas = DataPractice.practiceAreas || [];
const filter = practiceAreas;

const areasServiced = Location.areas || [];

function footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footerContain}>
      <div className={styles.socials}>
        <a href="https://www.facebook.com/Daviscriminaldefense" target="_blank">
          <svg
            width={70}
            style={{ fill: "#fff" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
          </svg>
        </a>
        <svg
          width={70}
          style={{ fill: "#fff" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z" />
        </svg>
        <svg
          width={70}
          style={{ fill: "#fff" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
        >
          <path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z" />
        </svg>
      </div>

      <div className={styles.bottomFooter}>
        <p>(952) 994-1568 | andrew.davis@davisdefenselawyers.com</p>
      </div>
      <hr />
      <div className={styles.footerGrid}>
        {filter.map((item) => (
          <Link href={`/${item.slug}`} key={item.slug}>
            {item.navTitle}
          </Link>
        ))}
      </div>
      <hr />
      <div className={styles.footerGrid}>
        {areasServiced.map((item) => (
          <Link key={item.slug} href={`/areas-we-serve/${item.slug}`}>
            {item.city}
          </Link>
        ))}
      </div>
      <div className={styles.bottomFooter}>
        <p>
          © Andrew Davis | Davis Defense {currentYear}. All Rights Reserved. |
          powered by:&nbsp;&nbsp;{" "}
        </p>
        <br />
        <a href="https:nicholasegner.com" target="_blank">
          <NElogo width={50} /> &nbsp; Nicholas Egner - Web Development
        </a>
      </div>
    </footer>
  );
}

export default footer;
