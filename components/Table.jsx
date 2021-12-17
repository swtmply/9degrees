import React from 'react';
import axios from "axios";
import { useQuery } from "react-query";

export default function Table() {

  const getArticles = () => axios.get('/api/articles').then((res) => res.data);
  
  const { data } = useQuery(
    ["articles"],
    getArticles
  );

  return (
    <>
      <table className="table-fixed">
        <thead>
          <tr className="font-bold text-left">
            <th>Title</th>
            <th>Author</th>
            <th>Categories</th>
            <th>Tags</th>
            <th>Comments</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.articles.map((article) => {
            {console.log(article)}
            <tr key={article._id}>
              <td>{article.title}</td>
              <td>{article.writer}</td>
              <td>{article.category}</td>
              <td>{article.category}</td>
              <td>{article.category}</td>
              <td>{article.updatedAt}</td>
              <td>{article.status}</td>
            </tr>
          })}
        </tbody>
    </table>  
  </>  
  )
}
