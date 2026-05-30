import { pricing } from "@/data/services";

export function PricingTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-4">이용 시간</th>
            <th className="p-4">아로마 릴렉스</th>
            <th className="p-4">스포츠 근육</th>
            <th className="p-4">오피스 피로</th>
          </tr>
        </thead>
        <tbody>
          {pricing.map((row) => (
            <tr key={row.minutes} className="border-t border-border">
              <td className="p-4 font-semibold">{row.minutes}</td>
              <td className="p-4">{row.aroma}</td>
              <td className="p-4">{row.sports}</td>
              <td className="p-4">{row.office}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
