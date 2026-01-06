import Link from "next/link";

export default function NotFound() {
  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Page Not Found</h1>

      <p style={styles.text}>
        The page you’re looking for may have been moved or no longer exists.
      </p>

      <Link href="/" style={styles.button}>
        Return to Home
      </Link>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "2rem",
  },
  heading: {
    fontSize: "2.25rem",
    marginBottom: "1rem",
  },
  text: {
    maxWidth: "480px",
    fontSize: "1.1rem",
    marginBottom: "2rem",
    color: "#555",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#b30000", // firm red
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
    fontWeight: 600,
  },
};
