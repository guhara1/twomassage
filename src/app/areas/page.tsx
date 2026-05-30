import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { areas } from "@/data/areas";
import { areaListBlocks } from "@/data/pageContent";

export const metadata: Metadata = {
  title: "방문 가능 지역 | 서울 방문 마사지 안내",
  description: "강남, 송파, 마포 등 실제 방문 가능한 지역의 도착 시간, 출장비, 준비사항을 안내합니다.",
  alternates: { canonical: "/areas" }
};

export default function AreasPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "방문 가능 지역", href: "/areas" }]} />
      <section className="section">
        <div className="container">
          <h1 className="text-4xl font-bold">방문 가능 지역</h1>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">지역 페이지는 실제 서비스 가능한 곳만 운영합니다. 각 지역의 출입 조건, 평균 도착 시간, 출장비를 고유하게 안내합니다.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {areas.map((area) => (
              <Card key={area.slug}>
                <h2 className="text-2xl font-bold">{area.name} 방문 마사지</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.description}</p>
                <dl className="mt-5 grid gap-2 text-sm">
                  <div>평균 도착: {area.arrival}</div>
                  <div>출장비: {area.fee}</div>
                </dl>
                <Button href={`/areas/${area.slug}`} className="mt-5">자세히 보기</Button>
              </Card>
            ))}
          </div>
          <div className="mt-10"><ContentBlocks blocks={areaListBlocks} /></div>
        </div>
      </section>
    </>
  );
}
