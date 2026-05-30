import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { areas } from "@/data/areas";
import { faqSchema, localBusinessSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: `/areas/${area.slug}` }
  };
}

export default async function AreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  if (!area) notFound();

  return (
    <>
      <JsonLd data={[localBusinessSchema(), serviceSchema(`${area.name} 출장마사지`, area.description, `/areas/${area.slug}`), faqSchema(area.faqs)]} />
      <Breadcrumbs items={[{ label: "출장마사지 가능 지역", href: "/areas" }, { label: area.name, href: `/areas/${area.slug}` }]} />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <h1 className="text-4xl font-bold">{area.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{area.description}</p>
            <div className="mt-8 grid gap-4 text-sm leading-8 text-muted-foreground">
              {area.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Card><h2 className="text-xl font-bold">주요 출장마사지 가능 구역</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{area.zones.join(", ")}</p></Card>
              <Card><h2 className="text-xl font-bold">평균 도착 가능 시간</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{area.arrival}</p></Card>
              <Card><h2 className="text-xl font-bold">지역별 출장비</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{area.fee}</p></Card>
              <Card><h2 className="text-xl font-bold">많이 선택하는 서비스</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{area.popular.join(", ")}</p></Card>
            </div>
            <Card className="mt-6"><h2 className="text-xl font-bold">이용 시 유의사항</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{area.note}</p></Card>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">{area.name}에서 이용 가능한 출장마사지 서비스</h2>
              <div className="mt-5 grid gap-5">
                {area.services.map((service) => (
                  <Card key={service.name}>
                    <h3 className="text-xl font-bold">{service.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.body}</p>
                    <Button href={service.href} variant="secondary" className="mt-5">서비스 보기</Button>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">{area.name} 주요 출장마사지 가능 지역</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-3">
                {area.zoneGroups.map((zone) => (
                  <Card key={zone.title}>
                    <h3 className="text-lg font-bold">{zone.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{zone.body}</p>
                  </Card>
                ))}
              </div>
            </section>

            <div className="mt-12">
              <ContentBlocks
                blocks={[
                  { title: "이용 전 확인해야 할 사항", body: [area.precheck] },
                  { title: `${area.name} 출장마사지 요금 안내`, body: [area.pricing] },
                  { title: "예약 진행 절차", body: [area.booking] },
                  { title: "위생·안전 운영 기준", body: [area.safety] },
                  { title: "실제 후기 운영 원칙", body: [area.review] },
                  { title: `${area.name} 출장마사지 예약 전 안내`, body: [area.closing] }
                ]}
              />
            </div>

            <div className="mt-10"><h2 className="mb-5 text-2xl font-bold">자주 묻는 질문</h2><FAQAccordion items={area.faqs} /></div>
          </div>
          <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
            <p className="text-xl font-bold">{area.name} 예약 가능 시간 확인</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">상세 주소와 희망 시간을 남겨주시면 가능 여부와 추가 비용을 확인해 안내합니다.</p>
            <Button href="/booking" className="mt-5 w-full">예약 문의</Button>
            <div className="mt-5 grid gap-2 text-sm">
              <Button href="/pricing" variant="secondary" className="w-full">요금 안내</Button>
              <Button href="/trust/safety-hygiene" variant="secondary" className="w-full">위생·안전 정책</Button>
              <Button href="/trust/therapist-standards" variant="secondary" className="w-full">테라피스트 검증</Button>
              <Button href="/reviews" variant="secondary" className="w-full">고객 후기</Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
