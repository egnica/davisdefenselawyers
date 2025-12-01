// app/[slug]/page.jsx
import { notFound } from "next/navigation";
import rawData from "../data/practice-areas_clean.json";

const practiceAreas = rawData.practiceAreas || [];

// Pre-generate all slugs from the JSON
export function generateStaticParams() {
  return practiceAreas.map((area) => ({
    slug: area.slug,
  }));
}

// Minimal page: show slug + title so we know it's wired correctly
export default async function Page({ params }) {
  const { slug } = await params; // Next 16: params is a Promise

  const area = practiceAreas.find((a) => a.slug === slug);

  if (!area) {
    notFound();
  }

  return (
    <main>
      <h1>{area.pageTitle || area.navTitle}</h1>
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      {area.heroSummary && <p>{area.heroSummary}</p>}
    </main>
  );
}
