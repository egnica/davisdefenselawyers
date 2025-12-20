import React from "react";
import styles from "../page.module.css";
import AreaData from "../data/service-areas.json";
import ServicesData from "../data/practice-areas_clean.json";
import Hero from "../components/heroPractice";
import Form from "../components/ContactForm";
import AreaGrid from "../components/areaGrid";
import Services from "../components/servicesGrid";

const Areas = AreaData.areas || [];
const ServicesObj = ServicesData.practiceAreas || [];

function areasOfService() {
  return (
    <>
      <Hero title={"Practice Areas – Minnesota Criminal Defense"} tag={""} />
      <div className={styles.defenseContain}>
        <AreaGrid areaObj={Areas} />
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
        <hr />
        <h2>Comprehensive Criminal Defense Representation</h2>
        <p>
          This section outlines the full range of criminal defense practice
          areas handled by Attorney Andrew Davis, including but not limited to:
        </p>
        <Services obj={ServicesObj} />
        <p>
          Each practice area is backed by strategic defense planning, careful
          case analysis, and direct attorney involvement—not hand-offs to junior
          associates or case managers.
        </p>
        <Form />
        <h2>Get a Free, Confidential Case Evaluation</h2>
        <p>
          📞 Call now for a free, confidential case evaluation and speak
          directly with Attorney Andrew Davis about your situation. Your defense
          starts with one conversation.
        </p>
      </div>
    </>
  );
}

export default areasOfService;
