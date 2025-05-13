import {
  IUploadImageFileResponse,
  IUploadVideoFileResponse,
  uploadFileToCloudinary,
} from "@/services/cloudinaryService";

export async function handleUploadVideoFile(file: File) {
  const formData = new FormData();
  formData.append("type", "video");
  formData.append("file", file);
  const res = (await uploadFileToCloudinary(
    formData
  )) as IUploadVideoFileResponse;

  if (res?.statusCode === 200) {
    return res?.data;
  }
  return null;
}

export async function handleUploadThumbnailFile(file: File) {
  const formData = new FormData();
  formData.append("type", "image");
  formData.append("file", file);

  const res = (await uploadFileToCloudinary(
    formData
  )) as IUploadImageFileResponse;

  if (res?.statusCode === 200) {
    return res?.data;
  }
  return null;
}
