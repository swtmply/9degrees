import Image from "next/image";
import Link from "next/link";
import { getArticles } from "pages";
import React, { useState } from "react";
import { useQuery } from "react-query";

export default function Search() {
  const { data } = useQuery(["articles"], getArticles);

  const [filteredArticles, setfilteredArticles] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setfilteredArticles([]);
    } else {
      const filteredArray = data?.articles.filter((value) => {
        return value.title.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setfilteredArticles(filteredArray);
    }
  };

  return (
    <div className="h-[70px] lg:w-[30%] w-full">
      <div className="border-b border-white py-2 relative">
        <input
          className="font-mono focus:ring-transparent w-full text-xl text-white bg-transparent outline-none border-none "
          type="text"
          onChange={handleFilter}
          placeholder="type something..."
        />
        {filteredArticles.length !== 0 && (
          <div className="absolute max-h-[70vh] w-full mt-2 z-50 bg-yellowwallow rounded overflow-y-scroll no-scrollbar">
            {filteredArticles.map((article) => {
              return (
                <Link href={`/articles/a/${article._id}`}>
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
                    <p className="text-black font-semibold">{article.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
