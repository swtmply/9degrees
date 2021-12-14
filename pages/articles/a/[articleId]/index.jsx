import { categoryList } from "@/lib/constants";
import mongoDBConnect from "@/lib/mongoDBConnect";
import axios from "axios";
import draftToHtml from "draftjs-to-html";
import moment from "moment";
import Image from "next/image";
import { useRef } from "react";

import placeholder from "public/ad-placeholder.png";
import Nav from "@/components/Navigation/Nav";
import NavMenu from "@/components/Navigation/NavMenu";
import Footer from "@/components/Footer";
import VerticalAd from "@/components/Ads/VerticalAd";
import Articles from "@/models/Articles";

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
    <div className="min-h-screen w-full flex flex-col">
      <Nav breakpoint={400} />

      <main className="mt-20 w-full flex flex-col justify-center items-center space-y-10">
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

          <h1 className="lg:text-6xl text-3xl font-bold max-w-[80%] text-center">
            {article.title}
          </h1>

          <p className="font-mono text-xs space-x-2">
            <span className="font-black">By: {article.writer}</span>
            <span className="text-gray-400">
              {moment(article.createdAt).startOf("hour").fromNow()}
            </span>
          </p>
        </div>

        <div className="w-[80%] flex flex-col space-y-16">
          <div className="relative w-full lg:h-[80vh] h-[40vh] aspect-square">
            <Image
              src={article.image}
              alt="Article Image"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="w-full flex justify-between">
            <article className="lg:w-[80%] w-full">
              <div
                className="content max-w-full lg:text-xl"
                ref={containerRef}
                dangerouslySetInnerHTML={{
                  __html: markup,
                }}
              ></div>
            </article>

            <VerticalAd />
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

  // const res = await axios
  //   .get("http://localhost:3000/api/articles")
  //   .then((res) => res.data);

  await mongoDBConnect();

  const articles = await Articles.find({});

  const paths = articles.map((article) => {
    return {
      params: { category: article.category, articleId: article._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // get data for specific id

  // const res = await axios
  //   .get(`http://localhost:3000/api/articles/${params.articleId}`)
  //   .then((res) => res.data);

  await mongoDBConnect();

  try {
    const article = await Articles.findById(params.articleId);

    if (article)
      return {
        props: {
          article: JSON.parse(JSON.stringify(article)),
        },
        // revalidate data every 10 seconds
        revalidate: 10,
      };
  } catch (error) {
    return res.status(400).json({ message: "Articles failed to fetch" });
  }
}
