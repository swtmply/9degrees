import axios from "axios";
import draftToHtml from "draftjs-to-html";
import Image from "next/image";

// Needs Styling
// final location (pending)

export default function Article({ article }) {
  // raw content for article body medyo mahirap paliwanaw
  // pero eto yung galing dun sa parang word na textarea
  const rawContentState = JSON.parse(article.body);
  const markup = draftToHtml(rawContentState, {
    trigger: "#",
    separator: " ",
  });

  return (
    <>
      <Image src={article.image} width="300px" height="250px" />
      <h1>{article.title}</h1>
      <p>By: {article.writer}</p>
      {/* and then ilalagay yung content */}
      <div
        dangerouslySetInnerHTML={{
          __html: markup,
        }}
      ></div>
    </>
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
