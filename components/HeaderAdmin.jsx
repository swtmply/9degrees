import React, { Fragment, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  UserCircleIcon,
  UserGroupIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";

import avatar from "../public/avatar.jpg";

export default function HeaderAdmin({ session }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <label className="w-full max-w-sm col-start-2 relative text-gray-400 focus-within:text-gray-600 block">
          {/* <SearchIcon className="pointer-events-none w-5 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" /> */}
          <input
            name="keyword"
            type="text"
            value={keyword}
            placeholder="type something..."
            className="w-full text-black border-gray-300 rounded-lg focus:outline-none"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>

        <div className="col-end-4 flow-root">
          <div className="float-right">
            <div className="flex items-center space-x-5">
              <div className="font-bold tracking-tight">
                {session?.user.name}
              </div>
              <div className="top-16 z-10">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center text-sm font-medium text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {session?.user.image ? (
                        <Image
                          src={session?.user.image}
                          width={50}
                          height={50}
                        />
                      ) : (
                        <div className="rounded-md bg-white w-12 h-12"></div>
                      )}
                      {/* <Image
                        src={avatar}
                        width={50}
                        height={50}
                      /> */}
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
                              href={`/writer/${session?.id}/profile`}
                            >
                              <div className="flex items-center space-x-3">
                                <UserCircleIcon className="w-6 h-6" />
                                <div>Profile</div>
                              </div>
                            </a>
                          )}
                        </Menu.Item>

                        {/* palitan href */}
                        {(session?.user.role == "Head" ||
                          session?.user.role == "Editor-in-Chief") && (
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                className={`${
                                  active ? "bg-[#e6e6e6]" : "bg-white"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                href={`/admin/${session.user.categories}/manage-team/`}
                              >
                                <div className="flex items-center space-x-3">
                                  <UserGroupIcon className="w-6 h-6" />
                                  <div>Manage my team</div>
                                </div>
                              </a>
                            )}
                          </Menu.Item>
                        )}

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
                                <LogoutIcon className="w-6 h-6" />
                                <div>Sign out</div>
                              </div>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
