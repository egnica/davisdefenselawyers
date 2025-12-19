import React from "react";
import { notFound } from "next/navigation";
import data from "../../data/service-areas.json";
import styles from "./page.module.css";
import Hero from '../../components/heroPractice'

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

      <main className={styles.main}>
      <Hero title={area.city} tag={area.county} />
        <h1>{area.pageTitle}</h1>
        {/* render your blocks */}
      </main>
    </>
  );
}
