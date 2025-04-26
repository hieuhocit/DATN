import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Lesson {
  id: number;
  title: string;
  duration: number;
  videoUrl: string;
  orderIndex: number;
}

interface Course {
  id: number;
  title: string;
  updatedAt: string;
}

interface VideoPlayerProps {
  lesson: Lesson;
  course: Course;
}

export default function VideoPlayer({ lesson, course }: VideoPlayerProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Kiểm tra nếu lesson hoặc course không tồn tại
  if (!lesson || !course) {
    return (
      <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, bgcolor: 'transparent' }}>
        <Typography variant="body2" color="text.secondary">
          Không có dữ liệu bài học hoặc khóa học.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        bgcolor: isDark ? '#1e1e1e' : '#f5f9fc',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 800,
          mb: 3,
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: '#000',
        }}
      >
        {lesson.videoUrl ? (
          <Box
            component="video"
            controls
            src={lesson.videoUrl}
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
            }}
          />
        ) : (
          <Box
            component="img"
            src="/images/image-placeholder.png"
            alt={lesson.title}
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              objectFit: 'cover',
            }}
          />
        )}
      </Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {lesson.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
        Cập nhật {new Date(course.updatedAt).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
      </Typography>
    </Paper>
  );
}