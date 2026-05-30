import { business } from "@/data/business";
import { absoluteUrl } from "./utils";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.legalName,
    url: absoluteUrl("/"),
    telephone: business.phone,
    email: business.email,
    address: business.address
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: absoluteUrl("/"),
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressCountry: "KR"
    },
    areaServed: ["강남", "수원", "인천", "용인", "부산", "성남"],
    priceRange: "90000 KRW-165000 KRW"
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: absoluteUrl("/")
  };
}

export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: business.legalName,
      url: absoluteUrl("/")
    },
    areaServed: ["강남", "수원", "인천", "용인", "부산", "성남"],
    url: absoluteUrl(url)
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };
}

export function articleSchema(post: {
  title: string;
  summary: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.authorName
    },
    publisher: {
      "@type": "Organization",
      name: business.legalName
    },
    url: absoluteUrl(`/wellness-guide/${post.slug}`)
  };
}
