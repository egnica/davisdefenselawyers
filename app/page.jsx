import Image from "next/image";
import styles from "./page.module.css";
import Practices from "./data/practice-areas_clean.json";
import Hero from "./components/hero";

export default function Home() {
  return (
    <>
      <div style={{ height: "100px" }}></div>
      <Hero />
    </>
  );
}
