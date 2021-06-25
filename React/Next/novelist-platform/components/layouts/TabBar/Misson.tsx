import React from "react";
import { FiThumbsUp, FiMessageCircle } from "react-icons/fi";

const Misson = () => {
  return (
    <>
      <div className="cursor-pointer transition transform duration-100 ease-in-out hover:opacity-80 hover:-translate-y-1 flex flex-col gap-3 rounded-xl bg-green-100 p-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">AAA님의 미션</h1>
          <div className="bg-yellow-300 font-bold py-2 px-4 text-white rounded-xl">
            50,000원
          </div>
        </div>
        <p>작가님 제발 동해물을 죽여주세요. 5만원 겁니다!!</p>
        <div className="flex gap-5">
          <div className="flex gap-2 items-center">
            <FiThumbsUp />
            <span>22</span>
          </div>

          <div className="flex gap-2 items-center">
            <FiMessageCircle />
            <span>2</span>
          </div>
        </div>
      </div>
      <div className="cursor-pointer transition transform duration-100 ease-in-out hover:opacity-80 hover:-translate-y-1 flex flex-col gap-3 rounded-xl bg-gray-100 p-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">BBB님의 미션</h1>
          <div className="bg-yellow-300 font-bold py-2 px-4 text-white rounded-xl">
            10,000원
          </div>
        </div>
        <p>동해물 살려주세요~ 만원 금융치료 바로 겁니다!</p>
        <div className="flex gap-5">
          <div className="flex gap-2 items-center">
            <FiThumbsUp />
            <span>12</span>
          </div>

          <div className="flex gap-2 items-center">
            <FiMessageCircle />
            <span>1</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Misson;
