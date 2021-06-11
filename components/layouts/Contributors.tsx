import { ContributorType } from "@dummy/dummyType";
import React, { VFC } from "react";
import Contributor from "./Contributor";

interface Props {
  openUserModal: () => void;
  contributors: ContributorType[];
}

const LIMIT_PER_CONTRIBUTOR = 5;

const Contributors: VFC<Props> = ({ openUserModal, contributors }) => {
  return (
    <section>
      <h1 className="mt-14 mb-2 text-2xl font-bold">기여자 랭킹</h1>
      <article className="border rounded-md p-6 sm:p-8">
        <div className="grid sm:gap-5 grid-flow-row sm:grid-cols-2">
          <div className="grid grid-rows-5">
            {contributors.length &&
              contributors
                .slice(0, LIMIT_PER_CONTRIBUTOR)
                .map((contributor) => (
                  <Contributor
                    key={contributor.id}
                    nickname={contributor.nickname}
                    count={contributor.count}
                    rank={contributor.rank}
                    openUserModal={openUserModal}
                  />
                ))}
          </div>

          <div className="grid grid-rows-5">
            {contributors.length &&
              contributors
                .slice(LIMIT_PER_CONTRIBUTOR)
                .map((contributor) => (
                  <Contributor
                    key={contributor.id}
                    nickname={contributor.nickname}
                    count={contributor.count}
                    rank={contributor.rank}
                    openUserModal={openUserModal}
                  />
                ))}
          </div>
        </div>
      </article>
    </section>
  );
};

export default Contributors;
