// Video Hub

import styles from "../page.module.css";
import videosObject from "../data/videos.json";
import Link from "next/link";
import VideoCard from "../components/videoCard";

export const metadata = {
  title: "Minnesota Criminal Defense Videos | Davis Defense",
  description:
    "Watch criminal defense attorney Andrew Davis explain Minnesota criminal charges, DWI/DUI offenses, assault, theft, traffic violations, and what to know if you are facing a criminal case.",
  keywords: [
    "Minnesota criminal defense videos",
    "criminal defense attorney videos",
    "Andrew Davis defense lawyer",
    "Davis Defense videos",
    "Minnesota DWI lawyer",
    "Minnesota DUI lawyer",
    "Minnesota assault charges",
    "Minnesota theft crimes",
    "Minnesota traffic violations",
    "criminal charges in Minnesota",
    "Minnesota defense attorney",
  ],
  alternates: {
    canonical: "https://www.davisdefenselawyers.com/video",
  },
  openGraph: {
    title: "Minnesota Criminal Defense Videos | Davis Defense",
    description:
      "Watch Andrew Davis explain Minnesota criminal defense topics, including DWI/DUI, assault, theft, traffic violations, and what to know if you are facing charges.",
    url: "https://www.davisdefenselawyers.com/video",
    siteName: "Davis Defense",
    type: "website",
    images: [
      {
        url: "https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/Videos-davis/thumbnail/video-library.webp",
        width: 1200,
        height: 630,
        alt: "Minnesota Criminal Defense Video Library with Andrew Davis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minnesota Criminal Defense Videos | Davis Defense",
    description:
      "Watch Andrew Davis explain Minnesota criminal defense topics and what to know if you are facing charges.",
    images: [
      "https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/Videos-davis/thumbnail/video-library.webp",
    ],
  },
};

function page() {
  return (
    <div className={styles.videoHub}>
      <header className={styles.videoHubHeader}>
        <p className={styles.eyebrow}>Minnesota criminal defense</p>
        <h1>Video Library</h1>
        <p>
          Andrew Davis explains criminal charges, court processes, and the
          practical questions people face after an arrest. Choose a topic for
          straightforward guidance in plain language.
        </p>
      </header>

      <div className={styles.videoGrid}>
        {videosObject.map((item) => (
          <div key={item.slug} className={styles.videoCard}>
            <VideoCard item={item} />
            <div className={styles.videoCardBody}>
              <h3 className={styles.videoCardTitle}>{item.title}</h3>
              <Link
                className={styles.videoCardLink}
                href={`/video/${item.slug}`}
              >
                Watch video →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
