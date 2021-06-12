import { v4 as uuid } from "uuid";

export const dummyNovels = [
  { id: uuid(), num: 1, title: "프롤로그" },
  { id: uuid(), num: 2, title: "가자 디지몬 친구들" },
  { id: uuid(), num: 3, title: "동해물과" },
  { id: uuid(), num: 4, title: "백두산이" },
  { id: uuid(), num: 5, title: "마르고 닳도록" },
  { id: uuid(), num: 6, title: "하나님이 보우하사" },
  { id: uuid(), num: 7, title: "우리나라 만세" },
];

export const dummyContributors = [
  {
    id: uuid(),
    nickname: "오늘의소설",
    count: 21,
    rank: 1,
  },
  {
    id: uuid(),
    nickname: "내일의소설",
    count: 19,
    rank: 2,
  },
  {
    id: uuid(),
    nickname: "어제의소설",
    count: 15,
    rank: 3,
  },
  {
    id: uuid(),
    nickname: "모레의소설",
    count: 13,
    rank: 4,
  },
  {
    id: uuid(),
    nickname: "이레의소설",
    count: 11,
    rank: 5,
  },
  {
    id: uuid(),
    nickname: "나는야소설",
    count: 3,
    rank: 6,
  },
];
