import { posts } from "./posts";

export const POSTS_PER_PAGE = 12;

export const postCategories = [
  {
    slug: "usage-guide",
    name: "출장마사지 이용 가이드",
    description: "처음 이용하는 고객이 예약 전 확인해야 할 절차, 요금, 공간 준비, 안전 기준을 정리합니다."
  },
  {
    slug: "before-after-care",
    name: "마사지 전후 관리",
    description: "서비스 전후 수분 섭취, 휴식, 컨디션 확인처럼 생활 관리에 필요한 내용을 다룹니다."
  },
  {
    slug: "office-fatigue",
    name: "직장인 피로 관리",
    description: "컴퓨터 업무, 회의, 장거리 이동으로 쌓인 목·어깨·등 피로를 생활 관리 관점에서 안내합니다."
  },
  {
    slug: "service-choice",
    name: "서비스 선택 가이드",
    description: "아로마, 스포츠, 오피스 피로 케어 등 서비스 목적과 선택 기준을 비교합니다."
  },
  {
    slug: "safety",
    name: "서비스 안전 가이드",
    description: "위생, 개인정보, 부적절한 요청 거절, 마사지가 적합하지 않은 상황을 안내합니다."
  },
  {
    slug: "regional-guide",
    name: "지역 매거진",
    description: "지역별 건물 유형, 이동 조건, 예약 전 체크리스트를 실제 이용 가이드 형태로 정리합니다."
  },
  {
    slug: "sleep-relax",
    name: "수면과 휴식",
    description: "수면 전 릴렉스 루틴과 조용한 휴식 환경을 만드는 방법을 다룹니다."
  }
];

export function categorySlug(name: string) {
  return postCategories.find((category) => category.name === name)?.slug ?? "usage-guide";
}

export function categoryBySlug(slug: string) {
  return postCategories.find((category) => category.slug === slug);
}

export function postsByCategory(slug: string) {
  const category = categoryBySlug(slug);
  if (!category) return [];
  return posts.filter((post) => post.category === category.name);
}

export function pageCount(total: number) {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

export function paginatedPosts(list: typeof posts, page: number) {
  const start = (page - 1) * POSTS_PER_PAGE;
  return list.slice(start, start + POSTS_PER_PAGE);
}
