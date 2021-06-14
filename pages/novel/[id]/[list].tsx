import Comments from "@components/layouts/Comments";
import CommentsBlind from "@components/layouts/CommentsBlind";
import Misson from "@components/layouts/Misson";
import CommentModal from "@components/layouts/CommentModal";
import NovelContentForContribution from "@components/layouts/NovelContentForContribution";
import NovelContentForReading from "@components/layouts/NovelContentForReading";
import TabBar from "@components/layouts/TabBar";
import { useRouter } from "next/router";
import { useState } from "react";
import NovelTitle from "@components/layouts/NovelTitle";
import NovelDetails from "@components/layouts/NovelDetails";

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
      <NovelTitle
        list={list}
        editStatus={editStatus}
        handleToggleBtn={handleToggleBtn}
      />

      <NovelDetails editStatus={editStatus} handleSubmitBtn={handleSubmitBtn} />

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
