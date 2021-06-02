import { VFC } from "react";
import { BsPlusSquare } from "react-icons/bs";

type Props = {
  handleSubmitBtn: () => void;
};

const NovelContentForContribution: VFC<Props> = ({ handleSubmitBtn }) => {
  return (
    <div className="leading-loose py-16 sm:py-20 px-10 sm:px-28 text-lg sm:text-2xl sm:leading-loose">
      <span className="relative rounded-xl bg-green-100">
        <BsPlusSquare
          onClick={handleSubmitBtn}
          className="text-gray-300 hover:text-gray-800 absolute top-1 -left-10 cursor-pointer hover:opacity-75"
        />
        동해물과 동해물과
      </span>
      <div className="relative">
        <BsPlusSquare
          onClick={handleSubmitBtn}
          className="text-gray-300 absolute top-3 -left-10 cursor-pointer hover:opacity-75 hover:text-gray-800"
        />
        백두산이 마르고
      </div>
      <span className="relative rounded-xl bg-purple-100">
        <BsPlusSquare
          onClick={handleSubmitBtn}
          className="text-gray-300 hover:text-gray-800 absolute top-1 -left-10 cursor-pointer hover:opacity-75"
        />
        닳도록 닳도록
      </span>
      <div className="relative">
        <BsPlusSquare
          onClick={handleSubmitBtn}
          className="text-gray-300 hover:text-gray-800 absolute top-3 -left-10 cursor-pointer hover:opacity-75"
        />
        하느님이 보우하사 우리나라 만세
      </div>
      <div className="relative">
        <BsPlusSquare
          onClick={handleSubmitBtn}
          className="text-gray-300 hover:text-gray-800 absolute top-3 -left-10 cursor-pointer hover:opacity-75"
        />
        무궁화 삼천리 화려강산
      </div>
      <div className="relative">
        <BsPlusSquare
          onClick={handleSubmitBtn}
          className="text-gray-300 hover:text-gray-800 absolute top-3 -left-10 cursor-pointer hover:opacity-75"
        />
        대한사람 대한으로 길이 보전하세
      </div>
      <br />
      <div className="relative">
        <BsPlusSquare
          onClick={handleSubmitBtn}
          className="text-gray-300 hover:text-gray-800 absolute top-3 -left-10 cursor-pointer hover:opacity-75"
        />
        남산 위의 저 소나무 철갑을 두른 듯
      </div>
      <div className="relative">
        <BsPlusSquare
          onClick={handleSubmitBtn}
          className="text-gray-300 hover:text-gray-800 absolute top-3 -left-10 cursor-pointer hover:opacity-75"
        />
        바람서리 불변함은 우리 기상일세
      </div>
      <div className="relative">
        <BsPlusSquare
          onClick={handleSubmitBtn}
          className="text-gray-300 hover:text-gray-800 absolute top-3 -left-10 cursor-pointer hover:opacity-75"
        />
        무궁화 삼천리 화려강산
      </div>
      <div className="relative">
        <BsPlusSquare
          onClick={handleSubmitBtn}
          className="text-gray-300 hover:text-gray-800 absolute top-3 -left-10 cursor-pointer hover:opacity-75"
        />
        대한사람 대한으로 길이 보전하세
      </div>
    </div>
  );
};

export default NovelContentForContribution;
