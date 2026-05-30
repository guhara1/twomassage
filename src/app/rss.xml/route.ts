import { posts } from "@/data/posts";
import { lastModified, xmlEscape } from "@/lib/seoRoutes";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export function GET() {
  const latestPosts = [...posts]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 50);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>투마사지 웰니스 가이드</title>
    <link>${xmlEscape(absoluteUrl("/wellness-guide"))}</link>
    <atom:link href="${xmlEscape(absoluteUrl("/rss.xml"))}" rel="self" type="application/rss+xml" />
    <description>출장마사지 이용 가이드, 지역별 예약 전 확인사항, 위생·안전 기준을 안내합니다.</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date(lastModified).toUTCString()}</lastBuildDate>
${latestPosts
  .map((post) => {
    const url = absoluteUrl(`/wellness-guide/${post.slug}`);
    return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
      <description>${xmlEscape(post.summary)}</description>
      <category>${xmlEscape(post.category)}</category>
      <pubDate>${new Date(post.updatedAt).toUTCString()}</pubDate>
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8"
    }
  });
}
