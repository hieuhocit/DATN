/* eslint-disable @typescript-eslint/ban-ts-comment */

// Components
import Section from '../common/Section';
import Card from './Card';

// Icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Splide
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
// @ts-ignore
import '@splidejs/react-splide/css';

// MUI
import { Box, IconButton, Typography } from '@mui/material';

// React
import { useRef } from 'react';

export default function Recommendation() {
  const splideRef = useRef(null);

  const handlePrev = () => {
    if (splideRef.current) {
      // @ts-ignore
      splideRef.current.splide.go('<');
    }
  };

  const handleNext = () => {
    if (splideRef.current) {
      // @ts-ignore
      splideRef.current.splide.go('>');
    }
  };

  const splideOptions = {
    type: 'slide',
    speed: 500,
    perPage: 4,
    perMove: 1,
    gap: '24px',
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
    <Section
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant='h4' fontWeight={600}>
        Đề xuất dành cho bạn
      </Typography>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: 0,
            zIndex: 999,
            top: '90px',
            transform: 'translateY(-50%) translateX(-50%)',
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'background.paper',
            },
          }}
        >
          <ArrowBackIosNewIcon fontSize='large' />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 0,
            zIndex: 999,
            top: '90px',
            transform: 'translateY(-50%) translateX(calc(50%))',
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'background.paper',
            },
          }}
        >
          <ArrowForwardIosIcon fontSize='large' />
        </IconButton>
        <Splide ref={splideRef} options={splideOptions}>
          <SplideSlide>
            <Card />
          </SplideSlide>
          <SplideSlide>
            <Card />
          </SplideSlide>
          <SplideSlide>
            <Card />
          </SplideSlide>
          <SplideSlide>
            <Card />
          </SplideSlide>
          <SplideSlide>
            <Card />
          </SplideSlide>
          <SplideSlide>
            <Card />
          </SplideSlide>
          <SplideSlide>
            <Card />
          </SplideSlide>
        </Splide>
      </Box>
    </Section>
  );
}
