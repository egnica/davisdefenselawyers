import Image from "next/image";
import styles from "./page.module.css";
import Practices from "./data/practice-areas_clean.json";
import Hero from "./components/hero";
import Form from "./components/ContactForm";
import Link from "next/link";
import Grid from "./components/servicesGrid";
import AreaGrid from "./components/areaGrid";
import Area from "./data/service-areas.json";
import video from "./data/videos.json";
import VideoCard from "./components/videoCard";

const SITE_URL = "https://www.davisdefenselawyers.com";

export const metadata = {
  title: "Minnesota Criminal Defense Lawyer | Davis Defense Lawyers",
  description:
    "Minnesota criminal defense attorney Andrew Davis represents clients facing DWI, assault, drug, theft, traffic, domestic violence, and other criminal charges across the Twin Cities and Minnesota.",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: "Minnesota Criminal Defense Lawyer | Davis Defense Lawyers",
    description:
      "Minnesota criminal defense attorney Andrew Davis represents clients facing serious misdemeanor and felony charges across the Twin Cities and Minnesota.",
    url: `${SITE_URL}/`,
    siteName: "Davis Defense Lawyers",
    type: "website",
    images: [
      {
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/andrew-3.webp",
        width: 900,
        height: 1350,
        alt: "Andrew Davis, Minnesota criminal defense attorney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minnesota Criminal Defense Lawyer | Davis Defense Lawyers",
    description:
      "Minnesota criminal defense attorney Andrew Davis represents clients facing serious misdemeanor and felony charges across Minnesota.",
    images: [
      "https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/andrew-3.webp",
    ],
  },
};

const practiceAreas = Practices.practiceAreas || [];
const filter = practiceAreas.slice(0, 12);
const areasServiced = Area.areas || [];

const mostRecentVideo = video.reduce((max, current) =>
  current.id > max.id ? current : max,
);

export default function Home() {
  return (
    <>
      <Hero />

      <Grid obj={filter} />

      <section className={styles.homeTextContain}>
        <p className={styles.eyebrow}>Direct, experienced representation</p>
        <h2>
          Experienced Minnesota
          <span className={styles.titleColor}> Criminal Defense Attorney</span>
        </h2>

        <div className={styles.homeIntroCopy}>
          <p>
            <Link href={"/about"} className={styles.textLink}>
              <strong>Andrew Davis</strong>
            </Link>{" "}
            is a Minnesota criminal defense lawyer representing clients throughout
            the Twin Cities and surrounding communities. He defends individuals
            facing misdemeanor and felony charges, including DWI, drug offenses,
            assault, domestic violence, theft, and probation violations.
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

          <p className={styles.directContact}>
            Call or text Andrew Davis directly at{" "}
            <a href="tel:+19529941568">
              <strong>(952) 994-1568</strong>
            </a>{" "}
            for a free, confidential case evaluation.
          </p>
        </div>
      </section>

      <Form />

      <section className={styles.homeTextContain}>
        <div className={styles.splitGrid}>
          <div>
            <p className={styles.eyebrow}>Why Davis Defense</p>
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
            className={styles.homeFeatureImage}
          />
        </div>

        <section className={styles.locationSection}>
          <p className={styles.eyebrow}>Local representation</p>
          <h2>
            <span className={styles.titleColor}>Serving Clients</span> Across
            Minnesota
          </h2>

          <p>
            Andrew Davis represents clients throughout Minneapolis–St. Paul,
            Hennepin County, Ramsey County, Carver County, and greater Minnesota.
            Whether you were arrested in the Twin Cities or a surrounding
            community, experienced legal defense is available.
          </p>

          <AreaGrid areaObj={areasServiced} />
        </section>

        <section className={styles.recentVideoContainer}>
          <div className={styles.recentVideoCopy}>
            <p className={styles.eyebrow}>Latest legal guide</p>
            <h2>Watch Andrew explain what matters</h2>
            <Link href={`/video/${mostRecentVideo.slug}`}>
              <h3>{mostRecentVideo.title}</h3>
              <span className={styles.videoTextLink}>Watch the video →</span>
            </Link>
          </div>
          <div className={styles.videoCardHome}>
            <VideoCard item={mostRecentVideo} />
          </div>
        </section>
      </section>
    </>
  );
}
