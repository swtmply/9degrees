import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FullWidth({ article }) {
  return (
    <Link href="/">
      <div className="w-full bg-gray-400 flex justify-center">
        <div className="w-[80%] bg-gray-300">
          <div className="flex space-x-4">
            <div className="h-full w-[400px] relative">
              <Image src={article.image} layout="fill" objectFit="cover" />
            </div>
            <div className="flex flex-col space-x-4">
              <p>{article.category}</p>
              <p>{article.title}</p>
              <p>
                9Degrees <span>{article.createdAt}</span>
              </p>
              <p>Body Introduction</p>
              <p>Continue Reading %rarr</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
