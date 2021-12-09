import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { convertFromRaw } from "draft-js";

// NOTE: di pa final xd pero buo na siya para sa future

export function LatestArticle({ article }) {
  const firstBlock = convertFromRaw(JSON.parse(article.body)).getFirstBlock();

  return (
    <div>
      <Link href={`/articles/${article._id}`}>
        <div className="flex items-end space-x-4">
          <div className="w-[400px] h-[400px] relative cursor-pointer">
            <Image src={article.image} layout="fill" objectFit="cover" />
          </div>
          <div className="w-[60%] flex-grow space-y-4 cursor-pointer">
            <p className="uppercase font-bold text-sm px-4 py-2 bg-confusedPurple text-[#fff] w-min rounded-lg">
              {article.category}
            </p>

            <div className="space-y-1">
              <h1 className="font-bold text-2xl text-black uppercase tracking-wide">
                {article.title}
              </h1>
              <p className="font-semibold text-xs">
                By: {article.writer}{" "}
                <span className="text-gray-400 ml-2">
                  {moment(article.createdAt).startOf("hour").fromNow()}
                </span>
              </p>
            </div>

            <div>{firstBlock.getText()}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function ArticleComponent({ article }) {
  const [openOverlay, setOpenOverlay] = useState(false);

  return (
    <div
      className="flex flex-col w-[400px] cursor-pointer"
      onMouseEnter={() => setOpenOverlay((a) => !a)}
      onMouseLeave={() => setOpenOverlay((a) => !a)}
    >
      <Link href={`/articles/${article._id}`}>
        <div className="relative">
          <Image src={article.image} width="400px" height="400px" />
          <div
            className={`${
              !openOverlay ? "hidden" : ""
            } pointer-events-none absolute inset-0 px-8 py-32 text-center bg-black bg-opacity-40 text-white`}
          >
            <h1 className="font-black text-lg">{article.title}</h1>
            <p>By: {article.writer}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
