// Video Hub

import styles from "../page.module.css";
import videosObject from "../data/videos.json";
import Image from "next/image";
import Link from "next/link";
import VideoCard from "../components/videoCard";

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
