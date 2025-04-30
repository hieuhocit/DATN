import axios from "@/configs/axiosConfig";
import { CartItem } from "@/types";

export const getCart = async () => {
  try {
    const response = await axios.get("/cart");
    return response.data as CartItem[];
  } catch (error) {
    return error;
  }
};

export const addToCart = async (courseId: string) => {
  try {
    const response = await axios.post("/cart", { courseId });
    return response;
  } catch (error) {
    return error;
  }
};

export const removeFromCart = async (courseId: string) => {
  try {
    const response = await axios.delete(`/cart/${courseId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const addMultipleToCart = async (
  courseIds: string[],
  signal?: AbortSignal
) => {
  try {
    const response = await axios.post(
      "/cart/multiple",
      { courseIds },
      {
        signal: signal,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
