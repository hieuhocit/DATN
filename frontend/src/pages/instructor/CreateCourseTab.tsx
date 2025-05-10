import Box from "@mui/material/Box";
import CourseForm from "./CourseFormProps";

export default function CreateCourseTab() {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, mb: 6 }}>
      <CourseForm courseToEdit={undefined} onBack={undefined} />
    </Box>
  );
}
