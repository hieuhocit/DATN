// Components
import { useQuery } from "@tanstack/react-query";
import CourseSection from "../common/CourseSection";

// Services
import { get20PopularCourses } from "@/services/courseService";

// Types
import { Course } from "@/types";

export default function Popular() {
  const { data: res, isLoading } = useQuery({
    queryKey: ["popularCourses"],
    queryFn: get20PopularCourses,
  });

  const courses = res?.data || [];

  return (
    <>
      <CourseSection
        title="Phổ biến"
        courses={courses as Course[]}
        isLoading={isLoading}
      />
    </>
  );
}
