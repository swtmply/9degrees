import {
  ChartBarIcon,
  DocumentTextIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export const getUserMe = async () => {
  const res = await axios
    .get(`http://localhost:3000/api/user/me`)
    .then((res) => res.data);

  return res;
};

export default function UserProfile() {
  const router = useRouter();
  const { data, isLoading } = useQuery(["user"], getUserMe);

  if (isLoading) return <>Loading...</>;

  return (
    <div className="flex min-h-screen relative bg-gray-100">
      <div className="bg-gray-200 flex flex-col w-[500px] max-w-[30%] h-screen sticky top-0">
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
          {/* Go to dashboard button icon */}
          <Link href={`/writer/${router.query.userId}/dashboard`}>
            <a>
              <ChartBarIcon className="w-8 h-8 cursor-pointer" />
            </a>
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-[80%] flex flex-col space-y-16">
            <div className="self-center flex flex-col">
              <div className="rounded-full w-[200px] h-[200px] bg-yellowwallow self-center relative">
                <Image
                  src={data.user.image}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>

              <div className="mt-8">
                <span className="uppercase text-gray-400 tracking-wide font-bold">
                  name
                </span>
                <h2 className="font-bold text-2xl">{data?.user?.name}</h2>
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
                <h2 className="text-xl">{data?.user?.bio}</h2>
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
