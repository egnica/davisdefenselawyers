import React from "react";
import { notFound } from "next/navigation";
import data from "../../data/service-areas.json";
import services from "../../data/practice-areas_clean.json";
import styles from "./page.module.css";
import Hero from "../../components/heroPractice";
import Form from "../../components/ContactForm";
import ServicesGrid from "../../components/servicesGrid";


const practiceAreas = services.practiceAreas || [];
const filter = practiceAreas.slice(0, 12);

const SITE_URL = "https://davisdefenselawyers.com";
const AREAS = data.areas || [];

function getArea(slug) {
  const clean = String(slug || "").trim();
  return AREAS.find((a) => a?.slug === clean) || null;
}

export function generateStaticParams() {
  return AREAS.filter((a) => a?.slug).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const area = getArea(slug);
  if (!area) notFound();

  const canonical = `${SITE_URL}/locations/${area.slug}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: area.metaTitle || area.pageTitle,
    description: area.metaDescription,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      title: area.metaTitle || area.pageTitle,
      description: area.metaDescription,
      url: canonical,
      images: area.ogImage
        ? [{ url: area.ogImage, alt: area.ogImageAlt || area.pageTitle || "" }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: area.metaTitle || area.pageTitle,
      description: area.metaDescription,
      images: area.ogImage ? [area.ogImage] : [],
    },
  };
}

export default async function LocationPage({ params }) {
  const { slug } = await params;

  const area = getArea(slug);
  if (!area) notFound();

  const url = `${SITE_URL}/locations/${area.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Davis Defense Lawyers",
    url,
    telephone: "+19529941568",
    description: area.metaDescription,
    areaServed: [
      {
        "@type": "City",
        name: area.city,
        address: {
          "@type": "PostalAddress",
          addressRegion: "MN",
          addressCountry: "US",
        },
      },
    ],
  };

  const faqLd =
    area.faq?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: area.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <Hero title={area.city} tag={area.county} />
      <main className={styles.main}>
        <h1 className={styles.h1}>{area.pageTitle}</h1>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.lead}>{area.metaDescription}</p>

            <div className={styles.ctas}>
              <a className={styles.primaryBtn} href="tel:+19529941568">
                Call Now: (952) 994-1568
              </a>
              <a className={styles.secondaryBtn} href="/contact">
                Free Case Evaluation
              </a>
            </div>

            {area.nearbyCities?.length > 0 && (
              <p className={styles.serviceLine}>
                Serving {area.city} and {area.county}, including{" "}
                {area.nearbyCities.slice(0, 5).join(", ")}.
              </p>
            )}
          </div>

          {area.heroImage && (
            <div className={styles.heroImageWrap}>
              {/* use next/image if you want */}
              <img
                src={area.heroImage}
                alt={area.heroImageAlt || area.pageTitle}
                className={styles.heroImage}
              />
            </div>
          )}
        </section>

        {/* 2) SERVICES GRID (dynamic) */}
        <section className={styles.services}>
          <h2 className={styles.h2}>Practice Areas</h2>
          <p className={styles.sectionIntro}>
            Defense for DUI, assault, domestic allegations, drug charges, theft,
            and more. Select a practice area to learn more.
          </p>

          <ServicesGrid obj={filter} />
        </section>

        {/* 3) UNIQUE ANGLE */}
        {area.uniqueAngle && (
          <section className={styles.uniqueAngle}>
            <h2 className={styles.h2}>
              Local experience matters in {area.city}
            </h2>
            <p>{area.uniqueAngle}</p>
          </section>
        )}

        {/* 4) CONTENT BLOCKS (what we already wrote per city) */}
        {area.contentBlocks?.map((block, idx) => {
          if (block.type === "section") {
            return (
              <section key={idx} className={styles.section}>
                {block.title && <h2 className={styles.h2}>{block.title}</h2>}
                {block.body && <p>{block.body}</p>}
              </section>
            );
          }
          return null;
        })}

        {/* 5) FAQ */}
        {area.faq?.length > 0 && (
          <section className={styles.faq}>
            <h2 className={styles.h2}>Frequently Asked Questions</h2>
            <div className={styles.faqList}>
              {area.faq.map((item, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqQ}>{item.q}</summary>
                  <div className={styles.faqA}>
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* 6) FINAL CTA */}
        <section className={styles.finalCta}>
          <h2 className={styles.h2}>Talk to a criminal defense lawyer today</h2>
          <p>
            If you’ve been charged in {area.city} or anywhere in {area.county},
            don’t wait. Get a free, confidential case evaluation.
          </p>
          <div className={styles.ctas}>
            <a className={styles.primaryBtn} href="tel:+19529941568">
              Call Now: (952) 994-1568
            </a>
            <a className={styles.secondaryBtn} href="/contact">
              Free Case Evaluation
            </a>
          </div>
        </section>
      </main>
      <Form />
    </>
  );
}
