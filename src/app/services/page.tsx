import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceCard } from "@/components/ServiceCard";
import { PricingTable } from "@/components/PricingTable";
import { SectionHeading } from "@/components/SectionHeading";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "방문 웰니스 마사지 서비스",
  description: "아로마 릴렉스, 스포츠 근육, 오피스 피로, 커플·가족 방문 케어를 비교하고 예약 전 주의사항을 확인하세요.",
  alternates: { canonical: "/services" }
};

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "서비스", href: "/services" }]} />
      <section className="section">
        <div className="container">
          <h1 className="text-4xl font-bold">방문 웰니스 마사지 서비스</h1>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">건전한 웰니스 목적의 서비스만 제공하며, 각 서비스는 대상과 관리 목적, 주의사항을 명확히 구분합니다.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-4">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
        </div>
      </section>
      <section id="compare" className="section bg-muted">
        <div className="container">
          <SectionHeading title="서비스 비교표" description="기본 요금은 예약 시간, 지역, 심야 여부에 따라 달라질 수 있습니다." />
          <div className="overflow-x-auto"><PricingTable /></div>
        </div>
      </section>
    </>
  );
}
