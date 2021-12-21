import ArticleComponent, { LatestArticle } from "@/components/ArticleComponent";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

import axios from "axios";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import ReactPaginate from "react-paginate";

import placeholder from "../public/PUBMAT SAMPLE.jpg";
import adPlaceholder from "../public/ad-placeholder.png";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import NavMenu from "@/components/NavMenu";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

export default function Home() {
  // query the API function
  const getArticles = () => axios.get(`/api/articles`).then((res) => res.data);

  const { data: sliderArticles, isLoading } = useQuery(
    ["articles"],
    getArticles
  );

  const [pageNumber, setPageNumber] = useState(0);
  const articlePerPage = 5;
  const pagesVisited = pageNumber * articlePerPage;

  const pageCount = Math.ceil(sliderArticles?.articles.length / articlePerPage);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setPageNumber(selectedPage);
  };

  // TODO: Loading State
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen w-full flex flex-col font-Roboto">
      <Nav />
      <main className="w-full flex flex-col justify-center items-center space-y-10">
        {/* Hero Image / Cover Story */}
        <div className="w-full h-[45vw] relative bg-pinkaru">
          <Image
            src={placeholder}
            alt="Featured article photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Navbar Menu */}
        <NavMenu />
        {/* 4 latest articles component */}
        <div className="max-w-[90%] relative">
          <Swiper
            modules={[Navigation]}
            navigation={{ nextEl: ".prev-button", prevEl: ".next-button" }}
            spaceBetween={0}
            slidesPerView={4}
          >
            {sliderArticles?.articles.map((article) => (
              <SwiperSlide className="max-w-[400px]" key={article._id}>
                <ArticleComponent article={article} />
              </SwiperSlide>
            ))}
          </Swiper>

          <ChevronLeftIcon className="absolute top-[160px] cursor-pointer ring ring-yellowwallow bg-white rounded-full -left-4 z-[9] next-button w-10 h-10" />
          <ChevronRightIcon className="absolute top-[160px] cursor-pointer ring ring-yellowwallow bg-white rounded-full -right-4 z-[9] prev-button w-10 h-10" />
        </div>

        {/* Ad Space */}
        <div className="w-[80%] h-[200px] bg-redtagging relative">
          <Image src={adPlaceholder} layout="fill" objectFit="cover" />
        </div>

        {/* paginated articles */}
        <div className="w-[80%] flex justify-between">
          <div className="w-[80%]">
            <h1 className="font-black tracking-wide text-2xl mb-4 uppercase">
              Latest
            </h1>
            <div className="space-y-8 mb-8">
              {sliderArticles?.articles
                .slice(pagesVisited, pagesVisited + articlePerPage)
                .map((article) => (
                  <LatestArticle key={article._id} article={article} />
                ))}
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
          </div>
          {/* Ad Space */}
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
              <Image src={adPlaceholder} layout="fill" objectFit="cover" />
            </div>
            <div className="w-[200px] h-[700px] relative bg-degreen">
              <Image src={adPlaceholder} layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>

        {/* Ad Space */}
        <div className="w-[80%] h-[200px] bg-padeepBlue relative">
          <Image src={adPlaceholder} layout="fill" objectFit="cover" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session && session.user.role === "Writer") {
    return {
      redirect: {
        // destination: `/writer/${session.id}/profile`,
        destination: '/admin/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
