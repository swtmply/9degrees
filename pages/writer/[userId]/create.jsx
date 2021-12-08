import { useState } from "react";
import dynamic from "next/dynamic";

import { convertToRaw, EditorState } from "draft-js";
import { useMutation } from "react-query";
import axios from "axios";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ImageUpload from "@/components/ImageUpload";
import imageUpload from "@/lib/imageUpload";
import Input from "@/components/Input";
import { Listbox } from "@headlessui/react";
import { categoryList } from "pages/auth/register";
import { getSession } from "next-auth/react";

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
  const [category, setCategory] = useState(user?.categories[0]);

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
    data.category = category;

    // API call
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-200">
      <div className="flex flex-col bg-white shadow-lg">
        {/* Image Upload component */}
        <ImageUpload setImage={setImage} />

        {/* if mutation is success or failed */}
        {mutation.isSuccess && <p>Success</p>}
        {mutation.isError && <p>{mutation.error.data}</p>}

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
              toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
              editorClassName="mt-2 p-10"
            />
          </div>

          <Listbox value={category} onChange={setCategory}>
            <Listbox.Button>{category}</Listbox.Button>
            <Listbox.Options>
              {user?.categories.map((c) => (
                <Listbox.Option key={c} value={c}>
                  {c}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>

          <div>
            <button className="p-2 bg-blue-500 text-white" type="submit">
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

  const res = await axios
    .get(`http://localhost:3000/api/user/${session.id}`)
    .then((res) => res.data);

  return {
    props: { user: res.user },
  };
}
