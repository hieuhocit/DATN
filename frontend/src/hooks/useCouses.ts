import {
  getCourseById,
  getCoursesByInstructor,
  getRecommendedCourses,
} from "@/services/courseService";
import { Course, Lesson, Review } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useCoursesByInstructor = () => {
  const {
    data: res,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["coursesByInstructor"],
    queryFn: getCoursesByInstructor,
  });

  const data = res?.data || [];

  return {
    coursesByInstructor: data,
    isLoading,
    error,
    refetch,
  };
};

export const useCourseById = (courseId: string) => {
  const {
    data: res,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["courseById", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });

  const data = res?.data || {};

  return {
    course: data?.course as Course | undefined,
    lessons: data?.lessons as Lesson[] | undefined,
    reviews: data?.reviews as Review[] | undefined,
    isLoading,
    error,
    refetch,
  };
};

export const useRecommendedCourses = () => {
  return useQuery({
    queryKey: ["recommendedCourses"],
    queryFn: getRecommendedCourses,
  });
};
