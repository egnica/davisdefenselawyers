// Watch Page
import React from "react";
import { notFound } from "next/navigation";
import videoList from "../../data/videos.json";
import VideoPlayer from "@/app/components/video";
import styles from "../../page.module.css";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://www.davisdefenselawyers.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const video = videoList.find((item) => item.slug === slug);

  if (!video) {
    return {
      title: "Video Not Found",
      description: "The requested video could not be found.",
      robots: { index: false, follow: false },
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

  if (!video) notFound();

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
  return (
    <div className={styles.videoWatchPage}>
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

      <section className={styles.videoContainer}>
        <VideoPlayer
          src={video.videoUrl}
          poster={video.thumbnail}
          startTime={startTime}
          postedDate={video.uploadDate}
        />

        {video.clips?.length > 0 && (
          <aside className={styles.chaptersContainer}>
            <p className={styles.eyebrow}>Jump to a topic</p>
            <h2>Chapters</h2>
            <ul className={styles.chapterList}>
              {video.clips.map((clip) => (
                <li key={`${clip.name}-${clip.startOffset}`}>
                  <a href={`?t=${Math.round(clip.startOffset)}`}>{clip.name}</a>
                </li>
              ))}
            </ul>

            <div className={styles.ctaChapterContain}>
              <p>{video.cta}</p>
              <a className={styles.ctaChaptersBtn} href="tel:+19529941568">
                Call Andrew Davis
                <span>(952) 994-1568</span>
              </a>
              <Link className={styles.practiceTextLink} href={`/${video.practiceArea}`}>
                {video.linkPractice} →
              </Link>
            </div>
          </aside>
        )}
      </section>

      <article className={styles.videoArticle}>
        <p className={styles.eyebrow}>Minnesota criminal defense video</p>
        <h1>{video.title}</h1>
        <p className={styles.videoDescription}>{video.description}</p>

        {video.watchHighlights?.length > 0 && (
          <section className={styles.videoHighlights}>
            <h2>What Andrew Covers</h2>
            <ul>
              {video.watchHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {youtubeWatchUrl && (
          <a className={styles.youtubeLink} href={youtubeWatchUrl}>
            <span>▶</span> Watch on YouTube
          </a>
        )}
      </article>

      <section className={styles.relatedVideos}>
        <p className={styles.eyebrow}>Keep learning</p>
        <h2>More criminal defense videos</h2>
        <div className={styles.videoLinkContain}>
          {videoList
            .filter((item) => item.slug !== video.slug)
            .slice(0, 6)
            .map((item) => (
            <Link
              className={styles.videoLinkCard}
              key={item.slug}
              href={`/video/${item.slug}`}
            >
              <Image
                src={item.thumbnail}
                width={640}
                height={360}
                alt={`Video thumbnail for ${item.title}`}
              />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
