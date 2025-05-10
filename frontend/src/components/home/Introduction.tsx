import { useRef, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// @ts-ignore
import "@splidejs/react-splide/css";

import Section from "../common/Section";

export default function Introduction() {
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
    type: "loop",
    speed: 500,
    perPage: 1,
    perMove: 1,
    arrows: false,
    pagination: true,
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,
    height: "100%",
  };

  const images = [
    "/images/banner.jpg",
    "/images/Flux_Dev_A_futuristic_highcontrast_digital_illustration_of_a_p_0.jpg",
    "/images/Flux_Dev_A_futuristic_highcontrast_digital_illustration_of_a_p_1.jpg",
    "/images/Flux_Dev_A_futuristic_highcontrast_digital_illustration_of_a_p_2.jpg",
    "/images/Flux_Dev_A_futuristic_highcontrast_digital_illustration_of_a_p_3.jpg",
    "/images/Flux_Dev_Create_a_vibrant_and_modern_cover_image_for_a_React_p_0.jpg",
    "/images/Flux_Dev_Create_a_vibrant_and_modern_cover_image_for_a_React_p_1.jpg",
    "/images/Flux_Dev_Create_a_vibrant_and_modern_cover_image_for_a_React_p_2.jpg",
    "/images/Flux_Dev_Create_a_vibrant_and_modern_cover_image_for_a_React_p_3.jpg",
  ];

  useEffect(() => {
    if (splideRef.current) {
      console.log("Splide initialized:", splideRef.current);
    }
  }, []);

  return (
    <Section sx={{ mt: "128px" }}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          aspectRatio: "15/7",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Splide
          ref={splideRef}
          options={splideOptions}
          style={{ height: "100%" }}
        >
          {images.map((src, index) => (
            <SplideSlide key={index}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={src}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt={`Slide ${index}`}
                  onError={() => console.error(`Failed to load image: ${src}`)}
                />
              </Box>
            </SplideSlide>
          ))}
        </Splide>
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 8,
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Section>
  );
}