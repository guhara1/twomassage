import { faqs } from "@/data/faqs";

export function FAQAccordion({ items = faqs }: { items?: typeof faqs }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details key={item.q} className="rounded-lg border border-border bg-card p-5">
          <summary className="cursor-pointer font-semibold">{item.q}</summary>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
