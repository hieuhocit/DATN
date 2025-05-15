/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Category, Course, Lesson } from "@/types";
import { LEVELS } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categoryService";
import { toast } from "react-toastify";
import {
  handleUploadThumbnailFile,
  handleUploadVideoFile,
} from "@/utils/course";
import { ICreateCourseData, updateCourse } from "@/services/courseService";
import { useAppSelector } from "@/hooks/useStore";
import { userSelector } from "@/features/account";
import {
  createLesson,
  deleteLesson,
  ICreateLessonData,
  updateLesson,
} from "@/services/lessonService";
import { useCourseById } from "@/hooks/useCouses";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CourseFormSkeleton from "@/components/skeletons/CourseFormSkeleton";

interface LessonData extends Partial<Lesson> {
  videoFile?: File;
}

interface CourseFormData {
  title: string;
  description: string;
  price: number;
  thumbnailFile?: File;
  categoryId: string;
  level: string;
  requirements: string;
  whatYouWillLearn: string;
  lessons: LessonData[];
}

interface CourseCreateFormProps {
  courseId: string;
  onBack: () => void;
  fetchCourses: () => void;
}

export default function CourseEditForm({
  courseId,
  onBack,
  fetchCourses,
}: CourseCreateFormProps) {
  const user = useAppSelector(userSelector);
  const theme = useTheme();
  const { data: res } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    course,
    lessons,
    isLoading,
    refetch: fetchCourseById,
  } = useCourseById(courseId);

  const categories = res?.data ? flattenCategories(res.data) : [];

  const [deletedLessonIds, setDeletedLessonIds] = React.useState<string[]>([]);

  const [isCreating, setIsCreating] = React.useState(false);

  const [courseFormData, setCourseFormData] = React.useState<CourseFormData>({
    title: "",
    description: "",
    price: 0,
    categoryId: categories[0]._id,
    level: LEVELS[0].value,
    requirements: "",
    whatYouWillLearn: "",
    lessons: [
      {
        title: "",
        description: "",
      },
    ],
  });

  React.useEffect(() => {
    if (course && lessons) {
      setCourseFormData({
        title: course.title,
        description: course.description,
        price: course.price,
        categoryId: course.categoryId,
        level: course.level,
        requirements: course.requirements,
        whatYouWillLearn: course.whatYouWillLearn,
        lessons: lessons,
      });
    }
  }, [course, lessons]);

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
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: any } }
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

  const handleLessonVideoUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    const lesson = courseFormData.lessons[index];
    const lessonId = lesson._id;
    if (lessonId && !deletedLessonIds.includes(lessonId)) {
      setDeletedLessonIds((prev) => [...prev, lessonId]);
    }

    setCourseFormData((prev) => {
      const newLessons = prev.lessons.filter((_, i) => i !== index);
      return { ...prev, lessons: newLessons };
    });
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const updatedCourseData: ICreateCourseData = {
        title: courseFormData.title,
        description: courseFormData.description,
        price: courseFormData.price,
        thumbnail: course?.thumbnail as string,
        instructorId: user?._id as string,
        categoryId: courseFormData.categoryId,
        level: courseFormData.level as Course["level"],
        requirements: courseFormData.requirements,
        whatYouWillLearn: courseFormData.whatYouWillLearn,
      };

      if (courseFormData.thumbnailFile) {
        const data = await handleUploadThumbnailFile(
          courseFormData.thumbnailFile as File
        );

        if (!data) {
          toast.error("Tải hình ảnh khoá học thất bại");
          return;
        }
        updatedCourseData.thumbnail = data.secure_url;
      }

      const isCourseInfoValid =
        handleValidationCourseInformation(updatedCourseData);

      if (!isCourseInfoValid) return;

      const res = await updateCourse(course?._id as string, updatedCourseData);

      if (res?.statusCode !== 200) {
        toast.error(res?.message || "Cập nhật khóa học thất bại");
        return;
      }

      const isLessonInfoValid = handleValidationLessonInformation(
        courseFormData.lessons
      );

      if (!isLessonInfoValid) return;

      let orderIndex = 1;
      for await (const lesson of courseFormData.lessons) {
        const updatedLessonData: ICreateLessonData = {
          title: lesson.title as string,
          description: lesson.description as string,
          courseId: res.data._id,
          duration: lesson.duration as number,
          orderIndex: orderIndex++,
          videoUrl: lesson.videoUrl as string,
          publicId: lesson.publicId as string,
        };

        if (lesson.videoFile && lesson.videoFile instanceof File) {
          const data = await handleUploadVideoFile(lesson.videoFile as File);

          if (!data) {
            toast.error("Tải video bài giảng thất bại");
            return;
          }

          updatedLessonData.videoUrl = data.secure_url;
          updatedLessonData.publicId = data.public_id;
          updatedLessonData.duration = data.duration;
        }

        if (lesson._id) {
          await updateLesson(lesson._id, updatedLessonData);
        } else {
          await createLesson(updatedLessonData);
        }
      }

      for await (const lessonId of deletedLessonIds) {
        await deleteLesson(lessonId);
      }

      await fetchCourseById();
      await fetchCourses();
      toast.success("Cập nhật khóa học thành công");
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Có lỗi xảy ra trong quá trình cập nhật khóa học");
    } finally {
      setIsCreating(false);
    }
  };

  const getBgColor = () =>
    theme.palette.mode === "dark" ? "#1a1a1a" : "#ffffff";
  const getInputBg = () =>
    theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f7fa";

  if (isLoading) return <CourseFormSkeleton />;

  const isPublished = course?.isPublished;

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
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{ mb: 3, textTransform: "none", fontWeight: 500 }}
        aria-label="Quay lại danh sách khóa học"
      >
        Quay lại
      </Button>
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
          Cập Nhật Khoá Học
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}
        >
          Thông tin cơ bản
        </Typography>
        <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
          <TextField
            disabled={isPublished}
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
            disabled={isPublished}
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr" },
              gap: 2,
            }}
          >
            <TextField
              disabled={isPublished}
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
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          {!isPublished && (
            <>
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
                  disabled={isCreating}
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
            </>
          )}
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <img
              src={
                courseFormData.thumbnailFile
                  ? URL.createObjectURL(courseFormData.thumbnailFile)
                  : course?.thumbnail
              }
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
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            mb: 3,
          }}
        >
          <FormControl disabled={isPublished} fullWidth required>
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
          <FormControl disabled={isPublished} fullWidth required>
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
              {LEVELS.map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "grid", gap: 2, mb: 3 }}>
          <TextField
            disabled={isPublished}
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
            disabled={isPublished}
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

        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 3, color: theme.palette.text.primary }}
        >
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
              disabled={isPublished}
              fullWidth
              label={`Tiêu đề Lesson ${index + 1}`}
              name="title"
              value={lesson.title}
              onChange={(e) => handleLessonChange(index, e)}
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
              disabled={isPublished}
              fullWidth
              label={`Mô tả Lesson ${index + 1}`}
              name="description"
              value={lesson.description}
              onChange={(e) => handleLessonChange(index, e)}
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
              {!isPublished && (
                <>
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
                      disabled={isCreating}
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
                </>
              )}
              {(lesson.videoFile || lesson.videoUrl) && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <video
                    controls
                    src={
                      lesson.videoFile
                        ? URL.createObjectURL(lesson.videoFile)
                        : lesson.videoUrl
                    }
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
            {!isPublished && courseFormData.lessons.length > 1 && (
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

        {!isPublished && (
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addLesson}
            disabled={isCreating}
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
        )}

        {!isPublished && (
          <Button
            loading={isCreating}
            disabled={isCreating}
            type={isCreating ? "button" : "submit"}
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
            loadingPosition="end"
          >
            Cập nhật khoá học
          </Button>
        )}
      </form>
    </Box>
  );
}

export function flattenCategories(categories: Category[]): Category[] {
  return categories.reduce<Category[]>((acc, cat) => {
    acc.push(cat);

    if (cat.children && cat.children.length > 0) {
      acc.push(...flattenCategories(cat.children));
    }

    return acc;
  }, []);
}

export function handleValidationLessonInformation(lessons: LessonData[]) {
  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];

    if (!lesson.title || lesson.title.trim() === "") {
      toast.error(`Vui lòng nhập tiêu đề cho bài học ${i + 1}`);
      return false;
    }

    if (!lesson.description || lesson.description.trim() === "") {
      toast.error(`Vui lòng nhập mô tả cho bài học ${i + 1}`);
      return false;
    }

    if (lesson.videoFile || lesson.videoUrl) {
      continue;
    } else {
      toast.error(`Vui lòng tải lên video cho bài học ${i + 1}`);
      return false;
    }
  }

  return true;
}

export function handleValidationCourseInformation(data: ICreateCourseData) {
  if (!data.title || data.title.trim() === "") {
    toast.error("Vui lòng nhập tiêu đề khóa học");
    return false;
  }

  if (!data.description || data.description.trim() === "") {
    toast.error("Vui lòng nhập mô tả khóa học");
    return false;
  }

  if (!data.price || data.price <= 0) {
    toast.error("Vui lòng nhập giá khóa học");
    return false;
  }

  if (!data.thumbnail || data.thumbnail.trim() === "") {
    toast.error("Vui lòng tải lên hình ảnh khóa học");
    return false;
  }

  if (!data.categoryId || data.categoryId.trim() === "") {
    toast.error("Vui lòng chọn danh mục khóa học");
    return false;
  }

  if (!data.level || data.level.trim() === "") {
    toast.error("Vui lòng chọn cấp độ khóa học");
    return false;
  }

  if (
    ["beginner", "intermediate", "expert", "all"].indexOf(data.level) === -1
  ) {
    toast.error("Cấp độ khóa học không hợp lệ");
    return false;
  }

  if (!data.requirements || data.requirements.trim() === "") {
    toast.error("Vui lòng nhập yêu cầu đầu vào");
    return false;
  }

  if (!data.whatYouWillLearn || data.whatYouWillLearn.trim() === "") {
    toast.error("Vui lòng nhập nội dung khóa học");
    return false;
  }

  return true;
}
