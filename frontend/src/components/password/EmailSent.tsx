import {
  Box,
  Button,
  Typography,
  Paper,
  useTheme,
  TextField,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

interface Props {
  code: string;
  onChange: (code: string) => void;
  onSubmit: () => void;
  setStep: (step: number) => void;
}

export default function EmailSent({
  code,
  onChange,
  onSubmit,
  setStep,
}: Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

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
        <Typography variant="h5" gutterBottom>
          📩 Kiểm tra email của bạn!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Chúng tôi đã gửi mã đặt lại mật khẩu đến email của bạn.
        </Typography>

        <TextField
          label="Mã xác nhận"
          fullWidth
          margin="normal"
          type="text"
          value={code}
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
        <Button variant="text" onClick={() => setStep(1)}>
          Gửi lại mã xác nhận
        </Button>
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={onSubmit}>
          Xác nhận mã
        </Button>
        <Button variant="text" fullWidth onClick={() => navigate("/login")}>
          Quay về đăng nhập
        </Button>
      </Paper>
      <Outlet />
    </Box>
  );
}
