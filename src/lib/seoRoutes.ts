import { areas } from "@/data/areas";
import { pageCount, postCategories, postsByCategory } from "@/data/postCategories";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import { absoluteUrl } from "./utils";

export const lastModified = "2026-05-31";

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

export const indexableRoutes = [
  ...staticRoutes,
  ...services.map((service) => `/services/${service.slug}`),
  ...areas.map((area) => `/areas/${area.slug}`),
  ...postCategories.map((category) => `/wellness-guide/category/${category.slug}`),
  ...postCategories.flatMap((category) =>
    Array.from({ length: Math.max(0, pageCount(postsByCategory(category.slug).length) - 1) }, (_, index) => `/wellness-guide/category/${category.slug}/page/${index + 2}`)
  ),
  ...Array.from({ length: Math.max(0, pageCount(posts.length) - 1) }, (_, index) => `/wellness-guide/page/${index + 2}`),
  ...posts.map((post) => `/wellness-guide/${post.slug}`),
  "/authors/minseo-kim",
  "/authors/jiyoon-park"
];

export function sitemapEntries() {
  return indexableRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(lastModified),
    changeFrequency: route === "/" ? "weekly" as const : "monthly" as const,
    priority: route === "/" ? 1 : route.startsWith("/wellness-guide/") ? 0.65 : 0.7
  }));
}

export function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
