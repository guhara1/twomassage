import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authors } from "@/data/authors";
import { wellnessGuideBlocks } from "@/data/pageContent";
import { categorySlug, pageCount, paginatedPosts, postCategories, POSTS_PER_PAGE, postsByCategory } from "@/data/postCategories";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "웰니스 가이드",
  description: "마사지 전후 관리, 직장인 피로 관리, 출장마사지 안전 기준을 작성자와 검수자 정보와 함께 제공합니다.",
  alternates: { canonical: "/wellness-guide" }
};

export default function WellnessGuidePage() {
  const featuredPosts = posts.slice(-3).reverse();
  const latestPosts = paginatedPosts([...posts].reverse(), 1);
  const totalPages = pageCount(posts.length);

  return (
    <>
      <Breadcrumbs items={[{ label: "웰니스 가이드", href: "/wellness-guide" }]} />
      <section className="section">
        <div className="container">
          <h1 className="text-4xl font-bold">웰니스 가이드</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">검색 순위 조작을 위한 대량 콘텐츠가 아니라, 출장마사지 웰니스 서비스를 안전하게 이용하기 위한 생활 정보와 주의사항을 제공합니다.</p>

          <section className="mt-10 rounded-lg bg-[#12392f] p-6 text-white md:p-8">
            <p className="text-sm font-bold text-[#e9d8a6]">Featured</p>
            <h2 className="mt-2 text-3xl font-bold">최근 보강한 매거진 글</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {featuredPosts.map((post) => (
                <Card key={post.slug} className="border-white/15 bg-white/10 text-white shadow-none">
                  <p className="text-sm font-bold text-[#e9d8a6]">{post.category}</p>
                  <h3 className="mt-3 text-xl font-bold">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/75">{post.summary}</p>
                  <Button href={`/wellness-guide/${post.slug}`} variant="secondary" className="mt-5">글 읽기</Button>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold text-accent">Categories</p>
                <h2 className="mt-2 text-3xl font-bold">주제별 허브</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {postCategories.map((category) => {
                const count = postsByCategory(category.slug).length;
                return (
                  <Card key={category.slug}>
                    <p className="text-sm font-bold text-accent">{count}개 글</p>
                    <h3 className="mt-3 text-xl font-bold">{category.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{category.description}</p>
                    <Button href={`/wellness-guide/category/${category.slug}`} variant="outline" className="mt-5">카테고리 보기</Button>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="mt-12">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold text-accent">Latest</p>
                <h2 className="mt-2 text-3xl font-bold">최신 글</h2>
              </div>
              <p className="text-sm text-muted-foreground">페이지당 {POSTS_PER_PAGE}개 · 전체 {posts.length}개</p>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {latestPosts.map((post) => {
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
            {totalPages > 1 ? (
              <div className="mt-8 flex flex-wrap gap-2">
                <Button href="/wellness-guide" variant="secondary">1</Button>
                {Array.from({ length: totalPages - 1 }, (_, index) => index + 2).map((page) => (
                  <Button key={page} href={`/wellness-guide/page/${page}`} variant="outline">{page}</Button>
                ))}
              </div>
            ) : null}
          </section>

          <div className="mt-10"><ContentBlocks blocks={wellnessGuideBlocks} /></div>
        </div>
      </section>
    </>
  );
}
