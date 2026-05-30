import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authors } from "@/data/authors";
import { categorySlug, pageCount, paginatedPosts, POSTS_PER_PAGE } from "@/data/postCategories";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  const totalPages = pageCount(posts.length);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `웰니스 가이드 ${page}페이지`,
    description: "출장마사지 웰니스 가이드의 추가 글 목록입니다. 안전 기준, 지역 매거진, 서비스 선택 정보를 제공합니다.",
    alternates: { canonical: `/wellness-guide/page/${page}` }
  };
}

export default async function WellnessGuidePageNumber({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const currentPage = Number(page);
  const totalPages = pageCount(posts.length);
  if (!Number.isInteger(currentPage) || currentPage < 2 || currentPage > totalPages) notFound();

  const pagePosts = paginatedPosts([...posts].reverse(), currentPage);

  return (
    <>
      <Breadcrumbs items={[{ label: "웰니스 가이드", href: "/wellness-guide" }, { label: `${currentPage}페이지`, href: `/wellness-guide/page/${currentPage}` }]} />
      <section className="section">
        <div className="container">
          <p className="text-sm font-bold text-accent">Magazine</p>
          <h1 className="mt-2 text-4xl font-bold">웰니스 가이드 {currentPage}페이지</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">페이지당 {POSTS_PER_PAGE}개 글만 노출해 가독성과 크롤링 효율을 유지합니다.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pagePosts.map((post) => {
              const author = authors.find((item) => item.slug === post.author);
              return (
                <Card key={post.slug}>
                  <Button href={`/wellness-guide/category/${categorySlug(post.category)}`} variant="ghost" className="h-auto px-0 py-0 text-sm font-bold text-accent hover:bg-transparent">{post.category}</Button>
                  <h2 className="mt-3 text-xl font-bold">{post.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.summary}</p>
                  <p className="mt-4 text-xs text-muted-foreground">작성자 {author?.name} · 업데이트 {post.updatedAt}</p>
                  <Button href={`/wellness-guide/${post.slug}`} variant="outline" className="mt-5">글 읽기</Button>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <Button href="/wellness-guide" variant={currentPage === 1 ? "secondary" : "outline"}>1</Button>
            {Array.from({ length: totalPages - 1 }, (_, index) => index + 2).map((item) => (
              <Button key={item} href={`/wellness-guide/page/${item}`} variant={item === currentPage ? "secondary" : "outline"}>{item}</Button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
