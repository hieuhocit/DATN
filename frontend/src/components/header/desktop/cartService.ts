import axios from "@/configs/axiosConfig";

export const getCart = async () => {
  try {
    const result = await axios.get("/cart");
    return result;
  } catch (error) {
    return error;
  }
};
