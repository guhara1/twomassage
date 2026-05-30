import Link from "next/link";
import { business } from "@/data/business";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#102a24] pb-24 pt-12 text-white md:pb-12">
      <div className="container grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-xl font-bold">투마사지</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">{business.description}</p>
          <dl className="mt-5 grid gap-2 text-sm text-white/75">
            <div>상호: {business.legalName}</div>
            <div>{business.registration}</div>
            <div>주소: {business.address}</div>
            <div>고객지원: {business.phone} · {business.email}</div>
            <div>운영시간: {business.hours}</div>
          </dl>
        </div>
        <div>
          <p className="font-semibold">신뢰센터</p>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            <Link href="/about">회사 소개</Link>
            <Link href="/trust/therapist-standards">테라피스트 검증 기준</Link>
            <Link href="/trust/safety-hygiene">위생·안전 정책</Link>
            <Link href="/reviews">고객 후기</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">고객지원</p>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            <Link href="/contact">문의하기</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/terms">이용약관</Link>
            <Link href="/editorial-policy">편집 정책</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
