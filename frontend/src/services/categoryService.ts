import axios from "@/configs/axiosConfig";
import { Category } from "@/types";

export async function getCategories() {
  try {
    const response = await axios.get("/categories");
    const data = (response.data as Category[]) || [];
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCategoryBySlug(
  slug1: string,
  slug2?: string
): Promise<Category | undefined> {
  const slug = slug2 ? `/${slug1}/${slug2}` : `/${slug1}`;
  try {
    const response = await axios.get(`/categories/slug?query=${slug}`);
    const data = response.data as Category;
    return data;
  } catch (error) {
    console.error(error);
  }
}
