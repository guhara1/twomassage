import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteUrl = "https://2massage.club";

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path}`;
}

export function pageTitle(title: string) {
  return `${title} | 투마사지`;
}
