import Link from "next/link";
import type { Service } from "@/data/services";
import { Card } from "./ui/card";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="flex h-full flex-col">
      <p className="text-lg font-bold">{service.name}</p>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{service.short}</p>
      <Link className="mt-5 text-sm font-bold text-primary" href={`/services/${service.slug}`}>
        자세히 보기
      </Link>
    </Card>
  );
}
