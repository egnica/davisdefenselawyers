"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";

export default function Nav({ practiceAreas = [], serviceAreas = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // single state controls which dropdown is open: "practice" | "service" | null
  const [openDropdown, setOpenDropdown] = useState(null);

  // one ref that wraps BOTH dropdowns (and anything you want to treat as "inside")
  const dropdownWrapRef = useRef(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((current) => (current === name ? null : name));
  };

  // close dropdown if you click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownWrapRef.current &&
        !dropdownWrapRef.current.contains(e.target)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // if mobile menu closes, also close any open dropdown
  useEffect(() => {
    if (!mobileOpen) setOpenDropdown(null);
  }, [mobileOpen]);

  const phone = "(952) 994-1568";
  const tel = "+19529941568";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.brand} aria-label="Go to homepage">
          <span className={styles.brandMark} aria-hidden="true">
            AD
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>Davis Defense</span>
            <span className={styles.brandTag}>
              Criminal Defense • Minnesota
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Primary">
          <Link className={styles.navLink} href="/">
            Home
          </Link>

          <Link className={styles.navLink} href="/about">
            About
          </Link>

          {/* ✅ Wrap dropdowns with a single ref for click-outside */}
          <div ref={dropdownWrapRef} className={styles.dropdownWrap}>
            {/* Practice Areas dropdown */}
            <div className={styles.dropdown}>
              <button
                type="button"
                className={`${styles.navLink} ${styles.dropdownBtn}`}
                aria-haspopup="menu"
                aria-expanded={openDropdown === "practice"}
                onClick={() => toggleDropdown("practice")}
              >
                Practice Areas
                <span className={styles.chev} aria-hidden="true">
                  ▾
                </span>
              </button>

              <div
                className={`${styles.dropdownMenu} ${
                  openDropdown === "practice" ? styles.dropdownOpen2 : ""
                }`}
                role="menu"
              >
                <Link
                  className={styles.dropdownItem}
                  href="../criminal-defense"
                  onClick={() => setOpenDropdown(null)}
                  style={{ color: "red" }}
                >
                  VIEW ALL
                </Link>
                {practiceAreas?.length ? (
                  practiceAreas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/${area.slug}`}
                      className={styles.dropdownItem}
                      role="menuitem"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {area.navTitle}
                    </Link>
                  ))
                ) : (
                  <>
                    <Link
                      href="/criminal-defense"
                      className={styles.dropdownItem}
                      role="menuitem"
                      onClick={() => setOpenDropdown(null)}
                    >
                      Criminal Defense (Overview)
                    </Link>

                    <span className={styles.dropdownHint}>
                      (Practice dropdown will be populated from JSON)
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Areas We Serve dropdown */}
            <div className={styles.dropdown}>
              <button
                type="button"
                className={`${styles.navLink} ${styles.dropdownBtn}`}
                aria-haspopup="menu"
                aria-expanded={openDropdown === "service"}
                onClick={() => toggleDropdown("service")}
              >
                Areas We Serve
                <span className={styles.chev} aria-hidden="true">
                  ▾
                </span>
              </button>

              <div
                className={`${styles.dropdownMenu} ${
                  openDropdown === "service" ? styles.dropdownOpen : ""
                }`}
                role="menu"
              >
                {serviceAreas?.length ? (
                  serviceAreas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/locations/${area.slug}`}
                      className={styles.dropdownItem}
                      role="menuitem"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {area.city ?? area.label ?? area.title}
                    </Link>
                  ))
                ) : (
                  <>
                    {/* placeholders until you wire up JSON */}
                    <Link
                      href="/areas-we-serve"
                      className={styles.dropdownItem}
                      role="menuitem"
                      onClick={() => setOpenDropdown(null)}
                    >
                      View all service areas
                    </Link>

                    <span className={styles.dropdownHint}>
                      (Service areas dropdown will be populated from JSON)
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <Link className={styles.navLink} href="/blog">
            Blog
          </Link>

          <Link className={styles.navLink} href="/contact">
            Contact
          </Link>
        </nav>

        {/* Right side CTA */}
        <div className={styles.ctaWrap}>
          <a className={styles.cta} href={`tel:${tel}`}>
            <span style={{ textAlign: "center", color: "black" }}>
              CALL NOW
            </span>
            <span style={{ textAlign: "center" }} className={styles.ctaTop}>
              Call / Text 24/7
            </span>
            <span className={styles.ctaBottom}>
              <PhoneIcon /> {phone}
            </span>
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className={styles.menuBtn}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className={styles.menuLines} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div className={`${styles.mobilePanel} ${mobileOpen ? styles.open : ""}`}>
        <div className={styles.mobileLinks}>
          <Link onClick={() => setMobileOpen(false)} href="/">
            Home
          </Link>
          <Link onClick={() => setMobileOpen(false)} href="/about">
            About
          </Link>
          <Link onClick={() => setMobileOpen(false)} href="/criminal-defense">
            Practice Areas
          </Link>
          <Link onClick={() => setMobileOpen(false)} href="/areas-we-serve">
            Areas We Serve
          </Link>
          <Link onClick={() => setMobileOpen(false)} href="/blog">
            Blog
          </Link>
          <Link onClick={() => setMobileOpen(false)} href="/contact">
            Contact
          </Link>

          <a className={styles.mobileCta} href={`tel:${tel}`}>
            Call / Text: {phone}
          </a>
        </div>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.6 10.8c1.4 2.7 3.9 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.9.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.3 22 2 13.7 2 3c0-.6.4-1 1-1h3.9c.6 0 1 .4 1 1 0 1.3.2 2.7.6 3.9.1.4 0 .8-.3 1.1l-2.2 2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
