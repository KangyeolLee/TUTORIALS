import React, { VFC } from "react";

type Props = {
  handleToggleBtn: () => void;
};

const CommentsBlind: VFC<Props> = ({ handleToggleBtn }) => {
  return (
    <div className="flex flex-col items-center justify-between gap-5 my-20 p-8 mob:p-10 md:p-20 bg-blue-50 rounded-3xl text-center">
      <p className="text-lg sm:text-2xl">
        총 <strong>2명</strong>의 의견이 작가에 의해 채택되었습니다.
      </p>
      <p className="text-base sm:text-xl">
        총 <strong>5명</strong>의 의견 있습니다.
      </p>
      <div
        onClick={handleToggleBtn}
        className="w-28 text-white font-bold rounded-lg p-4 bg-green-400 hover:opacity-75 cursor-pointer"
      >
        상세보기
      </div>
    </div>
  );
};

export default CommentsBlind;
