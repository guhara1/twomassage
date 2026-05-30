import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { Card } from "@/components/ui/card";
import { trustBlocks } from "@/data/pageContent";

export const metadata: Metadata = {
  title: "테라피스트 검증 기준",
  description: "경력 확인, 서비스 교육, 위생 교육, 고객 응대 교육, 안전 정책 동의 기준을 안내합니다.",
  alternates: { canonical: "/trust/therapist-standards" }
};

export default function TherapistStandardsPage() {
  const items = ["경력 확인", "서비스 교육", "위생 교육", "고객 응대 교육", "안전 정책 동의", "후기 기반 품질 관리", "문제 발생 시 재배정 또는 이용 제한 기준"];
  return (
    <>
      <Breadcrumbs items={[{ label: "신뢰센터", href: "/about" }, { label: "테라피스트 검증 기준", href: "/trust/therapist-standards" }]} />
      <section className="section">
        <div className="container">
          <h1 className="text-4xl font-bold">테라피스트 검증 기준</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">전문성, 위생, 안전 동의, 고객 응대 기준을 확인한 테라피스트만 예약에 배정합니다.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{items.map((item) => <Card key={item}><h2 className="text-lg font-bold">{item}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">운영 기준에 따라 확인하고 문제가 반복될 경우 재교육 또는 배정 제한을 적용합니다.</p></Card>)}</div>
          <div className="mt-10"><ContentBlocks blocks={trustBlocks.therapist} /></div>
        </div>
      </section>
    </>
  );
}
