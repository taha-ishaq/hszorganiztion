import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(fileStr) {
  const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    folder: "hsz-products",
  });
  return uploadResponse;
}

// New delete function
export async function deleteImage(public_id) {
  if (!public_id) return;
  return cloudinary.uploader.destroy(public_id);
}
