import React from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Rating 
} from '@mui/material';

// Định nghĩa kiểu dữ liệu cho review
interface Review {
  id: number;
  userId: number;
  courseId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface ReviewComponentProps {
  reviews: Review[];
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ reviews }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Đánh Giá Khóa Học
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="review table">
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>User ID</strong></TableCell>
              <TableCell><strong>Course ID</strong></TableCell>
              <TableCell><strong>Đánh Giá</strong></TableCell>
              <TableCell><strong>Bình Luận</strong></TableCell>
              <TableCell><strong>Ngày Tạo</strong></TableCell>
              <TableCell><strong>Ngày Cập Nhật</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.id}</TableCell>
                  <TableCell>{review.userId}</TableCell>
                  <TableCell>{review.courseId}</TableCell>
                  <TableCell>
                    <Rating value={review.rating} readOnly precision={0.5} />
                  </TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(review.updatedAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Không có đánh giá nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReviewComponent;