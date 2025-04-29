import React from "react";
import { useTheme } from "@/hooks/useTheme";

// MUI Components
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkout from "@/components/checkout/Checkout";
import Section from "@/components/common/Section";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { coursesInCartSelector, removeCourseFromCart } from "@/features/cart";

const Cart: React.FC = () => {
  const { themeMode } = useTheme();

  const dispatch = useAppDispatch();
  const courses = useAppSelector(coursesInCartSelector);

  const totalPrice = courses.reduce((total, item) => total + item.price, 0);

  const handleRemoveCourseFromCart = (courseId: string) => {
    dispatch(removeCourseFromCart(courseId));
  };

  const formatPrice = (price: number) => {
    return price?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <Section sx={{ mt: "128px", mb: "128px" }}>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            maxWidth: "64rem",
            mx: "auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: themeMode === "dark" ? "white" : "text.primary",
              mb: 2,
            }}
          >
            Giỏ hàng
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: themeMode === "dark" ? "grey.300" : "text.secondary",
              mb: 3,
            }}
          >
            {courses.length} khóa học trong giỏ hàng
          </Typography>

          <Stack spacing={2}>
            {courses.length === 0 ? (
              <Typography
                variant="body1"
                sx={{
                  color: themeMode === "dark" ? "grey.400" : "text.secondary",
                }}
              >
                Giỏ hàng của bạn đang trống.
              </Typography>
            ) : (
              courses.map((item) => (
                <Card
                  key={item._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    bgcolor:
                      themeMode === "dark" ? "grey.800" : "background.paper",
                    border: 1,
                    borderColor: themeMode === "dark" ? "grey.600" : "grey.200",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: 80,
                      height: 48,
                      objectFit: "cover",
                      borderRadius: 1,
                      mr: 2,
                    }}
                    image={"/images/image-placeholder.png"}
                    alt={item.title}
                  />

                  <CardContent sx={{ flex: 1, p: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "medium",
                        color: themeMode === "dark" ? "white" : "text.primary",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          themeMode === "dark" ? "grey.400" : "text.secondary",
                        mb: 1,
                      }}
                    >
                      {item.instructor?.[0].name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Rating
                        value={item.averageRating}
                        precision={0.5}
                        readOnly
                        sx={{ color: "warning.main" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            themeMode === "dark"
                              ? "grey.400"
                              : "text.secondary",
                        }}
                      >
                        ({item.reviewCount} xếp hạng)
                      </Typography>
                    </Stack>
                  </CardContent>

                  <Stack alignItems="flex-end" spacing={1}>
                    <IconButton
                      onClick={handleRemoveCourseFromCart.bind(null, item._id)}
                      sx={{
                        color: themeMode === "dark" ? "grey.400" : "grey.500",
                        "&:hover": { color: "error.main" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "medium",
                        color: themeMode === "dark" ? "white" : "text.primary",
                      }}
                    >
                      {formatPrice(item.price)}
                    </Typography>
                  </Stack>
                </Card>
              ))
            )}
          </Stack>

          {courses.length > 0 && (
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  variant="body1"
                  sx={{
                    color: themeMode === "dark" ? "grey.300" : "text.secondary",
                  }}
                >
                  Tổng:
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: themeMode === "dark" ? "white" : "text.primary",
                  }}
                >
                  {formatPrice(totalPrice)}
                </Typography>
              </Stack>

              <Checkout />
            </Stack>
          )}
        </Box>
      </Box>
    </Section>
  );
};

export default Cart;
