import axios from 'axios';

// Định nghĩa base URL của API backend (nếu có)
const API_BASE_URL = 'http://localhost:3000'; // Thay đổi thành URL thực tế của backend

// Lấy danh sách bài học
export const fetchCourseLessons = async (courseId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/lessons`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course lessons:', error);
    // Giả lập dữ liệu nếu không có API thực tế
    return [
      { id: 1, title: 'Giới thiệu', duration: 187, videoUrl: '', orderIndex: 1 },
      { id: 2, title: 'Biền và kiểu dữ liệu', duration: 999, videoUrl: '', orderIndex: 2 },
      { id: 3, title: 'Cấu trúc điều kiện và vòng lặp', duration: 1083, videoUrl: '', orderIndex: 3 },
      { id: 4, title: 'Mảng', duration: 765, videoUrl: '', orderIndex: 4 },
      { id: 5, title: 'String', duration: 305, videoUrl: '', orderIndex: 5 },
      { id: 6, title: 'Hàm', duration: 856, videoUrl: '', orderIndex: 6 },
      { id: 7, title: 'Con trỏ', duration: 994, videoUrl: '', orderIndex: 7 },
      { id: 8, title: 'Struct', duration: 338, videoUrl: '', orderIndex: 8 },
    ];
  }
};

// Lấy thông tin khóa học
export const fetchCourseDetails = async (courseId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course details:', error);
    return {
      id: courseId,
      title: 'Giới thiệu khóa học',
      updatedAt: '2023-02-01',
    };
  }
};

// Lấy tiến độ học
export const fetchProgress = async (userId: number, courseId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/${userId}/courses/${courseId}/progress`);
    return response.data;
  } catch (error) {
    console.error('Error fetching progress:', error);
    return { completionPercentage: 0 };
  }
};

// Lấy danh sách bình luận
export const fetchComments = async (lessonId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/lessons/${lessonId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [
      { id: 1, userId: 2, name: 'Trần Minh Nghĩa', content: 'Nhập bình luận mới của bạn', parentId: null, createdAt: '2023-02-01T10:05:00Z' },
      { id: 2, userId: 2, name: 'Phạm Lan', content: '!!!!!!!!!!!', parentId: 1, createdAt: '2023-02-01T10:05:00Z' },
    ];
  }
};

// Lấy danh sách đánh giá
export const fetchReviews = async (courseId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [
      {
        id: 1,
        userName: 'Người dùng 1',
        avatar: 'https://via.placeholder.com/40',
        content: 'Khóa học rất hay, nội dung dễ hiểu!',
        createdAt: '2023-02-01T10:00:00Z',
      },
      {
        id: 2,
        userName: 'Người dùng 2',
        avatar: 'https://via.placeholder.com/40',
        content: 'Cần thêm nhiều bài tập thực hành hơn.',
        createdAt: '2023-02-02T12:00:00Z',
      },
    ];
  }
};

// Gửi đánh giá mới
export const submitReview = async (reviewData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/courses/${reviewData.courseId}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    return {
      ...reviewData,
      id: Math.floor(Math.random() * 1000), // Tạo ID ngẫu nhiên nếu không có API thực tế
    };
  }
};