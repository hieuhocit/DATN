import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import PieChartIcon from "@mui/icons-material/PieChart";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Sample data for the chart (replace with real data)
const chartData = [
  { month: "Tháng 1", courses: 5, students: 50, earnings: 50000 },
  { month: "Tháng 2", courses: 6, students: 60, earnings: 60000 },
  { month: "Tháng 3", courses: 4, students: 40, earnings: 40000 },
  { month: "Tháng 4", courses: 7, students: 70, earnings: 70000 },
  { month: "Tháng 5", courses: 5, students: 50, earnings: 50000 },
  { month: "Tháng 6", courses: 6, students: 60, earnings: 60000 },
  { month: "Tháng 7", courses: 8, students: 80, earnings: 80000 },
  { month: "Tháng 8", courses: 7, students: 70, earnings: 70000 },
  { month: "Tháng 9", courses: 5, students: 50, earnings: 50000 },
  { month: "Tháng 10", courses: 7, students: 60, earnings: 60000 },
  { month: "Tháng 11", courses: 4, students: 40, earnings: 40000 },
  { month: "Tháng 12", courses: 5, students: 50, earnings: 50000 },
];

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #1e1e2f 0%, #2a2a3b 100%)"
      : "#ffffff",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(0, 0, 0, 0.6)"
      : "0 4px 20px rgba(0, 0, 0, 0.15)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 8px 32px rgba(0, 0, 0, 0.7)"
        : "0 8px 32px rgba(0, 0, 0, 0.25)",
  },
}));

const EarningsStats = ({ courses = [] }) => {
  const theme = useTheme();

  const calculateStats = (courses) => {
    let totalCourses = 0;
    let totalStudents = 0;
    let totalEarnings = 0;

    if (Array.isArray(courses) && courses.length > 0) {
      totalCourses = courses.length;
      courses.forEach((course) => {
        const price = parseFloat(course.price) || 0;
        const students = parseInt(course.students, 10) || 0;
        totalEarnings += price;
        totalStudents += students;
      });
    }

    return { totalCourses, totalStudents, totalEarnings };
  };

  const { totalCourses, totalStudents, totalEarnings } =
    calculateStats(courses);

  const percentageChanges = {
    courses: -4,
    students: 8,
    earnings: 12,
  };

  const getChangeIcon = (percentage) => {
    return percentage >= 0 ? (
      <TrendingUpIcon
        sx={{ color: theme.palette.success.main, fontSize: 16, ml: 1 }}
      />
    ) : (
      <TrendingDownIcon
        sx={{ color: theme.palette.error.main, fontSize: 16, ml: 1 }}
      />
    );
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#e3f2fd",
        borderRadius: 16,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 3,
          mb: 5,
        }}
      >
        <StyledCard>
          <CardContent
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PieChartIcon
              sx={{
                fontSize: 40,
                color: theme.palette.mode === "dark" ? "#ce93d8" : "#7b1fa2",
                mr: 2,
              }}
            />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.mode === "dark" ? "#ce93d8" : "#7b1fa2",
                }}
              >
                {totalCourses}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#b0bec5" : "#333",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Khóa học đã bán {getChangeIcon(percentageChanges.courses)}{" "}
                {percentageChanges.courses}% Kể từ tuần trước
              </Typography>
            </Box>
          </CardContent>
        </StyledCard>

        <StyledCard>
          <CardContent
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PeopleIcon
              sx={{
                fontSize: 40,
                color:
                  theme.palette.mode === "dark"
                    ? "#81d4fa"
                    : theme.palette.info.main,
                mr: 2,
              }}
            />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color:
                    theme.palette.mode === "dark"
                      ? "#81d4fa"
                      : theme.palette.info.main,
                }}
              >
                {totalStudents}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#b0bec5" : "#444",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Số lượng học viên {getChangeIcon(percentageChanges.students)} +
                {percentageChanges.students}% Kể từ tuần trước
              </Typography>
            </Box>
          </CardContent>
        </StyledCard>

        <StyledCard>
          <CardContent
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AttachMoneyIcon
              sx={{
                fontSize: 40,
                color:
                  theme.palette.mode === "dark"
                    ? "#a5d6a7"
                    : theme.palette.success.main,
                mr: 2,
              }}
            />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color:
                    theme.palette.mode === "dark"
                      ? "#a5d6a7"
                      : theme.palette.success.main,
                }}
              >
                {totalEarnings.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  minimumFractionDigits: 0,
                })}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.mode === "dark" ? "#b0bec5" : "#444",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Tổng thu nhập {getChangeIcon(percentageChanges.earnings)} +
                {percentageChanges.earnings}% Kể từ tuần trước
              </Typography>
            </Box>
          </CardContent>
        </StyledCard>
      </Box>

      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 3,
              color:
                theme.palette.mode === "dark"
                  ? "#90caf9"
                  : theme.palette.primary.main,
            }}
          >
            Thống kê theo tháng
          </Typography>
          <Box
            sx={{
              height: 300,
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
              borderRadius: 12,
              p: 2,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.palette.mode === "dark" ? "#444" : "#d3d3d3"}
                />
                <XAxis
                  dataKey="month"
                  stroke={theme.palette.mode === "dark" ? "#b0bec5" : "#555"}
                />
                <YAxis
                  stroke={theme.palette.mode === "dark" ? "#b0bec5" : "#555"}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#2a2a3b" : "#ffffff",
                    borderRadius: 8,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: theme.palette.mode === "dark" ? "#b0bec5" : "#555",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="courses"
                  name="Khóa học"
                  stroke={theme.palette.mode === "dark" ? "#ce93d8" : "#7b1fa2"}
                  fill={
                    theme.palette.mode === "dark"
                      ? "rgba(206, 147, 216, 0.5)"
                      : "rgba(206, 147, 216, 0.5)"
                  }
                  fillOpacity={1}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  name="Học viên"
                  stroke={theme.palette.mode === "dark" ? "#81d4fa" : "#0288d1"}
                  fill={
                    theme.palette.mode === "dark"
                      ? "rgba(129, 212, 250, 0.5)"
                      : "rgba(129, 212, 250, 0.5)"
                  }
                  fillOpacity={1}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  name="Thu nhập"
                  stroke={theme.palette.mode === "dark" ? "#a5d6a7" : "#2e7d32"}
                  fill={
                    theme.palette.mode === "dark"
                      ? "rgba(165, 214, 167, 0.5)"
                      : "rgba(165, 214, 167, 0.5)"
                  }
                  fillOpacity={1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default EarningsStats;
