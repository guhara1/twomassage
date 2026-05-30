import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { authors } from "@/data/authors";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = authors.find((item) => item.slug === slug);
  if (!author) return {};
  return {
    title: `${author.name} 작성자 소개`,
    description: `${author.name}의 역할, 경력, 전문 분야, 작성 및 검수 콘텐츠를 안내합니다.`,
    alternates: { canonical: `/authors/${author.slug}` }
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = authors.find((item) => item.slug === slug);
  if (!author) notFound();
  const written = posts.filter((post) => post.author === author.slug);
  const reviewed = posts.filter((post) => post.reviewer === author.slug);

  return (
    <>
      <Breadcrumbs items={[{ label: "작성자", href: `/authors/${author.slug}` }, { label: author.name, href: `/authors/${author.slug}` }]} />
      <section className="section">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold">{author.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{author.role}</p>
          <Card className="mt-8">
            <dl className="grid gap-3 text-sm leading-7 text-muted-foreground">
              <div>경력: {author.career}</div>
              <div>전문 분야: {author.specialty}</div>
              <div>연락 가능 채널: {author.contact}</div>
              <div>최근 업데이트일: {author.updatedAt}</div>
            </dl>
          </Card>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card><h2 className="text-xl font-bold">작성한 글</h2><ul className="mt-4 grid gap-2 text-sm text-muted-foreground">{written.map((post) => <li key={post.slug}>{post.title}</li>)}</ul></Card>
            <Card><h2 className="text-xl font-bold">검수한 글</h2><ul className="mt-4 grid gap-2 text-sm text-muted-foreground">{reviewed.map((post) => <li key={post.slug}>{post.title}</li>)}</ul></Card>
          </div>
        </div>
      </section>
    </>
  );
}
