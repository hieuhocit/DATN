import {
  Box,
  Skeleton,
  Divider,
  Button,
  useTheme,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CourseFormSkeleton = () => {
  const theme = useTheme();

  const getBgColor = () =>
    theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff";

  return (
    <Box
      sx={{
        bgcolor: getBgColor(),
        borderRadius: "16px",
        boxShadow: theme.shadows[6],
        p: { xs: 3, sm: 5 },
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        "&:hover": { boxShadow: theme.shadows[8] },
        transition: "box-shadow 0.3s ease",
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        disabled
        sx={{ mb: 3, textTransform: "none", fontWeight: 500 }}
      >
        Quay lại
      </Button>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          mb: 4,
          textAlign: "center",
        }}
      >
        <Skeleton width="60%" sx={{ mx: "auto" }} />
      </Typography>

      {/* Basic Information Section */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        <Skeleton width="40%" />
      </Typography>

      <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={120} />
        <Skeleton variant="rounded" height={56} />
      </Box>

      {/* Thumbnail */}
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="rounded" width={180} height={40} />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rounded" height={200} />
        </Box>
      </Box>

      {/* Category and Level */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          mb: 3,
        }}
      >
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
      </Box>

      {/* Requirements and What You'll Learn */}
      <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
        <Skeleton variant="rounded" height={100} />
        <Skeleton variant="rounded" height={120} />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Lessons Section */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        <Skeleton width="30%" />
      </Typography>

      {/* Lesson Card */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.mode === "dark" ? "#222" : "#fafafa",
        }}
      >
        <Skeleton variant="rounded" height={56} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" height={90} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" width={150} height={40} />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rounded" height={150} />
        </Box>
      </Box>

      {/* Add Lesson Button */}
      <Skeleton
        variant="rounded"
        width={150}
        height={40}
        sx={{ mt: 2, mb: 4 }}
      />

      {/* Submit Button */}
      <Skeleton
        variant="rounded"
        height={56}
        sx={{ mt: 4, borderRadius: "8px" }}
      />
    </Box>
  );
};

export default CourseFormSkeleton;
