import PeopleIcon from "@mui/icons-material/People";
import { StatField, InstructorStatField } from "@/services/statisticsService";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PaidIcon from "@mui/icons-material/Paid";
import FaceIcon from "@mui/icons-material/Face";

export const statsConfig: {
  title: string;
  icon: React.ReactNode;
  field: StatField;
  color: string;
  chartTitle: string;
  dataKey: string;
}[] = [
  {
    title: "Người dùng",
    icon: <PeopleIcon fontSize="large" sx={{ color: "#fff" }} />,
    field: "user",
    color: "#3f51b5",
    chartTitle: "Thống kê người dùng đăng ký theo từng tháng",
    dataKey: "users",
  },
  {
    title: "Khóa học",
    icon: <AutoStoriesIcon fontSize="large" sx={{ color: "#fff" }} />,
    field: "course",
    color: "#009688",
    chartTitle: "Thống kê khóa học theo từng tháng",
    dataKey: "courses",
  },
  {
    title: "Giảng viên",
    icon: <FaceIcon fontSize="large" sx={{ color: "#fff" }} />,
    field: "instructor",
    color: "#9c27b0",
    chartTitle: "Thống kê giảng viên đăng ký theo từng tháng",
    dataKey: "instructors",
  },
  {
    title: "Thu nhập",
    icon: <PaidIcon fontSize="large" sx={{ color: "#fff" }} />,
    field: "revenue",
    color: "#795548",
    chartTitle: "Thống kê tổng thu nhập của khoá học đã mua theo từng tháng",
    dataKey: "revenue",
  },
];

export const statsInstructorConfig: {
  title: string;
  icon: React.ReactNode;
  field: InstructorStatField;
  color: string;
  chartTitle: string;
  dataKey: string;
}[] = [
  {
    title: "Học viên",
    icon: <PeopleIcon fontSize="large" sx={{ color: "#fff" }} />,
    field: "user",
    color: "#3f51b5",
    chartTitle: "Thống kê học viên đã đăng ký theo từng tháng",
    dataKey: "users",
  },
  {
    title: "Khóa học đã tạo",
    icon: <AutoStoriesIcon fontSize="large" sx={{ color: "#fff" }} />,
    field: "course",
    color: "#009688",
    chartTitle: "Thống kê khóa học đã tạo theo từng tháng",
    dataKey: "courses",
  },
  {
    title: "Thu nhập",
    icon: <PaidIcon fontSize="large" sx={{ color: "#fff" }} />,
    field: "revenue",
    color: "#795548",
    chartTitle: "Thống kê thu nhập theo từng tháng",
    dataKey: "revenue",
  },
];
