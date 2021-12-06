import Input from "@/components/Input";
import { Listbox } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";

const roles = ["Writer", "Head"];
export const categoryList = ["Nature", "Lifestyle", "Technology", "News"];

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

  const [role, setRole] = useState(roles[0]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const mutation = useMutation(createUser);

  const handleCheckBox = (e) => {
    if (!selectedCategories.some((c) => c === e.target.value)) {
      setSelectedCategories((prev) => [...prev, e.target.value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== e.target.value)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ ...data, role, categories: selectedCategories });
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
            <Listbox.Button>{role}</Listbox.Button>
            <Listbox.Options>
              {roles.map((role) => (
                <Listbox.Option key={role} value={role}>
                  {role}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>

          {categoryList.map((category, i) => (
            <div key={i}>
              <input
                type="checkbox"
                id={`c-${i}`}
                value={category}
                name={category}
                onChange={handleCheckBox}
              />
              <label htmlFor={`c-${i}`}>{category}</label>
            </div>
          ))}

          <div>
            <button
              className="px-4 py-2 bg-blue-500 text-white font-bold"
              type="submit"
            >
              Submit to Drafts
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
