import React, { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import Message from "@/components/MessageBox"
import Loader from "@/components/LoadingBox"

import slogan from "../../public/full-lockup-silhouette.svg"
import { MailIcon, KeyIcon, ArrowRightIcon } from "@heroicons/react/solid"

export default function Login() {
  //responsive
  //prefetch /admin/dashboard
  
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)
  const [ error, setError ] = useState('')
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const status = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    setIsLoading(false);
    if (status.ok) {
      router.push("/admin/dashboard");
    } 
    if (status.error) {
      setError(status.error)
    }
  };

  const onChange = async (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: [e.target.value]
    })
  }

  return (
      <div className="flex flex-col min-h-screen justify-center items-center ">
        <div className="shadow-lg bg-white rounded-md w-[30%] p-8 space-y-5 ">
          <div className="text-center">
            <Image
              src={slogan}
              width={2}
              height={1}
              layout="responsive"
            />
            
            <div>
              {error && (
                <Message>
                  <div>{error}</div>
                </Message>
              )}
            </div>

            <div className="flex flex-col justify-center items-center">
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-4">
                <label className="relative flex items-center text-gray-400 focus-within:text-gray-600 block">
                  <MailIcon className="pointer-events-none w-5 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" />
                  <input
                    name="email"
                    type="text"
                    value={credentials.email}
                    placeholder="Your email"
                    className="w-full text-black rounded-md pr-3 pl-10"
                    onChange={onChange}
                  />
                </label>

                <label className="relative flex items-center text-gray-400 focus-within:text-gray-600 block">
                  <KeyIcon className="pointer-events-none w-5 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" />
                  <input
                    name="password"
                    type="password"
                    value={credentials.password}
                    placeholder="Your password"
                    className="w-full text-black rounded-md pr-3 pl-10"
                    onChange={onChange}
                  />
                </label>

                <div>
                  {isLoading 
                  ? ( <Loader/> )
                  : (
                    <button
                      className="rounded-full w-full px-4 py-2 text-white tracking-wide bg-black hover:bg-yellowwallow hover:text-black transition duration-700 ease-in-out"
                      type="submit"
                    >
                      <div className="flex flex-row justify-center items-center space-x-3">
                        <div className="tracking-wide pr-3">
                          SIGN IN 
                        </div>
                        <div>
                          <ArrowRightIcon className="w-5 h-6 " />                  
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req })
  if (session) {
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}