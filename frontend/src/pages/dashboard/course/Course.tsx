// src/pages/CourseTable.tsx
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Tabs,
  Tab,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Course } from "@/types";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { LEVEL_VN } from "@/utils/constants";
import CourseCreateForm from "./CourseCreateForm";
import CourseEditForm from "./CourseEditForm";

export default function CourseTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [addCourseOpen, setAddCourseOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/courses", {
        credentials: "include",
      });
      const data = await res.json();
      setCourses(data.data || []);
    } catch (error) {
      console.error("Lỗi khi tải khóa học:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/courses/${courseToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Xóa lỗi: ${errorText}`);
      }

      toast.success("Xóa khóa học thành công!");
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
      fetchCourses();
    } catch (error) {
      console.error("Lỗi khi xóa khóa học:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const openDeleteDialog = (courseId: string) => {
    setCourseToDelete(courseId);
    setDeleteDialogOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "thumbnail",
      headerName: "Ảnh",
      width: 100,
      renderCell: (params) => <Avatar src={params.value} variant="rounded" />,
    },
    { field: "title", headerName: "Tên khóa học", flex: 1 },
    { field: "instructor", headerName: "Giảng viên", width: 150 },
    {
      field: "price",
      headerName: "Giá",
      width: 120,
      renderCell: (params) => {
        const value = params.value;
        const string =
          value !== undefined && value !== null
            ? `${(value as number).toLocaleString()} đ`
            : "Chưa có";
        return <span>{string}</span>;
      },
    },
    {
      field: "level",
      headerName: "Trình độ",
      width: 120,
      renderCell: (params) =>
        LEVEL_VN[params.value as keyof typeof LEVEL_VN] || "Chưa có",
    },
    {
      field: "duration",
      headerName: "Thời lượng",
      width: 150,
      renderCell: (params) =>
        params?.value ? `${getHours(params?.value as number)}` : "Chưa có",
    },
    {
      field: "isPublished",
      headerName: "Trạng thái",
      width: 100,
      renderCell: (params) =>
        params?.value === true ? "Đã xuất bản" : "Chưa xuất bản",
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 180,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setEditingCourseId(params.row._id)}
          >
            Sửa
          </Button>
          {!params.row.isPublished && (
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => openDeleteDialog(params.row._id)}
              sx={{ ml: 1 }}
            >
              Xóa
            </Button>
          )}
        </>
      ),
    },
  ];

  const rows = courses.map((course) => ({
    ...course, // sao chép tất cả các thuộc tính của course vào đây
    id: course._id,
    courseId: course._id,
    thumbnail: course.thumbnail,
    title: course.title,
    instructor: course.instructor?.[0]?.name || "Chưa rõ",
    price: course.price || 0,
    level: course.level,
    duration: course.duration,
  }));

  console.log(rows);

  // Tab quản lý khóa học
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Quản lý khóa học
      </Typography>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>

      </Box> */}
      <Box mb={2} display="flex">
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Tất cả" />
            <Tab label="Chưa phê duyệt" />
            <Tab label="Đã phê duyệt" />
          </Tabs>
        </Box>
        <Box ml="auto" display="flex" gap={1} alignItems="center">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setAddCourseOpen(true);
            }}
          >
            Thêm khóa học
          </Button>
        </Box>
      </Box>
      <Paper elevation={3} sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows.filter((course) => {
            if (tabValue === 1) return !course.isPublished;
            if (tabValue === 2) return course.isPublished;
            return true; // tabValue === 0 -> tất cả
          })}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5]}
          loading={loading}
        />
      </Paper>

      {/* Dialog thêm khóa học */}
      <Dialog
        open={addCourseOpen}
        onClose={() => setAddCourseOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <CourseCreateForm fetchCourses={() => {}} />
      </Dialog>

      <Dialog
        open={!!editingCourseId}
        onClose={() => setEditingCourseId(null)}
        fullWidth
        maxWidth="sm"
      >
        <CourseEditForm
          courseId={editingCourseId ?? ""}
          fetchCourses={() => {}}
        />
      </Dialog>

      {/* Dialog xác nhận xóa khóa học */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Xác nhận xóa khóa học</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa khóa học này? Hành động này không thể hoàn
            tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteCourse}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export function getHours(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration % 60);
  return `${hours} giờ ${minutes} phút`;
}
