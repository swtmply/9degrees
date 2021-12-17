import { XCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";

import adPlaceholder from "public/samples/ad-placeholder.png";

export default function VerticalAd() {
  return (
    <div className="lg:flex max-h-[1000px] sticky top-0 flex-col space-y-5 hidden">
      <div className="w-[200px]">
        <p className="uppercase font-semibold">Follow our Socials:</p>
        <div className="flex space-x-4">
          <XCircleIcon className="w-16 h-16" />
          <XCircleIcon className="w-16 h-16" />
          <XCircleIcon className="w-16 h-16" />
        </div>
      </div>
      <div className="w-[200px] h-[400px] relative bg-confusedPurple">
        <Image src={adPlaceholder} layout="fill" objectFit="cover" />
      </div>
      <div className="w-[200px] h-[600px] relative bg-degreen">
        <Image src={adPlaceholder} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
}
