import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="h-72 sm:h-96 relative z-0">
      <Image
        src="https://clayworks.space/wp-content/uploads/2013/10/contact-banner-image-scaled.jpg"
        alt="배너이미지"
        layout="fill"
        objectFit="cover"
      />
    </section>
  );
};

export default Banner;
