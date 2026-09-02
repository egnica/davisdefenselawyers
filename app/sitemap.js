// app/sitemap.js
import practiceAreas from "./data/practice-areas_clean.json";
import serviceAreas from "./data/service-areas.json";
import videos from "./data/videos.json";

const SITE_URL = "https://www.davisdefenselawyers.com";

function extractSlugs(data, slugKey = "slug") {
  if (!data) return [];

  const arr = Array.isArray(data) ? data : null;
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
    .map((slug) => String(slug).trim())
    .filter(Boolean);
}

export default function sitemap() {
  const staticRoutes = [
    "/",
    "/about",
    "/contact",
    "/criminal-defense",
    "/areas-we-serve",
    "/video",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const practiceRoutes = extractSlugs(practiceAreas).map((slug) => ({
    url: `${SITE_URL}/${slug}`,
  }));

  const locationRoutes = extractSlugs(serviceAreas).map((slug) => ({
    url: `${SITE_URL}/locations/${slug}`,
  }));

  const videoRoutes = videos
    .filter((video) => video?.slug)
    .map((video) => ({
      url: `${SITE_URL}/video/${video.slug}`,
      ...(video.uploadDate ? { lastModified: new Date(video.uploadDate) } : {}),
    }));

  return [
    ...staticRoutes,
    ...practiceRoutes,
    ...locationRoutes,
    ...videoRoutes,
  ];
}
