import {
  CogIcon,
  ChartBarIcon,
  KeyIcon,
  LogoutIcon,
  UserIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { categoryList } from "@/lib/constants";

import { Menu, Transition } from "@headlessui/react";
import {
  ClipboardCheckIcon,
  DocumentTextIcon,
  PencilAltIcon,
} from "@heroicons/react/solid";

export const getUserMe = async () => {
  const res = await axios
    .get(`http://localhost:3000/api/user/me`)
    .then((res) => res.data);

  return res;
};

export const getMine = async () => {
  const res = await axios
    .get("http://localhost:3000/api/articles/mine")
    .then((res) => res.data);
  return res;
};

export default function UserProfile() {
  const router = useRouter();
  const { data, isLoading } = useQuery(["user"], getUserMe);
  const { data: allMine, isLoading: loadingMine } = useQuery(
    ["mine-articles"],
    getMine
  );

  let draftCount = 0;
  let publishedCount = 0;
  let iconColor = "";

  allMine?.articles.map((article) => {
    if (article.status == "draft" && !article.isDeleted) draftCount++;
    if (article.status == "published" && !article.isDeleted) publishedCount++;
  });

  if (isLoading) return <>Loading...</>;

  return (
    <div className="flex min-h-screen relative bg-gray-100">
      <div className="bg-gray-200 flex flex-col w-[500px] max-w-[30%] h-screen sticky top-0">
        <div className="py-5 px-4 flex justify-between">
          <Link href="/admin">
            <a className="relative chartbar" tooltip="Go to Dashboard">
              <ChartBarIcon className="w-8 h-8 cursor-pointer " />
            </a>
          </Link>
          <Menu as="div" className="relative inline-block text-left z-10">
            <div>
              <Menu.Button className="inline-flex justify-center text-sm font-medium rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <CogIcon className="w-8 h-8" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-2 py-2">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active ? "bg-[#e6e6e6]" : "bg-white"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        href={`/writer/${data.user._id}/edit`}
                      >
                        <div className="flex items-center space-x-3">
                          <UserCircleIcon className="w-7 h-7" />
                          <div>Edit Profile</div>
                        </div>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active ? "bg-[#e6e6e6]" : "bg-white"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        href={`/writer/${data.user._id}/edit`}
                      >
                        <div className="flex items-center space-x-3">
                          <KeyIcon className="w-7 h-7" />
                          <div>Change Password</div>
                        </div>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-[#e6e6e6]" : "bg-white"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={async () => {
                          const result = await signOut({
                            redirect: false,
                            callbackUrl: "/",
                          });

                          router.push(result.url);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <LogoutIcon className="w-7 h-7" />
                          <div>Signout</div>
                        </div>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-[80%] flex flex-col space-y-16">
            <div className="self-center flex flex-col">
              <div className="rounded-full w-[200px] h-[200px] bg-gray-400 self-center relative">
                {data.user.image 
                  ? <Image 
                      src={data.user.image}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    /> 
                  : <div className="w-20 h-20 relative">
                      <UserIcon className="w-32 h-32 text-[#f2f2f2] absolute left-[50%] -translate-x-1 translate-y-10" />
                    </div>
                }
              </div>

              <div className="mt-8">
                <span className="uppercase text-gray-400 tracking-wide font-bold">
                  name
                </span>
                <h2 className="font-semibold text-xl">{data?.user?.name}</h2>
              </div>

              <div className="mt-8">
                <span className="uppercase text-gray-400 tracking-wide font-bold">
                  email
                </span>
                <h2 className="font-semibold text-xl">{data?.user?.email}</h2>
              </div>

              <div className="mt-8">
                <span className="uppercase text-gray-400 tracking-wide font-bold">
                  bio
                </span>
                <h2 className="font-semibold text-xl">
                  {data?.user?.bio ? data?.user?.bio : "-"}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="max-h-screen w-full p-8 table-container overflow-y-auto">
        <div>
          <h2 className="font-bold text-3xl mb-5">Socials</h2>
          <div className="grid grid-cols-4 text-lg">
            {/* <div className="space-y-8 font-semibold text-lg w-[45%]"> */}
            <div className="font-semibold">
              <p className="mb-9 flex justify-between">
                <span>Facebook</span>
              </p>
              <p className="mb-9 flex justify-between">
                <span>Twitter</span>
              </p>
              <p className="mb-9 flex justify-between">
                <span>Instagram</span>
              </p>
            </div>
            <div className="text-padeepBlue">
              <p className="mb-9 flex justify-between">
                <a href={data.user.socials.facebook ? data.user.socials.facebook : "#"} target="_blank">
                  {data.user.socials.facebook
                    ? data.user.socials.facebook
                    : "-"}
                </a>
              </p>
              <p className="mb-9 flex justify-between">
                <a href={data.user.socials.twitter ? data.user.socials.twitter : "#"} target="_blank">
                  {data.user.socials.twitter ? data.user.socials.twitter : "-"}
                </a>
              </p>
              <p className="mb-9 flex justify-between">
                <a href={data.user.socials.instagram ? data.user.socials.instagram : "#"} target="_blank">
                  {data.user.socials.instagram
                    ? data.user.socials.instagram
                    : "-"}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-3xl">Writer Info</h2>
          <div className="w-full flex flex-col">
            <div>
              <div className="flex font-semibold text-xl items-center my-4">
                <PencilAltIcon className="w-8 h-8 mr-4 " />
                {draftCount}
                {" Drafts"}
              </div>
              <div className="flex font-semibold text-xl items-center my-4">
                <ClipboardCheckIcon className="w-8 h-8 mr-4 " />
                {publishedCount}
                {" Published Articles"}
              </div>
            </div>
            <div className="mt-5">
              <p className="font-bold text-3xl">Writing for</p>
              <div className="grid grid-cols-4">
                {data.user.role == "Editor-in-Chief" ? (
                  categoryList.map((cat, i) => (
                    <div className="flex font-semibold text-xl items-center my-4" key={i}>
                      <DocumentTextIcon
                        className={`w-12 h-12 mr-4 ${
                          cat.value == "news"
                            ? 'text-padeepBlue'
                            : cat.value == "features"
                            ? 'text-pinkaru'
                            : cat.value == "community"
                            ? 'text-redtagging'
                            : cat.value == "cultures-lifestyle"
                            ? 'text-yellowwallow'
                            : cat.value == "so-lit"
                            ? 'text-degreen'
                            : cat.value == "nine-degrees" && 'text-black'
                        }`}
                      />
                      {cat.name}
                    </div>
                  ))
                ) : (
                  data.user.categories.map((cat) => (
                    <div className="flex font-semibold text-xl items-center my-4">
                      <DocumentTextIcon 
                        className={`w-12 h-12 mr-4 ${
                          cat == "news"
                            ? 'text-padeepBlue'
                            : cat == "features"
                            ? 'text-pinkaru'
                            : cat == "community"
                            ? 'text-redtagging'
                            : cat == "cultures-lifestyle"
                            ? 'text-yellowwallow'
                            : cat == "so-lit"
                            ? 'text-degreen'
                            : cat == "nine-degrees" && 'text-black'
                        }`}
                      />
                      {cat}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
