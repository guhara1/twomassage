import { sitemapEntries, xmlEscape } from "@/lib/seoRoutes";

export const dynamic = "force-static";

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries()
  .map(
    (entry) => `  <url>
    <loc>${xmlEscape(entry.url)}</loc>
    <lastmod>${entry.lastModified.toISOString().slice(0, 10)}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8"
    }
  });
}
