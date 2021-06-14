import React, { VFC } from "react";
import NovelContentForContribution from "./NovelContentForContribution";
import NovelContentForReading from "./NovelContentForReading";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface Props {
  handleSubmitBtn: () => void;
  editStatus: boolean;
}

const NovelDetails: VFC<Props> = ({ editStatus, handleSubmitBtn }) => {
  return (
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
  );
};

export default NovelDetails;
