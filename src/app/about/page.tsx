import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { Card } from "@/components/ui/card";
import { business } from "@/data/business";
import { aboutBlocks } from "@/data/pageContent";

export const metadata: Metadata = {
  title: "회사 소개 | 방문 웰니스 마사지 운영 원칙",
  description: "투마사지의 합법 운영 원칙, 사업자 정보, 고객지원 연락처, 부적절한 요청 거절 정책을 안내합니다.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "회사 소개", href: "/about" }]} />
      <section className="section">
        <div className="container">
          <h1 className="text-4xl font-bold">투명하게 운영하는 방문 웰니스 케어 서비스</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">투마사지는 고객이 안심하고 예약할 수 있도록 합법성, 위생, 안전, 투명한 요금 안내를 우선합니다.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card><h2 className="text-xl font-bold">브랜드 미션</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">검증된 전문 테라피스트가 고객의 공간으로 방문하는 합법 방문 웰니스 케어 서비스를 제공합니다.</p></Card>
            <Card><h2 className="text-xl font-bold">사업자 정보</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{business.legalName}<br />{business.registration}<br />{business.address}</p></Card>
            <Card><h2 className="text-xl font-bold">고객지원</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{business.phone}<br />{business.email}<br />{business.hours}</p></Card>
            <Card><h2 className="text-xl font-bold">서비스 원칙</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">불법·부적절 요청은 접수하지 않으며 고객과 테라피스트 보호 원칙을 예약 전 안내합니다.</p></Card>
          </div>
          <div className="mt-10"><ContentBlocks blocks={aboutBlocks} /></div>
        </div>
      </section>
    </>
  );
}
