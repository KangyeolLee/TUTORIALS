import React, { useState } from "react";
import NovelList from "@components/layouts/NovelList";
import NovelDescription from "@components/layouts/NovelDescription";
import Contributors from "@components/layouts/Contributors";
import UserModal from "@components/layouts/UserModal";
import NovelListWrapper from "@components/layouts/NovelListWrapper";

const NovelDetail = () => {
  const [modalStatus, setModalStatus] = useState(false);

  const openUserModal = () => {
    setModalStatus((prev) => !prev);
  };

  return (
    <section className="sm:container px-5 md:px-10 mx-auto my-16">
      <NovelDescription title="이것은 소설의 제목입니다" writer="Gian95" />

      <Contributors openUserModal={openUserModal} />

      <NovelListWrapper list={dummyData} />

      {modalStatus && <UserModal handleSubmitBtn={openUserModal} />}
    </section>
  );
};

export default NovelDetail;

const dummyData = [
  { num: 1, title: "프롤로그" },
  { num: 2, title: "가자 디지몬 친구들" },
  { num: 3, title: "동해물과" },
  { num: 4, title: "백두산이" },
  { num: 5, title: "마르고 닳도록" },
  { num: 6, title: "하나님이 보우하사" },
  { num: 7, title: "우리나라 만세" },
];
