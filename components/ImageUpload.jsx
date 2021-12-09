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
      {/* Image Input needs styling */}
      <label htmlFor="imageInput">
        Upload Image...
        <Image src={imagePreview || placeholder} width="300px" height="300px" />
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
