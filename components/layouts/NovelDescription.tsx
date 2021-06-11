import React, { VFC } from "react";
import Image from "next/image";
import { FiUser, FiThumbsUp } from "react-icons/fi";

type Props = {
  title: string;
  writer: string;
};

const NovelDescription: VFC<Props> = ({ title, writer }) => {
  return (
    <section className="flex flex-col sm:flex-row gap-6 md:gap-10">
      <article>
        <Image
          className="rounded-xl"
          src="/img/coverImg.PNG"
          alt="cover image"
          width={300}
          height={450}
        />
      </article>

      <article className="flex-1">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="border-b-2 my-2"></div>
        <div className="flex gap-2 my-2">
          <h1 className="font-bold mr-3">{writer}</h1>
          <p>#태그</p>
          <p>#태그</p>
          <p>#태그</p>
          <p>#태그</p>
        </div>

        <div className="flex gap-2 my-2">
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

        <div className="flex gap-2 my-2">
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
      </article>
    </section>
  );
};

export default NovelDescription;
