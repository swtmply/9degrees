import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import Loading from "@/components/LoadingBox";
import Logo from "@/components/Logo";
import Sidebar from "@/components/SidebarMenu";
import Header from "@/components/HeaderAdmin";
import Table from "@/components/Table";

export default function index() {
  const { data: session } = useSession();
  const router = useRouter();

  let mineForApproval = 0;
  let mineApproved = 0;
  let minePublished = 0;

  const getMine = () => axios.get("/api/articles/mine").then((res) => res.data);
  const { data: mineArticles, isLoading } = useQuery(["my-articles"], getMine);

  return (
    <div className="relative min-h-screen max-h-screen flex">
      <div className="bg-padeepBlue w-64 grid grid-rows-3">
        <div className="pt-6">
          <Logo />
        </div>
        <div className="row-span-2">
          <div className="flex justify-center pt-14">
            <Sidebar />
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="bg-padeepBlue flex-1 p-3">
        {/* white container */}
        <div className="flex flex-col rounded-l-lg bg-[#e6e6e6] h-full p-6">
          {/* Header */}
          <div className="pb-9">
            <Header session={session} />
          </div>

          {isLoading ? (
            <Loading />
          ) : mineArticles?.articles.length > 0 ? (
            <div>
              <div className="grid grid-cols-5 gap-6">
                {mineArticles?.articles.map((article) => {
                  if (!article.isDeleted) {
                    if (article.status === "forApproval") mineForApproval++;
                    if (article.status === "approved") mineApproved++;
                    if (article.status === "published") minePublished++;
                  }
                })}

                {/* stats */}
                <div className="font-helvetica col-span-2">
                  <div className="flex mt-4 pl-3">
                    <div className="pr-10">
                      <h1>
                        <b>Pending:</b> {mineForApproval}
                      </h1>
                    </div>
                    <div className="pr-10">
                      <h1>
                        <b>Approved:</b> {mineApproved}
                      </h1>
                    </div>
                    <div className="pr-10">
                      <h1>
                        <b>Published:</b> {minePublished}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* filter */}
              </div>

              {/* table */}
              <div className="table-container flex-1 max-h-full bg-[#f2f2f2] rounded-2xl mt-4 overflow-y-auto">
                <div className="rounded-md px-3">
                  <div>
                    <Table mine={mineArticles} session={session} />
                  </div>
                </div>
              </div>
              <div>PAGINATION</div>
            </div>
          ) : (
            <div className="bg-[#f2f2f2] rounded-md">
              <div className="text-center py-3">
                Nothing to see in here.{" "}
                <Link href={`/writer/${session?.id}/create`}>
                  <a className="text-padeepBlue">Start writing now.</a>
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* white container */}
      </div>
      {/* main*/}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
