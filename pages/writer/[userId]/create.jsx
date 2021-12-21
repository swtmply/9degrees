import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { convertToRaw, EditorState } from "draft-js";
import { useMutation } from "react-query";
import axios from "axios";

import ImageUpload from "@/components/Forms/ImageUpload";
import imageUpload from "@/lib/imageUpload";
import Input from "@/components/Forms/Input";
import { Disclosure, Listbox, RadioGroup, Tab } from "@headlessui/react";
import { getSession } from "next-auth/react";
import { categoryList } from "@/lib/constants";
import PopupDialog from "@/components/PopupDialog";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@heroicons/react/solid";
import EditorContainer from "@/components/EditorContainer/EditorContainer";
import DisclosureButton from "@/components/Disclosure/Button/DisclosureButton";
import { EyeIcon } from "@heroicons/react/outline";
import { TagsInput } from "react-tag-input-component";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// mutation or api call for article POST
const addToDrafts = async (data) => {
  return await axios.post("/api/articles", data);
};

export default function Create({ user, userId }) {
  // form state
  const [data, setData] = useState({
    title: "",
    image: "",
    body: "",
    writer: user?.name,
    category: "",
    caption: "",
    tags: [],
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
  const [tags, setTags] = useState([]);

  let [isOpen, setIsOpen] = useState(true);

  // mutation variable for api call
  const mutation = useMutation(addToDrafts);

  const handleSubmit = async () => {
    // image upload to cloudinary API
    const upload = await imageUpload(image);

    // set data image to url of image
    data.image = upload.url;
    data.category = category.value;
    data.subsection = selectedSubsection;
    data.tags = tags;

    // console.log(data);

    // API call
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-400">
      <div className="bg-white w-[80%] rounded-md">
        <Tab.Group>
          <Tab.List className="bg-gray-200 rounded-md">
            <Tab
              className={({ selected }) =>
                classNames(
                  "py-2.5 px-5 font-bold text-lg rounded-tl-md border-2",
                  selected
                    ? "text-padeepBlue bg-white border-white"
                    : "text-gray-500 bg-gray-200  border-gray-300"
                )
              }
            >
              Content
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "py-2.5 px-5 font-bold text-lg border-2",
                  selected
                    ? "text-padeepBlue bg-white border-white"
                    : "text-gray-500 bg-gray-200 border-gray-300"
                )
              }
            >
              Information
            </Tab>
          </Tab.List>
          <Tab.Panels className="p-4">
            <Tab.Panel className="w-full space-y-2">
              <Disclosure>
                {({ open }) => (
                  <div>
                    <DisclosureButton open={open} title={"Text"} />
                    <Disclosure.Panel className="w-full p-4 flex items-center justify-center bg-gray-300 rounded-b-lg">
                      <div className="w-full rounded-lg bg-white">
                        <Input
                          name="title"
                          type="text"
                          label="Title"
                          data={data}
                          setData={setData}
                        />
                        <EditorContainer
                          editorState={editorState}
                          setEditorState={setEditorState}
                          data={data}
                          setData={setData}
                        />
                      </div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>

              <Disclosure>
                {({ open }) => (
                  <div>
                    <DisclosureButton open={open} title={"Image"} />
                    <Disclosure.Panel className="w-full p-4 flex items-center justify-center bg-gray-300 rounded-b-lg">
                      <div className="w-full rounded-lg bg-white">
                        <ImageUpload image={image} setImage={setImage} />
                        <Input
                          name="caption"
                          type="text"
                          label="Caption"
                          data={data}
                          setData={setData}
                        />
                      </div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </Tab.Panel>
            <Tab.Panel>
              <div className="w-full space-y-4 p-4 flex flex-col bg-gray-300 rounded-lg">
                {/* TODO: make a component for this */}
                <div className="w-full flex justify-between px-8 py-4">
                  <label className="font-semibold text-xl">Category</label>
                  <Listbox value={category.value} onChange={setCategory}>
                    <div className="relative z-50 w-[60%]">
                      <Listbox.Button className="bg-yellowwallow px-8 py-4 text-lg w-full rounded-md font-bold flex items-center justify-between ">
                        {category.name}
                        <ChevronDownIcon className="w-8 h-8" />
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-50 text-lg w-full mt-2 py-2 bg-yellowwallow rounded-md font-semibold">
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
                </div>

                {/* TODO: make a component for this */}
                <div className="w-full flex justify-between px-8 py-4">
                  <label className="font-semibold text-xl">Subsection</label>
                  <RadioGroup
                    value={selectedSubsection}
                    onChange={setselectedSubsection}
                    className="w-[60%]"
                  >
                    <div className="px-2 space-y-4">
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
                                  } ring rounded-full w-6 h-6`}
                                >
                                  {checked && <CheckIcon className="w-6 h-6" />}
                                </div>
                                <span className="font-semibold text-lg">
                                  {sub.name}
                                </span>
                              </div>
                            )}
                          </RadioGroup.Option>
                        ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex w-full justify-between rounded-md px-8 py-4">
                  <label className="font-semibold text-xl">Tags</label>
                  <TagsInput
                    value={tags}
                    onChange={setTags}
                    name="fruits"
                    placeHolder="Press Enter to add tag"
                  />
                </div>

                <div className="w-full flex justify-end px-8 py-4 space-x-4">
                  <button
                    className="flex justify-center items-center space-x-2 px-16 py-4 bg-white border-4 border-gray-500 text-lg font-bold rounded-md"
                    type="submit"
                  >
                    <EyeIcon className="w-8 h-8" />
                    <span>Preview</span>
                  </button>
                  <button
                    className="px-16 py-4 bg-yellowwallow text-lg font-bold rounded-md"
                    onClick={handleSubmit}
                  >
                    {mutation.isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      {mutation.isSuccess && (
        <PopupDialog isOpen={isOpen} setIsOpen={setIsOpen} userId={userId} />
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
    props: { user: res.user, userId: session.id },
  };
}
