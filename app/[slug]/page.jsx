// app/[slug]/page.jsx
import { notFound } from "next/navigation";
import rawData from "../data/practice-areas_clean.json";
import Location from "../data/service-areas.json";
import styles from "./page.module.css";
import Locations from "../components/areaGrid";
import ContentBlock from "../components/contentBlocks";
import Hero from "../components/heroPractice";
import ServicesGrid from "../components/servicesGrid";
import video from "../data/videos.json";
import Link from "next/link";
import VideoPlayer from "../components/video";

const practiceAreas = rawData.practiceAreas || [];
const serviceAreas = Location.areas || [];

// ✅ Change this to your real domain (no trailing slash)
const SITE_URL = "https://www.davisdefenselawyers.com";

// Pre-generate all slugs from the JSON
export function generateStaticParams() {
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const page = practiceAreas.find((item) => item.slug === slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.metaTitle || `${page.title} in Minnesota`,
    description:
      page.metaDescription ||
      `Learn about ${page.title.toLowerCase()} in Minnesota, including penalties and defense strategies with attorney Andrew Davis.`,
    alternates: {
      canonical: `${SITE_URL}/${slug}`,
    },
  };
}

function buildServiceJsonLd(area, slug) {
  const pageUrl = `${SITE_URL}/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: area.pageTitle || area.metaTitle || area.navTitle,
    serviceType: area.navTitle,
    description: area.heroSummary || area.metaDescription,
    url: pageUrl,
    inLanguage: "en-US",
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
    provider: { "@id": `${SITE_URL}/#firm` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Minnesota",
    },
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

  const videoFind = video.find((item) => slug == item.practiceArea);

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
        {videoFind ? (
          <Link
            href={`/video/${videoFind.slug}`}
            className={styles.videoCallout}
          >
            <span className={styles.videoCalloutLabel}>Video guide</span>
            <span className={styles.videoCalloutTitle}>{videoFind.title}</span>
            <span className={styles.videoCalloutAction}>Watch now →</span>
          </Link>
        ) : null}
        {area.contentBlocks.map((item, index) => (
          <ContentBlock key={index} content={item} index={index} />
        ))}

        {videoFind ? (
          <section className={styles.featuredVideo}>
            <p className={styles.sectionEyebrow}>From Andrew Davis</p>
            <h2 className={styles.sectionHeading}>Understand the charge</h2>
            <VideoPlayer
              src={videoFind.videoUrl}
              poster={videoFind.thumbnail}
              startTime={videoFind.startTime}
              postedDate={videoFind.uploadDate}
            />
          </section>
        ) : null}
        <section className={styles.relatedSection}>
          <p className={styles.sectionEyebrow}>Related services</p>
          <h2 className={styles.sectionHeading}>Explore practice areas</h2>
          <ServicesGrid obj={practiceAreas} />
        </section>
        <section className={styles.faqSection}>
          <p className={styles.sectionEyebrow}>Common questions</p>
          <h2 className={styles.faqHeading}>{area.faqTitle}</h2>

          {area.faq.map((item, index) => (
            <details key={index} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{item.q}</summary>
              <p className={styles.faqAnswer}>{item.a}</p>
            </details>
          ))}

          <div className={styles.locationsBlock}>
            <p className={styles.sectionEyebrow}>Minnesota communities</p>
            <h2>Locations Covered</h2>
            <Locations areaObj={serviceAreas} />
          </div>
        </section>
      </main>
    </>
  );
}
