import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authors } from "@/data/authors";
import { wellnessGuideBlocks } from "@/data/pageContent";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "웰니스 가이드",
  description: "마사지 전후 관리, 직장인 피로 관리, 출장마사지 안전 기준을 작성자와 검수자 정보와 함께 제공합니다.",
  alternates: { canonical: "/wellness-guide" }
};

export default function WellnessGuidePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "웰니스 가이드", href: "/wellness-guide" }]} />
      <section className="section">
        <div className="container">
          <h1 className="text-4xl font-bold">웰니스 가이드</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">검색 순위 조작을 위한 대량 콘텐츠가 아니라, 방문 웰니스 서비스를 안전하게 이용하기 위한 생활 정보와 주의사항을 제공합니다.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {posts.map((post) => {
              const author = authors.find((item) => item.slug === post.author);
              return (
                <Card key={post.slug}>
                  <p className="text-sm font-bold text-accent">{post.category}</p>
                  <h2 className="mt-3 text-xl font-bold">{post.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.summary}</p>
                  <p className="mt-4 text-xs text-muted-foreground">작성자 {author?.name} · 업데이트 {post.updatedAt}</p>
                  <Button href={`/wellness-guide/${post.slug}`} variant="outline" className="mt-5">글 읽기</Button>
                </Card>
              );
            })}
          </div>
          <div className="mt-10"><ContentBlocks blocks={wellnessGuideBlocks} /></div>
        </div>
      </section>
    </>
  );
}
