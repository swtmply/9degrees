import { categoryList } from "@/lib/constants";
import mongoDBConnect from "@/lib/mongoDBConnect";
import draftToHtml from "draftjs-to-html";
import moment from "moment";
import Image from "next/image";
import { useRef } from "react";

import NavMenu from "@/components/Navigation/NavMenu";
import VerticalAd from "@/components/Ads/VerticalAd";
import Articles from "@/models/Articles";
import Swipe from "@/components/Article/Swipe";
import Layout from "@/components/Layout/Layout";

// Needs Styling
// final location (pending)

export default function Article({ article, articles }) {
  const rawContentState = JSON.parse(article.body);
  const markup = draftToHtml(rawContentState, {});
  const containerRef = useRef();

  const categoryColor = categoryList.filter(
    (category) => category.value === article.category
  );

  return (
    <Layout title={article.title}>
      <div className="bg-redtagging"></div>

      <main className="mt-20 w-full flex flex-col justify-center items-center">
        <div className="relative w-full h-[40vh]">
          <Image
            src={`/banners/${article?.category}.png`}
            alt="hero image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <NavMenu breakpoint={400} />

        <div className="lg:max-w-[1280px]">
          <div className="flex flex-col w-full mt-48 mb-16 space-y-8 items-center">
            <p>
              <span
                className={`${categoryColor[0].color} uppercase w-max font-bold text-sm px-8 py-2 text-[#fff] rounded-lg`}
              >
                {article.subsection.replace(/-/g, " ")}
              </span>
            </p>

            <h1 className="lg:text-6xl text-3xl font-bold lg:max-w-[900px] text-center">
              {article.title}
            </h1>

            <p className="font-mono text-lg space-x-4">
              <span className="font-black">By: {article.writer}</span>
              <span className="text-gray-400">
                {moment(article.createdAt).startOf("hour").fromNow()}
              </span>
            </p>
          </div>

          <div className="w-full flex flex-col space-y-16">
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
        </div>

        {/* TODO: Tags */}

        {/* TODO: Writer Profile */}

        {/* TODO: Similar Articles */}

        <div className="w-full h-[80vh] mt-24 bg-black flex flex-col items-center justify-center space-y-8">
          <h1 className="text-3xl uppercase text-white font-bold w-[90%] lg:max-w-[1280px] text-center">
            More from {article.category}
          </h1>
          <Swipe articles={articles} />
        </div>
      </main>
    </Layout>
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

    const articles = await Articles.find({
      category: article.category,
      _id: { $ne: params.articleId },
    });

    if (article)
      return {
        props: {
          article: JSON.parse(JSON.stringify(article)),
          articles: JSON.parse(JSON.stringify(articles)),
        },
        // revalidate data every 10 seconds
        revalidate: 10,
      };
  } catch (error) {
    console.log(error);

    return {};
  }
}
