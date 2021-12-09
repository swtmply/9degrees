import ArticleComponent, { LatestArticle } from "@/components/ArticleComponent";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

import axios from "axios";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Image from "next/image";

import placeholder from "../public/PUBMAT SAMPLE.jpg";
import MenuDropdown from "@/components/MenuDropdown";
import Link from "next/link";

// get all articles API function
const getArticles = async () => {
  return axios.get("/api/articles").then((res) => res.data);
};

export default function Home() {
  // query the API function
  const { data, isLoading } = useQuery("articles", getArticles);
  const [navbarState, setNavbarState] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 630) {
      setNavbarState(true);
    } else {
      setNavbarState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // TODO: Loading State
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Nav />
      <main className="w-full flex flex-col justify-center items-center space-y-5">
        <div className="w-full h-[45vw] relative bg-pinkaru">
          <Image
            src={placeholder}
            alt="Featured article photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div
          className={`transition-colors ${
            navbarState ? "bg-black text-white" : "bg-yellowwallow text-black"
          } w-[80%] sticky top-4 z-10 py-4 flex justify-around rounded-lg hover:bg-black focus-within:bg-black focus-within:text-white hover:text-white`}
        >
          <MenuDropdown
            header="news"
            items={["Nation", "University", "alt0176"]}
          />
          <MenuDropdown
            header="features"
            items={["Profiles", "Opinion", "In Photos"]}
          />
          <MenuDropdown
            header="community"
            items={["Catwalk", "Anonas Street"]}
          />
          <MenuDropdown
            header="Culture and Lifestyle"
            items={["Life", "Entertainment", "Food and Travel", "New Normal"]}
          />
          <Link href="/">
            <p className="font-bold">SO LIT!</p>
          </Link>
          <MenuDropdown header="9°" items={["Cover Story", "We Are 9°"]} />
        </div>
        {/* TODO: 4 latest articles component */}
        <div className="flex">
          {data?.articles.slice(0, 4).map((article) => (
            <ArticleComponent key={article._id} article={article} />
          ))}
        </div>
        <div className="w-[80%] pt-32">
          <h1 className="font-black tracking-wide text-2xl mb-4">Latest</h1>
          <div className="space-y-8">
            {data?.articles.map((article) => (
              <LatestArticle key={article._id} article={article} />
            ))}
          </div>
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
        destination: `/writer/${session.id}/profile`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
