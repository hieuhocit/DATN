import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Section from "@/components/common/Section";
import Typography from "@mui/material/Typography";
import CustomTabPanel from "./CustomTabPanel";
import CourseListTab from "./CourseListTab";
import CreateCourseTab from "./CreateCourseTab";

export default function Teacher() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Section sx={{ mt: "90px", mb: "64px" }}>
      <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
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
            "&:after": {
              content: '""',
              width: "60px",
              height: "4px",
              bgcolor: "#1976d2",
              position: "absolute",
              bottom: "-16px",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "2px",
            },
          }}
        >
          Dành cho Giáo viên
        </Typography>

        <Box
          sx={{
            borderRadius: "12px",
            bgcolor: "default",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            p: 1,
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
                px: 4,
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
