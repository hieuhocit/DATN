// Components
import Section from "../common/Section";
import Slider from "../common/Slider";

// MUI
import { Typography } from "@mui/material";
import { Box, Skeleton, Stack } from "@mui/material";

// Types
import { Course } from "@/types";

type Props = {
  title: string;
  courses: Course[];
  isLoading?: boolean;
};

export default function CourseSection({ title, courses, isLoading }: Props) {
  return (
    <Section
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" fontWeight={600}>
        {title}
      </Typography>
      {isLoading ? <RecommendationSkeleton /> : <Slider courses={courses} />}
    </Section>
  );
}

// Number of skeleton items to show while loading
const SKELETON_COUNT = 4;

export function RecommendationSkeleton() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        columnGap: "32px",
        rowGap: "48px",
      }}
    >
      {Array(SKELETON_COUNT)
        .fill(0)
        .map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
    </Box>
  );
}

// Individual skeleton card component
function CourseCardSkeleton() {
  return (
    <Stack direction={"column"} width={"100%"} gap={"4px"} sx={{ pb: 1 }}>
      {/* Image placeholder with same aspect ratio */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          aspectRatio: "5/3",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "rgba(0,0,0,0.08)",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      </Box>

      {/* Course title */}
      <Box sx={{ height: "20px" }}>
        <Skeleton variant="text" width="100%" height={20} />
      </Box>

      {/* Instructor name - one line */}
      <Skeleton variant="text" width="60%" height={16} sx={{ mt: 0.5 }} />

      {/* Rating section */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={"4px"}
        sx={{ mt: 0.5 }}
      >
        <Skeleton variant="text" width={30} height={20} />
        <Skeleton variant="rounded" width={100} height={20} />
      </Stack>

      {/* Price and button section */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ mt: 1 }}
      >
        <Box>
          <Skeleton variant="text" width={50} height={24} />
          <Skeleton variant="text" width={40} height={16} />
        </Box>

        {/* Button placeholder */}
        <Skeleton
          variant="rounded"
          width={120}
          height={36}
          sx={{ borderRadius: 1 }}
        />
      </Stack>
    </Stack>
  );
}
