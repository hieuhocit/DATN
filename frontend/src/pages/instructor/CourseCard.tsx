// Components
import Image from "../../components/common/Image";
import {
  OneLineTypography,
  TwoLineTypography,
} from "../../components/typography";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// MUI
import { Box, Button, Rating, Stack, Tooltip, Typography } from "@mui/material";

// Types
import { Course } from "@/types";
import { useAppSelector } from "@/hooks/useStore";
import { userSelector } from "@/features/account";
type Props = {
  course: Course;
  onDelete: (courseId: string) => void;
  onEdit: (course: Course) => void;
};

export default function Card({ course, onDelete, onEdit }: Props) {
  const user = useAppSelector(userSelector);

  return (
    <Tooltip
      title=""
      sx={{ cursor: "pointer", pb: 1 }}
      followCursor
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [35, 10],
            },
          },
        ],
      }}
      onClick={onEdit.bind(null, course)}
    >
      <Stack direction={"column"} width={"100%"} gap={"4px"}>
        <Box
          sx={{
            width: "100%",
            position: "relative",
            aspectRatio: "5/3",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Image
            src={course.thumbnail || "/images/image-placeholder.png"}
            fill
          />
        </Box>
        <TwoLineTypography
          sx={{ maxWidth: "100%", height: "40px", fontSize: "1rem" }}
          fontWeight={600}
        >
          {course.title}
        </TwoLineTypography>
        <OneLineTypography
          sx={{ opacity: 0.8, fontSize: "0.8rem" }}
          variant="body1"
          fontWeight={400}
        >
          {course.instructor?.[0]?.name}
        </OneLineTypography>
        <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
          <Typography sx={{ color: "#ff7b00", fontWeight: 600 }}>
            {course?.averageRating}
          </Typography>
          <Rating
            name="rating"
            value={course?.averageRating}
            precision={0.5}
            size="small"
            readOnly
          />
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography sx={{ fontSize: "1rem" }} fontWeight={600}>
              ₫{course.price}
            </Typography>
            {course.discountPrice && (
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  textDecoration: "line-through",
                  opacity: 0.5,
                }}
              >
                ₫{course.discountPrice}
              </Typography>
            )}
          </Box>
          <Box>
            {["admin", "instructor"].includes(user?.role ?? "") && (
              <Button
                onClick={onEdit.bind(null, course)}
                variant="text"
                sx={{ gap: 0 }}
              >
                <EditIcon />
                <Typography>Sửa</Typography>
              </Button>
            )}
            {["admin", "instructor"].includes(user?.role ?? "") && (
              <Button
                onClick={onDelete.bind(null, course._id)}
                variant="text"
                sx={{ gap: 0, color: "red" }}
              >
                <DeleteIcon />
                <Typography>Xoá</Typography>
              </Button>
            )}
          </Box>
        </Stack>
      </Stack>
    </Tooltip>
  );
}
