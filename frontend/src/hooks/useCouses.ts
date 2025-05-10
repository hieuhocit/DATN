import { getCoursesByInstructor } from "@/services/courseService";
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
