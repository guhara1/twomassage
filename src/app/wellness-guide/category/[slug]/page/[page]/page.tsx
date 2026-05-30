import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authors } from "@/data/authors";
import { categoryBySlug, pageCount, paginatedPosts, postCategories, postsByCategory, POSTS_PER_PAGE } from "@/data/postCategories";

export function generateStaticParams() {
  return postCategories.flatMap((category) => {
    const totalPages = pageCount(postsByCategory(category.slug).length);
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
      slug: category.slug,
      page: String(index + 2)
    }));
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; page: string }> }): Promise<Metadata> {
  const { slug, page } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} ${page}페이지 | 웰니스 가이드`,
    description: `${category.name} 카테고리의 추가 글 목록입니다. ${category.description}`,
    alternates: { canonical: `/wellness-guide/category/${category.slug}/page/${page}` }
  };
}

export default async function WellnessGuideCategoryPageNumber({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();
  const currentPage = Number(page);
  const categoryPosts = postsByCategory(category.slug);
  const totalPages = pageCount(categoryPosts.length);
  if (!Number.isInteger(currentPage) || currentPage < 2 || currentPage > totalPages) notFound();
  const visiblePosts = paginatedPosts(categoryPosts, currentPage);

  return (
    <>
      <Breadcrumbs items={[{ label: "웰니스 가이드", href: "/wellness-guide" }, { label: category.name, href: `/wellness-guide/category/${category.slug}` }, { label: `${currentPage}페이지`, href: `/wellness-guide/category/${category.slug}/page/${currentPage}` }]} />
      <section className="section">
        <div className="container">
          <p className="text-sm font-bold text-accent">Category</p>
          <h1 className="mt-2 text-4xl font-bold">{category.name} {currentPage}페이지</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">페이지당 {POSTS_PER_PAGE}개 글만 노출해 카테고리 허브의 가독성을 유지합니다.</p>

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

          <div className="mt-8 flex flex-wrap gap-2">
            <Button href={`/wellness-guide/category/${category.slug}`} variant={currentPage === 1 ? "secondary" : "outline"}>1</Button>
            {Array.from({ length: totalPages - 1 }, (_, index) => index + 2).map((item) => (
              <Button key={item} href={`/wellness-guide/category/${category.slug}/page/${item}`} variant={item === currentPage ? "secondary" : "outline"}>{item}</Button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
