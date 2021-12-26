import {
  ChartBarIcon,
  DocumentTextIcon,
  LogoutIcon,
  UserCircleIcon,
  CogIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import React, { Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { Menu, Transition } from '@headlessui/react'
import { CheckIcon,  } from "@heroicons/react/solid";

export const getUserMe = async () => {
  const res = await axios
    .get(`http://localhost:3000/api/user/me`)
    .then((res) => res.data);

  return res;
};

export default function UserProfile() {
  const router = useRouter();
  const { data: session } = useSession()
  const { data, isLoading } = useQuery(["user"], getUserMe);

  if (isLoading) return <>Loading...</>;

  return (
    <div className="flex min-h-screen relative bg-gray-100">
      <div className="bg-gray-200 flex flex-col w-[500px] max-w-[30%] h-screen sticky top-0">
        <div className="py-2 px-4 flex justify-between">
          {/* <button
            onClick={async () => {
              const result = await signOut({
                redirect: false,
                callbackUrl: "/",
              });

              router.push(result.url);
            }}
          >
            <LogoutIcon className="w-8 h-8" />
          </button> */}
          <Link href={`/writer/${router.query.userId}/dashboard`}>
            <a>
              <ChartBarIcon className="w-8 h-8 cursor-pointer" />
            </a>
          </Link>
          <Menu as="div" className="relative inline-block text-left" >
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
                      active ? 'bg-[#e6e6e6]' : 'bg-white'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    href={`/writer/${session.id}/profile`}
                    >
                      Edit Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                    className={`${
                      active ? 'bg-[#e6e6e6]' : 'bg-white'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    href={`/writer/${session.id}/profile`}
                    >
                      Change Password
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                    className={`${
                      active ? 'bg-[#e6e6e6]' : 'bg-white'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => signOut()}
                    
                    >
                      Signout
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
              <div className="rounded-full w-[200px] h-[200px] bg-yellowwallow self-center relative">
                {/* {data.user.image 
                  ? <Image 
                      src={data.user.image}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    /> 
                  : <div className="w-20 h-20"><UserCircleIcon className="w-32 h-32" /></div>
                } */}
                
                {/* <Image
                  src={data.user.image}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                /> */}
              </div>

              <div className="mt-8">
                <span className="uppercase text-gray-400 tracking-wide font-bold">
                  name
                </span>
                <h2 className="font-bold text-xl">{data?.user?.name}</h2>
              </div>

              <div className="mt-8">
                <span className="uppercase text-gray-400 tracking-wide font-bold">
                  email
                </span>
                <h2 className="font-bold text-xl">{data?.user?.email}</h2>
              </div>

              <div className="mt-8">
                <span className="uppercase text-gray-400 tracking-wide font-bold">
                  bio
                </span>
                <h2 className="text-xl">{data?.user?.bio ? data?.user?.bio : '-'}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="w-full p-8">
        <div>
          <h2 className="font-bold text-3xl mb-8">Socials</h2>
          <div className="space-y-8 font-semibold text-lg w-[45%]">
            <p className="space-x-16 flex justify-between">
              <span>Facebook</span>
              <a href={data.user.socials.facebook} target="_blank">
                {data.user.socials.facebook}
              </a>
            </p>
            <p className="space-x-16 flex justify-between">
              <span>Twitter</span>
              <a href={data.user.socials.twitter} target="_blank">
                {data.user.socials.twitter}
              </a>
            </p>
            <p className="space-x-16 flex justify-between">
              <span>Instagram</span>
              <a href={data.user.socials.instagram} target="_blank">
                {data.user.socials.instagram}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="font-bold text-3xl mb-8">Writer Info</h2>
          <div className="w-full flex flex-col">
            <div>
              <div className="flex font-semibold text-xl items-center my-4">
                <DocumentTextIcon className="w-12 h-12 mr-4" />
                10 Drafts
              </div>
              <div className="flex font-semibold text-xl items-center my-4">
                <DocumentTextIcon className="w-12 h-12 mr-4" />
                12 Published Articles
              </div>
            </div>
            <div>
              <p className="font-bold text-2xl">Writing for</p>
              <div className="flex font-semibold text-xl items-center my-4">
                <DocumentTextIcon className="w-12 h-12 mr-4" />
                Cultures and Lifestyle
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
