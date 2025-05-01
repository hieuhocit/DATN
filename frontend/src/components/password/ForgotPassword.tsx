import { Button, TextField, Typography, Paper, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  email: string;
  onChange: (email: string) => void;
  onSubmit: () => void;
}

export default function ForgotPassword({ email, onChange, onSubmit }: Props) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const textColor = isDarkMode ? "#fff" : "#000";
  const borderColor = isDarkMode ? "#fff" : "rgba(0, 0, 0, 0.23)";

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, width: 400, bgcolor: theme.palette.background.paper }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Quên mật khẩu
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => onChange(e.target.value)}
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
        }}
      />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={onSubmit}>
        Gửi mã xác nhận
      </Button>
      <Typography align="center" variant="body2" sx={{ mt: 2 }}>
        <Link to="/login" style={{ color: textColor }}>
          ← Trở về đăng nhập
        </Link>
      </Typography>
    </Paper>
  );
}
