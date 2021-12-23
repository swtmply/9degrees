import { useState } from "react";
import Image from "next/image";

// NOTE: buo na rin siya, styling na lang kulang
// TODO: Styling

import placeholder from "public/placeholder-image.png";

export default function ImageUpload({ setImage }) {
  // image preview state para lang makita yung nilagay na image
  // dun sa input
  const [imagePreview, setImagePreview] = useState();

  return (
    <div>
      <div className="px-5 pt-4 space-y-4">
        <div className="font-bold text-lg">Upload Image</div>
        <input
          className="outline-gray"
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

      <div className="flex items-center justify-center p-4">
        <div className="outline-dashed outline-4 outline-gray-500 rounded-md w-full h-170">
          <div className="flex justify-center p-5">
            <Image
              src={imagePreview || placeholder}
              width="200px"
              height="200px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
