import axios from "@/configs/axiosConfig";
import { Course, Lesson, Note, Review } from "@/types";

export interface CourseDetails {
  course: Course;
  reviews: Review[];
  lessons: Lesson[];
  notes: Note[];
}

export interface ICreateCourseData {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  instructorId: string;
  categoryId: string;
  level: Course["level"];
  requirements: string;
  whatYouWillLearn: string;
  isPublished?: boolean;
}

export interface IUpdateCourseData extends ICreateCourseData {
  isPublished?: boolean;
}

export interface ICreateCourseResponse {
  statusCode: number;
  statusText: string;
  message: string;
  data: Course;
}

export const deleteCourse = async (courseId: string) => {
  try {
    const response = await axios.delete(`courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
  }
};

export const createCourse = async (data: ICreateCourseData) => {
  try {
    const response = await axios.post("courses", data);
    return response.data as ICreateCourseResponse;
  } catch (error) {
    console.error("Error creating course:", error);
  }
};

export const updateCourse = async (
  courseId: string,
  data: IUpdateCourseData
) => {
  try {
    const response = await axios.put(`courses/${courseId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
  }
};

export const get20PopularCourses = async () => {
  try {
    const response = await axios.get("courses/popular");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const get20NewestCourses = async () => {
  try {
    const response = await axios.get("courses/newest");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCourseById = async (courseId: string) => {
  if (!courseId) return;
  try {
    const response = await axios.get(`courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCourseBySlug = async (courseSlug: string) => {
  try {
    const response = await axios.get(`learning/${courseSlug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by slug:", error);
  }
};

export const getCoursesByQuery = async (query: string) => {
  try {
    const response = await axios.get(`courses/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses by query:", error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [] as any;
  }
};

export const getCoursesByCategoryId = async (categoryId: string) => {
  try {
    const response = await axios.get(`courses/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses by category ID:", error);
    return [];
  }
};

export const getCoursesByInstructor = async () => {
  try {
    const response = await axios.get("courses/instructor");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses by instructor:", error);
    return [];
  }
};
