import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";

import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { PROVIDER, ROLE_VN } from "@/utils/constants";
import { UserCreateForm } from "./UserCreateForm";
import { UserEditForm } from "./UserEditForm";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { deleteUser, getAllUsers } from "@/services/userService";
import ConfirmDialog from "./ConfirmDialog";

export default function UserTable() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const { data: res, refetch: fetchAllUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const [openCreateUserDialog, setOpenCreateUserDialog] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (userId: string) => {
    try {
      setIsDeleting(true);
      const res = await deleteUser(userId);
      console.log(res);
      if (res.statusCode === 200) {
        await fetchAllUsers();
        toast.success(res.message);
        setConfirmDialog(null);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
      toast.error("Có lỗi xảy ra khi xóa người dùng");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseEditDialog = () => {
    setEditedUser(null);
  };

  const users = (res?.data || []) as User[];

  const rows = users.map((user, index) => ({
    ...user,
    id: user._id,
    stt: index + 1,
  }));

  const columns: GridColDef<User>[] = [
    { field: "stt", headerName: "STT", width: 80 },
    {
      field: "avatarUrl",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" height={1}>
          <Avatar src={params.value} />
        </Box>
      ),
    },
    { field: "name", headerName: "Tên", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "role",
      headerName: "Vai trò",
      width: 120,
      renderCell: (params) => (
        <span>{ROLE_VN[params.value as keyof typeof ROLE_VN]}</span>
      ),
    },
    {
      field: "registerProvider",
      headerName: "Phương thức",
      width: 120,
      renderCell: (params) => PROVIDER[params.value as keyof typeof PROVIDER],
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 150,
      renderCell: (params) =>
        new Date(params.value).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const user = params.row;
        return (
          <Box>
            <IconButton onClick={() => setEditedUser(user)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => setConfirmDialog(user._id)}>
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Quản lý người dùng
      </Typography>
      <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          variant="contained"
          sx={{ display: "flex", alignItems: "center", py: 1.3 }}
          onClick={() => setOpenCreateUserDialog(true)}
        >
          <AddIcon sx={{ mr: 1, fontSize: "16px" }} />
          <Typography fontSize="13px">Thêm người dùng</Typography>
        </Button>
      </Box>
      <Paper elevation={3} sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5]}
        />
      </Paper>

      {/* Dialog sửa người dùng */}
      {editedUser && (
        <UserEditForm
          user={editedUser}
          open={!!editedUser}
          refetch={fetchAllUsers}
          onClose={handleCloseEditDialog}
        />
      )}

      {/* Dialog thêm người dùng */}
      <UserCreateForm
        open={openCreateUserDialog}
        onClose={() => setOpenCreateUserDialog(false)}
        refetch={fetchAllUsers}
      />

      {/* Dialog xác nhận xóa người dùng */}
      {confirmDialog && (
        <ConfirmDialog
          open={!!confirmDialog}
          title="Xác nhận xóa người dùng"
          content="Bạn có chắc chắn muốn xóa người dùng này không?"
          confirmText="Xóa"
          color="error"
          isLoading={isDeleting}
          onClose={() => setConfirmDialog(null)}
          onConfirm={async () => {
            await handleDelete(confirmDialog);
          }}
        />
      )}
    </Box>
  );
}
