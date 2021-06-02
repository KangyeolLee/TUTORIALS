import React, { VFC } from "react";

type Props = {
  handleSubmitBtn: () => void;
};

const Modal: VFC<Props> = ({ handleSubmitBtn }) => {
  return (
    <div className="fixed flex flex-col justify-center top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50">
      <div className="flex flex-col gap-5 bg-white p-10 m-3 sm:m-16 lg:m-40 xl:m-60 rounded-3xl">
        <h1 className="font-bold text-2xl">CCC님의 코멘트</h1>
        <input
          placeholder="자유롭게 의견을 남겨보세요"
          className="p-5 w-full border rounded-lg"
        />
        <div className="flex justify-end gap-4">
          <div
            onClick={handleSubmitBtn}
            className="bg-gray-200 font-bold text-xl py-3 px-6 rounded-xl cursor-pointer hover:opacity-75"
          >
            취소
          </div>
          <div
            onClick={handleSubmitBtn}
            className="bg-blue-400 font-bold text-xl py-3 px-6 rounded-xl text-white cursor-pointer hover:opacity-75"
          >
            제출
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
