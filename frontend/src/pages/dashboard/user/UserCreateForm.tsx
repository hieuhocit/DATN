/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/types";
import {
  Box,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createUser } from "@/services/userService";
import { toast } from "react-toastify";
import { handleUploadThumbnailFile } from "@/utils/course";

interface UserCreateFormProps {
  open: boolean;
  onClose: () => void;
  refetch: () => Promise<any>;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  role: User["role"];
  bio?: string;
  avatarUrl?: string;
  avatarFile?: File;
  provider: User["registerProvider"];
}

export function UserCreateForm({
  refetch,
  open = false,
  onClose,
}: UserCreateFormProps) {
  const [addForm, setAddForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    role: "user",
    bio: "",
    avatarUrl: "",
    avatarFile: undefined,
    provider: "local",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (
    field: keyof FormData,
    value: string | File | undefined
  ) => {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseDialog = () => {
    handleResetForm();
    setPreviewAvatar(undefined);
    setShowPassword(false);
    setIsSubmitting(false);
    onClose();
  };

  const handleResetForm = () => {
    setAddForm({
      name: "",
      email: "",
      password: "",
      role: "user",
      bio: "",
      avatarUrl: "",
      avatarFile: undefined,
      provider: "local",
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const isValid = handleValidation(addForm);

      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      if (addForm.avatarFile) {
        const data = await handleUploadThumbnailFile(addForm.avatarFile);
        if (data) {
          addForm.avatarUrl = data.secure_url;
        }
      }

      const res = await createUser(addForm);

      if (res.statusCode === 201) {
        await refetch();
        toast.success(res.message);
        handleCloseDialog();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Có lỗi xảy ra khi tạo người dùng");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <DialogTitle>Thêm người dùng</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={previewAvatar} sx={{ width: 56, height: 56 }} />
            <Button variant="outlined" component="label">
              Tải ảnh lên
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  const url = file ? URL.createObjectURL(file) : undefined;
                  setPreviewAvatar(url);
                  handleFormChange("avatarFile", file);
                }}
              />
            </Button>
          </Box>
          <TextField
            label="Tên"
            fullWidth
            value={addForm.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            value={addForm.email}
            onChange={(e) => handleFormChange("email", e.target.value)}
          />
          <TextField
            label="Mật khẩu"
            fullWidth
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {!showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
            value={addForm.password}
            onChange={(e) => handleFormChange("password", e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="add-role-label">Vai trò</InputLabel>
            <Select
              labelId="add-role-label"
              value={addForm.role}
              label="Vai trò"
              onChange={(e) => handleFormChange("role", e.target.value)}
            >
              <MenuItem value="user">Người dùng</MenuItem>
              <MenuItem value="admin">Quản trị viên</MenuItem>
              <MenuItem value="instructor">Giảng viên</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Tiểu sử"
            fullWidth
            multiline
            rows={3}
            value={addForm.bio}
            onChange={(e) => handleFormChange("bio", e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmitting} onClick={handleCloseDialog}>
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang thêm..." : "Thêm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const handleValidation = (data: FormData) => {
  const { name, email, password, role, avatarFile } = data;

  if (!name || name.trim() === "") {
    toast.error("Tên không được để trống");
    return false;
  }

  const PATTERNS = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,24}$/,
  };

  if (!email || email.trim() === "") {
    toast.error("Email không được để trống");
    return false;
  }

  if (!PATTERNS.EMAIL.test(email)) {
    toast.error("Email không hợp lệ");
    return false;
  }

  if (!password || password.trim() === "") {
    toast.error("Mật khẩu không được để trống");
    return false;
  }

  if (!PATTERNS.PASSWORD.test(password)) {
    toast.error(
      "Mật khẩu phải từ 6 đến 24 ký tự, bao gồm ít nhất một chữ cái viết hoa, một chữ cái viết thường và một ký tự đặc biệt"
    );
    return false;
  }

  if (!role || role.trim() === "") {
    toast.error("Vai trò không được để trống");
  }

  if (!["user", "admin", "instructor"].includes(role)) {
    toast.error("Vai trò không hợp lệ");
    return false;
  }

  if (avatarFile && !avatarFile.name.match(/\.(jpg|jpeg|png|svg)$/)) {
    toast.error(
      "Định dạng tệp không hợp lệ. Chỉ chấp nhận JPG, JPEG, PNG, SVG"
    );
    return false;
  }

  return true;
};
