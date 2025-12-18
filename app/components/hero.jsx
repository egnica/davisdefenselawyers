/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "../page.module.css";

export default function Hero() {
  return (
    <>
      <div className={styles.heroContain}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/stillCity.webp"
        >
          <source
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/cityVideo.webm"
            type="video/webm"
          />
          <source
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/cityVideo.mp4"
            type="video/mp4"
          />

          <img
            src="https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/stillCity.webp"
            alt="Minneapolis skyline"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </video>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <p className={styles.aboveH1}>MINNESOTA CRIMINAL DEFENSE ATTORNEY</p>

          <h1>Serious charges demand a serious defense.</h1>

          <p className={styles.contentPara}>
            Andrew Davis represents clients facing felony and misdemeanor
            charges in Minneapolis, Hennepin County, and throughout the Twin
            Cities. When your freedom and future are at stake, you need a
            defense attorney who knows how to fight and win.
          </p>
          <div className={styles.btnContain}>
            <button className={styles.btnHero}>FREE CASE EVALUATION</button>
          </div>
        </div>
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
