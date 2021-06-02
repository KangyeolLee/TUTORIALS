import { useRouter } from "next/router";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight, BsPlusSquare } from "react-icons/bs";
import { FiThumbsUp, FiMessageCircle } from "react-icons/fi";

const NovelPage = () => {
  const router = useRouter();
  const [editStatus, setEditStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const { list } = router.query;

  const handleToggleBtn = () => {
    setEditStatus((prev) => !prev);
  };

  const handleSubmitBtn = () => {
    setModalStatus((prev) => !prev);
  };

  return (
    <section className="sm:container sm:mx-auto md:px-10 my-16">
      <div className="flex justify-between">
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
      </div>

      <div className="relative">
        {editStatus ? (
          <div className="py-20 px-28 text-2xl leading-loose">
            <span className="relative rounded-xl bg-green-100">
              <BsPlusSquare
                onClick={handleSubmitBtn}
                className="text-gray-300 hover:text-gray-800 absolute top-1/2 transform -translate-y-1/2 -left-10 cursor-pointer hover:opacity-75"
              />
              동해물과 동해물과
            </span>
            <div className="relative">
              <BsPlusSquare
                onClick={handleSubmitBtn}
                className="text-gray-300 absolute top-1/2 transform -translate-y-1/2 -left-10 cursor-pointer hover:opacity-75 hover:text-gray-800"
              />
              백두산이 마르고
            </div>
            <span className="relative rounded-xl bg-purple-100">
              <BsPlusSquare
                onClick={handleSubmitBtn}
                className="text-gray-300 hover:text-gray-800 absolute top-1/2 transform -translate-y-1/2 -left-10 cursor-pointer hover:opacity-75"
              />
              닳도록 닳도록
            </span>
            <div className="relative">
              <BsPlusSquare
                onClick={handleSubmitBtn}
                className="text-gray-300 hover:text-gray-800 absolute top-1/2 transform -translate-y-1/2 -left-10 cursor-pointer hover:opacity-75"
              />
              하느님이 보우하사 우리나라 만세
            </div>
            <div className="relative">
              <BsPlusSquare
                onClick={handleSubmitBtn}
                className="text-gray-300 hover:text-gray-800 absolute top-1/2 transform -translate-y-1/2 -left-10 cursor-pointer hover:opacity-75"
              />
              무궁화 삼천리 화려강산
            </div>
            <div className="relative">
              <BsPlusSquare
                onClick={handleSubmitBtn}
                className="text-gray-300 hover:text-gray-800 absolute top-1/2 transform -translate-y-1/2 -left-10 cursor-pointer hover:opacity-75"
              />
              대한사람 대한으로 길이 보전하세
            </div>
            <br />
            <div className="relative">
              <BsPlusSquare
                onClick={handleSubmitBtn}
                className="text-gray-300 hover:text-gray-800 absolute top-1/2 transform -translate-y-1/2 -left-10 cursor-pointer hover:opacity-75"
              />
              남산 위의 저 소나무 철갑을 두른 듯
            </div>
            <div className="relative">
              <BsPlusSquare
                onClick={handleSubmitBtn}
                className="text-gray-300 hover:text-gray-800 absolute top-1/2 transform -translate-y-1/2 -left-10 cursor-pointer hover:opacity-75"
              />
              바람서리 불변함은 우리 기상일세
            </div>
            <div className="relative">
              <BsPlusSquare
                onClick={handleSubmitBtn}
                className="text-gray-300 hover:text-gray-800 absolute top-1/2 transform -translate-y-1/2 -left-10 cursor-pointer hover:opacity-75"
              />
              무궁화 삼천리 화려강산
            </div>
            <div className="relative">
              <BsPlusSquare
                onClick={handleSubmitBtn}
                className="text-gray-300 hover:text-gray-800 absolute top-1/2 transform -translate-y-1/2 -left-10 cursor-pointer hover:opacity-75"
              />
              대한사람 대한으로 길이 보전하세
            </div>
          </div>
        ) : (
          <pre className="py-20 px-28 text-2xl leading-loose">
            {`동해물과 동해물과
백두산이 마르고 
닳도록 닳도록
하느님이 보우하사 우리나라 만세 
무궁화 삼천리 화려강산 
대한사람 대한으로 길이 보전하세

남산 위의 저 소나무 철갑을 두른 듯
바람서리 불변함은 우리 기상일세
무궁화 삼천리 화려강산
대한사람 대한으로 길이 보전하세
`}
          </pre>
        )}

        <div className="text-center text-gray-400">1 / 20</div>
        <BsChevronLeft className="absolute top-1/2 left-0 text-5xl hover:opacity-50 cursor-pointer" />
        <BsChevronRight className="absolute top-1/2 right-0 text-5xl hover:opacity-50 cursor-pointer" />
      </div>

      {editStatus ? (
        <div className="flex flex-col gap-5 my-20">
          <div className="flex gap-2 justify-end">
            <div className="rounded-xl bg-blue-500 py-3 px-7 text-white font-bold cursor-pointer hover:opacity-75">
              의견
            </div>
            <div className="border rounded-xl py-3 px-7 cursor-pointer hover:opacity-75">
              미션
            </div>
          </div>

          <div className="cursor-pointer transition transform duration-100 ease-in-out hover:opacity-80 hover:-translate-y-1 flex flex-col gap-3 rounded-xl bg-green-100 p-5">
            <div className="flex justify-between">
              <h1 className="font-bold text-xl">AAA님의 코멘트</h1>
              <div className="bg-yellow-300 font-bold py-2 px-4 text-white rounded-xl">
                작가채택
              </div>
            </div>
            <pre>"동해물과"를 "동해물과 동해물과"로 변경하면 어떨까요?</pre>
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
                작가채택
              </div>
            </div>
            <pre>
              "닳도록 닳도록"을 추가하면 더 멋진 스토리가 될 것 같습니다!
            </pre>
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
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between gap-5 my-20 p-20 bg-blue-50 rounded-3xl text-center">
          <p className="text-2xl">
            총 <strong>2명</strong>의 의견이 작가에 의해 채택되었습니다.
          </p>
          <p className="text-xl">
            총 <strong>5명</strong>의 의견 있습니다.
          </p>
          <div
            onClick={handleToggleBtn}
            className="w-28 text-white font-bold rounded-lg p-4 bg-green-400 hover:opacity-75 cursor-pointer"
          >
            상세보기
          </div>
        </div>
      )}

      {modalStatus && (
        <div className="fixed flex flex-col justify-center top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50">
          <div className="flex flex-col gap-5 bg-white p-10 m-16 rounded-3xl">
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
      )}
    </section>
  );
};

export default NovelPage;
