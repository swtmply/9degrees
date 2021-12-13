import Input from "@/components/Forms/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const status = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (status.ok) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-200">
      <div className="bg-white w-[40%] p-2 space-y-2">
        <h1 className="font-bold text-4xl">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
          <Input
            name="email"
            type="text"
            label="Email"
            data={credentials}
            setData={setCredentials}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            data={credentials}
            setData={setCredentials}
          />
          <div>
            <button
              className="px-4 py-2 bg-confusedPurple text-white font-bold"
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
