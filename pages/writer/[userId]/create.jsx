import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { convertToRaw, EditorState } from "draft-js";
import { useMutation } from "react-query";
import axios from "axios";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ImageUpload from "@/components/ImageUpload";
import imageUpload from "@/lib/imageUpload";
import Input from "@/components/Input";
import { Listbox, RadioGroup } from "@headlessui/react";
import { getSession, useSession } from "next-auth/react";
import { categoryList } from "@/lib/constants";
import { CheckIcon } from "@heroicons/react/outline";
import PopupDialog from "@/components/PopupDialog";
import Loading from "@/components/LoadingBox";
import Logo from "@/components/Logo";
import Sidebar from "@/components/SidebarMenu";
import Header from "@/components/HeaderAdmin";

// dynamic import para dun sa word like textarea
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

// mutation or api call for article POST
const addToDrafts = async (data) => {
  return await axios.post("/api/articles", data);
};

export default function Create({ user }) {
  const {data: session } = useSession()
  const router = useRouter()

  // form state
  const [data, setData] = useState({
    title: "",
    image: "",
    body: "",
    writer: user?.name,
    category: "",
    // tags: "",
  });
  // textarea editor state
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // image state for upload
  const [image, setImage] = useState();
  const [categories, setCategories] = useState(() => {
    return categoryList.filter((cat, i) => cat.value === user?.categories[i]);
  });
  const [category, setCategory] = useState(categories[0]);
  const [selectedSubsection, setselectedSubsection] = useState();

  let [isOpen, setIsOpen] = useState(false);

  // mutation variable for api call
  const mutation = useMutation(addToDrafts);

  // textarea change
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    // converting raw to json for upload sa DB
    setData({
      ...data,
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    });

    // for editing raw data
    // convertFromRaw(JSON.parse(this.props.rawState))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // image upload to cloudinary API
    const upload = await imageUpload(image);

    // set data image to url of image
    data.image = upload.url;
    data.category = category.value;
    data.subsection = selectedSubsection;

    // API call
    mutation.mutate(data);
    console.log(data);

    setIsOpen(true);
  };

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
          <div className="pb-4">
            <button 
              className="bg-[#f2f2f2] px-5 py-2 rounded-xl hover:bg-[#D9D9D9] transition duration-700 ease-in-out"
              onClick={() => router.back()}
            >
              Back
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-container">
            <div className="w-3/4 max-h-full overflow-y-auto justify-center bg-[#f2f2f2] rounded-xl shadow-lg">
              <div className="rounded-xl m-2">
                  {/* if mutation is success or failed */}
                  {mutation.isSuccess && <p>Success</p>}
                  {mutation.isError && <p>{mutation.error.data}</p>}
          
                  {/* form for article */}
                  <div className="flex flex-col space-y-4 p-4">
                    <div className="bg-white p-2 rounded-md">
                      <Input
                        name="title"
                        type="text"
                        label="Title"
                        data={data}
                        setData={setData}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-bold text-lg pl-2">Text</label>
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        toolbarClassName="flex sticky top-0 z-40 !justify-center mx-auto"
                        editorClassName="mt-2 px-4 bg-[#fff] shadow-lg min-h-screen"
                      />
                    </div>

                    {/* Image Upload component */}
                    <div className="bg-white rounded-md shadow-xl">
                      <ImageUpload setImage={setImage} />
                    </div>
                  </div>
              </div>
              <PopupDialog isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          
            <div className="w-1/4 pl-8 pr-3 rounded-md">
              <div className="flex flex-col">
                <label htmlFor="writer">Author</label>
                <input
                  name="writer"
                  type="text"
                  label="Author"
                  value={data.writer}
                  className="rounded-md border-b border-gray-300 focus:outline-none focus:border-none"
                />
              </div>

              <div className="mt-5">
                <div>Category</div>
                <Listbox value={category.value} onChange={setCategory}>
                  <div className="relative">
                    <Listbox.Button className="bg-white w-full rounded-md font-bold flex justify-between px-4 py-2">
                      {category.name}
                    </Listbox.Button>
                    <Listbox.Options className="absolute w-full mb-2 py-2 bg-white rounded-md font-semibold">
                      {categories.map((cat) => (
                        <Listbox.Option
                          className="hover:bg-yellowwallow hover:bg-opacity-75 px-4 py-2 cursor-pointer"
                          key={cat.value}
                          value={cat}
                          >
                          {cat.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
    
              <div className="m-3">
                <RadioGroup
                  value={selectedSubsection}
                  onChange={setselectedSubsection}
                >
                  <div className="space-y-2">
                    {category.subsection &&
                      category?.subsection.map((sub) => (
                        <RadioGroup.Option key={sub.value} value={sub.value}>
                          {({ checked }) => (
                            <div className="flex items-center space-x-4">
                              <div
                                className={`${
                                  checked
                                    ? "bg-yellowwallow ring-yellowwallow"
                                    : "ring-black"
                                } ring rounded-full w-4 h-4`}
                                >
                                {checked && <CheckIcon className="w-4 h-4" />}
                              </div>
                              <span className="font-semibold">{sub.name}</span>
                            </div>
                          )}
                        </RadioGroup.Option>
                      ))}
                  </div>
                </RadioGroup>
              </div>
    
              <div>
                <button
                  className="px-4 py-2 bg-yellowwallow text-sm font-semibold rounded-lg hover:bg-opacity-75"
                  type="submit"
                  >
                  Submit to drafts
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const res = await axios
    .get(`http://localhost:3000/api/user/${session.id}`)
    .then((res) => res.data);
  
  return {
    props: { user: res.user },
  };
}
