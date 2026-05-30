import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/data/faqs";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "방문 마사지 합법성, 이용 공간, 준비사항, 테라피스트 지정, 후기 관리 기준을 안내합니다.",
  alternates: { canonical: "/faq" }
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
      <section className="section">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold">자주 묻는 질문</h1>
          <div className="mt-10"><FAQAccordion /></div>
        </div>
      </section>
    </>
  );
}
