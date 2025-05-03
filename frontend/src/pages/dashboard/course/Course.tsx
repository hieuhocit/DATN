// src/pages/CourseTable.tsx
import {
  Box, Typography, Paper, Avatar, Button, Dialog, DialogTitle, DialogContent,
  TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, DialogActions,
  DialogContentText, Tabs, Tab
} from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Course } from '@/types';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';


export default function CourseTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });
  const [addCourseOpen, setAddCourseOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: 0,
    discountPrice: 0,
    thumbnail: '',
    instructorId: '',
    categoryId: '',
    level: 'beginner',
    duration: 0,
    requirements: '',
    whatYouWillLearn: '',
    isPublished: true,
  });

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/courses', {
        credentials: 'include',
      });
      const data = await res.json();
      setCourses(data.data || []);
    } catch (error) {
      console.error('Lỗi khi tải khóa học:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSaveCourse = async () => {
    const method = editingCourseId ? 'PUT' : 'POST';
    const url = editingCourseId
      ? `http://localhost:3000/api/courses/${editingCourseId}`
      : 'http://localhost:3000/api/courses';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newCourse),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`${method} lỗi: ${errorText}`);
      }

      toast.success(`${editingCourseId ? 'Cập nhật' : 'Thêm'} khóa học thành công!`);
      setAddCourseOpen(false);
      setEditingCourseId(null);
      setNewCourse({
        title: '',
        description: '',
        price: 0,
        discountPrice: 0,
        thumbnail: '',
        instructorId: '',
        categoryId: '',
        level: 'beginner',
        duration: 0,
        requirements: '',
        whatYouWillLearn: '',
        isPublished: true,
      });
      fetchCourses();
    } catch (error) {
      console.error('Lỗi khi lưu khóa học:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/courses/${courseToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Xóa lỗi: ${errorText}`);
      }

      toast.success('Xóa khóa học thành công!');
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
      fetchCourses();
    } catch (error) {
      console.error('Lỗi khi xóa khóa học:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  const openDeleteDialog = (courseId: string) => {
    setCourseToDelete(courseId);
    setDeleteDialogOpen(true);
  };

  const openEditCourseDialog = (rowData: any) => {
    setNewCourse({
      title: rowData.title || '',
      description: rowData.description || '',
      price: rowData.price || 0,
      discountPrice: rowData.discountPrice || 0,
      thumbnail: rowData.thumbnail || '',
      instructorId: rowData.instructorId || rowData.instructor?._id || '',
      categoryId: rowData.categoryId || '',
      level: rowData.level || 'beginner',
      duration: rowData.duration || 0,
      requirements: rowData.requirements || '',
      whatYouWillLearn: rowData.whatYouWillLearn || '',
      isPublished: rowData.isPublished ?? true,
    });
    setEditingCourseId(rowData._id);
    setAddCourseOpen(true);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'thumbnail',
      headerName: 'Ảnh',
      width: 100,
      renderCell: (params) => <Avatar src={params.value} variant="rounded" />,
    },
    { field: 'title', headerName: 'Tên khóa học', flex: 1 },
    { field: 'instructor', headerName: 'Giảng viên', width: 150 },
    {
      field: 'price',
      headerName: 'Giá',
      width: 120,
      valueFormatter: ({ value }) =>
        value !== undefined && value !== null
          ? `${(value as number).toLocaleString()} đ`
          : 'Chưa có',
    },
    { field: 'level', headerName: 'Trình độ', width: 120 },
    {
      field: 'duration',
      headerName: 'Thời lượng',
      width: 100,
      valueFormatter: ({ value }) => (value ? `${value} giờ` : 'Chưa có'),
    },
    { field: 'enrollment', headerName: 'Học viên', width: 100 },
    {
      field: 'rating',
      headerName: 'Đánh giá',
      width: 100,
      valueFormatter: ({ value }) =>
        value !== undefined && value !== null ? (value as number).toFixed(1) : 'Chưa có',
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 100,
      valueFormatter: ({ value }) =>
        value === true ? 'Đang mở' : 'Đã đóng', // Kiểm tra giá trị đúng kiểu boolean
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 160,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => openEditCourseDialog(params.row)}
          >
            Sửa
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => openDeleteDialog(params.row._id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const rows = courses.map((course) => ({
    ...course, // sao chép tất cả các thuộc tính của course vào đây
    id: course._id, // dùng _id làm id luôn
    courseId: course._id,
    thumbnail: course.thumbnail,
    title: course.title,
    instructor: course.instructor?.[0]?.name || 'Chưa rõ',
    price: course.price || 0,
    level: course.level,
    duration: course.duration,
    enrollment: course.enrollmentCount || 0,
    rating: course.averageRating || 0,
    status: course.isPublished ? 'Đang mở' : 'Đã đóng',
  }));


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
      <Box mb={2} display="flex" >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
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
              setEditingCourseId(null);
              setNewCourse({
                title: '',
                description: '',
                price: 0,
                discountPrice: 0,
                thumbnail: '',
                instructorId: '',
                categoryId: '',
                level: 'beginner',
                duration: 0,
                requirements: '',
                whatYouWillLearn: '',
                isPublished: true,
              });
              setAddCourseOpen(true);
            }}
          >
            Thêm khóa học
          </Button>
        </Box>
      </Box>
      <Paper elevation={3} sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows.filter(course => {
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

      {/* Dialog thêm/sửa khóa học */}
      <Dialog open={addCourseOpen} onClose={() => setAddCourseOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingCourseId ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField label="Tên khóa học" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} fullWidth />
            <TextField label="Mô tả" multiline minRows={3} value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} fullWidth />
            <TextField label="Giá gốc (VNĐ)" type="number" value={newCourse.price} onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })} fullWidth />
            <TextField label="Giá khuyến mãi (VNĐ)" type="number" value={newCourse.discountPrice} onChange={(e) => setNewCourse({ ...newCourse, discountPrice: Number(e.target.value) })} fullWidth />
            <TextField label="URL Ảnh đại diện" value={newCourse.thumbnail} onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Trình độ</InputLabel>
              <Select value={newCourse.level} label="Trình độ" onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}>
                <MenuItem value="beginner">Cơ bản</MenuItem>
                <MenuItem value="intermediate">Trung cấp</MenuItem>
                <MenuItem value="advanced">Nâng cao</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Thời lượng (phút)" type="number" value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: Number(e.target.value) })} fullWidth />
            <TextField label="Yêu cầu trước khi học" multiline minRows={2} value={newCourse.requirements} onChange={(e) => setNewCourse({ ...newCourse, requirements: e.target.value })} fullWidth />
            <TextField label="Bạn sẽ học được gì" multiline minRows={3} value={newCourse.whatYouWillLearn} onChange={(e) => setNewCourse({ ...newCourse, whatYouWillLearn: e.target.value })} fullWidth />
            <FormControlLabel control={<Checkbox checked={newCourse.isPublished} onChange={(e) => setNewCourse({ ...newCourse, isPublished: e.target.checked })} />} label="Công khai khóa học" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setAddCourseOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleSaveCourse}>
            {editingCourseId ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận xóa khóa học */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Xác nhận xóa khóa học</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa khóa học này? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
          <Button variant="contained" color="error" onClick={handleDeleteCourse}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
