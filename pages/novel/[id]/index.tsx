import React from "react";
import NovelList from "@components/layouts/NovelList";
import NovelDescription from "@components/layouts/NovelDescription";
import Contributors from "@components/layouts/Contributors";

const NovelDetail = () => {
  return (
    <section className="sm:container px-5 md:px-10 mx-auto my-16">
      <NovelDescription title="이것은 소설의 제목입니다" writer="Gian95" />

      <Contributors />

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
