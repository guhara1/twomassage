import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services } from "@/data/services";
import { faqSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: service.name.includes("아로마") ? "아로마 방문 마사지 | 릴렉스 홈케어 예약" : service.name.includes("스포츠") ? "스포츠 방문 마사지 | 근육 피로 케어" : service.name.includes("오피스") ? "직장인 방문 마사지 | 오피스 피로 케어" : "가족·커플 방문 마사지 | 예약제 홈케어",
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` }
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const pageFaqs = [
    { q: "서비스 전 준비사항은 무엇인가요?", a: "환기 가능한 독립 공간과 수건을 준비해 주세요. 상세 준비사항은 예약 확인 시 안내합니다." },
    { q: "압 강도 조절이 가능한가요?", a: "가능합니다. 서비스 전후로 컨디션과 선호 강도를 확인합니다." },
    { q: "의료 치료 서비스인가요?", a: "아닙니다. 본 서비스는 질병 진단이나 치료를 목적으로 하지 않는 웰니스 케어입니다." }
  ];

  return (
    <>
      <JsonLd data={[serviceSchema(service.name, service.description, `/services/${service.slug}`), faqSchema(pageFaqs)]} />
      <Breadcrumbs items={[{ label: "서비스", href: "/services" }, { label: service.name, href: `/services/${service.slug}` }]} />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <h1 className="text-4xl font-bold">{service.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{service.description}</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Card><h2 className="text-xl font-bold">누구에게 적합한가</h2><ul className="mt-4 grid gap-2 text-sm text-muted-foreground">{service.suitable.map((item) => <li key={item}>· {item}</li>)}</ul></Card>
              <Card><h2 className="text-xl font-bold">관리 목적</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{service.purpose}</p></Card>
              <Card><h2 className="text-xl font-bold">진행 방식</h2><ul className="mt-4 grid gap-2 text-sm text-muted-foreground">{service.process.map((item) => <li key={item}>· {item}</li>)}</ul></Card>
              <Card><h2 className="text-xl font-bold">가격</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{service.price}<br />출장비와 심야 요금은 예약 전 별도 고지합니다.</p></Card>
            </div>
            <Card className="mt-6 border-primary/30 bg-[#f7f2e8]"><h2 className="text-xl font-bold">주의사항</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{service.caution}</p></Card>
            <div className="mt-10"><h2 className="mb-5 text-2xl font-bold">자주 묻는 질문</h2><FAQAccordion items={pageFaqs} /></div>
          </div>
          <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
            <p className="text-xl font-bold">예약 상담</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">예약 신청 후 가능 시간과 지역을 확인해 연락드립니다. 부적절한 요청은 접수되지 않습니다.</p>
            <Button href="/booking" className="mt-5 w-full">예약하기</Button>
            <Button href="/pricing" variant="outline" className="mt-3 w-full">요금 확인</Button>
          </aside>
        </div>
      </section>
    </>
  );
}
