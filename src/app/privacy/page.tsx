import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { policyBlocks } from "@/data/pageContent";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "예약 상담을 위한 개인정보 수집 항목, 목적, 보관 기간, 제3자 제공 여부, 보호 책임자를 안내합니다.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  const items = ["수집 항목: 이름, 연락처, 방문 지역, 희망 일시, 요청사항", "수집 목적: 예약 가능 여부 확인 및 상담", "보관 기간: 상담 종료 후 관련 법령 또는 내부 기준에 따라 보관 후 파기", "제3자 제공: 원칙적으로 제공하지 않으며 필요한 경우 사전 동의를 받습니다.", "민감정보 수집 금지: 건강 상태 등 민감정보는 필수 수집하지 않습니다.", "쿠키 사용 여부: 서비스 개선과 통계 분석을 위해 사용할 수 있습니다.", "개인정보 보호 책임자: care@twomassage.kr"];
  return (
    <>
      <Breadcrumbs items={[{ label: "개인정보처리방침", href: "/privacy" }]} />
      <section className="section">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold">개인정보처리방침</h1>
          <ul className="mt-8 grid gap-4 leading-8 text-muted-foreground">{items.map((item) => <li key={item}>· {item}</li>)}</ul>
          <div className="mt-10"><ContentBlocks blocks={policyBlocks.privacy} /></div>
        </div>
      </section>
    </>
  );
}
