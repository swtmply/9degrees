import { categoryList } from "@/lib/constants";
import { convertFromRaw } from "draft-js";
import moment from "moment";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Stack({ article }) {
  const getFirstBlock = (body) => {
    const firstBlock = convertFromRaw(JSON.parse(body)).getFirstBlock();

    return <p className="text-sm">{firstBlock.getText()}</p>;
  };

  const categories = categoryList.filter(
    (cat) => cat.value === article?.category
  );

  return (
    <Link href={`/articles/a/${article._id}`}>
      <div className="bg-white lg:w-[48%] mb-56 cursor-pointer relative">
        <div className="relative w-full aspect-[3/2]">
          <Image
            src={article.image}
            alt="Article Image"
            layout="fill"
            objectFit="cover"
            className="hover:scale-125 transition-all"
          />
        </div>
        <div className="text-center w-[90%] bg-white rounded space-y-2 p-4 absolute ml-auto mr-auto left-0 right-0 top-72">
          <p className={`absolute ml-auto mr-auto left-0 right-0 -top-4`}>
            <span
              className={`${categories[0].color} uppercase w-max font-bold text-sm px-4 py-2 text-[#fff] rounded-lg`}
            >
              {article.subsection.replace(/-/g, " ")}
            </span>
          </p>
          <p className="font-bold text-xl">{article.title}</p>
          <p className="font-mono text-xs space-x-2">
            <span className="font-black">By: {article.writer}</span>
            <span className="text-gray-400">
              {moment(article.createdAt).startOf("hour").fromNow()}
            </span>
          </p>
          {getFirstBlock(article.body)}
        </div>
      </div>
    </Link>
  );
}
