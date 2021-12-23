import { useState } from "react";
import Image from "next/image";

// NOTE: buo na rin siya, styling na lang kulang
// TODO: Styling

import placeholder from "public/samples/placeholder-image.png";
import { UploadIcon } from "@heroicons/react/outline";

export default function UserImageUpload({ setImage, image }) {
  // image preview state para lang makita yung nilagay na image
  // dun sa input
  const [imagePreview, setImagePreview] = useState();
  const [hover, setHover] = useState(false);

  return (
    <div className="flex flex-col inset-1px-8 py-4 absolute inset-0 rounded-full justify-center items-center">
      {/* Image Input needs styling */}
      <label
        className="absolute rounded-full bg-gray-100 inset-0"
        htmlFor="imageInput"
      >
        <div className="relative rounded-full w-full h-full">
          <Image
            className="rounded-full"
            src={imagePreview || image || placeholder}
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`relative ${
            !imagePreview && "border-4 border-dashed border-yellowwallow"
          }  flex justify-center items-center`}
        >
          <div
            className={`${
              hover
                ? "transition-all absolute flex flex-col justify-center items-center inset-0 bg-black bg-opacity-20"
                : "opacity-0 scale-75"
            }`}
          >
            <UploadIcon className="w-12 h-12 text-white" />
            <p className="font-bold text-lg text-white">
              Click to upload a file
            </p>
          </div>
        </div> */}
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
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
        }}
      />
    </div>
  );
}
