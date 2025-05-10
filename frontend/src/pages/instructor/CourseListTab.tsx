import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Course } from '@/types';
import CourseForm from './CourseFormProps';
import { categories, levels } from './Instructor';
// React Toastify
import { toast } from "react-toastify";

interface CourseListTabProps {
  courses: Course[];
}

export default function CourseListTab({ courses: initialCourses }: CourseListTabProps) {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);
  const [courses, setCourses] = React.useState<Course[]>(initialCourses);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa khóa học này?');
    if (confirmDelete) {
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
      toast.success('Xóa khóa học thành công!');
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
              fontWeight: 'bold',
              color: '#1a237e',
              mb: 4,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              background: 'default',
              py: 2,
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            CHỈNH SỬA KHÓA HỌC
          </Typography>
          <CourseForm
            categories={categories}
            levels={levels}
            courseToEdit={selectedCourse}
            onBack={handleBackToList}
          />
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#1a237e',
              mb: 4,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              background: 'default',
              py: 2,
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            DANH SÁCH KHÓA HỌC ĐÃ TẠO
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {courses.map((course) => (
              <Card
                key={course._id}
                sx={{
                  width: 300,
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.03)', boxShadow: '0 6px 16px rgba(0,0,0,0.15)' },
                }}
              >
                <CardActionArea onClick={() => handleCourseClick(course)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.thumbnail}
                    alt={course.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: '#1a237e',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.description.length > 100
                        ? `${course.description.substring(0, 100)}...`
                        : course.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
                      Giá: {(typeof course.price === 'number' ? course.price : 0).toLocaleString()} VND
                    </Typography>
                    {typeof course.discountPrice === 'number' && course.discountPrice < course.price && (
                      <Typography variant="body2" color="error">
                        Giảm giá: {(typeof course.discountPrice === 'number' ? course.discountPrice : 0).toLocaleString()} VND
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    onClick={() => handleDeleteCourse(course._id)}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': { bgcolor: 'rgba(255, 0, 0, 0.1)' },
                    }}
                    aria-label={`Xóa khóa học ${course.title}`}
                  >
                    <DeleteIcon sx={{ color: 'red' }} />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}