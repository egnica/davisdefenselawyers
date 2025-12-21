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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable}`}>
        <Nav practiceAreas={Data.practiceAreas} serviceAreas={Areas.areas} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
