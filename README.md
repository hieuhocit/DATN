# EduGenlus – Nền tảng Giáo dục Trực tuyến tích hợp AI & VNPAY

> **EduGenlus** là hệ thống học trực tuyến hiện đại, kết hợp trí tuệ nhân tạo (Google Gemini) và cổng thanh toán VNPAY.

![EduGenlus Banner](.\frontend\public\images\banner.jpg)

---

## Mục lục

1. [Tổng quan](#tổng-quan)
2. [Tính năng](#tính-năng)
   - [Người học](#người-học)
   - [Giảng viên](#giảng-viên)
   - [Quản trị viên](#quản-trị-viên)
3. [Công nghệ sử dụng](#công-nghệ-sử-dụng)
4. [Cấu trúc dự án](#cấu-trúc-dự-án)
5. [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
   - [Chuẩn bị](#chuẩn-bị)
   - [Backend](#backend)
   - [Frontend](#frontend)
6. [API chính](#api-chính)
7. [Đóng góp & phát triển](#đóng-góp--phát-triển)
   - [Đội ngũ phát triển](#đội-ngũ-phát-triển)

---

## Tổng quan

EduGenlus cung cấp một trải nghiệm học tập vượt trội với các tính năng chủ đạo:

- **Đăng ký/đăng nhập linh hoạt**: Hỗ trợ đăng ký qua email, Google, Facebook.
- **Trình phát video chất lượng cao**: HD, hỗ trợ phím tắt, tự động lưu tiến độ và ghi chú theo thời gian.
- **Tương tác thông minh**: Ghi chú, bình luận và hỏi đáp với trợ lý AI (Google Gemini) giúp giải đáp thắc mắc.
- **Thanh toán tiện lợi và bảo mật**: Tích hợp VNPAY với đa dạng phương thức thanh toán.

---

## Tính năng

### Người học

- **Đăng ký & Đăng nhập**: Dễ dàng truy cập hệ thống qua nhiều nền tảng.
- **Tìm kiếm & Mua khóa học**: Duyệt danh mục, lọc theo cấp độ và thanh toán nhanh qua VNPAY.
- **Trải nghiệm học tập tối ưu**: Xem video HD với tự động lưu tiến độ, ghi chú cá nhân và các phím tắt điều khiển tiện dụng.
- **Tương tác & Hỗ trợ AI**: Bình luận, đặt câu hỏi và nhận trợ lý từ AI để giải đáp mọi thắc mắc về bài học.
- **Quản lý Tài khoản**: Lịch sử học tập và quản lý hồ sơ cá nhân.

### Giảng viên

- **Quản lý Nội dung khóa học**: Tạo, chỉnh sửa, và quản lý khóa học bao gồm video, tài liệu và thông tin chi tiết.
- **Upload và Xử lý Video**: Tích hợp với Cloudinary để đảm bảo chất lượng phát video.
- **Thống kê & Doanh thu**: Theo dõi số lượng học viên, doanh thu và các chỉ số hiệu suất.
- **Thông báo & Phản hồi**: Nhận thông báo khi có học viên mới

### Quản trị viên

- **Quản lý Người dùng**: Kiểm soát toàn bộ hệ thống người dùng (học viên và giảng viên).
- **Giám sát Nội dung & Khóa học**: Quản lý, kiểm duyệt khóa học và danh mục.
- **Quản lý Giao dịch**: Theo dõi và xử lý thanh toán với VNPAY, quản lý báo cáo và dashboard thống kê toàn hệ thống.

---

## Công nghệ sử dụng

### Frontend

- **React.js** + **TypeScript**
- **Material-UI (MUI)**
- **React Router v6**
- **React Query**
- **Vite**
- **Cloudinary Video Player**

### Backend

- **Node.js** + **Express**
- **MongoDB** (với Mongoose)
- **JWT** cho xác thực người dùng
- **Google AI (Gemini)** cho trợ lý ảo
- **VNPAY Gateway** cho thanh toán
- **Joi/Yup** để xác thực dữ liệu

---

## Cấu trúc dự án

```
/datn
├── frontend/   # Ứng dụng React + Vite + MUI
│   └── src/
│       ├── components/   # UI & Layout
│       ├── pages/        # Trang chức năng
│       ├── routes/       # Định nghĩa React Router
│       ├── services/     # Gọi API
│       ├── contexts/     # Context API
│       ├── hooks/        # Custom Hooks
│       └── utils/        # Helpers & Types
├── backend/    # API Node.js + Express + MongoDB
│   └── src/
│       ├── models/       # Mongoose schemas
│       ├── controllers/  # Xử lý request
│       ├── routes/       # Định nghĩa endpoint
│       ├── services/     # Business logic
│       ├── middlewares/  # Authentication & error handling
│       └── utils/        # Helpers & config
└── README.md
```

---

## Hướng dẫn cài đặt

### Chuẩn bị

- Node.js ≥ v16
- MongoDB (Local hoặc Atlas)
- Tài khoản Cloudinary, Google Cloud (AI) và VNPAY

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Cấu hình file .env với:
# MONGO_URI=
# JWT_SECRET=
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=
# GOOGLE_AI_KEY=
# VNPAY_TMN_CODE=
# VNPAY_HASH_SECRET=
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Cấu hình file .env với:
# VITE_API_URL=
# VITE_CLOUDINARY_CLOUD_NAME=
# VITE_GOOGLE_AI_KEY=
# VITE_VNPAY_URL=
npm run dev
```

---

## API chính

| Method | Endpoint                                   | Mô tả                           |
| ------ | ------------------------------------------ | ------------------------------- |
| POST   | `/api/auth/register`                       | Đăng ký                         |
| POST   | `/api/auth/login`                          | Đăng nhập                       |
| GET    | `/api/courses`                             | Lấy danh sách khóa học          |
| GET    | `/api/courses/:id`                         | Lấy thông tin chi tiết khóa học |
| POST   | `/api/courses/:id/reviews`                 | Gửi đánh giá cho khóa học       |
| GET    | `/api/statistics/dashboard`                | Dashboard thống kê (admin)      |
| GET    | `/api/statistics/instructor/:instructorId` | Thống kê cho giảng viên         |
| ...    | ...                                        | ...                             |

---

## Đóng góp & phát triển

### Đội ngũ phát triển

| Thành viên                | Vai trò             |
| ------------------------- | ------------------- |
| Trần Trung Hiếu           | Fullstack Developer |
| Nguyễn Thân Nguyên Chương | Frontend Developer  |
| Nguyễn An Phú             | Designer            |
| Trần Tiến Đạt             | Frontend Developer  |
| Nguyễn Minh Triết         | Tester              |

---

© 2025 EduGenius – Khoá luận tốt nghiệp, Khoa CNTT, Đại học Duy Tân.
