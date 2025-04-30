import axios from "@/configs/axiosConfig";

export const becomeInstructor = async () => {
  try {
    const response = await axios.get("/become-instructor");
    return response;
  } catch (error) {
    return error;
  }
};
