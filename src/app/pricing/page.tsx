import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { PricingTable } from "@/components/PricingTable";
import { Card } from "@/components/ui/card";
import { pricingBlocks } from "@/data/pageContent";

export const metadata: Metadata = {
  title: "출장마사지 요금 안내 | 시간별 가격과 출장비",
  description: "60분, 90분, 120분 출장마사지 요금과 심야 비용, 지역 출장비, 취소·환불 기준을 투명하게 안내합니다.",
  alternates: { canonical: "/pricing" }
};

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "요금 안내", href: "/pricing" }]} />
      <section className="section">
        <div className="container">
          <h1 className="text-4xl font-bold">출장마사지 요금 안내</h1>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">출장비, 심야 시간 추가 비용, 주차비 발생 가능성은 예약 전 명확히 고지합니다.</p>
          <div className="mt-10 overflow-x-auto"><PricingTable /></div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Card><h2 className="text-xl font-bold">추가 비용 안내</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">심야 시간 추가 비용, 지역별 출장비, 주차비, 예약 변경 수수료가 발생할 수 있습니다.</p></Card>
            <Card><h2 className="text-xl font-bold">포함 사항</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">테라피스트 출장, 기본 위생 준비, 서비스 전 컨디션 확인, 서비스 후 간단 피드백이 포함됩니다.</p></Card>
            <Card><h2 className="text-xl font-bold">미포함 사항</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">의료 진단, 치료 행위, 의약품 제공, 부적절하거나 불법적인 서비스는 포함되지 않습니다.</p></Card>
            <Card><h2 className="text-xl font-bold">환불·취소 기준</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">예약 확정 전 취소는 수수료가 없으며, 당일 취소와 도착 직전 변경은 상담 시 고지된 기준에 따라 처리됩니다.</p></Card>
          </div>
          <div className="mt-10"><ContentBlocks blocks={pricingBlocks} /></div>
        </div>
      </section>
    </>
  );
}
