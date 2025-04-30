import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Section from '@/components/common/Section';
import { useTheme } from '@/hooks/useTheme';

// Định nghĩa kiểu dữ liệu
interface Lesson {
  title: string;
  description: string;
  orderIndex: number;
  videoUrl: string;
  duration: number;
  isFree: boolean;
}

interface CourseForm {
  title: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  thumbnail: string;
  categoryId: number;
  level: string;
  duration?: number;
  requirements: string;
  whatYouWillLearn: string;
  isPublished: boolean;
  lessons: Lesson[];
}

const CreateCourse: React.FC = () => {
  const { themeMode } = useTheme();

  // Dữ liệu giả lập danh mục (sẽ lấy từ API trong thực tế)
  const categories = [
    { id: 1, name: 'Lập trình' },
    { id: 2, name: 'Kinh doanh' },
    { id: 3, name: 'Thiết kế' },
  ];

  // Trạng thái form
  const [formData, setFormData] = useState<CourseForm>({
    title: '',
    slug: '',
    description: '',
    price: 0,
    discountPrice: undefined,
    thumbnail: '',
    categoryId: 0,
    level: '',
    duration: undefined,
    requirements: '',
    whatYouWillLearn: '',
    isPublished: false,
    lessons: [],
  });

  // Xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Tự động tạo slug từ title
      if (name === 'title') {
        updatedForm.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }

      return updatedForm;
    });
  };

  // Xử lý thay đổi select (categoryId, level)
  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thêm bài học
  const handleAddLesson = () => {
    setFormData((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        {
          title: '',
          description: '',
          orderIndex: prev.lessons.length + 1,
          videoUrl: '',
          duration: 0,
          isFree: false,
        },
      ],
    }));
  };

  // Xử lý xóa bài học
  const handleRemoveLesson = (index: number) => {
    setFormData((prev) => {
      const updatedLessons = prev.lessons
        .filter((_, i) => i !== index)
        .map((lesson, i) => ({ ...lesson, orderIndex: i + 1 }));
      return { ...prev, lessons: updatedLessons };
    });
  };

  // Xử lý thay đổi bài học
  const handleLessonChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedLessons = [...prev.lessons];
      updatedLessons[index] = { ...updatedLessons[index], [name]: value };
      return { ...prev, lessons: updatedLessons };
    });
  };

  // Xử lý thay đổi checkbox isFree của bài học
  const handleLessonCheckboxChange = (index: number, checked: boolean) => {
    setFormData((prev) => {
      const updatedLessons = [...prev.lessons];
      updatedLessons[index] = { ...updatedLessons[index], isFree: checked };
      return { ...prev, lessons: updatedLessons };
    });
  };

  // Xử lý gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra các trường bắt buộc
    if (!formData.title || !formData.price || !formData.categoryId || !formData.level) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc!');
      return;
    }
    if (formData.lessons.length === 0) {
      alert('Vui lòng thêm ít nhất một bài học!');
      return;
    }
    // Log dữ liệu (thay bằng gọi API trong thực tế)
    console.log('Dữ liệu khóa học:', formData);
    alert('Khóa học đã được tạo (giả lập)!');
  };

  return (
    <Section sx={{ mt: "128px" }}>
      <Box sx={{ maxWidth: "64rem", mx: "auto", p: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: themeMode === 'dark' ? 'white' : 'text.primary',
          }}
        >
          Tạo Khóa Học Mới
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Thông tin khóa học */}
          <Stack spacing={3}>
            <TextField
              label="Tiêu đề khóa học *"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={{
                bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                '& .MuiInputBase-input': {
                  color: themeMode === 'dark' ? 'white' : 'text.primary',
                },
                '& .MuiInputLabel-root': {
                  color: themeMode === 'dark' ? 'grey.300' : 'text.secondary',
                },
              }}
            />
            <TextField
              label="Slug (tự động tạo)"
              name="slug"
              value={formData.slug}
              disabled
              fullWidth
              variant="outlined"
              sx={{
                bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                '& .MuiInputBase-input': {
                  color: themeMode === 'dark' ? 'white' : 'text.primary',
                },
              }}
            />
            <TextField
              label="Mô tả khóa học"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                '& .MuiInputBase-input': {
                  color: themeMode === 'dark' ? 'white' : 'text.primary',
                },
              }}
            />
            <TextField
              label="Giá khóa học (VNĐ) *"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={{
                bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                '& .MuiInputBase-input': {
                  color: themeMode === 'dark' ? 'white' : 'text.primary',
                },
              }}
            />
            <TextField
              label="Giá giảm (VNĐ)"
              name="discountPrice"
              type="number"
              value={formData.discountPrice || ''}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={{
                bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                '& .MuiInputBase-input': {
                  color: themeMode === 'dark' ? 'white' : 'text.primary',
                },
              }}
            />
            <TextField
              label="URL hình ảnh đại diện"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={{
                bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                '& .MuiInputBase-input': {
                  color: themeMode === 'dark' ? 'white' : 'text.primary',
                },
              }}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel
                sx={{
                  color: themeMode === 'dark' ? 'grey.300' : 'text.secondary',
                }}
              >
                Danh mục *
              </InputLabel>
              <Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleSelectChange}
                label="Danh mục *"
                sx={{
                  bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                  color: themeMode === 'dark' ? 'white' : 'text.primary',
                }}
              >
                <MenuItem value={0} disabled>
                  Chọn danh mục
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                sx={{
                  color: themeMode === 'dark' ? 'grey.300' : 'text.secondary',
                }}
              >
                Cấp độ *
              </InputLabel>
              <Select
                name="level"
                value={formData.level}
                onChange={handleSelectChange}
                label="Cấp độ *"
                sx={{
                  bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                  color: themeMode === 'dark' ? 'white' : 'text.primary',
                }}
              >
                <MenuItem value="" disabled>
                  Chọn cấp độ
                </MenuItem>
                <MenuItem value="beginner">Sơ cấp</MenuItem>
                <MenuItem value="intermediate">Trung cấp</MenuItem>
                <MenuItem value="expert">Chuyên gia</MenuItem>
                <MenuItem value="all">Tất cả</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Thời lượng khóa học (phút)"
              name="duration"
              type="number"
              value={formData.duration || ''}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={{
                bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                '& .MuiInputBase-input': {
                  color: themeMode === 'dark' ? 'white' : 'text.primary',
                },
              }}
            />
            <TextField
              label="Yêu cầu trước khi học"
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              sx={{
                bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                '& .MuiInputBase-input': {
                  color: themeMode === 'dark' ? 'white' : 'text.primary',
                },
              }}
            />
            <TextField
              label="Học viên sẽ học được gì"
              name="whatYouWillLearn"
              value={formData.whatYouWillLearn}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              sx={{
                bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                '& .MuiInputBase-input': {
                  color: themeMode === 'dark' ? 'white' : 'text.primary',
                },
              }}
            />
          </Stack>

          {/* Danh sách bài học */}
          <Divider sx={{ my: 4 }} />
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: themeMode === 'dark' ? 'white' : 'text.primary',
            }}
          >
            Danh Sách Bài Học
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddLesson}
            sx={{ mb: 3 }}
          >
            Thêm bài học
          </Button>

          <Stack spacing={2}>
            {formData.lessons.map((lesson, index) => (
              <Card
                key={index}
                sx={{
                  bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                  border: 1,
                  borderColor: themeMode === 'dark' ? 'grey.600' : 'grey.200',
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                      variant="h6"
                      sx={{
                        color: themeMode === 'dark' ? 'white' : 'text.primary',
                      }}
                    >
                      Bài học {index + 1}
                    </Typography>
                    <IconButton
                      onClick={() => handleRemoveLesson(index)}
                      sx={{
                        color: themeMode === 'dark' ? 'grey.400' : 'grey.500',
                        '&:hover': { color: 'error.main' },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                  <Stack spacing={2} mt={2}>
                    <TextField
                      label="Tiêu đề bài học *"
                      name="title"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(index, e)}
                      fullWidth
                      variant="outlined"
                      sx={{
                        bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                        '& .MuiInputBase-input': {
                          color: themeMode === 'dark' ? 'white' : 'text.primary',
                        },
                      }}
                    />
                    <TextField
                      label="Mô tả bài học"
                      name="description"
                      value={lesson.description}
                      onChange={(e) => handleLessonChange(index, e)}
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                      sx={{
                        bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                        '& .MuiInputBase-input': {
                          color: themeMode === 'dark' ? 'white' : 'text.primary',
                        },
                      }}
                    />
                    <TextField
                      label="URL video bài học"
                      name="videoUrl"
                      value={lesson.videoUrl}
                      onChange={(e) => handleLessonChange(index, e)}
                      fullWidth
                      variant="outlined"
                      sx={{
                        bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                        '& .MuiInputBase-input': {
                          color: themeMode === 'dark' ? 'white' : 'text.primary',
                        },
                      }}
                    />
                    <TextField
                      label="Thời lượng bài học (phút)"
                      name="duration"
                      type="number"
                      value={lesson.duration}
                      onChange={(e) => handleLessonChange(index, e)}
                      fullWidth
                      variant="outlined"
                      sx={{
                        bgcolor: themeMode === 'dark' ? 'grey.800' : 'background.paper',
                        '& .MuiInputBase-input': {
                          color: themeMode === 'dark' ? 'white' : 'text.primary',
                        },
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={lesson.isFree}
                          onChange={(e) =>
                            handleLessonCheckboxChange(index, e.target.checked)
                          }
                          sx={{ color: themeMode === 'dark' ? 'grey.300' : 'text.secondary' }}
                        />
                      }
                      label="Bài học miễn phí"
                      sx={{
                        color: themeMode === 'dark' ? 'grey.300' : 'text.secondary',
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Nút gửi */}
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ px: 4, py: 1 }}
            >
              Lưu Khóa Học
            </Button>
          </Stack>
        </form>
      </Box>
    </Section>
  );
};

export default CreateCourse;