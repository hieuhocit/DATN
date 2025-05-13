import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Course } from "@/types";
import CourseEditForm from "./CourseEditForm";
import CourseCard from "./CourseCard";
import { deleteCourse } from "@/services/courseService";
import { toast } from "react-toastify";

interface CourseListTabProps {
  courses: Course[];
  fetchCourses: () => void;
}

export default function CourseListTab({
  courses,
  fetchCourses,
}: CourseListTabProps) {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );

  const handleSelectedCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  const handleDeleteCourse = async (courseId: string) => {
    const res = await deleteCourse(courseId);
    if (res.statusCode !== 200) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    fetchCourses();
  };

  return (
    <Box sx={{ mt: 4 }}>
      {selectedCourse ? (
        <Box>
          <CourseEditForm
            fetchCourses={fetchCourses}
            courseId={selectedCourse._id}
            onBack={handleBackToList}
          />
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
                <Box key={course._id}>
                  <CourseCard
                    course={course}
                    onDelete={handleDeleteCourse}
                    onEdit={handleSelectedCourse}
                  />
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
