// src/pages/UserTable.tsx
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Kiểu cho từng user
type UserList = {
  _id: string;
  email: string;
  name: string;
  bio: string;
  avatarUrl: string;
  role: 'user' | 'admin';
  registerProvider: 'local' | 'google';
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

// Kiểu cho response chính
type GetAllUsersResponse = {
  statusCode: number;
  statusText: string;
  message: string;
  data: UserList[];
};

export default function UserTable() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const [editUser, setEditUser] = useState<UserList | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', bio: '' });
  const [users, setUsers] = useState<UserList[]>([]);

  const handleEdit = (user: UserList) => {
    setEditUser(user);
    setEditForm({ name: user.name, email: user.email, bio: user.bio });
  };

  const handleFormChange = (field: keyof typeof editForm, value: string) => {
    setEditForm({ ...editForm, [field]: value });
  };

  // Hàm này sẽ được gọi khi người dùng nhấn nút "Lưu" trong modal thêm người dùng
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    bio: '',
    avatarUrl: '',
  });



  // Hàm này sẽ được gọi khi người dùng nhấn nút "Lưu" trong modal sửa người dùng
  const handleSave = async () => {
    if (!editUser) return;

    const updatedUser = {
      ...editUser,
      name: editForm.name,
      bio: editForm.bio,
      // avatarUrl đã được cập nhật sẵn trong state nếu có thay đổi ảnh
    };

    try {
      const response = await fetch(`http://localhost:3000/api/users/${editUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        // Cập nhật danh sách người dùng trong state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
        setEditUser(null); // Đóng modal
      } else {
        console.error('Lỗi cập nhật người dùng');
      }
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
    }
  };

  // Hàm này sẽ được gọi khi người dùng nhấn nút "Thêm người dùng" trong modal thêm người dùng
  const handleAddUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(addForm),
      });

      const data = await response.json();

      if (response.ok) {
        setUsers((prev) => [...prev, data.data]); // Thêm user mới vào danh sách
        setAddUserOpen(false); // Đóng modal
        setAddForm({ name: '', email: '', password: '', role: 'user', bio: '', avatarUrl: '' }); // Reset form
      } else {
        console.error('Lỗi thêm người dùng:', data.message);
      }
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
    }
  };



  const rows = users.map((user, index) => ({
    id: index + 1,
    avatar: user.avatarUrl,
    name: user.name,
    email: user.email,
    role: user.role,
    provider: user.registerProvider,
    bio: user.bio,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 100,
      renderCell: (params) => <Box display="flex" alignItems="center" height={1}><Avatar src={params.value} /></Box>,
    },
    { field: 'name', headerName: 'Tên', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Vai trò', width: 120 },
    { field: 'provider', headerName: 'Provider', width: 120 },
    { field: 'bio', headerName: 'Tiểu sử', flex: 1 },
    { field: 'createdAt', headerName: 'Ngày tạo', width: 150 },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const user = users[params.row.id - 1];
        return (
          <Box>
            <IconButton onClick={() => handleEdit(user)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => handleDelete(user._id)}>
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Box>
        );
      }
    },
  ];

  //Call API to get all users
  // useEffect để gọi API khi component được mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',

          },
          credentials: 'include'
        });

        const data: GetAllUsersResponse = await response.json();

        if (response.ok) {
          setUsers(data.data);
        } else {
          console.error('Lỗi lấy danh sách người dùng:', data.message);
        }
      } catch (error) {
        console.error('Lỗi kết nối API:', error);
      }
    };

    fetchUsers();
  }, []);

  //Call API to delete user
  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        setUsers(users.filter(user => user._id !== userId));
      } else {
        console.error('Lỗi xóa người dùng');
      }
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
    }
  };


  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Quản lý người dùng
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
        />
      </Paper>

      {/* Dialog sửa người dùng */}
      <Dialog open={!!editUser} onClose={() => setEditUser(null)} fullWidth maxWidth="sm">
        <DialogTitle>Sửa người dùng</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {/* Avatar preview và upload */}
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={editUser?.avatarUrl}
                sx={{ width: 56, height: 56 }}
              />
              <Button
                variant="outlined"
                component="label"
              >
                Tải ảnh lên
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (editUser) {
                          setEditUser({ ...editUser, avatarUrl: reader.result as string });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
            </Box>

            {/* Tên */}
            <TextField
              fullWidth
              label="Tên"
              value={editForm.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
            />

            {/* Email - không cho chỉnh sửa */}
            <TextField
              fullWidth
              label="Email"
              value={editForm.email}
              disabled
            />

            {/* Vai trò */}
            <FormControl fullWidth>
              <InputLabel id="role-label">Vai trò</InputLabel>
              <Select
                labelId="role-label"
                value={editUser?.role || ''}
                label="Vai trò"
                onChange={(e) => {
                  if (editUser) {
                    setEditUser({ ...editUser, role: e.target.value as 'user' | 'admin' });
                  }
                }}
              >
                <MenuItem value="user">Người dùng</MenuItem>
                <MenuItem value="admin">Quản trị viên</MenuItem>
              </Select>
            </FormControl>

            {/* Tiểu sử */}
            <TextField
              fullWidth
              label="Tiểu sử"
              multiline
              rows={3}
              value={editForm.bio}
              onChange={(e) => handleFormChange('bio', e.target.value)}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Hủy</Button>
          <Button variant="contained" onClick={handleSave}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>


      {/* Dialog thêm người dùng */}
      <Dialog open={addUserOpen} onClose={() => setAddUserOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Thêm người dùng</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {/* Avatar upload */}
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={addForm.avatarUrl} sx={{ width: 56, height: 56 }} />
              <Button variant="outlined" component="label">
                Tải ảnh lên
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setAddForm({ ...addForm, avatarUrl: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
            </Box>

            <TextField
              label="Tên"
              fullWidth
              value={addForm.name}
              onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
            />

            <TextField
              label="Email"
              fullWidth
              value={addForm.email}
              onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
            />

            <TextField
              label="Mật khẩu"
              fullWidth
              type="password"
              value={addForm.password}
              onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
            />

            <FormControl fullWidth>
              <InputLabel id="add-role-label">Vai trò</InputLabel>
              <Select
                labelId="add-role-label"
                value={addForm.role}
                label="Vai trò"
                onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="lecturer">Lecturer</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Tiểu sử"
              fullWidth
              multiline
              rows={3}
              value={addForm.bio}
              onChange={(e) => setAddForm({ ...addForm, bio: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddUserOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleAddUser}>Thêm</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
