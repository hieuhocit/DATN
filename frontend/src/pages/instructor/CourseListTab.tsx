import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Course } from "@/types";
import CourseForm from "./CourseForm";
import CourseCard from "./CourseCard";

interface CourseListTabProps {
  courses: Course[];
}

export default function CourseListTab({ courses }: CourseListTabProps) {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );

  const handleSelectedCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    console.log("Delete course with ID:", courseId);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {selectedCourse ? (
        <Box>
          <CourseForm courseToEdit={selectedCourse} onBack={handleBackToList} />
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
