import Image from "next/image";
import styles from "./page.module.css";
import Practices from "./data/practice-areas_clean.json";
import Hero from "./components/hero";
import Nav from "./components/nav";

export default function Home() {
  return (
    <>
      <Nav/>
      <Hero />
    </>
  );
}
