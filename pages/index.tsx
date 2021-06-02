import Banner from "@components/layouts/Banner";
import PreviewNovelWrapper from "@components/layouts/PreviewNovelWrapper";

export default function Home() {
  return (
    <>
      <Banner />
      <div className="container px-5 md:px-10 mx-auto">
        <h1 className="text-3xl my-10 font-bold">오늘의 연재</h1>
        <PreviewNovelWrapper />
      </div>
    </>
  );
}
