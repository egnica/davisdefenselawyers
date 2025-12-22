import React from "react";

import Link from "next/link";

export default function BlogComingSoon() {
  return (
    <main style={styles.main}>
      <section style={styles.card}>
        <h1 style={styles.h1}>Blog Coming Soon</h1>
        <p style={styles.p}>
          We’re working on helpful articles and updates. Please check back soon.
        </p>

        <Link href="/" style={styles.link}>
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "70vh",
    display: "grid",
    placeItems: "center",
    padding: "40px 16px",
  },
  card: {
    width: "100%",
    maxWidth: "720px",
    textAlign: "center",
    padding: "28px 18px",
    border: "1px solid #e6e6e6",
    borderRadius: "12px",
  },
  h1: {
    margin: "0 0 10px",
    fontSize: "2rem",
  },
  p: {
    margin: "0 0 16px",
    fontSize: "1.1rem",
    lineHeight: 1.6,
    color: "#444",
  },
  link: {
    display: "inline-block",
    textDecoration: "none",
    fontWeight: 700,
  },
};
