"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

function VideoCard({ item }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <Link
      href={`video/${item.slug}`}
      className={styles.videoCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.videoThumbWrap}>
        <Image
          width={1600}
          height={900}
          src={item.thumbnail}
          alt={`${item.title} image`}
          className={styles.videoThumbImage}
        />

        <video
          ref={videoRef}
          className={styles.videoThumbPreview}
          src={item.videoUrl}
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </Link>
  );
}
export default VideoCard;
