import { VFC } from "react";
import Link from "next/link";
import { FiUser, FiThumbsUp, FiMessageCircle } from "react-icons/fi";

type Props = {
  num: number;
  title: string;
};

const NovelList: VFC<Props> = ({ num, title }) => {
  return (
    <Link href={`/novel/today/${num}.${title}`}>
      <a className="block pt-5 pb-2 hover:opacity-60 cursor-pointer">
        <div className="flex items-center gap-5 mb-2">
          <h1 className="text-3xl font-bold">#{num}.</h1>
          <span className="font-bold">{title}</span>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-5">
            <div className="flex items-center gap-3">
              <FiUser />
              <span>10,902</span>
            </div>

            <div className="flex items-center gap-3">
              <FiThumbsUp />
              <span>10,902</span>
            </div>

            <div className="flex items-center gap-3">
              <FiMessageCircle />
              <span>102</span>
            </div>
          </div>

          <div className="font-bold">2021.05.21</div>
        </div>
      </a>
    </Link>
  );
};

export default NovelList;
