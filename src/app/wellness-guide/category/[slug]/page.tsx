import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authors } from "@/data/authors";
import { categoryBySlug, pageCount, paginatedPosts, postCategories, postsByCategory, POSTS_PER_PAGE } from "@/data/postCategories";

export function generateStaticParams() {
  return postCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} | 웰니스 가이드`,
    description: category.description,
    alternates: { canonical: `/wellness-guide/category/${category.slug}` }
  };
}

export default async function WellnessGuideCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();
  const categoryPosts = postsByCategory(category.slug);
  const visiblePosts = paginatedPosts(categoryPosts, 1);
  const totalPages = pageCount(categoryPosts.length);

  return (
    <>
      <Breadcrumbs items={[{ label: "웰니스 가이드", href: "/wellness-guide" }, { label: category.name, href: `/wellness-guide/category/${category.slug}` }]} />
      <section className="section">
        <div className="container">
          <p className="text-sm font-bold text-accent">Category</p>
          <h1 className="mt-2 text-4xl font-bold">{category.name}</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">{category.description}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {postCategories.map((item) => (
              <Button key={item.slug} href={`/wellness-guide/category/${item.slug}`} variant={item.slug === category.slug ? "secondary" : "outline"}>
                {item.name}
              </Button>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">페이지당 {POSTS_PER_PAGE}개 · 이 카테고리 {categoryPosts.length}개 글</p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {visiblePosts.map((post) => {
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

          {totalPages > 1 ? (
            <div className="mt-8 flex flex-wrap gap-2">
              <Button href={`/wellness-guide/category/${category.slug}`} variant="secondary">1</Button>
              {Array.from({ length: totalPages - 1 }, (_, index) => index + 2).map((page) => (
                <Button key={page} href={`/wellness-guide/category/${category.slug}/page/${page}`} variant="outline">{page}</Button>
              ))}
            </div>
          ) : null}

          <div className="mt-10 rounded-lg border border-border bg-muted p-6">
            <h2 className="text-2xl font-bold">이 카테고리의 운영 기준</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              이 허브는 같은 주제의 글을 묶어 독자가 다음 글을 자연스럽게 탐색하도록 돕습니다. 검색 순위 조작을 위한 얇은 태그 페이지가 아니라, 작성자와 검수 기준이 있는 정보성 콘텐츠만 연결합니다.
            </p>
            <Button href="/wellness-guide" variant="outline" className="mt-5">전체 가이드 보기</Button>
          </div>
        </div>
      </section>
    </>
  );
}
