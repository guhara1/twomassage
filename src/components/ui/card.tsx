import { cn } from "@/lib/utils";

export function Card({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={cn("rounded-lg border border-border bg-card p-6 shadow-sm", className)} style={style}>{children}</div>;
}
