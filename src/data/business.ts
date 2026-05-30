export const business = {
  name: "투마사지",
  legalName: "투마사지 방문 웰니스 케어",
  phone: "010-0000-0000",
  kakao: "https://pf.kakao.com/_placeholder",
  email: "care@twomassage.kr",
  hours: "매일 10:00-23:00 예약제 운영",
  address: "서울특별시 강남구 테헤란로 000",
  registration: "사업자등록번호 000-00-00000",
  description:
    "검증된 전문 테라피스트가 고객님의 공간으로 방문하는 합법 방문 웰니스 케어 서비스입니다.",
  principles: ["합법 운영", "예약제 상담", "투명한 요금", "위생 체크리스트", "부적절한 요청 거절"]
};

export const mainNav = [
  {
    label: "서비스",
    href: "/services",
    items: [
      ["아로마 릴렉스 케어", "/services/aroma-relax-care"],
      ["스포츠 근육 케어", "/services/sports-muscle-care"],
      ["오피스 피로 케어", "/services/office-fatigue-care"],
      ["커플·가족 방문 케어", "/services/family-couple-care"],
      ["서비스 비교표", "/services#compare"]
    ]
  },
  {
    label: "이용안내",
    href: "/pricing",
    items: [
      ["예약 방법", "/booking"],
      ["요금 안내", "/pricing"],
      ["방문 가능 지역", "/areas"],
      ["자주 묻는 질문", "/faq"]
    ]
  },
  {
    label: "지역안내",
    href: "/areas",
    items: [
      ["강남 방문 마사지", "/areas/gangnam"],
      ["송파 방문 마사지", "/areas/songpa"],
      ["마포 방문 마사지", "/areas/mapo"]
    ]
  },
  {
    label: "신뢰센터",
    href: "/about",
    items: [
      ["회사 소개", "/about"],
      ["테라피스트 검증 기준", "/trust/therapist-standards"],
      ["위생·안전 정책", "/trust/safety-hygiene"],
      ["고객 후기", "/reviews"]
    ]
  },
  {
    label: "웰니스 가이드",
    href: "/wellness-guide",
    items: [
      ["피로 관리", "/wellness-guide"],
      ["작성자 소개", "/authors/minseo-kim"],
      ["편집 정책", "/editorial-policy"]
    ]
  },
  {
    label: "고객지원",
    href: "/contact",
    items: [
      ["문의하기", "/contact"],
      ["FAQ", "/faq"],
      ["개인정보처리방침", "/privacy"],
      ["이용약관", "/terms"]
    ]
  }
];
