import type { MetadataRoute } from "next";
import { areas } from "@/data/areas";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/services",
    "/pricing",
    "/booking",
    "/areas",
    "/about",
    "/trust/therapist-standards",
    "/trust/safety-hygiene",
    "/reviews",
    "/wellness-guide",
    "/faq",
    "/contact",
    "/editorial-policy",
    "/privacy",
    "/terms"
  ];

  const routes = [
    ...staticRoutes,
    ...services.map((service) => `/services/${service.slug}`),
    ...areas.map((area) => `/areas/${area.slug}`),
    ...posts.map((post) => `/wellness-guide/${post.slug}`),
    "/authors/minseo-kim",
    "/authors/jiyoon-park"
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-05-30"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}
