import UserImageUpload from "@/components/Forms/UserImageUpload";
import imageUpload from "@/lib/imageUpload";
import {
  CogIcon,
  DocumentTextIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getUserMe } from "./profile";

export const editUserMe = async (data) => {
  const res = await axios
    .put(`http://localhost:3000/api/user/me`, data)
    .then((res) => res.data);

  return res;
};

export default function EditUserProfile() {
  const router = useRouter();
  const { data, isLoading } = useQuery(["user"], getUserMe);
  const [image, setImage] = useState();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    bio: "",
    image: "",
    socials: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  const mutation = useMutation(editUserMe);

  useEffect(() => {
    if (data) {
      console.log(data);
      setFormValues({
        ...formValues,
        name: data.user.name,
        email: data.user.email,
        bio: data.user.bio ? data.user.bio : "",
        image: data?.user?.image ? data?.user?.image : "",
        socials: data?.user?.socials
          ? data?.user?.socials
          : {
              facebook: "",
              twitter: "",
              instagram: "",
            },
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      socials: {
        ...formValues.socials,
        [name]: value,
      },
    });
  };

  const handleSubmit = async () => {
    // image upload to cloudinary API

    if (image) {
      const upload = await imageUpload(image);
      // set data image to url of image
      formValues.image = upload.url;
    }

    // console.log(formValues);

    // API call
    mutation.mutate(formValues);
  };

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
              <CogIcon className="w-8 h-8 cursor-pointer" />
            </a>
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-[80%] flex flex-col space-y-16">
            <div className="self-center flex flex-col">
              <div className="rounded-full w-[200px] h-[200px] bg-yellowwallow self-center relative">
                <UserImageUpload setImage={setImage} image={formValues.image} />
              </div>

              <div className="mt-8 border-b-2 border-black flex flex-col">
                <span className="uppercase text-gray-400 tracking-wide font-bold">
                  name
                </span>
                <input
                  className="font-bold text-2xl bg-transparent outline-none border-none focus:ring-0"
                  type="text"
                  name="name"
                  value={formValues.name || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-8 border-b-2 border-black flex flex-col">
                <span className="uppercase text-gray-400 tracking-wide font-bold">
                  email
                </span>
                <input
                  className="font-bold text-xl bg-transparent outline-none border-none focus:ring-0"
                  type="text"
                  name="email"
                  value={formValues.email || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-8 border-b-2 border-black flex flex-col">
                <span className="uppercase text-gray-400 tracking-wide font-bold">
                  bio
                </span>
                <textarea
                  className="text-xl bg-transparent outline-none border-none focus:ring-0"
                  type="text"
                  name="bio"
                  value={formValues.bio || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="w-full p-8">
        <div>
          <h2 className="font-bold text-3xl mb-8">Socials</h2>
          <div className="space-y-8 font-semibold text-lg w-[45%]">
            <p className="space-x-16 flex justify-between items-center">
              <span>Facebook</span>
              <input
                className="text-xl w-[400px] bg-transparent outline-none border-none focus:ring-0"
                type="text"
                name="facebook"
                value={formValues?.socials.facebook || ""}
                onChange={handleSocialChange}
                placeholder="Enter link from website"
              />
            </p>
            <p className="space-x-16 flex justify-between items-center">
              <span>Twitter</span>
              <input
                className="text-xl w-[400px] bg-transparent outline-none border-none focus:ring-0"
                type="text"
                name="twitter"
                value={formValues?.socials.twitter || ""}
                onChange={handleSocialChange}
                placeholder="Enter link from website"
              />
            </p>
            <p className="space-x-16 flex justify-between items-center">
              <span>Instagram</span>
              <input
                className="text-xl w-[400px] bg-transparent outline-none border-none focus:ring-0"
                type="text"
                name="instagram"
                value={formValues?.socials.instagram || ""}
                onChange={handleSocialChange}
                placeholder="Enter link from website"
              />
            </p>
          </div>
        </div>
        <button
          onClick={() => handleSubmit()}
          className="py-4 px-8 text-white text-lg font-semibold bg-padeepBlue rounded-md"
        >
          Save
        </button>
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
