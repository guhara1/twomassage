import { pricingCards } from "@/data/services";

export function PricingTable() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {pricingCards.map((card) => (
        <article
          key={card.title}
          className="relative overflow-hidden rounded-lg border border-[#d5b783]/35 bg-[#12141b] p-7 text-white shadow-sm"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#e2c98c] via-[#d7a06f] to-[#8fd0bd]" />
          {card.badge ? (
            <span className="absolute right-5 top-4 rounded-full bg-[#f1c7aa] px-3 py-1 text-xs font-bold text-[#2a1a10]">
              {card.badge}
            </span>
          ) : null}
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e4c36f]">{card.eyebrow}</p>
          <h3 className="mt-4 text-2xl font-bold">{card.title}</h3>
          <p className="mt-4 min-h-16 text-sm leading-7 text-slate-300">{card.description}</p>
          <div className="mt-7 border-t border-white/10 pt-3">
            {card.prices.map(([time, price]) => (
              <div key={`${card.title}-${time}`} className="flex items-center justify-between border-b border-white/5 py-3 text-sm">
                <span className="text-slate-300">{time}</span>
                <strong className="text-base text-white">{price}</strong>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
