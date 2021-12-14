import React, { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";

import wordMark from "public/wordmark-white.svg";
import iconMark from "public/iconmark-white.svg";

import Image from "next/image";
import { SearchIcon, XIcon } from "@heroicons/react/solid";
import Search from "../Search";
import useMediaQuery from "@/hooks/useMediaQuery";
import MobileNav from "./Mobile/MobileNav";

export default function Nav({ breakpoint }) {
  const [navbarState, setNavbarState] = useState(false);
  const [searchState, setSearchState] = useState(false);

  const { width } = useMediaQuery();

  const handleScroll = () => {
    if (window.scrollY >= breakpoint) {
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

  if (width < 640) {
    return <MobileNav />;
  } else {
    return (
      <div
        className={`${
          searchState && "z-[11]"
        } flex justify-between items-center w-full bg-black px-4 py-2 fixed top-0 z-10 text-white`}
      >
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

        {searchState ? (
          <Search />
        ) : (
          <Link href="/">
            <Image
              src={wordMark}
              alt="Nine Degree Word Mark"
              height="70px"
              width="80px"
            />
          </Link>
        )}

        <button onClick={() => setSearchState(!searchState)}>
          {!searchState ? (
            <SearchIcon className="w-8 h-8 cursor-pointer hover:text-yellowwallow" />
          ) : (
            <XIcon className="w-8 h-8 cursor-pointer hover:text-yellowwallow" />
          )}
        </button>
      </div>
    );
  }
}
