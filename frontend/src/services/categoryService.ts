import axios from "@/configs/axiosConfig";
import { Category } from "@/types";

export async function getCategories() {
  try {
    const { data } = await axios.get("/categories");
    return data as Category[];
  } catch (error) {
    return error;
  }
}
