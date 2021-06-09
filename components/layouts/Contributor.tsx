import React from "react";
import Image from "next/image";

interface Props {
  nickname: string;
  count: number;
  rank: number;
  openUserModal: () => void;
}

const Contributor = ({ nickname, count, rank, openUserModal }: Props) => {
  const medal = rank === 1 ? "gold" : rank === 2 ? "silver" : "bronze";

  return (
    <div
      onClick={openUserModal}
      className="flex justify-between gap-2 sm:gap-4 my-2 cursor-pointer hover:bg-gray-200 border rounded-md p-3"
    >
      <div className="flex gap-2 md:gap-4">
        <Image
          src={`/img/${medal}.svg`}
          alt="gold medal"
          width={30}
          height={30}
        />
        <h1>
          <strong>{nickname}</strong> 님
        </h1>
      </div>

      <div className="flex gap-2 md:gap-4">
        <Image src="/img/vote.svg" alt="vote" width={30} height={30} />
        <p>{count}회</p>
      </div>
    </div>
  );
};

export default Contributor;
