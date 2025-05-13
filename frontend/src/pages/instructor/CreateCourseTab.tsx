import Box from "@mui/material/Box";
import CourseCreateForm from "./CourseCreateForm";

interface CreateCourseTabProps {
  fetchCourses: () => void;
}

export default function CreateCourseTab({
  fetchCourses,
}: CreateCourseTabProps) {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, mb: 6 }}>
      <CourseCreateForm fetchCourses={fetchCourses} />
    </Box>
  );
}
