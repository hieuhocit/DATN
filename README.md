# Nền tảng giáo dục trực tuyến tích hợp AI và cổng thanh toán VNPAY

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

## Tổng quan

- Đăng ký/đăng nhập linh hoạt (email, Google, Facebook).
- Trình phát video HD với phím tắt, lưu tiến độ, chú thích thời gian.
- Ghi chú, bình luận, trợ lý AI (Google Gemini) trong bài học.
- Thanh toán VNPAY nhanh chóng, bảo mật.

## Tính năng

### Người học

- Đăng ký/đăng nhập (email, Google, Facebook)
- Duyệt & tìm kiếm khóa học theo danh mục, cấp độ
- Mua khóa học qua VNPAY
- Xem video, lưu tiến độ tự động
- Ghi chú, bình luận & hỏi đáp AI
- Quản lý hồ sơ cá nhân, lịch sử học

### Giảng viên

- Tạo/sửa khóa học: thông tin, video, tài liệu
- Quản lý bài học, upload lên Cloudinary
- Thống kê học viên, doanh thu (90% giá bán)
- Nhận thông báo khi học viên tương tác

### Quản trị viên

- Quản lý người dùng (học viên & giảng viên)
- Quản lý khóa học & danh mục
- Giám sát giao dịch VNPAY & báo cáo toàn hệ thống
- Dashboard thống kê tổng quan

## Công nghệ sử dụng

### Frontend

- React.js + TypeScript
- Material-UI (MUI)
- React Router v6
- React Query
- Vite
- Cloudinary Video Player

### Backend

- Node.js + Express
- MongoDB (Mongoose)
- JWT (xác thực)
- Google AI (Gemini)
- VNPAY Gateway
- Joi/Yup Validation

## Cấu trúc dự án

```
/datn
├── frontend/   # Ứng dụng React + Vite + MUI
├── backend/    # API Node.js + Express + MongoDB
└── README.md
```

### frontend/src

```
components/   | UI & Layout
pages/        | Trang chức năng
routes/       | Cấu hình React Router
services/     | Gọi API
contexts/     | Context API
hooks/        | Custom Hooks
utils/        | Helpers & Types
```

### backend/src

```
models/       | Mongoose schemas
controllers/  | Xử lý request
routes/       | Định nghĩa endpoint
services/     | Business logic
middlewares/  | Auth & error handling
utils/        | Helpers & config
```

## Hướng dẫn cài đặt

### Chuẩn bị

- Node.js ≥ v16
- MongoDB (local hoặc Atlas)
- Tài khoản Cloudinary, Google Cloud (AI), VNPAY

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Thiết lập trong .env:
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
# Thiết lập trong .env:
# VITE_API_URL=
# VITE_CLOUDINARY_CLOUD_NAME=
# VITE_GOOGLE_AI_KEY=
# VITE_VNPAY_URL=
npm run dev
```

## API chính

| Method | Endpoint                                   | Mô tả               |
| ------ | ------------------------------------------ | ------------------- |
| POST   | `/api/auth/register`                       | Đăng ký             |
| POST   | `/api/auth/login`                          | Đăng nhập           |
| GET    | `/api/courses`                             | Danh sách khóa học  |
| GET    | `/api/courses/:id`                         | Chi tiết khóa học   |
| POST   | `/api/courses/:id/reviews`                 | Thêm đánh giá       |
| GET    | `/api/statistics/dashboard`                | Thống kê admin      |
| GET    | `/api/statistics/instructor/:instructorId` | Thống kê giảng viên |
| …      | …                                          | …                   |
