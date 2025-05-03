import axios from "@/configs/axiosConfig";
import { Category } from "@/types";

export async function getCategories() {
  try {
    const response = await axios.get("/categories");
    const data = response.data as Category[] || [];
    return data;
  } catch (error) {
    return error;
  }
}
