// Components
import { useRecommendedCourses } from "@/hooks/useCouses";
import CourseSection from "../common/CourseSection";

export default function Recommendation() {
  const { data: res, isLoading } = useRecommendedCourses();

  const courses = res?.data || [];

  return (
    <>
      {!isLoading && (
        <CourseSection title="Đề xuất cho bạn" courses={courses} />
      )}
    </>
  );
}
