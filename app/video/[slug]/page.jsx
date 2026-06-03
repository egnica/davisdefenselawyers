// Watch Page
import React from "react";
import videoList from "../../data/videos.json";
import VideoPlayer from "@/app/components/video";
import styles from "../../page.module.css";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const video = videoList.find((item) => item.slug === slug);

  if (!video) {
    return {
      title: "Video Not Found",
      description: "The requested video could not be found.",
    };
  }

  const pageUrl = `https://www.davisdefenselawyers.com/video/${video.slug}`;

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

  const pageUrl = `https://www.davisdefenselawyers.com/video/${video.slug}`;
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
    ...(video.sameAs || []),
    ...(youtubeWatchUrl ? [youtubeWatchUrl] : []),
  ];

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
    datePublished: normalizedUploadDate,
    dateModified: normalizedUploadDate,
    duration: formatGoogleVideoDuration(time),

    contentUrl: video.videoUrl,

    url: pageUrl,
    inLanguage: "en-US",
    isFamilyFriendly: true,
    potentialAction: [
      {
        "@type": "WatchAction",
        target: pageUrl,
      },
      {
        "@type": "SeekToAction",
        target: `${pageUrl}?t={seek_to_second_number}`,
        "startOffset-input": "required name=seek_to_second_number",
      },
    ],
    keywords: video.keywords,
    ...(clips.length ? { hasPart: clips } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    publisher: {
      "@type": "Organization",
      "@id": "https://www.davisdefenselawyers.com/#organization",
      name: "Andrew Davis Defense",
      url: "https://www.davisdefenselawyers.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.davisdefenselawyers.com/images/logo.png",
      },
    },
    author: {
      "@type": "Person",
      "@id": "https://www.davisdefenselawyers.com/#andrew-davis",
      name: "Andrew Davis",
      url: "https://www.davisdefenselawyers.com/about",
    },
    about: {
      "@type": "Thing",
      name: video.practiceArea,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.davisdefenselawyers.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Videos",
        item: "https://www.davisdefenselawyers.com/video",
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

const time = video.duration;
function formatGoogleVideoDuration(input) {
  if (!input) return "PT0S";

  // Case 1: If input is a raw number (total seconds)
  if (typeof input === 'number') {
    const minutes = Math.floor(input / 60);
    const seconds = Math.floor(input % 60);
    return `PT${minutes}M${seconds}S`;
  }

  let cleanInput = input.toString().trim().toUpperCase();

  // Case 2: Standard digital clock format string (e.g., "02:50" or "2:50")
  if (cleanInput.includes(':')) {
    const parts = cleanInput.split(':');
    const minutes = parseInt(parts[0], 10) || 0;
    const seconds = parseInt(parts[1], 10) || 0;
    return `PT${minutes}M${seconds}S`;
  }

  // Strip initial "PT" if your template is prepending it before failing
  if (cleanInput.startsWith('PT')) {
    cleanInput = cleanInput.substring(2);
  }

  // Case 3: Parsing text strings missing standard trailing indicators (like "1M537")
  // Captures the minutes block and dynamically pulls the first two digits of the seconds block
  const minuteMatch = cleanInput.match(/(\d+)M/);
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

  let seconds = 0;
  if (cleanInput.includes('M')) {
    // Grab everything after the "M"
    const afterM = cleanInput.split('M')[1].replace(/[^0-9]/g, '');
    // Take only the first 2 digits to completely eliminate trailing millisecond bugs (e.g., "537" -> 53)
    seconds = parseInt(afterM.substring(0, 2), 10) || 0;
  } else {
    // Fallback if it's just raw numeric text string without 'M'
    const totalSecs = parseInt(cleanInput.replace(/[^0-9]/g, ''), 10) || 0;
    return `PT${Math.floor(totalSecs / 60)}M${Math.floor(totalSecs % 60)}S`;
  }

  return `PT${minutes}M${seconds}S`;
}


  

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
