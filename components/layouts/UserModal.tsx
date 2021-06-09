import Image from "next/image";
import React, { VFC } from "react";
import { FaRegUserCircle, FaBookOpen } from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";

type Props = {
  handleSubmitBtn: () => void;
};

const UserModal: VFC<Props> = ({ handleSubmitBtn }) => {
  return (
    <div className="fixed flex flex-col items-center justify-center p-6 top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50">
      <div className="flex flex-col gap-16 bg-white w-full max-w-3xl p-10 rounded-3xl">
        <div className="flex justify-end">
          <CgCloseO
            onClick={handleSubmitBtn}
            className="text-4xl text-gray-500 cursor-pointer hover:opacity-40"
          />
        </div>
        <div className="flex justify-center border-b-2 pb-10">
          <div className="flex flex-col items-center gap-5">
            <FaRegUserCircle fontSize={100} />
            <p className="font-bold text-xl">오늘의소설</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">개인정보</h1>
          <div className="flex flex-col items-center gap-5 justify-center bg-blue-100 bg-opacity-30 p-10 rounded-xl">
            <p className="text-2xl mob:text-4xl text-gray-500">(ノ&gt;ノ)</p>
            <p className="text-md mob:text-xl text-gray-500">
              사용자에 의해 비공개 처리 되었습니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">활동내역</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border rounded-xl p-4">
              <div className="flex gap-4">
                <FaBookOpen className="text-2xl" />
                <p className="text-md mob:text-xl">이것은 소설의 제목입니다</p>
              </div>
              <div className="hidden sm:flex gap-4">
                <Image src="/img/vote.svg" alt="vote" width={30} height={30} />
                <p>21회</p>
              </div>
            </div>
            <div className="flex items-center justify-between border rounded-xl p-4">
              <div className="flex gap-4">
                <FaBookOpen className="text-2xl" />
                <p className="text-md mob:text-xl">안녕하세요</p>
              </div>
              <div className="hidden sm:flex gap-4">
                <Image src="/img/vote.svg" alt="vote" width={30} height={30} />
                <p>12회</p>
              </div>
            </div>
            <div className="flex items-center justify-between border rounded-xl p-4">
              <div className="flex gap-4">
                <FaBookOpen className="text-2xl" />
                <p className="text-md mob:text-xl">Somebody helps me</p>
              </div>
              <div className="hidden sm:flex gap-4 ">
                <Image src="/img/vote.svg" alt="vote" width={30} height={30} />
                <p>10회</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
