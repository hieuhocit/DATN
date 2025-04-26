export interface Review {
    id: number;
    userId: number;
    courseId: number;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Dữ liệu giả lập
  const mockReviews: Review[] = [
    {
      id: 1,
      userId: 101,
      courseId: 201,
      rating: 4,
      comment: "Khóa học rất bổ ích, giảng viên nhiệt tình!",
      createdAt: "2025-04-25T10:00:00Z",
      updatedAt: "2025-04-25T10:00:00Z",
    },
    {
      id: 2,
      userId: 102,
      courseId: 202,
      rating: 5,
      comment: "Nội dung dễ hiểu, bài tập thực hành hữu ích.",
      createdAt: "2025-04-24T15:30:00Z",
      updatedAt: "2025-04-24T15:30:00Z",
    },
    {
      id: 3,
      userId: 103,
      courseId: 203,
      rating: 3,
      comment: "Khóa học ổn, nhưng cần cải thiện tài liệu.",
      createdAt: "2025-04-23T09:00:00Z",
      updatedAt: "2025-04-23T09:00:00Z",
    },
  ];
  
  // Hàm giả lập gọi API
  export const fetchReviews = async (): Promise<Review[]> => {
    try {
      // Mô phỏng độ trễ của API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockReviews;
    } catch (error) {
      console.error('Error fetching mock reviews:', error);
      throw new Error('Không thể tải dữ liệu đánh giá giả lập.');
    }
  };