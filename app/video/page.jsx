// Video Hub

import styles from "../page.module.css";
import videosObject from "../data/videos.json";
import Image from "next/image";
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
    <div className={styles.videoPageContainer}>
      <h1>Video Collection</h1>

      <div className={styles.videoGrid}>
        {videosObject.map((item, index) => (
          <div key={index} className={styles.videoCard}>
            <VideoCard item={item} />
            <h3 className={styles.videoCardTitle}>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
