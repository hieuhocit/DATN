import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Section from "@/components/common/Section";
import Typography from "@mui/material/Typography";
import CustomTabPanel from "./CustomTabPanel";
import CourseListTab from "./CourseListTab";
import CreateCourseTab from "./CreateCourseTab";
import EarningsStats from "./EarningsStats";
import { useCoursesByInstructor } from "@/hooks/useCouses";

export default function Teacher() {
  const [value, setValue] = React.useState(0);
  const { coursesByInstructor, refetch: fetchCoursesByInstructor } =
    useCoursesByInstructor();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Section sx={{ mt: "128px", mb: "64px" }}>
      <Box>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#1a237e",
            mb: 6,
            textTransform: "uppercase",
            letterSpacing: "3px",
            position: "relative",
          }}
        >
          Dành cho Giáo viên
        </Typography>

        <Box
          sx={{
            borderRadius: "12px",
            bgcolor: "default",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="teacher tabs"
            centered
            sx={{
              "& .MuiTab-root": {
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                color: "#616161",
                px: 3,
                py: 1.5,
                borderRadius: "8px",
                transition: "all 0.3s ease",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#1976d2",
                bgcolor: "rgba(25, 118, 210, 0.1)",
              },
              "& .MuiTabs-indicator": {
                bgcolor: "#1976d2",
                height: "3px",
                borderRadius: "3px",
              },
            }}
          >
            <Tab label="Khóa học đã tạo" {...a11yProps(0)} />
            <Tab label="Tạo khóa học" {...a11yProps(1)} />
            <Tab label="Thống kê " {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <CourseListTab
            courses={coursesByInstructor}
            fetchCourses={fetchCoursesByInstructor}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CreateCourseTab fetchCourses={fetchCoursesByInstructor} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <EarningsStats courses={coursesByInstructor} />
        </CustomTabPanel>
      </Box>
    </Section>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
