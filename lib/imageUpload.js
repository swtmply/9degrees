import axios from "axios";

// Cloudinary API lang para sa upload

export default async function imageUpload(image) {
  try {
    const formData = new FormData();

    // image file under image input
    formData.append("file", image);
    // FIXME: yung upload preset code kailangan maging secret OwO
    formData.append("upload_preset", "twtqqkx8");

    const upload = await axios
      .post("https://api.cloudinary.com/v1_1/sitickets/image/upload", formData)
      .then((res) => res.data);

    // return response from cloudinary
    return upload;
  } catch (error) {
    console.log(error);
  }
}
