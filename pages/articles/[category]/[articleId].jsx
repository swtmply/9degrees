import { categoryList } from "@/lib/constants";
import axios from "axios";
import { convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import moment from "moment";
import Image from "next/image";
import { useRef } from "react";

import placeholder from "public/ad-placeholder.png";
import Nav from "@/components/Nav";
import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";
import { XCircleIcon } from "@heroicons/react/solid";

// Needs Styling
// final location (pending)

export default function Article({ article }) {
  const rawContentState = JSON.parse(article.body);
  const markup = draftToHtml(rawContentState, {});
  const containerRef = useRef();

  const categoryColor = categoryList.filter(
    (category) => category.value === article.category
  );

  return (
    <div className="min-h-screen w-full flex flex-col gap-20">
      <Nav />

      <main className="space-y-20 grid place-items-center">
        <div className="relative w-full h-[40vh]">
          <Image
            src={placeholder}
            alt="hero image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <NavMenu breakpoint={400} />

        <div className="flex flex-col w-full space-y-8 items-center">
          <p>
            <span
              className={`${categoryColor[0].color} uppercase w-max font-bold text-sm px-8 py-2 text-[#fff] rounded-lg`}
            >
              {article.subsection.replace(/-/g, " ")}
            </span>
          </p>

          <h1 className="text-6xl font-bold max-w-[80%] text-center">
            {article.title}
          </h1>

          <p className="font-mono text-lg space-x-2">
            <span className="font-black">By: {article.writer}</span>
            <span className="text-gray-400">
              {moment(article.createdAt).startOf("hour").fromNow()}
            </span>
          </p>
        </div>

        <div className="w-[80%] flex flex-col space-y-16">
          <div className="relative w-full h-[80vh] aspect-square">
            <Image
              src={article.image}
              alt="Article Image"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="w-full flex justify-between">
            <article className="w-[80%]">
              <div
                className="content"
                ref={containerRef}
                dangerouslySetInnerHTML={{
                  __html: markup,
                }}
              ></div>
            </article>

            <div className="space-y-5">
              <div className="w-[200px]">
                <p className="uppercase font-semibold">Follow our Socials:</p>
                <div className="flex space-x-4">
                  <XCircleIcon className="w-16 h-16" />
                  <XCircleIcon className="w-16 h-16" />
                  <XCircleIcon className="w-16 h-16" />
                </div>
              </div>
              <div className="w-[200px] h-[400px] relative bg-confusedPurple">
                <Image src={placeholder} layout="fill" objectFit="cover" />
              </div>
              <div className="w-[200px] h-[700px] relative bg-degreen">
                <Image src={placeholder} layout="fill" objectFit="cover" />
              </div>
            </div>
          </div>
        </div>

        {/* TODO: Tags */}

        {/* TODO: Writer Profile */}
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  // for static paths/URL

  const res = await axios
    .get("http://localhost:3000/api/articles")
    .then((res) => res.data);

  const paths = res.articles.map((article) => ({
    params: { category: article.category, articleId: article._id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // get data for specific id

  const res = await axios
    .get(`http://localhost:3000/api/articles/${params.articleId}`)
    .then((res) => res.data);

  return {
    props: {
      article: res.article,
    },
    // revalidate data every 10 seconds
    revalidate: 10,
  };
}
