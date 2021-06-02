import React from "react";
import Image from "next/image";

const Contributors = () => {
  return (
    <>
      <h1 className="mt-14 mb-2 text-2xl font-bold">기여자 랭킹</h1>
      <div className="border rounded-md p-6 mob:p-10">
        <div className="flex gap-3 mob:gap-5 my-2">
          <Image src="/img/gold.svg" alt="gold medal" width={30} height={30} />
          <h1 className="font-bold">nickname</h1>
          <Image src="/img/vote.svg" alt="vote" width={30} height={30} />
          <p>21회</p>
        </div>

        <div className="flex gap-3 mob:gap-5 my-2">
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

        <div className="flex gap-3 mob:gap-5 my-2">
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
    </>
  );
};

export default Contributors;
