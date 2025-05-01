import axios from "@/configs/axiosConfig";

export const changePassword = async (
  newPassword: string,
  oldPassword: string
) => {
  try {
    const response = await axios.post("/change-password", {
      newPassword,
      oldPassword,
    });
    return response;
  } catch (error) {
    console.error("Error resetting password:", error);
    return error;
  }
};

export const sendCodeToEmail = async (email: string) => {
  try {
    const response = await axios.post("/forgot-password", { email });
    return response;
  } catch (error) {
    console.error("Error sending code to email:", error);
    return error;
  }
};

export const verifyCode = async (email: string, code: number) => {
  try {
    const response = await axios.post("/verify-reset-code", {
      email,
      resetCode: code,
    });
    return response;
  } catch (error) {
    console.error("Error verifying code:", error);
    return error;
  }
};

export const resetPassword = async (
  resetToken: string,
  newPassword: string
) => {
  try {
    const response = await axios.post("/reset-password", {
      resetToken,
      password: newPassword,
    });
    return response;
  } catch (error) {
    console.error("Error resetting password:", error);
    return error;
  }
};
