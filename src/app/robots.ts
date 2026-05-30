import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/booking/complete"]
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/booking/complete"]
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/booking/complete"]
      },
      {
        userAgent: "Yeti",
        allow: "/",
        disallow: ["/booking/complete"]
      },
      {
        userAgent: "NaverBot",
        allow: "/",
        disallow: ["/booking/complete"]
      }
    ],
    sitemap: [absoluteUrl("/sitemap.xml"), absoluteUrl("/sitemap1.xml"), absoluteUrl("/rss.xml")]
  };
}
