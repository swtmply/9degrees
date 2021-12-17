import Image from "next/image";
import React from "react";

import adPlaceholder from "public/samples/ad-placeholder.png";

export default function HorizontalAd() {
  return (
    <div className="lg:max-w-[900px] lg:h-[100px] w-[90%] my-20 h-[100px] bg-padeepBlue relative">
      <Image src={adPlaceholder} layout="fill" objectFit="cover" />
    </div>
  );
}
