import React, { VFC } from "react";

interface Props {
  handleToggleBtn: () => void;
  editStatus: boolean;
  list: string | string[] | undefined;
}

const NovelTitle: VFC<Props> = ({ list, editStatus, handleToggleBtn }) => {
  return (
    <section className="flex justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2">이것은 소설의 제목입니다</h1>
        <p className="text-lg">#{list}</p>
      </div>

      <div
        onClick={handleToggleBtn}
        className={`flex items-center justify-between rounded-full  w-20 h-10 cursor-pointer hover:opacity-75 ${
          editStatus ? "bg-green-400" : "bg-gray-200"
        }`}
      >
        {editStatus ? (
          <>
            <span className="text-white ml-3">ON</span>
            <div className="rounded-full w-8 h-8 mr-1 bg-white"></div>
          </>
        ) : (
          <>
            <div className="rounded-full w-8 h-8 ml-1 bg-white"></div>
            <span className="text-white mr-2">OFF</span>
          </>
        )}
      </div>
    </section>
  );
};

export default NovelTitle;
