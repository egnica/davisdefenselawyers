//VIDEO PLAYER
"use client";
import styles from "../page.module.css";

import { useEffect, useRef } from "react";

export default function VideoPlayer({
  src,
  poster,
  startTime = 0,
  postedDate,
}) {
  const videoRef = useRef(null);

  const postDate = new Date(postedDate);
  const formattedDate = postDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    const handleLoadedMetadata = async () => {
      if (startTime > 0) {
        node.currentTime = startTime;

        try {
          await node.play();
        } catch (err) {
          // Autoplay may be blocked by the browser.
          console.log("Autoplay blocked:", err);
        }
      } else {
        node.pause();
      }
    };

    if (node.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      node.addEventListener("loadedmetadata", handleLoadedMetadata, {
        once: true,
      });
    }

    return () => {
      node.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [startTime, src]);

  return (
    <div className={styles.videoWrapper}>
      <video
        className={styles.videoPlayer}
        ref={videoRef}
        src={src}
        controls
        poster={poster}
        preload="metadata"
      />

      <p style={{ padding: "0 0 0 20px", fontSize: "1rem", margin: 0 }}>
        Published: {formattedDate}
      </p>
    </div>
  );
}
