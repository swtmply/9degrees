import React from "react";
import Link from "next/link";
import Image from "next/image";

// NOTE: di pa final xd pero buo na siya para sa future

export default function ArticleComponent({ article }) {
  return (
    <div className="flex flex-col w-[400px]">
      <Link href={`/${article._id}`}>
        <div>
          <Image src={article.image} width="400px" height="300px" />
          <h1>{article.title}</h1>
        </div>
      </Link>
    </div>
  );
}
