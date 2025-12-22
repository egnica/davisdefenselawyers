import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav.jsx";
import Data from "./data/practice-areas_clean.json";
import Areas from "./data/service-areas.json";
import Footer from "./components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: "Andrew Davis | Minneapolis Criminal Defense Attorney",
  description: "Experienced Minnesota criminal defense attorney...",
};

// ✅ Site constants
const SITE_URL = "https://davisdefenselawyers.com";

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
  url: "https://nciholasegner.s3.us-east-2.amazonaws.com/andrewDavis/andrew-3.webp",
  caption: "Andrew Davis, Minnesota Criminal Defense Attorney",
  width: 900,
  height: 1350,
};

const SAME_AS = [
  "https://www.avvo.com/attorneys/55437-mn-andrew-davis-4803224.html",
  "https://www.experience.com/reviews/andrew-8011103",
  "https://www.facebook.com/Daviscriminaldefense",
];

// ✅ Optional: lightweight areaServed (sitewide should stay broad)
const AREA_SERVED = [
  { "@type": "AdministrativeArea", name: "Minnesota" },
  { "@type": "AdministrativeArea", name: "Twin Cities, MN" },
];

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
        {/*  Sitewide JSON-LD: firm identity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(firmJsonLd) }}
        />

        <Nav practiceAreas={Data.practiceAreas} serviceAreas={Areas.areas} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
