// app/[slug]/page.jsx
import { notFound } from "next/navigation";
import rawData from "../data/practice-areas_clean.json";
import Location from "../data/service-areas.json";
import styles from "./page.module.css";
import Locations from "../components/areaGrid";
import ContentBlock from "../components/contentBlocks";
import Hero from "../components/heroPractice";
import ServicesGrid from "../components/servicesGrid";
import videos from "../data/videos.json";
import Link from "next/link";
import VideoPlayer from "../components/video";
import Form from "../components/ContactForm";
import {
  buildLocalSeoSlug,
  findLocalSeoPage,
  getLocalSeoContentBlocks,
  getLocalSeoH1,
  getLocalSeoMetaDescription,
  getLocalSeoPages,
  getLocalSeoTitle,
  isLocalSeoPublished,
} from "../lib/localSeo";

const practiceAreas = rawData.practiceAreas || [];
const serviceAreas = Location.areas || [];

const SITE_URL = "https://www.davisdefenselawyers.com";

export const dynamicParams = true;

export function generateStaticParams() {
  const statewideParams = practiceAreas.map((area) => ({ slug: area.slug }));
  const publishedLocalParams = getLocalSeoPages({ publishedOnly: true }).map(
    (page) => ({ slug: page.slug }),
  );

  return [...statewideParams, ...publishedLocalParams];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const statewidePage = practiceAreas.find((item) => item.slug === slug);

  if (statewidePage) {
    return {
      title:
        statewidePage.metaTitle || `${statewidePage.title} in Minnesota`,
      description:
        statewidePage.metaDescription ||
        `Learn about ${statewidePage.title.toLowerCase()} in Minnesota, including penalties and defense strategies with attorney Andrew Davis.`,
      alternates: {
        canonical: `${SITE_URL}/${slug}`,
      },
    };
  }

  const localPage = findLocalSeoPage(slug);
  if (!localPage) return { title: "Page Not Found" };

  const { area, practice } = localPage;
  const pageTitle = getLocalSeoH1(area, practice);
  const description = getLocalSeoMetaDescription(area, practice);
  const canonical = `${SITE_URL}/${localPage.slug}`;
  const published = isLocalSeoPublished(area);

  return {
    metadataBase: new URL(SITE_URL),
    title: `${pageTitle} | Andrew Davis`,
    description,
    alternates: { canonical },
    robots: { index: published, follow: published },
    openGraph: {
      type: "website",
      title: `${pageTitle} | Andrew Davis`,
      description,
      url: canonical,
      images: area.heroImage
        ? [{ url: area.heroImage, alt: area.heroImageAlt || pageTitle }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | Andrew Davis`,
      description,
      images: area.heroImage ? [area.heroImage] : [],
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

function buildLocalSeoJsonLd(area, practice, slug, video) {
  const pageUrl = `${SITE_URL}/${slug}`;
  const locationUrl = `${SITE_URL}/locations/${area.slug}`;
  const title = getLocalSeoH1(area, practice);
  const description = getLocalSeoMetaDescription(area, practice);
  const faq = practice.faq?.slice(0, 5) || [];
  const breadcrumbId = `${pageUrl}#breadcrumbs`;
  const serviceId = `${pageUrl}#service`;
  const webpageId = `${pageUrl}#webpage`;

  const graph = [
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: pageUrl,
      name: title,
      description,
      inLanguage: "en-US",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": serviceId },
      breadcrumb: { "@id": breadcrumbId },
      ...(area.heroImage
        ? {
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: area.heroImage,
              caption: area.heroImageAlt || title,
            },
          }
        : {}),
    },
    {
      "@type": "Service",
      "@id": serviceId,
      name: title,
      serviceType: practice.navTitle,
      description,
      url: pageUrl,
      inLanguage: "en-US",
      provider: { "@id": `${SITE_URL}/#firm` },
      areaServed: [
        { "@type": "City", name: `${area.city}, Minnesota` },
        { "@type": "AdministrativeArea", name: area.county },
        { "@type": "AdministrativeArea", name: "Minnesota" },
      ],
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
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Areas We Serve",
          item: `${SITE_URL}/areas-we-serve`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: area.city,
          item: locationUrl,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: title,
          item: pageUrl,
        },
      ],
    },
  ];

  if (faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  if (video) {
    graph.push({
      "@type": "VideoObject",
      "@id": `${pageUrl}#video`,
      name: video.title,
      description: video.description,
      thumbnailUrl: [video.thumbnail],
      uploadDate: video.uploadDate,
      duration: video.duration,
      contentUrl: video.videoUrl,
      ...(video.youtubeId
        ? { embedUrl: `https://www.youtube.com/embed/${video.youtubeId}` }
        : {}),
      mainEntityOfPage: { "@id": webpageId },
      publisher: { "@id": `${SITE_URL}/#firm` },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function PracticePage({ area, slug }) {
  const serviceJsonLd = buildServiceJsonLd(area, slug);
  const faqJsonLd = buildFaqJsonLd(area, slug);
  const breadcrumbsJsonLd = buildBreadcrumbsJsonLd(area, slug);
  const video = videos.find((item) => slug === item.practiceArea);

  return (
    <>
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

      <Hero title={area.pageTitle} tag={area.tagline} />

      <div className={styles.mainContain}>
        {video ? (
          <Link href={`/video/${video.slug}`} className={styles.videoCallout}>
            <span className={styles.videoCalloutLabel}>Video guide</span>
            <span className={styles.videoCalloutTitle}>{video.title}</span>
            <span className={styles.videoCalloutAction}>Watch now →</span>
          </Link>
        ) : null}
        {area.contentBlocks.map((item, index) => (
          <ContentBlock key={index} content={item} index={index} />
        ))}

        {video ? (
          <section className={styles.featuredVideo}>
            <p className={styles.sectionEyebrow}>From Andrew Davis</p>
            <h2 className={styles.sectionHeading}>Understand the charge</h2>
            <VideoPlayer
              src={video.videoUrl}
              poster={video.thumbnail}
              startTime={video.startTime}
              postedDate={video.uploadDate}
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
      </div>
    </>
  );
}

function LocalResources({ area }) {
  const localSeo = area.localSeo;
  if (!localSeo) return null;

  return (
    <section className={styles.localResources}>
      <p className={styles.sectionEyebrow}>Verified local information</p>
      <h2 className={styles.sectionHeading}>
        {area.city} Court and Local Resources
      </h2>
      <p className={styles.localResourcesIntro}>
        {area.city} is located in {area.county} and served by the{" "}
        {localSeo.judicialDistrict}. Confirm the location listed on your court
        notice before appearing, because {area.county} criminal matters may be
        assigned to different court facilities.
      </p>

      <div className={styles.localResourceCards}>
        {localSeo.court && (
          <article className={styles.localResourceCard}>
            <p className={styles.localResourceLabel}>Court information</p>
            <h3>{localSeo.court.name}</h3>
            <p>{localSeo.court.address}</p>
            <p>{localSeo.court.phone}</p>
            <a
              href={localSeo.court.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the official court website →
            </a>
          </article>
        )}

        {localSeo.agency && (
          <article className={styles.localResourceCard}>
            <p className={styles.localResourceLabel}>Local agency</p>
            <h3>{localSeo.agency.name}</h3>
            <p>{localSeo.agency.address}</p>
            <p>{localSeo.agency.phone}</p>
            <a
              href={localSeo.agency.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the official agency website →
            </a>
          </article>
        )}
      </div>

      {localSeo.resources?.length > 0 && (
        <ul className={styles.verifiedResourceList}>
          {localSeo.resources.map((resource) => (
            <li key={resource.url}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {resource.name}
              </a>
              <p>{resource.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function LocalSeoPage({ area, practice, slug }) {
  const title = getLocalSeoH1(area, practice);
  const video = videos.find((item) => practice.slug === item.practiceArea);
  const jsonLd = buildLocalSeoJsonLd(area, practice, slug, video);
  const contentBlocks = getLocalSeoContentBlocks(practice);
  const faq = practice.faq?.slice(0, 5) || [];
  const relatedPractices = (practice.relatedAreas || [])
    .map((relatedSlug) =>
      practiceAreas.find((item) => item.slug === relatedSlug),
    )
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero
        title={title}
        tag={`Defense for ${practice.navTitle.toLowerCase()} matters in ${area.city} and ${area.county}.`}
      />

      <div className={styles.mainContain}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/areas-we-serve">Areas We Serve</Link>
            </li>
            <li>
              <Link href={`/locations/${area.slug}`}>{area.city}</Link>
            </li>
            <li aria-current="page">{getLocalSeoTitle(practice)}</li>
          </ol>
        </nav>

        <section className={styles.localIntro}>
          <p className={styles.sectionEyebrow}>Local criminal defense</p>
          <h2 className={styles.sectionHeading}>
            {practice.navTitle} Defense in {area.city}, Minnesota
          </h2>
          <p className={styles.localLead}>{area.uniqueAngle}</p>
          <p>{practice.heroSummary}</p>
          <Link className={styles.statewideGuideLink} href={`/${practice.slug}`}>
            Read the complete Minnesota {practice.navTitle} guide →
          </Link>
        </section>

        {video ? (
          <Link href={`/video/${video.slug}`} className={styles.videoCallout}>
            <span className={styles.videoCalloutLabel}>Related video</span>
            <span className={styles.videoCalloutTitle}>{video.title}</span>
            <span className={styles.videoCalloutAction}>Watch now →</span>
          </Link>
        ) : null}

        <LocalResources area={area} />

        <section className={styles.localLegalIntro}>
          <p className={styles.sectionEyebrow}>Minnesota law and defense</p>
          <h2 className={styles.sectionHeading}>
            Understanding {practice.navTitle} in {area.city}
          </h2>
          <p>
            Minnesota criminal law applies statewide, but the court process,
            local agency records, and practical details of a case depend on
            where it is filed. The information below explains important issues
            Andrew reviews when defending {practice.navTitle.toLowerCase()} cases.
          </p>
        </section>

        {contentBlocks.map((item, index) => (
          <ContentBlock key={index} content={item} index={index} />
        ))}

        {video ? (
          <section className={styles.featuredVideo}>
            <p className={styles.sectionEyebrow}>From Andrew Davis</p>
            <h2 className={styles.sectionHeading}>
              What to Know About {practice.navTitle}
            </h2>
            <VideoPlayer
              src={video.videoUrl}
              poster={video.thumbnail}
              startTime={video.startTime}
              postedDate={video.uploadDate}
            />
          </section>
        ) : null}

        {isLocalSeoPublished(area) && relatedPractices.length > 0 ? (
          <section className={styles.localRelatedSection}>
            <p className={styles.sectionEyebrow}>Related local services</p>
            <h2 className={styles.sectionHeading}>
              Other Criminal Defense Services in {area.city}
            </h2>
            <div className={styles.localRelatedLinks}>
              {relatedPractices.map((related) => (
                <Link
                  href={`/${buildLocalSeoSlug(area, related)}`}
                  key={related.slug}
                >
                  {area.city} {getLocalSeoTitle(related)}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {faq.length > 0 ? (
          <section className={styles.faqSection}>
            <p className={styles.sectionEyebrow}>Common questions</p>
            <h2 className={styles.faqHeading}>
              {area.city} {practice.navTitle} FAQ
            </h2>
            {faq.map((item, index) => (
              <details key={index} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.q}</summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </section>
        ) : null}

        <section className={styles.localFinalCta}>
          <p className={styles.sectionEyebrow}>Free and confidential</p>
          <h2>Talk to a {area.city} Criminal Defense Lawyer</h2>
          <p>
            If you need help with {practice.navTitle.toLowerCase()} in {area.city}
            or {area.county}, contact Andrew Davis to discuss what happened and
            what comes next.
          </p>
          <div className={styles.localCtaButtons}>
            <a href="tel:+19529941568">Call Now: (952) 994-1568</a>
            <Link href="/contact">Free Case Evaluation</Link>
          </div>
        </section>
      </div>

      <Form />
    </>
  );
}

export default async function Page({ params }) {
  const { slug } = await params;
  const statewidePage = practiceAreas.find((area) => area.slug === slug);

  if (statewidePage) {
    return <PracticePage area={statewidePage} slug={slug} />;
  }

  const localPage = findLocalSeoPage(slug);
  if (!localPage) notFound();

  if (
    process.env.NODE_ENV === "production" &&
    !isLocalSeoPublished(localPage.area)
  ) {
    notFound();
  }

  return (
    <LocalSeoPage
      area={localPage.area}
      practice={localPage.practice}
      slug={localPage.slug}
    />
  );
}
