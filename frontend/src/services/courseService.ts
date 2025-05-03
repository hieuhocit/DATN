import axios from "@/configs/axiosConfig";
import { Course, Lesson, Note, Review } from "@/types";

export interface CourseDetails {
  course: Course;
  reviews: Review[];
  lessons: Lesson[];
  notes: Note[];
}

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

export const getCourseBySlug = async (
  courseSlug: string
): Promise<CourseDetails | null | undefined> => {
  try {
    const response = await axios.get(`learning/${courseSlug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by slug:", error);
    return null;
  }
};
