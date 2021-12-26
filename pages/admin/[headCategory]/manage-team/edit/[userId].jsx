import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { Listbox } from "@headlessui/react";

import Loading from "@/components/LoadingBox";
import Logo from "@/components/Logo";
import Sidebar from "@/components/SidebarMenu";
import { categoryList, roles } from "@/lib/constants";

import { RadioGroup } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { list } from "postcss";

import { Checkbox } from "@/components/Forms/Checkbox";

const updateUser = async (data) => {
  return await axios.put(
    `http://localhost:3000/api/user/${router.query.userId}`,
    data
  );
};

export default function index({ user }) {
  const { data: session } = useSession()
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [selectedCategories, setSelectedCategories] = useState(user.categories);
  const [role, setRole] = useState(user.role);

  const handleCheckBox = () => {
    console.log("hanlde cb to do");
  };

  const mutation = useMutation(updateUser);
  const handleSubmit = () => {
    mutation.mutate({ name, email, categories: selectedCategories, role });
    console.log(":HELLOO");
    document.location.reload();
  };

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
        <div className="flex flex-col rounded-l-lg bg-[#e6e6e6] h-full ">
          <div className="min-h-full">
            {/* <div className="pl-6 pt-6">
              <button 
                className="bg-[#d8d8d8] rounded-lg px-5 py-2 hover:bg-[#f2f2f2] transition duration-500 ease-in-out"
                onClick={() => router.back()}
              >
                Back
              </button>
            </div> */}
            <div className="bg-[#fefefe] rounded-md min-h-full max-h-full m-7 p-2 overflow-y-auto">
              <div className="bg-[#e6e6e6] rounded-md">
                <div className="text-2xl py-3 pl-5 tracking-wide">
                  User Details
                </div>
              </div>
              <div className="my-5 px-10">
                <div className="flex">
                  {user.image ? (
                    <Image src={user.image} width={130} height={130} />
                  ) : (
                    <div className="w-24 h-24">
                      <UserCircleIcon className="w-24 h-24" />
                    </div>
                  )}
                  <div className="my-auto pl-3">
                    <span className="block text-xl font-bold">{user.name}</span>
                    <span className="block">{user.role}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col mt-5">
                  <div className="flex items-center mb-5">
                    <div className="flex flex-col w-[35%] mr-24">
                      <label htmlFor="name" className="text-lg font-bold">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-md focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col w-[35%] ml-2">
                      <label htmlFor="name" className="text-lg font-bold">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-md focus:outline-none"
                      />
                    </div>
                  </div>

                  <Listbox value={role} onChange={setRole} >
                    {({ open }) => (
                      <div className="relative ">
                        <Listbox.Button className="flex justify-between items-center rounded-md w-[80%] px-4 py-2 bg-[#e6e6e6] font-bold">
                          <span> {role} </span>
                          {open ? (
                            <ChevronUpIcon className="w-6 h-6" />
                          ) : (
                            <ChevronDownIcon className="w-6 h-6" />
                          )}
                        </Listbox.Button>
                        <Listbox.Options className="absolute w-[80%] mt-2 bg-[#f2f2f2] rounded-lg font-semibold">
                          {roles.map((role) => (
                            <Listbox.Option
                              className="hover:bg-yellowwallow hover:rounded-lg px-4 py-2 cursor-pointer"
                              key={role}
                              value={role}
                            >
                              {({ selected }) => (
                                <span
                                  className={`${selected ? "font-bold" : ""}`}
                                >
                                  {role}
                                </span>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    )}
                  </Listbox>

                  <div className="px-6">
                    {/* <Checkbox
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                      items={categoryList}
                    /> */}

                    <div className="space-y-2">
                      <p className="font-bold text-xl my-4">Category</p>
                      {categoryList.map((item, i) => (
                        <div key={i}>
                          <label className="inline-flex items-center space-x-4">
                            <input
                              className="w-6 h-6 mr-4 border-2 text-yellowwallow focus:ring-opacity-50 focus:ring-yellowwallow border-gray-400 rounded-full"
                              type="checkbox"
                              id={`c-${i}`}
                              value={item.value}
                              name={item.name}
                              checked={
                                user.categories[i] == item.value ? true : false
                              }
                              onChange={handleCheckBox}
                            />
                            {item.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-x-3 my-5 ">
                    <button
                      className="px-4 py-2 bg-yellowwallow text-sm font-semibold rounded-md hover:bg-opacity-75 transition duration-700 ease-in-out"
                      type="submit"
                    >
                      {mutation.isLoading ? "Saving..." : "Save"}
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-200 text-sm font-semibold rounded-md hover:bg-opacity-75 transition duration-700 ease-in-out "
                      onClick={() => router.push(`/admin/${session?.user.categories}/manage-team`)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* white container */}
      </div>
      {/* main*/}
    </div>
  );
}



export async function getStaticPaths() {
  const res = await axios
    .get("http://localhost:3000/api/user/")
    .then((res) => res.data);
  // TODO get category ni logged in user 
  const users = res.users;
  const paths = users.map((user) => ({
    params: { headCategory: "all", userId: user._id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await axios
    .get(`http://localhost:3000/api/user/${params.userId}`)
    .then((res) => res.data);
  console.log("userId", res.data);

  return {
    props: { user: res.user },
  };
}
