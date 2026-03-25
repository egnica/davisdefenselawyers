import videos from "../data/videos.json";

export async function GET() {
  const baseUrl = "https://www.davisdefenselawyers.com";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${videos
      .map((video) => {
        function isoDurationToSeconds(iso) {
          const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

          if (!match) return 0;

          const hours = parseInt(match[1] || 0);
          const minutes = parseInt(match[2] || 0);
          const seconds = parseInt(match[3] || 0);

          return hours * 3600 + minutes * 60 + seconds;
        }
        const duration = isoDurationToSeconds(video.duration);

        return `
        <url>
          <loc>${baseUrl}/video/${video.slug}</loc>

          <video:video>
            <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>
            <video:title><![CDATA[${video.title}]]></video:title>
            <video:description><![CDATA[${video.description}]]></video:description>
            <video:content_loc>${video.videoUrl}</video:content_loc>
            <video:duration>${duration}</video:duration>
            <video:publication_date>${video.uploadDate}T00:00:00+00:00</video:publication_date>
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
