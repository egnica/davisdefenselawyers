// layout.js
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav.jsx";
import Data from "./data/practice-areas_clean.json";
import Areas from "./data/service-areas.json";
import Footer from "./components/footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

// Site constants
const SITE_URL = "https://www.davisdefenselawyers.com";

const OFFICE_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "1230 Night Trail",
  addressLocality: "Waconia",
  addressRegion: "MN",
  postalCode: "55387",
  addressCountry: "US",
};

const FIRM_IMAGE = {
  "@type": "ImageObject",
  "@id": `${SITE_URL}#primaryimage`,
  url: "https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/andrew-3.webp",
  caption: "Andrew Davis, Minnesota Criminal Defense Attorney",
  width: 900,
  height: 1350,
};

const SAME_AS = [
  "https://www.avvo.com/attorneys/55437-mn-andrew-davis-4803224.html",
  "https://www.experience.com/reviews/andrew-8011103",
  "https://www.facebook.com/Daviscriminaldefense",
  "https://www.youtube.com/@AndrewDavisAttorney",
  "https://www.linkedin.com/in/andrew-davis-aa4aa253/",
];

const AREA_SERVED = [
  { "@type": "AdministrativeArea", name: "Minnesota" },
  { "@type": "AdministrativeArea", name: "Twin Cities, MN" },
];

// Keep Nav data lightweight so every page does not receive the full practice-area JSON.
const navPracticeAreas = Data.practiceAreas.map((area) => ({
  slug: area.slug,
  navTitle: area.navTitle,
}));

const navServiceAreas = Areas.areas.map((area) => ({
  slug: area.slug,
  city: area.city || area.label || area.title || area.name,
}));

function buildFirmJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": `${SITE_URL}#firm`,
        name: "Davis Defense Lawyers",
        url: SITE_URL,
        telephone: "+19529941568",
        address: OFFICE_ADDRESS,
        areaServed: AREA_SERVED,
        image: [FIRM_IMAGE],
        sameAs: SAME_AS,
        provider: { "@id": `${SITE_URL}#attorney` },
      },
      {
        "@type": "Attorney",
        "@id": `${SITE_URL}#attorney`,
        name: "Andrew Davis",
        url: `${SITE_URL}/about`,
        telephone: "+19529941568",
        address: OFFICE_ADDRESS,
        image: [FIRM_IMAGE],
      },
    ],
  };
}

export default function RootLayout({ children }) {
  const firmJsonLd = buildFirmJsonLd();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable}`}>
        {/* Google Analytics Tracking Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-12V935FH19"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

             gtag('config', 'G-12V935FH19');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(firmJsonLd) }}
        />

        <Nav practiceAreas={navPracticeAreas} serviceAreas={navServiceAreas} />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
