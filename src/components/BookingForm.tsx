import { services } from "@/data/services";
import { Button } from "./ui/button";

const inputClass = "focus-ring min-h-11 rounded-md border border-input bg-card px-3 py-2 text-sm";

export function BookingForm() {
  return (
    <form className="grid gap-4 rounded-lg border border-border bg-card p-6" action="/booking/complete">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">이름<input className={inputClass} name="name" required /></label>
        <label className="grid gap-2 text-sm font-semibold">연락처<input className={inputClass} name="phone" required inputMode="tel" /></label>
        <label className="grid gap-2 text-sm font-semibold">출장마사지 지역<input className={inputClass} name="area" required /></label>
        <label className="grid gap-2 text-sm font-semibold">상세 주소<input className={inputClass} name="address" required /></label>
        <label className="grid gap-2 text-sm font-semibold">희망 날짜<input className={inputClass} name="date" required type="date" /></label>
        <label className="grid gap-2 text-sm font-semibold">희망 시간<input className={inputClass} name="time" required type="time" /></label>
        <label className="grid gap-2 text-sm font-semibold">
          서비스 종류
          <select className={inputClass} name="service" required>
            {services.map((service) => <option key={service.slug}>{service.name}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          이용 시간
          <select className={inputClass} name="duration" required>
            <option>60분</option>
            <option>90분</option>
            <option>120분</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold">요청사항<textarea className={`${inputClass} min-h-28`} name="message" /></label>
      <label className="flex gap-3 text-sm text-muted-foreground"><input required type="checkbox" /> 개인정보 수집 및 예약 상담 목적 이용에 동의합니다.</label>
      <label className="flex gap-3 text-sm text-muted-foreground"><input required type="checkbox" /> 건전한 웰니스 서비스 운영 및 부적절한 요청 거절 정책에 동의합니다.</label>
      <Button type="submit" className="w-full md:w-auto">예약 신청하기</Button>
    </form>
  );
}
