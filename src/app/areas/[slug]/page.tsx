import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock3, MapPin, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentBlocks } from "@/components/ContentBlocks";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { areas } from "@/data/areas";
import { faqSchema, localBusinessSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: `/areas/${area.slug}` }
  };
}

export default async function AreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  if (!area) notFound();
  const summaryCards: { label: string; value: string; Icon: LucideIcon }[] = [
    { label: "가능 구역", value: area.zones.join(", "), Icon: MapPin },
    { label: "도착 시간", value: area.arrival, Icon: Clock3 },
    { label: "출장비", value: area.fee, Icon: WalletCards },
    { label: "선호 서비스", value: area.popular.join(", "), Icon: ShieldCheck }
  ];

  return (
    <>
      <JsonLd data={[localBusinessSchema(), serviceSchema(`${area.name} 출장마사지`, area.description, `/areas/${area.slug}`), faqSchema(area.faqs)]} />
      <Breadcrumbs items={[{ label: "출장마사지 가능 지역", href: "/areas" }, { label: area.name, href: `/areas/${area.slug}` }]} />
      <section className="relative overflow-hidden bg-[#102f29] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%),linear-gradient(180deg,rgba(185,154,91,0.12),transparent_58%)]" />
        <div className="container relative grid min-h-[520px] items-center gap-10 py-16 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold text-[#e9d8a6]">
              <Sparkles className="h-4 w-4" /> 지역별 웰니스 이용 가이드
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">{area.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">{area.description}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <Clock3 className="h-5 w-5 text-[#e9d8a6]" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">Arrival</p>
                <p className="mt-1 font-bold">{area.arrival}</p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <WalletCards className="h-5 w-5 text-[#e9d8a6]" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">Fee</p>
                <p className="mt-1 font-bold">{area.fee}</p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                <MapPin className="h-5 w-5 text-[#e9d8a6]" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">Area</p>
                <p className="mt-1 font-bold">{area.zones.slice(0, 3).join(" · ")}</p>
              </div>
            </div>
          </div>
          <aside className="rounded-lg border border-white/15 bg-white p-6 text-[#17231f] shadow-2xl shadow-black/20">
            <p className="text-sm font-bold text-accent">{area.name} 예약 상담</p>
            <p className="mt-3 text-2xl font-bold leading-snug">가능 시간과 추가 비용을 먼저 확인하세요.</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">상세 주소와 희망 시간을 남겨주시면 가능 여부, 출장비, 준비사항을 안내합니다.</p>
            <Button href="/booking" className="mt-6 w-full">예약 문의</Button>
            <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
              {["예약제 운영", "위생·안전 기준 공개", "부적절한 요청 거절"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
              <div className="grid gap-5 text-[15px] leading-8 text-muted-foreground">
                {area.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {summaryCards.map(({ label, value, Icon }) => (
                <div key={label} className="rounded-lg border border-border bg-white p-5 shadow-sm">
                  <Icon className="h-5 w-5 text-accent" />
                  <p className="mt-4 text-sm font-bold text-primary">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-[#d9c48b] bg-[#fffaf0] p-5">
              <p className="text-sm font-bold text-primary">이용 시 유의사항</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{area.note}</p>
            </div>

            <section className="mt-12">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-bold text-accent">Services</p>
                  <h2 className="mt-2 text-3xl font-bold">{area.name}에서 이용 가능한 출장마사지 서비스</h2>
                </div>
                <Button href="/pricing" variant="outline">요금 안내</Button>
              </div>
              <div className="mt-6 grid gap-5">
                {area.services.map((service) => (
                  <div key={service.name} className="group rounded-lg border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c8ad72] hover:shadow-lg">
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{service.name}</h3>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{service.body}</p>
                      </div>
                      <Button href={service.href} variant="secondary" className="shrink-0">서비스 보기</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <p className="text-sm font-bold text-accent">Coverage</p>
              <h2 className="mt-2 text-3xl font-bold">{area.name} 주요 출장마사지 가능 지역</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {area.zoneGroups.map((zone) => (
                  <div key={zone.title} className="rounded-lg border border-border bg-white p-6 shadow-sm">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="mt-4 text-lg font-bold">{zone.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{zone.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-12">
              <ContentBlocks
                blocks={[
                  { title: "이용 전 확인해야 할 사항", body: [area.precheck] },
                  { title: `${area.name} 출장마사지 요금 안내`, body: [area.pricing] },
                  { title: "예약 진행 절차", body: [area.booking] },
                  { title: "위생·안전 운영 기준", body: [area.safety] },
                  { title: "실제 후기 운영 원칙", body: [area.review] },
                  { title: `${area.name} 출장마사지 예약 전 안내`, body: [area.closing] }
                ]}
              />
            </div>

            <div className="mt-12 rounded-lg border border-border bg-[#f7f3ea] p-6 md:p-8">
              <p className="text-sm font-bold text-accent">FAQ</p>
              <h2 className="mt-2 mb-5 text-3xl font-bold">자주 묻는 질문</h2>
              <FAQAccordion items={area.faqs} />
            </div>
          </div>

          <aside className="h-fit overflow-hidden rounded-lg border border-border bg-card shadow-xl lg:sticky lg:top-24">
            <div className="bg-primary p-6 text-primary-foreground">
              <p className="text-sm font-bold text-[#e9d8a6]">{area.name} 상담 패널</p>
              <p className="mt-3 text-2xl font-bold leading-snug">예약 전 확인할 핵심 정보</p>
              <p className="mt-3 text-sm leading-7 text-white/75">가능 시간, 출장비, 출입 조건을 먼저 확인합니다.</p>
            </div>
            <div className="grid gap-3 p-6 text-sm">
              <div className="rounded-lg bg-muted p-4">
                <p className="font-bold">평균 도착</p>
                <p className="mt-1 text-muted-foreground">{area.arrival}</p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="font-bold">출장비</p>
                <p className="mt-1 text-muted-foreground">{area.fee}</p>
              </div>
              <Button href="/booking" className="mt-2 w-full">예약 문의</Button>
              <Button href="/pricing" variant="outline" className="w-full">요금 안내</Button>
              <Button href="/trust/safety-hygiene" variant="outline" className="w-full">위생·안전 정책</Button>
              <Button href="/trust/therapist-standards" variant="outline" className="w-full">테라피스트 검증</Button>
              <Button href="/reviews" variant="outline" className="w-full">고객 후기</Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
