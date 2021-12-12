import axios from "axios";
import React, { useState } from "react";
import { categoryList } from "lib/constants";
import Nav from "@/components/Nav";
import Image from "next/image";

import placeholder from "public/ad-placeholder.png";
import NavMenu from "@/components/NavMenu";
import { convertFromRaw } from "draft-js";
import Footer from "@/components/Footer";
import moment from "moment";
import { XCircleIcon } from "@heroicons/react/solid";
import ReactPaginate from "react-paginate";

export default function Category({ articles, categoryColor }) {
  const getFirstBlock = (body) => {
    const firstBlock = convertFromRaw(JSON.parse(body)).getFirstBlock();

    return <p className="text-sm">{firstBlock.getText()}</p>;
  };

  const [pageNumber, setPageNumber] = useState(0);
  const articlePerPage = 10;
  const pagesVisited = pageNumber * articlePerPage;

  const pageCount = Math.ceil(articles.length / articlePerPage);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setPageNumber(selectedPage);
  };

  return (
    <div className="min-h-screen w-full flex flex-col space-y-20">
      <Nav />
      <main className="space-y-10 grid place-items-center">
        <div className="relative w-full h-[40vh]">
          <Image
            src={placeholder}
            alt="hero image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <NavMenu breakpoint={400} />

        <div className="w-[80%] flex justify-between">
          <div className="w-[80%] flex flex-col space-y-8">
            <div className="w-full flex flex-wrap gap-2">
              {articles
                .slice(pagesVisited, pagesVisited + articlePerPage)
                .map((article) => {
                  return (
                    <React.Fragment key={article._id}>
                      <div className="bg-white w-[48%] mb-10">
                        <div className="relative w-full aspect-square">
                          <Image
                            src={article.image}
                            alt="Article Image"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="text-center relative space-y-2 p-4">
                          <p
                            className={`absolute ml-auto mr-auto left-0 right-0 -top-4`}
                          >
                            <span
                              className={`${categoryColor[0].color} uppercase w-max font-bold text-sm px-4 py-2 text-[#fff] rounded-lg`}
                            >
                              {article.subsection.replace(/-/g, " ")}
                            </span>
                          </p>
                          <p className="font-bold text-xl">{article.title}</p>
                          <p className="font-mono text-xs space-x-2">
                            <span className="font-black">
                              By: {article.writer}
                            </span>
                            <span className="text-gray-400">
                              {moment(article.createdAt)
                                .startOf("hour")
                                .fromNow()}
                            </span>
                          </p>
                          {getFirstBlock(article.body)}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={
                "pagination flex justify-between space-x-4 font-bold w-[30%]"
              }
              activeClassName={"active text-white"}
              breakClassName={"font-bold"}
              disabledClassName={"disabled"}
            />
          </div>

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
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  // for static paths/URL

  const paths = categoryList.map((category) => ({
    params: { category: category.value },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // get data for specific id
  const res = await axios
    .get(`http://localhost:3000/api/articles/?category=${params.category}`)
    .then((res) => res.data);

  const categoryColor = categoryList.filter(
    (category) => category.value === params.category
  );

  return {
    props: {
      articles: res.articles,
      categoryColor,
    },
    // revalidate data every 10 seconds
    revalidate: 10,
  };
}
