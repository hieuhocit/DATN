// Components
import CourseSection from "../common/CourseSection";

// Services
import { get20NewestCourses } from "@/services/courseService";

// React query
import { useQuery } from "@tanstack/react-query";

export default function Newest() {
  const { data: res, isLoading } = useQuery({
    queryKey: ["newestCourses"],
    queryFn: get20NewestCourses,
  });

  const courses = res?.data || [];

  return (
    <>
      <CourseSection title="Mới nhất" courses={courses} isLoading={isLoading} />
    </>
  );
}
