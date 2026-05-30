import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "콘텐츠 작성 및 검수 정책",
  description: "콘텐츠 작성 목적, AI 사용 공개 기준, 전문가 검수, 출처 표기, 업데이트, 후기 검수 정책을 안내합니다.",
  alternates: { canonical: "/editorial-policy" }
};

export default function EditorialPolicyPage() {
  const items = ["콘텐츠 작성 목적", "AI 사용 여부 공개 기준", "전문가 검수 기준", "출처 표기 기준", "업데이트 기준", "오류 제보 방법", "광고·협찬 표기 기준", "후기 검수 정책"];
  return (
    <>
      <Breadcrumbs items={[{ label: "편집 정책", href: "/editorial-policy" }]} />
      <section className="section">
        <div className="container">
          <h1 className="text-4xl font-bold">콘텐츠 작성 및 검수 정책</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">본 사이트의 콘텐츠는 방문 웰니스 서비스 이용자가 안전하고 합리적인 선택을 할 수 있도록 돕기 위해 작성됩니다. 검색 순위 조작을 목적으로 대량 생성된 콘텐츠를 게시하지 않습니다.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-4">{items.map((item) => <Card key={item}><h2 className="text-lg font-bold">{item}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">필요한 경우 전문가 검수 또는 신뢰할 수 있는 자료 확인을 거칩니다.</p></Card>)}</div>
        </div>
      </section>
    </>
  );
}
