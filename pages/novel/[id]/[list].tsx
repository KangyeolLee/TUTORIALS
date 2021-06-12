import Comments from "@components/layouts/Comments";
import CommentsBlind from "@components/layouts/CommentsBlind";
import Misson from "@components/layouts/Misson";
import CommentModal from "@components/layouts/CommentModal";
import NovelContentForContribution from "@components/layouts/NovelContentForContribution";
import NovelContentForReading from "@components/layouts/NovelContentForReading";
import TabBar from "@components/layouts/TabBar";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const NovelPage = () => {
  const router = useRouter();
  const [editStatus, setEditStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [tabStatus, setTabStatus] = useState({ active: "opinion" });
  const { list } = router.query;

  const handleToggleBtn = () => {
    setEditStatus((prev) => !prev);
  };

  const handleSubmitBtn = () => {
    setModalStatus((prev) => !prev);
  };

  return (
    <section className="sm:container px-5 md:px-10 mx-auto my-16">
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

      <section className="relative">
        {editStatus ? (
          <NovelContentForContribution handleSubmitBtn={handleSubmitBtn} />
        ) : (
          <NovelContentForReading />
        )}

        <div className="text-center text-gray-400">1 / 20</div>
        <BsChevronLeft className="hidden mob:block absolute top-1/2 left-0 text-5xl hover:opacity-50 cursor-pointer" />
        <BsChevronRight className="hidden mob:block absolute top-1/2 right-0 text-5xl hover:opacity-50 cursor-pointer" />
      </section>

      {editStatus ? (
        <TabBar setTabStatus={setTabStatus} tabStatus={tabStatus}>
          {tabStatus.active === "opinion" ? <Comments /> : <Misson />}
        </TabBar>
      ) : (
        <CommentsBlind handleToggleBtn={handleToggleBtn} />
      )}

      {modalStatus && <CommentModal handleSubmitBtn={handleSubmitBtn} />}
    </section>
  );
};

export default NovelPage;
