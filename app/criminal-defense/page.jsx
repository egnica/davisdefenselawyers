import React from "react";
import Hero from "../components/heroPractice";
import styles from "../page.module.css";
import Link from "next/link";
import DataPractice from "../data/practice-areas_clean.json";
import Form from '../components/ContactForm'

const serviceAreas = DataPractice.practiceAreas || [];

function criminalDefense() {
  return (
    <>
      <Hero title={"Minnesota Criminal Defense"} tag={"Practice Areas"} />
      <div className={styles.defenseContain}>
        <p>
          Andrew Davis provides aggressive, experienced criminal defense
          representation for clients across Minnesota. If you’ve been charged
          with a crime or believe charges may be coming you deserve an attorney
          who understands both the law and the real-world consequences you’re
          facing.
        </p>
        <div className={styles.defenseGrid}>
          {serviceAreas.map((item) => (
            <Link
              href={`./${item.slug}`}
              className={styles.defenseItem}
              key={item.slug}
            >
              <p className={styles.itemTitle}>
                <strong>{item.navTitle}</strong>
              </p>
              <p className={styles.itemBody}>{item.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
      <Form/>
       <div style={{height:"400px"}}></div>
    </>
  );
 
}

export default criminalDefense;
