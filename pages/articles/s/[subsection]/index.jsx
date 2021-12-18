import React from "react";
import { categoryList } from "lib/constants";
import Image from "next/image";

import NavMenu from "@/components/Navigation/NavMenu";
import VerticalAd from "@/components/Ads/VerticalAd";
import Stack from "@/components/Article/Stack";
import Pagination from "@/components/Article/Pagination";
import mongoDBConnect from "@/lib/mongoDBConnect";
import Articles from "@/models/Articles";
import Layout from "@/components/Layout/Layout";

export default function Category({ articles, subsection }) {
  return (
    <Layout
      title={
        subsection[0].toUpperCase() +
        subsection.substr(1).toLowerCase() +
        " Page"
      }
    >
      <main className="grid place-items-center">
        <div className="relative w-full mt-20 h-[40vh]">
          <Image
            src={`/banners/${articles[0].category}.png`}
            alt="hero image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <NavMenu breakpoint={400} />

        <div className="w-[80%] lg:max-w-[1280px] mt-24 flex justify-between">
          <div className="lg:w-[90%] flex flex-col mb-16">
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
    </Layout>
  );
}

export async function getStaticPaths() {
  // for static paths/URL

  let subsections = [];

  categoryList.map((category) => {
    return category?.subsection?.map((subsection) => {
      return subsections.push(subsection.value);
    });
  });

  const paths = subsections.map((subsection) => ({
    params: { subsection: subsection },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // get data for specific id

  // const res = await axios
  //   .get(`http://localhost:3000/api/articles/?subsection=${params.subsection}`)
  //   .then((res) => res.data);

  await mongoDBConnect();

  const articles = await Articles.find({ subsection: params.subsection });

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles.reverse())),
      subsection: params.subsection,
    },
    // revalidate data every 10 seconds
    revalidate: 10,
  };
}
