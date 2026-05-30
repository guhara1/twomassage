import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { areas } from "@/data/areas";
import { areaListBlocks } from "@/data/pageContent";

export const metadata: Metadata = {
  title: "출장마사지 가능 지역 | 서울 경기·인천 부산 안내",
  description: "강남, 송파, 마포, 수원, 용인, 성남, 인천, 부산 출장마사지 가능 시간과 준비사항을 안내합니다.",
  alternates: { canonical: "/areas" }
};

export default function AreasPage() {
  const areaGroups = [
    { title: "서울", slugs: ["gangnam", "songpa", "mapo"] },
    { title: "경기·인천", slugs: ["suwon", "yongin", "seongnam", "incheon"] },
    { title: "부산", slugs: ["busan"] }
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: "출장마사지 가능 지역", href: "/areas" }]} />
      <section className="section">
        <div className="container">
          <h1 className="text-4xl font-bold">출장마사지 가능 지역</h1>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">지역 페이지는 실제 서비스 가능한 곳만 운영합니다. 각 지역의 출입 조건, 평균 도착 시간, 출장비를 고유하게 안내합니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/pricing" variant="outline">출장마사지 요금 안내</Button>
            <Button href="/booking">예약 가능 시간 확인</Button>
          </div>
          <div className="mt-10 grid gap-10">
            {areaGroups.map((group) => (
              <section key={group.title}>
                <div className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-3">
                  <div>
                    <p className="text-sm font-bold text-accent">Area</p>
                    <h2 className="mt-1 text-2xl font-bold">{group.title}</h2>
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  {group.slugs.map((slug) => {
                    const area = areas.find((item) => item.slug === slug);
                    if (!area) return null;
                    return (
                      <Card key={area.slug} className="transition hover:-translate-y-0.5 hover:border-[#c8ad72] hover:shadow-lg">
                        <h3 className="text-2xl font-bold">{area.name} 출장마사지</h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.description}</p>
                        <dl className="mt-5 grid gap-2 text-sm">
                          <div>평균 도착: {area.arrival}</div>
                          <div>출장비: {area.fee}</div>
                        </dl>
                        <Button href={`/areas/${area.slug}`} className="mt-5">자세히 보기</Button>
                      </Card>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
          <div className="mt-10"><ContentBlocks blocks={areaListBlocks} /></div>
        </div>
      </section>
    </>
  );
}
