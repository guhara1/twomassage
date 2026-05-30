import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { business } from "@/data/business";

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-card p-2 shadow-lg md:hidden">
      <Link href={`tel:${business.phone}`} className="flex flex-col items-center gap-1 rounded-md px-2 py-2 text-xs font-semibold">
        <Phone className="h-4 w-4" /> 전화
      </Link>
      <Link href={business.kakao} className="flex flex-col items-center gap-1 rounded-md px-2 py-2 text-xs font-semibold">
        <MessageCircle className="h-4 w-4" /> 카카오 상담
      </Link>
      <Link href="/booking" className="flex flex-col items-center gap-1 rounded-md bg-[#12392f] px-2 py-2 text-xs font-semibold text-white">
        <CalendarCheck className="h-4 w-4" /> 예약하기
      </Link>
    </div>
  );
}
