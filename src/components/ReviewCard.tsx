import { Star } from "lucide-react";
import { Card } from "./ui/card";

export function ReviewCard({ review }: { review: { area: string; service: string; duration: string; rating: number; date: string; content: string } }) {
  return (
    <Card>
      <div className="flex items-center gap-1 text-accent" aria-label={`${review.rating}점 후기`}>
        {Array.from({ length: review.rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{review.content}</p>
      <div className="mt-5 text-sm font-semibold">{review.area} · {review.service} · {review.duration}</div>
      <div className="mt-1 text-xs text-muted-foreground">{review.date}</div>
    </Card>
  );
}
