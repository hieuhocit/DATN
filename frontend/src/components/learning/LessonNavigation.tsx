import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface LessonNavigationProps {
  max: number;
  min: number;
  current: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function LessonNavigation({
  current,
  max,
  min,
  onNext,
  onPrev,
}: LessonNavigationProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 4,
        py: 2,
        zIndex: 1000,
        bgcolor: isDark ? "rgba(255, 255, 255,0.2)" : "rgba(0, 0, 0,0.4)",
        overflowX: "hidden",
      }}
    >
      <Button
        variant="outlined"
        disabled={current <= min}
        onClick={onPrev}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1,
          textTransform: "none",
          color: isDark ? "#fff" : "#fff",
          borderColor: isDark ? "#666" : "#ccc",
          "&:disabled": {
            color: isDark ? "#555" : "#999",
            borderColor: isDark ? "#444" : "#ddd",
          },
        }}
      >
        ← Bài trước
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={current >= max - 1}
        onClick={onNext}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1,
          textTransform: "none",
          bgcolor: isDark ? "#1976d2" : "#1976d2",
          "&:hover": {
            bgcolor: isDark ? "#1565c0" : "#1565c0",
          },
          "&:disabled": {
            bgcolor: isDark ? "#333" : "#e0e0e0",
            color: isDark ? "#555" : "#999",
          },
        }}
      >
        Bài tiếp theo →
      </Button>
    </Box>
  );
}
