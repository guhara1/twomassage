import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "예약 신청 접수",
  description: "예약 신청이 접수되었습니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/booking/complete" }
};

export default function BookingCompletePage() {
  return (
    <section className="section">
      <div className="container max-w-2xl rounded-lg border border-border bg-card p-8 text-center">
        <h1 className="text-3xl font-bold">예약 신청이 접수되었습니다.</h1>
        <p className="mt-4 leading-8 text-muted-foreground">담당자가 가능 시간과 세부 내용을 확인한 뒤 연락드리겠습니다.</p>
        <Button href="/" className="mt-6">홈으로 이동</Button>
      </div>
    </section>
  );
}
