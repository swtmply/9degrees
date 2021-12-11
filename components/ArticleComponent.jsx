import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { convertFromRaw } from "draft-js";
import { categoryList } from "@/lib/constants";

// NOTE: di pa final xd pero buo na siya para sa future

export function LatestArticle({ article }) {
  const firstBlock = convertFromRaw(JSON.parse(article.body)).getFirstBlock();
  const [categories, setCategories] = useState(() => {
    return categoryList.filter((cat) => cat.value === article?.category);
  });

  return (
    <div>
      <Link href={`/articles/${article._id}`}>
        <div className="flex items-end space-x-4">
          <div className="w-[400px] h-[400px] relative cursor-pointer">
            <Image src={article.image} layout="fill" objectFit="cover" />
          </div>
          <div className="w-[60%] flex-grow space-y-4 cursor-pointer">
            <p
              className={`${categories[0].color} uppercase w-max font-bold text-sm px-4 py-2 text-[#fff] rounded-lg`}
            >
              {categories[0].name}
            </p>

            <div className="space-y-1">
              <h1 className="font-bold text-2xl text-black tracking-wide">
                {article.title}
              </h1>
              <p className="font-mono font-bold text-xs">
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
  return (
    <Link href={`/articles/${article._id}`}>
      <div className="flex flex-col cursor-pointer relative">
        <Image src={article.image} width="400px" height="400px" />

        <div
          className={`pointer-events-none absolute inset-0 px-8 py-32 text-center bg-black bg-opacity-40 text-white`}
        >
          <h1 className="font-black text-lg">{article.title}</h1>
          <p className="font-mono text-xs">By: {article.writer}</p>
        </div>
      </div>
    </Link>
  );
}
