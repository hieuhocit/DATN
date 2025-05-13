import axios from "@/configs/axiosConfig";

export interface IUploadVideoFileResponse {
  statusCode: number;
  statusText: string;
  message: string;
  data: {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: [];
    pages: number;
    bytes: number;
    type: string;
    etag: string;
    placeholder: false;
    url: string;
    secure_url: string;
    playback_url: string;
    asset_folder: string;
    display_name: string;
    audio: {
      codec: string;
      bit_rate: string;
      frequency: number;
      channels: number;
      channel_layout: string;
    };
    video: {
      pix_format: string;
      codec: string;
      level: number;
      profile: string;
      bit_rate: string;
      dar: string;
      time_base: string;
    };
    is_audio: false;
    frame_rate: number;
    bit_rate: number;
    duration: number;
    rotation: number;
    original_filename: string;
  };
}

export interface IUploadImageFileResponse {
  statusCode: number;
  statusText: string;
  message: string;
  data: {
    asset_id: string;
    public_id: string;
    version: string;
    version_id: string;
    signature: string;
    width: string;
    height: string;
    format: string;
    resource_type: string;
    created_at: string;
    bytes: string;
    type: string;
    etag: string;
    placeholder: false;
    url: string;
    secure_url: string;
    asset_folder: string;
    display_name: string;
    original_filename: string;
  };
}

export const uploadFileToCloudinary = async (data: FormData) => {
  try {
    const response = await axios.post("/upload-file", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data as IUploadVideoFileResponse | IUploadImageFileResponse;
  } catch (error) {
    console.error(error);
  }
};
