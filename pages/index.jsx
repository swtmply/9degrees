import ArticleComponent from "@/components/ArticleComponent";
import axios from "axios";
import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

import { useQuery } from "react-query";

// get all articles API function
const getArticles = async () => {
  return axios.get("/api/articles").then((res) => res.data);
};

export default function Home() {
  // query the API function
  const { data, isLoading } = useQuery("articles", getArticles);
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>PUP Dummy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TODO: Homepage */}
      <main>
        {session && <button onClick={() => signOut()}>Log out</button>}
        <div className="text-xl">Homepage</div>
        {/* Loading state needs error state */}
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <div className="flex flex-col">
            {/* map through articles object */}
            {/* data? for making sure na merong data before render */}
            {data?.articles.map((article) => (
              <React.Fragment key={article._id}>
                {/* Article component sis */}
                <ArticleComponent article={article} />

                <br />
              </React.Fragment>
            ))}
          </div>
        )}
      </main>
    </>
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
