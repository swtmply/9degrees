import Image from "next/image";
import React from "react";

import iconMark from "public/iconmark-white.svg";
import logo from "public/logo-white.svg";

import { XCircleIcon } from "@heroicons/react/solid";

export default function Footer() {
  return (
    <div className="relative">
      <div className="absolute top-0 z-40 w-[100%] h-[100%] pointer-events-none">
        <Image
          className="opacity-30"
          src={iconMark}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="h-[100vh] bg-black mt-10 space-y-8 flex flex-col justify-center items-center text-white relative">
        <div className="flex flex-col">
          <Image src={logo} width="200px" height="300px" />
        </div>
        <div className="flex flex-col justify-center items-center space-y-4">
          <p className="uppercase font-semibold">Follow us on our Socials:</p>
          <div className="flex space-x-4">
            <XCircleIcon className="w-16 h-16" />
            <XCircleIcon className="w-16 h-16" />
            <XCircleIcon className="w-16 h-16" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:flex lg:w-[80%] min-h-max justify-between">
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
