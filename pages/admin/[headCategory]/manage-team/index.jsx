import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";

import Link from "next/link";

import Loading from "@/components/LoadingBox";
import Logo from "@/components/Logo";
import Sidebar from "@/components/SidebarMenu";
import Header from "@/components/HeaderAdmin";

import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

export default function index() {
  const { data: session } = useSession();
  const router = useRouter();

  const getUsers = async () =>
    await axios.get("/api/user/").then((res) => res.data);
  const { data, isLoading } = useQuery(["userlist"], getUsers);

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
            <div className="mt-10">
              <Loading />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-5">
                <div className="w-full col-start-5">
                  <button
                    className="w-full bg-redtagging text-white py-2 px-5 rounded-xl hover:opacity-75 transition duration-650 ease-in-out"
                    onClick={() => router.push("/auth/register")}
                  >
                    <div>add a user +</div>
                  </button>
                </div>
              </div>

              <div className="flex-1 max-h-full bg-[#f2f2f2] rounded-2xl mt-4 overflow-y-auto">
                <div className="rounded-md px-3">
                  <table className="table table-fixed w-full border-separate space-y-6 text-sm">
                    <thead className="bg-white text-left sticky top-0">
                      <tr className="font-bold ">
                        <th className="p-3 w-[20%]">Name</th>
                        <th className="p-3 w-[13%]">Role</th>
                        <th className="p-3 w-[20%]">Categories</th>
                        <th className="p-3 w-[20%]">Date Added</th>
                        <th className="p-3 w-[20%]">Last Updated</th>
                        <th className="p-3 w-[7%]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.users.map((user) => (
                        <Link
                          href={`/admin/${session?.user.categories}/manage-team/edit/${user._id}`}
                        >
                          <tr
                            className="cursor-pointer bg-white hover:bg-[#e6e6e6] align-top"
                            key={user._id}
                          >
                            <td className=" px-4 pt-2 pb-4">
                              <div>{user.name}</div>
                            </td>

                            <td className="px-4 pt-2 pb-4">{user.role}</td>

                            <td className="px-4 pt-2 pb-4 text-padeepBlue">
                              {user.categories.length > 1
                                ? user.categories.map((cat) => (
                                    <div className="inline">
                                      {cat}
                                      {", "}
                                    </div>
                                  ))
                                : user.categories}
                            </td>

                            <td className="px-4 pt-2 pb-4">{user.createdAt}</td>

                            <td className="px-4 pt-2 pb-4">{user.updatedAt}</td>

                            <td className="px-4 pt-2 pb-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() =>
                                    router.push(
                                      `/admin/${session?.user.categories}/manage-team/edit/${user._id}`
                                    )
                                  }
                                >
                                  <PencilAltIcon className="w-5 h-5" />
                                </button>
                                <button>
                                  <TrashIcon className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        </Link>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>PAGINATION</div>
            </>
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
