import React, { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";

import wordMark from "public/wordmark-white.svg";
import iconMark from "public/iconmark-white.svg";

import Image from "next/image";
import { SearchIcon } from "@heroicons/react/solid";

export default function Nav() {
  const [navbarState, setNavbarState] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 630) {
      setNavbarState(true);
    } else {
      setNavbarState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="flex justify-between items-center w-full bg-black px-4 py-2 fixed top-0 z-10 text-white">
      <Link href="/">
        {navbarState ? (
          <Image
            src={iconMark}
            alt="Nine Degree Icon Mark"
            height="64px"
            width="64px"
            className="cursor-pointer"
          />
        ) : (
          <HomeIcon className="w-8 h-8 cursor-pointer hover:text-yellowwallow" />
        )}
      </Link>
      <Image
        src={wordMark}
        alt="Nine Degree Word Mark"
        height="70px"
        width="80px"
      />
      <SearchIcon className="w-8 h-8 cursor-pointer hover:text-yellowwallow" />
    </div>
  );
}
