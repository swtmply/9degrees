import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { convertToRaw, EditorState } from "draft-js";
import { useMutation } from "react-query";
import axios from "axios";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ImageUpload from "@/components/Forms/ImageUpload";
import imageUpload from "@/lib/imageUpload";
import Input from "@/components/Forms/Input";
import { Listbox, RadioGroup } from "@headlessui/react";
import { getSession } from "next-auth/react";
import { categoryList } from "@/lib/constants";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/outline";
import PopupDialog from "@/components/PopupDialog";

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
  // form state
  const [data, setData] = useState({
    title: "",
    image: "",
    body: "",
    writer: user?.name,
    category: "",
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

  let [isOpen, setIsOpen] = useState(true);

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
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-200">
      <div className="flex flex-col bg-white shadow-lg">
        {/* Image Upload component */}
        <ImageUpload setImage={setImage} />

        {/* form for article */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
          <Input
            name="title"
            type="text"
            label="Title"
            data={data}
            setData={setData}
          />
          <div className="flex flex-col space-y-2">
            <label className="font-bold text-2xl tracking-wide">Body:</label>
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              toolbarClassName="flex sticky top-0 z-40 !justify-center mx-auto"
              editorClassName="mt-2 px-4 bg-[#fff] shadow-lg min-h-screen"
            />
          </div>

          <Listbox value={category.value} onChange={setCategory}>
            <div className="relative">
              <Listbox.Button className="bg-yellowwallow w-full rounded-md font-bold flex items-center justify-between px-4 py-2">
                {category.name}
                <ChevronDownIcon className="w-4 h-4" />
              </Listbox.Button>
              <Listbox.Options className="absolute w-full bottom-0 mb-12 py-2 bg-yellowwallow rounded-md font-semibold">
                {categories.map((cat) => (
                  <Listbox.Option
                    className="hover:bg-white hover:bg-opacity-75 px-4 py-3 cursor-pointer"
                    key={cat.value}
                    value={cat}
                  >
                    {cat.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          <RadioGroup
            value={selectedSubsection}
            onChange={setselectedSubsection}
          >
            <div className="px-2 space-y-2">
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

          <div>
            <button
              className="px-4 py-2 bg-yellowwallow text-sm font-semibold rounded-md"
              type="submit"
            >
              Submit to drafts
            </button>
          </div>
        </form>
      </div>
      {mutation.isSuccess && (
        <PopupDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
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
