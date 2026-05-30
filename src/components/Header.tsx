"use client";

import { Menu, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { business, mainNav } from "@/data/business";
import { Button } from "./ui/button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-[#12392f] text-white">T</span>
          <span>투마사지</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
          <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
            홈
          </Link>
          {mainNav.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(group.label)}
              onMouseLeave={() => setActiveMenu(null)}
              onFocus={() => setActiveMenu(group.label)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setActiveMenu(null);
                }
              }}
            >
              <Link
                href={group.href}
                className="focus-ring rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                aria-haspopup="true"
                aria-expanded={activeMenu === group.label}
              >
                {group.label}
              </Link>
              {activeMenu === group.label ? (
                <div className="absolute left-0 top-full w-60 pt-3">
                  <div className="rounded-lg border border-border bg-card p-2 shadow-lg">
                    {group.items.map(([label, href]) => (
                      href.startsWith("#heading:") ? (
                        <p key={href} className="px-3 pb-1 pt-3 text-xs font-bold text-accent first:pt-1">
                          {label}
                        </p>
                      ) : (
                        <Link
                          key={href}
                          href={href}
                          className="focus-ring block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                          onClick={() => setActiveMenu(null)}
                        >
                          {label}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href={`tel:${business.phone}`} variant="outline" className="px-3">
            <Phone className="h-4 w-4" /> 전화 상담
          </Button>
          <Button href={business.kakao} variant="outline" className="px-3">
            <MessageCircle className="h-4 w-4" /> 카카오 상담
          </Button>
          <Button href="/booking">예약하기</Button>
        </div>

        <button
          type="button"
          className="focus-ring rounded-md border border-border p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="모바일 메뉴 열기"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="container grid gap-2 py-4" aria-label="모바일 메뉴">
            <Link href="/" className="rounded-md px-3 py-2 font-medium" onClick={() => setOpen(false)}>
              홈
            </Link>
            {mainNav.map((group) => (
              <div key={group.label}>
                <Link href={group.href} className="block rounded-md px-3 py-2 font-semibold" onClick={() => setOpen(false)}>
                  {group.label}
                </Link>
                <div className="grid gap-1 ps-3">
                  {group.items.map(([label, href]) => (
                    href.startsWith("#heading:") ? (
                      <p key={href} className="px-3 pb-1 pt-3 text-xs font-bold text-accent">
                        {label}
                      </p>
                    ) : (
                      <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm text-muted-foreground" onClick={() => setOpen(false)}>
                        {label}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
