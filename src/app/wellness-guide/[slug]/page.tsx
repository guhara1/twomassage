import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Card } from "@/components/ui/card";
import { authors } from "@/data/authors";
import { posts } from "@/data/posts";
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
  const postFaqs = [
    { q: "이 글은 의료 조언인가요?", a: "아닙니다. 생활 정보 수준의 웰니스 안내이며 통증, 질환, 부상이 있다면 전문가 상담이 우선입니다." },
    { q: "출장마사지 예약 전 가장 중요한 확인사항은 무엇인가요?", a: "서비스 목적, 요금, 출장마사지 가능 지역, 위생·안전 정책, 부적절한 요청 거절 기준을 확인하는 것이 좋습니다." }
  ];

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
          <section className="mt-10">
            <h2 className="text-2xl font-bold">핵심 답변</h2>
            <ul className="mt-4 grid gap-3 leading-8 text-muted-foreground">
              {post.points.map((point) => <li key={point}>· {point}</li>)}
            </ul>
          </section>
          <section className="mt-10">
            <h2 className="text-2xl font-bold">상세 설명</h2>
            <p className="mt-4 leading-8 text-muted-foreground">방문 웰니스 케어는 고객의 공간에서 진행되므로 예약 전 정보 확인이 중요합니다. 서비스 목적과 컨디션을 정확히 공유하면 테라피스트가 무리하지 않는 범위에서 관리 강도를 조절할 수 있습니다.</p>
            <p className="mt-4 leading-8 text-muted-foreground">또한 마사지 전후의 생활 습관도 만족도에 영향을 줍니다. 관리 전에는 과식과 음주를 피하고, 관리 후에는 물을 조금씩 마시며 몸 상태를 확인하는 것이 좋습니다. 관리 직후 바로 과격한 운동이나 장거리 운전을 계획하면 휴식 효과를 충분히 느끼기 어렵습니다.</p>
            <p className="mt-4 leading-8 text-muted-foreground">방문 서비스는 공간의 안전성도 중요합니다. 자택, 숙소, 사무실 모두 이용할 수 있지만 독립된 공간, 환기 가능 여부, 출입 규정, 주차 조건이 맞아야 합니다. 이 정보가 부족하면 예약이 지연되거나 현장에서 진행이 어려울 수 있습니다.</p>
          </section>
          <section className="mt-10">
            <h2 className="text-2xl font-bold">전문가 상담이 필요한 경우</h2>
            <p className="mt-4 leading-8 text-muted-foreground">급성 통증, 고열, 염증, 골절 의심, 수술 직후, 임신 중 불편감, 저림이나 감각 이상처럼 단순 피로로 보기 어려운 상황에서는 방문 웰니스 케어보다 의료 전문가 상담이 우선입니다. 서비스 이용 여부가 애매하다면 예약 전에 고객지원으로 문의하고, 필요한 경우 이용을 미루는 것이 안전합니다.</p>
          </section>
          <section className="mt-10">
            <h2 className="text-2xl font-bold">관련 서비스와 연결하기</h2>
            <p className="mt-4 leading-8 text-muted-foreground">편안한 휴식이 목적이라면 아로마 릴렉스 케어를, 운동 후 근육 피로가 목적이라면 스포츠 근육 케어를, 업무 후 목과 어깨 긴장이 크다면 오피스 피로 케어를 검토할 수 있습니다. 가족이나 커플이 같은 공간에서 순차적으로 이용하려면 커플·가족 출장마사지 케어의 시간과 공간 조건을 먼저 확인하는 것이 좋습니다.</p>
          </section>
          <section className="mt-10 rounded-lg border border-border bg-muted p-6">
            <h2 className="text-2xl font-bold">주의사항</h2>
            <p className="mt-4 leading-8 text-muted-foreground">급성 통증, 염증, 고열, 골절, 수술 직후, 임신, 특정 질환이 있는 경우 서비스 이용 전 의료 전문가와 상담해 주세요. 본 콘텐츠는 치료 보장을 의미하지 않습니다.</p>
          </section>
          <section className="mt-10">
            <h2 className="mb-5 text-2xl font-bold">FAQ</h2>
            <FAQAccordion items={postFaqs} />
          </section>
        </div>
      </article>
    </>
  );
}
