// app/[slug]/page.jsx
import { notFound } from "next/navigation";
import rawData from "../data/practice-areas_clean.json";
import AreaData from "../data/service-areas.json";
import styles from "./page.module.css";
import Locations from "../components/areaGrid";
import ContentBlock from "../components/contentBlocks";
import Hero from "../components/heroPractice";

const practiceAreas = rawData.practiceAreas || [];
const serviceAreas = AreaData.areas || [];

// Pre-generate all slugs from the JSON
export function generateStaticParams() {
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }));
}

// Minimal page: show slug + title so we know it's wired correctly
export default async function Page({ params }) {
  const { slug } = await params; // Next 16: params is a Promise

  const area = practiceAreas.find((a) => a.slug === slug);

  if (!area) {
    notFound();
  }

  return (
    <>
      <Hero title={area.pageTitle} tag={area.tagline} />
      <main className={styles.mainContain}>
        <>
          {area.contentBlocks.map((item, index) => {
            return <ContentBlock key={index} content={item} index={index} />;
          })}
          
          <section className={styles.faqSection}>
       
   
            
            <h2 className={styles.faqHeading}>{area.faqTitle}</h2>
            {area.faq.map((item, index) => (
              <details key={index} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.q}</summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
            <h2>Locations Covered</h2>
            <Locations areaObj={serviceAreas} />
          </section>
        </>
      </main>
    </>
  );
}
