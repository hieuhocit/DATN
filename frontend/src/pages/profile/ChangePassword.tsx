/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Section from "@/components/common/Section";
import { useTheme } from "@/hooks/useTheme";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { changePassword } from "@/services/passwordService";

const PATTERNS = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,24}$/,
};

const ChangePassword: React.FC = () => {
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.trim() === "") {
      toast.error("Vui lòng nhập mật khẩu!");
      return;
    }
    if (!PATTERNS.PASSWORD.test(newPassword)) {
      toast.error(
        "Mật khẩu phải có 6-24 ký tự, bao gồm chữ hoa, chữ thường và ký tự đặc biệt!"
      );
      return;
    }
    if (!confirmNewPassword || confirmNewPassword.trim() === "") {
      toast.error("Vui lòng nhập lại mật khẩu!");
      return;
    }
    if (confirmNewPassword !== newPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    try {
      const res = (await changePassword(newPassword, oldPassword)) as any;

      if (res.statusCode === 200) {
        toast.success(res.message);
        navigate("/profile", { replace: true });
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      toast.error("Có lỗi xảy ra khi đổi mật khẩu.");
    }
  };

  const handleCancel = () => navigate("/profile", { replace: true });

  const handleTogglePassword = (field: string) => {
    switch (field) {
      case "old":
        setShowOldPassword(!showOldPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  return (
    <Section sx={{ mt: "128px", mb: "128px" }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            bgcolor: themeMode === "dark" ? "grey.900" : "background.paper",
            border: 1,
            borderColor: themeMode === "dark" ? "grey.700" : "grey.200",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Đổi mật khẩu
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Mật khẩu cũ"
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleTogglePassword("old")}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Mật khẩu mới"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleTogglePassword("new")}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Nhập lại mật khẩu mới"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleTogglePassword("confirm")}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
              >
                Đổi mật khẩu
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Hủy
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Section>
  );
};

export default ChangePassword;