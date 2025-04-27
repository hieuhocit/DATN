import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useTheme } from "@mui/material/styles";

// Định nghĩa kiểu cho lesson
interface Lesson {
  id: number;
  title: string;
  duration: number;
  videoUrl: string;
  orderIndex: number;
}

// Định nghĩa kiểu cho props của Sidebar
interface SidebarProps {
  lessons: Lesson[];
  currentLessonId: number | null;
  onLessonClick: (id: number) => void;
  progress: number;
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  lessons,
  currentLessonId,
  onLessonClick,
  progress,
  mobile = false,
  open = false,
  onClose = () => {},
}: SidebarProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const noteColor = isDark ? "#90caf9" : "#1976d2";

  const SidebarContent = (
    <Box
      sx={{
        width: 350,
        p: 3,
        bgcolor: isDark ? "#1e1e1e" : "#fff",
        height: mobile ? "100%" : "calc(100vh - 120px)",
        borderRadius: 3,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: isDark ? "#2c2c2c" : "#f1f1f1",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: isDark ? "#555" : "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: isDark ? "#777" : "#555",
        },
        scrollbarWidth: "thin",
        scrollbarColor: isDark ? "#555 #2c2c2c" : "#888 #f1f1f1",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {progress}% • 0/{lessons.length} bài học
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <NoteAddIcon sx={{ color: noteColor }} fontSize="small" />
          <Typography variant="body2" sx={{ color: noteColor }}>
            Ghi chú
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" fontWeight="bold" mb={2}>
        📚 Nội dung khóa học
      </Typography>

      <List>
        {lessons.map((lesson, idx) => {
          const isSelected =
            currentLessonId !== null && lesson.id === currentLessonId;
          const bgColor = isSelected
            ? isDark
              ? "#333"
              : "#e3f2fd"
            : "transparent";
          const hoverBgColor = isDark ? "#333" : "#f5f5f5";

          return (
            <Box key={lesson.id}>
              <ListItemButton
                onClick={() => onLessonClick(lesson.id)}
                sx={{
                  borderRadius: 2,
                  bgcolor: bgColor,
                  "&:hover": { bgcolor: hoverBgColor },
                }}
              >
                <ListItemText
                  primary={`${idx + 1}. ${lesson.title}`}
                  secondary={`${Math.floor(lesson.duration / 60)}:${String(
                    lesson.duration % 60
                  ).padStart(2, "0")}`}
                />
              </ListItemButton>
              {idx < lessons.length - 1 && <Divider sx={{ my: 0.5 }} />}
            </Box>
          );
        })}
      </List>
    </Box>
  );

  return mobile ? (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {SidebarContent}
    </Drawer>
  ) : (
    SidebarContent
  );
}
