import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Lesson {
  id: number;
  title: string;
  duration: number;
  videoUrl: string;
  orderIndex: number;
}

interface LessonNavigationProps {
  lessons: Lesson[];
  currentLessonIndex: number;
  onNavigate: (lessonId: number) => void;
}

export default function LessonNavigation({ lessons, currentLessonIndex, onNavigate }: LessonNavigationProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Kiểm tra nếu lessons rỗng
  if (!lessons || lessons.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 2,
        zIndex: 1000,
      }}
    >
      <Button
        variant="outlined"
        disabled={currentLessonIndex === 0}
        onClick={() => onNavigate(lessons[currentLessonIndex - 1]?.id)}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1,
          textTransform: 'none',
          color: isDark ? '#fff' : '#000',
          borderColor: isDark ? '#666' : '#ccc',
          '&:disabled': {
            color: isDark ? '#555' : '#999',
            borderColor: isDark ? '#444' : '#ddd',
          },
        }}
      >
        ← Bài trước
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={currentLessonIndex === lessons.length - 1}
        onClick={() => onNavigate(lessons[currentLessonIndex + 1]?.id)}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1,
          textTransform: 'none',
          bgcolor: isDark ? '#1976d2' : '#1976d2',
          '&:hover': {
            bgcolor: isDark ? '#1565c0' : '#1565c0',
          },
          '&:disabled': {
            bgcolor: isDark ? '#333' : '#e0e0e0',
            color: isDark ? '#555' : '#999',
          },
        }}
    >
        Bài tiếp theo →
      </Button>
    </Box>
  );
}