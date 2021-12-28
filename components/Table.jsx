import React, { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useMutation } from "react-query";

// import Dialog from "./ConfirmDialog";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/solid";

export const deleteArticle = async (articleId) => {
  const res = await axios.delete(
    `http://localhost:3000/api/articles/${articleId}`
  );
  return res;
};

export const updateArticle = async (data) => {
  const res = await axios
    .put(`http://localhost:3000/api/articles/${data.id}`, data)
    .then((res) => res.data);

  return res;
};

export default function Table({ all, mine, session }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [recover, setRecover] = useState(false);
  const [articleId, setArticleId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  let onHomePage = false;
  let onArticlesPage = false;
  let onDraftsPage = false;
  let onTrashPage = false;

  if (document.location.pathname.includes("admin")) onHomePage = true;
  if (document.location.pathname.includes("articles")) onArticlesPage = true;
  if (document.location.pathname.includes("drafts")) onDraftsPage = true;
  if (document.location.pathname.includes("trash")) onTrashPage = true;

  //filter articles
  const articles = new Array();
  if (onHomePage) {
    if (session?.user.role == "Editor-in-Chief") {
      all?.articles.map((article) => {
        if (!article.isDeleted) articles.push(article);
      });
    } else if (session?.user.role == "Head") {
      all?.articles.map((article) => {
        if (
          article.category == session?.user.categories &&
          !article.isDeleted
        ) {
          articles.push(article);
        }
      });
    } else {
      mine?.articles.map((article) => {
        if (!article.isDeleted) articles.push(article);
      });
    }
  }
  if (onArticlesPage) {
    mine?.articles.map((article) => {
      if (article.status != "draft" && !article.isDeleted) {
        articles.push(article);
      }
    });
  }
  if (onDraftsPage) {
    mine?.articles.map((article) => {
      if (article.status == "draft" && !article.isDeleted) {
        articles.push(article);
      }
    });
  }
  if (onTrashPage) {
    mine?.articles.map((article) => {
      if (article.isDeleted) {
        articles.push(article);
      }
    });
  }

  const handleAction = () => {
    if (onTrashPage) {
      setIsDeleted(false);
      alert("Article will be permanently deleted.");
    } else {
      alert("Article will be moved to trash");
      setIsDeleted(true);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      updateArticle({ isDeleted, id: articleId });
      setIsDeleted(false);
    }

    if (!recover && !isDeleted && onTrashPage) 
      deleteArticle(articleId);
    
    if (recover && !isDeleted && onTrashPage) 
      updateArticle({ isDeleted, id: articleId })

  }, [isOpen, isDeleted, recover, onTrashPage]);

  return (
    <>
      <table className="table table-fixed w-full border-separate space-y-6 text-sm">
        <thead className="bg-white text-left sticky top-0">
          <tr className="font-bold">
            <th className="p-3 w-[20%]">Title</th>
            <th className="p-3 w-[10%]">Author</th>
            <th className="p-3 w-[10%]">Categories</th>
            <th className="p-3 w-[15%]">Tags</th>
            <th className="p-3 w-[15%]">Comments</th>
            <th className="p-3 w-[15%]">Date</th>
            <th className="p-3 w-[10%]">Status</th>
            <th className="p-3 w-[6%]"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            return (
              <Link href={"/admin"} className="w-full">
                <tr
                  className="cursor-pointer bg-white hover:bg-[#e6e6e6] align-top"
                  key={article._id}
                >
                  <td className="px-4 pt-1 pb-4 w-[20%]">{article.title}</td>

                  <td className="px-4 pt-1 pb-4 w-[10%]">{article.writer}</td>

                  <td className="px-4 pt-1 pb-4 w-[10%]">{article.category}</td>

                  <td className="px-4 pt-1 pb-4 W-[15%] text-padeepBlue">
                    {article.tags.length > 1
                      ? article.tags.map((tag) => (
                          <div className="inline">
                            {tag}
                            {", "}
                          </div>
                        ))
                      : article.tags}
                  </td>

                  <td className="px-4 pt-1 pb-4">
                    {article.comments ? (
                      article.comments
                    ) : (
                      <div className="text-center">-</div>
                    )}
                  </td>

                  <td className="px-4 pt-1 pb-4">
                    Last modified
                    <div className="inline-block">
                      at {article.updatedAt.toLocaleString()}
                    </div>
                  </td>

                  <td className="px-4 pt-1 pb-4">
                    {article.status == "draft" ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellowwallow rounded-full" />
                        <h1>{article.status}</h1>
                      </div>
                    ) : article.status == "forApproval" ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-redtagging rounded-full" />
                        <h1>pending</h1>
                      </div>
                    ) : article.status == "approved" ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange rounded-full" />
                        <h1>{article.status}</h1>
                      </div>
                    ) : (
                      article.status == "published" && (
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-degreen rounded-full" />
                          <h1>{article.status}</h1>
                        </div>
                      )
                    )}
                  </td>

                  <td className="space-y-5 px-4 pt-1 pb-4">
                      {onTrashPage && <button
                       onClick={() => {
                        setArticleId(article._id);
                        setIsDeleted(false);
                        setRecover(true);
                      }}
                    >
                      <h1 className="text-sm">Recover</h1>
                    </button>}
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setArticleId(article._id);
                        handleAction();
                      }}
                    >
                      <h1 className="text-sm">Delete</h1>
                      {/* <TrashIcon className="w-5 h-5 " /> */}
                    </button>
                  </td>
                  {/* TODO dialog ayaw gumana hmf*/}
                  {/* {isLoading && (
                    <Dialog
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      articleId={article._id}
                      onTrashPage={onTrashPage}
                    />
                  )} */}
                </tr>
              </Link>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
