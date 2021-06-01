import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="h-72 sm:h-96 relative z-0">
      <Image
        src="https://novelpia.com/img/new/event/money_copy1/pc/event_board.png"
        alt=""
        layout="fill"
        objectFit="cover"
      />
    </section>
  );
};

export default Banner;
