/* eslint-disable @typescript-eslint/ban-ts-comment */
// Components
import Card from "@/components/common/CourseCard";

// Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// Splide
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// @ts-ignore
import "@splidejs/react-splide/css";

// MUI
import { Box, IconButton } from "@mui/material";

// React
import { useRef } from "react";

// Types
import { Course } from "@/types";
import { Link } from "react-router-dom";
type Props = {
  courses: Course[];
};

export default function Slider({ courses }: Props) {
  const splideRef = useRef(null);

  const handlePrev = () => {
    if (splideRef.current) {
      // @ts-ignore
      splideRef.current.splide.go("<");
    }
  };

  const handleNext = () => {
    if (splideRef.current) {
      // @ts-ignore
      splideRef.current.splide.go(">");
    }
  };

  const splideOptions = {
    type: "slide",
    speed: 500,
    perPage: 4,
    perMove: 1,
    gap: "24px",
    arrows: false,
    pagination: false,
    drag: false,
    breakpoints: {
      1000: {
        perPage: 3,
      },
      700: {
        perPage: 2,
      },
    },
  };
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 0,
          zIndex: 999,
          top: "90px",
          transform: "translateY(-50%) translateX(-50%)",
          backgroundColor: "background.paper",
          "&:hover": {
            backgroundColor: "background.paper",
          },
        }}
      >
        <ArrowBackIosNewIcon fontSize="large" />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 0,
          zIndex: 999,
          top: "90px",
          transform: "translateY(-50%) translateX(calc(50%))",
          backgroundColor: "background.paper",
          "&:hover": {
            backgroundColor: "background.paper",
          },
        }}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>
      <Splide ref={splideRef} options={splideOptions}>
        {courses?.map((course) => (
          <SplideSlide key={course._id}>
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to={`/courses/${course._id}`}
            >
              <Card course={course} />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
}
