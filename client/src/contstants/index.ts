export const MY_PAGE_NAVIGATIONS = [
  { value: 'orderHistroy', name: '주문 내역' },
  { value: 'address', name: '배송지 관리' },
  { value: 'coupon', name: '쿠폰' },
  { value: 'inqurey', name: '상품 문의' },
  { value: 'review', name: '상품 후기' },
];

export const FRUSTRATE_IMG =
  'https://store-10.s3.ap-northeast-2.amazonaws.com/test/frustrate.png';

interface IORDER_STATUS {
  [index: string]: string;
  wait: string;
  paid: string;
  preparing: string;
  delivering: string;
  delivered: string;
  confirmed: string;
}

export const ORDER_STATUS: IORDER_STATUS = {
  wait: '입금대기',
  paid: '결제완료',
  preparing: '상품준비중',
  delivering: '배송중',
  delivered: '배송완료',
  confirmed: '구매확정',
};

export const DELIVERY_REQUEST_MESSAGES = [
  {
    value: '',
    name: '배송시 요청 사항을 선택해주세요',
  },
  {
    value: '부재시 문 앞에 놓아주세요',
    name: '부재시 문 앞에 놓아주세요',
  },
  {
    value: '배송전에 미리 연락주세요',
    name: '배송전에 미리 연락주세요',
  },
  {
    value: '부재시 경비실에 맡겨 주세요',
    name: '부재시 경비실에 맡겨 주세요',
  },
  {
    value: '부재시 전화주시거나 문자 남겨 주세요.',
    name: '배송시 요청 사항을 선택해주세요',
  },
  {
    value: '직접입력',
    name: '직접입력',
  },
];
