import React, { useState, useEffect } from 'react';
import ReviewComponent from './review/ReviewComponent';
import { fetchReviews, Review } from './review/api';
import { Typography, Box, Button } from '@mui/material';
import Section from '@/components/common/Section'; // Import Section component

const ReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Đã có lỗi xảy ra khi tải dữ liệu.');
      }
    };
    loadReviews();
  }, []);

  return (
    <Section sx={{ mt: "128px" }}>
      <Box
        sx={{
          minHeight: "100vh",
          p: 3,
          position: "relative",
        }}
      >
        {error ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="error" gutterBottom>
              {error}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
            >
              Thử lại
            </Button>
          </Box>
        ) : (
          <ReviewComponent reviews={reviews} />
        )}
      </Box>
    </Section>
  );
};

export default ReviewPage;