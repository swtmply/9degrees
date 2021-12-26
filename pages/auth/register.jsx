import Checkbox from "@/components/Forms/Checkbox";
import Input from "@/components/Forms/Input";
import { categoryList, roles } from "@/lib/constants";
import { Listbox } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useEffect } from "react";
import Logo from "@/components/Logo";
import Sidebar from "@/components/SidebarMenu";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"


const createUser = async (data) => {
  return await axios.post("/api/auth/signup", data);
};

export default function Register() {
  const { data: session } = useSession();
  const router = useRouter();

  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [role, setRole] = useState(roles[0]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const mutation = useMutation(createUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ ...data, role, categories: selectedCategories });

    // if (mutation.isSuccess) router.push(`/admin/${session?.user.categories}/manage-team`);
    // console.log(data, selectedCategories, role);
  };

  useEffect(() => {
    if (mutation.isSuccess) 
    router.push(`/admin/${session?.user.categories}/manage-team`);
  }, [mutation.isSuccess])

  
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
          <div className="min-h-full">
            {/* <div className="flex flex-col justify-center items-center"> */}
              <div className="bg-white rounded-lg shadow-lg max-h-full w-[100%] p-2 overflow-y-auto">
                <div className="bg-[#e6e6e6] rounded-md">
                  <h1 className="text-2xl py-3 pl-5">Add New User</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-2 p-8">
                  {/* <div className="grid grid-cols-2 gap-5"> */}
                    {/* <div className="flex flex-col items-center space-x-5"> */}
                      <Input
                        name="name"
                        type="text"
                        label="Name"
                        data={data}
                        setData={setData}
                      />
                      <Input
                        name="email"
                        type="text"
                        label="Email"
                        data={data}
                        setData={setData}
                      />
                      <Input
                        name="password"
                        type="password"
                        label="Password"
                        data={data}
                        setData={setData}
                      />
                    {/* </div> */}
                  {/* </div> */}
        
                  <Listbox value={role} onChange={setRole}>
                    {({ open }) => (
                      <div className="relative ">
                        <Listbox.Button className="flex justify-between items-center rounded-md w-full px-4 py-2 bg-[#e6e6e6] font-bold">
                          <span> {role} </span>
                          {open ? (
                            <ChevronUpIcon className="w-6 h-6" />
                          ) : (
                            <ChevronDownIcon className="w-6 h-6" />
                          )}
                        </Listbox.Button>
                        <Listbox.Options className="absolute w-full mt-2 bg-[#e6e6e6] rounded-md font-semibold">
                          {roles.map((role) => (
                            <Listbox.Option
                              className="hover:bg-yellowwallow hover:bg-opacity-75 px-4 py-2 cursor-pointer"
                              key={role}
                              value={role}
                            >
                              {({ selected }) => (
                                <span className={`${selected ? "font-bold" : ""}`}>
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
                    <Checkbox
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                      items={categoryList}
                    />
                  </div>

                  <div className="space-x-3 my-5">
                    <button
                      className="px-4 py-2 bg-yellowwallow text-sm font-semibold rounded-md hover:bg-opacity-75 transition duration-700 ease-in-out"
                      type="submit"
                    >
                      Register
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-200 text-sm font-semibold rounded-md hover:bg-opacity-75 transition duration-700 ease-in-out "
                      onClick={() => router.back()}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            {/* </div> */}
          </div>
        </div>
        {/* white container */}
      </div>
      {/* main*/}
    </div>
    
  );
}
