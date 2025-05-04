import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Lesson } from "@/types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useRef } from "react";

interface Props {
  currentLessonId: string | undefined;
  lessons: Lesson[];
  handleClickJumpToLesson: (lessonId: string) => void;
}

export default function Category({
  lessons,
  currentLessonId,
  handleClickJumpToLesson,
}: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const currentLessonIndex = lessons.findIndex(
      (lesson) => lesson._id === currentLessonId
    );

    if (listRef.current && currentLessonIndex !== -1) {
      const childElements = listRef.current.children;

      if (childElements && childElements[currentLessonIndex]) {
        childElements[currentLessonIndex].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [currentLessonId, lessons]);

  const numberOfCompletedLessons = lessons.filter(
    (lesson) => lesson.progress[0]?.isCompleted
  ).length;

  const percentCompleted = Math.floor(
    (numberOfCompletedLessons / lessons.length) * 100
  );

  return (
    <Box
      sx={{
        width: 350,
        p: 3,
        px: 1,
        bgcolor: isDark ? "#1e1e1e" : "#fff",
        borderRadius: 3,
        height: "fit-content",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          px: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {percentCompleted}% • {numberOfCompletedLessons}/{lessons.length} bài
          học
        </Typography>
      </Box>

      <Typography variant="h6" fontWeight="bold" mb={2} px={1}>
        📚 Nội dung khóa học
      </Typography>

      <List
        ref={listRef}
        sx={{
          maxHeight: "370px",
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
        {lessons.map((lesson, idx) => {
          const isSelected =
            currentLessonId !== null && lesson._id === currentLessonId;
          const bgColor = isSelected
            ? isDark
              ? "#333"
              : "#e3f2fd"
            : "transparent";
          const hoverBgColor = isDark ? "#333" : "#f5f5f5";

          return (
            <Box
              key={lesson._id}
              onClick={() => handleClickJumpToLesson(lesson._id)}
            >
              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
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
                {lesson.progress[0]?.isCompleted && (
                  <CheckCircleIcon color="success" sx={{ mt: 1 }} />
                )}
              </ListItemButton>
              {idx < lessons.length - 1 && <Divider sx={{ my: 0.5 }} />}
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
