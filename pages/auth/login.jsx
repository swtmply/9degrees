import Input from "@/components/Forms/Input";
import { getSession, signIn } from "next-auth/react";
import React, { useState } from "react";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    window.location.reload(false);
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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session && session.user.role === "Writer") {
    return {
      redirect: {
        destination: `/writer/${session.id}/profile`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
