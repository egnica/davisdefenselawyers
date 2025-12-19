import React from "react";
import { notFound } from "next/navigation";
import locations from "../../data/service-areas.json";
import styles from "./page.module.css";

const SITE_URL = "https://davisdefenselawyers.com";

function getLocation(slug) {
  return locations.find((l) => l.slug === slug);
}

export function generateStaticParams() {
  // optional but recommended: prebuild these pages for stability + speed
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }) {
  const data = getLocation(params.slug);
  if (!data) notFound();

  const canonical = `${SITE_URL}/${data.slug}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: data.metaTitle || data.pageTitle,
    description: data.metaDescription,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: data.metaTitle || data.pageTitle,
      description: data.metaDescription,
      url: canonical,
      images: data.ogImage
        ? [
            {
              url: data.ogImage,
              alt: data.ogImageAlt || data.pageTitle || "",
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle || data.pageTitle,
      description: data.metaDescription,
      images: data.ogImage ? [data.ogImage] : [],
    },
  };
}

export default function LocationPage({ params }) {
  const data = getLocation(params.slug);
  if (!data) notFound();

  const url = `${SITE_URL}/${data.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Davis Defense Lawyers",
    url,
    telephone: "+19529941568",
    description: data.metaDescription,
    areaServed: [
      {
        "@type": "City",
        name: data.city,
        address: {
          "@type": "PostalAddress",
          addressRegion: "MN",
          addressCountry: "US",
        },
      },
    ],
  };

  const faqLd =
    data.faq?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faq.map((item) => ({
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

      <main>
        <h1>{data.pageTitle}</h1>
        {/* render your blocks */}
      </main>
    </>
  );
}
