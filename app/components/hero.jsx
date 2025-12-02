import Image from "next/image";
import styles from "../page.module.css";

export default function Hero() {
  return (
    <>
      <div className={styles.heroContain}>
        <video autoPlay muted loop playsInline poster="/media/city-poster.jpg">
          <source
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/cityVideo.webm"
            type="video/webm"
          />
          <source
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/cityVideo.mp4"
            type="video/mp4"
          />
        </video>
        <div className={styles.overlay}></div>
        <div className={styles.heroAndrew}>
          <Image
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/andrew-davis1.webp"
            alt="Attorney Andrew Davis"
            width={450}
            height={700}
            priority
          />
        </div>
      </div>
    </>
  );
}
