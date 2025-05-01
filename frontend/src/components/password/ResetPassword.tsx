import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Props {
  onSubmit: (newPassword: string) => void;
}

export default function ResetPassword({ onSubmit }: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const PATTERNS = {
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,24}$/,
  };

  const handleResetPassword = () => {
    if (!password || password.trim() === "") {
      toast.error("Vui lòng nhập mật khẩu!");
      return;
    }
    if (!PATTERNS.PASSWORD.test(password)) {
      toast.error(
        "Mật khẩu phải có 6-24 ký tự, bao gồm chữ hoa, chữ thường và ký tự đặc biệt!"
      );
      return;
    }
    if (!confirm || confirm.trim() === "") {
      toast.error("Vui lòng nhập lại mật khẩu!");
      return;
    }
    if (password !== confirm) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    onSubmit(password); // Gọi hàm onSubmit với mật khẩu mới
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirm = () => {
    setShowConfirm((prev) => !prev);
  };

  const textColor = isDarkMode ? "#fff" : "#000";
  const borderColor = isDarkMode ? "#fff" : "rgba(0, 0, 0, 0.23)";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor: "default" }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, width: 400, bgcolor: theme.palette.background.paper }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Đặt lại mật khẩu
        </Typography>
        <TextField
          label="Mật khẩu mới"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            sx: {
              color: textColor,
              "&.Mui-focused": {
                color: textColor,
              },
            },
          }}
          InputProps={{
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: borderColor,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: textColor,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: textColor,
              },
              color: textColor,
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Nhập lại mật khẩu"
          type={showConfirm ? "text" : "password"}
          fullWidth
          margin="normal"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          InputLabelProps={{
            sx: {
              color: textColor,
              "&.Mui-focused": {
                color: textColor,
              },
            },
          }}
          InputProps={{
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: borderColor,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: textColor,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: textColor,
              },
              color: textColor,
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggleConfirm}
                  edge="end"
                  aria-label="toggle confirm password visibility"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleResetPassword}
        >
          Đổi mật khẩu
        </Button>
      </Paper>
    </Box>
  );
}
