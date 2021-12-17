import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RowArticle({ article }) {
  return (
    <Link href={`/articles/a/${article._id}`}>
      <div className="flex flex-col w-full h-[420px] cursor-pointer relative ">
        <Image
          src={article.image}
          layout="fill"
          objectFit="cover"
          className="hover:scale-125 transition-all"
        />

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
