import type { MetadataRoute } from "next";
import { areas } from "@/data/areas";
import { pageCount, postCategories, postsByCategory } from "@/data/postCategories";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

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
    ...postCategories.map((category) => `/wellness-guide/category/${category.slug}`),
    ...postCategories.flatMap((category) =>
      Array.from({ length: Math.max(0, pageCount(postsByCategory(category.slug).length) - 1) }, (_, index) => `/wellness-guide/category/${category.slug}/page/${index + 2}`)
    ),
    ...Array.from({ length: Math.max(0, pageCount(posts.length) - 1) }, (_, index) => `/wellness-guide/page/${index + 2}`),
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
