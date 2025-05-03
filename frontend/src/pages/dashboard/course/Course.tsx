// src/pages/CourseTable.tsx
import { Box, Typography, Paper, Avatar, Button, DialogActions } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Course } from '@/types';

import AddIcon from '@mui/icons-material/Add';

export default function CourseTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
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

    fetchCourses();
  }, []);

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
        value !== undefined ? `${(value as number).toLocaleString()} đ` : '',
    },
    { field: 'level', headerName: 'Trình độ', width: 120 },
    {
      field: 'duration',
      headerName: 'Thời lượng',
      width: 100,
      valueFormatter: ({ value }) => `${value} giờ`,
    },
    { field: 'enrollment', headerName: 'Học viên', width: 100 },
    {
      field: 'rating',
      headerName: 'Đánh giá',
      width: 100,
      valueFormatter: ({ value }) =>
        value !== undefined ? (value as number).toFixed(1) : 'Chưa có',
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 100,
    },
  ];

  const rows = courses.map((course, index) => ({
    id: index + 1,
    thumbnail: course.thumbnail,
    title: course.title,
    instructor: course.instructor?.[0]?.name || 'Chưa rõ',
    price: course.price,
    level: course.level,
    duration: course.duration,
    enrollment: course.enrollmentCount || 0,
    rating: course.averageRating || 0,
    status: course.isPublished ? 'Đang mở' : 'Đã đóng',
  }));

  const [addUserOpen, setAddUserOpen] = useState(false);

  

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Quản lý khóa học
      </Typography>
      <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center" >
        {/* <Button onClick={setAddUserOpen(true)} variant='contained' sx={{ display: 'flex', alignItems: 'center', py: 1.3 }}> */}
        <Button
          variant='contained'
          sx={{ display: 'flex', alignItems: 'center', py: 1.3 }}
          onClick={() => setAddUserOpen(true)}
        >
          <AddIcon sx={{ mr: 1, fontSize: '16px' }} />
          <Typography fontSize="13px">Thêm người dùng</Typography>
        </Button>
      </Box>
      <Paper elevation={3} sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5]}
          loading={loading}
        />
      </Paper>
      <DialogActions>
        <Button onClick={() => setAddUserOpen(false)}>Hủy</Button>
        <Button variant="contained" onClick={handleAddCourse}>Thêm</Button>
      </DialogActions>
    </Box>
  );
}
