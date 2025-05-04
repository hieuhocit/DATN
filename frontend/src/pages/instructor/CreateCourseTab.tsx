import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CourseForm from "@/pages/instructor/CourseFormProps";
import { categories, levels } from "@/pages/Instructor";

interface CreateCourseTabProps {
  categories: typeof categories;
  levels: typeof levels;
}

export default function CreateCourseTab({
  categories,
  levels,
}: CreateCourseTabProps) {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
          mb: 4,
          textTransform: "uppercase",
          letterSpacing: "2px",
          backgroundColor: "#e3f2fd",
          py: 2,
          borderRadius: "8px",
        }}
      >
        Tạo Khóa Học Mới
      </Typography>
      <CourseForm categories={categories} levels={levels} />
    </Box>
  );
}
