import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "위생과 안전을 우선하는 방문 케어 정책",
  description: "손 위생, 도구 관리, 예약 정보 확인, 부적절한 요청 거절, 개인정보 보호 기준을 안내합니다.",
  alternates: { canonical: "/trust/safety-hygiene" }
};

export default function SafetyHygienePage() {
  const items = ["손 위생", "도구 관리", "예약 정보 확인", "고객 컨디션 사전 확인", "부적절한 요청 거절", "테라피스트 보호", "고객 개인정보 보호", "긴급 상황 대응 기준"];
  return (
    <>
      <Breadcrumbs items={[{ label: "신뢰센터", href: "/about" }, { label: "위생·안전 정책", href: "/trust/safety-hygiene" }]} />
      <section className="section">
        <div className="container">
          <h1 className="text-4xl font-bold">위생과 안전을 우선하는 방문 케어 정책</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">건전한 웰니스 서비스 운영을 위해 예약 전후 확인 절차와 현장 중단 기준을 공개합니다.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-4">{items.map((item) => <Card key={item}><h2 className="text-lg font-bold">{item}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">예약 단계와 현장 운영 단계에서 체크리스트로 관리합니다.</p></Card>)}</div>
        </div>
      </section>
    </>
  );
}
