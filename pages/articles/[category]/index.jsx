import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

const getCategoryArticles = async (category) => {
  return await axios
    .get(`/api/articles?category=${category}`)
    .then((res) => res.data);
};

export default function Category() {
  const router = useRouter();
  const { data, isLoading } = useQuery(
    ["articles", router.query.category],
    () => getCategoryArticles(router.query.category)
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {data?.articles.map((article) => (
        <p>{article.title}</p>
      ))}
    </div>
  );
}
