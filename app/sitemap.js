// app/sitemap.js
import practiceAreas from "./data/practice-areas_clean.json";
import serviceAreas from "./data/service-areas.json";

const SITE_URL = "https://davisdefenselawyers.com";

/**
 * Safely extract slugs from different possible JSON shapes.
 * - Supports arrays of objects: [{ slug: "dwi" }, ...]
 * - Supports objects with an array property like { areas: [...] } if you adapt the accessor.
 */
function extractSlugs(data, slugKey = "slug") {
  if (!data) return [];

  // If it's already an array, use it
  const arr = Array.isArray(data) ? data : null;

  // If it's an object, try common container keys (adjust if needed)
  const objArr =
    !arr && typeof data === "object"
      ? data.items || data.areas || data.locations || data.practiceAreas || null
      : null;

  const source = arr || objArr || [];

  return source
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") return item[slugKey] || item.slug;
      return null;
    })
    .filter(Boolean)
    .map((s) => String(s).trim())
    .filter((s) => s.length > 0);
}

export default function sitemap() {
  const now = new Date();

  // 1) Static + hub pages that should be indexed
  const staticRoutes = [
    "/",
    "/about",
    "/contact",
    "/criminal-defense", // practice hub
    "/areas-we-serve", // locations hub
    // "/blog",          // blog index (enable when /blog exists)
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  // 2) Practice pages live at the root: /[slug]
  const practiceSlugs = extractSlugs(practiceAreas, "slug");
  const practiceRoutes = practiceSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 3) Location pages live at /locations/[slug] (no /locations index page required)
  const locationSlugs = extractSlugs(serviceAreas, "slug");
  const locationRoutes = locationSlugs.map((slug) => ({
    url: `${SITE_URL}/locations/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 4) Blog posts (enable when blog data exists)
  // const blogSlugs = extractSlugs(blogPosts, "slug");
  // const blogRoutes = blogSlugs.map((slug) => ({
  //   url: `${SITE_URL}/blog/${slug}`,
  //   lastModified: now,
  //   changeFrequency: "yearly",
  //   priority: 0.6,
  // }));

  return [
    ...staticRoutes,
    ...practiceRoutes,
    ...locationRoutes,
    // ...blogRoutes,
  ];
}
