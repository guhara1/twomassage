import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "문의하기",
  description: "예약, 요금, 지역, 위생·안전 정책에 대한 상담 채널을 안내합니다.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "문의하기", href: "/contact" }]} />
      <section className="section">
        <div className="container grid gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold">문의하기</h1>
            <p className="mt-5 leading-8 text-muted-foreground">예약 가능 지역, 요금, 준비사항, 위생·안전 정책이 궁금하다면 상담 채널로 문의해 주세요.</p>
          </div>
          <Card>
            <h2 className="text-xl font-bold">고객지원</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{business.phone}<br />{business.email}<br />{business.hours}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={`tel:${business.phone}`}>전화 상담</Button>
              <Button href={business.kakao} variant="outline">카카오 상담</Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
