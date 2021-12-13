import axios from "axios";
import React from "react";
import { categoryList } from "lib/constants";
import Nav from "@/components/Navigation/Nav";
import Image from "next/image";

import placeholder from "public/ad-placeholder.png";
import NavMenu from "@/components/Navigation/NavMenu";
import Footer from "@/components/Footer";
import VerticalAd from "@/components/Ads/VerticalAd";
import Stack from "@/components/Article/Stack";
import Pagination from "@/components/Article/Pagination";

export default function Category({ articles }) {
  return (
    <div className="min-h-screen w-full flex flex-col space-y-20">
      <Nav breakpoint={400} />
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
            <Pagination
              items={articles}
              itemsPerPage={10}
              className={"w-full flex flex-wrap gap-2"}
              component={Stack}
            />
          </div>
          <VerticalAd />
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

  return {
    props: {
      articles: res.articles,
    },
    // revalidate data every 10 seconds
    revalidate: 10,
  };
}
