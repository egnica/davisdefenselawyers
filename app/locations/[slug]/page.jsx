/* eslint-disable @next/next/no-img-element */
import React from "react";
import { notFound } from "next/navigation";
import data from "../../data/service-areas.json";
import services from "../../data/practice-areas_clean.json";
import styles from "./page.module.css";
import Hero from "../../components/heroPractice";
import Form from "../../components/ContactForm";
import LocationGrip from "../../components/areaGrid";
import ServicesGrid from "../../components/servicesGrid";
import Link from "next/link";

const practiceAreas = services.practiceAreas || [];
const filter = practiceAreas.slice(0, 12);

const SITE_URL = "https://www.davisdefenselawyers.com";
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

function buildLocationLegalServiceJsonLd(area) {
  const url = `${SITE_URL}/locations/${area.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: area.pageTitle || `Criminal Defense in ${area.city}, Minnesota`,
    serviceType: "Criminal Defense Legal Services",
    url,
    description: area.metaDescription,
    inLanguage: "en-US",
    provider: { "@id": `${SITE_URL}/#firm` },
    areaServed: [
      area.city
        ? { "@type": "City", name: `${area.city}, MN` }
        : { "@type": "AdministrativeArea", name: "Minnesota" },
      area.county
        ? { "@type": "AdministrativeArea", name: `${area.county}, MN` }
        : null,
      { "@type": "AdministrativeArea", name: "Minnesota" },
    ].filter(Boolean),
    ...(area.heroImage
      ? {
          image: [
            {
              "@type": "ImageObject",
              url: area.heroImage,
              caption: area.heroImageAlt || area.pageTitle || area.city || "",
            },
          ],
        }
      : {}),
  };
}

function buildFaqJsonLd(area) {
  if (!area.faq?.length) return null;

  const url = `${SITE_URL}/locations/${area.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: area.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function buildBreadcrumbsJsonLd(area) {
  const url = `${SITE_URL}/locations/${area.slug}`;
  const parentUrl = `${SITE_URL}/areas-we-serve`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumbs`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Areas We Serve",
        item: parentUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: area.pageTitle || area.city || area.slug,
        item: url,
      },
    ],
  };
}

export default async function LocationPage({ params }) {
  const { slug } = await params;

  const area = getArea(slug);
  if (!area) notFound();

  const jsonLd = buildLocationLegalServiceJsonLd(area);
  const faqLd = buildFaqJsonLd(area);
  const breadcrumbsLd = buildBreadcrumbsJsonLd(area);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />

      <Hero
        title={area.pageTitle}
        tag={`${area.city} · ${area.county}`}
      />

      <div className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>Local criminal defense</p>
            <h2 className={styles.h2}>Focused guidance when the stakes are high</h2>
            <p className={styles.lead}>{area.metaDescription}</p>

            <div className={styles.ctas}>
              <a className={styles.primaryBtn} href="tel:+19529941568">
                Call Now: (952) 994-1568
              </a>
              <Link className={styles.secondaryBtn} href="/contact">
                Free Case Evaluation
              </Link>
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
              <img
                src={area.heroImage}
                alt={area.heroImageAlt || area.pageTitle}
                className={styles.heroImage}
              />
            </div>
          )}
        </section>

        <section className={styles.services}>
          <p className={styles.eyebrow}>How Andrew can help</p>
          <h2 className={styles.h2}>Practice Areas</h2>
          <p className={styles.sectionIntro}>
            Defense for DUI, assault, domestic allegations, drug charges, theft,
            and more. Select a practice area to learn more.
          </p>

          <ServicesGrid obj={filter} />
        </section>

        {area.uniqueAngle && (
          <section className={styles.uniqueAngle}>
            <p className={styles.eyebrow}>Local perspective</p>
            <h2 className={styles.h2}>
              Local experience matters in {area.city}
            </h2>
            <p>{area.uniqueAngle}</p>
          </section>
        )}

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

        {area.faq?.length > 0 && (
          <section className={styles.faq}>
            <p className={styles.eyebrow}>Clear answers</p>
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
        <section className={styles.locations}>
          <p className={styles.eyebrow}>Minnesota communities</p>
          <h2 className={styles.h2}>Other areas we serve</h2>
          <LocationGrip areaObj={AREAS} />
        </section>

        <section className={styles.finalCta}>
          <p className={styles.eyebrow}>Free and confidential</p>
          <h2 className={styles.h2}>Talk to a criminal defense lawyer today</h2>
          <p>
            If you’ve been charged in {area.city} or anywhere in {area.county},
            don’t wait. Get a free, confidential case evaluation.
          </p>
          <div className={styles.ctas}>
            <a className={styles.primaryBtn} href="tel:+19529941568">
              Call Now: (952) 994-1568
            </a>
            <Link className={styles.secondaryBtn} href="/contact">
              Free Case Evaluation
            </Link>
          </div>
        </section>
      </div>

      <Form />
    </>
  );
}
