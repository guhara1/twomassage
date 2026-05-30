import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { ContentBlocks } from "@/components/ContentBlocks";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/JsonLd";
import { PricingTable } from "@/components/PricingTable";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { areas } from "@/data/areas";
import { posts } from "@/data/posts";
import { reviews } from "@/data/reviews";
import { services } from "@/data/services";
import { homeBlocks } from "@/data/pageContent";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "출장마사지 예약 | 전문 테라피스트 웰니스 홈케어",
  description: "검증된 전문 테라피스트가 고객님의 공간으로 찾아가는 합법 출장마사지 웰니스 서비스입니다. 요금, 지역, 위생 정책, 예약 절차를 투명하게 안내합니다.",
  alternates: { canonical: "/" }
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={serviceSchema("출장마사지 웰니스 케어", "전문 테라피스트가 고객 공간으로 찾아가는 합법 웰니스 홈케어 서비스", "/")} />
      <section className="relative overflow-hidden bg-[#12392f] text-white">
        <div className="container grid min-h-[620px] items-center gap-10 py-16 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex rounded-md bg-white/10 px-3 py-1 text-sm font-semibold text-[#e9d8a6]">합법 출장마사지 웰니스 케어</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">전문 테라피스트가 찾아가는 출장마사지 홈케어</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">피로가 쌓인 하루, 고객님의 공간에서 편안하게 관리받으세요. 예약제 출장마사지 서비스로, 테라피스트 검증·위생 관리·요금 안내를 투명하게 운영합니다.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/booking" variant="secondary">지금 예약하기</Button>
              <Button href="/pricing" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/15">요금 확인하기</Button>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80"
                alt="깨끗하게 정돈된 수건과 아로마 오일이 놓인 웰니스 관리 공간"
                fill
                priority
                sizes="(min-width: 768px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-lg bg-white/90 p-5 text-[#12392f] shadow-sm backdrop-blur">
                <Sparkles className="h-8 w-8 text-accent" />
                <p className="mt-3 text-xl font-bold">정돈된 공간에서 받는 건전한 웰니스 서비스</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">위생·안전·투명한 예약 기준을 먼저 안내합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-card">
        <div className="container grid gap-4 md:grid-cols-5">
          {["사업자 정보 공개", "예약제 운영", "위생 체크리스트 적용", "테라피스트 검증 기준 운영", "후기 검수 정책 운영"].map((badge) => (
            <div key={badge} className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 text-sm font-semibold">
              <CheckCircle2 className="h-5 w-5 text-primary" /> {badge}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Services" title="서비스 요약" description="각 서비스는 대상, 목적, 주의사항을 다르게 안내하며 의료 행위나 치료 보장을 표현하지 않습니다." />
          <div className="grid gap-5 md:grid-cols-4">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
        </div>
      </section>

      <section className="section bg-card">
        <div className="container">
          <SectionHeading eyebrow="Trust" title="방문 웰니스 서비스를 선택하기 전 알아야 할 것" description="홈페이지에서도 핵심 운영 원칙을 충분히 확인할 수 있도록 상세 설명을 제공합니다." />
          <ContentBlocks blocks={homeBlocks} />
        </div>
      </section>

      <section className="section bg-muted">
        <div className="container">
          <SectionHeading eyebrow="Process" title="예약부터 피드백까지" />
          <div className="grid gap-4 md:grid-cols-5">
            {["지역 및 시간 선택", "서비스 선택", "예약 확인", "테라피스트 방문", "관리 후 피드백"].map((step, index) => (
              <Card key={step}><p className="text-sm font-bold text-accent">STEP {index + 1}</p><p className="mt-3 font-semibold">{step}</p></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Pricing" title="요금 미리보기" description="출장비, 심야 요금, 지역 추가비가 있는 경우 예약 전 별도 고지합니다." />
          <div className="overflow-x-auto"><PricingTable /></div>
        </div>
      </section>

      <section className="section bg-card">
        <div className="container">
          <SectionHeading eyebrow="Areas" title="출장마사지 가능 지역" description="실제 서비스 가능 지역만 운영하며, 각 지역의 출입·주차·출장비 정보를 다르게 안내합니다." />
          <div className="grid gap-5 md:grid-cols-3">
            {areas.map((area) => (
              <Card key={area.slug}>
                <p className="text-xl font-bold">{area.name} 출장마사지</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.description}</p>
                <Button href={`/areas/${area.slug}`} variant="outline" className="mt-5">지역 안내 보기</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Reviews" title="실제 고객 후기" description="후기는 실제 예약 고객의 내용만 게시하며 허위·과장 후기는 사용하지 않습니다." />
          <div className="grid gap-5 md:grid-cols-3">{reviews.map((review) => <ReviewCard key={`${review.area}-${review.date}`} review={review} />)}</div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="container grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Safety" title="위생·안전 정책" description="고객과 테라피스트 모두를 보호하기 위한 기준을 공개합니다." />
          <div className="grid gap-3 md:grid-cols-2">
            {["손 소독", "도구 관리", "예약자 정보 확인", "불법·부적절 요청 거절", "고객과 테라피스트 보호 정책"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg bg-card p-4"><ShieldCheck className="h-5 w-5 text-primary" /> {item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Guide" title="웰니스 가이드 최신글" />
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug}>
                <p className="text-sm font-bold text-accent">{post.category}</p>
                <p className="mt-3 text-lg font-bold">{post.title}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.summary}</p>
                <Button href={`/wellness-guide/${post.slug}`} variant="ghost" className="mt-4 px-0">읽기</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-primary text-primary-foreground">
        <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">지금 가능한 방문 시간을 확인해보세요.</h2>
            <p className="mt-3 text-white/75">예약 신청 후 가능 시간과 지역을 확인해 연락드립니다.</p>
          </div>
          <Button href="/booking" variant="secondary">예약하기</Button>
        </div>
      </section>
    </>
  );
}
