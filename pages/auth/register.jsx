import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import { categoryList, roles } from "@/lib/constants";
import { Listbox } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const createUser = async (data) => {
  return await axios.post("/api/auth/signup", data);
};

export default function Register() {
  const [data, setData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const [role, setRole] = useState(roles[0]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const mutation = useMutation(createUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ ...data, role, categories: selectedCategories });

    // if (mutation.isSuccess) router.push("/auth/login");
    // console.log(data, selectedCategories, role);
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-200">
      <div className="bg-white w-[40%] p-2">
        <h1 className="font-bold text-4xl">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
          <Input
            name="username"
            type="text"
            label="Username"
            data={data}
            setData={setData}
          />
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

          <Listbox value={role} onChange={setRole}>
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="flex justify-between items-center rounded-md w-full px-4 py-2 bg-yellowwallow font-bold">
                  <span> {role} </span>
                  {open ? (
                    <ChevronUpIcon className="w-6 h-6" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6" />
                  )}
                </Listbox.Button>
                <Listbox.Options className="absolute w-full mt-2 py-2 bg-yellowwallow rounded-md font-semibold">
                  {roles.map((role) => (
                    <Listbox.Option
                      className="hover:bg-white hover:bg-opacity-75 px-4 py-3 cursor-pointer"
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

          <Checkbox
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            items={categoryList}
          />

          <div>
            <button
              className="px-4 py-2 bg-yellowwallow text-sm font-semibold rounded-md"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
