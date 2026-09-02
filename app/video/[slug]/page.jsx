// Watch Page
import React from "react";
import videoList from "../../data/videos.json";
import VideoPlayer from "@/app/components/video";
import styles from "../../page.module.css";
import Link from "next/link";

const SITE_URL = "https://www.davisdefenselawyers.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const video = videoList.find((item) => item.slug === slug);

  if (!video) {
    return {
      title: "Video Not Found",
      description: "The requested video could not be found.",
    };
  }

  const pageUrl = `${SITE_URL}/video/${video.slug}`;

  return {
    title: video.title,
    description: video.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: video.title,
      description: video.description,
      url: pageUrl,
      siteName: "Davis Defense Lawyers",
      images: [
        {
          url: video.thumbnail,
          width: 1280,
          height: 720,
        },
      ],
      type: "video.other",
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
    },
  };
}



export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const { t } = await searchParams;

  const video = videoList.find((item) => item.slug === slug);

  if (!video) return <div>Video not found {slug}</div>;

  const startTime = Number(t || 0);

  const pageUrl = `${SITE_URL}/video/${video.slug}`;
  const youtubeWatchUrl = video.youtubeId
    ? `https://www.youtube.com/watch?v=${video.youtubeId}`
    : null;

  const clips =
    video.clips?.map((item) => {
      const startOffset = Math.round(item.startOffset);
      const endOffset = Math.round(item.endOffset);

      return {
        "@type": "Clip",
        name: item.name,
        startOffset,
        endOffset,
        url: `${pageUrl}?t=${startOffset}`,
      };
    }) || [];

  const sameAs = [
    ...new Set([
      ...(video.sameAs || []),
      ...(youtubeWatchUrl ? [youtubeWatchUrl] : []),
    ]),
  ];





  function normalizeVideoDuration(input) {
    const value = String(input || "").trim().toUpperCase();
    const validIsoDuration =
      /^PT(?:(?:\d+)H)?(?:(?:\d+)M)?(?:(?:\d+)S)?$/.test(value);

    return validIsoDuration ? value : null;
  }

  const normalizedDuration = normalizeVideoDuration(video.duration);

  function normalizeSchemaDate(dateString) {
    if (!dateString) return "";

    // If it already includes a time, leave it alone
    if (dateString.includes("T")) return dateString;

    return `${dateString}T00:00:00+00:00`;
  }
  const normalizedUploadDate = normalizeSchemaDate(video.uploadDate);
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${pageUrl}#video`,
    name: video.title,
    description: video.description,
    thumbnailUrl: [video.thumbnail],
    uploadDate: normalizedUploadDate,
    ...(normalizedDuration ? { duration: normalizedDuration } : {}),
    contentUrl: video.videoUrl,
    url: pageUrl,
    inLanguage: "en-US",
    isFamilyFriendly: true,
    keywords: video.keywords,
    ...(clips.length
      ? { hasPart: clips }
      : {
          potentialAction: {
            "@type": "SeekToAction",
            target: `${pageUrl}?t={seek_to_second_number}`,
            "startOffset-input": "required name=seek_to_second_number",
          },
        }),
    ...(sameAs.length ? { sameAs } : {}),
    publisher: { "@id": `${SITE_URL}/#firm` },
    author: { "@id": `${SITE_URL}/#attorney` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Videos",
        item: `${SITE_URL}/video`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: video.title,
        item: pageUrl,
      },
    ],
  };
  /* 
  const serviceObject = areasContent.practiceAreas.find(
    (item) => item.slug == video.practiceArea,
  );

  const firstSection = serviceObject.contentBlocks.find(
    (item) => item.type === "section",
  ); */

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className={styles.videoContainer}>
        <VideoPlayer
          src={video.videoUrl}
          poster={video.thumbnail}
          startTime={startTime}
          postedDate={video.uploadDate}
        />

        {video.clips?.length > 0 && (
          <div className={styles.chaptersContainer}>
            <h3>Chapters</h3>
            <ul className={styles.chapterList}>
              {video.clips.map((clip) => (
                <li key={`${clip.name}-${clip.startOffset}`}>
                  {" "}
                  <a href={`?t=${Math.round(clip.startOffset)}`}>{clip.name}</a>
                </li>
              ))}
            </ul>

            <hr />

            <div className={styles.ctaChapterContain}>
              <p style={{ marginBottom: "10px" }}>{video.cta}</p>
              <p>
                <a className={styles.ctaChaptersBtn} href="tel:+1-952-944-1568">
                  Call Andrew Davis
                  <br />
                  (952) 994-1568
                </a>
              </p>
              <br />
              <Link href={`/${video.practiceArea}`}>{video.linkPractice}</Link>
            </div>
          </div>
        )}
      </div>

      <div className={styles.videoPageContainer}>
        <h1>{video.title}</h1>
        <section style={{ padding: "0 30px" }}>
          <p>{video.description}</p>
        </section>

        {youtubeWatchUrl && (
          <a href={youtubeWatchUrl}>
            <span style={{ color: "red" }}>▶</span> Watch On YouTube
          </a>
        )}
      </div>

      {/*       {firstSection && (
        <div className={styles.videoPageContainer}>
          <h2 style={{ fontSize: "1.5rem" }}>{firstSection.title}</h2>
          <p>{firstSection.body}</p>
        </div>
      )} */}

      <div style={{ padding: "0px 20px 20px 20px" }}>
        <h2 style={{ fontSize: "1.5rem", margin: "0" }}>Other Video Links:</h2>
        <div className={styles.videoLinkContain}>
          {Object.values(videoList).map((item, index) => (
            <div className={styles.videoLinkCard} key={index}>
              <Link
                href={`https://www.davisdefenselawyers.com/video/${item.slug}`}
              >
                <img
                  src={item.thumbnail}
                  width={150}
                  alt={`video thumbnail for ${item.title}`}
                />
              </Link>
              <br />

              <Link
                href={`https://www.davisdefenselawyers.com/video/${item.slug}`}
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
