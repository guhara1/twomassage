import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileCta } from "@/components/MobileCta";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "출장마사지 예약 | 전문 테라피스트 웰니스 홈케어",
    template: "%s | 투마사지"
  },
  description:
    "검증된 전문 테라피스트가 고객님의 공간으로 찾아가는 합법 출장마사지 웰니스 서비스입니다. 요금, 지역, 위생 정책, 예약 절차를 투명하게 안내합니다.",
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "투마사지"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <JsonLd data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
