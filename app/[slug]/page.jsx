// app/[slug]/page.jsx
import { notFound } from "next/navigation";
import rawData from "../data/practice-areas_clean.json";
import Location from "../data/service-areas.json";
import styles from "./page.module.css";
import Locations from "../components/areaGrid";
import ContentBlock from "../components/contentBlocks";
import Hero from "../components/heroPractice";
import ServicesGrid from "../components/servicesGrid";

const practiceAreas = rawData.practiceAreas || [];
const serviceAreas = Location.areas || [];
const areasServiced = Location.areas || [];

// ✅ Change this to your real domain (no trailing slash)
const SITE_URL = "https://davisdefenselawyers.com/";

// Pre-generate all slugs from the JSON
export function generateStaticParams() {
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }));
}

/**
 * Build areaServed array from Location.areas
 * - Cities → City
 * - Counties → AdministrativeArea
 * - Deduplicated
 * - Always includes Minnesota
 */
function buildAreaServed(locations = []) {
  const countySet = new Set();

  const cities = locations
    .filter((loc) => loc.city)
    .map((loc) => ({
      "@type": "City",
      name: `${loc.city}, MN`,
    }));

  locations.forEach((loc) => {
    if (loc.county) {
      countySet.add(loc.county);
    }
  });

  const counties = Array.from(countySet).map((county) => ({
    "@type": "AdministrativeArea",
    name: `${county}, MN`,
  }));

  return [
    ...cities,
    ...counties,
    {
      "@type": "AdministrativeArea",
      name: "Minnesota",
    },
  ];
}

function buildServiceJsonLd(area, slug) {
  const pageUrl = `${SITE_URL}/${slug}`;

  const address = {
    "@type": "PostalAddress",
    streetAddress: "1230 Night Trail",
    addressLocality: "Waconia",
    addressRegion: "MN",
    postalCode: "55387",
    addressCountry: "US",
  };

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${pageUrl}#service`,
    name: area.pageTitle || area.metaTitle || area.navTitle,
    serviceType: area.navTitle,
    description: area.heroSummary || area.metaDescription,
    url: pageUrl,
    inLanguage: "en-US",

    // ✅ ADD ADDRESS HERE (this is the missing piece)
    address,

    ...(area.heroImage
      ? {
          image: [
            {
              "@type": "ImageObject",
              url: area.heroImage,
              caption: area.heroImageAlt || area.navTitle,
            },
          ],
        }
      : {}),

    provider: { "@id": `${SITE_URL}#attorney` },
    isPartOf: { "@id": `${SITE_URL}#firm` },

    areaServed: buildAreaServed(areasServiced),

    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: "+19529941568",
        contactType: "customer service",
        areaServed: "MN",
        availableLanguage: ["English"],
      },
    },
  };
}

function buildFaqJsonLd(area, slug) {
  if (!area.faq || area.faq.length === 0) return null;

  const pageUrl = `${SITE_URL}/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: area.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

function buildBreadcrumbsJsonLd(area, slug) {
  const pageUrl = `${SITE_URL}/${slug}`;
  const indexUrl = `${SITE_URL}/criminal-defense`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumbs`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Criminal Defense",
        item: indexUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: area.navTitle || area.pageTitle || slug,
        item: pageUrl,
      },
    ],
  };
}

// Page
export default async function Page({ params }) {
  const { slug } = await params;

  const area = practiceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const serviceJsonLd = buildServiceJsonLd(area, slug);
  const faqJsonLd = buildFaqJsonLd(area, slug);
  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd(area, slug);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      {/* Page UI */}
      <Hero title={area.pageTitle} tag={area.tagline} />

      <main className={styles.mainContain}>
        {area.contentBlocks.map((item, index) => (
          <ContentBlock key={index} content={item} index={index} />
        ))}
        <ServicesGrid obj={practiceAreas} />
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
      </main>
    </>
  );
}
