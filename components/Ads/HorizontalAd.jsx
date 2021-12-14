import Image from "next/image";
import React from "react";

import adPlaceholder from "public/ad-placeholder.png";

export default function HorizontalAd() {
  return (
    <div className="lg:w-[80%] lg:h-[200px] w-[90%] h-[100px] bg-padeepBlue relative">
      <Image src={adPlaceholder} layout="fill" objectFit="cover" />
    </div>
  );
}
