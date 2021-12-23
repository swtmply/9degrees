import {
  CogIcon,
  DocumentTextIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function WriterDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex min-h-screen relative bg-gray-100">
      {/* Dashboard Navigation */}
      <div className="bg-gray-200 flex flex-col w-[400px] max-w-[25%] h-screen sticky top-0">
        <div className="py-2 px-4 flex justify-between">
          <button
            onClick={async () => {
              const result = await signOut({
                redirect: false,
                callbackUrl: "/",
              });

              router.push(result.url);
            }}
          >
            <LogoutIcon className="w-8 h-8" />
          </button>
          {/* Go to profile button icon */}
          <Link href={`/writer/${session?.id}/profile`}>
            <a>
              <CogIcon className="w-8 h-8 cursor-pointer" />
            </a>
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-[80%] flex flex-col space-y-16">
            <div className="self-center flex flex-col items-center">
              <div className="rounded-full w-[200px] h-[200px] bg-yellowwallow self-center relative">
                <Image
                  src={session?.user?.image}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <h2 className="font-bold text-3xl mt-8 text-center">
                {session?.user?.name}
              </h2>
            </div>
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
      </div>

      <main className="w-full p-8">
        <div className="w-full flex items-center justify-between">
          <div className="text-xl font-semibold space-x-8">
            <Link href="/dashboard">
              <a
                className={
                  router.pathname.includes("/dashboard")
                    ? "border-b-4 border-yellowwallow font-bold"
                    : ""
                }
              >
                Overview
              </a>
            </Link>
            <Link href="/drafts">
              <a
                className={
                  router.pathname.includes("/drafts")
                    ? "border-b-4 border-yellowwallow font-bold"
                    : ""
                }
              >
                Drafts
              </a>
            </Link>
            <Link href="/published">
              <a
                className={
                  router.pathname.includes("/published")
                    ? "border-b-4 border-yellowwallow font-bold"
                    : ""
                }
              >
                Published
              </a>
            </Link>
          </div>
          <div>
            <button className="text-2xl flex items-center rounded-lg py-4 px-8 bg-padeepBlue text-white font-bold">
              <PlusIcon className="w-8 h-8 mr-4" />
              Create Article
            </button>
          </div>
        </div>
        <h2 className="font-bold text-3xl mt-24">Drafts</h2>
        <h2 className="font-bold text-3xl mt-24">Published Articles</h2>
      </main>
    </div>
  );
}
