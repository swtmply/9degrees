import Footer from "@/components/Footer";
import Nav from "@/components/Navigation/Nav";

import axios from "axios";
import { getSession } from "next-auth/react";
import { useQuery } from "react-query";
import Image from "next/image";

import placeholder from "../public/PUBMAT SAMPLE.jpg";

import NavMenu from "@/components/Navigation/NavMenu";
import Swipe from "@/components/Article/Swipe";
import Pagination from "@/components/Article/Pagination";
import VerticalAd from "@/components/Ads/VerticalAd";
import HorizontalAd from "@/components/Ads/HorizontalAd";
import ColumnArticle from "@/components/Article/Column";
import SwipeLoading from "@/components/SkeletonLoading/SwipeLoading";
import ColumnLoading from "@/components/SkeletonLoading/ColumnLoading";

export const getArticles = () =>
  axios.get(`/api/articles`).then((res) => res.data);

export default function Home() {
  // query the API function
  const { data, isLoading } = useQuery(["articles"], getArticles);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* <Nav breakpoint={750} /> */}
      <div className="bg-redtagging"></div>

      <Nav />

      <main className="mt-20 w-full flex flex-col justify-center items-center space-y-10">
        <div className="md:w-full md:h-[45vw] relative bg-pinkaru ">
          <Image
            src={placeholder}
            alt="Featured article photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <NavMenu breakpoint={750} />

        {isLoading ? <SwipeLoading /> : <Swipe articles={data?.articles} />}

        <HorizontalAd />

        <div className="w-[80%] lg:flex-row flex flex-col justify-center lg:justify-between">
          {isLoading ? (
            <ColumnLoading />
          ) : (
            <Pagination
              items={data?.articles}
              itemsPerPage={5}
              component={ColumnArticle}
              className="lg:w-[80%] w-full space-y-8 mb-8"
            />
          )}

          <VerticalAd />
        </div>

        <HorizontalAd />
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
        destination: `/writer/${session.id}/profile`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
