import { useState } from "react";
import Image from "next/image";

// NOTE: buo na rin siya, styling na lang kulang
// TODO: Styling

import placeholder from "public/samples/placeholder-image.png";
import { PhotographIcon } from "@heroicons/react/outline";

export default function ImageUpload({ image, setImage }) {
  // image preview state para lang makita yung nilagay na image
  // dun sa input
  const [hover, setHover] = useState(false);

  return (
    <div className="flex w-full justify-between rounded-md px-8 py-4">
      {/* Image Input needs styling */}
      <span className="font-semibold text-xl">File Upload</span>

      <label className="relative w-[60%]" htmlFor="imageInput">
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`flex justify-center items-center w-full border-4 space-x-4 border-dashed rounded-md py-4 ${
            hover
              ? "border-padeepBlue text-padeepBlue"
              : "border-gray-500 text-gray-500"
          }`}
        >
          <PhotographIcon className="w-8 h-8" />
          <p className="font-bold text-lg ">
            {image?.name || "Click to upload a file"}
          </p>
        </div>
      </label>

      <input
        className="hidden outline-none"
        type="file"
        accept=".jpg, .png, .jpeg"
        name="image"
        id="imageInput"
        onChange={(e) => {
          // get the image file format
          const file = e.target.files[0];

          // setImage for upload
          setImage(file);

          // for image preview
          const reader = new FileReader();
          reader.readAsDataURL(file);
        }}
      />
    </div>
  );
}
