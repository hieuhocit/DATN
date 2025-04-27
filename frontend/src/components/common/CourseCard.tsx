// Components
import Image from "./Image";
import { OneLineTypography, TwoLineTypography } from "../typography";

// Icons
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// MUI
import { Box, Button, Rating, Stack, Tooltip, Typography } from "@mui/material";

// Types
import { Course } from "@/types";
type Props = {
  course: Course;
};

export default function Card({ course }: Props) {
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Add to cart");
  };

  return (
    <Tooltip
      title="Xem chi tiết"
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
          <Image src={"/images/image-placeholder.png"} fill />
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
          <Typography sx={{ fontSize: "1rem" }} fontWeight={600}>
            ₫{course.price}
          </Typography>
          <Button onClick={handleAddToCart} variant="text" sx={{ gap: 1 }}>
            <AddShoppingCartIcon />
            <Typography>Giỏ hàng</Typography>
          </Button>
        </Stack>
      </Stack>
    </Tooltip>
  );
}
