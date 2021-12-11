import axios from "axios";
import { convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import moment from "moment";
import Image from "next/image";
import { useRef } from "react";

// Needs Styling
// final location (pending)

export default function Article({ article }) {
  // raw content for article body medyo mahirap paliwanaw
  // pero eto yung galing dun sa parang word na textarea
  const firstBlock = convertFromRaw(JSON.parse(article.body)).getFirstBlock();
  const rawContentState = JSON.parse(article.body);
  const markup = draftToHtml(rawContentState, {});
  const containerRef = useRef();

  return (
    <div className="bg-gray-200 flex justify-center ">
      <div className="bg-white w-[80%] flex flex-col items-center p-8">
        <div className="flex flex-col w-[80%] space-y-4">
          <h3 className="tracking-widest font-bold text-2xl text-gray-500">
            {article.category.toUpperCase()}
          </h3>
          <div className="space-y-4">
            <h1 className="font-bold text-6xl text-justify">{article.title}</h1>
            <p className="text-xl text-gray-500 italic">By: {article.writer}</p>
            <p className="font-medium text-gray-500">
              {moment(article.createdAt)
                .format("MMMM Do YYYY, h:mm a")
                .toUpperCase()}
            </p>
          </div>
          <div>
            <Image src={article.image} width="400px" height="400px" />
          </div>
          {/* and then ilalagay yung content */}
          <article className="article-content">
            <div
              ref={containerRef}
              dangerouslySetInnerHTML={{
                __html: markup,
              }}
            ></div>
          </article>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  // for static paths/URL

  const res = await axios
    .get("http://localhost:3000/api/articles")
    .then((res) => res.data);

  const paths = res.articles.map((article) => ({
    params: { articleId: article._id },
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
