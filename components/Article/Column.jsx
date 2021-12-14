import { categoryList } from "@/lib/constants";
import { convertFromRaw } from "draft-js";
import useMediaQuery from "hooks/useMediaQuery";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function ColumnArticle({ article }) {
  const firstBlock = convertFromRaw(JSON.parse(article.body)).getFirstBlock();
  const [categories, setCategories] = useState(() => {
    return categoryList.filter((cat) => cat.value === article?.category);
  });

  const { width } = useMediaQuery();

  const slidesPerView = () => {
    if (width < 640) {
      return firstBlock.getText().substring(0, 150) + "...";
    } else {
      return firstBlock.getText();
    }
  };

  return (
    <Link href={`/articles/a/${article._id}`}>
      <div className="flex flex-col items-center justify-center lg:space-x-4 lg:flex-row lg:items-end lg:justify-start">
        <div className="w-[400px] h-[400px] relative cursor-pointer">
          <Image src={article.image} layout="fill" objectFit="cover" />
        </div>
        <div className="lg:w-[60%] lg:items-start lg:justify-start flex flex-col justify-center items-center flex-grow space-y-4 cursor-pointer">
          <p
            className={`${categories[0].color} uppercase w-max font-bold text-sm mt-2 lg:mt-0 px-8 py-2 text-[#fff] rounded-lg`}
          >
            {categories[0].name}
          </p>

          <div className="space-y-1 lg:text-left text-center">
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

          <div className="lg:text-left text-center">{slidesPerView()}</div>
        </div>
      </div>
    </Link>
  );
}
