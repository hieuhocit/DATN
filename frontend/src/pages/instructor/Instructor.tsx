import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Section from "@/components/common/Section";
import Typography from "@mui/material/Typography";
import CustomTabPanel from "./CustomTabPanel";
import CourseListTab from "./CourseListTab";
import CreateCourseTab from "./CreateCourseTab";
import { Course } from "@/types";

const coursesData: Course[] = [
  {
    _id: "6432faeca35f2a7f39c0614a",
    title: "JavaScript Cơ Bản Đến Nâng Cao",
    slug: "javascript-co-ban-den-nang-cao",
    description:
      "Khóa học toàn diện về JavaScript từ những khái niệm cơ bản nhất cho đến các kỹ thuật nâng cao như Promises, Async/Await, và DOM Manipulation.",
    price: 599000,
    discountPrice: 399000,
    averageRating: 4,
    thumbnail: "https://example.com/images/javascript-course.jpg",
    author: {
      _id: "6432f506c0e05609b48cef5a",
      email: "tuan.nguyen@example.com",
      name: "Tuấn Nguyễn",
      bio: "Senior JavaScript Developer với hơn 8 năm kinh nghiệm tại các công ty công nghệ hàng đầu.",
      avatarUrl: "",
      role: "instructor",
      registerProvider: "google",
      createdAt: "2023-03-15T08:30:00.000Z",
      updatedAt: "2023-09-28T15:45:22.000Z",
      __v: 0,
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
    categoryId: "64215a9e32c123afb23d4e12",
    level: "all",
    duration: 2160,
    requirements:
      "Kiến thức cơ bản về HTML, CSS. Không cần kinh nghiệm JavaScript trước đó.",
    whatYouWillLearn:
      "Nắm vững nền tảng JavaScript, xây dựng ứng dụng web tương tác, hiểu rõ về ES6+, xử lý bất đồng bộ và áp dụng các design pattern phổ biến.",
    isPublished: true,
    createdAt: "2023-04-10T09:15:40.000Z",
    updatedAt: "2023-10-05T11:20:32.000Z",
  },
  {
    _id: "6438acf1b28e537a12d9b234",
    title: "ReactJS - Từ Zero đến Hero",
    slug: "reactjs-tu-zero-den-hero",
    description:
      "Làm chủ thư viện ReactJS và xây dựng các ứng dụng Single Page Application hiện đại với các kỹ thuật tối ưu hiệu suất.",
    price: 799000,
    discountPrice: 549000,
    averageRating: 4.5,
    thumbnail: "https://example.com/images/reactjs-course.jpg",
    author: {
      _id: "6432f506c0e05609b48cef5a",
      email: "tuan.nguyen@example.com",
      name: "Tuấn Nguyễn",
      bio: "Senior JavaScript Developer với hơn 8 năm kinh nghiệm tại các công ty công nghệ hàng đầu.",
      avatarUrl: "",
      role: "instructor",
      registerProvider: "google",
      createdAt: "2023-03-15T08:30:00.000Z",
      updatedAt: "2023-09-28T15:45:22.000Z",
      __v: 0,
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
    categoryId: "64215a9e32c123afb23d4e13",
    level: "intermediate",
    duration: 1800,
    requirements:
      "Kiến thức cơ bản về JavaScript, HTML, CSS. Hiểu biết về ES6+ là một lợi thế.",
    whatYouWillLearn:
      "Xây dựng ứng dụng React từ đầu, quản lý state với Redux, tối ưu hiệu suất, tích hợp React Router, và triển khai ứng dụng thực tế.",
    isPublished: true,
    createdAt: "2023-05-12T14:30:25.000Z",
    updatedAt: "2023-10-18T09:45:12.000Z",
  },
  {
    _id: "6442bdf3e7291abfc85d7c9e",
    title: "Python cho Data Science và Machine Learning",
    slug: "python-cho-data-science-va-machine-learning",
    description:
      "Học cách sử dụng Python và các thư viện như NumPy, Pandas, Matplotlib, Scikit-Learn để phân tích dữ liệu và xây dựng mô hình học máy.",
    price: 1299000,
    discountPrice: 899000,
    averageRating: 3.5,
    thumbnail: "https://example.com/images/python-data-science.jpg",
    author: {
      _id: "643821f5d9e7afc3b217a8b2",
      email: "linh.tran@example.com",
      name: "Linh Trần",
      bio: "Data Scientist với hơn 5 năm kinh nghiệm trong lĩnh vực phân tích dữ liệu và AI.",
      avatarUrl: "",
      role: "instructor",
      registerProvider: "local",
      createdAt: "2023-02-28T10:20:15.000Z",
      updatedAt: "2023-09-15T16:30:45.000Z",
      __v: 0,
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
    categoryId: "64215a9e32c123afb23d4e14",
    level: "intermediate",
    duration: 2520,
    requirements:
      "Kiến thức cơ bản về lập trình. Không cần kinh nghiệm Python trước đó, nhưng hiểu biết về thống kê cơ bản là một lợi thế.",
    whatYouWillLearn:
      "Nắm vững Python cho phân tích dữ liệu, trực quan hóa dữ liệu với Matplotlib và Seaborn, phân tích dữ liệu với Pandas, và xây dựng mô hình học máy với Scikit-Learn.",
    isPublished: true,
    createdAt: "2023-06-05T11:45:30.000Z",
    updatedAt: "2023-10-22T08:15:40.000Z",
  },
  {
    _id: "644af1c8723b9def45e8a123",
    title: "UI/UX Design Masterclass",
    slug: "ui-ux-design-masterclass",
    description:
      "Khóa học toàn diện về thiết kế giao diện người dùng (UI) và trải nghiệm người dùng (UX) với Figma, Adobe XD và các công cụ thiết kế hiện đại.",
    price: 899000,
    discountPrice: 699000,
    averageRating: 5,
    thumbnail: "https://example.com/images/uiux-masterclass.jpg",
    author: {
      _id: "6439c2d7f8e24b5a13c7d9e2",
      email: "minh.le@example.com",
      name: "Minh Lê",
      bio: "UI/UX Designer với hơn 7 năm kinh nghiệm, đã làm việc với nhiều startup và doanh nghiệp lớn.",
      avatarUrl: "",
      role: "instructor",
      registerProvider: "facebook",
      createdAt: "2023-03-10T09:25:35.000Z",
      updatedAt: "2023-09-20T14:30:15.000Z",
      __v: 0,
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
    categoryId: "64215a9e32c123afb23d4e15",
    level: "beginner",
    duration: 1440,
    requirements:
      "Không cần kinh nghiệm thiết kế trước đó. Nên có máy tính với cấu hình đủ để chạy Figma hoặc Adobe XD.",
    whatYouWillLearn:
      "Nguyên tắc thiết kế UI/UX, sử dụng thành thạo Figma và Adobe XD, tạo prototype tương tác, thực hiện nghiên cứu người dùng, và xây dựng portfolio thiết kế.",
    isPublished: true,
    createdAt: "2023-04-25T16:40:20.000Z",
    updatedAt: "2023-10-12T10:35:50.000Z",
  },
  {
    _id: "6451cf82a97def34b28e5f7a",
    title: "Node.js và Express - Xây dựng RESTful API",
    slug: "nodejs-va-express-xay-dung-restful-api",
    description:
      "Học cách xây dựng RESTful API mạnh mẽ với Node.js, Express, và MongoDB. Từ cơ bản đến triển khai thực tế và bảo mật.",
    price: 699000,
    discountPrice: 499000,
    averageRating: 4.5,
    thumbnail: "https://example.com/images/nodejs-express-api.jpg",
    author: {
      _id: "6432f506c0e05609b48cef5a",
      email: "tuan.nguyen@example.com",
      name: "Tuấn Nguyễn",
      bio: "Senior JavaScript Developer với hơn 8 năm kinh nghiệm tại các công ty công nghệ hàng đầu.",
      avatarUrl: "",
      role: "instructor",
      registerProvider: "google",
      createdAt: "2023-03-15T08:30:00.000Z",
      updatedAt: "2023-09-28T15:45:22.000Z",
      __v: 0,
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
    categoryId: "64215a9e32c123afb23d4e13",
    level: "intermediate",
    duration: 1680,
    requirements:
      "Kiến thức cơ bản về JavaScript. Hiểu biết về REST API là một lợi thế.",
    whatYouWillLearn:
      "Xây dựng RESTful API với Node.js và Express, kết nối MongoDB với Mongoose, xác thực và phân quyền với JWT, xử lý lỗi, và triển khai API lên các nền tảng cloud.",
    isPublished: true,
    createdAt: "2023-05-20T13:25:45.000Z",
    updatedAt: "2023-10-15T12:40:30.000Z",
  },
  {
    _id: "6458e2f1b34c7a9d25f1e8d7",
    title: "Docker và Kubernetes cho Developers",
    slug: "docker-va-kubernetes-cho-developers",
    description:
      "Làm chủ container hóa với Docker và quản lý container với Kubernetes. Tối ưu quy trình phát triển và triển khai ứng dụng.",
    price: 899000,
    discountPrice: 649000,
    averageRating: 3.5,
    thumbnail: "https://example.com/images/docker-kubernetes.jpg",
    author: {
      _id: "6445d8f2c73e21b5a9f6c4d3",
      email: "hoang.pham@example.com",
      name: "Hoàng Phạm",
      bio: "DevOps Engineer với hơn 6 năm kinh nghiệm trong việc xây dựng và triển khai hệ thống phân tán.",
      avatarUrl: "",
      role: "instructor",
      registerProvider: "local",
      createdAt: "2023-02-10T11:35:20.000Z",
      updatedAt: "2023-09-05T10:25:40.000Z",
      __v: 0,
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
    categoryId: "64215a9e32c123afb23d4e16",
    level: "expert",
    duration: 1920,
    requirements:
      "Kiến thức cơ bản về Linux và command line. Hiểu biết về quy trình phát triển phần mềm.",
    whatYouWillLearn:
      "Tạo và quản lý Docker container, xây dựng Docker image, thiết lập Kubernetes cluster, triển khai ứng dụng microservices, và cấu hình CI/CD pipeline.",
    isPublished: true,
    createdAt: "2023-07-15T09:50:25.000Z",
    updatedAt: "2023-10-25T14:20:35.000Z",
  },
  {
    _id: "645f19a8d23e7c4b16a2f5e9",
    title: "Flutter - Phát triển ứng dụng đa nền tảng",
    slug: "flutter-phat-trien-ung-dung-da-nen-tang",
    description:
      "Học cách xây dựng ứng dụng mobile đẹp mắt cho cả iOS và Android với một codebase duy nhất sử dụng Flutter và Dart.",
    price: 799000,
    discountPrice: 599000,
    averageRating: 5,
    thumbnail: "https://example.com/images/flutter-course.jpg",
    author: {
      _id: "644a1e7f89b2d3c5a6f7e8d9",
      email: "thu.le@example.com",
      name: "Thu Lê",
      bio: "Mobile Developer với hơn 5 năm kinh nghiệm phát triển ứng dụng di động đa nền tảng.",
      avatarUrl: "",
      role: "instructor",
      registerProvider: "google",
      createdAt: "2023-03-20T13:45:30.000Z",
      updatedAt: "2023-09-18T11:30:25.000Z",
      __v: 0,
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },
    categoryId: "64215a9e32c123afb23d4e17",
    level: "intermediate",
    duration: 2040,
    requirements:
      "Kiến thức cơ bản về lập trình. Kinh nghiệm với bất kỳ ngôn ngữ OOP nào là một lợi thế.",
    whatYouWillLearn:
      "Làm chủ ngôn ngữ Dart, xây dựng UI đẹp mắt với Flutter widgets, quản lý state, tích hợp API, sử dụng Firebase, và triển khai ứng dụng lên App Store và Google Play.",
    isPublished: true,
    createdAt: "2023-06-30T15:20:40.000Z",
    updatedAt: "2023-10-28T09:15:50.000Z",
  },
];

const categories = [
  { _id: "680509944a64b29006160dfa", name: "Mobile Development" },
  { _id: "64215a9e32c123afb23d4e13", name: "Web Development" },
  { _id: "64215a9e32c123afb23d4e14", name: "Data Science" },
  { _id: "64215a9e32c123afb23d4e15", name: "UI/UX Design" },
];

const levels = ["beginner", "intermediate", "expert"];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Tearch() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Section sx={{ mt: "128px", mb: "128px" }}>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#1976d2",
            mb: 4,
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Dành cho Giáo viên
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Khóa học đã tạo" {...a11yProps(0)} />
            <Tab label="Tạo khóa học" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <CourseListTab courses={coursesData} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CreateCourseTab categories={categories} levels={levels} />
        </CustomTabPanel>
      </Box>
    </Section>
  );
}

export { coursesData, categories, levels };
