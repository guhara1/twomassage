import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { policyBlocks } from "@/data/pageContent";

export const metadata: Metadata = {
  title: "이용약관",
  description: "서비스 정의, 예약 절차, 결제 및 취소, 고객 의무, 테라피스트 보호 정책, 부적절한 요청 금지 기준을 안내합니다.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  const items = ["서비스 정의: 건전한 웰니스 목적의 출장마사지 홈케어", "예약 절차: 신청, 가능 여부 확인, 예약 확정 순서로 진행", "결제 및 취소: 예약 전 고지된 기준을 따릅니다.", "고객 의무: 안전한 공간 제공, 정확한 정보 제공, 부적절한 요청 금지", "테라피스트 보호 정책: 위협, 불법 요청, 현장 위험이 확인되면 서비스가 중단될 수 있습니다.", "미포함 서비스: 의료 진단, 치료 행위, 의약품 제공, 불법·부적절 서비스", "면책 조항: 고객이 고지하지 않은 건강 상태나 현장 환경으로 인한 문제는 제한적으로 책임집니다.", "분쟁 해결: 고객지원 채널을 통해 접수 후 관련 법령과 운영 기준에 따라 처리합니다."];
  return (
    <>
      <Breadcrumbs items={[{ label: "이용약관", href: "/terms" }]} />
      <section className="section">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold">이용약관</h1>
          <ul className="mt-8 grid gap-4 leading-8 text-muted-foreground">{items.map((item) => <li key={item}>· {item}</li>)}</ul>
          <div className="mt-10"><ContentBlocks blocks={policyBlocks.terms} /></div>
        </div>
      </section>
    </>
  );
}
