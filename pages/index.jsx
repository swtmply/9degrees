import Footer from "@/components/Footer";
import Nav from "@/components/Navigation/Nav";

import axios from "axios";
import { useQuery } from "react-query";
import Image from "next/image";

import HeroBG from "public/bg/Hero.png";

import NavMenu from "@/components/Navigation/NavMenu";
import Swipe from "@/components/Article/Swipe";
import Pagination from "@/components/Article/Pagination";
import VerticalAd from "@/components/Ads/VerticalAd";
import HorizontalAd from "@/components/Ads/HorizontalAd";
import ColumnArticle from "@/components/Article/Column";
import SwipeLoading from "@/components/SkeletonLoading/SwipeLoading";
import ColumnLoading from "@/components/SkeletonLoading/ColumnLoading";
import { getSession } from "next-auth/react";
import HeroSwipe from "@/components/HeroSwipe/HeroSwipe";

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

      <main className="mt-20 w-full flex flex-col justify-center items-center ">
        <div className="md:w-full md:h-[450px] relative bg-pinkaru ">
          <Image
            src={HeroBG}
            alt="Featured article photo"
            layout="fill"
            objectFit="cover"
          />
          <HeroSwipe />
        </div>

        <NavMenu breakpoint={450} />

        {isLoading ? <SwipeLoading /> : <Swipe articles={data?.articles} />}

        <HorizontalAd />

        <h1 className="font-black text-3xl tracking-wide mb-8 mt-16 uppercase w-[1280px] lg:max-w-[1280px]">
          Latest
        </h1>

        <div className="w-[80%] lg:max-w-[1280px] space-x-8 lg:flex-row flex flex-col justify-center lg:justify-between">
          {isLoading ? (
            <ColumnLoading />
          ) : (
            <Pagination
              items={data?.articles}
              itemsPerPage={10}
              component={ColumnArticle}
              className="w-full space-y-8 mb-8"
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
    props: {},
  };
}
