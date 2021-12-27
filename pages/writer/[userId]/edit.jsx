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
  const [confirmPassword, setConfirmPassword] = useState("") 
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
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
    // if (mutation.isSuccess) {
    //   router.back();
    // }
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
    if (formValues.password != confirmPassword) {
      alert("Passwords are not matched.")
    } else {
      // image upload to cloudinary API
      if (image) {
        const upload = await imageUpload(image);
        // set data image to url of image
        formValues.image = upload.url;
      }
      // console.log(formValues);

      // API call
      mutation.mutate(formValues);
      router.back();
    }
  };

  if (isLoading) return <>Loading...</>;

  return (
    <div className="flex min-h-screen relative bg-gray-100">
      <div className="bg-gray-200 flex flex-col w-[500px] max-w-[30%] h-screen sticky top-0">
        <div className="w-full flex justify-center">
          <div className="w-[80%] flex flex-col space-y-16 mt-10">
            <div className="w-full self-center flex flex-col">
              <div className="rounded-full w-[200px] h-[200px] bg-yellowwallow self-center relative">
                <UserImageUpload
                  setImage={setImage}
                  image={formValues.image}
                  className="cursor-pointer"
                />
              </div>

              <div className="mt-8 border-b-2 border-black flex flex-col">
                <span className="uppercase text-gray-400 tracking-wide font-bold">
                  name
                </span>
                <input
                  className="w-full text-xl bg-transparent outline-none border-none focus:ring-0"
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
                  className="w-full text-xl bg-transparent outline-none border-none focus:ring-0"
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
                  className="w-full text-xl bg-transparent outline-none border-none focus:ring-0"
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
          <h2 className="font-bold text-2xl mb-5">Socials</h2>
          {/* <div className="space-y-8 font-semibold text-lg w-[45%]"> */}
          <div className="grid grid-cols-4 text-lg">
            <div className="font-semibold space-y-4 mt-2">
              <p className="space-x-16 flex justify-between items-center">
                <span>Facebook</span>
              </p>
              <p className="space-x-16 flex justify-between items-center">
                <span>Twitter</span>
              </p>
              <p className="space-x-16 flex justify-between items-center">
                <span>Instagram</span>
              </p>
            </div>
            <div className="col-span-2">
              <p className="flex justify-between items-center">
                <input
                  className="text-lg w-[400px] bg-transparent outline-none border-none focus:ring-0"
                  type="text"
                  name="facebook"
                  value={formValues?.socials.facebook || ""}
                  onChange={handleSocialChange}
                  placeholder="Enter link from website"
                />
              </p>
              <p className="flex justify-between items-center">
                <input
                  className="text-lg w-[400px] bg-transparent outline-none border-none focus:ring-0"
                  type="text"
                  name="twitter"
                  value={formValues?.socials.twitter || ""}
                  onChange={handleSocialChange}
                  placeholder="Enter link from website"
                />
              </p>
              <p className="flex justify-between items-center">
                <input
                  className="text-lg w-[400px] bg-transparent outline-none border-none focus:ring-0"
                  type="text"
                  name="instagram"
                  value={formValues?.socials.instagram || ""}
                  onChange={handleSocialChange}
                  placeholder="Enter link from website"
                />
              </p>
            </div>
          </div>
        </div>
        <div >
          <h2 className="font-bold text-2xl mt-8 mb-5">Change Password</h2>
          <div className="grid grid-cols-4 text-lg">
            <div className="mt-2 space-y-8">
              <p>New Password</p>
              <p>Confirm Password</p>
            </div>
            <div className="space-y-4">
              <input
                className="w-full text-md rounded-lg shadow-md outline-none border-none focus:ring-0"
                type="password"
                name="password"
                value={formValues.password || ""}
                placeholder="Enter new password"
                onChange={handleChange}
              />
              <input
                className="w-full text-md rounded-lg shadow-md outline-none border-none focus:ring-0"
                type="password"
                name="confirmPassword"
                value={confirmPassword || ""}
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => handleSubmit()}
          className={`py-4 px-8 text-white text-lg font-semibold bg-padeepBlue rounded-md ${mutation.isLoading && 'cursor-progress'}`}
        >
          Save
        </button>
      </main>
    </div>
  );
}
