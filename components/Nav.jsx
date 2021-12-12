import React, { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";

import wordMark from "public/wordmark-white.svg";
import iconMark from "public/iconmark-white.svg";

import Image from "next/image";
import { SearchIcon, XIcon } from "@heroicons/react/solid";
import { getArticles } from "pages";
import { useQuery } from "react-query";

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

  const { data, isLoading } = useQuery(["articles"], getArticles);

  const [searchState, setSearchState] = useState(false);
  const [filteredArticles, setfilteredArticles] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setfilteredArticles([]);
    } else {
      const filteredArray = data.articles.filter((value) => {
        return value.title.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setfilteredArticles(filteredArray);
    }
  };

  if (isLoading) return <p>Loading...</p>;

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

      {searchState ? (
        <div className="h-[70px] w-[30%]">
          <div className="border-b border-white py-2 relative">
            <input
              className="font-mono focus:ring-transparent w-full text-xl text-white bg-transparent outline-none border-none "
              type="text"
              onChange={handleFilter}
              placeholder="type something..."
            />
            {filteredArticles.length !== 0 && (
              <div className="absolute w-full mt-2 z-50 bg-yellowwallow rounded ">
                {filteredArticles.map((article) => {
                  return (
                    <div
                      key={article._id}
                      className="flex items-center hover:bg-gray-200 hover:bg-opacity-50 p-4 space-x-6 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full relative">
                        <span className="opacity-0">image placeholder</span>
                        <Image
                          className="rounded-full"
                          src={article.image}
                          alt={"small article image"}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <p className="text-black font-semibold">
                        {article.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Image
          src={wordMark}
          alt="Nine Degree Word Mark"
          height="70px"
          width="80px"
        />
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
