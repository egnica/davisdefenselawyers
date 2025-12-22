import Image from "next/image";
import styles from "./page.module.css";
import Practices from "./data/practice-areas_clean.json";
import Hero from "./components/hero";
import Form from "./components/ContactForm";
import Link from "next/link";
import Grid from "./components/servicesGrid";
import AreaGrid from "./components/areaGrid";
import Area from "./data/service-areas.json";

const practiceAreas = Practices.practiceAreas || [];
const filter = practiceAreas.slice(0, 12);

const areasServiced = Area.areas || [];

const SITE_URL = "https://davisdefenselawyers.com";

const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${SITE_URL}#firm`,
  name: "Davis Defense Lawyers",
  url: SITE_URL,
  telephone: "+19529941568",
  description:
    "Davis Defense Lawyers provides aggressive, experienced criminal defense representation across Minnesota, including assault, DUI, domestic charges, drug offenses, and more.",

  address: {
    "@type": "PostalAddress",
    streetAddress: "1230 Night Trail",
    addressLocality: "Waconia",
    addressRegion: "MN",
    postalCode: "55387",
    addressCountry: "US",
  },

  areaServed: [
    { "@type": "AdministrativeArea", name: "Minnesota" },
    { "@type": "AdministrativeArea", name: "Twin Cities, MN" },
  ],

  provider: {
    "@type": "Attorney",
    name: "Andrew Davis",
    url: `${SITE_URL}/about`,
    telephone: "+19529941568",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1230 Night Trail",
      addressLocality: "Waconia",
      addressRegion: "MN",
      postalCode: "55387",
      addressCountry: "US",
    },
  },

  sameAs: [
    // 🔴 Only include REAL, active profiles
    "https://www.avvo.com/attorneys/55437-mn-andrew-davis-4803224.html",
    "https://www.experience.com/reviews/andrew-8011103",
    "https://www.facebook.com/Daviscriminaldefense",
    // "https://www.justia.com/lawyers/andrew-davis",
    // "https://www.google.com/maps?cid=XXXXXXXXXXXX", // Google Business Profile CID
  ],
};

export default function Home() {
  return (
    <>
      <Hero />
      <Grid obj={filter} />
      <div className={styles.homeTextContain}>
        <h2>
          Experienced Minnesota
          <span className={styles.titleColor}> Criminal Defense Attorney</span>
        </h2>

        <p>
          <strong>Andrew Davis</strong> is a Minnesota criminal defense lawyer
          representing clients throughout the Twin Cities and surrounding
          communities. He defends individuals facing misdemeanor and felony
          charges, including DWI, drug offenses, assault, domestic violence,
          theft, and probation violations.
        </p>

        <p>
          If you’ve been charged with a crime, your freedom, reputation, and
          future are at stake. Andrew Davis provides strategic, straightforward
          legal defense focused on protecting your rights and achieving the best
          possible outcome in your case.
        </p>
        <p>
          From first-time offenses to serious criminal allegations, Andrew works
          directly with clients at every stage of the legal process, from
          investigation through resolution.
        </p>
        <p>
          Call or text Andrew Davis directly at{" "}
          <a style={{ color: "black" }} href="tel:+19529941568">
            {" "}
            <strong>(952) 994-1568</strong>
          </a>{" "}
          for a free, confidential case evaluation.
        </p>
      </div>
      <Form />
      <div className={styles.homeTextContain}>
        <div className={styles.splitGrid}>
          <div style={{ margin: "auto" }}>
            <h2>
              Why Clients Choose{" "}
              <span className={styles.titleColor}>Andrew Davis</span>
            </h2>
            <ul className={styles.list}>
              <li>10+ years defending criminal cases in Minnesota</li>
              <li>Direct access to your attorney, no hand-offs</li>
              <li>Clear communication and honest case assessments</li>
              <li>
                Aggressive defense for both misdemeanor and felony charges
              </li>
              <li>Free, confidential case evaluations</li>
            </ul>
          </div>
          <Image
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/andrew-walking.jpg"
            alt="Image of Andrew Davis walking with client"
            height={400}
            width={400}
          />
        </div>
        <br />
        <br />
        <h2>
          <span className={styles.titleColor}> Serving Clients</span> Across
          Minnesota
        </h2>
        <p>
          Andrew Davis represents clients throughout Minneapolis–St. Paul,
          Hennepin County, Ramsey County, Carver County, and greater Minnesota.
          Whether you were arrested in the Twin Cities or a surrounding
          community, experienced legal defense is available.
        </p>
        <AreaGrid areaObj={areasServiced} />
      </div>
    </>
  );
}
