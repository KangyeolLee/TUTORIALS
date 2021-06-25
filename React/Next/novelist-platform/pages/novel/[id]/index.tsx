import React, { useState } from "react";
import NovelDescription from "@components/layouts/Novels/NovelDescription";
import Contributors from "@components/layouts/Contributor/Contributors";
import UserModal from "@components/layouts/UserModal";
import NovelListWrapper from "@components/layouts/Novels/NovelListWrapper";
import { dummyContributors, dummyNovels } from "@dummy/dummyData";

const NovelDetail = () => {
  const [modalStatus, setModalStatus] = useState(false);

  const openUserModal = () => {
    setModalStatus((prev) => !prev);
  };

  return (
    <section className="sm:container px-5 md:px-10 mx-auto my-16">
      <NovelDescription title="이것은 소설의 제목입니다" writer="Gian95" />

      <Contributors
        openUserModal={openUserModal}
        contributors={dummyContributors}
      />

      <NovelListWrapper list={dummyNovels} />

      {modalStatus && <UserModal handleSubmitBtn={openUserModal} />}
    </section>
  );
};

export default NovelDetail;
