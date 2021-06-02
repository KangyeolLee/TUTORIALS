import Image from "next/image";
import Link from "next/link";

const PreviewNovel = () => {
  return (
    <Link href="/novel/today">
      <a className="flex flex-col cursor-pointer transition transform duration-500 ease-in-out hover:opacity-60 hover:-translate-y-1">
        <div className="w-full h-56 relative">
          <Image
            src="/img/coverImg.PNG"
            alt=""
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        <div className="my-5">
          <div className="flex justify-between">
            <h6 className="font-bold">책제목</h6>
            <span>작가</span>
          </div>

          <p>대충의 줄거리 대충의 줄거리 대충의 줄거리</p>
        </div>
      </a>
    </Link>
  );
};

export default PreviewNovel;
