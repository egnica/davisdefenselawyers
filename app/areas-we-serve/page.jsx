import React from "react";
import styles from "../page.module.css";
import AreaData from "../data/service-areas.json";
import ServicesData from "../data/practice-areas_clean.json";
import Hero from "../components/heroPractice";
import Form from "../components/ContactForm";
import AreaGrid from "../components/areaGrid";
import Services from "../components/servicesGrid";

export const metadata = {
  title: "Minnesota Criminal Defense Service Areas | Davis Defense Lawyers",
  description:
    "See the Minnesota communities served by criminal defense attorney Andrew Davis and explore the criminal defense matters he handles across the state.",
  alternates: {
    canonical: "https://www.davisdefenselawyers.com/areas-we-serve",
  },
};

const Areas = AreaData.areas || [];
const ServicesObj = ServicesData.practiceAreas || [];

function areasOfService() {
  return (
    <>
      <Hero title={"Areas We Serve"} tag={"Minnesota criminal defense"} />
      <section className={styles.contentPage}>
        <div className={styles.pageIntro}>
          <p className={styles.eyebrow}>Statewide representation</p>
          <h2>Criminal defense throughout Minnesota</h2>
          <p>
          Andrew Davis provides aggressive, experienced criminal defense
          representation for clients across Minnesota. If you’ve been charged
          with a crime—or believe charges may be coming—you deserve an attorney
          who understands both the law and the real-world consequences you’re
          facing.
          </p>
          <p>
          Andrew Davis represents individuals accused of misdemeanor, gross
          misdemeanor, and felony offenses, handling cases at every stage of the
          criminal justice process—from investigation and arrest to trial,
          negotiation, and appeals.
          </p>
          <p>
          Every case is different, but one thing remains the same: your rights,
          your freedom, and your future are worth protecting.
          </p>
        </div>
        <section className={styles.directorySection}>
          <p className={styles.eyebrow}>Communities</p>
          <h2>Find your area</h2>
          <AreaGrid areaObj={Areas} />
        </section>
        <section className={styles.directorySection}>
          <p className={styles.eyebrow}>Legal services</p>
          <h2>Comprehensive Criminal Defense Representation</h2>
          <p className={styles.directoryIntro}>
          This section outlines the full range of criminal defense practice
          areas handled by Attorney Andrew Davis, including but not limited to:
          </p>
          <Services obj={ServicesObj} />
          <p className={styles.directoryIntro}>
          Each practice area is backed by strategic defense planning, careful
          case analysis, and direct attorney involvement—not hand-offs to junior
          associates or case managers.
          </p>
        </section>
      </section>
      <Form />
    </>
  );
}

export default areasOfService;
