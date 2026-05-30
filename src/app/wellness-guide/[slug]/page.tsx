import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { areas } from "@/data/areas";
import { authors } from "@/data/authors";
import { categorySlug } from "@/data/postCategories";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import { articleSchema } from "@/lib/schema";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/wellness-guide/${post.slug}` }
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const author = authors.find((item) => item.slug === post.author);
  const reviewer = authors.find((item) => item.slug === post.reviewer);
  const sameCategoryPosts = posts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);
  const relatedPosts = sameCategoryPosts.length ? sameCategoryPosts : posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const matchedAreas = areas.filter((area) => post.title.includes(area.name) || post.summary.includes(area.name)).slice(0, 3);
  const relatedAreas = matchedAreas.length ? matchedAreas : areas.slice(0, 3);
  const matchedServices = services.filter((service) => post.title.includes(service.name.split(" ")[0]) || post.summary.includes(service.name.split(" ")[0])).slice(0, 3);
  const relatedServices = matchedServices.length ? matchedServices : services.slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema({ ...post, authorName: author?.name ?? "투마사지 편집팀" })} />
      <Breadcrumbs items={[{ label: "웰니스 가이드", href: "/wellness-guide" }, { label: post.title, href: `/wellness-guide/${post.slug}` }]} />
      <article className="section">
        <div className="container max-w-3xl">
          <p className="text-sm font-bold text-accent">{post.category}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{post.summary}</p>

          <Card className="mt-8">
            <dl className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
              <div>작성자: <Link className="font-semibold text-foreground" href={`/authors/${author?.slug}`}>{author?.name}</Link></div>
              <div>검수자: <Link className="font-semibold text-foreground" href={`/authors/${reviewer?.slug}`}>{reviewer?.name}</Link></div>
              <div>작성일: {post.createdAt}</div>
              <div>업데이트일: {post.updatedAt}</div>
            </dl>
          </Card>

          <Card className="mt-6 border-primary/25 bg-[#f7f2e8]">
            <h2 className="text-xl font-bold">작성 기준과 현장 메모</h2>
            <p className="mt-3 text-sm leading-8 text-muted-foreground">{post.experienceNote}</p>
            <p className="mt-3 text-sm leading-8 text-muted-foreground">
              이 글은 고객 상담에서 반복된 질문과 운영 체크리스트를 바탕으로 작성했으며, 건강 관련 내용은 생활 정보 수준으로 제한했습니다. 질병 진단이나 치료를 목적으로 하지 않습니다.
            </p>
          </Card>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">핵심 답변</h2>
            <ul className="mt-4 grid gap-3 leading-8 text-muted-foreground">
              {post.points.map((point) => <li key={point}>· {point}</li>)}
            </ul>
          </section>

          {post.sections.map((section) => (
            <section className="mt-10" key={section.heading}>
              <h2 className="text-2xl font-bold">{section.heading}</h2>
              <div className="mt-4 grid gap-4 leading-8 text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-10 rounded-lg border border-border bg-muted p-6">
            <h2 className="text-2xl font-bold">주의사항</h2>
            <ul className="mt-4 grid gap-3 leading-8 text-muted-foreground">
              {post.cautions.map((caution) => <li key={caution}>· {caution}</li>)}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">Who, How, Why</h2>
            <div className="mt-4 grid gap-4 text-sm leading-8 text-muted-foreground">
              <p><strong className="text-foreground">Who:</strong> {author?.name}이 작성하고 {reviewer?.name}이 서비스 정책과 안전 표현을 검수했습니다.</p>
              <p><strong className="text-foreground">How:</strong> 실제 예약 상담에서 반복된 질문, 서비스 운영 체크리스트, 고객 안전 정책을 바탕으로 정리했습니다.</p>
              <p><strong className="text-foreground">Why:</strong> 검색 유입보다 처음 이용하는 고객이 안전하게 판단할 수 있는 정보를 제공하기 위해 작성했습니다.</p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="mb-5 text-2xl font-bold">FAQ</h2>
            <FAQAccordion items={post.faqs} />
          </section>

          <section className="mt-10">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold text-accent">Related</p>
                <h2 className="mt-2 text-2xl font-bold">함께 읽으면 좋은 글</h2>
              </div>
              <Button href={`/wellness-guide/category/${categorySlug(post.category)}`} variant="outline">{post.category} 더 보기</Button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedPosts.map((item) => (
                <Card key={item.slug}>
                  <p className="text-sm font-bold text-accent">{item.category}</p>
                  <h3 className="mt-3 font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.summary}</p>
                  <Button href={`/wellness-guide/${item.slug}`} variant="ghost" className="mt-4 px-0">읽기</Button>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-5 md:grid-cols-2">
            <Card>
              <h2 className="text-2xl font-bold">관련 서비스</h2>
              <div className="mt-4 grid gap-2">
                {relatedServices.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-md border border-border px-3 py-2 text-sm font-semibold hover:bg-muted">
                    {service.name}
                  </Link>
                ))}
              </div>
            </Card>
            <Card>
              <h2 className="text-2xl font-bold">관련 지역</h2>
              <div className="mt-4 grid gap-2">
                {relatedAreas.map((area) => (
                  <Link key={area.slug} href={`/areas/${area.slug}`} className="rounded-md border border-border px-3 py-2 text-sm font-semibold hover:bg-muted">
                    {area.name} 출장마사지
                  </Link>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </article>
    </>
  );
}
