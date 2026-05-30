import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReviewCard } from "@/components/ReviewCard";
import { Card } from "@/components/ui/card";
import { reviews } from "@/data/reviews";

export const metadata: Metadata = {
  title: "실제 고객 후기",
  description: "실제 예약 고객 후기만 게시하며 허위 후기, 과장 후기, 개인정보 노출을 방지합니다.",
  alternates: { canonical: "/reviews" }
};

export default function ReviewsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "고객 후기", href: "/reviews" }]} />
      <section className="section">
        <div className="container">
          <h1 className="text-4xl font-bold">실제 고객 후기</h1>
          <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">실제 예약 고객 후기만 게시하고, 대가성 후기는 표시하며, 부정 후기를 임의 삭제하지 않습니다.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{reviews.map((review) => <ReviewCard key={`${review.area}-${review.date}`} review={review} />)}</div>
          <Card className="mt-8"><h2 className="text-xl font-bold">후기 운영 원칙</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">허위 후기 금지, 개인정보 노출 방지, 대가성 후기 표시, 부정 후기 임의 삭제 금지를 기준으로 운영합니다.</p></Card>
        </div>
      </section>
    </>
  );
}
