// type=0 : 지출 / type=1 : 수입
export const dummyhistories = [
  {
    id: 1,
    user_id: 1,
    category: '쇼핑/뷰티',
    payment: '현대카드',
    price: 54000,
    content: '사이드 테이블 구매',
    type: 0,
    createdAt: '2021-06-29',
  },
  {
    id: 2,
    user_id: 1,
    category: '식비',
    payment: '현대카드',
    price: 9000,
    content: '엽기떡볶이',
    type: 0,
    createdAt: '2021-06-30',
  },
  {
    id: 3,
    user_id: 1,
    category: '교통',
    payment: '현대카드',
    price: 45340,
    content: '후불 교통비 결제',
    type: 0,
    createdAt: '2021-07-01',
  },
  {
    id: 4,
    user_id: 1,
    category: '미분류',
    payment: '신한카드',
    price: 45340,
    content: '온라인 세미나 신청',
    type: 0,
    createdAt: '2021-07-02',
  },
  {
    id: 5,
    user_id: 1,
    category: '문화/여가',
    payment: '신한카드',
    price: 1490000,
    content: '시카고 뮤지컬',
    type: 0,
    createdAt: '2021-07-03',
  },
  {
    id: 6,
    user_id: 1,
    category: '의료/건강',
    payment: '신한카드',
    price: 125300,
    content: '체육관 수강 등록',
    type: 0,
    createdAt: '2021-07-03',
  },
  {
    id: 7,
    user_id: 1,
    category: '생활',
    payment: '현대카드',
    price: 6400,
    content: '종량제 봉투 구입',
    type: 0,
    createdAt: '2021-07-05',
  },
  {
    id: 8,
    user_id: 1,
    category: '금융 이자',
    payment: '신한카드',
    price: 1600,
    content: '신한카드 금융 이자',
    type: 1,
    createdAt: '2021-07-10',
  },
  {
    id: 9,
    user_id: 1,
    category: '금융 이자',
    payment: '현대카드',
    price: 1000,
    content: '우아한 형제들 캐시백',
    type: 1,
    createdAt: '2021-07-17',
  },
  {
    id: 10,
    user_id: 1,
    category: '의료/건강',
    payment: '신한카드',
    price: 60000,
    content: '건강검진 진행',
    type: 0,
    createdAt: '2021-07-20',
  },
  {
    id: 11,
    user_id: 1,
    category: '식비',
    payment: '현금',
    price: 4000,
    content: '길거리 포장마차 분식 먹방',
    type: 0,
    createdAt: '2021-08-02',
  },
  {
    id: 12,
    user_id: 1,
    category: '미분류',
    payment: '현금',
    price: 10000,
    content: '친구와의 내기에서 승리!',
    type: 1,
    createdAt: '2021-08-07',
  },
  {
    id: 13,
    user_id: 1,
    category: '식비',
    payment: '신한카드',
    price: 35000,
    content: '고급 일식 식당에서 친구와 식사 (내가 다 냄)',
    type: 0,
    createdAt: '2021-08-09',
  },
  {
    id: 14,
    user_id: 1,
    category: '미분류',
    payment: '현대카드',
    price: 2000000,
    content: '월급',
    type: 1,
    createdAt: '2021-08-10',
  },
  {
    id: 15,
    user_id: 1,
    category: '문화/여가',
    payment: '신한카드',
    price: 600000,
    content: '헬스장 1달치 등록',
    type: 0,
    createdAt: '2021-08-15',
  },
  {
    id: 16,
    user_id: 1,
    category: '문화/여가',
    payment: '신한카드',
    price: 600000,
    content: '헬스장 1달치 환불',
    type: 1,
    createdAt: '2021-08-15',
  },
];

export const category = [
  { id: 1, type: '생활' },
  { id: 2, type: '식비' },
  { id: 3, type: '교통' },
  { id: 4, type: '쇼핑/뷰티' },
  { id: 5, type: '여가' },
  { id: 6, type: '문화' },
  { id: 7, type: '미분류' },
  { id: 8, type: '금융 이자' },
];

export const payment = [
  {
    id: 1,
    type: '현금',
  },
  {
    id: 2,
    type: '현대카드',
  },
  {
    id: 3,
    type: '신한카드',
  },
];