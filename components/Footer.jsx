import Image from "next/image";
import React from "react";

import FooterBG from "public/bg/Footer.png";
import logo from "public/svgs/logo-white.svg";

import { XCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative w-full max-h-[700px] py-8 mt-16">
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
          <div className="cursor-pointer ">
            <Link href="/articles/c/news">
              <p className="uppercase font-bold lg:mb-8 mb-4">news</p>
            </Link>
            <Link href="/articles/s/nation">
              <p>Nation</p>
            </Link>
            <Link href="/articles/s/university">
              <p>University</p>
            </Link>
            <Link href="/articles/s/alt0176">
              <p>alt0176</p>
            </Link>
          </div>
          <div className="cursor-pointer ">
            <Link href="/articles/c/features">
              <p className="uppercase font-bold lg:mb-8 mb-4">features</p>
            </Link>
            <Link href="/articles/s/profiles">
              <p>Profiles</p>
            </Link>
            <Link href="/articles/s/opinion">
              <p>Opinion</p>
            </Link>
            <Link href="/articles/s/in-photos">
              <p>In Photos</p>
            </Link>
          </div>
          <div className="cursor-pointer ">
            <Link href="/articles/c/community">
              <p className="uppercase font-bold lg:mb-8 mb-4">community</p>
            </Link>
            <Link href="/articles/s/catwalk">
              <p>Catwalk</p>
            </Link>
            <Link href="/articles/s/anonas-street">
              <p>Anonas Street</p>
            </Link>
          </div>
          <div className="cursor-pointer ">
            <Link href="/articles/c/cultures-lifestyle">
              <p className="uppercase font-bold lg:mb-8 mb-4">
                Cultures and <br /> Lifestyle
              </p>
            </Link>
            <Link href="/articles/c/life">
              <p>Life</p>
            </Link>
            <Link href="/articles/s/entertainment">
              <p>Entertainment</p>
            </Link>
            <Link href="/articles/s/food-and-travel">
              <p>Food & Travel</p>
            </Link>
            <Link href="/articles/s/new-normal">
              <p>New Normal</p>
            </Link>
          </div>
          <div className="cursor-pointer ">
            <Link href="/articles/c/so-lit">
              <p className="uppercase font-bold lg:mb-8 mb-4">So LIT!</p>
            </Link>
          </div>
          <div className="cursor-pointer ">
            <Link href="/nine-degrees">
              <p className="uppercase font-bold lg:mb-8 mb-4">9°</p>
            </Link>
            <Link href="/">
              <p>Cover Story</p>
            </Link>
            <Link href="/">
              <p>We Are 9°</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
