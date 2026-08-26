import axios from "axios";

/**
 * Uploads an image file to Cloudinary using an unsigned upload preset.
 * @param {File} file - The file object from <input type="file">
 * @returns {Promise<string>} - The secure HTTPS download URL of the uploaded image.
 */
export async function uploadImageToCloudinary(file) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "lrz8c0of";
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ai-course";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );

  return response.data.secure_url;
}
