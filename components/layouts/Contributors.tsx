import React from "react";
import Image from "next/image";
import Contributor from "./Contributor";

const Contributors = () => {
  return (
    <>
      <h1 className="mt-14 mb-2 text-2xl font-bold">기여자 랭킹</h1>
      <div className="border rounded-md p-6 sm:p-8">
        <div className="grid sm:gap-5 grid-flow-row sm:grid-cols-2">
          <div className="grid grid-rows-5">
            <Contributor nickname={"오늘의소설"} count={21} rank={1} />
            <Contributor nickname={"내일의소설"} count={15} rank={2} />
            <Contributor nickname={"어제의소설"} count={11} rank={3} />
            <Contributor nickname={"모레의소설"} count={9} rank={4} />
            <Contributor nickname={"이레의소설"} count={8} rank={5} />
          </div>

          <div className="grid grid-rows-5">
            <Contributor nickname={"나는야소설"} count={5} rank={6} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contributors;
