import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { bookingBlocks } from "@/data/pageContent";

export const metadata: Metadata = {
  title: "방문 마사지 예약하기 | 지역·시간 선택",
  description: "방문 지역, 희망 시간, 서비스 종류를 선택해 예약 상담을 신청하세요. 건전한 웰니스 서비스만 접수합니다.",
  alternates: { canonical: "/booking" }
};

export default function BookingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "예약하기", href: "/booking" }]} />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h1 className="text-4xl font-bold">방문 마사지 예약하기</h1>
            <p className="mt-5 leading-8 text-muted-foreground">예약 신청 후 상담원이 가능 시간과 지역을 확인해 연락드립니다. 테라피스트와 고객 모두의 안전을 위해 부적절한 요청은 접수되지 않습니다.</p>
          </div>
          <BookingForm />
        </div>
      </section>
      <section className="section bg-muted">
        <div className="container">
          <ContentBlocks blocks={bookingBlocks} />
        </div>
      </section>
    </>
  );
}
