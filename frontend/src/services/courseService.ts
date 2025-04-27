import axios from "@/configs/axiosConfig";

export const get20PopularCourses = async () => {
  try {
    const response = await axios.get("courses/popular");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const get20NewestCourses = async () => {
  try {
    const response = await axios.get("courses/newest");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCourseById = async (courseId: string) => {
  try {
    const response = await axios.get(`courses/${courseId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
