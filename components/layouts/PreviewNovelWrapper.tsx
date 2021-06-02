import PreviewNovel from "./PreviewNovel";

const PreviewNovelWrapper = () => {
  return (
    <section className="grid grid-cols-1 mob:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-10">
      <PreviewNovel />
      <PreviewNovel />
      <PreviewNovel />
      <PreviewNovel />
      <PreviewNovel />
      <PreviewNovel />
      <PreviewNovel />
      <PreviewNovel />
      <PreviewNovel />
      <PreviewNovel />
    </section>
  );
};

export default PreviewNovelWrapper;
