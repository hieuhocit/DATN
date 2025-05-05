import * as React from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { categories, levels } from "@/pages/instructor/Instructor";

interface Lesson {
  title: string;
  description: string;
  videoFile?: File;
}

interface CourseFormData {
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  thumbnailFile?: File;
  categoryId: string;
  level: string;
  duration: number;
  requirements: string;
  whatYouWillLearn: string;
  lessons: Lesson[];
}

interface CourseFormProps {
  categories: typeof categories;
  levels: typeof levels;
}

export default function CourseForm({ categories, levels }: CourseFormProps) {
  const theme = useTheme();

  const [courseFormData, setCourseFormData] = React.useState<CourseFormData>({
    title: "",
    description: "",
    price: 0,
    discountPrice: 0,
    categoryId: categories[0]._id,
    level: levels[0],
    duration: 0,
    requirements: "",
    whatYouWillLearn: "",
    lessons: [{ title: "", description: "" }],
  });

  // Cleanup object URLs on unmount
  React.useEffect(() => {
    return () => {
      if (courseFormData.thumbnailFile) {
        URL.revokeObjectURL(URL.createObjectURL(courseFormData.thumbnailFile));
      }
      courseFormData.lessons.forEach((lesson) => {
        if (lesson.videoFile) {
          URL.revokeObjectURL(URL.createObjectURL(lesson.videoFile));
        }
      });
    };
  }, [courseFormData.thumbnailFile, courseFormData.lessons]);

  const handleCourseFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setCourseFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCourseFormData((prev) => ({ ...prev, thumbnailFile: file }));
  };

  const handleLessonChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseFormData((prev) => {
      const newLessons = [...prev.lessons];
      newLessons[index] = { ...newLessons[index], [name]: value };
      return { ...prev, lessons: newLessons };
    });
  };

  const handleLessonVideoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCourseFormData((prev) => {
      const newLessons = [...prev.lessons];
      newLessons[index] = { ...newLessons[index], videoFile: file };
      return { ...prev, lessons: newLessons };
    });
  };

  const addLesson = () => {
    setCourseFormData((prev) => ({
      ...prev,
      lessons: [...prev.lessons, { title: "", description: "" }],
    }));
  };

  const removeLesson = (index: number) => {
    setCourseFormData((prev) => {
      const newLessons = prev.lessons.filter((_, i) => i !== index);
      return { ...prev, lessons: newLessons };
    });
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Course Data:", courseFormData);
    alert("Course submitted successfully! Check console for details.");
  };

  const getBgColor = () => (theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff");
  const getInputBg = () => (theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f7fa");

  return (
    <Box
      sx={{
        bgcolor: getBgColor(),
        borderRadius: "16px",
        boxShadow: theme.shadows[6],
        p: { xs: 3, sm: 5 },
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        "&:hover": { boxShadow: theme.shadows[8] },
        transition: "box-shadow 0.3s ease",
      }}
    >
      <form onSubmit={handleCourseSubmit}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 4,
            textAlign: "center",
          }}
        >
          Tạo Khóa Học Mới
        </Typography>

        {/* Basic Info Section */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
          Thông tin cơ bản
        </Typography>
        <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Tiêu đề khóa học"
            name="title"
            value={courseFormData.title}
            onChange={handleCourseFormChange}
            required
            variant="outlined"
            sx={{
              bgcolor: getInputBg(),
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
          <TextField
            fullWidth
            label="Mô tả khóa học"
            name="description"
            value={courseFormData.description}
            onChange={handleCourseFormChange}
            multiline
            rows={4}
            required
            variant="outlined"
            sx={{
              bgcolor: getInputBg(),
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            <TextField
              fullWidth
              label="Giá (VND)"
              name="price"
              type="number"
              value={courseFormData.price}
              onChange={handleCourseFormChange}
              required
              variant="outlined"
              sx={{
                bgcolor: getInputBg(),
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              }}
            />
            <TextField
              fullWidth
              label="Giá khuyến mãi (VND)"
              name="discountPrice"
              type="number"
              value={courseFormData.discountPrice}
              onChange={handleCourseFormChange}
              required
              variant="outlined"
              sx={{
                bgcolor: getInputBg(),
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              }}
            />
          </Box>
        </Box>

        {/* Thumbnail Upload */}
        <Box sx={{ mb: 3 }}>
          <input
            accept="image/*"
            id="thumbnail-upload"
            type="file"
            hidden
            onChange={handleThumbnailUpload}
            aria-label="Tải lên hình ảnh khóa học"
          />
          <label htmlFor="thumbnail-upload">
            <Button
              variant="outlined"
              component="span"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                px: 3,
                py: 1,
                "&:hover": { bgcolor: theme.palette.action.hover },
              }}
            >
              Tải lên hình ảnh khóa học
            </Button>
          </label>
          {courseFormData.thumbnailFile && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <img
                src={URL.createObjectURL(courseFormData.thumbnailFile)}
                alt="Thumbnail Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: 200,
                  borderRadius: "8px",
                  border: `1px solid ${theme.palette.divider}`,
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
        </Box>

        {/* Category and Level */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 3 }}>
          <FormControl fullWidth required>
            <InputLabel>Danh mục</InputLabel>
            <Select
              name="categoryId"
              value={courseFormData.categoryId}
              onChange={handleCourseFormChange}
              label="Danh mục"
              sx={{
                bgcolor: getInputBg(),
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Cấp độ</InputLabel>
            <Select
              name="level"
              value={courseFormData.level}
              onChange={handleCourseFormChange}
              label="Cấp độ"
              sx={{
                bgcolor: getInputBg(),
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" },
              }}
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Duration, Requirements, and Learning Outcomes */}
        <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Thời lượng (phút)"
            name="duration"
            type="number"
            value={courseFormData.duration}
            onChange={handleCourseFormChange}
            required
            variant="outlined"
            sx={{
              bgcolor: getInputBg(),
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
          <TextField
            fullWidth
            label="Yêu cầu đầu vào"
            name="requirements"
            value={courseFormData.requirements}
            onChange={handleCourseFormChange}
            multiline
            rows={3}
            required
            variant="outlined"
            sx={{
              bgcolor: getInputBg(),
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
          <TextField
            fullWidth
            label="Bạn sẽ học được gì"
            name="whatYouWillLearn"
            value={courseFormData.whatYouWillLearn}
            onChange={handleCourseFormChange}
            multiline
            rows={4}
            required
            variant="outlined"
            sx={{
              bgcolor: getInputBg(),
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
            }}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Lessons Section */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}>
          Nội dung bài học
        </Typography>
        {courseFormData.lessons.map((lesson, index) => (
          <Box
            key={index}
            sx={{
              mb: 3,
              p: 3,
              borderRadius: "12px",
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: theme.palette.mode === "dark" ? "#222" : "#fafafa",
              position: "relative",
              transition: "all 0.3s ease",
              "&:hover": { boxShadow: theme.shadows[2] },
            }}
          >
            <TextField
              fullWidth
              label={`Tiêu đề Lesson ${index + 1}`}
              name="title"
              value={lesson.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLessonChange(index, e)}
              margin="normal"
              required
              variant="outlined"
              sx={{
                bgcolor: getInputBg(),
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              }}
            />
            <TextField
              fullWidth
              label={`Mô tả Lesson ${index + 1}`}
              name="description"
              value={lesson.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLessonChange(index, e)}
              margin="normal"
              multiline
              rows={3}
              required
              variant="outlined"
              sx={{
                bgcolor: getInputBg(),
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              }}
            />
            <Box sx={{ mt: 2 }}>
              <input
                accept="video/*"
                id={`video-upload-${index}`}
                type="file"
                hidden
                onChange={(e) => handleLessonVideoUpload(index, e)}
                aria-label={`Tải lên video cho lesson ${index + 1}`}
              />
              <label htmlFor={`video-upload-${index}`}>
                <Button
                  variant="outlined"
                  component="span"
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    "&:hover": { bgcolor: theme.palette.action.hover },
                  }}
                >
                  Tải lên video
                </Button>
              </label>
              {lesson.videoFile && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <video
                    controls
                    src={URL.createObjectURL(lesson.videoFile)}
                    style={{
                      maxWidth: "100%",
                      maxHeight: 200,
                      borderRadius: "8px",
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                </Box>
              )}
            </Box>
            {courseFormData.lessons.length > 1 && (
              <IconButton
                onClick={() => removeLesson(index)}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  bgcolor: theme.palette.error.light,
                  "&:hover": { bgcolor: theme.palette.error.main },
                }}
                aria-label={`Xóa lesson ${index + 1}`}
              >
                <DeleteIcon sx={{ color: "#fff" }} />
              </IconButton>
            )}
          </Box>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addLesson}
          sx={{
            mt: 2,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
            px: 3,
            py: 1,
            "&:hover": { bgcolor: theme.palette.action.hover },
          }}
          aria-label="Thêm bài học mới"
        >
          Thêm bài học
        </Button>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 4,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            py: 1.5,
            fontSize: "1.1rem",
            "&:hover": { bgcolor: theme.palette.primary.dark },
          }}
          fullWidth
          aria-label="Tạo khóa học"
        >
          Tạo Khóa Học
        </Button>
      </form>
    </Box>
  );
}