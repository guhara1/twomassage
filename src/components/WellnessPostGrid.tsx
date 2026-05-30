"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export type WellnessPostCard = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  categoryHref: string;
  authorName: string;
  updatedAt: string;
};

export function WellnessPostGrid({ posts, initialCount = 12, step = 6 }: { posts: WellnessPostCard[]; initialCount?: number; step?: number }) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisibleCount((count) => Math.min(posts.length, count + step));
        }
      },
      { rootMargin: "360px 0px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, posts.length, step]);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        {visiblePosts.map((post, index) => (
          <Card
            key={post.slug}
            className="animate-[fadeInUp_420ms_ease-out_both]"
            style={{ animationDelay: `${Math.min(index % step, 5) * 45}ms` }}
          >
            <Button href={post.categoryHref} variant="ghost" className="h-auto px-0 py-0 text-sm font-bold text-accent hover:bg-transparent">
              {post.category}
            </Button>
            <h2 className="mt-3 text-xl font-bold">{post.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.summary}</p>
            <p className="mt-4 text-xs text-muted-foreground">작성자 {post.authorName} · 업데이트 {post.updatedAt}</p>
            <Button href={`/wellness-guide/${post.slug}`} variant="outline" className="mt-5">글 읽기</Button>
          </Card>
        ))}
      </div>
      {hasMore ? (
        <div ref={sentinelRef} className="mt-8 flex justify-center">
          <Button type="button" variant="outline" onClick={() => setVisibleCount((count) => Math.min(posts.length, count + step))}>
            글 더 보기
          </Button>
        </div>
      ) : null}
    </>
  );
}
