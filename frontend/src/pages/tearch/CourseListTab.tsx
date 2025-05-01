import CourseSection from '@/components/common/CourseSection';
import { Course } from '@/types';

interface CourseListTabProps {
  courses: Course[];
}

export default function CourseListTab({ courses }: CourseListTabProps) {
  return <CourseSection title="" courses={courses} />;
}