import { useState } from "react";
import dynamic from "next/dynamic";

import { convertToRaw, EditorState } from "draft-js";
import { useMutation } from "react-query";
import axios from "axios";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ImageUpload from "@/components/ImageUpload";
import imageUpload from "@/lib/imageUpload";

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

export default function Create() {
  // form state
  const [data, setData] = useState({
    title: "",
    image: "",
    body: "",
    writer: "",
    category: "",
  });
  // textarea editor state
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // image state for upload
  const [image, setImage] = useState();

  // mutation variable for api call
  const mutation = useMutation(addToDrafts);

  // handle change for inputs
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

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
          <div className="flex flex-col space-y-2">
            <input
              className="font-bold text-3xl tracking-wide outline-none py-4"
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Title"
              defaultValue="Title"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-bold text-2xl tracking-wide">Body:</label>
            {/* Text Area */}
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
              editorClassName="mt-2 p-10"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-bold text-2xl tracking-wide">Writer:</label>
            <input
              className="border-b border-gray-300 outline-none p-2 focus:border-black"
              type="text"
              name="writer"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-bold text-2xl tracking-wide">
              Category:
            </label>
            <select
              className="border-b border-gray-300 outline-none p-2 focus:border-black bg-transparent"
              name="category"
              onChange={handleChange}
            >
              <option value="">--- Select Category ---</option>
              <option value="Nature">Nature</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Technology">Technology</option>
              <option value="News">News</option>
            </select>
          </div>
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
