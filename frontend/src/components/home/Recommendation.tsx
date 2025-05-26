// Components
import { useRecommendedCourses } from "@/hooks/useCouses";
import CourseSection from "../common/CourseSection";

export default function Recommendation() {
  const { data: res, isLoading } = useRecommendedCourses();

  const courses = res?.data || [];

  return (
    <>
      <CourseSection
        title="Đề xuất cho bạn"
        courses={courses}
        isLoading={isLoading}
      />
    </>
  );
}
