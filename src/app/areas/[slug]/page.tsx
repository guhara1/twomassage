import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { areas } from "@/data/areas";
import { localBusinessSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  if (!area) return {};
  return {
    title: `${area.name} 출장마사지 | 예약제 웰니스 홈케어`,
    description: `${area.name} 지역의 출장마사지 가능 시간, 출장비, 준비사항, 많이 선택하는 서비스를 안내합니다.`,
    alternates: { canonical: `/areas/${area.slug}` }
  };
}

export default async function AreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  if (!area) notFound();
  const faqs = [
    { q: `${area.name} 오피스텔도 출장마사지 이용이 가능한가요?`, a: "건물 출입 규정과 주차 가능 여부에 따라 달라질 수 있습니다. 예약 전 상세 주소 확인 후 안내드립니다." },
    { q: "심야 예약도 가능한가요?", a: "운영 시간 내 가능 여부를 확인해 안내합니다. 심야 추가 비용이 있다면 예약 전 명확히 고지합니다." },
    { q: "부적절한 요청을 하면 어떻게 되나요?", a: "건전한 웰니스 목적 외 요청은 접수되지 않으며, 현장에서도 서비스가 중단될 수 있습니다." }
  ];

  return (
    <>
      <JsonLd data={[localBusinessSchema(), serviceSchema(`${area.name} 출장마사지`, area.description, `/areas/${area.slug}`)]} />
      <Breadcrumbs items={[{ label: "출장마사지 가능 지역", href: "/areas" }, { label: area.name, href: `/areas/${area.slug}` }]} />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <h1 className="text-4xl font-bold">{area.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{area.description}</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Card><h2 className="text-xl font-bold">주요 출장마사지 가능 구역</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{area.zones.join(", ")}</p></Card>
              <Card><h2 className="text-xl font-bold">평균 도착 가능 시간</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{area.arrival}</p></Card>
              <Card><h2 className="text-xl font-bold">지역별 출장비</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{area.fee}</p></Card>
              <Card><h2 className="text-xl font-bold">많이 선택하는 서비스</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{area.popular.join(", ")}</p></Card>
            </div>
            <Card className="mt-6"><h2 className="text-xl font-bold">이용 시 유의사항</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{area.note}</p></Card>
            <div className="mt-10"><ContentBlocks blocks={area.detailBlocks} /></div>
            <div className="mt-10"><h2 className="mb-5 text-2xl font-bold">지역 FAQ</h2><FAQAccordion items={faqs} /></div>
          </div>
          <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
            <p className="text-xl font-bold">{area.name} 예약 가능 시간 확인</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">상세 주소와 희망 시간을 남겨주시면 가능 여부와 추가 비용을 확인해 안내합니다.</p>
            <Button href="/booking" className="mt-5 w-full">예약 문의</Button>
          </aside>
        </div>
      </section>
    </>
  );
}
