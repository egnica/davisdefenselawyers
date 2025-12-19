"use client";

import { useState, useRef } from "react";
import styles from "../page.module.css";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    company: "", // honeypot
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const startedAt = useRef(Date.now());

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startedAt: startedAt.current }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("success");
      startedAt.current = Date.now();
      setForm({ name: "", email: "", phone: "", message: "", company: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>FREE CASE REVIEW</h2>

      <div className={styles.topRow}>
        <label className={styles.field}>
          Name
          <input
          className={styles.input}
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.field}>
          Phone
          <input
          className={styles.input}
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.field}>
          Email
          <input
          className={styles.input}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Honeypot (doesn't affect layout) */}
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Company
          <input
            
            name="company"
            value={form.company}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <label className={styles.messageField}>
        Message
        <textarea
        className={styles.textarea}
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
        />
      </label>

      <button
        className={styles.btnForm}
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "SEND MESSAGE"}
      </button>

      {status === "success" && (
        <p className={styles.success}>✅ Sent. We’ll get back to you soon.</p>
      )}
      {status === "error" && <p className={styles.error}>❌ {error}</p>}
    </form>
  );
}
