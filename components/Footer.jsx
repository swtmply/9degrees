import Image from "next/image";
import React from "react";

import FooterBG from "public/bg/Footer.png";
import logo from "public/svgs/logo-white.svg";

import { XCircleIcon } from "@heroicons/react/solid";

export default function Footer() {
  return (
    <div className="relative w-full max-h-[700px] py-8 z-50">
      <div className="absolute top-0 w-[100%] h-[100%] pointer-events-none">
        <Image src={FooterBG} layout="fill" objectFit="cover" />
      </div>

      <div className="w-full flex flex-col justify-center items-center text-white relative">
        <div className="flex flex-col">
          <Image src={logo} width="150px" height="250px" />
        </div>
        <div className="flex flex-col justify-center items-center space-y-2">
          <p className="uppercase font-semibold">Follow our Socials:</p>
          <div className="flex space-x-2">
            <XCircleIcon className="w-12 h-12" />
            <XCircleIcon className="w-12 h-12" />
            <XCircleIcon className="w-12 h-12" />
          </div>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-4 lg:flex lg:w-[80%] lg:max-w-[1380px] min-h-max justify-between">
          <div>
            <p className="uppercase font-bold lg:mb-8 mb-4">news</p>
            <p>Nation</p>
            <p>University</p>
            <p>alt0176</p>
          </div>
          <div>
            <p className="uppercase font-bold lg:mb-8 mb-4">features</p>
            <p>Profiles</p>
            <p>Opinion</p>
            <p>In Photos</p>
          </div>
          <div>
            <p className="uppercase font-bold lg:mb-8 mb-4">community</p>
            <p>Catwalk</p>
            <p>Anonas Street</p>
          </div>
          <div>
            <p className="uppercase font-bold lg:mb-8 mb-4">
              Cultures and <br /> Lifestyle
            </p>
            <p>Life</p>
            <p>Entertainment</p>
            <p>Food & Travel</p>
            <p>New normal</p>
          </div>
          <div>
            <p className="uppercase font-bold lg:mb-8 mb-4">so lit!</p>
          </div>
          <div>
            <p className="uppercase font-bold lg:mb-8 mb-4">9°</p>
            <p>Cover Story</p>
            <p>We Are 9°</p>
          </div>
        </div>
      </div>
    </div>
  );
}
