import React from "react";
import { FiThumbsUp, FiMessageCircle } from "react-icons/fi";

const Comments = () => {
  return (
    <>
      <div className="cursor-pointer transition transform duration-100 ease-in-out hover:opacity-80 hover:-translate-y-1 flex flex-col gap-3 rounded-xl bg-green-100 p-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">AAA님의 코멘트</h1>
          <div className="bg-yellow-300 font-bold py-2 px-4 text-white rounded-xl">
            채택
          </div>
        </div>
        <p>"동해물과"를 "동해물과 동해물과"로 변경하면 어떨까요?</p>
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
      <div className="cursor-pointer transition transform duration-100 ease-in-out hover:opacity-80 hover:-translate-y-1 flex flex-col gap-3 rounded-xl bg-purple-100 p-5">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">BBB님의 코멘트</h1>
          <div className="bg-yellow-300 font-bold py-2 px-4 text-white rounded-xl">
            채택
          </div>
        </div>
        <p>"닳도록 닳도록"을 추가하면 더 멋진 스토리가 될 것 같습니다!</p>
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

export default Comments;
