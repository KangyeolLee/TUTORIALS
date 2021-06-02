import React from "react";
import Image from "next/image";
import { FiUser, FiThumbsUp } from "react-icons/fi";
import NovelList from "@components/layouts/NovelList";

const NovelDetail = () => {
  return (
    <section className="sm:container sm:mx-auto md:px-10 my-16">
      <div className="flex gap-10">
        <Image
          className="rounded-xl"
          src="/img/coverImg.PNG"
          alt="cover image"
          width={300}
          height={450}
        />

        <div className="flex-1">
          <h1 className="font-bold text-2xl">이것은 소설의 제목입니다</h1>
          <div className="border-b-2 my-2"></div>
          <div className="flex gap-5 my-2">
            <h1 className="font-bold mr-3">작가</h1>
            <p>#태그</p>
            <p>#태그</p>
            <p>#태그</p>
            <p>#태그</p>
          </div>

          <div className="flex gap-5 my-2">
            <h1 className="font-bold mr-3">연재</h1>
            <p className="rounded-full bg-red-200 h-6 w-6 flex items-center justify-center">
              월
            </p>
            <p className="rounded-full bg-yellow-500 bg-opacity-70 h-6 w-6 flex items-center justify-center">
              화
            </p>
            <p className="rounded-full bg-yellow-200 h-6 w-6 flex items-center justify-center">
              수
            </p>
            <p className="rounded-full bg-green-200 h-6 w-6 flex items-center justify-center">
              목
            </p>
            <p className="rounded-full bg-blue-200 h-6 w-6 flex items-center justify-center">
              금
            </p>
          </div>

          <div className="flex gap-5 my-2">
            <h1 className="font-bold mr-3">인기도</h1>
            <div className="flex items-center">
              <FiUser />
              <span className="ml-2">172,335</span>
            </div>

            <div className="flex items-center">
              <FiThumbsUp />
              <span className="ml-2">12,333</span>
            </div>
          </div>

          <div className="flex flex-col my-2">
            <h1 className="font-bold">줄거리</h1>
            <p>누가누가 태어나서 누가누가 밥을 먹고...</p>
          </div>
        </div>
      </div>

      <h1 className="mt-14 mb-2 text-2xl font-bold">기여자 랭킹</h1>
      <div className="border rounded-md p-10">
        <div className="flex gap-5 my-2">
          <Image src="/img/gold.svg" alt="gold medal" width={30} height={30} />
          <h1 className="font-bold">nickname</h1>
          <Image src="/img/vote.svg" alt="vote" width={30} height={30} />
          <p>21회</p>
        </div>

        <div className="flex gap-5 my-2">
          <Image
            src="/img/silver.svg"
            alt="silver medal"
            width={30}
            height={30}
          />
          <h1 className="font-bold">nickname</h1>
          <Image src="/img/vote.svg" alt="vote" width={30} height={30} />
          <p>11회</p>
        </div>

        <div className="flex gap-5 my-2">
          <Image
            src="/img/bronze.svg"
            alt="bronze medal"
            width={30}
            height={30}
          />
          <h1 className="font-bold">nickname</h1>
          <Image src="/img/vote.svg" alt="vote" width={30} height={30} />
          <p>10회</p>
        </div>
      </div>

      <h1 className="mt-14 mb-2 text-2xl font-bold">회차 목록</h1>
      <div className="divide-y divide-light-gray-500">
        <NovelList num={1} title="프롤로그" />
        <NovelList num={2} title="가자 디지몬 친구들" />
        <NovelList num={3} title="동해물과" />
        <NovelList num={4} title="백두산이" />
        <NovelList num={5} title="마르고 닳도록" />
        <NovelList num={6} title="하나님이 보우하사" />
        <NovelList num={7} title="우리나라 만세" />
      </div>
    </section>
  );
};

export default NovelDetail;
