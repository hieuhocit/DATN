import axios from "@/configs/axiosConfig";

export const resetPassword = async (newPassword:string,oldPassword:string) => {
  try {
    const response = await axios.post("/change-password", {newPassword, oldPassword});
    return response;
  } catch (error) {
    return error;
  }
};

