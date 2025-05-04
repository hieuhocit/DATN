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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { categories, levels } from "@/pages/Instructor";

interface Lesson {
  title: string;
  description: string;
  videoUrl: string;
}

interface CourseFormData {
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  thumbnail: string;
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
  const [courseFormData, setCourseFormData] = React.useState<CourseFormData>({
    title: "",
    description: "",
    price: 0,
    discountPrice: 0,
    thumbnail: "",
    categoryId: categories[0]._id,
    level: levels[0],
    duration: 0,
    requirements: "",
    whatYouWillLearn: "",
    lessons: [{ title: "", description: "", videoUrl: "" }],
  });

  const handleCourseFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setCourseFormData((prev) => ({ ...prev, [name]: value }));
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

  const addLesson = () => {
    setCourseFormData((prev) => ({
      ...prev,
      lessons: [...prev.lessons, { title: "", description: "", videoUrl: "" }],
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

  return (
    <form onSubmit={handleCourseSubmit}>
      <TextField
        fullWidth
        label="Tiêu đề"
        name="title"
        value={courseFormData.title}
        onChange={handleCourseFormChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Mô tả"
        name="description"
        value={courseFormData.description}
        onChange={handleCourseFormChange}
        margin="normal"
        multiline
        rows={4}
        required
      />
      <TextField
        fullWidth
        label="Giá (VND)"
        name="price"
        type="number"
        value={courseFormData.price}
        onChange={handleCourseFormChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Giá khuyến mãi (VND)"
        name="discountPrice"
        type="number"
        value={courseFormData.discountPrice}
        onChange={handleCourseFormChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="URL hình thumbnail"
        name="thumbnail"
        value={courseFormData.thumbnail}
        onChange={handleCourseFormChange}
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Danh Mục</InputLabel>
        <Select
          name="categoryId"
          value={courseFormData.categoryId}
          onChange={handleCourseFormChange}
          label="Danh Mục"
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Cấp Độ</InputLabel>
        <Select
          name="level"
          value={courseFormData.level}
          onChange={handleCourseFormChange}
          label="Cấp Độ"
        >
          {levels.map((level) => (
            <MenuItem key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Thời lượng (phút)"
        name="duration"
        type="number"
        value={courseFormData.duration}
        onChange={handleCourseFormChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Yêu cầu"
        name="requirements"
        value={courseFormData.requirements}
        onChange={handleCourseFormChange}
        margin="normal"
        multiline
        rows={3}
        required
      />
      <TextField
        fullWidth
        label="Bạn sẽ học được gì"
        name="whatYouWillLearn"
        value={courseFormData.whatYouWillLearn}
        onChange={handleCourseFormChange}
        margin="normal"
        multiline
        rows={4}
        required
      />

      {/* Phần Lessons */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Lessons
        </Typography>
        {courseFormData.lessons.map((lesson, index) => (
          <Box
            key={index}
            sx={{
              mb: 3,
              border: "1px solid #ddd",
              p: 2,
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <TextField
              fullWidth
              label={`Tiêu đề Lesson ${index + 1}`}
              name="title"
              value={lesson.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleLessonChange(index, e)
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label={`Mô tả Lesson ${index + 1}`}
              name="description"
              value={lesson.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleLessonChange(index, e)
              }
              margin="normal"
              multiline
              rows={3}
              required
            />
            <TextField
              fullWidth
              label={`URL video Lesson ${index + 1}`}
              name="videoUrl"
              value={lesson.videoUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleLessonChange(index, e)
              }
              margin="normal"
              required
            />
            {courseFormData.lessons.length > 1 && (
              <IconButton
                onClick={() => removeLesson(index)}
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </Box>
        ))}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addLesson}
          sx={{ mt: 2 }}
        >
          Thêm Lesson
        </Button>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        fullWidth
      >
        Tạo Khóa Học
      </Button>
    </form>
  );
}
