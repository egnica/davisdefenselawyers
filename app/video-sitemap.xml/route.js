import videos from "../data/videos.json";

const BASE_URL = "https://www.davisdefenselawyers.com";

function isoDurationToSeconds(iso) {
  const match = String(iso || "").match(
    /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/,
  );

  if (!match) return null;

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  return hours * 3600 + minutes * 60 + seconds;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos
  .map((video) => {
    const duration = isoDurationToSeconds(video.duration);

    return `
  <url>
    <loc>${escapeXml(`${BASE_URL}/video/${video.slug}`)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(video.thumbnail)}</video:thumbnail_loc>
      <video:title><![CDATA[${video.title}]]></video:title>
      <video:description><![CDATA[${video.description}]]></video:description>
      <video:content_loc>${escapeXml(video.videoUrl)}</video:content_loc>
      ${duration ? `<video:duration>${duration}</video:duration>` : ""}
      <video:publication_date>${escapeXml(video.uploadDate)}T00:00:00+00:00</video:publication_date>
    </video:video>
  </url>`;
  })
  .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
