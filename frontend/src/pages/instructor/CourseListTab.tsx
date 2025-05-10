import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Course } from "@/types";
import CourseForm from "./CourseFormProps";
// React Toastify
import { toast } from "react-toastify";
import CourseSection from "@/components/common/CourseSection";
import CourseCard from "./CourseCard";

interface CourseListTabProps {
  courses: Course[];
}

export default function CourseListTab({ courses }: CourseListTabProps) {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa khóa học này?"
    );
    if (confirmDelete) {
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {selectedCourse ? (
        <Box>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#1a237e",
              mb: 4,
              textTransform: "uppercase",
              letterSpacing: "2px",
              background: "default",
              py: 2,
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            CHỈNH SỬA KHÓA HỌC
          </Typography>
          {/* <CourseForm
            categories={categories}
            levels={levels}
            courseToEdit={selectedCourse}
            onBack={handleBackToList}
          /> */}
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                columnGap: "32px",
                rowGap: "48px",
              },
            }}
          >
            {courses &&
              courses.map((course) => (
                <Box
                  key={course._id}
                  // onClick={() => handleCardClick(course._id)}
                >
                  <CourseCard course={course} />
                </Box>
              ))}
          </Box>

          {courses && courses.length == 0 && (
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#616161",
                mb: 4,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Không có khóa học nào
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
